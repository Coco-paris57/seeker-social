// The concierge pipeline: guest message in, decision, then either a reply, a draft for the
// team to approve, or a request to the team. Also the team-side actions that close the loop.
import { config } from './config.js';
import { q, getSettings, audit, parseJson } from './db.js';
import * as llm from './llm.js';
import { emitConversation, notifyTeam } from './notify.js';
import { smoobu } from './smoobu.js';
import { addDays, clip, londonDate, londonToUtc, HttpError } from './util.js';

export const SENSITIVE_CATEGORIES = new Set(['access', 'wifi']);

export function propertyMode(property, settings = getSettings()) {
  return property?.mode || settings.defaultMode;
}

export function stageOf(reservation, today = londonDate()) {
  if (!reservation) return 'unknown';
  if (today < reservation.arrival) return 'before_arrival';
  if (today > reservation.departure) return 'after_stay';
  return 'during_stay';
}

/** Access details are released from N hours before check-in until the end of the checkout day. */
export function accessReleased(conversation, reservation, settings, now = Date.now()) {
  if (!conversation.verified || !reservation || reservation.cancelled) return false;
  const opens = londonToUtc(reservation.arrival, reservation.check_in || '15:00') - settings.accessInfoHours * 3600_000;
  const closes = londonToUtc(addDays(reservation.departure, 1), '00:00');
  return now >= opens && now < closes;
}

export function guestLabel(conversation) {
  return conversation.guest_name || 'Guest';
}

/** Everything the model is allowed to see for this conversation. */
export function buildContext(conversation, { latest = '', uptoMessageId = null } = {}) {
  const settings = getSettings();
  const property = conversation.property_id ? q.get('SELECT * FROM properties WHERE id = ?', conversation.property_id) : null;
  const reservation = conversation.verified && conversation.reservation_id
    ? q.get('SELECT * FROM reservations WHERE id = ?', conversation.reservation_id)
    : null;
  const released = accessReleased(conversation, reservation, settings);
  const details = parseJson(property?.details);

  const rows = property
    ? q.all('SELECT * FROM knowledge WHERE property_id = ? OR property_id IS NULL ORDER BY property_id IS NULL, id', property.id)
    : q.all('SELECT * FROM knowledge WHERE property_id IS NULL ORDER BY id');
  const knowledge = rows
    .filter((k) => !k.sensitive || released)
    .map((k) => ({ id: k.id, applies_to: k.property_id ? 'this property' : 'all properties', category: k.category, question: k.question, answer: k.answer }));

  const history = q
    .all(
      `SELECT role, body FROM messages WHERE conversation_id = ? AND (role = 'guest' OR status = 'sent')
       ${uptoMessageId ? 'AND id < ?' : ''} ORDER BY id DESC LIMIT 30`,
      ...(uptoMessageId ? [conversation.id, uptoMessageId] : [conversation.id]),
    )
    .reverse()
    .map((m) => ({ role: m.role === 'guest' ? 'guest' : m.role === 'team' ? 'team' : 'assistant', text: m.body }));

  const now = new Date();
  return {
    botName: settings.botName,
    company: config.company.name,
    officeHours: settings.officeHours,
    emergencyContact: settings.emergencyContact,
    accessHours: settings.accessInfoHours,
    today: londonDate(now),
    time: new Intl.DateTimeFormat('en-GB', { timeZone: config.timezone, hour: '2-digit', minute: '2-digit', weekday: 'long' }).format(now),
    verified: !!conversation.verified,
    accessReleased: released,
    stage: stageOf(reservation),
    language: conversation.language,
    property: property && {
      name: property.display_name || property.name,
      area: property.area,
      postcode: property.postcode,
      // The full street address identifies the flat, so it is kept for verified guests.
      address: conversation.verified ? property.address : undefined,
      nearest_station: property.station,
      notes: property.notes,
      bedrooms: details.rooms?.bedrooms ?? undefined,
      bathrooms: details.rooms?.bathrooms ?? undefined,
      max_guests: details.rooms?.maxOccupancy ?? undefined,
      amenities: details.amenities?.length ? details.amenities : undefined,
    },
    stay: reservation && {
      guest_first_name: reservation.first_name || undefined,
      arrival_date: reservation.arrival,
      departure_date: reservation.departure,
      check_in_from: reservation.check_in || undefined,
      check_out_by: reservation.check_out || undefined,
      adults: reservation.adults ?? undefined,
      children: reservation.children ?? undefined,
      booked_through: reservation.channel || undefined,
      cancelled: reservation.cancelled ? true : undefined,
    },
    knowledge,
    openTickets: q
      .all("SELECT type, summary FROM tickets WHERE conversation_id = ? AND status = 'open'", conversation.id)
      .map((t) => ({ type: t.type, summary: t.summary })),
    history,
    latest,
  };
}

// ---------------------------------------------------------------------------------------
// Sending

function insertMessage(conversationId, role, body, { status = 'sent', kind = 'answer', meta = {}, createdBy = null } = {}) {
  const id = q.insert(
    `INSERT INTO messages(conversation_id, role, body, status, kind, meta, created_by, sent_at)
     VALUES(?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'sent' THEN strftime('%Y-%m-%d %H:%M:%f', 'now') END)`,
    conversationId, role, body, status, kind, JSON.stringify(meta), createdBy, status,
  );
  q.run("UPDATE conversations SET last_message_at = datetime('now') WHERE id = ?", conversationId);
  return q.get('SELECT * FROM messages WHERE id = ?', id);
}

/** Deliver a sent message on the conversation's channel. Web chats read from the database. */
async function deliver(conversation, message) {
  emitConversation(conversation.id, 'message', { messageId: message.id });
  if (conversation.channel === 'smoobu' && conversation.reservation_id) {
    const api = smoobu();
    if (!api) return;
    try {
      await api.sendMessageToGuest(conversation.reservation_id, message.body);
    } catch (e) {
      console.error(`Smoobu send failed for booking ${conversation.reservation_id}: ${e.message}`);
      q.run('UPDATE messages SET meta = json_set(meta, \'$.deliveryError\', ?) WHERE id = ?', e.message.slice(0, 200), message.id);
      await notifyTeam({
        title: 'Message could not be sent through Smoobu',
        body: `${guestLabel(conversation)}: please reply in Smoobu directly.`,
        url: `/admin/#/conversations/${conversation.id}`,
        tag: `delivery-${conversation.id}`,
        urgent: true,
      });
    }
  }
}

export async function sendMessage(conversation, role, body, opts = {}) {
  const message = insertMessage(conversation.id, role, body, { ...opts, status: 'sent' });
  await deliver(conversation, message);
  return message;
}

function recentHolding(conversationId, minutes) {
  return !!q.get(
    `SELECT 1 FROM messages WHERE conversation_id = ? AND kind = 'holding' AND status = 'sent'
     AND created_at > datetime('now', ?)`,
    conversationId, `-${minutes} minutes`,
  );
}

// ---------------------------------------------------------------------------------------
// Guest message in

const running = new Map(); // conversation id -> promise chain, so messages are handled in order

export function handleGuestMessage(conversationId) {
  const next = (running.get(conversationId) || Promise.resolve())
    .then(() => processConversation(conversationId))
    .catch((e) => console.error(`Conversation ${conversationId}: ${e.stack || e.message}`))
    .finally(() => {
      if (running.get(conversationId) === next) running.delete(conversationId);
    });
  running.set(conversationId, next);
  return next;
}

/** Guest messages that have had no reply, draft or ticket yet. */
function unanswered(conversationId) {
  return q.all(
    "SELECT * FROM messages WHERE conversation_id = ? AND role = 'guest' AND json_extract(meta, '$.handled') IS NULL ORDER BY id",
    conversationId,
  );
}

/** A newer guest message replaces a draft still waiting for approval; its question is asked again. */
function supersedeDrafts(conversationId) {
  for (const draft of q.all("SELECT id FROM messages WHERE conversation_id = ? AND status = 'pending'", conversationId)) {
    const floor = q.get(
      "SELECT COALESCE(MAX(id), 0) AS id FROM messages WHERE conversation_id = ? AND role != 'guest' AND status = 'sent' AND id < ?",
      conversationId, draft.id,
    ).id;
    q.run(
      "UPDATE messages SET meta = json_remove(meta, '$.handled') WHERE conversation_id = ? AND role = 'guest' AND id > ? AND id < ?",
      conversationId, floor, draft.id,
    );
    q.run("UPDATE messages SET status = 'superseded' WHERE id = ?", draft.id);
    emitConversation(conversationId, 'draft', { messageId: draft.id });
  }
}

async function processConversation(conversationId) {
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', conversationId);
  if (!conversation) return;
  const settings = getSettings();
  const property = conversation.property_id ? q.get('SELECT * FROM properties WHERE id = ?', conversation.property_id) : null;
  const where = property ? property.display_name || property.name : 'General enquiry';
  const url = `/admin/#/conversations/${conversation.id}`;

  if (!unanswered(conversationId).length) return;
  supersedeDrafts(conversationId); // may put earlier, still unanswered questions back in the queue
  const pending = unanswered(conversationId);
  const latest = pending.map((m) => m.body).join('\n');
  const lastGuest = pending[pending.length - 1];
  const markHandled = () => {
    for (const m of pending) q.run("UPDATE messages SET meta = json_set(meta, '$.handled', 1) WHERE id = ?", m.id);
  };

  if (conversation.bot_paused) {
    markHandled();
    await notifyTeam({ title: `${guestLabel(conversation)} · ${where}`, body: clip(latest, 140), url, tag: `conversation-${conversation.id}` });
    return;
  }

  emitConversation(conversation.id, 'typing', { on: true });
  let decision;
  try {
    decision = await llm.decide(buildContext(conversation, { latest, uptoMessageId: pending[0].id }));
  } catch (e) {
    // The model is unavailable or declined. Never leave a guest without an answer: hand to the team.
    console.error(`Model error in conversation ${conversation.id}: ${e.message}`);
    decision = {
      action: 'ask_team', confidence: 'low', category: 'other', language: conversation.language || 'English',
      summary: clip(latest, 80), teamQuestion: `The assistant could not process this message (${clip(e.message, 80)}). Guest wrote: ${latest}`,
      reply: 'Thank you for your message. I have passed it to the team and they will reply here shortly.',
    };
  } finally {
    emitConversation(conversation.id, 'typing', { on: false });
  }
  markHandled();
  if (decision.language && decision.language !== conversation.language) {
    q.run('UPDATE conversations SET language = ? WHERE id = ?', decision.language, conversation.id);
  }
  const meta = { confidence: decision.confidence, category: decision.category, summary: decision.summary, guestMessageId: lastGuest.id };

  if (decision.action === 'answer') {
    const auto = propertyMode(property, settings) === 'auto' && decision.confidence === 'high';
    if (auto) {
      await sendMessage(conversation, 'bot', decision.reply, { meta: { ...meta, auto: true } });
      return;
    }
    const draft = insertMessage(conversation.id, 'bot', decision.reply, { status: 'pending', meta });
    emitConversation(conversation.id, 'draft', { messageId: draft.id });
    if (!recentHolding(conversation.id, settings.holdingMinutes)) {
      await sendMessage(conversation, 'bot', holdingText(decision.language), { kind: 'holding' });
    }
    await notifyTeam({
      title: `Approve reply · ${where}`,
      body: `${guestLabel(conversation)}: ${clip(latest, 90)}`,
      url: '/admin/#/inbox', tag: `approval-${conversation.id}`,
    });
    return;
  }

  // ask_team, maintenance, urgent: open a request for the team and send the holding reply.
  const type = decision.action === 'ask_team' ? 'question' : decision.action;
  const ticketId = q.insert(
    `INSERT INTO tickets(conversation_id, property_id, type, category, summary, question, guest_message_id)
     VALUES(?, ?, ?, ?, ?, ?, ?)`,
    conversation.id, conversation.property_id, type, decision.category, clip(decision.summary, 200),
    decision.teamQuestion || latest, lastGuest.id,
  );
  await sendMessage(conversation, 'bot', decision.reply, { kind: 'holding', meta: { ...meta, ticketId } });
  emitConversation(conversation.id, 'ticket', { ticketId });
  const titles = { question: 'Question for the team', maintenance: 'Maintenance issue', urgent: 'URGENT' };
  await notifyTeam({
    title: `${titles[type]} · ${where}`,
    body: clip(decision.teamQuestion || latest, 160),
    url: `/admin/#/tickets/${ticketId}`, tag: `ticket-${ticketId}`, urgent: type !== 'question',
  });
}

function holdingText(language) {
  const l = String(language || '').toLowerCase();
  if (l.startsWith('fr')) return 'Merci pour votre message. Je vérifie cela avec l\'équipe et je reviens vers vous très vite.';
  if (l.startsWith('es') || l.startsWith('spa')) return 'Gracias por su mensaje. Lo estoy confirmando con el equipo y le responderé enseguida.';
  if (l.startsWith('de') || l.startsWith('ger')) return 'Vielen Dank für Ihre Nachricht. Ich kläre das kurz mit dem Team und melde mich gleich bei Ihnen.';
  if (l.startsWith('it')) return 'Grazie per il messaggio. Sto verificando con il team e le rispondo a breve.';
  return 'Thank you for your message. I am just confirming this with the team and will reply shortly.';
}

// ---------------------------------------------------------------------------------------
// Team actions

function saveKnowledge({ propertyId, category, question, answer, userId, source = 'learned' }) {
  const cat = llm.CATEGORIES.includes(category) ? category : 'other';
  return q.insert(
    'INSERT INTO knowledge(property_id, category, question, answer, sensitive, source, created_by) VALUES(?, ?, ?, ?, ?, ?, ?)',
    propertyId ?? null, cat, clip(question, 500), answer.trim(), SENSITIVE_CATEGORIES.has(cat) ? 1 : 0, source, userId ?? null,
  );
}

/** Approve a drafted reply, optionally edited. remember saves the final text as knowledge. */
export async function approveDraft(messageId, user, { text, remember = false, scope = 'property' } = {}) {
  const draft = q.get("SELECT * FROM messages WHERE id = ? AND status = 'pending'", messageId);
  if (!draft) throw new HttpError(409, 'This draft has already been handled or replaced by a newer one.');
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', draft.conversation_id);
  const finalText = (text ?? draft.body).trim();
  if (!finalText) throw new HttpError(400, 'The reply cannot be empty.');
  const edited = finalText !== draft.body.trim();
  const meta = { ...parseJson(draft.meta), approvedBy: user.id, edited, ...(edited ? { original: draft.body } : {}) };
  q.run("UPDATE messages SET body = ?, status = 'sent', meta = ?, sent_at = strftime('%Y-%m-%d %H:%M:%f', 'now') WHERE id = ?", finalText, JSON.stringify(meta), draft.id);
  q.run("UPDATE conversations SET last_message_at = datetime('now') WHERE id = ?", conversation.id);
  let knowledgeId = null;
  if (remember) {
    const guest = meta.guestMessageId ? q.get('SELECT body FROM messages WHERE id = ?', meta.guestMessageId) : null;
    knowledgeId = saveKnowledge({
      propertyId: scope === 'global' ? null : conversation.property_id,
      category: meta.category, question: meta.summary || guest?.body || 'Guest question', answer: finalText, userId: user.id,
    });
  }
  audit(user.id, edited ? 'draft.approve_edited' : 'draft.approve', `message ${draft.id}`);
  const message = q.get('SELECT * FROM messages WHERE id = ?', draft.id);
  await deliver(conversation, message);
  return { message, knowledgeId };
}

/** Reject a draft. If the team writes their own reply it is sent in its place. */
export async function rejectDraft(messageId, user, { replyText, remember = false, scope = 'property' } = {}) {
  const draft = q.get("SELECT * FROM messages WHERE id = ? AND status = 'pending'", messageId);
  if (!draft) throw new HttpError(409, 'This draft has already been handled or replaced by a newer one.');
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', draft.conversation_id);
  const meta = parseJson(draft.meta);
  q.run("UPDATE messages SET status = 'rejected', meta = ? WHERE id = ?", JSON.stringify({ ...meta, rejectedBy: user.id }), draft.id);
  audit(user.id, 'draft.reject', `message ${draft.id}`);
  emitConversation(conversation.id, 'draft', { messageId: draft.id });
  let message = null;
  let knowledgeId = null;
  if (replyText?.trim()) {
    message = await sendMessage(conversation, 'team', replyText.trim(), { createdBy: user.id, meta: { replaces: draft.id } });
    if (remember) {
      knowledgeId = saveKnowledge({
        propertyId: scope === 'global' ? null : conversation.property_id,
        category: meta.category, question: meta.summary || 'Guest question', answer: replyText, userId: user.id,
      });
    }
  }
  return { message, knowledgeId };
}

/**
 * The team answers a request. The assistant words the reply for the guest (or sends the
 * team's words as written), and the answer can be saved so the assistant knows it next time.
 */
export async function answerTicket(ticketId, user, { answer, remember = false, scope = 'property', verbatim = false, close = true } = {}) {
  const ticket = q.get('SELECT * FROM tickets WHERE id = ?', ticketId);
  if (!ticket) throw new HttpError(404, 'Request not found.');
  if (ticket.status === 'closed') throw new HttpError(409, 'This request is already closed.');
  const text = String(answer || '').trim();
  if (!text) throw new HttpError(400, 'Please write an answer.');
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', ticket.conversation_id);

  let reply = text;
  let worded = false;
  if (!verbatim) {
    try {
      reply = await llm.compose(buildContext(conversation, { latest: '' }), ticket, text);
      worded = true;
    } catch (e) {
      console.error(`Compose failed for ticket ${ticket.id}: ${e.message}`); // fall back to the team's own words
    }
  }
  const message = await sendMessage(conversation, worded ? 'bot' : 'team', reply, {
    kind: 'relay', createdBy: user.id, meta: { ticketId: ticket.id, answeredBy: user.id },
  });
  let knowledgeId = ticket.knowledge_id;
  if (remember && !knowledgeId) {
    knowledgeId = saveKnowledge({
      propertyId: scope === 'global' ? null : ticket.property_id,
      category: ticket.category, question: ticket.question, answer: text, userId: user.id,
    });
  }
  q.run(
    `UPDATE tickets SET status = ?, answer = COALESCE(answer || char(10) || char(10), '') || ?, answered_by = ?,
     answered_at = datetime('now'), knowledge_id = ? WHERE id = ?`,
    close ? 'closed' : 'answered', text, user.id, knowledgeId, ticket.id,
  );
  audit(user.id, 'ticket.answer', `ticket ${ticket.id}`);
  emitConversation(conversation.id, 'ticket', { ticketId: ticket.id });
  return { message, knowledgeId, ticket: q.get('SELECT * FROM tickets WHERE id = ?', ticket.id) };
}

export function closeTicket(ticketId, user) {
  const ticket = q.get('SELECT * FROM tickets WHERE id = ?', ticketId);
  if (!ticket) throw new HttpError(404, 'Request not found.');
  q.run("UPDATE tickets SET status = 'closed' WHERE id = ?", ticket.id);
  audit(user.id, 'ticket.close', `ticket ${ticket.id}`);
  emitConversation(ticket.conversation_id, 'ticket', { ticketId: ticket.id });
  return q.get('SELECT * FROM tickets WHERE id = ?', ticket.id);
}

/** How often drafts were approved unchanged: the evidence for switching a property to auto. */
export function approvalStats(propertyId, days = 30) {
  const row = q.get(
    `SELECT
       SUM(CASE WHEN m.status = 'sent' AND json_extract(m.meta, '$.approvedBy') IS NOT NULL AND json_extract(m.meta, '$.edited') = 0 THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN m.status = 'sent' AND json_extract(m.meta, '$.edited') = 1 THEN 1 ELSE 0 END) AS edited,
       SUM(CASE WHEN m.status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
       SUM(CASE WHEN m.status = 'sent' AND json_extract(m.meta, '$.auto') = 1 THEN 1 ELSE 0 END) AS automatic
     FROM messages m JOIN conversations c ON c.id = m.conversation_id
     WHERE m.role = 'bot' AND m.kind = 'answer' AND c.property_id IS ? AND m.created_at > datetime('now', ?)`,
    propertyId ?? null, `-${days} days`,
  );
  const approved = row?.approved || 0;
  const edited = row?.edited || 0;
  const rejected = row?.rejected || 0;
  const reviewed = approved + edited + rejected;
  return { days, approved, edited, rejected, automatic: row?.automatic || 0, reviewed, approvalRate: reviewed ? Math.round((approved / reviewed) * 100) : null };
}

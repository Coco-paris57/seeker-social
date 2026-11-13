// The concierge pipeline: guest message in, decision, then either a reply, a draft for the
// team to approve, or a request to the team. Also the team-side actions that close the loop.
import { config } from './config.js';
import { q, getSettings, audit, parseJson } from './db.js';
import * as llm from './llm.js';
import { emitConversation, notifyTeam } from './notify.js';
import { smoobu } from './smoobu.js';
import { addDays, clip, londonDate, londonToUtc, HttpError } from './util.js';
import { modelImages } from './media.js';

export const SENSITIVE_CATEGORIES = new Set(['access', 'wifi']);

// The guest's online check-in link is private to their booking. The model is given this
// placeholder instead and the real link is put in when a message is written or sent.
export const CHECKIN_LINK = '[CHECKIN_LINK]';
const withLink = (text, link) => (link ? String(text).split(CHECKIN_LINK).join(link) : String(text).split(CHECKIN_LINK).join('your online check-in link'));
const withoutLink = (text, link) => (link ? String(text).split(link).join(CHECKIN_LINK) : String(text));
const checkinLinkOf = (conversation) => (conversation.verified && conversation.reservation_id
  ? q.get('SELECT checkin_link FROM reservations WHERE id = ? AND cancelled = 0', conversation.reservation_id)?.checkin_link || null
  : null);

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
  const closes = londonToUtc(reservation.departure, reservation.check_out || '11:00') + 3 * 3600_000; // short grace after checkout
  return now >= opens && now < closes;
}

export function guestLabel(conversation) {
  return conversation.guest_name || 'Guest';
}

/** "[sent 1 photo]" for the transcript, so the model knows a message came with pictures. */
function attachmentNote(m) {
  const list = parseJson(m.meta).attachments || [];
  if (!list.length) return '';
  const photos = list.filter((a) => a.kind === 'image').length;
  const videos = list.length - photos;
  const parts = [photos && `${photos} photo${photos > 1 ? 's' : ''}`, videos && `${videos} video${videos > 1 ? 's' : ''}`].filter(Boolean).join(' and ');
  return ` [${m.role === 'guest' ? 'sent' : 'shown'} ${parts}]`;
}

/** Pictures and video link of the knowledge entries an answer used, to show with the message. */
function mediaFor(knowledgeIds, allowed) {
  const ids = [...new Set(knowledgeIds || [])].filter((id) => allowed.has(id)).slice(0, 3);
  const attachments = [];
  const links = [];
  for (const id of ids) {
    for (const f of q.all("SELECT token, kind FROM files WHERE knowledge_id = ? ORDER BY rowid LIMIT 6", id)) attachments.push({ token: f.token, kind: f.kind });
    const k = q.get('SELECT question, video_url FROM knowledge WHERE id = ?', id);
    if (k?.video_url) links.push({ url: k.video_url, label: k.question });
  }
  return { ...(attachments.length ? { attachments: attachments.slice(0, 8) } : {}), ...(links.length ? { links } : {}) };
}

/**
 * What the team holds on record for a property (from ChargeAutomation), for the assistant's
 * reasoning only. The WiFi password and access code themselves are never included, so they
 * cannot be repeated to a guest; the team's internal notes are included only for verified guests.
 */
function onFile(property, verified) {
  const r = parseJson(property?.team_record, null);
  if (!r) return undefined;
  const notes = [r.text1, r.text2].filter(Boolean);
  return {
    wifi_details: r.wifi ? 'on file' : 'not on file',
    access_code: r.accessCode ? 'on file' : 'not on file',
    internal_notes: !notes.length ? undefined : verified ? notes : 'on file',
  };
}

/** Everything the model is allowed to see for this conversation. */
export function buildContext(conversation, { latest = '', uptoMessageId = null } = {}) {
  const settings = getSettings();
  const reservation = conversation.verified && conversation.reservation_id
    ? q.get('SELECT * FROM reservations WHERE id = ?', conversation.reservation_id)
    : null;
  if (reservation && reservation.property_id !== conversation.property_id) {
    // The booking was moved to another apartment: follow it.
    q.run('UPDATE conversations SET property_id = ? WHERE id = ?', reservation.property_id, conversation.id);
    conversation = { ...conversation, property_id: reservation.property_id };
  }
  const property = conversation.property_id ? q.get('SELECT * FROM properties WHERE id = ?', conversation.property_id) : null;
  const released = accessReleased(conversation, reservation, settings);
  const details = parseJson(property?.details);

  const rows = property
    ? q.all('SELECT * FROM knowledge WHERE property_id = ? OR property_id IS NULL ORDER BY property_id IS NULL, id', property.id)
    : q.all('SELECT * FROM knowledge WHERE property_id IS NULL ORDER BY id');
  const knowledge = rows
    .filter((k) => !k.sensitive || released)
    .map((k) => ({
      id: k.id, applies_to: k.property_id ? 'this property' : 'all properties', category: k.category, question: k.question, answer: k.answer,
      // Pictures and a video the team attached. The guest is shown them when this id is listed in knowledge_ids.
      pictures: q.get("SELECT COUNT(*) AS n FROM files WHERE knowledge_id = ? AND kind = 'image'", k.id).n || undefined,
      what_the_pictures_show: k.media_notes || undefined,
      has_video: k.video_url ? true : undefined,
    }));

  const history = q
    .all(
      `SELECT id, role, body, meta FROM messages WHERE conversation_id = ? AND (role = 'guest' OR status = 'sent')
       ${uptoMessageId ? 'AND id < ?' : ''} ORDER BY id DESC LIMIT 30`,
      ...(uptoMessageId ? [conversation.id, uptoMessageId] : [conversation.id]),
    )
    .reverse()
    .map((m) => ({ role: m.role === 'guest' ? 'guest' : m.role === 'team' ? 'team' : 'assistant', text: withoutLink(m.body, reservation?.checkin_link) + attachmentNote(m) }));

  const now = new Date();
  return {
    botName: settings.botName,
    company: config.company.name,
    officeHours: settings.officeHours,
    emergencyContact: settings.emergencyContact,
    accessHours: settings.accessInfoHours,
    checkinPortalNote: settings.checkinPortalNote,
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
      on_file_with_team: onFile(property, !!conversation.verified),
      nearby_stations: details.stations?.length ? details.stations.map((s) => ({ name: s.name, lines: s.lines, approx_walk_minutes: s.walkMinutes })) : undefined,
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
      online_checkin_link: reservation.checkin_link && !reservation.cancelled ? CHECKIN_LINK : undefined,
      online_checkin_completed: reservation.checkin_link ? !!reservation.checkin_done : undefined,
      // Extras the guest bought or asked for in online check-in (early check-in, late checkout...).
      extras: parseJson(reservation.extras, []).length ? parseJson(reservation.extras, []).map((x) => ({ item: x.title, status: x.status, note: x.note || undefined })) : undefined,
    },
    knowledge,
    examples: examplesFor(conversation, latest),
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
  // Read = the guest has had a real reply. "Confirming with the team" is not one.
  if (message.kind !== 'holding') q.run('UPDATE conversations SET needs_reply = 0 WHERE id = ?', conversation.id);
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

function recentKind(conversationId, kind, minutes) {
  return !!q.get(
    `SELECT 1 FROM messages WHERE conversation_id = ? AND kind = ? AND status = 'sent'
     AND created_at > datetime('now', ?)`,
    conversationId, kind, `-${minutes} minutes`,
  );
}
const recentHolding = (conversationId, minutes) => recentKind(conversationId, 'holding', minutes);

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

/** A newer guest message replaces a draft still waiting for approval; the questions it covered are asked again. */
/**
 * A newer guest message means a waiting draft no longer covers everything. Put the questions
 * it covered back in the queue and return the drafts concerned. They stay in the Inbox for now:
 * a team member may be editing one, so it is updated in place rather than swapped for a new one.
 */
function requeueDraftQuestions(conversationId) {
  const drafts = q.all("SELECT id, meta FROM messages WHERE conversation_id = ? AND status = 'pending' ORDER BY id", conversationId);
  for (const draft of drafts) {
    for (const id of parseJson(draft.meta).covers || []) {
      q.run("UPDATE messages SET meta = json_remove(meta, '$.handled') WHERE id = ? AND conversation_id = ? AND role = 'guest'", id, conversationId);
    }
  }
  return drafts.map((d) => d.id);
}

/** Write a draft for approval: over the draft already waiting in this chat if there is one, so the Inbox card stays put. */
function placeDraft(conversation, reuse, body, { kind = 'answer', meta = {} } = {}) {
  const current = reuse.id && q.get("SELECT id FROM messages WHERE id = ? AND status = 'pending'", reuse.id);
  if (current) {
    q.run('UPDATE messages SET body = ?, kind = ?, meta = ? WHERE id = ?', body, kind, JSON.stringify(meta), current.id);
    reuse.used = true;
    emitConversation(conversation.id, 'draft', { messageId: current.id });
    return q.get('SELECT * FROM messages WHERE id = ?', current.id);
  }
  const draft = insertMessage(conversation.id, 'bot', body, { status: 'pending', kind, meta });
  emitConversation(conversation.id, 'draft', { messageId: draft.id });
  return draft;
}

async function processConversation(conversationId) {
  if (!unanswered(conversationId).length) return;
  const stale = requeueDraftQuestions(conversationId);
  const reuse = { id: stale.at(-1) ?? null, used: false };
  try {
    await processPending(conversationId, reuse);
  } finally {
    // Drafts that were not updated (the new message led somewhere else, e.g. a request to the team) are withdrawn.
    for (const id of stale) {
      if (reuse.used && id === reuse.id) continue;
      if (q.run("UPDATE messages SET status = 'superseded' WHERE id = ? AND status = 'pending'", id).changes) emitConversation(conversationId, 'draft', { messageId: id });
    }
  }
}

async function processPending(conversationId, reuse) {
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', conversationId);
  if (!conversation) return;
  const settings = getSettings();
  const property = conversation.property_id ? q.get('SELECT * FROM properties WHERE id = ?', conversation.property_id) : null;
  const where = property ? property.display_name || property.name : 'General enquiry';
  const url = `/admin/#/conversations/${conversation.id}`;

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
  let media = {};
  try {
    const context = buildContext(conversation, { latest, uptoMessageId: pending[0].id });
    // Photos and videos sent with these messages go to the model as pictures.
    const sent = pending.flatMap((m) => q.all('SELECT * FROM files WHERE message_id = ?', m.id));
    context.images = await modelImages(sent);
    context.unreadable = sent.length > 0 && context.images.length === 0;
    decision = await llm.decide(context);
    decision.reply = withLink(decision.reply, checkinLinkOf(conversation));
    media = decision.action === 'answer' ? mediaFor(decision.knowledgeIds, new Set(context.knowledge.map((k) => k.id))) : {};
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
  const meta = { confidence: decision.confidence, category: decision.category, summary: decision.summary, guestMessageId: lastGuest.id, covers: pending.map((m) => m.id), ...media };

  // A team member may have taken over while the model was working.
  if (q.get('SELECT bot_paused FROM conversations WHERE id = ?', conversation.id)?.bot_paused) {
    await notifyTeam({ title: `${guestLabel(conversation)} · ${where}`, body: clip(latest, 140), url, tag: `conversation-${conversation.id}` });
    return;
  }

  // Learning mode: nothing the assistant wrote reaches a guest without approval. The one
  // exception is urgent safety guidance, which must not wait.
  const liveChat = conversation.channel === 'web'; // holding notes only make sense in a live chat
  // Replies that go out through Airbnb, Booking.com or email wait for approval until the team
  // switches channel replies to automatic; after that they follow the property's mode.
  const learning = propertyMode(property, settings) !== 'auto' || (!liveChat && !settings.channelAuto);

  // Check-in, access and WiFi questions from a guest who has not verified their booking: ask
  // them to verify straight away, with fixed wording, instead of waiting for the team. The
  // chat opens the verification form on this message. Asked once per half hour at most; after
  // that the question follows the normal route so a guest who cannot verify still gets help.
  const needsBooking = ['checkin', 'access', 'wifi'].includes(decision.category) && ['answer', 'ask_team'].includes(decision.action);
  if (liveChat && !conversation.verified && needsBooking && !recentKind(conversation.id, 'verify', 30)) {
    await sendMessage(conversation, 'bot', fixedText('verify', decision.language), { kind: 'verify', meta: { ...meta, auto: true } });
    return;
  }

  if (decision.action === 'answer') {
    if (!learning && decision.confidence === 'high') {
      await sendMessage(conversation, 'bot', decision.reply, { meta: { ...meta, auto: true } });
      return;
    }
    placeDraft(conversation, reuse, decision.reply, { meta });
    if (liveChat && !recentHolding(conversation.id, settings.holdingMinutes)) {
      await sendMessage(conversation, 'bot', holdingText('confirming', decision.language), { kind: 'holding' });
    }
    await notifyTeam({
      title: `Approve reply · ${where}`,
      body: `${guestLabel(conversation)}: ${clip(latest, 90)}`,
      url: '/admin/#/inbox', tag: `approval-${conversation.id}`,
    });
    return;
  }

  // ask_team, maintenance, urgent: open a request for the team and acknowledge the guest.
  const type = decision.action === 'ask_team' ? 'question' : decision.action;
  // Follow-ups on the same matter join the open request instead of opening (and alerting) again.
  const open = q.get("SELECT id FROM tickets WHERE conversation_id = ? AND type = ? AND status = 'open' ORDER BY id DESC LIMIT 1", conversation.id, type);
  let ticketId;
  if (open) {
    ticketId = open.id;
    q.run("UPDATE tickets SET question = substr(question || char(10) || char(10) || 'Follow-up: ' || ?, 1, 4000), guest_message_id = ? WHERE id = ?", decision.teamQuestion || latest, lastGuest.id, ticketId);
  } else {
    ticketId = q.insert(
      `INSERT INTO tickets(conversation_id, property_id, type, category, summary, question, guest_message_id)
       VALUES(?, ?, ?, ?, ?, ?, ?)`,
      conversation.id, conversation.property_id, type, decision.category, clip(decision.summary, 200),
      decision.teamQuestion || latest, lastGuest.id,
    );
  }
  if (!liveChat && learning) {
    // On a booking channel in approval mode even the first reply to a problem waits for a person.
    if (type !== 'question') {
      placeDraft(conversation, reuse, decision.reply, { kind: type === 'urgent' ? 'urgent' : 'holding', meta: { ...meta, ticketId } });
    }
  } else if (!learning || type === 'urgent') {
    // Urgent replies carry safety instructions, so they are marked for the chat to emphasise.
    await sendMessage(conversation, 'bot', decision.reply, { kind: type === 'urgent' ? 'urgent' : 'holding', meta: { ...meta, ticketId, auto: true } });
  } else if (liveChat && !(open && recentHolding(conversation.id, settings.holdingMinutes))) {
    await sendMessage(conversation, 'bot', holdingText(type, decision.language), { kind: 'holding', meta: { ticketId } });
  }
  emitConversation(conversation.id, 'ticket', { ticketId });
  const titles = { question: 'Question for the team', maintenance: 'Maintenance issue', urgent: 'URGENT' };
  await notifyTeam({
    title: `${titles[type]} · ${where}`,
    body: clip(decision.teamQuestion || latest, 160),
    url: `/admin/#/tickets/${ticketId}`, tag: `ticket-${ticketId}`, urgent: type === 'urgent',
  });
}

// Fixed wording for learning mode, so no unreviewed model text is sent.
const HOLDING = {
  confirming: {
    en: 'Thank you for your message. I am just confirming this with the team and will reply shortly.',
    fr: "Merci pour votre message. Je vérifie cela avec l'équipe et je reviens vers vous très vite.",
    es: 'Gracias por su mensaje. Lo estoy confirmando con el equipo y le responderé enseguida.',
    de: 'Vielen Dank für Ihre Nachricht. Ich kläre das kurz mit dem Team und melde mich gleich bei Ihnen.',
    it: 'Grazie per il messaggio. Sto verificando con il team e le rispondo a breve.',
  },
  question: {
    en: 'Thank you for your message. I have passed your question to the team and will reply here as soon as they answer.',
    fr: "Merci pour votre message. J'ai transmis votre question à l'équipe et je vous répondrai ici dès que possible.",
    es: 'Gracias por su mensaje. He trasladado su pregunta al equipo y le responderé aquí en cuanto contesten.',
    de: 'Vielen Dank für Ihre Nachricht. Ich habe Ihre Frage an das Team weitergegeben und melde mich hier, sobald ich eine Antwort habe.',
    it: 'Grazie per il messaggio. Ho inoltrato la sua domanda al team e le risponderò qui appena possibile.',
  },
  maintenance: {
    en: 'Thank you for letting us know, and sorry about that. I have reported this to the team and will update you here as soon as they reply.',
    fr: "Merci de nous avoir prévenus, et désolé pour ce désagrément. J'ai signalé le problème à l'équipe et je vous tiendrai informé ici dès que possible.",
    es: 'Gracias por avisarnos y disculpe las molestias. He informado al equipo y le avisaré aquí en cuanto respondan.',
    de: 'Vielen Dank für den Hinweis, und entschuldigen Sie bitte die Unannehmlichkeiten. Ich habe das Team informiert und melde mich hier, sobald ich mehr weiß.',
    it: 'Grazie per la segnalazione e ci scusiamo per il disagio. Ho avvisato il team e la aggiornerò qui appena possibile.',
  },
};

const languageCode = (language) => {
  const l = String(language || '').toLowerCase();
  return l.startsWith('fr') ? 'fr' : l.startsWith('es') || l.startsWith('spa') ? 'es' : l.startsWith('de') || l.startsWith('ger') ? 'de' : l.startsWith('it') ? 'it' : 'en';
};
const holdingText = (kind, language) => HOLDING[kind][languageCode(language)];

// Fixed wording for the verification step and for handing over the online check-in link.
const FIXED = {
  verify: {
    en: 'To send you your check-in details, I first need to confirm your booking. Please enter the surname on the booking and your arrival date.',
    fr: "Pour vous envoyer vos informations d'arrivée, je dois d'abord confirmer votre réservation. Merci d'indiquer le nom de famille de la réservation et votre date d'arrivée.",
    es: 'Para enviarle los datos de su llegada, primero necesito confirmar su reserva. Indique el apellido de la reserva y su fecha de llegada.',
    de: 'Damit ich Ihnen Ihre Check-in-Informationen senden kann, muss ich zuerst Ihre Buchung bestätigen. Bitte geben Sie den Nachnamen der Buchung und Ihr Anreisedatum an.',
    it: "Per inviarle le informazioni per il check-in devo prima confermare la prenotazione. Inserisca il cognome della prenotazione e la data di arrivo.",
  },
  link: {
    en: 'Thank you, your booking is confirmed. Your check-in instructions, access details and WiFi are on your online check-in page:',
    fr: "Merci, votre réservation est confirmée. Vos instructions d'arrivée, les informations d'accès et le WiFi se trouvent sur votre page d'enregistrement en ligne :",
    es: 'Gracias, su reserva está confirmada. Las instrucciones de llegada, los datos de acceso y el WiFi están en su página de check-in online:',
    de: 'Vielen Dank, Ihre Buchung ist bestätigt. Ihre Check-in-Anleitung, die Zugangsdaten und das WLAN finden Sie auf Ihrer Online-Check-in-Seite:',
    it: 'Grazie, la prenotazione è confermata. Le istruzioni per il check-in, i dati di accesso e il WiFi sono nella sua pagina di check-in online:',
  },
  formFirst: {
    en: 'Please complete the online check-in form there first. The details appear once it is done.',
    fr: "Merci de compléter d'abord le formulaire d'enregistrement en ligne. Les informations s'affichent une fois celui-ci terminé.",
    es: 'Complete primero el formulario de check-in online. Los datos aparecen una vez completado.',
    de: 'Bitte füllen Sie dort zuerst das Online-Check-in-Formular aus. Danach werden die Informationen angezeigt.',
    it: 'Compili prima il modulo di check-in online. I dati compaiono una volta completato.',
  },
  formDone: {
    en: 'Your online check-in is complete, so the details are shown there. Instructions for getting in appear shortly before your check-in time.',
    fr: "Votre enregistrement en ligne est terminé : les informations y sont affichées. Les instructions d'accès apparaissent peu avant votre heure d'arrivée.",
    es: 'Su check-in online está completado, así que los datos ya aparecen allí. Las instrucciones de acceso se muestran poco antes de su hora de llegada.',
    de: 'Ihr Online-Check-in ist abgeschlossen, die Informationen werden dort angezeigt. Die Zugangsanleitung erscheint kurz vor Ihrer Check-in-Zeit.',
    it: "Il check-in online è completato, quindi i dati sono visibili lì. Le istruzioni per l'accesso compaiono poco prima dell'orario di check-in.",
  },
};
const fixedText = (key, language) => FIXED[key][languageCode(language)];

/**
 * Called when a guest has just verified their booking. If they were asked to verify in order to
 * get check-in details, hand over their online check-in link at once (fixed wording, the link
 * comes from the booking). Without a link, their question goes back in the queue.
 */
export async function afterVerification(conversationId) {
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', conversationId);
  const asked = q.get("SELECT id, meta FROM messages WHERE conversation_id = ? AND kind = 'verify' ORDER BY id DESC LIMIT 1", conversationId);
  if (!conversation?.verified || !asked) return;
  if (q.get("SELECT 1 FROM messages WHERE conversation_id = ? AND kind = 'checkin' AND id > ?", conversationId, asked.id)) return;
  const reservation = q.get('SELECT * FROM reservations WHERE id = ?', conversation.reservation_id);
  if (reservation?.checkin_link && !reservation.cancelled && stageOf(reservation) !== 'after_stay') {
    const lang = conversation.language;
    const text = `${fixedText('link', lang)}\n${reservation.checkin_link}\n\n${fixedText(reservation.checkin_done ? 'formDone' : 'formFirst', lang)}`;
    await sendMessage(conversation, 'bot', text, { kind: 'checkin', meta: { auto: true, category: 'checkin' } });
    return;
  }
  for (const id of parseJson(asked.meta).covers || []) {
    q.run("UPDATE messages SET meta = json_remove(meta, '$.handled') WHERE id = ? AND conversation_id = ? AND role = 'guest'", id, conversationId);
  }
  await handleGuestMessage(conversationId);
}

// ---------------------------------------------------------------------------------------
// Team actions

// Learned answers are for verified guests only unless a team member says otherwise: the
// category comes from the model, so it must not decide what unverified visitors can be told.
function saveKnowledge({ propertyId, category, question, answer, userId, sensitive, source = 'learned' }) {
  const cat = llm.CATEGORIES.includes(category) ? category : 'other';
  return q.insert(
    'INSERT INTO knowledge(property_id, category, question, answer, sensitive, source, created_by) VALUES(?, ?, ?, ?, ?, ?, ?)',
    propertyId ?? null, cat, clip(question, 500), answer.trim(), sensitive === false ? 0 : 1, source, userId ?? null,
  );
}

const MAX_EXAMPLES_PER_PROPERTY = 300;
const significant = (text) => new Set(String(text).toLowerCase().match(/[a-z0-9]{3,}/g) || []);

/**
 * Keep an approved reply as an example for this property. Every Approve & send lands here, so
 * the assistant learns what the team considers right for each property and how they word it.
 * The guest's private check-in link is replaced by its placeholder before storing.
 */
function rememberApproval(conversation, meta, answer, user, edited) {
  if (!conversation.property_id) return;
  const question = clip(meta.summary || '', 300);
  if (!question) return;
  const link = checkinLinkOf(conversation);
  const text = withoutLink(answer.trim(), link);
  const same = q.get('SELECT id FROM examples WHERE property_id = ? AND lower(question) = lower(?)', conversation.property_id, question);
  if (same) {
    q.run("UPDATE examples SET answer = ?, private = ?, edited = ?, approved_by = ?, created_at = datetime('now') WHERE id = ?", text, conversation.verified ? 1 : 0, edited ? 1 : 0, user.id, same.id);
  } else {
    q.run('INSERT INTO examples(property_id, question, answer, private, edited, approved_by) VALUES(?, ?, ?, ?, ?, ?)', conversation.property_id, question, text, conversation.verified ? 1 : 0, edited ? 1 : 0, user.id);
    q.run('DELETE FROM examples WHERE property_id = ? AND id NOT IN (SELECT id FROM examples WHERE property_id = ? ORDER BY id DESC LIMIT ?)', conversation.property_id, conversation.property_id, MAX_EXAMPLES_PER_PROPERTY);
  }
}

/** The approved replies most relevant to the guest's message, newest first among equals. */
function examplesFor(conversation, latest, limit = 12) {
  if (!conversation.property_id) return [];
  const want = significant(latest);
  return q
    .all('SELECT * FROM examples WHERE property_id = ? AND (private = 0 OR ?) ORDER BY id DESC', conversation.property_id, conversation.verified ? 1 : 0)
    .map((e) => ({ e, score: [...significant(e.question + ' ' + e.answer)].filter((w) => want.has(w)).length }))
    .sort((a, b) => b.score - a.score || b.e.id - a.e.id)
    .slice(0, limit)
    .map(({ e }) => ({ guest_wanted: e.question, approved_reply: e.answer, corrected_by_team: e.edited ? true : undefined, approved_on: e.created_at.slice(0, 10) }));
}

/** Approve a drafted reply, optionally edited. remember saves the final text as knowledge. */
export async function approveDraft(messageId, user, { text, remember = false, scope = 'property', sensitive } = {}) {
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
      category: meta.category, question: meta.summary || guest?.body || 'Guest question', answer: finalText, userId: user.id, sensitive,
    });
  }
  if (draft.kind === 'answer') rememberApproval(conversation, meta, finalText, user, edited);
  audit(user.id, edited ? 'draft.approve_edited' : 'draft.approve', `message ${draft.id}`);
  const message = q.get('SELECT * FROM messages WHERE id = ?', draft.id);
  await deliver(conversation, message);
  return { message, knowledgeId };
}

/** Reject a draft. If the team writes their own reply it is sent in its place. */
export async function rejectDraft(messageId, user, { replyText, remember = false, scope = 'property', sensitive } = {}) {
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
    if (draft.kind === 'answer') rememberApproval(conversation, meta, replyText, user, true); // the team's own reply is the pattern to follow
    if (remember) {
      knowledgeId = saveKnowledge({
        propertyId: scope === 'global' ? null : conversation.property_id,
        category: meta.category, question: meta.summary || 'Guest question', answer: replyText, userId: user.id, sensitive,
      });
    }
  }
  return { message, knowledgeId };
}

/**
 * The team answers a request. The assistant words the reply for the guest (or sends the
 * team's words as written), and the answer can be saved so the assistant knows it next time.
 */
const answering = new Set(); // requests being answered right now, so a double tap cannot send twice

export async function answerTicket(ticketId, user, opts = {}) {
  if (answering.has(ticketId)) throw new HttpError(409, 'This request is already being answered.');
  answering.add(ticketId);
  try {
    return await answerTicketOnce(ticketId, user, opts);
  } finally {
    answering.delete(ticketId);
  }
}

async function answerTicketOnce(ticketId, user, { answer, reply: reviewed, remember = false, scope = 'property', sensitive, verbatim = false, close = true } = {}) {
  const ticket = q.get('SELECT * FROM tickets WHERE id = ?', ticketId);
  if (!ticket) throw new HttpError(404, 'Request not found.');
  if (ticket.status === 'closed') throw new HttpError(409, 'This request is already closed.');
  const text = String(answer || '').trim();
  if (!text) throw new HttpError(400, 'Please write an answer.');
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', ticket.conversation_id);

  let reply = text;
  let worded = false;
  if (String(reviewed || '').trim()) {
    reply = String(reviewed).trim(); // wording already previewed and confirmed by the team member
    worded = true;
  } else if (!verbatim) {
    try {
      reply = withLink(await llm.compose(buildContext(conversation, { latest: '' }), ticket, withoutLink(text, checkinLinkOf(conversation))), checkinLinkOf(conversation));
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
      category: ticket.category, question: ticket.question, answer: text, userId: user.id, sensitive,
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

/** How the assistant would word the team's answer for the guest. Nothing is sent. */
export async function previewTicketReply(ticketId, answer) {
  const ticket = q.get('SELECT * FROM tickets WHERE id = ?', ticketId);
  if (!ticket) throw new HttpError(404, 'Request not found.');
  const text = String(answer || '').trim();
  if (!text) throw new HttpError(400, 'Please write an answer.');
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', ticket.conversation_id);
  try {
    const link = checkinLinkOf(conversation);
    return { reply: withLink(await llm.compose(buildContext(conversation, { latest: '' }), ticket, withoutLink(text, link)), link), worded: true };
  } catch (e) {
    console.error(`Compose failed for ticket ${ticket.id}: ${e.message}`);
    return { reply: text, worded: false };
  }
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

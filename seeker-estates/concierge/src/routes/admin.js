// Team API: inbox (approvals and requests), conversations, properties and QR codes,
// knowledge base, settings, team members and push notifications.
import express from 'express';
import QRCode from 'qrcode';
import { config, SETTING_DEFAULTS } from '../config.js';
import { q, getSettings, setSetting, audit, parseJson } from '../db.js';
import { createUser, endTeamSession, hashPassword, requireAdmin, requireUser, startTeamSession, currentUser, verifyPassword } from '../auth.js';
import { answerTicket, approvalStats, approveDraft, closeTicket, previewTicketReply, propertyMode, rejectDraft, sendMessage, SENSITIVE_CATEGORIES, stageOf } from '../bot.js';
import { CATEGORIES } from '../llm.js';
import { bus, emitAdmin, emitConversation, notifyTeam, vapidPublicKey } from '../notify.js';
import { syncAll } from '../sync.js';
import { channelInboxOn, ensureWebhook } from '../channel.js';
import crypto from 'node:crypto';
import { clip, failureLimiter, HttpError, newToken, rateLimiter } from '../util.js';
import { iso, sse } from './shared.js';
import { posterHtml } from '../poster.js';
import { adminFile, getFile, MAX_IMAGE, modelImages, saveUpload, sendFile, sweepFiles } from '../media.js';
import { describePictures } from '../llm.js';

export const admin = express.Router();
const loginIpLimit = rateLimiter(40, 15 * 60_000); // all attempts per IP
const loginFailures = failureLimiter(8, 15 * 60_000); // wrong passwords per IP and email
const DUMMY_HASH = hashPassword(newToken()); // keeps response time the same for unknown emails
const setBool = (v) => (typeof v === 'boolean' ? v : undefined);
// Push services browsers actually use. Anything else is refused, so the server cannot be
// pointed at an arbitrary address.
const PUSH_HOSTS = /(^|\.)(fcm\.googleapis\.com|push\.apple\.com|push\.services\.mozilla\.com|notify\.windows\.com)$/;

/** In production the first administrator needs the setup code printed in the server log. */
export const setupToken = config.production ? process.env.SETUP_TOKEN || newToken(6) : '';

// --- serialisers ------------------------------------------------------------------------

const userNames = () => Object.fromEntries(q.all('SELECT id, name FROM users').map((u) => [u.id, u.name]));

function messageOut(m, names = userNames()) {
  const meta = parseJson(m.meta);
  return {
    id: m.id, conversationId: m.conversation_id, role: m.role === 'bot' ? 'assistant' : m.role, text: m.body,
    status: m.status, kind: m.kind, at: iso(m.created_at), sentAt: iso(m.sent_at),
    confidence: meta.confidence || null, category: meta.category || null, summary: meta.summary || null,
    automatic: !!meta.auto, edited: !!meta.edited, original: meta.original || null, ticketId: meta.ticketId || null,
    deliveryError: meta.deliveryError || null,
    attachments: (m.role === 'guest' ? q.all('SELECT token, kind FROM files WHERE message_id = ?', m.id) : meta.attachments || []).map((a) => adminFile(a)), links: meta.links || [],
    authorName: names[m.created_by] || names[meta.approvedBy] || names[meta.answeredBy] || null,
  };
}

function conversationOut(c) {
  const property = c.property_id ? q.get('SELECT id, name, display_name FROM properties WHERE id = ?', c.property_id) : null;
  const reservation = c.reservation_id ? q.get('SELECT * FROM reservations WHERE id = ?', c.reservation_id) : null;
  // Latest by when it was sent: an approved reply is newer than the holding note written after its draft.
  const last = q.get("SELECT role, body FROM messages WHERE conversation_id = ? AND (role = 'guest' OR status = 'sent') ORDER BY COALESCE(sent_at, created_at) DESC, id DESC LIMIT 1", c.id);
  return {
    id: c.id, propertyId: c.property_id, propertyName: property ? property.display_name || property.name : null,
    guestName: c.guest_name || null, verified: !!c.verified, channel: c.channel, language: c.language,
    botPaused: !!c.bot_paused, unread: !!c.needs_reply, stage: stageOf(c.verified ? reservation : null),
    stay: reservation && c.verified ? { arrival: reservation.arrival, departure: reservation.departure, checkIn: reservation.check_in, checkOut: reservation.check_out, channel: reservation.channel, smoobuId: reservation.id, checkinLink: reservation.checkin_link || null, checkinCompleted: !!reservation.checkin_done } : null,
    createdAt: iso(c.created_at), lastMessageAt: iso(c.last_message_at),
    lastMessage: last ? { role: last.role === 'bot' ? 'assistant' : last.role, text: clip(last.body, 160) } : null,
    pendingDrafts: q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND status = 'pending'", c.id).n,
    openTickets: q.get("SELECT COUNT(*) AS n FROM tickets WHERE conversation_id = ? AND status != 'closed'", c.id).n,
  };
}

function ticketOut(t, names = userNames()) {
  const c = q.get('SELECT * FROM conversations WHERE id = ?', t.conversation_id);
  const property = t.property_id ? q.get('SELECT name, display_name FROM properties WHERE id = ?', t.property_id) : null;
  const guest = t.guest_message_id ? q.get('SELECT body FROM messages WHERE id = ?', t.guest_message_id) : null;
  return {
    id: t.id, type: t.type, category: t.category, summary: t.summary, question: t.question, status: t.status,
    answer: t.answer, createdAt: iso(t.created_at), answeredAt: iso(t.answered_at), answeredByName: names[t.answered_by] || null,
    savedToKnowledge: !!t.knowledge_id, conversationId: t.conversation_id, propertyId: t.property_id,
    propertyName: property ? property.display_name || property.name : null,
    guestName: c?.guest_name || null, guestVerified: !!c?.verified, guestMessage: guest?.body || null,
    // Photos and videos the guest sent in this chat up to the message that raised the request.
    attachments: t.guest_message_id ? q.all('SELECT token, kind FROM files WHERE conversation_id = ? AND message_id IS NOT NULL AND message_id <= ? ORDER BY message_id DESC LIMIT 8', t.conversation_id, t.guest_message_id).map(adminFile) : [],
  };
}

function propertyOut(p, { full = false } = {}) {
  const settings = getSettings();
  const details = parseJson(p.details);
  const out = {
    id: p.id, ref: p.ref, name: p.name, displayName: p.display_name || p.name, area: p.area, postcode: p.postcode,
    station: p.station, mode: p.mode || null, effectiveMode: propertyMode(p, settings), active: !!p.active,
    smoobuId: p.smoobu_id, guestUrl: `${config.baseUrl}/g/${p.qr_token}`,
    knowledgeCount: q.get('SELECT COUNT(*) AS n FROM knowledge WHERE property_id = ?', p.id).n,
    exampleCount: q.get('SELECT COUNT(*) AS n FROM examples WHERE property_id = ?', p.id).n,
    stats: approvalStats(p.id),
  };
  if (full) Object.assign(out, { address: p.address, notes: p.notes, amenities: details.amenities || [], rooms: details.rooms || null });
  return out;
}

const knowledgeOut = (k) => ({
  id: k.id, propertyId: k.property_id, category: k.category, question: k.question, answer: k.answer,
  sensitive: !!k.sensitive, source: k.source, updatedAt: iso(k.updated_at),
  videoUrl: k.video_url || null, pictureNotes: k.media_notes || '',
  pictures: q.all("SELECT token, kind FROM files WHERE knowledge_id = ? ORDER BY rowid", k.id).map(adminFile),
});

// --- sign-in ----------------------------------------------------------------------------

admin.get('/setup', (req, res) => {
  res.json({ needsSetup: q.get('SELECT COUNT(*) AS n FROM users').n === 0, setupCodeRequired: !!setupToken });
});

/** First run only: create the first administrator. */
admin.post('/setup', (req, res) => {
  if (q.get('SELECT COUNT(*) AS n FROM users').n > 0) throw new HttpError(409, 'Setup is already complete. Please sign in.');
  if (!loginIpLimit(req.ip)) throw new HttpError(429, 'Too many attempts. Please wait 15 minutes.');
  const given = String(req.body?.setupCode || '');
  if (setupToken && !(given.length === setupToken.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(setupToken)))) {
    throw new HttpError(403, 'That setup code is not correct. It is printed in the server log when the service starts.');
  }
  const id = createUser({ email: req.body?.email, name: req.body?.name, password: req.body?.password, role: 'admin' });
  audit(id, 'setup');
  startTeamSession(res, id);
  res.status(201).json({ user: q.get('SELECT id, email, name, role FROM users WHERE id = ?', id) });
});

admin.post('/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const key = `${req.ip}|${email}`;
  if (!loginIpLimit(req.ip) || loginFailures.blocked(key)) throw new HttpError(429, 'Too many sign-in attempts. Please wait 15 minutes.');
  const user = q.get('SELECT * FROM users WHERE email = ?', email);
  const ok = verifyPassword(String(req.body?.password || ''), user ? user.password_hash : DUMMY_HASH);
  if (!user || !ok) {
    loginFailures.fail(key);
    throw new HttpError(401, 'Email or password is not correct.');
  }
  loginFailures.clear(key);
  startTeamSession(res, user.id);
  audit(user.id, 'login');
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

admin.post('/logout', (req, res) => {
  endTeamSession(req, res);
  res.json({ ok: true });
});

admin.get('/me', (req, res) => {
  const user = currentUser(req);
  if (!user) return res.status(401).json({ error: 'Please sign in.' });
  res.json({ user, llmMode: config.llmMode, smoobuMode: config.smoobuMode, smoobuInbox: channelInboxOn(), baseUrl: config.baseUrl, categories: CATEGORIES });
});

admin.use(requireUser);

// --- inbox ------------------------------------------------------------------------------

function inbox() {
  const names = userNames();
  const approvals = q.all("SELECT * FROM messages WHERE status = 'pending' ORDER BY id").map((m) => {
    const c = q.get('SELECT * FROM conversations WHERE id = ?', m.conversation_id);
    const meta = parseJson(m.meta);
    // The guest messages this draft answers. A draft keeps its place when the guest writes
    // again, so newer messages are found through the list it covers, not by position.
    const covered = (meta.covers || []).map((id) => q.get("SELECT body FROM messages WHERE id = ? AND conversation_id = ? AND role = 'guest'", id, m.conversation_id)?.body).filter(Boolean);
    const guestMessages = covered.length ? covered.slice(-5) : q
      .all("SELECT body FROM messages WHERE conversation_id = ? AND role = 'guest' AND id < ? ORDER BY id DESC LIMIT 3", m.conversation_id, m.id)
      .reverse()
      .map((g) => g.body);
    return { guestAttachments: q.all('SELECT token, kind FROM files WHERE conversation_id = ? AND message_id IN (SELECT value FROM json_each(?))', m.conversation_id, JSON.stringify(meta.covers || [])).map(adminFile), draft: messageOut(m, names), conversation: conversationOut(c), guestMessage: meta.guestMessageId ? q.get('SELECT body FROM messages WHERE id = ?', meta.guestMessageId)?.body || null : null, recentGuestMessages: guestMessages };
  });
  const order = "CASE type WHEN 'urgent' THEN 0 WHEN 'maintenance' THEN 1 ELSE 2 END";
  const tickets = q.all(`SELECT * FROM tickets WHERE status != 'closed' ORDER BY ${order}, id`).map((t) => ticketOut(t, names));
  return {
    approvals, tickets,
    counts: { approvals: approvals.length, tickets: tickets.length, urgent: tickets.filter((t) => t.type === 'urgent').length, total: approvals.length + tickets.length,
      unread: q.get('SELECT COUNT(*) AS n FROM conversations WHERE needs_reply = 1 AND id IN (SELECT conversation_id FROM messages)').n },
  };
}

admin.get('/inbox', (req, res) => res.json(inbox()));

admin.post('/messages/:id/approve', async (req, res) => {
  const { text, remember, scope, sensitive } = req.body || {};
  const out = await approveDraft(Number(req.params.id), req.user, { text, remember: !!remember, scope, sensitive: setBool(sensitive) });
  res.json({ message: messageOut(out.message), knowledgeId: out.knowledgeId });
});

admin.post('/messages/:id/reject', async (req, res) => {
  const { replyText, remember, scope, sensitive } = req.body || {};
  const out = await rejectDraft(Number(req.params.id), req.user, { replyText, remember: !!remember, scope, sensitive: setBool(sensitive) });
  res.json({ message: out.message ? messageOut(out.message) : null, knowledgeId: out.knowledgeId });
});

// --- requests (tickets) -----------------------------------------------------------------

admin.get('/tickets', (req, res) => {
  const status = String(req.query.status || 'open');
  const where = status === 'all' ? '1=1' : status === 'closed' ? "status = 'closed'" : "status != 'closed'";
  const names = userNames();
  res.json({ tickets: q.all(`SELECT * FROM tickets WHERE ${where} ORDER BY id DESC LIMIT 200`).map((t) => ticketOut(t, names)) });
});

admin.get('/tickets/:id', (req, res) => {
  const t = q.get('SELECT * FROM tickets WHERE id = ?', Number(req.params.id));
  if (!t) throw new HttpError(404, 'Request not found.');
  res.json({ ticket: ticketOut(t) });
});

admin.post('/tickets/:id/preview', async (req, res) => {
  res.json(await previewTicketReply(Number(req.params.id), req.body?.answer));
});

admin.post('/tickets/:id/answer', async (req, res) => {
  const { answer, reply, remember, scope, sensitive, verbatim, keepOpen } = req.body || {};
  if (String(reply || '').length > 4000) throw new HttpError(400, 'Messages can be up to 4000 characters.');
  const out = await answerTicket(Number(req.params.id), req.user, { answer, reply, remember: !!remember, scope, sensitive: setBool(sensitive), verbatim: !!verbatim, close: !keepOpen });
  res.json({ ticket: ticketOut(out.ticket), message: messageOut(out.message), knowledgeId: out.knowledgeId });
});

admin.post('/tickets/:id/close', (req, res) => {
  res.json({ ticket: ticketOut(closeTicket(Number(req.params.id), req.user)) });
});

// --- conversations ----------------------------------------------------------------------

admin.get('/conversations', (req, res) => {
  const clauses = ['1=1'];
  const params = [];
  if (req.query.propertyId) {
    clauses.push('property_id = ?');
    params.push(Number(req.query.propertyId));
  }
  if (req.query.q) {
    clauses.push("(guest_name LIKE ? ESCAPE '\\' OR id IN (SELECT conversation_id FROM messages WHERE body LIKE ? ESCAPE '\\'))");
    const like = `%${String(req.query.q).replace(/[\\%_]/g, '\\$&')}%`;
    params.push(like, like);
  }
  // Chats where the guest never wrote anything are noise.
  if (req.query.unread) clauses.push('needs_reply = 1');
  clauses.push('id IN (SELECT conversation_id FROM messages)');
  const rows = q.all(`SELECT * FROM conversations WHERE ${clauses.join(' AND ')} ORDER BY last_message_at DESC LIMIT 100`, ...params);
  res.json({ conversations: rows.map(conversationOut) });
});

function conversationOr404(id) {
  const c = q.get('SELECT * FROM conversations WHERE id = ?', Number(id));
  if (!c) throw new HttpError(404, 'Conversation not found.');
  return c;
}

admin.get('/conversations/:id', (req, res) => {
  const c = conversationOr404(req.params.id);
  const names = userNames();
  res.json({
    conversation: conversationOut(c),
    messages: q.all("SELECT * FROM messages WHERE conversation_id = ? AND status != 'superseded' ORDER BY sent_at IS NULL, COALESCE(sent_at, created_at), id", c.id).map((m) => messageOut(m, names)),
    tickets: q.all('SELECT * FROM tickets WHERE conversation_id = ? ORDER BY id', c.id).map((t) => ticketOut(t, names)),
  });
});

/** A team member writes to the guest directly. */
admin.post('/conversations/:id/reply', async (req, res) => {
  const c = conversationOr404(req.params.id);
  const text = String(req.body?.text || '').trim();
  if (!text) throw new HttpError(400, 'Please write a message.');
  if (text.length > 4000) throw new HttpError(400, 'Messages can be up to 4000 characters.');
  const m = await sendMessage(c, 'team', text, { createdBy: req.user.id });
  audit(req.user.id, 'conversation.reply', `conversation ${c.id}`);
  res.status(201).json({ message: messageOut(m) });
});

/** Mark a chat as read (responded) or unread (still needs a response). */
admin.post('/conversations/:id/read', (req, res) => {
  const c = conversationOr404(req.params.id);
  if (typeof req.body?.read !== 'boolean') throw new HttpError(400, 'read must be true or false.');
  q.run('UPDATE conversations SET needs_reply = ? WHERE id = ?', req.body.read ? 0 : 1, c.id);
  audit(req.user.id, req.body.read ? 'conversation.read' : 'conversation.unread', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)) });
});

/** Take over a chat (the assistant stops replying) or hand it back. */
admin.post('/conversations/:id/takeover', (req, res) => {
  const c = conversationOr404(req.params.id);
  q.run('UPDATE conversations SET bot_paused = ? WHERE id = ?', req.body?.paused ? 1 : 0, c.id);
  audit(req.user.id, req.body?.paused ? 'conversation.takeover' : 'conversation.handback', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)) });
});

/** Erase a conversation (for example on a guest's request). */
admin.delete('/conversations/:id', (req, res) => {
  const c = conversationOr404(req.params.id);
  q.run('DELETE FROM conversations WHERE id = ?', c.id);
  sweepFiles();
  audit(req.user.id, 'conversation.erase', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ ok: true });
});

// --- properties and QR codes ------------------------------------------------------------

function propertyOr404(id) {
  const p = q.get('SELECT * FROM properties WHERE id = ?', Number(id));
  if (!p) throw new HttpError(404, 'Property not found.');
  return p;
}

admin.get('/properties', (req, res) => {
  res.json({ properties: q.all('SELECT * FROM properties ORDER BY active DESC, COALESCE(ref, name)').map((p) => propertyOut(p)), defaultMode: getSettings().defaultMode });
});

admin.post('/properties/sync', async (req, res) => {
  if (config.smoobuMode !== 'live') throw new HttpError(400, 'Smoobu is not connected. Set SMOOBU_API_KEY and SMOOBU_API_SECRET.');
  const out = await syncAll();
  audit(req.user.id, 'smoobu.sync', JSON.stringify(out));
  res.json(out);
});

admin.get('/properties/:id', (req, res) => {
  const p = propertyOr404(req.params.id);
  const names = userNames();
  res.json({
    property: propertyOut(p, { full: true }),
    knowledge: q.all('SELECT * FROM knowledge WHERE property_id = ? ORDER BY category, id', p.id).map(knowledgeOut),
    // Replies the team approved here, which the assistant learns from. Newest first.
    examples: q.all('SELECT * FROM examples WHERE property_id = ? ORDER BY id DESC LIMIT 300', p.id).map((e) => ({
      id: e.id, question: e.question, answer: e.answer, verifiedOnly: !!e.private, edited: !!e.edited, approvedBy: names[e.approved_by] || null, at: iso(e.created_at),
    })),
  });
});

/** Forget an approved reply, e.g. one that is out of date. */
admin.delete('/examples/:id', (req, res) => {
  q.run('DELETE FROM examples WHERE id = ?', Number(req.params.id));
  audit(req.user.id, 'example.delete', `example ${req.params.id}`);
  res.json({ ok: true });
});

admin.patch('/properties/:id', (req, res) => {
  const p = propertyOr404(req.params.id);
  const b = req.body || {};
  const fields = { displayName: 'display_name', area: 'area', postcode: 'postcode', address: 'address', station: 'station', notes: 'notes' };
  for (const [key, column] of Object.entries(fields)) {
    if (key in b) q.run(`UPDATE properties SET ${column} = ? WHERE id = ?`, b[key] === null ? null : clip(b[key], 2000), p.id);
  }
  if ('active' in b) q.run('UPDATE properties SET active = ? WHERE id = ?', b.active ? 1 : 0, p.id);
  if ('mode' in b) {
    if (![null, 'learning', 'auto'].includes(b.mode)) throw new HttpError(400, 'Mode must be learning, auto or null.');
    q.run('UPDATE properties SET mode = ? WHERE id = ?', b.mode, p.id);
    audit(req.user.id, 'property.mode', `property ${p.id} -> ${b.mode ?? 'default'}`);
  }
  q.run("UPDATE properties SET updated_at = datetime('now') WHERE id = ?", p.id);
  emitAdmin('properties');
  res.json({ property: propertyOut(propertyOr404(p.id), { full: true }) });
});

/** Issue a new QR code; the old one stops working. */
admin.post('/properties/:id/rotate-qr', (req, res) => {
  const p = propertyOr404(req.params.id);
  q.run('UPDATE properties SET qr_token = ? WHERE id = ?', newToken(9), p.id);
  audit(req.user.id, 'property.rotate_qr', `property ${p.id}`);
  emitAdmin('properties');
  res.json({ property: propertyOut(propertyOr404(p.id), { full: true }) });
});

const QR_OPTIONS = { errorCorrectionLevel: 'Q', margin: 2, color: { dark: '#0F3D2E', light: '#FFFFFF' } };
const qrUrl = (p) => `${config.baseUrl}/g/${p.qr_token}`;
const slug = (p) => (p.ref || `property-${p.id}`).toLowerCase().replace(/[^a-z0-9]+/g, '-');

admin.get('/properties/:id/qr.svg', async (req, res) => {
  const p = propertyOr404(req.params.id);
  res.type('image/svg+xml');
  if (req.query.download) res.attachment(`seeker-qr-${slug(p)}.svg`);
  res.send(await QRCode.toString(qrUrl(p), { ...QR_OPTIONS, type: 'svg' }));
});

admin.get('/properties/:id/qr.png', async (req, res) => {
  const p = propertyOr404(req.params.id);
  res.type('image/png');
  if (req.query.download) res.attachment(`seeker-qr-${slug(p)}.png`);
  res.send(await QRCode.toBuffer(qrUrl(p), { ...QR_OPTIONS, width: 1200 }));
});

/** Print-ready card for the property (A5 portrait). */
admin.get('/properties/:id/poster', async (req, res) => {
  const p = propertyOr404(req.params.id);
  const svg = await QRCode.toString(qrUrl(p), { ...QR_OPTIONS, type: 'svg', margin: 0 });
  res.type('html').send(posterHtml({ property: p, qrSvg: svg, settings: getSettings() }));
});

// --- knowledge base ---------------------------------------------------------------------

admin.get('/knowledge', (req, res) => {
  const rows = req.query.scope === 'global'
    ? q.all('SELECT * FROM knowledge WHERE property_id IS NULL ORDER BY category, id')
    : req.query.propertyId
      ? q.all('SELECT * FROM knowledge WHERE property_id = ? ORDER BY category, id', Number(req.query.propertyId))
      : q.all('SELECT * FROM knowledge ORDER BY property_id IS NOT NULL, property_id, category, id');
  res.json({ knowledge: rows.map(knowledgeOut), categories: CATEGORIES });
});

function knowledgeInput(b, existing = {}) {
  const category = b.category ?? existing.category ?? 'other';
  if (!CATEGORIES.includes(category)) throw new HttpError(400, 'Unknown category.');
  const question = String(b.question ?? existing.question ?? '').trim();
  const answer = String(b.answer ?? existing.answer ?? '').trim();
  if (!question || !answer) throw new HttpError(400, 'Please fill in both the topic and the answer.');
  if (question.length > 500 || answer.length > 6000) throw new HttpError(400, 'That entry is too long.');
  const sensitive = 'sensitive' in b ? !!b.sensitive : existing.sensitive !== undefined ? !!existing.sensitive : SENSITIVE_CATEGORIES.has(category);
  let videoUrl = 'videoUrl' in b ? String(b.videoUrl || '').trim() : existing.video_url || '';
  if (videoUrl) {
    try {
      const u = new URL(videoUrl);
      if (u.protocol !== 'https:') throw new Error('not https');
      videoUrl = u.href;
    } catch {
      throw new HttpError(400, 'The video link must be a full web address starting with https://');
    }
    if (videoUrl.length > 500) throw new HttpError(400, 'That video link is too long.');
  }
  const mediaNotes = clip('pictureNotes' in b ? b.pictureNotes : existing.media_notes || '', 2000);
  return { category, question, answer, sensitive: sensitive ? 1 : 0, videoUrl: videoUrl || null, mediaNotes: mediaNotes || null };
}

/** Set an entry's pictures to exactly this list of uploaded files (at most 6). */
function setPictures(knowledgeId, tokens, user) {
  if (!Array.isArray(tokens)) return;
  const wanted = [...new Set(tokens.map(String))].slice(0, 6);
  for (const token of wanted) {
    const f = getFile(token);
    // Only pictures this team uploaded for the knowledge base, never a guest's file.
    if (!f || f.kind !== 'image' || f.conversation_id || (f.knowledge_id && f.knowledge_id !== knowledgeId)) throw new HttpError(400, 'One of the pictures could not be attached. Please upload it again.');
    q.run('UPDATE files SET knowledge_id = ? WHERE token = ?', knowledgeId, token);
  }
  for (const f of q.all('SELECT token FROM files WHERE knowledge_id = ?', knowledgeId)) {
    if (!wanted.includes(f.token)) q.run('DELETE FROM files WHERE token = ?', f.token);
  }
  sweepFiles();
  audit(user.id, 'knowledge.pictures', `knowledge ${knowledgeId}: ${wanted.length} picture(s)`);
}

admin.post('/knowledge', (req, res) => {
  const b = req.body || {};
  const propertyId = b.propertyId ? propertyOr404(b.propertyId).id : null;
  const k = knowledgeInput(b);
  const id = q.insert("INSERT INTO knowledge(property_id, category, question, answer, sensitive, video_url, media_notes, source, created_by) VALUES(?, ?, ?, ?, ?, ?, ?, 'team', ?)", propertyId, k.category, k.question, k.answer, k.sensitive, k.videoUrl, k.mediaNotes, req.user.id);
  setPictures(id, b.pictures, req.user);
  audit(req.user.id, 'knowledge.create', `knowledge ${id}`);
  res.status(201).json({ knowledge: knowledgeOut(q.get('SELECT * FROM knowledge WHERE id = ?', id)) });
});

admin.patch('/knowledge/:id', (req, res) => {
  const existing = q.get('SELECT * FROM knowledge WHERE id = ?', Number(req.params.id));
  if (!existing) throw new HttpError(404, 'Entry not found.');
  const k = knowledgeInput(req.body || {}, existing);
  const propertyId = 'propertyId' in (req.body || {}) ? (req.body.propertyId ? propertyOr404(req.body.propertyId).id : null) : existing.property_id;
  q.run("UPDATE knowledge SET property_id = ?, category = ?, question = ?, answer = ?, sensitive = ?, video_url = ?, media_notes = ?, updated_at = datetime('now') WHERE id = ?", propertyId, k.category, k.question, k.answer, k.sensitive, k.videoUrl, k.mediaNotes, existing.id);
  setPictures(existing.id, req.body?.pictures, req.user);
  audit(req.user.id, 'knowledge.update', `knowledge ${existing.id}`);
  res.json({ knowledge: knowledgeOut(q.get('SELECT * FROM knowledge WHERE id = ?', existing.id)) });
});

/** Upload a picture for the knowledge base. The request body is the file itself. */
admin.post('/uploads', express.raw({ type: 'image/*', limit: MAX_IMAGE }), (req, res) => {
  if (!Buffer.isBuffer(req.body) || !req.body.length) throw new HttpError(400, 'No picture was received.');
  const f = saveUpload(req.body, { userId: req.user.id, allow: ['image'] });
  res.status(201).json({ file: adminFile(f) });
});

/** Any stored picture or video, for the team app. */
admin.get('/files/:token', (req, res) => {
  const f = getFile(req.params.token);
  if (!f) throw new HttpError(404, 'That file is no longer available.');
  sendFile(res, f);
});

/**
 * Ask the model to read pictures of an appliance or device and draft guest instructions.
 * Nothing is saved: the team member reviews the draft in the entry form.
 */
admin.post('/knowledge/describe', async (req, res) => {
  const tokens = Array.isArray(req.body?.pictures) ? req.body.pictures.slice(0, 6) : [];
  const files = tokens.map(getFile).filter((f) => f && f.kind === 'image' && !f.conversation_id);
  if (!files.length) throw new HttpError(400, 'Add at least one picture first.');
  const images = await modelImages(files);
  if (!images.length) throw new HttpError(400, 'Those pictures could not be read. Please upload them again.');
  const property = req.body?.propertyId ? q.get('SELECT display_name, name FROM properties WHERE id = ?', Number(req.body.propertyId)) : null;
  try {
    res.json(await describePictures(images, { topic: clip(req.body?.topic || '', 200), propertyName: property ? property.display_name || property.name : '' }));
  } catch (e) {
    console.error(`Describe pictures failed: ${e.message}`);
    throw new HttpError(502, 'The assistant could not read the pictures just now. Please try again, or write the instructions by hand.');
  }
});

admin.delete('/knowledge/:id', (req, res) => {
  q.run('DELETE FROM knowledge WHERE id = ?', Number(req.params.id));
  sweepFiles();
  audit(req.user.id, 'knowledge.delete', `knowledge ${req.params.id}`);
  res.json({ ok: true });
});

// --- settings, team, audit --------------------------------------------------------------

admin.get('/settings', (req, res) => res.json({ settings: getSettings() }));

admin.patch('/settings', requireAdmin, async (req, res) => {
  const b = req.body || {};
  // Switching channel messages on connects Smoobu first; if that fails nothing is saved.
  if (b.channelInbox === true && !getSettings().channelInbox) await ensureWebhook();
  const numbers = { accessInfoHours: [0, 336], retentionDays: [7, 730], holdingMinutes: [1, 240] };
  for (const key of Object.keys(SETTING_DEFAULTS)) {
    if (!(key in b)) continue;
    let value = b[key];
    if (key === 'channelInbox' || key === 'channelAuto') {
      if (typeof value !== 'boolean') throw new HttpError(400, `${key} must be true or false.`);
    } else if (key === 'defaultMode') {
      if (!['learning', 'auto'].includes(value)) throw new HttpError(400, 'Default mode must be learning or auto.');
    } else if (numbers[key]) {
      value = Number(value);
      const [min, max] = numbers[key];
      if (!Number.isFinite(value) || value < min || value > max) throw new HttpError(400, `${key} must be between ${min} and ${max}.`);
      value = Math.round(value);
    } else {
      value = clip(value, key === 'checkinPortalNote' ? 800 : 200);
      if (key === 'botName' && !value) throw new HttpError(400, 'The assistant needs a name.');
    }
    setSetting(key, value);
    audit(req.user.id, 'settings.update', `${key} = ${value}`);
  }
  emitAdmin('properties');
  res.json({ settings: getSettings() });
});

admin.get('/users', (req, res) => {
  res.json({ users: q.all('SELECT id, email, name, role, created_at FROM users ORDER BY id').map((u) => ({ id: u.id, email: u.email, name: u.name, role: u.role, createdAt: iso(u.created_at), notifications: q.get('SELECT COUNT(*) AS n FROM push_subscriptions WHERE user_id = ?', u.id).n > 0 })) });
});

admin.post('/users', requireAdmin, (req, res) => {
  const id = createUser(req.body || {});
  audit(req.user.id, 'user.create', `user ${id}`);
  res.status(201).json({ user: q.get('SELECT id, email, name, role FROM users WHERE id = ?', id) });
});

admin.delete('/users/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (id === req.user.id) throw new HttpError(400, 'You cannot remove your own account.');
  q.run('DELETE FROM users WHERE id = ?', id);
  audit(req.user.id, 'user.delete', `user ${id}`);
  res.json({ ok: true });
});

admin.post('/password', (req, res) => {
  const row = q.get('SELECT password_hash FROM users WHERE id = ?', req.user.id);
  if (!verifyPassword(String(req.body?.current || ''), row.password_hash)) throw new HttpError(400, 'Your current password is not correct.');
  if (String(req.body?.next || '').length < 10) throw new HttpError(400, 'Passwords need at least 10 characters.');
  q.run('UPDATE users SET password_hash = ? WHERE id = ?', hashPassword(req.body.next), req.user.id);
  // Sign out everywhere, then start a fresh session on this device.
  q.run('DELETE FROM sessions WHERE user_id = ?', req.user.id);
  startTeamSession(res, req.user.id);
  audit(req.user.id, 'user.password');
  res.json({ ok: true });
});

admin.get('/audit', requireAdmin, (req, res) => {
  const names = userNames();
  res.json({ entries: q.all('SELECT * FROM audit ORDER BY id DESC LIMIT 200').map((a) => ({ id: a.id, user: names[a.user_id] || (a.user_id ? 'Removed user' : 'System'), action: a.action, detail: a.detail, at: iso(a.created_at) })) });
});

// --- push notifications -----------------------------------------------------------------

admin.get('/push/key', (req, res) => res.json({ publicKey: vapidPublicKey() }));

admin.post('/push/subscribe', (req, res) => {
  const sub = req.body?.subscription;
  let host = '';
  try {
    const u = new URL(String(sub?.endpoint || ''));
    if (u.protocol === 'https:') host = u.hostname;
  } catch { /* not a URL */ }
  if (!PUSH_HOSTS.test(host) || typeof sub.keys?.p256dh !== 'string' || typeof sub.keys?.auth !== 'string') throw new HttpError(400, 'That is not a valid push subscription.');
  if (q.get('SELECT COUNT(*) AS n FROM push_subscriptions WHERE user_id = ?', req.user.id).n >= 10) {
    q.run('DELETE FROM push_subscriptions WHERE endpoint = (SELECT endpoint FROM push_subscriptions WHERE user_id = ? ORDER BY created_at LIMIT 1)', req.user.id);
  }
  q.run(
    'INSERT INTO push_subscriptions(endpoint, user_id, subscription) VALUES(?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET user_id = excluded.user_id, subscription = excluded.subscription',
    sub.endpoint, req.user.id, JSON.stringify({ endpoint: sub.endpoint, keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth } }),
  );
  res.status(201).json({ ok: true });
});

admin.post('/push/unsubscribe', (req, res) => {
  q.run('DELETE FROM push_subscriptions WHERE endpoint = ? AND user_id = ?', String(req.body?.endpoint || ''), req.user.id);
  res.json({ ok: true });
});

admin.post('/push/test', async (req, res) => {
  await notifyTeam({ title: 'Seeker Concierge', body: `Test notification from ${req.user.name}. Notifications are working.`, url: '/admin/#/inbox', tag: 'test' });
  res.json({ ok: true, devices: q.get('SELECT COUNT(*) AS n FROM push_subscriptions').n });
});

/** Live updates for admin screens. Every event means "refetch what you are showing". */
admin.get('/stream', (req, res) => {
  const send = sse(req, res, () => bus.off('admin', onEvent));
  const onEvent = (e) => send(e.type, { conversationId: e.conversationId ?? null, alert: e.alert ?? undefined });
  bus.on('admin', onEvent);
});

export { inbox };

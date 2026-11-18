// Team API: inbox (approvals and requests), conversations, properties and QR codes,
// knowledge base, settings, team members and push notifications.
import express from 'express';
import QRCode from 'qrcode';
import { config, SETTING_DEFAULTS } from '../config.js';
import { q, getRaw, getSettings, setSetting, audit, parseJson } from '../db.js';
import { createUser, endTeamSession, hashPassword, requireAdmin, requireUser, startTeamSession, currentUser, verifyPassword } from '../auth.js';
import { english, toGuestLanguage, reassess, teamAttachments, answerTicket, approvalStats, approveDraft, closeTicket, previewTicketReply, propertyMode, rejectDraft, sendMessage, SENSITIVE_CATEGORIES, stageOf } from '../bot.js';
import { CATEGORIES } from '../llm.js';
import { bus, emitAdmin, emitConversation, notifyTeam, vapidPublicKey } from '../notify.js';
import { refreshTeamRecords, syncAll } from '../sync.js';
import { channelInboxOn, ensureWebhook, webhookToken, webhookTokenPlain } from '../channel.js';
import crypto from 'node:crypto';
import { addDays, clip, failureLimiter, HttpError, londonDate, newToken, rateLimiter } from '../util.js';
import { taskOut } from './journey.js';
import { brand, BRAND_DEFAULTS, brandText, resetBrand, saveBrand, saveBrandFile } from '../brand.js';
import { syncThread } from '../thread-sync.js';
import { learnStyle, setStyle, styleStatus } from '../style.js';
import { historyStatus, startHistory } from '../history.js';
import { importGuestMessage } from './webhooks.js';
import { createTask, refreshTasks, todoCount, TASK_TYPES } from '../tasks.js';
import { offersFor } from '../bot.js';
import { iso, sse } from './shared.js';
import { posterHtml } from '../poster.js';
import { adminFile, getFile, MAX_VIDEO, modelImages, saveUpload, sendFile, sweepFiles } from '../media.js';
import { describePictures, fileKnowledge, translate } from '../llm.js';
import { sha256 } from '../util.js';
import { journey } from './journey.js';

export const admin = express.Router();
// Changes on every deploy. The team app compares it with the one it started with and reloads itself.
const BUILD = (process.env.RENDER_GIT_COMMIT || '').slice(0, 12) || String(Date.now());
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
    deliveryError: meta.deliveryError || null, external: !!meta.external, learned: !!meta.learned, withheldReason: meta.withheldReason || null, checkNote: meta.checkNote || null,
    // A draft read in English that goes out in the guest's language; once sent, the English that was agreed.
    sendIn: m.status === 'pending' && meta.sendIn && !english(meta.sendIn) ? meta.sendIn : null, english: m.status === 'sent' ? meta.english || null : null,
    attachments: (m.role === 'guest' ? q.all('SELECT token, kind FROM files WHERE message_id = ?', m.id) : meta.attachments || []).map((a) => adminFile(a)), links: meta.links || [],
    authorName: names[m.created_by] || names[meta.approvedBy] || names[meta.answeredBy] || null,
  };
}

function followUpOut(conversationId) {
  const f = q.get("SELECT * FROM followups WHERE conversation_id = ? AND status != 'dismissed'", conversationId);
  return f ? { text: f.body, at: f.send_at, status: f.status, note: f.note || null } : null;
}

function conversationOut(c) {
  const property = c.property_id ? q.get('SELECT id, name, display_name FROM properties WHERE id = ?', c.property_id) : null;
  const reservation = c.reservation_id ? q.get('SELECT * FROM reservations WHERE id = ?', c.reservation_id) : null;
  // Latest by when it was sent: an approved reply is newer than the holding note written after its draft.
  const last = q.get("SELECT role, body FROM messages WHERE conversation_id = ? AND (role = 'guest' OR status = 'sent') ORDER BY COALESCE(sent_at, created_at) DESC, id DESC LIMIT 1", c.id);
  return {
    id: c.id, propertyId: c.property_id, propertyName: property ? property.name || property.display_name : null,
    guestName: c.guest_name || null, verified: !!c.verified, channel: c.channel, language: c.language,
    botPaused: !!c.bot_paused, unread: !!c.needs_reply, archived: !!c.archived, summary: c.summary || null, mood: c.mood || null, followUp: followUpOut(c.id), stage: stageOf(c.verified ? reservation : null),
    stay: reservation && c.verified ? { arrival: reservation.arrival, departure: reservation.departure, checkIn: reservation.check_in, checkOut: reservation.check_out, channel: reservation.channel, smoobuId: reservation.id, checkinLink: reservation.checkin_link || null, checkinCompleted: !!reservation.checkin_done, extras: parseJson(reservation.extras, []).map((x) => ({ title: x.title, status: x.status, note: x.note || '' })) } : null,
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
    id: t.id, type: t.type, category: t.category, summary: t.summary, question: t.question, status: t.status, suggestion: t.status === 'open' ? t.suggestion || null : null,
    answer: t.answer, createdAt: iso(t.created_at), answeredAt: iso(t.answered_at), answeredByName: names[t.answered_by] || null,
    savedToKnowledge: !!t.knowledge_id, conversationId: t.conversation_id, propertyId: t.property_id,
    propertyName: property ? property.name || property.display_name : null,
    guestName: c?.guest_name || null, guestVerified: !!c?.verified, channel: c?.channel || 'web', language: c?.language || null, guestMessage: guest?.body || null,
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
  if (full) Object.assign(out, { teamRecord: parseJson(p.team_record, null), address: p.address, notes: p.notes, amenities: details.amenities || [], rooms: details.rooms || null });
  return out;
}

const knowledgeOut = (k) => ({
  id: k.id, propertyId: k.property_id, category: k.category, question: k.question, answer: k.answer,
  sensitive: !!k.sensitive, source: k.source, updatedAt: iso(k.updated_at),
  videoUrl: k.video_url || null, pictureNotes: k.media_notes || '',
  pictures: q.all("SELECT token, kind FROM files WHERE knowledge_id = ? AND kind = 'image' ORDER BY rowid", k.id).map(adminFile),
  videos: q.all("SELECT token, kind FROM files WHERE knowledge_id = ? AND kind = 'video' ORDER BY rowid", k.id).map(adminFile),
});

// --- sign-in ----------------------------------------------------------------------------

admin.get('/setup', (req, res) => {
  res.json({ needsSetup: q.get('SELECT COUNT(*) AS n FROM users').n === 0, setupCodeRequired: !!setupToken, version: BUILD });
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
  res.json({ user, llmMode: config.llmMode, smoobuMode: config.smoobuMode, smoobuInbox: channelInboxOn(), chargeAutomation: !!(config.caClientId && config.caClientSecret),
    chargeAutomationWebhook: `${config.baseUrl}/api/webhooks/chargeautomation/${webhookTokenPlain()}`, baseUrl: config.baseUrl, categories: CATEGORIES });
});

admin.use(requireUser);
admin.use(journey);

// --- inbox ------------------------------------------------------------------------------

function inbox() {
  const names = userNames();
  const approvals = q.all("SELECT * FROM messages WHERE status = 'pending' ORDER BY id").map((m) => {
    const c = q.get('SELECT * FROM conversations WHERE id = ?', m.conversation_id);
    const meta = parseJson(m.meta);
    // The guest messages this draft answers. A draft keeps its place when the guest writes
    // again, so newer messages are found through the list it covers, not by position.
    const covered = (meta.covers || []).map((id) => q.get("SELECT body FROM messages WHERE id = ? AND conversation_id = ? AND role = 'guest'", id, m.conversation_id)?.body).filter(Boolean);
    const guestMessages = covered.length ? covered.slice(-5) : m.kind === 'scheduled' ? [] : q
      .all("SELECT body FROM messages WHERE conversation_id = ? AND role = 'guest' AND id < ? ORDER BY id DESC LIMIT 3", m.conversation_id, m.id)
      .reverse()
      .map((g) => g.body);
    return { guestAttachments: q.all('SELECT token, kind FROM files WHERE conversation_id = ? AND message_id IN (SELECT value FROM json_each(?))', m.conversation_id, JSON.stringify(meta.covers || [])).map(adminFile), draft: messageOut(m, names), conversation: conversationOut(c), guestMessage: meta.guestMessageId ? q.get('SELECT body FROM messages WHERE id = ?', meta.guestMessageId)?.body || null : null, recentGuestMessages: guestMessages };
  });
  const order = "CASE type WHEN 'urgent' THEN 0 WHEN 'maintenance' THEN 1 ELSE 2 END";
  const tickets = q.all(`SELECT * FROM tickets WHERE status != 'closed' ORDER BY ${order}, id`).map((t) => ticketOut(t, names));
  return {
    approvals, tickets,
    counts: { todo: todoCount(), approvals: approvals.length, tickets: tickets.length, urgent: tickets.filter((t) => t.type === 'urgent').length, total: approvals.length + tickets.length,
      unread: q.get('SELECT COUNT(*) AS n FROM conversations WHERE needs_reply = 1 AND archived = 0 AND id IN (SELECT conversation_id FROM messages)').n },
  };
}

admin.get('/inbox', (req, res) => res.json(inbox()));

admin.post('/messages/:id/approve', async (req, res) => {
  const { text, remember, scope, sensitive, attachments, translate } = req.body || {};
  const out = await approveDraft(Number(req.params.id), req.user, { text, remember: !!remember, scope, sensitive: setBool(sensitive), attachments, translate: translate !== false });
  res.json({ message: messageOut(out.message), knowledgeId: out.knowledgeId });
});

admin.post('/messages/:id/reject', async (req, res) => {
  const { replyText, remember, scope, sensitive, attachments, translate } = req.body || {};
  const out = await rejectDraft(Number(req.params.id), req.user, { replyText, remember: !!remember, scope, sensitive: setBool(sensitive), attachments, translate: translate === true });
  res.json({ message: out.message ? messageOut(out.message) : null, knowledgeId: out.knowledgeId });
});

// --- calendar ---------------------------------------------------------------------------

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const nightsBetween = (a, b) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86400_000);

/** What the calendar shows for one booking: enough to scan the portfolio without opening anything. */
function bookingOut(r) {
  const chats = q.all('SELECT id, mood, needs_reply, archived FROM conversations WHERE reservation_id = ? ORDER BY last_message_at DESC', r.id);
  return {
    id: r.id, propertyId: r.property_id, guestName: r.guest_name || `${r.first_name || ''} ${r.last_name || ''}`.trim() || 'Guest',
    arrival: r.arrival, departure: r.departure, nights: nightsBetween(r.arrival, r.departure), channel: r.channel || null,
    adults: r.adults, children: r.children, checkIn: r.check_in, checkOut: r.check_out,
    checkinCompleted: !!r.checkin_done, hasCheckinLink: !!r.checkin_link,
    mood: chats.some((c) => c.mood === 'unhappy') ? 'unhappy' : chats.find((c) => c.mood)?.mood || null,
    unread: chats.some((c) => c.needs_reply), conversationId: chats[0]?.id ?? null,
    extras: parseJson(r.extras, []).filter((x) => x.status !== 'declined').map((x) => ({ title: x.title, status: x.status })),
    tasks: q.all("SELECT type, send_at, status FROM tasks WHERE reservation_id = ? AND status IN ('suggested', 'scheduled')", r.id).map((t) => ({ type: t.type, at: t.send_at, status: t.status })),
  };
}

/** Bookings, owner blocks, short free gaps and same-day turnovers for a range of days. Read-only: bookings are changed in Smoobu. */
admin.get('/calendar', (req, res) => {
  refreshTasks();
  const today = londonDate();
  const from = DAY.test(String(req.query.from)) ? String(req.query.from) : today;
  const days = Math.min(62, Math.max(7, parseInt(req.query.days, 10) || 14));
  const to = addDays(from, days); // exclusive
  // Named as in Smoobu (the listing name), so the calendar reads the same as the one the team already knows.
  const properties = q.all('SELECT id, name, display_name, ref FROM properties WHERE active = 1 ORDER BY COALESCE(position, 100000), name COLLATE NOCASE').map((p) => ({ id: p.id, name: p.name || p.display_name }));
  // A week either side, so a gap or turnover at the edge of the range is still seen.
  const rows = q.all('SELECT * FROM reservations WHERE cancelled = 0 AND departure >= ? AND arrival <= ? ORDER BY arrival', addDays(from, -7), addDays(to, 7));
  const blocks = q.all('SELECT property_id AS propertyId, arrival, departure FROM blocks WHERE departure >= ? AND arrival <= ?', addDays(from, -7), addDays(to, 7));
  const gaps = [];
  for (const p of properties) {
    const taken = [...rows.filter((r) => r.property_id === p.id).map((r) => ({ arrival: r.arrival, departure: r.departure, id: r.id })),
      ...blocks.filter((b) => b.propertyId === p.id).map((b) => ({ arrival: b.arrival, departure: b.departure, id: null }))].sort((a, b) => a.arrival.localeCompare(b.arrival));
    let end = null;
    let last = null;
    for (const t of taken) {
      if (end && t.arrival > end) {
        const nights = nightsBetween(end, t.arrival);
        // One to three free nights between two stays are hard to sell on their own: worth offering to the neighbours.
        if (nights <= 3 && end >= today) gaps.push({ propertyId: p.id, from: end, to: t.arrival, nights, beforeId: last?.id ?? null, afterId: t.id });
      }
      if (!end || t.departure > end) { end = t.departure; last = t; }
    }
  }
  const inRange = rows.filter((r) => r.departure >= from && r.arrival < to).map(bookingOut);
  const day = (where) => q.all(`SELECT * FROM reservations WHERE cancelled = 0 AND ${where} ORDER BY property_id`, today).map(bookingOut);
  res.json({
    from, days, today, properties, reservations: inRange, blocks: blocks.filter((b) => b.departure >= from && b.arrival < to), gaps: gaps.filter((g) => g.to > from && g.from < to),
    todayPanel: { arrivals: day('arrival = ?'), departures: day('departure = ?'), inHouse: q.all('SELECT * FROM reservations WHERE cancelled = 0 AND arrival < ? AND departure > ? ORDER BY property_id', today, today).map(bookingOut) },
  });
});

function reservationOr404(id) {
  const r = q.get('SELECT * FROM reservations WHERE id = ?', Number(id));
  if (!r) throw new HttpError(404, 'That booking is no longer here.');
  return r;
}

/** The guest card: the booking, what can be offered, messages proposed for it, and the message thread. */
admin.get('/reservations/:id', (req, res) => {
  const r = reservationOr404(req.params.id);
  refreshTasks();
  const names = userNames();
  const chats = q.all('SELECT * FROM conversations WHERE reservation_id = ? ORDER BY last_message_at DESC', r.id);
  const main = chats[0] || null;
  const property = q.get('SELECT name, display_name FROM properties WHERE id = ?', r.property_id);
  res.json({
    reservation: { ...bookingOut(r), propertyName: property ? property.name || property.display_name : null, cancelled: !!r.cancelled },
    offers: (offersFor(r) || []).map((o) => ({ extra: o.extra, price: o.price || o.last_price_on_checkin_page || null, conditions: o.conditions || null, possible: o.calendar ? o.calendar === 'possible' : true })),
    tasks: q.all("SELECT * FROM tasks WHERE reservation_id = ? AND status IN ('suggested', 'scheduled') ORDER BY send_at", r.id).map(taskOut),
    conversation: main ? conversationOut(main) : null,
    otherConversations: chats.slice(1).map((c) => ({ id: c.id, channel: c.channel })),
    messages: main ? q.all("SELECT * FROM (SELECT * FROM messages WHERE conversation_id = ? AND (role = 'guest' OR status = 'sent') ORDER BY COALESCE(sent_at, created_at) DESC, id DESC LIMIT 30) ORDER BY COALESCE(sent_at, created_at), id", main.id).map((m) => messageOut(m, names)) : [],
  });
});

/** From a free gap in the calendar: propose an extra night to the guest before it, or an earlier arrival to the guest after it. */
admin.post('/reservations/:id/tasks', (req, res) => {
  const r = reservationOr404(req.params.id);
  const t = createTask(r, String(req.body?.type || ''), req.user);
  audit(req.user.id, 'task.create', `${t.type} booking ${r.id}`);
  res.status(201).json({ task: taskOut(t) });
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
  const { answer, reply, remember, scope, sensitive, verbatim, keepOpen, attachments } = req.body || {};
  if (String(reply || '').length > 4000) throw new HttpError(400, 'Messages can be up to 4000 characters.');
  const out = await answerTicket(Number(req.params.id), req.user, { answer, reply, remember: !!remember, scope, sensitive: setBool(sensitive), verbatim: !!verbatim, close: !keepOpen, attachments });
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
  // Archived chats are hidden unless asked for; a search looks through them too.
  if (req.query.archived) clauses.push('archived = 1');
  else if (!req.query.q) clauses.push('archived = 0');
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
  if (!c.mood) reassess(c.id, { force: true }); // an older chat: read it now, the face appears when done
  // Opening a booking-channel chat checks Smoobu for replies sent outside the app; the thread updates if any are found.
  if (c.channel === 'smoobu' && c.reservation_id && channelInboxOn()) syncThread(c.reservation_id, { importGuest: importGuestMessage }).catch((e) => console.error(`Thread check: ${e.message}`));
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
  const files = teamAttachments(c, req.body?.attachments);
  if (!text && !files.length) throw new HttpError(400, 'Please write a message.');
  if (text.length > 4000) throw new HttpError(400, 'Messages can be up to 4000 characters.');
  // Written in English, sent in the guest's language when the team member asks for that.
  const sendText = req.body?.translate === true && text ? await toGuestLanguage(c, text) : text;
  const m = await sendMessage(c, 'team', sendText, { createdBy: req.user.id, meta: { ...(files.length ? { attachments: files } : {}), ...(sendText !== text ? { english: text } : {}) } });
  for (const f of files) q.run('UPDATE files SET message_id = COALESCE(message_id, ?) WHERE token = ?', m.id, f.token);
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

/**
 * A team member sets the mood by hand. It holds until the guest's next message, when the
 * assistant reads the conversation again and may change it.
 */
admin.post('/conversations/:id/mood', (req, res) => {
  const c = conversationOr404(req.params.id);
  const mood = String(req.body?.mood || '');
  if (!['positive', 'neutral', 'unhappy'].includes(mood)) throw new HttpError(400, 'Choose happy, neutral or unhappy.');
  q.run('UPDATE conversations SET mood = ? WHERE id = ?', mood, c.id);
  // No longer unhappy: a check-in that was only suggested is not needed.
  if (mood !== 'unhappy') q.run("DELETE FROM followups WHERE conversation_id = ? AND status = 'suggested'", c.id);
  audit(req.user.id, 'conversation.mood', `conversation ${c.id} ${mood}`);
  refreshTasks(); // offers and thank-yous follow the mood
  emitConversation(c.id, 'conversation');
  emitAdmin('todo');
  res.json({ conversation: conversationOut(conversationOr404(c.id)) });
});

/** Schedule the check-in message for an unhappy guest (the assistant's proposal, edited or not). */
admin.post('/conversations/:id/followup', (req, res) => {
  const c = conversationOr404(req.params.id);
  const text = String(req.body?.text || '').trim().slice(0, 2000);
  const at = Date.parse(req.body?.at);
  if (!text) throw new HttpError(400, 'Write the message to send.');
  if (!Number.isFinite(at) || at < Date.now() - 60_000) throw new HttpError(400, 'Choose a time in the future.');
  if (at > Date.now() + 14 * 86400_000) throw new HttpError(400, 'Choose a time within the next two weeks.');
  q.run(
    `INSERT INTO followups(conversation_id, body, send_at, status, note, created_by, created_at) VALUES(?, ?, ?, 'scheduled', '', ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))
     ON CONFLICT(conversation_id) DO UPDATE SET body = excluded.body, send_at = excluded.send_at, status = 'scheduled', note = '', created_by = excluded.created_by, created_at = strftime('%Y-%m-%d %H:%M:%f', 'now')`,
    c.id, text, new Date(at).toISOString(), req.user.id,
  );
  audit(req.user.id, 'followup.schedule', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)) });
});

/** Dismiss the proposal, or cancel a scheduled check-in. It is not proposed again until the guest writes. */
admin.delete('/conversations/:id/followup', (req, res) => {
  const c = conversationOr404(req.params.id);
  q.run("UPDATE followups SET status = 'dismissed', note = '' WHERE conversation_id = ?", c.id);
  audit(req.user.id, 'followup.dismiss', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)) });
});

/** Withdraw the assistant's waiting suggestions in a chat. They are not counted as rejected. */
function withdrawDrafts(conversationId) {
  const drafts = q.all("SELECT id FROM messages WHERE conversation_id = ? AND status = 'pending' AND kind != 'scheduled'", conversationId);
  for (const d of drafts) {
    q.run("UPDATE messages SET status = 'superseded' WHERE id = ?", d.id);
    emitConversation(conversationId, 'draft', { messageId: d.id });
  }
  // Nothing in the chat is left waiting for the assistant either.
  q.run("UPDATE messages SET meta = json_set(meta, '$.handled', 1) WHERE conversation_id = ? AND role = 'guest' AND json_extract(meta, '$.handled') IS NULL", conversationId);
  return drafts.length;
}

/** "No response needed": mark the chat read and drop the assistant's suggested reply. */
admin.post('/conversations/:id/no-response', (req, res) => {
  const c = conversationOr404(req.params.id);
  const withdrawn = withdrawDrafts(c.id);
  q.run('UPDATE conversations SET needs_reply = 0 WHERE id = ?', c.id);
  audit(req.user.id, 'conversation.no_response', `conversation ${c.id}, ${withdrawn} suggestion(s) removed`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)), withdrawn });
});

/** Archive a chat (hide it from the list) or bring it back. A new guest message brings it back by itself. */
admin.post('/conversations/:id/archive', (req, res) => {
  const c = conversationOr404(req.params.id);
  if (typeof req.body?.archived !== 'boolean') throw new HttpError(400, 'archived must be true or false.');
  let withdrawn = 0;
  if (req.body.archived) {
    withdrawn = withdrawDrafts(c.id); // an archived chat is finished: no suggestion left waiting, not unread
    q.run('UPDATE conversations SET archived = 1, needs_reply = 0 WHERE id = ?', c.id);
  } else {
    q.run('UPDATE conversations SET archived = 0 WHERE id = ?', c.id);
  }
  audit(req.user.id, req.body.archived ? 'conversation.archive' : 'conversation.unarchive', `conversation ${c.id}`);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: conversationOut(conversationOr404(c.id)), withdrawn });
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
  res.json({ properties: q.all('SELECT * FROM properties ORDER BY active DESC, COALESCE(position, 100000), name COLLATE NOCASE').map((p) => propertyOut(p)), defaultMode: getSettings().defaultMode });
});

admin.post('/properties/sync', async (req, res) => {
  if (config.smoobuMode !== 'live') throw new HttpError(400, 'Smoobu is not connected. Set SMOOBU_API_KEY and SMOOBU_API_SECRET.');
  const out = { ...(await syncAll()), ...(await refreshTeamRecords()) };
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
  if (req.query.download) res.attachment(`qr-${slug(p)}.svg`);
  res.send(await QRCode.toString(qrUrl(p), { ...QR_OPTIONS, type: 'svg' }));
});

admin.get('/properties/:id/qr.png', async (req, res) => {
  const p = propertyOr404(req.params.id);
  res.type('image/png');
  if (req.query.download) res.attachment(`qr-${slug(p)}.png`);
  res.send(await QRCode.toBuffer(qrUrl(p), { ...QR_OPTIONS, width: 1200 }));
});

/** Print-ready card for the property (A5 portrait). */
admin.get('/properties/:id/poster', async (req, res) => {
  const p = propertyOr404(req.params.id);
  const svg = await QRCode.toString(qrUrl(p), { ...QR_OPTIONS, type: 'svg', margin: 0 });
  res.type('html').send(brandText(posterHtml({ property: p, qrSvg: svg, settings: getSettings() })));
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
  for (const f of q.all("SELECT token, message_id FROM files WHERE knowledge_id = ? AND kind = 'image'", knowledgeId)) {
    if (wanted.includes(f.token)) continue;
    // A picture that was also sent in a chat stays in that chat; it just leaves the entry.
    if (f.message_id) q.run('UPDATE files SET knowledge_id = NULL WHERE token = ?', f.token);
    else q.run('DELETE FROM files WHERE token = ?', f.token);
  }
  sweepFiles();
  audit(user.id, 'knowledge.pictures', `knowledge ${knowledgeId}: ${wanted.length} picture(s)`);
}

/**
 * From Insights: a team member answers a question the assistant could not, in their own quick
 * words. The assistant tidies it into an entry in the right section of that property's knowledge.
 */
admin.post('/knowledge/from-gap', async (req, res) => {
  const b = req.body || {};
  const property = b.propertyId ? propertyOr404(b.propertyId) : null;
  const question = clip(String(b.question || '').trim(), 300);
  const answer = String(b.answer || '').trim().slice(0, 4000);
  if (!question || !answer) throw new HttpError(400, 'Write the answer first.');
  let entry;
  try {
    entry = await fileKnowledge({ propertyName: property ? property.display_name || property.name : '', question, answer });
  } catch (e) {
    console.error(`Filing knowledge failed: ${e.message}`);
    entry = { category: 'other', question, answer }; // saved as written rather than lost
  }
  // Door codes and WiFi details are for verified guests only, whatever was ticked.
  const sensitive = b.sensitive === true || SENSITIVE_CATEGORIES.has(entry.category);
  const id = q.insert("INSERT INTO knowledge(property_id, category, question, answer, sensitive, source, created_by) VALUES(?, ?, ?, ?, ?, 'team', ?)",
    property?.id ?? null, entry.category, clip(entry.question, 500), entry.answer, sensitive ? 1 : 0, req.user.id);
  // The requests that raised this question now count as covered.
  q.run("UPDATE tickets SET knowledge_id = ? WHERE type = 'question' AND knowledge_id IS NULL AND property_id IS ? AND lower(summary) = lower(?)", id, property?.id ?? null, question);
  audit(req.user.id, 'knowledge.create', `knowledge ${id} from insights`);
  res.status(201).json({ knowledge: knowledgeOut(q.get('SELECT * FROM knowledge WHERE id = ?', id)) });
});

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

/**
 * Upload a picture (for the knowledge base or a reply) or a video (for a reply). The request
 * body is the file itself.
 */
admin.post('/uploads', express.raw({ type: ['image/*', 'video/*'], limit: MAX_VIDEO }), (req, res) => {
  if (!Buffer.isBuffer(req.body) || !req.body.length) throw new HttpError(400, 'No file was received.');
  const f = saveUpload(req.body, { userId: req.user.id });
  res.status(201).json({ file: adminFile(f) });
});

/**
 * Minutes guests waited for a real reply over the last `days`: from the first unanswered guest
 * message to the next sent reply in that chat. Holding notes ("confirming with the team") do not count.
 */
function replyTimes(days) {
  const since = `-${days} days`;
  const waits = [];
  let chat = null;
  let waitingSince = null;
  for (const m of q.all(
    `SELECT conversation_id, role, kind, COALESCE(sent_at, created_at) AS at FROM messages
     WHERE (role = 'guest' OR (status = 'sent' AND kind != 'holding')) AND conversation_id IN
       (SELECT conversation_id FROM messages WHERE role = 'guest' AND created_at > datetime('now', ?))
     ORDER BY conversation_id, COALESCE(sent_at, created_at), id`,
    since,
  )) {
    if (m.conversation_id !== chat) {
      chat = m.conversation_id;
      waitingSince = null;
    }
    const at = Date.parse(`${m.at.replace(' ', 'T')}Z`);
    if (m.role === 'guest') waitingSince ??= at;
    else if (waitingSince != null) {
      if (waitingSince > Date.now() - days * 86400_000) waits.push((at - waitingSince) / 60000);
      waitingSince = null;
    }
  }
  waits.sort((a, b) => a - b);
  const median = waits.length ? waits[Math.floor((waits.length - 1) / 2)] : null;
  return { median, waits };
}

/** The dashboard: what needs attention now, today's comings and goings, and how the last days went. */
admin.get('/dashboard', (req, res) => {
  refreshTasks();
  const today = londonDate();
  const count = (sql, ...p) => q.get(sql, ...p).n;
  const tickets = q.all("SELECT type, COUNT(*) AS n FROM tickets WHERE status != 'closed' GROUP BY type");
  const ticketCount = (type) => tickets.find((t) => t.type === type)?.n || 0;
  const active = count('SELECT COUNT(*) AS n FROM properties WHERE active = 1');
  const reply = replyTimes(7);
  // Guest messages per day, for the last 14 days (London dates).
  const byDate = {};
  for (const m of q.all("SELECT created_at FROM messages WHERE role = 'guest' AND created_at > datetime('now', '-15 days')")) {
    const d = londonDate(new Date(`${m.created_at.replace(' ', 'T')}Z`));
    byDate[d] = (byDate[d] || 0) + 1;
  }
  const moods = Object.fromEntries(q.all("SELECT COALESCE(mood, 'neutral') AS mood, COUNT(*) AS n FROM conversations WHERE last_message_at > datetime('now', '-14 days') AND id IN (SELECT conversation_id FROM messages WHERE role = 'guest') GROUP BY 1").map((r) => [r.mood, r.n]));
  const offers = offerInsights('-30 days');
  const sent = q.get(
    `SELECT SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.auto') = 1 AND kind IN ('answer', 'checkin') THEN 1 ELSE 0 END) AS automatic, COUNT(*) AS total
     FROM messages WHERE status = 'sent' AND role != 'guest' AND kind NOT IN ('holding', 'scheduled') AND sent_at > datetime('now', '-7 days')`);
  res.json({
    today,
    inbox: { approvals: count("SELECT COUNT(*) AS n FROM messages WHERE status = 'pending'"), requests: tickets.reduce((n, t) => n + t.n, 0), urgent: ticketCount('urgent'), maintenance: ticketCount('maintenance'), questions: ticketCount('question') },
    todo: todoCount(),
    scheduled: count("SELECT (SELECT COUNT(*) FROM tasks WHERE status = 'scheduled') + (SELECT COUNT(*) FROM followups WHERE status = 'scheduled') AS n"),
    unread: count('SELECT COUNT(*) AS n FROM conversations WHERE needs_reply = 1 AND archived = 0'),
    unhappy: count("SELECT COUNT(*) AS n FROM conversations WHERE mood = 'unhappy' AND archived = 0 AND last_message_at > datetime('now', '-14 days')"),
    properties: { active, total: count('SELECT COUNT(*) AS n FROM properties'), auto: q.all('SELECT * FROM properties WHERE active = 1').filter((p) => propertyMode(p) === 'auto').length },
    reply: { medianMinutes: reply.median, measured: reply.waits.length },
    withoutTeamPercent: sent.total ? Math.round(((sent.automatic || 0) / sent.total) * 100) : null,
    stays: {
      arrivals: count('SELECT COUNT(*) AS n FROM reservations WHERE cancelled = 0 AND arrival = ?', today),
      departures: count('SELECT COUNT(*) AS n FROM reservations WHERE cancelled = 0 AND departure = ?', today),
      // Occupied tonight: a guest sleeps there, whether they arrived today or earlier.
      occupied: count('SELECT COUNT(DISTINCT property_id) AS n FROM reservations WHERE cancelled = 0 AND arrival <= ? AND departure > ? AND property_id IN (SELECT id FROM properties WHERE active = 1)', today, today),
      formsMissing: count('SELECT COUNT(*) AS n FROM reservations WHERE cancelled = 0 AND arrival BETWEEN ? AND ? AND checkin_link IS NOT NULL AND checkin_done = 0', today, addDays(today, 2)),
    },
    messagesByDay: Array.from({ length: 14 }, (_, i) => { const d = addDays(today, i - 13); return { date: d, n: byDate[d] || 0 }; }),
    arrivalsByDay: Array.from({ length: 7 }, (_, i) => { const d = addDays(today, i); return { date: d, arrivals: count('SELECT COUNT(*) AS n FROM reservations WHERE cancelled = 0 AND arrival = ?', d), departures: count('SELECT COUNT(*) AS n FROM reservations WHERE cancelled = 0 AND departure = ?', d) }; }),
    moods: { positive: moods.positive || 0, neutral: moods.neutral || 0, unhappy: moods.unhappy || 0 },
    offers: { sent: offers.sent, accepted: offers.accepted, revenue: offers.revenue, currency: offers.currency },
    // Tonight's guests, for the ring: initials, mood, and the chat to open.
    guests: q.all('SELECT * FROM reservations WHERE cancelled = 0 AND arrival <= ? AND departure > ? AND property_id IN (SELECT id FROM properties WHERE active = 1) ORDER BY arrival DESC LIMIT 8', today, today).map((r) => {
      const b = bookingOut(r);
      return { id: r.id, name: b.guestName, initials: b.guestName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase() || 'G', mood: b.mood, unread: b.unread, conversationId: b.conversationId, channel: b.channel };
    }),
    agenda: agendaToday(today),
    answers: answersSplit('-30 days'),
  });
});

/** Who wrote the replies sent in a period. */
function answersSplit(since) {
  const s = q.get(
    `SELECT
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.auto') = 1 AND kind IN ('answer', 'checkin') THEN 1 ELSE 0 END) AS automatic,
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.approvedBy') IS NOT NULL AND json_extract(meta, '$.edited') = 0 THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.edited') = 1 THEN 1 ELSE 0 END) AS edited,
       SUM(CASE WHEN role = 'team' OR kind = 'relay' THEN 1 ELSE 0 END) AS written
     FROM messages WHERE status = 'sent' AND role != 'guest' AND kind NOT IN ('holding', 'scheduled') AND sent_at > datetime('now', ?)`, since);
  return { automatic: s.automatic || 0, approved: s.approved || 0, edited: s.edited || 0, written: s.written || 0 };
}

/** Today in time order: who leaves, who arrives, and the messages scheduled to go out. */
function agendaToday(today) {
  const name = (id) => { const p = q.get('SELECT name FROM properties WHERE id = ?', id); return p ? p.name : ''; };
  const guest = (r) => r.guest_name || `${r.first_name || ''} ${r.last_name || ''}`.trim() || 'Guest';
  const items = [
    ...q.all('SELECT * FROM reservations WHERE cancelled = 0 AND departure = ?', today).map((r) => ({ time: r.check_out || '11:00', kind: 'out', title: `Out · ${guest(r)}`, detail: name(r.property_id), reservationId: r.id })),
    ...q.all('SELECT * FROM reservations WHERE cancelled = 0 AND arrival = ?', today).map((r) => ({ time: r.check_in || '15:00', kind: 'in', title: `In · ${guest(r)}`, detail: `${name(r.property_id)}${r.checkin_link && !r.checkin_done ? ' · form not done' : ''}`, reservationId: r.id })),
  ];
  const clock = (iso) => new Intl.DateTimeFormat('en-GB', { timeZone: config.timezone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(iso));
  for (const t of q.all("SELECT * FROM tasks WHERE status = 'scheduled'")) {
    if (londonDate(new Date(t.send_at)) !== today) continue;
    const r = q.get('SELECT * FROM reservations WHERE id = ?', t.reservation_id);
    items.push({ time: clock(t.send_at), kind: 'message', title: `Message goes out · ${r ? guest(r) : 'Guest'}`, detail: TASK_TYPES[t.type]?.label || 'Scheduled message', reservationId: t.reservation_id });
  }
  for (const f of q.all("SELECT f.*, c.guest_name FROM followups f JOIN conversations c ON c.id = f.conversation_id WHERE f.status = 'scheduled'")) {
    if (londonDate(new Date(f.send_at)) !== today) continue;
    items.push({ time: clock(f.send_at), kind: 'message', title: `Check-in goes out · ${f.guest_name || 'Guest'}`, detail: 'Message to an unhappy guest', conversationId: f.conversation_id });
  }
  return items.sort((a, b) => a.time.localeCompare(b.time)).slice(0, 12);
}

/** Money from offers over time, for the dashboard chart: one point per day (or per week for 90 days). */
admin.get('/dashboard/offers', (req, res) => {
  const days = [7, 30, 90].includes(Number(req.query.days)) ? Number(req.query.days) : 30;
  const step = days === 90 ? 7 : 1;
  const today = londonDate();
  const count = Math.ceil(days / step); // the last point always ends today
  const rows = q.all("SELECT sent_at, accepted_at, amount FROM offers_sent WHERE sent_at > datetime('now', ?) OR accepted_at > datetime('now', ?)", `-${count * step + 1} days`, `-${count * step + 1} days`);
  const day = (stamp) => londonDate(new Date(`${stamp.replace(' ', 'T')}Z`));
  const buckets = [];
  for (let k = 0; k < count; k++) {
    const to = addDays(today, -(count - 1 - k) * step);
    const from = addDays(to, -step + 1);
    const inside = (stamp) => stamp && day(stamp) >= from && day(stamp) <= to;
    const accepted = rows.filter((o) => inside(o.accepted_at));
    buckets.push({ from, to, sent: rows.filter((o) => inside(o.sent_at)).length, accepted: accepted.length, revenue: Math.round(accepted.reduce((n, o) => n + (o.amount || 0), 0) * 100) / 100 });
  }
  res.json({ days, buckets, sent: buckets.reduce((n, b) => n + b.sent, 0), accepted: buckets.reduce((n, b) => n + b.accepted, 0), revenue: Math.round(buckets.reduce((n, b) => n + b.revenue, 0) * 100) / 100, currency: '£' });
});

/** Numbers for the Insights page: how fast guests are answered, by whom, about what, and where the gaps are. */
admin.get('/insights', (req, res) => {
  const days = Math.min(365, Math.max(1, parseInt(req.query.days, 10) || 30));
  const since = `-${days} days`;
  const { median, waits } = replyTimes(days);
  const sent = q.get(
    `SELECT
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.auto') = 1 AND kind IN ('answer', 'checkin') THEN 1 ELSE 0 END) AS automatic,
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.approvedBy') IS NOT NULL AND json_extract(meta, '$.edited') = 0 THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN role = 'bot' AND json_extract(meta, '$.edited') = 1 THEN 1 ELSE 0 END) AS edited,
       SUM(CASE WHEN role = 'team' OR kind = 'relay' THEN 1 ELSE 0 END) AS written
     FROM messages WHERE status = 'sent' AND role != 'guest' AND kind != 'holding' AND sent_at > datetime('now', ?)`,
    since,
  );
  const answers = { automatic: sent.automatic || 0, approved: sent.approved || 0, edited: sent.edited || 0, written: sent.written || 0 };
  const total = answers.automatic + answers.approved + answers.edited + answers.written;
  const topics = q.all(
    `SELECT json_extract(meta, '$.category') AS category, COUNT(*) AS n FROM messages
     WHERE role = 'bot' AND json_extract(meta, '$.guestMessageId') IS NOT NULL AND status != 'superseded' AND created_at > datetime('now', ?)
     GROUP BY 1 HAVING category IS NOT NULL ORDER BY n DESC LIMIT 8`,
    since,
  );
  // Questions the assistant had to pass to the team: each is a gap in that property's knowledge.
  const gaps = q.all(
    `SELECT t.property_id AS propertyId, COALESCE(p.name, p.display_name, 'No property') AS propertyName, t.summary, COUNT(*) AS n,
            MAX(t.knowledge_id IS NOT NULL) AS saved
     FROM tickets t LEFT JOIN properties p ON p.id = t.property_id
     WHERE t.type = 'question' AND t.created_at > datetime('now', ?)
     GROUP BY t.property_id, lower(t.summary) ORDER BY saved ASC, n DESC, MAX(t.id) DESC LIMIT 20`,
    since,
  ).map((g) => ({ ...g, saved: !!g.saved }));
  const properties = q.all('SELECT * FROM properties WHERE active = 1 ORDER BY COALESCE(position, 100000), name COLLATE NOCASE').map((p) => {
    const stats = approvalStats(p.id, days);
    return {
      id: p.id, name: p.name || p.display_name, mode: propertyMode(p),
      chats: q.get("SELECT COUNT(*) AS n FROM conversations WHERE property_id = ? AND last_message_at > datetime('now', ?) AND id IN (SELECT conversation_id FROM messages)", p.id, since).n,
      questions: q.get("SELECT COUNT(*) AS n FROM tickets WHERE property_id = ? AND type = 'question' AND created_at > datetime('now', ?)", p.id, since).n,
      issues: q.get("SELECT COUNT(*) AS n FROM tickets WHERE property_id = ? AND type != 'question' AND created_at > datetime('now', ?)", p.id, since).n,
      reviewed: stats.reviewed, approvalRate: stats.approvalRate, knowledge: q.get('SELECT COUNT(*) AS n FROM knowledge WHERE property_id = ?', p.id).n,
    };
  }).filter((p) => p.chats || p.questions || p.issues);
  res.json({
    days,
    chats: q.get("SELECT COUNT(*) AS n FROM conversations WHERE last_message_at > datetime('now', ?) AND id IN (SELECT conversation_id FROM messages)", since).n,
    guestMessages: q.get("SELECT COUNT(*) AS n FROM messages WHERE role = 'guest' AND created_at > datetime('now', ?)", since).n,
    medianReplyMinutes: median == null ? null : Math.round(median * 10) / 10,
    repliesMeasured: waits.length,
    answers, withoutTeamPercent: total ? Math.round((answers.automatic / total) * 100) : null,
    unhappy: q.get("SELECT COUNT(*) AS n FROM conversations WHERE mood = 'unhappy' AND last_message_at > datetime('now', ?)", since).n,
    topics, gaps, properties, offers: offerInsights(since),
  });
});

/** Offers sent from the to-do list: how many guests took one up, and what it brought in. */
function offerInsights(since) {
  const rows = q.all("SELECT * FROM offers_sent WHERE sent_at > datetime('now', ?) ORDER BY id DESC", since);
  const taken = rows.filter((o) => o.accepted_at);
  const sum = (list) => Math.round(list.reduce((n, o) => n + (o.amount || 0), 0) * 100) / 100;
  const names = Object.fromEntries(q.all('SELECT id, name FROM properties').map((p) => [p.id, p.name]));
  const byType = Object.entries(TASK_TYPES).filter(([type]) => type !== 'happy').map(([type, t]) => {
    const mine = rows.filter((o) => o.type === type);
    return { label: t.label, sent: mine.length, accepted: mine.filter((o) => o.accepted_at).length, revenue: sum(mine.filter((o) => o.accepted_at)) };
  }).filter((x) => x.sent);
  // Extras guests bought without an offer message from us, for comparison.
  const other = q.all("SELECT amount FROM extra_sales WHERE offer_id IS NULL AND status = 'purchased' AND at > datetime('now', ?)", since);
  return {
    sent: rows.length, accepted: taken.length, acceptedPercent: rows.length ? Math.round((taken.length / rows.length) * 100) : null, revenue: sum(taken),
    currency: taken.find((o) => o.currency)?.currency || '£', byType,
    other: { count: other.length, revenue: sum(other) },
    // Still unanswered: an extension agreed by message never reaches ChargeAutomation, so the team can mark it here.
    open: rows.filter((o) => !o.accepted_at).slice(0, 30).map((o) => ({ id: o.id, guestName: o.guest_name || 'Guest', propertyName: names[o.property_id] || null, label: TASK_TYPES[o.type]?.label || o.type, sentAt: iso(o.sent_at) })),
    accepted_list: taken.slice(0, 30).map((o) => ({ id: o.id, guestName: o.guest_name || 'Guest', propertyName: names[o.property_id] || null, label: TASK_TYPES[o.type]?.label || o.type, title: o.title, amount: o.amount, currency: o.currency, how: o.accepted_how })),
  };
}

/** The guest said yes by message (for example to extending their stay): record it, with what it brought in. */
admin.post('/offers-sent/:id/accept', (req, res) => {
  const o = q.get('SELECT * FROM offers_sent WHERE id = ?', Number(req.params.id));
  if (!o) throw new HttpError(404, 'That offer is no longer listed.');
  const amount = Number(String(req.body?.amount ?? '').replace(/[£,\s]/g, ''));
  if (!Number.isFinite(amount) || amount < 0 || amount > 100000) throw new HttpError(400, 'Enter the amount in pounds, for example 120.');
  q.run("UPDATE offers_sent SET accepted_at = COALESCE(accepted_at, datetime('now')), accepted_how = 'team', title = COALESCE(title, ?), amount = ? WHERE id = ?", clip(String(req.body?.title || ''), 120) || null, amount, o.id);
  audit(req.user.id, 'offer.accepted', `offer ${o.id} £${amount}`);
  res.json({ ok: true });
});

const translations = new Map(); // recent translations, so pressing the button twice costs nothing
const translateLimit = rateLimiter(120, 60 * 60_000); // per team member per hour

/**
 * Translate a guest message or a drafted reply into English for the team member reading it.
 * Nothing is stored or sent to the guest. A guest's private check-in link is kept out of the
 * model: it is swapped for a placeholder and put back in the result.
 */
admin.post('/translate', async (req, res) => {
  const text = String(req.body?.text || '').trim();
  if (!text) throw new HttpError(400, 'There is nothing to translate.');
  if (text.length > 6000) throw new HttpError(400, 'That text is too long to translate.');
  const key = sha256(text);
  if (translations.has(key)) return res.json(translations.get(key));
  if (!translateLimit(`u${req.user.id}`)) throw new HttpError(429, 'That is a lot of translations in one hour. Please try again later.');
  const links = [];
  const masked = text.replace(/https:\/\/app\.chargeautomation\.com\/[A-Za-z0-9\/_-]+/g, (url) => `[LINK_${links.push(url)}]`);
  let out;
  try {
    out = await translate(masked);
  } catch (e) {
    console.error(`Translate failed: ${e.message}`);
    throw new HttpError(502, 'The translation is not available just now. Please try again.');
  }
  const result = { language: out.language, translation: out.translation.replace(/\[LINK_(\d+)\]/g, (m, n) => links[Number(n) - 1] || m) };
  translations.set(key, result);
  if (translations.size > 500) translations.delete(translations.keys().next().value);
  res.json(result);
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

admin.get('/settings', (req, res) => res.json({ settings: getSettings(), channelUnmatched: parseJson(getRaw('channel_unmatched') || 'null', null) }));

// --- how the team writes ------------------------------------------------------------------

admin.get('/style', (req, res) => res.json({ ...styleStatus(), history: historyStatus() }));

/** Read every past conversation in Smoobu once and learn from it. Runs in the background. */
admin.post('/style/history', requireAdmin, (req, res) => {
  if (!historyStatus().available) throw new HttpError(409, 'Smoobu is not connected.');
  audit(req.user.id, 'style.history');
  res.json({ ...styleStatus(), history: startHistory() });
});

/** Study the team's own messages again now. */
admin.post('/style/learn', requireAdmin, async (req, res) => {
  const style = await learnStyle({ force: true });
  if (style == null) throw new HttpError(409, 'There are not enough messages written by the team yet. It needs at least three.');
  audit(req.user.id, 'style.learn');
  res.json({ ...styleStatus(), history: historyStatus() });
});

/** Set the guide by hand, or clear it. */
admin.put('/style', requireAdmin, (req, res) => {
  setStyle(req.body?.style);
  audit(req.user.id, 'style.edit');
  res.json({ ...styleStatus(), history: historyStatus() });
});

// --- branding: this agency's name, colours and logo ---------------------------------------

const brandOut = () => {
  const b = brand();
  return { name: b.name, company: b.company, app: b.app, color: b.color, accent: b.accent, hasLogo: !!b.logo, hasMark: !!b.mark, custom: b.custom, defaults: BRAND_DEFAULTS, v: Math.max(b.logo?.v || 0, b.mark?.v || 0) };
};
admin.get('/brand', (req, res) => res.json({ brand: brandOut() }));

admin.patch('/brand', requireAdmin, (req, res) => {
  const b = req.body || {};
  saveBrand({ name: b.name, company: b.company, app: b.app, color: b.color, accent: b.accent });
  // The assistant's name follows the brand until someone has chosen their own.
  if (getSettings().botName === SETTING_DEFAULTS.botName && brand().name !== BRAND_DEFAULTS.name) setSetting('botName', `${brand().name} Assistant`);
  audit(req.user.id, 'brand.update', `${brand().app} ${brand().color} ${brand().accent}`);
  res.json({ brand: brandOut() });
});

/** Upload the logo (?slot=logo) or the square icon (?slot=mark). */
admin.post('/brand/uploads', requireAdmin, express.raw({ type: 'image/*', limit: '700kb' }), (req, res) => {
  saveBrandFile(String(req.query.slot || ''), req.body, req.headers['content-type']);
  audit(req.user.id, 'brand.picture', String(req.query.slot));
  res.status(201).json({ brand: brandOut() });
});

admin.post('/brand/reset', requireAdmin, (req, res) => {
  resetBrand();
  audit(req.user.id, 'brand.reset');
  res.json({ brand: brandOut() });
});

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
  await notifyTeam({ title: brand().app, body: `Test notification from ${req.user.name}. Notifications are working.`, url: '/admin/#/inbox', tag: 'test' });
  res.json({ ok: true, devices: q.get('SELECT COUNT(*) AS n FROM push_subscriptions').n });
});

/** Live updates for admin screens. Every event means "refetch what you are showing". */
admin.get('/stream', (req, res) => {
  const send = sse(req, res, () => bus.off('admin', onEvent));
  const onEvent = (e) => send(e.type, { conversationId: e.conversationId ?? null, alert: e.alert ?? undefined });
  bus.on('admin', onEvent);
});

export { inbox };

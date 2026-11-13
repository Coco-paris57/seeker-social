// Guest-facing API: open a chat from a property QR code (or the general link), verify the
// booking, exchange messages. A guest session is one conversation, held in an httpOnly cookie.
import express from 'express';
import { config } from '../config.js';
import { q, getSettings } from '../db.js';
import { currentConversation, endGuestSession, requireGuest, startGuestSession } from '../auth.js';
import { accessReleased, afterVerification, handleGuestMessage, stageOf } from '../bot.js';
import { bus, emitConversation, notifyTeam } from '../notify.js';
import { addDays, HttpError, londonDate, normaliseName, rateLimiter } from '../util.js';
import { iso, sse } from './shared.js';
import { getFile, guestFile, MAX_VIDEO, saveUpload, sendFile, sweepFiles } from '../media.js';
import { parseJson } from '../db.js';

export const guest = express.Router();

const sessionLimit = rateLimiter(20, 60 * 60_000); // new chats per IP per hour
const verifyLimit = rateLimiter(6, 15 * 60_000); // booking checks per chat (and per IP) per 15 minutes
const verifyIpLimit = rateLimiter(20, 15 * 60_000);
const messageLimit = rateLimiter(20, 5 * 60_000); // messages per chat per 5 minutes
const messageHourLimit = rateLimiter(60, 60 * 60_000); // and per hour
const messageIpLimit = rateLimiter(60, 5 * 60_000); // messages per IP per 5 minutes
// Ceiling on assistant work across all web chats, so a flood cannot run up model costs.
const globalLimit = rateLimiter(parseInt(process.env.MAX_MESSAGES_PER_HOUR, 10) || 600, 60 * 60_000);
const streams = new Map(); // open live-update connections per chat and per IP
const MAX_STREAMS_PER_CHAT = 4;
const MAX_STREAMS_PER_IP = 40;
let floodAlertAt = 0;
export const MAX_MESSAGE = 2000;
export const MAX_ATTACHMENTS = 4;
const uploadLimit = rateLimiter(12, 10 * 60_000); // files per chat per 10 minutes
const uploadIpLimit = rateLimiter(40, 10 * 60_000);

function publicProperty(p) {
  return p ? { name: p.display_name || p.name, area: p.area } : null;
}

function describe(conversation) {
  const settings = getSettings();
  const property = conversation.property_id ? q.get('SELECT * FROM properties WHERE id = ?', conversation.property_id) : null;
  const reservation = conversation.verified && conversation.reservation_id
    ? q.get('SELECT * FROM reservations WHERE id = ?', conversation.reservation_id)
    : null;
  return {
    id: conversation.id,
    verified: !!conversation.verified,
    property: publicProperty(property),
    guestFirstName: reservation?.first_name || null,
    stay: reservation && { arrival: reservation.arrival, departure: reservation.departure, checkIn: reservation.check_in, checkOut: reservation.check_out, checkinLink: reservation.cancelled ? null : reservation.checkin_link || null, checkinCompleted: !!reservation.checkin_done },
    stage: stageOf(reservation),
    accessReleased: accessReleased(conversation, reservation, settings),
    teamHasTakenOver: !!conversation.bot_paused,
  };
}

function guestMessages(conversationId, after = 0) {
  return q
    .all("SELECT id, role, body, kind, meta, created_at, sent_at FROM messages WHERE conversation_id = ? AND id > ? AND (role = 'guest' OR status = 'sent') ORDER BY COALESCE(sent_at, created_at), id", conversationId, after)
    .map(messageOut);
}

/** A message as the guest sees it, with any pictures, videos and video links. */
function messageOut(m) {
  const meta = parseJson(m.meta);
  // Team pictures are listed on the message; one removed from its knowledge entry since is left out.
  const files = m.role === 'guest' ? q.all('SELECT token, kind FROM files WHERE message_id = ?', m.id) : (meta.attachments || []).filter((a) => getFile(a.token));
  return {
    id: m.id, role: m.role === 'bot' ? 'assistant' : m.role, text: m.body, kind: m.kind, at: iso(m.sent_at || m.created_at),
    attachments: files.map(guestFile), links: (meta.links || []).map((l) => ({ url: l.url, label: l.label })),
  };
}

function about() {
  const s = getSettings();
  return {
    company: config.company.name,
    botName: s.botName,
    officeHours: s.officeHours,
    emergencyContact: s.emergencyContact || null,
    retentionDays: s.retentionDays,
    accessInfoHours: s.accessInfoHours,
    privacyEmail: config.company.privacyEmail || null,
    maxMessageLength: MAX_MESSAGE,
    uploads: { maxFiles: MAX_ATTACHMENTS, maxImageBytes: 8 * 1024 * 1024, maxVideoBytes: MAX_VIDEO },
  };
}

/** What the welcome screen needs before a chat exists. qrToken is optional (general link). */
guest.get('/welcome', (req, res) => {
  const token = String(req.query.p || '');
  let property = null;
  if (token) {
    property = q.get('SELECT * FROM properties WHERE qr_token = ? AND active = 1', token);
    if (!property) throw new HttpError(404, 'This QR code is no longer active. Please contact us through your booking channel.');
  }
  const conversation = currentConversation(req);
  const resumable = conversation && (!property || conversation.property_id === property.id);
  res.json({ about: about(), property: publicProperty(property), hasSession: !!resumable });
});

/** Start a chat. The guest must have accepted the privacy notice. */
guest.post('/session', (req, res) => {
  if (!sessionLimit(req.ip)) throw new HttpError(429, 'Too many new chats from this connection. Please try again later.');
  const { qrToken, consent } = req.body || {};
  if (consent !== true) throw new HttpError(400, 'Please accept the privacy notice to start the chat.');
  let property = null;
  if (qrToken) {
    property = q.get('SELECT * FROM properties WHERE qr_token = ? AND active = 1', String(qrToken));
    if (!property) throw new HttpError(404, 'This QR code is no longer active.');
  }
  const id = q.insert("INSERT INTO conversations(property_id, channel, consent_at) VALUES(?, 'web', datetime('now'))", property?.id ?? null);
  startGuestSession(res, id);
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', id);
  emitConversation(id, 'conversation');
  res.status(201).json({ conversation: describe(conversation), messages: [], about: about() });
});

guest.get('/me', requireGuest, (req, res) => {
  res.json({ conversation: describe(req.conversation), messages: guestMessages(req.conversation.id), about: about() });
});

/**
 * Link the chat to a booking: surname plus arrival date, checked against Smoobu reservations.
 * From a property QR code only that property's bookings are considered.
 */
guest.post('/verify', requireGuest, (req, res) => {
  const c = req.conversation;
  if (!verifyLimit(`c${c.id}`) || !verifyIpLimit(req.ip)) {
    throw new HttpError(429, 'Too many attempts. Please wait 15 minutes, or message us through your booking channel.');
  }
  const surname = normaliseName(req.body?.lastName);
  const arrival = String(req.body?.arrivalDate || '');
  if (surname.length < 2 || !/^\d{4}-\d{2}-\d{2}$/.test(arrival)) {
    throw new HttpError(400, 'Please enter the surname on the booking and your arrival date.');
  }
  const today = londonDate();
  const rows = q.all(
    `SELECT * FROM reservations WHERE arrival = ? AND cancelled = 0 AND departure >= ? ${c.property_id ? 'AND property_id = ?' : ''}`,
    ...(c.property_id ? [arrival, addDays(today, -30), c.property_id] : [arrival, addDays(today, -30)]),
  );
  // The surname is what counts. Guests often type their full name, so that is accepted too
  // (either order). A first name alone never matches.
  const match = rows.filter((r) => {
    const first = normaliseName(r.first_name);
    const last = normaliseName(r.last_name) || normaliseName(String(r.guest_name || '').trim().split(/\s+/).pop());
    if (last.length < 2) return false;
    return [last, first + last, last + first, normaliseName(r.guest_name)].includes(surname);
  });
  if (match.length !== 1) {
    // Same answer whether nothing matched or the match was ambiguous: nothing to learn by guessing.
    throw new HttpError(404, 'We could not find a booking with those details. Please check the surname on the booking and the arrival date.');
  }
  const r = match[0];
  q.run('UPDATE conversations SET verified = 1, reservation_id = ?, property_id = ?, guest_name = ? WHERE id = ?', r.id, r.property_id, r.guest_name || `${r.first_name} ${r.last_name}`.trim(), c.id);
  const conversation = q.get('SELECT * FROM conversations WHERE id = ?', c.id);
  emitConversation(c.id, 'conversation');
  res.json({ conversation: describe(conversation) });
  afterVerification(c.id).catch((e) => console.error(`After verification, conversation ${c.id}: ${e.message}`));
});

guest.get('/messages', requireGuest, (req, res) => {
  res.json({ messages: guestMessages(req.conversation.id, parseInt(req.query.after, 10) || 0) });
});

guest.post('/messages', requireGuest, (req, res) => {
  const c = req.conversation;
  const text = String(req.body?.text || '').trim();
  const tokens = Array.isArray(req.body?.attachments) ? [...new Set(req.body.attachments.map(String))] : [];
  if (tokens.length > MAX_ATTACHMENTS) throw new HttpError(400, `You can send up to ${MAX_ATTACHMENTS} files with one message.`);
  // Only files this guest uploaded in this chat and has not sent yet.
  const files = tokens.map(getFile);
  if (files.some((f) => !f || f.conversation_id !== c.id || f.message_id)) throw new HttpError(400, 'One of the files could not be attached. Please add it again.');
  if (!text && !files.length) throw new HttpError(400, 'Please type a message.');
  if (text.length > MAX_MESSAGE) throw new HttpError(400, `Messages can be up to ${MAX_MESSAGE} characters.`);
  // The general link has no property until the booking is verified, and the assistant has
  // nothing to answer from. This also keeps anonymous visitors from triggering model calls.
  if (!c.property_id) throw new HttpError(403, 'Please verify your booking first, so we know which property you are asking about.');
  if (!messageLimit(`c${c.id}`) || !messageHourLimit(`c${c.id}`) || !messageIpLimit(req.ip)) {
    throw new HttpError(429, 'You are sending messages very quickly. Please wait a moment.');
  }
  if (!globalLimit('all')) {
    if (Date.now() - floodAlertAt > 3600_000) {
      floodAlertAt = Date.now();
      notifyTeam({ title: 'Unusually high message volume', body: 'The guest chat has reached its hourly message ceiling. New messages are being turned away for now.', url: '/admin/#/conversations', tag: 'flood', urgent: true });
    }
    throw new HttpError(503, 'We are receiving a lot of messages right now. Please try again in a few minutes, or contact us through your booking channel.');
  }
  const id = q.insert("INSERT INTO messages(conversation_id, role, body, sent_at) VALUES(?, 'guest', ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))", c.id, text);
  for (const f of files) q.run('UPDATE files SET message_id = ? WHERE token = ?', id, f.token);
  if (files.length) q.run("UPDATE messages SET meta = json_set(meta, '$.attachments', json(?)) WHERE id = ?", JSON.stringify(files.map((f) => ({ token: f.token, kind: f.kind }))), id);
  q.run("UPDATE conversations SET last_message_at = datetime('now'), status = 'open', needs_reply = 1, archived = 0 WHERE id = ?", c.id);
  emitConversation(c.id, 'message', { messageId: id });
  handleGuestMessage(c.id); // replies arrive over the stream
  res.status(202).json({ message: messageOut(q.get('SELECT * FROM messages WHERE id = ?', id)) });
});

/** Upload a photo or video to send with the next message. The request body is the file itself. */
guest.post('/uploads', requireGuest, express.raw({ type: ['image/*', 'video/*'], limit: MAX_VIDEO }), (req, res) => {
  const c = req.conversation;
  if (!c.property_id) throw new HttpError(403, 'Please verify your booking first, so we know which property you are asking about.');
  if (!uploadLimit(`c${c.id}`) || !uploadIpLimit(req.ip)) throw new HttpError(429, 'You have sent a lot of files. Please wait a few minutes.');
  if (!Buffer.isBuffer(req.body) || !req.body.length) throw new HttpError(400, 'No file was received.');
  const f = saveUpload(req.body, { conversationId: c.id });
  res.status(201).json({ file: guestFile(f) });
});

/**
 * A picture or video in this chat: one the guest sent, or one the team attached to a knowledge
 * entry that has been shown in this chat. Nothing else can be fetched.
 */
guest.get('/files/:token', requireGuest, (req, res) => {
  const f = getFile(req.params.token);
  const c = req.conversation;
  const shown = f && f.knowledge_id && q.get(
    "SELECT 1 FROM messages m, json_each(m.meta, '$.attachments') a WHERE m.conversation_id = ? AND m.status = 'sent' AND json_extract(a.value, '$.token') = ?",
    c.id, f.token,
  );
  if (!f || !(f.conversation_id === c.id || shown)) throw new HttpError(404, 'That file is no longer available.');
  sendFile(res, f);
});

/** Live updates: 'message' (fetch new messages), 'typing', 'conversation' (state changed). */
guest.get('/stream', requireGuest, (req, res) => {
  const channel = `conversation:${req.conversation.id}`;
  const keys = [`c${req.conversation.id}`, `ip${req.ip}`];
  if ((streams.get(keys[0]) || 0) >= MAX_STREAMS_PER_CHAT || (streams.get(keys[1]) || 0) >= MAX_STREAMS_PER_IP) {
    throw new HttpError(429, 'Too many open connections.');
  }
  for (const k of keys) streams.set(k, (streams.get(k) || 0) + 1);
  const send = sse(req, res, () => {
    bus.off(channel, onEvent);
    for (const k of keys) streams.get(k) > 1 ? streams.set(k, streams.get(k) - 1) : streams.delete(k);
  });
  const onEvent = (e) => {
    if (['message', 'typing', 'conversation'].includes(e.type)) send(e.type, e.type === 'typing' ? { on: !!e.on } : {});
  };
  bus.on(channel, onEvent);
});

/** Right to erasure: delete this chat and everything in it. */
guest.post('/erase', requireGuest, (req, res) => {
  const id = req.conversation.id;
  q.run('DELETE FROM conversations WHERE id = ?', id);
  sweepFiles(); // their photos and videos go too
  q.run("INSERT INTO audit(action, detail) VALUES('guest.erase', ?)", `conversation ${id}`);
  endGuestSession(res);
  emitConversation(id, 'conversation');
  res.json({ ok: true });
});

/** Leave the chat on this device without deleting it. */
guest.post('/leave', (req, res) => {
  endGuestSession(res);
  res.json({ ok: true });
});

// Guest-facing API: open a chat from a property QR code (or the general link), verify the
// booking, exchange messages. A guest session is one conversation, held in an httpOnly cookie.
import express from 'express';
import { config } from '../config.js';
import { q, getSettings } from '../db.js';
import { currentConversation, endGuestSession, requireGuest, startGuestSession } from '../auth.js';
import { accessReleased, handleGuestMessage, stageOf } from '../bot.js';
import { bus, emitConversation, notifyTeam } from '../notify.js';
import { addDays, HttpError, londonDate, normaliseName, rateLimiter } from '../util.js';
import { iso, sse } from './shared.js';

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
    .all("SELECT id, role, body, kind, created_at, sent_at FROM messages WHERE conversation_id = ? AND id > ? AND (role = 'guest' OR status = 'sent') ORDER BY COALESCE(sent_at, created_at), id", conversationId, after)
    .map((m) => ({ id: m.id, role: m.role === 'bot' ? 'assistant' : m.role, text: m.body, kind: m.kind, at: iso(m.sent_at || m.created_at) }));
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
  // Surname only. Where the channel gave no separate surname, the last word of the full name.
  const match = rows.filter((r) => {
    const last = normaliseName(r.last_name) || normaliseName(String(r.guest_name || '').trim().split(/\s+/).pop());
    return last.length >= 2 && last === surname;
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
});

guest.get('/messages', requireGuest, (req, res) => {
  res.json({ messages: guestMessages(req.conversation.id, parseInt(req.query.after, 10) || 0) });
});

guest.post('/messages', requireGuest, (req, res) => {
  const c = req.conversation;
  const text = String(req.body?.text || '').trim();
  if (!text) throw new HttpError(400, 'Please type a message.');
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
  q.run("UPDATE conversations SET last_message_at = datetime('now'), status = 'open' WHERE id = ?", c.id);
  emitConversation(c.id, 'message', { messageId: id });
  handleGuestMessage(c.id); // replies arrive over the stream
  const m = q.get('SELECT * FROM messages WHERE id = ?', id);
  res.status(202).json({ message: { id: m.id, role: 'guest', text: m.body, kind: m.kind, at: iso(m.sent_at) } });
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

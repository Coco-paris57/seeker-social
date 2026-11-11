// Smoobu webhooks. Smoobu does not sign deliveries, so the URL carries a secret token and
// the payload is treated only as a hint: bookings and messages are re-read from the API.
import crypto from 'node:crypto';
import express from 'express';
import { config } from '../config.js';
import { q } from '../db.js';
import { handleGuestMessage } from '../bot.js';
import { emitConversation } from '../notify.js';
import { smoobu } from '../smoobu.js';
import { syncReservation } from '../sync.js';

export const webhooks = express.Router();

const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const plain = (html) => String(html || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

webhooks.post('/smoobu/:token', (req, res) => {
  if (!config.smoobuWebhookToken || !same(String(req.params.token), config.smoobuWebhookToken)) return res.status(404).end();
  res.json({ ok: true }); // acknowledge first; Smoobu does not need to wait for the work
  handleSmoobuEvent(req.body || {}).catch((e) => console.error(`Smoobu webhook: ${e.message}`));
});

export async function handleSmoobuEvent(event) {
  const action = String(event.action || '');
  const data = event.data || {};
  if (['newReservation', 'updateReservation', 'cancelReservation'].includes(action) && Number.isInteger(data.id)) {
    await syncReservation(data.id);
  } else if (action === 'deleteReservation' && Number.isInteger(data.id)) {
    q.run('DELETE FROM reservations WHERE id = ?', data.id);
  } else if (action === 'newMessage' && data.sender === 'guest' && config.smoobuInbox) {
    await importGuestMessage(Number(data.booking?.id), Number(data.id));
  }
}

/** Bring one guest message from Smoobu (Airbnb, Booking.com, email) into a conversation. */
export async function importGuestMessage(bookingId, messageId) {
  const api = smoobu();
  if (!api || !Number.isInteger(bookingId) || !Number.isInteger(messageId)) return;
  // Claim the message before any await, so concurrent deliveries cannot both process it.
  if (q.run('INSERT OR IGNORE INTO smoobu_seen(message_id) VALUES(?)', messageId).changes === 0) return;
  let reservation;
  let text;
  try {
    if (!q.get('SELECT 1 FROM reservations WHERE id = ?', bookingId)) await syncReservation(bookingId);
    reservation = q.get('SELECT * FROM reservations WHERE id = ? AND cancelled = 0', bookingId);
    const message = reservation && (await api.messages(bookingId)).find((m) => m.id === messageId);
    // Type 1 is a message from the guest; type 2 is one we sent. The webhook's own "sender" is not trusted.
    text = message?.type === 1 ? String(message.message || '').trim() || plain(message.htmlMessage) : '';
  } catch (e) {
    q.run('DELETE FROM smoobu_seen WHERE message_id = ?', messageId); // let a retry try again
    throw e;
  }
  if (!reservation || !text) return;

  let conversation = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = ?", bookingId);
  if (!conversation) {
    const id = q.insert(
      "INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified) VALUES(?, ?, 'smoobu', ?, 1)",
      reservation.property_id, bookingId, reservation.guest_name || `${reservation.first_name} ${reservation.last_name}`.trim(),
    );
    conversation = q.get('SELECT * FROM conversations WHERE id = ?', id);
  }
  const id = q.insert("INSERT INTO messages(conversation_id, role, body, meta, sent_at) VALUES(?, 'guest', ?, ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))", conversation.id, text.slice(0, 4000), JSON.stringify({ smoobuMessageId: messageId }));
  q.run("UPDATE conversations SET last_message_at = datetime('now') WHERE id = ?", conversation.id);
  emitConversation(conversation.id, 'message', { messageId: id });
  await handleGuestMessage(conversation.id);
}

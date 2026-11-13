// Smoobu webhooks. Smoobu does not sign deliveries, so the URL carries a secret token and
// the payload is treated only as a hint: bookings and messages are re-read from the API.
import crypto from 'node:crypto';
import express from 'express';
import { q } from '../db.js';
import { handleGuestMessage } from '../bot.js';
import { emitConversation, notifyTeam } from '../notify.js';
import { smoobu } from '../smoobu.js';
import { syncReservation } from '../sync.js';
import { channelInboxOn, webhookToken } from '../channel.js';

export const webhooks = express.Router();

export const ATTACHMENT_NOTE = '[The guest sent a photo or file through the booking channel. Smoobu does not pass it on, so it cannot be shown here. Open the conversation in Smoobu or in the Airbnb or Booking.com app to see it.]';

const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const plain = (html) => String(html || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').trim();

webhooks.post('/smoobu/:token', (req, res) => {
  if (!same(String(req.params.token), webhookToken())) return res.status(404).end();
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
  } else if (action === 'newMessage' && data.sender === 'guest' && channelInboxOn()) {
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
  let fromGuest = false;
  try {
    if (!q.get('SELECT 1 FROM reservations WHERE id = ?', bookingId)) await syncReservation(bookingId);
    reservation = q.get('SELECT * FROM reservations WHERE id = ? AND cancelled = 0', bookingId);
    const message = reservation && (await api.messages(bookingId)).find((m) => m.id === messageId);
    // Type 1 is a message from the guest; type 2 is one we sent. The webhook's own "sender" is not trusted.
    fromGuest = message?.type === 1;
    text = fromGuest ? String(message.message || '').trim() || plain(message.htmlMessage) : '';
  } catch (e) {
    q.run('DELETE FROM smoobu_seen WHERE message_id = ?', messageId); // let a retry try again
    throw e;
  }
  if (!reservation || !fromGuest) return;
  // Smoobu passes on a photo or file sent through Airbnb or Booking.com as an empty message:
  // the picture itself is not available to us. Say so in the chat and tell the team where to look.
  const attachmentOnly = !text;
  if (attachmentOnly) text = ATTACHMENT_NOTE;

  let conversation = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = ?", bookingId);
  if (!conversation) {
    const id = q.insert(
      "INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified) VALUES(?, ?, 'smoobu', ?, 1)",
      reservation.property_id, bookingId, reservation.guest_name || `${reservation.first_name} ${reservation.last_name}`.trim(),
    );
    conversation = q.get('SELECT * FROM conversations WHERE id = ?', id);
  }
  const id = q.insert("INSERT INTO messages(conversation_id, role, body, meta, sent_at) VALUES(?, 'guest', ?, ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))", conversation.id, text.slice(0, 4000), JSON.stringify({ smoobuMessageId: messageId, ...(attachmentOnly ? { handled: 1, channelAttachment: true } : {}) }));
  q.run("UPDATE conversations SET last_message_at = datetime('now'), needs_reply = 1 WHERE id = ?", conversation.id);
  emitConversation(conversation.id, 'message', { messageId: id });
  if (attachmentOnly) {
    // Nothing for the assistant to read, so no draft: a person needs to look at the picture.
    const property = q.get('SELECT display_name, name FROM properties WHERE id = ?', conversation.property_id);
    await notifyTeam({
      title: `Photo or file from a guest · ${property ? property.display_name || property.name : 'Booking channel'}`,
      body: `${conversation.guest_name || 'A guest'} sent a photo or file on ${reservation.channel || 'the booking channel'}. Open it in Smoobu or the channel's app.`,
      url: `/admin/#/conversations/${conversation.id}`, tag: `conversation-${conversation.id}`,
    });
    return;
  }
  await handleGuestMessage(conversation.id);
}

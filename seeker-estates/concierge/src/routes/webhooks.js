// Smoobu webhooks. Smoobu does not sign deliveries, so the URL carries a secret token and
// the payload is treated only as a hint: bookings and messages are re-read from the API.
import crypto from 'node:crypto';
import express from 'express';
import { q, setRaw } from '../db.js';
import { handleGuestMessage } from '../bot.js';
import { emitAdmin, emitConversation, notifyTeam } from '../notify.js';
import { smoobu } from '../smoobu.js';
import { syncReservation } from '../sync.js';
import { htmlToText } from '../util.js';
import { channelInboxOn, webhookToken, webhookTokenPlain } from '../channel.js';
import { upsellType } from '../bot.js';
import { offerCovers } from '../tasks.js';

export const webhooks = express.Router();

export const ATTACHMENT_NOTE = '[The guest sent a photo or file through the booking channel. Smoobu does not pass it on, so it cannot be shown here. Open the conversation in Smoobu or in the Airbnb or Booking.com app to see it.]';

const same = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const plain = htmlToText;

webhooks.post('/smoobu/:token', (req, res) => {
  if (!same(String(req.params.token), webhookToken())) return res.status(404).end();
  res.json({ ok: true }); // acknowledge first; Smoobu does not need to wait for the work
  handleSmoobuEvent(req.body || {}).catch((e) => console.error(`Smoobu webhook: ${e.message}`));
});

/**
 * ChargeAutomation webhooks (Integrations > Webhooks > Trigger Url). Used for extras only:
 * "Upsell Purchased" and "Upsell Requested". Deliveries are not signed, so the address carries
 * the same secret token as the Smoobu one.
 */
webhooks.post('/chargeautomation/:token', (req, res) => {
  const given = String(req.params.token);
  if (!same(given, webhookTokenPlain()) && !same(given, webhookToken())) return res.status(404).end();
  res.json({ ok: true });
  try {
    for (const event of Array.isArray(req.body) ? req.body : [req.body || {}]) {
      const used = recordExtra(event) || recordCheckin(event);
      // Kept so the team can see the connection is alive, and why a message was not used.
      const name = String(event?.event || 'unknown').slice(0, 60);
      setRaw('ca_webhook_last', JSON.stringify({ at: new Date().toISOString(), event: name, used: !!used }));
      console.log(`ChargeAutomation webhook: ${name} ${used ? 'recorded' : `not used (booking ${String(event?.data?.pms_booking_id ?? event?.data?.id ?? '?').slice(0, 40)})`}`);
    }
  } catch (e) {
    console.error(`ChargeAutomation webhook: ${e.message}`);
  }
});

/** "Online Check-in Completed": mark the booking at once, rather than waiting for the next Smoobu sync. */
export function recordCheckin(event) {
  if (String(event?.event || '') !== 'booking.pre_checkin.completed') return false;
  const bookingId = parseInt(String(event.data?.id ?? event.data?.pms_booking_id ?? '').split('-').pop(), 10);
  if (!Number.isInteger(bookingId) || !q.run('UPDATE reservations SET checkin_done = 1 WHERE id = ?', bookingId).changes) return false;
  const c = q.get('SELECT id FROM conversations WHERE reservation_id = ? ORDER BY id DESC LIMIT 1', bookingId);
  if (c) emitConversation(c.id, 'conversation');
  return true;
}

export function recordExtra(event) {
  const kind = { 'booking.upsell.purchased': 'purchased', 'booking.upsell.requested': 'requested' }[String(event?.event || '')];
  const d = event?.data;
  if (!kind || !d || typeof d !== 'object') return false;
  const bookingId = parseInt(String(d.pms_booking_id ?? '').split('-').pop(), 10); // "1079-14567017" or "14567017"
  const reservation = Number.isInteger(bookingId) ? q.get('SELECT id, extras, property_id FROM reservations WHERE id = ?', bookingId) : null;
  if (!reservation) return false;
  const clean = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
  const title = clean(d.title || d.internal_name, 120);
  if (!title) return false;
  // Remember the extra and what was paid: ChargeAutomation has no price list to read, so this
  // is how the assistant learns what is on sale at each property and roughly what it costs.
  const order = d.order_details && typeof d.order_details === 'object' ? d.order_details : {};
  const amount = Number(order.amount);
  if (reservation.property_id) {
    q.run(
      `INSERT INTO ca_upsells(property_id, title, amount, currency, qty, seen_at) VALUES(?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(property_id, title) DO UPDATE SET amount = COALESCE(excluded.amount, amount), currency = excluded.currency, qty = excluded.qty, seen_at = excluded.seen_at`,
      reservation.property_id, title, Number.isFinite(amount) && amount > 0 ? amount : null, clean(d.currency_symbol, 4),
      Math.max(1, Number(order.qty) || 1) * Math.max(1, Number(order.num_nights) || 1) * Math.max(1, Number(order.persons) || 1),
    );
  }
  const approval = clean(d.client_approval_status, 30).toLowerCase();
  const status = approval === 'declined' ? 'declined' : kind === 'purchased' || approval === 'approved' ? 'purchased' : 'requested, awaiting the team';
  const note = clean(d.note, 200);
  const list = JSON.parse(reservation.extras || '[]').filter((x) => x.ref !== clean(d.charge_ref_no, 60) && x.title !== title);
  list.push({ title, status, note: /^n\/?a$/i.test(note) ? '' : note, ref: clean(d.charge_ref_no, 60), at: new Date().toISOString() });
  q.run('UPDATE reservations SET extras = ? WHERE id = ?', JSON.stringify(list.slice(-20)), reservation.id);
  // For Insights: every sale, and whether it followed an offer message we sent to this guest.
  const paid = Number.isFinite(amount) && amount > 0 ? amount : null;
  const currency = clean(d.currency_symbol, 4) || '£';
  const offer = status === 'declined' ? null : q.all('SELECT * FROM offers_sent WHERE reservation_id = ? ORDER BY id DESC', reservation.id)
    .find((o) => offerCovers(o.type).has(upsellType(title)) && (!o.accepted_at || o.title === title));
  if (offer) q.run("UPDATE offers_sent SET accepted_at = COALESCE(accepted_at, datetime('now')), accepted_how = 'chargeautomation', title = ?, amount = COALESCE(?, amount), currency = ? WHERE id = ?", title, paid, currency, offer.id);
  q.run(
    `INSERT INTO extra_sales(reservation_id, property_id, title, status, amount, currency, ref, offer_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(reservation_id, title) DO UPDATE SET status = excluded.status, amount = COALESCE(excluded.amount, amount), currency = excluded.currency, ref = excluded.ref, offer_id = COALESCE(offer_id, excluded.offer_id)`,
    reservation.id, reservation.property_id, title, status, paid, currency, clean(d.charge_ref_no, 60), offer?.id ?? null,
  );
  const c = q.get('SELECT id FROM conversations WHERE reservation_id = ? ORDER BY id DESC LIMIT 1', reservation.id);
  if (c) emitConversation(c.id, 'conversation');
  return true;
}

export async function handleSmoobuEvent(event) {
  const action = String(event.action || '');
  const data = event.data || {};
  if (['newReservation', 'updateReservation', 'cancelReservation'].includes(action) && Number.isInteger(data.id)) {
    await syncReservation(data.id);
  } else if (action === 'deleteReservation' && Number.isInteger(data.id)) {
    q.run('DELETE FROM reservations WHERE id = ?', data.id);
    q.run('DELETE FROM blocks WHERE id = ?', data.id);
    emitAdmin('todo');
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
  q.run("UPDATE conversations SET last_message_at = datetime('now'), needs_reply = 1, archived = 0 WHERE id = ?", conversation.id);
  emitConversation(conversation.id, 'message', { messageId: id });
  if (attachmentOnly) {
    // Nothing for the assistant to read, so no draft: a person needs to look at the picture.
    const property = q.get('SELECT display_name, name FROM properties WHERE id = ?', conversation.property_id);
    await notifyTeam({
      title: `Photo or file from a guest · ${property ? property.name || property.display_name : 'Booking channel'}`,
      body: `${conversation.guest_name || 'A guest'} sent a photo or file on ${reservation.channel || 'the booking channel'}. Open it in Smoobu or the channel's app.`,
      url: `/admin/#/conversations/${conversation.id}`, tag: `conversation-${conversation.id}`,
    });
    return;
  }
  await handleGuestMessage(conversation.id);
}

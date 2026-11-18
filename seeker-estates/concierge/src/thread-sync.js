// Replies sent outside this app. A team member can answer a guest directly in the Airbnb or
// Booking.com app, or in Smoobu. Smoobu has those messages; this brings them into the chat here,
// so the thread is complete, the guest is no longer shown as waiting, and the assistant knows
// what was already said.
import { q } from './db.js';
import { checkStillNeeded, reassess, recheckScheduled, rememberApproval } from './bot.js';
import { emitAdmin, emitConversation } from './notify.js';
import { smoobu } from './smoobu.js';
import { htmlToText } from './util.js';

const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const textOf = (m) => String(m.message || '').trim() || htmlToText(m.htmlMessage);
const lastChecked = new Map(); // booking id -> when its thread was last read from Smoobu

/**
 * Read one booking's thread from Smoobu and bring in what is missing. Returns how many outside
 * replies were added. `importGuest` handles a guest message the webhook did not deliver.
 */
export async function syncThread(bookingId, { importGuest, force = false } = {}) {
  const api = smoobu();
  if (!api || !Number.isInteger(bookingId)) return 0;
  if (!force && Date.now() - (lastChecked.get(bookingId) || 0) < 45_000) return 0; // not more than once in a while per booking
  lastChecked.set(bookingId, Date.now());
  let conversation = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = ?", bookingId);
  if (!conversation) return 0; // nothing has come through this app for the booking: nothing to keep in step
  const thread = await api.messages(bookingId); // oldest first
  const known = new Set(q.all("SELECT json_extract(meta, '$.smoobuMessageId') AS id FROM messages WHERE conversation_id = ? AND json_extract(meta, '$.smoobuMessageId') IS NOT NULL", conversation.id).map((r) => r.id));
  const lastGuestHere = Math.max(0, ...q.all("SELECT json_extract(meta, '$.smoobuMessageId') AS id FROM messages WHERE conversation_id = ? AND role = 'guest'", conversation.id).map((r) => r.id || 0));
  const lastGuestThere = Math.max(0, ...thread.filter((m) => m.type === 1).map((m) => m.id));
  const ours = q.all("SELECT body FROM messages WHERE conversation_id = ? AND role != 'guest' AND status = 'sent'", conversation.id).map((m) => norm(m.body).slice(0, 160)).filter(Boolean);
  let added = 0;
  for (const m of thread) {
    if (!Number.isInteger(m.id) || known.has(m.id)) continue;
    if (m.type === 1) {
      // A guest message newer than any we hold: its notification was missed.
      if (m.id > lastGuestHere && importGuest) await importGuest(bookingId, m.id);
      continue;
    }
    if (q.get('SELECT 1 FROM smoobu_seen WHERE message_id = ?', m.id)) continue;
    q.run('INSERT OR IGNORE INTO smoobu_seen(message_id) VALUES(?)', m.id);
    const text = textOf(m);
    const key = norm(text).slice(0, 160);
    // Sent from this app (it reaches the guest through Smoobu, so it is in the thread too), or empty.
    if (!key || ours.some((o) => o.startsWith(key) || key.startsWith(o))) continue;
    // Older than the guest's latest message: part of the history before this chat, not a reply to it.
    if (m.id < lastGuestThere) continue;
    const id = q.insert("INSERT INTO messages(conversation_id, role, body, status, kind, meta, sent_at) VALUES(?, 'team', ?, 'sent', 'answer', ?, strftime('%Y-%m-%d %H:%M:%f', 'now'))",
      conversation.id, text.slice(0, 4000), JSON.stringify({ smoobuMessageId: m.id, external: true }));
    q.run("UPDATE conversations SET last_message_at = datetime('now') WHERE id = ?", conversation.id);
    emitConversation(conversation.id, 'message', { messageId: id });
    ours.push(key);
    added++;
    await afterOutsideReply(conversation, text);
    conversation = q.get('SELECT * FROM conversations WHERE id = ?', conversation.id);
  }
  return added;
}

/**
 * Someone answered the guest outside the app. A draft still waiting here is checked against that
 * reply: withdrawn if the reply covers it, flagged if unsure, kept if the reply was about something
 * else (an automatic message from Smoobu, for example).
 */
async function afterOutsideReply(conversation, text) {
  const drafts = q.all("SELECT * FROM messages WHERE conversation_id = ? AND status = 'pending' AND kind != 'scheduled'", conversation.id);
  let answered = drafts.length === 0 && !q.get("SELECT 1 FROM tickets WHERE conversation_id = ? AND status = 'open'", conversation.id);
  for (const d of drafts) {
    const v = await checkStillNeeded(conversation, d.body);
    if (v.verdict === 'hold') {
      q.run("UPDATE messages SET status = 'superseded' WHERE id = ? AND status = 'pending'", d.id);
      // The guest messages it covered are answered; they are not picked up again.
      for (const gid of JSON.parse(d.meta || '{}').covers || []) q.run("UPDATE messages SET meta = json_set(meta, '$.handled', 1) WHERE id = ? AND conversation_id = ?", gid, conversation.id);
      // What the team wrote themselves is the pattern to learn from.
      try { rememberApproval(conversation, JSON.parse(d.meta || '{}'), text, { id: null }, true); } catch { /* learning is a bonus */ }
      emitConversation(conversation.id, 'draft', { messageId: d.id });
      answered = true;
    } else if (v.verdict === 'ask_team') {
      q.run("UPDATE messages SET meta = json_set(meta, '$.checkNote', ?) WHERE id = ?", `A reply was sent outside the app. ${v.reason || 'Check this draft is still needed.'}`, d.id);
      emitConversation(conversation.id, 'draft', { messageId: d.id });
    }
  }
  if (answered) q.run('UPDATE conversations SET needs_reply = 0 WHERE id = ?', conversation.id);
  emitConversation(conversation.id, 'conversation');
  emitAdmin('todo');
  await recheckScheduled(conversation); // a scheduled message may now be redundant too
  reassess(conversation.id);
}

let polling = false;
/**
 * Look at the chats that are waiting on the team, in case they were answered elsewhere. Call
 * this every few minutes; it reads a limited number of threads per run.
 */
export async function pollThreads(importGuest, limit = 12) {
  if (polling || !smoobu()) return 0;
  polling = true;
  let added = 0;
  try {
    const waiting = q.all(
      `SELECT reservation_id FROM conversations WHERE channel = 'smoobu' AND reservation_id IS NOT NULL AND last_message_at > datetime('now', '-10 days')
       AND (needs_reply = 1 OR id IN (SELECT conversation_id FROM messages WHERE status = 'pending')) ORDER BY last_message_at DESC LIMIT ?`, limit);
    for (const c of waiting) {
      try {
        added += await syncThread(c.reservation_id, { importGuest, force: true });
      } catch (e) {
        console.error(`Thread check for booking ${c.reservation_id}: ${e.message}`);
      }
    }
  } finally {
    polling = false;
  }
  return added;
}

// Guest care: small things worth doing for a guest so the stay ends in a five-star review. The
// assistant proposes them from the conversation (a bottle for an anniversary, chocolates after a
// problem, a cot for a baby, a kind message); one rule adds a welcome treat for long stays.
// A person decides: do it and mark it done, send the message, or dismiss it.
import { q } from './db.js';
import { addDays, clip, londonDate } from './util.js';

export const CARE_KINDS = { gift: 'Gift', gesture: 'Gesture', message: 'Message', fix: 'To put right' };
const LONG_STAY = 6; // nights
const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function careOut(a) {
  const c = a.conversation_id ? q.get('SELECT guest_name, property_id, language FROM conversations WHERE id = ?', a.conversation_id) : null;
  const r = a.reservation_id ? q.get('SELECT guest_name, property_id, arrival, departure FROM reservations WHERE id = ?', a.reservation_id) : null;
  const p = q.get('SELECT name, display_name FROM properties WHERE id = ?', r?.property_id ?? c?.property_id ?? 0);
  return {
    id: a.id, kind: a.kind, label: CARE_KINDS[a.kind] || 'Action', title: a.title, why: a.why || '', text: a.body || '', status: a.status,
    conversationId: a.conversation_id, reservationId: a.reservation_id, guestName: r?.guest_name || c?.guest_name || 'Guest', propertyName: p ? p.name || p.display_name : null,
    arrival: r?.arrival || null, departure: r?.departure || null, language: c?.language || null,
  };
}

/** What the team has already done or declined for this guest, so it is not proposed again. */
export function careHandled(conversation) {
  return q.all("SELECT title, status FROM care WHERE status != 'suggested' AND (conversation_id = ? OR (reservation_id IS NOT NULL AND reservation_id = ?)) ORDER BY id DESC LIMIT 12", conversation.id, conversation.reservation_id ?? null)
    .map((a) => `${a.title} (${a.status})`);
}

/** Keep what the assistant now proposes for a conversation. Suggestions it no longer makes go; handled ones stay handled. */
export function storeCare(conversation, list) {
  if (!Array.isArray(list)) return;
  const rows = q.all("SELECT * FROM care WHERE conversation_id = ? AND source = 'assistant'", conversation.id);
  const handled = new Set(rows.filter((a) => a.status !== 'suggested').map((a) => norm(a.title)));
  const open = new Map(rows.filter((a) => a.status === 'suggested').map((a) => [norm(a.title), a]));
  const keep = new Set();
  for (const a of list.slice(0, 3)) {
    const key = norm(a.title);
    if (!key || handled.has(key) || keep.has(key)) continue;
    keep.add(key);
    const same = open.get(key);
    if (same) q.run('UPDATE care SET kind = ?, why = ? WHERE id = ?', a.kind, clip(a.why, 300), same.id); // its message text may be half edited: left as it is
    else q.run("INSERT INTO care(conversation_id, reservation_id, kind, title, why, body, source) VALUES(?, ?, ?, ?, ?, ?, 'assistant')", conversation.id, conversation.reservation_id ?? null, a.kind, clip(a.title, 120), clip(a.why, 300), String(a.message || '').slice(0, 2000));
  }
  for (const [key, a] of open) if (!keep.has(key)) q.run('DELETE FROM care WHERE id = ?', a.id);
}

/** A welcome treat for a long stay: proposed once per booking, from a few days before arrival until the guest has settled in. */
export function stayCare(now = Date.now()) {
  const today = londonDate(new Date(now));
  const stays = q.all(
    `SELECT * FROM reservations r WHERE cancelled = 0 AND arrival BETWEEN ? AND ? AND julianday(departure) - julianday(arrival) >= ?
     AND NOT EXISTS (SELECT 1 FROM care WHERE reservation_id = r.id AND source = 'long_stay')`, addDays(today, -1), addDays(today, 3), LONG_STAY);
  for (const r of stays) {
    const nights = Math.round((Date.parse(r.departure) - Date.parse(r.arrival)) / 86400_000);
    q.run("INSERT INTO care(reservation_id, kind, title, why, source) VALUES(?, 'gift', 'Welcome treat for a long stay', ?, 'long_stay')", r.id,
      `${r.first_name || 'This guest'} is staying ${nights} nights. A small welcome (chocolates or a bottle with a handwritten card) at the start of a long stay sets the tone for the review.`);
  }
  return stays.length;
}

const LIVE = `a.status = 'suggested' AND (
  (a.reservation_id IS NOT NULL AND EXISTS (SELECT 1 FROM reservations r WHERE r.id = a.reservation_id AND r.cancelled = 0 AND r.departure >= date('now', '-1 day')))
  OR (a.reservation_id IS NULL AND EXISTS (SELECT 1 FROM conversations c WHERE c.id = a.conversation_id AND c.archived = 0 AND c.last_message_at > datetime('now', '-7 days'))))`;

/** Suggestions still worth acting on: the guest has not left yet (or, without a booking, wrote recently). */
export const openCare = () => q.all(`SELECT a.* FROM care a WHERE ${LIVE} ORDER BY a.kind = 'fix' DESC, a.id DESC LIMIT 60`).map(careOut);
export const openCareCount = () => q.get(`SELECT COUNT(*) AS n FROM care a WHERE ${LIVE}`).n;

/** For one guest card: by booking, by conversation, or both. */
export function careFor({ reservationId = null, conversationId = null }) {
  return q.all("SELECT * FROM care WHERE status = 'suggested' AND ((? IS NOT NULL AND reservation_id = ?) OR (? IS NOT NULL AND conversation_id = ?)) ORDER BY kind = 'fix' DESC, id DESC",
    reservationId, reservationId, conversationId, conversationId).map(careOut);
}

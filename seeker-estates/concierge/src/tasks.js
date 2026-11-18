// The to-do list: messages worth sending for a booking, each proposed with a moment to send it.
// Upsell offers (early check-in, late checkout, an extra night) are only proposed when the
// team has switched the extra on and the calendar allows it; a thank-you is proposed for a guest
// who sounded happy. Nothing is sent unless a team member schedules it.
import { q } from './db.js';
import { checkStillNeeded, followUpTime, offersFor, sendMessage, upsellType, withholdMessage } from './bot.js';
import { channelConversation, fillTemplate } from './journey.js';
import { emitAdmin, notifyTeam } from './notify.js';
import { smoobu } from './smoobu.js';
import { addDays, clip, londonDate, londonToUtc, HttpError } from './util.js';
import { parseJson } from './db.js';
import * as llm from './llm.js';
import { brand } from './brand.js';

export const TASK_TYPES = {
  upsell_early: { label: 'Offer early check-in', offer: 'Early check-in', extra: 'early_checkin' },
  upsell_late: { label: 'Offer late checkout', offer: 'Late checkout', extra: 'late_checkout' },
  upsell_night: { label: 'Offer an extra night', offer: 'Extra night', extra: 'extra_night' },
  upsell_before: { label: 'Offer arriving a night earlier', extra: 'extra_night', manualOnly: true },
  // One message instead of two when both apply to the same guest.
  upsell_departure: { label: 'Offer late checkout or an extra night', parts: ['upsell_late', 'upsell_night'] },
  upsell_arrival: { label: 'Offer an earlier arrival or early check-in', parts: ['upsell_before', 'upsell_early'] },
  happy: { label: 'Thank a happy guest' },
  // Not a message: the host's review of the guest, drafted after checkout for a person to post on the booking site.
  review: { label: 'Review the guest' },
};

const LOOK_AHEAD = 10; // days before arrival from which offers are proposed
const REVIEW_SITES = /airbnb|vrbo/i; // Booking.com does not let hosts review guests
const REVIEW_DAYS = 13; // Airbnb closes reviews 14 days after checkout

/** The moment to send, and why. Null when it is too late to be useful. */
function bestTime(type, r, now, manual = false) {
  const today = londonDate(new Date(now));
  const soon = () => followUpTime(1, now);
  const at = (date, time) => { const t = londonToUtc(date, time); return t > now ? new Date(t).toISOString() : null; };
  const inReach = manual || r.arrival <= addDays(today, LOOK_AHEAD);
  // One offer on its own for the day itself (early check-in, late checkout): the day before, at 13:00.
  if (type === 'upsell_early') {
    if (r.arrival <= today || !inReach) return null;
    return { at: at(addDays(r.arrival, -1), '13:00') || soon(), why: 'The day before arrival at 13:00: the guest knows their travel times by then, and there is still time to arrange it.' };
  }
  if (type === 'upsell_late') {
    if (r.departure <= today || !inReach) return null;
    return { at: at(addDays(r.departure, -1), '13:00') || soon(), why: 'The day before checkout at 13:00: early enough for the guest to plan their last morning, and for the team to arrange cleaning.' };
  }
  // Anything that involves another night, and every combined message: two days before, at 10:00.
  if (type === 'upsell_night' || type === 'upsell_departure') {
    if (r.departure <= today || !inReach) return null;
    return { at: at(addDays(r.departure, -2), '10:00') || soon(), why: 'Two days before checkout at 10:00: early enough to change travel plans, late enough that they know how the trip is going.' };
  }
  if (type === 'upsell_before' || type === 'upsell_arrival') {
    if (r.arrival <= today || !inReach) return null;
    return { at: at(addDays(r.arrival, -2), '10:00') || soon(), why: 'Two days before arrival at 10:00: guests are settling their travel plans and there is still time to change them.' };
  }
  if (type === 'happy') {
    if (r.departure > addDays(today, 1) || r.departure < addDays(today, -3)) return null;
    return { at: at(r.departure, '14:00') || soon(), why: 'Just after checkout, while the stay is fresh in their mind.' };
  }
  return null;
}

/** How many nights the apartment stays free after this booking's checkout (99 = nothing booked after it). */
function freeNightsAfter(r) {
  const next = q.get(
    `SELECT MIN(arrival) AS d FROM (SELECT arrival FROM reservations WHERE property_id = ? AND id != ? AND cancelled = 0 AND arrival >= ?
     UNION ALL SELECT arrival FROM blocks WHERE property_id = ? AND arrival >= ?)`,
    r.property_id, r.id, r.departure, r.property_id, r.departure,
  )?.d;
  return next ? Math.round((Date.parse(`${next}T12:00:00Z`) - Date.parse(`${r.departure}T12:00:00Z`)) / 86400_000) : 99;
}

const priceText = (offer) => (offer ? (offer.price ? ` at ${offer.price}` : offer.last_price_on_checkin_page ? `, currently ${offer.last_price_on_checkin_page}` : '') : '');
const termsText = (offer) => (offer?.conditions ? ` (${offer.conditions})` : '');

/**
 * One message for two offers to the same guest. The check-in page link is for early check-in or
 * late checkout only: an extension is arranged by the team (the check-in page cannot sell a gap
 * of several nights), so the guest is asked to let us know.
 */
function combinedBody(type, r, property, offers) {
  const day = offers[type === 'upsell_departure' ? 'upsell_late' : 'upsell_early'];
  const how = r.checkin_link ? 'You can add it on your online check-in page, where the exact price is shown: {checkin_link}' : 'Just reply to this message and we will arrange it.';
  const text = type === 'upsell_departure'
    ? `Hello {first_name},\n\nWe hope you are enjoying your stay. If you would like a more relaxed last morning, late checkout is available${priceText(day)}${termsText(day)}. ${how}\n\nThe apartment is also free after your checkout, so if you wish to extend your stay, just let us know.`
    : `Hello {first_name},\n\nWe are looking forward to welcoming you. If it would help to arrive earlier on the day, early check-in is available${priceText(day)}${termsText(day)}. ${how}\n\nThe apartment is also free the night before, so if you wish to arrive a day earlier, just let us know.`;
  return fillTemplate(text, r, property);
}

function bodyFor(type, r, property, offer) {
  const how = r.checkin_link ? 'You can add it on your online check-in page, where the exact price is shown: {checkin_link}' : 'Just reply to this message and we will arrange it.';
  const price = offer ? (offer.price ? ` at ${offer.price}` : offer.last_price_on_checkin_page ? `, currently ${offer.last_price_on_checkin_page}` : '') : '';
  const terms = offer?.conditions ? ` (${offer.conditions})` : '';
  const text = {
    upsell_early: `Hello {first_name},\n\nWe are looking forward to welcoming you. If it would help to arrive earlier, early check-in is available for your stay${price}${terms}. ${how}`,
    upsell_late: `Hello {first_name},\n\nWe hope you are enjoying your stay. If you would like a more relaxed last morning, late checkout is available${price}${terms}. ${how}`,
    upsell_night: r.checkin_link && freeNightsAfter(r) === 1
      ? `Hello {first_name},\n\nWe hope you are enjoying your stay. The apartment is free the night after your checkout, so if you would like to stay one more night it is available${price}${terms}. ${how}`
      : 'Hello {first_name},\n\nWe hope you are enjoying your stay. The apartment is free after your checkout, so if you wish to extend your stay, just let us know and we will arrange it.',
    upsell_before: `Hello {first_name},\n\nWe are looking forward to welcoming you. The apartment is free the night before your arrival, so if you would like to arrive a day earlier it is available${price}${terms}. Just reply to this message and we will arrange it.`,
    happy: 'Hello {first_name},\n\nThank you for staying with us. We are so glad you enjoyed it. If you have a moment, a short review would mean a great deal to us and helps future guests. We would be delighted to welcome you back.',
  }[type];
  return fillTemplate(text, r, property);
}

/** Which extras (as ChargeAutomation names them) an offer message covers. */
export const offerCovers = (type) => new Set((TASK_TYPES[type]?.parts || [type]).map((part) => TASK_TYPES[part]?.extra).filter(Boolean));

/** Do the dates still allow it? Other bookings and owner blocks both count. */
export function calendarFree(r, type) {
  const taken = (where, ...dates) => !!(
    q.get(`SELECT 1 FROM reservations WHERE property_id = ? AND id != ? AND cancelled = 0 AND ${where}`, r.property_id, r.id, ...dates)
    || q.get(`SELECT 1 FROM blocks WHERE property_id = ? AND ${where}`, r.property_id, ...dates));
  if (type === 'upsell_early') return !taken('departure = ?', r.arrival);
  if (type === 'upsell_late') return !taken('arrival = ?', r.departure);
  if (type === 'upsell_night') return !taken('arrival <= ? AND departure > ?', r.departure, r.departure);
  if (type === 'upsell_before') { const night = addDays(r.arrival, -1); return !taken('arrival <= ? AND departure > ?', night, night); }
  return true;
}
const bought = (r, type) => parseJson(r.extras, []).some((x) => x.status !== 'declined' && upsellType(x.title) === TASK_TYPES[type].extra);

/**
 * A person adds a proposal from the calendar (an extra night into a free gap, before or after a
 * stay). It appears on the to-do list with a proposed time, like the automatic ones.
 */
export function createTask(r, type, user, now = Date.now()) {
  if (!['upsell_night', 'upsell_before'].includes(type)) throw new HttpError(400, 'That cannot be added from here.');
  const property = q.get('SELECT * FROM properties WHERE id = ?', r.property_id);
  if (!property || r.cancelled) throw new HttpError(400, 'This booking is cancelled.');
  if (!calendarFree(r, type)) throw new HttpError(409, 'That night is no longer free.');
  const when = bestTime(type, r, now, true);
  if (!when) throw new HttpError(409, 'It is too late to offer this for that stay.');
  const offer = (offersFor(r, londonDate(new Date(now))) || []).find((o) => o.extra.startsWith('Extra night'));
  const body = bodyFor(type, type === 'upsell_before' ? { ...r, checkin_link: null } : r, property, offer);
  q.run(
    `INSERT INTO tasks(reservation_id, type, body, send_at, why, manual, created_by) VALUES(?, ?, ?, ?, ?, 1, ?)
     ON CONFLICT(reservation_id, type) DO UPDATE SET body = excluded.body, send_at = excluded.send_at, why = excluded.why, status = 'suggested', note = '', manual = 1`,
    r.id, type, body, when.at, when.why, user?.id ?? null,
  );
  refreshTasks(now); // may fold it into one message with another offer for the same guest
  const combo = Object.keys(TASK_TYPES).find((k) => TASK_TYPES[k].parts?.includes(type));
  return q.get("SELECT * FROM tasks WHERE reservation_id = ? AND type IN (?, ?) AND status = 'suggested' ORDER BY type = ? DESC", r.id, type, combo, combo)
    || q.get('SELECT * FROM tasks WHERE reservation_id = ? AND type = ?', r.id, type);
}

/** The extra, if it can still be offered for this booking: switched on, calendar free, not already bought. */
function offerOpen(r, type, now) {
  const t = TASK_TYPES[type];
  if (!t.offer) return null;
  const offer = (offersFor(r, londonDate(new Date(now))) || []).find((o) => o.extra.startsWith(t.offer));
  const bought = parseJson(r.extras, []).some((x) => x.status !== 'declined' && upsellType(x.title) === t.extra);
  return offer && offer.calendar === 'possible' && !bought ? offer : null;
}

/**
 * What should be proposed for this booking right now, by type. `rows` are the proposals already
 * stored for it. An extra night (before or after) that a person added from the calendar counts
 * for as long as the night stays free.
 */
function candidates(r, now, rows = {}) {
  const out = {};
  const moods = q.all('SELECT mood FROM conversations WHERE reservation_id = ?', r.id).map((c) => c.mood);
  const property = q.get('SELECT * FROM properties WHERE id = ? AND active = 1', r.property_id);
  if (!property || r.cancelled) return out;
  if (moods.includes('positive') && !moods.includes('unhappy')) {
    const when = bestTime('happy', r, now);
    if (when) out.happy = { ...when, body: bodyFor('happy', r, property) };
  }
  // After checkout, a review of the guest for the sites where hosts review guests. The text is
  // written afterwards from the conversation (draftReviews); here it is only put on the list.
  if (REVIEW_SITES.test(r.channel || '') && r.departure <= londonDate(new Date(now)) && r.departure >= addDays(londonDate(new Date(now)), -REVIEW_DAYS)) {
    out.review = { at: new Date(Math.max(londonToUtc(r.departure, '12:00'), 0)).toISOString(), why: rows.review?.why || '', body: rows.review?.body || '' };
  }
  if (moods.includes('unhappy')) return out; // never sell to a guest with an open complaint
  const offers = {};
  const added = (type) => !!rows[type]?.manual || Object.entries(TASK_TYPES).some(([combo, t]) => t.parts?.includes(type) && rows[combo]?.manual);
  for (const [type, t] of Object.entries(TASK_TYPES)) {
    if (t.parts || type === 'happy') continue;
    const manual = added(type);
    const offer = t.offer ? offerOpen(r, type, now) : null;
    // Switched on by the team, or added by hand from the calendar; either way the dates must be free and it must not be bought already.
    if (!(offer || (manual && calendarFree(r, type) && !bought(r, type)))) continue;
    const when = bestTime(type, r, now, manual);
    if (!when) continue;
    offers[type] = offer || (offersFor(r, londonDate(new Date(now))) || []).find((o) => o.extra.startsWith('Extra night')) || null;
    out[type] = { ...when, manual, body: bodyFor(type, type === 'upsell_before' ? { ...r, checkin_link: null } : r, property, offers[type]) };
  }
  // Two offers for the same end of the stay go out as one message, unless one of them has already been handled on its own.
  for (const [combo, t] of Object.entries(TASK_TYPES)) {
    if (!t.parts) continue;
    const settled = (row) => row && row.status !== 'suggested';
    if (settled(rows[combo])) { for (const part of t.parts) delete out[part]; continue; } // sent, scheduled or dismissed as one: not proposed again in pieces
    if (!t.parts.every((part) => out[part]) || t.parts.some((part) => settled(rows[part]))) continue;
    const [a, b] = t.parts.map((part) => out[part]);
    const when = bestTime(combo, r, now, a.manual || b.manual);
    if (!when) continue;
    out[combo] = { ...when, manual: a.manual || b.manual, body: combinedBody(combo, r, property, offers) };
    for (const part of t.parts) delete out[part];
  }
  return out;
}

/** Bring the proposals up to date with the bookings, the calendar and what guests have bought. */
export function refreshTasks(now = Date.now()) {
  const today = londonDate(new Date(now));
  let changed = 0;
  const bookings = q.all('SELECT * FROM reservations WHERE cancelled = 0 AND departure >= ? AND (arrival <= ? OR id IN (SELECT reservation_id FROM tasks WHERE manual = 1))', addDays(today, -REVIEW_DAYS), addDays(today, LOOK_AHEAD));
  const live = new Set();
  for (const r of bookings) {
    live.add(r.id);
    const rows = Object.fromEntries(q.all('SELECT * FROM tasks WHERE reservation_id = ?', r.id).map((t) => [t.type, t]));
    const want = candidates(r, now, rows);
    for (const type of Object.keys(TASK_TYPES)) {
      const row = rows[type];
      const c = want[type];
      if (!row && c) {
        q.run('INSERT INTO tasks(reservation_id, type, body, send_at, why, manual) VALUES(?, ?, ?, ?, ?, ?)', r.id, type, c.body, c.at, c.why, c.manual ? 1 : 0);
        changed++;
      } else if (row?.status === 'suggested' && !c) {
        q.run('DELETE FROM tasks WHERE id = ?', row.id); // no longer possible, already bought, too late, or now part of a combined message
        changed++;
      } else if (row?.status === 'suggested' && type !== 'review' && !row.note && Date.parse(row.send_at) < now) {
        q.run('UPDATE tasks SET send_at = ?, why = ? WHERE id = ?', c.at, c.why, row.id); // the proposed moment has passed: propose the next good one
        changed++;
      }
    }
  }
  // Bookings that are over, cancelled or gone.
  for (const row of q.all('SELECT id, reservation_id FROM tasks')) {
    if (!live.has(row.reservation_id)) { q.run('DELETE FROM tasks WHERE id = ?', row.id); changed++; }
  }
  if (changed) emitAdmin('todo');
  return changed;
}

/**
 * The number on the To do tab: messages proposed and not yet scheduled or dismissed. Counted the
 * same way the list is drawn (the booking or chat must still exist), so the two cannot disagree.
 */
export function todoCount() {
  return q.get(`SELECT (SELECT COUNT(*) FROM tasks t JOIN reservations r ON r.id = t.reservation_id WHERE t.status = 'suggested' AND r.cancelled = 0)
    + (SELECT COUNT(*) FROM followups f JOIN conversations c ON c.id = f.conversation_id WHERE f.status = 'suggested') AS n`).n;
}

let drafting = false;
/** Write the review text for guests who have checked out, from their conversation. Call this every minute. */
export async function draftReviews(limit = 5) {
  if (drafting) return 0;
  drafting = true;
  let done = 0;
  try {
    for (const t of q.all("SELECT * FROM tasks WHERE type = 'review' AND status = 'suggested' AND body = '' LIMIT ?", limit)) {
      const r = q.get('SELECT * FROM reservations WHERE id = ?', t.reservation_id);
      if (!r) continue;
      const chats = q.all('SELECT id FROM conversations WHERE reservation_id = ?', r.id).map((c) => c.id);
      const marks = chats.map(() => '?').join(',') || 'NULL';
      const history = chats.length ? q.all(`SELECT role, body FROM messages WHERE conversation_id IN (${marks}) AND (role = 'guest' OR status = 'sent') AND kind NOT IN ('holding', 'scheduled', 'verify') ORDER BY COALESCE(sent_at, created_at), id LIMIT 80`, ...chats)
        .map((m) => ({ role: m.role === 'guest' ? 'guest' : 'team', text: clip(r.checkin_link ? m.body.split(r.checkin_link).join('[link]') : m.body, 700) })) : [];
      const requests = chats.length ? q.all(`SELECT type, summary FROM tickets WHERE conversation_id IN (${marks})`, ...chats).map((x) => `${x.type}: ${x.summary}`) : [];
      try {
        const out = await llm.guestReview({ company: brand().company, guestFirstName: r.first_name, nights: Math.max(1, Math.round((Date.parse(r.departure) - Date.parse(r.arrival)) / 86400_000)), channel: r.channel, history, requests });
        if (!out.review) continue;
        q.run("UPDATE tasks SET body = ?, why = ? WHERE id = ? AND body = ''", out.review, `Suggested rating: ${out.stars} out of 5.${out.note ? ` ${out.note}` : ''}`, t.id);
        done++;
      } catch (e) {
        console.error(`Review draft for booking ${r.id}: ${e.message}`); // tried again on the next run
      }
    }
  } finally {
    drafting = false;
  }
  if (done) emitAdmin('todo');
  return done;
}

let sending = false;
/** Send the messages the team scheduled from the to-do list. Call this every minute. */
export async function runTasks(now = Date.now()) {
  if (sending || !smoobu()) return 0;
  sending = true;
  let sent = 0;
  try {
    for (const t of q.all("SELECT * FROM tasks WHERE status = 'scheduled' AND send_at <= ?", new Date(now).toISOString())) {
      if (q.run("UPDATE tasks SET status = 'done' WHERE id = ? AND status = 'scheduled'", t.id).changes === 0) continue;
      const r = q.get('SELECT * FROM reservations WHERE id = ? AND cancelled = 0', t.reservation_id);
      if (!r) continue;
      const conversation = channelConversation(r);
      // An offer is only sent if it can still be honoured and has not been bought in the meantime.
      if (t.type !== 'happy') {
        const parts = TASK_TYPES[t.type]?.parts || [t.type];
        const open = parts.filter((part) => calendarFree(r, part) && !bought(r, part));
        if (!open.length) {
          withholdMessage(conversation, t.body, 'No longer available for these dates, or the guest has already bought it.', { task: t.type });
          continue;
        }
        if (open.length < parts.length) {
          // The message offers two things and one has gone. It is not sent; the offer that remains comes back
          // to the to-do list as its own suggestion, so the guest is never offered something we cannot give.
          q.run('DELETE FROM tasks WHERE id = ?', t.id);
          refreshTasks(now);
          await notifyTeam({ title: 'Scheduled offer not sent', body: clip(`${r.guest_name || 'A guest'}: one of the two offers is no longer available. The other is back on the to-do list.`, 160), url: '/admin/#/todo', tag: `task-${t.id}` });
          continue;
        }
      }
      // A person scheduled this knowing the conversation as it stood. Only something said since then can stop it.
      const since = t.scheduled_at || t.created_at;
      const news = q.get("SELECT 1 FROM messages WHERE conversation_id = ? AND (role = 'guest' OR (status = 'sent' AND kind != 'holding')) AND COALESCE(sent_at, created_at) > ?", conversation.id, since);
      const needed = news ? await checkStillNeeded(conversation, t.body) : { verdict: 'send' };
      if (needed.verdict === 'hold') {
        withholdMessage(conversation, t.body, needed.reason, { task: t.type });
        continue;
      }
      if (needed.verdict === 'ask_team') {
        q.run("UPDATE tasks SET status = 'suggested', note = ? WHERE id = ?", `Not sent: ${needed.reason || 'the conversation has moved on since this was scheduled.'} Schedule it again if it still fits.`, t.id);
        await notifyTeam({ title: 'Scheduled message needs a look', body: clip(`${r.guest_name || 'A guest'}: ${needed.reason || 'the conversation has moved on.'}`, 160), url: '/admin/#/todo', tag: `task-${t.id}` });
        continue;
      }
      await sendMessage(conversation, 'team', t.body, { createdBy: t.created_by, meta: { task: t.type } });
      // Kept for Insights: how many offers were sent, and later how many were taken up.
      if (t.type !== 'happy') q.run('INSERT INTO offers_sent(reservation_id, property_id, guest_name, type) VALUES(?, ?, ?, ?)', r.id, r.property_id, r.guest_name, t.type);
      sent++;
    }
  } finally {
    sending = false;
  }
  emitAdmin('todo');
  return sent;
}

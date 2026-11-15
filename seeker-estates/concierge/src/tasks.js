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

export const TASK_TYPES = {
  upsell_early: { label: 'Offer early check-in', offer: 'Early check-in', extra: 'early_checkin' },
  upsell_late: { label: 'Offer late checkout', offer: 'Late checkout', extra: 'late_checkout' },
  upsell_night: { label: 'Offer an extra night', offer: 'Extra night', extra: 'extra_night' },
  upsell_before: { label: 'Offer arriving a night earlier', extra: 'extra_night', manualOnly: true },
  happy: { label: 'Thank a happy guest' },
};

const LOOK_AHEAD = 10; // days before arrival from which offers are proposed

/** The moment to send, and why. Null when it is too late to be useful. */
function bestTime(type, r, now, manual = false) {
  const today = londonDate(new Date(now));
  const soon = () => followUpTime(1, now);
  const at = (date, time) => { const t = londonToUtc(date, time); return t > now ? new Date(t).toISOString() : null; };
  if (type === 'upsell_early') {
    if (r.arrival < today || r.arrival > addDays(today, LOOK_AHEAD)) return null;
    if (r.arrival === today) return Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hourCycle: 'h23' }).format(new Date(now))) < 11 ? { at: soon(), why: 'The guest arrives today, so this is only useful if it goes this morning.' } : null;
    return { at: at(addDays(r.arrival, -2), '10:00') || soon(), why: 'Two days before arrival, mid-morning: guests are settling their travel plans and tend to read and act on messages then.' };
  }
  if (type === 'upsell_late') {
    if (r.departure <= today || r.arrival > addDays(today, LOOK_AHEAD)) return null;
    return { at: at(addDays(r.departure, -1), '13:00') || soon(), why: 'The day before checkout at 13:00: early enough for the guest to plan their last morning, and for the team to arrange cleaning.' };
  }
  if (type === 'upsell_night') {
    if (r.departure <= today || (!manual && r.arrival > addDays(today, LOOK_AHEAD))) return null;
    return { at: at(addDays(r.departure, -2), '11:00') || soon(), why: 'Two days before checkout: early enough to change travel plans, late enough that they know how the trip is going.' };
  }
  if (type === 'upsell_before') {
    if (r.arrival <= today) return null;
    return { at: at(addDays(r.arrival, -3), '10:00') || soon(), why: 'Three days before arrival: there is still time to change travel plans.' };
  }
  if (type === 'happy') {
    if (r.departure > addDays(today, 1) || r.departure < addDays(today, -3)) return null;
    return { at: at(r.departure, '14:00') || soon(), why: 'Just after checkout, while the stay is fresh in their mind.' };
  }
  return null;
}

function bodyFor(type, r, property, offer) {
  const how = r.checkin_link ? 'You can add it on your online check-in page, where the exact price is shown: {checkin_link}' : 'Just reply to this message and we will arrange it.';
  const price = offer ? (offer.price ? ` at ${offer.price}` : offer.last_price_on_checkin_page ? `, currently ${offer.last_price_on_checkin_page}` : '') : '';
  const terms = offer?.conditions ? ` (${offer.conditions})` : '';
  const text = {
    upsell_early: `Hello {first_name},\n\nWe are looking forward to welcoming you to {property} on {arrival}. If it would help to arrive earlier, early check-in is available for your stay${price}${terms}. ${how}`,
    upsell_late: `Hello {first_name},\n\nWe hope you are enjoying your stay. If you would like a more relaxed last morning, late checkout is available${price}${terms}. ${how}`,
    upsell_night: `Hello {first_name},\n\nWe hope you are enjoying your stay. The apartment is free the night after your checkout, so if you would like to stay one more night it is available${price}${terms}. ${how}`,
    upsell_before: `Hello {first_name},\n\nWe are looking forward to welcoming you to {property}. The apartment is free the night before your arrival, so if you would like to arrive a day earlier it is available${price}${terms}. Just reply to this message and we will arrange it.`,
    happy: 'Hello {first_name},\n\nThank you for staying at {property}. We are so glad you enjoyed it. If you have a moment, a short review would mean a great deal to us and helps future guests. We would be delighted to welcome you back.',
  }[type];
  return fillTemplate(text, r, property);
}

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
  emitAdmin('todo');
  return q.get('SELECT * FROM tasks WHERE reservation_id = ? AND type = ?', r.id, type);
}

/** The extra, if it can still be offered for this booking: switched on, calendar free, not already bought. */
function offerOpen(r, type, now) {
  const t = TASK_TYPES[type];
  if (!t.offer) return null;
  const offer = (offersFor(r, londonDate(new Date(now))) || []).find((o) => o.extra.startsWith(t.offer));
  const bought = parseJson(r.extras, []).some((x) => x.status !== 'declined' && upsellType(x.title) === t.extra);
  return offer && offer.calendar === 'possible' && !bought ? offer : null;
}

/** What should be proposed for this booking right now, by type. */
function candidates(r, now) {
  const out = {};
  const moods = q.all('SELECT mood FROM conversations WHERE reservation_id = ?', r.id).map((c) => c.mood);
  const property = q.get('SELECT * FROM properties WHERE id = ? AND active = 1', r.property_id);
  if (!property || r.cancelled) return out;
  if (moods.includes('positive') && !moods.includes('unhappy')) {
    const when = bestTime('happy', r, now);
    if (when) out.happy = { ...when, body: bodyFor('happy', r, property) };
  }
  if (moods.includes('unhappy')) return out; // never sell to a guest with an open complaint
  for (const [type, t] of Object.entries(TASK_TYPES)) {
    if (!t.offer) continue;
    const offer = offerOpen(r, type, now);
    if (!offer) continue;
    const when = bestTime(type, r, now);
    if (when) out[type] = { ...when, body: bodyFor(type, r, property, offer) };
  }
  return out;
}

/** Bring the proposals up to date with the bookings, the calendar and what guests have bought. */
export function refreshTasks(now = Date.now()) {
  const today = londonDate(new Date(now));
  let changed = 0;
  const bookings = q.all('SELECT * FROM reservations WHERE cancelled = 0 AND departure >= ? AND (arrival <= ? OR id IN (SELECT reservation_id FROM tasks WHERE manual = 1))', addDays(today, -3), addDays(today, LOOK_AHEAD));
  const live = new Set();
  for (const r of bookings) {
    live.add(r.id);
    const want = candidates(r, now);
    for (const type of Object.keys(TASK_TYPES)) {
      const row = q.get('SELECT * FROM tasks WHERE reservation_id = ? AND type = ?', r.id, type);
      const c = want[type];
      if (!row && c) {
        q.run('INSERT INTO tasks(reservation_id, type, body, send_at, why) VALUES(?, ?, ?, ?, ?)', r.id, type, c.body, c.at, c.why);
        changed++;
      } else if (row?.status === 'suggested' && row.manual) {
        // Added by a person: kept until the night is taken, it is bought, or the moment has passed.
        if (!calendarFree(r, type) || bought(r, type) || !bestTime(type, r, now, true)) { q.run('DELETE FROM tasks WHERE id = ?', row.id); changed++; }
      } else if (row?.status === 'suggested' && !c) {
        q.run('DELETE FROM tasks WHERE id = ?', row.id); // no longer possible, already bought, or too late
        changed++;
      } else if (row?.status === 'suggested' && !row.note && Date.parse(row.send_at) < now) {
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
      if (t.type !== 'happy' && (!calendarFree(r, t.type) || bought(r, t.type))) {
        withholdMessage(conversation, t.body, 'No longer available for these dates, or the guest has already bought it.', { task: t.type });
        continue;
      }
      const needed = await checkStillNeeded(conversation, t.body);
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
      sent++;
    }
  } finally {
    sending = false;
  }
  emitAdmin('todo');
  return sent;
}

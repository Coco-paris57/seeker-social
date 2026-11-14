// Three things that run around the conversation rather than inside it:
//   - the weekly tidy-up: knowledge entries proposed from the replies the team approved
//   - scheduled messages: fixed texts sent at set points of a stay
//   - (paid extras are settings only; the calendar check lives in bot.js)
import { q, getRaw, setRaw, audit } from './db.js';
import * as llm from './llm.js';
import { queueDraft, saveKnowledge, sendMessage, CHECKIN_LINK } from './bot.js';
import { notifyTeam } from './notify.js';
import { smoobu } from './smoobu.js';
import { addDays, clip, londonDate, londonToUtc, HttpError } from './util.js';

const hourInLondon = (now) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hourCycle: 'h23' }).format(now));

// ---------------------------------------------------------------------------------------
// Weekly tidy-up

/** Look at one property's approved replies and store proposals. Returns how many were added. */
async function tidyProperty(property, since) {
  const replies = q
    .all('SELECT * FROM examples WHERE property_id = ? AND created_at > ? ORDER BY id DESC LIMIT 60', property.id, since)
    .map((e) => ({ id: e.id, guest_wanted: e.question, reply: e.answer, corrected_by_team: !!e.edited, verified_guest_only: !!e.private }));
  if (!replies.length) return 0;
  const knowledge = q
    .all('SELECT id, property_id, category, question, answer FROM knowledge WHERE property_id = ? OR property_id IS NULL ORDER BY id', property.id)
    .map((k) => ({ id: k.id, applies_to: k.property_id ? 'this property' : 'all properties', category: k.category, question: k.question, answer: k.answer }));
  const proposals = await llm.tidy({ propertyName: property.display_name || property.name, knowledge, replies });
  let added = 0;
  for (const s of proposals) {
    const question = clip(String(s.question || '').trim(), 300);
    const answer = String(s.answer || '').split(CHECKIN_LINK).join('your online check-in page').trim().slice(0, 4000);
    if (!question || !answer) continue;
    const entry = s.kind === 'update' ? knowledge.find((k) => k.id === s.knowledge_id) : null;
    if (s.kind === 'update' && !entry) continue;
    if (entry && entry.answer.trim() === answer) continue;
    // Not proposed twice: skip what is already waiting, and what the team dismissed before.
    const seen = entry
      ? q.get("SELECT 1 FROM suggestions WHERE knowledge_id = ? AND (status = 'open' OR (status = 'dismissed' AND answer = ?))", entry.id, answer)
      : q.get("SELECT 1 FROM suggestions WHERE property_id = ? AND lower(question) = lower(?) AND status IN ('open', 'dismissed')", property.id, question);
    if (seen) continue;
    const used = replies.filter((r) => (s.reply_ids || []).includes(r.id));
    // Verified-only unless every reply it came from was approved for an unverified visitor.
    const sensitive = used.length && used.every((r) => !r.verified_guest_only) ? 0 : 1;
    q.run(
      'INSERT INTO suggestions(property_id, kind, knowledge_id, category, question, answer, reason, sensitive) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      property.id, entry ? 'update' : 'add', entry?.id ?? null, llm.CATEGORIES.includes(s.category) ? s.category : 'other', question, answer, clip(String(s.reason || ''), 300), sensitive,
    );
    added++;
  }
  return added;
}

const tidying = { running: false };

/** Run the tidy-up for every property with replies approved since the last run. */
export async function runTidy() {
  if (tidying.running) return { added: 0, busy: true };
  tidying.running = true;
  try {
    const since = getRaw('tidy_last_run') || '2000-01-01 00:00:00';
    const started = q.get("SELECT datetime('now') AS t").t;
    let added = 0;
    let failed = 0;
    for (const property of q.all('SELECT * FROM properties WHERE active = 1 AND id IN (SELECT property_id FROM examples WHERE created_at > ?)', since)) {
      try {
        added += await tidyProperty(property, since);
      } catch (e) {
        failed++;
        console.error(`Tidy-up for ${property.name}: ${e.message}`);
      }
    }
    if (!failed) setRaw('tidy_last_run', started); // a failed property is looked at again next time
    return { added, failed };
  } finally {
    tidying.running = false;
  }
}

/** Once a week, Monday from 08:00 UK time. Call this every minute. */
export async function weeklyTidy(now = new Date()) {
  const today = londonDate(now);
  const weekday = new Date(`${today}T12:00:00Z`).getUTCDay(); // 1 = Monday
  if (weekday !== 1 || hourInLondon(now) < 8 || getRaw('tidy_week') === today) return null;
  setRaw('tidy_week', today);
  const out = await runTidy();
  const open = q.get("SELECT COUNT(*) AS n FROM suggestions WHERE status = 'open'").n;
  if (out.added) {
    await notifyTeam({ title: 'Weekly tidy-up ready', body: `${open} suggestion${open === 1 ? '' : 's'} for the knowledge base to review.`, url: '/admin/#/tidy', tag: 'tidy' });
  }
  console.log(`Weekly tidy-up: ${out.added} suggestion(s)`);
  return out;
}

export function decideSuggestion(id, user, { accept, question, answer, category, sensitive } = {}) {
  const s = q.get("SELECT * FROM suggestions WHERE id = ? AND status = 'open'", id);
  if (!s) throw new HttpError(409, 'This suggestion has already been handled.');
  let knowledgeId = null;
  if (accept) {
    const text = String(answer ?? s.answer).trim();
    const title = clip(String(question ?? s.question).trim(), 300);
    if (!text || !title) throw new HttpError(400, 'The entry needs a topic and an answer.');
    const cat = llm.CATEGORIES.includes(category) ? category : s.category;
    const priv = typeof sensitive === 'boolean' ? sensitive : !!s.sensitive;
    if (s.kind === 'update' && s.knowledge_id && q.get('SELECT 1 FROM knowledge WHERE id = ?', s.knowledge_id)) {
      q.run("UPDATE knowledge SET question = ?, answer = ?, category = ?, sensitive = ?, updated_at = datetime('now') WHERE id = ?", title, text, cat, priv ? 1 : 0, s.knowledge_id);
      knowledgeId = s.knowledge_id;
    } else {
      knowledgeId = saveKnowledge({ propertyId: s.property_id, category: cat, question: title, answer: text, userId: user.id, sensitive: priv });
    }
  }
  q.run('UPDATE suggestions SET status = ?, decided_by = ? WHERE id = ?', accept ? 'accepted' : 'dismissed', user.id, id);
  audit(user.id, accept ? 'tidy.accept' : 'tidy.dismiss', `suggestion ${id}`);
  return { knowledgeId };
}

// ---------------------------------------------------------------------------------------
// Scheduled messages

export const PLACEHOLDERS = ['first_name', 'property', 'arrival', 'departure', 'check_in', 'check_out', 'checkin_link'];
const longDate = (d) => new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${d}T12:00:00Z`));

/** The template text for one booking, or null while something it needs is missing (the check-in link). */
export function fillTemplate(body, reservation, property) {
  const values = {
    first_name: reservation.first_name || 'there',
    property: property.display_name || property.name,
    arrival: longDate(reservation.arrival),
    departure: longDate(reservation.departure),
    check_in: reservation.check_in || '15:00',
    check_out: reservation.check_out || '11:00',
    checkin_link: reservation.checkin_link || '',
  };
  if (/\{checkin_link\}/.test(body) && !values.checkin_link) return null;
  return body.replace(/\{(\w+)\}/g, (all, key) => (key in values ? values[key] : all)).trim();
}

/** When a template falls due for a booking, as a UTC timestamp in ms. */
export function dueAt(template, reservation) {
  const date = addDays(template.anchor === 'departure' ? reservation.departure : reservation.arrival, template.days);
  return londonToUtc(date, template.time);
}

const WINDOW = 12 * 3600_000; // a message that could not go out within 12 hours of its time is skipped

function channelConversation(reservation) {
  const found = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = ?", reservation.id);
  if (found) return found;
  const id = q.insert(
    "INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified) VALUES(?, ?, 'smoobu', ?, 1)",
    reservation.property_id, reservation.id, reservation.guest_name || `${reservation.first_name || ''} ${reservation.last_name || ''}`.trim(),
  );
  return q.get('SELECT * FROM conversations WHERE id = ?', id);
}

let sending = false;

/** Send or queue every scheduled message that is due. Call this every few minutes. */
export async function runScheduled(now = Date.now()) {
  if (sending || !smoobu()) return { sent: 0, queued: 0 };
  sending = true;
  const out = { sent: 0, queued: 0 };
  try {
    const today = londonDate(new Date(now));
    for (const t of q.all('SELECT * FROM templates WHERE enabled = 1 ORDER BY id')) {
      const anchor = t.anchor === 'departure' ? 'departure' : 'arrival';
      // Bookings whose anchor date puts this template within a day of now.
      const target = addDays(today, -t.days);
      const bookings = q.all(
        `SELECT * FROM reservations WHERE cancelled = 0 AND ${anchor} BETWEEN ? AND ? AND (? IS NULL OR property_id = ?)
         AND id NOT IN (SELECT reservation_id FROM template_sends WHERE template_id = ?)`,
        addDays(target, -1), addDays(target, 1), t.property_id, t.property_id, t.id,
      );
      for (const r of bookings) {
        const due = dueAt(t, r);
        if (!(due <= now && now < due + WINDOW)) continue;
        // The property's own template for the same moment replaces the one for every property.
        if (!t.property_id && q.get('SELECT 1 FROM templates WHERE enabled = 1 AND property_id = ? AND anchor = ? AND days = ?', r.property_id, t.anchor, t.days)) continue;
        const property = q.get('SELECT * FROM properties WHERE id = ? AND active = 1', r.property_id);
        const text = property && fillTemplate(t.body, r, property);
        if (!text) continue; // e.g. the check-in link has not arrived yet: tried again on the next run
        // Claim first, so two runs can never send the same message twice.
        if (q.run('INSERT OR IGNORE INTO template_sends(template_id, reservation_id) VALUES(?, ?)', t.id, r.id).changes === 0) continue;
        const conversation = channelConversation(r);
        const meta = { templateId: t.id, summary: `Scheduled: ${t.name}` };
        let message;
        if (t.auto) {
          message = await sendMessage(conversation, 'bot', text, { kind: 'scheduled', meta: { ...meta, auto: true } });
          out.sent++;
        } else {
          message = queueDraft(conversation, text, { kind: 'scheduled', meta });
          out.queued++;
        }
        q.run('UPDATE template_sends SET message_id = ? WHERE template_id = ? AND reservation_id = ?', message.id, t.id, r.id);
      }
    }
    if (out.queued) {
      await notifyTeam({ title: 'Scheduled message to approve', body: `${out.queued} scheduled message${out.queued === 1 ? ' is' : 's are'} waiting in the Inbox.`, url: '/admin/#/inbox', tag: 'scheduled' });
    }
    q.run('DELETE FROM template_sends WHERE reservation_id NOT IN (SELECT id FROM reservations)');
  } finally {
    sending = false;
  }
  return out;
}

/** Three starting points, switched off, so the page is not empty the first time it is opened. */
export function seedTemplates() {
  if (getRaw('templates_seeded')) return;
  setRaw('templates_seeded', '1');
  if (q.get('SELECT 1 FROM templates')) return;
  const rows = [
    ['Before arrival', 'arrival', -3, '10:00', 'Hello {first_name},\n\nWe are looking forward to welcoming you to {property} on {arrival}. Check-in is from {check_in}.\n\nEverything you need for your arrival is on your online check-in page: {checkin_link}\n\nIf you have any questions before you travel, just reply to this message.'],
    ['Morning of checkout', 'departure', 0, '08:30', 'Good morning {first_name},\n\nWe hope you enjoyed your stay at {property}. A quick reminder that checkout is by {check_out} today.\n\nSafe travels, and thank you for staying with us.'],
    ['After the stay', 'departure', 1, '11:00', 'Hello {first_name},\n\nThank you for staying at {property}. We hope everything was as you expected. If anything could have been better, we would be glad to hear it: just reply to this message.'],
  ];
  for (const r of rows) q.run('INSERT INTO templates(name, anchor, days, time, body) VALUES(?, ?, ?, ?, ?)', ...r);
}

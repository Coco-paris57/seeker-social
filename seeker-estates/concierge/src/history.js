// Learning from the past. Every conversation already in Smoobu (Airbnb, Booking.com, direct) is
// read once: real answers the team gave become approved replies for that property, and messages
// the team wrote by hand count towards how the team writes. Nothing is added to any chat, and
// nothing is sent to a guest. Messages that carry a door code or a password are left out
// entirely: they are neither stored nor shown to the AI model.
import { q, getRaw, setRaw, parseJson } from './db.js';
import { rememberApproval } from './bot.js';
import { smoobu } from './smoobu.js';
import * as llm from './llm.js';
import { learnStyle } from './style.js';
import { addDays, clip, htmlToText, londonDate } from './util.js';

const MONTHS_BACK = 18;
const MAX_CALLS = 2500; // AI calls in one run, as a ceiling
const norm = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const textOf = (m) => String(m.message || '').trim() || htmlToText(m.htmlMessage);
const digits = (s) => String(s || '').replace(/\D+/g, '');

const CODE_WORDS = /(code|lock ?box|key ?safe|key ?box|keypad|password|passcode|pass key|pin\b|wi-?fi|network|clave|contraseña|mot de passe|kennwort)/i;
/** Does this message give out a way in, or a password? Those are never learned from. */
export function carriesSecret(text, property) {
  const r = parseJson(property?.team_record, null) || {};
  for (const secret of [r.accessCode, r.wifi]) {
    for (const piece of String(secret || '').split(/[\s,;:/|]+/)) {
      if (piece.length >= 4 && /\d/.test(piece) && text.includes(piece)) return true;
    }
    const d = digits(secret);
    if (d.length >= 4 && digits(text).includes(d)) return true;
  }
  // A code-like word within a few words of a number or a password-looking token.
  return text.split(/\n|(?<=[.!?])\s/).some((line) => CODE_WORDS.test(line) && (/\d{3,}/.test(line) || /\b(?=\w*\d)(?=\w*[a-z])\w{6,}\b/i.test(line)));
}

const state = { running: false, done: 0, total: 0, studied: 0, learned: 0, error: '' };

export function historyStatus() {
  return {
    running: state.running, done: state.done, total: state.total, studied: state.studied, learned: state.learned, error: state.error,
    finishedAt: getRaw('history_at') || null, lastLearned: Number(getRaw('history_learned')) || 0, lastRead: Number(getRaw('history_read')) || 0,
    available: !!smoobu(),
  };
}

/** Start reading the past conversations, in the background. Returns straight away. */
export function startHistory() {
  if (state.running || !smoobu()) return historyStatus();
  Object.assign(state, { running: true, done: 0, total: 0, studied: 0, learned: 0, error: '' });
  learnHistory()
    .catch((e) => { state.error = e.message; console.error(`Learning from past messages: ${e.message}`); })
    .finally(() => { state.running = false; });
  return historyStatus();
}

/** Read every past thread once. Bookings already read are skipped, so it can be run again later for the new ones. */
export async function learnHistory(now = Date.now()) {
  const api = smoobu();
  Object.assign(state, { done: 0, total: 0, studied: 0, learned: 0, error: '' });
  const today = londonDate(new Date(now));
  const properties = new Map(q.all('SELECT * FROM properties WHERE smoobu_id IS NOT NULL').map((p) => [p.smoobu_id, p]));
  const bookings = (await api.reservations(addDays(today, -MONTHS_BACK * 30), today))
    .filter((b) => b?.id && properties.has(b.apartment?.id) && !q.get('SELECT 1 FROM history_read WHERE reservation_id = ?', b.id));
  state.total = bookings.length;

  // First pass: read the threads. A text sent word for word to several guests is a template, not a reply.
  const threads = [];
  const seen = new Map(); // start of a host message -> how many bookings it went to
  for (const b of bookings) {
    try {
      const thread = (await api.messages(b.id)).map((m) => ({ id: m.id, guest: m.type === 1, text: textOf(m) })).filter((m) => m.text);
      threads.push({ b, thread });
      for (const key of new Set(thread.filter((m) => !m.guest).map((m) => norm(m.text).slice(0, 120)))) seen.set(key, (seen.get(key) || 0) + 1);
    } catch (e) {
      console.error(`Past messages for booking ${b.id}: ${e.message}`); // left unread: tried again next time
    }
    state.done++;
  }

  // Second pass: each hand-written reply that follows something the guest said.
  let calls = 0;
  for (const { b, thread } of threads) {
    const property = properties.get(b.apartment.id);
    const ours = q.all("SELECT m.body FROM messages m JOIN conversations c ON c.id = m.conversation_id WHERE c.reservation_id = ? AND m.role != 'guest' AND m.status = 'sent' AND json_extract(m.meta, '$.external') IS NULL", b.id).map((m) => norm(m.body).slice(0, 120));
    let asked = [];
    for (const m of thread) {
      if (m.guest) { asked.push(clip(m.text, 700)); continue; }
      const waiting = asked.slice(-3);
      asked = [];
      const key = norm(m.text).slice(0, 120);
      if (!waiting.length || m.text.length < 25 || seen.get(key) > 1) continue; // not a reply, too short to teach anything, or a template
      if (ours.some((o) => o && (o.startsWith(key) || key.startsWith(o)))) continue; // sent from this app: already learned from
      if (carriesSecret(m.text, property) || waiting.some((g) => carriesSecret(g, property))) continue;
      if (calls >= MAX_CALLS) continue;
      calls++;
      try {
        const what = await llm.outsideReply({ guestMessages: waiting, reply: clip(m.text, 1500) });
        if (what.kind !== 'answer' || !what.guestWanted) continue;
        const link = b['guest-app-url'] || q.get('SELECT checkin_link FROM reservations WHERE id = ?', b.id)?.checkin_link;
        const text = link ? m.text.split(link).join('') : m.text;
        // Kept for guests with a booking only: what was said to one guest in private is not repeated to a stranger.
        rememberApproval({ property_id: property.id, verified: 1, reservation_id: null }, { summary: what.guestWanted }, text.slice(0, 4000), { id: null }, true);
        q.run('INSERT OR IGNORE INTO history_samples(message_id, body) VALUES(?, ?)', m.id, text.slice(0, 1500));
        state.learned++;
      } catch (e) {
        console.error(`Past message ${m.id}: ${e.message}`);
      }
    }
    q.run('INSERT OR IGNORE INTO history_read(reservation_id) VALUES(?)', b.id);
    state.studied++;
  }
  setRaw('history_at', new Date().toISOString());
  setRaw('history_learned', String((Number(getRaw('history_learned')) || 0) + state.learned));
  setRaw('history_read', String(q.get('SELECT COUNT(*) AS n FROM history_read').n));
  if (state.learned) await learnStyle({ force: getRaw('house_style_edited') !== '1' });
  return { read: threads.length, learned: state.learned };
}

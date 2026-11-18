// How the team writes. Messages the team wrote themselves (in the app, by correcting a draft,
// or directly on Airbnb, Booking.com or in Smoobu) are studied, and the result is a short style
// guide the assistant follows. Style only: greeting, sign-off, length, tone, phrases.
import { q, getRaw, setRaw } from './db.js';
import * as llm from './llm.js';
import { clip } from './util.js';

const MIN_NEW = 8; // new team-written messages before the guide is written again
const SAMPLES = 40;
/** Hand-written replies from past Smoobu conversations (see history.js). */
const fromHistory = () => q.all('SELECT body FROM history_samples ORDER BY message_id DESC LIMIT ?', SAMPLES);

/** Messages a person on the team worded: their own replies, and drafts they corrected. Automatic and fixed texts are left out. */
function teamWritten(afterId = 0) {
  return q.all(
    `SELECT id, body FROM messages WHERE status = 'sent' AND id > ? AND length(body) > 40 AND kind NOT IN ('holding', 'scheduled', 'verify', 'checkin', 'urgent')
     AND (role = 'team' OR (role = 'bot' AND json_extract(meta, '$.edited') = 1)) AND json_extract(meta, '$.automatic') IS NULL
     ORDER BY id DESC LIMIT ?`, afterId, SAMPLES);
}

export function styleStatus() {
  return { style: getRaw('house_style') || '', updatedAt: getRaw('house_style_at') || null, edited: getRaw('house_style_edited') === '1', waiting: teamWritten(Number(getRaw('house_style_upto')) || 0).length, needed: MIN_NEW, samples: teamWritten(0).length + fromHistory().length };
}

let learning = false;
/** Write the style guide again when enough new team-written messages have come in (or when asked). */
export async function learnStyle({ force = false } = {}) {
  if (learning) return null;
  if (!force && getRaw('house_style_edited') === '1') return null; // a person wrote the guide: it is theirs until they ask for it to be learned again
  const upto = Number(getRaw('house_style_upto')) || 0;
  if (!force && teamWritten(upto).length < MIN_NEW) return null;
  const rows = teamWritten(0);
  const past = fromHistory();
  if (rows.length + past.length < 3) return null; // too little to describe a habit
  learning = true;
  try {
    const style = await llm.houseStyle([...past.reverse(), ...rows.slice().reverse()].map((r) => clip(r.body.replace(/https?:\/\/\S+/g, '[link]'), 700)));
    if (!style) return null;
    setRaw('house_style', style);
    setRaw('house_style_at', new Date().toISOString());
    setRaw('house_style_upto', String(Math.max(0, ...rows.map((r) => r.id))));
    setRaw('house_style_edited', '0');
    return style;
  } finally {
    learning = false;
  }
}

/** A person sets the guide by hand, or clears it (empty) so the assistant uses its standard voice. */
export function setStyle(text) {
  setRaw('house_style', String(text || '').trim().slice(0, 1800));
  setRaw('house_style_at', new Date().toISOString());
  setRaw('house_style_edited', '1');
}

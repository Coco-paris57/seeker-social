import crypto from 'node:crypto';
import { config } from './config.js';

export const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
export const newToken = (bytes = 32) => crypto.randomBytes(bytes).toString('base64url');

/** Today's date in London as YYYY-MM-DD. */
export function londonDate(d = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: config.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

/** London wall-clock date and time (e.g. '2026-11-12', '15:00') as a UTC timestamp in ms. */
export function londonToUtc(date, time = '00:00') {
  const guess = Date.parse(`${date}T${/^\d{1,2}:\d{2}$/.test(time) ? time.padStart(5, '0') : '00:00'}:00Z`);
  if (Number.isNaN(guess)) return NaN;
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: config.timezone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(new Date(guess));
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  const shown = Date.parse(`${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:00Z`);
  return guess - (shown - guess);
}

export function addDays(date, n) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Lower-case, strip accents and anything that is not a letter, for comparing surnames. */
export function normaliseName(s) {
  return String(s || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

/** Text pasted from a rich editor (ChargeAutomation, Smoobu) as plain text: tags removed, line breaks kept. */
export function htmlToText(html) {
  return String(html ?? '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr)\s*>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(Number(n)))
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const clip = (s, n) => {
  const t = String(s ?? '').trim();
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
};

/** Fixed-window rate limiter held in memory. Returns true when the call is allowed. */
export function rateLimiter(limit, windowMs) {
  const hits = new Map();
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }, windowMs);
  timer.unref();
  return (key) => {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= limit;
  };
}

/** Counts failures only (e.g. wrong passwords), so correct attempts are never locked out by others. */
export function failureLimiter(limit, windowMs) {
  const fails = new Map();
  const live = (key) => {
    const e = fails.get(key);
    if (e && e.reset < Date.now()) fails.delete(key);
    return fails.get(key);
  };
  return {
    blocked: (key) => (live(key)?.count || 0) >= limit,
    fail: (key) => {
      const e = live(key);
      if (e) e.count += 1;
      else fails.set(key, { count: 1, reset: Date.now() + windowMs });
    },
    clear: (key) => fails.delete(key),
  };
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

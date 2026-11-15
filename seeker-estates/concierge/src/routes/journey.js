// Team API for the weekly tidy-up, scheduled messages and paid extras. Mounted inside the
// team router, after sign-in is checked.
import express from 'express';
import { q, getRaw, audit, parseJson } from '../db.js';
import { requireAdmin } from '../auth.js';
import { CATEGORIES } from '../llm.js';
import { decideSuggestion, PLACEHOLDERS, runTidy, seedTemplates } from '../journey.js';
import { clip, HttpError } from '../util.js';
import { upsellType } from '../bot.js';
import { iso } from './shared.js';

export const journey = express.Router();
const propertyName = (id) => {
  const p = id && q.get('SELECT name, display_name FROM properties WHERE id = ?', id);
  return p ? p.display_name || p.name : null;
};
const propertyIdOf = (v) => {
  if (v == null || v === '') return null;
  const id = Number(v);
  if (!Number.isInteger(id) || !q.get('SELECT 1 FROM properties WHERE id = ?', id)) throw new HttpError(400, 'That property does not exist.');
  return id;
};

// --- weekly tidy-up ---------------------------------------------------------------------

function suggestionOut(s) {
  const current = s.knowledge_id ? q.get('SELECT question, answer FROM knowledge WHERE id = ?', s.knowledge_id) : null;
  return {
    id: s.id, kind: s.kind, propertyId: s.property_id, propertyName: propertyName(s.property_id), category: s.category,
    question: s.question, answer: s.answer, reason: s.reason, sensitive: !!s.sensitive, at: iso(s.created_at),
    current: current ? { question: current.question, answer: current.answer } : null,
  };
}
const openSuggestions = () => q.all("SELECT * FROM suggestions WHERE status = 'open' ORDER BY property_id, id").map(suggestionOut);

journey.get('/suggestions', (req, res) => {
  res.json({ suggestions: openSuggestions(), lastRun: iso(getRaw('tidy_last_run')), categories: CATEGORIES });
});

journey.post('/suggestions/run', async (req, res) => {
  const out = await runTidy();
  if (out.busy) throw new HttpError(409, 'The tidy-up is already running. Give it a minute.');
  audit(req.user.id, 'tidy.run', `${out.added} added`);
  res.json({ ...out, suggestions: openSuggestions() });
});

journey.post('/suggestions/:id/accept', (req, res) => {
  const b = req.body || {};
  res.json(decideSuggestion(Number(req.params.id), req.user, { accept: true, question: b.question, answer: b.answer, category: b.category, sensitive: b.sensitive }));
});

journey.post('/suggestions/:id/dismiss', (req, res) => {
  res.json(decideSuggestion(Number(req.params.id), req.user, { accept: false }));
});

// --- scheduled messages -----------------------------------------------------------------

const templateOut = (t) => ({
  id: t.id, propertyId: t.property_id, propertyName: propertyName(t.property_id), name: t.name, anchor: t.anchor, days: t.days, time: t.time,
  body: t.body, enabled: !!t.enabled, auto: !!t.auto,
  sent: q.get('SELECT COUNT(*) AS n FROM template_sends WHERE template_id = ?', t.id).n,
});

function templateFields(b, partial) {
  const out = {};
  if (!partial || b.name !== undefined) {
    out.name = clip(String(b.name || '').trim(), 80);
    if (!out.name) throw new HttpError(400, 'Give the message a name.');
  }
  if (!partial || b.body !== undefined) {
    out.body = String(b.body || '').trim().slice(0, 3000);
    if (!out.body) throw new HttpError(400, 'Write the message text.');
    const unknown = [...out.body.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).filter((k) => !PLACEHOLDERS.includes(k));
    if (unknown.length) throw new HttpError(400, `{${unknown[0]}} is not something that can be filled in. Use one of: ${PLACEHOLDERS.map((p) => `{${p}}`).join(', ')}.`);
  }
  if (!partial || b.anchor !== undefined) {
    if (!['arrival', 'departure'].includes(b.anchor)) throw new HttpError(400, 'Choose arrival or departure.');
    out.anchor = b.anchor;
  }
  if (!partial || b.days !== undefined) {
    const days = Number(b.days);
    if (!Number.isInteger(days) || days < -60 || days > 30) throw new HttpError(400, 'Days must be a whole number between 60 before and 30 after.');
    out.days = days;
  }
  if (!partial || b.time !== undefined) {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(b.time))) throw new HttpError(400, 'Enter the time as HH:MM, for example 10:00.');
    out.time = b.time;
  }
  if (b.propertyId !== undefined) out.property_id = propertyIdOf(b.propertyId);
  if (typeof b.enabled === 'boolean') out.enabled = b.enabled ? 1 : 0;
  if (typeof b.auto === 'boolean') out.auto = b.auto ? 1 : 0;
  return out;
}

journey.get('/templates', (req, res) => {
  seedTemplates();
  res.json({ templates: q.all('SELECT * FROM templates ORDER BY anchor, days, time, id').map(templateOut), placeholders: PLACEHOLDERS });
});

journey.post('/templates', requireAdmin, (req, res) => {
  const f = templateFields(req.body || {}, false);
  const id = q.insert('INSERT INTO templates(property_id, name, anchor, days, time, body, enabled, auto) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    f.property_id ?? null, f.name, f.anchor, f.days, f.time, f.body, f.enabled ?? 0, f.auto ?? 0);
  audit(req.user.id, 'template.create', f.name);
  res.status(201).json({ template: templateOut(q.get('SELECT * FROM templates WHERE id = ?', id)) });
});

journey.patch('/templates/:id', requireAdmin, (req, res) => {
  const t = q.get('SELECT * FROM templates WHERE id = ?', Number(req.params.id));
  if (!t) throw new HttpError(404, 'That message no longer exists.');
  const f = templateFields(req.body || {}, true);
  for (const [k, v] of Object.entries(f)) q.run(`UPDATE templates SET ${k} = ? WHERE id = ?`, v, t.id); // keys come from templateFields only
  audit(req.user.id, 'template.update', `${t.name}${'enabled' in f ? ` ${f.enabled ? 'on' : 'off'}` : ''}${'auto' in f ? ` auto ${f.auto ? 'on' : 'off'}` : ''}`);
  res.json({ template: templateOut(q.get('SELECT * FROM templates WHERE id = ?', t.id)) });
});

journey.delete('/templates/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  q.run('DELETE FROM template_sends WHERE template_id = ?', id);
  q.run('DELETE FROM templates WHERE id = ?', id);
  audit(req.user.id, 'template.delete', `template ${id}`);
  res.json({ ok: true });
});

// --- paid extras ------------------------------------------------------------------------

const OFFER_TYPES = ['early_checkin', 'late_checkout', 'extra_night'];
const offerOut = (o) => ({ id: o.id, propertyId: o.property_id, propertyName: propertyName(o.property_id), type: o.type, price: o.price, details: o.details, enabled: !!o.enabled });

journey.get('/offers', (req, res) => {
  // What ChargeAutomation has told us is on sale, and the last amount paid, per property.
  const seen = q.all('SELECT u.*, p.name, p.display_name FROM ca_upsells u JOIN properties p ON p.id = u.property_id ORDER BY u.seen_at DESC LIMIT 200')
    .map((u) => ({ propertyId: u.property_id, propertyName: u.display_name || u.name, title: u.title, type: upsellType(u.title), amount: u.amount, currency: u.currency, qty: u.qty, at: iso(u.seen_at) }));
  res.json({ offers: q.all('SELECT * FROM offers ORDER BY property_id IS NOT NULL, property_id, id').map(offerOut), types: OFFER_TYPES, seen, lastWebhook: parseJson(getRaw('ca_webhook_last'), null) });
});

/** Set one extra for every property (propertyId null) or for one property, which then overrides. */
journey.put('/offers', requireAdmin, (req, res) => {
  const b = req.body || {};
  if (!OFFER_TYPES.includes(b.type)) throw new HttpError(400, 'Unknown extra.');
  const propertyId = propertyIdOf(b.propertyId);
  const price = clip(String(b.price || '').trim(), 60);
  const details = clip(String(b.details || '').trim(), 300);
  const enabled = b.enabled === false ? 0 : 1;
  const existing = q.get('SELECT id FROM offers WHERE type = ? AND property_id IS ?', b.type, propertyId);
  if (existing) q.run('UPDATE offers SET price = ?, details = ?, enabled = ? WHERE id = ?', price, details, enabled, existing.id);
  else q.run('INSERT INTO offers(property_id, type, price, details, enabled) VALUES(?, ?, ?, ?, ?)', propertyId, b.type, price, details, enabled);
  audit(req.user.id, 'offer.set', `${b.type} ${propertyId ?? 'all'} ${enabled ? price : 'off'}`);
  res.json({ offers: q.all('SELECT * FROM offers ORDER BY property_id IS NOT NULL, property_id, id').map(offerOut) });
});

journey.delete('/offers/:id', requireAdmin, (req, res) => {
  q.run('DELETE FROM offers WHERE id = ?', Number(req.params.id));
  audit(req.user.id, 'offer.delete', `offer ${req.params.id}`);
  res.json({ offers: q.all('SELECT * FROM offers ORDER BY property_id IS NOT NULL, property_id, id').map(offerOut) });
});

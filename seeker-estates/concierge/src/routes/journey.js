// Team API for the weekly tidy-up, scheduled messages and paid extras. Mounted inside the
// team router, after sign-in is checked.
import express from 'express';
import { q, getRaw, audit, parseJson } from '../db.js';
import { requireAdmin } from '../auth.js';
import { CATEGORIES } from '../llm.js';
import { channelConversation, decideSuggestion, PLACEHOLDERS, runTidy, seedTemplates } from '../journey.js';
import { careOut, openCare, stayCare } from '../care.js';
import { emitAdmin } from '../notify.js';
import { clip, HttpError } from '../util.js';
import { checkStillNeeded, sendMessage, toGuestLanguage, upsellType } from '../bot.js';
import { draftReviews, refreshTasks, todoCount, TASK_TYPES } from '../tasks.js';
import { iso } from './shared.js';

export const journey = express.Router();
const propertyName = (id) => {
  const p = id && q.get('SELECT name, display_name FROM properties WHERE id = ?', id);
  return p ? p.name || p.display_name : null; // the Smoobu name: this is for the team
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

// --- to-do list --------------------------------------------------------------------------

export function taskOut(t) {
  const r = q.get('SELECT * FROM reservations WHERE id = ?', t.reservation_id);
  const c = q.get('SELECT id FROM conversations WHERE reservation_id = ? ORDER BY channel = \'smoobu\' DESC, id DESC LIMIT 1', t.reservation_id);
  return {
    id: t.id, type: t.type, label: TASK_TYPES[t.type]?.label || t.type, kind: t.type === 'happy' ? 'happy' : t.type === 'review' ? 'review' : 'upsell',
    reservationId: t.reservation_id, guestName: r?.guest_name || 'Guest', propertyName: propertyName(r?.property_id), arrival: r?.arrival, departure: r?.departure,
    channel: r?.channel || null, text: t.body, at: t.send_at, why: t.why, status: t.status, note: t.note || null, conversationId: c?.id ?? null,
  };
}

/** Everything waiting for a person. An item leaves the list by itself once it is dealt with. */
journey.get('/todo', (req, res) => {
  refreshTasks();
  stayCare();
  draftReviews().catch((e) => console.error(`Review drafts: ${e.message}`)); // written in the background; the list refreshes when they are ready
  const tasks = q.all("SELECT t.* FROM tasks t JOIN reservations r ON r.id = t.reservation_id WHERE t.status = 'suggested' AND r.cancelled = 0 ORDER BY t.send_at").map(taskOut);
  const scheduled = q.all("SELECT * FROM tasks WHERE status = 'scheduled' ORDER BY send_at").map(taskOut);
  const followUps = q.all("SELECT f.*, c.guest_name, c.property_id, c.mood FROM followups f JOIN conversations c ON c.id = f.conversation_id WHERE f.status = 'suggested' ORDER BY f.send_at")
    .map((f) => ({ conversationId: f.conversation_id, guestName: f.guest_name || 'Unverified guest', propertyName: propertyName(f.property_id), text: f.body, at: f.send_at, note: f.note || null }));
  const unhappy = q.all("SELECT id, guest_name, property_id, summary FROM conversations WHERE mood = 'unhappy' AND archived = 0 AND last_message_at > datetime('now', '-14 days') AND id NOT IN (SELECT conversation_id FROM followups WHERE status IN ('suggested', 'scheduled')) ORDER BY last_message_at DESC LIMIT 20")
    .map((c) => ({ conversationId: c.id, guestName: c.guest_name || 'Unverified guest', propertyName: propertyName(c.property_id), summary: c.summary || '' }));
  const tickets = q.all("SELECT * FROM tickets WHERE status = 'open' ORDER BY CASE type WHEN 'urgent' THEN 0 WHEN 'maintenance' THEN 1 ELSE 2 END, id LIMIT 50")
    .map((t) => ({ id: t.id, type: t.type, summary: t.summary, propertyName: propertyName(t.property_id), conversationId: t.conversation_id, at: iso(t.created_at) }));
  const approvals = q.get("SELECT COUNT(*) AS n FROM messages WHERE status = 'pending'").n;
  const unread = q.get('SELECT COUNT(*) AS n FROM conversations WHERE needs_reply = 1 AND archived = 0').n;
  const tidy = q.get("SELECT COUNT(*) AS n FROM suggestions WHERE status = 'open'").n;
  res.json({ tasks, scheduled, followUps, unhappy, tickets, approvals, unread, tidy, care: openCare(), badge: todoCount(),
    count: tasks.length + followUps.length + unhappy.length + tickets.length + approvals + (tidy ? 1 : 0) });
});

// --- guest care: gifts, favours and notes the assistant suggests ---------------------------

const careOr409 = (id) => {
  const a = q.get("SELECT * FROM care WHERE id = ? AND status = 'suggested'", Number(id));
  if (!a) throw new HttpError(409, 'This suggestion is no longer on the list.');
  return a;
};
const settleCare = (a, status, user) => {
  q.run("UPDATE care SET status = ?, done_by = ?, done_at = datetime('now') WHERE id = ?", status, user.id, a.id);
  audit(user.id, `care.${status}`, `${a.kind}: ${clip(a.title, 80)}`);
  emitAdmin('todo');
};

journey.post('/care/:id/done', (req, res) => {
  settleCare(careOr409(req.params.id), 'done', req.user);
  res.json({ ok: true });
});

/** Not for this guest. It is remembered, so the assistant does not propose it again. */
journey.delete('/care/:id', (req, res) => {
  settleCare(careOr409(req.params.id), 'dismissed', req.user);
  res.json({ ok: true });
});

/** Send the suggested note, as edited, in the guest's language. */
journey.post('/care/:id/send', async (req, res) => {
  const a = careOr409(req.params.id);
  const text = String(req.body?.text || '').trim().slice(0, 2000);
  if (!text) throw new HttpError(400, 'Write the message to send.');
  const r = a.reservation_id ? q.get('SELECT * FROM reservations WHERE id = ? AND cancelled = 0', a.reservation_id) : null;
  const conversation = (a.conversation_id && q.get('SELECT * FROM conversations WHERE id = ?', a.conversation_id)) || (r && channelConversation(r));
  if (!conversation) throw new HttpError(409, 'There is no conversation with this guest to send it in.');
  const body = req.body?.translate === false ? text : await toGuestLanguage(conversation, text);
  await sendMessage(conversation, 'team', body, { createdBy: req.user.id, meta: { care: a.kind, ...(body !== text ? { english: text } : {}) } });
  q.run('UPDATE care SET body = ? WHERE id = ?', text, a.id);
  settleCare(a, 'done', req.user);
  res.json({ ok: true });
});

journey.post('/tasks/:id/schedule', async (req, res) => {
  const t = q.get("SELECT * FROM tasks WHERE id = ? AND status IN ('suggested', 'scheduled')", Number(req.params.id));
  if (!t) throw new HttpError(409, 'This is no longer on the list.');
  if (t.type === 'review') throw new HttpError(400, 'A review is posted on the booking site, not sent as a message.');
  const text = String(req.body?.text || '').trim().slice(0, 2000);
  const at = Date.parse(req.body?.at);
  if (!text) throw new HttpError(400, 'Write the message to send.');
  if (!Number.isFinite(at) || at < Date.now() - 60_000) throw new HttpError(400, 'Choose a time in the future.');
  if (at > Date.now() + 30 * 86400_000) throw new HttpError(400, 'Choose a time within the next month.');
  // First time: the assistant reads the conversation and says so if this looks like the wrong moment.
  // It warns once. Scheduling again after reading the warning is the person's decision and goes ahead.
  if (!t.note) {
    const conversation = q.get('SELECT * FROM conversations WHERE reservation_id = ? ORDER BY last_message_at DESC LIMIT 1', t.reservation_id);
    const v = conversation ? await checkStillNeeded(conversation, text) : { verdict: 'send' };
    if (v.verdict !== 'send') {
      q.run('UPDATE tasks SET body = ?, send_at = ?, note = ? WHERE id = ?', text, new Date(at).toISOString(), `The assistant advises against sending this now: ${v.reason || 'the conversation touches this topic.'} Press Schedule again to send it anyway.`, t.id);
      throw new HttpError(409, `Not scheduled yet. ${v.reason || 'The conversation touches this topic.'} Press Schedule again to send it anyway.`);
    }
  }
  q.run("UPDATE tasks SET body = ?, send_at = ?, status = 'scheduled', note = '', created_by = ?, scheduled_at = strftime('%Y-%m-%d %H:%M:%f', 'now') WHERE id = ?", text, new Date(at).toISOString(), req.user.id, t.id);
  audit(req.user.id, 'task.schedule', `${t.type} booking ${t.reservation_id}`);
  res.json({ task: taskOut(q.get('SELECT * FROM tasks WHERE id = ?', t.id)) });
});

/** A review was posted on the booking site (or another task was done by hand): off the list, and not proposed again. */
journey.post('/tasks/:id/done', (req, res) => {
  const t = q.get("SELECT * FROM tasks WHERE id = ? AND status = 'suggested'", Number(req.params.id));
  if (!t) throw new HttpError(409, 'This is no longer on the list.');
  const text = String(req.body?.text ?? t.body).trim().slice(0, 2000);
  q.run("UPDATE tasks SET status = 'done', body = ?, note = '', created_by = ? WHERE id = ?", text || t.body, req.user.id, t.id);
  audit(req.user.id, 'task.done', `${t.type} booking ${t.reservation_id}`);
  res.json({ ok: true });
});

/** Dismiss a proposal, or cancel a scheduled one. It is not proposed again for this booking. */
journey.delete('/tasks/:id', (req, res) => {
  q.run("UPDATE tasks SET status = 'dismissed', note = '' WHERE id = ? AND status IN ('suggested', 'scheduled')", Number(req.params.id));
  audit(req.user.id, 'task.dismiss', `task ${req.params.id}`);
  res.json({ ok: true });
});

// --- paid extras ------------------------------------------------------------------------

const OFFER_TYPES = ['early_checkin', 'late_checkout', 'extra_night'];
const offerOut = (o) => ({ id: o.id, propertyId: o.property_id, propertyName: propertyName(o.property_id), type: o.type, price: o.price, details: o.details, enabled: !!o.enabled });

journey.get('/offers', (req, res) => {
  // What ChargeAutomation has told us is on sale, and the last amount paid, per property.
  const seen = q.all('SELECT u.*, p.name, p.display_name FROM ca_upsells u JOIN properties p ON p.id = u.property_id ORDER BY u.seen_at DESC LIMIT 200')
    .map((u) => ({ propertyId: u.property_id, propertyName: u.name || u.display_name, title: u.title, type: upsellType(u.title), amount: u.amount, currency: u.currency, qty: u.qty, at: iso(u.seen_at) }));
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

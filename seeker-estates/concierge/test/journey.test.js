import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q, addDays } from './helpers.js';
import { useSmoobuClient } from '../src/smoobu.js';
import { runScheduled, dueAt, fillTemplate, weeklyTidy } from '../src/journey.js';
import { offersFor } from '../src/bot.js';
import { upsertReservation } from '../src/sync.js';

let srv, ctx, team;
const outbox = [];
const fake = { sendMessageToGuest: async (id, body) => { outbox.push({ id, body }); return {}; } };
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 2 }); team = await signIn(srv.base); useSmoobuClient(fake); });
after(() => { useSmoobuClient(null); return srv.close(); });

test('weekly tidy-up proposes entries from approved replies; accepting saves, dismissing is remembered', async () => {
  // Two approved replies: one on something the knowledge base lacks, one correcting an entry.
  q.run("INSERT INTO examples(property_id, question, answer, private, edited) VALUES(?, 'Where are the spare towels', 'Spare towels are in the hallway cupboard, top shelf.', 0, 0)", ctx.propertyId);
  q.run("INSERT INTO examples(property_id, question, answer, private, edited) VALUES(?, 'How to use the washing machine', 'Turn the dial to Cotton 30 and press Start. See [CHECKIN_LINK].', 1, 1)", ctx.propertyId);
  assert.equal((await client(srv.base)('GET', '/api/admin/suggestions')).status, 401);
  const run = await team('POST', '/api/admin/suggestions/run', {});
  assert.equal(run.json.added, 2);
  const add = run.json.suggestions.find((s) => s.kind === 'add');
  const update = run.json.suggestions.find((s) => s.kind === 'update');
  assert.match(add.question, /towels/);
  assert.equal(add.sensitive, false); // approved for an unverified visitor
  assert.match(update.current.answer, /Cotton 40/);
  assert.equal(update.sensitive, true); // came from a verified guest's reply
  assert.ok(!update.answer.includes('[CHECKIN_LINK]'));
  // Nothing is in the knowledge base until a person accepts.
  assert.ok(!q.get("SELECT 1 FROM knowledge WHERE answer LIKE '%towels%'"));
  // Running again does not repeat what is already waiting.
  assert.equal((await team('POST', '/api/admin/suggestions/run', {})).json.added, 0);

  const ok = await team('POST', `/api/admin/suggestions/${add.id}/accept`, { answer: 'Spare towels: hallway cupboard, top shelf.' });
  const saved = q.get('SELECT * FROM knowledge WHERE id = ?', ok.json.knowledgeId);
  assert.equal(saved.answer, 'Spare towels: hallway cupboard, top shelf.');
  assert.equal(saved.property_id, ctx.propertyId);
  assert.equal(saved.sensitive, 0);
  assert.equal((await team('POST', `/api/admin/suggestions/${add.id}/accept`, {})).status, 409);

  await team('POST', `/api/admin/suggestions/${update.id}/dismiss`, {});
  assert.match(q.get("SELECT answer FROM knowledge WHERE question = 'How to use the washing machine'").answer, /Cotton 40/); // untouched
  // The same reply approved again later does not bring the dismissed proposal back.
  q.run("UPDATE examples SET created_at = datetime('now', '+1 minute')");
  q.run("UPDATE settings SET value = '2000-01-01 00:00:00' WHERE key = 'tidy_last_run'");
  assert.equal((await team('POST', '/api/admin/suggestions/run', {})).json.added, 0);
  assert.equal((await team('GET', '/api/admin/suggestions')).json.suggestions.length, 0);
});

test('the weekly run happens once, on Monday morning UK time', async () => {
  assert.equal(await weeklyTidy(new Date('2026-11-17T10:00:00Z')), null); // a Tuesday
  assert.equal(await weeklyTidy(new Date('2026-11-16T06:00:00Z')), null); // Monday, too early
  assert.ok(await weeklyTidy(new Date('2026-11-16T09:00:00Z')));
  assert.equal(await weeklyTidy(new Date('2026-11-16T15:00:00Z')), null); // already done this week
});

test('scheduled messages: off by default, queued for approval, sent once, filled in per booking', async () => {
  const list = (await team('GET', '/api/admin/templates')).json;
  assert.equal(list.templates.length, 3);
  assert.ok(list.templates.every((t) => !t.enabled && !t.auto));
  assert.deepEqual(await runScheduled(), { sent: 0, queued: 0 }); // nothing is switched on

  const bad = await team('POST', '/api/admin/templates', { name: 'x', anchor: 'arrival', days: -2, time: '09:00', body: 'Hi {surname}' });
  assert.equal(bad.status, 400);
  const made = await team('POST', '/api/admin/templates', { name: 'Two days before', anchor: 'arrival', days: -2, time: '09:00', body: 'Hello {first_name}, see you at {property} on {arrival} from {check_in}.', enabled: true });
  assert.equal(made.status, 201);
  const t = made.json.template;
  const r = q.get('SELECT * FROM reservations WHERE id = 501');
  const due = dueAt(q.get('SELECT * FROM templates WHERE id = ?', t.id), r);

  assert.deepEqual(await runScheduled(due - 60_000), { sent: 0, queued: 0 }); // not yet
  assert.deepEqual(await runScheduled(due + 60_000), { sent: 0, queued: 1 });
  assert.deepEqual(await runScheduled(due + 120_000), { sent: 0, queued: 0 }); // never twice
  assert.equal(outbox.length, 0); // waiting for a person
  const card = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.draft.kind === 'scheduled');
  assert.match(card.draft.text, /^Hello Zoë, see you at Test Flat on \w+ \d+ \w+ from 15:00\.$/);
  await team('POST', `/api/admin/messages/${card.draft.id}/approve`, {});
  assert.equal(outbox.length, 1);
  assert.equal(outbox[0].id, 501);
  // A scheduled message is not a learned reply.
  assert.ok(!q.get("SELECT 1 FROM examples WHERE answer LIKE 'Hello Zo%'"));

  // Automatic sending, a cancelled booking, and the 12-hour limit.
  q.run('DELETE FROM template_sends');
  await team('PATCH', `/api/admin/templates/${t.id}`, { auto: true });
  assert.deepEqual(await runScheduled(due + 13 * 3600_000), { sent: 0, queued: 0 }); // too late: skipped, not sent at a silly hour
  q.run('UPDATE reservations SET cancelled = 1 WHERE id = 501');
  assert.deepEqual(await runScheduled(due + 60_000), { sent: 0, queued: 0 });
  q.run('UPDATE reservations SET cancelled = 0 WHERE id = 501');
  assert.deepEqual(await runScheduled(due + 60_000), { sent: 1, queued: 0 });
  assert.equal(outbox.length, 2);

  // A message that needs the check-in link waits until the booking has one.
  assert.equal(fillTemplate('Your page: {checkin_link}', r, { name: 'Test Flat' }), null);
  assert.equal(fillTemplate('Your page: {checkin_link}', { ...r, checkin_link: 'https://x.test/a' }, { name: 'Test Flat' }), 'Your page: https://x.test/a');

  // Agents cannot change what is sent to every guest.
  const { createUser } = await import('../src/auth.js');
  createUser({ email: 'agent@example.com', name: 'Agent', password: 'correct horse battery', role: 'agent' });
  const agent = client(srv.base);
  await agent('POST', '/api/admin/login', { email: 'agent@example.com', password: 'correct horse battery' });
  assert.equal((await agent('PATCH', `/api/admin/templates/${t.id}`, { enabled: false })).status, 403);
  assert.equal((await agent('PUT', '/api/admin/offers', { type: 'late_checkout', price: '£1' })).status, 403);
  await team('DELETE', `/api/admin/templates/${t.id}`, {});
});

test('a guest writing in does not replace a scheduled message waiting for approval', async () => {
  const made = (await team('POST', '/api/admin/templates', { name: 'Day before', anchor: 'arrival', days: -1, time: '09:00', body: 'See you tomorrow, {first_name}.', enabled: true })).json.template;
  const r = q.get('SELECT * FROM reservations WHERE id = 501');
  await runScheduled(dueAt(q.get('SELECT * FROM templates WHERE id = ?', made.id), r) + 1000);
  const c = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = 501");
  const { handleGuestMessage } = await import('../src/bot.js');
  q.run("INSERT INTO messages(conversation_id, role, body, sent_at) VALUES(?, 'guest', 'How do I use the washing machine?', datetime('now'))", c.id);
  await handleGuestMessage(c.id);
  const pending = q.all("SELECT kind, body FROM messages WHERE conversation_id = ? AND status = 'pending' ORDER BY id", c.id);
  assert.deepEqual(pending.map((m) => m.kind), ['scheduled', 'answer']);
  assert.equal(pending[0].body, 'See you tomorrow, Zoë.');
  await team('DELETE', `/api/admin/templates/${made.id}`, {});
});

test('paid extras: only offered when switched on, priced by the team, and checked against the calendar', async () => {
  const r = () => q.get('SELECT * FROM reservations WHERE id = 501');
  assert.equal(offersFor(r()), undefined);
  await team('PUT', '/api/admin/offers', { type: 'early_checkin', price: '£30', details: 'from 13:00' });
  await team('PUT', '/api/admin/offers', { type: 'late_checkout', price: '£30', details: 'until 13:00' });
  assert.deepEqual(offersFor(r()).map((o) => [o.extra, o.price, o.calendar]), [['Early check-in', '£30', 'possible'], ['Late checkout', '£30', 'possible']]);

  // Another guest leaves on our arrival day: no early check-in. An owner block starts on our departure day: no late checkout.
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure) VALUES(502, ?, 'A', 'B', 'A B', ?, ?)", ctx.propertyId, addDays(ctx.arrival, -3), ctx.arrival);
  q.run('UPDATE properties SET smoobu_id = 77 WHERE id = ?', ctx.propertyId);
  upsertReservation({ id: 900, apartment: { id: 77 }, arrival: r().departure, departure: addDays(r().departure, 2), 'is-blocked-booking': true });
  assert.ok(!q.get('SELECT 1 FROM reservations WHERE id = 900')); // a block is not a guest
  assert.deepEqual(offersFor(r()).map((o) => o.calendar), ['not possible for these dates', 'not possible for these dates']);
  q.run('DELETE FROM reservations WHERE id = 502');

  // The property's own setting overrides the one for every property.
  await team('PUT', '/api/admin/offers', { type: 'early_checkin', price: '£45', details: 'from 12:00', propertyId: ctx.propertyId });
  assert.equal(offersFor(r())[0].price, '£45');
  const off = await team('PUT', '/api/admin/offers', { type: 'early_checkin', enabled: false, propertyId: ctx.propertyId });
  assert.ok(!offersFor(r()).some((o) => o.extra === 'Early check-in'));
  await team('DELETE', `/api/admin/offers/${off.json.offers.find((o) => o.propertyId === ctx.propertyId).id}`, {});

  // In the chat: a verified guest is told the price; an unverified visitor is not offered anything.
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const me = await say(guest, 'Can we have an early check in?');
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === me.conversation.id).draft;
  assert.match(draft.text, /Early check-in is available for your stay at £30 \(from 13:00\)/);
  assert.equal(draft.category, 'booking');
  const stranger = await openChat(srv.base);
  const them = await say(stranger, 'Can we have a late checkout?');
  assert.ok(!JSON.stringify((await team('GET', '/api/admin/inbox')).json).includes('Late checkout is available') || them.conversation.id === me.conversation.id);
  // Linked to ChargeAutomation: with no price typed, the price comes from what its check-in page last charged,
  // and the guest is sent to their own check-in page to add it. Other extras sold there are offered too.
  const { recordExtra } = await import('../src/routes/webhooks.js');
  await team('PUT', '/api/admin/offers', { type: 'late_checkout', price: '', details: 'until 13:00' });
  q.run("UPDATE reservations SET checkin_link = 'https://app.chargeautomation.com/securelink/abc' WHERE id = 501");
  q.run('DELETE FROM blocks');
  let late = offersFor(r()).find((o) => o.extra === 'Late checkout');
  assert.equal(late.price, undefined);
  assert.equal(late.last_price_on_checkin_page, undefined); // nothing seen yet: the bot must not invent one
  assert.equal(late.how_to_get_it, 'guest adds and pays for it on their online check-in page');
  const sale = (title, amount, extra = {}) => recordExtra({ event: 'booking.upsell.purchased', data: { pms_booking_id: '1079-501', title, charge_ref_no: title, currency_symbol: '£', order_details: { amount, qty: 1, ...extra } } });
  assert.ok(sale('Late Check-out', 35));
  assert.ok(sale('Parking space', 20));
  assert.ok(sale('Breakfast', 60, { persons: 3 })); // a total for three people is not a unit price
  const offers = offersFor(r());
  assert.equal(offers.find((o) => o.extra === 'Late checkout').last_price_on_checkin_page, '£35');
  assert.equal(offers.find((o) => o.extra === 'Parking space').last_price_on_checkin_page, '£20');
  assert.equal(offers.find((o) => o.extra === 'Breakfast').last_price_on_checkin_page, undefined);
  const seen = (await team('GET', '/api/admin/offers')).json.seen;
  assert.deepEqual(seen.map((s) => s.title).sort(), ['Breakfast', 'Late Check-out', 'Parking space']);
  assert.equal(seen.find((s) => s.title === 'Late Check-out').type, 'late_checkout');
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {}); // the first question is dealt with
  const again = await say(guest, 'Is a late checkout possible?');
  const d2 = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === again.conversation.id).draft;
  assert.match(d2.text, /Late checkout is available for your stay, currently £35 \(until 13:00\)\. You can add and pay for it on your online check-in page/);
  assert.match(d2.text, /securelink\/abc/);

  // Once the stay is over, nothing is offered.
  assert.equal(offersFor({ ...r(), arrival: addDays(ctx.today, -9), departure: addDays(ctx.today, -5) }), undefined);
});

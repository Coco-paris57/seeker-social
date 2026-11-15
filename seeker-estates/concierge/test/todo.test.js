import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, q, addDays } from './helpers.js';
import { useSmoobuClient } from '../src/smoobu.js';
import { refreshTasks, runTasks } from '../src/tasks.js';
import { recordExtra } from '../src/routes/webhooks.js';

let srv, ctx, team;
const outbox = [];
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 4 }); team = await signIn(srv.base); useSmoobuClient({ sendMessageToGuest: async (id, body) => { outbox.push({ id, body }); return {}; } }); });
after(() => { useSmoobuClient(null); return srv.close(); });
const todo = async () => (await team('GET', '/api/admin/todo')).json;

test('upsell messages are proposed only for extras that are on and free in the calendar, each with a time and a reason', async () => {
  assert.equal((await client(srv.base)('GET', '/api/admin/todo')).status, 401);
  assert.equal((await todo()).tasks.length, 0); // no extras switched on: nothing to sell
  await team('PUT', '/api/admin/offers', { type: 'early_checkin', price: '£30', details: 'from 13:00' });
  await team('PUT', '/api/admin/offers', { type: 'late_checkout', price: '', details: '' });
  let d = await todo();
  assert.deepEqual(d.tasks.map((t) => t.type).sort(), ['upsell_early', 'upsell_late']);
  const early = d.tasks.find((t) => t.type === 'upsell_early');
  assert.equal(early.label, 'Offer early check-in');
  assert.match(early.text, /^Hello Zoë,[\s\S]*early check-in is available for your stay at £30 \(from 13:00\)\. Just reply to this message/);
  assert.match(early.why, /Two days before arrival/);
  // Two days before arrival at 10:00 UK time.
  assert.equal(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date(early.at)), addDays(ctx.arrival, -2));
  assert.equal(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }).format(new Date(early.at)), '10:00');
  assert.equal(d.count, 2);
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.todo, 2);

  // Someone else checks out on the arrival day: early check-in can no longer be honoured, so it leaves the list.
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure) VALUES(502, ?, 'A', 'B', 'A B', ?, ?)", ctx.propertyId, addDays(ctx.arrival, -9), ctx.arrival);
  d = await todo();
  assert.ok(!d.tasks.some((t) => t.reservationId === 501 && t.type === 'upsell_early'));
  q.run('DELETE FROM reservations WHERE id = 502');
  // The guest buys late checkout themselves: no need to offer it.
  recordExtra({ event: 'booking.upsell.purchased', data: { pms_booking_id: '1-501', title: 'Late Check-out', charge_ref_no: 'x', order_details: { amount: 30 } } });
  d = await todo();
  assert.deepEqual(d.tasks.map((t) => t.type), ['upsell_early']);
});

test('a task leaves the list when scheduled, is sent at its time through the booking channel, and a dismissed one does not come back', async () => {
  let d = await todo();
  const early = d.tasks[0];
  assert.equal(await runTasks(Date.now() + 30 * 86400_000), 0); // a proposal alone is never sent
  assert.equal((await team('POST', `/api/admin/tasks/${early.id}/schedule`, { text: early.text, at: 'yesterday' })).status, 400);
  const at = new Date(Date.now() + 3600_000).toISOString();
  await team('POST', `/api/admin/tasks/${early.id}/schedule`, { text: `${early.text}\n\nSee you soon.`, at });
  d = await todo();
  assert.equal(d.tasks.length, 0); // done: no longer a to-do
  assert.equal(d.scheduled.length, 1);
  assert.equal(await runTasks(), 0);
  assert.equal(await runTasks(Date.parse(at) + 1000), 1);
  assert.equal(await runTasks(Date.parse(at) + 2000), 0);
  assert.equal(outbox.length, 1);
  assert.equal(outbox[0].id, 501);
  assert.match(outbox[0].body, /See you soon\.$/);
  d = await todo();
  assert.equal(d.tasks.length + d.scheduled.length, 0); // sent, and not proposed again

  await team('PUT', '/api/admin/offers', { type: 'extra_night', price: '£120' });
  const night = (await todo()).tasks.find((t) => t.type === 'upsell_night');
  await team('DELETE', `/api/admin/tasks/${night.id}`, {});
  refreshTasks();
  assert.ok(!(await todo()).tasks.some((t) => t.type === 'upsell_night'));
});

test('no offer goes to an unhappy guest; a happy guest gets a thank-you proposed after checkout; an offer that stops being possible is not sent', async () => {
  q.run('DELETE FROM tasks');
  q.run("UPDATE reservations SET extras = '[]' WHERE id = 501");
  const cid = q.insert("INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified, mood) VALUES(?, 501, 'web', 'Zoë', 1, 'unhappy')", ctx.propertyId);
  let d = await todo();
  assert.equal(d.tasks.length, 0);
  assert.ok(d.unhappy.some((u) => u.conversationId === cid)); // but the unhappy guest is on the list
  q.run("UPDATE conversations SET mood = 'positive' WHERE id = ?", cid);
  q.run('UPDATE reservations SET arrival = ?, departure = ? WHERE id = 501', addDays(ctx.today, -3), ctx.today);
  d = await todo();
  const happy = d.tasks.find((t) => t.type === 'happy');
  assert.equal(happy.kind, 'happy');
  assert.match(happy.text, /Thank you for staying at Test Flat/);

  // Scheduled late checkout, then another booking takes the departure day: held back, with the reason in the chat.
  q.run('UPDATE reservations SET arrival = ?, departure = ? WHERE id = 501', ctx.today, addDays(ctx.today, 3));
  q.run("UPDATE conversations SET mood = 'neutral' WHERE id = ?", cid);
  const late = (await todo()).tasks.find((t) => t.type === 'upsell_late');
  const at = new Date(Date.now() + 3600_000).toISOString();
  await team('POST', `/api/admin/tasks/${late.id}/schedule`, { text: late.text, at });
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure) VALUES(503, ?, 'C', 'D', 'C D', ?, ?)", ctx.propertyId, addDays(ctx.today, 3), addDays(ctx.today, 5));
  const before = outbox.length;
  assert.equal(await runTasks(Date.parse(at) + 1000), 0);
  assert.equal(outbox.length, before);
  const held = q.get("SELECT meta FROM messages WHERE status = 'withheld' ORDER BY id DESC LIMIT 1");
  assert.match(held.meta, /No longer available/);
});

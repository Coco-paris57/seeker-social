import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q, addDays } from './helpers.js';
import { refreshTasks } from '../src/tasks.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 1 }); team = await signIn(srv.base); });
after(() => srv.close());
const res = (id, arrival, departure, name = 'Guest') => q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, channel) VALUES(?, ?, ?, 'X', ?, ?, ?, 'Airbnb')", id, ctx.propertyId, name, `${name} X`, arrival, departure);

test('the calendar shows bookings, owner blocks, short free gaps and who is arriving today', async () => {
  assert.equal((await client(srv.base)('GET', '/api/admin/calendar')).status, 401);
  // 501 stays day 1 to 4. Then two free nights, then 601 from day 6 to 9; an owner block from day 9; someone arriving today.
  res(601, addDays(ctx.today, 6), addDays(ctx.today, 9), 'Later');
  res(602, addDays(ctx.today, -2), addDays(ctx.today, 1), 'Leaving'); // leaves the day 501 arrives: a same-day turnover
  q.run('INSERT INTO blocks(id, property_id, arrival, departure) VALUES(900, ?, ?, ?)', ctx.propertyId, addDays(ctx.today, 9), addDays(ctx.today, 12));
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, cancelled) VALUES(603, ?, 'Gone', 'X', 'Gone X', ?, ?, 1)", ctx.propertyId, addDays(ctx.today, 4), addDays(ctx.today, 6));
  const d = (await team('GET', '/api/admin/calendar?days=14')).json;
  assert.equal(d.from, ctx.today);
  assert.equal(d.properties.length, 1);
  assert.deepEqual(d.reservations.map((r) => r.id).sort(), [501, 601, 602]); // the cancelled booking is not shown
  const b = d.reservations.find((r) => r.id === 501);
  assert.equal(b.nights, 3);
  assert.equal(b.guestName, "Zoë O'Brien-Müller");
  assert.deepEqual(d.blocks.map((x) => [x.arrival, x.departure]), [[addDays(ctx.today, 9), addDays(ctx.today, 12)]]);
  assert.deepEqual(d.gaps, [{ propertyId: ctx.propertyId, from: addDays(ctx.today, 4), to: addDays(ctx.today, 6), nights: 2, beforeId: 501, afterId: 601 }]);
  assert.deepEqual(d.todayPanel.inHouse.map((r) => r.id), [602]);
  assert.deepEqual(d.todayPanel.arrivals, []);
  // Another window.
  const later = (await team('GET', `/api/admin/calendar?from=${addDays(ctx.today, 20)}&days=14`)).json;
  assert.equal(later.reservations.length, 0);
});

test('bars carry mood, check-in form, unread and extras; the guest card has the thread, offers and suggested messages', async () => {
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  await say(guest, 'This is unacceptable, I am very disappointed');
  q.run("UPDATE reservations SET checkin_done = 1, checkin_link = 'https://x.test/l', extras = ? WHERE id = 501", JSON.stringify([{ title: 'Parking', status: 'purchased' }]));
  await team('PUT', '/api/admin/offers', { type: 'late_checkout', price: '£30', details: 'until 13:00' });
  const bar = (await team('GET', '/api/admin/calendar')).json.reservations.find((r) => r.id === 501);
  assert.equal(bar.mood, 'unhappy');
  assert.equal(bar.checkinCompleted, true);
  assert.equal(bar.unread, true);
  assert.deepEqual(bar.extras, [{ title: 'Parking', status: 'purchased' }]);
  assert.deepEqual(bar.tasks, []); // nothing is sold to an unhappy guest

  q.run("UPDATE conversations SET mood = 'neutral' WHERE reservation_id = 501");
  const card = (await team('GET', '/api/admin/reservations/501')).json;
  q.run("UPDATE properties SET name = 'P01 Camden 2-bed (Smoobu name)', display_name = 'Camden apartment' WHERE id = ?", ctx.propertyId);
  assert.equal((await team('GET', '/api/admin/reservations/501')).json.reservation.propertyName, 'P01 Camden 2-bed (Smoobu name)');
  assert.equal((await team('GET', '/api/admin/calendar')).json.properties[0].name, 'P01 Camden 2-bed (Smoobu name)');
  assert.equal(card.conversation.id, bar.conversationId);
  assert.ok(card.messages.some((m) => m.role === 'guest' && /unacceptable/.test(m.text)));
  assert.ok(card.messages.every((m) => m.status === 'sent' || m.role === 'guest'));
  assert.deepEqual(card.offers.map((o) => [o.extra, o.price, o.possible]), [['Late checkout', '£30', true]]);
  const late = card.tasks.find((t) => t.type === 'upsell_late');
  // The day before checkout at 13:00, UK time.
  assert.equal(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date(late.at)), addDays(card.reservation.departure, -1));
  assert.equal(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }).format(new Date(late.at)), '13:00');
  assert.equal((await team('GET', '/api/admin/reservations/999999')).status, 404);
});

test('from a free gap, an extra night can be proposed to the guest before it and an earlier arrival to the guest after it', async () => {
  assert.equal((await team('POST', '/api/admin/reservations/501/tasks', { type: 'upsell_early' })).status, 400);
  const after501 = await team('POST', '/api/admin/reservations/501/tasks', { type: 'upsell_night' });
  assert.equal(after501.status, 201);
  // 501 can also have late checkout, so the two go out as one message.
  assert.equal(after501.json.task.type, 'upsell_departure');
  // The check-in page link is for late checkout; an extension is arranged by the team.
  assert.match(after501.json.task.text, /late checkout is available at £30 \(until 13:00\)\. You can add it on your online check-in page, where the exact price is shown: https:\/\/x\.test\/l\n\nThe apartment is also free after your checkout, so if you wish to extend your stay, just let us know\.$/);
  const before601 = await team('POST', '/api/admin/reservations/601/tasks', { type: 'upsell_before' });
  assert.match(before601.json.task.text, /free the night before your arrival/);
  assert.equal(before601.json.task.label, 'Offer arriving a night earlier');
  let list = (await team('GET', '/api/admin/todo')).json.tasks.map((t) => `${t.reservationId}:${t.type}`);
  assert.ok(list.includes('501:upsell_departure') && list.includes('601:upsell_before'));
  assert.ok(!list.includes('501:upsell_late') && !list.includes('501:upsell_night')); // not twice
  assert.ok((await team('GET', '/api/admin/calendar')).json.reservations.find((r) => r.id === 601).tasks.some((t) => t.type === 'upsell_before'));
  // The gap is filled by a new booking: both proposals disappear, and the night cannot be offered any more.
  res(604, addDays(ctx.today, 4), addDays(ctx.today, 6), 'Filler');
  refreshTasks();
  list = (await team('GET', '/api/admin/todo')).json.tasks.map((t) => `${t.reservationId}:${t.type}`);
  assert.ok(!list.includes('501:upsell_departure') && !list.includes('501:upsell_night') && !list.includes('601:upsell_before'));
  assert.equal((await team('POST', '/api/admin/reservations/601/tasks', { type: 'upsell_before' })).status, 409);
});

test('a new booking, a cancellation and a removed owner block change the calendar straight away', async () => {
  const { upsertReservation } = await import('../src/sync.js');
  const { handleSmoobuEvent } = await import('../src/routes/webhooks.js');
  q.run('UPDATE properties SET smoobu_id = 77 WHERE id = ?', ctx.propertyId);
  const ids = async () => (await team('GET', `/api/admin/calendar?from=${addDays(ctx.today, 20)}&days=14`)).json;
  const booking = { id: 800, apartment: { id: 77 }, arrival: addDays(ctx.today, 22), departure: addDays(ctx.today, 25), firstname: 'New', lastname: 'Guest', channel: { name: 'Airbnb' } };
  upsertReservation(booking); // as Smoobu's "new reservation" message does
  assert.deepEqual((await ids()).reservations.map((r) => r.id), [800]);
  upsertReservation({ ...booking, type: 'cancellation' });
  assert.deepEqual((await ids()).reservations, []);
  upsertReservation({ id: 801, apartment: { id: 77 }, arrival: addDays(ctx.today, 26), departure: addDays(ctx.today, 28), 'is-blocked-booking': true });
  assert.equal((await ids()).blocks.length, 1);
  upsertReservation({ id: 801, apartment: { id: 77 }, arrival: addDays(ctx.today, 26), departure: addDays(ctx.today, 28), 'is-blocked-booking': true, type: 'cancellation' });
  assert.equal((await ids()).blocks.length, 0);
  upsertReservation(booking);
  await handleSmoobuEvent({ action: 'deleteReservation', data: { id: 800 } });
  assert.deepEqual((await ids()).reservations, []);
});

test('the team sees Smoobu names in Smoobu order everywhere; guests still see the guest-facing name', async () => {
  const { syncProperties } = await import('../src/sync.js');
  const { useSmoobuClient } = await import('../src/smoobu.js');
  useSmoobuClient({ apartments: async () => ({ apartments: [{ id: 902, name: 'Zebra House' }, { id: 77, name: 'P01 Camden 2-bed (Smoobu name)' }, { id: 901, name: 'Apple Court' }] }), apartment: async () => ({}) });
  try {
    await syncProperties();
  } finally {
    useSmoobuClient(null);
  }
  const order = ['Zebra House', 'P01 Camden 2-bed (Smoobu name)', 'Apple Court']; // as Smoobu lists them, not alphabetical
  assert.deepEqual((await team('GET', '/api/admin/properties')).json.properties.map((p) => p.name), order);
  assert.deepEqual((await team('GET', '/api/admin/calendar')).json.properties.map((p) => p.name), order);
  assert.deepEqual((await team('GET', '/api/admin/insights')).json.properties.map((p) => p.name), ['P01 Camden 2-bed (Smoobu name)']); // only properties with activity
  const chat = (await team('GET', '/api/admin/conversations')).json.conversations[0];
  assert.equal(chat.propertyName, 'P01 Camden 2-bed (Smoobu name)');
  const guest = await openChat(srv.base);
  assert.equal((await guest('GET', '/api/guest/me')).json.conversation.property.name, 'Camden apartment');
});

test('guests see the flat address as the property name; the team can still change it afterwards', async () => {
  const { addressNames } = await import('../src/sync.js');
  q.run("UPDATE properties SET address = '12 Jamestown Road, NW1 7BY, London' WHERE id = ?", ctx.propertyId);
  assert.equal(addressNames(), 1);
  const guest = await openChat(srv.base);
  assert.equal((await guest('GET', '/api/guest/me')).json.conversation.property.name, '12 Jamestown Road, NW1 7BY, London');
  assert.match((await team('GET', `/api/admin/properties/${ctx.propertyId}/poster`)).text, /12 Jamestown Road, NW1 7BY, London/);
  // The team's own screens keep the Smoobu name.
  assert.equal((await team('GET', '/api/admin/calendar')).json.properties.find((p) => p.id === ctx.propertyId).name, 'P01 Camden 2-bed (Smoobu name)');
  // Changed by hand afterwards: it is not overwritten again.
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { displayName: 'Camden flat' });
  assert.equal(addressNames(), 0);
  assert.equal(q.get('SELECT display_name FROM properties WHERE id = ?', ctx.propertyId).display_name, 'Camden flat');
});

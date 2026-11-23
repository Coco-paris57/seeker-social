import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, client, q } from './helpers.js';
import { upsertReservation } from '../src/sync.js';
import { createUser } from '../src/auth.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); q.run('UPDATE properties SET smoobu_id = 900 WHERE id = ?', ctx.propertyId); });
after(() => srv.close());
const booking = (id, arrival, departure, price, fee, extra = {}) => ({ id, apartment: { id: 900 }, arrival, departure, firstname: 'A', lastname: 'B', channel: { name: 'Airbnb' }, price, 'commission-included': fee, ...extra });
const month = async (m) => (await team('GET', `/api/admin/finance?month=${m}`)).json;

test('finance: revenue and fees come from Smoobu prices, shared across months by night; rent and expenses are entered by hand', async () => {
  upsertReservation(booking(1, '2026-03-10', '2026-03-14', 800, 120)); // 4 nights in March
  upsertReservation(booking(2, '2026-03-30', '2026-04-03', 400, 60)); // 2 nights in March, 2 in April
  upsertReservation(booking(3, '2026-03-20', '2026-03-22', 500, 75, { type: 'cancellation' })); // not counted
  let d = await month('2026-03');
  let r = d.rows.find((x) => x.propertyId === ctx.propertyId);
  assert.deepEqual([r.bookings, r.nights, r.revenue, r.fees, r.net], [2, 6, 1000, 150, 850]);
  assert.equal(r.occupancy, 19); // 6 of 31 nights
  assert.equal(r.model, null);
  assert.equal(d.missingTerms, 1);
  assert.equal(r.profit, 850);
  assert.equal((await month('2026-04')).rows[0].revenue, 200);

  // Rented by us: profit is net revenue minus rent and expenses.
  assert.equal((await team('PUT', `/api/admin/finance/terms/${ctx.propertyId}`, { model: 'rent', rent: '500' })).status, 200);
  await team('POST', '/api/admin/finance/expenses', { propertyId: ctx.propertyId, date: '2026-03-05', amount: '80', category: 'Cleaning' });
  await team('POST', '/api/admin/finance/expenses', { propertyId: ctx.propertyId, date: '2026-02-01', amount: '30', category: 'Internet', monthly: true });
  await team('POST', '/api/admin/finance/expenses', { date: '2026-03-01', amount: '50', category: 'Software' }); // the business as a whole
  d = await month('2026-03');
  r = d.rows[0];
  assert.deepEqual([r.rent, r.expenses, r.profit], [500, 110, 240]);
  assert.deepEqual([d.totals.expenses, d.totals.general, d.totals.profit], [160, 50, 190]);
  assert.equal(d.expenses.length, 3);
  assert.equal(d.series.length, 12);
  assert.equal(d.series.at(-1).profit, 190);
  assert.equal((await month('2026-01')).rows[0].expenses, 0); // the monthly expense had not started

  // A monthly expense stopped from May keeps its earlier months.
  const internet = d.expenses.find((e) => e.monthly);
  await team('DELETE', `/api/admin/finance/expenses/${internet.id}?month=2026-05`, {});
  assert.equal((await month('2026-04')).rows[0].expenses, 30);
  assert.equal((await month('2026-05')).rows[0].expenses, 0);

  // Managed for an owner from April: our commission is a share of net revenue; the owner gets the rest, less recharged costs.
  await team('PUT', `/api/admin/finance/terms/${ctx.propertyId}`, { model: 'management', percent: '20', from: '2026-04' });
  await team('POST', '/api/admin/finance/expenses', { propertyId: ctx.propertyId, date: '2026-04-02', amount: '40', category: 'Maintenance', owner: true });
  r = (await month('2026-04')).rows[0]; // net 200 - 30 = 170
  assert.deepEqual([r.net, r.commission, r.vat, r.ownerExpenses, r.ownerPayout, r.expenses, r.profit], [170, 34, 6.8, 40, 89.2, 30, 4]); // VAT is on top of the commission, paid by the owner, not our profit
  assert.equal((await month('2026-03')).rows[0].model, 'rent'); // earlier months keep the old terms

  // The booking's price is kept after the guest's details are cleared, and a later cancellation removes it from the figures.
  q.run('DELETE FROM reservations WHERE id = 1');
  assert.equal((await month('2026-03')).rows[0].revenue, 1000);
  upsertReservation(booking(1, '2026-03-10', '2026-03-14', 800, 120, { type: 'cancellation' }));
  assert.equal((await month('2026-03')).rows[0].revenue, 200);
  assert.ok(!Object.keys(q.get('SELECT * FROM booking_money LIMIT 1')).some((k) => /name|email|phone/.test(k)));
});

test('finance is for administrators only, and bad input is refused', async () => {
  assert.equal((await client(srv.base)('GET', '/api/admin/finance')).status, 401);
  createUser({ email: 'staff@example.com', name: 'Sam Staff', password: 'correct horse battery', role: 'member' });
  const staff = client(srv.base);
  await staff('POST', '/api/admin/login', { email: 'staff@example.com', password: 'correct horse battery' });
  assert.equal((await staff('GET', '/api/admin/finance')).status, 403);
  assert.equal((await staff('POST', '/api/admin/finance/expenses', { date: '2026-03-01', amount: '5' })).status, 403);
  assert.equal((await team('POST', '/api/admin/finance/expenses', { date: '2026-03-01', amount: '-5' })).status, 400);
  assert.equal((await team('POST', '/api/admin/finance/expenses', { date: 'soon', amount: '5' })).status, 400);
  assert.equal((await team('PUT', `/api/admin/finance/terms/${ctx.propertyId}`, { model: 'management', percent: '140' })).status, 400);
  assert.equal((await team('PUT', '/api/admin/finance/terms/99999', { model: 'rent', rent: '1' })).status, 404);
});

test('two Smoobu listings of the same flat are one line: revenue added together, rent counted once', async () => {
  const second = q.insert("INSERT INTO properties(smoobu_id, name, display_name, qr_token) VALUES(901, 'Second listing', 'Second listing', 'qr-second')");
  upsertReservation(booking(40, '2026-08-03', '2026-08-07', 600, 90));
  upsertReservation({ ...booking(41, '2026-08-10', '2026-08-12', 300, 45), apartment: { id: 901 } });
  await team('PUT', `/api/admin/finance/terms/${ctx.propertyId}`, { model: 'rent', rent: '1000', from: '2026-08' });
  await team('PUT', `/api/admin/finance/terms/${second}`, { model: 'rent', rent: '1000' });
  await team('POST', '/api/admin/finance/expenses', { propertyId: second, date: '2026-08-05', amount: '50', category: 'Cleaning' });
  let d = await month('2026-08');
  assert.equal(d.rows.length, 2);
  assert.equal(d.totals.rent, 2000); // counted twice until they are combined

  assert.equal((await team('PUT', `/api/admin/finance/terms/${second}`, { model: 'same', sameAs: second })).status, 400);
  assert.equal((await team('PUT', `/api/admin/finance/terms/${second}`, { model: 'same', sameAs: ctx.propertyId })).status, 200);
  d = await month('2026-08');
  assert.equal(d.rows.length, 1);
  const r = d.rows[0];
  assert.deepEqual([r.propertyId, r.bookings, r.nights, r.revenue, r.fees, r.net, r.rent, r.expenses, r.profit], [ctx.propertyId, 2, 6, 900, 135, 765, 1000, 50, -285]);
  assert.deepEqual(r.listings.map((l) => l.name), ['Second listing']);
  assert.equal(d.totals.rent, 1000);
  assert.equal((await team('PUT', `/api/admin/finance/terms/${ctx.propertyId}`, { model: 'same', sameAs: second })).status, 400); // not in a circle

  // Separated again.
  await team('PUT', `/api/admin/finance/terms/${second}`, { model: 'none' });
  assert.equal((await month('2026-08')).rows.length, 2);
});

test('cleaning is counted per check-in: a cost on a rented flat; on a managed flat a charge plus VAT to the owner, with our commission on the full net revenue', async () => {
  const flat = q.insert("INSERT INTO properties(smoobu_id, name, display_name, qr_token) VALUES(902, 'Clean flat', 'Clean flat', 'qr-clean')");
  const b = (id, a, d, price, fee) => ({ ...booking(id, a, d, price, fee), apartment: { id: 902 } });
  upsertReservation(b(60, '2027-02-02', '2027-02-06', 600, 100));
  upsertReservation(b(61, '2027-02-10', '2027-02-12', 400, 50));
  upsertReservation(b(62, '2027-01-30', '2027-02-03', 400, 0)); // checked in in January: 2 nights in February, no check-in
  const row = async (m) => (await month(m)).rows.find((r) => r.propertyId === flat);

  await team('PUT', `/api/admin/finance/terms/${flat}`, { model: 'rent', rent: '500', cleaningCost: '60' });
  let r = await row('2027-02'); // net: 500 + 350 + 200 = 1050
  assert.deepEqual([r.net, r.cleans, r.cleaningCost, r.cleaningCharge, r.profit], [1050, 2, 120, 0, 430]);
  assert.equal((await row('2027-01')).cleans, 1);

  // Managed: commission on the full net revenue; the owner pays the cleaning charge and VAT on both.
  await team('PUT', `/api/admin/finance/terms/${flat}`, { model: 'management', percent: '20', cleaningCost: '60', cleaningCharge: '125' });
  r = await row('2027-02');
  assert.deepEqual([r.cleaningCharge, r.cleaningVat, r.cleaningCost, r.commission, r.vat, r.ownerPayout, r.profit], [250, 50, 120, 210, 92, 498, 340]);
  assert.equal(r.cleaningBefore, false);

  // Only when the flat's terms say so does the cleaning charge come off before the commission.
  await team('PUT', `/api/admin/finance/terms/${flat}`, { model: 'management', percent: '20', cleaningCost: '60', cleaningCharge: '125', cleaningBefore: true });
  r = await row('2027-02'); // commission on 1050 - 250 = 800
  assert.deepEqual([r.commission, r.vat, r.ownerPayout, r.profit], [160, 82, 558, 290]);
  assert.equal((await team('PUT', `/api/admin/finance/terms/${flat}`, { model: 'rent', rent: '1', cleaningCost: '-4' })).status, 400);
});

test('cleaning amounts can be entered for several flats at once, without touching rent or commission', async () => {
  const flat = q.get("SELECT id FROM properties WHERE name = 'Clean flat'").id;
  await team('PUT', `/api/admin/finance/terms/${flat}`, { model: 'management', percent: '20' });
  const out = await team('PUT', '/api/admin/finance/cleaning', { month: '2027-02', flats: [{ propertyId: flat, cost: '70', charge: '125' }, { propertyId: 99999, cost: '5' }] });
  assert.equal(out.json.saved, 1);
  const r = (await month('2027-02')).rows.find((x) => x.propertyId === flat);
  assert.deepEqual([r.percent, r.cleaningCostEach, r.cleaningChargeEach, r.cleaningCost, r.cleaningCharge], [20, 70, 125, 140, 250]);
  assert.equal((await team('PUT', '/api/admin/finance/cleaning', { flats: [{ propertyId: flat, cost: 'lots' }] })).json.saved, 1); // not a number counts as nothing
  assert.equal((await client(srv.base)('PUT', '/api/admin/finance/cleaning', { flats: [] })).status, 401);
});

test('bills of a rented flat are costs shown on their own; the portfolio says where the profit comes from', async () => {
  const flat = q.get("SELECT id FROM properties WHERE name = 'Clean flat'").id; // managed 20%, cleaning 70 cost / 125 charge
  await team('PUT', '/api/admin/finance/cleaning', { month: '2027-02', flats: [{ propertyId: flat, cost: '70', charge: '125' }] });
  const rentedFlat = q.insert("INSERT INTO properties(smoobu_id, name, display_name, qr_token) VALUES(903, 'Rented flat', 'Rented flat', 'qr-rented')");
  upsertReservation({ ...booking(70, '2027-02-05', '2027-02-09', 1500, 200), apartment: { id: 903 } });
  await team('PUT', `/api/admin/finance/terms/${rentedFlat}`, { model: 'rent', rent: '800', cleaningCost: '50' });
  assert.equal((await team('POST', '/api/admin/finance/expenses', { date: '2027-01-01', amount: '100', category: 'Council tax', monthly: true, bill: true })).status, 400); // a bill belongs to a flat
  await team('POST', '/api/admin/finance/expenses', { propertyId: rentedFlat, date: '2027-01-01', amount: '100', category: 'Council tax', monthly: true, bill: true });
  await team('POST', '/api/admin/finance/expenses', { propertyId: rentedFlat, date: '2027-02-10', amount: '40', category: 'Supplies' });
  const d = await month('2027-02');
  const r = d.rows.find((x) => x.propertyId === rentedFlat);
  assert.deepEqual([r.net, r.rent, r.cleaningCost, r.bills, r.expenses, r.profit], [1300, 800, 50, 100, 40, 310]);
  assert.equal(d.totals.bills, 100);
  assert.ok(d.expenses.some((e) => e.bill && e.category === 'Council tax') && d.expenses.some((e) => !e.bill && e.category === 'Supplies'));
  const m = d.rows.find((x) => x.propertyId === flat);
  assert.deepEqual([m.commission, m.cleaningMargin], [210, 110]); // what we keep: 20% of 1050, and 2 x (125 - 70)
  const s = d.totals.sources;
  assert.ok(s.commission >= 210 && s.cleaningMargin >= 110);
  assert.equal(Math.round((s.commission + s.cleaningMargin + s.rented - s.otherCosts) * 100), Math.round(d.totals.profit * 100)); // the sources add up to the profit
});

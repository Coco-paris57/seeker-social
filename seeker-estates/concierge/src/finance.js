// Finance: what each flat brings in. Revenue and booking-site fees come from Smoobu's price for
// each reservation; rent, management terms and expenses are entered by the team. A booking that
// spans two months is shared between them night by night. No guest names are kept here.
import { q, getRaw, setRaw } from './db.js';
import { smoobu } from './smoobu.js';
import { addDays, londonDate, HttpError } from './util.js';

const BOOKING_PAYMENTS_FEE = 0.016; // Booking.com's payments service fee: 1.6% of the booking amount, on top of its commission (Smoobu only holds the commission)
const VAT = 0.2; // UK VAT, charged to the owner on top of our management commission
const num = (v) => { const n = Number(v); return Number.isFinite(n) ? n : 0; };
const round = (n) => Math.round(n * 100) / 100;
const nightsBetween = (a, b) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86400_000);
export const validMonth = (m) => /^\d{4}-(0[1-9]|1[0-2])$/.test(String(m || ''));
const nextMonth = (m) => { const [y, mo] = m.split('-').map(Number); return mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`; };
const shiftMonth = (m, by) => { const [y, mo] = m.split('-').map(Number); const d = new Date(Date.UTC(y, mo - 1 + by, 1)); return d.toISOString().slice(0, 7); };

/** Keep the money side of a Smoobu booking: what the guest paid and the booking site's fee. */
export function recordMoney(b, propertyId, cancelled) {
  q.run(
    `INSERT INTO booking_money(id, property_id, arrival, departure, channel, price, commission, cancelled, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET property_id = excluded.property_id, arrival = excluded.arrival, departure = excluded.departure, channel = excluded.channel,
       price = excluded.price, commission = excluded.commission, cancelled = excluded.cancelled, updated_at = excluded.updated_at`,
    b.id, propertyId, b.arrival, b.departure, b.channel?.name || null, num(b.price), num(b['commission-included']), cancelled);
}

/** Once: bring in the prices of bookings from before this screen existed (the last 18 months). */
export async function backfillMoney() {
  const api = smoobu();
  if (!api || getRaw('money_backfill')) return 0;
  const today = londonDate();
  const bookings = await api.reservations(addDays(today, -548), addDays(today, -30));
  let n = 0;
  for (const b of bookings) {
    if (!b?.id || !b.apartment?.id || !b.arrival || !b.departure || b['is-blocked-booking']) continue;
    const property = q.get('SELECT id FROM properties WHERE smoobu_id = ?', b.apartment.id);
    if (!property) continue;
    const type = String(b.type || 'reservation').toLowerCase();
    recordMoney(b, property.id, type === 'cancellation' ? 1 : type === 'reservation' || type === 'modification of booking' ? 0 : 2);
    n++;
  }
  setRaw('money_backfill', new Date().toISOString());
  return n;
}

/** The terms in force for a flat in a month: the latest ones that start in or before it. */
function termsFor(propertyId, month) {
  return q.get('SELECT * FROM property_terms WHERE property_id = ? AND from_month <= ? ORDER BY from_month DESC LIMIT 1', propertyId, month) || null;
}

/** Set a flat's terms from a month onwards: rented by us (monthly rent), or managed for an owner (a share of net revenue). */
export function setTerms(propertyId, { model, rent, percent, from, sameAs, cleaningCost, cleaningCharge, cleaningBefore }) {
  if (!q.get('SELECT 1 FROM properties WHERE id = ?', propertyId)) throw new HttpError(404, 'Property not found.');
  if (model === 'same') {
    // A second Smoobu listing of the same flat: its bookings and costs are counted with the main listing.
    const other = q.get('SELECT id, fin_same_as FROM properties WHERE id = ?', Number(sameAs));
    if (!other || other.id === propertyId) throw new HttpError(400, 'Choose the other listing of this flat.');
    const main = other.fin_same_as || other.id; // always point at the main listing itself
    if (main === propertyId) throw new HttpError(400, 'That listing is already combined with this one.');
    q.run('UPDATE properties SET fin_same_as = ? WHERE id = ?', main, propertyId);
    q.run('UPDATE properties SET fin_same_as = ? WHERE fin_same_as = ?', main, propertyId); // listings that pointed here follow
    return;
  }
  q.run('UPDATE properties SET fin_same_as = NULL WHERE id = ?', propertyId);
  if (!['rent', 'management', 'none'].includes(model)) throw new HttpError(400, 'Choose how this flat works: rented by us, or managed for an owner.');
  const fromMonth = validMonth(from) ? from : '2000-01';
  const r = model === 'rent' ? num(rent) : 0;
  const p = model === 'management' ? num(percent) : 0;
  if (r < 0 || r > 1_000_000) throw new HttpError(400, 'Enter the monthly rent as a number.');
  if (p < 0 || p > 100) throw new HttpError(400, 'Enter the commission as a percentage between 0 and 100.');
  // Cleaning, per booking: what the clean costs us, and on a managed flat what the owner is charged for it.
  const cost = model === 'none' ? 0 : num(cleaningCost);
  const charge = model === 'management' ? num(cleaningCharge) : 0;
  if (cost < 0 || cost > 10_000 || charge < 0 || charge > 10_000) throw new HttpError(400, 'Enter the cleaning amounts as numbers.');
  q.run(`INSERT INTO property_terms(property_id, from_month, model, rent, percent, cleaning_cost, cleaning_charge, cleaning_before) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(property_id, from_month) DO UPDATE SET model = excluded.model, rent = excluded.rent, percent = excluded.percent, cleaning_cost = excluded.cleaning_cost, cleaning_charge = excluded.cleaning_charge, cleaning_before = excluded.cleaning_before`,
    propertyId, fromMonth, model, r, p, cost, charge, cleaningBefore === true ? 1 : 0);
}

/**
 * Cleaning amounts for several flats at once, from the Finance table. Each is saved on the terms
 * in force for that month, leaving the rent or commission as it is.
 */
export function setCleaning(list, month) {
  const m = validMonth(month) ? month : londonDate().slice(0, 7);
  let saved = 0;
  for (const x of Array.isArray(list) ? list : []) {
    const t = termsFor(Number(x.propertyId), m);
    if (!t || t.model === 'none') continue; // no terms yet: nothing to attach it to
    const cost = num(x.cost);
    const charge = t.model === 'management' ? num(x.charge) : 0;
    if (cost < 0 || cost > 10_000 || charge < 0 || charge > 10_000) throw new HttpError(400, 'Enter the cleaning amounts as numbers.');
    q.run('UPDATE property_terms SET cleaning_cost = ?, cleaning_charge = ? WHERE id = ?', cost, charge, t.id);
    saved++;
  }
  return saved;
}

/** Which flats are counted. `list` is [{ propertyId, off, from, to }]: off with a first month and, optionally, a last one. */
export function setCounted(list) {
  let changed = 0;
  for (const x of Array.isArray(list) ? list : []) {
    const id = Number(x.propertyId);
    if (!q.get('SELECT 1 FROM properties WHERE id = ?', id)) continue;
    if (!x.off) { changed += q.run('UPDATE properties SET fin_off_from = NULL, fin_off_to = NULL WHERE id = ? AND fin_off_from IS NOT NULL', id).changes; continue; }
    if (!validMonth(x.from)) throw new HttpError(400, 'Choose the first month to leave the flat out.');
    const to = x.to ? String(x.to) : null;
    if (to && (!validMonth(to) || to < x.from)) throw new HttpError(400, 'The last month must be the same as the first month or later.');
    changed += q.run('UPDATE properties SET fin_off_from = ?, fin_off_to = ? WHERE id = ?', x.from, to, id).changes;
  }
  return changed;
}

export function addExpense({ propertyId, date, amount, category, note, monthly, owner, bill }, userId) {
  const a = num(amount);
  if (!(a > 0) || a > 10_000_000) throw new HttpError(400, 'Enter the amount as a number above zero.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) throw new HttpError(400, 'Choose the date of the expense.');
  const pid = propertyId ? Number(propertyId) : null;
  if (pid && !q.get('SELECT 1 FROM properties WHERE id = ?', pid)) throw new HttpError(404, 'Property not found.');
  if (bill && !pid) throw new HttpError(400, 'Choose the flat this bill is for.');
  return q.insert('INSERT INTO expenses(property_id, date, amount, category, note, monthly, owner, bill, created_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    pid, date, round(a), String(category || 'Other').trim().slice(0, 40) || 'Other', String(note || '').trim().slice(0, 200), monthly ? 1 : 0, owner && pid && !bill ? 1 : 0, bill ? 1 : 0, userId ?? null);
}

/** Expenses that fall in a month: one-off ones dated in it, and monthly ones running at the time. */
function expensesIn(month) {
  return q.all(
    `SELECT * FROM expenses WHERE (monthly = 0 AND substr(date, 1, 7) = ?) OR (monthly = 1 AND substr(date, 1, 7) <= ? AND (ended IS NULL OR ended >= ?)) ORDER BY date, id`, month, month, month);
}

function monthFigures(month) {
  const start = `${month}-01`;
  const end = `${nextMonth(month)}-01`;
  const days = nightsBetween(start, end);
  // A flat left out of Finance for a period (not ours yet, handed back, being refurbished) is not counted in those months.
  const off = (p) => !!p.fin_off_from && p.fin_off_from <= month && (!p.fin_off_to || p.fin_off_to >= month);
  const everything = q.all('SELECT id, name, display_name, active, fin_same_as, fin_off_from, fin_off_to FROM properties ORDER BY COALESCE(position, 100000), name COLLATE NOCASE');
  const all = everything.filter((p) => !off(p));
  const ids = new Set(all.map((p) => p.id));
  const mainOf = (p) => (p.fin_same_as && ids.has(p.fin_same_as) && p.fin_same_as !== p.id ? p.fin_same_as : p.id);
  const properties = all.filter((p) => mainOf(p) === p.id);
  const expenses = expensesIn(month);
  const rows = [];
  for (const p of properties) {
    let revenue = 0, fees = 0, nights = 0, bookings = 0, cleans = 0;
    // Two Smoobu listings of one flat are one line: their bookings and expenses are added together.
    const members = all.filter((x) => mainOf(x) === p.id);
    const memberIds = members.map((x) => x.id);
    const marks = memberIds.map(() => '?').join(',');
    for (const b of q.all(`SELECT * FROM booking_money WHERE property_id IN (${marks}) AND cancelled = 0 AND arrival < ? AND departure > ?`, ...memberIds, end, start)) {
      const total = Math.max(1, nightsBetween(b.arrival, b.departure));
      const inMonth = nightsBetween(b.arrival > start ? b.arrival : start, b.departure < end ? b.departure : end);
      if (inMonth <= 0) continue;
      revenue += (b.price * inMonth) / total;
      const siteFee = b.commission + (/booking\.com/i.test(b.channel || '') ? b.price * BOOKING_PAYMENTS_FEE : 0);
      fees += (siteFee * inMonth) / total;
      nights += inMonth;
      bookings++;
      if (b.departure >= start && b.departure < end) cleans++; // one clean per checkout: the flat is cleaned when the guest leaves
    }
    const t = termsFor(p.id, month);
    const model = t?.model && t.model !== 'none' ? t.model : null;
    const mine = expenses.filter((e) => memberIds.includes(e.property_id));
    const ours = mine.filter((e) => !e.owner).reduce((s, e) => s + e.amount, 0);
    const owners = mine.filter((e) => e.owner).reduce((s, e) => s + e.amount, 0);
    const bills = mine.filter((e) => e.bill && !e.owner).reduce((s, e) => s + e.amount, 0); // household bills of a flat we rent: part of our costs, shown on their own
    if (!members.some((x) => x.active) && !bookings && !mine.length) continue;
    const net = revenue - fees;
    const rent = model === 'rent' ? t.rent : 0;
    const cleaningCost = model ? cleans * t.cleaning_cost : 0; // what we pay the cleaner
    const cleaningCharge = model === 'management' ? cleans * t.cleaning_charge : 0; // what the owner is charged; the guest's payment already includes a cleaning fee
    // Our commission is on the full net revenue, before cleaning, unless the flat's terms say the cleaning charge comes off first.
    const commission = model === 'management' ? (Math.max(0, net - (t.cleaning_before ? cleaningCharge : 0)) * t.percent) / 100 : 0;
    const cleaningVat = cleaningCharge * VAT;
    const vat = commission * VAT + cleaningVat; // on our commission and on the cleaning charge: the owner pays it, it goes to HMRC, so it is not our profit
    // Rented by us: we keep the net revenue and pay the rent. Managed: we keep the commission; the rest is the owner's.
    const profit = model === 'management' ? commission + cleaningCharge - cleaningCost - ours : net - rent - cleaningCost - ours;
    rows.push({
      propertyId: p.id, name: p.name || p.display_name, model,
      listings: members.filter((x) => x.id !== p.id).map((x) => ({ id: x.id, name: x.name || x.display_name })), percent: model === 'management' ? t.percent : null, termsFrom: t?.from_month && t.from_month !== '2000-01' ? t.from_month : null,
      bookings, nights, occupancy: Math.min(100, Math.round((nights / days) * 100)), revenue: round(revenue), fees: round(fees), net: round(net),
      rent: round(rent), commission: round(commission), vat: round(vat), expenses: round(ours - bills), bills: round(bills), ownerExpenses: round(owners),
      cleaningMargin: model === 'management' ? round(cleaningCharge - cleaningCost) : null, // what we keep from cleaning on a managed flat: the charge to the owner less what the clean costs us
      cleans, cleaningCost: round(cleaningCost), cleaningCharge: round(cleaningCharge), cleaningCostEach: t?.cleaning_cost || 0, cleaningChargeEach: t?.cleaning_charge || 0, cleaningVat: round(cleaningVat), cleaningBefore: t ? !!t.cleaning_before : false,
      ownerPayout: model === 'management' ? round(net - commission - vat - cleaningCharge - owners) : null, profit: round(profit),
    });
  }
  const general = expenses.filter((e) => !e.property_id).reduce((s, e) => s + e.amount, 0);
  const sum = (k) => round(rows.reduce((s, r) => s + (r[k] || 0), 0));
  const nights = rows.reduce((s, r) => s + r.nights, 0);
  const totals = {
    revenue: sum('revenue'), fees: sum('fees'), net: sum('net'), rent: sum('rent'), commission: sum('commission'), vat: sum('vat'), cleaningCost: sum('cleaningCost'), cleaningCharge: sum('cleaningCharge'), expenses: round(sum('expenses') + general), bills: sum('bills'), general: round(general),
    ownerPayout: sum('ownerPayout'), profit: round(sum('profit') - general), nights, bookings: rows.reduce((s, r) => s + r.bookings, 0),
    occupancy: rows.length ? Math.min(100, Math.round((nights / (days * rows.length)) * 100)) : 0, adr: nights ? round(sum('revenue') / nights) : 0,
  };
  // Where the profit comes from across all flats: commission, the margin on cleaning, and the margin on flats we rent.
  const managed = rows.filter((r) => r.model === 'management');
  totals.sources = {
    commission: round(managed.reduce((s, r) => s + r.commission, 0)),
    cleaningMargin: round(managed.reduce((s, r) => s + r.cleaningMargin, 0)),
    rented: round(rows.filter((r) => r.model !== 'management').reduce((s, r) => s + r.profit, 0)),
    otherCosts: round(managed.reduce((s, r) => s + r.expenses + r.bills, 0) + general), // managed flats' own expenses and the business's general ones
  };
  return { rows, totals, expenses, excluded: everything.filter(off).map((p) => ({ id: p.id, name: p.name || p.display_name })) };
}

/** One month in full, with the twelve months up to it for the trend. */
export function finance(month) {
  const m = validMonth(month) ? month : londonDate().slice(0, 7);
  const { rows, totals, expenses, excluded } = monthFigures(m);
  const names = Object.fromEntries(q.all('SELECT id, name, display_name FROM properties').map((p) => [p.id, p.name || p.display_name]));
  const series = [];
  for (let i = -11; i <= 0; i++) {
    const mm = shiftMonth(m, i);
    const t = mm === m ? totals : monthFigures(mm).totals;
    series.push({ month: mm, revenue: t.revenue, net: t.net, profit: t.profit });
  }
  return {
    month: m, today: londonDate().slice(0, 7), rows, totals, series, currency: '£',
    missingTerms: rows.filter((r) => !r.model).length,
    excluded,
    flats: q.all('SELECT id, name, display_name, fin_off_from, fin_off_to FROM properties WHERE active = 1 OR fin_off_from IS NOT NULL ORDER BY COALESCE(position, 100000), name COLLATE NOCASE').map((p) => ({ id: p.id, name: p.name || p.display_name, offFrom: p.fin_off_from || null, offTo: p.fin_off_to || null })),
    expenses: expenses.map((e) => ({ id: e.id, propertyId: e.property_id, propertyName: e.property_id ? names[e.property_id] || 'Removed property' : null, date: e.date, amount: e.amount, category: e.category, note: e.note, monthly: !!e.monthly, owner: !!e.owner, bill: !!e.bill })),
    properties: q.all('SELECT id, name, display_name FROM properties WHERE active = 1 ORDER BY COALESCE(position, 100000), name COLLATE NOCASE').map((p) => ({ id: p.id, name: p.name || p.display_name })),
    hasPrices: !!q.get('SELECT 1 FROM booking_money LIMIT 1'),
  };
}

/** Remove a one-off expense, or stop a monthly one from the given month (earlier months keep it). */
export function removeExpense(id, month) {
  const e = q.get('SELECT * FROM expenses WHERE id = ?', id);
  if (!e) throw new HttpError(404, 'That expense no longer exists.');
  if (e.monthly && validMonth(month) && month > e.date.slice(0, 7)) q.run('UPDATE expenses SET ended = ? WHERE id = ?', shiftMonth(month, -1), id);
  else q.run('DELETE FROM expenses WHERE id = ?', id);
}

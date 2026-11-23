// Finance: what each flat brings in. Revenue and booking-site fees come from Smoobu's price for
// each reservation; rent, management terms and expenses are entered by the team. A booking that
// spans two months is shared between them night by night. No guest names are kept here.
import { q, getRaw, setRaw } from './db.js';
import { smoobu } from './smoobu.js';
import { addDays, londonDate, HttpError } from './util.js';

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
export function setTerms(propertyId, { model, rent, percent, from }) {
  if (!q.get('SELECT 1 FROM properties WHERE id = ?', propertyId)) throw new HttpError(404, 'Property not found.');
  if (!['rent', 'management', 'none'].includes(model)) throw new HttpError(400, 'Choose how this flat works: rented by us, or managed for an owner.');
  const fromMonth = validMonth(from) ? from : '2000-01';
  const r = model === 'rent' ? num(rent) : 0;
  const p = model === 'management' ? num(percent) : 0;
  if (r < 0 || r > 1_000_000) throw new HttpError(400, 'Enter the monthly rent as a number.');
  if (p < 0 || p > 100) throw new HttpError(400, 'Enter the commission as a percentage between 0 and 100.');
  q.run('INSERT INTO property_terms(property_id, from_month, model, rent, percent) VALUES(?, ?, ?, ?, ?) ON CONFLICT(property_id, from_month) DO UPDATE SET model = excluded.model, rent = excluded.rent, percent = excluded.percent',
    propertyId, fromMonth, model, r, p);
}

export function addExpense({ propertyId, date, amount, category, note, monthly, owner }, userId) {
  const a = num(amount);
  if (!(a > 0) || a > 10_000_000) throw new HttpError(400, 'Enter the amount as a number above zero.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) throw new HttpError(400, 'Choose the date of the expense.');
  const pid = propertyId ? Number(propertyId) : null;
  if (pid && !q.get('SELECT 1 FROM properties WHERE id = ?', pid)) throw new HttpError(404, 'Property not found.');
  return q.insert('INSERT INTO expenses(property_id, date, amount, category, note, monthly, owner, created_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    pid, date, round(a), String(category || 'Other').trim().slice(0, 40) || 'Other', String(note || '').trim().slice(0, 200), monthly ? 1 : 0, owner && pid ? 1 : 0, userId ?? null);
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
  const properties = q.all('SELECT id, name, display_name, active FROM properties ORDER BY COALESCE(position, 100000), name COLLATE NOCASE');
  const expenses = expensesIn(month);
  const rows = [];
  for (const p of properties) {
    let revenue = 0, fees = 0, nights = 0, bookings = 0;
    for (const b of q.all('SELECT * FROM booking_money WHERE property_id = ? AND cancelled = 0 AND arrival < ? AND departure > ?', p.id, end, start)) {
      const total = Math.max(1, nightsBetween(b.arrival, b.departure));
      const inMonth = nightsBetween(b.arrival > start ? b.arrival : start, b.departure < end ? b.departure : end);
      if (inMonth <= 0) continue;
      revenue += (b.price * inMonth) / total;
      fees += (b.commission * inMonth) / total;
      nights += inMonth;
      bookings++;
    }
    const t = termsFor(p.id, month);
    const model = t?.model && t.model !== 'none' ? t.model : null;
    const mine = expenses.filter((e) => e.property_id === p.id);
    const ours = mine.filter((e) => !e.owner).reduce((s, e) => s + e.amount, 0);
    const owners = mine.filter((e) => e.owner).reduce((s, e) => s + e.amount, 0);
    if (!p.active && !bookings && !mine.length) continue;
    const net = revenue - fees;
    const rent = model === 'rent' ? t.rent : 0;
    const commission = model === 'management' ? (net * t.percent) / 100 : 0;
    // Rented by us: we keep the net revenue and pay the rent. Managed: we keep the commission; the rest is the owner's.
    const profit = model === 'management' ? commission - ours : net - rent - ours;
    rows.push({
      propertyId: p.id, name: p.name || p.display_name, model, percent: model === 'management' ? t.percent : null, termsFrom: t?.from_month && t.from_month !== '2000-01' ? t.from_month : null,
      bookings, nights, occupancy: Math.min(100, Math.round((nights / days) * 100)), revenue: round(revenue), fees: round(fees), net: round(net),
      rent: round(rent), commission: round(commission), expenses: round(ours), ownerExpenses: round(owners),
      ownerPayout: model === 'management' ? round(net - commission - owners) : null, profit: round(profit),
    });
  }
  const general = expenses.filter((e) => !e.property_id).reduce((s, e) => s + e.amount, 0);
  const sum = (k) => round(rows.reduce((s, r) => s + (r[k] || 0), 0));
  const nights = rows.reduce((s, r) => s + r.nights, 0);
  const totals = {
    revenue: sum('revenue'), fees: sum('fees'), net: sum('net'), rent: sum('rent'), commission: sum('commission'), expenses: round(sum('expenses') + general), general: round(general),
    ownerPayout: sum('ownerPayout'), profit: round(sum('profit') - general), nights, bookings: rows.reduce((s, r) => s + r.bookings, 0),
    occupancy: rows.length ? Math.min(100, Math.round((nights / (days * rows.length)) * 100)) : 0, adr: nights ? round(sum('revenue') / nights) : 0,
  };
  return { rows, totals, expenses };
}

/** One month in full, with the twelve months up to it for the trend. */
export function finance(month) {
  const m = validMonth(month) ? month : londonDate().slice(0, 7);
  const { rows, totals, expenses } = monthFigures(m);
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
    expenses: expenses.map((e) => ({ id: e.id, propertyId: e.property_id, propertyName: e.property_id ? names[e.property_id] || 'Removed property' : null, date: e.date, amount: e.amount, category: e.category, note: e.note, monthly: !!e.monthly, owner: !!e.owner })),
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

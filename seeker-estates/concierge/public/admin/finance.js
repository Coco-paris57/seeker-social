// Finance: what each flat brings in. Revenue and booking-site fees come from Smoobu; rent,
// management terms and expenses are entered here. Administrators only.
import { api, busy, button, check, chip, field, fill, h, icon, loadError, loading, openDialog, pageHeader, showError, toast } from './lib.js';

const money = (n, c = '£') => `${n < 0 ? '−' : ''}${c}${Math.abs(Number(n) || 0).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const monthName = (m, short = false) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString('en-GB', { month: short ? 'short' : 'long', year: short ? '2-digit' : 'numeric' });
const shift = (m, by) => { const [y, mo] = m.split('-').map(Number); return new Date(Date.UTC(y, mo - 1 + by, 1)).toISOString().slice(0, 7); };
const BILLS = ['Council tax', 'Electricity', 'Gas', 'Water', 'Internet', 'TV licence', 'Service charge', 'Insurance', 'Other bill'];
const CATEGORIES = ['Cleaning', 'Laundry', 'Utilities', 'Internet', 'Council tax', 'Maintenance', 'Supplies', 'Furniture', 'Software', 'Insurance', 'Guest gift', 'Other'];

const SVG = 'http://www.w3.org/2000/svg';
const svg = (tag, attrs, ...kids) => { const el = document.createElementNS(SVG, tag); for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v); el.append(...kids); return el; };
const PIE_COLOURS = ['#1f5a45', '#e0a458', '#c2674a', '#5b8fb0', '#8c6bb1', '#9bb8a9', '#b8a25a', '#8a8f98'];

/** A pie with its key beside it. `slices` are { label, value } with values above zero; each gets its amount and share. */
function pie(slices, c, { colours = PIE_COLOURS, label = 'Pie chart' } = {}) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  if (!(total > 0)) return null;
  let angle = -Math.PI / 2;
  const point = (a, r = 100) => `${(110 + r * Math.cos(a)).toFixed(2)} ${(110 + r * Math.sin(a)).toFixed(2)}`;
  const shapes = slices.map((x, i) => {
    const share = x.value / total;
    const from = angle;
    angle += share * 2 * Math.PI;
    const shape = share > 0.9999
      ? svg('circle', { cx: 110, cy: 110, r: 100, fill: colours[i % colours.length] })
      : svg('path', { d: `M110 110 L${point(from)} A100 100 0 ${share > 0.5 ? 1 : 0} 1 ${point(angle)} Z`, fill: colours[i % colours.length], stroke: '#fff', 'stroke-width': 2 });
    shape.append(svg('title', null, `${x.label}: ${money(x.value, c)} (${Math.round(share * 100)}%)`));
    return shape;
  });
  return h('div', { class: 'fin-pie' },
    svg('svg', { viewBox: '0 0 220 220', role: 'img', 'aria-label': `${label}: ${slices.map((x) => `${x.label} ${money(x.value, c)}, ${Math.round((x.value / total) * 100)}%`).join('; ')}` }, ...shapes),
    h('ul', { class: 'fin-pie-key' }, slices.map((x, i) => {
      const dot = h('span', { class: 'fin-key' });
      dot.style.background = colours[i % colours.length];
      return h('li', null, dot, h('span', { class: 'fin-pie-label' }, x.label), h('strong', null, money(x.value, c)), h('span', { class: 'muted' }, `${(Math.round((x.value / total) * 1000) / 10).toFixed(1)}%`));
    })));
}

/** The whole portfolio in two pies: where the profit comes from, and which flats make it. */
function portfolio(d) {
  const c = d.currency;
  const s = d.totals.sources;
  const sources = [{ label: 'Management commission', value: s.commission }, { label: 'Cleaning margin (charge less cost)', value: s.cleaningMargin }, { label: 'Flats we rent (after rent and costs)', value: s.rented }].filter((x) => x.value > 0);
  const minus = [s.cleaningMargin < 0 && `cleaning on managed flats cost ${money(-s.cleaningMargin, c)} more than was charged`, s.rented < 0 && `the flats we rent lost ${money(-s.rented, c)}`, s.otherCosts > 0 && `other expenses were ${money(s.otherCosts, c)}`].filter(Boolean);
  const winners = d.rows.filter((r) => r.profit > 0).sort((a, b) => b.profit - a.profit);
  const top = winners.slice(0, 7).map((r) => ({ label: r.name, value: r.profit }));
  if (winners.length > 7) top.push({ label: `${winners.length - 7} other flats`, value: winners.slice(7).reduce((t, r) => t + r.profit, 0) });
  const losers = d.rows.filter((r) => r.profit < 0).sort((a, b) => a.profit - b.profit);
  const sourcePie = pie(sources, c, { label: 'Where the profit comes from' });
  const flatPie = pie(top, c, { label: 'Profit by flat' });
  if (!sourcePie && !flatPie) return null;
  return h('section', { class: 'card section' },
    h('h2', null, `The whole portfolio · ${monthName(d.month)}`),
    h('div', { class: 'fin-pies' },
      h('div', null, h('h3', null, 'Where our profit comes from'), sourcePie || h('p', { class: 'muted' }, 'No source made a profit this month.'),
        h('p', { class: 'hint' }, `Total profit ${money(d.totals.profit, c)}${minus.length ? `: the slices above, less what does not fit in a pie (${minus.join('; ')}).` : '.'}`)),
      h('div', null, h('h3', null, 'Which flats make it'), flatPie || h('p', { class: 'muted' }, 'No flat made a profit this month.'),
        losers.length > 0 && h('p', { class: 'hint fin-neg' }, `Making a loss: ${losers.map((r) => `${r.name} (${money(r.profit, c)})`).join(', ')}.`))));
}

/**
 * One small pie per flat (two listings of the same flat are one pie). A managed flat: what we keep,
 * split into commission and cleaning margin. A flat we rent: its net revenue, split into what it
 * pays for (rent, bills, cleaning, other expenses) and the profit left.
 */
function flatPies(d) {
  const c = d.currency;
  const G = '#1f5a45', AMBER = '#e0a458', CLAY = '#c2674a', BLUE = '#5b8fb0', GREY = '#8a8f98';
  const cards = d.rows.filter((r) => r.model).map((r) => {
    const all = r.model === 'management'
      ? [['Commission', r.commission, G], ['Cleaning margin', r.cleaningMargin, AMBER]]
      : [['Profit', r.profit, G], ['Rent', r.rent, CLAY], ['Bills', r.bills, BLUE], ['Cleaning', r.cleaningCost, AMBER], ['Other expenses', r.expenses, GREY]];
    const slices = all.filter((x) => x[1] > 0);
    const chart = pie(slices.map(([label, value]) => ({ label, value })), c, { colours: slices.map((x) => x[2]), label: r.name });
    const notes = r.model === 'management'
      ? [r.cleaningMargin < 0 && `Cleaning cost ${money(-r.cleaningMargin, c)} more than was charged.`, r.expenses > 0 && `Less ${money(r.expenses, c)} of our own expenses.`]
      : [r.profit < 0 && `Costs were ${money(-r.profit, c)} more than the net revenue of ${money(r.net, c)}.`];
    return h('article', { class: 'fin-flat-pie' },
      h('h3', null, h('a', { href: `#/properties/${r.propertyId}` }, r.name)),
      h('p', { class: 'muted' }, `${r.model === 'management' ? `Managed · ${r.percent}% + VAT` : 'Rented by us'}${r.listings.length ? ` · ${r.listings.length + 1} listings combined` : ''}`),
      chart || h('p', { class: 'muted fin-empty' }, r.bookings ? 'Nothing to show for this month.' : 'No bookings this month.'),
      h('p', { class: `fin-flat-total ${r.profit < 0 ? 'fin-neg' : 'fin-pos'}` }, h('strong', null, money(r.profit, c)), r.profit < 0 ? ' loss' : ' profit'),
      notes.filter(Boolean).map((n) => h('p', { class: 'hint' }, n)));
  });
  if (!cards.length) return null;
  return h('section', { class: 'card section' },
    h('h2', null, `Where the profit comes from, flat by flat · ${monthName(d.month)}`),
    h('p', { class: 'hint' }, 'Managed flats: what we keep, split between commission and the margin on cleaning. Flats we rent: the net revenue, split between what it pays for and the profit left.'),
    h('div', { class: 'fin-flat-pies' }, cards));
}

/** A household bill for a flat we rent. */
function billDialog(d, rented) {
  return openDialog({
    title: 'Add a bill',
    build: (close) => {
      const property = h('select', null, rented.map((r) => h('option', { value: r.propertyId }, r.name)));
      const type = h('select', null, BILLS.map((b) => h('option', { value: b }, b)));
      const amount = h('input', { type: 'text', inputMode: 'decimal', required: true, placeholder: 'For example 142' });
      const date = h('input', { type: 'date', required: true, value: `${d.month}-01` });
      const monthly = check('The same amount every month from this date', { checked: true });
      const note = h('input', { type: 'text', maxLength: 200, placeholder: 'Optional, for example the supplier' });
      const save = button('Add bill', { variant: 'primary', type: 'submit', icon: 'plus' });
      const form = h('form', { class: 'stack' },
        field('Flat', property), field('Bill', type), field('Amount (£)', amount, { hint: 'For a bill paid every quarter or year, enter what it comes to per month and leave the box ticked, or untick it and enter the one payment.' }),
        field('From', date), monthly.wrap, field('Note', note),
        h('div', { class: 'actions' }, save, button('Cancel', { onclick: () => close() })));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          try {
            await api('/finance/expenses', { method: 'POST', body: { propertyId: property.value, amount: amount.value.replace(/[£,\s]/g, ''), date: date.value, category: type.value, note: note.value, monthly: monthly.input.checked, bill: true } });
            toast('Bill added', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
      });
      setTimeout(() => amount.focus());
      return form;
    },
  });
}

function tile(value, label, hint, tone) {
  return h('div', { class: `tile${tone ? ` tile-${tone}` : ''}` }, h('p', { class: 'tile-value' }, value), h('p', { class: 'tile-label' }, label), hint && h('p', { class: 'hint' }, hint));
}

/** How a flat earns: rented by us, or managed for an owner. Applies from the chosen month onwards. */
function termsDialog(row, month, others = []) {
  return openDialog({
    title: `Terms · ${row.name}`,
    build: (close) => {
      const model = h('select', null,
        h('option', { value: 'rent', selected: row.model === 'rent' || !row.model }, 'We rent it (we pay rent and keep the revenue)'),
        h('option', { value: 'management', selected: row.model === 'management' }, 'We manage it for an owner (commission + VAT on net revenue)'),
        others.length > 0 && h('option', { value: 'same' }, 'Same flat as another listing (combine the two)'),
        h('option', { value: 'none' }, 'Not set'));
      const sameAs = h('select', null, others.map((o) => h('option', { value: o.propertyId }, o.name)));
      const sameField = field('The other listing of this flat', sameAs, { hint: 'Bookings and expenses of both listings are added together on that line, with its rent or commission counted once. To separate them again, open the terms of the listing you are combining and choose another option.' });
      const rent = h('input', { type: 'text', inputMode: 'decimal', value: row.rent || '', placeholder: 'For example 2400' });
      const percent = h('input', { type: 'text', inputMode: 'decimal', value: row.percent ?? '', placeholder: 'For example 18' });
      const cost = h('input', { type: 'text', inputMode: 'decimal', value: row.cleaningCostEach || '', placeholder: 'For example 65' });
      const charge = h('input', { type: 'text', inputMode: 'decimal', value: row.cleaningChargeEach || '', placeholder: 'For example 90' });
      const before = check('Take the cleaning charge off before working out our commission (normally off: our commission is on the full net revenue)', { checked: row.cleaningBefore === true });
      const costField = field('Cleaning cost per check-in (£)', cost, { hint: 'What you pay for one clean. It is counted once for every check-in in the month.' });
      const chargeField = field('Cleaning charge to the owner per check-in (£, + VAT)', charge, { hint: 'Enter the amount before VAT, for example 125. It is charged once for every check-in in the month, with 20% VAT added, and comes off the owner\'s payout (the guest\'s payment already includes a cleaning fee). The difference between the charge and the cost is ours; the VAT is not.' });
      const from = h('select', null, h('option', { value: '' }, 'From the start (all months)'), h('option', { value: month }, `From ${monthName(month)} onwards`));
      const rentField = field('Rent we pay each month (£)', rent);
      const percentField = field('Our commission (% of net revenue, + VAT)', percent, { hint: 'Enter the percentage before VAT. Net revenue is what the guest paid minus the booking site\'s fee. VAT at 20% is added on top of the commission and comes off the owner\'s payout; it is not counted in our profit.' });
      const applies = field('Applies', from, { hint: 'Choose "from this month" when the rent or the commission has changed, so earlier months keep the old figures.' });
      const sync = () => { rentField.hidden = model.value !== 'rent'; percentField.hidden = model.value !== 'management'; sameField.hidden = model.value !== 'same'; applies.hidden = model.value === 'same';
        costField.hidden = !['rent', 'management'].includes(model.value); chargeField.hidden = before.wrap.hidden = model.value !== 'management'; };
      model.addEventListener('change', sync);
      sync();
      const save = button('Save', { variant: 'primary', type: 'submit', icon: 'check' });
      const form = h('form', { class: 'stack' },
        field('How this flat works', model), rentField, percentField, costField, chargeField, before.wrap, sameField, applies,
        h('div', { class: 'actions' }, save, button('Cancel', { onclick: () => close() })));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          try {
            await api(`/finance/terms/${row.propertyId}`, { method: 'PUT', body: { model: model.value, rent: rent.value.replace(/[£,\s]/g, ''), percent: percent.value.replace(/[%\s]/g, ''), from: from.value, sameAs: sameAs.value || null,
              cleaningCost: cost.value.replace(/[£,\s]/g, ''), cleaningCharge: charge.value.replace(/[£,\s]/g, ''), cleaningBefore: before.input.checked } });
            toast('Saved', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
      });
      return form;
    },
  });
}

/** Cleaning for every flat on one screen: what a clean costs, and on managed flats what the owner is charged. */
function cleaningDialog(d) {
  return openDialog({
    title: 'Cleaning per check-in',
    wide: true,
    build: (close) => {
      const clean = (v) => v.replace(/[£,\s]/g, '');
      const rows = d.rows.filter((r) => r.model).map((r) => ({
        r,
        cost: h('input', { type: 'text', inputMode: 'decimal', value: r.cleaningCostEach || '', placeholder: '0', 'aria-label': `Cleaning cost for ${r.name}` }),
        charge: r.model === 'management' ? h('input', { type: 'text', inputMode: 'decimal', value: r.cleaningChargeEach || '', placeholder: '0', 'aria-label': `Cleaning charge to the owner for ${r.name}` }) : null,
      }));
      const unset = d.rows.filter((r) => !r.model).length;
      const save = button('Save', { variant: 'primary', type: 'submit', icon: 'check' });
      const form = h('form', { class: 'stack' },
        h('p', { class: 'muted' }, 'Enter the amounts in pounds. Each is counted once for every check-in in the month. The charge to the owner is before VAT; 20% VAT is added.'),
        rows.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data' },
            h('thead', null, h('tr', null, ['Flat', 'Terms', 'Our cleaning cost (£)', 'Charge to owner (£ + VAT)'].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, rows.map((x) => h('tr', null, h('th', { scope: 'row' }, x.r.name), h('td', null, x.r.model === 'rent' ? 'Rented' : 'Managed'), h('td', null, x.cost), h('td', null, x.charge || '–'))))))
          : h('p', { class: 'muted' }, 'Set the terms of a flat first (rented or managed), then its cleaning can be entered here.'),
        unset > 0 && rows.length > 0 && h('p', { class: 'hint' }, `${unset} ${unset === 1 ? 'flat is' : 'flats are'} not listed because ${unset === 1 ? 'its' : 'their'} terms are not set yet.`),
        h('div', { class: 'actions' }, rows.length > 0 && save, button('Cancel', { onclick: () => close() })));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          try {
            await api('/finance/cleaning', { method: 'PUT', body: { month: d.month, flats: rows.map((x) => ({ propertyId: x.r.propertyId, cost: clean(x.cost.value), charge: x.charge ? clean(x.charge.value) : 0 })) } });
            toast('Cleaning saved', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
      });
      return form;
    },
  });
}

/**
 * One line per flat: what it brought us (top bar) against what it cost us (bottom bar, split into
 * rent, cleaning and other expenses), with the profit at the end. On a managed flat our income is
 * the commission and the cleaning charge, not the guest's payment.
 */
function flatChart(d) {
  const c = d.currency;
  const flats = d.rows.map((r) => {
    const income = r.model === 'management' ? r.commission + r.cleaningCharge : r.net;
    const parts = [['fin-rent', 'Rent', r.rent], ['fin-bills', 'Bills', r.bills], ['fin-clean', 'Cleaning cost', r.cleaningCost], ['fin-exp', 'Other expenses', r.expenses]].filter((p) => p[2] > 0);
    const earns = (r.model === 'management' ? [['fin-income', 'Our commission', r.commission], ['fin-charge', 'Cleaning charged to the owner', r.cleaningCharge]] : [['fin-income', 'Net revenue', r.net]]).filter((p) => p[2] > 0);
    return { r, income, parts, earns, costs: parts.reduce((s, p) => s + p[2], 0) };
  }).sort((a, b) => b.r.profit - a.r.profit);
  if (!flats.length) return null;
  const peak = Math.max(1, ...flats.map((f) => Math.max(f.income, f.costs)));
  const seg = (cls, value, label) => { const el = h('span', { class: `fin-seg ${cls}`, title: `${label}: ${money(value, c)}` }); el.style.width = `${(value / peak) * 100}%`; return el; };
  const key = (cls, label) => [h('span', { class: `fin-key ${cls}` }), `${label} `];
  return h('section', { class: 'card section' },
    h('h2', null, `Income, costs and profit by flat · ${monthName(d.month)}`),
    h('p', { class: 'hint fin-legend' }, key('fin-income', 'Net revenue or commission'), key('fin-charge', 'Cleaning charged to owner'), key('fin-rent', 'Rent'), key('fin-bills', 'Bills'), key('fin-clean', 'Cleaning cost'), key('fin-exp', 'Other expenses'), '· best profit first'),
    h('ul', { class: 'fin-flats' }, flats.map((f) => h('li', null,
      h('div', { class: 'fin-flat-name' }, h('a', { href: `#/properties/${f.r.propertyId}` }, f.r.name), h('span', { class: 'muted' }, f.r.model === 'management' ? ` · managed ${f.r.percent}%` : f.r.model === 'rent' ? ' · rented' : ' · terms not set')),
      h('div', { class: 'fin-flat-bars', role: 'img', 'aria-label': `${f.r.name}: income ${money(f.income, c)}, costs ${money(f.costs, c)}, profit ${money(f.r.profit, c)}` },
        h('div', { class: 'fin-track' }, f.earns.map(([cls, label, value]) => seg(cls, value, label)), h('span', { class: 'fin-amount' }, `${money(f.income, c)} income`)),
        h('div', { class: 'fin-track' }, f.parts.map(([cls, label, value]) => seg(cls, value, label)), h('span', { class: 'fin-amount' }, f.costs ? `${money(f.costs, c)} costs` : 'No costs entered'))),
      f.r.model === 'management' && h('div', { class: 'fin-split' }, `Commission ${money(f.r.commission, c)} · cleaning margin ${money(f.r.cleaningMargin, c)} (${money(f.r.cleaningCharge, c)} charged, ${money(f.r.cleaningCost, c)} cost)${f.r.commission + f.r.cleaningMargin > 0 ? ` · ${Math.round((Math.max(0, f.r.cleaningMargin) / (f.r.commission + Math.max(0, f.r.cleaningMargin))) * 100)}% of what we keep comes from cleaning` : ''}`),
      h('div', { class: `fin-flat-profit ${f.r.profit < 0 ? 'fin-neg' : 'fin-pos'}` }, h('strong', null, money(f.r.profit, c)), h('span', null, f.r.profit < 0 ? 'loss' : 'profit'))))),
    h('p', { class: 'hint' }, 'Income is what the flat brings to us: net revenue on a rented flat; our commission and the cleaning charge on a managed one. VAT is left out, as it is passed on.'));
}

function expenseDialog(d) {
  return openDialog({
    title: 'Add an expense',
    build: (close) => {
      const property = h('select', null, h('option', { value: '' }, 'The business as a whole (no flat)'), d.properties.map((p) => h('option', { value: p.id }, p.name)));
      const amount = h('input', { type: 'text', inputMode: 'decimal', required: true, placeholder: 'For example 85' });
      const today = new Date().toISOString().slice(0, 10);
      const date = h('input', { type: 'date', required: true, value: today.startsWith(d.month) ? today : `${d.month}-01` });
      const category = h('select', null, CATEGORIES.map((c) => h('option', { value: c }, c)));
      const note = h('input', { type: 'text', maxLength: 200, placeholder: 'Optional' });
      const monthly = check('Repeats every month from this date');
      const owner = check('Recharged to the owner (managed flats): it comes off the owner\'s payout, not our profit');
      const sync = () => { owner.wrap.hidden = !d.rows.find((r) => String(r.propertyId) === property.value && r.model === 'management'); if (owner.wrap.hidden) owner.input.checked = false; };
      property.addEventListener('change', sync);
      sync();
      const save = button('Add expense', { variant: 'primary', type: 'submit', icon: 'plus' });
      const form = h('form', { class: 'stack' },
        field('Flat', property), field('Amount (£)', amount), field('Date', date), field('Type', category), field('Note', note), monthly.wrap, owner.wrap,
        h('div', { class: 'actions' }, save, button('Cancel', { onclick: () => close() })));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          try {
            await api('/finance/expenses', { method: 'POST', body: { propertyId: property.value || null, amount: amount.value.replace(/[£,\s]/g, ''), date: date.value, category: category.value, note: note.value, monthly: monthly.input.checked, owner: owner.input.checked } });
            toast('Expense added', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
      });
      setTimeout(() => amount.focus());
      return form;
    },
  });
}

export function financeView() {
  let month = '';
  const body = h('div', null, loading('Loading the figures'));
  const title = h('strong', { class: 'fin-month' });
  const prev = button('Earlier', { icon: 'back', small: true, onclick: () => { month = shift(month, -1); load(); } });
  const next = button('Later', { small: true, onclick: () => { month = shift(month, 1); load(); } });
  const now = button('This month', { small: true, variant: 'ghost', onclick: () => { month = ''; load(); } });
  const el = h('div', { class: 'page' },
    pageHeader('Finance', { sub: 'What each flat brings in. Guest payments and booking-site fees come from Smoobu; rent, commission and expenses are entered here.', actions: [prev, title, next, now] }),
    body);

  async function load() {
    let d;
    try {
      d = await api(`/finance${month ? `?month=${month}` : ''}`);
    } catch (err) {
      if (err.status === 403) return fill(body, h('p', { class: 'note' }, icon('lock', 16), 'Only administrators can see the finances.'));
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    month = d.month;
    title.textContent = monthName(d.month);
    now.hidden = d.month === d.today;
    const t = d.totals;
    const c = d.currency;
    const peak = Math.max(1, ...d.series.map((s) => Math.abs(s.profit)), ...d.series.map((s) => s.net));
    const bar = (value, cls) => { const b = h('span', { class: `fin-bar ${cls}` }); b.style.height = `${Math.max(2, Math.round((Math.abs(value) / peak) * 100))}%`; return b; };
    const terms = (r) => (r.model === 'rent' ? 'Rented' : r.model === 'management' ? `Managed · ${r.percent}% + VAT` : 'Not set');
    const edit = (r) => button(r.model ? 'Edit' : 'Set terms', { small: true, variant: r.model ? 'ghost' : 'primary', icon: 'edit', onclick: async () => { if (await termsDialog(r, d.month, d.rows.filter((x) => x.propertyId !== r.propertyId))) load(); } });
    const cell = (v, cls) => h('td', { class: cls || null }, v);
    const rented = d.rows.filter((r) => r.model === 'rent');
    const bills = d.expenses.filter((e) => e.bill);
    const others = d.expenses.filter((e) => !e.bill);
    const removeBtn = (e) => {
      const btn = button(e.monthly ? 'Stop' : 'Remove', { small: true, variant: 'ghost', icon: 'x' });
      btn.addEventListener('click', () => busy(btn, async () => {
        try {
          await api(`/finance/expenses/${e.id}?month=${d.month}`, { method: 'DELETE', body: {} });
          toast(e.monthly ? 'Stopped from this month. Earlier months keep it.' : 'Removed', { kind: 'ok' });
          load();
        } catch (err) {
          showError(err);
        }
      }));
      return btn;
    };
    fill(body,
      !d.hasPrices && h('p', { class: 'note' }, icon('info', 16), 'No prices have come in from Smoobu yet. They arrive with the next sync, a few minutes after the app starts.'),
      d.missingTerms > 0 && h('p', { class: 'note' }, icon('alert', 16), `${d.missingTerms} ${d.missingTerms === 1 ? 'flat has' : 'flats have'} no terms yet, so ${d.missingTerms === 1 ? 'its' : 'their'} profit is shown without rent or commission. Press "Set terms" in the table.`),
      h('div', { class: 'tiles' },
        tile(money(t.revenue, c), 'Guests paid', `${t.bookings} ${t.bookings === 1 ? 'booking' : 'bookings'} · ${t.nights} nights`),
        tile(money(t.fees, c), 'Booking-site fees', t.revenue ? `${Math.round((t.fees / t.revenue) * 100)}% of what guests paid` : null),
        tile(money(t.net, c), 'Net revenue', 'Guests paid minus booking-site fees.'),
        tile(money(t.profit, c), 'Our profit', 'After rent, bills, owners\' share, cleaning and expenses.', t.profit < 0 ? 'bad' : 'good'),
        tile(`${t.occupancy}%`, 'Occupancy', t.adr ? `${money(t.adr, c)} average per night` : null)),
      h('section', { class: 'card section' },
        h('h2', null, 'Last 12 months'),
        h('div', { class: 'fin-chart', role: 'img', 'aria-label': `Net revenue and our profit for the twelve months to ${monthName(d.month)}` },
          d.series.map((s) => h('button', { type: 'button', class: `fin-col${s.month === d.month ? ' is-current' : ''}`, title: `${monthName(s.month)}: net revenue ${money(s.net, c)}, our profit ${money(s.profit, c)}`, onclick: () => { month = s.month; load(); } },
            h('span', { class: 'fin-bars' }, bar(s.net, 'fin-net'), bar(s.profit, s.profit < 0 ? 'fin-loss' : 'fin-profit')),
            h('span', { class: 'fin-label' }, monthName(s.month, true))))),
        h('p', { class: 'hint fin-legend' }, h('span', { class: 'fin-key fin-net' }), 'Net revenue ', h('span', { class: 'fin-key fin-profit' }), 'Our profit ', h('span', { class: 'fin-key fin-loss' }), 'Loss · click a month to open it')),
      portfolio(d),
      flatPies(d),
      flatChart(d),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' }, h('h2', null, `By flat · ${monthName(d.month)}`), button('Cleaning per check-in', { icon: 'edit', small: true, onclick: async () => { if (await cleaningDialog(d)) load(); } })),
        d.rows.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data fin-table' },
            h('thead', null, h('tr', null, ['Flat', 'Terms', 'Nights', 'Guests paid', 'Site fees', 'Net', 'Rent / our share', 'Cleaning', 'Bills', 'Expenses', 'Owner gets', 'Our profit', ''].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, d.rows.map((r) => h('tr', null,
              h('th', { scope: 'row' }, h('a', { href: `#/properties/${r.propertyId}` }, r.name),
                r.listings.map((l) => h('div', { class: 'fin-also' }, `+ ${l.name} `, h('button', { type: 'button', class: 'link-button', onclick: async () => {
                  try { await api(`/finance/terms/${l.id}`, { method: 'PUT', body: { model: 'none' } }); toast('Separated. Set its terms if it is a different flat.', { kind: 'ok' }); load(); } catch (err) { showError(err); }
                } }, 'separate')))),
              cell(r.model ? terms(r) : chip('Not set', { tone: 'warn' })),
              cell(`${r.nights} (${r.occupancy}%)`), cell(money(r.revenue, c)), cell(money(r.fees, c)), cell(money(r.net, c)),
              cell(r.model === 'rent' ? `${money(r.rent, c)} rent` : r.model === 'management' ? `${money(r.commission, c)} ours + ${money(r.vat, c)} VAT` : '–'),
              cell(!r.cleans || (!r.cleaningCost && !r.cleaningCharge) ? '–' : r.model === 'management' ? `${r.cleans} × · ${money(r.cleaningCharge, c)} + VAT to owner · ${money(r.cleaningCost, c)} cost` : `${r.cleans} × · ${money(r.cleaningCost, c)} cost`),
              cell(r.bills ? money(r.bills, c) : '–'),
              cell(r.expenses || r.ownerExpenses ? `${money(r.expenses, c)}${r.ownerExpenses ? ` + ${money(r.ownerExpenses, c)} owner` : ''}` : '–'),
              cell(r.ownerPayout == null ? '–' : money(r.ownerPayout, c)),
              cell(h('strong', null, money(r.profit, c)), r.profit < 0 ? 'fin-neg' : 'fin-pos'), cell(edit(r))))),
            h('tfoot', null, h('tr', null, h('th', { scope: 'row' }, 'Total'), cell(''), cell(`${t.nights} (${t.occupancy}%)`), cell(money(t.revenue, c)), cell(money(t.fees, c)), cell(money(t.net, c)),
              cell(`${money(t.rent, c)} rent · ${money(t.commission, c)} ours + ${money(t.vat, c)} VAT`), cell(t.cleaningCost || t.cleaningCharge ? `${money(t.cleaningCharge, c)} + VAT to owners · ${money(t.cleaningCost, c)} cost` : '–'), cell(money(t.bills, c)), cell(`${money(t.expenses, c)}${t.general ? ` (${money(t.general, c)} general)` : ''}`), cell(money(t.ownerPayout, c)),
              cell(h('strong', null, money(t.profit, c)), t.profit < 0 ? 'fin-neg' : 'fin-pos'), cell('')))))
          : h('p', { class: 'muted' }, 'No flats yet.'),
        h('p', { class: 'hint' }, 'A booking that runs across two months is shared between them night by night. Cancelled bookings are left out. Future months show what is booked so far.')),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' }, h('h2', null, `Bills for the flats we rent · ${monthName(d.month)}`), rented.length > 0 && button('Add a bill', { variant: 'primary', icon: 'plus', small: true, onclick: async () => { if (await billDialog(d, rented)) load(); } })),
        !rented.length
          ? h('p', { class: 'muted' }, 'No flat is set as rented by us yet. Set a flat\'s terms to "We rent it" and its bills can be added here.')
          : h('div', { class: 'table-scroll' }, h('table', { class: 'data' },
            h('thead', null, h('tr', null, ['Flat', 'Bill', 'Note', 'Per month', ''].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, rented.flatMap((r) => {
              const ids = [r.propertyId, ...r.listings.map((l) => l.id)];
              const mine = bills.filter((e) => ids.includes(e.propertyId));
              return [
                ...mine.map((e) => h('tr', null, h('th', { scope: 'row' }, r.name), cell(e.category), cell([e.note, e.monthly ? null : ` one payment on ${e.date}`]), cell(money(e.amount, c)), cell(removeBtn(e)))),
                h('tr', { class: 'fin-subtotal' }, h('th', { scope: 'row' }, mine.length ? `${r.name} · total` : r.name), cell(mine.length ? '' : 'No bills entered'), cell(''), cell(h('strong', null, money(r.bills, c))), cell('')),
              ];
            })),
            h('tfoot', null, h('tr', null, h('th', { scope: 'row' }, 'All bills'), cell(''), cell(''), cell(h('strong', null, money(t.bills, c))), cell(''))))),
        h('p', { class: 'hint' }, 'Council tax, energy, water, internet and the like. They count as costs of the flat, next to its rent.')),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' }, h('h2', null, `Expenses · ${monthName(d.month)}`), button('Add an expense', { variant: 'primary', icon: 'plus', small: true, onclick: async () => { if (await expenseDialog(d)) load(); } })),
        others.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data' },
            h('thead', null, h('tr', null, ['Date', 'Flat', 'Type', 'Note', 'Amount', ''].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, others.map((e) => h('tr', null,
              cell(e.monthly ? `Monthly since ${e.date}` : e.date), cell(e.propertyName || 'Business'), cell([e.category, e.owner ? ' ' : null, e.owner ? chip('Owner pays') : null]), cell(e.note || ''), cell(money(e.amount, c)),
              cell(removeBtn(e)))))))
          : h('p', { class: 'muted' }, 'No expenses recorded for this month.')));
  }
  load();
  return { el, onEvent() {} };
}

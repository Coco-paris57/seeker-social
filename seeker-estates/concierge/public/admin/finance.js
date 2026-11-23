// Finance: what each flat brings in. Revenue and booking-site fees come from Smoobu; rent,
// management terms and expenses are entered here. Administrators only.
import { api, busy, button, check, chip, field, fill, h, icon, loadError, loading, openDialog, pageHeader, showError, toast } from './lib.js';

const money = (n, c = '£') => `${n < 0 ? '−' : ''}${c}${Math.abs(Number(n) || 0).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const monthName = (m, short = false) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString('en-GB', { month: short ? 'short' : 'long', year: short ? '2-digit' : 'numeric' });
const shift = (m, by) => { const [y, mo] = m.split('-').map(Number); return new Date(Date.UTC(y, mo - 1 + by, 1)).toISOString().slice(0, 7); };
const CATEGORIES = ['Cleaning', 'Laundry', 'Utilities', 'Internet', 'Council tax', 'Maintenance', 'Supplies', 'Furniture', 'Software', 'Insurance', 'Guest gift', 'Other'];

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
        tile(money(t.profit, c), 'Our profit', 'After rent, owners\' share, cleaning and expenses.', t.profit < 0 ? 'bad' : 'good'),
        tile(`${t.occupancy}%`, 'Occupancy', t.adr ? `${money(t.adr, c)} average per night` : null)),
      h('section', { class: 'card section' },
        h('h2', null, 'Last 12 months'),
        h('div', { class: 'fin-chart', role: 'img', 'aria-label': `Net revenue and our profit for the twelve months to ${monthName(d.month)}` },
          d.series.map((s) => h('button', { type: 'button', class: `fin-col${s.month === d.month ? ' is-current' : ''}`, title: `${monthName(s.month)}: net revenue ${money(s.net, c)}, our profit ${money(s.profit, c)}`, onclick: () => { month = s.month; load(); } },
            h('span', { class: 'fin-bars' }, bar(s.net, 'fin-net'), bar(s.profit, s.profit < 0 ? 'fin-loss' : 'fin-profit')),
            h('span', { class: 'fin-label' }, monthName(s.month, true))))),
        h('p', { class: 'hint fin-legend' }, h('span', { class: 'fin-key fin-net' }), 'Net revenue ', h('span', { class: 'fin-key fin-profit' }), 'Our profit ', h('span', { class: 'fin-key fin-loss' }), 'Loss · click a month to open it')),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' }, h('h2', null, `By flat · ${monthName(d.month)}`), button('Cleaning per check-in', { icon: 'edit', small: true, onclick: async () => { if (await cleaningDialog(d)) load(); } })),
        d.rows.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data fin-table' },
            h('thead', null, h('tr', null, ['Flat', 'Terms', 'Nights', 'Guests paid', 'Site fees', 'Net', 'Rent / our share', 'Cleaning', 'Expenses', 'Owner gets', 'Our profit', ''].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, d.rows.map((r) => h('tr', null,
              h('th', { scope: 'row' }, h('a', { href: `#/properties/${r.propertyId}` }, r.name),
                r.listings.map((l) => h('div', { class: 'fin-also' }, `+ ${l.name} `, h('button', { type: 'button', class: 'link-button', onclick: async () => {
                  try { await api(`/finance/terms/${l.id}`, { method: 'PUT', body: { model: 'none' } }); toast('Separated. Set its terms if it is a different flat.', { kind: 'ok' }); load(); } catch (err) { showError(err); }
                } }, 'separate')))),
              cell(r.model ? terms(r) : chip('Not set', { tone: 'warn' })),
              cell(`${r.nights} (${r.occupancy}%)`), cell(money(r.revenue, c)), cell(money(r.fees, c)), cell(money(r.net, c)),
              cell(r.model === 'rent' ? `${money(r.rent, c)} rent` : r.model === 'management' ? `${money(r.commission, c)} ours + ${money(r.vat, c)} VAT` : '–'),
              cell(!r.cleans || (!r.cleaningCost && !r.cleaningCharge) ? '–' : r.model === 'management' ? `${r.cleans} × · ${money(r.cleaningCharge, c)} + VAT to owner · ${money(r.cleaningCost, c)} cost` : `${r.cleans} × · ${money(r.cleaningCost, c)} cost`),
              cell(r.expenses || r.ownerExpenses ? `${money(r.expenses, c)}${r.ownerExpenses ? ` + ${money(r.ownerExpenses, c)} owner` : ''}` : '–'),
              cell(r.ownerPayout == null ? '–' : money(r.ownerPayout, c)),
              cell(h('strong', null, money(r.profit, c)), r.profit < 0 ? 'fin-neg' : 'fin-pos'), cell(edit(r))))),
            h('tfoot', null, h('tr', null, h('th', { scope: 'row' }, 'Total'), cell(''), cell(`${t.nights} (${t.occupancy}%)`), cell(money(t.revenue, c)), cell(money(t.fees, c)), cell(money(t.net, c)),
              cell(`${money(t.rent, c)} rent · ${money(t.commission, c)} ours + ${money(t.vat, c)} VAT`), cell(t.cleaningCost || t.cleaningCharge ? `${money(t.cleaningCharge, c)} + VAT to owners · ${money(t.cleaningCost, c)} cost` : '–'), cell(`${money(t.expenses, c)}${t.general ? ` (${money(t.general, c)} general)` : ''}`), cell(money(t.ownerPayout, c)),
              cell(h('strong', null, money(t.profit, c)), t.profit < 0 ? 'fin-neg' : 'fin-pos'), cell('')))))
          : h('p', { class: 'muted' }, 'No flats yet.'),
        h('p', { class: 'hint' }, 'A booking that runs across two months is shared between them night by night. Cancelled bookings are left out. Future months show what is booked so far.')),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' }, h('h2', null, `Expenses · ${monthName(d.month)}`), button('Add an expense', { variant: 'primary', icon: 'plus', small: true, onclick: async () => { if (await expenseDialog(d)) load(); } })),
        d.expenses.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data' },
            h('thead', null, h('tr', null, ['Date', 'Flat', 'Type', 'Note', 'Amount', ''].map((x) => h('th', { scope: 'col' }, x)))),
            h('tbody', null, d.expenses.map((e) => h('tr', null,
              cell(e.monthly ? `Monthly since ${e.date}` : e.date), cell(e.propertyName || 'Business'), cell([e.category, e.owner ? ' ' : null, e.owner ? chip('Owner pays') : null]), cell(e.note || ''), cell(money(e.amount, c)),
              cell(removeBtn(e)))))))
          : h('p', { class: 'muted' }, 'No expenses recorded for this month.')));
  }
  load();
  return { el, onEvent() {} };
}

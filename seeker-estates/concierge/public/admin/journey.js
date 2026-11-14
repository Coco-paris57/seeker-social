// Three screens: the weekly tidy-up of what the assistant has learned, messages scheduled
// through a stay, and the paid extras the assistant may offer.
import { api, autoGrow, busy, button, categoryLabel, check, chip, confirmDialog, field, fill, h, icon, loadError, loading, openDialog, pageHeader, showError, toast } from './lib.js';
import { isAdmin, session } from './state.js';

const adminOnly = () => !isAdmin() && h('p', { class: 'note' }, icon('lock', 16), 'Only administrators can change this.');
let properties = null;
async function propertyOptions(selected) {
  properties ||= (await api('/properties')).properties;
  return h('select', null,
    h('option', { value: '' }, 'Every property'),
    properties.map((p) => h('option', { value: String(p.id), selected: p.id === selected }, p.displayName || p.name)));
}

// ---------------------------------------------------------------------------------------
// Weekly tidy-up

function suggestionCard(s, categories, onDone) {
  const question = h('input', { type: 'text', value: s.question, maxLength: 300 });
  const answer = autoGrow(h('textarea', { rows: 3, value: s.answer }));
  const category = h('select', null, categories.map((c) => h('option', { value: c, selected: c === s.category }, categoryLabel(c))));
  const verified = check('Only for guests who have verified their booking', { checked: s.sensitive });
  const accept = button(s.kind === 'update' ? 'Update the entry' : 'Add to knowledge', { variant: 'primary', icon: 'check' });
  const dismiss = button('Dismiss', { icon: 'x' });
  const act = (btn, path, body, done) => busy(btn, async () => {
    try {
      await api(`/suggestions/${s.id}/${path}`, { method: 'POST', body });
      toast(done, { kind: 'ok' });
      onDone();
    } catch (err) {
      showError(err);
      if (err.status === 409) onDone();
    }
  });
  accept.addEventListener('click', () => act(accept, 'accept', { question: question.value, answer: answer.value, category: category.value, sensitive: verified.input.checked }, s.kind === 'update' ? 'Entry updated' : 'Added to the knowledge base'));
  dismiss.addEventListener('click', () => act(dismiss, 'dismiss', {}, 'Dismissed. It will not be suggested again.'));
  return h('article', { class: 'card tidy-card' },
    h('header', { class: 'card-head' },
      h('div', { class: 'card-title' },
        chip(s.kind === 'update' ? 'Entry may be out of date' : 'New entry', { tone: s.kind === 'update' ? 'warn' : 'ok', icon: s.kind === 'update' ? 'alert' : 'plus' }),
        h('strong', null, s.propertyName || 'Every property'))),
    s.reason && h('p', { class: 'muted' }, s.reason),
    s.current && h('div', { class: 'quote' }, h('p', { class: 'label' }, 'Saved now'), h('p', { class: 'pre' }, s.current.answer)),
    field('Topic', question),
    field(s.kind === 'update' ? 'Suggested new text' : 'Answer', answer, { hint: 'Edit freely. This is what the assistant will tell guests.' }),
    h('div', { class: 'form-grid' }, field('Category', category), h('div', { class: 'field' }, verified.wrap)),
    h('div', { class: 'actions' }, accept, dismiss));
}

export function tidyView() {
  const body = h('div', null, loading('Loading suggestions'));
  const run = button('Check now', { icon: 'refresh' });
  const el = h('div', { class: 'page page-narrow' },
    pageHeader('Weekly tidy-up', {
      back: { href: '#/knowledge', label: 'Knowledge' },
      sub: 'Every Monday morning the assistant reads the replies you approved and proposes what to save. Nothing changes until you accept it.',
      actions: [run],
    }),
    body);

  async function load() {
    let d;
    try {
      d = await api('/suggestions');
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    fill(body,
      d.suggestions.length
        ? d.suggestions.map((s) => suggestionCard(s, d.categories, load))
        : h('div', { class: 'card section empty' },
          h('p', null, h('strong', null, 'Nothing to review.')),
          h('p', { class: 'muted' }, d.lastRun ? 'The knowledge base is up to date with the replies you have approved.' : 'The first check runs on Monday morning, or tap "Check now".')));
  }
  run.addEventListener('click', () => busy(run, async () => {
    try {
      const out = await api('/suggestions/run', { method: 'POST', body: {} });
      toast(out.added ? `${out.added} new ${out.added === 1 ? 'suggestion' : 'suggestions'}` : 'Nothing new to suggest', { kind: out.added ? 'ok' : 'info' });
      load();
    } catch (err) {
      showError(err);
    }
  }));
  load();
  return { el, onEvent() {} };
}

// ---------------------------------------------------------------------------------------
// Scheduled messages

const when = (t) => {
  const n = Math.abs(t.days);
  const day = `${n} ${n === 1 ? 'day' : 'days'}`;
  const what = t.anchor === 'departure' ? 'checkout' : 'arrival';
  return `${t.days === 0 ? `On the day of ${what}` : t.days < 0 ? `${day} before ${what}` : `${day} after ${what}`}, at ${t.time}`;
};

async function templateDialog(t, placeholders) {
  const select = await propertyOptions(t?.propertyId ?? null);
  return openDialog({
    title: t ? 'Edit message' : 'New scheduled message',
    wide: true,
    build: (close) => {
      const name = h('input', { type: 'text', value: t?.name || '', maxLength: 80, required: true });
      const anchor = h('select', null, h('option', { value: 'arrival', selected: t?.anchor !== 'departure' }, 'Arrival day'), h('option', { value: 'departure', selected: t?.anchor === 'departure' }, 'Checkout day'));
      const timing = h('select', null,
        [[-14, '14 days before'], [-7, '7 days before'], [-3, '3 days before'], [-2, '2 days before'], [-1, 'The day before'], [0, 'On the day'], [1, 'The day after'], [2, '2 days after'], [3, '3 days after'], [7, '7 days after']]
          .map(([v, label]) => h('option', { value: String(v), selected: (t?.days ?? -3) === v }, label)));
      if (t && !timing.querySelector('option[selected]')) timing.append(h('option', { value: String(t.days), selected: true }, t.days < 0 ? `${-t.days} days before` : `${t.days} days after`));
      const time = h('input', { type: 'time', value: t?.time || '10:00', required: true });
      const text = autoGrow(h('textarea', { rows: 7, value: t?.body || '', required: true }));
      const save = button(t ? 'Save' : 'Add message', { variant: 'primary', type: 'submit', icon: 'check' });
      const form = h('form', { class: 'stack' },
        field('Name (for the team)', name),
        h('div', { class: 'form-grid' }, field('Send', timing), field('Counted from', anchor), field('At (UK time)', time)),
        field('Applies to', select, { hint: 'A message for one property replaces the one for every property at the same moment.' }),
        field('Message', text, { hint: `Filled in for each booking: ${placeholders.map((p) => `{${p}}`).join(' ')}. A message that uses {checkin_link} waits until the booking has its link.` }),
        h('div', { class: 'actions' }, save, button('Cancel', { onclick: () => close() })));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          const body = { name: name.value, anchor: anchor.value, days: Number(timing.value), time: time.value, body: text.value, propertyId: select.value ? Number(select.value) : null };
          try {
            await api(t ? `/templates/${t.id}` : '/templates', { method: t ? 'PATCH' : 'POST', body });
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

export function scheduledView() {
  const body = h('div', null, loading('Loading messages'));
  const addBtn = button('New message', { variant: 'primary', icon: 'plus', disabled: !isAdmin() });
  const el = h('div', { class: 'page page-narrow' },
    pageHeader('Scheduled messages', {
      back: { href: '#/settings', label: 'Settings' },
      sub: 'Messages sent to each guest at set points of their stay, through their booking channel (Airbnb, Booking.com or email).',
      actions: [addBtn],
    }),
    body);
  let placeholders = [];

  async function load() {
    let d;
    try {
      d = await api('/templates');
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    placeholders = d.placeholders;
    const patch = async (t, change, confirm) => {
      if (confirm && !(await confirmDialog(confirm))) return load();
      try {
        await api(`/templates/${t.id}`, { method: 'PATCH', body: change });
        toast('Saved');
      } catch (err) {
        showError(err);
      }
      load();
    };
    fill(body,
      adminOnly(),
      session.smoobuMode !== 'live' && h('p', { class: 'note' }, icon('info', 16), 'Smoobu is not connected, so nothing is sent.'),
      h('p', { class: 'note' }, icon('info', 16), 'If Smoobu or ChargeAutomation already send a message at the same moment, switch one of the two off so guests do not get it twice.'),
      d.templates.map((t) => {
        const on = check('On', {
          switchStyle: true, checked: t.enabled, disabled: !isAdmin(),
          onchange: (e) => patch(t, { enabled: e.target.checked }, e.target.checked && {
            title: `Turn on "${t.name}"?`,
            message: `${when(t)}, each guest ${t.propertyName ? `at ${t.propertyName}` : 'at every property'} gets this message. ${t.auto ? 'It is sent without approval.' : 'It waits in the Inbox until someone approves it.'}`,
            confirmLabel: 'Turn on',
          }),
        });
        const auto = check('Send without approval', {
          switchStyle: true, checked: t.auto, disabled: !isAdmin(),
          onchange: (e) => patch(t, { auto: e.target.checked }, e.target.checked && {
            title: 'Send without approval?',
            message: 'This message will go straight to guests at its scheduled time, with nobody on the team reading it first.',
            confirmLabel: 'Send automatically', danger: true,
          }),
        });
        const edit = button('Edit', { icon: 'edit', small: true, disabled: !isAdmin(), onclick: async () => { if (await templateDialog(t, placeholders)) { toast('Saved'); load(); } } });
        const remove = button('Delete', { icon: 'trash', small: true, variant: 'ghost', disabled: !isAdmin(), onclick: async () => {
          if (!(await confirmDialog({ title: `Delete "${t.name}"?`, message: 'It will no longer be sent. Messages already sent stay in their chats.', confirmLabel: 'Delete', danger: true }))) return;
          try { await api(`/templates/${t.id}`, { method: 'DELETE', body: {} }); toast('Deleted'); } catch (err) { showError(err); }
          load();
        } });
        return h('article', { class: `card template${t.enabled ? '' : ' is-off'}` },
          h('header', { class: 'card-head' },
            h('div', { class: 'card-title' }, h('strong', null, t.name), chip(t.propertyName || 'Every property', { icon: 'home' })),
            h('div', { class: 'card-meta' }, t.sent ? `Sent or queued ${t.sent} ${t.sent === 1 ? 'time' : 'times'}` : null)),
          h('p', { class: 'template-when' }, icon('clock', 16), when(t)),
          h('p', { class: 'pre template-body' }, t.body),
          h('div', { class: 'template-switches' }, on.wrap, auto.wrap),
          h('div', { class: 'actions' }, edit, remove));
      }),
      !d.templates.length && h('div', { class: 'card section empty' }, h('p', { class: 'muted' }, 'No scheduled messages yet.')));
  }
  addBtn.addEventListener('click', async () => {
    try {
      if (await templateDialog(null, placeholders)) { toast('Added. Switch it on when you are ready.', { kind: 'ok' }); load(); }
    } catch (err) {
      showError(err);
    }
  });
  load();
  return { el, onEvent() {} };
}

// ---------------------------------------------------------------------------------------
// Paid extras

const EXTRA = {
  early_checkin: { label: 'Early check-in', priceHint: 'From ChargeAutomation', detailsHint: 'For example: from 13:00', rule: 'Offered only when nobody is checking out that morning.' },
  late_checkout: { label: 'Late checkout', priceHint: 'From ChargeAutomation', detailsHint: 'For example: until 13:00', rule: 'Offered only when nobody is arriving that day.' },
  extra_night: { label: 'Extra night at the end of the stay', priceHint: 'From ChargeAutomation', detailsHint: 'For example: subject to confirmation', rule: 'Offered only when the following night is free.' },
};

const money = (s) => (s.amount == null ? 'price not seen' : `${s.currency || '£'}${s.amount}${s.qty > 1 ? ` for ${s.qty}` : ''}`);

function extraForm(type, row, propertyId, reload, seen) {
  const meta = EXTRA[type];
  const last = seen.find((s) => s.type === type && (!propertyId || s.propertyId === propertyId));
  const on = check(meta.label, { switchStyle: true, checked: !!row?.enabled, disabled: !isAdmin() });
  const price = h('input', { type: 'text', value: row?.price || '', maxLength: 60, placeholder: meta.priceHint, disabled: !isAdmin() });
  const details = h('input', { type: 'text', value: row?.details || '', maxLength: 300, placeholder: meta.detailsHint, disabled: !isAdmin() });
  const save = button('Save', { variant: 'primary', small: true, type: 'submit', disabled: !isAdmin() });
  const form = h('form', { class: 'extra-form' },
    on.wrap,
    h('p', { class: 'hint' }, meta.rule),
    last && h('p', { class: 'seen-price' }, icon('info', 16), `Last charged in ChargeAutomation: ${money(last)} (${last.title}, ${last.propertyName}).`),
    h('div', { class: 'form-grid' }, field('Price (optional)', price, { hint: 'Leave empty to use the price on the guest\'s ChargeAutomation check-in page.' }), field('Conditions', details)),
    h('div', { class: 'actions' }, save,
      row && propertyId && button('Use the setting for every property', { small: true, variant: 'ghost', onclick: async () => {
        try { await api(`/offers/${row.id}`, { method: 'DELETE', body: {} }); toast('Removed'); } catch (err) { showError(err); }
        reload();
      } })));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    busy(save, async () => {
      try {
        await api('/offers', { method: 'PUT', body: { type, propertyId, price: price.value, details: details.value, enabled: on.input.checked } });
        toast(on.input.checked ? `${meta.label} saved and on` : `${meta.label} is off`, { kind: 'ok' });
        reload();
      } catch (err) {
        showError(err);
      }
    });
  });
  return form;
}

export function extrasView() {
  const body = h('div', null, loading('Loading extras'));
  const el = h('div', { class: 'page page-narrow' },
    pageHeader('Paid extras', {
      back: { href: '#/settings', label: 'Settings' },
      sub: 'What the assistant may offer when a guest asks to arrive early, leave late or stay longer. It checks the calendar, then sends the guest to their ChargeAutomation check-in page to add and pay for it. Prices come from ChargeAutomation unless you type one here.',
    }),
    body);
  let picker = null;

  async function load() {
    let d;
    try {
      d = await api('/offers');
      picker ||= await propertyOptions(null);
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    const propertyId = picker.value ? Number(picker.value) : null;
    const rows = d.offers.filter((o) => o.propertyId === propertyId);
    const overrides = d.offers.filter((o) => o.propertyId != null);
    fill(body,
      adminOnly(),
      h('section', { class: 'card section' },
        field('Settings for', picker, { hint: propertyId ? 'Anything saved here replaces the setting for every property, for this property only.' : 'These apply to every property unless a property has its own.' }),
        d.types.map((type) => extraForm(type, rows.find((o) => o.type === type), propertyId, load, d.seen))),
      h('section', { class: 'card section' },
        h('h2', null, 'Seen in ChargeAutomation'),
        h('p', { class: 'hint' }, 'Extras guests have bought or requested on their check-in page. The assistant may mention these to guests at the same property, with the last single-item price.'),
        d.seen.length
          ? h('ul', { class: 'plain-list' }, d.seen.map((s) => h('li', null, h('strong', null, s.title), ` · ${money(s)} · ${s.propertyName}`)))
          : h('p', { class: 'muted' }, session.chargeAutomationWebhook
            ? 'Nothing yet. This fills in as guests buy extras, once the "Upsell Purchased" and "Upsell Requested" webhooks in ChargeAutomation point to the address shown in Settings.'
            : 'Nothing yet.')),
      overrides.length > 0 && h('section', { class: 'card section' },
        h('h2', null, 'Properties with their own settings'),
        h('ul', { class: 'plain-list' }, overrides.map((o) => h('li', null, h('strong', null, o.propertyName), ` · ${EXTRA[o.type].label}: ${o.enabled ? `${o.price}${o.details ? ` (${o.details})` : ''}` : 'off'}`)))));
  }
  load().then(() => picker?.addEventListener('change', load));
  return { el, onEvent() {} };
}

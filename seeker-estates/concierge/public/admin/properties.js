// Properties: list with learning/auto mode and approval stats, and the property screen
// (guest-facing facts, QR code, knowledge base with a coverage checklist).
import { api, busy, button, check, chip, confirmDialog, field, fill, h, icon, loadError, loading, pageHeader, showError, toast, uid } from './lib.js';
import { knowledgeEditor } from './knowledge.js';
import { session } from './state.js';

const MODES = { learning: { label: 'Learning', icon: 'eye' }, auto: { label: 'Auto', icon: 'bolt' } };
// Below these, switching to auto gets a plain warning in the confirmation.
const MIN_REVIEWED = 10;
const MIN_RATE = 80;

/** "18 of 20 approved unchanged (90%)" plus what happened to the rest. */
function statsText(stats) {
  if (!stats.reviewed) return `No drafts reviewed in the last ${stats.days} days`;
  return `${stats.approved} of ${stats.reviewed} approved unchanged (${stats.approvalRate}%)`;
}

function statsBlock(stats) {
  const rest = [
    stats.edited && `${stats.edited} edited`,
    stats.rejected && `${stats.rejected} rejected`,
    stats.automatic && `${stats.automatic} sent automatically`,
  ].filter(Boolean).join(', ');
  const bar = h('span', { class: 'meter-fill' });
  bar.style.width = `${stats.approvalRate ?? 0}%`;
  return h('div', { class: 'stats' },
    h('p', null, h('strong', null, statsText(stats))),
    stats.reviewed ? h('div', { class: 'meter', 'aria-hidden': 'true' }, bar) : null,
    h('p', { class: 'muted' }, rest ? `Last ${stats.days} days: ${rest}.` : `Last ${stats.days} days.`));
}

/** Ask before a property starts answering on its own, with the evidence and any doubts spelled out. */
function confirmAuto(property) {
  const { stats } = property;
  const warnings = [];
  if (!stats.reviewed) warnings.push(`No drafts have been reviewed for this property in the last ${stats.days} days, so there is no evidence yet that the assistant answers well here.`);
  else {
    if (stats.reviewed < MIN_REVIEWED) warnings.push(`Only ${stats.reviewed} ${stats.reviewed === 1 ? 'draft has' : 'drafts have'} been reviewed. That is a small sample to judge by.`);
    if (stats.approvalRate < MIN_RATE) warnings.push(`The team edited or rejected ${stats.edited + stats.rejected} of ${stats.reviewed} drafts. The assistant may not be ready to answer on its own here.`);
  }
  return confirmDialog({
    title: `Switch ${property.displayName} to auto?`,
    message: 'In auto mode, answers the assistant is confident about go to guests straight away, without anyone on the team checking them first. Maintenance and urgent issues still come to the team.',
    details: h('div', null,
      statsBlock(stats),
      warnings.map((w) => h('p', { class: 'warning' }, icon('alert', 18), h('span', null, w)))),
    confirmLabel: warnings.length ? 'Switch to auto anyway' : 'Switch to auto',
  });
}

/** Learning / Auto / Default control for one property. Calls onChange(property) after saving. */
function modeControl(property, defaultMode, onChange) {
  const name = uid('mode');
  const current = property.mode || 'default';
  const options = [
    { value: 'learning', label: 'Learning', icon: 'eye' },
    { value: 'auto', label: 'Auto', icon: 'bolt' },
    { value: 'default', label: `Default (${MODES[defaultMode].label.toLowerCase()})` },
  ];
  const group = h('fieldset', { class: 'segmented' },
    h('legend', { class: 'visually-hidden' }, `Mode for ${property.displayName}`),
    options.map((o) => h('label', null,
      h('input', { type: 'radio', name, value: o.value, checked: o.value === current }),
      h('span', null, o.icon && icon(o.icon, 16), o.label))));
  group.addEventListener('change', async (e) => {
    const value = e.target.value;
    const becomesAuto = (value === 'default' ? defaultMode : value) === 'auto' && property.effectiveMode !== 'auto';
    const revert = () => { group.querySelector(`input[value="${current}"]`).checked = true; };
    if (becomesAuto && !(await confirmAuto(property))) return revert();
    try {
      const out = await api(`/properties/${property.id}`, { method: 'PATCH', body: { mode: value === 'default' ? null : value } });
      toast(`${property.displayName} is now in ${MODES[out.property.effectiveMode].label.toLowerCase()} mode.`, { kind: 'ok' });
      onChange(out.property);
    } catch (err) {
      revert();
      showError(err);
    }
    return undefined;
  });
  return group;
}

const modeChip = (mode) => chip(mode === 'auto' ? 'Auto: confident answers go out directly' : 'Learning: every answer is approved first', { tone: mode === 'auto' ? 'navy' : 'neutral', icon: MODES[mode].icon });

function activeSwitch(property, onChange) {
  const box = check('Active', { switchStyle: true, checked: property.active });
  box.input.setAttribute('aria-label', `${property.displayName} active`);
  box.input.addEventListener('change', async () => {
    try {
      const out = await api(`/properties/${property.id}`, { method: 'PATCH', body: { active: box.input.checked } });
      toast(out.property.active ? 'Property is active. Its QR code works.' : 'Property is inactive. Its QR code is switched off.', { kind: 'ok' });
      onChange(out.property);
    } catch (err) {
      box.input.checked = !box.input.checked;
      showError(err);
    }
  });
  return box.wrap;
}

/** Properties list. */
export function propertiesView() {
  const body = h('div', null, loading('Loading properties'));
  const sync = button('Sync from Smoobu', { icon: 'refresh' });
  sync.addEventListener('click', () => busy(sync, async () => {
    try {
      const out = await api('/properties/sync', { method: 'POST' });
      toast(`Synced ${out.properties} properties and ${out.reservations} reservations from Smoobu.`, { kind: 'ok' });
      load();
    } catch (err) {
      showError(err);
    }
  }));
  const el = h('div', { class: 'page' },
    pageHeader('Properties', {
      sub: session.smoobuMode === 'live' ? 'Properties and bookings come from Smoobu.' : 'Smoobu is not connected, so properties are not synced.',
      actions: session.smoobuMode === 'live' ? [sync] : [],
    }),
    body);

  function card(p, defaultMode) {
    return h('li', { class: p.active ? 'card property' : 'card property property-inactive', dataset: { id: p.id } },
      h('div', { class: 'property-head' },
        h('div', null,
          h('h2', null, h('a', { href: `#/properties/${p.id}` }, p.displayName)),
          h('p', { class: 'muted' }, [p.ref, p.area, p.postcode].filter(Boolean).join(' · '))),
        activeSwitch(p, load)),
      modeControl(p, defaultMode, load),
      h('p', null, modeChip(p.effectiveMode)),
      statsBlock(p.stats),
      h('p', { class: 'property-foot' },
        h('span', null, icon('book', 16), ` ${p.knowledgeCount} knowledge ${p.knowledgeCount === 1 ? 'entry' : 'entries'}`),
        h('a', { href: `#/properties/${p.id}` }, 'Details, QR code and knowledge')));
  }

  async function load() {
    try {
      const { properties, defaultMode } = await api('/properties');
      // Re-rendering replaces the control that was just used; put keyboard focus back on it.
      const focused = document.activeElement?.closest?.('.property');
      const selector = focused && (document.activeElement.type === 'radio' ? 'input[type="radio"]:checked' : 'input[type="checkbox"]');
      fill(body, properties.length
        ? h('ul', { class: 'property-grid' }, properties.map((p) => card(p, defaultMode)))
        : h('div', { class: 'empty' }, icon('home', 28), h('p', null, 'No properties yet.'), h('p', null, 'They appear here after the first sync from Smoobu.')));
      if (focused) body.querySelector(`.property[data-id="${focused.dataset.id}"] ${selector}`)?.focus();
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
    }
  }
  load();

  return {
    el,
    // Stats move as drafts are approved elsewhere.
    onEvent(type) { if (['properties', 'draft', 'reconnect'].includes(type)) load(); },
  };
}

// Topics every property should cover. `test` looks through the property's entries: by category,
// or by the entry's topic line (a passing mention inside another answer does not count).
const inCategory = (c) => (k) => k.category === c;
const mentions = (re) => (k) => re.test(k.question.toLowerCase());
const CHECKLIST = [
  { label: 'Check-in', category: 'checkin', question: 'Check-in time and how to check in', test: inCategory('checkin') },
  { label: 'Access (door, keys)', category: 'access', question: 'Door code and keys', test: inCategory('access') },
  { label: 'WiFi', category: 'wifi', question: 'WiFi network and password', test: inCategory('wifi') },
  { label: 'TV', category: 'appliances', question: 'How to use the TV', test: mentions(/\b(tv|television)\b/) },
  { label: 'Washing machine', category: 'appliances', question: 'How to use the washing machine', test: mentions(/wash(ing|er)/) },
  { label: 'Heating', category: 'appliances', question: 'How to use the heating', test: mentions(/heating|thermostat|radiator|boiler/) },
  { label: 'Bins', category: 'rules', question: 'Bins and recycling', test: mentions(/\bbins?\b|rubbish|recycl|refuse/) },
  { label: 'Checkout', category: 'checkout', question: 'Checkout', test: inCategory('checkout') },
  { label: 'Nearest station', category: 'transport', question: 'Nearest station', test: inCategory('transport') },
];

/** One property: mode, facts, QR code and knowledge. */
export function propertyView({ id }) {
  const body = h('div', null, loading('Loading the property'));
  const el = h('div', { class: 'page' }, body);

  function factsForm(p) {
    const inputs = {
      displayName: h('input', { type: 'text', value: p.displayName || '' }),
      area: h('input', { type: 'text', value: p.area || '' }),
      postcode: h('input', { type: 'text', value: p.postcode || '', autocapitalize: 'characters' }),
      address: h('textarea', { rows: 2, value: p.address || '' }),
      station: h('input', { type: 'text', value: p.station || '' }),
      notes: h('textarea', { rows: 3, value: p.notes || '' }),
    };
    const save = button('Save facts', { variant: 'primary', type: 'submit' });
    const form = h('form', { class: 'form form-grid' },
      field('Name shown to guests', inputs.displayName),
      field('Area', inputs.area),
      field('Postcode', inputs.postcode),
      field('Nearest station', inputs.station),
      h('div', { class: 'span-2' }, field('Address', inputs.address)),
      h('div', { class: 'span-2' }, field('Notes for the assistant', inputs.notes, { hint: 'Short facts about the flat: size, floor, lift, parking.' })),
      h('div', { class: 'span-2 actions' }, save));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      busy(save, async () => {
        try {
          await api(`/properties/${id}`, { method: 'PATCH', body: Object.fromEntries(Object.entries(inputs).map(([k, input]) => [k, input.value.trim()])) });
          toast('Property facts saved.', { kind: 'ok' });
          el.querySelector('h1').textContent = inputs.displayName.value.trim() || p.name;
        } catch (err) {
          showError(err);
        }
      });
    });
    return form;
  }

  function qrSection(p) {
    const base = `/api/admin/properties/${id}`;
    // The image address stays the same when the code is regenerated, so the guest link busts the cache.
    const img = h('img', { class: 'qr', src: `${base}/qr.svg?v=${encodeURIComponent(p.guestUrl)}`, alt: `QR code for ${p.displayName}`, width: 180, height: 180 });
    const link = h('input', { type: 'text', readOnly: true, value: p.guestUrl, 'aria-label': 'Guest link', class: 'guest-link' });
    const copy = button('Copy guest link', { icon: 'copy' });
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(p.guestUrl);
        toast('Guest link copied.', { kind: 'ok' });
      } catch {
        // Clipboard access can be refused; select the text so it can be copied by hand.
        link.focus();
        link.select();
        toast('Copy was not allowed. The link is selected so you can copy it.', { kind: 'info' });
      }
    });
    const rotate = button('Regenerate code', { variant: 'danger', icon: 'refresh' });
    rotate.addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: 'Regenerate the QR code?',
        message: 'The current code and guest link stop working straight away. Every printed card and poster in the property must be replaced with the new one.',
        confirmLabel: 'Regenerate code', danger: true,
      });
      if (!ok) return;
      try {
        await api(`/properties/${id}/rotate-qr`, { method: 'POST' });
        toast('New QR code issued. Print and replace the old cards.', { kind: 'ok' });
        load();
      } catch (err) {
        showError(err);
      }
    });
    const linkBtn = (label, href, iconName, extra) => h('a', { class: 'btn btn-secondary', href, ...extra }, icon(iconName, 18), h('span', null, label));
    return h('div', { class: 'qr-section' },
      img,
      h('div', { class: 'qr-side' },
        h('p', null, 'Guests scan this code in the property to open the chat. No app is needed.'),
        link,
        h('div', { class: 'actions' },
          linkBtn('Download PNG', `${base}/qr.png?download=1`, 'download', { download: '' }),
          linkBtn('Download SVG', `${base}/qr.svg?download=1`, 'download', { download: '' }),
          linkBtn('Open print poster', `${base}/poster`, 'print', { target: '_blank', rel: 'noopener' }),
          copy, rotate)));
  }

  async function load() {
    let data;
    let defaultMode;
    try {
      [data, { defaultMode }] = await Promise.all([api(`/properties/${id}`), api('/properties')]);
    } catch (err) {
      if (err.status === 401) return;
      fill(body, err.status === 404
        ? h('div', { class: 'empty' }, icon('info', 28), h('p', null, 'This property was not found.'), h('a', { class: 'btn btn-secondary', href: '#/properties' }, 'All properties'))
        : loadError(err, load));
      return;
    }
    const p = data.property;
    const examples = data.examples || [];
    const checklist = h('div', { class: 'checklist' });
    const editor = knowledgeEditor({
      propertyId: p.id, propertyName: p.displayName,
      onLoaded(entries) {
        const missing = CHECKLIST.filter((topic) => !entries.some(topic.test));
        fill(checklist,
          h('h3', null, `Coverage: ${CHECKLIST.length - missing.length} of ${CHECKLIST.length} topics`),
          h('ul', null, CHECKLIST.map((topic) => {
            const done = !missing.includes(topic);
            return h('li', { class: done ? 'done' : 'todo' },
              icon(done ? 'check' : 'plus', 16),
              h('span', null, topic.label, h('span', { class: 'visually-hidden' }, done ? ' (covered)' : ' (missing)')),
              !done && button('Add', { small: true, 'aria-label': `Add ${topic.label}`, onclick: () => editor.add({ category: topic.category, question: topic.question }) }));
          })));
      },
    });
    const count = (n, one, many) => (n == null ? null : `${n} ${n === 1 ? one : many}`);
    const rooms = p.rooms && [count(p.rooms.bedrooms, 'bedroom', 'bedrooms'), count(p.rooms.bathrooms, 'bathroom', 'bathrooms'), count(p.rooms.maxOccupancy, 'guest maximum', 'guests maximum')].filter(Boolean).join(', ');
    const section = (title, ...content) => h('section', { class: 'card section' }, h('h2', null, title), content);

    fill(body,
      pageHeader(p.displayName, {
        back: { href: '#/properties', label: 'All properties' },
        sub: [p.ref, p.name !== p.displayName && p.name, p.active ? null : 'Inactive'].filter(Boolean).join(' · '),
      }),
      section('Mode',
        modeControl(p, defaultMode, () => load().then(() => body.querySelector('.segmented input:checked')?.focus())),
        h('p', null, modeChip(p.effectiveMode)),
        statsBlock(p.stats)),
      section('QR code for guests', qrSection(p)),
      section('Facts the assistant tells guests', factsForm(p)),
      section('From Smoobu',
        rooms && h('p', null, rooms),
        p.amenities.length ? h('ul', { class: 'amenities' }, p.amenities.map((a) => h('li', null, a))) : h('p', { class: 'muted' }, 'No amenities have been synced for this property.'),
        h('p', { class: 'hint' }, 'Read-only. Change these in Smoobu and sync.')),
      h('section', { class: 'card section' },
        h('div', { class: 'section-head' },
          h('h2', null, 'Knowledge base'),
          button('Add entry', { variant: 'primary', icon: 'plus', onclick: () => editor.add() })),
        checklist, editor.el),
      h('section', { class: 'card section' },
        h('h2', null, `Approved replies (${examples.length})`),
        h('p', { class: 'hint' }, 'Every reply you approve or write for this property is kept here, and the assistant uses them to learn what is right for this property and how you word it. Remove one if it is out of date.'),
        examples.length
          ? h('ul', { class: 'example-list' }, examples.map((e) => h('li', null,
            h('p', { class: 'example-q' }, e.question),
            h('p', { class: 'example-a' }, e.answer),
            h('p', { class: 'example-meta' },
              [e.edited ? 'Corrected by the team' : 'Approved as drafted', e.approvedBy, new Date(e.at).toLocaleDateString(), e.verifiedOnly && 'verified guests only'].filter(Boolean).join(' · ')),
            button('Remove', { icon: 'trash', onclick: async () => {
              if (!(await confirmDialog({ title: 'Remove this approved reply?', message: 'The assistant will stop using it. The message already sent to the guest is not affected.', confirmLabel: 'Remove', danger: true }))) return;
              try {
                await api(`/examples/${e.id}`, { method: 'DELETE' });
                toast('Removed');
                load();
              } catch (err) {
                showError(err);
              }
            } }))))
          : h('p', { class: 'muted' }, 'None yet. They appear as you approve replies in the Inbox.')));
    reloadKnowledge = editor.reload;
  }

  let reloadKnowledge = () => {};
  load();

  return {
    el,
    // A team answer with "save to knowledge base" adds a learned entry here.
    onEvent(type) { if (type === 'ticket' || type === 'draft') reloadKnowledge(); },
  };
}

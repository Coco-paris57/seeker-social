// Command palette: Ctrl or Cmd + K opens one box to jump anywhere or do something. It searches
// the screens, the properties, guests' chats and a few actions.
import { api, h, icon, showError, toast } from './lib.js';
import { getLook, setLook } from './look.js';

const PAGES = [
  ['Dashboard', '#/dashboard', 'home'], ['Inbox', '#/inbox', 'inbox'], ['Chats', '#/conversations', 'chat'], ['To do', '#/todo', 'check'], ['Calendar', '#/calendar', 'bookmark'],
  ['Properties', '#/properties', 'shield'], ['Knowledge', '#/knowledge', 'book'], ['Knowledge suggestions', '#/tidy', 'bolt'], ['Insights', '#/insights', 'eye'],
  ['Scheduled messages', '#/scheduled', 'clock'], ['Paid extras', '#/extras', 'plus'], ['Settings', '#/settings', 'sliders'],
];
let properties = null;
let open = false;

export function openPalette() {
  if (open) return;
  open = true;
  const input = h('input', { type: 'text', placeholder: 'Search guests, properties, screens and actions', autocomplete: 'off', role: 'combobox', 'aria-expanded': 'true', 'aria-controls': 'palette-list', 'aria-label': 'Search' });
  const list = h('ul', { class: 'palette-list', id: 'palette-list', role: 'listbox' });
  const dialog = h('dialog', { class: 'dialog palette', 'aria-label': 'Search and commands' },
    h('div', { class: 'palette-input' }, icon('search', 20), input, h('kbd', null, 'Esc')),
    list,
    h('div', { class: 'palette-foot' }, h('span', null, h('kbd', null, '↑'), ' ', h('kbd', null, '↓'), ' to move'), h('span', null, h('kbd', null, 'Enter'), ' to open')));
  let items = [];
  let active = 0;
  let chats = [];
  let asked = 0;
  const go = (hash) => () => { location.hash = hash; };
  const actions = () => {
    const look = getLook();
    return [
      { group: 'Actions', title: 'Sync with Smoobu now', sub: 'Bookings and properties', icon: 'refresh', run: async () => { try { const r = await api('/properties/sync', { method: 'POST', body: {} }); toast(`Synced: ${r.properties ?? 0} properties, ${r.reservations ?? 0} bookings.`, { kind: 'ok' }); } catch (err) { showError(err); } } },
      { group: 'Actions', title: look.motion ? 'Turn animations off' : 'Turn animations on', sub: 'Appearance', icon: 'bolt', run: () => { setLook({ motion: !look.motion }); toast(look.motion ? 'Animations off.' : 'Animations on.'); } },
      { group: 'Actions', title: look.compact ? 'Turn compact mode off' : 'Turn compact mode on', sub: 'Appearance', icon: 'sliders', run: () => { setLook({ compact: !look.compact }); toast(look.compact ? 'Compact mode off.' : 'Compact mode on.'); } },
    ];
  };
  const match = (text, q) => q.split(/\s+/).every((w) => text.toLowerCase().includes(w));
  function render() {
    const q = input.value.trim().toLowerCase();
    const pages = PAGES.filter(([t]) => !q || match(t, q)).map(([title, hash, i]) => ({ group: 'Go to', title, icon: i, run: go(hash) }));
    const props = (properties || []).filter((p) => q && match(`${p.name} ${p.displayName || ''} ${p.area || ''} ${p.postcode || ''}`, q)).slice(0, 6)
      .map((p) => ({ group: 'Properties', title: p.name, sub: [p.area, p.postcode].filter(Boolean).join(' · '), icon: 'shield', run: go(`#/properties/${p.id}`) }));
    const guests = chats.slice(0, 7).map((c) => ({ group: 'Guests', title: c.guestName || 'Unverified guest', sub: [c.propertyName, c.lastMessage?.text].filter(Boolean).join(' · '), icon: 'chat', run: go(`#/conversations/${c.id}`) }));
    items = [...guests, ...props, ...pages, ...actions().filter((a) => !q || match(a.title, q))];
    active = Math.min(active, Math.max(0, items.length - 1));
    list.replaceChildren();
    let group = null;
    items.forEach((it, i) => {
      if (it.group !== group) { group = it.group; list.append(h('li', { class: 'palette-group', role: 'presentation' }, group)); }
      const li = h('li', { class: 'palette-item', role: 'option', id: `palette-${i}`, 'aria-selected': String(i === active) }, h('span', { class: 'more-icon' }, icon(it.icon, 18)), h('span', null, h('strong', null, it.title), it.sub && h('small', null, it.sub)));
      li.addEventListener('click', () => choose(i));
      li.addEventListener('pointermove', () => { if (active !== i) { active = i; mark(); } });
      list.append(li);
    });
    if (!items.length) list.append(h('li', { class: 'palette-empty', role: 'presentation' }, 'Nothing matches. Try a guest name, a property or a screen.'));
    input.setAttribute('aria-activedescendant', items.length ? `palette-${active}` : '');
  }
  function mark() {
    list.querySelectorAll('.palette-item').forEach((li, i) => li.setAttribute('aria-selected', String(i === active)));
    list.querySelector(`#palette-${active}`)?.scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', `palette-${active}`);
  }
  function choose(i) {
    const it = items[i];
    if (!it) return;
    dialog.close();
    it.run();
  }
  let timer = null;
  input.addEventListener('input', () => {
    active = 0;
    render();
    clearTimeout(timer);
    const q = input.value.trim();
    if (q.length < 2) { chats = []; return; }
    const mine = ++asked;
    // Guests and their messages are searched on the server, a moment after typing stops.
    timer = setTimeout(async () => {
      try {
        const out = await api(`/conversations?q=${encodeURIComponent(q)}`);
        if (mine === asked) { chats = out.conversations || []; render(); }
      } catch { /* the rest of the list still works */ }
    }, 220);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(items.length - 1, active + 1); mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(0, active - 1); mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(active); }
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); }); // a click on the backdrop
  dialog.addEventListener('close', () => { open = false; clearTimeout(timer); dialog.remove(); });
  document.body.append(dialog);
  dialog.showModal();
  render();
  input.focus();
  if (!properties) api('/properties').then((r) => { properties = r.properties; render(); }).catch(() => {});
}

/** Ctrl or Cmd + K anywhere in the team app. */
export function watchPaletteKey(isSignedIn) {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k' && isSignedIn()) { e.preventDefault(); openPalette(); }
  });
}

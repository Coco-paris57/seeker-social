// Seeker Concierge team app: start-up, sign-in state, navigation, routing and live updates.
import { api, fill, h, icon, loading, onUnauthorized, refreshTimes, showError, toast, openDialog } from './lib.js';
import { inbox, isAdmin, session } from './state.js';
import { financeView } from './finance.js';
import { authView } from './auth.js';
import { inboxView } from './inbox.js';
import { conversationsView } from './conversations.js';
import { propertiesView, propertyView } from './properties.js';
import { knowledgeView } from './knowledge.js';
import { settingsView } from './settings.js';
import { insightsView } from './insights.js';
import { extrasView, scheduledView, tidyView } from './journey.js';
import { todoView } from './planner.js';
import { calendarView } from './calendar.js';
import { dashboardView } from './dashboard.js';
import { applyLook, getLook } from './look.js';
import { openPalette, watchPaletteKey } from './palette.js';
import { disablePush, registerServiceWorker, syncSubscription } from './push.js';

const root = document.getElementById('app');
const TITLE = 'Seeker Concierge';

const NAV = [
  { key: 'dashboard', href: '#/dashboard', label: innerWidth < 900 ? 'Home' : 'Dashboard', icon: 'home' },
  { key: 'inbox', href: '#/inbox', label: 'Inbox', icon: 'inbox' },
  { key: 'conversations', href: '#/conversations', label: 'Chats', icon: 'chat' },
  { key: 'todo', href: '#/todo', label: 'To do', icon: 'check' },
  { key: 'calendar', href: '#/calendar', label: 'Calendar', icon: 'bookmark' }, // side menu on wide screens; on phones it is under Properties
  { key: 'properties', href: '#/properties', label: 'Properties', icon: 'shield' },
  { key: 'knowledge', href: '#/knowledge', label: 'Knowledge', icon: 'book' },
  { key: 'insights', href: '#/insights', label: 'Insights', icon: 'eye' }, // side menu on wide screens; on phones it is under Properties and Settings
  { key: 'finance', href: '#/finance', label: 'Finance', icon: 'bolt', admin: true }, // administrators only
];

/** Hash to screen. Notifications link to #/inbox, #/tickets/<id> and #/conversations/<id>. */
function parseRoute() {
  const [name = 'inbox', id] = location.hash.replace(/^#\/?/, '').split('/');
  const num = /^\d+$/.test(id || '') ? Number(id) : null;
  switch (name) {
    case 'tickets': return { nav: 'inbox', view: 'inbox', title: 'Inbox', params: { ticketId: num } };
    case 'conversations': return { nav: 'conversations', view: 'conversations', title: 'Conversations', params: { id: num } };
    case 'properties': return num
      ? { nav: 'properties', view: `property-${num}`, title: 'Property', params: { id: num } }
      : { nav: 'properties', view: 'properties', title: 'Properties', params: {} };
    case 'insights': return { nav: 'insights', view: 'insights', title: 'Insights', params: {} };
    case 'finance': return { nav: 'finance', view: 'finance', title: 'Finance', params: {} };
    case 'calendar': return { nav: 'calendar', view: 'calendar', title: 'Calendar', params: {} };
    case 'todo': return { nav: 'todo', view: 'todo', title: 'To do', params: {} };
    case 'tidy': return { nav: 'knowledge', view: 'tidy', title: 'Weekly tidy-up', params: {} };
    case 'scheduled': return { nav: 'settings', view: 'scheduled', title: 'Scheduled messages', params: {} };
    case 'extras': return { nav: 'settings', view: 'extras', title: 'Paid extras', params: {} };
    case 'knowledge': return { nav: 'knowledge', view: 'knowledge', title: 'Knowledge', params: {} };
    case 'settings': return { nav: 'settings', view: 'settings', title: 'Settings', params: {} };
    case 'inbox': return { nav: 'inbox', view: 'inbox', title: 'Inbox', params: {} };
    default: return { nav: 'dashboard', view: 'dashboard', title: 'Dashboard', params: {} };
  }
}

function createView(route) {
  if (route.view === 'inbox') return inboxView(route.params);
  if (route.view === 'conversations') return conversationsView(route.params);
  if (route.view === 'properties') return propertiesView();
  if (route.view.startsWith('property-')) return propertyView(route.params);
  if (route.view === 'insights') return insightsView();
  if (route.view === 'finance') return financeView();
  if (route.view === 'dashboard') return dashboardView();
  if (route.view === 'calendar') return calendarView();
  if (route.view === 'todo') return todoView();
  if (route.view === 'tidy') return tidyView();
  if (route.view === 'scheduled') return scheduledView();
  if (route.view === 'extras') return extrasView();
  if (route.view === 'knowledge') return knowledgeView();
  return settingsView({ onSignOut: signOut });
}

// --- signed-in shell ----------------------------------------------------------------------

let shell = null; // { main, links, badges, offline } while signed in
let current = null; // { name, view } of the screen on show
let stream = null;
let streamRetry = null;
let pendingEvents = new Map(); // event type -> data, flushed together

let todoBadge = null; // count of suggested messages on the To do tab
let unreadBadge = null; // count of unread chats on the Chats tab

function buildShell() {
  const badges = [];
  const links = NAV.filter((item) => !item.admin || isAdmin()).map((item) => {
    const badge = ['inbox', 'conversations', 'todo'].includes(item.key) ? h('span', { class: 'badge', hidden: true }) : null;
    if (item.key === 'todo') todoBadge = badge;
    if (item.key === 'inbox') badges.push(badge);
    if (item.key === 'conversations') unreadBadge = badge;
    return h('a', { href: item.href, dataset: { nav: item.key } }, h('span', { class: 'nav-icon' }, icon(item.icon, 22), badge), h('span', { class: 'nav-label' }, item.label));
  });
  // Phone only: everything that does not fit the bar, one tap away.
  const moreLink = h('a', { href: '#/more', dataset: { nav: 'more' }, 'aria-haspopup': 'dialog' }, h('span', { class: 'nav-icon' }, icon('sliders', 22)), h('span', { class: 'nav-label' }, 'More'));
  moreLink.addEventListener('click', (e) => {
    e.preventDefault();
    openDialog({
      title: 'More', sheet: true,
      build: (close) => h('div', { class: 'more-sheet' },
        h('button', { type: 'button', class: 'btn btn-secondary more-search', onclick: () => { close(); openPalette(); } }, icon('search', 18), h('span', null, 'Search guests, properties and screens')),
        h('div', { class: 'more-grid' }, [['#/calendar', 'bookmark', 'Calendar'], ['#/properties', 'shield', 'Properties'], ['#/knowledge', 'book', 'Knowledge'], ['#/insights', 'eye', 'Insights'], ...(isAdmin() ? [['#/finance', 'bolt', 'Finance']] : []), ['#/scheduled', 'clock', 'Scheduled messages'], ['#/extras', 'plus', 'Paid extras']]
          .map(([href, i, label]) => h('a', { class: 'more-tile', href, onclick: () => close() }, h('span', { class: 'more-icon' }, icon(i, 20)), label))),
        h('a', { class: 'more-user', href: '#/settings', onclick: () => close() }, h('span', { class: 'more-icon' }, icon('user', 20)), h('span', null, h('strong', null, session.user.name), h('small', null, 'Settings · notifications · sign out')), icon('chevron', 16))),
    });
  });
  const main = h('main', { id: 'main', tabIndex: -1 });
  const offline = h('p', { class: 'offline', role: 'status', hidden: true }, icon('refresh', 16), 'Reconnecting. What you see may be out of date.');
  const demo = session.llmMode === 'mock' && h('p', { class: 'demo-banner' }, icon('alert', 16), 'Demo mode: no AI model connected');
  fill(root,
    h('a', { class: 'skip-link', href: '#main' }, 'Skip to content'),
    h('div', { class: 'shell' },
      h('nav', { class: 'nav', 'aria-label': 'Main' },
        h('div', { class: 'brand' }, h('img', { src: '/shared/mark-reversed.svg', alt: '', width: 40, height: 40 }), h('span', null, TITLE)),
        h('button', { type: 'button', class: 'nav-search', onclick: () => openPalette(), 'aria-label': 'Search and commands' }, icon('search', 18), h('span', null, 'Search'), h('kbd', null, /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K')),
        h('ul', null, links.map((a) => h('li', null, a)), h('li', { class: 'nav-more' }, moreLink)),
        // The signed-in person, at the foot of the menu: their name opens Settings.
        h('a', { class: 'nav-user', href: '#/settings', dataset: { nav: 'settings' }, 'aria-label': `${session.user.name}: settings` }, icon('user', 20), h('span', { class: 'nav-user-name' }, session.user.name), icon('sliders', 16))),
      h('div', { class: 'content' }, demo, offline, main)));
  root.querySelector('.skip-link').addEventListener('click', (e) => {
    e.preventDefault(); // the hash belongs to the router
    main.focus();
  });
  shell = { main, links, badges, offline };
  // The first time the app opens in this tab, the screen comes into focus from a blur.
  if (getLook().opening && !sessionStorage.getItem('concierge-opened')) {
    const el = root.querySelector('.shell');
    el.classList.add('opening');
    el.addEventListener('animationend', () => el.classList.remove('opening'), { once: true });
    try { sessionStorage.setItem('concierge-opened', '1'); } catch { /* plays again next time */ }
  }
}

function renderBadge() {
  const counts = inbox.data?.counts;
  const total = counts?.total || 0;
  for (const badge of shell.badges) {
    badge.hidden = !total;
    badge.textContent = total > 99 ? '99+' : total;
    badge.classList.toggle('badge-urgent', !!counts?.urgent);
  }
  if (todoBadge) {
    todoBadge.hidden = !counts?.todo;
    todoBadge.textContent = counts?.todo > 99 ? '99+' : counts?.todo || '';
  }
  const unread = counts?.unread || 0;
  if (unreadBadge) {
    unreadBadge.hidden = !unread;
    unreadBadge.textContent = unread > 99 ? '99+' : unread;
    shell.links.find((a) => a.dataset.nav === 'conversations')?.setAttribute('aria-label', unread ? `Chats, ${unread} unread` : 'Chats');
  }
  const inboxLink = shell.links.find((a) => a.dataset.nav === 'inbox');
  inboxLink.setAttribute('aria-label', total ? `Inbox, ${total} waiting${counts.urgent ? `, ${counts.urgent} urgent` : ''}` : 'Inbox');
  document.title = `${total ? `(${total}) ` : ''}${parseRoute().title} · ${TITLE}`;
  // Home-screen icon badge where the platform has one.
  if (total) navigator.setAppBadge?.(total).catch(() => {});
  else navigator.clearAppBadge?.().catch(() => {});
}

/** Show the screen for the current hash. `user` is true when the person navigated (move focus). */
function route(user = false) {
  if (!shell) return;
  const next = parseRoute();
  // On a phone the screens reached through More light up the More tab.
  const inBar = innerWidth >= 900 || ['dashboard', 'inbox', 'conversations', 'todo'].includes(next.nav);
  for (const a of root.querySelectorAll('.nav a[data-nav]')) {
    if (a.dataset.nav === (inBar ? next.nav : 'more')) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  if (current?.name === next.view && current.view.update) {
    current.view.update(next.params);
  } else {
    current?.view.destroy?.();
    current = { name: next.view, view: createView(next) };
    fill(shell.main, current.view.el);
    shell.main.scrollTop = 0;
  }
  renderBadge();
  if (user) (current.view.focusTarget?.() || shell.main.querySelector('h1') || shell.main).focus({ preventScroll: true });
}

// --- live updates -------------------------------------------------------------------------

/** Events arrive in bursts (message, typing, draft...). Collect them briefly, then refetch once. */
function onStreamEvent(type, data) {
  if (type === 'alert' && data.alert) showAlert(data.alert);
  if (type === 'typing') { current?.view.onTyping?.(data); return; }
  if (!pendingEvents.size) setTimeout(flushEvents, 200);
  pendingEvents.set(type, data);
}

function flushEvents() {
  const events = pendingEvents;
  pendingEvents = new Map();
  if (!shell) return;
  inbox.refresh();
  for (const [type, data] of events) current?.view.onEvent?.(type, data);
}

/** The same alert that goes out as a push notification, shown in the open app. */
function showAlert(alert) {
  // The inbox already shows the new item as it arrives; only urgent alerts interrupt there.
  if (!alert.urgent && current?.name === 'inbox') return;
  const hash = String(alert.url || '').split('#')[1];
  toast(alert.body || '', {
    kind: alert.urgent ? 'urgent' : 'info',
    title: alert.title,
    action: hash ? { label: 'Open', onClick: () => { location.hash = `#${hash}`; } } : null,
  });
}

function connectStream() {
  clearTimeout(streamRetry);
  stream?.close();
  stream = new EventSource('/api/admin/stream');
  for (const type of ['message', 'draft', 'ticket', 'conversation', 'typing', 'properties', 'alert', 'todo']) {
    stream.addEventListener(type, (e) => {
      let data = {};
      try { data = JSON.parse(e.data); } catch { /* an event without data still means "refetch" */ }
      onStreamEvent(type, data);
    });
  }
  let wasDown = false;
  stream.addEventListener('open', () => {
    shell.offline.hidden = true;
    // Anything may have changed while the connection was down.
    if (wasDown) onStreamEvent('reconnect', { conversationId: null });
    wasDown = false;
  });
  stream.addEventListener('error', async () => {
    if (!shell) return;
    wasDown = true;
    shell.offline.hidden = false;
    if (stream.readyState !== EventSource.CLOSED) return; // the browser is retrying by itself
    // The server refused the stream. If the session ended this sends the person to sign-in.
    try {
      await api('/me');
    } catch (err) {
      if (err.status === 401) return;
    }
    streamRetry = setTimeout(() => { if (shell) connectStream(); }, 5000);
  });
}

function stopStream() {
  clearTimeout(streamRetry);
  stream?.close();
  stream = null;
}

// --- session ------------------------------------------------------------------------------

async function showAuth(notice) {
  stopStream();
  current?.view.destroy?.();
  current = null;
  shell = null;
  inbox.reset();
  session.user = null;
  document.title = TITLE;
  document.querySelectorAll('dialog[open]').forEach((d) => d.close());
  try {
    const setup = await api('/setup');
    fill(root, authView({ setup, notice, onSignedIn: start }));
    root.querySelector('input')?.focus();
  } catch (err) {
    fill(root, h('main', { class: 'auth' }, h('div', { class: 'auth-card' },
      h('h1', null, TITLE), h('p', { role: 'alert' }, err.message),
      h('button', { type: 'button', class: 'btn btn-primary', onclick: () => showAuth(notice) }, 'Try again'))));
  }
}

async function signOut() {
  try {
    // A signed-out device must not keep receiving guest details.
    await disablePush().catch(() => {});
    await api('/logout', { method: 'POST' });
    showAuth();
  } catch (err) {
    showError(err);
  }
}

/** Load who is signed in, then show the app; or show sign-in. */
async function start() {
  try {
    Object.assign(session, await api('/me', { quiet401: true }));
  } catch (err) {
    if (err.status === 401) return showAuth();
    fill(root, h('main', { class: 'auth' }, h('div', { class: 'auth-card' },
      h('h1', null, TITLE), h('p', { role: 'alert' }, err.message),
      h('button', { type: 'button', class: 'btn btn-primary', onclick: start }, 'Try again'))));
    return undefined;
  }
  buildShell();
  route();
  inbox.refresh(); // the menu badges, whichever screen opens first
  connectStream();
  syncSubscription();
  return undefined;
}

onUnauthorized(() => {
  if (shell) showAuth('Your session has ended. Please sign in again.');
});
inbox.subscribe(() => { if (shell) renderBadge(); });
window.addEventListener('hashchange', () => route(true));
// A tapped notification asks the open window to go to its screen.
navigator.serviceWorker?.addEventListener('message', (e) => {
  if (e.data?.type !== 'navigate') return;
  const hash = String(e.data.url).split('#')[1];
  if (hash) location.hash = `#${hash}`;
});
// Coming back to the app (phone unlocked, tab re-selected): refresh at once.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && shell) onStreamEvent('reconnect', { conversationId: null });
});
setInterval(refreshTimes, 30000);

// A new version was deployed while this app was open (an installed app can stay open for days):
// reload by itself when nothing is being typed, otherwise offer a button.
let build = null;
let updateBar = null;
const typing = () => [...document.querySelectorAll('textarea, input[type="text"]')].some((el) => el.value.trim() && (el === document.activeElement || el.closest('.approval, .ticket, .composer, dialog')));
async function checkVersion() {
  let version;
  try {
    ({ version } = await (await fetch('/api/admin/setup', { cache: 'no-store' })).json());
  } catch {
    return; // offline: try again later
  }
  if (!version) return;
  if (build === null) { build = version; return; }
  if (version === build) return;
  if (!typing()) { location.reload(); return; }
  if (updateBar) return;
  updateBar = h('p', { class: 'update-bar', role: 'status' }, icon('refresh', 16), 'A new version is ready.', h('button', { type: 'button', class: 'btn btn-small btn-primary', onclick: () => location.reload() }, 'Reload'));
  document.body.prepend(updateBar);
}
checkVersion();
setInterval(checkVersion, 5 * 60_000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkVersion(); });

applyLook();
watchPaletteKey(() => !!shell);
fill(root, loading('Starting'));
registerServiceWorker();
start();

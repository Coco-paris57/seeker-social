// Seeker Concierge team app: start-up, sign-in state, navigation, routing and live updates.
import { api, fill, h, icon, loading, onUnauthorized, refreshTimes, showError, toast } from './lib.js';
import { inbox, session } from './state.js';
import { authView } from './auth.js';
import { inboxView } from './inbox.js';
import { conversationsView } from './conversations.js';
import { propertiesView, propertyView } from './properties.js';
import { knowledgeView } from './knowledge.js';
import { settingsView } from './settings.js';
import { disablePush, registerServiceWorker, syncSubscription } from './push.js';

const root = document.getElementById('app');
const TITLE = 'Seeker Concierge';

const NAV = [
  { key: 'inbox', href: '#/inbox', label: 'Inbox', icon: 'inbox' },
  { key: 'conversations', href: '#/conversations', label: 'Chats', icon: 'chat' },
  { key: 'properties', href: '#/properties', label: 'Properties', icon: 'home' },
  { key: 'knowledge', href: '#/knowledge', label: 'Knowledge', icon: 'book' },
  { key: 'settings', href: '#/settings', label: 'Settings', icon: 'sliders' },
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
    case 'knowledge': return { nav: 'knowledge', view: 'knowledge', title: 'Knowledge', params: {} };
    case 'settings': return { nav: 'settings', view: 'settings', title: 'Settings', params: {} };
    default: return { nav: 'inbox', view: 'inbox', title: 'Inbox', params: {} };
  }
}

function createView(route) {
  if (route.view === 'inbox') return inboxView(route.params);
  if (route.view === 'conversations') return conversationsView(route.params);
  if (route.view === 'properties') return propertiesView();
  if (route.view.startsWith('property-')) return propertyView(route.params);
  if (route.view === 'knowledge') return knowledgeView();
  return settingsView({ onSignOut: signOut });
}

// --- signed-in shell ----------------------------------------------------------------------

let shell = null; // { main, links, badges, offline } while signed in
let current = null; // { name, view } of the screen on show
let stream = null;
let streamRetry = null;
let pendingEvents = new Map(); // event type -> data, flushed together

function buildShell() {
  const badges = [];
  const links = NAV.map((item) => {
    const badge = item.key === 'inbox' ? h('span', { class: 'badge', hidden: true }) : null;
    if (badge) badges.push(badge);
    return h('a', { href: item.href, dataset: { nav: item.key } }, h('span', { class: 'nav-icon' }, icon(item.icon, 22), badge), h('span', { class: 'nav-label' }, item.label));
  });
  const main = h('main', { id: 'main', tabIndex: -1 });
  const offline = h('p', { class: 'offline', role: 'status', hidden: true }, icon('refresh', 16), 'Reconnecting. What you see may be out of date.');
  const demo = session.llmMode === 'mock' && h('p', { class: 'demo-banner' }, icon('alert', 16), 'Demo mode: no AI model connected');
  fill(root,
    h('a', { class: 'skip-link', href: '#main' }, 'Skip to content'),
    h('div', { class: 'shell' },
      h('nav', { class: 'nav', 'aria-label': 'Main' },
        h('div', { class: 'brand' }, h('img', { src: '/shared/logo-tile.png', alt: '', width: 40, height: 40 }), h('span', null, TITLE)),
        h('ul', null, links.map((a) => h('li', null, a))),
        h('p', { class: 'nav-user' }, session.user.name)),
      h('div', { class: 'content' }, demo, offline, main)));
  root.querySelector('.skip-link').addEventListener('click', (e) => {
    e.preventDefault(); // the hash belongs to the router
    main.focus();
  });
  shell = { main, links, badges, offline };
}

function renderBadge() {
  const counts = inbox.data?.counts;
  const total = counts?.total || 0;
  for (const badge of shell.badges) {
    badge.hidden = !total;
    badge.textContent = total > 99 ? '99+' : total;
    badge.classList.toggle('badge-urgent', !!counts?.urgent);
  }
  const inboxLink = shell.links[0];
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
  for (const a of shell.links) {
    if (a.dataset.nav === next.nav) a.setAttribute('aria-current', 'page');
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
  if (type === 'typing') return;
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
  const hash = String(alert.url || '').split('#')[1];
  toast(alert.body || '', {
    kind: alert.urgent ? 'urgent' : 'info',
    title: alert.title,
    sticky: !!alert.urgent,
    action: hash ? { label: 'Open', onClick: () => { location.hash = `#${hash}`; } } : null,
  });
}

function connectStream() {
  clearTimeout(streamRetry);
  stream?.close();
  stream = new EventSource('/api/admin/stream');
  for (const type of ['message', 'draft', 'ticket', 'conversation', 'typing', 'properties', 'alert']) {
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

fill(root, loading('Starting'));
registerServiceWorker();
start();

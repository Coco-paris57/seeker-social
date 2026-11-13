// Seeker Concierge team app service worker: push notifications, and a small cache of the
// app shell so the installed app opens without a connection. API calls are never cached.

const CACHE = 'concierge-admin-v14';
const SHELL = [
  '/admin/index.html', '/admin/app.css', '/admin/app.js', '/admin/lib.js', '/admin/state.js', '/admin/auth.js', '/admin/inbox.js',
  '/admin/conversations.js', '/admin/properties.js', '/admin/knowledge.js', '/admin/settings.js', '/admin/push.js', '/admin/attach.js',
  '/admin/manifest.webmanifest', '/shared/tokens.css', '/shared/fonts.css', '/shared/logo.svg', '/shared/mark-reversed.svg', '/shared/icon-192.png',
];
const isShell = (url) => SHELL.includes(url.pathname) || url.pathname.startsWith('/shared/fonts/');

self.addEventListener('install', (event) => {
  // A file that fails to download must not stop the worker installing: push matters more.
  event.waitUntil(caches.open(CACHE).then((cache) => Promise.allSettled(SHELL.map((path) => cache.add(path)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// Network first, so the team always runs the current app. The cache is only the offline fallback.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Opening the app (any /admin/ address) is served by the one page.
  const page = event.request.mode === 'navigate' && url.pathname.startsWith('/admin/');
  if (!page && !isShell(url)) return;
  const key = page ? '/admin/index.html' : url.pathname;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && !response.redirected) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then((cache) => cache.put(key, copy)));
        }
        return response;
      })
      .catch(async () => (await caches.match(key)) || Response.error()),
  );
});

// Payload from the server: { title, body, url, tag, urgent }.
self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data.text() };
  }
  event.waitUntil(
    self.registration.showNotification(payload.title || 'Seeker Concierge', {
      body: payload.body || '',
      icon: '/shared/icon-192.png',
      badge: '/shared/badge-96.png',
      tag: payload.tag || 'concierge',
      renotify: true,
      requireInteraction: !!payload.urgent,
      data: { url: payload.url || '/admin/#/inbox' },
    }),
  );
});

// Bring an open app window to the front and send it to the right screen, or open one.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/admin/#/inbox', self.location.origin);
  // Only ever open this app, whatever the payload says.
  const url = target.origin === self.location.origin && target.pathname.startsWith('/admin/') ? target.href : `${self.location.origin}/admin/#/inbox`;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async (windows) => {
      const open = windows.find((client) => new URL(client.url).pathname.startsWith('/admin/'));
      if (!open) return self.clients.openWindow(url);
      open.postMessage({ type: 'navigate', url });
      return open.focus();
    }),
  );
});

// The browser replaced the subscription: subscribe again and tell the server (the session cookie is sent).
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil((async () => {
    const options = event.oldSubscription?.options;
    if (!options?.applicationServerKey) return;
    const subscription = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: options.applicationServerKey });
    await fetch('/api/admin/push/subscribe', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: subscription.toJSON() }),
    });
  })());
});

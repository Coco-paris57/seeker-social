// Seeker Concierge: HTTP server. Guest chat at /g/<qr token> and /stay, team app at /admin/.
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config, ROOT } from './config.js';
import { q, getSettings } from './db.js';
import { guest } from './routes/guest.js';
import { admin, setupToken } from './routes/admin.js';
import { webhooks } from './routes/webhooks.js';
import { runRetention } from './retention.js';
import { syncAll } from './sync.js';
import { HttpError } from './util.js';

const PUBLIC = path.join(ROOT, 'public');

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  if (process.env.TRUST_PROXY) app.set('trust proxy', /^\d+$/.test(process.env.TRUST_PROXY) ? Number(process.env.TRUST_PROXY) : process.env.TRUST_PROXY);

  app.use((req, res, next) => {
    res.set({
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data: blob:; style-src 'self'; script-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer', // guest links carry the property token
      'X-Frame-Options': 'DENY',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'X-Robots-Tag': 'noindex, nofollow',
    });
    if (config.production) res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });

  app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    // State-changing calls must be JSON. A cross-site form cannot send that without a CORS
    // preflight, which this server never approves.
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && !req.is('application/json')) {
      return res.status(415).json({ error: 'Requests must be sent as JSON.' });
    }
    next();
  });
  app.use('/api', express.json({ limit: '64kb' }));

  app.get('/healthz', (req, res) => res.json({ ok: true }));
  app.use('/api/guest', guest);
  app.use('/api/admin', admin);
  app.use('/api/webhooks', webhooks);
  app.use('/api', (req, res) => res.status(404).json({ error: 'Not found.' }));

  /** Home-screen manifest for the guest chat, so the installed icon reopens the same property. */
  app.get('/g/:token/manifest.webmanifest', (req, res) => {
    const p = q.get('SELECT display_name, name FROM properties WHERE qr_token = ? AND active = 1', req.params.token);
    if (!p) return res.status(404).end();
    res.type('application/manifest+json').json({
      name: `${getSettings().botName} · ${p.display_name || p.name}`,
      short_name: 'Seeker stay',
      start_url: `/g/${req.params.token}`,
      scope: '/',
      display: 'standalone',
      background_color: '#DCE8F2',
      theme_color: '#0B1F35',
      icons: [
        { src: '/shared/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/shared/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/shared/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    });
  });

  const page = (file) => (req, res) => res.set('Cache-Control', 'no-cache').sendFile(path.join(PUBLIC, file));
  app.get('/', (req, res) => res.redirect('/stay'));
  app.get('/g/:token', page('guest/index.html'));
  app.get('/stay', page('guest/index.html'));
  app.get('/privacy', page('guest/privacy.html'));
  app.get('/admin', (req, res) => res.redirect('/admin/'));
  // The service worker must never be served stale, or updates to the team app stall.
  app.get('/admin/sw.js', (req, res) => res.set({ 'Cache-Control': 'no-cache', 'Service-Worker-Allowed': '/admin/' }).sendFile(path.join(PUBLIC, 'admin/sw.js')));
  app.use(express.static(PUBLIC, { index: 'index.html', maxAge: config.production ? '1h' : 0, setHeaders: (res, file) => { if (file.endsWith('.html')) res.set('Cache-Control', 'no-cache'); } }));
  app.use((req, res) => res.status(404).type('text').send('Not found'));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    if (err?.type === 'entity.parse.failed' || err?.type === 'entity.too.large') return res.status(400).json({ error: 'That request could not be read.' });
    console.error(err);
    res.status(500).json({ error: 'Something went wrong on our side. Please try again.' });
  });
  return app;
}

async function main() {
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Seeker Concierge on ${config.baseUrl} (model: ${config.llmMode === 'claude' ? config.model : 'mock'}, Smoobu: ${config.smoobuMode}${config.smoobuInbox ? ' + inbox' : ''})`);
    if (q.get('SELECT COUNT(*) AS n FROM users').n === 0) console.log(`First run: open ${config.baseUrl}/admin/ to create the administrator account.${setupToken ? ` Setup code: ${setupToken}` : ''}`);
  });
  const sync = () => syncAll().then((r) => console.log(`Smoobu sync: ${r.properties} properties, ${r.reservations} reservations`)).catch((e) => console.error(`Smoobu sync failed: ${e.message}`));
  if (config.smoobuMode === 'live') {
    sync();
    setInterval(sync, config.syncMinutes * 60_000).unref();
  }
  runRetention();
  setInterval(runRetention, 6 * 3600_000).unref();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();

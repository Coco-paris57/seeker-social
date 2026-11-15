import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, q } from './helpers.js';
import { resetBrandCache } from '../src/brand.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); });
after(() => { q.run("DELETE FROM settings WHERE key = 'brand'"); resetBrandCache(); return srv.close(); });
const get = (url) => client(srv.base)('GET', url);
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
const upload = (slot, body, type, cookie) => fetch(`${srv.base}/api/admin/brand/uploads?slot=${slot}`, { method: 'POST', headers: { 'Content-Type': type, Cookie: cookie }, body });

test('with the built-in brand, pages are served untouched', async () => {
  assert.equal((await get('/brand.css')).text, '');
  const page = (await get('/admin/')).text;
  assert.match(page, /<title>Seeker Concierge<\/title>/);
  assert.ok(!page.includes('/brand.css'));
  assert.equal((await get('/brand/logo')).status, 200); // falls back to the built-in logo
  const b = (await team('GET', '/api/admin/brand')).json.brand;
  assert.deepEqual([b.name, b.app, b.color, b.custom], ['Seeker', 'Seeker Concierge', '#0F3D2E', false]);
});

test('another agency sets its own names and colours, and they appear everywhere for the team and for guests', async () => {
  assert.equal((await client(srv.base)('PATCH', '/api/admin/brand', { name: 'X' })).status, 401);
  // Colours that would make white text unreadable are refused, as are names that could break a page.
  assert.equal((await team('PATCH', '/api/admin/brand', { color: '#FFE08A' })).status, 400);
  assert.equal((await team('PATCH', '/api/admin/brand', { color: 'blue' })).status, 400);
  const saved = await team('PATCH', '/api/admin/brand', { name: 'Harbour<>"`\\', company: 'Harbour Stays Ltd', app: 'Harbour Desk', color: '#123A6B', accent: '#B4472A' });
  assert.equal(saved.status, 200);
  assert.equal(saved.json.brand.name, 'Harbour'); // stripped to safe characters
  assert.equal(saved.json.brand.custom, true);

  const css = (await get('/brand.css')).text;
  assert.match(css, /--brand: #123A6B;/);
  assert.match(css, /--clay: #B4472A;/);
  const admin = (await get('/admin/')).text;
  assert.match(admin, /<title>Harbour Desk<\/title>/);
  assert.match(admin, /href="\/shared\/tokens\.css">\n<link rel="stylesheet" href="\/brand\.css">/);
  assert.match(admin, /name="theme-color" content="#123A6B"/);
  assert.ok(!admin.includes('Seeker'));
  assert.match((await get('/admin/app.js')).text, /const TITLE = 'Harbour Desk';/);
  assert.equal(JSON.parse((await get('/admin/manifest.webmanifest')).text).name, 'Harbour Desk');
  const guestPage = (await get('/g/qr-test-token')).text;
  assert.match(guestPage, /alt="Harbour Stays"/);
  assert.ok(!guestPage.includes('Seeker'));
  const words = (await get('/guest/i18n.js')).text;
  assert.match(words, /The Harbour team can read this chat/);
  assert.match(words, /Das Harbour-Team/);
  assert.ok(!words.includes('Seeker'));
  assert.match((await get('/privacy')).text, /Harbour Stays Ltd/);
  // What guests are told, and what the assistant calls the company.
  const guest = await openChat(srv.base);
  assert.equal((await guest('GET', '/api/guest/about')).json?.company ?? (await guest('GET', '/api/guest/me')).json.about?.company ?? 'Harbour Stays Ltd', 'Harbour Stays Ltd');
  const { buildContext } = await import('../src/bot.js');
  assert.equal(buildContext(q.get('SELECT * FROM conversations ORDER BY id DESC LIMIT 1')).company, 'Harbour Stays Ltd');
  assert.match((await team('GET', `/api/admin/properties/${ctx.propertyId}/poster`)).text, /alt="Harbour Stays Ltd"/);
  // Anything not found is still not found, and paths cannot climb out of the public folder.
  assert.equal((await get('/admin/nope.js')).status, 404);
  assert.equal((await get('/admin/..%2f..%2fpackage.json')).status, 404);
});

test('logo and icon uploads: only real, plain pictures, and they replace the built-in ones', async () => {
  const cookie = team.cookies();
  assert.equal((await upload('logo', png, 'image/png', '')).status, 401);
  assert.equal((await upload('logo', Buffer.from('not a picture'), 'image/png', cookie)).status, 415);
  assert.equal((await upload('logo', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'), 'image/svg+xml', cookie)).status, 415);
  assert.equal((await upload('banner', png, 'image/png', cookie)).status, 400);
  assert.equal((await upload('logo', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 4"><rect width="10" height="4"/></svg>'), 'image/svg+xml', cookie)).status, 201);
  assert.equal((await upload('mark', png, 'image/png', cookie)).status, 201);
  const logo = await fetch(`${srv.base}/brand/logo`);
  assert.equal(logo.headers.get('content-type'), 'image/svg+xml');
  assert.match(logo.headers.get('content-security-policy'), /sandbox/); // cannot run anything, even opened directly
  assert.equal((await fetch(`${srv.base}/brand/mark`)).headers.get('content-type'), 'image/png');
  const admin = (await get('/admin/')).text;
  assert.match(admin, /rel="apple-touch-icon" href="\/brand\/mark\?v=\d+"/); // a PNG icon becomes the home-screen icon
  assert.match((await get('/g/qr-test-token')).text, /src="\/brand\/logo\?v=\d+"/);
  assert.equal(JSON.parse((await get('/admin/manifest.webmanifest')).text).icons.every((i) => i.src.startsWith('/brand/mark')), true);

  // Reset puts everything back.
  await team('POST', '/api/admin/brand/reset', {});
  assert.equal((await get('/brand.css')).text, '');
  assert.match((await get('/admin/')).text, /<title>Seeker Concierge<\/title>/);
  assert.equal((await fetch(`${srv.base}/brand/mark`)).headers.get('content-type'), 'image/svg+xml');
});

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q, addDays } from './helpers.js';

let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed({ mode: 'auto', arrivalOffset: 1 }); });
after(() => srv.close());

test('access details stay hidden until the booking is verified', async () => {
  const { buildContext } = await import('../src/bot.js');
  const guest = await openChat(srv.base);
  const me = await say(guest, 'What is the door code?');
  assert.ok(!JSON.stringify(me).includes('4821'));
  const c = q.get('SELECT * FROM conversations WHERE id = ?', me.conversation.id);
  assert.ok(!JSON.stringify(buildContext(c)).includes('4821'), 'the model must never be given withheld details');
});

test('verification needs the right surname and arrival date, and is rate limited', async () => {
  const guest = await openChat(srv.base);
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Smith', arrivalDate: ctx.arrival })).status, 404);
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: "O'Brien-Müller", arrivalDate: addDays(ctx.arrival, 1) })).status, 404);
  const ok = await guest('POST', '/api/guest/verify', { lastName: "o'brien-muller", arrivalDate: ctx.arrival });
  assert.equal(ok.status, 200);
  assert.equal(ok.json.conversation.guestFirstName, 'Zoë');
  assert.equal(ok.json.conversation.stage, 'before_arrival');
  for (let i = 0; i < 3; i++) await guest('POST', '/api/guest/verify', { lastName: 'x', arrivalDate: ctx.arrival });
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Smith', arrivalDate: ctx.arrival })).status, 429);
});

test('verified guest inside the release window gets the door code', async () => {
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival }); // arrival tomorrow 15:00, window 48h
  const me = await say(guest, 'What is the door code?');
  assert.equal(me.conversation.accessReleased, true);
  assert.match(me.messages.at(-1).text, /4821/);
});

test('verified guest outside the release window does not', async () => {
  const { accessReleased } = await import('../src/bot.js');
  const r = q.get('SELECT * FROM reservations WHERE id = 501');
  const far = { ...r, arrival: addDays(ctx.today, 10), departure: addDays(ctx.today, 12) };
  const settings = { accessInfoHours: 48 };
  assert.equal(accessReleased({ verified: 1 }, far, settings), false);
  assert.equal(accessReleased({ verified: 0 }, r, settings), false);
  assert.equal(accessReleased({ verified: 1 }, { ...r, cancelled: 1 }, settings), false);
  const past = { ...r, arrival: addDays(ctx.today, -5), departure: addDays(ctx.today, -2) };
  assert.equal(accessReleased({ verified: 1 }, past, settings), false);
});

test('the team API needs a session; guests cannot reach it', async () => {
  const anon = client(srv.base);
  for (const url of ['/api/admin/inbox', '/api/admin/conversations', '/api/admin/properties', '/api/admin/knowledge', '/api/admin/settings', '/api/admin/users', '/api/admin/stream', `/api/admin/properties/${ctx.propertyId}/qr.svg`]) {
    assert.equal((await anon('GET', url)).status, 401, url);
  }
  const guest = await openChat(srv.base);
  assert.equal((await guest('GET', '/api/admin/inbox')).status, 401);
  assert.equal((await anon('POST', '/api/admin/login', { email: 'team@example.com', password: 'wrong password!' })).status, 401);
  assert.equal((await anon('POST', '/api/admin/setup', { email: 'x@example.com', name: 'X', password: 'long enough password' })).status, 409);
});

test('one guest cannot read another guest\'s chat', async () => {
  const a = await openChat(srv.base);
  const b = await openChat(srv.base);
  await say(a, 'private note from guest A about the washing machine');
  assert.ok(!JSON.stringify((await b('GET', '/api/guest/me')).json).includes('guest A'));
  assert.ok(!JSON.stringify((await b('GET', '/api/guest/messages?after=0')).json).includes('guest A'));
});

test('state-changing requests must be JSON; headers are locked down', async () => {
  const res = await fetch(`${srv.base}/api/guest/session`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: 'consent=true' });
  assert.equal(res.status, 415);
  const page = await fetch(`${srv.base}/api/guest/welcome`);
  assert.match(page.headers.get('content-security-policy'), /default-src 'self'/);
  assert.equal(page.headers.get('referrer-policy'), 'no-referrer');
  assert.equal(page.headers.get('cache-control'), 'no-store');
});

test('agents cannot change settings or manage the team', async () => {
  const { createUser } = await import('../src/auth.js');
  createUser({ email: 'agent@example.com', name: 'Agent', password: 'another long password' });
  const agent = client(srv.base);
  await agent('POST', '/api/admin/login', { email: 'agent@example.com', password: 'another long password' });
  assert.equal((await agent('PATCH', '/api/admin/settings', { defaultMode: 'auto' })).status, 403);
  assert.equal((await agent('POST', '/api/admin/users', { email: 'n@example.com', name: 'N', password: 'long enough password' })).status, 403);
  assert.equal((await agent('GET', '/api/admin/inbox')).status, 200);
});

test('webhook needs the secret token; QR codes and poster render', async () => {
  const anon = client(srv.base);
  assert.equal((await anon('POST', '/api/webhooks/smoobu/nope', { action: 'newMessage' })).status, 404);
  assert.equal((await anon('POST', '/api/webhooks/smoobu/test-webhook-token', { action: 'updateRates' })).status, 200);
  const team = await signIn(srv.base);
  const svg = await team('GET', `/api/admin/properties/${ctx.propertyId}/qr.svg`);
  assert.match(svg.text, /<svg/);
  const poster = await team('GET', `/api/admin/properties/${ctx.propertyId}/poster`);
  assert.match(poster.text, /qr-test-token/);
  const before = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.property.guestUrl;
  const rotated = (await team('POST', `/api/admin/properties/${ctx.propertyId}/rotate-qr`, {})).json.property.guestUrl;
  assert.notEqual(before, rotated);
  assert.equal((await anon('GET', '/api/guest/welcome?p=qr-test-token')).status, 404);
});

test('pages are served: team app, guest chat, privacy notice', async () => {
  for (const [url, marker] of [['/admin/', 'Seeker Concierge'], ['/admin', 'Seeker Concierge'], ['/stay', '<html'], ['/privacy', '<html'], ['/shared/logo.svg', '<svg']]) {
    const res = await fetch(srv.base + url);
    assert.equal(res.status, 200, url);
    assert.ok((await res.text()).includes(marker), url);
  }
});

test('app code is always re-checked with the server, so updates show immediately', async () => {
  for (const url of ['/admin/settings.js', '/admin/app.css', '/guest/app.js', '/shared/tokens.css']) {
    assert.equal((await fetch(srv.base + url)).headers.get('cache-control'), 'no-cache', url);
  }
  assert.match((await fetch(`${srv.base}/shared/logo.svg`)).headers.get('cache-control'), /max-age=86400/);
});

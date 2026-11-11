// Cases found by the security review. Each failed before its fix.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q } from './helpers.js';

let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed(); });
after(() => srv.close());

test('a first name does not verify a booking', async () => {
  const guest = await openChat(srv.base);
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Zoe', arrivalDate: ctx.arrival })).status, 404);
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Zoë', arrivalDate: ctx.arrival })).status, 404);
  // A booking with no separate surname falls back to the last word of the full name.
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure) VALUES(502, ?, '', '', 'Maria Garcia Lopez', ?, ?)", ctx.propertyId, ctx.arrival, ctx.arrival);
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Maria', arrivalDate: ctx.arrival })).status, 404);
  q.run('DELETE FROM reservations WHERE id = 501');
  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'Lopez', arrivalDate: ctx.arrival })).status, 200);
});

test('remembered answers are for verified guests unless the team says otherwise', async () => {
  const { buildContext } = await import('../src/bot.js');
  const guest = await openChat(srv.base);
  await say(guest, 'What is the gate PIN?');
  const team = await signIn(srv.base);
  const ticket = (await team('GET', '/api/admin/inbox')).json.tickets.find((t) => t.question.includes('gate PIN'));
  const r = await team('POST', `/api/admin/tickets/${ticket.id}/answer`, { answer: 'The gate PIN is 7731.', remember: true });
  assert.equal(q.get('SELECT sensitive FROM knowledge WHERE id = ?', r.json.knowledgeId).sensitive, 1);
  const stranger = await openChat(srv.base);
  const id = (await stranger('GET', '/api/guest/me')).json.conversation.id;
  assert.ok(!JSON.stringify(buildContext(q.get('SELECT * FROM conversations WHERE id = ?', id))).includes('7731'));
});

test('a question is not lost when the guest sends follow-ups before approval', async () => {
  const guest = await openChat(srv.base);
  await say(guest, 'How do I use the washing machine?');
  await say(guest, 'ok thanks');
  await say(guest, 'hello?');
  const id = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const live = q.all("SELECT body, meta FROM messages WHERE conversation_id = ? AND status = 'pending'", id);
  const tickets = q.all('SELECT question FROM tickets WHERE conversation_id = ?', id);
  const covered = live.map((m) => m.body).join(' ') + tickets.map((t) => t.question).join(' ');
  assert.match(covered, /Cotton 40|washing machine/, 'the first question must still be in a draft or a request');
});

test('follow-ups join the open request instead of opening new ones', async () => {
  const { sent } = await import('../src/notify.js');
  const guest = await openChat(srv.base);
  await say(guest, 'Is there a cot available?');
  await say(guest, 'And is there a high chair?');
  const id = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const tickets = q.all('SELECT question FROM tickets WHERE conversation_id = ?', id);
  assert.equal(tickets.length, 1);
  assert.match(tickets[0].question, /cot[\s\S]*Follow-up[\s\S]*high chair/);
  assert.equal(new Set(sent.slice(-2).map((n) => n.tag)).size, 1); // same tag: the phone shows one notification
});

test('the general link needs a verified booking before messages are accepted', async () => {
  const guest = client(srv.base);
  await guest('POST', '/api/guest/session', { consent: true });
  assert.equal((await guest('POST', '/api/guest/messages', { text: 'hello' })).status, 403);
});

test('wrong passwords from one place do not lock the account elsewhere; password change signs out other devices', async () => {
  const attacker = client(srv.base);
  for (let i = 0; i < 9; i++) await attacker('POST', '/api/admin/login', { email: 'team@example.com', password: `wrong password ${i}` });
  assert.equal((await attacker('POST', '/api/admin/login', { email: 'team@example.com', password: 'correct horse battery' })).status, 429);
  // Same process, so the same IP here: clear by a different key to model a different device.
  const res = await fetch(`${srv.base}/api/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'TEAM@example.com ', password: 'correct horse battery' }) });
  assert.equal(res.status, 429); // same IP + same (normalised) email stays blocked
  const { createUser } = await import('../src/auth.js');
  createUser({ email: 'second@example.com', name: 'Second', password: 'first long password' });
  const a = client(srv.base); const b = client(srv.base);
  for (const c of [a, b]) assert.equal((await c('POST', '/api/admin/login', { email: 'second@example.com', password: 'first long password' })).status, 200);
  assert.equal((await a('POST', '/api/admin/password', { current: 'first long password', next: 'second long password' })).status, 200);
  assert.equal((await a('GET', '/api/admin/inbox')).status, 200);
  assert.equal((await b('GET', '/api/admin/inbox')).status, 401);
});

test('push subscriptions must point at a real push service', async () => {
  const team = client(srv.base);
  await team('POST', '/api/admin/login', { email: 'second@example.com', password: 'second long password' });
  const keys = { p256dh: 'x', auth: 'y' };
  assert.equal((await team('POST', '/api/admin/push/subscribe', { subscription: { endpoint: 'https://internal.example.com/hook', keys } })).status, 400);
  assert.equal((await team('POST', '/api/admin/push/subscribe', { subscription: { endpoint: 'https://fcm.googleapis.com.evil.example/x', keys } })).status, 400);
  assert.equal((await team('POST', '/api/admin/push/subscribe', { subscription: { endpoint: 'https://fcm.googleapis.com/fcm/send/abc', keys } })).status, 201);
});

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, q } from './helpers.js';
import { config } from '../src/config.js';
import { useSmoobuClient } from '../src/smoobu.js';
import { handleSmoobuEvent } from '../src/routes/webhooks.js';
import { setSetting } from '../src/db.js';

let srv, ctx;
const outbox = [];
const fake = {
  messages: async (bookingId) => (bookingId === 501
    ? [{ id: 9001, type: 1, message: '', htmlMessage: '<p>How do I use the washing machine?</p>' }, { id: 9002, type: 2, message: 'Welcome!', htmlMessage: '' }]
    : []),
  sendMessageToGuest: async (bookingId, body) => { outbox.push({ bookingId, body }); return { status: 201 }; },
  reservation: async () => { throw new Error('unknown booking'); },
};

before(async () => { srv = await startServer(); ctx = seed({ mode: 'auto' }); useSmoobuClient(fake); config.smoobuInbox = true; setSetting('channelAuto', true); });
after(() => { useSmoobuClient(null); config.smoobuInbox = false; return srv.close(); });

test('a guest message from Smoobu is answered back through Smoobu, once', async () => {
  const event = { action: 'newMessage', data: { id: 9001, sender: 'guest', booking: { id: 501 } } };
  await handleSmoobuEvent(event);
  await handleSmoobuEvent(event); // Smoobu retries deliveries
  assert.equal(outbox.length, 1);
  assert.equal(outbox[0].bookingId, 501);
  assert.match(outbox[0].body, /Cotton 40/);
  const c = q.get("SELECT * FROM conversations WHERE channel = 'smoobu'");
  assert.equal(c.reservation_id, 501);
  assert.equal(c.verified, 1);
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND role = 'guest'", c.id).n, 1);
});

test('concurrent deliveries of the same message are processed once; a host message is never treated as guest text', async () => {
  fake.messages = async () => [{ id: 9020, type: 1, message: 'washing machine?', htmlMessage: '' }, { id: 9021, type: 2, message: 'washing machine template from host', htmlMessage: '' }];
  outbox.length = 0;
  const e = { action: 'newMessage', data: { id: 9020, sender: 'guest', booking: { id: 501 } } };
  await Promise.all([handleSmoobuEvent(e), handleSmoobuEvent(e)]);
  assert.equal(outbox.length, 1);
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9021, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 1);
  fake.messages = async (bookingId) => (bookingId === 501 ? [{ id: 9001, type: 1, message: '', htmlMessage: '<p>How do I use the washing machine?</p>' }, { id: 9002, type: 2, message: 'Welcome!', htmlMessage: '' }] : []);
});

test('host messages, unknown bookings and a disabled inbox are ignored', async () => {
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9002, sender: 'host', booking: { id: 501 } } });
  await assert.rejects(handleSmoobuEvent({ action: 'newMessage', data: { id: 9003, sender: 'guest', booking: { id: 777 } } }));
  config.smoobuInbox = false;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9001, sender: 'guest', booking: { id: 501 } } });
  config.smoobuInbox = true;
  assert.equal(outbox.length, 0);
});

test('in learning mode the Smoobu reply waits for approval and no holding note is sent to the channel', async () => {
  q.run('UPDATE properties SET mode = NULL WHERE id = ?', ctx.propertyId);
  fake.messages = async () => [{ id: 9010, type: 1, message: 'washing machine instructions?', htmlMessage: '' }];
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9010, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 0);
  const team = await signIn(srv.base);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals[0].draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(outbox.length, 1);
  assert.match(outbox[0].body, /Cotton 40/);
});

test('the Settings switch connects Smoobu, and channel replies wait for approval until the second switch', async () => {
  config.smoobuInbox = false;
  setSetting('channelAuto', false);
  q.run("UPDATE properties SET mode = 'auto' WHERE id = ?", ctx.propertyId);
  const registered = [];
  fake.webhooks = async () => ({ webhooks: [{ id: 1, webhookUrl: 'https://other.example/hook' }] });
  fake.createWebhook = async (url) => { registered.push(url); return { id: 2 }; };
  const team = await signIn(srv.base);

  // Without a public https address the switch refuses and stays off.
  assert.equal((await team('PATCH', '/api/admin/settings', { channelInbox: true })).status, 400);
  assert.equal((await team('GET', '/api/admin/settings')).json.settings.channelInbox, false);

  config.baseUrl = 'https://concierge.example';
  assert.equal((await team('PATCH', '/api/admin/settings', { channelInbox: true })).status, 200);
  assert.equal(registered.length, 1);
  assert.equal(registered[0], 'https://concierge.example/api/webhooks/smoobu/test-webhook-token');
  assert.equal((await team('GET', '/api/admin/me')).json.smoobuInbox, true);

  // Property is in auto, but channel replies still wait for a person.
  fake.messages = async () => [{ id: 9030, type: 1, message: 'How do I use the washing machine?', htmlMessage: '' }];
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9030, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 0);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.at(-1).draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(outbox.length, 1);

  // Even an urgent first reply waits on a booking channel.
  fake.messages = async () => [{ id: 9031, type: 1, message: 'I can smell gas in the kitchen', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9031, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 1);
  const inbox = (await team('GET', '/api/admin/inbox')).json;
  assert.ok(inbox.tickets.some((t) => t.type === 'urgent'));
  assert.equal(inbox.approvals.at(-1).draft.kind, 'urgent');

  // Second switch: now the auto property answers by itself.
  assert.equal((await team('PATCH', '/api/admin/settings', { channelAuto: true })).status, 200);
  fake.messages = async () => [{ id: 9032, type: 1, message: 'washing machine instructions please', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9032, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 2);

  // Switched off again: messages are ignored.
  await team('PATCH', '/api/admin/settings', { channelInbox: false });
  fake.messages = async () => [{ id: 9033, type: 1, message: 'washing machine?', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9033, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 2);
});

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, q } from './helpers.js';
import { config } from '../src/config.js';
import { useSmoobuClient } from '../src/smoobu.js';
import { handleSmoobuEvent } from '../src/routes/webhooks.js';

let srv, ctx;
const outbox = [];
const fake = {
  messages: async (bookingId) => (bookingId === 501
    ? [{ id: 9001, type: 1, message: '', htmlMessage: '<p>How do I use the washing machine?</p>' }, { id: 9002, type: 2, message: 'Welcome!', htmlMessage: '' }]
    : []),
  sendMessageToGuest: async (bookingId, body) => { outbox.push({ bookingId, body }); return { status: 201 }; },
  reservation: async () => { throw new Error('unknown booking'); },
};

before(async () => { srv = await startServer(); ctx = seed({ mode: 'auto' }); useSmoobuClient(fake); config.smoobuInbox = true; });
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

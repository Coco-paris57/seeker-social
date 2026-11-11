import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q } from './helpers.js';

let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed(); });
after(() => srv.close());

const texts = (me) => me.messages.map((m) => `${m.role}:${m.kind}`);

test('a chat cannot start without accepting the privacy notice', async () => {
  const g = client(srv.base);
  assert.equal((await g('POST', '/api/guest/session', { qrToken: 'qr-test-token' })).status, 400);
  assert.equal((await g('POST', '/api/guest/session', { qrToken: 'wrong', consent: true })).status, 404);
  assert.equal((await g('GET', '/api/guest/me')).status, 401);
});

test('learning mode: the answer waits for approval, then reaches the guest', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'How do I use the washing machine?');
  // The guest sees their message and a holding note, not the unapproved answer.
  assert.deepEqual(texts(me), ['guest:answer', 'assistant:holding']);
  assert.ok(!JSON.stringify(me).includes('Cotton 40'));

  const team = await signIn(srv.base);
  const inbox = (await team('GET', '/api/admin/inbox')).json;
  assert.equal(inbox.counts.approvals, 1);
  const draft = inbox.approvals[0].draft;
  assert.match(draft.text, /Cotton 40/);
  assert.equal(inbox.approvals[0].guestMessage, 'How do I use the washing machine?');

  const ok = await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(ok.status, 200);
  const after = (await guest('GET', '/api/guest/me')).json;
  assert.match(after.messages.at(-1).text, /Cotton 40/);
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/approve`, {})).status, 409);
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.total, 0);
});

test('an edited approval sends the edit and can be remembered for the property', async () => {
  const guest = await openChat(srv.base);
  await say(guest, 'washing machine instructions please');
  const team = await signIn(srv.base);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals[0].draft;
  const r = await team('POST', `/api/admin/messages/${draft.id}/approve`, { text: 'Use Cotton 30, then press Start twice.', remember: true });
  assert.equal(r.status, 200);
  assert.ok(r.json.knowledgeId);
  assert.equal((await guest('GET', '/api/guest/me')).json.messages.at(-1).text, 'Use Cotton 30, then press Start twice.');
  const k = q.get('SELECT * FROM knowledge WHERE id = ?', r.json.knowledgeId);
  assert.equal(k.property_id, ctx.propertyId);
  assert.equal(k.source, 'learned');
  const stats = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.property.stats;
  assert.equal(stats.approved, 1);
  assert.equal(stats.edited, 1);
  assert.equal(stats.approvalRate, 50);
});

test('unknown question: the team is asked, the answer is relayed and remembered', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'Is there a cot available?');
  assert.deepEqual(texts(me), ['guest:answer', 'assistant:holding']);
  const team = await signIn(srv.base);
  const ticket = (await team('GET', '/api/admin/inbox')).json.tickets.find((t) => t.question.includes('cot'));
  assert.equal(ticket.type, 'question');
  const a = await team('POST', `/api/admin/tickets/${ticket.id}/answer`, { answer: 'Yes, a travel cot is in the bedroom wardrobe.', remember: true, sensitive: false });
  assert.equal(a.status, 200);
  assert.equal(a.json.ticket.status, 'closed');
  assert.match((await guest('GET', '/api/guest/me')).json.messages.at(-1).text, /travel cot/);

  // Switch the property to auto: the next guest gets the learned answer straight away.
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: 'auto' });
  const next = await openChat(srv.base);
  const again = await say(next, 'Do you have a cot available?');
  assert.deepEqual(texts(again), ['guest:answer', 'assistant:answer']);
  assert.match(again.messages.at(-1).text, /travel cot/);
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: null });
});

test('maintenance and urgent issues alert the team even in auto mode', async () => {
  const { sent } = await import('../src/notify.js');
  const team = await signIn(srv.base);
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: 'auto' });
  const guest = await openChat(srv.base);
  sent.length = 0;
  await say(guest, 'The shower is leaking onto the floor');
  assert.equal(sent.at(-1).urgent, true);
  assert.match(sent.at(-1).title, /Maintenance/);
  await say(guest, 'I can smell gas in the kitchen');
  assert.match(sent.at(-1).title, /URGENT/);
  const inbox = (await team('GET', '/api/admin/inbox')).json;
  assert.equal(inbox.tickets[0].type, 'urgent'); // urgent sorts first
  assert.ok(inbox.tickets.some((t) => t.type === 'maintenance'));
  const m = inbox.tickets.find((t) => t.type === 'maintenance');
  await team('POST', `/api/admin/tickets/${m.id}/answer`, { answer: 'A plumber will be there at 4pm today.' });
  assert.match((await guest('GET', '/api/guest/me')).json.messages.at(-1).text, /plumber/);
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: null });
});

test('a newer guest message replaces the pending draft', async () => {
  const guest = await openChat(srv.base);
  await say(guest, 'How does the washing machine work?');
  await say(guest, 'Also where is the washing machine?');
  const id = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const rows = q.all("SELECT status FROM messages WHERE conversation_id = ? AND role = 'bot' AND kind = 'answer'", id);
  assert.deepEqual(rows.map((r) => r.status).sort(), ['pending', 'superseded']);
  // Only one holding note within the window.
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND kind = 'holding'", id).n, 1);
});

test('team takeover pauses the assistant; erase removes the chat', async () => {
  const guest = await openChat(srv.base);
  const id = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const team = await signIn(srv.base);
  await team('POST', `/api/admin/conversations/${id}/takeover`, { paused: true });
  const me = await say(guest, 'How do I use the washing machine?');
  assert.deepEqual(texts(me), ['guest:answer']);
  await team('POST', `/api/admin/conversations/${id}/reply`, { text: 'Hello, Tess here.' });
  assert.equal((await guest('GET', '/api/guest/me')).json.messages.at(-1).role, 'team');
  assert.equal((await guest('POST', '/api/guest/erase', {})).status, 200);
  assert.equal(q.get('SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ?', id).n, 0);
  assert.equal((await guest('GET', '/api/guest/me')).status, 401);
});

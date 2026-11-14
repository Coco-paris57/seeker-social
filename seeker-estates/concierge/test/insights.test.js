import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, say, q } from './helpers.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); });
after(() => srv.close());

test('a request carries the assistant\'s suggested reply once the property has something to go on', async () => {
  // Teach the property one approved reply, then ask something the knowledge base does not cover.
  const first = await openChat(srv.base);
  const a = await say(first, 'How do I use the washing machine?');
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.find((x) => x.conversation.id === a.conversation.id).draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  const guest = await openChat(srv.base);
  const me = await say(guest, 'Is there a cot available?');
  const ticket = (await team('GET', '/api/admin/inbox')).json.tickets.find((t) => t.conversationId === me.conversation.id);
  assert.equal(typeof ticket.suggestion, 'string');
  assert.ok(ticket.suggestion.length > 10);
  // The guest has not seen it: only the fixed acknowledgement went out.
  assert.equal(me.messages.at(-1).kind, 'holding');
  assert.ok(!me.messages.some((m) => m.text === ticket.suggestion));
  // Once answered, the suggestion is no longer offered.
  const done = await team('POST', `/api/admin/tickets/${ticket.id}/answer`, { answer: 'Yes, in the wardrobe.' });
  assert.equal(done.json.ticket.suggestion, null);
});

test('each chat gets a summary, and an unhappy guest is flagged and notified once', async () => {
  const { sent } = await import('../src/notify.js');
  const guest = await openChat(srv.base);
  const me = await say(guest, 'This is unacceptable, the flat is dirty and I am very disappointed');
  const c = (await team('GET', `/api/admin/conversations/${me.conversation.id}`)).json.conversation;
  assert.equal(c.mood, 'unhappy');
  assert.match(c.summary, /unacceptable/);
  assert.ok(sent.some((n) => /sounds unhappy/i.test(n.title)));
  const before = sent.filter((n) => /sounds unhappy/i.test(n.title)).length;
  await say(guest, 'I am still disappointed');
  assert.equal(sent.filter((n) => /sounds unhappy/i.test(n.title)).length, before, 'not notified again for the same chat');
  // The guest never sees the summary or the flag.
  assert.ok(!JSON.stringify((await guest('GET', '/api/guest/me')).json).includes('unhappy'));
});

test('insights add up, and need a team session', async () => {
  assert.equal((await client(srv.base)('GET', '/api/admin/insights')).status, 401);
  // A reply that took a known time: guest wrote 30 minutes ago, answered now.
  const guest = await openChat(srv.base);
  const me = await say(guest, 'What about the washing machine?');
  q.run("UPDATE messages SET sent_at = strftime('%Y-%m-%d %H:%M:%f', 'now', '-30 minutes'), created_at = datetime('now', '-30 minutes') WHERE conversation_id = ? AND role = 'guest'", me.conversation.id);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.find((x) => x.conversation.id === me.conversation.id).draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, { text: 'Edited: use Cotton 30.' });
  const d = (await team('GET', '/api/admin/insights?days=30')).json;
  assert.equal(d.days, 30);
  assert.ok(d.chats >= 4);
  assert.ok(d.repliesMeasured >= 3);
  assert.ok(d.medianReplyMinutes >= 0);
  assert.ok(d.answers.approved >= 1 && d.answers.edited >= 1 && d.answers.written >= 1);
  assert.equal(d.answers.automatic, 0); // everything here went through a person
  assert.equal(d.withoutTeamPercent, 0);
  assert.ok(d.unhappy >= 1);
  assert.ok(d.topics.length >= 1 && d.topics.every((t) => t.n >= 1));
  const cot = d.gaps.find((g) => /cot/i.test(g.summary));
  assert.ok(cot && cot.propertyId === ctx.propertyId);
  const row = d.properties.find((p) => p.id === ctx.propertyId);
  assert.ok(row.chats >= 4 && row.questions >= 1);
  // The 30-minute wait is in the measurements.
  const one = (await team('GET', '/api/admin/insights?days=1')).json;
  assert.ok(one.repliesMeasured >= 1);
});

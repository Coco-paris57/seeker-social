import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';
import { followUpTime, reassess } from '../src/bot.js';
import { runFollowups } from '../src/journey.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); });
after(() => srv.close());
const chatOf = async (id) => (await team('GET', `/api/admin/conversations/${id}`)).json.conversation;

test('mood follows the whole conversation and what the team does, with a check-in message proposed for an unhappy guest', async () => {
  const guest = await openChat(srv.base);
  let me = await say(guest, 'This is unacceptable, the flat is dirty and I am very disappointed');
  const id = me.conversation.id;
  let c = await chatOf(id);
  assert.equal(c.mood, 'unhappy');
  assert.equal(c.followUp.status, 'suggested');
  assert.ok(c.followUp.text.length > 20);
  assert.ok(Date.parse(c.followUp.at) > Date.now());

  // A short, polite next message does not make an unhappy guest neutral.
  await say(guest, 'ok');
  assert.equal((await chatOf(id)).mood, 'unhappy');
  // Nothing has been sent to the guest about a check-in.
  assert.ok(!(await guest('GET', '/api/guest/me')).json.messages.some((m) => /wanted to check/.test(m.text)));

  // The team answers the complaint and closes the request: the mood is looked at again.
  for (const t of (await team('GET', '/api/admin/inbox')).json.tickets.filter((x) => x.conversationId === id)) {
    await team('POST', `/api/admin/tickets/${t.id}/answer`, { answer: 'We are very sorry. A cleaner is on the way and will be with you within the hour.', verbatim: true });
  }
  await reassess(id);
  c = await chatOf(id);
  assert.equal(c.mood, 'neutral');
  assert.match(c.summary, /team has replied/);

  // The guest thanks us: positive, and no check-in is proposed any more.
  await say(guest, 'Thank you so much, all sorted');
  c = await chatOf(id);
  assert.equal(c.mood, 'positive');
  assert.equal(c.followUp, null);
});

test('a check-in is sent only when the team schedules it, at the chosen time, and is held back if the guest writes first', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'I want to complain, the heating is terrible');
  const id = me.conversation.id;
  const proposal = (await chatOf(id)).followUp;
  assert.equal(await runFollowups(Date.now() + 30 * 86400_000), 0); // a suggestion alone is never sent

  assert.equal((await team('POST', `/api/admin/conversations/${id}/followup`, { text: 'x', at: new Date(Date.now() - 3600_000).toISOString() })).status, 400);
  const at = new Date(Date.now() + 2 * 3600_000).toISOString();
  const ok = await team('POST', `/api/admin/conversations/${id}/followup`, { text: `${proposal.text} (edited)`, at });
  assert.equal(ok.json.conversation.followUp.status, 'scheduled');
  assert.equal(await runFollowups(), 0); // not yet
  assert.equal(await runFollowups(Date.parse(at) + 1000), 1);
  assert.equal(await runFollowups(Date.parse(at) + 2000), 0); // once
  const last = (await guest('GET', '/api/guest/me')).json.messages.at(-1);
  assert.match(last.text, /\(edited\)$/);
  assert.equal((await chatOf(id)).followUp, null);

  // Scheduled again. What the guest says before it is due decides what happens to it.
  const { sent } = await import('../src/notify.js');
  const text = 'Checking in again about the broken heating radiator engineer visit.';
  await say(guest, 'Still not happy, it is awful');
  // 1. The guest writes about something else: it still goes.
  await team('POST', `/api/admin/conversations/${id}/followup`, { text, at });
  await say(guest, 'Any news?');
  assert.equal((await chatOf(id)).followUp.status, 'scheduled');
  assert.equal(await runFollowups(Date.parse(at) + 1000), 1);
  // 2. The guest gives a partial update on the same topic: the assistant is not sure, so it asks the team.
  await say(guest, 'Not happy');
  await team('POST', `/api/admin/conversations/${id}/followup`, { text: 'Hello, has the plumber managed to repair the leaking bathroom shower properly?', at });
  await say(guest, 'The plumber looked at the shower in the bathroom');
  assert.equal(await runFollowups(Date.parse(at) + 1000), 0);
  const held = (await chatOf(id)).followUp;
  assert.equal(held.status, 'suggested');
  assert.match(held.note, /^Not sent: .*Schedule it again if it still fits\.$/);
  assert.ok(sent.some((n) => n.title === 'Scheduled check-in needs a look'));
  assert.ok(!(await guest('GET', '/api/guest/me')).json.messages.some((m) => /has the plumber managed/.test(m.text)));
  // 3. The guest confirms the whole matter: it is unsent, and kept in the chat for the team with the reason.
  await team('POST', `/api/admin/conversations/${id}/followup`, { text: 'Wanted to confirm the replacement kettle and toaster arrived safely yesterday.', at });
  await say(guest, 'Yes I confirm the replacement kettle and toaster arrived safely yesterday, wanted to say');
  assert.equal(await runFollowups(Date.parse(at) + 1000), 0);
  const thread = (await team('GET', `/api/admin/conversations/${id}`)).json.messages;
  assert.equal(thread.at(-1).status, 'withheld');
  assert.match(thread.at(-1).withheldReason, /covered in the conversation by the guest/);
  await say(guest, 'I am still disappointed though');
  assert.ok((await chatOf(id)).followUp);
  // Dismissed: gone, and not proposed again by a team action.
  await team('DELETE', `/api/admin/conversations/${id}/followup`, {});
  await reassess(id);
  assert.equal((await chatOf(id)).followUp, null);
});

test('a check-in is never proposed for the middle of the night', () => {
  const night = Date.parse('2026-11-16T20:30:00Z'); // 20:30 in London; +4h = 00:30
  assert.equal(followUpTime(4, night), '2026-11-17T09:00:00.000Z');
  assert.equal(followUpTime(2, Date.parse('2026-11-16T10:00:00Z')), '2026-11-16T12:00:00.000Z');
  assert.equal(followUpTime(1, Date.parse('2026-11-16T19:30:00Z')), '2026-11-17T09:00:00.000Z');
});

test('from Insights, a quick answer is filed in the right section and the gap is closed', async () => {
  const guest = await openChat(srv.base);
  await say(guest, 'Is there parking nearby?');
  let gap = (await team('GET', '/api/admin/insights')).json.gaps.find((g) => /parking/i.test(g.summary));
  assert.equal(gap.saved, false);
  assert.equal((await team('POST', '/api/admin/knowledge/from-gap', { propertyId: gap.propertyId, question: gap.summary, answer: '' })).status, 400);
  const out = await team('POST', '/api/admin/knowledge/from-gap', { propertyId: gap.propertyId, question: gap.summary, answer: ' no parking on site, nearest car park is NCP on Jamestown Rd ' });
  assert.equal(out.status, 201);
  assert.equal(out.json.knowledge.category, 'transport');
  assert.equal(out.json.knowledge.propertyId, ctx.propertyId);
  assert.equal(out.json.knowledge.answer, 'no parking on site, nearest car park is NCP on Jamestown Rd');
  assert.equal(out.json.knowledge.sensitive, false);
  gap = (await team('GET', '/api/admin/insights')).json.gaps.find((g) => /parking/i.test(g.summary));
  assert.equal(gap.saved, true);
  // Anything about access is kept for verified guests, whatever was ticked.
  const code = await team('POST', '/api/admin/knowledge/from-gap', { propertyId: ctx.propertyId, question: 'Where is the key safe', answer: 'By the front door, code 1234', sensitive: false });
  assert.equal(code.json.knowledge.sensitive, true);
});

test('an older chat with no mood is read when it is opened, and a chat a person has taken over still gets a mood', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'How do I use the washing machine?');
  const id = me.conversation.id;
  q.run('UPDATE conversations SET mood = NULL, summary = NULL WHERE id = ?', id); // as chats from before this feature are
  assert.equal((await chatOf(id)).mood, null);
  await reassess(id); // the read started by opening it has finished
  const c = await chatOf(id);
  assert.equal(c.mood, 'neutral');
  assert.match(c.summary, /washing machine/);

  await team('POST', `/api/admin/conversations/${id}/takeover`, { paused: true });
  await say(guest, 'This is unacceptable, nobody came');
  await reassess(id);
  assert.equal((await chatOf(id)).mood, 'unhappy');
});

test('a planned message is held back when the guest or the team has already covered it, and the team can see why', async () => {
  const { useSmoobuClient } = await import('../src/smoobu.js');
  const { runScheduled, dueAt } = await import('../src/journey.js');
  const outbox = [];
  useSmoobuClient({ sendMessageToGuest: async (id, body) => { outbox.push(body); return {}; } });
  try {
    const body = 'A quick reminder that checkout tomorrow morning is by 11:00, please leave the keys on the kitchen table.';
    const t = (await team('POST', '/api/admin/templates', { name: 'Checkout reminder', anchor: 'departure', days: -1, time: '18:00', body, enabled: true, auto: true })).json.template;
    const r = q.get('SELECT * FROM reservations WHERE id = 501');
    const due = dueAt(q.get('SELECT * FROM templates WHERE id = ?', t.id), r);
    // The team has already told this guest the same thing in the booking-channel chat.
    const cid = q.insert("INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified) VALUES(?, 501, 'smoobu', 'Zoë', 1)", ctx.propertyId);
    q.run("INSERT INTO messages(conversation_id, role, body, status, sent_at) VALUES(?, 'guest', 'What time is checkout and where do the keys go?', 'sent', datetime('now'))", cid);
    q.run("INSERT INTO messages(conversation_id, role, body, status, sent_at) VALUES(?, 'team', 'Checkout tomorrow morning is by 11:00, and please leave the keys on the kitchen table. Have a quick and safe journey, a reminder is not needed.', 'sent', datetime('now'))", cid);
    assert.deepEqual(await runScheduled(due + 1000), { sent: 0, queued: 0, held: 1 });
    assert.equal(outbox.length, 0);
    assert.deepEqual(await runScheduled(due + 2000), { sent: 0, queued: 0 }); // decided once
    const shown = (await team('GET', `/api/admin/conversations/${cid}`)).json.messages.at(-1);
    assert.equal(shown.status, 'withheld');
    assert.match(shown.withheldReason, /Already covered/);
    // A different booking with a quiet chat still gets it.
    q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure) VALUES(777, ?, 'Sam', 'Lee', 'Sam Lee', ?, ?)", ctx.propertyId, r.arrival, r.departure);
    assert.deepEqual(await runScheduled(due + 3000), { sent: 1, queued: 0 });
    assert.equal(outbox.length, 1);
    await team('DELETE', `/api/admin/templates/${t.id}`, {});

    // A scheduled check-in: the team then deals with the matter themselves before it is due.
    const guest = await openChat(srv.base);
    const me = await say(guest, 'I want to complain, the shower is terrible');
    const id = me.conversation.id;
    const at = new Date(Date.now() + 3600_000).toISOString();
    const text = 'Hello, we wanted to check the shower is working properly again after the plumber visit.';
    await team('POST', `/api/admin/conversations/${id}/followup`, { text, at });
    await team('POST', `/api/admin/conversations/${id}/reply`, { text: 'Hello, the plumber has finished: we wanted to check the shower is working properly again after the visit?' });
    assert.equal(await runFollowups(Date.parse(at) + 1000), 0);
    const all = (await team('GET', `/api/admin/conversations/${id}`)).json.messages;
    assert.equal(all.at(-1).status, 'withheld');
    // The guest was never shown it.
    assert.ok(!(await guest('GET', '/api/guest/me')).json.messages.some((m) => m.text === text));
  } finally {
    useSmoobuClient(null);
  }
});

test('when the assistant is unsure a scheduled message still fits, it asks the team instead of sending', async () => {
  const { useSmoobuClient } = await import('../src/smoobu.js');
  const { runScheduled, dueAt } = await import('../src/journey.js');
  const outbox = [];
  useSmoobuClient({ sendMessageToGuest: async (id, body) => { outbox.push(body); return {}; } });
  try {
    q.run('DELETE FROM reservations WHERE id = 777');
    q.run("DELETE FROM conversations WHERE channel = 'smoobu'");
    const t = (await team('POST', '/api/admin/templates', { name: 'Parking note', anchor: 'arrival', days: 0, time: '08:00', body: 'Please remember visitor parking permits must be displayed inside the windscreen overnight.', enabled: true, auto: true })).json.template;
    const r = q.get('SELECT * FROM reservations WHERE id = 501');
    const cid = q.insert("INSERT INTO conversations(property_id, reservation_id, channel, guest_name, verified) VALUES(?, 501, 'smoobu', 'Zoë', 1)", ctx.propertyId);
    q.run("INSERT INTO messages(conversation_id, role, body, status, sent_at) VALUES(?, 'guest', 'We are not bringing a car, so no parking permits needed for visitor spaces', 'sent', datetime('now'))", cid);
    const out = await runScheduled(dueAt(q.get('SELECT * FROM templates WHERE id = ?', t.id), r) + 1000);
    assert.deepEqual(out, { sent: 0, queued: 1 }); // set to send automatically, but not sure: a person decides
    assert.equal(outbox.length, 0);
    const card = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === cid);
    assert.match(card.draft.checkNote, /guest has said something on this topic/);
    await team('DELETE', `/api/admin/templates/${t.id}`, {});
  } finally {
    useSmoobuClient(null);
  }
});

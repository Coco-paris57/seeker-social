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

  // Scheduled again, then the guest writes before it goes: it waits for a person.
  await say(guest, 'Still not happy, it is awful');
  await team('POST', `/api/admin/conversations/${id}/followup`, { text: 'Checking in again.', at });
  await say(guest, 'Any news?');
  const held = (await chatOf(id)).followUp;
  assert.equal(held.status, 'suggested');
  assert.match(held.note, /written since/);
  assert.equal(await runFollowups(Date.parse(at) + 1000), 0);
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

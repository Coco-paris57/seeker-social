import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';
import { buildContext } from '../src/bot.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 1 }); team = await signIn(srv.base); });
after(() => srv.close());

const approve = async (conversationId, body = {}) => {
  const item = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === conversationId);
  return team('POST', `/api/admin/messages/${item.draft.id}/approve`, body);
};

test('every Approve & send is kept for the property, edited or not', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'How do I use the washing machine?');
  assert.equal((await approve(me.conversation.id)).status, 200);
  let rows = q.all('SELECT * FROM examples WHERE property_id = ?', ctx.propertyId);
  assert.equal(rows.length, 1);
  assert.match(rows[0].answer, /Cotton 40/);
  assert.equal(rows[0].edited, 0);
  assert.equal(rows[0].private, 0); // approved for an unverified guest

  // The same question again, corrected this time: the stored reply is replaced, not duplicated.
  const second = await openChat(srv.base);
  const again = await say(second, 'How do I use the washing machine?');
  await approve(again.conversation.id, { text: 'Use Cotton 30 and press Start. Pods are under the sink.' });
  rows = q.all('SELECT * FROM examples WHERE property_id = ?', ctx.propertyId);
  assert.equal(rows.length, 1);
  assert.match(rows[0].answer, /Cotton 30/);
  assert.equal(rows[0].edited, 1);

  // The assistant is given it for the next guest at this property.
  const third = await openChat(srv.base);
  const id = (await third('GET', '/api/guest/me')).json.conversation.id;
  const context = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', id), { latest: 'washing machine?' });
  assert.equal(context.examples.length, 1);
  assert.match(context.examples[0].approved_reply, /Cotton 30/);
  assert.equal(context.examples[0].corrected_by_team, true);
});

test('a reply the team writes when rejecting a draft is kept too; removed ones are forgotten', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'Where do I put the washing machine pods?');
  const item = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === me.conversation.id);
  await team('POST', `/api/admin/messages/${item.draft.id}/reject`, { replyText: 'One pod goes straight in the drum, not the drawer.' });
  const page = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json;
  const kept = page.examples.find((e) => /drum, not the drawer/.test(e.answer));
  assert.ok(kept);
  assert.equal(kept.edited, true);
  assert.equal(page.property.exampleCount, page.examples.length);
  assert.equal((await team('DELETE', `/api/admin/examples/${kept.id}`, {})).status, 200);
  assert.ok(!(await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.examples.some((e) => e.id === kept.id));
});

test('a reply approved for a verified guest is not reused for unverified visitors, and never stores their link', async () => {
  const LINK = 'https://app.chargeautomation.com/securelink/PrivateOne1';
  q.run('UPDATE reservations SET checkin_link = ? WHERE id = 501', LINK);
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const me = await say(guest, 'How do I check in?');
  await approve(me.conversation.id);
  const row = q.get("SELECT * FROM examples WHERE property_id = ? AND private = 1", ctx.propertyId);
  assert.ok(row);
  assert.ok(!row.answer.includes(LINK), 'the private link must be stored as a placeholder');
  assert.match(row.answer, /\[CHECKIN_LINK\]/);

  const stranger = await openChat(srv.base);
  const id = (await stranger('GET', '/api/guest/me')).json.conversation.id;
  const seen = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', id), { latest: 'How do I check in?' });
  assert.ok(seen.examples.every((e) => !/CHECKIN_LINK|4821/.test(e.approved_reply)));
  const verified = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', me.conversation.id), { latest: 'How do I check in?' });
  assert.ok(verified.examples.some((e) => /CHECKIN_LINK/.test(e.approved_reply)));
});

test('approved replies stay with their property', async () => {
  const other = q.insert("INSERT INTO properties(name, qr_token) VALUES('Other', 'qr-other')");
  const c = q.insert("INSERT INTO conversations(property_id, channel) VALUES(?, 'web')", other);
  assert.equal(buildContext(q.get('SELECT * FROM conversations WHERE id = ?', c), { latest: 'washing machine' }).examples.length, 0);
});

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); });
after(() => srv.close());
const flag = async (id) => (await team('GET', `/api/admin/conversations/${id}`)).json.conversation.unread;

test('a guest message makes the chat unread; a holding note keeps it unread; the real reply marks it read', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'How do I use the washing machine?'); // learning mode: draft + holding note
  const id = me.conversation.id;
  assert.equal(await flag(id), true);
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.unread, 1);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals[0].draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(await flag(id), false);
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.unread, 0);
  // The guest writes again: unread again.
  await say(guest, 'thanks, and is there a cot?');
  assert.equal(await flag(id), true);
  // A team member replying directly marks it read.
  await team('POST', `/api/admin/conversations/${id}/reply`, { text: 'Yes, in the wardrobe.' });
  assert.equal(await flag(id), false);
});

test('the team can mark a chat read or unread by hand, and filter to unread', async () => {
  const guest = await openChat(srv.base);
  const id = (await say(guest, 'fyi, cheers')).conversation.id;
  assert.equal((await team('POST', `/api/admin/conversations/${id}/read`, { read: true })).json.conversation.unread, false);
  let unread = (await team('GET', '/api/admin/conversations?unread=1')).json.conversations.map((c) => c.id);
  assert.ok(!unread.includes(id));
  assert.equal((await team('POST', `/api/admin/conversations/${id}/read`, { read: false })).json.conversation.unread, true);
  unread = (await team('GET', '/api/admin/conversations?unread=1')).json.conversations.map((c) => c.id);
  assert.ok(unread.includes(id));
  assert.equal((await team('POST', `/api/admin/conversations/${id}/read`, { read: 'yes' })).status, 400);
  assert.equal((await team('GET', '/api/admin/conversations')).json.conversations.length >= 2, true);
});

test('existing databases get the flag, set from who spoke last', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const { openDb } = await import('../src/db.js');
  const fs = await import('node:fs'); const os = await import('node:os'); const path = await import('node:path');
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cc-')), 'old.db');
  const fresh = openDb(file); fresh.exec('ALTER TABLE conversations DROP COLUMN needs_reply');
  fresh.exec("INSERT INTO conversations(id, channel) VALUES(1, 'web'), (2, 'web'), (3, 'web')");
  fresh.exec("INSERT INTO messages(conversation_id, role, body, status, kind) VALUES(1, 'guest', 'hi', 'sent', 'answer'), (2, 'guest', 'hi', 'sent', 'answer'), (2, 'bot', 'answer', 'sent', 'answer'), (3, 'guest', 'hi', 'sent', 'answer'), (3, 'bot', 'checking', 'sent', 'holding')");
  fresh.close();
  const db = openDb(file);
  assert.deepEqual(db.prepare('SELECT id, needs_reply FROM conversations ORDER BY id').all().map((r) => [r.id, r.needs_reply]), [[1, 1], [2, 0], [3, 1]]);
  db.close();
});

test('"No response needed" marks the chat read and removes the suggestion without counting it as rejected', async () => {
  const guest = await openChat(srv.base);
  const id = (await say(guest, 'How do I use the washing machine?')).conversation.id;
  const before = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.property.stats;
  assert.ok((await team('GET', '/api/admin/inbox')).json.approvals.some((a) => a.conversation.id === id));
  const out = await team('POST', `/api/admin/conversations/${id}/no-response`, {});
  assert.equal(out.status, 200);
  assert.equal(out.json.withdrawn, 1);
  assert.equal(out.json.conversation.unread, false);
  assert.ok(!(await team('GET', '/api/admin/inbox')).json.approvals.some((a) => a.conversation.id === id));
  const after = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.property.stats;
  assert.equal(after.rejected, before.rejected);
  // The guest saw nothing new, and the assistant does not come back to that message later.
  assert.equal((await guest('GET', '/api/guest/me')).json.messages.at(-1).kind, 'holding');
  const next = await say(guest, 'Is there a cot?');
  assert.ok(!JSON.stringify(q.all("SELECT body FROM messages WHERE conversation_id = ? AND status = 'pending'", next.conversation.id)).includes('Cotton 40'));
});

test('an archived chat is hidden, findable, and comes back when the guest writes again', async () => {
  const guest = await openChat(srv.base);
  const id = (await say(guest, 'How do I use the washing machine?')).conversation.id;
  const ids = async (query = '') => (await team('GET', `/api/admin/conversations${query}`)).json.conversations.map((c) => c.id);
  assert.ok((await ids()).includes(id));
  const out = await team('POST', `/api/admin/conversations/${id}/archive`, { archived: true });
  assert.equal(out.json.conversation.archived, true);
  assert.equal(out.json.conversation.unread, false);
  assert.ok(!(await ids()).includes(id), 'hidden from the normal list');
  assert.ok((await ids('?archived=1')).includes(id), 'listed under Archived');
  assert.ok((await ids('?q=washing')).includes(id), 'found by search');
  assert.ok(!(await team('GET', '/api/admin/inbox')).json.approvals.some((a) => a.conversation.id === id), 'its suggestion is withdrawn');
  // Still readable for the guest, and a new message brings it back, unread.
  await say(guest, 'Hello, one more question about the washing machine');
  assert.ok((await ids()).includes(id));
  const c = (await team('GET', `/api/admin/conversations/${id}`)).json.conversation;
  assert.equal(c.archived, false);
  assert.equal(c.unread, true);
  // Unarchive by hand works too.
  await team('POST', `/api/admin/conversations/${id}/archive`, { archived: true });
  assert.equal((await team('POST', `/api/admin/conversations/${id}/archive`, { archived: false })).json.conversation.archived, false);
  assert.equal((await team('POST', `/api/admin/conversations/${id}/archive`, {})).status, 400);
});

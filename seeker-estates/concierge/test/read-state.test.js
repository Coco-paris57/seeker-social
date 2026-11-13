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

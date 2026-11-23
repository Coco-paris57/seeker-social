import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';
import { translateTo } from '../src/llm.js';

let srv, team;
before(async () => { srv = await startServer(); seed(); team = await signIn(srv.base); }); // learning mode: every reply waits for approval
after(() => srv.close());
const draftFor = async (id) => (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === id)?.draft;
const lastSent = (id) => q.get("SELECT * FROM messages WHERE conversation_id = ? AND role != 'guest' AND status = 'sent' AND kind = 'answer' ORDER BY id DESC LIMIT 1", id);

test('a guest writing in another language: the draft is in English, and is sent in their language', async () => {
  // Unchanged: the assistant's own wording in the guest's language goes out.
  let guest = await openChat(srv.base);
  let id = (await say(guest, 'Olá, bom dia! How do I use the washing machine?')).conversation.id;
  let draft = await draftFor(id);
  assert.equal(draft.sendIn, 'Portuguese');
  assert.ok(!draft.text.startsWith('[Portuguese]')); // what the team reads and edits is English
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/approve`, {})).status, 200);
  let sent = lastSent(id);
  assert.equal(sent.body, `[Portuguese] ${draft.text}`);
  assert.equal(JSON.parse(sent.meta).english, draft.text);
  assert.ok(!('translated' in JSON.parse(sent.meta)));
  const shown = (await team('GET', `/api/admin/conversations/${id}`)).json.messages.find((m) => m.id === sent.id);
  assert.equal(shown.english, draft.text); // the chat shows what was agreed in English
  // What is learned from it is the English.
  assert.ok(!q.get("SELECT 1 FROM examples WHERE answer LIKE '[Portuguese]%'"));

  // Edited in English: the agreed text is translated; links, times and codes go out exactly as typed.
  guest = await openChat(srv.base);
  id = (await say(guest, 'Olá, obrigado. How do I use the washing machine?')).conversation.id;
  draft = await draftFor(id);
  const agreed = 'Hi Ana,\nCheckout is at 10:30 on 21/11. Details: https://example.com/guide?x=1\nMany thanks,';
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/approve`, { text: agreed })).status, 200);
  sent = lastSent(id);
  assert.equal(sent.body, `[Portuguese] ${agreed}`);
  assert.equal(JSON.parse(sent.meta).english, agreed);
  assert.equal(JSON.parse(sent.meta).edited, true);

  // "Send in English" sends exactly what is in the box.
  guest = await openChat(srv.base);
  id = (await say(guest, 'Bom dia, How do I use the washing machine?')).conversation.id;
  draft = await draftFor(id);
  await team('POST', `/api/admin/messages/${draft.id}/approve`, { translate: false });
  assert.equal(lastSent(id).body, draft.text);

  // Written by hand in the chat, or in place of a rejected draft: translated only when asked.
  await team('POST', `/api/admin/conversations/${id}/reply`, { text: 'Parking is on the street, free after 6pm.', translate: true });
  assert.equal(lastSent(id).body, '[Portuguese] Parking is on the street, free after 6pm.');
  await team('POST', `/api/admin/conversations/${id}/reply`, { text: 'Thank you.' });
  assert.equal(lastSent(id).body, 'Thank you.');
  guest = await openChat(srv.base);
  id = (await say(guest, 'Boa tarde, How do I use the washing machine?')).conversation.id;
  draft = await draftFor(id);
  await team('POST', `/api/admin/messages/${draft.id}/reject`, { replyText: 'Yes, we will bring a cot at 3pm.', translate: true });
  assert.equal(lastSent(id).body, '[Portuguese] Yes, we will bring a cot at 3pm.');
});

test('a guest writing in English is unaffected, and a translation that loses something is not sent', async () => {
  const guest = await openChat(srv.base);
  const id = (await say(guest, 'How do I use the washing machine?')).conversation.id;
  const draft = await draftFor(id);
  assert.equal(draft.sendIn, null);
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(lastSent(id).body, draft.text);
  assert.equal(JSON.parse(lastSent(id).meta).english, undefined);
  // Numbers, times and links are put back exactly.
  assert.equal(await translateTo('Code 4821#, at 3pm: https://x.test/a', 'French'), '[French] Code 4821#, at 3pm: https://x.test/a');
});

test('a draft can be rewritten by the assistant from what the team says; nothing is sent until it is approved', async () => {
  const anon = (await import('./helpers.js')).client(srv.base);
  let guest = await openChat(srv.base);
  let id = (await say(guest, 'How do I use the washing machine?')).conversation.id;
  let draft = await draftFor(id);
  assert.equal(draft.redrafted, 0);
  assert.equal((await anon('POST', `/api/admin/messages/${draft.id}/redraft`, { instruction: 'x' })).status, 401);
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/redraft`, { instruction: ' ' })).status, 400);
  const out = await team('POST', `/api/admin/messages/${draft.id}/redraft`, { instruction: 'Use the Eco 30 programme, not Cotton 40.' });
  assert.equal(out.status, 200);
  assert.equal(out.json.draft.id, draft.id);
  assert.match(out.json.draft.text, /Eco 30 programme/);
  assert.equal(out.json.draft.redrafted, 1);
  assert.equal(out.json.draft.status, 'pending');
  assert.ok(!lastSent(id)); // still waiting
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.match(lastSent(id).body, /Eco 30 programme/);
  assert.equal(JSON.parse(lastSent(id).meta).edited, true); // counts as corrected by the team, so it is the pattern to follow
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/redraft`, { instruction: 'again' })).status, 409); // already sent

  // For a guest writing in another language the rewrite is in English, and what is sent is translated from it.
  guest = await openChat(srv.base);
  id = (await say(guest, 'Bom dia, How do I use the washing machine?')).conversation.id;
  draft = await draftFor(id);
  const next = (await team('POST', `/api/admin/messages/${draft.id}/redraft`, { instruction: 'Add that the powder is under the sink.' })).json.draft;
  assert.equal(next.sendIn, 'Portuguese');
  assert.ok(!next.text.includes('[Portuguese]'));
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(lastSent(id).body, `[Portuguese] ${next.text}`);
});

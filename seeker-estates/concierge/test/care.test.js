import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, client, openChat, say, q, addDays, londonDate } from './helpers.js';
import { stayCare } from '../src/care.js';
import { reassess } from '../src/bot.js';

let srv, ctx, team;
before(async () => { srv = await startServer(); ctx = seed(); team = await signIn(srv.base); });
after(() => srv.close());
const chat = async (id) => (await team('GET', `/api/admin/conversations/${id}`)).json;

test('the assistant suggests things to do for a guest from the conversation; done and dismissed ones are not suggested again', async () => {
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  let id = (await say(guest, 'We are here for our anniversary! How do I use the washing machine?')).conversation.id;
  let care = (await chat(id)).care;
  assert.equal(care.length, 1);
  assert.equal(care[0].kind, 'gift');
  assert.match(care[0].title, /prosecco.*anniversary/);
  assert.match(care[0].why, /anniversary/);
  // The same suggestion is on the guest card and on the To do list, and is counted on the tab.
  assert.equal((await team('GET', '/api/admin/reservations/501')).json.care[0].id, care[0].id);
  const todo = (await team('GET', '/api/admin/todo')).json;
  assert.ok(todo.care.some((a) => a.id === care[0].id && a.guestName && a.propertyName === 'Test Flat'));
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.todo, todo.badge);
  assert.ok(todo.badge >= 1);

  // Another message keeps the same suggestion (same id), and adds what is new.
  await say(guest, 'Also we have our baby with us');
  const next = (await chat(id)).care;
  assert.ok(next.some((a) => a.id === care[0].id));
  const cot = next.find((a) => a.kind === 'gesture');
  assert.match(cot.title, /cot/);

  // Done: off every list, and not proposed again when the guest writes once more.
  assert.equal((await client(srv.base)('POST', `/api/admin/care/${care[0].id}/done`, {})).status, 401);
  assert.equal((await team('POST', `/api/admin/care/${care[0].id}/done`, {})).status, 200);
  assert.equal((await team('POST', `/api/admin/care/${care[0].id}/done`, {})).status, 409);
  assert.equal((await team('DELETE', `/api/admin/care/${cot.id}`, {})).status, 200);
  await say(guest, 'Thanks, one more thing about our anniversary dinner with the baby');
  assert.deepEqual((await chat(id)).care, []);
  assert.equal(q.get("SELECT COUNT(*) AS n FROM care WHERE conversation_id = ? AND status = 'suggested'", id).n, 0);
});

test('an unhappy guest gets a goodwill suggestion; a suggested note is sent as written and in the guest\'s language', async () => {
  const guest = await openChat(srv.base);
  const id = (await say(guest, 'Bom dia, this is unacceptable, the flat is dirty and I am very disappointed')).conversation.id;
  const care = (await chat(id)).care;
  assert.ok(care.some((a) => a.kind === 'gift' && /apology/.test(a.title)));
  // A note to send: edited by the team, translated for the guest, then off the list.
  const noteId = q.insert("INSERT INTO care(conversation_id, kind, title, why, body) VALUES(?, 'message', 'Send a personal apology', 'Unhappy guest', 'We are so sorry.')", id);
  assert.equal((await team('POST', `/api/admin/care/${noteId}/send`, { text: '' })).status, 400);
  assert.equal((await team('POST', `/api/admin/care/${noteId}/send`, { text: 'We are truly sorry, a cleaner will be with you at 3pm.' })).status, 200);
  const sent = q.get("SELECT * FROM messages WHERE conversation_id = ? AND role = 'team' ORDER BY id DESC LIMIT 1", id);
  assert.equal(sent.body, '[Portuguese] We are truly sorry, a cleaner will be with you at 3pm.');
  assert.equal(JSON.parse(sent.meta).english, 'We are truly sorry, a cleaner will be with you at 3pm.');
  assert.equal(q.get('SELECT status FROM care WHERE id = ?', noteId).status, 'done');
});

test('a long stay gets a welcome treat suggested once; an ordinary question suggests nothing', async () => {
  const today = londonDate();
  q.run("INSERT INTO reservations(id, property_id, first_name, guest_name, arrival, departure) VALUES(7700, ?, 'Lena', 'Lena Fischer', ?, ?)", ctx.propertyId, addDays(today, 1), addDays(today, 9));
  q.run("INSERT INTO reservations(id, property_id, first_name, guest_name, arrival, departure) VALUES(7701, ?, 'Sam', 'Sam Short', ?, ?)", ctx.propertyId, addDays(today, 1), addDays(today, 3));
  assert.equal(stayCare(), 1);
  assert.equal(stayCare(), 0);
  const card = (await team('GET', '/api/admin/reservations/7700')).json;
  assert.equal(card.care.length, 1);
  assert.match(card.care[0].why, /8 nights/);
  assert.deepEqual((await team('GET', '/api/admin/reservations/7701')).json.care, []);
  await team('DELETE', `/api/admin/care/${card.care[0].id}`, {});
  assert.equal(stayCare(), 0); // dismissed stays dismissed

  const guest = await openChat(srv.base);
  const id = (await say(guest, 'How do I use the washing machine?')).conversation.id;
  assert.deepEqual((await chat(id)).care, []);
  await reassess(id, { force: true });
  assert.deepEqual((await chat(id)).care, []);
});

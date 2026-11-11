import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';
import { checkinFromNotice, upsertReservation } from '../src/sync.js';
import { buildContext, CHECKIN_LINK } from '../src/bot.js';

const LINK = 'https://app.chargeautomation.com/securelink/AbC123xyZ9';
let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 5 }); q.run('UPDATE reservations SET checkin_link = ? WHERE id = 501', LINK); });
after(() => srv.close());

test('the link and status are read from the Smoobu booking note', () => {
  assert.deepEqual(checkinFromNotice(`Guest language: en CA_PRE_ARRIVAL_LINK : ${LINK}`), { link: LINK, done: false });
  assert.deepEqual(checkinFromNotice(`Guest will arrive By Car CA Online check-in Completed.\nCA_PRE_ARRIVAL_LINK : ${LINK}.`), { link: LINK, done: true });
  assert.deepEqual(checkinFromNotice('Guest message: see https://evil.example/securelink/x'), { link: null, done: false });
  q.run("INSERT INTO properties(smoobu_id, name, qr_token) VALUES(77, 'S', 'tok-s')");
  upsertReservation({ id: 601, apartment: { id: 77 }, arrival: '2027-01-02', departure: '2027-01-04', firstname: 'A', lastname: 'B', notice: `CA_PRE_ARRIVAL_LINK : ${LINK}\nCA Online check-in Completed.` });
  const r = q.get('SELECT checkin_link, checkin_done FROM reservations WHERE id = 601');
  assert.equal(r.checkin_link, LINK);
  assert.equal(r.checkin_done, 1);
});

test('an unverified guest is asked to verify at once, then gets their link without waiting for the team', async () => {
  const guest = await openChat(srv.base);
  const me = await say(guest, 'How do I check in? What is the door code?');
  // Learning mode, yet no draft and no "confirming with the team": the fixed verify request goes straight out.
  assert.deepEqual(me.messages.map((m) => m.kind), ['answer', 'verify']);
  assert.ok(!JSON.stringify(me).includes('chargeautomation'));
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND status = 'pending'", me.conversation.id).n, 0);

  assert.equal((await guest('POST', '/api/guest/verify', { lastName: 'obrien muller', arrivalDate: ctx.arrival })).status, 200);
  const { afterVerification } = await import('../src/bot.js');
  await afterVerification(me.conversation.id); // idempotent: the route has already started it
  const after = (await guest('GET', '/api/guest/me')).json;
  assert.equal(after.messages.at(-1).kind, 'checkin');
  assert.ok(after.messages.at(-1).text.includes(LINK));
  assert.match(after.messages.at(-1).text, /complete the online check-in form/);
  assert.equal(after.messages.filter((m) => m.kind === 'checkin').length, 1);
});

test('a guest who cannot verify is not asked twice in a row; the second question reaches the team', async () => {
  const guest = await openChat(srv.base);
  await say(guest, 'What is the door code?');
  const me = await say(guest, 'I am staying with my friend, what is the door code?');
  assert.equal(me.messages.filter((m) => m.kind === 'verify').length, 1);
  const pending = q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND status = 'pending'", me.conversation.id).n;
  const tickets = q.get('SELECT COUNT(*) AS n FROM tickets WHERE conversation_id = ?', me.conversation.id).n;
  assert.ok(pending + tickets >= 1);
});

test('a verified guest gets their own link, and the model only ever sees a placeholder', async () => {
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const me = await say(guest, 'How do I check in?');
  const c = q.get('SELECT * FROM conversations WHERE id = ?', me.conversation.id);
  const context = buildContext(c);
  assert.equal(context.stay.online_checkin_link, CHECKIN_LINK);
  assert.equal(context.stay.online_checkin_completed, false);
  assert.ok(!JSON.stringify(context).includes('chargeautomation'), 'the private link must not be sent to the model');

  // Learning mode: the draft the team sees already carries the real link.
  const team = await signIn(srv.base);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === c.id).draft;
  assert.ok(draft.text.includes(LINK));
  assert.match(draft.text, /complete the online check-in form/);
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  const after = (await guest('GET', '/api/guest/me')).json;
  assert.ok(after.messages.at(-1).text.includes(LINK));
  assert.equal(after.conversation.stay.checkinLink, LINK);
  // Once sent, the link in the history is masked again before the next model call.
  assert.ok(!JSON.stringify(buildContext(c)).includes('chargeautomation'));
});

test('existing databases gain the new columns', async () => {
  const { DatabaseSync } = await import('node:sqlite');
  const { openDb } = await import('../src/db.js');
  const fs = await import('node:fs'); const os = await import('node:os'); const path = await import('node:path');
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'cc-')), 'old.db');
  const old = new DatabaseSync(file);
  old.exec('CREATE TABLE reservations (id INTEGER PRIMARY KEY, property_id INTEGER, first_name TEXT, last_name TEXT, guest_name TEXT, arrival TEXT NOT NULL, departure TEXT NOT NULL, check_in TEXT, check_out TEXT, adults INTEGER, children INTEGER, channel TEXT, language TEXT, cancelled INTEGER NOT NULL DEFAULT 0, synced_at TEXT)');
  old.exec("INSERT INTO reservations(id, arrival, departure) VALUES(1, '2026-01-01', '2026-01-02')");
  old.close();
  const db = openDb(file);
  assert.deepEqual({ ...db.prepare('SELECT checkin_link, checkin_done FROM reservations WHERE id = 1').get() }, { checkin_link: null, checkin_done: 0 });
  db.close();
});

test('the real prompts build without error and carry the placeholder, not the link', async () => {
  const { systemPrompt, userPrompt } = await import('../src/llm.js');
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const id = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const context = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', id), { latest: 'How do I check in?' });
  const text = systemPrompt(context) + userPrompt(context);
  assert.match(text, /\[CHECKIN_LINK\]/);
  assert.match(text, /1 hour before check-in/);
  assert.ok(!text.includes('chargeautomation.com'));
  assert.ok(!text.includes('undefined'));
});

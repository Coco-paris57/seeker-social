import { test } from 'node:test';
import assert from 'node:assert/strict';
import './helpers.js';
import { canonicalQuery, sign, Smoobu } from '../src/smoobu.js';
import { londonToUtc, normaliseName, addDays } from '../src/util.js';
import { hashPassword, verifyPassword } from '../src/auth.js';
import { stageOf } from '../src/bot.js';
import { runRetention } from '../src/retention.js';
import { q } from '../src/db.js';

test('Smoobu signing matches the documented example', () => {
  assert.equal(canonicalQuery({ to: '2026-04-10', from: '2026-04-01' }), 'from=2026-04-01&to=2026-04-10');
  assert.equal(canonicalQuery({ 'apartments[]': [2, 1], q: 'a b' }), 'apartments%5B%5D=1&apartments%5B%5D=2&q=a%20b');
  // Same inputs as revenue/rm/smoobu.py produce the same signature (value computed with that module).
  const sig = sign('secret', 'GET', '/api/reservations', 'from=2026-04-01&to=2026-04-10', '2026-04-01T12:00:00Z', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'usr_live_abc123');
  assert.equal(sig, 'p7NS0eOUUwmuKBN1PSzOqyoaO1VF/nzCf83XLkN/h5s=');
  assert.equal(Buffer.from(sig, 'base64').length, 32);
});

test('Smoobu client signs, retries on 429 and posts messages', async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    if (calls.length === 1) return new Response('', { status: 429 });
    return new Response(JSON.stringify({ status: 201 }), { status: 201 });
  };
  const api = new Smoobu({ key: 'k', secret: 's', fetchImpl });
  const t = Date.now();
  await api.sendMessageToGuest(42, 'Hello');
  assert.ok(Date.now() - t >= 900);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, 'https://login.smoobu.com/api/reservations/42/messages/send-message-to-guest');
  assert.equal(calls[1].init.body, '{"messageBody":"Hello"}');
  for (const h of ['X-API-Key', 'X-Timestamp', 'X-Nonce', 'X-Signature']) assert.ok(calls[1].init.headers[h], h);
  assert.notEqual(calls[0].init.headers['X-Nonce'], calls[1].init.headers['X-Nonce']);
});

test('London time conversion handles winter and summer', () => {
  assert.equal(new Date(londonToUtc('2026-11-12', '15:00')).toISOString(), '2026-11-12T15:00:00.000Z');
  assert.equal(new Date(londonToUtc('2026-07-01', '15:00')).toISOString(), '2026-07-01T14:00:00.000Z');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
});

test('names, passwords and stay stages', () => {
  assert.equal(normaliseName("  O'Brien-Müller "), 'obrienmuller');
  const h = hashPassword('a long passphrase');
  assert.ok(verifyPassword('a long passphrase', h));
  assert.ok(!verifyPassword('a long passphrasE', h));
  assert.equal(stageOf({ arrival: '2026-11-12', departure: '2026-11-15' }, '2026-11-11'), 'before_arrival');
  assert.equal(stageOf({ arrival: '2026-11-12', departure: '2026-11-15' }, '2026-11-15'), 'during_stay');
  assert.equal(stageOf({ arrival: '2026-11-12', departure: '2026-11-15' }, '2026-11-16'), 'after_stay');
  assert.equal(stageOf(null), 'unknown');
});

test('retention erases old conversations and keeps recent ones', () => {
  const old = q.insert("INSERT INTO conversations(channel, last_message_at) VALUES('web', datetime('now', '-200 days'))");
  const fresh = q.insert("INSERT INTO conversations(channel) VALUES('web')");
  for (const id of [old, fresh]) q.run("INSERT INTO messages(conversation_id, role, body) VALUES(?, 'guest', 'hi')", id);
  runRetention();
  assert.equal(q.get('SELECT COUNT(*) AS n FROM conversations WHERE id = ?', old).n, 0);
  assert.equal(q.get('SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ?', old).n, 0);
  assert.equal(q.get('SELECT COUNT(*) AS n FROM conversations WHERE id = ?', fresh).n, 1);
});

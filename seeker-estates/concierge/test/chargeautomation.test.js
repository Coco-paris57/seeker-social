import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, client, seed, signIn, openChat, q } from './helpers.js';
import { ChargeAutomation, useChargeAutomationClient } from '../src/chargeautomation.js';
import { syncTeamRecords } from '../src/sync.js';
import { buildContext } from '../src/bot.js';
import { systemPrompt, userPrompt } from '../src/llm.js';

let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed({ arrivalOffset: 1 }); q.run('UPDATE properties SET smoobu_id = 4242 WHERE id = ?', ctx.propertyId); });
after(() => { useChargeAutomationClient(null); return srv.close(); });

test('the client signs in once, sends the token as a header, and signs in again after a 401', async () => {
  const calls = [];
  let tokens = 0;
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url, auth: init.headers?.Authorization, body: init.body });
    if (url.endsWith('/oauth/token')) return new Response(JSON.stringify({ data: { access_token: `tok${++tokens}`, expires_in: 86400 } }), { status: 200 });
    if (init.headers.Authorization === 'Bearer tok1' && calls.filter((c) => c.url.includes('/property/')).length === 2) return new Response('{}', { status: 401 });
    return new Response(JSON.stringify({ status: 'success', data: [{ id: 9, name: 'Flat', wifi_details: 'Net / pass' }] }), { status: 200 });
  };
  const api = new ChargeAutomation({ clientId: 'id', clientSecret: 'secret', fetchImpl });
  assert.equal((await api.propertyByPmsId(4242)).wifi_details, 'Net / pass');
  assert.equal((await api.propertyByPmsId(4242)).name, 'Flat'); // second call gets a 401 once, then succeeds with a fresh token
  assert.equal(tokens, 2);
  assert.equal(calls[0].body, '{"client_id":"id","client_secret":"secret"}');
  assert.ok(calls.every((c) => !c.url.includes('secret') && !/tok\d/.test(c.url)), 'credentials never go in the address');
  assert.equal(calls[1].url, 'https://api.chargeautomation.com/api/v1/property/4242');
});

test('the team-only record is stored and shown to the team, and the assistant is told only that details are on file', async () => {
  useChargeAutomationClient({ propertyByPmsId: async (id) => (id === 4242 ? { name: 'Test Flat CA', wifi_details: 'SeekerNet / hunter2-wifi', access_code: '9911#', property_text1: 'Luggage can be left in cupboard B, code 4455', property_text2: null, standard_check_in_time: '15:00', standard_check_out_time: '11:00' } : null) });
  assert.deepEqual(await syncTeamRecords(), { teamRecords: 1 });
  const team = await signIn(srv.base);
  const page = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.property;
  assert.equal(page.teamRecord.wifi, 'SeekerNet / hunter2-wifi');
  assert.equal(page.teamRecord.accessCode, '9911#');

  // Unverified visitor: existence only, nothing else.
  const stranger = await openChat(srv.base);
  const sid = (await stranger('GET', '/api/guest/me')).json.conversation.id;
  const seenByStranger = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', sid), { latest: 'what is the wifi password and door code?' });
  assert.deepEqual(seenByStranger.property.on_file_with_team, { wifi_details: 'on file', access_code: 'on file', internal_notes: 'on file' });
  // Verified guest: the notes are there to reason with; the password and the code still are not.
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const gid = (await guest('GET', '/api/guest/me')).json.conversation.id;
  const seen = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', gid), { latest: 'what is the wifi password and door code?' });
  assert.match(seen.property.on_file_with_team.internal_notes[0], /cupboard B/);
  for (const c of [seenByStranger, seen]) {
    const everything = systemPrompt(c) + userPrompt(c);
    assert.ok(!everything.includes('hunter2-wifi') && !everything.includes('9911#'), 'the WiFi password and access code never reach the model');
  }
  // And the guest API never carries the record.
  assert.ok(!JSON.stringify((await guest('GET', '/api/guest/me')).json).includes('cupboard B'));
});

test('extras from ChargeAutomation land on the booking and reach the assistant; the address needs the secret', async () => {
  const anon = client(srv.base);
  const event = (name, extra = {}) => [{ event: name, data: { pms_booking_id: '501', title: 'Late checkout until 1pm', charge_ref_no: 'ref1', client_approval_status: 'Pending', note: 'N/A', ...extra } }];
  assert.equal((await anon('POST', '/api/webhooks/chargeautomation/wrong', event('booking.upsell.requested'))).status, 404);
  assert.equal((await anon('POST', '/api/webhooks/chargeautomation/test-webhook-token', event('booking.upsell.requested'))).status, 200);
  assert.deepEqual(JSON.parse(q.get('SELECT extras FROM reservations WHERE id = 501').extras).map((x) => [x.title, x.status]), [['Late checkout until 1pm', 'requested, awaiting the team']]);
  // Purchased later: the entry is updated, not duplicated. Unknown bookings and other events are ignored.
  await anon('POST', '/api/webhooks/chargeautomation/test-webhook-token', event('booking.upsell.purchased', { client_approval_status: 'Approved' }));
  await anon('POST', '/api/webhooks/chargeautomation/test-webhook-token', event('booking.upsell.purchased', { pms_booking_id: '999999' }));
  await anon('POST', '/api/webhooks/chargeautomation/test-webhook-token', event('booking.created'));
  assert.deepEqual(JSON.parse(q.get('SELECT extras FROM reservations WHERE id = 501').extras).map((x) => [x.title, x.status]), [['Late checkout until 1pm', 'purchased']]);
  const guest = await openChat(srv.base, { verify: true, arrival: ctx.arrival });
  const gid = (await guest('GET', '/api/guest/me')).json.conversation.id;
  assert.deepEqual(buildContext(q.get('SELECT * FROM conversations WHERE id = ?', gid)).stay.extras, [{ item: 'Late checkout until 1pm', status: 'purchased', note: undefined }]);
  const team = await signIn(srv.base);
  assert.equal((await team('GET', `/api/admin/conversations/${gid}`)).json.conversation.stay.extras[0].status, 'purchased');
});

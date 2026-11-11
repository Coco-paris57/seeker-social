import { test } from 'node:test';
import assert from 'node:assert/strict';
import './helpers.js';
import { nearbyStations, describeStations } from '../src/places.js';
import { fillStations } from '../src/sync.js';
import { q } from '../src/db.js';

const reply = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });
const tfl = { stopPoints: [
  { commonName: 'Ladbroke Grove Underground Station', distance: 310.4, lines: [{ id: 'circle', name: 'Circle' }, { id: 'hammersmith-city', name: 'Hammersmith & City' }, { id: '23', name: '23' }], lineModeGroups: [{ modeName: 'bus', lineIdentifier: ['23'] }, { modeName: 'tube', lineIdentifier: ['circle', 'hammersmith-city'] }] },
  { commonName: 'Latimer Road Underground Station', distance: 890, lines: [{ id: 'circle', name: 'Circle' }], lineModeGroups: [{ modeName: 'tube', lineIdentifier: ['circle'] }] },
  { commonName: 'Ladbroke Grove Underground Station', distance: 325, lines: [], lineModeGroups: [] },
] };

test('stations are sorted, de-duplicated and list rail lines only', async () => {
  const s = await nearbyStations(51.517, -0.213, { fetchImpl: reply(tfl) });
  assert.deepEqual(s.map((x) => x.name), ['Ladbroke Grove', 'Latimer Road']);
  assert.deepEqual(s[0].lines, ['Circle', 'Hammersmith & City']);
  assert.equal(s[0].walkMinutes, 5);
  assert.equal(describeStations(s.slice(0, 1)), 'Ladbroke Grove (Circle, Hammersmith & City), about 5 min walk');
});

test('a failed or unexpected lookup gives no stations rather than wrong ones', async () => {
  assert.deepEqual(await nearbyStations(51.5, -0.2, { fetchImpl: reply({}, 500) }), []);
  assert.deepEqual(await nearbyStations(51.5, -0.2, { fetchImpl: reply({ unexpected: true }) }), []);
  assert.deepEqual(await nearbyStations(NaN, -0.2, { fetchImpl: reply(tfl) }), []);
});

test('properties without a station are filled in; a station typed by the team is kept', async () => {
  const { buildContext } = await import('../src/bot.js');
  const a = q.insert("INSERT INTO properties(name, qr_token, details) VALUES('A', 'tok-a', ?)", JSON.stringify({ latitude: 51.517, longitude: -0.213 }));
  const b = q.insert("INSERT INTO properties(name, qr_token, station, details) VALUES('B', 'tok-b', 'Typed by team', ?)", JSON.stringify({ latitude: 51.517, longitude: -0.213 }));
  assert.equal(await fillStations({ fetchImpl: reply(tfl) }), 2);
  assert.match(q.get('SELECT station FROM properties WHERE id = ?', a).station, /^Ladbroke Grove \(Circle, Hammersmith & City\), about 5 min walk; Latimer Road/);
  assert.equal(q.get('SELECT station FROM properties WHERE id = ?', b).station, 'Typed by team');
  assert.equal(await fillStations({ fetchImpl: reply(tfl) }), 0); // looked up once only
  const c = q.insert("INSERT INTO conversations(property_id, channel) VALUES(?, 'web')", a);
  const ctx = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', c));
  assert.equal(ctx.property.nearby_stations[0].name, 'Ladbroke Grove');
});

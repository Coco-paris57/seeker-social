// Copies apartments and reservations from Smoobu into the local database.
// Only the fields the concierge needs are kept: no email, phone, price or payment data.
import fs from 'node:fs';
import path from 'node:path';
import { q, parseJson } from './db.js';
import { ROOT } from './config.js';
import { smoobu } from './smoobu.js';
import { addDays, londonDate, newToken } from './util.js';
import { describeStations, nearbyStations } from './places.js';
import { chargeAutomation } from './chargeautomation.js';

const seed = parseJson(fs.readFileSync(path.join(ROOT, 'src/properties-seed.json'), 'utf8'), {}).properties || {};

export function upsertProperty(apartment, detail = {}) {
  const loc = detail.location || {};
  const details = JSON.stringify({
    rooms: detail.rooms || null,
    amenities: detail.amenities || [],
    latitude: loc.latitude ?? null,
    longitude: loc.longitude ?? null,
    city: loc.city || null,
  });
  const address = [loc.street, loc.zip, loc.city].filter(Boolean).join(', ') || null;
  const existing = q.get('SELECT id, details FROM properties WHERE smoobu_id = ?', apartment.id);
  if (existing) {
    const stations = parseJson(existing.details).stations;
    q.run(
      `UPDATE properties SET name = ?, details = ?, address = COALESCE(?, address),
       postcode = COALESCE(postcode, ?), updated_at = datetime('now') WHERE id = ?`,
      apartment.name, stations ? JSON.stringify({ ...JSON.parse(details), stations }) : details, address, loc.zip || null, existing.id,
    );
    return existing.id;
  }
  const s = seed[String(apartment.id)] || {};
  const notes = [s.type && `${s.type}, sleeps ${s.sleeps}`, s.notes, s.nearby && `Nearby: ${s.nearby}`].filter(Boolean).join('. ');
  return q.insert(
    `INSERT INTO properties(smoobu_id, ref, name, display_name, area, postcode, address, station, notes, details, qr_token)
     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    apartment.id, s.ref || null, apartment.name, s.area ? `${s.area} apartment` : apartment.name,
    s.area || loc.city || null, s.postcode || loc.zip || null, address, s.station || null, notes || null,
    details, newToken(9),
  );
}

/**
 * ChargeAutomation writes the guest's online check-in link and status into the Smoobu booking note
 * ("CA_PRE_ARRIVAL_LINK : https://app.chargeautomation.com/securelink/...", "CA Online check-in Completed").
 */
export function checkinFromNotice(notice) {
  const text = String(notice || '');
  const link = text.match(/https:\/\/app\.chargeautomation\.com\/[A-Za-z0-9\/_-]+/)?.[0] || null;
  return { link, done: /online check-?in completed/i.test(text) };
}

export function upsertReservation(b) {
  if (!b?.id || !b.apartment?.id || !b.arrival || !b.departure) return;
  if (b['is-blocked-booking']) return; // owner blocks are not guests
  const property = q.get('SELECT id FROM properties WHERE smoobu_id = ?', b.apartment.id);
  if (!property) return;
  const first = b.firstname || '';
  const last = b.lastname || '';
  const checkin = checkinFromNotice(b.notice);
  q.run(
    `INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure,
       check_in, check_out, adults, children, channel, language, cancelled, checkin_link, checkin_done, synced_at)
     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET property_id = excluded.property_id, first_name = excluded.first_name,
       last_name = excluded.last_name, guest_name = excluded.guest_name, arrival = excluded.arrival,
       departure = excluded.departure, check_in = excluded.check_in, check_out = excluded.check_out,
       adults = excluded.adults, children = excluded.children, channel = excluded.channel,
       language = excluded.language, cancelled = excluded.cancelled, checkin_link = excluded.checkin_link,
       checkin_done = excluded.checkin_done, synced_at = excluded.synced_at`,
    b.id, property.id, first, last, b['guest-name'] || `${first} ${last}`.trim(), b.arrival, b.departure,
    b['check-in'] || null, b['check-out'] || null, b.adults ?? null, b.children ?? null,
    b.channel?.name || null, b.language || null, b.type === 'cancellation' ? 1 : 0, checkin.link, checkin.done ? 1 : 0,
  );
}

/** Look up nearby stations for properties that have coordinates but no stations yet. */
export async function fillStations({ fetchImpl } = {}) {
  let filled = 0;
  for (const p of q.all('SELECT id, station, details FROM properties')) {
    const details = parseJson(p.details);
    if (details.stations?.length || details.latitude == null || details.longitude == null) continue;
    const stations = await nearbyStations(Number(details.latitude), Number(details.longitude), { fetchImpl });
    if (!stations.length) continue;
    q.run('UPDATE properties SET details = ?, station = COALESCE(NULLIF(station, \'\'), ?) WHERE id = ?', JSON.stringify({ ...details, stations }), describeStations(stations.slice(0, 2)), p.id);
    filled += 1;
  }
  return filled;
}

export async function syncProperties() {
  const api = smoobu();
  if (!api) return { properties: 0 };
  const { apartments = [] } = await api.apartments();
  for (const a of apartments) {
    let detail = {};
    try {
      detail = await api.apartment(a.id);
    } catch (e) {
      console.warn(`Smoobu apartment ${a.id}: ${e.message}`);
    }
    upsertProperty(a, detail);
  }
  await fillStations();
  return { properties: apartments.length };
}

export async function syncReservations() {
  const api = smoobu();
  if (!api) return { reservations: 0 };
  const today = londonDate();
  const bookings = await api.reservations(addDays(today, -35), addDays(today, 180));
  for (const b of bookings) upsertReservation(b);
  // Guest names are not needed once a stay is long over.
  q.run('DELETE FROM reservations WHERE departure < ?', addDays(today, -120));
  return { reservations: bookings.length };
}

/**
 * Copy each property's record from ChargeAutomation (WiFi, access code, its two free-text
 * fields, standard times). This is for the team's reference only: it is shown in the team app
 * and is never given to the assistant or to a guest.
 */
export async function syncTeamRecords() {
  const api = chargeAutomation();
  if (!api) return { teamRecords: 0 };
  let found = 0;
  for (const p of q.all('SELECT id, smoobu_id FROM properties WHERE smoobu_id IS NOT NULL')) {
    try {
      const ca = await api.propertyByPmsId(p.smoobu_id);
      if (!ca) continue;
      const text = (v) => (v == null ? '' : String(v).trim().slice(0, 4000));
      const record = {
        source: 'ChargeAutomation', name: text(ca.name) || text(ca.internal_name), wifi: text(ca.wifi_details), accessCode: text(ca.access_code),
        text1: text(ca.property_text1), text2: text(ca.property_text2), checkIn: text(ca.standard_check_in_time), checkOut: text(ca.standard_check_out_time),
        syncedAt: new Date().toISOString(),
      };
      q.run('UPDATE properties SET team_record = ? WHERE id = ?', JSON.stringify(record), p.id);
      found += 1;
    } catch (e) {
      console.warn(`ChargeAutomation property ${p.smoobu_id}: ${e.message}`);
      if (/sign-in failed/.test(e.message)) throw e; // wrong credentials: no point trying the rest
    }
  }
  return { teamRecords: found };
}

export async function syncAll() {
  const p = await syncProperties();
  const r = await syncReservations();
  const t = await syncTeamRecords().catch((e) => { console.error(`ChargeAutomation sync failed: ${e.message}`); return { teamRecords: 0, teamRecordsError: e.message.slice(0, 160) }; });
  return { ...p, ...r, ...t };
}

/** Refresh a single booking, e.g. after a Smoobu webhook. */
export async function syncReservation(id) {
  const api = smoobu();
  if (!api) return;
  upsertReservation(await api.reservation(id));
}

// Each test file gets its own in-memory database and a server on a random port.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.DB_FILE = ':memory:';
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'concierge-test-'));
process.env.LLM_MODE = 'mock';
process.env.SMOOBU_MODE = 'off';
process.env.SMOOBU_WEBHOOK_TOKEN = 'test-webhook-token';

const { q } = await import('../src/db.js');
const { createApp } = await import('../src/server.js');
const { createUser } = await import('../src/auth.js');
const { addDays, londonDate } = await import('../src/util.js');
export { q, addDays, londonDate };

export async function startServer() {
  const server = createApp().listen(0);
  await new Promise((r) => server.once('listening', r));
  const base = `http://127.0.0.1:${server.address().port}`;
  return { base, close: () => new Promise((r) => server.close(r)) };
}

/** A tiny HTTP client that keeps cookies, like a browser tab. */
export function client(base) {
  const jar = new Map();
  const cookies = () => [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
  const call = async function call(method, url, body) {
    const res = await fetch(base + url, {
      method,
      headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(jar.size ? { Cookie: [...jar].map(([k, v]) => `${k}=${v}`).join('; ') } : {}) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    for (const c of res.headers.getSetCookie()) {
      const [pair] = c.split(';');
      const i = pair.indexOf('=');
      if (/Max-Age=0/.test(c)) jar.delete(pair.slice(0, i));
      else jar.set(pair.slice(0, i), pair.slice(i + 1));
    }
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }
    return { status: res.status, json, text, headers: res.headers };
  };
  call.cookies = cookies;
  return call;
}

export function seed({ mode = null, arrivalOffset = 0 } = {}) {
  const today = londonDate();
  const propertyId = q.insert("INSERT INTO properties(ref, name, display_name, area, station, qr_token, mode) VALUES('T1', 'Test Flat', 'Test Flat', 'Camden', 'Camden Town', 'qr-test-token', ?)", mode);
  q.run("INSERT INTO knowledge(property_id, category, question, answer, sensitive) VALUES(?, 'appliances', 'How to use the washing machine', 'Turn the dial to Cotton 40 and press Start.', 0)", propertyId);
  q.run("INSERT INTO knowledge(property_id, category, question, answer, sensitive) VALUES(?, 'access', 'Door code', 'The door code is 4821.', 1)", propertyId);
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, check_in, check_out) VALUES(501, ?, 'Zoë', 'O''Brien-Müller', 'Zoë O''Brien-Müller', ?, ?, '15:00', '11:00')", propertyId, addDays(today, arrivalOffset), addDays(today, arrivalOffset + 3));
  const userId = createUser({ email: 'team@example.com', name: 'Tess Team', password: 'correct horse battery', role: 'admin' });
  return { propertyId, userId, today, arrival: addDays(today, arrivalOffset) };
}

export async function signIn(base) {
  const team = client(base);
  const r = await team('POST', '/api/admin/login', { email: 'team@example.com', password: 'correct horse battery' });
  if (r.status !== 200) throw new Error(`sign-in failed: ${r.text}`);
  return team;
}

export async function openChat(base, { verify = false, arrival } = {}) {
  const guest = client(base);
  const r = await guest('POST', '/api/guest/session', { qrToken: 'qr-test-token', consent: true });
  if (r.status !== 201) throw new Error(`session failed: ${r.text}`);
  if (verify) {
    const v = await guest('POST', '/api/guest/verify', { lastName: 'obrien muller', arrivalDate: arrival });
    if (v.status !== 200) throw new Error(`verify failed: ${v.text}`);
  }
  return guest;
}

/** Send a guest message and wait until the assistant has finished with it. */
export async function say(guest, text) {
  const r = await guest('POST', '/api/guest/messages', { text });
  if (r.status !== 202) throw new Error(`message failed: ${r.text}`);
  const { handleGuestMessage } = await import('../src/bot.js');
  const me = await guest('GET', '/api/guest/me');
  await handleGuestMessage(me.json.conversation.id); // joins the queue behind the run already in progress
  return (await guest('GET', '/api/guest/me')).json;
}

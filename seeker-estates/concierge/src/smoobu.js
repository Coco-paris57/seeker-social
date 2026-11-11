// Smoobu API client. HMAC-SHA256 signed requests (docs.smoobu.com, "HMAC Authentication").
// Same signing scheme as revenue/rm/smoobu.py, plus the two calls that write: sending a
// message to a guest and registering our webhook.
import crypto from 'node:crypto';
import { config } from './config.js';

const HOST = 'https://login.smoobu.com';
const enc = (s) => encodeURIComponent(String(s)).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

/** RFC 3986-encoded keys and values, sorted, joined with &. Arrays repeat the key. */
export function canonicalQuery(params = {}) {
  const pairs = [];
  for (const [k, v] of Object.entries(params)) {
    for (const item of Array.isArray(v) ? v : [v]) pairs.push([enc(k), enc(item)]);
  }
  pairs.sort((a, b) => (a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : a[0] < b[0] ? -1 : 1));
  return pairs.map(([k, v]) => `${k}=${v}`).join('&');
}

export function sign(secret, method, path, query, timestamp, nonce, bodyHash, apiKey) {
  const canonical = [method, path, query, timestamp, nonce, bodyHash, apiKey].join('\n');
  return crypto.createHmac('sha256', secret).update(canonical).digest('base64');
}

export class Smoobu {
  constructor({ key = config.smoobuKey, secret = config.smoobuSecret, fetchImpl = fetch } = {}) {
    if (!key || !secret) throw new Error('Smoobu API key and secret must both be set');
    this.key = key;
    this.secret = secret;
    this.fetch = fetchImpl;
  }

  async request(method, path, { params, body } = {}) {
    const query = canonicalQuery(params);
    const payload = body === undefined ? '' : JSON.stringify(body);
    const bodyHash = crypto.createHash('sha256').update(payload).digest('hex');
    for (let attempt = 0; ; attempt++) {
      const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
      const nonce = crypto.randomUUID();
      const headers = {
        'X-API-Key': this.key,
        'X-Timestamp': timestamp,
        'X-Nonce': nonce,
        'X-Signature': sign(this.secret, method, path, query, timestamp, nonce, bodyHash, this.key),
      };
      if (payload) headers['Content-Type'] = 'application/json';
      const res = await this.fetch(HOST + path + (query ? `?${query}` : ''), {
        method,
        headers,
        body: payload || undefined,
        signal: AbortSignal.timeout(30_000),
      });
      if ((res.status === 429 || res.status >= 500) && attempt < 3) {
        await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt));
        continue;
      }
      const text = await res.text();
      if (!res.ok) throw new Error(`Smoobu ${method} ${path} failed: ${res.status} ${text.slice(0, 200)}`);
      return text ? JSON.parse(text) : {};
    }
  }

  apartments() {
    return this.request('GET', '/api/apartments');
  }
  apartment(id) {
    return this.request('GET', `/api/apartments/${id}`);
  }
  reservation(id) {
    return this.request('GET', `/api/reservations/${id}`);
  }
  async reservations(from, to) {
    const out = [];
    for (let page = 1; ; page++) {
      const r = await this.request('GET', '/api/reservations', {
        params: { from, to, showCancellation: 'true', pageSize: 100, page },
      });
      out.push(...(r.bookings || []));
      if (page >= (r.page_count || 1)) return out;
    }
  }
  async messages(reservationId) {
    // Oldest first, 25 per page: read every page (bounded) so the newest message is included.
    const out = [];
    for (let page = 1; page <= 40; page++) {
      const r = await this.request('GET', `/api/reservations/${reservationId}/messages`, { params: { page } });
      out.push(...(r.messages || []));
      if (page >= (r.page_count || 1)) break;
    }
    return out;
  }
  sendMessageToGuest(reservationId, messageBody, subject) {
    const body = subject ? { subject, messageBody } : { messageBody };
    return this.request('POST', `/api/reservations/${reservationId}/messages/send-message-to-guest`, { body });
  }
  webhooks() {
    return this.request('GET', '/api/users/webhooks');
  }
  createWebhook(webhookUrl) {
    return this.request('POST', '/api/users/webhooks', { body: { webhookUrl } });
  }
}

let client;
/** Shared client, or null when Smoobu is switched off or not configured. */
export function smoobu() {
  if (client) return client;
  if (config.smoobuMode !== 'live') return null;
  client = new Smoobu();
  return client;
}

/** Tests supply a stand-in client. */
export function useSmoobuClient(next) {
  client = next;
}

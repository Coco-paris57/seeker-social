// ChargeAutomation (online check-in) API client. Read-only use: property records for the team.
// Docs: https://api.chargeautomation.com/docs/ . OAuth client credentials from
// ChargeAutomation > Settings > API > New OAuth Credential, stored as
// CHARGEAUTOMATION_CLIENT_ID and CHARGEAUTOMATION_CLIENT_SECRET.
import { config } from './config.js';

const HOST = 'https://api.chargeautomation.com';

export class ChargeAutomation {
  constructor({ clientId = config.caClientId, clientSecret = config.caClientSecret, fetchImpl = fetch } = {}) {
    if (!clientId || !clientSecret) throw new Error('ChargeAutomation client id and secret must both be set');
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.fetch = fetchImpl;
    this.token = null;
    this.expires = 0;
  }

  async accessToken(force = false) {
    if (!force && this.token && Date.now() < this.expires) return this.token;
    const res = await this.fetch(`${HOST}/api/v1/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: this.clientId, client_secret: this.clientSecret }),
      signal: AbortSignal.timeout(30_000),
    });
    const body = await res.json().catch(() => ({}));
    const token = body?.data?.access_token;
    if (!res.ok || !token) throw new Error(`ChargeAutomation sign-in failed (${res.status}): ${String(body?.message || '').slice(0, 120)}`);
    this.token = token;
    // Renew well before the stated lifetime (about 24 hours).
    this.expires = Date.now() + Math.max(60, (Number(body.data.expires_in) || 3600) - 600) * 1000;
    return token;
  }

  async get(path) {
    for (let attempt = 0; ; attempt++) {
      const res = await this.fetch(HOST + path, {
        headers: { Authorization: `Bearer ${await this.accessToken(attempt > 0)}`, Accept: 'application/json' },
        signal: AbortSignal.timeout(30_000),
      });
      if (res.status === 401 && attempt === 0) continue; // token expired early: sign in again once
      const body = await res.json().catch(() => ({}));
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`ChargeAutomation GET ${path} failed (${res.status}): ${String(body?.message || '').slice(0, 120)}`);
      return body;
    }
  }

  /** One property, looked up by the booking system's own id for it (the Smoobu apartment id). */
  async propertyByPmsId(pmsId) {
    const body = await this.get(`/api/v1/property/${encodeURIComponent(pmsId)}`);
    const data = body?.data;
    const p = Array.isArray(data) ? data[0] : data;
    return p && typeof p === 'object' ? p : null;
  }
}

let client;
/** Shared client, or null when ChargeAutomation is not configured. */
export function chargeAutomation() {
  if (client) return client;
  if (!config.caClientId || !config.caClientSecret) return null;
  client = new ChargeAutomation();
  return client;
}
export function useChargeAutomationClient(next) {
  client = next;
}

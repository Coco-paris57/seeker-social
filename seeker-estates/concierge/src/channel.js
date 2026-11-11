// Guest messages that reach Smoobu from Airbnb, Booking.com and email.
// Switched on by the team in Settings; the Smoobu webhook is registered when they do.
import { config } from './config.js';
import { getRaw, getSettings, setRaw } from './db.js';
import { smoobu } from './smoobu.js';
import { HttpError, newToken } from './util.js';

/** True when channel messages should be handled (Settings switch, or SMOOBU_INBOX=on). */
export const channelInboxOn = () => config.smoobuInbox || !!getSettings().channelInbox;

/** Secret part of the webhook address: from the environment, or created once and stored. */
export function webhookToken() {
  if (config.smoobuWebhookToken) return config.smoobuWebhookToken;
  let token = getRaw('smoobu_webhook_token');
  if (!token) {
    token = newToken(24);
    setRaw('smoobu_webhook_token', token);
  }
  return token;
}

/** Make sure Smoobu sends events to this service. Other webhooks are left alone. */
export async function ensureWebhook() {
  const api = smoobu();
  if (!api) throw new HttpError(400, 'Smoobu is not connected, so channel messages cannot be received.');
  if (!config.baseUrl.startsWith('https://')) throw new HttpError(400, 'This service needs a public https address before Smoobu can send it messages.');
  const url = `${config.baseUrl}/api/webhooks/smoobu/${webhookToken()}`;
  try {
    const { webhooks = [] } = await api.webhooks();
    if (!webhooks.some((w) => w.webhookUrl === url)) await api.createWebhook(url);
  } catch (e) {
    console.error(`Smoobu webhook registration failed: ${e.message}`);
    throw new HttpError(502, 'Smoobu did not accept the connection. Nothing was changed. Please try again in a minute.');
  }
}

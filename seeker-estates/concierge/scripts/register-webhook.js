// Register this service with Smoobu so bookings (and, with SMOOBU_INBOX=on, guest messages)
// arrive as they happen: npm run register-webhook
// Needs BASE_URL (public https address) and SMOOBU_WEBHOOK_TOKEN. Other webhooks are left alone.
import { config } from '../src/config.js';
import { smoobu } from '../src/smoobu.js';

const api = smoobu();
if (!api) throw new Error('Smoobu is not configured. Set SMOOBU_API_KEY and SMOOBU_API_SECRET.');
if (!config.smoobuWebhookToken || config.smoobuWebhookToken.length < 24) throw new Error('Set SMOOBU_WEBHOOK_TOKEN to a long random value first.');
if (!config.baseUrl.startsWith('https://')) throw new Error('BASE_URL must be the public https address of this service.');

const prefix = `${config.baseUrl}/api/webhooks/smoobu/`;
const { webhooks = [] } = await api.webhooks();
if (webhooks.some((w) => w.webhookUrl === prefix + config.smoobuWebhookToken)) {
  console.log('Already registered.');
} else {
  const stale = webhooks.filter((w) => w.webhookUrl.startsWith(prefix));
  if (stale.length) console.log(`Note: ${stale.length} older webhook(s) for this service use a previous token. Remove them in Smoobu > Settings > Advanced > API.`);
  const created = await api.createWebhook(prefix + config.smoobuWebhookToken);
  console.log(`Registered webhook ${created.id}.`);
}

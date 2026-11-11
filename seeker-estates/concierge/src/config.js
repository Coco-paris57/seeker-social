// Configuration from environment variables. See .env.example for the full list.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, '..');

const env = process.env;
const bool = (v, d = false) => (v === undefined || v === '' ? d : /^(1|true|on|yes)$/i.test(v));
const int = (v, d) => (Number.isFinite(parseInt(v, 10)) ? parseInt(v, 10) : d);

export const config = {
  port: int(env.PORT, 8787),
  // Public address of this service, used in QR codes and links. No trailing slash.
  baseUrl: (env.BASE_URL || `http://localhost:${int(env.PORT, 8787)}`).replace(/\/+$/, ''),
  dataDir: path.resolve(ROOT, env.DATA_DIR || 'data'),
  production: env.NODE_ENV === 'production',

  // Claude. LLM_MODE: 'claude' | 'mock'. Defaults to claude when a key is present.
  llmMode: env.LLM_MODE || (env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN ? 'claude' : 'mock'),
  model: env.CONCIERGE_MODEL || 'claude-opus-5-5',
  effort: env.CONCIERGE_EFFORT || 'medium',

  // Smoobu. SMOOBU_MODE: 'live' | 'off'. Defaults to live when both keys are present.
  smoobuKey: env.SMOOBU_API_KEY || '',
  smoobuSecret: env.SMOOBU_API_SECRET || '',
  smoobuMode: env.SMOOBU_MODE || (env.SMOOBU_API_KEY && env.SMOOBU_API_SECRET ? 'live' : 'off'),
  smoobuWebhookToken: env.SMOOBU_WEBHOOK_TOKEN || '',
  // Answer messages that arrive through Smoobu (Airbnb, Booking.com, email) as well as the web chat.
  smoobuInbox: bool(env.SMOOBU_INBOX, false),
  syncMinutes: int(env.SMOOBU_SYNC_MINUTES, 15),

  // Web push (VAPID). Generated and stored in the database on first run when not set.
  vapidPublic: env.VAPID_PUBLIC_KEY || '',
  vapidPrivate: env.VAPID_PRIVATE_KEY || '',
  vapidSubject: env.VAPID_SUBJECT || 'mailto:hello@seekerestates.com',
  // Optional: also post alerts to a Slack-compatible incoming webhook.
  notifyWebhookUrl: env.NOTIFY_WEBHOOK_URL || '',

  company: {
    name: env.COMPANY_NAME || 'Seeker Estates LTD',
    privacyEmail: env.PRIVACY_EMAIL || '',
    address: env.COMPANY_ADDRESS || '',
  },
  timezone: 'Europe/London',
};

// Settings the team can change in the admin interface, with their defaults.
export const SETTING_DEFAULTS = {
  defaultMode: 'learning', // mode for properties that have not been set individually
  botName: 'Seeker Assistant',
  accessInfoHours: 48, // access details (door codes, WiFi) are released this many hours before check-in
  retentionDays: 90, // conversations are erased this many days after the last message
  emergencyContact: '', // out-of-hours phone number the bot may give for urgent issues
  officeHours: 'Every day, 09:00 to 21:00 UK time',
  holdingMinutes: 10, // do not repeat the "checking with the team" note within this window
};

// Live updates (server-sent events) and alerts to the team (web push, optional chat webhook).
import { EventEmitter } from 'node:events';
import * as webpush from 'web-push';
import { config } from './config.js';
import { q, getRaw, setRaw, parseJson } from './db.js';

export const bus = new EventEmitter();
bus.setMaxListeners(0);

/** Tell open guest chats and admin screens that something changed. */
export function emitConversation(conversationId, type, data = {}) {
  bus.emit(`conversation:${conversationId}`, { type, ...data });
  bus.emit('admin', { type, conversationId, ...data });
}
export function emitAdmin(type, data = {}) {
  bus.emit('admin', { type, ...data });
}

let vapidReady = false;
export function vapidPublicKey() {
  if (!vapidReady) {
    let pub = config.vapidPublic || getRaw('vapid_public');
    let priv = config.vapidPrivate || getRaw('vapid_private');
    if (!pub || !priv) {
      const keys = webpush.generateVAPIDKeys();
      pub = keys.publicKey;
      priv = keys.privateKey;
      setRaw('vapid_public', pub);
      setRaw('vapid_private', priv);
    }
    webpush.setVapidDetails(config.vapidSubject, pub, priv);
    vapidReady = true;
    vapidPublicKey.value = pub;
  }
  return vapidPublicKey.value;
}

export const sent = []; // last alerts, kept for tests and the admin "test notification" check

/**
 * Alert every team member who has switched notifications on.
 * payload: { title, body, url, tag, urgent }
 */
export async function notifyTeam(payload) {
  sent.push(payload);
  if (sent.length > 50) sent.shift();
  emitAdmin('alert', { alert: payload });
  const jobs = [];
  const subs = q.all('SELECT endpoint, subscription FROM push_subscriptions');
  if (subs.length) {
    vapidPublicKey();
    const body = JSON.stringify(payload);
    for (const s of subs) {
      jobs.push(
        webpush
          .sendNotification(parseJson(s.subscription), body, { TTL: 3600, urgency: payload.urgent ? 'high' : 'normal' })
          .catch((e) => {
            // 404/410: the browser has dropped this subscription.
            if (e.statusCode === 404 || e.statusCode === 410) q.run('DELETE FROM push_subscriptions WHERE endpoint = ?', s.endpoint);
            else console.warn(`Push failed (${e.statusCode || e.message})`);
          }),
      );
    }
  }
  if (config.notifyWebhookUrl) {
    jobs.push(
      fetch(config.notifyWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Title and link only: guest names and message text stay on this service.
        body: JSON.stringify({ text: `${payload.urgent ? 'URGENT: ' : ''}${payload.title}\n${config.baseUrl}${payload.url || '/admin/'}` }),
        signal: AbortSignal.timeout(10_000),
      }).catch((e) => console.warn(`Notify webhook failed: ${e.message}`)),
    );
  }
  await Promise.all(jobs);
}

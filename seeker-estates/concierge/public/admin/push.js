// Notifications for this device: service worker registration and web push subscription.
import { api } from './lib.js';

const SW_URL = '/admin/sw.js';
const SCOPE = '/admin/';

const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isInstalled = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/** Register the service worker (offline launch and push). Safe to call on every start. */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return Promise.resolve(null);
  return navigator.serviceWorker.register(SW_URL, { scope: SCOPE }).catch((err) => {
    console.warn(`Service worker registration failed: ${err.message}`);
    return null;
  });
}

const registration = () => navigator.serviceWorker.getRegistration(SCOPE);

/** VAPID keys are base64url; pushManager wants bytes. */
function keyBytes(base64url) {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(base64url.length / 4) * 4, '=');
  return Uint8Array.from(atob(base64), (ch) => ch.charCodeAt(0));
}

/**
 * Where notifications stand on this device:
 * 'ios-install' (iPhone/iPad in the browser: add to Home Screen first), 'unsupported',
 * 'blocked' (permission refused in the browser), 'off' or 'on'.
 */
export async function pushState() {
  const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  if (!supported) return isIos() && !isInstalled() ? 'ios-install' : 'unsupported';
  if (Notification.permission === 'denied') return 'blocked';
  const reg = await registration();
  const sub = reg && (await reg.pushManager.getSubscription());
  return sub && Notification.permission === 'granted' ? 'on' : 'off';
}

/** Ask permission, subscribe this device and tell the server. Throws with a message to show. */
export async function enablePush() {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Notifications were not allowed. You can allow them in your browser settings for this site.');
  const reg = (await registration()) || (await registerServiceWorker());
  if (!reg) throw new Error('This browser could not set up notifications.');
  await navigator.serviceWorker.ready;
  const { publicKey } = await api('/push/key');
  const options = { userVisibleOnly: true, applicationServerKey: keyBytes(publicKey) };
  let sub;
  try {
    sub = await reg.pushManager.subscribe(options);
  } catch {
    // An old subscription made with a different server key blocks a new one: drop it and retry once.
    const old = await reg.pushManager.getSubscription();
    if (old) await old.unsubscribe();
    try {
      sub = await reg.pushManager.subscribe(options);
    } catch {
      throw new Error('This browser could not subscribe to notifications. Check that you are online and try again.');
    }
  }
  await api('/push/subscribe', { method: 'POST', body: { subscription: sub.toJSON() } });
}

/** Stop notifications on this device. */
export async function disablePush() {
  const reg = await registration();
  const sub = reg && (await reg.pushManager.getSubscription());
  if (!sub) return;
  await api('/push/unsubscribe', { method: 'POST', body: { endpoint: sub.endpoint } }).catch(() => {});
  await sub.unsubscribe();
}

/**
 * After sign-in: if this device is already subscribed, attach the subscription to the
 * person who is signed in now (devices get shared, and the server may have lost it).
 */
export async function syncSubscription() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  const reg = await registration();
  const sub = reg && (await reg.pushManager.getSubscription());
  if (sub) await api('/push/subscribe', { method: 'POST', body: { subscription: sub.toJSON() } }).catch(() => {});
}

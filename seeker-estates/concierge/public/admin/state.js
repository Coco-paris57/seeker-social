// What the whole app shares: who is signed in, and the inbox (used by the inbox screen,
// the navigation badge and the conversation thread).
import { api } from './lib.js';

/** Filled from GET /me after sign-in. */
export const session = { user: null, llmMode: null, smoobuMode: null, smoobuInbox: false, chargeAutomation: false, chargeAutomationWebhook: '', baseUrl: '', categories: [] };
export const isAdmin = () => session.user?.role === 'admin';

const listeners = new Set();
let loadingPromise = null;
let queued = false;

export const inbox = {
  data: null, // last GET /inbox response
  error: null, // ApiError from the last refresh, if it failed
  modes: new Map(), // propertyId -> 'learning' | 'auto', decides whether a reply preview is required

  /** Call `fn` now and after every refresh. Returns the unsubscribe function. */
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },

  /** Refetch. Calls made while one is in flight are folded into a single follow-up. */
  refresh() {
    if (loadingPromise) {
      queued = true;
      return loadingPromise;
    }
    loadingPromise = Promise.all([api('/inbox'), api('/properties')])
      .then(([data, props]) => {
        inbox.data = data;
        inbox.error = null;
        inbox.modes = new Map(props.properties.map((p) => [p.id, p.effectiveMode]));
      })
      .catch((err) => { inbox.error = err; })
      .finally(() => {
        loadingPromise = null;
        for (const fn of listeners) fn();
        if (queued) {
          queued = false;
          inbox.refresh();
        }
      });
    return loadingPromise;
  },

  reset() {
    inbox.data = null;
    inbox.error = null;
    inbox.modes = new Map();
  },
};

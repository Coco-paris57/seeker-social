// Guest care: things worth doing for a guest (a gift, a favour, a note), proposed by the
// assistant from the conversation. Shown on the guest card, in the chat and on the To do list.
import { api, autoGrow, busy, button, chip, h, isEnglish, showError, toast } from './lib.js';

const KINDS = { gift: { tone: 'brand', icon: 'plus' }, gesture: { tone: 'ok', icon: 'smile' }, message: { tone: 'brand', icon: 'chat' }, fix: { tone: 'danger', icon: 'alert' } };

/** One suggestion: do it and mark it done, send its message, or dismiss it. `after()` runs when it has left the list. */
export function careCard(a, { after = () => {}, showGuest = false } = {}) {
  const k = KINDS[a.kind] || KINDS.gesture;
  const text = a.kind === 'message' ? autoGrow(h('textarea', { rows: 3, value: a.text, 'aria-label': 'Message to the guest' })) : null;
  const foreign = a.language && !isEnglish(a.language) ? a.language : null;
  const act = (btn, call, message) => busy(btn, () => call().then(() => { toast(message, { kind: 'ok' }); after(); }, (err) => { showError(err); if (err.status === 409) after(); }));
  const send = text && button(foreign ? `Send in ${foreign}` : 'Send to guest', { variant: 'primary', icon: 'send', small: true });
  const done = button(text ? 'Done another way' : 'Done', { variant: text ? 'secondary' : 'primary', icon: 'check', small: true });
  const dismiss = button('Dismiss', { icon: 'x', small: true, variant: 'ghost' });
  send?.addEventListener('click', () => act(send, () => api(`/care/${a.id}/send`, { method: 'POST', body: { text: text.value } }), 'Sent to the guest.'));
  done.addEventListener('click', () => act(done, () => api(`/care/${a.id}/done`, { method: 'POST', body: {} }), 'Marked as done.'));
  dismiss.addEventListener('click', () => act(dismiss, () => api(`/care/${a.id}`, { method: 'DELETE', body: {} }), 'Dismissed. It will not be suggested again for this guest.'));
  return h('article', { class: 'card todo-card care-card' },
    h('header', { class: 'card-head' },
      h('div', { class: 'card-title' }, chip(a.label, k), h('strong', null, a.title)),
      showGuest && h('div', { class: 'card-meta' }, a.conversationId ? h('a', { href: `#/conversations/${a.conversationId}` }, 'Open chat') : null)),
    showGuest && h('p', { class: 'muted' }, [a.guestName, a.propertyName].filter(Boolean).join(' · ')),
    a.why && h('p', { class: 'hint' }, a.why),
    text,
    text && foreign && h('p', { class: 'hint' }, `Written in English; it is translated into ${foreign} when you send it.`),
    h('div', { class: 'actions' }, send, done, dismiss));
}

/** The list for one guest, with its heading. Nothing at all when there is nothing to suggest. */
export function careSection(list, opts) {
  if (!list?.length) return null;
  return h('div', { class: 'care' }, h('h3', null, 'Suggested for this guest'), list.map((a) => careCard(a, opts)));
}

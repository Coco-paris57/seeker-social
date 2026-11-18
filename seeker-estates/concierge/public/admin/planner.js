// To-do list: everything waiting for a person, in one place. Messages worth sending (an upsell
// offer, a check-in with an unhappy guest, thanks to a happy one) come with a proposed time.
// An item leaves the list by itself once it is dealt with.
import { api, autoGrow, busy, button, chip, fill, fullTime, h, icon, loadError, loading, pageHeader, showError, stayDate, timeEl, toast, TICKET_TYPES } from './lib.js';
import { inbox } from './state.js';

const localInput = (iso) => { let d = new Date(iso); if (Number.isNaN(d.getTime())) d = new Date(Date.now() + 3600_000); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };

/** A proposed message with its time: edit, schedule or dismiss. `save(text, at)` and `drop()` do the work. */
export function messageCard({ tone, iconName, title, who, when, why, note, text, at, chatId, save, drop }) {
  const body = autoGrow(h('textarea', { rows: 3, value: text, 'aria-label': 'Message' }));
  const time = h('input', { type: 'datetime-local', value: localInput(at), 'aria-label': 'Send at' });
  const schedule = button('Schedule', { variant: 'primary', icon: 'clock', small: true });
  const dismiss = button('Dismiss', { icon: 'x', small: true });
  schedule.addEventListener('click', () => busy(schedule, () => save(body.value, time.value ? new Date(time.value).toISOString() : '')));
  dismiss.addEventListener('click', () => busy(dismiss, drop));
  return h('article', { class: 'card todo-card' },
    h('header', { class: 'card-head' },
      h('div', { class: 'card-title' }, chip(title, { tone, icon: iconName }), h('strong', null, who)),
      h('div', { class: 'card-meta' }, chatId ? h('a', { href: `#/conversations/${chatId}` }, 'Open chat') : null)),
    when && h('p', { class: 'muted' }, when),
    note && h('p', { class: 'note check-note' }, icon('alert', 16), note),
    h('details', null,
      h('summary', null, `Suggested for ${fullTime(at)} · review the message`),
      why && h('p', { class: 'hint' }, `Why then: ${why}`),
      body,
      h('div', { class: 'follow-when' }, h('span', null, 'Send at'), time)),
    h('div', { class: 'actions' }, schedule, dismiss));
}

/** The host's review of a guest: read it, copy it, post it on the booking site, then mark it done. */
export function reviewCard(t, { done, fail }) {
  if (!t.text) {
    return h('article', { class: 'card todo-card' }, h('header', { class: 'card-head' }, h('div', { class: 'card-title' }, chip('Review the guest', { tone: 'brand', icon: 'edit' }), h('strong', null, t.guestName))),
      h('p', { class: 'muted' }, 'The assistant is writing the review from the conversation. It appears here in a moment.'));
  }
  const body = autoGrow(h('textarea', { rows: 3, value: t.text, 'aria-label': `Review of ${t.guestName}` }));
  const copy = button('Copy review', { variant: 'primary', icon: 'copy', small: true });
  const posted = button('Posted', { icon: 'check', small: true });
  const dismiss = button('Dismiss', { icon: 'x', small: true, variant: 'ghost' });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(body.value);
      toast(`Copied. Paste it into the review for ${t.guestName} on ${t.channel || 'the booking site'}.`, { kind: 'ok' });
    } catch {
      body.select(); // copying is blocked in this browser: the text is selected to copy by hand
      toast('Select the text and copy it.', { kind: 'info' });
    }
  });
  posted.addEventListener('click', () => busy(posted, () => api(`/tasks/${t.id}/done`, { method: 'POST', body: { text: body.value } }).then(() => done('Marked as posted'), fail)));
  dismiss.addEventListener('click', () => busy(dismiss, () => api(`/tasks/${t.id}`, { method: 'DELETE', body: {} }).then(() => done('Dismissed'), fail)));
  return h('article', { class: 'card todo-card' },
    h('header', { class: 'card-head' },
      h('div', { class: 'card-title' }, chip('Review the guest', { tone: 'brand', icon: 'edit' }), h('strong', null, t.guestName)),
      h('div', { class: 'card-meta' }, t.conversationId ? h('a', { href: `#/conversations/${t.conversationId}` }, 'Open chat') : null)),
    h('p', { class: 'muted' }, `${t.propertyName || 'No property'} · left ${stayDate(t.departure)}${t.channel ? ` · ${t.channel}` : ''}`),
    t.why && h('p', { class: 'hint' }, t.why),
    body,
    h('div', { class: 'actions' }, copy, posted, dismiss));
}

const linkRow = (iconName, text, href, extra) => h('li', null, h('a', { class: 'todo-link', href }, icon(iconName, 18), h('span', null, text), extra, icon('chevron', 16)));

export function todoView() {
  const body = h('div', null, loading('Loading the to-do list'));
  const el = h('div', { class: 'page page-narrow' },
    pageHeader('To do', { sub: 'What is waiting for someone on the team. Items disappear by themselves once they are dealt with.' }),
    body);
  let editing = false;

  async function load() {
    if (editing && body.contains(document.activeElement) && /TEXTAREA|INPUT/.test(document.activeElement.tagName)) return; // do not disturb someone typing
    let d;
    try {
      d = await api('/todo');
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    editing = true;
    inbox.setTodo(d.badge ?? d.tasks.length + d.followUps.length); // the number on the tab is this list
    const done = (message) => { toast(message, { kind: 'ok' }); editing = false; inbox.refresh(); load(); };
    const fail = (err) => { showError(err); editing = false; load(); };
    const stay = (t) => `${t.propertyName || 'No property'} · ${stayDate(t.arrival)} to ${stayDate(t.departure)}${t.channel ? ` · ${t.channel}` : ''}`;
    const upsells = d.tasks.filter((t) => t.kind === 'upsell');
    const happy = d.tasks.filter((t) => t.kind === 'happy');
    const reviews = d.tasks.filter((t) => t.kind === 'review');
    // One item that cannot be drawn must not hide the others.
    const safely = (draw) => (item) => { try { return draw(item); } catch (err) { console.error(err); return h('article', { class: 'card todo-card' }, h('p', { class: 'muted' }, `${item.guestName || 'An item'} could not be shown. Open the chat to deal with it.`)); } };
    const taskCard = (t, tone, iconName) => messageCard({
      tone, iconName, title: t.label, who: t.guestName, when: stay(t), why: t.why, note: t.note, text: t.text, at: t.at, chatId: t.conversationId,
      save: (text, at) => api(`/tasks/${t.id}/schedule`, { method: 'POST', body: { text, at } }).then(() => done(`Scheduled for ${fullTime(at)}`), fail),
      drop: () => api(`/tasks/${t.id}`, { method: 'DELETE', body: {} }).then(() => done('Dismissed'), fail),
    });
    const waiting = [
      d.approvals > 0 && linkRow('inbox', `${d.approvals} ${d.approvals === 1 ? 'reply' : 'replies'} to approve`, '#/inbox'),
      ...d.tickets.map((t) => linkRow(TICKET_TYPES[t.type]?.icon || 'help', `${t.summary}`, `#/tickets/${t.id}`, h('span', { class: 'muted' }, [t.propertyName, ' · ', timeEl(t.at)]))),
      d.unread > 0 && linkRow('chat', `${d.unread} ${d.unread === 1 ? 'chat needs' : 'chats need'} a response`, '#/conversations'),
      d.tidy > 0 && linkRow('bolt', `${d.tidy} knowledge ${d.tidy === 1 ? 'suggestion' : 'suggestions'} to review`, '#/tidy'),
    ].filter(Boolean);
    const section = (title, hint, items) => items.length > 0 && h('section', { class: 'todo-section' }, h('h2', null, `${title} (${items.length})`), hint && h('p', { class: 'hint' }, hint), items);
    const empty = !d.tasks.length && !d.followUps.length && !d.unhappy.length && !waiting.length;
    fill(body,
      empty && h('div', { class: 'card section empty' }, icon('check', 28), h('p', null, h('strong', null, 'Nothing to do.')), h('p', { class: 'muted' }, 'New items appear here as guests write and stays approach.')),
      section('Unhappy guests', 'A check-in message the assistant suggests, with a time. Nothing is sent unless you schedule it.', [
        ...d.followUps.map(safely((f) => messageCard({
          tone: 'danger', iconName: 'frown', title: 'Check in with an unhappy guest', who: f.guestName, when: f.propertyName, note: f.note, text: f.text, at: f.at, chatId: f.conversationId,
          save: (text, at) => api(`/conversations/${f.conversationId}/followup`, { method: 'POST', body: { text, at } }).then(() => done(`Scheduled for ${fullTime(at)}`), fail),
          drop: () => api(`/conversations/${f.conversationId}/followup`, { method: 'DELETE', body: {} }).then(() => done('Dismissed'), fail),
        }))),
        ...d.unhappy.map((u) => h('article', { class: 'card todo-card' },
          h('header', { class: 'card-head' }, h('div', { class: 'card-title' }, chip('Unhappy', { tone: 'danger', icon: 'frown' }), h('strong', null, u.guestName)), h('div', { class: 'card-meta' }, h('a', { href: `#/conversations/${u.conversationId}` }, 'Open chat'))),
          h('p', { class: 'muted' }, [u.propertyName, u.summary ? ` · ${u.summary}` : '']))),
      ]),
      section('Offers to send', 'Extras that are switched on and free in the calendar for these stays. The time is when guests are most likely to say yes.', upsells.map(safely((t) => taskCard(t, 'brand', 'plus')))),
      section('Happy guests', 'A thank-you and review request for guests who sounded pleased.', happy.map(safely((t) => taskCard(t, 'ok', 'smile')))),
      section('Reviews to write', 'Your review of each guest who has checked out, drafted from their conversation. Copy it, post it on Airbnb or Vrbo, then mark it posted. Airbnb closes reviews 14 days after checkout.', reviews.map(safely((t) => reviewCard(t, { done, fail })))),
      waiting.length > 0 && h('section', { class: 'todo-section' }, h('h2', null, 'Waiting for you'), h('ul', { class: 'todo-links card' }, waiting)),
      d.scheduled.length > 0 && h('details', { class: 'todo-scheduled' },
        h('summary', null, `${d.scheduled.length} ${d.scheduled.length === 1 ? 'message' : 'messages'} scheduled`),
        h('ul', { class: 'plain-list' }, d.scheduled.map((t) => {
          const cancel = button('Cancel', { small: true, variant: 'ghost', icon: 'x' });
          cancel.addEventListener('click', () => busy(cancel, () => api(`/tasks/${t.id}`, { method: 'DELETE', body: {} }).then(() => done('Cancelled'), fail)));
          return h('li', { class: 'todo-scheduled-row' }, h('span', null, h('strong', null, t.guestName), ` · ${t.label} · ${fullTime(t.at)}`), cancel);
        }))));
  }
  load();
  return { el, onEvent(type) { if (['todo', 'draft', 'ticket', 'conversation', 'message', 'reconnect'].includes(type)) load(); } };
}

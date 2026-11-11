// Conversations: searchable list and the thread view (take over, reply, erase).
import { api, autoGrow, busy, button, chip, confirmDialog, fill, guestLabel, h, icon, loadError, loading, reconcile, showError, stayDate, fullTime, timeEl, toast, uid } from './lib.js';
import { approvalCard, ticketCard } from './inbox.js';

const STAGES = { before_arrival: 'Before arrival', during_stay: 'During stay', after_stay: 'After stay' };
const CHANNELS = { web: 'Web chat', smoobu: 'Booking channel message' };
const ROLE_LABELS = { guest: 'Guest', assistant: 'Assistant', team: 'Team' };

/** Status chips for one message: how it reached (or did not reach) the guest. */
function messageChips(m) {
  const chips = [];
  if (m.status === 'rejected') chips.push(chip('Rejected, not sent', { tone: 'danger', icon: 'x' }));
  if (m.kind === 'holding') chips.push(chip('Holding note', { icon: 'clock' }));
  if (m.kind === 'relay') chips.push(chip(m.authorName ? `Team answer from ${m.authorName}` : 'Team answer', { icon: 'user' }));
  if (m.automatic) chips.push(chip('Sent automatically', { tone: 'navy', icon: 'bolt' }));
  if (m.edited) chips.push(chip(`Edited by ${m.authorName || 'the team'}`, { tone: 'warn', icon: 'edit' }));
  else if (m.role === 'assistant' && m.kind === 'answer' && m.status === 'sent' && !m.automatic && m.authorName) chips.push(chip(`Approved by ${m.authorName}`, { tone: 'ok', icon: 'check' }));
  if (m.deliveryError) chips.push(chip(`Not delivered: ${m.deliveryError}`, { tone: 'danger', icon: 'alert' }));
  return chips;
}

function messageEl(m, conversation, onChange) {
  // A pending draft is shown as the same approval card as in the inbox.
  if (m.status === 'pending') {
    return h('li', { class: 'msg msg-pending' },
      h('p', { class: 'msg-who' }, chip('Draft waiting for approval', { tone: 'warn', icon: 'clock' }), ' ', timeEl(m.at)),
      approvalCard({ draft: m, conversation }, { inThread: true, onDone: onChange }));
  }
  const who = m.role === 'team' && m.authorName ? `Team · ${m.authorName}` : ROLE_LABELS[m.role];
  const chips = messageChips(m);
  return h('li', { class: `msg msg-${m.role}${m.status === 'rejected' ? ' msg-rejected' : ''}` },
    h('p', { class: 'msg-who' }, h('strong', null, who), ' ', timeEl(m.sentAt || m.at)),
    h('div', { class: 'bubble' }, h('p', { class: 'pre' }, m.text)),
    chips.length ? h('p', { class: 'msg-chips' }, chips) : null,
    m.edited && m.original && h('details', { class: 'original' }, h('summary', null, 'Show the original draft'), h('p', { class: 'pre' }, m.original)));
}

/** One conversation: header, take-over bar, messages, details panel and the reply box. */
function threadPane(id, { onGone }) {
  const title = h('h1', { tabIndex: -1 }, 'Conversation');
  const headChips = h('p', { class: 'thread-chips' });
  const sub = h('p', { class: 'thread-sub' });
  const detailsId = uid('details');
  const detailsBtn = h('button', { type: 'button', class: 'btn btn-secondary btn-small details-toggle', 'aria-expanded': 'false', 'aria-controls': detailsId }, icon('info', 18), h('span', null, 'Details'));
  const takeover = h('div', { class: 'takeover' });
  const list = h('ol', { class: 'messages', 'aria-label': 'Messages' });
  const scroller = h('div', { class: 'thread-scroll', tabIndex: 0, role: 'region', 'aria-label': 'Message history' }, loading('Loading the conversation'), list);
  const details = h('aside', { class: 'thread-details', id: detailsId, 'aria-label': 'Guest details and requests' });

  const replyId = uid('reply');
  const replyBox = autoGrow(h('textarea', { id: replyId, rows: 1, maxLength: 4000, placeholder: 'Write to the guest' }));
  const sendBtn = button('Send', { variant: 'primary', icon: 'send', type: 'submit' });
  const composerNote = h('p', { class: 'hint' });
  const composer = h('form', { class: 'composer' },
    h('label', { htmlFor: replyId, class: 'visually-hidden' }, 'Your message to the guest'),
    h('div', { class: 'composer-row' }, replyBox, sendBtn), composerNote);

  const el = h('section', { class: 'thread', 'aria-label': 'Conversation' },
    h('header', { class: 'thread-head' },
      h('a', { class: 'back-link', href: '#/conversations' }, icon('back', 18), 'All conversations'),
      h('div', { class: 'thread-head-row' }, h('div', null, title, headChips), detailsBtn),
      sub),
    takeover,
    h('div', { class: 'thread-main' }, scroller, details),
    composer);

  detailsBtn.addEventListener('click', () => {
    const open = el.classList.toggle('show-details');
    detailsBtn.setAttribute('aria-expanded', String(open));
  });

  const openTickets = new Set();
  let first = true;

  function renderHead(c) {
    title.textContent = guestLabel(c.guestName);
    fill(headChips,
      c.verified ? chip('Verified guest', { tone: 'ok', icon: 'shield' }) : chip('Not verified', { icon: 'help' }),
      STAGES[c.stage] && chip(STAGES[c.stage], { icon: 'clock' }),
      chip(CHANNELS[c.channel] || c.channel, { icon: 'chat' }));
    fill(sub,
      c.propertyId ? h('a', { href: `#/properties/${c.propertyId}` }, c.propertyName) : 'No property',
      c.stay && ` · ${stayDate(c.stay.arrival)} to ${stayDate(c.stay.departure)}`);
  }

  function renderTakeover(c) {
    const btn = c.botPaused
      ? button('Hand back to assistant', { variant: 'primary', icon: 'bot' })
      : button('Take over', { icon: 'user' });
    btn.addEventListener('click', () => busy(btn, async () => {
      try {
        const out = await api(`/conversations/${id}/takeover`, { method: 'POST', body: { paused: !c.botPaused } });
        toast(out.conversation.botPaused ? 'You have taken over. The assistant is paused in this chat.' : 'Handed back. The assistant is replying again.', { kind: 'ok' });
        await load();
        el.querySelector('.takeover button')?.focus();
      } catch (err) {
        showError(err);
      }
    }));
    takeover.className = c.botPaused ? 'takeover takeover-on' : 'takeover';
    fill(takeover,
      icon(c.botPaused ? 'user' : 'bot', 20),
      h('p', null, h('strong', null, c.botPaused ? 'The team is handling this chat.' : 'The assistant is replying in this chat.'),
        c.botPaused ? ' The assistant is paused and you are notified of each guest message.' : ''),
      btn);
    composerNote.textContent = c.botPaused ? '' : 'The assistant is still replying here. Take over if you want it to stay quiet.';
    composerNote.hidden = c.botPaused;
  }

  function renderDetails(c, tickets) {
    const row = (label, value) => value && h('div', null, h('dt', null, label), h('dd', null, value));
    const erase = button('Erase conversation', { variant: 'danger', icon: 'trash', small: true });
    erase.addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: 'Erase this conversation?',
        message: `Every message in the chat with ${guestLabel(c.guestName)} will be deleted for good, for the team and for the guest. Use this for privacy requests. It cannot be undone.`,
        confirmLabel: 'Erase conversation', danger: true,
      });
      if (!ok) return;
      try {
        await api(`/conversations/${id}`, { method: 'DELETE' });
        toast('Conversation erased.', { kind: 'ok' });
        onGone();
      } catch (err) {
        showError(err);
      }
    });
    const ticketList = h('div', { class: 'stack' });
    reconcile(ticketList, tickets.slice().reverse(), {
      key: (t) => t.id,
      signature: (t) => `${t.status}|${t.answer || ''}`,
      create: (t) => ticketCard(t, { isOpen: openTickets.has(t.id), onToggle: (open) => openTickets[open ? 'add' : 'delete'](t.id), showChatLink: false }),
    });
    fill(details,
      h('h2', null, 'Guest and stay'),
      h('dl', { class: 'facts' },
        row('Guest', `${guestLabel(c.guestName)}${c.verified ? ' (verified against the booking)' : ''}`),
        row('Property', c.propertyName),
        row('Stay', c.stay && `${stayDate(c.stay.arrival)} to ${stayDate(c.stay.departure)}`),
        row('Check-in / checkout', c.stay && [c.stay.checkIn, c.stay.checkOut].filter(Boolean).join(' / ')),
        row('Booked through', c.stay?.channel),
        row('Stage', STAGES[c.stage] || 'Not known (guest not verified)'),
        row('Channel', CHANNELS[c.channel] || c.channel),
        row('Language', c.language),
        row('Started', fullTime(c.createdAt))),
      h('h2', null, `Requests (${tickets.length})`),
      tickets.length ? ticketList : h('p', { class: 'muted' }, 'No requests in this conversation.'),
      h('h2', null, 'Privacy'),
      h('p', { class: 'muted' }, 'If the guest asks for their messages to be deleted, erase the conversation.'),
      erase);
    fill(detailsBtn.lastChild, tickets.some((t) => t.status !== 'closed') ? `Details (${tickets.filter((t) => t.status !== 'closed').length} open)` : 'Details');
  }

  async function load() {
    let data;
    try {
      data = await api(`/conversations/${id}`);
    } catch (err) {
      if (err.status === 401) return;
      if (err.status === 404) {
        fill(el, h('div', { class: 'empty' }, icon('info', 28), h('p', null, 'This conversation no longer exists. It may have been erased.'), h('a', { class: 'btn btn-secondary', href: '#/conversations' }, 'All conversations')));
      } else if (first) {
        fill(scroller, loadError(err, () => { fill(scroller, loading('Loading the conversation'), list); load(); }));
      }
      return;
    }
    const nearBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 80;
    scroller.querySelector('.loading')?.remove();
    renderHead(data.conversation);
    renderTakeover(data.conversation);
    renderDetails(data.conversation, data.tickets);
    reconcile(list, data.messages, {
      key: (m) => m.id,
      signature: (m) => `${m.status}|${m.text}|${m.deliveryError || ''}`,
      create: (m) => messageEl(m, data.conversation, load),
    });
    if (first || nearBottom) scroller.scrollTop = scroller.scrollHeight;
    first = false;
  }

  const send = () => busy(sendBtn, async () => {
    const text = replyBox.value.trim();
    if (!text) return;
    try {
      await api(`/conversations/${id}/reply`, { method: 'POST', body: { text } });
      replyBox.value = '';
      replyBox.dispatchEvent(new Event('input'));
      await load();
      scroller.scrollTop = scroller.scrollHeight;
      replyBox.focus();
    } catch (err) {
      showError(err, send);
    }
  });
  composer.addEventListener('submit', (e) => {
    e.preventDefault();
    send();
  });
  replyBox.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); });

  load();
  return { el, reload: load };
}

function listItem(c, activeId) {
  const flags = [
    c.botPaused && chip('Team handling', { tone: 'navy', icon: 'user' }),
    c.pendingDrafts > 0 && chip(`${c.pendingDrafts} to approve`, { tone: 'warn', icon: 'clock' }),
    c.openTickets > 0 && chip(`${c.openTickets} open ${c.openTickets === 1 ? 'request' : 'requests'}`, { tone: 'warn', icon: 'help' }),
  ].filter(Boolean);
  return h('li', null,
    h('a', { class: 'conv-item', href: `#/conversations/${c.id}`, 'aria-current': c.id === activeId ? 'page' : null },
      h('span', { class: 'conv-top' },
        h('strong', null, guestLabel(c.guestName)),
        c.verified && h('span', { class: 'verified-mark' }, icon('shield', 14), h('span', { class: 'visually-hidden' }, 'Verified')),
        timeEl(c.lastMessageAt)),
      h('span', { class: 'conv-prop' }, c.propertyName || 'No property'),
      c.lastMessage && h('span', { class: 'conv-last' }, `${ROLE_LABELS[c.lastMessage.role]}: ${c.lastMessage.text}`),
      flags.length ? h('span', { class: 'conv-flags' }, flags) : null));
}

/** Conversations screen: list on the left (or alone on a phone), thread on the right. */
export function conversationsView(params) {
  const searchId = uid('search');
  const search = h('input', { type: 'search', id: searchId, placeholder: 'Search guests and messages', autocomplete: 'off' });
  const propertySelect = h('select', { 'aria-label': 'Filter by property' }, h('option', { value: '' }, 'All properties'));
  const list = h('ul', { class: 'conv-list' });
  const status = h('div', null, loading('Loading conversations'));
  const listPane = h('div', { class: 'conv-pane' },
    h('header', { class: 'conv-head' },
      h('h1', { tabIndex: -1 }, 'Conversations'),
      h('div', { class: 'conv-filters' },
        h('label', { htmlFor: searchId, class: 'visually-hidden' }, 'Search conversations'),
        h('div', { class: 'search-box' }, icon('search', 18), search),
        propertySelect)),
    status, list);
  const threadSlot = h('div', { class: 'thread-slot' });
  const el = h('div', { class: 'split' }, listPane, threadSlot);

  let activeId = null;
  let thread = null;
  let requestNo = 0;

  async function loadList() {
    const mine = ++requestNo;
    const query = new URLSearchParams();
    if (search.value.trim()) query.set('q', search.value.trim());
    if (propertySelect.value) query.set('propertyId', propertySelect.value);
    try {
      const { conversations } = await api(`/conversations?${query}`);
      if (mine !== requestNo) return; // a newer search has started
      fill(list, conversations.map((c) => listItem(c, activeId)));
      fill(status, conversations.length ? null : h('div', { class: 'empty' }, icon('chat', 28),
        h('p', null, query.toString() ? 'No conversations match.' : 'No conversations yet. They appear here when a guest writes.')));
    } catch (err) {
      if (mine === requestNo && err.status !== 401) fill(status, loadError(err, loadList));
    }
  }

  function show(id) {
    activeId = id || null;
    el.classList.toggle('has-thread', !!activeId);
    for (const a of list.querySelectorAll('.conv-item')) {
      if (a.getAttribute('href') === `#/conversations/${activeId}`) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    }
    if (!activeId) {
      thread = null;
      fill(threadSlot, h('div', { class: 'empty thread-empty' }, icon('chat', 28), h('p', null, 'Choose a conversation to read it.')));
      return;
    }
    thread = threadPane(activeId, { onGone: () => { location.hash = '#/conversations'; loadList(); } });
    fill(threadSlot, thread.el);
  }

  let timer;
  search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(loadList, 250);
  });
  propertySelect.addEventListener('change', loadList);

  api('/properties').then(({ properties }) => {
    propertySelect.append(...properties.map((p) => h('option', { value: p.id }, p.ref ? `${p.ref} · ${p.displayName}` : p.displayName)));
  }).catch(() => {}); // the filter is a convenience; the list still works without it

  show(params.id);
  loadList();

  return {
    el,
    update(next) { if ((next.id || null) !== activeId) show(next.id); },
    /** Live update: refresh the list, and the open thread when the event is about it. */
    onEvent(type, data) {
      loadList();
      if (thread && (data.conversationId == null || data.conversationId === activeId)) thread.reload();
    },
    focusTarget: () => (activeId ? threadSlot.querySelector('h1') : listPane.querySelector('h1')),
  };
}

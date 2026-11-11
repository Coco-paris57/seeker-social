// Inbox: drafts waiting for approval and requests from the assistant (urgent, maintenance,
// questions). The approval and request cards are also used inside a conversation thread.
import { add, api, ApiError, autoGrow, busy, button, check, chip, confirmDialog, fill, guestLabel, h, icon, loadError, loading, openDialog, pageHeader, reconcile, showError, TICKET_TYPES, timeEl, toast, uid } from './lib.js';
import { inbox } from './state.js';

const CONFIDENCE = {
  high: { label: 'High confidence', tone: 'ok', icon: 'check' },
  medium: { label: 'Medium confidence', tone: 'neutral', icon: 'info' },
  low: { label: 'Low confidence', tone: 'warn', icon: 'alert' },
};

// Words and digit runs that suggest a saved answer holds something private (a code, a password).
const PRIVATE_TEXT = /\d{3,}|\b(code|password|pin|key ?safe|lock ?box)\b/i;
const PRIVATE_CATEGORIES = new Set(['access', 'wifi']);

/**
 * "Remember" checkbox with where to save it and who may be told. `text()` returns the words
 * that would be saved: the verified-guests switch follows them until the person sets it.
 */
function rememberControl({ label, propertyName, category, text, checked = false }) {
  const scope = h('select', { 'aria-label': 'Where to save it' },
    propertyName && h('option', { value: 'property' }, 'This property only'),
    h('option', { value: 'global' }, 'All properties'));
  const hintId = uid('sens');
  const sensitive = check('Only share with verified guests', { 'aria-describedby': hintId });
  const extra = h('div', { class: 'remember-more', hidden: !checked }, scope,
    h('div', null, sensitive.wrap, h('p', { class: 'hint', id: hintId }, 'Keep on for door codes, WiFi and anything private.')));
  const box = check(label, { checked, onchange: () => { extra.hidden = !box.input.checked; } });
  let touched = false;
  sensitive.input.addEventListener('change', () => { touched = true; });
  const refresh = () => { if (!touched) sensitive.input.checked = PRIVATE_CATEGORIES.has(category) || PRIVATE_TEXT.test(text()); };
  refresh();
  return {
    el: h('div', { class: 'remember' }, box.wrap, extra),
    refresh,
    value: () => ({ remember: box.input.checked, scope: scope.value, sensitive: sensitive.input.checked }),
  };
}

/** A 409 means someone else handled it, or the guest wrote again and the draft was replaced. */
function handleDraftError(err, retry) {
  if (err instanceof ApiError && err.status === 409) {
    toast('This draft was already handled or replaced by a newer one. The list has been refreshed.', { kind: 'info' });
    inbox.refresh();
  } else {
    showError(err, retry);
  }
}

/** After a card is handled, move focus to the next card's main action so a run of approvals stays quick. */
function removeCard(card) {
  const next = card.nextElementSibling || card.previousElementSibling;
  card.remove();
  next?.querySelector('[data-primary]')?.focus({ preventScroll: true });
}

/**
 * A draft waiting for approval. `item` is an entry of GET /inbox `approvals`.
 * `inThread` drops the context a conversation thread already shows.
 */
export function approvalCard(item, { inThread = false, onDone = () => {} } = {}) {
  const { draft, conversation } = item;
  const original = draft.text;
  const property = conversation.propertyName;
  const asked = item.recentGuestMessages?.length ? item.recentGuestMessages : item.guestMessage ? [item.guestMessage] : [];

  const textId = uid('draft');
  const textarea = autoGrow(h('textarea', { id: textId, class: 'draft-text', rows: 3, value: original }));
  const remember = rememberControl({ label: property ? `Remember this answer for ${property}` : 'Remember this answer', propertyName: property, category: draft.category, text: () => textarea.value });
  remember.el.hidden = true;
  const approve = button('Approve & send', { variant: 'primary', icon: 'check', 'data-primary': true });
  const reject = button('Reject', { icon: 'x' });
  const reset = button('Undo changes', { variant: 'ghost', small: true, hidden: true });
  const edited = () => textarea.value.trim() !== original.trim();

  // Editing reveals "remember": a corrected answer is worth keeping for next time.
  const sync = () => {
    remember.el.hidden = reset.hidden = !edited();
    remember.refresh();
    approve.lastChild.textContent = edited() ? 'Send edited reply' : 'Approve & send';
  };
  textarea.addEventListener('input', sync);
  reset.addEventListener('click', () => {
    textarea.value = original;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  });

  const card = h('article', { class: 'card approval', 'aria-label': `Draft reply for ${guestLabel(conversation.guestName)}` });

  const send = () => busy(approve, async () => {
    if (!textarea.value.trim()) return toast('The reply cannot be empty.', { kind: 'error' });
    const body = edited() ? { text: textarea.value.trim(), ...remember.value() } : {};
    try {
      const out = await api(`/messages/${draft.id}/approve`, { method: 'POST', body });
      toast(out.knowledgeId ? 'Sent to the guest and saved to the knowledge base.' : 'Sent to the guest.', { kind: 'ok' });
      removeCard(card);
      onDone();
      inbox.refresh();
    } catch (err) {
      handleDraftError(err, send);
    }
    return undefined;
  });
  approve.addEventListener('click', send);
  // Ctrl/Cmd+Enter sends from the text box.
  textarea.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) send(); });

  reject.addEventListener('click', async () => {
    const done = await rejectDialog(draft, conversation);
    if (!done) return;
    removeCard(card);
    onDone();
    inbox.refresh();
  });

  const confidence = CONFIDENCE[draft.confidence];
  add(card,
    !inThread && h('header', { class: 'card-head' },
      h('div', { class: 'card-title' },
        h('strong', null, property || 'No property'),
        h('span', { class: 'muted' }, guestLabel(conversation.guestName)),
        conversation.verified && chip('Verified', { tone: 'ok', icon: 'shield' })),
      h('div', { class: 'card-meta' }, timeEl(draft.at), h('a', { href: `#/conversations/${conversation.id}` }, 'Open chat'))),
    !inThread && asked.length > 0 && h('div', { class: 'quote' },
      h('p', { class: 'label' }, 'Guest asked'),
      asked.map((text, i) => h('p', { class: i < asked.length - 1 ? 'pre earlier' : 'pre' }, text))),
    h('div', { class: 'draft' },
      h('div', { class: 'draft-head' },
        h('label', { htmlFor: textId, class: 'label' }, 'Drafted reply (edit if needed)'),
        confidence ? chip(confidence.label, confidence) : null),
      textarea,
      remember.el),
    h('div', { class: 'actions' }, approve, reject, reset),
  );
  return card;
}

/** Reject a draft, optionally sending the team's own reply in its place. Resolves true when done. */
function rejectDialog(draft, conversation) {
  return openDialog({
    title: 'Reject this draft',
    build: (close) => {
      const reply = h('textarea', { rows: 4, id: uid('rej') });
      const remember = rememberControl({ label: conversation.propertyName ? `Remember my reply for ${conversation.propertyName}` : 'Remember my reply', propertyName: conversation.propertyName, category: draft.category, text: () => reply.value });
      remember.el.hidden = true;
      const submit = button('Reject draft', { variant: 'danger' });
      reply.addEventListener('input', () => {
        const has = !!reply.value.trim();
        remember.el.hidden = !has;
        remember.refresh();
        submit.lastChild.textContent = has ? 'Reject and send my reply' : 'Reject draft';
      });
      const go = () => busy(submit, async () => {
        const text = reply.value.trim();
        try {
          await api(`/messages/${draft.id}/reject`, { method: 'POST', body: text ? { replyText: text, ...remember.value() } : {} });
          toast(text ? 'Draft rejected. Your reply was sent to the guest.' : 'Draft rejected. Nothing was sent to the guest.', { kind: 'ok' });
          close(true);
        } catch (err) {
          if (err.status === 409) close(false);
          handleDraftError(err, go);
        }
      });
      submit.addEventListener('click', go);
      return [
        h('p', null, 'The guest will not see the drafted reply. You can write your own reply instead, or leave this empty and answer later from the chat.'),
        h('div', { class: 'field' }, h('label', { htmlFor: reply.id }, 'Your reply to the guest (optional)'), reply),
        remember.el,
        h('div', { class: 'dialog-actions' }, button('Cancel', { onclick: () => close(false) }), submit),
      ];
    },
  });
}

/**
 * A request from the assistant. Collapsed to one row; opens to the guest's message, the
 * assistant's question and the answer form. `isOpen`/`onToggle` keep the open state across refreshes.
 */
export function ticketCard(ticket, { isOpen = false, onToggle = () => {}, showChatLink = true } = {}) {
  const type = TICKET_TYPES[ticket.type];
  const bodyId = uid('ticket');
  const answered = ticket.status === 'answered';
  const closed = ticket.status === 'closed';
  // Learning mode: a person must see the exact words before they go to the guest.
  const autoMode = ticket.propertyId != null && inbox.modes.get(ticket.propertyId) === 'auto';

  const toggle = h('button', { type: 'button', class: 'ticket-toggle', 'aria-expanded': String(isOpen), 'aria-controls': bodyId },
    h('span', { class: `ticket-type ticket-type-${ticket.type}` }, icon(type.icon, 16), type.label),
    h('span', { class: 'ticket-summary' }, ticket.summary || ticket.question || 'Request'),
    h('span', { class: 'ticket-meta' },
      [ticket.propertyName, guestLabel(ticket.guestName)].filter(Boolean).join(' · '), ' · ', timeEl(ticket.createdAt),
      answered && chip('Update sent, still open', { tone: 'ok', icon: 'check' }),
      closed && chip('Closed', { icon: 'check' })),
    icon('chevron', 20));
  const body = h('div', { class: 'ticket-body', id: bodyId, hidden: !isOpen });
  const card = h('article', { class: `card ticket ticket-${ticket.type}`, id: `ticket-${ticket.id}` }, toggle, body);

  toggle.addEventListener('click', () => {
    const open = body.hidden;
    body.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    onToggle(open);
  });

  add(body,
    ticket.guestMessage && h('div', { class: 'quote' }, h('p', { class: 'label' }, 'Guest wrote'), h('p', { class: 'pre' }, ticket.guestMessage)),
    ticket.question && h('div', { class: 'ask' }, h('p', { class: 'label' }, icon('bot', 16), 'The assistant asks'), h('p', { class: 'pre' }, ticket.question)),
    ticket.answer && h('div', { class: 'quote' },
      h('p', { class: 'label' }, `Team answer${ticket.answeredByName ? ` from ${ticket.answeredByName}` : ''}`, ticket.answeredAt && ' · ', timeEl(ticket.answeredAt)),
      h('p', { class: 'pre' }, ticket.answer)),
    ticket.savedToKnowledge && h('p', { class: 'note' }, icon('bookmark', 16), 'Saved to the knowledge base.'),
  );
  if (!closed) body.append(answerForm(ticket, { autoMode, card }));
  if (showChatLink) body.append(h('p', { class: 'ticket-links' }, h('a', { href: `#/conversations/${ticket.conversationId}` }, 'Open the conversation')));
  return card;
}

/** Answer form: write to the assistant, preview the wording, then send to the guest. */
function answerForm(ticket, { autoMode, card }) {
  const answered = ticket.status === 'answered';
  const followUp = ticket.type !== 'question';
  const answerId = uid('ans');
  const replyId = uid('rep');
  const answer = autoGrow(h('textarea', { id: answerId, rows: 2, placeholder: followUp ? 'For example: plumber booked for 4pm today' : '' }));
  const hint = h('p', { class: 'hint', id: `${answerId}-hint` });
  answer.setAttribute('aria-describedby', hint.id);

  const remember = ticket.savedToKnowledge ? null : rememberControl({ label: 'Save to knowledge base', propertyName: ticket.propertyName, category: ticket.category, text: () => answer.value, checked: ticket.type === 'question' });
  const verbatim = check('Send exactly as written');
  // A maintenance update usually comes before the fix, so the request stays open by default.
  const keepOpen = followUp ? check('Keep open for follow-up', { checked: true }) : null;

  const reply = autoGrow(h('textarea', { id: replyId, rows: 3 }));
  const previewNote = h('p', { class: 'hint', id: `${replyId}-hint` });
  reply.setAttribute('aria-describedby', previewNote.id);
  const previewBox = h('div', { class: 'preview', hidden: true },
    h('label', { htmlFor: replyId, class: 'label' }, 'This is what the guest will receive (edit if needed)'), reply, previewNote);

  const preview = button('Preview reply', { variant: 'primary', icon: 'eye', 'data-primary': true });
  const send = button('Send to guest', { variant: 'primary', icon: 'send', hidden: true });
  const quick = button('Send without preview', { icon: 'send', hidden: !autoMode });
  const closeBtn = button(answered ? 'Close request' : 'Close without replying', { variant: 'ghost', icon: 'check' });

  let previewed = false; // true while the preview box matches the answer text
  const sync = () => {
    const direct = verbatim.input.checked;
    hint.textContent = direct
      ? 'Your words go to the guest exactly as written, as a message from the team.'
      : autoMode
        ? 'Write to the assistant. It words the reply for the guest in their language.'
        : 'Write to the assistant. You will see its wording for the guest before anything is sent.';
    previewBox.hidden = direct || !previewed;
    preview.hidden = direct || previewed;
    send.hidden = !(direct || previewed);
    quick.hidden = !autoMode || direct || previewed;
  };
  verbatim.input.addEventListener('change', sync);
  answer.addEventListener('input', () => {
    remember?.refresh();
    // The answer changed, so the wording shown no longer belongs to it.
    if (previewed) {
      previewed = false;
      sync();
    }
  });
  sync();

  const needAnswer = () => {
    if (answer.value.trim()) return true;
    toast('Please write an answer first.', { kind: 'error' });
    answer.focus();
    return false;
  };

  const doPreview = () => busy(preview, async () => {
    if (!needAnswer()) return;
    try {
      const out = await api(`/tickets/${ticket.id}/preview`, { method: 'POST', body: { answer: answer.value.trim() } });
      reply.value = out.reply;
      previewNote.textContent = out.worded ? 'Worded by the assistant from your answer.' : 'The assistant could not word this just now, so your own words are shown.';
      previewed = true;
      sync();
      reply.dispatchEvent(new Event('input'));
      reply.focus();
    } catch (err) {
      showError(err, doPreview);
    }
  });
  preview.addEventListener('click', doPreview);

  const post = (btn, extra) => busy(btn, async () => {
    if (!needAnswer()) return;
    if ('reply' in extra && !extra.reply) {
      toast('The reply to the guest cannot be empty.', { kind: 'error' });
      return;
    }
    const body = { answer: answer.value.trim(), ...(remember ? remember.value() : {}), keepOpen: !!keepOpen?.input.checked, ...extra };
    try {
      const out = await api(`/tickets/${ticket.id}/answer`, { method: 'POST', body });
      const saved = body.remember && out.knowledgeId ? ' Saved to the knowledge base.' : '';
      toast(`${out.ticket.status === 'closed' ? 'Reply sent and request closed.' : 'Reply sent. The request stays open.'}${saved}`, { kind: 'ok' });
      if (out.ticket.status === 'closed') removeCard(card);
      inbox.refresh();
    } catch (err) {
      if (err.status === 409) inbox.refresh();
      showError(err, () => post(btn, extra));
    }
  });
  send.addEventListener('click', () => post(send, verbatim.input.checked ? { verbatim: true } : { reply: reply.value.trim() }));
  quick.addEventListener('click', () => post(quick, {}));

  closeBtn.addEventListener('click', async () => {
    if (!answered && !(await confirmDialog({
      title: 'Close without replying?',
      message: 'The guest has not had an answer to this request. Close it only if it was dealt with another way, for example by phone.',
      confirmLabel: 'Close request',
    }))) return;
    busy(closeBtn, async () => {
      try {
        await api(`/tickets/${ticket.id}/close`, { method: 'POST' });
        toast('Request closed.', { kind: 'ok' });
        removeCard(card);
        inbox.refresh();
      } catch (err) {
        showError(err);
      }
    });
  });

  return h('div', { class: 'answer-form' },
    h('div', { class: 'field' }, h('label', { htmlFor: answerId }, answered ? 'Send another update' : 'Your answer'), answer, hint),
    h('div', { class: 'options' }, remember?.el, verbatim.wrap, keepOpen?.wrap),
    previewBox,
    h('div', { class: 'actions' }, preview, send, quick, closeBtn));
}

/** The inbox screen. `params.ticketId` (from a notification link) opens that request. */
export function inboxView(params) {
  const urgentList = h('div', { class: 'stack' });
  const approvalList = h('div', { class: 'stack' });
  const requestList = h('div', { class: 'stack' });
  const urgentSection = h('section', { class: 'inbox-urgent', 'aria-labelledby': 'h-urgent', hidden: true },
    h('h2', { id: 'h-urgent' }, icon('alert', 20), 'Urgent'), urgentList);
  const approvalCount = h('span', { class: 'count' });
  const requestCount = h('span', { class: 'count' });
  const approvalSection = h('section', { 'aria-labelledby': 'h-approvals' }, h('h2', { id: 'h-approvals' }, 'Approvals ', approvalCount), approvalList);
  const requestSection = h('section', { 'aria-labelledby': 'h-requests' }, h('h2', { id: 'h-requests' }, 'Requests ', requestCount), requestList);
  const notice = h('div');
  const body = h('div', { class: 'inbox-body' }, loading('Loading the inbox'));
  const el = h('div', { class: 'page page-inbox' }, pageHeader('Inbox', { sub: 'Replies waiting for approval and requests from the assistant.' }), notice, body);

  const openTickets = new Set(); // requests the person has expanded
  let target = params.ticketId || null;
  let built = false;

  const renderTickets = (list, tickets) => reconcile(list, tickets, {
    key: (t) => t.id,
    signature: (t) => `${t.status}|${t.answer || ''}|${t.savedToKnowledge}|${inbox.modes.get(t.propertyId)}`,
    create: (t) => ticketCard(t, { isOpen: openTickets.has(t.id), onToggle: (open) => openTickets[open ? 'add' : 'delete'](t.id) }),
  });

  /** Bring the request named in the link into view, or explain where it went. */
  async function showTarget() {
    const id = target;
    target = null;
    fill(notice);
    const card = el.querySelector(`#ticket-${id}`);
    if (card) {
      const toggle = card.querySelector('.ticket-toggle');
      if (toggle.getAttribute('aria-expanded') !== 'true') toggle.click();
      card.scrollIntoView({ block: 'start' });
      toggle.focus({ preventScroll: true });
      return;
    }
    try {
      const { ticket } = await api(`/tickets/${id}`);
      fill(notice, h('div', { class: 'banner' }, icon('info', 20),
        h('p', null, `That request (${ticket.summary || TICKET_TYPES[ticket.type].label}) has already been closed${ticket.answeredByName ? ` by ${ticket.answeredByName}` : ''}. `,
          h('a', { href: `#/conversations/${ticket.conversationId}` }, 'Open the conversation'))));
    } catch (err) {
      if (err.status === 404) fill(notice, h('div', { class: 'banner' }, icon('info', 20), h('p', null, 'That request no longer exists.')));
      else showError(err);
    }
  }

  function render() {
    const { data, error } = inbox;
    if (!data) {
      if (error) fill(body, loadError(error, () => { fill(body, loading('Loading the inbox')); inbox.refresh(); }));
      return;
    }
    if (!built) {
      fill(body, urgentSection, h('div', { class: 'inbox-columns' }, approvalSection, requestSection));
      built = true;
    }
    const urgent = data.tickets.filter((t) => t.type === 'urgent');
    const others = data.tickets.filter((t) => t.type !== 'urgent');
    urgentSection.hidden = !urgent.length;
    renderTickets(urgentList, urgent);
    renderTickets(requestList, others);
    reconcile(approvalList, data.approvals, {
      key: (a) => a.draft.id,
      signature: (a) => a.draft.text,
      create: (a) => approvalCard(a),
    });
    approvalCount.textContent = data.approvals.length || '';
    requestCount.textContent = others.length || '';
    const empty = (list, title, text) => {
      if (!list.children.length) list.append(h('div', { class: 'empty', dataset: { key: 'empty', sig: '' } }, icon('check', 28), h('p', null, h('strong', null, title)), h('p', null, text)));
    };
    empty(approvalList, 'Nothing to approve', 'New drafts appear here as soon as the assistant writes them.');
    empty(requestList, 'No open requests', 'Questions and maintenance reports from guests appear here.');
    if (target) showTarget();
  }

  const unsubscribe = inbox.subscribe(render);
  if (inbox.data) render();
  inbox.refresh();

  return {
    el,
    update(next) {
      target = next.ticketId || null;
      if (target && inbox.data) showTarget();
    },
    destroy: unsubscribe,
  };
}

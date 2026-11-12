// Seeker Concierge guest chat. Served at /g/<qrToken> (from the QR code in an apartment) and
// /stay (general link). Vanilla JS, no dependencies; the API contract is docs/API.md.
import { locale, t } from '/guest/i18n.js';

const $ = (id) => document.getElementById(id);
const qrToken = decodeURIComponent((location.pathname.match(/^\/g\/([^/]+)/) || [])[1] || '');
const touch = matchMedia('(pointer: coarse)').matches;

const state = {
  about: null,
  property: null, // from /welcome, before a chat exists
  conversation: null,
  messages: [], // delivered messages, in server order
  outbox: [], // guest messages not yet accepted: { localId, text, files, status: 'sending'|'failed', error }
  tray: [], // files chosen for the next message: { id, kind, preview, token, status: 'uploading'|'ready' }
  loaded: false, // first message list rendered (later arrivals are announced)
  closing: false, // "Delete my chat" or "Leave chat" is in progress
};

// --- API -----------------------------------------------------------------------------------

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status; // 0 = network failure
  }
}

async function api(method, path, body) {
  let res;
  try {
    res = await fetch(`/api/guest${path}`, {
      method,
      credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, '');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error || '');
  return data;
}

/** A 401 during the chat means the session is gone (expired, or erased by the team). */
function sessionGone(error) {
  if (error.status !== 401) return false;
  // Deleting or leaving ends the session on purpose; that path shows its own notice.
  if (state.conversation && !state.closing) endChat(t('sessionEnded'));
  return true;
}

// --- Small DOM helpers ---------------------------------------------------------------------

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function setText(node, text) {
  node.textContent = text || '';
  node.hidden = !text;
}

function showView(name) {
  for (const view of ['loading', 'welcome', 'dead', 'chat']) $(`view-${view}`).hidden = view !== name;
}

function announce(text) {
  $('announcer').textContent = text;
}

/** Fill static strings: data-t sets text, data-t-<attribute> sets an attribute. */
function translatePage() {
  document.documentElement.lang = locale;
  for (const node of document.querySelectorAll('[data-t]')) node.textContent = t(node.dataset.t);
  for (const attr of ['aria-label', 'placeholder']) {
    for (const node of document.querySelectorAll(`[data-t-${attr}]`)) node.setAttribute(attr, t(node.getAttribute(`data-t-${attr}`)));
  }
  // Consent sentence with the privacy link in the middle.
  const [before, after] = t('consent').split('{link}');
  const link = el('a', '', t('privacyNotice'));
  link.href = '/privacy';
  $('consent').replaceChildren(before, link, after || '');
  for (const key of ['s1', 's2', 's3', 's4', 's5']) {
    const item = el('li');
    const button = el('button', 'chip', t(key));
    button.type = 'button';
    button.addEventListener('click', () => send(t(key)));
    item.append(button);
    $('suggest-list').append(item);
  }
}

/** Emergency line, urgent contact and team hours, wherever a [data-info] block appears. */
function renderInfo() {
  const about = state.about;
  const urgent = [t('emergency')];
  if (about?.emergencyContact) urgent.push(t('emergencyContact', { contact: about.emergencyContact }));
  const lines = about?.officeHours ? [...urgent, t('officeHours', { hours: about.officeHours })] : urgent;
  for (const block of document.querySelectorAll('[data-info]')) block.replaceChildren(...lines.map((line) => el('p', '', line)));
  $('emergency-line').textContent = urgent.join(' '); // always on screen under the composer
}

// Dates follow the browser's full locale (en-GB and en-US differ), not just the UI language.
const dayMonth = new Intl.DateTimeFormat(navigator.language, { day: 'numeric', month: 'short', timeZone: 'UTC' });
const clock = new Intl.DateTimeFormat(navigator.language, { hour: '2-digit', minute: '2-digit' });
const dayClock = new Intl.DateTimeFormat(navigator.language, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function messageTime(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return (date.toDateString() === new Date().toDateString() ? clock : dayClock).format(date);
}

// --- Welcome -------------------------------------------------------------------------------

async function boot() {
  showView('loading');
  let welcome;
  try {
    welcome = await api('GET', `/welcome${qrToken ? `?p=${encodeURIComponent(qrToken)}` : ''}`);
  } catch (error) {
    return showDeadEnd(error.status === 404 ? 'invalid' : 'loadError');
  }
  state.about = welcome.about;
  state.property = welcome.property;
  renderInfo();
  linkManifest();
  if (welcome.hasSession) {
    try {
      return openChat(await api('GET', '/me'));
    } catch (error) {
      if (error.status !== 401) return showDeadEnd('loadError');
    }
  }
  showWelcome();
}

/** Installing to the home screen should reopen this apartment's chat. */
function linkManifest() {
  if (!qrToken || document.querySelector('link[rel="manifest"]')) return;
  const manifest = document.createElement('link');
  manifest.rel = 'manifest';
  manifest.href = `/g/${encodeURIComponent(qrToken)}/manifest.webmanifest`;
  document.head.append(manifest);
}

function showWelcome(notice) {
  const property = state.property;
  $('welcome-title').textContent = property ? t('welcomeTitle', { name: property.name }) : t('welcomeTitleGeneric');
  setText($('welcome-area'), property?.area);
  setText($('welcome-notice'), notice);
  setText($('start-error'), '');
  document.title = property ? `${property.name} · ${state.about.botName}` : state.about.botName;
  showView('welcome');
  $('welcome-title').focus();
}

function showDeadEnd(kind) {
  $('dead-title').textContent = t(`${kind}Title`);
  $('dead-body').textContent = t(`${kind}Body`);
  $('dead-retry').hidden = kind !== 'loadError';
  showView('dead');
  $('dead-title').focus();
}

async function startChat() {
  const button = $('start');
  button.disabled = true;
  setText($('start-error'), '');
  try {
    // Pressing Start is the guest's agreement to the privacy notice linked beside the button.
    openChat(await api('POST', '/session', { qrToken: qrToken || undefined, consent: true }));
  } catch (error) {
    if (error.status === 404) showDeadEnd('invalid');
    else setText($('start-error'), error.status === 0 ? t('offline') : error.message || t('genericError'));
  } finally {
    button.disabled = false;
  }
}

// --- Chat: state to screen -----------------------------------------------------------------

function openChat({ conversation, messages, about }) {
  state.about = about;
  state.conversation = conversation;
  state.messages = messages;
  state.outbox = [];
  state.loaded = false;
  $('input').maxLength = about.maxMessageLength;
  renderInfo();
  renderConversation();
  showView('chat');
  renderMessages(true);
  state.loaded = true;
  connect();
  // On a phone, focusing a field would throw the keyboard over the screen the guest has not read yet.
  (touch ? $('scroll') : mustVerify() ? $('verify-name') : $('input')).focus();
}

function endChat(notice) {
  disconnect();
  for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
  state.conversation = null;
  state.messages = [];
  state.outbox = [];
  setTyping(false);
  $('input').value = '';
  resizeInput();
  showWelcome(notice);
}

function renderConversation() {
  const c = state.conversation;
  const property = c.property || state.property;
  $('chat-title').textContent = property ? property.name : state.about.botName;
  $('chat-sub').textContent = t(c.teamHasTakenOver ? 'headerSubTeam' : 'headerSub');
  document.title = property ? `${property.name} · ${state.about.botName}` : state.about.botName;

  let verified = '';
  if (c.verified) {
    const detail = c.stay
      ? t('verifiedDetail', { name: c.guestFirstName || '', from: dayMonth.format(new Date(c.stay.arrival)), to: dayMonth.format(new Date(c.stay.departure)) }).replace(/^, /, '')
      : c.guestFirstName || '';
    verified = detail ? `${t('verified')}: ${detail}` : t('verified');
  }
  const gated = mustVerify();
  $('verify-open').hidden = c.verified || gated;
  $('verified-strip').hidden = !c.verified;
  $('verified-text').textContent = verified;
  setText($('menu-verified'), verified);
  $('menu-verify').parentElement.hidden = c.verified || gated;

  // The one verify form lives in the dialog, or in the page itself while it is the required step.
  const form = $('verify-form');
  const home = gated ? $('gate') : $('verify');
  if (form.parentElement !== home) home.append(form);
  $('gate').hidden = !gated;
  $('composer').hidden = gated;
  $('verify-intro').textContent = `${gated ? `${t('gateIntro')} ` : ''}${t('verifyIntro', { hours: state.about.accessInfoHours })}`;
  $('suggest').hidden = gated || state.messages.length + state.outbox.length > 0;
}

/** A chat opened from the general link has no property until the booking is verified, and
    the server accepts no messages until then. */
function mustVerify() {
  return !state.conversation.property;
}

/** Message text as plain text nodes, with http(s) URLs turned into links. Never innerHTML. */
function textWithLinks(text) {
  const fragment = document.createDocumentFragment();
  let last = 0;
  for (const match of text.matchAll(/https?:\/\/[^\s<>"']+/g)) {
    const url = match[0].replace(/[.,;:!?)\]]+$/, '');
    if (!URL.canParse(url)) continue;
    fragment.append(text.slice(last, match.index));
    const link = el('a', '', url);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    fragment.append(link);
    last = match.index + url.length;
  }
  fragment.append(text.slice(last));
  return fragment;
}

function messageNode(m) {
  const item = el('li', `msg msg-${m.role}${m.kind === 'holding' ? ' msg-holding' : m.kind === 'urgent' ? ' msg-urgent' : ''}`);
  const meta = el('p', 'msg-meta');
  const who = m.role === 'guest' ? t('roleYou') : m.role === 'team' ? t('roleTeam') : t('roleAssistant');
  meta.append(el('span', m.role === 'guest' ? 'visually-hidden' : 'msg-who', who));
  if (m.kind === 'holding') meta.append(el('span', 'msg-status', t('holdingLabel')));
  const time = el('time', '', messageTime(m.at));
  time.dateTime = m.at;
  meta.append(time);
  const bubble = el('p', 'bubble');
  bubble.append(textWithLinks(m.text));
  item.append(meta);
  if (m.text) item.append(bubble);
  const files = filesNode(m);
  if (files) item.append(files);
  // A request to verify carries its own button until the booking is verified.
  if (m.kind === 'verify' && !state.conversation.verified) {
    const verify = el('button', 'btn btn-primary msg-action', t('verifySubmit'));
    verify.type = 'button';
    verify.addEventListener('click', openVerify);
    item.append(verify);
  }
  return item;
}

/** Pictures (tap to enlarge), videos and video links that belong to a message. */
function filesNode(m) {
  if (!m.attachments?.length && !m.links?.length) return null;
  const wrap = el('div', 'msg-files-wrap');
  if (m.attachments?.length) {
    const row = el('div', 'msg-files');
    for (const f of m.attachments) {
      if (f.kind === 'image') {
        const thumb = el('button', 'thumb');
        thumb.type = 'button';
        const img = el('img');
        img.src = f.url;
        img.alt = t('photoAlt');
        img.loading = 'lazy';
        thumb.append(img);
        thumb.addEventListener('click', () => {
          $('viewer-img').src = f.url;
          $('viewer').showModal();
        });
        row.append(thumb);
      } else {
        const video = el('video');
        video.src = f.url;
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        video.setAttribute('aria-label', t('videoLabel'));
        row.append(video);
      }
    }
    wrap.append(row);
  }
  for (const l of m.links || []) {
    if (!/^https:\/\//.test(l.url)) continue;
    const a = el('a', 'msg-link', `${t('watchVideo')}${l.label ? `: ${l.label}` : ''}`);
    a.href = l.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    wrap.append(a);
  }
  return wrap;
}

function outboxNode(entry) {
  const item = el('li', `msg msg-guest msg-${entry.status}`);
  const bubble = el('p', 'bubble', entry.text || t('filesCount', { n: entry.files.length }));
  item.append(el('span', 'visually-hidden', t('roleYou')), bubble);
  if (entry.status === 'sending') {
    item.append(el('p', 'msg-meta', t('sending')));
  } else {
    const failed = el('p', 'msg-failed');
    failed.setAttribute('role', 'alert');
    const retry = el('button', 'link-btn', t('retry'));
    retry.type = 'button';
    retry.addEventListener('click', () => send(entry.text, entry.files, entry));
    failed.append(`${t('notSent')} ${entry.error} `, retry);
    item.append(failed);
  }
  return item;
}

const nodes = new Map(); // render key -> <li>, so unchanged messages keep their DOM node

function renderMessages(forceBottom = false) {
  const scroll = $('scroll');
  const pinned = forceBottom || scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 120;
  const items = [
    ...state.messages.map((m) => ({ key: `m${m.id}${m.kind === 'verify' && state.conversation.verified ? ':done' : ''}`, make: () => messageNode(m) })),
    ...state.outbox.map((entry) => ({ key: `o${entry.localId}:${entry.status}`, make: () => outboxNode(entry) })),
  ];
  const keep = new Set(items.map((item) => item.key));
  for (const [key, node] of nodes) {
    if (!keep.has(key)) {
      node.remove();
      nodes.delete(key);
    }
  }
  const list = $('messages');
  items.forEach((item, index) => {
    if (!nodes.has(item.key)) nodes.set(item.key, item.make());
    const node = nodes.get(item.key);
    if (list.children[index] !== node) list.insertBefore(node, list.children[index] || null);
  });
  $('suggest').hidden = items.length > 0 || mustVerify();
  if (pinned) scrollToBottom();
  return pinned;
}

function scrollToBottom() {
  const scroll = $('scroll');
  scroll.scrollTop = scroll.scrollHeight;
  $('new-pill').hidden = true;
}

function setTyping(on) {
  const scroll = $('scroll');
  const pinned = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 120;
  $('typing').hidden = !on;
  if (on && pinned) scrollToBottom();
}

/** Merge a fresh server list into the screen and announce replies that are new. */
function applyMessages(list) {
  const known = new Set(state.messages.map((m) => m.id));
  const fresh = list.filter((m) => !known.has(m.id));
  // The stream can deliver our own message before the POST returns: drop its outbox twin.
  for (const m of fresh.filter((m) => m.role === 'guest')) {
    const twin = state.outbox.find((entry) => entry.status === 'sending' && entry.text === m.text);
    if (twin) state.outbox = state.outbox.filter((entry) => entry !== twin);
  }
  // Keep anything accepted locally that an older, slower response does not include yet.
  const listed = new Set(list.map((m) => m.id));
  state.messages = [...list, ...state.messages.filter((m) => !listed.has(m.id))];
  const pinned = renderMessages();
  const replies = fresh.filter((m) => m.role !== 'guest');
  if (state.loaded && replies.length) {
    announce(replies.map((m) => `${m.role === 'team' ? t('roleTeam') : t('roleAssistant')}: ${m.text}`).join('\n'));
    if (!pinned) $('new-pill').hidden = false;
    // The assistant has just asked for the booking details: open the form for the guest.
    if (replies.some((m) => m.kind === 'verify') && !state.conversation.verified && !mustVerify() && !$('verify').open) openVerify();
  }
}

// --- Chat: sending -------------------------------------------------------------------------

let localIds = 0;

async function send(text, files = [], retryEntry) {
  const entry = retryEntry || { localId: ++localIds, text, files, status: 'sending', error: '' };
  entry.status = 'sending';
  if (!retryEntry) state.outbox.push(entry);
  renderMessages(true);
  try {
    const { message } = await api('POST', '/messages', { text: entry.text, attachments: entry.files });
    state.outbox = state.outbox.filter((other) => other !== entry);
    if (!state.messages.some((m) => m.id === message.id)) state.messages.push(message);
    renderMessages(true);
  } catch (error) {
    if (sessionGone(error)) return;
    entry.status = 'failed';
    // 400 (too long), 403 (verify first) and 503 (busy) carry a sentence written for the guest.
    entry.error = error.status === 429 ? t('tooFast') : error.status === 0 ? t('offline') : ([400, 403, 503].includes(error.status) && error.message) || t('genericError');
    renderMessages(true);
    if (error.status === 403) refreshAll(); // the chat lost its property: show the verify step
  }
}

function resizeInput() {
  const input = $('input');
  input.style.height = 'auto';
  input.style.height = `${input.scrollHeight + 2}px`; // CSS max-height caps it; +2 for the border
  const max = state.about?.maxMessageLength || 2000;
  const length = input.value.length;
  const ready = state.tray.some((f) => f.status === 'ready');
  const busy = state.tray.some((f) => f.status === 'uploading');
  $('send').disabled = busy || (!input.value.trim() && !ready) || length > max;
  setText($('composer-hint'), length >= max ? t('tooLong', { n: max }) : length > max * 0.9 ? t('charsLeft', { n: max - length }) : state.fileNote || '');
}

function submitComposer(event) {
  event.preventDefault();
  const input = $('input');
  const text = input.value.trim();
  const ready = state.tray.filter((f) => f.status === 'ready');
  if (state.tray.some((f) => f.status === 'uploading')) return;
  if ((!text && !ready.length) || text.length > state.about.maxMessageLength) return;
  input.value = '';
  state.fileNote = '';
  clearTray();
  resizeInput();
  input.focus();
  send(text, ready.map((f) => f.token));
}

// --- Chat: photos and videos ---------------------------------------------------------------

let trayIds = 0;

function clearTray() {
  for (const f of state.tray) if (f.preview) URL.revokeObjectURL(f.preview);
  state.tray = [];
  renderTray();
}

function renderTray() {
  const tray = $('tray');
  tray.replaceChildren(...state.tray.map((f) => {
    const item = el('li');
    if (f.kind === 'image') {
      const img = el('img');
      img.src = f.preview;
      img.alt = t('photoAlt');
      item.append(img);
    } else {
      item.append(el('span', 'tray-video', t('videoLabel')));
    }
    if (f.status === 'uploading') item.append(el('span', 'tray-busy', t('uploading')));
    const remove = el('button', 'tray-remove');
    remove.type = 'button';
    remove.setAttribute('aria-label', t('removeFile'));
    remove.textContent = '\u00d7';
    remove.addEventListener('click', () => {
      if (f.preview) URL.revokeObjectURL(f.preview);
      state.tray = state.tray.filter((other) => other !== f);
      renderTray();
    });
    item.append(remove);
    return item;
  }));
  tray.hidden = state.tray.length === 0;
  $('attach').disabled = state.tray.length >= (state.about?.uploads?.maxFiles || 4);
  resizeInput(); // also refreshes whether Send is available
}

/** Scale a photo down and save it as JPEG, so uploads are quick and every phone format works. */
async function shrinkPhoto(file) {
  let source;
  try {
    source = await createImageBitmap(file);
  } catch {
    source = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
  const width = source.width || source.naturalWidth;
  const height = source.height || source.naturalHeight;
  const scale = Math.min(1, 1600 / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('encode'))), 'image/jpeg', 0.85));
}

function fileProblem(text) {
  state.fileNote = text; // shown under the composer until the next file or message
  resizeInput();
  announce(text);
}

async function addFiles(list) {
  const limits = state.about.uploads || { maxFiles: 4, maxImageBytes: 8388608, maxVideoBytes: 41943040 };
  for (const file of list) {
    if (state.tray.length >= limits.maxFiles) {
      fileProblem(t('tooManyFiles', { n: limits.maxFiles }));
      break;
    }
    const isVideo = file.type.startsWith('video/');
    if (!isVideo && !file.type.startsWith('image/') && !/\.(heic|heif)$/i.test(file.name)) {
      fileProblem(t('fileType'));
      continue;
    }
    if (isVideo && file.size > limits.maxVideoBytes) {
      fileProblem(t('fileTooBig'));
      continue;
    }
    const entry = { id: ++trayIds, kind: isVideo ? 'video' : 'image', preview: '', token: '', status: 'uploading' };
    let body = file;
    if (!isVideo) {
      try {
        body = await shrinkPhoto(file);
      } catch {
        fileProblem(t('fileType'));
        continue;
      }
      entry.preview = URL.createObjectURL(body);
    }
    state.tray.push(entry);
    renderTray();
    try {
      const res = await fetch('/api/guest/uploads', { method: 'POST', headers: { 'Content-Type': body.type || 'application/octet-stream' }, body, credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error(data.error || ''), { status: res.status });
      entry.token = data.file.token;
      entry.status = 'ready';
      state.fileNote = '';
    } catch (error) {
      state.tray = state.tray.filter((other) => other !== entry);
      if (sessionGone(error)) return;
      fileProblem(error.status === 413 ? t('fileTooBig') : error.status === 415 ? t('fileType') : ([403, 429].includes(error.status) && error.message) || t('uploadFailed'));
    }
    renderTray();
  }
}

// --- Chat: live updates --------------------------------------------------------------------
// Server-sent events say "something changed"; we then refetch. A timer covers the gaps: it polls
// while the stream is down and makes a slow safety check while it is up.

let stream = null;
let pollTimer = null;
let streamUp = false;
let statusTimer = null;
let ticks = 0;

async function refreshMessages() {
  try {
    // The whole list, not ?after=<id>: an answer approved by the team keeps the id of its
    // earlier draft, which can be lower than a holding note that is already on screen.
    applyMessages((await api('GET', '/messages')).messages);
  } catch (error) {
    sessionGone(error);
  }
}

async function refreshAll() {
  try {
    const me = await api('GET', '/me');
    state.conversation = me.conversation;
    state.about = me.about;
    renderConversation();
    renderInfo();
    applyMessages(me.messages);
    return true;
  } catch (error) {
    sessionGone(error);
    return false;
  }
}

function showNetStatus() {
  setText($('net-status'), !navigator.onLine ? t('offline') : streamUp ? '' : t('reconnecting'));
}

function setStreamUp(up) {
  streamUp = up;
  clearTimeout(statusTimer);
  // A short grace period so a quick automatic reconnect does not flash a banner.
  if (up || !navigator.onLine) showNetStatus();
  else statusTimer = setTimeout(showNetStatus, 1500);
}

function openStream() {
  stream?.close(); // never two at once: the server caps open streams per chat
  stream = new EventSource('/api/guest/stream');
  stream.addEventListener('open', () => {
    setStreamUp(true);
    refreshAll(); // catch up on anything missed while disconnected
  });
  stream.addEventListener('message', refreshMessages);
  stream.addEventListener('conversation', refreshAll);
  stream.addEventListener('typing', (event) => setTyping(JSON.parse(event.data).on === true));
  stream.addEventListener('error', () => {
    setStreamUp(false);
    setTyping(false);
    if (stream.readyState === EventSource.CLOSED) stream = null; // the browser gave up; the timer reopens it
  });
}

async function tick() {
  if (document.hidden || !state.conversation) return;
  ticks += 1;
  if (streamUp) {
    if (ticks % 6 === 0) refreshMessages();
  } else if (await refreshAll()) {
    if (!stream && state.conversation) openStream();
  }
}

function connect() {
  disconnect();
  openStream();
  pollTimer = setInterval(tick, 5000);
}

function disconnect() {
  stream?.close();
  stream = null;
  streamUp = false;
  clearInterval(pollTimer);
  clearTimeout(statusTimer);
  $('net-status').hidden = true;
}

// --- Dialogs -------------------------------------------------------------------------------

function wireDialogs() {
  for (const dialog of document.querySelectorAll('dialog')) {
    for (const button of dialog.querySelectorAll('[data-close]')) button.addEventListener('click', () => dialog.close());
    // A click on the backdrop lands on the <dialog> element itself.
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
}

function openVerify() {
  $('menu').close();
  setText($('verify-error'), '');
  $('verify').showModal();
  $('verify-name').focus();
}

async function submitVerify(event) {
  event.preventDefault();
  const lastName = $('verify-name').value.trim();
  const arrivalDate = $('verify-date').value;
  if (lastName.length < 2 || !arrivalDate) {
    setText($('verify-error'), t('verifyBad'));
    (lastName.length < 2 ? $('verify-name') : $('verify-date')).focus();
    return;
  }
  const button = $('verify-submit');
  button.disabled = true;
  setText($('verify-error'), '');
  try {
    const { conversation } = await api('POST', '/verify', { lastName, arrivalDate });
    state.conversation = conversation;
    renderConversation();
    renderMessages(); // the "verify" button on earlier messages is no longer needed
    $('verify').close();
    $('verify-form').reset();
    announce($('verified-text').textContent);
    $('input').focus();
  } catch (error) {
    if (sessionGone(error)) return;
    const key = { 404: 'verifyNotFound', 429: 'verifyTooMany', 400: 'verifyBad', 0: 'offline' }[error.status] || 'genericError';
    setText($('verify-error'), t(key));
  } finally {
    button.disabled = false;
  }
}

let confirmAction = null;

/** Ask before a one-way step. `action` runs on confirm; the dialog stays open if it fails. */
function openConfirm({ title, body, okLabel, action }) {
  $('menu').close();
  $('confirm-title').textContent = title;
  $('confirm-body').textContent = body;
  $('confirm-ok').textContent = okLabel;
  setText($('confirm-error'), '');
  confirmAction = action;
  $('confirm').showModal();
}

async function runConfirm() {
  const button = $('confirm-ok');
  button.disabled = true;
  try {
    await confirmAction();
  } catch (error) {
    setText($('confirm-error'), error.status === 0 ? t('offline') : t('genericError'));
  } finally {
    button.disabled = false;
  }
}

/** Delete or leave: end the session on the server, then return to the welcome screen. */
async function closeChat(path, notice) {
  state.closing = true;
  try {
    await api('POST', path, {});
  } catch (error) {
    if (error.status !== 401) throw error; // 401: the session was already gone, which is the goal
  } finally {
    state.closing = false;
  }
  endChat(notice);
}

function confirmDelete() {
  openConfirm({ title: t('deleteTitle'), body: t('deleteBody'), okLabel: t('deleteConfirm'), action: () => closeChat('/erase', t('deleted')) });
}

function confirmLeave() {
  openConfirm({
    title: t('leaveTitle'),
    body: t('leaveBody', { days: state.about.retentionDays }),
    okLabel: t('leaveConfirm'),
    action: () => closeChat('/leave', t('left')),
  });
}

// --- Viewport ------------------------------------------------------------------------------

/** Keep the composer above the on-screen keyboard where the layout viewport does not shrink (iOS). */
function trackViewport() {
  const viewport = window.visualViewport;
  if (!viewport) return;
  const update = () => {
    document.documentElement.style.setProperty('--app-height', `${viewport.height}px`);
    window.scrollTo(0, 0);
  };
  viewport.addEventListener('resize', update);
  viewport.addEventListener('scroll', update);
  update();
}

// --- Start ---------------------------------------------------------------------------------

function wire() {
  $('start').addEventListener('click', startChat);
  $('dead-retry').addEventListener('click', boot);

  $('composer').addEventListener('submit', submitComposer);
  $('input').addEventListener('input', resizeInput);
  $('input').addEventListener('keydown', (event) => {
    // Desktop: Enter sends, Shift+Enter is a newline. Touch keyboards: Enter is a newline.
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing && !touch) {
      event.preventDefault();
      $('composer').requestSubmit();
    }
  });
  $('new-pill').addEventListener('click', scrollToBottom);
  $('scroll').addEventListener('scroll', () => {
    const scroll = $('scroll');
    if (scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 40) $('new-pill').hidden = true;
  });

  $('menu-open').addEventListener('click', () => $('menu').showModal());
  $('attach').addEventListener('click', () => $('file').click());
  $('file').addEventListener('change', (event) => {
    addFiles([...event.target.files]);
    event.target.value = ''; // so the same file can be chosen again
  });
  $('verify-open').addEventListener('click', openVerify);
  $('menu-verify').addEventListener('click', openVerify);
  $('verify-form').addEventListener('submit', submitVerify);
  $('menu-delete').addEventListener('click', confirmDelete);
  $('menu-leave').addEventListener('click', confirmLeave);
  $('confirm-ok').addEventListener('click', runConfirm);
  wireDialogs();

  window.addEventListener('online', () => {
    showNetStatus();
    if (state.conversation) refreshAll();
  });
  window.addEventListener('offline', showNetStatus);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.conversation) refreshAll();
  });
}

translatePage();
renderInfo();
wire();
trackViewport();
boot();

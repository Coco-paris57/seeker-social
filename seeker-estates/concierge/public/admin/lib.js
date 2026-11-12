// Shared helpers for the team app: API client, DOM builder, icons, time formatting,
// toasts, dialogs and a keyed list updater.

// --- API ----------------------------------------------------------------------------------

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status; // 0 means the request never reached the server
  }
}

let unauthorizedHandler = () => {};
/** Called once by the app: what to do when any call says the session has ended. */
export const onUnauthorized = (fn) => { unauthorizedHandler = fn; };

/** Send one request to the team API and read its JSON. Throws ApiError with a sentence that is safe to show. */
async function request(path, init, { quiet401 = false, fallback = {} } = {}) {
  let res;
  try {
    res = await fetch(`/api/admin${path}`, { credentials: 'same-origin', ...init });
  } catch {
    throw new ApiError(0, 'No connection. Check your signal and try again.');
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && !quiet401) unauthorizedHandler();
    throw new ApiError(res.status, data?.error || fallback[res.status] || 'Something went wrong. Please try again.');
  }
  return data;
}

/** Call the team API. Throws ApiError with a sentence that is safe to show. */
export function api(path, { method = 'GET', body, quiet401 = false } = {}) {
  const write = method !== 'GET';
  return request(path, {
    method,
    headers: write ? { 'Content-Type': 'application/json' } : {},
    body: write ? JSON.stringify(body ?? {}) : undefined,
  }, { quiet401 });
}

/**
 * Upload one picture for the knowledge base: the file itself is the request body.
 * Resolves with its `file` ({ token, kind, url }); errors are reported the same way as `api()`.
 */
export async function uploadPicture(blob) {
  const data = await request('/uploads', { method: 'POST', headers: { 'Content-Type': blob.type }, body: blob }, {
    fallback: {
      413: 'This picture is too large. Try a smaller one.',
      415: 'This kind of file cannot be used. Try a JPEG or PNG picture.',
    },
  });
  return data.file;
}

/**
 * Show a failed action to the person. Network failures get a Retry button.
 * A 401 has already sent them to sign-in, so it stays quiet here.
 */
export function showError(err, retry) {
  if (err instanceof ApiError && err.status === 401) return;
  if (!(err instanceof ApiError)) console.error(err);
  const message = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
  toast(message, { kind: 'error', action: retry && err.status === 0 ? { label: 'Retry', onClick: retry } : null });
}

// --- DOM ----------------------------------------------------------------------------------

/**
 * Build an element. Props: `class`, `dataset`, `on<event>` listeners, DOM properties
 * (value, checked, hidden...) and anything else as an attribute. Children are nodes or
 * strings; strings always become text nodes, so guest text can never be parsed as HTML.
 */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props || {})) {
    if (value == null || value === false) continue;
    if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key.startsWith('on')) el.addEventListener(key.slice(2), value);
    else if (key in el && !key.startsWith('aria')) el[key] = value;
    else el.setAttribute(key, value === true ? '' : value);
  }
  return add(el, ...children);
}

/** Append children, skipping null and false (so `condition && node` is safe). */
export function add(el, ...children) {
  el.append(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

/** Replace everything inside an element. */
export function fill(el, ...children) {
  el.replaceChildren(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

let idCounter = 0;
export const uid = (prefix = 'id') => `${prefix}-${++idCounter}`;

// Icon outlines (24px grid, 2px stroke), adapted from the Feather set (MIT licence).
const ICONS = {
  inbox: ['M22 12h-6l-2 3h-4l-2-3H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z'],
  chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  home: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
  book: ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'],
  sliders: ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6'],
  check: ['M20 6 9 17l-5-5'],
  x: ['M18 6 6 18', 'M6 6l12 12'],
  alert: ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  help: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
  lock: ['M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  back: ['M19 12H5', 'M12 19l-7-7 7-7'],
  chevron: ['M6 9l6 6 6-6'],
  search: ['M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z', 'M21 21l-4.35-4.35'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  copy: ['M11 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
  print: ['M6 9V2h12v7', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v8H6z'],
  refresh: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'],
  trash: ['M3 6h18', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
  edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z'],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
  send: ['M22 2 11 13', 'M22 2l-7 20-4-9-9-4z'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  external: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'],
  plus: ['M12 5v14', 'M5 12h14'],
  bolt: ['M13 2 3 14h9l-1 8 10-12h-9z'],
  eye: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'],
  user: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  bookmark: ['M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  clock: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'],
  bot: ['M12 8V4H8', 'M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z', 'M2 14h2', 'M20 14h2', 'M15 13v2', 'M9 13v2'],
  info: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 16v-4', 'M12 8h.01'],
  image: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z', 'M21 15l-5-5L5 21'],
  video: ['M23 7l-7 5 7 5z', 'M3 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z'],
};

/** A decorative inline SVG icon. Always pair it with visible or visually-hidden text. */
export function icon(name, size = 20) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  for (const [k, v] of Object.entries({ viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', class: 'icon' })) svg.setAttribute(k, v);
  for (const d of ICONS[name]) {
    const path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    svg.append(path);
  }
  return svg;
}

/** Small labelled pill. `tone`: neutral, ok, warn, danger, brand. Icon plus text, never colour alone. */
export const chip = (text, { tone = 'neutral', icon: iconName } = {}) =>
  h('span', { class: `chip chip-${tone}` }, iconName && icon(iconName, 14), text);

/** Button with an optional leading icon. `variant`: primary, secondary, ghost, danger. */
export function button(label, { variant = 'secondary', icon: iconName, type = 'button', onclick, small = false, ...rest } = {}) {
  return h('button', { type, class: `btn btn-${variant}${small ? ' btn-small' : ''}`, onclick, ...rest }, iconName && icon(iconName, 18), h('span', null, label));
}

/** Run an async action while its button is disabled, so a double tap cannot send twice. */
export async function busy(btn, fn) {
  if (btn.disabled) return undefined;
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
  try {
    return await fn();
  } finally {
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
  }
}

/** Label + control + optional hint, wired together for assistive technology. */
export function field(label, control, { hint } = {}) {
  control.id ||= uid('f');
  const hintEl = hint && h('p', { class: 'hint', id: `${control.id}-hint` }, hint);
  if (hintEl) control.setAttribute('aria-describedby', hintEl.id);
  return h('div', { class: 'field' }, h('label', { htmlFor: control.id }, label), control, hintEl);
}

/** Checkbox or switch with its label. */
export function check(label, { checked = false, onchange, switchStyle = false, ...rest } = {}) {
  const input = h('input', { type: 'checkbox', checked, onchange, role: switchStyle ? 'switch' : null, ...rest });
  const wrap = h('label', { class: switchStyle ? 'check switch' : 'check' }, input, h('span', null, label));
  return { wrap, input };
}

/** Text area that grows with its content. */
export function autoGrow(textarea) {
  const fit = () => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  };
  textarea.addEventListener('input', fit);
  requestAnimationFrame(fit); // once it is in the document and has a width
  return textarea;
}

/**
 * Update a keyed list in place. Nodes whose item has not changed are kept, together with
 * anything the person has typed in them; this is what makes live refreshes safe.
 */
export function reconcile(container, items, { key, signature, create }) {
  const old = new Map([...container.children].map((el) => [el.dataset.key, el]));
  let prev = null;
  for (const item of items) {
    const k = String(key(item));
    const sig = signature(item);
    let el = old.get(k);
    old.delete(k);
    if (!el || el.dataset.sig !== sig) {
      const fresh = create(item);
      fresh.dataset.key = k;
      fresh.dataset.sig = sig;
      if (el) el.replaceWith(fresh);
      el = fresh;
    }
    const expected = prev ? prev.nextSibling : container.firstChild;
    if (el !== expected) container.insertBefore(el, expected);
    prev = el;
  }
  for (const el of old.values()) el.remove();
}

// --- time ---------------------------------------------------------------------------------

const dateTimeFmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });
const timeFmt = new Intl.DateTimeFormat(undefined, { timeStyle: 'short' });
const dayFmt = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' });
const stayFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });

/** "just now", "4 min ago", "3 h ago", "Yesterday 14:05", then a date. */
export function relativeTime(isoString) {
  const then = new Date(isoString);
  const minutes = Math.floor((Date.now() - then.getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)} h ago`;
  if (minutes < 48 * 60) return `Yesterday ${timeFmt.format(then)}`;
  return `${dayFmt.format(then)}, ${timeFmt.format(then)}`;
}

/** <time> showing a relative time; the app refreshes every `time[data-rel]` each half minute. */
export function timeEl(isoString) {
  if (!isoString) return null;
  return h('time', { dateTime: isoString, title: dateTimeFmt.format(new Date(isoString)), dataset: { rel: '1' } }, relativeTime(isoString));
}

export function refreshTimes() {
  for (const el of document.querySelectorAll('time[data-rel]')) el.textContent = relativeTime(el.dateTime);
}

export const fullTime = (isoString) => dateTimeFmt.format(new Date(isoString));
/** A calendar date ('YYYY-MM-DD') in the viewer's language, without time-zone drift. */
export const stayDate = (ymd) => stayFmt.format(new Date(`${ymd}T00:00:00Z`));

// --- toasts -------------------------------------------------------------------------------

/**
 * Where toasts go. A modal dialog covers the page and makes it inert, so while one is open
 * its toasts live inside it; they move to the page when it closes.
 */
function toastRegion() {
  const dialog = document.querySelector('dialog[open]');
  if (!dialog) return document.getElementById('toasts');
  return dialog.querySelector('.dialog-toasts') || dialog.appendChild(h('div', { class: 'dialog-toasts', 'aria-live': 'polite' }));
}

/**
 * Brief message at the edge of the screen, announced to screen readers.
 * kind: info, ok, error, urgent. `action`: { label, onClick }. Every toast can be dismissed
 * and none stays for good: on a phone a parked toast would cover the controls below it.
 */
export function toast(message, { kind = 'info', title, action } = {}) {
  const region = toastRegion();
  const el = h('div', { class: `toast toast-${kind}`, role: kind === 'error' || kind === 'urgent' ? 'alert' : null });
  const close = () => el.remove();
  add(el,
    icon({ ok: 'check', error: 'alert', urgent: 'alert', info: 'info' }[kind], 20),
    h('div', { class: 'toast-text' }, title && h('strong', null, title), h('span', null, message)),
    action && h('button', { type: 'button', class: 'toast-action', onclick: () => { close(); action.onClick(); } }, action.label),
    h('button', { type: 'button', class: 'toast-close', 'aria-label': 'Dismiss', onclick: close }, icon('x', 18)),
  );
  region.append(el);
  while (region.children.length > 3) region.firstChild.remove();
  setTimeout(close, { urgent: 12000, error: 8000 }[kind] || (action ? 7000 : 3500));
}

// --- dialogs ------------------------------------------------------------------------------

/**
 * Modal dialog built on <dialog>: focus is trapped by the browser, Escape closes, and focus
 * returns to the control that opened it. `build(close)` returns the body nodes.
 * Resolves with whatever `close(value)` was given (undefined when dismissed).
 */
export function openDialog({ title, build, wide = false }) {
  return new Promise((resolve) => {
    const opener = document.activeElement;
    const titleId = uid('dlg');
    let result;
    const dialog = h('dialog', { class: wide ? 'dialog dialog-wide' : 'dialog', 'aria-labelledby': titleId });
    const close = (value) => {
      result = value;
      dialog.close();
    };
    dialog.append(
      h('div', { class: 'dialog-head' },
        h('h2', { id: titleId }, title),
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Close', onclick: () => close() }, icon('x'))),
      h('div', { class: 'dialog-body' }, build(close)),
    );
    dialog.addEventListener('close', () => {
      document.getElementById('toasts').append(...dialog.querySelectorAll('.toast'));
      dialog.remove();
      if (opener?.isConnected) opener.focus();
      resolve(result);
    });
    document.body.append(dialog);
    dialog.showModal();
  });
}

/** Ask before a destructive or significant action. Resolves true only on confirm. */
export function confirmDialog({ title, message, details, confirmLabel, danger = false }) {
  return openDialog({
    title,
    build: (close) => [
      h('p', null, message),
      details,
      h('div', { class: 'dialog-actions' },
        button('Cancel', { onclick: () => close(false), autofocus: true }),
        button(confirmLabel, { variant: danger ? 'danger' : 'primary', onclick: () => close(true) })),
    ],
  }).then((v) => v === true);
}

// --- pictures and videos ------------------------------------------------------------------

/** Show one picture larger, in a dialog. `src` is a file's url (or a local preview). */
export function openPicture(src, label) {
  return openDialog({
    title: label,
    wide: true,
    build: () => [h('img', { class: 'picture-large', src, alt: label })],
  });
}

/** Only ever link to a web address, whatever was stored. */
const safeLink = (url) => /^https?:\/\//i.test(String(url || ''));

/**
 * Pictures and videos of a message, request or knowledge entry, plus its video links.
 * `files` are `{ token, kind, url }`. Pictures are fixed-size thumbnails that open larger;
 * videos play in place. `label` is the alt text ("Photo from the guest"), `caption` an
 * optional line above, `small` gives the compact size used in lists. Returns null when
 * there is nothing to show.
 */
export function attachmentsView(files, { links, label = 'Photo from the guest', videoLabel = 'Video from the guest', caption, small = false } = {}) {
  const shown = (files || []).filter((f) => f?.url);
  const webLinks = (links || []).filter((l) => safeLink(l?.url));
  if (!shown.length && !webLinks.length) return null;
  const pictures = shown.filter((f) => f.kind !== 'video').length;
  let n = 0;
  const item = (f) => {
    if (f.kind === 'video') return h('li', null, h('video', { class: 'attach-video', src: f.url, controls: true, preload: 'metadata', playsInline: true, 'aria-label': videoLabel }));
    const alt = pictures > 1 ? `${label} ${++n}` : label;
    const size = small ? 64 : 96;
    const img = h('img', { src: f.url, alt, loading: 'lazy', decoding: 'async', width: size, height: size });
    const thumb = h('button', { type: 'button', class: 'attach-thumb', 'aria-label': `${alt}, open larger`, onclick: () => openPicture(f.url, alt) }, img);
    // The file may have been removed since (a picture taken off its knowledge entry, an erased chat).
    img.addEventListener('error', () => {
      thumb.disabled = true;
      thumb.classList.add('attach-missing');
      thumb.setAttribute('aria-label', `${alt}: no longer available`);
      fill(thumb, icon('image', 24));
    });
    return h('li', null, thumb);
  };
  return h('div', { class: small ? 'attachments attachments-small' : 'attachments' },
    caption && h('p', { class: 'label' }, caption),
    shown.length ? h('ul', { class: 'attach-list' }, shown.map(item)) : null,
    webLinks.map((l) => h('a', { class: 'attach-link', href: l.url, target: '_blank', rel: 'noopener noreferrer' },
      icon('video', 16), h('span', null, l.label ? `Watch the video: ${l.label}` : 'Watch the video'), h('span', { class: 'visually-hidden' }, ' (opens in a new tab)'))));
}

// --- shared wording -----------------------------------------------------------------------

export const CATEGORY_LABELS = {
  checkin: 'Check-in', access: 'Access and keys', wifi: 'WiFi', appliances: 'Appliances', transport: 'Transport',
  local: 'Local area', rules: 'House rules', checkout: 'Checkout', booking: 'Booking', maintenance: 'Maintenance', other: 'Other',
};
export const categoryLabel = (c) => CATEGORY_LABELS[c] || c;

export const TICKET_TYPES = {
  urgent: { label: 'Urgent', icon: 'alert', tone: 'danger' },
  maintenance: { label: 'Maintenance', icon: 'wrench', tone: 'warn' },
  question: { label: 'Question', icon: 'help', tone: 'brand' },
};

export const guestLabel = (name) => name || 'Unverified guest';

/** Standard page heading with optional back link and actions. */
export function pageHeader(title, { back, actions = [], sub } = {}) {
  return h('header', { class: 'page-head' },
    back && h('a', { class: 'back-link', href: back.href }, icon('back', 18), back.label),
    h('div', { class: 'page-head-row' },
      h('div', null, h('h1', { tabIndex: -1 }, title), sub && h('p', { class: 'page-sub' }, sub)),
      actions.length ? h('div', { class: 'page-actions' }, actions) : null),
  );
}

export const loading = (text = 'Loading') => h('p', { class: 'loading', role: 'status' }, `${text}…`);

/** Shown when a screen could not load, with a way to try again. */
export const loadError = (err, retry) =>
  h('div', { class: 'empty', role: 'alert' }, icon('alert', 28), h('p', null, err.message || 'This could not be loaded.'), button('Try again', { icon: 'refresh', onclick: retry }));

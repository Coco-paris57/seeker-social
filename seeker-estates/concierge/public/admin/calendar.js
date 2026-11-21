// Calendar: every property as a row and every day as a column, like the Smoobu calendar, with
// what the team needs on top: mood, check-in form, unread messages, extras, free gaps worth
// selling, same-day turnovers, and the messages proposed for each stay. Read-only: bookings are
// made and changed in Smoobu.
import { api, busy, button, chip, fill, fullTime, guestLabel, h, icon, loadError, loading, MOODS, moodChip, openDialog, pageHeader, showError, stayDate, toast } from './lib.js';
import { messageCard, reviewCard } from './planner.js';
import { careSection } from './care.js';

const DAY_MS = 86400_000;
const ymd = (d) => d.toISOString().slice(0, 10);
const addDays = (date, n) => ymd(new Date(Date.parse(`${date}T12:00:00Z`) + n * DAY_MS));
const diff = (a, b) => Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / DAY_MS);
const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const dateOf = (s) => new Date(`${s}T12:00:00Z`);
const channelClass = (c) => (/airbnb/i.test(c || '') ? 'ch-airbnb' : /direct|website|homepage|smoobu|manual/i.test(c || '') ? 'ch-direct' : /booking/i.test(c || '') ? 'ch-booking' : /vrbo|expedia|homeaway/i.test(c || '') ? 'ch-vrbo' : c && !/direct|website|smoobu|manual/i.test(c) ? 'ch-other' : 'ch-direct');
const guests = (r) => [r.adults && `${r.adults} ${r.adults === 1 ? 'adult' : 'adults'}`, r.children ? `${r.children} ${r.children === 1 ? 'child' : 'children'}` : null].filter(Boolean).join(', ');

/** The small signs on a booking: mood, check-in form, unread, an extra bought, a message waiting. */
function signs(r, size = 14) {
  return [
    MOODS[r.mood] && h('span', { class: `sign sign-${r.mood}`, title: `Mood: ${MOODS[r.mood].label}` }, icon(MOODS[r.mood].icon, size)),
    r.hasCheckinLink && h('span', { class: r.checkinCompleted ? 'sign sign-ok' : 'sign sign-wait', title: r.checkinCompleted ? 'Check-in form completed' : 'Check-in form not completed' }, icon(r.checkinCompleted ? 'check' : 'clock', size)),
    r.extras.length > 0 && h('span', { class: 'sign sign-extra', title: `Extras: ${r.extras.map((x) => x.title).join(', ')}` }, icon('plus', size)),
    r.tasks.length > 0 && h('span', { class: 'sign sign-task', title: r.tasks.some((t) => t.status === 'suggested') ? 'A suggested message is waiting' : 'A message is scheduled' }, icon('send', size)),
    r.unread && h('span', { class: 'sign sign-unread', title: 'Unread message' }),
  ];
}

// On a computer the guest card is pinned beside the calendar, which stays usable; the calendar
// screen sets this while it is open. On a phone the card opens as a window.
let pinned = null;
let selectedId = null;

/** The guest card: the stay, what can be offered, proposed messages, and the message thread. */
async function openCard(id, onChange) {
  let d;
  try {
    d = await api(`/reservations/${id}`);
  } catch (err) {
    showError(err);
    return;
  }
  const r = d.reservation;
  const host = pinned || ((opts) => openDialog({ ...opts, wide: true }));
  await host({
    title: r.guestName,
    id,
    build: (close) => {
      // After an action the card is drawn again in place, so the panel beside the calendar does not jump.
      const again = () => { if (!pinned) close(); onChange(); openCard(id, onChange); };
      const act = (p, message) => p.then(() => { toast(message, { kind: 'ok' }); again(); }, showError);
      const row = (label, value) => value && h('div', null, h('dt', null, label), h('dd', null, value));
      return h('div', { class: 'guest-card' },
        h('div', { class: 'chips' },
          chip(r.channel || 'Direct', { icon: 'bookmark' }),
          moodChip(r.mood),
          r.hasCheckinLink ? (r.checkinCompleted ? chip('Check-in form completed', { tone: 'ok', icon: 'check' }) : chip('Check-in form not completed', { tone: 'warn', icon: 'clock' })) : chip('No check-in link yet', { icon: 'help' }),
          r.unread && chip('Unread message', { tone: 'warn', icon: 'chat' })),
        h('dl', { class: 'facts' },
          row('Property', r.propertyName),
          row('Stay', `${stayDate(r.arrival)} to ${stayDate(r.departure)} · ${r.nights} ${r.nights === 1 ? 'night' : 'nights'}`),
          row('Check-in / checkout', [r.checkIn, r.checkOut].filter(Boolean).join(' / ')),
          row('Guests', guests(r)),
          row('Extras bought', r.extras.length ? r.extras.map((x) => `${x.title} (${x.status})`).join(', ') : null),
          row('Can be offered', d.offers.length ? d.offers.map((o) => `${o.extra}${o.price ? ` ${o.price}` : ''}${o.possible ? '' : ' (not free for these dates)'}`).join(' · ') : 'No extras are switched on (Settings, Paid extras)')),
        d.conversation?.summary && h('p', { class: 'chat-summary' }, h('strong', null, 'Where this stands: '), d.conversation.summary),
        careSection(d.care, { after: again }),
        h('h3', null, 'Messages to send'),
        d.tasks.length
          ? d.tasks.map((t) => (t.kind === 'review' ? reviewCard(t, { done: (m) => { toast(m, { kind: 'ok' }); again(); }, fail: showError }) : t.status === 'scheduled'
            ? h('div', { class: 'card todo-card' }, h('p', null, icon('clock', 16), ` ${t.label} · scheduled for ${fullTime(t.at)}`), h('p', { class: 'pre muted' }, t.text),
              h('div', { class: 'actions' }, button('Cancel', { small: true, icon: 'x', onclick: (e) => busy(e.currentTarget, () => act(api(`/tasks/${t.id}`, { method: 'DELETE', body: {} }), 'Cancelled')) })))
            : messageCard({
              tone: t.kind === 'happy' ? 'ok' : 'brand', iconName: t.kind === 'happy' ? 'smile' : 'plus', title: t.label, who: '', why: t.why, note: t.note, text: t.text, at: t.at,
              save: (text, at) => act(api(`/tasks/${t.id}/schedule`, { method: 'POST', body: { text, at } }), `Scheduled for ${fullTime(at)}`),
              drop: () => act(api(`/tasks/${t.id}`, { method: 'DELETE', body: {} }), 'Dismissed'),
            })))
          : h('p', { class: 'muted' }, 'Nothing suggested for this stay right now.'),
        h('h3', null, 'Messages'),
        d.messages.length
          ? h('ol', { class: 'mini-thread' }, d.messages.map((m) => h('li', { class: `mini-msg mini-${m.role}` },
            h('span', { class: 'mini-who' }, m.role === 'guest' ? 'Guest' : m.role === 'team' ? 'Team' : 'Assistant', ' · ', fullTime(m.sentAt || m.at)),
            h('p', { class: 'pre' }, m.text))))
          : h('p', { class: 'muted' }, 'No messages with this guest yet.'),
        h('div', { class: 'actions' },
          d.conversation && h('a', { class: 'btn btn-primary', href: `#/conversations/${d.conversation.id}`, onclick: () => close() }, icon('chat', 18), h('span', null, 'Open the conversation')),
          button('Close', { onclick: () => close() })));
    },
  });
}

/** A free gap between two stays: offer it to the guest on either side. */
function openGap(g, byId, propertyName, onChange) {
  const before = byId.get(g.beforeId);
  const after = byId.get(g.afterId);
  openDialog({
    title: `${g.nights} free ${g.nights === 1 ? 'night' : 'nights'}`,
    build: (close) => {
      const offer = (r, type, label) => r && button(label, { icon: 'plus', onclick: (e) => busy(e.currentTarget, async () => {
        try {
          await api(`/reservations/${r.id}/tasks`, { method: 'POST', body: { type } });
          toast('Added to the to-do list. Review and schedule it.', { kind: 'ok' });
          close();
          onChange();
          openCard(r.id, onChange);
        } catch (err) {
          showError(err);
        }
      }) });
      return h('div', { class: 'stack' },
        h('p', null, `${propertyName} is free from ${stayDate(g.from)} to ${stayDate(g.to)}. Short gaps rarely get booked on their own, so they are worth offering to the guests either side.`),
        offer(before, 'upsell_night', `Offer an extra night to ${before?.guestName}`),
        offer(after, 'upsell_before', `Offer ${after?.guestName} arriving a night earlier`),
        !before && !after && h('p', { class: 'muted' }, 'The stays either side are owner blocks, so there is nobody to offer it to.'),
        h('p', { class: 'hint' }, 'This adds a suggested message to the to-do list. Nothing is sent until you schedule it.'));
    },
  });
}

export function calendarView() {
  const today = ymd(new Date());
  let from = addDays(today, -1);
  let propertyId = '';
  const range = h('select', { 'aria-label': 'View' }, h('option', { value: '14', selected: true }, '2 weeks'), h('option', { value: '31' }, 'Month'));
  const picker = h('select', { 'aria-label': 'Property' }, h('option', { value: '' }, 'All properties'));
  const prev = button('Earlier', { icon: 'back', small: true });
  const next = button('Later', { small: true });
  const now = button('Today', { small: true });
  const label = h('strong', { class: 'cal-label' });
  const body = h('div', null, loading('Loading the calendar'));
  // On a phone: a day-by-day agenda instead of a grid that scrolls sideways, or one property's month.
  const narrow = innerWidth < 900;
  let mode = 'agenda';
  const tabAgenda = h('button', { type: 'button', role: 'tab', 'aria-selected': 'true' }, 'Agenda');
  const tabProperty = h('button', { type: 'button', role: 'tab', 'aria-selected': 'false' }, 'By property');
  const modeTabs = h('div', { class: 'seg', role: 'tablist', 'aria-label': 'Calendar view' }, tabAgenda, tabProperty);
  const side = h('aside', { class: 'card cal-side', 'aria-label': 'Guest card', hidden: true });
  const layout = h('div', { class: 'cal-layout' }, body, side);
  side.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSide(); });
  const bar = h('div', { class: 'cal-bar' }, h('div', { class: 'actions' }, prev, now, next, label), h('div', { class: 'actions' }, picker, range));
  const el = h('div', { class: 'page page-wide' },
    pageHeader('Calendar', { sub: narrow ? 'Bookings come from Smoobu. Tap a guest for their stay and messages.' : 'Bookings come from Smoobu and are changed there. Tap a booking for the guest, their messages and what to offer.' }),
    narrow && modeTabs, bar, layout);
  if (narrow) pinned = null;
  else {
    pinned = ({ title, id, build }) => {
      selectedId = id;
      fill(side,
        h('div', { class: 'cal-side-head' }, h('h2', { tabIndex: -1 }, title), h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Close the guest card', onclick: closeSide }, icon('x'))),
        build(closeSide));
      side.hidden = false;
      layout.classList.add('has-side');
      side.scrollTop = 0;
      markSelected();
      return Promise.resolve();
    };
  }
  let filled = false;
  function markSelected() {
    for (const b of el.querySelectorAll('[data-booking]')) b.classList.toggle('is-selected', Number(b.dataset.booking) === selectedId);
  }
  function closeSide() {
    const was = selectedId;
    selectedId = null;
    side.hidden = true;
    layout.classList.remove('has-side');
    fill(side);
    markSelected();
    el.querySelector(`[data-booking="${was}"]`)?.focus(); // back to the booking it came from
  }
  const setMode = (next) => {
    mode = next;
    tabAgenda.setAttribute('aria-selected', String(mode === 'agenda'));
    tabProperty.setAttribute('aria-selected', String(mode === 'property'));
    load();
  };
  tabAgenda.addEventListener('click', () => setMode('agenda'));
  tabProperty.addEventListener('click', () => setMode('property'));

  /** The next two weeks as a list: who arrives, who leaves, and what to watch, day by day. */
  function agenda(d, byId, open) {
    const nameOf = (id) => d.properties.find((p) => p.id === id)?.name || 'Property';
    const days = Array.from({ length: d.days }, (_, i) => addDays(d.from, i)).map((day) => {
      const ins = d.reservations.filter((r) => r.arrival === day);
      const outs = d.reservations.filter((r) => r.departure === day);
      const gaps = d.gaps.filter((g) => g.from === day);
      if (!ins.length && !outs.length && !gaps.length) return null;
      const item = (r, isIn) => {
        const turnover = isIn ? d.reservations.some((o) => o.propertyId === r.propertyId && o.departure === day) : d.reservations.some((o) => o.propertyId === r.propertyId && o.arrival === day);
        return h('li', null, h('button', { type: 'button', class: `agenda-item ${isIn ? 'is-in' : 'is-out'} ${channelClass(r.channel)}-edge`, onclick: () => open(r.id) },
          h('span', { class: 'agenda-text' }, h('strong', null, `${isIn ? 'In' : 'Out'} · ${r.guestName}`),
            h('small', null, [nameOf(r.propertyId), isIn ? ` · ${r.nights} ${r.nights === 1 ? 'night' : 'nights'}` : '', r.channel ? ` · ${r.channel}` : ''])),
          h('span', { class: 'agenda-flags' },
            isIn && r.hasCheckinLink && !r.checkinCompleted && chip('Form', { tone: 'warn', icon: 'clock' }),
            turnover && chip('Turnover', { tone: 'warn', icon: 'refresh' }),
            h('span', { class: 'signs' }, signs({ ...r, hasCheckinLink: false }, 16)))));
      };
      return h('section', { class: 'agenda-day' },
        h('h2', null, day === d.today ? `Today · ${stayDate(day)}` : stayDate(day)),
        h('ul', null, outs.map((r) => item(r, false)), ins.map((r) => item(r, true)),
          gaps.map((g) => h('li', null, h('button', { type: 'button', class: 'agenda-gap', onclick: () => openGap(g, byId, nameOf(g.propertyId), load) }, `${nameOf(g.propertyId)} · ${g.nights} free ${g.nights === 1 ? 'night' : 'nights'} · offer ${g.nights === 1 ? 'it' : 'them'}`)))));
    }).filter(Boolean);
    return days.length ? h('div', { class: 'agenda' }, days) : h('div', { class: 'card section empty' }, h('p', { class: 'muted' }, 'No arrivals or departures in the next two weeks.'));
  }

  async function load() {
    if (narrow && mode === 'agenda') {
      bar.hidden = true;
      let d;
      try {
        d = await api(`/calendar?from=${today}&days=14`);
      } catch (err) {
        if (err.status !== 401) fill(body, loadError(err, load));
        return;
      }
      if (!filled) { filled = true; picker.append(...d.properties.map((p) => h('option', { value: String(p.id) }, p.name))); }
      return fill(body, agenda(d, new Map(d.reservations.map((r) => [r.id, r])), (id) => openCard(id, load)));
    }
    bar.hidden = false;
    if (narrow && !propertyId && picker.options.length > 1) { picker.selectedIndex = 1; propertyId = picker.value; } // a phone shows one property at a time
    const single = !!propertyId;
    const days = single ? 42 : Number(range.value);
    // One property: whole weeks from the Monday on or before the start, so it reads as a month sheet.
    const start = single ? addDays(from, -((dateOf(from).getUTCDay() + 6) % 7)) : from;
    let d;
    try {
      d = await api(`/calendar?from=${start}&days=${days}`);
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    if (!filled) {
      filled = true;
      picker.append(...d.properties.map((p) => h('option', { value: String(p.id) }, p.name)));
    }
    range.disabled = single;
    label.textContent = `${stayDate(d.from)} to ${stayDate(addDays(d.from, d.days - 1))}`;
    const byId = new Map(d.reservations.map((r) => [r.id, r]));
    for (const r of [...d.todayPanel.arrivals, ...d.todayPanel.departures, ...d.todayPanel.inHouse]) if (!byId.has(r.id)) byId.set(r.id, r);
    const nameOf = (id) => d.properties.find((p) => p.id === id)?.name || 'Property';
    const open = (id) => openCard(id, load);
    const person = (r) => h('li', null, h('button', { type: 'button', class: 'today-guest', onclick: () => open(r.id) },
      h('span', { class: `dot ${channelClass(r.channel)}` }), h('span', { class: 'today-name' }, h('strong', null, r.guestName), h('span', { class: 'muted' }, nameOf(r.propertyId))), h('span', { class: 'signs' }, signs(r, 16))));
    const group = (title, list, none) => h('div', { class: 'today-col' }, h('h3', null, `${title} (${list.length})`), list.length ? h('ul', null, list.map(person)) : h('p', { class: 'muted' }, none));
    fill(body,
      !narrow && h('section', { class: 'card today-panel' },
        group('Arriving today', d.todayPanel.arrivals, 'Nobody arrives today.'),
        group('Leaving today', d.todayPanel.departures, 'Nobody leaves today.'),
        group('In the apartments', d.todayPanel.inHouse, 'No guests staying over.')),
      single ? sheet(d, d.properties.find((p) => String(p.id) === propertyId), byId, open) : timeline(d, byId, open),
      legend());
  }

  /** All properties: one row each, days across. A stay runs from the afternoon of arrival to the morning of departure. */
  function timeline(d, byId, open) {
    const W = d.days <= 14 ? 64 : 40;
    const dayList = Array.from({ length: d.days }, (_, i) => addDays(d.from, i));
    const x = (date) => (diff(d.from, date) + 0.5) * W;
    const width = d.days * W;
    const clamp = (left, right) => ({ left: Math.max(0, left), width: Math.min(width, right) - Math.max(0, left) });
    const place = (node, left, right) => { const c = clamp(left, right); if (c.width <= 2) return null; node.style.left = `${c.left}px`; node.style.width = `${c.width - 2}px`; return node; };
    const head = h('div', { class: 'cal-row cal-head' }, h('div', { class: 'cal-name' }, 'Property'),
      h('div', { class: 'cal-days' }, dayList.map((day) => {
        const cell = h('div', { class: `cal-day${day === d.today ? ' is-today' : ''}${[0, 6].includes(dateOf(day).getUTCDay()) ? ' is-weekend' : ''}` }, h('span', null, weekday.format(dateOf(day))), h('strong', null, String(dateOf(day).getUTCDate())));
        cell.style.width = `${W}px`;
        return cell;
      })));
    const rows = d.properties.map((p) => {
      const track = h('div', { class: 'cal-track' });
      track.style.width = `${width}px`;
      track.style.backgroundSize = `${W}px 100%`;
      if (d.today >= d.from && diff(d.from, d.today) < d.days) {
        const t = h('div', { class: 'cal-today' }); t.style.left = `${diff(d.from, d.today) * W}px`; t.style.width = `${W}px`; track.append(t);
        // Where we are in the day.
        const nowAt = new Date(); const line = h('div', { class: 'cal-now', title: 'Now' });
        line.style.left = `${(diff(d.from, d.today) + (nowAt.getHours() * 60 + nowAt.getMinutes()) / 1440) * W}px`; track.append(line);
      }
      const mine = d.reservations.filter((r) => r.propertyId === p.id);
      for (const b of d.blocks.filter((k) => k.propertyId === p.id)) { const n = place(h('div', { class: 'cal-block', title: 'Blocked by the owner' }, 'Blocked'), x(b.arrival), x(b.departure)); if (n) track.append(n); }
      for (const g of d.gaps.filter((k) => k.propertyId === p.id)) {
        const n = place(h('button', { type: 'button', class: 'cal-gap', title: 'Free nights between two stays: tap to offer them', onclick: () => openGap(g, byId, p.name, load) }, `${g.nights} free`), x(g.from), x(g.to));
        if (n) track.append(n);
      }
      for (const r of mine) {
        const n = place(h('button', { type: 'button', class: `cal-booking ${channelClass(r.channel)}${r.id === selectedId ? ' is-selected' : ''}`, dataset: { booking: r.id }, 'aria-label': `${r.guestName}, ${stayDate(r.arrival)} to ${stayDate(r.departure)}`, onclick: () => open(r.id) },
          h('span', { class: 'cal-guest' }, r.guestName), h('span', { class: 'signs' }, signs(r))), x(r.arrival), x(r.departure));
        if (n) track.append(n);
        // The day a suggested or scheduled message is due.
        for (const t of r.tasks) {
          const day = ymd(new Date(t.at));
          if (day < d.from || diff(d.from, day) >= d.days) continue;
          const m = h('span', { class: `cal-due${t.status === 'scheduled' ? ' is-scheduled' : ''}`, title: `${t.status === 'scheduled' ? 'Message scheduled' : 'Suggested message'} for ${r.guestName}: ${fullTime(t.at)}` }, icon('send', 11));
          m.style.left = `${diff(d.from, day) * W + W / 2 - 8}px`;
          track.append(m);
        }
        // One guest out, another in on the same day.
        if (mine.some((o) => o.id !== r.id && o.arrival === r.departure) && r.departure >= d.from && diff(d.from, r.departure) < d.days) {
          const m = h('span', { class: 'cal-turn', title: 'Same-day turnover: no late checkout for the guest leaving, no early check-in for the guest arriving' }, icon('refresh', 11));
          m.style.left = `${x(r.departure) - 9}px`;
          track.append(m);
        }
      }
      return h('div', { class: 'cal-row' }, h('div', { class: 'cal-name' }, h('a', { href: `#/properties/${p.id}` }, p.name)), track);
    });
    return h('div', { class: 'card cal-scroll', tabIndex: 0, 'aria-label': 'Calendar, scrolls sideways' }, h('div', { class: 'cal-grid' }, head, rows));
  }

  /** One property: a month sheet, a week per line. */
  function sheet(d, property, byId, open) {
    if (!property) return h('p', { class: 'muted' }, 'That property is not active.');
    const mine = d.reservations.filter((r) => r.propertyId === property.id);
    const cells = Array.from({ length: d.days }, (_, i) => {
      const day = addDays(d.from, i);
      const staying = mine.find((r) => r.arrival <= day && day < r.departure); // sleeping here that night
      const leaving = mine.find((r) => r.departure === day);
      const arriving = mine.find((r) => r.arrival === day);
      const blocked = d.blocks.some((b) => b.propertyId === property.id && b.arrival <= day && day < b.departure);
      const gap = d.gaps.find((g) => g.propertyId === property.id && g.from <= day && day < g.to);
      const due = mine.flatMap((r) => r.tasks.filter((t) => ymd(new Date(t.at)) === day).map((t) => ({ r, t })));
      return h('div', { class: `sheet-day${day === d.today ? ' is-today' : ''}${day < d.today ? ' is-past' : ''}` },
        h('div', { class: 'sheet-date' }, h('span', null, dateOf(day).getUTCDate() === 1 || i === 0 ? `${dateOf(day).getUTCDate()} ${monthName.format(dateOf(day)).split(' ')[0].slice(0, 3)}` : String(dateOf(day).getUTCDate())),
          leaving && arriving && h('span', { class: 'cal-turn in-sheet', title: 'Same-day turnover' }, icon('refresh', 11)),
          due.map(({ r, t }) => h('span', { class: `cal-due in-sheet${t.status === 'scheduled' ? ' is-scheduled' : ''}`, title: `${t.status === 'scheduled' ? 'Message scheduled' : 'Suggested message'} for ${r.guestName}: ${fullTime(t.at)}` }, icon('send', 11)))),
        leaving && h('button', { type: 'button', class: `sheet-stay is-out ${channelClass(leaving.channel)}`, onclick: () => open(leaving.id) }, `Out: ${leaving.guestName}`),
        staying && h('button', { type: 'button', class: `sheet-stay ${channelClass(staying.channel)}${staying.id === selectedId ? ' is-selected' : ''}`, dataset: { booking: staying.id }, onclick: () => open(staying.id) },
          h('span', { class: 'cal-guest' }, staying.arrival === day ? `In: ${staying.guestName}` : staying.guestName), staying.arrival === day && h('span', { class: 'signs' }, signs(staying))),
        !staying && blocked && h('div', { class: 'sheet-stay is-blocked' }, 'Blocked'),
        !staying && !blocked && gap && h('button', { type: 'button', class: 'sheet-stay is-gap', onclick: () => openGap(gap, byId, property.name, load) }, 'Free: offer it'));
    });
    return h('div', { class: 'card sheet', role: 'group', 'aria-label': `${property.name}, ${monthName.format(dateOf(addDays(d.from, 14)))}` },
      h('div', { class: 'sheet-head' }, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((n) => h('div', null, n))),
      h('div', { class: 'sheet-grid' }, cells));
  }

  const legend = () => h('ul', { class: 'cal-legend' },
    [['ch-airbnb', 'Airbnb'], ['ch-booking', 'Booking.com'], ['ch-vrbo', 'Vrbo'], ['ch-direct', 'Direct'], ['ch-other', 'Other channel']].map(([c, t]) => h('li', null, h('span', { class: `dot ${c}` }), t)),
    h('li', null, h('span', { class: 'swatch cal-gap' }), 'Free gap to offer'),
    h('li', null, h('span', { class: 'swatch cal-block' }), 'Owner block'),
    h('li', null, h('span', { class: 'cal-turn in-legend' }, icon('refresh', 11)), 'Same-day turnover'),
    h('li', null, h('span', { class: 'cal-due in-legend' }, icon('send', 11)), 'Message suggested'),
    h('li', null, h('span', { class: 'cal-due is-scheduled in-legend' }, icon('send', 11)), 'Message scheduled'),
    h('li', null, h('span', { class: 'sign sign-ok' }, icon('check', 14)), 'Check-in form done'),
    h('li', null, h('span', { class: 'sign sign-wait' }, icon('clock', 14)), 'Form not done'),
    h('li', null, h('span', { class: 'sign sign-extra' }, icon('plus', 14)), 'Extra bought'),
    h('li', null, h('span', { class: 'sign sign-unread' }), 'Unread message'));

  const step = () => (propertyId ? 28 : Number(range.value) === 14 ? 7 : 28);
  prev.addEventListener('click', () => { from = addDays(from, -step()); load(); });
  next.addEventListener('click', () => { from = addDays(from, step()); load(); });
  now.addEventListener('click', () => { from = addDays(today, -1); load(); });
  range.addEventListener('change', load);
  picker.addEventListener('change', () => { propertyId = picker.value; load(); });
  load();
  return { el, onEvent(type) { if (['todo', 'conversation', 'properties', 'reconnect'].includes(type) && !document.querySelector('dialog[open]')) load(); } };
}

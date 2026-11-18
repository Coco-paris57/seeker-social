// Dashboard: what needs attention now, today's comings and goings, and how the last days went.
// Charts are single-series bars (one measure each, so no legend), with a tooltip on hover or
// focus and the same figures as a table underneath.
import { api, fill, h, icon, loadError, loading, MOODS, pageHeader } from './lib.js';
import { countUp, motionOn } from './look.js';
import { session } from './state.js';

const minutes = (m) => (m == null ? '–' : m < 1 ? 'Under 1 min' : m < 90 ? `${Math.round(m)} min` : `${Math.round(m / 6) / 10} h`);
const dateOf = (s) => new Date(`${s}T12:00:00Z`);
const dayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const shortDay = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' });
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** A figure that is also the way to the screen behind it. */
function stat({ href, iconName, value, label, detail, tone }) {
  return h('a', { class: `dash-stat${tone ? ` is-${tone}` : ''}`, href },
    h('span', { class: 'dash-stat-icon' }, icon(iconName, 20)),
    h('span', { class: 'dash-stat-value' }, value),
    h('span', { class: 'dash-stat-label' }, label),
    detail && h('span', { class: 'dash-stat-detail' }, detail));
}

/** One series as thin bars with rounded tops. `rows`: [{ label, short, value, mark }]. */
function barChart({ title, sub, rows, unit, emptyText }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const tip = h('div', { class: 'chart-tip', role: 'status', hidden: true });
  const show = (r, bar) => {
    tip.textContent = `${r.label}: ${plural(r.value, unit[0], unit[1])}`;
    tip.hidden = false;
    tip.style.left = `${bar.offsetLeft + bar.offsetWidth / 2}px`;
  };
  const total = rows.reduce((n, r) => n + r.value, 0);
  const bars = rows.map((r) => {
    const fillEl = h('span', { class: 'bar-v-fill' });
    fillEl.style.height = r.value ? `${Math.max(4, Math.round((r.value / max) * 100))}%` : '0';
    const bar = h('button', { type: 'button', class: `bar-v${r.mark ? ' is-marked' : ''}`, 'aria-label': `${r.label}: ${plural(r.value, unit[0], unit[1])}` },
      h('span', { class: 'bar-v-track' }, r.value > 0 && r.value === max && h('span', { class: 'bar-v-peak' }, String(r.value)), fillEl),
      h('span', { class: 'bar-v-label' }, r.short));
    bar.addEventListener('mouseenter', () => show(r, bar));
    bar.addEventListener('focus', () => show(r, bar));
    bar.addEventListener('mouseleave', () => { tip.hidden = true; });
    bar.addEventListener('blur', () => { tip.hidden = true; });
    return bar;
  });
  return h('section', { class: 'card dash-chart' },
    h('h2', null, title),
    sub && h('p', { class: 'hint' }, sub),
    total ? h('div', { class: 'chart-plot' }, tip, bars) : h('p', { class: 'muted chart-empty' }, emptyText),
    total > 0 && h('details', { class: 'chart-table' }, h('summary', null, 'Show as a table'),
      h('table', { class: 'data' }, h('tbody', null, rows.map((r) => h('tr', null, h('th', { scope: 'row' }, r.label), h('td', null, String(r.value))))))));
}

/** Home on a phone: what needs someone, most urgent first, then today in one line. Charts live in Insights. */
function phoneHome(d) {
  const row = (href, n, title, detail, tone) => h('a', { class: 'need-row', href }, h('span', { class: `need-n${tone ? ` is-${tone}` : ''}` }, String(n)), h('span', { class: 'need-text' }, h('strong', null, title), detail && h('small', null, detail)), icon('chevron', 16));
  const i = d.inbox;
  const needs = [
    i.urgent > 0 && row('#/inbox', i.urgent, i.urgent === 1 ? 'Urgent request' : 'Urgent requests', 'Open the Inbox now', 'urgent'),
    i.approvals > 0 && row('#/inbox', i.approvals, i.approvals === 1 ? 'Reply to approve' : 'Replies to approve', 'Inbox'),
    i.requests - i.urgent > 0 && row('#/inbox', i.requests - i.urgent, i.requests - i.urgent === 1 ? 'Request from the assistant' : 'Requests from the assistant', [i.maintenance && `${i.maintenance} maintenance`, i.questions && plural(i.questions, 'question', 'questions')].filter(Boolean).join(' · ')),
    d.todo > 0 && row('#/todo', d.todo, 'To do', d.scheduled ? `Messages suggested · ${d.scheduled} scheduled` : 'Messages suggested for guests'),
    d.unread > 0 && row('#/conversations', d.unread, d.unread === 1 ? 'Chat needs a response' : 'Chats need a response', d.unhappy ? `${plural(d.unhappy, 'guest sounds', 'guests sound')} unhappy` : null, d.unhappy ? 'urgent' : null),
    d.unread === 0 && d.unhappy > 0 && row('#/conversations', d.unhappy, d.unhappy === 1 ? 'Guest sounds unhappy' : 'Guests sound unhappy', 'Chats', 'urgent'),
    d.stays.formsMissing > 0 && row('#/calendar', d.stays.formsMissing, d.stays.formsMissing === 1 ? 'Check-in form not completed' : 'Check-in forms not completed', 'Arrivals in the next 3 days'),
  ].filter(Boolean);
  return [
    h('p', { class: 'home-label' }, 'Needs you'),
    needs.length ? h('div', { class: 'need-list' }, needs) : h('div', { class: 'card section empty' }, icon('check', 28), h('p', null, h('strong', null, 'All clear.')), h('p', { class: 'muted' }, 'Nothing is waiting for the team.')),
    h('p', { class: 'home-label' }, 'Today'),
    h('a', { class: 'home-strip', href: '#/calendar', 'aria-label': 'Today: open the calendar' },
      h('span', null, h('strong', null, String(d.stays.arrivals)), 'arriving'),
      h('span', null, h('strong', null, String(d.stays.departures)), 'leaving'),
      h('span', null, h('strong', null, `${d.stays.occupied}/${d.properties.active}`), 'occupied')),
    h('div', { class: 'need-list' },
      row('#/insights', minutes(d.reply.medianMinutes), 'Typical time to reply', 'Last 7 days · charts in Insights', 'calm'),
      row('#/properties', d.properties.active, d.properties.active === 1 ? 'Property' : 'Properties', `${d.properties.auto} on auto · ${d.properties.active - d.properties.auto} learning`, 'calm')),
  ];
}

const svg = (tag, attrs = {}, ...children) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.append(...children.filter(Boolean));
  return el;
};
const money = (n, currency = '£') => `${currency}${Number(n || 0).toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
let firstShow = true; // the staggered entrance plays once, not on every refresh

/** The top of the dashboard on a computer: tonight at a glance, today's agenda, what needs doing, and money from offers. */
function glassTop(d) {
  const s = d.stays;
  const occupancy = d.properties.active ? s.occupied / d.properties.active : 0;
  // Occupancy ring with tonight's guests around it. Each guest opens their chat, or the calendar if they have not written.
  const C = 2 * Math.PI * 54;
  const fillRing = svg('circle', { class: 'gd-ring-fill', cx: 65, cy: 65, r: 54, transform: 'rotate(-90 65 65)', 'stroke-dasharray': C, 'stroke-dashoffset': motionOn() ? C : C * (1 - occupancy) });
  if (motionOn()) requestAnimationFrame(() => requestAnimationFrame(() => fillRing.setAttribute('stroke-dashoffset', C * (1 - occupancy))));
  const percent = h('strong', null, '0%');
  countUp(percent, Math.round(occupancy * 100), (n) => `${Math.round(n)}%`);
  const guests = d.guests.map((g, i) => {
    const angle = (-90 + (360 / Math.max(1, d.guests.length)) * i) * (Math.PI / 180);
    const a = h('a', { class: `gd-guest${g.mood === 'unhappy' ? ' is-unhappy' : g.mood === 'positive' ? ' is-positive' : ''}${g.unread ? ' is-unread' : ''}`, href: g.conversationId ? `#/conversations/${g.conversationId}` : '#/calendar',
      title: `${g.name}${g.mood ? ` · ${MOODS[g.mood]?.label || ''}` : ''}${g.unread ? ' · needs a response' : ''}`, 'aria-label': `${g.name}${g.mood === 'unhappy' ? ', unhappy' : ''}` }, g.initials);
    a.style.left = `${118 + Math.cos(angle) * 96}px`;
    a.style.top = `${103 + Math.sin(angle) * 86}px`;
    return a;
  });
  const stat = (value, label, format) => { const strong = h('strong', null, ''); if (value == null) strong.textContent = '–'; else countUp(strong, value, format); return h('div', null, strong, h('span', null, label)); };
  const hero = h('section', { class: 'gd-hero', 'aria-label': 'Tonight' },
    h('div', null,
      h('p', { class: 'gd-kicker' }, dayFmt.format(new Date())),
      h('h2', null, `${s.occupied} of ${d.properties.active} ${d.properties.active === 1 ? 'flat is' : 'flats are'} occupied tonight`),
      h('div', { class: 'gd-stats' },
        stat(d.reply.medianMinutes, 'typical reply, 7 days', (n) => minutes(n)),
        stat(d.withoutTeamPercent, 'answered without the team', (n) => `${Math.round(n)}%`),
        stat(d.offers.revenue, 'from offers, 30 days', (n) => money(n, d.offers.currency))),
      h('a', { class: 'gd-cta', href: '#/calendar' }, 'Open the calendar', icon('chevron', 14))),
    h('div', { class: 'gd-orbit' },
      svg('svg', { width: 130, height: 130, viewBox: '0 0 130 130', 'aria-hidden': 'true' }, svg('circle', { class: 'gd-ring-track', cx: 65, cy: 65, r: 54 }), fillRing),
      h('div', { class: 'gd-orbit-mid' }, percent, h('span', null, 'OCCUPIED')),
      guests));

  const now = new Date();
  const agenda = h('section', { class: 'card gd-agenda', 'aria-label': 'Today' },
    h('div', { class: 'gd-date' }, h('strong', null, String(now.getDate())), h('div', null, h('b', null, new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(now)), h('small', null, `${plural(s.arrivals, 'arriving', 'arriving')} · ${plural(s.departures, 'leaving', 'leaving')}`))),
    d.agenda.length
      ? d.agenda.slice(0, 5).map((e) => h('a', { class: `gd-ev is-${e.kind}`, href: e.conversationId ? `#/conversations/${e.conversationId}` : '#/calendar' }, h('time', null, e.time), h('span', null, h('strong', null, e.title), h('small', null, e.detail))))
      : h('p', { class: 'muted' }, 'Nobody arrives or leaves today, and no message is scheduled.'),
    d.agenda.length > 5 && h('a', { href: '#/calendar' }, `${d.agenda.length - 5} more today`));

  const i = d.inbox;
  const act = (href, n, title, detail, tone) => h('a', { class: 'card gd-act', href }, h('i', { class: tone ? `is-${tone}` : '' }, String(n)), h('span', null, h('strong', null, title), h('small', null, detail)));
  const acts = h('div', { class: 'gd-acts' },
    act('#/inbox', i.approvals, i.approvals === 1 ? 'Reply to approve' : 'Replies to approve', i.approvals ? 'Waiting in the Inbox' : 'Nothing waiting', i.approvals ? '' : 'calm'),
    act('#/inbox', i.requests, i.requests === 1 ? 'Request to answer' : 'Requests to answer', i.requests ? [i.urgent && `${i.urgent} urgent`, i.maintenance && `${i.maintenance} maintenance`, i.questions && plural(i.questions, 'question', 'questions')].filter(Boolean).join(' · ') : 'Nothing open', i.urgent ? 'urgent' : i.requests ? '' : 'calm'),
    act('#/todo', d.todo, 'To do', d.scheduled ? `${plural(d.scheduled, 'message', 'messages')} scheduled` : 'Messages suggested for guests', d.todo ? '' : 'calm'),
    d.unhappy
      ? act('#/conversations', d.unhappy, d.unhappy === 1 ? 'Unhappy guest' : 'Unhappy guests', 'Open their chats', 'urgent')
      : act('#/conversations', d.unread, d.unread === 1 ? 'Chat to answer' : 'Chats to answer', d.unread ? 'Guests waiting for a reply' : 'Everyone has been answered', d.unread ? '' : 'calm'));

  const top = h('div', { class: `gd${firstShow ? ' enter' : ''}` }, h('div', { class: 'gd-top' }, hero, agenda), acts, h('div', { class: 'gd-bot' }, offersChart(), repliesDonut(d.answers)));
  firstShow = false;
  return top;
}

/** Money from offers over time. One measure, one line; the period buttons reshape the line in place. */
function offersChart() {
  const W = 600, H = 170, N = 36;
  const area = svg('path', { class: 'gd-area', fill: 'url(#gd-fade)' });
  const line = svg('path', { class: 'gd-line' });
  const dot = svg('circle', { class: 'gd-dot', r: 5, visibility: 'hidden' });
  const labels = [0, 1, 2].map((k) => svg('text', { x: 0, y: 30 + k * 50 - 4 }));
  const chart = svg('svg', { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', role: 'img' },
    svg('defs', {}, svg('linearGradient', { id: 'gd-fade', x1: 0, y1: 0, x2: 0, y2: 1 }, svg('stop', { offset: 0, 'stop-color': 'var(--clay)', 'stop-opacity': 0.42 }), svg('stop', { offset: 1, 'stop-color': 'var(--clay)', 'stop-opacity': 0 }))),
    svg('g', { class: 'gd-grid' }, [0, 1, 2].map((k) => svg('line', { x1: 0, x2: W, y1: 30 + k * 50, y2: 30 + k * 50 })), labels),
    area, line, dot);
  const tip = h('div', { class: 'gd-tip', hidden: true });
  const sub = h('p', { class: 'muted' }, 'Loading…');
  const axis = h('div', { class: 'gd-axis' });
  const table = h('tbody');
  const tabs = [7, 30, 90].map((n) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(n === 30), dataset: { days: n } }, `${n} days`));
  const plot = h('div', { class: 'gd-plot' }, tip, chart);
  let data = null;
  const short = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const span = (b) => (b.from === b.to ? short.format(dateOf(b.to)) : `${short.format(dateOf(b.from))} to ${short.format(dateOf(b.to))}`);
  const setPath = (el, dPath) => { el.setAttribute('d', dPath); el.style.setProperty('d', `path("${dPath}")`); }; // the style form is what lets the line reshape smoothly

  function draw() {
    const values = data.buckets.map((b) => b.revenue);
    const top = Math.max(10, ...values) * 1.15;
    // The same number of points whatever the period, so one shape can turn into the next.
    const pts = Array.from({ length: N }, (_, k) => {
      const pos = (k / (N - 1)) * (values.length - 1);
      const lo = Math.floor(pos), hi = Math.min(values.length - 1, lo + 1);
      const v = values[lo] + (values[hi] - values[lo]) * (pos - lo);
      return [(k / (N - 1)) * W, H - 20 - (v / top) * (H - 50)];
    });
    let dPath = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let k = 0; k < pts.length - 1; k++) {
      const p0 = pts[Math.max(0, k - 1)], p1 = pts[k], p2 = pts[k + 1], p3 = pts[Math.min(pts.length - 1, k + 2)];
      dPath += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    setPath(line, dPath);
    setPath(area, `${dPath} L${W},${H} L0,${H} Z`);
    labels[0].textContent = money(top, data.currency); labels[1].textContent = money(top / 2, data.currency); labels[2].textContent = money(0, data.currency);
    sub.textContent = data.sent ? `${money(data.revenue, data.currency)} in the last ${data.days} days · ${data.accepted} of ${data.sent} offers accepted` : `No offers were sent in the last ${data.days} days. They are scheduled from the To do list.`;
    chart.setAttribute('aria-label', `Money from offers, last ${data.days} days: ${money(data.revenue, data.currency)}`);
    fill(axis, h('span', null, short.format(dateOf(data.buckets[0].from))), h('span', null, 'Today'));
    fill(table, data.buckets.filter((b) => b.sent || b.accepted).map((b) => h('tr', null, h('th', { scope: 'row' }, span(b)), h('td', null, money(b.revenue, data.currency)), h('td', null, `${b.accepted} of ${b.sent}`))));
    dot.setAttribute('visibility', 'hidden');
    tip.hidden = true;
  }
  async function load(days) {
    try {
      data = await api(`/dashboard/offers?days=${days}`);
      draw();
    } catch (err) {
      if (err.status !== 401) sub.textContent = 'This chart could not be loaded.';
    }
  }
  for (const t of tabs) t.addEventListener('click', () => { for (const o of tabs) o.setAttribute('aria-selected', String(o === t)); load(Number(t.dataset.days)); });
  plot.addEventListener('pointermove', (e) => {
    if (!data) return;
    const box = chart.getBoundingClientRect();
    const k = Math.min(data.buckets.length - 1, Math.max(0, Math.round(((e.clientX - box.left) / box.width) * (data.buckets.length - 1))));
    const b = data.buckets[k];
    const top = Math.max(10, ...data.buckets.map((x) => x.revenue)) * 1.15;
    const x = (k / Math.max(1, data.buckets.length - 1)) * W;
    dot.setAttribute('cx', x); dot.setAttribute('cy', H - 20 - (b.revenue / top) * (H - 50)); dot.setAttribute('visibility', 'visible');
    fill(tip, span(b), h('br'), h('strong', null, money(b.revenue, data.currency)), ` · ${b.accepted} accepted of ${b.sent} sent`);
    tip.hidden = false;
    tip.style.left = `${Math.min(box.width - 90, Math.max(90, (x / W) * box.width))}px`;
  });
  plot.addEventListener('pointerleave', () => { tip.hidden = true; dot.setAttribute('visibility', 'hidden'); });
  load(30);
  return h('section', { class: 'card gd-chart' },
    h('div', { class: 'gd-chart-head' }, h('div', null, h('h2', null, 'Money from offers'), sub), h('div', { class: 'seg', role: 'tablist', 'aria-label': 'Period' }, tabs)),
    plot, axis,
    h('details', { class: 'chart-table' }, h('summary', null, 'Show as a table'), h('table', { class: 'data' }, h('thead', null, h('tr', null, ['Period', 'Money', 'Accepted'].map((t) => h('th', { scope: 'col' }, t)))), table)));
}

/** Who wrote the replies in the last 30 days, as a ring with its legend. */
function repliesDonut(a) {
  const parts = [
    ['Sent as the assistant wrote them', a.automatic + a.approved, 'var(--brand)'],
    ['Corrected by the team', a.edited, 'var(--clay)'],
    ['Written by the team', a.written, 'color-mix(in srgb, var(--brand) 22%, transparent)'],
  ];
  const total = parts.reduce((n, p) => n + p[1], 0);
  const C = 2 * Math.PI * 40;
  let turned = -90;
  const rings = total ? parts.filter((p) => p[1]).map(([, n, colour]) => {
    const share = n / total;
    const c = svg('circle', { cx: 52, cy: 52, r: 40, fill: 'none', 'stroke-width': 14, 'stroke-dasharray': `${Math.max(0, share * C - 2)} ${C}`, transform: `rotate(${turned} 52 52)` });
    c.style.stroke = colour;
    turned += share * 360;
    return c;
  }) : [svg('circle', { class: 'gd-donut-empty', cx: 52, cy: 52, r: 40, fill: 'none', 'stroke-width': 14 })];
  const mid = svg('text', { x: 52, y: 59, 'text-anchor': 'middle' });
  mid.textContent = total ? `${Math.round((parts[0][1] / total) * 100)}%` : '–';
  return h('section', { class: 'card gd-donut-card' },
    h('h2', null, 'Who wrote the replies'), h('p', { class: 'muted' }, total ? `${total} replies in the last 30 days` : 'No replies in the last 30 days'),
    h('div', { class: 'gd-donut' }, svg('svg', { width: 104, height: 104, viewBox: '0 0 104 104', role: 'img', 'aria-label': total ? `${mid.textContent} sent as the assistant wrote them` : 'No replies yet' }, rings, mid),
      h('ul', null, parts.map(([label, n, colour]) => { const sw = h('i'); sw.style.background = colour; return h('li', null, sw, h('span', null, label), h('b', null, String(n))); }))));
}

export function dashboardView() {
  const body = h('div', null, loading('Loading the dashboard'));
  const first = (session.user?.name || '').split(' ')[0];
  const el = h('div', { class: 'page' },
    pageHeader(first ? `Hello, ${first}` : 'Dashboard', {
      sub: dayFmt.format(new Date()),
    }),
    body);

  async function load() {
    let d;
    try {
      d = await api('/dashboard');
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    const s = d.stays;
    if (innerWidth < 900) return fill(body, phoneHome(d));
    const moodTotal = d.moods.positive + d.moods.neutral + d.moods.unhappy;
    const free = d.properties.active - s.occupied;
    const occupancy = d.properties.active ? Math.round((s.occupied / d.properties.active) * 100) : 0;
    const ring = h('div', { class: 'ring', role: 'img', 'aria-label': `${occupancy}% of properties occupied tonight` }, h('strong', null, `${occupancy}%`));
    ring.style.setProperty('--share', `${occupancy * 3.6}deg`);
    fill(body,
      glassTop(d),
      h('div', { class: 'dash-grid' },
        barChart({
          title: 'Arrivals this week', sub: 'Guests checking in over the next 7 days.', unit: ['arrival', 'arrivals'], emptyText: 'No arrivals in the next 7 days.',
          rows: d.arrivalsByDay.map((x, i) => ({ label: i === 0 ? `Today, ${dayFmt.format(dateOf(x.date))}` : dayFmt.format(dateOf(x.date)), short: i === 0 ? 'Today' : shortDay.format(dateOf(x.date)), value: x.arrivals, mark: i === 0 })),
        }),
        barChart({
          title: 'Guest messages', sub: 'Messages from guests per day, last 14 days.', unit: ['message', 'messages'], emptyText: 'No guest messages in the last 14 days.',
          rows: d.messagesByDay.map((x, i) => ({ label: dayFmt.format(dateOf(x.date)), short: i === 13 ? 'Today' : i % 2 || i === 12 ? '' : String(dateOf(x.date).getUTCDate()), value: x.n, mark: i === 13 })),
        }),
        h('section', { class: 'card dash-mood' },
          h('h2', null, 'How guests sound'),
          h('p', { class: 'hint' }, 'Chats from the last 14 days.'),
          moodTotal
            ? h('ul', { class: 'mood-bars' }, ['positive', 'neutral', 'unhappy'].map((m) => {
              const bar = h('span', { class: 'mood-fill' });
              bar.style.width = `${d.moods[m] ? Math.max(3, Math.round((d.moods[m] / moodTotal) * 100)) : 0}%`;
              return h('li', null, h('span', { class: `mood-name sign-${m}` }, icon(MOODS[m].icon, 18), h('span', null, MOODS[m].label)), h('span', { class: 'mood-track' }, bar), h('strong', null, String(d.moods[m])));
            }))
            : h('p', { class: 'muted' }, 'No guest chats yet.'),
          h('div', { class: 'dash-pair' },
            h('div', null, h('p', { class: 'pair-value' }, d.withoutTeamPercent == null ? '–' : `${d.withoutTeamPercent}%`), h('p', { class: 'muted' }, 'of replies sent without the team, last 7 days')),
            h('div', null, h('p', { class: 'pair-value' }, `${d.offers.currency}${Number(d.offers.revenue).toLocaleString('en-GB')}`), h('p', { class: 'muted' }, `from offers, last 30 days · ${d.offers.accepted} of ${d.offers.sent} accepted`))),
          h('a', { class: 'btn btn-secondary', href: '#/insights' }, icon('eye', 18), h('span', null, 'All insights')))));
  }
  load();
  return { el, onEvent(type) { if (['todo', 'draft', 'ticket', 'conversation', 'message', 'properties', 'reconnect'].includes(type)) load(); } };
}

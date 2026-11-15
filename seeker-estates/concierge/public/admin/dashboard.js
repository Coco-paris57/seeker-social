// Dashboard: what needs attention now, today's comings and goings, and how the last days went.
// Charts are single-series bars (one measure each, so no legend), with a tooltip on hover or
// focus and the same figures as a table underneath.
import { api, fill, h, icon, loadError, loading, MOODS, pageHeader } from './lib.js';
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
      h('section', { 'aria-label': 'Needs attention' },
        h('div', { class: 'dash-stats' },
          stat({ href: '#/inbox', iconName: 'inbox', value: String(d.inbox.approvals), label: d.inbox.approvals === 1 ? 'Reply to approve' : 'Replies to approve', detail: 'Inbox', tone: d.inbox.approvals ? 'due' : null }),
          stat({ href: '#/inbox', iconName: d.inbox.urgent ? 'alert' : 'help', value: String(d.inbox.requests), label: d.inbox.requests === 1 ? 'Request from the assistant' : 'Requests from the assistant',
            detail: d.inbox.requests ? [d.inbox.urgent && `${d.inbox.urgent} urgent`, d.inbox.maintenance && `${d.inbox.maintenance} maintenance`, d.inbox.questions && plural(d.inbox.questions, 'question', 'questions')].filter(Boolean).join(' · ') : 'Inbox', tone: d.inbox.urgent ? 'urgent' : d.inbox.requests ? 'due' : null }),
          stat({ href: '#/todo', iconName: 'check', value: String(d.todo), label: 'To do', detail: d.scheduled ? `${plural(d.scheduled, 'message', 'messages')} scheduled` : 'Messages suggested for guests', tone: d.todo ? 'due' : null }),
          stat({ href: '#/conversations', iconName: 'chat', value: String(d.unread), label: d.unread === 1 ? 'Chat needs a response' : 'Chats need a response', detail: d.unhappy ? `${plural(d.unhappy, 'guest sounds', 'guests sound')} unhappy` : 'Chats', tone: d.unhappy ? 'urgent' : d.unread ? 'due' : null }),
          stat({ href: '#/properties', iconName: 'home', value: String(d.properties.active), label: d.properties.active === 1 ? 'Property' : 'Properties', detail: `${d.properties.auto} on auto · ${d.properties.active - d.properties.auto} learning` }),
          stat({ href: '#/insights', iconName: 'clock', value: minutes(d.reply.medianMinutes), label: 'Typical time to reply', detail: d.reply.measured ? `Last 7 days · ${plural(d.reply.measured, 'reply', 'replies')}` : 'No replies in the last 7 days' }))),
      h('div', { class: 'dash-grid' },
        h('section', { class: 'card dash-today' },
          h('h2', null, 'Today'),
          h('div', { class: 'today-ring' }, ring,
            h('div', null, h('p', { class: 'ring-title' }, `${s.occupied} of ${d.properties.active} occupied tonight`), h('p', { class: 'muted' }, free > 0 ? `${plural(free, 'property is', 'properties are')} free tonight.` : 'Every property is taken tonight.'))),
          h('ul', { class: 'today-facts' },
            h('li', null, icon('back', 18), h('span', null, h('strong', null, String(s.arrivals)), s.arrivals === 1 ? ' guest arriving' : ' guests arriving')),
            h('li', null, icon('logout', 18), h('span', null, h('strong', null, String(s.departures)), s.departures === 1 ? ' guest leaving' : ' guests leaving')),
            s.formsMissing > 0 && h('li', { class: 'is-warn' }, icon('alert', 18), h('span', null, h('strong', null, String(s.formsMissing)), ` check-in ${s.formsMissing === 1 ? 'form' : 'forms'} not completed for arrivals in the next 3 days`))),
          h('a', { class: 'btn btn-secondary', href: '#/calendar' }, icon('bookmark', 18), h('span', null, 'Open the calendar'))),
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
          h('a', { class: 'btn btn-secondary', href: '#/insights' }, icon('eye', 18), h('span', null, 'All insights')))),
      h('nav', { class: 'dash-shortcuts', 'aria-label': 'Shortcuts' },
        [['#/calendar', 'bookmark', 'Calendar'], ['#/knowledge', 'book', 'Knowledge'], ['#/insights', 'eye', 'Insights'], ['#/scheduled', 'clock', 'Scheduled messages'], ['#/extras', 'plus', 'Paid extras'], ['#/settings', 'sliders', 'Settings']]
          .map(([href, i, label]) => h('a', { class: 'btn btn-secondary', href }, icon(i, 18), h('span', null, label)))));
  }
  load();
  return { el, onEvent(type) { if (['todo', 'draft', 'ticket', 'conversation', 'message', 'properties', 'reconnect'].includes(type)) load(); } };
}

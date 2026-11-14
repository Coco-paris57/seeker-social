// Insights: how fast guests are answered, how much the assistant handles alone, what guests
// ask about, and which questions each property could not answer.
import { api, categoryLabel, chip, fill, h, icon, loadError, loading, pageHeader } from './lib.js';

const minutes = (m) => (m == null ? 'No replies yet' : m < 1 ? 'Under 1 min' : m < 90 ? `${Math.round(m)} min` : `${Math.round(m / 6) / 10} h`);

function tile(value, label, hint) {
  return h('div', { class: 'tile' }, h('p', { class: 'tile-value' }, value), h('p', { class: 'tile-label' }, label), hint && h('p', { class: 'hint' }, hint));
}

export function insightsView() {
  const body = h('div', null, loading('Loading insights'));
  const range = h('select', { 'aria-label': 'Period' },
    h('option', { value: '7' }, 'Last 7 days'), h('option', { value: '30', selected: true }, 'Last 30 days'), h('option', { value: '90' }, 'Last 90 days'));
  const el = h('div', { class: 'page' },
    pageHeader('Insights', { back: { href: '#/properties', label: 'Properties' }, sub: 'How the assistant and the team are doing, and where the gaps are.', actions: [range] }),
    body);

  async function load() {
    let d;
    try {
      d = await api(`/insights?days=${range.value}`);
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    const a = d.answers;
    const total = a.automatic + a.approved + a.edited + a.written;
    const max = Math.max(1, ...d.topics.map((t) => t.n));
    fill(body,
      h('div', { class: 'tiles' },
        tile(minutes(d.medianReplyMinutes), 'Typical time to a real reply', d.repliesMeasured ? `Median of ${d.repliesMeasured} ${d.repliesMeasured === 1 ? 'reply' : 'replies'}. Holding notes do not count.` : 'Appears once guests have been answered.'),
        tile(d.withoutTeamPercent == null ? 'No replies yet' : `${d.withoutTeamPercent}%`, 'Answered without the team', total ? `${a.automatic} of ${total} replies went out on their own.` : null),
        tile(String(d.chats), d.chats === 1 ? 'Conversation' : 'Conversations', `${d.guestMessages} guest ${d.guestMessages === 1 ? 'message' : 'messages'}.`),
        tile(String(d.unhappy), d.unhappy === 1 ? 'Guest who sounded unhappy' : 'Guests who sounded unhappy')),
      h('section', { class: 'card section' },
        h('h2', null, 'Who wrote the replies'),
        total
          ? h('ul', { class: 'bars' }, [['Sent by the assistant on its own', a.automatic], ['Approved as drafted', a.approved], ['Corrected by the team', a.edited], ['Written by the team', a.written]]
            .map(([label, n]) => h('li', null, h('span', { class: 'bar-label' }, label), h('span', { class: 'bar-track' }, bar(n / total)), h('span', { class: 'bar-n' }, String(n)))))
          : h('p', { class: 'muted' }, 'No replies in this period.')),
      h('section', { class: 'card section' },
        h('h2', null, 'What guests ask about'),
        d.topics.length
          ? h('ul', { class: 'bars' }, d.topics.map((t) => h('li', null, h('span', { class: 'bar-label' }, categoryLabel(t.category)), h('span', { class: 'bar-track' }, bar(t.n / max)), h('span', { class: 'bar-n' }, String(t.n)))))
          : h('p', { class: 'muted' }, 'Nothing yet in this period.')),
      h('section', { class: 'card section' },
        h('h2', null, 'Questions the assistant could not answer'),
        h('p', { class: 'hint' }, 'Each one is a gap in that property\'s knowledge base. Add an entry and the assistant answers it next time.'),
        d.gaps.length
          ? h('ul', { class: 'gap-list' }, d.gaps.map((g) => h('li', null,
            h('div', null, h('strong', null, g.summary), h('p', { class: 'muted' }, `${g.propertyName}${g.n > 1 ? ` · asked ${g.n} times` : ''}`)),
            g.saved ? chip('Now in the knowledge base', { tone: 'ok', icon: 'check' })
              : g.propertyId ? h('a', { class: 'btn btn-secondary btn-small', href: `#/properties/${g.propertyId}` }, icon('plus', 16), h('span', null, 'Add to knowledge')) : null)))
          : h('p', { class: 'muted' }, 'None in this period.')),
      h('section', { class: 'card section' },
        h('h2', null, 'By property'),
        d.properties.length
          ? h('div', { class: 'table-scroll' }, h('table', { class: 'data' },
            h('thead', null, h('tr', null, ['Property', 'Mode', 'Chats', 'Questions to team', 'Issues', 'Approved unchanged', 'Knowledge entries'].map((t) => h('th', { scope: 'col' }, t)))),
            h('tbody', null, d.properties.map((p) => h('tr', null,
              h('th', { scope: 'row' }, h('a', { href: `#/properties/${p.id}` }, p.name)),
              h('td', null, p.mode === 'auto' ? 'Auto' : 'Learning'), h('td', null, String(p.chats)), h('td', null, String(p.questions)), h('td', null, String(p.issues)),
              h('td', null, p.reviewed ? `${p.approvalRate}% of ${p.reviewed}` : 'None reviewed'), h('td', null, String(p.knowledge)))))))
          : h('p', { class: 'muted' }, 'No activity in this period.')));
  }
  const bar = (share) => {
    const fillEl = h('span', { class: 'bar-fill' });
    fillEl.style.width = `${Math.max(2, Math.round(share * 100))}%`;
    return fillEl;
  };
  range.addEventListener('change', load);
  load();
  return { el, onEvent() {} };
}

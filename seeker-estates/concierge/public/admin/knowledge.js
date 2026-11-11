// Knowledge base editor, used for one property and for the global entries.
import { api, busy, button, categoryLabel, check, chip, confirmDialog, field, fill, h, icon, loadError, loading, openDialog, pageHeader, showError, timeEl, toast } from './lib.js';
import { session } from './state.js';

// Categories whose entries are sensitive unless the person says otherwise (matches the server).
const SENSITIVE_BY_DEFAULT = new Set(['access', 'wifi']);

/**
 * Add or edit an entry. `entry` is an existing entry, or a starting point for a new one
 * ({ category, question }). Resolves true when saved.
 */
function entryDialog({ entry = {}, propertyId, propertyName }) {
  const isNew = !entry.id;
  return openDialog({
    title: isNew ? 'Add knowledge' : 'Edit knowledge',
    wide: true,
    build: (close) => {
      const category = h('select', null, session.categories.map((c) => h('option', { value: c, selected: c === (entry.category || 'other') }, categoryLabel(c))));
      const question = h('input', { type: 'text', value: entry.question || '', maxLength: 500, required: true });
      const answer = h('textarea', { rows: 7, value: entry.answer || '', maxLength: 6000, required: true });
      const sensitive = check('Sensitive: only for verified guests near their stay', {
        switchStyle: true,
        checked: isNew ? SENSITIVE_BY_DEFAULT.has(category.value) : entry.sensitive,
      });
      // For a new entry the switch follows the category until the person sets it themselves.
      let touched = !isNew;
      sensitive.input.addEventListener('change', () => { touched = true; });
      category.addEventListener('change', () => { if (!touched) sensitive.input.checked = SENSITIVE_BY_DEFAULT.has(category.value); });
      const save = button(isNew ? 'Add entry' : 'Save changes', { variant: 'primary', type: 'submit' });
      const form = h('form', { class: 'form' },
        h('p', { class: 'muted' }, propertyId ? `Applies to ${propertyName}.` : 'Applies to every property.'),
        field('Category', category),
        field('Topic or question', question, { hint: 'For example: How to use the washing machine' }),
        field('Answer', answer, { hint: 'Plain text. Numbered steps work well. The assistant rewords this for each guest.' }),
        sensitive.wrap,
        h('p', { class: 'hint' }, 'Use this for door codes, key safes and WiFi passwords.'),
        h('div', { class: 'dialog-actions' }, button('Cancel', { onclick: () => close(false) }), save));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        busy(save, async () => {
          const body = { category: category.value, question: question.value, answer: answer.value, sensitive: sensitive.input.checked };
          try {
            if (isNew) await api('/knowledge', { method: 'POST', body: { ...body, propertyId: propertyId ?? null } });
            else await api(`/knowledge/${entry.id}`, { method: 'PATCH', body });
            toast(isNew ? 'Entry added.' : 'Entry saved.', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
      });
      return form;
    },
  });
}

/**
 * Knowledge list grouped by category, with add, edit and delete.
 * `onLoaded(entries)` lets the property screen build its checklist from the same data.
 * Returns { el, reload, add(prefill) }.
 */
export function knowledgeEditor({ propertyId = null, propertyName = null, onLoaded = () => {} }) {
  const groups = h('div', { class: 'kb-groups' }, loading('Loading knowledge'));
  const el = h('div', { class: 'kb' }, groups);

  const add = async (prefill = {}) => {
    if (await entryDialog({ entry: prefill, propertyId, propertyName })) reload();
  };

  function entryEl(k) {
    const edit = button('Edit', { icon: 'edit', small: true, variant: 'ghost', 'aria-label': `Edit: ${k.question}` });
    const del = button('Delete', { icon: 'trash', small: true, variant: 'ghost', 'aria-label': `Delete: ${k.question}` });
    edit.addEventListener('click', async () => {
      if (await entryDialog({ entry: k, propertyId, propertyName })) reload();
    });
    del.addEventListener('click', async () => {
      const ok = await confirmDialog({
        title: 'Delete this entry?',
        message: `"${k.question}" will be removed and the assistant will no longer know it.`,
        confirmLabel: 'Delete entry', danger: true,
      });
      if (!ok) return;
      try {
        await api(`/knowledge/${k.id}`, { method: 'DELETE' });
        toast('Entry deleted.', { kind: 'ok' });
        reload();
      } catch (err) {
        showError(err);
      }
    });
    return h('li', { class: 'kb-entry' },
      h('div', { class: 'kb-entry-head' },
        h('h4', null, k.question),
        h('div', { class: 'kb-entry-actions' }, edit, del)),
      h('p', { class: 'pre' }, k.answer),
      h('p', { class: 'kb-entry-meta' },
        k.sensitive && chip('Verified guests only', { tone: 'warn', icon: 'lock' }),
        k.source === 'learned' && chip('Learned from a team answer', { tone: 'brand', icon: 'bookmark' }),
        h('span', { class: 'muted' }, 'Updated ', timeEl(k.updatedAt))));
  }

  async function reload() {
    let entries;
    try {
      ({ knowledge: entries } = await api(propertyId ? `/knowledge?propertyId=${propertyId}` : '/knowledge?scope=global'));
    } catch (err) {
      if (err.status !== 401) fill(groups, loadError(err, reload));
      return;
    }
    onLoaded(entries);
    if (!entries.length) {
      fill(groups, h('div', { class: 'empty' }, icon('book', 28), h('p', null, propertyId ? 'Nothing saved for this property yet.' : 'No global knowledge yet.'),
        h('p', null, 'Add what guests ask most, and the assistant will use it straight away.')));
      return;
    }
    const used = session.categories.filter((c) => entries.some((k) => k.category === c));
    fill(groups, used.map((c) => {
      const items = entries.filter((k) => k.category === c);
      return h('section', { class: 'kb-group' },
        h('h3', null, categoryLabel(c), h('span', { class: 'count' }, items.length)),
        h('ul', { class: 'kb-list' }, items.map(entryEl)));
    }));
  }

  reload();
  return { el, reload, add };
}

/** Global knowledge screen. */
export function knowledgeView() {
  const editor = knowledgeEditor({});
  const el = h('div', { class: 'page' },
    pageHeader('Knowledge', {
      sub: 'Answers that apply to every property: house rules, getting around, how bookings work. Knowledge for one property lives on that property.',
      actions: [button('Add entry', { variant: 'primary', icon: 'plus', onclick: () => editor.add() })],
    }),
    editor.el);
  return {
    el,
    // An answered request may have added a learned entry.
    onEvent(type) { if (type === 'ticket' || type === 'draft') editor.reload(); },
  };
}

// Knowledge base editor, used for one property and for the global entries.
import { api, ApiError, attachmentsView, busy, button, categoryLabel, check, chip, confirmDialog, field, fill, h, icon, loadError, loading, openDialog, openPicture, pageHeader, showError, timeEl, toast, uid, uploadPicture } from './lib.js';
import { session } from './state.js';

// Categories whose entries are sensitive unless the person says otherwise (matches the server).
const SENSITIVE_BY_DEFAULT = new Set(['access', 'wifi']);

const MAX_PICTURES = 6;
const MAX_SIDE = 1600; // pixels on the long side after scaling
const UNREADABLE = 'This picture format could not be read. Try a JPEG or PNG, or take a screenshot of it.';

/** Decode a chosen file to something a canvas can draw. Rejects when the browser cannot read it. */
async function decodePicture(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch { /* fall through to an <img>, which reads some formats createImageBitmap does not */ }
  }
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('unreadable'));
      img.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Scale a picture to at most MAX_SIDE on its long side and re-encode it as JPEG. This keeps
 * uploads small, converts phone formats the server does not take, and drops location data.
 */
export async function preparePicture(file) {
  let source;
  try {
    source = await decodePicture(file);
  } catch {
    throw new Error(UNREADABLE);
  }
  const width = source.naturalWidth || source.width;
  const height = source.naturalHeight || source.height;
  if (!width || !height) throw new Error(UNREADABLE);
  const scale = Math.min(1, MAX_SIDE / Math.max(width, height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#FFFFFF'; // JPEG has no transparency
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close?.();
  const blob = await new Promise((resolve) => { canvas.toBlob(resolve, 'image/jpeg', 0.85); });
  if (!blob) throw new Error(UNREADABLE);
  return blob;
}

/**
 * Pictures of a knowledge entry inside the form: thumbnails with remove buttons, an
 * "Add pictures" button, and upload progress and errors in place.
 * `onChange()` runs whenever the set of uploaded pictures changes.
 */
function pictureField(initial, onChange) {
  // Each item: { file } once uploaded, { src, uploading: true } while on its way.
  let items = (initial || []).map((file) => ({ file, src: file.url }));
  const previews = [];
  const labelId = uid('pics');
  const grid = h('ul', { class: 'picture-grid', 'aria-labelledby': labelId });
  const errors = h('div', { class: 'picture-errors', role: 'alert' });
  const status = h('p', { class: 'visually-hidden', role: 'status' });
  const input = h('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, tabIndex: -1 });
  const addBtn = button('Add pictures', { icon: 'image', onclick: () => input.click() });
  const hint = h('p', { class: 'hint' });

  const render = () => {
    fill(grid, items.map((item, i) => {
      const n = i + 1;
      const img = h('img', { src: item.src, alt: `Picture ${n}`, width: 96, height: 96 });
      return h('li', { class: item.uploading ? 'picture picture-uploading' : 'picture' },
        item.uploading
          ? h('span', { class: 'picture-frame' }, img)
          : h('button', { type: 'button', class: 'picture-frame', 'aria-label': `Picture ${n}, open larger`, onclick: () => openPicture(item.src, `Picture ${n}`) }, img),
        item.uploading && h('span', { class: 'picture-state' }, 'Uploading…'),
        h('button', { type: 'button', class: 'picture-remove', 'aria-label': `Remove picture ${n}`, onclick: () => remove(item) }, h('span', null, icon('x', 16))));
    }));
    grid.hidden = !items.length;
    addBtn.disabled = items.length >= MAX_PICTURES;
    hint.textContent = items.length >= MAX_PICTURES
      ? `That is the most an entry can have (${MAX_PICTURES}). Remove one to add another.`
      : `Up to ${MAX_PICTURES}. For example the remote, the control panel or the key safe. Guests see them with the answer.`;
  };

  function remove(item) {
    const at = items.indexOf(item);
    items = items.filter((it) => it !== item);
    render();
    status.textContent = 'Picture removed.';
    // Keep the keyboard where it was: the next picture's remove button, or the add button.
    (grid.querySelectorAll('.picture-remove')[Math.min(at, items.length - 1)] || addBtn).focus();
    onChange();
  }

  const fail = (name, message) => {
    errors.append(h('p', { class: 'form-error' }, name ? `${name}: ${message}` : message));
  };

  input.addEventListener('change', async () => {
    const chosen = [...input.files];
    input.value = ''; // so the same file can be chosen again after a failure
    fill(errors);
    const room = MAX_PICTURES - items.length;
    if (chosen.length > room) fail('', `An entry can have ${MAX_PICTURES} pictures. ${chosen.length - room} of the ones you chose ${chosen.length - room === 1 ? 'was' : 'were'} not added.`);
    let added = 0;
    for (const chosenFile of chosen.slice(0, room)) {
      let blob;
      try {
        blob = await preparePicture(chosenFile);
      } catch (err) {
        fail(chosenFile.name, err.message);
        continue;
      }
      const src = URL.createObjectURL(blob);
      previews.push(src);
      const item = { src, uploading: true };
      items.push(item);
      render();
      try {
        item.file = await uploadPicture(blob);
        item.uploading = false;
        added += 1;
        render();
        onChange();
      } catch (err) {
        items = items.filter((it) => it !== item);
        render();
        // A 401 has already sent the person to sign-in.
        if (err.status !== 401) fail(chosenFile.name, err instanceof ApiError ? err.message : 'This picture could not be uploaded. Please try again.');
      }
    }
    if (added) status.textContent = added === 1 ? 'Picture added.' : `${added} pictures added.`;
  });

  render();
  return {
    el: h('div', { class: 'field pictures' },
      h('p', { class: 'field-label', id: labelId }, 'Pictures'),
      grid, errors, input, addBtn, hint, status),
    tokens: () => items.filter((it) => it.file).map((it) => it.file.token),
    uploading: () => items.some((it) => it.uploading),
    /** Free the local previews once the form has closed. */
    dispose: () => previews.forEach((src) => URL.revokeObjectURL(src)),
  };
}

/**
 * Add or edit an entry. `entry` is an existing entry, or a starting point for a new one
 * ({ category, question }). Resolves true when saved.
 */
function entryDialog({ entry = {}, propertyId, propertyName }) {
  const isNew = !entry.id;
  let pictures;
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

      // Pictures, and instructions drafted from them. Nothing here is saved until Save.
      const describe = button('Write instructions from the pictures', { icon: 'bot' });
      const describeHint = h('p', { class: 'hint' });
      const describeStatus = h('p', { class: 'note describe-status', role: 'status', hidden: true });
      const saw = h('div', { class: 'banner draft-note', hidden: true });
      const toCheck = h('div', { class: 'warning', role: 'alert', hidden: true });
      const notes = h('textarea', { class: 'notes', rows: 2, value: entry.pictureNotes || '', maxLength: 2000 });
      const notesField = field('What the pictures show (for the assistant)', notes, { hint: 'Guests do not see this. It helps the assistant know when these pictures answer a question.' });
      const video = h('input', { type: 'url', value: entry.videoUrl || '', maxLength: 500, inputMode: 'url', placeholder: 'https://', pattern: 'https://.+', title: 'A full web address starting with https://' });
      const syncPictures = () => {
        const count = pictures.tokens().length;
        if (!describe.hasAttribute('aria-busy')) describe.disabled = !count;
        describeHint.textContent = count
          ? 'The assistant reads the pictures and drafts the steps for you to check. Nothing is saved until you press Save.'
          : 'Add a picture of the remote or control panel first, and the assistant can draft the steps for you.';
        notesField.hidden = !count && !notes.value.trim();
      };
      pictures = pictureField(entry.pictures, syncPictures);
      syncPictures();

      describe.addEventListener('click', async () => {
        await busy(describe, async () => {
          fill(describeStatus, icon('clock', 16), 'Reading the pictures… this can take half a minute');
          describeStatus.hidden = false;
          let out;
          try {
            out = await api('/knowledge/describe', { method: 'POST', body: { pictures: pictures.tokens(), topic: question.value.trim(), ...(propertyId ? { propertyId } : {}) } });
          } catch (err) {
            showError(err);
            return;
          } finally {
            describeStatus.hidden = true;
          }
          const instructions = String(out.instructions || '').trim();
          if (!instructions) return toast('The assistant could not write instructions from these pictures. Please write them by hand.', { kind: 'error' });
          if (answer.value.trim() && answer.value.trim() !== instructions && !(await confirmDialog({
            title: 'Replace the answer?',
            message: 'The Answer box already has text. Replace it with the instructions drafted from the pictures?',
            confirmLabel: 'Replace answer',
          }))) return undefined;
          answer.value = instructions;
          const identified = String(out.identified || '').trim();
          if (identified) notes.value = identified;
          fill(saw, icon('bot', 20), h('div', null,
            h('p', null, h('strong', null, 'This is a draft. '), 'Read the answer, correct anything that is wrong, then press Save.'),
            identified && h('p', { class: 'draft-saw' }, h('strong', null, 'What the assistant saw: '), identified)));
          saw.hidden = false;
          // The warning belongs to this draft: it stays until the entry is saved or a new draft replaces the text.
          const warn = String(out.toCheck || '').trim();
          fill(toCheck, icon('alert', 20), h('p', { class: 'pre' }, h('strong', null, 'Check before saving: '), warn));
          toCheck.hidden = !warn;
          syncPictures();
          answer.focus();
          return undefined;
        });
        syncPictures();
      });

      const save = button(isNew ? 'Add entry' : 'Save changes', { variant: 'primary', type: 'submit' });
      const form = h('form', { class: 'form' },
        h('p', { class: 'muted' }, propertyId ? `Applies to ${propertyName}.` : 'Applies to every property.'),
        field('Category', category),
        field('Topic or question', question, { hint: 'For example: How to use the washing machine' }),
        pictures.el,
        h('div', { class: 'describe' }, describe, describeHint, describeStatus),
        field('Answer', answer, { hint: 'Plain text. Numbered steps work well. The assistant rewords this for each guest.' }),
        toCheck,
        saw,
        notesField,
        field('Video link', video, { hint: 'A YouTube or Dropbox link that shows how it works. Guests get it with the answer.' }),
        sensitive.wrap,
        h('p', { class: 'hint' }, 'Use this for door codes, key safes and WiFi passwords.'),
        h('div', { class: 'dialog-actions' }, button('Cancel', { onclick: () => close(false) }), save));
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (pictures.uploading()) return toast('Please wait until the pictures have finished uploading.', { kind: 'info' });
        busy(save, async () => {
          const tokens = pictures.tokens();
          const body = {
            category: category.value, question: question.value, answer: answer.value, sensitive: sensitive.input.checked,
            pictures: tokens, videoUrl: video.value.trim(), pictureNotes: tokens.length ? notes.value.trim() : '',
          };
          try {
            if (isNew) await api('/knowledge', { method: 'POST', body: { ...body, propertyId: propertyId ?? null } });
            else await api(`/knowledge/${entry.id}`, { method: 'PATCH', body });
            toast(isNew ? 'Entry added.' : 'Entry saved.', { kind: 'ok' });
            close(true);
          } catch (err) {
            showError(err);
          }
        });
        return undefined;
      });
      return form;
    },
  }).finally(() => pictures?.dispose());
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
      attachmentsView(k.pictures, { label: 'Picture from the knowledge base', small: true }),
      h('p', { class: 'kb-entry-meta' },
        k.videoUrl && /^https?:\/\//i.test(k.videoUrl) && h('a', { class: 'chip chip-link', href: k.videoUrl, target: '_blank', rel: 'noopener noreferrer' },
          icon('video', 14), 'Video', h('span', { class: 'visually-hidden' }, ` for ${k.question} (opens in a new tab)`)),
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

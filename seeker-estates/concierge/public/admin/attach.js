// "Add photo or video" for replies to guests: choose files, upload them, show what will be sent.
import { h, icon, toast, uploadPicture } from './lib.js';
import { preparePicture } from './knowledge.js';

const MAX_FILES = 6;
const MAX_VIDEO_BYTES = 40 * 1024 * 1024;

/**
 * Returns { el, tokens(), count(), uploading(), clear() }.
 * `onChange` runs whenever the list changes (to refresh buttons and options).
 * Booking-channel chats carry text only: pass `disabledReason` to show why there is no button.
 */
export function attachControl({ onChange = () => {}, disabledReason = '' } = {}) {
  let items = []; // { id, kind, preview, token, status: 'uploading'|'ready' }
  let ids = 0;
  const input = h('input', { type: 'file', accept: 'image/*,video/*', multiple: true, class: 'visually-hidden', tabIndex: -1, 'aria-hidden': 'true' });
  const pick = h('button', { type: 'button', class: 'btn btn-secondary btn-small' }, icon('image', 18), h('span', null, 'Add photo or video'));
  const tray = h('ul', { class: 'attach-tray', hidden: true });
  const note = h('p', { class: 'hint attach-note', role: 'status', hidden: true });
  const el = disabledReason
    ? h('div', { class: 'attach' }, h('p', { class: 'hint' }, disabledReason))
    : h('div', { class: 'attach' }, input, pick, tray, note);

  const say = (text) => {
    note.textContent = text;
    note.hidden = !text;
  };
  const render = () => {
    tray.replaceChildren(...items.map((item, i) => {
      const remove = h('button', { type: 'button', class: 'attach-remove', 'aria-label': `Remove file ${i + 1}` }, icon('x', 16));
      remove.addEventListener('click', () => {
        if (item.preview) URL.revokeObjectURL(item.preview);
        items = items.filter((other) => other !== item);
        render();
        onChange();
      });
      return h('li', null,
        item.kind === 'image' ? h('img', { src: item.preview, alt: `Picture ${i + 1} to send` }) : h('span', { class: 'attach-video' }, icon('video', 20), 'Video'),
        item.status === 'uploading' && h('span', { class: 'attach-busy' }, 'Uploading'),
        remove);
    }));
    tray.hidden = !items.length;
    pick.disabled = items.length >= MAX_FILES;
  };

  async function addFiles(files) {
    say('');
    for (const file of files) {
      if (items.length >= MAX_FILES) {
        say(`Up to ${MAX_FILES} files can be sent with one reply.`);
        break;
      }
      const video = file.type.startsWith('video/');
      if (video && file.size > MAX_VIDEO_BYTES) {
        say('That video is too large (40 MB at most). A shorter clip is enough.');
        continue;
      }
      let body = file;
      const item = { id: ++ids, kind: video ? 'video' : 'image', preview: '', token: '', status: 'uploading' };
      if (!video) {
        try {
          body = await preparePicture(file); // scaled down, saved as JPEG, location data dropped
        } catch (err) {
          say(err.message);
          continue;
        }
        item.preview = URL.createObjectURL(body);
      }
      items.push(item);
      render();
      onChange();
      try {
        item.token = (await uploadPicture(body)).token;
        item.status = 'ready';
      } catch (err) {
        items = items.filter((other) => other !== item);
        if (err.status !== 401) say(err.message || 'The file could not be uploaded. Please try again.');
      }
      render();
      onChange();
    }
  }

  pick.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    addFiles([...input.files]);
    input.value = ''; // so the same file can be chosen again
  });

  return {
    el,
    tokens: () => items.filter((i) => i.status === 'ready').map((i) => i.token),
    count: () => items.length,
    uploading: () => items.some((i) => i.status === 'uploading'),
    /** Stops a send while a file is still uploading. Returns true when it is safe to send. */
    ready() {
      if (!items.some((i) => i.status === 'uploading')) return true;
      toast('Please wait for the file to finish uploading.', { kind: 'info' });
      return false;
    },
    clear() {
      for (const i of items) if (i.preview) URL.revokeObjectURL(i.preview);
      items = [];
      say('');
      render();
    },
  };
}

export const CHANNEL_TEXT_ONLY = 'Photos and videos cannot be sent through Airbnb, Booking.com or email from here. Share them in the channel\'s own app.';

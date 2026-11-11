// Settings: assistant behaviour, notifications for this device, team, password, audit log.
import { api, busy, button, chip, confirmDialog, field, fill, fullTime, h, icon, loadError, loading, openDialog, pageHeader, showError, toast } from './lib.js';
import { disablePush, enablePush, pushState } from './push.js';
import { isAdmin, session } from './state.js';

const section = (title, ...content) => h('section', { class: 'card section' }, h('h2', null, title), content);

/** Connection status of the AI model and Smoobu. */
function statusSection() {
  const demo = session.llmMode === 'mock';
  return section('System',
    h('ul', { class: 'status-list' },
      h('li', null, demo
        ? chip('Demo mode: no AI model connected', { tone: 'warn', icon: 'alert' })
        : chip('AI model connected', { tone: 'ok', icon: 'check' }),
        demo && h('p', { class: 'hint' }, 'Replies come from a simple keyword matcher for demonstration. Do not use this with real guests.')),
      h('li', null, session.smoobuMode === 'live'
        ? chip(session.smoobuInbox ? 'Smoobu connected, including guest messages' : 'Smoobu connected', { tone: 'ok', icon: 'check' })
        : chip('Smoobu not connected', { tone: 'neutral', icon: 'info' }),
        session.smoobuMode !== 'live' && h('p', { class: 'hint' }, 'Properties and bookings are not being synced.'))));
}

/** Assistant settings. Read-only for agents. */
function assistantSection() {
  const body = h('div', null, loading('Loading settings'));
  const admin = isAdmin();

  async function load() {
    let settings;
    try {
      ({ settings } = await api('/settings'));
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    const number = (value, min, max) => h('input', { type: 'number', value, min, max, step: 1, inputMode: 'numeric', required: true, disabled: !admin });
    const inputs = {
      defaultMode: h('select', { disabled: !admin },
        h('option', { value: 'learning', selected: settings.defaultMode === 'learning' }, 'Learning: every answer is approved first'),
        h('option', { value: 'auto', selected: settings.defaultMode === 'auto' }, 'Auto: confident answers go out directly')),
      botName: h('input', { type: 'text', value: settings.botName, required: true, maxLength: 200, disabled: !admin }),
      officeHours: h('input', { type: 'text', value: settings.officeHours, maxLength: 200, disabled: !admin }),
      emergencyContact: h('input', { type: 'text', value: settings.emergencyContact, maxLength: 200, disabled: !admin, inputMode: 'tel' }),
      accessInfoHours: number(settings.accessInfoHours, 0, 336),
      retentionDays: number(settings.retentionDays, 7, 730),
      holdingMinutes: number(settings.holdingMinutes, 1, 240),
      checkinPortalNote: h('textarea', { rows: 4, maxLength: 800, disabled: !admin }, settings.checkinPortalNote),
    };
    const save = button('Save settings', { variant: 'primary', type: 'submit' });
    const form = h('form', { class: 'form form-grid' },
      !admin && h('p', { class: 'note span-2' }, icon('lock', 16), 'Only administrators can change these settings.'),
      h('div', { class: 'span-2' }, field('Default mode', inputs.defaultMode, { hint: 'Used by every property set to "Default".' })),
      field('Assistant name', inputs.botName, { hint: 'How the assistant introduces itself to guests.' }),
      field('Office hours', inputs.officeHours, { hint: 'Told to guests when they ask for a person.' }),
      field('Emergency contact', inputs.emergencyContact, { hint: 'Out-of-hours phone number the assistant may give for urgent issues.' }),
      field('Release access details (hours before check-in)', inputs.accessInfoHours, { hint: 'Door codes and WiFi are given to verified guests from this point. 0 to 336.' }),
      field('Keep conversations (days)', inputs.retentionDays, { hint: 'Chats are erased this long after the last message. 7 to 730.' }),
      field('Holding note window (minutes)', inputs.holdingMinutes, { hint: 'The "checking with the team" note is not repeated within this time. 1 to 240.' }),
      h('div', { class: 'span-2' }, field('Online check-in page (ChargeAutomation)', inputs.checkinPortalNote, { hint: 'What guests find on their online check-in page and when. The assistant sends each verified guest their own link and explains this.' })),
      admin && h('div', { class: 'span-2 actions' }, save));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (inputs.defaultMode.value === 'auto' && settings.defaultMode !== 'auto') {
        const ok = await confirmDialog({
          title: 'Make auto the default?',
          message: 'Every property set to "Default" will start sending confident answers to guests without anyone on the team checking them first. Properties set to Learning are not affected.',
          confirmLabel: 'Make auto the default',
        });
        if (!ok) return;
      }
      busy(save, async () => {
        const body = Object.fromEntries(Object.entries(inputs).map(([k, input]) => [k, input.type === 'number' ? Number(input.value) : input.value.trim()]));
        try {
          ({ settings } = await api('/settings', { method: 'PATCH', body }));
          toast('Settings saved.', { kind: 'ok' });
        } catch (err) {
          showError(err);
        }
      });
    });
    fill(body, form);
  }
  load();
  return section('Assistant', body);
}

/** Notifications on this device, with the reason when they cannot be switched on. */
function notificationsSection() {
  const body = h('div', { class: 'stack' }, loading('Checking this device'));
  const test = button('Send test', { icon: 'send' });
  test.addEventListener('click', () => busy(test, async () => {
    try {
      const out = await api('/push/test', { method: 'POST' });
      toast(out.devices ? `Test sent to ${out.devices} ${out.devices === 1 ? 'device' : 'devices'} across the team.` : 'No device has notifications switched on yet.', { kind: out.devices ? 'ok' : 'info' });
    } catch (err) {
      showError(err);
    }
  }));

  async function render() {
    const state = await pushState().catch(() => 'unsupported');
    const act = (label, variant, iconName, fn, done) => {
      const btn = button(label, { variant, icon: iconName });
      btn.addEventListener('click', () => busy(btn, async () => {
        try {
          await fn();
          toast(done, { kind: 'ok' });
        } catch (err) {
          toast(err.message, { kind: 'error' });
        }
        await render();
      }));
      return btn;
    };
    const views = {
      on: () => [
        h('p', null, chip('On for this device', { tone: 'ok', icon: 'bell' })),
        h('p', null, 'You are alerted here when a reply needs approval, when the assistant has a question, and straight away for maintenance and urgent issues.'),
        h('div', { class: 'actions' }, test, act('Turn off on this device', 'secondary', 'x', disablePush, 'Notifications are off on this device.'))],
      off: () => [
        h('p', null, chip('Off for this device', { icon: 'bell' })),
        h('p', null, 'Turn notifications on to be alerted when a reply needs approval or a guest reports a problem. Your browser will ask for permission.'),
        h('div', { class: 'actions' }, act('Turn on notifications', 'primary', 'bell', enablePush, 'Notifications are on for this device.'))],
      blocked: () => [
        h('p', null, chip('Blocked in this browser', { tone: 'danger', icon: 'alert' })),
        h('p', null, 'Notifications for this site were refused. Allow them in the browser or phone settings for this site, then come back to this screen.')],
      'ios-install': () => [
        h('p', null, chip('Add to Home Screen first', { tone: 'warn', icon: 'info' })),
        h('p', null, 'On iPhone and iPad, notifications only work once the app is on your Home Screen:'),
        h('ol', { class: 'steps' },
          h('li', null, 'Tap the Share button in Safari.'),
          h('li', null, 'Choose "Add to Home Screen".'),
          h('li', null, 'Open Seeker Concierge from the Home Screen, sign in and return to Settings to turn notifications on.'))],
      unsupported: () => [
        h('p', null, chip('Not available in this browser', { tone: 'warn', icon: 'info' })),
        h('p', null, 'This browser does not support notifications. Use a current version of Chrome, Edge, Firefox or Safari.')],
    };
    fill(body, views[state]());
  }
  render();
  return section('Notifications', body);
}

/** Team members; administrators can add and remove. */
function teamSection() {
  const body = h('div', null, loading('Loading the team'));
  const admin = isAdmin();

  function addDialog() {
    return openDialog({
      title: 'Add a team member',
      build: (close) => {
        const name = h('input', { type: 'text', required: true, autocomplete: 'off' });
        const email = h('input', { type: 'email', required: true, autocomplete: 'off', autocapitalize: 'none' });
        const password = h('input', { type: 'text', required: true, minLength: 10, autocomplete: 'off' });
        const role = h('select', null,
          h('option', { value: 'agent' }, 'Team member: inbox, conversations, knowledge'),
          h('option', { value: 'admin' }, 'Administrator: also settings and team'));
        const save = button('Add team member', { variant: 'primary', type: 'submit' });
        const form = h('form', { class: 'form' },
          field('Name', name), field('Email', email),
          field('Temporary password', password, { hint: 'At least 10 characters. Share it privately and ask them to change it after signing in.' }),
          field('Role', role),
          h('div', { class: 'dialog-actions' }, button('Cancel', { onclick: () => close(false) }), save));
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          busy(save, async () => {
            try {
              await api('/users', { method: 'POST', body: { name: name.value, email: email.value, password: password.value, role: role.value } });
              toast(`${name.value.trim()} was added.`, { kind: 'ok' });
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

  async function load() {
    let users;
    try {
      ({ users } = await api('/users'));
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
      return;
    }
    const add = admin ? button('Add team member', { icon: 'plus' }) : null;
    add?.addEventListener('click', async () => { if (await addDialog()) load(); });
    fill(body,
      h('ul', { class: 'user-list' }, users.map((u) => {
        const self = u.id === session.user.id;
        const remove = admin && !self ? button('Remove', { variant: 'ghost', small: true, icon: 'trash', 'aria-label': `Remove ${u.name}` }) : null;
        remove?.addEventListener('click', async () => {
          const ok = await confirmDialog({
            title: `Remove ${u.name}?`,
            message: `${u.name} (${u.email}) will be signed out and will no longer be able to use the team app.`,
            confirmLabel: 'Remove team member', danger: true,
          });
          if (!ok) return;
          try {
            await api(`/users/${u.id}`, { method: 'DELETE' });
            toast(`${u.name} was removed.`, { kind: 'ok' });
            load();
          } catch (err) {
            showError(err);
          }
        });
        return h('li', null,
          h('div', null,
            h('p', null, h('strong', null, u.name), self && ' (you)'),
            h('p', { class: 'muted' }, u.email),
            h('p', { class: 'user-chips' },
              chip(u.role === 'admin' ? 'Administrator' : 'Team member', { icon: u.role === 'admin' ? 'shield' : 'user' }),
              u.notifications ? chip('Notifications on', { tone: 'ok', icon: 'bell' }) : chip('Notifications off', { icon: 'bell' }))),
          remove);
      })),
      add && h('div', { class: 'actions' }, add));
  }
  load();
  return section('Team', body);
}

function passwordSection() {
  const current = h('input', { type: 'password', autocomplete: 'current-password', required: true });
  const next = h('input', { type: 'password', autocomplete: 'new-password', required: true, minLength: 10 });
  const save = button('Change password', { type: 'submit' });
  const form = h('form', { class: 'form' },
    // Lets password managers attach the new password to the right account.
    h('input', { type: 'text', autocomplete: 'username', value: session.user.email, readOnly: true, class: 'visually-hidden', tabIndex: -1, 'aria-hidden': 'true' }),
    field('Current password', current),
    field('New password', next, { hint: 'At least 10 characters. Changing it signs you out on every other device.' }),
    h('div', { class: 'actions' }, save));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    busy(save, async () => {
      try {
        await api('/password', { method: 'POST', body: { current: current.value, next: next.value } });
        form.reset();
        toast('Password changed. Your other devices have been signed out.', { kind: 'ok' });
      } catch (err) {
        showError(err);
      }
    });
  });
  return section('Change password', form);
}

/** Audit log, loaded only when opened. */
function auditSection() {
  const body = h('div');
  const details = h('details', { class: 'audit' }, h('summary', null, 'Show the latest 200 actions'), body);
  async function load() {
    fill(body, loading('Loading the audit log'));
    try {
      const { entries } = await api('/audit');
      fill(body, entries.length
        ? h('div', { class: 'table-wrap', tabIndex: 0, role: 'region', 'aria-label': 'Audit log' },
          h('table', null,
            h('thead', null, h('tr', null, ['When', 'Who', 'Action', 'Detail'].map((t) => h('th', { scope: 'col' }, t)))),
            h('tbody', null, entries.map((a) => h('tr', null,
              h('td', null, h('time', { dateTime: a.at }, fullTime(a.at))), h('td', null, a.user), h('td', null, a.action), h('td', null, a.detail || ''))))))
        : h('p', { class: 'muted' }, 'Nothing recorded yet.'));
    } catch (err) {
      if (err.status !== 401) fill(body, loadError(err, load));
    }
  }
  details.addEventListener('toggle', () => { if (details.open) load(); });
  return section('Audit log', h('p', { class: 'muted' }, 'Who approved, edited, answered and changed what.'), details);
}

/** Settings screen. `onSignOut` is provided by the app shell. */
export function settingsView({ onSignOut }) {
  const signOut = button('Sign out', { icon: 'logout' });
  signOut.addEventListener('click', () => busy(signOut, onSignOut));
  const el = h('div', { class: 'page page-narrow' },
    pageHeader('Settings', { sub: `Signed in as ${session.user.name} (${session.user.email})` }),
    statusSection(),
    notificationsSection(),
    assistantSection(),
    teamSection(),
    passwordSection(),
    isAdmin() && auditSection(),
    section('Sign out', h('p', { class: 'muted' }, 'Signing out also turns off notifications on this device.'), h('div', { class: 'actions' }, signOut)));
  return { el };
}

// Sign-in, and first-run setup (creating the administrator).
import { api, busy, button, field, h } from './lib.js';

/**
 * Sign-in screen, or the setup form when no team member exists yet.
 * `onSignedIn()` is called once a session cookie is set. `notice` explains why the
 * person is here again (for example, their session ended).
 */
export function authView({ setup, onSignedIn, notice }) {
  const needsSetup = setup.needsSetup;
  const error = h('p', { class: 'form-error', role: 'alert', hidden: true });
  const name = h('input', { type: 'text', autocomplete: 'name', required: true });
  const email = h('input', { type: 'email', autocomplete: 'username', required: true, inputMode: 'email', autocapitalize: 'none' });
  const password = h('input', { type: 'password', autocomplete: needsSetup ? 'new-password' : 'current-password', required: true, minLength: needsSetup ? 10 : null });
  const setupCode = h('input', { type: 'text', autocomplete: 'off', required: true, autocapitalize: 'none' });
  const submit = button(needsSetup ? 'Create administrator' : 'Sign in', { variant: 'primary', type: 'submit' });

  const form = h('form', { class: 'form' },
    needsSetup && field('Your name', name),
    field('Email', email),
    field('Password', password, needsSetup ? { hint: 'At least 10 characters.' } : {}),
    needsSetup && setup.setupCodeRequired && field('Setup code', setupCode, { hint: 'Printed in the server log when the service starts' }),
    error,
    submit);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    busy(submit, async () => {
      error.hidden = true;
      const body = needsSetup
        ? { name: name.value, email: email.value, password: password.value, ...(setup.setupCodeRequired ? { setupCode: setupCode.value.trim() } : {}) }
        : { email: email.value, password: password.value };
      try {
        await api(needsSetup ? '/setup' : '/login', { method: 'POST', body, quiet401: true });
        onSignedIn();
      } catch (err) {
        error.textContent = err.message;
        error.hidden = false;
        (err.status === 403 ? setupCode : password).focus();
      }
    });
  });

  return h('main', { class: 'auth' },
    h('div', { class: 'auth-card' },
      h('img', { src: '/shared/logo.svg', alt: 'Seeker Estates', class: 'auth-logo', width: 205, height: 66 }),
      h('h1', null, needsSetup ? 'Set up Seeker Concierge' : 'Seeker Concierge'),
      h('p', { class: 'muted' }, needsSetup
        ? 'Create the first administrator account. You can add the rest of the team afterwards in Settings.'
        : 'Team sign-in'),
      notice && h('p', { class: 'banner', role: 'status' }, notice),
      form));
}

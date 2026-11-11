// Fills the privacy notice with the live settings (company name, retention period, contact).
// If the request fails, the wording already in privacy.html stands.

const back = document.getElementById('back');
if (history.length > 1) {
  // Return to the exact chat the guest came from (the QR link), not the general one.
  back.addEventListener('click', (event) => {
    event.preventDefault();
    history.back();
  });
}

try {
  const res = await fetch('/api/guest/welcome', { credentials: 'same-origin' });
  if (res.ok) fill((await res.json()).about);
} catch {
  // Offline: keep the fallback text.
}

function fill(about) {
  for (const node of document.querySelectorAll('[data-fill="company"]')) node.textContent = about.company;
  for (const node of document.querySelectorAll('[data-fill="retention"]')) {
    node.textContent = `${about.retentionDays} ${about.retentionDays === 1 ? 'day' : 'days'}`;
  }
  if (about.privacyEmail) {
    const link = document.createElement('a');
    link.href = `mailto:${about.privacyEmail}`;
    link.textContent = about.privacyEmail;
    document.getElementById('contact').replaceChildren('To do so, email ', link, '.');
  }
}

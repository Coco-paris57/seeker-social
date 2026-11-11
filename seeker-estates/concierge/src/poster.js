// Print-ready QR card for a property. Styles and the print button live in /shared/poster.*
// so the page works under the site's content security policy (no inline code).
import { config } from './config.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function posterHtml({ property, qrSvg, settings }) {
  const name = property.display_name || property.name;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>QR card · ${esc(name)}</title>
<link rel="stylesheet" href="/shared/poster.css">
</head>
<body>
<div class="toolbar" data-noprint>
  <p><strong>${esc(property.ref ? `${property.ref} · ` : '')}${esc(name)}</strong> · A5 portrait. Print at 100% scale, or save as PDF.</p>
  <button type="button" id="print">Print</button>
</div>
<main class="card">
  <div class="frame">
    <header>
      <img src="/shared/logo.png" alt="${esc(config.company.name)}" class="logo">
      <span class="label">Guest assistance</span>
    </header>
    <h1>Need a hand during your stay?</h1>
    <p class="lead">Scan to chat with ${esc(settings.botName)}. Check-in and checkout, WiFi, how the appliances work, getting around, or to report a problem.</p>
    <div class="qr">${qrSvg}</div>
    <ol class="steps">
      <li>Open your phone camera</li>
      <li>Point it at the code</li>
      <li>Tap the link. No app to install</li>
    </ol>
    <footer>
      <p>Answers in your language, with our team on hand. In an emergency call 999.</p>
      <p class="url">${esc(config.baseUrl.replace(/^https?:\/\//, ''))}/g/${esc(property.qr_token)}</p>
    </footer>
  </div>
</main>
<script src="/shared/poster.js"></script>
</body>
</html>`;
}

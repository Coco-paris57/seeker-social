# Seeker Concierge HTTP API

All API routes are under `/api`, send and receive JSON, and are same-origin only. State-changing
requests must have `Content-Type: application/json` (send `{}` when there is no body) or they get
`415`. Errors are `{ "error": "<sentence safe to show the person>" }` with a 4xx/5xx status.
Sessions are httpOnly cookies set by the server: use `fetch(url, { credentials: 'same-origin' })`
and never handle tokens in JavaScript. Timestamps are ISO 8601 UTC strings.

Content security policy: `default-src 'self'`, `style-src 'self'`, `script-src 'self'`. No inline
`<script>`, no inline event handlers, no inline `<style>` and no `style="..."` attributes in HTML
(setting `element.style.x` from JavaScript is allowed). No third-party hosts.

Pages: `/g/<qrToken>` and `/stay` both serve `public/guest/index.html`; `/privacy` serves
`public/guest/privacy.html`; `/admin/` serves `public/admin/index.html`. Static files are served
from `public/` (`/guest/*`, `/admin/*`, `/shared/*`). `/admin/sw.js` is served with
`Service-Worker-Allowed: /admin/`.

Shared assets: `/shared/fonts.css` (Lora 600/700, Poppins 400/500/600), `/shared/logo.png`
(navy mark, transparent, for light grounds), `/shared/logo-tile.png` (mark in a white tile, for
dark grounds), `/shared/icon-192.png`, `/shared/icon-512.png`, `/shared/icon-maskable-512.png`,
`/shared/apple-touch-icon.png`, `/shared/badge-96.png`.

## Guest API (`/api/guest`)

`about` object (returned by several calls):
`{ company, botName, officeHours, emergencyContact|null, retentionDays, accessInfoHours, privacyEmail|null, maxMessageLength }`

`conversation` object:
`{ id, verified, property: {name, area}|null, guestFirstName|null, stay: {arrival, departure, checkIn, checkOut}|null, stage: 'unknown'|'before_arrival'|'during_stay'|'after_stay', accessReleased, teamHasTakenOver }`

`message` object: `{ id, role: 'guest'|'assistant'|'team', text, kind: 'answer'|'holding'|'urgent'|'relay', at }`.
`text` is plain text with newlines (render with `white-space: pre-wrap`, never as HTML).

| Call | Body / query | Returns |
|---|---|---|
| `GET /welcome?p=<qrToken>` | `p` optional (absent on `/stay`) | `{ about, property: {name, area}|null, hasSession }`. `404` if the QR code is not active. `hasSession` true means `GET /me` will work and the chat can be resumed. |
| `POST /session` | `{ qrToken?: string, consent: true }` | `201 { conversation, messages: [], about }`. Starts a chat and sets the cookie. `400` without consent. |
| `GET /me` | | `{ conversation, messages, about }`. `401` when there is no chat on this device. |
| `POST /verify` | `{ lastName, arrivalDate: 'YYYY-MM-DD' }` | `{ conversation }` now verified. `404` no match (same message for every failure), `429` too many attempts, `400` bad input. |
| `GET /messages` | | `{ messages }`, the whole chat in display order. Refetch it on every `message` event: an approved answer can have a lower id than a note already on screen, so do not page by id. |
| `POST /messages` | `{ text }` (1 to `maxMessageLength` chars) | `202 { message }`. The reply arrives later through the stream. `403` when the chat has no property yet (opened from `/stay` and not verified: the guest must verify first). `429` when sending too fast, `503` when the service is overloaded (show the message). |
| `GET /stream` | Server-sent events | Events: `message` (call `GET /messages`), `typing` with data `{on: boolean}`, `conversation` (call `GET /me`). Reconnect and refetch on error. |
| `POST /erase` | `{}` | `{ ok }`. Deletes the chat and all its messages; cookie cleared. |
| `POST /leave` | `{}` | `{ ok }`. Clears the cookie only. |

`GET /g/<qrToken>/manifest.webmanifest` is a per-property web app manifest (not under `/api`).

Behaviour to design for:
- In learning mode the guest first gets a fixed-wording `holding` message ("confirming with the
  team") and the real answer arrives minutes later once a team member approves it. In auto mode answers arrive
  in a few seconds. `typing` is on while the assistant is working.
- Door codes, key-safe and WiFi details are only given to verified guests from `accessInfoHours`
  before check-in. An unverified guest can still chat about everything else.
- A message with role `team` was written by a person; `assistant` is the AI.

## Team API (`/api/admin`)

Sign-in:

| Call | Body | Returns |
|---|---|---|
| `GET /setup` | | `{ needsSetup, setupCodeRequired }`. `needsSetup` is true when no team member exists yet. `setupCodeRequired` is true in production: the form must also ask for the setup code printed in the server log. |
| `POST /setup` | `{ email, name, password, setupCode? }` (password 10+ chars; `403` on a wrong code) | `201 { user }`, signed in as administrator. Only works while `needsSetup`. |
| `POST /login` | `{ email, password }` | `{ user }`. `401` wrong details, `429` too many attempts. |
| `POST /logout` | `{}` | `{ ok }` |
| `GET /me` | | `{ user: {id, email, name, role: 'admin'|'agent'}, llmMode: 'claude'|'mock', smoobuMode: 'live'|'off', smoobuInbox: boolean, baseUrl, categories: string[] }` or `401`. |
| `POST /password` | `{ current, next }` | `{ ok }`. Signs out every other device. |

Everything below needs a signed-in session (`401` otherwise). Calls marked (admin) need role
`admin` (`403` otherwise).

Objects:

- `conversation`: `{ id, propertyId, propertyName, guestName, verified, channel: 'web'|'smoobu', language, botPaused, stage, stay: {arrival, departure, checkIn, checkOut, channel, smoobuId}|null, createdAt, lastMessageAt, lastMessage: {role, text}|null, pendingDrafts, openTickets }`
- `message`: `{ id, conversationId, role: 'guest'|'assistant'|'team', text, status: 'sent'|'pending'|'rejected', kind: 'answer'|'holding'|'urgent'|'relay', at, sentAt, confidence: 'high'|'medium'|'low'|null, category, summary, automatic, edited, original, ticketId, deliveryError, authorName }`.
  `pending` = a draft waiting for approval (not yet seen by the guest). `automatic` = sent without
  approval in auto mode. `edited`/`original` = a team member changed the draft before sending.
- `ticket` (a request to the team): `{ id, type: 'question'|'maintenance'|'urgent', category, summary, question, status: 'open'|'answered'|'closed', answer, createdAt, answeredAt, answeredByName, savedToKnowledge, conversationId, propertyId, propertyName, guestName, guestVerified, guestMessage }`
- `property`: `{ id, ref, name, displayName, area, postcode, station, mode: 'learning'|'auto'|null, effectiveMode: 'learning'|'auto', active, smoobuId, guestUrl, knowledgeCount, stats }`; the single-property call adds `{ address, notes, amenities: string[], rooms }`. `mode: null` follows the default from settings.
- `stats` (last 30 days of drafted answers): `{ days, approved, edited, rejected, automatic, reviewed, approvalRate: 0-100|null }`. `approvalRate` is the share approved without changes: the evidence for switching a property to auto.
- `knowledge`: `{ id, propertyId|null, category, question, answer, sensitive, source: 'team'|'learned', updatedAt }`. `propertyId: null` applies to every property. `sensitive` entries (door codes, WiFi) are only given to verified guests near their stay. Categories: `checkin, access, wifi, appliances, transport, local, rules, checkout, booking, maintenance, other`.

| Call | Body / query | Returns |
|---|---|---|
| `GET /inbox` | | `{ approvals: [{ draft: message, conversation, guestMessage, recentGuestMessages: string[] }], tickets: ticket[] (not closed; urgent first, then maintenance, then questions), counts: { approvals, tickets, urgent, total } }` |
| `POST /messages/:id/approve` | `{ text?: string, remember?: boolean, scope?: 'property'|'global', sensitive?: boolean }` | `{ message, knowledgeId }`. Sends the draft (with `text` if edited). `remember` saves the final text to the knowledge base; **`sensitive` defaults to true** (verified guests only), so send `sensitive: false` for answers any visitor may be told. The same `sensitive` field applies to reject and to answering a request. `409` if already handled or replaced by a newer draft. |
| `POST /messages/:id/reject` | `{ replyText?: string, remember?, scope?, sensitive? }` | `{ message|null, knowledgeId }`. Discards the draft; `replyText` is sent as a team message instead. |
| `GET /tickets?status=open\|closed\|all` | | `{ tickets }` |
| `GET /tickets/:id` | | `{ ticket }` |
| `POST /tickets/:id/preview` | `{ answer }` | `{ reply, worded }`. How the assistant would word the team's answer for the guest, in the guest's language. Nothing is sent. `worded: false` means the model was unavailable and `reply` is the answer unchanged. |
| `POST /tickets/:id/answer` | `{ answer, reply?: string, remember?: boolean, scope?: 'property'|'global', sensitive?: boolean, verbatim?: boolean, keepOpen?: boolean }` | `{ ticket, message, knowledgeId }`. `answer` is what the team told the assistant (this is what `remember` saves to the knowledge base). `reply` is the exact text to send to the guest, normally the previewed wording after any edits; without it the assistant words the answer itself and sends it (`verbatim: true` sends `answer` as written, as a team message). Closes the ticket unless `keepOpen` (useful for maintenance: update now, close when fixed). **Team app flow: in learning mode always preview first and send with `reply`, so a person has seen every word; in auto mode a one-step send is fine.** |
| `POST /tickets/:id/close` | `{}` | `{ ticket }` |
| `GET /conversations?propertyId=&q=` | | `{ conversations }` newest first (max 100). |
| `GET /conversations/:id` | | `{ conversation, messages, tickets }` (messages include pending drafts and rejected ones). |
| `POST /conversations/:id/reply` | `{ text }` | `201 { message }`. A team member writes to the guest directly. |
| `POST /conversations/:id/takeover` | `{ paused: boolean }` | `{ conversation }`. `paused: true` stops the assistant replying in this chat; the team gets a notification for each guest message. |
| `DELETE /conversations/:id` | | `{ ok }`. Erases the chat (privacy request). |
| `GET /properties` | | `{ properties, defaultMode }` |
| `POST /properties/sync` | `{}` | `{ properties, reservations }` counts pulled from Smoobu. `400` when Smoobu is not connected. |
| `GET /properties/:id` | | `{ property (full), knowledge: knowledge[] for this property }` |
| `PATCH /properties/:id` | any of `{ displayName, area, postcode, address, station, notes, active, mode }` | `{ property }` |
| `POST /properties/:id/rotate-qr` | `{}` | `{ property }` with a new `guestUrl`; the old QR code stops working. |
| `GET /properties/:id/qr.svg`, `/qr.png` | `?download=1` for a file download | The QR image (PNG is 1200 px). |
| `GET /properties/:id/poster` | | A print-ready A5 HTML page with the QR code. Open in a new tab. |
| `GET /knowledge?scope=global` or `?propertyId=` | | `{ knowledge, categories }` (no query: everything) |
| `POST /knowledge` | `{ propertyId?: number|null, category, question, answer, sensitive?: boolean }` | `201 { knowledge }`. `sensitive` defaults to true for `access` and `wifi`. |
| `PATCH /knowledge/:id` | any of the same fields | `{ knowledge }` |
| `DELETE /knowledge/:id` | | `{ ok }` |
| `GET /settings` | | `{ settings: { defaultMode, botName, accessInfoHours, retentionDays, emergencyContact, officeHours, holdingMinutes } }` |
| `PATCH /settings` (admin) | any of those | `{ settings }` |
| `GET /users` | | `{ users: [{ id, email, name, role, createdAt, notifications: boolean }] }` |
| `POST /users` (admin) | `{ email, name, password, role: 'admin'|'agent' }` | `201 { user }` |
| `DELETE /users/:id` (admin) | | `{ ok }` |
| `GET /audit` (admin) | | `{ entries: [{ id, user, action, detail, at }] }` latest 200 |
| `GET /push/key` | | `{ publicKey }` VAPID key (base64url) for `pushManager.subscribe` |
| `POST /push/subscribe` | `{ subscription: PushSubscription.toJSON() }` | `201 { ok }` |
| `POST /push/unsubscribe` | `{ endpoint }` | `{ ok }` |
| `POST /push/test` | `{}` | `{ ok, devices }`. Sends a test notification to every subscribed device. |
| `GET /stream` | Server-sent events | Events `message`, `draft`, `ticket`, `conversation`, `typing`, `properties`, `alert`. Data is `{ conversationId|null, alert? }`. Treat every event as "refetch what is on screen". `alert` carries the notification payload below. |

Push notification payload (delivered to the service worker as JSON, and as the `alert` stream
event): `{ title, body, url, tag, urgent }`. `url` is a path such as `/admin/#/inbox`,
`/admin/#/tickets/12` or `/admin/#/conversations/7`: the team app must route these hashes.

## Webhook

`POST /api/webhooks/smoobu/<SMOOBU_WEBHOOK_TOKEN>` receives Smoobu events (reservation changes and,
with `SMOOBU_INBOX=on`, guest messages from Airbnb, Booking.com and email).

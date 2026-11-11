# Seeker Concierge

Guest messaging assistant for Seeker Estates. Guests scan a QR code in the apartment (or open a
link before arrival) and chat with an AI assistant that answers from what the team has taught it.
The team supervises from a phone-friendly app with push notifications.

| Piece | Where |
|---|---|
| Guest chat (no install; can be added to the home screen) | `/g/<property code>` from the QR, `/stay` for a general link |
| Team app (installable, push notifications) | `/admin/` |
| Assistant logic | `src/bot.js` (flow), `src/llm.js` (Claude prompt and output) |
| Smoobu | `src/smoobu.js` (HMAC client), `src/sync.js`, `src/routes/webhooks.js` |
| API contract | `docs/API.md` |
| Tests | `npm test` (no network or API key needed) |

## How it works

1. A guest writes. The assistant is given only the facts it may use: the property's details from
   Smoobu, the knowledge base (this property + all properties), and the guest's booking if they
   have verified it (surname + arrival date, checked against Smoobu reservations).
2. It chooses one of four actions:
   - **Answer.** In **learning** mode the draft waits in the team inbox; a team member approves,
     edits or rejects it, and the guest sees a short "confirming with the team" note meanwhile.
     In **auto** mode a high-confidence answer is sent at once; anything less still goes to the inbox.
   - **Ask the team.** It does not know. The team gets a push notification, answers the assistant,
     and the assistant words the reply for the guest. With "Save to knowledge base" ticked the
     answer is stored for that property (or all properties) and used next time.
   - **Maintenance.** Something is broken. Always a push notification, in either mode. The team
     replies to the assistant ("plumber at 4pm") and it tells the guest.
   - **Urgent.** Safety or lock-out. The guest is told what to do now (999 where relevant) and the
     team gets an urgent notification.
3. Mode is set per property (Properties screen), with a default in Settings. Each property shows
   how many drafts were approved unchanged in the last 30 days: use that to decide when to switch
   it to auto.

**Learning mode is strict.** Nothing the assistant wrote reaches a guest until a person has seen
it: answers are approved in the inbox, and when the team answers a request they preview the
assistant's wording before it is sent. While waiting, guests in the web chat get a fixed
acknowledgement ("confirming with the team"). The one exception is an urgent safety message
(fire, gas, lock-out), which is sent immediately.

Door codes, key-safe details and WiFi passwords are marked *sensitive*. They are released only to
verified guests, from 48 hours before check-in (configurable) until checkout. Before that the
assistant is never given them, so it cannot leak them.

A team member can take over any chat (the assistant pauses) and hand it back later.

## Run it locally

```
npm install
npm run seed-demo        # demo property, booking (surname "Demo", arriving today) and knowledge
npm start                # http://localhost:8787/admin/  (first visit creates the administrator)
```

Without `ANTHROPIC_API_KEY` the assistant runs in demo mode (keyword matching), which is enough to
try every screen. With `SMOOBU_API_KEY` and `SMOOBU_API_SECRET` set, apartments and reservations
are pulled on start and every 15 minutes.

## Put it online

It is one Node process with a SQLite file, so it needs a host with a **persistent disk** and
**https** (required for push notifications and the camera-to-link QR flow). Fly.io, Render and
Railway all work with the included `Dockerfile`; mount a volume at `/data`.

0. Easiest route: on Render choose New, Blueprint and pick this repository. `render.yaml` at the
   repo root creates the service, the disk and the settings, and asks only for the keys.
1. Otherwise set the variables in `.env.example` yourself. `BASE_URL` must be the final public address **before any
   QR code is printed**, because the code contains it.
2. Deploy, open `/admin/` and create the administrator account. The form asks for a setup code:
   it is printed in the server log on first start (or set `SETUP_TOKEN` yourself). Then add the
   team in Settings.
3. Each team member opens `/admin/` on their phone and turns on notifications in Settings.
   On iPhone and iPad, add the app to the Home Screen first (Share, then Add to Home Screen):
   Apple only allows web push for installed web apps.
4. `npm run register-webhook` (once) so Smoobu sends booking changes as they happen.
5. For each property: fill in the knowledge base (check-in, access, WiFi, TV, washing machine,
   heating, bins, checkout, nearest station), then print the QR card from the property page.
6. Leave everything in learning mode. Switch a property to auto when its approval rate is high.

### Messages from Airbnb and Booking.com

With `SMOOBU_INBOX=on` and the webhook registered, guest messages that reach Smoobu from any
channel are answered through the same flow, and replies go back through Smoobu to the channel.
These conversations count as verified because the channel identifies the guest. It is off by
default: run the web chat in learning mode first, and note that Smoobu's own automated messages
keep working alongside.

## Privacy and compliance

- Guests see that they are talking to an AI assistant and accept the privacy notice (`/privacy`)
  before a chat starts. Set `PRIVACY_EMAIL` so the notice has a contact.
- Kept from Smoobu: guest name, stay dates, check-in/out times, party size, channel. Not kept:
  email, phone, prices, payments. The assistant sees the guest's first name only.
- Conversations are erased 90 days after the last message (Settings), guests can delete their own
  chat, and the team can erase any conversation. Team actions are written to an audit log.
- One strictly necessary session cookie for guests; no analytics, and guest devices make no
  third-party requests (fonts are served from this site), so no cookie banner is needed.
- The optional `NOTIFY_WEBHOOK_URL` alert carries only a title and a link, never guest text.
- Team sign-in uses scrypt password hashes and httpOnly, SameSite=Strict cookies. The API is
  same-origin, JSON-only, rate limited, and served with a strict content security policy.
- Before going live: add Anthropic and your hosting provider to your record of processors, and
  have the privacy notice checked against your existing guest privacy policy. This README is not
  legal advice.

## Limits to know about

- Text only: guests cannot send photos yet.
- The assistant states only what is in the knowledge base. A thin knowledge base means many
  questions for the team in the first weeks; that is the learning process working.
- If Claude is unreachable or declines a message, the guest gets a holding reply and the message
  goes to the team as a question, so nothing is dropped.
- Verification is surname + arrival date. Regenerate a property's QR code if it is ever shared
  publicly (Properties, Regenerate code).
- Answers saved from the inbox are for verified guests only unless you untick that option, so a
  private detail is not repeated to someone who has only scanned the QR code.
- The general link `/stay` asks guests to verify their booking before they can write. The QR
  link does not, so guests in the apartment can ask general questions straight away.
- Abuse limits: per chat, per connection, and an overall hourly ceiling (`MAX_MESSAGES_PER_HOUR`,
  default 600). Set `TRUST_PROXY` to match your host, or per-connection limits can be bypassed.
- Notifications are web push. If a phone has not opened the app for a long time the browser may
  drop its subscription; the Settings screen shows the state and can send a test.

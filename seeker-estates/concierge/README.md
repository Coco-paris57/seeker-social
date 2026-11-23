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

**Every approval teaches it.** Each reply a team member approves, corrects or writes for a
property is kept as an approved reply for that property (Properties, property page, "Approved
replies"). The assistant is given the most relevant ones with every question, so it learns what
is right for each property and how the team words it. A reply approved for a verified guest is
only reused for verified guests, and a guest's private check-in link is never stored. Remove an
approved reply there if it goes out of date; the knowledge base always takes precedence.

**Learning mode is strict.** Nothing the assistant wrote reaches a guest until a person has seen
it: answers are approved in the inbox, and when the team answers a request they preview the
assistant's wording before it is sent. While waiting, guests in the web chat get a fixed
acknowledgement ("confirming with the team"). The one exception is an urgent safety message
(fire, gas, lock-out), which is sent immediately.

Door codes, key-safe details and WiFi passwords are marked *sensitive*. They are released only to
verified guests, from 48 hours before check-in (configurable) until checkout. Before that the
assistant is never given them, so it cannot leak them.

**Online check-in (ChargeAutomation).** ChargeAutomation writes each guest's online check-in
link and its status into the Smoobu booking note, and the sync picks both up. For anything about
check-in, door codes, WiFi or the deposit, the assistant sends a verified guest their own link
and explains what appears there and when (Settings, "Online check-in page"). ChargeAutomation
keeps deciding when details are released; the assistant only points to the page. The link is
never sent to the AI model: the model writes a placeholder and the app puts the link in.

**Pictures and videos.**
- *Knowledge base:* the team can add up to six pictures and a video link to an entry (the TV
  remote, the washing machine panel). Guests get them under the answer. "Write instructions from
  the pictures" has the assistant read the pictures, identify the brand and model, and draft the
  how-to for the team to check before saving.
- *Guests* can send photos and short videos (up to 4 per message; photos are scaled down in the
  browser, videos up to 40 MB). The assistant looks at photos directly and at a few still frames
  of a video (needs `ffmpeg`, included in the Docker image), and the team sees them next to the
  request. Files live on the data disk under `uploads/` and are erased with the chat.
- *Team replies* can carry photos and a video too: when approving a draft, answering a request
  or writing in a chat. With "remember" or "Save to knowledge base" ticked, the files are kept
  with the answer and sent to the next guest who asks. Booking-channel chats are text only.

**Team-only record (ChargeAutomation API, optional).** With `CHARGEAUTOMATION_CLIENT_ID` and
`CHARGEAUTOMATION_CLIENT_SECRET` set, each sync also copies every property's WiFi details, access
code, two free-text fields and standard times from ChargeAutomation, matched by Smoobu apartment
id. It is shown on the property page for the team and never sent to a guest. The assistant is told
only whether WiFi and an access code are on file, not their values; the free-text notes are given
to it for verified guests, to reason with and not to quote. Extras a guest buys or requests
(early check-in, late checkout) arrive by webhook: paste the address shown in Settings into
ChargeAutomation, Integrations, Webhooks, for "Upsell Purchased" and "Upsell Requested".

A team member can take over any chat (the assistant pauses) and hand it back later.

**Translate to English.** Where a guest writes in another language, the Inbox and Chats show a
"Translate to English" button under their message, and one under the assistant's drafted reply
(which is written in the guest's language). The translation is shown to the team member only;
nothing is stored or sent.

**Read and unread.** A chat is unread while the guest is waiting for a real answer: a guest
message marks it unread, and a reply that is sent (not the "confirming with the team" note) marks
it read. The Chats tab shows the unread count, unread chats are highlighted, the list can be
filtered to unread, and a chat can be marked read or unread by hand. **No response needed** in an
open chat marks it read and removes the assistant's suggested reply (it is not counted as a
rejection). **Archive** hides a finished chat from the list; it is still found by search and
under the Archived filter, and it comes back by itself if the guest writes again.

### Help for the team, and the stay around the chat

- **Suggested reply.** Every request the assistant sends to the team carries its best-guess reply, marked as not confirmed. "Use this" puts it in the answer box.
- **Summary and mood.** Each chat shows one line on where it stands and a face (happy, neutral, unhappy) judged from the whole conversation. It is read again when the guest writes and, for an unhappy guest, after the team replies or closes a request. One notification when a guest turns unhappy.
- **Check-in for an unhappy guest.** The assistant proposes a follow-up message and a time (never at night). It is sent only if a team member schedules it, and is held back for a second look if the guest writes first.
- **Planned messages are checked first.** Just before a scheduled stay message or a scheduled check-in goes out, the assistant reads the conversation and gives one of three verdicts. *Send*: the conversation does not touch the topic. *Hold*: the guest or the team has clearly covered it, or something said since contradicts it; the message is not sent and stays in the chat for the team marked "Not sent" with the reason. *Ask the team*: whenever it is not sure (or the check fails); a stay message waits in the Inbox with the doubt shown, and a check-in returns as a suggestion with a notification. It never guesses.
- **To do** (main menu): everything waiting for a person. Offers worth sending (early check-in, late checkout, an extra night: only extras that are switched on, free in the calendar and not already bought, never to an unhappy guest), a check-in for each unhappy guest, a thank-you for each happy one, plus replies to approve, open requests, unread chats and knowledge suggestions. Timing: early check-in or late checkout on its own is proposed for 13:00 the day before; anything involving another night, and every combined message, for 10:00 two days before. Two offers for the same end of a stay go out as one message (late checkout with an extension, or early check-in with an earlier arrival): the check-in page link is given for the early check-in or late checkout, and for the extra nights the guest is asked to let the team know, since the check-in page cannot sell a gap of several nights. An extra night on its own links to the check-in page only when exactly one night is free. Offers are never proposed for an unhappy guest. A team member can set a chat's mood by hand in Guest and stay; it holds until the guest's next message. Each message comes with a proposed time and the reason for it; scheduling or dismissing removes it from the list, and it is checked against the conversation again before it is sent.
- **Calendar** (main menu on a computer; Properties > Calendar on a phone): every property as a row, days across, bookings coloured by channel, owner blocks, today's arrivals, departures and guests in house. Each booking shows mood, check-in form status, unread messages, extras bought and whether a message is suggested or scheduled. Free gaps of one to three nights are highlighted and can be offered to the guest either side; same-day turnovers are flagged. Two-week, month and single-property month views. Tapping a booking opens the guest card: stay, extras, what can be offered, messages to send, and the thread. Read-only: bookings are made and changed in Smoobu.
- **Offer results** (Insights > Offers sent to guests): offers sent from the To do list, how many guests accepted, and the money generated, in total and by type of offer. A purchase or request on the ChargeAutomation check-in page after an offer counts by itself, with the amount paid. Something agreed by message (an extension, for example) never reaches ChargeAutomation, so the team records it with "Guest accepted" and the amount. Extras bought without an offer are shown separately for comparison. Offers the assistant makes inside a chat are not counted.
- **Dashboard** (first in the menu, and the home screen): replies to approve, requests from the assistant, the To do count, chats needing a response, number of properties, typical time to reply; today's occupancy, arrivals, departures and missing check-in forms; arrivals for the week and guest messages per day as charts; how guests sound; share of replies sent without the team; money from offers. Settings opens from the signed-in person's name at the foot of the menu (and from a button on the dashboard on a phone).
- **Scheduled messages follow the conversation.** The moment a guest writes or the team replies, anything already scheduled for that guest (a check-in, an offer) is checked again. If the conversation now covers its topic, or the assistant is not sure, it is unscheduled straight away and returns to the To do list with the reason, and the team is notified. Only a message the conversation plainly does not touch stays scheduled.
- **On a phone** the team app has its own layout: a bottom bar of Home, Inbox, Chats, To do and More (More opens Calendar, Properties, Knowledge, Insights, Scheduled messages, Paid extras and Settings); Home as one short "Needs you" list with today in three numbers; the Inbox as two tabs; a chat with a one-line header so the messages fill the screen, with mood, summary, stay details and the chat actions in a sheet behind the "i" button; and the calendar as a day-by-day agenda or one property's month.
- **Branding** (Settings > Branding, administrators): the short name, app name, company name, two colours, logo and square icon. They replace the built-in Seeker ones everywhere: the team app, the guest chat, the QR poster, notifications and what the assistant calls the company. Each agency runs its own copy of the app; `docs/NEW-AGENCY.md` is the checklist for setting one up.
- **Glass look and movement.** Cards float over a soft background made from the brand colours; screens, charts and numbers move. Settings > Appearance (per person, per device): glass strength, animations, opening animation, compact mode, and a Garden, Sand or Evening background. Movement is off when the device asks for reduced motion. The brand colours are never changed there.
- **Dashboard on a computer:** tonight's occupancy as a ring with the guests around it (each opens their chat; red is unhappy), today's agenda, four action tiles, money from offers as a chart for 7, 30 or 90 days that reshapes in place, and who wrote the replies.
- **Search and commands:** Ctrl or Cmd + K anywhere (or Search in the menu) finds guests and their messages, properties and screens, and runs a few actions such as syncing with Smoobu.
- **Chat on a computer:** the messages have the full height; the suggested check-in, read and take-over actions and the stay details sit in the column beside them. A note shows while the assistant is writing a draft.
- **Replies sent outside the app.** When a team member answers a guest directly in the Airbnb or Booking.com app, or in Smoobu, the reply is brought into the chat here (marked "Sent outside the app") so the thread stays complete and the assistant knows what was said. It is picked up when Smoobu notifies a host message, when the chat is opened, and by a check every three minutes on chats still waiting. A draft waiting here is then compared with that reply: withdrawn if the reply covers it, flagged if unsure, kept if the reply was about something else (an automatic message, for example). When the reply really answers the guest (not an automatic template), the question and the team's answer are kept for that property as an approved reply: the assistant answers the next guest the same way, and the weekly tidy-up proposes it as a knowledge entry under Knowledge, Suggestions. The message is marked "learned from".
- **Finance** (administrators only). A menu showing, month by month, what each flat brings in: what guests paid and the booking site's fee (both from Smoobu's price for each reservation), net revenue, occupancy and our profit. Each flat has terms, set in the table: *rented by us* (a monthly rent; profit is net revenue minus rent and expenses) or *managed for an owner* (our commission is a percentage of net revenue plus 20% VAT on the commission; the VAT comes off the owner's payout and is not counted as our profit). Terms can change from a given month, so earlier months keep the old figures. Cleaning is set per flat as an amount per check-in and counted in the month the guest arrives: on a rented flat it is our cost; on a managed flat the owner is charged a cleaning charge plus 20% VAT (off their payout), our commission is worked out on the full net revenue before cleaning, and the difference between the charge and what the clean costs us is ours. Two pies summarise the portfolio: where the profit comes from (management commission, the margin on cleaning, the flats we rent) and which flats make it; a line per flat shows income against costs, and for a managed flat how much of what we keep is commission and how much is the cleaning margin. Household bills of the flats we rent (council tax, energy, internet) have their own section and count as costs of the flat. "Flats counted" lets an administrator untick a flat for a period (a first month and, optionally, a last one): it is left out of every figure for those months and counts again outside them. When one flat has two Smoobu listings, the second is set to "Same flat as another listing": both listings' bookings and expenses appear on one line and the rent or commission is counted once. Expenses are added by hand, per flat or for the business, one-off or monthly, and on managed flats can be marked as recharged to the owner. A booking across two months is shared night by night; cancelled bookings are left out. Prices for the last 18 months are fetched once; the figures hold no guest details and are kept after a booking's guest details are cleared.
- **Guest care.** From each conversation the assistant suggests up to three things worth doing for that guest, with the reason: a gift (chocolates, a bottle for an anniversary or after a failure on our side), a gesture (a cot put out, a free late checkout), a personal note to send, or something still to put right. A stay of six nights or more gets a welcome treat suggested once. They appear on the guest card in the calendar, beside the chat, and under Guest care on the To do list. "Done" or "Dismiss" takes one off the list and it is not suggested again for that guest; a note is edited in English and sent in the guest's language. Refunds, discounts and compensation are never suggested, and nothing is suggested for an enquiry.
- **Guests who write in another language.** Drafts waiting for approval are shown in English, so anyone on the team can check and correct them. "Approve & send in Portuguese" (or whichever language the guest uses) sends the reply in that language: the assistant's own wording if nothing was changed, a translation of the corrected English otherwise. "Send in English" sends the box as it is. Links, times, dates, prices and codes are swapped for placeholders before translation and put back afterwards, so they arrive exactly as typed and are not shown to the AI model. The chat composer and the reject dialog have the same option, suggested replies on requests and check-in messages for unhappy guests are written in English and translated when sent, and the chat keeps the English version that was agreed next to the message. If a translation fails, nothing is sent and the draft stays.
- **How the team writes.** The assistant studies messages the team wrote themselves (typed in the app, corrected drafts, and replies sent outside the app) and writes a short style guide: greeting, sign-off, length, tone, favourite phrases. Style only, no guest or property facts. Every reply the assistant drafts follows it. It is refreshed after every eight new team-written messages; it can be read, edited or cleared in Settings, How the team writes. An edited guide stays as written until "Learn again" is pressed.
- **Past conversations.** In the same Settings section, "Learn from all past Smoobu messages" reads the last 18 months of conversations in Smoobu once, in the background. A reply written by hand that follows a guest's message is kept as an approved reply for that property (for guests with a booking only) and counts towards the writing style. A text sent word for word to several guests is treated as a template and skipped. Any message containing a door code, lockbox code or password is left out completely: not stored, and not shown to the AI model. Nothing is added to a chat or sent to a guest. Running it again reads only conversations not read before. Messages this app sent are recognised and not added twice; a guest message whose notification was missed is picked up by the same check.
- **Enquiries.** Airbnb and Booking.com are reached only through Smoobu. If Smoobu passes on a message from someone who has not booked (a record that is not a reservation, modification or cancellation), the chat is marked "Enquiry · not booked": it never counts as a stay (no calendar bar, offers or scheduled messages), the reply always waits for approval, and the assistant gives no access details, address, prices or availability. If Smoobu sends a message without giving the booking, that is recorded (`channelUnmatched` in the settings response) so it can be seen.
- **Guest reviews.** For Airbnb and Vrbo stays (Booking.com hosts cannot review guests), a review of the guest is drafted from the conversation once they have checked out, with a suggested rating and what to verify. It appears under To do > Reviews to write for 13 days: copy it, post it on the site, mark it posted. Nothing is posted by the app.
- **Answering a gap.** On Insights, "Answer" next to a question the assistant could not answer opens a box; the team types what they know and the assistant tidies it into the right section of that property's knowledge.
- **Insights** (Properties > Insights): time to a real reply, share answered without the team, what guests ask about, the questions each property could not answer, and a per-property table.
- **Weekly tidy-up** (Knowledge > Suggestions): on Monday mornings the assistant reads the replies the team approved and proposes knowledge entries to add or update. Nothing is saved until someone accepts; a dismissed proposal is not made again.
- **Scheduled messages** (Settings > Scheduled messages): fixed texts sent at set points of a stay through the booking channel. Each is off until switched on, and waits in the Inbox for approval unless "Send without approval" is on. A message more than 12 hours late is skipped.
- **Paid extras** (Settings > Paid extras): early check-in, late checkout and an extra night, for every property or one. The assistant only offers one when the calendar allows it (other bookings and owner blocks), then sends the guest to their ChargeAutomation check-in page to add and pay for it. ChargeAutomation has no price list to read, so prices are learned from its "Upsell Purchased" and "Upsell Requested" webhooks (last single-item amount per property); a price typed by the team overrides that, and with neither the assistant says the price is shown on the page. Other extras seen through those webhooks are offered at the same property too.
- **Updates.** The team app checks the server version when it is opened or brought back to the front, and reloads itself after a deploy (or shows a Reload bar if someone is typing).

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

Off until you switch it on in the team app: Settings, "Messages from booking channels".

- **Answer messages from Airbnb, Booking.com and email.** Connects Smoobu (registers the
  webhook) and brings guest messages from every channel into the Inbox, with a notification and
  a drafted reply. Approved replies go back to the guest through Smoobu. These conversations
  count as verified because the channel identifies the guest.
- **Send channel replies without approval.** Off by default, and while it is off every channel
  reply waits for Approve & send whatever the property's mode, including the first reply to an
  urgent message. When on, channel replies follow each property's mode.

Smoobu's and ChargeAutomation's own automated messages keep working alongside.

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

- Videos take disk space: a 1 GB disk holds roughly 25 full-size videos until their chats are
  erased. Increase the disk in Render if guests send many.
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

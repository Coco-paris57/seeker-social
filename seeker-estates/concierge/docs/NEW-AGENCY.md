# Setting up the concierge for another agency

Each agency runs **its own copy** of the app: its own server, its own database, its own
connections. Nothing is shared between copies, so one agency can never see another's guests,
messages or knowledge. This is the pilot model; a shared sign-up platform would come later.

Allow about an hour per agency once you have their details.

## What the agency must have

- A **Smoobu** account (the only booking system supported).
- Optionally **ChargeAutomation** for online check-in and paid extras.
- A square icon (PNG, 512 × 512) and a wide logo (PNG or SVG), and their two brand colours.
- The email addresses of the people who will use the team app.

## What they give you

| Item | Where they find it |
| --- | --- |
| Smoobu API key and secret | Smoobu > Settings > API |
| ChargeAutomation client id and secret | ChargeAutomation > Settings > API > New OAuth Credential |
| Company legal name and a privacy contact email | Their own records |
| Urgent phone number and office hours | Their own records |

Ask for keys through a password manager or a one-time secret link, never by email or chat.

## Steps

1. **Create the service.** In Render, create a new web service from this repository (same
   settings as `render.yaml`: Docker, a 1 GB disk mounted at `/data`). Give it its own name,
   for example `harbour-concierge`. Do not reuse an existing service or disk.
2. **Set the environment variables** on the new service:
   - `ANTHROPIC_API_KEY`: use a **separate key per agency** (create one in the Claude Console
     and name it after the agency), so their AI usage shows on its own line for billing.
   - `SMOOBU_API_KEY`, `SMOOBU_API_SECRET`: the agency's.
   - `CHARGEAUTOMATION_CLIENT_ID`, `CHARGEAUTOMATION_CLIENT_SECRET`: the agency's, if used.
   - `SMOOBU_WEBHOOK_TOKEN`, `SETUP_TOKEN`: new random values for this copy. Never copy them
     from another agency.
   - `COMPANY_NAME`, `PRIVACY_EMAIL`: the agency's.
3. **Deploy**, then open `https://<service>.onrender.com/admin/` and create the first
   administrator with the `SETUP_TOKEN`.
4. **Branding.** Settings > Branding: short name, app name, company name, the two colours, the
   logo and the square icon. Save; the app reloads with their brand. Guests see it in the chat
   and on the QR poster too.
5. **Assistant.** Settings > Assistant: assistant name, urgent contact, office hours.
6. **Properties.** Properties > Sync. Check the names and addresses that came from Smoobu.
7. **Knowledge.** Add the entries that apply to every property (house rules, how bookings
   work), then the essentials per property. The assistant learns the rest from approved replies.
8. **Channel messages.** Settings > turn on "Answer messages from Airbnb, Booking.com and
   email". Leave "Send channel replies without approval" off to begin with.
9. **ChargeAutomation webhooks** (if used). Copy the address shown in Settings into
   ChargeAutomation > Integrations > Webhooks for *Online Check-in Completed*, *Upsell Purchased*
   and *Upsell Requested*, and switch each on.
10. **Team.** Settings > Team: add their people. Each adds the app to their phone's home
    screen and turns on notifications.
11. **Posters.** Print the QR poster for each property from its page.
12. **Hand over** with every property in Learning mode. They approve replies for the first
    weeks, then switch properties to Auto when the approval rate is high.

## What it costs you per agency

- Render: the web service and its disk, monthly.
- Claude: per message, on that agency's own key. Check the Console after the first month to
  set your price.
- Your time for support and for moving them to a new version (each copy redeploys from the
  same branch, so a fix reaches every agency at once).

## Before charging anyone

- A written agreement covering the service, a data processing agreement (you process their
  guests' personal data on their behalf), and what happens to the data when they leave.
- Their own privacy notice must mention the chat; the app's privacy page fills in their
  company name and contact automatically.
- Decide who answers when something breaks, and how fast.

## Not supported yet

- Booking systems other than Smoobu.
- Self-service sign-up or card billing: you set each agency up and invoice by hand.
- One login across several agencies.

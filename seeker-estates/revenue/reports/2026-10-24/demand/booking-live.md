# Booking.com live check (24 Oct 2026)

**Result: NOT CHECKED. Booking.com blocks automated access from this environment.** I could not see whether our properties are visible or available on Booking.com, or what price they show. So this check cannot confirm or rule out "not bookable on Booking.com" as the root cause of the 13–14-day gap.

## What happened (exact)
- Request (curl, 24 Oct 2026, run once, sequential): `GET https://www.booking.com/searchresults.en-gb.html?ss=Camden, London&checkin=2026-11-19&checkout=2026-11-22&group_adults=4&no_rooms=1&group_children=0&selected_currency=GBP`. The request used a Chrome 129 User-Agent and `Accept-Language: en-GB`.
- Response: **HTTP/2 202**, `server: nginx`, served by CloudFront (pop IAD61-P10, `x-cache: Miss from cloudfront`), 7,033 bytes. The page had an empty `<title>` and loaded an **AWS WAF JavaScript challenge**. The page calls `AwsWafIntegration.getToken()` and loads `/__challenge_…/challenge.js`, with `awsWafCookieDomainList = ['booking.com']`. The visible text was "This requires JavaScript. Enable JavaScript and then reload the page." It contained no listing data.
- A second request with the same URL (to read the headers) returned the same 202 challenge. I then stopped, as the brief instructed. I did not try to solve or get around the challenge, and I did not use any proxy or scraper service.
- The egress IP is in a US (Ashburn) CloudFront region, so even an unchallenged page might show US-geo prices or currency rather than UK ones.

## Web search fallback (no booking.com page load)
- Searches for the public titles ("Top-Floor 2Bed with Private Terrace in W12", "Stylish Camden 2-Bed…", "Parking & Views - 2 Bedrooms in Canary Wharf", "Stylish 2-Bed w/ Stunning View") found **no Booking.com page for any of our properties**. A booking.com-only search for 2BR flats in Shepherd's Bush W12 returned 10 other operators' listings, none of them ours, with cached prices from 2024–25.
- Inference, not evidence: search engines index Booking.com unevenly, and Camden was renamed on 21 Oct. Missing from search results does **not** mean a property is missing from Booking.com. policy.json also says never to infer channel presence from missing data.
- No Booking.com hotel ids or URLs for our properties appear in data/policy.json, data/id_map.json or reports/2026-10-21/*.md.

## What guests should see if the channel is working (from data/snapshots/2026-10-24/prices.csv)
Expected Booking.com price = Smoobu rate × 1.2 (global markup in policy.json). That is **before** stacked promotions, Genius and the 15% (7+ nights) and 20% (28+ nights) stay discounts, and **before** cleaning. The cleaning fee is £150 for P13 (policy.json). Availability below is Smoobu's view. Whether Booking.com mirrors it is exactly what could not be checked.

| Property | Test stay | Smoobu status | Smoobu total | ×1.2 rate shown before promos | Min stay |
|---|---|---|---|---|---|
| P11 Camden (Booking.com only) | 31 Oct–3 Nov | open | £615 | £738 | 2 |
| P11 | 19–22 Nov | open | £772 | £926 | 2 |
| P11 | 8–11 / 17–20 Nov | booked or blocked | – | – | – |
| P13 Shepherd's Bush (3064856) | 31 Oct–3 Nov | open | £543 | £652 | 2 |
| P13 | 8–11 Nov | open | £627 | £752 | 2 |
| P13 | 17–20 Nov | open | £627 | £752 | 2 |
| P12 Mile End | 2–5 Nov | open | £545 | £654 | 2 |
| P12 | 8–11 Nov | open | £725 | £870 | 2 |
| P20 Waterford Court | 31 Oct–3 Nov | open | £825 | £990 | 3 |
| P20 | 8–11 Nov | open | £767 | £920 | 3 |
| P20 | 17–20 Nov | open | £812 | £974 | 3 |
| P04 Barking | 8–11 Nov | open | £473 | £568 | 3 |
| P04 | 17–20 Nov | open | £463 | £556 | 3 |
| P08 Islington | 31 Oct–3 Nov | open | £482 | £578 | 2 |
| P05 / P09 | all three test stays | booked or blocked | – | – | – |

Cross-check from 21 Oct (policy.json, Corentin's manual check): Booking.com showed Shepherd's Bush 31 Oct–2 Nov, 4 guests, flexible at **£490**, against Airbnb at £488. This is the only guest-visible Booking.com price on file.

## Not checked (blocked)
- Visibility and position in search results, availability as displayed, strikethrough, Genius or promotion badges, review score and count as displayed, min-stay messages, cancellation options, and the cheapest 5–10 comparable 2BR entire apartments.

## How to close the gap (manual, about 10 minutes, Corentin on a UK browser while logged out)
1. Open the search URL above for each area (Camden, Shepherd's Bush, Mile End, Canary Wharf, Barking) with group_adults=4 and the test dates in the table. Note whether our property appears, its position, the total price shown and any badges.
2. In the Booking.com extranet, check for each property: Property → "Open/closed for bookings" status, Rates & Availability → calendar (rooms to sell > 0 on the open dates above), and Inbox or notifications for a channel-manager (Smoobu) connection error or a closure since 3 Oct.
3. Compare the shown price to the "×1.2" column. If it is well below, promotions are stacking. If it is above, there may be fees or a currency or geo issue.

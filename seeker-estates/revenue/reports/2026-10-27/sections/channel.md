## Channel parity

Run date D = 2026-10-27 (GMT). I read `data/policy.json` first and do not raise anything it settles. That covers: the 15%/20% stay discounts, Booking.com promotion stacking (I report its size only), the Visibility Booster, P13 counted as one flat, the P02/P03/P06/P07 blocks, P14, the P20 discounts, nights after the handback dates, and the deprioritised list.

**Sources**
- **Live Airbnb pages, loaded by me on 27 Oct, 07:19:46Z–07:26:34Z.** These were airbnb.co.uk search results inside a small map box around each listing. I used plain curl requests with no filters and did not work around anything. I read each listing's `structuredDisplayPrice`.
  - The log, with timestamps, guests and dates, is `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live27/log.txt`.
  - The results are the JSON files in that folder.
- **Smoobu API, GET only, signed client `rm/smoobu.py`.**
  - `/api/rates` at 07:21:07Z, 07:23:32Z and ~07:25–07:26Z. Saved as `live27/smoobu_rates*.json`.
  - `/api/reservations` with `modifiedFrom=2026-10-25`, guest fields dropped. Saved as `live27/smoobu_mod27.json`.
- `data/snapshots/2026-10-25`, `2026-10-26` and `2026-10-27`: `prices.csv`, `raw/prices_*.json` (for `last_refreshed_at`) and `reservations.csv`.
- **PriceLabs, read-only.**
  - `get_listing_prices` for 3090701, 27 Dec–2 Jan. `last_refreshed_at` is 26 Oct 18:38:13Z, before the booking at 22:01.
  - `get_customizations` for listing 3090701.
- Booking.com: **NOT CHECKED.** One plain search request at 07:22:02Z returned HTTP 202 with an AWS WAF challenge page (`live27/bk/search.html`). I did not try to get around it.
- `channel_checks.csv`: none for 27 Oct. The 26 Oct file (comp-west) has 6 Airbnb rows for P13. They are all-in totals for 2-night stays and are used only as a cross-check.

**Config status**
- In `rm/config.py`, Booking.com +15% and Airbnb 0% are confirmed in policy.
- **Vrbo +8% and Direct −10% are still unconfirmed defaults.** There is no direct-site URL.

### 1. Airbnb parity: has the uniform 0.90× at 42 days changed? No.

Expected price = Smoobu rate × (1 + 0%). The stays are 3–4 nights, so no policy stay discount applies. "Displayed" is the card's nightly breakdown total minus a £150 cleaning fee. That fee was solved again from 3- and 4-night pairs today: P13 3090701 7–10 Dec £721.50 and 7–11 Dec £921.30, both 0.900× plus £150.00 exactly; P20 the same.

| Ref | Channel | Stay (lead days) | Guests | Smoobu rate | Expected | Displayed room (card total) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 16–19 Nov (20) | 2 | 246+251+260 = £757 | £757.00 | £681.30 (£831.30) | −10.0% | FLAG | live27/p20_1619nov.json 07:25:10Z |
| P12 | Airbnb | 8–11 Dec (42) | 2 | 256+268+275 = £799 | £799.00 | £719.10 (£869.10) | **−10.0%** | FLAG | live27/p12_0811.json 07:20:21Z |
| P13 3090701 | Airbnb | 8–11 Dec (42) | 4 | 209+211+222 = £642 | £642.00 | £577.80 (£727.80) | **−10.0%** | FLAG | live27/p13_0811.json 07:20:28Z |
| P13 3064856 | Airbnb | 8–11 Dec (42) | 4 | 221+223+235 = £679 | £679.00 | £611.10 (£761.10) | **−10.0%** | FLAG | same |
| P20 | Airbnb | 8–11 Dec (42) | 2 | 317+308+310 = £935 | £935.00 | £841.50 (£991.50) | **−10.0%** | FLAG | live27/p20_0811.json 07:20:34Z |
| P13 3090701 | Airbnb | 7–10 Dec (41; same dates as 26 Oct) | 4 | 215+209+211 = £635 | £635.00 | £571.50 (£721.50) | −10.0% | FLAG | live27/p13_0710.json 07:20:09Z |
| P13 3064856 | Airbnb | 7–10 Dec (41) | 4 | 227+221+223 = £671 | £671.00 | £603.90 (£753.90) | −10.0% | FLAG | same |
| P20 | Airbnb | 7–10 Dec (41) | 2 | 310+317+308 = £935 | £935.00 | £841.50 (£991.50) | −10.0% | FLAG | live27/p20_0710.json 07:20:15Z |
| P12 | Airbnb | 7–10 Dec | 2 | — | — | NOT CHECKED: 7 Dec is now booked (Booking.com 4–8 Dec) | — | — | Smoobu rates: unavailable |
| P13 3090701 | Airbnb | 14–17 Dec (48) | 4 | £629 | £629.00 | £566.10 (£716.10) | −10.0% | FLAG | live27/p13_1417.json 07:26:18Z |
| P13 3064856 | Airbnb | 14–17 Dec (48) | 4 | £666 | £666.00 | £599.40 (£749.40) | −10.0% | FLAG | same |
| P20 | Airbnb | 14–17 Dec (48) | 2 | £819 | £819.00 | £737.10 (£887.10) | −10.0% | FLAG | live27/p20_1417.json 07:26:24Z |
| P13 3090701 | Airbnb | 21–24 Dec (55) | 4 | £677 | £677.00 | £609.30 (£759.30) | −10.0% | FLAG | live27/p13_2124.json 07:26:31Z |
| P13 3064856 | Airbnb | 21–24 Dec (55) | 4 | £716 | £716.00 | £644.40 (£794.40) | −10.0% | FLAG | same |
| P20 | Airbnb | 21–24 Dec (55) | 2 | £1,008 | £1,008.00 | £907.20 (£1,057.20) | −10.0% | FLAG | live27/p20_2124.json 07:26:34Z |
| P20 | Airbnb | 2–6 Feb (98) | 2 | 263+269+271+291 = £1,094 | £1,094.00 | **£1,094.00** (£1,244.00) | **0.0%** | ok | live27/p20_0206feb.json 07:25:41Z |
| P13 both | Airbnb | 2–6 Feb (98) | 4 | 195+199+199+208 = £801 | £801.00 | £801.00 list, then **visible "Early booking discount −£80.10"** (card £951 struck through, £870.90) | 0.0% before the visible 10% early-bird | ok (policy early-bird 10% at 60+ days) | live27/p13_0206feb.json 07:25:34Z |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge at 07:22:02Z; no `channel_checks` row | — | — | live27/bk/search.html |
| all | Vrbo | — | — | — | — | NOT CHECKED: no checks row, no page loaded | — | — | — |
| all | Direct site | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**What is unchanged since 26 Oct**
- At 41–42 days the factor is still **exactly 0.900** on P12, both P13 listings and P20.
- Cleaning is still £150.
- None of the 0.900 cards shows a strikethrough. The P13 3090701 21–24 Dec card shows £868 crossed out with "recently lowered the price", which is Airbnb's own 60-night-average label, not a discount.

**What is new: the 10% depends on lead time and is not flat on every date**
- It is present at 20, 41, 42, 48 and 55 days on every listing tested.
- It is **absent at 98 days**: P20 shows the full Smoobu rate, and P13 shows the full rate plus its *visible* 10% early-bird.
- The P13 New Year booking (made 62 days out, see section 2) paid Smoobu × 0.85 weekly × 0.90 to within 0.4%. That 0.90 is the policy early-bird, with no extra hidden 10%.
- So the hidden 10% stops somewhere between 56 and about 61 days. That boundary is inferred, not tested.
- It applies on P20 too, and P20's Airbnb Discounts page (policy, 22 Oct) has no early-bird and a last-minute discount of 0–14 days only. So it is not P20's own Airbnb discount.

**Fees and minimum stay as displayed vs Smoobu**
- Cleaning on Airbnb: £150 on P12, P13 (both listings) and P20.
- Minimum stays match Smoobu:
  - In February, P13 and P20 did not appear for 3 nights and did appear for 4 (Smoobu minimum 4).
  - P20 appeared for 3 nights in Nov and Dec (minimum 3).
- **P04 Barking Airbnb sold 1 night (19–20 Dec, £216 room, created in Smoobu 26 Oct 14:08).** PriceLabs and Smoobu had a 3-night minimum on 19 Dec in the 25, 26 and 27 Oct snapshots, and policy says never open P04 for fewer than 3 nights. Barking's separate Airbnb account is not enforcing the 3-night minimum.
- **Free-cancellation pill:** none of our cards showed "Free cancellation", in 26 Oct or 27 Oct searches, including P20, which has been on the Flexible test since 24 Oct. Other listings carry the pill on 809 of 1,855 cards in the same searches (not deduplicated). Whether P20's Flexible setting is actually live is NOT VERIFIED: the policy text is not in the server HTML, and P05 and P06 were not searched.
- **P13 twins:** Smoobu rates for 3064856 and 3090701 are now identical on 26 Dec–2 Jan and 2–5 Feb. The Airbnb cards for 2–6 Feb are identical (£951 / £870.90). Policy `P13.twin_listings` says prices must not be identical.

### 2. Paid vs PriceLabs: new bookings made 26 Oct

| Ref | Channel | Stay | Created (Smoobu) | PriceLabs on 25 Oct / 26 Oct (27 Oct snapshot, refreshed 18:35Z) | Expected room (model) | Paid room | Paid ÷ PriceLabs on 26 Oct | Gap vs expected | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| P12 | Booking.com | 4–8 Dec, 4 n, 6 adults, 38 days out | 26 Oct 18:49 | 291+303+251+251 = £1,096 / 307+320+265+265 = **£1,157** (309+323+275+273 = £1,180) | £1,157 × 1.15 = £1,330.55 | £1,116.99 (total £1,266.99 − £150 cleaning) | **0.965** (1.019 vs 25 Oct; 0.947 vs 27 Oct) | −16.1% (−£213.56) vs list | Size reported; stacking is settled | snapshots prices.csv + raw; smoobu_mod27.json |
| P13 3090701 | Airbnb | 27 Dec–3 Jan, 7 n, 3 adults + 2 children, 62 days out | 26 Oct 22:01 | Not in the 25/26 Oct snapshots, which end 24/25 Dec. PriceLabs live (refreshed 26 Oct 18:38Z, before booking): 303+348+350+352+351+327+268 = **£2,299**. Smoobu rates are identical. | £2,299 × 0.85 (weekly) = £1,954.15 | £1,766.00 (total £1,916 − £150 cleaning) | **0.768** | −9.6% (−£188.15) | Explained: × 0.90 policy early-bird (60+ days) gives £1,758.74, +0.4%. Not a leak | get_listing_prices 3090701; live27/smoobu_rates_p13ny.json; reservations.csv |

- **P12 Booking.com.**
  - Commission is £190.05, 15.0% of £1,266.99. Not a booster case. VAT is £186.16, which is the room ÷ 6.
  - This is the best Booking.com sale since the markup cut: 0.965 of PriceLabs, against 0.556–0.668 for the other four.
  - I could not match its promotion stack exactly. Mobile 10% × Genius 10% on the 26 Oct list gives £1,077.80; Genius 15% alone gives £1,130.97; Mobile alone on the 25 Oct list gives £1,134.36. None of these is exact.
  - With 6 adults no occupancy discount applies, and at 38 days out the Last Minute deal (0–30 days) does not apply.
  - This is also the 7 Dec night that blocked today's 7–10 Dec Airbnb check.
- **P13 Airbnb.**
  - Airbnb fee is £296.98, 15.5% of £1,916.
  - PriceLabs was already below its uncustomized price on these nights (£367–£473), because of seasonality "Moderately Conservative" and demand factor "Conservative" (`get_customizations` 3090701).
  - The Aggressive occupancy profile only reaches 60 days, so it did not touch these nights. It **is still on** for 3090701; the 26 Oct plan said to remove it.
- **P04 Booking.com 20–23 Nov (made 26 Oct).** The Dispatcher said this booking looks cancelled. Smoobu shows two attempts cancelled within the hour (12:09 → 12:32 and 12:45 → 14:03), then **one confirmed booking at 14:22**.
  - It paid £355.82 room for 3 nights and 4 guests, against PriceLabs 179+186+168 = £533 on 26 Oct: 0.668 of PriceLabs, 0.580 of list.
  - Commission is £72.72, 15.0% of £484.82.
  - That is the stack size only; stacking is settled.

### 3. Monitoring

**a) Booking.com bookings per day since the markup cut (+30% → +15%, 24 Oct 13:38)**

Organic bookings only; the P04 Channex import rows dated 20 Oct are excluded.

| Day (booked_on) | Bookings (confirmed now) | Nights | Room £ | Paid ÷ PriceLabs |
|---|---|---|---|---|
| 11–23 Oct (13 days before the cut) | 0 | — | — | — |
| 24 Oct (from 13:38) | 2: P12 5–12 Nov, P04 14–18 Nov | 11 | £1,370.59 | 0.64 / 0.71 (policy) |
| 25 Oct | 1: P12 26–30 Oct | 4 | £434.76 | 0.640 |
| 26 Oct | 2: P04 20–23 Nov, P12 4–8 Dec | 7 | £1,472.81 | 0.668 / 0.965 |
| 27 Oct to 07:21Z | 0 | — | — | — |
| **Since the cut (about 3.7 days)** | **5** | **22** | **£3,278.16** | — |

- That is about 1.35 bookings per day, against 0.33 per day over the 30 days before (26 Oct section) and 0 in the 13 days before.
- The only cancellation since the cut is P12 22–29 Nov (−£1,314.40, 25 Oct). Net: **+15 nights, +£1,963.76**.
- The markup cut still cannot be credited on its own. The Last Minute 10% deal was added on 24 Oct, and three of the five bookings sold at 0.64–0.67 of PriceLabs through stacked promotions.

**b) Airbnb, last 14 vs prior 14 days (promotions removed 21 Oct; monitoring runs to 4 Nov)**

P04 Airbnb rows are excluded. They appeared on 26 Oct, and one of them is a past stay (28 Sep–2 Oct) imported on that date.

| Window (booked_on) | Confirmed | Nights | Room £ | Later cancelled |
|---|---|---|---|---|
| Last 14 (13–26 Oct) | 19 | 115 | £21,979.74 | 1 |
| Prior 14 (29 Sep–12 Oct) | 13 | 94 | £13,755.37 | 4 |

- Daily confirmed, 13–26 Oct: 1, 2, 3, 2, 2, 3, 1, **0, 1, 0, 1, 0, 2, 1**.
  - 13–19 Oct: 14 in 7 days, 2.0 per day.
  - **20–26 Oct: 5 in 7 days, 0.71 per day.**
  - Since the removal (22–26 Oct): 4 in 5 days, 0.80 per day.
- Including P04 19–20 Dec, the last 14 days would be 20 bookings, 116 nights, £22,195.74.
- The slowdown started on 20 Oct, before the removal on 21 Oct. The 14-day total is still ahead of the prior 14.

**c) Airbnb flexible-cancellation test (P20, P06, P05 since 24 Oct; day 3 of 14)**

| Group | Since 24 Oct | Last 14 (13–26 Oct) | Prior 14 |
|---|---|---|---|
| Test: P20, P06, P05 | 1: P06 5–8 Nov, 3 n, £804.77 | 6 / 29 n / £8,710.60 (1 cancelled) | 5 / 25 n / £5,695.58 (1 cancelled) |
| Other Airbnb flats | 2: P08 31 Oct–5 Nov, P13 27 Dec–3 Jan (12 n, £2,442.60) | 13 / 86 n / £13,269.14 (0) | 8 / 69 n / £8,059.79 (3) |

- Not readable yet. P06's booking took its only open nights; the rest are intentionally blocked.
- There have been no test-group cancellations since 24 Oct (Smoobu modified list).
- P20 shows no "Free cancellation" pill (section 1). Confirm the setting before crediting or blaming the test.
- Compare on 7 Nov.

### 4. Net to owner per £100 base

| Channel | Basis | Guest price | Net |
|---|---|---|---|
| Booking.com, model (pack) | +15%, 15% commission | £115.00 | £97.75 |
| Booking.com, observed P12 4–8 Dec | 0.965 × PriceLabs | £96.54 | **£82.06** |
| Booking.com, observed P04 20–23 Nov | 0.668 | £66.76 | £56.75 |
| Airbnb, model (pack) | 0%, 15.5% fee | £100.00 | £84.50 |
| Airbnb, live at 20–55 days (all listings) | 0.900 | £90.00 | **£76.05** |
| Airbnb, live at 98 days (P20) | 1.000 | £100.00 | £84.50 |
| Airbnb, observed P13 New Year (weekly + early-bird) | 0.768 | £76.82 | £64.91 |
| Direct | −10% (unconfirmed) | £90.00 | £90.00 |

- The P12 Booking.com sale (£82.06) nets more than Airbnb in the same lead window (£76.05). The P04 sale (£56.75) does not.
- **Direct is not strictly the cheapest guest price.** Airbnb at 20–55 days (£90) equals the direct price.
- The pack's `channel_economics.warnings` list is still empty.

### Issues ordered by £ impact

1. **Hidden Airbnb −10% at about 20–55 days, unchanged since 26 Oct, on P12, P13 (both listings) and P20. Gone at 98 days.**
   - Cost: 10% of room on every Airbnb booking made in that window, for example £67.10 on a 3-night P13 3064856 stay on 7–10 Dec and £93.50 on P20.
   - Guests see no strikethrough.
   - Because it switches on with lead time, it behaves like a lead-time pricing rule with a window of about 56–60 days. It is not the Smoobu global price adjustment, which would apply at 98 days too.
   - Setting to check: Smoobu > Channel Manager > Airbnb > Default pricing rules ("Last minute" / lead-time rule) on all apartments. Policy records only Shepherd's Bush's rules (last-minute 10% within 14 days), and P20 sees the same 10%.
   - Then Airbnb > each listing > Pricing > Discounts. Look for a last-minute or lead-time discount of 10%.
   - If Corentin wants the discount, keep it visible (policy `airbnb_visible_discounts`) instead of hidden.
2. **Booking.com stack on P04: 0.668 × PriceLabs on 20–23 Nov (−£177 against PriceLabs).** P12 reached 0.965 on 4–8 Dec, so the deep stacks are flat- and lead-time-specific.
   - Settings: Booking.com extranet > Barking > Promotions. Check Mobile, Genius and Last Minute 10%, and the Monthly-plan minimum (policy `booking_monthly_rate_issue_24oct`, open with Booking.com).
3. **P04 Airbnb (separate account) sold 1 night against the 3-night rule.**
   - Setting: Barking's Airbnb listing > Availability > Minimum nights = 3. Also confirm whether Smoobu now pushes the minimum stay to that account (the rows were imported on 26 Oct).
4. **P13 twins identical in Smoobu and on Airbnb (26 Dec–2 Jan, 2–5 Feb).** This is a duplicate-listing risk under policy.
   - Setting: in PriceLabs, a small per-listing offset on 3090701 (for example ±2–3% via base or override). Narrow the gap, but do not make the prices equal.
5. **P13 3090701 still has the Aggressive occupancy profile and the default booking recency factor** (open item a-discount-cut).
   - Setting: PriceLabs > 3090701 > Occupancy-Based Adjustment → custom 0%; Booking Recency Factor → custom 0%.

Data gaps:
1. Booking.com, Vrbo and the direct site were not checked: AWS WAF challenge on booking.com (not circumvented), no direct URL, and no 27 Oct `channel_checks.csv`. So displayed Booking.com stacks and fees, and direct < OTA ordering on displayed prices, are NOT CHECKED.
2. The P13 New Year PriceLabs price is from a live `get_listing_prices` call. The 25 and 26 Oct snapshots end on 24/25 Dec. The `last_refreshed_at` of 26 Oct 18:38Z is before the booking, but this is not the snapshot the brief asked for.
3. The P12 4–8 Dec Booking.com promotion breakdown is unresolved. The extranet reservation screenshot is needed.
4. The upper edge of the hidden Airbnb 10% (56–97 days) was not tested directly. Airbnb's rule screen was not seen.
5. The Airbnb room/cleaning split is solved from pairs of stays, not read from an itemised page.
6. P05 and P06 were not searched today. The P20 Flexible setting is not verified on the page.
7. Vrbo +8% and Direct −10% are unconfirmed defaults.
8. Whether P04's 19–20 Dec Airbnb booking is a new booking or an import is not confirmed. It was created in Smoobu on 26 Oct 14:08, together with an imported past stay.

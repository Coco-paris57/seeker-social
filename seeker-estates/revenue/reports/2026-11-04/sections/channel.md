## Channel parity

Run date D = 2026-11-04 (Wednesday, GMT). I read `data/policy.json` first and do not re-raise what it settles: the 15%/20% stay discounts, Booking.com promotion stacking (sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, the P20 Airbnb discounts on record, nights after handback, and deprioritised items.

**Sources (all read-only)**
- **Smoobu GET.**
  - `/api/rates` at 2026-11-04T07:18:23Z for 9 apartments, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live04/smoobu_rates04.json`.
  - `/api/reservations?modifiedFrom=2026-10-01` with priceElements at 07:18:25Z, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live04/smoobu_mod04_pe.json` with guest fields dropped.
- **Reservations diff.** Full-row diff of `data/snapshots/2026-11-04/reservations.csv` against 3 Nov: exactly 2 new rows, both P11 Booking.com. No new Airbnb booking and no other change.
- **PriceLabs.**
  - `get_user_logs` (listing, 3–4 Nov): 37 entries, all Reyhan, all between 4 Nov 01:24 and 01:31Z. Nothing was logged on 3 Nov after yesterday's run.
  - `raw/prices_3064196.json` (3 and 4 Nov) and `raw/listing_data.json`.
- **Live Airbnb.** 26 plain public airbnb.co.uk searches (curl, no workarounds) between 07:18:46Z and 07:21:40Z. Files are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live04/air/` (`log.txt` plus one JSON per search).
  - **I appended 31 rows under lock to `data/snapshots/2026-11-04/channel_checks.csv`.** I copied the 3 Nov file forward first. Each row has URL, stay, guests, timestamp and Smoobu rates.
  - "Displayed room" = card total before taxes, minus cleaning. Cleaning used: P20/P13/P12 £150, P05 £195, P08 £149, synced Barking £142, P06 £129. Every 0.765/0.900 ratio below comes out to the penny with these fees.
- **Booking.com: NOT CHECKED (live).** One plain search at 07:22:40Z returned HTTP 202 with an AWS WAF challenge (`live04/bk/search.html`). I did not try to get past it. Booking.com figures below are amounts paid on Smoobu reservations, not prices displayed on the site.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
- **Config.** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS) until Corentin confirms them.
- **Push.** PriceLabs = live Smoobu on every available date for the 9 listings (0 mismatches; `prices.csv` against `/api/rates` 07:18Z). All were pushed 4 Nov 01:25–01:31Z, except P09 3318172, last pushed 3 Nov 07:37:46Z (`listing_data.json`).

### 1. Barking (P04): unsynced listing 1455876748739910219 still double-sells (day 5)

Smoobu 3562176:
- 3–6 Nov: Booking.com 161785771, confirmed, £393.18 room. **The guest is in residence; tonight and 5 Nov are still to come.**
- 6–9 Nov: Airbnb 161888271, confirmed, £355.72 room.
- Open: 9–13 Nov, 18–24 Nov, 6–19 Dec. Minimum stay 3 nights.

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 (host 551951609) | Synced 1657859794156786222 | Verdict | Source (`live04/air/`) |
|---|---|---|---|---|---|
| 4–6 Nov (2 n) | booked | not offered (1 and 2 adults) | not offered | no 2-night card; 1455's min stay is probably 3 or more (inference) | p04_0406nov 07:18:46Z, _b 07:21:40Z |
| **4–7 Nov** | booked (in residence + Airbnb) | **bookable, 3 × £171.67 = £515.00** | not offered | **DOUBLE-SELL over the in-house guest** | p04_0407nov 07:18:51Z |
| **5–8 Nov** | booked | **bookable, £514.20** | not offered | **DOUBLE-SELL** | p04_0508nov 07:21:34Z |
| **6–9 Nov** | booked (Airbnb) | **bookable, £514.20** | not offered | **DOUBLE-SELL** | p04_0609nov 07:18:59Z |
| 9–12 Nov | open, £448 | £497.00 | £484.71 card = £342.71 room (0.765) | both sell | p04_0912nov |
| 18–21 Nov | open, £492 | £525.80 | £376.37 room (0.765) | both sell | p04_1821nov |
| 6–9 Dec | open, £548 | £672.50 | £493.20 room (0.900) | both sell | p04_0609dec |
| 6–19 Dec (13 n) | open, £2,432 | £2,514.80 − weekly £239.58 = £2,275.22 | £2,330.80 − **"Weekly stay discount" £393.98 (18.0% of £2,188.80 room)** = £1,936.82 | both sell | p04_0619dec 07:19:31Z |

- **Still double-sellable: yes, fifth consecutive day.** 1455 offers every night from 4 Nov to 9 Nov, which covers both confirmed stays: **£748.90 room at risk** (393.18 + 355.72), plus relocation cost.
- **Booking on 1455: none visible.** 1455 is not in Smoobu, so its own reservations cannot be read. All of 4–9 Nov was still showing as available on its public cards at 07:18–07:21Z. That means no guest had booked those nights there as of this run, so **no double-booking has happened yet**. If a booking appears on 1455 for any night 4–8 Nov, it is a real double-booking.
- **t-p04-doublebook: NOT fixed.**

### 2. Camden (P11) Booking.com: two bookings made 3 Nov

No PriceLabs or Smoobu change was logged between 2 Nov 15:05Z and 4 Nov 01:24Z (`get_user_logs`), so the prices at booking time are those in Smoobu at 3 Nov 07:20Z.

| Booking (Smoobu id) | Made (lead) | Guests | Smoobu priceElements | PL at booking | Booking.com list (Smoobu × 1.15) | Stack | Paid ÷ PL | Paid ÷ list |
|---|---|---|---|---|---|---|---|---|
| **26–29 Nov** (162505051), confirmed | 3 Nov 19:44 (23 d) | 4 adults + 1 child | base **£680.40** (VAT £113.40 incl.), cleaning £149, commission **£149.29** | Smoobu 208+253+269 = **£730**; PriceLabs `booked_price` 207+253+269 = £729 (`raw/prices_3064196.json` 4 Nov) | £839.50 → £840 after Booking.com rounding to whole pounds (inferred) | **Mobile 10% × Genius 10% = 0.81 → £840 × 0.81 = £680.40 exactly.** No occupancy discount at 5 guests; no Last Minute at lead 23; no Early Booker | **0.932** (0.933 on £729) | 0.810: **19% off list = £159.60** |
| **12–14 Dec** (162490826), **cancelled** | 3 Nov 17:58; cancelled by 18:00:55 (about 3 min) | 4 adults | base £486.68 (VAT £81.11), cleaning £149, commission £114.42 | 323+228 = **£551** | £633.65 | Best fit: two 10% promotions (Mobile × Genius) × occupancy −5% (4 guests) = 0.7695 → £487.59, **£0.91 off, so not exact (inference)**. The lead of 39 days rules out a ≤30-day Last Minute | **0.883** | 0.768 (23% off list) |

- **12–13 Dec reopened: yes.** Smoobu shows both nights available today (£321 / £229, min 2). PriceLabs 4 Nov shows `booking_status` blank and `user_price` 322/230.
- **Commission: 21.9% of room = the 18% Visibility Booster charged on room + cleaning.** Each of the three Camden bookings since 2 Nov comes out at exactly 18.000% of (room + £149 cleaning):
  - 20–22 Nov: 104.24 / 579.11
  - 26–29 Nov: 149.29 / 829.40
  - 12–14 Dec: 114.42 / 635.68

  The commission rate is the booster rate (policy `booking_visibility_booster`). The extra 3.9 points come from cleaning being in the commissionable base: 18% × £149 = **£26.82 per booking**. Per policy this is not a commission anomaly. **t-p11-commission is answered by the data.** The only remaining question for Corentin is whether he accepts commission on the cleaning fee.
- The 26 Nov night sold at £208. The t-channel-gaps target of at least £219 for 26 Nov is now moot.

### 3. Live Airbnb: displayed ÷ Smoobu (hidden layers) and P05 9 Nov

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- P20: last-minute 15% at 0–14 days.
- P13: last-minute 10% within 14 days; early bird 10% at 60+ days.
- All listings: weekly 15%.

Gap = displayed room ÷ expected − 1. Flag if over 3%.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live04/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 20–23 Nov (16) | 2 | £896 | £896.00 | £685.43 (£835.43) = 0.765 | **−23.5%** | FLAG | p20_2023nov 07:20:05Z |
| P20 | Airbnb | 7–10 Dec (33) | 2 | £755 | £755.00 | £679.50 (£829.50) = 0.900 | −10.0% | FLAG | p20_0710dec |
| P20 | Airbnb | 4–7 Jan (61) | 2 | £758 | £758.00 | £758.00 (£908.00) | 0.0% | ok | p20_0407jan |
| P12 | Airbnb | 17–20 Nov (13) | 2 | £671 | £671.00 | £513.31 (£663.31) = 0.765 | **−23.5%** | FLAG | p12_1720nov 07:20:33Z |
| P12 | Airbnb | 30 Nov–3 Dec (26) | 2 | £628 | £628.00 | £480.41 (£630.41) = 0.765 | **−23.5%** | FLAG | p12_3003dec |
| P12 | Airbnb | 7–10 Dec (33) | 2 | £678 | £678.00 | £610.20 (£760.20) = 0.900 | −10.0% | FLAG | p12_0710dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (4) | 4 | £540 | £486.00 (LM10) | £413.10 (£563.10) = 0.765 | −15.0% | FLAG | p13_0811nov 07:20:49Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (4) | 4 | £480 | £432.00 (LM10) | £367.20 (£517.20) = 0.765 | −15.0% | FLAG | same |
| P13 3090701 / 3064856 | Airbnb | 9–12 Dec (35) | 4 | £671 / £633 | same | £603.90 / £569.70 = 0.900 | −10.0% | FLAG | p13_0912dec |
| P13 both | Airbnb | 4–7 Jan (61) | 4 | £580 each | £522.00 (EB10) | £522.00 (visible "Early booking discount −£58.00"), **identical on both** | 0.0% | ok | p13_0407jan |
| P05 | Airbnb | **9–10 Nov (5)** | 7 and 2 | **£1,411** (min 1, open) | £1,411.00 | 1 night £511.80 − **"Special offer" −£63.36** → room **£253.44** | **−82.0%** | FLAG | p05_0910nov_1n 07:19:44Z, _a2 07:19:47Z |
| P05 | Airbnb | 16–18 Nov (12) | 7 | £761 | £761.00 | £582.16 (£777.16) = 0.765 | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 29 Nov–2 Dec (25) | 7 | £1,601 | £1,601.00 | £1,224.75 (£1,419.75) = 0.765 | **−23.5%** | FLAG | p05_2902dec |
| P05 | Airbnb | 14–17 Dec (40) | 7 | £1,644 | £1,644.00 | £1,479.60 (£1,674.60) = 0.900 | −10.0% | FLAG | p05_1417dec |
| P05 | Airbnb | 4–7 Jan (61) | 7 | £1,266 | £1,266.00 | £1,114.08 (visible **"Early booking discount −£151.92" = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0407jan |
| P08 | Airbnb | 5–7 Nov (1) | 4 | £354 | £354.00 | £270.81 (£419.81) = 0.765 | −23.5% | FLAG | p08_0507nov 07:21:05Z |
| P06 | Airbnb | 8–11 Nov (4) | 3 | £702 | £702.00 | £537.03 (£666.03) = 0.765 | −23.5% | FLAG (intentional-block flat; layer check only) | p06_0811nov 07:21:17Z |
| P04 synced | Airbnb | 9–12 / 18–21 Nov (5 / 14) | 2 | £448 / £492 | Smoobu | £342.71 / £376.37 = 0.765 | −23.5% | FLAG | §1 |
| P04 synced | Airbnb | 6–9 Dec (32) | 2 | £548 | £548.00 | £493.20 = 0.900 | −10.0% | FLAG | §1 |
| P04 synced | Airbnb | 6–19 Dec, 13 n (32–44) | 2 | £2,432 | £2,067.20 (weekly 15%) | £1,794.82 = 0.900 × (1 − 0.18) | −13.2% | FLAG | §1 |
| P11 | Booking.com (paid, not displayed) | 26–29 Nov (23) | 5 | £730 | £839.50 | £680.40 paid | −19.0% vs list | FLAG (promotions; policy: size only) | Smoobu 162505051 |
| P11 | Booking.com (paid, cancelled) | 12–14 Dec (39) | 4 | £551 | £633.65 | £486.68 paid | −23.2% vs list | FLAG (promotions + inferred occupancy) | Smoobu 162490826 |
| all | Booking.com displayed | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:22:40Z | — | — | live04/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**The hidden 0.765 / 0.900 layers are still present on every synced listing (sixth day).**
- The multipliers are the same as before:
  - **0.765 at ≤28 days**
  - **0.900 at 32–40 days** (yesterday's boundary was 28/29)
  - **1.000 at 61+ days**
- Guests see none of these as a discount line.
- At 61+ days the only discounts are visible early-booking ones: P13 10% (policy) and P05 12% (not in policy; a-p05-earlybird still open).
- **a-airbnb-rules: NOT fixed.**

**P05 9 Nov: NOT fixed (fifth check).**
- The Airbnb card is identical to the last four checks (£316.80 room − 20% Special offer = £253.44).
- Smoobu now has £1,411 (was £1,435), and P05 was pushed 4 Nov 01:28:33Z. So the stuck price is on the Airbnb side; the Airbnb calendar itself is NOT CHECKED.

**P13 twins.** Today the two listings differ on 8–11 Nov (£480 vs £540) and 9–12 Dec (£633 vs £671), but are identical on 4–7 Jan (£580 each; the cards match to the penny). Reyhan copied new parent overrides to 3090701 at 4 Nov 01:26–01:27Z (21–26 Dec −5%, January −10%, February −10%; `get_user_logs`). This is a Reyhan-vs-policy conflict for Corentin to confirm; I am not proposing a change.

### 4. Airbnb monitoring: final line (period 21 Oct–4 Nov ends today)

**The 3 Nov closure as FAILED is confirmed.** Today's 14 vs 14 days (booked 21 Oct–3 Nov vs 7–20 Oct; `reservations.csv` 4 Nov, confirmed, room £):
- Bookings: **13 vs 23 (−43%)**
- Nights: **53 vs 164 (−68%)**
- Room: **£10,391.53 vs £28,179.02 (−63%)**
- Excluding 28+ night stays: −38% / −48% / −49%

These are identical to yesterday's figures, because no Airbnb booking was made on 3 Nov. No new test.

### 5. Booking.com since the 24 Oct markup cut (+30% → +15%, 13:38Z; 10.7 days)

Two new bookings are added to yesterday's running totals: P11 26–29 Nov (confirmed) and P11 12–14 Dec (cancelled). The P04 20–23 Nov triplicate is counted once, as before.

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | **15** | **59** | **£10,371.93** | £12,991 | **0.798** |
| Still confirmed | **12** | **50** | **£8,412.44** | £10,727 | **0.784** |
| Net of all cancellations (incl. pre-cut cancellations, carried from 3 Nov) | | **+25 n** | **+£3,361.07** | | |

- Pace: 1.4 bookings a day gross and 1.1 a day confirmed, against about 0.33 a day before the cut.
- The last 5 days brought 4 bookings (1 Nov P12, 2 Nov P11, 3 Nov P11 ×2, one of which was cancelled within about 3 minutes). The first 5.7 days brought 11.
- The rise still cannot be credited to the markup cut alone, because Last Minute 10% started the same day.
- PriceLabs-at-booking values for bookings before 3 Nov are carried from the 30 Oct, 2 Nov and 3 Nov sections.

**`rate_leak_next_30` (kpi_pack) with the VAT correction.** PriceLabs ADR on Booking.com nights excludes VAT, so I multiplied those nights by 1.2. Channel per night comes from `reservations.csv`, using the pack's own nights (`prices.csv`, 4 Nov–3 Dec).

| Flat | Pack gap | VAT-adjusted gap | Booking.com nights, adjusted | Airbnb nights |
|---|---|---|---|---|
| P11 | −27.7% | **−13.2%** | 11 n, −13.2% | — |
| P04 | −31.4% | −19.8% | 10 n, −17.1% | 2 n, −33.6% |
| P12 | −39.6% | −29.6% | 12 n, −30.7% | 2 n, −22.3% |
| P13 | −51.5% | −45.5% | 8 n, −50.5% | 3 n, −32.1% |

- The other flats are Airbnb-only in the window, so no VAT change applies: P01 −39.3%, P05 −11.3%, P06 −27.4%, P08 −37.7%, P09 −33.2%, P10 −30.0%, P20 −36.8%.
- These gaps include the policy weekly/monthly discounts and PriceLabs' own `booked_price` quirks. The parity checks above establish the causes; this table only points where to look.

### 6. Net to owner per £100 PriceLabs price (`channel_economics` in `kpi_pack.json`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com P11 26–29 Nov (0.932, 18% on room) | £93.20 | £76.42 at 18% on room; **actual £72.75** after the 18% is also charged on the £149 cleaning (room £680.40 − commission £149.29 = £531.11 on PL £730) |
| Booking.com since cut, confirmed (0.784) | £78.40 | ~£64–67 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 61+ d | £100 (P13 £90, P05 £88 visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 32–40 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb at ≤40 days is £76.50–£90, and Booking.com as sold is £78–93.
- **Booking.com as sold (about £64–67 confirmed average) nets below the Airbnb model (£84.50)** and roughly level with Airbnb's ≤28-day £64.64.

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 7. Fees, min stay and plan items

- **Cleaning** matches on every card (exact fit of the 0.765/0.900 ratios). P11 Booking.com cleaning is £149 on all three bookings.
- **t-p04-weekly / P04 weekly 18% vs 15%: NOT fixed.** On the synced listing the 6–19 Dec weekly discount is £393.98 on £2,188.80 room = **18.0%**. Policy's 15% would be £328.32, so the stay carries **£65.66 extra discount**.
- **P04 override conflict (for Corentin to confirm, not a new proposal).**
  - Reyhan added **−15% on 9–24 Nov (min 3)** at 4 Nov 01:30:39Z, plus −10% on January and February (min 4 in February).
  - Policy records Corentin's P04 override as −8% on 1–25 Nov.
  - Smoobu fell overnight: 9 Nov 167→148, 18 Nov 185→155, 24 Nov 186→176.
- **t-p20-delivery: NOT fixed as recorded.**
  - Smoobu 20–22 Nov is open (£300/£305/£291, min 3), and Airbnb sells 20–23 Nov (£835.43 card).
  - **New:** a Smoobu "Blocked channel" reservation **18–20 Nov** (162432556) was created 3 Nov 10:31Z on Waterford Court. Smoobu 18–19 Nov is now unavailable.
  - Whether the delivery moved to 18–20 Nov is for Corentin to confirm.
- **P20 min stay conflict.** Reyhan re-logged 16–19 Nov −5% with min 2 at 4 Nov 01:29:27Z. Smoobu shows 16–17 Nov at min 2, against policy P20 min stay "3 nights 25 Oct–30 Nov". For Corentin to confirm.
- **t-channel-gaps (P11): NOT fixed; two targets are worse.**
  - 26 Nov is booked at £208 (moot).
  - **23 Dec is now £298**, down from £314 and below the £316 target, despite Reyhan's +5% min 3 at 01:25:17Z.
  - **3 Jan is £188** against the £201 target.
  - Booking.com visibility is NOT CHECKED (extranet not visible).

### Issues ordered by £ impact

1. **Critical — P04 unsynced Airbnb 1455876748739910219 sells 4–9 Nov over the guest in residence (Booking.com 3–6 Nov) and the 6–9 Nov Airbnb stay.** This is day 5, with £748.90 room at risk plus relocation. No booking on 1455 is visible yet.
   **Setting:** Airbnb host 551951609 > listing 1455876748739910219 > Calendar: **block 4–8 Nov now**, then block every night while it is unsynced (or snooze the listing). Then map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or unlist it.
2. **High — hidden Airbnb layers 0.765 (≤28 d) / 0.900 (to about 60 d) on every synced listing.** Day 6. These are behind the £2,348.39 unexplained Airbnb shortfall since 21 Oct (carried from 3 Nov) and 23.5% off every short-lead Airbnb night.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (and any global rule): remove the ≤28-day and ≤60-day rules. Use visible Airbnb discounts instead (`airbnb_visible_discounts`).
3. **High — P05 9 Nov sells on Airbnb at £253.44 room against Smoobu £1,411 (fifth check).**
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom price and the Special offer, and check the Smoobu Airbnb sync log for that date.
4. **Medium — P11 Booking.com stack 19% off list (£159.60 on 26–29 Nov), plus £26.82 commission on cleaning per booking.** Stacking is policy, so this is size only. The cleaning commission needs Corentin's call.
   **Setting:** Booking.com extranet > Camden > Promotions (Mobile, Genius). The cleaning fee is commissioned under Finance > Commission.
5. **Medium — P05 visible 12% early bird** (£151.92 on 4–7 Jan). Not in policy.
   **Confirm, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird.
6. **Medium — P04 synced weekly 18% vs 15%** (£65.66 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts > Weekly: 15% (or the Smoobu Airbnb rule for 3562176).
7. **Medium — Reyhan-vs-policy conflicts, for Corentin to confirm:**
   - P04 −15% on 9–24 Nov vs −8%
   - P20 min 2 on 16–17 Nov vs min 3
   - P20 20–22 Nov delivery block absent, with a new 18–20 Nov block
   - P13 twins identical on January nights

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:22:40Z; not circumvented). The P11 stacks are inferred from paid ÷ (Smoobu × 1.15). The 26–29 Nov stack is exact on a £840 list; the 12–14 Dec stack is a best fit, £0.91 off.
2. Listing 1455's own reservations, cleaning fee and min stay: NOT CHECKED (not in Smoobu). The cards show it unbooked from 4 to 9 Nov at 07:18–07:21Z.
3. Why Airbnb prices P05 9 Nov on £316.80: NOT CHECKED (Airbnb calendar not visible).
4. Vrbo +8% and Direct −10% are unconfirmed defaults, so the direct < OTA ordering is model-only.
5. Where the Barking synced 18% weekly is set: NOT CHECKED.
6. Booking.com PriceLabs-at-booking for bookings before 3 Nov is carried from earlier sections. The VAT-adjusted rate leak assumes every Booking.com night's ADR excludes 20% VAT.

## Channel parity

Run date D = 2026-11-15 (Sunday, GMT). I read `data/policy.json` first. These are settled and are not raised again:
- the 15%/20% stay discounts and Booking.com promotion stacking (size only)
- the Camden and Shepherd's Bush Visibility Booster
- the +10% Booking.com markup and P13 = one flat
- the P02/P03/P06/P07 blocks and the P14 setup
- the deprioritised items (P09 Airbnb rules, P04 2 Dec, P12 17 Nov, P13 twin order)

**Sources (all read-only)**
- **Smoobu GET `/api/rates`**: 12 apartments, 15 Nov-28 Feb, at **2026-11-15T07:20:49Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live15/smoobu_rates15.json`. Diffed against `live14/smoobu_rates14.json` (14 Nov 07:19:19Z) and `live13/`.
- **Smoobu GET `/api/reservations?modifiedFrom=2026-11-13&showCancellation=true&includePriceElements=true`** at 07:20:50Z: 9 records, guest fields dropped. Saved to `.../live15/smoobu_mod15_pe.json`.
- **PriceLabs**: `get_user_logs` (listing, 14-15 Nov) returned **0 entries**. I also used the raw `prices_*.json` files in `data/snapshots/2026-11-14|15/raw/` for `last_refreshed_at`.
- **Live Airbnb**: 11 plain public airbnb.co.uk map searches (curl, no workarounds), 07:22:37Z-07:23:38Z. Each search has a JSON file (URL, dates, guests, timestamp) in `.../live15/air/`, plus `log.txt`. Room = card total before taxes minus cleaning: P20/P13 £150, P12 £125 for 2 nights, P05 £195, P04 synced £142, P06 £129. Every non-discount card gross reconciles to a multiple of Smoobu exactly.
- **`data/snapshots/2026-11-15/channel_checks.csv`**: copied forward from 14 Nov (1,100 lines) under `.channel_checks.csv.lock`, then **14 Airbnb rows appended** (1,114 lines).
- **Booking.com live: NOT CHECKED.** One plain search (Shepherd's Bush, 10-15 Dec, 4 adults) at 07:24:20Z got HTTP 202 with an AWS WAF challenge (`live15/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +10% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults.**

### 1. New Booking.com stays: P12 7-14 Dec and P13 18-23 Dec

Smoobu price elements (no guest data). Room = `basePrice`, VAT included (VAT element = basePrice / 6 on both).

| Smoobu id | Flat / apt | Stay | Booked | Lead | Guests | Room | Cleaning | Commission | Comm / (room + cleaning) |
|---|---|---|---|---|---|---|---|---|---|
| 162886727 | P12 2699998 | 7-14 Dec (7 n) | 14 Nov 13:51 | 23 d | 4 adults | £1,432.42 | £150 | £237.36 | **15.00%** |
| 162896042 | P13 3064856 | 18-23 Dec (5 n) | 14 Nov 22:03 | 34 d | 3 adults + 2 children | £847.10 | £150 | £179.64 | **18.02%** |

**Smoobu rate at booking.** Neither flat was refreshed or pushed between my 14 Nov 07:19Z Smoobu read and the booking:
- P12: refreshes 14 Nov 05:49Z, then 15 Nov 05:48Z.
- P13: refreshes 13 Nov 07:39Z, then 15 Nov 06:55Z.
- `get_user_logs`: 0 entries.

So the rate at booking is the 14 Nov Smoobu rate:
- P12: 259/249/267/287/317/323/287 = **£1,989**
- P13 3064856: 216/219/204/213/215 = **£1,067**

**P12 7-14 Dec: exact fit, to 1p.** Paid = Σ ceil(Smoobu × 1.10) × **Weekly 0.85 × 0.90 × 0.90 × 0.95** = 0.65407 of the Booking.com list. Script: `live15scripts/stack.py`.
- Booking.com list = 285+274+294+316+349+356+316 = **£2,190**. Paid / list 0.654; paid / Smoobu **0.720**.
- **Genius Level 2&3 (15%) did NOT apply.** Every combination with a 15% Genius layer misses. The two 10% layers are two of {Last Minute 10% (inside 30 d), Mobile 10%, Genius L1 10%}; which two cannot be told apart without the extranet breakdown (NOT CHECKED). The 0.95 matches occupancy pricing -5% for 1-4 guests (4 adults).
- **Size of the stack** (reported, not called unexplained, per `booking_stacked_promotions`):
  - Against the list after the policy weekly 15% (£1,861.50): **-£429.08**.
  - Against the Smoobu rate: **-£556.58** (-28.0%).
  - Removing the -5% occupancy layer = +£75.39. Removing one 10% layer = +£159.16.
- **Commission 15.00%.** Mile End has no booster in policy, so this is standard. Not flagged.
- **Context:**
  - Smoobu/PriceLabs now price 7-13 Dec at £2,196 (+10.4% since booking).
  - The stay fills the whole 7-13 Dec run up to the 13 Dec handback (`handbacks.P12`).
  - PriceLabs registered it in the 05:48Z refresh (ADR 170.53 = 1,432.42 / 1.2 / 7, VAT stripped).
  - Pace and a-p12-trim belong to the occupancy and pricelabs sections.

**P13 18-23 Dec: no exact fit.**
- Booking.com list = 238+241+225+235+237 = **£1,176**. Paid / list **0.7203**; paid / Smoobu **0.794**.
- The nearest clean stack is 0.90 × 0.80 (£846.72, 38p short). No combination of the policy-listed promotions reproduces it to the penny, on either twin's rates or on the 13/14/15 Nov rates (`live15scripts/p13fit.py`).
- **Active promotions per policy:**
  - Mobile 10% and Genius L1 10% (L2&3 and L3 unticked 21 Oct).
  - Last Minute 0-30 d does **not** apply at 34 d.
  - Early Booker, Domestic and EEA were switched off 21 Oct.
  - Occupancy is -0% at 5 guests.
  - Mobile × Genius L1 gives 0.81, so **£952.56 expected; paid is £105.46 (11.1%) below that.** The extra layer is NOT identified: no extranet breakdown, and the WAF blocked the live read. Corentin or the extranet reservation detail can settle it.
- **Black Friday 30% was not live.** It is bookable from 19 Nov, and this booking was made 14 Nov. From 19 Nov to 2 Dec it replaces the stack as the single largest discount for stays to 30 Apr (minus 9 dates). On this stay it would have been £823.20 (0.70 of list), £23.90 less again. Size only; this is a standing promotion.
- **Size:** -£328.90 against list (-28.0%), -£219.90 against Smoobu (-20.6%).
- **Commission 18.02%.** Check-in 18 Dec falls inside the P13 booster window (21 Oct-20 Dec), so this is expected. Not flagged.
- **Christmas window (a-peak-check):** 18-22 Dec are inside Reyhan's -5% range. Whether the £1,067 already carried it is for the pricelabs section; no log entry since 14 Nov.

**Booking.com since the 24 Oct markup cut.** Source: `reservations.csv` 15 Nov, booked_on 24 Oct or later. The P04 20-23 Nov triplicate is counted once. Room = basePrice, VAT included.

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross since cut | **24** (+2) | 99 | £17,520.78 | £3,571.78 |
| Still confirmed | **16** (+2) | 70 | £11,571.01 | £2,381.08 |
| Cancelled | 8 (unchanged) | 29 | £5,949.77 (34% of gross room) | £1,190.70 |
| Booked since +10% (12 Nov), all confirmed | **4** (P11 ×2, P12, P13) | 21 | £3,748.42 | £735.04 |
| Confirmed by flat | P04 2 / P11 5 / P12 6 / P13 3 | 7 / 17 / 29 / 17 | £830.87 / £3,120.46 / £5,143.62 / £2,476.06 | |

- Pace over 21.74 days (24 Oct 13:38Z to 15 Nov 07:20Z): **1.10 a day gross, 0.74 confirmed** (yesterday 1.06 / 0.68). Before the cut it was about 0.33 a day.
- Since the +10%: 4 bookings in about 3 days, after 0 in the 2.6 days before. Paid / Smoobu on the four: 0.762, 0.763, 0.720, 0.794. The markup is not stopping bookings; the promotion stack is still taking 21-28% below Smoobu.

### 2. New P04 Barking Airbnb 20-24 Nov (Smoobu 162894484), added to a-airbnb-rules

- **The booking:** booked 14 Nov 20:29 (6 d lead), 1 adult. Room **£489.59**, cleaning £142. Commission £97.90 = 15.50% of room + cleaning (normal Airbnb host fee).
- **Which listing: the synced one, 1657859794156786222.**
  - The booking is in Smoobu on 3562176 with channel Airbnb, and its cleaning (£142) is the synced listing's fee.
  - At 07:22:37Z the synced listing no longer appears for 20-24 Nov (`p04_2024nov`).
  - The unsynced **1455876748739910219 is still offered for the same 4 nights at £679.16** (4 × £169.79, cleaning not split). **These booked nights can be sold a second time right now.**
- **Smoobu rate at booking:** PriceLabs refreshed and pushed P04 at 14 Nov 08:42Z, before the booking, and there has been no refresh or log since. Smoobu today = PriceLabs `price` 161/164/158/157 = **£640**. (The 14 Nov 07:19Z Smoobu read of £616 was before that push, and ×0.765 only fits £640.)
- **Fit:** paid = £640 × **0.765** (£489.60, 1p off). This is the hidden 0.9 × 0.85 layer. Weekly does not apply at 4 nights. The P04 -8% override is already inside the PriceLabs price.
- **Expected by policy:** £640. **Gap -23.5%, -£150.41.**
- **a-airbnb-rules running cost: £2,906.29 + £150.41 = £3,056.70.**
- **Not yet in PriceLabs.** The P04 15 Nov raw (refresh 14 Nov 08:42Z) still shows 20-23 Nov open. The pricelabs section should sync it.
- **What is left open on 18-24 Nov:** only **18-19 Nov** (14-18 and 20-24 are booked).
  - Smoobu has them at **£175 / £165, min 2**. PriceLabs has £155 / £158, min 3, so the difference was set on the Smoobu side, and `get_user_logs` shows nothing.
  - Airbnb (synced) sells **18-20 Nov as a 2-night stay**: card £389.09, room £247.09 = 0.727 of Smoobu, which is 0.765 × a further 0.95 (not identified).
  - This **conflicts with the P04 standing rule "never open for fewer than 3 nights"** (`listing_facts.P04.min_stay_rule`). I am reporting it for Corentin to confirm, not proposing anything.

### 3. Barking unsynced Airbnb 1455876748739910219, day 16

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card; cleaning not split) | Synced 1657859794156786222 (room) | Source (`live15/air/`) |
|---|---|---|---|---|
| 20-24 Nov | **booked** (Airbnb 162894484) | **bookable £679.16** | not offered (booked) | p04_2024nov 07:22:37Z |
| 18-20 Nov | open £340, min 2 | not offered | £247.09 (card £389.09) | p04_1820nov 07:22:43Z |
| 6-19 Dec (13 n) | open £2,193 | **bookable** £2,514.80 - weekly £239.58 = **£2,275.22** (unchanged) | £1,618.43 (card £1,760.43) | p04_0619dec 07:22:52Z |

- **Not fixed on day 16, and worse today.** The unsynced listing now sells nights that are already booked (20-24 Nov), so the double-booking risk is no longer hypothetical.
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all dates now (at least 20-24 Nov), or unlist. Then map it to Smoobu 3562176.

### 4. Live checks: displayed vs expected

Expected = Smoobu × (1 + markup) × only the discounts policy recognises:
- weekly 15% (7+ n)
- P13 Airbnb: last-minute 10% within 14 d, early bird 10% at 60+ d
- P20 Airbnb: last-minute 15% at 0-14 d
- Booking.com: the list before promotions (stack reported as size)

Gap = displayed or paid / expected - 1, flagged above 3%. Cleaning is excluded from every figure.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed / paid room | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P12 | Booking.com (booking) | 7-14 Dec, 7 n (23) | 4 | £1,989 at booking | £1,861.50 (£2,190 list × 0.85 weekly) | **paid £1,432.42** | -23.0% (stack: 2×10% + occupancy 5%) | FLAG (size) | Smoobu 162886727 |
| P13 3064856 | Booking.com (booking) | 18-23 Dec, 5 n (34) | 5 | £1,067 at booking | £1,176 list | **paid £847.10** | -28.0% (0.7203; layer not identified) | FLAG | Smoobu 162896042 |
| P13 | Booking.com (open) | 10-15 Dec | 4 | £981 / £1,227 | ceil ×1.10 | NOT CHECKED: AWS WAF 07:24:20Z | - | - | live15/bk/search.html |
| P04 synced | Airbnb (booking) | 20-24 Nov (6) | 1 | £640 at booking | £640.00 | **paid £489.59** = 0.765 | -23.5% | FLAG | Smoobu 162894484 |
| P04 synced | Airbnb | 18-20 Nov, 2 n (3) | 2 | £340 | £340.00 | £247.09 (£389.09) = 0.727 | -27.3% | FLAG (+ min-2 conflict) | p04_1820nov 07:22:43Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (21) | 2 | £2,193 | £1,864.05 | £1,618.43 = 0.9 × (1 - **0.18** weekly) | -13.2% | FLAG | p04_0619dec 07:22:52Z |
| P04 unsynced 1455 | Airbnb | 20-24 Nov / 6-19 Dec | 2 | booked / open | not for sale | £679.16 / £2,275.22 card | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 14-17 Jan (60) | 7 | £1,181 | £1,181.00 | £1,039.28 (visible Early booking -£141.72 = 12.0%) | -12.0% | FLAG | p05_1417jan 07:23:22Z |
| P05 | Airbnb | 14-19 Jan, 5 n (60) | 6 | £1,923 | £1,923.00 | £1,730.70 (visible Long stay -£192.30 = 10.0%) | -10.0% | FLAG | p05_1419jan_5n 07:23:22Z |
| P06 | Airbnb | 22-24 Nov (7) | 2 | £510 | £510.00 | £390.14 (£519.14) = 0.765 | -23.5% | FLAG | p06_2224nov 07:23:33Z |
| P12 | Airbnb | 1-3 Dec (16) | 2 | £596 | £596.00 | £455.93 (£580.93, £125 cleaning) = 0.765 | -23.5% | FLAG | p12_0103dec 07:23:38Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (25) | 4 | £981 / £1,227 | same | £794.61 / £993.87 = 0.9 × visible Long stay 10% (-£88.29 / -£110.43) | -19.0% / -19.0% | FLAG | p13_1015dec_5n 07:23:18Z |
| P13 3090701 / 3064856 | Airbnb | 14-17 Jan (60) | 4 | £565 / £556 | £508.50 / £500.40 (early bird 10%) | £508.50 / £500.40 | 0.0% | ok (twins now differ by £9) | p13_1417jan 07:23:21Z |
| P20 | Airbnb | 20-23 Nov (5) | 2 | £707 | £600.95 (LM15) | £540.85 (£690.85) = 0.765 | -10.0% | FLAG (+ delivery conflict) | p20_2023nov 07:23:07Z |
| P20 | Airbnb | 14-17 Dec (29) | 2 | £855 | £855.00 | £769.50 (£919.50) = 0.900 | -10.0% | FLAG | p20_1417dec 07:23:15Z |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**Airbnb hidden layers (a-airbnb-rules): unchanged on day 17, NOT fixed.**
- The tiers are the same on every synced flat:
  - **0.765** up to 28 d
  - **0.900** at 29-59 d (P20 14-17 Dec)
  - **1.000** from 60 d, where only the visible discount applies
- On 5+ and 7+ night stays the 0.85 is replaced by the visible LOS or weekly discount (P13 10%, P04 18%), on top of the 0.9.
- **Running cost £3,056.70** (+£150.41 P04).
- If the open cards above sell as they stand, the layer costs:
  - P06 22-24 Nov: £119.86
  - P12 1-3 Dec: £140.07
  - P04 18-20 Nov: £92.91
  - P20 20-23 Nov: £60.10 (against LM15)
  - P20 14-17 Dec: £85.50
- Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list, and keep the visible discounts (`airbnb_visible_discounts`).

**Standing Airbnb items**

| Item | Status 15 Nov | Evidence |
|---|---|---|
| a-p05-earlybird: P05 12% early booking | Still on | -£141.72 = 12.0% of £1,181 on 14-17 Jan (60 d) |
| t-p05-los: P05 10% long stay from 5 n | Still on | -£192.30 = 10.0% of £1,923 on 14-19 Jan; at 60 d it replaces early booking instead of stacking |
| t-p04-weekly: P04 synced weekly 18% vs 15% | Not fixed | -£355.27 = 18.0% of £1,973.70 on 6-19 Dec; at 15% it would be £296.06, so **£59.21 over policy** |
| t-p13-los5: P13 LOS 5+ 10% | Still on, both twins | -£88.29 / -£110.43 on 10-15 Dec. Not in the 21 Oct changed rules; Corentin to confirm |
| t-p13-twins | Improving, not fixed | Smoobu: **45 open nights identical** (15 Jan-28 Feb; yesterday 47). 13-14 Jan now differ (Airbnb £565 vs £556 on 14-17 Jan). Conflict with `twin_listings` for Corentin; the fix is a PriceLabs DSO on 3090701 (pricelabs section) |
| P06 extra 15% on 5-night stays | Unidentified, NOT CHECKED | No P06 5-night run is open to test (22-24 Nov, 29 Nov, then the intentional block). The Airbnb reservation breakdown for 162877292 has not been seen |

### 5. P20 dates and P11 gap prices

**t-p20-delivery: still a conflict for Corentin, unchanged.**
- Smoobu blocks 18-19 Nov only. **20 Nov £258 and 21 Nov £234 (min 3) are open**, against policy's 20-22 Nov delivery block (`listing_facts.P20.block_20_21_nov`).
- Airbnb sells 20-23 Nov at £540.85 room (07:23:07Z).
- Min stay:
  - 15 Nov min 3.
  - **16-17 and 22-24 Nov are still min 2**, against policy min 3 until 30 Nov (`listing_facts.P20.min_stay`).
- 15-17 Nov Smoobu £200/£200/£210 is below PriceLabs (prices.csv); that belongs to the pricelabs section.
- t-p20-5dec-orphan: 5 Dec is £298, min 3, between bookings. Still unsellable.

**t-channel-gaps (P11, Booking-only): NOT fixed** (Smoobu 07:20:49Z).
- 23 Dec is **£281, min 2** (was £276; target at least £320).
- 3 Jan is **£173, min 3** (was £172; target at least £204).
- The 8 Dec 1-night orphan is still £199, min 3.
- Booking.com visibility: NOT CHECKED (WAF).

### 6. Net to owner per £100 Smoobu base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed) | £110.00 | £93.50 (15%); £90.20 at 18% booster |
| **Booking.com P12 observed (7 n, 23 d)** | **£72.02** | **£61.21** (15%); £51.01 ex-VAT |
| **Booking.com P13 observed (5 n, 34 d)** | **£79.39** | **£65.10** (18%); £54.25 ex-VAT |
| Booking.com P11 observed (4-5 n, 14 Nov section) | £76.18 | £62.47 (18%) |
| Airbnb model / live from 60 d | £100.00 | £84.50 |
| Airbnb live 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.810 (5 n LOS at 29 d or less) | £81.00 | £68.45 |
| Airbnb live 0.765 (up to 28 d; P04 booking) | £76.50 | £64.64 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty, and the model ordering holds: direct £90 < Airbnb £100 < Booking £110, and Booking nets £93.50 against Airbnb's £84.50.
- **The observed prices break both rules.**
  - Every observed Booking.com stay (£72-79) and every Airbnb card inside 60 d (£76.50-90) is below the £90 direct model.
  - **Booking.com nets less than Airbnb at the same lead:**
    - P12 7 n nets £61.21. Airbnb 7 n at 23 d would be 0.9 × 0.85 = 0.765, netting £64.64.
    - P13 5 n nets £65.10. Airbnb 5 n LOS (0.81) nets £68.45.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 15 Nov), corrected for VAT.** Booking.com ADR × 1.2; the 1 night with a blank ref is dropped (`live15scripts/vat.py`). The unadjusted run reproduces the pack to 0.1 pt. `rate_leak` compares to the PriceLabs price, not the ×1.10 list.

| Flat | Pack gap | Corrected gap | Notes |
|---|---|---|---|
| P04 | -17.5% (10 n) | **-1.0%** | all Booking.com. The 20-24 Nov Airbnb stay (0.765) is not in PriceLabs yet |
| P11 | -23.1% (12 n) | **-7.7%** | all Booking.com |
| P12 | -33.2% (15 n) | **-20.7%** | Booking.com -20.0% (14 n, includes 7-13 Dec); Airbnb -31.1% (1 n) |
| P13 | -42.0% (16 n) | **-36.1%** | Booking.com -42.3% (10 n); Airbnb -26.0% (6 n) |

- Airbnb-only flats need no correction: P01 -37.0%, P05 -7.3%, P06 -33.7%, P09 -24.7%, P10 -21.9%, P20 -45.0%.
- VAT effect today is 13.3-16.5 points on P04/P11/P12 Booking.com nights, and 9.6 on P13 Booking.com. That is at or above the 8-14 in the brief.

### 7. Fees and min stay

- **Cleaning:**
  - Every synced Airbnb card reconciles to Smoobu plus the fee on record (P04 £142, P06 £129, P05 £195, P13/P20 £150, P12 £125 for 2 nights).
  - Booking.com cleaning in price elements: P12 £150, P13 £150 (matches the 21 Oct change), P11 £149.
  - **P04 Booking.com 161276416 (14-18 Nov) was modified 14 Nov 11:02Z and now carries a £129 cleaning element.** Barking's Airbnb fee is £142; the Booking.com Barking fee is not on record, so NOT CHECKED.
- **Min stay as displayed matches Smoobu:**
  - P04 18-20 Nov offered as 2 nights. This matches Smoobu min 2 but conflicts with policy (section 2).
  - P06 22-24 Nov offered as 2 nights.
  - P20 20-23 Nov offered at min 3.
- On the unsynced P04 1455 listing, cleaning and min stay are NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: hidden Airbnb layers, day 17 (a-airbnb-rules).** Running cost **£3,056.70** (+£150.41: P04 20-24 Nov paid 0.765).
   - Today's cards show 0.765 / 0.900 on P04, P06, P12, P13 and P20; £498 is exposed on the open cards above.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the unlisted last-minute and lead-time rules.
2. **Critical: P04 unsynced Airbnb 1455876748739910219, day 16.**
   - It now sells the **booked** 20-24 Nov (£679.16), and 6-19 Dec is still open (£2,275.22).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all dates now, or unlist. Then map it to Smoobu 3562176.
3. **High: Booking.com promotion stack on the two new stays (size only; the markup is settled).**
   - P12 paid -£556.58 against Smoobu (Weekly × 2×10% × occupancy 5%). Genius L2&3 15% did not apply.
   - P13 paid -£219.90 against Smoobu and is £105.46 below the policy-listed Mobile × Genius L1, so one layer is unidentified.
   - Booking.com now nets less than Airbnb per £100 on both.
   - Settings (Corentin decides):
     - Mile End extranet > Rates & availability > Occupancy pricing 1-4 guests -5% (+£75.39 on this stay).
     - Promotions: drop one of Last Minute / Mobile / Genius L1 (+£159.16).
     - Shepherd's Bush extranet > reservation 162896042 > price breakdown: identify the extra layer.
     - Note that Black Friday 30% replaces the stack on P13 from 19 Nov.
4. **High: P04 18-19 Nov opened as a 2-night stay** (Smoobu min 2, £175/£165; PriceLabs min 3, £155/£158; no log). Airbnb sells it at 0.727.
   - This conflicts with the standing P04 rule "never open for fewer than 3 nights". **For Corentin to confirm**: either keep it as a deliberate orphan fill, or Smoobu > Barking > 18-19 Nov min stay 3.
5. **High: t-p20-delivery, Corentin to confirm.** 20-21 Nov are open and selling on Airbnb (£540.85 room for 20-23 Nov), against the policy 20-22 Nov block. 16-17 and 22-24 Nov are min 2, against policy min 3.
   - Either block 20-22 Nov in Smoobu, or update policy.
6. **High: P04 Airbnb 20-24 Nov not yet in PriceLabs** (refresh 14 Nov 08:42Z). PriceLabs > P04 > Sync Now (pricelabs section; read-only here).
7. **Medium: P05 visible 12% early booking and 10% long stay** (-£141.72 on 14-17 Jan; -£192.30 on 14-19 Jan).
   - Setting: Airbnb listing 1618929775762183214 > Pricing > Discounts (or Smoobu Airbnb rules). Corentin to keep or zero.
8. **Medium: P13 LOS 5+ 10%** (-£88.29 / -£110.43 on 10-15 Dec) and **twins identical on 45 nights.** Both are conflicts for Corentin.
   - Settings: Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+; PriceLabs DSO on 3090701 for 15 Jan-28 Feb.
9. **Medium: P04 synced weekly 18% vs 15%** (£59.21 over policy on 6-19 Dec).
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.
10. **Medium: t-channel-gaps, P11.** 23 Dec £281 min 2 (target at least £320) and 3 Jan £173 (target at least £204) are unchanged in practice.

Closed or changed today:
- The P04 Airbnb booking came through the synced listing.
- The P12 Booking.com stay shows Genius L2&3 15% did not apply.
- P13 twins are now 45 identical nights (from 47).
- No PriceLabs log entries since 14 Nov.

Data gaps:
1. P13 162896042 Booking.com price breakdown (which layer beyond Mobile/Genius L1 gives 0.7203 of list): NOT CHECKED (no extranet access; WAF at 07:24:20Z not circumvented).
2. P12 162886727: which two of Last Minute / Mobile / Genius L1 applied: NOT CHECKED (same reason).
3. Booking.com live prices and same-date ordering for any flat: NOT CHECKED (WAF).
4. The source of the extra 5% on the P04 18-20 Nov Airbnb card (0.727) and of P06's extra 15% on 5 nights: NOT CHECKED (no Airbnb breakdown).
5. Who set P04 18-19 Nov to £175/£165 min 2 in Smoobu: UNKNOWN (no PriceLabs log; the Smoobu change history was not read).
6. Listing 1455's reservations, cleaning and min stay: NOT CHECKED (not in Smoobu).
7. Barking Booking.com cleaning fee (now £129 on 161276416 after a 14 Nov 11:02Z modification): not on record.
8. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.

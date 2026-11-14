## Channel parity

Run date D = 2026-11-14 (Saturday, GMT). I read `data/policy.json` first. These are settled and are not raised again: 15%/20% stay discounts, Booking.com promotion stacking (size reported only), Camden Visibility Booster 18%, the +10% Booking.com markup, P13 = one flat, the P02/P03/P06/P07 blocks, the P14 setup, and the deprioritised P09 Airbnb rules and P04 2 Dec override.

**Sources (all read-only)**
- **Smoobu GET.** `/api/rates` for 12 apartments, 14 Nov to 28 Feb, at **2026-11-14T07:19:19Z** (`/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live14/smoobu_rates14.json`). Diffed against `live13/smoobu_rates13.json` (13 Nov 07:21:10Z).
- **Smoobu GET.** `/api/reservations?modifiedFrom=2026-11-12&showCancellation=true&includePriceElements=true` at 07:19:19Z: 9 records, guest fields dropped (`.../live14/smoobu_mod14_pe.json`). It matches the Dispatcher's diff: 162878135 and 162880151 new (P11), 162505051 cancelled (P11), 162877292 new (P06).
- **PriceLabs.**
  - `get_user_logs` (listing, 13-14 Nov): **0 entries**.
  - `get_listing_prices` on P11 3064196, 25 Nov-16 Dec: last refreshed 13 Nov 10:47:05Z.
  - Raw pulls `data/snapshots/2026-11-13|14/raw/prices_*.json`.
  - Calls were made one at a time.
- **Live Airbnb.** 11 plain public airbnb.co.uk map searches (curl, no workarounds), 07:21:44Z-07:23:05Z. Each has its own JSON (URL, dates, guests, timestamp) in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live14/air/`, plus `log.txt`.
  - Room = card total before taxes, minus cleaning: P20/P13/P12 £150, P05 £195, P04 synced £142, P06 £129.
- **`data/snapshots/2026-11-14/channel_checks.csv`.** Copied forward from 13 Nov (1,046 lines) under `.channel_checks.csv.lock`, then **15 Airbnb rows appended** (1,061 lines).
- **Booking.com live: NOT CHECKED.** One plain search (Camden Town, 2-5 Dec, 2 adults) at 07:23:29Z returned HTTP 202 with an AWS WAF challenge (`live14/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row). Booking.com +10% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct -10% (`rm/config.py` CHANNELS) are still unconfirmed defaults until Corentin confirms them.**

### 1. Camden (P11) Booking.com: the first two bookings since the +10% markup (a-p11-bcom-stack)

Smoobu price elements (no guest data). Room = `basePrice`, which includes VAT: VAT element = basePrice / 6 on both.

| Smoobu id | Stay | Booked (Smoobu created-at) | Lead | Guests | Room | Cleaning | Commission | Commission / (room + cleaning) |
|---|---|---|---|---|---|---|---|---|
| 162878135 | 28 Nov-2 Dec (4 n) | 13 Nov 23:20 | 15 d | 4 adults | £605.29 | £149 | £135.77 | **18.00%** |
| 162880151 | 9-14 Dec (5 n) | 14 Nov 05:48 | 25 d | 3 adults | £863.61 | £149 | £182.27 | **18.00%** |

**Smoobu rate at booking.** P11's last refresh and push was 13 Nov 10:47Z, before both bookings, and `get_user_logs` shows nothing since. So the rate at booking = today's Smoobu = PriceLabs `price` in the 10:47Z refresh:
- 28 Nov-2 Dec: 260 / 188 / 170 / 176 = **£794**
- 9-14 Dec: 197 / 220 / 263 / 266 / 186 = **£1,132**

**Result: both stays fit one formula to the penny.** Paid = Σ ceil(Smoobu × 1.10) × 0.9 × 0.9 × 0.9 × 0.95 = **0.69255 of the Booking.com list** (`live14scripts/stack.py`).

| Stay | Smoobu | Booking.com list (ceil x1.10) | x 0.69255 | Paid | Paid / Smoobu |
|---|---|---|---|---|---|
| 28 Nov-2 Dec | £794 | 286 + 207 + 187 + 194 = **£874** | £605.29 | £605.29 | 0.762 |
| 9-14 Dec | £1,132 | 217 + 242 + 290 + 293 + 205 = **£1,247** | £863.61 | £863.61 | 0.763 |

- **Did the +10% reach Booking.com? Yes, indirectly proven.** Only ceil(x1.10) fits both stays exactly.
  - x1.00 with any promotion set misses by at least £2.37.
  - x1.15 misses by at least £6.34.
  - This is the first evidence beyond Corentin's Abbey Rd UI reading on 12 Nov.
- **What the stack is (effective discount 30.7% off list; 23.8% below Smoobu):** three 10% layers × one 5% layer.
  - The three 10% layers are most consistent with Last Minute **10%** (policy `booking_last_minute_24oct`, 30 days; both stays are inside it), Mobile 10% and Genius L1 10%.
  - The 0.95 is most consistent with occupancy pricing at -5% for 1-4 guests (`non_refundable_rate`; the same -5% seen on P04 and P12, 24-25 Oct).
  - Which three of {Last Minute 10%, Mobile, Genius, a fifth 10%} applied cannot be told apart without the extranet breakdown (NOT CHECKED).
- **Correction to yesterday's model.** On these stays the Last Minute deal acted as **10%, not 15%**. The "five layers" (LM 15% and a fifth 10%) did not all apply.
  - Yesterday's under-7-nights full stack (£68.16 per £100) understated the actual **£76.18 per £100 Smoobu**.
  - Neither stay is 7+ nights, so no Weekly rate applies (correct).
- **Size of the stack (reported, not called unexplained, per `booking_stacked_promotions`):**
  - Against the channel model (list, no promotions): **-£268.71** and **-£383.39**, so **£652.10** on £2,121 of list (-30.7%).
  - Against the Smoobu rate: **-£457.10**.
  - Removing any one 10% layer would have added £163.21 on these two stays. Removing the -5% occupancy layer would have added £77.31.
- **Commission is 18.00% of room + cleaning on both.** Both check-ins (28 Nov, 9 Dec) fall inside the 1 Nov-18 Dec booster window, so this is expected and not flagged.
- **Net to owner per £100 Smoobu base:**
  - Guest pays £76.18 (VAT incl.). After 18% that leaves **£62.47**, or £52.06 ex-VAT.
  - Model: £93.50.
- **Not yet in PriceLabs.** `get_listing_prices` (refresh 13 Nov 10:47Z) still shows 28 Nov-1 Dec and 9-13 Dec as open, with blank booking_status. Both bookings are missing from `rate_leak_next_30` and forward occupancy until the next refresh.
- **Darts 13 Dec sold at £141.97 room** (205 × 0.69255; Smoobu £186), inside this stay. The price level belongs to the pricelabs section, under the 24 Oct "leave the darts override" decision.
- **Gaps left by the new stays (Smoobu 07:19Z):**
  - **8 Dec is now a 1-night orphan** (5-8 Dec booked, 9 Dec arrival, min 3; Smoobu £202, list £223). It cannot be sold.
  - 14-18 Dec (5 n, min 3), 25-27 Nov (3 n; 26-27 Nov reopened by the cancellation) and 2-4 Dec (3 n) all stay sellable.

**Booking.com since the 24 Oct markup cut** (`reservations.csv` 14 Nov, booked_on 24 Oct or later; P04 20-23 Nov triplicate counted once; room = Smoobu basePrice, VAT incl.):

| Measure | Bookings | Nights | Room £ | Commission £ |
|---|---|---|---|---|
| Gross since cut | **22** (+2) | 87 | £15,241.26 | £3,154.78 |
| Still confirmed | **14** (+1 net) | 58 | £9,291.49 | £1,964.08 |
| Cancelled | **8** (+1: P11 26-29 Nov, £680.40, booked 3 Nov) | 29 | £5,949.77 (36%) | £1,190.70 |
| Since +10% (12 Nov) | **2** (both P11) | 9 | £1,468.90 | £318.04 |
| P11 confirmed since cut | 5 | 17 | £3,120.46 | £745.78 |

- Pace over 20.74 days (24 Oct 13:38Z to 14 Nov 07:19Z): **1.06 a day gross, 0.68 confirmed** (yesterday 1.01 / 0.66). Before the cut it was about 0.33 a day.
- Since the +10%: 2 bookings in 1.8 days, after 0 in the 2.6 days before. Two bookings is too few to judge the markup.
- Net change on 26-29 Nov: the cancelled 3 nights (£680.40) were replaced by 28 Nov only, at a lower rate. 26-27 Nov are back on sale at £210 / £261.

### 2. P06 Marylebone Airbnb 24-29 Nov (Smoobu 162877292), added to a-airbnb-rules

- **The booking:** booked 13 Nov 22:20, 5 nights at 11 d lead, 3 adults. Room **£1,009.82**, cleaning £129. Commission £176.52 = 15.50% of room + cleaning (normal Airbnb host fee).
- **Smoobu rate at booking:** 291 / 293 / 303 / 338 / 328 = **£1,553**, after the 13 Nov 09:07Z push. There has been no push or log since. Before the push, Smoobu at 07:21Z was £1,906 = PriceLabs `user_price`. The brief's £346-445 is the pre-push figure.
- **Fit:** paid = Smoobu × 0.9 × 0.85 × 0.85 = **0.65025**, applied per night (£1,009.83, 1p off).
  - That is the hidden **0.765 layer**, plus a **further 15%** on a 5-night stay.
  - Today's P13 5-night card (26 d) shows a different pattern: 0.9 × a visible LOS 10% = 0.81.
  - So the P06 extra 15% is **not identified.** It could be a Smoobu LOS 5+ rule at 15% or an Airbnb length-of-stay discount on listing 1671691529957957272. The Airbnb reservation breakdown is NOT CHECKED.
- **Expected by policy:** £1,553 (5 nights, no recognised discount). **Gap -35.0%, -£543.18**:
  - £364.96 from the 0.765 layer
  - £178.22 from the extra 15%
  - Against PriceLabs `user_price` it is 0.530.
- **a-airbnb-rules running cost: £2,363.11 + £543.18 = £2,906.29.** The booking was made after 21 Oct and fits the hidden rules.
- **22-23 Nov is not an orphan pair.** Airbnb offers 22-24 Nov as a 2-night stay (22 Nov min 2): card £566.58, room £437.58 = 0.765 × £572 (`p06_2224nov`, 07:22:21Z).
- **29 Nov is a 1-night gap** (open, min 4) before the intentional block from 30 Nov. Occupancy section; not raised as lost revenue.
- **Who reopened 22-29 Nov, and why:** still UNKNOWN (t-p06-2229open, with Corentin).

### 3. Barking (P04): unsynced Airbnb 1455876748739910219, day 15

| Stay (2 adults) | Smoobu 3562176 | Unsynced 1455 (card; cleaning not split) | Synced 1657859794156786222 (room) | Source (`live14/air/`) |
|---|---|---|---|---|
| 18-21 Nov | open £453, min 3 | **bookable £571.00** (3 × £190.33; was £525.80 since 10 Nov) | £346.54 (card £488.54) = 0.765 | p04_1821nov 07:21:44Z |
| 6-19 Dec (13 n) | open £2,228 | **bookable** £2,514.80 - weekly £239.58 = **£2,275.22** (unchanged) | £1,644.26 | p04_0619dec 07:21:55Z |

- **Still bookable on day 15. t-p04-doublebook is NOT fixed.**
- New today: the 1455 price for 18-21 Nov moved (+£45.20) although nothing in Smoobu feeds it. Something on that Airbnb account is repricing it. The cause is NOT CHECKED (possibly Airbnb Smart Pricing).
- Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block all open nights (or unlist), then map it to Smoobu 3562176.

### 4. Live Airbnb: displayed vs expected (hidden layers, day 16)

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- weekly 15% (7+ n)
- P13: last-minute 10% within 14 d, early bird 10% at 60+ d
- P20: last-minute 15% at 0-14 d

Gap = displayed room / expected - 1, flagged above 3%. Cleaning is excluded from both.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live14/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P04 synced | Airbnb | 18-21 Nov (4) | 2 | £453 | £453.00 | £346.54 (£488.54) = 0.765 | -23.5% | FLAG | p04_1821nov 07:21:44Z |
| P04 synced | Airbnb | 6-19 Dec, 13 n (22) | 2 | £2,228 | £1,893.80 | £1,644.26 = 0.9 × (1 - **0.18** weekly, -£360.94) | -13.2% | FLAG | p04_0619dec 07:21:55Z |
| P04 unsynced 1455 | Airbnb | 18-21 Nov / 6-19 Dec | 2 | open | not for sale | £571.00 / £2,275.22 card | n/a | FLAG (double-sell) | as above |
| P05 | Airbnb | 13-16 Jan (60) | 7 | £1,153 | £1,153.00 | £1,014.64 (visible Early booking -£138.36 = 12.0%) | -12.0% | FLAG | p05_1316jan 07:22:27Z |
| P05 | Airbnb | 13-18 Jan, 5 n (60) | 6 | £1,928 | £1,928.00 | £1,735.20 (visible Long stay -£192.80 = 10.0%) | -10.0% | FLAG | p05_1318jan_5n 07:22:31Z |
| P06 | Airbnb | 15-17 Nov (1) | 3 | £421 | £421.00 | £322.06 (£451.06) = 0.765 | -23.5% | FLAG | p06_1517nov 07:22:08Z |
| P06 | Airbnb | 22-24 Nov (8) | 2 | £572 | £572.00 | £437.58 (£566.58) = 0.765 | -23.5% | FLAG | p06_2224nov 07:22:21Z |
| P06 | Airbnb (booking) | 24-29 Nov, 5 n (11) | 3 | £1,553 at booking | £1,553.00 | **paid £1,009.82** = 0.65025 | -35.0% | FLAG | Smoobu 162877292 price elements |
| P12 | Airbnb | 7-10 Dec (23) | 2 | £775 | £775.00 | £592.86 (£742.86) = 0.765 | -23.5% | FLAG | p12_0710dec 07:22:49Z |
| P13 3090701 / 3064856 | Airbnb | 10-15 Dec, 5 n (26) | 4 | £1,011 / £1,201 | same | £818.91 / £972.81 = 0.9 × visible Long stay 10% (-£90.99 / -£108.09) | -19.0% / -19.0% | FLAG | p13_1015dec_5n 07:22:37Z |
| P13 3090701 / 3064856 | Airbnb | 13-16 Jan (60) | 4 | £565 / £565 | £508.50 (EB10) | £508.50 / £508.50 (visible Early booking -£56.50) | 0.0% | ok (twins identical, card £658.50 both) | p13_1316jan 07:22:43Z |
| P20 | Airbnb | 20-23 Nov (6) | 2 | £688 | £584.80 (LM15) | £526.32 (£676.32) = 0.765 | -10.0% | FLAG | p20_2023nov 07:22:55Z |
| P20 | Airbnb | 14-17 Dec (30) | 2 | £822 | £822.00 | £739.80 (£889.80) = 0.900 | -10.0% | FLAG | p20_1417dec 07:23:05Z |
| P11 | Booking.com | 28 Nov-2 Dec (booking) | 4 | £794 | £874 list (ceil x1.10) | **paid £605.29** = 0.69255 of list | -30.7% (promotion stack, size only) | FLAG (size) | Smoobu 162878135 |
| P11 | Booking.com | 9-14 Dec (booking) | 3 | £1,132 | £1,247 list | **paid £863.61** = 0.69255 of list | -30.7% (promotion stack, size only) | FLAG (size) | Smoobu 162880151 |
| P11 | Booking.com | 2-5 Dec, open | 2 | £662 | £730 list (ceil x1.10) | NOT CHECKED: AWS WAF 07:23:29Z | - | - | live14/bk/search.html |
| all | Vrbo / Direct | - | - | - | - | NOT CHECKED: no URL, no checks row | - | - | - |

**a-airbnb-rules: unchanged on day 16, NOT fixed.**
- The pattern is the same on every synced flat:
  - **0.765** on nights up to 28 d out
  - **0.900** at 29-59 d
  - **1.000** from 60 d, where only the visible discount applies
- On stays of 5+ nights inside 28 d, the 0.85 is replaced by a visible LOS discount (P13 10%, P04 weekly 18%). The exception is P06's booking, which kept 0.765 and added a further 15%.
- **Running cost £2,906.29** (P06 added, +£543.18).
- If P20 20-23 Nov sells at today's card, the layer costs £58.48 against policy (£584.80 - £526.32).
- Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove the last-minute and lead-time rules that policy does not list, and keep the visible discounts (`airbnb_visible_discounts`).

**Standing Airbnb items**

| Item | Status 14 Nov | Evidence |
|---|---|---|
| a-p05-earlybird: P05 12% early booking | Still on | -£138.36 = 12.0% of £1,153 on 13-16 Jan (60 d) |
| t-p05-los: P05 10% long stay from 5 n | Still on | -£192.80 on 13-18 Jan; at 60 d it replaces early booking instead of stacking |
| t-p04-weekly: P04 synced weekly 18% vs 15% | Not fixed | -£360.94 = 18.0% of £2,005.20; at 15% it would be £300.78, so **£60.16 over policy** on 6-19 Dec |
| t-p13-los5: P13 LOS 5+ 10% | Still on, both twins | -£90.99 / -£108.09 on 10-15 Dec. Not in the 21 Oct changed rules; Corentin to confirm |
| t-p13-twins | Not fixed | Smoobu: **47 open nights identical** (13 Jan-28 Feb; yesterday 48). Airbnb shows both twins at £715.00 gross / £658.50 on 13-16 Jan. Conflict with `twin_listings` for Corentin; the fix is a PriceLabs DSO on 3090701 (pricelabs section) |
| P06 extra 15% on 5-night stays | New, unidentified | 24-29 Nov paid 0.65025 = 0.765 × 0.85 |

### 5. P20 dates and P11 gap prices

**t-p20-delivery: still a conflict for Corentin, unchanged.**
- Smoobu blocks 18-19 Nov only. 20 Nov £236 and 21 Nov £240 (min 3) are open, against policy's 20-22 Nov delivery block (`listing_facts.P20.block_20_21_nov`).
- Airbnb sells 20-23 Nov at £526.32 room (07:22:55Z).
- Min stay:
  - 15 Nov is back to min 3 (was min 2 yesterday).
  - 16-17 and 22-24 Nov are still min 2, against policy min 3 until 30 Nov.
- t-p20-5dec-orphan: 5 Dec £306, min 3, between bookings. Still unsellable.

**t-channel-gaps (P11): NOT fixed.**
- 23 Dec is £276, min 2 (target at least £320).
- 3 Jan is £172, min 3 (target at least £204).
- Both are unchanged since yesterday (Smoobu 07:19Z). Booking.com visibility: NOT CHECKED (WAF).

**t-smoobu-manual-1213 (for the pricelabs section).** The lower near-term Smoobu numbers are PriceLabs' own `price` field, not a manual Smoobu edit. Today Smoobu equals PriceLabs `price` and sits below `user_price`. Examples from the 14 Nov raw:
- P11 18 Nov: 143 vs 160
- P11 28 Nov: 260 vs 292
- P06 24-28 Nov: 1,553 vs 1,906

These were pushed by PriceLabs (P11 13 Nov 10:47Z, P06 09:07Z) with 0 log entries. Guests see the lower `price`, and both new bookings were priced on it.

### 6. Net to owner per £100 base (`channel_economics`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model (+10%, confirmed 12 Nov) | £110.00 | £93.50 (15%); £90.20 at Camden 18% |
| **Booking.com Camden observed (4-5 n, 15-25 d lead)** | **£76.18** | **£62.47** (18%) |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 1.000 (60 d+) | £100.00 | £84.50 |
| Airbnb live 0.900 (29-59 d) | £90.00 | £76.05 |
| Airbnb live 0.765 (up to 28 d) | £76.50 | £64.64 |
| Airbnb P06 observed 5 n (0.65025) | £65.03 | £54.95 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (-10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `warnings` is empty, and the model ordering holds: direct £90 < Airbnb £100 < Booking £110, and Booking nets £93.50 against Airbnb's £84.50.
- **Observed prices break both rules.** Camden Booking.com at £76.18 and Airbnb inside 60 d (£65.03-90.00) are below the £90 direct model.
- Camden Booking.com nets £62.47, below Airbnb at 0.765 (£64.64). Camden is Booking-only, so this is model-level only.
- Same-date ordering (direct < Airbnb / Booking / Vrbo): NOT CHECKED (WAF; no Vrbo or direct URL).

**`rate_leak_next_30` (kpi_pack 14 Nov), corrected for VAT.** Booking.com ADR × 1.2; nights outside confirmed Smoobu stays dropped (`live14scripts/vat.py`). The unadjusted run reproduces the pack. `rate_leak` compares to the PriceLabs price and does not use the x1.10 markup.

| Flat | Pack gap | Corrected gap | Notes |
|---|---|---|---|
| P11 | -8.8% (6 n) | **+9.5%** | old Booking.com stays only (14-17, 20-21 Nov); the two new stays are not yet in PriceLabs |
| P04 | -24.9% (11 n) | **-9.8%** | all Booking.com (14-18 Nov Monthly-plan stack) |
| P12 | -27.2% (10 n) | **-15.5%** | Booking.com -10.8% (8 n); Airbnb -32.5% (2 n) |
| P13 | -42.3% (16 n) | **-36.4%** | Booking.com -40.5% (10 n); Airbnb -30.3% (6 n) |
| P20 | -44.3% (16 n) | -44.3% | Airbnb only |

- Airbnb-only flats need no correction: P01 -37.4%, P05 -7.6%, P06 -41.6% (3 n; 24-29 Nov not yet registered), P09 -26.4%, P10 -21.2%.
- 2 nights with a blank ref (3090701 child) at -21.2% are not attributed.
- VAT effect: 15-18 points on P04/P11/P12 Booking nights, above the 8-14 in the brief.

### 7. Fees and min stay

- **Cleaning** on every synced Airbnb card fits the fees on record (P04 £142, P06 £129, P05 £195, P12/P13/P20 £150). Booking.com Camden cleaning is £149 in both new reservations' price elements.
- **Min stay as displayed matches Smoobu:**
  - P06 22-24 Nov offered as 2 nights (min 2 on 22 Nov).
  - P20 20-23 Nov offered at min 3.
  - P13 and P05 cards match the Smoobu nights.
- On the unsynced P04 1455 listing, cleaning and min stay are NOT CHECKED.

### Issues ordered by £ impact

1. **Critical: Camden Booking.com stack (a-p11-bcom-stack).** First evidence at +10%:
   - The two new stays paid **0.69255 of list (-£652.10 vs list, -£457.10 vs Smoobu)**. The stack is three 10% layers and a -5% occupancy layer; Last Minute acted as 10%, not 15%.
   - Net is £62.47 per £100 base.
   - Settings, all NOT CHECKED today (WAF, no extranet screenshot after 10 Nov):
     - Booking.com extranet > Promotions: confirm which three of Last Minute / Mobile / Genius L1 / any fifth deal applied. Dropping one 10% layer = +£163.21 on these two stays.
     - Rates & availability > Occupancy pricing for 1-4 guests (-5%): +£77.31.
   - Corentin decides; the markup itself is settled.
2. **Critical: hidden Airbnb layers, day 16 (a-airbnb-rules).** P06 24-29 Nov paid 0.65025 (-£543.18).
   - **Running cost £2,906.29.** Live cards show 0.765 / 0.900 on every synced flat.
   - Setting: Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules. Remove unlisted last-minute/lead-time rules.
   - P06: Smoobu Airbnb rules for 3288517 and Airbnb listing 1671691529957957272 > Pricing > Discounts. Find the extra 15% on 5-night stays.
3. **Critical: P04 unsynced Airbnb 1455876748739910219, day 15.** Still bookable 18-21 Nov (£571.00, now repricing by itself) and 6-19 Dec (£2,275.22).
   - Setting: Airbnb host 551951609 > listing 1455876748739910219 > Calendar: block or unlist, then map to Smoobu 3562176.
4. **High: both new P11 bookings and the P06 booking are missing from PriceLabs** (refresh 13 Nov 10:47Z / 09:07Z).
   - PriceLabs still treats 28 Nov-1 Dec and 9-13 Dec as open.
   - Setting: PriceLabs > P11 / P06 > Sync Now (pricelabs section; not done here, read-only).
5. **High: t-p20-delivery, Corentin to confirm.** 20-21 Nov are open and selling on Airbnb (£526.32 for 20-23 Nov), against the policy 20-22 Nov block. 16-17 and 22-24 Nov are min 2, against policy min 3.
   - Either block 20-22 Nov in Smoobu, or update policy.
6. **Medium: P11 8 Dec is a new 1-night orphan** (min 3; list £223).
   - Setting: Smoobu/PriceLabs min stay 1 on 8 Dec (pricelabs/occupancy section to price it).
7. **Medium: P05 visible 12% early booking and 10% long stay** (-£138.36 on 13-16 Jan; -£192.80 on 13-18 Jan).
   - Setting: Airbnb listing 1618929775762183214 > Pricing > Discounts (or Smoobu Airbnb rules). Corentin to keep or zero.
8. **Medium: P13 LOS 5+ 10%** (-£90.99 / -£108.09 on 10-15 Dec) and **twins identical on 47 nights.** Both are conflicts for Corentin.
   - Settings: Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+; PriceLabs DSO on 3090701 for 13 Jan-28 Feb.
9. **Medium: P04 synced weekly 18% vs 15%** (£60.16 over policy on 6-19 Dec).
   - Setting: Airbnb listing 1657859794156786222 > Pricing > Discounts > Weekly 15%.

Closed or changed today:
- The +10% markup is shown to reach Booking.com.
- 22-23 Nov at P06 is sellable (not an orphan).
- P20 15 Nov is back to min 3.
- The "manual Smoobu cuts" are PriceLabs `price` pushes (pricelabs section).

Data gaps:
1. Booking.com promotion breakdown on 162878135 and 162880151 (which three 10% layers, and whether the 0.95 is occupancy pricing): NOT CHECKED. It needs the extranet reservation detail; the WAF at 07:23:29Z was not circumvented.
2. Booking.com live prices for open P11 dates (2-5 Dec, 14-18 Dec, 23 Dec, 3 Jan) and the rate-plan list: NOT CHECKED (WAF).
3. The source of the extra 15% on P06's 5-night Airbnb booking: NOT CHECKED (no Airbnb reservation breakdown; no P06 5-night run is open to test).
4. Who reopened P06 22-29 Nov: UNKNOWN (t-p06-2229open).
5. Why listing 1455's price moved (18-21 Nov £525.80 -> £571.00), and its reservations, cleaning and min stay: NOT CHECKED (not in Smoobu).
6. P20 delivery dates (18-19 vs 20-22 Nov): Corentin.
7. Vrbo and Direct prices: NOT CHECKED. Vrbo +8% and Direct -10% are unconfirmed defaults.

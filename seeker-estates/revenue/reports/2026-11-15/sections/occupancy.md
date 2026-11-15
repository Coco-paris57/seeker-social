## Occupancy & performance

**Portfolio, last 30 nights (16 Oct–14 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 237 n, £41,210.28, occupancy 60.8%, ADR £173.88, RevPAR £105.67 (`reports/2026-11-15/kpi_pack.json` `portfolio_last30`). Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (15 Oct–13 Nov) it was 239 n / 61.3% / £172.34 / £105.61.

**Last 365 nights (15 Nov 2025–14 Nov 2026):** 2,210 n, £406,621.71, occupancy 46.6%, ADR £183.99, RevPAR £85.69 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 nights (15 Nov–14 Dec): 154 of 253 non-blocked nights = 60.9%.** Yesterday (14 Nov–13 Dec) it was 152/258 = 58.9%.
- **Next 60 (15 Nov–13 Jan):** 216/433 = 49.9%. Yesterday: 209/438 = 47.7%.
- **Source:** live Smoobu GET `/api/reservations` (907 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 15 Nov 07:20:38Z. Saved to scratch `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ15/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ15/smoobu_rates.json`. The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 read as one calendar).
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, policy).
  - Every night after a handback (policy `handbacks`): P08 fully out (last night 13 Nov), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from 30 Nov; P20 18–19 Nov.
- **How +2 booked nights (next 30) reconciles:**
  - New bookings: +11 (P04 20–24 Nov +4; P12 7–14 Dec +7). P13 18–23 Dec is outside the 30-day window.
  - Cancellations: 0.
  - Window roll: 14 Nov out −9 (P01, P04, P05, P06, P09, P10, P11, P12, P13 were booked); 14 Dec in +0 (open on P04, P05, P11, P13, P14, P20).
  - Net: 152 + 11 − 9 + 0 = 154. The denominator: 258 − 11 (14 Nov non-blocked) + 6 (14 Dec) = 253.
  - Next 60: 209 + 16 (incl. P13 +5) − 9 + 0 (13 Jan) = 216; denominator 438 − 11 + 6 = 433.

### Smoobu full-record diff (15 Nov 07:20Z vs 14 Nov 07:19Z), blocks included
- **Blocks: no block was created, removed or changed.** P06 143402691 still starts 30 Nov, P01 160657036 still 30 Nov–21 Dec departure, P20 162432556 still 18–19 Nov, P12 155644001 still from 14 Dec.
- **NEW** 162886727 P12 Booking.com 7–14 Dec (7 n), room £1,432.42, created 14 Nov 13:51.
- **NEW** 162894484 P04 Airbnb 20–24 Nov (4 n), room £489.59, created 14 Nov 20:29 (modified 20:35:50).
- **NEW** 162896042 P13 Booking.com 18–23 Dec (5 n), room £847.10, on 3064856 (related 3090701), created 14 Nov 22:03.
- **Touch only:** P04 161276416 (14–18 Nov), `modifiedAt` 13 Nov 18:14:12 → 14 Nov 11:02:21, no field changed.
- **No cancellations.** These match the Dispatcher's `reservations.csv` diff (15 Nov vs 14 Nov) exactly.
- **Smoobu rate-calendar change outside a booking: P04 18–19 Nov min stay 3 → 2** and price £148/£151 → £175/£165 between the two pulls (`/api/rates`). PriceLabs 3562176 (last refreshed 14 Nov 08:42:40Z, live `get_listing_prices` 15 Nov) still shows min 3 at £155/£158, and `get_user_logs` (listing, 14–15 Nov) has 0 entries. Who set min 2 is UNKNOWN. Policy P04 says never open for fewer than 3 nights, so this is a conflict for Corentin (below).

### Are the new bookings in PriceLabs?
- **P04 20–24 Nov: NOT registered.** Live `get_listing_prices` 3562176 (15 Nov; `last_refreshed_at` 14 Nov 08:42:40Z, before the 20:29 booking) shows 18–24 Nov all open (`booking_status` ""), min 3. Smoobu has closed 20–23 Nov (`available` 0). kpi_pack `forward_occ_30` P04 55.2% is therefore stale; Smoobu 56.7% is used.
- **P12 7–14 Dec: registered** (`prices.csv` / raw `prices_2699998.json`, refreshed 15 Nov 05:48Z: 7 Dec "Booked (Check-In)", 8–13 Dec "Booked"; 14 Dec "Blocked").
- **P13 18–23 Dec: registered** on 3064856 (Booked 18–22 Dec, `prices.csv`). Twin 3090701 (raw `prices_3090701.json`, refreshed 15 Nov 06:55:54Z) shows `user_price` −1 on 18–22 Dec, and Smoobu `/api/rates` has 3090701 closed 18–22 Dec, so the twin is shut as one flat (policy `linked_listings`).
- **t-pl-sync-1411 (P11/P06 bookings): fixed.** `prices.csv` 15 Nov shows P11 28 Nov–1 Dec and 9–13 Dec Booked (refreshed 14 Nov 09:03:16Z) and P06 24–28 Nov Booked (refreshed 14 Nov 08:42:41Z).

### Booked vs market, next 30 / next 60
Booked figures are Smoobu at 15 Nov 07:20Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (15/15 non-blocked; 15 blocked) | 36% | 100% (15/15 to handback; 21 blocked) | 29% | 48.3% (incl. blocks) |
| P04 | **56.7%** (17/30) | 24% | 50.0% (30/60) | 20% | 55.2% (stale: 20–24 Nov not in PriceLabs) |
| P05 | 66.7% (20/30) | 46% | 63.3% (38/60) | 40% | 65.5% |
| P06 | 60.0% (9/15 non-blocked; 15 blocked) | 51% | 9/15 (45 blocked) | 41% | 31.0% (incl. blocks) |
| P08 | handed back (last night 13 Nov) | 53% | — | 43% | null |
| P09 | 100% (12/12 to handback 26 Nov) | 40% | same | 32% | 100% |
| P10 | 100% (4/4 to handback 18 Nov) | 32% | same | 25% | 100% |
| P11 | **56.7%** (17/30) | 51% | 48.3% (29/60) | 39% | 55.2% |
| P12 | **69.0%** (20/29, to handback 13 Dec) | 44% | same | 34% | 67.9% |
| P13 (one flat) | 73.3% (22/30) | 46% | 56.7% (34/60) | 38% | 72.4% |
| P14 (special setup, numbers only) | 0% (0/30) | 49% | 0% (0/60) | 38% | 0% |
| P20 | 64.3% (18/28; 18–19 Nov blocked) | 40% | 43.1% (25/58) | 31% | 62.1% |

P11 fell from 60.0% to 56.7% only through the window roll (14 Nov booked out, 14 Dec open in); no P11 booking or cancellation overnight.

### 7-day pickup, net of cancellations (bookings made 9–15 Nov, to 07:20Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations (`occ15/pick.py`). No imported past stays fall in the window.

- **Gross made:** 9 bookings / 45 n / £7,610.00.
- **Still confirmed:** 6 / 30 n / £5,247.83 (P04 £489.59, P06 £1,009.82, P11 £1,468.90, P12 £1,432.42, P13 £847.10). This equals the kpi_pack `pickup_7d` sum.
- **Cancelled in window:** 6 / 27 n / £4,277.28.
- **Net: +22 n / +£3,332.72.** Yesterday (8–14 Nov) it was +12 n / +£3,525.78.
- **Reconciliation:** 8 Nov left the window (P05 15–21 Dec, 6 n / £2,962.17); new bookings +16 n / +£2,769.11. 12 − 6 + 16 = 22; £3,525.78 − £2,962.17 + £2,769.11 = £3,332.72.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| **P04** | **1 / 4 / £489.59 (20–24 Nov Airbnb, made 14 Nov, 6 d out)** | — | **+4 / +£489.59** |
| P06 | 1 / 5 / £1,009.82 (24–29 Nov, made 13 Nov) | — | +5 / +£1,009.82 |
| P11 | 3 / 16 / £2,481.76 (28 Nov–2 Dec £605.29; 9–14 Dec £863.61; 8–15 Dec made and cancelled £1,012.86) | 8–15 Dec 7 / £1,012.86; 26–29 Nov 3 / £680.40 (booked 3 Nov) | +6 / +£788.50 |
| **P12** | **1 / 7 / £1,432.42 (7–14 Dec Booking.com, made 14 Nov, 23 d out)** | 11–13 Dec 2 / £513.81 (booked 5 Nov) | **+5 / +£918.61** |
| **P13** | 2 / 9 / £1,557.87 (**18–23 Dec £847.10, made 14 Nov, 34 d out**; 11–15 Dec made and cancelled £710.77) | 11–15 Dec 4 / £710.77 | **+5 / +£847.10** |
| P20 | 1 / 4 / £638.54 (21–25 Nov, made and cancelled) | 4 / £638.54 | 0 / £0 |
| P01 | 0 | 18–21 Dec 3 / £720.90 (booked 19 Oct) | −3 / −£720.90 |
| P02, P05, P07, P08, P09, P10, P14 | 0 | — | 0 |

**Paid vs Smoobu on the three new bookings.** Smoobu has no price history. The 14 Nov 07:19Z `/api/rates` pull is the latest before each booking, but prices moved on every unit between the 14 and 15 Nov pulls, so both bases are shown and the price at booking is NOT CHECKED.
- **P04 20–24 Nov Airbnb** (4 n; created 14 Nov 20:29):
  - Smoobu 14 Nov 07:19Z: 154 + 157 + 152 + 153 = £616 → paid **0.795×**. Smoobu 15 Nov 07:20Z: 161 + 164 + 158 + 157 = £640 (= PriceLabs `price`) → paid **0.765×** (£640 × 0.765 = £489.60, 1p off).
  - The booking came in through Smoobu's Airbnb channel (channel id 3263896, the same one as every other flat) on apartment 3562176, so it is a Smoobu-connected Airbnb listing. P04 already had Airbnb bookings on 3562176 through Smoobu (e.g. 6–9 Nov, made 29 Oct). Which Airbnb listing ID it came from (1455876748739910219 or another) is NOT CHECKED: Smoobu gives only the confirmation code.
  - Commission £97.90 = 15.5% of room + £142 cleaning (20.0% of room).
- **P12 7–14 Dec Booking.com** (7 n; created 14 Nov 13:51):
  - Smoobu 14 Nov 07:19Z: 259 + 249 + 267 + 287 + 317 + 323 + 287 = £1,989 → paid **0.720×**; vs ×1.10 list £2,187.90 → 0.655×; after Weekly 15% (×1.10 × 0.85 = £1,859.69) → 0.770×.
  - Smoobu 15 Nov (after the 05:48Z push): £2,196 → 0.652×.
  - The remaining 0.770 is Booking.com promotions (policy: stacking expected; report size). The exact stack is NOT CHECKED (no extranet screenshot).
  - Commission £237.36 = **15.0%** of room + £150 cleaning. No booster.
  - The Smoobu basePrice includes VAT £238.74 (`priceIncludedInId`).
- **P13 18–23 Dec Booking.com** (5 n; created 14 Nov 22:03; on 3064856):
  - Smoobu 3064856, 14 Nov 07:19Z: 216 + 219 + 204 + 213 + 215 = £1,067 → paid **0.794×** (0.722× the ×1.10 list). On 15 Nov prices (£1,105) → 0.767×.
  - Commission £179.64 = **18.0%** of room + £150 cleaning. That is the Shepherd's Bush Visibility Booster (on for check-ins 21 Oct–20 Dec 2026, policy `booking_promotions_p13_21oct`), so it is expected.
  - The stay is inside Reyhan's 10–26 Dec −5% window (a-peak-check). Whether the −5% applied on the night of booking is NOT CHECKED (no override history).

### Pace vs STLY (stays from 15 Nov; cancelled bookings excluded on both sides)
**P12** (recomputed with `rm.metrics.on_the_books` on `data/snapshots/2026-11-15/reservations.csv`; kpi_pack shown for reference):

| P12 measure | 14 Nov | 15 Nov |
|---|---|---|
| **Pace to handback (stays 15 Nov–13 Dec)** | −12 n / −£1,746.53 / −37.8% (14 Nov–13 Dec) | **20 n / £4,130.09 vs 25 n / £4,490.71 = −5 n / −£360.62 / −8.0%** |
| Same window without the new 7–14 Dec stay | — | 13 n / £2,697.67 = −12 n / −£1,793.04 / −39.9% |
| kpi_pack `pace_30` (15 Nov–14 Dec; 14 Dec is after the handback) | — | 20 n / £4,130.09 vs 26 n / £4,632.49 = −6 n / −£502.40 / −10.8% |
| kpi_pack `pace_90` (15 Nov–12 Feb; nothing after 13 Dec is inventory) | −27 n / −64.1% | 20 n / £4,130.09 vs 40 n / £7,868.74 = −20 n / −£3,738.65 / −47.5% |

The new stay moved P12 from −37.8% to **−8.0% handback-aware, so P12 is now On track**. On the kpi_pack 30-day window it is −10.8%, just past the −10% line. The difference is 14 Dec 2025 (1 STLY night, £141.78), which has no 2026 inventory. Handback-aware pace90 is the same as pace to handback.

**Every other unit: pace UNKNOWN.** The kpi_pack shows STLY 0 because Smoobu history starts after the STLY as-of date (15 Nov 2025). P02 kpi_pack STLY30 7 n / £701.88 vs 0 on the books, but it is blocked on purpose and not assessed.
- **On the books, stays 15 Nov–14 Dec** (kpi_pack `pace_30`): P01 15 n / £2,281.95; P05 20 / £10,257.71; P06 9 / £1,866.61; P09 12 / £1,232.50; P10 4 / £423.86; P11 17 / £3,242.94; P13 22 / £3,353.95; P20 18 / £3,236.90. P04: UNKNOWN in the pack (`pace_30` empty).

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 15 Nov 07:20Z pull (`occ15/rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +30 n / +£7,976.33 incl. P06.** Yesterday: +23 / +£6,543.91.
- **Like-for-like, excluding both P06 stays on the reopened nights (18–22 Nov £856.79; 24–29 Nov £1,009.82): +21 n / +£6,109.72.** Yesterday: +14 / +£4,677.30.
- **Day-on-day:** P12 +7 / +£1,432.42 (the new 7–14 Dec stay). No other raised-unit change.
- Made: 27 / 104 n / £22,611.65. Cancelled: 13 / 74 n / £14,635.32.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| **P12** | **9 / 39 / £7,846.86** | 6 / 28 / £6,186.65 | **+11 / +£1,660.21** (was +4 / +£227.79) |

**Comparison groups:** unraised (P02, P08, P10, P14, P20) +44 n / +£7,640.04 (unchanged); P13 +24 / +£4,242.06 (was +19 / +£3,394.96); P04 +50 / +£2,115.38 (was +46 / +£1,625.79).

**What this means:** without P05, the raised group like-for-like is now +9 n / +£1,194.51 (yesterday +2 / −£237.91). The whole move is one P12 booking that sold at 0.720× Smoobu. The caveats are unchanged:
- The rise cannot be separated from the 24 Oct and 12 Nov Booking.com markup changes, Booking.com promotions, Reyhan's overrides or the P06 block changes.
- The sample is 1–9 bookings per property.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 16 Oct–14 Nov.
- Fwd occ30: Smoobu, 15 Nov–14 Dec, handback-aware (market in brackets).
- Pace30: stays 15 Nov–14 Dec (P12 to the 13 Dec handback).
- Pickup 7d: made 9–15 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £157.22 | £157.22 | 100% of 15 non-blocked (36%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 40.0% | £98.09 | £39.24 | all blocked (52%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (56%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | **56.7%** (24%) | UNKNOWN: no history | +4 / +£489.59 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 83.3% | £375.50 | £312.91 | 66.7% (46%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £199.63 | £146.39 | 60.0% of 15 non-blocked (51%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 83.3% | £142.36 | £118.63 | handed back after 13 Nov (53%) | — | 0 / £0 | Not classified: no inventory (handed back) |
| P09 | Greenwich | 50.0% | £118.43 | £59.21 | 100% to 26 Nov (40%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 93.3% | £105.96 | £98.90 | 100% to 18 Nov (32%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 70.0% | £170.72 | £119.51 | **56.7%** (51%) | UNKNOWN: no STLY | +6 / +£788.50 | **Soft** (fwd30 < 60%); was on the line at 60.0% |
| P12 | Mile End | 73.3% | £164.14 | £120.37 | **69.0%** to handback (44%) | **−5 n / −£360.62 / −8.0%** (kpi_pack 30-day −10.8%) | +5 / +£918.61 | **On track** (was Soft) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £155.56 | £93.33 | 73.3% (46%) | UNKNOWN: no STLY | +5 / +£847.10 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (49%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 63.3% | £170.45* | £107.95* | 64.3% of 28 non-blocked (40%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 1: **P12**.
- Soft 3: P04, **P11**, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Not classified 4: blocked by policy P02, P03, P07; P08 handed back.

**Last 365 nights** (kpi_pack `last365`, 15 Nov 2025–14 Nov 2026; occ / ADR / RevPAR / revenue):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 42.5% | £175.53 | £74.54 | £27,207.58 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 60.0% | £372.85 | £223.71 | £81,654.86 |
| P06 | 37.5% | £235.26 | £88.30 | £32,230.00 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 40.8% | £115.09 | £46.98 | £17,148.74 |
| P10 | 41.6% | £113.64 | £47.32 | £17,272.69 |
| P11 | 79.5% | £173.94 | £138.20 | £50,443.60 |
| P12 | 81.4% | £192.27 | £156.45 | £57,103.74 |
| P13 | 79.5% | £158.18 | £125.67 | £45,871.00 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`; bookings / median lead / median stay / channel revenue share):

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9%, Website 13.3%, Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | **5** | **6 d** | 4 n | Airbnb **60.7%**, Booking.com **39.3%** |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4%, Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3%, Booking.com 41.2%, Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6%, Airbnb 43.5%, Agoda 1.9% |
| P12 | 81 | 31 d | 4 n | Booking.com **89.8%**, Airbnb 10.2% |
| P13 | **86** | **22 d** | 3 n | Booking.com **52.8%**, Airbnb **46.4%**, Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 8 | 8 d | 7 n | Airbnb 100% |

P12 stays at 81 bookings: the new stay was added and a 2025 row left the 365-day window (Dispatcher).

### Orphan gaps, next 60 (Smoobu `/api/rates` 15 Nov 07:20Z; P13 as one calendar; handbacks respected)
An orphan is an open night that no stay can cover, given the min stay on each arrival night and the bookings, blocks or handback around it. All units checked by script (`occ15/orph.py`).

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P04** | **24 Nov, NEW** | £164 / 3 | The new 20–24 Nov Airbnb stay checks out and the 25 Nov–2 Dec stay (160754176) arrives the next day. | Created by the 14 Nov booking. kpi_pack `gaps` flags it (24 Nov, 1 n, min 3). PriceLabs does not know: the booking is not registered, `unbookable` 0. |
| P06 | 29 Nov | £258 / 4 | The 24–29 Nov stay checks out and block 143402691 starts 30 Nov. | **t-p06-2229open: not changed.** PriceLabs `unbookable` 1 (raw `prices_3288517.json`, refreshed 14 Nov 08:42:41Z). |
| P11 | 8 Dec | £199 / 3 | The 5–8 Dec stay checks out and the 9–14 Dec stay arrives. | **t-p11-8dec-orphan: NOT FIXED.** PriceLabs `unbookable` 1 (raw `prices_3064196.json`, refreshed 14 Nov 09:03:16Z). |
| P20 | 5 Dec | £298 / 3 (was £306) | The 25 Nov–5 Dec stay checks out and the 6–14 Dec stay arrives. | **t-p20-5dec-orphan: NOT FIXED (6th day).** PriceLabs `unbookable` 1 (raw `prices_3547481.json`, refreshed 14 Nov 08:42:50Z). |

**Re-checked as asked:**
- **P04 18–24 Nov:** what is left open is **18–19 Nov (2 nights) and 24 Nov (1 night)**.
  - 18–19 Nov sits between the 14–18 Nov stay checking out and the new 20 Nov arrival. At min 3 (PriceLabs; policy) it is a 2-night orphan run, which is how kpi_pack `gaps` reads it (18 Nov, 2 n, min 3).
  - Smoobu now has **min 2** on 18–19 Nov (£175 / £165, changed overnight), so in Smoobu it is sellable as one 18–20 Nov 2-night stay only. That breaches the P04 3-night rule (conflict below).
- **P13 around 18–23 Dec: no orphan.** The new stay leaves 10–17 Dec as an 8-night run (min 3; 3064856 £207–263, 3090701 £180–226) and 23–26 Dec as a 4-night run (min 3; £220–226 / £232–238), ending at the 27 Dec arrival (161543656).
- **P11 8 Dec:** still an orphan (above).
- **P06 22–23 Nov: not an orphan, but only one stay fits.** It is a 2-night run (£271 min 2 / £239 min 3) between the 18–22 Nov stay and the 24 Nov arrival. Only a 22–24 Nov stay can sell it.
- **P06 29 Nov:** still an orphan (above).
- **P20 5 Dec:** still an orphan (above).
- **P12 7–13 Dec: filled** by the new stay right up to the 13 Dec handback. No P12 orphan.
- **New:** P04 24 Nov only. **Lapsed overnight:** none (14 Nov was booked or not an orphan on every unit).
- **Exact fits (sellable by one stay length only):** P11 2–4 Dec (3 nights at min 3: £247 / £263 / £318).
- **Single nights at min 1 (bookable, not orphans):** P12 26 Nov (£303); P13 17 Nov (£244 / £207), 27 Nov (£304 / £258) and 1 Dec (£279 / £223; policy intentional override); P04 2 Dec (£407; policy-deprioritised).

### Gaps to fill (open nights next 30, 15 Nov–14 Dec, Smoobu 15 Nov 07:20Z)
- **P04 (13):** 18–19 Nov (£175 / £165, Smoobu min 2); 24 Nov (orphan); 2 Dec (£407, min 1, policy); 6–14 Dec (£155–173, min 3; the run continues to 19 Dec).
- **P05 (10):** 16–17 Nov (£378 / £391, min 2); 29 Nov–2 Dec (£491–511, min 3); 7–8 Dec (£466 / £446, min 2); 13–14 Dec (£492 / £479, min 2).
- **P06 (6):** 15–17 Nov (£222 / £222 / £233, min 2); 22–23 Nov; 29 Nov (orphan).
- **P11 (13):** 18–19 Nov (£153 / £177, min 2); 22–27 Nov (£195–277, min 3); 2–4 Dec (£247–318, min 3); 8 Dec (orphan); 14 Dec (£214; the run continues to 18 Dec).
- **P12 (9):** 17–20 Nov (£269–311, min 2); 26 Nov (£303, min 1); 30 Nov–3 Dec (£267–307, min 2).
- **P13 (8):** 17 Nov, 27 Nov and 1 Dec (min 1); 10–14 Dec (£228–263 / £182–210, min 3; the run continues to 17 Dec).
- **P14 (30):** all nights at £450–486 (special setup, numbers only).
- **P20 (10):** 15–17 Nov (£200 / £200 / £210, min 3/2/2; 15 Nov is tonight); 20–24 Nov (£214–258); 5 Dec (orphan); 14 Dec (£323, min 3).
- **P01, P09, P10:** none. P08 is handed back.

### Conflicts for Corentin (Smoobu state or Reyhan's edits vs standing decisions; not new proposals)
1. **P04 min stay** (policy: never fewer than 3 nights). Smoobu has min 2 on 18–19 Nov since the 14 Nov pull (was 3); PriceLabs still min 3 and `get_user_logs` shows no change. Who set it is UNKNOWN.
2. **P06 Marylebone (intentional-block listing).** The 12 Nov block change has sold 24–29 Nov and still leaves the min-4 orphan on 29 Nov; 22–23 Nov is sellable only as 22–24 Nov. Who reopened the nights and why is UNKNOWN (t-p06-2229open).
3. **P11 darts nights.** The 21 Oct decision is "average above £300/night". 13 Dec sold in a stay averaging £172.72/n room. 14–17 Dec are open at Smoobu £214 / £220 / £215 / £235 = average £221.00. Reyhan's override stands, per the 24 Oct note.
4. **P20 delivery.** Policy says the delivery block is 20–22 Nov. Smoobu blocks only 18–19 Nov (162432556, unchanged), and 20–22 Nov are open.
5. **P01 18–20 Dec.** The gap block (160657036) still runs to the 20 Dec handback. Policy says the gap block runs to 17 Dec.

**PriceLabs changes since 14 Nov** (`get_user_logs`, listing, 14–15 Nov): **0 entries.**

Data gaps:
- **PriceLabs does not hold the P04 20–24 Nov booking.** 3562176 last refreshed 14 Nov 08:42:40Z (live check 15 Nov), so kpi_pack `forward_occ_30` P04 (55.2%) is stale and PriceLabs sees 24 Nov and 18–19 Nov as part of an open run. Smoobu is the source used here.
- **P04 min-stay change 18–19 Nov:** who and why, UNKNOWN (no Smoobu change log; no `get_user_logs` entry).
- **Smoobu prices at the moment of booking:** not recorded. Prices moved on every unit between the 14 Nov 07:19Z and 15 Nov 07:20Z pulls, so paid-vs-Smoobu ratios are given on both.
- **Promotion stack on the P12 and P13 Booking.com bookings:** NOT CHECKED (no extranet reservation screenshots).
- **P04 Airbnb listing ID** behind the 20–24 Nov booking: NOT CHECKED (Smoobu holds the confirmation code only).
- **Reyhan's −5% on P13 10–26 Dec at the time of the 18–23 Dec booking:** NOT CHECKED (no override history).
- **STLY history for every unit except P12,** so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **Reasons NOT KNOWN:** P01 gap block to 21 Dec; P20 block 18–19 Nov vs the 20–22 Nov delivery in policy; P06 22–29 Nov reopening.
- **Smoobu time zones:** `created-at` / `modifiedAt` time zone not stated.
- **Not in the data:**
  - P03 is not in Smoobu.
  - P04 last-30 / last-365 / pace are null in kpi_pack.
  - P08 `forward_occ_30` is null (handed back).
  - P15–P19 are not mapped.
- **Market and comps inputs:** `market.csv`, `comps.csv` and `channel_checks.csv` are empty in the 15 Nov kpi_pack (`missing`), so there is no ARI or RGI.
- **Revenue scope:**
  - P20 18–22 Oct revenue was paid separately and is not in Smoobu.
  - `total_gbp` excludes cleaning, so all revenue is room only.

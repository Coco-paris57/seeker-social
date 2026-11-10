## Occupancy & performance

**Portfolio, last 30 nights (11 Oct–9 Nov 2026), the 13 units with Smoobu history (P01, P02, P05–P14, P20):** 250 n, £42,514.05, occupancy 64.1%, ADR £170.06, RevPAR £109.01.
- Source: `reports/2026-11-10/kpi_pack.json` `portfolio_last30`.
- Revenue is Smoobu basePrice, so room only with cleaning excluded.
- Yesterday's window (10 Oct–8 Nov) was 255 n / 65.4% / £171.65 / £112.24.

**Last 365 nights (10 Nov 2025–9 Nov 2026):** 2,180 n, £400,800.16, occupancy 45.9%, ADR £183.85, RevPAR £84.47 (kpi_pack `portfolio_last365`).
- Most Smoobu history starts in 2026, so this understates a full year.
- The 2025 P12 6–9 Nov row has left the window.

**Booked next 30 nights (10 Nov–9 Dec): 164 of 265 non-blocked nights = 61.9%.** Yesterday (9 Nov–8 Dec) it was 163/274 = 59.5%.
- **Next 60 nights (10 Nov–8 Jan):** 231/452 = 51.1%. Yesterday 235/462 = 50.9%.
- **Source:** live Smoobu GET `/api/reservations` (900 records incl. cancellations and blocks; guest fields dropped before saving) and `/api/rates`, both pulled 10 Nov 07:26:06Z.
  - The two endpoints agree on every unit-night for the next 60 (0 mismatches; P13 read as one calendar).
  - Saved to scratch `occ10/smoobu_res.json` and `occ10/smoobu_rates.json`.
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, policy).
  - Every night after a handback: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–17 Dec (handback gap block), P06 from 22 Nov (policy), P20 18–19 Nov (delivery block), P09 11 Nov (reason NOT KNOWN), and **P11 10–13 Nov, which is new**.
  - **The P11 block:** Smoobu "Blocked channel" 162775668, created 9 Nov 18:37 Smoobu time. Its reason is NOT KNOWN and it is not in the policy. If those 4 nights were counted as open, next 30 would be 164/269 = 61.0%.
- **Cancelled nights:** Smoobu cancellations are not counted. The kpi_pack `pace_30` on-the-books nights equal the Smoobu count for every unit (P01 20, P05 22, P06 7, P08 4, P09 15, P10 9, P11 12, P12 16, P13 24, P20 21).
  - The PriceLabs 10 Nov raw already shows P12 11–12 Dec and P13 11–14 Dec as open (`prices_2699998`, `prices_3064856`).
  - So no cancelled night is being counted as booked.

### Last night (9 Nov) and the overnight bookings
**P05 9 Nov did NOT sell.** No P05 reservation covers it: the 8 Nov stay 161869336 departs 9 Nov, and the next arrival is 10 Nov. `reservations.csv` 10 Nov has no new P05 row. Smoobu `/api/rates` shows 9 Nov still open at £1,422, min 1. The night has passed, so a-p05-9nov closes as unsold.

**New P20 Waterford Court Airbnb booking, 21–25 Nov (4 n):** room £638.54, cleaning £150, commission £122.22.
- Smoobu 162781746, made 9 Nov 22:34 Smoobu time, 12 days before arrival (`reservations.csv` 10 Nov).
- **Paid vs price (all prices for 21–24 Nov):**
  - Against the PriceLabs prices pushed 9 Nov 21:26:36Z, just before the booking (`raw/prices_3547481.json` 10 Nov: 266 + 219 + 250 + 247 = £982), the room paid **0.650×**. Against `user_price` (£994) it paid 0.642×.
  - Against the Smoobu rates at 9 Nov 07:19Z (£1,058) it paid 0.604×.
  - 0.650 = 0.85 × 0.765, which is consistent with Airbnb's 15% last-minute discount (0–14 days, policy `listing_facts.P20`) on top of the hidden 0.765 layer. The channel section owns the explanation.
- **Orphans it leaves:**
  - **20 Nov is now an orphan:** 1 n at £259, min 3, between the 18–19 Nov block and the 21 Nov arrival. kpi_pack `gaps` lists it (from 20 Nov, 1 n, min 3). PriceLabs still shows it as bookable (unbookable 0), because its refresh at 21:26Z came before the booking.
  - **25 Nov is not an orphan:** it is a back-to-back changeover into 161733361 (25 Nov–5 Dec).
- **Conflict with policy, for Corentin to confirm (t-p20-delivery):** policy `listing_facts.P20.block_20_21_nov` says the Smoobu block for delivery is 20–22 Nov. In Smoobu the only P20 block is 18–19 Nov (162432556, created 3 Nov 10:31), and the 21–25 Nov booking now sells 21–22 Nov. Corentin needs to confirm whether delivery moved to 18–19 Nov.

**P12 Mile End Booking.com 11–13 Dec (162688853, £513.81, booked 5 Nov) was CANCELLED** on 9 Nov at 23:30:03 Smoobu time.
- **11–13 Dec is now part of an open run, 7–13 Dec (7 n to the handback):** Smoobu £279–321, min 3.
- **13 Dec is not an orphan:** it can sell as the last night of any stay of 3+ nights ending 14 Dec.
- **Min 3 came from Reyhan's override,** set 9 Nov 22:30:10Z for 7–14 Dec (−5%, min 3; `get_user_logs`). Yesterday 13 Dec was min 1 at £364. So t-p12-13dec-orphan is moot: the cancellation removed the single-night gap.

**P13 Shepherd's Bush Booking.com 11–15 Dec was made and cancelled the same day.**
- **Booking details:** listing **3064856** ("Top-Floor 2Bed…"; linked to 3090701 per policy). Smoobu 162759785, made 9 Nov 08:58 and cancelled 20:36:35 Smoobu time. Room £710.77, commission £172.15.
- **Paid vs price, 11–14 Dec:** against the Smoobu rates at 9 Nov 07:19Z, which equal the PriceLabs 9 Nov raw `price` (`prices_3064856`, refreshed 8 Nov 12:40Z), £847, the room paid 0.839×. Against `user_price` (£872) it paid 0.815×.
- **Commission:** £172.15 is 24.2% of room and 20.0% of the £860.77 total. Whether a booster explains it is NOT CHECKED here; the channel section owns it.
- **Calendar now:** P13 10–26 Dec is a 17-night open run at min 3.

### Booked vs market, next 30 / next 60
Booked figures are Smoobu, 10 Nov 07:26Z. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (20/20 non-blocked) | 35% | 100% (23/23 to handback 20 Dec) | 29% | 65.5% (100% ex blocks) |
| P04 | 46.7% (14/30) | 24% | 45.0% (27/60) | 20% | 48.3% |
| P05 | 73.3% (22/30) | 43% | 71.7% (43/60) | 39% | 72.4% |
| P06 | 58.3% of 12 non-blocked (7/12; 18 blocked by policy) | 49% | 7/12 (48 blocked) | 42% | 24.1% (63.6% ex blocks) |
| P08 | 100% (4/4 to handback 13 Nov) | 51% | same | 43% | 100% |
| P09 | 93.8% (15/16 non-blocked to handback 26 Nov) | 37% | same | 32% | 87.5% (93.3% ex blocks) |
| P10 | 100% (9/9 to handback 18 Nov) | 31% | same | 25% | 100% |
| P11 | 46.2% of 26 non-blocked (12/26; 10–13 Nov block) | 48% | 42.9% (24/56) | 38% | 41.4% (46.2% ex blocks) |
| P12 | 53.3% (16/30) | 42% | 47.1% (16/34 to handback 13 Dec) | 34% | 51.7% |
| P13 (one flat) | 80.0% (24/30) | 43% | 51.7% (31/60) | 37% | 82.8% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 38% | 0% |
| P20 | 75.0% of 28 non-blocked (21/28) | 38% | 55.2% (32/58) | 31% | 69.0% (74.1% ex blocks) |

### 7-day pickup, net of cancellations (bookings made 4–10 Nov, to 07:26Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. Room £ is Smoobu basePrice. No imported past stays fall in the window.

**Totals:**
- **Gross made:** 11 bookings / 50 n / £11,047.74. Still confirmed: 8 / 39 n / £8,905.43.
- **Cancelled in the window:** 5 / 24 n / £4,075.35. These are P09 1–10 Nov, P12 3–7 Dec, **P12 11–13 Dec**, **P13 11–15 Dec** (made and cancelled) and P13 20–25 Dec (made and cancelled).
- **Net: +26 n / +£6,972.39.** Yesterday (3–9 Nov) it was +27 n / +£7,528.06.
- **How the change reconciles:** +P20 21–25 Nov (+4 / +£638.54), −P12 11–13 Dec cancellation (−2 / −£513.81), and P11 26–29 Nov leaving the window as a 3 Nov booking (−3 / −£680.40). P13 11–15 Dec nets to 0.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P20 | 3 / 19 / £3,560.79 (**21–25 Nov £638.54**; 6–14 Dec £1,494.25; 19–26 Dec £1,428.00) | — | **+19 / +£3,560.79** |
| P05 | 1 / 6 / £2,962.17 (15–21 Dec) | — | +6 / +£2,962.17 |
| P06 | 1 / 4 / £856.79 (18–22 Nov) | — | +4 / +£856.79 |
| P13 | 3 / 12 / £2,113.70 (7–10 Dec £485.20; **11–15 Dec** and 20–25 Dec made and cancelled) | 9 / £1,628.50 | +3 / +£485.20 |
| P12 | 2 / 5 / £1,191.60 (4–7 Dec £677.79; **11–13 Dec, cancelled 9 Nov**) | 3–7 Dec 4 / £1,072.44; 11–13 Dec 2 / £513.81 | **−1 / −£394.65** |
| P09 | 1 / 4 / £362.69 (7–11 Nov) | 1–10 Nov 9 / £860.60 | −5 / −£497.91 |
| P01, P02, P04, P07, P08, P10, P11, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` is gross and ignores cancellations. It matches the confirmed bookings: P05 6 n, P06 4, P09 4, P12 3 / £677.79, P13 3 / £485.20, P20 19 / £3,560.79.

### Pace vs STLY (stays from 10 Nov; cancelled bookings excluded on both sides)
**P12** (kpi_pack `pace_30` / `pace_90`; the handback row is recomputed with `rm.metrics.on_the_books` on `reservations.csv` 10 Nov):

| P12 measure | 9 Nov | 10 Nov |
|---|---|---|
| Pace30 (stays 10 Nov–9 Dec) | −9 n / −£1,061.60 / −24.5% | **16 n / £3,141.28 vs 26 n / £4,336.15 = −10 n / −£1,194.87 / −27.6%** |
| To handback (stays 10 Nov–13 Dec) | −10 n / −£1,141.79 / −23.2% | **16 n / £3,141.28 vs 29 n / £4,930.15 = −13 n / −£1,788.87 / −36.3%** |
| Pace90 (stays 10 Nov–7 Feb; nothing after 13 Dec is inventory) | −22 n / −51.9% | 16 n / £3,141.28 vs 41 n / £7,882.85 = −25 n / −£4,741.57 / −60.2% |

The 11–13 Dec cancellation is the whole change in the handback row: −2 n, plus 9 Nov passing as a booked night.

**Every other unit: pace UNKNOWN.** Their first Smoobu arrival is after the STLY as-of date of 10 Nov 2025 (`reservations.csv`: P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). kpi_pack STLY = 0 here means missing history.
- **P02:** STLY 5 n / £453.88 (pace30), but it is blocked on purpose, so it is not assessed.
- **On the books, stays 10 Nov–9 Dec (kpi_pack `pace_30`, equal to Smoobu):**
  - P01 20 n / £3,042.60
  - P05 22 / £11,031.71
  - P06 7 / £1,397.79
  - P08 4 / £517.64
  - P09 15 / £1,576.38
  - P10 9 / £953.68
  - P11 12 / £2,683.73
  - P13 24 / £3,665.30
  - P20 21 / £3,638.32
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 10 Nov 07:26Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +15 n / +£5,466.49 including P06's reopened nights.** Yesterday it was +17 / +£5,980.30.
- **Like-for-like, excluding P06 18–22 Nov (reopened 5 Nov by the policy-block change): +11 n / +£4,609.70.** Yesterday it was +13 / +£5,123.51.
- **The whole change is the P12 11–13 Dec cancellation (−2 n / −£513.81).**
- Made: 22 / 76 n / £17,687.65. Cancelled: 10 / 61 n / £12,221.16.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 |
| P05 | 3 / 12 / £4,915.21 | — | +12 / +£4,915.21 |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov reopened, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | **6 / 28 / £6,186.65** | **+4 / +£227.79** (was +6 / +£741.60) |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +48 n / +£8,278.58. It was +44 / +£7,640.04; the change is the new P20 21–25 Nov booking.
- P13: +19 n / +£3,394.96, unchanged. The 11–15 Dec booking counts as made and cancelled, so it nets to zero.
- P04: +46 n / +£1,625.79, unchanged.

**Caveats (unchanged):** the rise cannot be separated from four other changes:
- the 24 Oct Booking.com markup cut
- Booking.com promotions
- Reyhan's overrides
- the P06 block change

The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 11 Oct–9 Nov.
- **Fwd occ30:** Smoobu, 10 Nov–9 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 10 Nov–9 Dec.
- **Pickup 7d:** made 4–10 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £158.92 | £158.92 | 100% to gap block (35%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 56.7% | £100.99 | £57.23 | all blocked (49%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 70.0% | £366.06 | £256.24 | 73.3% (43%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 80.0% | £203.83 | £163.06 | 58.3% of 12 non-blocked (49%) | UNKNOWN | +4 / +£856.79 | **Soft** (fwd30 < 60%; policy-blocked nights excluded) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (26%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £149.57 | £129.63 | 100% to 13 Nov (51%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback) |
| P09 | Greenwich | 56.7% | £120.87 | £68.49 | 93.8% to 26 Nov (37%) | UNKNOWN: no STLY | −5 / −£497.91 | **Compressed** (≥ 85%) |
| P10 | Ealing / Hanger Lane | 90.0% | £110.52 | £99.47 | 100% to 18 Nov (31%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £168.94 | £129.52 | 46.2% of 26 non-blocked (48%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £173.93 | £133.35 | 53.3% (42%) | **−10 n / −£1,194.87 / −27.6%** | −1 / −£394.65 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 70.0% | £149.31 | £104.51 | 80.0% (43%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 70.0% | £166.73* | £116.71* | 75.0% of 28 non-blocked (38%) | UNKNOWN: no STLY | +19 / +£3,560.79 | Unclassifiable (60–85%, no STLY); **was Soft** |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 4: P01, P08, P09, P10.
- On track 0.
- Soft 5: P04, P06, P11, P12, P14.
- Unclassifiable 8: P05, P13, P20, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- **Change from yesterday: P20 moved Soft → Unclassifiable.** Its fwd30 went from 57.1% to 75.0%: +4 n from 21–25 Nov, 9 Nov (unsold) left the window, and 9 Dec (booked) entered it.

**Last 365 nights** (kpi_pack `last365`, 10 Nov 2025–9 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 41.1% / £176.31 / £72.46 / £26,446.93
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 58.6% / £371.87 / £218.03 / £79,581.11
- P06 36.7% / £236.49 / £86.82 / £31,689.00
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.8% / £173.59 / £70.86 / £25,864.99
- P09 40.0% / £115.10 / £46.04 / £16,804.86
- P10 40.3% / £113.90 / £45.87 / £16,742.87
- P11 79.2% / £173.75 / £137.57 / £50,214.31
- P12 81.6% / £191.61 / £156.44 / £57,099.57
- P13 78.9% / £158.19 / £124.82 / £45,559.65
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.0% / £166.17 / £10.02 / £3,655.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 62 / 44 / 4: Airbnb 100%
- P06 33 / 14 / 4: Airbnb 73.6%, Booking.com 26.4%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 18 / 5: Airbnb 57.3%, Booking.com 41.2%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 81 / 31 / 4: Booking.com 89.6%, Airbnb 10.4% (was 83 yesterday; same day as the 11–13 Dec cancellation and the 6–9 Nov 2025 row dropping out of `reservations.csv`, cause not separated)
- P13 85 / 21 / 3: Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 9 / 8 / 4: Airbnb 100% (was 8 / 8 / 7)

### Orphan gaps, next 60 (Smoobu `/api/rates` 10 Nov 07:26Z; P13 as one calendar; handbacks respected)
An orphan here is an open night that no stay can cover, given the min stay on each arrival night and the bounding bookings, blocks or handback. All units were checked by script.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status vs yesterday's plan |
|---|---|---|---|---|
| **P09** | **12 Nov** (day after tomorrow) | £123 / 2 | It sits between the 11 Nov "Blocked channel" block (162726554, reason NOT KNOWN) and the 13 Nov arrival. | **NOT FIXED** (t-p09-1112block). There is no P09 entry in `get_user_logs` since 9 Nov. PriceLabs 10 Nov raw `prices_3318172` (refreshed 9 Nov 07:50Z): user_price 126, min 2, **unbookable 1**. |
| **P20** | **20 Nov** (NEW) | £259 / 3 | It sits between the 18–19 Nov block and the new 21–25 Nov arrival. | Created by last night's booking. Reyhan had set 20–21 Nov to min 3 at 21:25:39Z, before the booking. kpi_pack `gaps` lists it. Linked to the delivery-dates question above. |
| **P20** | **5 Dec** | £309 / 3 | The 25 Nov–5 Dec stay checks out and the 6–14 Dec stay arrives the next day. | **NOT FIXED** (t-p20-5dec-orphan). Reyhan's 1–20 Dec override (0%, **min 3**, 9 Nov 21:25:55Z) keeps min 3. PriceLabs 10 Nov raw: user_price 289, min 3, **unbookable 1**. |

**Resolved or checked, not orphans now:**
- **P05 13–14 Dec (t-p05-dec-orphans): RESOLVED on min stay.** Reyhan's override, 9 Nov 14:07:58Z (+5%, min 2), puts 2 n at min 2 (£520 / £501). The run can now sell.
- **P05 21 Dec and 29 Dec:** both are single nights between bookings, now at **min 1**, so a stay is allowed.
  - **Prices:** Smoobu £2,207 and £2,855; PriceLabs `user_price` 2,177 and 2,825; uncustomized £732 and £1,176.
  - **The price comes from Reyhan's +300% overrides** on 21 Dec and 29 Dec (9 Nov 14:08:13Z and 14:08:30Z, min 1). It is not an orphan premium.
  - **The max change matters for 29 Dec only.** The max went from 2,500 to 3,500 at 14:08:54Z. 29 Dec (£2,855) is above the old £2,500 max, so the new max is what lets it through; 21 Dec (£2,207) was already under the old max.
  - Whether these prices block a sale is a pricing question for the strategy director. In occupancy terms they are open single nights, both still unsold.
- **P12 13 Dec:** now part of the 7–13 Dec open run (see above). 26 Nov stays min 1 (£306).
- **P13:** 17 Nov, 27 Nov and 1 Dec are min 1 (1 Dec is intentional per policy). Reyhan's 10 Dec +40% min 1 override (14:07:21Z) was set while the 11–15 Dec booking existed, then superseded by the 10–26 Dec −2% min 3 override (21:22:44Z) after it was cancelled. 10–26 Dec is a 17-night run.
- **P20:** 13–17 Nov (5 n, min 3/2) and 14–18 Dec (5 n, min 3) fit their min stays. 25 Nov is a changeover.
- **P11:** 18–19 Nov (2 n, min 2) and 23–25 Dec (3 n, min 2) fit.
- **P04:** 2 Dec min 1 (£458, policy-deprioritised). 10–13 Nov (4 n, min 3) fits.

### Gaps to fill (open nights next 30, 10 Nov–9 Dec, Smoobu 10 Nov 07:26Z)
- **P09:** 12 Nov (orphan).
- **P20:**
  - Orphans: 20 Nov and 5 Dec.
  - Also open: 13–17 Nov (£237–306).
- **P05:**
  - 16–17 Nov (£377 / £393, min 2)
  - 29 Nov–2 Dec (£498–515, min 3)
  - 7–8 Dec (£475 / £472, min 2)
- **P06** (min 2): 10–11 Nov (£218 / £231) and 15–17 Nov (£238–246).
- **P04** (min 3): 10–13 Nov (£138–144), 18–24 Nov (£140–152) and 6–9 Dec (£184–186). Also 2 Dec (policy).
- **P11:**
  - 18–19 Nov (£165 / £191, min 2)
  - 22–25 Nov (£211–216, min 3)
  - 29 Nov–4 Dec (£202–313, min 3)
  - 8–9 Dec (£226–227)
  - 10–13 Nov is blocked, reason NOT KNOWN.
- **P12:**
  - 12–13 Nov (£201 / £250, min 2)
  - 17–20 Nov (£245–280, min 2)
  - 26 Nov (min 1)
  - 30 Nov–3 Dec (£268–297, min 2)
  - 7–9 Dec (£277–289, min 3)
  - Beyond next 30: 10–13 Dec, to the handback.
- **P13:**
  - 10–12 Nov (£183–192 / £173–182, min 2)
  - 17 Nov, 27 Nov and 1 Dec (min 1)
- **P14:** all nights (special setup, numbers only).
- **P01, P08, P10:** none (sold out to the block or the handback).

**PriceLabs changes since 9 Nov 06:00Z:** `get_user_logs`, listing, 49 entries, all by Reyhan, 9 Nov 14:06–22:30Z.
- **Occupancy-relevant:**
  - P05 13–14 Dec min 2, and 21 / 29 Dec +300% min 1 with max 3500.
  - P11 10–13 Nov fixed min 2 (before the Smoobu block) and 22 Nov–18 Dec −8% / −3% min 3.
  - P12 7–14 Dec −5% min 3.
  - P13 10–26 Dec −2% min 3.
  - P20 13–15 Nov and 20–21 Nov min 3, 1–20 Dec min 3.
  - Nothing on P09.
- **Settings Corentin needs to confirm (I make no proposal):**
  - **P14 minimum 500 → 450** (21:24:24Z). This conflicts with the policy special setup "incl. the £500 minimum". Corentin needs to confirm.
  - **P04 base 220 → 200** (21:26:45Z). This is a base decision for Corentin to confirm.
- The pricelabs section owns the remaining entries.

Data gaps:
- STLY history for every unit except P12. Pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- Reasons NOT KNOWN for two Smoobu "Blocked channel" blocks:
  - P11 10–13 Nov (162775668, created 9 Nov 18:37). It removes 4 nights, including tonight.
  - P09 11 Nov (162726554). It creates the 12 Nov orphan.
- P20 delivery dates: policy says 20–22 Nov, Smoobu blocks 18–19 Nov. Corentin needs to confirm.
- The PriceLabs P20 raw (refreshed 9 Nov 21:26:36Z) predates the 21–25 Nov booking, so its view of the 20 Nov orphan is NOT YET REFRESHED. The P09 raw is from 9 Nov 07:50Z.
- Smoobu `created-at` and `modifiedAt` time zone is not stated by the API. One hint: the P12 cancellation reads 23:30 Smoobu time, while PriceLabs already showed 11–12 Dec open at its 22:30Z refresh, which would fit UTC+1. Not verified.
- P13 11–15 Dec commission (24.2% of room): booster status NOT CHECKED; the channel section owns it.
- P03: not in Smoobu. P04: last-30 and last-365 null in kpi_pack. P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 10 Nov kpi_pack was built (kpi_pack `missing`): no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu.
- `reservations.csv` `total_gbp` excludes cleaning, so all revenue is room only.

## Occupancy & performance

**Portfolio, last 30 nights (23 Oct–21 Nov 2026), the 14 units with Smoobu history:** 237 n, £40,697.80, occupancy 56.4%, ADR £171.72, RevPAR £96.90 (`reports/2026-11-22/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (22 Oct–20 Nov) it was 238 n / £40,615.33.
  - 22 Oct leaves: −10 booked (P01, P02, P04, P05, P06, P08, P09, P10, P11, P20; £1,750.55).
  - 21 Nov enters: +9 (P01, P04, P05, P06, P09, P11, P12, P13, P20; £1,833.00).
  - 238 − 10 + 9 = 237. £40,615.33 − £1,750.55 + £1,833.00 = £40,697.78 (2p rounding against the pack). Per-night figures are pro rata, from `data/snapshots/2026-11-22/reservations.csv`.

**Last 365 nights (22 Nov 2025–21 Nov 2026):** 2,245 n, £414,026.75, occupancy 47.3%, ADR £184.42, RevPAR £87.26 (kpi_pack `portfolio_last365`). Yesterday it was 2,238 n / £412,490.86.
- 21 Nov 2025 leaves −1 (P12, £174.72). 21 Nov 2026 enters +8 (£1,710.60; P04's £122.40 is excluded because P04 last365 is null).
- Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (22 Nov–21 Dec): 122 of 223 non-blocked nights = 54.7%, £28,664.34 room revenue on the books.** Yesterday it was 129/232 = 55.6%, £30,019.29.
**Booked next 60 (22 Nov–20 Jan): 174/403 = 43.2%, £45,203.15.** Yesterday it was 183/412 = 44.4%, £47,036.15.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 22 Nov 07:20:08Z. Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ22/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ22/smoobu_rates.json`.
  - **Pagination:** the full pull returned 853 rows / 852 ids. One P09 June record came back twice, and one P12 stay (1–5 Jun 2026, £769.74) was missing. A narrow pull (20 May–15 Jun) recovered it, giving 853 unique records.
  - The 720 non-block reservations then match `data/snapshots/2026-11-22/reservations.csv` row for row (ref, dates, status, amount).
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens (Smoobu 3588993) is not a mapped property and is not counted (see below).
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks: P08 and P10 fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; P06 22 Nov and from 6 Dec; **P11 22–26 Nov (new, see below)**.
- **Reconciling next 30 (129/232 → 122/223):**
  - 21 Nov leaves: −9 booked (P01, P04, P05, P06, P09, P11, P12, P13, P20; £1,833.00), −10 inventory (P14 was also open).
  - **P11 new block 22–26 Nov: −5 inventory (open nights), 0 booked.**
  - P04 17–20 Dec was booked and cancelled between the two pulls: 0.
  - 21 Dec enters: +2 booked (P11, P20; £478.05), +6 inventory (P04, P05, P13 and P14 also open).
  - 129 − 9 + 2 = **122**; 232 − 10 − 5 + 6 = **223**. £30,019.29 − £1,833.00 + £478.05 = **£28,664.34**.
- **Reconciling next 60 (183/412 → 174/403):**
  - 21 Nov leaves: −9 booked / −10 inventory / −£1,833.00.
  - P11 block: −5 inventory.
  - 20 Jan enters: 0 booked / +6 open (P04, P05, P11, P13, P14, P20).
  - 183 − 9 = **174**; 412 − 10 − 5 + 6 = **403**; £47,036.15 − £1,833.00 = **£45,203.15**.
  - The P05 Valentine's cancellation (13–17 Feb) is beyond 60 days, so it does not move these figures.
- PriceLabs `forward_occ_30` in kpi_pack (P04 37.9%, P11 48.3%, P13 62.1%, P20 72.4%, P12 76.2%, P05 69.0%) uses a different window and denominator. Smoobu is the truth.

### What changed overnight (21 Nov 07:18Z → 22 Nov 07:20Z)
- **Reservations stay at 720.** A P02 18–21 Nov 2025 stay left the 365-day window. A P14 Apr 2026 block (13–15 Apr) reappears: yesterday's pull most likely lost it to the same pagination fault.
- **No new confirmed booking.**
- **CANCELLED: P05 St John's Wood Airbnb 13–17 Feb 2027 (4 n).** Room £1,219.98 = £305.00/n; Smoobu total £1,414.98 incl. £195 cleaning.
  - Made 15 Nov 18:54 (lead 90 days); cancelled 21 Nov 19:12:44.
  - **Valentine's weekend reopened:** Smoobu 13–16 Feb **£435 / £407 / £416 / £421 = £1,679, min 4**, available (Smoobu GET `/api/rates` 22 Nov, `occ22/p05_feb_rates.json`).
  - 10–19 Feb are all open (min 4, £405–435), so this is a 10+ night open run, not an orphan.
  - No other P05 February record.
- **NEW then CANCELLED: P04 Barking Airbnb 17–20 Dec (3 n).** Room £338.12 = £112.71/n; Smoobu total £480.12 incl. £142 cleaning.
  - Created 21 Nov 20:20, cancelled 20:30:10 (10 minutes later). Lead 26 days.
  - **Net occupancy and revenue effect: 0.** 17–19 Dec are open again at **£142 / £147 / £153 = £442, min 3**, inside the open run 6–26 Dec.
  - For scale only: the room paid is 0.765× today's Smoobu price and 0.770× the 21 Nov 07:18Z Smoobu price (£142 / £146 / £151 = £439). The price live at 20:20 is NOT CHECKED. Paid-vs-price breakdown: channel agent.
- **NEW BLOCK: P11 Camden "Blocked channel" 22–27 Nov (nights 22–26 Nov, 5 n), created 22 Nov 00:44.** These nights were open yesterday at £187 / £184 / £200 / £197 / £218 (min 2). Smoobu `/api/rates` now shows them unavailable at £184 / £180 / £195 / £192 / £214 = £965.
  - Reason and who set it: NOT CHECKED.
  - P11 is not an intentional-block property in policy, so this goes to Corentin to confirm.
  - Effect: P11 next 30 is **14/25 = 56.0%** (yesterday 14/30 = 46.7%). The rise comes only from a smaller denominator; P11 booked nights are unchanged.
- **Scott Ellis Gardens (3588993):** the 20–28 Nov block was extended by one night to 20–29 Nov (checkout 29 Nov; modified 21 Nov 13:45).
- **P12:** `modifiedAt` was updated on two Booking.com stays (21–26 Nov at 21 Nov 14:38, 27–30 Nov at 22 Nov 01:00). Dates and amounts are unchanged, so there is no effect.
- No other bookings, cancellations or modifications.

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993)
- **Reservations: none.** The apartment has 5 Smoobu records, all "Blocked channel" blocks at £0:
  - 20–29 Nov (was 20–28 Nov)
  - 3–4 Dec, 8–9 Dec and 15–16 Dec
  - 5–6 Jan
- Smoobu `/api/rates` 22 Nov–21 Jan: 50 nights available, 11 unavailable. The 11 are 22–28 Nov plus 3 Dec, 8 Dec, 15 Dec and 5 Jan.
- This is consistent with the Dispatcher's PriceLabs note (10 Blocked in 23 Nov–21 Jan). Open-night examples: 23 Nov £298 (min 3), 30 Nov £301 (min 2).
- Not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 16–22 Nov to 07:20Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ22/pick_rise.py`.
- **Gross made:** 7 bookings / 25 n / £4,106.37. **Still confirmed:** 5 / 21 n / £3,424.92.
- **Cancelled in the window:** 5 / 25 n / £4,924.06:
  - P04 20 Dec–2 Jan £2,417.34 (16 Nov)
  - P05 13–17 Feb £1,219.98 (21 Nov)
  - P11 28 Nov–2 Dec £605.29 (20 Nov)
  - P20 5 Dec £343.33 (20 Nov)
  - P04 17–20 Dec £338.12 (21 Nov)
- **Net: 0 n / −£817.69.** Yesterday it was +13 n / +£3,047.89.
- **Reconciliation:**
  - 15 Nov leaves the made side: −14 n / −£3,492.70. These are P05 13–17 Feb (4 n, £1,219.98, now cancelled), P13 10–13 Dec (3 n, £468.94) and P20 27 Dec–3 Jan (7 n, £1,803.78).
  - 15 Nov leaves the cancelled side: P13 18–23 Dec, +5 n / +£847.10.
  - Overnight: P04 17–20 Dec made +3 / +£338.12 and cancelled −3 / −£338.12; P05 Valentine's cancelled −4 / −£1,219.98.
  - 13 − 14 + 5 − 4 = **0**. £3,047.89 − £3,492.70 + £847.10 − £1,219.98 = **−£817.69**.
  - Same 15–21 Nov window recounted on today's pull: +9 n / +£1,827.91 (yesterday's +13 / +£3,047.89, less P05 −4 / −£1,219.98).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 3 / 13 / £1,669.01 (18–20 Nov £254.15; 17–20 Dec £338.12, cancelled; 27 Dec–4 Jan £1,076.74) | 16 / £2,755.46 | **−3 / −£1,086.45** |
| P05 | 0 | 4 / £1,219.98 | **−4 / −£1,219.98** |
| P11 | 1 / 3 / £538.73 (27–30 Nov) | 4 / £605.29 | −1 / −£66.56 |
| P13 | 1 / 5 / £840.75 (22–27 Dec) | — | +5 / +£840.75 |
| P20 | 2 / 4 / £1,057.88 (19–22 Nov £714.55; 5 Dec £343.33, cancelled) | 1 / £343.33 | +3 / +£714.55 |
| P01, P02, P06, P07, P08, P09, P10, P12, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only) matches: P04 2 / 10 / £1,330.89, P11 1 / 3 / £538.73, P13 1 / 5 / £840.75, P20 1 / 3 / £714.55; all others 0.

### Pace vs STLY
Cancellations are excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-22/reservations.csv`).
- **P12, handback-aware.** Stays 22 Nov–13 Dec 2026 as of 22 Nov 2026, against 22 Nov–13 Dec 2025 as of 22 Nov 2025: **17 n / £3,573.49 vs 19 n / £3,644.08 = −2 n / −£70.59 / −1.9%. Within ±10%, so On track.**
  - Yesterday: −2 n / −£42.84 / −1.1%. 21 Nov 2026 (booked) and 21 Nov 2025 (booked, £174.72) both left the window.
  - kpi_pack `pace_30` (22 Nov–21 Dec, not handback-aware): −6 n / −16.9% (£3,573.49 vs 23 n / £4,302.64).
  - kpi_pack `pace_90`: −36 n / −62.9% (vs 53 n / £9,634.34). Nothing after 13 Dec is inventory.
- **P02:** kpi_pack 30-day 0 vs STLY 13 n / £1,389.31; 90-day 0 vs 20 n / £2,043.89. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 22 Nov 2025 exists for any unit except P02 (11) and P12 (25).

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 22 Nov 07:20Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +29 n / +£7,909.77 including P06; +20 n / +£6,043.16 like-for-like.** Yesterday it was +33 / +£9,129.75 and +24 / +£7,263.14.
- **The whole move is P05: −4 n / −£1,219.98.** The cancelled Valentine's stay was made 15 Nov, so it was counted on the made side and now also counts on the cancelled side.
- Like-for-like excludes the P06 stays on reopened nights: 18–22 Nov £856.79 and 24–29 Nov £1,009.82 (9 n / £1,866.61).
- Made: 29 / 111 n / £24,370.36. Cancelled: 15 / 82 n / £16,460.59 (was 14 / 78 n / £15,240.61).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| **P05** | 4 / 16 / £6,135.19 | **1 / 4 / £1,219.98** (was none) | **+12 / +£4,915.21** (was +16 / +£6,135.19) |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 9 / 32 / £5,839.13 | 6 / 38 / £7,472.46 | −6 / −£1,633.33 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- **Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37**, unchanged.
- P13: +27 n / +£4,704.65, unchanged.
- P04: +47 n / +£5,933.67 using `total_gbp`, unchanged. The 17–20 Dec booking was made and cancelled, so it nets 0; made is now 18 / 78 n and cancelled 7 / 31 n. Counting import-batch records without a basePrice as £0 gives +£3,446.27.
- **Caveats as before:**
  - The Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopening cannot be separated out.
  - The sample is 1–9 bookings per unit.
  - A cancellation is not evidence about price.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 23 Oct–21 Nov.
- Fwd occ30: Smoobu 22 Nov 07:20Z, 22 Nov–21 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 16–22 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £154.85 | £154.85 | 100% 8/8 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 16.7% | £102.07 | £17.01 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £120.45† | £88.33† | **40.0%** 12/30 (22%) | UNKNOWN: no STLY | **−3 / −£1,086.45** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £389.54 | £298.65 | 70.0% 21/30 (49%) | UNKNOWN: no STLY | **−4 / −£1,219.98** | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 76.7% | £199.15 | £152.68 | **38.5%** 5/13 non-blocked (52%) | UNKNOWN: no STLY | 0 | **Soft** (fwd30 < 60%; intentional-block listing) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 60.0% | £136.03 | £81.62 | handed back after 13 Nov (57%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £107.55 | £53.78 | 100% 5/5 to 26 Nov (41%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 90.0% | £105.96 | £95.37 | handed back after 18 Nov (33%) | — | 0 | Not classified: handed back |
| P11 | Camden | 70.0% | £183.38 | £128.37 | **56.0%** 14/25 non-blocked (51%) | UNKNOWN: no STLY | −1 / −£66.56 | **Soft** (fwd30 < 60%; 22–26 Nov newly blocked) |
| **P12** | Mile End | 66.7% | £156.90 | £104.60 | 77.3% 17/22 to handback (45%) | **−2 n / −£70.59 / −1.9%** handback-aware (pack −16.9%) | 0 | **On track** |
| P13 | Shepherd's Bush (one flat) | 60.0% | £144.10 | £86.46 | 63.3% 19/30 (47%) | UNKNOWN: no STLY | +5 / +£840.75 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (48%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £189.78 | £94.89 | 70.0% 21/30 (38%) | UNKNOWN: no STLY | +3 / +£714.55 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element. The P20 18–22 Oct extension was paid separately (policy `separate_payments`) and 22 Oct has now left the window.

**Classes:** Compressed 2 (P01, P09); On track 1 (P12); Soft 4 (P04, P06, P11, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 5 (P02, P03, P07 policy blocks; P08, P10 handed back). **No class changes since yesterday.**
- P04 43.3% → 40.0% (21 Nov booked left, 21 Dec open entered).
- P05 73.3% → 70.0% (21 Nov booked left).
- P06 42.9% → 38.5% (21 Nov booked left).
- P11 46.7% → 56.0%, from the denominator only (block).
- P13 66.7% → 63.3%.

**Next 60 (22 Nov–20 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 8/8 | 100% | £1,217.04 |
| P04 | 20/60 | 33.3% | £2,724.49 |
| P05 | 33/60 | 55.0% | £18,686.68 |
| P06 | 5/13 | 38.5% | £1,009.82 |
| P09 | 5/5 | 100% | £513.54 |
| P11 | 23/55 | 41.8% | £5,399.46 |
| P12 | 17/22 | 77.3% | £3,573.49 |
| P13 | 31/60 | 51.7% | £5,609.95 |
| P14 | 0/60 | 0% | £0 |
| P20 | 32/60 | 53.3% | £6,468.68 |

Beyond 60 days, P05 loses 4 n / £1,219.98 on 13–17 Feb. kpi_pack P05 `pace_90` (22 Nov–19 Feb) is 36 n / £19,746.20, net of the cancellation.

**Last 365 nights** (kpi_pack `last365`, 22 Nov 2025–21 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 44.4% | £174.52 | £77.46 | £28,272.49 |
| P02 | 78.9% | £128.98 | £101.77 | £37,147.48 |
| P05 | 61.4% | £374.57 | £229.88 | £83,904.71 |
| P06 | 38.6% | £234.66 | £90.65 | £33,086.79 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 42.7% | £114.54 | £48.95 | £17,867.70 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.8% | £174.78 | £141.26 | £51,561.57 |
| P12 | 80.5% | £193.24 | £155.65 | £56,813.71 |
| P13 | 81.1% | £157.74 | £127.92 | £46,690.69 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.7% | £174.30 | £13.37 | £4,880.33 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`). Changes since yesterday:
- P05: 63 → 62 bookings (the Valentine's cancellation).
- P02: 71 → 70 bookings, median lead 34 → 36 d (Nov-2025 stay left the window).

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 70 | 36 d | 4 n | Airbnb 54.2% / Booking.com 42.6% / Direct 3.2% |
| P04 | 7 | 6 d | 4 n | Airbnb 75.9% / Booking.com 24.1% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4% / Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 79 | 31 d | 4 n | Booking.com 89.6% / Airbnb 10.4% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 10 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 22 Nov 07:20Z (`occ22/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (next 30) | £142 / 3 (yesterday £144) | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | **Day 8.** Policy: never fewer than 3 nights. |

**That is still the only orphan in the next 60. No new orphan was created overnight.**

**Checked and NOT orphans:**
- **P04 23–26 Dec:** tail of the open run 6–26 Dec (21 n) before the 27 Dec arrival (min 7). Min stay unchanged since yesterday at **3 / 2 / 2 / 2**; prices £170 / £190 / £191 / £190.
  - 17–19 Dec, reopened by the overnight cancellation, sit inside the same run at min 3.
  - Run price 6–26 Dec = £3,284 (6 Dec £174, was £140; 21 Dec £150, was £168).
- **P11 30 Nov–4 Dec:** 5-night run at min 2, **£183 / £183 / £205 / £214 / £259 = £1,044** (yesterday £1,050), between the 27–30 Nov stay and the 5 Dec arrival.
- **P20 22–24 Nov:** 3-night run at min 2, now **£283 / £279 / £271 = £833** (yesterday £782, +£51). Sells as 22–24, 22–25 or 23–25; a 24 Nov arrival cannot meet min 2. **22 Nov (tonight) lapses unsold unless booked today.**
- **P06 23 Nov:** single night at **£269, min 1** (yesterday £275), between the 22 Nov block and the 24–29 Nov stay. Bookable. P06 is a policy intentional-block listing.
- **P11 22–26 Nov:** no longer open (new block). The 8 Dec single night stays at £305, min 1.
- **P11 23–25 Dec (next 60):** 3-night run at min 2 (£266 / £242 / £251). Sellable.
- **P05 13–16 Feb (beyond 60):** inside an open run of at least 10 nights (10–19 Feb), min 4. Not an orphan.

**Runs that sell only as one exact stay:** P05 7–8 Dec (£449 / £430) and 13–14 Dec (£471 / £461), min 2.

**Single nights at min 1 (bookable):** P04 2 Dec £443; P05 21 Dec £2,109 and 29 Dec £2,422; P06 23 Nov £269; P11 8 Dec £305; P12 26 Nov £325; P13 27 Nov (£264 / £185) and 1 Dec (£225 / £158); P20 5 Dec £520 and 26 Dec £539.

**Lapsed unsold, 21 Nov:** P14 only.

### Gaps to fill (open nights next 30, 22 Nov–21 Dec, Smoobu 22 Nov 07:20Z): 101 nights
- **P04 (18):** 24 Nov (orphan, £142); 2 Dec (£443, min 1); 6–21 Dec (16 n, £133–174, min 3), incl. 17–19 Dec reopened (£442). The run continues 22–26 Dec.
- **P05 (9):** 29 Nov–2 Dec (£491 / £475 / £469 / £498, min 3); 7–8 Dec; 13–14 Dec; 21 Dec (£2,109, min 1).
- **P06 (8):** 23 Nov (£269, min 1); 29 Nov–5 Dec (£286 / £271 / £304 / £316 / £323 / £358 / £359 = £2,217, min 3; yesterday £2,239).
- **P11 (11):**
  - 30 Nov–4 Dec (£1,044, min 2).
  - 8 Dec (£305, min 1).
  - 14–18 Dec (£218 / £220 / £229 / £251 / £324, min 2). The darts nights 14–17 Dec average £229.50 (yesterday £230.25).
- **P12 (5):** 26 Nov (£325, min 1; yesterday £310); 30 Nov–3 Dec (£260 / £284 / £286 / £297, min 2).
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec (min 3).
  - **Note for the PriceLabs agent:** on 13–21 Dec the twins are now priced identically (both £195 / £194 / £191 / £194 / £202 / £215 / £221 / £205 / £213). Yesterday 3064856 was £7–14 above 3090701 (e.g. 13 Dec £209 vs £198). Policy `listing_facts.P13.twin_listings` says never identical.
- **P14 (30):** every night (special setup, numbers only).
- **P20 (9):** 22–24 Nov (£833, min 2); 5 Dec (£520, min 1); 14–18 Dec (£300 / £302 / £301 / £333 / £321, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **NEW: P11 Camden Smoobu "Blocked channel" 22–26 Nov** (created 22 Nov 00:44). It removes 5 open nights (£965 at Smoobu prices). P11 is not a policy intentional block or handback. Who set it and why: NOT CHECKED.
2. **P04 min stay 2 on 24–26 Dec** (Smoobu `/api/rates` 22 Nov; unchanged from 21 Nov). Policy `listing_facts.P04.min_stay_rule`: never fewer than 3 nights. Carried, day 2.
3. **P20 min stay 2 on 22–24 Nov** (policy: 3 nights 25 Oct–30 Nov). Carried; the Smoobu price rose £51 overnight to £833.
4. **P13 twins identical on 13–21 Dec** (see above). For the PriceLabs agent to source; policy says narrow the gap, never identical.
5. **Scott Ellis Gardens (3588993):** no reservations; 5 blocks (the first now extended to 28 Nov). Not in our property list (t-scott-ellis-2011).
6. **Carried from 19–21 Nov:** P13 1 Dec +25% (policy +50%); P11 darts −2%; P01 18–20 Dec block versus the policy gap block ending 17 Dec; P06 calendar (22 Nov block, block from 6 Dec, 23 Nov min 1).

Data gaps:
- **P04 17–20 Dec booking:** Airbnb price live at 20:20, the discount breakdown (room £338.12 vs £439–442 Smoobu) and the cancellation reason: NOT CHECKED (channel agent).
- **P05 13–17 Feb cancellation:** reason NOT CHECKED (no guest data used).
- **P11 22–26 Nov block:** source and purpose UNKNOWN.
- **Change source of overnight Smoobu price edits** (P20 22–24 Nov +£51; P04 6 Dec +£34, 21 Dec −£18; P13 3064856 13–21 Dec down to match 3090701; P11 6 Dec −£58): NOT CHECKED (PriceLabs refresh vs manual edit).
- **Scott Ellis Gardens:** status (new property, test, owner use) UNKNOWN; reason for its 5 blocks UNKNOWN.
- **Smoobu pagination:** the full reservations pull duplicated one record and dropped another (P12 1–5 Jun 2026), recovered by a narrow-window pull. Totals now match the snapshot CSV (720). Yesterday's pull probably dropped the P14 13–15 Apr block the same way (blocks only, no effect on occupancy figures).
- **STLY:** none before 22 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null.
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 22 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **No price data past 21 Jan** except P05 10–19 Feb (separate Smoobu GET).
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.
- PriceLabs connector: not queried by this agent today. Smoobu is the source for all forward figures.

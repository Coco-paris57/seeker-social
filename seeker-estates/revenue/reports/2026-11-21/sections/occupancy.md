## Occupancy & performance

**Portfolio, last 30 nights (22 Oct–20 Nov 2026), the 14 units with Smoobu history:** 238 n, £40,615.33, occupancy 56.7%, ADR £170.65, RevPAR £96.70 (`reports/2026-11-21/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (21 Oct–19 Nov) it was 239 n / £40,514.05.
  - 21 Oct leaves: −9 booked (P01, P02, P05, P08, P09, P10, P11, P13, P20; £1,529.23).
  - 20 Nov enters: +8 (P01, P04, P05, P06, P09, P11, P13, P20; £1,630.53).
  - 239 − 9 + 8 = 238. £40,514.05 − £1,529.23 + £1,630.53 = £40,615.35 (2p rounding against the pack). Per-night figures are pro rata, from `data/snapshots/2026-11-21/reservations.csv`.

**Last 365 nights (21 Nov 2025–20 Nov 2026):** 2,238 n, £412,490.86, occupancy 47.2%, ADR £184.31, RevPAR £86.93 (kpi_pack `portfolio_last365`). Yesterday it was 2,232 n / £411,073.23. Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (21 Nov–20 Dec): 129 of 232 non-blocked nights = 55.6%, £30,019.29 room revenue on the books.** Yesterday it was 135/236 = 57.2%, £30,744.63.
**Booked next 60 (21 Nov–19 Jan): 183/412 = 44.4%, £47,036.15.** Yesterday it was 192/416 = 46.2%, £48,733.24.
- **Source:** live Smoobu GET `/api/reservations` (851 unique records including cancellations and blocks; guest and reference fields dropped) and GET `/api/rates`, pulled 21 Nov 07:18:00Z. Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ21/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ21/smoobu_rates.json`.
  - The pull returned one record twice across pages (852 rows, 851 ids); deduplicated. The 720 non-block records then match `data/snapshots/2026-11-21/reservations.csv` row for row (ref, dates, status, amount).
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens (Smoobu 3588993) is not a mapped property and is not counted (see below).
- **Excluded:** P02, P03, P07 (blocked on purpose, policy); handbacks P08 and P10 fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec; blocks P01 30 Nov–20 Dec, P06 22 Nov and from 6 Dec.
- **Reconciling next 30 (135/236 → 129/232):**
  - 20 Nov leaves: −8 booked (P01, P04, P05, P06, P09, P11, P13, P20; £1,630.53), −10 inventory (also P12 and P14, open).
  - P11 overnight: +1 (27 Nov) and −2 (30 Nov, 1 Dec) = −1 booked, inventory unchanged; revenue +£538.73 − £605.29 = −£66.56.
  - 20 Dec enters: +3 booked (P05, P11, P20; £971.75), +6 inventory (also P04, P13, P14).
  - 135 − 8 − 1 + 3 = **129**; 236 − 10 + 6 = **232**. £30,744.63 − £1,630.53 − £66.56 + £971.75 = **£30,019.29**.
- **Reconciling next 60 (192/416 → 183/412):** 20 Nov leaves −8 / −10 / −£1,630.53; P11 −1 / −£66.56; 19 Jan enters 0 booked / +6 open (P04, P05, P11, P13, P14, P20). 192 − 8 − 1 = **183**; 416 − 10 + 6 = **412**; £48,733.24 − £1,630.53 − £66.56 = **£47,036.15**.
- PriceLabs `forward_occ_30` in kpi_pack (P11 44.8%, P04 41.4%, P13 65.5%, P20 69.0%, P12 77.3%) differs by window and denominator; Smoobu is the truth.

### What changed overnight (20 Nov 07:18Z → 21 Nov 07:18Z)
- **846 → 851 records; 719 → 720 reservations.** Net of the two departures from the 365-day window (P12 17–20 Nov 2025 stay; a P14 April block).
- **New reservation: P11 Camden Booking.com 27–30 Nov (3 n)**, room (basePrice) **£538.73 = £179.58/n**, commission £123.79, created 20 Nov 23:06, lead time 7 days, 3 adults.
  - Commission is 18.0% of the £687.73 Smoobu total; the Camden Visibility Booster is 18% for check-ins to 18 Dec (policy), so expected.
  - Paid-vs-Standard (ceil(Smoobu × 1.15)) and the derived-plan / promotion decomposition: channel agent. For scale only: Smoobu's current prices on those nights are £251 / £257 / £190 = £698 (0.772×); the price live at 23:06 is NOT CHECKED.
- **Cancelled: P11 Camden Booking.com 28 Nov–2 Dec (4 n), £605.29 = £151.32/n**, made 13 Nov 23:20, cancelled 20 Nov 22:08:32 — 58 minutes before the new stay was made. Same party rebooking: NOT CHECKED (no guest data used).
- **Net on P11, 27 Nov–2 Dec: −1 n / −£66.56.** Booked nights move from 28 Nov–1 Dec to 27–29 Nov; the per-night rate rises from £151.32 to £179.58 (+18.7%).
  - **30 Nov–1 Dec reopened** and join the already-open 2–4 Dec: a **5-night open run 30 Nov–4 Dec at £182 / £184 / £209 / £215 / £260 = £1,050, min 2 every night** (Smoobu `/api/rates`). Not an orphan.
  - P11 Smoobu min stay is now 2 on all checked nights (22 Nov–18 Dec); yesterday 22 Nov–2 Dec were min 3. Change source NOT CHECKED.
- **New then cancelled: P20 Waterford Court Airbnb 5 Dec (1 n)**, room £343.33, cleaning £150, commission £76.47; created 20 Nov 10:54, cancelled 20:19:05. Lead time 15 days.
  - It sold the Reyhan +100% / min 1 night that Smoobu priced at £528 (20 Nov 07:18Z): room paid = 0.650× that price. Breakdown: channel agent.
  - **Net occupancy and revenue effect: 0.** 5 Dec is open again at **£512, min 1**.
- **Scott Ellis Gardens (Smoobu 3588993): 5 new "Blocked channel" blocks**, created 20 Nov 18:21–18:36 (see below). No reservations.
- **No other bookings, cancellations or modifications.** The P06 long block still starts 6 Dec.

### Scott Ellis Gardens (PriceLabs 3588993)
- **Smoobu shows it as an apartment:** GET `/api/apartments` (21 Nov) lists 16 apartments; `data/id_map.json` recorded 14 on 18 Oct. 3588993 "Scott Ellis Gardens": holiday rental, 3 bedrooms, 2 bathrooms, 3 double beds, max occupancy 6, location Scott Ellis Gardens NW8 9RS, London.
- **Reservations: none.** Its only records are 5 "Blocked channel" blocks (£0): 20–28 Nov, 3–4 Dec, 8–9 Dec, 15–16 Dec, 5–6 Jan, all created 20 Nov 18:21–18:36.
- It is not in `build/properties.py`, `data/id_map.json` or `policy.json`. It does not match P17 (NW8 7BB, 1-bed) or P05 (NW8 9QE, 4–5 bed). New property or something else: NOT CHECKED, for Corentin. Not mapped; not counted in any figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 15–21 Nov to 07:18Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ21/pick_rise.py`.
- **Gross made:** 9 bookings / 36 n / £7,260.95. **Still confirmed:** 8 / 35 n / £6,917.62.
- **Cancelled in the window:** 4 / 23 n / £4,213.06 — P04 20 Dec–2 Jan £2,417.34 (16 Nov), P13 18–23 Dec £847.10 (15 Nov), P11 28 Nov–2 Dec £605.29 (20 Nov), P20 5 Dec £343.33 (20 Nov).
- **Net: +13 n / +£3,047.89.** Yesterday it was +35 n / +£6,747.17.
- **Reconciliation:**
  - 14 Nov leaves the made side: P04 20–24 Nov (4 n, £489.59), P11 9–14 Dec (5 n, £863.61), P12 7–14 Dec (7 n, £1,432.42), P13 18–23 Dec (5 n, £847.10, later cancelled). −21 n / −£3,632.72. Nothing leaves the cancelled side.
  - Made after 20 Nov 07:18Z: P11 +3 / +£538.73, P20 +1 / +£343.33. Cancelled after it: P11 −4 / −£605.29, P20 −1 / −£343.33. Net −1 n / −£66.56.
  - 35 − 21 − 1 = 13. £6,747.17 − £3,632.72 − £66.56 = £3,047.89.
  - Same 14–20 Nov window recounted on today's pull: +34 n / +£6,680.61 (yesterday's +35 / £6,747.17, less the P11 −1 / −£66.56).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 2 / 10 / £1,330.89 (18–20 Nov, 27 Dec–4 Jan) | 13 / £2,417.34 | **−3 / −£1,086.45** |
| P05 | 1 / 4 / £1,219.98 | — | +4 / +£1,219.98 |
| P11 | 1 / 3 / £538.73 (27–30 Nov) | 4 / £605.29 | **−1 / −£66.56** |
| P13 | 2 / 8 / £1,309.69 | 5 / £847.10 | +3 / +£462.59 |
| P20 | 3 / 11 / £2,861.66 (19–22 Nov £714.55; 5 Dec £343.33, cancelled; 27 Dec–3 Jan £1,803.78) | 1 / £343.33 | +10 / +£2,518.33 |
| P01, P02, P06, P07, P08, P09, P10, P12, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only) matches: P04 2 / 10 / £1,330.89, P05 1 / 4 / £1,219.98, P11 1 / 3 / £538.73, P13 2 / 8 / £1,309.69, P20 2 / 10 / £2,518.33.

### Pace vs STLY
Cancellations are excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-21/reservations.csv`).
- **P12, handback-aware.** Stays 21 Nov–13 Dec 2026 as of 21 Nov 2026, against 21 Nov–13 Dec 2025 as of 21 Nov 2025: **18 n / £3,775.96 vs 20 n / £3,818.80 = −2 n / −£42.84 / −1.1%. Within ±10%, so On track.** Unchanged from yesterday: 20 Nov 2026 (open, lapsed) and 20 Nov 2025 (unbooked) both left the window.
  - kpi_pack `pace_30` (21 Nov–20 Dec, not handback-aware): −5 n / −11.0% (£3,775.96 vs 23 n / £4,244.13).
  - kpi_pack `pace_90`: −36 n / −61.5% (vs 54 n / £9,809.06). Nothing after 13 Dec is inventory.
- **P02:** kpi_pack 30-day 0 vs STLY 12 n / £1,281.04; 90-day 0 vs 19 n / £1,944.26. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 21 Nov 2025 exists for any unit except P02 and P12.

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 21 Nov 07:18Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +33 n / +£9,129.75 including P06; +24 n / +£7,263.14 like-for-like.** Yesterday +34 / +£9,196.31 and +25 / +£7,329.70. The whole move is P11: −1 n / −£66.56.
- Like-for-like excludes the P06 stays on reopened nights: 18–22 Nov £856.79 and 24–29 Nov £1,009.82.
- Made: 29 / 111 n / £24,370.36. Cancelled: 14 / 78 n / £15,240.61.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | — | +16 / +£6,135.19 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| **P11** | **9 / 32 / £5,839.13** (was 8 / 29 / £5,300.40) | **6 / 38 / £7,472.46** (was 5 / 34 / £6,867.17) | **−6 / −£1,633.33** (was −5 / −£1,566.77) |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- **Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37**, unchanged (the P20 5 Dec booking was made and cancelled inside the day, net 0).
- P13: +27 n / +£4,704.65, unchanged.
- P04: +47 n / +£5,933.67 using `total_gbp`, unchanged (+£3,446.27 if import-batch records without a basePrice count as £0).
- **Caveats as before:** the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit. The P11 rebooking looks like one party moving dates (NOT CHECKED), not new demand.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 22 Oct–20 Nov.
- Fwd occ30: Smoobu 21 Nov 07:18Z, 21 Nov–20 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 15–21 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £155.19 | £155.19 | 100% 9/9 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 20.0% | £100.58 | £20.12 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £120.34† | £88.25† | **43.3%** 13/30 (23%) | UNKNOWN: no STLY | **−3 / −£1,086.45** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £387.59 | £297.15 | 73.3% 22/30 (49%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 76.7% | £199.00 | £152.57 | **42.9%** 6/14 non-blocked (52%) | UNKNOWN: no STLY | 0 | **Soft** (fwd30 < 60%; intentional-block listing) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 63.3% | £137.12 | £86.85 | handed back after 13 Nov (57%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £109.11 | £54.55 | 100% 6/6 to 26 Nov (41%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 93.3% | £105.96 | £98.90 | handed back after 18 Nov (33%) | — | 0 | Not classified: handed back |
| P11 | Camden | 70.0% | £181.82 | £127.27 | **46.7%** 14/30 (51%) | UNKNOWN: no STLY | **−1 / −£66.56** | **Soft** (fwd30 < 60%; was 50.0%) |
| **P12** | Mile End | 63.3% | £154.50 | £97.85 | 78.3% 18/23 to handback (45%) | **−2 n / −£42.84 / −1.1%** handback-aware (pack −11.0%) | 0 | **On track** |
| P13 | Shepherd's Bush (one flat) | 56.7% | £145.10 | £82.22 | 66.7% 20/30 (47%) | UNKNOWN: no STLY | +3 / +£462.59 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (47%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £185.85* | £92.92* | 70.0% 21/30 (38%) | UNKNOWN: no STLY | +10 / +£2,518.33 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.
\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`); 22 Oct is still in the window, so ADR30 and RevPAR30 read low.

**Classes:** Compressed 2 (P01, P09); On track 1 (P12); Soft 4 (P04, P06, P11, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 5 (P02, P03, P07 policy blocks; P08, P10 handed back). **No class changes since yesterday.**
- P11 50.0% → 46.7% (the rebooking −1 n). P04 46.7% → 43.3% (20 Nov booked left, 20 Dec open entered). P06 46.7% → 42.9% (20 Nov booked left).

**Next 60 (21 Nov–19 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 9/9 | 100% | £1,369.17 |
| P04 | 21/60 | 35.0% | £2,846.88 |
| P05 | 34/60 | 56.7% | £19,145.46 |
| P06 | 6/14 | 42.9% | £1,224.02 |
| P09 | 6/6 | 100% | £616.25 |
| P11 | 24/60 | 40.0% | £5,614.52 |
| P12 | 18/23 | 78.3% | £3,775.96 |
| P13 | 32/60 | 53.3% | £5,737.04 |
| P14 | 0/60 | 0% | £0 |
| P20 | 33/60 | 55.0% | £6,706.86 |

**Last 365 nights** (kpi_pack `last365`, 21 Nov 2025–20 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 44.1% | £174.66 | £77.04 | £28,120.36 |
| P02 | 78.9% | £128.98 | £101.77 | £37,147.48 |
| P05 | 61.1% | £374.20 | £228.62 | £83,445.94 |
| P06 | 38.4% | £234.80 | £90.06 | £32,872.59 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 42.5% | £114.61 | £48.67 | £17,764.99 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.5% | £174.65 | £140.68 | £51,346.51 |
| P12 | 80.5% | £193.15 | £155.58 | £56,785.96 |
| P13 | 80.8% | £157.84 | £127.57 | £46,563.60 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.4% | £171.93 | £12.72 | £4,642.15 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`). Unchanged from yesterday except P12 (80 → 79 bookings as a Nov-2025 stay left the window; Booking.com 89.6% / Airbnb 10.4%).

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8% / Booking.com 43.0% / Direct 3.2% |
| P04 | 7 | 6 d | 4 n | Airbnb 75.9% / Booking.com 24.1% |
| P05 | 63 | 44 d | 4 n | Airbnb 100% |
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
- **Source:** Smoobu `/api/rates`, 21 Nov 07:18Z (`occ21/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (next 30) | £144 / 3 (yesterday £145) | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | **Day 7.** Policy: never fewer than 3 nights. |

**That is the only orphan in the next 60.**

**Checked and NOT orphans:**
- **P11 30 Nov–4 Dec:** reopened by the cancellation; a 5-night run at min 2 (£182 / £184 / £209 / £215 / £260 = £1,050) between the 27–30 Nov stay and the 5 Dec arrival. Sellable as any 2–5-night stay inside it.
- **P06 23 Nov: no longer an orphan.** Smoobu now has it at **£275, min 1** (yesterday £255, min 2), between the 22 Nov block and the 24–29 Nov stay. Sellable as a single night. Change source NOT CHECKED; P06 is a policy intentional-block listing.
- **P20 22–24 Nov:** 3-night run at min 2, now **£266 / £266 / £250 = £782** (yesterday £290 / £283 / £276 = £849). Sells as 22–24, 22–25 or 23–25; a 24 Nov arrival cannot meet min 2. PriceLabs has 288 / 282 / 273 on these nights (Dispatcher pull note, 3 mismatches): Smoobu is £61 lower; change source NOT CHECKED.
- **P04 23–26 Dec:** tail of the open run 6–26 Dec (21 n) before the 27 Dec arrival (min 7).
  - **Min stay changed: 23–26 Dec are now min 3 / 2 / 2 / 2** (yesterday 4 / 4 / 4 / 4).
  - 24 and 25 Dec arrivals can now sell 2-night stays; 26 Dec can only sell as part of a stay arriving on or before 25 Dec.
  - 20–26 Dec is £1,225 (149 / 168 / 166 / 170 / 190 / 192 / 190; yesterday £1,216).
- **P20 5 Dec:** open again after the same-day cancellation, £512, min 1 (single night, bookable).

**Runs that sell only as one exact stay:** P05 7–8 Dec (£467 / £450) and 13–14 Dec (£497 / £482), min 2.

**Single nights at min 1 (bookable):** P04 2 Dec £449; P05 21 Dec £2,010 and 29 Dec £2,398; P06 23 Nov £275; P11 8 Dec £309; P12 26 Nov £310; P13 27 Nov (£266 / £186) and 1 Dec (£226 / £158); P20 5 Dec £512 and 26 Dec £543.

**Lapsed unsold, 20 Nov:** P12 (yesterday's orphan) and P14.

### Gaps to fill (open nights next 30, 21 Nov–20 Dec, Smoobu 21 Nov 07:18Z): 103 nights
- **P04 (17):** 24 Nov (orphan, £144); 2 Dec (£449, min 1); 6–20 Dec (£133–151, min 3). The run continues 21–26 Dec.
- **P05 (8):** 29 Nov–2 Dec (£493 / £477 / £472 / £495, min 3); 7–8 Dec; 13–14 Dec.
- **P06 (8):** 23 Nov (£275, min 1); 29 Nov–5 Dec (£283 / £272 / £309 / £322 / £330 / £362 / £361 = £2,239, min 3; yesterday £2,624).
- **P11 (16):**
  - 22–26 Nov (£187 / £184 / £200 / £197 / £218, min 2).
  - **30 Nov–4 Dec (£1,050, min 2), reopened by the cancellation.**
  - 8 Dec (£309, min 1).
  - 14–18 Dec (£219 / £221 / £229 / £252 / £313, min 2). The darts nights 14–17 Dec average £230.25 (yesterday £230.00).
- **P12 (5):** 26 Nov (£310, min 1); 30 Nov–3 Dec (£268 / £283 / £286 / £296, min 2).
- **P13 (10):** 27 Nov and 1 Dec (min 1); 13–20 Dec (min 3).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (9):** 22–24 Nov (£782, min 2); 5 Dec (£512, min 1); 14–18 Dec (£303 / £305 / £304 / £307 / £322, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P04 min stay 2 on 24–26 Dec** (Smoobu `/api/rates` 21 Nov 07:18Z; was 4 yesterday). Policy `listing_facts.P04.min_stay_rule`: never open for less than 3 nights. Who changed it and when: NOT CHECKED.
2. **P20 min stay 2 on 22–24 Nov** (policy: 3 nights 25 Oct–30 Nov). Carried; Smoobu price on those nights also dropped £67 overnight to £782.
3. **P06 calendar** (intentional-block listing): carried from yesterday (block moved to 6 Dec; 22 Nov block). 23 Nov is now min 1 at £275.
4. **Scott Ellis Gardens (3588993)** exists in Smoobu with 5 blocks and no reservations; not in our property list. What is it? For Corentin.
5. **Carried from 19–20 Nov:** P13 1 Dec +25% (policy +50%); P11 darts −2%; P01 18–20 Dec block versus the policy gap block ending 17 Dec; P20 delivery with the 19–22 Nov guest in.

Data gaps:
- **P11 27–30 Nov price at booking (23:06) and the Booking.com rate plan used:** NOT CHECKED here (channel agent). Whether the cancellation and rebooking are the same party: NOT CHECKED (no guest data used).
- **P20 5 Dec booking:** Airbnb's discount breakdown (room £343.33 vs £528 Smoobu) and cancellation reason: NOT CHECKED.
- **Change source of overnight Smoobu min-stay/price edits** (P04 23–26 Dec min 4 → 3/2/2/2; P11 min 3 → 2; P06 23 Nov min 2 → 1; P20 22–24 Nov −£67): NOT CHECKED (PriceLabs refresh vs manual edit).
- **Scott Ellis Gardens:** status (new property, test, owner use) UNKNOWN; reason for its 5 blocks UNKNOWN.
- **Smoobu pagination:** the reservations pull returned one record twice (deduplicated); totals reconcile with yesterday (846 + 7 new − 2 out of window = 851), so no record is believed missing.
- **STLY:** none before 21 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null.
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 21 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **No price data past 20 Jan:** Smoobu rates pulled 21 Nov–20 Jan.
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.

## Occupancy & performance

**Portfolio, last 30 nights (18 Oct–16 Nov 2026), the 13 units with Smoobu history:** 230 n, £39,766.52, occupancy 59.0%, ADR £172.90, RevPAR £101.97 (`reports/2026-11-17/kpi_pack.json` `portfolio_last30`). Revenue is room only (Smoobu basePrice, cleaning excluded). Yesterday (17 Oct–15 Nov) it was 234 n / 60.0% / £173.85 / £104.31.

**Last 365 nights (17 Nov 2025–16 Nov 2026):** 2,221 n, £408,621.00, occupancy 46.8%, ADR £183.98, RevPAR £86.12 (kpi_pack `portfolio_last365`). Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (17 Nov–16 Dec): 144 of 243 non-blocked nights = 59.3%.** Yesterday it was 150/248 = 60.5%.
**Booked next 60 (17 Nov–15 Jan): 198/423 = 46.8%.** Yesterday it was 213/428 = 49.8%. The drop is mostly the P04 cancellation (−13 n).
- **Source:** live Smoobu GET `/api/reservations` (911 records, including cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 17 Nov 07:18:33Z. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ17/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ17/smoobu_rates.json`.
- **Check:** the two endpoints agree on every unit-night in the next 60 (0 mismatches). P13 is read as one calendar.
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, per policy).
  - Every night after a handback: P08 is fully out; P10 after 18 Nov; P09 after 26 Nov; P12 after 13 Dec; P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from 30 Nov; P20 18–19 Nov.
- **Reconciling next 30 (150 → 144):**
  - New: 0 inside the window (P13 22–27 Dec is outside it).
  - Cancelled: 0 inside the window (P04 20 Dec–2 Jan is outside it).
  - Window roll: 16 Nov drops out −7 (booked on P01, P04, P09, P10, P11, P12, P13); 16 Dec comes in +1 (P05 booked).
  - Net: 150 − 7 + 1 = 144. Denominator: 248 − 11 + 6 = 243.
- **Reconciling next 60 (213 → 198):** 213 + 5 (P13 22–27 Dec) − 13 (P04 cancellation) − 7 (16 Nov) + 0 (15 Jan) = 198. Denominator: 428 − 11 + 6 = 423.
- **kpi_pack `forward_occ_60` is stale on P04 and P13.** PriceLabs still holds the cancelled P04 stay and does not hold the new P13 stay (see below). kpi_pack has P04 fwd60 45.8%; Smoobu has 25.0%. The Smoobu figures are used here.

### Smoobu full-record diff (17 Nov 07:18Z vs 16 Nov 07:17Z): blocks, bookings, min stays
`occ17/diff.py`, `occ17/ratediff.py`, `occ17/roll.py`.
- **Blocks: none created, removed or changed.** P06 143402691 still starts 30 Nov. P01 160657036 still runs 30 Nov to a 21 Dec departure. P20 162432556 still covers only 18–19 Nov. P12 155644001 still starts 14 Dec.
- **CANCELLED 160754186: P04 Booking.com 20 Dec–2 Jan (13 n).** `type` changed to cancellation, `modifiedAt` 16 Nov 15:37:54. Smoobu `price` is £2,417.34 (£185.95/n). The record has no basePrice element, so the room figure is from `reservations.csv` (`total_gbp` 2,417.34, now `cancelled`). It was booked 20 Oct 12:44, part of the P04 import batch.
  - **Smoobu reopened 20 Dec–1 Jan** (`available` 0 → 1 on all 13 nights).
  - Smoobu prices / min stay: 20 Dec £189/3, 21 Dec £193/3, 22 Dec £187/3, 23 Dec £200/4, 24 Dec £204/4, 25 Dec £198/4, 26 Dec £195/4, 27 Dec £208/7, 28 Dec £228/5, 29 Dec £229/5, 30 Dec £230/5, 31 Dec £241/5, 1 Jan £231/4. Those 13 nights total £2,733.
  - Who cancelled and why: NOT CHECKED (the Smoobu record does not say).
- **NEW 162947708: P13 Booking.com 22–27 Dec (5 n), room £840.75 (£168.15/n), created 16 Nov 22:52.** It is on **3064856** ("Top-Floor 2Bed…"). Smoobu `price` is £990.75, which is room plus the £150 cleaning fee (policy).
  - Smoobu has closed 22–26 Dec on both twins.
  - The stay runs straight into the existing 27 Dec–2 Jan stay (161543656).
  - **Commission £148.61 (`reservations.csv`) is 15.0% of room plus cleaning** (£990.75 × 0.15 = £148.61). It is 17.7% of room only. So the 22 Dec check-in, which is outside the booster (to 20 Dec), shows standard commission, not a booster rate.
  - Paid vs Smoobu 3064856 (216 + 225 + 219 + 220 + 222 = £1,102, unchanged since 16 Nov 07:17Z): **0.763×**. Against the ×1.10 Booking.com markup (£1,212.20) it is **0.694×**. The promotion breakdown is NOT CHECKED (no Booking.com reservation screenshot). Black Friday is not yet bookable (from 19 Nov), so it is not part of this.
- **Modified, no field change except `modifiedAt`:** P13 160472696 (28 Nov–1 Dec), P12 161761946 (21–26 Nov), P12 162251811 (27–30 Nov). Price elements are unchanged.
- **Min-stay changes in Smoobu `/api/rates` (next 60):** only on the new edge day 15 Jan: P06 5 → 4 (blocked night), P14 5 → 4, P12 4 → 3 (after the handback). There are no `get_user_logs` listing entries for 16–17 Nov (0 records), so no PriceLabs edits were made since yesterday's pull.
- **Unchanged:** P04 18–19 Nov is still min 2 (£167 / £170), and P04 24 Nov is still £143, min 3. P20 26 Dec is still min 4 (now £271, was £300). P20 5 Dec is still min 3 (£277).

### Are the overnight changes in PriceLabs?
Sources: raw `prices_*.json` in `data/snapshots/2026-11-17/raw/`, plus live `get_listing_prices` on 17 Nov for 3562176 and 3064856.

| Change | Registered? | Evidence |
|---|---|---|
| **P04 20 Dec–2 Jan cancellation** | **NO** | Live 3562176, `last_refreshed_at` 16 Nov 09:43:29Z, before the 15:37:54 cancellation. 20 Dec still "Booked (Check-In)" and 21 Dec–1 Jan "Booked", ADR 185.92, `booked_date` 20 Oct, `user_price` −1. PriceLabs still treats the nights as sold. Smoobu has them open at the PriceLabs `price` values. |
| **P13 22–27 Dec new stay** | **NO** | Live 3064856, refreshed 16 Nov 09:42:53Z, before the 22:52 booking. 22–26 Dec `booking_status` "" and `unbookable` 0. Raw 3090701 shows the same. |
| P20 27 Dec–3 Jan (t-pl-sync-1611) | **Yes, fixed** | Raw 3547481, refreshed 16 Nov 09:43:29Z: 27 Dec "Booked (Check-In)", `booked_date` 15 Nov, ADR 257.68; 2 Jan "Booked". |

### 7-day pickup, net of cancellations (made 11–17 Nov, to 07:18Z; Smoobu `created-at`, `modifiedAt` for cancellations; `occ17/pick.py`)
- **Gross made:** 10 bookings / 49 n / £9,581.28.
- **Still confirmed:** 9 / 44 n / £8,734.18.
- **Cancelled in the window:** 5 bookings / 32 n / £5,596.24. This uses £2,417.34 for P04 from `reservations.csv`, because Smoobu has no basePrice element on it.
- **Net: +17 n / +£3,985.04.** Yesterday (10–16 Nov) it was +29 n / +£5,853.59.
- **Reconciliation:**
  - 10 Nov drops out: made P11 8–15 Dec (7 n / £1,012.86) and the P01 18–21 Dec cancellation (3 n / £720.90). Effect −4 n / −£291.96.
  - Overnight: +5 n / +£840.75 (P13) − 13 n / −£2,417.34 (P04) = **−8 n / −£1,576.59**.
  - 29 − 4 − 8 = 17; £5,853.59 − £291.96 − £1,576.59 = £3,985.04.
- kpi_pack `pickup_7d` counts confirmed bookings only (no cancellations). The P04 20 Oct import batch is not in this window.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| **P04** | 1 / 4 / £489.59 (20–24 Nov) | **20 Dec–2 Jan 13 / £2,417.34 (NEW)** | **−9 / −£1,927.75** (was +4 / +£489.59) |
| P05 | 1 / 4 / £1,219.98 (13–17 Feb) | — | +4 / +£1,219.98 |
| P06 | 1 / 5 / £1,009.82 (24–29 Nov) | — | +5 / +£1,009.82 |
| P11 | 2 / 9 / £1,468.90 | 26–29 Nov 3 / £680.40; 8–15 Dec 7 / £1,012.86 | −1 / −£224.36 (was +6 / +£788.50; the 8–15 Dec booking, made 10 Nov, dropped out) |
| P12 | 1 / 7 / £1,432.42 (7–14 Dec) | — | +7 / +£1,432.42 |
| **P13** | **3 / 13 / £2,156.79** (10–13 Dec £468.94; 18–23 Dec £847.10; **22–27 Dec £840.75, NEW**) | 18–23 Dec 5 / £847.10 | **+8 / +£1,309.69** (was +3 / +£468.94) |
| P20 | 1 / 7 / £1,803.78 (27 Dec–3 Jan) | 21–25 Nov 4 / £638.54 | +3 / +£1,165.24 |
| P01 | 0 | — (the 10 Nov cancellation dropped out) | 0 (was −3 / −£720.90) |
| P02, P07, P08, P09, P10, P14 | 0 | — | 0 |

### Pace vs STLY (cancellations excluded on both sides; `rm.metrics.on_the_books` on `data/snapshots/2026-11-17/reservations.csv`)
- **P12, handback-aware (stays 17 Nov–13 Dec vs 17 Nov–13 Dec 2025 as of 17 Nov 2025): 18 n / £3,775.96 vs 23 n / £4,229.59 = −5 n / −£453.63 / −10.7%. Now Soft** (behind STLY by more than 10%). Yesterday it was −9.3% (On track). No P12 booking changed overnight. The move comes from the window roll: 16 Nov 2026 (booked) left the window, and the STLY side lost 16 Nov 2025 too.
  - kpi_pack `pace_30` (17 Nov–16 Dec) reads −8 n / −18.9% (£3,775.96 vs £4,654.92). The difference is STLY 14–16 Dec 2025 (3 n / £425.33), which falls after the handback.
  - kpi_pack `pace_90` reads −24 n / −53.6% (vs 42 n / £8,145.80). Nothing after 13 Dec is inventory, so handback-aware pace90 = pace to handback.
- **P02:** kpi_pack 30-day 0 vs STLY 11 n / £1,119.49; 90-day 0 vs 20 n / £2,016.52. Blocked on purpose, so not assessed.
- **Every other unit: pace UNKNOWN.** No Smoobu bookings were made on or before 17 Nov 2025. The earliest `booked_on` dates are P11 9 Dec 2025, P13 11 Dec 2025, P05 16 Feb 2026, P06 28 Apr 2026, P01/P09/P10 May 2026, P20 10 Oct 2026 and P04 20 Oct 2026. STLY is therefore 0, not a real comparison.
- **On the books, stays 17 Nov–16 Dec** (kpi_pack `pace_30`):

| Ref | Nights | Revenue |
|---|---|---|
| P01 | 13 | £1,977.69 |
| P05 | 21 | £10,830.35 |
| P06 | 9 | £1,866.61 |
| P09 | 10 | £1,027.08 |
| P10 | 2 | £211.93 |
| P11 | 15 | £2,784.37 |
| P13 | 23 | £3,511.54 |
| P20 | 18 | £3,236.90 |
| P04 | 15 | £2,001.96 (recomputed with the same function; the pack is empty) |

- **On the books, 90-day window** (kpi_pack `pace_90`):

| Ref | Nights | Revenue |
|---|---|---|
| P05 | 42 | £22,191.29 |
| P11 | 27 | £6,125.42 |
| P13 | 35 | £6,118.29 |
| P20 | 32 | £6,468.68 |
| P04 | 15 | £2,001.96 (recomputed; was 28 n before the cancellation) |

### 18 Oct base rises: running effect (same method as yesterday)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 17 Nov 07:18Z pull (`occ17/rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,196.31 including P06. Unchanged since yesterday.**
- **Like-for-like** (excluding both P06 stays on reopened nights, £856.79 and £1,009.82): **+25 n / +£7,329.70, also unchanged.**
- No raised unit had a booking or a cancellation overnight.
- Made: 28 / 108 n / £23,831.63. Cancelled: 13 / 74 n / £14,635.32.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | — | +16 / +£6,135.19 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +51 n / +£9,443.82 (unchanged).
- **P13: +27 n / +£4,704.65** (was +22 / +£3,863.90; the new stay adds +5 / +£840.75).
- **P04: +37 n / +£2,115.38** (was +50 / +£2,115.38).
  - **Method flaw found:** the P04 import batch (6 records, all created 20 Oct 12:44, including 160754186) has no Smoobu basePrice element. The script reads its revenue as £0 but still counts its nights.
  - With `reservations.csv` `total_gbp` instead, P04 was +50 / +£4,532.72 yesterday and is +37 / +£2,115.38 today (−13 n / −£2,417.34 overnight).
  - That batch is an import, not post-rise pickup. So the P04 comparison group is not clean either way.

**What this means:** nothing changed in the raised group overnight. Both comparison moves are Christmas stays: P13 gained one, P04 lost one. Caveats as before: the 24 Oct and 12 Nov Booking.com markup changes, promotions, Reyhan's overrides and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 18 Oct–16 Nov.
- Fwd occ30: Smoobu 17 Nov 07:18Z, 17 Nov–16 Dec, handback-aware (kpi_pack `market_occ_30` in brackets).
- Pace30: as above.
- Pickup 7d: made 11–17 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £156.54 | £156.54 | 100% of 13 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 33.3% | £97.60 | £32.53 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack last30 null | UNKNOWN | UNKNOWN | **50.0%** 15/30 (24%) | UNKNOWN: no STLY | **−9 / −£1,927.75** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 80.0% | £376.98 | £301.58 | 70.0% 21/30 (46%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £196.73 | £131.15 | 69.2% of 13 non-blocked (51%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 76.7% | £140.55 | £107.75 | handed back after 13 Nov (55%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £115.32 | £57.66 | 100% 10/10 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 100.0% | £105.96 | £105.96 | 100% 2/2 to 18 Nov (32%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P11 | Camden | 70.0% | £177.07 | £123.95 | **50.0%** 15/30 (50%) | UNKNOWN: no STLY | −1 / −£224.36 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 73.3% | £161.52 | £118.45 | 66.7% 18/27 to handback (43%) | **−5 n / −£453.63 / −10.7%** (pack −18.9%) | +7 / +£1,432.42 | **Soft** (was On track; behind STLY > 10%) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £153.86 | £92.31 | 76.7% 23/30 (47%) | UNKNOWN: no STLY | +8 / +£1,309.69 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (48%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 56.7% | £172.32* | £97.65* | 64.3% of 28 non-blocked (39%) | UNKNOWN: no STLY | +3 / +£1,165.24 | Unclassifiable (60–85%, no STLY) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`); 18–22 Oct is inside this window, so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 0.
- Soft 4: P04, P11, P12, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Not classified 4: P02, P03, P07 (policy blocks); P08 (handed back).
- **Changed since yesterday: P12, On track → Soft.**

**Next 60 (17 Nov–15 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share |
|---|---|---|
| P01 | 13/13 | 100% |
| **P04** | **15/60** | **25.0%** (was 29/60 = 48.3%) |
| P05 | 37/60 | 61.7% |
| P06 | 9/13 | 69.2% |
| P09 | 10/10 | 100% |
| P10 | 2/2 | 100% |
| P11 | 27/60 | 45.0% |
| P12 | 18/27 | 66.7% |
| P13 | 35/60 | 58.3% (was 31/60) |
| P14 | 0/60 | 0% |
| P20 | 32/58 | 55.2% |

Comparisons:
- kpi_pack `forward_occ_60` (PriceLabs): P04 45.8% (stale, still counts the cancelled 13 n), P05 62.7%, P11 44.1%, P13 59.3%, P20 54.2%.
- kpi_pack `market_occ_60`: P04 19%, P05 39%, P11 38%, P13 37%, P20 30%.

**Last 365 nights** (kpi_pack `last365`, 17 Nov 2025–16 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 43.0% | £175.23 | £75.37 | £27,511.84 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 60.3% | £373.04 | £224.85 | £82,069.61 |
| P06 | 37.5% | £235.26 | £88.30 | £32,230.00 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 41.4% | £114.93 | £47.55 | £17,354.16 |
| P10 | 42.2% | £113.54 | £47.90 | £17,484.62 |
| P11 | 80.0% | £174.32 | £139.46 | £50,902.17 |
| P12 | 81.4% | £192.58 | £156.70 | £57,196.75 |
| P13 | 80.0% | £158.16 | £126.53 | £46,182.35 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`):

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9%, Website 13.3%, Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 5 | 6 d | 4 n | Airbnb 60.7%, Booking.com 39.3% |
| P05 | 63 | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4%, Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3%, Booking.com 41.2%, Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6%, Airbnb 43.5%, Agoda 1.9% |
| P12 | 81 | 31 d | 4 n | Booking.com 89.8%, Airbnb 10.2% |
| P13 | **87** | 22 d | 3 n | Booking.com **52.3%** (was 51.5%), Airbnb 46.9%, Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 9 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 60 (Smoobu `/api/rates` 17 Nov 07:18Z; P13 as one calendar; handbacks respected; `occ17/orph.py`)

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P20 | 26 Dec | £271 / 4 | The 19–26 Dec stay checks out and the 27 Dec–3 Jan stay arrives the next day. | **t-p20-26dec-orphan: not changed** (day 2). PriceLabs now knows: raw `unbookable` 1. |
| P20 | 5 Dec | £277 / 3 | The 25 Nov–5 Dec stay checks out and the 6 Dec stay arrives. | **t-p20-5dec-orphan: NOT FIXED (day 9).** Raw `unbookable` 1. |
| P04 | 24 Nov | £143 / 3 | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | Day 3. Raw `unbookable` 1. Policy: never fewer than 3 nights. |
| P06 | 29 Nov | £256 / 4 | The 24–29 Nov stay checks out and block 143402691 starts 30 Nov. | Not changed. |
| P05, P06, P20 | **17 Nov (tonight), NEW** | P05 £373 / 2; P06 £230 / 2; P20 £208 / 2 | Yesterday these were 2-night runs (16–17 Nov). 16 Nov went unsold, so 17 Nov is alone before an 18 Nov arrival (P20: the 18–19 Nov block). | Created by the date roll. Expires tonight. |

**Re-checked as asked:**
- **P04 Christmas–NYE after the cancellation: no orphan.** 20 Dec–1 Jan rejoins one open run from 6 Dec to at least 15 Jan (41+ nights, min 3–7). The highest minimums are 27 Dec (min 7) and 28–31 Dec (min 5). A stay arriving on those dates must be that long, but the run is wide enough. Smoobu is open; **PriceLabs still shows the run as booked.** Whether the dates are open on Booking.com, and on Airbnb 1455876748739910219 (unsynced account), is NOT CHECKED by this section.
- **P13 around 22–27 Dec: no orphan.** 13–21 Dec is a 9-night open run at min 3 (3064856 £212–244, 3090701 £225–244), up to the 22 Dec arrival. 22–26 Dec runs straight into the 27 Dec–2 Jan stay. From 3 Jan the run is open at min 3.
- **P20 26 Dec and 5 Dec:** both still orphans (table).
- **P04 24 Nov and P06 29 Nov:** both still orphans (table).
- **New:** only the three single nights tonight (17 Nov), created by the date roll. **Lapsed:** none.
- **P04 18–19 Nov:** still a 2-night run at min 2 (Smoobu/PriceLabs). It sells only as one 18–20 Nov stay. At the policy's 3 nights it would be an orphan run (see Conflicts).
- **Single nights at min 1 (bookable, not orphans):** P12 26 Nov (£307); P13 17 Nov (£235 / £198), 27 Nov (£289 / £244) and 1 Dec (£265 / £223, policy intentional override); P04 2 Dec (£364, policy-deprioritised); P11 8 Dec (£310); P05 21 Dec (£2,054) and 29 Dec (£2,563).

### Gaps to fill (open nights next 30, 17 Nov–16 Dec, Smoobu 17 Nov 07:18Z)
- **P04 (15):**
  - 18–19 Nov (£167 / £170, min 2).
  - 24 Nov (orphan, £143).
  - 2 Dec (£364, min 1, policy).
  - 6–16 Dec (£137–154, min 3). The run continues through the reopened 20 Dec–1 Jan nights (£187–241, min 3–7) to at least 15 Jan.
- **P05 (9):** 17 Nov (orphan, £373); 29 Nov–2 Dec (£488–532, min 3); 7–8 Dec (£463 / £460, min 2); 13–14 Dec (£488 / £474, min 2).
- **P06 (4):** 17 Nov (orphan, £230); 22–23 Nov (£265 / £249, min 2); 29 Nov (orphan, £256).
- **P11 (15):**
  - 18–19 Nov (£166 / £191, min 2).
  - 22–27 Nov (£196–267, min 3).
  - 2–4 Dec (£243 / £272 / £330, min 3/2/2).
  - 8 Dec (£310, min 1).
  - 14–16 Dec (£227 / £228 / £236, min 3/3/2). The run continues to 18 Dec.
- **P12 (9):** 17–20 Nov (£248–296, min 2); 26 Nov (£307, min 1); 30 Nov–3 Dec (£253–308, min 2).
- **P13 (7):** 17 Nov, 27 Nov and 1 Dec (min 1); 13–16 Dec (£244 / £240 / £237 / £241, identical on both twins, min 3). The run continues to 21 Dec.
- **P14 (30):** every night (special setup, numbers only).
- **P20 (10):** 17 Nov (orphan, £208); 20–24 Nov (£300 / £299 / £254 / £257 / £239, min 3/3/2/2/2); 5 Dec (orphan); 14–16 Dec (£318 / £319 / £325, min 3). The run continues to 18 Dec.
- **P01, P09, P10:** none. P08 is handed back.

### Conflicts for Corentin (Smoobu/PriceLabs state vs standing decisions; not new proposals; all carried from yesterday, since no PriceLabs edits were made 16–17 Nov)
1. **P04 min stay** (policy: never fewer than 3 nights). The 18–19 Nov override (`min_stay` 2, Reyhan 15 Nov) is still live in PriceLabs and Smoobu. 18 Nov is tomorrow.
2. **P13 twin prices** (policy: keep slightly different prices). The twins are identical on 13–16 Dec (£244 / £240 / £237 / £241). 1 Dec is no longer identical (£265 / £223).
3. **P11 darts nights** (21 Oct: average above £300/night). Open 14–17 Dec now reads £227 / £228 / £236 / £246 = average £234.25 (yesterday £227.75).
4. **P20 delivery** (policy block 20–22 Nov). Smoobu blocks only 18–19 Nov. 20–24 Nov are open (£239–300). 20 Nov is 3 days away.
5. **P01 18–20 Dec.** Gap block 160657036 still runs to the 20 Dec handback. Policy says the gap block runs to 17 Dec.
6. **P06 (intentional-block listing).** 17 Nov and 22–23 Nov are open, and 29 Nov is an orphan at min 4. Reason UNKNOWN.

Data gaps:
- **PriceLabs has not refreshed P04 or P13 since 16 Nov 09:42–09:43Z.** Live `get_listing_prices`, 17 Nov:
  - It still holds the cancelled P04 20 Dec–2 Jan stay as booked.
  - It does not hold the P13 22–27 Dec stay.
  - kpi_pack `forward_occ_60` for P04 and P13, and PriceLabs' pricing of P04 20 Dec–1 Jan, are therefore stale.
- **P04 cancellation:** who cancelled and why is NOT CHECKED. Smoobu has no basePrice element on it; room £2,417.34 is taken from `reservations.csv` / Smoobu `price`.
- **Channel state of the P04 reopened nights:** NOT CHECKED, both on the Booking.com extranet and on Airbnb 1455876748739910219.
- **Market and comps for P04 20 Dec–1 Jan and P13 Christmas:** NOT CHECKED here. `market.csv`, `comps.csv` and `channel_checks.csv` are empty in the 17 Nov pack (`missing`), so ARI, RGI and price percentiles are null.
- **P13 22–27 Dec promotion stack** behind 0.694× of the ×1.10 list price: NOT CHECKED (no Booking.com reservation breakdown).
- **Method flaw in the base-rise comparison:** the P04 20 Oct 12:44 import batch (6 records) has no Smoobu basePrice element. It is counted at £0 room but with its nights. The P04 comparison group is not clean.
- **STLY:** none before 17 Nov 2025 for any unit except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **Missing from kpi_pack:**
  - P03 is not in Smoobu.
  - P04 last30, last365 and pace are null.
  - P08 forward occupancy is null (handed back).
  - P15–P19 are not mapped.
- **No PriceLabs data past 15 Jan** in raw (60-day pull).
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.
- **Reasons NOT KNOWN:** the P01 gap block to 21 Dec; the P20 block on 18–19 Nov vs the 20–22 Nov delivery in policy; the P06 reopening; the 15 Jan min-stay changes on P06/P14 (no log entry).

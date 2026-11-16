## Occupancy & performance

**Portfolio, last 30 nights (17 Oct–15 Nov 2026), the 13 units with Smoobu history:** 234 n, £40,682.01, occupancy 60.0%, ADR £173.85, RevPAR £104.31 (`reports/2026-11-16/kpi_pack.json` `portfolio_last30`). Revenue is room only (Smoobu basePrice, cleaning excluded). Yesterday (16 Oct–14 Nov) it was 237 n / 60.8% / £173.88 / £105.67.

**Last 365 nights (16 Nov 2025–15 Nov 2026):** 2,216 n, £407,828.73, occupancy 46.7%, ADR £184.04, RevPAR £85.95 (kpi_pack `portfolio_last365`). Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (16 Nov–15 Dec): 150 of 248 non-blocked nights = 60.5%.** Yesterday it was 154/253 = 60.9%.
**Booked next 60 (16 Nov–14 Jan): 213/428 = 49.8%.** Yesterday it was 216/433 = 49.9%.
- **Source:** live Smoobu GET `/api/reservations` (910 records, including cancellations and blocks; guest fields dropped) and `/api/rates`, both pulled 16 Nov 07:17:47Z. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ16/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ16/smoobu_rates.json`.
- **Check:** the two endpoints agree on every unit-night in the next 60 (0 mismatches). P13 is read as one calendar.
- **Excluded from the counts:**
  - P02, P03 and P07 (blocked on purpose, per policy).
  - Every night after a handback: P08 is fully out; P10 after 18 Nov; P09 after 26 Nov; P12 after 13 Dec; P01 after 20 Dec.
  - Blocked nights: P01 30 Nov–20 Dec; P06 from 30 Nov; P20 18–19 Nov.
- **Reconciling next 30 (154 → 150):**
  - New: +3 (P13 10–13 Dec).
  - Cancelled: 0 inside the window (P13 18–23 Dec is outside it).
  - Window roll: 15 Nov drops out −8 (booked on P01, P04, P05, P09, P10, P11, P12, P13); 15 Dec comes in +1 (P05 booked).
  - Net: 154 + 3 − 8 + 1 = 150. Denominator: 253 − 11 + 6 = 248.
- **Reconciling next 60 (216 → 213):** 216 + 3 (P13) − 5 (P13 cancellation) + 7 (P20 27 Dec–3 Jan) − 8 (15 Nov) + 0 (14 Jan) = 213. Denominator: 433 − 11 + 6 = 428.
- **kpi_pack `forward_occ` is stale on P20.** PriceLabs 3547481 was last refreshed 15 Nov 19:20:15Z, before the 22:58 booking. Live `get_listing_prices` (16 Nov) still shows 27 Dec–2 Jan open (min 6/6/5/5/5/3/3), so PriceLabs does not hold that stay. The Smoobu figures are used here.

### Smoobu full-record diff (16 Nov 07:17Z vs 15 Nov 07:20Z): blocks, bookings, min stays
- **Blocks: none created, removed or changed.**
  - P06 143402691 still starts 30 Nov.
  - P01 160657036 still runs 30 Nov to a 21 Dec departure.
  - P20 162432556 still covers only 18–19 Nov.
  - P12 155644001 still starts 14 Dec.
- **NEW 162911547: P13 Airbnb 10–13 Dec (3 n), room £468.94, created 15 Nov 17:08.** It is on **3090701** ("Bright 2BR…", policy: likely Airbnb 1587576514709814818, still to be confirmed).
- **NEW 162914560: P05 Airbnb 13–17 Feb 2027 (4 n), room £1,219.98, created 15 Nov 18:54.**
- **NEW 162920897: P20 Airbnb 27 Dec–3 Jan (7 n), room £1,803.78, created 15 Nov 22:58.**
- **CANCELLED 162896042: P13 Booking.com 18–23 Dec (5 n, £847.10, on 3064856).** `modifiedAt` 15 Nov 12:24:19. Smoobu has reopened 18–22 Dec on both twins (`available` 0 → 1).
- No other record changed. All four match the Dispatcher's `reservations.csv` diff.
- **Min-stay changes in Smoobu `/api/rates` (next 60).** Each one matches a PriceLabs date override that Reyhan set on 15 Nov (`get_user_logs`, listing, 15–16 Nov: 25 entries, all by Reyhan, 18:47–19:17Z):
  - **P11 8 Dec: 3 → 1**, now £308 (override +50%, min 1, 18:48:33Z).
  - P11 3–4 Dec 3 → 2 (18:48:27Z). P11 16–18 Dec 3 → 2 (18:48:52Z). P11 also has −5% on 22 Nov–18 Dec (18:48:18Z) and an override on 14–18 Dec, min 3 (18:48:42Z).
  - P06 23 Nov 3 → 2 (override 15–23 Nov, min 2, 19:14:48Z).
  - P06 14 Jan 4 → 3 and P14 14 Jan 4 → 3: no log entry. Both are new days at the end of the window.
- **Unchanged since yesterday:**
  - **P04 18–19 Nov min stay is still 2** (Smoobu £166 / £168). PriceLabs now also says min 2: Reyhan added an override on 18–19 Nov at 19:17:38Z on 15 Nov (+10%, `min_stay` 2). So it is not "back to 3" (see Conflicts).
  - P20 15–17 Nov has −2%, min 2 (19:16:17Z).
  - P12 17–20 Nov and 30 Nov–3 Dec have min 2 (18:47Z).
  - P05 has overrides on 29 Nov–2 Dec (min 3), 4–31 Jan (−5%, min 3) and 1–28 Feb (−5%, min 4), all 19:14Z.
  - P13 10–26 Dec has an override with min 3 on 3064856, copied to 3090701 and to the Vrbo unit (19:12:34Z).
- **Prices moved on every unit.** For example, the open-on-both-days sums moved: P04 £5,432 → £5,252; P05 £13,629 → £13,888; P11 £6,900 → £7,067; P20 £6,296 → £6,553.
- **P13 3090701 rose and now equals 3064856 on 13–15 Dec.** 3090701 went from £186 / £182 on 13–14 Dec to £245 / £240. The twins are now identical on 4 open nights: 1 Dec, 13, 14 and 15 Dec (0 identical nights yesterday). See Conflicts.

### Are the new bookings in PriceLabs?
Sources: raw `prices_*.json` in `data/snapshots/2026-11-16/raw/`, plus live `get_listing_prices` on 16 Nov for P20 and P05.

| Booking | Registered? | Evidence |
|---|---|---|
| P04 20–24 Nov (t-pl-sync-1511) | **Yes, fixed** | 3562176 refreshed 15 Nov 19:20:15Z: 20 Nov "Booked (Check-In)", 23 Nov "Booked", 24 Nov `unbookable` 1 |
| P13 10–13 Dec | **Yes**, on the right twin | 3090701 refreshed 19:13:17Z shows "Booked (Check-In)"; 3064856 shows 10–12 Dec "Blocked" (one flat, per policy) |
| P13 18–23 Dec cancellation | **Yes** | 18–22 Dec open on both twins |
| P05 13–17 Feb | **Yes** | Live: 3166592 refreshed 19:14:36Z, 13 Feb "Booked (Check-In)", `booked_date` 15 Nov, ADR 305 |
| **P20 27 Dec–3 Jan** | **NO** | Live: refreshed 19:20:15Z, 27 Dec–2 Jan `booking_status` "" and `unbookable` 0 |

### Paid vs price on the three new Airbnb stays (room only; Smoobu has no price history, so the price at the moment of booking is NOT CHECKED)
Commission is 15.5% of room + cleaning on all three: £95.94, £302.84 and £219.32 (`reservations.csv`).

- **P13 10–13 Dec, 3090701** (25 d out, created 17:08, before the 19:12Z override and the 19:13Z push):
  - Smoobu 15 Nov 07:20Z: 194 + 209 + 210 = £613. Paid **0.765×** (£613 × 0.765 = £468.95, 1p off). That is the same 0.765 as the P04 booking on 14 Nov.
  - 3 nights, so no stay discount applies. Policy (21 Oct) sets the Shepherd's Bush Airbnb last-minute rule at −10% within 14 days, which does not reach 25 d. The cause of 0.765 is NOT CHECKED.
  - Smoobu 16 Nov (after the push) has £807 on the same nights, so paid = 0.581× today's price.
  - Gap below Smoobu 15 Nov: £144.06.
  - Whether Reyhan's −5% (10–26 Dec) was live at booking is NOT CHECKED.
- **P20 27 Dec–3 Jan** (42 d out, created 22:58, after the 19:20Z push):
  - Smoobu 16 Nov (= the 19:20Z push values): 352 + 411 + 426 + 433 + 433 + 358 + 361 = £2,774. Paid **0.650×**, which is 0.85 (weekly, policy) × **0.765** (£2,774 × 0.85 × 0.765 = £1,803.80, 2p off).
  - On Smoobu 15 Nov (£2,873) it is 0.628×.
  - Gap beyond the policy weekly 15%: £2,357.90 − £1,803.78 = **£554.12**.
  - P20's Airbnb discounts in policy are weekly 15%, monthly 20% and last-minute 15% (0–14 d only). The extra 0.765 is not explained by policy.
- **P05 13–17 Feb** (90 d out, created 18:54, before Reyhan's Feb −5% at 19:14:20Z):
  - PriceLabs live `booked_price`: 424 + 393 + 403 + 411 = £1,631. Paid **0.748×** = 0.88 × 0.85 (£1,631 × 0.748 = £1,219.99, 1p off). The 0.88 matches the 12% early bird visible on Airbnb; the 0.85 is NOT CHECKED (4 nights, so not a weekly discount).
  - PriceLabs `price` now: £1,686, after the −5% override. Paid = 0.724× that.
  - Smoobu rates were not pulled beyond 7 Feb.
  - Gap below `booked_price`: £411.02; after the 12% early bird: £215.30.

### 7-day pickup, net of cancellations (made 10–16 Nov, to 07:17Z; Smoobu `created-at`, `modifiedAt` for cancellations; `occ16/pick.py`)
- **Gross made:** 10 bookings / 51 n / £9,753.39.
- **Still confirmed:** 8 / 39 n / £7,893.43.
- **Cancelled in the window:** 5 bookings / 22 n / £3,899.80.
- **Net: +29 n / +£5,853.59.** Yesterday (9–15 Nov) it was +22 n / +£3,332.72.
- **Reconciliation:**
  - 9 Nov drops out: made P20 21–25 Nov (4 n / £638.54) and P13 11–15 Dec (4 n / £710.77); cancellations P12 11–13 Dec (2 n / £513.81) and P13 11–15 Dec (4 n / £710.77). Effect −2 n / −£124.73.
  - Overnight: +3 + 4 + 7 − 5 = **+9 n / +£2,645.60**.
  - 22 − 2 + 9 = 29; £3,332.72 − £124.73 + £2,645.60 = £5,853.59.
- No imported past stays fall in the window. kpi_pack `pickup_7d` counts confirmed bookings only (no cancellations).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P01 | 0 | 18–21 Dec 3 / £720.90 | −3 / −£720.90 |
| P04 | 1 / 4 / £489.59 (20–24 Nov) | — | +4 / +£489.59 |
| **P05** | **1 / 4 / £1,219.98 (13–17 Feb, NEW)** | — | **+4 / +£1,219.98** |
| P06 | 1 / 5 / £1,009.82 (24–29 Nov) | — | +5 / +£1,009.82 |
| P11 | 3 / 16 / £2,481.76 (incl. 8–15 Dec made and cancelled) | 8–15 Dec 7 / £1,012.86; 26–29 Nov 3 / £680.40 | +6 / +£788.50 |
| P12 | 1 / 7 / £1,432.42 (7–14 Dec) | — | +7 / +£1,432.42 |
| **P13** | **2 / 8 / £1,316.04 (10–13 Dec NEW £468.94; 18–23 Dec £847.10)** | **18–23 Dec 5 / £847.10 (NEW)** | **+3 / +£468.94** (was +5 / +£847.10) |
| **P20** | **1 / 7 / £1,803.78 (27 Dec–3 Jan, NEW)** | 21–25 Nov 4 / £638.54 (made 9 Nov) | **+3 / +£1,165.24** |
| P02, P07, P08, P09, P10, P14 | 0 | — | 0 |

### Pace vs STLY (cancellations excluded on both sides; `rm.metrics.on_the_books` on `data/snapshots/2026-11-16/reservations.csv`)
- **P12, handback-aware (stays 16 Nov–13 Dec vs 16 Nov–13 Dec 2025 as of 16 Nov 2025): 19 n / £3,953.03 vs 24 n / £4,360.15 = −5 n / −£407.12 / −9.3%. On track**, but only 0.7 pts inside the ±10% band. Yesterday it was −8.0%.
  - kpi_pack `pace_30` (16 Nov–15 Dec) reads −7 n / −14.9% (£3,953.03 vs £4,643.70). The difference is STLY 14–15 Dec 2025 (2 n / £283.55), which falls after the handback and has no 2026 inventory.
  - kpi_pack `pace_90` (16 Nov–13 Feb) reads −20 n / −48.9% (vs 39 n / £7,738.18). Nothing after 13 Dec is inventory, so handback-aware pace90 = pace to handback.
- **P02:** kpi_pack 30-day 0 vs STLY 8 n / £825.88; 90-day 0 vs 18 n / £1,831.18. Blocked on purpose, so not assessed.
- **Every other unit: pace UNKNOWN.** No Smoobu bookings were made on or before 16 Nov 2025. The earliest `booked_on` dates are P11 9 Dec 2025, P13 11 Dec 2025, P05 16 Feb 2026, P06 28 Apr 2026, P01/P09/P10 May 2026, P04 20 Oct 2026 and P20 10 Oct 2026. STLY is therefore 0, not a real comparison.
- **On the books, stays 16 Nov–15 Dec** (kpi_pack `pace_30`):

| Ref | Nights | Revenue |
|---|---|---|
| P01 | 14 | £2,129.82 |
| P05 | 20 | £10,336.65 |
| P06 | 9 | £1,866.61 |
| P09 | 11 | £1,129.79 |
| P10 | 3 | £317.89 |
| P11 | 16 | £3,013.66 |
| P13 | 24 | £3,667.21 |
| P20 | 18 | £3,236.90 |
| P04 | UNKNOWN (pack empty) | UNKNOWN |

- **On the books, 90-day window:**

| Ref | Nights | Revenue |
|---|---|---|
| P05 | 41 | £21,886.29 |
| P11 | 28 | £6,354.70 |
| P13 | 31 | £5,433.22 |
| P20 | 32 | £6,468.68 |

### 18 Oct base rises: running effect (same method as yesterday)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 16 Nov 07:17Z pull (`occ16/rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,196.31 including P06.** Yesterday it was +30 / +£7,976.33.
- **Like-for-like** (excluding both P06 stays on reopened nights: 18–22 Nov £856.79 and 24–29 Nov £1,009.82): **+25 n / +£7,329.70.** Yesterday it was +21 / +£6,109.72.
- **Day-on-day: P05 +4 n / +£1,219.98** (the 13–17 Feb stay). No other raised unit changed.
- Made: 28 / 108 n / £23,831.63. Cancelled: 13 / 74 n / £14,635.32.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| **P05** | **4 / 16 / £6,135.19** | — | **+16 / +£6,135.19** (was +12 / +£4,915.21) |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): **+51 n / +£9,443.82** (was +44 / +£7,640.04; P20 +7 / +£1,803.78).
- P13: **+22 / +£3,863.90** (was +24 / +£4,242.06: +3 / +£468.94 new, −5 / −£847.10 cancelled).
- P04: +50 / +£2,115.38 (unchanged).

**What this means:**
- Without P05, the raised group like-for-like is still +9 n / +£1,194.51.
- The new P05 stay is in February, sold 90 d out at 0.748× PriceLabs `booked_price`. P05's base also rose again on 20 Oct (500 → 550), so it is not only an 18 Oct effect.
- Caveats as before: the 24 Oct and 12 Nov Booking.com markup changes, promotions, Reyhan's overrides (15 more added on 15 Nov) and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 17 Oct–15 Nov.
- Fwd occ30: Smoobu 16 Nov 07:17Z, 16 Nov–15 Dec, handback-aware (kpi_pack market occupancy in brackets).
- Pace30: as above.
- Pickup 7d: made 10–16 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £156.88 | £156.88 | 100% of 14 non-blocked (35%) | UNKNOWN: no STLY | −3 / −£720.90 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 36.7% | £97.19 | £35.64 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (55%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack last30 null | UNKNOWN | UNKNOWN | **53.3%** 16/30 (24%) | UNKNOWN: pack empty | +4 / +£489.59 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 83.3% | £376.99 | £314.16 | 66.7% 20/30 (46%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £198.25 | £138.77 | 64.3% of 14 non-blocked (51%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 80.0% | £141.23 | £112.98 | handed back after 13 Nov (54%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £116.87 | £58.44 | 100% 11/11 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 96.7% | £105.96 | £102.43 | 100% 3/3 to 18 Nov (32%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P11 | Camden | 70.0% | £173.90 | £121.73 | **53.3%** 16/30 (50%) | UNKNOWN: no STLY | +6 / +£788.50 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 73.3% | £162.83 | £119.41 | 67.9% 19/28 to handback (43%) | **−5 n / −£407.12 / −9.3%** (pack −14.9%) | +7 / +£1,432.42 | **On track** (0.7 pts from Soft) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £154.71 | £92.82 | **80.0%** 24/30 (47%) | UNKNOWN: no STLY | +3 / +£468.94 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (49%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 60.0% | £171.34* | £102.80* | 64.3% of 28 non-blocked (39%) | UNKNOWN: no STLY | +3 / +£1,165.24 | Unclassifiable (60–85%, no STLY) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`); 18–22 Oct is inside this window, so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 1: P12.
- Soft 3: P04, P11, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Not classified 4: P02, P03, P07 (policy blocks); P08 (handed back).
- No class changed since yesterday.

**Next 60 (16 Nov–14 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share |
|---|---|---|
| P01 | 14/14 | 100% |
| P04 | 29/60 | 48.3% |
| P05 | 37/60 | 61.7% |
| P06 | 9/14 | 64.3% |
| P09 | 11/11 | 100% |
| P10 | 3/3 | 100% |
| P11 | 28/60 | 46.7% |
| P12 | 19/28 | 67.9% |
| P13 | 31/60 | 51.7% |
| P14 | 0/60 | 0% |
| P20 | 32/58 | 55.2% |

Comparisons:
- kpi_pack `forward_occ_60` (PriceLabs): P04 47.5%, P05 62.7%, P11 45.8%, P13 50.8%, P20 54.2%.
- kpi_pack `market_occ_60`: P04 19%, P05 39%, P11 38%, P13 37%, P20 30%.

**Last 365 nights** (kpi_pack `last365`, 16 Nov 2025–15 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 42.7% | £175.38 | £74.96 | £27,359.71 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 60.3% | £373.04 | £224.85 | £82,069.61 |
| P06 | 37.5% | £235.26 | £88.30 | £32,230.00 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 41.1% | £115.01 | £47.26 | £17,251.45 |
| P10 | 41.9% | £113.59 | £47.61 | £17,378.66 |
| P11 | 79.7% | £174.13 | £138.83 | £50,672.88 |
| P12 | 81.4% | £192.43 | £156.58 | £57,150.24 |
| P13 | 79.7% | £158.17 | £126.10 | £46,026.68 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`):

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9%, Website 13.3%, Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 5 | 6 d | 4 n | Airbnb 60.7%, Booking.com 39.3% |
| P05 | **63** | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4%, Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3%, Booking.com 41.2%, Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6%, Airbnb 43.5%, Agoda 1.9% |
| P12 | 81 | 31 d | 4 n | Booking.com 89.8%, Airbnb 10.2% |
| P13 | 86 | 22 d | 3 n | Booking.com **51.5%** (was 52.8%), Airbnb **47.6%**, Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | **9** | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 60 (Smoobu `/api/rates` 16 Nov 07:17Z; P13 as one calendar; handbacks respected; `occ16/orph.py`)

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P20** | **26 Dec, NEW** | £300 / 4 | The 19–26 Dec stay checks out and the new 27 Dec–3 Jan stay arrives the next day. | Created by the 15 Nov booking. kpi_pack `gaps` flags it (26 Dec, 1 n, min 4). PriceLabs does not know: the booking is not registered and `unbookable` is 0. |
| P04 | 24 Nov | £143 / 3 | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | Day 2. PriceLabs now knows: `unbookable` 1. |
| P06 | 29 Nov | £243 / 4 | The 24–29 Nov stay checks out and block 143402691 starts 30 Nov. | **t-p06-2229open: not changed.** PriceLabs `unbookable` 1. |
| P20 | 5 Dec | £286 / 3 | The 25 Nov–5 Dec stay checks out and the 6 Dec stay arrives. | **t-p20-5dec-orphan: NOT FIXED (day 8).** Live PriceLabs `unbookable` 1, `user_price` 279. |

**Re-checked as asked:**
- **P11 8 Dec: no longer an orphan.** Since Reyhan's override (+50%, min 1, 15 Nov 18:48:33Z), Smoobu has £308 at min 1, so it is sellable as a 1-night stay. **t-p11-8dec-orphan: resolved by min 1 in Smoobu.** Raw PriceLabs `min_stay` 1, `unbookable` 0.
- **P13 around 10–13 Dec: no orphan.** 7–9 Dec (Booking.com) runs straight into the new 10–12 Dec stay. After it, 13–26 Dec is a 14-night open run at min 3 (3064856 £206–245, 3090701 £218–245), up to the 27 Dec arrival.
- **P13 18–23 Dec: no orphan.** The cancelled nights rejoin the 13–26 Dec run.
- **P20 around 27 Dec–3 Jan:** 26 Dec is the new orphan (above). From 3 Jan the run is open at min 3 (£225 →).
- **P04 18–19 Nov:** a 2-night run between the 14–18 Nov checkout and the 20 Nov arrival. At Smoobu/PriceLabs min 2 it sells only as one 18–20 Nov stay. At the policy's 3 nights it would be an orphan run.
- **P06 22–23 Nov:** min 2 on both nights now (23 Nov was 3). Only a 22–24 Nov stay fits, because 23 Nov alone is below its min 2.
- **New:** P20 26 Dec only. **Lapsed overnight:** P11 8 Dec.
- **Single nights at min 1 (bookable, not orphans):** P12 26 Nov (£301); P13 17 Nov (£244 / £207), 27 Nov (£304 / £258) and 1 Dec (£278 / £278, policy intentional override); P04 2 Dec (£383, policy-deprioritised); P11 8 Dec (£308); P05 21 Dec (£2,063) and 29 Dec (£2,556), both unchanged since 15 Nov (`prices.csv`).

### Gaps to fill (open nights next 30, 16 Nov–15 Dec, Smoobu 16 Nov 07:17Z)
- **P04 (14):** 18–19 Nov (£166 / £168, min 2); 24 Nov (orphan, £143); 2 Dec (£383, min 1, policy); 6–15 Dec (£145–163, min 3; the run continues to 19 Dec).
- **P05 (10):** 16–17 Nov (£356 / £368, min 2); 29 Nov–2 Dec (£488–533, min 3); 7–8 Dec (£464 / £458, min 2); 13–14 Dec (£487 / £475, min 2).
- **P06 (5):** 16–17 Nov (£264 / £268, min 2); 22–23 Nov (£250 / £236, min 2); 29 Nov (orphan).
- **P11 (14):** 18–19 Nov (£169 / £195, min 2); 22–27 Nov (£191–271, min 3); 2–4 Dec (£242 / £270 / £328, min 3/2/2); 8 Dec (£308, min 1); 14–15 Dec (£220 / £227, min 3; the run continues to 18 Dec).
- **P12 (9):** 17–20 Nov (£255–310, min 2); 26 Nov (£301, min 1); 30 Nov–3 Dec (£255–294, min 2).
- **P13 (6):** 17 Nov, 27 Nov and 1 Dec (min 1); 13–15 Dec (£245 / £240 / £237, identical on both twins, min 3; the run continues to 26 Dec).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (10):** 16–17 Nov (£250 / £261, min 2); 20–24 Nov (£297 / £302 / £257 / £244 / £230); 5 Dec (orphan); 14–15 Dec (£309 / £308, min 3; the run continues to 18 Dec).
- **P01, P09, P10:** none. P08 is handed back.

### Conflicts for Corentin (Reyhan's PriceLabs edits or Smoobu state vs standing decisions; not new proposals)
1. **P04 min stay** (policy: never open for fewer than 3 nights). Reyhan added a PriceLabs override on 18–19 Nov at 19:17:38Z on 15 Nov: +10%, `min_stay` 2. PriceLabs and Smoobu now both say min 2. Yesterday PriceLabs said 3 and only Smoobu said 2.
2. **P13 twin prices** (policy: keep slightly different prices). Reyhan's 10–26 Dec override on 3064856 was copied to 3090701 at 19:12:34Z. 3090701 rose and now equals 3064856 on 13, 14 and 15 Dec (£245 / £240 / £237). 1 Dec is also identical (£278, the intentional +50%).
3. **P11 darts nights.** The 21 Oct decision is "average above £300/night"; the 24 Oct note says leave Reyhan's +5%. On 15 Nov Reyhan added −5% on 22 Nov–18 Dec and an override on 14–18 Dec. The open 14–17 Dec nights now read £220 / £227 / £222 / £242 = average £227.75 (yesterday £221.00).
4. **P20 delivery.** Policy has the delivery block on 20–22 Nov. Smoobu blocks only 18–19 Nov (162432556, unchanged), and 20–24 Nov are open at £230–302 (min 3/3/2/2/2). 20 Nov is 4 days away.
5. **P01 18–20 Dec.** Gap block 160657036 still runs to the 20 Dec handback (departure 21 Dec). Policy says the gap block runs to 17 Dec.
6. **P06 (intentional-block listing).** Nights 16–17 and 22–23 Nov are open, and Reyhan set min 2 on 15–23 Nov. 29 Nov is still an orphan at min 4. Who reopened them and why is UNKNOWN.

Data gaps:
- **PriceLabs does not hold the P20 27 Dec–3 Jan booking.** 3547481 was last refreshed 15 Nov 19:20:15Z (live 16 Nov). As a result, kpi_pack `forward_occ_60` for P20 and PriceLabs' view of 26 Dec (orphan) and 27 Dec–2 Jan are stale.
- **Price at the moment of booking:** not recorded in Smoobu.
  - P13 booked before the 19:12Z override and the 19:13Z push. P20 booked after the 19:20Z push. P05 booked before the 19:14Z Feb override.
  - Smoobu `created-at` time zone is not stated. The PriceLabs `booked_date` and refresh order are consistent with GMT.
- **Cause of the 0.765 factor** (P04 14 Nov, P13 and P20 15 Nov) and of the 0.85 on P05: NOT CHECKED. No Airbnb reservation breakdown was seen.
- **Airbnb listing ID behind P13 3090701:** NOT CHECKED (Smoobu holds the confirmation code only).
- **Whether the earlier P13 −5% window was live at the 17:08 booking:** NOT CHECKED. The log shows the 15 Nov override without a price value.
- **Not checked by this section:** Airbnb 1455876748739910219 public calendar on P04 20–24 Nov (t-p04-doublebook), and comps/market for the P20 NYE week and P13 10–12 Dec (comp sections).
- **STLY:** none before 16 Nov 2025 for any unit except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **Missing from kpi_pack:**
  - P03 is not in Smoobu.
  - P04 last30, last365 and pace are null.
  - P08 forward occupancy is null (handed back).
  - P15–P19 are not mapped.
  - `market.csv`, `comps.csv` and `channel_checks.csv` are empty in the 16 Nov pack (`missing`), so ARI, RGI and price percentiles are null.
- **No PriceLabs data past 15 Jan** in raw (60-day pull). P05 February was checked live only.
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.
- **Reasons NOT KNOWN:** the P01 gap block to 21 Dec; the P20 block on 18–19 Nov vs the 20–22 Nov delivery in policy; the P06 reopening; the P06 and P14 14 Jan min-stay changes (no log entry).

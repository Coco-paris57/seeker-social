## Occupancy & performance

**Portfolio, last 30 nights (21 Oct–19 Nov 2026), the 14 units with Smoobu history:** 239 n, £40,514.05, occupancy 56.9%, ADR £169.51, RevPAR £96.46 (`reports/2026-11-20/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (20 Oct–18 Nov) it was 241 n / £40,646.92.
  - 20 Oct leaves: −9 booked (P01, P02, P05, P08, P09, P10, P12, P13, P20; £1,553.01).
  - 19 Nov enters: +7 (P01, P04, P05, P06, P09, P13, P20; £1,420.15).
  - 241 − 9 + 7 = 239. £40,646.92 − £1,553.01 + £1,420.15 = £40,514.06 (1p rounding against the pack). Per-night figures are pro rata, from `data/snapshots/2026-11-20/reservations.csv`.

**Last 365 nights (20 Nov 2025–19 Nov 2026):** 2,232 n, £411,073.23, occupancy 47.0%, ADR £184.17, RevPAR £86.63 (kpi_pack `portfolio_last365`). Yesterday it was 2,228 n / £410,007.59. Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (20 Nov–19 Dec): 135 of 236 non-blocked nights = 57.2%, £30,744.63 room revenue on the books.** Yesterday it was 136/235 = 57.9%, £30,478.48.
**Booked next 60 (20 Nov–18 Jan): 192/416 = 46.2%, £48,733.24.** Yesterday it was 196/415 = 47.2%, £49,438.84.
- **Source:** live Smoobu GET `/api/reservations` (846 records including cancellations and blocks; guest fields dropped) and GET `/api/rates`, pulled 20 Nov 07:18:30Z. Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ20/smoobu_res.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ20/smoobu_rates.json`.
  - The 719 non-block records match `data/snapshots/2026-11-20/reservations.csv` row for row (ref, dates, status, amount).
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar.
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks: P08 and P10 are fully out; P09 after 26 Nov; P12 after 13 Dec; P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; P06 22 Nov and from 6 Dec (see below).
- **Reconciling next 30 (136/235 → 135/236).** I recounted yesterday's window (19 Nov–18 Dec) on today's pull: 139/240.
  - Booked side: +3 for P20 19, 20 and 21 Nov, the new Airbnb stay.
  - Inventory side: +6 for P06 30 Nov–5 Dec (reopened) and −1 for P06 22 Nov (newly blocked).
  - Then 19 Nov leaves: −7 booked, −10 inventory. 19 Dec enters: +3 booked (P05, P11, P20), +6 inventory.
  - 139 − 7 + 3 = **135**; 240 − 10 + 6 = **236**.
- **Reconciling next 60 (196/415 → 192/416).** The recount of 19 Nov–17 Jan on today's pull is 199/420. 19 Nov leaves −7 / −10. 18 Jan enters 0 booked / +6 open (P04, P05, P11, P13, P14, P20). 199 − 7 = **192**; 420 − 10 + 6 = **416**.

### What changed overnight (19 Nov 07:18Z → 20 Nov 07:18Z)
- **718 → 719 reservations, 844 → 846 records.**
  - One new booking: **P20 Airbnb 19–22 Nov** (details below).
  - One new block: **P06 "Blocked channel" 22–23 Nov** (1 night), created 19 Nov 21:26.
  - Nothing was deleted.
- **Cancellations: none.** The latest is still P04 Booking.com 20 Dec–2 Jan (`modifiedAt` 16 Nov 15:37:54).
- **Modified: 1 record. The P06 long block moved its start from 30 Nov to 6 Dec** (`modifiedAt` 19 Nov 11:55:35; it still ends 31 Dec 2027).
  - That reopened **29 Nov–5 Dec, 7 nights**, at 269/324/363/376/388/432/472 = £2,624, min 3 (Smoobu `/api/rates`).
  - P06 is a policy intentional-block listing. Reason UNKNOWN; reported as a fact, not a gap finding.

### P20: the new Airbnb booking, 19–22 Nov
- **The record:** 3 n, room (basePrice) **£714.55 = £238.18/n**, cleaning £150, commission £134.01, total £864.55.
  - Created 19 Nov 21:24 (Smoobu `created-at`), so the lead time is 0 days. Type "modification of booking", as on other Airbnb records.
  - 2 adults + 2 children = 4 guests, within the policy maximum of 4. That covers this stay only; whether the Airbnb listing still allows 6 guests (t-p20-guests-1911) is the channel agent's check.
- **Price comparison** (the price live at 21:24 is NOT CHECKED):

| Basis | 19 Nov | 20 Nov | 21 Nov | Total | Paid ÷ price | Policy expectation (last-minute 15%) | Gap |
|---|---|---|---|---|---|---|---|
| Smoobu 19 Nov 07:18Z (`occ19/smoobu_rates.json`) | £311 | £334 | £282 | £927 | **0.771×** | £787.95 | −£73.40 (−9.3%) |
| Smoobu now, i.e. last push = PriceLabs refresh 19 Nov 09:23Z (19 Nov at the 07:18Z £311) | £311 | £326 | £351 | £988 | **0.723×** | £839.80 | −£125.25 (−14.9%) |

  - The policy expectation comes from `listing_facts.P20.airbnb_discounts_22oct`: last-minute 15% for stays booked 0–14 days out; the new-listing promotion has ended. The stay is under 7 nights, so no weekly discount applies.
  - The paid rate is 0.72–0.77× the Smoobu price, against the expected 0.85×. The gap beyond 15% is **unexplained on the policy data**; the channel agent should decompose it.
  - PriceLabs `get_listing_prices` (today, read-only) shows `user_price` / `booked_price` at 334 / 282 on 20 / 21 Nov, which equal the 07:18Z Smoobu prices. `price` is 326 / 351, which equals Smoobu now.
- **It covers the policy delivery block** (`listing_facts.P20.block_20_21_nov`: "Smoobu block 20–22 Nov = delivery").
  - The guest is in on the nights of 20 and 21 Nov and checks out 22 Nov at 11:00.
  - The Smoobu block was shortened to 18 Nov only on 18 Nov 16:16:46Z, which opened these nights.
  - **Whether the delivery still happens with a guest in: NOT CHECKED. For Corentin.**
  - Inside the next 30 the stay adds 2 n / £476.37 (pro rata), lifting P20 from 60.0% to 70.0%.
- **Is 21 Nov closed in Smoobu? Yes.** Smoobu `/api/rates` 20 Nov 07:18Z shows 20 Nov and 21 Nov at `available` 0 (£326 / £351, min 3). Smoobu is not selling 21 Nov.
- **PriceLabs has not registered the stay.** Its last refresh was 19 Nov 09:23Z, 12 hours before the booking was made. `get_listing_prices` 20–25 Nov (called today) shows 20 Nov and 21 Nov with `booking_status` "" and occupancy 0, i.e. open. `prices.csv` also has 21 Nov `available` True.
  - So the PriceLabs "open" reading is stale data, not a second Smoobu sale.
  - 19 Nov is in the past and not returned by PriceLabs, so whether it registered 19 Nov: NOT CHECKED.
  - Whether Booking.com still sells 20–21 Nov: NOT CHECKED (channel agent; Smoobu at 0 should have closed it).
- **After the stay, 22–24 Nov are open** at £290 / £283 / £276 (= £849), min 2 / 2 / 2 in both Smoobu and PriceLabs, before the 25 Nov arrival.
  - Not an orphan. It sells as 22–24, 22–25 or 23–25. An arrival on 24 Nov cannot meet min 2.
  - Under the policy min 3 (25 Oct–30 Nov) it would sell only as exactly 22–25 Nov. The min-2 setting is a conflict carried from yesterday.

### 7-day pickup, net of cancellations
- **Window:** bookings made 14–20 Nov to 07:18Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ20/pick_rise.py`.
- **Gross made:** 11 bookings / 53 n / £10,011.61.
- **Still confirmed:** 10 / 48 n / £9,164.51.
- **Cancelled in the window:** 2 / 18 n / £3,264.44: P04 20 Dec–2 Jan £2,417.34 and P13 18–23 Dec £847.10.
- **Net: +35 n / +£6,747.17.** Yesterday it was +38 n / +£6,967.33.
- **Reconciliation:**
  - 13 Nov leaves: P06 24–29 Nov (5 n, £1,009.82) and P11 28 Nov–2 Dec (4 n, £605.29) drop out of the made side; the P11 26–29 Nov cancellation (3 n, £680.40) drops out of the cancelled side. Net −6 n / −£934.71.
  - P20 19–22 Nov enters (made 19 Nov 21:24, after yesterday's 07:18Z cut-off): +3 n / +£714.55.
  - 38 − 6 + 3 = 35. £6,967.33 − £934.71 + £714.55 = £6,747.17.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 3 / 14 / £1,820.48 (18–20 Nov, 20–24 Nov, 27 Dec–4 Jan) | 13 / £2,417.34 | **+1 / −£596.86** |
| P05 | 1 / 4 / £1,219.98 | — | +4 / +£1,219.98 |
| P11 | 1 / 5 / £863.61 | — | +5 / +£863.61 |
| P12 | 1 / 7 / £1,432.42 | — | +7 / +£1,432.42 |
| P13 | 3 / 13 / £2,156.79 | 5 / £847.10 | +8 / +£1,309.69 |
| P20 | 2 / 10 / £2,518.33 (19–22 Nov £714.55; 27 Dec–3 Jan £1,803.78) | — | **+10 / +£2,518.33** |
| P01, P02, P06, P07, P08, P09, P10, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross confirmed) matches, e.g. P20 2 / 10 / £2,518.33 and P11 1 / 5 / £863.61.

### Pace vs STLY
Cancellations are excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-20/reservations.csv`).
- **P12, handback-aware.** Stays 20 Nov–13 Dec 2026 as of 20 Nov 2026, against 20 Nov–13 Dec 2025 as of 20 Nov 2025: **18 n / £3,775.96 vs 20 n / £3,818.80 = −2 n / −£42.84 / −1.1%. Within ±10%, so On track** (yesterday −4.5%).
  - P12's on the books is unchanged. Again only the STLY side moved: 19 Nov 2025 left the window, the last night of the 17–20 Nov 2025 stay (£136.93/n). £3,955.73 − £136.93 = £3,818.80.
  - 20 Nov 2025 was unbooked, so STLY loses no second night. **The move comes from where the window falls, not from demand.**
  - kpi_pack `pace_30` (20 Nov–19 Dec, not handback-aware): −5 n / −11.0% (£3,775.96 vs 23 n / £4,244.13).
  - kpi_pack `pace_90`: −32 n / −59.3% (vs 50 n / £9,277.97). Nothing after 13 Dec is inventory.
- **P02:** kpi_pack 30-day 0 vs STLY 12 n / £1,263.28; 90-day 0 vs 19 n / £1,935.14. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** None of them has a booking made on or before 20 Nov 2025.

### 18 Oct base rises: running effect (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 20 Nov 07:18Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,196.31 including P06; +25 n / +£7,329.70 like-for-like.** Both are unchanged for a fourth day.
- Like-for-like excludes the P06 stays on reopened nights: 18–22 Nov £856.79 and 24–29 Nov £1,009.82.
- Made: 28 / 108 n / £23,831.63. Cancelled: 13 / 74 n / £14,635.32.
- No raised unit has had a booking or a cancellation since 13 Nov 22:20 (P06 24–29 Nov), so the group has been flat for 7 days.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | — | +16 / +£6,135.19 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups:**
- **Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37.** Yesterday it was +51 / +£9,443.82; the change is the P20 stay, +3 n / +£714.55.
- P13: +27 n / +£4,704.65, unchanged.
- P04: +47 n / +£5,933.67 using `total_gbp`, unchanged. It is +£3,446.27 if import-batch records without a basePrice count as £0.
- **Caveats as before:** the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 21 Oct–19 Nov.
- Fwd occ30: Smoobu 20 Nov 07:18Z, 20 Nov–19 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 14–20 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £155.52 | £155.52 | 100% 10/10 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the handback) |
| P02 | Ladbroke Grove | 23.3% | £99.52 | £23.22 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 70.0%† | £120.25† | £84.17† | **46.7%** 14/30 (23%) | UNKNOWN: no STLY | **+1 / −£596.86** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £384.05 | £294.44 | 73.3% 22/30 (47%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £198.31 | £145.43 | **46.7%** 7/15 non-blocked (52%) | UNKNOWN: no STLY | 0 | **Soft** (fwd30 < 60%; moved by the block change, not by a cancellation; was 72.7% 8/11) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 66.7% | £138.11 | £92.07 | handed back after 13 Nov (57%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £110.66 | £55.33 | 100% 7/7 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 96.7% | £105.96 | £102.43 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 70.0% | £180.25 | £126.17 | **50.0%** 15/30 (51%) | UNKNOWN: no STLY | +5 / +£863.61 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 63.3% | £154.50 | £97.85 | 75.0% 18/24 to handback (44%) | **−2 n / −£42.84 / −1.1%** handback-aware (pack −11.0%) | +7 / +£1,432.42 | **On track** |
| P13 | Shepherd's Bush (one flat) | 56.7% | £147.68 | £83.69 | 70.0% 21/30 (47%) | UNKNOWN: no STLY | +8 / +£1,309.69 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (47%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £180.27* | £90.14* | **70.0%** 21/30 (38%) | UNKNOWN: no STLY | **+10 / +£2,518.33** | Unclassifiable (60–85%, no STLY) |

† P04's figures mix bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.
\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`). 21–22 Oct is in the window, so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 2: P01, P09.
- On track 1: P12.
- Soft 4: P04, P06, P11, P14.
- Unclassifiable 8: P05, P13, P20, P15–P19.
- Not classified 5: P02, P03, P07 (policy blocks); P08, P10 (handed back).
- **Changes since yesterday:**
  - P06 moved from Unclassifiable to Soft. This is purely the denominator: 6 reopened nights, 1 newly blocked night, and 19 Nov rolling off.
  - P20 rose from 60.0% to 70.0%, still Unclassifiable.
  - P04 slipped from 50.0% to 46.7%: 19 Nov (booked) left the window and 19 Dec (open) entered.

**Next 60 (20 Nov–18 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 10/10 | 100% | £1,521.30 |
| P04 | 22/60 | 36.7% | £2,969.28 |
| P05 | 35/60 | 58.3% | £19,604.23 |
| P06 | 7/15 | 46.7% | £1,438.21 |
| P09 | 7/7 | 100% | £718.96 |
| P11 | 26/60 | 43.3% | £5,896.13 |
| P12 | 18/24 | 75.0% | £3,775.96 |
| P13 | 33/60 | 55.0% | £5,864.12 |
| P14 | 0/60 | 0% | £0 |
| P20 | 34/60 | 56.7% | £6,945.05 |

Comparison: kpi_pack `forward_occ_30` / `forward_occ_60` (PriceLabs) give P04 44.8% / 35.6%, P06 20.7% (including blocks), P11 48.3%, P12 78.3%, P13 69.0% / 54.2% and P20 69.0% / 55.9%. These differ from Smoobu by window and denominator; Smoobu is the truth.

**Last 365 nights** (kpi_pack `last365`, 20 Nov 2025–19 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 43.8% | £174.80 | £76.63 | £27,968.23 |
| P02 | 79.2% | £128.85 | £102.02 | £37,237.98 |
| P05 | 60.8% | £373.82 | £227.36 | £82,987.16 |
| P06 | 38.1% | £234.95 | £89.48 | £32,658.40 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 42.2% | £114.69 | £48.39 | £17,662.28 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.3% | £174.51 | £140.09 | £51,131.46 |
| P12 | 80.5% | £193.15 | £155.58 | £56,785.96 |
| P13 | 80.5% | £157.95 | £127.22 | £46,436.52 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.1% | £169.38 | £12.07 | £4,403.96 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`). Unchanged from yesterday except P20.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P20 | 10 (was 9) | 8 d | 7 n | Airbnb 100% |
| P04 | 7 | 6 d | 4 n | Airbnb 75.9% / Booking.com 24.1% |
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 71 | 34 d | 4 n | Airbnb 53.8% / Booking.com 43.0% / Direct 3.2% |
| P05 | 63 | 44 d | 4 n | Airbnb 100% |
| P06 | 34 | 14 d | 4 n | Airbnb 74.4% / Booking.com 25.6% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 80 | 31 d | 4 n | Booking.com 89.7% / Airbnb 10.3% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 20 Nov 07:18Z (`occ20/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (next 30) | £145 / 3 (yesterday £135) | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | **Day 6.** Policy: never fewer than 3 nights. |
| **P06** | **23 Nov (next 30), NEW** | £255 / 2 | The new 22 Nov block sits on one side and the 24–29 Nov arrival on the other. | Yesterday 22–23 Nov was a 2-night exact-only run. P06 is a policy intentional-block listing, so the block is not questioned. |
| P12 | 20 Nov (tonight) | £294 / 2 | 19 Nov lapsed unsold; the 21 Nov stay arrives. | Lapses tonight. |

**Checked and NOT orphans:**
- **P06 29 Nov: no longer an orphan.** The block now starts 6 Dec, so 29 Nov–5 Dec is a 7-night open run at min 3 (£2,624).
- **P20 22–24 Nov:** a 3-night run at min 2 (£290 / £283 / £276), so sellable (see the P20 section above).
- **P04 23–26 Dec:** these are the tail of the open run 6–26 Dec (21 n), which ends at the 27 Dec arrival.
  - 20–26 Dec is £1,216 (168/171/168/177/181/177/174; yesterday £1,233, −£17), min 3/3/3/4/4/4/4.
  - An arrival on 23 Dec must be exactly 23–27 Dec. Arrivals on 24, 25 or 26 Dec cannot meet min 4.
  - The nights are sellable only as part of a stay arriving on or before 23 Dec.
- **P04 around 4 Jan:** open from 4 Jan through 18 Jan at min 3, so no gap.

**Runs that sell only as one exact stay:**
- P05 7–8 Dec (£484 / £486) and 13–14 Dec (£515 / £500), min 2.
- P11 2–4 Dec (£215 / £230 / £277, min 3/2/2).

**Single nights at min 1 (bookable):**
- P04 2 Dec £451.
- P05 21 Dec £2,049 and 29 Dec £2,540.
- P11 8 Dec £311.
- P12 26 Nov £311.
- P13 27 Nov (£270 / £189) and 1 Dec (£229 / £161).
- P20 5 Dec £528 and 26 Dec £571 (Reyhan's +100% / min 1).

**Lapsed unsold, 19 Nov:** P11, P12 and P14. P20 19 Nov **sold** (the new stay).

### Gaps to fill (open nights next 30, 20 Nov–19 Dec, Smoobu 20 Nov 07:18Z)
- **P04 (16):** 24 Nov (orphan, £145); 2 Dec (£451, min 1); 6–19 Dec (£135–153, min 3). The run continues through 20–26 Dec (£1,216).
- **P05 (8):** 29 Nov–2 Dec (£500 / £484 / £482 / £501, min 3); 7–8 Dec; 13–14 Dec.
- **P06 (8):** 23 Nov (orphan); 29 Nov–5 Dec (reopened, £269–472, min 3).
- **P11 (15):**
  - 22–27 Nov (£195 / £190 / £207 / £205 / £226 / £262, min 3).
  - 2–4 Dec.
  - 8 Dec.
  - 14–18 Dec (£219 / £222 / £229 / £250 / £310). The darts nights 14–17 Dec average £230.00 (yesterday £229.00).
- **P12 (6):** 20 Nov (orphan, tonight); 26 Nov; 30 Nov–3 Dec (£268 / £282 / £285 / £297, min 2).
- **P13 (9):** 27 Nov and 1 Dec (min 1); 13–19 Dec (min 3; 3064856 £235–260, 3090701 £198–221).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (9):** 22–24 Nov (£290 / £283 / £276, min 2); 5 Dec (£528, min 1); 14–18 Dec (£298 / £301 / £301 / £305 / £316, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P20 delivery** (policy: the 20–22 Nov block is the delivery). A guest is now in 19–22 Nov (Airbnb, £714.55 room) after the block was shortened on 18 Nov 16:16:46Z. Does the delivery still happen? NOT CHECKED.
2. **P20 min stay** (policy: 3 nights from 25 Oct to 30 Nov). 22–24 Nov is set to min 2 in Smoobu and PriceLabs.
3. **P06 calendar** (intentional-block listing). The long block moved from 30 Nov to 6 Dec (19 Nov 11:55:35), and a 1-night block was added on 22 Nov (19 Nov 21:26). Together they reopen 29 Nov–5 Dec and leave 23 Nov as an orphan. Confirm this is intended.
4. **Carried from 19 Nov:** P04 min 2 on 18–19 Nov (sold); P13 1 Dec +25% (policy +50%); P11 darts −2%; P01 18–20 Dec block versus the policy gap block ending 17 Dec.

Data gaps:
- **P20 19–22 Nov:** the Smoobu/PriceLabs price live at booking (21:24) is NOT CHECKED. The 0.723–0.771× range brackets the two known states; Airbnb's breakdown of the discount was not seen.
- **P20 delivery with a guest in:** NOT CHECKED (for Corentin).
- **P20 20–21 Nov on Booking.com and on PriceLabs:** PriceLabs had not refreshed since 19 Nov 09:23Z and still shows both nights open. OTA availability is NOT CHECKED. Whether PriceLabs registered 19 Nov is NOT CHECKED (past date).
- **P06 block change 19 Nov:** the reason is UNKNOWN.
- **STLY:** none before 20 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20. P12's pace (−1.1%) moves with where the window falls.
- **P04 import batch** (no basePrice): it affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null.
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 20 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P08 and P10 forward occupancy is null (handback); P15–P19 are not mapped.
- **No price data past 18–19 Jan:** Smoobu rates were pulled to 19 Jan; PriceLabs files run 21 Nov–19 Jan.
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.

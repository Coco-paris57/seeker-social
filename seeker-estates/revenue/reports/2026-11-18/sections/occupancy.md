## Occupancy & performance

**Portfolio, last 30 nights (19 Oct–17 Nov 2026), the 13 units with Smoobu history:** 224 n, £38,640.95, occupancy 57.4%, ADR £172.50, RevPAR £99.08 (`reports/2026-11-18/kpi_pack.json` `portfolio_last30`; reproduced exactly from `data/snapshots/2026-11-18/reservations.csv` with `rm.metrics.performance`). Room revenue only (Smoobu basePrice, cleaning excluded). Yesterday (18 Oct–16 Nov) it was 230 n / 59.0% / £172.90 / £101.97. Reconciliation: 18 Oct leaves (−10 booked: P01, P02, P05, P08, P09, P10, P11, P12, P13, P20), 17 Nov enters (+4 booked: P01, P09, P10, P11): 230 − 10 + 4 = 224.

**Last 365 nights (18 Nov 2025–17 Nov 2026):** 2,224 n, £409,074.16, occupancy 46.9%, ADR £183.94, RevPAR £86.21 (kpi_pack `portfolio_last365`; yesterday 2,221 n / £408,621.00). Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (18 Nov–17 Dec): 140 of 238 non-blocked nights = 58.8%, £31,018.58 room revenue on the books.** Yesterday 144/243 = 59.3%.
**Booked next 60 (18 Nov–16 Jan): 193/418 = 46.2%, £49,395.89.** Yesterday 198/423 = 46.8%.
- **Source:** live Smoobu GET `/api/reservations` (842 records incl. cancellations and blocks; guest fields dropped) and `/api/rates`, pulled 18 Nov 07:19:57Z. Scratch copies: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ18/smoobu_res.json`, `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ18/smoobu_rates.json`. The 716 non-block records rebuilt from the pull match `data/snapshots/2026-11-18/reservations.csv` row for row (ref, dates, status, amount).
- **Check:** reservations and `/api/rates` agree on every unit-night in the next 60 (0 mismatches). P13 is read as one calendar.
- **Excluded:** P02, P03, P07 (blocked on purpose, policy); nights after handback (P08 fully out; P10 after 18 Nov, so tonight is its last; P09 after 26 Nov; P12 after 13 Dec; P01 after 20 Dec); blocked nights (P01 30 Nov–20 Dec; P06 from 30 Nov; P20 18–19 Nov).
- **Reconciling next 30 (144 → 140):** I recounted yesterday's window (17 Nov–16 Dec) on today's pull. It still gives exactly 144, and every unit matches yesterday's figure. Then:
  - New bookings: 0 in the window.
  - Cancellations: 0 in the window.
  - Window roll: 17 Nov leaves (−5 booked: P01, P04, P09, P10, P11) and 17 Dec enters (+1: P05).
  - Net: 144 − 5 + 1 = 140. Denominator: 243 − 11 + 6 = 238.
- **Reconciling next 60 (198 → 193):** recounting 17 Nov–15 Jan on today's pull gives 198 again. Then 198 − 5 (17 Nov) + 0 (16 Jan, nothing booked) = 193. Denominator: 423 − 11 + 6 = 418.
- **PriceLabs now agrees with Smoobu on P04 and P13.** kpi_pack `forward_occ_60` (PriceLabs, 19 Nov–17 Jan) is P04 23.7% (yesterday a stale 45.8%) and P13 57.6%. P04 `forward_occ_30` is 48.3%, which is 14 of 29 price nights.

### What changed overnight (17 Nov 07:18Z → 18 Nov 07:19Z)
There is no 17 Nov snapshot, so the baseline is the committed `reports/2026-11-17/` figures.
- **717 → 716 reservations is the window rolling. Nothing was deleted.** I pulled Smoobu twice this morning:
  - With yesterday's window (from 17 Nov 2025): 717 non-block records.
  - With today's window (from 18 Nov 2025): 716.
  - The only record in yesterday's window and not today's is a P12 Booking.com stay of 14–17 Nov 2025 (£391.68), departing 17 Nov 2025. It is outside the 365-day look-back now.
  - Also rolled out: a P02 "Blocked channel" block, 14–17 Nov 2025 (blocks are not counted in the 716).
- **New bookings: none.** The latest `created-at` is still P13 Booking.com 22–27 Dec (16 Nov 22:52, room £840.75). Nothing was created on 17 Nov or on 18 Nov up to 07:19Z.
- **Cancellations: none.** The latest cancellation is still P04 Booking.com 20 Dec–2 Jan (`modifiedAt` 16 Nov 15:37:54, £2,417.34).
- **Modified since yesterday's pull: 2 records, both Airbnb.** Only `modifiedAt` moved:
  - P05 18–22 Nov (4 n, room £1,835.10; modified 17 Nov 12:28:08).
  - P06 24–29 Nov (5 n, room £1,009.82; modified 17 Nov 13:16:56).
  - Dates and room amounts did not change. Yesterday's kpi_pack on-the-books (`pace_30` and `pace_90`) reproduces to the penny for all 13 units when recomputed on today's pull as of 17 Nov.
  - What was modified on Airbnb's side is NOT CHECKED.
- **Blocks:** no change. P20 is still blocked only 18–19 Nov, P06 from 30 Nov, P01 30 Nov–20 Dec and P12 from 14 Dec.
- **PriceLabs edits:** `get_user_logs` (listing, 17–18 Nov) returned 0 records. The price moves below come from PriceLabs' own daily repricing; they were not edits.
- **Open-night price and min-stay moves in Smoobu vs yesterday's section (same nights):**
  - P04: 18–19 Nov £167/£170 → £158/£159 (still min 2); 24 Nov £143 → £135 (min 3); 2 Dec £364 → £428 (min 1, policy-deprioritised).
  - P04 Christmas: 20 Dec–1 Jan, 13 nights, Smoobu £2,733 → £2,306. Nightly 162/162/159/169/173/167/165/175/192/193/194/201/194, the same as in PriceLabs. Min stays unchanged at 3/3/3/4/4/4/4/7/5/5/5/5/4.
  - P20: 20–24 Nov £300/299/254/257/239 → £317/331/278/274/268 (min 3/3/2/2/2); 5 Dec £277 → £265; 26 Dec £271 → £272.
  - P13: 13–16 Dec are no longer identical on the twins (3064856 £244/239/236/241, 3090701 £220/215/213/217).
  - P11 darts nights 14–17 Dec: £229/227/233/258, average £236.75 (yesterday £234.25).

### 7-day pickup, net of cancellations
Window: bookings made 12–18 Nov to 07:19Z (Smoobu `created-at`), cancellations by `modifiedAt`. Script: `occ18/pick_rise.py`.
- **Gross made:** 10 bookings / 49 n / £9,581.28.
- **Still confirmed:** 9 / 44 n / £8,734.18 (equals kpi_pack `pickup_7d` summed).
- **Cancelled in the window:** 3 bookings / 21 n / £3,944.84. These are P04 20 Dec–2 Jan £2,417.34, P11 26–29 Nov £680.40 and P13 18–23 Dec £847.10.
- **Net: +28 n / +£5,636.44.** Yesterday (11–17 Nov) it was +17 n / +£3,985.04.
- **Reconciliation:** nothing was made on 11 Nov, and nothing was made or cancelled on 17–18 Nov. Two cancellations dated 11 Nov dropped out of the window: P11 8–15 Dec (7 n / £1,012.86) and P20 21–25 Nov (4 n / £638.54).
  - 17 + 7 + 4 = 28.
  - £3,985.04 + £1,012.86 + £638.54 = £5,636.44.
  - The rise is entirely the window moving. **No real booking activity in the last ~32 hours** (last booking created 16 Nov 22:52).

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 1 / 4 / £489.59 (20–24 Nov) | 20 Dec–2 Jan 13 / £2,417.34 | **−9 / −£1,927.75** |
| P05 | 1 / 4 / £1,219.98 (13–17 Feb) | — | +4 / +£1,219.98 |
| P06 | 1 / 5 / £1,009.82 (24–29 Nov) | — | +5 / +£1,009.82 |
| P11 | 2 / 9 / £1,468.90 (28 Nov–2 Dec; 9–14 Dec) | 26–29 Nov 3 / £680.40 | +6 / +£788.50 (was −1 / −£224.36) |
| P12 | 1 / 7 / £1,432.42 (7–14 Dec) | — | +7 / +£1,432.42 |
| P13 | 3 / 13 / £2,156.79 (10–13 Dec £468.94; 18–23 Dec £847.10; 22–27 Dec £840.75) | 18–23 Dec 5 / £847.10 | +8 / +£1,309.69 |
| P20 | 1 / 7 / £1,803.78 (27 Dec–3 Jan) | — | +7 / +£1,803.78 (was +3 / +£1,165.24) |
| P01, P02, P07, P08, P09, P10, P14 | 0 | — | 0 |

### Pace vs STLY
Cancellations are excluded on both sides (`rm.metrics.on_the_books` on `reservations.csv`).
- **P12, handback-aware.** Stays 18 Nov–13 Dec 2026 as of 18 Nov 2026, against 18 Nov–13 Dec 2025 as of 18 Nov 2025: **18 n / £3,775.96 vs 22 n / £4,092.66 = −4 n / −£316.70 / −7.7%. That is within ±10%, so On track again** (yesterday −10.7%, Soft).
  - No P12 booking changed: on the books is unchanged at 18 n / £3,775.96.
  - The move is the STLY side losing 17 Nov 2025, one night of a 17–20 Nov 2025 stay worth £410.79 (£136.93/n): £4,229.59 − £136.93 = £4,092.66.
  - **This is fragile.** The class hinges on the window position, not on demand. The night of 18 Nov 2025 is also booked on the STLY side, while 18–20 Nov 2026 are open (£225/234/299, min 2).
  - kpi_pack `pace_30` (18 Nov–17 Dec, not handback-aware) reads −7 n / −16.4% (£3,775.96 vs 25 n / £4,517.99). The difference is STLY 14–17 Dec 2025, after the handback.
  - kpi_pack `pace_90` reads −23 n / −52.9% (vs 41 n / £8,008.87). Nothing after 13 Dec is inventory, so pace to handback is the relevant figure.
- **P02:** kpi_pack 30-day 0 vs STLY 12 n / £1,227.75; 90-day 0 vs 20 n / £2,016.52. Blocked on purpose, so not assessed.
- **Every other unit: pace UNKNOWN (no STLY).** Earliest confirmed `booked_on` per unit:

| Earliest booked_on | Units |
|---|---|
| 9 Dec 2025 | P11 |
| 11 Dec 2025 | P13 |
| 19 Feb 2026 | P05 |
| 27 Apr 2026 | P07 |
| 30 Apr 2026 | P06 |
| 14 May 2026 | P08, P09, P10 |
| 18 May 2026 | P01 |
| 8 Jul 2026 | P14 |
| 10 Oct 2026 | P20 |
| 20 Oct 2026 | P04 |

  None of them has bookings made on or before 18 Nov 2025, so STLY is 0.
- **On the books, stays 18 Nov–17 Dec** (kpi_pack `pace_30`):

| Ref | Nights | Revenue |
|---|---|---|
| P01 | 12 | £1,825.56 |
| P05 | 22 | £11,324.04 |
| P06 | 9 | £1,866.61 |
| P09 | 9 | £924.38 |
| P10 | 1 | £105.96 |
| P11 | 14 | £2,555.08 |
| P12 | 18 | £3,775.96 |
| P13 | 23 | £3,511.54 |
| P20 | 18 | £3,236.90 |
| P04 | 14 | £1,892.54 (recomputed; the pack is empty) |

- **On the books, 90-day window** (kpi_pack `pace_90`):

| Ref | Nights | Revenue |
|---|---|---|
| P05 | 43 | £22,496.28 |
| P11 | 26 | £5,896.13 |
| P13 | 35 | £6,118.29 |
| P20 | 32 | £6,468.68 |

### 18 Oct base rises: running effect (same method as yesterday)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 18 Nov 07:19Z pull (`occ18/pick_rise.py`).

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,196.31 including P06. Unchanged for a second day.**
- **Like-for-like** (excluding both P06 stays on reopened nights, 18–22 Nov £856.79 and 24–29 Nov £1,009.82): **+25 n / +£7,329.70, also unchanged.**
- Made: 28 / 108 n / £23,831.63. Cancelled: 13 / 74 n / £14,635.32.
- No raised unit had a booking or a cancellation since 13 Nov (P06 24–29 Nov, made 13 Nov 22:20).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | — | +16 / +£6,135.19 |
| P06 | 4 / 15 / £3,212.38 | — | +15 / +£3,212.38 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 8 / 29 / £5,300.40 | 5 / 34 / £6,867.17 | −5 / −£1,566.77 |
| P12 | 9 / 39 / £7,846.86 | 6 / 28 / £6,186.65 | +11 / +£1,660.21 |

**Comparison groups (unchanged):**
- Unraised (P02, P08, P10, P14, P20): +51 n / +£9,443.82.
- P13: +27 n / +£4,704.65.
- P04: +37 n / +£2,115.38 on yesterday's method, which counts the six import-batch records that have no basePrice element at £0 room.
  - **Correction to yesterday's note:** with `reservations.csv` `total_gbp` for those records (the Smoobu `price`, which may include cleaning), P04 is **+37 n / +£4,602.78**, not £2,115.38. Yesterday's "+£4,532.72 → +£2,115.38" does not reproduce.
  - Either way the P04 batch is an import, not post-rise pickup, so the P04 group stays unclean. The raised-group figures are not affected.

**What this means:** nothing has moved in the raised group since 13 Nov. Caveats as before: the 24 Oct and 12 Nov Booking.com markup changes, promotions, Reyhan's overrides and the P06 reopening cannot be separated out. The sample is 1–9 bookings per unit.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 19 Oct–17 Nov.
- Fwd occ30: Smoobu 18 Nov 07:19Z, 18 Nov–17 Dec, handback-aware (kpi_pack `market_occ_30` in brackets).
- Pace30: as above.
- Pickup 7d: made 12–18 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £156.20 | £156.20 | 100% 12/12 non-blocked (34%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights to handback) |
| P02 | Ladbroke Grove | 30.0% | £98.10 | £29.43 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (54%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack last30 null† | UNKNOWN | UNKNOWN | **46.7%** 14/30 (23%) | UNKNOWN: no STLY | **−9 / −£1,927.75** | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £376.96 | £289.01 | 73.3% 22/30 (46%) | UNKNOWN: no STLY | +4 / +£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £196.73 | £131.15 | 75.0% 9/12 non-blocked (51%) | UNKNOWN: no STLY | +5 / +£1,009.82 | Unclassifiable (60–85%, no STLY) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (28%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 73.3% | £139.81 | £102.53 | handed back after 13 Nov (56%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £113.77 | £56.88 | 100% 9/9 to 26 Nov (40%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 100.0% | £105.96 | £105.96 | 100% 1/1, tonight last (32%) | UNKNOWN: no STLY | 0 | **Compressed** (handed back after tonight) |
| P11 | Camden | 70.0% | £180.25 | £126.17 | **46.7%** 14/30 (50%) | UNKNOWN: no STLY | +6 / +£788.50 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 70.0% | £159.40 | £111.58 | 69.2% 18/26 to handback (42%) | **−4 n / −£316.70 / −7.7%** handback-aware (pack −16.4%) | +7 / +£1,432.42 | **On track** (was Soft; see pace) |
| P13 | Shepherd's Bush (one flat) | 56.7% | £152.85 | £86.61 | 76.7% 23/30 (47%) | UNKNOWN: no STLY | +8 / +£1,309.69 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (48%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 53.3% | £173.44* | £92.50* | 64.3% 18/28 non-blocked (38%) | UNKNOWN: no STLY | +7 / +£1,803.78 | Unclassifiable (60–85%, no STLY) |

† P04 is in Smoobu only from 20 Oct. Recomputing 20 Oct–17 Nov from `reservations.csv` gives 19 of 29 n = 65.5%, £2,271.04, ADR £119.53, RevPAR £78.31. These figures mix bases: two import-batch stays carry Smoobu `price` because they have no basePrice element. Shown for reference only; not a pack figure.
\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`). 19–22 Oct is inside this window, so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 1: P12.
- Soft 3: P04, P11, P14.
- Unclassifiable 9: P05, P06, P13, P20, P15–P19.
- Not classified 4: P02, P03, P07 (policy blocks); P08 (handed back).
- **Changed since yesterday: P12, Soft → On track.** This comes from the window roll only.

**Next 60 (18 Nov–16 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share |
|---|---|---|
| P01 | 12/12 | 100% |
| P04 | 14/60 | 23.3% |
| P05 | 37/60 | 61.7% |
| P06 | 9/12 | 75.0% |
| P09 | 9/9 | 100% |
| P10 | 1/1 | 100% |
| P11 | 26/60 | 43.3% |
| P12 | 18/26 | 69.2% |
| P13 | 35/60 | 58.3% |
| P14 | 0/60 | 0% |
| P20 | 32/58 | 55.2% |

Comparisons:
- kpi_pack `forward_occ_60` (PriceLabs, 19 Nov–17 Jan): P04 23.7%, P05 61.0%, P11 44.1%, P13 57.6%, P20 54.2%.
- kpi_pack `market_occ_60`: P04 19%, P05 39%, P11 38%, P13 37%, P20 30%.

**Last 365 nights** (kpi_pack `last365`, 18 Nov 2025–17 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 43.3% | £175.09 | £75.79 | £27,663.97 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 60.3% | £373.04 | £224.85 | £82,069.61 |
| P06 | 37.5% | £235.26 | £88.30 | £32,230.00 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 41.6% | £114.85 | £47.83 | £17,456.86 |
| P10 | 42.5% | £113.49 | £48.19 | £17,590.59 |
| P11 | 80.3% | £174.51 | £140.09 | £51,131.46 |
| P12 | 81.1% | £192.77 | £156.33 | £57,059.82 |
| P13 | 80.0% | £158.16 | £126.53 | £46,182.35 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 6.8% | £166.63 | £11.41 | £4,165.78 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings in the 365-back / 180-forward pull). Unchanged from yesterday except P12, which has 80 bookings (was 81) after the 14–17 Nov 2025 stay rolled out.

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
| P12 | 80 | 31 d | 4 n | Booking.com 89.7%, Airbnb 10.3% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3%, Airbnb 46.9%, Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 9 | 8 d | 7 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
Source: Smoobu `/api/rates`, 18 Nov 07:19Z. P13 is read as one calendar and handbacks are respected (`occ18/an.py` plus run scan).

| Ref | Night | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P20 | 5 Dec (next 30) | £265 / 3 | The 25 Nov–5 Dec stay checks out and the 6 Dec stay arrives. | **Not fixed, day 10.** PriceLabs `available` False (prices.csv). |
| P04 | 24 Nov (next 30) | £135 / 3 | The 20–24 Nov stay checks out and the 25 Nov stay arrives. | Day 4. Policy: never fewer than 3 nights. PriceLabs `available` False. |
| P06 | 29 Nov (next 30) | £254 / 4 | The 24–29 Nov stay checks out and the block starts 30 Nov. | Not changed. |
| P20 | 26 Dec (next 60) | £272 / 4 | The 19–26 Dec stay checks out and the 27 Dec–3 Jan stay arrives. | **Not fixed, day 3.** PriceLabs `available` False. |

- **New: none. Lapsed: the three 17 Nov single nights** (P05, P06, P20) passed unsold. Smoobu has them at £373, £230 and £208 per yesterday's section. That is £811 of open inventory; it is not demand evidence.
- **Re-checked:**
  - **P04 20 Dec–1 Jan: no orphan.** It sits inside one open run from 6 Dec to at least 16 Jan (42 nights, min 3–7). It is open in both Smoobu and PriceLabs.
  - **P13 Christmas: no orphan.** 13–21 Dec is a 9-night open run at min 3, then booked 22 Dec–2 Jan, then open from 3 Jan at min 3.
- **Two-night runs that sell only as one exact stay (not orphans):**
  - P04 18–19 Nov (£158 / £159, min 2; tonight is the first night). At the policy's 3 nights this would be an orphan run; see Conflicts.
  - P11 18–19 Nov (£164 / £190, min 2).
  - P05 7–8 Dec and 13–14 Dec (min 2).
  - P06 22–23 Nov (£261 / £247, min 2).
- **Single nights at min 1 (bookable, not orphans):**
  - P04 2 Dec £428 (policy-deprioritised).
  - P05 21 Dec £2,039 and 29 Dec £2,569.
  - P11 8 Dec £288.
  - P12 26 Nov £294.
  - P13 27 Nov (£304 / £213) and 1 Dec (£278 / £194; policy intentional override).

### Gaps to fill (open nights next 30, 18 Nov–17 Dec, Smoobu 18 Nov 07:19Z)
- **P04 (16):**
  - 18–19 Nov (£158 / £159, min 2).
  - 24 Nov (orphan, £135).
  - 2 Dec (£428, min 1, policy).
  - 6–17 Dec (from £143, min 3). The run continues through Christmas–NYE (20 Dec–1 Jan £2,306 total) to at least 16 Jan.
- **P05 (8):** 29 Nov–2 Dec (£505/491/493/516, min 3); 7–8 Dec (£487 / £486, min 2); 13–14 Dec (£516 / £500, min 2).
- **P06 (3):** 22–23 Nov (£261 / £247, min 2); 29 Nov (orphan, £254).
- **P11 (16):**
  - 18–19 Nov.
  - 22–27 Nov (£196–267, min 3).
  - 2–4 Dec (£211 / £273 / £334, min 3/2/2).
  - 8 Dec (£288, min 1).
  - 14–17 Dec (£229 / £227 / £233 / £258). The run continues to 18 Dec at £314.
- **P12 (8):** 18–20 Nov (£225 / £234 / £299, min 2); 26 Nov (£294, min 1); 30 Nov–3 Dec (£244 / £268 / £263 / £268, min 2).
- **P13 (7):** 27 Nov and 1 Dec (min 1); 13–17 Dec (min 3). The run continues to 21 Dec.
- **P14 (30):** every night, at £450 / min 3 on 18 Nov (special setup, numbers only).
- **P20 (10):** 20–24 Nov (£317 / £331 / £278 / £274 / £268, min 3/3/2/2/2); 5 Dec (orphan); 14–17 Dec (£297 / £300 / £302 / £332, min 3). The run continues to 18 Dec.
- **P01, P09, P10:** none. P08 is handed back.

### Conflicts for Corentin
These are Smoobu/PriceLabs states that conflict with standing decisions. They are "confirm or revert" items, not new proposals. There were no PriceLabs edits on 17–18 Nov.
1. **P04 min stay** (policy: never fewer than 3 nights). 18–19 Nov is still min 2 in Smoobu and PriceLabs. 18 Nov is tonight.
2. **P20 delivery** (policy block 20–22 Nov). Smoobu blocks only 18–19 Nov; 20–24 Nov are open (£268–331). 20 Nov is in 2 days. Also 22–24 Nov is min 2, against policy `min_stay` "3 nights from 25 Oct to 30 Nov".
3. **P11 darts nights** (21 Oct: average above £300/night). Open 14–17 Dec average £236.75.
4. **P01 18–20 Dec.** The gap block still runs to the 20 Dec handback; policy says the gap block runs to 17 Dec.
5. **P06 (intentional-block listing).** 22–23 Nov are open and 29 Nov is an orphan at min 4. Reason UNKNOWN.
6. **Resolved:** the P13 twins are no longer identical on 13–16 Dec (yesterday's item 2).

Data gaps:
- **17 Nov snapshot directory is gone.** The overnight diff relies on today's two-window Smoobu pull plus the committed `reports/2026-11-17/` figures. A field-level diff of the 2 modified Airbnb records (P05 18–22 Nov, P06 24–29 Nov) is NOT POSSIBLE: dates and room amounts match yesterday's totals, but other fields are unknown.
- **P04 cancellation** (20 Dec–2 Jan): who cancelled and why is NOT CHECKED.
- **P04 channel state:** whether 20 Dec–1 Jan is open on the Booking.com extranet and on unsynced Airbnb 1455876748739910219 is NOT CHECKED here.
- **P04 import batch** (6 records, 20 Oct): no Smoobu basePrice element. Room revenue is unknown; `reservations.csv` carries Smoobu `price`. This affects P04 last30 (null in the pack), pace and the base-rise comparison group.
- **STLY:** none before 18 Nov 2025 for any unit except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P12 pace is fragile.** It sits at −7.7% and moves by window position. The pack's own `pace_30` (−16.4%) is not handback-aware.
- **Market, comps and channel checks:** kpi_pack `missing` lists market, comps and channel_checks (the 18 Nov CSVs start empty), so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 is not in Smoobu; P04 last30, last365 and pace are null; P08 and P10 forward occupancy are null (handback); P15–P19 are not mapped.
- **No price data past 16 Jan** (Smoobu rates pulled for 60 days; PriceLabs raw files run 19 Nov–17 Jan).
- **Revenue scope:** room only (cleaning excluded). P20 18–22 Oct was paid separately and is not in Smoobu.
- **Dispatcher note mismatch (minor):** P05 21 Dec / 29 Dec quoted as £2,054 / £2,563. Those are PriceLabs `user_price`; the pushed price (PriceLabs `price` = Smoobu) is £2,039 / £2,569.

## Occupancy & performance

**Portfolio, last 30 nights (25 Oct–23 Nov 2026), the 14 units with Smoobu history:** 225 n, £38,983.58, occupancy 53.6%, ADR £173.26, RevPAR £92.82 (`reports/2026-11-24/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (24 Oct–22 Nov) it was 231 n / £39,846.26.
  - 24 Oct leaves: −12 booked (P01, P02, P04, P05, P06, P08, P09, P10, P11, P12, P13, P20; £2,190.95).
  - 23 Nov enters: +6 booked (P01, P04, P05, P09, P12, P13; £1,328.26). P06, P11, P14 and P20 were open on 23 Nov and lapsed unsold.
  - 231 − 12 + 6 = 225. £39,846.26 − £2,190.95 + £1,328.26 = £38,983.57 (1p rounding against the pack). Per-night figures are pro rata, from `data/snapshots/2026-11-24/reservations.csv`.

**Last 365 nights (24 Nov 2025–23 Nov 2026):** 2,253 n, £416,089.04, occupancy 47.5%, ADR £184.68, RevPAR £87.69 (kpi_pack `portfolio_last365`). Yesterday it was 2,249 n / £415,057.89.
- 23 Nov 2025 leaves −1 (P12, £174.72). 23 Nov 2026 enters +5 (£1,205.86; P04's £122.40 is excluded because P04 last365 is null). 2,249 − 1 + 5 = 2,253; £415,057.89 − £174.72 + £1,205.86 = £416,089.03 (1p rounding).
- Most units' Smoobu history starts in 2026, so this understates a full year.

**Booked next 30 (24 Nov–23 Dec): 124 of 221 non-blocked nights = 56.1%, £29,412.28 room revenue on the books.** Yesterday it was 130/225 = 57.8%, £30,399.33.
**Booked next 60 (24 Nov–22 Jan): 169/383 = 44.1%, £43,639.04.** Yesterday it was 178/388 = 45.9%, £45,645.09.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 24 Nov 07:19:55Z. Scratch copies and scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ24/` (`smoobu_res.json`, `smoobu_rates.json`, `an.py`, `recon.py`, `gaps.py`, `pick_rise.py`).
  - **Pagination, same fault as on previous days:** the full pull returned 863 rows / 862 unique ids and dropped P12 1–5 Jun 2026. A narrow pull (20 May–15 Jun) recovered it.
  - The 723 non-block reservations on mapped units match `data/snapshots/2026-11-24/reservations.csv` row for row (ref, dates, status, amount). The 724th non-block record is the Scott Ellis Gardens stay (unmapped, below).
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches.
  - P13 is read as one calendar. Scott Ellis Gardens is not counted.
- **Excluded:**
  - P02, P03 and P07: blocked on purpose (policy).
  - Handbacks (policy `handbacks`): P08 and P10 fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Blocks: P01 30 Nov–20 Dec; P06 from 6 Dec; P11 from 5 Jan 2027 (still present; not in policy, see Conflicts).
- **Reconciling next 30 (130/225 → 124/221):**
  - 23 Nov leaves: −6 booked (P01, P04, P05, P09, P12, P13; £1,328.26), −10 inventory (P06, P11, P14 and P20 were also open).
  - **P12 Booking.com 4–7 Dec cancelled: −3 booked, 0 inventory** (4–6 Dec were already counted as inventory; they are before the 13 Dec handback, so they stay in). −£677.79.
  - 23 Dec enters: +3 booked (P05 £646.85, P13 £168.15, P20 £204.00 = £1,019.00), +6 inventory (P04, P11 and P14 also open).
  - No new bookings and no other state change on any unit-night (night-by-night diff of 24 Nov–21 Jan against yesterday's pull: only P12 4, 5, 6 Dec changed, B → O).
  - 130 − 6 − 3 + 3 = **124**; 225 − 10 + 6 = **221**. £30,399.33 − £1,328.26 − £677.79 + £1,019.00 = **£29,412.28** (exact).
- **Reconciling next 60 (178/388 → 169/383):**
  - 23 Nov leaves: −6 booked / −10 inventory / −£1,328.26.
  - P12 4–7 Dec cancelled: −3 booked / −£677.79.
  - 22 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20).
  - 178 − 6 − 3 = **169**; 388 − 10 + 5 = **383**; £45,645.09 − £1,328.26 − £677.79 = **£43,639.04** (exact).
- PriceLabs `forward_occ_30` in kpi_pack (P04 48.3%, P06 34.5%, P11 51.7%, P12 57.9%, P13 62.1%, P20 79.3%) uses a different window and denominator. Smoobu is the truth.

### What changed overnight (23 Nov 07:20Z → 24 Nov 07:20Z)
- **Non-block reservations: 723 on mapped units, unchanged in count. No new booking.** One status change:
- **CANCELLED: P12 Mile End Booking.com 4–7 Dec (3 n).** Made 5 Nov 06:48, cancelled 23 Nov 21:46 (Smoobu `modifiedAt`), 11 days before arrival.
  - Room £677.79 = **£225.93/n**; commission £124.17; cleaning £150; VAT element £112.97; Smoobu total £827.79.
  - 4–6 Dec are now **open in Smoobu at £312 / £332 / £271 = £915, min 2** (24 Nov 07:20Z). Yesterday, while booked, Smoobu showed £322 / £343 / £277 = £942. Room paid was 0.72× yesterday's Smoobu and 0.74× today's; the Smoobu price live on 5 Nov and the rate plan sold are NOT CHECKED (channel agent).
  - **Handback-aware:** P12's last night is 13 Dec (policy `handbacks.P12`; Smoobu "Blocked channel" from 14 Dec still present). 4–6 Dec are before it, so they are inventory.
  - The reopened nights join 30 Nov–3 Dec: **P12 now has a 7-night open run 30 Nov–6 Dec at min 2, £242 / £241 / £256 / £275 / £312 / £332 / £271 = £1,929.** Not an orphan.
- **Other Smoobu record changes made after yesterday's 07:20Z pull (blocks only, no forward effect on mapped units):**
  - P11: a block 18–20 Nov added (past) and the 31 Oct–3 Nov block modified (past), both 23 Nov 10:54; a 22–27 Nov block created at 10:54 and cancelled at 10:55 (net nothing). The P11 27–30 Nov booking was modified at 15:21 with the amount unchanged (£687.73 total).
  - Scott Ellis Gardens blocks rearranged at 23 Nov 10:58–10:59 (below).
- **Smoobu price moves on P12 open nights** (for the record): 26 Nov £294 (yesterday £307); 30 Nov–3 Dec £242 / £241 / £256 / £275 (yesterday £254 / £270 / £276 / £290).

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993), apartment level
- **Reservations: 1** (unchanged): Airbnb 21–26 Dec 2026, 5 n, room £1,481.76, made 22 Nov. No new reservation, no cancellation.
- **Blocks: 4 active, 4 cancelled.** Changed 23 Nov 10:58–10:59 (after yesterday's pull): the 20–29 Nov block now runs **20 Nov–10 Dec**; the 3–4 Dec, 8–9 Dec, 15–16 Dec and 5–6 Jan blocks were cancelled; new blocks 15–16 Dec, 6–7 Jan and 12–13 Jan.
- **Next 30 (24 Nov–23 Dec): 3 booked, 17 blocked, 10 open** (10–14 Dec, 16–20 Dec). **Next 60: 5 booked, 19 blocked, 36 open.** Rates and reservations agree.
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any portfolio figure here.

### 7-day pickup, net of cancellations
- **Window:** bookings made 18–24 Nov to 07:20Z (Smoobu `created-at`); cancellations counted by `modifiedAt`. Script: `occ24/pick_rise.py`.
- **Gross made:** 9 bookings / 30 n / £5,035.83. **Still confirmed:** 7 / 26 n / £4,354.38.
- **Cancelled in the window:** 5 / 15 n / £3,184.51: P05 13–17 Feb £1,219.98 (21 Nov); P11 28 Nov–2 Dec £605.29 (20 Nov); P20 5 Dec £343.33 (20 Nov); P04 17–20 Dec £338.12 (21 Nov); **P12 4–7 Dec £677.79 (23 Nov 21:46, new)**.
- **Net: +15 n / +£1,851.32.** Yesterday it was +18 n / +£2,529.11.
- **Reconciliation:** 17 Nov leaves the window with nothing (no booking made and no cancellation on 17 Nov). Overnight: no new bookings; P12 cancellation −3 n / −£677.79. 18 − 3 = **+15**; £2,529.11 − £677.79 = **+£1,851.32**.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 4 / 17 / £2,157.36 (18–20 Nov £254.15; 10–14 Dec £488.35 Booking.com; 17–20 Dec £338.12, cancelled; 27 Dec–4 Jan £1,076.74) | 3 / £338.12 | +14 / +£1,819.24 |
| P05 | 0 | 4 / £1,219.98 | −4 / −£1,219.98 |
| P06 | 2 / 6 / £1,281.86 (29 Nov–2 Dec £513.04; 3–6 Dec £768.82, both Airbnb) | — | +6 / +£1,281.86 |
| P11 | 1 / 3 / £538.73 (27–30 Nov) | 4 / £605.29 | −1 / −£66.56 |
| **P12** | 0 | **3 / £677.79** | **−3 / −£677.79** (was 0) |
| P20 | 2 / 4 / £1,057.88 (19–22 Nov £714.55; 5 Dec £343.33, cancelled) | 1 / £343.33 | +3 / +£714.55 |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` (gross, confirmed only, not net of cancellations) matches the made side: P04 3 / 14 / £1,819.24, P06 2 / 6 / £1,281.86, P11 1 / 3 / £538.73, P20 1 / 3 / £714.55; all others 0.

### Pace vs STLY
Cancellations are excluded on both sides (same method as `rm.metrics.on_the_books`, on `occ24/rows.json` = `data/snapshots/2026-11-24/reservations.csv`).
- **P12, handback-aware.** Stays 24 Nov–13 Dec 2026 as of 24 Nov 2026, against 24 Nov–13 Dec 2025 as of 24 Nov 2025: **12 n / £2,490.75 vs 17 n / £3,294.64 = −5 n / −£803.89 / −24.4%. Behind STLY by more than 10%: Soft** (was On track, −2 n / −£98.34 / −2.8%).
  - Reconciliation: 23 Nov 2026 leaves OTB (booked, −1 n / −£202.47); 23 Nov 2025 leaves STLY (−1 n / −£174.72); the 4–7 Dec cancellation removes 3 n / £677.79 from OTB. OTB 16 − 1 − 3 = 12, £3,371.02 − £202.47 − £677.79 = £2,490.76 (1p); STLY 18 − 1 = 17, £3,469.36 − £174.72 = £3,294.64.
  - kpi_pack `pace_30` (24 Nov–23 Dec, not handback-aware): 12 n / £2,490.75 vs 23 n / £4,419.64 = −11 n / −43.6% (yesterday −22.7%).
  - kpi_pack `pace_90`: 12 n vs 55 n / £9,814.10 = −43 n / −74.6%. Nothing after 13 Dec is inventory, so this is not a demand signal.
- **P02:** kpi_pack 30-day 0 vs STLY 13 n / £1,389.31; 90-day 0 vs 27 n / £2,859.30. Blocked on purpose, so not assessed.
- **All other units: UNKNOWN (no STLY).** No booking made on or before 24 Nov 2025 exists for any unit except P02 and P12.

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 24 Nov 07:20Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +32 n / +£8,513.84 including P06; +17 n / +£5,365.37 like-for-like.** Yesterday it was +35 / +£9,191.63 and +20 / +£6,043.16.
- **The whole move is P12: −3 n / −£677.79.** The cancelled 4–7 Dec stay was made 5 Nov (after the rise), so it was already in "made"; it now also sits in "cancelled" and nets to zero. **P12 goes from +11 / +£1,660.21 to +8 / +£982.42.**
- Check: £9,191.63 − £677.79 = £8,513.84; £6,043.16 − £677.79 = £5,365.37.
- Like-for-like still excludes the 4 P06 stays on the reopened nights (15 n / £3,148.47); P06 like-for-like stays +6 / +£1,345.77.
- Made: 31 / 117 n / £25,652.22 (unchanged). Cancelled: 16 / 85 n / £17,138.38 (was 15 / 82 n / £16,460.59).

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| P06 | 6 / 21 / £4,494.24 | — | +21 / +£4,494.24 (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 |
| P11 | 9 / 32 / £5,839.13 | 6 / 38 / £7,472.46 | −6 / −£1,633.33 |
| **P12** | 9 / 39 / £7,846.86 | **7 / 31 / £6,864.44** (was 6 / 28 / £6,186.65) | **+8 / +£982.42** (was +11 / +£1,660.21) |

**Comparison groups (unchanged overnight):**
- Unraised (P02, P08, P10, P14, P20): +54 n / +£10,158.37.
- P13: +27 n / +£4,704.65.
- P04: +51 n / +£6,422.02 using `total_gbp`; counting import-batch records without a basePrice as £0 gives +£3,934.62.
- **Caveats as before:** the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopening cannot be separated out; the sample is 1–9 bookings per unit; a cancellation is not evidence about price.

### Per-property table
**Column sources:**
- Occ30, ADR30, RevPAR30: kpi_pack `last30`, 25 Oct–23 Nov.
- Fwd occ30: Smoobu 24 Nov 07:20Z, 24 Nov–23 Dec, non-blocked and handback-aware. kpi_pack `market_occ_30` is in brackets.
- Pace30: see above.
- Pickup 7d: made 18–24 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £154.17 | £154.17 | 100% 6/6 non-blocked (35%) | UNKNOWN: no STLY | 0 | **Compressed** (0 open nights before the block/handback) |
| P02 | Ladbroke Grove | 10.0% | £104.31 | £10.43 | all blocked (52%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £120.65† | £88.47† | **46.7%** 14/30 (23%) | UNKNOWN: no STLY | +14 / +£1,819.24 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 76.7% | £407.60 | £312.49 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | −4 / −£1,219.98 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £198.03 | £138.62 | **91.7%** 11/12 non-blocked (52%) | UNKNOWN: no STLY | +6 / +£1,281.86 | **Compressed** (was Unclassifiable at 84.6%; the rise is only the lapsed open 23 Nov leaving the denominator; intentional-block listing, 1 open night) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (26%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 53.3% | £133.43 | £71.16 | handed back after 13 Nov (56%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 50.0% | £102.69 | £51.34 | 100% 3/3 to 26 Nov (41%) | UNKNOWN: no STLY | 0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 83.3% | £105.96 | £88.30 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 63.3% | £183.51 | £116.22 | **50.0%** 15/30 (50%) | UNKNOWN: no STLY | −1 / −£66.56 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 66.7% | £153.22 | £102.14 | **60.0%** 12/20 to handback (43%) | **−5 n / −£803.89 / −24.4%** handback-aware (pack −43.6%) | **−3 / −£677.79** | **Soft** (pace > 10% behind; **was On track**) |
| P13 | Shepherd's Bush (one flat) | 60.0% | £138.59 | £83.15 | 63.3% 19/30 (46%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (48%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 43.3% | £191.39 | £82.94 | 76.7% 23/30 (38%) | UNKNOWN: no STLY | +3 / +£714.55 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 3 (P01, P06, P09); On track 0; Soft 4 (P04, P11, P12, P14); Unclassifiable 8 (P05, P13, P20, P15–P19); Not classified 5 (P02, P03, P07 policy blocks; P08, P10 handed back).
- **Two class changes:** **P12 On track → Soft** (the 4–7 Dec cancellation; fwd30 76.2% → 60.0%, pace −2.8% → −24.4%). **P06 Unclassifiable → Compressed** (84.6% → 91.7%; mechanical: 23 Nov lapsed unsold and left the window, no new booking).
- P04 50.0% → 46.7% (23 Nov booked left; 23 Dec open entered). P11 50.0% → 50.0%. P20 73.3% → 76.7% (23 Nov lapsed open left; 23 Dec booked entered). P05 70.0% and P13 63.3% unchanged. P01 7/7 → 6/6; P09 4/4 → 3/3.

**Next 60 (24 Nov–22 Jan), Smoobu, handback-aware:**

| Ref | Booked | Share | Revenue |
|---|---|---|---|
| P01 | 6/6 | 100% | £912.78 |
| P04 | 22/60 | 36.7% | £2,968.04 |
| P05 | 31/60 | 51.7% | £17,443.74 |
| P06 | 11/12 | 91.7% | £2,291.68 |
| P09 | 3/3 | 100% | £308.12 |
| P11 | 23/42 | 54.8% | £5,399.46 (denominator cut by the block from 5 Jan) |
| P12 | 12/20 | 60.0% | £2,490.75 (was 16/21, £3,371.02) |
| P13 | 29/60 | 48.3% | £5,355.78 |
| P14 | 0/60 | 0% | £0 |
| P20 | 32/60 | 53.3% | £6,468.68 |

**Last 365 nights** (kpi_pack `last365`, 24 Nov 2025–23 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 44.9% | £174.25 | £78.29 | £28,576.75 |
| P02 | 78.9% | £128.98 | £101.77 | £37,147.48 |
| P05 | 61.9% | £376.76 | £233.28 | £85,147.65 |
| P06 | 38.6% | £234.66 | £90.65 | £33,086.79 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 43.3% | £114.39 | £49.52 | £18,073.11 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 80.8% | £174.78 | £141.26 | £51,561.57 |
| P12 | 80.5% | £193.43 | £155.81 | £56,869.22 |
| P13 | 81.6% | £157.53 | £128.62 | £46,944.86 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 7.7% | £174.30 | £13.37 | £4,880.33 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings). Change since yesterday: **P12 79 → 78 bookings** (the cancellation); median lead 31 d, median stay 4 n, Booking.com share 89.6% → 89.5%. All other units unchanged.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 70 | 36 d | 4 n | Airbnb 54.2% / Booking.com 42.6% / Direct 3.2% |
| P04 | 8 | 8 d | 4 n | Airbnb 66.5% / Booking.com 33.5% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 36 | 13 d | 4 n | Airbnb 75.3% / Booking.com 24.7% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 73 | 28 d | 4 n | Booking.com 54.6% / Airbnb 43.5% / Agoda 1.9% |
| P12 | 78 | 31 d | 4 n | Booking.com 89.5% / Airbnb 10.5% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 10 | 8 d | 7 n | Airbnb 100% |

**Booking.com bookings made since 24 Oct** (Smoobu `created-at`, all units): raw 29 gross / 16 confirmed / 13 cancelled; counting the three identical P04 20–23 Nov cancellations (made 26 Oct, £484.82 total each) once gives **27 / 16 / 11**, as in the brief. Yesterday 27 / 17 / 10; the P12 4–7 Dec cancellation is the only change.

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 24 Nov 07:20Z (`occ24/gaps.py`). P13 is read as one calendar and handbacks are respected.
- **Definition:** an orphan is an open run where no arrival night's minimum stay fits before the next booking or block.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| P04 | 24 Nov (tonight, next 30) | £136 / 3 | Between the 23–24 Nov departure and the 25 Nov arrival. | **Day 10. Lapses tonight unsold.** Policy: never fewer than 3 nights, so it was never sellable. |
| **P20** | **24 Nov (tonight), NEW** | £222 / 2 | Single night before the 25 Nov arrival; 23 Nov lapsed unsold, leaving 1 night at min 2. | Lapses tonight. |
| P11 | 3–4 Jan (next 60) | £151 / £163, min 3 | 2 nights between the stay ending 3 Jan and the block from 5 Jan. | Day 2. Unsellable while min is 3 and the block stands. |

**Checked and NOT orphans:**
- **P12 4–7 Dec (reopened):** joins 30 Nov–3 Dec into a **7-night run 30 Nov–6 Dec, min 2, £1,929** between the 27–30 Nov and 7–14 Dec stays. Sellable; not an orphan.
- **P12 26 Nov:** single night, **£294, min 1** (yesterday £307). Bookable.
- **P06 2 Dec:** single night, **£363, min 1** (yesterday £349). Bookable. P06 is a policy intentional-block listing. **P06 23 Nov lapsed unsold.**
- **P11 24–26 Nov:** 3-night run at min 2 (£209 / £207 / £229). Sellable from tonight.
- **P11 30 Nov–4 Dec:** 5-night run at min 2, £196 / £195 / £204 / £230 / £261 = £1,086 (yesterday £1,037). Sellable.
- **P11 23–25 Dec:** 3-night run at min 2 (£291 / £268 / £304). Sellable.
- **P04 6–9 Dec:** 4-night run at min 3 (£168 / £170 / £169 / £166 = £673). **P04 14–26 Dec:** 13-night run before the 27 Dec arrival; 14–23 Dec at min 3 (£144–£163). Neither is an orphan.

**Runs that sell only as one exact stay:** P05 7–8 Dec (£429 / £407) and 13–14 Dec (£483 / £477), min 2.

**Single nights at min 1 (bookable):** P04 2 Dec £423; P05 21 Dec £2,194 and 29 Dec £2,247; P06 2 Dec £363; P11 8 Dec £245; P12 26 Nov £294; P13 27 Nov (£265 / £212) and 1 Dec (£235 / £188); P20 5 Dec £582 and 26 Dec £509.

**Lapsed unsold, 23 Nov:** P06, P11, P14 and P20.

### Gaps to fill (open nights next 30, 24 Nov–23 Dec, Smoobu 24 Nov 07:20Z): 97 nights
- **P04 (16):** 24 Nov (orphan, £136); 2 Dec (£423, min 1); 6–9 Dec (£673, min 3); 14–23 Dec (10 n, min 3). The run continues 24–26 Dec.
- **P05 (9):** 29 Nov–2 Dec (£503 / £489 / £484 / £490, min 3); 7–8 Dec; 13–14 Dec; 21 Dec (£2,194, min 1).
- **P06 (1):** 2 Dec (£363, min 1).
- **P11 (15):** 24–26 Nov (£645, min 2); 30 Nov–4 Dec (£1,086, min 2); 8 Dec (£245, min 1); 14–18 Dec (£203 / £213 / £223 / £244 / £309, min 2); 23 Dec (£291). The darts nights 14–17 Dec average **£220.75** (yesterday £223.50).
- **P12 (8):** 26 Nov (£294, min 1); **30 Nov–6 Dec (£1,929, min 2; includes the reopened 4–6 Dec)**.
- **P13 (11):** 27 Nov and 1 Dec (min 1); 13–21 Dec.
- **P14 (30):** every night (special setup, numbers only).
- **P20 (7):** 24 Nov (orphan, £222); 5 Dec (£582, min 1); 14–18 Dec (£287 / £304 / £299 / £332 / £346, min 3).
- **P01, P09:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18): **still present**, day 2. P11 is not in policy `handbacks`. Removes 18 open nights from the next 60 (5–22 Jan) and causes the 3–4 Jan orphan. Confirm it is a handback (and the last night, 4 Jan).
2. **P12 handback block** in Smoobu runs 14 Dec 2026–29 Jun 2029; policy says blocked 14 Dec 2026 to 21 Oct 2027. Last night 13 Dec agrees; only the end date differs. For the record.
3. **P20 min stay 2 on 24 Nov** (policy `listing_facts.P20.min_stay`: 3 nights 25 Oct–30 Nov). Carried; lapses tonight.
4. **Carried:** P04 min 2 on 24–26 Dec (policy: never fewer than 3); P13 1 Dec +25% (policy +50%); P11 darts −2%; P01 18–20 Dec block versus the policy gap block ending 17 Dec; Scott Ellis Gardens not in our property list (t-scott-ellis-2011).

Data gaps:
- **P12 4–7 Dec cancelled stay:** Smoobu/Booking.com price live on 5 Nov, rate plan and promotions applied: NOT CHECKED (channel agent). Ratios quoted are against yesterday's and today's Smoobu price only.
- **Who rearranged the Scott Ellis and P11 blocks on 23 Nov 10:54–10:59, and why:** UNKNOWN. Scott Ellis status (new property, test, owner use): UNKNOWN.
- **P11 5 Jan 2027–31 Jul 2029 block purpose:** UNKNOWN (not in policy).
- **Smoobu pagination:** the full pull again dropped P12 1–5 Jun 2026 (and duplicated one id); a narrow pull recovered it; totals match the snapshot CSV (723).
- **STLY:** none before 24 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): affects P04 last30, pace and the base-rise comparison group. P04 last365 and pace are null (kpi_pack).
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 24 Nov, so ARI, RGI and price percentiles are null.
- **Missing from kpi_pack:** P03 not in Smoobu; P08 and P10 forward occupancy null (handback); P15–P19 not mapped.
- **Revenue scope:** room only (cleaning excluded).
- PriceLabs connector: no call by this agent today. Smoobu is the source for all forward figures; edits since 23 Nov 06:00Z are for the PriceLabs agent (`get_user_logs`).

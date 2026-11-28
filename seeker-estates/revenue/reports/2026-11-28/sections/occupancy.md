## Occupancy & performance

**Portfolio, last 30 nights (29 Oct–27 Nov 2026), the 14 units with Smoobu history:** 221 n, £40,195.45, occupancy 52.6%, ADR £181.88, RevPAR £95.70 (`reports/2026-11-28/kpi_pack.json` `portfolio_last30`). Room revenue only (Smoobu basePrice; cleaning excluded).
- Yesterday (28 Oct–26 Nov) it was 223 n / £39,796.70.
  - 28 Oct leaves: −9 booked (P01 £162.31, P04 £120.65, P06 £177.83, P08 £131.25, P10 £105.96, P11 £188.46, P12 £108.69, P13 £127.66, P20 £176.64 = £1,299.45).
  - 27 Nov enters: +7 booked (P01 £152.13, P04 £150.99, P05 £621.47, P06 £201.96, P11 £179.58, P12 £217.80, P20 £174.27 = £1,698.20). **P13 and P14 27 Nov lapsed unsold.**
  - 223 − 9 + 7 = 221. £39,796.70 − £1,299.45 + £1,698.20 = £40,195.45 (exact). Per-night figures from `data/snapshots/2026-11-28/reservations.csv`.

**Last 365 nights (28 Nov 2025–27 Nov 2026):** 2,274 n, £421,418.01, occupancy 47.9%, ADR £185.32, RevPAR £88.81 (kpi_pack `portfolio_last365`). Yesterday 2,269 n / £420,042.63.
- 27 Nov 2025 leaves −1 (P12 £171.84). 27 Nov 2026 enters +6 (P04 excluded from last365, so its £150.99 is not counted; £1,547.21). 2,269 − 1 + 6 = 2,274; £420,042.63 − £171.84 + £1,547.21 = £421,418.00 (1p rounding).
- Most units' Smoobu history starts in 2026, so this understates a full year. P04 is excluded (last365 null).

**Booked next 30 (28 Nov–27 Dec): 110 of 213 non-blocked nights = 51.6%, £28,347.23 room revenue on the books.** Yesterday 115/216 = 53.2%, £28,957.22.
**Booked next 60 (28 Nov–26 Jan): 141/371 = 38.0%, £37,868.37.** Yesterday 151/375 = 40.3%, £40,050.38.
- **Source:** live Smoobu GET `/api/reservations` (guest and reference fields dropped) and GET `/api/rates`, pulled 28 Nov 07:19:23Z. Scratch copies and scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/occ28/` (`smoobu_res.json`, `smoobu_rates.json`, `pull.py`, `an.py`, `recon.py`, `gaps.py`, `pick_rise.py`).
  - **Pagination fault, same as yesterday:** the full pull returned 864 rows / 863 unique ids. Month-by-month pulls recovered 1 in-window record the full pull missed (P11 3–5 Jul 2026, a different record from yesterday's). 15 recovered records ended before the window and were discarded.
  - After recovery, the **724 reservation rows on mapped units** (incl. cancellations, excl. blocks) match `data/snapshots/2026-11-28/reservations.csv` row for row (ref, dates, status, amount). The 2 Scott Ellis Gardens stays (unmapped) are reported separately.
  - Reservations and `/api/rates` agree on every unit-night in the next 60: 0 mismatches. P13 read as one calendar. Scott Ellis not counted.
- **Excluded:** P02, P03, P07 (blocked on purpose, policy). Handbacks (policy `handbacks`): P08, P09, P10 fully out; **P12 after 13 Dec**; P01 after 20 Dec. Blocks: P01 30 Nov–20 Dec; P06 from 13 Dec; P11 from 5 Jan 2027 (still present; see Conflicts).
- **Reconciling next 30 (115/216 → 110/213):**
  - 27 Nov leaves: −7 booked (£1,698.20, list above), −9 inventory (P13 and P14 were open).
  - **P12 Booking.com 7–14 Dec cancelled: −7 booked, −£1,432.41** (£204.63/n × 7; booking £1,432.42). Nights stay in inventory (now open).
  - **P06 Airbnb 8–12 Dec new: +4 booked, +£948.60** (£237.15/n). Nights were already inventory (open since the 24 Nov reopening).
  - 27 Dec enters: +5 booked (P04 £134.59, P05 £646.85, P11 £280.61, P13 £252.29, P20 £257.68 = £1,572.02), +6 inventory (P14 open).
  - Night-by-night diff of 28 Nov–26 Dec against yesterday's pull: only P06 8–11 Dec (open → booked) and P12 7–13 Dec (booked → open) changed.
  - 115 − 7 − 7 + 4 + 5 = **110**; 216 − 9 + 6 = **213**. £28,957.22 − £1,698.20 − £1,432.41 + £948.60 + £1,572.02 = **£28,347.23** (exact).
- **Reconciling next 60 (151/375 → 141/371):**
  - 27 Nov leaves −7 booked / −9 inventory / −£1,698.20. P12 cancellation −7 / −£1,432.41; P06 new +4 / +£948.60.
  - 26 Jan enters: 0 booked / +5 open (P04, P05, P13, P14, P20; P11 is blocked).
  - 151 − 7 − 7 + 4 = **141**; 375 − 9 + 5 = **371**; £40,050.38 − £1,698.20 − £1,432.41 + £948.60 = **£37,868.37** (exact).
- PriceLabs `forward_occ_30` in kpi_pack (P01 4.5%, P04 34.5%, P05 69.0%, P06 34.5% [71.4% ex-blocks], P11 51.7%, P12 26.7%, P13 65.5%, P20 79.3%) uses a different window and denominator (blocked and handback nights stay in it). Smoobu is the truth.

### What changed overnight (27 Nov 07:19Z → 28 Nov 07:19Z)
- **Reservation rows on mapped units: 724** (incl. cancellations). The P12 27–30 Nov 2025 stay is no longer in the window; no row appeared or vanished otherwise. **1 new booking, 1 cancellation. No new Booking.com booking.**
- **CANCELLED: P12 Mile End, Booking.com, 7–14 Dec (7 n), made 14 Nov 13:51, cancelled 27 Nov 09:31:48 (Smoobu `modifiedAt`).**
  - Room £1,432.42 (£204.63/n); commission £237.36 (Dispatcher figures; room amount matches the Smoobu basePrice in `reservations.csv`).
  - It was P12's last stay before the 13 Dec handback. **7–13 Dec is now open in Smoobu: £262 / £266 / £264 / £265 / £279 / £284 / £265 = £1,885, min 2 / 2 / 2 / 2 / 3 / 3 / 3** (Smoobu `/api/rates` 28 Nov 07:19Z; PriceLabs `prices.csv` 28 Nov the same, available). 14 Dec is unavailable (handback block).
  - Yesterday's Smoobu reading on these booked nights was £279–£303 (min 3); those were booked-night values, not a sale price.
  - P12 is in the 18 Oct raised group, and the booking was made after the rise, so it comes off the base-rise net (see below).
- **NEW: P06 Marylebone, Airbnb, 8–12 Dec (4 n), made 27 Nov 22:21 (lead 11 d).** It sits on the 6–12 Dec nights reopened on 24 Nov (P06 is a policy intentional-block listing; only its open nights are counted as inventory here).
  - Room £948.60 = **£237.15/n**; cleaning £129; commission £167.03 = 15.50% of room + cleaning (standard Airbnb host fee basis).
  - **Paid vs price:**
    - **Smoobu 27 Nov 07:19Z (before the booking): £304 / £317 / £312 / £333 = £1,266 → paid 0.749×** (£74.93 per £100). The Dispatcher's figures are verified.
    - **PriceLabs `booked_price` for 8–11 Dec (live `get_listing_prices`, refreshed 28 Nov 07:07:21Z): £298 / £310 / £306 / £326 = £1,240.00 → paid 0.765× exactly** (0.765 × £1,240 = £948.60). These are the PriceLabs prices from the 27 Nov ~15:00Z refresh (`prices.csv` 28 Nov had the same four numbers). The 15:02Z push changed the price that applied at 22:21, so **it is the 0.765 tier against PriceLabs**, as with P04 10–13 Dec yesterday.
    - Smoobu now shows £334 / £343 / £334 / £364 = £1,375 on the booked nights (0.690×). This is a booked-night value written after the sale, not the price at booking.
    - The Smoobu price at 22:21 is NOT CHECKED directly (no reading between 07:19Z on 27 Nov and 07:19Z on 28 Nov). Which discounts make up 0.765 is NOT CHECKED.
  - **Registration in PriceLabs:** the Dispatcher's snapshot `prices.csv` (P06 file last refreshed 27 Nov 15:02:19Z) still showed 8–11 Dec as available. My live read at 07:07:21Z shows 8–11 Dec **Booked, ADR £237.15, booked 27 Nov**, so PriceLabs has the booking now. The same read shows 6, 7 and 12 Dec as `unbookable: 1` at £271 / £262 / £283 (user_price £326 / £296 / £317). Smoobu has £271 / £262 / £283 on those nights too.
  - kpi_pack `booking_profile` P06: 36 → 37 bookings, median lead 13 → 12 d, median stay 4 n, Airbnb 76.0% / Booking.com 24.0%.
- **Record modified with no change to dates, amount or status:** P06 29 Nov–2 Dec Airbnb (27 Nov 11:19Z; £513.04 unchanged). Which field changed: UNKNOWN.
- **Blocks:** no block was created, moved or removed on any mapped apartment or on Scott Ellis since yesterday's pull.

### Scott Ellis Gardens (Smoobu / PriceLabs 3588993), apartment level
- **Reservations: 2 (unchanged):** Airbnb 21–26 Dec 2026 (5 n, room £1,481.76, made 22 Nov); Booking.com 30 Dec 2026–4 Jan 2027 (5 n, room £2,238.40, made 24 Nov). No modification since 25 Nov 11:06Z.
- **Blocks:** unchanged since 23 Nov 10:59 (20 Nov–9 Dec; single nights 15 Dec, 6 Jan, 12 Jan).
- **Next 30 (28 Nov–27 Dec): 5 booked, 13 blocked, 12 open.** Yesterday 5 / 14 / 11: 27 Nov (blocked) left, 27 Dec (open) entered.
  - Open: 10–14 Dec (£324 / £374 / £383 / £340 / £384, min 3,3,3,2,2; yesterday £342–£413); 16–20 Dec (£391 / £416 / £469 / £489 / £437, min 3,3,3,3,4); 26–27 Dec (£517 min 4, £501 min 7).
- **Next 60 (to 26 Jan): 10 booked, 15 blocked, 35 open.** Yesterday 10 / 16 / 34: 27 Nov (blocked) left, 26 Jan (open) entered.
- **Runs that sell only as one exact stay:** 26–29 Dec (£517 / £501 / £593 / £616, min 4 / 7 / 5 / 4) and 4–5 Jan (£264 min 2, £255 min 3, before the 6 Jan block).
- Still not in `build/properties.py`, `data/id_map.json` or `policy.json` (t-scott-ellis-2011). Not counted in any portfolio figure.

### 7-day pickup, net of cancellations
- **Window:** bookings made 22–28 Nov to 07:19Z (Smoobu `created-at`); cancellations by `modifiedAt`. Script `occ28/pick_rise.py`.
- **Gross made:** 8 bookings / 23 n / £4,570.69. **Still confirmed:** 7 / 19 n / £4,082.34 (matches kpi_pack `pickup_7d` summed: P04 1/3/£378.67, P06 3/10/£2,230.46, P11 1/2/£280.67, P12 1/3/£766.54, P20 1/1/£426.00).
- **Cancelled in the window:** 3 / 14 n / £2,598.56 (P04 10–14 Dec £488.35; P12 4–7 Dec £677.79; **P12 7–14 Dec £1,432.42**).
- **Net: +9 n / +£1,972.13.** Yesterday +8 n / +£1,235.97.
- **Reconciliation:**
  - 21 Nov leaves the window. Made that day: P04 17–20 Dec 3 n / £338.12 (since cancelled). Cancelled that day: P04 17–20 Dec 3 n / £338.12 and P05 13–17 Feb 4 n / £1,219.98. Net effect +4 n / +£1,219.98.
  - Overnight: P06 8–12 Dec +4 n / +£948.60; P12 7–14 Dec cancellation −7 n / −£1,432.42.
  - 8 + 4 + 4 − 7 = **+9**; £1,235.97 + £1,219.98 + £948.60 − £1,432.42 = **+£1,972.13** (exact).
- Net pickup rose even though a 7-night stay was lost, because the P05 −£1,219.98 cancellation (21 Nov) left the window. It is not new demand.

| Ref | Made 22–28 Nov (n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P04 | 7 / £867.02 (10–13 Dec Airbnb; 10–14 Dec Booking.com, cancelled) | 4 / £488.35 | +3 / +£378.67 |
| P05 | 0 | 0 (13–17 Feb cancellation left the window) | 0 (was −4 / −£1,219.98) |
| **P06** | 10 / £2,230.46 (29 Nov–2 Dec, 3–6 Dec, **8–12 Dec new**, all Airbnb) | — | **+10 / +£2,230.46** (was +6 / +£1,281.86) |
| P11 | 2 / £280.67 (25–27 Nov Booking.com) | — | +2 / +£280.67 |
| **P12** | 3 / £766.54 (4–7 Dec Booking.com) | 10 / £2,110.21 (4–7 Dec £677.79; **7–14 Dec £1,432.42**) | **−7 / −£1,343.67** (was 0 / +£88.75) |
| P20 | 1 / £426.00 (5–6 Dec Airbnb) | — | +1 / +£426.00 |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

**Booking.com bookings made since 18 Nov (the +15% date), confirmed:** unchanged at 3 on mapped units (P11 27–30 Nov, P12 4–7 Dec, P11 25–27 Nov) plus Scott Ellis 30 Dec–4 Jan (unmapped). The cancelled P12 7–14 Dec was made 14 Nov, under the +10% markup.
- **Booking.com since 24 Oct, mapped units, my count:** 31 gross / 16 confirmed / 15 cancelled (Smoobu `created-at` ≥ 24 Oct, current status). The brief's "29 / 16 / 13 (verify)" does not match. The definitions may differ, for example on the start time or on cancellations made before 24 Oct. The channel agent should reconcile.

### Pace vs STLY
Cancellations excluded on both sides (`rm.metrics.on_the_books` on `data/snapshots/2026-11-28/reservations.csv`).
- **P12, handback-aware.** Stays 28 Nov–13 Dec 2026 as of 28 Nov 2026 vs 28 Nov–13 Dec 2025 as of 28 Nov 2025: **5 n / £1,202.13 vs 13 n / £2,611.51 = −8 n / −£1,409.38 / −54.0% revenue** (−61.5% on nights).
  - **Class: On track → Soft.** Behind STLY by more than 10%, and forward occupancy 31.2% (5/16) is below 60%. Yesterday it was −1 n / +£69.00 / +2.5%.
  - OTB: 13 n / £2,852.35 − 7 Dec cancellation (7 n / £1,432.42) − 27 Nov booked night leaving (1 n / £217.80) = 5 n / £1,202.13 (exact). What remains: 28–29 Nov (part of 27–30 Nov, £653.39) and 4–7 Dec (£766.54), both Booking.com.
  - STLY: 27 Nov 2025 leaves (−1 n / −£171.84); no booking made on 28 Nov 2025 falls in the window. 14 − 1 = 13; £2,783.35 − £171.84 = £2,611.51 (exact).
  - kpi_pack `pace_30` (28 Nov–27 Dec, not handback-aware): 5 n / £1,202.13 vs 22 n / £4,703.69 = −17 n / −74.4%. `pace_90`: 5 n vs 53 n / £9,453.76 = −48 n / −87.3%. Nothing after 13 Dec is inventory, so neither is a demand signal.
  - Open P12 inventory before the handback: 11 nights (30 Nov–3 Dec, 7–13 Dec).
- **P02:** kpi_pack 30-day 0 vs STLY 11 n / £1,203.97; 90-day 0 vs 29 n / £3,092.40. Blocked on purpose, not assessed.
- **All other units: UNKNOWN (no STLY).** Only P02 and P12 have bookings made on or before 28 Nov 2025.

### 18 Oct base rises: running effect, recomputed (same method)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including later-cancelled ones), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Recomputed in full from the 28 Nov 07:19Z pull.

**Raised group (P01, P05, P06, P09, P11, P12): +34 n / +£9,077.23 including P06 (was +37 / +£9,561.05); like-for-like +15 n / +£4,980.16 (was +22 / +£6,412.58).**
- Overnight: P12 7–14 Dec cancellation −7 n / −£1,432.42; P06 8–12 Dec +4 n / +£948.60. 37 − 7 + 4 = 34; £9,561.05 − £1,432.42 + £948.60 = £9,077.23 (exact).
- **Like-for-like excludes the 5 P06 stays on reopened nights (19 n / £4,097.07).** That is yesterday's 4 (15 n / £3,148.47) plus 8–12 Dec, which sits on the 6–12 Dec reopening. 34 − 19 = 15; £9,077.23 − £4,097.07 = £4,980.16. Check: £6,412.58 − £1,432.42 = £4,980.16. P06 like-for-like stays +6 / +£1,345.77.
- Made: 34 / 126 n / £27,648.03. Cancelled: 17 / 92 n / £18,570.80.
- **P12 has dropped from +11 / +£1,748.96 to +4 / +£316.54.** A 7-night stay made after the rise was cancelled.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | 1 / 3 / £720.90 | 0 / £0 |
| P05 | 4 / 16 / £6,135.19 | 1 / 4 / £1,219.98 | +12 / +£4,915.21 |
| **P06** | **7 / 25 / £5,442.84** | — | **+25 / +£5,442.84** (like-for-like +6 / +£1,345.77) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 | −3 / −£244.70 (handed back; final) |
| P11 | 10 / 34 / £6,119.80 | 6 / 38 / £7,472.46 | −4 / −£1,352.66 |
| **P12** | 10 / 42 / £8,613.40 | **8 / 38 / £8,296.86** | **+4 / +£316.54** |

**Comparison groups (unchanged overnight):**
- Unraised (P02, P08, P10, P14, P20): +55 n / +£10,584.37. P20 alone +46 / +£9,382.77.
- P13: +27 n / +£4,704.65.
- P04: +50 n / +£6,312.34 using `total_gbp`; +£3,824.94 counting import-batch records without a basePrice as £0.
- **Caveats as before:** the Booking.com markup changes (24 Oct, 12 Nov, 18 Nov), stacked promotions, Reyhan's overrides and the P06 reopenings cannot be separated out. The sample is 1–10 bookings per unit. A cancellation is not evidence about price.

### Per-property table
**Column sources:** Occ30 / ADR30 / RevPAR30: kpi_pack `last30`, 29 Oct–27 Nov. Fwd occ30: Smoobu 28 Nov 07:19Z, 28 Nov–27 Dec, non-blocked and handback-aware (kpi_pack `market_occ_30` in brackets). Pace30: see above. Pickup 7d: made 22–28 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £152.81 | £152.81 | 100% 2/2 non-blocked (37%) | UNKNOWN: no STLY | 0 | **Compressed** (no open night before the block/handback) |
| P02 | Ladbroke Grove | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (50%) | not assessed (policy) | 0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | 73.3%† | £124.78† | £91.51† | 36.7% 11/30 (24%) | UNKNOWN: no STLY | +3 / +£378.67 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 83.3% | £441.32 | £367.77 | 70.0% 21/30 (50%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| **P06** | Marylebone | 70.0% | £202.63 | £141.84 | **73.3% 11/15 non-blocked** (50%) | UNKNOWN: no STLY | **+10 / +£2,230.46** | **Unclassifiable** (60–85%, no STLY; was Soft) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (27%) | UNKNOWN | 0 | Not classified: blocked on purpose |
| P08 | Islington | 43.3% | £131.97 | £57.19 | handed back after 13 Nov (53%) | — | 0 | Not classified: handed back |
| P09 | Greenwich | 60.0% | £102.69 | £61.61 | handed back after 26 Nov (41%) | — | 0 | Not classified: handed back |
| P10 | Ealing / Hanger Lane | 70.0% | £105.96 | £74.17 | handed back after 18 Nov (32%) | — | 0 | Not classified: handed back |
| P11 | Camden | 60.0% | £178.44 | £107.07 | 53.3% 16/30 (49%) | UNKNOWN: no STLY | +2 / +£280.67 | **Soft** (fwd30 < 60%) |
| **P12** | Mile End | 63.3% | £164.30 | £104.06 | **31.2% 5/16 to handback** (42%) | **−8 n / −£1,409.38 / −54.0%** handback-aware (pack −74.4%) | **−7 / −£1,343.67** | **Soft** (was On track) |
| P13 | Shepherd's Bush (one flat) | 63.3% | £137.92 | £87.35 | 66.7% 20/30 (46%) | UNKNOWN: no STLY | 0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% 0/30 (46%) | UNKNOWN: no STLY | 0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 50.0% | £188.95 | £94.47 | 80.0% 24/30 (38%) | UNKNOWN: no STLY | +1 / +£426.00 | Unclassifiable (60–85%, no STLY) |

† P04 mixes bases: import-batch stays carry the Smoobu `price` because they have no basePrice element.

**Classes:** Compressed 1 (P01); On track 0; Soft 4 (P04, P11, **P12**, P14); Unclassifiable 9 (P05, **P06**, P13, P20, P15–P19); Not classified 6 (P02, P03, P07 policy blocks; P08, P09, P10 handed back).
- **Class changes: P12 On track → Soft (lost 7 of its 13 booked nights before the handback). P06 Soft → Unclassifiable (8/16 → 11/15 after the 8–12 Dec sale).**
- Other moves: P13 63.3% → 66.7% (27 Nov open night left, 27 Dec booked night entered). P01 3/3 → 2/2. P04 36.7%, P05 70.0%, P11 53.3%, P20 80.0% unchanged.

**Next 30 and next 60, Smoobu, handback-aware (from 28 Nov):**

| Ref | Next 30 booked / revenue | Next 60 booked | Share | Next 60 revenue |
|---|---|---|---|---|
| P01 | 2/2 / £304.26 | 2/2 | 100% | £304.26 |
| P04 | 11/30 / £1,463.26 | 18/60 | 30.0% | £2,405.40 |
| P05 | 21/30 / £11,122.30 | 27/60 | 45.0% | £14,957.85 |
| **P06** | **11/15 / £2,432.42** | 11/15 | 73.3% | £2,432.42 (block from 13 Dec) |
| P11 | 16/30 / £3,536.25 | 22/38 | 57.9% | £5,219.88 (block from 5 Jan) |
| **P12** | **5/16 / £1,202.13** | 5/16 | 31.2% | £1,202.13 (was 13/17, £2,852.35) |
| P13 | 20/30 / £3,460.82 | 26/60 | 43.3% | £4,974.53 |
| P14 | 0/30 / £0 | 0/60 | 0% | £0 |
| P20 | 24/30 / £4,825.79 | 30/60 | 50.0% | £6,371.89 |
| **Total** | **110/213 = 51.6% / £28,347.23** | **141/371** | **38.0%** | **£37,868.37** |

**Last 365 nights** (kpi_pack `last365`, 28 Nov 2025–27 Nov 2026):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 46.0% | £173.72 | £79.96 | £29,185.27 |
| P02 | 78.4% | £129.24 | £101.27 | £36,962.14 |
| P05 | 63.0% | £381.02 | £240.09 | £87,633.54 |
| P06 | 39.7% | £233.76 | £92.86 | £33,894.65 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 41.9% | £172.44 | £72.28 | £26,382.63 |
| P09 | 44.1% | £114.17 | £50.36 | £18,381.24 |
| P10 | 42.7% | £113.44 | £48.48 | £17,696.55 |
| P11 | 81.6% | £174.57 | £142.53 | £52,021.82 |
| P12 | 80.3% | £193.89 | £155.64 | £56,808.83 |
| P13 | 82.5% | £157.23 | £129.66 | £47,326.11 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 (short history) | 8.5% | £174.29 | £14.80 | £5,403.13 |

P03, P04 and P15–P19: UNKNOWN (kpi_pack null).

**Booking profile** (kpi_pack `booking_profile`, confirmed bookings). Changes since yesterday: **P06** 36 → 37 (lead 13 → 12 d; Airbnb 76.0% / Booking.com 24.0%); **P12** 78 → 76 (7–14 Dec cancelled; 27–30 Nov 2025 left the window; Booking.com 89.2% / Airbnb 10.8%). Others unchanged.

| Ref | Bookings | Median lead | Median stay | Channel revenue share |
|---|---|---|---|---|
| P01 | 20 | 15 d | 5 n | Airbnb 79.9% / Website 13.3% / Booking.com 6.8% |
| P02 | 69 | 36 d | 4 n | Airbnb 54.5% / Booking.com 42.3% / Direct 3.2% |
| P04 | 8 | 8 d | 4 n | Airbnb 78.3% / Booking.com 21.7% |
| P05 | 62 | 44 d | 4 n | Airbnb 100% |
| P06 | 37 | 12 d | 4 n | Airbnb 76.0% / Booking.com 24.0% |
| P07 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 22 | 15 d | 6 n | Airbnb 77.3% / Booking.com 22.7% |
| P09 | 25 | 18 d | 5 n | Airbnb 57.3% / Booking.com 41.2% / Direct 1.5% |
| P10 | 22 | 12 d | 5 n | Airbnb 69.3% / Booking.com 27.6% / Website 3.1% |
| P11 | 74 | 28 d | 4 n | Booking.com 54.8% / Airbnb 43.3% / Agoda 1.9% |
| P12 | 76 | 31 d | 4 n | Booking.com 89.2% / Airbnb 10.8% |
| P13 | 87 | 22 d | 3 n | Booking.com 52.3% / Airbnb 46.9% / Agoda 0.9% |
| P14 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 11 | 8 d | 4 n | Airbnb 100% |

### Orphan gaps, next 30 / 60
- **Source:** Smoobu `/api/rates`, 28 Nov 07:19Z (`occ28/gaps.py`); kpi_pack `gaps` for P06 agrees. P13 read as one calendar; handbacks respected.
- **Definition:** an open run where no arrival night's minimum stay fits before the next booking, block or handback.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Status |
|---|---|---|---|---|
| **P06** | **6–7 Dec** (next 30) | £271 / £262, min 3 | 2 nights between the 3–6 Dec stay and the new 8 Dec arrival | **NEW** (from the 8–12 Dec sale). PriceLabs marks both `unbookable: 1` |
| **P06** | **12 Dec** (next 30) | £283, min 3 | 1 night between the 12 Dec departure and the block from 13 Dec | **NEW** (the 8–12 Dec stay departs 12 Dec, not 13 Dec). PriceLabs `unbookable: 1` |
| P11 | 3–4 Jan (next 60) | £148 / £163, min 3 | 2 nights between the stay ending 3 Jan and the block from 5 Jan | **Day 6.** Unsellable while min is 3 and the block stands |

**Three orphan nights in the next 30 (all P06, £816 at Smoobu prices), plus 2 in the next 60 (P11).** P06 is a policy intentional-block listing. These nights are open (reopened 24 Nov), so they are counted as inventory.

**Checked and NOT orphans:**
- **P12 7–13 Dec (reopened by the cancellation):** a 7-night run to the handback, £1,885, min 2 / 2 / 2 / 2 / 3 / 3 / 3. Sellable from any arrival 7–11 Dec. Arrivals on 12 or 13 Dec cannot fit their min 3 before the handback. **Risk:** a stay that ends on 12 Dec (e.g. 7–12 Dec, or 9–12 Dec) leaves 12–13 Dec as a 2-night orphan at min 3. A stay ending 11 Dec leaves 11–13 Dec (3 n, min 3), which fits exactly.
- **P12 30 Nov–3 Dec:** 4-night run, min 2, £252 / £261 / £275 / £275 = **£1,063** (yesterday £1,118), before the 4–7 Dec stay. A 3-night sale from 30 Nov would leave 3 Dec as a single night at min 2.
- **P04 6–9 Dec:** 4-night run between the stay ending 6 Dec and the 10 Dec arrival, min 3, £160 / £160 / £162 / £159 = **£641** (yesterday £687). Sellable as a 3- or 4-night stay. A 3-night sale leaves 1 night under the min-3 rule (policy P04 `min_stay_rule`). **P04 13–26 Dec:** 14-night run, min 3 (£134–£166). **P04 2 Dec:** single night, £420, min 1.
- **P11:** 30 Nov–4 Dec 5 n, min 2 (£211 / £231 / £241 / £270 / £293 = £1,246); 14–18 Dec 5 n, min 2 (£208 / £214 / £223 / £241 / £302; darts nights 14–17 Dec average **£221.50**, was £224.50); 23–25 Dec 3 n, min 2 (£277 / £255 / £262). All sellable.
- **P20:** 14–18 Dec 5 n, min 3 (£290 / £304 / £300 / £333 / £318 = £1,545); 26 Dec single night £565, min 1.

**Runs that sell only as one exact stay:** P05 7–8 Dec (£395 / £372) and 13–14 Dec (£404 / £486), min 2; Scott Ellis 26–29 Dec and 4–5 Jan.

**Single nights at min 1 (bookable):** P04 2 Dec £420; P05 21 Dec £2,178 and 29 Dec £2,172; P06 2 Dec £328 (yesterday £294); P11 8 Dec £297; P13 1 Dec (3064856 £233 / 3090701 £225); P20 26 Dec £565.

**Lapsed:** P13 27 Nov (open, min 1) and P14 27 Nov.

### Gaps to fill (open nights next 30, 28 Nov–27 Dec, Smoobu 28 Nov 07:19Z): 103 nights
- **P12 (11), the last fortnight before the 13 Dec handback:** 30 Nov–3 Dec (£1,063, min 2); **7–13 Dec (£1,885, min 2–3; reopened by the cancellation)**.
- **P04 (19):** 2 Dec (£420, min 1); 6–9 Dec (£641, min 3); 13–26 Dec (14 n, min 3, £134–£166).
- **P05 (9):** 29 Nov–2 Dec (£442 / £429 / £432 / £442 = £1,745, min 3; yesterday £1,864); 7–8 Dec; 13–14 Dec; 21 Dec (£2,178, min 1).
- **P06 (4):** 2 Dec (£328, min 1); 6–7 Dec and 12 Dec (orphans at min 3, above).
- **P11 (14):** 30 Nov–4 Dec (£1,246); 8 Dec (£297); 14–18 Dec; 23–25 Dec.
- **P13 (10):** 1 Dec (min 1); 13–21 Dec (9 n, 3064856 £200–£230, min 2–3).
- **P14 (30):** every night (special setup, numbers only).
- **P20 (6):** 14–18 Dec (£1,545, min 3); 26 Dec (£565, min 1).
- **P01:** none.

### Conflicts for Corentin (confirm or revert, not new proposals)
1. **P11 Camden "Blocked channel" 5 Jan 2027–31 Jul 2029** (created 22 Nov 12:18): **still present, day 6.** P11 is not in policy `handbacks`. It removes 21 nights (5–26 Jan) from the next 60 and causes the 3–4 Jan orphan. Confirm it is a handback (last night 4 Jan).
2. **P06 6–12 Dec reopening** (24 Nov): 4 of its 7 nights have now sold (8–12 Dec, £948.60). 6–7 Dec and 12 Dec are left as orphans at min 3. Confirm the reopening was intended; the strategy director owns any min-stay decision.
3. **P12 handback block** in Smoobu runs 14 Dec 2026–29 Jun 2029; policy says to 21 Oct 2027. The last night (13 Dec) agrees. For the record.
4. **Carried:** P01 block runs 30 Nov–20 Dec, while policy's gap block ends 17 Dec (18–20 Dec). P13 1 Dec +25% vs policy +50% (PriceLabs agent). P11 23–25 Dec override (Reyhan, 25 Nov). Scott Ellis Gardens not in our property list (t-scott-ellis-2011).

Data gaps:
- **P06 8–12 Dec:** the Smoobu price at the booking time (27 Nov 22:21) is NOT CHECKED. The 0.765 match is against the PriceLabs `booked_price` (£1,240.00); Smoobu 07:19Z on 27 Nov gives 0.749×. The breakdown of 0.765 (e.g. Smoobu Airbnb pricing rules for P06) is NOT CHECKED. Policy records those rules for Shepherd's Bush only.
- **P12 7–14 Dec cancellation:** the reason and any cancellation fee retained are UNKNOWN. The Smoobu fields kept carry status and amount only.
- **Record modified with no visible change** (P06 29 Nov–2 Dec, 27 Nov 11:19Z): which field changed is UNKNOWN.
- **Booking.com since 24 Oct:** my count is 31 gross / 16 confirmed / 15 cancelled; the brief says 29 / 16 / 13. The definitions are not reconciled (channel agent).
- **Scott Ellis:** status (new property, test or owner use) and who set its 23 Nov blocks: UNKNOWN.
- **P06 6–12 Dec unblock** and **P11 2029 block:** who and why are UNKNOWN (not in policy).
- **Smoobu pagination:** the full pull missed 1 in-window record (P11 3–5 Jul 2026) and duplicated 1 id. Month pulls recovered it; totals match the CSV.
- **STLY:** none on or before 28 Nov 2025 except P02 and P12, so pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- **P04 import batch** (no basePrice): this affects P04 last30 and the base-rise comparison group. P04 last365 and pace are null (kpi_pack).
- **Market, comps and channel checks:** kpi_pack `missing` lists `market.csv`, `comps.csv` and `channel_checks.csv` as empty for 28 Nov, so ARI, RGI and price percentiles are null. Paid vs comps for P06 is NOT CHECKED here (comp agents).
- **Missing from kpi_pack:** P03 not in Smoobu; P08, P09 and P10 forward occupancy null (handback); P15–P19 not mapped.
- **Revenue scope:** room only (cleaning excluded).
- **PriceLabs connector:** 1 read-only call (`get_listing_prices` P06 3288517, 6–13 Dec, returned refreshed 07:07:21Z 28 Nov). All other PriceLabs-side facts come from `data/snapshots/2026-11-28/prices.csv` and the kpi_pack.

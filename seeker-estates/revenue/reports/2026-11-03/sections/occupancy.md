## Occupancy & performance

**Portfolio, last 30 nights (4 Oct–2 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 67.4%, ADR £170.81, RevPAR £115.19, revenue £44,922.70 (263 nights). Source: `reports/2026-11-03/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice, room only, cleaning not included. Yesterday (3 Oct–1 Nov) was 68.2% / £171.48 / £116.96 / £45,613.67.
- **Last 365 nights (3 Nov 2025–2 Nov 2026):** 45.0%, ADR £184.09, RevPAR £82.87, revenue £393,211.78 (2,136 n). Source: kpi_pack `portfolio_last365`. The denominator is 365 days and most Smoobu history starts in 2026.
- P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Booked next 30 nights (4 Nov–2 Dec, 29 nights; `prices.csv` 3 Nov starts at 4 Nov).** Smoobu confirmed stays are the truth, and handbacks are respected. **177 of 288 non-blocked nights = 61.5%** (yesterday 61.1%).
- Units counted: P01, P04, P05, P06, P08–P14, P20. P02, P03 and P07 are blocked on purpose (policy).
- Blocked nights excluded: P01 3 (30 Nov–2 Dec, handback gap block) and P06 18 (policy).

**Booked next 60 nights (4 Nov–1 Jan, 59 nights): 244 of 482 = 50.6%** (yesterday 50.0%).
- **PriceLabs vs Smoobu:** `prices.csv` 3 Nov still shows **P11 20–21 Nov as available**, but this is the new Booking.com stay. Smoobu GET /api/rates (07:21Z 3 Nov) shows both nights closed (available 0), so they cannot be sold twice. PriceLabs already shows P20 10–12 Nov as Booked. The 2 Nov stale nights (P06 12–14 Nov, P12 27–29 Nov) are now Booked in PriceLabs. No night is Booked in PriceLabs without a Smoobu stay.
- **Tonight (3 Nov) is not in `prices.csv`.** Smoobu `reservations.csv` and `/api/rates` (07:20Z) show:
  - Booked: P01, P04 (Barking Booking.com 3–6 Nov), P05, P06, P08, P09, P10, P11 and P20.
  - Open: **P12** (£170, min 2), **P13** (£110 / £122 on the two listings, min 2) and P14.

### Booked vs market, next 30 / next 60 (Smoobu truth; market = PriceLabs `pl_kpis.csv` 3 Nov)

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (26/26 non-blocked) | 34% | 100% (29/29 non-blocked; handback excluded) | 29% |
| P04 | 55.2% (16/29) (was 58.6%) | 23% | 54.2% (32/59) | 20% |
| P05 | 75.9% (22/29) (was 79.3%) | 40% | 67.8% (40/59) | 38% |
| P06 | 63.6% of non-blocked (7/11; 18 blocked on purpose) | 45% | 7/11 non-blocked (48 blocked) | 41% |
| P08 | 70.0% (7/10, up to handback 13 Nov) | 48% | same | 42% |
| P09 | 87.0% (20/23, up to handback 26 Nov) | 36% | same | 31% |
| P10 | 100% (15/15, up to handback 18 Nov) | 28% | same | 24% |
| P11 | **41.4% (12/29)** (was 37.9%) | 46% | 44.1% (26/59) | 39% |
| P12 | 62.1% (18/29) | 40% | 55.0% (22/40, up to handback 13 Dec) | 34% |
| P13 (one flat) | 72.4% (21/29) | 41% | 52.5% (31/59) | 36% |
| P14 (special setup, numbers only) | 0% (0/29) | 42% | 0% (0/59) | 38% |
| P20 | **44.8% (13/29)** (was 34.5%) | 36% | 25.4% (15/59) | 30% |

- **P20 is now above market for the next 30** (44.8% vs 36%) because of the 10–13 Nov booking. It is still below market for the next 60.
- **P11 is still below market for the next 30** (41.4% vs 46%), and now just above it for the next 60 (44.1% vs 39%).
- **P04, P05, P06, P08 and P09 fell only because the window moved:** 3 Nov (booked) left it. P04 and P05 also took in an open 2 Dec. None lost a booking.

### 7-day pickup (bookings made 28 Oct–3 Nov; 3 Nov partial), imported past stays excluded
Source: `reservations.csv` 3 Nov, `booked_on` on confirmed rows. It matches kpi_pack `pickup_7d` for every unit.

**2 new bookings overnight, both made 2 Nov:**
- **P20 10–13 Nov, Airbnb:** £510.00 = £170.00/n. That is 0.722× the PriceLabs price in `prices.csv` 2 Nov (233+234+239 = £706). Lead time 8 days. It was booked after Reyhan's 2 Nov 00:16Z base cut to 330 and −5% on 6–24 Nov. Smoobu created-at is 2 Nov 16:28.
- **P11 20–22 Nov, Booking.com:** £430.11 = £215.06/n. That is 0.889× PriceLabs 2 Nov (241+243 = £484). Lead time 18 days. Smoobu created-at is 2 Nov 23:10.
  - This is the first P11 booking since 28 Oct.
  - **Correction to the overnight brief:** it was not made with the cuts removed. `get_user_logs` shows Reyhan **re-added −5% on P11 10 Nov–18 Dec (min 2) at 2 Nov 15:05:01Z**, about 8 h before the booking (Smoobu timezone not stated).

No booking was created on 3 Nov so far: the latest Smoobu created-at in GET /api/reservations (pulled 07:20Z) is 2 Nov 23:10.

**Total: 12 bookings, 45 nights, £9,229.27.** No imported past stay falls in the window.

**Cancellations 28 Oct–3 Nov.** The cancel time is Smoobu `modifiedAt` (GET /api/reservations, modifiedFrom 1 Oct, pulled 07:20Z 3 Nov, guest fields not saved).
- **4 cancellations, 12 nights, £2,474.96 room.**
- **None since 31 Oct 14:36**, so there were no cancellations overnight.
- The P11 27 Oct cancellation (14 n / £2,950.82) is now outside the window. The P20 20–22 Nov delivery block removal is left out because it is a block, not a booking.

**Net 7-day: +33 nights, +£6,754.31** (yesterday +34 n / +£5,921.83).

| Ref | Pickup 28 Oct–3 Nov (bk / n / £) | Cancelled 28 Oct–3 Nov (stay, n / £, cancel time) |
|---|---|---|
| P12 | 3 / 12 / £2,738.19 | 18–22 Nov 4 n / £786.15 (28 Oct 13:27); 4–8 Dec 4 n / £1,116.99 (28 Oct 22:12) |
| P20 | 2 / 13 / £2,252.65 | — |
| P05 | 2 / 6 / £1,953.04 | — |
| P11 | 2 / 5 / £995.49 | — |
| P04 | 2 / 6 / £748.90 | 20–23 Nov 3 n / £355.82 (30 Oct 12:01); 19–20 Dec 1 n / £216.00 (31 Oct 14:36) |
| P06 | 1 / 3 / £541.00 | — |
| P01, P02, P08, P09, P10, P13, P14 | 0 | — |

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`; cancelled bookings excluded on both sides)
Only **P12 Mile End** has Smoobu stays in the same-time-last-year windows.

| P12 measure | 2 Nov | 3 Nov |
|---|---|---|
| Pace30 (stays 3 Nov–2 Dec) | −6 n / −£422.98 / −11.9% | **18 n / £3,129.85 vs 23 n / £3,431.19 = −5 n / −£301.34 / −8.8%** |
| Up to handback (stays 3 Nov–13 Dec) | −9 n / −20.2% | 22 n / £4,202.29 vs 30 n / £5,141.19 = −8 n / −£938.90 / −18.3% |
| Pace90 (stays 3 Nov–1 Feb; ignores the handback) | −48.8% | 22 n / £4,202.29 vs 42 n / £8,093.89 = −20 n / −£3,891.60 / −48.1% |

- **No new P12 booking.** The move from −11.9% to −8.8% comes from the window shifting: one STLY night (£121.64) left the STLY window. The class test uses revenue (kpi_pack `revenue_delta_pct`). On nights P12 is still −5 n (−21.7%).
- Pace for every other unit is UNKNOWN because `reservations.csv` has no STLY stays for them.
- On the books for stays 3 Nov–2 Dec (kpi_pack `pace_30`, n / £):
  - P01 27 / £4,107.51; P05 23 / £10,610.97; P06 8 / £1,701.42; P08 8 / £1,047.10; P09 21 / £2,155.07; P10 16 / £1,695.42.
  - **P11 13 / £2,374.84** (was 11 / £1,944.73); P13 21 / £3,062.22; **P20 14 / £2,454.34** (was 11 / £1,953.47).
  - P02, P07 and P14 0. P04 is UNKNOWN in the pack.

### 18 Oct base rises: running effect (rises logged 18 Oct 20:33–20:43Z)
**What is compared:**
- **Windows:** bookings made **19 Oct–2 Nov (15 full days)** against **4–18 Oct (15 days)**. 3 Nov has none so far.
- **Cancellations:** split at 18 Oct 20:33 using Smoobu `modifiedAt`. There have been no new cancellations since 31 Oct.
- **Bookings:** confirmed rows only, imports excluded. P04 is left out (in Smoobu only since 20 Oct). Source: `reservations.csv` 3 Nov plus Smoobu GET /api/reservations 3 Nov.

**Changes logged since 2 Nov 06:00Z** (`get_user_logs` listing, 2–3 Nov; 35 entries in total, all by Reyhan):
- **No base_price change since 2 Nov 06:00Z.** The only base change in the window is P20 350→330 at 2 Nov 00:16Z.
- **At 2 Nov 15:02–15:05Z:**
  - **P12:** −10% on 2–4 Nov; −5% on 12–13 Nov; **−10% on 16 Nov–13 Dec** (replacing the 31 Oct −7%); **+25% with min 1 on 26 Nov**.
  - **P11:** −5% on 10 Nov–18 Dec.
  - **P13:** −5% on 8–12 Nov and on 7–20 Dec.
- **At 23:26Z:** P20 −2% with **min 2 on 16–19 Nov**.

**The two raised flats that took bookings, P11 and P12, carry −5% and −10% date overrides on those dates.** The raised group is therefore no longer cleanly "raised" for November–December stays.

| Group | Made 19 Oct–2 Nov: bk / n / £ (per day) | Made 4–18 Oct: bk / n / £ (per day) | After ÷ before, per day (bk / n / £) | Cancelled after the rise | Cancelled 4 Oct to the rise |
|---|---|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 14 / 48 / £10,030.33 (0.93 / 3.20 / £668.69) | 13 / 91 / £18,199.03 (0.87 / 6.07 / £1,213.27) | **1.08× / 0.53× / 0.55×** (was 1.07× / 0.54× / 0.57×) | 6 / 44 n / £9,287.63 (unchanged) | 2 / 8 n / £3,179.09 |
| **Unraised** (P02, P08, P10, P14, P20*) | 6 / 29 / £4,717.79 (0.40 / 1.93 / £314.52) | 7 / 68 / £8,054.83 (0.47 / 4.53 / £536.99) | **0.86× / 0.43× / 0.59×** (was 0.76× / 0.41× / 0.56×) | 0 | 0 |
| P13 (base 235→250 on 24 Oct, unconfirmed) | 2 / 16 / £2,909.76 (0.13 / 1.07 / £193.98) | 6 / 24 / £3,617.87 (0.40 / 1.60 / £241.19) | 0.33× / 0.67× / 0.80× | 0 | 0 |

\* P20's base was cut 380→350 on 24 Oct and 350→330 on 2 Nov, so the unraised group's only new booking (P20) came from a flat whose base has been cut twice.

**Net since the rise (made minus cancelled):**
- **Raised: +4 n / +£742.70** (was +2 n / +£312.59). The whole change is the P11 20–22 Nov booking.
- Unraised: +29 n / +£4,717.79 (was +26 n / +£4,207.79). The whole change is the P20 10–13 Nov booking.
- P13: +16 n / +£2,909.76 (unchanged).

**Per raised property** (made 19 Oct–2 Nov vs 4–18 Oct, bk / n / £; then cancellations after the rise):
- P01: 1 / 3 / £720.90 vs 1 / 30 / £4,563.90. No cancellations.
- P05: 2 / 6 / £1,953.04 vs 2 / 11 / £6,363.05. No cancellations after the rise.
- P06: 2 / 6 / £1,345.77 vs 4 / 18 / £3,400.07. No cancellations.
- P09: 1 / 2 / £253.21 vs 3 / 23 / £2,371.55. No cancellations. No booking since 23 Oct.
- **P11: 3 / 8 / £1,651.56** vs 1 / 4 / £650.48. 2 cancellations / 22 n / £4,687.23, both booked before the rise. **Net −14 n / −£3,035.67.**
- P12: 5 / 23 / £4,105.85 vs 2 / 5 / £849.98. 4 cancellations / 22 n / £4,600.40. Net +1 n / −£494.55.

**Running line:**
- **Booking count per day:** level or higher after the rise in both groups (raised 1.08×, unraised 0.86×).
- **Nights and revenue per day fell by about the same share in both groups:** nights 0.53× raised vs 0.43× unraised; revenue 0.55× vs 0.59×.
- **The raised group's net is positive for a second day.**
- **Both new bookings were sold well below the PriceLabs price** (0.889× and 0.722×) on dates carrying fresh negative overrides. They are not evidence that the raised base is clearing.
- **Effects that cannot be separated:**
  - the 24 Oct Booking.com markup cut;
  - Booking.com Last Minute 10%;
  - the Airbnb flexible-cancellation test on P05/P06/P20;
  - Reyhan's 30 Oct–2 Nov overrides.
- **Small sample and long-stay base:** 1–5 bookings per property, and the 4–18 Oct base includes long stays (P01 30 n; P05 £4,527.95 made 18 Oct).

### Per-property table
Column sources:
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 4 Oct–2 Nov.
- **Fwd occ30:** 4 Nov–2 Dec, Smoobu truth, handback-aware; market from `pl_kpis.csv` 3 Nov.
- **Pace30:** stays 3 Nov–2 Dec.
- **Pickup 7d:** bookings made 28 Oct–3 Nov, imports excluded.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.30 | £161.30 | 100% (34%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 76.7% | £110.60 | £84.80 | all blocked (46%) | UNKNOWN: no STLY | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar closed, no labels (51%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 55.2% (23%) | UNKNOWN: no history | 2 / 6 / £748.90 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 63.3% | £385.53 | £244.17 | 75.9% (40%) | UNKNOWN: no STLY | 2 / 6 / £1,953.04 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 83.3% | £196.76 | £163.97 | 63.6% of non-blocked (45%) | UNKNOWN: no STLY | 1 / 3 / £541.00 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | all blocked (24%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £156.76 | £151.54 | 70.0% to 13 Nov (48%) | UNKNOWN: no STLY | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 76.7% | £119.73 | £91.80 | 87.0% to 26 Nov (36%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 83.3% | £106.91 | £89.09 | 100% to 18 Nov (28%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £179.79 | £137.84 | 41.4% (46%) | UNKNOWN: no STLY | 2 / 5 / £995.49 | **Soft** |
| P12 | Mile End | 80.0% | £189.09 | £151.27 | 62.1% (40%) | **−5 n / −£301.34 / −8.8%** | 3 / 12 / £2,738.19 | **On track** (was Soft) |
| P13 | Shepherd's Bush (one flat) | 76.7% | £154.10 | £118.14 | 72.4% (41%) | UNKNOWN: no STLY | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (42%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN: no prices rows | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 63.3% | £163.45* | £103.52* | 44.8% (36%) | UNKNOWN: no STLY | 2 / 13 / £2,252.65 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- **On track 1: P12.** Pace30 −8.8% is now inside ±10%, and fwd30 is 62.1%. On nights it is still −21.7%.
- Soft 4: P04, P11, P14, P20.
- Unclassifiable 8: P05, P08, P13, P15–P19.
- Blocked by policy 4: P02, P03, P06, P07.

**Last 365 nights** (kpi_pack `last365`, 3 Nov 2025–2 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 39.2% / £177.50 / £69.54 / £25,382.02
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 57.0% / £373.29 / £212.72 / £77,644.04
- P06 35.3% / £236.66 / £83.64 / £30,528.58
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 39.7% / £174.73 / £69.41 / £25,335.53
- P09 39.7% / £115.34 / £45.82 / £16,724.08
- P10 38.4% / £114.29 / £43.84 / £16,001.12
- P11 77.3% / £174.42 / £134.76 / £49,186.73
- P12 81.6% / £191.95 / £156.72 / £57,202.08
- P13 77.8% / £158.31 / £123.18 / £44,960.94
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 5.2% / £163.45 / £8.51 / £3,105.57 (short Smoobu history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`, bookings / median lead / median stay / revenue share by channel):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 61 / 44 / 4: Airbnb 100%
- P06 32 / 15 / 4: Airbnb 72.9%, Booking.com 27.1%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 21 / 5: Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- **P11 71 / 28 / 4:** Booking.com 53.4%, Airbnb 44.6%, Agoda 2.0%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 84 / 21 / 3: Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- **P20 6 / 7 / 4:** Airbnb 100%

### Orphan gaps
**Method:**
- Calendar: `prices.csv` 4 Nov–2 Jan plus Smoobu confirmed stays. Tonight and the min stays are checked against Smoobu `/api/rates` (3 Nov 07:20–07:21Z).
- P13 is treated as one calendar, and handbacks are respected. P02, P03 and P07 are left out.
- kpi_pack `gaps` is empty today for every unit.

**Findings, in date order:**
- **P13 3 Nov (tonight): an orphan below the minimum stay.** It is 1 open night after the unsold 2 Nov and before the 4–8 Nov Airbnb arrival. Smoobu shows it available on both listings (£110 on 3064856, £122 on 3090701) with **min 2**, so it can only sell as a 1-night stay, which the min stay blocks. It lapses tonight. Reyhan's 2–12 Nov override with no price value (2 Nov 00:12Z) kept min 2.
- **P12 3–4 Nov:** 2 open nights at min 2 before the 5–12 Nov arrival (Smoobu £170 / £170, with Reyhan's −10% on 2–4 Nov). These are bookable now. **If tonight does not sell, 4 Nov becomes a 1-night orphan below min 2 from tomorrow.**
- **P20 around 10–13 Nov (new stay):** no orphan. It leaves 6–9 Nov as 4 open nights at min 3 (£229 / £233 / £228 / £241), which takes a 3- or 4-night stay only. It also leaves 13–24 Nov as 12 open nights.
  - **Conflict for Corentin to confirm (not a new proposal):** Reyhan's 2 Nov 23:26Z override set **min 2 on 16–19 Nov** (Smoobu confirms m2). Policy `listing_facts.P20.min_stay` says 3 nights from 25 Oct to 30 Nov.
- **P11 around 20–22 Nov (new stay):** no orphan. It splits the former 18 Nov–4 Dec run into **18–19 Nov, 2 nights at exactly min 2** (Smoobu £164 / £183, bookable), and 22 Nov–4 Dec (13 n).
- **P12 26 Nov: no longer an orphan below the minimum stay.** Reyhan's 2 Nov 15:04Z override set **+25% with min 1** (PriceLabs and Smoobu both £352, min 1), so the night is now sellable as a 1-night stay. This was plan item `a-p12-26nov`; the minimum-stay blocker is now cleared.
- **P06 8–11 Nov:** 4 nights at min 2 (£236 / £240 / £246 / £265). Bookable, not an orphan. These are the only sellable P06 nights in the next 60.
- **Runs at exactly the minimum stay (bookable, not orphans):**
  - P05: 9 Nov (min 1, £1,435), 16–17 Nov and 7–8 Dec (min 2), 29 Dec (min 1, £1,354).
  - P12: 12–13 Nov (min 2).
  - P11: 18–19 Nov (min 2) and 23–25 Dec (min 3).
  - P13: 17 Nov, 27 Nov and 1 Dec (min 1; 1 Dec is intentional per policy).
  - P04: 2 Dec (settled by policy).

### Gaps to fill (open nights, next 60)
- **P11:** 10–13 Nov (4 n), 18–19 Nov, 22 Nov–4 Dec (13 n), 8–18 Dec (11 n), 23–25 Dec. 41.4% booked vs market 46% for the next 30.
- **P20:** 6–9 Nov (min 3), 13–24 Nov (12 n), 5 Dec–1 Jan (28 n). Next 60 is 25.4% vs 30%.
- **P12:** 3–4 Nov (tonight onward), 12–13 Nov, 17–20 Nov, 26 Nov (1 n, min 1), 30 Nov–2 Dec, 7–13 Dec.
- **P04:** 9–13 Nov (5 n), 18–24 Nov (7 n), 6–19 Dec (14 n). 55.2% booked for the next 30.
- **P13:** 3 Nov (orphan tonight), 8–12 Nov (5 n), 7–26 Dec (20 n).
- **P06:** 8–11 Nov.
- **P05:** 9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec.
- **P08** 5–7 Nov and **P09** 10–12 Nov: the last open nights before handback.
- **P14:** all 60 nights (special setup, numbers only).

Data gaps:
- **Pace vs STLY:** UNKNOWN for every unit except P12, because `reservations.csv` has no STLY stays for them. P03, P04 and P15–P19 have no history. P12 pace90 ignores the handback.
- **Last 30 / last 365:** UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped).
- **Market:**
  - Last-30 market occupancy is UNKNOWN: there is no such field in `pl_kpis.csv`, and kpi_pack `missing.market` says market.csv is empty.
  - ARI and RGI are UNKNOWN because comps.csv is empty.
  - channel_checks.csv is not in the 3 Nov snapshot. This section added no rows.
- **Forward:**
  - Tonight is not in `prices.csv`; Smoobu `/api/rates` was used instead.
  - PriceLabs still shows P11 20–21 Nov as available; Smoobu was used as truth.
  - The P03 calendar is closed with no labels. P15–P19 have no prices rows.
- **Cancellations:** `reservations.csv` has no cancel date, so Smoobu `modifiedAt` is used; its timezone and the Smoobu created-at timezone are not stated. Rate plans and retained fees on the cancellations are UNKNOWN.
- **Base-rise analysis:**
  - The P13 235→250 base change is unconfirmed.
  - P11 and P12 now carry −5% and −10% overrides, so the "raised" group is mixed.
  - P04 is excluded (20 Oct import).
- `get_customizations` and `get_listing_date_overrides` were NOT CHECKED in this section; override effects are read from `get_user_logs` and price moves only.
- **Barking unsynced Airbnb 1455876748739910219** (3–6 / 6–9 Nov double-booking risk): NOT CHECKED here; it is covered by the channel section.

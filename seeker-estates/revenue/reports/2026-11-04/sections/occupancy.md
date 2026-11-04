## Occupancy & performance

**Portfolio, last 30 nights (5 Oct–3 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 67.4%, ADR £170.10, RevPAR £114.71, revenue £44,737.32 (263 n). Source: `reports/2026-11-04/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice, room only, cleaning excluded. Yesterday's window (4 Oct–2 Nov) was 67.4% / £170.81 / £115.19 / £44,922.70.
- **Last 365 nights (4 Nov 2025–3 Nov 2026):** 45.2%, ADR £184.06, RevPAR £83.13, revenue £394,435.06 (2,143 n). Source: kpi_pack `portfolio_last365`. Most Smoobu history starts in 2026, so this understates a full year.
- P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Booked next 30 nights (5 Nov–3 Dec, 29 nights; `prices.csv` 4 Nov starts at 5 Nov):** Smoobu confirmed stays are the truth, and handbacks are respected. **175 of 281 non-blocked nights = 62.3%** (yesterday 61.5%).
- If the new P20 18–19 Nov block is counted as available, the figure is 175/283 = 61.8%.
- Blocked nights excluded: P01 4 (30 Nov–3 Dec, handback gap block), P06 19 (policy), and P20 2 (18–19 Nov; see below).
- P02, P03 and P07 are blocked on purpose (policy).

**Booked next 60 nights (5 Nov–2 Jan, 59 nights): 240 of 474 = 50.6%** (yesterday 50.6%).

**PriceLabs vs Smoobu (`prices.csv` 4 Nov vs Smoobu GET /api/rates, pulled 4 Nov 07:19Z):**
- No night is shown as Booked in PriceLabs without a Smoobu stay, and no PriceLabs-open night is closed in Smoobu.
- P11 26–28 Nov shows as Booked in both.
- **P11 12–13 Dec (the cancelled booking) are open again in both**: PriceLabs £321 / £229 and Smoobu £321 / £229, min 2.

**Tonight, 4 Nov** (Smoobu /api/rates 07:19Z; not in `prices.csv`):
- Booked: P01, P04 (Booking.com 3–6 Nov), P05, P06, P08, P09, P10, P11, P13 and P20.
- Open: **P12** (£302, min 1) and P14 (special setup).

**3 Nov lapsed unsold** on both P12 and P13: `reservations.csv` 4 Nov has no confirmed stay covering 3 Nov for either.

### Booked vs market, next 30 / next 60 (Smoobu truth; market = kpi_pack `market_occ_30/60` from `pl_kpis.csv` 4 Nov)

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (25/25 non-blocked) | 34% | 100% (28/28, to handback 20 Dec) | 29% |
| P04 | 55.2% (16/29) | 23% | 52.5% (31/59) (was 54.2%) | 20% |
| P05 | 75.9% (22/29) | 40% | 67.8% (40/59) | 39% |
| P06 | 60.0% of non-blocked (6/10; 19 blocked on purpose) | 47% | same 6/10 (49 blocked) | 42% |
| P08 | 66.7% (6/9, to handback 13 Nov) | 48% | same | 43% |
| P09 | 86.4% (19/22, to handback 26 Nov) | 36% | same | 32% |
| P10 | 100% (14/14, to handback 18 Nov) | 29% | same | 24% |
| P11 | **48.3% (14/29)** (was 41.4%) | 45% | **49.2% (29/59)** (was 44.1%) | 40% |
| P12 | 65.5% (19/29) (was 62.1%) | 40% | 56.4% (22/39, to handback 13 Dec) | 34% |
| P13 (one flat) | 72.4% (21/29) | 41% | 52.5% (31/59) | 38% |
| P14 (special setup, numbers only) | 0% (0/29) | 42% | 0% (0/59) | 39% |
| P20 | 48.1% (13/27 non-blocked); 44.8% if 18–19 Nov counted | 36% | 24.6% (14/57) | 30% |

- **P11 is now above market for the next 30** (48.3% vs 45%; it was 41.4% vs 46%). The change is the 26–29 Nov booking (+3 n), less 4 Nov (booked) leaving the window.
- **P12 rose to 65.5%** because 3 Dec (booked, 3–7 Dec stay) entered the window and 4 Nov (open) left it. It has no new booking.
- **P01, P06, P08, P09 and P10 dropped by one booked night each** because a booked night left the window. None of them lost a booking.
- **P20 has a new Smoobu "Blocked channel" block on 18–20 Nov** (created 3 Nov 10:31; PriceLabs shows Blocked on 18–19 Nov).
  - Policy records the delivery block as 20–22 Nov. That block was cancelled in Smoobu on 30 Oct 18:11.
  - The reason for the new block is not recorded: **Corentin to confirm whether it is the moved delivery.**

### 7-day pickup, net of cancellations (bookings made 29 Oct–4 Nov; 4 Nov partial)
Imported past stays are excluded; there are none in the window.

**Sources:**
- Bookings: `reservations.csv` 4 Nov, column `booked_on`. Confirmed rows match kpi_pack `pickup_7d` for every unit.
- Cancel time: Smoobu `modifiedAt` from GET /api/reservations (pulled 4 Nov 07:19Z, guest fields dropped). The latest Smoobu created-at is 3 Nov 19:44, so nothing has been booked on 4 Nov so far.

**Overnight (made 3 Nov):**
- **P11 26–29 Nov, Booking.com, confirmed:** £680.40 room, £226.80/n.
  - That is 0.932× PriceLabs (208+253+269 = £730, `2026-11-03/raw/prices_3064196.json`, refreshed 2 Nov 15:05Z).
  - Lead time 23 days. Commission £149.29 = 21.9% of room.
  - The dates carry Reyhan's −5% P11 override (10 Nov–18 Dec, set 2 Nov 15:05Z).
- **P11 12–14 Dec, Booking.com, cancelled:** created 3 Nov 17:58 and cancelled 18:00:55, about 3 minutes later. Room £486.68 = 0.883× PriceLabs (£323 + £228 = £551). Both nights are open again (see above).

**Totals for the window:**
- **Gross bookings made:** 10 / 29 n / £6,682.78. This includes the P11 Dec booking; confirmed rows alone are 9 / 27 n / £6,196.10.
- **Cancellations:** 3 / 6 n / £1,058.50:
  - P04 20–23 Nov, 3 n / £355.82, cancelled 30 Oct 12:01;
  - P04 19–20 Dec, 1 n / £216.00, cancelled 31 Oct 14:36;
  - P11 12–14 Dec, 2 n / £486.68, cancelled 3 Nov 18:00.
- **Net: +23 n / +£5,624.28.** A booking made and cancelled inside the window nets to zero.
  - Yesterday's method (confirmed rows minus all cancellations) gives +21 n / +£5,137.60, because it charges the P11 Dec booking only as a cancellation. Yesterday's net was +33 n / +£6,754.31.
  - The drop is mostly from the window moving: the 28 Oct bookings left it. No other booking was cancelled.

| Ref | Made 29 Oct–4 Nov, confirmed (bk / n / £) | Cancelled in window (stay, n / £) | Net n / £ |
|---|---|---|---|
| P05 | 2 / 6 / £1,953.04 | — | +6 / +£1,953.04 |
| P12 | 2 / 7 / £1,725.83 | — | +7 / +£1,725.83 |
| P11 | 2 / 5 / £1,110.51 (plus 12–14 Dec made and cancelled) | 12–14 Dec, 2 n / £486.68 (same day) | +5 / +£1,110.51 |
| P06 | 1 / 3 / £541.00 | — | +3 / +£541.00 |
| P20 | 1 / 3 / £510.00 | — | +3 / +£510.00 |
| P04 | 1 / 3 / £355.72 | 20–23 Nov 3 n / £355.82; 19–20 Dec 1 n / £216.00 | −1 / −£216.10 |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

`reservations.csv` lists the P04 20–23 Nov cancellation 3 times (identical rows); it is counted once.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 4 Nov; cancelled bookings excluded on both sides)
Only **P12 Mile End** has Smoobu stays in the same-time-last-year windows. Up-to-handback figures are recomputed with `rm.metrics.on_the_books` on `reservations.csv` 4 Nov.

| P12 measure | 3 Nov | 4 Nov |
|---|---|---|
| Pace30 (stays 4 Nov–3 Dec) | −5 n / −£301.34 / −8.8% | **19 n / £3,397.96 vs 26 n / £3,867.38 = −7 n / −£469.42 / −12.1%** |
| Up to handback (stays 4 Nov–13 Dec) | −8 n / −18.3% | 22 n / £4,202.29 vs 33 n / £5,577.39 = −11 n / −£1,375.10 / −24.7% |
| Pace90 (stays 4 Nov–1 Feb; ignores the handback) | −48.1% | 22 n / £4,202.29 vs 45 n / £8,530.08 = −23 n / −£4,327.79 / −50.7% |

- **P12 is back to Soft.** It has had no new booking since 1 Nov.
  - The STLY window gained 3 n / £436.19 as it moved forward one day. The current window gained only the 3 Dec night (+£268.11), and 4 Nov is unsold.
- Pace for every other unit is UNKNOWN: `reservations.csv` has no STLY stays for them.
- **On the books for stays 4 Nov–3 Dec** (kpi_pack `pace_30`, n / £):
  - P01 26 / £3,955.38; P05 23 / £10,744.26; P06 7 / £1,523.60; P08 7 / £911.78; P09 20 / £2,059.44; P10 15 / £1,589.46.
  - **P11 15 / £2,908.44** (was 13 / £2,374.84); P13 22 / £3,241.37; P20 14 / £2,445.19.
  - P02, P07 and P14 are 0. P04 is UNKNOWN in the pack.

### 18 Oct base rises: running effect (rises logged 18 Oct 20:33–20:43Z)
**What is compared:**
- **Windows:** bookings made **19 Oct–3 Nov (16 days)** against **3–18 Oct (16 days)**. Only confirmed rows count, and imports are excluded.
- **Cancellations:** split at 18 Oct 20:33 using Smoobu `modifiedAt`.
- **Groups:** P04 is left out (Smoobu since 20 Oct). Source: `reservations.csv` 4 Nov plus Smoobu GET /api/reservations 4 Nov.

| Group | Made 19 Oct–3 Nov (bk / n / £; per day) | Made 3–18 Oct (bk / n / £; per day) | After ÷ before per day (bk / n / £) |
|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 15 / 51 / £10,710.73 (0.94 / 3.19 / £669.42) | 14 / 98 / £19,226.61 (0.88 / 6.13 / £1,201.66) | **1.07× / 0.52× / 0.56×** (was 1.08× / 0.53× / 0.55×) |
| **Unraised** (P02, P08, P10, P14, P20*) | 6 / 29 / £4,717.79 (0.38 / 1.81 / £294.86) | 7 / 68 / £8,054.83 (0.44 / 4.25 / £503.43) | **0.86× / 0.43× / 0.59×** (unchanged) |
| P13 (base 235→250 on 24 Oct, unconfirmed) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.33× / 0.67× / 0.80× |

\* P20's base was cut 380→350 on 24 Oct and 350→330 on 2 Nov.

**Net since the rise (made minus cancelled):**
- **Raised, on yesterday's basis: +5 n / +£936.42** (was +4 n / +£742.70). The +1 n / +£193.72 change is the P11 26–29 Nov booking (+3 n / +£680.40) minus the same-day P11 12–14 Dec cancellation (−2 n / −£486.68).
- **Method correction:** yesterday's basis counts bookings that were made after the rise and then cancelled only as cancellations, so their nights are deducted without ever being added. Two such bookings exist: P12 4–8 Dec (made 26 Oct, cancelled 28 Oct, 4 n / £1,116.99) and P11 12–14 Dec. Counting each as made and cancelled, so they net to zero, gives **Raised: +11 n / +£2,540.09.**
- Unraised: **+29 n / +£4,717.79** (unchanged). Its made-and-cancelled bookings (P20 cancelled 19 Oct; P08 27 Oct, cancelled the same day) net to zero. Yesterday's "0 cancellations" was right in effect.
- P13: +16 n / +£2,909.76 (unchanged).

**Per raised property** (made 19 Oct–3 Nov vs 3–18 Oct, bk / n / £; then cancellations after the rise; then corrected net):
- **P01:** 1 / 3 / £720.90 vs 1 / 30 / £4,563.90. No cancellations. Net +3 n / +£720.90. Last booking made 19 Oct.
- **P05:** 2 / 6 / £1,953.04 vs 2 / 11 / £6,363.05. No cancellations. Net +6 n / +£1,953.04.
- **P06:** 2 / 6 / £1,345.77 vs 4 / 18 / £3,400.07. No cancellations. Net +6 n / +£1,345.77.
- **P09:** 1 / 2 / £253.21 vs 3 / 23 / £2,371.55. No cancellations. Net +2 n / +£253.21. No booking since 23 Oct.
- **P11:** **4 / 11 / £2,331.96** vs 2 / 11 / £1,678.06.
  - Cancellations: 3 / 24 n / £5,173.91, of which 2 / 22 n / £4,687.23 were booked before the rise.
  - **Net −11 n / −£2,355.27** (on yesterday's basis −13 n / −£2,841.95; was −14 n / −£3,035.67).
- **P12:** 5 / 23 / £4,105.85 vs 2 / 5 / £849.98.
  - Cancellations: 4 / 22 n / £4,600.40, of which 3 / 18 n / £3,483.41 were booked before the rise.
  - **Net +5 n / +£622.44** (on yesterday's basis +1 n / −£494.55).

**Running line:**
- Booking count per day is level after the rise (raised 1.07×, unraised 0.86×).
- Nights and revenue per day fell by a similar share in both groups (nights 0.52× vs 0.43×; revenue 0.56× vs 0.59×).
- The raised group's net is positive for a third day.
- The only raised-group bookings since 2 Nov (P11 20–22 Nov at 0.889× and 26–29 Nov at 0.932× PriceLabs) were sold on dates carrying Reyhan's −5% override. They are not clean evidence that the raised base clears.
- **Effects that cannot be separated:** the 24 Oct Booking.com markup cut, Booking.com Last Minute, the Airbnb flexible-cancellation test (P05/P06/P20), and Reyhan's 30 Oct–4 Nov overrides.
- **New overrides on raised flats, 4 Nov 01:24–01:28Z (`get_user_logs`):**
  - P12: −15% on 16–25 Nov and on 27 Nov–13 Dec (was −10%); −10% on 12–13 Nov (was −5%); +15% min 1 on 4 Nov and on 26 Nov.
  - P11: +5% min 3 on 23 Dec; +7% min 2 on 24–25 Dec.
  - P06: −5% min 2 on 8–14 Nov.
  - P05: −7% min 3 on 13–19 Dec.
- These overrides make the raised group even less cleanly "raised" for November–December stays.
- **Sample is small:** 1–5 bookings per property, and the 3–18 Oct base includes long stays (P01 30 n; P05 £4,527.95).

### Per-property table
Column sources:
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 5 Oct–3 Nov.
- **Fwd occ30:** 5 Nov–3 Dec, Smoobu truth, handback-aware; market in brackets.
- **Pace30:** stays 4 Nov–3 Dec.
- **Pickup 7d:** confirmed bookings made 29 Oct–4 Nov.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £160.96 | £160.96 | 100% (34%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 73.3% | £110.52 | £81.05 | all blocked (46%) | UNKNOWN: no STLY | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar closed (51%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 55.2% (23%) | UNKNOWN: no history | 1 / 3 / £355.72 (net −1 n / −£216.10) | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 63.3% | £379.92 | £240.62 | 75.9% (40%) | UNKNOWN: no STLY | 2 / 6 / £1,953.04 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 86.7% | £196.03 | £169.90 | 60.0% of non-blocked (47%) | UNKNOWN: no STLY | 1 / 3 / £541.00 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | all blocked (23%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £155.58 | £150.40 | 66.7% to 13 Nov (48%) | UNKNOWN: no STLY | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 76.7% | £119.40 | £91.54 | 86.4% to 26 Nov (36%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 86.7% | £106.87 | £92.62 | 100% to 18 Nov (29%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £178.53 | £136.87 | 48.3% (45%) | UNKNOWN: no STLY | 2 / 5 / £1,110.51 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £189.15 | £145.01 | 65.5% (40%) | **−7 n / −£469.42 / −12.1%** | 2 / 7 / £1,725.83 | **Soft** (was On track) |
| P13 | Shepherd's Bush (one flat) | 73.3% | £153.62 | £112.66 | 72.4% (41%) | UNKNOWN: no STLY | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (42%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN: no prices rows | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 66.7% | £164.45* | £109.63* | 48.1% of non-blocked (36%) | UNKNOWN: no STLY | 1 / 3 / £510.00 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 0.
- Soft 5: P04, P11, P12, P14, P20.
- Unclassifiable 8: P05, P08, P13, P15–P19.
- Blocked by policy 4: P02, P03, P06, P07.

**Last 365 nights** (kpi_pack `last365`, 4 Nov 2025–3 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 39.5% / £177.32 / £69.96 / £25,534.15
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 57.3% / £373.17 / £213.68 / £77,991.89
- P06 35.6% / £236.20 / £84.13 / £30,706.40
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.0% / £174.46 / £69.78 / £25,470.85
- P09 40.0% / £115.20 / £46.08 / £16,819.71
- P10 38.6% / £114.23 / £44.13 / £16,107.09
- P11 77.5% / £174.32 / £135.16 / £49,333.53
- P12 81.4% / £192.19 / £156.38 / £57,080.44
- P13 77.8% / £158.31 / £123.18 / £44,960.94
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 5.5% / £164.45 / £9.01 / £3,288.97 (short Smoobu history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / revenue share by channel):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 61 / 44 / 4: Airbnb 100%
- P06 32 / 15 / 4: Airbnb 72.9%, Booking.com 27.1%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 21 / 5: Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 84 / 21 / 3: Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 6 / 7 / 4: Airbnb 100%

### Orphan gaps (next 30, plus runs to 2 Jan)
**Method:**
- Calendar: Smoobu /api/rates, 4 Nov–2 Jan (pulled 07:19Z), for availability, minimum stay and price. Checked against `prices.csv` 4 Nov.
- P13 is treated as one calendar (open if either listing is open). Handbacks are respected. P02, P03 and P07 are left out.
- kpi_pack `gaps` is empty for every unit.

**No orphan below the minimum stay exists in the next 30 or the next 60.**
- **P12 4 Nov (tonight): no longer an orphan below the minimum stay.**
  - Reyhan's 4 Nov 01:24Z override set **+15% with min 1**. Smoobu and PriceLabs both show £302, min 1, available. Yesterday's Smoobu £170 vs PriceLabs £196 gap is closed: PriceLabs `price` 302 = Smoobu 302 (`get_listing_prices`, refreshed 01:25Z).
  - PriceLabs labels the night "Low Demand", with uncustomized price £178. The night lapses tonight. This was plan item t-p12-4nov: the minimum-stay blocker is fixed.
- **P13 3 Nov orphan lapsed unsold** (plan item t-p13-3nov).
- **P11 12–13 Dec (from the cancellation):** no orphan. It rejoins 8–18 Dec as 11 open nights at min 2.
- **P11 around 26–29 Nov (new stay):** no orphan. It splits 22 Nov–4 Dec into **22–25 Nov** (4 n) and **29 Nov–4 Dec** (6 n), both at min 2.
- **P20 around the new 18–20 Nov block:** no orphan. It splits 13–24 Nov into:
  - 13–17 Nov (5 n; min 3 on 13–15, min 2 on 16–17);
  - 20–24 Nov (5 n, min 3).
  - **Conflict for Corentin to confirm (not a new proposal):** Reyhan re-set **min 2 on 16–19 Nov** (with −5%) at 4 Nov 01:29Z. Policy `listing_facts.P20.min_stay` says 3 nights from 25 Oct to 30 Nov.
- **Runs at exactly the minimum stay** (bookable, not orphans):
  - P12: 4 Nov (min 1, £302), 12–13 Nov (min 2, £199), 26 Nov (min 1, £311; Reyhan changed +25% to +15% at 01:24Z).
  - P11: 18–19 Nov (min 2, £159).
  - P13: 17 Nov, 27 Nov and 1 Dec (min 1; 1 Dec is intentional per policy).
  - P05: 9 Nov (min 1, £1,411), 16–17 Nov and 7–8 Dec (min 2), 29 Dec (min 1, £1,277).
  - P04: 2 Dec (settled by policy).

### Gaps to fill (open nights, Smoobu 4 Nov)
- **P11:** 10–13 Nov (4 n), 18–19 Nov, 22–25 Nov (4 n), 29 Nov–4 Dec (6 n), 8–18 Dec (11 n), 23–25 Dec (min 3).
- **P20:** 6–9 Nov (min 3), 13–17 Nov, 20–24 Nov, 5 Dec–2 Jan (29 n). Next 60 is 24.6% vs 30% market.
- **P12:** 4 Nov (tonight), 12–13 Nov, 17–20 Nov, 26 Nov, 30 Nov–2 Dec, 7–13 Dec.
- **P04:** 9–13 Nov (5 n), 18–24 Nov (7 n), 6–19 Dec (14 n).
  - Reyhan set **−15% min 3 on 9–24 Nov** at 4 Nov 01:30Z. Policy `price_changes` (24 Oct, Corentin) records −8% on 1–25 Nov. **Conflict for Corentin to confirm.** The 3-night minimum is respected.
- **P13:** 8–12 Nov (5 n; Reyhan −7% min 2 at 01:26Z), 7–26 Dec (20 n).
- **P06:** 8–11 Nov (Reyhan −5% min 2 on 8–14 Nov at 01:28Z).
- **P05:** 9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec.
- **Last nights before handback** (plan item a-handback-lastnights):
  - **P08 5–7 Nov:** Smoobu £168 / £186 / £185, min 2. Reyhan applied −5% min 2 on 4–21 Nov at 01:28Z, not the planned +10%.
  - **P09 10–12 Nov:** £100 / £110 / £131, min 2. There is no P09 log entry since 3 Nov, and P09's last PriceLabs push was 3 Nov 07:37Z.
- **P14:** all nights (special setup, numbers only).

Data gaps:
- **Pace vs STLY:** UNKNOWN for every unit except P12, because `reservations.csv` has no STLY stays for them. P03, P04 and P15–P19 have no history. P12 pace90 ignores the handback.
- **Last 30 / last 365:** UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped).
- **Market:**
  - Last-30 market occupancy is UNKNOWN; kpi_pack `missing.market` is empty.
  - ARI and RGI are UNKNOWN because comps.csv is empty.
  - This section added no rows to market.csv, comps.csv or channel_checks.csv.
- **Forward:**
  - Tonight is not in `prices.csv`; Smoobu /api/rates and `get_listing_prices` were used instead.
  - The P20 18–20 Nov block has no recorded reason.
  - The P03 calendar is closed with no labels. P15–P19 have no prices rows.
- **Cancellations:**
  - `reservations.csv` has no cancel date, so Smoobu `modifiedAt` is used; the timezones of `modifiedAt` and created-at are not stated.
  - `reservations.csv` holds 3 duplicate rows for the P04 20–23 Nov cancellation.
  - Retained fees on cancellations are UNKNOWN.
- **Base-rise analysis:**
  - The P13 235→250 base change is unconfirmed.
  - The raised group carries new negative overrides (P06, P11, P12, P05).
  - The method was corrected today for bookings made and cancelled after the rise; both bases are shown.
- `get_customizations` and `get_listing_date_overrides` were NOT CHECKED here; changes are read from `get_user_logs` (37 listing entries, 4 Nov 01:24–01:31Z, all by Reyhan; none between 3 Nov 06:00Z and 4 Nov 01:24Z).
- **Barking unsynced Airbnb 1455876748739910219** (4–6 / 6–9 Nov double-booking check): NOT CHECKED in this section. Smoobu shows P04 tonight unavailable (Booking.com 3–6 Nov) and an Airbnb stay 6–9 Nov recorded in Smoobu (booked 29 Oct). Which Airbnb listing it came from was not checked here.

## Occupancy & performance

**Portfolio, last 30 nights (29 Sep–28 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 70.0%, ADR £173.19, RevPAR £121.23, revenue £47,281.30 (273 nights). Yesterday's window: 69.7% / £173.92 / £121.29 / £47,304.92.
- **Last 365 nights (29 Oct 2025–28 Oct 2026):** occupancy 44.4%, ADR £184.35, RevPAR £81.78, revenue £388,066.83 (2,105 nights). This occupancy is understated: the denominator is 365 days, but most units' first Smoobu stay is in 2026 (P01 18 May, P05 28 Feb, P06 21 May, P08 14 May, P09 16 May, P10 17 May, P20 10 Oct; first-arrival dates are from `reservations.csv`).
- Source: `reports/2026-10-29/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). Revenue is Smoobu `basePrice` (room only, cleaning excluded). P03, P04 (`smoobu_since` 2026-10-20) and P15–P19 are left out, not counted as zero.

**Forward next 30 nights (30 Oct–27 Nov; `prices.csv` starts 30 Oct, so 29 nights), handback-aware:** 185 of 308 non-blocked nights booked = **60.1%**. Yesterday: 60.5% (184/304).
- Units counted: P01, P04, P05, P06, P08–P14 and P20. Booked nights are confirmed Smoobu stays (`reservations.csv`) on the `prices.csv` calendar.
- Blocked nights excluded: P06 13 (blocked on purpose), P20 2 (20–21 Nov delivery, policy), P05 1 (30 Oct). P02 and P07 (blocked on purpose) and P03 (calendar unlabelled) are left out.

**Forward next 60 nights (30 Oct–27 Dec), handback-aware, P12 corrected:** 246 of 509 non-blocked nights = **48.3%**. The kpi_pack basis gives 250/509 = 49.1%; the difference is P12 (next bullet).
- **The analyser overstates P12's next 60.** kpi_pack `forward_occ_60` = 46.7% (21/45 nights). That counts 4–7 Dec as booked because PriceLabs still showed them Booked when it was pulled. Smoobu cancelled that stay on 28 Oct at 22:12.
- On Smoobu's confirmed stays P12 has 17/45 = **37.8%** (market next 60: 32%).
- Cause: `rm/checks.py` `link_bookings` adds Smoobu bookings to the calendar but never clears nights that Smoobu has cancelled.

**7-day pickup (bookings made 23–29 Oct; 29 Oct partial, none yet), past-stay imports excluded: 16 bookings, 76 nights, £12,433.77 room revenue.**
- **Change from the pack:** kpi_pack P04 shows 5 / 15 / £1,841.89. That includes the Airbnb stay of 28 Sep–2 Oct (£439.20), imported on 26 Oct after it had ended, which is removed here.
- **Also left out:** P04 Airbnb 19–20 Dec (1 n, £216.00), created in the same 26 Oct 14:08 import batch, so its real booking date is UNKNOWN. Counting it gives 17 / 77 / £12,649.77.
- **Cancellations in the same window: 5 real, 37 nights, £7,904.77 room revenue.** Cancel time is Smoobu `modifiedAt` (GET /api/reservations, modified 25 Sep–29 Oct). Duplicates that were replaced by live bookings are left out (P04 20–23 Nov ×2, P08 27–30 Oct).
- **Net 7-day change:** +39 nights, +£4,529.00.

| Ref | Pickup 23–29 Oct (bk / n / £) | Cancelled 23–29 Oct (stay, n / £, cancel date) |
|---|---|---|
| P13 | 2 / 16 / £2,909.76 | — |
| P20 | 2 / 14 / £2,476.27 | — |
| P12 | 3 / 16 / £2,380.02 | 22–29 Nov 7 n / £1,314.40 (25 Oct); 18–22 Nov 4 n / £786.15 (28 Oct 13:27); 4–8 Dec 4 n / £1,116.99 (28 Oct 22:12) |
| P11 | 2 / 6 / £1,221.45 | 19–27 Nov 8 n / £1,736.41 (23 Oct); 28 Nov–12 Dec 14 n / £2,950.82 (27 Oct) |
| P08 | 2 / 9 / £1,201.60 | duplicate only |
| P04 | 3 / 10 / £1,186.69 (+19–20 Dec, date unknown) | duplicates only |
| P06 | 1 / 3 / £804.77 | — |
| P09 | 1 / 2 / £253.21 | — |
| P01, P02, P05, P10, P14 | 0 | — |

### Overnight change (28 Oct → 29 Oct `reservations.csv` diff; created and cancelled times from Smoobu)
- **New: P04 Barking, Booking.com 3–6 Nov, 3 n, £393.18 room (£131.06/n).** Created 28 Oct 21:16. PriceLabs had not yet picked it up: 3–5 Nov still show open in `prices.csv`.
- **New: P12 Mile End, Booking.com 21–26 Nov, 5 n, £1,012.36 room (£202.47/n).** Created 28 Oct 18:06, about 4.5 hours after the 18–22 Nov cancellation. It refills 21 Nov from that stay and 22–25 Nov from the 25 Oct cancellation. PriceLabs had not picked it up: 21–25 Nov still show available in `prices.csv`.
- **New: P20 Waterford, Airbnb 25 Nov–5 Dec, 10 n, £1,742.65 room (£174.27/n).** Created 28 Oct 14:11. It leaves 22–24 Nov as a 3-night open run, at P20's min stay of 3.
- **Cancelled: P12 Booking.com 18–22 Nov, 4 n, £786.15.** Booked 19 Sep, cancelled 28 Oct 13:27.
- **Cancelled: P12 Booking.com 4–8 Dec, 4 n, £1,116.99.** Booked 26 Oct 18:49, cancelled 28 Oct 22:12, so held for 2 days.

### P12 Mile End: Booking.com cancellations in the last 30 days (cancel date 29 Sep–29 Oct)
Sources:
- Cancel and create times: Smoobu GET /api/reservations (`created-at`, `modifiedAt`).
- Rebooking: confirmed rows in `data/snapshots/2026-10-29/reservations.csv`.
- Prices: `prices.csv`.
- Room = `basePrice`.

| Stay | n | Room (£/n) | Booked | Cancelled | Lead at booking | Days held | Days before arrival | Guests (adults+children) | Rebooked since (£/n vs cancelled) |
|---|---|---|---|---|---|---|---|---|---|
| 5–10 Dec | 5 | £1,292.09 (£258.42) | 20 Sep | 18 Oct 11:03 | 76 | 28 | 48 | 5+1 | 5–7 Dec were rebooked 26 Oct, then cancelled 28 Oct. **0 of 5 now** |
| 1–8 Nov | 7 | £1,382.86 (£197.55) | 3 Oct | 22 Oct 11:27 | 29 | 19 | 10 | 5+0 | **3 of 7** (5–7 Nov in the 5–12 Nov booking made 24 Oct, £133.27/n, −32.5%). 1–4 Nov open |
| 22–29 Nov | 7 | £1,314.40 (£187.77) | 15 Sep | 25 Oct 11:57 | 68 | 40 | 28 | 6+0 | **4 of 7** (22–25 Nov, £202.47/n, +7.8%). 26–28 Nov open |
| 18–22 Nov | 4 | £786.15 (£196.54) | 19 Sep | 28 Oct 13:27 | 60 | 39 | 21 | 2+4 | **1 of 4** (21 Nov, £202.47/n, +3.0%). 18–20 Nov open |
| 4–8 Dec | 4 | £1,116.99 (£279.25) | 26 Oct | 28 Oct 22:12 | 39 | 2 | 37 | 6+0 | **0 of 4** |

**Pattern (facts only):**
- **5 cancellations, 27 nights, £5,892.49 of room revenue.** All are Booking.com.
  - In the same 30 days P12 took 5 Booking.com bookings (by `booked_on`). 2 of them are among the 5 cancelled (1–8 Nov and 4–8 Dec).
  - Just outside the window: 24–31 Oct (£1,175.54), booked 21 Sep and cancelled 25 Sep.
- **Four of the five were long-lead bookings made 15 Sep–3 Oct**, before the 18 Oct base rise and under the +30% Booking.com markup. Lead times were 29–76 days. They were held 19–40 days and cancelled 10–48 days before arrival.
  - The fifth (4–8 Dec) was made after the rise and the markup cut, at the highest rate of the five (£279.25/n), and cancelled within 2 days.
- **Every cancellation was 10 or more days before arrival.** Policy says Mile End's Standard rate is "Flexible-7 days", so all five fell inside a free-cancellation period if they were on Standard.
  - Which rate plan each booking used (NR or Standard) is not in Smoobu: UNKNOWN.
  - Any cancellation fee kept: UNKNOWN. Smoobu shows `price-paid` "No" on all five, and no fee line.
- **Party size:** four of the five were for 6 guests (5+1, 6+0, 2+4, 6+0), and one was for 5.
- **September cohort:** P12 took 9 Booking.com bookings made 13–21 Sep, and **8 of them are now cancelled**. The same late-October week was booked three times (23–31 Oct on 15 Sep, 24–31 Oct on 20 Sep and on 21 Sep) and cancelled all three times. The two cancelled on 15 Sep and 20 Sep were cancelled the day they were made.
  - Cancel dates for the 13 Sep bookings (6–14 Oct and 10–13 Oct) are NOT CHECKED; they did not come back from Smoobu's modified-date query.
- **Rebooking:** the five cancellations released 24 distinct nights in the managed window (5–8 Dec was cancelled twice).
  - **8 have been rebooked:** 5–7 Nov at £133.27/n, which is 32.5% below the cancelled rate (the 5–12 Nov booking paid 0.556× the Booking.com list price, per policy `booking_discount_stack_24oct`), and 21–25 Nov at £202.47/n, 3.0–7.8% above.
  - **16 are still open:** 1–4 Nov, 18–20 Nov, 26–28 Nov and 4–9 Dec.
  - On the 8 rebooked nights, the cancelled stays were worth £1,540.27 and the rebookings are worth £1,412.16.
- **Compared with other flats:** across the whole of `reservations.csv` (Oct 2025–Dec 2026), P12's Booking.com cancellation share is 39 of 110 bookings (35.5%). P11 is 23/62 (37.1%), P02 17/50 (34.0%) and P13 21/68 (30.9%). On that file-wide basis P12 is in line with them. What stands out is the recent clustering.
- **PriceLabs calendar lag on P12** (`prices.csv` / `raw/prices_2699998.json`): 4–7 Dec still show Booked (cancelled in Smoobu), and 21–25 Nov show available (booked in Smoobu). For the pricelabs section.

**P12 pace** (`rm.metrics`; kpi_pack `pace_30`; handback is after 13 Dec):

| Measure | 28 Oct | 29 Oct |
|---|---|---|
| Pace30 (stays 29 Oct–27 Nov vs STLY) | −4 n / −10.5% | **18 n / £2,903.93 vs 22 n / £3,130.89 = −4 n / −7.2%** |
| To handback (stays 29 Oct–13 Dec vs as of 29 Oct 2025) | −10 n / −26.9% | **18 n / £2,903.93 vs 31 n / £5,184.57 = −13 n / −44.0%** |
| Pace90 (kpi_pack, not handback-aware) | −18 n / −49.6% | 18 n / £2,903.93 vs 39 n / £7,585.37 = −21 n / −61.7% |

- Pace30 improved because the 21–26 Nov booking (5 n) outweighs the 18–22 Nov cancellation inside the 30-day window.
- To handback, P12 is 13 nights behind STLY. The 4–8 Dec cancellation and the 18–20 Nov nights are the new losses since yesterday.
- **Class: Soft.** Fwd30 is 58.6% (<60%), even though pace30 (−7.2%) is within ±10%.

### 18 Oct base rises: running effect
How this was built:
- **Windows:** bookings made 18–28 Oct (11 full days) vs 4–17 Oct (14 days).
- **Bookings:** `data/snapshots/2026-10-29/reservations.csv` `booked_on`, confirmed rows only, past-stay imports excluded.
- **Cancellations:** dated by Smoobu `modifiedAt` (fetched for 25 Sep–29 Oct, so today the pre-rise window has a cancellation baseline too). Duplicate or replacement cancellations are excluded: P06 25–30 Oct, cancelled 15 Oct and rebooked as 25 Oct–5 Nov the next day; P08 27–30 Oct.
- **Groups:**
  - Raised: P01 253, P05 500 (550 from 20 Oct), P06 357, P09 176, P11 286, P12 284 (policy `price_changes`).
  - Unraised: P02, P08, P10, P13, P14, P20, as yesterday. P04 is excluded (in Smoobu only since 20 Oct).

| Group | Made 18–28 Oct: bk / n / £ (per day) | Made 4–17 Oct: bk / n / £ (per day) | Ratio post/pre (bk / n / £ per day) | Cancelled 18–29 Oct | Cancelled 4–17 Oct |
|---|---|---|---|---|---|
| **Raised** | 9 / 37 / £9,908.30 (0.82 / 3.36 / £900.75) | 12 / 84 / £13,671.08 (0.86 / 6.00 / £976.51) | **0.95× / 0.56× / 0.92×** | **7 / 49 n / £10,579.72** (6 booked before the rise, 45 n / £9,462.73; plus P12 4–8 Dec booked and cancelled after it) | 1 / 3 n / £1,887.00 (P05 27–30 Dec, 8 Oct) |
| Raised without P05's 18 Oct booking (created 03:12; time of the rise not recorded) | 8 / 30 / £5,380.35 (0.73 / 2.73 / £489.12) | as above | 0.85× / 0.45× / 0.50× | | |
| **Unraised** | 9 / 49 / £8,234.16 (0.82 / 4.45 / £748.56) | 11 / 85 / £10,556.09 (0.79 / 6.07 / £754.01) | **1.04× / 0.73× / 0.99×** | 0 real (P08 duplicate only) | 0 |

**Per raised flat since 18 Oct:**
- **P01:** 1 bk (18–21 Dec, £720.90). Sold out next 30 (100% vs market 34%).
- **P05:** 1 bk (22–29 Dec, £4,527.95, created 18 Oct 03:12). **No booking for 11 days since; none made at the £550 base.** Fwd30 75.9% vs market 38% (18 Oct: 69.0% vs 32%).
- **P06:** 1 bk (5–8 Nov, £804.77). Fwd30 31.0% (56.2% of non-blocked nights) vs market 45%; the calendar is blocked on purpose.
- **P09:** 1 bk (13–15 Nov, £253.21). Fwd30 82.1% to handback (26 Nov) vs market 36% (18 Oct: 58.6%).
- **P11:** 2 bk (6 n, £1,221.45, 27–28 Oct). **2 cancellations, 22 n / £4,687.23** (both booked before the rise). Fwd30 41.4% vs market 43% (18 Oct: 58.6% vs 47%). Fwd60 35.6% vs 38%.
- **P12:** 4 bk made (20 n, £3,497.01), of which 4–8 Dec was cancelled, leaving 3 / 16 n / £2,380.02. **5 cancellations, 27 n / £5,892.49.** Fwd30 58.6% vs market 39% (18 Oct: 58.6% vs 41%).

**Running line (29 Oct):**
- **Booking rate:** raised flats book at 0.95× their pre-rise count per day and 0.92× in revenue per day. Unraised flats are at 1.04× and 0.99×. Both groups are booking shorter stays than before: nights per day are 0.56× (raised) and 0.73× (unraised).
- **Cancellations:**
  - Raised flats lost **45 nights / £9,462.73 of bookings made before the rise**, all Booking.com and all on P11/P12, against 1 real cancellation (P05) in the 14 days before. Unraised flats lost none in either window.
  - Net booked revenue from bookings made or cancelled since 18 Oct: **raised +£445.57** (yesterday +£770.97), **unraised +£8,234.16** (yesterday +£6,491.51).
- **Still not separable:**
  - The cancelled stays were booked at pre-rise prices, so they are not a guest response to the higher price.
  - All 3 confirmed P12 bookings since the rise, and both P11 ones, came after the 24 Oct Booking.com markup cut (+30% → +15%) and the 24 Oct Booking.com Last Minute 10%. That confounds the comparison.
- **Next base review:** 2 Nov (dispatcher).

### Per-property table
Windows and sources (all from `reports/2026-10-29/kpi_pack.json` unless noted):
- Occ30, ADR30 and RevPAR30: last 30 nights, 29 Sep–28 Oct.
- Fwd occ30: next 30, 30 Oct–27 Nov, handback-aware. Brackets show booked/nights, blocked nights and PriceLabs `market_occ_30`.
- Pace30: stays 29 Oct–27 Nov vs STLY.
- Pickup 7d: bookings made 23–29 Oct, recomputed here without past-stay imports.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (bk/n; blocked; mkt) | Pace30 Δ (n / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (29/29; 0; 34%) | UNKNOWN: no Smoobu stays before May 2026. OTB 30 n / £4,584.27 | 0 / 0 / £0 | **Compressed** (sold out; handback 20 Dec) |
| P02 | Ladbroke Grove | 93.3% | £113.60 | £106.03 | 0% (0/29; 29; 46%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar unlabelled (49%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: in Smoobu only since 20 Oct | UNKNOWN | UNKNOWN | 51.7% (15/29; 0; 25%) | UNKNOWN: no history | 3 / 10 / £1,186.69 (pack 5 / 15 / £1,841.89 incl. import) | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 70.0% | £396.77 | £277.74 | 75.9% (22/29; 1; 38%); 78.6% of non-blocked | UNKNOWN: no STLY. OTB 22 n / £10,139.53 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £204.00 | £149.60 | 31.0% (9/29; 13; 45%); 56.2% of non-blocked | UNKNOWN: no STLY. OTB 10 n / £2,049.56 | 1 / 3 / £804.77 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (0/29; 29; 23%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £162.94 | £157.51 | 80.0% (12/15 to handback 13 Nov; 0; 50%) | UNKNOWN: no STLY. OTB 13 n / £1,715.56 | 2 / 9 / £1,201.60 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 86.7% | £118.45 | £102.66 | 82.1% (23/28 to handback 26 Nov; 0; 36%) | UNKNOWN: no STLY. OTB 23 n / £2,346.31 | 1 / 2 / £253.21 | Unclassifiable (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 83.3% | £111.59 | £92.99 | 100% (20/20 to handback 18 Nov; 0; 29%) | UNKNOWN: no STLY. OTB 21 n / £2,225.25 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P11 | Camden | 86.7% | £171.60 | £148.72 | 41.4% (12/29; 0; 43%) | UNKNOWN: no Smoobu stays before Dec 2025. OTB 13 n / £2,321.65 | 2 / 6 / £1,221.45 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 80.0% | £194.74 | £155.79 | 58.6% (17/29; 0; 39%) | **−4 n / −7.2%** (18 n / £2,903.93 vs 22 n / £3,130.89) | 3 / 16 / £2,380.02 | **Soft** (fwd30 < 60%; to handback −13 n / −44.0%) |
| P13 | Shepherd's Bush (one flat, 2 listings) | 86.7% | £158.15 | £137.06 | 62.1% (18/29; 0; 40%) | UNKNOWN: no Smoobu stays before Dec 2025. OTB 19 n / £2,620.49 | 2 / 16 / £2,909.76 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (0/29; 0; 40%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood 1-bed, Fulham, Kings Langley | UNKNOWN: no PriceLabs or Smoobu mapping | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 53.3% | £160.56* | £85.63* | 27.6% (8/29; 2 delivery; 36%); 29.6% of non-blocked | UNKNOWN: new listing (first stay 10 Oct). OTB 9 n / £1,609.70 | 2 / 14 / £2,476.27 | **Soft** (fwd30 < 60%) |

\* P20: the 18–22 Oct extension nights were paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 2: P01, P10.
- On track 0.
- Soft 5: P04, P11, P12, P14, P20.
- Unclassifiable 9: P05, P08, P09, P13, P15–P19.
- Not classified by policy: P02, P03, P06, P07.
- No class changes since 28 Oct.

**Next 60 vs market** (kpi_pack `forward_occ_60`, 30 Oct–27 Dec, handback-aware; market = PriceLabs `market_occ_60`):

| Ref | Fwd occ60 (28 Oct → 29 Oct) | Market next 60 |
|---|---|---|
| P01 | 66.0% → 65.4% (34/52; the 18 blocked nights, 30 Nov–17 Dec, are in the handback block set) | 27% |
| P04 | 47.5% → 52.5% (31/59) | 20% |
| P05 | 61.0% → 62.7% | 37% |
| P06 | 16.9% → 15.3% (blocked on purpose; 9 of 16 non-blocked) | 40% |
| P08 | 81.2% → 80.0% (to 13 Nov) | 44% |
| P09 | 79.3% → 82.1% (to 26 Nov) | 31% |
| P10 | 100% → 100% (to 18 Nov) | 24% |
| P11 | 35.6% → 35.6% | 38% |
| P12 | 45.7% → pack 46.7%; **37.8% on Smoobu confirmed stays** (to 13 Dec; 4–7 Dec cancelled) | 32% |
| P13 | 45.8% → 45.8% | 36% |
| P14 | 0% → 0% | 37% |
| P20 | 10.2% → 25.4% (15/59) | 29% |

**Pace90** (kpi_pack `pace_90`, stays 29 Oct–26 Jan, OTB n / £):
- STLY is UNKNOWN for every unit except P12 (−21 n / −61.7%; not handback-aware).
- OTB by unit: P01 35 / £5,609.43; P02 0; P05 43 / £22,135.21; P06 10 / £2,049.56; P08 13 / £1,715.56; P09 23 / £2,346.31; P10 21 / £2,225.25; P11 28 / £6,318.77; P13 34 / £5,800.12; P14 0; P20 16 / £2,829.55.

**Last 30 vs market:** UNKNOWN for every unit. `pl_kpis.csv` has no past-30 market occupancy, and kpi_pack `missing` lists `market.csv` as empty.

**Last 365 nights** (kpi_pack `last365`, 29 Oct 2025–28 Oct 2026; denominator 365, so occupancy is understated for units with a shorter Smoobu history):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 37.8% | £178.27 | £67.40 | £24,601.00 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 56.2% | £373.66 | £209.86 | £76,600.49 |
| P06 | 34.0% | £239.03 | £81.20 | £29,639.44 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 38.4% | £176.19 | £67.58 | £24,667.07 |
| P09 | 39.2% | £115.61 | £45.30 | £16,532.84 |
| P10 | 37.0% | £114.60 | £42.39 | £15,471.30 |
| P11 | 76.7% | £174.32 | £133.73 | £48,809.81 |
| P12 | 81.9% | £191.74 | £157.07 | £57,329.28 |
| P13 | 77.3% | £158.53 | £122.48 | £44,705.63 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.4% | £160.56 | £7.04 | £2,568.88 |

P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; confirmed bookings in `reservations.csv`):

| Ref | Bookings | Median lead (days) | Median LOS (nights) | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 5 | 21 | 3 | Booking.com 64.4%, Airbnb 35.6%. **Distorted:** includes the 26 Oct past-stay import (negative lead) |
| P05 | 59 | 44 | 4 | Airbnb 100% |
| P06 | 31 | 15 | 4 | Airbnb 72.4%, Booking.com 27.6% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 22 | 15 | 6 | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 21 | 5 | Airbnb 58.4%, Booking.com 40.1%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 70 | 28 | 4 | Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0% |
| P12 | 82 | 31 | 4 | Booking.com 89.6%, Airbnb 10.4% |
| P13 | 84 | 21 | 3 | Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 5 | 6 | 4 | Airbnb 100% |

### Orphan gaps
Rechecked on `prices.csv` with Smoobu confirmed bookings overlaid and Smoobu-cancelled nights treated as open. P13 is treated as one calendar, handbacks are respected, and P02, P03 and P07 are left out.

**Orphans (open run shorter than the min stay in force):**
- **P04 1–2 Nov** (2 n, PriceLabs min 3). It sits between the 26 Oct–1 Nov stay and the new 3–6 Nov booking, which turned it from an open run into an orphan. kpi_pack `gaps` lists the same run.

**Fixed since 28 Oct:**
- **P13 17 Nov and 27 Nov** are no longer orphans: PriceLabs min stay is now 1 on 3064856 (was 2).
- The PriceLabs price on those nights moved from £180 to £273 (17 Nov) and from £233 to £344 (27 Nov), per the 28 Oct vs 29 Oct `prices.csv`. Reported as fact only.

**Runs exactly at the PriceLabs min stay (bookable, so not orphans):**
- P04: 18–19 Nov and 23–24 Nov (2 n at min 2). **Under policy `P04.min_stay_rule` (never under 3) these would be orphans.** The min 2 comes from Reyhan's 27 Oct edit, an open plan item for Corentin to confirm.
- P04: 2 Dec (1 n at min 1). Policy-settled; not raised.
- P05: 16–17 Nov and 7–8 Dec (2 n, min 2).
- P12: 12–13 Nov (2 n, min 2).
- P20: 31 Oct–1 Nov (2 n, min 2). Policy `listing_facts.P20.min_stay` says 3 nights from 25 Oct to 30 Nov; PriceLabs shows 2, from Reyhan's P20 min-2 edit, open for confirmation.
- P20: 22–24 Nov (3 n, min 3; new, created by the 25 Nov booking).
- P11: 23–25 Dec (3 n, min 3).
- P13: 1 Dec (1 n, min 1). Policy-settled.

### Other calendar facts
- **P05 30 Oct is Blocked** in `prices.csv`. Policy covers 27–28 Oct only (delivery), so the reason for 30 Oct is UNKNOWN. Still open from 28 Oct.
- **PriceLabs calendar lag** (`prices.csv` vs Smoobu):
  - P12 4–7 Dec show Booked but were cancelled in Smoobu on 28 Oct at 22:12.
  - P12 21–25 Nov show open but were booked in Smoobu on 28 Oct at 18:06.
  - P04 3–5 Nov show open but were booked on 28 Oct at 21:16.
  - The open/closed state on the channels was not re-checked with Smoobu `/api/rates` today: NOT CHECKED.

### Gaps to fill
- **P12, 16 nights released by Booking.com cancellations and still open:** 1–4 Nov (4 n), 18–20 Nov (3 n), 26–28 Nov (3 n) and 4–9 Dec (6 n). With the other open nights, P12's calendar is now open for 17–20 Nov (4 n) and for **26 Nov–13 Dec, an 18-night run to handback**, both in `prices.csv` with confirmed Smoobu stays overlaid. Fwd30 58.6%; to handback 13 n behind STLY.
- **P11, open after two cancellations:** 18 Nov–4 Dec (17 n) and 8–18 Dec (11 n). Fwd30 41.4% vs market 43%, fwd60 35.6% vs 38%.
- **P04 1–2 Nov:** 2-night orphan at min 3.
- **P04 18–19 Nov and 23–24 Nov:** sellable only at min 2, against policy minimum 3 (for Corentin to confirm).
- **P20:** fwd30 27.6% vs market 36%. Open runs include 31 Oct–1 Nov (2 n at min 2, against the policy fact of 3) and 22–24 Nov (3 n).
- **P05 30 Oct:** blocked, reason not in policy.

Data gaps:
- **Pace vs STLY (30/90):**
  - UNKNOWN for P01, P02, P05–P11, P13, P14 and P20: `reservations.csv` has no stays in the STLY windows (the first Smoobu stays are Dec 2025 to Oct 2026).
  - UNKNOWN for P03, P04 and P15–P19: no history.
  - P12 pace90 is not handback-aware.
- **Last 30 / 365:**
  - UNKNOWN for P03 (not in Smoobu), P04 (`smoobu_since` 2026-10-20) and P15–P19 (not mapped).
  - Last-365 occupancy is understated (365-day denominator vs a shorter Smoobu history).
- **Market and comps:**
  - Last-30 market occupancy: UNKNOWN (not in `pl_kpis.csv`; `market.csv` empty per kpi_pack `missing`).
  - ARI and RGI: UNKNOWN (`comps.csv` empty).
- **Forward occupancy:**
  - UNKNOWN for P03 (calendar unlabelled) and P15–P19 (no prices rows).
  - `prices.csv` has no 29 Oct row and ends 28 Dec.
  - kpi_pack `forward_occ_60` for P12 counts 4 Smoobu-cancelled nights as booked (analyser `link_bookings` does not clear cancellations).
- **Pickup:**
  - kpi_pack `pickup_7d` and `booking_profile` for P04 include the 26 Oct past-stay import.
  - The P04 19–20 Dec booking date is UNKNOWN (26 Oct import batch).
- **Cancellations:**
  - `reservations.csv` has no cancel date. Cancel times here are Smoobu `modifiedAt`, which shows the last modification, fetched for 25 Sep–29 Oct.
  - Cancel dates for the 13 Sep P12 Booking.com bookings are NOT CHECKED.
  - Rate plan (NR vs Standard) and any cancellation fee kept on the P12 and P11 cancellations: UNKNOWN (not in Smoobu).
- **Base-rise timing:** the time of day of the 18 Oct base rises is not recorded, so whether P05's 18 Oct 03:12 booking came before the rise is UNKNOWN.
- **P20:** ADR30 and RevPAR30 are understated (separately paid nights, per policy).
- **Channel state:** the channel open/closed state for the PriceLabs-lag nights (P12, P04) was not re-checked with Smoobu `/api/rates` today: NOT CHECKED.

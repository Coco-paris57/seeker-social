## Occupancy & performance

**Portfolio, last 30 nights (23 Sep–22 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20): occupancy 69.5%, ADR £173.34, RevPAR £120.45, revenue £46,974.17 (271 nights).** Last 365 nights (23 Oct 2025–22 Oct 2026): occupancy 43.4%, ADR £184.53, RevPAR £80.03, revenue £379,765.96 (2,058 nights). Source: `reports/2026-10-23/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P04 (in Smoobu only since 20 Oct), P03 and P15–P19 are left out, not counted as zero.

**Forward, handback-aware.** Booked nights are confirmed Smoobu stays (`data/snapshots/2026-10-23/reservations.csv`, pulled 05:55 on 23 Oct). Blocked nights come from `prices.csv`, which starts on 24 Oct. Post-handback nights are not counted as inventory (policy `handbacks`). Covers 14 units with a calendar; P03 is left out.
- Next 30 (23 Oct–21 Nov): **177 of 409 inventory nights Booked = 43.3%.** With Blocked nights also taken out it is 52.4% (177/338). Yesterday it was 45.8% (182/397, window 23 Oct–20 Nov).
- Next 60 (23 Oct–21 Dec): **252 of 717 = 35.1%**, or 45.3% (252/556) without Blocked nights. Yesterday it was 37.4% (265/708).
- Without the two overnight cancellations it would be 45.7% (187/409) for the next 30 and 37.2% (267/717) for the next 60.

**7-day pickup (bookings made 17–23 Oct, up to 05:55 on 23 Oct; P04's 20 Oct import rows left out): 7 bookings, 29 nights, £8,209.68** (P01 1, P05 1, P08 1, P13 2, P20 2; all Airbnb). This matches the sum of kpi_pack `pickup_7d`.
- Over the same week, 2 Booking.com stays were cancelled: 15 nights, £3,119.27. Net nights picked up: +14.
- **No booking was made on 22 Oct or 23 Oct.** The last booking_on date in reservations.csv for any unit is 21 Oct (P20).

### Overnight change: the two Booking.com cancellations (22 Oct → 23 Oct snapshot)
Between the two reservations.csv snapshots, exactly 2 rows changed, both from confirmed to cancelled. No row was added.

| | P12 Mile End | P11 Camden |
|---|---|---|
| Stay cancelled | 1–8 Nov, 7 n, £1,382.86 (booked 3 Oct) | 19–27 Nov, 8 n, £1,736.41 (booked 19 Sep) |
| Fwd occ next 30 (23 Oct–21 Nov) | **63.3% → 40.0%** (19 → 12 of 30) | **63.3% → 53.3%** (19 → 16 of 30; 3 of the 8 nights fall inside 30 days) |
| Fwd occ next 60 | **50.0% → 36.5%** (26 → 19 of 52 inventory nights, to handback 13 Dec) | **68.3% → 55.0%** (41 → 33 of 60) |
| Pace30 vs STLY (stays 23 Oct–21 Nov vs same window as at 23 Oct 2025) | **−3 n / +20.4% rev → −10 n / −24.2% rev** (OTB £2,354.00 vs STLY £3,104.90; 12 n vs 22 n) | UNKNOWN (no STLY). OTB 19 n / £3,506.68 → 16 n / £2,855.52 |
| Pace to handback (23 Oct–13 Dec) | **−8 n / −11.1% → −15 n / −35.4%** (OTB £3,668.40 vs STLY £5,679.86; 19 n vs 34 n) | UNKNOWN (no STLY). OTB to 13 Dec 38 n / £7,542.75 → 30 n / £5,806.34 |
| Pace90 (pack, not handback-aware) | −12 n / −29.3% → −19 n / −48.7% | UNKNOWN. OTB 50 n / £10,883.80 → 42 n / £9,147.39 |
| Class | Soft before and after (it was Soft yesterday too, on nights) | **Changes from Unclassifiable (63.3%, no STLY) to Soft (53.3% < 60%)** |
| New open run | **1–13 Nov, 13 nights** (min 2), between the 30 Oct–1 Nov and 14–17 Nov stays | **18–27 Nov, 10 nights**, between the 14–18 Nov and 28 Nov–12 Dec stays. The single nights 18 Nov and 27 Nov (min 1) are now inside it |
| PriceLabs calendar | Shows 1–13 Nov as open and priced (`prices.csv`; listing refreshed 2026-10-22T18:50:05Z) | **Still shows 19–26 Nov as Booked**, with `user_price` −1 (no price being set) and booked_date 2026-09-19. Seen both in prices.csv and in a live `get_listing_prices` 3064196 call today; `last_refreshed_at` is 2026-10-22T08:37:38Z, before the cancellation |

Before/after values come from `rm.metrics.pace_vs_stly` / `on_the_books`, run on today's reservations.csv once as it is and once with the two rows put back to confirmed. Today's after-values for pace30 and pace90 match kpi_pack `pace_30` / `pace_90`.

**Note: kpi_pack `forward_occ_30` for P11 (62.1%) and `forward_occ_60` (67.8%) still count the cancelled nights,** because they read the stale PriceLabs booking_status. The Smoobu-based figures above are the correct ones. PriceLabs' own `occupancy_next_30` of 0.63 for P11 (`pl_kpis.csv`) has the same problem.

### Raised flats: bookings made since the 18 Oct rises vs the 14 days before
Source: reservations.csv, `booked_on` (a date with no time). "Since" is 18–23 Oct (5 full days plus 23 Oct up to 05:55). "Before" is 4–17 Oct (14 days). Open nights are 24 Oct–22 Dec, before handback, not booked in Smoobu and not Blocked.

| Ref | Change | Bookings made since 18 Oct | Made 4–17 Oct | Cancelled in the period | Open nights left |
|---|---|---|---|---|---|
| P01 | base 253 | 1: 19 Oct, Airbnb, 18–21 Dec, 3 n, £720.90 | 1: 15 Oct, Airbnb, 31 Oct–30 Nov, 30 n, £4,563.90 | 0 | 0 (sold out to handback 20 Dec) |
| P05 | base 500 (18 Oct), then 550 (20 Oct) | 1: 18 Oct, Airbnb, 22–29 Dec, 7 n, £4,527.95. The 22 Oct report places it before the raise (20:33–20:43Z); the time is not in reservations.csv. **0 since the £550 base on 20 Oct.** | 2 made: 1 still confirmed (18–22 Nov, 4 n, £1,835.10); 1 made 5 Oct for 27–30 Dec, £1,887.00, since cancelled | 0 | 24 (incl. 13–21 Dec, 9 n) |
| P06 | base 357 | 0 | 5 made: 4 still confirmed (18 n, £3,400.07); 1 since cancelled | 0 | 3 (rest blocked on purpose) |
| P09 | base 176 | 0 | 3 (23 n, £2,371.55) | 0 | 11 (to 26 Nov) |
| P11 | base 286 (+13–17 Dec raised 21 Oct) | 0 | 1 (4 n, £650.48) | **19–27 Nov (booked 19 Sep): −8 n, −£1,736.41** | 27 (8 of them still shown Booked in PriceLabs) |
| P12 | base 284 | 0 | 2 (5 n, £849.98) | **1–8 Nov (booked 3 Oct): −7 n, −£1,382.86** | 33 (to 13 Dec) |
| **Total** | | **2 bookings, 10 n, £5,248.85**, both made by 19 Oct; 0 made 20–23 Oct | **14 made, 13 still confirmed, 84 n, £13,671.08** | −15 n, −£3,119.27 | 98 |

- The rate of bookings made fell from **1.0 per day (4–17 Oct) to about 0.4 per day (18–22 Oct)**. P06, P09, P11 and P12 have had no new booking since the rise. Net nights since 18 Oct are −5 (+10 booked, −15 cancelled).
- Five days is too few to judge, and supply has shrunk: P01 and P10 have 0 open nights left, and P09's window ends 26 Nov. The data does not show why the stays were cancelled, so it cannot say whether the price rises played a part. Formal review is 26 Oct (policy `price_changes`).
- **For comparison, units without a rise:** P13 2 bookings since 18 Oct (both made 18 Oct, 7 n, £1,116.61) vs 4 made 4–17 Oct. P20 1 confirmed (21 Oct) vs 2. P08 0 vs 1. P10 0 vs 2. P02 0 vs 2.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 23 Sep–22 Oct (kpi_pack `last30`).
- Fwd occ30: Booked ÷ inventory nights for 23 Oct–21 Nov (reservations.csv; Blocked nights from prices.csv; post-handback nights taken out). Brackets show the Blocked nights and the PriceLabs market occupancy for the next 30 (`pl_kpis.csv` `market_occupancy_next_30`).
- Pace30: kpi_pack `pace_30` (stays 23 Oct–21 Nov vs the same window as at 23 Oct 2025).
- Pickup 7d: bookings made 17–23 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.19 | £162.19 | 100.0% 30/30 (0; 32%) | UNKNOWN: no STLY. OTB 30 n / £4,645.37 | 1 / 3 / £720.90 | Compressed (0 open nights to handback 20 Dec) |
| P02 | Ladbroke Grove | 96.7% | £117.82 | £113.89 | 16.7% 5/30 (24 blocked on purpose; 46%) | UNKNOWN: no STLY. OTB 5 n / £510.37 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (unavailable with no label; 48%) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN (in Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 26.7% 8/30 (0; 25%) | UNKNOWN: no history | 0 / 0 / £0 (import rows left out) | Soft (fwd < 60%) |
| P05 | St John's Wood (4-bed) | 76.7% | £382.34 | £293.13 | 66.7% 20/30 (1, 27 Oct; 38%) | UNKNOWN: no STLY. OTB 20 n / £8,065.98 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £210.93 | £140.62 | 43.3% 13/30 (14 blocked on purpose; 43%) | UNKNOWN: no STLY. OTB 13 n / £2,377.87 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (29 blocked on purpose; 25%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £166.98 | £166.98 | 40.9% 9/22 to handback 13 Nov (0; 50%) | UNKNOWN: no STLY. OTB 9 n / £1,246.93 | 1 / 6 / £776.46 | Soft (13 open nights to handback) |
| P09 | Greenwich | 96.7% | £117.76 | £113.83 | 60.0% 18/30 (1, 25 Oct; 37%) | UNKNOWN: no STLY. OTB 18 n / £1,858.01 | 0 / 0 / £0 | Unclassifiable (exactly at the 60% line, no STLY). kpi_pack's PriceLabs-based figure, 58.6% (24 Oct–21 Nov), would read Soft |
| P10 | Ealing / Hanger Lane | 76.7% | £114.47 | £87.76 | 100.0% 27/27 to handback 18 Nov (0; 31%) | UNKNOWN: no STLY. OTB 27 n / £2,861.03 | 0 / 0 / £0 | Compressed (0 open nights to handback) |
| P11 | Camden | 80.0% | £160.83 | £128.67 | **53.3% 16/30** (0; 45%); was 63.3% before the cancellation | UNKNOWN: no STLY. OTB 16 n / £2,855.52 | 0 / 0 / £0 | **Soft** (new today; was Unclassifiable) |
| P12 | Mile End | 73.3% | £192.64 | £141.27 | **40.0% 12/30** (0; 40%); was 63.3% | **−10 n / −24.2%**; to handback −15 n / −35.4% | 0 / 0 / £0 | Soft |
| P13 | Shepherd's Bush (one flat, 2 listings) | 93.3% | £160.38 | £149.69 | 46.7% 14/30 (0; 40%) | UNKNOWN: no STLY. OTB 14 n / £2,085.47 | 2 / 7 / £1,116.61 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% 0/30 (0; 40%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 43.3% | £156.44* | £67.79* | 16.7% 5/30 (2, 20–21 Nov; 35%) | UNKNOWN: no STLY. OTB 5 n / £888.48 | 2 / 6 / £1,067.76 | Soft |

\* P20: the 18–22 Oct extension nights were paid separately (policy), so ADR30 and RevPAR30 are understated.

**Forward 60, handback-aware** (23 Oct–21 Dec; Booked ÷ inventory nights; PriceLabs market occupancy for the next 60 in brackets, from kpi_pack `market_occ_60`):
- P01: 100% (41/41).
- P02: 8.3% (5/60), blocked on purpose.
- P04: 33.3% (20/60).
- P05: 58.3% (35/60).
- P06: 21.7% (13/60), blocked on purpose.
- P07: 0%, blocked on purpose.
- P08: 40.9% (9/22, to 13 Nov).
- P09: 65.7% (23/35, to 26 Nov).
- P10: 100% (27/27, to 18 Nov).
- **P11: 55.0% (33/60).**
- **P12: 36.5% (19/52, to 13 Dec).**
- P13: 36.7% (22/60).
- P14: 0% (0/60).
- P20: 8.3% (5/60).

**Last 365 and booking profile** (23 Oct 2025–22 Oct 2026; kpi_pack `last365`, `booking_profile`). Format: occupancy / ADR / RevPAR; median lead time, median LOS; channel revenue share.
- P01: 36.2% / £178.99 / £64.73; 15 d, 5 n; Airbnb 80.4%, Website 13.0%, Booking.com 6.6%.
- P02: 78.4% / £129.05 / £101.12; 34 d, 4 n; Airbnb 53.8%, Booking.com 43.0%.
- P05: 55.1% / £372.86 / £205.33; 44 d, 4 n; Airbnb 100%.
- P06: 32.3% / £241.58 / £78.10; 16 d, 4 n; Airbnb 71.7%, Booking.com 28.3%.
- P07: 11.5% / £133.90 / £15.41; 3 d, 4 n; Airbnb 100%.
- P08: 37.0% / £177.29 / £65.57; 16 d, 6 n; Airbnb 76.2%.
- P09: 38.6% / £115.28 / £44.53; 18 d, 7 n; Airbnb 60.5%, Booking.com 37.9%.
- P10: 35.3% / £115.00 / £40.65; 12 d, 5 n; Airbnb 69.3%, Booking.com 27.6%.
- P11: 75.1% / £174.13 / £130.71; 28 d, 4 n; Booking.com 54.5%, Airbnb 43.6%, Agoda 1.9%.
- P12: 81.9% / £191.28 / £156.69; 31 d, 4 n; Booking.com 89.7%, Airbnb 10.3%.
- P13: 76.2% / £158.62 / £120.81; 21 d, 3 n; Booking.com 52.3%, Airbnb 46.8%.
- P14: 2.7% / £409.84 / £11.23; 57 d, 10 n (1 booking).
- P20: 3.6% / £156.44* / £5.57*; 5 d, 3 n (3 bookings); Airbnb 100%.
- P04: UNKNOWN (no history before 20 Oct).

### Gaps to fill (24 Oct–22 Dec, before handback; reservations.csv laid over prices.csv)
- **Orphan gaps (open runs shorter than the min stay in force, between two bookings): none on the PriceLabs calendar.** kpi_pack `gaps` is empty for every unit.
  - P04 25 Oct sits between the 22–25 Oct and 26 Oct–1 Nov stays, with min stay 3. PriceLabs shows it as unavailable with no label, and no confirmed Smoobu stay covers it. It would be an orphan if open (still unexplained since 22 Oct).
- **New open runs from the cancellations:** P12 1–13 Nov (13 n) and P11 18–27 Nov (10 n). PriceLabs still shows P11 19–26 Nov as Booked (see above).
- **Single open nights at min stay 1:** P04 2 Dec; P12 17 Nov; P13 1 Dec (the 1-night minimum is intentional, per policy). P11's 18 Nov and 27 Nov are no longer single nights.
- **Short runs that exactly meet the min stay:** P20 25–27 Oct (3, min 3); P13 25–26 Oct (2, min 2); P05 16–17 Nov and 7–8 Dec (2, min 2).
- **Open nights left before handback:** P08 13 (26 Oct–7 Nov); P09 11 (to 26 Nov); P12 33 (26–29 Oct, 1–13 Nov, 17 Nov, 29 Nov–13 Dec); P11 27 (28 Oct–2 Nov, 10–13 Nov, 18–27 Nov, 12–18 Dec); P01 and P10 none.
- **Blocks outside policy:**
  - **P20 20–21 Nov are newly Blocked** (open in the 22 Oct prices.csv); the reason is not in the data.
  - P05 27 Oct and P09 25 Oct are still Blocked for an unknown reason.

Data gaps:
1. **P11 PriceLabs calendar is stale.** The cancelled 19–26 Nov stay is still Booked, with no price set (live `get_listing_prices` 3064196, `last_refreshed_at` 2026-10-22T08:37:38Z). Whether those nights are open and at what price on Booking.com/Smoobu is UNKNOWN. kpi_pack `forward_occ_30/60` and pl_kpis `occupancy_next_30` for P11 overstate by these nights.
2. **Cancellation reasons and cancellation dates are not in reservations.csv** (no cancelled_on field). The change was found by diffing the 22 Oct and 23 Oct snapshots.
3. **STLY.** There are no Smoobu bookings for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20. Their first booked_on dates are Nov 2025 or later. So pace 30/90 is UNKNOWN for them; `pace_vs_stly` returns STLY 0, not null. Only P12 has STLY, and STLY leaves out bookings that were later cancelled.
4. **P04 Barking:** Smoobu history starts 20 Oct, so last-30/365, pace, lead time and channel mix are UNKNOWN. The reason 25 Oct is unavailable is not in the data.
5. **P03 Bayswater** is not in Smoobu, and prices.csv carries no labels, so all its KPIs are UNKNOWN (intentional block per policy).
6. **P15–P19** are not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
7. **The pipeline is not handback-aware:** kpi_pack `forward_occ_30/60`, `pace_90` and kpi_summary "Booked next 30" ignore policy `handbacks`. The handback-aware figures here were recomputed.
8. **prices.csv starts 24 Oct**, so the night of 23 Oct has no Blocked/available status; it is counted from Smoobu only.
9. **The post-raise read is too short:** about 5 days, and `booked_on` has no time. Whether P05's 18 Oct booking came before or after the 18 Oct raise cannot be confirmed from reservations.csv. The PriceLabs price at the moment of each booking is not in the data.
10. **P20:** the payment for the 18–22 Oct extension is not in any file. The reason for the new 20–21 Nov block is UNKNOWN.
11. **market.csv, comps.csv and channel_checks.csv are empty** (kpi_pack `missing`). Market ADR, ARI/RGI and price percentiles are UNKNOWN. Market occupancy comes only from pl_kpis.csv, and its window is not stated.
12. **Last-365 occupancy uses capacity 365** even where Smoobu history starts in 2026. Go-live dates are UNKNOWN.
13. **PriceLabs listing_data today has 20 listings vs 30 yesterday** (Dispatcher). This section does not depend on the missing Channex/Vrbo copies. prices.csv also has a row set with a blank ref (3090701, the second P13 listing); P13 is counted from Smoobu as one flat (policy).

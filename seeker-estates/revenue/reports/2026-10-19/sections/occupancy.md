## Occupancy & performance

**Portfolio, last 30 nights (19 Sep–18 Oct 2026), 13 Smoobu-mapped units (P01, P02, P05–P14, P20): occupancy 70.0%, ADR £177.48, RevPAR £124.24, revenue £48,452.35 (273 nights).** Last 365 nights (19 Oct 2025–18 Oct 2026): occupancy 42.7%, ADR £184.99, RevPAR £78.91, revenue £374,425.81 (2,024 nights; capacity is 365 per unit, including months before a unit's first stay). Forward, Booked only (P13's two listings linked): 48.0% of the next 30 (195/406 nights, 20 Oct–17 Nov, 14 units with a calendar, P03 out) and 34.7% of the next 60 (287/826, 20 Oct–17 Dec). 7-day pickup (bookings made 13–19 Oct): 14 bookings, 95 nights, £17,949.24.
Sources: `reports/2026-10-19/kpi_pack.json` (portfolio_last30/365 and per-property fields). Portfolio forward and pickup totals are sums of the pack's per-property figures. Revenue is Smoobu basePrice, before cleaning and commission. P03, P04 and P15–P19 have no reservation data, so they are left out of the totals, not counted as zero.

### What changed since yesterday (18 Oct pack vs 19 Oct pack)
- **The windows moved by one day.** Last 30 is now 19 Sep–18 Oct (was 18 Sep–17 Oct). Forward 30 is now 20 Oct–17 Nov (was 19 Oct–16 Nov). In both snapshots prices.csv starts the day after the run date, so forward 30 covers 29 nights and forward 60 covers 59. Pickup 7d now means bookings made 13–19 Oct (was 12–18 Oct).
- **No calendar night changed status** on the 58 dates the two prices.csv files share (20 Oct–17 Dec), for any unit. Every change in forward occupancy comes from the window moving. On a like-for-like basis without P20, forward 30 went from 196 to 192 of 377 nights (52.0% to 50.9%). The night of 19 Oct dropped out, and it was Booked on P01, P02, P05, P08, P09, P10, P12 and P13. The night of 17 Nov came in, and it is Booked on P01, P09, P10 and P11. Forward 60 went from 292 to 284 of 767 nights (38.1% to 37.0%). The 8 nights of 19 Oct dropped out, and 17 Dec, which came in, is not Booked on any unit.
- **New bookings in reservations.csv:** 660 rows today vs 659 yesterday. One booking is new: **P01, Airbnb, booked 19 Oct, stay 18–21 Dec (3 nights), £720.90.** Three more bookings carry a booked_on date of 18 Oct, but all three were already in yesterday's file: P05 (Airbnb, 22–29 Dec, 7 nights, £4,527.95) and P13 ×2 (Airbnb, 4–8 Nov, 4 nights, £598.71, and 28 Nov–1 Dec, 3 nights, £517.90).
- **Cancellations: none detected.** There are 170 cancelled rows in both files and no row changed status. reservations.csv has no booking ID and no cancellation date, so rows were matched on ref, channel, arrival, departure, booked_on and amount.
- **Per property (forward 30 / forward 60 Booked nights, yesterday → today):** P01 29→29 / 42→41; P02 9→8 / 9→8; P04 14→14 / 24→24; P05 20→19 / 39→38; P06 14→14 / 14→14 (blocked share 31.0%→34.5%); P08 13→12 / 13→12; P09 17→17 / 27→26; P10 29→29 / 31→30; P11 17→18 / 40→40; P12 17→16 / 28→27; P13 17→16 / 25→24; P07 and P14 0→0. All of these are window shift. P01's pace 90 went from 43 to 45 nights (OTB £6,673.98→£7,232.56) because of the new December booking.
- **Pickup 7d changes:** P01 went from 1 booking / 30 nights / £4,563.90 to 2 / 33 / £5,284.80 (the new booking). P13 went from 4 / 16 / £2,522.98 to 3 / 12 / £2,012.35 because a booking made on 12 Oct fell out of the window. All other units are unchanged.
- **Last-30 changes are window shift only:** P06 24→23 nights (80.0%→76.7%), P08 28→29 (93.3%→96.7%), P05 ADR £396.37→£387.20. The portfolio held at 273 nights, and revenue moved from £48,798.97 to £48,452.35.
- **Comparing with yesterday's section:** `reports/2026-10-18/sections/occupancy.md` was written at 19:41 UTC on 18 Oct, before the 18 Oct pack was rebuilt at 20:24 UTC with P13's two listings combined and P20 added. Its P13 figures (occ30 23.3%, fwd30 6.9%) are superseded and are not a performance change. Today's comparisons are pack against pack.

### Units whose base price was raised on the evening of 18 Oct
PriceLabs activity log (`get_user_logs`, base_price, 18 Oct, times in UTC): P05 £455→£500 at 20:33; P09 £160→£176 at 20:37; P01 £230→£253 at 20:38; P12 £270→£284 at 20:39; P06 £340→£357 at 20:40; P11 £260→£286 at 20:43. listings.csv shows last push between 20:38 and 21:10 UTC.
- **Pickup since the raise:** one booking. P01, Airbnb, booked 19 Oct, 18–21 Dec, 3 nights, £720.90 (£240.30/night).
- **P05:** its booking dated 18 Oct (7 nights, £4,527.95) was already in the 18 Oct pack built at 20:24 UTC, so it was made before the 20:33 raise.
- **P06, P09, P11, P12:** no new bookings.
- **One day is not enough to judge.** The window from the raise to the reservations pull (05:56 UTC on 19 Oct) is about 9 hours, overnight. booked_on is a date with no time or timezone. P01 and P10 were already 100% booked for the next 30, so they have nothing open to pick up there. The comparison needs at least 7–14 days of pickup and, ideally, a pre-raise baseline of pickup per open night.

### Per-property table
Windows: Occ30, ADR30 and RevPAR30 cover the last 30 nights, 19 Sep–18 Oct 2026 (kpi_pack `last30`, Smoobu). Fwd occ30 is Booked nights ÷ 29 nights, 20 Oct–17 Nov (kpi_pack `forward_occ_30`, prices.csv, linked listings counted), with the Blocked share in brackets. Pace30 compares stays 19 Oct–17 Nov on the books today with the same window as at 19 Oct 2025 (kpi_pack `pace_30`). Pickup 7d is bookings made 13–19 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.69 | £161.69 | 100.0% (0%) | UNKNOWN: no STLY; OTB 30 n / £4,686.10 | 2 / 33 / £5,284.80 | Compressed |
| P02 | Ladbroke Grove | 96.7% | £120.27 | £116.26 | 27.6% (69.0%) | UNKNOWN: no STLY; OTB 9 n / £882.87 | 1 / 4 / £417.24 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (calendar unavailable, no Booked/Blocked label) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN | UNKNOWN | UNKNOWN | 48.3% (0%) | UNKNOWN: no reservations | UNKNOWN | Soft |
| P05 | St John's Wood (4-bed) | 76.7% | £387.20 | £296.85 | 65.5% (3.4%) | UNKNOWN: no STLY; OTB 20 n / £7,776.67 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 76.7% | £214.07 | £164.12 | 48.3% (34.5%) | UNKNOWN: no STLY; OTB 14 n / £2,588.75 | 2 / 13 / £2,310.12 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (100%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 96.7% | £168.64 | £163.02 | 41.4% (0%) | UNKNOWN: no STLY; OTB 13 n / £1,874.22 | 1 / 6 / £776.46 | Soft |
| P09 | Greenwich | 96.7% | £115.82 | £111.96 | 58.6% (0%) | UNKNOWN: no STLY; OTB 18 n / £1,951.21 | 1 / 12 / £1,232.50 | Soft |
| P10 | Ealing / Hanger Lane | 76.7% | £112.55 | £86.29 | 100.0% (0%) | UNKNOWN: no STLY; OTB 30 n / £3,178.92 | 0 / 0 / £0 | Compressed |
| P11 | Camden | 86.7% | £153.59 | £133.11 | 62.1% (0%) | UNKNOWN: no STLY; OTB 18 n / £3,219.84 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P12 | Mile End | 80.0% | £200.10 | £160.08 | 55.2% (0%) | −4 n (17 vs 21) / +9.1% (£3,362.61 vs £3,083.20) | 2 / 5 / £849.98 | Soft (fwd occ30 < 60%) |
| P13 | Shepherd's Bush (one flat, 2 listings) | 96.7% | £165.40 | £159.89 | 55.2% (0%) | UNKNOWN: no STLY; OTB 17 n / £2,598.41 | 3 / 12 / £2,012.35 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (0%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 26.7% | £231.80 | £61.81 | 10.3% (0%) | UNKNOWN: no STLY; OTB 3 n / £537.84 | 1 / 3 / £537.84 | Soft (new unit, see below) |

How classes were set: Compressed means fwd occ30 ≥ 85%. Soft means fwd occ30 < 60% or pace behind STLY by more than 10%. On track needs an STLY figure, so a unit at 60–85% with no STLY is Unclassifiable. Per policy, P02, P03, P06 and P07 are blocked on purpose and are not classified, because blocked nights are not demand. **P11 moved from Soft yesterday to Unclassifiable today purely because of the window shift** (17 Nov came in Booked: 58.6%→62.1%). P12 is the only unit with STLY. Its 30-day revenue is +9.1% (inside ±10%), but nights are −4 (17 vs 21), and fwd occ30 of 55.2% makes it Soft. Its pace 90 is −10 nights (28 vs 38) and −25.2% revenue (£5,463.16 vs £7,300.78).

### Last 365 nights, forward 60, pace 90, booking profile
Last 365 covers 19 Oct 2025–18 Oct 2026 (kpi_pack `last365`, capacity 365 for every unit). Fwd60 is Booked ÷ 59 nights, 20 Oct–17 Dec. Pace90 compares stays 19 Oct 2026–16 Jan 2027 with the same window as at 19 Oct 2025. Profile uses all confirmed bookings in reservations.csv (kpi_pack `booking_profile`).

| Ref | Occ365 | ADR365 | RevPAR365 | Rev365 | Fwd60 | Pace90 Δ | Bookings | Median lead | Median LOS | Channel revenue share |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 35.1% | £179.51 | £62.95 | £22,977.87 | 69.5% | no STLY; OTB 45 n / £7,232.56 | 21 | 15 d | 5 n | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 77.3% | £129.56 | £100.10 | £36,536.12 | 13.6% | no STLY; OTB 9 n / £882.87 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P05 | 54.0% | £372.59 | £201.09 | £73,399.42 | 64.4% | no STLY; OTB 51 n / £25,336.29 | 59 | 44 d | 4 n | Airbnb 100% |
| P06 | 32.1% | £241.84 | £77.52 | £28,295.48 | 23.7% | no STLY; OTB 14 n / £2,588.75 | 30 | 16 d | 4 n | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 | 0.0% | no STLY; OTB 0 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 35.9% | £177.91 | £63.85 | £23,306.81 | 20.3% | no STLY; OTB 13 n / £1,874.22 | 20 | 16 d | 6 n | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 37.5% | £114.97 | £43.15 | £15,750.35 | 44.1% | no STLY; OTB 27 n / £2,875.59 | 22 | 18 d | 7 n | Airbnb 60.5%, Booking.com 37.9%, Direct 1.6% |
| P10 | 34.2% | £115.29 | £39.48 | £14,411.66 | 50.8% | no STLY; OTB 31 n / £3,284.89 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 74.5% | £174.07 | £129.72 | £47,346.24 | 67.8% | no STLY; OTB 52 n / £11,248.12 | 70 | 31 d | 4 n | Booking.com 55.8%, Airbnb 42.3%, Agoda 1.9% |
| P12 | 82.2% | £190.80 | £156.83 | £57,241.42 | 45.8% | **−10 n (28 vs 38) / −25.2%** | 85 | 31 d | 4 n | Booking.com 90.1%, Airbnb 9.9% |
| P13 | 75.3% | £158.49 | £119.41 | £43,583.94 | 40.7% | no STLY; OTB 25 n / £4,012.06 | 82 | 21 d | 3 n | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 | 0.0% | no STLY; OTB 0 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 2.2% | £231.80 | £5.08 | £1,854.40 | 5.1% | no STLY; OTB 3 n / £537.84 | 2 | 5 d | 8 n | Airbnb 100% |

P04 Fwd60 is 40.7%. Its other columns are UNKNOWN because it has no reservations. Portfolio profile (490 confirmed bookings, reservations.csv): median lead 24 days, median LOS 4 nights, channel revenue share Airbnb 62.5%, Booking.com 35.8%, Website 1.0%, Agoda 0.3%, Direct 0.3%. 170 of 660 rows (25.8%) are cancelled.

### P20 Waterford Court: first look
Sources: kpi_pack P20, reservations.csv, prices.csv, listings.csv, `rm/config.py`.
- The unit is set up in `rm/config.py` as a 2-bed in Canary Wharf (postcode "E14 (to confirm)"). It is not in `build/properties.py`. Smoobu 3547481; PriceLabs base £350, min £220, max £1,800, sync on.
- Two confirmed Airbnb bookings so far: 10–18 Oct (8 nights, £1,854.40, booked the same day) and 22–25 Oct (3 nights, £537.84, booked 17 Oct). Last 30 nights (19 Sep–18 Oct): 8 nights, 26.7%, ADR £231.80, RevPAR £61.81. The capacity counts 30 nights, but the first stay is 10 Oct and the go-live date is not in the data, so the occupancy reads low. The 365-night figure (2.2%) has the same problem and should not be read as performance.
- Forward: 3 of 29 nights Booked in the next 30 (10.3%, 22–24 Oct) and 3 of 59 in the next 60 (5.1%). 57 of 60 calendar nights (20 Oct–18 Dec) are open. 3.5% of open nights are at the £220 minimum. Min stay is 3–4 nights. PriceLabs market occupancy for the next 30 is 35% (MPI 0.29) and for the next 60 is 27%.
- Median lead (5 d) and LOS (8 n) come from 2 bookings, so the sample is too small to profile. There is no STLY.

### Gaps to fill (prices.csv, 20 Oct–18 Dec 2026)
- **No orphan gaps.** No open run between two bookings is shorter than the min stay in force. kpi_pack has `gaps: []` for every unit, and this was re-checked against prices.csv.
- Single open nights between bookings, at min stay 1: P04 1 Nov and 2 Dec; P11 18 Nov and 27 Nov; P12 17 Nov; P13 22 Oct.
- Short runs at min stay 2: P05 28–30 Oct (3 nights), 16–17 Nov and 7–8 Dec; P12 21–22 Oct; P13 25–26 Oct.
- Large open runs starting in the next 30 days: P04 7–24 Nov (18 nights); P08 26 Oct–7 Nov (13); P09 25–31 Oct (7); P11 28 Oct–2 Nov (6); P12 8–13 Nov (6); P13 31 Oct–3 Nov (4) and 8–12 Nov (5), with 4–7 Nov covered by an Airbnb booking (see the calendar note below), and 17–27 Nov (11); P14 all 60 nights open, 66.7% of open nights at the £500 minimum (special setup, numbers only); P20 57 of 60 nights open.
- Blocks outside the policy list: P05 3.4% of the next 30 is Blocked (reason unknown). P02, P06 and P07 are blocked on purpose (policy) and are not counted as gaps.

### Calendar consistency notes (evidence only)
- **P13:** reservations.csv has a confirmed Airbnb stay 4–8 Nov (booked 18 Oct). In prices.csv, listing 3064856 shows 4–7 Nov as available (£199–£212) in both the 18 Oct and the 19 Oct pull. A live PriceLabs read (`get_listing_prices` 3064856) today still shows those nights unbooked, and that listing was last refreshed 2026-10-18T09:25:51Z. The pack counts these nights as Booked through the linked-listing rule. It is not confirmed whether Smoobu/OTA availability for 3064856 is closed on those nights. The 28 Nov–1 Dec booking does show as Blocked on 3064856.
- **P01:** a confirmed Airbnb stay 18–21 Dec (booked 19 Oct) shows 18 Dec as available in prices.csv. PriceLabs last refreshed this listing at 2026-10-18T20:40:15Z, before the booking, so this is probably lag. Re-check in tomorrow's pull.

Data gaps:
1. P03 Bayswater: no reservations (not in Smoobu, priced via Channex). Last-30/365, pace, pickup and booking profile are UNKNOWN.
2. P03 Bayswater: prices.csv shows nights unavailable with no Booked/Blocked label, so forward occupancy 30/60 is UNKNOWN. The block is intentional (policy).
3. P04 Barking: no reservations (not in Smoobu). Last-30/365, pace, pickup and booking profile are UNKNOWN.
4. P15 Bow / Devons Road: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
5. P16 Little Venice: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
6. P17 St John's Wood: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
7. P18 Fulham: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
8. P19 Kings Langley: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
9. STLY: there are no Smoobu bookings for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20, so pace 30/90 vs STLY is UNKNOWN for 12 of the 13 mapped units. Only P12 has STLY.
10. prices.csv starts 20 Oct, so the night of 19 Oct is missing. Forward 30 therefore covers 29 nights and forward 60 covers 59.
11. reservations.csv booked_on is a date with no time or timezone, so bookings made on 18 Oct can't be placed before or after the 20:33–20:43 UTC base-price raise. The pack build time (20:24 UTC) was used as the only marker.
12. reservations.csv has no booking ID and no cancellation date. Cancellations are detected only by diffing snapshots, and STLY leaves out bookings that were live a year ago and cancelled later.
13. P20: the go-live date is unknown, so its last-30/365 capacity includes nights before it was live. The postcode is marked "to confirm".
14. PriceLabs calendar freshness: P13 listing 3064856 was last refreshed 18 Oct 09:25 UTC and P01 18 Oct 20:40 UTC, so availability for nights booked after those times may be stale in prices.csv.
15. The reason for P05's blocked night in the next 30 is not in the data.
16. market.csv is empty, so market ADR, price percentiles and ARI/RGI are UNKNOWN.
17. comps.csv is empty, so comp-set positioning is UNKNOWN.
18. channel_checks.csv is empty, so channel parity is UNKNOWN.

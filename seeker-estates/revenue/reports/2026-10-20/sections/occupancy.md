## Occupancy & performance

**Portfolio, last 30 nights (20 Sep–19 Oct 2026), 13 Smoobu-mapped units (P01, P02, P05–P14, P20): occupancy 70.3%, ADR £173.85, RevPAR £122.14, revenue £47,634.01 (274 nights).** Last 365 nights (20 Oct 2025–19 Oct 2026): occupancy 42.8%, ADR £184.61, RevPAR £79.10, revenue £375,320.23 (2,033 nights). Forward, Booked nights only (reservation-covered nights count as Booked, so P13's two listings are combined): 47.5% of the next 30 (193 of 406 nights, 21 Oct–18 Nov, 14 units with a calendar, P03 left out) and 34.0% of the next 60 (281 of 826, 21 Oct–18 Dec). 7-day pickup (bookings made 14–20 Oct): 13 bookings, 93 nights, £17,595.22.
Sources: `reports/2026-10-20/kpi_pack.json` (portfolio_last30/365 and per-property fields). The portfolio forward and pickup totals are sums of the pack's per-property figures. Revenue is Smoobu basePrice, before cleaning and commission. P03, P04 and P15–P19 have no reservation data, so they are left out of the totals rather than counted as zero.

### What changed since 19 Oct (19 Oct pack/snapshot vs 20 Oct)
- **Windows moved by one day.** Last 30 is now 20 Sep–19 Oct. Forward 30 is now 21 Oct–18 Nov: prices.csv starts the day after the run date again, so it covers 29 nights, and forward 60 covers 59. Pickup 7d now means bookings made 14–20 Oct.
- **reservations.csv went from 660 rows to 661. No new confirmed booking appeared.** The only differences are both on P20:
  - The Airbnb stay booked 10 Oct now ends on **22 Oct (12 nights) instead of 18 Oct (8 nights). The total is unchanged at £1,854.40** (cleaning £150, commission £310.68).
  - A new **Direct booking for 18–22 Oct (4 nights, £927.20, booked 19 Oct) has status cancelled.**
  - As a result, P20's last-30 nights went from 8 to 10 while revenue fell from £1,854.40 to £1,545.33 and ADR from £231.80 to £154.53 (the window dropped 19 Sep and added 19 Oct, and the extended stay now spreads its £1,854.40 over 12 nights). The revenue for the 4 added nights (18–21 Oct) is not in any confirmed row. Treat P20's ADR as unreliable until the stay is reconciled in Smoobu.
- **Calendar status changes on the dates both prices.csv files cover (21 Oct–18 Dec):**
  - P01: 18 Dec went from open to Booked (the 18–21 Dec booking made 19 Oct, now visible in PriceLabs).
  - P13 (listing 3064856): 4–7 Nov went from open to Blocked. This fixes yesterday's calendar note: the linked Airbnb stay of 4–8 Nov is now closed on the second listing.
  - P20: 21 Oct went from open to Booked (the extended stay).
  - P04: 21 Oct went from open to unavailable with no Booked/Blocked label. The reason is not in the data.
- **Forward Booked nights, fwd30 / fwd60, 19 Oct → 20 Oct:**
  - Changed: P02 8→7 / 8→7; P05 19→19 / 38→37; P08 12→11 / 12→11; P09 17→17 / 26→25; P10 29→29 / 30→29; P12 16→16 / 27→26; P13 16→15 / 24→23; P20 3→4 / 3→4.
  - Unchanged: P01 (29 / 41), P04, P06, P07, P11 and P14.
  - Apart from P20's 21 Oct, every change comes from the window moving (20 Oct dropped out; 18 Nov and 18 Dec came in).
- **Last 30, window shift only:** P06 23→22 nights (76.7%→73.3%), P08 29→30 (96.7%→100%), P11 26→25 (86.7%→83.3%), P05 ADR £387.20→£378.02. Portfolio 273→274 nights, revenue £48,452.35→£47,634.01.
- **Pickup 7d:** P06 went from 2 bookings / 13 nights / £2,310.12 to 1 / 11 / £1,956.10, because its booking made 13 Oct left the window. No other unit changed.
- **Pace:** P12's STLY for the 30-day window went from 21 to 23 nights as the year-ago window moved. Its pace30 is now −6 nights / +4.9% revenue (was −4 / +9.1%), and its pace90 is −13 nights / −29.1% (was −10 / −25.2%). OTB 30 is unchanged at 17 nights.
- **market.csv is absent from today's snapshot.** It was present on 19 Oct (PriceLabs neighbourhood percentiles). Market occupancy below comes from pl_kpis.csv through the pack.

### Bookings made on/after 18 Oct for the six units raised on 18 Oct
Base changes come from the PriceLabs activity log (`get_user_logs`, re-read 20 Oct; no base/min/max change since). All on 18 Oct, UTC: P05 £455→£500 at 20:33; P09 £160→£176 at 20:37; P01 £230→£253 at 20:38; P12 £270→£284 at 20:39; P06 £340→£357 at 20:40; P11 £260→£286 at 20:43. Bookings come from `data/snapshots/2026-10-20/reservations.csv` (pulled about 05:55 UTC on 20 Oct, so roughly 33 hours after the raises).

| Ref | Bookings booked_on ≥ 18 Oct | Nights | Revenue | ADR | Made after the raise? | Pre-18-Oct comparable (same unit, nearby stay dates) |
|---|---|---|---|---|---|---|
| P01 | 1 (Airbnb, stay 18–21 Dec, lead 60 d) | 3 | £720.90 | £240.30 | Yes (booked 19 Oct) | **None.** No pre-18-Oct P01 booking has nights in Dec 2026 or Jan 2027, or in Dec 2025 (P01 has no STLY). Its only other forward booking is 31 Oct–30 Nov (30 nights, £152.13/night, under the 20% monthly discount), which is not comparable. Context: the listed price for 18 Dec was £265 in the 19 Oct pull (after the raise, before the booking), and the booking paid £240.30/night on average across its 3 nights. Listed prices for 19–20 Dec before the booking, and any pre-raise price for 18 Dec, are not in any snapshot. |
| P05 | 1 (Airbnb, 22–29 Dec) | 7 | £4,527.95 | £646.85 | **No.** The booking is already in the 18 Oct pack built at 20:24:28 UTC, before the 20:33 raise. | For reference only: 30 Dec–4 Jan, 5 n, £637.74 (booked 25 Sep); 3–7 Dec, 4 n, £481.14; 9–13 Dec, 4 n, £433.25. The 7-night stay is under the 15% weekly discount. |
| P06 | 0 | 0 | £0 | — | — | — |
| P09 | 0 | 0 | £0 | — | — | — |
| P11 | 0 | 0 | £0 | — | — | — |
| P12 | 0 | 0 | £0 | — | — | — |

- **Post-raise total across the six units: 1 booking, 3 nights, £720.90 (P01).** There is no pre-raise comparable for its dates, so the ADR before vs after the raise is UNKNOWN.
- Baseline counts, not a forecast: the same six units took 35 confirmed bookings made 18 Sep–17 Oct (P01 2, P05 6, P06 6, P09 5, P11 8, P12 8; reservations.csv, booked_on). That is 30 days. The post-raise window is about 1 day of booked_on dates, so it is too short to judge conversion. booked_on has no time or timezone, so the 18 Oct date can't be split at the raise time except through the pack build time.
- P01 has nothing open in the next 30 (100% Booked), so it cannot pick up there whatever its price.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 20 Sep–19 Oct 2026 (kpi_pack `last30`, Smoobu).
- Fwd occ30: Booked nights ÷ 29, for 21 Oct–18 Nov (kpi_pack `forward_occ_30`, prices.csv). The Blocked share and the PriceLabs market occupancy for the next 30 (`market_occ_30`) are in brackets.
- Pace30: stays 20 Oct–18 Nov on the books on 20 Oct vs the same window as at 20 Oct 2025 (kpi_pack `pace_30`).
- Pickup 7d: bookings made 14–20 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.81 | £161.81 | 100.0% (0%; 33%) | UNKNOWN: no STLY; OTB 30 n / £4,675.92 | 2 / 33 / £5,284.80 | Compressed |
| P02 | Ladbroke Grove | 96.7% | £119.65 | £115.67 | 24.1% (72.4%; 46%) | UNKNOWN: no STLY; OTB 8 n / £789.74 | 1 / 4 / £417.24 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (unlabelled unavailable nights; mkt 48%) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN | UNKNOWN | UNKNOWN | 48.3% (0%; 27%) | UNKNOWN: no reservations | UNKNOWN | Soft (fwd occ30 < 60%) |
| P05 | St John's Wood (4-bed) | 76.7% | £378.02 | £289.81 | 65.5% (3.4%; 33%) | UNKNOWN: no STLY; OTB 20 n / £7,858.12 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 73.3% | £213.39 | £156.49 | 48.3% (37.9%; 43%) | UNKNOWN: no STLY; OTB 14 n / £2,588.75 | 1 / 11 / £1,956.10 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (100%; 26%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £168.25 | £168.25 | 37.9% (0%; 49%) | UNKNOWN: no STLY; OTB 12 n / £1,717.40 | 1 / 6 / £776.46 | Soft |
| P09 | Greenwich | 96.7% | £116.28 | £112.41 | 58.6% (0%; 38%) | UNKNOWN: no STLY; OTB 18 n / £1,927.91 | 1 / 12 / £1,232.50 | Soft |
| P10 | Ealing / Hanger Lane | 76.7% | £113.03 | £86.66 | 100.0% (0%; 31%) | UNKNOWN: no STLY; OTB 30 n / £3,178.92 | 0 / 0 / £0 | Compressed |
| P11 | Camden | 83.3% | £154.76 | £128.97 | 62.1% (0%; 46%) | UNKNOWN: no STLY; OTB 18 n / £3,219.84 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P12 | Mile End | 80.0% | £198.51 | £158.81 | 55.2% (0%; 40%) | −6 n (17 vs 23) / +4.9% (£3,353.20 vs £3,197.08) | 2 / 5 / £849.98 | Soft (fwd occ30 < 60%) |
| P13 | Shepherd's Bush (one flat, 2 listings) | 96.7% | £162.85 | £157.43 | 51.7% (0%; 41%) | UNKNOWN: no STLY; OTB 16 n / £2,427.43 | 3 / 12 / £2,012.35 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (0%; 41%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 33.3% | £154.53* | £51.51* | 13.8% (0%; 34%) | UNKNOWN: no STLY; OTB 5 n / £846.91 | 1 / 3 / £537.84 | Soft |

\* P20's ADR and RevPAR are affected by the extended stay with an unchanged total (see above).

How classes were set:
- **Compressed:** fwd occ30 ≥ 85%.
- **Soft:** fwd occ30 < 60%, or pace behind STLY by more than 10%.
- **On track:** needs an STLY figure, so a unit at 60–85% with no STLY is Unclassifiable.
- **Not classified:** P02, P03, P06 and P07 are blocked on purpose (policy), and blocked nights are not demand.

No class changed since 19 Oct. P12 is the only unit with STLY. Its 30-day revenue is +4.9% (within ±10%), but it is 6 nights behind, and its fwd occ30 of 55.2% makes it Soft.

### Last 365 nights, forward 60 vs market, pace 90, booking profile
Windows and sources:
- Last 365: 20 Oct 2025–19 Oct 2026 (kpi_pack `last365`). Capacity is 365 for every unit, including nights before a unit went live.
- Fwd60: Booked ÷ 59, for 21 Oct–18 Dec, against PriceLabs market occupancy for the next 60.
- Pace90: stays 20 Oct 2026–17 Jan 2027 vs the same window as at 20 Oct 2025.
- Profile: all confirmed bookings in reservations.csv (kpi_pack `booking_profile`).

| Ref | Occ365 | ADR365 | RevPAR365 | Rev365 | Fwd60 (mkt) | Pace90 | Bookings | Median lead | Median LOS | Channel revenue share |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 35.3% | £179.38 | £63.40 | £23,140.18 | 69.5% (25%) | no STLY; OTB 44 n / £7,070.25 | 21 | 15 d | 5 n | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 77.5% | £129.43 | £100.35 | £36,629.25 | 11.9% (39%), blocked on purpose | no STLY; OTB 8 n / £789.74 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 40.7% (21%) | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |
| P05 | 54.2% | £372.61 | £202.13 | £73,776.74 | 62.7% (33%) | no STLY; OTB 50 n / £24,958.96 | 59 | 44 d | 4 n | Airbnb 100% |
| P06 | 32.1% | £241.84 | £77.52 | £28,295.48 | 23.7% (40%), blocked on purpose | no STLY; OTB 14 n / £2,588.75 | 30 | 16 d | 4 n | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 | 0.0% (20%), blocked on purpose | no STLY; OTB 0 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 36.2% | £177.75 | £64.28 | £23,463.63 | 18.6% (43%) | no STLY; OTB 12 n / £1,717.40 | 20 | 16 d | 6 n | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 37.8% | £115.05 | £43.50 | £15,876.36 | 42.4% (30%) | no STLY; OTB 26 n / £2,749.58 | 22 | 18 d | 7 n | Airbnb 60.5%, Booking.com 37.9%, Direct 1.6% |
| P10 | 34.5% | £115.22 | £39.77 | £14,517.63 | 49.2% (24%) | no STLY; OTB 30 n / £3,178.92 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 74.5% | £174.07 | £129.72 | £47,346.24 | 67.8% (39%) | no STLY; OTB 52 n / £11,248.12 | 70 | 31 d | 4 n | Booking.com 55.8%, Airbnb 42.3%, Agoda 1.9% |
| P12 | 82.2% | £190.84 | £156.86 | £57,252.37 | 44.1% (33%) | **−13 n (27 vs 40) / −29.1% (£5,257.21 vs £7,414.66)** | 85 | 31 d | 4 n | Booking.com 90.1%, Airbnb 9.9% |
| P13 | 75.6% | £158.53 | £119.88 | £43,754.92 | 39.0% (35%) | no STLY; OTB 24 n / £3,841.07 | 82 | 21 d | 3 n | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 | 0.0% (38%) | no STLY; OTB 0 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 2.7% | £154.53* | £4.23* | £1,545.33* | 6.8% (27%) | no STLY; OTB 5 n / £846.91 | 2 | 5 d | 12 n | Airbnb 100% |

P03 and P15–P19: every column is UNKNOWN (see Data gaps). P20's 365-night figures include nights before it went live, and its profile (2 bookings) is too small to read.

### Gaps to fill (prices.csv, 21 Oct–19 Dec 2026)
- **Orphan gaps (an open run between bookings that is shorter than the min stay in force): none.** kpi_pack has `gaps: []` for every unit, and this was re-checked against prices.csv.
- **Single open nights between bookings (min stay 1):** P04 1 Nov and 2 Dec; P11 18 Nov and 27 Nov; P12 17 Nov; P13 22 Oct (after a Blocked night on 21 Oct).
- **Short runs at min stay 2:** P05 28–30 Oct (3 nights, after its Blocked night), 16–17 Nov and 7–8 Dec; P13 25–26 Oct.
- **Next-two-nights runs:** P12 21–22 Oct are open (min stay 2) before a booking that arrives 23 Oct.
- **No longer a gap:** P13 4–7 Nov is now closed on listing 3064856 (linked stay).
- **Blocks outside the policy list:** P05 has 3.4% of the next 30 Blocked (reason unknown). P04 has 21 Oct unavailable with no label. P02, P06 and P07 are blocked on purpose (policy) and are not counted as gaps.

Data gaps:
1. P03 Bayswater: no reservations (not in Smoobu, priced through Channex). Last-30/365, pace, pickup and booking profile are UNKNOWN. prices.csv shows unavailable nights with no Booked/Blocked label, so forward occupancy is UNKNOWN. The block is intentional (policy).
2. P04 Barking: no reservations (not in Smoobu). Last-30/365, pace, pickup and booking profile are UNKNOWN. The reason 21 Oct is unavailable is not in the data.
3. P15 Bow / Devons Road, P16 Little Venice, P17 St John's Wood, P18 Fulham, P19 Kings Langley: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
4. STLY: there are no Smoobu bookings for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20, so pace 30/90 vs STLY is UNKNOWN for 12 of the 13 mapped units. Only P12 has STLY.
5. Post-raise comparison: P01 has no pre-18-Oct booking with stay dates near 18–21 Dec (and no Dec 2025 history), so its before/after ADR is UNKNOWN. Pre-booking listed prices for 19–20 Dec and a pre-raise price for 18 Dec are not in any snapshot (the 18 Oct pull ended 17 Dec, the 19 Oct pull ended 18 Dec).
6. reservations.csv booked_on is a date with no time or timezone, so 18-Oct bookings can only be placed relative to the 20:33–20:43 UTC raise through the 18 Oct pack build time (20:24:28 UTC).
7. P20: the Airbnb stay of 10 Oct was extended to 22 Oct with the total unchanged (£1,854.40), and a cancelled Direct booking (18–22 Oct, £927.20) appeared. The revenue for 18–21 Oct is not in any confirmed row, so P20's last-30/365 ADR and RevPAR are unreliable. P20's go-live date is also unknown.
8. reservations.csv has no booking ID and no cancellation or modification date. Changes are found only by diffing snapshots, and STLY leaves out bookings that were live a year ago and cancelled later.
9. prices.csv starts 21 Oct, so the night of 20 Oct is missing. Forward 30 covers 29 nights and forward 60 covers 59.
10. market.csv is absent from the 2026-10-20 snapshot (pack: "empty"; it was present on 19 Oct). Market ADR, price percentiles and ARI/RGI are UNKNOWN. Market occupancy comes only from PriceLabs pl_kpis.csv.
11. comps.csv is empty, so comp-set positioning is UNKNOWN.
12. channel_checks.csv is empty, so channel parity is UNKNOWN.
13. The reason for P05's blocked night in the next 30 is not in the data.

## Occupancy & performance

**Portfolio, last 30 nights (24 Sep–23 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20): occupancy 69.7%, ADR £174.56, RevPAR £121.74, revenue £47,479.42 (272 nights).** Last 365 nights (24 Oct 2025–23 Oct 2026): occupancy 43.6%, ADR £184.57, RevPAR £80.44, revenue £381,692.13 (2,068 nights). Source: `reports/2026-10-24/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Forward, handback-aware.** Booked nights are confirmed Smoobu stays (`data/snapshots/2026-10-24/reservations.csv`, pulled 05:54 on 24 Oct). Blocked nights come from `prices.csv`, which runs 25 Oct–23 Dec. Nights after a handback are not counted as inventory (policy `handbacks`). P01's 30 Nov–17 Dec block (inside the handback set) counts as Blocked. Covers 14 units; P03 is left out.
- Next 30 (24 Oct–22 Nov): **171 of 407 inventory nights Booked = 42.0%.** With Blocked nights also taken out it is 51.4% (171/333). Yesterday it was 43.3% (177/409, window 23 Oct–21 Nov). The drop comes from the window moving forward, not from a cancellation.
- Next 60 (24 Oct–22 Dec): **245 of 730 = 33.6%**, or 44.7% (245/548) without Blocked nights. Yesterday it was 35.1% (252/717).

**7-day pickup (bookings made 18–24 Oct, up to 05:54 on 24 Oct): 6 bookings, 22 nights, £7,148.59.** By unit: P01 1, P05 1, P09 1, P13 2, P20 1. All six are Airbnb. Source: sum of kpi_pack `pickup_7d`, which leaves out P04's 20 Oct import rows.
- In the same week, 2 Booking.com stays were cancelled (P12 1–8 Nov and P11 19–27 Nov): 15 nights, £3,119.27. Both were found in the 23 Oct snapshot. Net nights picked up: +7.
- **The only booking made since 21 Oct is P09's (made 23 Oct).** reservations.csv has no booking made on 22 Oct and none on 24 Oct up to 05:54.

### Overnight change (23 Oct → 24 Oct snapshot)
- Exactly two rows were added to reservations.csv. No existing row changed.
  - **New, P09 Greenwich:** Airbnb, 13–15 Nov, 2 n, £253.21 (£126.61/night), made 23 Oct.
  - P01: a cancelled Airbnb stay, 22–26 Apr 2027, made 4 Sep. It appears only because the window's end date moved forward (Dispatcher). It is not a new event and is left out of all figures.
- **P11 PriceLabs calendar has caught up with the cancellation.** In `prices.csv`, 19–26 Nov changed from Booked (23 Oct) to available (24 Oct), with min stay 2. 18–27 Nov is now one open run of 10 nights at £214–£326/night. The single nights changed:
  - 18 Nov: £314 → £214, min stay 1 → 2.
  - 27 Nov: £589 → £326, min stay 1 → 2.

  So the 23 Oct orphan prices on those nights no longer apply. This compares the 23 Oct and 24 Oct `prices.csv`; which setting changed is NOT CHECKED (no `get_user_logs` call in this section).
- **P09 PriceLabs calendar has not yet picked up the new booking.** 13 and 14 Nov still show as available, at £163 and £168 (`prices.csv`). A live `get_listing_prices` call for 3318172 shows the same, with `last_refreshed_at` 2026-10-23T08:51:57Z. That refresh came before the booking reached the snapshot. Until PriceLabs refreshes, kpi_pack `forward_occ_30`/`forward_occ_60` for P09 undercount by these 2 nights.
- **P05 28 Oct is newly Blocked.** It was open on 23 Oct. 27 Oct is still Blocked. The reason for either block is not in the data.
- Other changes are min-stay edits on nights that were already Blocked or open: 22 Dec on P06, P07, P12 and P14 went from 4 to 3.

### Raised flats: bookings made since the 18 Oct rises vs the 14 days before
Source: reservations.csv, `booked_on`. That field is a date with no time.
- "Since" is 18–24 Oct: 6 full days, plus 24 Oct up to 05:54.
- "Before" is 4–17 Oct: 14 days.
- Open nights are 24 Oct–22 Dec, before handback, not booked in Smoobu and not Blocked.

| Ref | Change | Bookings made since 18 Oct | Made 4–17 Oct | Cancelled in the period | Open nights left |
|---|---|---|---|---|---|
| P01 | base 253 | 1: 19 Oct, Airbnb, 18–21 Dec, 3 n, £720.90 | 1: 15 Oct, Airbnb, 31 Oct–30 Nov, 30 n, £4,563.90 | 0 | 0 (sold out to handback 20 Dec) |
| P05 | base 500 (18 Oct), then 550 (20 Oct) | 1: 18 Oct, Airbnb, 22–29 Dec, 7 n, £4,527.95. Whether it was made before or after the raise is not in reservations.csv. **0 since the £550 base on 20 Oct.** | 2 made: 1 still confirmed (18–22 Nov, 4 n, £1,835.10); 1 made 5 Oct (27–30 Dec, £1,887.00), since cancelled | 0 | 23 (incl. 13–21 Dec, 9 n) |
| P06 | base 357 | 0 | 5 made: 4 still confirmed (18 n, £3,400.07); 1 since cancelled (25–30 Oct, £929.85) | 0 | 3 (5–7 Nov; the rest is blocked on purpose) |
| **P09** | base 176 | **1 (new): 23 Oct, Airbnb, 13–15 Nov, 2 n, £253.21 = £126.61/night** | 3 (23 n, £2,371.55) | 0 | 9 (26–31 Oct, 10–12 Nov; handback after 26 Nov) |
| P11 | base 286 (13–17 Dec also raised on 21 Oct) | 0 | 1 (4 n, £650.48) | 19–27 Nov (made 19 Sep): −8 n, −£1,736.41 | 27 |
| P12 | base 284 | 0 | 2 (5 n, £849.98) | 1–8 Nov (made 3 Oct): −7 n, −£1,382.86 | 33 (to handback 13 Dec) |
| **Total** | | **3 bookings, 12 n, £5,502.06** | **14 made, 13 still confirmed, 84 n, £13,671.08** | −15 n, −£3,119.27 | 95 |

- **Booking rate:** 0.5 per day made since 18 Oct (3 in the 6 full days) vs 1.0 per day made 4–17 Oct (14 in 14 days; 0.93 per day counting only the 13 still confirmed). P06, P11 and P12 still have no booking since the rise. Net nights since 18 Oct: −3 (+12 booked, −15 cancelled).
- **P09's new booking vs the PriceLabs price:** the room total of £253.21 is 77.0% of the PriceLabs price for 13–14 Nov in the 23 Oct `prices.csv` (£162 + £167 = £329), i.e. −23.0%. The live `get_listing_prices` `user_price` today is also £162 + £167.
  - A 2-night stay gets no stay discount (policy).
  - The PriceLabs price at the moment of booking is not in the data, and P09's Airbnb discount settings are unknown.
  - The paid-vs-price judgement belongs to the channel section.
- About 6 days is still too few to judge, and supply keeps shrinking: P01 and P10 have no open nights left, and P09's window ends 26 Nov. Formal review is 26 Oct (policy `price_changes`).
- **Units without a rise, for comparison:**

  | Ref | Made since 18 Oct | Made 4–17 Oct |
  |---|---|---|
  | P13 | 2 (both on 18 Oct, 7 n, £1,116.61) | 4 |
  | P20 | 1 confirmed (21 Oct) | 2 |
  | P08 | 0 | 1 |
  | P10 | 0 | 2 |
  | P02 | 0 | 2 |

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 24 Sep–23 Oct (kpi_pack `last30`).
- Fwd occ30: Booked ÷ inventory nights for 24 Oct–22 Nov. Booked nights come from reservations.csv, Blocked nights from prices.csv, and post-handback nights are taken out. Brackets show the Blocked nights and the PriceLabs market occupancy for the next 30 (kpi_pack `market_occ_30`).
- Pace30: kpi_pack `pace_30` (stays 24 Oct–22 Nov vs the same window as it stood on 24 Oct 2025).
- Pickup 7d: bookings made 18–24 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100.0% 30/30 (0; 33%) | UNKNOWN: no STLY. OTB 30 n / £4,635.18 | 1 / 3 / £720.90 | Compressed (0 open nights to handback 20 Dec) |
| P02 | Ladbroke Grove | 96.7% | £117.21 | £113.30 | 13.3% 4/30 (25 blocked on purpose; 47%) | UNKNOWN: no STLY. OTB 4 n / £417.24 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (not in Smoobu; 49%) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN (in Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 23.3% 7/30 (0; 25%) | UNKNOWN: no history. OTB 7 n / £844.09 | 0 / 0 / £0 (import rows left out) | Soft (fwd < 60%) |
| P05 | St John's Wood (4-bed) | 76.7% | £389.88 | £298.91 | 66.7% 20/30 (2: 27–28 Oct; 38%) | UNKNOWN: no STLY. OTB 20 n / £8,273.63 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £210.02 | £140.01 | 40.0% 12/30 (15 blocked on purpose; 44%) | UNKNOWN: no STLY. OTB 12 n / £2,166.98 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (29 blocked on purpose; 25%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £166.55 | £166.55 | 38.1% 8/21 to handback 13 Nov (0; 50%) | UNKNOWN: no STLY. OTB 8 n / £1,090.11 | 0 / 0 / £0 | Soft (13 open nights to handback) |
| P09 | Greenwich | 96.7% | £118.76 | £114.80 | **66.7% 20/30** (1: 25 Oct; 37%). Was 60.0% yesterday | UNKNOWN: no STLY. OTB 20 n / £2,074.70 | 1 / 2 / £253.21 | Unclassifiable (60–85%, no STLY). Yesterday it sat exactly on the 60% line |
| P10 | Ealing / Hanger Lane | 76.7% | £114.95 | £88.13 | 100.0% 26/26 to handback 18 Nov (0; 30%) | UNKNOWN: no STLY. OTB 26 n / £2,755.07 | 0 / 0 / £0 | Compressed (0 open nights to handback) |
| P11 | Camden | 80.0% | £163.24 | £130.59 | 50.0% 15/30 (0; 45%) | UNKNOWN: no STLY. OTB 15 n / £2,673.36 | 0 / 0 / £0 | Soft |
| P12 | Mile End | 73.3% | £196.61 | £144.18 | 40.0% 12/30 (0; 40%) | **−10 n / −26.8%** (OTB £2,302.48 vs STLY £3,146.18). To handback 13 Dec: −15 n / −38.2% | 0 / 0 / £0 | Soft |
| P13 | Shepherd's Bush (one flat, 2 listings) | 93.3% | £160.81 | £150.09 | 43.3% 13/30 (0; 41%) | UNKNOWN: no STLY. OTB 13 n / £1,908.76 | 2 / 7 / £1,116.61 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% 0/30 (0; 41%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 46.7% | £158.07* | £73.77* | 13.3% 4/30 (2: 20–21 Nov; 35%) | UNKNOWN: no STLY. OTB 4 n / £709.20 | 1 / 3 / £529.92 | Soft |

\* P20: the 18–22 Oct extension nights were paid separately (policy), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 2: P01, P10. Both are sold out to handback.
- Soft 7: P04, P08, P11, P12, P13, P14, P20.
- Unclassifiable 7: P05, P09 (inputs missing: no STLY) and P15–P19 (no data).
- Not classified by policy: P02, P03, P06, P07 (intentional blocks).
- Pace30 is measurable only for P12, so no unit qualifies as Compressed or On track on pace.

**Pace90** (kpi_pack `pace_90`, stays 24 Oct–21 Jan; not handback-aware): P12 −23 n / −56.9% (OTB 18 n / £3,429.11 vs STLY 41 n / £7,947.22). It is UNKNOWN for every other unit (no STLY). OTB nights / revenue:

| Ref | OTB nights | OTB revenue |
|---|---|---|
| P01 | 40 | £6,420.99 |
| P04 | 30 | £4,664.38 |
| P05 | 46 | £23,376.67 |
| P06 | 12 | £2,166.98 |
| P08 | 8 | £1,090.11 |
| P09 | 24 | £2,485.53 |
| P10 | 26 | £2,755.07 |
| P11 | 41 | £8,965.23 |
| P13 | 21 | £3,322.40 |
| P20 | 4 | £709.20 |

**Forward 60, handback-aware** (24 Oct–22 Dec; Booked ÷ inventory nights; PriceLabs market occupancy for the next 60 from kpi_pack `market_occ_60`):

| Ref | Booked / inventory nights | Fwd occ 60 | Note |
|---|---|---|---|
| P01 | 40/40 | 100% | not counting 18 handback-set Blocked nights |
| P02 | 4/60 | 6.7% | blocked on purpose |
| P04 | 20/60 | 33.3% | |
| P05 | 35/60 | 58.3% | |
| P06 | 12/60 | 20.0% | blocked on purpose |
| P07 | 0 | 0% | blocked on purpose |
| P08 | 8/21 | 38.1% | to 13 Nov |
| P09 | 24/34 | 70.6% | to 26 Nov |
| P10 | 26/26 | 100% | to 18 Nov |
| P11 | 33/60 | 55.0% | |
| P12 | 18/51 | 35.3% | to 13 Dec |
| P13 | 21/60 | 35.0% | |
| P14 | 0/60 | 0% | |
| P20 | 4/60 | 6.7% | |

**Last 365 and booking profile** (24 Oct 2025–23 Oct 2026; kpi_pack `last365`, `booking_profile`). The profile covers all confirmed bookings in reservations.csv.

| Ref | Occupancy | ADR | RevPAR | Median lead | Median LOS | Channel revenue share |
|---|---|---|---|---|---|---|
| P01 | 36.4% | £178.87 | £65.18 | 15 d | 5 n | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 78.6% | £128.93 | £101.37 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P05 | 55.3% | £373.06 | £206.46 | 44 d | 4 n | Airbnb 100% |
| P06 | 32.6% | £241.32 | £78.68 | 16 d | 4 n | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 11.5% | £133.90 | £15.41 | 3 d | 4 n | Airbnb 100% |
| P08 | 37.3% | £177.14 | £66.00 | 16 d | 6 n | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 38.9% | £115.45 | £44.91 | 18 d | 6 n | Airbnb 61.0%, Booking.com 37.4%, Direct 1.5% |
| P10 | 35.6% | £114.93 | £40.94 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 75.3% | £174.16 | £131.21 | 28 d | 4 n | Booking.com 54.5%, Airbnb 43.6%, Agoda 1.9% |
| P12 | 81.9% | £191.63 | £156.98 | 31 d | 4 n | Booking.com 89.7%, Airbnb 10.3% |
| P13 | 76.4% | £158.69 | £121.30 | 21 d | 3 n | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 2.7% | £409.84 | £11.23 | 57 d | 10 n | 1 booking |
| P20 | 3.8% | £158.07* | £6.06* | 5 d | 3 n | 3 bookings; Airbnb 100% |

P04: UNKNOWN (no history before 20 Oct).

### Gaps to fill (24 Oct–22 Dec, before handback; reservations.csv laid over prices.csv)
- **Orphan gaps (open runs shorter than the min stay in force, between two bookings): none.** kpi_pack `gaps` is empty for every unit. The Smoobu-over-PriceLabs overlay finds none either.
  - **P04 25 Oct** sits between the 22–25 Oct and 26 Oct–1 Nov stays, with min stay 3. PriceLabs shows it as unavailable with no label, and no confirmed Smoobu stay covers it. It would be an orphan if it were open. It has been unexplained since 22 Oct and is now 1 day out.
  - **P11 18 Nov and 27 Nov are no longer single nights.** They are part of the 18–27 Nov open run (10 n, min 2).
- **Single open nights where min stay is 1:** P04 2 Dec; P12 17 Nov; P13 1 Dec (the 1-night minimum is intentional, per policy).
- **Short runs that exactly meet the min stay:** P20 25–27 Oct (3, min 3); P13 25–26 Oct (2, min 2); P05 29–30 Oct (2, min 2, after the 27–28 Oct block), 16–17 Nov and 7–8 Dec (2, min 2).
- **Open nights left before handback, by unit:**

  | Ref | Open nights | Dates |
  |---|---|---|
  | P08 | 13 | 26 Oct–7 Nov |
  | P09 | 9 | 26–31 Oct, 10–12 Nov. 13–14 Nov are now booked in Smoobu, though PriceLabs still shows them as open |
  | P11 | 27 | 28 Oct–2 Nov, 10–13 Nov, 18–27 Nov, 12–18 Dec |
  | P12 | 33 | 26–29 Oct, 1–13 Nov, 17 Nov, 29 Nov–13 Dec |
  | P05 | 23 | 29–30 Oct, 6–9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec |
  | P13 | 39 | 25–26 Oct, 31 Oct–3 Nov, 8–12 Nov, 17–27 Nov, 1 Dec, 7–22 Dec |
  | P04 | 39 | 1–24 Nov, 2 Dec, 6–19 Dec |
  | P20 | 54 | 25–27 Oct, 31 Oct–19 Nov, 22 Nov–22 Dec |
  | P14 | 59 | 25 Oct–22 Dec |
  | P01, P10 | none | |

- **Blocks outside policy:**
  - P05 27–28 Oct (28 Oct is new today).
  - P20 20–21 Nov (since 23 Oct).

  The reasons are not in the data. P09 25 Oct is recorded in policy `handbacks`.

Data gaps:
1. **P09's PriceLabs calendar is stale.** The 13–15 Nov Airbnb booking (made 23 Oct) is not yet shown: 13–14 Nov are still available and priced (live `get_listing_prices` 3318172, `last_refreshed_at` 2026-10-23T08:51:57Z). kpi_pack `forward_occ_30/60` and pl_kpis `occupancy_next_30` for P09 undercount by 2 nights.
2. **STLY.** There are no Smoobu bookings for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20. Their first `booked_on` dates are between 5 Nov 2025 (P02) and 10 Oct 2026 (P20). So pace 30/90 is UNKNOWN for them; `pace_vs_stly` returns STLY 0, not null. Only P12 has STLY, and its STLY leaves out bookings that were later cancelled.
3. **Cancellation reasons and cancellation dates are not in reservations.csv** (there is no cancelled_on field). Cancellations are found by diffing snapshots.
4. **`booked_on` has no time,** and the PriceLabs price at the moment of booking is not stored. As a result:
   - Whether P05's 18 Oct booking came before or after the raise cannot be confirmed.
   - P09's paid-vs-price is measured against the 23 Oct snapshot price.
   - P09's Airbnb discount settings are UNKNOWN.
5. **P04 Barking:** Smoobu history starts 20 Oct, so last-30/365, pace, lead time and channel mix are UNKNOWN. Why 25 Oct is unavailable is not in the data.
6. **P03 Bayswater** is not in Smoobu, so all its KPIs are UNKNOWN (intentional block per policy).
7. **P15–P19** are not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
8. **The pipeline is not handback-aware.** kpi_pack `forward_occ_30/60`, `pace_90` and kpi_summary "Booked next 30" ignore policy `handbacks`. Its PriceLabs-based `forward_occ_30` also uses a different window (prices.csv from 25 Oct). The handback-aware figures here were recomputed from reservations.csv and prices.csv.
9. **prices.csv starts 25 Oct,** so the night of 24 Oct has no Blocked/available status; it is counted from Smoobu only. prices.csv ends 23 Dec.
10. **Block reasons are UNKNOWN** for P05 27–28 Oct and P20 20–21 Nov. Which PriceLabs setting moved P11 18/27 Nov prices and min stays is NOT CHECKED (no `get_user_logs` call in this section).
11. **P20:** the payment for the 18–22 Oct extension is not in any file (policy), so ADR30 and RevPAR30 are understated.
12. **market.csv, comps.csv and channel_checks.csv are empty** (kpi_pack `missing`). Market ADR, ARI/RGI and price percentiles are UNKNOWN. Market occupancy comes only from PriceLabs (kpi_pack `market_occ_30/60`).
13. **Last-365 occupancy uses capacity 365** even where Smoobu history starts in 2026. Go-live dates are UNKNOWN.

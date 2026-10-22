## Occupancy & performance

**Portfolio, last 30 nights (22 Sep–21 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20): occupancy 69.7%, ADR £172.76, RevPAR £120.49, revenue £46,990.16 (272 nights).** Last 365 nights (22 Oct 2025–21 Oct 2026): occupancy 43.2%, ADR £184.52, RevPAR £79.72, revenue £378,269.05 (2,050 nights). Source: `reports/2026-10-22/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). P04 (in Smoobu only since 20 Oct), P03 and P15–P19 are left out, not counted as zero.

**Forward, Booked nights only, handback-aware** (`data/snapshots/2026-10-22/prices.csv` with Smoobu reservations laid over it, the same way the pack does it; 14 units with a calendar, P03 left out). prices.csv starts 23 Oct, so the night of 22 Oct is not covered.
- Next 30 (23 Oct–20 Nov, 29 nights): 182 Booked nights. That is 44.8% of 406 calendar nights, or **45.8% of 397 inventory nights** once the post-handback nights are taken out (P08 14–20 Nov, P10 19–20 Nov). With every Blocked night also taken out, it is 55.2% (182/330).
- Next 60 (23 Oct–20 Dec, 59 nights): 265 Booked nights. That is 32.1% of 826, or **37.4% of 708 inventory nights**. The 118 non-inventory nights are P08 37, P09 24, P10 32, P12 7, and P01's 30 Nov–17 Dec gap block (18), which policy places inside the handback block set. With every Blocked night also taken out, it is 48.1% (265/551).
- On 21 Oct, before the handback rule existed: 46.6% (189/406) for the next 30 and 33.2% (274/826) for the next 60.

**7-day pickup (bookings made 16–22 Oct; the reservations pull ran at 05:55 on 22 Oct; P04's 20 Oct import rows left out): 9 bookings, 45 nights, £11,061.52.** All 9 are Airbnb. Source: reservations.csv, which matches kpi_pack `pickup_7d`.

### What changed since 21 Oct (21 Oct snapshot vs 22 Oct)
- **One new booking: P20 Airbnb, stay 28–31 Oct, 3 nights, £529.92, booked 21 Oct.** reservations.csv went from 666 rows to 667. That is the only row added, and no row was removed or changed status. It is the first Airbnb booking made on or after 21 Oct, the day the manual Airbnb promotions were removed.
  - **The PriceLabs calendar still shows P20 28–30 Oct as open** (`available=True`, no booking status, in prices.csv). The live PriceLabs read (`get_listing_prices` 3547481, run today) shows the same and reports `last_refreshed_at` 2026-10-21T08:52:04Z. PriceLabs has not refreshed this listing since before the booking came in. Whether the nights are still open on Airbnb or Booking.com is not in the data. The pack and this report count the nights as Booked because the Smoobu reservation covers them.
- **P04 Barking is now priced from the Smoobu listing only** (3562176; the Channex listing and old Smoobu 3254047 are no longer in PriceLabs, per `data/id_map.json` and `listings.csv`). The 2–6 Nov nights that showed as Booked on the Channex calendar now show as open. They belonged to the 2–7 Nov stay that is cancelled in Smoobu. **P04 fwd30 is now 27.6% (8/29), down from 48.3%.** This matches the confirmed Smoobu stays and PriceLabs' own 30% (`pl_kpis.csv` occupancy_next_30), which settles yesterday's two-source question. It is a change of data source, not a lost booking.
- **Handbacks applied (policy.json `handbacks`, 21 Oct).** Nights after the last night no longer count as inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec (P01's 30 Nov–17 Dec block is also inside the set). Yesterday's open question about the 19 Oct "Blocked channel" blocks is now answered by policy.
  - **P01 and P10 have 0 open nights left before their handbacks.** P01 has 41 of 41 inventory nights Booked from 23 Oct to 20 Dec. P10 has 27 of 27 Booked from 23 Oct to 18 Nov.
  - P08 has 13 open nights and P09 has 11 before handback.
- **Window shift only (no new bookings) for every other unit:**
  - Fwd30 Booked nights moved P02 6→5, P06 14→13, P08 10→9, P10 28→27 (22 Oct dropped out) and P12 17→18 (20 Nov came in).
  - Last 30: P06 21→20 nights (70.0%→66.7%), P12 24→23 (80.0%→76.7%), P20 11→12 (36.7%→40.0%), P05 ADR £368.84→£374.80.
  - Pickup 7d: P01 2/33/£5,284.80→1/3/£720.90, P02 1/4/£417.24→0, P12 1/2/£318.78→0, P20 1/3/£537.84→2/6/£1,067.76. Portfolio 11/78/£15,831.52→9/45/£11,061.52.
- **P12 pace30** (stays 22 Oct–20 Nov, OTB on 22 Oct vs the same window as at 22 Oct 2025): −4 nights (18 vs 22, −18.2%) and **+15.6% revenue** (£3,540.32 vs £3,063.63). Yesterday it was −6 nights / +4.6%.
  - **P12 pace to handback** (stays 22 Oct–13 Dec, recomputed from reservations.csv): −9 nights (26 vs 35) and **−13.1% revenue** (£5,051.26 vs £5,813.31).
  - The pack's pace90 (−13 n / −30.6%) still includes 14 Dec–19 Jan, which policy says is not inventory, so this report uses the handback-limited figure.
- **Market occupancy, next 30** (`pl_kpis.csv`): every unit is within 1 point of 21 Oct.

### Effect so far of the price changes: bookings made since
Change times come from policy.json `price_changes` and yesterday's PriceLabs log: 18 Oct base rises at 20:33–20:43Z; P05 £550 on 20 Oct at 09:27Z; P13 +10% on 20 Oct at 09:30Z. Bookings come from `data/snapshots/2026-10-22/reservations.csv`, where `booked_on` is a date with no time. Open nights are bookable, pre-handback nights from 23 Oct to 20 Dec in prices.csv.

| Ref | Change | Bookings made since (booked_on) | Nights / revenue | Open nights left (23 Oct–20 Dec, pre-handback) | Bookings in the 14 days before (4–17 Oct) |
|---|---|---|---|---|---|
| P01 | 18 Oct base 253 | 1 (19 Oct; Airbnb, stay 18–21 Dec, lead 60 d) | 3 n / £720.90 (ADR £240.30) | 0 (sold out to handback) | 1 |
| P05 | 18 Oct base 500, then 20 Oct base 550 | 0 since 20 Oct. The 18 Oct booking (22–29 Dec, £4,527.95) was made before the raise (see 21 Oct report). | 0 | 23 | 1 |
| P06 | 18 Oct base 357 | 0 | 0 | 3 (rest blocked on purpose) | 4 |
| P09 | 18 Oct base 176 | 0 | 0 | 11 (to 26 Nov) | 3 |
| P11 | 18 Oct base 286 (+13–17 Dec raised 21 Oct) | 0 | 0 | 19 | 1 |
| P12 | 18 Oct base 284 | 0 | 0 | 26 (to 13 Dec) | 2 |
| P13 | 20 Oct +10% on 11 nights | 0 since 20 Oct | 0 | 37. All 11 raised nights (31 Oct–3 Nov, 8–12 Nov, 17–18 Nov) are still open on 3064856, at £179–£217. | 4 (plus 2 made 18 Oct, before the raise) |

- **Six 18 Oct units: 1 booking in about 3 days since the raise (booked_on 19–21 Oct, plus 22 Oct up to 05:55).** That is about 0.33 per day. Before the raise: 12 bookings in 4–17 Oct (0.86 per day) and 35 in 18 Sep–17 Oct (1.17 per day). Nothing new since yesterday.
  - Three days and one booking are too few to judge conversion. Supply has also shrunk: P01 now has 0 open nights, and P09's bookable window ends 26 Nov.
  - The before/after ADR is still UNKNOWN: P01 has no pre-raise booking with nearby stay dates.
- **P05 at £550: 0 bookings in about 2 days.** **P13 +10%: 0 bookings in about 2 days.** Both windows are too short to read.
- **Airbnb after the promotions were removed (policy `monitoring`, 21 Oct–4 Nov):** 1 Airbnb booking made 21–22 Oct (P20) vs 23 made 7–20 Oct, portfolio-wide (reservations.csv). Only about 1 day has passed. On the P20 booking, the room revenue is £176.64 a night (£529.92 / 3) vs today's PriceLabs price of £234 / £248 / £254 (average £245.33), a ratio of 0.72. P20's 20% Airbnb new-listing discount is part of that gap (policy). The PriceLabs price at the moment of booking is not in the data.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 22 Sep–21 Oct (kpi_pack `last30`).
- Fwd occ30: Booked ÷ inventory nights for 23 Oct–20 Nov, from prices.csv plus reservations, with post-handback nights taken out. Brackets show the Blocked nights and the PriceLabs market occupancy for the next 30 (kpi_pack `market_occ_30`, from pl_kpis.csv).
- Pace30: kpi_pack `pace_30`.
- Pickup 7d: bookings made 16–22 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.06 | £162.06 | 100.0% 29/29 (0; 32%) | UNKNOWN: no STLY; OTB 30 n / £4,655.55 | 1 / 3 / £720.90 | Compressed (0 open nights to handback 20 Dec) |
| P02 | Ladbroke Grove | 96.7% | £118.43 | £114.48 | 17.2% 5/29 (23 blocked on purpose; 45%) | UNKNOWN: no STLY; OTB 6 n / £603.49 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (29/29 unavailable with no label; 47%) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 27.6% 8/29 (0; 25%) | UNKNOWN: no history | 0 / 0 / £0 (import rows excluded) | Soft (fwd < 60%) |
| P05 | St John's Wood (4-bed) | 76.7% | £374.80 | £287.34 | 65.5% 19/29 (1 blocked, 27 Oct; 38%) | UNKNOWN: no STLY; OTB 20 n / £8,021.02 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 66.7% | £211.83 | £141.22 | 44.8% 13/29 (13 blocked on purpose; 42%) | UNKNOWN: no STLY; OTB 14 n / £2,588.75 | 1 / 11 / £1,956.10 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (29 blocked on purpose; 25%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £167.40 | £167.40 | **40.9% 9/22** to handback 13 Nov (0; 49%) | UNKNOWN: no STLY; OTB 10 n / £1,403.75 | 1 / 6 / £776.46 | Soft (13 open nights to handback) |
| P09 | Greenwich | 96.7% | £117.21 | £113.30 | 58.6% 17/29 (1 blocked, 25 Oct; 37%); 60.7% without that night | UNKNOWN: no STLY; OTB 18 n / £1,881.31 | 0 / 0 / £0 | Soft (58.6%); Unclassifiable if 25 Oct is taken out |
| P10 | Ealing / Hanger Lane | 76.7% | £113.99 | £87.39 | **100.0% 27/27** to handback 18 Nov (0; 30%) | UNKNOWN: no STLY; OTB 28 n / £2,966.99 | 0 / 0 / £0 | Compressed (0 open nights to handback) |
| P11 | Camden | 80.0% | £158.43 | £126.74 | 62.1% 18/29 (0; 45%) | UNKNOWN: no STLY; OTB 19 n / £3,471.78 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P12 | Mile End | 76.7% | £194.88 | £149.40 | 62.1% 18/29 (0; 40%) | −4 n (−18.2%) / +15.6%; to handback −9 n / −13.1% | 0 / 0 / £0 | Soft (nights −18% on 30 d; revenue −13% to handback). 30-day revenue alone would read Compressed. |
| P13 | Shepherd's Bush (one flat, 2 listings) | 96.7% | £160.53 | £155.17 | 48.3% 14/29 (0; 40%) | UNKNOWN: no STLY; OTB 14 n / £2,085.47 | 3 / 12 / £2,012.35 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% 0/29 (0; 41%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 40.0% | £154.53* | £61.81* | 17.2% 5/29 (0; 34%) | UNKNOWN: no STLY; OTB 6 n / £1,067.76 | 2 / 6 / £1,067.76 | Soft |

\* P20: the 18–22 Oct extension nights were paid separately (policy), so ADR30 and RevPAR30 are understated.

**Forward 60, handback-aware** (23 Oct–20 Dec; Booked ÷ inventory nights; PriceLabs market occupancy for the next 60 in brackets):
- P01: 100% (41/41) (25%).
- P02: 8.5% (5/59), blocked on purpose (39%).
- P04: 32.2% (19/59) (20%).
- P05: 59.3% (35/59) (36%).
- P06: 22.0% (13/59), blocked on purpose (40%).
- P07: 0%, blocked on purpose (19%).
- P08: 40.9% (9/22, to 13 Nov) (44%).
- P09: 65.7% (23/35, to 26 Nov) (30%).
- P10: 100% (27/27, to 18 Nov) (24%).
- P11: 67.8% (40/59) (38%).
- P12: 50.0% (26/52, to 13 Dec) (32%).
- P13: 37.3% (22/59) (35%).
- P14: 0% (0/59) (38%).
- P20: 8.5% (5/59) (27%).

The market figures cover the whole 60 days, while ours stop at each handback.

**Last 365 and booking profile** (22 Oct 2025–21 Oct 2026; kpi_pack `last365`, `booking_profile`, all confirmed bookings). These are unchanged from 21 Oct apart from the window shift:
- P01: 35.9% / £179.12 / £64.29; median lead 15 d, LOS 5 n; Airbnb 80.4%.
- P02: 78.1% / £129.18 / £100.86; 34 d, 4 n; Airbnb 53.8%, Booking.com 43.0%.
- P05: 54.8% / £372.66 / £204.20; 44 d, 4 n; Airbnb 100%.
- P06: 32.1% / £241.84 / £77.52; 16 d, 4 n; Airbnb 71.7%.
- P07: 11.5% / £133.90 / £15.41; 3 d, 4 n; Airbnb 100%.
- P08: 36.7% / £177.44 / £65.14; 16 d, 6 n; Airbnb 76.2%.
- P09: 38.4% / £115.20 / £44.19; 18 d, 7 n; Airbnb 60.5%.
- P10: 35.1% / £115.07 / £40.35; 12 d, 5 n; Airbnb 69.3%.
- P11: 74.8% / £174.10 / £130.21; 31 d, 4 n; Booking.com 55.8%.
- P12: 82.2% / £191.08 / £157.05; 31 d, 4 n; Booking.com 90.0%.
- P13: 76.2% / £158.62 / £120.81; 21 d, 3 n; Booking.com 52.3%, Airbnb 46.8%.
- P14: 2.7% / £409.84 / £11.23; 57 d, 10 n (1 booking).
- P20: 3.3% / £154.53* / £5.08*; 5 d, 3 n (3 bookings); Airbnb 100%.
- P04: UNKNOWN (no history before 20 Oct).

### Gaps to fill (prices.csv plus reservations, 23 Oct–21 Dec, pre-handback)
- **Orphan gaps (open runs shorter than the min stay in force, between two bookings): none.** kpi_pack `gaps` is empty for every unit, and this was re-checked.
- **Single open nights at min stay 1:** P04 2 Dec; P11 18 Nov and 27 Nov; P12 17 Nov; P13 1 Dec (the 1-night minimum on 1 Dec is intentional, per policy). P04's 1 Nov is no longer a single night: 1–6 Nov is open since the cancelled 2–7 Nov stay was dropped.
- **Short runs that exactly meet the min stay:**
  - P20 25–27 Oct (3 nights, min stay 3, between the 22–25 Oct and 28–31 Oct stays).
  - P13 25–26 Oct (2, min 2).
  - P05 16–17 Nov and 7–8 Dec (2, min 2), and 28–30 Oct (3, after its Blocked 27 Oct).
  - P06 5–7 Nov (3, before its policy block).
- **Open nights before handback:**
  - P08: 13 nights to 13 Nov.
  - P09: 11 to 26 Nov.
  - P12: 26 to 13 Dec, including an unbroken 29 Nov–13 Dec run (15 nights, min 2).
  - P01 and P10: none.
- **Blocks outside policy:** P05 27 Oct (1 night) and P09 25 Oct (1 night) are Blocked for an unknown reason. P04 25 Oct is unavailable with no label, and no confirmed Smoobu stay covers it.

Data gaps:
1. P20 28–30 Oct: Booked in Smoobu (made 21 Oct) but open in PriceLabs. The PriceLabs listing was last refreshed 2026-10-21T08:52:04Z (live `get_listing_prices`). Whether the nights are closed on Airbnb and Booking.com is UNKNOWN.
2. STLY: no Smoobu bookings exist for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20, so pace 30/90 is UNKNOWN for them. Only P12 has STLY, and STLY leaves out bookings that were later cancelled.
3. P04 Barking: Smoobu history starts 20 Oct, so last-30/365, pace, lead time and channel mix are UNKNOWN. All 6 Smoobu rows are 20 Oct imports. The reason 25 Oct is unavailable is not in the data.
4. P03 Bayswater: not in Smoobu. prices.csv shows all nights unavailable with no label, so all KPIs are UNKNOWN (intentional block per policy).
5. P15 Bow / Devons Road, P16 Little Venice, P17 St John's Wood, P18 Fulham, P19 Kings Langley: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
6. Pipeline: kpi_pack `forward_occ_30/60`, `pace_90` and the kpi_summary "Booked next 30" are not handback-aware (`rm/analyse.py` does not read policy `handbacks`). The handback-aware figures above were recomputed from prices.csv and reservations.csv. `pace_vs_stly` returns STLY 0 instead of null when there is no year-ago history.
7. prices.csv starts 23 Oct, so the night of 22 Oct is not covered. Forward windows are 29 and 59 nights.
8. Post-raise effect: `booked_on` has no time, and only about 2–3 days have passed since the 18 Oct and 20 Oct changes. The before/after ADR for P01 is UNKNOWN (no comparable pre-raise stay). The PriceLabs price at the moment of each booking is not in the data, so paid-vs-price uses today's price.
9. P20: the payment for the 18–22 Oct extension is outside Smoobu and its amount is not in any file, so ADR30 is understated.
10. market.csv, comps.csv and channel_checks.csv are empty (kpi_pack `missing`). Market ADR, ARI/RGI, price percentiles and comp positioning are UNKNOWN. Market occupancy comes only from PriceLabs pl_kpis.csv, and its exact window is not stated.
11. Last-365 occupancy uses capacity 365 even where Smoobu history starts in 2026. Each unit's go-live date is UNKNOWN.
12. Reasons for the P05 27 Oct and P09 25 Oct blocks are not in the data.
13. reservations.csv has no booking ID or modification date. Changes are found only by diffing snapshots.

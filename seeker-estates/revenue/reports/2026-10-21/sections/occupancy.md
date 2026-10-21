## Occupancy & performance

**Portfolio, last 30 nights (21 Sep–20 Oct 2026), 13 units mapped to Smoobu (P01, P02, P05–P14, P20): occupancy 70.0%, ADR £172.56, RevPAR £120.79, revenue £47,109.79 (273 nights).** Last 365 nights (21 Oct 2025–20 Oct 2026): occupancy 43.0%, ADR £184.56, RevPAR £79.43, revenue £376,873.25 (2,042 nights). Forward, Booked nights only: 46.6% of the next 30 (189 of 406 nights, 22 Oct–19 Nov, 14 units with a calendar, P03 left out) and 33.2% of the next 60 (274 of 826 nights, 22 Oct–19 Dec). 7-day pickup (bookings made 15–21 Oct, P04 left out): 11 bookings, 78 nights, £15,831.52.
Sources: `reports/2026-10-21/kpi_pack.json` (`portfolio_last30`/`portfolio_last365` and per-property fields). The forward and pickup totals add up the pack's per-property figures. Revenue is the Smoobu reservation total before cleaning and commission. P04 (in Smoobu since 20 Oct) has no history, and P03 and P15–P19 have no reservation data, so all of them are left out of the past-window totals rather than counted as zero.

### What changed since 20 Oct (20 Oct pack/snapshot vs 21 Oct)
- **No new confirmed booking on any unit that was already in Smoobu.** reservations.csv went from 661 rows to 666. The only rows added are P04's 6 imported Smoobu rows (all `booked_on` 20 Oct). The only row removed is a P12 stay from Oct 2025 that has aged out of the 365-day pull. No unit has a booking with `booked_on` 20 Oct apart from P04's imports. The pull ran at 05:54 UTC on 21 Oct.
- **New Blocked runs on four units that are not in the policy's intentional-block list (prices.csv, 20 Oct vs 21 Oct, dates both files cover).** 109 nights went from open to Blocked:
  - P01: 30 Nov–17 Dec (18 nights). P01 now has 0 open nights in 22 Oct–19 Dec.
  - P08: 14 Nov–19 Dec (36 nights), plus 20 Dec, which is new to the file and also Blocked. 6 of these fall in the next 30, so P08's blocked share of the next 30 went from 0% to 20.7%. Open nights in the next 60 went from 48 to 13.
  - P09: 25 Oct, and 27 Nov–19 Dec (24 nights), plus 20 Dec. Open nights in the next 60 went from 34 to 11.
  - P10: 19 Nov–19 Dec (31 nights), plus 20 Dec. Open nights in the next 60 went from 30 to 0.
  - On P01, P08 and P10 the block starts the night after the last Booked night. P09 also has the separate 25 Oct night. Each block runs to the end of the file, except P01's, which stops at its 18–21 Dec booking.
  - PriceLabs `occupancy_next_60` (counts blocks) jumped: P01 0.70→1.00, P08 0.22→0.78, P09 0.45→0.82, P10 0.52→1.00 (pl_kpis.csv).
  - The PriceLabs activity log for 19–21 Oct (`get_user_logs`) has no entry for these four listings. The reason is not in the data. Booked-only forward occupancy is not affected.
- **P04 Barking is now in Smoobu** (apartment 3562176, `smoobu_since` 2026-10-20). It has 6 rows, all Booking.com and all created 20 Oct: 5 confirmed (22–25 Oct, 26 Oct–1 Nov, 25 Nov–2 Dec, 3–6 Dec, 20 Dec–2 Jan; 32 nights, £4,904.74) and 1 cancelled (2–7 Nov, 5 nights, £682.02). These are imported future stays, so P04's last-30/365, pace and pickup are UNKNOWN, not zero. See the P04 note below.
- **P13 (listing 3064856), 1 Dec went from unavailable (min stay 3) to open (min stay 1).** The PriceLabs log shows a 1 Dec date override with min stay 1 added at 09:30Z on 20 Oct on 3064856, 3090701 and the Vrbo copy. 1 Dec is now a single open night between a 28 Nov–1 Dec stay and a stay arriving 2 Dec.
- **Windows moved one day.** Last 30 is now 21 Sep–20 Oct. prices.csv starts 22 Oct, so forward 30 is 22 Oct–19 Nov (29 nights) and forward 60 is 22 Oct–19 Dec (59 nights). Pickup 7d is now bookings made 15–21 Oct.
- **Forward Booked nights, fwd30 / fwd60, 20 Oct → 21 Oct:**
  - Changed: P02 7→6 / 7→6; P05 19→19 / 37→36; P08 11→10 / 11→10; P09 17→17 / 25→24; P10 29→28 / 29→28; P12 16→17 / 26→26; P13 15→14 / 23→22; P20 4→3 / 4→3.
  - Unchanged: P01 (29 / 41), P04 (14 / 24 on its Channex calendar), P06 (14 / 14), P07, P11 (18 / 40) and P14.
  - Every change comes from the window moving (21 Oct dropped out; 19 Nov and 19 Dec came in). None comes from a new booking.
- **Last 30, window shift only:**
  - Nights: P06 22→21 (73.3%→70.0%), P11 25→24 (83.3%→80.0%), P20 10→11 (33.3%→36.7%).
  - ADR: P05 £378.02→£368.84, P13 £162.85→£160.30.
  - Portfolio: 274→273 nights, revenue £47,634.01→£47,109.79.
- **Pickup 7d:** P09 1/12/£1,232.50 → 0 and P12 2/5/£849.98 → 1/2/£318.78, because their bookings made 14 Oct left the window. Portfolio (P04 left out): 13/93/£17,595.22 → 11/78/£15,831.52.
- **Pace (P12, the only unit with STLY):** pace30 is −6 nights / +4.6% revenue (was −6 / +4.9%). Pace90 is now −14 nights / −31.9% (was −13 / −29.1%) because OTB 90 fell from 27 to 26 nights as the window moved.
- **PriceLabs market occupancy, next 30 (pl_kpis.csv):** P05 33%→37% (next 60 33%→35%). The rest moved by 1 point or less.

### Bookings made on/after 18 Oct for P01, P05, P06, P09, P11, P12, and on/after 20 Oct for P13
Price changes come from `data/policy.json` `price_changes`, with times from the PriceLabs activity log:
- 18 Oct: base rises at 20:33–20:43 UTC.
- 20 Oct 09:26:47Z: P05 base £500→£550.
- 20 Oct 09:29–09:30Z: P13 +10% on 31 Oct–3 Nov, 8–12 Nov and 17–18 Nov.

Bookings come from `data/snapshots/2026-10-21/reservations.csv` (`booked_on` is a date with no time).

| Ref | Bookings with booked_on ≥ 18 Oct (≥ 20 Oct for P13) | Nights | Revenue | ADR | New since the 20 Oct snapshot? | After the change? |
|---|---|---|---|---|---|---|
| P01 | 1 (Airbnb, 18–21 Dec, booked 19 Oct, lead 60 d) | 3 | £720.90 | £240.30 | No | Yes |
| P05 | 1 (Airbnb, 22–29 Dec, booked 18 Oct, lead 65 d) | 7 | £4,527.95 | £646.85 | No | **No.** It is already in the 18 Oct pack (pickup_7d 1/7/£4,527.95), which was built at 20:24:28 UTC, before the 20:33 raise. 0 bookings since the £550 base on 20 Oct. |
| P06 | 0 | 0 | £0 | — | — | — |
| P09 | 0 | 0 | £0 | — | — | — |
| P11 | 0 | 0 | £0 | — | — | — |
| P12 | 0 | 0 | £0 | — | — | — |
| P13 | 0 since 20 Oct | 0 | £0 | — | — | All 11 raised nights (31 Oct–3 Nov, 8–12 Nov, 17–18 Nov) are still open in prices.csv (listing 3064856). |

- **After the raise, across the six units: still 1 booking, 3 nights, £720.90 (P01). Nothing new since yesterday.** There is still no pre-raise P01 booking with nearby stay dates, so the before/after ADR is UNKNOWN.
- Baseline counts, not a forecast: the six units took 35 confirmed bookings made 18 Sep–17 Oct (P01 2, P05 6, P06 6, P09 5, P11 8, P12 8), which is about 1.2 per day. Since the raise there have been about 2 days of `booked_on` dates (19–20 Oct, plus part of 21 Oct up to the 05:54 pull) and 1 booking. That is too short a window to judge conversion.
- P13's two bookings made 18 Oct (Airbnb 4–8 Nov, 4 nights, £598.71; Airbnb 28 Nov–1 Dec, 3 nights, £517.90) came before its 20 Oct +10% and are counted in pickup 7d.
- P01 has nothing open in the next 60 (Booked or newly Blocked), so it cannot pick up whatever its price.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 21 Sep–20 Oct 2026 (kpi_pack `last30`).
- Fwd occ30: Booked ÷ 29, for 22 Oct–19 Nov (kpi_pack `forward_occ_30`; nights covered by a reservation count as Booked, so P13's two listings are combined). Brackets show the Blocked share and the PriceLabs market occupancy for the next 30 (`market_occ_30`, from pl_kpis.csv).
- Pace30: stays 21 Oct–19 Nov on the books on 21 Oct vs the same window as at 21 Oct 2025 (kpi_pack `pace_30`).
- Pickup 7d: bookings made 15–21 Oct (kpi_pack `pickup_7d`).

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (blocked; mkt) | Pace30 Δ (nights / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.94 | £161.94 | 100.0% (0%; 33%) | UNKNOWN: no STLY; OTB 30 n / £4,665.74 | 2 / 33 / £5,284.80 | Compressed |
| P02 | Ladbroke Grove | 96.7% | £119.04 | £115.07 | 20.7% (75.9%; 45%) | UNKNOWN: no STLY; OTB 7 n / £696.62 | 1 / 4 / £417.24 | Not classified: intentional block (policy) |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (29 of 29 nights unavailable with no label; mkt 47%) | UNKNOWN | UNKNOWN | Not classified: intentional block (policy); inputs missing |
| P04 | Barking | UNKNOWN (in Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 48.3% on the PriceLabs calendar; 31.0% (9 of 29) on confirmed Smoobu stays (0%; 27%) | UNKNOWN: no history | UNKNOWN (pack's 5/32/£4,904.74 are imported rows, not pickup) | Soft (fwd occ30 < 60% on either measure) |
| P05 | St John's Wood (4-bed) | 76.7% | £368.84 | £282.78 | 65.5% (3.4%; 37%) | UNKNOWN: no STLY; OTB 20 n / £7,939.57 | 1 / 7 / £4,527.95 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £212.65 | £148.85 | 48.3% (41.4%; 42%) | UNKNOWN: no STLY; OTB 14 n / £2,588.75 | 1 / 11 / £1,956.10 | Not classified: intentional block (policy) |
| P07 | Woolwich | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (100%; 25%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Not classified: intentional block (policy) |
| P08 | Islington | 100.0% | £167.82 | £167.82 | 34.5% (20.7%, new; 48%) | UNKNOWN: no STLY; OTB 11 n / £1,560.58 | 1 / 6 / £776.46 | Soft |
| P09 | Greenwich | 96.7% | £116.75 | £112.86 | 58.6% (3.4%, new; 38%) | UNKNOWN: no STLY; OTB 18 n / £1,904.61 | 0 / 0 / £0 | Soft (58.6% booked; 60.7% of nights not blocked) |
| P10 | Ealing / Hanger Lane | 76.7% | £113.51 | £87.02 | 96.6% (3.4%, new; 31%) | UNKNOWN: no STLY; OTB 29 n / £3,072.96 | 0 / 0 / £0 | Compressed |
| P11 | Camden | 80.0% | £156.02 | £124.82 | 62.1% (0%; 45%) | UNKNOWN: no STLY; OTB 19 n / £3,436.89 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P12 | Mile End | 80.0% | £196.92 | £157.54 | 58.6% (0%; 39%) | −6 n (17 vs 23) / +4.6% (£3,343.78 vs £3,197.08) | 1 / 2 / £318.78 | Soft (fwd occ30 < 60%) |
| P13 | Shepherd's Bush (one flat, 2 listings) | 96.7% | £160.30 | £154.96 | 48.3% (0%; 41%) | UNKNOWN: no STLY; OTB 15 n / £2,256.45 | 3 / 12 / £2,012.35 | Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 nights) | £0.00 | 0.0% (0%; 41%) | UNKNOWN: no STLY; OTB 0 | 0 / 0 / £0 | Soft (numbers only, per policy) |
| P15 | Bow / Devons Road | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P16 | Little Venice | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P17 | St John's Wood | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P18 | Fulham | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P19 | Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 36.7% | £154.53* | £56.66* | 10.3% (0%; 34%) | UNKNOWN: no STLY; OTB 4 n / £692.37 | 1 / 3 / £537.84 | Soft |

\* P20: the extra nights of the 18–22 Oct extension were paid separately (policy), so the Smoobu total does not include them and ADR30/RevPAR30 are understated.

**P04 note.** The pack's fwd occ30 of 48.3% (14 of 29) and fwd occ60 of 40.7% (24 of 59) come from the PriceLabs calendar of the Channex listing (prices.csv), and that calendar still shows 2–6 Nov as Booked. In Smoobu, the 2–7 Nov reservation has status cancelled. Counting confirmed Smoobu stays only gives 9 of 29 nights (31.0%) for 22 Oct–19 Nov and 19 of 59 (32.2%) for 22 Oct–19 Dec. PriceLabs' own figures for Smoobu listing 3562176 are 30% next 30 and 32% next 60 (pl_kpis.csv), which match the confirmed count. Which one is right is not in the data. The other figures in the pack for P04 also come from the import, not from real bookings:
- The median lead time of 36 days is measured from the import date (20 Oct), not the real booking date.
- The median stay of 6 nights and the 100% Booking.com share describe only the 5 imported future stays.

How classes were set (same rules as 20 Oct): **Compressed** = fwd occ30 ≥ 85%. **Soft** = fwd occ30 < 60%, or pace behind STLY by more than 10%. **On track** needs an STLY figure, so a unit at 60–85% with no STLY is Unclassifiable. P02, P03, P06 and P07 are blocked on purpose (policy) and are not classified. **No class changed since 20 Oct.** P12 rose from 55.2% to 58.6% (window shift) and stays Soft. P09 stays Soft at 58.6%. P10 dropped to 96.6% because 19 Nov is newly Blocked, and stays Compressed.

### Last 365 nights, forward 60 vs market, pace 90, booking profile
Windows and sources:
- Last 365: 21 Oct 2025–20 Oct 2026 (kpi_pack `last365`). Capacity is 365 for every unit, including nights before the unit's first Smoobu stay (first stays in reservations.csv: P01 18 May 2026, P02 18 Nov 2025, P05 28 Feb 2026, P06 21 May 2026, P07 30 Apr 2026, P08 14 May 2026, P09 16 May 2026, P10 17 May 2026, P11 11 Dec 2025, P13 14 Dec 2025, P14 30 Apr 2026, P20 10 Oct 2026). Whether each unit was live before that date is not in the data.
- Fwd60: Booked ÷ 59, for 22 Oct–19 Dec, against PriceLabs market occupancy for the next 60.
- Pace90: stays 21 Oct 2026–18 Jan 2027 vs the same window as at 21 Oct 2025.
- Profile: all confirmed bookings in reservations.csv (kpi_pack `booking_profile`).

| Ref | Occ365 | ADR365 | RevPAR365 | Rev365 | Fwd60 (mkt) | Pace90 | Bookings | Median lead | Median LOS | Channel revenue share |
|---|---|---|---|---|---|---|---|---|---|---|
| P01 | 35.6% | £179.25 | £63.84 | £23,302.49 | 69.5% (25%) | no STLY; OTB 43 n / £6,907.94 | 21 | 15 d | 5 n | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 77.8% | £129.30 | £100.61 | £36,722.37 | 10.2% (39%), blocked on purpose | no STLY; OTB 7 n / £696.62 | 71 | 34 d | 4 n | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | 40.7% calendar / 32.2% confirmed (21%) | UNKNOWN | 5 imported | UNKNOWN (import date) | 6 n (imported stays) | Booking.com 100% (imported stays) |
| P05 | 54.5% | £372.63 | £203.16 | £74,154.07 | 61.0% (35%) | no STLY; OTB 49 n / £24,581.64 | 59 | 44 d | 4 n | Airbnb 100% |
| P06 | 32.1% | £241.84 | £77.52 | £28,295.48 | 23.7% (40%), blocked on purpose | no STLY; OTB 14 n / £2,588.75 | 30 | 16 d | 4 n | Airbnb 71.7%, Booking.com 28.3% |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 | 0.0% (19%), blocked on purpose | no STLY; OTB 0 | 5 | 3 d | 4 n | Airbnb 100% |
| P08 | 36.4% | £177.60 | £64.71 | £23,620.45 | 16.9% (43%) | no STLY; OTB 11 n / £1,560.58 | 20 | 16 d | 6 n | Airbnb 76.2%, Booking.com 23.8% |
| P09 | 38.1% | £115.12 | £43.84 | £16,002.37 | 40.7% (30%) | no STLY; OTB 25 n / £2,623.57 | 22 | 18 d | 7 n | Airbnb 60.5%, Booking.com 37.9%, Direct 1.6% |
| P10 | 34.8% | £115.15 | £40.06 | £14,623.59 | 47.5% (24%) | no STLY; OTB 29 n / £3,072.96 | 22 | 12 d | 5 n | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 74.5% | £174.07 | £129.72 | £47,346.24 | 67.8% (38%) | no STLY; OTB 52 n / £11,248.12 | 70 | 31 d | 4 n | Booking.com 55.8%, Airbnb 42.3%, Agoda 1.9% |
| P12 | 82.5% | £190.89 | £157.42 | £57,458.32 | 44.1% (33%) | **−14 n (26 vs 40) / −31.9% (£5,051.26 vs £7,414.66)** | 84 | 31 d | 4 n | Booking.com 90.0%, Airbnb 10.0% |
| P13 | 75.9% | £158.58 | £120.34 | £43,925.90 | 37.3% (35%) | no STLY; OTB 23 n / £3,670.09 | 82 | 21 d | 3 n | Booking.com 52.3%, Airbnb 46.8%, Agoda 0.9% |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 | 0.0% (37%) | no STLY; OTB 0 | 1 | 57 d | 10 n | Airbnb 100% |
| P20 | 3.0% | £154.53* | £4.66* | £1,699.87* | 5.1% (26%) | no STLY; OTB 4 n / £692.37 | 2 | 5 d | 12 n | Airbnb 100% |

P03 and P15–P19: every column is UNKNOWN (see Data gaps).

### Gaps to fill (prices.csv, 22 Oct–20 Dec 2026)
- **Orphan gaps (an open run between unavailable nights that is shorter than the min stay in force): none.** kpi_pack has `gaps: []` for every unit, and this was re-checked against prices.csv.
- **Single open nights between bookings (min stay 1):** P04 1 Nov and 2 Dec; P11 18 Nov and 27 Nov; P12 17 Nov; P13 1 Dec (newly opened, see above).
- **Short runs at min stay 2:** P05 28–30 Oct (3 nights, after its Blocked night), 16–17 Nov and 7–8 Dec; P13 25–26 Oct; P06 5–7 Nov (3 nights, before its policy block).
- **Tonight and tomorrow:**
  - P12: no Smoobu stay covers 21 Oct (the 14–21 Oct stay checks out today), and 22 Oct is open (min stay 2) before an arrival on 23 Oct. That is 2 open nights. prices.csv does not cover 21 Oct, so the min stay in force tonight is UNKNOWN.
  - P13: 22 Oct is open (min stay 1).
- **Blocks outside the policy list:**
  - P01, P08, P09 and P10 are newly Blocked (109 nights; see "What changed").
  - P05 has 1 Blocked night (27 Oct) in the next 30, reason unknown.
  - P04's 25 Oct is unavailable with no Booked/Blocked label. No confirmed Smoobu stay covers it: one stay checks out 25 Oct and the next arrives 26 Oct.
  - P02, P06 and P07 are blocked on purpose (policy) and are not counted as gaps.

Data gaps:
1. P01, P08, P09, P10: the reason for the 109 nights that changed from open to Blocked between the 20 and 21 Oct snapshots is not in the data (not in the policy, and no PriceLabs log entry).
2. P04 Barking: in Smoobu only since 20 Oct, and all 6 rows were created on the import date. Last-30/365, pace vs STLY, 7-day pickup and lead time are UNKNOWN. The 2–7 Nov stay is cancelled in Smoobu but Booked on the PriceLabs Channex calendar, so forward occupancy is 48.3% or 31.0% depending on the source. The reason 25 Oct is unavailable is not in the data. The P04 mapping is still to be confirmed with Corentin (`data/id_map.json`).
3. Pipeline: `rm/analyse.py` does not apply `smoobu_since` to `pickup_7d` or `booking_profile`, so P04 shows imported rows as 5 bookings of pickup with a lead time of 36 days. `pace_vs_stly` returns STLY 0 instead of null when Smoobu history does not reach the year-ago window.
4. STLY: there are no Smoobu bookings for the year-ago windows of P01, P02, P05–P11, P13, P14 and P20 (their first stays are 18 Nov 2025 or later), so pace 30/90 is UNKNOWN for 12 of the 13 units with history. Only P12 has STLY. STLY also leaves out bookings that were live a year ago and cancelled later.
5. P03 Bayswater: not in Smoobu (Channex). No reservations, and prices.csv shows every night unavailable with no label, so all KPIs are UNKNOWN. The block is intentional (policy).
6. P15 Bow / Devons Road, P16 Little Venice, P17 St John's Wood, P18 Fulham, P19 Kings Langley: not in PriceLabs or Smoobu. All KPIs are UNKNOWN.
7. Last-365 occupancy uses capacity 365 even where Smoobu history starts in 2026 (P01, P05–P10, P14, P20). Each unit's go-live date is UNKNOWN.
8. Post-raise comparison: P01 has no pre-18-Oct booking with stay dates near 18–21 Dec, so its before/after ADR is UNKNOWN. `booked_on` has no time or timezone.
9. P20: the extension nights (18–22 Oct) were paid outside Smoobu (policy). Their amount is not in any file, so P20's ADR is understated.
10. reservations.csv has no booking ID and no cancellation or modification date. Changes are found only by diffing snapshots.
11. prices.csv starts 22 Oct, so the night of 21 Oct is missing. Forward 30 covers 29 nights and forward 60 covers 59.
12. market.csv, comps.csv and channel_checks.csv are empty (kpi_pack `missing`). Market ADR, price percentiles, ARI/RGI, comp positioning and channel parity are UNKNOWN. Market occupancy comes only from PriceLabs pl_kpis.csv, and its exact date window is not stated.
13. The reason for P05's Blocked night on 27 Oct is not in the data.

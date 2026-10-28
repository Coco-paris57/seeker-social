## Occupancy & performance

**Portfolio, last 30 nights (28 Sep–27 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 69.7%, ADR £173.92, RevPAR £121.29, revenue £47,304.92 (272 nights). Yesterday (27 Sep–26 Oct): 69.2% / £175.52 / £121.52 / £47,391.13.
- **Last 365 nights (28 Oct 2025–27 Oct 2026):** occupancy 44.2%, ADR £184.48, RevPAR £81.57, revenue £387,043.73 (2,098 nights). Understated: the denominator is 365 days, but most units have Smoobu history only from late 2025 or 2026.
- Source: `reports/2026-10-28/kpi_pack.json` (`portfolio_last30`, `portfolio_last365`). Revenue is Smoobu `basePrice` (room only, before cleaning and commission). P03, P04 (`smoobu_since` 2026-10-20) and P15–P19 are left out, not counted as zero.

**Forward next 30 (29 Oct–26 Nov, 29 nights; `prices.csv` starts 29 Oct), handback-aware: 184 of 304 non-blocked nights booked = 60.5%** across the same 13 units plus P04. Yesterday: 55.0% (170/309).
- Sources: kpi_pack `forward_occ_30` × `price_nights_next_30`. Blocked nights come from `data/snapshots/2026-10-28/prices.csv`: P02 29, P06 19 (12 Blocked plus 7 unlabelled, 8–14 Nov), P05 2, P20 2. P03 (unlabelled) and P07 (blocked on purpose) are left out.
- The analyser overlays Smoobu bookings on the PriceLabs calendar. That matters today because PriceLabs had not yet picked up three new bookings when it was pulled (see "PriceLabs calendar lag" below).

**7-day pickup (bookings made 22–28 Oct, 28 Oct partial to 06:56), past-stay imports excluded: 15 bookings, 63 nights, £10,618.57 room revenue.**
- The pack's P04 figure (4 bk / 12 n / £1,448.71) still counts the Airbnb stay of 28 Sep–2 Oct (£439.20). Smoobu imported it on 26 Oct after the stay had ended, so it is not pickup and is removed here.
- The P04 Airbnb night of 19–20 Dec (£216.00) was imported in the same 26 Oct 14:08 batch, and its real booking date is UNKNOWN. Without it: 14 bk / 62 n / £10,402.57.
- **Cancellations in the same window (cancel time = Smoobu `modifiedAt`, from Smoobu GET /api/reservations): 4 real, 36 nights, £7,384.49 room revenue.** Net pickup: **+27 nights, +£3,234.08.** Duplicate cancellations (P04 20–23 Nov ×2, P08 27–30 Oct) were replaced by live bookings, so they are excluded.

| Ref | Pickup 7d (bk / n / £) | Cancelled 22–28 Oct (n / £, cancel date) |
|---|---|---|
| P13 | 2 / 16 / £2,909.76 | — |
| P12 | 3 / 15 / £2,484.65 | 1–8 Nov 7 n / £1,382.86 (22 Oct); 22–29 Nov 7 n / £1,314.40 (25 Oct) |
| P11 | 2 / 6 / £1,221.45 | 19–27 Nov 8 n / £1,736.41 (23 Oct); **28 Nov–12 Dec 14 n / £2,950.82 (27 Oct 11:29)** |
| P08 | 2 / 9 / £1,201.60 | duplicate only |
| P04 | 3 / 8 / £1,009.51 (2 / 7 / £793.51 confirmed-date) | duplicates only |
| P06 | 1 / 3 / £804.77 | — |
| P20 | 1 / 4 / £733.62 | — |
| P09 | 1 / 2 / £253.21 | — |
| P01, P02, P05, P10, P14 | 0 | — |

### Overnight change (27 Oct → 28 Oct, `reservations.csv` diff; created times from Smoobu `created-at`)
- **P11 Camden, Booking.com 5–8 Dec, 3 n, £656.07 room (£218.69/n).** Created 27 Oct 18:16, about 7 hours after the 14-night cancellation (below), and inside the dates that cancellation reopened.
- **P11 Camden, Booking.com 28–31 Oct, 3 n, £565.38 room (£188.46/n).** Created 28 Oct 04:42, arriving the same day.
- **P13 Shepherd's Bush, Booking.com 18–27 Nov, 9 n, £1,143.76 room (£127.08/n).** Created 27 Oct 20:49. Smoobu total £1,293.76, so £150 cleaning is not in the room figure. 22 days' lead. It creates two orphan nights (see Orphan gaps).
- **P20 Waterford, Airbnb 2–6 Nov, 4 n, £733.62 room (£183.41/n).** Created 27 Oct 14:22. **Correction to the dispatcher note:** the £733.62 in `reservations.csv` is Smoobu `basePrice`, which is already net of the £150 cleaning (Smoobu total £883.62; `rm/snapshot.py` line 200). The room figure is £733.62, not £583.62. Any paid-vs-PriceLabs ratio built on £583.62 should be redone (channel section).
- **P08 Islington, Airbnb 27–31 Oct, 4 n, £525.00 room** (Smoobu total £674 incl. £149 cleaning). Created 27 Oct 18:05. The £362.69 row (27–30 Oct, created 15:09, cancelled 15:25) was a duplicate. **Same correction:** £525 is the room amount, and cleaning is on top of it.
- **Cancelled: P11 Camden, Booking.com 28 Nov–12 Dec, 14 n, £2,950.82 room** (Smoobu total £3,099.82). Booked 16 Jul, cancelled 27 Oct 11:29 (Smoobu `modifiedAt`), 32 days before arrival. Details in the P11 section below.

### P11 Camden: impact of the 14-night cancellation
**The lost booking:** 28 Nov–12 Dec, 14 nights, £2,950.82 room (£210.77/n), Booking.com. Booked 16 Jul (135 days' lead, before the 18 Oct base rise), cancelled 27 Oct (32 days out). Any cancellation fee retained is UNKNOWN: the Smoobu row shows no charge.

**Partly refilled:** 5–8 Dec (3 n, £656.07) was booked the same evening. Still open: **11 nights, 28 Nov–4 Dec (7 n) and 8–11 Dec (4 n).** Smoobu `GET /api/rates` shows 28 Nov available, min 3. Net room revenue still off the books: **£2,294.75.**

**Effect on P11 metrics:**
- On the books for stays 28 Oct–27 Dec (`rm.metrics.on_the_books` on the 27 Oct vs 28 Oct `reservations.csv`): **31 n / £6,552.97 → 23 n / £4,823.60 (−8 n, −£1,729.37).** That is −14 n / −£2,950.82 from the cancellation, plus 5–8 Dec (+3 n / £656.07) and 28–31 Oct (+3 n / £565.38).
- Fwd occ 60 (kpi_pack, handback-aware, PriceLabs market next 60 = 38%): **49.2% → 35.6%.** P11 is now below market on the 60-day view.
- Fwd occ 30 (29 Oct–26 Nov): 37.9% → 44.8% (13/29) vs market 43%. This rise comes from the 28–31 Oct booking. The cancellation falls outside the 30-day window.
- Pace90 OTB (kpi_pack, stays 28 Oct–25 Jan): 38 n / £8,418.76 → 29 n / £6,507.23. STLY is UNKNOWN (no Oct 2025 bookings in `reservations.csv`).
- The open run after 18 Nov is now 18 Nov–4 Dec (17 n) and 8–18 Dec (11 n) once the Smoobu bookings are overlaid.

**Second P11 cancellation since 18 Oct:** 19–27 Nov, 8 n, £1,736.41, booked 19 Sep, cancelled 23 Oct 06:57.
- Together since 18 Oct, P11 has lost **22 nights / £4,687.23** of bookings made before the rise, and picked up **2 bookings / 6 n / £1,221.45** (27–28 Oct).
- Before 27 Oct, P11's last new booking was made on 4 Oct.
- Context: the Camden Booking.com Visibility Booster (18%) covers check-ins 1 Nov–18 Dec (policy). This is not a finding.

### PriceLabs calendar lag (pull 07:13–07:18; Smoobu checked 28 Oct)
In `prices.csv` / `raw/prices_*.json`, these nights show as **open** in PriceLabs but are booked in Smoobu:
- P11 (3064196): 29–30 Oct and 5–7 Dec
- P13 (3064856 and 3090701): 18–26 Nov

Smoobu `GET /api/rates` shows all of them **unavailable** (0), so the channels are closed and there is no overbooking risk from Smoobu. PriceLabs had simply not re-read the calendar. The pricelabs section should check that it catches up. This also explains why PriceLabs `occupancy_next_30` in `pl_kpis.csv` (P11 0.40, P13 0.40) is lower than kpi_pack (0.448, 0.655).

### 18 Oct base rises: running effect (bookings made 18–27 Oct, 10 full days, vs 4–17 Oct, 14 days)
How this was built:
- Source: `data/snapshots/2026-10-28/reservations.csv` `booked_on`, confirmed rows only, past-stay imports excluded.
- Cancellation times come from Smoobu `modifiedAt` (GET /api/reservations, modified 14–28 Oct).
- 28 Oct is partial and shown on its own line. P04 is excluded because it was not in Smoobu before 20 Oct.
- Rises: P01 253, P05 500 (550 from 20 Oct), P06 357, P09 176, P11 286, P12 284 (policy `price_changes`).

| Ref (base) | Made 18–27 Oct: bk / n / £ | Made 4–17 Oct: bk / n / £ | Cancelled since 18 Oct (pre-rise bookings) | Booked next 30 vs mkt: 18 Oct → 28 Oct |
|---|---|---|---|---|
| P01 (253) | 1 / 3 / £720.90 (19 Oct) | 1 / 30 / £4,563.90 | — | 100% vs 34% → 100% vs 34% (sold out to handback) |
| P05 (550) | 1 / 7 / £4,527.95 (18 Oct; timing vs the rise UNKNOWN). **None since; none at £550 (8 full days)** | 1 / 4 / £1,835.10 | — | 69.0% vs 32% → 72.4% vs 38% (2 blocked) |
| P06 (357) | 1 / 3 / £804.77 (25 Oct) | 4 / 18 / £3,400.07 | — | 48.3% vs 43% → 34.5% vs 45% (100% of non-blocked; rest blocked on purpose) |
| P09 (176) | 1 / 2 / £253.21 (23 Oct) | 3 / 23 / £2,371.55 | — | 58.6% vs 38% → 79.3% vs 36% |
| P11 (286) | **1 / 3 / £656.07 (27 Oct)**; plus 28 Oct 1 / 3 / £565.38 | 1 / 4 / £650.48 | **2 / 22 n / £4,687.23** | 58.6% vs 47% → 44.8% vs 43% |
| P12 (284) | 3 / 15 / £2,484.65 (24–26 Oct, all Booking.com) | 2 / 5 / £849.98 | **3 / 19 n / £3,989.35** (5–10 Dec on 18 Oct; 1–8 Nov on 22 Oct; 22–29 Nov on 25 Oct) | 58.6% vs 41% → 58.6% vs 39% |
| **Raised total** | **8 / 33 / £9,447.55 (0.80 / 3.30 / £944.76 per day)**. Without P05 18 Oct: 7 / 26 / £4,919.60 (0.70 / 2.60 / £491.96) | **12 / 84 / £13,671.08 (0.86 / 6.00 / £976.51 per day)** | **5 / 41 n / £8,676.58** | |
| **Unraised** (P02, P08, P10, P13, P14, P20) | **8 / 39 / £6,491.51 (0.80 / 3.90 / £649.15 per day)**: P08 ×2, P13 ×4, P20 ×2 | **11 / 85 / £10,556.09 (0.79 / 6.07 / £754.01 per day)** | 0 (one P08 duplicate only) | P08 44.8% → 81.2%; P13 58.6% → 65.5%; P10 100% → 100%; P14 0% → 0% |

**Running line (28 Oct):**
- **Booking rate:**
  - Raised flats are at 0.93× their earlier booking rate (0.80 vs 0.86 per day) and 0.97× in revenue per day.
  - Unraised flats are at 1.01× in bookings and 0.86× in revenue per day.
  - On 27 Oct the ratios were raised 0.91× / 1.00× and unraised 0.70× / 0.60×. The three 27 Oct bookings on P08, P13 and P20 closed most of the unraised gap.
- **Without P05's 18 Oct booking** (timing UNKNOWN), raised flats are at 0.81× in bookings and 0.50× in revenue per day. Stays booked since the rise are short: 26 n over 7 bookings, versus 84 n over 12 before.
- **Cancellations:**
  - The difference between the groups is in cancellations: **raised flats lost 41 booked nights / £8,676.58** since 18 Oct (P11, P12, all Booking.com, all booked July–early October at pre-rise prices). Unraised flats lost none.
  - Net change in booked revenue for bookings made or cancelled since 18 Oct: raised **+£770.97**, unraised **+£6,491.51**.
  - These cancellations were made at the old prices, so they are not a demand response to the rise. But they put 41 nights back on sale at the higher bases.
- **Still not separable:**
  - P12's 3 bookings came in the 3 days after the 24 Oct Booking.com markup cut (+30% → +15%), which confounds the comparison.
  - P11's 2 new bookings also came after it, in the same 24 hours as its cancellation.
- **Per flat:**
  - **P05: no new booking for 10 days** (since 18 Oct). Fwd30 72.4% (77.8% of non-blocked) vs market 38%.
  - P01 and P10 are sold out to handback.
- Next base review: 2 Nov (dispatcher).

### P12: run-rate to handback (stays 28 Oct–13 Dec vs the same stays as of 28 Oct 2025)
Recomputed with `rm.metrics.on_the_books` on `reservations.csv`.

| Measure | 27 Oct | 28 Oct |
|---|---|---|
| Pace30 (kpi_pack `pace_30`) | −1 n / +1.0% (stays 27 Oct–25 Nov) | **18 n / £2,786.41 vs STLY 22 n / £3,114.75 = −4 n / −10.5%** (stays 28 Oct–26 Nov) |
| To handback | 23 n / £4,012.09 vs 30 n / £5,090.64 = −7 n / −21.2% | **22 n / £3,903.40 vs 32 n / £5,340.27 = −10 n / −26.9%** |
| Pace90 (not handback-aware) | −15 n / −46.4% | 22 n / £3,903.40 vs 40 n / £7,741.07 = −18 n / −49.6% |

- **P12 moves from On track to Soft.** Pace30 revenue is now 10.5% behind STLY and fwd30 is 58.6% (< 60%).
- No P12 booking or cancellation happened between the 27 Oct and 28 Oct files. Running pace30 on the 27 Oct file with today's date gives the same −4 n / −10.5%. So the change comes only from the window rolling one day: 28 Oct 2025 nights already on the books and 26 Nov 2025 entering STLY, against an open 26 Nov 2026.

### Per-property table
Windows and sources:
- Occ30, ADR30 and RevPAR30: last 30 nights, 28 Sep–27 Oct (kpi_pack `last30`).
- Fwd occ30: `forward_occ_30`, 29 Oct–26 Nov, handback-aware. Brackets show booked/nights, blocked nights, and PriceLabs `market_occ_30`.
- Pace30: `pace_30`, stays 28 Oct–26 Nov vs STLY.
- Pickup 7d: bookings made 22–28 Oct, past-stay imports excluded.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (bk/n; blocked; mkt) | Pace30 Δ (n / rev) | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (29/29; 0; 34%) | UNKNOWN: no STLY. OTB 30 n / £4,594.45 | 0 / 0 / £0 | **Compressed** (sold out to handback 20 Dec) |
| P02 | Ladbroke Grove | 96.7% | £114.21 | £110.40 | 0% (0/29; 29 blocked; 46%) | UNKNOWN: no STLY. OTB 0 | 0 / 0 / £0 | Not classified: intentional block |
| P03 | Bayswater | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN (60 n unlabelled; 49%) | UNKNOWN | UNKNOWN | Not classified: intentional block |
| P04 | Barking | UNKNOWN (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 41.4% (12/29; 0; 25%) | UNKNOWN: no history | 3 / 8 / £1,009.51 (pack 4 / 12 / £1,448.71 incl. import) | **Soft** (fwd < 60%) |
| P05 | St John's Wood | 73.3% | £394.35 | £289.19 | 72.4% (21/29; 2; 38%). 77.8% of non-blocked | UNKNOWN: no STLY. OTB 21 n / £9,518.06 | 0 / 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 70.0% | £205.25 | £143.67 | 34.5% (10/29; 19; 45%). 100% of non-blocked | UNKNOWN: no STLY. OTB 11 n / £2,227.39 | 1 / 3 / £804.77 | Not classified: intentional block |
| P07 | Woolwich | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 29; 23%) | UNKNOWN | 0 / 0 / £0 | Not classified: intentional block |
| P08 | Islington | 96.7% | £164.26 | £158.78 | 81.2% (13/16 to handback 13 Nov; 0; 50%) | UNKNOWN: no STLY. OTB 14 n / £1,846.81 | 2 / 9 / £1,201.60 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 90.0% | £117.90 | £106.11 | 79.3% (23/29 to handback 26 Nov; 0; 36%) | UNKNOWN: no STLY. OTB 23 n / £2,346.31 | 1 / 2 / £253.21 | Unclassifiable (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 83.3% | £112.47 | £93.73 | 100% (21/21 to handback 18 Nov; 0; 30%) | UNKNOWN: no STLY. OTB 22 n / £2,331.21 | 0 / 0 / £0 | **Compressed** (sold out to handback) |
| P11 | Camden | 83.3% | £170.92 | £142.44 | 44.8% (13/29; 0; 43%). Fwd60 35.6% vs 38% | UNKNOWN: no STLY. OTB 14 n / £2,510.11 | 2 / 6 / £1,221.45 | **Soft** (fwd < 60%; −14 n cancellation in fwd60) |
| P12 | Mile End | 76.7% | £198.48 | £152.17 | 58.6% (17/29; 0; 39%) | **−4 n / −10.5%** (18 n / £2,786.41 vs 22 n / £3,114.75) | 3 / 15 / £2,484.65 | **Soft** (was On track). To handback −10 n / −26.9% |
| P13 | Shepherd's Bush (one flat, 2 listings) | 86.7% | £159.57 | £138.29 | 65.5% (19/29; 0; 41%) | UNKNOWN: no STLY. OTB 20 n / £2,748.14 | 2 / 16 / £2,909.76 | Unclassifiable (60–85%, no STLY); was Soft |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN (0 n) | £0.00 | 0% (0/29; 0; 40%) | UNKNOWN | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford Court) | 50.0% | £159.48* | £79.74* | 20.7% (6/29; 2 delivery; 36%) | UNKNOWN: no STLY. OTB 7 n / £1,263.54 | 1 / 4 / £733.62 | **Soft** (fwd < 60%) |

\* P20: the 18–22 Oct extension nights were paid separately (policy `separate_payments`), so ADR30 and RevPAR30 are understated.

**Class counts:**
- Compressed 2: P01, P10.
- On track 0.
- Soft 5: P04, P11, P12, P14, P20.
- Unclassifiable 9: P05, P08, P09, P13, P15–P19.
- Not classified by policy: P02, P03, P06, P07.
- Changes since 27 Oct: P12 On track → Soft; P13 Soft → Unclassifiable (fwd30 37.9% → 65.5% after the 18–27 Nov booking).

**Forward 60** (kpi_pack `forward_occ_60`, 29 Oct–27 Dec, handback-aware) vs PriceLabs market next 60:

| Ref | Fwd occ 60 (27 Oct → 28 Oct) | Market next 60 |
|---|---|---|
| P01 | 66.7% → 66.0% | 27% |
| P04 | 47.5% → 47.5% | 20% |
| P05 | 59.3% → 61.0% | 37% |
| P06 | 18.6% → 16.9% (blocked on purpose) | 40% |
| P08 | 64.7% → 81.2% | 44% |
| P09 | 76.7% → 79.3% | 31% |
| P10 | 100% → 100% | 24% |
| P11 | **49.2% → 35.6%** | 38% |
| P12 | 46.8% → 45.7% | 33% |
| P13 | 32.2% → 45.8% | 36% |
| P14 | 0% → 0% | 37% |
| P20 | 5.1% → 10.2% | 29% |

**Pace90** (kpi_pack `pace_90`, stays 28 Oct–25 Jan, OTB n / £):
- STLY is UNKNOWN for every unit except P12 (−18 n / −49.6%).
- P01 36 / £5,771.74; P02 0; P05 43 / £22,135.21; P06 11 / £2,227.39; P08 14 / £1,846.81; P09 23 / £2,346.31; P10 22 / £2,331.21; P11 29 / £6,507.23; P13 35 / £5,927.78; P14 0; P20 7 / £1,263.54.
- P04: not computed (no history).

**Last 30 vs market:** UNKNOWN for every unit. `pl_kpis.csv` has no past-30 market occupancy, and kpi_pack `missing` lists `market.csv` as empty.

**Last 365 nights** (kpi_pack `last365`, 28 Oct 2025–27 Oct 2026; denominator 365):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 37.5% | £178.38 | £66.96 | £24,438.69 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 56.2% | £373.66 | £209.86 | £76,600.49 |
| P06 | 33.7% | £239.53 | £80.72 | £29,461.61 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 38.1% | £176.52 | £67.22 | £24,535.82 |
| P09 | 39.2% | £115.61 | £45.30 | £16,532.84 |
| P10 | 36.7% | £114.67 | £42.10 | £15,365.34 |
| P11 | 76.4% | £174.27 | £133.21 | £48,621.35 |
| P12 | 81.9% | £191.89 | £157.20 | £57,376.29 |
| P13 | 77.0% | £158.64 | £122.13 | £44,577.97 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.1% | £159.48 | £6.55 | £2,392.24 |

P03, P04 and P15–P19: UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; confirmed bookings in the file; median lead time in days, median length of stay in nights, revenue share by channel):

| Ref | Bookings | Lead | LOS | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 4 | 25 | 4 | Booking.com 54.8%, Airbnb 45.2%. **Distorted by the 26 Oct imports** (the 28 Sep–2 Oct stay counts as −28 days' lead) |
| P05 | 59 | 44 | 4 | Airbnb 100% |
| P06 | 31 | 15 | 4 | Airbnb 72.4%, Booking.com 27.6% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 22 | 15 | 6 | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 21 | 5 | Airbnb 58.4%, Booking.com 40.1%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 70 | 28 | 4 | Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0% |
| P12 | 84 | 31 | 4 | Booking.com 89.8%, Airbnb 10.2% |
| P13 | 84 | 21 | 3 | Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 4 | 6 | 4 | Airbnb 100% |

### Orphan gaps
Rechecked on `prices.csv` with today's confirmed Smoobu bookings overlaid. P13's two listings are treated as one calendar, handback dates are respected, and P04's policy minimum of 3 is applied. Open/closed state was confirmed with Smoobu `GET /api/rates` for P11 and P13.

**New today: P13 has two 1-night orphans, created by the 18–27 Nov booking.** kpi_pack `gaps` lists the same two:
- **17 Nov.** Between the 13–17 Nov stay (3090701) and the 18 Nov arrival. Smoobu: available, min 2 on both listings.
- **27 Nov.** Between the 27 Nov departure and the 28 Nov–1 Dec Airbnb stay (3064856). Smoobu: available, min 2 on both listings.
- With min 2, neither night can be sold. Reported as a fact. No price or min-stay proposal.

**Still open from 27 Oct: P04 two 2-night orphans.**
- **18–19 Nov** and **23–24 Nov**: PriceLabs min 2, against policy minimum 3 (P04 `min_stay_rule`).
- Unchanged since yesterday. For the pricelabs section.

**Runs exactly at the min stay (not orphans):**
- P05: 16–17 Nov, 7–8 Dec (2 n, min 2)
- P12: 12–13 Nov (2 n, min 2)
- P20: 31 Oct–1 Nov (2 n, min 2; created by the new 2–6 Nov booking)
- P11: 23–25 Dec (3 n, min 3)

**Not listed (policy-settled single nights):** P04 2 Dec, P12 17 Nov, P13 1 Dec.

**P11 after the cancellation:** no orphan. The reopened nights form runs of 17 n (18 Nov–4 Dec) and 11 n (8–18 Dec).

### Other calendar fact
- **P05 block now runs 27–31 Oct.** Smoobu "Blocked channel" reservation 160279886 was modified 27 Oct 09:29, and `prices.csv` shows 29–30 Oct Blocked.
- Policy `listing_facts.P05.block_27_28_oct` covers 27–28 Oct only (delivery). The reason for 29–30 Oct is UNKNOWN. Ask Corentin before treating it as intentional.

### Gaps to fill
- **P13 17 Nov and 27 Nov:** 1-night orphans at min 2 (new today).
- **P11:** 11 nights reopened by the cancellation (28 Nov–4 Dec, 8–11 Dec). The full open run is 18 Nov–4 Dec (17 n) and 8–18 Dec (11 n). Fwd60 is 35.6% vs market 38%.
- **P04 18–19 Nov, 23–24 Nov:** 2-night orphans at min 2 vs policy 3.
- **P05 29–30 Oct:** blocked, reason not in policy.
- **PriceLabs calendar lag:** P11 29–30 Oct and 5–7 Dec, and P13 18–26 Nov, show open in PriceLabs but are closed in Smoobu.
- **P04:** the analyser still counts the 26 Oct Airbnb import in `pickup_7d` and `booking_profile`.

Data gaps:
- Pace vs STLY (30/90): UNKNOWN for P01, P02, P05–P11, P13, P14 and P20 (`reservations.csv` has no bookings in the STLY windows). UNKNOWN for P03, P04 and P15–P19 (no history).
- Last 30 / 365: UNKNOWN for P03 (not in Smoobu), P04 (`smoobu_since` 2026-10-20; only one pre-20 Oct Airbnb stay imported 26 Oct) and P15–P19 (not mapped). Last-365 occupancy is understated (365-day denominator).
- Last-30 market occupancy: UNKNOWN (not in `pl_kpis.csv`; `market.csv` empty per kpi_pack `missing`). ARI and RGI are UNKNOWN (no comps priced).
- Forward occupancy: UNKNOWN for P03 (unlabelled) and P15–P19 (no prices rows). `prices.csv` has no row for 28 Oct and ends 27 Dec. P13 nights after 27 Dec were not checked.
- Cancellation timing: `reservations.csv` has no cancel date. Times here come from Smoobu `modifiedAt` and were checked only for reservations modified 14–28 Oct. Cancellations before 14 Oct are NOT CHECKED, so the pre-rise cancellation baseline is incomplete. Cancellation fees retained (P11 28 Nov–12 Dec) are UNKNOWN.
- P04 19–20 Dec Airbnb booking date: UNKNOWN (imported 26 Oct).
- P05 18 Oct booking: time relative to the base rise UNKNOWN (`booked_on` has no time; not re-queried).
- P20 ADR30 and RevPAR30 are understated (separately paid nights, per policy).
- Paid vs price for the new P11, P13, P20 and P08 bookings: NOT CHECKED here (channel section). Use room = `total_gbp` (cleaning already excluded).

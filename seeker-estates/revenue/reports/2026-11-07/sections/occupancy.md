## Occupancy & performance

**Portfolio, last 30 nights (8 Oct–6 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** 259 n, revenue £44,827.37, occupancy 66.4%, ADR £173.08, RevPAR £114.94. Source: `reports/2026-11-07/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice: room only, cleaning excluded. Yesterday (7 Oct–5 Nov) it was 261 n / 66.9% / £172.36 / £115.35.
- **Last 365 nights (7 Nov 2025–6 Nov 2026):** 2,161 n, £397,991.61, occupancy 45.5%, ADR £184.17, RevPAR £83.88 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.
- Left out rather than counted as zero: P03 (not in Smoobu), P04 (in Smoobu since 20 Oct) and P15–P19 (not mapped).

**Booked next 30 nights (7 Nov–6 Dec): 170 of 285 non-blocked nights = 59.6%.** Yesterday: 170/290 = 58.6%.
- Source: live Smoobu GET `/api/reservations` (841 records incl. cancellations) and `/api/rates`, pulled 7 Nov 07:19Z. Guest fields were dropped before saving to scratch. The two endpoints agree on every unit-night for the next 60 nights (0 mismatches).
- Exclusions: P02, P03 and P07 (blocked on purpose), and every night after a handback.
- Blocked nights excluded: P01 7 (30 Nov–6 Dec handback gap block), P06 15 (22 Nov–6 Dec, policy block) and P20 2 (18–19 Nov).

**Booked next 60 nights (7 Nov–5 Jan): 231 of 475 = 48.6%.** Yesterday: 228/481 = 47.4%. The gain is +7 n from P20 19–26 Dec. P06 18–21 Nov falls in both windows.

**Tonight, 7 Nov (Smoobu rates 07:19Z):** open on P08 (£225, min 2, cannot sell; see orphans), P09 (£132, min 2), P14 (special setup) and P20 (£213, min 3). Every other managed unit is booked or blocked.

### Did the last nights sell? (Smoobu 7 Nov 07:19Z)
- **P08 6 Nov: NOT sold.** No reservation covers it, so it lapsed. **P08 7 Nov is open and unsellable:** min 2 in both Smoobu and PriceLabs, and the 8–14 Nov stay starts tomorrow. Smoobu shows £225. The PriceLabs override for 7 Nov (`get_listing_date_overrides` 3318167) is +5% with min_stay 2, last updated 5 Nov 10:55Z. **So a-handback-lastnights (7 Nov min 1) was not applied.** 7 Nov is not in the 7 Nov raw `prices_3318167.json` (the series starts 8 Nov). In the 6 Nov raw it had price 193 and user_price 175. Where the £225 comes from: NOT CHECKED.
- **P09 6 Nov: NOT sold** (lapsed). **P09 7 Nov: open**, £132 min 2. It heads a 6-night run, 7–12 Nov, at £132 / £113 / £110 / £111 / £116 / £125, before the 13–15 Nov Airbnb stay.
- **P09 8–10 Nov in Smoobu are now £113 / £110 / £111, no longer £100.** They match PriceLabs `price` in the 7 Nov raw `prices_3318172.json`. That raw (refreshed 6 Nov 08:48Z) still has `user_price` 100 for those nights.

### Booked vs market, next 30 / next 60 (Smoobu truth; market from kpi_pack `market_occ_30/60`)
| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (23/23 non-blocked) | 35% | 100% (26/26 to handback 20 Dec) | 29% | 75.9% (counts blocks) |
| P04 | 53.3% (16/30) | 24% | 48.3% (29/60) | 20% | 51.7% |
| P05 | 76.7% (23/30) | 43% | 65.0% (39/60) | 40% | 75.9% |
| P06 | 53.3% of non-blocked (8/15; 15 blocked by policy) | 48% | 8/15 (45 blocked) | 42% | 24.1% (counts blocks) |
| P08 | 85.7% (6/7 to handback 13 Nov) | 49% | same | 43% | 100% (file starts 8 Nov) |
| P09 | 70.0% (14/20 to handback 26 Nov) | 36% | same | 31% | 73.7% (file starts 8 Nov) |
| P10 | 100% (12/12 to handback 18 Nov) | 29% | same | 24% | 100% |
| P11 | 46.7% (14/30) | 46% | 45.0% (27/60) | 39% | 44.8% |
| P12 | 63.3% (19/30) | 42% | 56.8% (21/37 to handback 13 Dec) | 34% | 62.1% |
| P13 (one flat, both Smoobu ids) | 73.3% (22/30) | 43% | 48.3% (29/60) | 38% | 72.4% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 39% | 0% |
| P20 | 46.4% (13/28 non-blocked) | 37% | 34.5% (20/58) | 30% | 44.8% |

The kpi_pack carries no cancelled nights today: P13 20–25 Dec and P09 are open in both sources. **Use the Smoobu column.**

### 7-day pickup, net of cancellations (bookings made 1–7 Nov to 07:19Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. Room £ comes from `reservations.csv` 7 Nov. No imported past stays fall in the window.

**Totals:**
- **Gross made:** 12 bookings / 40 n / £8,755.22. Confirmed only: 10 / 33 n / £7,350.81.
- **Cancelled in the window:** 4 / 20 n / £3,337.45:
  - P09 1–10 Nov, cancelled 5 Nov 09:32;
  - P12 3–7 Dec, 5 Nov 00:58;
  - P11 12–14 Dec, made and cancelled 3 Nov;
  - **P13 20–25 Dec, made 6 Nov 11:08 and cancelled 11:18 (Smoobu 162696296, on 3090701), £917.73.**
- **Net: +20 n / +£5,417.77.** Yesterday: +5 n / +£1,857.46.
- **Correction to yesterday:** P05 29 Jan–1 Feb (£1,059.52) was made **1 Nov 09:32** (Smoobu `created-at`, and `booked_on` in both the 6 Nov and 7 Nov csv), not 30 Oct. It belonged in yesterday's window, so yesterday's net should have read +8 n / +£2,916.98.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P20 | 2 / 10 / £1,938.00 (10–13 Nov £510.00; **19–26 Dec £1,428.00**, Airbnb, made 6 Nov 09:33) | — | +10 / +£1,938.00 |
| P06 | 2 / 7 / £1,397.79 (12–15 Nov £541.00; **18–22 Nov £856.79**, Airbnb, made 6 Nov 21:22) | — | +7 / +£1,397.79 |
| P11 | 3 / 7 / £1,597.19 (incl. 12–14 Dec made and cancelled) | 2 / £486.68 | +5 / +£1,110.51 |
| P12 | 3 / 8 / £1,844.99 | 3–7 Dec 4 / £1,072.44 | +4 / +£772.55 |
| P05 | 1 / 3 / £1,059.52 (29 Jan–1 Feb) | — | +3 / +£1,059.52 |
| P13 | 1 / 5 / £917.73 (20–25 Dec) | 5 / £917.73 (same booking) | 0 / £0 |
| P09 | 0 | 1–10 Nov 9 / £860.60 | −9 / −£860.60 |
| P01, P02, P04, P07, P08, P10, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` is gross and ignores cancellations. Its per-property values match the "Made" column for P05, P06, P11 (confirmed only), P12 and P20.

**Price context for the two new stays (figures only; the channel section owns the ratio):**
- **P06 18–22 Nov, room £856.79.**
  - Against the Smoobu rates seen 6 Nov 07:20Z (£277 / £295 / £342 / £430 = £1,344; yesterday's occupancy section), the ratio is **0.637x**.
  - Against PriceLabs `price` in the 7 Nov raw (refreshed 6 Nov 08:40Z: £247 / £264 / £301 / £308 = £1,120), it is **0.765x**.
  - The Smoobu rate actually on sale at 21:22: NOT CHECKED.
- **P20 19–26 Dec, room £1,428.00.**
  - Against the 6 Nov raw `prices_3547481` `user_price` for 19–25 Dec (£1,980), it is **0.721x**.
  - After the 15% weekly discount (£1,683.00), it is **0.848x**.
  - Lead time is 43 days.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 7 Nov; cancelled bookings excluded on both sides)
| P12 measure | 6 Nov | 7 Nov |
|---|---|---|
| Pace30 (stays 7 Nov–6 Dec) | −8 n / −£855.31 / −19.9% | **19 n / £3,541.10 vs 27 n / £4,407.55 = −8 n / −£866.45 / −19.7%** |
| To handback (stays 7 Nov–13 Dec) | −10 n / −£1,267.57 / −23.2% | 21 n / £4,054.91 vs 31 n / £5,280.55 = **−10 n / −£1,225.64 / −23.2%** |
| Pace90 (stays 7 Nov–4 Feb; nothing after 13 Dec is inventory) | −22 n / −50.2% | 21 n / £4,054.91 vs 43 n / £8,233.25 = −22 n / −£4,178.34 / −50.7% |

- The "to handback" row was recomputed with `rm.metrics.on_the_books` on `reservations.csv` 7 Nov.
- **Every other unit: pace UNKNOWN.** Their Smoobu history starts after the STLY as-of date of 7 Nov 2025 (first arrival: P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). kpi_pack STLY = 0 here means missing history, not zero demand.
- P02 has STLY 2 n / £182.37, but it is blocked on purpose (policy) and is not assessed.
- **On the books, stays 7 Nov–6 Dec (kpi_pack `pace_30`):**
  - P01 23 n / £3,498.99
  - P05 23 / £11,194.14
  - P06 8 / £1,666.05
  - P08 6 / £776.46
  - P09 14 / £1,485.71
  - P10 12 / £1,271.57
  - P11 14 / £2,905.43
  - P13 22 / £3,329.78
  - P20 13 / £2,252.65
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Room £ comes from `reservations.csv` 7 Nov. Recomputed in full from the 7 Nov Smoobu pull.

**Raised group (P01, P05, P06, P09, P11, P12): +7 n / +£2,655.44.** Yesterday it was +3 n / +£1,798.65.
- **The whole change is P06 18–22 Nov (+4 n / +£856.79).**
- Made: 20 / 66 n / £14,362.79. Cancelled: 9 / 59 n / £11,707.35.
- **Caveat on that booking:** it sold nights that were *not* for sale on 18 Oct. The policy block was shortened 5 Nov 17:31 (P06 is an intentional-block property). So it reflects the reopening, not the rise. **Without it, the raised group stays at +3 n / +£1,798.65.**

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 |
| P05 | 2 / 6 / £1,953.04 | — | +6 / +£1,953.04 |
| P06 | 3 / 10 / £2,202.56 | — | **+10 / +£2,202.56** (was +6 / +£1,345.77) |
| P09 | 1 / 2 / £253.21 | 1 / 9 / £860.60 (booked before the rise) | −7 / −£607.39 |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | 5 / 26 / £5,672.84 | +6 / +£741.60 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +36 n / +£6,145.79. Yesterday +29 / +£4,717.79; the change is P20 19–26 Dec.
- P13: +16 n / +£2,909.76, unchanged. The 20–25 Dec booking was made and cancelled, so it nets to 0.

**Caveats (unchanged):**
- The 24 Oct Booking.com markup cut, Booking.com promotions, Reyhan's overrides and the P06 block change cannot be separated from the rise.
- The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 8 Oct–6 Nov.
- **Fwd occ30:** Smoobu, 7 Nov–6 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 7 Nov–6 Dec.
- **Pickup 7d:** made 1–7 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £159.94 | £159.94 | 100% to gap block (35%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 66.7% | £108.42 | £72.28 | all blocked (48%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 53.3% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 73.3% | £373.27 | £273.73 | 76.7% (43%) | UNKNOWN: no STLY | +3 / +£1,059.52 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 86.7% | £201.39 | £174.54 | 53.3% of 15 non-blocked (48%) | UNKNOWN | +7 / +£1,397.79 | **Soft** (fwd30 < 60%; blocked nights excluded per policy) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (24%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 90.0% | £153.28 | £137.96 | 85.7% to 13 Nov (49%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (≥ 85%). The only open night, 7 Nov, is unsellable, and handback is 13 Nov |
| P09 | Greenwich | 56.7% | £126.41 | £71.63 | 70.0% to 26 Nov (36%) | UNKNOWN: no STLY | −9 / −£860.60 | Unclassifiable (60–85%, no STLY) |
| P10 | Ealing / Hanger Lane | 90.0% | £108.31 | £97.48 | 100% to 18 Nov (29%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £173.73 | £133.20 | 46.7% (46%) | UNKNOWN: no STLY | +5 / +£1,110.51 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £183.22 | £140.47 | 63.3% (42%) | **−8 n / −£866.45 / −19.7%** | +4 / +£772.55 | **Soft** (pace) |
| P13 | Shepherd's Bush (one flat) | 73.3% | £151.59 | £111.17 | 73.3% (43%) | UNKNOWN: no STLY | 0 / £0 (made and cancelled) | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 73.3% | £166.17* | £121.86* | 46.4% of non-blocked (37%) | UNKNOWN: no STLY | +10 / +£1,938.00 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P08, P10.
- On track 0.
- Soft 6: P04, P06, P11, P12, P14, P20.
- Unclassifiable 8: P05, P09, P13, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- **Change from 6 Nov:** P08 moved from Unclassifiable to Compressed. This is only because the window now starts 7 Nov (6/7 booked). It does not reflect new demand.

**Last 365 nights** (kpi_pack `last365`, 7 Nov 2025–6 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 40.3% / £176.81 / £71.21 / £25,990.54
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 58.1% / £372.57 / £216.40 / £78,985.43
- P06 36.4% / £236.25 / £86.08 / £31,420.74
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.3% / £174.19 / £70.15 / £25,606.17
- P09 39.2% / £115.61 / £45.30 / £16,532.84
- P10 39.5% / £114.06 / £45.00 / £16,424.98
- P11 78.4% / £174.03 / £136.37 / £49,773.92
- P12 81.4% / £192.09 / £156.30 / £57,050.15
- P13 78.6% / £158.22 / £124.41 / £45,409.97
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.0% / £166.17 / £10.02 / £3,655.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 61 / 44 / 4: Airbnb 100%
- P06 33 / 14 / 4: Airbnb 73.6%, Booking.com 26.4%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 24 / 21 / 5: Airbnb 56.5%, Booking.com 41.9%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 84 / 21 / 3: Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 7 / 7 / 4: Airbnb 100%

### Orphan gaps (Smoobu `/api/rates` 7 Nov 07:19Z, next 60; P13 is one calendar; handbacks respected)
An orphan here is an open night that no stay can cover, given the min stay on each arrival night and the bounding bookings, blocks or handback. kpi_pack `gaps` is empty for every unit because it reads PriceLabs, which does not include 7 Nov for P08.

| Ref | Night | Smoobu price / min | Why it cannot sell |
|---|---|---|---|
| **P08** | **7 Nov (tonight)** | £225 / 2 | 6 Nov has passed and the 8–14 Nov stay begins tomorrow. PriceLabs DSO is min 2 (updated 5 Nov 10:55Z). This is the last open night before the 13 Nov handback. |
| **P12** | **13 Dec** (next 60, not next 30) | £273 / 2 | Created by the 11–13 Dec Booking.com stay (made 5 Nov). 14 Dec onward is the handback block. 13 Dec is the last night before handback. PriceLabs 7 Nov raw: price 273, user_price 257, min 2. |

**Checked and not orphans:**
- **P06 around 18–22 Nov:** 15–17 Nov is a 3-night run at £237 / £237 / £244, min 2, so it can sell (as 3 nights, or as 2 nights leaving one night). 22 Nov onward is the policy block. 8–11 Nov is a 4-night run, min 2.
- **P20 around Christmas:** 5–18 Dec is a 14-night run (min 3). 26 Dec–5 Jan is open for 11+ nights, min 4–6 (26 Dec min 4, 27–28 Dec min 6, 29–31 Dec min 5). No orphan.
- **P13 Christmas:** the 20–25 Dec cancellation reopened the nights. 7–26 Dec is now one 20-night open run (21–26 Dec min 3, 27 Dec booked). **25–26 Dec, unsellable yesterday, is now sellable** (for example arrival 24 Dec for 3 nights).
- **P09 7–12 Nov:** 6 nights, min 2.

**Single nights at min 1** (bookable, not orphans): P05 9 Nov (£1,376) and 29 Dec (£1,346); P12 26 Nov (£323); P13 17 Nov (£195), 27 Nov (£333) and 1 Dec (£310, intentional per policy); P04 2 Dec (£500, policy).

### Gaps to fill (open nights next 30, Smoobu 7 Nov 07:19Z)
- **P08 7 Nov** (orphan, above); P08 has nothing else open before the 13 Nov handback.
- **P09 7–12 Nov** (6 n, min 2): £132 / £113 / £110 / £111 / £116 / £125. This is the last open run before the 26 Nov handback.
- **P06 8–11 Nov** (£200 / £200 / £204 / £212) and **15–17 Nov** (£237 / £237 / £244), both min 2.
- **P04:** 9–13 Nov (5 n, £157–161) and 18–24 Nov (7 n, £161–193), min 3; 2 Dec (policy).
- **P05:** 9 Nov (min 1), 16–17 Nov (£371 / £385, min 2) and 29 Nov–2 Dec (4 n, £497–511, min 3).
- **P11:** 10–13 Nov (4 n), 18–19 Nov, 22–25 Nov (4 n) and 29 Nov–4 Dec (6 n), all min 2.
- **P12:** 12–13 Nov, 17–20 Nov (4 n), 26 Nov (min 1) and 30 Nov–3 Dec (4 n).
- **P13:** 8–12 Nov (5 n, min 2), plus 17 Nov, 27 Nov and 1 Dec (min 1).
- **P20:** 7–9 Nov (3 n, min 3), 13–17 Nov (5 n; 16–17 min 2) and 20–24 Nov (5 n, min 3).
- **P14:** all nights (special setup, numbers only).

Data gaps:
- STLY history for every unit except P12. Pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- P09 retained payout after the 1–10 Nov cancellation: NOT KNOWN; needs Airbnb's reservation or transaction page.
- Smoobu rate on sale for P06 18–21 Nov at booking time (6 Nov 21:22): NOT CHECKED. Smoobu returns rates only for the current state.
- Source of the P08 7 Nov Smoobu £225 (PriceLabs 7 Nov raw has no 7 Nov row): NOT CHECKED.
- P03: not in Smoobu, so no reservations. P04: last-30 and last-365 UNKNOWN because its history starts 20 Oct. P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 7 Nov kpi_pack was built (kpi_pack `missing`): no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu.
- `reservations.csv` `total_gbp` excludes cleaning, so all revenue is room only.

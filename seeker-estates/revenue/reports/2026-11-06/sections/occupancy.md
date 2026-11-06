## Occupancy & performance

**Portfolio, last 30 nights (7 Oct–5 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** 261 n, revenue £44,986.57, occupancy 66.9%, ADR £172.36, RevPAR £115.35. Source: `reports/2026-11-06/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice, so it is room only and excludes cleaning.
- **The pack does NOT count P09's cancelled 1–5 Nov nights.** `rm.metrics.performance` drops rows with status `cancelled`, and I recomputed the figure from `data/snapshots/2026-11-06/reservations.csv`: it gives the same 261 n / £44,986.57.
- **P09 last 30 is 18 n / £2,252.38 / 60.0%.** Yesterday, on the 6 Oct–4 Nov window, it was 23 n and counted 1–4 Nov.
- **Smoobu agrees with the pack.** Live `/api/rates` (06 Nov 07:20Z) shows P09 1–5 Nov as `available: 1`, so Smoobu has released the whole stay. **So the corrected Smoobu-truth figure is the pack figure: 261 n / 66.9%.**
- If the guest did physically stay 1–5 Nov, that is NOT CONFIRMED. It would add 5 n, giving 266 n / 68.2% of 390 unit-nights. The revenue for those nights is UNKNOWN (see the P09 subsection).
- **Last 365 nights (6 Nov 2025–5 Nov 2026):** 2,155 n, £396,912.89, occupancy 45.4%, ADR £184.18, RevPAR £83.65. Source: kpi_pack `portfolio_last365`. Most Smoobu history starts in 2026, so this understates a full year.
- P03 (not in Smoobu), P04 (in Smoobu only since 20 Oct) and P15–P19 (not mapped) are left out, not counted as zero.

**Booked next 30 nights (6 Nov–5 Dec): 170 of 290 non-blocked nights = 58.6%.** Yesterday it was 179/288 = 62.2% on 5 Nov–4 Dec.
- Source: live Smoobu GET `/api/reservations` and `/api/rates`, pulled 06 Nov 07:18–07:20Z. Every unit-night agrees between the two endpoints.
- P02, P03 and P07 are left out (blocked on purpose). Nights after each handback are excluded.
- Blocked nights excluded: P01 6 (30 Nov–5 Dec, handback gap block), P06 14 (22 Nov–5 Dec, policy block) and P20 2 (18–19 Nov).
- **Drivers of the change:**
  - P09 lost 4 booked nights (6–9 Nov, after the cancellation).
  - P06 gained 7 sellable nights. Its Smoobu "Blocked channel" block 143402691 was modified 5 Nov 17:31:32 and now starts 22 Nov, so 15–21 Nov are open.
  - The window also rolled forward one day.

**Booked next 60 nights (6 Nov–4 Jan): 228 of 481 = 47.4%.** Yesterday it was 240/480 = 50.0%.

**Tonight, 6 Nov:** open on P08 (£175, min 2), P09 (£110, min 2), P14 (special setup) and P20 (£211, min 3). All other managed units are booked or blocked.
- 5 Nov lapsed unsold on P08 and P14, and on P09 after the cancellation (Smoobu `/api/rates` 5 Nov available).

### Booked vs market, next 30 / next 60 (Smoobu truth; market from kpi_pack `market_occ_30/60`)
| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (24/24 non-blocked) | 33% | 100% (27/27, to handback 20 Dec) | 28% | 79.3% (counts blocks) |
| P04 | 56.7% (17/30) | 23% | 50.0% (30/60) | 20% | 55.2% |
| P05 | 76.7% (23/30) | 41% | 66.7% (40/60) | 40% | 75.9% |
| P06 | 31.2% of non-blocked (5/16; 14 blocked by policy) | 47% | 5/16 (44 blocked) | 43% | 13.8% |
| P08 | 75.0% (6/8, to handback 13 Nov) | 49% | same | 43% | 85.7% |
| P09 | **66.7% (14/21, to handback 26 Nov)**; was 86.4% | 36% | same | 32% | 70.0% (7–26 Nov; does not count the cancelled nights) |
| P10 | 100% (13/13, to handback 18 Nov) | 28% | same | 24% | 100% |
| P11 | 46.7% (14/30) | 45% | 46.7% (28/60) | 39% | 44.8% |
| P12 | 63.3% (19/30) | 41% | 57.9% (22/38, to handback 13 Dec) | 34% | 62.1% |
| P13 (one flat, both Smoobu ids) | 73.3% (22/30) | 42% | 50.0% (30/60) | 38% | 72.4% |
| P14 (special setup, numbers only) | 0% (0/30) | 44% | 0% (0/60) | 38% | 0% |
| P20 | 46.4% (13/28 non-blocked) | 36% | 22.4% (13/58) | 30% | 44.8% |

kpi_pack `forward_occ_30` comes from PriceLabs `prices.csv`, which starts 7 Nov. It no longer carries any cancelled nights: P09 7–12 Nov are open in the 6 Nov raw file. **Use the Smoobu column.**

### P09 Torrent Lodge: 1–10 Nov Airbnb cancellation (Smoobu fields only, no guest data)
- **The record:** Smoobu id 158710021, Airbnb, 1–10 Nov (9 n). Created 4 Oct 11:26. `type: cancellation`, `modifiedAt` 5 Nov 09:32:47. `price` £985.60, which is room £860.60 plus cleaning £125. `commission-included` £152.77.
- **Mid-stay?** The arrival date (1 Nov) is before the cancellation time (5 Nov 09:32). Smoobu has no check-in or stayed flag, so **whether the guest was in residence is NOT CONFIRMED**.
- **The whole booking was cancelled, not shortened.** Smoobu shows it as a full cancellation, not as an alteration to a shorter stay. `/api/rates` now shows every night 1–9 Nov as available, including the past nights 1–5 Nov.
- **Nights reopened:** 6–9 Nov are now open in Smoobu, and they join the 10–12 Nov nights that were already open. That makes one 7-night run, 6–12 Nov, min 2, at Smoobu £110 / £130 / £100 / £100 / £100 / £116 / £125. It runs up to the 13–15 Nov Airbnb stay.
- **Smoobu 8–10 Nov sit at the £100 PriceLabs minimum.** The PriceLabs 6 Nov raw (`raw/prices_3318172.json`, refreshed 5 Nov 10:56:56Z) has `price` £112 / £110 / £109 for those nights. kpi_pack `sync_issues` lists the same 3 nights. 6 Nov itself is not in the PriceLabs file.
- **Retained payout: NOT KNOWN.** The Smoobu `price-details` still read "Cancellation Host Fee £152.77 / Cancellation Payout £832.83", which are exactly the original booking values. Smoobu writes the same labels on confirmed Airbnb stays (for example id 160091406, 15–27 Nov). P09's earlier cancellation (157670931, cancelled 30 Sep) also shows its full original payout. These fields therefore say nothing about what Airbnb pays out after the cancellation. Airbnb's own reservation or transaction page is needed.
- **Effect:**
  - Last 30: −5 n (1–5 Nov) versus yesterday's view.
  - Next 30: −4 n (6–9 Nov). P09 to handback falls from 18/21 to 14/21 = 66.7%.
  - The booking's full room value, −£860.60, comes off pickup and off the 18 Oct comparison (both below).
  - Split pro rata (`rm.metrics.nights_in_window`): £478.11 for 1–5 Nov and £382.49 for 6–9 Nov, assuming no retained payout.
- **PriceLabs no longer shows LISTING_NO_DATA for P09.** Today's raw file returns a full series, whereas the 5 Nov raw had `LISTING_NO_DATA`.

### 7-day pickup, net of cancellations (bookings made 31 Oct–6 Nov; 6 Nov to 07:20Z)
**Sources:** Smoobu `created-at` and, for cancellations, `modifiedAt`; room £ from `reservations.csv` 6 Nov. No imported past stays are in the window.

**Totals:**
- **Gross bookings made:** 8 / 21 n / £4,493.18. Confirmed alone: 7 / 19 n / £4,006.50.
- **Cancellations in the window:** 4 / 16 n / £2,635.72:
  - P09 1–10 Nov, cancelled 5 Nov 09:32;
  - P12 3–7 Dec, cancelled 5 Nov 00:58;
  - P11 12–14 Dec, made and cancelled 3 Nov;
  - P04 19–20 Dec, cancelled 31 Oct 14:36.
- **Net: +5 n / +£1,857.46.** Yesterday it was +12 n / +£2,907.95.
- kpi_pack `pickup_7d` is gross and ignores cancellations. It shows P09 0, when the net figure is −9 n / −£860.60.

| Ref | Made, confirmed (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P12 | 3 / 8 / £1,844.99 (27–30 Nov £653.39; 4–7 Dec £677.79; **11–13 Dec £513.81, made 5 Nov 22:39, Booking.com, commission £99.57**) | 3–7 Dec 4 / £1,072.44 | +4 / +£772.55 |
| P11 | 2 / 5 / £1,110.51 (plus 12–14 Dec made and cancelled) | 2 / £486.68 (same booking) | +5 / +£1,110.51 |
| P06 | 1 / 3 / £541.00 (12–15 Nov) | — | +3 / +£541.00 |
| P20 | 1 / 3 / £510.00 (10–13 Nov) | — | +3 / +£510.00 |
| P09 | 0 | **1–10 Nov 9 / £860.60** | **−9 / −£860.60** (forward part 6–9 Nov: −4 n) |
| P04 | 0 | 19–20 Dec 1 / £216.00 | −1 / −£216.00 |
| P01, P02, P05, P07, P08, P10, P13, P14 | 0 | — | 0 |

P05's 29 Jan–1 Feb booking was made 30 Oct and has left the window.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 6 Nov; cancelled bookings excluded on both sides)
| P12 measure | 5 Nov | 6 Nov |
|---|---|---|
| Pace30 (stays 6 Nov–5 Dec) | −7 n / −£668.97 / −16.6% | **19 n / £3,448.44 vs 27 n / £4,303.75 = −8 n / −£855.31 / −19.9%** |
| To handback (stays 6 Nov–13 Dec) | −11 n / −£1,648.11 / −30.2% | 22 n / £4,188.18 vs 32 n / £5,455.75 = **−10 n / −£1,267.57 / −23.2%** |
| Pace90 (stays 6 Nov–3 Feb; nothing after 13 Dec is inventory) | −23 n / −54.7% | 22 n / £4,188.18 vs 44 n / £8,408.45 = −22 n / −£4,220.27 / −50.2% |

- The "to handback" row was recomputed with `rm.metrics.on_the_books` on `reservations.csv` 6 Nov.
- To handback improved by +1 n / +£380.54 on the day. The 11–13 Dec booking added +2 n / +£513.81, and 5 Nov rolled out of the window.
- **Every other unit: pace UNKNOWN.** Their Smoobu history starts after the STLY as-of date: P11 from 11 Dec 2025, P13 from 14 Dec 2025, the rest in 2026 (`reservations.csv`). kpi_pack shows their STLY as 0, but that is missing history, not zero demand.
- **On the books for stays 6 Nov–5 Dec (kpi_pack `pace_30`):**
  - P01 24 n / £3,651.12
  - P05 23 / £11,010.84
  - P06 5 / £1,077.51
  - P08 6 / £776.46
  - P09 14 / £1,485.71 (was 19 / £1,963.82)
  - P10 13 / £1,377.53
  - P11 14 / £2,833.54
  - P13 22 / £3,300.31
  - P20 13 / £2,252.65
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made after the rise (Smoobu `created-at` from 19 Oct, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Room £ comes from `reservations.csv` 6 Nov. The Smoobu pull covers 15 Sep 2026–1 Jan 2028.

**Raised group (P01, P05, P06, P09, P11, P12): +3 n / +£1,798.65** (yesterday +10 n / +£2,145.44).
- The change is −9 n / −£860.60 from P09's cancellation (booked 4 Oct, before the rise; cancelled after it) and +2 n / +£513.81 from P12's 11–13 Dec booking.
- Made: 19 / 62 n / £13,506.00. Cancelled: 9 / 59 n / £11,707.35.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 |
| P05 | 2 / 6 / £1,953.04 | — | +6 / +£1,953.04 |
| P06 | 2 / 6 / £1,345.77 | — | +6 / +£1,345.77 |
| P09 | 1 / 2 / £253.21 | 1 / 9 / £860.60 (pre-rise booking) | **−7 / −£607.39** (was +2 / +£253.21) |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | 5 / 26 / £5,672.84 | **+6 / +£741.60** (was +4 / +£227.79) |

**Comparison groups (unchanged from yesterday):**
- Unraised (P02, P08, P10, P14, P20): +29 n / +£4,717.79.
- P13: +16 n / +£2,909.76.

**Per-day rates** (confirmed bookings only):
- On yesterday's windows (made 19 Oct–4 Nov vs 2–18 Oct), raised is now 14 / 47 n / £9,638.29 vs 13 / 89 n / £18,366.01, so 1.08× bookings / 0.53× nights / 0.52× revenue (yesterday 1.00× / 0.48× / 0.50×).
  - The pre-rise baseline shrank because the P09 booking made 4 Oct is now cancelled.
- Extending to 18-day windows (19 Oct–5 Nov vs 1–18 Oct), raised is 16 / 52 / £10,829.89 vs 13 / 89 / £18,366.01, so 1.23× / 0.58× / 0.59×.
- Unraised: 6 / 29 / £4,717.79 vs 7 / 68 / £8,054.83, so 0.86× / 0.43× / 0.59× on both window pairs.

**Caveats:**
- The raised net is still positive but is now small. The fall comes from a cancellation of a booking made before the rise, which is not evidence about the rise itself.
- Both new P12 bookings sold on dates carrying Reyhan's −15% override (27 Nov–13 Dec, set 4 Nov, per the 5 Nov report).
- The 24 Oct Booking.com markup cut, Booking.com promotions, the Airbnb flexible-cancellation test and Reyhan's overrides cannot be separated from the rise.
- The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 7 Oct–5 Nov.
- **Fwd occ30:** Smoobu, 6 Nov–5 Dec, handback-aware.
- **Pace30:** stays 6 Nov–5 Dec.
- **Pickup 7d:** made 31 Oct–6 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £160.28 | £160.28 | 100% to gap block (33%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 70.0% | £110.42 | £77.30 | all blocked (47%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (52%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 56.7% (23%) | UNKNOWN: no history | −1 / −£216.00 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 70.0% | £376.87 | £263.81 | 76.7% (41%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 86.7% | £198.45 | £171.99 | 31.2% of 16 non-blocked (47%) | UNKNOWN | +3 / +£541.00 | **Soft** (fwd30 < 60% on the 15–21 Nov nights reopened 5 Nov; blocked nights excluded per policy) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (23%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 93.3% | £153.86 | £143.61 | 75.0% to 13 Nov (49%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 60.0% | £125.13 | £75.08 | 66.7% to 26 Nov (36%) | UNKNOWN: no STLY | **−9 / −£860.60** | Unclassifiable (60–85%, no STLY); was Compressed |
| P10 | Ealing / Hanger Lane | 90.0% | £107.58 | £96.82 | 100% to 18 Nov (28%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £175.33 | £134.42 | 46.7% (45%) | UNKNOWN: no STLY | +5 / +£1,110.51 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £186.18 | £142.74 | 63.3% (41%) | **−8 n / −£855.31 / −19.9%** | +4 / +£772.55 | **Soft** (pace) |
| P13 | Shepherd's Bush (one flat) | 73.3% | £152.27 | £111.66 | 73.3% (42%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (44%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 73.3% | £166.17* | £121.86* | 46.4% of non-blocked (36%) | UNKNOWN: no STLY | +3 / +£510.00 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 2: P01, P10.
- On track 0.
- Soft 6: P04, P06, P11, P12, P14, P20.
- Unclassifiable 9: P05, P08, P09, P13, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- **Changes from 5 Nov:** P09 moved from Compressed to Unclassifiable after the cancellation. P06 moved from not classified to Soft because 15–21 Nov reopened.

**Last 365 nights** (kpi_pack `last365`, 6 Nov 2025–5 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 40.0% / £176.98 / £70.79 / £25,838.41
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 57.8% / £372.93 / £215.58 / £78,687.59
- P06 36.2% / £236.00 / £85.35 / £31,152.49
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.3% / £174.19 / £70.15 / £25,606.17
- P09 39.2% / £115.61 / £45.30 / £16,532.84
- P10 39.2% / £114.12 / £44.71 / £16,319.02
- P11 78.1% / £174.13 / £135.96 / £49,627.12
- P12 81.4% / £192.23 / £156.42 / £57,092.08
- P13 78.4% / £158.25 / £124.00 / £45,260.30
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.0% / £166.17 / £10.02 / £3,655.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 61 / 44 / 4: Airbnb 100%
- P06 32 / 15 / 4: Airbnb 72.9%, Booking.com 27.1%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 24 / 21 / 5: Airbnb 56.5%, Booking.com 41.9%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 84 / 21 / 3: Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 6 / 7 / 4: Airbnb 100%

### Orphan gaps (next 30, Smoobu `/api/rates` 06 Nov 07:18Z; P13 is one calendar; handbacks respected)
**No open run is shorter than its minimum stay.** kpi_pack `gaps` is empty for every unit.

**Runs at exactly the minimum stay** (bookable, not orphans):
- P08: 6–7 Nov (min 2, £175 / £193); these are the last open nights before the 13 Nov handback.
- P05: 9 Nov (min 1, £1,383) and 16–17 Nov (min 2, £371 / £386).
- P11: 18–19 Nov (min 2, £159 / £175).
- P12: 12–13 Nov (min 2, £219 / £276) and 26 Nov (min 1, £316).
- P13: 17 Nov (£193), 27 Nov (£334) and 1 Dec (£314), all min 1. The 1 Dec setting is intentional per policy.
- P04: 2 Dec (£496, min 1). Settled by policy (`p04_2dec_override`).

### Gaps to fill (open nights next 30, Smoobu 6 Nov)
- **P09 6–12 Nov** (7 n, min 2, the run created by the cancellation; before the 26 Nov handback): £110 / £130 / £100 / £100 / £100 / £116 / £125. The three £100 nights are at the PriceLabs minimum, while PriceLabs `price` is £112 / £110 / £109.
- **P06 8–11 Nov** (min 2): £200 / £200 / £226 / £238. **9 Nov now shows £200 in Smoobu, no longer £2.** Today's PriceLabs raw still has `user_price` 2 for 9 Nov; see the PriceLabs section.
- **P06 15–21 Nov** (7 n, min 2, reopened 5 Nov 17:31): £265 / £264 / £270 / £277 / £295 / £342 / £430.
- **P08 6–7 Nov** (min 2), before the 13 Nov handback.
- **P11:** 10–13 Nov (4 n), 18–19 Nov, 22–25 Nov (4 n) and 29 Nov–4 Dec (6 n), all min 2.
- **P12:** 12–13 Nov, 17–20 Nov (4 n), 26 Nov and 30 Nov–3 Dec (4 n).
- **P20:** 6–9 Nov (4 n), 13–17 Nov (5 n) and 20–24 Nov (5 n), all min 3.
- **P04:** 9–13 Nov (5 n) and 18–24 Nov (7 n), both min 3.
- **P13:** 8–12 Nov (5 n, min 2), 17 Nov, 27 Nov and 1 Dec.
- **P05:** 9 Nov, 16–17 Nov and 29 Nov–2 Dec (4 n, min 3).
- **P14:** all nights (special setup, numbers only).

Data gaps:
- P09 retained payout after the 1–10 Nov cancellation: NOT KNOWN. Smoobu price fields only repeat the original values, so Airbnb's reservation or transaction page is needed.
- Whether the P09 guest was in residence 1–5 Nov: NOT CONFIRMED (Smoobu has no check-in status).
- STLY history for every unit except P12. Pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- P03: not in Smoobu, so no reservations.
- P04: last-30 and last-365 KPIs are UNKNOWN because its Smoobu history starts 20 Oct.
- P15–P19: not mapped to Smoobu or PriceLabs.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the kpi_pack was built (kpi_pack `missing`). So there is no ARI or RGI.
- P20 18–22 Oct revenue paid separately: not in Smoobu.
- `reservations.csv` `total_gbp` excludes cleaning, so all revenue figures are room only.

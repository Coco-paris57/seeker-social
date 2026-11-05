## Occupancy & performance

**Portfolio, last 30 nights (6 Oct–4 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 67.9%, ADR £170.36, RevPAR £115.75, revenue £45,144.33 (265 n). Source: `reports/2026-11-05/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice: room only, cleaning excluded.
- **Last 365 nights (5 Nov 2025–4 Nov 2026):** 45.3%, ADR £184.01, RevPAR £83.42, revenue £395,808.02 (2,151 n). Source: kpi_pack `portfolio_last365`. Most Smoobu history starts in 2026, so this understates a full year.
- P03, P04 (in Smoobu since 20 Oct) and P15–P19 are left out, not counted as zero.

**Booked next 30 nights (5 Nov–4 Dec, 30 n): 179 of 288 non-blocked nights = 62.2%.**
- Source: live Smoobu GET /api/reservations and /api/rates, pulled 5 Nov 07:14Z. Smoobu is the truth, handbacks are respected, and P02, P03 and P07 (blocked on purpose) are left out.
- Blocked nights excluded: P01 5 (30 Nov–4 Dec, handback gap block), P06 20 (policy), and P20 2 (18–19 Nov Smoobu "Blocked channel", created 3 Nov 10:31).
- **On yesterday's window (5 Nov–3 Dec, 29 n), it is 174/281 = 61.9%, down from 175/281 = 62.3%.** The only change is P12 3 Dec, which reopened after the cancellation.

**Booked next 60 nights (5 Nov–3 Jan, 60 n): 240 of 480 = 50.0%.**

**Tonight, 5 Nov:** open on P08 (£159, min 2) and P14 (special setup). Every other managed unit is booked or blocked (Smoobu /api/rates).

**P12 4 Nov did not sell.** Smoobu /api/rates at 07:15Z still shows it available at £302, min 1, and no Smoobu reservation covers 4 Nov.

**PriceLabs vs Smoobu** (`data/snapshots/2026-11-05/prices.csv`, refreshed 01:25Z, against Smoobu 07:14Z):
- No night is Booked in PriceLabs without a Smoobu stay. The 3–7 Dec cancellation left no booked-looking nights behind.
- P12 4–6 Dec show open in `prices.csv` but are booked in Smoobu. The PriceLabs refresh ran before the 06:48 rebooking.
- The P13 differences are the linked twin's "Blocked" nights. Under policy these count as bookings.
- kpi_pack `forward_occ_30` is built from PriceLabs data (`prices.csv` starts 6 Nov). It reads P12 62.1%, P04 55.2%, P11 44.8%, P13 72.4% and P20 44.8%. **Use the Smoobu figures below.**

**P01, P06, P09 and P10: PriceLabs prices are NOT AVAILABLE today.** Their raw files hold only the LISTING_NO_DATA reply, and `prices.csv` has no rows for them. Their open nights are quoted at live Smoobu rates.
- **P06 9 Nov is on sale in Smoobu at £2/night** (available, min 2). P06 8 Nov is £200. On 4 Nov, PriceLabs and Smoobu both had 8 Nov at £228 and 9 Nov at £233 (`2026-11-04/prices.csv`).
- PriceLabs `get_listing_date_overrides` for 8–9 Nov shows only Reyhan's −5% min 2 (set 4 Nov 01:28Z).
- `get_user_logs` shows one later P06 action: a "fixed"-type date-specific override on 15–22 Nov with no price field, at 4 Nov 12:52:23Z. The last P06 push was 12:52:54Z.
- **The cause of the £2 rate is NOT KNOWN.** Night 9 Nov is real inventory: the run 8–11 Nov is not under the policy block.

### Booked vs market, next 30 / next 60 (Smoobu truth; market from kpi_pack `market_occ_30/60`)

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (25/25 non-blocked) | 34% | 100% (28/28, to handback 20 Dec) | 29% |
| P04 | 56.7% (17/30) | 23% | 51.7% (31/60) | 20% |
| P05 | 76.7% (23/30) | 40% | 68.3% (41/60) | 40% |
| P06 | 60.0% of non-blocked (6/10; 20 blocked on purpose) | 47% | 6/10 (50 blocked) | 42% |
| P08 | 66.7% (6/9, to handback 13 Nov) | 49% | same | 43% |
| P09 | 86.4% (19/22, to handback 26 Nov) | 36% | same | 32% |
| P10 | 100% (14/14, to handback 18 Nov) | 29% | same | 24% |
| P11 | 46.7% (14/30) | 45% | 48.3% (29/60) | 39% |
| P12 | 63.3% (19/30) | 41% | 53.8% (21/39, to handback 13 Dec) | 34% |
| P13 (one flat) | 73.3% (22/30) | 42% | 51.7% (31/60) | 38% |
| P14 (special setup, numbers only) | 0% (0/30) | 43% | 0% (0/60) | 39% |
| P20 | 50.0% (14/28 non-blocked) | 36% | 24.1% (14/58) | 30% |

### P12 Mile End, 3–7 Dec cancellation and 4–7 Dec booking (Smoobu, no guest data)
- **Cancelled:** Smoobu id 161902221, Booking.com 3–7 Dec. Room £1,072.44 (£268.11/n), commission £183.37. Made 29 Oct 21:04, cancelled 5 Nov 00:58:16.
- **New:** Smoobu id 162667435, Booking.com 4–7 Dec. Room £677.79 (£225.93/n), commission £124.17 (18.3% of room). Made 5 Nov 06:48, about 5 h 50 min later. Lead time 29 days.
- **Not shown to be a shortened rebooking.** The two have different Booking.com reservation numbers and different party sizes. It is a separate new reservation, not a Smoobu modification.
- **Price at booking:** the last PriceLabs figures before the booking are the 5 Nov 01:25:58Z refresh: 4/5/6 Dec at £267 + £276 + £226 = £769. Smoobu showed the same in `prices.csv`. **Room paid = 0.881× that.** The price at booking for the original 3–7 Dec stay is NOT KNOWN.
- **Net effect: −1 n / −£394.65.**
- **3 Dec is not an orphan.** It is the last night of a 4-night open run, 30 Nov–3 Dec, at min 2: Smoobu £232 / £238 / £246 / £253, the same as PriceLabs `prices.csv`.

### 7-day pickup, net of cancellations (bookings made 30 Oct–5 Nov; 5 Nov to 07:14Z)
**Sources:** `reservations.csv` 5 Nov for `booked_on` and room revenue; Smoobu `modifiedAt` for cancel times. There are no imported past stays in the window. Confirmed rows match kpi_pack `pickup_7d` for every unit.

**Totals:**
- **Gross bookings made:** 8 / 22 n / £5,038.89. Confirmed alone: 7 / 20 n / £4,552.21.
- **Cancellations in the window:** 4 / 10 n / £2,130.94:
  - P04 20–23 Nov, cancelled 30 Oct;
  - P04 19–20 Dec, cancelled 31 Oct;
  - P11 12–14 Dec, made and cancelled 3 Nov;
  - P12 3–7 Dec, cancelled 5 Nov 00:58.
- **Net: +12 n / +£2,907.95.** Yesterday's net was +23 n / +£5,624.28. The drop comes from the 29 Oct bookings leaving the window (including the now-cancelled P12 3–7 Dec) and from the P12 cancellation.

| Ref | Made, confirmed (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P05 | 1 / 3 / £1,059.52 (29 Jan–1 Feb) | — | +3 / +£1,059.52 |
| P11 | 2 / 5 / £1,110.51 (plus 12–14 Dec made and cancelled) | 2 / £486.68 (same booking) | +5 / +£1,110.51 |
| P06 | 1 / 3 / £541.00 | — | +3 / +£541.00 |
| P20 | 1 / 3 / £510.00 | — | +3 / +£510.00 |
| P12 | 2 / 6 / £1,331.18 (27–30 Nov; 4–7 Dec) | 3–7 Dec 4 / £1,072.44 | +2 / +£258.74 |
| P04 | 0 | 20–23 Nov 3 / £355.82; 19–20 Dec 1 / £216.00 | −4 / −£571.82 |
| P01, P02, P07, P08, P09, P10, P13, P14 | 0 | — | 0 |

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 5 Nov; cancelled bookings excluded on both sides)
| P12 measure | 4 Nov | 5 Nov |
|---|---|---|
| Pace30 (stays 5 Nov–4 Dec) | −7 n / −£469.42 / −12.1% | **19 n / £3,355.78 vs 26 n / £4,024.75 = −7 n / −£668.97 / −16.6%** |
| To handback (stays 5 Nov–13 Dec) | −11 n / −24.7% | 21 n / £3,807.64 vs 32 n / £5,455.75 = −11 n / −£1,648.11 / −30.2% |
| Pace90 (stays 5 Nov–2 Feb; nothing after 13 Dec is inventory) | −23 n / −50.7% | 21 n / £3,807.64 vs 44 n / £8,408.45 = −23 n / −£4,600.81 / −54.7% |

- The "to handback" row was recomputed with `rm.metrics.on_the_books` on `reservations.csv` 5 Nov.
- P12 has no other STLY window to compare.
- **Every other unit: pace UNKNOWN.** Their first Smoobu stays come after the STLY windows: P11 from 11 Dec 2025, P13 from 14 Dec 2025, and the rest in 2026 (`reservations.csv`).
- kpi_pack shows their STLY as 0, but that is missing history, not zero demand.
- On the books for stays 5 Nov–4 Dec (kpi_pack `pace_30`):
  - P01 25 n / £3,803.25
  - P05 23 / £10,877.55
  - P06 6 / £1,345.77
  - P08 6 / £776.46
  - P09 19 / £1,963.82
  - P10 14 / £1,483.50
  - P11 14 / £2,761.65
  - P13 22 / £3,270.84
  - P20 14 / £2,436.06
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made after the rise (Smoobu created-at from 19 Oct, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (Smoobu `modifiedAt`). Room £ comes from `reservations.csv` 5 Nov.

**Raised group (P01, P05, P06, P09, P11, P12): +10 n / +£2,145.44** (yesterday +11 n / +£2,540.09).
- The change is P12 only: the 3–7 Dec booking (made 29 Oct, after the rise) is now made-and-cancelled and nets to zero (−4 n / −£1,072.44), and the new 4–7 Dec booking adds +3 n / +£677.79.
- Made: 18 / 60 n / £12,992.19. Cancelled: 8 / 50 n / £10,846.75.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 (no booking since 19 Oct) |
| P05 | 2 / 6 / £1,953.04 | — | +6 / +£1,953.04 |
| P06 | 2 / 6 / £1,345.77 | — | +6 / +£1,345.77 |
| P09 | 1 / 2 / £253.21 | — | +2 / +£253.21 (no booking since 23 Oct) |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 (2 / 22 n / £4,687.23 booked before the rise) | −11 / −£2,355.27 |
| P12 | 7 / 30 / £5,900.63 | 5 / 26 / £5,672.84 | **+4 / +£227.79** (was +5 / +£622.44) |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +29 n / +£4,717.79 (unchanged).
- P13: unchanged from yesterday (+16 n / +£2,909.76); no P13 row changed in `reservations.csv` 5 Nov vs 4 Nov.

**Per-day rates** (confirmed bookings made 19 Oct–4 Nov vs 2–18 Oct, 17 days each):
- Raised: 14 / 47 n / £9,638.29 vs 14 / 98 n / £19,226.61, so **1.00× bookings / 0.48× nights / 0.50× revenue** (yesterday 1.07× / 0.52× / 0.56×).
- Unraised: 6 / 29 / £4,717.79 vs 7 / 68 / £8,054.83, so 0.86× / 0.43× / 0.59×.
- The 5 Nov P12 booking is in the net but not in these day windows.

**Caveats:**
- The raised group's net is still positive, but it has fallen for the first time since the method was corrected.
- Booking counts per day are level. Nights and revenue per day fell by a similar share in both groups.
- The new P12 booking sold on dates carrying Reyhan's −15% override (27 Nov–13 Dec, set 4 Nov 01:24Z, per yesterday's `get_user_logs`), so it is not clean evidence for the raised base.
- The 24 Oct Booking.com markup cut, Booking.com Last Minute, the Airbnb flexible-cancellation test and Reyhan's overrides cannot be separated from the rise.
- The sample is small (1–7 bookings per property).

### Per-property table
Column sources:
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 6 Oct–4 Nov.
- **Fwd occ30:** Smoobu, 5 Nov–4 Dec, handback-aware.
- **Pace30:** stays 5 Nov–4 Dec.
- **Pickup 7d:** made 30 Oct–5 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £160.62 | £160.62 | 100% to gap block (34%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 70.0% | £110.42 | £77.30 | all blocked (47%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (52%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 56.7% (23%) | UNKNOWN: no history | −4 / −£571.82 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 66.7% | £378.32 | £252.21 | 76.7% (40%) | UNKNOWN: no STLY | +3 / +£1,059.52 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 86.7% | £195.50 | £169.43 | 6/10 non-blocked (47%) | UNKNOWN | +3 / +£541.00 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (22%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £154.40 | £149.26 | 66.7% to 13 Nov (49%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 76.7% | £119.06 | £91.28 | 86.4% to 26 Nov (36%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 90.0% | £106.84 | £96.16 | 100% to 18 Nov (29%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £176.93 | £135.65 | 46.7% (45%) | UNKNOWN: no STLY | +5 / +£1,110.51 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £189.15 | £145.01 | 63.3% (41%) | **−7 n / −£668.97 / −16.6%** | +2 / +£258.74 | **Soft** (pace) |
| P13 | Shepherd's Bush (one flat) | 73.3% | £152.94 | £112.16 | 73.3% (42%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (43%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 70.0% | £165.35* | £115.75* | 50.0% of non-blocked (36%) | UNKNOWN: no STLY | +3 / +£510.00 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 3: P01, P09, P10.
- On track 0.
- Soft 5: P04, P11, P12, P14, P20.
- Unclassifiable 8: P05, P08, P13, P15–P19.
- Blocked by policy 4: P02, P03, P06, P07.
- This is unchanged from 4 Nov. P12 is Soft on pace, now −16.6%.

**Last 365 nights** (kpi_pack `last365`, 5 Nov 2025–4 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 39.7% / £177.15 / £70.37 / £25,686.28
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 57.5% / £373.05 / £214.63 / £78,339.74
- P06 35.9% / £235.76 / £84.61 / £30,884.23
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.3% / £174.19 / £70.15 / £25,606.17
- P09 40.3% / £115.07 / £46.34 / £16,915.33
- P10 38.9% / £114.18 / £44.42 / £16,213.05
- P11 77.8% / £174.23 / £135.56 / £49,480.32
- P12 81.1% / £192.43 / £156.05 / £56,958.81
- P13 78.1% / £158.28 / £123.59 / £45,110.62
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 5.8% / £165.35 / £9.51 / £3,472.38 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- P05 61 / 44 / 4: Airbnb 100%
- P06 32 / 15 / 4: Airbnb 72.9%, Booking.com 27.1%
- P07 5 / 3 / 4: Airbnb 100%
- P08 22 / 15 / 6: Airbnb 77.3%, Booking.com 22.7%
- P09 25 / 21 / 5: Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 84 / 21 / 3: Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 6 / 7 / 4: Airbnb 100%

### Orphan gaps (next 30, Smoobu /api/rates 07:14Z; P13 is one calendar; handbacks respected)
**No open run is shorter than its minimum stay.** kpi_pack `gaps` is empty for every unit.
- **P12 3 Dec: not an orphan.** See the P12 subsection above (part of the 30 Nov–3 Dec run, min 2).
- **Runs at exactly the minimum stay** (bookable, not orphans):
  - P12: 12–13 Nov (min 2, £208 / £261) and 26 Nov (min 1, £316).
  - P11: 18–19 Nov (min 2, £159 / £174).
  - P13: 17 Nov (£193), 27 Nov (£333) and 1 Dec (£314), all min 1. The 1 Dec setting is intentional per policy.
  - P05: 9 Nov (min 1, £1,403) and 16–17 Nov (min 2).
  - P04: 2 Dec (settled by policy).

### Gaps to fill (open nights next 30, Smoobu 5 Nov)
- **P06 8–11 Nov** (min 2): **9 Nov is at £2** (see above). 8 Nov is £200, then £241 and £255.
- **P08 5–7 Nov** (the last nights before the 13 Nov handback): tonight £159, then £175 and £175, min 2.
- **P09 10–12 Nov** (before the 26 Nov handback): £113 / £122 / £129, min 2. These are Smoobu rates; PriceLabs is NOT AVAILABLE.
- **P11:** 10–13 Nov (4 n), 18–19 Nov, 22–25 Nov (4 n), 29 Nov–4 Dec (6 n), all min 2.
- **P12:** 12–13 Nov, 17–20 Nov (4 n), 26 Nov, 30 Nov–3 Dec (4 n). 4 Nov lapsed unsold.
- **P20:** 6–9 Nov (4 n, min 3), 13–17 Nov (5 n), 20–24 Nov (5 n, min 3).
- **P04:** 9–13 Nov (5 n) and 18–24 Nov (7 n), both min 3.
- **P13:** 8–12 Nov (5 n, min 2), 17 Nov, 27 Nov, 1 Dec.
- **P05:** 9 Nov, 16–17 Nov, 29 Nov–2 Dec (4 n, min 3).
- **P14:** all nights (special setup, numbers only).
- **P01 and P10:** no open nights before their gap block / handback.

Data gaps:
- **PriceLabs prices for P01, P06, P09 and P10:** NOT AVAILABLE (LISTING_NO_DATA). Smoobu rates were used instead. The cause of P06 9 Nov at £2 in Smoobu is NOT KNOWN.
- **Pace vs STLY:** UNKNOWN for every unit except P12, because there is no Smoobu history in the STLY windows. P03, P04 and P15–P19 have no history at all. STLY also excludes bookings that were later cancelled.
- **Last 30 / last 365:** UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped).
- **Market:**
  - `market.csv`, `comps.csv` and `channel_checks.csv` are not in `data/snapshots/2026-11-05/` (kpi_pack `missing`: empty), so ARI and RGI are UNKNOWN.
  - Market occupancy comes from `pl_kpis.csv` via kpi_pack.
  - This section added no rows to those files.
- **PriceLabs `prices.csv` 5 Nov:** starts 6 Nov and predates the 06:48 P12 booking; tonight came from Smoobu.
- **P12 4–7 Dec:** the price at booking is inferred only from the 01:25Z refresh, not a booking-time snapshot. The price at booking of the cancelled 3–7 Dec stay is NOT KNOWN.
- **Cancellations:** `reservations.csv` has no cancel time, so Smoobu `modifiedAt` was used. Its timezone and that of created-at are not stated. `reservations.csv` still holds 3 identical rows for the P04 20–23 Nov cancellation, counted once. Retained cancellation fees are UNKNOWN.
- **P12 4–7 Dec commission 18.3%:** whether a Visibility Booster applies to Mile End is not recorded in policy. NOT CHECKED.
- **P20 18–19 Nov block:** the reason is still unrecorded.
- **Barking unsynced Airbnb 1455876748739910219:** NOT CHECKED in this section (not visible in Smoobu).
- **Not re-read here:** `get_customizations`. `get_user_logs` and `get_listing_date_overrides` were read for P06 only.

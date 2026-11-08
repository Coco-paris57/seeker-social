## Occupancy & performance

**Portfolio, last 30 nights (9 Oct–7 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** 258 n, revenue £44,531.25, occupancy 66.2%, ADR £172.60, RevPAR £114.18. Source: `reports/2026-11-08/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice, so room only with cleaning excluded. Yesterday (8 Oct–6 Nov) it was 259 n / 66.4% / £173.08 / £114.94.
- **Last 365 nights (8 Nov 2025–7 Nov 2026):** 2,168 n, £399,161.03, occupancy 45.7%, ADR £184.11, RevPAR £84.12 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.
- Left out rather than counted as zero: P03 (not in Smoobu), P04 (null in kpi_pack; in Smoobu since 20 Oct) and P15–P19 (not mapped).

**Booked next 30 nights (8 Nov–7 Dec): 169 of 279 non-blocked nights = 60.6%.** Yesterday it was 170/285 = 59.6%.
- **Source:** live Smoobu GET `/api/reservations` (896 records incl. cancellations and blocks) and `/api/rates`, both pulled 8 Nov 07:18Z. Guest fields were dropped before saving to scratch. The two endpoints agree on every unit-night for the next 60 nights (0 mismatches; P13 read as one calendar).
- **Excluded:** P02, P03 and P07 (blocked on purpose), and every night after a handback.
- **Blocked nights excluded:**
  - P01: 8 (30 Nov–7 Dec handback gap block)
  - P06: 16 (22 Nov onward, policy block)
  - P20: 2 (18–19 Nov)
  - **P09: 1, 11 Nov.** This is a new 1-night "Blocked channel" block, Smoobu 162726554, created 7 Nov 18:37 (Smoobu time). Reason: NOT KNOWN. Counted as inventory, P09 would read 17/19 = 89.5%.

**Booked next 60 nights (8 Nov–6 Jan): 237 of 468 = 50.6%.** Yesterday it was 231/475 = 48.6%. The gain comes from:
- P20 6–14 Dec (+8 n)
- P13 7–10 Dec (+3 n)
- P09 8–10 Nov (+3 n inside the window)

**kpi_pack forward occupancy vs Smoobu:** the kpi_pack `pace_30` on-the-books nights match the Smoobu count for every unit today (P01 22, P05 22, P06 7, P08 6, P09 17, P10 11, P11 14, P12 18, P13 22, P20 15). So no Smoobu-cancelled nights are being counted as booked. The one difference is P09 11 Nov:
- The PriceLabs 8 Nov raw `prices_3318172.json` shows 11 Nov as open (user_price 120, status blank).
- PriceLabs last refreshed P09 at 7 Nov 12:32Z, which is before the 18:37 block.

**Open tonight, 8 Nov (Smoobu rates 07:18Z):**
- P06 £219, min 2
- P13 £170, min 2
- P20 £220, min 2
- P14 (special setup)

Every other managed unit is booked or blocked.

### Did the last nights sell?
- **P08 7 Nov: NOT sold** (no reservation covers it). Its last open night before the 13 Nov handback lapsed.
  - Reyhan opened it to min 1 on 7 Nov. `get_user_logs` 3318167 shows four DSOs in 30 seconds: 12:31:20Z +25% min 1, 12:31:31Z +35%, 12:31:39Z +55%, and 12:31:48Z **+100% min 1**.
  - `get_listing_date_overrides` confirms 7 Nov is +100% / min 1 (updated 12:31:48Z). Smoobu rates show 7 Nov at **£417, min 1**; yesterday at 07:19Z it was £225, min 2.
  - So the night was sellable as a 1-night stay from about 12:32Z, at £417. P08 now has 0 open nights before handback: 8–13 Nov is booked, 6/6.
- **P09 7 Nov: SOLD.** Airbnb booking 162720486 covers 7–11 Nov (4 n), made 7 Nov 13:23 with same-day arrival. Room £362.69 (`reservations.csv` 8 Nov).
- **P09 6 Nov: NOT sold** (lapsed).

### Booked vs market, next 30 / next 60
Booked figures are Smoobu truth. Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs, from 9 Nov) |
|---|---|---|---|---|---|
| P01 | 100% (22/22 non-blocked) | 36% | 100% (25/25 to handback 20 Dec) | 30% | 72.4% (counts blocks) |
| P04 | 50.0% (15/30) | 24% | 46.7% (28/60) | 21% | 48.3% |
| P05 | 73.3% (22/30) | 43% | 63.3% (38/60) | 40% | 72.4% |
| P06 | 50.0% of non-blocked (7/14; 16 blocked by policy) | 49% | 7/14 (46 blocked) | 42% | 24.1% (counts blocks) |
| P08 | 100% (6/6 to handback 13 Nov) | 51% | same | 44% | 100% |
| P09 | 94.4% (17/18 non-blocked to handback 26 Nov) | 36% | same | 31% | 88.9% (11 Nov read as open) |
| P10 | 100% (11/11 to handback 18 Nov) | 30% | same | 25% | 100% |
| P11 | 46.7% (14/30) | 48% | 43.3% (26/60) | 39% | 44.8% |
| P12 | 60.0% (18/30) | 42% | 55.6% (20/36 to handback 13 Dec) | 34% | 58.6% |
| P13 (one flat, both Smoobu ids) | 73.3% (22/30) | 44% | 51.7% (31/60) | 39% | 75.9% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 38% | 0% |
| P20 | 53.6% (15/28 non-blocked) | 38% | 48.3% (28/58) | 31% | 51.7% |

### 7-day pickup, net of cancellations (bookings made 2–8 Nov to 07:18Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. Room £ is Smoobu basePrice, which matches `reservations.csv` 8 Nov. No imported past stays fall in the window. Nothing was made or cancelled between yesterday's pull and 07:18Z today except the four 7 Nov items below.

**Totals:**
- **Gross made:** 12 bookings / 46 n / £8,843.45. Confirmed only: 10 / 39 n / £7,439.04.
- **Cancelled in the window:** 4 / 20 n / £3,337.45. These are the same four as yesterday: P09 1–10 Nov, P12 3–7 Dec, P11 12–14 Dec (made and cancelled), and P13 20–25 Dec (made and cancelled).
- **Net: +26 n / +£5,506.00.** Yesterday (1–7 Nov) it was +20 n / +£5,417.77. The window lost P05 29 Jan–1 Feb (made 1 Nov) and gained the three 7 Nov bookings.

**Bookings made 7 Nov:**

| Ref | Booking | Channel | Smoobu id | Nights | Room £ | Lead time | Made |
|---|---|---|---|---|---|---|---|
| P09 | 7–11 Nov | Airbnb | 162720486 | 4 | £362.69 | 0 d | 13:23 |
| P20 | 6–14 Dec | Airbnb | 162719002 | 8 | £1,494.25 | 29 d | 12:03 |
| P13 | 7–10 Dec | Booking.com | 162720431, **on listing 3064856** | 3 | £485.20 | 30 d | 13:20 |

The channel section owns ratios and commission.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P20 | 3 / 18 / £3,432.25 (10–13 Nov £510.00; 19–26 Dec £1,428.00; **6–14 Dec £1,494.25**) | — | **+18 / +£3,432.25** |
| P06 | 1 / 4 / £856.79 (18–22 Nov) | — | +4 / +£856.79 |
| P11 | 3 / 7 / £1,597.19 (incl. 12–14 Dec made and cancelled) | 2 / £486.68 | +5 / +£1,110.51 |
| P13 | 2 / 8 / £1,402.93 (**7–10 Dec £485.20**; 20–25 Dec made and cancelled) | 5 / £917.73 | **+3 / +£485.20** |
| P12 | 2 / 5 / £1,191.60 | 3–7 Dec 4 / £1,072.44 | +1 / +£119.16 |
| P09 | 1 / 4 / £362.69 (**7–11 Nov**) | 1–10 Nov 9 / £860.60 | **−5 / −£497.91** (was −9 / −£860.60) |
| P01, P02, P04, P05, P07, P08, P10, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` is gross and ignores cancellations. Its values match the "Made" column for P06, P09, P13 (confirmed only), P11 (confirmed only), P12 and P20.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 8 Nov; cancelled bookings excluded on both sides)
| P12 measure | 7 Nov | 8 Nov |
|---|---|---|
| Pace30 (stays 8 Nov–7 Dec) | −8 n / −£866.45 / −19.7% | **18 n / £3,407.83 vs 27 n / £4,511.35 = −9 n / −£1,103.52 / −24.5%** |
| To handback (stays 8 Nov–13 Dec) | −10 n / −£1,225.64 / −23.2% | 20 n / £3,921.64 vs 30 n / £5,105.35 = **−10 n / −£1,183.71 / −23.2%** |
| Pace90 (stays 8 Nov–5 Feb; nothing after 13 Dec is inventory) | −22 n / −50.7% | 20 n / £3,921.64 vs 42 n / £8,058.05 = −22 n / −£4,136.41 / −51.3% |

- The "to handback" row was recomputed with `rm.metrics.on_the_books` on `reservations.csv` 8 Nov.
- **Every other unit: pace UNKNOWN.** Their first Smoobu arrival is after the STLY as-of date of 8 Nov 2025 (`reservations.csv`: P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). kpi_pack STLY = 0 here means missing history, not zero demand.
- P02 has STLY 5 n / £453.88 (pace30) but is blocked on purpose (policy), so it is not assessed.
- **On the books, stays 8 Nov–7 Dec (kpi_pack `pace_30`; same as Smoobu):**
  - P01 22 n / £3,346.86
  - P05 22 / £10,896.30
  - P06 7 / £1,397.79
  - P08 6 / £776.46
  - P09 17 / £1,757.73
  - P10 11 / £1,165.60
  - P11 14 / £2,977.32
  - P13 22 / £3,341.83
  - P20 15 / £2,626.21
  - P04: UNKNOWN in the pack

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Room £ is Smoobu basePrice. Recomputed in full from the 8 Nov 07:18Z pull; it reproduces yesterday's +7 n / +£2,655.44 before today's change.

**Raised group (P01, P05, P06, P09, P11, P12): +11 n / +£3,018.13 incl. P06 reopened nights.** Yesterday it was +7 / +£2,655.44.
- **Excluding P06 18–22 Nov (nights reopened 5 Nov by the policy-block change): +7 n / +£2,161.34 like-for-like.** Yesterday it was +3 / +£1,798.65.
- **The whole change is P09 7–11 Nov (+4 n / +£362.69).** Those nights were freed by the pre-rise 1–10 Nov booking, cancelled 5 Nov. That cancellation is already netted in this measure (−9 n / −£860.60), so the rebooking counts on the same basis.
- Made: 21 / 70 n / £14,725.48. Cancelled: 9 / 59 n / £11,707.35.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 |
| P05 | 2 / 6 / £1,953.04 | — | +6 / +£1,953.04 |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov reopened, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | **−3 / −£244.70** (was −7 / −£607.39) |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | 5 / 26 / £5,672.84 | +6 / +£741.60 |

**Comparison groups:**
- Unraised (P02, P08, P10, P14, P20): +44 n / +£7,640.04. Yesterday +36 / +£6,145.79; the change is P20 6–14 Dec.
- P13: +19 n / +£3,394.96. Yesterday +16 / +£2,909.76; the change is 7–10 Dec.

**Caveats (unchanged):**
- The 24 Oct Booking.com markup cut, Booking.com promotions, Reyhan's overrides and the P06 block change cannot be separated from the rise.
- The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 9 Oct–7 Nov.
- **Fwd occ30:** Smoobu, 8 Nov–7 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 8 Nov–7 Dec.
- **Pickup 7d:** made 2–8 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £159.60 | £159.60 | 100% to gap block (36%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 63.3% | £106.20 | £67.26 | all blocked (49%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null (Smoobu since 20 Oct) | UNKNOWN | UNKNOWN | 50.0% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 73.3% | £369.83 | £271.21 | 73.3% (43%) | UNKNOWN: no STLY | 0 / £0 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 86.7% | £204.33 | £177.09 | 50.0% of 14 non-blocked (49%) | UNKNOWN | +4 / +£856.79 | **Soft** (fwd30 < 60%; blocked nights excluded per policy) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (25%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £152.66 | £132.30 | 100% to 13 Nov (51%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback) |
| P09 | Greenwich | 56.7% | £124.56 | £70.58 | 94.4% to 26 Nov (36%) | UNKNOWN: no STLY | −5 / −£497.91 | **Compressed** (≥ 85%; was Unclassifiable) |
| P10 | Ealing / Hanger Lane | 90.0% | £109.05 | £98.15 | 100% to 18 Nov (30%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £172.14 | £131.97 | 46.7% (48%) | UNKNOWN: no STLY | +5 / +£1,110.51 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £180.25 | £138.19 | 60.0% (42%) | **−9 n / −£1,103.52 / −24.5%** | +1 / +£119.16 | **Soft** (pace) |
| P13 | Shepherd's Bush (one flat) | 76.7% | £151.51 | £116.15 | 73.3% (44%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 73.3% | £166.17* | £121.86* | 53.6% of non-blocked (38%) | UNKNOWN: no STLY | +18 / +£3,432.25 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 4: P01, P08, P09, P10.
- On track 0.
- Soft 6: P04, P06, P11, P12, P14, P20.
- Unclassifiable 7: P05, P13, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- **Change from 7 Nov:** P09 moved from Unclassifiable to Compressed because of the 7–11 Nov booking and the 11 Nov block.

**Last 365 nights** (kpi_pack `last365`, 8 Nov 2025–7 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 40.5% / £176.64 / £71.62 / £26,142.67
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 58.4% / £372.22 / £217.21 / £79,283.27
- P06 36.7% / £236.49 / £86.82 / £31,689.00
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.3% / £174.19 / £70.15 / £25,606.17
- P09 39.5% / £115.44 / £45.54 / £16,623.51
- P10 39.7% / £114.01 / £45.29 / £16,530.95
- P11 78.6% / £173.94 / £136.77 / £49,920.72
- P12 81.4% / £191.95 / £156.19 / £57,008.22
- P13 78.9% / £158.19 / £124.82 / £45,559.65
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
- P09 25 / 18 / 5: Airbnb 57.3%, Booking.com 41.2%, Direct 1.5%
- P10 22 / 12 / 5: Airbnb 69.3%, Booking.com 27.6%, Website 3.1%
- P11 72 / 28 / 4: Booking.com 54.0%, Airbnb 44.1%, Agoda 1.9%
- P12 83 / 31 / 4: Booking.com 89.8%, Airbnb 10.2%
- P13 85 / 21 / 3: Booking.com 52.0%, Airbnb 47.2%, Agoda 0.9%
- P14 1 / 57 / 10: Airbnb 100%
- P20 8 / 8 / 7: Airbnb 100%

### Orphan gaps (Smoobu `/api/rates` 8 Nov 07:18Z, next 60; P13 is one calendar; handbacks respected)
An orphan here is an open night that no stay can cover, given the min stay on each arrival night and the bounding bookings, blocks or handback. kpi_pack `gaps` is empty for every unit.

| Ref | Night | Smoobu price / min | Why it cannot sell |
|---|---|---|---|
| **P09** | **12 Nov** | £128 / 2 | **New today.** 11 Nov is a 1-night Smoobu "Blocked channel" block (162726554, created 7 Nov 18:37, reason NOT KNOWN). The 13–15 Nov Airbnb stay starts the next day. The PriceLabs DSO for 12 Nov is min 2 (updated 5 Nov 10:56Z). PriceLabs 8 Nov raw: price 141, user_price 128. |
| **P20** | **5 Dec** | £279 / 3 | Created by the new 6–14 Dec stay; the 25 Nov–5 Dec stay checks out 5 Dec. PriceLabs 8 Nov raw `prices_3547481` 5 Dec: price 279, user_price 332, min 3, **unbookable = 1**, which confirms the 1-night gap. |

**Checked and not orphans:**
- **P12 13 Dec: no longer an orphan.** The PriceLabs DSO was changed 7 Nov 12:27:54Z to **+15% / min 1** (`get_listing_date_overrides` 2699998). Smoobu shows £369, min 1, so it is sellable as a 1-night stay before the handback. PriceLabs 8 Nov raw: price 369, user_price 273.
- **P13 around 7–10 Dec:** 2–7 Dec and 7–10 Dec are back-to-back, so no gap. 10–26 Dec is a 17-night open run at min 2 (21–26 Dec min 3), and 27 Dec is booked.
- **P08:** no open nights left (7 Nov lapsed; see above).
- **P20, other runs:** 8–9 Nov (2 n), 13–17 Nov (5 n), 20–24 Nov (5 n) and 14–18 Dec (5 n) are all at or above their min stay. 26 Dec–6 Jan is 12 n at min 3–6.
- **P06** 8–11 Nov (4 n) and 15–17 Nov (3 n), min 2. **P11** 18–19 Nov (2 n, min 2) and 23–25 Dec (3 n, min 2).

**Single nights at min 1** (bookable, not orphans):
- P05: 9 Nov (£1,378) and 29 Dec (£1,346)
- P12: 26 Nov (£323) and 13 Dec (£369)
- P13: 17 Nov (£207/£207), 27 Nov (£332/£272) and 1 Dec (£309/£253, intentional per policy)
- P04: 2 Dec (£498, policy)

### Gaps to fill (open nights next 30, 8 Nov–7 Dec, Smoobu 8 Nov 07:18Z)
- **P09 12 Nov** (orphan). It is the only open night before the 26 Nov handback.
- **P20 5 Dec** (orphan). Also open: 8–9 Nov (£220 / £223), 13–17 Nov (£224–285) and 20–24 Nov (£247–333), all min 2.
- **P06:** 8–11 Nov (£219 / £223 / £228 / £236) and 15–17 Nov (£265 / £264 / £270), min 2.
- **P04** (min 3): 9–13 Nov (£148–156), 18–24 Nov (£156–206) and 6–7 Dec (start of a 14-night run, £193–216). Also 2 Dec (policy).
- **P05:** 9 Nov (min 1), 16–17 Nov (£371 / £385, min 2), 29 Nov–2 Dec (£513–527, min 3) and 7 Dec (£466, with 8 Dec, min 2).
- **P11** (min 2): 10–13 Nov (£187–254), 18–19 Nov (£158 / £180), 22–25 Nov (£217–225) and 29 Nov–4 Dec (£207–298).
- **P12:** 12–13 Nov (£223 / £257), 17–20 Nov (£254–296), 26 Nov (min 1), 30 Nov–3 Dec (£274–299) and 7 Dec (start of 7–10 Dec, £286–308), min 2.
- **P13:** 8–12 Nov (£169–181, min 2), plus 17 Nov, 27 Nov and 1 Dec (min 1).
- **P14:** all nights (special setup, numbers only).
- **P01, P08, P10:** none (sold out to the block or the handback).

Data gaps:
- STLY history for every unit except P12. Pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- Reason for the P09 11 Nov "Blocked channel" block (Smoobu 162726554, 7 Nov 18:37): NOT KNOWN. It creates the 12 Nov orphan.
- Smoobu `created-at` and `modifiedAt` time zone: not stated by the API. Assumed to be account local time; not verified.
- P09 retained payout after the 1–10 Nov cancellation: NOT KNOWN; needs Airbnb's reservation or transaction page.
- P03: not in Smoobu. P04: last-30 and last-365 null in kpi_pack (history starts 20 Oct). P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 8 Nov kpi_pack was built (kpi_pack `missing`): no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu.
- `reservations.csv` `total_gbp` excludes cleaning, so all revenue is room only.

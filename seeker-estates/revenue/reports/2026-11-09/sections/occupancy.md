## Occupancy & performance

**Portfolio, last 30 nights (10 Oct–8 Nov 2026), units with Smoobu history (P01, P02, P05–P14, P20):** 255 n, revenue £43,772.01, occupancy 65.4%, ADR £171.65, RevPAR £112.24. Source: `reports/2026-11-09/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice, so room only with cleaning excluded. Yesterday (9 Oct–7 Nov) it was 258 n / 66.2% / £172.60 / £114.18.
- **Last 365 nights (9 Nov 2025–8 Nov 2026):** 2,174 n, £400,041.92, occupancy 45.8%, ADR £184.01, RevPAR £84.31 (kpi_pack `portfolio_last365`). Most Smoobu history starts in 2026, so this understates a full year.
- Left out rather than counted as zero: P03 (not in Smoobu), P04 (null in kpi_pack) and P15–P19 (not mapped).

**Booked next 30 nights (9 Nov–8 Dec): 163 of 274 non-blocked nights = 59.5%.** Yesterday (8 Nov–7 Dec) it was 169/279 = 60.6%.
- **Source:** live Smoobu GET `/api/reservations` (897 records incl. cancellations and blocks) and `/api/rates`, both pulled 9 Nov 07:19:35Z. Guest fields were dropped before saving to scratch. The two endpoints agree on every unit-night for the next 60 nights (0 mismatches; P13 read as one calendar).
- **Excluded:** P02, P03 and P07 (blocked on purpose), and every night after a handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec).
- **Blocked nights excluded:**
  - P01: 9 (30 Nov–8 Dec, handback gap block)
  - P06: 17 (22 Nov onward, policy block)
  - P20: 2 (18–19 Nov, delivery block per policy)
  - P09: 1 (11 Nov, Smoobu "Blocked channel" 162726554; reason still NOT KNOWN)
- **Why it fell:** 8 Nov dropped out of the window as a sold night or a lapsed one, and 9 Dec came in. The new P05 15–21 Dec stay is outside next 30.

**Booked next 60 nights (9 Nov–7 Jan): 235 of 462 = 50.9%.** Yesterday (8 Nov–6 Jan) it was 237/468 = 50.6%. The new P05 15–21 Dec stay adds 6 n.

**kpi_pack forward occupancy vs Smoobu:** the kpi_pack `pace_30` on-the-books nights match Smoobu for every unit (P01 21, P05 21, P06 7, P08 5, P09 16, P10 10, P11 13, P12 17, P13 23, P20 16). So no Smoobu-cancelled nights are being counted as booked. The PriceLabs 9 Nov raw now shows P09 11 Nov as `Blocked` (`prices_3318172.json`, refreshed 8 Nov 07:56Z).

### Tonight (9 Nov) and last night (8 Nov)
- **P05 9 Nov: NOT sold as of 07:19Z** (10th check). There is no reservation, and Smoobu `/api/rates` shows it open at **£1,403, min 1**. Yesterday at 07:18Z it was £1,378, min 1.
  - The last Airbnb card on record (`data/snapshots/2026-11-08/channel_checks.csv`, channel agent 8 Nov 07:20Z) showed 1 night × £511.80, Special offer −£63.36, total £448.44. That is £253.44 room after the £195 cleaning fee.
  - Today's Airbnb card is NOT CHECKED by me (channel section). Whether the £253.44 Special offer was fixed: NOT CHECKED.
  - `get_user_logs` shows no PriceLabs change on P05 since 8 Nov 00:00.
- **Also open tonight** (Smoobu 9 Nov 07:19Z):
  - P04 £143, min 3 (in-residence guest left 9 Nov; 9–13 Nov open)
  - P06 £211, min 2
  - P13 £170 / £160, min 2
  - P20 £200, min 2
  - P14 £500 (special setup)
- **8 Nov lapsed unsold on P06, P13 and P20.** Smoobu shows 8 Nov open with no reservation on all three.

### Booked vs market, next 30 / next 60
Booked figures are Smoobu truth (9 Nov 07:19Z). Market figures are kpi_pack `market_occ_30/60`.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 | kpi_pack fwd30 (PriceLabs) |
|---|---|---|---|---|---|
| P01 | 100% (21/21 non-blocked) | 35% | 100% (24/24 to handback 20 Dec) | 29% | 69% (counts blocks) |
| P04 | 46.7% (14/30) | 24% | 45.0% (27/60) | 20% | 48.3% |
| P05 | 70.0% (21/30) | 43% | 71.7% (43/60) | 40% | 72.4% |
| P06 | 53.8% of non-blocked (7/13; 17 blocked by policy) | 49% | 7/13 (47 blocked) | 42% | 24.1% (58.2% ex blocks) |
| P08 | 100% (5/5 to handback 13 Nov) | 51% | same | 44% | 100% |
| P09 | 94.1% (16/17 non-blocked to handback 26 Nov) | 37% | same | 32% | 88.2% (93.7% ex blocks) |
| P10 | 100% (10/10 to handback 18 Nov) | 31% | same | 25% | 100% |
| P11 | 43.3% (13/30) | 48% | 41.7% (25/60) | 39% | 41.4% |
| P12 | 56.7% (17/30) | 42% | 54.3% (19/35 to handback 13 Dec) | 35% | 55.2% |
| P13 (one flat, both Smoobu ids) | 76.7% (23/30) | 44% | 51.7% (31/60) | 39% | 79.3% |
| P14 (special setup, numbers only) | 0% (0/30) | 46% | 0% (0/60) | 38% | 0% |
| P20 | 57.1% (16/28 non-blocked) | 38% | 48.3% (28/58) | 31% | 55.2% (59.3% ex blocks) |

### 7-day pickup, net of cancellations (bookings made 3–9 Nov to 07:19Z)
**Sources:** Smoobu `created-at`, and `modifiedAt` for cancellations. Room £ is Smoobu basePrice, which matches `reservations.csv` 9 Nov. No imported past stays fall in the window.

**Overnight change** (`reservations.csv` 9 Nov vs 8 Nov, full diff): one new row and nothing else.
- **P05 Airbnb 15–21 Dec, 6 n, room £2,962.17** (cleaning £195, commission £489.36). Smoobu 162753757, made 8 Nov 21:42 Smoobu time, 37 d lead.
- No cancellations.

**Totals:**
- **Gross made:** 11 bookings / 47 n / £10,865.51. Confirmed only: 9 / 40 n / £9,461.10.
- **Cancelled in the window:** 4 / 20 n / £3,337.45. These are P09 1–10 Nov, P12 3–7 Dec, P11 12–14 Dec (made and cancelled) and P13 20–25 Dec (made and cancelled).
- **Net: +27 n / +£7,528.06.** Yesterday (2–8 Nov) it was +26 n / +£5,506.00. The window lost P20 10–13 Nov (made 2 Nov, £510.00) and gained P05 15–21 Dec.

| Ref | Made (bk / n / £) | Cancelled in window (n / £) | Net n / £ |
|---|---|---|---|
| P05 | 1 / 6 / £2,962.17 (**15–21 Dec**) | — | **+6 / +£2,962.17** |
| P20 | 2 / 15 / £2,922.25 (6–14 Dec £1,494.25; 19–26 Dec £1,428.00) | — | +15 / +£2,922.25 |
| P06 | 1 / 4 / £856.79 (18–22 Nov) | — | +4 / +£856.79 |
| P11 | 2 / 5 / £1,167.08 (26–29 Nov £680.40; 12–14 Dec made and cancelled) | 2 / £486.68 | +3 / +£680.40 |
| P13 | 2 / 8 / £1,402.93 (7–10 Dec £485.20; 20–25 Dec made and cancelled) | 5 / £917.73 | +3 / +£485.20 |
| P12 | 2 / 5 / £1,191.60 | 3–7 Dec 4 / £1,072.44 | +1 / +£119.16 |
| P09 | 1 / 4 / £362.69 (7–11 Nov) | 1–10 Nov 9 / £860.60 | −5 / −£497.91 |
| P01, P02, P04, P07, P08, P10, P14 | 0 | — | 0 |

kpi_pack `pickup_7d` is gross and ignores cancellations. Its values match the "Made" column for P05, P06, P09, P12, P20, and for P11 and P13 counting confirmed bookings only.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`, stays from 9 Nov; cancelled bookings excluded on both sides)
| P12 measure | 8 Nov | 9 Nov |
|---|---|---|
| Pace30 (stays 9 Nov–8 Dec) | −9 n / −£1,103.52 / −24.5% | **17 n / £3,274.55 vs 26 n / £4,336.15 = −9 n / −£1,061.60 / −24.5%** |
| To handback (stays 9 Nov–13 Dec) | −10 n / −£1,183.71 / −23.2% | 19 n / £3,788.36 vs 29 n / £4,930.15 = **−10 n / −£1,141.79 / −23.2%** |
| Pace90 (stays 9 Nov–6 Feb; nothing after 13 Dec is inventory) | −22 n / −51.3% | 19 n / £3,788.36 vs 41 n / £7,882.85 = −22 n / −£4,094.49 / −51.9% |

- The "to handback" row was recomputed with `rm.metrics.on_the_books` on `reservations.csv` 9 Nov.
- **Every other unit: pace UNKNOWN.** Their first Smoobu arrival is after the STLY as-of date of 9 Nov 2025 (`reservations.csv`: P11 11 Dec 2025, P13 14 Dec 2025, the rest in 2026). kpi_pack STLY = 0 here means missing history, not zero demand.
- P02 has STLY 5 n / £453.88 (pace30) but is blocked on purpose (policy), so it is not assessed.
- **On the books, stays 9 Nov–8 Dec (kpi_pack `pace_30`; same as Smoobu):**
  - P01 21 n / £3,194.73
  - P05 21 / £10,598.46
  - P06 7 / £1,397.79
  - P08 5 / £647.05
  - P09 16 / £1,667.06
  - P10 10 / £1,059.64
  - P11 13 / £2,830.53
  - P13 23 / £3,503.57
  - P20 16 / £2,812.99
  - P04: UNKNOWN in the pack
- **P05 pace90 on the books (stays 9 Nov–6 Feb):** 46 n / £24,069.80 (kpi_pack). It includes the new 15–21 Dec stay.

### 18 Oct base rises: running effect (corrected method only)
**Method:** every booking made from 19 Oct (Smoobu `created-at`, including bookings later cancelled), minus every cancellation after 18 Oct 20:33 (`modifiedAt`). Room £ is Smoobu basePrice. Recomputed in full from the 9 Nov 07:19Z pull; it reproduces yesterday's figures before the P05 booking.

**Raised group (P01, P05, P06, P09, P11, P12): +17 n / +£5,980.30 incl. P06 reopened nights.** Yesterday it was +11 / +£3,018.13.
- **Excluding P06 18–22 Nov (nights reopened 5 Nov by the policy-block change): +13 n / +£5,123.51 like-for-like.** Yesterday it was +7 / +£2,161.34.
- **The whole change is P05 15–21 Dec (+6 n / +£2,962.17).** P05 is now +12 n / +£4,915.21 since the rise, and is the largest contributor in the group.
- Made: 22 / 76 n / £17,687.65. Cancelled: 9 / 59 n / £11,707.35.

| Raised ref | Made since rise (bk / n / £) | Cancelled since rise (bk / n / £) | Net |
|---|---|---|---|
| P01 | 1 / 3 / £720.90 | — | +3 / +£720.90 |
| P05 | 3 / 12 / £4,915.21 | — | **+12 / +£4,915.21** (was +6 / +£1,953.04) |
| P06 | 3 / 10 / £2,202.56 | — | +10 / +£2,202.56 (incl. 18–22 Nov reopened, +4 / +£856.79) |
| P09 | 2 / 6 / £615.90 | 1 / 9 / £860.60 (booked before the rise) | −3 / −£244.70 |
| P11 | 5 / 13 / £2,818.64 | 3 / 24 / £5,173.91 | −11 / −£2,355.27 |
| P12 | 8 / 32 / £6,414.44 | 5 / 26 / £5,672.84 | +6 / +£741.60 |

**Comparison groups (unchanged from yesterday):**
- Unraised (P02, P08, P10, P14, P20): +44 n / +£7,640.04.
- P13: +19 n / +£3,394.96.
- P04: +46 n / +£1,625.79 (made 14 / 61 n / £2,909.25; cancelled 5 / 15 n / £1,283.46).

**What the P05 booking paid against the price:** room £2,962.17 / 6 n = £493.70 a night.
- That is 0.801× the Smoobu rates for 15–20 Dec at 8 Nov 07:18Z (£3,700) and 0.810× the PriceLabs 9 Nov raw `user_price` (£3,657; `prices_3166592.json`, refreshed 8 Nov 12:39:52Z, before the booking).
- At 6 nights, no policy stay discount applies (weekly starts at 7).
- The channel section owns the explanation (Airbnb layer, rules).

**Caveats (unchanged):**
- The 24 Oct Booking.com markup cut, Booking.com promotions, Reyhan's overrides and the P06 block change cannot be separated from the rise.
- The sample is small: 1–8 bookings per property.

### Per-property table
**Column sources:**
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30`, 10 Oct–8 Nov.
- **Fwd occ30:** Smoobu, 9 Nov–8 Dec, handback-aware, with market in brackets.
- **Pace30:** stays 9 Nov–8 Dec.
- **Pickup 7d:** made 3–9 Nov, net of cancellations.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d net (n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £159.26 | £159.26 | 100% to gap block (35%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 60.0% | £103.74 | £62.24 | all blocked (49%) | not assessed (policy block) | 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | closed (53%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: kpi_pack null | UNKNOWN | UNKNOWN | 46.7% (24%) | UNKNOWN: no history | 0 / £0 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 73.3% | £366.39 | £268.69 | 70.0% (43%) | UNKNOWN: no STLY | +6 / +£2,962.17 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 83.3% | £204.84 | £170.70 | 53.8% of 13 non-blocked (49%) | UNKNOWN | +4 / +£856.79 | **Soft** (fwd30 < 60%; blocked nights excluded per policy) |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 n | £0.00 | all blocked (25%) | UNKNOWN | 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 86.7% | £151.12 | £130.97 | 100% to 13 Nov (51%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** (sold out to handback) |
| P09 | Greenwich | 56.7% | £122.71 | £69.54 | 94.1% to 26 Nov (37%) | UNKNOWN: no STLY | −5 / −£497.91 | **Compressed** (≥ 85%) |
| P10 | Ealing / Hanger Lane | 90.0% | £109.79 | £98.81 | 100% to 18 Nov (31%) | UNKNOWN: no STLY | 0 / £0 | **Compressed** |
| P11 | Camden | 76.7% | £170.54 | £130.75 | 43.3% (48%) | UNKNOWN: no STLY | +3 / +£680.40 | **Soft** (fwd30 < 60%) |
| P12 | Mile End | 76.7% | £177.29 | £135.92 | 56.7% (42%) | **−9 n / −£1,061.60 / −24.5%** | +1 / +£119.16 | **Soft** (pace and fwd30) |
| P13 | Shepherd's Bush (one flat) | 73.3% | £150.46 | £110.33 | 76.7% (44%) | UNKNOWN: no STLY | +3 / +£485.20 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 n | £0.00 | 0% (46%) | UNKNOWN: no STLY | 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 73.3% | £166.17* | £121.86* | 57.1% of non-blocked (38%) | UNKNOWN: no STLY | +15 / +£2,922.25 | **Soft** (fwd30 < 60%) |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:**
- Compressed 4: P01, P08, P09, P10.
- On track 0.
- Soft 6: P04, P06, P11, P12, P14, P20.
- Unclassifiable 7: P05, P13, P15–P19.
- Blocked by policy 3: P02, P03, P07.
- Unchanged from 8 Nov.

**Last 365 nights** (kpi_pack `last365`, 9 Nov 2025–8 Nov 2026; occ / ADR / RevPAR / revenue):
- P01 40.8% / £176.48 / £72.04 / £26,294.80
- P02 79.7% / £128.59 / £102.52 / £37,418.99
- P05 58.6% / £371.87 / £218.03 / £79,581.11
- P06 36.7% / £236.49 / £86.82 / £31,689.00
- P07 11.5% / £133.90 / £15.41 / £5,623.70
- P08 40.5% / £173.89 / £70.51 / £25,735.58
- P09 39.7% / £115.27 / £45.79 / £16,714.19
- P10 40.0% / £113.95 / £45.58 / £16,636.91
- P11 78.9% / £173.85 / £137.17 / £50,067.51
- P12 81.4% / £191.81 / £156.07 / £56,966.30
- P13 78.9% / £158.19 / £124.82 / £45,559.65
- P14 2.7% / £409.84 / £11.23 / £4,098.40
- P20 6.0% / £166.17 / £10.02 / £3,655.78 (short history)
- P03, P04, P15–P19: UNKNOWN

**Booking profile** (kpi_pack `booking_profile`: bookings / median lead / median stay / channel revenue share):
- P01 21 / 15 d / 5 n: Airbnb 80.4%, Website 13.0%, Booking.com 6.6%
- P02 71 / 34 / 4: Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%
- P04 4 / 8 / 4: Booking.com 51.1%, Airbnb 48.9%
- **P05 62 / 44 / 4: Airbnb 100%** (was 61 bookings)
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

### Orphan gaps (Smoobu `/api/rates` 9 Nov 07:19Z, next 60; P13 is one calendar; handbacks respected)
An orphan here is an open night that no stay can cover, given the min stay on each arrival night and the bounding bookings, blocks or handback.

| Ref | Night(s) | Smoobu price / min | Why it cannot sell | Confirmation |
|---|---|---|---|---|
| **P05** | **13–14 Dec (2 n)** | £579 / 3; £565 / 3 | **New today.** It sits between the 9–13 Dec stay (157362656) and the new 15–21 Dec stay. | kpi_pack `gaps` lists it: from 13 Dec, 2 n, min 3. PriceLabs 9 Nov raw still shows unbookable 0, because it was refreshed 8 Nov 12:39Z, before the booking. |
| **P05** | **21 Dec (1 n)** | £645 / 2 | **New today.** The 15–21 Dec stay checks out 21 Dec and the 22–29 Dec stay (160454221) arrives the next day. | kpi_pack `gaps`: from 21 Dec, 1 n, min 2. |
| **P09** | **12 Nov** | £126 / 2 | The 11 Nov "Blocked channel" block (162726554, reason NOT KNOWN) sits before it and the 13–15 Nov stay starts the next day. It is the only open night before the 26 Nov handback. | PriceLabs 9 Nov raw `prices_3318172` 12 Nov: user_price 128, min 2, **unbookable 1**. |
| **P20** | **5 Dec** | £281 / 3 | The 25 Nov–5 Dec stay checks out 5 Dec and the 6–14 Dec stay arrives the next day. | PriceLabs 9 Nov raw `prices_3547481` 5 Dec: user_price 281, min 3, **unbookable 1**. |

**Checked and not orphans:**
- **P12 13 Dec:** open at £364, min 1 in Smoobu, so it is sellable as a 1-night stay up to the handback. PriceLabs 9 Nov raw: price 364, user_price 364, min 1 (`prices_2699998`). P12 26 Nov is also min 1 (£317).
- **P05:** 16–17 Nov (2 n, min 2), 29 Nov–2 Dec (4 n, min 3) and 7–8 Dec (2 n, min 2) all fit their min stays. 9 Nov and 29 Dec are min 1 (£1,403 and £1,332).
- **P13:** 17 Nov, 27 Nov and 1 Dec are min 1 (1 Dec is intentional per policy). 10–26 Dec is a 17-night open run.
- **P20:** 9 Nov (1 n left at min 2, tonight), 13–17 Nov (5 n), 20–24 Nov (5 n) and 14–18 Dec (5 n) all fit. 26 Dec–7 Jan is an open run at min 3–6.
- **P11:** 18–19 Nov (2 n, min 2) and 23–25 Dec (3 n, min 2) fit.
- **P04:** 2 Dec min 1 (£498, policy).

### Gaps to fill (open nights next 30, 9 Nov–8 Dec, Smoobu 9 Nov 07:19Z)
- **P09 12 Nov** (orphan).
- **P20 5 Dec** (orphan). Also open: 9 Nov (£200), 13–17 Nov (£221–265) and 20–24 Nov (£235–333), all min 2.
- **P05:** 9 Nov tonight (£1,403, min 1), 16–17 Nov (£372 / £390), 29 Nov–2 Dec (£511–526, min 3) and 7–8 Dec (£464 / £449). Orphans 13–14 Dec and 21 Dec are just outside next 30.
- **P06** (min 2): 9–11 Nov (£211 / £213 / £224) and 15–17 Nov (£249 / £249 / £255).
- **P04** (min 3): 9–13 Nov (£143–154), 18–24 Nov (£154–199) and 6–8 Dec onward (£193–216). Also 2 Dec (policy).
- **P11** (min 2): 10–13 Nov (£170–234), 18–19 Nov (£143 / £161), 22–25 Nov (£195–220), 29 Nov–4 Dec (£202–286) and 8 Dec onward.
- **P12** (min 2 unless noted): 12–13 Nov (£208 / £254), 17–20 Nov (£253–295), 26 Nov (min 1), 30 Nov–3 Dec (£269–300) and 7–10 Dec (£286–310).
- **P13:** 9–12 Nov (£170–181 / £160–171, min 2), plus 17 Nov, 27 Nov and 1 Dec (min 1).
- **P14:** all nights (special setup, numbers only).
- **P01, P08, P10:** none (sold out to the block or the handback).

**PriceLabs changes since 8 Nov:** `get_user_logs`, listing, 8–9 Nov, 8 entries, all Reyhan between 12:38:36Z and 12:41:48Z on 8 Nov:
- P11 10 Nov–18 Dec −5%, min 2 (+ Vrbo copy)
- P13 10–20 Dec −5%, min 2 (3064856 + child 3090701 + Vrbo copy)
- P20 13–17 Nov and 20–24 Nov −5%, min 2
- P04 9–24 Nov −5%, min 3

There is nothing on P05, P09 or P12. The pricelabs section owns the policy checks; for example, P11 covers the darts nights 13–17 Dec, which Smoobu now shows at £193–227.

Data gaps:
- STLY history for every unit except P12. Pace is UNKNOWN for P01, P04–P11, P13, P14 and P20.
- Reason for the P09 11 Nov "Blocked channel" block (Smoobu 162726554): NOT KNOWN. It creates the 12 Nov orphan.
- P05 9 Nov Airbnb card today (whether the £253.44 Special offer is still shown): NOT CHECKED here; the channel section owns it.
- PriceLabs P05 raw (refreshed 8 Nov 12:39:52Z) predates the 15–21 Dec booking, so the PriceLabs view of the 13–14 Dec and 21 Dec orphans is NOT YET REFRESHED.
- Smoobu `created-at` and `modifiedAt` time zone: not stated by the API. Assumed to be account local time; not verified.
- P03: not in Smoobu. P04: last-30 and last-365 null in kpi_pack. P15–P19: not mapped.
- `market.csv`, `comps.csv` and `channel_checks.csv` were empty when the 9 Nov kpi_pack was built (kpi_pack `missing`): no ARI or RGI.
- P20 18–22 Oct revenue was paid separately and is not in Smoobu.
- `reservations.csv` `total_gbp` excludes cleaning, so all revenue is room only.

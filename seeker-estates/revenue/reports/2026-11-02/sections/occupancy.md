## Occupancy & performance

**Portfolio, last 30 nights (3 Oct–1 Nov 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 68.2%, ADR £171.48, RevPAR £116.96, revenue £45,613.67 (266 nights). Source: `reports/2026-11-02/kpi_pack.json` `portfolio_last30`. Revenue is Smoobu basePrice: room only, cleaning not included. Yesterday (2–31 Oct): 69.2% / £172.25 / £119.25 / £46,506.64.
- **Last 365 nights (2 Nov 2025–1 Nov 2026):** 44.9%, ADR £184.10, RevPAR £82.64, revenue £392,135.30 (2,130 n). Source: kpi_pack `portfolio_last365`. Occupancy reads low because the denominator is 365 days and most Smoobu history starts in 2026.
- P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Booked next 30 nights (3 Nov–1 Dec, 29 nights; `prices.csv` 2 Nov starts at 3 Nov). Smoobu confirmed stays are the truth; handback dates respected:** 179 of 293 non-blocked nights = **61.1%** (yesterday 59.7%, 178/298). Units: P01, P04, P05, P06, P08–P14, P20. P02, P03 and P07 are left out because they are blocked on purpose (policy). Blocked nights excluded: P01 2 (30 Nov–1 Dec, handback gap block), P06 17 (policy).
**Booked next 60 nights (3 Nov–31 Dec, 59 nights):** 244 of 488 = **50.0%** (yesterday 48.8%, 241/494). Blocked nights excluded: P01 18 (handback gap block) plus 11 after the 20 Dec handback; P06 47.
- My script reproduces yesterday's 178/298 and 241/494 exactly from the 1 Nov snapshot, so today's change comes from the data, not the method.
- **PriceLabs vs Smoobu:** PriceLabs `prices.csv` still shows **P06 12–14 Nov** and **P12 27–29 Nov** as available, even though both are confirmed Smoobu stays made 1 Nov. Smoobu GET /api/rates (pulled 2 Nov) shows all six nights closed, so they cannot be sold twice. PriceLabs has not picked up the bookings yet: last push P06 and P12 was 1 Nov 09:13Z (`listings.csv`). No night is shown Booked in PriceLabs without a Smoobu stay. kpi_pack `forward_occ_30` (P06 0.276 incl. blocks, P12 0.621) matches the Smoobu count.
- **Tonight (2 Nov) is not in `prices.csv`.** From Smoobu `reservations.csv`: P01, P05, P06, P08, P09, P10 and P20 are booked tonight. P04, P11, P12, P13 and P14 are open (Smoobu `/api/rates` 2 Nov: P11 £176, min 1; P04 £182, min 2; P12 £202, min 2; P13 £122/£148, min 2).

### Booked vs market, next 30 / next 60 (Smoobu truth; market = PriceLabs `pl_kpis.csv` 2 Nov)
Market occupancy for the last 30 nights is UNKNOWN: `pl_kpis.csv` has no past-30 market field, and kpi_pack `missing.market` says market.csv is empty.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (27/27 non-blocked) | 34% | 100% (30/30 non-blocked; 29 handback nights out) | 28% |
| P04 | 58.6% (17/29) (was 55.2%) | 24% | 54.2% (32/59) | 20% |
| P05 | 79.3% (23/29) (was 82.8%) | 40% | 67.8% (40/59) | 38% |
| P06 | 66.7% of non-blocked (8/12; 17 blocked on purpose) (was 46.2%) | 46% | 8/12 non-blocked (47 blocked) | 41% |
| P08 | 72.7% (8/11, up to handback 13 Nov) | 48% | same | 42% |
| P09 | 87.5% (21/24, up to handback 26 Nov) | 36% | same | 31% |
| P10 | 100% (16/16, up to handback 18 Nov) | 28% | same | 23% |
| P11 | 37.9% (11/29) | 46% | 40.7% (24/59) | 39% |
| P12 | 62.1% (18/29) (was 51.7%) | 40% | 53.7% (22/41, up to handback 13 Dec) | 34% |
| P13 (one flat) | 69.0% (20/29) | 41% | 50.8% (30/59) | 36% |
| P14 (special setup, numbers only) | 0% (0/29) | 41% | 0% (0/59) | 38% |
| P20 | 34.5% (10/29) | 37% | 22.0% (13/59) | 30% |

Below market for the next 30: **P11** (37.9% vs 46%) and **P20** (34.5% vs 37%). P14 is at 0%.
- **P05** fell again only because the window moved. 2 Nov (booked) left the window and 2 Dec (open) came in. Its one new booking (29 Jan–1 Feb 2027) is outside the window.
- **P06** and **P12** rose because of the new 1 Nov bookings.

### 7-day pickup (bookings made 27 Oct–2 Nov; 2 Nov partial), imported past stays excluded
Source: `reservations.csv` 2 Nov, using `booked_on` on confirmed rows. **3 new bookings overnight, all made 1 Nov**: P06 12–15 Nov, P12 27–30 Nov and P05 29 Jan–1 Feb 2027. These are the first bookings since 29 Oct. None has been made on 2 Nov so far: Smoobu GET /api/reservations, pulled 2 Nov, has no booking created on 2 Nov.
**Total: 14 bookings, 60 nights, £11,347.61.** No imported past stay is in this window. The P04 import of 26 Oct has left it, and kpi_pack P04 `pickup_7d` (2 / 6 / £748.90) now matches.

**Cancellations 27 Oct–2 Nov.** Cancel time is Smoobu `modifiedAt` from GET /api/reservations, pulled 2 Nov with guest fields dropped. **5 cancellations, 26 nights, £5,425.78 room**, the same 5 as yesterday. **No cancellation since 31 Oct 14:36.** Left out: the P20 20–22 Nov delivery-block removal (30 Oct 18:11), which is not a booking. The two P04 20–23 Nov duplicates (26 Oct) are now outside the window.
**Net 7-day: +34 nights, +£5,921.83** (yesterday +32 n / +£5,433.92).

| Ref | Pickup 27 Oct–2 Nov (bk / n / £) | Cancelled 27 Oct–2 Nov (stay, n / £, cancel time) |
|---|---|---|
| P12 | 3 / 12 / £2,738.19 | 18–22 Nov 4 n / £786.15 (28 Oct 13:27); 4–8 Dec 4 n / £1,116.99 (28 Oct 22:12) |
| P20 | 2 / 14 / £2,476.27 | — |
| P05 | 2 / 6 / £1,953.04 | — |
| P11 | 2 / 6 / £1,221.45 | 28 Nov–12 Dec 14 n / £2,950.82 (27 Oct 11:29) |
| P13 | 1 / 9 / £1,143.76 | — |
| P04 | 2 / 6 / £748.90 | 20–23 Nov 3 n / £355.82 (30 Oct 12:01); 19–20 Dec 1 n / £216.00 (31 Oct 14:36) |
| P06 | 1 / 3 / £541.00 | — |
| P08 | 1 / 4 / £525.00 | — |
| P01, P02, P09, P10, P14 | 0 | — |

New bookings vs the PriceLabs price in force (`prices.csv` 1 Nov, room only):
- P06 12–15 Nov: £541.00 = £180.33/n, 0.607× PriceLabs £891 (273+307+311), Airbnb, lead 11 days.
- P12 27–30 Nov: £653.39 = £217.80/n, 0.797× PriceLabs £820 (269+298+253), Booking.com, lead 26 days.
- P05 29 Jan–1 Feb 2027: £1,059.52 = £353.17/n, Airbnb, lead 89 days. This is outside the 60-day price window, so the ratio is UNKNOWN.

### Pace vs STLY (kpi_pack `pace_30` / `pace_90`; rm.metrics `on_the_books`; cancelled bookings excluded on both sides)
Only **P12 Mile End** has Smoobu stays in the same-time-last-year windows.

| P12 measure | 1 Nov | 2 Nov |
|---|---|---|
| Pace30 (stays 2 Nov–1 Dec vs STLY) | −10 n / −32.6% | **18 n / £3,129.85 vs 24 n / £3,552.83 = −6 n / −£422.98 / −11.9%** |
| Up to handback (stays 2 Nov–13 Dec) | −13 n / −34.1% | **22 n / £4,202.29 vs 31 n / £5,262.83 = −9 n / −£1,060.54 / −20.2%** |
| Pace90 (stays 2 Nov–31 Jan; ignores the handback) | −25 n / −57.4% | 22 n / £4,202.29 vs 43 n / £8,215.52 = −21 n / −£4,013.23 / −48.8% |

- Most of the pace30 improvement comes from the 27–30 Nov booking (+3 n / +£653.39). Without it, today's window would read 15 n / £2,476.46 vs 24 n / £3,552.83 = −30.3%.
- Pace for every other unit is UNKNOWN because `reservations.csv` has no STLY stays for them.
- On the books for stays 2 Nov–1 Dec (kpi_pack `pace_30`, n / £): P01 28 / £4,259.64; P05 24 / £10,958.82; P06 9 / £1,879.25; P08 9 / £1,182.42; P09 22 / £2,250.69; P10 17 / £1,801.39; P11 11 / £1,944.73; P13 20 / £2,883.07; P20 11 / £1,953.47; P02, P07 and P14 0. P04 is UNKNOWN in the pack.

### 18 Oct base rises: running effect (rises logged 18 Oct 20:33–20:43Z, PriceLabs `get_user_logs`)
**What is compared:**
- **Windows:** bookings made **19 Oct–1 Nov (14 full days)** against **4–18 Oct (15 days)**. 2 Nov has none in any group so far.
- **Cancellations:** split at 18 Oct 20:33Z using Smoobu `modifiedAt`. Smoobu was re-pulled 2 Nov and shows no cancellation since 31 Oct, so the cancellation figures are unchanged from 1 Nov.
- **Bookings:** confirmed rows only, imported stays excluded. P04 is left out (in Smoobu only since 20 Oct).
- **Changes since 1 Nov:** `get_user_logs` (listing, 1–2 Nov) shows **18 entries, all by Reyhan, 2 Nov 00:10–00:17Z**. None is on P01, P05, P06, P09 or P12.
  - P11: 2 Nov +10% min 1; then an override on 10 Nov–18 Dec with no price value and min 2.
  - P13: 2–12 Nov with no price value, min 2; 7–20 Dec −2%.
  - P20: **base 350→330 and min 220→200**; 6–24 Nov −5% min 3.

| Group | Made 19 Oct–1 Nov: bk / n / £ (per day) | Made 4–18 Oct: bk / n / £ (per day) | After ÷ before, per day (bk / n / £) | Cancelled after the rise | Cancelled 4 Oct to the rise |
|---|---|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 13 / 46 / £9,600.22 (0.93 / 3.29 / £685.73) | 13 / 91 / £18,199.03 (0.87 / 6.07 / £1,213.27) | **1.07× / 0.54× / 0.57×** (was 0.89× / 0.47× / 0.47×) | 6 / 44 n / £9,287.63 (5 booked before the rise: 40 n / £8,170.64; plus P12 4–8 Dec, booked and cancelled after it) | 2 / 8 n / £3,179.09 |
| **Unraised** (P02, P08, P10, P14, P20*) | 5 / 26 / £4,207.79 (0.36 / 1.86 / £300.56) | 7 / 68 / £8,054.83 (0.47 / 4.53 / £536.99) | **0.76× / 0.41× / 0.56×** | 0 real | 0 |
| P13 (base 235→250 on 24 Oct, unconfirmed) | 2 / 16 / £2,909.76 (0.14 / 1.14 / £207.84) | 6 / 24 / £3,617.87 (0.40 / 1.60 / £241.19) | 0.36× / 0.71× / 0.86× | 0 | 0 |

\* P20 base was cut 380→350 on 24 Oct (policy). It was cut again to 330 on 2 Nov 00:16Z (log above). From 2 Nov the unraised group therefore holds a flat whose base has been cut twice.

**Net since the rise (made minus cancelled):**
- Raised: **+2 n / +£312.59**. This is the first time it has been positive; it was −7 n / −£1,941.32 on 1 Nov.
- Unraised: +26 n / +£4,207.79 (unchanged).
- P13: +16 n / +£2,909.76 (unchanged).

**Per raised property** (made 19 Oct–1 Nov vs 4–18 Oct; bk / n / £; cancellations after the rise):
- P01: 1 / 3 / £720.90 vs 1 / 30 / £4,563.90; no cancellations.
- P05: **2 / 6 / £1,953.04** vs 2 / 11 / £6,363.05. New since yesterday: 29 Jan–1 Feb 2027, £353.17/n. No cancellations after the rise; 1 before it (27 Dec stay, 3 n, £1,887.00).
- P06: **2 / 6 / £1,345.77** vs 4 / 18 / £3,400.07. New: 12–15 Nov, £180.33/n. No cancellations.
- P09: 1 / 2 / £253.21 vs 3 / 23 / £2,371.55; no cancellations.
- P11: 2 / 6 / £1,221.45 vs 1 / 4 / £650.48. **2 cancellations / 22 n / £4,687.23**, both Booking.com stays booked before the rise.
- P12: **5 / 23 / £4,105.85** vs 2 / 5 / £849.98. New: 27–30 Nov, £217.80/n. **4 cancellations / 22 n / £4,600.40** (3 booked before the rise).

**Running line:**
- **Booking count per day is now level or higher after the rise** in the raised group (1.07×), and down in the unraised group (0.76×).
- **Nights and revenue per day fell by roughly the same share in both groups:** nights 0.54× raised vs 0.41× unraised; revenue 0.57× vs 0.56×.
- **The raised group's net turned positive** because 1 Nov added 3 bookings to it. Of the two in the next 60 days, the P06 stay was sold at 0.607× the PriceLabs price.
- **Effects that cannot be separated:**
  - the 24 Oct Booking.com markup cut (+30%→+15%);
  - Booking.com Last Minute 10%;
  - the Airbnb flexible-cancellation test on P05/P06/P20 from 24 Oct (policy `monitoring`);
  - Reyhan's date overrides of 30 Oct–2 Nov.
- **The 4–18 Oct base includes long stays:** P01 30 n, and a P05 booking of £4,527.95 made 18 Oct.
- **The sample is small:** 1–5 bookings per property.

### Input for the 2 Nov base review (occupancy evidence only; amounts are for the strategy director)
Base and PriceLabs `recommended_base` come from `listings.csv` 2 Nov. Prices come from `prices.csv` 2 Nov, compared with 1 Nov.

| Ref | Base / rec | Occupancy evidence | Occupancy input |
|---|---|---|---|
| **P01** | 253 / 255 | 27/27 non-blocked nights booked in the next 30. 0 open nights before the 20 Dec handback. | **Hold.** Nothing left to sell, so a base change has no effect before handback. |
| **P05** | 550 / 548 | Next 30 79.3% vs market 40%; next 60 67.8% vs 38%. Since the rise: 2 bookings / 6 n, no cancellations. The new booking is in Jan 2027 at £353.17/n (lead 89 d). Open: 9 Nov (£1,451, min 1), 16–17 Nov (£382/£421), 29 Nov–2 Dec (£523–543, min 3), 7–8 Dec, 13–21 Dec, 29 Dec (£1,342, min 1). Open-night prices: median −0.6% vs 1 Nov. | **Hold.** About double the market. The fall to 79.3% is the window moving, not a lost booking. Not enough evidence after the rise to raise again. |
| **P06** | 357 / 357 | The 8–14 Nov open run took a booking: 12–15 Nov, £180.33/n, **0.607× PriceLabs**, Airbnb, made 1 Nov. 8/12 non-blocked nights booked next 30 vs market 46%. **The only sellable nights in the next 60 are now 8–11 Nov** (4 n, £214/217/222/238, min 2), down about 6% vs 1 Nov (£228–255) with no P06 entry in the logs. | **Hold.** With 4 sellable nights, base is not the lever; 8–11 Nov is a date-level question. The one booking after the rise was sold well below the PriceLabs price, so it is no evidence for raising. |
| **P09** | 176 / 176 | 87.5% up to handback 26 Nov vs market 36% (Compressed). Open only 10–12 Nov (£120/144/146, min 2; 10 Nov was £145 on 1 Nov). No booking since 23 Oct. | **Hold.** The class points to room on price, but only 3 open nights remain before handback, and PriceLabs is already easing them. |
| **P11** | 286 / 285 | Next 30 37.9% vs market 46% (Soft); next 60 40.7% vs 39%. Since the rise: 2 bookings / 6 n against 22 n cancelled. No booking since 28 Oct. **Reyhan's 31 Oct −7% (10 Nov–4 Dec) and −5% (8–18 Dec) look replaced:** at 2 Nov 00:11Z by an override on 10 Nov–18 Dec with no price value (min 2). Open-night prices are **median +8.8% vs 1 Nov** (10 Nov £180→£202, 13 Nov £250→£281). The discounts were in place for about 26 h with no booking. 35 open nights in the next 60. | **Lower-leaning.** Below market for the next 30, and date prices went up overnight, not down. Corentin to confirm whether removing the 31 Oct discounts was intended. Visibility Booster 18% applies on these dates (policy). |
| **P12** | 284 / **273** | Pace30 **−6 n / −11.9%** (was −32.6%); −9 n / −20.2% up to handback (Soft on pace only). Next 30 62.1% vs market 40%. New booking 27–30 Nov at £217.80/n, 0.797× PriceLabs. Since the rise: 5 bookings / 23 n against 4 cancellations / 22 n. Reyhan's −7% (16 Nov–13 Dec, 31 Oct) unchanged (no P12 log entry 1–2 Nov). | **Hold at 284 while the −7% stands (as yesterday).** The lower-leaning signal is weaker than yesterday: pace30 moved from −32.6% to −11.9%, though −30.3% of that gap would remain without the one booking. Base is still 11 above PriceLabs' recommendation. |

Other units, for completeness:
- **P20 (330 / 347):** 34.5% vs 37% (Soft). Reyhan cut the base 350→330 and the min 220→200 at 2 Nov 00:16Z, and set 6–24 Nov to −5% min 3. Policy `price_changes` (24 Oct, Corentin) set base 350. **Conflict for Corentin to confirm; not a new proposal.**
- **P13 (250 / 237):** 69.0% vs 41%. Hold (Unclassifiable; base 250 unconfirmed). The 2–12 Nov override with no price value fits the policy's 0% (8–12 Nov prices £142–147 → £148–159). For the PriceLabs section to confirm.
- **P04 (220 / none):** 58.6% vs 24%. Soft only on the <60% rule; hold.
- **P08 (250 / 254) and P10 (160 / 165):** 72.7% and 100% up to handback. Hold.
- **P14:** special setup, numbers only.
- **Blocked on purpose:** P02, P03, P06 (from 15 Nov) and P07.

### Per-property table
Column sources:
- **Occ30, ADR30, RevPAR30:** kpi_pack `last30` (3 Oct–1 Nov).
- **Fwd occ30:** 3 Nov–1 Dec, Smoobu truth on the `prices.csv` calendar, handback-aware; market from `pl_kpis.csv`.
- **Pace30:** stays 2 Nov–1 Dec.
- **Pickup 7d:** bookings made 27 Oct–2 Nov, imports excluded.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.63 | £161.63 | 100% (34%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 80.0% | £110.68 | £88.55 | all blocked (46%) | UNKNOWN: no STLY | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar closed, no labels (50%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 58.6% (24%) | UNKNOWN: no history | 2 / 6 / £748.90 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 63.3% | £391.15 | £247.73 | 79.3% (40%) | UNKNOWN: no STLY | 2 / 6 / £1,953.04 | Unclassifiable (60–85%, no STLY) |
| P06 | Marylebone | 83.3% | £198.81 | £165.68 | 66.7% of non-blocked (46%) | UNKNOWN: no STLY | 1 / 3 / £541.00 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | all blocked (23%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £157.94 | £152.68 | 72.7% to 13 Nov (48%) | UNKNOWN: no STLY | 1 / 4 / £525.00 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 76.7% | £120.07 | £92.06 | 87.5% to 26 Nov (36%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 83.3% | £107.86 | £89.88 | 100% to 18 Nov (28%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 80.0% | £179.62 | £143.69 | 37.9% (46%) | UNKNOWN: no STLY | 2 / 6 / £1,221.45 | **Soft** |
| P12 | Mile End | 83.3% | £189.03 | £157.53 | 62.1% (40%) | **−6 n / −£422.98 / −11.9%** | 3 / 12 / £2,738.19 | **Soft** (pace test only) |
| P13 | Shepherd's Bush (one flat) | 80.0% | £154.54 | £123.63 | 69.0% (41%) | UNKNOWN: no STLY | 1 / 9 / £1,143.76 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (41%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN: no prices rows | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 60.0% | £162.34* | £97.41* | 34.5% (37%) | UNKNOWN: no STLY | 2 / 14 / £2,476.27 | **Soft** |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.

**Classes:** Compressed 3 (P01, P09, P10); On track 0; Soft 5 (P04, P11, P12, P14, P20); Unclassifiable 8 (P05, P08, P13, P15–P19); blocked by policy 4 (P02, P03, P06, P07). No class changes since 1 Nov. P12 stays Soft, but now only on the pace test (fwd30 62.1% ≥ 60%).

**Last 365 nights** (kpi_pack `last365`, 2 Nov 2025–1 Nov 2026; occ / ADR / RevPAR / revenue):

| Ref | Occ | ADR | RevPAR | Revenue |
|---|---|---|---|---|
| P01 | 38.9% | £177.68 | £69.12 | £25,229.89 |
| P02 | 79.7% | £128.59 | £102.52 | £37,418.99 |
| P05 | 56.7% | £373.41 | £211.77 | £77,296.19 |
| P06 | 35.1% | £237.12 | £83.15 | £30,350.75 |
| P07 | 11.5% | £133.90 | £15.41 | £5,623.70 |
| P08 | 39.5% | £175.00 | £69.04 | £25,200.21 |
| P09 | 39.5% | £115.48 | £45.56 | £16,628.46 |
| P10 | 38.1% | £114.35 | £43.55 | £15,895.16 |
| P11 | 77.3% | £174.42 | £134.76 | £49,186.73 |
| P12 | 81.9% | £191.72 | £157.05 | £57,323.72 |
| P13 | 77.8% | £158.31 | £123.18 | £44,960.94 |
| P14 | 2.7% | £409.84 | £11.23 | £4,098.40 |
| P20 | 4.9% | £162.34 | £8.01 | £2,922.16 (Smoobu history short) |
| P03, P04, P15–P19 | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |

**Booking profile** (kpi_pack `booking_profile`):

| Ref | Bookings | Median lead (days) | Median stay (nights) | Revenue share by channel |
|---|---|---|---|---|
| P01 | 21 | 15 | 5 | Airbnb 80.4%, Website 13.0%, Booking.com 6.6% |
| P02 | 71 | 34 | 4 | Airbnb 53.8%, Booking.com 43.0%, Direct 3.2% |
| P04 | 4 | 8 | 4 | Booking.com 51.1%, Airbnb 48.9% |
| P05 | 61 | 44 | 4 | Airbnb 100% |
| P06 | 32 | 15 | 4 | Airbnb 72.9%, Booking.com 27.1% |
| P07 | 5 | 3 | 4 | Airbnb 100% |
| P08 | 22 | 15 | 6 | Airbnb 77.3%, Booking.com 22.7% |
| P09 | 25 | 21 | 5 | Airbnb 58.4%, Booking.com 40.1%, Direct 1.5% |
| P10 | 22 | 12 | 5 | Airbnb 69.3%, Booking.com 27.6%, Website 3.1% |
| P11 | 70 | 28 | 4 | Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0% |
| P12 | 83 | 31 | 4 | Booking.com 89.8%, Airbnb 10.2% |
| P13 | 84 | 21 | 3 | Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9% |
| P14 | 1 | 57 | 10 | Airbnb 100% |
| P20 | 5 | 6 | 4 | Airbnb 100% |

### Orphan gaps
Method: `prices.csv` 3 Nov–1 Jan plus Smoobu confirmed stays, with tonight taken from Smoobu `/api/rates` 2 Nov. P13 is treated as one calendar and handbacks are respected. P02, P03 and P07 are left out.
- **P12 26 Nov (NEW):** 1 night between the 21–26 Nov stay and the new 27–30 Nov arrival, min 2 (PriceLabs £251; Smoobu £262, `/api/rates`). It was created by the 1 Nov booking and kpi_pack `gaps` lists it too. It cannot be sold at min 2.
- **P06 8–11 Nov and 14 Nov:** the new 12–15 Nov stay covers the nights of 12, 13 and **14 Nov**, so **14 Nov is booked, not open**. 15 Nov onward is blocked on purpose (policy). What is left is **8–11 Nov: 4 nights between the 5–8 Nov departure and the 12 Nov arrival, min 2**. That is bookable, so it is not an orphan. Prices: £214 / £217 / £222 / £238. Any 2-night sale other than 8–10 or 10–12 would leave a 1-night orphan inside it. PriceLabs still lists 12–14 Nov as open at £256 / £286 / £290 (stale; Smoobu closed).
- **P11 2 Nov (tonight):** 1 open night between the 31 Oct–1 Nov block and the 3 Nov arrival. Reyhan set it to **min 1, +10%** (2 Nov 00:10–00:11Z, after +10%→+20%→+10%). Smoobu shows £176, min 1. It is bookable for tonight only and is no longer below the minimum stay.
- **P04 2 Nov (tonight):** 1 open night before the 3 Nov arrival, Smoobu min 2 (£182). It is an orphan below the minimum stay. Policy says P04 is never open for fewer than 3 nights, so the min 2 is still the Reyhan conflict raised on 1 Nov. **Corentin to confirm; not a new proposal.** It lapses tonight.
- **P13 3 Nov:** 2–3 Nov is 2 open nights at min 2 before the 4 Nov arrival (Smoobu £122/£148 tonight). If tonight does not sell, **3 Nov becomes a 1-night orphan below min 2 from tomorrow.**
- **P12 2–4 Nov:** 3 open nights, min 2, bookable.
- **Runs exactly at the minimum stay (bookable, not orphans):**
  - P04: 2 Dec (settled by policy).
  - P05: 9 Nov (min 1, £1,451), 16–17 Nov and 7–8 Dec (min 2), 29 Dec (min 1, £1,342).
  - P12: 12–13 Nov (min 2).
  - P11: 23–25 Dec (min 3).
  - P13: 17 Nov, 27 Nov and 1 Dec (min 1).

### Gaps to fill (open nights, next 60)
- **P11:** 2 Nov (tonight, min 1), 10–13 Nov, 18 Nov–4 Dec (17 n), 8–18 Dec (11 n), 23–25 Dec. 37.9% vs market 46%.
- **P20:** 6–24 Nov (19 n, min 3), 5–31 Dec. 34.5% vs 37%.
- **P12:** 2–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov (orphan), 30 Nov–2 Dec, 7–13 Dec. Pace30 −11.9%.
- **P04:** 2 Nov (policy conflict), 9–13 Nov (5 n), 18–24 Nov (7 n), 6–19 Dec (14 n). 58.6% next 30.
- **P06:** 8–11 Nov, the only sellable nights in the next 60.
- **P13:** 2–3 Nov, 8–12 Nov, 7–26 Dec (20 n).
- **P05:** 9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec.
- **P08** 5–7 Nov and **P09** 10–12 Nov: the last open nights before handback.
- **P14:** all 60 nights (special setup, numbers only).

Data gaps:
- **Pace vs STLY:** UNKNOWN for every unit except P12, because `reservations.csv` has no STLY stays for them. P03, P04 and P15–P19 have no history at all. P12 pace90 ignores the handback. STLY leaves out bookings that were later cancelled.
- **Last 30 / last 365:** UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped). Last-365 occupancy reads low because of the 365-day denominator.
- **Market:**
  - Last-30 market occupancy is UNKNOWN: there is no field for it in `pl_kpis.csv`, and kpi_pack `missing.market` says market.csv is empty.
  - ARI and RGI are UNKNOWN because comps.csv is empty.
  - channel_checks.csv is not in the 2 Nov snapshot. This section did not add or copy rows.
- **Forward:**
  - Tonight (2 Nov) is not in `prices.csv`; Smoobu `/api/rates` was used instead.
  - PriceLabs booking status is stale for P06 12–14 Nov and P12 27–29 Nov; Smoobu was used as truth.
  - The P03 calendar is closed with no labels. P15–P19 have no prices rows.
- **Cancellations:** `reservations.csv` has no cancel date, so Smoobu `modifiedAt` is used, and its timezone is not stated. Rate plans and any fees kept on the cancellations are UNKNOWN.
- **Base-rise analysis:**
  - The P13 base change 235→250 (24 Oct) is unconfirmed.
  - P20's 2 Nov base cut to 330 is not in policy.
  - The P04 window from 19 Oct cannot be used because of the 20 Oct Smoobu import batch.
  - The effect of the no-price-value overrides on P11 (10 Nov–18 Dec) and P13 (2–12 Nov) is inferred from the price moves only; `get_customizations` and `get_listing_date_overrides` were NOT CHECKED in this section.
- **P05 Jan booking:** paid vs PriceLabs is UNKNOWN (outside the 60-day price window), and the 12% early-booking / lead-time layer was NOT CHECKED here.
- **P04 double-sell on unsynced Airbnb 1455876748739910219** (3–6 / 6–9 Nov; first arrival 3 Nov): NOT CHECKED in this section. That listing is outside Smoobu and PriceLabs; it is covered in the channel section.

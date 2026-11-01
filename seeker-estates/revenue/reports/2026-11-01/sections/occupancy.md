## Occupancy & performance

**Portfolio, last 30 nights (2–31 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 69.2%, ADR £172.25, RevPAR £119.25, revenue £46,506.64 (270 nights). Source: `reports/2026-11-01/kpi_pack.json` `portfolio_last30`. Revenue = Smoobu basePrice, room only, cleaning excluded. Yesterday (1–30 Oct): 70.0% / £172.34 / £120.64 / £47,048.42.
- **Last 365 nights (1 Nov 2025–31 Oct 2026):** 44.8%, ADR £184.11, RevPAR £82.45, revenue £391,242.22 (2,125 n). Source: kpi_pack `portfolio_last365`. Occupancy reads low because the denominator is 365 days and most Smoobu history starts in 2026.
- P03, P04 (in Smoobu only since 20 Oct) and P15–P19 are left out, not counted as zero.

**Booked next 30 nights (2–30 Nov, 29 nights; `prices.csv` 1 Nov starts at 2 Nov). Smoobu confirmed stays are the truth; handback dates respected:** 178 of 298 non-blocked nights = **59.7%** (yesterday 59.7%, 181/303). Units: P01, P04, P05, P06, P08–P14, P20. P02, P03 and P07 are left out because they are blocked on purpose (policy). Blocked nights excluded: P01 1 (30 Nov, handback), P06 16 (policy).
**Booked next 60 nights (2 Nov–30 Dec, 59 nights):** 241 of 494 = **48.8%** (yesterday 48.8%, 244/500). Blocked nights excluded: P01 18 (from 30 Nov, handback 20 Dec), P06 46.
- **PriceLabs vs Smoobu calendar:** every night PriceLabs shows as Booked matches a confirmed Smoobu stay. kpi_pack `forward_occ` is not inflated by cancelled stays today. The only difference is P13 3064856 showing "Blocked" on 4–7 Nov, 13–16 Nov and 27–30 Dec. Those nights are bookings on its twin listing 3090701 and are counted as booked (policy `linked_listings`).
- **P04 19–20 Dec is open again** after the 31 Oct 14:36 cancellation (Smoobu `modifiedAt`). `prices.csv` 1 Nov shows 19 Dec as available at £207, min 3. It is now part of an open run 6–19 Dec (14 nights).
- **Tonight (1 Nov) is not in `prices.csv`.** From Smoobu `reservations.csv`: P01, P05, P06, P08, P09 and P10 are booked tonight. P04, P11, P12, P13, P14 and P20 are open.

### Booked vs market, next 30 / next 60 (Smoobu truth; market = PriceLabs `pl_kpis.csv` 1 Nov)
Market occupancy for the last 30 nights: UNKNOWN. `pl_kpis.csv` has no past-30 market field and kpi_pack `missing.market` says market.csv is empty.

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (28/28 non-blocked) | 35% | 100% (31/31 non-blocked; 18 handback blocks) | 28% |
| P04 | 55.2% (16/29) (was 51.7%) | 24% | 52.5% (31/59) | 20% |
| P05 | **82.8% (24/29)** (was 86.2%) | 40% | 67.8% (40/59) | 38% |
| P06 | 46.2% of non-blocked (6/13; 16 blocked on purpose) | 46% | 6/13 non-blocked (46 blocked) | 41% |
| P08 | 75.0% (9/12, up to handback 13 Nov) | 48% | same | 42% |
| P09 | 88.0% (22/25, up to handback 26 Nov) | 36% | same | 31% |
| P10 | 100% (17/17, up to handback 18 Nov) | 27% | same | 23% |
| P11 | 37.9% (11/29) | 46% | 39.0% (23/59) | 39% |
| P12 | 51.7% (15/29) | 40% | 45.2% (19/42, up to handback 13 Dec) | 34% |
| P13 (one flat) | 69.0% (20/29) | 41% | 49.2% (29/59) | 37% |
| P14 (special setup, numbers only) | 0% (0/29) | 41% | 0% (0/59) | 37% |
| P20 | 34.5% (10/29) | 38% | 23.7% (14/59) | 30% |

Below market next 30: **P11** (37.9% vs 46%) and **P20** (34.5% vs 38%). P14 is at 0%. P05 dropped below 85% only because the window moved on a day: 1 Nov (booked) left it and 30 Nov (open) came in. No P05 booking or cancellation since 29 Oct.

### 7-day pickup (bookings made 26 Oct–1 Nov; 1 Nov partial), imported past stays excluded
Source: `reservations.csv` 1 Nov, using `booked_on` on confirmed rows. **No new bookings overnight. This is the second night in a row with none; the last booking was made 29 Oct.** It is Sunday and a weekend lull is normal, so two quiet nights are not read as a trend.
**Total: 12 bookings, 58 nights, £10,859.70.** Excluded: P04 Airbnb 28 Sep–2 Oct (£439.20, a past stay imported 26 Oct).

**Cancellations 26 Oct–1 Nov.** Cancel time is Smoobu `modifiedAt` from GET /api/reservations (pulled 1 Nov, merged with the 31 Oct pull because Smoobu drops stays that have already departed). **5 real cancellations, 26 nights, £5,425.78 room.** Left out: two P04 20–23 Nov duplicates (26 Oct) and the P20 delivery-block removal, which is not a booking.
**Net 7-day: +32 nights, +£5,433.92** (yesterday +38 n / +£6,251.65; the P12 22–29 Nov cancellation of 25 Oct has now left the window).

| Ref | Pickup 26 Oct–1 Nov (bk / n / £) | Cancelled 26 Oct–1 Nov (stay, n / £, cancel time) |
|---|---|---|
| P13 | 2 / 16 / £2,909.76 | — |
| P20 | 2 / 14 / £2,476.27 | — (delivery block removed 30 Oct 18:11) |
| P12 | 2 / 9 / £2,084.80 | 18–22 Nov 4 n / £786.15 (28 Oct 13:27); 4–8 Dec 4 n / £1,116.99 (28 Oct 22:12; booked 26 Oct) |
| P11 | 2 / 6 / £1,221.45 | 28 Nov–12 Dec 14 n / £2,950.82 (27 Oct 11:29) |
| P05 | 1 / 3 / £893.52 | — |
| P04 | 2 / 6 / £748.90 | 20–23 Nov 3 n / £355.82 (30 Oct 12:01); **19–20 Dec 1 n / £216.00 (31 Oct 14:36, Airbnb; Smoobu created 26 Oct 14:08)** |
| P08 | 1 / 4 / £525.00 | duplicate only (27–30 Oct) |
| P01, P02, P06, P09, P10, P14 | 0 | — |

kpi_pack P04 `pickup_7d` (3 / 10 / £1,188.10) includes the imported past stay.

### Pace vs STLY (rm.metrics `on_the_books`; cancelled bookings excluded on both sides)
Only **P12 Mile End** has Smoobu stays in the same-time-last-year windows.

| P12 measure | 31 Oct | 1 Nov |
|---|---|---|
| Pace30 (stays 1–30 Nov vs STLY) | −9 n / −28.3% | **15 n / £2,476.46 vs 25 n / £3,674.46 = −10 n / −£1,198.00 / −32.6%** |
| Up to handback (stays 1 Nov–13 Dec) | −12 n / −31.1% | **19 n / £3,548.90 vs 32 n / £5,384.46 = −13 n / −£1,835.56 / −34.1%** |
| Pace90 (stays 1 Nov–29 Jan; ignores the handback) | −24 n / −55.5% | 19 n / £3,548.90 vs 44 n / £8,337.16 = −25 n / −£4,788.26 / −57.4% |

- No P12 booking or cancellation since 29 Oct. The further slide is the window moving forward: the booked 31 Oct night left the on-the-books count and 1 Nov (tonight) is open.
- Pace for every other unit is UNKNOWN because `reservations.csv` has no STLY stays for them. On the books for stays 1–30 Nov (n / £): P01 29 / £4,411.77; P04 16 / £2,092.50; P05 25 / £11,306.67; P06 7 / £1,516.08; P08 10 / £1,317.74; P09 23 / £2,346.31; P10 18 / £1,907.35; P11 11 / £1,944.73; P13 20 / £2,883.07; P20 10 / £1,779.21; P02, P07, P14 0.

### 18 Oct base rises: running effect (rises logged 18 Oct 20:33–20:43Z, PriceLabs `get_user_logs`)
Windows compared: bookings made **19–31 Oct (13 full days)** against **4–18 Oct (15 days)**. 1 Nov so far has none in either group. Cancellations are split at 18 Oct 20:33Z using Smoobu `modifiedAt`. Confirmed rows only, imported stays excluded. P04 is left out (in Smoobu only since 20 Oct). **No base, min or max change was logged 31 Oct–1 Nov** (`get_user_logs` listing, 31 Oct–1 Nov: 59 entries, all date-specific overrides by Reyhan, 31 Oct 14:28–14:34Z and 22:05–22:11Z).

| Group | Made 19–31 Oct: bk / n / £ (per day) | Made 4–18 Oct: bk / n / £ (per day) | After ÷ before, per day (bk / n / £) | Cancelled after the rise | Cancelled 4 Oct to the rise |
|---|---|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 10 / 37 / £7,346.31 (0.77 / 2.85 / £565.10) | 13 / 91 / £18,199.03 (0.87 / 6.07 / £1,213.27) | **0.89× / 0.47× / 0.47×** | 6 / 44 n / £9,287.63 (5 booked before the rise: 40 n / £8,170.64; plus P12 4–8 Dec booked and cancelled after it) | 2 / 8 n / £3,179.09 |
| **Unraised** (P02, P08, P10, P14, P20*) | 5 / 26 / £4,207.79 (0.38 / 2.00 / £323.68) | 7 / 68 / £8,054.83 (0.47 / 4.53 / £536.99) | **0.82× / 0.44× / 0.60×** | 0 real | 0 |
| P13 (base 235→250 on 24 Oct, unconfirmed) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.38× / 0.77× / 0.93× | 0 | 0 |

\* P20 base was cut 380→350 on 24 Oct (policy).

**Net since the rise (made minus cancelled):** raised **−7 n / −£1,941.32**; unraised +26 n / +£4,207.79; P13 +16 n / +£2,909.76. The totals are unchanged since 28 Oct. Only the per-day rates move, because each new day adds zero bookings for every group.

**Per raised property** (made 19 Oct–1 Nov vs 4–18 Oct; bk / n / £; cancellations after the rise):
- P01: 1 / 3 / £720.90 vs 1 / 30 / £4,563.90; no cancellations.
- P05: 1 / 3 / £893.52 vs 2 / 11 / £6,363.05; no cancellations after the rise (1 before it: 27 Dec stay, 3 n, £1,887.00).
- P06: 1 / 3 / £804.77 vs 4 / 18 / £3,400.07; no cancellations.
- P09: 1 / 2 / £253.21 vs 3 / 23 / £2,371.55; no cancellations.
- P11: 2 / 6 / £1,221.45 vs 1 / 4 / £650.48; **2 cancellations / 22 n / £4,687.23**, both Booking.com stays booked before the rise (19 Sep and 16 Jul).
- P12: 4 / 20 / £3,452.46 vs 2 / 5 / £849.98; **4 cancellations / 22 n / £4,600.40** (3 booked before the rise; 4–8 Dec booked 26 Oct).

**Running line, unchanged in direction:** nights booked per day roughly halved in both groups (0.47× raised vs 0.44× unraised). Revenue per day fell more in the raised group (0.47× vs 0.60×), partly because the 4–18 Oct window holds one P05 booking of £4,527.95 (made 18 Oct). The raised group's net is negative only because 40 nights of Booking.com stays on P11/P12, booked before the rise, were cancelled. These effects cannot be separated: the 24 Oct Booking.com markup cut (+30%→+15%), Last Minute 10%, the Airbnb flexible-cancellation test on P05/P06 from 24 Oct (policy `monitoring`), and Reyhan's date overrides of 30–31 Oct. The sample is small: 1–4 bookings per property.

### Input for the 2 Nov base review (occupancy evidence only; amounts are for the strategy director)
Base and PriceLabs `recommended_base` come from `listings.csv` 1 Nov. Date overrides come from `get_user_logs` 31 Oct.

| Ref | Base / rec | Occupancy evidence | Occupancy input |
|---|---|---|---|
| **P01** | 253 / 255 | 100% of non-blocked nights booked up to handback 20 Dec. 0 open nights in the next 60. 1 booking since the rise. | **Hold.** Nothing left to sell, so a base change has no effect before handback. |
| **P05** | 550 / 548 | Next 30 82.8% vs market 40%; next 60 67.8% vs 38%. 1 booking since the rise (6–9 Nov, £297.84/n), no cancellations. Open: 9 Nov (£1,462, min 1), 16–17 Nov, 29 Nov–2 Dec (Reyhan −5%), 7–8 Dec, 13–21 Dec (−5%/−3%), 29 Dec (£1,354, min 1). | **Hold.** Occupancy is about double the market. The drop below 85% is the window moving, not a lost booking. Too little evidence after the rise to raise again. |
| **P06** | 357 / 357 (rec was 342 on 31 Oct) | Only one sellable run in the next 60: 8–14 Nov (7 n, £228–311 after Reyhan's −2%, min 2). Still 0 bookings into it. 46.2% of non-blocked nights vs market 46%. 1 booking since the rise. | **Hold.** At market. With one run, base is not the lever; the 8–14 Nov run is a date-level question. |
| **P09** | 176 / 176 | 88.0% up to handback 26 Nov vs market 36% (Compressed). Open only 10–12 Nov (£145–153, min 2). 1 booking since the rise (13–15 Nov, £126.61/n). | **Hold.** The class shows room on price, but only 3 open nights remain before handback. |
| **P11** | 286 / 285 | Next 30 37.9% vs market 46% (Soft); next 60 39.0% vs 39%. Since the rise: 2 bookings / 6 n against 22 n cancelled. 36 open nights in the next 60: 2 Nov, 10–13 Nov, 18 Nov–4 Dec (17 n), 8–18 Dec (11 n), 23–25 Dec. Reyhan added −7% on 10 Nov–4 Dec and −5% on 8–18 Dec at 31 Oct 22:06Z, on top of −5% on 31 Oct 14:29Z. | **Lower-leaning.** Occupancy is below market next 30. Holding the base is defensible only because the 31 Oct date discounts have had no weekday to work yet. Visibility Booster 18% on these dates (policy). |
| **P12** | 284 / **273** | Pace30 **−10 n / −32.6%**; −13 n / −34.1% up to handback (Soft). Next 30 51.7% is above market 40%. Since the rise: 4 bookings / 20 n against 4 cancellations / 22 n. Open: 2–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov–2 Dec, 7–13 Dec. Reyhan −7% on 1–4 Nov and 16 Nov–13 Dec (31 Oct). | **Lower-leaning** on the STLY evidence. Base sits 11 above PriceLabs' recommended base. Above market next 30, so the gap is to last year, not to the market. |

Other units, for completeness:
- P13 (250 / 233): 69.0% vs 41%. Hold (Unclassifiable, base 250 unconfirmed).
- P20 (350 / 347): 34.5% vs 38% (Soft); Reyhan −10% 6–24 Nov, min 3. Lower-leaning or date-level.
- P04 (220 / none): 55.2% vs 24%. Soft only on the <60% rule; hold.
- P08 (250 / 252) and P10 (160 / 166): 75% and 100% up to handback. Hold.
- P14: special setup, numbers only.
- P02, P03, P06 (beyond 14 Nov) and P07: blocked on purpose.

### Per-property table
Occ30, ADR30 and RevPAR30 come from kpi_pack `last30` (2–31 Oct). Fwd occ30 covers 2–30 Nov: Smoobu truth on the `prices.csv` calendar, handback-aware, with market from `pl_kpis.csv`. Pace30 covers stays 1–30 Nov. Pickup 7d covers bookings made 26 Oct–1 Nov, imports excluded.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £161.97 | £161.97 | 100% (35%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 83.3% | £111.50 | £92.92 | all blocked (46%) | UNKNOWN: no STLY | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar closed, no labels (50%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 55.2% (24%) | UNKNOWN: no history | 2 / 6 / £748.90 | **Soft** (fwd30 < 60%) |
| P05 | St John's Wood | 63.3% | £396.76 | £251.28 | 82.8% (40%) | UNKNOWN: no STLY | 1 / 3 / £893.52 | Unclassifiable (60–85%, no STLY); was Compressed |
| P06 | Marylebone | 83.3% | £200.86 | £167.38 | 46.2% of non-blocked (46%) | UNKNOWN: no STLY | 0 / 0 / £0 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | all blocked (24%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £159.12 | £153.82 | 75.0% to 13 Nov (48%) | UNKNOWN: no STLY | 1 / 4 / £525.00 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 76.7% | £120.41 | £92.32 | 88.0% to 26 Nov (36%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 83.3% | £108.81 | £90.68 | 100% to 18 Nov (27%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 83.3% | £179.46 | £149.55 | 37.9% (46%) | UNKNOWN: no STLY | 2 / 6 / £1,221.45 | **Soft** |
| P12 | Mile End | 86.7% | £188.98 | £163.78 | 51.7% (40%) | **−10 n / −£1,198.00 / −32.6%** | 2 / 9 / £2,084.80 | **Soft** (both tests) |
| P13 | Shepherd's Bush (one flat) | 83.3% | £154.94 | £129.11 | 69.0% (41%) | UNKNOWN: no STLY | 2 / 16 / £2,909.76 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (41%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN: no prices rows | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 60.0% | £162.34* | £97.41* | 34.5% (38%) | UNKNOWN: no STLY | 2 / 14 / £2,476.27 | **Soft** |

\* The P20 18–22 Oct extension was paid separately (policy `separate_payments`), so ADR30 and RevPAR30 read low.
**Classes:** Compressed 3 (P01, P09, P10); On track 0; Soft 5 (P04, P11, P12, P14, P20); Unclassifiable 8 (P05, P08, P13, P15–P19); blocked by policy 4 (P02, P03, P06, P07). Change since 31 Oct: **P05 Compressed → Unclassifiable** (86.2% → 82.8%; window move only).

**Last 365 nights** (kpi_pack `last365`, 1 Nov 2025–31 Oct 2026; occ / ADR / RevPAR / revenue): P01 38.6% / £177.86 / £68.71 / £25,077.76; P02 79.7% / £128.59 / £102.52 / £37,418.99; P05 56.4% / £373.54 / £210.82 / £76,948.34; P06 34.8% / £237.58 / £82.67 / £30,172.92; P07 11.5% / £133.90 / £15.41 / £5,623.70; P08 39.2% / £175.28 / £68.67 / £25,064.89; P09 39.2% / £115.61 / £45.30 / £16,532.84; P10 37.8% / £114.41 / £43.26 / £15,789.20; P11 77.3% / £174.42 / £134.76 / £49,186.73; P12 82.2% / £191.48 / £157.38 / £57,445.35; P13 77.8% / £158.31 / £123.18 / £44,960.94; P14 2.7% / £409.84 / £11.23 / £4,098.40; P20 4.9% / £162.34 / £8.01 / £2,922.16 (Smoobu history short). P03, P04 and P15–P19 UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; bookings / median lead in days / median stay in nights / revenue share by channel): P01 21/15/5 Airbnb 80.4%, Website 13.0%, Booking.com 6.6%; P02 71/34/4 Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%; P04 4/8/4 Booking.com 51.1%, Airbnb 48.9% (includes the imported past stay); P05 60/44/4 Airbnb 100%; P06 31/15/4 Airbnb 72.4%, Booking.com 27.6%; P07 5/3/4 Airbnb 100%; P08 22/15/6 Airbnb 77.3%, Booking.com 22.7%; P09 25/21/5 Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%; P10 22/12/5 Airbnb 69.3%, Booking.com 27.6%, Website 3.1%; P11 70/28/4 Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0%; P12 82/31/4 Booking.com 89.7%, Airbnb 10.3%; P13 84/21/3 Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%; P14 1/57/10 Airbnb 100%; P20 5/6/4 Airbnb 100%.

### Orphan gaps (`prices.csv` 2 Nov–31 Dec plus Smoobu confirmed stays; P13 treated as one calendar; handbacks respected; P02, P03 and P07 left out)
- **P20 1 Nov (tonight):** 1 night between an empty 31 Oct and the 2–6 Nov arrival. Reyhan set +5% min 2 on 31 Oct–1 Nov (31 Oct 14:32Z). As of today it is a 1-night orphan below the minimum stay and cannot be sold.
- **P04 1–2 Nov:** 2 open nights between the 26 Oct–1 Nov departure and the 3 Nov arrival. Reyhan set +20% min 2 (31 Oct 22:11Z); 2 Nov is £183 in `prices.csv`. Policy `price_changes` 24 Oct says P04 is "never open for fewer than 3". **This conflicts with policy; Corentin to confirm.** It is not a new proposal. If tonight does not sell, **2 Nov becomes a 1-night orphan below min 2 from tomorrow.**
- **P11 1–2 Nov:** 2 open nights (31 Oct was a Smoobu "Blocked channel" night created 31 Oct 11:52; arrival 3 Nov), min 2, 2 Nov £151. **2 Nov becomes a 1-night orphan from tomorrow** if tonight does not sell.
- Runs at the minimum stay (bookable, not orphans): P04 2 Dec (settled by policy); P05 9 Nov (min 1, £1,462), 16–17 Nov and 7–8 Dec (min 2), 29 Dec (min 1, £1,354); P12 12–13 Nov (min 2); P11 23–25 Dec (min 3); P13 17 Nov, 27 Nov, 1 Dec (min 1).

### Gaps to fill (open nights, next 60)
- **P11:** 1–2 Nov, 10–13 Nov, 18 Nov–4 Dec (17 n), 8–18 Dec (11 n), 23–25 Dec. 37.9% vs market 46%.
- **P20:** 1 Nov (orphan), 6–24 Nov (19 n, min 3), 5–31 Dec (27 n). 34.5% vs 38%.
- **P12:** 1–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov–2 Dec, 7–13 Dec. Pace30 −32.6%.
- **P04:** 1–2 Nov (policy conflict), 9–13 Nov (5 n), 18–24 Nov (7 n), 6–19 Dec (14 n; now includes 19 Dec). 55.2% next 30.
- **P06:** 8–14 Nov, the only sellable run in the next 60.
- **P13:** 1–3 Nov, 8–12 Nov, 7–26 Dec (20 n).
- **P05:** 9 Nov, 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec.
- **P08** 5–7 Nov and **P09** 10–12 Nov (the last open nights before handback).
- **P14:** all 60 nights (special setup, numbers only).

Data gaps:
- Pace vs STLY is UNKNOWN for all units except P12, because `reservations.csv` has no STLY stays for them (P03, P04 and P15–P19 have no history at all). P12 pace90 ignores the handback. STLY excludes bookings that were later cancelled.
- Last 30/365 is UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct) and P15–P19 (not mapped). Last-365 occupancy reads low because of the 365-day denominator.
- Market: last-30 market occupancy is UNKNOWN (no field in `pl_kpis.csv`; kpi_pack `missing.market`: market.csv empty). ARI and RGI are UNKNOWN (comps.csv empty). channel_checks.csv is empty in the 1 Nov snapshot.
- Forward: 1 Nov (tonight) is not in `prices.csv`, so its min stay and price are UNKNOWN. The P03 calendar is closed with no labels. P15–P19 have no prices rows.
- Cancellations: `reservations.csv` has no cancel date, so Smoobu `modifiedAt` is used; its timezone is not stated. The rate plan and any fee kept on the P11, P12 and P04 cancellations are UNKNOWN. The reason for the P04 19–20 Dec cancellation is UNKNOWN.
- Base-rise analysis: the P13 base change 235→250 (24 Oct) is not in policy and is unconfirmed. The P20 base cut is not in the PriceLabs base_price log. The P04 19 Oct+ window cannot be used because of the 20 Oct Smoobu import batch.
- P04 double-sell on unsynced Airbnb 1455876748739910219 (3–6 / 6–9 Nov) was NOT CHECKED in this section (that listing is outside Smoobu and PriceLabs; covered in the channel section).

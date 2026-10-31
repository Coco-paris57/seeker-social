## Occupancy & performance

**Portfolio, last 30 nights (1–30 Oct 2026), 13 units with Smoobu history (P01, P02, P05–P14, P20):** occupancy 70.0%, ADR £172.34, RevPAR £120.64, revenue £47,048.42 (273 nights). Source: `reports/2026-10-31/kpi_pack.json` `portfolio_last30`; revenue = Smoobu basePrice, room only, cleaning excluded. Yesterday (30 Sep–29 Oct): 70.0% / £172.68 / £120.87 / £47,140.41.
- **Last 365 nights (31 Oct 2025–30 Oct 2026):** 44.7%, ADR £184.13, RevPAR £82.23, revenue £390,163.73 (2,119 n), kpi_pack `portfolio_last365`. Occupancy is understated (365-day denominator; most Smoobu history starts in 2026).
- P03, P04 (Smoobu since 20 Oct) and P15–P19 are left out, not zeroed.

**Forward next 30 (1–29 Nov; `prices.csv` starts 1 Nov, so 29 nights), Smoobu confirmed stays as truth, handback-aware:** 181 of 303 non-blocked nights = **59.7%** (yesterday 61.7%, 187/303). Units: P01, P04, P05, P06, P08–P14, P20; P02/P03/P07 left out (blocked on purpose). Blocked excluded: P06 15 (policy).
**Forward next 60 (1 Nov–29 Dec, 59 nights):** 244 of 500 = **48.8%** (yesterday 50.0%, 251/502). Blocked excluded: P01 18 (30 Nov–17 Dec, handback set), P06 45.
- Drop vs yesterday: P04 20–23 Nov cancellation (−3 n) and the window roll (31 Oct, booked in 8 units, left the window).
- **Fixed since 30 Oct (t-pl-sync):** PriceLabs now shows P04 6–8 Nov and P05 6–8 Nov as Booked (`prices.csv` 31 Oct). The only PriceLabs/Smoobu mismatch left is P13 3064856 "Blocked" on 4–7 Nov, 13–16 Nov, 27–29 Dec = twin 3090701 bookings (policy `linked_listings`: counted as booked).
- **P20 20–21 Nov now open:** the Smoobu "Blocked channel" block 20–22 Nov (delivery, policy `listing_facts.P20.block_20_21_nov`) shows as cancelled at 30 Oct 18:11 (Smoobu GET /api/reservations `modifiedAt`), and `prices.csv` 31 Oct shows 20–21 Nov available (£292/£305, min 3). Who removed it and whether the delivery moved: UNKNOWN. **For Corentin to confirm**; counted as open here.

### Booked vs market, next 30 / next 60 (Smoobu truth; market = `pl_kpis.csv` 31 Oct)
Last-30 market occupancy: UNKNOWN (no past-30 market field in `pl_kpis.csv`; kpi_pack `missing.market` = empty).

| Ref | Booked next 30 (bk/n) | Mkt 30 | Booked next 60 (bk/n) | Mkt 60 |
|---|---|---|---|---|
| P01 | 100% (29/29) | 34% | 100% of non-blocked (32/32; 18 handback blocks) | 28% |
| P04 | **51.7% (15/29)** (was 62.1%) | 24% | 52.5% (31/59) | 20% |
| P05 | 86.2% (25/29) | 40% | 67.8% (40/59) | 38% |
| P06 | 50.0% of non-blocked (7/14; 15 blocked on purpose) | 45% | 7/14 non-blocked (45 blocked) | 40% |
| P08 | 76.9% (10/13, to handback 13 Nov) | 49% | same | 43% |
| P09 | 88.5% (23/26, to handback 26 Nov) | 36% | same | 31% |
| P10 | 100% (18/18, to handback 18 Nov) | 28% | same | 24% |
| P11 | 37.9% (11/29) | 46% | 37.3% (22/59) | 38% |
| P12 | 51.7% (15/29) | 40% | 44.2% (19/43, to handback 13 Dec) | 33% |
| P13 (one flat) | 65.5% (19/29) | 41% | 47.5% (28/59) | 36% |
| P14 (special setup, numbers only) | 0% (0/29) | 41% | 0% (0/59) | 37% |
| P20 | 31.0% (9/29; block removed, see above) | 37% | 23.7% (14/59) | 29% |

Below market next 30: **P11** (37.9% vs 46%), **P20** (31.0% vs 37%). P11 also below on next 60 (37.3% vs 38%). P14 0%.

### 7-day pickup (bookings made 25–31 Oct; 31 Oct partial, none yet), past-stay imports excluded
Source: `reservations.csv` 31 Oct, `booked_on`, confirmed rows. **No new bookings overnight** (692 rows, as 30 Oct).
**Total: 15 bookings, 70 nights, £12,775.83.** Excluded: P04 Airbnb 28 Sep–2 Oct (£439.20, imported 26 Oct after the stay) and P04 Airbnb 19–20 Dec (1 n, £216.00, same 26 Oct import batch, real booking date UNKNOWN; counting it gives 16 / 71 / £12,991.83). kpi_pack P04 `pickup_7d` (4 / 11 / £1,404.10) includes both.

**Cancellations 25–31 Oct (cancel time = Smoobu `modifiedAt`, GET /api/reservations modified 25 Sep–31 Oct, pulled 31 Oct): 5 real, 32 n, £6,524.18 room, all Booking.com.** P04 20–23 Nov duplicates ×2 (26 Oct) left out; the P20 delivery-block cancellation is not a booking.
**Net 7-day: +38 nights, +£6,251.65.**

| Ref | Pickup 25–31 Oct (bk / n / £) | Cancelled 25–31 Oct (stay, n / £, cancel time) |
|---|---|---|
| P13 | 2 / 16 / £2,909.76 | — |
| P12 | 3 / 13 / £2,519.56 | 22–29 Nov 7 n / £1,314.40 (25 Oct 11:57); 18–22 Nov 4 n / £786.15 (28 Oct 13:27); 4–8 Dec 4 n / £1,116.99 (28 Oct 22:12) |
| P20 | 2 / 14 / £2,476.27 | — (delivery block removed 30 Oct 18:11) |
| P11 | 2 / 6 / £1,221.45 | 28 Nov–12 Dec 14 n / £2,950.82 (27 Oct 11:29) |
| P08 | 2 / 9 / £1,201.60 | duplicate only |
| P05 | 1 / 3 / £893.52 | — |
| P06 | 1 / 3 / £804.77 | — |
| P04 | 2 / 6 / £748.90 (+19–20 Dec, date unknown) | **20–23 Nov 3 n / £355.82 (30 Oct 12:01)**; booked 26 Oct 14:22 |
| P01, P02, P09, P10, P14 | 0 | — |

**P04 20–23 Nov cancellation (overnight fact):** booked 26 Oct 14:22 (the third 20–23 Nov booking that day; the first two were cancelled as duplicates), cancelled 30 Oct 12:01. No P04 Airbnb booking for these dates exists in Smoobu `reservations.csv`. Whether a guest booked 20–23 Nov on the unsynced Barking Airbnb listing 1455876748739910219, and whether 3–6 / 6–9 Nov are still double-sellable there: NOT CHECKED in this section (that listing is outside Smoobu and PriceLabs; channel section). In PriceLabs, 20–22 Nov are open again (£214 / £216 / £204, min 3, `prices.csv` 31 Oct) inside one 7-night open run 18–24 Nov.

### Pace vs STLY (rm.metrics `on_the_books`; cancelled bookings excluded on both sides)
Only **P12 Mile End** has Smoobu stays in the STLY windows.

| P12 measure | 30 Oct | 31 Oct |
|---|---|---|
| Pace30 (stays 31 Oct–29 Nov vs STLY), kpi_pack `pace_30` | −5 n / −11.2% | **16 n / £2,635.85 vs 25 n / £3,674.46 = −9 n / −28.3%** |
| To handback (stays 31 Oct–13 Dec) | −9 n / −23.1% | **20 n / £3,708.29 vs 32 n / £5,384.46 = −12 n / −31.1%** |
| Pace90 (kpi_pack, not handback-aware) | −17 n / −47.9% | 20 n / £3,708.29 vs 44 n / £8,337.16 = −24 n / −55.5% |

- No P12 booking or cancellation since 29 Oct; the slide is the window roll: the booked 30 Oct night left OTB, and STLY gained 29 Nov 2025 stays plus bookings made 30 Oct 2025.
- Pace for every other unit: UNKNOWN (no STLY stays in `reservations.csv`). OTB for stays 31 Oct–29 Nov (kpi_pack `pace_30`, n / £): P01 30 / £4,563.90; P04 16 / £2,062.17; P05 26 / £11,654.52; P06 8 / £1,693.91; P08 11 / £1,453.06; P09 23 / £2,346.31; P10 19 / £2,013.32; P11 11 / £1,944.73; P13 19 / £2,710.44; P20 9 / £1,604.95; P02, P07, P14 0.

### 18 Oct base rises: running effect (rises logged 18 Oct 20:33–20:43Z, PriceLabs `get_user_logs`)
Windows: bookings made **19–30 Oct (12 full days)** vs **4–18 Oct (15 days)**; 31 Oct has none yet. Cancellations split at 18 Oct 20:33Z (Smoobu `modifiedAt`). Confirmed rows, imports excluded, P04 excluded (Smoobu since 20 Oct). **No base_price change logged 30–31 Oct** (`get_user_logs` listing, 30–31 Oct, 35 entries, all date overrides).

| Group | Made 19–30 Oct: bk / n / £ (per day) | Made 4–18 Oct: bk / n / £ (per day) | Post/pre per day (bk / n / £) | Cancelled after rise | Cancelled 4 Oct–rise |
|---|---|---|---|---|---|
| **Raised** (P01, P05, P06, P09, P11, P12) | 10 / 37 / £7,346.31 (0.83 / 3.08 / £612.19) | 13 / 91 / £18,199.03 (0.87 / 6.07 / £1,213.27) | **0.96× / 0.51× / 0.50×** | 6 / 44 n / £9,287.63 (5 booked pre-rise: 40 n / £8,170.64; plus P12 4–8 Dec booked and cancelled post-rise) | 2 / 8 n / £3,179.09 |
| **Unraised** (P02, P08, P10, P14, P20*) | 5 / 26 / £4,207.79 (0.42 / 2.17 / £350.65) | 7 / 68 / £8,054.83 (0.47 / 4.53 / £536.99) | **0.89× / 0.48× / 0.65×** | 0 real | 0 |
| P13 (base 235→250 on 24 Oct, unconfirmed) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.42× / 0.83× / 1.01× | 0 | 0 |

\* P20 base cut 380→350 on 24 Oct (policy).

**Net since the rise (made minus cancelled):** raised **−7 n / −£1,941.32**; unraised +26 n / +£4,207.79; P13 +16 n / +£2,909.76. Unchanged from 30 Oct except the per-day rates, because 30 Oct added a zero-booking day for every group.
**Running line:** nights per day roughly halved in both groups (0.51× raised vs 0.48× unraised); revenue per day fell more in the raised group (0.50× vs 0.65×), partly from the single £4,527.95 P05 booking of 18 Oct in the pre window. Raised flats' net is negative only because of the 40 n of pre-rise Booking.com stays cancelled on P11/P12, which were priced before the rise. Not separable: 24 Oct Booking.com markup cut (+30%→+15%) and Last Minute 10%; Airbnb flexible-cancellation test on P05/P06 from 24 Oct (policy `monitoring`).

### Brief for Monday 2 Nov base review (facts to check, not price proposals)
Base / PriceLabs `recommended_base` from kpi_pack `settings` 31 Oct.
- **P01** (253 / rec 255): 100% next 30 and 100% of non-blocked next 60; 1 post-rise booking (18–21 Dec, £240.30/n). Nothing left to sell before handback 20 Dec; review only whether sold nights were priced low. Class Compressed.
- **P05** (550 / rec 548): 86.2% next 30 (Compressed). Post-rise bookings: 1 (6–9 Nov, £297.84/n, 0.645× the 29 Oct PriceLabs price). **9 Nov now min 1 at £1,442** (Reyhan overrides +100%, +150%, then +300% at 30 Oct 22:09Z; was £426 at min 2): check whether it sells. Open: 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec (1 n, min 1, £1,338).
- **P06** (357 / rec 342): still 0 bookings into 8–14 Nov (7 n, the only sellable run in the next 60; £255–£360, min 2). 1 post-rise booking. Rest blocked on purpose.
- **P09** (176 / rec 176): 88.5% to handback (Compressed). Open: 31 Oct and 10–12 Nov (£142/£147/£153, min 2). 1 post-rise booking.
- **P11** (286 / rec 285): 37.9% next 30 vs market 46% (Soft); 19 of the 22 cancelled nights still open (19 Nov–4 Dec, 8–11 Dec). Reyhan added −2%/−3% overrides on 31 Oct, 10 Nov, 18–19 Nov, 22–25 Nov, 29 Nov–4 Dec, 8–9 Dec, 13–16 Dec (30 Oct 22:05–22:07Z). Look at pickup on 18 Nov–4 Dec and 8–18 Dec under the 18% Visibility Booster (policy).
- **P12** (284 / rec 273): pace30 **−28.3%** (−9 n), to handback −12 n / −31.1%; 51.7% next 30 (Soft). Open: 1–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov–2 Dec, 7–13 Dec. 11 of 24 released nights rebooked, 13 open. Any further cancellations of the September Booking.com cohort.

### Per-property table
Occ30/ADR30/RevPAR30: kpi_pack `last30` (1–30 Oct). Fwd occ30: 1–29 Nov, Smoobu truth on the `prices.csv` calendar, handback-aware; market `pl_kpis.csv`. Pace30: stays 31 Oct–29 Nov. Pickup 7d: made 25–31 Oct, imports excluded.

| Ref | Area | Occ30 | ADR30 | RevPAR30 | Fwd occ30 (mkt) | Pace30 Δ | Pickup 7d (bk / n / £) | Class |
|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 100.0% | £162.31 | £162.31 | 100% (34%) | UNKNOWN: no STLY | 0 / 0 / £0 | **Compressed** |
| P02 | Ladbroke Grove | 86.7% | £112.25 | £97.29 | all blocked (47%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P03 | Bayswater | UNKNOWN: not in Smoobu | UNKNOWN | UNKNOWN | UNKNOWN: calendar unlabelled (49%) | UNKNOWN | UNKNOWN | Not classified: blocked on purpose |
| P04 | Barking | UNKNOWN: Smoobu since 20 Oct | UNKNOWN | UNKNOWN | 51.7% (24%) | UNKNOWN: no history | 2 / 6 / £748.90 | **Soft** (fwd30 < 60%); was Unclassifiable |
| P05 | St John's Wood | 63.3% | £402.38 | £254.84 | 86.2% (40%) | UNKNOWN | 1 / 3 / £893.52 | **Compressed** |
| P06 | Marylebone | 80.0% | £201.82 | £161.46 | 50.0% of non-blocked (45%) | UNKNOWN | 1 / 3 / £804.77 | Not classified: blocked on purpose |
| P07 | Woolwich | 0.0% | UNKNOWN: 0 nights | £0.00 | all blocked (24%) | UNKNOWN | 0 / 0 / £0 | Not classified: blocked on purpose |
| P08 | Islington | 96.7% | £160.30 | £154.96 | 76.9% to 13 Nov (49%) | UNKNOWN | 2 / 9 / £1,201.60 | Unclassifiable (60–85%, no STLY) |
| P09 | Greenwich | 80.0% | £119.71 | £95.76 | 88.5% to 26 Nov (36%) | UNKNOWN | 0 / 0 / £0 | **Compressed** |
| P10 | Ealing / Hanger Lane | 83.3% | £109.76 | £91.47 | 100% to 18 Nov (28%) | UNKNOWN | 0 / 0 / £0 | **Compressed** |
| P11 | Camden | 86.7% | £177.07 | £153.46 | 37.9% (46%) | UNKNOWN | 2 / 6 / £1,221.45 | **Soft** |
| P12 | Mile End | 86.7% | £190.07 | £164.73 | 51.7% (40%) | **−9 n / −28.3%** | 3 / 13 / £2,519.56 | **Soft** (both tests) |
| P13 | Shepherd's Bush (one flat) | 86.7% | £155.31 | £134.60 | 65.5% (41%) | UNKNOWN | 2 / 16 / £2,909.76 | Unclassifiable (60–85%, no STLY) |
| P14 | Primrose Hill (special setup) | 0.0% | UNKNOWN: 0 nights | £0.00 | 0% (41%) | UNKNOWN | 0 / 0 / £0 | **Soft** (numbers only, per policy) |
| P15–P19 | Bow, Little Venice, St John's Wood, Fulham, Kings Langley | UNKNOWN: not mapped | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | Unclassifiable |
| P20 | Canary Wharf (Waterford) | 60.0% | £162.34* | £97.41* | 31.0% (37%) | UNKNOWN | 2 / 14 / £2,476.27 | **Soft** |

\* P20 18–22 Oct extension paid separately (policy `separate_payments`): ADR30/RevPAR30 understated.
**Classes:** Compressed 4 (P01, P05, P09, P10); On track 0; Soft 5 (P04, P11, P12, P14, P20); Unclassifiable 7 (P08, P13, P15–P19); policy-blocked 4 (P02, P03, P06, P07). Change since 30 Oct: **P04 → Soft** (62.1% → 51.7%).

**Last 365 nights** (kpi_pack `last365`, 31 Oct 2025–30 Oct 2026; occ / ADR / RevPAR / revenue): P01 38.4% / £178.04 / £68.29 / £24,925.63; P02 79.7% / £128.59 / £102.52 / £37,418.99; P05 56.2% / £373.66 / £209.86 / £76,600.49; P06 34.5% / £238.06 / £82.18 / £29,995.09; P07 11.5% / £133.90 / £15.41 / £5,623.70; P08 38.9% / £175.56 / £68.30 / £24,929.57; P09 39.2% / £115.61 / £45.30 / £16,532.84; P10 37.5% / £114.48 / £42.97 / £15,683.23; P11 77.3% / £174.42 / £134.76 / £49,186.73; P12 81.9% / £191.59 / £156.95 / £57,285.96; P13 77.8% / £158.31 / £123.18 / £44,960.94; P14 2.7% / £409.84 / £11.23 / £4,098.40; P20 4.9% / £162.34 / £8.01 / £2,922.16. P03, P04, P15–P19 UNKNOWN.

**Booking profile** (kpi_pack `booking_profile`; bookings / median lead d / median LOS n / channel revenue share): P01 21/15/5 Airbnb 80.4%, Website 13.0%, Booking.com 6.6%; P02 71/34/4 Airbnb 53.8%, Booking.com 43.0%, Direct 3.2%; P04 5/8/3 Airbnb 54.9%, Booking.com 45.1% (includes the past-stay import); P05 60/44/4 Airbnb 100%; P06 31/15/4 Airbnb 72.4%, Booking.com 27.6%; P07 5/3/4 Airbnb 100%; P08 22/15/6 Airbnb 77.3%, Booking.com 22.7%; P09 25/21/5 Airbnb 58.4%, Booking.com 40.1%, Direct 1.5%; P10 22/12/5 Airbnb 69.3%, Booking.com 27.6%, Website 3.1%; P11 70/28/4 Booking.com 53.1%, Airbnb 44.9%, Agoda 2.0%; P12 83/31/4 Booking.com 89.8%, Airbnb 10.2%; P13 84/21/3 Booking.com 51.5%, Airbnb 47.6%, Agoda 0.9%; P14 1/57/10 Airbnb 100%; P20 5/6/4 Airbnb 100%.

### Orphan gaps (prices.csv 1 Nov–30 Dec + Smoobu confirmed stays; P13 one calendar; handbacks respected; P02/P03/P07 out)
- **P20 1 Nov** (1 n in window, min 2, £232): 31 Oct is unbooked in Smoobu (31 Oct not in `prices.csv`), 2–6 Nov booked. Sellable tonight only as 31 Oct–2 Nov; **becomes a 1-night orphan below min 2 from tomorrow.**
- **P05 9 Nov:** no longer an orphan by rule (min 1 since Reyhan's 30 Oct 22:09Z override) but priced £1,442 (+300%). Plan item a-p05-9nov: min-1 part done; the price is for the strategy director.
- **P04 1–2 Nov reopened** (was closed/unlabelled 30 Oct): 2 n between the 26 Oct–1 Nov and 3–6 Nov stays, min 2, £231 (Reyhan overrides +25% then +50%, min 2, 30 Oct 22:12Z). Policy `price_changes` 24 Oct: P04 "never open for fewer than 3". **Conflict for Corentin to confirm**, not a new proposal.
- **P04 20–22 Nov reopened** by the cancellation: part of the open run 18–24 Nov (7 n, min 3; Reyhan −3% min 3 on 18–24 Nov, 30 Oct 22:12Z). Not an orphan. The previous min-2 runs at 18–19 and 23–24 Nov are gone (min now 3 there).
- Runs at min stay (bookable, not orphans): P04 2 Dec (settled by policy); P05 16–17 Nov, 7–8 Dec (min 2), 29 Dec (min 1); P12 12–13 Nov (min 2); P11 23–25 Dec (min 3); P13 17 Nov, 27 Nov (min 1), 1 Dec (policy).

### Gaps to fill
- **P11:** 1–2 Nov, 10–13 Nov, 18 Nov–4 Dec (17 n), 8–18 Dec (11 n). 37.9% vs market 46%.
- **P12:** 1–4 Nov, 12–13 Nov, 17–20 Nov, 26 Nov–2 Dec, 7–13 Dec. Pace30 −28.3%.
- **P20:** 1 Nov, 6–24 Nov (19 n, now incl. 20–21 Nov), 5–30 Dec. 31.0% vs 37%.
- **P04:** 1–2 Nov (policy conflict), 9–13 Nov (5 n), 18–24 Nov (7 n), 6–18 Dec (13 n). 51.7% next 30.
- **P06:** 8–14 Nov, only sellable run in the next 60.
- **P13:** 31 Oct–3 Nov, 8–12 Nov, 7–26 Dec (20 n).
- **P05:** 9 Nov (£1,442, min 1), 29 Nov–2 Dec, 13–21 Dec.

Data gaps:
- Pace vs STLY UNKNOWN for all units except P12 (no STLY stays in `reservations.csv`; P03, P04, P15–P19 no history). P12 pace90 not handback-aware. STLY excludes later-cancelled bookings.
- Last 30/365 UNKNOWN for P03 (not in Smoobu), P04 (Smoobu since 20 Oct), P15–P19 (not mapped); last-365 occupancy understated (365-day denominator).
- Market: last-30 market occupancy UNKNOWN (`pl_kpis.csv` has none; kpi_pack `missing.market` empty); ARI/RGI UNKNOWN (`comps` empty).
- Forward: 31 Oct (tonight) not in `prices.csv`; P03 calendar unlabelled; P15–P19 no prices rows.
- Pickup: real booking date of P04 19–20 Dec UNKNOWN (26 Oct import batch); kpi_pack P04 `pickup_7d`/`booking_profile` include the past-stay import.
- Cancellations: no cancel date in `reservations.csv` (Smoobu `modifiedAt` used, timezone not stated); rate plan and any fee retained on P11/P12/P04 cancellations UNKNOWN.
- P04 20–23 Nov: cause of cancellation and any booking on unsynced Airbnb 1455876748739910219 NOT CHECKED here; 3–6 / 6–9 Nov double-sell status NOT CHECKED here.
- P20 20–22 Nov delivery block removal: actor and reason UNKNOWN (Corentin to confirm).
- Base-rise analysis: P13 base 235→250 (24 Oct) not in policy, unconfirmed; P20 base cut not in PriceLabs base_price log.

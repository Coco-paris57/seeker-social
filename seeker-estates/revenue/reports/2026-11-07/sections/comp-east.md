# Competitor positioning: EAST batch (D = 2026-11-07)

Batch: P01, P04, P07, P09, P12, P15. P07 is blocked on purpose (policy), so it is not analysed. P15 has no listing of ours and is reference only. Nights after a handback date are not inventory (policy `handbacks`).

**Method**
- **Comp ids.** Same set as 6 Nov (`data/snapshots/2026-11-06/comps.csv`). Every stored comp was returned for at least one stay today, so **no comp went inactive and none was replaced**. 1384811870668527117 stays dropped from P01, as recorded 6 Nov. Counts: P01 11, P04 7, P09 6, P12 7 (6 priced; 29297702 shows a placeholder-like £1,035-1,047 and is excluded from medians), P15 7.
- **Access.** Public Airbnb pages (HTTP 200) using the same scripts and boxes as 26 Oct-6 Nov:
  - 4 guests for 2-beds and 3 for 1-beds.
  - Search boxes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the others.
  - 66 wide searches, plus 318 comp/stay checks in a 0.3 km box (`*` in tables). 299 of those checks were not returned (booked or min-stay).
  - **Booking.com not tried.**
- **Price basis.** Airbnb **guest-paid all-in total / nights**: after discounts, with cleaning and Airbnb fees **included**. Airbnb shows no separate taxes. Ours are priced the same way.
  - PriceLabs and Smoobu figures are **room only, cleaning excluded**.
- **Stays.**
  - Trend stays: 10-12 Nov (Tue-Thu), 13-15 Nov (next Fri-Sun), 24-27 Nov, 1-3 Dec, 4-6 Dec, 7-9 Dec (30 days out).
  - Open-night stays from `prices.csv` + `reservations.csv` + a Smoobu rates GET (7 Nov 07:23Z):
    - **P09:** 8-10, 9-11, 10-12, 11-13, 8-11, 9-12, 10-13, 8-13 Nov.
    - **P12:** 12-14, 17-19, 18-20, 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec, 2-4 Dec; 7-10, 7-11, 9-11 Dec; 11-13 Dec (booked, comps only).
    - **P04:** 9-12, 10-13, 11-14, 9-14, 18-21, 20-23, 21-24, 18-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20, 6-13 Dec. Also 7-9, 7-10 and 8-11 Nov for the unsynced-listing double-sell check.
- **Reference bands (not comps).** Every Airbnb listing in the same searches with the same bedroom count, 10+ reviews, inside the radius, excluding ours:
  - **P12:** 2BR within 1.3 km.
  - **P09:** 1BR within 1.8 km. Band listings 1.35-1.73 km away are outside the ~1 km rule and count as evidence only. Band sleeps are NOT CHECKED.
- **Data written.** `data/snapshots/2026-11-07/comps.csv` did not exist. It was copied forward from 6 Nov (6,376 data rows) under `flock` on `.comps.csv.lock`, then **759 rows were appended** under the same lock:
  - 473 `comp-east`: every stored comp x its stays, NOT RETURNED rows kept.
  - 156 `east-refband`: the P12 and P09 bands.
  - 130 `east-ours`: our Airbnb all-in on the same stays, the unsynced P04 listing, and Smoobu room rates with the matching PriceLabs price/user_price for every open night of P09, P04 and P12 quoted below. None of the `east-ours` rows are comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 6-7 Nov): **0 entries** on any listing. The 5-7 Nov pull returns only Reyhan's 5 Nov 10:53-10:57Z edits, already reported 6 Nov.
  - `get_neighbourhood_data` for P12, P09 and P04: all `all_operations_ok`.
- **Smoobu (GET only):** one rates GET for 3318172, 2699998 and 3562176, 7 Nov-20 Dec. No guest data read.

## What changed since 6 Nov 06:00Z (this batch)
- **No PriceLabs edits** on P01/P04/P09/P12 (`get_user_logs`). **No new, changed or cancelled reservations** on P01/P04/P09/P12 (`reservations.csv` 6 vs 7 Nov, full-row diff).
- **Smoobu now sells the PriceLabs price on every open night checked** (Smoobu GET 7 Nov 07:23Z = `prices_*.json` `price`, 7 Nov raw):
  - P09 8-10 Nov: **£113 / £110 / £111** (was £100 x 3).
  - P04 9-11 Nov: **£157 / £157 / £158** (was £140 x 3).
  - The 6 Nov 08:48Z PriceLabs refresh/push put these through.
- **Gap between pushed price and "Your Price":**
  - **P09 8-10 Nov:** PriceLabs `user_price` / `booked_price` (the "Your Price" column) now reads **£100** while `price` (pushed) is 113/110/111 (raw `prices_3318172.json`, refreshed 2026-11-06T08:48:45Z).
  - **P04 9-11 Nov:** the same pattern, `user_price` 140 vs price 157/157/158.
  - **P12:** the gap reversed. 30 Nov-3 Dec is pushed at **260/266/277/284**, *below* Your Price 274/281/278/286. 7-10 Dec is pushed at 272/274/288/293 vs Your Price 259/264/273/278 (raw `prices_2699998.json`, refreshed 2026-11-07T06:55:28Z).
  - Cause: NOT CHECKED (PriceLabs section).
- **P12 December nights rose with no edit.** PriceLabs 7-10 Dec went from 253/249/257/275 (6 Nov raw) to **272/274/288/293** (+7.5% to +10%). Uncustomized also rose (274/267/279/304 -> 314/305/326/333), so the move is the algorithm, not a setting.
  - Airbnb all-in moved with it: 7-10 Dec £278 -> **£300.33**; 9-11 Dec £302 -> **£324**.
- **Comps are flat.** The median same-comp, same-stay change vs 6 Nov is **0.0% on every stay**. Moves over £5:
  - P01: 41905186 24-27 Nov 461.67 -> 447.67, 4-6 Dec 602 -> 560; 1316210326145130709 10-12 Nov 349.50 -> 330.
  - P12: 1670196516322802487 10-12 Nov 175 -> 160; 1383544079404594066 -£7-8 on 18-20 Nov, 17-21 Nov and 7-11 Dec.
  - P04: 1577633201778145138 6-9 Dec +£10; 1387112821878102742 6-9 Dec +£6.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 7 Nov)
| Ref | Band (n) | P25/P50/P75/P90 today | 6 Nov | Market occ 30 / 60 (`pl_kpis.csv` 7 Nov) | Our average PriceLabs room price on open nights, NL percentile |
|---|---|---|---|---|---|
| P04 | 2BR (90) | 140/174/217/263 | 139/172/217/261 | 24% / 20% | Next 14 days £160.6 (8 n) **P40**; Nov £169.6 (12 n) P47; Dec £190.7 (14 n, excl. deprioritised 2 Dec) **P60** |
| P09 | 1BR (126) | 110/133/160/203 | 109/132/158/203 | 36% / 31% | 8-12 Nov £115.0 (5 n) **P30**; nothing else before the 26 Nov handback |
| P12 | 2BR (120) | 172/205/238/295 | 170/203/234/292 | 42% / 34% | Next 14 days £248.8 (5 n) **P78**; 26 Nov £323 **>P90**; 30 Nov-3 Dec £271.8 **P84**; 7-10 Dec £281.8 **P87** |
| P01 | not re-pulled (no sellable nights) | | | 35% / 29% | none |

- `occ_insights` demand rises:
  - P09 market 7-10 Dec +9.4% (after the handback).
  - P04 3-5 Dec +7.4% (we are booked).
  - All three markets 27 Dec-1 Jan +16-18%.
- `fp_insights`: market price surge 26/27-31 Dec, +12% to +25%.
- The bands are market bands, not comps. PriceLabs does not state their horizon or whether they include cleaning.

## Priority 1: P09 Torrent Lodge 8-12 Nov (last unsold nights before the 26 Nov handback). Is a £100 floor justified?
- **On sale now** (Smoobu GET 7 Nov 07:23Z, room only, min 2):
  - 7 Nov £132 (tonight; can only sell as part of 7-9 Nov, and that stay was not priced).
  - **8-12 Nov £113 / £110 / £111 / £116 / £125 = £575 for 5 nights.**
  - 13-26 Nov is booked (`reservations.csv`). PriceLabs labels the nights "Low Demand".
- **PriceLabs inputs** (raw `prices_3318172.json`, 2026-11-06T08:48:45Z):
  - The "Your Price" column for 8-10 Nov already reads **£100**.
  - Uncustomized price 104/107/110.
  - The listing minimum is £100 (`listings.csv` pl_min).

Airbnb all-in £/night, checked 7 Nov. "Stored" = the 6 kept P09 comps. "Band" = every 1BR with 10+ reviews within 1.8 km.

| Stay | Ours today (6 Nov) | Stored median (n), pctl, vs | Band median (n), P25, pctl, vs |
|---|---|---|---|
| 8-10 Nov (Sun-Tue) | 144.50 (136) | 162.50 (2), P0, -11.1% | **134 (4)**, 133.50, **P75, +7.8%** |
| 9-11 Nov | 143.50 (136) | 162.75 (2), P0, -11.8% | 161.50 (5), 139.50, P40, -11.1% |
| 10-12 Nov (trend) | 146 (141.50) | 164 (3), P0, -11.0% | 175.25 (8), 161.50, P25, -16.7% |
| 11-13 Nov | 151 (151) | 164 (3), P0, -7.9% | 175.25 (8), 161, P25, -13.8% |
| 8-11 Nov (3 n) | 123.67 | 161 (3), P0, -23.2% | 158.33 (5), 134.67, P0, -21.9% |
| 9-12 Nov (3 n) | 124.67 | 161 (3), P0, -22.6% | 161 (7), 138.67, P0, -22.6% |
| 10-13 Nov (3 n) | 128.33 (125.67) | 178.83 (4), P0, -28.2% | 175.67 (7), 138.67, P0, -26.9% |
| 8-13 Nov (5 n) | 110.20 (£551) | 153.60 (3), P0, -28.3% | 153.60 (5), 150.80, P0, -28.3% |

- **Positioning.**
  - `quality_premium` = 0.0 (5.0 from 3 reviews, below the 5-review threshold). Comp median rating 4.58; review gap -21.5.
  - **Supported: parity to -5% vs the band median.**
- **Answer on the £100 floor.** Only 8-9 Nov (Sun and Mon nights, 1-2 days out) is supported:
  - The 8-10 Nov stay is the one stay above the band median (+7.8%, P75; n=4).
  - At £100 + £100 room, the all-in would be about £133 a night: our 7 Nov Airbnb total £289 minus the £223 room = £66 of fees and cleaning, added to £200. That is the band median, -1% (inside the supported range).
- **10-12 Nov: hold at £111 / £116 / £125.** Every stay touching those nights is already at -11% to -17% vs the band and P0 vs the stored set. Taking them to £100 would push 2-night stays further below every comp, which the evidence does not support. Price is not what is keeping 10-12 Nov empty.
- **3- to 5-night stays: leave as they are.** They already sell at -22% to -28% (Airbnb stay rules on P09 are deprioritised in policy; not re-raised). The 8-13 Nov total of £551 all-in is the best single fill.
- `recommend` (comp, 8 stays, median P0): raise +10%. NL (P30): raise +10%. Booked 74% vs market 36% (7 Nov-6 Dec window, handback-aware). This is a demand signal from nights already sold. For 5 unsold nights with 1-5 days' lead, the band says hold, not raise. The "raise" is not adopted.

## Priority 2: P12 Mile End trim proposal (26 Nov, 30 Nov-4 Dec, 7-11 Dec)
- `quality_premium` = **-0.15** (cap): 4.27 from 15 reviews vs comp median 4.86 (19 reviews, gap -4). **Supported: -15% to 0% vs the band median.**
- The 11-13 Dec Booking.com booking (room £256.91/night, reported 6 Nov) still shows the band median sells in December. Today's 11-13 Dec band median is £337.50 (n=7), so that booking sits at about band P0-P25.

| Stay | Ours today (6 Nov) | PriceLabs room / Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Trim to band median |
|---|---|---|---|---|---|
| 12-14 Nov | 237 (252) | 212 / 244 | 244 (4), P50, -2.9% | 217.50 (1), P100, +9.0% | hold |
| 17-19 Nov | 250 (253) | 242 / 247 | 217 (10), P60, +15.2% | 245.75 (4), P50, +1.7% | hold (17 Nov deprioritised) |
| 18-20 Nov | 256.50 (256.50) | 247 / 260 | 217 (8), P75, +18.2% | 245.75 (4), P75, +4.4% | hold to -5% |
| 17-21 Nov | 234.50 (234) | 242-281 | 219.13 (10), P60, +7.0% | 233.25 (6), P50, +0.5% | hold |
| **26-27 Nov (1 n)** | **373 (367)** | **323** / 323 (uncust. 310) | 284 (3), **P100, +31.3%** | 284 (1), P100 | **about -24%: £241-284 all-in** |
| **30 Nov-3 Dec** | 255 (254) | 260/266/277 | 224 (15), P67, **+13.8%** | 237.83 (6), P67, +7.2% | **about -12%** |
| **30 Nov-4 Dec** | 245.50 (244.75) | 260/266/277/284 | 221.75 (14), P71, **+10.7%** | 268.88 (4), P50, -8.7% | **about -10%** |
| 1-3 Dec (trend) | 270.50 (269.50) | 266/277 | 237.50 (11), P64, +13.9% | 245.75 (4), P75, +10.1% | about -12% |
| 2-4 Dec | 277.50 (276) | 277/284 | 240.50 (11), P73, +15.4% | 280 (2), P50, -0.9% | about -13% |
| **7-10 Dec** | **300.33 (278)** | **272/274/288** | 230.50 (14), **P86, +30.3%** | 225 (3), P67, +33.5% | **about -23%** |
| **7-11 Dec** | **291.25 (270.25)** | 272/274/288/293 | 227.25 (14), **P86, +28.2%** | 220 (3), P67, +32.4% | **about -22%** |
| 9-11 Dec | 324 (302) | 288/293 | 243 (11), P82, +33.3% | 237.50 (3), P67, +36.4% | about -25% |
| 7-9 Dec (30 days out) | 308.50 | 272/274 | 238.25 (10), P90, +29.5% | 237.50 (3), P67, +29.9% | about -23% |

"Trim to band median" = band median / our all-in - 1. Because the cleaning fee is fixed, the room-price cut needed is a few points larger than shown. The exact room-price cut is NOT CHECKED (P12 Airbnb cleaning fee and stay rules not read today).

- **Supported positioning (the trim proposal, a-p12-trim):**
  - **26 Nov:** cut from £323 to about **£230-270 room** (£241-284 all-in, -15% to 0% vs the 1-night band, n=3). t-p12-26nov-price is **NOT fixed**: it went up overnight (£316 -> £323 room).
  - **30 Nov-4 Dec: trim about 10-15%**, to about **£225-245 room/night** (band median or a little under; currently 260-284).
  - **7-11 Dec: trim about 20-25%**, to about **£215-230 room/night** (currently 272-293). This is the larger gap today: PriceLabs raised 7-10 Dec by 7.5-10% overnight with no edit, while comps did not move.
  - **12-21 Nov: hold**, at -3% to +18% vs the band and at the stored median.
- `recommend`:
  - 30-day: raise +10% (booked 64% vs market 42%; comp P67 over 9 stays). NL: raise +5% (P82).
  - 60-day (to the 13 Dec handback; 33% booked vs 34%): **hold** (comp P67, NL P87).
  - Why the raise is not adopted: its demand lead comes from nights already booked. The open nights sit at band P67-P90 with a 0.59-star rating deficit and a quality cap of -15%.
- **Smoobu = PriceLabs on all P12 open nights** (GET 7 Nov 07:23Z). Any trim has to be made in PriceLabs.

## Priority 3: P04 Barking, November and December
- `quality_premium` = **-0.15** (cap): synced listing 4.11 from 9 reviews vs comp median 4.85 (27 reviews, gap -18). **Supported: about -15% vs comp median.**
- The stored set is thin (n = 1-4 per stay), so read individual stays loosely.

| Stay | Ours today (6 Nov) | Smoobu room (= PriceLabs) | Comp median (n) | Pctl | vs median |
|---|---|---|---|---|---|
| 9-12 Nov | 168 (154.67) | 157/157/158 | 187.33 (3) | P33 | -10.3% |
| 10-13 Nov | 168.33 (159.33) | 157/158/159 | 222 (3) | P33 | -24.2% |
| 11-14 Nov | 169.33 (164.67) | 158/159/161 | 239.84 (2) | P0 | -29.4% |
| 9-14 Nov (5 n) | 156.80 | 157-161 | 251.60 (1) | P0 | -37.7% |
| 18-21 Nov | 173.33 (173.33) | 161/162/170 | 239.84 (2) | P0 | -27.7% |
| 20-23 Nov | 183.67 (190.67) | 170/172/192 | 207.17 (2) | P50 | -11.3% |
| 21-24 Nov | 189.67 (196.33) | 172/192/193 | 202.17 (2) | P50 | -6.2% |
| 18-25 Nov (7 n) | 151.43 (154.14) | 161-193 | 177.72 (2) | P50 | -14.8% (weekly 15% applies, policy) |
| 6-9 Dec | 215.33* (213.67) | 188/187/185 | 210.34 (4) | P50 | +2.4% |
| 9-12 Dec | 218.67 (217.33) | 184/190/197 | 222 (3) | P33 | -1.5% |
| 11-14 Dec | 222.67 (221.33) | 197/200/187 | 213.84 (2) | P100 | +4.1% |
| 14-17 Dec | 215.33 (213.67) | 184/186/189 | 241 (4) | P25 | -10.7% |
| 17-20 Dec | 225.33 (225) | 190/199/204 | 241 (2) | P50 | -6.5% |
| 6-13 Dec (7 n) | 160.71 (159.43) | 184-200 | 186.79 (2) | P0 | -14.0% (weekly 15%, policy) |

- **November:**
  - The median November stay sits at about **-20%** vs comp median (range -6% to -38%), a little under the supported -15%. Weekends 20-24 Nov sit at -6% to -11%; midweek 9-14 and 18-21 Nov at -10% to -38%.
  - NL: next 14 days P40, November P47.
  - **Supported: hold. No further cut.** The n=1-3 midweek gaps are too thin, and 9-13 Nov too close, to justify a rise.
  - Reyhan's -7% (9-24 Nov) vs Corentin's standing -8% (1-25 Nov) is still open for **Corentin to confirm** (no edit since 5 Nov). The comp evidence fits either.
  - The 9-11 Nov £140 issue is fixed: Smoobu now sells 157/157/158.
- **December:**
  - Stays sit at **-11% to +4%** vs comp median (median about -6.5%), above the -15% quality-adjusted parity. NL P60.
  - **Supported: hold.** `recommend` says raise +10% (comp P42, booked 48% vs market 20%). The quality cap and n=2-4 do not support a rise.
  - 2 Dec (+200%, min 1) is deprioritised in policy and not raised.
- `recommend` 30-day: raise +10% (booked 56% vs 24%; comp P33 over 10 stays; NL P47). Not adopted, for the same reasons as December.

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (7 Nov-6 Dec / 7-31 Dec), with `quality_premium`. A rating needs 5+ reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (booked to 30 Nov; gap block 30 Nov-17 Dec; 18-20 Dec booked; handback 20 Dec) | 309.84-517 (n 1-8) | n/a | 4.75 vs 4.80 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 35% / 29% | raise-signal (no open nights) | nothing to sell |
| P04 (synced 1657…) | 151.43-225.33 | 177.72-251.60 (n 1-4) | P0-P100; -37.7% to +4.1% | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 56% / 48% vs 24% / 20% | raise +10% (P33) / raise +10% (P42); NL P47 / P60 | about -15%: hold November (about -20%, no further cut); hold December (-11% to +4%) |
| P04 unsynced 1455… | **sells 7-10 Nov (£518) and 8-11 Nov (£519)** | | | 4.69 | 26 | n/a | | | close it (below) |
| P09 | 110.20-151 (8-13 Nov) | stored 153.60-178.83 (n 2-4); band 134-175.67 (n 4-8) | stored P0; band P0-P75 | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 74% vs 36% / handback | raise +10% (P0) / n/a | parity to -5% vs band: **£100 on 8-9 Nov only**; hold 10-12 Nov |
| P12 | 234.50-373 | band 217-284 (Nov), 221.75-243 (Dec) | band P50-P100 (Nov), P64-P90 (Dec) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 64% / 33% vs 42% / 34% | raise +10% (P67) / hold (P67); NL raise +5% (P82) / hold (P87) | -15% to 0% vs band: 26 Nov about -24%; 30 Nov-4 Dec about -10-15%; 7-11 Dec about -20-25%; hold 12-21 Nov |
| P15 | no listing of ours | 146-181 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Critical / high findings
- **CRITICAL: P04 double-sell exposure, day 8 (t-p04-doublebook NOT fixed).**
  - The unsynced Airbnb listing **1455876748739910219** is bookable today for **7-10 Nov (£518 total)** and **8-11 Nov (£519)**.
  - The synced listing's Airbnb guest is in residence 6-9 Nov (`reservations.csv` 7 Nov). The synced 1657859794156786222 correctly shows neither stay.
  - 1455 is also open on every P04 open run (9-14 Nov, 18-25 Nov, 6-20 Dec) at £169-232 a night.
  - **Corentin: close 7-9 Nov on 1455 now, or unlist it.**
- **HIGH: P12 7-11 Dec is +28% to +33% vs the band (P82-P90)**, up from +11-17% yesterday. PriceLabs raised 7-10 Dec by 7.5-10% overnight with no edit, while comps were flat.
  - Supported level: about **£215-230 room/night** (trim about 20-25%). 30 Nov-4 Dec: trim about 10-15%.
- **HIGH: P09 8-12 Nov, 5 nights / £575 room unsold, 1-5 days out.**
  - Supported: **£100 room on 8-9 Nov only** (all-in about £133, band median). Hold 10-12 Nov, which is already -11% to -17% vs the band.
  - Smoobu is no longer at £100: it now sells £113/110/111.
- **MEDIUM: P12 26 Nov £373 all-in, P100, +31%** (n=3), up £6 overnight. Supported £241-284 all-in.
- **MEDIUM (for Corentin to confirm, not a proposal): P04 9-24 Nov -7% (Reyhan, 5 Nov) vs standing -8% on 1-25 Nov.** Unchanged; the evidence fits either.

## Plan items in this batch (status 7 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook | **NOT fixed** (day 8). 1455 sells 7-10 and 8-11 Nov over a stay in residence. |
| t-smoobu-below-pl (P09 8-10, P04 9-11 Nov) | **Fixed.** Smoobu = PriceLabs price (P09 113/110/111; P04 157/157/158), GET 7 Nov 07:23Z. "Your Price" in PriceLabs now reads 100 (P09) and 140 (P04) on those dates; cause NOT CHECKED. |
| t-pl-push-fresh (P04, P09) | P04 and P09 last refreshed/pushed 6 Nov 08:48Z (raw / `listings.csv` last_push). Nothing on 7 Nov yet. P12 and P01 refreshed 7 Nov. |
| t-p09-cancel / a-handback-lastnights (P09) | 8-12 Nov still open, no pickup. Comp evidence: £100 on 8-9 Nov only. |
| a-p12-trim | **Not done** (no edit). The case is stronger today: 7-11 Dec +28-33% vs band. |
| t-p12-26nov-price | **NOT fixed** (£323 room, £373 all-in, P100). |
| a-raise-1012nov (this batch) | Not supported for P09 or P04 on 10-12 Nov: both sit below comp medians with nights unsold 3-5 days out. |
| Base changes | None on P01, P04, P09 or P12 (`get_user_logs` 6-7 Nov: 0 entries). |

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-07.
- "6 Nov x" = the same comp and stay on 6 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-07/comps.csv`.
- Lift, view and parking come from listing-page amenity reads (25 Oct-5 Nov). Comp cancellation policies are NOT CHECKED.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 193.33 | – | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 392 | 517 | 447.67 (6 Nov 461.67) | 409 | 560 (6 Nov 602) | 375 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.46 (155) | none listed | 181.50 | – | 192 | 200.50 | – | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | 330 (6 Nov 349.50) | – | 345.67 (6 Nov 349) | – | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255* | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 405 | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 | – |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | 285 | – | – | 335 | – | 335 |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | 360 | – | – | 416 | 478 | 472 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **330** (5) | **517** (1) | **309.84** (8) | **407** (6) | **478** (3) | **355** (4) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 7 Nov-9 Nov | 7 Nov-10 Nov | 8 Nov-11 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 11 Nov-14 Nov | 9 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 251.60 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 106.43 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | – | 137 (6 Nov 138.67) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | 325 | 248.33 | – | – | 295 | – | – | – | – | – | – | – | – | – | – | – | 303.33 (6 Nov 293.33) | 293.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222* | 222 | – | 222 | – | 222 | – | – | – | – | 222 | 222 | – | 222 | – | – | – | 222* | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 145.50 | – | 137 | – | – | 187 | – | – | 136.67 | 136.67 | 136.67 | – | – | – | 156.67 | 146.67 | – | 184 (6 Nov 178) | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | 204 | – | 193.33 | 210 | – | 217 | – | – | – | 187.33 | – | – | – | – | – | – | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **168** | **168.33** | **169.33** | **156.80** | **173.33** | **183.67** | **189.67** | **151.43** | **215.33*** | **218.67** | **222.67** | **215.33** | **225.33** | **160.71** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 172.67 | 173 | 179.67 | 186 | 193 | 169.40 | 175.33 | 180.67 | 179.67 | 171.86 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **204** (3) | **273.50** (2) | **193.33** (5) | **216** (2) | n/a (0) | **219.50** (4) | n/a (0) | **257.67** (1) | **197.17** (2) | **187.33** (3) | **222** (3) | **239.84** (2) | **251.60** (1) | **239.84** (2) | **207.17** (2) | **202.17** (2) | **177.72** (2) | **210.33** (4) | **222** (3) | **213.83** (2) | **241** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | P33 (-10.3%) | P33 (-24.2%) | P0 (-29.4%) | P0 (-37.7%) | P0 (-27.7%) | P50 (-11.3%) | P50 (-6.2%) | P50 (-14.8%) | P50 (+2.4%) | P33 (-1.5%) | P100 (+4.1%) | P25 (-10.7%) | P50 (-6.5%) | P0 (-14.0%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Nov-10 Nov | 9 Nov-11 Nov | 11 Nov-13 Nov | 8 Nov-11 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 8 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 164* | 164 | 164 | 161 | 161 | 161 | 153.60 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161.50 | 161 | – | – | – | 161 | 161 | 161.50 | 161 | 158.33 | 158.33 | 158.33* | 150.80 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | – | 149 (6 Nov 154) | – | 190 | – | – | – | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | 200.50 | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | – | – | 200.50 | – | – | 196.67 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 231.50* (6 Nov 225.50) | – | – | – | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67 | – | – | – | – | – | – | 244 | 244 | 244 | 230 |
| **Ours** | | | | | **146** | not bookable | not bookable | not bookable | not bookable | not bookable | **144.50** | **143.50** | **151** | **123.67** | **124.67** | **128.33** | **110.20** |
| **Comp median (n)** | | | 4.58 (24.5) | | **164** (3) | **164** (3) | **219.67** (2) | **231.50** (3) | **248.50** (1) | **177** (4) | **162.50** (2) | **162.75** (2) | **164** (3) | **161** (3) | **161** (3) | **178.83** (4) | **153.60** (3) |
| **Our pctl (vs median)** | | | | | P0 (-11.0%) | – | – | – | – | – | P0 (-11.1%) | P0 (-11.8%) | P0 (-7.9%) | P0 (-23.2%) | P0 (-22.6%) | P0 (-28.2%) | P0 (-28.3%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 12 Nov-14 Nov | 17 Nov-19 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 9 Dec-11 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 217.50 | 217.50 | 225 | 237.50 | – | 237.50 | 217.50 | 237.50 | 237.50 | 218.75 | – | 225 | – | – | 225 | 218.75 | 237.50 | 237.50* |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 311.67 | – | – | – | – | – | – | 297.50 | – | 316.67 | 312.50* | – | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 209 | – | – | – | – | – | – | 201.50 | – | 199.67 (6 Nov 202) | 209.25 (6 Nov 211.25) | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | 160 (6 Nov 175) | – | 185 | 220 | – | 220 | – | 185 | 185 | 185 | – | 208.33 | – | – | 220 | 220 | 220 | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | 254 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1040 | 1032.33 | 1035 | 1047 (6 Nov 1035) | 1035 | 1040 (6 Nov 1035) | 1035 (6 Nov 1040) | 1035 | 1036.75 (6 Nov 1033.50) | 1043 | 1032.33 | 1031 | 1035 | 1032.33 | 1031 | 1035 | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | – | 300.67 (6 Nov 303) | 289.50 (6 Nov 291) | 358 | 325.50* | – | 282 | 282 (6 Nov 289) | 287.50* (6 Nov 295.25) | – | 287 (6 Nov 289.33) | 294 (6 Nov 297.25) | 306 (6 Nov 309.50) | 324 (6 Nov 332) | 325.25 (6 Nov 331.50) | 325 | 353 |
| **Ours** | | | | | not bookable | not bookable | not bookable | **270.50** | not bookable | **308.50** | **237** | **250** | **256.50** | **234.50** | **373** | **255** | **245.50** | **277.50** | **300.33** | **291.25** | **324** | not bookable |
| **Comp median (n)** | | | 4.86 (19) | | **217.50** (3) | **217.50** (1) | **237.83** (6) | **245.75** (4) | **358** (1) | **237.50** (3) | **217.50** (1) | **245.75** (4) | **245.75** (4) | **233.25** (6) | **284** (1) | **237.83** (6) | **268.88** (4) | **280** (2) | **225** (3) | **220** (3) | **237.50** (3) | **295.25** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P75 (+10.1%) | – | P67 (+29.9%) | P100 (+9.0%) | P50 (+1.7%) | P75 (+4.4%) | P50 (+0.5%) | P100 (+31.3%) | P67 (+7.2%) | P50 (-8.7%) | P50 (-0.9%) | P67 (+33.5%) | P67 (+32.4%) | P67 (+36.4%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec |
|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50* | – | 190 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | 157 | – | 164.33 (6 Nov 157.33) | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 135 | 160 | 135 | 135 | – | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – | 181 |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50* | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **146** (2) | **160** (1) | **159.67** (5) | **155.50** (4) | n/a (0) | **181** (3) |

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **Thin comp n.**
   - P04: n=1-4 per stay; 593405916827094880 shows £222 on every date.
   - P09 stored set: n=2-4. The 1.8 km band adds 4-8, but its 1.35-1.73 km listings are outside the ~1 km rule, and band sleeps are NOT CHECKED.
   - P12 stored n=1-6, so positioning leans on the band. 26 Nov is n=3.
3. **Room-price equivalents** of the all-in targets are approximate. Our Airbnb cleaning fees and stay rules for P09/P12 were not read today; the P09 £133 figure assumes the 7 Nov fee/cleaning gap (£66 per 2-night stay) holds at £100.
4. **Why PriceLabs "Your Price" (user_price) differs from the pushed `price`**: P09 100 vs 110-113; P04 140 vs 157-158; P12 above on 30 Nov-3 Dec and below on 7-10 Dec. NOT CHECKED here (PriceLabs section).
5. **P04 1455…:** its bookings, account and cleaning fee are NOT CHECKED. Bookability is from public search only.
6. **Not checked or not covered:**
   - P09 7-9 Nov (tonight, £132, min 2) was not priced.
   - P12 13 Dec shows unavailable with no booking status (last night before the handback).
   - P01 NL band was not re-pulled (no sellable nights).
   - Ours' and comps' cancellation policies are NOT CHECKED.
   - P15 has no listing of ours; P07 is blocked (policy).

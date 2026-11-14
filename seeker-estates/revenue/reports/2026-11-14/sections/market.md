# Market & demand calendar: run D = 2026-11-14 (window 14 Nov 2026 – 12 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out of every finding: P02/P03/P06/P07 intentional blocks (P06 22–23 Nov reported as numbers only, see §2), nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec), P14 (numbers only), P13 = one flat. Not re-raised: 15%/20% stay discounts, Booking.com booster, +10% Booking.com markup, P04 min 3 and 2 Dec, P12 17 Nov, P13 1 Dec +50%.
- **PriceLabs calls, strictly one at a time, each reply saved before the next call:**
  - 1 × `get_user_logs` (listing, 13–14 Nov): **0 entries** — no PriceLabs edit since Reyhan's 11 Nov changes. Every price move below is the algorithm, not a person.
  - 8 × `get_neighbourhood_data` (detail, future prices + occupancy), replies saved 07:19:36Z → 07:22:48Z: P11 3064196, P13 3064856, P05 3166592, P04 3562176, P12 2699998, P20 3547481, P01 3320302, P06 3288517. All `all_operations_ok=true`. Raw: `scratchpad/m14/neigh_<id>.json`.
  - 1 × `get_listing_date_overrides` P11 3064196: unchanged (−3% min 3 on 22 Nov – 18 Dec, last edited 9 Nov 21:21Z; +1% 19–22 Dec; +5% 23–25 Dec). Other listings' overrides not re-pulled (logs show no edit; 13 Nov pull stands).
- **`market.csv`:** `data/snapshots/2026-11-14/market.csv` copied forward from 13 Nov (135 lines) + 8 rows appended under `.market.csv.lock` = 143 lines. Script `scratchpad/m14/wmarket14.py`.
- **Prices:** `prices.csv` 14 Nov (`pricelabs_price`), 13 Nov in brackets. Booking state: Smoobu `reservations.csv` 14 Nov, confirmed only (overrides PriceLabs `booking_status`).
- **Fortnight method unchanged** (7 nights each side, blocked nights and nights >2× median excluded). Script `scratchpad/m14/analyse14.py` → `out14.txt`; open-night tables `open14.py`. Re-running yesterday's script on 13 Nov data gives 24 / £453 (matches).
- **Events re-checked 14 Nov 2026.** WebFetch again failed `ENOTFOUND` on www.alexandrapalace.com and www.theo2.co.uk, so I stopped and used WebSearch restricted to venue/organiser domains. Every event fact is a search summary of an official page, not a page I read.

## 1. Submarket table
P25/P50/P75/P90 (n) = `market.csv` 14 Nov (PriceLabs Nearby Listings summary_table, bedroom-matched). Mkt occ 30/60 = `market_occ_30/60` (from `pl_kpis.csv` 14 Nov `market_occupancy_next_30/60`). Our occ = `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 (PriceLabs) | vs 13 Nov |
|---|---|---|---|---|---|---|
| Camden | P11 | 2 | 50 / 39% | 228 / **292 / 330** / 378 (170) | **33 / 37%**; Smoobu 18/30 = **60%**, 30/60 = 50% | +1 / +1. PriceLabs has not registered the 28 Nov–2 Dec and 9–14 Dec bookings (see §2) |
| Shepherd's Bush | P13 | 2 | 46 / 38% | 193 / **225 / 269** / 346 (115) | 80 / 52% | 0 / +1 |
| St John's Wood (4 BR per policy) | P05 | 4 | 45 / 39% | 458 / **585 / 730** / 1,202 (90) | 73 / 67% | +2 / +2 |
| Barking | P04 | 2 | 25 / 20% | 140 / **178 / 216** / 264 (90) | 47 / 45% | 0 |
| Canary Wharf | P20 | 2 | 39 / 30% | 217 / **255 / 330** / 428 (151) | 63 / 45% | 0 / +4 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 36 / 29% | 218 / **265 / 338** / 437 (148) | 100 / 100%** | +2 / +1 |
| Mile End (handback 13 Dec) | P12 | 2 | 43 / 34% | 173 / **207 / 233** / 292 (117) | 47 / 73%** | +1 / +1 |
| Marylebone (intentional block) | P06 | 2 | 50 / 41% | 320 / **416 / 521** / 654 (216) | 63 / 82%** | first row since 31 Oct (was 312/406/510/625) |
| Greenwich (HB 26 Nov) / Primrose Hill (numbers only) | P09 / P14 | 1 / 1 | 39/32; 48/38% | P09 110/134/161/204 (31 Oct row); P14 no row | 100/100**; 0/0% | not pulled |

\*\* Inflated by handback or intentional blocks. No `market.csv` row exists for Bow, Little Venice, Fulham, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane, Islington.

## 2. Dates where our price should differ from PriceLabs
Prices `prices.csv` 14 Nov (13 Nov); market P50/P75 and occupancy vs STLY (points) from `m14/neigh_<id>.json`.

| Item | 14 Nov (13 Nov) | Market | Status |
|---|---|---|---|
| **P11 13 Dec darts — SOLD** | Smoobu: Booking.com 9–14 Dec (5 n), room **£863.61 = £172.72/n**, booked 14 Nov. PriceLabs/Smoobu on 9–13 Dec: 197/220/263/266/**186** = £1,132; ×1.10 markup = £1,245.20 → paid **0.694×** the Booking.com list, 0.763× PriceLabs. | 13 Dec P50 246 / P75 302; occ 26.9 vs STLY 27.2 (−0.3) | The darts night sold at ~£173 against the policy level (21 Oct: darts 13–17 Dec average **>£300**): about **−£127** on 13 Dec alone. Cause is the known conflict (Reyhan's −3% replaces the +5% policy 24 Oct says to leave) — **for Corentin to confirm, not a new proposal.** Paid-vs-list stack goes to the channel section (a-p11-bcom-stack). |
| **P11 14–18 Dec** (5 open nights, min 3) | 201 / 209 / 216 / 233 / 282 = **£1,141** (unchanged) | P50 £1,290 / P75 £1,575; occ **−6.8 / −1.9 / −2.1 / +1.0 / −3.6** | Policy level on the darts nights 14–17 Dec: £1,200 vs **£859 → gap £341** (13 Nov £455 for 13–17). Under P50 on all 5 nights (−£149). Market is below STLY, so nothing proposed beyond the policy conflict above. |
| **P11 8 Dec — new orphan** | £202, min 3 | P50 257; occ +4.4 | 5–8 Dec and 9–14 Dec bookings leave **8 Dec as a 1-night gap under min 3 → unbookable.** |
| **P11 PriceLabs not in sync with Smoobu** | 28 Nov–1 Dec and 9–13 Dec show `available=True`, `booking_status` empty in PriceLabs (refreshed 13 Nov 10:47Z, before both new bookings registered); `occupancy_next_30` 33% vs Smoobu 60% | — | 15–28 Nov fell ~11% overnight with **no logged edit** (18 Nov 160→143, 22 Nov 207→184, 27 Nov 293→261). Fits the Aggressive occupancy profile reacting to the understated occupancy; per-date cause NOT CHECKED. Open 22–27 Nov (£1,224) is under P50 (£1,458) but market is −1.3 to −8.7 vs STLY: no raise proposed; re-check after PriceLabs registers the bookings. |
| **P13 Christmas 10–26 Dec** (17 open, 3064856) | **£3,720** (£3,721); twin 3090701 £3,678 (£3,705). −5% min 3 still live (no edit logged). | P50 **£4,179** / P75 £5,295; occ **+1.1 to +25.4** on all 17 nights (23 Dec +25.4, 22 Dec +22.6) | **Not fixed.** Under P50 on 13 of 17 (14–26 Dec); gap **£459** (same). Removing −5% ≈ +£196 (3,720/0.95). For Corentin (a-peak-check). 13 Dec twins swapped back overnight: 3064856 199→234, 3090701 210→187 (cause NOT CHECKED). |
| **P05 7–8 Dec** (+3%, min 2) | **£919** (471 / 448) (£949) | P75 £1,146; occ +5.8 / +1.5 | Open: **+£227** to P75 (was +£206). Algorithm cut £30, no edit. |
| **P05 13–14 Dec** (+5%, min 2) | **£982** (496 / 486) (£975) | P75 £1,155; occ **+13.8 / +6.3** | Open: **+£173** (was +£192). |
| **P05 21 Dec** (+300%, min 1) | **£2,073** (£2,074) | P75 699 / P90 891; uncustomized 696; occ +1.0 | Still 2.3× P90. **Conflict, Corentin to confirm** whether meant to sell. |
| **P05 29 Dec** (+300%, min 1) | **£2,647** (£2,712) | P75 825 / P90 1,100; uncustomized 1,086; occ +4.0 | 2.4× P90, +£1,561 over uncustomized. Same conflict. |
| **P04 November** (18–24 Nov, 7 open, −5%/−8% min 3) | **£1,068** (£1,070) | P50 £1,096 / P75 £1,494; occ +4.0 / −0.6 / −4.0 / −6.1 / −2.0 / −2.4 / −1.6 | Under P50 on 18–21 Nov. Market now below STLY on 6 of 7 nights: no raise proposed. |
| **P04 14–19 Dec to P75** (−5% min 3) | 175/179/181/184/190/196 = **£1,105** (£1,115) | P75 £1,291; occ +1.6 / −0.2 / +1.8 / +1.3 / +2.3 / +5.2 | Open: **+£186** (was +£175). |
| **P04 6–13 Dec — NEW cut** | 164/161/162/161/164/171/173/163 = **£1,319** (£1,466, **−£147, −10%**), no edit logged; uncustomized ~unchanged (6 Dec 213, 211 on 13 Nov) | P50 £1,287 / P75 £1,655; occ −2.6 / +0.2 / +3.9 / −1.4 / −1.9 / **+6.0 / +9.6 / +5.7** | Customization ratio fell ~0.86 → 0.77 overnight (cause NOT CHECKED; booked 28 Nov–5 Dec also cut 10%). **11–13 Dec: market +5.7 to +9.6 vs STLY while PriceLabs cut £58** (507 vs 565). Ask: hold at least 13 Nov levels on 11–13 Dec (+£58), P75 would be +£131. |
| **P20 20–24 Nov** (−5%; min 3/3/2/2/2) | 236/240/212/245/246 = **£1,179** (£1,190) | P50 £1,069 / P75 £1,407; occ +0.9 / −2.3 / −5.1 / +1.2 / −5.1 | Between P50 and P75; market soft. **t-p20-delivery still open:** policy says delivery 20–22 Nov, PriceLabs shows 18–19 Nov Blocked and 20–24 on sale. The −5%→0% ask (≈ +£62) stands only if the nights are meant to sell. |
| **P20 5 Dec** | £306, `available=False`, min 3 (£313) | P50 227 / P75 303; occ +1.3 | Still a 1-night orphan, unbookable. Not fixed. |
| **P06 22–23 Nov** (intentional-block listing; numbers only) | **282 / 290 = £572** (346/348 Blocked on 13 Nov); now `available=True`, min 2/3 | P25 294/293, P50 368/371; occ **−6.5 / −11.4** vs STLY | Now a **2-night orphan** between Airbnb 18–22 Nov and the new 24–29 Nov stay; bookable as a 2-night stay from 22 Nov. Priced under P25. PriceLabs also shows **24–29 Nov as open** (refreshed 13 Nov 09:07Z, before that booking); its 22–29 Nov prices fell 15–26% overnight. Who reopened: UNKNOWN (t-p06-2229open, asked Corentin). No proposal (policy). |
| **P12 17–20 Nov** (HB 13 Dec) | **£1,153** (£1,117); 20 Nov 290→322 | P75 £982; occ −5.4 / −5.9 / −2.8 / **−18.5** | Above P75 on all 4 while market is below STLY. For Corentin. |

## 3. Demand calendar, next 90 days
**Re-verified 14 Nov 2026** (WebSearch summaries of official domains):
- **Darts, Alexandra Palace** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [pdc.tv ballot](https://www.pdc.tv/news/2026/september/08/general-ballot-now-open-for-2026-27-paddy-power-world-darts-championship-tickets/)): **11 Dec 2026 – 3 Jan 2027**, Great Hall; first sessions 11 Dec, Round One from Mon 14 Dec 19:00; semi-finals Sat 2 Jan; **final Sun 3 Jan 20:00 GMT**. One PDC release says 4 Jan (likely typo). **"A record 180,000 tickets"**, ballot (organiser). Round Two 20–23 Dec and no play 24–26 Dec: from the 13 Nov check, not re-confirmed today.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)): Myles Smith 20 Nov; The Script 21; Bill Bailey 22; Don Toliver 23; Jungle 24–25; Squeeze 26; Fontaines D.C. 27; Jessie Ware 28; LOTR in Concert 29; **Mariah Carey 30 Nov**; Phoebe Bridgers 1–2 Dec; **Jingle Bell Ball / UB40 5–6 Dec**; Kehlani 8; Ocean Colour Scene 9; Mo Gilligan 10; Pete Tong / RnB Winter Ball 11–12 Dec (13 Nov: RnB Winter Ball 7 Dec — **conflict**); Bryson Tiller 3 or 7 Dec (**conflict**). Kasabian 18 Dec and Disney On Ice 24 Dec – 3 Jan: 13 Nov check only.
- **ExCeL** ([what's on](https://www.excel.london/whats-on), [London Build](https://www.excel.london/whats-on/london-build-expo), [Horse Show](https://www.excel.london/whats-on/london-international-horse-show), [MegaCon](https://www.excel.london/whats-on/megacon-live)): **London EV Show / European Pizza Show 18–19 Nov** (13 Nov summary said Business Show/Biotech 18–19 and Vet Show 19–20 — **conflict**; today's Business Show page says 11–12 Nov, finished); HOMES UK 24–25 Nov; London Build Expo 25–26 Nov; FinTech Connect 1–2 Dec; Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec; **MegaCon Live 23–24 Jan**; Festival of Genomics 27–28 Jan. No attendance figures stated.
- **Twickenham** ([nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [Finals Weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend), [englandrugby.com](https://www.englandrugby.com/follow/news-and-media/england-fixtures-confirmed-inaugural-nations-championship)): **England v New Zealand Sat 21 Nov, KO 14:10** (pool Round Six; hospitality largely sold out); **Finals Weekend Fri 27 – Sun 29 Nov**, Grand Final Sun 29 Nov.
- Not re-checked today: NYE fireworks 31 Dec (london.gov.uk, 11 Nov), Camden school holidays 21 Dec – 1 Jan (camden.gov.uk, 11 Nov).

Effect = market occ vs STLY (`m14`): compression ≥ +5, soft ≤ −2. Properties from VENUES in `build/properties.py` (P20 shown with P01 for O2/ExCeL). "Ours vs fortnight" = `prices.csv` 14 Nov vs fortnight mean.

| Nights | Event | Venue | Open properties | Effect | Ours £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 15–17 Nov | (O2 run per 13 Nov; not re-confirmed) | O2 | P20 | soft/normal (−2.5 / +3.9 / +4.8) | 244 / 232 / 238; fortnight n/a (5 clean nights) | P20 −5% |
| 18–19 Nov | EV Show / Pizza Show (conflict) | ExCeL | P04 (P20 blocked) | +4.0 / −0.6 | **148 / 151** vs 157 | no |
| 20–21 Nov | Myles Smith, The Script / Eng v NZ | O2 / Twickenham | P04; P20 (delivery per policy); P13 booked | P04 −4.0 / −6.1; P20 +0.9 / −2.3 | P04 **154** / 157 vs 156; P20 **236** / 240 vs 236 | no |
| 23 Nov | Don Toliver | O2 | P04; P20 | −2.4 / +1.2 | P04 **153** vs 156; P20 **245** vs 248 | no |
| 24 Nov | Jungle / HOMES UK | O2 / ExCeL | P04; P20 | −1.6 / −5.1 | P04 **153** vs 155; P20 **246** vs 265 | no |
| 27 Nov | Finals Weekend | Twickenham | P13 | **+15.2** | 304 vs 240 (287 on 13 Nov) | yes |
| 30 Nov | Mariah Carey | O2 | all booked/blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P20 5 Dec (unbookable); P04 6 Dec | +1.3 / −2.6 | P20 **306** vs 339; P04 164 vs 164 | no / at fortnight |
| 8 Dec | Kehlani | O2 | P04 | +3.9 | **162** vs 168 | no |
| 11–13 Dec | Darts opening | Ally Pally | P11 **sold** (9–14 Dec, £172.72/n) | +7.4 / +5.0 / −0.3 | booked | — (sold below policy) |
| 14–17 Dec | Darts R1 | Ally Pally | P11 | **soft**: −6.8 / −1.9 / −2.1 / +1.0 | **201 / 209 / 216 / 233** vs 247 | no |
| 16–18 Dec | Horse Show / Kasabian | ExCeL / O2 | P04 16–19; P20 16–18 | P04 +1.8 / +1.3 / +2.3; P20 −0.5 / +0.9 / +0.3 | P04 181/184/190 vs 169; P20 **277 / 279 / 285** vs 335 | P04 yes; P20 no (fortnight inflated, below) |
| 18 Dec | Darts R1 | Ally Pally | P11 | −3.6 | 282 vs 225 | yes |
| 10–26 Dec | pre-Christmas / school holiday | London | P13 | **compression, +1.1 to +25.4** | under P50 on 13/17 | **no** (−5%) |
| 23 Dec | Darts R2 | Ally Pally | P11 | soft −4.6 | **276** vs 298 | no; market soft |
| 26 Dec – 2 Jan | Disney On Ice / NYE | O2 / central | P20; P04 2 Jan | P20 **+3.2 to +12.1**; P04 +9.3 | P20 305–442 vs 256; P04 197 vs 178 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +3.2 | **172** vs 193 (P50 221) | no |
| 23–24 Jan | MegaCon Live | ExCeL | P20; P04 | P20 **+10.9 / +7.3** | P20 **255 / 240** vs 258 (P50 207/204); P04 168/162 vs 162 | P20 no (vs fortnight) |

## 4. Missed compression: open nights on events at or below the fortnight
Same event set and method as 8–13 Nov (`m14/out14.txt`).

| Ref | Night(s) | Event | Ours 14 Nov (13 Nov) | Fortnight £ (13 Nov) | Gap £ (13 Nov) |
|---|---|---|---|---|---|
| P04 | 18, 19 Nov | ExCeL 18–19 Nov | 148, 151 (147, 150) | 157 (157) | 9, 6 (10, 7) |
| P04 | 20 Nov | The Script eve | 154 (155) | 156 (158) | 2 (3) |
| P20 | 20 Nov | The Script eve | 236 (241) | 236 (249) | 0 (8) |
| P04 | 23 Nov | Don Toliver | 153 (153) | 156 (161) | 3 (8) |
| P20 | 23 Nov | Don Toliver | 245 (247) | 248 (256) | 3 (9) |
| P04 | 24 Nov | Jungle / HOMES UK | 153 (154) | 155 (161) | 2 (7) |
| P20 | 24 Nov | Jungle / HOMES UK | 246 (245) | 265 (273) | 19 (28) |
| P20 | 5 Dec | Jingle Bell Ball (**unbookable**) | 306 (313) | 339 (336) | 33 (23) |
| P04 | 8 Dec | Kehlani | 162 (180) | 168 (184) | 6 (4) |
| **P11** | **14–17 Dec** | Darts R1 | **201, 209, 216, 233** (same) | **247** (247) | **46, 38, 31, 14** (same) |
| P20 | 16, 17, 18 Dec | Horse Show / Kasabian | 277, 279, 285 (279, 284, 290) | **335** (319) | **58, 56, 50** (40, 35, 29) |
| P11 | 23 Dec | Darts R2 | 276 (276) | 298 (298) | 22 (22) |
| P11 | 3 Jan | Darts final | 172 (172) | 193 (193) | 21 (21) |
| | | **Total, same method** | | | **19 nights / £419** (13 Nov **24 / £453**) |
| | | Of which bookable (excl. P20 5 Dec) | | | 18 / £386 |

- **Change vs yesterday: −5 nights / −£34.** Check: −61 + 40 − 13 = −34.
  - **P11 −1 n / −£61:** 13 Dec dropped out because it **sold** (at £172.72/n, below the policy level, §2). The other darts gaps are unchanged (P11 Dec prices did not move).
  - **P20 −1 n / +£40:** 21 Nov dropped out (240 > 236), 20–24 Nov gaps shrank (−£30), 5 Dec +£10. **16–18 Dec +£60 is an artefact:** the before-fortnight (9–15 Dec) rose 319 → 335 because booked nights were repriced (13 Dec 270 → 363); our 16–18 Dec price fell only £12 and market there is −0.5 to +0.9 vs STLY. Not a proposal.
  - **P04 −3 n / −£13:** 21 Nov, 6 Dec and 16 Dec dropped out because the fortnight fell (P04 6–13 Dec cut 10%, §2), not because our event prices rose.
- **Supplementary, not in the headline:** MegaCon 23–24 Jan P20 £21 (3 + 18), market +10.9 / +7.3 but we are above P50. Yesterday's small-O2 supplementary list (7 n / £100) was not recomputed.
- **Where the market supports a raise** (occ clearly above STLY and our price under P50/P75):
  - **P13 10–26 Dec**: +£459 to P50 (+£196 by removing −5%).
  - **P05 7–8 / 13–14 Dec**: +£227 / +£173 to P75.
  - **P04 14–19 Dec**: +£186 to P75. **NEW: P04 11–13 Dec** +£58 to restore 13 Nov prices (market +5.7 to +9.6).
  - **P11 3 Jan**: +£21 to the fortnight (+£49 to P50), occ +3.2.
  - Darts 14–17 Dec (−£341 vs policy) and 13 Dec sold at ~£173: policy conflict for Corentin, market soft.

Data gaps:
1. Market figures are PriceLabs Nearby Listings (Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated). P05 bands may include 3 BR. P09 row is from 31 Oct; P08/P14 have no row; P10, P15–P19, P02/P03/P07 not pulled.
2. **P11 and P06 PriceLabs booking state lags Smoobu** (P11 28 Nov–1 Dec and 9–13 Dec, P06 24–29 Nov show available in PriceLabs). PriceLabs occupancy-driven adjustments for these listings are therefore based on understated occupancy; per-date breakdown of the P11 15–28 Nov and P04 28 Nov–13 Dec cuts NOT CHECKED.
3. P13 13 Dec twin swap (3064856 +35, 3090701 −23): cause NOT CHECKED.
4. P20 5 Dec Smoobu availability and live Booking.com/Airbnb prices for any date: NOT CHECKED (no Smoobu/OTA call this run).
5. Events are domain-restricted search summaries, not page reads; www.alexandrapalace.com and www.theo2.co.uk (also www.excel.london, allianzstadiumtwickenham.com, www.pdc.tv) must be allowed in the session's network settings. Conflicts: ExCeL 18–19 Nov (EV/Pizza Show vs Business Show/Vet Show), O2 RnB Winter Ball 7 vs 11–12 Dec, Bryson Tiller 3 vs 7 Dec, darts end 3 vs 4 Jan. UNVERIFIED today: O2 15–17 Nov acts, Kasabian 18 Dec, Disney On Ice, darts R2 / rest days 24–26 Dec, NYE, school dates, Ally Pally 26–27 Nov gigs. Attendance stated only for the darts (180,000 tickets).

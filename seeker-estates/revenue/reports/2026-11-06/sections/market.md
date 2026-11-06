# Market & demand calendar: run D = 2026-11-06 (window 6 Nov 2026 – 3 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after handback (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 = one flat (3064856 + 3090701). Not raised again: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 2 Dec, P12 17 Nov, P11 darts override.
- **Market data pulled today 6 Nov 07:18–07:21Z, one call at a time, all `all_operations_ok=true`.** Tool: `get_neighbourhood_data` (detail, future prices + occupancy) for P13 3064856, P05 3166592, P04 3562176, P11 3064196, P20 3547481, P12 2699998 and **P09 3318172 (new, for the reopened 7–12 Nov)**. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m06/neigh_<id>.json`.
  - `data/snapshots/2026-11-06/market.csv` **copied forward from 5 Nov and 7 rows appended** under `.market.csv.lock` (87 lines). P05 uses the 4 BR row (`property_facts.P05`; summary `best_category` still "3 BR").
- **Our prices:** `data/snapshots/2026-11-06/prices.csv` `pricelabs_price` (7 Nov – 5 Jan). **8 listings were last refreshed 5 Nov 10:54–10:58Z, after Reyhan's edits, and not on 6 Nov** (`raw/prices_<id>.json last_refreshed_at`: 2699998, 3064196, 3064856, 3090701, 3318167, 3318172, 3562176; P05/P20 refreshed 6 Nov 01:18/01:29Z). P13 re-read live with `get_listing_prices` 6 Nov: same refresh (10:55:36Z), same values. "Default" = `uncustomized_price`. "Yesterday" = 5 Nov `prices.csv`. After 5 Jan: neighbourhood `final_price`.
- **P01/P09/P10 now have PriceLabs prices again** (LISTING_NO_DATA gone), so they are in the event analysis today. P01: no open event night before its 20 Dec handback. P10: every event night (8, 12, 13–14 Nov) booked. P09: open 7–12 Nov (§2b).
- **Booking state:** Smoobu `reservations.csv` 6 Nov, confirmed rows only.
- **Fortnight method unchanged** (7 nights each side, booked/blocked and >2x-median nights left out; Horse Show and 3 Jan use one clean week). Scripts: `scratchpad/m06/analyse06.py <day> [neigh dir]` (also re-run on 5 Nov data for a like-for-like diff), `scratchpad/m06/open06.py <ref> <from> <to>`.
- **Events re-checked 6 Nov 2026** by WebSearch restricted to venue/organiser domains. Direct fetch of theo2.co.uk, excel.london, wembleystadium.com, alexandrapalace.com still fails (proxy CONNECT 403 via curl). All event facts are search summaries of official pages, not page reads.

## 0. PriceLabs edits since 5 Nov 06:00Z (`get_user_logs` listing 5–6 Nov, 16 entries, all reyhan, 5 Nov 10:53–10:57Z)
| Listing | Dates | Edit | Effect on market asks |
|---|---|---|---|
| **P13** 3064856 (+ 3090701, Vrbo copied) | **8–12 Nov** | **−10%**, min 2 | **Opposite of open ask "12 Nov ≥ £176, min 1"** → conflict for Corentin |
| **P13** 3064856 (+ copies) | **7–20 Dec** | **−7%**, min 2 | **Opposite of open ask "Christmas +10%"** (adds to Reyhan's 21–26 Dec −5% min 3 of 4 Nov) → conflict for Corentin |
| P11 3064196 | 23 Dec | **+7%**, min 2 | Same direction as our ask (23 Dec ≥ £317) |
| P12 2699998 | 12–20 Nov, 30 Nov–12 Dec | −5%, min 2 | no market ask open |
| P04 3562176 | 9–24 Nov | −7%, min 3 | replaces the −15% that conflicted with Corentin's −8%; now within 1 pt of it |
| P09 3318172 | 5–12 Nov | "fixed", min 2, **no price** | `get_listing_date_overrides` 6 Nov: 6–12 Nov carry min stay 2 only (no price override), so the algorithm prices the reopened nights |
| P08 3318167 | 5–21 Nov | +5%, min 2 | handback 13 Nov |

**No edit on P05 or P20.** Not fully reflected yet: P13 12 Nov `price` 168 → 163 (−3%) and 7–20 Dec −2%, not −10%/−7%; P11 23 Dec 294 → 300 (+2%), not +7%. PriceLabs has not re-priced these listings since 10:55Z, so the full effect is NOT CHECKED.

## 1. Submarket table
Sources: `market.csv` 6 Nov (bands: `p25/p50/p75/p90`, `market_occ_30/60`), `pl_kpis.csv` 6 Nov (`occupancy_next_30/60`).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 5 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 36 / 30% | 213 / **249 / 316** / 416 (153) | 50 / 25% | P75 +1 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 33 / 28% (pl_kpis) | row 2 Nov: 214 / 258 / 331 / 421 | 100 / 100%* | not pulled |
| Barking | P04 | 2 | 23 / 20% | 139 / **172 / 217** / 261 (90) | 57 / 52% | P50 +3, P75 +3 |
| Greenwich (handback 26 Nov) | P09 | 1 | 36 / 32% | 109 / **132 / 158** / 203 (124) | 73 / 87%* | new pull (2 Nov: 110/132/160/204) |
| Mile End (handback 13 Dec) | P12 | 2 | 41 / 34% | 170 / **203 / 234** / 292 (121) | 63 / 70% | P50 −1 |
| Marylebone (blocked on purpose) | P06 | 2 | 47 / 43% | row 2 Nov | 87 / 93%* | not pulled |
| Camden | P11 | 2 | 45 / 39% | 225 / **287 / 327** / 391 (170) | 47 / 48% | flat |
| St John's Wood | P05 | 4 | 41 / 40% | 457 / **570 / 714** / 1,167 (90) | 77 / 67% | +1 |
| Shepherd's Bush | P13 | 2 | 42 / 38% | 189 / **223 / 274** / 347 (117) | 73 / 52% | P50 +1, P75 −4 |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 49 / 43%; 44 / 38% | `market.csv` 27 Oct only | 90 / 95%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. P09 30-day falls from 90% (5 Nov) to 73% because of the cancelled 1–10 Nov stay. No `market.csv` row for Bow, Little Venice, Fulham, P17, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane.

## 2. Open raises re-checked (prices.csv 6 Nov; market = `neigh_<id>.json` 6 Nov)
| Ask | 5 Nov | **6 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 12 Nov ≥ £176, min 1** (3064856) | £168, min 2 | **£163, min 2** (twin £183) | P25 £173 / P50 £209; occ 45.2 vs 53.9 STLY (**−8.7**) | **Not done; now in conflict.** Reyhan set 8–12 Nov **−10%** (5 Nov 10:54Z). Gap to £176 **£13** (was £8) and will widen once −10% is fully applied. Our price is below the market P25. Corentin to decide: Reyhan's −10% or the ≥ £176 floor. |
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856, 7–26 Dec, 20 open n) | £4,211; 21–26 Dec min 3 | **£4,148**; 21–26 Dec min 3 (twin £4,389) | P50 £4,870 / P75 £6,165; default £4,568; **occ +5.6 to +24.6 pts vs STLY on all 20 nights**; under P50 every night, under P25 on 7, 17, 25, 26 Dec | **Not done; second conflict.** +10% = £4,563 (**+£415**); to P50 +£722. Reyhan now has **7–20 Dec −7%** (5 Nov) on top of 21–26 Dec −5% min 3 (4 Nov). The market data supports a raise and does not support a cut: Corentin to confirm. |
| **P05 7–8 Dec to ~P75** | £935 | **£922** (470/452), min 2 | P75 £1,171; default £1,120; occ **+8.5 / +2.1** | **Still open.** +£249. |
| **P05 13–21 Dec to P75** (9 n) | £5,299 | **£5,316** | P75 £5,813; default £5,593; P50 £4,405; occ **+2.7 to +10.3 on all 9 nights** | **Still open.** +£497. Reyhan's 13–19 Dec −7% unchanged: Corentin to confirm. |
| **P20 13–16 Nov +10%** | £899 | **£903** (232/233/213/225), min 3/3/3/2 | P50 £843, P75 £1,129; occ +2.4, −8.8, −12.6, −3.4 | **Still open, +£90.** Market soft on 14–16 Nov; case is conversion, not demand. |
| **P05 29 Dec ~ default** (min 1, 1-night orphan) | £1,322 | **£1,351**, min 1 | default **£1,071**, P90 £1,076, P75 £808; occ 51.4 vs 50.8 (+0.6) | **Still open, further away: £275–280 above default/P90** (was £247–259). Algorithmic (+£29), no edit. |
| P04 14–19 Dec 0% | £1,143 | £1,146 | P75 £1,299; default £1,350; occ +3.3 to +6.2 | Still open (+£153 to P75). |
| P20 6–9 Nov +10% | £842 | £851 (6 Nov = today) | at P50 (£846); occ −6.4 to −11.8 | Lapses today; 7–9 Nov +£64 if still wanted; market does not support it. |

### 2b. P09 Greenwich 7–12 Nov (reopened by the 1–10 Nov cancellation; handback 26 Nov)
Smoobu `reservations.csv` 6 Nov: 1–10 Nov and 4–19 Nov rows `cancelled`; next confirmed 13–15 Nov. Open 6–12 Nov, min 2.

| Night | 7 Sat | 8 Sun | 9 Mon | 10 Tue | 11 Wed | 12 Thu | Total |
|---|---|---|---|---|---|---|---|
| PriceLabs `price` (`prices.csv`) | 130 | 112 | 110 | 109 | 116 | 125 | **702** |
| `user_price` (raw) | 123 | 106 | 104 | 104 | 110 | 119 | 666 |
| **Smoobu `smoobu_price`** (`prices.csv`) | 130 | **100** | **100** | **100** | 116 | 125 | 671 |
| Market P25 / **P50** / P75 | 116/**137**/176 | 110/**135**/173 | 107/**134**/173 | 108/**134**/173 | 108/**135**/174 | 114/**138**/174 | P50 **813** |
| Mkt occ vs STLY | 60.2/52.3 (+7.9) | +0.5 | +2.8 | +1.4 | +6.0 | +5.3 | |

- The market is **above STLY on all six nights** and we sit at P25, not P50. 1–6 days out with no verified event in P09's map (O2): **no raise proposed**. But no further cut is justified either.
- **Smoobu shows £100 on 8–10 Nov**, below PriceLabs' own price (£109–112) and `user_price` (£104–106). P09 was not refreshed on 6 Nov (last 5 Nov 10:56Z). Whether Smoobu still sells £100 live is NOT CHECKED here; it goes to the Smoobu/pricelabs auditor. Market cost if it sells at £100 against PriceLabs: £31 over 3 nights.
- The O2 listings on 7–8 and 11/12 Nov (Paul Heaton, Papa Roach, SBTV20) are listing-only and not used for pricing.

## 3. Demand calendar, next 90 days
**Verified 6 Nov 2026** (WebSearch on official domains; search summaries):
- **NEW: Twickenham England v Australia, Sun 8 Nov, 15:10** ([englandrugby.com preview](https://www.englandrugby.com/follow/news-and-media/england-v-australia-preview-2026-nations-championship), [allianzstadiumtwickenham.com](https://allianzstadiumtwickenham.com/england-v-australia-nations-championship-pool-match); "plan your visit" page shows 15:50 in an approximate table). England v Japan Sat 14 Nov (16:40, match-day guide 17:20); England v New Zealand Sat 21 Nov 14:10; Finals 27–29 Nov ([nations-championship](https://allianzstadiumtwickenham.com/nations-championship)).
- **NEW: Alexandra Palace Fireworks & Drone Festival, Sat 7 (16:00–22:30) and Sun 8 Nov (15:30–20:30)** ([page](https://www.alexandrapalace.com/whats-on/fireworks-drone-festival/)); road closures 6–9 Nov. Courteeners 14 Nov, **Enter Shikari 20 Nov (today only 20; yesterday 20–21)**, Nia Archives 26, Blossoms 27, Gorgon City 28 Nov ([what's on](https://www.alexandrapalace.com/whats-on/)). **World Darts 11 Dec – 3 Jan** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)): opening Fri 11 Dec 19:00, semis 2 Jan, final Sun 3 Jan 20:00; venue states "a record 180,000 tickets". One PDC release says "to 4 January".
- **Wembley England v Croatia, Thu 12 Nov 19:45** ([event page](https://www.wembleystadium.com/events/2026/England-v-Croatia), [match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre)). Sale status still conflicting: tickets page says general sale from 5 Nov noon "until sold out"; a homepage snapshot says sold out.
- **The O2** ([arena listing](https://www.theo2.co.uk/events/venue/the-o2-arena)): Noah Kahan 13/14/17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026)), Muse 15–16 Nov ([page](https://www.theo2.co.uk/events/detail/muse-2026)), The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)), Don Toliver 23 Nov, Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026); one page says 29 Nov), Jingle Bell Ball 5–6 Dec ([page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026); tickets on sale 6 Nov 09:00), Kehlani 8 Dec (or 9), Kasabian 18 Dec ([page](https://www.theo2.co.uk/events/detail/kasabian-2026); premium page also 19 Dec). **Disney On Ice "Discover the Magic" back on the O2 site: 24, 26–31 Dec and 2 Jan** ([page](https://www.theo2.co.uk/events/detail/disney-on-ice-presents-discover-the-magic)); another summary says "from 20 Dec" → start date conflict. Listing-only (not used): Suede/Manics 6, Paul Heaton 7, Papa Roach 8, SBTV20 11 or 12, Hatsune Miku Expo 13–17 Nov, Phoebe Bridgers 1–2 Dec, Bryson Tiller 7 or 8 Dec, Pete Tong Ibiza Classics 11–12 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): #RISK 10–11 Nov ([page](https://www.excel.london/visitor/whats-on/risk-europe-2026)); Business Show + retail expos 11–12; School & College Leaver Festival 17–18; EV Show / B2B Marketing Live 18–19; Vet Show 19–20; HOMES UK 24–25; London Build + elementalLONDON 25–26 Nov ("25,000+ visitors", [page](https://www.excel.london/whats-on/london-build-expo)); FinTech Connect 1–2 Dec; Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec**; Scrooge Cirque 23–28 Dec.
- **NYE** Thu 31 Dec 20:00 – 1 Jan 00:30, Ticketmaster only, £20–55; second batch date not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
- **School holidays:** Christmas Mon 21 Dec – Fri 1 Jan, return 4 Jan; February half term 15–19 Feb 2027 is outside the window ([Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx), [Camden](https://www.camden.gov.uk/term-dates), [H&F](https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates)).

Columns: our £ vs fortnight £ (`prices.csv` 6 Nov); market occ vs STLY (`neigh_<id>.json` 6 Nov). P20 is not in the VENUES map (`build/properties.py`); shown as nearby.

| Nights | Event | Venue | Open properties (VENUES map) | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 7–8 Nov | **Eng v Australia (new)** | Twickenham | P13 8 Nov (7 Nov booked); P10 booked | **soft** (−12.0) | P13 **154** vs 168 | no |
| 7–8 Nov | **Fireworks & Drone (new)** | Ally Pally | P08 7 Nov (P11 booked) | not pulled | P08 193 (min 2, 1 night before an 8 Nov arrival); fortnight n/a (handback) | – |
| 7–12 Nov | no verified event in map | – | P09 7–12 open | **+0.5 to +7.9** | 702 vs P50 813 (§2b) | at P25 |
| 10–11 Nov | #RISK + expos | ExCeL | P04 | **soft** (−7.7, −9.2) | P04 **153** / 158 vs 158 | 11 Nov level |
| 12 Nov | England v Croatia | Wembley | P13 (P10 booked) | **soft** (−8.7) | **163** vs 173 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13; P20 13–17 | P04 −5.4; P20 +2.4, −8.8, −12.6, −3.4, +3.7 | P04 **161** vs 169; P20 **232/233/213/225/229** vs 247 | no |
| 14 Nov | Eng v Japan / Courteeners | Twickenham / Ally Pally | P13, P10, P11 booked | – | booked | – |
| 18–19 Nov | EV / Vet shows | ExCeL | P04 (P20 blocked) | soft (−5.5, −6.5) | P04 **161 / 162** vs 177 | no |
| 20–21 Nov | Script / Eng v NZ / Shikari | O2 / Twickenham / Ally Pally | P04, P20 (P11, P13, P01, P09 booked) | P04 −1.9 / −3.5; P20 +2.2 / −0.7 | P04 **170**/201 vs 180; P20 **238 / 244** vs 264 | **no; P20 21 Nov fell 293 → 244** |
| 23–24 Nov | Don Toliver / HOMES UK | O2 / ExCeL | P04, P20 | P04 −4.5/−4.4; P20 +3.8/−1.8 | P04 192/192 vs 185; P20 295/295 vs 268–276 | **yes** (P04 now above) |
| 26–28 Nov | Ally Pally gigs / Nations Finals | Ally Pally / Twickenham | P13 27 Nov (P11 booked) | P13 **+11.2** | 334 vs 254 | yes |
| 30 Nov | Mariah Carey | O2 | P04, P20 booked; P01 blocked | – | – | – |
| 5–6 Dec | Jingle Bell Ball | O2 | P04 6; P20 5–6 | P04 −0.7; P20 +4.5 / +2.9 | P04 **186** vs 192; P20 325 / 298 vs 276 | P20 **yes now** (6 Dec default 283 → 345); P04 no |
| 8 Dec | Kehlani | O2 | P04, P20 | P04 +1.9; P20 +1.0 | P04 **183** vs 192; P20 **243** vs 277 | no |
| 11–12 Dec | Darts opening | Ally Pally | P11 | **+9.2 / +3.2** | 323 / 326 vs 254 | yes |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** (−1.1 to −9.0) | **228/204/210/218/238** vs 279 | no (override conflict) |
| 16–20 Dec | Horse Show / Kasabian | ExCeL / O2 | P04 16–19; P20 16–20 | P04 +4.4 to +6.2; P20 −3.1, +1.1, +2.7, +6.1, −3.0 | P04 **187**/190/198/204 vs 188; P20 **252/256**/263/278/257 vs 257 | mostly |
| 21 Dec–1 Jan | School Christmas holiday | London | P13 7–26 Dec; P11 23 Dec; P20; P05 29 Dec | P13 +5.6 to +24.6; P20 +4.3 to +14.5 (24 Dec–2 Jan) | P13 under P50 every night (§2) | **no for P13** |
| 23 Dec | Darts R2 | Ally Pally | P11 | −2.8 | **300** vs 317 (Reyhan +7%, not yet fully applied) | partly |
| 24 Dec–2 Jan | Disney On Ice (back on O2 site) | O2 | P20 (P04 booked to 1 Jan; 2 Jan open) | P20 +4.3 to +14.5 | P20 293–463 vs 252; P04 2 Jan 219 vs 193 | yes |
| 31 Dec | NYE | central | P20 | **+14.5** | 463 vs 263 | yes |
| 3 Jan | Darts final | Ally Pally | P11 | +4.7 | **189** vs 204 (clean week) | no |
| 4 Jan–3 Feb | no verified event | – | – | – | – | – |

**Why P20 21 Nov fell £49** (293 → 244): PriceLabs' own default fell 340 → 264 (`raw/prices_3547481.json` 5 vs 6 Nov); no P20 edit. 21 Nov is now 15 days out, the same step seen on 20 Nov yesterday. **P20 6 Dec rose 251 → 298** on a default rise 283 → 345, on the day Jingle Bell Ball tickets went on sale (sale date per O2 summary).

## 4. Missed compression: open nights on verified events at or below the fortnight
| Ref | Night(s) | Event | Our £ 6 Nov (5 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P13 | 8 Nov | Eng v Australia (new) | 154 (159) | 168 | **14** | none: −12.0 |
| P13 | 12 Nov | England v Croatia | 163 (168) | 173 | **10** | none: −8.7 |
| P20 | 13–17 Nov | Kahan / Muse | 232, 233, 213, 225, 229 | 247 | 15, 14, 34, 22, 18 = **103** (5 Nov 83) | mixed: +2.4 to −12.6 |
| P20 | 20, 21 Nov | Script eve / Script | 238, 244 (238, 293) | 264 | 26, 20 = **46** (21 Nov new) | +2.2 / −0.7 |
| P20 | 8 Dec | Kehlani | 243 (237) | 277 | **34** | +1.0 |
| P20 | 16, 17 Dec | Horse Show | 252, 256 | 257 | 5, 1 | −3.1 / +1.1 |
| P04 | 10 Nov | ExCeL expos | 153 (140) | 158 | 5 | none: −7.7 |
| P04 | 13 Nov | Kahan | 161 (147) | 169 | 8 | none: −5.4 |
| P04 | 18, 19 Nov | EV / Vet | 161, 162 (147, 148) | 177 | 16, 15 | none |
| P04 | 20 Nov | Script eve | 170 (155) | 180 | 10 | none: −1.9 |
| P04 | 6 Dec | Jingle Bell Ball | 186 (185) | 192 | 6 | none: −0.7 |
| P04 | 8 Dec | Kehlani | 183 (182) | 192 | 9 | +1.9 |
| P04 | 16 Dec | Horse Show eve | 187 | 188 | 1 | +4.4 |
| P11 | 23 Dec | Darts R2 | 300 (294) | 317 | 17 | none: −2.8 |
| P11 | 3 Jan | Darts final | 189 (190) | 204 | 15 | +4.7 |
| | | **Excluding darts R1** | | | **22 nights / £315** | |
| P11 | 13–17 Dec | Darts R1 (conflict) | 228/204/210/218/238 | 279 | 51, 75, 69, 61, 41 = **£297** | none: −1.1 to −9.0 |
| | | **Full total** | | | **27 nights / £612** (5 Nov reported **29 / £607**) | |

- **Change vs yesterday: −2 nights / +£5 on the reported totals.** Same-basis (5 Nov data re-run with today's event list, which adds England v Australia): **30 n / £620 → 27 n / £612 (−3 n / −£8).**
  - **Off the list (−4 n / −£31):** P04 11, 23, 24 Nov (P04 rose £13–17 after Reyhan replaced −15% with −7% on 9–24 Nov); P20 6 Dec (PriceLabs default rose; now £298 vs £276).
  - **New (+1 n / +£20):** P20 21 Nov (default fell; 15-day step).
  - **Larger:** P20 Kahan £83 → £103 (15 Nov 221 → 213); P20 20 Nov £23 → £26; P13 12 Nov £8 → £10 (start of Reyhan's −10%).
  - **Smaller:** P04 10/13/18–20 Nov (−£12 total, same −7% edit); P11 23 Dec £23 → £17 (Reyhan +7%, partly applied); P20 8 Dec £37 → £34.
- **Where the market supports a raise** (occ clearly above STLY and our price under fortnight or P50): **P13 Christmas** (+5.6 to +24.6, under P50 all 20 nights; now cut further by Reyhan), **P05 7–8 and 13–21 Dec**, **P04 14–19 Dec**, P11 3 Jan (+4.7; +£15). P04/P13 November and P20 14–16 Nov gaps rest on the fortnight rule against a market below STLY: **not proposed**.

## 5. Dates where our price should differ from PriceLabs
Nothing new proposed. Two items are now conflicts with Reyhan's edits, not proposals.
- **Shepherd's Bush P13: CONFLICT for Corentin.** (a) 12 Nov: ask ≥ £176 min 1 vs Reyhan −10% min 2 on 8–12 Nov (now £163, market soft −8.7). (b) Christmas: ask +10% on 7–26 Dec (**+£415**) and min 2 on 25–26 Dec vs Reyhan −7% on 7–20 Dec and −5% min 3 on 21–26 Dec. The market is +5.6 to +24.6 pts above STLY and we are under P50 on all 20 nights.
- **St John's Wood P05:** 7–8 Dec to ~P75 (**+£249**); 13–21 Dec to P75 (**+£497**; Reyhan's 13–19 Dec −7% still in place: Corentin to confirm). 29 Dec down to £1,071–1,076 (**−£275 to −£280**).
- **Canary Wharf P20:** 13–16 Nov +10% (+£90) still open; the case is conversion, not market. Hold 31 Dec (NYE priced) and 6 Dec (now priced).
- **Camden P11:** 23 Dec ≥ £317: Reyhan's +7% matches the ask; check after the next refresh. 3 Jan ≥ £204 (+£15).
- **Greenwich P09 7–12 Nov:** hold the PriceLabs price, no cut (market +0.5 to +7.9 pts vs STLY, we are at P25). Fix Smoobu £100 on 8–10 Nov if it is still live.
- **Barking P04:** 14–19 Dec 0% (+£153 to P75). Reyhan's 9–24 Nov −7% min 3 now within 1 pt of Corentin's −8%: Corentin to confirm that this closes the conflict.

Data gaps:
1. Market figures are PriceLabs Nearby Listings (Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated). P05 bands may include 3 BR. P01/P06 rows from 2 Nov; P08/P14 from 27 Oct; P10, P15–P19, P02/P03/P07 not pulled.
2. **8 listings last re-priced 5 Nov 10:54–10:58Z.** Reyhan's 5 Nov overrides (P13 −10%/−7%, P11 +7%) are only partly reflected (−3%/−2%/+2%). Today's P13 and P11 gaps will change at the next refresh; size NOT CHECKED.
3. P09 Smoobu £100 on 8–10 Nov comes from `prices.csv` `smoobu_price`. Live Smoobu rate and channel prices NOT CHECKED here.
4. Events come from domain-restricted WebSearch summaries, not page reads (direct fetch blocked: proxy 403). Open conflicts: Croatia sold out vs on sale; Eng v Australia 15:10 vs 15:50; Eng v Japan 16:40 vs 17:20; Kahan run "two shows" vs three dates; Mariah Carey 29 vs 30 Nov; Kehlani 8 vs 9 Dec; Bryson Tiller 7 vs 8 Dec; Kasabian 18 vs 19 Dec; Disney On Ice 20 vs 24 Dec start; darts end 3 vs 4 Jan; Enter Shikari now 20 Nov only. Attendance stated only for darts (180,000 tickets) and London Build (25,000+).
5. P08 7 Nov (Fireworks & Drone) has no market pull and no computable fortnight (handback 13 Nov).
6. P06 9 Nov £2 "Your Price" is outside this section (intentional block); left to the pricelabs auditor.

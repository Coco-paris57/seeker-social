# Market & demand calendar: run D = 2026-11-05 (window 5 Nov 2026 – 3 Feb 2027)

## Sources and method
- **Policy read first** (`data/policy.json`). Left out: P02/P03/P06/P07 intentional blocks; nights after the handback dates (P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec); P14 numbers only; P13 counted as one flat (3064856 + 3090701). Not raised again: P13 1 Dec +50%, 15%/20% stay discounts, Booking.com booster, P04 2 Dec, P12 17 Nov, P11 darts override (`listing_facts.P11.darts_override_24oct`).
- **Market data pulled today 5 Nov ~07:2xZ, one call at a time, all `all_operations_ok=true`.** Tool: `get_neighbourhood_data` (detail, future prices + occupancy) for P13 3064856, P05 3166592, P04 3562176, P11 3064196, P20 3547481, P12 2699998. Raw: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m05/neigh_<id>.json`.
  - `data/snapshots/2026-11-05/market.csv` did not exist: **copied forward from 4 Nov and appended 6 rows** under `.market.csv.lock` (80 lines). P05 uses the **4 BR** row (`property_facts.P05`); summary `best_category` is still "3 BR".
  - Daily bands = `future_prices.market_25/75/90_percentile_prices` and `market_price` (P50); market occupancy = `occupancy.daily.market_occupancy` vs `_stly`.
- **Our prices:** `data/snapshots/2026-11-05/prices.csv` `pricelabs_price` (6 Nov – 4 Jan; refreshed 5 Nov 01:25–01:33Z per `raw/prices_<id>.json last_refreshed_at`). "Default" = `uncustomized_price` in `raw/prices_<id>.json`. "Yesterday" = `data/snapshots/2026-11-04/prices.csv`. After 4 Jan: neighbourhood `final_price`.
- **PriceLabs prices NOT AVAILABLE for P01, P06, P09, P10** (LISTING_NO_DATA today; see pricelabs section). For P01 and P09 I read live Smoobu rates (`scratchpad/live05pl/smoobu_rates_a.json`, GET 5 Nov 07:13:45Z): **P01 has no open night before its 20 Dec handback; P09 is open only 10–12 Nov (£113/£122/£129, min 2)**, which carry no verified event in its map. So the gap does not change the event analysis. P06 is blocked on purpose; P10 not mapped to any event with open nights checked (NOT CHECKED).
- **Booking state:** Smoobu `reservations.csv` 5 Nov, confirmed rows only.
- **Fortnight method (unchanged from 3–4 Nov):** 7 nights each side, booked/blocked nights and nights >2x median left out; Horse Show and 3 Jan use one clean week. Scripts: `scratchpad/m05/analyse05.py`, `scratchpad/m05/open05.py <ref> <from> <to>`.
- **Events re-checked 5 Nov 2026** by WebSearch restricted to the venue/organiser domain. Direct WebFetch of `www.theo2.co.uk`, `www.excel.london`, `www.wembleystadium.com` fails (ENOTFOUND: not in the session's allowed domains). All event facts are search summaries of official pages, not page reads.

## 0. PriceLabs edits since 4 Nov 06:00Z
Source: `get_user_logs` listing, 4–5 Nov (38 entries). **Only one entry after 4 Nov 06:00Z:** reyhan, 4 Nov 12:52:23Z, **P06 3288517 15–22 Nov "fixed" override, min 2, no price value in the log**. P06 is blocked on purpose, so no market comment; but it is 31 s before P06's last push (12:52:54Z) and P06 is one of the four LISTING_NO_DATA listings today: passed to the pricelabs auditor. **No edit on any of yesterday's open raises.** Every move below comes from the PriceLabs default/algorithm, not an edit.

## 1. Submarket table
Sources: `market.csv` 5 Nov (bands); `pl_kpis.csv` 5 Nov (`market_occupancy_next_30/60`, `occupancy_next_30/60`).

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50 / P75** / P90 £ (n) | Our occ 30/60 | vs 4 Nov |
|---|---|---|---|---|---|---|
| Canary Wharf | P20 | 2 | 36 / 30% | 212 / **249 / 315** / 415 (153) | 53 / 27% | P75 +2 |
| Canary Wharf (handback 20 Dec) | P01 | 2 | 34 / 29% (pl_kpis 5 Nov) | 214 / 258 / 331 / 421 (row 2 Nov) | 100 / 100%* | PL prices N/A |
| Barking | P04 | 2 | 23 / 20% | 138 / **169 / 214** / 257 (91) | 57 / 52% | P75 −4 |
| Greenwich (handback 26 Nov) | P09 | 1 | 36 / 32% | 110 / 132 / 160 / 204 (row 2 Nov) | 90 / 95%* | PL prices N/A |
| Mile End (handback 13 Dec) | P12 | 2 | 41 / 34% | 170 / **204 / 234** / 291 (121) | 60 / 65% | −1 |
| Marylebone (blocked on purpose) | P06 | 2 | 47 / 42% | row 2 Nov: 314 / 405 / 507 / 618 | 87 / 93%* | PL prices N/A |
| Camden | P11 | 2 | 45 / 39% | 225 / **287 / 328** / 390 (172) | 47 / 48% | P25 −4, P75 −2 |
| St John's Wood | P05 | 4 | 40 / 40% | 456 / **569 / 713** / 1,164 (90) | 77 / 68% | P25 +8 |
| Shepherd's Bush | P13 | 2 | 42 / 38% | 188 / **222 / 278** / 346 (117) | 73 / 52% | P75 −1 |
| Islington (handback 13 Nov) / Primrose Hill (numbers only) | P08 / P14 | 2 / 1 | 49 / 43%; 43 / 39% | `market.csv` 27 Oct only | 90 / 95%*; 0 / 0% | not pulled |

\* Inflated by handback or intentional blocks. No `market.csv` row for Bow, Little Venice, Fulham, P17 St John's Wood, Kings Langley, Ladbroke Grove, Bayswater, Woolwich, Hanger Lane. Bands moved ≤ £8 day on day; market occupancy 30-day moved 0 to +1 pt.

## 2. Yesterday's open raises re-checked against today's prices (no edits found)
| Ask | 4 Nov | **5 Nov** | Market today | Status |
|---|---|---|---|---|
| **P13 12 Nov ≥ £176, min 1** (3064856) | £170, min 2 | **£168, min 2** (twin 3090701 £189) | P25 £177 / P50 £210; mkt occ 43.3 vs 53.8% STLY (**−10.5**) | **Still open.** Gap **£8** (was £6). Min still 2 with 13 Nov booked. Market softer than yesterday (−8.1). |
| **P13 Christmas +10%, min 2 on 25–26 Dec** (3064856, 7–26 Dec, 20 open n) | £4,221; 21–26 Dec min 3 | **£4,211**; **21–26 Dec min 3** (twin £4,458) | P50 £4,931 / P75 £6,193; default £4,567; mkt occ **+5.5 to +24.9 pts vs STLY on all 20 nights** | **Still open.** +10% = £4,632 (**+£421**); to P50 +£720. Min 2 on 25–26 Dec not done. Reyhan's 21–26 Dec −5% (4 Nov) still stands against it: Corentin to confirm. |
| **P05 7–8 Dec to ~P75** | £933 | **£935** (477/458), min 2 | P75 £1,174; default £1,169; occ **+12.3 / +5.8** | **Still open.** +£239 (was +£250, because P75 fell). |
| **P05 13–21 Dec to P75** (9 n) | £5,274 | **£5,299** | P75 £5,818; default £5,716; P50 £4,446; occ **+1.7 to +8.5** on all 9 nights | **Still open.** +£519 (was +£592). Reyhan's 13–19 Dec −7% unchanged: Corentin to confirm. |
| **P04 14–19 Dec 0%** (remove −10%) | £1,143 | **£1,143** (182/185/187/189/197/203) | P75 £1,292; default £1,344; occ +2.2 to +5.5 vs STLY | **Still open.** To P75 +£149, to default +£201. |
| **P20 6–9 Nov +10%** | £858 | **£842** (207/211/206/218), min 3 | P50 £844, P75 £1,093; occ **−10.3 to −15.9 vs STLY** | **Still open, gap +£84.** 6 Nov is tomorrow; market is soft and price is already at P50, so the market data does not support it on its own (the case was conversion/comps, not market). |
| **P20 13–16 Nov +10%** | £916 | **£899** (227/231/221/220) | P50 £845, P75 £1,127; occ +0.1, −10.6, −14.8, −5.2 | **Still open, gap +£90.** Same caveat. |
| **P05 29 Dec ~ default** (min 1, 1-night orphan) | £1,277 | **£1,322**, min 1 | default **£1,063**, P90 £1,075, P75 £811; occ −0.6 | **Still open, moved further away:** £247–259 above default/P90 (was £186–238). Rise is algorithmic (+£45), not an edit. |

None done, none moved by an edit. Prices drifted −£1 to −£17 (P13, P20) and +£2 to +£45 (P05).

### Other asks touched by the overnight changes
- **P12 4 Nov (£302, min 1): did not sell.** No confirmed Smoobu stay covers 4 Nov (`reservations.csv` 5 Nov; the 5–12 Nov stay starts 5 Nov).
- **P12 3 Dec (opened by the 3–7 Dec cancellation):** £253, min 2 (yesterday £254 while booked). Not an orphan: 30 Nov–3 Dec is a 4-night open run (27–30 Nov and 4–7 Dec booked). Market P50 £227 / P75 £273, occ 35.3 vs 31.6 (+3.7). £253 sits between P50 and P75: hold. Note 30 Nov–2 Dec rose £29–30 overnight (203/208/217 → 232/238/246; cause NOT CHECKED).

## 3. Demand calendar, next 90 days
**Verified 5 Nov 2026** (WebSearch restricted to official domains; summaries of official pages):
- **Wembley:** England v Croatia, Thu 12 Nov, 19:45 ([wembleystadium.com event page](https://www.wembleystadium.com/events/2026/England-v-Croatia), [englandfootball.com match centre](https://www.englandfootball.com/england/mens-senior-team/fixtures-results/2026-27/nations-league/england-v-croatia-uefa-nations-league-thursday-12-november-2026-match-centre)). **Ticket status now conflicting:** event page "sold out", tickets page "general sale from 22 Oct until sold out". Attendance not stated.
- **Twickenham** ([nations-championship](https://allianzstadiumtwickenham.com/nations-championship), [England v Japan](https://allianzstadiumtwickenham.com/england-v-japan-nations-championship-pool-match)): England v Japan Sat 14 Nov (16:40 vs 17:20 on the same site); England v New Zealand Sat 21 Nov 14:10; Finals Weekend Fri 27–Sun 29 Nov ([page](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)).
- **The O2** ([venue listing](https://www.theo2.co.uk/events/venue/the-o2-arena)): Noah Kahan 13/14/17 Nov ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026)), Muse 15–16 Nov, The Script Sat 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)), Don Toliver 23 Nov, Mariah Carey Mon 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)), **Capital's Jingle Bell Ball Sat 5 – Sun 6 Dec (new today;** [page](https://www.theo2.co.uk/events/detail/capitals-jingle-bell-ball-2026); one listing says 7 Dec), Kehlani Tue 8 Dec ([page](https://www.theo2.co.uk/events/detail/kehlani-2026); a listing says 9 Dec), Kasabian Fri 18 Dec ([page](https://www.theo2.co.uk/events/detail/kasabian-2026); a listing says 19 Dec). **Disney On Ice 24 Dec–3 Jan: not found today → UNVERIFIED, dropped.** Listing-only (not used for pricing): Stevie Wonder 5 Nov, Suede/Manics 6 Nov, Paul Heaton 7 Nov, Papa Roach 8 Nov, beabadoobee 18, Good Charlotte 19, Myles Smith 20, Jungle 24–25 ([page](https://www.theo2.co.uk/events/detail/jungle-2026)), Squeeze 26, Fontaines D.C. 27, Jessie Ware 28 Nov, Phoebe Bridgers 1–2 Dec, UB40 3 Dec.
- **ExCeL** ([what's on](https://www.excel.london/whats-on)): WTM 3–5 Nov ([page](https://www.excel.london/visitor/whats-on/world-travel-market-london-2026)); #RISK Europe 10–11 Nov ([page](https://www.excel.london/visitor/whats-on/risk-europe-2026)); Business Show / Retail Supply Chain / eCommerce Packaging 11–12 Nov; London EV Show / Biotechnology / Pizza 18–19 Nov; HOMES UK 24–25; London Build + National Civils 25–26 Nov ([page](https://www.excel.london/whats-on/london-build-expo)); FinTech Connect 1–2 Dec; London Perfume Exhibition 10–13 Dec; **London International Horse Show 17–21 Dec** ([londonhorseshow.com](https://londonhorseshow.com/)). Vet Show 19–20 Nov not in today's summary (from 4 Nov only).
- **Alexandra Palace** ([what's on](https://www.alexandrapalace.com/whats-on/)): Courteeners 14 Nov, Enter Shikari 20–21, Nia Archives 26, Blossoms 27, Gorgon City 28 Nov (Great Hall). **World Darts 11 Dec – 3 Jan** ([alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq)); opening Fri 11 Dec 19:00, semis Sat 2 Jan, final Sun 3 Jan 20:00; venue states "a record 180,000 tickets". One PDC ballot release says "to 4 January".
- **NYE:** Thu 31 Dec 20:00 – 1 Jan 00:30, Ticketmaster only, £20–55; second batch date not announced ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)). Attendance not stated.
- **School holidays:** Christmas Mon 21 Dec – Fri 1 Jan, return 4 Jan ([Camden](https://www.camden.gov.uk/term-dates), [Tower Hamlets](https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx), [H&F](https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates)). February half term 15–19 Feb 2027 is outside the window.

Columns: our £ vs fortnight £ (`prices.csv` 5 Nov); market occupancy vs STLY (`neigh_<id>.json` 5 Nov). P20 is not in the VENUES map (`build/properties.py`); shown as nearby, as on 3–4 Nov.

| Nights | Event | Venue | Open properties (VENUES map) | Effect (mkt occ vs STLY) | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 10–11 Nov | #RISK + expos | ExCeL | P04 (P01 none open; P20 booked) | **soft** (−10.6, −12.2) | P04 **140 / 144** vs 147 | no |
| 12 Nov | England v Croatia | Wembley | P13 3064856 (P10 PL N/A) | **soft** (−10.5) | **168** vs 176 | no |
| 13–17 Nov | Kahan / Muse | O2 | P04 13 Nov; P20 13–17 (P01/P09 none open) | P04 −5.8; P20 +0.1, −10.6, −14.8, −5.2, +3.1 | P04 **147** vs 156; P20 **227/231/221/220/223** vs 241 | no |
| 14 Nov | Eng v Japan / Courteeners | Twickenham / Ally Pally | P13, P11 booked | – | booked | – |
| 18–19 Nov | EV show | ExCeL | P04 (P20 blocked) | **soft** (−7.8, −8.7) | P04 **147 / 148** vs 165 | no |
| 20–21 Nov | Script / Eng v NZ / Shikari | O2 / Twickenham / Ally Pally | P04, P20 (P11, P13 booked) | P04 −2.1; P20 +3.2 / −0.9 | P04 **155**/184 vs 170; P20 **238**/293 vs 261 | 21 Nov yes; **20 Nov no (fell overnight, below)** |
| 23 Nov | Don Toliver | O2 | P04, P20 | P04 −6.6; P20 +5.4 | P04 **175** vs 177; P20 286 vs 270 | P20 yes; P04 no |
| 24 Nov | HOMES UK | ExCeL | P04, P20 | P04 −6.4; P20 −1.0 | P04 **175** vs 177; P20 286 vs 277 | P20 yes |
| 26–28 Nov | Ally Pally gigs / Nations Finals | Ally Pally / Twickenham | P11 booked; P13 27 Nov | P13 +9.6 | P13 27 Nov 333 vs 255 | yes |
| 30 Nov | Mariah Carey | O2 | P04, P20 booked | – | – | – |
| 5–6 Dec | Jingle Bell Ball (new) | O2 | P04 6 Dec; P20 5–6 | P04 −2.8; P20 +4.0 / +3.5 | P04 **185** vs 192; P20 335 / **251** vs 275 | 5 Dec yes; 6 Dec no |
| 8 Dec | Kehlani | O2 | P04, P20 | P04 +0.6; P20 −0.7 | P04 **182** vs 192; P20 **237** vs 274 | no |
| 11–12 Dec | Darts opening | Ally Pally | P11 | **+11.0 / +5.5** | 323 / 325 vs 254 | **yes** |
| 13–17 Dec | Darts R1 | Ally Pally | P11 | **soft** (−1.1 to −8.2) | **227/203/210/219/239** vs 279 | no (override conflict) |
| 16–20 Dec | Horse Show 17–21 / Kasabian 18 | ExCeL / O2 | P04 16–19; P20 16–20 | P04 +4.5 to +5.5; P20 −3.5 to +1.4 | P04 **187**/189/197/203 vs 188; P20 **252/253**/262/279/257 vs 256 | P04 thin; P20 16–17 no |
| 18 Dec | Darts | Ally Pally | P11 | −4.2 | 285 vs 249 | yes |
| 21 Dec–1 Jan | School Christmas holiday | London | P13 7–26 Dec, P11 23–24 Dec, P20, P05 29 Dec | P13 +5.5 to +24.9; P11 −1.4 / −5.6 | P13 under P50 every night (§2) | no for P13 |
| 23 Dec | Darts R2 | Ally Pally | P11 | −1.4 | **294** vs 317 | no |
| 31 Dec | NYE | central | P20 (others booked) | **+12.7** | 469 vs 268 | **yes** |
| 3 Jan | Darts final | Ally Pally | P11 | **+5.2** | **190** vs 204 (clean week) | no |
| 4 Jan–3 Feb | no verified event | – | – | – | Reyhan's Jan −10% (P04, P13, P20) | – |

**Why 20 Nov fell overnight** (P04 182 → 155, P20 300 → 238): 20 Nov is now 15 days out. P04's live settings (`get_customizations` 3562176, 5 Nov) show an "Aggressive" occupancy profile whose 0–15-day band runs −30% to 0% vs −20% to +10% in the 16–30 band, plus last-minute −5% gradual within 15 days. P04's default for 20 Nov is unchanged (£249), so the cut is in customizations, consistent with that band change. P20's default itself fell £347 → £274. Per-night attribution NOT CHECKED.

## 4. Missed compression: open nights on verified events at or below the fortnight
| Ref | Night(s) | Event | Our £ 5 Nov (4 Nov) | Fortnight £ | Gap £ | Market support |
|---|---|---|---|---|---|---|
| P13 | 12 Nov | England v Croatia | 168 (170) | 176 | **8** | weak: occ −10.5 |
| P20 | 13–17 Nov | Kahan / Muse | 227, 231, 221, 220, 223 (226, 233, 230, 227, 234) | 241 | 14, 10, 20, 21, 18 = **83** (4 Nov 135) | weak/mixed |
| P20 | 20 Nov | The Script eve | 238 (300) | 261 | **23** (new) | +3.2 |
| P20 | 6 Dec | Jingle Bell Ball (new event) | 251 | 275 | **24** | +3.5 |
| P20 | 8 Dec | Kehlani | 237 (256) | 274 | **37** (19) | −0.7 |
| P20 | 16, 17 Dec | Horse Show | 252, 253 (250, 249) | 256 | 4, 3 = 7 (17) | −3.5 / −0.1 |
| P04 | 10, 11 Nov | ExCeL expos | 140, 144 (149, 151) | 147 | 7, 3 | **none**: −10.6 / −12.2 |
| P04 | 13 Nov | Kahan | 147 (156) | 156 | 9 | none: −5.8 |
| P04 | 18, 19 Nov | EV show | 147, 148 (155, 155) | 165 | 18, 17 | none: −7.8 / −8.7 |
| P04 | 20 Nov | The Script eve | 155 (182) | 170 | **15** (new) | none: −2.1 |
| P04 | 23, 24 Nov | Don Toliver / HOMES UK | 175, 175 (176, 176) | 177 | 2, 2 | none: −6.6 / −6.4 |
| P04 | 6 Dec | Jingle Bell Ball (new) | 185 | 192 | 7 | none: −2.8 |
| P04 | 8 Dec | Kehlani | 182 (180) | 192 | 10 | +0.6 |
| P04 | 16 Dec | Horse Show eve | 187 (187) | 188 | 1 | +4.5 |
| P11 | 23 Dec | Darts R2 | 294 (298) | 317 | 23 (13) | none: −1.4 |
| P11 | 3 Jan | Darts final | 190 (188) | 204 | 14 (15) | +5.2 |
| | | **Excluding darts R1** | | | **24 nights / £310** (4 Nov: 21 / £281) | |
| P11 | 13–17 Dec | Darts R1 (conflict) | 227/203/210/219/239 (229/203/207/218/237) | 279 | 52, 76, 69, 60, 40 = **£297** (£296) | none: −1.1 to −8.2 |
| | | **Full total** | | | **29 nights / £607** (4 Nov: **26 / £577**) | |

- **Change vs yesterday: +3 nights / +£30.** Like-for-like (without the newly verified Jingle Bell Ball, P04 + P20 6 Dec = 2 n / £31): **27 n / £576**, i.e. flat in £.
  - **New:** P04 and P20 20 Nov (+£38, the 15-day band effect above); Jingle Bell Ball 6 Dec (+£31).
  - **Smaller:** P20 Kahan 13–17 Nov £135 → £83 (fortnight fell to £241 as surrounding nights dropped); P20 16–17 Dec £17 → £7.
  - **Larger:** P20 8 Dec £19 → £37 (237 vs 256 yesterday); P11 23 Dec £13 → £23.
  - **Off the list:** P20 20 Dec (257 vs fortnight 256).
- **Where the market actually supports a raise** (occ clearly above STLY, and our price under the fortnight or P50): **P13 Christmas** (+5.5 to +24.9 pts, under P50 all 20 nights), **P05 7–8 and 13–21 Dec**, **P04 14–19 Dec**, P11 3 Jan (+5.2; +£14). The P04 November gaps rest on the fortnight rule against a market 2–12 pts below STLY: **not proposed**, as yesterday. P11 11–12 Dec and P20 31 Dec are already priced.

## 5. Dates where our price should differ from PriceLabs
All open from 4 Nov; nothing new proposed except where marked.
- **Shepherd's Bush P13:** 12 Nov ≥ £176, min 1 (+£8; market soft). Christmas 7–26 Dec +10% (**+£421**) or to P50 (+£720), min 2 on 25–26 Dec; conflicts with Reyhan's 21–26 Dec −5% min 3: Corentin to confirm. Twins £247 apart over 20 nights (3090701 dearer).
- **St John's Wood P05:** 7–8 Dec to ~P75 (**+£239**); 13–21 Dec to P75 (**+£519**; conflicts with Reyhan's 13–19 Dec −7%). 29 Dec down to £1,063–1,075 (**−£247 to −£259**).
- **Barking P04:** 14–19 Dec 0% (+£149 to P75). November: no event raise. −15% vs Corentin's −8% on 9–24 Nov still a conflict for Corentin.
- **Camden P11:** 23 Dec ≥ £317 (+£23); 3 Jan ≥ £204 (+£14). Darts R1 13–17 Dec stays a conflict (market soft), not a proposal.
- **Canary Wharf P20:** 6–9 Nov (+£84) and 13–16 Nov (+£90) +10% remain open but the market is soft (−10 to −16 pts on 6–9 Nov, at P50): the case is conversion, not demand. **New small items:** 6 Dec ≥ £275 (+£24, Jingle Bell Ball, occ +3.5); 8 Dec +£37 (market flat). Hold 31 Dec (£469, NYE priced).
- **Mile End P12:** 3 Dec reopened at £253 min 2 (P50–P75): hold.

Data gaps:
1. Market figures are PriceLabs Nearby Listings (Airbnb-derived, `cleaning_fee` null, not comp sets, horizon unstated). P05 bands may include 3 BR (summary `best_category` 3 BR). P01, P09, P06 rows from 2 Nov; P08/P14 from 27 Oct; P10, P15–P19, P02/P03/P07 not pulled.
2. **PriceLabs prices NOT AVAILABLE for P01, P06, P09, P10 (LISTING_NO_DATA).** P01/P09 open nights taken from live Smoobu (none on event nights). P10 (Wembley/Twickenham/Heathrow map) open nights before 18 Nov NOT CHECKED.
3. Events are domain-restricted WebSearch summaries, not page reads; `www.theo2.co.uk`, `www.excel.london`, `www.wembleystadium.com`, `www.alexandrapalace.com` must be allowed in the session's network settings to read them directly. Open conflicts: England v Croatia sold out vs on general sale; Jingle Bell Ball 5–6 vs 7 Dec; Kehlani 8 vs 9 Dec; Kasabian 18 vs 19 Dec; Twickenham 14 Nov kick-off 16:40 vs 17:20; darts end 3 vs 4 Jan; Disney On Ice not found today (UNVERIFIED). Attendance stated only for darts (180,000 tickets).
4. The 20 Nov drop is attributed to the 0–15-day occupancy band from P04's settings only; P20 settings not read; not confirmed per night.
5. P12 30 Nov–2 Dec +£29–30 overnight: cause NOT CHECKED.
6. P06 15–22 Nov "fixed" override (4 Nov 12:52:23Z) has no price value in the log: handed to the pricelabs auditor.

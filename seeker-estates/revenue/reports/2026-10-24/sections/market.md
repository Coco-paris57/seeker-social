# Market & demand calendar — run D = 2026-10-24 (window 24 Oct 2026 – 21 Jan 2027)

## Sources and method
- **Policy:** `data/policy.json` read first. Exclusions applied:
  - P02, P03, P06, P07: intentional blocks. P14: numbers only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13 twin nights blocked because the other twin is booked count as bookings.
- **Market occupancy 30/60:** `data/snapshots/2026-10-24/pl_kpis.csv`, columns `market_occupancy_next_30` / `market_occupancy_next_60`.
- **P50/P75:** `data/snapshots/2026-10-24/market.csv`.
  - comp-east / comp-west wrote all 12 rows at 06:23Z, so **I did not write to market.csv or raw/**.
  - My own `get_neighbourhood_data` pulls for P11 (3064196) and P12 (2699998) on 24 Oct match those rows: P11 2BR 244/306/362, n=173; P12 2BR 179/215/257, n=121.
- **Daily market occupancy vs STLY (same time last year):** from `get_neighbourhood_data` `occupancy.daily`:
  - My 24 Oct pulls for P11 (Camden; market is 1–3BR) and P12 (Mile End; 2–3BR). These were not saved to raw/.
  - comp-west's `raw/neighbourhood_P13.json` (Shepherd's Bush).
  - I checked the date alignment against the `occ_insights` anchors. Camden 5 Dec reads 51.5 and 28 Dec reads 34; Mile End 6 Dec reads 33.7 and 28 Dec reads 34.1; P13 2 Dec reads 31.2 and 26 Dec reads 39.5.
- **Our prices:**
  - 25 Oct – 23 Dec: `data/snapshots/2026-10-24/prices.csv`, column `pricelabs_price`.
  - 23 Dec – 27 Jan: live `get_listing_prices` field `price`, pulled 24 Oct, for P11, P20 and P04 (P13 to 10 Jan only). Saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m24/live24.py`.
  - `last_refreshed_at` values: P13 23 Oct 06:57Z, P20 08:40Z, P04 09:14Z, P12 09:57Z, P11 11:12Z (raw/prices_*.json).
- **Fortnight:** same method as 23 Oct.
  - It is the 7 nights before plus the 7 after the event block. Blocked nights and nights above 2× the median are excluded; booked nights count at list price.
  - **Clean-week rule** (one side only, used where the other week is itself a demand period): 16–20 Dec uses 9–15 Dec; 3 Jan uses 4–10 Jan; 16 Jan uses 9–15 Jan; Bett 19–20 Jan uses 12–18 Jan. Strict figures are shown too.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m24/analyse24.py`. It is the 23 Oct script pointed at today's snapshot. The P11 "reopen" patch is removed because PriceLabs now shows 19–26 Nov as open.
  - Outputs: `.../m24/out24.txt` (today) and `.../m24/out23.txt` (re-run on the 23 Oct data).
- **Events:** re-verified 2026-10-24 through WebSearch restricted to venue or organiser domains (search-indexed primary pages). Direct fetches are not possible: theo2.co.uk is refused by the proxy.
  - Attendance is stated only for darts (180,000 tickets target, over 5,000 per session; pdc.tv / alexandrapalace.com).
  - Not re-checked today, carried from the 23 Oct verification: London Build organiser page, Business Show organiser page, darts 23 Dec session list (pdc.tv/WCFAQ), Harlequins Big Game 18, England Women v Ukraine (5 Dec), Ally Pally Fireworks & Drone Festival.

## 1. Submarket table (2026-10-24)

| Submarket | Ref | Area | BR | Mkt occ 30/60 (`pl_kpis`) | P50 / P75 £ (n) (`market.csv`) | Our occ 30/60 (`pl_kpis`) | Avg open £, 25 Oct–23 Nov (nights) |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf (HB after 20 Dec) | 2 | 33% / 26% | 274 / 338 (142) | 100/100%* | none open |
| | P20 | Canary Wharf (Waterford Ct) | 2 | 35% / 27% | 266 / 324 (147) | 23% / 12% | 270 (25) |
| | P04 | Barking | 2 | 25% / 20% | 179 / 222 (86) | 27% / 33% | 163 (24) |
| | P09 | Greenwich (HB after 26 Nov) | 1 | 37% / 31% | 142 / 172 (127) | 63/82%* | 158 (11) |
| | P12 | Mile End (HB after 13 Dec) | 2 | 40% / 33% | 215 / 257 (121) | 40% / 45% | 213 (18) |
| | P07 / P15 | Woolwich / Bow | — | — | — | intentional block / no PriceLabs listing | — |
| Central | P08 | Islington (HB after 13 Nov) | 2 | 50% / 44% | 227 / 284 (148) | 57/78%* | 167 (13) |
| | P11 | Camden | 2 | 45% / 38% | 306 / 362 (173) | **53% / 55%** (PriceLabs has now registered the 19–26 Nov cancellation) | 221 (16) |
| | P05 | St John's Wood | 4 | 38% / 36% | 616 / 737 (90) | 73% / 62% | 482 (8) |
| | P14 | Primrose Hill (report only) | 1 | 41% / 38% | 203 / 253 (174) | 0% / 0% | 500 (30) |
| | P06 / P03 | Marylebone / Bayswater | 2 / 3 | 44/40% · 49/44% | P06 416 / 542 (215) | intentional blocks | — |
| | P16 / P17 | Little Venice / SJW | — | — | — | no PriceLabs listing | — |
| West | P13 | Shepherd's Bush | 2 | 41% / 36% | 244 / 302 (117) | 47% / 37% | 196 (18) |
| | P10 | Hanger Lane (HB after 18 Nov) | 1 | 30% / 24% | 133 / 161 (121) | 100/100%* | — |
| | P02 / P18 / P19 | Ladbroke Grove / Fulham / Kings Langley | — | — | — | block / no listing | — |

\* Inflated because PriceLabs counts the handback blocks as occupied.

**Market moves since 23 Oct (`market.csv`):**
- P50 moved by £4 or less: P12 211→215, P01 277→274, P08 225→227, P05 614→616.
- P75 moved most on P05 (723→737), P13 (307→302) and P08 (281→284).
- Market occupancy 30/60 moved by 1 point or less everywhere.

**PriceLabs neighbourhood signals (24 Oct pulls, `fp_insights` / `occ_insights`):**
- **Camden:** prices +30.8% on 26–31 Dec. Occupancy +19.7% on 28 Dec – 1 Jan and +12.5% on 5–7 Dec.
- **Mile End:** prices +17.5% on 27–31 Dec. Occupancy +16.9% on 28 Dec – 1 Jan and +8.4% on 6 Dec. The insight says Mile End is "performing slightly worse" than last year over the next 2 months.
- **Shepherd's Bush:** occupancy +12.5% on 26 Dec – 1 Jan and +9.1% on 2–7 Dec. The insight says the next 3 months are "slightly better" than last year.
- None of the three feeds shows a darts, O2, ExCeL or Twickenham spike.

## 2. Half term, 26–30 Oct, and next-week demand

**Dates verified 24 Oct (council pages): Mon 26 – Fri 30 Oct 2026, pupils back Mon 2 Nov.**
- Tower Hamlets (P01, P20, P12, P15): towerhamlets.gov.uk/lgnl/education_and_learning/schools/term_and_holiday_dates.aspx
- Camden (P11, P14): camden.gov.uk/term-dates. This covers community schools only; the page says academies and VA schools may differ.
- Islington (P08): islington.gov.uk/children-and-families/schools/term-and-holiday-dates
- Westminster / RBKC bi-borough (P05, P06, P03): westminster.gov.uk/children-and-families/education/school-term-and-holiday-dates and the bi-borough 2026-27 document. The council calls these "recommended/proposed"; schools set their own dates.
- Hammersmith & Fulham (P13, P18): lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-term-and-holiday-dates
- NOT CHECKED: Greenwich (P09, P07), Barking & Dagenham (P04), Ealing (P10), and private schools.
- From the same pages: Christmas break 21 Dec – 1 Jan, term starts 4 Jan; spring half term 15–19 Feb 2027.

**Market occupancy, half-term week vs STLY** (`get_neighbourhood_data` occupancy.daily, pulled 24 Oct; figures in %):

| Night | Camden (P11 ND) mkt / STLY | Mile End (P12 ND) mkt / STLY | Shepherd's Bush (P13 ND) mkt / STLY |
|---|---|---|---|
| Sat 24 Oct | 78.6 / 87.9 | 73.7 / 71.7 | 73.9 / 70.4 |
| Mon 26 | 61.5 / 70.9 | 50.3 / 66.1 | 58.5 / 54.8 |
| Tue 27 | 61.2 / 72.4 | 47.7 / 59.1 | 59.8 / 53.4 |
| Wed 28 | 57.2 / 69.5 | 48.9 / 60.9 | 58.2 / 54.8 |
| Thu 29 | 54.4 / 66.1 | 44.2 / 54.5 | 53.0 / 44.5 |
| Fri 30 | 50.3 / 49.4 | 49.0 / 57.8 | 52.6 / 46.4 |
| Sat 31 | 52.6 / 51.4 | 50.9 / 62.0 | 44.0 / 45.3 |
| Sun 1 Nov | 37.0 / 43.5 | 35.7 / 54.9 | 28.8 / 37.6 |

- **7-day market pickup, Mon–Wed of half term:**
  - Camden: 11.4 / 10.2 / 7.0 points, against 17.6 / 17.0 / 13.3 STLY.
  - Mile End: 9.3 / 9.0 / 7.9, against 10.7 / 6.7 / 5.4 STLY.
- **Effect: soft in Central and East, firmer in West.**
  - Camden is 9–12 points behind STLY on Mon–Thu, and pickup is slower than last year.
  - Mile End is 9–16 points behind STLY on every half-term night.
  - Shepherd's Bush is 4–9 points ahead of STLY on Mon–Fri.
  - Half term is therefore not a compression period this year. After it, all three markets fall to 25–37% from 1 Nov.
- **How PriceLabs prices next week.** Open half-term nights sit below the following week; the after-week contains WTM and Stevie Wonder, so it is not a clean comparator:
  - P08: 157–164 vs 168.
  - P09: 144–158 vs 175.
  - P11 (28–30 Oct): 199–208 vs 214.
  - P12 (26–29 Oct): 155–169 vs 186.
  - P20 (26–27 Oct): 237/240 vs 283.
  - This matches the soft Central and East data, so I see no half-term case for raising them.
- **West exception: P13 3064856.**
  - 25–26 Oct are open at **£136 / £140**. In P13's ND daily data, market P25 for those nights is £205 / £209 and P50 £244 / £248.
  - The West market is ahead of last year, so on Airbnb-derived market data these two nights look low. On Booking.com the guest price is 1.2× (policy).
  - 27–30 Oct are booked on twin 3090701.
- **Already sold out next week:** P01, P04 and P10 (26–30 Oct), and P20 28–30 Oct.
- **P05 27–28 Oct** are newly Blocked in `prices.csv` (open on 23 Oct). No reservation is linked, and the reason is NOT CHECKED (also noted in `market.csv`).

## 3. Demand calendar, 24 Oct 2026 – 21 Jan 2027

"Our £ vs fortnight £" uses today's prices. B = booked, BLK = blocked, HB = after handback. Venues come from the `build/properties.py` VENUES map. P20 is not in the map and is treated as Canary Wharf (O2 + ExCeL). All sources were checked 2026-10-24 unless marked otherwise.

### East (O2 → P01, P09, P04 [P07 blocked]; ExCeL → P01, P04 [P15 has no listing]; P20 as Canary Wharf)
| Nights | Event | Primary source | Effect | Priced? (our £ vs fortnight £) |
|---|---|---|---|---|
| 25–28, 31 Oct | **New:** O2 arena: Fally Ipupa 25, Critical Role Live 26, Cody Johnson 27, D-Block Europe 28, Duran Duran 31 Oct. No attendance stated | theo2.co.uk/events/venue/the-o2-arena; /events/detail/fally-ipupa, /cody-johnson, /d-block-europe-2026 | normal (single arena nights inside a soft half-term market) | After-week comparison only, because the snapshot has no before-week. **P20** 25/26/27 Oct: 237/237/240 vs 251/258/266 (below); 31 Oct 259 vs 287. **P09** 26–28 Oct: 154 vs 157/162/166; 31 Oct 157 vs 176. P04 25 Oct 141 vs 140. P01 B. Not counted in §4 (see note) |
| 2–4 Nov | WTM London, ExCeL 3–5 Nov | excel.london/visitor/whats-on/world-travel-market-london-2026 | compression | P20 286/291/293 vs 261 **yes**; P04 166/172/173 vs 151 **yes**; P01 B |
| 3, 5 Nov | Stevie Wonder, O2 (Tue 3 Nov, plus extra date Thu 5 Nov) | theo2.co.uk/events/detail/stevie-wonder; axs.com/uk/events/1599376; axs.com/events/1602335 | compression | P20 291/285 vs 263 yes; P04 172/167 vs 153 yes; P01, P09 B |
| 10–11 Nov | The Business Show, ExCeL 11–12 Nov | excel.london/whats-on/the-business-show-london-2026 (organiser page verified 23 Oct) | compression | **P20 264/264 vs 272; P04 159/159 vs 163**; P01 B |
| 13–14 Nov | Noah Kahan, O2 (13, 14, 17 Nov) | theo2.co.uk/events/detail/noah-kahan-2026 | compression | P20 272/289 vs 265 yes; P04 167/169 vs 160 yes; P09 163/168 vs 157 yes; P01 B |
| 15–16 Nov | Muse, O2 (Sun 15, Mon 16) | theo2.co.uk/events/detail/muse-2026 | compression | **P20 250/247 vs 273; P04 155/150 vs 163**; P01, P09 B |
| 17 Nov | Noah Kahan, O2 | as above | compression | **P20 255 vs 277; P04 154 vs 166**; P01, P09 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on/london-vet-show-2026 | compression | **P20 276/281 vs 284; P04 154/155 vs 171**; P01 B |
| 21 Nov | The Script, O2, Sat 21 Nov | theo2.co.uk/events/detail/the-script-2026 | compression | **P04 173 vs 176 (now below; was level)**. P20 20–21 Nov still BLK (reason NOT CHECKED). P01, P09 B |
| 24–25 Nov | London Build Expo, ExCeL 25–26 Nov | excel.london/whats-on/london-build-expo | compression | **P20 24 Nov 304 vs 314**; 25 Nov 317 yes; P04 24 Nov 198 vs 182 yes, 25 Nov B; P01 B |
| 1–2 Dec | Phoebe Bridgers, O2 (Tue 1, Wed 2) | theo2.co.uk/events/detail/phoebe-bridgers | compression | **P20 301/326 vs 347**; P04 1 Dec B, 2 Dec 630 (gap night); P01 BLK; P09 HB |
| 16–20 Dec | The Darkness 16, Greg Davies 17, Kasabian 18, Culture Club 19 Dec (O2); London International Horse Show, ExCeL 17–21 Dec | theo2.co.uk/events/detail/the-darkness-2026, /kasabian-2026; axs.com/events/1232906; londonhorseshow.com; excel.london/whats-on/london-international-horse-show | compression | Clean week (9–15 Dec): **P20 16 Dec 292 vs 332**; 17–20 Dec 341/351/377/336 above. **P04 16 Dec 201 vs 204**; 17 Dec 204 vs 204 (level); 18–19 Dec 216/228 above; 20 Dec B. Strict: P20 385, P04 230 (every open night below). P01 16–17 BLK, 18–20 B |
| 31 Dec | NYE fireworks (first ticket batch on sale 23 Oct 12:00; second batch date to be announced) | london.gov.uk/events/london-new-years-eve-2026 | compression | P20 630 vs 373 yes; P04 B |
| 16 Jan | aespa, O2, Sat 16 Jan 18:30 | theo2.co.uk/events/detail/aespa-2027; axs.com/uk/events/1425626 | compression | Clean week: P20 275 vs 266 yes; P04 188 vs 179 yes. Strict: P20 292 (no), P04 181 (yes) |
| 19–20 Jan | Bett UK, ExCeL 20–22 Jan | uk.bettshow.com | compression | Clean week (12–18 Jan): P20 277/282 vs 265 (+12/+17); P04 181/183 vs 181 (0/+2). **20 Jan has dropped out of the P20 far-out premium as predicted (363→282)** |

### Central (Alexandra Palace → P08, P11; Emirates → P08; Regent's Park → P05, P14: nothing found)
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 6–7 Nov | Arsenal v Hull City, Emirates, Sat 7 Nov 15:00 (club says the game is unaffected by broadcast picks) | arsenal.com ticket-information "Arsenal v Hull City"; arsenal.com "Two Premier League games rearranged in November" | compression | **P08 6 Nov 191, 7 Nov 192 vs 202: both below** (7 Nov was 276 on 23 Oct) |
| 14 Nov | **New:** Courteeners, Ally Pally Great Hall. The event page says 14 Nov; the What's On listing shows 13 Nov – 6 Dec | alexandrapalace.com/whats-on/courteeners/ | compression (size unstated) | P11 14 Nov B; P08 HB. No effect |
| 20–21 Nov | Enter Shikari, Great Hall. The event page says 20–21 Nov; the main listing shows 21 only | alexandrapalace.com/whats-on/enter-shikari/ | compression (size unstated) | **P11 268/268 vs 248 yes** (now open in PriceLabs) |
| 26–28 Nov | Nia Archives 26, Blossoms 27, Gorgon City 28 Nov. Event pages; the main listing shows Nia 27 and Gorgon City 29 | alexandrapalace.com/whats-on/nia-archives/, /blossoms/, /gorgon-city/ | compression (size unstated) | P11 26 Nov 282, 27 Nov 326 vs 266 yes (27 Nov's +60% override removed); 28 Nov B |
| 13–17 Dec | World Darts, Ally Pally (11 Dec – 3 Jan; 180,000 tickets target; ballot closed) | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/; pdc.tv ticket news (Aug–Sep 2026) | compression | **P11 262/241/247/259/272 vs 299: all 5 below** (23 Oct: 331/308/314/327/342 vs 333). See §5 |
| 23 Dec | Darts round two, last session before the break (session list verified 23 Oct) | pdc.tv/WCFAQ | compression | P11 333 vs 326 yes (fortnight fell from 356) |
| 24–26 Dec | Darts Christmas break (from the 23 Oct session list) | pdc.tv/WCFAQ | normal | P11 24–25 Dec open 329/324; 26 Dec – 2 Jan B |
| 3 Jan | Darts final (PDC calendar and Ally Pally say 3 Jan; one PDC release says 4 Jan) | alexandrapalace.com; pdc.tv/calendar | compression | P11 202 vs clean week (4–10 Jan) 202: level, not counted. Strict 294 |

### West (Twickenham → P13 [P10 HB; P16, P18 no listing]; Wembley → P13 [P02 blocked; P10 HB])
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Sun 8 Nov 15:10 | allianzstadiumtwickenham.com/england-v-australia-nations-championship-pool-match | compression | P13 7 Nov booked on twin 3090701; 8 Nov 216 vs 194 yes |
| 12 Nov | England v Croatia, Wembley, Thu 19:45 GMT | englandfootball.com Match Centre, England v Croatia, 12 Nov 2026 | compression | P13 214 vs 208 yes |
| 13–14 Nov | England v Japan, Sat 14 Nov 16:40 | allianzstadiumtwickenham.com/nations-championship | compression | P13 booked on twin 3090701 |
| 20–21 Nov | England v New Zealand, Sat 21 Nov 14:10 | allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match | compression | **P13 216/218 vs 219 (both below by £3/£1)** |
| 26–29 Nov | Nations Championship Finals Weekend, Fri 27 – Sun 29 Nov. One stadium page says 1 Dec; the main pages say 27–29 Nov | allianzstadiumtwickenham.com/nations-championship-finals-weekend | compression | P13 26 Nov 229 vs 228 (now +1); 27 Nov 250 yes; 28–29 Nov B |
| 5 Dec | England Women v Ukraine, Wembley (verified 23 Oct) | wembleystadium.com/events/2026/England-Women-v-Ukraine | compression | P13 B |
| 28 Dec | Harlequins Big Game 18, Allianz Stadium (verified 23 Oct; not found in today's search) | allianzstadiumtwickenham.com/big-game-18 | compression (inside the NYE surge) | P13 376 vs 253 yes |
| 31 Dec | NYE | london.gov.uk | compression | P13 384 vs 233 yes |

## 4. Missed compression — open event nights at or below the fortnight (sellable flats only)

| Submarket | Ref | Night | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|---|
| East | P20 | 10, 11 Nov | Business Show | 264, 264 | 272 | 8, 8 |
| | P20 | 15, 16 Nov | Muse | 250, 247 | 273 | 23, 26 |
| | P20 | 17 Nov | Noah Kahan | 255 | 277 | 22 |
| | P20 | 18, 19 Nov | Vet Show | 276, 281 | 284 | 8, 3 |
| | P20 | 24 Nov | London Build | 304 | 314 | 10 |
| | P20 | 1, 2 Dec | Phoebe Bridgers | 301, 326 | 347 | 46, 21 |
| | P20 | 16 Dec | The Darkness / Horse Show eve | 292 | 332 (clean week) | 40 |
| | | | | | **P20 subtotal** | **11 nights / £215** (23 Oct: 11 / £248) |
| East | P04 | 10, 11 Nov | Business Show | 159, 159 | 163 | 4, 4 |
| | P04 | 15, 16 Nov | Muse | 155, 150 | 163 | 8, 13 |
| | P04 | 17 Nov | Noah Kahan | 154 | 166 | 12 |
| | P04 | 18, 19 Nov | Vet Show | 154, 155 | 171 | 17, 16 |
| | P04 | 21 Nov | The Script (**new**) | 173 | 176 | 3 |
| | P04 | 16 Dec | The Darkness / Horse Show eve | 201 | 204 (clean week) | 3 |
| | | | | | **P04 subtotal** | **9 nights / £80** (23 Oct: 8 / £87) |
| Central | P11 | 13, 14, 15, 16, 17 Dec | Darts round one | 262, 241, 247, 259, 272 | 299 | 37, 58, 52, 40, 27 = **£214** (23 Oct: 4 / £52) |
| | P08 | 6, 7 Nov | Arsenal v Hull (eve + match day) | 191, 192 | 202 | 11, 10 = **£21** (23 Oct: 1 / £6) |
| West | P13 | 20, 21 Nov | England v NZ (eve + match day) | 216, 218 | 219 | 3, 1 = **£4** |

**Headline: 29 open nights, £534 below the fortnight** (East 20 / £295; Central 7 / £235; West 2 / £4). The 23 Oct figure was 27 nights / £418.
- Net +2 nights and +£116. P11 darts accounts for +£162 of that.
- **Dropped off since 23 Oct:** P11 23 Dec (fortnight fell to 326), P13 26 Nov (229 vs 228).
- **Added:** P11 17 Dec, P08 7 Nov, P04 21 Nov, P13 21 Nov.
- **Watch-list (level, not counted):** P04 17 Dec 204 vs 204; P11 3 Jan 202 vs 202 (clean week); P04 19 Jan 181 vs 181.
- **Strict fortnight** (no clean-week rule) adds P20 17–20 Dec (vs 385), P04 17–19 Dec (vs 230), P11 3 Jan (vs 294), P20 16 Jan (vs 292) and P04 19 Jan / P20 19–20 Jan (vs 183 / 318). These mostly compare against Christmas, NYE or far-out-premium nights.
- **Not counted:** the next-week O2 nights (P20 25–27 and 31 Oct, P09 26–28 and 31 Oct) sit below the after-week. The before-week is not in the snapshot, the after-week holds WTM / Stevie Wonder, and market data for the week is soft (§2). On those terms it is not a clean missed-compression call.

## 5. What changed since 23 Oct
1. **P11 darts 13–17 Dec fell by about £68 a night (average £324 → £256).**
   - `get_user_logs` (listing, 23–24 Oct): **reyhan@ set 12–18 Dec to +5%, min-stay 2 on 23 Oct 11:11Z**, on Smoobu 3064196 and copied to Vrbo 12037367. `get_listing_date_overrides` confirms +5% on 12–18 Dec, `updated_at` 2026-10-23T11:11:36Z.
   - In 23 Oct `raw/prices_3064196.json`, the darts nights were priced 23–26% above `uncustomized_price` (e.g. 13 Dec 331 vs 269; 14 Dec 308 vs 244). Today they sit at roughly `uncustomized_price` (262 vs 271; 241 vs 241).
   - policy.json `price_changes` records "21 Oct: P11 Camden darts nights 13–17 Dec raised (Corentin); average above £300/night". The 23 Oct edit appears to have replaced that raise. **Needs confirmation from Corentin/Reyhan that the cut was intended.** The previous override value is not visible in the API, so it is NOT CHECKED.
2. **P11 19–26 Nov now open in PriceLabs.** This resolves t-p11-sync. Reyhan's same 23 Oct 11:11Z edit replaced the orphan overrides (18 Nov +30%, 27 Nov +60%) and the 19–26 Nov −5%/−2% with min-stay 2 and no price adjustment. Results:
   - 18 Nov 314 → 214; 27 Nov 589 → 326.
   - Event nights 20–21 Nov 268/268 (fortnight 248) and 26 Nov 282 (fortnight 266) stay above the fortnight.
3. **P11 non-override nights about 10% lower** (e.g. 10 Nov 223 → 199; `uncustomized_price` 243 → 224). This also pulls the darts fortnight down (333 → 299). No log entry, so it looks algorithmic.
4. **P08 7 Nov (Arsenal v Hull match day) 276 → 192.** `uncustomized_price` 272 → 188, with no log or override change, so it is algorithmic. Both 6 and 7 Nov are now below the fortnight. P08 is handed back after 13 Nov, so these are sellable nights.
5. **P20 event nights rose £3–8** (algorithm; no P20 log). Gaps narrowed on 15–17 Nov, 18 Nov, 24 Nov and 1–2 Dec. The P20 subtotal fell from £248 to £215.
6. **P04 21 Nov (The Script)** 174 → 173 against a fortnight of 176, so it is now £3 below (was level). **P04 22 Nov** 185 → 157 (`uncustomized_price` 225 → 174).
7. **Bett / P20:** the far-out premium dropped off 20 Jan as forecast (363 → 282). Bett eve stays +12/+17 above the clean week. 21 Jan (370) still carries the premium; `uncustomized_price` is 306.
8. **Events:**
   - New: O2 arena nights 25–31 Oct; Courteeners at Ally Pally (14 Nov, no effect).
   - Re-verified: WTM, Stevie Wonder (3 Nov, plus extra 5 Nov), Business Show, Noah Kahan, Muse, Vet Show, The Script, London Build, Phoebe Bridgers, The Darkness / Kasabian / Culture Club, Horse Show, darts dates, NYE, aespa, Bett, England v Australia / Japan / NZ, Finals Weekend, England v Croatia, Arsenal v Hull.
   - Date conflicts newly seen on alexandrapalace.com: the main listing disagrees with the event pages for Enter Shikari, Nia Archives and Gorgon City. I used the event pages.
9. **Still open:** P20 20–21 Nov Blocked (no reservation, not in policy), reason NOT CHECKED. P05 27–28 Oct newly Blocked, reason NOT CHECKED.

Data gaps:
1. Market P50/P75 are Airbnb-derived Nearby-Listings percentiles, not comps. The horizon is unstated and the cleaning basis unknown. P11 sells on Booking.com only.
   - Daily market-vs-STLY occupancy was read only for Camden, Mile End and Shepherd's Bush. Canary Wharf, Barking, Greenwich and Islington half-term figures are NOT CHECKED.
   - My P11 and P12 pulls were not saved to raw/ (comp-east/comp-west own those files).
2. Events are verified through domain-restricted WebSearch summaries of primary pages. theo2.co.uk direct fetches are refused by the proxy.
   - Carried from 23 Oct without re-check: London Build and Business Show organiser pages, darts session list (23 Dec / Christmas break), Big Game 18, England Women v Ukraine, Fireworks & Drone Festival.
   - Attendance is stated only for darts. Ally Pally concerts have no stated capacity, and their dates conflict between the listing page and the event pages.
   - Critical Role and Duran Duran detail URLs were not returned; the source is the O2 arena listing page.
3. Half-term dates were checked for Tower Hamlets, Camden, Islington, Westminster/RBKC and H&F only. Greenwich, Barking & Dagenham, Ealing and private-school dates are NOT CHECKED.
4. The previous P11 12–18 Dec override value (Corentin's 21 Oct raise) is not exposed by `get_listing_date_overrides` or `get_user_logs`. Its size is inferred only from the 23 Oct price vs `uncustomized_price`.
5. Prices were last refreshed 23 Oct 06:57–11:12Z, so changes made after that are not reflected. P13 live prices were pulled only to 10 Jan. The before-week for the 25–31 Oct O2 nights is not in any snapshot.
6. Reasons for the P20 20–21 Nov and P05 27–28 Oct blocks: NOT CHECKED.
7. P20 is not in the VENUES map. P15–P19 have no PriceLabs listing.

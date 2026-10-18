# Market & demand calendar — run D = 2026-10-18

Sources used:
- **Market occupancy:** `pl_kpis.csv` columns `market_occupancy_next_30` / `market_occupancy_next_60` (PriceLabs, snapshot 2026-10-18). These match `kpi_pack.json` `market_occ_30/60`. There is no `market.csv` in the repo; this file is the stand-in.
- **Market prices:** PriceLabs `get_neighbourhood_data` (summary mode), pulled 2026-10-18. Columns used: `summary_table.table_data[].50_percentile_price` / `75_percentile_price` for our bedroom category. The payload does not say which date window the percentiles cover.
- **Our prices:** `data/snapshots/2026-10-18/prices.csv`, column `pricelabs_price`, covering 19 Oct – 17 Dec 2026, 14 properties.
- **Events:** WebSearch on 2026-10-18. Direct fetches of venue sites failed: WebFetch got DNS errors and curl got proxy 403 for theo2.co.uk, excel.london, hydeparkwinterwonderland.com, englandrugby.com and pdc.tv. An event counts as **VERIFIED** only when the search returned the venue's or organiser's own page and that page showed the date. **UNVERIFIED (secondary)** means only press, aggregator or ticket-resale sources agreed on the date.

## 1. Submarket table

| Ref | Area | Our type | Mkt occ 30d | Mkt occ 60d | Mkt P50 £ | Mkt P75 £ | Comp n | Our occ 30/60 (PL, incl. blocks) | Note |
|---|---|---|---|---|---|---|---|---|---|
| P01 | Canary Wharf | 2-bed | 34% | 26% | 266 | 332 | 147 | 100% / 72% | |
| P02 | Ladbroke Grove | 1-bed | 48% | 40% | 188 | 222 | 211 | 97% / 98% | 50 of 60 nights blocked |
| P03 | Bayswater | 3-bed | 49% | 44% | 445 | 527 | 27 | 100% / 100% | all 60 nights unavailable in prices.csv |
| P04 | Barking | 2-bed | 28% | 21% | 159 | 214 | 60 | 50% / 42% | |
| P05 | St John's Wood | 5-bed (PL name says "4Bed") | 32% | 32% | 972 (5BR) / 598 (4BR) | 1308 / 733 | 34 / 115 | 73% / 68% | bedroom count needs checking |
| P06 | Marylebone | 2-bed | 43% | 40% | 404 | 511 | 212 | 77% / 88% | 40 nights blocked |
| P07 | Woolwich | 1-bed | 26% | 19% | 116 | 145 | 88 | 100% / 100% | **all 60 nights Blocked**, real forward occupancy 0% |
| P08 | Islington | 2-bed | 50% | 43% | 215 | 262 | 146 | 47% / 23% | |
| P09 | Greenwich | 1-bed | 38% | 30% | 134 | 165 | 126 | 60% / 47% | |
| P10 | Ealing / Hanger Lane | 1-bed | 32% | 25% | 125 | 149 | 117 | 100% / 53% | |
| P11 | Camden | 2-bed | 47% | 39% | 291 | 341 | 172 | 60% / 68% | |
| P12 | Mile End | 2-bed | 41% | 34% | 205 | 242 | 119 | 60% / 53% | |
| P13 | Shepherd's Bush | 2-bed | 42% | 35% | 225 | 283 | 116 | 47% / 37% | kpi_pack forward_occ_30 is 6.9% |
| P14 | Primrose Hill | 1-bed | 42% | 38% | 192 | 233 | 174 | **0% / 0%** | 68% of open nights sit at the £500 floor |
| P15 | Bow / Devons Rd | 1-bed | n/a | n/a | n/a | n/a | | | no PriceLabs listing |
| P16 | Little Venice | 1-bed | n/a | n/a | n/a | n/a | | | no PriceLabs listing |
| P17 | St John's Wood | 1-bed | n/a | n/a | n/a | n/a | | | no PriceLabs listing |
| P18 | Fulham | 1-bed | n/a | n/a | n/a | n/a | | | no PriceLabs listing |
| P19 | Kings Langley | 2-bed | n/a | n/a | n/a | n/a | | | no PriceLabs listing |

What PriceLabs itself flags as demand surges (`occ_insights`, `fp_insights`, 2026-10-18), within the 90-day window:
- **28 Dec – 1 Jan** shows in every market: occupancy up 9.5–22.4% and prices up 8.1–32.8%.
- **Marylebone 25–27 Oct:** occupancy +11.0%. Mile End 25 Oct +10.1%. Shepherd's Bush 27 Oct +9.1%. These line up with half term.
- **Marylebone 22–26 Nov:** +15.5%. Ladbroke Grove 24–26 Nov: +7.8%. St John's Wood 24–27 Nov: +17.1%.
- **Bayswater 5–8 Dec:** +12.0%. Camden 5–7 Dec: +11.2%. Shepherd's Bush 1–6 Dec: +9.6%.
- **Woolwich 2–4 Nov:** +11.2%. Barking 4 Dec: +10.4%. Greenwich 28 Nov: +5.9%.

## 2. Demand calendar, 18 Oct 2026 – 16 Jan 2027

How the comparison works: "Event" is the average `pricelabs_price` on the event nights. "Fortnight" is the average over the 7 nights before and the 7 nights after, leaving out the event nights. For conferences, the event nights are the nights before each show day. Expected effect: C = compression, N = normal, S = soft. "Priced?" means the event-night average is at least 5% above the fortnight; "flat" means 0–5% above; "NO" means at or below.

| Dates | Event | Venue | Status / source (checked 2026-10-18) | Props (VENUES map) | Effect | Event £ vs fortnight £ (priced?) |
|---|---|---|---|---|---|---|
| Sun 18 Oct | NFL Texans @ Jaguars | Wembley | VERIFIED: https://www.houstontexans.com/news/texans-jaguars-london-2026 | P10, P13, P02 | C (today) | outside prices.csv (starts 19 Oct) |
| 26–30 Oct (nights 24–31) | Autumn half term (Tower Hamlets schools) | all | VERIFIED (school calendars): https://arnhemwharf.greenschoolsonline.co.uk/News/Term-Dates/ ; https://cullodenacademy.paradigmtrust.org/term-dates/ | all | N (family) | P06 324 vs 287 (yes); P10 168 vs 158 (yes); P02 164/156, P03 282/273, P08 205/201, P09 159/154, P13 184/177 (flat); P01 211/216, P04 158/180, P05 350/365, P07 228/238, P11 187/202, P12 207/214, P14 500/500 (NO) |
| 2–4 Nov (nights) | WTM London, 3–5 Nov | ExCeL | UNVERIFIED (secondary): failteireland.ie, breakingtravelnews.com | P01, P04, P07 | C? | P01 241/215 (yes); P07 276/234 (yes, blocked); P04 162/178 (NO, booked) |
| Tue 3 Nov | Stevie Wonder | The O2 | VERIFIED: https://www.theo2.co.uk/events/detail/stevie-wonder | P01, P09, P07, P04 | C | P01 245/219 (yes); P09 169/152 (yes); P07 287/242 (yes); P04 156/180 (NO, booked) |
| Sun 8 Nov (nights 7–8) | England v Australia | Twickenham | UNVERIFIED (secondary): rugbyworld.com, scotsman.com. RFU site not reachable | P13, P10 (P18, P16 unpriced) | C | P13 204/192 (yes); P10 152/162 (NO, 8 Nov booked) |
| 11–12 Nov (nights 10–11) | The Business Show (organiser expects ~25,000 visitors, per search summary) | ExCeL | VERIFIED: https://www.excel.london/visitor/whats-on/the-business-show-london-2026 | P01, P04, P07 | C | P01 218/216 (flat); P04 154/159 (NO, **open**); P07 230/248 (NO, blocked) |
| Thu 12 Nov | England v Croatia (UEFA Nations League), 19:45 | Wembley | VERIFIED: https://www.englandfootball.com/articles/2026/Aug/13/england-croatia-home-fixture-details-confirmed-20261308 | P10, P13, P02 | C | P10 166/158 (yes); P02 181/180 (flat); P13 194/197 (NO, **open**) |
| 13, 14, 17 Nov | Noah Kahan (3 nights, not the 5 the starting calendar says) | The O2 | VERIFIED: https://www.theo2.co.uk/events/detail/noah-kahan-2026 | P01, P09, P07, P04 | C | 13–17 Nov run: P01 209/222 (NO); P09 142/147 (NO); P07 242/240 (flat, blocked); P04 161/166 (NO, **open 15–17**) |
| 15–16 Nov | Muse (2 nights) | The O2 | UNVERIFIED (secondary): kerrang.com, timeout.com, musewiki | same | C? | included in the 13–17 Nov run above |
| Sat 14 Nov | England v Japan | Twickenham | UNVERIFIED (secondary) | P13, P10 | C | P10 182/156 (yes); P13 210/201 (flat) |
| 19–20 Nov (nights 18–19) | London Vet Show | ExCeL | VERIFIED: https://www.excel.london/visitor/whats-on/london-vet-show-2026 | P01, P04, P07 | C | P01 213/226 (NO, booked); P04 170/169 (flat); P07 238/239 (NO, blocked) |
| 19 Nov – 3 Jan (closed 25 Dec) | Hyde Park Winter Wonderland | Hyde Park | VERIFIED: https://hydeparkwinterwonderland.com/tickets-guide/ | P03, P06 (P16 unpriced) | C | 19 Nov–2 Dec vs 5–18 Nov: P03 417/324 (+28.5%); P06 438/303 (+44.4%). Priced |
| Sat 21 Nov (nights 20–21) | England v New Zealand, 14:10 | Twickenham | UNVERIFIED (secondary): rugbypass.com, RFU club notice (newburyrugby.co.uk) | P13, P10 | C | P13 238/213 (yes); P10 155/154 (flat) |
| 25–26 Nov (nights 24–25) | London Build Expo + elementalLONDON | ExCeL | VERIFIED: https://www.excel.london/visitor/whats-on/london-build-expo | P01, P04, P07 | C | P01 238/238 (NO, booked); P04 172/203 (NO, **24 Nov open**); P07 230/244 (NO, blocked) |
| 27–29 Nov (nights 26–28) | Nations Championship finals | Twickenham | UNVERIFIED (secondary): scotsman.com, visitlondon.com | P13, P10 | C | P13 243/231 (yes); P10 155/148 (yes) |
| Tue 1 Dec | Phoebe Bridgers | The O2 | VERIFIED: https://www.theo2.co.uk/events/detail/phoebe-bridgers (Ents24 also lists 2 Dec; unconfirmed) | P01, P09, P07, P04 | C | P01 226/264 (NO, **open**); P09 169/185 (NO, **open**); P07 233/251 (blocked); P04 182/209 (booked) |
| 11 Dec – 3 Jan (break 24–27 Dec) | PDC World Darts Championship, Great Hall (5,200+ capacity per Sky Sports) | Alexandra Palace | VERIFIED: https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/ (dates also in Sky Sports) | P08, P11 | C | Priced nights 11–17 Dec vs 27 Nov–10 Dec: P08 212/204 (flat); P11 265/309 (**NO, −14.1%, open**) |
| 17–21 Dec (nights 16–20) | London International Horse Show | ExCeL | VERIFIED: https://www.excel.london/visitor/whats-on/london-international-horse-show | P01, P04, P07 | C | Priced nights 16–17 Dec vs 9–15 Dec: P01 221/258 (**NO, open**); P04 187/187 (flat); P07 218/244 (blocked) |
| Fri 18 Dec | Kasabian | The O2 | VERIFIED: https://www.theo2.co.uk/events/ical/kasabian-2026/4972 | P01, P09, P07, P04 | C | beyond prices.csv |
| 21 Dec – 1 Jan | Christmas school holiday (pupils back Tue 5 Jan) | all | VERIFIED (school calendar): https://cullodenacademy.paradigmtrust.org/term-dates/ | all | C at 28 Dec – 1 Jan (PriceLabs surge in every market); S for corporate stock 21–24 Dec | beyond prices.csv |
| 4–16 Jan | No verified event found | | | all | S | beyond prices.csv |

Dropped as UNVERIFIED and not used:
- Arsenal Champions League home dates for 24 Nov and 9 Dec. One aggregator listed "Wed 24 Nov", but 24 Nov 2026 is a Tuesday.
- Christmas at Kew.
- Premier League fixtures.
- Disney On Ice at The O2.
- Olympia shows.
- The starting calendar's "180,000 darts tickets" figure. It appears only in secondary sources.

## 3. Missed compression

These are open (bookable) nights on **verified** events where our `pricelabs_price` is no higher than the surrounding fortnight average. Gap = fortnight average − night price. Booked and blocked nights are left out because nothing can be changed on them. Total: **22 open nights, about £579 below fortnight.**

| Ref | Night | Event | Our £ | Fortnight avg £ | Gap £ | Same weekday ±1–2 wks avg £ |
|---|---|---|---|---|---|---|
| P11 | Sun 13 Dec | Darts | 253 | 309 | 56 | 283 |
| P11 | Mon 14 Dec | Darts | 234 | 309 | 75 | 269 |
| P11 | Tue 15 Dec | Darts | 233 | 309 | 76 | 268 |
| P11 | Wed 16 Dec | Darts | 243 | 309 | 66 | 266 |
| P11 | Thu 17 Dec | Darts | 255 | 309 | 54 | 289 |
| P08 | 13 / 14 / 16 / 17 Dec | Darts | 200 / 188 / 186 / 202 | 204 | 4 / 16 / 18 / 2 | 186–188 on Mon and Wed (so roughly on par by weekday) |
| P01 | Wed 16 Dec | Horse Show | 206 | 258 | 52 | 252 |
| P01 | Thu 17 Dec | Horse Show | 236 | 258 | 22 | 274 |
| P04 | Thu 17 Dec | Horse Show | 186 | 187 | 1 | |
| P01 | Tue 1 Dec | Phoebe Bridgers (O2) | 226 | 264 | 38 | 226 (on par by weekday) |
| P09 | Tue 1 Dec | Phoebe Bridgers (O2) | 169 | 185 | 16 | 152 (above by weekday) |
| P04 | Tue 24 Nov | London Build Expo | 171 | 203 | 32 | 168 (on par by weekday) |
| P04 | Wed 18 Nov | Vet Show | 169 | 169 | 0 | |
| P04 | Sun 15 / Mon 16 / Tue 17 Nov | Muse (S) / Muse (S) / Noah Kahan (V) | 160 / 150 / 152 | 166 | 7 / 17 / 15 | 166 and 165 on Mon and Tue (below by weekday) |
| P13 | Thu 12 Nov | England v Croatia | 194 | 197 | 3 | 208 |
| P04 | Tue 10 / Wed 11 Nov | Business Show | 151 / 157 | 159 | 8 / 2 | 157 |

The gaps that hold up against same-weekday prices too are **P11 darts week (£54–76/night)**, **P01 Horse Show (£22–52)** and P04 around the O2 run on 16–17 Nov. The others are mostly a Tuesday or Wednesday being compared with a fortnight that includes weekends.

Half term is not a major event, so it is not counted in the total above. It has 19 open nights that are not higher than the fortnight, about £88 in all. The biggest are P12 on 26–27 Oct (£193 / £199 against £214, while PriceLabs shows Mile End market occupancy up 10.1% on 25 Oct) and P11 on 28–30 Oct (about £12–13 per night).

Unverified events, for information only: on 8 Nov (England v Australia), P10's booked night was £140 against a £162 fortnight. Twickenham pricing looks fine for P13 on 21 Nov (+11.7%) and 27–29 Nov (+5.3%).

## Other market observations
- **P14 Primrose Hill:** 0% forward occupancy over 30 and 60 days, against a 42% / 38% market. 68% of open nights sit at the £500 floor, which is 2.6x the 1-bed market P50 (£192) and 2.1x the P75 (£233). PriceLabs has min £500 / base £525; the info pack says £400 / £475.
- **P13 Shepherd's Bush:** kpi_pack forward_occ_30 is 6.9% against a 42% market, with prices close to the 2-bed P50 (£225). The double Smoobu listing (3064856 and 3090701, see id_map) may be splitting demand.
- **P07 Woolwich** is Blocked on all 60 nights and **P03 Bayswater** is unavailable on all 60. PriceLabs counts them as 100% occupied, but these are blocks, not bookings.
- PriceLabs `sync_on` is false for P01, P08, P09, P10 and P13 (kpi_pack `settings`). For these, `pricelabs_price` is a recommendation and may not be what guests are charged. `smoobu_price` matched on the nights checked.

Data gaps:
1. There is no `market.csv`. Market occupancy comes from PriceLabs `pl_kpis.csv` and the kpi_pack, and the price percentiles come from neighbourhood `summary_table`, whose date window the payload does not state.
2. P15–P19 have no PriceLabs listing, so they have no market data and no prices.
3. `prices.csv` stops at 17 Dec. Nothing could be compared from 18 Dec to 16 Jan, including Kasabian, the darts run-in, NYE and the Horse Show's 18–20 Dec nights.
4. Primary venue and organiser sites could not be fetched directly (WebFetch DNS errors, proxy 403). "Verified" here rests on the official page showing up in search results.
5. The Twickenham rugby dates, Muse and WTM could not be confirmed from a primary source and are marked UNVERIFIED.
6. Football fixture dates at the Emirates and Stamford Bridge for Nov–Jan are unverified, so P08 and P18 football demand is not assessed.
7. P05's bedroom count is 5 in the info pack but "4Bed" in the PriceLabs name, so the right comparison band is uncertain.
8. Most event sources gave no attendance figures, so none are quoted except Business Show ~25,000 (organiser, per search summary) and the Great Hall's 5,200+ capacity (Sky Sports).
9. School dates are Tower Hamlets calendars only. Westminster, Camden and Islington calendars were not checked.

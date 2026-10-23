# Market & demand calendar — run D = 2026-10-23 (window 23 Oct 2026 – 21 Jan 2027)

## Sources and method
- **Policy:** `data/policy.json` read first. Exclusions applied:
  - P02, P03, P06 and P07 are intentional blocks.
  - P14: numbers only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - Booking.com guest price is 1.2× the PriceLabs price.
- **Market occupancy:** `data/snapshots/2026-10-23/pl_kpis.csv`, columns `market_occupancy_next_30` and `market_occupancy_next_60`.
- **Market P50/P75:** `data/snapshots/2026-10-23/market.csv` (today's rows).
  - Another agent wrote all 12 rows at 06:23Z, so **I did not write to market.csv or raw/**.
  - My own `get_neighbourhood_data` pulls (detail mode) for P11 (3064196) and P12 (2699998) match those rows exactly (P11 2BR 243/306/361/409, n=171; P12 2BR 178/211/255/295, n=120).
  - Those two pulls are my only source for daily P25/P50/P75 and daily market occupancy versus STLY (same time last year).
- **Our prices:**
  - 24 Oct – 22 Dec: `data/snapshots/2026-10-23/prices.csv`, column `pricelabs_price`.
  - 23 Dec – 27 Jan: live `get_listing_prices` field `price`, pulled 2026-10-23, for P11, P20, P04 and P13 (P13 to 10 Jan only). Saved at `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m23/live23.py`.
  - `last_refreshed_at` values: P20 22 Oct 07:55Z, P13 08:24Z, P11 08:37Z, P04 17:35Z, P12 18:50Z.
- **Fortnight:** unchanged from 22 Oct. It is the 7 nights before plus the 7 after the event block, excluding Blocked nights and nights above 2× the median; booked nights count at list price.
  - **Clean-week rule** (as on 22 Oct): where one side of the fortnight is itself a demand period, I use only the other week:
    - 16–20 Dec: use 9–15 Dec.
    - 3 Jan: use 4–10 Jan.
    - 16 Jan: use 9–15 Jan.
    - **New:** Bett 19–20 Jan: use 12–18 Jan (the after-week holds Bett itself and the P20 far-out premium, see §4).
  - Strict figures are shown too.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m23/analyse23.py`. Yesterday's `analyse.py` was extended with live data from 23 Dec, the P11 reopened nights and the clean-week sides.
  - **P11 19–26 Nov are treated as open.** Smoobu `reservations.csv` shows the stay cancelled, but PriceLabs (refreshed 22 Oct 08:37Z) still shows the nights as Booked.
- **Events:** re-verified 2026-10-23 by WebSearch restricted to venue or organiser domains, so each check is of a search-indexed primary page.
  - Direct fetches are refused: theo2.co.uk got a proxy 403 (connect_rejected), and pdc.tv failed with ENOTFOUND.
  - Attendance: no source checked today gives a figure, except the darts total of 180,000 tickets (alexandrapalace.com / pdc.tv).

## 1. Submarket table (2026-10-23)

| Submarket | Ref | Area | BR | Mkt occ 30/60 (`pl_kpis`) | P50 / P75 £ (n) (`market.csv`) | Our occ 30/60 | Avg open £ next 30 (nights) |
|---|---|---|---|---|---|---|---|
| East | P01 | Canary Wharf (HB after 20 Dec) | 2 | 32% / 25% | 277 / 336 (143) | 100/100%* | none open |
| | P20 | Canary Wharf (Waterford Ct) | 2 | 35% / 27% | 267 / 322 (148) | 23% / 13% | 274 (24) |
| | P04 | Barking (3562176) | 2 | 25% / 19% | 179 / 222 (87) | 30% / 33% | 166 (23) |
| | P09 | Greenwich (HB after 26 Nov) | 1 | 37% / 30% | 142 / 172 (127) | 63/82%* | 159 (11) |
| | P12 | Mile End (HB after 13 Dec) | 2 | 40% / 33% | 211 / 255 (120) | **37% / 43%** (was 57/53) | 218 (18) |
| | P07 / P15 | Woolwich / Bow | — | — | — | intentional block / no PriceLabs listing | — |
| Central | P08 | Islington (HB after 13 Nov) | 2 | 50% / 44% | 225 / 281 (149) | 57/78%* | 179 (13) |
| | P11 | Camden | 2 | 45% / 38% | 306 / 361 (171) | PL 63% / 68% (stale); **50% / 55%** with 19–26 Nov open† | 234 (11); 245 (15) incl. 19–22 Nov |
| | P05 | St John's Wood | 4 (policy) | 38% / 36% | 614 / 723 (90) | 70% / 62% | 476 (9) |
| | P14 | Primrose Hill (report only) | 1 | 40% / 38% | 203 / 253 (173) | 0% / 0% | 501 (30) |
| | P06 / P03 | Marylebone / Bayswater | 2 / 3 | 43/40% · 48/44% | P06 415 / 542 (216) | intentional blocks | — |
| | P16 / P17 | Little Venice / SJW | — | — | — | no PriceLabs listing | — |
| West | P13 | Shepherd's Bush | 2 | 40% / 35% | 243 / 307 (118) | 50% / 38% | 198 (17) |
| | P10 | Hanger Lane (HB after 18 Nov) | 1 | 31% / 25% | 133 / 160 (122) | 100/100%* | — |
| | P02 / P18 / P19 | Ladbroke Grove / Fulham / Kings Langley | — | — | — | block / no listing | — |

\* Inflated because PriceLabs counts the handback blocks as occupied.
† Booked nights in `prices.csv` 24 Oct – 22 Nov (15/30) and 24 Oct – 22 Dec (33/60), after removing the 8 cancelled nights.

Market moves since 22 Oct (`market.csv`): P50 changed by at most £2 (P04 177→179, P05 612→614, P20 266→267, P08 224→225, P13 244→243, P10 132→133). P75 moved more on P13 (302→307), P14 (249→253) and P01 (333→336). Market occupancy moved by 1 point or less.

PriceLabs neighbourhood signals (my 23 Oct pulls, `fp_insights` / `occ_insights`):
- **Camden:** prices +30.3% on 26–31 Dec. Occupancy surges +20.6% on 28 Dec – 1 Jan and **+13.6% on 6 Dec** (was +12.9% on 5–7 Dec).
- **Mile End:** prices +15.7% on 26–31 Dec (was +17.3%). Occupancy +15.9% on 28 Dec – 1 Jan and +9.3% on 6 Dec.
- No darts, O2, ExCeL or Twickenham spike shows in either feed.

## 2. Demand calendar, 23 Oct 2026 – 21 Jan 2027

"Our £ vs fortnight £" uses today's prices. B = booked, BLK = blocked, HB = after handback. Venues come from the `build/properties.py` VENUES map; P20 is not in the map and is treated as Canary Wharf. All sources were checked 2026-10-23.

### East (O2 → P01, P09, P04; ExCeL → P01, P04; P20 as Canary Wharf; P07 blocked; P15 has no listing)
| Nights | Event | Primary source | Effect | Priced? (our £ vs fortnight £) |
|---|---|---|---|---|
| 23–24 Oct | MCM Comic Con, ExCeL 23–25 Oct | mcmcomiccon.com/london/en-us.html; excel.london/whats-on/mcm-comic-con-2026 | compression | P01, P04, P20 all B |
| 2–4 Nov | WTM London, ExCeL 3–5 Nov | wtm.com/london/en-gb/visit/venue-and-travel.html | compression | P20 302/307/312 vs 271 **yes**; P04 180/186/187 vs 159 **yes**; P01 B |
| 3, 5 Nov | Stevie Wonder, O2 | theo2.co.uk/events/detail/stevie-wonder; axs.com series 34453 | compression | P20 307/296 vs 272 yes; P04 186/178 vs 160 yes; P01, P09 B |
| 10–11 Nov | The Business Show, ExCeL 11–12 Nov (**now verified on the organiser site**) | greatbritishbusinessshow.co.uk/visitor-information; excel.london/whats-on/the-business-show-london-2026 | compression | **P20 264/264 vs 273; P04 159/158 vs 166**; P01 B |
| 13–14 Nov | Noah Kahan, O2 (13, 14, 17 Nov) | theo2.co.uk/events/detail/noah-kahan-2026; axs.com/events/1407877 | compression | P20 269/284 vs 264 yes; P04 167/169 vs 161 yes; P09 162/167 vs 159 yes; P01 B |
| 15–16 Nov | Muse, O2 | theo2.co.uk/events/detail/muse-2026 | compression | **P20 246/242 vs 274; P04 155/149 vs 165**; P01, P09 B |
| 17 Nov | Noah Kahan, O2 | as above | compression | **P20 250 vs 275; P04 154 vs 166**; P01, P09 B |
| 18–19 Nov | London Vet Show, ExCeL 19–20 Nov | excel.london/whats-on/london-vet-show-2026 | compression | **P20 270/278 vs 282; P04 154/155 vs 170**; P01 B |
| 21 Nov | The Script, O2 — **resolved: Sat 21 Nov 2026**, 18:30 | axs.com/uk/events/1461768 (AXS is the O2's ticketing partner); theo2.co.uk/events/detail/the-script-2026 | compression | **P20 20–21 Nov now BLK** (open at 337 on 22 Oct; no reservation; reason NOT CHECKED). **P04 174 vs 173.7: level** (was 205 vs 176; PriceLabs `uncustomized_price` fell 257→201). P01, P09 B |
| 24–25 Nov | London Build, ExCeL 25–26 Nov | londonbuildexpo.com (registration news); excel.london/whats-on/london-build-expo | compression | **P20 24 Nov 298 vs 313**; 25 Nov 317 yes; P04 24 Nov 187 vs 179 yes, 25 Nov B; P01 B |
| 1–2 Dec | Phoebe Bridgers, O2 | theo2.co.uk/events/detail/phoebe-bridgers; axs.com/uk/events/1479522 | compression | **P20 296/322 vs 345**; P04 1 Dec B, 2 Dec 601 (gap night); P01 BLK; P09 HB |
| 16–20 Dec | The Darkness 16, Greg Davies 17, Kasabian 18, Culture Club 19 Dec (O2); London International Horse Show, ExCeL 17–21 Dec | theo2.co.uk/events/detail/the-darkness-2026, /kasabian-2026, /culture-club-2026; axs.com/events/1232906; londonhorseshow.com; excel.london/whats-on/london-international-horse-show | compression | Clean week (9–15 Dec): **P20 16 Dec 284 vs 326**; 17–20 Dec 334/346/368/335 above. **P04 16 Dec 194 vs 197**; 17 Dec 197 vs 196.9 (level); 18–19 Dec 207/218 above; 20 Dec B. Strict: P20 381, P04 226 (every open night below). P01 16–17 BLK, 18–20 B |
| 31 Dec | NYE fireworks (ticket batch one on sale 23 Oct 12:00) | london.gov.uk/events/london-new-years-eve-2026 | compression | P20 630 vs 369 yes; P04 B |
| 16 Jan | aespa, O2, Sat 16 Jan 18:30 | axs.com/uk/events/1425626; theo2.co.uk/events/detail/aespa-2027 | compression | Clean week: P20 275 vs 263 yes; P04 186 vs 180 yes. Strict: P20 295 (no), P04 182 (yes) |
| 19–20 Jan | Bett UK, ExCeL 20–22 Jan | uk.bettshow.com | compression | Clean week (12–18 Jan): P20 272/363 vs 264 yes; P04 182/184 vs 181 (+1/+3). **Correction (§4): P20's premium is the far-out premium, not event pricing** |

### Central (Alexandra Palace → P08, P11; Emirates → P08; Regent's Park → P05, P14: nothing found)
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 6–7 Nov | Arsenal v Hull City, Emirates, Sat 7 Nov 15:00. Arsenal news says it is unaffected by broadcast picks | arsenal.com ticket-information Arsenal v Hull City; help.arsenal.com 101000594163; arsenal.com "Two Premier League games rearranged in November" | compression | **P08 6 Nov 203 vs 209 (was 280)**; 7 Nov 276 yes |
| 7–8 Nov | Fireworks & Drone Festival, Ally Pally (listing only; no attendance) | alexandrapalace.com/whats-on | normal | P08 7 Nov 276; P11 B |
| 20–21 Nov | **New:** Enter Shikari, Great Hall, 20–21 Nov | alexandrapalace.com/whats-on/enter-shikari/ | compression (size unstated) | **P11 294/289 vs 275 yes** (reopened nights) |
| 26–28 Nov | **New:** Nia Archives 26, Blossoms 27, Gorgon City 28 Nov, Great Hall | alexandrapalace.com/whats-on/nia-archives/, /blossoms/, /gorgon-city/ | compression (size unstated) | P11 26 Nov 313 vs 296 yes; 27 Nov 589 (override +60%); 28 Nov B |
| 13–17 Dec | World Darts round one, Ally Pally (event 11 Dec – 3 Jan; 180,000 tickets) | alexandrapalace.com/whats-on/world-darts-championship-2026-2027/; pdc.tv/WCFAQ | compression | P11 331/308/314/327/342 vs 333: **13–16 Dec below**, 17 Dec above. P08 HB |
| 23 Dec | Darts round two, afternoon + evening, the last session before the break | pdc.tv/WCFAQ (session list) | compression | **P11 340 vs 356** (fortnight is all darts/Christmas nights) |
| 24–26 Dec | **Resolved: Christmas break.** The PDC session list goes from Wed 23 Dec straight to Sun 27 Dec (round three). No 2026/27 article states the break explicitly | pdc.tv/WCFAQ | normal | P11 24–25 Dec open 337/337: no darts. 26 Dec – 2 Jan B |
| 3 Jan | Darts final (one PDC release says 4 Jan; the calendar and FAQ say 3 Jan) | pdc.tv/calendar; pdc.tv/WCFAQ | compression | P11 208. Clean week (4–10 Jan) 202 → +6, not missed. Strict 300 |

### West (Twickenham → P13 [P10 HB; P16, P18 no listing]; Wembley → P13 [P02 blocked])
| Nights | Event | Source | Effect | Priced? |
|---|---|---|---|---|
| 7–8 Nov | England v Australia, Sun 8 Nov 15:10 | allianzstadiumtwickenham.com/nations-championship; help.englandrugby.com 103000376802 | compression | P13 7 Nov booked on twin 3090701 (Airbnb 4–8 Nov); 8 Nov 218 vs 198 yes |
| 12 Nov | England v Croatia, Wembley, Thu 19:45 | englandfootball.com match centre (12 Nov 2026); wembleystadium.com/events/2026/England-v-Croatia | compression | P13 213 vs 208 yes |
| 13–14 Nov | England v Japan, Sat 14 Nov 16:40 | allianzstadiumtwickenham.com/england-v-japan-nations-championship-pool-match | compression | P13 BLK on 3064856 = **booked on twin 3090701** (Airbnb 13–17 Nov) |
| 20–21 Nov | England v New Zealand, Sat 21 Nov 14:10 | help.englandrugby.com 103000376802 | compression | **P13 20 Nov 216 vs 220**; 21 Nov 222 yes |
| 26–29 Nov | Nations Championship Finals Weekend, 27–29 Nov | allianzstadiumtwickenham.com/nations-championship-finals-weekend | compression | **P13 26 Nov 229 vs 234**; 27 Nov 249 yes; 28–29 Nov B |
| 5 Dec | England Women v Ukraine, Wembley, Sat 17:30 (World Cup play-off second leg) | wembleystadium.com/events/2026/England-Women-v-Ukraine; englandfootball.com (14 Oct article) | compression | P13 B |
| 28 Dec | Harlequins Big Game 18: Women v Loughborough 14:00, Men v Northampton 17:00. **Resolved: Allianz Stadium, Twickenham** (stadium's own event page). The quins.co.uk Big Game page shows the Stoop address, which looks like the club's address block | allianzstadiumtwickenham.com/big-game-18; quins.co.uk/harlequins-big-games | compression (inside the NYE surge) | P13 379 vs 260 yes |
| 31 Dec | NYE | london.gov.uk | compression | P13 392 vs 235 yes |

### Citywide
- 26–30 Oct half term: from the council pages checked 20 Oct; **not re-checked**.
- 21 Dec – 1 Jan Christmas school holiday: not re-checked.

## 3. Missed compression — open event nights at or below the fortnight (sellable flats only)

| Submarket | Ref | Night | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|---|
| East | P20 | 10, 11 Nov | Business Show | 264, 264 | 273 | 9, 9 |
| | P20 | 15, 16 Nov | Muse | 246, 242 | 274 | 28, 32 |
| | P20 | 17 Nov | Noah Kahan | 250 | 275 | 25 |
| | P20 | 18, 19 Nov | Vet Show | 270, 278 | 282 | 12, 4 |
| | P20 | 24 Nov | London Build | 298 | 313 | 15 |
| | P20 | 1, 2 Dec | Phoebe Bridgers | 296, 322 | 345 | 49, 23 |
| | P20 | 16 Dec | The Darkness / Horse Show eve | 284 | 326 (clean week) | 42 |
| | | | | | **P20 subtotal** | **11 nights / £248** |
| East | P04 | 10, 11 Nov | Business Show | 159, 158 | 166 | 7, 8 |
| | P04 | 15, 16 Nov | Muse | 155, 149 | 165 | 10, 16 |
| | P04 | 17 Nov | Noah Kahan | 154 | 166 | 12 |
| | P04 | 18, 19 Nov | Vet Show | 154, 155 | 170 | 16, 15 |
| | P04 | 16 Dec | The Darkness / Horse Show eve | 194 | 197 (clean week) | 3 |
| | | | | | **P04 subtotal** | **8 nights / £87** |
| Central | P11 | 13, 14, 15, 16 Dec | Darts round one | 331, 308, 314, 327 | 333 | 2, 25, 19, 6 = **£52** |
| | P11 | 23 Dec | Darts round two (last pre-break night) | 340 | 356 | **16** |
| | P08 | 6 Nov | Arsenal v Hull (eve) | 203 | 209 | **6** |
| West | P13 | 20 Nov | England v NZ (eve) | 216 | 220 | 4 |
| | P13 | 26 Nov | Finals Weekend (eve) | 229 | 234 | 5 |

**Headline: 27 open nights, £418 below the fortnight** (East 19 / £335; Central 6 / £74; West 2 / £9). The 22 Oct figure was 24 / £441.
- Like-for-like, excluding the newly assessed 23 Dec: **26 nights / £402**.
- Strict fortnight on every block, no clean-week rule: adds P20 17–20 Dec, P04 17–19 Dec, P11 3 Jan, P20 16 Jan and P04/P20 19 Jan. These nights mostly compare against Christmas, NYE or far-out-premium nights.
- Watch-list (level, not counted): P04 21 Nov The Script, 174 vs 173.7; P04 17 Dec, 197 vs 196.9.

## 4. What changed since 22 Oct
- **Day-on-day moves on the missed list:**
  - **P20:** 10 Nov newly below (270→264; fortnight 267→273). Gaps narrowed on 15–16 Nov (£41/£39 → £28/£32), 17 Nov (£32→£25), 18–19 Nov (£21/£10 → £12/£4) and 2 Dec (315→322, £28→£23). 1 Dec widened (£47→£49).
  - **P04:** 17 Dec dropped off (now level). Other gaps within ±£4.
  - **P11 darts:** 13 Dec slipped £1 below (332→331 vs 333). Net £53 → £52.
  - **P13:** 26 Nov gap £8→£5.
  - **P08 6 Nov:** new. Price 280→203, `uncustomized_price` 274→198, demand label Good→Normal. Algorithmic: there is no P08 override change (overrides −2% since 16 Oct) and no P08 log entry.
- **Correction — Bett "priced" on 22 Oct was P20's far-out premium.**
  - `get_customizations` shows "After 89 days, flat premium of 30.0%". 19 Jan crossed to day 88 and fell 351→272 (`uncustomized_price` 292).
  - 20 Jan (363) will cross tomorrow.
  - Against the clean week, P20 still sits +£8/night on Bett eve, which is thin. No date-specific override exists for P20 in Jan (`get_listing_date_overrides`, 1 Nov – 31 Jan).
- **Price drops on event nights from the algorithm:**
  - P04 21 Nov (The Script) 205→174.
  - P20 16 Jan 278→275.
- **New P20 block 20–21 Nov:** the England v NZ and The Script weekend is now Blocked in PriceLabs. There is no Smoobu reservation for it and P20 is not in the policy's intentional blocks. Its purpose is NOT CHECKED.
- **Logs (`get_user_logs` 22–23 Oct, 5 entries):**
  - 22 Oct 18:47Z: P12 overrides of −4% (min-stay 2) on 26 Oct – 15 Nov, which covers the reopened 1–7 Nov, and −1% on 29 Nov – 13 Dec. Both were copied to Vrbo 12038157.
  - 22 Oct 12:43Z: Vrbo `_units_0001_20df1e73…` price sync switched **OFF** (now "DELETED LISTING"). This explains one of the ids missing from today's listing_data.
- **Events:**
  - Resolved: The Script date (21 Nov), the Big Game 18 venue (Allianz Stadium) and the darts Christmas break (24–26 Dec, no sessions).
  - Business Show now verified on the organiser site.
  - Added: Ally Pally Great Hall concerts 20–21, 26, 27 and 28 Nov, relevant to the reopened P11 nights.
  - The P13 7, 13 and 14 Nov "blocks" are bookings on twin 3090701 (resolves yesterday's gap 6).

## 5. Reopened nights

### P12 Mile End, 1–7 Nov (7 nights; cancelled stay £1,382.86 = £197.55/night)
| | 1 Nov | 2 | 3 | 4 | 5 | 6 (Fri) | 7 (Sat) |
|---|---|---|---|---|---|---|---|
| Our £ today (`prices.csv`) | 181 | 184 | 186 | 188 | 192 | 211 | 265 |
| Our £ on 22 Oct (when booked) | 219 | 222 | 224 | 227 | 232 | 271 | 272 |
| Market P25 / P50 / P75 (ND daily) | 178/218/268 | 176/215/279 | 178/218/279 | 179/225/281 | 178/223/282 | 179/228/282 | 177/227/283 |
| Market occ % (ND) / STLY % | 35.1/54.9 | 29.2/46.3 | 33.4/54.2 | 31.2/48.5 | 37.0/49.1 | 40.8/51.9 | 43.7/47.4 |

- **Demand is soft.**
  - Market occupancy is 4–21 points behind STLY on every night.
  - Market 7-day pickup was 1.9–4.6 points against 1.6–5.1 STLY.
  - Mile End has no venue in the VENUES map. PriceLabs' event list flags 6–7 Nov but does not name an event (not verified).
- **Pricing:**
  - The block averages £201 against a surrounding fortnight of £210 (25–31 Oct + 8–14 Nov).
  - 1–5 Nov sit between market P25 and P50. 6 Nov is below P50; 7 Nov is between P50 and P75.
  - The list price is ~£35–60 below what it was on 22 Oct. The team's −4% override (22 Oct) accounts for only part of that; the rest is the algorithm.
- **Assessment:** 9 days out in a market tracking well behind last year, P12 is already priced near the cancelled ADR (£201 vs £197.55) and below market median. That is reasonable for re-selling. I see no event case for raising it.
- WTM / Stevie Wonder (3–5 Nov) map to O2/ExCeL flats, not Mile End.

### P11 Camden, 19–26 Nov (8 nights; cancelled stay £1,736.41 = £217.05/night)
| | 18 | 19 | 20 (Fri) | 21 (Sat) | 22 | 23 | 24 | 25 | 26 | 27 |
|---|---|---|---|---|---|---|---|---|---|---|
| Our £ (`price`) | 314 | 255 | 294 | 289 | 264 | 259 | 280 | 298 | 313 | 589 |
| Market P50 / P75 (ND daily) | 273/355 | 283/363 | 311/389 | 296/391 | 275/370 | 273/372 | 275/371 | 279/370 | 297/383 | 307/388 |
| Market occ % / STLY % | 24.0/18.5 | 34.6/26.0 | 45.5/39.1 | 43.6/41.4 | 30.7/29.9 | 26.9/27.5 | 30.4/26.6 | 33.3/26.8 | 37.8/31.9 | 48.1/45.5 |

- **Demand is normal to slightly firm.**
  - Market occupancy is ahead of STLY on 9 of 10 nights (23 Nov is 0.6 points behind) (up to +8.6 points on 19 Nov).
  - Enter Shikari (20–21 Nov) and Nia Archives / Blossoms (26–27 Nov) play the Ally Pally Great Hall; the source gives no attendance.
- **Pricing:**
  - 19–26 Nov average £282, against a market P50 average of £286 and a fortnight of £276. The event nights 20–21 and 26 Nov are above the fortnight.
  - On Booking.com (the only channel; policy) the guest price is 1.2× before promotions.
- **PriceLabs still shows 19–26 Nov as Booked** (`last_refreshed_at` 22 Oct 08:37Z), so it has not yet re-priced these nights as sellable. What Smoobu currently pushes for them is NOT CHECKED (`prices.csv` `smoobu_price` mirrors `pricelabs_price`).
- **Old gap-night overrides now sit at both ends of a 10-night open run** (`get_listing_date_overrides`, set 11 Oct when they were orphan nights):
  - 18 Nov: +30%, min-stay 1.
  - 27 Nov: +60%, min-stay 1, giving £589, about 2× its neighbours.
  - Between them, 19–24 Nov carry −5% / min-stay 3 and 25–26 Nov −2% / min-stay 2 (set 7–17 Sep).
  - Any stay that includes 27 Nov pays the +60% night.

Data gaps:
1. Market P50/P75 are Airbnb-derived Nearby-Listings percentiles (not comps; horizon unstated; cleaning basis unknown). Daily bands and market-vs-STLY occupancy were pulled only for P11 and P12. Other agents' raw files hold the rest; I did not re-read them. P02, P03 and P07 have no percentiles.
2. Events are verified only through domain-restricted WebSearch summaries of primary pages (theo2.co.uk proxy 403; pdc.tv ENOTFOUND).
   - The darts Christmas break comes from the PDC FAQ session list (23 Dec, then 27 Dec), not from an explicit statement.
   - The Big Game 18 venue conflict is resolved by preferring the stadium's own event page.
   - Attendance is stated only for darts (180,000 tickets). Ally Pally Great Hall concerts have no stated capacity.
   - Half-term and Christmas holiday dates not re-checked.
3. P11 19–26 Nov: PriceLabs has not registered the cancellation (refreshed 22 Oct 08:37Z). The occupancy figures with those nights open (50%/55%) are my count from `prices.csv`, not PriceLabs.
4. P20 20–21 Nov block: reason NOT CHECKED (not in policy intentional blocks; no reservation).
5. The P20 far-out premium (day 89+) distorts any fortnight that straddles the boundary; it currently sits around 20 Jan. Bett is assessed on the clean week for that reason.
6. Prices were last refreshed on 22 Oct (07:55–18:50Z), so changes made today are not reflected. P13 live prices were pulled only to 10 Jan.
7. P04 `price` vs `user_price` (yesterday's gap 3): live 23 Oct data show `user_price` = `price` on all open P04 Jan nights (refreshed 22 Oct 17:35Z), so it looks resolved. For P11, P13 and P20, today's `user_price` equals yesterday's `price`, which suggests `user_price` is the last-pushed value. That reading is not confirmed.
8. P20 is not in the VENUES map; P15–P19 have no PriceLabs listing.

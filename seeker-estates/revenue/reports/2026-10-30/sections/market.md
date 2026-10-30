# Market & demand calendar: run D = 2026-10-30 (window 31 Oct 2026 – 28 Jan 2027)

## Sources and method
- **Policy read first** (`data/policy.json`).
  - Excluded: P02, P03, P06 and P07 blocked nights (intentional). P14 is reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13 is one flat. Not re-raised: P04 2 Dec (+200%), P04's 3-night minimum, P11 darts +5% (shown below only as an open conflict).
- **Market data:** PriceLabs `get_neighbourhood_data`, pulled 30 Oct, one call at a time.
  - Detail mode (`include_future_prices`, `include_occupancy`) for P12 2699998, P05 3166592, P20 3547481, P11 3064196 and P13 3064856.
  - Summary mode for P01 3320302, P09 3318172, P06 3288517 and P04 3562176.
  - Raw detail files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m30/neigh_<id>.json`.
  - This is Nearby Listings data, Airbnb-derived, "Host-only fee", with `cleaning_fee: null`. It is not a comp set.
  - Daily bands: P12 and P13 use 2–3 BR, P11 and P20 use 1–3 BR, P05 uses 3–5 BR.
  - Column names: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price` ("booked median"), `occupancy.daily.market_occupancy` / `_stly`, and `prices_with_default_customization` ("PL default").
- **market.csv:** `data/snapshots/2026-10-30/market.csv` copied forward from 29 Oct under `.market.csv.lock`. I appended 9 rows dated 30 Oct.
- **Our prices:** `data/snapshots/2026-10-30/prices.csv`, column `pricelabs_price`.
  - PriceLabs refresh times: P12 30 Oct 06:19Z, P11 05:51Z, P01 06:30Z; P05 29 Oct 08:57Z, P13 09:09Z, P20 09:20Z, P04 09:09Z (`raw/prices_*.json` `last_refreshed_at`).
  - From 30 Dec: neighbourhood `final_price` (30 Oct), and P04 `get_listing_prices` 29 Dec – 28 Jan (30 Oct).
- **Booking state comes from Smoobu** `reservations.csv` (30 Oct, confirmed stays), not from PriceLabs.
- **Changes since yesterday's run:**
  - `get_user_logs` (listing, 29–30 Oct) returned **0 entries**.
  - `get_listing_date_overrides` for P12 (31 Oct – 13 Dec) shows no entry updated after 28 Oct 12:44:36Z.
  - So overnight price moves came from the PriceLabs engine, not from edits.
- **Fortnight method and script are unchanged** (7 nights either side; blocked nights and nights above 2× the median excluded; clean week for 16–20 Dec, 3 Jan and 16 Jan).
  - Scripts: `.../scratchpad/m30/analyse30.py` (output in `out30.txt`) and `.../m30/win30.py` (windows).
- **Events were re-verified 30 Oct 2026 with WebSearch restricted to venue or organiser domains.** I did not read the pages themselves:
  - theo2.co.uk does not resolve (WebFetch ENOTFOUND).
  - theo2.co.uk, excel.london, alexandrapalace.com and pdc.tv all return 403 at the proxy for curl.
  - Details in Data gaps.

## 1. Submarket table
Market occ 30/60 is from `pl_kpis.csv` 30 Oct (`market_occupancy_next_30/60`). P25 / P50 / P75 / P90 come from `market.csv` (summary_table, same-bedroom row). Our occ is from `pl_kpis.csv` `occupancy_next_30/60`.

| Area | Ref | BR | Mkt occ 30/60 | P25 / **P50** / **P75** / P90 £ (`market.csv` date) | Our occ 30/60 | Base / PL rec. base (`listings.csv`) |
|---|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 27% | 215 / **257 / 331** / 420 (30 Oct) | 100 / 100%* | 253 / 255 |
| Canary Wharf | P20 | 2 | 37 / 29% | 215 / **254 / 314** / 406 (30 Oct) | 37 / 30% | 350 / 347 |
| Barking | P04 | 2 | 25 / 20% | 139 / **173 / 220** / 260 (30 Oct) | 53 / 53% | 220 / – |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 110 / **136 / 161** / 204 (30 Oct) | 80 / 90%* | 176 / 176 |
| Mile End (HB 13 Dec) | P12 | 2 | 40 / 33% | 171 / **206 / 245** / 303 (30 Oct) | 57 / 60% | 284 / 273 |
| Marylebone (blocked on purpose) | P06 | 2 | 45 / 40% | 309 / **403 / 508** / 626 (30 Oct) | 77 / 88%* | 357 / 342 |
| Camden | P11 | 2 | 46 / 39% | 230 / **289 / 330** / 391 (30 Oct) | 40 / 37% | 286 / 285 |
| St John's Wood | P05 | 4 | 39 / 37% | 470 / **577 / 720** / 1,162 (30 Oct) | 80 / 65% | 550 / 548 |
| Shepherd's Bush | P13 | 2 | 40 / 36% | 191 / **226 / 282** / 348 (30 Oct) | 63 / 47% | 250 / 233 |
| Islington (HB 13 Nov) | P08 | 2 | 50 / 44% | 183 / 228 / 284 / 334 (27 Oct) | 90 / 95%* | 250 / 252 |
| Primrose Hill (report only) | P14 | 1 | 41 / 37% | 153 / 205 / 255 / 298 (27 Oct) | 0 / 0% | 525 / 511 |
| Hanger Lane (HB 18 Nov) | P10 | 1 | 29 / 24% | not pulled (0 sellable nights) | 100 / 100%* | 160 / 166 |

\* Inflated, because PriceLabs counts handback or intentional blocks as occupied.

- **2 BR P50 vs yesterday** (`market.csv` 29 Oct → 30 Oct): P12 207 → 206, P20 255 → 254, P11 290 → 289, P13 230 → 226, P01 259 → 257, P04 175 → 173. P05 4 BR: 579 → 577.
- **Overnight change in our prices** (`prices.csv` 29 → 30 Oct, mean over 59 shared dates): P12 **+£11.7** (up to +£47), P11 −£3.0, P20 −£3.8, P05 −£1.7, P13 −£3.2, P04 −£0.3.
  - The P12 rise has no user log or override change behind it. It coincides with PriceLabs' P12 forward occupancy going from 47% to 57% (`pl_kpis`), as PriceLabs now sees the 21–26 Nov and 3–7 Dec re-sells.
  - The exact customization that moved is NOT CHECKED.

## 2. Asked-for checks

### 2a. P12 Mile End open nights vs market (all to handback 13 Dec)
Smoobu shows 24 open nights. Prices are from the 30 Oct 06:19Z refresh.

| Open nights | Our £ (`prices.csv`) | PL default | Mkt P25 / **P50** / P75 / P90 | Booked median | Mkt occ vs STLY |
|---|---|---|---|---|---|
| 1–4 Nov (Sun–Wed, 2–5 days out) | 239 / 233 / 240 / 250 (962) | 203 / 208 / 226 / 250 (887) | 163 / **192** / 248 / 328 | 199 | 43.4 vs 59.4% (**−16 pts**) |
| 12–13 Nov (Thu–Fri) | 249 avg (497) | 294 avg (587) | 166 / **205** / 261 / 345 | 195 | 38.5 vs 40.2% |
| **17–20 Nov** (Tue–Fri) | 255 / 249 / 266 / 299 (**1,069**; was 945 yesterday) | 281 / 271 / 295 / 342 (1,189) | 165 / **207** / 260 / 340 | 191 | 34.5 vs 40.4% (**−5.9 pts**) |
| **26 Nov – 2 Dec** | 272 / 303 / 322 / 281 / 262 / 271 / 273 (**1,984**) | 2,201 | 174 / **214** / 267 / 342 | 188 | 31.8 vs 32.6% (level). Fri–Sat 27–28 Nov: 40 vs 43–47% |
| **7–13 Dec** (last week) | 261 / 258 / 272 / 280 / 310 / 318 / 284 (**1,983**) | 2,184 | 174 / **220** / 270 / 347 | 210 | 27.3 vs 20.4% (**+6.9 pts**; 7–9 Dec +9.5 to +13.4) |

- **Overrides** (`get_listing_date_overrides`, 30 Oct): −5% on 1–4 Nov and −2% on 16 Nov – 13 Dec (reyhan, 28 Oct 12:44Z); 12–13 Nov have min stay only.
  - On 1–4 Nov we are £75 **above** the PL default even with the −5%. The default applies a deeper close-in reduction than our listing's customizations.
- **What paid rates look like:** recent P12 Booking.com sales paid 0.556× list (policy `booking_discount_stack_24oct` / `_25oct`) and 0.741× / 0.934× (21–26 Nov, 3–7 Dec). So a list price at P75 lands at roughly P25–P50 paid.
- **Proposals (P12 has no verified event in the window):**
  - **1–4 Nov: below current, to the PL default** (203 / 208 / 226 / 250 = £887 vs £962). Market occupancy is 16 points behind STLY and the nights are 2–5 days out.
  - **17–20 Nov: below the default, to about P75** (253 / 259 / 260 / 268 = £1,040 vs £1,069; default £1,189). Market occupancy is 6 points behind STLY.
  - **26 Nov – 2 Dec: cap Fri–Sun 27–29 Nov at P75** (275 / 275 / 259 = £809 vs £906). Hold the other four nights (within £0–10 of P75).
  - **7–13 Dec: hold.** We are already £201 under the default and the market is ahead of STLY.
  - **12–13 Nov: hold** (between P50 and P75).
- **Open conflict with a standing decision (not a new proposal):** policy `deprioritised.p12_17nov_override` records "won't change Mile End 17 Nov +50%". The override list still shows **17 Nov −2%** (updated 28 Oct 12:44:36Z). The price is £255 (£387 under the +50%). Still unresolved: Corentin to confirm.

### 2b. P05 St John's Wood: 6–9 Nov booking and remaining open nights
- **The booking:** Airbnb, booked 29 Oct (8 days out), 3 nights. Room £893.52 = **£297.84 a night** (`reservations.csv`, cleaning £195 excluded).
- **Against the market** (3–5 BR band, 6–8 Nov): P25 £311, **P50 £399**, P75 £537, booked median **£364**. Market occupancy is 46.7% vs STLY 50.9%.
  - Paid is **−25% vs P50**, −18% vs the booked median and −4% vs P25.
  - The 4 BR-only summary P50 is £577 (`market.csv`), so against 4-beds the gap is wider.
- **Against our list:** PriceLabs list on 29 Oct was 464 / 466 / 456 = £1,386 (`2026-10-29/prices.csv`), so paid = 0.645×.
  - A 3-night stay gets no stay discount (policy), and Airbnb promotions were removed on 21 Oct. So the whole 35% gap is **unexplained on current evidence**.
  - 0.645 / 0.85 = 0.76, which matches the systematic 0.76–0.80× Airbnb gap the policy traces to Smoobu Airbnb default pricing rules. Those rules are documented only for Shepherd's Bush; whether they apply to P05 is NOT CHECKED (channel section).
- **Remaining open nights to 29 Dec (Smoobu): 19.**

| Nights | Our £ | PL default | Mkt P50 / P75 / P90 | Mkt occ vs STLY | Note / proposal |
|---|---|---|---|---|---|
| **Mon 9 Nov** (1-night gap between 6–9 and 10–16 Nov) | 426 | 434 | 374 / 517 / 720 | 32.1 vs 40.5% | **min_stay 2 on a 1-night gap = unsellable** (`prices.csv` min_stay 2). Set min 1 or accept the night is lost. |
| 16–17 Nov (2-night gap) | 428 / 448 | 503 / 552 | 400 / 528 / 705 | 30.2 vs 31.9% | £179 under default; between P50 and P75. Hold. |
| 29 Nov – 2 Dec (4) | 542 / 524 / 541 / 545 | 546 avg | 444 / 599 / 759 | 33.7 vs 35.1% | At default. Hold. |
| **7–8 Dec** (2-night gap) | 516 / 499 | 645 / 604 | 455 / 598 / 756 | **38.5 vs 30.7% (+7.8)** | **Above current, towards P75** (about £598 / £594, still under the default): +£177. |
| 13–21 Dec (9) | 598–674, 5,596 total | 5,498 | 493 / 653 / 826 avg | 34.0 vs 29.0% (+5) | Hold, at about the default. |
| **29 Dec** (orphan, min 1) | **1,331** | 1,035 | 635 / 812 / 1,080 | 46.3 vs 47.2% | **Below the default**, about P75–P90 (£812–1,080). The +100% override (18 Oct 20:34Z, per 29 Oct pull) is still unexplained. |

### 2c. Christmas / New Year (P20, P11, P05, P13)
| Ref | Status (Smoobu) | Our £ vs market | Proposal |
|---|---|---|---|
| **P20** Canary Wharf (1–3 BR band) | Fully open 19 Dec – 3 Jan | **19–27 Dec:** 331 / 300 / 344 / 344 / 349 / 353 / 352 / 355 / 417 (£3,145) vs default £3,541. P75 is 295–348 and P90 356–455. Market occupancy is 24.6% vs STLY 21.0%. **28 Dec – 2 Jan:** 528 / 589 / 590 / 591 / 570 / 505 (**£3,373**) vs default £3,478, **P90 499 / 511 / 517 / 503 / 439 / 384 (£2,853)** and P50 233–262. Market occupancy is 22–33% vs STLY 12–26% (+7 to +14 points). Min stay is 6 / 5 nights on 28 / 29 Dec. | **Hold 19–27 Dec** (already £396 under the default, between P75 and P90). **28 Dec – 2 Jan: below the default, cap at about P90** (£2,853, −£520). Reason: a new listing with no reviews, at 30% next-60 occupancy, priced £24–121 a night above the market's P90. |
| **P11** Camden (1–3 BR band; Booking.com only) | Booked 19–22 Dec and 26 Dec – 2 Jan. **Open 23–25 Dec, 3–4 Jan** | **23–25 Dec:** 313 / 310 / 317 vs default 298 / 295 / 302, P50 318 / 320 / 335, booked median 270 / 273 / 264. Market occupancy is 24.7 / 22.1 / 23.3% vs STLY 23.8 / 25.3 / 27.3%. **3 Jan (darts final):** 190 vs default 202, clean-week fortnight 203, P50 231. Market occupancy 16.3 vs 11.9%. | **Hold 23–25 Dec** (about £15 over the default, at P50; no darts 24–26 Dec). **3 Jan: above the default, about £213.** |
| **P05** St John's Wood (3–5 BR) | Booked 22–29 Dec and 30 Dec – 4 Jan. Open 13–21 Dec, 29 Dec, 4 Jan → | See 2b. **4–6 Jan:** 430 / 425 / 414 vs default 446 / 445 / 433, P50 408–390. Market occupancy 15–18% (STLY 9–12%). | Hold 13–21 Dec. **29 Dec below the default** (2b). Hold 4 Jan onwards at about the default. |
| **P13** Shepherd's Bush (2–3 BR; 3064856 prices) | Booked 27 Dec – 3 Jan. **Open 14–26 Dec and 3 Jan** | **14–26 Dec:** £2,988 vs default **£3,166**. 18–26 Dec: 241 / 243 / 227 / 236 / 232 / 233 / **227 / 229** / 234. 24–25 Dec sit £3 above P25 (224 / 226); P50 is 275 / 286 / 288 on 24–26 Dec. **Market occupancy 35.9% vs STLY 22.2% (+13.7 points; 19–26 Dec +11 to +23).** | **Above our current price, to at least the PL default on 14–23 Dec** (+£123), and **towards P50 on 24–26 Dec** (275 / 286 / 288, +£159). Total +£282. Keep the two twins slightly different (policy). The 3 Jan price of £206 is at the default: hold. |

## 3. Demand calendar, next 90 days (today's prices; fortnight = average of the surrounding 14 nights)
**Events verified 30 Oct 2026** (domain-restricted WebSearch; page URLs as returned):
- **O2 arena** ([theo2.co.uk/events/venue/the-o2-arena](https://www.theo2.co.uk/events/venue/the-o2-arena)): J. Cole Mon 2 Nov; Stevie Wonder 3 & 5 Nov; Noah Kahan **Fri 13, Sat 14, Tue 17 Nov** ([page](https://www.theo2.co.uk/events/detail/noah-kahan-2026); correction: 15–16 Nov are not Kahan nights); Muse Sun 15 & Mon 16 Nov ([page](https://www.theo2.co.uk/events/detail/muse-2026)); The Script 21 Nov ([page](https://www.theo2.co.uk/events/detail/the-script-2026)); Mariah Carey Mon 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)); Phoebe Bridgers 1–2 Dec; Kehlani 8 Dec; The Darkness 16 Dec; Kasabian 18 Dec; Culture Club 19 Dec; Amr Diab 20 Dec; RNBLAND NYE 31 Dec.
  - **Also listed today, room (arena or indigo) not confirmed, so not counted:** Korn 4 Nov, Suede & Manics 6 Nov, Papa Roach 8 Nov, Good Charlotte 19 Nov, Don Toliver 23 Nov ([page](https://www.theo2.co.uk/events/detail/don-toliver-2026)), Jungle 24–25 Nov ([page](https://www.theo2.co.uk/events/detail/jungle-2026)), Fontaines D.C. 27 Nov, Jessie Ware 28 Nov, LOTR in Concert 29 Nov, Bryson Tiller 4–5 Dec, Ocean Colour Scene 9 Dec, Pete Tong Ibiza Classics 11–12 Dec.
  - aespa 16 Jan was **not re-found today: UNVERIFIED** (verified 29 Oct).
- **ExCeL** ([excel.london/whats-on](https://www.excel.london/whats-on)):
  - **WTM 3–5 Nov** ([page](https://www.excel.london/visitor/whats-on/world-travel-market-london-2026); newly verified).
  - Retail Supply Chain & Logistics / Smart Retail Tech / eCommerce Packaging Expo 11–12 Nov ([page](https://www.excel.london/whats-on/retail-supply-chain-logistics-expo-2026)). This replaces "Business Show", which was not found today.
  - London EV Show 18–19 Nov ([page](https://www.excel.london/visitor/whats-on/london-ev-show)); London Vet Show 19–20 Nov ([page](https://www.excel.london/whats-on/london-vet-show-2026)).
  - HOMES UK 24–25 Nov; London Build Expo 25–26 Nov, "25,000+ visitors" ([page](https://www.excel.london/whats-on/london-build-expo)).
  - London Perfume Exhibition 10–13 Dec; London International Horse Show 17–21 Dec ([page](https://www.excel.london/m/visitor/whats-on/london-international-horse-show)).
- **Alexandra Palace** ([Enter Shikari](https://www.alexandrapalace.com/whats-on/enter-shikari/), [Blossoms](https://www.alexandrapalace.com/whats-on/blossoms/), [Gorgon City](https://www.alexandrapalace.com/whats-on/gorgon-city/), [what's on](https://www.alexandrapalace.com/whats-on/)): Enter Shikari 20–21 Nov, Great Hall; Nia Archives 26 Nov (room not stated today); Blossoms 27 Nov and Gorgon City 28 Nov, both Great Hall.
- **World Darts** ([pdc.tv/wcfaq](https://www.pdc.tv/wcfaq), [Ally Pally](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/)): Fri 11 Dec 19:00 – Sun 3 Jan final 20:00; semi-finals Sat 2 Jan. "Record 180,000 tickets", Great Hall.
  - The 24–26 Dec break (play on 23 Dec) comes from pdc.tv on 29 Oct; it was not re-read today.
- **Allianz Stadium Twickenham** ([Finals Weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend), [englandrugby.com](https://www.englandrugby.com/follow/news-and-media/england-fixtures-confirmed-inaugural-nations-championship)): England v New Zealand Sat 21 Nov 14:10; Finals Fri 27 – Sun 29 Nov. England v Australia (8 Nov) and v Japan (14 Nov) are named as the earlier pool games on the same pages.
- **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – 1 Jan 00:30, ticketed via Ticketmaster.
- **VENUES map** (`build/properties.py`): O2 → P01, P09, P07, P04. ExCeL → P01, P04, P07, P15. Ally Pally → P08, P11. Twickenham → P18, P10, P13, P16.
  - P20 is not in the map; O2 and ExCeL are applied to it as for P01.
  - P12 and P05 have no verified event.

| Nights | Event | Venue | Properties | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 2 Nov | J. Cole | O2 | P04 (P01, P09, P20 booked) | compression | P04 **129** vs 152 | no; P04 1–2 Nov is a 2-night gap that P04's 3-night rule makes unsellable |
| 3–5 Nov | Stevie Wonder + WTM | O2 / ExCeL | P04, P01, P09, P20 | compression | all booked | n/a |
| 7 Nov | England v Australia (Sun 8) | Twickenham | P13 | compression | booked | n/a |
| 10–11 Nov | Retail / eCommerce expos (11–12) | ExCeL | P04 / P20 (P01 booked) | compression | P04 158 / 158 vs 175; P20 246 / 245 vs 257 | **no** |
| 13 Nov | Noah Kahan | O2 | P20, P04 (P01 and P09 booked) | compression | P20 245 vs 257; P04 162 vs 188 | **no** |
| 14–17 Nov | Noah Kahan 14 / 17, Muse 15–16 | O2 | P20 | compression | 282 / 275 / 274 / 279 vs 257 | yes (+7–10%) |
| 13–14 Nov | England v Japan | Twickenham | P13 | compression | booked | n/a |
| 18–19 Nov | EV Show + Vet Show | ExCeL | P04 / P20 | compression | P04 205 / 201 vs 207; P20 279 / 273 vs 269 | P04 no; P20 yes |
| 20–21 Nov | Enter Shikari | Ally Pally | P11 | compression | 248 / 255 vs 209 | yes (+19–22%) |
| 20–21 Nov | England v NZ | Twickenham | P13 | compression | booked | n/a |
| 21 Nov | The Script | O2 | P20 blocked (delivery); others booked | — | n/a | n/a |
| 24 Nov | HOMES UK (24–25) / Build Expo eve | ExCeL | P04 / P20 | compression | P04 205 vs 213; P20 277 vs 280 | **no** |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally | P11 | compression | **217** / 266 / 267 vs 233 | 26 Nov no; 27–28 yes |
| 26–29 Nov | Nations Championship Finals (27–29) | Twickenham | P13 | compression | 27 Nov 342 vs 240 (+50% override); the rest booked | yes |
| 30 Nov – 2 Dec | Mariah Carey / Phoebe Bridgers | O2 | P20, P04 | compression | P20 booked; P04 2 Dec £503 (deprioritised) | n/a |
| 8 Dec | Kehlani | O2 | P04 / P20 | compression | P04 193 vs 200; P20 313 vs 300 | P04 no; P20 yes |
| 11–12 Dec | Darts opening | Ally Pally | P11 | compression | 314 / 320 vs 256 | yes (+23–25%) |
| 13–17 Dec | Darts | Ally Pally | P11 | compression | 232 / 206 / 209 / 221 / 236 vs 282 | **no** (conflict, see §4) |
| 16–20 Dec | O2 16 / 18 / 19 / 20 + Horse Show 17–21 | O2 / ExCeL | P20 / P04 (P01 blocked or booked) | compression | P20 **270** / 302 / 311 / 331 / 300 vs 298 (clean week); P04 198 / 200 / 206 vs 196, 19–20 booked | P20 16 Dec no |
| 23 Dec | Darts, last pre-Christmas session | Ally Pally | P11 | compression | 313 vs 322 (fortnight lifted by booked 26–29 Dec at 320–436) | borderline |
| 24–26 Dec | No darts (break per pdc.tv, 29 Oct) | — | P11, P13, P20 | P11 soft (market behind STLY); P13 compression on occupancy (+15–20 points) | see 2c | — |
| 28 Dec – 1 Jan | NYE (31 Dec) | central London | P20 (P04, P11, P13 booked) | compression | P20 31 Dec 591 vs 323 (NYE week excluded) | **yes, above P90** (2c) |
| 3 Jan | Darts final | Ally Pally | P11 | compression | **190** vs 203 (clean week) | **no** |
| 16 Jan | aespa | O2 | P04 / P20 | **UNVERIFIED today** | P04 193 vs 183; P20 290 vs 275 | (yes) |

## 4. Missed compression: open, verified-event nights at or below the fortnight (today)
| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 10, 11 Nov | ExCeL retail / eCommerce expos | 246, 245 | 257 | 11, 12 |
| P20 | 13 Nov | Noah Kahan | 245 | 257 | 12 |
| P20 | 24 Nov | HOMES UK / Build Expo eve | 277 | 280 | 3 |
| P20 | 16 Dec | The Darkness / Horse Show eve | 270 | 298 (clean week) | 28 |
| P11 | 26 Nov | Nia Archives | 217 | 233 | 16 |
| P11 | 23 Dec | Darts (borderline, see §3) | 313 | 322 | 9 |
| P11 | 3 Jan | Darts final | 190 | 203 (clean week) | 13 |
| P04 | 8 Dec | Kehlani | 193 | 200 | 7 |
| | | | | **Actionable: 9 nights** | **£111** (29 Oct: 10 / £73) |
| P04 | 2 Nov | J. Cole (2-night gap, unsellable under the 3-night rule) | 129 | 152 | 23 |
| P04 | 10, 11 Nov | ExCeL expos | 158, 158 | 175 | 17, 17 |
| P04 | 13 Nov | Noah Kahan | 162 | 188 | 26 |
| P04 | 18, 19 Nov | EV / Vet Show | 205, 201 | 207 | 2, 6 |
| P04 | 24 Nov | HOMES UK / Build Expo eve | 205 | 213 | 8 |
| | | | | **P04 Nov, information only (Corentin 24 Oct −8% "no demand"): 7 nights** | **£99** (29 Oct: 5 / £62) |
| P11 | 13–17 Dec | Darts (override conflict) | 232, 206, 209, 221, 236 | 282 | 50, 76, 73, 61, 46 = **£306** (29 Oct: £300) |

- **Like-for-like with yesterday** (P04 November included, P11 13–17 Dec excluded): **16 nights / £210, against 15 nights / £135 on 29 Oct.** The full total is 21 nights / £516 (29 Oct: 20 / £435).
- **Dropped off since yesterday:**
  - P20 15–16 Nov (now 275 / 274 vs 257) and P20 18 Nov (279 vs 269). PriceLabs lifted P20 14–19 Nov by £8–19 overnight.
- **New since yesterday:**
  - P20 13 Nov (264 → 245) and P04 13 Nov (205 → 162). PriceLabs cut P20 6–13 Nov by £14–19 and P04 13 Nov by £43; no user edit was logged.
  - P04 2 Nov (156 → 129; it became a 2-night gap after the 3–6 Nov booking).
  - P11 23 Dec.
- **Gaps that grew:** P20 10–11 Nov (£0 / 5 → £11 / 12) and P20 24 Nov (£8 → £3, so that one shrank). P11 26 Nov £7 → £16; P11 3 Jan £11 → £13.
- **P11 darts 13–17 Dec, still an open conflict with a standing decision (not a new proposal):**
  - Policy `listing_facts.P11.darts_override_24oct` says leave the +5%.
  - `get_user_logs` shows no change since 28 Oct, so the 28 Oct state stands: min stay 2 only on 13–16 Dec and −2% on 17 Dec (from the 29 Oct override pull).
  - Prices rose +£9 / +£6 / +£8 / +£9 / +£12 overnight, but the fortnight rose with them (11–12 Dec now 314 / 320). Corentin to confirm.

## 5. Dates to price above / below the PriceLabs default (summary, per submarket)
- **Above the default / above current (verified event or market well ahead of STLY):**
  - **Shepherd's Bush P13:** 14–23 Dec to the default (+£123); 24–26 Dec towards P50 (+£159). Market occupancy is +11 to +23 points vs STLY.
  - **Camden P11:** 3 Jan about £213 (darts final; default 202). Also 26 Nov from £217 to at least the £233 fortnight (Nia Archives; PL default £262, P50 £264).
  - **Canary Wharf P20:** 16 Dec to at least the £298 fortnight (The Darkness / Horse Show eve; PL default £317). 10–11 and 13 Nov to at least the £257 fortnight (ExCeL expos / Noah Kahan; PL default £312–313, so we are £66–68 a night under it. Reyhan's −5% on 6–24 Nov (28 Oct log) explains only about £16 of that; the rest comes from listing customizations, which were not pulled).
  - **St John's Wood P05:** 7–8 Dec towards P75 (about £598 / £594; still under the default; market +7.8 points vs STLY). **9 Nov: min stay 1 or the night is lost.**
- **At the default (hold):** P11 23–25 Dec; P05 29 Nov – 2 Dec, 13–21 Dec and 4 Jan →; P20 19–27 Dec at today's level (£396 under the default); P12 7–13 Dec and 12–13 Nov.
- **Below the default:**
  - **P20 28 Dec – 2 Jan:** cap at about P90 (−£520 over 6 nights).
  - **P05 29 Dec:** £1,331 → about £812–1,080.
  - **P12:** 1–4 Nov to the default (−£75); 17–20 Nov to about P75 (−£29 vs current); 27–29 Nov cap at P75 (−£97).

## 6. What the 2 Nov base review should consider (from market data)
| Ref | Base (18 Oct raise) vs market (`market.csv` 30 Oct) | Sellable nights left (Smoobu, `prices.csv`) | Market reading | For the review |
|---|---|---|---|---|
| **P01** | 253 vs 2 BR P50 257 / P75 331 | **0 open to the 20 Dec handback** (33 booked, 18 handback-blocked) | n/a | The base cannot earn anything more before handback. Drop P01 from the review, or only check the 28-night stay's paid rate (kpi: £152 vs £202 expected). |
| **P05** | 550 (raised to 550 on 20 Oct) vs 4 BR P50 577 / P75 720. PL recommends 548 | 19 open; avg £600 vs band P50 £470 / P75 £624 | Our occupancy 80 / 65% vs market 39 / 37%; open-night market occupancy 34.6% vs STLY 32.3% | **Hold the base.** List is at the default (£11,396 vs £11,455) and under P75. The leaks are not the base: Airbnb paid at 0.645× list (6–9 Nov), the 9 Nov unsellable orphan, and the 29 Dec +100%. |
| **P06** | 357 vs 2 BR P50 403 / P75 508. PL recommends 342 | 7 open (8–14 Nov, avg £308); the rest are intentional blocks (policy) | Market occupancy 45 / 40%; booked 53% of the nights left open (kpi) | The base drives only 7 nights; open nights at £308 sit under P50. Compare paid vs price (kpi: £204 paid vs £261 expected). There is no market case to cut. |
| **P09** | 176 vs 1 BR P50 136 / P75 161 / P90 204. PL recommends 176 | 4 open (31 Oct, 10–12 Nov, avg £148) before the 26 Nov handback | Our occupancy 80 / 90% vs market 36 / 31% | **Hold** (open nights are priced at P50–P75). Only 4 nights are affected. |
| **P11** | 286 vs 2 BR P50 289 / P75 330. PL recommends 285 | 38 open; avg **£238 vs band P50 £257**, default £259 | Our occupancy 40 / 37% vs market 46 / 39% (behind market) while priced 8% **under** the default; open-night market occupancy 32.8% vs STLY 33.3% (level) | **The base is not the problem.** We are cheaper than the band and still less booked. Look at the Booking.com-only reach (policy: Camden search views −64%, CTR 0.81% vs 1.70%) and the darts conflict. |
| **P12** | 284 vs 2 BR P50 206 / P75 245 / P90 303 (base is 38% over P50). PL recommends 273 | 24 open before the 13 Dec handback; avg £271 vs band P50 £210 / P75 £263 | Our occupancy 57 / 60% vs market 40 / 33% (helped by re-sells); kpi pace −11% vs STLY; open-night market occupancy 33.4% vs STLY 35.4% | **Consider 273 (the PL recommendation)**, or use the date proposals in 2a instead. Open nights sit above P75 on average, but Booking.com stacks pay out at 0.56–0.93× list. Only 24 nights remain, so the date-level fixes in 2a are worth more than a base change. |

Data gaps:
1. All market figures are PriceLabs Nearby Listings data (Airbnb-derived, not comp sets; `cleaning_fee: null`; the summary horizon is unstated).
   - The P11 and P20 daily bands are 1–3 BR, which understates a 2-bed; this is weak for Booking.com-only P11. The P05 daily band is 3–5 BR (summary 4 BR P50 £577 vs daily-band P50 around £400–470).
   - P08 and P14 percentiles are from 27 Oct and P10 was not pulled.
2. Event checks are domain-restricted WebSearch summaries, not page reads.
   - theo2.co.uk is ENOTFOUND for WebFetch. theo2.co.uk, excel.london, alexandrapalace.com and pdc.tv all return 403 at the proxy. These sites have to be allowed in the session's network settings.
   - **UNVERIFIED today:** aespa 16 Jan (O2), "Business Show" (ExCeL), the darts Christmas break (from 29 Oct), and whether the extra O2 listings are arena or indigo.
   - Attendance is stated only for darts (180,000 tickets) and London Build Expo (25,000+ visitors).
3. Prices for P05, P13, P20 and P04 are from the 29 Oct ~09:00Z refresh, so PriceLabs did not yet see the 29 Oct bookings (P05 / P04 6–9 Nov). P12, P11 and P01 are from 30 Oct 05:51–06:30Z.
4. The cause of P12's overnight +£11.7 mean rise is NOT CHECKED. There is no log or override change; it coincides with forward occupancy rising from 47% to 57%. Customizations were not pulled.
5. P05 6–9 Nov: the price at the moment of booking and whether Smoobu Airbnb default pricing rules apply to P05 are NOT CHECKED. The 35% gap is unexplained.
6. The P11 darts overrides were not re-pulled today. The state is inferred from 0 log entries since 28 Oct plus the 29 Oct override pull.
7. One protocol slip: today's first PriceLabs pair (`get_user_logs` + P12 neighbourhood) was sent together. Both returned 200; every later call was sent one at a time.

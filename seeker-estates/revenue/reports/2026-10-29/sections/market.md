# Market & demand calendar: run D = 2026-10-29 (window 30 Oct 2026 – 27 Jan 2027)

## Sources and method
- **Policy:** I read `data/policy.json` first.
  - Excluded: P02, P03, P06 and P07 (intentional blocks). P14 numbers are reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13 is one flat (3064856 + 3090701). Not re-raised: P04 2 Dec (£509, +200%).
  - `total_gbp` is room only, with cleaning excluded (rm/snapshot.py line 200).
- **Market data:** `get_neighbourhood_data` (detail mode, `include_future_prices` + `include_occupancy`), pulled 29 Oct one call at a time. The order was P12 2699998, P20 3547481, P11 3064196, P05 3166592, then P13 3064856.
  - Raw files: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m29/neigh_<id>.json`.
  - This is PriceLabs Nearby Listings data, Airbnb-derived. It is not a comp set, and whether cleaning is included is not stated.
  - Column names: `market_25/75/90_percentile_prices`, `market_price` (= P50), `booked_50_percentile_price` ("booked median"), `occupancy.daily.market_occupancy` / `_stly`, and `prices_with_default_customization` (the "PL default" below).
  - Daily bands: P12 and P13 use 2–3 BR, P11 and P20 use 1–3 BR, P05 uses 3–5 BR.
- **market.csv:** `data/snapshots/2026-10-29/market.csv` was created by copying 28 Oct forward under a file lock. I appended today's summary_table rows for P12, P20, P11, P05 and P13.
- **Our prices:**
  - Up to 28 Dec: `data/snapshots/2026-10-29/prices.csv`, column `pricelabs_price`.
  - After 28 Dec: neighbourhood `final_price` (29 Oct). For P04, live `get_listing_prices` 29 Dec – 27 Jan.
  - PriceLabs last refreshed on 28 Oct: P05 09:04Z, P11 10:30Z, P13 10:31Z, P04 10:33Z, P12 12:45Z, P20 14:20Z.
  - **Booking state comes from Smoobu `reservations.csv` (29 Oct, confirmed stays), not PriceLabs.** PriceLabs still shows P12 4–7 Dec as booked (that booking is cancelled) and P12 21–25 Nov as open (newly booked).
- **Fortnight method:** unchanged (7 nights before + 7 after; blocked nights and nights above 2× the median excluded; clean-week rules for 16–20 Dec, 3 Jan and 16 Jan).
  - Script: `.../scratchpad/m29/analyse29.py`, output `.../m29/out29.txt`. Detail tables: `.../m29/detail29.py`.
- **Attribution:** I used `get_user_logs` (listing, 27–29 Oct) and `get_listing_date_overrides` for P12 (1 Nov – 13 Dec), P05 (14 Dec – 5 Jan) and P11 (22 Nov – 4 Jan).
- **Events re-verified 29 Oct 2026.** The venue sites themselves do not resolve from this session (theo2.co.uk, excel.london and alexandrapalace.com all returned ENOTFOUND), so I used WebSearch restricted to each venue's or organiser's domain:
  - **O2 arena** ([theo2.co.uk/events/venue/the-o2-arena](https://www.theo2.co.uk/events/venue/the-o2-arena)): J. Cole 2 Nov; Stevie Wonder 3 & 5 Nov; Noah Kahan 13–17 Nov; Muse 15–16 Nov; The Script 21 Nov; Mariah Carey 30 Nov ([page](https://www.theo2.co.uk/events/detail/mariah-carey-2026)); Phoebe Bridgers 1–2 Dec; Kehlani 8 Dec; The Darkness 16 Dec; Kasabian 18 Dec; Culture Club 19 Dec ([page](https://www.theo2.co.uk/events/detail/culture-club-2026)); Amr Diab 20 Dec; RNBLAND NYE 31 Dec; aespa Sat 16 Jan 2027 ([page](https://www.theo2.co.uk/events/detail/aespa-2027); one listing says indigo).
  - **ExCeL** ([excel.london/whats-on](https://www.excel.london/whats-on)): Business Show 11–12 Nov; London Vet Show 19–20 Nov; London Build Expo 25–26 Nov; London International Horse Show 17–21 Dec. **Bett was not found today: UNVERIFIED, so dropped.**
  - **Alexandra Palace** ([whats-on](https://www.alexandrapalace.com/whats-on/), [Nia Archives](https://www.alexandrapalace.com/whats-on/nia-archives/), [Blossoms](https://www.alexandrapalace.com/whats-on/blossoms/), [Gorgon City](https://www.alexandrapalace.com/whats-on/gorgon-city/), [Enter Shikari](https://www.alexandrapalace.com/whats-on/enter-shikari/)): Enter Shikari 20–21 Nov; Nia Archives 26 Nov, Blossoms 27 Nov and Gorgon City 28 Nov, all in the Great Hall.
  - **World Darts** ([pdc.tv/WCFAQ](https://www.pdc.tv/WCFAQ), [pdc.tv/calendar](https://www.pdc.tv/calendar/)): Fri 11 Dec – Sun 3 Jan, "record 180,000 tickets".
    - **Christmas break, now verified from a primary source:** play on Wed 23 Dec, then none until Sun 27 Dec (no play 24–26 Dec).
  - **Allianz Stadium Twickenham** ([England v NZ](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match), [Finals Weekend](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)): England v Australia Sun 8 Nov; v Japan Sat 14 Nov; v New Zealand Sat 21 Nov 14:10; Finals Weekend Fri 27 – Sun 29 Nov.
  - **NYE fireworks** ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)): Thu 31 Dec 20:00 – 1 Jan 00:30, ticketed.
  - **Not re-verified today, so UNVERIFIED and left out of the totals:** WTM (ExCeL), Arsenal v Hull, England v Croatia (Wembley 12 Nov), England Women v Ukraine (5 Dec), Harlequins Big Game (28 Dec), Bett.
- **VENUES map** (`build/properties.py`):
  - O2 → P01, P09, P07, P04. ExCeL → P01, P04, P07, P15. Ally Pally → P08, P11. Twickenham → P18, P10, P13, P16.
  - **P20 is not in the map.** I apply O2/ExCeL to it because it is in the same area as P01 (Canary Wharf).
  - P12 (Mile End) and P05 (St John's Wood) have no verified event inside the window.

## 1. Submarket table (`market.csv` 29 Oct; market occ 30/60 = `pl_kpis.csv` 29 Oct)

| Area | Ref | BR | Mkt occ 30/60 | P50 / P75 £ (`market.csv` row date) | Our occ 30/60 |
|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 27% | 267 / 337 (28 Oct) | 100/100%* |
| Canary Wharf | P20 | 2 | 36 / 29% | **255 / 315 (29 Oct)** | 37 / 32% |
| Barking | P04 | 2 | 25 / 20% | 178 / 225 (28 Oct) | 43 / 48% |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 143 / 173 (28 Oct) | 77 / 88%* |
| Mile End (HB 13 Dec) | P12 | 2 | 39 / 32% | **207 / 247 (29 Oct)** | 47 / 52% |
| Islington (HB 13 Nov) | P08 | 2 | 50 / 44% | 228 / 284 (27 Oct) | 90 / 95%* |
| Camden | P11 | 2 | 43 / 38% | **290 / 331 (29 Oct)** | 47 / 37% |
| St John's Wood | P05 | 4 | 38 / 37% | **579 / 722 (29 Oct)** | 80 / 65% |
| Primrose Hill (report only) | P14 | 1 | 40 / 37% | 205 / 255 (27 Oct) | 0 / 0% |
| Shepherd's Bush | P13 | 2 | 40 / 36% | **230 / 283 (29 Oct)** | 67 / 47% |
| Hanger Lane (HB 18 Nov) | P10 | 1 | 29 / 24% | not pulled (0 sellable nights) | 100/100%* |

\* Inflated, because PriceLabs counts handback blocks as occupied.

- **Overnight change in the 2 BR P50 (29 vs 28 Oct):** P12 210 → 207, P20 261 → 255, P11 302 → 290, P13 238 → 230. P05 4 BR 594 → 579.
- The summary percentiles cover an unstated horizon, so the move may be partly window roll, not a demand shift.

## 2. Asked-for checks

### 2a. P12 Mile End: reopened nights at market level
- **Smoobu changes:**
  - **Cancelled:** 18–22 Nov (booked 19 Sep) and 4–8 Dec (booked 26 Oct).
  - **New booking** (made 28 Oct): 21–26 Nov, so 21 Nov is re-sold.
  - **Reopened nights:** 18–20 Nov and 4–7 Dec. 17 Nov and 26 Nov – 3 Dec were already open, as were 8–13 Dec.
- **Prices:** PriceLabs (12:45Z on 28 Oct) still treats 4–7 Dec as booked, but its prices exist and are pushed to Smoobu.

| Window (open nights) | Our avg £ | PL default avg | Mkt P25 / **P50** / P75 / P90 | Booked median | Mkt occ vs STLY |
|---|---|---|---|---|---|
| 17–20 Nov (Tue–Fri, 4) | **236** (227 / 223 / 230 / 265) | 253 | 171 / **210** / 262 / 332 | 191 | 34.6 vs 40.4% (**−5.8 pts**) |
| 26–28 Nov (Thu–Sat, 3) | **277** (246 / 274 / 312) | 308 | 183 / **221** / 272 / 347 | 186 | 36.9 vs 42.7% (**−5.8 pts**) |
| 29 Nov – 3 Dec (5) | 262 | 288 | 176 / 223 / 269 / 342 | 186 | 26.1 vs 25.6% (level) |
| 4–7 Dec (Fri–Mon, 4, reopened) | **285** (301 / 310 / 264 / 263) | 320 | 180 / **230** / 277 / 356 | 202 | 39.6 vs 30.1% (**+9.5 pts**) |
| 8–13 Dec (6, last week before handback) | 279 | 310 | 180 / 231 / 271 / 355 | 213 | 25.1 vs 20.0% (+5.1 pts) |

- **We are already below the PriceLabs default on every open night**, by 6–13%. That comes from Reyhan's −2% on 16 Nov – 13 Dec (log 28 Oct 12:44Z) plus listing-level customizations.
- **We are still 12–25% over the band median and at or above P75** on most nights. The biggest gaps over P75 are Sat 28 Nov (+£37), Fri–Sat 4–5 Dec (+£13 / +£25) and Fri–Sat 11–12 Dec (+£26 / +£33).
- **The re-sold 21–26 Nov booking** paid **£202.47 a night room** (£1,012.36 / 5). The market P50 for 21–25 Nov averages £207 and the booked median £173. So it sold at about the median and 17% above the market's booked median. The 0.741× vs list is the Booking.com stack (channel section).
- **Cancellation pattern:** the cancelled stays were booked on 15 Sep, 19 Sep, 20 Sep, 3 Oct and 26 Oct. Cancellation dates, rate plan (NR or flexible) and whether a stay was re-booked cheaper are all **NOT CHECKED**: Smoobu `reservations.csv` has no cancellation date or rate-plan field.
- **Proposal: below the PriceLabs default (P12 has no verified event):**
  - **17–20 Nov:** about the median +5%: £212 / £212 / £223 / £234 = £881 against today's £945. Market occupancy is 6 points behind STLY.
  - **Sat 28 Nov:** about P75 (£275 vs £312). Hold Thu/Fri 26–27 Nov (246 / 274, already under or at P75).
  - **29 Nov – 3 Dec:** median +5–8% (about £225–250; today £254–273).
  - **4–7 Dec:** hold today's prices, which are already £35–47 a night under the default. Market occupancy is **9.5 points ahead of STLY**, so do not cut further.
  - **8–13 Dec:** hold. Market occupancy is 5 points ahead of STLY.
- **Plan item a-p12-2228nov (fixed overrides): not done.** `get_listing_date_overrides` shows −2% on 16 Nov – 13 Dec, not fixed prices. Its 22–25 Nov nights are now booked; 26–28 Nov is still relevant.
- **Reported as a conflict with a standing decision (not a new proposal):** policy `deprioritised.p12_17nov_override` records "Corentin 24 Oct: won't change Mile End 17 Nov +50%". The override list now shows **17 Nov at −2%, min stay 2**, updated 28 Oct 12:44:36Z by reyhan@. The price went from £387 to £227. Corentin to confirm.

### 2b. P20 Waterford Airbnb booking 25 Nov – 5 Dec: paid vs market
- **The booking:** 10 nights, booked 28 Oct, 28 days out. Room £1,742.65 = **£174.27 a night**, commission £293.36.
- **Market for the 10 nights** (1–3 BR band): P25 £185.0, **P50 £221.0**, P75 £288.9, booked median **£200.7**. Market occupancy is 25.6% vs STLY 23.8%.
  - The 2 BR-only P50 is £255 (`market.csv`), so the band understates a 2-bed.
- **Paid against the market:**
  - −21% vs P50, −13% vs the booked median, −6% vs P25.
  - After the policy's 15% weekly discount (P50-equivalent £187.9), paid is still 7% under.
- **Paid against our list:**
  - PriceLabs list on 27 Oct (`2026-10-28/prices.csv`): £2,726 (272.6 a night), so paid = 0.639×. After the 15% weekly discount the expected price is £2,317, so **paid is 0.752× of expected**.
  - Today's list (refresh 28 Oct 14:20Z, after reyhan's 14:15Z change of 6–24 Nov from −10% to −5%): £2,840. The PL default is £3,392.
  - The booking sits inside reyhan's −10% (13–30 Nov) and −5% (1–20 Dec) overrides (logs 27 Oct 14:42Z).
- **Verdict:**
  - The list was not too low against the market: £273 a night is above the band P75 and level with the 2 BR P75.
  - The discount to the guest takes it to just under P25. Per policy the Airbnb last-minute discount (0–14 days) does not apply at 28 days out, and the new-listing promotion has ended.
  - So about a 25% gap beyond the weekly discount is **unexplained on current evidence**. Whether Smoobu Airbnb default pricing rules exist on P20 (they are documented only for Shepherd's Bush) is NOT CHECKED. That is for the channel section.

### 2c. Christmas / New Year
| Ref | Status (Smoobu) | Open nights: our £ vs market | Proposal |
|---|---|---|---|
| **P20** Canary Wharf (1–3 BR band) | Fully open 19 Dec – 3 Jan | **19–27 Dec:** 304–426 vs P50 234–259, P75 300–348, P90 361–458. Market occupancy is 19–28% vs STLY 19–23%. Ours is £39–56 under the default (385–473). **28 Dec – 2 Jan: 592 / 594 / 595 / 595 / 571 / 505** vs P90 498 / 508 / 516 / 503 / 442 / 385 (£79–129 over P90 every night) and P50 235–263 (2.3×). The booked median is 195–214. Market occupancy is 30–32% vs STLY 17–25% (+7–14 points). PriceLabs' insight says market price is "+25.4%" on 27–31 Dec. | **Below the PriceLabs default on 28 Dec – 2 Jan:** cap at about P90 (£498 / 508 / 516 / 503 / 442 / 385 = £2,852, against £3,452 today). Ours and the default are within £1–19, so the default itself is the issue. Reason: a new listing with no reviews and 32% next-60 occupancy. **Hold 19–27 Dec** below the default, as today. |
| **P11** Camden | Booked 19–22 Dec and 26 Dec – 2 Jan. **Open 23–25 Dec and 3 Jan** | **23–25 Dec:** 318 / 311 / 313 vs default 316 / 309 / 311 (the +10% override from 15 Oct cancels the listing customizations). P50 is 319 / 321 / 337 and the booked median 271 / 274 / 265. Market occupancy is 22–25% vs STLY 24–27% (level to 4 points behind). Darts plays 23 Dec only (no play 24–26 Dec, pdc.tv). **3 Jan (darts final):** 193 vs default 206, fortnight 204 (clean week), P50 231, booked median 189. Market occupancy is 16.7% vs STLY 11.2%. | **Hold 23–25 Dec at the default.** **3 Jan: above the default**, about £215 (fortnight +5%, still under P50). |
| **P05** St John's Wood (3–5 BR band) | Booked 22–28 Dec (£646.85/n) and 30 Dec – 3 Jan (£637.74/n). **Open 14–21 Dec, 29 Dec and 4 Jan** | **14–21 Dec:** 582–693 vs default 544–735, P50 448–563, P75 597–728. Market occupancy is 27–45% vs STLY 21–39% (+1–9 points). **29 Dec (orphan, min 1): £1,370** vs default 1,072, P75 816, **P90 1,093**, booked median 507. The cause is a **+100% override** (`get_listing_date_overrides`, updated 18 Oct 20:34Z). | **Hold 14–21 Dec at about the default** (between P50 and P75; occupancy ahead of STLY). **29 Dec: below the default**, between P75 and P90 (about £820–1,000). Corentin to confirm whether the 18 Oct +100% was deliberate (the same evening as the policy's 18 Oct "base rises plus overrides"). |
| **P13** Shepherd's Bush (2–3 BR) | Booked 27 Dec – 3 Jan (£252.29/n room). **Open 14–26 Dec and 3 Jan** | **18–26 Dec:** 241 / 244 / 227 / 236 / 235 / 236 / 229 / 232 / 236 (£2,116) vs default 273 / 278 / 242 / 267 / 264 / 267 / 251 / 258 / 270 (£2,370) and P50 258–292. **24 Dec £229 is under P25 (£233)**; 25 Dec is equal to P25. Market occupancy is **35–44% vs STLY 21–32% (+8 to +20 points)**. 14–17 Dec: 219–226 vs default 229–241 and P50 236–249. | **Above our current price, to at least the PriceLabs default on 14–26 Dec** (+£254 over 18–26 Dec). On 24–26 Dec, go towards P50 (£278–292). Reyhan's −3% on 23–26 Dec (log 27 Oct 11:58Z) still runs against the market. |

- **Booked Christmas stays against the market** (room only):
  - P11 26 Dec – 3 Jan: £280.61 a night vs P50 average £342.75 (−18%; −4% after the 15% weekly discount).
  - P13 27 Dec – 3 Jan: £252.29 vs £294.14 (−14%; level after the weekly discount).
  - P05 22–29 Dec: £646.85 vs £602.71 (+7%).
  - P05 30 Dec – 4 Jan: £637.74 vs £537.80 (+19%).

## 3. Demand calendar, next 90 days (today's prices; fortnight = average of the surrounding 14 nights)

| Nights | Event (verified 29 Oct) | Venue | Properties | Effect | Our £ vs fortnight £ | Priced by PL? |
|---|---|---|---|---|---|---|
| 2 Nov | J. Cole | O2 | P04 / P01, P09, P20 | compression | P04 156 vs 155; the others booked | barely |
| 3, 5 Nov | Stevie Wonder | O2 | P04, P01, P09, P20 | compression | all booked (P04 new 3–6 Nov) | n/a |
| 7 Nov | England v Australia (Sun 8) | Twickenham | P13 | compression | booked | n/a |
| 10–11 Nov | Business Show | ExCeL | P04 / P20 | compression | P04 159 / 159 vs 174; P20 263 / 258 vs 263 | **no** |
| 13–17 Nov | Noah Kahan (13–17) + Muse (15–16) | O2 | P20 (P01, P09, P04 booked or 13 Nov only) | compression | P20 264 / 274 / 261 / 261 / 266 vs 262; P04 13 Nov 205 vs 184 | P20 15–16 Nov no (−£1) |
| 13–14 Nov | England v Japan (Sat 14) | Twickenham | P13 | compression | twin-booked | n/a |
| 18–19 Nov | London Vet Show | ExCeL | P04 / P20 | compression | P04 191 / 193 vs 203; P20 258 / 266 vs 264 | P04 no; P20 18 Nov no |
| 20–21 Nov | Enter Shikari | Ally Pally | P11 | compression | 281 / 282 vs 223 | **yes (+26%)** |
| 20–21 Nov | England v NZ (Sat 21, 14:10) | Twickenham | P13 | compression | booked | n/a |
| 21 Nov | The Script | O2 | P20 (blocked, delivery), P04 / P01 / P09 booked | compression | n/a | n/a |
| 24 Nov | London Build Expo eve | ExCeL | P04 / P20 | compression | P04 198 vs 206; P20 264 vs 272 | **no** |
| 26–28 Nov | Nia Archives / Blossoms / Gorgon City | Ally Pally Great Hall | P11 | compression | 234 / 286 / 305 vs 241 | 26 Nov no; 27–28 yes |
| 26–29 Nov | Nations Championship Finals (27–29) | Twickenham | P13 | compression | 27 Nov 344 (+50% override, min 1) vs 243; the rest booked | yes |
| 30 Nov – 2 Dec | Mariah Carey / Phoebe Bridgers | O2 | P20, P04 | compression | P20 booked; P04 1 Dec booked, 2 Dec £509 (deprioritised) | n/a |
| 8 Dec | Kehlani | O2 | P04 / P20 | compression | P04 195 vs 202; P20 318 vs 303 | P04 no; P20 yes |
| 11–12 Dec | World Darts opening | Ally Pally | P11 | compression | 299 / 303 vs 245 | yes (+22–24%) |
| 13–17 Dec | World Darts | Ally Pally | P11 | compression | 223 / 200 / 201 / 212 / 224 vs 272 | **no** (see conflict) |
| 16–20 Dec | Darkness 16 / Kasabian 18 / Culture Club 19 / Amr Diab 20 (O2) + Horse Show 17–21 (ExCeL) | O2 / ExCeL | P20 / P04 (P01 blocked or booked) | compression | P20 273 / 304 / 313 / 329 / 304 vs 302 (clean week 9–15 Dec); P04 198 / 200 / 207 vs 198, 19–20 booked | P20 16 Dec no; P04 barely |
| 23 Dec | Darts, last pre-Christmas session | Ally Pally | P11 | compression | 318 vs 312 | yes (+2%) |
| 24–26 Dec | No darts (verified break); Christmas | — | P11, P13, P20 | soft (P11 market occupancy behind STLY) / normal | see 2c | — |
| 28 Dec – 1 Jan | NYE (31 Dec) | central London | P20 (P04, P11, P13 booked) | compression | P20 31 Dec 595 vs 327 (NYE week excluded) | **yes, above P90** (see 2c) |
| 3 Jan | Darts final | Ally Pally | P11 | compression | 193 vs 204 (clean week 4–10 Jan) | **no** |
| 16 Jan | aespa | O2 (one listing says indigo) | P04 / P20 | compression | P04 190 vs 182; P20 289 vs 275 (clean week) | yes |
| 19–20 Jan | Bett | ExCeL | — | **UNVERIFIED today: dropped** | — | — |

- **Attribution** (`get_user_logs` 27–29 Oct; all reyhan@):
  - **P20:** 6–24 Nov −5%, min 3 (28 Oct 14:15Z; replaces the −10% on 13–24 Nov). 9–12 Nov −5%, min 2 (10:31Z). The log shows no change to 25–30 Nov (−10%) or 1–20 Dec (−5%).
    - Result: P20 13, 14, 17 and 19 Nov now price above the fortnight. 15–16 Nov is £1 short.
  - **P04:** 1–17 Nov −7% and 6–22 Dec −7%, min 3 (28 Oct 10:32Z), plus 18–20 / 23–25 Nov +15%, min 2 (27 Oct).
  - **P13:** 31 Oct – 12 Nov +2%; 17 Nov +35%, min 1; 27 Nov +50%, min 1 (28 Oct 10:30Z, both twins + Vrbo).
  - **P11:** 22–25 Nov, 29 Nov – 2 Dec, 8–9 Dec and 13–16 Dec changed to min stay 2 only, with no price override (28 Oct 10:29Z). 17–18 Dec stays at −2%.
  - **P12:** see 2a.
- **Reported as conflicts with standing decisions (not new proposals):**
  1. **P11 darts:** policy `listing_facts.P11.darts_override_24oct` says leave the +5% darts override. `get_listing_date_overrides` (29 Oct) shows **no price override on 13–16 Dec** (min 2 only, 28 Oct 10:29:53Z) and **−2% on 17 Dec**, so the +5% is still gone.
  2. **P12 17 Nov:** +50% replaced by −2% (see 2a).
  3. **P04:** policy `price_changes` 24 Oct says "Override −8% on 1–25 Nov … minimum stay … never open for fewer than 3". Now 1–17 Nov is −7%, and 18–20 / 23–25 Nov are **+15% with min stay 2**. That contradicts both the −8% and the 3-night rule.
  - Corentin to confirm all three.

## 4. Missed compression: open, verified-event nights at or below the fortnight (today)

| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 10, 11 Nov | Business Show | 263, 258 | 263 | 0, 5 |
| P20 | 15, 16 Nov | Muse / Noah Kahan | 261, 261 | 262 | 0, 0 (under £1) |
| P20 | 18 Nov | Vet Show | 258 | 264 | 6 |
| P20 | 24 Nov | London Build Expo eve | 264 | 272 | 8 |
| P20 | 16 Dec | The Darkness / Horse Show eve | 273 | 302 (clean week) | 29 |
| | | | | **P20: 7 nights** | **£48** (28 Oct: 15 / £208) |
| P04 | 8 Dec | Kehlani | 195 | 202 | 7 |
| P11 | 26 Nov | Nia Archives | 234 | 241 | 7 |
| P11 | 3 Jan | Darts final | 193 | 204 (clean week) | 11 |
| | | | | **Actionable: 10 nights** | **£73** |
| P04 | 10, 11 Nov | Business Show | 159, 159 | 174 | 16, 16 |
| P04 | 18, 19 Nov | Vet Show | 191, 193 | 203 | 12, 10 |
| P04 | 24 Nov | London Build Expo eve | 198 | 206 | 8 |
| | | | | **P04 Nov, information only: 5 nights** | **£62** |
| P11 | 13–17 Dec | Darts (override conflict, see §3) | 223, 200, 201, 212, 224 | 272 | 49, 72, 71, 60, 48 = **£300** (28 Oct: £316) |

- **Why the P04 November nights are information only:** they fall inside Corentin's 24 Oct "−8% on 1–25 Nov, no demand" decision (policy). Barking market occupancy is 25% / 20% next 30 / 60.

**Like-for-like with yesterday's list (P04 November included, P11 13–17 Dec excluded): 15 nights / £135, against 29 nights / £325 on 28 Oct.** The full script total is 20 nights / £435 (28 Oct: 34 / £641).
- **Dropped off:**
  - P20 13, 14, 17 and 19 Nov: now above the fortnight after the −10% → −5% change.
  - P20 25 and 30 Nov, 1–2 Dec: booked 25 Nov – 5 Dec.
  - P04 3 and 5 Nov: booked.
  - P04 and P20 Bett 19–20 Jan: event unverified today.
  - P04 16 Dec: 198 vs 198, now above by under £1.
  - P13 26 Nov: it sits inside the 18–27 Nov Booking.com stay (booked 27 Oct). Yesterday's list counted it as open in error.
- **New:** P20 10 Nov (£0) and P20 15–16 Nov (£0, rounding).
- **P11 darts 13–17 Dec:** £300 vs £316. Prices moved +£5 / +£2 / +£2 / +£1 / −£4 after the 13–16 Dec −2% was removed (28 Oct). They are still £19–26 a night under the PL default (244 / 219 / 219 / 232 / 250).

## 5. Dates to price above / below the PriceLabs default (summary)
- **Above our current price, to at least the default:**
  - P13 14–26 Dec (market occupancy +8 to +20 points vs STLY on 18–26 Dec; 24 Dec under P25).
  - P11 3 Jan (about £215; darts final).
  - P20 16 Dec (at least the £302 fortnight; default £319).
- **At the default (hold):** P11 23–25 Dec; P05 14–21 Dec; P20 19–27 Dec at today's level (already under the default).
- **Below the default:**
  - P20 28 Dec – 2 Jan (cap at about P90, −£600 over 6 nights).
  - P05 29 Dec (£1,370 → about £820–1,000; the +100% override needs confirming).
  - P12 17–20 Nov, Sat 28 Nov and 29 Nov – 3 Dec (median +5–8%). Hold P12 4–13 Dec where it is (already 10–13% under the default; market ahead of STLY).

Data gaps:
1. All market figures are PriceLabs Nearby Listings data (Airbnb-derived, not comp sets; cleaning inclusion unstated).
   - The P11 and P20 daily bands mix 1–3 BR, which understates a 2-bed; this is weak for Booking.com-only P11.
   - P01, P04 and P09 market.csv rows are 28 Oct; P08 and P14 are 27 Oct. They were not re-pulled.
2. The venue sites (theo2.co.uk, excel.london, alexandrapalace.com) do not resolve in this session; they have to be allowed in the session's network settings.
   - Today's event checks are domain-restricted WebSearch results (search-index summaries of those pages), not page reads.
   - WTM, Arsenal v Hull, England v Croatia, England Women v Ukraine, Harlequins 28 Dec and Bett are UNVERIFIED today.
   - Attendance is stated only for darts (180,000 tickets).
3. PriceLabs prices are from refreshes between 09:04Z and 14:20Z on 28 Oct.
   - PriceLabs still shows P12 4–7 Dec as booked and 21–25 Nov as open. I used Smoobu as the truth.
   - Changes after the refresh are not in these prices.
4. P12 cancellations: the cancellation date, rate plan (NR or flexible) and whether a stay was re-booked cheaper are NOT CHECKED (not in `reservations.csv`).
5. P20 25 Nov – 5 Dec: the price at the moment of booking (before or after reyhan's 14:15Z edit) and the Smoobu Airbnb pricing rules for P20 are NOT CHECKED. The ~25% gap beyond the weekly discount is unexplained.
6. P05 29 Dec: who set the +100% override (18 Oct 20:34Z) and why is NOT CHECKED. The override API does not return the user.
7. P20 overrides for 25 Nov – 20 Dec are taken from the logs; `get_listing_date_overrides` was not pulled for P20 today. P13 customizations are not pulled today.
8. Our £/night for 29 Dec onwards comes from neighbourhood `final_price` (P11, P13, P20, P05) and live `get_listing_prices` (P04), not from prices.csv.

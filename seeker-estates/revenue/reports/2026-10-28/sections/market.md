# Market & demand calendar: run D = 2026-10-28 (window 28 Oct 2026 – 26 Jan 2027)

## Sources and method
- **Policy:** I read `data/policy.json` first.
  - Excluded: P02, P03, P06 and P07 (intentional blocks). P14 numbers are reported only.
  - Handbacks: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
  - P13 is one flat (3064856 + 3090701). Nights blocked because the twin is booked count as booked.
  - Not raised: P04 2 Dec and P12 17 Nov (deprioritised).
- **Corrections used:** the Dispatcher's correction says `reservations.csv` `total_gbp` already excludes cleaning. Every paid £/night below is therefore room only.
- **Market data:** `get_neighbourhood_data` (detail mode, future prices + occupancy), pulled 28 Oct around 11:25Z for:
  - P11 3064196, P20 3547481, P05 3166592, P12 2699998 and P13 3064856.
  - Saved in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/m28/neigh_<id>.json`.
  - All of it is PriceLabs Nearby Listings data, Airbnb-derived. It is not a comp set, and whether cleaning is included is not stated.
  - The daily percentiles use each listing's own bedroom band: P11 and P20 use 1–3 BR, P05 uses 3–5 BR, P12 and P13 use 2–3 BR.
  - Column names: `market_price` (= P50), `market_25/75/90_percentile_prices`, `booked_50_percentile_price` (median of booked nights), `occupancy.daily.market_occupancy` / `market_occupancy_stly`, and `prices_with_default_customization` (the "PriceLabs default" in this section).
- **market.csv:** today's `data/snapshots/2026-10-28/market.csv` has:
  - P01, P04, P09, P12 and P20 from comp-east.
  - P11 from comp-central. My P11 row had identical numbers, so I removed it to avoid a duplicate.
  - P05 and P13, which I added (summary_table, same bedroom count).
- **Our prices:**
  - Up to 27 Dec: `data/snapshots/2026-10-28/prices.csv`, column `pricelabs_price`.
  - After 27 Dec: P11, P20 and P13 from neighbourhood `final_price` (28 Oct). P04 and P05 from live `get_listing_prices` (28 Oct).
  - Last refresh times: P11 27 Oct 11:58Z; P12 11:56Z; P13 11:59Z; P05 11:59Z; P04 12:02Z; P20 14:42Z.
  - **Sync gap:** P11 5–8 Dec is booked in Smoobu (Booking.com, £656.07, booked_on 27 Oct) but still open in PriceLabs. I count it as booked.
- **Fortnight method:** unchanged from 25–27 Oct (7 nights before + 7 nights after; blocked nights and nights above 2× the median excluded; clean-week rules for 16–20 Dec, 3 Jan, 16 Jan and Bett).
  - Script: `.../scratchpad/m28/analyse28.py`, with inputs in `live28.py`. Output: `.../m28/out28.txt`.
  - The only change to the event list is that **P11 11–12 Dec (darts opening) was added**, because those nights were booked until the cancellation.
- **Change attribution:**
  - `get_user_logs` (listing, 27–28 Oct): 24 entries, all reyhan@, 11:56–14:42Z on 27 Oct.
  - `get_listing_date_overrides` for P11 (25 Nov – 5 Jan) and P12 (18 Nov – 13 Dec).
  - `get_customizations` for P11.
- **Events re-verified 28 Oct 2026** (domain-restricted WebSearch of venue / organiser pages):
  - World Darts: Fri 11 Dec 2026 – Sun 3 Jan 2027. Opening session Fri 11 Dec at 19:00 GMT, Great Hall, "record 180,000 tickets". Sources: [alexandrapalace.com](https://www.alexandrapalace.com/whats-on/world-darts-championship-2026-2027/), [pdc.tv/wcfaq](https://www.pdc.tv/wcfaq).
    - A Christmas break of 24–27 Dec appears only in secondary sources (Sky Sports, Eventmasters): **UNVERIFIED** from a primary source.
  - England v New Zealand, Sat 21 Nov, 14:10, Allianz Stadium Twickenham ([allianzstadiumtwickenham.com](https://allianzstadiumtwickenham.com/england-v-new-zealand-nations-championship-pool-match)).
  - Nations Championship Finals Weekend, Fri 27 – Sun 29 Nov ([allianzstadiumtwickenham.com](https://allianzstadiumtwickenham.com/nations-championship-finals-weekend)).
  - London NYE fireworks, Thu 31 Dec 20:00 – 1 Jan 00:30, ticketed ([london.gov.uk](https://www.london.gov.uk/events/london-new-years-eve-2026)).
  - All other events are carried from the 24–27 Oct checks (sources in `reports/2026-10-27/sections/market.md` and `reports/2026-10-26/sections/market.md`). I did not re-check them today.

## 1. Submarket table (2026-10-28)

| Area | Ref | BR | Mkt occ 30/60 (`pl_kpis` 28 Oct) | P50 / P75 £ (`market.csv`) | Our occ 30/60 |
|---|---|---|---|---|---|
| Canary Wharf (HB 20 Dec) | P01 | 2 | 34 / 27% | 267 / 337 (28 Oct) | 100/100%* |
| Canary Wharf | P20 | 2 | 36 / 29% | 261 / 321 (28 Oct) | 30 / 15% |
| Barking | P04 | 2 | 25 / 20% | 178 / 225 (28 Oct) | 43 / 48% |
| Greenwich (HB 26 Nov) | P09 | 1 | 36 / 31% | 143 / 173 (28 Oct) | 73 / 87%* |
| Mile End (HB 13 Dec) | P12 | 2 | 39 / 33% | 210 / 251 (28 Oct) | 63 / 58% |
| Islington (HB 13 Nov) | P08 | 2 | 50 / 44% | 227 / 283 (26 Oct, not re-pulled) | 90 / 95%* |
| Camden | P11 | 2 | 43 / 38% | 302 / 352 (28 Oct) | **40 / 27%** (cancellation) |
| St John's Wood | P05 | 4 | 38 / 37% | 594 / 760 (28 Oct) | 80 / 65% |
| Primrose Hill (report only) | P14 | 1 | 40 / 37% | 204 / 256 (26 Oct) | 0 / 0% |
| Shepherd's Bush | P13 | 2 | 41 / 36% | 238 / 289 (28 Oct) | 40 / 33% |
| Hanger Lane (HB 18 Nov) | P10 | 1 | 30 / 24% | not pulled (0 sellable nights) | 100/100%* |

\* Inflated, because PriceLabs counts handback blocks as occupied.

## 2. Asked-for checks

### 2a. P11 Camden, 28 Nov – 12 Dec reopened (14 nights)
The 14-night Booking.com booking (£2,950.82, booked 16 Jul) is cancelled. 5–7 Dec has been re-sold (Booking.com, £656.07, 3 nights = £218.69/n), so **12 nights are open**.

| Night | Our £ | PL default £ | Mkt P25 / P50 / P75 | Booked median | Mkt occ / STLY % |
|---|---|---|---|---|---|
| Sat 28 Nov | 308 | 334 | 229 / 288 / 369 | 235 | 50 / 48 |
| Sun 29 | 225 | 244 | 213 / 260 / 343 | 214 | 34 / 31 |
| Mon 30 | 202 | 219 | 207 / 262 / 348 | 198 | 23 / 26 |
| Tue 1 Dec | 211 | 228 | 217 / 275 / 353 | 200 | 22 / 27 |
| Wed 2 | 231 | 250 | 223 / 279 / 361 | 218 | 26 / 27 |
| Thu 3 | 257 | 278 | 227 / 292 / 384 | 245 | 36 / 37 |
| Fri 4 | 312 | 338 | 244 / 315 / 393 | 245 | 49 / 48 |
| 5–7 Dec | booked | | | | |
| Tue 8 | 236 | 256 | 224 / 281 / 357 | 213 | 22 / 20 |
| Wed 9 | 225 | 243 | 227 / 283 / 351 | 218 | 22 / 21 |
| Thu 10 | 243 | 263 | 230 / 286 / 353 | 226 | 24 / 23 |
| Fri 11 (darts opens) | 299 | 324 | 238 / 292 / 364 | 234 | 36 / 27 |
| Sat 12 | 303 | 328 | 231 / 287 / 351 | 234 | 38 / 31 |
| **12-night avg** | **254** | **275** | 226 / **283** / 361 | **223** | 32 / 31 |

- **Our price against the market:** 10% under the band median and 14% over the booked median. Market occupancy is level with STLY. The band is 1–3 BR; the 2 BR-only P50 is £302 (`market.csv`), so the band median understates a 2-bed.
- **Every P11 night fell overnight** (prices.csv 27 → 28 Oct). Examples: 27 Nov 337 → 306, 12 Dec 360 → 303, 13–17 Dec down £37–42 a night, 23–25 Dec 348/351/346 → 321/315/316.
  - Only −2% of that is logged: reyhan set 18 Nov – 16 Dec to −2% and 17–18 Dec to −2% at 11:56Z on 27 Oct.
  - `uncustomized_price` also fell 7–13% (for example 12 Dec 377 → 328) with base unchanged at £286 (`listings.csv`). So most of the fall is the algorithm's own price, not customizations. **Cause NOT CHECKED.**
  - P11 still has the Aggressive occupancy profile and the default booking-recency factor (`get_customizations` 28 Oct). With next-60 occupancy at 27%, these can cut a further 5–20% inside 60 days.
- **Proposal:**
  - **11–12 Dec (darts opening, verified) and 28 Nov / 4 Dec weekend nights: price at the PriceLabs default or above.** That is £324 / £328 / £334 / £338, about 8% over the current £299–312. The market is 36–50% occupied on those nights, 1–9 points ahead of STLY on 11–12 Dec.
  - **Weekdays 29 Nov – 3 Dec and 8–10 Dec: hold the current price.** It is already at or just above the booked median, and market occupancy is only 22–36%.

### 2b. P12 Mile End, 22–28 Nov vs the market median
| Night | 22 | 23 | 24 | 25 | 26 | 27 | 28 | Total |
|---|---|---|---|---|---|---|---|---|
| Our £ (prices.csv) | 277 | 278 | 258 | 276 | 287 | 299 | 321 | **1,996** |
| PL default | 295 | 296 | 268 | 294 | 309 | 334 | 365 | 2,161 |
| Mkt P50 (2–3 BR) | 214 | 205 | 207 | 216 | 219 | 236 | 227 | **1,524** |
| Mkt P75 | 274 | 262 | 261 | 271 | 279 | 286 | 280 | 1,913 |
| Booked median | 166 | 174 | 170 | 170 | 173 | 189 | 190 | 1,232 |
| Plan a-p12-2228nov | 224 | 219 | 220 | 221 | 233 | 246 | 236 | 1,599 |

- **Our price against the market:**
  - We are **+31% over the median** and above P75 on every night except Tue 24 (258 vs 261).
  - Market occupancy is 26–38%, **6 points behind STLY** on average (31.6% vs 37.4%).
  - No verified event is near Mile End (P12 is not in the VENUES map).
- **The plan item is not done.** `get_listing_date_overrides` shows only min-stay-2 entries on 22 Nov – 13 Dec (reyhan, 26 Oct); there is no price override. Prices rose overnight (for example 26 Nov 269 → 287, 28 Nov 309 → 321).
- **Proposal:** price **below the PriceLabs default**. The plan values (£1,599 in total, median +3–8%) still fit the data. These are the last sellable P12 weeks before the 13 Dec handback.

### 2c. P13 Booking.com 18–27 Nov: paid £/night vs the market
- **The booking** (`reservations.csv`): 9 nights, room £1,143.76 = **£127.08 a night** (excluding cleaning, per the Dispatcher correction), commission £258.75. The PriceLabs list on 27 Oct summed to £1,739 (£193.2 a night), so paid is 0.658× the list.
- **Market, 18–26 Nov** (2–3 BR, 9-night average): P25 £198, **P50 £240**, P75 £295, booked median **£192**. Market occupancy is 28%, 11 points behind STLY (39%). That includes England v NZ on 21 Nov (verified), where market occupancy was 37–38%.
- **Verdict:**
  - Paid is **47% under the market median, 36% under P25 and 34% under the booked median.** Even after the policy's 15% weekly discount (median-equivalent £204), paid is 38% under.
  - **The list was not the problem:** £193 is level with the market's booked median (£192), though 21% under P50. The gap comes from the Booking.com stack.
- **What the stack explains** (policy figures):
  - Markup 1.15 × Weekly −15% × Last Minute −15% (0–30 days; check-in 22 days out) × Mobile −10% × Genius L1 −10% = **0.673 → £1,170 expected vs £1,144 paid**, leaving a 2.2% (£26) residual.
  - The residual matches no single listed promotion. NR / occupancy −5% would give 0.639 (£1,112), which is below paid. Black Friday 30% is not bookable until 19 Nov.
  - Rate plan and guest count: NOT CHECKED (extranet).
  - Commission is 22.6% of the room total, above the 15% standard. Whether the Visibility Booster (on for P13 check-ins 21 Oct – 20 Dec per policy) explains all of it is for the channel section to confirm.

### 2d. Christmas / New Year
| Ref | Status (Smoobu) | Open nights: our £ vs market | Proposal |
|---|---|---|---|
| **P20** Canary Wharf (1–3 BR band) | Fully open 20 Dec – 2 Jan | 20–26 Dec: 289–348 vs P50 247–272 / P75 314–359 (+17–34%). **27 Dec – 2 Jan: 474–620 vs P50 245–270, P75 319–382, P90 400–548**; booked median 195–215. Market occupancy is 30% vs STLY 20%. PriceLabs' insight says occupancy rises "12.9%" on 27 Dec – 1 Jan. | **Below the PriceLabs default on 28 Dec – 1 Jan.** Our 580–620 is above market **P90** (519–548) on every night, on a new listing with no reviews and 15% next-60 occupancy. Cap near P90 (about £520–550). Hold 20–26 Dec. |
| **P11** Camden | Booked 19–22 Dec and 26 Dec – 2 Jan. **Open 23–25 Dec** (+10% override since 15 Oct) | 321 / 315 / 316 vs P50 333 / 337 / 359; booked median 261–267; market occupancy 21–24%, behind STLY (24–27%) | **Hold.** Already above the default (306) and above the booked median. 23 Dec is level with the fortnight (321 vs 320). |
| **P05** St John's Wood (3–5 BR band) | Booked 22–28 Dec (£4,527.95, 7 n, £646.85/n) and 30 Dec – 3 Jan (£3,188.70, 5 n, £637.74/n). **29 Dec is an orphan night, min stay 1 at £1,385** (live `get_listing_prices`). Open 18–21 Dec at 649–689 | 29 Dec: P50 669, P75 847, booked median 505; uncustomized price 1,085; PL default 1,085. 18–21 Dec: +18–24% vs P50, under P75 | **29 Dec: below the PriceLabs default.** £1,385 is 2.07× P50 and 1.6× P75 for one night. Something lifts it above its own uncustomized price (likely an orphan or fixed override; NOT CHECKED). About P75 (£847) is defensible. Hold 18–21 Dec. |
| **P13** Shepherd's Bush (2–3 BR) | Booked 27 Dec – 2 Jan (Airbnb, room £1,766 / 7 = £252.29/n). **Open 18–26 Dec** | 9-night average: ours **237** vs P25 227 / **P50 279** / P75 351; booked median 249; PL default 266. **24–26 Dec 232 / 235 / 240 are under P25** (237 / 239 / 236). Market occupancy 39% vs STLY 25% (+15 points). | **Above our current price, at least to the PriceLabs default (£266 average, +12%).** reyhan set −3% on 23–26 Dec on 27 Oct (log 11:58Z, both twins + Vrbo); this runs against the market. |

- The P13 NYE booking is now £252.29/n room (cleaning excluded, per the correction), not £230.86 as reported yesterday. Against the 27 Dec – 2 Jan market median (now £301 average), that is 16% under. After the 15% weekly discount (median-equivalent £256), it is roughly in line.

## 3. Demand calendar: changes vs 27 Oct (today's prices; full event list as in `reports/2026-10-27/sections/market.md`)
"Fortnight" means the average of the surrounding 14 nights.

| Nights | Event (verified date) | Properties | Effect | Our £ vs fortnight £ (today) | Priced? |
|---|---|---|---|---|---|
| 2–5 Nov | J. Cole / WTM / Stevie Wonder | P20 | compression | **P20 booked 2–6 Nov** (Airbnb £733.62 room, £183.41/n) | n/a |
| 3, 5 Nov | Stevie Wonder, O2 | P04 | compression | 159 / 158 vs 160 | no (−£1/−£2) |
| 10–11 Nov | Business Show, ExCeL | P04 / P20 | compression | P04 160 / 161 vs 180 (**11 Nov was 208**); P20 271 / 272 vs 252 | P04 no; P20 yes |
| 13–17 Nov | Noah Kahan / Muse, O2 | P20 | compression | 237 / 243 / 237 / 236 / 227 vs 246–252 (were 257 / 266 / 255 / 246 / 251) | **no** |
| 18–19 Nov | London Vet Show, ExCeL | P04 / P20 | compression | P04 192 / 194 vs 208 (were 210 / 211); P20 236 / 243 vs 244 | no |
| 20–21 Nov | England v NZ (verified) | P13 | compression | 200 / 200 vs 196 | barely |
| 24–25 Nov | London Build Expo | P04 / P20 | compression | P04 198 vs 208 (was 216); P20 240 / 245 vs 255 | no |
| 26–29 Nov | Finals Weekend (verified) | P13 | compression | 26 Nov 197 vs 211 (was 224); 27 Nov 233 yes; 28–29 booked | 26 Nov no |
| 26–28 Nov | Ally Pally concerts | P11 | compression | 236 / 306 / 308 vs 241 | 26 Nov no |
| 30 Nov – 2 Dec | Mariah Carey / Phoebe Bridgers, O2 | P20 | compression | 241 / 256 / 272 vs 277–282 | **no** |
| 11–12 Dec | **Darts opens (verified)**, reopened nights | P11 | compression | 299 / 303 vs 246 | yes (+21–23%) |
| 13–17 Dec | Darts round one | P11 | compression | 218 / 198 / 199 / 211 / 228 vs 274 (were 260 / 235 / 236 / 250 / 269) | **no** |
| 16 Dec | O2 run / Horse Show eve | P20 / P04 | compression | P20 259 vs 289; P04 202 vs 203 | no |
| 31 Dec | NYE (verified) | P20 | compression | 620 vs 328 | yes (above P90; see 2d) |
| 3 Jan | Darts final | P11 | compression | 196 vs 204 (clean week) | no |
| 16 Jan / 19–20 Jan | aespa / Bett | P04, P20 | compression | aespa yes; Bett P04 182 / 184 vs 184, P20 274 / 272 vs 274 | Bett no (£0–2) |

- **Attribution** (`get_user_logs` 27 Oct, reyhan@):
  - **P20:** −10% on 13–30 Nov and 6–8 Nov, −5% on 1–20 Dec, all min stay 3 (14:42Z; these replace −5% / −2% set at 12:00Z), and +10% on 31 Oct – 1 Nov. These overrides cause every P20 Noah Kahan / Muse / Vet / Build / Mariah / Phoebe gap.
  - **P04:** 1–17 Nov −5%; 18–20 and 23–25 Nov **+15% (was +25%), min stay 2**; 6–22 Dec −5%.
  - **P04 min stay 2 on 18–20 and 23–25 Nov still conflicts with policy** `listing_facts.P04.min_stay_rule` (never under 3 nights).
  - **P11:** 18 Nov – 16 Dec −2%, min 3.
- **P11 darts override, reported because it conflicts with a standing decision; nothing new proposed:** policy `listing_facts.P11.darts_override_24oct` says Corentin decided on 24 Oct to "leave the darts override as it is (+5% set by Reyhan 23 Oct)". `get_listing_date_overrides` now shows **13–16 Dec at −2% and 17 Dec at −2%** (updated 27 Oct 11:56–11:56:58Z). The +5% override no longer exists. Corentin to confirm whether this was intended.

## 4. Missed compression: open, verified-event nights at or below the fortnight (today)

| Ref | Night(s) | Event | Our £ | Fortnight £ | Gap £ |
|---|---|---|---|---|---|
| P20 | 13, 14 Nov | Noah Kahan | 237, 243 | 252 | 15, 9 |
| P20 | 15, 16 Nov | Muse | 237, 236 | 250 | 13, 14 |
| P20 | 17 Nov | Noah Kahan | 227 | 246 | 19 |
| P20 | 18, 19 Nov | Vet Show | 236, 243 | 244 | 8, 1 |
| P20 | 24, 25 Nov | London Build | 240, 245 | 255 | 15, 10 |
| P20 | 30 Nov | Mariah Carey | 241 | 277 | 36 |
| P20 | 1, 2 Dec | Phoebe Bridgers | 256, 272 | 282 | 26, 10 |
| P20 | 16 Dec | O2 run / Horse Show eve | 259 | 289 (clean week) | 30 |
| P20 | 19, 20 Jan | Bett | 274, 272 | 274 | 0, 2 |
| | | | | **P20: 15 nights** | **£208** (27 Oct: 12 / £184) |
| P04 | 3, 5 Nov | Stevie Wonder | 159, 158 | 160 | 1, 2 |
| P04 | 10, 11 Nov | Business Show | 160, 161 | 180 | 20, 19 |
| P04 | 18, 19 Nov | Vet Show (+15%) | 192, 194 | 208 | 16, 14 |
| P04 | 24 Nov | London Build (+15%) | 198 | 208 | 10 |
| P04 | 8 Dec | Kehlani | 201 | 206 | 5 |
| P04 | 16 Dec | O2 / Horse Show eve | 202 | 203 | 1 |
| P04 | 19, 20 Jan | Bett | 182, 184 | 184 | 2, 0 |
| | | | | **P04: 11 nights** | **£90** (8 / £47) |
| P11 | 26 Nov | Ally Pally (Nia Archives) | 236 | 241 | 5 |
| P11 | 3 Jan | Darts final | 196 | 204 (clean week) | 8 |
| P13 | 26 Nov | Finals Weekend eve | 197 | 211 | 14 |
| | | | | **Actionable total** | **29 nights / £325** (27 Oct: 23 / £239) |
| P11 | 13–17 Dec | Darts round one (override overwritten; see §3) | 218, 198, 199, 211, 228 | 274 | 56, 76, 75, 63, 46 = **£316** (27 Oct: £305) |

**Script total: 34 nights / £641** (27 Oct: 28 / £544).
- **Dropped off:** P20 5 and 10 Nov (booked / now above), P13 8 Nov, P11 23 Dec (321 vs 320).
- **New:** P20 13–14 and 19 Nov; P04 11, 18–19 and 24 Nov (overrides cut); P11 26 Nov; P13 26 Nov (224 → 197).
- **Biggest:** P20 30 Nov – 2 Dec (£72) and the P11 darts block (£316).

Data gaps:
1. All market figures are PriceLabs Nearby Listings data (Airbnb-derived, not comp sets; cleaning inclusion unstated).
   - The P11 and P20 daily bands mix 1–3 BR, so their medians understate a 2-bed.
   - This is a weak benchmark for Booking.com-only P11.
   - The 28 Oct P50/P75 for P08 and P14 were not re-pulled (26 Oct values used).
2. The cause of the 7–13% fall in P11's `uncustomized_price` overnight (base unchanged) is NOT CHECKED. Customizations were checked only on P11 today; P20, P05 and P13 seasonality / demand factor (plan item a-peak-check) are NOT CHECKED today.
3. P05 29 Dec: the source of the £1,385 (above the uncustomized £1,085) is NOT CHECKED. I pulled no P05 overrides.
4. P13 18–27 Nov: the Booking.com rate plan, guest count and promotion breakdown are NOT CHECKED. There is a £26 residual beyond the policy stack, and the 22.6% commission needs Booster confirmation (channel section).
5. Sync: PriceLabs still shows P11 5–7 Dec open against the confirmed Smoobu booking (refresh 27 Oct 11:58Z). All listings were last refreshed 27 Oct, so later changes are not in the prices used.
6. Events:
   - Re-verified today: darts (opening 11 Dec 19:00), England v NZ, Finals Weekend and NYE.
   - The darts Christmas break (24–27 Dec) is UNVERIFIED (secondary sources only).
   - Every O2, ExCeL and Ally Pally concert date is carried from 24–27 Oct.
   - Attendance is stated only for darts (180,000 tickets).
7. My five `get_neighbourhood_data` pulls were sent in parallel against the one-call-at-a-time rule. All returned 200; no data issue, but this is noted.

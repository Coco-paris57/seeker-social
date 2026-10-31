# Competitor positioning: WEST + HERTS (D = 2026-10-31)

**Sources.** I read `data/policy.json` first. Read-only, one call at a time:
- PriceLabs `get_user_logs` (listing, 3064856 + 3090701, 29-31 Oct).
- PriceLabs `get_listing_date_overrides` 3064856 (31 Oct-3 Jan).
- Airbnb public search pages: plain `curl` to airbnb.co.uk with default headers. No block or bot check was met. Booking.com was not loaded.

Other inputs:
- **Our prices:** `data/snapshots/2026-10-31/raw/prices_3064856.json` and `prices_3090701.json`, last refreshed 30 Oct 22:10Z. I used the pushed `user_price`.
- **Smoobu `/rates`:** not pulled today.
- **Occupancy:** `reports/2026-10-31/kpi_pack.json`. P13 is booked 65.5% vs a market of 41% over 30 days (+24.5 pts), and 47.5% vs 36% over 60 days (+11.5 pts).
- **Market:**
  - The 2 BR summary comes from `raw/neighbourhood_P13.json` 31 Oct: **P25 188 / P50 225 / P75 281 / P90 344**, n=117. Yesterday it was 191 / 226 / 282 / 348.
  - Daily market percentiles come from the market agent's PriceLabs `future_prices` pull for 3064856 on 31 Oct ~07:21Z (`scratchpad/m31/neigh_3064856.json`). This replaces the 28 Oct pull I used yesterday.

**Method.**
- **Comp set:** the same 11 Airbnb comp ids as 26-30 Oct. None were replaced, and **all 11 are active** (each one was returned on at least one stay today).
- **Searches:** 4 guests, entire home, at least 2 bedrooms. Each stay used a 1.3 km box around P13, plus a 0.2 km box around each comp.
- **Price basis:** the Airbnb all-in total ÷ nights, with cleaning and fees included. No taxes are shown separately. The same basis is used for us and for the comps.
- **Stays priced (P13's open dates):**
  - 1-3 Nov (nearest open)
  - 8-10 Nov
  - Midweek 10-12 Nov
  - Singles 17 Nov, 27 Nov and 1 Dec
  - 11-13 Dec, 18-20 Dec, 23-26 Dec
  - The full Christmas window 18-26 Dec (8 nights)
- **Dates we are booked on, used as activity and trend checks:** 24-26 Nov, and 30 Nov-2 Dec (D+30).
- The default "next Fri-Sun" (6-8 Nov) is booked or linked-blocked for us (3090701 check-in 4 Nov).
- **Rows appended to `data/snapshots/2026-10-31/`**, under `flock` with the side-locks `.comps.csv.lock` and `.channel_checks.csv.lock`. Both files were empty, so I first copied the 30 Oct file forward.
  - `comps.csv`: **132 rows** (11 comps × 12 stays)
  - `channel_checks.csv`: 20 rows (our two listings)
  - Filter on "checked 2026-10-31" in `source`.
- **Recompute check:** `comp_summary` on today's 10-12 Nov rows gives n=6, median 217.5, P50 / 0.0% for 3090701 and -11.5% for 3064856. This matches the tables below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
All prices are Airbnb all-in £/night including cleaning, checked 2026-10-31, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay). Ratings and review counts are from today's search cards. Cancellation policy was NOT CHECKED.

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 1-3 Nov | 8-10 Nov | 10-12 Nov | 17 Nov | 24-26 Nov* | 27 Nov | 30 Nov-2 Dec* | 1 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | garden view, balcony | 230 |  | 275 |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite |  | 207 |  |  | 244 |  |  |  |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath |  | 218 | 218 |  | 240 |  | 243 |  |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | private garden | 206 | 208 | 210.5 |  | 237.5 |  | 244.5 |  | 275 | 266.5 | 229 | 198.12 (weekly) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | 169.5 | 196.5 | 206 |  |  |  | 301 |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | 147.5 |  |  | 200 | 167.5 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed |  |  |  |  | 237 |  | 233.5 |  | 283 | 272.5 | 245 | 189.0 (weekly) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath | 411 | 411 | 411 |  |  |  |  |  |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking |  | 217 | 217 |  | 217 |  | 259 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite |  |  |  |  | 349.5 | 394 | 340.5 | 376 |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | 145 |  |  | 200 | 167.5 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | **4.78 (13)** | | **187.75 (6)** | **212.5 (6)** | **217.5 (6)** | 200 (2) | **237.25 (8)** | 394 (1) | **251.75 (6)** | 376 (1) | 279 (2) | **302 (4)** | 237 (2) | 193.56 (2) |
| Wider 2-bed sample median (n) | | | | | 225.5 (22) | 239 (21) | 260.25 (22) | 200 (5) | 246.25 (26) | 344.5 (4) | 262 (20) | 376 (1) | 357.25 (18) | 302 (13) | 310.84 (24) | 292 (21) |
| **Ours 1587576514709814818** (3090701) 4.67 (9) | | 6 | | terrace | **208.5** | **214.5** | **217.5** | **340** | booked | **385** | booked | **380** | **295.5** | **290** | **258.33** | **197.12** (weekly, strike £1,829) |
| **Ours 1571600691689064213** (3064856) 4.31 (13) | | 6 | | terrace, skyline view | **185** | **190** | **192.5** | **359** | booked | **409** | booked | **380** | **295.5** | **290** | **258.33** | **197.12** (weekly, strike £1,829) |

\* Activity and trend checks on dates where we are booked.

The wider sample is every 2-bedroom entire home with at least 10 reviews within 1.45 km. It comes from search cards, is not vetted, and is context only (ids in `scratchpad/west31/dl/wide.json`).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- The comp median is **4.78** with **13** reviews (all 11 comps).
- 3090701: **4.67 (9)**, which is -0.11 against the comp median and 4 reviews behind.
- 3064856: **4.31 (13)**, which is -0.47 against the median and level on reviews.
- Neither listing has Superhost, Guest favourite or a listed lift. Airbnb puts 3064856 in its bottom 10% quality bucket (policy `airbnb_listings_24oct`).

**`quality_premium`:** 3090701 **-0.044**; 3064856 **-0.15** (capped).

**`recommend`:**
- It uses `kpi_pack` occupancy: the 30-day figures for stays under 30 days out, and the 60-day figures for stays 30 or more days out.
- The 60-day lead is now **+11.5 pts**, up from +9.8 yesterday. That crosses the `recommend` threshold of 10 points, so December stays below P75 now return **raise +10%** (yesterday it was +5%).
- Where the comp set has fewer than 3 prices, I place our PriceLabs pushed nightly price against the 31 Oct daily market P25/P50/P75 for the same nights (interpolated). These rows are labelled "mkt".

| Stay | Listing | Ours | Comp median (n) | Comp pctl | vs median | Wider pctl | PL nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 1-3 Nov | 3090701 | 208.5 | 187.75 (6) | P67 | **+11.1%** | P45 | 178 vs 203.5 (-12.5%, ~P35) | raise +10% |
| | 3064856 | 185.0 | 187.75 (6) | P50 | **-1.5%** | P27 | 146.5 vs 203.5 (-28%, ~P23) | raise +10% |
| 8-10 Nov | 3090701 | 214.5 | 212.5 (6) | P50 | **+0.9%** | P29 | 188 vs 204.5 (-8%, ~P39) | raise +10% |
| | 3064856 | 190.0 | 212.5 (6) | P0 | **-10.6%** | P10 | 154.5 vs 204.5 (-24%, ~P23) | raise +10% |
| 10-12 Nov | 3090701 | 217.5 | 217.5 (6) | P50 | **0.0%** | P23 | 193 vs 208 (-7%, ~P41) | raise +10% |
| | 3064856 | 192.5 | 217.5 (6) | P0 | **-11.5%** | P5 | 159 vs 208 (-24%, ~P24) | raise +10% |
| 17 Nov (single) | 3090701 | 340 | 200 (2) | P100 | +70% (n=2) | P100 (n=5) | 249 vs 210 (+19%, ~P65) | mkt: raise +10% (see note) |
| | 3064856 | 359 | 200 (2) | P100 | +80% (n=2) | P100 | 274 vs 210 (+30%, ~P74) | mkt: raise +10% (see note) |
| 27 Nov (single) | 3090701 | 385 | 394 (1) | P0 | -2.3% (n=1) | P75 (n=4) | 308 vs 241 (+28%, above P75 303) | mkt: raise +5% (see note) |
| | 3064856 | 409 | 394 (1) | P100 | +3.8% (n=1) | P100 | 338 vs 241 (+40%, above P75) | mkt: raise +5% (see note) |
| 1 Dec (single) | both | 380 | 376 (1) | P100 | +1.1% (n=1) | n=1 | 255 vs 227 (+12%, ~P60) | intentional (policy `intentional_overrides`), no proposal |
| 11-13 Dec | both | 295.5 | 279 (2) | P100 | +5.9% (n=2) | P33 | 244.5 vs 242 (+1%, ~P51) | mkt: raise +10% |
| 18-20 Dec | both | 290 | 302 (4) | P50 | **-4.0%** | P38 | 238.5 vs 254.5 (-6%, ~P41) | raise +10% |
| 23-26 Dec | both | 258.33 | 237 (2) | P100 | +9.0% (n=2) | **P17** | 230.7 vs 274.7 (-16%, ~P30) | mkt: raise +10% |
| 18-26 Dec (8n) | both | 197.12 | 193.56 (2) | P50 | +1.8% (n=2) | **P5** | 232.4 vs 264.5 (-12%, ~P35) | mkt: raise +10% |

**Supported positioning (one line each):**
- **3090701: -4% vs the comp median** (quality -0.044: 4.67 vs 4.78, 9 vs 13 reviews).
  - Today it sits at 0% to +1% on 8-12 Nov (P50), +11% on 1-3 Nov and -4% on 18-20 Dec.
  - It is above its quality level in November but below market P50 on every multi-night stay.
  - `recommend` says raise +10% because the flat is booked +24.5 pts ahead of the market. That is demand-led, not quality-led.
- **3064856: -15% vs the comp median** (quality capped at -0.15: 4.31 vs 4.78).
  - It is at -10.6% / -11.5% on 8-12 Nov, -1.5% on 1-3 Nov and -4% on 18-20 Dec, so it is already above its quality floor.
  - The +10% from `recommend` is demand-led.
  - At P0 of the comps on 8-12 Nov, it is the cheapest 2-bed in the set.

### What changed since 30 Oct
**1. Reyhan removed the +2% on 1-12 Nov** (30 Oct 22:08Z):
- `get_user_logs` shows Reyhan re-saved 31 Oct (-1%, min 3), 1-3 Nov and 4-12 Nov on 3064856, and these were copied to 3090701. `get_listing_date_overrides` now shows **no price** on 1-12 Nov, only min 2.
- This puts the dates back at the 0% Corentin set on 24 Oct (policy `price_changes`), so it is **not a conflict**.
- PriceLabs 3064856 fell: 10 Nov 162 → 158 and 1 Nov 149 → 147 (`user_price`, raw 30 Oct vs 31 Oct).
- On Airbnb, 3064856 went from 197.0 to **192.5** on 10-12 Nov, and from 193.5 to 190.0 on 8-10 Nov.
- a-raise-1012nov is therefore **not done**, and further from done than yesterday. The comp and market evidence still says the dates are under-priced: 3064856 is at P0 of the comps and about P24 of the market, with the flat booked +24.5 pts ahead.

**2. The Airbnb "Special offer" on 3090701 for 8-12 Nov is gone:**
- Today: 8-10 Nov £428.45 and 10-12 Nov £434.57, with no strikethrough. Yesterday: £436 with a strike from £515.40, and £429.39 with a strike from £508.20.
- Room ÷ PriceLabs pushed price is now 0.742 / 0.738, the same as 3064856 (0.744 / 0.739).
- Yesterday's "unexplained gap" (gap 4) has resolved itself. Who removed the offer was NOT CHECKED.

**3. PriceLabs 3090701 now equals 3064856 from 1 Dec:**
- 11 Dec 245 / 245, 23 Dec 236 / 236. Yesterday 3090701 was about 13 lower (231 / 223).
- Smoobu already held the 3064856 rates (30 Oct `/rates`), so PriceLabs and Smoobu should now agree, and both Airbnb listings still show identical December prices.
- The cause was NOT CHECKED: the logs show no December change on either listing. Twin price order is deprioritised (policy `deprioritised.p13_twin_price_order`), so this is information only.

**4. The comps are flat:**
- Like-for-like medians are unchanged on 8-10 Nov (212.5), 10-12 Nov (217.5), 24-26 Nov (237 → 237.25), 27 Nov (394) and 1 Dec (376).
- December moved 0.3-0.7% lower: 11-13 Dec 279.75 → 279.0, 18-20 Dec 303.75 → 302.0, 23-26 Dec 238.17 → 237.0, 18-26 Dec 194.88 → 193.56.
- 1411449348357673454 cut its price by 4% on 8-12 Nov. 1761224847419174970 went from 285 to 275 on 10-12 Nov.

### Focus: singles 17 Nov, 27 Nov (a-p13-orphan-price) and 1 Dec
The overrides are **unchanged**:
- 17 Nov: +35%, min 1
- 27 Nov: +50%, min 1
- Both were set by Reyhan on 28 Oct 10:30Z.
- 1 Dec: +50%, min 1. This one is intentional per policy, so I make no proposal.

**17 Nov:**
- Only 2 comps sell this single night today: 1201539290247676065 and 1598588327559113265, both £200 and sleeping 7.
- We are £340 / £359, i.e. +70% / +80% and P100 of the wider sample (n=5, median 200).
- On the market, our PriceLabs nightly price is ~P65 / ~P74 (P50 210; market occupancy 28.2%).
- The quality-supported level is market P50 × (1 + q): about £201 for 3090701 and £179 for 3064856. The current 249 / 274 is well above that.

**27 Nov (27 days out):**
- We are -2.3% / +3.8% against the only comp returned (1205241472054931937: 5.0, Guest favourite, lift, balcony; £394).
- Against the market we are +28% / +40% (above P75; market occupancy 44.6%).

**Status:** still Reyhan's premiums above the evidence. This stays a **conflict for Corentin to confirm**, not a new proposal. **Not fixed.**

### Focus: Christmas 18-26 Dec (a-peak-check, P13 part)
**The overrides are unchanged:**
- 18-20 Dec: -2%
- 21-26 Dec: -3%, min 3
- 27 Dec: min 7

27 Dec is linked-blocked because it is booked on 3090701. So **min 3 on 24-26 Dec still blocks arrivals that cannot fit before 27 Dec**. Not fixed.

**On Airbnb:**
- 23-26 Dec: £258.33, which is +9% vs the 2 comps but **P17 of the wider sample** (median 310.84, n=24).
- 18-26 Dec (8 nights, after the policy weekly 15%): £197.12, against the comps at 189-198 (n=2) and the wider sample at 292 (n=21), i.e. **P5**.

**On the market:** PriceLabs pushed prices are at -16% / -12% vs market P50 (~P30 / ~P35).

**Quality-supported level** (market P50 × (1 + q)) for 23-26 Dec:
- about £263 for 3090701
- about £233 for 3064856, so 3064856 is at its quality level

`recommend` (60-day lead +11.5 pts) says **raise +10%**. For 3064856 that rests on demand alone.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights: `prices.csv` 31 Oct shows 1-18 Nov all Booked, then Blocked from 19 Nov (policy `handbacks`, last night 18 Nov). It is booked 100% vs a market of 28% (`kpi_pack`).

No comps, percentile, rating or supported premium: there is nothing to price.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 31 Oct: no PriceLabs data, no prices), so we have no price of our own.

Price percentile, rating, review gap and supported premium are **NOT CHECKED**, and no comps were built.

## Data gaps:
1. **Booking.com comps were NOT CHECKED**; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. **December and single-night comp coverage is thin:** n=2 on 17 Nov, 11-13 Dec, 23-26 Dec and 18-26 Dec, and n=1 on 27 Nov and 1 Dec. Those rows use market percentiles and the wider sample, labelled as such.
3. **Smoobu `/rates` was not pulled today.** The Airbnb ratios are against the PriceLabs pushed `user_price` (refreshed 30 Oct 22:10Z), not the Smoobu rate.
4. **Why PriceLabs 3090701 matches 3064856 from 1 Dec** was NOT CHECKED: there is no log entry on either listing. Who removed the 3090701 Airbnb Special offer was also NOT CHECKED.
5. **The Airbnb ratios assume £150 cleaning** and no extra-guest fee at 4 guests.
6. **The mapping of Airbnb ids to Smoobu ids is "likely / probable"** (policy `airbnb_listings_24oct`). It is consistent with today's prices.
7. **P16, P18 and P19 have no data.** P10 has no sellable nights.

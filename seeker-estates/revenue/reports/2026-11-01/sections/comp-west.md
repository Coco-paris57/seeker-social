# Competitor positioning: WEST + HERTS (D = 2026-11-01)

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only and made one at a time:
- `get_user_logs` (listing, 3064856 + 3090701, 30 Oct-1 Nov)
- `get_listing_date_overrides` 3064856 (1 Nov-3 Jan)

Other inputs:
- **Airbnb public search pages:** plain `curl` to airbnb.co.uk with default headers. No block or bot check was met. Booking.com was not loaded.
- **Our prices:** `data/snapshots/2026-11-01/raw/prices_3064856.json` and `prices_3090701.json` (pushed `user_price`, refreshed 31 Oct 22:08Z).
- **Occupancy:** `reports/2026-11-01/kpi_pack.json`. P13 is booked 69% vs a market of 41% over the next 30 days (+28 pts), and 49.2% vs 37% over 60 days (+12.2 pts).
- **Market, 2-bed summary:** `raw/neighbourhood_P13.json` (1 Nov): P25 189 / P50 224 / P75 280 / P90 345, n=117. Yesterday it was 188 / 225 / 281 / 344.
- **Market, daily percentiles:** these are the **31 Oct** PriceLabs `future_prices` pull for 3064856 (`scratchpad/m31/neigh_3064856.json`). There was no 1 Nov daily pull when I ran, so the "mkt" columns are one day old.

**Method.**
- **Comp set:** the same 11 Airbnb comp ids as 26-31 Oct. None were replaced. **All 11 are active**: each one was returned on at least one stay today.
- **Search settings:** 4 guests, entire home, at least 2 bedrooms. Each stay used a 1.3 km box around P13 plus a 0.2 km box around each comp.
- **Price basis:** the Airbnb all-in total ÷ nights, with cleaning (£150) and fees included and no taxes shown separately. Comps and our listings use the same basis.
- **Stays priced (P13's open dates):**
  - 2-4 Nov (nearest open)
  - 8-10 Nov and 10-12 Nov
  - **11-13 Nov** (includes 12 Nov, England v Croatia at Wembley)
  - **8-13 Nov** (the whole 5-night window)
  - Singles 17 Nov, 27 Nov and 1 Dec
  - 11-13 Dec, 18-20 Dec, 23-26 Dec
  - **18-26 Dec** (8 nights)
- **Default Fri-Sun, 6-8 Nov:** we are booked or linked-blocked on these nights, so this stay is only an activity check on the comps.
- **Rows appended to `data/snapshots/2026-11-01/`**, under `flock` with the side-locks `.comps.csv.lock` and `.channel_checks.csv.lock`:
  - `comps.csv` did not exist, so I copied the 31 Oct file forward first (1,737 rows), then added **143 rows** (11 comps × 13 stays).
  - `channel_checks.csv`: added 24 rows for our two listings.
  - Filter on "checked 2026-11-01" plus "comp-west" in `source`.
- **Recompute check:** `snapshot.load('2026-11-01')` followed by `comp_summary` on the 11-13 Nov rows gives n=8, median 216.0, P38 / -2.5% (3090701) and P25 / -13.4% (3064856). This matches the tables below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
- All prices are Airbnb all-in £/night including cleaning, checked 2026-11-01, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay).
- Ratings and review counts come from today's search cards. Cancellation policy was NOT CHECKED.
- The 8-13 Nov and 18-26 Dec figures are after length-of-stay discounts (comps and ours alike).

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 2-4 Nov | 6-8 Nov* | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov (5n) | 17 Nov | 27 Nov | 1 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | garden view, balcony | 230 | | | 266 | | | | | | | | | |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | | | 207 | | 207 | | | | | | | | |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | | | 218 | 218 | 218 | 186.8 | | | | | | | |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | **4.27 (11)** (was 4.2 (10)) | private garden | | | 208 | 210.5 | 215.5 | 166.0 | | | | 276.5 | 269 | 231.33 | 200.5 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | 169 | 245.5 | 196.5 | 206 | 216.5 | 172.6 | | | | | | | |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | | | | | 167.5 | | 200 | | | | | | |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | | | | | | | | | | 280.5 | 267 | 242 | 183.25 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath | 411 | 425.5 | 411 | 411 | 411 | 385.2 | | | | | 450 | | |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking | | | 217 | 217 | 217 | 199.0 | | | | | | | |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite | | | | | | | | 394 | 376 | | 331.5 | | |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | | | | | 167.5 | | 200 | | | | | | |
| **Comp median (n)** | | | **4.78 (13)** | | 230 (3) | 335.5 (2) | **212.5 (6)** | **217.5 (6)** | **216 (8)** | **186.8 (5)** | 200 (2) | 394 (1) | 376 (1) | 278.5 (2) | **300.25 (4)** | 236.67 (2) | 191.88 (2) |
| Wider 2-bed sample median (n) | | | | | 235.75 (18) | 286.75 (12) | 238.25 (24) | 251.5 (23) | 245.5 (27) | 233.8 (31) | 200 (5) | 344.5 (4) | 376 (1) | 364 (17) | 303 (15) | 310.67 (25) | 292 (21) |
| **Ours 1587576514709814818** (3090701) 4.67 (9) | | 6 | | terrace | **203** | booked | **207** | **209.5** | **210.5** | **171.6** (strike £937 → £858) | **320** | **361** | **381** | **289.5** | **286.5** | **257** | **195.38** (strike £1,813 → £1,563) |
| **Ours 1571600691689064213** (3064856) 4.31 (13) | | 6 | | terrace, skyline view | **180** | booked | **184.5** | **186** | **187** | **147.0** (strike £799 → £735) | **358** | **408** | **381** | **289.5** | **286.5** | **257** | **195.38** (strike £1,813 → £1,563) |

\* Activity check only: we are booked on 6-8 Nov.

The wider sample is every 2-bedroom entire home with at least 10 reviews within 1.45 km. It comes from search cards, is not vetted, and is context only (ids in `scratchpad/west01/dl/wide.json`).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- The comp median is **4.78** with **13** reviews (all 11 comps).
- 3090701: **4.67 (9)**, which is -0.11 against the median and 4 reviews behind.
- 3064856: **4.31 (13)**, which is -0.47 against the median and level on reviews.
- Neither listing has Superhost, Guest favourite or a listed lift. Airbnb puts 3064856 in its bottom 10% quality bucket (policy `airbnb_listings_24oct`).

**`quality_premium`:** 3090701 **-0.044**; 3064856 **-0.15** (capped).

**`recommend` inputs:**
- I use the 30-day occupancy figures for stays under 30 days out, and the 60-day figures for stays 30 or more days out.
- The 30-day lead is +28 pts and the 60-day lead is +12.2 pts. Both clear the 10-point threshold.
- Where the comp set gives fewer than 3 prices, the "mkt" column places our PriceLabs nightly price against the 31 Oct daily market P25/P50/P75 for the same nights (interpolated).

| Stay | Listing | Ours | Comp median (n) | Comp pctl | vs median | Wider pctl | PL nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 2-4 Nov | 3090701 | 203.0 | 230 (3) | P33 | -11.7% | P33 | 170 vs 206.5 (-18%, ~P27) | raise +10% |
| | 3064856 | 180.0 | 230 (3) | P33 | -21.7% | P22 | 139.5 vs 206.5 (-32%, ~P21) | raise +10% |
| 8-10 Nov | 3090701 | 207.0 | 212.5 (6) | P17 | **-2.6%** | P17 | 176.5 vs 204.5 (-14%, ~P31) | raise +10% |
| | 3064856 | 184.5 | 212.5 (6) | P0 | **-13.2%** | P4 | 145.5 vs 204.5 (-29%, ~P22) | raise +10% |
| 10-12 Nov | 3090701 | 209.5 | 217.5 (6) | P17 | **-3.7%** | P9 | 179.5 vs 208 (-14%, ~P33) | raise +10% |
| | 3064856 | 186.0 | 217.5 (6) | P0 | **-14.5%** | P4 | 148 vs 208 (-29%, ~P22) | raise +10% |
| **11-13 Nov (12 Nov match)** | 3090701 | 210.5 | 216 (8) | P38 | **-2.5%** | P22 | 181 vs 211 (-14%, ~P31) | raise +10% |
| | 3064856 | 187.0 | 216 (8) | P25 | **-13.4%** | P19 | 149.5 vs 211 (-29%, ~P22) | raise +10% |
| 8-13 Nov (5n) | 3090701 | 171.6 | 186.8 (5) | P20 | -8.1% | P6 | 178.8 vs 207.8 (-14%, ~P31) | raise +10% |
| | 3064856 | 147.0 | 186.8 (5) | P0 | -21.3% | P3 | 147.4 vs 207.8 (-29%, ~P22) | raise +10% |
| 17 Nov (single) | 3090701 | 320 | 200 (2) | P100 | +60% (n=2) | P80 (n=5) | 213 vs 210 (+1%, ~P51) | mkt: raise +10% |
| | 3064856 | 358 | 200 (2) | P100 | +79% (n=2) | P100 | 260 vs 210 (+24%, ~P69) | mkt: raise +10% |
| 27 Nov (single) | 3090701 | 361 | 394 (1) | P0 | -8.4% (n=1) | P75 (n=4) | 275 vs 241 (+14%, ~P64) | mkt: raise +10% |
| | 3064856 | 408 | 394 (1) | P100 | +3.6% (n=1) | P100 | 336 vs 241 (+39%, above P75 303) | mkt: raise +5% |
| 1 Dec (single) | both | 381 | 376 (1) | P100 | +1.3% (n=1) | n=1 | 255 vs 227 (+12%, ~P60) | intentional (policy `intentional_overrides`), no proposal |
| 11-13 Dec | both | 289.5 | 278.5 (2) | P100 | +3.9% (n=2) | P35 | 241 vs 242 (0%, ~P49) | mkt: raise +10% |
| 18-20 Dec | both | 286.5 | 300.25 (4) | P50 | **-4.6%** | P33 | 238.5 vs 254.5 (-6%, ~P41) | raise +10% |
| 23-26 Dec | both | 257.0 | 236.67 (2) | P100 | +8.6% (n=2) | **P16** | 231 vs 274.7 (-16%, ~P30) | mkt: raise +10% |
| 18-26 Dec (8n) | both | 195.38 | 191.88 (2) | P50 | +1.8% (n=2) | **P5** | 233.2 vs 264.5 (-12%, ~P35) | mkt: raise +10% |

**Supported positioning (one line each):**
- **3090701: -4% vs the comp median** (quality -0.044: 4.67 vs 4.78, and 9 vs 13 reviews).
  - Today it is at -2.5% to -3.7% on the November 2-night stays (P17-P38). That is now level with its quality line; yesterday it was 0% to +1%.
  - It is below market P50 on every multi-night stay.
  - `recommend` says raise +10%. This is driven by demand (the flat is booked +28 pts ahead), not by quality.
- **3064856: -15% vs the comp median** (quality capped at -0.15: 4.31 vs 4.78).
  - Today it is at -13% to -15% on 8-13 Nov, which is P0-P25 of the comps and the cheapest or second-cheapest 2-bed in the set.
  - It has reached its quality floor. Any rise from here rests on demand (+28 pts) alone.

### What changed since 31 Oct
**1. Reyhan cut P13 again on 31 Oct** (`get_user_logs`, copied to 3090701 as child):
- 14:30Z: -3% on 31 Oct, 1-3 Nov and 4-12 Nov; -4% on 7-20 Dec.
- **22:07Z: -5% on 1-3 Nov, 8-12 Nov and 7-20 Dec** (min 2). `get_listing_date_overrides` confirms -5% on those dates and -3% on 4-7 Nov.
- Effect on PriceLabs `user_price`, raw 31 Oct vs 1 Nov:

| Nights | 3064856 | 3090701 |
|---|---|---|
| 8-12 Nov | 790 → **737** (-6.7%) | 960 → **894** (-6.9%) |
| 2-3 Nov | 293 → 279 | 356 → 340 |
| 7-20 Dec | 3,187 → 3,139 (-1.5%) | 3,187 → 3,139 (-1.5%) |

- On Airbnb, 3090701 fell 214.5 → 207 on 8-10 Nov and 217.5 → 209.5 on 10-12 Nov; 3064856 fell 190 → 184.5 and 192.5 → 186. Comp medians did not move (212.5 / 217.5).
- **This is a conflict for Corentin to confirm.** Policy `price_changes` 24 Oct sets 31 Oct-3 Nov and 8-12 Nov to **0%**. The -5% contradicts that decision, and the comp and market evidence points the other way (P0-P38, +28 pts ahead).
- **a-raise-1012nov (12 Nov, Wembley): not done, and further away than yesterday.**
  - 12 Nov market P50 is 214, against 208 on 11 Nov; market occupancy is 35.4% vs 28.1% (31 Oct pull). So there is a mild uplift on the night.
  - The comps show no event premium: the 11-13 Nov median is 216, vs 217.5 on 10-12 Nov.
  - 3064856 is priced at £150 on 12 Nov in PriceLabs, below market P25 (178). The uncustomized price is 170.

**2. PriceLabs moved the 3090701 singles down with no log entry:**
- 17 Nov: 249 → **213**; uncustomized 231 → 210.
- 27 Nov: 308 → **275**; uncustomized 280 → 253.
- 3064856 barely moved (17 Nov 274 → 260, 27 Nov 338 → 336). Reyhan's +35% / +50% min-1 overrides are unchanged.
- The cause was NOT CHECKED. It is most likely the algorithm, since the uncustomized prices fell too.

**3. The comps are flat to slightly lower:**
- 10-12 Nov 217.5 → 217.5 (1761224847419174970 cut 275 → 266)
- 17 Nov 200 → 200; 27 Nov 394 → 394; 1 Dec 376 → 376
- 11-13 Dec 279 → 278.5; 18-20 Dec 302 → 300.25; 23-26 Dec 237 → 236.67; 18-26 Dec 193.56 → 191.88
- Comp 1568189670839493789 gained a review: 4.2 (10) → 4.27 (11). The comp median rating stays 4.78.

**4. Visible strikethrough on 5-night stays:**
- 8-13 Nov shows £937 → £858 on 3090701 and £799 → £735 on 3064856, i.e. about -10% of the room price. 
- This looks like the 5+ night Smoobu Airbnb rule. Policy `airbnb_smoobu_settings_21oct` lists 5+ -10% / -8% before the 21 Oct change and does not say whether that rule was removed.
- Information only. Corentin prefers visible discounts (policy `airbnb_visible_discounts`).

### Focus: 17 Nov and 27 Nov singles (a-p13-orphan-price)
**17 Nov:**
- Only the same 2 comps sell this night: 1201539290247676065 and 1598588327559113265, both £200 and sleeping 7.
- We are £320 / £358, i.e. +60% / +79%.
- After PriceLabs' own drop, 3090701's PriceLabs price (213) is now at market P50 (210). 3064856 (260) is ~P69.
- The quality-supported level is market P50 × (1 + q): **~£201** for 3090701 and **~£179** for 3064856.

**27 Nov:**
- We are -8.4% / +3.6% against the only comp returned: 1205241472054931937, rated 5.0, Guest favourite, with lift and balcony, at £394.
- Against the market we are +14% / +39% (market P50 241; market occupancy 44.6%).
- The quality-supported level is **~£230** for 3090701 and **~£205** for 3064856.

**Status:** Reyhan's +35% / +50% min 1 is unchanged. It stays a **conflict for Corentin to confirm. Not fixed.** The gap is now partly closed on 3090701, but only by the algorithm.

### Focus: Christmas 18-26 Dec (a-peak-check, P13 part)
**Overrides:**
- 18-20 Dec: now **-5%** (was -2%). This is Reyhan's 22:07Z edit on 7-20 Dec.
- 21-26 Dec: -3%, min 3.
- 27 Dec: min 7.

27 Dec is linked-booked (on 3090701). So **min 3 still blocks 25 Dec and 26 Dec arrivals**. Not fixed.

**On Airbnb:**
- 18-20 Dec: £286.5, which is -4.6% vs the comps (P50) and P33 of the wider sample.
- 23-26 Dec: £257, which is +8.6% vs 2 comps but **P16 of the wider sample** (median 310.67, n=24).
- 18-26 Dec (8 nights, after the policy weekly 15%): £195.38, against the comps at 183-200 (n=2) and the wider sample at 292, i.e. **P5**.

**On the market:** PriceLabs is at -6% / -16% / -12% vs market P50 on those three stays.

**Quality-supported level for 23-26 Dec** (market P50 × (1 + q)): ~£263 for 3090701 and ~£233 for 3064856. 3064856 is about at its quality level; 3090701 is ~12% below its own.

`recommend` (60-day lead +12.2 pts) says **raise +10%**. Reyhan's -5% on 18-20 Dec goes against that evidence. It is not a policy conflict, since no standing decision covers December prices.

### Input for tomorrow's base review (a-base-review-1102): P13 base 250
**Keep 250 and do not raise it.** Reasons:
- It sits at about P62 of the 2-bed market (P50 224 / P75 280, `raw/neighbourhood_P13.json`) and above PriceLabs' recommended base of 233 / 232 (`listings.csv`).
- Even with it, the open nights are P0-P38 of the comps because of Reyhan's -5% overrides and last-minute logic. The lever is those overrides, not the base.
- The quality supports -4% (3090701) and -15% (3064856) against the comp median, so a higher base would rest on demand (+28 / +12 pts) alone.
- The base change itself (Reyhan, 24 Oct, 235 → 250) still needs Corentin to confirm and record it in policy.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights: `prices.csv` 1 Nov shows 2-18 Nov all Booked, then Blocked from 19 Nov (policy `handbacks`, last night 18 Nov). It is booked 100% vs a market of 27% (`kpi_pack`).

No comps, percentile, rating or supported premium: there is nothing to price. This is unchanged.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 1 Nov: "No priced PriceLabs listing mapped"), so we have no price of our own.

Percentile, rating, review gap and supported premium are **NOT CHECKED**, and no comps were built.

## Data gaps:
1. **Booking.com comps were NOT CHECKED**; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. **The daily market percentiles are from 31 Oct, not 1 Nov.** There was no fresh `future_prices` pull, so the "mkt" columns are one day old. The 2-bed summary is from today.
3. **Comp coverage is thin on singles and December:**
   - n=2 on 17 Nov, 11-13 Dec, 23-26 Dec and 18-26 Dec
   - n=1 on 27 Nov and 1 Dec
   - n=3 on 2-4 Nov
   
   Those rows lean on market percentiles and the wider sample, labelled as such.
4. **Smoobu `/rates` was not pulled.** The Airbnb room/PriceLabs ratios (0.75 in Nov, 0.89 in Dec, in `channel_checks.csv`) are against the PriceLabs `user_price` and assume £150 cleaning.
5. **Why PriceLabs dropped 3090701's 17 / 27 Nov prices** was NOT CHECKED (no log entry). Whether the 5+ night Airbnb rule is still set in Smoobu was also NOT CHECKED.
6. **The mapping of Airbnb ids to Smoobu ids is "likely / probable"** (policy `airbnb_listings_24oct`).
7. **P16, P18 and P19 have no data.** P10 has no sellable nights.

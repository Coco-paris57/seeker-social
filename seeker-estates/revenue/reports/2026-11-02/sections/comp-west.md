# Competitor positioning: WEST + HERTS (D = 2026-11-02)

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only and made one at a time:
1. `get_neighbourhood_data` 3064856 (detail mode, future_prices + occupancy), saved to `scratchpad/west02/dl/neigh_3064856.json`
2. `get_listing_date_overrides` 3064856 (2 Nov-3 Jan)
3. `get_user_logs` (listing, 3064856 + 3090701, 1-2 Nov)

Other inputs:
- **Airbnb public search pages:** plain `curl` to airbnb.co.uk with default headers. No block or bot check was met. Booking.com was not loaded.
- **Our prices:** `data/snapshots/2026-11-02/raw/prices_3064856.json` and `prices_3090701.json`, refreshed 2 Nov 00:15Z.
- **Occupancy:** `reports/2026-11-02/kpi_pack.json`. P13 is booked **69% vs a market of 41%** over the next 30 days (+28 pts), and **50.8% vs 36%** over 60 days (+14.8 pts).
- **Market, 2-bed summary:** `raw/neighbourhood_P13.json` (2 Nov): P25 188 / P50 225 / P75 280 / P90 348, n=117. Unchanged from 1 Nov.

**Method.**
- **Comp set:** the same 11 Airbnb comp ids as 26 Oct-1 Nov. None were replaced. **All 11 are active**: each one was returned on at least one stay today.
- **Search settings:** 4 guests, entire home, at least 2 bedrooms. Each stay used a 1.3 km box around P13 plus a 0.2 km box around each comp.
- **Price basis:** the Airbnb all-in total ÷ nights, with cleaning (£150) and fees included and no taxes shown separately. Comps and our listings use the same basis.
- **Stays priced (P13's open dates):**
  - 3-4 Nov
  - 8-10 Nov and 10-12 Nov (Tue-Thu midweek)
  - **11-13 Nov** (includes 12 Nov, England v Croatia at Wembley)
  - 8-13 Nov (the whole 5-night window)
  - Singles 17 Nov, 27 Nov and 1 Dec (1 Dec is the 30-day date)
  - 11-13 Dec, 18-20 Dec, 23-26 Dec
  - 18-26 Dec (8 nights)
- **Default Fri-Sun, 6-8 Nov:** we are booked or linked-blocked on these nights, so this stay is only an activity check on the comps.
- **Rows appended to `data/snapshots/2026-11-02/`**, under `flock` on `.comps.csv.lock` / `.channel_checks.csv.lock` / `.market.csv.lock`:
  - `comps.csv` already existed (other agents had written to it), so I appended **143 rows** (11 comps × 13 stays). Filter on `source` containing "checked 2026-11-02" and "comp-west".
  - `channel_checks.csv` did not exist, so I copied the 1 Nov file forward first, then added 22 rows for our two listings.
  - `market.csv`: 1 comp-median summary row for P13.
- **Recompute check:** `snapshot.load('2026-11-02')` followed by `comp_summary` on the 11-13 Nov rows gives n=8 and median 212.5. 3090701 comes out at P88 / +4.9% and 3064856 at P25 / -7.3%, which matches the tables below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
- All prices are Airbnb all-in £/night including cleaning, checked 2026-11-02, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay).
- Ratings and review counts come from today's search cards. Cancellation policy was NOT CHECKED.
- The 8-13 Nov and 18-26 Dec figures are after length-of-stay discounts (comps and ours alike).

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 3-4 Nov | 6-8 Nov* | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov (5n) | 17 Nov | 27 Nov | 1 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) (was 4.8 (10)) | garden view, balcony | 261 | | | 265 | | | | | | | | | |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | | | 207 | | 207 | | | | | | | | |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | | | 218 | 218 | 218 | 186.8 | | | | | | | |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | private garden | | | 208 | 210.5 | 215.5 | 166.0 | | | | 278.5 | 269.5 | 232.33 | 201.5 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | 219 | 236 | 190 | 204 | 209.5 | 167.6 | | | | | | | |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | 180 | | | | 167.5 | | 200 | | | | | | |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | | | | | | | | | | 282 | 268.5 | 242.33 | 184 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath | | 425.5 | 411 | 411 | 411 | 385.2 | | | | | 450 | | |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.61 (82) (was 4.6 (81)) | paid parking | | | 217 | 217 | 217 | 199.0 | | | | | | | |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite | | | | | | | | 394 | **423** (was 376) | | 331.5 | | |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | 175 | | | | 167.5 | | 200 | | | | | | |
| **Comp median (n)** | | | **4.78 (13)** (all 11; today's 8-comp subset on 11-13 Nov is 4.745) | | 199.5 (4) | 330.75 (2) | **212.5 (6)** | **217.5 (6)** | **212.5 (8)** | **186.8 (5)** | 200 (2) | 394 (1) | 423 (1) | 280.25 (2) | **300.5 (4)** | 237.33 (2) | 192.75 (2) |
| Wider 2-bed sample median (n) | | | | | 247 (9) | 283.75 (12) | 233 (19) | 239 (20) | 235.5 (25) | 219.6 (19) | 200 (5) | 344.5 (4) | 423 (1) | 364 (17) | 303 (14) | 298.84 (24) | 292 (19) |
| **Ours 1587576514709814818** (3090701) 4.67 (9) | | 6 | | terrace | not returned (orphan, min 2) | booked | **217.5** | **223** | **223** | **184.2** (strike £1,006 → £921) | **309** | **337** | **355** | **296.5** | **294.5** | **259** | **198.88** (strike £1,845 → £1,591) |
| **Ours 1571600691689064213** (3064856) 4.31 (13) | | 6 | | terrace, skyline view | not returned (orphan, min 2) | booked | **192.5** | **197** | **197** | **157.0** (strike £855 → £785) | **281** | **408** | **431** | **296.5** | **294.5** | **259** | **198.88** (strike £1,845 → £1,591) |

\* Activity check only: we are booked on 6-8 Nov.

The wider sample is every 2-bedroom entire home with at least 10 reviews within 1.45 km. It comes from search cards, is not vetted, and is context only (ids in `scratchpad/west02/dl/wide.json`).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- The comp median is **4.78** with **13** reviews (all 11 comps).
- 3090701: **4.67 (9)**, which is -0.11 against the median and 4 reviews behind.
- 3064856: **4.31 (13)**, which is -0.47 against the median and level on reviews.
- Neither listing has Superhost, Guest favourite or a listed lift. Airbnb puts 3064856 in its bottom 10% quality bucket (policy `airbnb_listings_24oct`).

**`quality_premium`:** 3090701 **-0.044**; 3064856 **-0.15** (capped).

**`recommend` inputs:**
- For stays under 30 days out I use the 30-day figures (lead +28 pts); from 11 Dec on I use the 60-day figures (lead +14.8 pts).
- The "PL nightly" column is the PriceLabs `price` field, which equals `final_price` in today's neighbourhood data. It is compared with today's daily market P25/P50/P75 (2-3 BR band) for the same nights.

| Stay | Listing | Ours (Airbnb) | Comp median (n) | Comp pctl | vs median | Wider pctl | PL nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 8-10 Nov | 3090701 | 217.5 | 212.5 (6) | P67 | **+2.4%** | P37 | 186 vs 204.5 (-9%, ~P37) | raise +10% |
| | 3064856 | 192.5 | 212.5 (6) | P17 | **-9.4%** | P16 | 153 vs 204.5 (-25%, ~P23) | raise +10% |
| 10-12 Nov (Tue-Thu) | 3090701 | 223.0 | 217.5 (6) | P67 | **+2.5%** | P40 | 193 vs 208 (-7%, ~P41) | raise +10% |
| | 3064856 | 197.0 | 217.5 (6) | P0 | **-9.4%** | P5 | 159 vs 208 (-24%, ~P24) | raise +10% |
| **11-13 Nov (12 Nov match)** | 3090701 | 223.0 | 212.5 (8) | P88 | **+4.9%** | P40 | 193 vs 211 (-9%, ~P39) | comps: raise +5%; mkt: raise +10% |
| | 3064856 | 197.0 | 212.5 (8) | P25 | **-7.3%** | P16 | 159 vs 211 (-25%, ~P23) | raise +10% |
| 8-13 Nov (5n) | 3090701 | 184.2 | 186.8 (5) | P40 | -1.4% | P11 | 190.2 vs 207.8 (-8.5%, ~P39) | raise +10% |
| | 3064856 | 157.0 | 186.8 (5) | P0 | -16.0% | P0 | 156.6 vs 207.8 (-25%, ~P23) | raise +10% |
| 17 Nov (single) | 3090701 | 309 | 200 (2) | P100 | +54.5% (n=2) | P80 (n=5) | 207 vs 208 (0%, ~P49) | mkt: raise +10% |
| | 3064856 | 281 | 200 (2) | P100 | +40.5% (n=2) | P80 | 170 vs 208 (-18%, ~P25) | mkt: raise +10% |
| 27 Nov (single) | 3090701 | 337 | 394 (1) | P0 | -14.5% (n=1) | P25 (n=4) | 244 vs 241 (+1%, ~P51) | mkt: raise +10% |
| | 3064856 | 408 | 394 (1) | P100 | +3.6% (n=1) | P100 | 336 vs 241 (+39%, above P75 303) | mkt: raise +5% |
| 1 Dec (single, 30-day date) | 3090701 | 355 | 423 (1) | P0 | -16% (n=1) | n=1 | 227 vs 227 (0%, ~P50) | intentional (policy `intentional_overrides`), no proposal |
| | 3064856 | 431 | 423 (1) | P100 | +1.9% (n=1) | n=1 | 312 vs 227 (+37%) | intentional, no proposal |
| 11-13 Dec | both | 296.5 | 280.25 (2) | P100 | +5.8% (n=2) | P29 | 246 vs 244.5 (+1%, ~P51) | mkt: raise +10% |
| 18-20 Dec | both | 294.5 | 300.5 (4) | P50 | **-2.0%** | P43 | 243.5 vs 251 (-3%, ~P46) | raise +10% |
| 23-26 Dec | both | 259.0 | 237.33 (2) | P100 | +9.1% (n=2) | **P17** | 232 vs 273 (-15%, ~P31) | mkt: raise +10% |
| 18-26 Dec (8n) | both | 198.88 | 192.75 (2) | P50 | +3.2% (n=2) | **P5** | 235.4 vs 262.8 (-10%, ~P37) | mkt: raise +10% |

**Supported positioning (one line each):**
- **3090701: -4% vs the comp median** (quality -0.044: 4.67 vs 4.78, and 9 vs 13 reviews).
  - Today it is at +2.4% to +4.9% on the November 2-night stays (P67-P88). Yesterday it was -2.5% to -3.7%.
  - That puts it **about 7-9 pts above its quality line**. The only support for that is demand (+28 pts ahead); it is still 7-9% below market P50.
- **3064856: -15% vs the comp median** (quality capped at -0.15: 4.31 vs 4.78).
  - Today it is at -7% to -9% on the November 2-night stays (P0-P25) and -16% on 8-13 Nov.
  - That is above its quality floor, again supported by demand only.

### What changed since 1 Nov
**1. Reyhan removed the -5% on 2-12 Nov and eased December to -2%** (`get_user_logs`, 2 Nov 00:12Z, copied to 3090701 as child; `get_listing_date_overrides` confirms):
- 2-12 Nov: the price override is now **removed** (min stay 2 only).
- 7-20 Dec: **-2%** (was -5%), min 2.
- **The P13 conflict on 1-3 / 8-12 Nov (-5% vs policy 0%) is fixed.** It now matches policy `price_changes` 24 Oct. Corentin does not need to rule on it any more.

**2. Airbnb display followed:**

| Stay | 3090701 | 3064856 | Comp median |
|---|---|---|---|
| 8-10 Nov | 207 → **217.5** (+5.1%) | 184.5 → **192.5** (+4.3%) | 212.5, unchanged |
| 10-12 Nov | 209.5 → **223** (+6.4%) | 186 → **197** (+5.9%) | 217.5, unchanged |
| 11-13 Nov | | | 216 → 212.5 |

**3. The Airbnb room price tracks the PriceLabs `price` field, not `user_price`.** On every stay checked on both days:
- Airbnb room (total minus £150) = **0.765-0.77 × `price`** for stays up to 25 days out.
- It is **0.90 × `price`** for stays 29 or more days out (1 Dec, 11-13 Dec, 18-20 Dec, 23-26 Dec).
- The 8-night 18-26 Dec stay is 0.765 including Airbnb's weekly -15%.

So beyond about 4 weeks out a flat -10% applies, and within about 4 weeks an extra -15% stacks on top. That does not match policy `airbnb_smoobu_settings_21oct.changed_21oct`, which says last-minute -10% within 14 days and early bird -10% at 60+ days. It does match the *old* rule (last-minute -15% within 28 days). **This is unexplained: Corentin should check the Smoobu Airbnb rules screen.** It is the same gap the a-airbnb-rules item tracks; rows are in `channel_checks.csv`.

On 17 Nov the two price fields have split apart:

| 17 Nov | `price` | `user_price` | uncustomized |
|---|---|---|---|
| 3064856 | 170 | 258 | 173 |
| 3090701 | 207 | 197 | 209 |

The Airbnb price (281 all-in) follows the 170. Yesterday `price` was 271. The cause was NOT CHECKED; it could be PriceLabs orphan-gap logic. The push-check section should confirm what Smoobu holds.

**4. The comps are flat:**
- 8-10 Nov 212.5 → 212.5; 10-12 Nov 217.5 → 217.5; 11-13 Nov 216 → 212.5
- 18-20 Dec 300.25 → 300.5; 23-26 Dec 236.67 → 237.33
- The one exception is 1205241472054931937 on 1 Dec: 376 → 423.
- Two comps gained a review: 1761224847419174970 now 4.82 (11), 1016465248942791796 now 4.61 (82).

### Focus: 8-12 Nov run and 12 Nov England v Croatia (a-raise-1012nov)
**Market:**
- 12 Nov market P50 is **214**, against 208 on 10 and 11 Nov.
- 12 Nov market occupancy is **37.8%**, against 31.0% on 11 Nov and 36.3% on 10 Nov.
- So there is a mild uplift on the night (+3% price, +7 pts occupancy).

**Comps:** they show **no event premium**. The 11-13 Nov median is 212.5, against 217.5 on 10-12 Nov.

**Our prices:**
- 3064856 is £159 on 12 Nov (`price`), **below market P25 (176)**.
- 3090701 is £193, between P25 and P50.

**Status: not done.** With the -5% now gone, the remaining gap is the base algorithm plus the Airbnb ~0.77 factor.

**Evidence-supported move:** 3064856 to about the quality line (market P50 214 × 0.85 ≈ **£182**) and 3090701 to about **£205** (214 × 0.956). Both are rises, supported by +28 pts demand. This is not a policy conflict (policy sets 8-12 Nov at 0% and is silent on event uplifts).

### Focus: 17 Nov and 27 Nov singles (a-p13-orphan-price)
**17 Nov:**
- Only the same 2 comps sell this night (1201539290247676065 and 1598588327559113265, both £200 all-in and sleeping 7). The wider sample median is also 200 (n=5).
- We are £309 / £281 all-in, i.e. +54% / +40%. Most of that is the £150 cleaning on a 1-night stay; the comps' cleaning split is NOT CHECKED.
- PriceLabs `price` is 207 / 170 against market P50 208. The quality-supported level is **~£199** (3090701) and **~£177** (3064856), so the PriceLabs prices are now at that level. Yesterday they were 213 / 271.
- In the overrides table, Reyhan's +35% min-1 is still set. It does not show in 3064856's `price` (see change 3).

**27 Nov:**
- Overrides still have +50% min 1 (`get_listing_date_overrides`).
- 3064856 `price` 336 is +39% vs market P50 241 (above P75 303), against a quality line of ~£205. 3090701 `price` 244 is at P50, against a quality line of ~£230.
- The only comp returned (1205241472054931937: 5.0, Guest favourite, lift, balcony) is £394 all-in.

**Status:** the singles conflict (Reyhan +35% / +50% vs the evidence) is **not fixed** on 27 Nov. On 17 Nov it is fixed in effect but not in the settings.

### Focus: Christmas 18-26 Dec (a-peak-check, P13 part)
**Overrides:**
- 18-20 Dec: -2% (was -5%; Reyhan, 2 Nov 00:12Z).
- 21-26 Dec: -3%, min 3.
- 27 Dec: min 7. 27 Dec is linked-booked.

So **min 3 still blocks 25 Dec and 26 Dec arrivals**. Not fixed.

**On Airbnb:**
- 18-20 Dec: £294.5, which is -2.0% vs the comps (P50) and P43 of the wider sample.
- 23-26 Dec: £259, which is +9.1% vs 2 comps but **P17 of the wider sample** (median 298.84, n=24).
- 18-26 Dec (8 nights, after the policy weekly 15%): £198.88, against the comps at 184-201.5 (n=2) and the wider sample median at 292, i.e. **P5**.

**On the market:** PriceLabs is at -3% / -15% / -10% vs market P50 on those three stays. Market occupancy on 23-26 Dec is 38-44%, against 21-30% at the same time last year.

**Quality-supported level for 23-26 Dec** (market P50 273 × (1 + q)):
- 3090701: **~£261**, against £232 today, so about 11% below its level.
- 3064856: **~£232**, so at its level.

`recommend` (60-day lead +14.8 pts) says **raise +10%**. No standing decision covers December prices.

### Input for today's base review (a-base-review-1102): P13 base 250
**Keep 250 and record it. Do not raise or cut.** Reasons:
- 250 is about P61 of the 2-bed market (P50 225 / P75 280, `raw/neighbourhood_P13.json`) and above PriceLabs' recommended base of 237 / 236 (`listings.csv`).
- With Reyhan's -5% removed, the November open nights now sit at or above each listing's quality line: 3090701 at +2% to +5% vs a supported -4%, and 3064856 at -7% to -9% vs a supported -15%.
- The remaining under-pricing is date-specific, not a base problem:
  - 12 Nov on 3064856 is below market P25.
  - Christmas 23-26 Dec on 3090701 is about 11% under its quality level.
  - 18-26 Dec is P5 of the wider sample.
  - The lever is those dates plus the Airbnb ~0.77/0.90 rules factor.
- The base change itself (Reyhan, 24 Oct, 235 → 250) still needs Corentin to confirm and record it in policy.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights. `prices.csv` 2 Nov shows 16 nights Booked up to 18 Nov and the rest Blocked (policy `handbacks`, last night 18 Nov). It is booked 100% vs a market of 28% (`kpi_pack`).

No comps, percentile, rating or supported premium: there is nothing to price. This is unchanged.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 2 Nov: "No priced PriceLabs listing mapped"), so we have no price of our own.

Percentile, rating, review gap and supported premium are **NOT CHECKED**, and no comps were built.

## Data gaps:
1. **Booking.com comps were NOT CHECKED**; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. **Comp coverage is thin on singles and December:**
   - n=2 on 17 Nov, 6-8 Nov, 11-13 Dec, 23-26 Dec and 18-26 Dec
   - n=1 on 27 Nov and 1 Dec
   
   Those rows lean on market percentiles and the wider sample, labelled as such.
3. **The cleaning split for comps is unknown,** so all-in comparisons on 1-night stays exaggerate our gap.
4. **Not checked:**
   - Why 3064856's 17 Nov `price` (170) ignores the +35% override still shown in `user_price` (258)
   - Whether Smoobu holds `price` or `user_price`
   - Smoobu `/rates`
5. **The Airbnb rules factor is inferred,** not read from the Smoobu screen: 0.90 beyond ~4 weeks, 0.765 within.
6. **3 Nov is an orphan night** (4 Nov booked) with min stay 2, so it is not sellable as set. Our listings were not returned for 3-4 Nov.
7. **The mapping of Airbnb ids to Smoobu ids is "likely / probable"** (policy `airbnb_listings_24oct`).
8. **P16, P18 and P19 have no data.** P10 has no sellable nights.

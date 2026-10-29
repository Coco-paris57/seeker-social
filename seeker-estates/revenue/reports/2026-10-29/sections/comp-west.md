# Competitor positioning: WEST + HERTS (D = 2026-10-29)

**Sources.** I read `data/policy.json` first. Two read-only PriceLabs calls, one at a time:
- `get_listing_date_overrides` 3064856, 29 Oct-3 Jan.
- `get_neighbourhood_data` 3064856 (summary). The 2 BR table is unchanged from `raw/neighbourhood_P13.json`: P25 191, P50 230, P75 283, P90 362, n=118.

Other inputs:
- **Daily market percentiles:** the 28 Oct `future_prices` pull (`scratchpad/m28/neigh_3064856.json`). There is no 29 Oct pull for 3064856, so these are one day old.
- **Our prices:** `data/snapshots/2026-10-29/raw/prices_3064856.json` and `prices_3090701.json` (last refreshed 28 Oct 10:31Z).
- **Occupancy:** `reports/2026-10-29/kpi_pack.json`. P13 is booked 62.1% vs market 40% over 30 days, and 45.8% vs 36% over 60 days.
- **Bookings:** `reservations.csv` 29 Oct. P13 has no new or cancelled bookings overnight.

**Method.**
- **Comp set:** I kept the same 11 Airbnb comp ids as 26-28 Oct and replaced none. All 11 are active.
  - Three of them (1599999559812004118, 1201539290247676065, 1598588327559113265) were not returned on any of today's target stays.
  - I searched 24-26 Nov as an activity check, and all three were returned.
- **Searches:** plain `curl` to airbnb.co.uk, 4 guests, entire home, at least 2 bedrooms.
  - Each stay got a 1.3 km box plus a 0.2 km box around every comp.
  - No block or bot check was met.
- **Price basis:** each price is the Airbnb all-in total divided by nights, **with cleaning and fees included**. No taxes are shown separately.
- **Stays:**
  - Fri 30 Oct-Sun 1 Nov (we are booked)
  - Sat 31 Oct-Mon 2 Nov
  - Tue 10-Thu 12 Nov (midweek)
  - Orphan nights 17-18 Nov and 27-28 Nov (1 night each)
  - Fri 11-Sun 13 Dec
  - Fri 18-Sun 20 Dec
  - Christmas 23-26 Dec (min 3)
  - The full Christmas window 18-26 Dec (8 nights)
  - 24-26 Nov (activity and trend check; we are booked)
  - The default D+30 date (28 Nov) is booked for us, so 27 Nov and the December stays cover the 30+ day horizon.
- **Rows appended** under `flock`, using the CSV plus the `.<name>.lock` side-lock that the market agent uses.
  - `comps.csv` and `channel_checks.csv` did not exist in today's snapshot, so I copied them forward from 28 Oct first.
  - New rows: 110 to `comps.csv` (11 comps × 10 stays), 16 to `channel_checks.csv` (our two listings), and 2 to `market.csv` (P13 comp medians, P10).
  - Today's rows carry "checked 2026-10-29" in `source`.
- **Recompute check:** `comp_summary` on today's rows for 10-12 Nov gives n=6, median 219.0, P67 / P0, +3.0% / -9.1%. This matches the table.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
Airbnb all-in £/night including cleaning, checked 2026-10-29, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay).

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 31 Oct-2 Nov | 10-12 Nov | 17-18 Nov | 24-26 Nov | 27-28 Nov | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | garden view, balcony | | | 282.5 | | | | | | | |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | | | | | 244.0 | | | | | |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | | | 218.0 | | 236.0 | | | | | |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | garden; Special offer / Early booking | 216.0 | 212.5 | 210.5 | | 237.5 | | 279.5 | 267.0 | 232.0 | 199.38 (weekly) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | | | 220.0 | | | | | | | |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | | | | | 167.5 | | | | | |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | | | | | 252.5 | | 283.5 | 274.5 | 250.33 | 194.25 (weekly) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath; Special offer | 425.5 | 418.0 | 411.0 | | | | | 450.0 | | |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking | | | 217.0 | | 217.0 | | | | | |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite | | | | | 349.5 | 393.6 | | 331.5 | | |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | | | | | 167.5 | | | | | |
| **Comp median (n)** | | | **4.78 (13)** | | 320.75 (2) | 315.25 (2) | **219.0 (6)** | n/a (0) | **236.75 (8)** | 393.6 (1) | 281.5 (2) | **303.0 (4)** | 241.17 (2) | 196.82 (2) |
| Wider 2-bed sample median (n) | | | | | 230.0 (7) | 252.25 (16) | 266.5 (22) | 293.0 (2) | 254.0 (27) | 357.0 (4) | 357.25 (18) | 320.5 (15) | 341.0 (24) | 304.81 (20) |
| **Ours 1587576514709814818** 4.67 (9) | | 6 | | terrace | booked | **218.5** | **225.5** | **359.0** | booked | **460.0** | **283.0** | **281.5** | **247.67** (strike £842) | **188.62** |
| **Ours 1571600691689064213** 4.31 (13) | | 6 | | terrace, skyline view | booked | **193.5** | **199.0** | **359.0** | booked | **460.0** | **295.5** | **293.5** | **259.33** | **198.62** |

The wider sample is every 2-bedroom entire home with at least 10 reviews within 1.45 km. It comes from search cards, is not vetted, and is context only.

### Positioning
- `quality_premium` uses the comp median rating of 4.78:
  - 3090701 (4.67, 9 reviews; 4 below the comp median of 13): **-0.044**
  - 3064856 (4.31, 13 reviews; same as the median): **-0.15** (capped)
- `recommend` uses occupancy from `kpi_pack`:
  - Stays under 30 days out: 30-day figures, 0.621 vs 0.40.
  - December stays: 60-day figures, 0.458 vs 0.36.
- Where comp n is below 3, I use the PriceLabs market percentile of our PriceLabs nightly price instead, interpolated from the 28 Oct `future_prices` P25/P50/P75 for the same nights. These rows are labelled "mkt".

| Stay | Listing | Ours (Airbnb all-in) | Comp median (n) | Comp pctl | vs median | PL nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|
| 10-12 Nov | 3090701 | 225.5 | 219.0 (6) | P67 | **+3.0%** | 196.5 vs 231 (-15%, ~P29) | raise +10% |
| | 3064856 | 199.0 | 219.0 (6) | P0 | **-9.1%** | 162.0 vs 231 (-30%, ~P21) | raise +10% |
| 17-18 Nov (orphan) | both | 359.0 | none (0); wider 293 (n=2) | wider P100 | n/a | 273 vs 232 (+18%, ~P71) | mkt: raise +10% (see note) |
| 27-28 Nov (orphan) | both | 460.0 | 393.6 (1) | P100 | +16.8% (n=1) | 344 vs 254 (+35%, above P75 326) | mkt: raise +5% (see note) |
| 11-13 Dec | 3090701 | 283.0 | 281.5 (2) | P50 | +0.5% | 231 vs 253 (-9%, ~P36) | mkt: raise +5% |
| | 3064856 | 295.5 | 281.5 (2) | P100 | +5.0% | 245 vs 253 (-3%, ~P45) | mkt: hold |
| 18-20 Dec | 3090701 | 281.5 | 303.0 (4) | P50 | **-7.1%** | 229 vs 270 (-15%, ~P28) | comp: hold / mkt: raise +5% |
| | 3064856 | 293.5 | 303.0 (4) | P50 | **-3.1%** | 242.5 vs 270 (-10%, ~P35) | hold / hold |
| 23-26 Dec | 3090701 | 247.67 | 241.17 (2) | P50 | +2.7% | 219.3 vs 288.3 (-24%, ~P24, below P25 232.7) | mkt: raise +5% |
| | 3064856 | 259.33 | 241.17 (2) | P100 | +7.5% | 232.3 vs 288.3 (-19%, ~P25) | mkt: raise +5% |
| 18-26 Dec (8n) | 3090701 | 188.62 | 196.82 (2) | P0 | -4.2% | 222 vs 277 (-20%, ~P25) | mkt: raise +5% |
| | 3064856 | 198.62 | 196.82 (2) | P50 | +0.9% | 235 vs 277 (-15%, ~P30) | mkt: raise +5% |

31 Oct-2 Nov has comp n=2, one of which is the £418 lift outlier. Against the wider sample (n=16) we are P19 (218.5) and P6 (193.5). PriceLabs is about P25 / P21 of the market, and `recommend` says raise +10%.

**Supported positioning (one line each).**
- **3090701: -4% vs comp median** (quality -0.044: 4.67 vs 4.78, 9 vs 13 reviews, no Superhost, no Guest favourite, no lift listed).
  - It is at +3% on 10-12 Nov, about the comp level.
  - It is -7% on 18-20 Dec (n=4). In December it sits at P24-P36 of the PriceLabs market, below what quality supports (market P50 × 0.956).
- **3064856: -15% vs comp median** (quality capped at -0.15: 4.31 vs 4.78).
  - It is -9% on 10-12 Nov and -3% on 18-20 Dec, so already above its quality floor.
  - The case for raising it is demand, not quality: the flat is booked +22 points ahead of the market over the next 30 days.

### Focus 1: the orphan nights 17 Nov and 27 Nov (a-p13-orphans-nov)
**Change.** Both are now open at min 1: PriceLabs min_stay 1 in today's raw, and both listings are returned on Airbnb for 1-night stays. The overrides were updated **28 Oct 10:30Z** (`get_listing_date_overrides`; who made them was NOT CHECKED):
- 17 Nov: **+35%**, min 1
- 27 Nov: **+50%**, min 1

Yesterday's plan item proposed min 1 with prices unchanged.

**Effect:**
- 17 Nov: PriceLabs **£180 → £273**, and the Airbnb all-in 1-night total is **£359** on both listings.
- 27 Nov: PriceLabs **£233 → £344**, and the Airbnb all-in total is **£460**.
- Both listings now show identical prices on these two dates, so the twin rule of keeping prices slightly different is not met.

**Where that sits:**
- **17 Nov:** none of the 11 comps sells this 1-night stay. The wider sample has n=2 (median 293), and we are at P100 of it.
  - PriceLabs 273 is about market P71 (P50 232, P75 281).
  - Market occupancy for 17 Nov is 27.0% (`future_prices` 28 Oct).
- **27 Nov:** the only comp returned is 1205241472054931937 (5.0, Guest favourite, lift, balcony) at **£393.60**, with a Special offer of -£71.40. Ours at £460 is **+16.8%** above it.
  - We are also above every wider-sample listing (n=4, median 357).
  - PriceLabs 344 is above market P75 (326). Market occupancy is 39.9%, and the night is Twickenham Finals eve (per the 28 Oct plan).

**Reading:**
- `recommend` returns raise, because the 30-day booked-vs-market lead (+22 points) comes from nights already sold. It does not see a single orphan night.
- Quality supports **-4% / -15% vs comps**, not a premium.
- At 27 Nov's one comp, a quality-supported all-in is about £377 (3090701). That works out to PriceLabs about £252, close to market P50 254, or about **+10%** instead of +50%.
- For 17 Nov, market P50 × 0.956 is about **£222 PriceLabs, i.e. about +10%** instead of +35%.

**Status:** the min-stay part is fixed. The premium is new and runs against the comp evidence, so it is for Corentin to confirm. It is not a new proposal.

### Focus 2: midweek 10-12 Nov (a-raise-1012nov)
**Change.** A +2% override now covers 31 Oct-12 Nov, updated 28 Oct 10:30Z. It replaced 0% on 31 Oct-3 Nov and 8-12 Nov, which had been set to 0% on 24 Oct per policy.

**Effect:**
- PriceLabs 3064856 for 10-11 Nov went 158+152 → **162+162**.
- On Airbnb, 3090701 went 219.0 → **225.5 (+3.0%)** and 3064856 went 194.0 → **199.0 (+2.6%)**.

**Today:**
- 3090701 is +3.0% vs the comp median (P67).
- 3064856 is -9.1% (P0), still the cheapest of the 6 comps returned, but above its supported -15%.

**Status:** **partly done**. +2% was applied against the +10% proposed; `recommend` still says raise +10% on both.

### Focus 3: Christmas 18-26 Dec (a-peak-check, P13 part)
**Not fixed.** `get_listing_date_overrides` shows:
- 21-22 Dec: -3%, min 3 (updated 17 Oct)
- 23-26 Dec: -3%, min 3 (updated 27 Oct 11:58Z)
- 7-20 Dec: -2% (updated 26 Oct)

None of these changed since yesterday. With 27 Dec booked, min 3 on 25-26 Dec still blocks arrivals on those two days.

**Prices:** PriceLabs 23-26 Dec averages **219.3 / 232.3** (3090701 / 3064856):
- That is -24% / -19% vs the market P50 of 288.3, and at or below the market P25 of 232.7.
- Before customizations (uncustomized) the prices would be 239.0 / 258.7.

**On Airbnb (23-26 Dec):**
- We match the only 2 comps returned: +2.7% / +7.5% vs 241.17.
- We are at **P8 / P12 of the wider sample** (median 341.0, n=24).

**Full window 18-26 Dec (8 nights):** we show 188.62 / 198.62 all-in after Airbnb's weekly discount, against comps at 194-199 (n=2) and the wider sample at 304.81 (n=20), i.e. P0 / P5.

The PriceLabs market flags 27-31 Dec at +27.7% price and 26-31 Dec at +14.9% occupancy (`get_neighbourhood_data` 29 Oct). Both P13 listings sit below the price quality supports: about 276 for 3090701 and 245 for 3064856 at market P50 × (1 + q). `recommend` says raise +5% on both.

### Our Airbnb display vs PriceLabs
Ratio = (all-in − £150) / PriceLabs sum for the same nights (`channel_checks.csv`).

| Stay | Days out | 3090701 | 3064856 |
|---|---|---|---|
| 31 Oct-2 Nov | 2 | 0.765 | 0.767 |
| 10-12 Nov | 12 | 0.766 | 0.765 |
| **17-18 Nov** | **19** | **0.766** | **0.766** |
| **27-28 Nov** | **29** | **0.901** | **0.901** |
| 11-13 Dec | 43 | 0.900 | 0.900 |
| 18-20 Dec | 50 | 0.902 | 0.901 |
| 23-26 Dec | 55 | 0.901 | 0.901 |
| 18-26 Dec (8n, weekly) | 50 | 0.765 | 0.765 |

**New evidence for a-airbnb-rules.** The extra 0.85 step applies at **19 days out**, but not at 29 days.
- That fits the *old* Smoobu rule ("last-minute -15% within 28 days", policy `pricing_rules_listing_A/B`).
- It does not fit the 21 Oct change ("-10% within 14 days"), which would give 0.90 at 19 days.
- The flat 0.90 beyond 28 days persists, and its cause is still unknown.
- Smoobu and Airbnb settings were not read, so the cause is inferred.

On the 8-night stay, Airbnb's "Weekly stay discount" line is the policy 15% (0.90 × 0.85 = 0.765), so it is expected.

### Trend vs 28 Oct (same comp ids, same stays, like for like)
**Comps:**

| Stay | n | Median change | Detail |
|---|---|---|---|
| 30 Oct | 2 | 0% | |
| 31 Oct | 2 | 0% | |
| 10-12 Nov | 6 | 223.75 → 219.0 (-2.1%) | 1411449348357673454 -4.1%, 1761224847419174970 +2.4% |
| 24-26 Nov | 8 | 240.75 → 236.75 (-1.7%) | 1436773605049626293 -5.2%, 1014671215040555613 -2.7% |
| 11-13 Dec | 2 | -0.5% | |
| 23-26 Dec | 2 | -1.3% | |

**Ours:**
- 31 Oct-2 Nov: +2.3% / +2.4%, and 10-12 Nov: +3.0% / +2.6% (the +2% override).
- 11-13 Dec: 285.0 → 283.0 and 297.5 → 295.5.
- 23-26 Dec: 249.67 → 247.67 and 261.33 → 259.33.

**PriceLabs 2 BR NL summary:** 192 / 238 / 289 / 363 → **191 / 230 / 283 / 362**.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights before the 18 Nov handback: `prices.csv` 29 Oct shows 30 Oct-18 Nov all Booked, and the rest is the policy handback. Booked 100% vs market 29% (`kpi_pack`).

No comps, percentile, rating or supported premium: there is nothing to price.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack`: "No priced PriceLabs listing mapped"; in_smoobu false), so we have no price of our own. Price percentile, rating, review gap and supported premium are **NOT CHECKED**, and no comps were built.

## Data gaps:
1. Booking.com comps were NOT CHECKED; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. December comp coverage is thin (n=2 on 11-13 Dec, 23-26 Dec and 18-26 Dec), and the orphans have n=0 and n=1, because most comps were not returned for those stays. I used PriceLabs market percentiles and the wider sample, labelled as such.
3. The daily market percentiles are from the 28 Oct `future_prices` pull. My 29 Oct `get_neighbourhood_data` call (summary mode) returned no daily series.
4. Who made the 28 Oct 10:30Z P13 overrides (17 Nov +35%, 27 Nov +50%, 31 Oct-12 Nov +2%) was NOT CHECKED (`get_user_logs` not called). The overrides for 3090701 were not read separately; its prices in raw match 3064856 on 17 and 27 Nov.
5. The Airbnb ratios assume £150 cleaning and no extra-guest fee at 4 guests. Smoobu/Airbnb rule settings were not read, so the 28-day window is inferred from the 19-day vs 29-day ratios.
6. The raw `user_price` on 17 and 27 Nov (198 / 225) does not match `price` (273 / 344), and I could not explain it. The Smoobu price in `prices.csv` is 273 / 344, and Airbnb shows prices consistent with those.
7. Today's `comps.csv` and `channel_checks.csv` contain the 28 Oct rows copied forward, as ctx29 instructs. Filter on "checked 2026-10-29" in `source` to recompute today.
8. P16, P18 and P19 have no data.

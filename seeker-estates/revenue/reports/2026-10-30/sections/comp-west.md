# Competitor positioning: WEST + HERTS (D = 2026-10-30)

**Sources.** I read `data/policy.json` first. Read-only calls, one at a time:
- PriceLabs `get_listing_date_overrides` 3064856 (30 Oct-3 Jan) and `get_user_logs` (listing, 3064856 + 3090701, 28-30 Oct).
- Smoobu GET `/rates` for apartments 3064856 and 3090701, 30 Oct-3 Jan (no guest data). Saved to `scratchpad/west30/dl/smoobu_rates_P13.json`.
- Airbnb public pages, using plain `curl` to airbnb.co.uk with default headers. No block or bot check was met. Booking.com was not loaded.

Other inputs:
- **Our prices:** `data/snapshots/2026-10-30/raw/prices_3064856.json` and `prices_3090701.json` (refreshed 29 Oct 09:09Z), plus Smoobu rates.
- **Occupancy:** `reports/2026-10-30/kpi_pack.json`. P13 is unchanged from yesterday: 62.1% booked vs market 40% over 30 days, and 45.8% vs 36% over 60 days.
- **Market:**
  - The 2 BR summary is from `raw/neighbourhood_P13.json` 30 Oct: **P25 191 / P50 226 / P75 282 / P90 348**, n=118. Yesterday it was 191 / 230 / 283 / 362.
  - Daily market percentiles are still from the **28 Oct** `future_prices` pull (`scratchpad/m28/neigh_3064856.json`, two days old). There is no newer pull for 3064856.

**Method.**
- **Comp set:** the same 11 Airbnb comp ids as 26-29 Oct. None were replaced and all 11 are active.
  - Three comps (1599999559812004118, 1201539290247676065, 1598588327559113265) were not returned on any open stay.
  - All three were returned on the 24-26 Nov activity check, and 1599999559812004118 also on 8-10 Nov.
- **Searches:** 4 guests, entire home, at least 2 bedrooms, a 1.3 km box around P13 plus a 0.2 km box around each comp.
- **Price basis:** each price is the **Airbnb all-in total divided by nights, with cleaning and fees included**. No taxes are shown separately.
- **Stays (P13's open dates, as asked):**
  - 31 Oct-2 Nov (next weekend; Fri 30 Oct is booked)
  - 8-10 Nov
  - Midweek 10-12 Nov
  - Singles 17 Nov and 27 Nov
  - Single 1 Dec (also open, min 1)
  - 11-13 Dec, 18-20 Dec and 23-26 Dec
  - The full Christmas window 18-26 Dec (8 nights)
  - Plus two stays where we are booked, used as trend and activity checks: D+30 (29 Nov-1 Dec) and 24-26 Nov.
  - The default "next Fri-Sun" (6-8 Nov) is booked for us.
- **Rows appended** under `flock` with the side-lock `.comps.csv.lock` (and `.channel_checks.csv.lock`, `.market.csv.lock`):
  - `comps.csv`: **132 rows** (11 comps × 12 stays)
  - `channel_checks.csv`: 20 rows (our two listings)
  - `market.csv`: 2 rows (P13 comp medians, P10)
  - Filter on "checked 2026-10-30" in `source`.
- **Recompute check:** `comp_summary` on today's rows for 10-12 Nov gives n=6, median 217.5, P33 / P0, -1.1% / -9.4%. This matches the table.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
Airbnb all-in £/night including cleaning, checked 2026-10-30, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay). Ratings and review counts are from today's search cards.

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 31 Oct-2 Nov | 8-10 Nov | 10-12 Nov | 17-18 Nov | 24-26 Nov | 27-28 Nov | 29 Nov-1 Dec | 1-2 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | garden view, balcony |  |  | 285 |  |  |  |  |  |  |  |  |  |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite |  | 207 |  |  | 244 |  |  |  |  |  |  |  |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath |  | 218 | 218 |  | 236.5 |  | 250.5 |  |  |  |  |  |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | private garden | 212.5 | 208 | 210.5 |  | 237.5 |  | 247.5 |  | 276 | 266 | 228 | 197.38 (weekly) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath |  | 204.5 | 214 |  |  |  | 254.5 |  |  |  |  |  |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed |  |  |  |  | 167.5 |  |  |  |  |  |  |  |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed |  |  |  |  | 245 |  | 243.5 |  | 283.5 | 276 | 248.33 | 192.38 (weekly) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath | 418 | 411 | 411 |  |  |  |  |  |  | 450 |  |  |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking |  | 217 | 217 |  | 217 |  | 259 |  |  |  |  |  |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite |  |  |  |  | 349.5 | 394 | 349.5 | 376 |  | 331.5 |  |  |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking |  |  |  |  | 167.5 |  |  |  |  |  |  |  |
| **Comp median (n)** | | | **4.78 (13)** | | 315.25 (2) | **212.5 (6)** | **217.5 (6)** | n/a (0) | **237 (8)** | 394 (1) | **252.5 (6)** | 376 (1) | 279.75 (2) | **303.75 (4)** | 238.17 (2) | 194.88 (2) |
| Wider 2-bed sample median (n) | | | | | 221 (14) | 238 (23) | 245 (20) | 293 (2) | 248.5 (27) | 357 (4) | 256.75 (18) | 376 (1) | 357.25 (18) | 320.5 (15) | 310.67 (23) | 292 (19) |
| **Ours 1587576514709814818** (3090701) 4.67 (9) | | 6 | | terrace | **216.5** | **218** (Special offer, strike £516) | **215** (Special offer, strike £509) | **341** | booked | **386** | booked | **380** | **295.5** | **290** | **257.67** | **196.62** (weekly, strike £1,824) |
| **Ours 1571600691689064213** (3064856) 4.31 (13) | | 6 | | terrace, skyline view | **191.5** | **193.5** | **197** | **360** | booked | **409** | booked | **380** | **295.5** | **290** | **257.67** | **196.62** (weekly, strike £1,824) |

The wider sample is every 2-bedroom entire home with at least 10 reviews within 1.45 km. It comes from search cards, is not vetted, and is context only. Cancellation policy per comp was NOT CHECKED.

### Price percentile, rating, review gap, supported positioning
- **Rating and reviews:**
  - Comp median: 4.78 with 13 reviews.
  - 3090701: 4.67 (9). That is 0.11 below the comp median and 4 reviews behind.
  - 3064856: 4.31 (13). That is 0.47 below and level on reviews.
  - Neither has Superhost, Guest favourite or a listed lift.
  - Airbnb puts 3064856 in its bottom 10% quality bucket (policy `airbnb_listings_24oct`).
- **`quality_premium` (comp median rating 4.78):** 3090701 **-0.044**, 3064856 **-0.15** (capped).
- **`recommend`** uses `kpi_pack` occupancy: the 30-day figures (0.621 vs 0.40) for stays under 30 days out, and the 60-day figures (0.458 vs 0.36) for stays 30 or more days out.
- Where comp n is below 3, I use the market percentile of our **Smoobu** nightly rate (the rate Airbnb actually prices from), interpolated from the 28 Oct P25/P50/P75 for the same nights. These rows are labelled "mkt".

| Stay | Listing | Ours | Comp median (n) | Comp pctl | vs median | Smoobu nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|
| 31 Oct-2 Nov | 3090701 | 216.5 | 315.25 (2); wider 221 (14) | wider P50 | n<3 | 184.5 vs 225 (-18%, ~P25) | mkt: raise +10% |
| | 3064856 | 191.5 | same | wider P14 | n<3 | 152 vs 225 (-32%, ~P20) | mkt: raise +10% |
| 8-10 Nov | 3090701 | 218.0 | 212.5 (6) | P67 | **+2.6%** | 188 vs 222.5 (-16%, ~P29) | raise +10% |
| | 3064856 | 193.5 | 212.5 (6) | P0 | **-8.9%** | 154.5 vs 222.5 (-31%, ~P21) | raise +10% |
| 10-12 Nov | 3090701 | 215.0 | 217.5 (6) | P33 | **-1.1%** | 193 vs 231 (-16%, ~P27) | raise +10% |
| | 3064856 | 197.0 | 217.5 (6) | P0 | **-9.4%** | 159 vs 231 (-31%, ~P21) | raise +10% |
| 17-18 Nov (single) | 3090701 | 341.0 | none (0); wider 293 (2) | wider P100 | n/a | 249 vs 232 (+7%, ~P59) | mkt: raise +10% (see note) |
| | 3064856 | 360.0 | same | wider P100 | n/a | 274 vs 232 (+18%, ~P71) | mkt: raise +10% (see note) |
| 27-28 Nov (single) | 3090701 | 386.0 | 394 (1) | P0 | -2.0% (n=1) | 308 vs 254 (+21%, ~P69) | mkt: raise +10% (see note) |
| | 3064856 | 409.0 | 394 (1) | P100 | +3.8% (n=1) | 338 vs 254 (+33%, above P75 326) | mkt: raise +5% (see note) |
| 1-2 Dec (single) | both | 380.0 | 376 (1) | P100 | +1.1% (n=1) | 255 vs 249 (+2%, ~P52) | mkt: hold |
| 11-13 Dec | both | 295.5 | 279.75 (2) | P100 | +5.6% | 244.5 vs 253 (-3%, ~P45) | mkt: 3090701 raise +5%, 3064856 hold |
| 18-20 Dec | both | 290.0 | 303.75 (4) | P50 | **-4.5%** | 238.5 vs 270 (-12%, ~P33) | comp: hold; mkt: raise +5% |
| 23-26 Dec | both | 257.67 | 238.17 (2) | P100 | +8.2% | 230.7 vs 288.3 (-20%, ~P25) | mkt: raise +5% |
| 18-26 Dec (8n) | both | 196.62 | 194.88 (2) | P50 | +0.9% | 232.4 vs 277 (-16%, ~P28) | mkt: raise +5% |

**Supported positioning (one line each).**
- **3090701: -4% vs the comp median** (quality -0.044: 4.67 vs 4.78, 9 vs 13 reviews, no Superhost or Guest favourite).
  - It sits at -1% to +3% on 8-12 Nov (n=6), about the comp level.
  - It is -4.5% on 18-20 Dec (n=4).
  - In December it is P25-P45 of the market, below the quality-supported market P50 × 0.956.
- **3064856: -15% vs the comp median** (quality capped at -0.15: 4.31 vs 4.78).
  - It is -9% on 8-12 Nov and -4.5% on 18-20 Dec, so already above its quality floor.
  - The case for raising it is demand, not quality: the flat is booked +22 points ahead of the market over the next 30 days.
- On every open stay except the singles, both listings are below market P50. `recommend` returns raise +5% to +10%, as it did on 29 Oct.

### Focus 1: singles 17 Nov, 27 Nov, 1 Dec (a-p13-orphan-price)
**No change since 28 Oct.** `get_listing_date_overrides` still shows:
- 17 Nov: **+35%**, min 1
- 27 Nov: **+50%**, min 1
- 1 Dec: **+50%**, min 1 (updated 20 Oct)

The 28 Oct 10:30Z overrides were made by **Reyhan** (`get_user_logs`; parent 3064856, copied to 3090701), and nothing has been logged on either listing since. Yesterday's gap 4 is now answered.

**17 Nov:**
- None of the 11 comps sells this night, and we are P100 of the wider sample (n=2, median 293).
- Our Smoobu rate is ~P59 / ~P71 of the market (P50 232). Market occupancy for the night is 27.0%.
- The quality-supported level is market P50 × 0.956 ≈ **£222**, against 249 / 274 now.

**27 Nov** (now 28 days out):
- The all-in price fell because the night entered the 28-day last-minute window (see "Our Airbnb display" below): **£460 → £386 / £409**.
- Against the one comp returned (1205241472054931937, 5.0, Guest favourite, lift, balcony; £394) we are -2.0% / +3.8%.
- Quality supports about £377 all-in for 3090701 (£394 × 0.956), which is close to what shows now.
- On market evidence it is still +21% / +33% vs P50 (above P75 for 3064856).

**1 Dec:**
- Both listings show £380, and the only comp returned (1205241472054931937) is £376.
- Our rate is ~P52 of the market, where market occupancy is 26.3%.

**Status:** the 17 and 27 Nov premiums are Reyhan's and run above the comp and market evidence. This stays as a conflict for Corentin to confirm, not a new proposal. On 27 Nov the Airbnb all-in has now drifted down to the comp level on its own.

### Focus 2: midweek 10-12 Nov (a-raise-1012nov)
**The PriceLabs side is unchanged:** +2% on 31 Oct-12 Nov (Reyhan, 28 Oct 10:30Z), against the +10% proposed. So the item is **still partly done**.

**The Airbnb side has changed on 3090701.** Listing 1587576514709814818 now shows a **"Special offer"**:
- 8-10 Nov: -£80.39 on a £515.40 list (-15.6%)
- 10-12 Nov: -£78.81 on £508.20 (-15.5%)

The offer was not there on 29 Oct: 10-12 Nov was £451 with no strikethrough (`2026-10-29/channel_checks.csv`).

Net effect, room only (all-in − £150) / Smoobu rate:
- 10-12 Nov: **0.725**, against 0.767 on 3064856 for the same dates and 0.767 on 3090701 for 31 Oct-2 Nov. That is about 5.5% below the usual ratio, and the all-in is **£451 → £429.39 (-4.8%)**.
- 8-10 Nov: 0.761, so here the offer is roughly netted out by a higher list price.

Policy says the manual Airbnb promotions were removed on 21 Oct, so this is a remaining gap to flag as **unexplained**. It may be a deliberate "visible discount" test (policy `airbnb_visible_discounts`), so it needs confirming with Corentin, not undoing. Who set it was NOT CHECKED (the Airbnb and Smoobu promotion settings were not read).

### Focus 3: Christmas 18-26 Dec (a-peak-check, P13 part)
**The overrides are unchanged.** Per `get_listing_date_overrides`:
- 18-20 Dec: -2%
- 21-22 Dec: -3%, min 3
- 23-26 Dec: -3%, min 3
- 27 Dec: min 7

27 Dec is booked (3090701 check-in; Smoobu 27 Dec-3 Jan), so min 3 on 25-26 Dec still blocks arrivals on those two days. **Not fixed.**

**Prices (Smoobu, both listings):** 23-26 Dec averages 230.7, which is -20% vs market P50 288.3 and at P25 (232.7).

**On Airbnb:**
- 23-26 Dec: £257.67, which is +8.2% vs the 2 comps returned but **P17 of the wider sample** (median 310.67, n=23).
- 18-26 Dec (8 nights): £196.62 after the policy weekly 15%, against comps at 192-197 (n=2) and the wider sample at 292 (n=19), i.e. **P5**.

`recommend` (market) says raise +5% on both listings. The quality-supported level is market P50 × (1 + q): about 276 for 3090701 and 245 for 3064856.

### New: both Airbnb listings now show identical December prices
**What Smoobu holds.** Smoobu `/rates` 30 Oct: from 1 Dec, **Smoobu 3090701 holds exactly the 3064856 rates** (for example 11 Dec 245, 18 Dec 237, 23 Dec 236 on both). PriceLabs 3090701 is about 13 lower (232 / 228 / 220; raw `prices_3090701.json`, refreshed 29 Oct 09:09Z).

**Before 1 Dec it follows PriceLabs 3090701:** 17 Nov is 249 vs PriceLabs 247, and 27 Nov is 308 vs 310.

**What Airbnb shows:**
- Airbnb follows Smoobu, so both listings show £295.50 on 11-13 Dec, £290 on 18-20 Dec and £257.67 on 23-26 Dec.
- On 29 Oct, 3090701 showed £283.0 for 11-13 Dec, which matched its own PriceLabs × 0.90.
- So 3090701's December Airbnb price rose about **+4-6%** overnight. It is now 0.95x PriceLabs 3090701 and 0.90x Smoobu.

**Reading.**
- This moves 3090701 toward what the evidence supports, so it is not a revenue risk.
- It does mean the PriceLabs → Smoobu push for 3090701 is not landing from 1 Dec, and the twin listings no longer differ in price.
- The cause was NOT CHECKED. For the PriceLabs agent: check the 3090701 sync window and last push.

### Our Airbnb display vs Smoobu
Ratio = (all-in − £150) / Smoobu rate sum for the same nights (`channel_checks.csv`).

| Stay | Days out | 3090701 | 3064856 |
|---|---|---|---|
| 31 Oct-2 Nov | 1 | 0.767 | 0.766 |
| 8-10 Nov | 9 | 0.761 (offer) | 0.767 |
| 10-12 Nov | 11 | **0.725 (offer)** | 0.767 |
| 17-18 Nov | 18 | 0.767 | 0.766 |
| **27-28 Nov** | **28** | **0.766** | **0.766** |
| 1-2 Dec | 32 | 0.902 | 0.902 |
| 11-13 Dec | 42 | 0.902 | 0.902 |
| 18-20 Dec | 49 | 0.901 | 0.901 |
| 23-26 Dec | 54 | 0.900 | 0.900 |
| 18-26 Dec (8n, weekly) | 49 | 0.765 | 0.765 |

**New evidence for a-airbnb-rules.** 27 Nov was 0.901 at 29 days out (29 Oct) and is **0.766 at 28 days out** today. The extra 0.85 step therefore starts at exactly 28 days out:
- That matches the *old* Smoobu rule "last-minute -15% within 28 days" (policy `pricing_rules_listing_A/B`).
- It does not match the 21 Oct setting "-10% within 14 days".
- The flat 0.90 beyond 28 days persists, and its cause is still unknown.
- The Smoobu and Airbnb rule settings were not read, so the cause is inferred.

### Trend vs 29 Oct (same comp ids, same stays, like for like)
**Comps:**

| Stay | n | Median change | Detail |
|---|---|---|---|
| 31 Oct | 2 | 0% | |
| 10-12 Nov | 6 | 219.0 → 217.5 (-0.7%) | 1411449348357673454 -2.7%, 1761224847419174970 +0.9% |
| 24-26 Nov | 8 | 236.75 → 237.0 | 1014671215040555613 -3.0% |
| 27 Nov | 1 | 393.6 → 394.0 | |
| 11-13 Dec | 2 | 281.5 → 279.75 | |
| 18-20 Dec | 4 | 303.0 → 303.75 | |
| 23-26 Dec | 2 | 241.17 → 238.17 | |
| 18-26 Dec | 2 | 196.82 → 194.88 | |

**Ours (3090701 / 3064856):**

| Stay | 3090701 | 3064856 |
|---|---|---|
| 31 Oct-2 Nov | 218.5 → 216.5 | 193.5 → 191.5 |
| 10-12 Nov | 225.5 → **215.0** (Special offer) | 199.0 → 197.0 |
| 17 Nov | 359 → 341 | 359 → 360 |
| 27 Nov | 460 → **386** (28-day step) | 460 → **409** (28-day step) |
| 11-13 Dec | 283.0 → 295.5 | 295.5 → 295.5 |
| 18-20 Dec | 281.5 → 290.0 | 293.5 → 290.0 |
| 23-26 Dec | 247.67 → 257.67 | 259.33 → 257.67 |
| 18-26 Dec | 188.62 → 196.62 | 198.62 → 196.62 |

**PriceLabs 2 BR NL summary:** 191 / 230 / 283 / 362 → **191 / 226 / 282 / 348**.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights: `prices.csv` 30 Oct shows 31 Oct-18 Nov all Booked, then Blocked from 19 Nov (policy handback). Booked 100% vs market 29% (`kpi_pack`).

No comps, percentile, rating or supported premium: there is nothing to price.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack`: in_smoobu false, no PriceLabs data), so we have no price of our own. Price percentile, rating, review gap and supported premium are **NOT CHECKED**, and no comps were built.

## Data gaps:
1. Booking.com comps were NOT CHECKED; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. December and single-night comp coverage is thin:
   - n=2 on 11-13 Dec, 23-26 Dec and 18-26 Dec
   - n=0 on 17 Nov, and n=1 on 27 Nov and 1 Dec

   Most comps were not returned for those stays. I used market percentiles and the wider sample instead, labelled as such.
3. The daily market percentiles are from the 28 Oct `future_prices` pull (two days old). No 3064856 pull exists for 29 or 30 Oct, and I did not pull one, to keep PriceLabs calls minimal.
4. Who set, and why, the Airbnb "Special offer" on 3090701 for 8-12 Nov was NOT CHECKED. Whether it extends beyond the stays searched was also NOT CHECKED.
5. Why Smoobu 3090701 holds the 3064856 rates from 1 Dec was NOT CHECKED (PriceLabs sync and last push for 3090701 were not read).
6. The Airbnb ratios assume £150 cleaning and no extra-guest fee at 4 guests.
7. The mapping of Airbnb ids to Smoobu ids is "likely / probable" (policy `airbnb_listings_24oct`). It is consistent with today's prices up to 30 Nov.
8. P16, P18 and P19 have no data.

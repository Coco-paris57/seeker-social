# Competitor positioning: WEST + HERTS (D = 2026-11-03)

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only and made one at a time:
1. `get_neighbourhood_data` 3064856 (detail, future_prices + occupancy), saved to `scratchpad/west03/dl/neigh_3064856.json`
2. `get_user_logs` (listing, 3064856 + 3090701, 2-3 Nov)
3. `get_listing_date_overrides` 3064856 (3 Nov-3 Jan)

Other inputs:
- **Airbnb public search pages,** checked 2026-11-03: plain `curl` to airbnb.co.uk, default headers. No block or bot check was met. Booking.com was not loaded.
- **Our prices:** `data/snapshots/2026-11-03/raw/prices_3064856.json` / `prices_3090701.json`. Both were last refreshed **2 Nov 15:06Z**, after Reyhan's 15:05Z edits.
- **Occupancy** (`reports/2026-11-03/kpi_pack.json`): P13 is booked **72.4% vs a market of 41%** over 30 days (+31 pts) and **52.5% vs 36%** over 60 days (+16.5 pts). kpi_pack forward occupancy may include Smoobu-cancelled nights; I did not re-derive it.
- **2-bed market summary** (`raw/neighbourhood_P13.json`): P25 188 / P50 224 / P75 280 / P90 347, n=117. P50 was 225 yesterday.

**Method** (same as 2 Nov):
- **Comp set:** the same 11 Airbnb comp ids from `data/snapshots/2026-11-02/comps.csv`. **All 11 are active** (each was returned on at least one stay today) and none were replaced.
- **Search settings:** 4 guests, entire home, at least 2 bedrooms. Each stay used a 1.3 km box around P13 plus a 0.2 km box around each comp.
- **Price basis:** the Airbnb all-in total ÷ nights, with cleaning (£150 on ours) and fees included and no taxes shown separately. Comps and our listings use the same basis.
- **Rows written:** `data/snapshots/2026-11-03/comps.csv` was missing, so I copied the 2 Nov file forward under `flock .comps.csv.lock`, then **appended 143 rows** (11 comps × 13 stays). Filter on `source` containing "checked 2026-11-03". Under `.channel_checks.csv.lock` I also copied forward `channel_checks.csv` and appended **22 rows** for our two listings.
- **Recompute check:** `snapshot.load('2026-11-03')` then `comp_summary` on the 11-13 Nov rows gives n=6 and median 216.25. 3090701 comes out at P33 / -0.6% and 3064856 at P0 / -11.9%, which matches the tables below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table
- All prices are Airbnb all-in £/night incl. cleaning, checked 2026-11-03, 4 guests. A blank cell means the comp was not returned for that stay (booked or min-stay).
- Cancellation policy was NOT CHECKED.
- The 8-13 Nov and 18-26 Dec figures are after length-of-stay discounts (comps and ours alike).

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 3-4 Nov | 6-8 Nov* | 8-10 Nov | 10-12 Nov | 11-13 Nov | 8-13 Nov (5n) | 17 Nov | 27 Nov | 1 Dec | 11-13 Dec | 18-20 Dec | 23-26 Dec | 18-26 Dec (8n) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.82 (11) | garden view, balcony | 261 | | | 258.5 | | | | | | | | | |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | | | 207 | | 207 | | | | | | | | |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | | | 218 | 218 | 218 | 186.8 | | | | | | | |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.27 (11) | private garden | | | 208 | 210.5 | 215.5 | 166.0 | | | | 276 | 268.5 | 232 | 201 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | | 227 | 189 | 203.5 | 206 | 166.2 | | | | | | | |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | | | | | | | 200 | | | | | | |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | | | | | | | | | | 283.5 | 273 | 242.67 | 187.38 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath | | 425.5 | 411 | 411 | 411 | 385.2 | | | | | 450 | | |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.61 (82) | paid parking | | | 217 | 217 | 217 | 199.0 | | | | | | | |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite | | | | | | | | 394 | 423 | | 331.5 | | |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | | | | | | | 200 | | | | | | |
| **Comp median (n)** | | | **4.78 (13)** | | 261 (1) | 326.25 (2) | **212.5 (6)** | **217.5 (6)** | **216.25 (6)** | **186.8 (5)** | 200 (2) | 394 (1) | 423 (1) | 279.75 (2) | **302.25 (4)** | 237.34 (2) | 194.19 (2) |
| Wider 2-bed sample median (n) | | | | | 259 (4) | 284 (11) | 230.5 (16) | 227 (19) | 248.5 (19) | 264 (23) | 200 (5) | 344.5 (4) | 423 (1) | 320.5 (15) | 295 (14) | 293.33 (23) | 289.94 (20) |
| **Ours 1587576514709814818** (3090701) 4.67 (9) | | 6 | | terrace | not returned (orphan, min 2) | booked | **210.5** | **215** | **215** | **176.4** (strike £963 → £882) | **309** | **337** | **324** | **290.5** | **287.5** | **259** | **196.75** (strike £1,825 → £1,574) |
| **Ours 1571600691689064213** (3064856) 4.31 (13) | | 6 | | terrace, skyline view | not returned (orphan, min 2) | booked | **186.5** | **190.5** | **190.5** | **150.4** (strike £819 → £752) | **281** | **408** | **389** | **290.5** | **287.5** | **259** | **196.75** (strike £1,825 → £1,574) |

\* 6-8 Nov is the default Fri-Sun stay. We are booked or linked-blocked on those nights, so it is only an activity check on the comps.

**Coverage:**
- The 30-day date is 3 Dec, but we are booked then, so **1 Dec** stands in for it.
- The midweek Tue-Thu stay is **10-12 Nov**.
- The wider sample is every 2-bed entire home with at least 10 reviews within 1.45 km. It is taken from search cards, is not vetted, and is context only (`scratchpad/west03/dl/wide.json`).

### Price percentile, rating, review gap, supported positioning
**Rating and reviews:**
- The comp median is **4.78** with **13** reviews, unchanged from yesterday. No comp gained a review.
- 3090701: **4.67 (9)**, which is -0.11 vs the median and 4 reviews behind. `quality_premium` = **-0.044**.
- 3064856: **4.31 (13)**, which is -0.47 vs the median and level on reviews. `quality_premium` = **-0.15** (capped).
- Neither listing has Superhost, Guest favourite or a lift. 3064856 is in Airbnb's bottom-10% quality bucket (policy `airbnb_listings_24oct`).

**`recommend` inputs:** stays under 30 days out use the 30-day lead (+31 pts); stays from 11 Dec use the 60-day lead (+16.5 pts). The "PL nightly" column is the PriceLabs `price` field, compared with today's daily market P25/P50/P75 (2-3 BR band) on the same nights. Wherever the comp count is under 3, `recommend` uses the market percentile instead.

| Stay | Listing | Ours (Airbnb) | Comp median (n) | Comp pctl | vs median | Wider pctl | PL nightly vs mkt P50 (mkt pctl) | `recommend` |
|---|---|---|---|---|---|---|---|---|
| 8-10 Nov | 3090701 | 210.5 | 212.5 (6) | P50 | **-0.9%** | P25 | 177 vs 204.5 (-13%, ~P31) | raise +10% |
| | 3064856 | 186.5 | 212.5 (6) | P0 | **-12.2%** | P0 | 145.5 vs 204.5 (-29%, below P25 167.5) | raise +10% |
| 10-12 Nov (Tue-Thu) | 3090701 | 215.0 | 217.5 (6) | P33 | **-1.1%** | P21 | 183 vs 206 (-11%, ~P35) | raise +10% |
| | 3064856 | 190.5 | 217.5 (6) | P0 | **-12.4%** | P5 | 150.5 vs 206 (-27%, below P25 166.5) | raise +10% |
| **11-13 Nov (12 Nov match)** | 3090701 | 215.0 | 216.25 (6) | P33 | **-0.6%** | P21 | 183 vs 210 (-13%, ~P32) | raise +10% |
| | 3064856 | 190.5 | 216.25 (6) | P0 | **-11.9%** | P5 | 150.5 vs 210 (-28%, below P25 171.5) | raise +10% |
| 8-13 Nov (5n) | 3090701 | 176.4 | 186.8 (5) | P40 | -5.6% | P13 | 180.6 vs 207 (-13%, ~P33) | raise +10% |
| | 3064856 | 150.4 | 186.8 (5) | P0 | -19.5% | P0 | 148.6 vs 207 (-28%, ~P22) | raise +10% |
| 17 Nov (single) | 3090701 | 309 | 200 (2) | P100 | +54.5% (n=2) | P80 (n=5) | 207 vs 207 (0%, P50) | mkt: raise +10% |
| | 3064856 | 281 | 200 (2) | P100 | +40.5% (n=2) | P80 | 170 vs 207 (-18%, P25) | mkt: raise +10% |
| 27 Nov (single) | 3090701 | 337 | 394 (1) | P0 | -14.5% (n=1) | P25 (n=4) | 244 vs 240 (+2%, ~P52) | mkt: raise +10% |
| | 3064856 | 408 | 394 (1) | P100 | +3.6% (n=1) | P100 | 336 vs 240 (+40%, above P75 302) | mkt: raise +5% |
| 1 Dec (single) | 3090701 | 324 | 423 (1) | P0 | -23% (n=1) | n=1 | 227 vs 226 (0%, P50) | intentional (+50% min 1, policy `intentional_overrides`), no proposal |
| | 3064856 | 389 | 423 (1) | P0 | -8% (n=1) | n=1 | 312 vs 226 (+38%) | intentional, no proposal |
| 11-13 Dec | both | 290.5 | 279.75 (2) | P100 | +3.8% (n=2) | P33 | 239 vs 244.5 (-2%, ~P47) | mkt: raise +10% |
| 18-20 Dec | both | 287.5 | 302.25 (4) | P50 | **-4.9%** | P43 | 236 vs 250.5 (-6%, ~P42) | raise +10% |
| 23-26 Dec | both | 259.0 | 237.34 (2) | P100 | +9.1% (n=2) | **P13** | 232 vs 271 (-14%, ~P32) | mkt: raise +10% |
| 18-26 Dec (8n) | both | 196.75 | 194.19 (2) | P50 | +1.3% (n=2) | **P5** | 232.6 vs 261.2 (-11%, ~P36) | mkt: raise +10% |

**Supported positioning (one line each):**
- **3090701: -4% vs the comp median** (quality -0.044: 4.67 vs 4.78, 9 vs 13 reviews). On the November 2-night stays it is now at -0.6% to -1.1% (P33-P50), against +2.4% to +4.9% yesterday. That is still about 3-4 pts above its quality line on Airbnb, supported by demand (+31 pts), and 11-13% below market P50 on the PriceLabs price.
- **3064856: -15% vs the comp median** (quality capped at -0.15: 4.31 vs 4.78). On the November 2-night stays it is at -12% (P0), against -7% to -9% yesterday, which leaves it 3 pts above its floor. Its PriceLabs price is **below market P25 on every night 8-12 Nov**.

### What changed since 2 Nov (2 Nov 15:05Z, Reyhan; `get_user_logs`, confirmed by `get_listing_date_overrides`)
**1. The -5% is back on 8-12 Nov, on both listings** (copied to 3090701 as a child).
- This is the same conflict as before: **policy `price_changes` 24 Oct sets 8-12 Nov at 0%.**
- Yesterday's section reported it fixed after Reyhan's 00:12Z removal. It is **not fixed any more**.
- **Corentin needs to confirm which setting stands.** This is reported as a conflict, not a new proposal.

**2. December 7-20 is at -5%** (Reyhan had moved it from -5% to -2% at 00:12Z, then back to -5% at 15:05Z). No standing decision covers December prices.

**3. Airbnb display followed the -5% (comps are flat):**

| Stay | 3090701 | 3064856 | Comp median |
|---|---|---|---|
| 8-10 Nov | 217.5 → **210.5** (-3.2%) | 192.5 → **186.5** (-3.1%) | 212.5 → 212.5 |
| 10-12 Nov | 223 → **215** (-3.6%) | 197 → **190.5** (-3.3%) | 217.5 → 217.5 |
| 11-13 Nov | 223 → **215** | 197 → **190.5** | 212.5 (n=8) → 216.25 (n=6) |
| 18-20 Dec | 294.5 → **287.5** | 294.5 → **287.5** | 300.5 → 302.25 |

- The one comp move: 1411449348357673454 eased about £1-3/night.
- 1201539290247676065 and 1598588327559113265 dropped out of 11-13 Nov (now booked or min-stay).
- PriceLabs `price` on 12 Nov: 3064856 159 → **151**, 3090701 193 → **183**.

**4. The Airbnb factor now has a simpler explanation** (inferred, not read from the Smoobu screen):
- Room ÷ PriceLabs `price` is **0.90 at 29+ days out** (11-13 Dec, 18-20 Dec, 23-26 Dec) and **0.765 = 0.90 × 0.85 within 28 days**.
- 1 Dec moved into the 28-day band today: same PriceLabs price, Airbnb 355 → 324 / 431 → 389.
- The 5-night 8-13 Nov stay shows a **visible -8.4% strikethrough** on a 0.90 base (0.81 overall) instead of the -15%.
- The 8-night 18-26 Dec stay is 0.90 × 0.85 (weekly).

So there seems to be a hidden -10% on every Airbnb date, with either a last-minute -15% (within 28 days) or a length-of-stay discount on top. Both contradict policy `airbnb_smoobu_settings_21oct.changed_21oct`, which says Airbnb price adjustment 0%, last-minute -10% within 14 days, and no 5-night rule. The hidden -10% and the 28-day -15% match neither the old nor the new rules as recorded. **This is unexplained (a-airbnb-rules); Corentin to check the Smoobu Airbnb rules screen.** Rows are in `channel_checks.csv`.

**5. Twin listings show identical prices on every December stay** (`price` identical 7-26 Dec on 3064856 and 3090701; Airbnb £581 / £575 / £777 / £1,574 on both).
- Policy `P13.twin_listings` says the two must keep slightly different prices or Airbnb may block them as duplicates.
- In November they still differ.
- **a-p13-twin: not fixed.** The policy-compliant move is a small gap, never identical prices.

### Focus: 8-12 Nov run and 12 Nov England v Croatia (a-raise-1012nov)
**Market:**
- 12 Nov P50 is **214**, against 206 on 10 and 11 Nov.
- 12 Nov occupancy is **40.2%**, against 32.5% on 11 Nov and 37.9% on 10 Nov.
- So there is a mild uplift on the night (+4% price, +8 pts occupancy vs 11 Nov).

**Comps:** they show **no event premium**. The 11-13 Nov median is 216.25, against 217.5 on 10-12 Nov.

**Our prices:**
- 3064856 is **£151**, below market P25 (176).
- 3090701 is £183.

**Status: not done, and further away than yesterday** (-5% re-added).

**Evidence-supported level** (market P50 214 × (1 + quality)): 3064856 about **£182**, 3090701 about **£205**. Both are rises, supported by +31 pts demand. Removing the -5% alone would give 159 / 193 (`user_price`). Because of the policy conflict in change 1, this goes to Corentin to confirm, not as a new proposal.

### Focus: 17 Nov and 27 Nov singles (a-p13-orphan-price)
**17 Nov:**
- Only the same 2 comps sell this night, both £200 all-in and sleeping 7. The wider median is 200 (n=5).
- We are £309 / £281 all-in. Most of the gap is our £150 cleaning on one night; the comps' cleaning split is NOT CHECKED.
- PriceLabs `price` is 207 / 170, against market P50 207 and quality lines of about 198 / 176. **At the line in effect.**
- The +35% min-1 override is still set (`get_listing_date_overrides`); `user_price` on 3064856 shows 170 today.

**27 Nov:**
- The +50% min-1 override is still set.
- 3064856's `price` of 336 is +40% vs P50 240 (above P75 302), against a quality line of about £204.
- 3090701's 244 is at P50, against a line of about £229.
- The single comp (1205241472054931937: 5.0, Guest favourite, lift, balcony) is £394.

**Status: not fixed on 27 Nov** (3064856 is about 65% above its quality line).

### Focus: Christmas 18-26 Dec (a-peak-check, P13 part)
**Overrides:**
- 18-20 Dec: -5% (re-cut 2 Nov 15:05Z).
- 21-26 Dec: -3%, min 3.
- 27 Dec: min 7, linked-booked.

So **min 3 on 21-26 Dec still blocks 25 Dec and 26 Dec arrivals.** Not fixed.

**Airbnb:**

| Stay | Ours | vs comps | Wider sample |
|---|---|---|---|
| 18-20 Dec | £287.5 | **-4.9%** (P50, n=4) | P43 |
| 23-26 Dec | £259 | +9.1% (n=2) | **P13** (median 293.33, n=23) |
| 18-26 Dec | £196.75 | +1.3% (n=2) | **P5** (median 289.94) |

**PriceLabs vs market P50:** -6% / -14% / -11% on the three stays. Market occupancy on 23-26 Dec is 39-46%, against 21-33% at the same time last year.

**Quality-supported level for 23-26 Dec** (P50 271 × (1 + q)): 3090701 about **£259** vs £232 today (about 10% under); 3064856 about **£230** (at its level).

`recommend` says **raise +10%**. Reyhan's 18-20 Dec -5% runs against both the comps and the market evidence. No standing decision covers December.

### Base (a-base-review-1102)
Base is **250 on both listings** (`listings.csv` 3 Nov), unchanged, against a PriceLabs recommendation of 237 / 236. Keep 250 and record it, as yesterday: the under-pricing is date-level (8-12 Nov -5%, 12 Nov, 23-26 Dec, the Airbnb 0.90 factor), not the base.

## P10 Hanger Lane, 1-bed (3318177)
**0 sellable nights.** `prices.csv` 3 Nov shows 15 nights Booked and 45 Blocked (policy `handbacks`, last night 18 Nov). It is booked 100% vs a market of 28% (`kpi_pack`).

No comps, percentile or premium: there is nothing to price. Unchanged.

## P02 Ladbroke Grove, P03 Bayswater
Both are blocked on purpose (policy `intentional_blocks`). No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of the three is in PriceLabs or Smoobu (`kpi_pack` 3 Nov: "No priced PriceLabs listing mapped"), so we have no price of our own.

Percentile, rating, review gap and premium are **NOT CHECKED**; no comps were built.

## Data gaps:
1. **Booking.com comps and our Booking.com prices were NOT CHECKED**; the comps are Airbnb only. Cancellation policy per comp was also NOT CHECKED.
2. **Comp coverage is thin:**
   - n=1 on 3-4 Nov, 27 Nov and 1 Dec
   - n=2 on 6-8 Nov, 17 Nov, 11-13 Dec, 23-26 Dec and 18-26 Dec

   Those rows lean on market percentiles and the wider sample, labelled as such.
3. **The comps' cleaning split is unknown,** so all-in comparisons on 1-night stays overstate our gap.
4. **The Airbnb 0.90 / 0.765 factor is inferred** from totals; the Smoobu Airbnb rules screen and Smoobu `/rates` were not read.
5. **3 Nov (tonight) is an orphan** on 3064856: £124, min stay 2, 4 Nov blocked. Neither of our listings was returned for 3-4 Nov, so it is not sellable as set.
6. **The Airbnb-to-Smoobu id mapping is "likely / probable"** (policy `airbnb_listings_24oct`).
7. **kpi_pack forward occupancy** (72.4% over 30 days) may count Smoobu-cancelled nights; it was not re-derived here.
8. **P16, P18 and P19 have no data.** P10 has no sellable nights.

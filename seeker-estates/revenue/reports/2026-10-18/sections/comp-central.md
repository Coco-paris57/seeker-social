# Competitor positioning: CENTRAL/NORTH (D = 2026-10-18)

**Source for every market figure:** PriceLabs neighbourhood data 2026-10-18 (`get_neighbourhood_data`, Nearby Listings source, Airbnb-derived, read-only, checked 2026-10-18). **Our prices:** `data/snapshots/2026-10-18/prices.csv` (`pricelabs_price`). **Occupancy:** `reports/2026-10-18/kpi_pack.json` `forward_occ_30/60` (excludes owner blocks) vs PriceLabs market occupancy.

**Comp table status: NO INDIVIDUAL COMPS.** PriceLabs returned no comp rows for any listing. `get_neighborhood_data_sources` says Competitor Listings (CCC) is "not enabled for this account", there are no Market Dashboard reports, and `ccc_value` is empty. Only Nearby Listings percentile distributions are available. Live OTA checks (Airbnb/Booking/Vrbo): **NOT CHECKED** (blocked from this environment). So no rows were appended to `comps.csv`, and the comp median, rating and review-count comparisons cannot be computed. Everything below compares us with **PriceLabs percentiles** and is labelled that way.

Stay dates (the same for every listing): midweek Tue 20 to Thu 22 Oct (nights 20 and 21), weekend Fri 23 to Sun 25 Oct (nights 23 and 24), 30 days out Tue 17 Nov. PriceLabs "Host-only fee" structure, `cleaning_fee` null: whether cleaning is included in the percentiles is **unknown**. Our prices exclude cleaning.

Two kinds of percentile are used:
- **Same-BR**: the `summary_table` row for the same bedroom count. The payload does not state its date horizon.
- **Daily band**: the daily P25/P50/P75/P90 for the selected bedroom band. This blends bedroom counts (1–3 BR for 2-beds, 0–2 BR for P14, 4–6 BR for P05).
- Our percentile is a linear interpolation between PriceLabs quantile points. "<P25" is scored 0.20 and ">P90" is scored 0.95 when fed to `recommend`.
- `quality_premium` = 0.0 for every listing. Our ratings are blank in `listings.csv`, and PriceLabs gives no comp ratings, so the function returns 0.

## P05 St John's Wood 5-bed (PriceLabs 3166592, smoobu; listed as "4Bed")
PriceLabs classes it as **5 BR** (band 4–6 BR, 162 listings).

| Night | Our price | Status | Band P25 / P50 / P75 / P90 | vs band P50 |
|---|---|---|---|---|
| 20 Oct | 290 | Booked | 474 / 649 / 865 / 1558 | -55% |
| 21 Oct | 295 | Booked | 490 / 688 / 907 / 1534 | -57% |
| 23 Oct | 292 | Booked | 514 / 703 / 959 / 1478 | -58% |
| 24 Oct | 293 | Booked | 516 / 703 / 1005 / 1480 | -58% |
| 17 Nov | 485 | Open | 513 / 705 / 943 / 1421 | -31% |

- **Same-BR:** 5 BR is P25 606 / P50 972 / P75 1308 / P90 1778 (n=34). 4 BR is 461 / 598 / 733 / 1216 (n=115).
- **Where our open price sits:** £485 on 17 Nov is -50% vs the 5 BR median (<P25) and -19% vs the 4 BR median (~P29). Average open price over the next 30 days is £449 (kpi_pack).
- **Booked nights:** the realised booked ADR on the Oct nights is £377–414 (prices.csv `booked_adr`), still below the 4 BR P50.
- **Demand:** forward occupancy 69% vs market 32% (30d), 66% vs 32% (60d).
- **Positioning:** `recommend` returns **raise +10%** ("booked +37% vs market but priced at P20: under-priced").
- **Differentiators:** no lift, 4 floors and no parking justify some discount. Abbey Road, Lord's and Regent's Park location, and 2 bath + WC, do not justify a 50% discount to 5 BR.
- **Listing mismatch:** it is listed as 4-bed. Fixing the bedroom count would move it into the 5 BR comp band.

## P06 Marylebone 2-bed (3288517)

| Night | Our price | Status | Band (1–3 BR) P25 / P50 / P75 / P90 | vs P50 |
|---|---|---|---|---|
| 20 Oct | 261 | Open | 277 / 333 / 420 / 509 | -22% (<P25) |
| 21 Oct | 276 | Open | 281 / 337 / 430 / 510 | -18% (<P25) |
| 23 Oct | 301 | Booked | 293 / 355 / 446 / 521 | -15% (~P28) |
| 24 Oct | 313 | Booked | 295 / 349 / 442 / 518 | -10% (~P33) |
| 17 Nov | 299 | Blocked | 286 / 357 / 444 / 538 | -16% (~P30) |

- **Same-BR:** 2 BR is 309 / 404 / 511 / 617 (n=212). Our 5-night average of £290 is **-28% vs the 2 BR median (<P25)**. The 22–25 Oct booking was taken at a £210.88 ADR.
- **Demand:** forward occupancy, excluding the 31% of nights blocked, is 48% vs market 43% (30d) and **24% vs 40% (60d)**. PriceLabs' 77%/88% includes the blocks.
- **Positioning:** `recommend` returns **raise +5%** on 30d ("in line with market but priced below what quality supports (P20)") and **fix-listing** on 60d ("behind market -16% while already at P20").
- **Reading:** it is already cheap and the far window is still not filling. Treat this as a listing and visibility problem; a price cut would not fix it.
- **Differentiators:** 2nd floor with no lift, street view and no parking explain part of the discount to the median.

## P08 Islington 2-bed (3318167)

| Night | Our price | Status | Band (1–3 BR) P25 / P50 / P75 / P90 | vs P50 |
|---|---|---|---|---|
| 20 Oct | 183 | Booked | 150 / 185 / 232 / 302 | -1% (~P49) |
| 21 Oct | 180 | Booked | 152 / 187 / 227 / 303 | -4% (~P45) |
| 23 Oct | 199 | Booked | 164 / 193 / 249 / 319 | +3% (~P53) |
| 24 Oct | 201 | Booked | 160 / 195 / 244 / 326 | +3% (~P53) |
| 17 Nov | 197 | Open | 143 / 183 / 224 / 313 | +8% (~P59) |

- **Same-BR:** 2 BR is 176 / 215 / 262 / 321 (n=146). Our average of £192 is **-11% (~P35)**.
- **Demand:** forward occupancy 45% vs 50% (30d), **22% vs 43% (60d)**.
- **Positioning:** `recommend` returns **fix-listing** on both horizons ("behind market -21% while already at P35: conversion/visibility problem, not price").
- **Differentiators:** the ground-floor terrace is a plus. Sleeps 5, against 6 for most 2-beds, is a minus.

## P11 Camden 2-bed (3064196)

| Night | Our price | Status | Band (1–3 BR) P25 / P50 / P75 / P90 | vs P50 |
|---|---|---|---|---|
| 20 Oct | 168 | Open | 183 / 231 / 307 / 375 | -27% (<P25) |
| 21 Oct | 160 | Booked | 186 / 233 / 304 / 377 | -31% (<P25) |
| 23 Oct | 173 | Booked | 203 / 253 / 330 / 397 | -32% (<P25) |
| 24 Oct | 181 | Booked | 206 / 260 / 331 / 389 | -30% (<P25) |
| 17 Nov | 221 | Booked | 183 / 237 / 298 / 383 | -7% (~P43) |

- **Same-BR:** 2 BR is 233 / 291 / 341 / 391 (n=172). Our average of £181 is **-38% (<P25)**. Booked ADR on the Oct nights is £151.80; last-30 ADR is £152 (kpi_pack).
- **Demand:** forward occupancy 59% vs 47% (30d), **68% vs 39% (60d)**.
- **Positioning:** `recommend` returns **raise +10%** ("booked +29% vs market but priced at P20: under-priced").
- **Differentiators:** basement, no lift and no parking justify a discount but not -38%. The patio and Camden Town location help.

## P14 Primrose Hill 1-bed (3267077) - min price £500

| Night | Our price | Status | Band (0–2 BR) P25 / P50 / P75 / P90 | vs P50 |
|---|---|---|---|---|
| 20 Oct | 500 | Open | 166 / 205 / 264 / 325 | +144% (>P90) |
| 21 Oct | 500 | Open | 168 / 206 / 264 / 325 | +143% (>P90) |
| 23 Oct | 500 | Open | 175 / 211 / 266 / 337 | +137% (>P90) |
| 24 Oct | 500 | Open | 175 / 208 / 265 / 336 | +140% (>P90) |
| 17 Nov | 500 | Open | 160 / 210 / 260 / 319 | +138% (>P90) |

- **Same-BR:** 1 BR is 145 / 192 / 233 / 292 (n=174). We sit at **+160% vs the median and 71% above P90**. We are also above the **2 BR** P90 of £447.
- **Demand:** forward occupancy 0% vs market 42% (30d) and 38% (60d). Last 365 days: 10 nights at a £410 ADR.
- **Positioning:** `recommend` returns **lower -7%** ("behind market -42% at P95: priced above demand").
- **Why -7% will not work:** -7% gives £465, which is still >P90. More importantly, the **£500 minimum blocks any downward move**, so PriceLabs cannot act.
- **Differentiators:** the roof terrace, yoga room, house over 4 floors, sleeps 4 and 1 parking space justify a premium, plausibly up to the 1 BR P90 or the 2 BR P75 (£292–356). They do not justify £500.

## P17 St John's Wood 1-bed
**NOT IN SYSTEMS.** It is in neither PriceLabs nor Smoobu, and there are no prices or KPIs, so no analysis was done.

## Data gaps:
1. No individual comps for any property. PriceLabs CCC is not enabled and there are no Market Dashboard reports, so none of the 6–12 comp sets, comp ids, ratings, review counts or Superhost flags exist. comps.csv was not appended to (header only).
2. Live OTA checks (Airbnb/Booking/Vrbo): NOT CHECKED.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` = 0 for all and the rating gaps are unknown.
4. Daily percentiles blend bedroom counts. The same-BR `summary_table` has no stated date horizon.
5. Whether cleaning fees are included in the PriceLabs percentiles is unknown.
6. Several of "our prices" on booked nights are PriceLabs list prices, not the realised booked ADR. Where booked ADR is available it is quoted.
7. The P05 bedroom count conflicts: 5-bed in properties.py and PriceLabs, 4-bed in the listing title.
8. `market.csv` is empty in the snapshot. The percentiles above were not written to it (out of scope for this section).
9. P17 is not in any system.

# Competitor positioning: WEST + HERTS (D = 2026-10-18)

**Sources.** PriceLabs neighbourhood data, pulled 2026-10-18 (read-only `get_neighbourhood_data`, Nearby Listings (NL) source, Airbnb, GBP, host-only fee structure: cleaning fee excluded, tax 0). Our prices come from `data/snapshots/2026-10-18/prices.csv`, reservations from `reservations.csv` and KPIs from `reports/2026-10-18/kpi_pack.json`.
**Live OTA checks (Airbnb/Booking/Vrbo): NOT CHECKED.** These sites are blocked from this environment.
**Individual comps: none available.** PriceLabs returned no comp rows (no nearby_listings, no competitor_analytics). `get_neighborhood_data_sources` reports *CCC: "Competitor Listings source is not enabled for this account"* and *MD: "No Market Dashboard reports available"*. So every comparison below uses **PriceLabs percentile prices, not a comp median**. Comp rating and review gaps cannot be computed, and no rows were appended to `comps.csv`.

Stay dates priced: midweek Tue 20 to Thu 22 Oct (nights 20, 21), weekend Fri 23 to Sun 25 Oct (nights 23, 24), and 30 days out Tue 17 Nov.
Percentile position = linear interpolation between PriceLabs P25/P50/P75/P90 (labelled *interp*). For positioning I use the **bedroom-matched** summary_table percentiles. The daily series is shown for context, but for P03 (Studio to 5BR) and P10 (Studio to 2BR) it mixes bedroom bands.
`quality_premium` = 0.0 for every property because we have no comp ratings and `listings.csv` has empty rating fields.

## P02 Notting Hill W10, 1-bed (2999946 smoobu)
| Source (PriceLabs NL, 1BR only, n=211, 2026-10-18) | 20 Oct | 21 Oct | 23 Oct | 24 Oct | 17 Nov | Next-30 summary |
|---|---|---|---|---|---|---|
| Market P25 / P50 / P75 / P90 | 150/186/226/293 | 149/191/224/296 | 150/193/234/293 | 149/188/232/294 | 150/179/211/250 | 161/188/222/269 |
| Market occupancy % | 62.9 | 60.0 | 61.9 | 64.6 | 27.7 | 45.2 (30d avg) |
| Our PriceLabs price | 133 (booked) | 135 (booked) | 141 (booked) | 162 (booked) | 170 (blocked) | 164.6 avg |

- Our price is £164.6 (30-day average). Market median (not a comp median) is £188, which puts us at about **P28** (interp), **-12.4%** vs median.
- Realised rates are much lower. Confirmed Booking.com stay 17–24 Oct: £651.88 / 7 = **£93/night**. Airbnb 24–28 Oct: £417.24 / 4 = **£104/night**. Both are below 1BR P25 (£149–150) and **45–50% under** the same-date P50 (£188–193).
- Occupancy: 65.5% of the next 30 nights are blocked. PriceLabs occupancy including blocks is 97%. Booked occupancy is 31%, or about 90% of sellable nights, against a 48% market. Four Booking.com cancellations were in the window.
- Positioning: `recommend(0.90, 0.48, P28, q=0)` gives **raise +10%**. We are booked well ahead of market but priced at P28. The move only matters past the blocked window, because about 1 night is open in the next 30. The cause of the blocks needs confirming.

## P03 Bayswater, 3-bed (518457d0…, channex)
| Source (PriceLabs NL, 2026-10-18) | P25 | P50 | P75 | P90 | n |
|---|---|---|---|---|---|
| 3BR summary (bedroom-matched) | 353 | 445 | 527 | 712 | 27 |
| Daily, Studio–5BR mixed (context only): 23 Oct / 24 Oct / 17 Nov P50 | 246 / 238 / 223 | | | | 319 |

- All 30 nights are **unavailable** (prices.csv has an empty status and available=False). PriceLabs `fully_blocked_next_360 = true`, unavailable occupancy is 100% on every priced date, and pickup over the past 30 days was 3.
- The underlying list price is £288.7 (30-day average). That is **below 3BR P25 (£353)** and **-35.1% vs 3BR P50 (£445)**. Our £245–305 on the priced dates only looks close to market because the daily series mixes Studio to 5BR.
- Positioning: `recommend` gives **collect-data**. With zero sellable nights, no positioning can be supported. If the block is not intentional (long let, works, owner use), this is the largest loss in the batch.

## P10 Hanger Lane, 1-bed (3318177 smoobu)
| Source (PriceLabs NL, Studio–2BR band, n=174, 2026-10-18) | 20 Oct | 21 Oct | 23 Oct | 24 Oct | 17 Nov | 1BR summary |
|---|---|---|---|---|---|---|
| Market P25 / P50 / P75 / P90 | 110/135/163/213 | 111/131/168/214 | 116/140/172/213 | 115/138/173/217 | 110/133/161/201 | 110/125/149/185 (n=117) |
| Market occupancy % | 46.0 | 47.3 | 45.9 | 50.6 | 20.7 | 32.7 (30d avg) |
| Our PriceLabs price (all booked) | 148 | 152 | 157 | 172 | 165 | 161.4 avg |

- The list price of £161.4 is about **P80** (interp) of 1BR, **+29.1%** vs P50 £125. That list price is not what sold, though: all 30 nights are a single Airbnb stay from 18 Oct to 19 Nov (32 nights, £3,390.85, booked 9 Oct), which works out to **£106/night**. That is below 1BR P25 (£110) and **-15.2% vs P50**.
- Occupancy: 100% next 30 vs 32% market. Next 60 is 52.5% vs 25%.
- Positioning: `recommend(1.00, 0.32, P80, q=0)` gives **raise +5%** for nights 31–60 ("booked +68% vs market at P80: test a further step up"). Also review the long-stay or monthly discount, since a month sold at a sub-P25 rate.

## P13 Shepherd's Bush, 2-bed (3064856 smoobu)
| Source (PriceLabs NL, 2–3BR band, n=149, 2026-10-18) | 20 Oct | 21 Oct | 23 Oct | 24 Oct | 17 Nov | 2BR summary |
|---|---|---|---|---|---|---|
| Market P25 / P50 / P75 / P90 | 172/209/263/341 | 175/209/264/340 | 183/221/279/348 | 185/219/295/355 | 164/213/267/334 | 185/225/283/345 (n=116) |
| Market occupancy % | 58.7 | 50.1 | 58.8 | 62.8 | 23.8 | 36.9 (30d avg) |
| Our PriceLabs price | 134 (blocked) | 137 (blocked) | 160 (booked) | 171 (booked, £176.71) | 191 (open) | 191.5 avg of 17 open nights |

- Open-night average is £191.5, about **P29** (interp) of 2BR, **-14.9%** vs P50 £225. On the 30-day-out date (17 Nov) we are open at £191 against a daily P50 of £213, which is about P39.
- Forward occupancy for the next 30 days is **6.9%** vs **42%** market (2 nights on the books). 37.9% of nights are blocked, and pickup over the last 7 days was 2 bookings, both in Nov/Dec. Two large cancellations hit the window: Booking.com 19–28 Oct (£1,468.26) and Vrbo 12 Oct – 2 Nov.
- Differentiators that should support at least the median: 4th floor, large private terrace, lift to 3rd, Westfield/Notting Hill location.
- Positioning: `recommend(0.069, 0.42, P29, q=0)` gives **fix-listing, 0%**. We are 35 points behind market while already below median, so this is a conversion or visibility problem rather than price. Check whether the 20–22 Oct blocks are leftovers from the cancelled Booking.com stay (inference, not verified).
- PriceLabs holds 9 stored competitor ids for this listing (`ccc_value`). Their prices and attributes are not retrievable because CCC is not enabled, and PriceLabs flags 4 of them as not available: 1005061063514560356, 1570197746699002950, 1250070192114533514, 1486229821582027419. The 5 still active are 5591223, 1571600691689064213, 664455137006631810, 1134852333471640679 and 1536596800590150919. These ids are not written to comps.csv because their bedrooms, sleeps and reviews are unverified.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
NOT IN SYSTEMS (not in PriceLabs or Smoobu). No analysis.

## Data gaps:
1. No individual comps for any property: PriceLabs CCC is not enabled, there are no Market Dashboards, and NL returns aggregates only. So there is no comp median, comp rating or review-count gap, and 0 rows were appended to comps.csv.
2. Live OTA prices: NOT CHECKED (Airbnb, Booking and Vrbo are blocked).
3. Our ratings and review counts are empty in listings.csv, so quality_premium defaults to 0.
4. The P03 and P10 daily percentile bands are not bedroom-matched (Studio–5BR and Studio–2BR). Positioning uses the summary_table bedroom row instead.
5. Percentile positions are interpolated from 4 PriceLabs percentiles, not ranked against a comp sample.
6. P02 (66%) and P03 (100%) block reasons are unknown. P02's Vrbo listing last pushed on 2026-02-24.
7. P13 has three PriceLabs listings (3064856, 3090701, Vrbo 12037152). Only 3064856 is analysed here.
8. P16, P18 and P19: NOT IN SYSTEMS.

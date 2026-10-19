# Competitor positioning: EAST batch (D = 2026-10-19)

**Source for every market figure:** PriceLabs Nearby Listings data, pulled 2026-10-19 through the read-only `get_neighbourhood_data` call (include_prices, include_competitors, include_future_prices). All six calls returned `all_operations_ok = true`. Raw payloads are saved as `data/snapshots/2026-10-19/raw/neighbourhood_<ref>.json`.

**No individual comps.** PriceLabs Competitor Listings are not enabled on this account and there are no Market Dashboards. Today, as yesterday, the payload had no nearby_listings or competitor_analytics rows. Live OTA checks (Airbnb, Booking, Vrbo) were **NOT CHECKED** because they are blocked from this environment. As a result there is no comp table, comp median, comp rating or review gap, and no comp ids to track. I added **0 rows** to `comps.csv`. The bedroom-matched percentiles went into `market.csv` instead, with their source stated. Every figure below is a **PriceLabs percentile, not a comp set**.

Two benchmarks are used:
- **Bedroom-matched table** (`summary_table`) gives P25/P50/P75/P90 for listings with the same bedroom count. The payload does not say which forward window it covers. All percentile positions below are measured against this table.
- **Daily series** (`future_prices`) gives P25/P50/P75/P90 and the market's median booked price ("booked P50") for each stay date. It is **blended across bedroom counts** (1-3 BR for P01/P20, 2-3 BR for P12, Studio-2 BR for P09, Studio-10 BR for P04), so for 2-beds it understates the like-for-like market.

How the numbers were built:
- **Stay dates:** Fri 23 and Sat 24 Oct (Fri-Sun stay), Tue 27 and Wed 28 Oct (Tue-Thu stay), Tue 18 Nov (30 days out).
- **Our price:** the PriceLabs price from `prices.csv`, which equals Smoobu. It excludes taxes. PriceLabs does not say whether it includes cleaning.
- **Percentile method:** linear interpolation between the P25/P50/P75/P90 points, the same method as yesterday. Yesterday's percentiles were recomputed against today's table so the change is like-for-like. P12's table moved (P25 174 to 167), so yesterday's P12 figure reads P64 here, not the P60 reported yesterday.
- **Quality adjustment:** our ratings are blank in `listings.csv` and there are no comp ratings, so `quality_premium(None, None) = 0.0` for every listing. That zero is a default, not evidence.
- **Occupancy:** from `kpi_pack.json` (forward_occ vs market_occ).

## Position after yesterday's base changes (percentile today vs yesterday)

| Ref | Base | Avg price, next 30 nights: yesterday / today | Avg price, open nights in next 30: yesterday / today | Open nights 31-60 days out: yesterday / today | Booked next 30, us vs market | `recommend` (30 days) |
|---|---|---|---|---|---|---|
| P01 Canary Wharf 2BR | 230 to 253 | 212.3 (<P25) / 234.6 (**P33**) | none open | 256.6 (P45) / 285.6 (**P57**), 18 nights | 100% vs 33% | raise +10% |
| P04 Barking 2BR | 220 (no change) | 166.8 (P54) / 167.7 (**P54**) | 176.1 (P58) / 178.6 (P59), 14 nights | 201.5 (P69) / 201.5 (P69) | 48% vs 28% | raise +10% |
| P09 Greenwich 1BR | 160 to 176 | 149.4 (P62) / 166.2 (**P75**) | 151.6 (P64) / 168.1 (P76), 12 nights | 178.9 (P80) / 196.5 (**P87**) | 59% vs 38% | raise +5% ("test a further step") |
| P12 Mile End 2BR | 270 to 284 | 224.9 (P64) / 238.6 (**P73**) | 228.8 (P66) / 240.6 (P74), 13 nights | 267.1 (P82) / 292.7 (**P90**) | 55% vs 40% | raise +10% (P73 is just under the P75 cut-off) |
| P20 Waterford Court 2BR | 350 (min 220) | n/a / 252.4 (P49) | n/a / 254.6 (**P50**), 26 nights | n/a / 332.6 (**P77**), 30 nights | **10% vs 35%** | fix-listing (next 30); lower -7% (31-60 days out) |

My reading, which is a judgement call and not the mechanical output:
- **P01** has moved from below P25 to P33. Its next 30 nights are fully booked, so the new base only affects nights 31-60 days out, which moved from P45 to P57. Those nights are 70% booked against a 25% market, so the case for P01 being under-priced still holds. PriceLabs' own recommended base is 231, below the 253 now set.
- **P09** is now at the upper-quartile edge (P75, and P87 for 31-60 days out). **P12** is at P73, P90 for 31-60 days out, and its 90-day pace is -25% revenue vs the same time last year (-10 nights). Both raises are one day old and no bookings have come in since. Hold both for about 7 days of pickup before taking the further step `recommend` suggests.
- **P04** had no base change. Its position is unchanged.

## Same-date check (our price vs PriceLabs daily series; percentile vs bedroom-matched table)

| Ref | Fri 23 Oct | Sat 24 Oct | Tue 27 Oct | Wed 28 Oct | Tue 18 Nov |
|---|---|---|---|---|---|
| P01 (2BR: 220/266/332/419) | 218 booked, <P25 (daily P50 236) | 241 booked, P36 (232) | 223 booked, P27 (225) | 227 booked, P29 (226) | 231 booked, P31 (218) |
| P04 (2BR: 127/159/214/301) | 160 booked, P50 (179) | 172 booked, P56 (178) | 150 booked, P43 (164) | 157 booked, P48 (167) | 169 open, P55 (167) |
| P09 (1BR: 110/134/165/206) | 169 booked, P76 (149) | 190 booked, P84 (145) | **169 open, P76** (140) | **168 open, P76** (139) | 152 booked, P65 (140) |
| P12 (2BR: 167/204/242/293) | 189 booked, P40 (211) | 199 booked, P47 (204) | **209 open, P53** (189) | **230 open, P67** (189) | 236 booked, P71 (197) |
| P20 (2BR: 216/254/319/401) | 232 booked, P36 (228) | 246 booked, P45 (226) | **232 open, P36** (214) | **236 open, P38** (215) | **283 open, P61** (211) |

Daily series P25/P75/P90 and booked P50 per date are in the raw payloads. All booked P01 nights realise an ADR of 152-162. P12 on 17 Nov is priced at 377, above the daily P90 of 320. It was 358 yesterday, so it is still an isolated spike to check.

## P07 Woolwich 1-bed (3288427 smoobu)
Blocked on purpose (policy). No pricing advice and excluded from all occupancy and opportunity findings.

## P15 Bow / Devons Road 1-bed
**NOT IN SYSTEMS** (not in PriceLabs or Smoobu). No analysis.

---

## P20 Waterford Court, Canary Wharf 2-bed (3547481 smoobu): first positioning
Facts on file: PriceLabs lists 2 bedrooms at 51.4960, -0.0159, which is **0.67 km from P01**. P20 is **not in `build/properties.py`**, so sleeps, floor, view, balcony and lift are unknown. Settings are min 220, base 350, max 1800, with min-stay 3 (4 on some December weekends). PriceLabs recommended base shows "Unavailable" (new listing).

Booking history: 2 Airbnb bookings, both confirmed.
- 10-18 Oct: 8 nights, £1,854.40 (£231.80 per night), booked the same day.
- 22-25 Oct: 3 nights, £537.84 (£179.28 per night), booked 17 Oct.

Booked next 30 nights is 10% vs a 35% market; next 60 is 5% vs 27%.

Positioning against the PriceLabs 2BR percentiles (n=151): P25 216 / P50 254 / P75 319 / P90 401.

| Horizon | Our avg open price | vs 2BR P50 | Bedroom-matched percentile | Daily-series percentile (1-3BR blend) | vs market booked P50 |
|---|---|---|---|---|---|
| Next 30 (26 open nights) | 254.6 | +0.2% | P50 | P51-P77 by night, avg P62 | +27% (200.7) |
| 31-60 days out (30 open nights) | 332.6 | +31% | P77 | P79 to above P90 (27-28 Nov, 4-5 Dec, 18 Dec above P90) | about +65% |

Why 10% vs 35%: what the evidence supports, strongest first.
1. **The listing is new and probably has few or no reviews.** It has 2 bookings and 11 nights of history, and its ratings are blank (review count unverified). At the 2BR median, a listing with no track record does not convert at market pace. `recommend(0.103, 0.35, 0.50)` returns **fix-listing**: "behind market -25% while already at P50: conversion/visibility problem, not price". Using the daily percentile (P62) gives the same answer.
2. **The price climbs steeply as the dates get further out.** For 31-60 days out the average is P77, with several nights above P90, and that window is 5% booked vs 27%. `recommend(0.051, 0.27, 0.77)` returns **lower -7%**: "priced above demand". The base of 350 sits at about P81 of the 2BR table. PriceLabs' prices with default customizations average 268 over the next 30 nights, which is higher still, so the base is lifting prices rather than holding them down.
3. **The minimum works as a floor at the market median.** The min of 220 is at or above the daily P50 (207-237) on almost every night in the next 30. PriceLabs cannot take this unreviewed listing below the median, and the only flexible tool left is the min.
4. **The one booking made with notice cleared at £179.28.** That booking (22-25 Oct, 3 nights) paid 23% below the PriceLabs price on those nights (average 233.7) and **below the daily P25** (185-193). No length-of-stay discount applies to 3 nights. The cause is unknown: possibly an Airbnb new-listing promotion or a manual discount. Ask before assuming.
5. **P01, our own 2-bed 0.67 km away, is cheaper on every checked date and fully booked.** P20 costs 6-23% more on the same nights (for example 283 vs 231 on 18 Nov), and 332.6 vs 285.6 on open nights 31-60 days out. P01 has the booking history. P20 may be losing guests to P01 rather than to the market.
6. **It only sells on one channel so far.** 100% of its bookings are from Airbnb, whereas P12 gets 90% of its revenue from Booking.com. Whether P20 is live on Booking.com is not shown in the data.

**Supported positioning:** about 0% vs the 2BR median for the next 30 nights (hold price level; the function says the problem is conversion and visibility, not price), and -7% for 31-60 days out. Reasoning in one line: booked 25 points behind the market at P50 means fix visibility (reviews, photos, Booking.com, min-stay 3 on a weekend market) first, while the 31-60 day prices at P77 and above are above demand. The base of 350 and the min of 220 are owner decisions. The data says the min of 220 currently prevents any move below the daily median.

---

Data gaps:
1. No individual comps for any EAST listing. PriceLabs Competitor Listings are not enabled, there are no Market Dashboards, and Nearby Listings returned percentiles only. `comps.csv` has 0 EAST rows and there are no comp ids to track.
2. Live OTA checks (Airbnb, Booking, Vrbo) were NOT CHECKED because they are blocked. There are no comp ratings, review counts, Superhost status, cancellation policies or cleaning-fee treatment.
3. Our own ratings and review counts are blank in `listings.csv`, P20's included, so quality_premium is 0.0 by default for every listing.
4. P20 is missing from `build/properties.py` (sleeps, floor, view and amenities unknown). Its Booking.com status is unknown, and so is the reason for the £179.28/night booking.
5. The bedroom-matched table has no stated forward window. The daily series is blended across bedroom counts.
6. The base changes are less than a day old, with no bookings since, so there is no demand response to measure yet. P15 is not in any system.

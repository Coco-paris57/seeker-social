# Competitor positioning: WEST + HERTS (D = 2026-10-20)

**Sources.** `data/policy.json` read first. PriceLabs read-only calls on 2026-10-20: `get_neighbourhood_data` (Nearby Listings source, Airbnb, GBP, host-only fee structure, so cleaning is excluded and tax is 0) for 3064856 and 3318177, saved to `data/snapshots/2026-10-20/raw/neighbourhood_P13.json` and `neighbourhood_P10.json`. Also `get_listing_prices` for the P13 twin 3090701, `get_listing_date_overrides` for 3064856, `get_user_logs` for 18 to 20 Oct, and `get_listings` for P16/P18/P19. Our prices come from `data/snapshots/2026-10-20/prices.csv` (PriceLabs `price` = Smoobu price; PriceLabs refreshed 2026-10-19 09:18). Reservations and KPIs come from the snapshot and `reports/2026-10-20/kpi_pack.json`.
**Live OTA checks (Airbnb, Booking.com, Vrbo): NOT CHECKED.** These sites are blocked from this environment.
**Individual comps: none.** The Competitor Listings source is not enabled and there are no Market Dashboards. Every number below is a **PriceLabs Nearby Listings percentile, not a comp median**. No comp rating or review-count gap can be computed, and our own ratings are empty in listings.csv, so `quality_premium` = **0.0**. 0 rows were added to `comps.csv` (header only). Rows for P10 and P13 were appended to `market.csv`.
Stay dates are kept the same as yesterday so the trend is like-for-like: Wed 21 Oct (midweek), Fri 23 and Sat 24 Oct (weekend), Wed 18 Nov. Thu 19 Nov is added as the new D+30. Positioning uses the **bedroom-matched summary_table**. The daily series mixes bedroom bands and is context only. Positions are linear interpolations between P25, P50, P75 and P90.

## P02 Notting Hill, P03 Bayswater (P03 priced via Channex)
Both are blocked on purpose (policy.json). No positioning or pricing advice. Blocked nights are not counted as demand or as lost revenue.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat)
2BR summary, n=116: **P25 187 / P50 228 / P75 298 / P90 367**. Yesterday it was 185 / 223 / 284 / 352.

| NL daily, 2–3BR band n=150 (not comps) | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov | Thu 19 Nov |
|---|---|---|---|---|---|
| P25 / P50 / P75 / P90 | 183/223/277/371 | 191/234/292/377 | 190/234/306/377 | 188/226/277/364 | 194/233/296/371 |
| Market occupancy % | 54.6 | 62.7 | 67.6 | 21.2 | 24.4 |
| Our price (3064856) | 130, booked via twin | 153, booked | 165, booked | **194, open (about P29 daily)** | **212, open (about P37 daily)** |

| Horizon | Booked (combined) | Market | Avg open list | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30 (21 Oct–19 Nov) | 15/29, 51.7% | 41% (kpi), 36.8% (band avg) | £185.6 on 14 nights | **-18.6%** | **P24** | **raise +10%**: "booked +11% vs market but priced at P24: under-priced" (+15% lead on the band average gives the same result) |
| Nights 31–60 (19 Nov–18 Dec) | 8/30, plus 1 Dec unbookable | 27.8% (band avg) | £230.1 on 21 nights | +0.9% | P51 | **hold 0%**: "in line with market at P51" |

- **Supported positioning: about -10% vs 2BR P50 for the next 30.** Raise open nights by +10%, from £185.6 to about £204 (about P35). The reasoning: the flat is booked ahead of the market while priced at P24, and it has a 4th-floor large terrace and lift (to the 3rd floor), which support at least the median. **Hold nights 31–60 at about P50.** That hold is fragile: against the 60-day listing figure of 35% (a different horizon), `recommend` returns fix-listing instead.
- **Changes since 19 Oct:**
  - No new bookings and no cancellations (reservations are identical).
  - Next-30 occupancy moved from 55.2% to 51.7% only because the window rolled forward (booked 20 Oct dropped out, open 19 Nov came in).
  - Open-night list price fell from £188.6 to £185.6 (-1.6%) while 2BR P50 rose from 223 to 228, so the position slipped from **P27 to P24** and the gap widened from -15.4% to -18.6%.
  - **Yesterday's +10% was not applied.** There are no PriceLabs log entries for 18 to 20 Oct, base is still 235 and the DSOs were last edited on 17 Oct. The fall comes from the algorithm: the uncustomized price for 18 Nov went from 205 to 170.
- **Sync item from yesterday is closed.** 4–7 Nov now shows Booked on 3090701 and Blocked on 3064856.
- **Twin gap.** 3090701 lists about 8.5% above 3064856 on the same 14 open nights (average £201.4 vs £185.6; yesterday the gap was 3–7%). Guests can book the same flat at different prices.
- **Realised rates are unchanged** (no new bookings). Total minus cleaning, per night: 23–25 Oct £132, 27–31 Oct £100, 4–8 Nov £122, 13–17 Nov £128, against list prices of £153–212. All these stays are under 7 nights, so the length-of-stay discounts do not apply. Realised rates sit below 2BR P25 (187). Note that PriceLabs `ADR` (for example £176.72 for 24 Oct) includes cleaning, which is why the kpi_pack check reads +3%.
- The 9 PriceLabs `ccc_value` ids are unchanged from yesterday, and the same 4 are not available. Their attributes are unverified, so they are not written to comps.csv.

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
1BR summary, n=120: **P25 111 / P50 129 / P75 155 / P90 186**. Yesterday it was 110 / 125 / 149 / 184 (n=118).

| NL daily, Studio–2BR band n=175 (not comps) | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov | Thu 19 Nov |
|---|---|---|---|---|---|
| P25 / P50 / P75 / P90 | 114/141/174/208 | 117/146/182/218 | 115/145/180/214 | 111/136/169/202 | 111/138/173/208 |
| Market occupancy % | 49.0 | 46.9 | 51.0 | 21.5 | 20.3 |
| Our price | 149 booked | 156 booked | 168 booked | 166 booked | **138 open (P62 of 1BR summary)** |

- **Next 30:** 100% booked against a 31% market, all from one Airbnb stay 18 Oct–19 Nov booked 9 Oct. Excluding cleaning, that is **£102/night, below 1BR P25 (111)**. This is one long stay, not evidence of demand at list price.
- **Nights 31–60 (19 Nov–18 Dec): 0 of 30 booked** against an 18.7% market (band average). Average open list price is **£146.7, which is +13.7% vs 1BR P50 and about P67**.
- `recommend(0.0, 0.187, 0.67, q=0)` returns **fix-listing 0%**: "behind market -19% while already at P67". Yesterday this sat on the P75 boundary between fix-listing and lower -7%. Today it is clear of that boundary, because our open price fell 1.6% (149.1 to 146.7) and P50 rose from 125 to 129.
- **Supported positioning: hold at about +14% vs 1BR P50, with no raise.** The reasoning: there is no demand evidence at this level (realised ADR £113 over the last 30 days, £115 over 365), but with a median lead time of 12 days most of 19 Nov–18 Dec is still outside the booking window. The re-test on 2 Nov from yesterday stands. If 19 Nov–2 Dec is still empty against the market then, step down towards about P50–P60.
- **Changes since 19 Oct:** no bookings (7-day pickup is 0), no setting changes in the logs, position P75 to P67.
- Differentiators: ground floor, lift, modern, no parking, Wembley 2 stops, Piccadilly line to Heathrow. None of these justifies a position above P75.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
These are in another PriceLabs account that is not yet connected. A `get_listings` search returned 0 listings and none are in Smoobu. **NOT CHECKED: no percentiles, no prices, no positioning.**

## Data gaps:
1. No individual comps: CCC is not enabled, there are no Market Dashboards, and NL gives aggregates only. So there is no comp median, comp rating, review-count gap, Superhost or cancellation comparison, and 0 comps.csv rows.
2. Live OTA prices: NOT CHECKED (blocked).
3. Our ratings and review counts are empty in listings.csv, so quality_premium = 0.
4. The daily bands are not bedroom-matched (P13 is 2–3BR, P10 is Studio–2BR), and positions are interpolated. The daily percentiles for the same dates moved about 5–8% overnight (for example P13 21 Oct P50 went from 209 to 223), so they are context only.
5. P13 market occupancy depends on the source: 41% (kpi, next 30), 36.8% (band average, next 30), 35% (kpi, 60 days) vs 27.8% (band average, nights 31–60). The 31–60 hold/fix-listing call depends on which is used.
6. P13 realised rate is 35–47% below list, unexplained (`total_gbp` definition, commission or Airbnb promotions).
7. P13 `user_price` ("Your Price") differs from `price`/Smoobu by up to £12 on near dates (18 Nov: 205 vs 194). Which one guests see on each channel is unverified.
8. P13 Vrbo listing 12037152 was not analysed.
9. P16, P18, P19: the PriceLabs account is not connected and they are not in Smoobu.

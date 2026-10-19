# Competitor positioning: WEST (D = 2026-10-19)

**Sources.** I pulled PriceLabs neighbourhood data on 2026-10-19 with the read-only `get_neighbourhood_data` call (Nearby Listings source, Airbnb, GBP, host-only fee structure, so cleaning is excluded and tax is 0). For P13 I also pulled the twin listing 3090701 with `get_listing_prices`. Our prices come from `data/snapshots/2026-10-19/prices.csv`, reservations from `reservations.csv` and KPIs from `reports/2026-10-19/kpi_pack.json`. I read `data/policy.json` first.
**Live OTA checks (Airbnb, Booking.com, Vrbo): NOT CHECKED.** These sites are blocked from this environment.
**Individual comps: none.** The PriceLabs Competitor Listings source is not enabled and there are no Market Dashboards. Every comparison below therefore uses **PriceLabs market percentiles, labelled as such. None of them is a comp median.** No comp rating or review-count gap can be computed, and 0 rows were added to `comps.csv`. Two percentile rows (P10, P13) were appended to `data/snapshots/2026-10-19/market.csv`.
Stay dates priced: midweek Tue 20 to Thu 22 Oct (nights 20 and 21), weekend Fri 23 to Sun 25 Oct (nights 23 and 24), and 30 days out Wed 18 Nov. Percentile positions are linear interpolations between P25, P50, P75 and P90. Positioning uses the **bedroom-matched summary_table**; the daily series mixes bedroom bands and is shown for context only. `quality_premium` = **0.0** for both properties, because our ratings are empty in listings.csv and there are no comp ratings.

## P02 Notting Hill, P03 Bayswater
Both are blocked on purpose (policy.json). No pricing advice, and blocked nights are not counted as demand or as lost revenue.

## P13 Shepherd's Bush, 2-bed (3064856 smoobu, analysed as one flat together with 3090701)
**Correction to yesterday.** The 2026-10-18 finding of "6.9% booked, fix-listing" was wrong. It counted only listing 3064856 and treated nights booked on the twin listing as blocks. With bookings combined, the flat has **16 of the next 30 nights booked** (kpi_pack: 55.2%), against a 42% market (PriceLabs listing-level figure). The 2–3BR daily band averages 36.3%. Pickup in the last 7 days was 3 bookings, 12 nights and £2,012.

| PriceLabs NL percentiles, 2–3BR daily band n=150 (not comps), pulled 2026-10-19 | Tue 20 Oct | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov |
|---|---|---|---|---|---|
| Market P25 / P50 / P75 / P90 | 172/208/264/345 | 175/209/264/346 | 183/221/279/350 | 185/220/298/356 | 168/214/267/344 |
| Market occupancy % | 61.7 | 52.5 | 61.9 | 66.8 | 21.2 |
| Our list price (3064856) | 134, booked via twin (Airbnb 16–22 Oct) | 137, booked via twin | 160, booked | 171, booked | **205, open (about P45 daily)** |

2BR summary (n=116): P25 185, P50 223, P75 284, P90 352.

| Horizon | Booked (combined) | Market | Avg open list price | vs 2BR P50 | Position (interp) | `recommend` |
|---|---|---|---|---|---|---|
| Next 30 (20 Oct–18 Nov) | 16/30, 55.2% | 42% | £188.6 on 14 open nights | **-15.4%** | **P27** | **raise +10%**: "booked +13% vs market but priced at P26: under-priced" |
| Nights 31–60 (19 Nov–18 Dec) | 8/30 booked, plus 1 unbookable gap night (1 Dec) | 27.0% (band avg) | £230.0 on 21 open nights | +3.2% | P53 | **hold 0%**: "in line with market at P53" |

- **Answer: yes, there is room to raise. Raise open nights in the next 30 by +10%**, taking about £189 to about £207. That is about P35, still 7% under the 2BR P50. The flat has a 4th floor, large private terrace, lift to the 3rd floor and a Westfield/Notting Hill location, all of which would support at least the median. In my judgement the raise should apply to the 31 Oct–3 Nov, 8–12 Nov and 17–18 Nov blocks. I would leave the close-in gap nights (Thu 22 Oct, 1 night; Sun 25 to Mon 26 Oct, 2 nights) as they are, because they are orphans inside 7 days. **Hold nights 31–60**: they are already at P53 with pace equal to market.
- **Caveat that limits the size of the raise.** Realised rates (total minus cleaning, divided by nights) are well below the list price:

| Stay | Realised | Current list | Gap |
|---|---|---|---|
| 27–31 Oct | £100 | £189 | -47% |
| 4–8 Nov | £122 | £205 | -40%, booked 18 Oct, same list as today |
| 13–17 Nov | £128 | £193 | -34% |
| 28 Nov–1 Dec | £139 | £227 | -39%, booked 18 Oct |
| 2–7 Dec | £159 | £255 | -38% |

  All of these stays are under 7 nights, so the 15%/20% length-of-stay discounts do not apply. Realised rates sit **below 2BR P25** even though list is at P27–P53. The list-to-paid gap is unexplained: it could be how Smoobu defines `total_gbp`, or Airbnb promotions. A +10% list raise only helps if the realised rate follows, so the gap should be checked alongside the raise.
- **Sync check (to verify, not proven).** Airbnb 4–8 Nov was booked 2026-10-18, but both Smoobu listings still show 4–7 Nov as open in PriceLabs (last refreshed 2026-10-18 09:25). This is probably refresh lag, but confirm in Smoobu that both listings are closed so the flat cannot be double-booked. Separately, kpi_pack says prices were not pushed today (last push 2026-10-18 09:25).
- The twin listing 3090701 lists 3–7% above 3064856 on the same nights. The 9 PriceLabs `ccc_value` ids are unchanged from yesterday, and the same 4 are flagged not available. They are not written to comps.csv because their attributes are unverified.

## P10 Hanger Lane, 1-bed (3318177 smoobu)
| PriceLabs NL percentiles, Studio–2BR daily band n=174 (not comps), pulled 2026-10-19 | Tue 20 Oct | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov |
|---|---|---|---|---|---|
| Market P25 / P50 / P75 / P90 | 109/131/159/205 | 110/130/163/207 | 115/139/171/212 | 115/138/169/210 | 110/133/164/200 |
| Market occupancy % | 49.4 | 49.3 | 46.6 | 51.3 | 22.5 |
| Our list price (all booked) | 148 | 152 | 157 | 172 | 145 |

1BR summary (n=118): P25 110, P50 125, P75 149, P90 184.

- **Next 30:** 100% booked against a 32% market, all from one Airbnb stay 18 Oct–19 Nov (32 nights, booked 9 Oct). Excluding the £125 cleaning fee that is **£102/night**, below the 1BR P25. kpi_pack puts it **-17% below list even after the 20% monthly discount**. This is one booking, not evidence of demand at list price.
- **Nights 31–60 (19 Nov–18 Dec): 0 of 30 booked**, against an 18.6% market (band average). The open-night list price averages **£149.1**, which is **P75 of 1BR (+19.3% vs P50 £125)** and about P55 of the mixed Studio–2BR daily band.
- `recommend(0.0, 0.186, P75, q=0)` returns **fix-listing 0%**. At P76 it returns **lower -7%**, so the result sits right on the boundary. Neither output supports a raise. **Yesterday's +5% for nights 31–60 is withdrawn**: it was based on next-30 occupancy that came from a single long stay at a sub-P25 rate.
- **Supported positioning: hold at about +19% vs 1BR P50 for now, and re-test on 2 Nov.** Reasoning: the median lead time is 12 days, so nights 31–60 are mostly still outside the booking window, but realised ADR (£113 over the last 30 days, £115 over the last 365) has never shown demand at about £150. If 19 Nov–2 Dec is still empty against the market on 2 Nov, step down 7% towards about £139 (about P65).
- Differentiators: ground floor, lift, modern, no parking, 2 stops to Wembley and on the Piccadilly line to Heathrow. None of these justifies a price above P75.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
NOT IN SYSTEMS (not in PriceLabs or Smoobu). No analysis.

## Data gaps:
1. No individual comps: CCC is not enabled, there are no Market Dashboards, and NL gives aggregates only. So there is no comp median, comp rating or review-count gap, and 0 rows were appended to comps.csv. Percentile rows were written to market.csv instead.
2. Live OTA prices: NOT CHECKED (Airbnb, Booking.com and Vrbo are blocked).
3. Our ratings and review counts are empty in listings.csv, so quality_premium = 0.
4. The daily bands are not bedroom-matched (P13 is 2–3BR, P10 is Studio–2BR), and positions are interpolated from 4 percentiles. Market occupancy for P13 differs by source: 42% at listing level vs 36.3% as the band average.
5. P13's list-to-realised gap of about 35–47% is unexplained (`total_gbp` definition or Airbnb promotions). List price at booking time is known only for the bookings made on 18 Oct.
6. P13's 4–8 Nov booking is not reflected on either Smoobu listing in PriceLabs (refreshed 2026-10-18 09:25). Verify in Smoobu.
7. P13's Vrbo listing 12037152 was not analysed. 3090701 was used only to combine the calendar.
8. P16, P18 and P19: NOT IN SYSTEMS.

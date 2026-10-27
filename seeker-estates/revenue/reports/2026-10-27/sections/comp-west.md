# Competitor positioning: WEST + HERTS (D = 2026-10-27)

**Sources.** I read `data/policy.json` first. PriceLabs calls were read-only and made one at a time: `get_neighbourhood_data` 3064856 (summary; key fields saved to `data/snapshots/2026-10-27/raw/neighbourhood_P13.json`) and `get_customizations` 3064856 (last-minute, occupancy, booking factor, far-out; toggled_on=false). Our PriceLabs prices come from `raw/prices_3064856.json` and `raw/prices_3090701.json` (refreshed 2026-10-26T18:38Z). Occupancy comes from `pl_kpis.csv` (2026-10-27).

**Method.** I reused the 26 Oct P13 Airbnb comp set unchanged: the same 11 ids, criteria as in `reports/2026-10-26/sections/comp-west.md`. I re-priced it with plain `curl` requests (default headers), and no block was met.
- **All 11 comps are active.** Each was returned on at least one of today's date searches, so none was replaced.
- **Stays** (2 nights each, 4 guests, same dates for comps and for us): Fri 30 Oct-Sun 1 Nov; Sat 31 Oct-Mon 2 Nov; Tue 10-Thu 12 Nov (midweek); Tue 24-Thu 26 Nov (kept from yesterday for the trend, D+28); Thu 26-Sat 28 Nov (D+30).
  - Tue 3-Thu 5 Nov was not usable: our flat is booked on 4 Nov.
  - Fri 30 Oct is booked for us, so I priced comps only on that stay.
- **Price basis.** Each price is the Airbnb all-in total divided by nights, with **cleaning and fees included** and no taxes shown separately. Our own listings appear in the same searches, so the comparison is like-for-like.
- **Blank cells** mean the comp was not returned for those dates (booked or min-stay). It does not mean the comp is inactive.
- **Rows appended, none overwritten** (written under `flock`; these files did not exist today before this run):
  - 55 rows to `data/snapshots/2026-10-27/comps.csv`
  - 2 rows to `market.csv` (P13, P10)
  - 8 rows to `channel_checks.csv` (our displayed Airbnb prices)
- **Recompute check.** I recomputed from the snapshot with `positioning.comp_summary` and got the same results as below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table (Airbnb, all-in £/night incl. cleaning, checked 2026-10-27, 4 guests)
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 31 Oct-2 Nov | 10-12 Nov | 24-26 Nov | 26-28 Nov |
|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | balcony, garden view | n/a | n/a | 289.0 | n/a | n/a |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | n/a | n/a | n/a | 244.0 | 273.5 |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | n/a | n/a | 222.0 | 254.5 | n/a |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | private garden; Special offer / Early booking strikethroughs | 226.0 (was 269.5) | 222.0 (was 264) | n/a | 257.0 | 263.5 (was 282) |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | n/a | n/a | 239.0 | n/a | n/a |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | n/a | n/a | n/a | 167.5 | n/a |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | n/a | n/a | n/a | 264.0 | 275.5 (was 308) |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift, 2 bath; Special offer | 425.5 | 418.0 | 390.5 | 390.5 | 397.0 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking | n/a | n/a | 217.0 | 217.0 | n/a |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (12) | Lift, balcony, paid parking, Guest favourite | n/a | n/a | n/a | 378.5 (was 420.5) | 331.25 (was 378.5) |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | n/a | n/a | n/a | 167.5 | n/a |
| **Comp median (n)** | | | **4.78 (13)** | | 325.75 (2, unusable) | 320.0 (2, unusable) | **239.0** (5) | **254.5** (9) | **275.5** (5) |
| **Ours 1587576514709814818** (4.67, 9) | | 6 | | terrace | booked | **231.5** | **219.0** | **240.5** | **269.5** |
| **Ours 1571600691689064213** (4.31, 13) | | 6 | | terrace, skyline view | booked | **204.0** | **202.0** | **231.0** | **281.5** |

### Positioning summary
`quality_premium` uses the full-set comp median rating of 4.78. The trend columns compare like-for-like rows from 26 Oct `comps.csv` and `channel_checks.csv`.

| Listing | Stay (n) | Ours | Comp median | Pctl | vs median | Rating vs comp | Review gap | `quality_premium` | `recommend` (30d 0.40 vs 0.41 / 60d 0.33 vs 0.36) |
|---|---|---|---|---|---|---|---|---|---|
| 1587576514709814818 | 10-12 Nov (5) | 219.0 | 239.0 | P20 | -8.4% | 4.67 vs 4.78 | 9 vs 13 (-4) | -0.044 | raise +5% / raise +5% |
| | 24-26 Nov (9) | 240.5 | 254.5 | P33 | -5.5% | | | | raise +5% / raise +5% |
| | 26-28 Nov (5) | 269.5 | 275.5 | P20 | -2.2% | | | | raise +5% / raise +5% |
| 1571600691689064213 | 10-12 Nov (5) | 202.0 | 239.0 | P0 | -15.5% | 4.31 vs 4.78 | 13 vs 13 (0) | -0.15 (cap) | raise +5% / raise +5% |
| | 24-26 Nov (9) | 231.0 | 254.5 | P33 | -9.2% | | | | raise +5% / raise +5% |
| | 26-28 Nov (5) | 281.5 | 275.5 | P60 | +2.2% | | | | hold / hold |

**Trend vs 26 Oct (same comp ids, same stays).**
- **Comps are flat or slightly up:** 10-12 Nov +0.6% (5 matched comps), 24-26 Nov +0.9% (all 9).
- **24-26 Nov: we went down.** We fell from 256.0 to 240.5 (-6.1%) on 1587576514709814818 and from 256.0 to 231.0 (-9.8%) on 1571600691689064213. Yesterday we were +1.6% over the median; today we are -5.5% / -9.2%.
  - The PriceLabs price drop explains part of it: 3064856's 25 Nov night went 216 -> 188, and its uncustomized price went 224 -> 190, so this part is market-driven.
  - The Airbnb ratio drop explains the rest (finding 1).
- **10-12 Nov:** 220.0 -> 219.0 and 211.5 -> 202.0. 3064856's 10 Nov night went 185 -> 159 while its uncustomized price was 180 -> 182. That fall is a customization effect.
- The identical-total issue reported yesterday (both listings at £512 on 24-26 Nov) has not recurred on any of today's stays.

**Supported positioning (one line):** about **-4% vs comp median for 1587576514709814818** and **-15% for 1571600691689064213** (ratings 4.67 / 4.31 vs 4.78; no Superhost, no Guest favourite, no lift listed).
- **1587576514709814818 sits at -2% to -8%**, below the supported -4% on 10-25 Nov. `recommend` says +5% there, which is supported.
- **1571600691689064213 is already at or above its supported level** except 10-12 Nov (-15.5%). `recommend` says +5% only because its percentile is under its quality-adjusted threshold. Hold it.
- **The near-term shortfall comes from discounts, not the base.** Today's PriceLabs P50 is 245, a near-identical market. Two existing open items cover the discount stack: a-discount-cut and a-airbnb-rules (findings 1-2). No new base action is proposed: the next base review is 2 Nov.

**PriceLabs NL context (not comps):** 2BR n=117, percentiles 205 / 245 / 303 / 373. On 26 Oct they were 204 / 244 / 302 / 368. Market occupancy for the next 30 days is 41% (`pl_kpis.csv`); ours is 40%. For the next 60 days, ours is 33% against a market 36%. PriceLabs flags 26-31 Dec at +25.2% market price and 26 Dec-1 Jan at +13.0% occupancy. The new 27 Dec-3 Jan Airbnb booking (Dispatcher) at about £252/n sits inside that surge window.

### Findings
1. **Airbnb room price vs today's PriceLabs price, both listings.** Method: all-in total less £150 cleaning, divided by the PriceLabs sum for the same nights.
   - 31 Oct-2 Nov: 0.851 on both.
   - 10-12 Nov: 0.766 / 0.767.
   - 24-26 Nov: 0.834 on both.
   - 26-28 Nov: 0.900 / 0.902.
   - **The 28-day step persists.** 24 Nov is now 28 days out and 25 Nov is 29. Pricing 24 Nov at 0.765 and 25 Nov at 0.90 reproduces the 0.834 (330.7 vs 331.1 on 3090701). This matches yesterday's reading of the old Smoobu Airbnb "last-minute -15% within 28 days" plus a flat -10%. Policy says that rule was changed on 21 Oct to -10% within 14 days.
   - **31 Oct does not fit that pattern.** Its 0.851 does not match 0.765. If Smoobu still held the 25 Oct prices for 31 Oct, both listings would give 0.796, so the 31 Oct figure is ambiguous. Smoobu prices were not read, so the cause is inferred.
   - This feeds open item a-airbnb-rules.
2. **a-discount-cut is still not applied on P13** (`get_customizations` 3064856, 27 Oct). The settings are unchanged from 26 Oct:
   - Last-minute: "5% discount within 14 days (Gradual)".
   - **Occupancy profile still "Aggressive"**: -30% at 10% occupancy within 15 days, -20% at 30-40%, and -20% at 10-20% for 16-30 days.
   - Booking recency is now toggled **on**, with value "default" (5% up to 15%, next 30 days). A booking was made 26 Oct, so this should not bite now.
   - Far-out premium: +30% after 150 days.
   - I did not check 3090701 or P20 today.
3. **The snapshot is missing the P13 tag on one listing.** All 60 rows for 3090701 in `data/snapshots/2026-10-27/prices.csv` have an **empty `ref`**; on 26 Oct they were tagged P13. Anything grouping `prices.csv` by ref will miss half of P13. I used the raw JSON for 3090701.

Differentiators that justify gaps:
- **Terrace:** only 3 comps match our large private terrace (balcony or garden).
- **Parking:** 6 of 11 comps list parking (1 free); we have none.
- **Lift:** 2 comps list a lift, and both price at the top of the set (331-425). Our listings still show no Lift amenity, although the flat has a lift to the 3rd floor (`build/properties.py`); this is covered by open item a-amenities.
- **Host badges:** the set has 1 Superhost and 2 Guest favourites.
- **Strikethroughs:** 4 comps show strikethroughs (Special offer / Early booking).
- **Cancellation policy** per comp: NOT CHECKED.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights before the handback. In `prices.csv`, 28 Oct-18 Nov is all booked (22 nights), and the rest is the policy handback. Market occupancy is 30% for 30 days and 24% for 60 days (`pl_kpis.csv`). No comps and no positioning.

## P02 Notting Hill, P03 Bayswater
Both are blocked on purpose (policy). P02 has 59 nights blocked and 1 closed out of 60; P03 has 60 closed out of 60. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of them is in today's `listings.csv` or PriceLabs, so there is no listing of ours to price. **NOT CHECKED**: no comps were built.

## Data gaps:
1. Booking.com was NOT CHECKED; comps are Airbnb only. Vrbo 12037152 (P13) was not analysed.
2. P13 October stays have n=2 (30 Oct and 31 Oct), so they are unusable. Usable stays are 24-26 Nov (n=9), 10-12 Nov (n=5) and 26-28 Nov (n=5). 1435433076956934058 (£390-425) is a high outlier.
3. Comp amenities and ratings come from the 26 Oct listing pages and were not re-read; review counts were re-confirmed from today's search cards. Cancellation policy per comp: NOT CHECKED.
4. The Airbnb/PriceLabs ratios assume £150 cleaning and no extra-guest fee at 4 guests. Smoobu rates and Airbnb pricing rules were not read, so the causes are inferred.
5. The `prices.csv` 3090701 rows have an empty ref (finding 3).
6. `get_customizations` was checked for 3064856 only, not for 3090701 or P20.
7. P16, P18 and P19 have no data.

# Competitor positioning: WEST + HERTS (D = 2026-10-28)

**Sources.** I read `data/policy.json` first. One read-only PriceLabs call: `get_listing_date_overrides` 3064856 for 18 Nov-3 Jan. PriceLabs market percentiles by day come from the market agent's pull (`scratchpad/m28/neigh_3064856.json`, `future_prices`) and the 2BR summary in `data/snapshots/2026-10-28/raw/neighbourhood_P13.json`. Our prices come from `raw/prices_3064856.json` and `raw/prices_3090701.json` (28 Oct; the 27 Oct files are used for the price at booking time). Bookings come from `reservations.csv` (28 Oct). Per the Dispatcher correction, `total_gbp` excludes cleaning.

**Method.**
- **Comp set:** I kept the same 11 Airbnb comp ids as 26-27 Oct and replaced none. All 11 are active: each was returned on at least one stay today.
  - 1761224847419174970 was missed by the wide map search. A 0.2 km box around each comp found it on 10-12 Nov and 17-19 Nov, so it is not inactive.
- **Searches:** plain `curl` to airbnb.co.uk, 4 guests, entire home, at least 2 bedrooms. No block was met.
- **Price basis:** each price is the all-in total divided by nights, **cleaning and fees included**, no taxes shown separately.
- **Stays:**
  - Fri 30 Oct-Sun 1 Nov and Sat 31 Oct-Mon 2 Nov
  - Tue 10-Thu 12 Nov (midweek)
  - 24-26 Nov and 26-28 Nov (trend)
  - 18-27 Nov (the new Booking.com stay)
  - Fri 11-Sun 13 Dec (D+44)
  - 23-26 Dec (Christmas, min 3)
  - 30 Dec-1 Jan (NYE)
  - 27 Dec-3 Jan (the booked NYE stay)
- **Why no D+30 stay of ours:** for us, 18-27 Nov and 28 Nov-1 Dec are booked, so I used 11-13 Dec as our nearest open weekend.
- **Wider sample:** all 2-bedroom entire homes with at least 10 reviews in the 1.3 km search, taken from search cards. These are not vetted comps; I use them as context only where comp n is 3 or less.
- **Rows appended under `flock`, nothing overwritten:**
  - 110 rows to `data/snapshots/2026-10-28/comps.csv`
  - 2 rows to `market.csv` (P13 comp medians, P10)
  - 8 rows to `channel_checks.csv` (new file)
- **Recompute check:** I recomputed 10-12 Nov and 18-27 Nov from the snapshot with `comp_summary`, and the results match.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat, per policy)

### Comp table (Airbnb all-in £/night incl. cleaning, checked 2026-10-28, 4 guests; blank = not returned, i.e. booked or min-stay)
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 30 Oct-1 Nov | 31 Oct-2 Nov | 10-12 Nov | 18-27 Nov (9n) | 24-26 Nov | 26-28 Nov | 11-13 Dec | 23-26 Dec | 30 Dec-1 Jan | 27 Dec-3 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | garden view, balcony | | | 276.0 | | | | | | | |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | | | | 202.67 (weekly disc.) | 244.0 | 248.5 | | | | |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath | | | 218.0 | 206.78 | 249.0 | 287.0 | | | | |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | garden; Special offer / Early booking | 216.0 | 212.5 | 210.5 | 179.78 | 237.5 | 265.0 | 279.5 | 232.0 | 410.5 | 318.86 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | | | 229.5 | | | | | | | 406.57 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | none listed | | | | | 167.5 | | | | | |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | | | | 185.78 (weekly disc.) | 259.5 | 282.5 | 286.5 | 256.67 | 469.0 | 349.29 |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | lift, 2 bath; Special offer | 425.5 | 418.0 | 411.0 | | | | | | | |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking | | | 217.0 | | 217.0 | | | | | |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (13) | lift, balcony, paid parking, Guest favourite | | | | 308.89 | 349.5 | 349.5 | | | | |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | | | | | 167.5 | | | | | |
| **Comp median (n)** | | | **4.78 (13)** | | 320.75 (2) | 315.25 (2) | **223.75 (6)** | **202.67 (5)** | **240.75 (8)** | **282.5 (5)** | 283.0 (2) | 244.34 (2) | 439.75 (2) | 349.29 (3) |
| Wider 2-bed sample median (n) | | | | | 245.0 (9) | 284.5 (15) | 249.25 (24) | 263.83 (20) | 252.5 (26) | 317.0 (17) | 365.0 (16) | 339.67 (27) | 492.5 (11) | 406.57 (17) |
| **Ours 1587576514709814818** (4.67, 9) | | 6 | | terrace | booked | **213.5** | **219.0** | booked | booked | booked | **285.0** | **249.67** (strike £844) | booked | booked |
| **Ours 1571600691689064213** (4.31, 13) | | 6 | | terrace, skyline view | booked | **189.0** | **194.0** | booked | booked | booked | **297.5** | **261.33** | booked | booked |

### Positioning
- `quality_premium` uses the comp median rating of 4.78.
- `recommend` uses occupancy from `pl_kpis.csv`: 30 days 0.40 vs market 0.41, 60 days 0.33 vs 0.36.
- The Airbnb ids map to Smoobu listings as "likely"/"probable" per policy.

| Listing | Stay (comp n) | Ours | Comp median | Pctl | vs median | Rating vs comp | Review gap | `quality_premium` | `recommend` 30d / 60d |
|---|---|---|---|---|---|---|---|---|---|
| 1587576514709814818 (3090701) | 10-12 Nov (6) | 219.0 | 223.75 | P50 | -2.1% | 4.67 vs 4.78 | 9 vs 13 (-4) | -0.044 | hold / hold |
| | 11-13 Dec (2) | 285.0 | 283.0 | P50 | +0.7% | | | | hold (n=2, weak); wider sample P25, -21.9% |
| | 23-26 Dec (2) | 249.67 | 244.34 | P50 | +2.2% | | | | hold (n=2, weak); wider sample P11, -26.5% |
| 1571600691689064213 (3064856) | 10-12 Nov (6) | 194.0 | 223.75 | P0 | -13.3% | 4.31 vs 4.78 | 13 vs 13 (0) | -0.15 (cap) | raise +5% / raise +5% |
| | 11-13 Dec (2) | 297.5 | 283.0 | P100 | +5.1% | | | | hold (n=2, weak); wider sample P31, -18.5% |
| | 23-26 Dec (2) | 261.33 | 244.34 | P100 | +7.0% | | | | hold (n=2, weak); wider sample P15, -23.1% |

31 Oct-2 Nov has comp n=2 (one is the £418 lift outlier), so I did not use it. For the record, ours is 213.5 / 189.0, which is P7 of the wider sample (n=15).

**Supported positioning (one line).**
- Quality supports **-4% vs comp median for 3090701** and **-15% for 3064856**: ratings 4.67 / 4.31 vs 4.78, no Superhost, no Guest favourite, no lift listed.
- **November midweek is at the supported level:** -2% and -13%.
- **Christmas is the gap.** Comp n=2 (9 of 11 comps not returned, consistent with booked or min-stay), so I rely on the PriceLabs market:
  - Our PriceLabs nights on 23-25 Dec average 234.7, against a market P50 of 288.3 and P25 of 232.7 (`future_prices`). That is **-18.6% vs market median, about P25**.
  - Quality supports about 277 for 3090701 and 245 for 3064856 (market P50 × (1 + q)).
  - Our PriceLabs "default customization" price is 262.3, so our customizations take about 10.5% off.
  - On Airbnb, a further flat ~0.90 applies on top (see the ratio table below).

### Focus 1: Booking.com 18-27 Nov (9 nights, booked 27 Oct, 22 days out)
| Measure | £/night | Source |
|---|---|---|
| Paid room (excl. cleaning) | **127.08** (£1,143.76) | reservations.csv; Dispatcher correction |
| Paid like-for-like all-in (+ £150 cleaning, policy) | **143.75** | derived |
| PriceLabs 3064856 at booking (27 Oct pull) | 193.2 (£1,739) | 2026-10-27 raw/prices_3064856.json |
| PriceLabs today | 189.9 (£1,709) | 2026-10-28 raw |
| PriceLabs market P25 / P50 / booked P50, same nights | 197.9 / 239.7 / 192.4 | future_prices |
| Airbnb comp median, same 9-night stay, all-in | 202.67 (n=5, min 179.78) | comps.csv |
| Wider 2-bed sample median | 263.83 (n=20, min 172.78) | wide.json |

**Paid vs comps:**
- All-in it is **-29.1% vs comp median, P0**, below every comp and below the cheapest wider-sample listing.
- Room-only it is 0.658x PriceLabs, and 0.64x the market P25.
- Two comps sold the same 9 nights with Airbnb weekly discounts (about -9% to -10%), and one had stacked Special offers. They still land at 180-207.

**Stack (inferred, not checked against the Booking.com breakdown).** Expected multiplier with the active Shepherd's Bush promotions (policy `booking_promotions_p13_21oct`):

`1.15 markup × 0.85 Weekly × 0.85 Last Minute (0-30 d) × 0.90 Mobile × 0.90 Genius L1 = 0.673`

- Observed is 0.658, leaving a -2.2% residual. That residual is consistent with an occupancy/guest-count step or a PriceLabs price change between push and booking. The guest count was NOT CHECKED.
- Black Friday (bookable from 19 Nov) does not apply.
- Against the price after the policy 15% weekly discount (£1,478), promotions take about 22.6% off. Per policy this is explained by stacked promotions and is not a leak.
- Commission is £258.75 (22.6%). The Visibility Booster is on for these check-ins, so this is expected per policy.
- **The point for pricing:** on a 22-day-out weekly stay, Booking.com sold the flat about £60/night under the nearest Airbnb comps. Open item a-discount-cut covers the stack.

### Focus 2: Christmas / NYE
- **Christmas 23-26 Dec (open, min 3):** 3090701 is 249.67 and 3064856 is 261.33 all-in on Airbnb, against a wider-sample median of 339.67 (P11-P15). PriceLabs puts us about P25 of the market (above). Changes found today:
  - PriceLabs 3064856 26 Dec went 271 -> 240, and min-stay on 25-26 Dec went 4 -> 3 (27 Oct vs 28 Oct raw).
  - The overrides for 23-26 Dec (-3%, min 3) were updated **2026-10-27 11:58Z** (`get_listing_date_overrides`).
  - 21-22 Dec are also -3%. The market flags 26-31 Dec at +24.4% price and +14.6% occupancy (`raw/neighbourhood_P13.json`).
  - This belongs to open item a-peak-check, which is **not fixed**: Christmas is still discounted below the uncustomized price.
- **NYE (booked):**
  - The Airbnb stay 27 Dec-3 Jan (booked 26 Oct) pays £1,766 room = **£252.29/night**. All-in that is £273.71, **-21.6% vs comp median 349.29** (n=3, P0) and -32.7% vs the wider sample (406.57, n=17).
  - Against PriceLabs today (£2,260, avg 322.9) it is 0.781x, or 0.919x after the 15% weekly discount. This fits the Airbnb flat ~0.90 described below. It is above the market booked-P50 of 243.6.
  - The 27 Dec-1 Jan overrides are -3%, with a 7-night min on 27 Dec. The 2-night NYE comps (30 Dec-1 Jan) sit at 410-469.
  - The stay is already sold, so this is a lesson for next year, not an action.

### Our Airbnb display vs PriceLabs (room = all-in - £150, divided by PriceLabs sum for the same nights)
| Stay | Days out | 3090701 / 1587576514709814818 | 3064856 / 1571600691689064213 |
|---|---|---|---|
| 31 Oct-2 Nov | 3 | 0.765 | 0.765 |
| 10-12 Nov | 13 | 0.766 | 0.768 |
| 11-13 Dec | 44 | 0.901 | 0.901 |
| 23-26 Dec | 56 | 0.901 | 0.901 |

- **Beyond 14 days there is a flat 0.90 on both listings.** Within 14 days it is 0.765 (0.90 × 0.85).
- Policy says the Smoobu last-minute rule is -10% within 14 days, which would give 0.81, not 0.765. Smoobu/Airbnb settings were not read, so the cause is inferred.
- This feeds open item a-airbnb-rules (still open).
- The £844 strikethrough on 1587576514709814818 at Christmas has no discount line in the breakdown, so it is an Airbnb display reference, not a promotion of ours.

### Trend vs 27 Oct (same comp ids, same stays)
- **Comps:** 30 Oct -1.5% (n=2), 31 Oct -1.5% (n=2), 10-12 Nov -0.4% (n=5), 24-26 Nov -3.0% (n=8), 26-28 Nov +0.1% (n=4).
- **Ours on 31 Oct-2 Nov:** 231.5 -> 213.5 (-7.8%) and 204.0 -> 189.0 (-7.4%). The stay moved inside 14 days, so it picked up the extra 0.85 step.
- **Ours on 10-12 Nov:** 219.0 unchanged and 202.0 -> 194.0 (-4.0%). PriceLabs 3064856 went from 159+? to 158+152.
- **PriceLabs NL 2BR percentiles:** 192 / 238 / 289 / 363, against 205 / 245 / 303 / 373 yesterday.

### Findings
1. **(high)** Booking.com 18-27 Nov sold at £127.08/night room (£143.75 all-in): **-29% vs Airbnb comp median for the same 9 nights, P0**, and 0.658x PriceLabs. The stack is consistent with markup × Weekly × Last Minute × Mobile × Genius (0.673 predicted). This is per policy, not a leak; the size is the finding. Covered by a-discount-cut.
2. **(high)** Christmas 23-26 Dec is priced at about market P25. PriceLabs is 234.7 vs market P50 288.3; on Airbnb we are at P11-P15 of the wider sample. Quality supports about -4% / -15% vs median, i.e. about 277 / 245. The -3% overrides were re-saved 27 Oct 11:58Z and 26 Dec fell 271 -> 240. a-peak-check is not fixed.
3. **(medium)** The Airbnb flat ~0.90 beyond 14 days plus 0.85 within 14 days persists on both listings. That is 0.765 at short lead, versus the policy-described rule that would give 0.81. Covered by a-airbnb-rules.
4. **(medium)** 3064856 / 1571600691689064213 is at P0 on 10-12 Nov (-13.3%), which is within its supported -15%. `recommend` says +5%. 3090701 is at the supported level (hold).

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights before the 18 Nov handback: `prices.csv` 28 Oct shows 0 available and 21 booked, and the rest is the policy handback. Market occupancy is 30% for 30 days and 24% for 60 days. No comps.

## P02 Notting Hill, P03 Bayswater
Both are blocked on purpose (policy): 0 of 60 nights are available. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
None of them is in `listings.csv`, `prices.csv` or PriceLabs, so there is no price of ours. **NOT CHECKED.**

## Data gaps:
1. Booking.com comps were NOT CHECKED: comps are Airbnb only. Vrbo 12037152 was not analysed.
2. December comp coverage is thin (n=2-3 for 11-13 Dec, Christmas and NYE) because most comps were not returned. I used the wider sample and PriceLabs percentiles, labelled as such.
3. Guest count, Booking.com price breakdown and the PriceLabs price at the moment of booking for 18-27 Nov were NOT CHECKED, so the stack is inferred.
4. The Airbnb ratios assume £150 cleaning and no extra-guest fee at 4 guests. Smoobu/Airbnb rule settings were not read.
5. **Possible contradiction in the cleaning correction.** The correction says `total_gbp` excludes cleaning, but ctx28 described the P20/P08 Airbnb totals as including cleaning. I applied the correction everywhere. If Airbnb totals actually include cleaning, the NYE stay is £252.29/night all-in (-27.8% vs comps).
6. Comp amenities are from the 26 Oct pages, and cancellation policy per comp was NOT CHECKED.
7. `prices.csv` 3090701 rows still have an empty `ref`.
8. P16, P18 and P19 have no data.

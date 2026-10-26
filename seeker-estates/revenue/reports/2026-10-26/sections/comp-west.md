# Competitor positioning: WEST + HERTS (D = 2026-10-26)

**Sources.** `data/policy.json` read first. Read-only PriceLabs calls, strictly one at a time: `get_neighbourhood_data` 3064856 (summary; saved as `data/snapshots/2026-10-26/raw/neighbourhood_P13.json`), `get_user_logs` (3064856, 3090701, 3318177; 25-26 Oct), `get_customizations` 3064856 (last-minute, occupancy, booking factor, far-out, demand; toggled_on=false). Our prices: `raw/prices_3064856.json` / `raw/prices_3090701.json` (refreshed 2026-10-25T21:30Z, first date 27 Oct). KPIs: `pl_kpis.csv`.

**New today: a real Airbnb comp set for P13.** Airbnb pages load with plain `curl` requests (default headers, no browser spoofing, no block met). Booking.com: NOT CHECKED.
- Method as comp-east 25 Oct: same bedrooms (2, from the search card), sleeps 5-7 (listing page `personCapacity`), entire home/apt, at least 10 reviews, within 1.0 km of P13's PriceLabs coordinates (51.50882, -0.23425). Searched a 1.3 km box per stay, 4 guests, min 2 bedrooms. 26 candidates passed distance/bedroom/review filters; **11 passed sleeps 5-7** and form the baseline set (all 11 kept; ids to track daily).
- Stays (2 nights each, same dates for comps and us): Fri 30 Oct-Sun 1 Nov, Tue 27-Thu 29 Oct, Tue 24-Thu 26 Nov (D+29/30). Added because P13 is booked on the first two: Sat 31 Oct-Mon 2 Nov and Tue 10-Thu 12 Nov.
- Price = Airbnb all-in total / nights, **cleaning and fees included**, no taxes shown separately. Our Airbnb listings appear in the same searches, so ours is like-for-like (same all-in basis). Blank = comp not returned for those dates (booked or min-stay), not inactive.
- Rows: **55 appended to `data/snapshots/2026-10-26/comps.csv`** (source string per row), 2 rows to `market.csv` (P13, P10), 6 rows to `channel_checks.csv` (our displayed Airbnb prices). Appended under `flock`; no existing rows touched. Recomputed from the snapshot with `positioning.comp_summary`: same results as below.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat; policy)

### Comp table (Airbnb, all-in £/night incl. cleaning, checked 2026-10-26, 4 guests)
| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct | Tue-Thu 27 Oct | 24-26 Nov | Sat-Mon 31 Oct | 10-12 Nov |
|---|---|---|---|---|---|---|---|---|---|
| [1761224847419174970](https://www.airbnb.co.uk/rooms/1761224847419174970) | 0.12 | 6 | 4.8 (10) | balcony, garden view | n/a | 201 (was 241) | n/a | n/a | 279.5 |
| [1599999559812004118](https://www.airbnb.co.uk/rooms/1599999559812004118) | 0.25 | 6 | 4.9 (10) | paid parking, Guest favourite | 207 | n/a | 244 | 207 | n/a |
| [1436773605049626293](https://www.airbnb.co.uk/rooms/1436773605049626293) | 0.38 | 6 | 4.85 (13) | free parking, 2 bath, ground floor + garden (title) | n/a | n/a | 254.5 | n/a | 223 |
| [1568189670839493789](https://www.airbnb.co.uk/rooms/1568189670839493789) | 0.52 | 6 | 4.2 (10) | private back garden; strikethrough discounts | 226 | n/a | 252 | 222 | 220.5 |
| [1411449348357673454](https://www.airbnb.co.uk/rooms/1411449348357673454) | 0.58 | 6 | 4.78 (49) | Superhost, 2 bath | n/a | n/a | n/a | n/a | 239 |
| [1201539290247676065](https://www.airbnb.co.uk/rooms/1201539290247676065) | 0.81 | 7 | 4.45 (22) | garden flat (title) | n/a | n/a | 164.5 | n/a | n/a |
| [1014671215040555613](https://www.airbnb.co.uk/rooms/1014671215040555613) | 0.84 | 5 | 4.75 (16) | none listed | n/a | n/a | 274.5 | n/a | n/a |
| [1435433076956934058](https://www.airbnb.co.uk/rooms/1435433076956934058) | 0.86 | 5 | 5.0 (10) | Lift, 2 bath, skyline (title); strikethrough | 425.5 | 411 | 390.5 | n/a | 390.5 |
| [1016465248942791796](https://www.airbnb.co.uk/rooms/1016465248942791796) | 0.90 | 5 | 4.6 (81) | paid parking | n/a | n/a | 217 | n/a | 217 |
| [1205241472054931937](https://www.airbnb.co.uk/rooms/1205241472054931937) | 0.91 | 5 | 5.0 (12) | Lift, balcony, paid parking, panoramic view (title), Guest favourite | n/a | n/a | 355 | n/a | n/a |
| [1598588327559113265](https://www.airbnb.co.uk/rooms/1598588327559113265) | 0.94 | 7 | 4.71 (14) | paid parking | n/a | n/a | 167.5 | n/a | n/a |
| **Comp median (n)** | | | **4.78 (13)** | | **226** (3) | **306** (2) | **252** (9) | **214.5** (2) | **231** (6) |
| **Ours 1587576514709814818** (4.67, 9) | | 6 | | terrace ("Patio or balcony") | booked | booked | **256.0** | **225.5** | **220.0** |
| **Ours 1571600691689064213** (4.31, 13) | | 6 | | terrace, City skyline view | booked | booked | **256.0** | **199.0** | **211.5** |

### Positioning summary
| Listing | Stay (n comps) | Ours | Comp median | Our percentile | vs median | Rating ours vs comp median | Review gap | `quality_premium` |
|---|---|---|---|---|---|---|---|---|
| 1587576514709814818 | 24-26 Nov (9) | 256.0 | 252 | P67 | +1.6% | 4.67 vs 4.78 | 9 vs 13 (-4) | **-0.044** |
| | 10-12 Nov (6) | 220.0 | 231 | P17 | -4.8% | | | |
| | 31 Oct-2 Nov (2, thin) | 225.5 | 214.5 | P100 | +5.1% | | | |
| 1571600691689064213 | 24-26 Nov (9) | 256.0 | 252 | P67 | +1.6% | 4.31 vs 4.78 | 13 vs 13 (0) | **-0.15** (cap) |
| | 10-12 Nov (6) | 211.5 | 231 | P0 | -8.4% | | | |
| | 31 Oct-2 Nov (2, thin) | 199.0 | 214.5 | P0 | -7.2% | | | |

Occupancy (one flat, twin booked/blocked = booked): next 30 (27 Oct-25 Nov) 12/30 = 40% vs market 40% (`pl_kpis.csv`, also 40% own); nights 31-60 8/30 = 26.7% (pl_kpis 33%) vs market 36%. No new P13 booking since 18 Oct (`booked_date` in price files).

`recommend` per stay:
- 10-12 Nov (next 30, 40% vs 40%): **raise +5%** on both ("in line with market but priced below what quality supports", P17 / P0).
- 24-26 Nov: **hold** with next-30 occupancy (P67 both); with 31-60 occupancy: hold (pl_kpis 33 vs 36) or **fix-listing** (calendar 26.7 vs 36, behind 9 pts at P67).

**Supported positioning (one line):** about **-4% vs comp median for 1587576514709814818** and **-15% for 1571600691689064213** (ratings 4.67 / 4.31 vs comp 4.78, no Superhost, no Guest favourite, no lift listed). Near term we sit at -5% / -8%, so hold, with at most +5% on the 4.67 listing's next-14-to-30-day nights. D+30 is already +1.6% over the median with 31-60 occupancy behind, so no raise there. The near-term gap is produced by channel and PriceLabs discounts, not the base (below). The twin price order is deprioritised (policy) and is not proposed here.

PriceLabs NL context (not comps): 2BR n=117 **204 / 244 / 302 / 368**, unchanged from 25 Oct. Next-30 open-night average 3064856 **£181.6 (about P22, -25.6% vs P50)**, 3090701 **£199.2 (P24, -18.4%)**, down from £186.2 / £212.4 on 25 Oct. Nights 31-60: £238.1 (P46) / £225.5 (P38), PriceLabs prices excl. cleaning.

### Findings from the price check
1. **Airbnb room price = 0.765x PriceLabs within 28 days, 0.90x at 29 days, on both listings.** All-in less £150 cleaning (policy `cleaning_fees`), divided by the PriceLabs sum for the same nights:
   - 1587576514709814818 vs 3090701: 31 Oct-2 Nov £300.64 / 393 = 0.765; 10-12 Nov £289.16 / 378 = 0.765; 24-26 Nov £361.80 / 402 = 0.900.
   - 1571600691689064213 vs 3064856: 31 Oct-2 Nov £247.85 / 324 = 0.765; 10-12 Nov £272.33 / 356 = 0.765; 24-26 Nov £361.80 / 402 = 0.900.
   - 0.765 = 0.90 x 0.85. A -15% applies on 31 Oct (5 days out) and on 10 Nov (15 days out) but not on 24 Nov (29 days out). That matches the **old Smoobu Airbnb rule "Last-minute -15% within 28 days"**. Policy says the rule was changed on 21 Oct to -10% within 14 days. The remaining flat -10% at 29 days is unexplained. Not verified in Smoobu: this is inferred.
   - Side result: the ratios hold only with the policy's "likely" mapping (1587576514709814818 = 3090701, 1571600691689064213 = 3064856). Swapping the mapping gives 0.93 / 0.63, so the evidence supports the mapping.
2. **The PriceLabs discount cut (a-discount-cut) is not applied as instructed on P13** (`get_customizations` 3064856, 26 Oct):
   - Last-minute is "5% discount within 14 days (Gradual)". On 25 Oct it was 20% (comp-west 25 Oct). The instruction was custom 0%.
   - The occupancy profile is now **"Aggressive"**, with custom factors: within 15 days, -30% at 10% occupancy and -20% at 30-40%; at 16-30 days, -20% at 10-20%. On 25 Oct it was "Market Driven".
   - Booking recency is toggled off, so PriceLabs' **default applies** (`effective`: 5% after 15 days with no booking, up to 15% after 45 days, on the next 30 days). P13's last booking was 18 Oct.
   - Result: on near-term nights the final price fell while the uncustomized price was flat: 1 Nov 155 -> 145 (uncustomized 149 -> 147), 8 Nov 186 -> 162 (181 both days), 9 Nov 183 -> 160 (178 -> 177). Some falls are market-driven instead: 24 Nov went 220 -> 186, but its uncustomized price also fell, 215 -> 182.
3. **Overrides by reyhan, 25 Oct 21:28-21:30Z (`get_user_logs`), not in policy `price_changes`:**
   - 26 Oct +35% with min stay 1.
   - 31 Oct-3 Nov cleared, then **31 Oct +10% re-added**. That explains the "31 Oct still +10%" seen on 25 Oct: it is a deliberate re-add.
   - 7-20 Dec min stay 3 -> 2 (no price change).
   - All were copied to child 3090701.
4. **Both Airbnb listings show the identical total £511.80 for 24-26 Nov.** The PriceLabs sums are 186+216 and 198+204, both 402. Policy (`listing_facts.P13.twin_listings`) says to keep the prices slightly different or Airbnb blocks the listings as duplicates. Only this one stay was checked for identical totals.
5. **Airbnb amenity gaps:** neither listing lists **Lift**, although the flat has a lift to the 3rd floor (`build/properties.py`). 1587576514709814818 has "with view" in its title but no view amenity. 2 of the 11 comps list Lift, and both price at the top of the set (355-425).

Differentiators that justify gaps: our large private terrace is matched by only 3 comps (balcony, garden). 6 of 11 comps list parking (1 free); we have none. Comps have 1 Superhost and 2 Guest favourites; we have neither. Cancellation policy per comp: NOT CHECKED.

## P10 Hanger Lane, 1-bed (3318177)
There are 0 sellable nights before the handback. 27 Oct-18 Nov is all booked (23 nights, `prices.csv`), and the rest is blocked (policy handback after 18 Nov). Market occupancy 30% / 24% (`pl_kpis.csv`). No comps and no positioning. `get_user_logs` shows no change 25-26 Oct.

## P02 Notting Hill, P03 Bayswater
Blocked on purpose (policy). P02: 58 blocked, 1 booked, 1 closed in the next 60 days. P03: 60 closed. No positioning.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Not in PriceLabs or `listings.csv` (25 Oct searches returned 0). No listing of ours to price. **NOT CHECKED**: no reference comps were built this run.

## Data gaps:
1. Booking.com NOT CHECKED. Comps are Airbnb only.
2. P13 comp n per stay is thin on the October dates: 3 for 30 Oct, 2 for 27 Oct and 2 for 31 Oct. Only 24-26 Nov (n=9) and 10-12 Nov (n=6) are usable. 1435433076956934058 (£390-425) is a high outlier; the median absorbs it.
3. Comp amenities (lift, view, parking, balcony) come from Airbnb amenity lists and are not verified. Cancellation policy per comp: NOT CHECKED. Our Superhost status is read from the listing page (false).
4. The 0.765 / 0.90 Airbnb ratios assume £150 cleaning (policy) and no extra-guest fee at 4 guests. Smoobu Airbnb pricing rules were not read today, so the cause is inferred.
5. No trend yet for P13 comps: today is day 1 of this comp set. NL is not bedroom-banded by date in summary mode, and its horizon is unstated.
6. P16, P18 and P19 have no data. Vrbo 12037152 (P13) was not analysed.

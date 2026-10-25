# Competitor positioning: EAST batch (D = 2026-10-25)

**What is new today: real comps.** Airbnb public pages load this run (Booking.com does not: HTTP 202 challenge page). For the first time the EAST batch has individual comps, 6-12 per flat (P04: 3). They are stored as **141 rows in `data/snapshots/2026-10-25/comps.csv`** (Airbnb id, URL, sleeps, rating, reviews, stay date, nightly price, source).

**How the comps were chosen.** Same bedroom count, sleeps ±1 (from the listing page), entire home, at least 10 reviews, within 1.0 km of our PriceLabs coordinates (`raw/listing_data.json`).
- Exceptions: P09 is 1.6 km (Greenwich/Cutty Sark area) with studios left out. P04 is 2.2 km because Barking has only 1 qualifying listing within 1 km. P15 uses Devons Road DLR as its centre, because it has no PriceLabs coordinates.
- Up to the 12 nearest are kept. Each is "active" because it came up in at least one of today's date searches.
- These ids are the baseline to track from tomorrow. 24 Oct had 0 comp rows, so there is no trend yet.

**Which stays were priced.** Fri-Sun 30 Oct-1 Nov and Tue-Thu 27-29 Oct (2 nights each), plus 24-27 Nov (D+30, 3 nights, so that our min-stay-3 flats can show up). Guests: 4 for 2-bed, 3 for 1-bed. Searches were run on airbnb.co.uk on 25 Oct; listing pages give sleeps, rating, Superhost status and amenities.

**What the price means.** The comp price is Airbnb's all-in figure: total ÷ nights, including cleaning and fees. No taxes are shown separately in London. "n/a" means the comp was not returned for those dates (booked or a min-stay clash), not that it is inactive.
- Our own Airbnb listings are host-only fee: commission is about 15.5% of room plus cleaning, e.g. P20 28-31 Oct £105.39 on £679.92 (`reservations.csv`). So our displayed price = room + cleaning, which is the like-for-like comparison.
- I have that like-for-like figure only where our flat was open and came up in the same search (P12 midweek, P20 D+30). Everywhere else I show the PriceLabs nightly price (`prices.csv`), which excludes cleaning, and label it as such.

**PriceLabs.**
- Read-only `get_neighbourhood_data` ran one call at a time, `all_operations_ok = true` for P01, P04, P09, P12 and P20. Tables are saved in `raw/neighbourhood_<ref>.json`.
- `get_neighborhood_data_sources` (3320302) still shows Competitor Listings "not enabled for this account" and "No Market Dashboard reports available".
- Five rows were appended to `market.csv` under `flock`, after the P13 and P10 rows from comp-west. No other rows were touched.

**Our ratings** come from our Airbnb listing pages (ids in policy `airbnb_listings_24oct`). `quality_premium` uses our rating only when we have at least 5 reviews.

## NL bedroom-matched percentiles, today vs 24 Oct
| Ref | Band (n) | P25/P50/P75/P90 | 24 Oct | Market occ 30/60 (`pl_kpis.csv`) |
|---|---|---|---|---|
| P01 | 2BR (143) | 224/272/339/416 | 226/274/338/413 | 33% / 26% |
| P04 | 2BR (86) | 142/179/223/283 | 142/179/222/282 | 26% / 20% |
| P09 | 1BR (127) | 119/142/173/219 | 119/142/172/218 | 36% / 31% |
| P12 | 2BR (121) | 179/213/257/295 | 179/215/257/295 | 40% / 32% |
| P20 | 2BR (147) | 224/267/327/408 | 224/266/324/402 | 35% / 28% |

The market is flat for a third day.

## Summary per property
**Columns:**
- **Our price same-date:** like-for-like where available, otherwise PriceLabs (PL) nightly.
- **Pctl (comp / NL):** comp percentile from `positioning.percentile_rank`; NL is the next-30 sellable average on the NL table.
- **Booked 30 vs mkt:** sellable nights only, from `prices.csv`. Handback nights are excluded; so are the deprioritised P04 2 Dec and P12 17 Nov one-night overrides, which are left out of the averages only and not re-raised.

| Ref | Our price, same-date | Comp median | Pctl (comp / NL) | Rating: ours vs comp median | Reviews: ours vs median (gap) | `quality_premium` | Booked 30 vs mkt | `recommend` |
|---|---|---|---|---|---|---|---|---|
| P01 | All 3 stays booked; PL 212 / 203 / 278 | 368 / 290 / 355 | n/a / n/a (0 open) | 4.67 vs 4.63 | 3 vs 25 (-22) | 0.0 (fewer than 5 reviews) | 100% vs 33% | raise-signal (no open nights) |
| P20 | **24-27 Nov Airbnb £333.50** (PL 315); Fri-Sun and midweek not open for 2 nights (min stay 3) | 310 / 284 / **297** | **P62** / P46 | none vs 4.66 | 0 vs 18 (-18) | 0.0 (no rating) | 13% vs 35% | next 30: fix-listing (comp P62); 31-60: lower -7% (NL P78) |
| P04 | All 3 stays booked or closed; PL 137 / 134 / 195 | 222 / 222 / 205 (n=1/1/2) | n/a / P41 | 4.69 vs 4.83 | 26 vs 23 (+3) | -0.056 | 34% vs 26% | next 30: raise +5% (P41); 31-60: raise +10% (P64, 50% vs 20%) |
| P09 | Not bookable for 2 nights (min stay 3 on 26-31 Oct); PL 150 / 145; D+30 booked (185) | 168 / 165 / 197 (n=1/3/3) | n/a / P57 | 5.0 vs 4.58 | 2 vs 24.5 (-22.5) | 0.0 (2 reviews) | 69% vs 36% | raise +10% (P57) |
| P12 | **Tue-Thu Airbnb £211.66** (PL 169.5); Fri-Sun and D+30 booked | 269 / **273** / 225 | **P0 (-22.5%)** / P33 | 4.27 vs 4.88 | 15 vs 18 (-3) | **-0.15** (cap) | 64% vs 40% | next 30: raise +10%; 31-60: lower -7% (NL P77, 25% vs 32%) |
| P15 | No PriceLabs/Smoobu/Airbnb data | 168 / 168 / 166 (n=5/1/4) | n/a | n/a vs 4.86 | n/a | n/a | n/a | n/a |

## Supported positioning (one line each)
- **P01: no action.** 0 sellable nights before the 20 Dec handback. Comps sit at 290-368 all-in, while our booked nights carry PL 203-278. The 31 Oct-30 Nov Airbnb stay pays £152/night (`reservations.csv`), but it is already sold.
- **P20: support -7% on 31-60, and the comp check agrees.**
  - On 24-27 Nov we show £333.50 all-in. That is **+12.2% over the comp median (P62)**, for a listing with 0 reviews against a comp median of 4.66 (18 reviews). Our clear differentiator is **free parking on site**, which none of the 12 comps has (7 have paid on-site parking), plus a balcony.
  - Supported position is about the comp median (0% to +5% for parking), so -7% is right. These prices already include the 24 Oct base cut to 350 (pushed 24 Oct 12:43Z, `listings.csv`).
  - Next 30 stays fix-listing: occupancy is behind, but price is not the barrier. This is Corentin's call; I am not pushing it.
- **P04: hold; the comp set is too thin to back `recommend`.**
  - Only 3 qualifying comps exist within 2.2 km. 1733027244747346716 is near East Ham station, in a different catchment.
  - The NL-based +5% sits against Corentin's -8% on 1-24 Nov, set 24 Oct for lack of demand (policy; the log shows the end date as 24 Nov).
  - Since then, one booking: 14-18 Nov, Booking.com, made 24 Oct. The 31-60 lead (50% vs 20%) is mostly the 20 Oct imported stays.
- **P09: hold 176; the comp check does not back `recommend`'s +10%.**
  - The open nights 26-31 Oct carry PL 136-151. reyhan added a -5% override with min stay 3 on 26-31 Oct on 24 Oct 11:28Z (`get_user_logs`).
  - On a 3-night stay that comes to about £184 all-in at most (PL plus the £125 Airbnb cleaning ÷ 3, from P09 Airbnb rows in `reservations.csv`), against a comp median of £165 for Tue-Thu (n=3).
  - We have only 2 reviews and 9 open nights left before the 26 Nov handback. The formal review of the 18 Oct base rise is due 26 Oct.
- **P12: supported, raise near-term open nights by about 5-10%; lower 31-60 by about 7%.**
  - Near term: quality allows at most -15% vs comps (4.27 vs 4.88, so `quality_premium` = -0.15), but on 27-29 Oct we sit at **-22.5% (£211.66 vs £273, P0, n=3)** while booked 64% vs 40%. That leaves about 7 points of room, which matches `recommend`'s raise.
  - December (29 Nov-13 Dec, PL 235-303 before the £150 cleaning): it sits above the D+30 comp median of £225 all-in (n=7) and is behind market at NL P77. -7% is supported.
  - The cheapest way to the near-term raise is Corentin's own plan: cut PriceLabs-side last-minute discounts (see the next section).

## Channel price checks found while pricing (Airbnb, same stays)
- **P12 27-29 Oct (2 nights, 4 guests): Airbnb shows £424 total, PriceLabs is 166 + 173 = £339.** If the Airbnb cleaning fee is £150 (P12 14-17 Nov Airbnb row, `reservations.csv`), the room part is £274 = **0.81x PriceLabs**.
  - Policy (`channel_pricing.airbnb_discount`) expects Airbnb bookings made after 21 Oct to pay close to PriceLabs, less only the 15%/20% stay discounts, which do not apply to 2 nights. So the ~19% is **unexplained**.
  - It is probably Smoobu Airbnb last-minute rules stacking on PriceLabs' own last-minute cuts: the double discounting Corentin wants removed. This is inferred: P12's Smoobu Airbnb rules have not been seen.
- **P20 24-27 Nov (3 nights, 30 days out): Airbnb £1,001 vs PriceLabs 300 + 313 + 332 = £945.** With £150 cleaning (P20 Airbnb rows), the room part is £851 = **0.90x PriceLabs**.
  - P20's Airbnb last-minute rule covers 0-14 days only (policy `listing_facts.P20`) and 3 nights has no stay discount, so ~10% is **unexplained**.
- **Airbnb amenities missing on all five of our EAST listings** (listing pages read 25 Oct). The facts below come from `build/properties.py`:
  - None of the five lists **Lift**, although P01, P04, P09 and P12 have one. 15 of the 57 comp candidates list it.
  - P04, P09 and P12 list no **balcony**, although all three have one. P01 and P20 do list "Patio or balcony".
  - None lists a **view** amenity, although P01 has river and City views and P04 and P12 have Canary Wharf views. 11 of the 57 comp candidates list River, City skyline, Canal or Marina view.
  - These are free amenity fixes that feed Airbnb's search filters. They are relevant to the bottom-10% quality flag on P04 and P12 (policy `airbnb_listings_24oct`).

## Changes in PriceLabs since the 24 Oct report
`get_user_logs` for 3320302, 3562176, 3318172, 2699998, 3547481 and 3288427, covering 24-25 Oct, shows 5 entries, all reyhan@ on 24 Oct:
- P20: -5% on 31 Oct-19 Nov, min stay 3 (12:41Z).
- P09: -5% on 26-31 Oct, min stay 3 (11:28Z).
- P04: -8% on 1-24 Nov (min 3), -5% on 6-22 Dec (min 3), and -5% on 1-28 Feb 2027 (min 4) (11:23Z).

These negative overrides are among the PriceLabs-side discounts Corentin's 24 Oct direction says to cut. As of the log, **none has been removed** (the P09 -5% is new). Whether the last-minute or booking-recency settings changed: NOT CHECKED here (pricelabs section).

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

## P15 Bow / Devons Road, 1-bed
There is no PriceLabs, Smoobu or Airbnb listing to compare. For reference only, there are 7 comps within 1 km of Devons Road DLR: Fri-Sun median **£168** all-in (n=5), D+30 **£166** (n=4), rating median 4.86.

## Comp tables (Airbnb, all-in £/night incl. cleaning; checked 2026-10-25; full source string per row in `comps.csv`)

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.67 (3), balcony)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | n/a | n/a | 287 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 647 | n/a | 508 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.47 (146) | none listed | n/a | n/a | 208 |
| [1385492120084469276](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.45 | 4 | 4.7 (20) | Lift | n/a | 248 | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | n/a | 310 | n/a |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.61 (28) | Lift/River view/balcony | n/a | n/a | 255 |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 383 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | n/a | n/a | 355 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | 402 | 338 | 441 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.8 (15) | Lift | 335 | 290 | n/a |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.38 (37) | Paid parking on premises | 284 | 284 | 379 |
| [20404597](https://www.airbnb.co.uk/rooms/20404597) | 0.68 | 6 | 4.64 (22) | Canal view/Lift/River view/Superhost/balcony | n/a | n/a | 290 |
| **Comp median (n priced)** | | | 4.625 (25.0) | | **368** (4) | **290** (5) | **355** (9) |

### P20 Waterford Court 2BR, max 4 (ours: 1791529331262420081, new, free parking + balcony)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1385492120084469276](https://www.airbnb.co.uk/rooms/1385492120084469276) | 0.27 | 4 | 4.7 (20) | Lift | n/a | 248 | n/a |
| [789954794593691037](https://www.airbnb.co.uk/rooms/789954794593691037) | 0.48 | 4 | 4.89 (18) | Paid parking on premises | 444 | 347 | n/a |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.5 | 5 | 4.84 (55) | Lift | n/a | 310 | n/a |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.51 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | n/a | n/a | 383 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.56 | 4 | 4.39 (18) | Lift/balcony | 402 | 338 | 441 |
| [790672189611831800](https://www.airbnb.co.uk/rooms/790672189611831800) | 0.56 | 4 | 4.41 (17) | Paid parking on premises | n/a | n/a | 261 |
| [813089760121939738](https://www.airbnb.co.uk/rooms/813089760121939738) | 0.59 | 4 | 4.4 (20) | Lift/Paid parking on premises/balcony | n/a | 232 | n/a |
| [51380799](https://www.airbnb.co.uk/rooms/51380799) | 0.61 | 4 | 4.62 (13) | Lift/Paid parking on premises/balcony | n/a | n/a | 333 |
| [1516006875488990547](https://www.airbnb.co.uk/rooms/1516006875488990547) | 0.64 | 4 | 4.75 (16) | Lift/River view/Superhost | 193 | 188 | 231 |
| [1384811870668527117](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.65 | 5 | 4.38 (37) | Paid parking on premises | 284 | 284 | 379 |
| [757342335233586120](https://www.airbnb.co.uk/rooms/757342335233586120) | 0.7 | 4 | 4.85 (13) | Paid parking on premises | n/a | 288 | 250 |
| [1343981071946969781](https://www.airbnb.co.uk/rooms/1343981071946969781) | 0.76 | 4 | 5.0 (25) | Superhost/balcony/Guest favourite | 310 | 270 | 250 |
| **Comp median (n priced)** | | | 4.66 (18.0) | | **310** (5) | **284** (9) | **297** (8) |

### P04 Barking 2BR, sleeps 6 (ours: 1455876748739910219, 4.69 (26); radius 2.2 km)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | n/a | n/a | 260 |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (23) | Free parking on premises/Superhost/Guest favourite | n/a | n/a | 150 |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | n/a |
| **Comp median (n priced)** | | | 4.83 (23) | | **222** (1) | **222** (1) | **205** (2) |

### P09 Greenwich 1BR, sleeps 4 (ours: 1681417771483132994, 5.0 (2); radius 1.6 km, studios excluded)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | n/a |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.43 (88) | none listed | n/a | 165 | n/a |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | n/a | n/a | 167 |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | n/a | n/a | 197 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.3 (20) | none listed | n/a | 158 | n/a |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.73 (15) | City skyline view/balcony | n/a | n/a | 243 |
| **Comp median (n priced)** | | | 4.58 (24.5) | | **168** (1) | **165** (3) | **197** (3) |

### P12 Mile End 2BR, sleeps 6 (ours: 1414703602412646285, 4.27 (15))

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 238 | 238 | 225 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | n/a | n/a | 312 |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.88 (77) | Superhost | n/a | n/a | 200 |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | n/a | n/a | 213 |
| [1199115199309731731](https://www.airbnb.co.uk/rooms/1199115199309731731) | 0.91 | 6 | 4.84 (31) | City skyline view/Lift/Superhost/balcony | n/a | n/a | 202 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (118) | Superhost/balcony/Guest favourite | 269 | 273 | 270 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony | 1035 | 1035 | 1032 |
| **Comp median (n priced)** | | | 4.88 (18) | | **269** (3) | **273** (3) | **225** (7) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours)

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | Fri-Sun 30 Oct-1 Nov | Tue-Thu 27-29 Oct | 24-27 Nov |
|---|---|---|---|---|---|---|---|
| [1611041940714716070](https://www.airbnb.co.uk/rooms/1611041940714716070) | 0.5 | 3 | 4.86 (22) | Free parking on premises/Superhost | 188 | n/a | n/a |
| [1191085742562460545](https://www.airbnb.co.uk/rooms/1191085742562460545) | 0.64 | 4 | 4.71 (31) | none listed | 174 | n/a | n/a |
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | n/a | n/a | 186 |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | n/a | n/a | 171 |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 160 | n/a | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | 168 | 168 | 160 |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.91 (23) | Free parking on premises/Guest favourite | 145 | n/a | n/a |
| **Comp median (n priced)** | | | 4.86 (15) | | **168** (5) | **168** (1) | **166** (4) |

---

Data gaps:
1. **Booking.com NOT CHECKED.** The page returns a 202 challenge. Comps are Airbnb only. P11-style Booking.com-only competition, and our own Booking.com displayed prices, are not covered.
2. **Comp prices are all-in (cleaning included) and ours is PriceLabs ex-cleaning, except P12 27-29 Oct and P20 24-27 Nov.** No other like-for-like comp percentile exists because our flats were booked or min-stay-closed on the test dates.
3. **Thin comp sets on some dates:**
   - P04 has only 3 comps (rule asks for 6). One of them is in the East Ham catchment.
   - Many comps were not returned for the 2-night October stays, so the n per date is 1-9.
   - P12's 29297702 at about £1,035/night is an outlier; it is kept, and the median absorbs it.
4. Comp lift, floor and view come from Airbnb amenity lists, not verified. Cancellation policy per comp: NOT CHECKED (not in the listing page HTML).
5. The 0.81x (P12) and 0.90x (P20) Airbnb room-vs-PriceLabs ratios assume a £150 cleaning fee, taken from the latest Airbnb reservations. Smoobu Airbnb pricing rules for P12 and P20 have not been seen.
6. PriceLabs Competitor Listings is still not enabled and there is no Market Dashboard. NL tables state no horizon and no cleaning treatment.
7. P15 has no listing data. P07 is not analysed (policy block). P20 is still missing from `build/properties.py` (sleeps 4 taken from Airbnb and policy).

# Competitor positioning: EAST batch (D = 2026-11-05)

Batch: P01, P04, P07, P09, P12, P15. P07 is blocked on purpose (policy). It is not analysed.

**Method**
- **Comp ids.** The comp set is the same as on 4 Nov (`data/snapshots/2026-11-04/comps.csv`). Search boxes and guest counts are unchanged: 4 guests for 2-beds, 3 for 1-beds; 2.5 km box for P04, 1.8 km for P09, 1.3 km for the others.
- **One comp replaced (P04).** 1343991336860365461 is replaced by **1601606251010507286**.
  - Why: the old comp was not bookable on any stay on 4 or 5 Nov. Today it also did not appear on any of 15 three-night stays from 5 Nov to 3 Jan (0.3 km box sweep). That makes it inactive for the next 60 days.
  - The new comp is 2BR, sleeps 5, 5.0 from 16 reviews, Superhost, free on-street parking, 2.68 km away, inside the box. It appeared on 9 of today's stays.
  - It was the only eligible candidate. All other 2BR listings with 10+ reviews in the box sleep 4, which is outside the ±1 rule against our 6 (checked on 11 listing pages).
- **Access.** Plain public Airbnb pages (HTTP 200), the same method as 26 Oct-4 Nov. There were 55 wide searches.
  - Comps or our listings that the wide pass missed got a 0.3 km box search each: 281 searches. Prices from that pass are marked `*`.
  - "–" means not bookable for that stay in either pass.
  - **Booking.com was not tried.**
- **Price basis.** Airbnb guest-paid **all-in total ÷ nights**: after any discount, with cleaning and Airbnb fees **included**. Airbnb shows no separate taxes. Our listings are priced the same way. PriceLabs and Smoobu figures are room only (cleaning excluded) and are labelled that way.
- **Stays.**
  - Trend stays: 6-8 Nov (next Fri-Sun), 10-12 Nov (next Tue-Thu), 24-27 Nov, 1-3 Dec and 4-6 Dec (the Fri-Sun 30 days out).
  - Open-night stays, from `prices.csv`, the Smoobu rates GET and `reservations.csv` (5 Nov):
    - **P04:** 9-12, 10-13, 18-21, 20-23, 21-24 and 18-24 Nov; 6-9, 9-12, 11-14, 14-17, 17-20 and 6-13 Dec.
    - **P04 double-sell check:** 5-8, 6-9, 5-9, 6-10 and 5-7 Nov.
    - **P09:** 10-12, 10-13 and 11-13 Nov.
    - **P12:** 12-14, 18-20 and 17-21 Nov; **26-27 Nov**; 30 Nov-3 Dec; **30 Nov-4 Dec, 2-4 Dec and 3-4 Dec** (new: 3 Dec reopened); 7-10, 7-13 and 11-13 Dec.
- **Data written.** `data/snapshots/2026-11-05/comps.csv` was copied forward from 4 Nov (3,534 rows) under `flock` on `.comps.csv.lock`. **539 rows** were then appended under the same lock:
  - 382 `comp-east`: every stored comp × its stays, with NOT RETURNED rows kept;
  - 80 `east-refband`: the P12 band, not stored comps;
  - 77 `east-ours`: our own Airbnb prices on the same stays and the P04 double-sell checks, plus the PriceLabs rows for P12 26 Nov and 3 Dec and the Smoobu rows for P09 10-12 Nov. These are not comps.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` for 4-5 Nov on P01, P04, P09 and P12;
  - `get_neighbourhood_data` ×4 (P12, P04, P09, P01): all `all_operations_ok`, including P09 and P01 although their prices return LISTING_NO_DATA;
  - `get_listing_prices` for P12, 5 Nov-13 Dec;
  - `get_listing_date_overrides` for P09, 5-26 Nov.
- **Smoobu (GET only, no guest data read):**
  - one rates GET for P01, P04, P09 and P12, 5 Nov-20 Dec;
  - one reservations GET for P12 arrivals 1-6 Dec, reading only id, reference, type, dates, timestamps, price, party size and channel.

## What changed in PriceLabs since 4 Nov 06:00Z (this batch)
- **No edits.** `get_user_logs` for 4-5 Nov returns 8 entries on P04 and P12. All are Reyhan's, between 01:24 and 01:31Z on 4 Nov, and all were already reported yesterday. There is nothing on P01 or P09.
- **P09.** The -5% override on 5-12 Nov (updated 26 Oct) is still set (`get_listing_date_overrides`). So a-handback-lastnights (+10%) is **NOT done**.
- **P12: the price on sale has moved away from "Your Price"** (`get_listing_prices` 5 Nov, refreshed 01:25:58Z).

| Night | Price (pushed; Smoobu holds the same) | Your Price | Gap |
|---|---|---|---|
| 30 Nov | 232 | 203 | +14% |
| 1 Dec | 238 | 208 | +14% |
| 2 Dec | 246 | 217 | +13% |
| 13 Nov | 261 | 222 | +18% |
| 12 Nov | 208 | 199 | +5% |

  - On 4 Nov the 30 Nov-2 Dec prices were 203 / 208 / 217.
  - Effect: the Airbnb all-in price for 30 Nov-3 Dec went from **£210.33 to £232.67 a night (+10.6%) overnight**, with no logged edit. On those nights Reyhan's -15% shows in Your Price but not in the price on sale.
  - Every other open P12 night is within £2 of Your Price.
  - Cause: NOT CHECKED. Passed to the PriceLabs auditor (t-pl-price-divergence).

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 5 Nov)
| Ref | Band (n) | P25/P50/P75/P90 today | 4 Nov | Market occ 30 / 60 (`pl_kpis.csv` 5 Nov) | Our average on sellable open nights (room only), with its NL percentile (5 Nov-4 Dec / 5-31 Dec) |
|---|---|---|---|---|---|
| P01 | 2BR (148) | 213/257/330/420 | 214/257/330/422 | 34% / 29% | no open nights |
| P04 | 2BR (91) | 138/169/214/257 | 138/170/218/257 | 23% / 20% | PriceLabs £156.2, P40 / £188.8, P61 |
| P09 | 1BR (125) | 109/131/158/202 | 109/133/160/203 | 36% / 32% | **Smoobu** £121.3, P39 (PriceLabs price NOT AVAILABLE) / handback |
| P12 | 2BR (121) | 170/204/234/291 | 170/205/235/292 | 41% / 34% | PriceLabs £245.4, P78 / £246.0, P78 (to 13 Dec) |

- **Bands moved by £0-4.** These are market bands, not comps. PriceLabs does not say what horizon they cover or whether cleaning is included.
- **PriceLabs `occ_insights` demand rises:**
  - P12: 5-9 Dec, +7.9%. Those nights are now booked by the 4-7 Dec stay; 7-9 Dec are open.
  - P04: 3-5 Dec, +7.9%. Those nights are booked.
  - P09: 7-10 Dec, +8.9%, after the handback.
  - All four markets: 26/27 Dec-1 Jan, +12.6% to +17.1%.
- **Same comp, same stay vs 4 Nov.** The median change is **0.0%** on every P04, P12 and P15 stay. P09 is -2.4% on 6-8 and 10-12 Nov (n=2-3) and -5.1% on 1-3 Dec. P01 is -6.3% on 6-8 Nov (n=1).
- **Comp moves over £5:**
  - P09: 1376679869251315227 24-27 Nov 159.33→148.33 and 1-3 Dec 168→159.50; 1501211872839579235 1-3 Dec 242.50→229.50.
  - P12: 1120913156789373408 30 Nov-3 Dec 223→204.33 and 24-27 Nov 201.33→211; 1077363497194834681 24-27 Nov 225→235; 1383544079404594066 4-6 Dec 374→362.50.
  - P01: 41905186 6-8 Nov 477→447 and 4-6 Dec 575→630.
  - P04: 1733027244747346716 10-13 Nov 103.33→97.67.
- **Reading.** The market is flat. The changes on our side are not edits:
  - P04 November eased 2-6% on last-minute decay (9-12 Nov 161.67→155.33; 18-21 Nov 173→162.33).
  - P09 10-12 Nov rose 143→149 because Smoobu now holds 113 / 122 / 129. Yesterday it held 100 / 110. The last PriceLabs push was 4 Nov 07:27:40Z (`listings.csv`).
  - P12 30 Nov-3 Dec rose +10.6% (the divergence above).

## Next 14 days and key December dates: our percentile vs like-for-like comps (Airbnb all-in £/night)

**Next 14 days (5-19 Nov)**

| Ref | Stay | Ours (4 Nov) | Comp median (n) | Our pctl | vs median | P12 band median (n), pctl, vs |
|---|---|---|---|---|---|---|
| P04 | 9-12 Nov | 155.33 (161.67) | 192 (3) | P0 | -19.1% | |
| P04 | 10-13 Nov | 157 (163.33) | 193.17 (4) | P25 | -18.7% | |
| P09 | **10-12 Nov** | **149** (143) | 164 (3) | **P0** | **-9.1%** | |
| P09 | **10-13 Nov (3 n)** | **131.33** | 178.83 (4) | **P0** | **-26.6%** | |
| P09 | 11-13 Nov | 155 | 164 (3) | P0 | -5.5% | |
| P12 | 12-14 Nov | 242 (234) | 237.50 (1) | P100 | +1.9% | 266 (5), P40, -9.0% |
| P12 | 18-20 Nov | 236 (236) | 245.75 (4) | P25 | -4.0% | 237.50 (9), P44, -0.6% |
| P12 | 17-21 Nov | 213.50 (212.75) | 234.50 (6) | P33 | -9.0% | 221.25 (11), P45, -3.5% |
| P04 | 18-21 Nov | 162.33 (173) | 239.84 (2) | P0 | **-32.3%** | |

**Rest of November and December**

| Ref | Stay | Ours (4 Nov) | Comp median (n) | Our pctl | vs median | P12 band median (n), pctl, vs |
|---|---|---|---|---|---|---|
| P04 | 20-23 Nov | 178.67 (185.33) | 217.84 (2) | P50 | -18.0% | |
| P04 | 21-24 Nov | 183.67 (183.67) | 217.84 (2) | P50 | -15.7% | |
| P04 | 18-24 Nov (6 n) | 156.67 (162.33) | 187.58 (2) | P50 | -16.5% | |
| P12 | **26-27 Nov (1 n)** | **367** (363) | 284 (1) | **P100** | **+29.2%** | 284 (3: 198/284/297), P100, +29.2% |
| P12 | 30 Nov-3 Dec | **232.67** (210.33) | 237.83 (6) | P50 | -2.2% | 221.67 (14), P57, +5.0% |
| P12 | 1-3 Dec (trend) | 248 (225.50) | 245.75 (4) | P50 | +0.9% | 237.50 (11), P64, +4.4% |
| P12 | **30 Nov-4 Dec (incl. 3 Dec)** | 223 | 273.38 (4) | P25 | -18.4% | 222 (15), P53, +0.5% |
| P12 | **2-4 Dec (incl. 3 Dec)** | 253.50 | 285 (2) | P0 | -11.1% | 240.50 (11), P55, +5.4% |
| P12 | 3-4 Dec (1 n) | not bookable (min 2) | 306 (2) | – | – | 297 (5: 281/284/297/302/328) |
| P04 | 6-9 Dec | 212.67 (212) | 210.34 (4) | P50 | +1.1% | |
| P04 | 9-12 Dec | 217.33* (215.67) | 222 (3) | P33 | -2.1% | |
| P04 | 11-14 Dec | 221.33 (221) | 213.84 (2) | P50 | +3.5% | |
| P04 | 14-17 Dec | 213.67 (213.67) | 241 (4) | P25 | -11.3% | |
| P04 | 17-20 Dec | 224.33 (224.33) | 241 (2) | P50 | -6.9% | |
| P04 | 6-13 Dec (7 n) | 159 (158.14) | 186.79 (2) | P0 | -14.9%; this is our weekly 15% discount (settled in `policy.json`) against comps that mostly show none | |
| P12 | 7-10 Dec | 254 (253.67) | 225 (3) | P67 | **+12.9%** | 236 (13), P54, **+7.6%** |
| P12 | 7-13 Dec | 246.17 (245.83) | 274.09 (2) | P50 | -10.2% | 268 (12), P42, -8.1% |
| P12 | 11-13 Dec | 310 (310) | 292.75 (2) | P50 | +5.9% | 313.75 (8), P50, -1.2% |

- **Medians moved.** The new P04 comp (£192-210 on most stays) pulled the P04 December medians down by £12-46 against 4 Nov (9-12 Dec 257.66 → 222; 14-17 Dec 260 → 241). So December now reads -11% to +3.5%, against -0.5% to -18% yesterday. Our prices barely moved.
- **P12 band.** The band is every 2BR with 10+ reviews within 1.3 km in the same searches. It excludes the placeholder-priced 29297702 and 39790006 and our own listing. Band sleeps are NOT CHECKED. Band ratings: median 4.91 on 26 Nov (n=3), 4.81 on 2-4 Dec, 4.63 on 12-14 Nov.

## Summary per property

**Columns**
- **Booked 30 / 60** = confirmed Smoobu nights ÷ sellable nights, for 5 Nov-4 Dec and 5-31 Dec.
- Excluded from those counts: handback nights, the deprioritised P04 2 Dec and P12 17 Nov, and orphans below min stay.
- **`recommend`** is run on the median comp percentile of our priced stays in each window, with `quality_premium`. A rating needs at least 5 reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl range | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 (comp pctl) |
|---|---|---|---|---|---|---|---|---|
| P01 | nothing open: booked to 30 Nov; gap block 30 Nov-17 Dec; 18-21 Dec booked | 447 (1) / 360 (5) / 309.84 (8) / 399 (6) / 478 (3) | n/a | **4.75** (new review; was 4.67) vs 4.71 | 4 vs 32 (-28) | 0.0 (<5 reviews) | 100% / 100% vs 34% / 29% | raise-signal; nothing to sell |
| P04 (synced 1657…) | 155.33-224.33 | 186.79-241 (n 2-4) | P0-P50; -32.3% to +3.5% | **4.11 vs 4.85** | 9 vs 27 (-18) | **-0.15** (cap) | 57% / 48% vs 23% / 20% | raise +10% (P38) / raise +10% (P42) |
| P04 unsynced 1455… | **sells 5-8, 6-9, 5-9 and 6-10 Nov** (£515, £515, £647, £648 totals); 157.50-231.67 on open stays | as above | -2% to +16% vs the synced listing on the same stays | 4.69 vs 4.85 | 26 vs 27 | -0.064 | n/a | n/a |
| P09 | 131.33-155 (10-13 Nov) | 164-178.83 (n 3-4) | **P0** on all three stays | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 86% vs 36% / handback | raise +10% (P0) / n/a |
| P12 | 213.50-367 | stored 225-306; band 221-314 | Nov band P40-P45; Dec band P42-P64; **26 Nov P100** | 4.27 vs 4.86 | 15 vs 18 (-3) | **-0.15** | 64% / **22%** vs 41% / 34% (60-day window = 5-13 Dec, before the handback) | raise +10% (P42) / **fix-listing** (P50); NL basis: raise +5% (P78) / **lower -7%** (P78) |
| P15 | no listing of ours | 146 (2) / 159.67 (5) / 155.50 (4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a |
| P07 | Blocked on purpose (policy). Not analysed. | | | | | | | |

## Supported positioning (premium or discount vs comp median)
- **P04 November: about -15% vs comp median (quality-adjusted parity). The -15% override puts four of the six stays below that.**
  - `quality_premium` = -0.15 (cap): 4.11 from 9 reviews vs 4.85.
  - Below the supported level: 9-12 Nov -19%, 10-13 Nov -19%, 18-21 Nov **-32%** and 20-23 Nov -18%.
  - At the supported level: 21-24 Nov -16% and 18-24 Nov -17%.
  - `recommend`: raise +10% (57% booked vs 23% market, comp P38).
  - **Reyhan's -15% (9-24 Nov, set 4 Nov 01:30Z) conflicts with Corentin's standing -8% on 1-25 Nov (`policy.json`, 24 Oct). For Corentin to confirm; this is not a new proposal.**
  - The comp evidence sits with -8%. That would lift the room rate about 8% (0.92 ÷ 0.85). It would bring 9-13 Nov close to -15% vs median; 18-21 Nov would still be about -27% (approximate: cleaning is fixed). Comp n is 2-4.
- **P04 December: hold. No raise and no cut.**
  - Five of the six stays sit at -11% to +3.5% vs median, above the -15% the review gap supports. NL P61.
  - `recommend` says raise +10% on bookings (48% vs 20%). The quality cap says we are already above quality-adjusted parity. With n=2-4, holding is what the evidence supports.
  - This differs from yesterday's "+2-3% on 9-12 and 14-17 Dec": the replacement comp lowered the medians, not our prices.
- **P09 10-12 Nov (the handback nights): raise to comp parity (`quality_premium` 0, 3 reviews).**
  - Raise 10-12 Nov by about +10% (£149 to about £164 all-in). The 3-night 10-13 Nov stay needs about +36% (£131.33 to about £179 all-in; it sells cheaper per night than the 2-night stay).
  - Reasoning: all three stays are P0. Bookings are 86% vs 36% market. The -5% override is still on.
  - **Caveat:** PriceLabs returns no prices for P09 today (LISTING_NO_DATA), so a PriceLabs edit may not reach Smoobu. Smoobu holds 113 / 122 / 129 (room), and that is what is on sale.
- **P12 November (-15% on 16-25 Nov; -10% on 12-13 Nov): hold.**
  - Multi-night stays sit at band -0.6% to -9% (P40-P45) and stored-comp -4% to -9%. That is inside the -15% to 0% the review gap supports.
  - `recommend` 30-day: raise +10% (64% vs 41%, comp P42). There is no case for a deeper cut.
- **P12 26 Nov: about -15% to 0% vs the 1-night band median, i.e. £241-284 all-in, not £367.**
  - £367 is P100, +29.2% vs 198 / 284 / 297 (n=3). The +15% override is unchanged since 4 Nov, so **t-p12-26nov-price is NOT fixed**.
  - A -15% override, matching the nights either side, with min 1 kept, fits the evidence.
- **P12 3 Dec (reopened after the cancellation): hold the price. It is not an orphan.**
  - 4-7 Dec is booked, so 3 Dec extends the open run 30 Nov-3 Dec to a 4-night gap (check-out 4 Dec). PriceLabs 253 / Your Price 254, min 2; Smoobu 253, min 2, available.
  - Stays ending 4 Dec are at the band median: 30 Nov-4 Dec £223 (band P53, +0.5%; stored -18.4%) and 2-4 Dec £253.50 (band P55, +5.4%).
  - It becomes a 1-night orphan only if 30 Nov-3 Dec sells first. If so, the 1-night band is £297 (n=5) and min 1 on 3 Dec would be supported.
- **P12 30 Nov-2 Dec and 7-10 Dec: trim back to the band median or a few % below. Do not raise.**
  - 30 Nov-3 Dec is +5.0%, 1-3 Dec +4.4% and 7-10 Dec +7.6% vs band (stored +12.9%). The review gap supports -15% to 0%.
  - The Dec window (5-13 Dec) is 22% booked vs 34% market. `recommend` gives fix-listing on comps (P50) and lower -7% on NL (P78).
  - On 30 Nov-2 Dec the excess is exactly the pushed-vs-Your Price gap. Restoring Your Price (203 / 208 / 217) would put 30 Nov-3 Dec at about -8% vs band, in the supported range. That is a fix to the push, not a new cut.
  - 7-13 Dec (-8.1%) and 11-13 Dec (-1.2%) are in range.
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback. The new review lifts the rating to 4.75 from 4 reviews.
- **P15: reference only.** The 1-bed median is £146-160 all-in in November and £155.50 on 1-3 Dec.

## Critical / high findings
- **CRITICAL: P04 double-booking exposure is still live, day 6 (t-p04-doublebook NOT fixed).**
  - On 5 Nov the unsynced Airbnb listing **1455876748739910219 is bookable 5-8 Nov (£515), 6-9 Nov (£515), 5-9 Nov (£647) and 6-10 Nov (£648)**.
  - At the same time the Booking.com guest is in residence until 6 Nov, and 6-9 Nov is a confirmed Airbnb stay (`reservations.csv` 5 Nov).
  - 5-7 Nov (2 nights) is not offered, consistent with a 3-night minimum. The synced 1657859794156786222 correctly shows none of these stays.
  - **No booking has appeared on 1455 for these dates:** it still sells them. 1455's own bookings are not visible in Smoobu or PriceLabs (NOT CHECKED).
  - **Action:** Corentin should close 5-10 Nov on 1455 now, or unlist it.
- **HIGH: P12 pushed price above "Your Price" on 30 Nov-2 Dec (+13-14%) and 13 Nov (+18%).**
  - 30 Nov-3 Dec went up £22/night on Airbnb overnight with no logged edit, and it now sits above the band median while December pace trails the market (22% vs 34%).
  - Cause NOT CHECKED. Passed to the PriceLabs auditor.
- **HIGH: P04 -15% on 9-24 Nov conflicts with Corentin's standing -8% (`policy.json` 24 Oct).**
  - The comp evidence does not support going deeper than -8%: the stays are already 16-32% under the comp median at P0-P50.
  - **For Corentin to confirm.**
- **HIGH: P09 10-12 Nov is priced at P0** (-5.5% to -26.6%, n=3-4) on 86% booked vs 36% market. a-handback-lastnights is not done: the -5% override is still on.
  - These are the last 3 nights before the 26 Nov handback, 5 days out. PriceLabs is not producing P09 prices today.
- **MEDIUM: P12 26 Nov** is still P100 (+29.2%).
- **MEDIUM: P12 4 Nov (£302 room, min 1) did not sell.** No reservation in `reservations.csv` 5 Nov covers 4 Nov.

## P12 3-7 Dec cancellation and 4-7 Dec booking (Smoobu GET, no guest data)
- **Cancelled:** id 161902221, Booking.com reference 6296073305, arrival 3 Dec, departure 7 Dec. Created 29 Oct 21:04 and cancelled (modifiedAt) 5 Nov 00:58:16. Party 3 adults + 3 children. Smoobu price £1,222.44.
- **New:** id 162667435, Booking.com reference **5178123645**, arrival 4 Dec, departure 7 Dec. Created 5 Nov 06:48 and modified 06:50:15; Smoobu type "modification of booking". Party 4 adults + 1 child. Smoobu price £827.79, which is the £677.79 room plus £150 (`reservations.csv`).
- **Reading.** The new booking was created 5 h 50 min after the cancellation and has a different Booking.com reference and a different party. Smoobu does not show it as a change to the cancelled reservation. Whether it is the same guest rebooking is NOT KNOWN.
- **Net:** -1 night and -£394.65 room.
- **18 Oct base-rise tally:** P12 bookings made from 19 Oct are now 5 confirmed + 2 cancelled (yesterday 5 + 1). The 3-7 Dec stay moves to cancelled and 4-7 Dec is added. P01 (1 vs 1) and P09 (1 vs 3) are unchanged.

## Plan items in this batch
| Item | Status 5 Nov |
|---|---|
| t-p04-doublebook | **NOT fixed** (day 6, above). |
| t-p12-4nov-price | Closed by time: the night did not sell. |
| t-p12-26nov-price | **NOT fixed.** +15% still set; £367 all-in, P100. |
| a-handback-lastnights (P09 10-12 Nov) | **NOT done.** The -5% override is still on. Smoobu rose to 113 / 122 / 129 after the 4 Nov 07:27Z push. P0 vs comps. |
| a-p04-dec | No edit. Hold is supported (above). |
| a-p13-record items in this batch | No new edits. The P04 -15% vs -8% conflict stands. P12 -15% (16-25 Nov, 27 Nov-13 Dec) conflicts with no standing decision. P12 17 Nov is deprioritised and not re-raised. |
| t-pl-price-divergence (P12 part) | **Worse on P12:** 30 Nov-2 Dec and 13 Nov now diverge by 13-18%. |
| Base changes | No `base_price` change on P01, P04, P09 or P12 in 4-5 Nov logs. |

## Comp tables

Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-05.
- "4 Nov x" is the same comp and stay on 4 Nov, shown where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- The full source for every row is in `data/snapshots/2026-11-05/comps.csv`.
- Lift, view and parking come from listing-page amenity reads (25 Oct-5 Nov). Comp cancellation policies are NOT CHECKED.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 193.33 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 447 (4 Nov 477) | 397 (4 Nov 394) | 445 (4 Nov 424.33) | 409 | 630 (4 Nov 575) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (154) | none listed | – | 188 | 195 | 208 | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | 363.50 | 351 (4 Nov 357.33) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 389 | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 (4 Nov 353) | 422 | 454 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | – | 285 | – | 335 | – |
| [1384811870668527117 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | 360 | – | 416 | 478 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.71 (32.0) | | **447** (1) | **360** (5) | **309.84** (8) | **399** (6) | **478** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 5 Nov-8 Nov | 6 Nov-9 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-24 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 250.17 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | 125 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | 103 | 139 | – | – | – | – | – | 97.67 (4 Nov 103.33) | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | – | – | – | – | 293.33 | 293.33 | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | 222 | – | 222 | – | – | – | – | 222 | 222 | – | – | – | 222 | 222 | 222 | 222* | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 173 | 173 | 178 | – | – | – | 164.33 | 164.33 | 164.33 | – | 178 | 178 | – | 178 | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost (added 5 Nov, replaces inactive 1343991336860365461) | – | 208 | 193.33 | 210 | – | – | – | 192 | – | – | – | – | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **155.33** | **157** | **162.33** | **178.67** | **183.67** | **156.67** | **212.67** | **217.33*** | **221.33** | **213.67** | **224.33** | **159** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | 171.67 | 171.67 | 179.67 | 171.33 | 175.33 | 180.67 | 179.67 | 157.50 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **173** (1) | **190.50** (4) | **193.33** (5) | **216** (2) | n/a (0) | n/a (0) | **211** (2) | **192** (3) | **193.17** (4) | **239.84** (2) | **217.84** (2) | **217.84** (2) | **187.58** (2) | **210.33** (4) | **222** (3) | **213.83** (2) | **241** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | P0 (-19.1%) | P25 (-18.7%) | P0 (-32.3%) | P50 (-18.0%) | P50 (-15.7%) | P50 (-16.5%) | P50 (+1.1%) | P33 (-2.1%) | P50 (+3.5%) | P25 (-11.3%) | P50 (-6.9%) | P0 (-14.9%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 10 Nov-13 Nov | 11 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 (4 Nov 168) | 164 (4 Nov 168) | – | – | – | 161 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 (4 Nov 165) | 161 (4 Nov 165) | – | – | – | 158 | 161 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 148.33 (4 Nov 159.33) | 159.50* (4 Nov 168) | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67* | 248.50 | 248.50 | 196.67 | 200.50* |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 229.50* (4 Nov 242.50) | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 243.67 | – | – | 242.67 | – |
| **Ours** | | | | | not bookable | **149** | not bookable | not bookable | not bookable | **131.33** | **155** |
| **Comp median (n)** | | | 4.58 (24.5) | | **162.50** (2) | **164** (3) | **196.67** (3) | **229.50** (3) | **248.50** (1) | **178.83** (4) | **164** (3) |
| **Our pctl (vs median)** | | | | | – | P0 (-9.1%) | – | – | – | P0 (-26.6%) | P0 (-5.5%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 12 Nov-14 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 3 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-13 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.50 | 237.50 | 235 (4 Nov 225) | 237.50 | – | 237.50 | 237.50 | 221.25 (4 Nov 218.75) | – | 225* | – | – | – | 225 | 212.50* | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | 297.50 | – | 316.67 | 312.50 | – | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 211 (4 Nov 201.33) | – | – | – | – | 201.75 (4 Nov 200.50) | – | 204.33 (4 Nov 223) | 213.25 | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 175 | 185 | 220 | – | – | 185 | 185 | – | 208.33 | – | – | – | 220 | – | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | – | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | 284 | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 (4 Nov 1042.50) | 1035 | 1032.33 | 1035 | 1042 (4 Nov 1035) | 1035 | 1035 | 1031 | 1043 | 1032.33 | 1031 | 1035 | 1043 | 1032.33 | 1032.50 (4 Nov 1029.67) | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | – | 313.67 | 297 | 362.50 (4 Nov 374) | – | 290 | 296.25 | – | 294.67* | 303 | 316 | 328 | 329.33 | 335.67 (4 Nov 336.83) | 348 (4 Nov 350.50) |
| **Ours** | | | | | not bookable | not bookable | not bookable | **248** | not bookable | **242** | **236** | **213.50** | **367** | **232.67** | **223** | **253.50** | not bookable | **254** | **246.17** | **310** |
| **Comp median (n)** | | | 4.86 (18) | | **237.50** (1) | **237.50** (3) | **242.83** (6) | **245.75** (4) | **362.50** (1) | **237.50** (1) | **245.75** (4) | **234.50** (6) | **284** (1) | **237.83** (6) | **273.38** (4) | **285** (2) | **306** (2) | **225** (3) | **274.09** (2) | **292.75** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P50 (+0.9%) | – | P100 (+1.9%) | P25 (-4.0%) | P33 (-9.0%) | P100 (+29.2%) | P50 (-2.2%) | P25 (-18.4%) | P0 (-11.1%) | – | P67 (+12.9%) | P50 (-10.2%) | P50 (+5.9%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 | – |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | 157 | 164.33 | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | 135 | 135 | 135 | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181* | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (201) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67* | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **146** (2) | **159.67** (5) | **155.50** (4) | n/a (0) |

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). The comps are Airbnb only, and our Booking.com displayed prices are not covered.
2. **PriceLabs prices NOT AVAILABLE for P09 and P01** (LISTING_NO_DATA). P09 uses the Smoobu rates GET (room only) and the Airbnb displayed price. Neighbourhood data and overrides still return for both.
3. **Thin comp n.**
   - P04 has 2-4 priced comps per stay. 593405916827094880 shows £222 on every 3-night date.
   - P04 replacement: the only eligible 2BR in the box that sleeps 5+ is 1601606251010507286, 2.68 km away. The P04 set stays at 7.
   - P12 stored comps: n=1-6, so P12 positioning leans on the band. Band sleeps are NOT CHECKED, and the 1-night readings are n=3 (26 Nov) and n=5 (3-4 Dec).
   - P09: n=3-4. P01 6-8 Nov: n=1. 4-6 Dec: n=0-3.
4. **P12 price divergence.** Why the pushed price exceeds Your Price on 30 Nov-2 Dec, 12-13 Nov and 5 Dec is NOT CHECKED (`get_customizations` not read).
5. **P04 1455….** Its bookings, the account that holds it, its pricing rule and its cleaning fee are NOT CHECKED. Bookability comes from public search only.
6. **P12 4-7 Dec booking.** Whether it is the same guest as the cancelled 3-7 Dec booking is NOT KNOWN. The PriceLabs price at booking is NOT KNOWN; today's raw (01:25Z) predates the booking and still shows 4-7 Dec open at 267 / 276 / 226.
7. **Not analysed:** P15 (no listing of ours) and P07 (blocked, policy). Cancellation policies, ours and comps, are NOT CHECKED.

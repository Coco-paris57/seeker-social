# Competitor positioning: EAST batch (D = 2026-11-06)

Batch: P01, P04, P07, P09, P12, P15. P07 is blocked on purpose (policy): not analysed. P15 has no listing of ours: reference only.

**Method**
- **Comp ids.** Same set as 5 Nov (`data/snapshots/2026-11-05/comps.csv`), same boxes and guests (4 guests for 2-beds, 3 for 1-beds; 2.5 km box P04, 1.8 km P09, 1.3 km others).
- **One comp dropped (P01), not replaced.** 1384811870668527117 was not bookable on any stay on 5 or 6 Nov, nor on any of 14 three-night stays from 9 Nov to 3 Jan (0.3 km box sweep today). Inactive for the next 60 days. P01 keeps 11 comps (inside 6-12), and P01 has nothing to sell, so no replacement was searched.
- **Access.** Plain public Airbnb pages (HTTP 200), same scripts as 26 Oct-5 Nov. 60 wide searches plus 285 comp/stay checks in a 0.3 km box around each comp or our listing that the wide pass missed (marked `*`). "–" = not bookable for that stay in either pass. **Booking.com not tried.**
- **Price basis.** Airbnb guest-paid **all-in total / nights** (after discounts, cleaning and Airbnb fees **included**; Airbnb shows no separate taxes). Ours priced the same way. PriceLabs and Smoobu figures are **room only, cleaning excluded**, and labelled so.
- **Stays.** Trend: 6-8 Nov (Fri-Sun, today), 10-12 Nov (Tue-Thu), 24-27 Nov, 1-3 Dec, 4-6 Dec (Fri-Sun 30 days out). Open-night stays from `prices.csv`, `reservations.csv` and a Smoobu rates GET (6 Nov ~07:19Z):
  - **P09:** 7-9, 7-10, 8-10, 9-11, 10-12, 11-13, 10-13 and 7-13 Nov (6 Nov is open too; 6-8 Nov is the trend stay).
  - **P12:** 12-14, 17-19, 18-20, 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec, 2-4 Dec; 7-10, 7-11, 9-11 Dec; **11-13 Dec (now booked: comps only)**.
  - **P04:** 9-12, 10-13, 11-14, 18-21, 20-23, 21-24, 18-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20, 6-13 Dec; and 6-9, 7-10, 6-10 Nov for the unsynced-listing double-sell check.
- **Reference bands (not comps).** Every Airbnb listing in the same searches with the same bedroom count, 10+ reviews, inside the radius, excluding ours and the placeholder-priced 29297702/39790006. P12: 2BR within 1.3 km. **P09 (new today): 1BR within 1.8 km**, because the stored P09 set returns only 2-4 prices on 7-13 Nov. Band sleeps are NOT CHECKED; band listings 1.35-1.73 km from P09 are outside the ~1 km rule and are evidence only.
- **Data written.** `data/snapshots/2026-11-06/comps.csv` did not exist: copied forward from 5 Nov (4,874 data rows) under `flock` on `.comps.csv.lock`, then **658 rows appended** under the same lock: 433 `comp-east` (every stored comp x its stays, NOT RETURNED rows kept, the dropped P01 comp marked INACTIVE), 137 `east-refband` (P12 and P09 bands), 88 `east-ours` (our Airbnb prices on the same stays, the unsynced P04 listing, Smoobu/PriceLabs room rates for P09 6-12 Nov and P04 9-11 Nov, P12 26 Nov, and the P12 11-13 Dec Booking.com room rate). None of the `east-ours` rows are comps.
- **PriceLabs (read-only, one call at a time):** `get_user_logs` (listing, 5-6 Nov, P01/P04/P09/P12); `get_listing_date_overrides` P09 6-26 Nov; `get_neighbourhood_data` P09, P12, P04 (all `all_operations_ok`). P01 band not re-pulled (no sellable nights; 5 Nov band used, labelled).
- **Smoobu (GET only):** one rates GET for 3318172, 2699998, 3562176, 6 Nov-20 Dec. No guest data read.

## What changed since 5 Nov 06:00Z (this batch)
`get_user_logs` 5-6 Nov: four edits, all Reyhan, 5 Nov 10:53-10:57Z. Nothing on P01.

| Time (5 Nov) | Listing | Edit | Effect on what Airbnb sells (all-in £/n, 5 Nov -> 6 Nov) |
|---|---|---|---|
| 10:53:39Z | P12 | 12-20 Nov **-5%**, min 2 (was -10% on 12-13 and -15% on 16-25 Nov) | 12-14 Nov 242 -> **252**; 18-20 Nov 236 -> **256.50**; 17-21 Nov 213.50 -> **234** |
| 10:53:48Z | P12 | 30 Nov-12 Dec **-5%**, min 2 (was -15%) | 30 Nov-3 Dec 232.67 -> **254**; 1-3 Dec 248 -> **269.50**; 2-4 Dec 253.50 -> **276**; 7-10 Dec 254 -> **278** |
| 10:56:24Z | P09 | 5-12 Nov override now **min stay 2 only, no price** (`get_listing_date_overrides`: the -5% is gone) | 10-12 Nov 149 -> **141.50** (Smoobu 10 Nov is £100, the PriceLabs minimum; see below) |
| 10:57:23Z | P04 | 9-24 Nov **-7%**, min 3 (was -15%) | 18-21 Nov 162.33 -> **173.33**; 20-23 Nov 178.67 -> **190.67**; 21-24 Nov 183.67 -> **196.33**; 9-12 Nov 155.33 -> **154.67** (Smoobu stuck at £140) |

- **P04 vs policy:** Reyhan's -7% on 9-24 Nov now sits 1 pt from Corentin's standing -8% on 1-25 Nov (`policy.json`, 24 Oct). Reported for Corentin to confirm; not a new proposal.
- **Smoobu below PriceLabs on open nights** (Smoobu rates GET 6 Nov vs `raw/prices_*.json`): P09 8-10 Nov **£100 x 3** vs PriceLabs 112/110/109; P04 9-11 Nov **£140 x 3** vs 152/153/158. Same finding as the PriceLabs section; cause NOT CHECKED here.
- **Pushed price above "Your Price" on every open night of P12, P04 and P09** (6 Nov raw). Examples: P12 30 Nov-3 Dec pushed 259/266/275/283 vs Your Price 232/238/246/253 (+11-12%); P04 18-24 Nov +9%; P09 7-12 Nov +5-6%. This is why P12 rose about 9% on Airbnb overnight after an edit that was meant to be a -5% override. Cause NOT CHECKED (PriceLabs auditor).

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 6 Nov)
| Ref | Band (n) | P25/P50/P75/P90 today | 5 Nov | Market occ 30 / 60 (`pl_kpis.csv` 6 Nov) | Our average on sellable open nights (PriceLabs room only), NL percentile (6 Nov-5 Dec / 6-31 Dec) |
|---|---|---|---|---|---|
| P01 | 2BR | not re-pulled | 213/257/330/420 | 33% / 28% | no open nights |
| P04 | 2BR (90) | 139/172/217/261 | 138/169/214/257 | 23% / 20% | £170.9, P49 / £189.3, P60 |
| P09 | 1BR (124) | 109/132/158/203 | 109/131/158/202 | 36% / 32% | £117.0, P34 (Smoobu sells £100 on 8-10 Nov) / handback |
| P12 | 2BR (121) | 170/203/234/292 | 170/204/234/291 | 41% / 34% | £267.6, **P84** / £258.5, **P81** (to the 13 Dec handback) |

- Bands moved by £0-4. They are market bands, not comps; horizon and cleaning inclusion are not stated by PriceLabs.
- `occ_insights` demand rises: P09 market 7-10 Dec +9.0% (after the handback); P12 4-7 Dec +8.6% (booked); P04 3-5 Dec +8.8% (booked); all three 27 Dec-1 Jan +14-17%.
- **Same comp, same stay vs 5 Nov:** median change 0.0% on almost every stay. Moves over £5: P04 1387112821878102742 cut 15-23% on every November stay (e.g. 10-12 Nov 173 -> 145.50, 24-27 Nov 178 -> 137); P12 1077363497194834681 6-14 Nov 237.50 -> 217.50; P12 1383544079404594066 24-27 Nov 313.67 -> 303; P01 41905186 24-27 Nov 445 -> 461.67, 4-6 Dec 630 -> 602; P01 1418178473526356202 1-3 Dec 389 -> 405; P01 1467264633617185891 -3 to -4%.
- **Reading:** the market is flat to slightly softer in November. Our moves are self-made: P12 +8-10% and P04 18-24 Nov +7% from Reyhan's edits plus the push gap.

## Priority 1: P09 Torrent Lodge 6-12 Nov (reopened; last unsold nights before the 26 Nov handback)
On sale now (Smoobu rates GET 6 Nov ~07:19Z, room only, min 2): **6 Nov £110, 7 Nov £130, 8-10 Nov £100 x 3 (the PriceLabs minimum), 11 Nov £116, 12 Nov £125 = £781** for 7 nights. 13-26 Nov is booked (`reservations.csv`). PriceLabs (raw, refreshed 5 Nov 10:56:56Z) prices 7-12 Nov at 130/112/110/109/116/125 (Your Price 123/106/104/104/110/119), all "Low/Normal Demand".

Airbnb all-in £/night, checked 6 Nov. Stored comps = the 6 kept P09 comps; band = every 1BR with 10+ reviews within 1.8 km.

| Stay | Ours | Stored median (n), our pctl, vs | 1BR band median (n), P25, our pctl, vs |
|---|---|---|---|
| 6-8 Nov (Fri-Sun, incl. tonight) | 160.50 | 162.50 (2), P0, -1.2% | 158 (4), 155, P50, +1.6% |
| 7-9 Nov | 147 | 162.50 (2), P0, -9.5% | 154.25 (4), 147.50, P25, -4.7% |
| 8-10 Nov | 136 | 162.50 (2), P0, -16.3% | 150.50 (6), 136, P17, -9.6% |
| 9-11 Nov | 136 | 164 (3), P0, -17.1% | 162.50 (6), 139.50, P0, -16.3% |
| 10-12 Nov | 141.50 | 164 (3), P0, -13.7% | 164 (7), 139.50, P29, -13.7% |
| 11-13 Nov | 151 | 164 (3), P0, -7.9% | 164 (7), 139.50, P29, -7.9% |
| 10-13 Nov (3 n) | 125.67 | 178.83 (4), P0, -29.7% | 175.67 (7), 158, P0, -28.5% |
| 7-10 Nov (3 n) | 123 | 161 (3), P0, -23.6% | 159.50 (4), 158, P0, -22.9% |
| 7-13 Nov (6 n) | 103.83 (£623 total) | 151.67 (3), P0, -31.5% | 150.25 (4), 148.83, P0, -30.9% |

- **What price fills them.** The cheapest like-for-like 1BRs (10+ reviews, within 1.8 km) sell 2-night stays on these dates at **£127-148 all-in per night** (band P25 £136-148). Our 2-night stays are already at £136-151, in that cheapest quartile. Our 3-night and longer stays (£104-126 a night) are below every comp. **Price is not what is keeping these nights empty. A further cut is not supported by the evidence.**
- **Supported positioning: parity to -5% vs the band median** (`quality_premium` 0.0: 5.0 from only 3 reviews, below the 5-review threshold; comp median rating 4.58, review gap -21.5). For 2-night stays that is about **£145-164 all-in a night**.
  - 6-7 Nov: hold (£110 / £130 room). 6-8 Nov is P50 and 7-9 Nov is P25 on the band.
  - **8-10 Nov: lift Smoobu from £100 to PriceLabs' own 112 / 110 / 109 (+10%).** That puts 8-10 and 9-11 Nov at roughly £145-150 all-in, band P25-median. They are at £100 because the price on sale is the PriceLabs minimum, not the price PriceLabs computes (PriceLabs section).
  - 11-12 Nov: hold (£116 / £125). The stays are at P29 and -8% to -14%.
  - Long stays: the 6-night 7-13 Nov total of £623 all-in is -31% per night vs comps, but it beats any single 2-night stay (£272-302). It is the best fill for the run; leave it. Which Airbnb length-of-stay and last-minute rules produce it on P09 is NOT CHECKED.
- `recommend` (comp basis): raise +10%: 70% booked vs 36% market (`pl_kpis.csv` 6 Nov window, handback-aware), median comp percentile P0 across 9 stays. The NL band gives the same (P34). This agrees with the +10% on 8-10 Nov. The other nights are already at the band P25-median, with no lead time left to test a bigger rise.
- 26 Nov onwards is handback, not inventory.

## Priority 2: P12 Mile End
**11-13 Dec (new Booking.com booking, made 5 Nov; Smoobu created 22:39Z per the PriceLabs section).** It fills the last two nights before the 13 Dec handback.
- Room £513.81 = **£256.91 a night** (Smoobu basePrice, cleaning excluded); commission £99.57 (`reservations.csv` 6 Nov).
- vs PriceLabs on 5 Nov raw (`2026-11-05/raw/prices_2699998.json`, refreshed 01:25:58Z): price 270 / 279 -> **0.936x**. vs the price pushed at 10:54:30Z and on sale at booking time (302 / 312, `2026-11-06/raw`) -> **0.837x**.
- Discount stack, on the push in effect: the Booking.com list price is about 1.15 x 307 = £353 a night (+15% markup, `policy.json`). The guest paid 0.728x of that, so **about 27% came off from stacked Booking.com promotions** (policy: report the size, not "unexplained"). There is no stay discount on 2 nights.
- vs comps (Airbnb all-in, 11-13 Dec): band median **£314.25 (n=8**, P25 £254, min £237.50); stored median £295.25 (n=2). On the 5 Nov morning our own Airbnb all-in was £310 (band -1.2%).
- The booking's room-only £256.91 is at band P25, but the band includes cleaning. Booking.com cleaning for P12 is NOT CHECKED, so the like-for-like position is between band P25 (no cleaning) and about +6% (if £150 cleaning applies).
- Reading: a December Fri-Sat stay sold within about a day at around the band median.

**26 Nov (1 night, min 1): still £367 all-in, P100, +29.2%** vs the 1-night band (198 / 284 / 297, n=3). PriceLabs 316 (uncustomized 304), Smoobu 316. Supported level: -15% to 0% vs the band median, **£241-284 all-in**. t-p12-26nov-price is NOT fixed.

**30 Nov-3 Dec (open 4-night run, check-out 4 Dec) and 7-10 Dec**: Reyhan's -5% (replacing -15%) plus the push gap put P12 above the band.

| Stay | Ours today (5 Nov) | Band median (n), our pctl, vs | Stored median (n), pctl, vs |
|---|---|---|---|
| 12-14 Nov | 252 (242) | 248.25 (4), P50, +1.5% | 217.50 (1), P100, +15.9% |
| 17-19 Nov | 253 | 217 (10), P60, **+16.6%** | 245.75 (4), P50, +3.0% |
| 18-20 Nov | 256.50 (236) | 237.50 (9), P67, +8.0% | 245.75 (4), P75, +4.4% |
| 17-21 Nov | 234 (213.50) | 225.13 (12), P58, +3.9% | 233.25 (6), P50, +0.3% |
| 30 Nov-3 Dec | 254 (232.67) | 224 (13), P69, **+13.4%** | 237.83 (6), P67, +6.8% |
| 1-3 Dec (trend) | 269.50 (248) | 237.50 (11), P73, **+13.5%** | 245.75 (4), P75, +9.7% |
| 30 Nov-4 Dec | 244.75 (223) | 222 (15), P67, +10.2% | 270.50 (4), P50, -9.5% |
| 2-4 Dec | 276 (253.50) | 240.50 (11), P73, **+14.8%** | 281.75 (2), P50, -2.0% |
| 7-10 Dec | 278 (254) | 243 (13), **P85, +14.4%** | 225 (3), P67, +23.6% |
| 7-11 Dec | 270.25 | 244.25 (12), P83, +10.6% | 220 (3), P67, +22.8% |
| 9-11 Dec | 302 | 257.50 (10), P80, **+17.3%** | 237.50 (3), P67, +27.2% |

- `quality_premium` = **-0.15** (cap): 4.27 from 15 reviews vs comp median 4.86 (review gap -3). The supported range is **-15% to 0% vs the band median**.
- **Supported positioning:**
  - **Hold** 12-14 Nov (+1.5%) and 17-21 Nov (+3.9%).
  - **Trim 30 Nov-4 Dec and 7-11 Dec by about 10-15% to the band median or a little under:** about £213-224 all-in for 30 Nov-3 Dec, £231-243 for 7-10 Dec.
  - Mechanically, restoring the push to "Your Price" alone is -11%. Reyhan's -5% is not a standing decision; the earlier -15% matched the evidence (band median +/-5% on 5 Nov).
- `recommend`:
  - 30-day: raise +10% (64% vs 41%, comp P67, 9 stays); NL: raise +5% (P84).
  - 60-day (to the 13 Dec handback, 43% vs 34% with 11-13 Dec now booked): **hold** (P67); NL: hold (P81).
  - Why not the 30-day raise: its demand lead comes from nights already booked. The open nights sit at band P67-P85 with a 0.59-star rating deficit, and the 11-13 Dec sale happened at about the band median.

## Priority 3: P04 Barking, November (-15% -> now -7%) and December
`quality_premium` = **-0.15** (cap): synced listing 4.11 from 9 reviews vs comp median 4.85 (review gap -18). Supported: **about -15% vs comp median.**

| Stay | Ours at -15% (5 Nov) | Ours at -7% (6 Nov) | Comp median (n) | Our pctl | vs median |
|---|---|---|---|---|---|
| 9-12 Nov | 155.33 | 154.67 (Smoobu £140 x 3, push not applied) | 187.33 (3) | P33 | -17.4% |
| 10-13 Nov | 157 | 159.33 | 179.33 (4) | P50 | -11.2% |
| 11-14 Nov | – | 164.67 | 239.84 (2) | P0 | -31.3% |
| 18-21 Nov | 162.33 | 173.33 | 239.84 (2) | P0 | -27.7% |
| 20-23 Nov | 178.67 | 190.67 | 207.17 (2) | P50 | -8.0% |
| 21-24 Nov | 183.67 | 196.33 | 202.17 (2) | P50 | -2.9% |
| 18-25 Nov (7 n) | 156.67 (18-24) | 154.14 | 177.72 (2) | P50 | -13.3% (incl. weekly 15%, policy) |
| 6-9 Dec | 212.67 | 213.67 | 210.34 (4) | P50 | +1.6% |
| 9-12 Dec | 217.33 | 217.33 | 222 (3) | P33 | -2.1% |
| 11-14 Dec | 221.33 | 221.33 | 213.84 (2) | P50 | +3.5% |
| 14-17 Dec | 213.67 | 213.67* | 241 (4) | P25 | -11.3% |
| 17-20 Dec | 224.33 | 225 | 241 (2) | P50 | -6.6% |
| 6-13 Dec (7 n) | 159 | 159.43 | 186.79 (2) | P0 | -14.6% (weekly 15%, policy) |

- **November.**
  - At -15% (5 Nov) the stays were 16-32% under the median, below the supported level.
  - At -7% (today) the median stay is **-13%**, at the supported level. Weekends 20-24 Nov sit above it (-3% to -8%); midweek 11-14 and 18-21 Nov sit below (-28% to -31%, n=2 only).
  - **Supported: about -7% to -8% (Reyhan's new -7% / the standing -8%), not -15%.** No further change is supported on n=2-4.
  - 9-11 Nov will only reach -7% if Smoobu takes the PriceLabs price (152/153/158 vs £140 on sale).
  - The market moved slightly down: comp 1387112821878102742 cut its November stays 15-23% overnight.
- **December: hold.** Stays sit at -11% to +3.5% vs median, above the -15% quality-adjusted parity. NL P60.
  - `recommend` says raise +10% (46% booked vs 20% market, comp P42). The quality cap and n=2-4 do not support a raise. Same as 5 Nov.
- `recommend` 30-day: raise +10% (57% vs 23%, comp P50, 7 stays; NL P49).

## Summary per property
"Booked 30 / 60" = confirmed Smoobu nights / sellable nights for 6 Nov-5 Dec and 6-31 Dec. Handback nights, the deprioritised P04 2 Dec and P12 17 Nov, and orphans below min stay are excluded. `recommend` runs on the median comp percentile of our priced stays in each window, with `quality_premium`. A rating needs 5+ reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl range | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (booked to 30 Nov; gap block 30 Nov-17 Dec; 18-20 Dec booked; handback 20 Dec) | 349.50 (5) / 309.84 (8) / 407 (6) / 478 (3) | n/a | 4.75 vs 4.71 | 4 vs 32 (-28) | 0.0 (<5 reviews) | 100% / 100% vs 33% / 28% | raise-signal / raise-signal | nothing to sell |
| P04 (synced 1657…) | 154.14-225 | 177.72-241 (n 2-4) | P0-P50; -31.3% to +3.5% | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 57% / 46% vs 23% / 20% | raise +10% (P50) / raise +10% (P42) | Nov about -13% vs median at -7% override = supported; Dec hold |
| P04 unsynced 1455… | **sells 6-9, 7-10 and 6-10 Nov** (£515, £518, £648); 162-231.67 elsewhere | as above | n/a | 4.69 vs 4.85 | 26 vs 27 | n/a | n/a | n/a | close it (below) |
| P09 | 103.83-160.50 (6-13 Nov) | stored 151.67-178.83 (n 2-4); band 150.25-175.67 (n 4-7) | stored P0 throughout; band P0-P50 | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 70% vs 36% / handback | raise +10% (P0) / n/a | parity to -5% vs band; +10% on 8-10 Nov only |
| P12 | 234-367 | stored 217.50-295.25; band 217-314.25 | band P50-P100 (Nov), P67-P85 (Dec) | 4.27 vs 4.86 | 15 vs 18 (-3) | -0.15 | 64% / 43% vs 41% / 34% | raise +10% (P67) / hold (P67); NL raise +5% (P84) / hold (P81) | -15% to 0% vs band: hold Nov; trim 30 Nov-4 Dec and 7-11 Dec about 10-15%; 26 Nov to £241-284 |
| P15 | no listing of ours | 146.25 (2) / 157.33 (5) / 155.50 (4) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy). Not analysed. | | | | | | | | |

## Critical / high findings
- **CRITICAL: P04 double-sell exposure, day 7 (t-p04-doublebook NOT fixed).**
  - Today the unsynced Airbnb listing **1455876748739910219** is bookable for **6-9 Nov (£515 total), 7-10 Nov (£518) and 6-10 Nov (£648)**.
  - The synced listing's confirmed Airbnb guest arrives **today** for 6-9 Nov (`reservations.csv` 6 Nov). The synced 1657859794156786222 correctly shows none of these stays.
  - No booking has appeared for these dates; 1455's own bookings are NOT CHECKED.
  - **Corentin: close 6-10 Nov on 1455 now, or unlist it.**
- **HIGH: P09 6-12 Nov reopened, 7 nights / £781 room on sale, no pickup yet.** All stays are at stored P0 and band P0-P50, so price is not the barrier.
  - Lift 8-10 Nov from the £100 minimum to PriceLabs' £112 / £110 / £109. Hold the rest.
  - These are the last unsold nights before the 26 Nov handback.
- **HIGH: P12 moved above the band overnight (+8-10% on Airbnb) on open Nov/Dec nights**, from Reyhan's -5% overrides (5 Nov 10:53Z, replacing -15%) plus pushed price > Your Price (+11-12%).
  - 30 Nov-4 Dec and 7-11 Dec are now band P67-P85 (+10% to +17%) against a supported -15% to 0%.
  - The 11-13 Dec sale shows the band median sells.
- **HIGH: Smoobu sells below PriceLabs on open nights:** P09 8-10 Nov £100 vs 109-112; P04 9-11 Nov £140 vs 152-158. Cause NOT CHECKED (PriceLabs section).
- **MEDIUM: P12 26 Nov still £367 all-in, P100, +29.2%** (n=3). Supported £241-284.
- **MEDIUM (for Corentin to confirm, not a proposal): P04 9-24 Nov now -7% (Reyhan, 5 Nov 10:57Z) vs standing -8% on 1-25 Nov.** The comp evidence sits with -7% to -8%.

## Plan items in this batch
| Item | Status 6 Nov |
|---|---|
| t-p04-doublebook | **NOT fixed** (day 7; 1455 sells 6-10 Nov while the synced guest arrives today). |
| t-pl-nodata (P01, P09) | Fixed: both return full PriceLabs series (6 Nov raw). |
| a-handback-lastnights (P09) | Changed by events: the -5% override was removed (5 Nov 10:56Z) and 1-10 Nov cancelled. 6-12 Nov are on sale at £781. 8-10 Nov sit at the £100 minimum. Comp evidence: +10% on 8-10 Nov only. |
| t-p12-26nov-price | **NOT fixed** (£316 room, £367 all-in, P100). |
| a-p04-dec | No edit. Hold supported. |
| P04 -15% vs -8% conflict | Reyhan moved to -7%. Within 1 pt of policy; for Corentin to confirm. |
| a-p13-record items here | P12 -15% -> -5% on 12-20 Nov and 30 Nov-12 Dec (no standing decision involved). P12 17 Nov is deprioritised and not re-raised. |
| Base changes | No `base_price` change on P01, P04, P09 or P12 in 5-6 Nov logs. |

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-06.
- "5 Nov x" = the same comp and stay on 5 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-06/comps.csv`.
- Lift, view and parking come from listing-page amenity reads (25 Oct-5 Nov). Comp cancellation policies are NOT CHECKED.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | 193.33 | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 392 (5 Nov 397) | 461.67 (5 Nov 445) | 409 | 602 (5 Nov 630) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.45 (154) | none listed | – | 181.50 (5 Nov 188) | 192 (5 Nov 195) | 200.50 (5 Nov 208) | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (55) | Lift | – | 349.50 (5 Nov 363.50) | 349 (5 Nov 351) | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 405 (5 Nov 389) | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | – | 285 | – | 335 | – |
| [1384811870668527117 (INACTIVE: dropped from 7 Nov)](https://www.airbnb.co.uk/rooms/1384811870668527117) | 0.64 | 5 | 4.37 (38) | Paid parking on premises | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (added 4 Nov, replaces inactive 20404597) | – | 360 | – | 416 | 478 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.71 (32.0) | | n/a (0) | **349.50** (5) | **309.84** (8) | **407** (6) | **478** (3) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 6 Nov-9 Nov | 7 Nov-10 Nov | 6 Nov-10 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 11 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | 257.67 | 257.67 | 254 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | 106.43 | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | 111 (5 Nov 103) | 138.67 | – | – | – | – | – | – | 105.67 (5 Nov 97.67) | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | – | 248.33 | – | – | – | – | – | – | – | – | – | – | – | – | 293.33 | 293.33* | – | 293.33 | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | 222 | – | 222 | – | – | – | – | – | 222 | 222 | 222 | – | – | – | 222* | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | – | 145.50 (5 Nov 173) | 137 (5 Nov 178) | – | – | – | – | – | 136.67 (5 Nov 164.33) | 136.67 (5 Nov 164.33) | – | – | 156.67 (5 Nov 178) | 146.67 (5 Nov 178) | – | 178 | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost (added 5 Nov, replaces inactive 1343991336860365461) | – | 204 (5 Nov 208) | 193.33 | 210 | – | – | – | – | 187.33 (5 Nov 192) | – | – | – | – | – | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **154.67** | **159.33** | **164.67** | **173.33** | **190.67** | **196.33** | **154.14** | **213.67** | **217.33** | **221.33** | **213.67*** | **225** | **159.43** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | 171.67 | 172.67 | 162 | 179.67 | 186 | 177.67 | 175.33 | 180.67 | 179.67 | 171.86 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | n/a (0) | **174.75** (4) | **193.33** (5) | **216** (2) | n/a (0) | **257.67** (1) | **257.67** (1) | **254** (1) | **187.33** (3) | **179.33** (4) | **239.84** (2) | **239.84** (2) | **207.17** (2) | **202.17** (2) | **177.72** (2) | **210.33** (4) | **222** (3) | **213.83** (2) | **241** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | P33 (-17.4%) | P50 (-11.2%) | P0 (-31.3%) | P0 (-27.7%) | P50 (-8.0%) | P50 (-2.9%) | P50 (-13.3%) | P50 (+1.6%) | P33 (-2.1%) | P50 (+3.5%) | P25 (-11.3%) | P50 (-6.6%) | P0 (-14.6%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Nov-9 Nov | 7 Nov-10 Nov | 8 Nov-10 Nov | 9 Nov-11 Nov | 11 Nov-13 Nov | 7 Nov-13 Nov | 10 Nov-13 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 161 | 164 | 164 | 164 | 151.67 | 161 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161 | 161 | – | – | – | 161 | 158 | 161 | 161 | 161 | 148.83 | 158 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | 144.33 (5 Nov 148.33) | 154 (5 Nov 159.50) | – | – | – | – | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 | – | – | – | 200.50 | 200.50 | – | 196.67 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 225.50 (5 Nov 229.50) | – | – | – | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67* | – | – | – | 243 | – | – | – | 226.67 | 244 (5 Nov 242.67) |
| **Ours** | | | | | **160.50** | **141.50** | not bookable | not bookable | not bookable | **147** | **123** | **136** | **136** | **151** | **103.83** | **125.67** |
| **Comp median (n)** | | | 4.58 (24.5) | | **162.50** (2) | **164** (3) | **196.67** (3) | **225.50** (3) | **248.50** (1) | **162.50** (2) | **161** (3) | **162.50** (2) | **164** (3) | **164** (3) | **151.67** (3) | **178.83** (4) |
| **Our pctl (vs median)** | | | | | P0 (-1.2%) | P0 (-13.7%) | – | – | – | P0 (-9.5%) | P0 (-23.6%) | P0 (-16.3%) | P0 (-17.1%) | P0 (-7.9%) | P0 (-31.5%) | P0 (-29.7%) |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 12 Nov-14 Nov | 17 Nov-19 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 9 Dec-11 Dec | 11 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 217.50 (5 Nov 237.50) | 217.50* (5 Nov 237.50) | 225 (5 Nov 235) | 237.50 | – | 217.50 (5 Nov 237.50) | 237.50 | 237.50 | 218.75 (5 Nov 221.25) | – | 225 | – | – | 225 | 218.75 | 237.50* | 237.50 |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (18) | Paid parking on premises | – | – | 311.67 | – | – | – | – | – | 297.50 | – | 316.67 | 312.50 | – | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 209 (5 Nov 211) | – | – | – | – | – | 202.50 | – | 202 (5 Nov 204.33) | 211.25 (5 Nov 213.25) | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | – | 175 | 185 | 220 | – | – | 185 | 185 | 185 | – | 208.33 | – | – | 220 | 220 | 220 | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | – | 254 | 250.67 | 254 | – | – | 254 | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | – | 1035 | 1032.33 | 1035 | 1035 (5 Nov 1042) | 1035 | 1040 | 1035 | 1033.50 (5 Nov 1031) | 1043 | 1032.33 | 1031 | 1035 | 1032.33 | 1031 | 1035 | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | – | 303 (5 Nov 313.67) | 291 (5 Nov 297) | 359 (5 Nov 362.50) | – | 282 | 289 | 295.25 | – | 289.33 (5 Nov 294.67) | 297.25 (5 Nov 303) | 309.50 (5 Nov 316) | 332 (5 Nov 329.33) | 331.50 | 325.50 | 353 (5 Nov 348) |
| **Ours** | | | | | not bookable | not bookable | not bookable | **269.50** | not bookable | **252** | **253** | **256.50** | **234** | **367** | **254** | **244.75** | **276** | **278** | **270.25** | **302** | not bookable |
| **Comp median (n)** | | | 4.86 (18) | | **217.50** (1) | **217.50** (3) | **237.83** (6) | **245.75** (4) | **359** (1) | **217.50** (1) | **245.75** (4) | **245.75** (4) | **233.25** (6) | **284** (1) | **237.83** (6) | **270.50** (4) | **281.75** (2) | **225** (3) | **220** (3) | **237.50** (3) | **295.25** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | P75 (+9.7%) | – | P100 (+15.9%) | P50 (+3.0%) | P75 (+4.4%) | P50 (+0.3%) | P100 (+29.2%) | P67 (+6.8%) | P50 (-9.5%) | P50 (-2.0%) | P67 (+23.6%) | P67 (+22.8%) | P67 (+27.2%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 6 Nov-8 Nov | 10 Nov-12 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 | – |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | – | 157.50 | 157.33 (5 Nov 164.33) | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | – | 135 | 135 | 135 | – |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181 | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50 | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – |
| **Comp median (n)** | | | 4.84 (14) | | n/a (0) | **146.25** (2) | **157.33** (5) | **155.50** (4) | n/a (0) |

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No comps, no advice.

---

Data gaps:
1. **Booking.com NOT CHECKED** (not tried). Comps are Airbnb only. Our Booking.com displayed prices are not covered, and the P12 11-13 Dec position vs comps is bounded, not exact, because P12's Booking.com cleaning fee is NOT CHECKED.
2. **Thin comp n.**
   - P09 stored set: 2-4 prices per stay; the 1.8 km band adds 4-7, but its 1.35-1.73 km listings are outside the ~1 km rule and band sleeps are NOT CHECKED.
   - P04: 2-4 per stay (593405916827094880 shows £222 on every date).
   - P12: stored n=1-6, so positioning leans on the band; 26 Nov is n=3.
3. **P09 Airbnb pricing rules** (length-of-stay, last-minute) that make 3-6-night stays 23-31% cheaper per night are NOT CHECKED.
4. **Why Smoobu sits below PriceLabs** on P09 8-10 Nov and P04 9-11 Nov, and why the pushed price exceeds Your Price on P12/P04/P09 open nights: NOT CHECKED here (PriceLabs section).
5. **P12 11-13 Dec:** the exact Smoobu price at the booking moment is inferred from the 10:54Z push (6 Nov raw), not read directly. Commission £99.57 is 19.4% of room; whether a Visibility Booster applies to P12 is NOT CHECKED (channel section; `policy.json` documents Camden only).
6. **P04 1455…:** its bookings, account, pricing rule and cleaning fee are NOT CHECKED; bookability is from public search only.
7. **P01** NL band not re-pulled today (no sellable nights). Ours and comps' cancellation policies are NOT CHECKED. P15 has no listing of ours; P07 is blocked (policy).

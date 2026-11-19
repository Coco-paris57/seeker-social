# Competitor positioning: EAST batch (D = 2026-11-19)

Batch: P01, P04, P07, P09, P12, P15.
- **P07** is blocked on purpose (policy `intentional_blocks`). Not analysed.
- **P15** has no listing of ours. Reference only.
- Nights after a handback are not inventory (policy `handbacks`: P01 last night 20 Dec, P09 26 Nov, P12 13 Dec). P09 and P12 December stays below are comp trend only.

**Method** (same as 26 Oct-18 Nov; yesterday's scripts reused from the scratchpad `east18/bin`, copied to `east19/bin`)
- **Comp ids:** the same set as 18 Nov (verified against `data/snapshots/2026-11-18/comps.csv`): P01 11, P04 7, P09 6, P12 7, P15 7. **No comp replaced today.**
  - P04 1387112821878102742 again not returned on any of the 22 stays (incl. 27 Dec-4 Jan). Kept: the 15 Nov sweep showed it bookable on 7 of 10 January-February stays (booked, not inactive). January not re-checked.
  - P12 29297702 still shows a placeholder-like price (£1,031-1,053/n). Kept out of the medians (blank `nightly_gbp`, price in `source`).
  - P01 1418178473526356202: coordinates found today, 0.3 km check run on every stay; not returned on any.
- **Access:** public Airbnb pages (HTTP 200). 57 wide searches with pagination, then 243 comp/stay checks in a 0.3 km box (3 hits, all P09/P15; 0 errors). Box sizes: 2.5 km for P04, 1.8 km for P09, 1.3 km for the rest. 4 guests for 2BR, 3 for 1BR. Checked 2026-11-19 07:19-07:27Z. **Booking.com: NOT CHECKED.**
- **Price basis = what guests see:** Airbnb **guest-paid all-in total / nights**, after discounts, cleaning and Airbnb fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs/Smoobu figures (`prices.csv` 19 Nov) are **room only, cleaning excluded**. Stays of 7+ nights include the 15% weekly discount (policy). Comps show their own discounts.
- **Stays (same dates for comps and us):**
  - Default: next Fri-Sun **20-22 Nov**, midweek Tue-Thu **24-26 Nov**, 30 days out **19-21 Dec** (new); 18-20 Dec kept for the trend.
  - P04: 20-24 Nov; 24-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20 and 6-13 Dec; remaining Christmas **20-23, 21-24, 23-26 Dec** (asked), plus 23-27 and 20-27 Dec; the sold stay **27 Dec-4 Jan**, plus 27 Dec-3 Jan, 28 Dec-2 Jan, 31 Dec-2 Jan for the trend.
  - P12: **19-21 Nov** (the open 19-20 Nov nights; 21 Nov is a check-in), 20-21 Nov, **26-27 Nov**, **30 Nov-3 Dec**, 30 Nov-4 Dec, 1-3 Dec, 2-4 Dec.
  - P01: **18-20**, 18-21, 19-21 Dec.
- **Reference bands (not comps):** every Airbnb listing in the same searches with the same bedroom count and 10+ reviews, inside the radius, excluding ours and per-night prices above £1,000. P04's 1531... operator units are collapsed into one ("op").
- **"Supported room"** = band median x 0.85-1.00 (the `quality_premium` range), converted back to room with each stay's own Airbnb all-in / PriceLabs room ratio. Approximate.
- **Data written:** `data/snapshots/2026-11-19/comps.csv` was absent; copied forward from 18 Nov under `flock` on `.comps.csv.lock`, then **appended 702 rows** under the same lock: 331 `comp-east` (every stored comp x stay, NOT RETURNED rows kept with a blank price), 267 `east-refband` (ref `Pxx:band`), 104 `east-ours` (ref `Pxx:ours`: Airbnb all-in rows, PriceLabs room rows, and one row for the sold P04 27 Dec-4 Jan stay from `reservations.csv`, no guest data).
- **PriceLabs (read-only, one call at a time):** `get_neighbourhood_data` detail for P04, P12, P01 (OK; saved to scratchpad `east19/dl/nd_*_detail.json`). `get_listing_date_overrides` P04 (OK). `get_user_logs` (listing; P01, P04, P09, P12; 18-19 Nov): **1 entry**: P04 DSO 18-19 Nov +5%, min 2, by Reyhan, 18 Nov 12:18Z (was +10%). Nothing on P12 or P01.
- **Smoobu: not called.** Room prices from `prices.csv` (19 Nov). P12 19 Nov (not in `prices.csv`) = PriceLabs `final_price` 251 from `get_neighbourhood_data`.

## What changed since 18 Nov (this batch)
**1. P04 27 Dec-4 Jan SOLD on Airbnb (booked 18 Nov), at P0 vs comps.** Smoobu: 8 nights, room £1,076.74 (£134.59/n), cleaning £142, commission £188.91 (= 15.5% of room + cleaning, so a host-only fee: guest paid about £1,218.74, **£152.34/n all-in**, inferred). PriceLabs now shows 27 Dec-3 Jan booked; 4-5 Jan open (151/147).
- The sale is exactly **PriceLabs 18 Nov room x 0.90 x 0.82**: 175/192/193/194/201/194/164/146 = £1,459 x 0.738 = £1,076.74. The policy weekly discount (15%) alone would give **£1,240.15**, so £163.41 more went in discounts than policy explains. Which Airbnb listing took it, and where the 0.90 comes from: NOT VERIFIED (channel agent). The £142 cleaning matches the 20-24 Nov Airbnb booking (synced listing); the 18-20 Nov booking had £129. The unsynced 1455... was not bookable on any Christmas-NYE stay on 18 Nov.
- NYE min stays did apply: the stay starts 27 Dec (min 7) and runs 8 nights, so it satisfies min 7/5.

**2. PriceLabs raised P04 20-26 Dec about 6% (no logged edit)**: 162/162/159/169/173/167/165 -> **171/174/169/180/183/179/177 = £1,233** (was £1,164). Live on Airbnb: 21-24 Dec £194.33 -> **£204.33** (+5.1%), 23-27 Dec £187.25 -> **£197.50** (+5.5%), 20-27 Dec £142.29 -> **£150.29** (+5.6%). 18-19 Dec 159/164 -> **150/175**.

**3. P04 unsynced 1455876748739910219 is still bookable on 20-24 Nov: £781 (£195.25/n)** (18 Nov: £742). Those nights are sold on the synced listing and the guest **arrives tomorrow (Fri 20 Nov)**. Also bookable 20-22 Nov (£457) and 18-20 Dec (£509; synced listing closed there by min 3). **t-p04-doublebook: not fixed, day 20.**

**4. PriceLabs raised P12 overnight (no logged edit; pushed 19 Nov 06:31Z), undoing most of yesterday's cut:** 19 Nov 234 -> **251**; 20 Nov 299 -> **319**; 26 Nov 294 -> **310**; 30 Nov-3 Dec 244/268/263/268 -> **261/286/282/282** (+6% to +7%). Airbnb all-in: 26-27 Nov £350 -> **£363**; 30 Nov-3 Dec £247.67 -> £261.67; 1-3 Dec £266 -> £280; 2-4 Dec £266 -> £278.50.

**5. P01 18-20 Dec still `Blocked`** (`prices.csv` 19 Nov; 284/293/246, were 279/276/245). Airbnb does not return our listing on 18-20, 18-21 or 19-21 Dec. **t-p01-1820block: not fixed.**

**6. Comps held.** 79 of 95 like-for-like comp/stay prices are within £1 of 18 Nov. Moves of £10+: P01 41905186 18-20 Dec 327 -> 342 and 18-21 Dec 316.33 -> 326.33; P01 1684834789445533643 24-26 Nov 306 -> 294; P01 1439222085860877494 24-26 Nov 315.50 -> 282; P15 1617544963466664181 18-20 Dec 218 -> 195.50. **No P04 or P12 comp moved by £10 or more** (29297702 placeholder excluded).

## PriceLabs market percentiles (`get_neighbourhood_data`, 19 Nov)
Market bands, not comps. "Ours" = PriceLabs room. Compsets: P04 NL 1-3BR (187); P12 NL 2-3BR (135); P01 NL 1-3BR (285). Basis "Host-only fee"; horizon not stated. Percentiles interpolated.

| Ref | 2BR summary P25/P50/P75/P90 (n) | Market occ 30/60 (`pl_kpis`) | Ours vs daily market (stay average P25/P50/P75/P90) |
|---|---|---|---|
| P04 | 138/173/213/249 (88) | 23% / 19% (ours 47% / 37%) | **27 Dec-4 Jan sold at £134.59 room vs 132.8/170.8/218.4/284.6 (18 Nov file): P26, -21% vs P50** (PriceLabs' own 18 Nov price £182.4: P56). 24 Nov £135 (124/149/210/245): P36. 6-20 Dec £146.3 (126.5/158.9/203.4/243.9): P40. 17-20 Dec £157.0: P45. **20-23 Dec £171.3 (129/160/206.7/257.7): P56. 21-24 Dec £174.3: P57. 23-26 Dec £180.7 (140/170/214/279): P56** |
| P12 | 173/206/233/292 (119) | 43% / 34% (ours 77% / 88%) | **19-21 Nov £285 (173.5/202.5/243.5/314.5): P84. 26 Nov £310 (168/200/239/308): above P90**. 30 Nov-3 Dec £276.3: P81. 1-3 Dec £284: P82. 2-4 Dec £282: P79 |
| P01 | 220/267/341/434 (145) | 34% / 28% | **18-20 Dec (blocked) £288.5 (201/233.5/314.5/463): P67**; 18-21 Dec £274.3: P62 |

- `prices_with_default_customization` (what PriceLabs would charge with default settings) for the sold 27 Dec-4 Jan nights: £269.8/n avg today vs final £193.8 (the listing's customisations are pulling it down ~28%). `fp_insights` P04: 27-31 Dec market prices +10.4%. `occ_insights` P04: 28-31 Dec occupancy +21.8%.

## Priority 1: P04 Barking
- **Quality:** `quality_premium(4.2, 4.83)` = **-0.15** (the cap). We are 4.2 from 10 reviews; the comp median is 4.83 from 27 (gap 17). **Supported position: -15% to 0% vs the band median.**
- Overrides (`get_listing_date_overrides`): unchanged except 19 Nov now +5% min 2 (Reyhan, 18 Nov 12:18Z). 20-24 Nov -5% min 3; 6-22 Dec -5% min 3; 23-26 Dec -5% min 4; 27 Dec -5% min 7; 28-31 Dec -5% min 5; 1 Jan -2% min 4; 2 Dec +200% min 1.

### The 27 Dec-4 Jan sale vs what comps charge for the same stay

| Stay | Ours | Stored comp (n) | Band op median (n) | vs stored / vs band | Pctl | PriceLabs market |
|---|---|---|---|---|---|---|
| **27 Dec-4 Jan (8 n), checked today** | **sold £152.34/n all-in** (room £134.59) | 248.25 (1: 1193087690344044898, 4.83 (18), Superhost, 0.25 km) | **221.31 (2)**: 194.38 (1072316558208098643, 4.93 (76), Superhost, 0.33 km; band only, not a stored comp) / 248.25 | **-38.6% / -31.2%** | **P0** | room P26 |
| 27 Dec-3 Jan (7 n), 18 Nov (the day it sold) | Airbnb quoted £158.71/n | 249 (1) | 229.07 (2) | -36.3% / -30.7% (at the quote) | P0 | |
| 27 Dec-3 Jan, today | booked | 249 (1) | 226.50 (2) | | | |
| 28 Dec-2 Jan, today | booked | 254 (1) | 249.80 (2) | | | |

- **Supported for that stay** (band 221.31 x 0.85-1.00, less £142 cleaning): room **£1,363-1,628** (£170-204/n). The sale (£1,076.74) is **21-34% below**; estimated shortfall **£286-552** (n = 2; estimate).
- **Against PriceLabs' own numbers:** -26% vs its 18 Nov price (£1,459); -£163 vs that price less the policy 15% weekly; -28% vs the cancelled Booking.com stay (£185.95/n room).
- **Read:** the stay sold the day after the cut. It sold low (P0 of comps, P26 of the PriceLabs market) because two discounts stacked on an already-cut price. Comp evidence supported about +15% on these nights (18 Nov section), not -26%.

### Remaining Christmas, 20-26 Dec at £1,233

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n | Market pctl |
|---|---|---|---|---|---|---|---|
| **20-23 Dec (3 n)** | **201.67** (£605, "orig" £678) | 171/174/169, avg 171.3 | 241 (2), -16.3% | **218.67 (5), -7.8%** | P20 | 158-186 = **in range** | P56 |
| **21-24 Dec (3 n)** | **204.33** (£613, "orig" £699) | 174/169/180, avg 174.3 | 241 (2), -15.2% | **218.67 (5), -6.6%** | P20 | 159-187 = **in range** | P57 |
| **23-26 Dec (3 n)** | **not bookable** (23 Dec min 4) | 180/183/179 | 245 (2) | 226.67 (5) | | | P56 |
| 23-27 Dec (4 n) | 197.50 (£790, "orig" £906) | 180/183/179/177, avg 179.8 | 243.62 (2), -18.9% | 228 (5), **-13.4%** | P40 | 176-208 (-2% to +15%) | |
| 20-27 Dec (7 n) | 150.29 (£1,052, "orig" £1,252) | avg 176.1 | 230.36 (2), -34.8% | 214.29 (4), -29.9% | P0 | 213-251 (includes the 15% weekly) | |

- **Supported positioning:**
  - **20-22 Dec: hold** (171/174/169). 3-night stays are -7% to -8% vs the band, mid-range.
  - **23-26 Dec: hold to +5%** (180/183/179/177 -> up to about £189/n). 23-27 Dec is -13.4%, at the low edge of the range.
  - Yesterday's +10% (23-26 Dec) is now largely done by PriceLabs' +6%. The 7-night stay stays below the band; that is the policy weekly discount, not a nightly gap.
- **Min stays now create orphans (for Corentin).** 27 Dec is booked. With min 4 on 23-26 Dec, the only stay from 23 Dec is 23-27 Dec, and no check-in on 24, 25 or 26 Dec can be sold. If 21-24 Dec sells, 24-26 Dec cannot be sold. **Min 3 on 23-26 Dec** stays within policy (min 3, never fewer) and makes 23-26 and 24-27 Dec sellable.

### 24 Nov and 6-19 Dec

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Stored median (n), vs | Band op median (n), vs | Pctl in band | Supported room £/n |
|---|---|---|---|---|---|---|
| 24-25 Nov (1 n) | not bookable (1-night gap; min 3; `available` False) | 135 | 182 (2) | 225 (3) | | n/a: policy min 3 |
| **6-9 Dec** | 156.33 | 143/142/142 | 222 (3), -29.6% | 214.33 (6), **-27.1%** | P33 | **166-195** (+17% to +37%) |
| **9-12 Dec** | 158.67 | 141/144/151 | 212.5 (2), -25.3% | 214.33 (4), -26.0% | P0 | **167-196** (+15% to +35%) |
| 11-14 Dec | 161.33 | 151/153/143 | 214.33 (2), -24.7% | 214.33 (4), -24.7% | P0 | 168-198 (+13% to +33%) |
| **14-17 Dec** | 154.00 | 136/139/143 | 239.84 (4), -35.8% | 226 (6), **-31.9%** | P17 | **174-204** (+25% to +47%) |
| **17-20 Dec** | 182.33 (18 Nov 188.33) | 146/150/175 | 240.66 (2), -24.2% | 222 (5), **-17.9%** | P20 | **162-191** (+3% to +22%) |
| 6-13 Dec (7 n) | 127.43 | 141-153 | 186.5 (2), -31.7% | 155.43 (5), -18.0% | P0 | 150-177 (includes the weekly) |

- **6-16 Dec: about +20% supported** (room about £165-175, from 136-153). Unchanged from 17-18 Nov; comps did not move.
- **17-18 Dec: about +10%** (146/150 -> about £160-165). **19 Dec: hold** (175, already up from 164).
- **24 Nov:** a 1-night gap between two bookings; under policy (min 3, never fewer) it cannot be sold. Nothing to position.
- **`recommend`:** 30-day (47% vs market 23%, comp P0, quality -0.15) = **raise +10%**; 31-60 day (37% vs 19%) = **raise +10%**. **Adopted at the larger size above for 6-16 Dec** (the comp gap is bigger than the formula step).

## Priority 2: P12 Mile End
- **Quality:** `quality_premium(4.27, 4.88)` = **-0.15** (the cap). We are 4.27 from 15 reviews; the stored-comp median is 4.875 from 25 (gap 10). **Supported: band median x 0.85-1.00.**

| Stay | Ours, Airbnb all-in £/n | PriceLabs room | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported room | Move vs PriceLabs |
|---|---|---|---|---|---|---|
| **19-21 Nov (2 n)** | **305** | 251/319 | 261.5 (3), P100, **+16.6%** | 249.5 (2), P100, +22.2% | 208-244 | **-27% to -14%** |
| 20-21 Nov (1 n) | not bookable (min 2; 21 Nov check-in) | 319 | 322 (2) | 299 (1) | | |
| **26-27 Nov (1 n)** | **363** (18 Nov 350) | **310** (294; min 1) | 284 (5), **P100, +27.8%** | 291 (2), P100, +24.7% | **206-243** | **-33% to -22%** |
| **30 Nov-3 Dec** | **261.67** (247.67) | 261/286/282 | 244.5 (12), P58, **+7.0%** | 250.67 (5), P60, +4.4% | 219-258 | **-21% to -7%** |
| 30 Nov-4 Dec | 250 (237) | 261/286/282/282 | 243.75 (11), P55, +2.6% | 297 (3), P33, -15.8% | 230-271 | -17% to -3% |
| **1-3 Dec** | **280** (266) | 286/282 | 248.25 (8), P75, **+12.8%** | 248.25 (4), P75, +12.8% | 214-252 | **-25% to -11%** |
| 2-4 Dec | 278.5 (266) | 282/282 | 240.5 (9), P78, +15.8% | 254 (3), P67, +9.6% | 207-244 | -27% to -14% |

- **Every open P12 stay is again above the band** (+3% to +28%), against a quality ceiling of 0%. PriceLabs NL puts them at P79 to above P90.
- **19-20 Nov: about -15%** (251/319 -> about £215/270). It is the last open pair before a 21 Nov check-in, and 19 Nov is tonight.
- **26 Nov: room about £205-240 (about -25%), keep min 1.** At £310 room / £363 all-in it is P100, +28% vs the band. **t-p12-26nov-price: not fixed, worse by £16.**
- **30 Nov-3 Dec: about -10%** (261/286/282/282 -> about £235/255/250/250). 1-3 Dec (+12.8%) and 2-4 Dec (+15.8%) carry most of the gap.
- **`recommend`** 30-day (77% vs 43%, comp P71 median over 6 open stays) = mechanical **raise +10%**. **Not adopted:** the lead is nights already sold, the open stays sit above the band, and the raise branch ignores a negative `quality_premium`. 31-60 day: no sellable night (handback 13 Dec).
- Note: on 30 Nov-3 Dec the Airbnb all-in (£785 for 3 n) is below PriceLabs room alone (£829). Something on Airbnb takes about 6% or more off before cleaning. NOT VERIFIED; for the channel agent.

## Priority 3: P01 Bowsprit Point 18-20 Dec (blocked, before the 20 Dec handback)
- **Still blocked** (18-20 Dec `Blocked`, 284/293/246, min 3). Not returned on Airbnb.
- **Comps:**
  - 18-21 Dec (3 n): stored median **£369.67** (n = 7, range 281-524); band **£345** (n = 13).
  - 18-20 Dec: stored £376 (3), band £359 (6).
  - 19-21 Dec: stored £366.50 (3), band £366.50 (5).
- **If reopened** at today's 284/293/246 plus £149 cleaning (carried figure), before any Airbnb guest fee:
  - 18-21 Dec: £324/n, **-12.4% vs stored, -6.1% vs band**.
  - 18-20 Dec: £363/n, -3.5% vs stored, +1.1% vs band.
  - PriceLabs NL: P62-P67.
- **Supported: parity (about 0%).** `quality_premium(4.75, 4.8)` = -0.02, on only 4 reviews. Today's price needs no cut; up to about +6% on 18-21 Dec is supported.
- **For Corentin (carried policy conflict):** the policy says "before the date, maximise revenue normally", but about £823 of room nights stay blocked.

## Priority 4: P09 Torrent Lodge
- **No open night before the 26 Nov handback** (booked through 26 Nov). Nothing to position.
- Comp median £166.50-168 (n = 2-3). `quality_premium(5.0, 4.56)` = +0.15, on only 3 reviews. `recommend`: raise-signal (100% vs market 40%).

## Summary per property
| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30/60 vs market | `recommend` | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (18-20 Dec blocked) | stored 288-376 (n 3-7); 18-21 Dec 369.67 (7) | n/a (would be -12% stored / -6% band) | 4.75 vs 4.8 | 4 vs 30 (-26) | -0.02 | 100%/100% vs 34%/28% | raise-signal | **parity** if reopened; no cut needed |
| P04 (synced 1657...) | Dec 127-182; **Christmas 150-204**; **27 Dec-4 Jan sold at 152.34** | stored 186.5-254 (n 1-4); band op 155-250 (n 2-6) | P0 stored; P0-P40 band | **4.2** vs 4.83 | 10 vs 27 (-17) | -0.15 | 47%/37% vs 23%/19% | 30 d raise +10%; 31-60 raise +10% | **-15% to 0%.** **6-16 Dec about +20%; 17-18 Dec about +10%; 19-22 Dec hold; 23-26 Dec hold to +5%, min 3.** 27 Dec-4 Jan sale: -31% vs band, P0 |
| P04 unsynced 1455... | 184-254; **bookable on sold 20-24 Nov (£781)** | | | 4.69 | 26 | n/a | | | map or unlist |
| P09 | no sellable night | 166.5-168 (n 2-3) | n/a | 5.0 vs 4.56 | 3 vs 25 (-22) | +0.15 | 100% vs 40% | raise-signal | nothing before the handback |
| P12 | open 250-363 | band 240-284; stored 248-297 | P55-P100 band (median P71 stored) | 4.27 vs 4.88 | 15 vs 25 (-10) | -0.15 | 77%/88% vs 43%/34% | raise +10% (P71): **not adopted** | **-15% to 0% vs band. 19-20 Nov about -15%; 26 Nov about -25%; 30 Nov-3 Dec about -10%** |
| P15 | no listing of ours | 145-160.5 (n 3-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | blocked on purpose (policy); not analysed | | | | | | | | |

## Plan items in this batch (status 19 Nov)
| Item | Status |
|---|---|
| **t-p04-xmas-1711** | **27 Dec-3 Jan SOLD** (Airbnb, £1,076.74 room, £134.59/n): P0 vs comps, -31% vs band (n = 2), PriceLabs market P26. Estimated shortfall £286-552 vs comp-supported, £163 vs PriceLabs 18 Nov less the policy weekly. **Left open: 20-26 Dec at £1,233** (in range; hold, 23-26 Dec up to +5%); min 4 on 23-26 Dec now strands 24-26 Dec. |
| t-p04-doublebook | **Not fixed (day 20).** 1455 bookable on 20-24 Nov at £781; arrival tomorrow. |
| a-p04-dec-1611 | 6-16 Dec unchanged (-1 to +1); 17-19 Dec now 146/150/175. Supported: +20% on 6-16 Dec, +10% on 17-18 Dec, hold 19 Dec. |
| a-p12-trim | **Reversed by PriceLabs** (+6% to +7% overnight, no logged edit). Needed now: 19-20 Nov -15%, 30 Nov-3 Dec -10%. |
| t-p12-26nov-price | **Not fixed, worse** (£310 room / £363 all-in, P100, +28% vs band). |
| t-p01-1820block | **Not fixed** (still `Blocked`). For Corentin. |
| P04 min-3 rule | 19 Nov min 2 (Reyhan DSO +5%, 18 Nov 12:18Z; it sold 18-20 Nov). For Corentin: confirm or revert. |
| Push freshness | P12 19 Nov 06:31Z; P01 19 Nov 04:22Z; P09 19 Nov 06:42Z; **P04 18 Nov 12:20Z (not yet today)** (`listings.csv`). |

## Critical / high findings
- **CRITICAL: P04 unsynced Airbnb 1455876748739910219 is bookable on 20-24 Nov at £781.** Those nights are sold on the synced listing; check-in is tomorrow (day 20).
- **HIGH: P04 27 Dec-4 Jan sold at P0 vs comps.** The guest paid £152.34/n all-in (room £134.59) against band £221.31 (n = 2) and stored comp £248.25 for the same stay: -31% / -39%. PriceLabs market: P26.
  - Price = PriceLabs 18 Nov £1,459 x 0.90 x 0.82; policy expects x 0.85 (£1,240).
  - Estimated cost: £163 vs policy, £286-552 vs comp-supported.
- **HIGH: P04 6-19 Dec is -18% to -32% vs the band** (comps unchanged). About +20% on 6-16 Dec and +10% on 17-18 Dec are supported.
- **HIGH (for Corentin): P04 min 4 on 23-26 Dec now strands nights.** 27 Dec is booked, so only 23-27 Dec can start after 22 Dec. Min 3 (policy floor) makes 23-26 and 24-27 Dec sellable.
- **HIGH: P12 repriced up 6-7% overnight with no logged edit.**
  - All open stays are +3% to +28% vs the band against a 0% quality ceiling.
  - 26 Nov: £310 room, P100, +28%; about £205-240 supported.
  - 19-20 Nov: +17% vs the band; about -15% supported.
  - 30 Nov-3 Dec: +7% to +16% vs the band; about -10% supported.
- **HIGH (for Corentin): P01 18-20 Dec still blocked.** Reopened at today's price it would be -6% to -12% vs comps (18-21 Dec); about £823 of room nights are held.
- **MEDIUM: P04 20-26 Dec raised about 6% by PriceLabs** (£1,164 -> £1,233). The 3-night stays are now -7% to -8% vs the band, in range: hold.

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-19 07:19-07:27Z.
- "18 Nov x" = the same comp and stay on 18 Nov, where the two differ by more than £1.
- `*` = found by the 0.3 km second pass.
- "–" = not returned in the wide search or the 0.3 km box (booked or unavailable).
- km for comps not returned today is the 18 Nov value.
- Full source for every row: `data/snapshots/2026-11-19/comps.csv` (`comp-east`, `east-refband`, `east-ours`).
- Cancellation policy: NOT CHECKED. Differentiators come from listing-page reads on 25 Oct-15 Nov.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 19 Dec-21 Dec | 18 Dec-20 Dec | 18 Dec-21 Dec |
|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | 348.33 |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | – | 395 | 327 (18 Nov 330) | 342 (18 Nov 327) | 326.33 (18 Nov 316.33) |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.44 (160) | none listed | – | 184.5 (18 Nov 192.5) | – | – | – |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (57) | Lift | – | – | – | – | 384 (18 Nov 375) |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 (17 Nov) (18 Nov) | 6 | 4.6 (30) | Lift/River view/balcony | – | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking/River view/balcony | – | – | – | – | 382.67 |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 (17 Nov) (18 Nov) | 6 | 4.95 (21) | Skyline view/Free parking/Lift/Superhost/balcony/Guest fav | – | – | – | – | – |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | 294 (18 Nov 306) | 366.5 | 376 | 369.67 |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 (17 Nov) (18 Nov) | 4 | 4.82 (17) | Lift | – | – | – | – | – |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (44) | Lift/patio or balcony/Superhost/Guest fav | – | 282 (18 Nov 315.5) | 534 | 528 | 524 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost | – | – | – | – | 281 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | n/a (0) | **288** (4) | **366.5** (3) | **376** (3) | **369.67** (7) |
| **Band median (n)** | | | | | 310 (1) | 255.75 (12) | 366.5 (5) | 359 (6) | 345 (13) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.2 (10); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 19 Dec-21 Dec | 18 Dec-20 Dec | 24 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec | 20 Dec-23 Dec | 21 Dec-24 Dec | 23 Dec-26 Dec | 23 Dec-27 Dec | 20 Dec-27 Dec | 20 Nov-24 Nov | 27 Dec-4 Jan | 27 Dec-3 Jan | 28 Dec-2 Jan | 31 Dec-2 Jan |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | – | – | – | – | – | – | 257.67 | 259.33 | – | 260 | 260 | 260 | 256.25 | 249 | 254 | 248.25 | 249 | 254 | – |
| [985683261536682900](https://www.airbnb.co.uk/rooms/985683261536682900) | 0.61 | 5 | 4.82 (17) | Paid street parking/Superhost | 225 | 225 | – | – | 225 | – | – | – | – | – | – | – | – | – | – | – | 225 | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (28) | Free parking/Superhost/Guest fav | – | 121.5 (18 Nov 124) | – | – | 139 | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.76 (41) | Free parking/Superhost | – | – | – | – | – | 248.33 | – | – | 265 | – | – | – | – | – | – | – | – | – | – | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | – | – | 222 | 222 | – | 222 | 222 | 222 | 222 | 222 | 207 | 222 | 222 | 230 | 231 | 211.71 | – | – | – | – | – |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 (17 Nov) (18 Nov) | 6 | 4.85 (27) | Parking (in name) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (18) | Free street parking/Superhost | – | 195 | – | – | – | 198 | 203 | 206.67 | 199.33 (18 Nov 197.33) | – | 166 | – | – | – | – | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | **156.33** | **158.67** | **161.33** | **154** | **182.33** | **127.43** | **201.67** | **204.33** | not bookable | **197.5** | **150.29** | not bookable | not bookable | not bookable | not bookable | not bookable |
| 1455876748739910219 (unsynced, ours) | | | | | **228.5** | not bookable | not bookable | **254.5** | not bookable | **196.67** | **197** | **199** | **192.67** | **222.33** | **184.43** | not bookable | not bookable | not bookable | not bookable | not bookable | **195.25** | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **225** (1) | **195** (3) | **222** (1) | **222** (1) | **182** (2) | **222** (3) | **212.5** (2) | **214.33** (2) | **239.84** (4) | **240.66** (2) | **186.5** (2) | **241** (2) | **241** (2) | **245** (2) | **243.62** (2) | **230.36** (2) | **239.5** (2) | **248.25** (1) | **249** (1) | **254** (1) | n/a (0) |
| **Band median (n)** | | | | | 225 (1) | 190 (4) | 215.75 (4) | 209.5 (3) | 225 (3) | 214.33 (6) | 214.33 (4) | 214.33 (4) | 226 (6) | 222 (5) | 155.43 (5) | 218.67 (5) | 218.67 (5) | 226.67 (5) | 228 (5) | 214.29 (4) | 231.25 (4) | 221.31 (2) | 226.5 (2) | 249.8 (2) | 243 (1) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | – | P0 (-29.6%) | P0 (-25.3%) | P0 (-24.7%) | P0 (-35.8%) | P0 (-24.2%) | P0 (-31.7%) | P0 (-16.3%) | P0 (-15.2%) | – | P0 (-18.9%) | P0 (-34.8%) | – | – | – | – | – |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 19 Dec-21 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 168 | 168 | 168 | 168 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 165 | 165 (18 Nov 167) | 165 | 165.5 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 (17 Nov) (18 Nov) | 3 | 4.7 (23) | none listed | – | – | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest fav | – | 200.5 | 248.5* | 248.5 |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 (17 Nov) (18 Nov) | 3 | 4.27 (22) | none listed | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 (17 Nov) (18 Nov) | 3 | 4.75 (16) | Skyline view/balcony | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | | | **166.5** (2) | **168** (3) | **168** (3) | **168** (3) |
| **Band median (n)** | | | | | 166.5 (2) | 150 (11) | 192.5 (7) | 180.75 (8) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 19 Dec-21 Dec | 18 Dec-20 Dec | 19 Nov-21 Nov | 20 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 1 Dec-3 Dec | 2 Dec-4 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 237.5 | 237.5 | 237.5 | 237.5 | 237.5 | – | – | 230 (18 Nov 225) | – | 242.5 (18 Nov 237.5) | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking | – | – | – | – | – | – | – | 316.67 | 312.5 | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (79) | Superhost | – | – | – | – | – | – | – | 198.67 (18 Nov 196) | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.94 (16) | Superhost/Guest fav | – | 150 | – | – | – | – | – | – | – | 220 | 220 |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (121) | Superhost/balcony/Guest fav | – | 254 | – | – | 261.5 | 299 | 284 | 250.67 | 243.75 | 254 | 254 |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1 | 6 | 4.54 (13) | Paid parking/balcony (placeholder price, excluded) | 1035 | 1035 (18 Nov 1038.5) | 1035 | 1035 | – | 1043 | 1053 (18 Nov 1043) | 1032.33 | 1031 | 1035 | 1035 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift | – | 282 | 340 | 319.5 | – | – | 298 | 289 | 297 | 292.5 | 312 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | **305** | not bookable | **363** | **261.67** | **250** | **280** | **278.5** |
| **Comp median (n)** | | | | | **237.5** (1) | **245.75** (4) | **288.75** (2) | **278.5** (2) | **249.5** (2) | **299** (1) | **291** (2) | **250.67** (5) | **297** (3) | **248.25** (4) | **254** (3) |
| **Band median (n)** | | | | | 295 (2) | 225.5 (9) | 286.5 (8) | 285 (6) | 261.5 (3) | 322 (2) | 284 (5) | 244.5 (12) | 243.75 (11) | 248.25 (8) | 240.5 (9) |
| **Our pctl (vs comp median)** | | | | | – | – | – | – | P100 (+22.2%) | – | P100 (+24.7%) | P60 (+4.4%) | P33 (-15.8%) | P75 (+12.8%) | P67 (+9.6%) |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 20 Nov-22 Nov | 24 Nov-26 Nov | 19 Dec-21 Dec | 18 Dec-20 Dec |
|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 203* | 195.5 (18 Nov 218) |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 (17 Nov) (18 Nov) | 4 | 4.93 (14) | Superhost/Guest fav | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.81 | 3 | 4.87 (15) | Paid parking/Superhost | – | 135 | 147.5 | 160 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.85 | 4 | 4.71 (14) | Lift/Paid parking | – | 167.5 | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.84 | 4 | 4.92 (25) | Free parking/Guest fav | – | 145 | – | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (203) | Garden view/Lift/Paid parking off/Superhost | – | 135.5* | 160.5 | 160.5 |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.03 | 4 | 4.64 (14) | Lift | – | 150 | – | – |
| **Comp median (n)** | | | | | n/a (0) | **145** (5) | **160.5** (3) | **160.5** (3) |
| **Band median (n)** | | | | | n/a (0) | 150 (9) | 152.25 (4) | 160.25 (6) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings (Airbnb only), including whether P04 20-26 Dec shows £1,233 on Booking.com.
- **P04 Christmas-NYE comps are thin:** stored n = 1-2 per stay (5 of 7 comps booked), band n = 1-5. The 27 Dec-4 Jan verdict rests on n = 2 (band) and n = 1 (stored); the PriceLabs market (P26) is a 1-3BR host-only-fee compset, not 2BR all-in.
- **P04 sale guest-paid total is inferred** (£1,218.74 = room + cleaning, from commission = 15.5% of that sum, so a host-only fee). Which Airbnb listing took it, and the source of the 0.90 factor: NOT VERIFIED.
- **Why PriceLabs raised P04 20-26 Dec ~6% and P12 6-7% overnight** (no `get_user_logs` entry): NOT VERIFIED. P04 has not been pushed since 18 Nov 12:20Z, so today's P04 PriceLabs prices may not be live yet; today's Airbnb quotes (+5% to +6%) suggest the 18 Nov push already carried most of it.
- **P12 Airbnb all-in is below PriceLabs room on 30 Nov-3 Dec** (£785 vs £829 before cleaning); cause NOT VERIFIED.
- P04 1387112821878102742 not returned on any of 22 stays; January not re-checked. Kept as booked, not inactive. P01 1418178473526356202, 852256049507701872 and 1374450835187037179 and P09 1376679869251315227, 1501211872839579235 and 958156921765583815 were also not returned on any stay; all kept as booked.
- P04 2 Dec (£428, +200% override, min 1, set 20 Oct) and 4-5 Jan were not priced against comps.
- P01 cleaning £149 is carried from earlier sections, not re-read today.
- Comp cancellation policies, band-listing sleeps and current lift/view/parking: NOT CHECKED today (carried from 25 Oct-15 Nov reads).
- **Smoobu was not called.** Smoobu = PriceLabs per the Dispatcher's check; P12 19 Nov room (251) is the PriceLabs `final_price`, not `prices.csv`.
- NL percentiles: PriceLabs does not state the horizon. Read them as market bands, not like-for-like.

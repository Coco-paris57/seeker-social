# Competitor positioning: EAST batch (D = 2026-11-08)

Batch: P01, P04, P07, P09, P12, P15. P07 is blocked on purpose (policy), not analysed. P15 has no listing of ours (reference only). Nights after a handback date are not inventory (policy `handbacks`: P01 20 Dec, P09 26 Nov, P12 13 Dec).

**Method**
- **Comp ids.** Same set as 7 Nov (`data/snapshots/2026-11-07/comps.csv`): P01 11, P04 7, P09 6, P12 7 (29297702 placeholder-like price, excluded from medians), P15 7. **None replaced.** Two comps were not returned on any stay today: P01 1005647070760859698 and P04 1083936003491396261. Each was seen on only one stay on 7 Nov. They are kept and flagged; a 60-day activity sweep is due if they are missing again on 9 Nov.
- **Access.** Public Airbnb pages (HTTP 200), same scripts, boxes and guest counts as 26 Oct-7 Nov:
  - 2.5 km box for P04, 1.8 km for P09, 1.3 km for the others; 4 guests (2BR), 3 guests (1BR).
  - 67 wide searches plus 318 comp/stay checks in a 0.3 km box (`*` in tables); 299 of those were not returned (booked or min-stay).
  - 4 extra probes for P09 11-13 Nov (1/2/3 guests, and 11-12 Nov).
  - **Booking.com not tried.**
- **Price basis.** Airbnb **guest-paid all-in total / nights**: after discounts, with cleaning and fees **included**; no separate taxes shown. Ours priced the same way. PriceLabs and Smoobu figures are **room only, cleaning excluded**.
- **Stays.**
  - Trend: 10-12 Nov (Tue-Thu), 13-15 Nov (next Fri-Sun), 24-27 Nov, 1-3 Dec, 4-6 Dec, 7-9 Dec, plus **8-10 Dec (30 days out, new)**.
  - Open-night stays from `prices.csv` and `reservations.csv` (8 Nov):
    - **P09:** 11-13 Nov (the only open run before the handback), plus 9-11 Nov for the new booking.
    - **P12:** 12-14, 17-19, 18-20, 17-21 Nov; 26-27 Nov; 30 Nov-3 Dec, 30 Nov-4 Dec, 2-4 Dec; 7-10, 7-11, 9-11 Dec; **13-14 Dec (orphan)**.
    - **P04:** 9-12, 10-13, 11-14, 9-14, 18-21, 20-23, 21-24, 18-25 Nov; 6-9, 9-12, 11-14, 14-17, 17-20, 6-13 Dec. Also 8-10 and 8-11 Nov for the unsynced-listing check.
- **Reference bands (not comps).** Every Airbnb listing in the same searches with the same bedroom count, 10+ reviews, inside the radius, excluding ours:
  - P12: 2BR within 1.3 km.
  - P09: 1BR within 1.8 km. Listings beyond ~1 km are evidence only. Band sleeps NOT CHECKED.
- **Data written.** `data/snapshots/2026-11-08/comps.csv` did not exist. It was copied forward from 7 Nov (8,015 data rows) under `flock` on `.comps.csv.lock`, then **750 rows were appended** under the same lock:
  - 474 `comp-east` (every stored comp x stay, NOT RETURNED rows kept).
  - 150 `east-refband`.
  - 126 `east-ours`: our Airbnb all-in; the unsynced P04 listing; Smoobu room price per open night from `prices.csv` with the matching PriceLabs price, user_price and uncustomized from the 8 Nov raw; and one row for the P09 7-11 Nov booking. None of these rows are comps.
- **PriceLabs (read-only, one call at a time).**
  - `get_user_logs` (listing, 7-8 Nov): 25 entries, all Reyhan, 7 Nov 12:27-12:34Z.
  - `get_listing_date_overrides` for 2699998, 3562176 and 3318172.
  - `get_neighbourhood_data` for P12, P09 and P04: all `all_operations_ok`.
- **Smoobu.** No API call today. Smoobu prices are `prices.csv` `smoobu_price` (snapshot 8 Nov).

## What changed since 7 Nov 06:00Z (this batch)
- **New booking: P09 Airbnb 7-11 Nov** (`reservations.csv` 8 Nov). It fills 4 of the 5 unsold nights before the handback. Only **11-12 Nov** remain open.
- **Reyhan's PriceLabs edits, 7 Nov 12:27-12:34Z** (`get_user_logs`; values from `get_listing_date_overrides`):
  - **P12 2699998, 12-20 Nov and 30 Nov-10 Dec:** the price part of the overrides was **removed**; they now hold min-stay 2 only. They were -5% (5 Nov edit, reported 6-7 Nov).
    - Result, pushed 12:30Z: open nights are **+4-6%**. 30 Nov-3 Dec went 260/266/277/284 -> **274/280/291/299**; 7-10 Dec 272/274/288/293 -> **286/289/303/308** (8 Nov raw `prices_2699998.json`).
    - This is the **opposite of a-p12-trim**.
  - **P12 13 Dec:** **+15%, min 1.** The min-1 half of t-p12-13dec-orphan is done, but the price went **273 -> 369** (+35%).
  - **P04 3562176, 9-24 Nov:** **-3%** (was -7% from 5 Nov; Corentin's standing decision is -8% on 1-25 Nov).
    - Prices still **fell 3-6%** (9 Nov 157 -> 148), because PriceLabs' uncustomized price dropped (203 -> 179 on 9 Nov). 23-24 Nov went **up**: 193 -> 205/206.
  - **P04 6-22 Dec: -5%, min 3** (new). Open December nights are +3-6% (6 Dec 188 -> 198). The previous override on those dates is NOT CHECKED.
  - **No edit on P09 or P01.**
- **P09 PriceLabs and Smoobu differ on 11-12 Nov.** PriceLabs `price` is **132/141**, but Smoobu sells **120/128**, equal to `user_price` (`prices.csv`). P09 was refreshed 7 Nov 12:32Z, but its last push is 08:16:19Z (kpi_summary), so the 12:32Z prices were not pushed.
- **Comps are flat.** The median same-comp, same-stay change vs 7 Nov is **0.0% on every stay except P04 13-15 Nov (-11.5%, n = 2) and P09 1-3 Dec (-1%)**. Moves over £5:
  - P04: 1577633201778145138 cut **-15% to -23%** on 5 stays (13-15 Nov 325 -> 250; 9-12 Dec 293.33 -> 226).
  - P01: 41905186 -£13; 1316210326145130709 -£18.
  - P12: 1120913156789373408 ±£8-15.
  - P09: 1376679869251315227 +£7.5.

## NL bedroom-matched percentiles (PriceLabs `get_neighbourhood_data`, 8 Nov)
| Ref | Band (n) | P25/P50/P75/P90 today | 7 Nov | Market occ 30 / 60 (`pl_kpis.csv`) | Our average PriceLabs room price on open nights, NL percentile |
|---|---|---|---|---|---|
| P04 | 2BR (89) | 140/176/219/264 | 140/174/217/263 | 24% / 21% | Next 14 days £156.8 (9 n) **P37** (7 Nov P40); Nov £165.2 (12 n) P43; Dec £201.3 (14 n, excl. deprioritised 2 Dec) **P65** (7 Nov P60) |
| P09 | 1BR (125) | 110/134/160/204 | 110/133/160/203 | 36% / 31% | 11-12 Nov: PriceLabs £136.5 P52; Smoobu (what sells) £124 **P40** |
| P12 | 2BR (120) | 171/205/233/290 | 172/205/238/295 | 42% / 34% | Next 14 days £262.0 (5 n, excl. deprioritised 17 Nov) **P83**; 26 Nov £323 **>P90**; 30 Nov-3 Dec £286 **P89** (7 Nov P84); 7-10 Dec £296.5 **>P90** (7 Nov P87); 13 Dec £369 **>P90** |
| P01 | not pulled (no sellable nights) | | | 36% / 30% | none |

- `occ_insights` demand rises:
  - P12 market 25-27 Nov +8.5% (26 Nov is our open night).
  - P09 market 7-10 Dec +7.8% (after the handback).
  - P04 market 3-5 Dec +7.0% (we are booked).
  - All three markets 27/28 Dec-1 Jan +16-19%.
- `fp_insights`: market price surge 27-31 Dec, +10% to +25%.
- These are market bands, not comps. PriceLabs does not state their horizon or whether they include cleaning.

## Priority 1: P09 Torrent Lodge. The 7-11 Nov booking vs comps, and the last open nights (11-12 Nov)
**The booking** (`reservations.csv` 8 Nov; Airbnb, 4 nights, booked 7 Nov, arrival the same day):
- Room £362.69, cleaning £125, commission £75.59. The commission is exactly 15.5% of room + cleaning (£487.69), so this is a host-only fee and the guest paid **£487.69 = £121.92/night all-in**.
- Room only = **£90.67/night = 0.778x** the Smoobu/PriceLabs rates in the 7 Nov raw (132 + 113 + 110 + 111 = £466).
  - Neither layer matches exactly: 0.85 would be £396.10 and 0.765 would be £356.49. 0.765 is closer (£6.20 under the paid amount).
  - The Airbnb price breakdown was not read, so the layers applied are **NOT CHECKED**.

**Booking vs comps.** Comp rows checked 7 Nov, the booking day; 7-11 Nov itself can no longer be searched:

| Comparison | Comp median (n) | Booking £121.92 vs median | Pctl |
|---|---|---|---|
| 8-11 Nov, stored set (7 Nov) | 161 (3) | **-24.3%** | P0 |
| 8-11 Nov, 1BR band within 1.8 km (7 Nov) | 158.33 (5) | **-23.0%** | P0 |
| 8-10 Nov, band (7 Nov) | 134 (4) | -9.0% | P0 |
| 9-11 Nov, band (today) | 147.5 (4) | -17.3% | P0 |

- Yesterday's supported level was about **£133 all-in** (band median, from £100 room on 8-9 Nov). The stay sold **about 8% under that, and 23-24% under the 3-night comp medians**.
- It filled 4 nights that would have been lost at the 26 Nov handback. The cost of the discount vs the supported level is about (133 - 121.92) x 4 = **£44**, an estimate.
- `quality_premium` = 0.0 (5.0 from 3 reviews, under the 5-review threshold). Supported: parity to -5% vs the band.

**11-12 Nov (2 nights, min 2; 11-13 Nov is the only stay that fits before the 13 Nov arrival):**
- Comps: stored median **164** (n = 3); band median **164** (n = 7), P25 139.50.
- **Our Airbnb listing is NOT bookable for 11-13 Nov.** It was not returned in the wide search, the 0.3 km search, or 4 extra probes (1, 2 and 3 guests; also 11-12 Nov). Smoobu shows the nights open (`prices.csv`, available True, min 2).
  - Cause **NOT CHECKED**. Airbnb preparation time or a minimum-nights rule around the 7-11 and 13-15 Nov bookings would fit.
  - The Airbnb rules screen for Greenwich is deprioritised in policy, so only the closed availability is reported.
- **Price is supported as it is.** At the booking's ratio (0.778 x room + £125 cleaning), Smoobu's 120/128 gives about **£159/night all-in, -3% vs the band**, inside the supported range.
  - If the unpushed PriceLabs 132/141 went through, it would be about £169 (+3%), which is also acceptable.
  - **Do not cut.** The two nights (£248 room at Smoobu) can sell only on channels where they are actually open. Booking.com availability NOT CHECKED.
- `recommend` (NL P52 at the PriceLabs price, P40 at Smoobu; booked 89% vs 36%): raise +10%. Not adopted: 2 nights, 3-4 days out, and the demand lead comes from nights already sold.

## Priority 2: P12 Mile End trim (26 Nov, 30 Nov-4 Dec, 7-11 Dec) and the 13 Dec orphan
- `quality_premium` = **-0.15** (cap): 4.27 from 15 reviews vs comp median 4.86 (19 reviews, gap -4). **Supported: -15% to 0% vs the band median.**
- Reyhan's 7 Nov 12:27Z edit **raised** these nights about 5% (overrides -5% -> none). Comps did not move. Every gap below is wider than on 7 Nov.

| Stay | Ours today (7 Nov) | PriceLabs room = Smoobu | Band median (n), pctl, vs | Stored median (n), pctl, vs | Supported all-in (band x 0.85-1.00) | Cut needed (all-in) |
|---|---|---|---|---|---|---|
| 12-14 Nov | 246.50 (237) | 223/257 | 265.50 (3), P33, -7.2% | 217.50 (1), P100, +13.3% | 226-266 | **hold** |
| 17-19 Nov | 259.50 (250) | 254/260 | 196.50 (9), P78, +32.1% | 245.75 (4), P75, +5.6% | (17 Nov +50% deprioritised) | not raised |
| 18-20 Nov | 267 (256.50) | 260/274 | 237.50 (9), P78, +12.4% | 245.75 (4), P75, +8.6% | 202-238 | about -11% |
| 17-21 Nov | 245 (234.50) | 254-296 | 228.75 (10), P50, +7.1% | 233.25 (6), P50, +5.0% | 194-229 | about -7% |
| **26-27 Nov (1 n)** | **373 (373)** | **323** (uncust. 310) | 290.50 (4), **P100, +28.4%** | 293.50 (2), P100, +27.1% | 247-291 | **-22% to -34%** (room about £197-240) |
| **30 Nov-3 Dec** | **265.67 (255)** | 274/280/291 | 224.50 (16), P69, **+18.3%** | 237.83 (6), P67, +11.7% | 191-225 | **at least -15.5%** (room about £235-240) |
| **30 Nov-4 Dec** | 256.50 (245.50) | 274/280/291/299 | 221.50 (13), P69, **+15.8%** | 268 (4), P50, -4.3% | 188-222 | at least -14% |
| 1-3 Dec (trend) | 281 (270.50) | 280/291 | 238.25 (12), P83, +17.9% | 245.75 (4), P75, +14.3% | 203-238 | about -15% |
| 2-4 Dec | 288.50 (277.50) | 291/299 | 240.50 (11), P73, +20.0% | 278.25 (2), P50, +3.7% | 204-241 | about -17% |
| **7-10 Dec** | **313.67 (300.33)** | **286/289/303** | 230.50 (14), **P86, +36.1%** | 225 (3), P67, +39.4% | 196-231 | **at least -26.5%** (room about £215) |
| **7-11 Dec** | **304.50* (291.25)** | 286/289/303/308 | 237.38 (14), **P86, +28.3%** | 220 (3), P67, +38.4% | 202-237 | at least -22% |
| 9-11 Dec | 337.50 (324) | 303/308 | 256 (10), P90, +31.8% | 237.50 (3), P100, +42.1% | 218-256 | about -24% |
| 7-9 Dec (trend) | 321.50 (308.50) | 286/289 | 238.25 (10), P90, +34.9% | 237.50 (3), P100, +35.4% | 203-238 | about -26% |
| 8-10 Dec (30 days out) | 329 (new) | 289/303 | 237.50 (13), P92, +38.5% | 237.50 (3), P100, +38.5% | 202-238 | about -28% |
| **13-14 Dec (orphan, 1 n)** | **458 (not sellable 7 Nov: min 2)** | **369** (was 273; uncust. 351) | 295 (4), **P100, +55.3%** | none returned | 251-295 | **at least -36%** (room about £205) |

Room figures are approximate: our all-in / room ratio scaled to the target. The P12 Airbnb cleaning fee and stay rules were not read today, so the exact room cut is NOT CHECKED (a few points larger than the all-in cut).

- **Supported positioning (a-p12-trim, Corentin's call):**
  - **26 Nov:** about £197-240 room (all-in £247-291). Unchanged since 7 Nov; t-p12-26nov-price **not fixed**.
  - **30 Nov-4 Dec:** about **-15%**, roughly back to £233-254 room (the a-p12-trim figures).
  - **7-11 Dec:** about **-25%**, to about £215-230 room.
  - **13 Dec:** min 1 is right; **the +15% is not supported**. At £369 (£458 all-in) it is 55% over the 1-night band (n = 4). Supported: about £205 room or less. Yesterday's £273 would be about +23% vs band.
  - **12-14 Nov: hold** (-7% vs band).
  - **18-21 Nov:** re-apply about -5% to -10% (+7% to +12% vs band after the 7 Nov edit).
- Reyhan's 7 Nov edits on P12 go against an open proposal, not a standing decision. Corentin to decide which stands.
- `recommend`:
  - 30-day: raise +10% (comp P71 over 12 stays; booked 63% vs market 42%). NL: raise +5% (P87).
  - 60-day (to the 13 Dec handback): hold (comp P100, n = 2; NL P90).
  - **Not adopted.** The raise's demand lead comes from booked nights. The open nights sit at band P69-P100 with a 0.59-star deficit and the -15% quality cap.

## Priority 3: P04 Barking, November and December
- `quality_premium` = **-0.15** (cap): synced listing 4.11 from 9 reviews vs comp median 4.85 (27, gap -18). **Supported: about -15% vs comp median.**
- The stored set is thin (n = 1-4 per stay).

| Stay | Ours today (7 Nov) | Smoobu room = PriceLabs | Comp median (n) | Pctl | vs median |
|---|---|---|---|---|---|
| 9-12 Nov | 162.67 (168) | 148/152/152 | 180.33 (3) | P33 | -9.8% |
| 10-13 Nov | 164.33 (168.33) | 152/152/154 | 222 (3) | P33 | -26.0% |
| 11-14 Nov | 165.33 (169.33) | 152/154/156 | 239.84 (2) | P0 | -31.1% |
| 9-14 Nov (5 n) | 152 (156.80) | 148-156 | 251.60 (1) | P0 | -39.6% |
| 18-21 Nov | 170 (173.33) | 156/158/166 | 239.84 (2) | P0 | -29.1% |
| 20-23 Nov | 174 (183.67) | 166/169/161 | 207.17 (2) | P50 | -16.0% |
| 21-24 Nov | 184 (189.67) | 169/161/205 | 202.17 (2) | P50 | -9.0% |
| 18-25 Nov (7 n) | 149.14 (151.43) | 156-206 | 249 (1) | P0 | -40.1% (weekly 15% applies, policy) |
| 6-9 Dec | 215.67 (215.33) | 198/197/195 | 210.34 (4) | P50 | +2.5% |
| 9-12 Dec | 227.67 (218.67) | 193/200/208 | 222 (3) | P100 | +2.6% |
| 11-14 Dec | 232.67* (222.67) | 208/211/198 | 213.84 (2) | P100 | +8.8% |
| 14-17 Dec | 224.33 (215.33) | 194/197/199 | 235.17 (4) | P50 | -4.6% |
| 17-20 Dec | 236 (225.33) | 202/210/216 | 241 (2) | P50 | -2.1% |
| 6-13 Dec (7 n) | 168.14 (160.71) | 193-211 | 186.79 (2) | P50 | -10.0% (weekly 15%, policy) |

- **November:**
  - Median stay about **-27%** vs comp median (range -9% to -40%). It moved further down overnight: PriceLabs' algorithm cut our prices 2-5% while comps were flat. NL: next 14 days P37, November P43.
  - **Supported: hold, no further cut.**
    - 9-14 Nov is 1-6 days out and should not be raised.
    - 18-24 Nov could take up to about +5% toward the -15% target. Low confidence (n = 1-2).
  - **For Corentin to confirm (not a proposal):** Reyhan's 9-24 Nov override is now **-3%** (7 Nov 12:33Z; was -7%). The standing decision in policy is **-8% on 1-25 Nov**. The comp evidence does not choose between them: at either level we stay below the quality-adjusted -15%.
- **December (6-19 Dec open):**
  - Stays now sit at **-10% to +9%** vs comp median (median about +0%, P50-P100). NL P65.
  - That is up about 4-5% overnight after the new 6-22 Dec -5% override and the algorithm.
  - **Supported: trim about 5-10%** (to roughly -5% to -10% vs comp median; the quality cap points to -15%), **not raise**. Low confidence (n = 2-4); Corentin's call.
  - 2 Dec (+200%, min 1) is deprioritised in policy and not raised.
- `recommend`:
  - 30-day: raise +10% (comp P33 over 10 stays; NL P42; booked 54% vs market 24%).
  - 60-day: comp P75, raise +5%; NL P65, raise +10% (booked 50% vs 21%).
  - **Not adopted** for December. The occupancy lead comes from the 20 Dec-2 Jan and early-December bookings; the open nights already sit at comp parity with a -0.15 quality cap.

## P04 unsynced listing 1455876748739910219 (Barking 1455, day 9)
- **Still bookable for 8-11 Nov at £519** (Airbnb search 8 Nov). That overlaps the synced listing's Airbnb guest in residence 6-9 Nov (`reservations.csv`), so **tonight (8 Nov) can still be double-sold**.
- The synced 1657859794156786222 correctly shows nothing for 8-11 Nov. 8-10 Nov was not returned on 1455 (min-stay, probably).
- From 9 Nov, 1455 is also open on every P04 open run (9-14 Nov, 18-25 Nov, 6-20 Dec) at £169-232/night. Any booking on it would not reach Smoobu.
- **Not fixed. Corentin: close 8 Nov on 1455 today, or unlist it.**

## Summary per property
`recommend` runs on the median comp percentile of our priced open stays in each window (8 Nov-7 Dec / 8-31 Dec), with `quality_premium`. A rating needs 5+ reviews to count.

| Ref | Ours (Airbnb all-in £/n) | Comp median range | Our pctl | Rating ours vs comp median | Reviews ours vs median (gap) | `quality_premium` | Booked 30 / 60 vs market | `recommend` 30 / 60 | Supported position |
|---|---|---|---|---|---|---|---|---|---|
| P01 | nothing open (booked to 30 Nov; gap block 30 Nov-17 Dec; 18-20 Dec booked; handback 20 Dec) | 335-517 (n 1-7) | n/a | 4.75 vs 4.80 | 4 vs 30 (-26) | 0.0 (<5 reviews) | 100% / 100% vs 36% / 30% | raise-signal (no open nights) | nothing to sell |
| P04 (synced 1657…) | 149.14-236 | 180.33-251.60 (n 1-4) | P0-P100; -40% to +9% | 4.11 vs 4.85 | 9 vs 27 (-18) | -0.15 | 54% / 50% vs 24% / 21% | raise +10% (P33) / raise +5% (P75); NL P42 / P65 | about -15%: hold November (about -27%, no further cut; 18-24 Nov up to +5%); trim December about 5-10% (now about 0%) |
| P04 unsynced 1455… | **sells 8-11 Nov (£519)** over a stay in residence | | | 4.69 | 26 | n/a | | | close 8 Nov / unlist |
| P09 | 11-13 Nov **not bookable on Airbnb**; booking 7-11 Nov paid £121.92 | stored 164 (n 3); band 164 (n 7) | booking P0 vs 8-11 Nov comps (-23% to -24%) | 5.0 vs 4.58 | 3 vs 24.5 (-21.5) | 0.0 (<5 reviews) | 89% vs 36% / handback | raise +10% (NL P52) / n/a | parity to -5% vs band: **hold 120/128** (about £159 all-in, -3%); reopen 11-12 Nov on Airbnb |
| P12 | 245-458 | band 196.50-295 (Nov/13 Dec), 221.50-256 (Dec) | band P33-P100 (Nov), P69-P92 (Dec) | 4.27 vs 4.86 | 15 vs 19 (-4) | -0.15 | 63% / 33% vs 42% / 34% | raise +10% (P71) / hold (P100); NL raise +5% (P87) / hold (P90) | -15% to 0% vs band: 26 Nov -22 to -34%; 30 Nov-4 Dec about -15%; 7-11 Dec about -25%; 13 Dec at least -36%; 18-21 Nov -5 to -10%; hold 12-14 Nov |
| P15 | no listing of ours | 146-170.50 (n 1-5) | n/a | n/a vs 4.84 | n/a | n/a | n/a | n/a | reference only |
| P07 | Blocked on purpose (policy); not analysed | | | | | | | | |

## Critical / high findings
- **CRITICAL: P04 double-sell exposure, day 9 (t-p04-doublebook NOT fixed).** Unsynced Airbnb 1455876748739910219 sells **8-11 Nov (£519)** while the synced listing's guest is in residence to 9 Nov. Close 8 Nov on 1455 today or unlist it.
- **HIGH: P12 gap widened after Reyhan's 7 Nov 12:27Z edit.** The edit removed the -5% on 12-20 Nov and 30 Nov-10 Dec, against a-p12-trim; comps were flat.
  - 7-10 Dec is now **+36% vs band (P86)** (was +30%); 30 Nov-3 Dec **+18% (P69)** (was +14%).
  - Supported: about -25% on 7-11 Dec and -15% on 30 Nov-4 Dec. Corentin to decide.
- **HIGH: P12 13 Dec orphan** now £369 (+15% DSO, min 1; was £273). That is £458 all-in, **+55% vs the 1-night band (n = 4), P100**. Min 1 is right; the +15% is not supported (about £205 room or less).
- **HIGH: P09 11-12 Nov open in Smoobu but not bookable on Airbnb** (5 searches). These are the last 2 unsold nights before the 26 Nov handback, about £248 room. Cause NOT CHECKED. The price (120/128) is supported, so do not cut.
- **MEDIUM: P09 7-11 Nov sold at £121.92/night all-in.** That is -23% to -24% vs 8-11 Nov comps (P0) and about 8% under yesterday's supported £133. It filled 4 nights that the handback would otherwise lose. Room 0.778x Smoobu; layers NOT CHECKED.
- **MEDIUM: P12 26 Nov £373 all-in, P100, +28%** (n = 4), unchanged. Supported £247-291 all-in.
- **MEDIUM (for Corentin to confirm, not a proposal): P04 9-24 Nov now -3% (Reyhan, 7 Nov 12:33Z) vs standing -8% on 1-25 Nov.** Prices still fell 3-6% (algorithm). The evidence fits either level.
- **MEDIUM: P04 December rose about 5% to comp parity** (new 6-22 Dec -5% override plus the algorithm). Supported: about 5-10% lower, not the +5-10% that `recommend` gives.

## Plan items in this batch (status 8 Nov)
| Item | Status |
|---|---|
| t-p04-doublebook / Barking 1455 | **NOT fixed** (day 9). 1455 sells 8-11 Nov over the stay in residence (leaves 9 Nov). |
| t-pl-push-fresh (P04, P09, P12) | P04 pushed 7 Nov 12:34:39Z and P12 12:30:09Z (after Reyhan's edits). **P09 last push 08:16:19Z**, but it was refreshed 12:32Z, so Smoobu 120/128 vs PriceLabs 132/141 on 11-12 Nov. P01 refreshed 8 Nov (pull notes). |
| t-p09-cancel / a-handback-lastnights (P09) | **Mostly resolved by events:** 7-11 Nov booked on Airbnb (£362.69 room). Left: 11-12 Nov, closed on Airbnb. Payout for 158710021 NOT CHECKED here. |
| a-p12-trim | **Not done; reversed.** Reyhan removed the -5% (7 Nov 12:27Z) and prices rose 4-6%. 7-10 Dec gap +30% -> +36%. |
| t-p12-13dec-orphan | **Half done:** min 2 -> 1 (Reyhan, 7 Nov 12:27:54Z), but +15% added, so the price is 273 -> 369. Price not supported. |
| t-p12-26nov-price | **NOT fixed** (£323 room, £373 all-in, P100). |
| a-raise-1012nov (this batch) | Not supported for P04 (10-12 Nov at -10% to -31% vs comps, unsold 2-4 days out). P09 10-11 Nov is now booked. |
| Base changes | None on P01, P04, P09 or P12 (`get_user_logs` 7-8 Nov: overrides only). |

## Comp tables
Airbnb guest-paid all-in £/night, including cleaning and fees, checked 2026-11-08.
- "7 Nov x" = the same comp and stay on 7 Nov, where it differs by more than £1.
- `*` = found by the 0.3 km second pass.
- Full source for every row: `data/snapshots/2026-11-08/comps.csv`.
- Lift, view and parking come from listing-page amenity reads (25 Oct-5 Nov). Comp cancellation policies are NOT CHECKED.

### P01 Canary Wharf 2BR, sleeps 5 (ours: Airbnb 1684808250380202589, 4.75 (4)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1005647070760859698 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1005647070760859698) | 0.23 | 4 | 4.8 (30) | balcony | – | – | – | – | – | – | – |
| [41905186](https://www.airbnb.co.uk/rooms/41905186) | 0.38 | 6 | 4.38 (34) | none listed | 395* (7 Nov 392) | 517 | 434.33 (7 Nov 447.67) | 409 | 560 | 362 (7 Nov 375) | 332 |
| [1467264633617185891](https://www.airbnb.co.uk/rooms/1467264633617185891) | 0.42 | 6 | 4.46 (155) | none listed | – | – | 189.33 (7 Nov 192) | 198 (7 Nov 200.50) | – | 208 | 208 |
| [1316210326145130709](https://www.airbnb.co.uk/rooms/1316210326145130709) | 0.53 | 5 | 4.84 (56) | Lift | 312 (7 Nov 330) | – | 345.67 | – | – | – | – |
| [852256049507701872](https://www.airbnb.co.uk/rooms/852256049507701872) | 0.56 | 6 | 4.62 (29) | Lift/River view/balcony | – | – | 255 | – | – | – | – |
| [27538942](https://www.airbnb.co.uk/rooms/27538942) | 0.56 | 5 | 4.6 (10) | Lift/Paid parking on premises/River view/balcony | – | – | 382.67 | – | – | – | – |
| [1418178473526356202](https://www.airbnb.co.uk/rooms/1418178473526356202) | 0.59 | 6 | 4.95 (21) | City skyline view/Free parking on premises/Lift/Superhost/balcony/Guest favourite | – | – | – | 405 | – | – | 364.50 |
| [1684834789445533643](https://www.airbnb.co.uk/rooms/1684834789445533643) | 0.6 | 4 | 4.39 (18) | Lift/balcony | – | – | 338.67 | 422 | 454 | – | – |
| [1374450835187037179](https://www.airbnb.co.uk/rooms/1374450835187037179) | 0.62 | 4 | 4.81 (16) | Lift | 285 | – | – | 335 | – | 335 | 335 |
| [1439222085860877494](https://www.airbnb.co.uk/rooms/1439222085860877494) | 0.7 | 5 | 4.93 (43) | Lift/Private patio or balcony/Superhost/Guest favourite (ADDED 2026-11-04, replaces inactive 20404597) (added 4 Nov, replaces inactive 20404597) | 360 | – | – | 416 | – | 472 | 472 |
| [944872208662374170](https://www.airbnb.co.uk/rooms/944872208662374170) | 0.76 | 4 | 4.91 (54) | Marina view/Superhost (added 31 Oct) | – | – | 281 | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.8 (30) | | **336** (4) | **517** (1) | **338.67** (7) | **407** (6) | **507** (2) | **348.50** (4) | **335** (5) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – |

### P04 Barking 2BR, sleeps 6 (ours: synced Airbnb 1657859794156786222, 4.11 (9); unsynced 1455876748739910219 4.69 (26) shown separately); 2.5 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 8 Nov-10 Nov | 8 Nov-11 Nov | 9 Nov-12 Nov | 10 Nov-13 Nov | 11 Nov-14 Nov | 9 Nov-14 Nov | 18 Nov-21 Nov | 20 Nov-23 Nov | 21 Nov-24 Nov | 18 Nov-25 Nov | 6 Dec-9 Dec | 9 Dec-12 Dec | 11 Dec-14 Dec | 14 Dec-17 Dec | 17 Dec-20 Dec | 6 Dec-13 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1193087690344044898](https://www.airbnb.co.uk/rooms/1193087690344044898) | 0.25 | 6 | 4.83 (18) | Superhost | – | – | 257.67 | – | – | – | – | – | 257.67 | 257.67 | 257.67 | 257.67 | 251.60 | 257.67 | 257.67 | 257.67 | 249 | – | – | – | 260 | 260 | – |
| [1083936003491396261 (not bookable on any stay today)](https://www.airbnb.co.uk/rooms/1083936003491396261) | 1.24 | 5 | 4.9 (41) | Superhost (added 1 Nov) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1733027244747346716](https://www.airbnb.co.uk/rooms/1733027244747346716) | 1.74 | 5 | 5.0 (24) | Free parking on premises/Superhost/Guest favourite | – | – | 139.67 (7 Nov 137) | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – | – |
| [1577633201778145138](https://www.airbnb.co.uk/rooms/1577633201778145138) | 1.95 | 5 | 4.82 (39) | Free parking on premises/Superhost (added 30 Oct) | – | 250 (7 Nov 325) | 248.33 | – | – | 239 (7 Nov 295) | 227.50 | – | – | – | – | – | – | – | – | – | – | 266 (7 Nov 303.33) | 226 (7 Nov 293.33) | – | 248.33 (7 Nov 293.33) | – | – |
| [593405916827094880](https://www.airbnb.co.uk/rooms/593405916827094880) | 2.02 | 5 | 4.13 (30) | none listed | 222 | 222 | – | 222 | – | 222 | 222 | – | – | – | 222 | 222 | – | 222 | – | – | – | 222* | 222 | 222 | 222 | 222 | 207 |
| [1387112821878102742](https://www.airbnb.co.uk/rooms/1387112821878102742) | 2.57 | 6 | 4.85 (27) | Parking (in name) (added 1 Nov) | 145.50 | – | 137 | – | – | 196 (7 Nov 187) | 187 | 145.50 | 136.67 | 136.67 | 136.67 | – | – | – | 156.67 | 146.67 | – | 184 | – | – | – | – | – |
| [1601606251010507286](https://www.airbnb.co.uk/rooms/1601606251010507286) | 2.68 | 5 | 5.0 (16) | Free on-street parking/Superhost | 202 (7 Nov 204) | – | 193.33 | 210 | – | 217 | 217 | – | – | 180.33 (7 Nov 187.33) | – | – | – | – | – | – | – | 198.67 | 203.67 | 205.67 | 196.33 | – | 166.57 |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | **162.67** | **164.33** | **165.33** | **152** | **170** | **174** | **184** | **149.14** | **215.67** | **227.67** | **232.67*** | **224.33** | **236** | **168.14** |
| 1455876748739910219 (unsynced, ours) | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | 173 | 179.67 | 186 | 193 | 169.40 | 175.33 | 180.67 | 179.67 | 171.86 | 224.33 | 225 | 227 | 219.67 | 231.67 | 184.43 |
| **Comp median (n)** | | | 4.85 (27) | | **202** (3) | **236** (2) | **193.33** (5) | **216** (2) | n/a (0) | **219.50** (4) | **219.50** (4) | **145.50** (1) | **197.17** (2) | **180.33** (3) | **222** (3) | **239.84** (2) | **251.60** (1) | **239.84** (2) | **207.17** (2) | **202.17** (2) | **249** (1) | **210.33** (4) | **222** (3) | **213.83** (2) | **235.17** (4) | **241** (2) | **186.78** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – | P33 (-9.8%) | P33 (-26.0%) | P0 (-31.1%) | P0 (-39.6%) | P0 (-29.1%) | P50 (-16.0%) | P50 (-9.0%) | P0 (-40.1%) | P50 (+2.5%) | P100 (+2.6%) | P100 (+8.8%) | P50 (-4.6%) | P50 (-2.1%) | P50 (-10.0%) |

### P09 Greenwich 1BR, sleeps 4 (ours: Airbnb 1681417771483132994, 5.0 (3)); 1.8 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 11 Nov-13 Nov | 9 Nov-11 Nov |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [49956451](https://www.airbnb.co.uk/rooms/49956451) | 0.15 | 4 | 4.22 (27) | balcony | 164 | 164 | – | – | – | 164 | 164 | 164 | 164 |
| [52679401](https://www.airbnb.co.uk/rooms/52679401) | 0.24 | 4 | 4.42 (89) | none listed | 161.50* | 161 | – | – | – | 161 | 161.50 | 161 | 161.50 |
| [1376679869251315227](https://www.airbnb.co.uk/rooms/1376679869251315227) | 0.32 | 3 | 4.73 (22) | none listed | – | – | – | 147.50 (7 Nov 149) | – | 197.50 (7 Nov 190) | 191.50* | – | – |
| [1224431716304626406](https://www.airbnb.co.uk/rooms/1224431716304626406) | 0.47 | 3 | 4.93 (30) | Superhost/balcony/Guest favourite | – | 200.50 | 196.67 | 248.50 | 248.50 | 248.50 | 248.50 | 200.50 | – |
| [1501211872839579235](https://www.airbnb.co.uk/rooms/1501211872839579235) | 0.69 | 3 | 4.27 (22) | none listed | – | – | – | 225.50 (7 Nov 231.50) | – | – | – | – | – |
| [958156921765583815](https://www.airbnb.co.uk/rooms/958156921765583815) | 0.93 | 3 | 4.75 (16) | City skyline view/balcony | – | – | 242.67 | – | – | – | – | – | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable | not bookable |
| **Comp median (n)** | | | 4.58 (24.5) | | **162.75** (2) | **164** (3) | **219.67** (2) | **225.50** (3) | **248.50** (1) | **180.75** (4) | **177.75** (4) | **164** (3) | **162.75** (2) |
| **Our pctl (vs median)** | | | | | – | – | – | – | – | – | – | – | – |

### P12 Mile End 2BR, sleeps 6 (ours: Airbnb 1414703602412646285, 4.27 (15)); 1.3 km box, 4 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec | 12 Nov-14 Nov | 17 Nov-19 Nov | 18 Nov-20 Nov | 17 Nov-21 Nov | 26 Nov-27 Nov | 30 Nov-3 Dec | 30 Nov-4 Dec | 2 Dec-4 Dec | 7 Dec-10 Dec | 7 Dec-11 Dec | 9 Dec-11 Dec | 13 Dec-14 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1077363497194834681](https://www.airbnb.co.uk/rooms/1077363497194834681) | 0.5 | 5 | 4.43 (14) | none listed | 217.50 | 217.50 | 225 | 237.50 | – | 237.50 | 237.50 | 217.50 | 237.50 | 237.50 | 218.75* | – | 225 | – | – | 225 | 218.75 | 237.50 | – |
| [1098554019818216597](https://www.airbnb.co.uk/rooms/1098554019818216597) | 0.55 | 5 | 4.89 (19) | Paid parking on premises | – | – | 311.67 | – | – | – | – | – | – | – | 286.25 (7 Nov 297.50) | – | 316.67 | 312.50 | – | – | – | – | – |
| [1120913156789373408](https://www.airbnb.co.uk/rooms/1120913156789373408) | 0.79 | 5 | 4.86 (78) | Superhost | – | – | 200.33 (7 Nov 209) | – | – | – | – | – | – | – | 193.25 (7 Nov 201.50) | – | 214.67 (7 Nov 199.67) | 217.25 (7 Nov 209.25) | – | – | – | – | – |
| [1670196516322802487](https://www.airbnb.co.uk/rooms/1670196516322802487) | 0.83 | 6 | 4.93 (15) | Superhost/Guest favourite | 160 | – | 185 | 220 | – | 220 | 220 | – | 185 | 185 | 185 | – | 208.33 | – | – | 220 | 220 | 220 | – |
| [53017356](https://www.airbnb.co.uk/rooms/53017356) | 0.92 | 5 | 4.92 (119) | Superhost/balcony/Guest favourite | 254 | – | 250.67 | 254 | – | – | – | – | 254* | 254 | 247.75 | 284 | 250.67 | 243.75 | 254 | – | – | – | – |
| [29297702](https://www.airbnb.co.uk/rooms/29297702) | 1.0 | 6 | 4.54 (13) | Paid parking on premises/balcony (placeholder-like price, excluded from median) | 1035 | 1040 | 1032.33 | 1035 | 1047 | 1035 | 1035 | 1040 | 1035 | 1035 | 1036.75 | 1043 | 1032.33 | 1031 | 1035 | 1032.33 | 1031 | 1035 | 1043 |
| [1383544079404594066](https://www.airbnb.co.uk/rooms/1383544079404594066) | 1.15 | 7 | 4.58 (31) | Lift (added 31 Oct) | – | – | 300 | 287.50 (7 Nov 289.50) | 357.50 | 316* (7 Nov 325.50) | 321.50 | – | 282 | 282 | 283.50 (7 Nov 287.50) | 303 | 285.67 (7 Nov 287) | 292.25 (7 Nov 294) | 302.50 (7 Nov 306) | 320.33 (7 Nov 324) | 322.50 (7 Nov 325.25) | 329 (7 Nov 325) | – |
| **Ours** | | | | | not bookable | not bookable | not bookable | **281** | not bookable | **321.50** | **329** | **246.50** | **259.50** | **267** | **245** | **373** | **265.67** | **256.50** | **288.50** | **313.67** | **304.50*** | **337.50** | **458** |
| **Comp median (n)** | | | 4.86 (19) | | **217.50** (3) | **217.50** (1) | **237.83** (6) | **245.75** (4) | **357.50** (1) | **237.50** (3) | **237.50** (3) | **217.50** (1) | **245.75** (4) | **245.75** (4) | **233.25** (6) | **293.50** (2) | **237.83** (6) | **268** (4) | **278.25** (2) | **225** (3) | **220** (3) | **237.50** (3) | n/a (0) |
| **Our pctl (vs median)** | | | | | – | – | – | P75 (+14.3%) | – | P100 (+35.4%) | P100 (+38.5%) | P100 (+13.3%) | P75 (+5.6%) | P75 (+8.6%) | P50 (+5.0%) | P100 (+27.1%) | P67 (+11.7%) | P50 (-4.3%) | P50 (+3.7%) | P67 (+39.4%) | P67 (+38.4%) | P100 (+42.1%) | – |

### P15 Devons Road 1BR, sleeps 4 (no listing of ours); 1.3 km box, 3 guests

| Airbnb id | km | Sleeps | Rating (n) | Differentiators | 10 Nov-12 Nov | 13 Nov-15 Nov | 24 Nov-27 Nov | 1 Dec-3 Dec | 4 Dec-6 Dec | 7 Dec-9 Dec | 8 Dec-10 Dec |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1617544963466664181](https://www.airbnb.co.uk/rooms/1617544963466664181) | 0.65 | 5 | 4.7 (10) | none listed | – | – | 159.67 | 170.50 | – | 170.50 (7 Nov 190) | 190* |
| [1371771992549776701](https://www.airbnb.co.uk/rooms/1371771992549776701) | 0.77 | 4 | 4.93 (14) | Superhost/Guest favourite | 157 | – | 164.33 | – | – | – | – |
| [1557062894259099964](https://www.airbnb.co.uk/rooms/1557062894259099964) | 0.82 | 3 | 4.87 (15) | Paid parking on premises/Superhost | 135 | 160 | 135 | 135 | – | 135 | 135 |
| [1444741453093610023](https://www.airbnb.co.uk/rooms/1444741453093610023) | 0.83 | 4 | 4.71 (14) | Lift/Paid parking on premises | – | – | 159.67 | – | – | – | – |
| [1034861651385070287](https://www.airbnb.co.uk/rooms/1034861651385070287) | 0.87 | 4 | 4.92 (25) | Free parking on premises/Guest favourite | – | – | – | 181* | – | 181 | – |
| [49353522](https://www.airbnb.co.uk/rooms/49353522) | 0.97 | 3 | 4.84 (202) | Garden view/Lift/Paid parking off premises/Superhost (added 31 Oct) | – | – | – | 140.50 | – | – | – |
| [1528442618668335413](https://www.airbnb.co.uk/rooms/1528442618668335413) | 1.05 | 4 | 4.64 (14) | Lift (added 30 Oct) | – | – | 146.67 | – | – | – | – |
| **Comp median (n)** | | | 4.84 (14) | | **146** (2) | **160** (1) | **159.67** (5) | **155.50** (4) | n/a (0) | **170.50** (3) | **162.50** (2) |

Data gaps:
- **Booking.com: NOT CHECKED** for every comp and for our listings. All comp prices are Airbnb only.
- **P09 Airbnb closure on 11-12 Nov:** cause NOT CHECKED (Airbnb calendar or host settings not readable publicly). Booking.com availability for those nights NOT CHECKED.
- **P09 7-11 Nov booking:**
  - Airbnb price breakdown not read, so which discount layers gave 0.778x is NOT CHECKED.
  - The comparison uses 8-11 Nov comp rows checked 7 Nov; the 7-11 Nov stay itself can no longer be searched.
  - The host-only fee is inferred from commission = 15.5% of room + cleaning.
- **P12:** Airbnb cleaning fee and stay rules not read today, so room-level cuts are approximate. The 13-14 Dec band is n = 4, with no stored comp returned.
- **P04:** the override on 6-22 Dec before Reyhan's 7 Nov -5% is NOT CHECKED. Stored comp n is 1-4 per stay.
- **Comp activity:** P01 1005647070760859698 and P04 1083936003491396261 were not returned on any stay today (kept; activity sweep due if missing again).
- Comp cancellation policies, and sleeps for band listings: NOT CHECKED.
- Smoobu was not called today. Smoobu prices are the `prices.csv` snapshot (8 Nov), not a live GET.
- Why P09's 12:32Z refresh was not pushed: NOT CHECKED (PriceLabs section).
- NL percentiles: PriceLabs does not state the horizon or cleaning basis.

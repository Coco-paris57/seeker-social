## PriceLabs audit (D = 2026-11-18)

**Sources**
- Snapshot `data/snapshots/2026-11-18/`:
  - `raw/prices_*.json`, window 19 Nov 2026-17 Jan 2027. The 9 active Smoobu listings were refreshed 17 Nov 09:08-09:10Z, P12 on 18 Nov 06:43Z, and P14 on 17 Nov 07:51Z.
  - `raw/listing_data.json` (20 listings), `raw/neighbourhood_P13.json`, `listings.csv`, `prices.csv` (Smoobu = PL, taken 07:18Z) and `reservations.csv`.
- `reports/2026-11-18/kpi_pack.json`:
  - `sync_issues` is [] and `gaps` is [] for every ref.
  - `bounds` exists only for P04, P05, P06, P11, P12, P13, P14 and P20.
  - `market_percentiles` is null for every ref.
  - `missing`: market, comps and channel_checks are "empty". So `market.csv` for 18 Nov is empty, and the 16/17 Nov `market.csv` no longer exists.
- Baseline: `reports/2026-11-17/sections/pricelabs.md` and `reports/2026-11-17/daily-report.md` (plan JSON). There is no 17 Nov snapshot to diff against, because the container was rebuilt.
- Live PriceLabs reads, 18 Nov 07:20-07:24Z, one at a time, all 200:
  - `get_user_logs` for listing, group and account, 17-18 Nov, plus a 15-18 Nov control.
  - `get_listings` for the 9 Smoobu listings.
  - `get_listing_prices`: P14 3267077 10 Dec-18 Jan; P04 3562176 1 Dec-3 Jan.
  - `get_customizations`: P04 (all); P05, P11 and P20 (occupancy, booking recency, last-minute).
  - `get_listing_date_overrides`: P04, P20, P12 (to 13 Dec), P05 (to 5 Jan), P11 (to 31 Dec) and P13 3090701 (to 28 Feb).
  - `get_neighbourhood_data` P04 (detail, prices; NL 1-3 BR, n=187).
- Live Smoobu GET `/api/rates`: 15 apartments, 18 Nov 2026-17 May 2027, taken **07:20:06Z**. Saved with the scripts (`an18.py` for sync, floor and orphans; `disc.py` for a-discount-cut) and `nbh_P04.json` in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl18/`.
- **Policy respected:**
  - P02/P03/P06/P07 blocks are intentional, so P06 gets numbers only.
  - P14 is a special setup: numbers only.
  - P13 is one flat.
  - Handbacks: P12's last night is 13 Dec. P01, P08, P09 and P10 are not inventory, so P09 25 Apr is ignored.
  - The 15% / 20% stay discounts are policy.
  - P04: never under 3 nights.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised.
  - Where Reyhan's edits conflict with policy, they go to Corentin as confirm or revert.
- **Field note:** `price` is what was pushed (Smoobu = `price`). `user_price` is the value from the previous refresh. `uncustomized_price` = the neighbourhood feed's `prices_with_default_customization`: the price under PriceLabs' *default* customizations, not a raw price.

### Changes since 17 Nov 06:00Z
- **No PriceLabs edits.** `get_user_logs` returns 0 entries for listing, group and account, 17-18 Nov. The control (listing, 15-18 Nov) returns total 25, the same 25 of Reyhan's 15 Nov edits.
- **Overrides:**
  - On P04, P05, P11, P12, P20 and P13 3090701, no `updated_at` is later than 15 Nov 19:17:38Z.
  - The P20 15-17 Nov DSO is no longer listed, because those dates are past.
- **Settings:**
  - Base, min, max and push in `listing_data.json` are unchanged against yesterday's section on all 20 listings: P04 200/90/2000, P05 550/150/3500, P11 286/120/1200, P12 284/100/2000, P13 250/110/2000, P14 525/450/2000, P20 330/200/1800.
  - `recommended_base_price`: P05 537 -> **538**. P04 is still "Unavailable".
  - Customizations read today match yesterday's: Aggressive occupancy and Booking Recency default on P04, P05, P11 and P20. Last-minute is P04 5% gradual, P05 1% gradual, P11 / P20 0%. P04 also has Demand Conservative and a far-out premium of 30% after 150 days, which yesterday's section did not list.
- **Engine refreshes (no edits):**
  - **The 9 Smoobu listings were re-read 17 Nov 09:08-09:10Z.** This registered the P04 cancellation and the P13 22-27 Dec stay, and closes yesterday's H1.
  - P12 was refreshed 18 Nov 06:43Z.
  - **P14 was refreshed 18 Nov 07:19:20Z and pushed**, after the 07:18Z snapshot:
    - 18 Dec 543 -> 484 (-10.9%).
    - 28-31 Dec 678 / 743 / 748 / 749 -> 667 / 717 / 721 / 726.
    - 1-2 Jan 672 / 580 -> 646 / 562.
    - Numbers only (special setup).

---

### CRITICAL

**C1. P04 Barking 20 Dec-1 Jan: PriceLabs registered the cancellation and cut the 13 nights by -15.6%, from £2,733 to £2,306.** The cause is the Aggressive occupancy profile's 31-60-day band, not an edit. (Sources: raw `prices_3562176.json`, refresh 17 Nov 09:09:57Z, confirmed live at 07:2xZ; Smoobu rates 07:20Z; live customizations and overrides; `nbh_P04.json`.)

| Night | Now = Smoobu | Was (`user_price`) | min | uncustomized (was) | Market P50 / P75 (NL 1-3 BR) |
|---|---|---|---|---|---|
| 20 Dec | 162 | 189 | 3 | 182 (217) | 158 / 208 |
| 21 Dec | 162 | 193 | 3 | 182 (226) | 160 / 209 |
| 22 Dec | 159 | 187 | 3 | 174 (212) | 163 / 213 |
| 23 Dec | 169 | 200 | 4 | 198 (242) | 165 / 215 |
| 24 Dec | 173 | 204 | 4 | 207 (252) | 170 / 218 |
| 25 Dec | 167 | 198 | 4 | 194 (236) | 180 / 220 |
| 26 Dec | 165 | 195 | 4 | 191 (232) | 185 / 220 |
| 27 Dec | 175 | 208 | **7** | 217 (267) | 171 / 220 |
| 28 Dec | 192 | 228 | 5 | 254 (311) | 175 / 226 |
| 29 Dec | 193 | 229 | 5 | 257 (316) | 176 / 227 |
| 30 Dec | 194 | 230 | 5 | 258 (317) | 179 / 228 |
| 31 Dec | 201 | 241 | 5 | 274 (342) | 178 / 228 |
| 1 Jan | 194 | 231 | 4 | 245 (303) | 173 / 217 |
| **Total** | **£2,306** (£177.38/n) | **£2,733** | | **£2,833** (£3,473) | **£2,233 / £2,849** |

- **Status:**
  - All 13 nights are open in both systems (`booking_status` "", `unbookable` 0). Smoobu = PriceLabs on every night.
  - Min stays are unchanged: 3/3/3/4/4/4/4/7/5/5/5/5/4.
  - PriceLabs `occupancy_next_60` is 48% -> **25%**, matching Smoobu's 15 of 60. `occupancy_next_30` is 50%.
- **Why (evidence):**
  - The cut is uniform, -15.4% to -16.7%, on **every open night from 17 Dec to 16 Jan**. That is exactly days 30-60 from the 17 Nov 09:09Z refresh: 31 open nights, **£5,751 -> £4,858 (-£893)**.
  - **17 Jan (day 61) is unchanged** (164 = 164).
  - Live P04 occupancy profile, 31-60-day band: 10% occupancy -> **-15%**, 20-30% -> -10%, 40% -> -5%, 50-60% -> 0%. Smoobu has **0 of 30 nights booked for days 31-60**. Before the refresh, PriceLabs still counted the 13 cancelled nights as booked.
  - The prior bucket is not visible. The ratio (0.845-0.86) fits a move from about 0% to -15%. Yesterday's estimate (£2,323 at 0% -> -15%) was within £17.
  - **Not the other settings:**
    - Booking Recency (default) affects only the next 30 days (to 17 Dec).
    - Last-minute affects only 15 days.
    - The 20 Oct DSOs did not change: -5% on 20-31 Dec and -2% on 1 Jan, `updated_at` 2026-10-20T10:32:25Z.
- **`uncustomized_price` fell by the same ~16%** (£3,473 -> £2,833).
  - The feed labels it `prices_with_default_customization`, so the default occupancy and booking-recency logic is inside it. That is consistent with the parallel drop. That the default profile alone caused it is NOT VERIFIED.
  - Consequence: **the a-discount-cut gap metric (price vs uncustomized) does not capture this cut** (see H2).
  - Today the price is 0.814x uncustomized (yesterday 0.787x).
- **Against the market** (live NL 1-3 BR):
  - £2,306 is **+3.3% vs P50** (£2,233) and **-19.1% vs P75** (£2,849). Yesterday it was +21.7% / -5.1%.
  - 9 of 13 nights are under £195. 22 and 25-26 Dec are **below** market P50 (159 vs 163; 167 vs 180; 165 vs 185).
  - The market insight still says 27-31 Dec prices are 10.4% higher than surrounding dates.
  - Booking.com list at x1.10 is about £2,537.
  - P04 base £200 vs live 2 BR P50 £174 / P75 £214 (+14.9% / -6.5%).
- **The 20 Oct DSOs:**
  - Every P04 DSO carries `created_at` 2026-10-20T10:32:25Z. That is 69 s after the listing was created in PriceLabs (`get_listings` `created_at` 10:31:16Z) at the Smoobu migration, and the same day the cancelled Booking.com stay was booked.
  - So the -5% / -2% and the 4-7-night minimums on 23 Dec-1 Jan were carried in with the listing. They are not a decision about an open Christmas. This is inference from timestamps; to confirm with Corentin / Reyhan.
- **Min stay vs policy:**
  - The P04 rule (never under 3) is met on all 13 nights.
  - The general 2-3-night rule inside 2 months is exceeded on **23 Dec-1 Jan** (min 4/4/4/4/7/5/5/5/5/4).
  - A 27 Dec arrival must stay 7 nights (to 3 Jan); 28-31 Dec arrivals must stay 5. No 2-4-night NYE stay can sell.
- **What t-p04-xmas-1711 should now say:**
  - Change "PriceLabs stale / press Sync Now" to **done**: registered 17 Nov 09:09:57Z, no manual sync was needed.
  - Yesterday's trigger has fired: the refresh cut **15.6%** (more than the 15% case).
  - To hold about £2,733 (-4.1% vs today's P75), the block needs about x1.185:
    - DSO 20-31 Dec **-5% -> about +12.6%**.
    - DSO 1 Jan **-2% -> about +16%**.
    - This is an estimate. It assumes the DSO % multiplies the engine price and the occupancy bucket stays at -15%.
  - **Not additive with a-discount-cut.** If the 31-60-day occupancy band is set to Custom 0%, the ~-15% reverses on its own (estimate about £2,700). Do one or the other, then re-read prices.
  - The 17-19 Dec and 2-16 Jan nights were cut by the same step (17-19 Dec 182 / 188 / 194 -> 146 / 159 / 164).
  - Min-stay question for Corentin is unchanged: 27-31 Dec min 7/5 -> 3-4 (policy floor 3).
- **Check in PriceLabs:** Barking 3562176 > Customizations > Occupancy Based Adjustment (31-60 d band); Barking > Date Specific Overrides 20 Dec-1 Jan (price % and min stay).

### HIGH

**H1. Push freshness: 8 of the Smoobu listings and the P13 Vrbo copy are now 22-23 h old. They cross 24 h this morning.** (Source: `listing_data.json` `last_date_pushed`, checked at 07:20Z; `get_listings` shows push_enabled true on all 9.)
- **Crossing 24 h at 09:08-09:10Z today** (22 h 10 m old at 07:20Z): P04 3562176 (09:09:58Z), P05 3166592, P06 3288517, P11 3064196, P13 3064856 and 3090701, and P20 3547481.
- **Crossing 24 h at 08:37Z:** P13 Vrbo `_3d48…` (17 Nov 08:37:19Z).
- **Fresh:**
  - P12 (06:43Z) and P12 Vrbo (06:25Z).
  - P14 (07:19:20Z live).
  - P01, P02 (Smoobu), P03 (Channex 02:56Z), P07, P08, P09 and P10 (overnight).
  - P11 Vrbo (17 Nov 15:30Z).
- **Stale:** P02 Vrbo `_units_0004_ca1c…`: last push **24 Feb 2026**, `last_refreshed_at` null, push on. It is intentionally blocked, so hygiene only (M4).
- **Price sync: 0 open nights differ by more than £2** in the Smoobu 07:20Z vs PriceLabs comparison, 19 Nov-17 Jan, 14 Smoobu listings. This matches `kpi_pack` `sync_issues` [] and `prices.csv` (07:18Z, P14 included).
  - One transient: P14's 07:19:20Z push changed 14 Smoobu nights (12 Dec-2 Jan) between 07:18Z and 07:20Z. The live PriceLabs read after the push equals Smoobu, so this is not a sync failure.
- **Status mismatches:**
  - P04: none. Fixed.
  - P13 3064856, 22-26 Dec: "Booked", Smoobu unavailable. Correct.
  - **P13 3090701, 22-26 Dec:** `booking_status` blank but `user_price` -1 (the API's booked/blocked marker); Smoobu unavailable. It is not offered, so there is no price risk. The label is cosmetic. Note: the brief's "Booked on both twins" is not exact.
- **Check:** `last_date_pushed` on the 8 listings after about 09:15Z today. If it has not moved, the likely causes are (not confirmed): the daily refresh not yet run, or a push failure. Sync is on everywhere.

**H2. a-discount-cut: not done. Gap £92 next 13 / £1,236 next 30. Four targets: £335 / £1,441. The metric understates the occupancy cuts.** (Sources: raw `prices_*.json` and Smoobu 07:20Z, `disc.py`; live customizations.)
- **Method as yesterday:** uncustomized - price on nights open in both systems, net. The set is P04, P05, P11, P20, P12 and both P13 twins.
- **Windows:** the raw files start 19 Nov, so next 13 = 19 Nov-1 Dec and next 30 = 19 Nov-18 Dec. Yesterday's windows were 18-30 Nov and 18 Nov-16 Dec.

| Listing | Next 13 | Next 30 (yesterday) |
|---|---|---|
| P05 | 3 n £103 (-6.5%) | **8 n £649 (-14.0%)** (8 n £659) |
| P04 | 2 n £77 (-20.8%) | **16 n £311 (-10.7%)** (14 n £492) |
| P20 | 5 n £33 (-2.2%) | 11 n £276 (-7.8%) (9 n £219) |
| P11 | 7 n £122 (-7.5%) | 16 n £205 (-5.0%) (15 n £273) |
| P12 | 5 n -£163 | 7 n -£153 |
| P13 3064856 / 3090701 | -£56 / -£24 | -£40 / -£12 |
| **Total (4 targets)** | **£92 (£335)** | **£1,236 (£1,441)**; was £1,348 (£1,643) |

- All four targets are still Aggressive occupancy with Booking Recency default (live).
- **Caveat:** uncustomized carries PriceLabs' default customizations and fell with the price on P04 (C1). So the gap misses the occupancy cut on P04 17 Dec-16 Jan (**-£893 on 31 nights**, outside the 30-day window anyway).
- Yesterday's £811 expected value was not recomputed.
- **Check:** PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment, Booking Recency Factor and Last Minute.

**H3. PriceLabs-side plan items** (raw 18 Nov; Smoobu 07:20Z; live overrides; no edits since 15 Nov)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-p04-xmas-1711 | **Sync part done (engine). Price part now live.** | See C1: **£2,306** (£2,733), -15.6%; min 3-7 unchanged |
| a-discount-cut | Not done | See H2: £92 / £1,236; four targets £335 / £1,441 (£277 / £1,348; £487 / £1,643) |
| a-p04-dec-1611 | **Not done.** The DSO is still -5% on 6-22 Dec (11 Nov 17:16:47Z) | 6-16 Dec 143 / 141 / 141 / 140 / 144 / 151 / 153 / 143 / 136 / 140 / 143 = **£1,575** (£1,586), uncustomized £1,981 (£1,997). **17 Dec 182 -> 146 (-19.8%)** at the 30-day edge, the same pattern as 16 Dec yesterday |
| a-p12-trim | **Mostly overtaken by the engine.** The DSOs are 0% / min 2 (15 Nov), unchanged | **18-19 Nov 225 / 234** (268 / 268), already below the ~£247 target. 20 Nov 299 (296), hold. 30 Nov 244. **1 Dec 268** (270; target ~257, +£11). **2-3 Dec 263 / 268** (299 / 308), at the ~263 / 271 target. 8 open nights to the 13 Dec handback |
| t-p12-26nov-price | Not fixed. DSO +15%, min 1 (4 Nov) | 26 Nov **£294** (£307), min 1, uncustomized £244; target ~£224 (+£70 over) |
| a-p05-dec | Open. DSOs unchanged (+300% min 1 on 21 and 29 Dec, 9 Nov; +3% on 7-8 Dec; +5% on 13-14 Dec) | 21 Dec **£2,039** (£2,054), min 1, uncustomized £660. 29 Dec **£2,569** (£2,563), min 1, uncustomized £1,011. 7-8 Dec 487 / 486 = **£973** (£923), uncustomized £1,243. 13-14 Dec 516 / 500 = **£1,016** (£962), uncustomized £1,233. Plan targets are ~£1,156 and ~£1,200 |
| a-p20-dec-1711 | **Partly done by the engine** (no edit) | 16-18 Dec **302 / 332 / 311 = £945** (325 / 338 / 345 = £1,008, -6.3%), average £315 vs the ~£292 target. The "hold" nights also fell: 14-15 Dec 297 / 300 (318 / 319). Uncustomized 16-18 Dec 332 / 365 / 332, so the price is now under uncustomized |
| t-p20-5dec-orphan | **Not fixed (day 9)** | 5 Dec **£265** (£277), min 3, `unbookable` 1; DSO 0%, min 3 (9 Nov 21:25:55Z) |
| t-p20-26dec-orphan | **Not fixed** | 26 Dec **£272** (£271), **min 4**, `unbookable` 1. The DSO is -5% with no min-stay field (4 Nov 01:30:03Z), so the source of min 4 is UNKNOWN |
| t-p11-8dec-orphan | Unchanged: min 1, DSO +50% (15 Nov 18:48:33Z) | 8 Dec **£288** (£310), uncustomized £251; target ~£150 |
| t-p13-twins | **Partly resolved by the engine** | **13-16 Dec no longer identical:** 3064856 244 / 239 / 236 / 241 vs 3090701 220 / 215 / 213 / 217 (3090701 -£24, about -10%; no DSO change, cause UNKNOWN). 17-21 Dec and 3-16 Jan also differ (3090701 ±£10-13). **121 of 146** jointly open nights over the next 180 are still identical (Smoobu), all in one run, **17 Jan-17 May**. The 16 Jan-28 Feb part of the proposal still applies (from 17 Jan) |
| P11 darts (conflict) | Unchanged | 14-17 Dec 229 / 227 / 233 / 258, **average £236.75** (£234.25). Policy says above £300. For Corentin |

**H4. Min stays set in PriceLabs that conflict with policy** (live overrides; Smoobu 07:20Z)
- **P04 18-19 Nov:**
  - Open tonight at **£158 / £159** (was 167 / 170), min 2.
  - Source: DSO +10% min 2 (Reyhan, 15 Nov 19:17:38Z).
  - This conflicts with the P04 never-under-3 rule. It is a 2-night gap between bookings ending 17 Nov and starting 20 Nov. Confirm or revert.
- **P20 22-24 Nov:**
  - Open at **278 / 274 / 268 = £820** (254 / 257 / 239 = £750), min 2.
  - Source: DSO -5% min 2 (8 Nov 12:41:16Z).
  - This conflicts with `listing_facts.P20.min_stay` ("3 nights to 30 Nov"). Confirm or revert.
- **P20 20-21 Nov:**
  - Open in both systems at **£317 / £331** (300 / 299), min 3.
  - Policy `block_20_21_nov` says a Smoobu block on 20-22 Nov for a delivery. That block is not in Smoobu (t-p20-delivery, channel / ops).
- **Check:** Barking DSO 18-19 Nov; Waterford DSOs 22-24 Nov.

### MEDIUM

**M1. Orphans and min stay, next 180 nights** (Smoobu 07:20Z, `an18.py`). Policy: 2-3 nights to 16 Jan, 5 from 17 Jan, 7 from 18 Mar.
- **Unsellable 1-night orphans (min > gap):**
  - **P20 5 Dec**: £265, min 3.
  - **P20 26 Dec**: £272, min 4.
  - P04 24 Nov: £135, min 3 (P04 rule: numbers only).
  - P06 29 Nov: £254, min 4 (intentional block property: numbers only).
  - A gap-fill rule (min 1 on 1-night gaps) would sell P20 5 Dec and 26 Dec. **`kpi_pack` `gaps` is [] for every ref**, so it still misses both.
- **Short gaps that are sellable:**
  - P12 26 Nov (min 1).
  - P13 27 Nov and 1 Dec (min 1; 1 Dec is intentional).
  - P11 8 Dec (min 1); 2-4 Dec and 23-25 Dec (3 n, min 2-3).
  - P05 7-8 and 13-14 Dec (min 2); 21 and 29 Dec (min 1, at +300%).
  - P06 22-23 Nov (min 2).
  - P04 2 Dec (deprioritised).
- **Above 3 nights inside 2 months:**
  - P04 23 Dec-1 Jan (C1).
  - P20 26 Dec (min 4).
  - P06 29 Nov.
  - P14 Fri-Sun min 4 (special setup).
- **17 Jan-17 Mar below 5:** P11 42 / 59, P13 47 / 59 per twin, P05 35 / 52, P20 53 / 59, P04 42 / 59.
- **18 Mar on, below 7:** P11, P13 and P20 are 60 / 60. P05 and P04 comply (0 / 51, 0 / 60).

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 75 of 180 nights (41.7%) at the £450 minimum.** `kpi_pack` `bounds` shows 73.3% of the next 60. PriceLabs shows 0% booked for the next 7/30/60. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.**
  - Open nights: P04 166, P11 154, P13 145 per twin, P20 146, P05 127, P12 8 and P06 3.
  - P05 peaks at £2,569 (29 Dec) against a £3,500 maximum.

**M3. Base vs market**
- **Live / raw today:**
  - **P04** £200 vs 2 BR P50 £174 / P75 £214 (n=89, live): **+14.9% / -6.5%**.
  - **P13** £250 vs 2 BR P50 £220 / P75 £272 (n=116, raw `neighbourhood_P13.json`): **+13.6% / -8.1%**.
- **All other refs: UNKNOWN today.** `market.csv` 18 Nov is empty (`kpi_pack.missing.market` "empty") and `market_percentiles` is null.
  - Yesterday's figures, from the 16 Nov `market.csv`, which no longer exists, for reference only:
    - P12 +37.2% / +22.4%, P09 +32.3% / +10.0%, P20 +29.4% / +2.8%.
    - P11 -1.4% / -13.3%, P05 -4.5% / -24.6%, P01 -4.9% / -25.4%, P06 -13.1% / -31.7%.
- Barking `recommended_base_price` is still "Unavailable". It is the only one of 20 listings without one.

**M4. Listing hygiene and the info pack** (`raw/listing_data.json`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- **20 PriceLabs listings:** all push on, none hidden.
- **Vrbo copies push separately (4 present):**
  - P02 `_units_0004_ca1ccf61…`: Notting Hill, last push **24 Feb 2026**, `last_refreshed_at` null; the unit is intentionally blocked.
  - P11 `_7fd3…` (17 Nov 15:30Z).
  - P12 `_386e…` (18 Nov 06:25Z).
  - P13 `_3d48…` (17 Nov 08:37Z).
  - Questions: should the Vrbo copies push? Should the P02 copy be removed, since it never refreshes? Does the P13 Vrbo copy reflect 22-27 Dec? (NOT CHECKED)
- **id_map entries absent from `listing_data`:**
  - `_unmatched`: Marylebone Vrbo `_a7f5a076…`, `_4a980bb7…` and `_380ddc1a…`. Question: remove them from `id_map.json`?
  - `pricelabs_other`:
    - P01 `d1f3bd96…`, P08 `10339b41…`, P09 `e36cf9e9…`, P10 `babeec20…`.
    - P04 Vrbo `_20df1e73…`.
    - P13 Vrbo `_d0a5f202…` and `_125c15c5…`.
    - Question: remove them from id_map, or were they unmapped on purpose?
- **Duplicates:** P13 3064856 and 3090701 share 51.5088201, -0.2342476. That is one flat by policy. The P13 Vrbo copy is 30 m away (51.5089611, -0.2345325).
- **`confidence: check`:**
  - **P03** is priced via **Channex** (100 / 323 / 1500), pushed 18 Nov 02:56:39Z, fully blocked (intentional). Question: should it move to Smoobu?
  - **P15-P19:** no PriceLabs listing. Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481 (200 / 330 / 1800). Policy (24 Oct) says base 350; PriceLabs shows 330. Question: is it 330 or 350?
- **Pack vs PriceLabs (pack likely out of date; unchanged since 17 Nov):**
  - P04 base 220 vs 200; max 450 vs 2000.
  - P14 min 400 vs 450; base 475 vs 525.
  - P05 base 455 vs 550; max 780 vs 3500.
  - P11 260 vs 286 (max 400 vs 1200); P12 270 vs 284 (max 400 vs 2000); P13 235 vs 250 (max 380 vs 2000).
  - P06 340 vs 357; P01 230 vs 253; P09 160 vs 176.

Data gaps:
1. What the occupancy bucket was before 17 Nov 09:09Z is not visible: the 0% -> -15% reading is inferred from the ratio. Whether default customizations alone explain the ~16% fall in `uncustomized_price` is NOT VERIFIED.
2. P04 date-level comps for 20 Dec-1 Jan, and bookability on Booking.com and on Barking Airbnb 1455: NOT CHECKED (comp-east / channel).
3. `market.csv` 18 Nov is empty. Base vs market is UNKNOWN for every ref except P04 (live) and P13 (raw). `kpi_pack` `market_percentiles` is null.
4. The source of P20 26 Dec min 4 (no DSO min field) and of the P13 3090701 13-16 Dec -10% (no DSO change): UNKNOWN. Account and group customizations NOT CHECKED. Min-stay customizations are not exposed by `get_customizations`.
5. `kpi_pack` `gaps` is [] although Smoobu has the P20 5 Dec and 26 Dec orphans (`rm` gap detection).
6. Whether the 8 listings push again by about 09:10Z today: NOT CHECKED, because this read was at 07:20Z.
7. The raw PriceLabs window is 19 Nov-17 Jan. Sync beyond 17 Jan is NOT CHECKED. Floor, ceiling and min-stay use Smoobu to 17 May. Overrides for P13 3064856 and P14 were not re-read (no logs since 15 Nov).
8. The a-discount-cut expected value (£811 yesterday) was not recomputed. The 18 Oct base-rise like-for-like recompute is not in this section.

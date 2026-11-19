## PriceLabs audit (D = 2026-11-19)

**Sources**
- Snapshot `data/snapshots/2026-11-19/`:
  - `raw/prices_*.json`, window 20 Nov 2026-18 Jan 2027, saved 06:56-07:16Z.
  - `raw/listing_data.json` (20 listings, 06:55Z), `listings.csv`, `prices.csv`, `reservations.csv`, `market.csv` (today's rows appended 07:18-07:19Z by market), `raw/neighbourhood_P13.json`.
- Baseline: `data/snapshots/2026-11-18/raw/` (P04 refresh 17 Nov 09:09:57Z = what was live when the Christmas stay was booked), `reports/2026-11-18/sections/pricelabs.md`, `reports/2026-11-18/daily-report.md`.
- `reports/2026-11-19/kpi_pack.json`:
  - `sync_issues` [] and `gaps` [] for every ref.
  - `bounds` only for P04, P05, P06, P11, P12, P13, P14 and P20.
  - `market_percentiles` null for every ref. `missing`: market / comps / channel_checks "empty" (built before market.csv was appended).
- Live PriceLabs reads, 19 Nov about 07:20-07:30Z, all 200:
  - `get_user_logs` listing / group / account, 18-19 Nov.
  - `get_listing_date_overrides`: P04, P20, P13 3064856 (to 31 Dec), P13 3090701 (to 28 Feb), P11 (to 10 Jan), P05 (to 5 Jan), P12 (to 13 Dec).
  - `get_listings` (smoobu).
  - `get_listing_prices`: P04 17 Dec-5 Jan; P14 20-21 Nov.
  - `get_customizations`: P04 (occupancy, booking recency, last-minute, demand); P05, P11, P20 (occupancy, booking recency, last-minute). The P05 / P11 / P20 reads were sent together, not one at a time (read-only; noted as a deviation).
- Live Smoobu GET `/api/rates`, 15 apartments, 19 Nov 2026-18 May 2027, taken **07:19:38Z**. GET `/api/reservations` for P04, used for created-at times only; no guest fields kept.
- Scripts and data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl19/` (`an19.py` for sync, floor and orphans; `disc19.py` for a-discount-cut; `smoobu_rates.json`).
- **Policy respected:**
  - P02/P03/P06/P07 blocks are intentional (P06 gets numbers only).
  - P14 is a special setup (numbers only).
  - P13 is one flat, and the twin rule applies (never identical).
  - Handbacks: P12's last night is 13 Dec. P01/P08/P09/P10 are not inventory.
  - The 15% / 20% stay discounts are policy.
  - P04: never under 3 nights.
  - Deprioritised items (P04 2 Dec, P12 17 Nov) are not raised.
  - Where Reyhan's edits conflict with policy, they go to Corentin as **confirm or revert**.

### Changes since 18 Nov 06:00Z
- **Reyhan made 18 DSO edits, 18 Nov 12:13:55-12:18:46Z** (`get_user_logs` listing, total 18). Group and account logs: 0.

| Listing | Dates | New DSO | Effect now (was) | Conflict? |
|---|---|---|---|---|
| P11 3064196 (+Vrbo copy) | 18-19 Nov | +5%, min 2 | 19 Nov £172 open | No |
| P11 3064196 (+Vrbo copy) | 3-4 Dec | -2%, min 2 | **3 Dec 273 -> 214 (-21.6%)**, 4 Dec 334 -> 329 | No. The prior DSO is not visible; the ratio suggests about +25% before (inference) |
| P11 3064196 (+Vrbo copy) | 14-15 Dec | -2%, min 3 | 229/227 -> **218/220** | **Yes: darts** |
| P11 3064196 (+Vrbo copy) | 16-18 Dec | -2%, min 2 | 233/258/314 -> 227/251/313 | **Yes: darts** |
| P13 3064856 (copied to 3090701 and the Vrbo copy) | 27 Nov | +25%, min 1 | 304 -> 272 (3090701 213 -> 191) | The prior was likely +50% (user_price ratio 0.832, inference) |
| P13 3064856 (copied to 3090701 and the Vrbo copy) | **1 Dec** | **+25%**, min 1 | 278 -> **232** (3090701 194 -> 163) | **Yes: `intentional_overrides.P13` = +50% min 1** |
| P05 3166592 | 29 Nov-2 Dec | -2%, min 3 | 505/491/493/516 -> 501/485/485/510 (£2,005 -> £1,981) | No. Against the "cut PriceLabs discounts" direction |
| P20 3547481 | **5 Dec** | **+100%, min 1** | £265 min 3 unbookable -> **£531 min 1** | No policy conflict. It goes against the plan (keep about £265) |
| P20 3547481 | **26 Dec** | **+100%, min 1** | £272 min 4 unbookable -> **£569 min 1** | No policy conflict. It goes against the plan (keep about £272) |
| P04 3562176 | 18-19 Nov | +10% -> **+5%**, min 2 | 19 Nov £151; **18-20 Nov SOLD** (Airbnb, created 18 Nov 15:19) | **Yes: P04 never under 3** (now moot, so record it) |

- **Settings** (`listing_data.json` 18 vs 19 Nov):
  - Base, min, max, push and hidden are unchanged on all 20 listings.
  - Only P11's `recommended_base_price` moved, 281 -> 280. P04 is still "Unavailable".
  - P04 `occupancy_next_60` went 25% -> **37%**; `occupancy_next_30` is 47%.
- **Customizations** (live, unchanged vs yesterday): Aggressive occupancy plus default Booking Recency on P04, P05, P11 and P20. Last-minute is P04 5% gradual, P05 1% gradual, P11 / P20 0%. P04 Demand is Conservative.
- **Engine refreshes:**
  - The 8 listings were refreshed 18 Nov **12:15:23-12:20:20Z**, 1-2 min after each of Reyhan's edits. The timing suggests the edits triggered the refreshes (inference).
  - P06 was refreshed at 08:29:18Z and P14 at 07:19:20Z.
  - Overnight (19 Nov 00:32-06:42Z), only P01, P02, P03, P07, P08, P09, P10 and P12 (+ Vrbo) refreshed.

---

### CRITICAL

**C1. P04 Christmas-NYE: 27 Dec-3 Jan sold on Airbnb at exactly the cut PriceLabs prices x 0.900 x 0.82 (£1,076.74 room). 20-26 Dec is still open, now £1,233.** (Sources: Smoobu reservation created **18 Nov 09:27**, `reservations.csv`; `2026-11-18/raw/prices_3562176.json`, refresh 17 Nov 09:09:57Z; `2026-11-19/raw` and live `get_listing_prices`, refresh 18 Nov 12:20:20Z; live P04 customizations and DSOs; channel section 18 Nov for the 0.900 tier.)

- **What PriceLabs was pushing when it sold.** The stay was booked 18 Nov 09:27, before the 12:20Z refresh. So the live prices were those from the 17 Nov 09:09:57Z refresh, after the occupancy cut. No P04 PriceLabs edit was logged between that refresh and the booking.

| Night | Pushed at booking | Before the cut (`user_price` 18 Nov) | Uncustomized at booking | Now (booked_price) | min |
|---|---|---|---|---|---|
| 27 Dec | 175 | 208 | 217 | 186 | 7 |
| 28 Dec | 192 | 228 | 254 | 204 | 5 |
| 29 Dec | 193 | 229 | 257 | 206 | 5 |
| 30 Dec | 194 | 230 | 258 | 206 | 5 |
| 31 Dec | 201 | 241 | 274 | 213 | 5 |
| 1 Jan | 194 | 231 | 245 | 206 | 4 |
| 2 Jan | 164 | 194 | 204 | 173 | 3 |
| 3 Jan | 146 | 173 | 166 | 156 | 3 |
| **8 n** | **£1,459** | **£1,734** | **£1,875** | **£1,550** | |

- **Reconciliation:**
  - £1,459 x 0.900 x 0.82 = **£1,076.742**. The stay paid **£1,076.74** room (+ £142 cleaning = Smoobu £1,218.74; commission £188.91), so it matches to the penny.
  - So it was priced from Smoobu on the **synced** Airbnb listing 1657859794156786222. That listing is the one carrying the 0.900 tier (29-60 d) and the 18% weekly discount (channel 18 Nov).
  - It was not the unsynced 1455…, which takes no Smoobu price. This is an inference from the exact match; Smoobu does not expose the Airbnb listing id.
- **NYE minimum still applied:** 27 Dec min 7 (DSO, 20 Oct). An 8-night stay satisfies it.
- **What the cut cost on this stay (estimate; assumes the same guest books at the pre-cut prices):**
  - £1,734 x 0.738 = £1,279.69, against £1,076.74 paid: **-£202.95**.
  - At today's re-raised prices (£1,550 x 0.738 = £1,143.90) the stay would be worth **-£67.16** more than it paid.
- **Other layers on the same stay:**
  - The Airbnb layers beyond policy (PriceLabs x 0.85 = £1,240.15) cost **-£163.41** (-13.2%). That is the 0.900 hidden tier plus 3 points of extra weekly discount (18% vs 15%), on channel's list.
  - Against the cancelled Booking.com stay (£2,417.34 / 13 n = **£185.95/n**), £134.59/n is **-27.6%**.
- **Now registered:**
  - 27 Dec-3 Jan shows Booked in PriceLabs (`booked_date` 2026-11-18, ADR 134.59) and is unavailable in Smoobu.
  - It was registered by the **18 Nov 12:20:20Z** refresh, about 3 h after the booking.
- **20-26 Dec (7 open nights): 171 / 174 / 169 / 180 / 183 / 179 / 177 = £1,233** (yesterday 162 / 162 / 159 / 169 / 173 / 167 / 165 = **£1,157**, so **+£76, +6.6%**). Smoobu = PriceLabs.
  - Min stay is 3 / 3 / 3 / 4 / 4 / 4 / 4. 18-19 Dec are 150 / 175.
  - **Why it rose:** the sale put 8 of 30 nights booked inside the 31-60-day window of the 12:20Z refresh (18 Dec-17 Jan). The live P04 Aggressive 31-60 d band is 10% occupancy -> -15%, 20% and 30% -> **-10%**.
  - 0.90 / 0.85 = +5.9%. Observed: **+5.5% to +7.6% on every open night 19 Dec-16 Jan**.
  - Edges confirm it:
    - 17 Jan (now day 60, entering the band at -10%): 164 -> 149 (-9.1%).
    - 18 Dec (now day 30, in the 16-30 d band at 3 of 15 = 20% -> -20%): 159 -> 150 (-5.7%).
  - The DSOs are unchanged: 20-22 Dec -5% (11 Nov 17:16:47Z) and 23-26 Dec -5% (20 Oct).
  - Uncustomized rose more (+12.6% to +17.6%; £1,532 on 20-26 Dec), so price / uncustomized fell from about 0.88 to **0.80**.
- **Against the market** (NL 1-3 BR, `nbh_P04.json` 18 Nov, yesterday's pull): 20-26 Dec P50 £1,181 / P75 £1,503. £1,233 is **+4.4% vs P50 and -18.0% vs P75**.
- **Still costing on the 7 open nights:**
  - The -10% band.
  - The -5% DSOs.
  - At band 0% the block is about **£1,370** (estimate: £1,233 / 0.90).
- **Check in PriceLabs:**
  - Barking 3562176 > Customizations > Occupancy Based Adjustment, 31-60 d band (now -10% at 20-30%).
  - Barking > Date Specific Overrides 20-26 Dec (-5%; min 3/4).

**C2. Push freshness: P14 is past 24 h now; 7 more cross 24 h today. These listings got no overnight refresh on 18 or 19 Nov.** (Sources: `listing_data.json` `last_date_pushed` 06:55Z; live `get_listing_prices` P14 at about 07:28Z = `last_refreshed_at` 18 Nov 07:19:20Z; `get_listings` push_enabled true on all 15 Smoobu listings.)
- **P14 3267077: last push 18 Nov 07:19:20Z, older than 24 h since 07:19Z today.**
- **Crossing 24 h today:**
  - P06 3288517 at **08:29Z**.
  - P13 3090701 / 3064856 at 12:15:24-25Z.
  - P11 3064196 at 12:15:30Z.
  - P05 3166592 at 12:17:15Z.
  - P04 3562176 and P20 3547481 at **12:20:21Z**.
  - P11 Vrbo `_7fd3…` at 12:34:01Z.
  - P13 Vrbo `_3d48…` at 12:36:16Z.
- **Pattern:**
  - The listings above refreshed at irregular daytime times: 17 Nov 09:08-09:10Z, then 18 Nov 07:19Z / 08:29Z / 12:15-12:36Z.
  - P01, P02, P03, P07, P08, P09, P10 and P12 refreshed overnight both days (00:23-06:43Z on 18 Nov; 00:32-06:42Z on 19 Nov).
  - The 18 Nov 12:15-12:20Z refreshes followed Reyhan's edits by 1-2 min (likely triggered by them).
  - Cause UNKNOWN (possible: the daily refresh is not running for these listings, a delayed queue, or a push failure). Sync is on everywhere.
- **Price sync is fine: 0 open nights differ by more than £2** between Smoobu (07:19:38Z) and the PriceLabs raw, 20 Nov-18 Jan, on 14 Smoobu listings. Min stay and status also match. This agrees with `kpi_pack` `sync_issues` [].
- **Stale (hygiene):** P02 Vrbo `_units_0004_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null, push on. The unit is intentionally blocked.
- **Check:** PriceLabs > Listings > last sync date on P14 now, P06 after 08:30Z and the other 6 after 12:20Z. If unchanged, Sync Now and ask PriceLabs support why these listings miss the nightly refresh.

### HIGH

**H1. Reyhan's 18 Nov edits that conflict with standing decisions: for Corentin to confirm or revert.** (Sources: `get_user_logs`; live overrides; raw prices; `policy.json`.)
1. **P13 1 Dec +50% -> +25%, min 1** (3064856 12:14:53Z, copied to 3090701 and the Vrbo copy).
   - Policy `intentional_overrides.P13` says +50% min 1 is intentional.
   - Price 278 -> **£232** (3090701 194 -> 163).
   - Revert = DSO 1 Dec +25% -> +50% on parent 3064856.
2. **P11 darts 14-18 Dec now -2%** (14-15 Dec min 3, 16-18 Dec min 2; 12:14:13Z / 12:14:18Z).
   - Policy (21 Oct "darts nights average above £300"; 24 Oct "leave the darts override as it is").
   - 14-17 Dec 218 / 220 / 227 / 251, **average £229.00** (yesterday £236.75). 14-18 Dec £245.80.
   - Yesterday's plan (c) was +5% (about 240 / 238 / 245 / 271 / 330).
3. **P04 18-19 Nov +5% min 2** (12:18:46Z; was +10% min 2) vs the P04 never-under-3 rule.
   - It **sold**: Airbnb 18-20 Nov, £254.15 room, created 15:19.
   - The PriceLabs 18 Nov price at booking time is NOT VERIFIED (past date). 19 Nov is £151 now.
   - Nothing left to revert. Record it in `policy.json`.
- Not a policy conflict, but for Corentin's view: P05 29 Nov-2 Dec -2% (-£24 on 4 nights) and P11 3-4 Dec -2% (3 Dec -£59). Both add PriceLabs discounts against "cut PriceLabs discounts".

**H2. P20 orphans: the min stay is fixed, but the price is doubled (Reyhan +100%).** (Sources: live P20 DSOs 12:17:39Z / 12:17:57Z; raw; Smoobu 07:19Z.)
- **5 Dec: £531, min 1, sellable** (was £265, min 3, `unbookable` 1; `user_price` 266). Plan t-p20-5dec-orphan: min 1, keep about £265 (supported £265-277, comp-west 18 Nov).
- **26 Dec: £569, min 1, sellable** (was £272, min 4, unbookable; `user_price` 270). Plan t-p20-26dec-orphan: min 1, keep about £272 (supported £272-300).
- Together that is £1,100 vs £537 planned, **+105%**. A 1-night guest also pays £150 cleaning. Whether +100% is meant to filter 1-night stays is NOT KNOWN: for Corentin.
- **Check:** Waterford 3547481 > DSO 5 Dec and 26 Dec: +100% -> 0% (5 Dec) and -5% (26 Dec), or confirm +100%.

**H3. a-discount-cut: not done. The gap metric is now distorted by +100% / +200% DSOs.** (Sources: raw + Smoobu, `disc19.py`; live customizations.)
- All four targets are unchanged: Aggressive occupancy, Booking Recency default; last-minute P04 5% / P05 1% / P11 0% / P20 0%.
- **Windows:** next 13 = 20 Nov-2 Dec; next 30 = 20 Nov-19 Dec. The raw files start 20 Nov.

| Listing | Next 13 (net) | Next 30 (net) | Next 30 positive-only |
|---|---|---|---|
| P05 | 4 n £220 (-10.0%) | **8 n £674 (-14.6%)** (8 n £649) | £674 |
| P04 | 2 n -£167 (2 Dec +200% DSO) | **16 n £238 (-8.4%)** (16 n £311) | £459 |
| P11 | 7 n £131 (-8.4%) | 15 n £210 (-5.7%) (16 n £205) | £249 |
| P20 | 5 n -£43 | 11 n -£53 (5 Dec +100%) (11 n £276) | £177 |
| P12 | -£150 | -£144 | £9 |
| P13 3064856 / 3090701 | £56 / £53 | £32 / £61 | £80 / £89 |
| **Four targets** | **£141** (yesterday £335) | **£1,069** (yesterday £1,441) | **£1,559** |
| **Whole set (yesterday's £92 / £1,236)** | **£100** | **£1,018** | |

- The fall since yesterday is mostly the window shift and Reyhan's P20 +100% on 5 Dec. It is **not** discounts removed.
- The metric still misses P04's occupancy band, because uncustomized moves with it (C1).
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment, Booking Recency Factor and Last Minute.

**H4. Plan items (PriceLabs side)**

| Item | Status | Today (yesterday) |
|---|---|---|
| **t-p04-xmas-1711** | **Update** (C1) | 27 Dec-3 Jan sold at £1,459 x 0.738 = £1,076.74; cut cost about -£203 on it (estimate); 20-26 Dec open at **£1,233** (£1,157), +6.6% from the band moving -15% -> -10%; still -5% DSO; about £1,370 at band 0% (estimate) |
| a-p04-dec-1611 | **Not done.** DSO -5% on 6-22 Dec (11 Nov 17:16:47Z) unchanged | 6-16 Dec 143 / 142 / 142 / 141 / 144 / 151 / 153 / 143 / 136 / 139 / 143 = **£1,577** (£1,575); 17-19 Dec **146 / 150 / 175** (146 / 159 / 164): 18 Dec fell into the 16-30 d band (-20%), 19 Dec rose with the 31-60 d band |
| a-p12-trim | **Reversed by the engine** (refresh 19 Nov 06:31:16Z; DSOs 0% / min 2 unchanged since 15 Nov) | 19 Nov **251** (234; target ~222), 20 Nov 319 (299), 30 Nov 261 (244), **1 Dec 286** (268; target ~245), **2-3 Dec 282 / 282** (263 / 268; target ~250 / 255). The cause of the +6-7% is not visible |
| t-p12-26nov-price | Not fixed. DSO +15%, min 1 (4 Nov) | 26 Nov **£310** (£294), uncustomized £255; target about £224 (**+£86 over**) |
| a-p05-dec | Open. DSOs unchanged (+300% min 1 on 21 / 29 Dec; +3% 7-8 Dec; +5% 13-14 Dec) | 21 Dec **£2,038** (£2,039), 29 Dec **£2,536** (£2,569), both min 1; 7-8 Dec 485 / 465 = **£950** (£973); 13-14 Dec 518 / 501 = **£1,019** (£1,016). New 29 Nov-2 Dec -2% (H1) |
| t-p20-5dec-orphan | **Min done, price doubled** (H2) | £531 min 1 (£265 min 3) |
| t-p20-26dec-orphan | **Min done, price doubled** (H2) | £569 min 1 (£272 min 4). The min-4 source question is moot: the DSO now sets min 1 |
| t-p11-8dec-orphan | Unchanged. Min 1, DSO +50% (15 Nov 18:48:33Z) | 8 Dec **£292** (£288), uncustomized £253; target about £150 |
| t-p13-twins | **Worse** | **138 of 146** jointly open nights over the next 180 are identical in Smoobu (121 yesterday). Runs: **19-21 Dec** (243 / 224 / 227) and **3 Jan-17 May**; 3-16 Jan merged today, although 3090701 carries a -10% DSO 2 Jan-28 Feb (4 Nov) (cause UNKNOWN). 13-17 Dec still differ (3090701 219 / 215 / 213 / 218 / 224 vs 243 / 239 / 237 / 242 / 249, about -10%). Reyhan's 27 Nov / 1 Dec parent edit was copied to the child (272 / 191; 232 / 163) |
| t-pl-push-1811 | **18 Nov part resolved** (pushed 12:15-12:36Z, after Reyhan's edits); **recurs today** (C2) | P14 past 24 h at 07:19Z; P06 08:29Z; the rest 12:15-12:36Z |
| P11 darts (conflict) | Worse (H1) | Average £229.00 (£236.75) |

### MEDIUM

**M1. Min stay and orphans, next 180 nights** (Smoobu 07:19:38Z, `an19.py`). Policy: 2-3 nights to 18 Jan, 5 from 19 Jan, 7 from 19 Mar.
- **Unsellable 1-night orphans:**
  - P04 24 Nov: £135, min 3 (P04 rule, numbers only).
  - P06 29 Nov: £255, min 4 (intentional-block property, numbers only).
  - P09 25 Apr is a handback and is ignored.
  - **`kpi_pack` `gaps` is [] for every ref**, so the gap detection still misses these.
- **Sellable short gaps:**
  - P20 5 Dec and 26 Dec (min 1, H2).
  - P13 27 Nov and 1 Dec (min 1).
  - P12 26 Nov (min 1).
  - P11 2-4 Dec (3 n, min 3 / 2 / 2: £200 / £214 / £329), 8 Dec (min 1) and 23-25 Dec (min 2).
  - P05 7-8 and 13-14 Dec (min 2); 21 and 29 Dec (min 1, +300%).
  - P06 22-23 Nov (£260 / £245, min 2).
  - P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:**
  - P04 23-26 Dec (min 4; 27 Dec onward now sold).
  - P06 29 Nov.
  - P14 Fri-Sun min 4 (special).
- **Below 3 that conflicts with policy:**
  - P20 19 Nov and 22-24 Nov, min 2 (`listing_facts.P20.min_stay` "3 nights to 30 Nov"; DSO -5% min 2, 8 Nov 12:41:16Z). Unchanged: confirm or revert.
  - P20 20-21 Nov are open at **£334 / £282**, min 3, despite policy `block_20_21_nov` (delivery block, not in Smoobu: ops / channel).
- **19 Jan-18 Mar, below 5:** P11 41 / 59, P13 47 / 59 per twin, P05 34 / 52, P20 53 / 59, P04 41 / 59 (P14 35 / 59, special).
- **19 Mar on, below 7:** P11, P13 and P20 60 / 60. P05 (0 / 51) and P04 (0 / 60) comply. P14 33 / 60 is special.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv`)
- **P14: 74 of 180 (41.1%) at the £450 minimum.** `kpi_pack` `bounds` shows 78.3% of the next 60. PriceLabs occupancy is 0% for the next 7 / 30 / 60. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.**
  - Open nights: P04 157, P11 154, P20 148, P13 146 per twin, P05 128, P12 7 and P06 3.
  - P05 peaks at £2,536 (29 Dec) against its £3,500 maximum.

**M3. Base vs market** (`market.csv` 19 Nov rows, PriceLabs NL summary 07:18-07:19Z, bedroom-matched)

| Ref | Base | P50 / P75 | Gap vs P50 / P75 |
|---|---|---|---|
| P12 | 284 | 206 / 233 (2 BR) | +37.9% / +21.9% |
| P20 | 330 | 256 / 324 | +28.9% / +1.9% |
| P04 | 200 | 173 / 213 | +15.6% / -6.1% |
| P13 | 250 | 221 / 272 | +13.1% / -8.1% |
| P11 | 286 | 292 / 333 | -2.1% / -14.1% |
| P05 | 550 | 565 / 692 (4 BR) | -2.7% / -20.5% |
| P01 | 253 | 267 / 341 | -5.2% / -25.8% |
| P06 | 357 | 410 / 527 | -12.9% / -32.3% |

- P02, P03, P07, P08, P09, P10 and P14 are UNKNOWN (no `market.csv` row).
- Barking `recommended_base_price` is still "Unavailable": the only one of 20 listings without one.

**M4. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json`, unchanged; `/home/user/seeker-social/seeker-estates/build/properties.py`, last changed 21 Oct, likely out of date)
- **20 PriceLabs listings, all push on, none hidden.** Unchanged vs 18 Nov.
- **Vrbo copies push separately:**
  - P11 `_7fd3…` and P13 `_3d48…` received Reyhan's parent DSO copies on 18 Nov. P12 `_386e…` pushed 19 Nov 05:40Z.
  - P02 `_units_0004_ca1c…` has not pushed since 24 Feb.
  - Questions: should the Vrbo copies push? Remove the P02 copy? Does the P13 Vrbo copy reflect 22-27 Dec? (NOT CHECKED)
- **id_map entries not in PriceLabs:**
  - `_unmatched` Marylebone Vrbo (3).
  - `pricelabs_other` P01 / P08 / P09 / P10 and P04 Vrbo `_20df1e73…`.
  - P13 Vrbo `_d0a5f202…` and `_125c15c5…`.
  - Question: remove them or re-map?
- **Duplicates:** P13 3064856 and 3090701 share coordinates. That is one flat by policy (twin rule, H4).
- **P03 is priced via Channex** (100 / 323 / 1500), pushed 19 Nov 03:01Z, fully blocked (intentional). Question: move it to Smoobu?
- **P15-P19 have no PriceLabs listing.** Question: are they priced elsewhere?
- **Not in the info pack: P20** 3547481 (200 / 330 / 1800). Policy 24 Oct says base 350. Question: 330 or 350?
- **Pack vs PriceLabs (pack likely out of date):**
  - Every max differs (for example P04 450 vs 2000, P05 780 vs 3500).
  - Bases: P04 220 vs **200**, P05 455 vs 550, P14 475 vs 525, P11 260 vs 286, P12 270 vs 284, P13 235 vs 250, P06 340 vs 357, P01 230 vs 253, P09 160 vs 176.
  - Mins: only P14 differs (400 vs 450).

Data gaps:
1. The Airbnb listing id of the 27 Dec-3 Jan stay is not exposed by Smoobu. "Synced 1657859794156786222" rests on the exact Smoobu x 0.900 x 0.82 match. The 0.900 layer itself is unidentified (channel).
2. The PriceLabs 18 Nov price for P04 at the 15:19 booking time is NOT VERIFIED (past date, not in raw).
3. Prior DSO values before Reyhan's edits are not in the logs ("changes" shows only the new value):
   - P13 27 Nov ~+50% and P11 3 Dec ~+25% are inferred from `user_price` ratios.
   - P11 14-18 Dec had min-stay only yesterday (18 Nov section).
4. The cause of the missing overnight refresh on 8 listings is UNKNOWN. So are the causes of the P12 +6-7% on 19 Nov and of the P13 twins merging on 19-21 Dec / 3-16 Jan despite 3090701's -10% DSO.
5. `kpi_pack` was built before `market.csv` was appended (`market_percentiles` null, `missing.market` "empty"). `gaps` [] despite the P04 24 Nov / P06 29 Nov orphans.
6. P04 20-26 Dec market P50 / P75 is from the 18 Nov neighbourhood pull (not re-pulled). The P20 5 / 26 Dec supported range is from comp-west 18 Nov.
7. The raw PriceLabs window is 20 Nov-18 Jan, so sync beyond 18 Jan is NOT CHECKED. Floor, ceiling and min stay use Smoobu to 17 May. Overrides for P14 and P13 3064856 after 31 Dec were not re-read. Account / group customizations were NOT CHECKED (logs 0).

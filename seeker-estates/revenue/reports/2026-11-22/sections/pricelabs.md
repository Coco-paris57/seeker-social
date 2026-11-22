## PriceLabs audit (D = 2026-11-22)

**Sources**
- Snapshot `data/snapshots/2026-11-22/`: `raw/prices_*.json` (window 23 Nov 2026-21 Jan 2027, incl. 3588993), `raw/listing_data.json` (21 listings, none added or removed), `listings.csv`, `prices.csv`, `reservations.csv`. Baseline: `data/snapshots/2026-11-21/raw/listing_data.json`, `reports/2026-11-21/sections/pricelabs.md`, Smoobu rates 21 Nov 07:18Z (`scratchpad/pl21/smoobu_rates.json`, `smoobu_3588993.json`).
- Market: `data/snapshots/2026-11-21/market.csv` (latest bedroom-matched rows, pulled 21 Nov), copied forward to `data/snapshots/2026-11-22/market.csv` under flock, plus one new row this agent appended: **3588993, 3 BR, P25 317 / P50 389 / P75 477 / P90 623** (n=148, Nearby Listings, 2-4 BR range), from live `get_neighbourhood_data` 3588993, about 07:22Z.
- Live PriceLabs reads, 22 Nov about 07:21-07:40Z, all returned 200, read only:
  - `get_user_logs`: listing, group and account, 21-22 Nov.
  - `get_neighbourhood_data`: 3588993.
  - `get_listing_date_overrides`: 3588993, P20, P04, P05, P11, P13 3064856, P13 3090701, P12.
  - `get_customizations`: P05, P04, P11, P20 (occupancy, last-minute, booking recency); 3588993 (all keys that are on).
  - `get_listing_prices`: P14 26 Dec-2 Jan; P20 22-24 Nov.
  - **Process note:** the two P13 override reads (3064856 and 3090701) went out in one message by mistake. Both were read only and returned 200, and nothing was written. Every other PriceLabs call went out alone. No write, sync or refresh tool was called.
- Live Smoobu GET (read only):
  - `/api/rates` for 16 apartments (incl. 3588993), 22 Nov 2026-21 May 2027, taken **07:20:26Z**.
  - `/api/reservations` 15 Nov 2026-1 Mar 2027: only dates, created and modified times, type, channel, amount and guest counts were kept. No names, contacts or reference numbers.
- Scripts and data are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl22/`:
  - `an22.py`: sync, floor, orphans and min stay.
  - `mv22.py`: day-on-day moves and twins.
  - `disc22.py`: a-discount-cut.
  - `det22.py`: per-date detail.
  - Data: `smoobu_rates.json`, `smoobu_res.json`.
- **Policy respected:**
  - P02/P03/P06/P07 blocks are intentional (P06 gets numbers only). P14 is a special setup (numbers only). P13 is one flat.
  - The 15% / 20% stay discounts and the Booking.com Visibility Booster are policy. P04 is never under 3 nights. P04 2 Dec and P12 17 Nov are deprioritised.
  - Reyhan's edits that conflict with policy go to Corentin as **confirm or revert**.

### Changes since 21 Nov 06:00Z
- **PriceLabs listing logs: 10 entries, all by Reyhan, all on 3588993 Scott Ellis Gardens.** Group and account logs: 0. No `remove_custom_pricing` anywhere, so none of Reyhan's 18 / 20 Nov edits were reverted.
  - 21 Nov 12:46:09-12:46:53Z: 8 min-stay-only DSOs:
    - min 3: 29 Nov, 4-5 Dec, 11-12 Dec, 1-2 Jan.
    - min 2: 30 Nov-2 Dec, 6-7 Dec, 13-14 Dec, 3-4 Jan.
  - **21 Nov 19:33:11Z, base 295 -> 325; 19:36:01Z, base 325 -> 425** (source "reviewPrices", web).
- **Settings** (`listing_data.json` 21 vs 22 Nov):
  - The only setting change is the 3588993 base, 295 -> 425. Min 170 and max 4000 are unchanged.
  - Every other base, min, max, push and hidden flag is unchanged.
  - `recommended_base_price`: P04 "Unavailable" -> 201; P06 353 -> 357. 3588993 is still blank. P20 is 351 (unchanged).
- **Customizations** (live, unchanged vs 18-21 Nov):
  - P04, P05, P11 and P20: Aggressive occupancy (0-15 d: -30% at 10% occupancy up to 0% at 100%) and default Booking Recency (5-15%).
  - Last-minute: P04 5% gradual, P05 1% gradual, P11 / P20 0%.
  - 3588993: engine defaults (last-minute 0%, occupancy Market Driven, booking recency default).
- **Smoobu changes since 21 Nov 06:00Z** (`modifiedAt`):
  - **P11: a "Blocked channel" block 22-27 Nov (5 nights), made 22 Nov 00:44:04Z** (H3).
  - 3588993: the 20-29 Nov block was modified at 21 Nov 13:45:53Z and now also covers 28 Nov.
  - P05: Airbnb 13-17 Feb cancelled at 21 Nov 19:12:44.
  - P04: Airbnb 17-20 Dec, made 20:20 and cancelled 20:30:10 on 21 Nov.
  - P12: Booking.com stays 21-26 Nov and 27-30 Nov were modified (14:38 and 01:00). They are still booked.

---

### CRITICAL

**C1. t-pl-push-1811, day 5: still no overnight refresh for 8 Smoobu listings. P20 goes stale (24 h) at 08:48Z today; P04, P05, P06, P11, P12 and both P13 twins at about 09:42-09:45Z.** (Sources: `raw/listing_data.json` `last_refreshed_at` / `last_date_pushed`; live `get_listing_prices` P20 at about 07:38Z and P14 at about 07:36Z; `get_user_logs`.)

| Listing | Last refresh / push | 24 h reached at |
|---|---|---|
| P20 3547481 | **21 Nov 08:48:53Z** (live, still at 07:38Z today) | 22 Nov 08:48Z |
| P11 3064196 | 21 Nov 09:42:38Z / 09:42:39Z | 09:42Z |
| P12 2699998 | 21 Nov 09:45:06Z / 09:45:07Z | 09:45Z |
| P13 3064856 / 3090701 | 21 Nov 09:45:25Z / 09:45:26Z | 09:45Z |
| P05 3166592 | 21 Nov 09:45:36Z / 09:45:37Z | 09:45Z |
| P06 3288517 | 21 Nov 09:45:39Z / 09:45:40Z | 09:45Z |
| P04 3562176 | 21 Nov 09:45:41Z / 09:45:42Z | 09:45Z |
| P14 3267077 | snapshot 21 Nov 07:17:56Z; **live 22 Nov 07:16:17Z** (daytime again) | fresh |
| 3588993 | 21 Nov 19:37:34Z (after the base save) | 19:37Z |

- **21 Nov pattern:** the 09:42-09:45Z batch has **no matching log entry**: none of these listings was edited on 21 Nov. So yesterday's "save-triggered refresh" reading does not explain it. These listings refresh in a daytime batch, not overnight.
- **Overnight group refreshed as usual:** P02 00:23Z, P03 (Channex) 03:30Z, P07 03:54Z, P01 04:08Z, P10 04:52Z, P08 06:24Z, P09 06:38Z, P12 Vrbo 06:48Z.
- **Effect today:** PriceLabs still shows **P11 23-26 Nov as open**, but Smoobu has them blocked since 00:44Z (H3). PriceLabs is stale on availability for these listings until about 09:45Z.
- Sync is on everywhere. The cause is UNKNOWN (nightly job skips these listings, queue delay, or push failure).
- **Check:** PriceLabs > Listings > last sync for P20 after 08:48Z, and for P04, P05, P06, P11, P12 and P13 after 09:45Z. If the daytime-only pattern holds a fifth night, raise a PriceLabs support ticket with these 8 IDs. Sync Now is a user action; this audit does not trigger it.

### HIGH

**H1. Scott Ellis Gardens 3588993: Reyhan raised the base 295 -> 425 (+44%) on 21 Nov (19:33:11Z to 325, 19:36:01Z to 425; pushed 19:37:06Z). Smoobu now gets these prices; the £4,000 reading is gone. The listing is still unmapped.** (Sources: `get_user_logs`; `raw/listing_data.json`; `raw/prices_3588993.json`; Smoobu `/api/rates` 07:20:26Z; live `get_neighbourhood_data`, `get_listing_date_overrides` and `get_customizations` 3588993.)
- **What reaches Smoobu:**
  - On all **50** Smoobu-open nights from 23 Nov to 21 Jan, Smoobu equals PriceLabs `price`, total **£18,140** (average £363), with 0 differences over £2.
  - `user_price` equals `price` on every open night. **No £4,000 reached Smoobu:** the highest Smoobu rate in the next 180 days is **£821**.
  - Like for like, 49 nights open on both 21 and 22 Nov: **£12,391 -> £17,794 (+£5,403, +43.6%)**. The 19 nights to 20 Dec: £4,872 -> £6,751 (+38.6%).
  - Examples: 29 Nov 267 -> 318; 6 Dec 241 -> 369; 12 Dec 277 -> 409; 24 Dec 276 -> 415; 31 Dec 376 -> 555; 10 Jan 174 -> 252.
- **Against the bedroom-matched market** (3 BR Nearby Listings, n=148):
  - **Base 425 is +9.3% vs P50 389 and -10.9% vs P75 477.** The old base 295 was -24.2% / -38.2%.
  - The average open price for 23 Nov-21 Dec is £357 (20 n), which is -8.2% vs P50.
  - PriceLabs fp_insights shows a market surge of +28.7% for 26-31 Dec. The listing has £454-£555 on those nights.
- **Floor and ceiling:** 0 of 169 Smoobu-open nights (next 180) are at min 170 or max 4000. Prices run £252 (10 Jan) to £821.
  - Max 4000 is 9.4x base. It is not binding, but it is not a realistic cap.
- **Occupancy** (`listing_data`): next 30 is 37% vs market 45%; next 60 is 20% vs 35%.
- **Availability:** blocked nights are 23-28 Nov (22 Nov also closed), 3, 8 and 15 Dec, and 5 Jan. These are 10 Blocked nights in the window, and they now match PriceLabs. Who made the blocks is NOT KNOWN.
- **Min stay:** the 21 Nov DSOs are min-stay only, with no price DSOs. Fri-Sun is min 4 (for example 18-20 Dec, 8-10 Jan). New Year is 27 Dec min 7, 28 Dec min 5, 29-31 Dec min 4. There is no policy for this listing yet.
- **Questions for Corentin:**
  1. Did Reyhan's base 425 have your sign-off?
  2. Is this a new managed property (P21?) to add to `id_map.json`, `policy.json` and the info pack, with its channels and its min, base and max confirmed?
  3. Should the 4000 max be cut to a realistic cap?
- **Check:** 3588993 > Base / Min / Max, and Calendar > DSO (min stay only).

**H2. Reyhan's 18 and 20 Nov conflicts (a-reyhan-2011): none reverted. Every DSO is live with unchanged `updated_at`, and there are no remove logs since 21 Nov. These go to Corentin as confirm or revert.** (Live overrides; Smoobu 07:20Z.)
1. **P04 24-26 Dec +5% min 2** (20 Nov 22:53:59Z).
   - Conflicts with `listing_facts.P04.min_stay_rule` ("never open for less than 3 nights").
   - Smoobu **190 / 191 / 190**. 23 Dec is -5% min 3: £170.
2. **P05 29 Nov-2 Dec -5% min 3** (20 Nov 22:51:49Z).
   - **491 / 475 / 469 / 498 = £1,933** (yesterday £1,937; uncustomized £2,167, so -£234 / -10.8%).
   - Also 7-8 Dec -1% min 2: 449 / 430 = **£879** (£917). 13-14 Dec, no % and min 2: 471 / 461 = **£932** (£979).
3. **P05 4-31 Jan -8% min 3** (22:52:14Z).
   - 4-8 Jan: 395 / 383 / 374 / 373 / 385, against uncustomized 432 / 414 / 404 / 409 / 440.
   - Min 3 from 20 Jan is under the policy minimum of 5.
4. **P11 2 Jan-28 Feb -8% min 3** (22:50:18Z). For example, 4-6 Jan fell to 170 / 181 / 170 (yesterday 180 / 191 / 180).
5. **P11 22 Nov-7 Dec -2% min 2** (22:49:52Z).
   - 30 Nov-4 Dec: **183 / 183 / 205 / 214 / 259 = £1,044** (uncustomized £1,114).
   - 22-26 Nov is now blocked in Smoobu (H3).
6. **P13 10-26 Dec -2% min 3** (both twins, 22:50:45Z).
   - 3064856 13-21 Dec fell a further £12-£14 a night: 195 / 194 / 191 / 194 / 202 / 215 / 221 / 205 / 213 (yesterday 209-234).
7. **P13 1 Dec +25% min 1** (18 Nov 12:14:53Z). Policy `intentional_overrides.P13` says +50%.
   - 3064856 **£225** (uncustomized 226). 3090701 **£158** (uncustomized 165).
   - Even with +25%, neither twin is above its uncustomized price. The same holds on 27 Nov (+25%): 264 vs 292, and 185 vs 212. Cause NOT KNOWN.
8. **P11 darts 14-18 Dec -2%** (14-15 Dec 20 Nov 22:50:01Z; 16-18 Dec 18 Nov 12:14:18Z).
   - Policy (21 Oct): darts raised, "average above £300/night".
   - 14-17 Dec **218 / 220 / 229 / 251, average £229.50**. 14-18 Dec average £248.40 (18 Dec 313 -> 324).
9. P06 23 Nov +25% min 1 (20 Nov): Smoobu **£269**, min 1. P06 is numbers only, and it was not re-read live today.
- **Check:** each listing > Calendar > DSO on the dates above.

**H3. P11 Camden 22-27 Nov blocked in Smoobu ("Blocked channel", 5 nights, made 22 Nov 00:44:04Z). PriceLabs still shows 23-26 Nov open.** (Sources: Smoobu `/api/reservations` and `/api/rates` 07:20Z; `raw/prices_3064196.json`, refresh 21 Nov 09:42:38Z.)
- Those nights were for sale on 21 Nov at **187 / 184 / 200 / 197 / 218 = £986** (min 2, -2% DSO). Smoobu now holds 184 / 180 / 195 / 192 / 214, all unavailable.
- Who made the block, and why, is NOT KNOWN.
- PriceLabs will see the block at its next refresh (C1).
- **Question for Corentin:** is the 22-27 Nov P11 block intentional (owner stay, maintenance), or should those nights go back on sale?

**H4. P20 Waterford Court.** (Live `get_listing_prices` 3547481 at about 07:38Z; live overrides; Smoobu 07:20Z.)
- **The 22-24 Nov mismatch is resolved.** The 21 Nov 08:48:54Z push overwrote the manual 266 / 266 / 250. Smoobu now equals PriceLabs: **283 / 279 / 271 = £833** (was £782), min 2.
  - **Tonight, 22 Nov, is open at £283.**
  - `booked_price` / `user_price` still read 266 / 266 / 250, which are the previous Smoobu values. They do not reach Smoobu.
  - Who made the 20 Nov manual edit is still NOT KNOWN.
- **Min stay:** 22-24 Nov min 2 (DSO -5% min 2, 8 Nov 12:41:16Z) conflicts with `listing_facts.P20.min_stay` "3 nights from 25 Oct to 30 Nov" (confirm or revert).
  - A gap-fill would sell 22-24 Nov as one 3-night stay.
- **5 Dec £520 and 26 Dec £539, both +100% min 1, unchanged** (18 Nov 12:17:39Z / 12:17:57Z). Together **£1,059** vs uncustomized £377 + £360 = £737.
  - **Check:** 3547481 > DSO 5 Dec / 26 Dec: confirm +100%, or set it to the plan.
- 22 Nov `price` 283 is above `uncustomized_price` 239 despite the -5% DSO. Cause NOT KNOWN.
- Base 330 vs `recommended_base_price` 351 (policy 24 Oct says 350): unchanged.

**H5. a-discount-cut: not done. The four targets have the same customizations as 18-21 Nov.** (Live `get_customizations`; `disc22.py`. Gap = uncustomized minus pushed `price`, on Smoobu-open nights, raw window from 23 Nov.)

| Listing | Next 12 (23 Nov-4 Dec, net) | 23 Nov-20 Dec (net) | 23 Nov-20 Dec positive-only |
|---|---|---|---|
| P05 | 4 n £234 (-10.8%) | **8 n £833** | £833 |
| P04 | 2 n -£204 (2 Dec +200% DSO) | 17 n £0 | £242 |
| P11 | 5 n £70 (-6.3%) | 11 n £137 | £173 |
| P20 | 2 n -£18 | 8 n -£6 (5 Dec +100%) | £155 |
| **Four targets** | **£82** (21 Nov £83) | **£964** (21 Nov £909) | **£1,403** (21 Nov £1,381) |

- P11 has fewer nights because 22-26 Nov is blocked (H3).
- P05 rose £780 -> £833 as its December nights fell. That comes from DSOs, not customizations.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment (Aggressive), Booking Recency Factor (default) and Last Minute (P04 5%, P05 1%).

**H6. Plan items (PriceLabs side)** (Smoobu 07:20:26Z vs 21 Nov 07:18Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-p04-xmas-1711 | Reyhan's 23-26 Dec DSOs unchanged (H2) | 20-26 Dec **150 / 150 / 166 / 170 / 190 / 191 / 190 = £1,207** (£1,225). **21 Dec fell 168 -> 150.** Min 3 / 3 / 3 / 3 / 2 / 2 / 2 |
| a-p04-dec-1611 | **Not done.** -5% DSO 6-22 Dec unchanged (11 Nov 17:16:47Z) | 6-16 Dec **£1,581** (£1,544; 6 Dec 140 -> 174, uncustomized 203); 17-19 Dec **142 / 147 / 153** (142 / 146 / 151) |
| P04 17-20 Dec | Reopened after the 21 Nov make-and-cancel | 17-19 Dec 142 / 147 / 153 = £442, min 3 |
| a-p12-trim | Engine-driven; DSOs unchanged (min 2 only, 30 Nov-3 Dec, 15 Nov) | 30 Nov **260** (268), **1 Dec 284** (283; target about 245), **2-3 Dec 286 / 297** (286 / 296; target about 250 / 255) |
| t-p12-26nov-price | Not fixed. DSO +15% min 1 (4 Nov 01:24:21Z) | 26 Nov **£325** (£310; uncustomized £274); target about £224 (**+£101**) |
| a-p05-dec | Open. +300% min 1 on 21 / 29 Dec unchanged (9 Nov) | 21 Dec **£2,109** (£2,010; uncustomized £727), 29 Dec **£2,422** (£2,398; uncustomized £940); 29 Nov-2 Dec £1,933; 7-8 Dec £879; 13-14 Dec £932 |
| P05 Valentine's 13-16 Feb (reopened) | DSO **-5% min 4** across 1-28 Feb (`updated_at` 15 Nov 19:14:20Z, 20 min after the cancelled stay was booked at 18:54) | **435 / 407 / 416 / 421 = £1,679**, min 4. The cancelled stay paid £1,219.98 room. Beyond the 60-day raw window, so the uncustomized price is UNKNOWN |
| t-p11-8dec-orphan | Unchanged. DSO +50% min 1 (15 Nov 18:48:33Z) | 8 Dec **£305** (£309; uncustomized £269); target about £150 |
| t-p13-twins | **Gap almost closed** | **147 of 149** jointly open nights in the next 180 are identical, in one run **13 Dec-20 May**. They differ only on **27 Nov (264 / 185)** and **1 Dec (225 / 158)**. The 13-21 Dec gap closed as 3064856 fell to 3090701's level (H2 item 6) |
| P20 5 / 26 Dec +100% | Unchanged (H4) | £520 / £539, min 1 |
| t-pl-push-1811 | **Not fixed, day 5** (C1) | P20 21 Nov 08:48Z; 7 listings 09:42-09:45Z; P14 07:16Z |

### MEDIUM

**M1. Sync (open nights, Smoobu 07:20:26Z vs PriceLabs `price`, 23 Nov-21 Jan)**
- **P14 27 Dec-1 Jan: the 6 mismatches against the snapshot raw (Smoobu £4-£9 lower: 524 / 624 / 658 / 662 / 661 / 594 vs 528 / 633 / 667 / 669 / 669 / 600) are a timing effect.**
  - Live P14 refreshed **22 Nov 07:16:17Z**, and its `price` now equals Smoobu exactly.
  - `user_price` still shows the old values. The kpi_pack `sync_issues` for P14 came from the pre-refresh raw.
  - P14 21 Jan min stay (Smoobu 3 vs raw 4) is probably the same effect. It was NOT CHECKED live.
- **P20 22-24 Nov: resolved** (H4).
- **Every other Smoobu listing, incl. 3588993:** 0 differences over £2, and min stay matches.
  - Availability mismatch: P11 23-26 Nov (H3).
  - The P13 3090701 ±£3 January differences from 21 Nov are gone.
- **Data note:** in today's raw, `user_price` / `booked_price` on refreshed listings equals the Smoobu rate seen on 21 Nov, not the current push. Examples: P04 6 Dec 140 vs `price` 174; P12 26 Nov 310 vs 325. Smoobu follows `price`. What `user_price` represents is NOT KNOWN.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:20Z, `an22.py`). Policy: 2-3 nights to 21 Jan; 5 from 22 Jan; 7 from 22 Mar.
- **Unsellable 1-night orphans:**
  - P04 24 Nov: £142, min 3 (P04 rule, numbers only).
  - P09 25 Apr: £450, min 5 (handback, ignored).
- **Sellable short gaps a gap-fill rule would cover:**
  - P20 22-24 Nov (3 n, £833, min 2).
  - P20 5 Dec £520 and 26 Dec £539 (min 1).
  - P13 27 Nov and 1 Dec (min 1).
  - P12 26 Nov £325 (min 1).
  - P11 8 Dec £305 (min 1) and 23-25 Dec **266 / 242 / 251** (yesterday 285 / 256 / 267, min 2).
  - P05 7-8 Dec and 13-14 Dec (min 2); 21 and 29 Dec (min 1).
  - P06 23 Nov £269 (min 1).
  - P04 2 Dec £443 (deprioritised).
- **Below 3 that conflicts with policy:**
  - P04 24-26 Dec min 2 (H2).
  - P20 22-24 Nov min 2 (H4).
- **Above 3 inside 2 months:**
  - P14 Fri-Sun min 4 (special).
  - 3588993 Fri-Sun min 4 and New Year min 5 / 7 (unmapped).
- **2-4 months out, below 5:**
  - P11 38 / 59, P13 45 / 59 per twin, P05 35 / 53, P20 50 / 59 and P04 38 / 59.
  - P14 32 / 59 (special). 3588993 45 / 59.
- **4+ months out, below 7:**
  - P11, P13, P20 and 3588993 are 60 / 60.
  - P05 (0 / 54) and P04 (0 / 60) comply.
  - P14 36 / 60 (special).
- `kpi_pack` `gaps` is [] for every ref.

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 76 of 180 (42.2%) at the £450 minimum**, 22 Nov-21 Mar. `kpi_pack` `bounds` next 30: 86.7%. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.** Open nights: 3588993 169, P04 160, P11 152, P13 149 per twin, P20 148, P05 135, P06 8, P12 5, P09 1.

**M4. Base vs market** (bases unchanged except 3588993; latest bedroom-matched rows in `market.csv`, base vs P50 / P75)
- P12 284 vs 205 / 235: **+38.5% / +20.9%**
- P20 330 vs 253 / 321: +30.4% / +2.8%
- P04 200 vs 174 / 215: +14.9% / -7.0%
- P13 250 vs 222 / 271: +12.6% / -7.7%
- **3588993 425 vs 389 / 477 (3 BR): +9.3% / -10.9%**
- P11 286 vs 292 / 335: -2.1% / -14.6%
- P05 550 vs 575 / 700 (4 BR): -4.3% / -21.4%
- P01 253 vs 266 / 338: -4.9% / -25.1%
- P06 357 vs 418 / 529: -14.6% / -32.5%
- UNKNOWN (no row): P02, P03, P07, P08, P09, P10 and P14.

**M5. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json` and `build/properties.py`, both last modified 18 Nov 06:53, so both likely out of date)
- **21 PriceLabs listings, all push on, none hidden.**
  - 3588993 is still not in id_map, policy or the pack (t-scott-ellis-2011).
- **Vrbo copies:**
  - P11 `_7fd3…` refreshed 21 Nov 12:16Z and pushed 12:25:28Z, with no log entry. The cause is NOT KNOWN.
  - P13 `_3d48…` refreshed 22 Nov 06:51:40Z, but its last push is still 21 Nov 09:18:43Z (no push after the refresh).
  - P12 `_386e…` pushed 22 Nov 06:49:12Z.
  - P02 `_ca1c…` has not pushed since 24 Feb.
  - Question (unchanged): should the Vrbo copies push at all, and is 3090701 meant to inherit 3064856's DSOs?
- **Unchanged since 19 Nov:**
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins are at identical coordinates (one flat, policy).
  - P03 is priced via Channex (pushed 22 Nov 03:30Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match except P14 (pack 400, PriceLabs 450; special setup).
  - Maxes are all higher in PriceLabs. Examples: P04 450 -> 2000, P05 780 -> 3500, P12 400 -> 2000, P13 380 -> 2000, P11 400 -> 1200, P03 500 -> 1500.
  - Bases differ: P01 230 -> 253, P04 220 -> 200, P05 455 -> 550, P06 340 -> 357, P09 160 -> 176, P11 260 -> 286, P12 270 -> 284, P13 235 -> 250, P14 475 -> 525.
  - The pack says P05 is "5-bed"; PriceLabs and id_map say 4 bedrooms.

Data gaps:
1. The cause of the daytime-only refresh (day 5) is UNKNOWN. The 21 Nov 09:42-09:45Z batch has no matching edit. Whether P20 and the 09:45Z group refresh today was NOT CHECKED (the audit ended about 07:40Z).
2. Who made the P11 22-27 Nov Smoobu block and the 3588993 blocks is NOT KNOWN (Smoobu has no audit of who made a block). Who made the 20 Nov P20 manual rates is still NOT KNOWN.
3. Why the P13 +25% DSOs (27 Nov, 1 Dec) leave prices at or below uncustomized, and why P20 22 Nov `price` is above uncustomized despite -5%, are NOT KNOWN. What `user_price` represents is NOT KNOWN (M1).
4. Not re-read live today: P06, P14, P13 / P11 Vrbo overrides; account and group customizations (logs show no changes). The P05 Valentine's uncustomized price is beyond the 60-day raw window (UNKNOWN).
5. The market rows for the 2 / 4 BR listings are from 21 Nov (no 22 Nov refresh by this agent). There is no market row for P02, P03, P07-P10 or P14.
6. The 18 Oct base-rise recompute (P05 Valentine's cancellation) is not part of this section. It belongs to the occupancy or strategy sections and was NOT CHECKED here.
7. Process: two P13 override reads were sent in one message by mistake (see Sources). Both were read only.

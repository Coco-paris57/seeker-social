## PriceLabs audit (D = 2026-11-20)

**Sources**
- Snapshot `data/snapshots/2026-11-20/`: `raw/prices_*.json` (window 21 Nov 2026-19 Jan 2027), `raw/listing_data.json` (20 listings), `listings.csv`, `prices.csv`, `reservations.csv`. `market.csv` for 20 Nov is not in the snapshot yet, so base vs market uses the 19 Nov rows (`data/snapshots/2026-11-19/market.csv`).
- Baseline: `data/snapshots/2026-11-19/raw/` and `reports/2026-11-19/sections/pricelabs.md`. Smoobu rates from 19 Nov 07:19:38Z (`scratchpad/pl19/smoobu_rates.json`).
- Live PriceLabs reads, 20 Nov about 07:05-07:22Z, all 200, sent one at a time:
  - `get_listing_prices`: P20 20 Nov-19 Jan; P04 17-27 Dec; P14 21 Nov.
  - `get_user_logs`: listing, group and account, 19-20 Nov.
  - `get_listing_date_overrides`: P06, P20, P13 3064856, P11, P05, P04, P12.
  - `get_customizations`: P05, P04, P11, P20.
  - `get_listings` (smoobu).
- Live Smoobu GET (read only):
  - `/api/rates`: 15 apartments, 19 Nov 2026-19 May 2027, taken **07:19:07Z**.
  - `/api/reservations`: 15 Nov-15 Dec. Only dates, created/modified times, type, channel and amount were used. No guest fields were kept.
- Scripts and data are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl20/`:
  - `an20.py`: sync, floor, orphans and min stay.
  - `mv20.py`: day-on-day moves and twins.
  - `disc20.py`: a-discount-cut.
  - `smoobu_rates.json`: the Smoobu rates pull.
- **Policy respected:**
  - P02/P03/P06/P07 blocks are intentional (P06 gets numbers only).
  - P14 is a special setup (numbers only).
  - P13 is one flat, and the twin rule applies.
  - Handbacks: P09 after 26 Nov, P12 after 13 Dec, P01 / P08 / P10.
  - The 15% / 20% stay discounts are policy.
  - P04 is never under 3 nights.
  - P04 2 Dec and P12 17 Nov are deprioritised.
  - Reyhan's edits that conflict with policy go to Corentin as **confirm or revert**.

### Changes since 19 Nov 06:00Z
- **PriceLabs logs (total 1):**
  - Reyhan, **19 Nov 10:55:50Z**: P06 3288517 DSO **24 Nov-5 Dec, min 3**, price type "fixed" with no price value. In the live overrides it is min-stay only.
  - P06 then refreshed at 10:56:26Z.
  - Group and account logs: 0.
- **No revert of Reyhan's 18 Nov edits.** Every DSO is still live with its 18 Nov 12:14-12:18Z `updated_at` (H1).
- **Smoobu changes since 19 Nov 06:00 (from `modifiedAt`):**
  - P20: the new Airbnb stay 19-22 Nov (C1).
  - P06: the long block was moved to start **6 Dec** (6 Dec 2026-31 Dec 2027 block, modified **19 Nov 11:55:35**).
    - 30 Nov-5 Dec, which were closed yesterday, are now open: 324 / 363 / 376 / 388 / 432 / 472.
    - With 29 Nov (£269) that is a 7-night run at min 3.
  - P06: a new 1-night block on **22 Nov** (created 19 Nov 21:26). It leaves **23 Nov (£255, min 2) as a 1-night orphan**.
  - Who made the two P06 Smoobu changes is NOT KNOWN.
  - P06 is an intentional-block property, so this is for Corentin: **confirm the P06 block change (6 Dec start, 22 Nov block) was intended.**
- **Settings** (`listing_data.json` 19 vs 20 Nov):
  - Base, min, max, push and hidden are unchanged on all 20 listings.
  - P20 `recommended_base_price` went 354 -> 351. P04 is still "Unavailable".
  - P20 `occupancy_next_7` went 29% -> **14%**. The 19-22 Nov stay is not counted (C1).
- **Customizations** (live, unchanged vs 19 Nov):
  - P04, P05, P11 and P20 have Aggressive occupancy (0-15 d: -30% at 10% occupancy up to 0% at 100%) and default Booking Recency (5-15%).
  - Last-minute is P04 5% gradual, P05 1% gradual, P11 / P20 0%.
  - P04 Demand is Conservative.

---

### CRITICAL

**C1. P20 Waterford: PriceLabs has not registered the new Airbnb stay of 19-22 Nov. It still shows 20 Nov (£326) and 21 Nov (£351) OPEN at min 3. Smoobu has the nights closed. No double-sell is shown on the PriceLabs/Smoobu side; the OTA calendars were NOT CHECKED.** (Sources: live `get_listing_prices` 3547481 at about 07:05Z, `last_refreshed_at` **19 Nov 09:23:00Z**; Smoobu reservations and rates 07:19Z; `raw/prices_3547481.json`; `prices.csv`.)
- **The stay:**
  - Airbnb, 19-22 Nov, 3 nights, created **19 Nov 21:24** and modified 21:31:24 (Smoobu time).
  - £714.55 room + £150 cleaning = £864.55. Commission £134.01.
- **It reconciles to the penny** with the rates pushed by the 19 Nov 09:23Z refresh: 312 + 326 + 351 = £989, and £989 x 0.85 x 0.85 = **£714.55**.
  - This is the same 0.72x pattern as the 28-31 Oct stay (`listing_facts.P20.airbnb_discounts_22oct`), so it is not a leak.
  - The breakdown of the 0.7225 is not seen: last-minute 15% plus one more 15% layer (channel).
- **Smoobu (07:19:07Z): 19 / 20 / 21 Nov `available` 0.** Smoobu is the channel manager for availability. PriceLabs pushes prices and min stay only. So the stale "open" in PriceLabs does not reopen the night (inference from the data flow; not tested).
  - Whether Airbnb and Booking.com show 20-21 Nov closed is NOT CHECKED (channel).
- **Why PriceLabs is wrong:** no P20 refresh since 19 Nov 09:23Z, 12 h before the booking (C2).
  - PriceLabs `occupancy_next_7` is 14% (it counts 25-26 Nov only). Counting the stay, 4 of the next 7 nights are booked.
  - P20 runs Aggressive occupancy (0-15 d band). The open 22-24 Nov (**£290 / £283 / £276**, min 2) are priced without the stay. When it refreshes, these should move up or hold (direction is an inference; size not estimated).
- **Snapshot gap:** `prices.csv` marks 21 Nov `available=True` (£351). That column is built from PriceLabs `user_price` / `unbookable` (`rm/pricelabs_ingest.py` line 90), not from Smoobu. So the KPI pack's "PriceLabs = Smoobu" check cannot see a night closed in Smoobu but open in PriceLabs.
  - The same applies to P06 22 Nov (Smoobu closed by the new block, PriceLabs open).
- **Delivery block (for Corentin; ops, not pricing):** policy `listing_facts.P20.block_20_21_nov` says the Smoobu block on 20-22 Nov is a delivery.
  - In Smoobu, that 20-22 Nov block record is type **cancellation, modified 30 Oct 18:11:05**. The separate 18-19 Nov block was modified 18 Nov 16:16:46.
  - A guest is now in on 20-21 Nov. Is the delivery still happening?
- **Check in PriceLabs:** Waterford Court 3547481 > Calendar 20-21 Nov should show Booked, and last sync should be after 19 Nov 21:24.
  - If not, use Sync Now. That is a manual action for the user; this audit does not trigger it.

**C2. Push freshness (t-pl-push-1811): the same 9 listings have had no refresh since 19 Nov daytime. 2 are past 24 h now; 7 cross 24 h between 09:22Z and 10:56Z today.** (Sources: `listing_data.json` `last_date_pushed`; live `get_listing_prices` P20 / P04 / P14; `get_listings` push_enabled true on all 15 Smoobu listings.)

| Listing | Last push | Past 24 h at |
|---|---|---|
| P09 3318172 | 19 Nov 06:42:06Z | **already past** (P09 had no daytime refresh; all its nights to the 26 Nov handback are booked, so impact is nil) |
| P14 3267077 | 19 Nov 07:28:41Z (live 07:22Z: 07:28:40Z) | **07:28Z today** |
| P13 3064856 / 3090701 | 19 Nov 09:22:50Z | 09:22Z |
| P05 3166592 | 19 Nov 09:22:54Z | 09:22Z |
| P20 3547481 | 19 Nov 09:23:01Z (live: 09:23:00Z) | 09:23Z, and it has **missed a booking** (C1) |
| P04 3562176 | 19 Nov 09:23:03Z (live: 09:23:02Z) | 09:23Z |
| P06 3288517 | 19 Nov 10:56:27Z (1 min after Reyhan's DSO) | 10:56Z |
| P13 Vrbo `_3d48…` | 19 Nov 12:05:16Z (`last_refreshed_at` now null) | 12:05Z |
| P11 Vrbo `_7fd3…` | **18 Nov 12:34:01Z** (`last_refreshed_at` now null) | already past (43 h) |

- **The pattern for the third day running:**
  - P01, P02, P03, P07, P08, P10, P11 (00:30Z) and P12 (+ Vrbo, 05:13-05:52Z) refreshed overnight, 00:23-06:49Z on 20 Nov.
  - The listings above refresh only in daytime (19 Nov 07:28Z and 09:22-10:56Z), and not overnight.
  - P11 moved back to the overnight group today (it was stale yesterday).
  - Cause UNKNOWN. Possible causes: the nightly run skips these listings, a queue delay, or a push failure. Sync is on everywhere.
- **Price sync is fine:** 0 open nights differ by more than £2 between Smoobu (07:19:07Z) and the PriceLabs raw, 21 Nov-19 Jan, on 14 Smoobu listings. Min stay matches on every open night.
  - Availability differs on 2 nights: **P20 21 Nov** (C1) and **P06 22 Nov** (new Smoobu block). Both are PriceLabs-open and Smoobu-closed.
- **Check:** PriceLabs > Listings > last sync for the 9 listings after 09:23Z / 10:56Z today. If unchanged, ask PriceLabs support why these listings miss the nightly refresh (third day).

### HIGH

**H1. Reyhan's 18 Nov edits that conflict with standing decisions: still live, not reverted. For Corentin to confirm or revert.** (Sources: live overrides, `updated_at` 18 Nov; Smoobu 07:19Z; `policy.json`.)
1. **P13 1 Dec +25%, min 1** (3064856, `updated_at` 18 Nov 12:14:53Z).
   - Policy `intentional_overrides.P13` says +50%.
   - Price **£229** (yesterday £232); 3090701 **£161** (£163).
   - Revert = DSO 1 Dec +25% -> +50% on 3064856.
2. **P11 darts 14-18 Dec -2%** (14-15 Dec min 3, 16-18 Dec min 2; 18 Nov 12:14:13Z / 12:14:18Z).
   - Policy: the 21 Oct darts average above £300, and 24 Oct "leave the darts override as it is" (+5%).
   - 14-17 Dec **219 / 222 / 229 / 250, average £230.00** (£229.00). 14-18 Dec average £246.00 (18 Dec £310). 13 Dec is closed.
   - Revert = DSO 14-18 Dec -2% -> +5%.
- Not a policy conflict, but against "cut PriceLabs discounts":
  - P05 29 Nov-2 Dec -2% (500 / 484 / 482 / 501 = £1,967; £1,981 yesterday).
  - P11 3-4 Dec -2% (230 / 277; yesterday 214 / 329).
- P04 18-19 Nov +5% min 2 has expired (sold). Record it in `policy.json` only.

**H2. P20 5 Dec and 26 Dec: +100%, min 1, unchanged** (DSO `updated_at` 18 Nov 12:17:39Z / 12:17:57Z). (Sources: live overrides; live prices; Smoobu.)
- **5 Dec £528** (yesterday £531; uncustomized £363). **26 Dec £571** (£569; uncustomized £376). Both min 1 and sellable.
- Together that is **£1,099** vs the plan of about £537 (t-p20-5dec-orphan about £265; t-p20-26dec-orphan about £272): **+105%**. The supported range for 26 Dec is about £382 (19 Nov daily report).
- **Check:** Waterford 3547481 > DSO 5 Dec / 26 Dec: confirm +100%, or set 0% / -5% (min 1 kept).

**H3. a-discount-cut: not done. All four targets have the same customizations as 18 and 19 Nov.** (Sources: live `get_customizations`; raw + Smoobu, `disc20.py`.)
- **Windows:** next 13 = 21 Nov-3 Dec; next 30 = 21 Nov-20 Dec. The raw files start 21 Nov. The gap is uncustomized minus pushed price, on open nights.

| Listing | Next 13 (net) | Next 30 (net) | Next 30 positive-only |
|---|---|---|---|
| P05 | 4 n £216 (-9.9%) | **8 n £698 (-15.0%)** | £698 |
| P04 | 2 n -£193 (2 Dec +200% DSO) | 17 n £123 (-4.3%) | £365 |
| P11 | 8 n £56 (-3.1%) | 15 n £147 (-4.0%) | £204 |
| P20 | 3 n -£50 | 9 n -£63 (5 Dec +100%) | £152 |
| **Four targets** | **£29** (19 Nov £141) | **£905** (19 Nov £1,069) | **£1,419** (19 Nov £1,559) |

- On the same calendar windows as yesterday (21 Nov-2 Dec / 21 Nov-19 Dec), the totals are **£11 / £873**.
- **Why it fell:** the 19 Nov refreshes and the window shift; P20 20-21 Nov dropped out (stay, C1). Nothing was switched off.
- P04's occupancy band moves the uncustomized price with it, so the metric understates P04 (see 19 Nov C1).
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment (Aggressive), Booking Recency Factor (default) and Last Minute (P04 5%, P05 1%).

**H4. Day-on-day price moves (PriceLabs raw 19 vs 20 Nov, open nights in both)** (Sources: `raw/prices_*.json` both days; Smoobu 19 Nov 07:19Z vs 20 Nov 07:19Z for 180 nights.)
- **These are not overnight moves.** For P14, P05, P04, P13, P20 and P06 they come from the **19 Nov 07:28-10:56Z daytime refreshes**; those listings have not refreshed since. P11 (00:30Z) and P12 (05:52Z) refreshed overnight.

| Listing | Raw window (n) | Notable nights (19 -> 20 Nov) | 180 nights, Smoobu |
|---|---|---|---|
| P14 | **-£168** (59) | 18 Dec 484 -> **450 (min)**, 19 Dec 507 -> 471, 28-31 Dec -£12 to -£26 each | -£210 (180) |
| P05 | **-£106** (25) | 8 Dec 465 -> 486; 21 Dec 2,038 -> 2,049; Jan-Feb mostly -£10 to -£14 per night | **-£863** (129) |
| P04 | **-£65** (38; the Dispatcher counted -£75 / 37) | **19 Dec 175 -> 153** (now day 29, in the 16-30 d band at -20%), 24 Nov 135 -> 145, 2 Dec 428 -> 451, 18 Jan 158 -> 141 | -£124 (158) |
| P13 3064856 / 3090701 | -£34 / -£141 | 3090701 13-19 Dec -£15 to -£17 each; 3064856 19 Dec 243 -> 266 | -£449 / -£556 (147) |
| P11 | +£35 (34) | **4 Dec 329 -> 277** (-£52), 2-3 Dec +15 / +16, 8 Dec 292 -> 311, 22-27 Nov +£10 to +£13 each | -£181 (154) |
| P06 | +£38 (3) | 23 Nov 245 -> 255, 29 Nov 255 -> 269 | +£24 (2) |
| P12 | +£22 (5) | 20 Nov 319 -> 294, 3 Dec 282 -> 297 | -£3 (6) |
| P20 | +£12 (27) | 17 Dec 332 -> 305, 18 Apr 422 -> 328 | -£6 (146) |

- The causes are not visible in the data. They fit occupancy-band boundaries moving with the date (P04 19 Dec is shown; the others are not verified).
- **Data note:** in today's raw, `price` (what Smoobu has) differs from `user_price` / `booked_price` on many open nights. That is all 38 on P04, 25 on P05 and 22 on P20; for example P20 21 Nov is 351 vs 282, and P04 19 Dec is 153 vs 175. Smoobu matches `price` everywhere.
  - So the £ figures here use `price`. Yesterday the two fields were equal.

**H5. Plan items (PriceLabs side)** (Smoobu 07:19:07Z unless stated)

| Item | Status | Today (yesterday) |
|---|---|---|
| **t-p04-xmas-1711** | Open; DSOs unchanged (20-22 Dec -5%, 11 Nov; 23-26 Dec -5% min 4, 20 Oct) | 20-26 Dec **168 / 171 / 168 / 177 / 181 / 177 / 174 = £1,216** (£1,233). Min 3/3/3/4/4/4/4. Next to the 27 Dec stay, check-ins on 24, 25 and 26 Dec cannot meet min 4; 23 Dec sells only as exactly 23-27. Against market P50 £1,181 / P75 £1,503 (18 Nov pull): **+3.0% / -19.1%** |
| a-p04-dec-1611 | **Not done.** -5% DSO 6-22 Dec unchanged | 6-16 Dec **£1,561** (£1,577); 17-19 Dec **144 / 149 / 153** (146 / 150 / 175) |
| a-p12-trim | Engine-driven, DSOs unchanged (0% / min 2 since 15 Nov; refresh 20 Nov 05:52Z) | 20 Nov **294** (319), 30 Nov 268 (261), **1 Dec 282** (286; target about 245), **2-3 Dec 285 / 297** (282 / 282; target about 250 / 255) |
| t-p12-26nov-price | Not fixed. DSO +15%, min 1 (4 Nov 01:24:21Z) | 26 Nov **£311** (£310); target about £224 (**+£87**) |
| a-p05-dec | Open. DSOs unchanged (+300% min 1 on 21 / 29 Dec; +3% 7-8 Dec; +5% 13-14 Dec; -2% 29 Nov-2 Dec) | 21 Dec **£2,049**, 29 Dec **£2,540** (min 1); 7-8 Dec 484 / 486 = **£970** (£950); 13-14 Dec 515 / 500 = **£1,015** (£1,019) |
| t-p11-8dec-orphan | Unchanged. DSO +50% min 1 (15 Nov 18:48:33Z) | 8 Dec **£311** (£292); target about £150 |
| t-p13-twins | **Not fixed** | **138 of 147** jointly open nights in the next 180 are identical (138 / 146). There is now one run, **20 Dec-18 May**. They differ only on 27 Nov (270 / 189), 1 Dec (229 / 161) and **13-19 Dec** (240-266 vs 198-226, about -15%). Yesterday 19-21 Dec were identical; today 19 Dec differs (266 / 226) and 20-21 Dec are still identical. The 3090701 -10% DSO for 2 Jan-28 Feb (4 Nov, per 19 Nov) is still not visible in prices; overrides were not re-read today |
| P20 5 / 26 Dec +100% | Unchanged (H2) | £528 / £571, min 1 |
| t-pl-push-1811 | **Recurs, third day** (C2) | 9 listings stale since 19 Nov daytime; P20 missed a booking |
| P11 darts (conflict) | Unchanged (H1) | Average £230.00 (£229.00) |

### MEDIUM

**M1. Min stay and orphans, next 180 nights** (Smoobu 07:19:07Z, `an20.py`). Policy: 2-3 nights to 19 Jan; 5 from 20 Jan; 7 from 20 Mar.
- **Unsellable 1-night orphans:**
  - P04 24 Nov: £145, min 3 (P04 rule, numbers only).
  - **P06 23 Nov: £255, min 2** (new, from the 22 Nov Smoobu block; intentional-block property, numbers only).
  - P09 25 Apr is a handback and is ignored.
  - The P06 29 Nov orphan from yesterday is gone: 29 Nov-5 Dec is now open.
  - `kpi_pack` `gaps` is still [] for every ref.
- **Sellable short gaps:**
  - **P20 22-24 Nov** (3 n, 290 / 283 / 276 = £849, min 2; now between the 19-22 and 25 Nov-5 Dec stays).
  - P20 5 Dec and 26 Dec (min 1, H2).
  - P13 27 Nov and 1 Dec (min 1).
  - P12 26 Nov (min 1).
  - P11 2-4 Dec (215 / 230 / 277, min 3 / 2 / 2), 8 Dec (min 1) and 23-25 Dec (282 / 256 / 268, min 2).
  - P05 7-8 and 13-14 Dec (min 2); 21 and 29 Dec (min 1).
  - P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:** P04 23-26 Dec (min 4); P14 Fri-Sun min 4 (special).
- **Below 3 that conflicts with policy:** P20 22-24 Nov min 2 vs `listing_facts.P20.min_stay` "3 nights to 30 Nov" (DSO -5% min 2, 8 Nov 12:41:16Z). Unchanged: confirm or revert. Min 3 still sells the gap as one 3-night stay.
- **20 Jan-19 Mar, below 5:**
  - P11 40 / 59, P13 46 / 59 per twin, P05 33 / 51, P20 52 / 59 and P04 40 / 59.
  - P14 34 / 59 (special).
- **20 Mar on, below 7:**
  - P11, P13 and P20 are 60 / 60.
  - P05 (0 / 52) and P04 (0 / 60) comply.
  - P14 34 / 60 (special).

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 76 of 180 (42.2%) at the £450 minimum**, 20 Nov-21 Mar (19 Nov: 74). 18 Dec has now joined them. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.** Open nights: P04 158, P11 154, P13 147 per twin, P20 146, P05 129, P06 8, P12 6, P09 1.

**M3. Base vs market**
- Base prices are unchanged, and no 20 Nov `market.csv` exists, so the 19 Nov table stands:
  - P12 284 is +37.9% vs P50 / +21.9% vs P75.
  - P20 330: +28.9% / +1.9%.
  - P04 200: +15.6% / -6.1%.
  - P13 250: +13.1% / -8.1%.
  - P11 286: -2.1% / -14.1%.
  - P05 550: -2.7% / -20.5%.
  - P01 253: -5.2% / -25.8%.
  - P06 357: -12.9% / -32.3%.
- P02, P03, P07, P08, P09, P10 and P14 are UNKNOWN.
- P20 `recommended_base_price` is 351 against a base of 330 (policy 24 Oct says 350).

**M4. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json`, unchanged since 22 Oct; `build/properties.py`, unchanged since 21 Oct and likely out of date)
- **20 PriceLabs listings, all push on, none hidden.** Unchanged.
- **Vrbo copies:**
  - P11 `_7fd3…` has not pushed since 18 Nov 12:34Z.
  - P13 `_3d48…` last pushed 19 Nov 12:05Z.
  - Both now show `last_refreshed_at` null.
  - P02 `_ca1c…` has not pushed since 24 Feb.
  - Question: should the Vrbo copies push at all?
- **Unchanged since 19 Nov:**
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 3064856 / 3090701 duplicate = one flat (policy).
  - P03 is priced via Channex (pushed 20 Nov 03:26Z).
  - P15-P19 have no PriceLabs listing.
  - P20 is not in the info pack.
  - The pack vs PriceLabs min / base / max differences are as listed 19 Nov (every max; bases P04, P05, P14, P11, P12, P13, P06, P01, P09; min P14 400 vs 450).

Data gaps:
1. The Airbnb / Booking.com availability for P20 20-21 Nov and P06 22 Nov is NOT CHECKED (channel). The breakdown of the P20 0.7225 factor is not seen.
2. The P20 delivery status for 20-21 Nov is NOT KNOWN (ops). The Smoobu `modifiedAt` time zone is assumed to be London (= UTC in November).
3. The cause of the daytime-only refreshes on 9 listings is UNKNOWN (third day). So are the cause of the 19 Nov price moves (beyond P04 19 Dec) and the reason `price` and `user_price` diverged in today's raw.
4. `prices.csv` `available` comes from PriceLabs, not Smoobu, so Smoobu-only closures are invisible to the KPI pack.
5. `market.csv` for 20 Nov is absent; M3 uses the 19 Nov rows, and P04 Christmas P50 / P75 use the 18 Nov pull.
6. The raw window is 21 Nov-19 Jan, so sync after 19 Jan is NOT CHECKED. Overrides for P14, P13 3090701, P11 / P13 Vrbo copies and account / group customizations were not re-read today (logs show no changes).

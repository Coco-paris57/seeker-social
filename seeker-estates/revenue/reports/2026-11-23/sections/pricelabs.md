## PriceLabs audit (D = 2026-11-23)

**Sources**
- Snapshot `data/snapshots/2026-11-23/`: `raw/listing_data.json` (21 listings, none added or removed), `raw/prices_*.json` (window 24 Nov 2026-22 Jan 2027, 17 files incl. 3588993), `listings.csv`, `prices.csv`. Baseline: `data/snapshots/2026-11-22/raw/listing_data.json` and `raw/prices_*.json`, `reports/2026-11-22/sections/pricelabs.md`, Smoobu rates 22 Nov 07:20:26Z (`scratchpad/pl22/smoobu_rates.json`).
- Market: `data/snapshots/2026-11-23/market.csv` was absent, so it was copied forward from `2026-11-22/market.csv` under flock (`.market.csv.lock`). No new rows were added. Bedroom-matched rows are from 21-22 Nov.
- Live PriceLabs reads, 23 Nov about 07:21-07:35Z. All returned 200 and were read only. **Every call went out alone, one per message.** No write, sync or refresh tool was called.
  - `get_user_logs`: listing, group and account logs, 21-23 Nov.
  - `get_listing_prices`: P05, 12-17 Feb 2027.
  - `get_listing_date_overrides`: P04, P05, P11, P13 3064856, P06, P12, P20 and 3588993.
  - `get_customizations`: P05, P04, P11 and P20 (occupancy, last-minute and booking recency).
- Live Smoobu reads (GET only):
  - `/api/rates` for 16 apartments, 23 Nov 2026-22 May 2027, taken **07:19:58Z**.
  - `/api/reservations` for 15 Nov 2026-1 Mar 2027. Only dates, created and modified times, type, channel, amount and commission were kept (guest counts dropped). No names, contacts or reference numbers.
- Scripts and data are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl23/`:
  - Scripts: `an23.py` (sync, floor, orphans, min stay), `mv23.py` (day-on-day moves, twins), `disc23.py` (discount gap), `det23.py` (per-date detail).
  - Data: `smoobu_rates.json`, `smoobu_res.json`.
- **Policy respected:**
  - Blocks on P02, P03, P06 and P07 are intentional (P06 gets numbers only). P14 is a special setup (numbers only). P13 is one flat.
  - The 15% / 20% stay discounts and the Booking.com Visibility Booster are policy. P04 is never under 3 nights. P04 2 Dec and P12 17 Nov are deprioritised. Handbacks (P01, P08, P09, P10, P12) are excluded.
  - Reyhan's edits that conflict with policy go to Corentin as **confirm or revert**.
- **Smoobu timestamps** (`created-at` / `modifiedAt`) are shown as Smoobu returns them. Their time zone is NOT CONFIRMED (UTC or CET).

### Changes since 22 Nov 06:00Z
- **PriceLabs listing logs: 15 new entries, all by Reyhan.** Group and account logs: 0. There is no `remove_custom_pricing` entry. Some new DSOs overwrite older ones on the same dates.
  - **22 Nov 09:18:27Z: 3588993 base 425 -> 475** (source "reviewPrices", web, from IP `2a04:4a43:…`; Reyhan's other edits come from `2a01:4b00:…`).
  - **23 Nov 00:07:04-00:17:37Z: 14 entries.**
    - 00:07:04: P11 23-26 Nov set to min 2 with no % (replaces the -2% min 2). Also on the P11 Vrbo copy.
    - 00:07:45: P13 14-16 Dec -2%, min 3 -> 2. Also on 3090701 and the Vrbo copy.
    - 00:07:55: P13 20-21 Dec set to min 2 with no % (replaces -2% min 3). Also on 3090701 and the Vrbo copy.
    - 00:08:04: P13 2-31 Jan -8% min 3, re-saved. Also on 3090701 and the Vrbo copy.
    - 00:11:07: P06 2 Dec +25% min 1.
    - 00:14:34: P04 6-23 Dec -2% min 3 (replaces -5% on 6-22 Dec and on 23 Dec).
    - **00:17:37: 3588993 base 475 -> 450.**
- **Settings** (`listing_data.json`, 22 vs 23 Nov):
  - The only setting change is the 3588993 base, 425 -> 450. Min 170 and max 4000 are unchanged.
  - Every other base, min, max, push and hidden flag is unchanged.
  - `recommended_base_price` moved slightly: P02 176 -> 175; P13 3064856 241 -> 243; P13 3090701 239 -> 241; P13 Vrbo 250 -> 246; P08 252 -> 251. 3588993 is still blank.
- **Customizations** (live): P04, P05, P11 and P20 are unchanged.
  - All four: Aggressive occupancy and default Booking Recency.
  - Last-minute: P04 5% gradual, P05 1% gradual, P11 / P20 0%.
- **Smoobu changes since 22 Nov 06:00Z** (`modifiedAt`):
  - **P11: new "Blocked channel" block from 5 Jan 2027 to 31 Jul 2029** (made 22 Nov 12:18:28). See C2.
  - **P11: the 22-27 Nov block was cancelled** (modified 23 Nov 01:06:49). 23-26 Nov is open again (H5).
  - 3588993: **first reservation**, Airbnb 21-26 Dec (H2).
  - P06: Airbnb 29 Nov-2 Dec (19:24) and 3-6 Dec (23:13).
  - P04: Booking.com 10-14 Dec (22:54).
  - No cancellations.

---

### CRITICAL

**C1. t-pl-push-1811 (day 6): an overnight refresh did run, but it coincides with Reyhan's 00:07-00:17Z edit session. It cannot be closed on one night.** (Sources: `raw/listing_data.json` and `raw/prices_*.json` `last_refreshed_at` / `last_date_pushed`; `get_user_logs`.)

| Listing | Logged edit (23 Nov) | Refresh / push | Lag after edit |
|---|---|---|---|
| P12 Vrbo `_386e…` | none | 00:04:57Z / 00:06:02Z | n/a |
| P12 2699998 | **none** | 00:05:07Z / 00:05:08Z | n/a |
| P11 3064196 | 00:07:04Z | 00:07:33Z / 00:07:34Z | 29 s |
| P11 Vrbo `_7fd3…` | 00:07:04Z | 00:08:08Z / 00:09:05Z | 64 s |
| P13 3064856 / 3090701 | 00:07:45-00:08:04Z | 00:10:05Z / 00:10:06Z | about 2 min |
| P05 3166592 | **none** | 00:10:58Z / 00:10:59Z | n/a |
| P06 3288517 | 00:11:07Z | 00:11:31Z / 00:11:32Z | 24 s |
| P04 3562176 | 00:14:34Z | 00:15:14Z / 00:15:15Z | 40 s |
| P20 3547481 | **none** | 00:15:15Z / 00:15:16Z | n/a |
| 3588993 | 00:17:37Z (base) | 00:20:25Z / 00:20:26Z | 2 min 48 s |
| P13 Vrbo `_3d48…` | 00:08:04Z | 00:22:52Z / 00:22:58Z | about 15 min |

- **Was it scheduled or triggered?**
  - Five listings refreshed 24 s to 3 min after one of Reyhan's saves. That is the same pattern as 20 Nov ("20-60 s after Reyhan's DSO saves").
  - **P12, P05 and P20 refreshed with no logged edit.** Whether Reyhan's session triggered them (for example a page action that is not logged), or the nightly job ran for them, is UNKNOWN.
  - The usual overnight group ran at its normal times: P02 00:23:19Z, P03 (Channex) 03:31:17Z, P07 03:50:27Z, P01 04:00:57Z, P10 04:47:54Z, P08 06:32:03Z, P09 06:38:34Z.
  - P14 refreshed **07:03:21Z** in its prices file, but its `listing_data` still shows 22 Nov 07:16:17Z (it refreshed after the `listing_data` pull). P14 is still daytime.
- **Availability is now registered correctly:**
  - **P05 Valentine's 13-16 Feb is open in PriceLabs** (live `get_listing_prices` 3166592, refresh 00:10:58Z).
    - `booking_status` is blank (open) on 12-17 Feb.
    - 13-16 Feb is **438 / 410 / 419 / 421 = £1,688**, min 4. Smoobu shows the same 438 / 410 / 419 / 421, available, min 4.
    - The uncustomized price is 500 / 439 / 459 / 465 = £1,863. That is -£175 (-9.4%) under the -5% min 4 February DSO. The extra cut beyond 5% comes from layers that are NOT KNOWN.
  - **P11 23-26 Nov is registered OPEN, not blocked.** This is correct, because the Smoobu block was cancelled (H5). PriceLabs and Smoobu agree: 24-26 Nov 200 / 197 / 219, min 2. 23 Nov is outside the raw window; Smoobu shows 184.
- **Nothing is stale this morning, with one caveat on P14.**
  - Every other Smoobu listing pushed within 24 h of 07:20Z. These listings next reach 24 h at about 00:05-00:23Z on 24 Nov.
  - P14's `listing_data` `last_date_pushed` is 22 Nov 07:16:18Z (24 h at 07:16Z today). Its prices file shows a refresh at 07:03:21Z today. A push after that refresh is NOT CONFIRMED, but Smoobu equals PriceLabs at 07:19:58Z.
- **To close:** a second night with **no edits** must still show P04, P05, P06, P11, P12, P13 and P20 refreshing between 00:00 and 06:00Z. One night that overlaps an edit session is not a pattern.
- **Check:** PriceLabs > Listings > Last Sync for these 8 IDs on 24 Nov. If the daytime-only pattern returns, raise the PriceLabs support ticket. Sync Now is a user action; this audit does not trigger it.

**C2. P11 Camden: Smoobu "Blocked channel" block from 5 Jan 2027 to 31 Jul 2029 (made 22 Nov 12:18:28). It is not in `policy.json` handbacks. Open nights in the next 180 fell from 152 to 20.** (Sources: Smoobu `/api/reservations` and `/api/rates` 07:19:58Z; `raw/prices_3064196.json`, where 5-22 Jan is "Blocked" at refresh 00:07:33Z.)
- PriceLabs has registered the block: 5 Jan onwards is `Blocked`.
- **Side effect:** 3-4 Jan is now a **2-night orphan at min 3** (144 / 155 = £299, -8% DSO). Nothing can book it.
- P11's own DSOs after 5 Jan (2 Jan-28 Feb -8% min 3) no longer matter.
- Who made the block is NOT KNOWN (Smoobu has no audit trail for who made a block). It looks like the handback blocks of 19 Oct, but that is NOT CONFIRMED.
- **Question for Corentin:** is Camden being handed back after 4 Jan? If yes, add it to `policy.json` handbacks with last night 4 Jan, and then the 3-4 Jan orphan needs min 2. If no, the block should come off.
- **Check:** Smoobu > Camden calendar from 5 Jan, and PriceLabs 3064196 > Calendar.

### HIGH

**H1. Reyhan's conflicts (a-reyhan-2011): two partly reverted overnight. New overnight edits listed. The rest are unchanged.** (Live overrides; `get_user_logs`; Smoobu 07:19:58Z vs 22 Nov 07:20:26Z.)
- **Partly reverted (23 Nov 00:07Z):**
  - **P11 22 Nov-7 Dec -2% min 2:** the -2% was removed on **23-26 Nov** only (now min 2 with no %). **27 Nov-7 Dec is still -2% min 2** (`updated_at` 20 Nov 22:49:52Z).
  - **P13 10-26 Dec -2%:** removed on **20-21 Dec** (now min 2 with no %), on both twins and the Vrbo copy. 14-16 Dec kept -2% but min went 3 -> 2. 10-13, 17-19 and 22-26 Dec are still -2% min 3.
  - 3064856 prices: 20-21 Dec **207 / 210** (yesterday 205 / 213); 14-16 Dec 190 / 189 / 193 (194 / 191 / 194).
- **New overnight edits to confirm:**
  1. **P04 6-23 Dec -5% -> -2% min 3** (00:14:34Z). This is a partial step toward a-p04-dec-1611 (plan: about +14%).
     - Open nights 6-9 and 14-19 Dec: **£1,585**, vs £1,443 yesterday (+£142, +9.8%).
     - 6-9 Dec 170 / 170 / 171 / 150 (yesterday 174 / 140 / 140 / 137); 14-19 Dec 146 / 149 / 152 / 154 / 159 / 164 (133 / 137 / 140 / 142 / 147 / 153).
     - Still under uncustomized on every night, for example 7 Dec 170 vs 200 and 19 Dec 164 vs 207.
  2. **P13 2-31 Jan -8% min 3 re-saved** (00:08:04Z, both twins and the Vrbo copy).
     - 3064856 3-8 Jan is 173 / 172 / 174 / 171 / 172 / 169, against 170 / 169 / 170 / 168 / 169 / 167 yesterday. So -8% was most likely already in place. The earlier value is NOT KNOWN (not in the 18-22 Nov logs read).
     - This is a PriceLabs discount kept against "cut PriceLabs discounts".
     - **Min 3 on 22-31 Jan is under the policy minimum of 5** for dates 2+ months ahead.
  3. **P06 2 Dec +25% min 1** (00:11:07Z). This opens the 1-night orphan between the two new Airbnb stays: **£349**, uncustomized £364. P06 is numbers only.
  4. **3588993 base 425 -> 475 -> 450** (H2).
- **Still not reverted** (`updated_at` unchanged; no remove logs):
  - **P04 24-26 Dec +5% min 2** (20 Nov 22:53:59Z). This breaches `listing_facts.P04.min_stay_rule`. Smoobu **187 / 190 / 187**.
  - **P05**, all with the same `updated_at`:
    - 29 Nov-2 Dec -5% min 3: **508 / 493 / 486 / 493 = £1,980** (yesterday £1,933).
    - 7-8 Dec -1% min 2: **428 / 407 = £835** (£879); uncustomized 563 / 511.
    - 13-14 Dec, no % and min 2: **485 / 479 = £964** (£932); uncustomized 614 / 580.
    - 4-31 Jan -8% min 3.
  - **P11 2 Jan-28 Feb -8% min 3:** moot from 5 Jan (C2). 3-4 Jan 144 / 155.
  - **P13 1 Dec +25% min 1** (policy `intentional_overrides.P13`: +50%):
    - 3064856 **£232** (uncustomized 240); 3090701 **£163** (uncustomized 174).
    - 27 Nov +25%: 262 vs uncustomized 276, and 183 vs 201.
    - Both twins are still under their uncustomized price. Cause NOT KNOWN.
  - **P11 darts 14-18 Dec -2%** (policy 21 Oct: average above £300):
    - 14-17 Dec **206 / 215 / 225 / 248, average £223.50** (yesterday £229.50).
    - 18 Dec £314 (yesterday £324).
- **Check:** each listing > Calendar > Date Specific Overrides on the dates above.

**H2. Scott Ellis Gardens 3588993: base changed twice since yesterday by Reyhan (22 Nov 09:18:27Z 425 -> 475; 23 Nov 00:17:37Z 475 -> 450). First reservation: Airbnb 21-26 Dec. The listing is still unmapped.** (Sources: `get_user_logs`; `raw/listing_data.json`; `raw/prices_3588993.json`; Smoobu 07:19:58Z; `market.csv`.)
- **First reservation:**
  - Airbnb, **21-26 Dec (5 n)**, Smoobu amount **£1,631.76** (room £1,481.76 + cleaning £150 per the occupancy section), commission £252.92. Made 22 Nov 11:48 (Smoobu timestamp). Whether the amount includes cleaning is NOT KNOWN.
  - Smoobu rates for those nights on 22 Nov 07:20Z (base 425): 394 / 419 / 410 / 415 / 420 = **£2,058**. The amount is **0.79x** that.
  - With today's base 450, PriceLabs shows 445 / 442 / 453 / 450 / 457 = £2,247 (0.73x).
  - At booking time the base was 475. The rates pushed then were NOT CAPTURED. The 20% Airbnb special offer (t-scott-ellis-2011) may explain part of the gap (NOT CHECKED).
  - 25 Dec min 4 did not block a 5-night stay.
- **Effect of base 450:** 165 nights are open on both days in the next 180. They total **£70,352 -> £74,727 (+£4,375, +6.2%)**.
  - Examples: 18-20 Dec 387 / 413 / 362 -> **467 / 494 / 427**; 29-31 Dec 551 / 555 / 555 -> **642 / 636 / 637**.
- **Against the market** (3 BR Nearby Listings, n=148): **base 450 is +15.7% vs P50 389 and -5.7% vs P75 477.**
- **Floor and ceiling:** 0 of 165 open nights are at min 170 or max 4000. Max 4000 is 8.9x base: it never binds and is not a realistic cap.
- **Min stay:** the DSOs are unchanged (21 Nov, min stay only). Fri-Sun is min 4. New Year is 27 Dec min 7, 28 Dec min 5, 29-31 Dec min 4.
- **Questions for Corentin:**
  1. Did the 475 and 450 bases have your sign-off?
  2. Is this P21, to add to `id_map.json`, `policy.json` and the pack?
  3. Should the 4000 max be cut?
- **Check:** 3588993 > Base, and the Airbnb reservation price breakdown for 21-26 Dec.

**H3. a-discount-cut: not done. The four targets have the same customizations.** (Live `get_customizations`; `disc23.py`. Gap = uncustomized minus pushed `price`, on Smoobu-open nights. Window: 24 Nov to the date shown. The raw prices do not include 23 Nov, so these figures are not like for like with yesterday's.)

| Listing | 24 Nov-4 Dec (net) | 24 Nov-20 Dec (net) | 24 Nov-20 Dec positive-only |
|---|---|---|---|
| P05 | 4 n £10 | **8 n £479** (-11.2%) | £483 |
| P04 | 2 n -£195 (2 Dec +200%) | 13 n £140 | £364 |
| P11 | 8 n -£31 | 14 n £42 | £156 |
| P20 | 1 n £2 | 7 n -£27 (5 Dec +100%) | £158 |
| **Four targets** | **-£214** | **£634** | **£1,161** |

- P05 fell from £833 to £479. Its 29 Nov-2 Dec nights moved to within £10 of uncustomized, and the 7-8 / 13-14 Dec gaps stayed large (£239 and £230).
- Including 21 Dec (+300%) flips P05 to -£988. That is why the window ends on 20 Dec.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment (Aggressive), Booking Recency Factor (default), Last Minute (P04 5%, P05 1%).

**H4. Plan items (PriceLabs side)** (Smoobu 07:19:58Z vs 22 Nov 07:20:26Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **Not closable** (C1) | Refresh 00:05-00:23Z during Reyhan's edits; P12 / P05 / P20 refreshed with no edit |
| t-p05-valentine-2211 | **Registered open** | 13-16 Feb **438 / 410 / 419 / 421 = £1,688**, min 4 (£1,679); uncustomized £1,863; -5% min 4 DSO (15 Nov 19:14:20Z) unchanged |
| t-p11-block-2211 | **Block gone** (H5) | 23-26 Nov open **184 / 200 / 197 / 219 = £800**, min 2 |
| t-p04-xmas-1711 | 23 Dec now -2% (was -5%); 24-26 Dec +5% min 2 unchanged | 20-26 Dec **161 / 161 / 160 / 163 / 187 / 190 / 187 = £1,209** (£1,207); 20 Dec 150 -> 161, 22 Dec 166 -> 160, 23 Dec 170 -> 163 |
| a-p04-dec-1611 | **Partly done by Reyhan:** -5% -> -2% (plan was about +14%) | 6-9 and 14-19 Dec £1,585 (£1,443); 10-13 Dec now booked (Booking.com) |
| a-p12-trim | Engine-driven; DSO min 2 only, unchanged | 30 Nov-3 Dec **254 / 270 / 276 / 290** (260 / 284 / 286 / 297); targets about 235 / 250 / 250 / 260 |
| t-p12-26nov-price | Not fixed; DSO +15% min 1 (4 Nov) | 26 Nov **£307** (£325); uncustomized £234; target about £224-230 |
| a-p05-dec | Open; +300% min 1 unchanged | 21 Dec **£2,215** (£2,109; uncustomized £748); 29 Dec **£2,392** (£2,422; uncustomized £894); 29 Nov-2 Dec £1,980; 7-8 Dec £835; 13-14 Dec £964 |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (15 Nov 18:48:33Z) | 8 Dec **£233** (£305; uncustomized £205). It fell £72 with no edit; cause NOT KNOWN (possibly a recalculation after C2). Target about £150-159 |
| t-p13-twins | Gap unchanged | 148 of 150 jointly open nights in the next 180 are identical, in one run 13 Dec-21 May. They differ only on **27 Nov (262 / 183)** and **1 Dec (232 / 163)** |
| P20 5 / 26 Dec +100% | Unchanged (18 Nov) | 5 Dec **£591** (£520; uncustomized £406); 26 Dec **£508** (£539; uncustomized £345); min 1 |
| P06 new stays | No PriceLabs layer cut them | PriceLabs and Smoobu were 286 / 271 / 304 (£861) and 323 / 358 / 359 (£1,040) on 22 Nov. Paid £513.04 (0.60x) and £768.82 (0.74x) room. The cut is downstream of PriceLabs (Airbnb or Smoobu layers, NOT CHECKED here) |
| P04 Booking.com 10-14 Dec | No PriceLabs layer cut it | PriceLabs and Smoobu were 141 / 148 / 150 / 141 (£580) on 22 Nov. Paid £488.35 (0.84x). Which rate plan applied is NOT CHECKED here |

**H5. P11 22-27 Nov block cancelled in Smoobu (modified 23 Nov 01:06:49). 23-26 Nov is back on sale and PriceLabs agrees.** (Smoobu `/api/reservations` and `/api/rates`; `raw/prices_3064196.json`; overrides.)
- The nights are open at **184 / 200 / 197 / 219 = £800**, min 2. Tonight, 23 Nov, is £184.
- 24-26 Nov `price` is above uncustomized (155 / 172 / 203) now that there is no % DSO. Cause NOT KNOWN.
- At 00:07:04Z Reyhan set min 2 on those dates (H1). If Smoobu reports CET, the cancellation was at 00:06:49Z, 15 s before Reyhan's edit. That suggests the same person, but it is NOT CONFIRMED.
- **Question for Corentin:** was reopening 23-26 Nov intended? Yesterday's open question was whether the block was intentional.

### MEDIUM

**M1. Sync (Smoobu 07:19:58Z vs PriceLabs `price`, 24 Nov-22 Jan open nights): 0 differences over £2 on every Smoobu listing, incl. P14 and 3588993.** Availability and min stay match too.
- The kpi_pack `sync_issues` is [] for every ref.
- Yesterday's 6 small P14 differences are gone.
- `user_price` / `booked_price` still differ from `price` on many nights (for example P11 8 Dec 310 vs 233). Smoobu follows `price`. What `user_price` represents is NOT KNOWN.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:19:58Z, `an23.py`). Policy: 2-3 nights to 21 Jan; 5 from 22 Jan; 7 from 22 Mar.
- **Unsellable orphans:**
  - **P11 3-4 Jan** (2 n, 144 / 155, min 3). New, caused by C2.
  - P04 24 Nov £136, min 3 (P04 rule, numbers only).
  - P09 25 Apr £449, min 5 (handback, ignored).
- **P06 2 Dec is no longer an orphan problem.** It is a 1-night gap at £349, now min 1 (Reyhan's 00:11:07Z DSO).
- **P04 around 10-14 Dec: no orphan.** Before the stay, 6-9 Dec is 4 n at min 3. After it, 14-23 Dec is open at min 3.
- **Sellable short gaps a gap-fill rule would cover:**
  - P20 23-24 Nov (243 / 228, min 2).
  - P12 26 Nov £307 (min 1).
  - P13 27 Nov and 1 Dec (min 1).
  - P11 8 Dec £233 (min 1) and 23-25 Dec **290 / 280 / 291** (min 2; yesterday 266 / 242 / 251).
  - P05 7-8 and 13-14 Dec (min 2); 21 and 29 Dec (min 1).
  - P20 5 and 26 Dec (min 1).
  - P06 23 Nov £308 (min 1; yesterday £269) and 2 Dec £349.
  - P04 2 Dec £425 (deprioritised).
- **Below 3 that conflicts with policy:**
  - P04 24-26 Dec min 2 (H1).
  - P20 23-24 Nov min 2 vs `listing_facts.P20.min_stay` 3 to 30 Nov. The gap is now only 2 nights, so min 3 would make it unsellable.
- **2-4 months out, below 5:**
  - P13 47 / 59 per twin (was 45: 20-21 Feb and 22-23 Mar fell 5 -> 4).
  - P05 34 / 52, P20 50 / 59, P04 37 / 59.
  - P14 33 / 59 (special). 3588993 47 / 59.
  - P11 has no open nights (C2).
- **4+ months out, below 7:**
  - P13, P20 and 3588993 are 60 / 60.
  - P05 (0 / 55) and P04 (0 / 60) comply.
  - P14 35 / 60 (special).
  - P05 20-21 May min 10 -> 7.

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 79 of 180 (43.9%) at the £450 minimum**, 23 Nov-21 Mar (yesterday 76 / 180). `kpi_pack` `bounds` next 30: 86.7%, average open price £450. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.** Open nights: 3588993 165, P04 157, P13 150 per twin, P20 148, P05 136, P11 20, P12 5, P06 2, P09 1.

**M4. Base vs market** (latest bedroom-matched rows in `market.csv`, copied forward; base vs P50 / P75)
- P12 284 vs 205 / 234: **+38.5% / +21.4%**
- P20 330 vs 253 / 321: +30.4% / +2.8%
- **3588993 450 vs 389 / 477 (3 BR): +15.7% / -5.7%** (yesterday +9.3% / -10.9%)
- P04 200 vs 174 / 216: +14.9% / -7.4%
- P13 250 vs 222 / 271: +12.6% / -7.7%
- P11 286 vs 293 / 335: -2.4% / -14.6%
- P01 253 vs 261 / 338: -3.1% / -25.1%
- P05 550 vs 582 / 704 (4 BR): -5.5% / -21.9%
- P06 357 vs 412 / 529: -13.3% / -32.5%
- UNKNOWN (no row): P02, P03, P07, P08, P09, P10 and P14.
- The kpi_pack `market_percentiles` are empty because `market.csv` was missing when the pack was built (`missing.market: empty`).

**M5. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json` and `seeker-estates/build/properties.py`, both last modified 18 Nov 06:53, so likely out of date)
- **21 PriceLabs listings, all push on, none hidden.**
  - 3588993 is still not in id_map, policy or the pack (t-scott-ellis-2011).
- **Vrbo copies:**
  - All three active copies refreshed **and pushed** overnight: P12 `_386e…` 00:06:02Z, P11 `_7fd3…` 00:09:05Z, P13 `_3d48…` 00:22:58Z. Yesterday P13's copy had refreshed without pushing; it now pushes.
  - **The copies inherited Reyhan's DSOs** (`add_custom_pricing_from_parent`), and so did 3090701.
  - P02 `_ca1c…` has not pushed since 24 Feb (known).
  - Question (unchanged): should the Vrbo copies push at all?
- **Unchanged:**
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins are at identical coordinates (one flat, policy).
  - P03 is priced via Channex (pushed 03:31:21Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match except P14 (pack 400, PriceLabs 450).
  - Every PriceLabs max is higher than the pack's (for example P04 450 -> 2000, P05 780 -> 3500).
  - Bases differ on P01, P04, P05, P06, P09, P11, P12, P13 and P14 (see 22 Nov M5).
  - P05 is "5-bed" in the pack but 4 in PriceLabs.
- **New:** if C2 is a handback, Camden needs a `policy.json` handbacks entry.

Data gaps:
1. Whether the 00:05-00:23Z refresh was the nightly job or was triggered by Reyhan's session is UNKNOWN: P12, P05 and P20 refreshed with no logged edit. Only tonight (24 Nov, with no edits) can settle it.
2. Who made the P11 5 Jan-31 Jul 2029 block, and who cancelled the 22-27 Nov block, is NOT KNOWN. The time zone of Smoobu timestamps is NOT CONFIRMED.
3. 3588993: the rates pushed while the base was 475 (22 Nov 09:18Z to 23 Nov 00:17Z) were not captured. Whether the £1,631.76 includes cleaning, and whether the Airbnb special offer applied, is NOT CHECKED.
4. The previous value of the P13 2-31 Jan DSO (before the 00:08:04Z re-save) is NOT KNOWN. Prices barely moved, so it was likely already -8%.
5. Why P11 8 Dec fell £305 -> £233 with no edit, why P13 +25% nights stay under uncustomized, and why P11 24-26 Nov sits above uncustomized are NOT KNOWN. What `user_price` represents is NOT KNOWN.
6. Not re-read live today:
   - P14, P13 3090701, P11 / P13 Vrbo overrides. 3090701 and the Vrbo copies were taken from the `_from_parent` logs.
   - Account and group customizations (their logs show no changes).
   - 3588993 customizations.
7. There were no new market rows today. The 2 / 4 BR rows are from 21 Nov and the 3 BR row from 22 Nov. No row for P02, P03, P07-P10 or P14.
8. The window comparisons in H3 start 24 Nov (raw), so they are not like for like with yesterday's 23 Nov-start figures.
9. The Christmas / NYE comp comparison for 3588993 and the downstream layers on the P06 / P04 stays are for the comp and channel sections. They were NOT CHECKED here.

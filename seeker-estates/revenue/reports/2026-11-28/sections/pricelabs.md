## PriceLabs audit (D = 2026-11-28)

**Sources**
- Snapshot `data/snapshots/2026-11-28/`: `raw/listing_data.json` (21 listings, none added or removed), 17 `raw/prices_*.json` (29 Nov 2026-27 Jan 2027), `raw/neighbourhood_P13.json`, `listings.csv`, `prices.csv`, `reservations.csv`. `market.csv` is not in today's snapshot; the 27 Nov rows (`data/snapshots/2026-11-27/market.csv`, pulled 27 Nov) are used, and P13 comes from today's `neighbourhood_P13.json` (2 BR P50 215 / P75 268, n = 114). `kpi_pack.json` 28 Nov.
- Live Smoobu (GET only), taken **28 Nov 07:19:13Z**: `/api/rates` for 16 apartments, 28 Nov 2026-27 May 2027; `/api/reservations` 15 Nov 2026-31 Dec 2029 (dates, created / modified, type, channel, amount, commission only; no guest fields). The pull again skipped one record through pagination (P20 27 Dec-3 Jan); `reservations.csv` and the P20 PriceLabs file both have that stay, so nothing is lost. Smoobu times are CET (Z = minus 1 h).
- Live PriceLabs reads, 28 Nov from about 07:20Z, all 200, read only, in this order: `get_listing_prices` P05 3166592, P06 3288517, P04 3562176; `get_user_logs` listing (27-28 Nov); `get_user_logs` group and account (27-28 Nov); `get_listing_data` (all); `get_listing_date_overrides` P05, P04, P06, P12 2699998, P13 3064856; `get_customizations` P05 (last-minute, occupancy, booking recency, far-out); `get_listing_prices` P12 Vrbo copy `_386e…`. **Protocol breach:** the group and account `get_user_logs` calls were sent together in one message. Both are read only and both returned 0 entries. Every other call was sent alone. No write, sync or refresh tool was called.
- Scripts and data: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl28/` (`fetch.py`, `an28.py`, `cmp.py`, `det.py`, `smoobu_rates.json`, `smoobu_res.json`). Baseline: `reports/2026-11-27/sections/pricelabs.md`, `scratchpad/pl27/`.
- **Policy respected:** P02/P03/P06/P07 blocks intentional (P06 numbers only); P14 special setup (numbers only); P13 is one flat; 15% / 20% stay discounts and Visibility Booster are policy; P04 never under 3 nights; P04 2 Dec deprioritised; handbacks (P01, P08, P09, P10, P12 after 13 Dec) excluded. Reyhan's policy conflicts go to Corentin as **confirm or revert**.

### Changes since 27 Nov 06:00Z
- **PriceLabs logs: 9 listing entries, 0 group, 0 account.** All 9 are Reyhan, web, 27 Nov 14:56:39-15:02:33Z, "Added Date Specific Override":

| Time (Z) | Listing | Dates | Override |
|---|---|---|---|
| 14:56:39 | P12 2699998 (+ Vrbo copy `_386e…` from parent) | 30 Nov-6 Dec | -2%, min 2 |
| 14:56:54 | P12 2699998 (+ Vrbo copy) | 7-10 Dec | -2%, min 2 |
| 15:00:25 | P05 3166592 | 29 Nov-2 Dec | **-10%**, min 3 (was -8%, Reyhan 24 Nov) |
| 15:00:31 | P05 3166592 | 4-31 Jan 2027 | **-10%**, min 3 (was -8%) |
| 15:00:37 | P05 3166592 | 1-28 Feb 2027 | **-8%**, min 4 (was -5%) |
| 15:02:01 | P06 3288517 | 3-13 Dec | -2%, min 3 |
| 15:02:33 | P04 3562176 | 6-26 Dec | **-5%**, min 3 (was 0%, 25 Nov 17:02Z) |

  The live overrides on P05, P04, P06 and P12 match these entries exactly (`updated_at` 27 Nov 14:56:39-15:02:33Z). Nothing is logged after 15:02:33Z.
- **Settings** (`listings.csv` 27 vs 28 Nov): every base, min, max, push flag and recommended base unchanged on all 21 listings.
- **Smoobu changes:**
  - **CANCELLED: P12 Booking.com 7-14 Dec**, modified 27 Nov 09:31:48 CET (**08:31:48Z**); total £1,582.42 (room £1,432.42 + cleaning £150), commission £237.36, made 14 Nov.
  - **NEW: P06 Airbnb 8-12 Dec**, created 27 Nov 22:21:20 CET (**21:21:20Z**); total £1,077.60 = room £948.60 + cleaning £129; commission £167.03.
  - Modified with no change to amount or commission: P06 Airbnb 29 Nov-2 Dec (27 Nov 11:19:34 CET; £642.04 / £99.52).
  - No block changed: P11 5 Jan 2027-31 Jul 2029 (22 Nov 12:18:28); Scott Ellis blocks (23 Nov 10:58-10:59); P01 30 Nov-21 Dec (10 Nov 14:41:27).

---

### CRITICAL

**C1. t-p11-block2029-2311 (day 6): the P11 Camden "Blocked channel" block, 5 Jan 2027-31 Jul 2029, is unchanged** (created and last modified 22 Nov 12:18:28). It is not in the `policy.json` handbacks. (Sources: Smoobu `/api/reservations` and `/api/rates` 07:19:13Z; `raw/prices_3064196.json`, refreshed 07:07:08Z.)
- **3-4 Jan is still a 2-night orphan that cannot sell at min 3: 148 / 163 = £311** (unchanged; uncustomized 200 / 222 = £422).
- Open P11 nights in the next 180: **16**, all before 5 Jan.
- **Question for Corentin (unchanged):** is Camden handed back after 4 Jan? If yes, add it to `policy.json` handbacks (last night 4 Jan) and set 3-4 Jan to min 2 in P11 > Date Specific Overrides. If no, remove the block in Smoobu.

### HIGH

**H1. The 49 PriceLabs-vs-Smoobu mismatches are a timing artefact of the snapshot. Neither side is stale. Smoobu equals live PriceLabs on every one.** (Sources: `kpi_pack.json` `sync_issues`; `raw/prices_3166592/3562176/3288517.json` (refreshed 27 Nov 15:00:54Z / 15:02:50Z / 15:02:19Z); live `get_listing_prices` 28 Nov about 07:20Z; Smoobu `/api/rates` 07:19:13Z.)
- **What happened:** the snapshot price files for P05, P04 and P06 were saved before PriceLabs refreshed and pushed those listings at **07:07:15-07:07:22Z** on 28 Nov (live `last_refreshed_at` P05 07:07:15Z, P04 07:07:18Z, P06 07:07:21Z; `last_date_pushed` 07:07:16Z / 07:07:19Z / 07:07:22Z). Smoobu was read after that push.
- **Check, date by date:** on all **45 price mismatches** (P05 20, P04 21, P06 4), the Smoobu rate equals the live PriceLabs `price` exactly. The live `user_price` equals the 15:00Z snapshot `price`, which is consistent with H2 of 27 Nov ("Your Price" is the previous push). Examples:
  - P05 29 Nov: Smoobu **442**, live PriceLabs **442**, 15:00Z file 464. P05 13 Dec: **404 / 404** vs 476.
  - P04 13 Dec: **166 / 166** vs 141. P04 6-9 Dec: **160 / 160 / 162 / 159** in both, vs 163 / 164 / 165 / 161.
  - P06 6 / 7 / 12 Dec: **271 / 262 / 283** in both, vs 326 / 296 / 317.
- **The other 4 of the 49** are P06 8-11 Dec. They were open in the 15:02Z file and closed in Smoobu. They are now **Booked** in live PriceLabs (`booked_date` 2026-11-27, ADR £237.15 = £948.60 / 4).
- **Which value is the live OTA price?** The Smoobu rate, which equals PriceLabs `price` as of 07:07Z. It is what Smoobu sends to the channels (Booking.com Standard = Smoobu x1.15, policy `channel_pricing`). The prices actually displayed on the OTAs: NOT CHECKED in this section.
- **Status and min stay** match Smoobu on every date of all 16 listings. P06 8-11 Dec only matched after the 07:07Z refresh.
- **Pack fix:** `kpi_pack` `sync_issues` for P04 / P05 / P06 are false positives. The builder should take PriceLabs prices after the last push, or flag files older than the listing's `last_date_pushed`.

**H2. t-pl-push-1811 (day 11): the 27 Nov 15:00Z batch was triggered by edits. There was no overnight refresh for 7 Smoobu listings. The alternative close rule (b) FAILED on 28 Nov: 7 listings pushed at 07:07Z, after the 07:00Z deadline.** (Sources: `get_user_logs` listing / group / account 27-28 Nov; live `get_listing_data` about 07:25Z; `raw/listing_data.json`; `listings.csv` 27 and 28 Nov.)

| Listing | Push 27 Nov AM (Z) | Push 27 Nov PM (Z) | Push 28 Nov (Z) | Gap | Logged edit before the PM push |
|---|---|---|---|---|---|
| P12 2699998 | 05:59:50 | 15:00:17 | **07:07:09** | 16 h 07 m | **yes**, 14:56:39 / 14:56:54 |
| P11 3064196 | 06:46:29 | 15:00:17 | **07:07:09** | 16 h 07 m | none |
| P13 3064856 / 3090701 | 06:09:50 / 06:09:49 | 15:00:17 / 15:00:18 | **07:07:09 / 07:07:12** | 16 h 07 m | none |
| P05 3166592 | 06:34:01 | 15:00:56 | **07:07:16** | 16 h 06 m | **yes**, 15:00:25-37 |
| P06 3288517 | 06:35:26 | 15:02:20 | **07:07:22** | 16 h 05 m | **yes**, 15:02:01 |
| P04 3562176 | 06:49:43 | 15:02:51 | **07:07:19** | 16 h 04 m | **yes**, 15:02:33 |
| P20 3547481 | 06:34:03 | none | 06:21:11 | 23 h 47 m | n/a |
| 3588993 Scott Ellis | 06:34:17 | none | 06:21:16 | 23 h 47 m | n/a |

- **Edit-triggered?** Partly. P12, P05, P06 and P04 each pushed 18-34 s after Reyhan's last edit on them (P12 3 m 23 s after). **P11 and both P13 twins pushed at 15:00:17-18Z with no log entry**, in the same second as P12. So they were swept in with P12, or the cause was a Sync Now (not logged). The trigger for those three is NOT KNOWN.
- **No overnight refresh for the 7:** the snapshot (`raw/listing_data.json`, pulled before 07:07Z) still showed `last_push` 27 Nov 15:00-15:02Z for all 7. They then pushed at 07:07:09-07:07:22Z, during the Dispatcher pull. Whether the pull triggered this push is NOT KNOWN (the Dispatcher reports `get_*` calls only).
- **Rule (b) on 28 Nov:** "<24 h after the last push" held (16 h 04-07 m), but **"by 07:00Z" failed on 7 Smoobu listings, by 7-8 minutes.** Without the 07:07Z push they would have gone stale at 15:00-15:03Z today. **Rule (b) has not passed: day 1 of 3 failed. The 27-29 Nov window cannot now close the task.**
- **Other listings, on time:** P02 00:22:58, P03 (Channex) 02:35:42, P07 02:43:04, P01 03:02:57, P10 03:32:46, P08 04:27:07, P09 04:37:16, P14 04:57:44, P20 06:21:11, 3588993 06:21:16Z.
- **Vrbo copies (daytime only):** P12 `_386e…` 15:03:07Z, P11 `_7fd3…` 15:04:39Z, P13 `_3d48…` 15:06:55Z (27 Nov). None has pushed since. They cross 24 h at **15:03Z, 15:04Z and 15:06Z today**.
- **Are the P12 cancellation and the P06 booking registered? Yes, both.**
  - **P12 7-14 Dec cancellation** (08:31:48Z): the P12 Vrbo copy, refreshed **15:00:19Z** on 27 Nov, already shows 7-13 Dec open and 14 Dec unavailable. So PriceLabs knew by 15:00Z at the latest (lag **≤ 6 h 28 m**). The parent 2699998 at 07:07:08Z shows 7-13 Dec open and 14 Dec "Blocked".
  - **P06 8-12 Dec booking** (21:21:20Z): **Booked** with `booked_date` 2026-11-27 at the 07:07:21Z refresh, **9 h 46 m** later. The 15:02Z file still showed it open. There was no double-sale risk, because Smoobu closes the dates itself. But PriceLabs repriced the neighbouring nights only this morning: 6 / 7 / 12 Dec went **326 / 296 / 317 -> 271 / 262 / 283** (-£123). Those nights are now unsellable at min 3 (H5).
- **What to check:** whether the support ticket was sent: NOT CHECKED. Add the 28 Nov times to it (7 listings with no overnight push, 07:07Z push, Vrbo copies daytime only). Also check PriceLabs > Listings > Last Sync for the 7 IDs at about 01:00Z and 06:30Z on 29 Nov.

**H3. a-reyhan-2011 not reverted, and new Reyhan edits on 27 Nov at 14:56-15:02Z deepen PriceLabs discounts. That runs against Corentin's direction ("cut PriceLabs discounts") and against open plan items. Confirm or revert each.** (Sources: `get_user_logs` listing; live overrides; Smoobu 07:19:13Z vs 27 Nov 07:19:07Z, same nights. Day-on-day moves include engine drift.)

| Edit | Conflicts with | Pushed today (27 Nov) | Uncustomized |
|---|---|---|---|
| **P05 29 Nov-2 Dec -8% -> -10%**, min 3 (15:00:25Z) | a-reyhan-2011 (a) revert; a-p05-dec (about +2%) | **442 / 429 / 432 / 442 = £1,745** (£1,864, **-£119**) | £1,583 (live 07:07Z) |
| **P05 4-31 Jan -8% -> -10%**, min 3 (15:00:31Z) | a-reyhan-2011 (d); a-discount-cut | 25 open n **£8,588** (£8,837, **-£249**) | n/a |
| **P05 1-28 Feb -5% -> -8%**, min 4 (15:00:37Z) | t-p05-valentine-2211 (about +5% on 13-16 Feb) | 28 n **£11,332** (£11,697, **-£365**); 13-16 Feb **421 / 400 / 396 / 402 = £1,619** (£1,665) | n/a |
| **P04 6-26 Dec 0% -> -5%**, min 3 (15:02:33Z) | a-p04-dec-1611 (13-19 Dec +15%); t-p04-xmas-1711 (20-26 Dec +10-15%); a-discount-cut | 18 open n **£2,676** (£2,805, **-£129**) | £3,093 |
| **P06 3-13 Dec -2%**, min 3 (15:02:01Z) | a-discount-cut (P06 is an intentional-block listing: numbers only) | 8-11 Dec sold at the post-edit push (H5) | n/a |
| **P12 30 Nov-6 Dec and 7-10 Dec -2%**, min 2 (14:56Z; also on the Vrbo copy) | a-p12-trim proposed -5% as "your call"; Reyhan applied -2% | 30 Nov-3 Dec **252 / 261 / 275 / 275 = £1,063** (£1,118, -£55); 7-10 Dec 262 / 266 / 264 / 265 | 30 Nov-3 Dec £773 |

- **Still in place from earlier:**
  - P13 1 Dec **+25%, min 1** (18 Nov 12:14:53Z; policy says +50%): **233 / 225** (yesterday 235 / 213).
  - P11 23-25 Dec min 2, no price: **277 / 255 / 262 = £794** (£796).
- Whether Corentin approved the 27 Nov edits: NOT CHECKED (no source). Record the outcomes in `policy.json`.
- **Check:** PriceLabs 3166592, 3562176, 3288517, 2699998 (+ Vrbo `_386e…`) > Calendar > Date Specific Overrides on the dates above.

**H4. P12 Mile End, 7-13 Dec reopened before the 13 Dec handback: 262 / 266 / 264 / 265 / 279 / 284 / 265 = £1,885.** Min stay is 2 on 7-10 Dec and 3 on 11-13 Dec. The lost stay was £1,432.42 room for the same 7 nights (£204.63 a night). (Sources: Smoobu 07:19:13Z; `raw/prices_2699998.json` 07:07:08Z; live P12 overrides.)
- PriceLabs and Smoobu agree on every date. The uncustomized total is £1,622, so the pushed total is 16% above the engine default.
- **Orphan risk at handback** (14 Dec is blocked from 14 Dec 2026, so 13 Dec is the last night):
  - **12 and 13 Dec arrivals can never sell.** Min 3 on 11-13 Dec comes from a DSO (10 Nov 16:28:36Z), and a stay arriving on either date would run into 14 Dec.
  - An 11 Dec arrival sells only as exactly 11-13 Dec.
  - Any stay ending on 12 or 13 Dec (for example 7-12 Dec) leaves 1-2 nights that cannot sell: **284 / 265**.
- **30 Nov-3 Dec: £1,063, min 2, still open** (a 4-night gap between stays).
- Open P12 nights before handback: **11** (30 Nov-3 Dec, 7-13 Dec).
- **Check:** P12 2699998 > DSO 11-13 Dec min 3. Whether a 12-13 Dec min 2 / 13 Dec min 1 stub rule fits the handback plan is Corentin's call. No price proposal here.

**H5. P06 Marylebone after the 8-12 Dec sale: 6-7 Dec and 12 Dec are unsellable orphans at min 3. Intentional-block listing (block from 13 Dec), numbers only.** (Sources: Smoobu; live P06 prices 07:07:21Z; live P06 overrides.)
- **The sale:** room **£948.60** vs the rates pushed when it was booked (15:02:20Z push: **298 / 310 / 306 / 326 = £1,240**). Ratio **0.765**, the same tier as P04 10-12 Dec on 27 Nov.
  - Against the 27 Nov morning rates (304 / 317 / 312 / 333 = £1,266) the ratio is 0.749.
  - Reyhan's -2% at 15:02Z lowered those 4 nights by £26 about six hours before the booking. That cost about **£20 room** (estimate: £26 x 0.765).
- **6-7 Dec: 271 / 262 = £533, min 3.** A 2-night gap between the 3-6 Dec and 8-12 Dec stays. PriceLabs marks both nights `unbookable` = 1.
- **12 Dec: £283, min 3.** A 1-night gap before the 13 Dec block. `unbookable` = 1.
- **2 Dec: £328, min 1** (+25% DSO, 23 Nov 00:11:07Z), up from £294.
- The min 3 on all of these comes from Reyhan's 3-13 Dec DSO (27 Nov 15:02Z). Whether to open 6 Dec at min 2 and 12 Dec at min 1 is Corentin's call (P06 is an intentional-block listing).
- `kpi_pack` `gaps` flags both (6 Dec, 2 n, min 3; 12 Dec, 1 n, min 3).

**H6. a-discount-cut: nothing cut. PriceLabs discounts were added instead (H3).** Gap = uncustomized minus pushed price, on Smoobu-open nights, 29 Nov-20 Dec. 28 Nov has no uncustomized value today, so this window is not like for like with yesterday's.

| Listing | 29 Nov-4 Dec (net) | 29 Nov-20 Dec (net) | Positive-only |
|---|---|---|---|
| P05 (live 07:07Z) | 4 n -£162 | **8 n £173** | £335 |
| P04 (live 07:07Z) | 1 n -£240 (2 Dec +200%) | 13 n £67 | £307 |
| P11 | 5 n -£111 | 11 n -£214 | £0 |
| P20 | 0 n | 5 n £128 (14-18 Dec) | £128 |
| **Four targets** | **-£513** | **£154** (yesterday £165) | **£770** (yesterday £735) |

- P04 positive-only rose (+£126 vs yesterday's £181) mainly because of the new -5% on 6-26 Dec.
- **The P05 levers are unchanged** (live `get_customizations`): last-minute 1% linear gradual within 15 days; occupancy profile Aggressive (0-15 days -30% at 10% occupancy up to 0% at 100%); Booking Recency default (5-15%); far-out +30% after 150 days. P04, P11 and P20 customizations were not re-read today.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment and Booking Recency Factor, and the new DSOs in H3.

**H7. Plan items (PriceLabs side)** (Smoobu 07:19:13Z vs 27 Nov 07:19:07Z; uncustomized from `raw/prices_*.json`, or from the live reads for P04 / P05)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **Day 11; rule (b) failed on 28 Nov** (H2) | 7 listings 07:07Z, no overnight push; 15:00Z batch: 4 of 7 edit-triggered |
| a-reyhan-2011 | **Not reverted; P05 deepened -8% -> -10%** (H3) | P05 29 Nov-2 Dec **£1,745** (£1,864); P13 1 Dec 233 / 225; P11 23-25 Dec £794 |
| t-p11-block2029-2311 | **Block still there** (C1) | 3-4 Jan **148 / 163 = £311**, min 3 |
| t-seg-blocks-2411 | Blocks unchanged (H8) | 26-29 Dec **£2,227** (£2,326) |
| t-p04-xmas-1711 | **Moved the other way: -5% DSO added** (H3) | 20-26 Dec **146 / 145 / 144 / 149 / 150 / 149 / 149 = £1,032** (£1,089); uncustomized £1,214 |
| a-p04-dec-1611 | **-5% back on 6-26 Dec** (H3) | 6-9 Dec **160 / 160 / 162 / 159 = £641** (£687; uncustomized £785), min 3, 4-night pocket; 13-19 Dec **£1,003** (£1,029); 13 Dec £166 |
| a-p12-trim | **-2% applied (Reyhan), not the proposed -5%** | 30 Nov-3 Dec **£1,063** (£1,118); target about £995-1,062; min 2 |
| a-p05-dec | Open; +300% min 1 unchanged (9 Nov 14:08Z) | 21 Dec **£2,178** (uncustomized £689 live); 29 Dec **£2,172** (£819); 7-8 Dec 395 / 372 = **£767** (£824); 13-14 Dec 404 / 486 = **£890** (£939) |
| t-p05-valentine-2211 | **Moved the other way: 1-28 Feb -5% -> -8%** | 13-16 Feb **£1,619** (£1,665), min 4 |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (no log) | 8 Dec **£297** (£298; uncustomized £247) |
| t-p13-twins | No DSO change; the gap narrowed by itself | 119 of 154 jointly open nights identical. 13-21 Dec **3064856 £1,941 vs 3090701 £1,804 (+£137**, was +£208). 3-23 Jan **£3,351 vs £3,535 (-£184**, was -£237). Widest night before Feb: 20 Dec **220 / 203 (8.4%**, was 12.4%). Cause NOT KNOWN |
| P20 26 Dec +100% | Unchanged | **£565** (£563; uncustomized £383, +47.5%), min 1 |
| t-p20-minstay-2711 | Policy still ends 30 Nov: **UNKNOWN** (`policy.json`) | Smoobu min stay on open nights: Dec 3 (26 Dec 1); Jan 3; Feb 4; Mar 4-5; Apr 5-6; May 5-6. 14-18 Dec **290 / 304 / 300 / 333 / 318 = £1,545**, min 3 |

**H8. Scott Ellis Gardens 3588993 (t-seg-blocks-2411): blocks unchanged, still unmapped.** (Sources: Smoobu; `raw/prices_3588993.json` 06:21:15Z.)
- **Blocks:** 20 Nov-10 Dec and 1-night blocks on 3, 8 and 15 Dec and 5, 6 and 12 Jan, all modified 23 Nov 10:58-10:59.
- **26-29 Dec: 517 / 501 / 593 / 616 = £2,227.** Min stays 4 / 7 / 5 / 4, so only a 4-night stay arriving 26 Dec sells it.
- **4-5 Jan: 264 / 255.** Min 2 / 3, so it sells only as a 2-night stay arriving 4 Jan.
- Open nights in the next 180: **155**. 0 at the £170 minimum, 0 at the £4,000 maximum.
- **Question for Corentin (unchanged):** are the blocks intended, and is this flat P21 for `id_map.json`, `policy.json` and the pack?

### MEDIUM

**M1. Sync after the 07:07Z push: 0 differences over £2 on all 16 Smoobu listings** (H1). Min stay and availability match on every date. There is no residual cause to list (sync off, manual Smoobu override, DSO or push failure).

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:19:13Z, `an28.py`). Policy: 2-3 nights to 27 Jan; 5 from 28 Jan; 7 from 28 Mar.
- **Unsellable orphans:**
  - **P11 3-4 Jan** (£148 / £163, min 3; C1).
  - **P06 6-7 Dec** (£271 / £262) and **12 Dec** (£283), at min 3 (H5).
  - **P12 12-13 Dec as arrivals** (H4).
  - P09 25 Apr £455, min 5 (handback, ignored).
- **Gaps where only one stay shape sells:**
  - P04 6-9 Dec (£641).
  - 3588993 26-29 Dec and 4-5 Jan.
  - P12 11-13 Dec.
- **Sellable short gaps a gap-fill rule would cover:**
  - P13 1 Dec (233 / 225, min 1).
  - P11 8 Dec £297 (min 1) and 23-25 Dec 277 / 255 / 262 (min 2).
  - P05 7-8 Dec (395 / 372) and 13-14 Dec (404 / 486) at min 2; 21 Dec £2,178 and 29 Dec £2,172 at min 1.
  - P20 26 Dec £565 (min 1).
  - P06 2 Dec £328 (min 1).
  - P04 2 Dec £420 (deprioritised).
- **Below policy (under 2 within 2 months):** only the DSO min-1 nights above.
- **Above 3 within 2 months:**
  - 3588993: 20 Dec (4), 26 Dec (4), 27 Dec (7), 28 Dec (5), 29 Dec (4), and 10 Jan and the January weekends (4).
  - P14 weekends (4; special setup).
- **2-4 months out, below 5:** P13 46 / 59 per twin; P05 29 / 47; P20 48 / 59; P04 32 / 59; 3588993 46 / 59; P14 33 / 59 (special).
- **4+ months out, below 7:** P13, P20 and 3588993 60 / 60. P05 (0 / 60) and P04 (0 / 60) comply. P14 36 / 60 (special).
- `kpi_pack` `gaps` has only P06. It misses P11 3-4 Jan, P12 12-13 Dec and P04 6-9 Dec.
- Gap-fill / Orphan Day settings: **UNKNOWN** (`get_customizations` returns no orphan field).

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 79 of 180 (43.9%) at the £450 minimum**, 28 Nov-21 Mar (yesterday 78 / 180). `kpi_pack` `bounds` for the next 30: 90% at min, average open price £450.00. The floor is setting the price. Special setup: numbers only.
- **P20: 1 of 150 at the £200 minimum** (10 Jan). `kpi_pack` next 30: 3.2%.
- **Every other listing: 0 at min and 0 at max.** Open nights: P04 162, P13 154 per twin, 3588993 155, P20 150, P05 141, P11 16, P12 11, P06 4, P09 1.

**M4. Listing hygiene and the info pack** (live `get_listing_data`; `data/id_map.json` and `seeker-estates/build/properties.py`, both last changed 22 Oct 06:07Z, so likely out of date)
- **21 PriceLabs listings, all push on, none hidden.** No change to base, min or max.
- **Vrbo copies push separately, in daytime only (H2).**
  - They inherit Reyhan's DSOs through `add_custom_pricing_from_parent` (P12 copy, 27 Nov 14:56Z).
  - The P12 copy holds 7-13 Dec at **260 / 265 / 265 / 265 / 275 / 280 / 305** (15:00:19Z) while Smoobu has 262 / 266 / 264 / 265 / 279 / 284 / 265. For example, 13 Dec is **£305 vs £265**.
  - **Question (unchanged): should they push at all?**
- **Unchanged:**
  - The P02 Vrbo copy `_ca1c…` has not pushed since 24 Feb 07:31:33Z (P02 fully blocked).
  - 3588993 is not in id_map, policy or the pack.
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins share coordinates 51.5088201, -0.2342476 (one flat, policy).
  - P03 is priced via Channex (pushed 02:35:42Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match, except P14 (pack 400, PriceLabs 450).
  - Every PriceLabs max is above the pack's.
  - Bases differ on P01, P04, P05, P06, P09, P11, P12, P13 and P14.
  - P05 is 5-bed in the pack and 4-bed in PriceLabs.
- **P12 handback block:** Smoobu has 14 Dec 2026-29 Jun 2029; `policy.json` has 14 Dec 2026-21 Oct 2027 (unchanged; excluded either way).

**M5. Base vs market** (`data/snapshots/2026-11-27/market.csv`, pulled 27 Nov, bedroom-matched; P13 from today's `raw/neighbourhood_P13.json`). Base vs P50 / P75:

| Listing | Base | P50 / P75 | vs P50 / vs P75 |
|---|---|---|---|
| P12 | 284 | 203 / 230 | **+39.9% / +23.5%** |
| P20 | 330 | 253 / 317 | +30.4% / +4.1% |
| 3588993 (3 BR) | 450 | 384 / 473 | +17.2% / -4.9% |
| P13 | 250 | 215 / 268 | +16.3% / -6.7% |
| P04 | 200 | 174 / 210 | +14.9% / -4.8% |
| P11 | 286 | 292 / 328 | -2.1% / -12.8% |
| P01 | 253 | 261 / 333 | -3.1% / -24.0% |
| P05 (4 BR) | 550 | 583 / 704 | -5.7% / -21.9% |
| P06 | 357 | 412 / 529 | -13.3% / -32.5% |

- UNKNOWN (no row in `market.csv`): P02, P03, P07, P08, P09, P10, P14. `kpi_pack` `market_percentiles` are empty for every ref.

Data gaps:
1. What triggered the 27 Nov 15:00:17Z push of P11 and the P13 twins (no log entry), and the 28 Nov 07:07Z push of all 7 (no log entry; during the Dispatcher pull): NOT KNOWN. Whether Sync Now is logged at all: NOT KNOWN.
2. Refreshes between 15:00Z and 07:07Z: none, on the snapshot evidence (`listing_data.json` taken before 07:07Z still showed 15:00-15:02Z). Only the latest time is kept, so a refresh between 07:0x and 07:07Z cannot be ruled out.
3. Support ticket for t-pl-push-1811 sent or not: NOT CHECKED.
4. Corentin's approval of Reyhan's 27 Nov DSOs: NOT CHECKED (no source).
5. OTA displayed prices (Airbnb, Booking.com, Vrbo): NOT CHECKED in this section. Whether Vrbo listings receive prices from the PriceLabs Vrbo copies or from Smoobu: NOT KNOWN.
6. P05 / P04 uncustomized prices come from the live 07:07Z reads. P11 / P20 come from the snapshot files. P04, P11 and P20 customizations were not re-read. Overrides on P11, P13 3090701, P20 and 3588993 were not re-read; "unchanged" rests on the logs (0 entries on them since 25 Nov).
7. Causes of the engine moves on P06 6 / 7 / 12 Dec (-£123 at the 07:07Z refresh, beyond the -2% DSO) and the narrowing of the P13 twin gap: NOT KNOWN.
8. Orphan Day / gap-fill settings: UNKNOWN on every listing.
9. `market.csv` for 28 Nov is not in the snapshot; the 27 Nov rows were used.
10. P20 min-stay policy from 1 Dec: UNKNOWN (`policy.json` `listing_facts.P20` ends 30 Nov).
11. Protocol: two read-only PriceLabs log calls (group, account) were sent in one message (see Sources).

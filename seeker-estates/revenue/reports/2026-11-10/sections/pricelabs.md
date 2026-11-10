## PriceLabs audit (D = 2026-11-10)

**Sources**
- Snapshot `data/snapshots/2026-11-10/`: `raw/listing_data.json`, `raw/prices_*.json` (window **11 Nov 2026 - 9 Jan 2027**; 10 Nov is Smoobu only), `listings.csv`, `prices.csv`, `reservations.csv`. Yesterday: `data/snapshots/2026-11-09/` and `reports/2026-11-09/`.
- Live PriceLabs reads, one call at a time, 10 Nov ~07:27-07:35Z:
  - `get_user_logs` for listing, group and account, 9-10 Nov.
  - `get_listing_data`.
  - `get_listing_date_overrides` for P05 3166592, P20 3547481, P12 2699998, P13 3064856 and P11 3064196.
  - `get_customizations` for P04 3562176.
- Live Smoobu GET `/api/rates`, 15 apartments, 10 Nov 2026 - 7 May 2027, taken **07:26:11Z**. P09 and P08 were re-read at **07:29:48Z**, after P09's 07:27:40Z push.
  - Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10pl/smoobu_rates_a.json` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10pl/smoobu_rates_b.json`. Neither file holds guest data.
- Booking creation and cancellation times come from the Dispatcher's guest-free `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10/smoobu_mod10_pe.json`. Smoobu local time = UTC in November.
- Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live10pl/` (`sync.py`, `show.py`, `an.py`, `an2.py`, `gaps.py`).
- `kpi_pack.json` coverage:
  - `sync_issues` = [] on all 20 refs.
  - `bounds` and `avg_open_price_next30` are present for P04, P05, P06, P11, P12, P13, P14 and P20 only.
  - `market_percentiles` is null for every ref.
  - `gaps` lists only P20 20 Nov.
- Policy respected: blocks on P02/P03/P06/P07, the P14 special setup (numbers only), P13 as one flat, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), the 15% / 20% stay discounts, and the deprioritised P04 2 Dec / P12 17 Nov items.

### 9 Nov settings changes: who and when (`get_user_logs`, listing log)
**All 49 listing log entries since 9 Nov 06:00Z are by reyhan@seekerestates.com, made in two sessions: 14:06:06-14:10:56Z and 21:20:20-22:30:10Z. The group and account logs have 0 entries.** There is nothing after 22:30:10Z.

| Time (Z) 9 Nov | Listing | Change | Policy |
|---|---|---|---|
| **14:08:54** | P05 3166592 | **Max 2500 -> 3500** | Not covered by policy. It matters on one night only: 29 Dec, now £2,855. The old cap would have held it at £2,500 (C2). |
| **21:24:24** | P14 3267077 | **Min 500 -> 450** | **Conflicts with `special_setups.P14`**: "Primrose Hill pricing (incl. the £500 minimum) is a deliberate special setup". For Corentin to confirm. |
| **21:26:45** | P04 3562176 | **Base 220 -> 200** (source "reviewPrices") | No P04 base decision is recorded in policy. The pack and `id_map` say 220, and PriceLabs `recommended_base` is 221. A base decision, for Corentin to confirm. |

- **Effect of the three changes.** All three are in effect on the pushed prices: raw 10 Nov = Smoobu 07:26Z.
  - **P14:** all 30 open nights 11 Nov-10 Dec move from £500 to £450, **-£1,388**. Over the open nights to 9 Jan: **-£1,981**.
  - **P04:** the 16 open nights to 10 Dec go from £3,091 to £2,838 (**-£253**); to 8 Jan, 32 nights, **-£467**. Examples:
    - 11-13 Nov £150 / £151 / £154 -> £139 / £140 / £144.
    - 18-24 Nov average £165 -> £147.
    - 2 Dec £498 -> £458 (`user_price` 495; deprioritised item).
  - **P05:** only 29 Dec is affected (C2).
- The pushes followed the saves: P14 pushed at 21:24:48Z, P04 at 21:27:48Z, and P05 at 21:24:07Z (after Reyhan's 21:23:47 save).

### Every other change since 9 Nov 06:00Z (all date-specific overrides by reyhan@; "x2" = the change also went to the Smoobu twin / Vrbo copy "from parent")

| Listing | Session 1 (14:06-14:10Z) | Session 2 (21:20-22:30Z): what stands now (live overrides) |
|---|---|---|
| **P05** 3166592 | 13-14 Dec **+5% min 2**; **21 Dec +300% min 1**; **29 Dec +300% min 1**; 4-31 Jan -10% min 3; Feb -8% min 4 | **29 Nov-2 Dec -5% min 3** |
| **P13** 3064856 x2 (3090701 + Vrbo `_3d48…`) | 9-12 Nov price removed, min 2; **10 Dec +40% min 1** | **9-12 Nov -5% min 2**; **10-26 Dec -2% min 3**, which overwrote 10 Dec +40% and the earlier -5% on 10-20 Dec / 21-26 Dec |
| **P11** 3064196 x2 | 10-13 Nov price removed, min 2; 23-25 Dec +5% min 2 | 18-19 Nov price removed (was -5%), min 2. **22 Nov-18 Dec set to -8% at 21:21:32, then -3% min 3 at 21:21:47**, replacing the 8 Nov -5% min 2. The darts nights 13-17 Dec are included. |
| **P04** 3562176 | 9-24 Nov -7%, 6-22 Dec -7% | **9-24 Nov -4% min 3; 6-22 Dec -3% min 3**; 2-31 Jan -8% min 3; Feb -8% min 4 (plus the base cut) |
| **P20** 3547481 | none | **13-15 Nov price removed, min 2 -> 3** (16-17 Nov stays -5% min 2); **20-21 Nov price removed, min 3** (22-24 Nov stays -5% min 2); **1-20 Dec -5% -> 0%, min 3**; Jan -5% min 3; Feb -5% min 4 |
| **P12** 2699998 x2 (Vrbo `_386e…`) | none | **12-20 Nov -2% min 2; 30 Nov-10 Dec -2% min 2**, then **7-14 Dec -5% min 3 (22:30:10Z)** |
| P06 3288517 | none | 9-17 Nov -8% min 2 |

- **Smoobu-side change, not in PriceLabs logs:** a **P11 "Blocked channel" block on 10-14 Nov, created 9 Nov 18:37** (`smoobu_mod10_pe.json`).
  - 10-13 Nov had been open yesterday at £170 / £179 / £186 / £234.
  - PriceLabs now shows 11-13 Nov as "Blocked".
  - Who placed it, and why, is UNKNOWN. Question for the occupancy section.

---

### CRITICAL

**C1. Reyhan's 9 Nov edits change several policy settings again. These are reported for Corentin to confirm, not proposed** (log above; `policy.json`; raw 10 Nov; live overrides)
- **P14 min 500 -> 450** conflicts with `special_setups.P14`. 59 of 179 Smoobu-open nights are now at **£450**; `kpi_pack` `bounds` puts 55% of 60 open nights at min. Numbers only, per policy.
- **P04 base 220 -> 200.** This is an unrecorded base decision.
  - 9-24 Nov is now -4%, against policy -8% (24 Oct). Yesterday it was -5%. The base cut lowers every night anyway (-£253 over the next 30).
  - Min 3 matches policy.
- **P11 darts 13-17 Dec is now -3% min 3** (yesterday -5% min 2). Policy (24 Oct): darts +5%, "leave as it is", average above £300.
  - Now **£221 / £195 / £200 / £209 / £233 = £1,058, average £211.60**, all open. Yesterday £1,039.
- **P20:**
  - **13-15 Nov -5% removed.** Policy has -5% for 31 Oct-19 Nov. Prices are now £294 / £306 / £249, up from £265 / £233 / £232. Min 3 now matches policy.
  - **16-17 Nov still -5% min 2.** Policy: min 3 to 30 Nov.
  - 1-20 Dec -5% -> 0% (not in policy).
  - Base is still **330 vs policy 350**.
- **P13 9-12 Nov -5% was re-set at 21:22:26.** Policy (24 Oct): 8-12 Nov 0%. 10-26 Dec is now -2% min 3 (not in policy).
- **P05 21 Dec and 29 Dec +300% min 1** (C2) and **max 3500**: not covered by policy.
- `policy.json` has no entry after 24 Oct. Nothing from 7, 8 or 9 Nov is recorded.

**C2. P05 21 Dec £2,207 and 29 Dec £2,855: both are Reyhan's +300% DSOs (9 Nov 14:08:13Z / 14:08:30Z, min 1), not an orphan rule. The max raise is what lets 29 Dec go above £2,500** (live overrides; raw 10 Nov)

| Night | Price | user_price | Uncustomized | Neighbouring nights | Yesterday |
|---|---|---|---|---|---|
| 21 Dec (1-night gap, 20 Dec booked / 22 Dec check-in) | **£2,207** | £2,177 | £732 | £690 / £669 | £645, min 2 |
| 29 Dec (1-night gap, 28 Dec booked / 30 Dec check-in) | **£2,855** | £2,825 | £1,176 | £829 / £869 | £1,332, +100% min 1 |

- **What sets the price:**
  - It is the +300% DSO. It is not a PriceLabs orphan premium; no orphan-gap customization was read here, and none is visible in the overrides.
  - 21 Dec (£2,207) sits under both the old cap (£2,500) and the new one (£3,500), so the max change does not affect it.
  - 29 Dec (£2,855) would have been capped at **£2,500** under the old max.
  - The ratio to uncustomized is 3.02x on 21 Dec and 2.43x on 29 Dec, not 4.0x. How PriceLabs combines the DSO % with its other layers is UNKNOWN.
- **Does it block the sale?** The min stay no longer blocks either night (min 1). The price does: about **3.2x the neighbouring nights**.
  - The same +300% min 1 set-up was on P05 9 Nov at £1,403. That night went unsold: there is no 9 Nov row in `reservations.csv`, so a-p05-9nov closes unsold.
- Check: PriceLabs > 3166592 > DSO 21 Dec and 29 Dec.

### HIGH

**H1. Sync, next 30 (10 Nov-10 Dec): 0 price mismatches over £2 and 0 min-stay mismatches on all 15 Smoobu listings. One status mismatch: P20 21-24 Nov** (raw 10 Nov vs Smoobu 07:26:11Z; `sync.py`; `prices.csv` 960 rows, 0 mismatches; `kpi_pack` `sync_issues` empty)
- **P20 21-25 Nov Airbnb (Smoobu 162781746) is NOT registered in PriceLabs.**
  - Created **9 Nov 22:34**, modified 22:39:29. P20's last refresh/push was **21:26:36Z**, before that.
  - PriceLabs still shows 21-24 Nov open at £266 / £219 / £250 / £247 = **£982**, while Smoobu has them closed.
  - There is no double-booking risk, because the Smoobu calendar is closed.
  - Possible causes: not refreshed since the booking (most likely on timing), push failure, sync off, or a DSO on those dates. Not proven.
  - Check: 3547481 21-24 Nov "Booked" after the next refresh (~21:26Z tonight), or Sync Now.
- **Price on sale at booking: room £638.54 = 0.650 x £982.** That is 12 days out, a 4-night stay, so no stay discount applies.
  - 0.650 = 0.85 x 0.765, where 0.85 is Airbnb's last-minute 15% for 0-14 days (policy P20 `airbnb_discounts_22oct`).
  - The remaining **0.765 layer is unexplained here** (channel section).
  - Before the 21:26Z refresh, the live prices for 21-24 Nov were £246 / £235 / £244 / £333 (raw 9 Nov). The refresh moved 24 Nov from £333 to £247; the -5% on 22-24 Nov dates from 8 Nov.
- **Registered since yesterday:**
  - **P05 15-21 Dec** now shows "Booked" (`booked_date` 2026-11-08). Done.
  - **P12 11-12 Dec reopened.** The Booking.com cancellation was modified 9 Nov 23:30:03. PriceLabs (refreshed 22:30:29Z) and Smoobu both show 11-13 Dec open at **£309 / £321 / £283, min 3**.
  - **P13 11-15 Dec reopened.** The cancellation came at 20:36:35; 3064856 refreshed at 21:23:03Z. Both twins are open: 3064856 £233 / £234 / £208 / £205; 3090701 £247 / £248 / £220 / £217; min 3.
- **P13 11-15 Dec booking (Smoobu 162759785, apartment 3064856, Booking.com, created 9 Nov 08:58, cancelled 20:36):** room **£710.77 = 0.839 x PriceLabs £847** (£224 / £225 / £200 / £198, pushed 8 Nov 12:40:37Z; raw 9 Nov). With the +15% Booking markup the list price is £974, so paid = 0.730 x list.

**H2. Push freshness at ~07:28Z: nothing is over 24 h on a Smoobu or Channex listing. Twelve listings pushed only through Reyhan's evening saves. P08 is due 08:48Z. P02's Vrbo copy is 259 days stale** (live `get_listing_data`; `listings.csv`)
- **Evening group.** Each push followed a save on that listing within 1-2 min, or within 16 min on the Vrbo copies:

| Listing | Pushed 9 Nov (Z) | Due by (Z) |
|---|---|---|
| P11 3064196 | 21:22:04 | 21:22 tonight |
| P13 x2 | 21:23:04 | 21:23 tonight |
| P05 | 21:24:07 | 21:24 tonight |
| P14 | 21:24:48 | 21:24 tonight |
| P06 | 21:25:08 | 21:25 tonight |
| P20 | 21:26:36 | 21:26 tonight |
| P11 Vrbo | 21:27:03 | 21:27 tonight |
| P04 | 21:27:48 | 21:27 tonight |
| P13 Vrbo | 21:36:45 | 21:36 tonight |
| P12 | 22:30:30 | 22:30 tonight |
| P12 Vrbo | 22:32:49 | 22:32 tonight |

- **Morning cycle:**
  - **P09 3318172 pushed 10 Nov 07:27:40Z** (on time; last was 9 Nov 07:50:03Z).
  - **P08 3318167: last push 9 Nov 08:48:53Z, so it goes stale at 08:48Z today.** P08 is fully booked to its 13 Nov handback, so the risk is low.
- **Overnight:** P02 00:24:25Z, P03 (Channex) 03:30:29Z, P07 04:08:18Z, P01 04:47:10Z and P10 05:13:32Z, all 10 Nov.
- **Stale with push on:** P02 Vrbo `_units_0004_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null (M3).
- **t-pl-push-fresh: met for the last 24 h** on every Smoobu/Channex listing. As on 7-8 Nov, though, most listings were refreshed only because someone saved. P20 shows the cost: its booking at 22:34Z is still unregistered (H1).
- Check: P08 `last_date_pushed` after 08:48Z. If nobody saves tonight, check the evening group at ~21:30Z.

**H3. Orphans and min stay: three unsellable 1-night gaps (one new). Two 1-night gaps are open at min 1 but priced at about 3x (C2)** (Smoobu 07:26-07:29Z; live overrides; `gaps.py`)

| Ref | Night | Price | Min | What pins it | Status vs plan |
|---|---|---|---|---|---|
| **P20** | **20 Nov (NEW)**, between the 18-19 Nov block and the 21-25 Nov booking | **£259** | 3 | Reyhan's DSO 20-21 Nov min 3 (9 Nov 21:25:39Z) | New. Only orphan in `kpi_pack` `gaps`. **Policy says 20-22 Nov = delivery block (intentional); Smoobu now has 18-19 Nov blocked, 20 Nov open, and 21-22 Nov sold** (t-p20-delivery). Question for Corentin: has the delivery moved to 18-19 Nov? Should 20 Nov be min 1 or closed? |
| **P20** | **5 Dec** (25 Nov-5 Dec / 6-14 Dec booked) | **£309** (was £281; uncust £386) | 3 | DSO 1-20 Dec **re-saved 9 Nov 21:25:55 at 0%, min 3 kept**; `unbookable` = 1 | **t-p20-5dec-orphan: not fixed**; price +£28 |
| **P09** | **12 Nov** (11 Nov block / 13-15 Nov booked) | **£120** (07:29Z; £123 at 07:26Z) | 2 | DSO 9-12 Nov min 2 (5 Nov) + Smoobu block 11 Nov; `unbookable` = 1 | **t-p09-1112block: not fixed. The night is the day after tomorrow.** Check: 3318172 > DSO 12 Nov min 1, or remove the 11 Nov block |
| P05 | 21 Dec | **£2,207** | 1 | +300% DSO (C2) | **t-p05-dec-orphans: min-stay part done; price went from £645 to £2,207** (the plan said keep £645) |
| P05 | 29 Dec | **£2,855** | 1 | +300% DSO (C2) | a-peak-check P05 part: **moved the other way** (plan: +100% -> 0%) |

- **Fixed or no longer orphans:**
  - **P05 13-14 Dec: min 3 -> 2** (+5%, 9 Nov 14:07:58Z). Now **£520 / £501 = £1,021** (was £579 / £565), sellable as a 2-night. **t-p05-dec-orphans: this part is done.**
  - **P12 13 Dec** is no longer an orphan: 11-12 Dec reopened, so 7-13 Dec is a 7-night open run (£279 / £277 / £289 / £279 / £309 / £321 / £283 = £2,037).
    - Reyhan's 22:30:10Z DSO set **min 3 on 7-14 Dec**.
    - Since 14 Dec is the handback block, **arrivals on 12 and 13 Dec can no longer sell** (13 Dec was min 1 yesterday).
  - **P13 10 Dec:** Reyhan put +40% min 1 on it at 14:07 while 11-15 Dec was booked, and reset it at 21:22 (-2% min 3) after the cancellation. It now sits inside a 17-night open run.
- **Min 1 inside 2 months:**
  - P12 26 Nov (£306).
  - P13 17 Nov, 27 Nov and 1 Dec (1 Dec is intentional per policy).
  - P05 21 and 29 Dec.
  - P04 2 Dec (deprioritised).
- **Short runs a gap-fill rule would sell:**
  - P13 10-12 Nov (3 n from tonight; 3064856 £183 / £188 / £192, 3090701 £173 / £178 / £182, min 2).
  - P04 10-13 Nov (£138-£144, min 3; P04 policy is never under 3).
  - P12 12-13 Nov (£201 / £250) and 17-20 Nov (£245-£280).
  - P11 18-19 Nov (£165 / £191).
  - P05 16-17 Nov (£377 / £393) and 7-8 Dec (£475 / £472).
  - P06 10-11 and 15-17 Nov. P06 is an intentional block, but these nights are open with Reyhan's -8% DSO.

**H4. a-discount-cut recomputed: next 14 £861, next 30 £1,591 (yesterday £1,136 / £1,816). The drop is not the fix: PriceLabs' own layers are unchanged, and on P04 the base cut lowered the uncustomized price itself** (raw 10 Nov `uncustomized_price - price`; nights open in PriceLabs and Smoobu; 14 = 11-24 Nov, 30 = 11 Nov-10 Dec; same exclusions as yesterday: handback nights, P14, P06, P04 2 Dec; `an.py`)

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 10 n £1,450 vs £1,796 (£346) | 15 n £2,380 vs £2,842, -16.3% (**£462**) | £651 |
| P11 | 5 n £344 | 15 n £3,374 vs £3,984, -15.3% (**£610**) | £572 |
| P05 | 2 n £170 | 8 n £3,742 vs £4,235, -11.6% (**£493**) | £409 |
| P12 | 6 n £62 | 15 n £153 | £183 |
| P20 | 6 n £68 | 7 n £1,897 vs £2,042 (**£145**) | £323 |
| P13 3064856 / 3090701 | -£49 / -£76 | -£139 / -£129 | -£171 / -£148 |
| P09 | -£4 | -£4 | -£3 |
| **Total** | **£861** | **£1,591** | **£1,816** |

- On yesterday's windows trimmed to the nights both raws cover (11-23 Nov / 11 Nov-9 Dec) the totals are **£767 / £1,477**.
- **Why it fell:**
  - P20: 13-15 Nov -5% removed, and 21-24 Nov sold.
  - P04: Reyhan's -5% -> -4%, and the **base cut moved P04's uncustomized total from £3,473 to £3,051** on the same 16 nights. So the "gap" shrank while the price fell £253.
- **P04 customizations, live, unchanged:** last-minute -5% linear over 15 d; occupancy "Aggressive" (0-15 d: -30% at 10% occupancy up to 0% at 100%); Booking Recency default (5-15%); demand Conservative; far-out +30% after 150 d.
- P05, P11 and P20 customizations were not read today.
- **Status: not done.** Check: 3562176 / 3166592 > Customizations > Last-minute, Occupancy profile, Booking Recency.

**H5. Status of the PriceLabs-side plan items, 10 Nov**

| Item | Status | Numbers (raw 10 Nov / Smoobu 07:26Z / live overrides) |
|---|---|---|
| a-p13-record | **Not done; the list changed again** (C1) | Add: P14 min 450; P04 base 200 and -4%; P11 22 Nov-18 Dec -3% min 3 (darts £1,058); P20 13-15 Nov 0%, 16-17 Nov -5% min 2, 1-20 Dec 0%; P13 9-12 Nov -5% re-set and 10-26 Dec -2% min 3; P12 7-14 Dec -5% min 3; P05 max 3500 and the +300% DSOs. Correction 4 (P20 20-24 Nov -5% -> 0%) is **partly done**: 20-21 Nov is now 0%, but 22-24 Nov is still -5% (sold 21-24 Nov). Still open: P20 base 330 vs 350; record P13 base 250. `policy.json` is unchanged. |
| a-discount-cut | **Not done** | £861 / £1,591 vs £1,136 / £1,816 (H4) |
| a-p12-trim | **Partly moved by Reyhan; targets not met** | 30 Nov-3 Dec £268 / £275 / £286 / £297 = **£1,126** (was £1,139; target about £968; -2% since 21:20). 7-10 Dec £279 / £277 / £289 / £279 = **£1,124** (was £1,192; target about £930; -5% min 3 since 22:30). 18-20 Nov £250 / £256 / £280 open at -2% (target -10%) |
| a-p05-dec | **Open** | 7-8 Dec **£475 / £472 = £947** (was £913; target about £1,141), DSO +3% min 2 unchanged. 13-14 Dec handled (H3). 21 Dec now £2,207 (C2) |
| a-peak-check | **P13 part partly moved; P05 part reversed** | P13 10-26 Dec, now 17 open nights including the reopened 11-14 Dec: 3064856 **£3,754**, 3090701 **£3,973**, at -2% min 3 (was -5%; the plan asked about +5%). On the 13 nights open yesterday: £2,874 / £3,041. **25-26 Dec min 3** (plan min 2): £223 / £227 and £236 / £240. **P05 29 Dec £2,855, +300%** (plan 0%, about £1,068) |
| t-p12-26nov-price | **Not fixed** | 26 Nov **£306**, min 1, DSO +15% (4 Nov) unchanged. Uncustomized £294 -> £271. Target about £250 |
| t-p12-13dec-orphan | **Overtaken** | No longer an orphan (11-12 Dec reopened), but Reyhan's min 3 undid the min-1 part. 13 Dec **£283** (was £364; target about £219). Arrivals 12 and 13 Dec cannot sell before the 14 Dec handback. Check: 2699998 > DSO 12-13 Dec min 2 / 1 |
| t-p20-5dec-orphan | **Not fixed** | 5 Dec £309, min 3, `unbookable` = 1 (H3) |
| t-p05-dec-orphans | **Min-stay part done; 21 Dec price not kept** | 13-14 Dec min 2, £1,021. 21 Dec min 1 but £2,207 |
| t-p09-1112block | **Not fixed** | 12 Nov £120, min 2, `unbookable` = 1 |
| t-pl-push-fresh | **Met for 24 h; fragile** (H2) | P08 due 08:48Z; P20 booking unregistered |
| t-p20-delivery | **For Corentin** | 18-19 Nov blocked; 20 Nov open orphan; 21-22 Nov sold over the policy delivery dates (H3) |

### MEDIUM

**M1. Floor and ceiling** (Smoobu available nights 10 Nov-7 May vs PriceLabs min/max; `an2.py`; `kpi_pack` `bounds` = first 60 days)
- **P14: 59 of 179 open nights (33.0%) at £450 = min.** `kpi_pack`: 55% of 60. Yesterday: 108 of 179 (60.3%) at £500. Fewer nights are at the floor because the floor is £50 lower. Special setup: numbers only.
- Every other listing: 0 nights at min and 0 at max. P05's `kpi_pack` max is 3500.

**M2. Min stay vs policy** (Smoobu = PriceLabs on every open night; `prices.csv` agrees)
- **Inside 2 months:** min 1 as listed in H3. Above 3: P20 26-31 Dec min 4-6 (Christmas DSOs from 11 Oct) and P14 Fri-Sun min 4 (special setup).
- **2+ months ahead (from 9 Jan) below 5:**
  - P11 min 3 on 9 Jan-28 Feb (51 n).
  - P13 min 3 on 9 Jan-4 Feb, then min 4 on Mon-Thu runs to 9 Mar.
  - **New on 9 Nov (Reyhan): P05 Jan min 3 / Feb min 4; P20 Jan min 3 / Feb min 4; P04 Jan min 3 / Feb min 4.**
- **4+ months ahead (from 10 Mar) below 7:** P11 min 5 (59 n), P13 and P20 min 5-6, P14 min 5.

**M3. Base vs market** (last row per ref in `data/snapshots/2026-11-09/market.csv`; there is no 10 Nov market file; `kpi_pack` `market_percentiles` is null)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row date |
|---|---|---|---|---|---|---|
| P12 | £284 | £205 | +38.5% | £233 | +21.9% | 9 Nov |
| P09 | £176 | £133 | +32.3% | £160 | +10.0% | 9 Nov |
| P20 | £330 | £252 | +31.0% | £320 | +3.1% | 9 Nov |
| **P04** | **£200** (was £220) | £176 | **+13.6%** | £219 | **-8.7%** | 9 Nov |
| P13 | £250 | £222 | +12.6% | £277 | -9.7% | 9 Nov |
| P11 | £286 | £289 | -1.0% | £328 | -12.8% | 9 Nov |
| P01 | £253 | £258 | -1.9% | £331 | -23.6% | 2 Nov |
| P05 (4 BR) | £550 | £575 | -4.3% | £720 | -23.6% | 9 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14: no usable row (UNKNOWN, `market.csv`).

**M4. Listing hygiene and info pack** (live `get_listing_data`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`)
- All 20 PriceLabs listings: `push_enabled` true, `isHidden` false. No listing has push off.
- **Vrbo copies pushing separately:**
  - P11 `_7fd3…` (21:27:03Z), P13 `_3d48…` (21:36:45Z) and P12 `_386e…` (22:32:49Z). They receive Reyhan's DSOs "from parent".
  - **P02 `_ca1c…`: push on, last push 24 Feb 2026.**
  - Question: should the Vrbo copies push at all, and should P02's be removed?
- **`_unmatched` (`id_map.json`):** the three Marylebone Vrbo ids (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are **not among PriceLabs' 20 listings**.
  - The same is true of these `pricelabs_other` ids:
    - P04 Vrbo `_20df1e73…`.
    - P13 `_d0a5f202…` and `_125c15c5…`.
    - The Channex ids on P01, P08, P09 and P10.
  - Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03 is priced via Channex, not Smoobu**, last push 10 Nov 03:30:29Z. It is fully blocked, which is intentional.
  - **P15-P19 have no PriceLabs listing.** Question: priced elsewhere, or a second account?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy.
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. `id_map` says 220 / 350 and policy says base 350. Question: which is right?
- **Pack (`build/properties.py`) vs PriceLabs.** The pack is out of date; these are differences, not errors:
  - **P04 base 220 (pack) vs 200** (new 9 Nov).
  - **P14 min 400 (pack) vs 450** (was 500).
  - **P05 max 780 (pack) vs 3500** (was 2500).
  - Other maxes are all higher in PriceLabs, e.g. P01 450 vs 650 and P08 350 vs 1000.
  - Bases differ on P01, P05, P06, P09, P11, P12 and P13 (the 18-20 Oct rises).

Data gaps:
1. The raw window starts 11 Nov. For 10 Nov, PriceLabs status, `uncustomized_price` and `unbookable` are NOT CHECKED; the figures come from Smoobu.
2. `kpi_pack.json` `market_percentiles` is null, and `bounds` / `avg_open_price_next30` are missing for P01, P02, P03, P07, P08, P09, P10 and P15-P19. Floor/ceiling and market gaps were recomputed from Smoobu, raw and the 9 Nov `market.csv`.
3. How PriceLabs turns +300% into 3.02x (21 Dec) and 2.43x (29 Dec) of `uncustomized_price` is UNKNOWN. Whether P05 has an orphan-gap customization is NOT CHECKED: `get_customizations` was read for P04 only.
4. Customizations for P05, P11 and P20 were NOT CHECKED today. Overrides were read live for P05, P20, P12, P13 3064856 and P11 only. For P04, P06, P13 3090701, P09 and the blocked listings, the "current" DSOs rest on `get_user_logs` plus the raw prices.
5. P20 21-24 Nov registration after the next refresh: NOT CHECKED. Push status after ~07:28Z (P08 due 08:48Z): NOT CHECKED.
6. Who created the P11 Smoobu "Blocked channel" 10-14 Nov (9 Nov 18:37), and why: UNKNOWN. Same for the P09 11 Nov block.
7. The P20 0.765 Airbnb layer is unexplained (channel section). "Price on sale" for P20 and P13 assumes no manual Smoobu edit between the last push and the booking; Smoobu keeps no rate history over the API.
8. Why P20's delivery block now sits on 18-19 Nov instead of policy's 20-22 Nov: UNKNOWN (Corentin).

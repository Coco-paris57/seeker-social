## PriceLabs audit (D = 2026-11-13)

**Sources**
- Snapshot `data/snapshots/2026-11-13/`: `raw/listing_data.json`, `raw/prices_*.json` (window 14 Nov 2026 - 12 Jan 2027), `prices.csv`, `listings.csv`, `market.csv` (rows pulled 13 Nov; P06 2 Nov, P09 9 Nov), `reservations.csv`. Yesterday: `data/snapshots/2026-11-12/`, `reports/2026-11-12/sections/pricelabs.md`, `reports/2026-11-12/daily-report.md` (JSON plan).
- Live PriceLabs reads, 13 Nov 07:20-07:29Z, one call at a time (the group and account `get_user_logs` calls went out together by mistake; both returned 200 with 0 entries):
  - `get_listing_prices`:
    - P12 2699998, twice: before and after its 07:22:40Z refresh.
    - P06 3288517, P20 3547481, P04 3562176 and P11 3064196.
    - P05 3166592 for 5-30 Dec; P13 3064856 and 3090701 for 10-26 Dec; P11 Vrbo `_7fd3…` for 8-14 Dec.
  - `get_user_logs` for listing, group and account, 12-13 Nov. A control read of 11-13 Nov returned the 9 known 11 Nov entries.
  - `get_listing_data`, read about 07:23Z.
  - `get_listing_date_overrides` for P11, P04, P20, P12, P05 and P13 3064856.
  - `get_customizations` (occupancy, booking recency, last-minute, far-out) for P04, P05, P11 and P20.
- Live Smoobu GETs:
  - `/api/rates` for 15 apartments, 13 Nov 2026 - 12 May 2027, taken twice: **07:21:30Z** (`smoobu_rates_a.json`) and **07:24:29Z** (`smoobu_rates_b.json`).
  - `/api/reservations` for 10 Nov 2026 - 31 Jan 2027, taken 07:22:54Z. Guest fields were dropped before saving (`smoobu_res_pe.json`).
  - All three files, and the scripts `sync.py`, `an.py` and `an2.py`, are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live13pl/`.
- `kpi_pack.json`:
  - `sync_issues` lists exactly the 13 nights in C1.
  - `market_percentiles` is null for every ref.
  - `gaps` is empty for every ref.
  - `bounds` is present for P04, P05, P06, P11, P12, P13, P14 and P20.
- Policy respected: blocks P02/P03/P06/P07; P14 special setup (numbers only); P13 is one flat; handbacks; 15% / 20% stay discounts; Booking.com +10% markup (not re-raised); Camden Visibility Booster; deprioritised P04 2 Dec and P12 17 Nov.
- **How `user_price` was read.** In `get_listing_prices`, `user_price` is the PMS price PriceLabs read at its last refresh, not its own price. This is shown by the P12 re-read: after the 07:22:40Z refresh, `user_price` for 17-19 Nov became 250 / 250 / 266, the Smoobu values. `price` is what PriceLabs pushes.

### Changes since 12 Nov 06:00Z
- **PriceLabs: none.**
  - `get_user_logs` has 0 entries for listing, group and account on 12-13 Nov. The last logged edit is Reyhan's at 11 Nov 17:16:47Z.
  - Live `get_listing_data` has the same base, min and max as 12 Nov.
  - The override `updated_at` values read today are all on or before 11 Nov 17:16:47Z.
- **Refreshes and pushes since yesterday's audit:**
  - 12 Nov: P12 07:56:10Z (pushed 07:56:11); P08 08:00:56Z; P05 / P14 08:37:39Z; P13 09:21:15Z / 09:21:18Z; P06 / P04 / P20 09:23:14-20Z.
  - 13 Nov: P11 06:34:59Z (pushed 06:35:00); P09 06:54:48Z.
  - **P12 again on 13 Nov at 07:22:40Z (pushed 07:22:41), during this audit.**
- **Smoobu, not PriceLabs:**
  - (a) Near-term prices were lowered on 13 nights (C1).
  - (b) The P06 Marylebone block 143402691 was shortened on **12 Nov 12:59:51 (Smoobu time)**. Its start moved from **22 Nov** (scratch `live10/smoobu_mod10_pe.json`) to **30 Nov**, so 22-29 Nov is now open (C2).
  - (c) Some bookings were modified with no field change: P11 155581236, P09 161131246, P13 159544716.
  - There are no new bookings or cancellations (agrees with the Dispatcher).

---

### CRITICAL

**C1. The 13 PriceLabs ≠ Smoobu nights are real and are not a copy error. They are Smoobu-side prices written after PriceLabs' last push. The P12 nights have already been overwritten by today's 07:22:41Z push; P06, P20 and P04 have not** (live `get_listing_prices`; Smoobu `/api/rates` 07:21:30Z and 07:24:29Z; `prices.csv`; `kpi_pack` `sync_issues`)

| Ref | Dates | PriceLabs `price` (live = raw) | Smoobu 07:21:30Z | `user_price` (Smoobu at PL's last refresh) | Gap |
|---|---|---|---|---|---|
| P12 2699998 | 17-19 Nov | 267 / 272 / 288 | 250 / 250 / 266 | 253 / 247 / 257 | -£61 |
| P06 3288517 | 15-17 Nov | 248 / 248 / 255 | 222 / 222 / 233 | 245 / 245 / 254 | -£74 |
| P20 3547481 | 14-17 Nov | 286 / 247 / 238 / 241 | 270 / 222 / 210 / 222 | 291 / 246 / 237 / 245 | -£88 |
| P04 3562176 | 18-20 Nov | 147 / 150 / 155 | 130 / 135 / 140 | 138 / 140 / 146 | -£47 |
| **Total** | 13 nights | | | | **-£270** |

- **Also outside `prices.csv`:**
  - **P20 13 Nov (tonight): PriceLabs £267, Smoobu £250 (-£17).**
  - **P20 15 Nov:** Smoobu min **2**, PriceLabs min **3** (DSO 13-15 Nov -5% min 3, 11 Nov 17:15:52Z).
  - **P12 13 Nov:** Smoobu had min **1**, PriceLabs min **2**.
- **Which cause it is:**
  - **Raw copy error: ruled out.** Live `get_listing_prices` equals the raw file on all 13 nights.
  - **Refresh not pushed: ruled out.** Each listing's last refresh was pushed within 0-15 s: P12 07:56:10→07:56:11Z, P06 09:23:14→09:23:15Z, P20 09:23:20→09:23:35Z, P04 09:23:19→09:23:19Z.
    - Those pushes landed on the neighbouring dates. For example: P12 20 Nov £290 and 26 Nov £304; P04 13 Nov £130 and 21 Nov £158 (was £148); P20 20 Nov £241.
    - A failed push would leave the old pushed price in Smoobu. Smoobu instead holds a third value, below both the old price (`user_price`) and the new one.
  - **DSO in PriceLabs: ruled out.** There are 0 log entries since 11 Nov 17:16:47Z, and the overrides are unchanged.
  - **Sync off: ruled out.** `push_enabled` is true on all four listings.
  - **Verdict: a Smoobu-side manual price** (or another writer into Smoobu).
    - The values were written after 12 Nov 07:56Z for P12 and after 09:23Z for P06/P20/P04, and before 13 Nov 07:21:30Z.
    - The pattern points to a person: open gaps 0-7 days out only; round figures (£130 / £135 / £140, £222 twice, £250 twice); and the two min-stay cuts to 1 and 2.
    - Who made them and when: **UNKNOWN.** The Smoobu API has no rate history.
- **PriceLabs overwrites these edits.**
  - P12's 07:22:41Z push replaced 250 / 250 / 266 with **267 / 273 / 288**. Smoobu at 07:24:29Z matched, and 13 Nov went back to min 2.
  - So P06, P20 and P04 will revert at their next push. Their last push was 12 Nov 09:23Z; the next push time is UNKNOWN.
  - Still in Smoobu at 07:24Z: **11 nights, -£226** (P06 £74, P20 £105 including 13 Nov, P04 £47).
- **Question for Corentin / Reyhan:** who edited Smoobu prices and min stays on 12-13 Nov? It may have been part of the 12 Nov Booking.com overwrite work.
  - If the cuts are wanted, they must be made as PriceLabs DSOs, or the next push undoes them. They lower prices, so this is Corentin's call.
  - If they are not wanted, nothing to do: the next push restores them.
- **Check:** Smoobu > Rates calendar for 3288517 15-17 Nov, 3547481 13-17 Nov and 3562176 18-20 Nov. Then PriceLabs `last_date_pushed` on these three listings after the next refresh.

**C2. P06 Marylebone, an intentional-block listing: Smoobu has 22-29 Nov open (8 nights, £2,982), but PriceLabs still shows "Blocked" on all 8** (Smoobu reservations 143402691; Smoobu rates 07:24Z; live `get_listing_prices` 3288517)
- **The block change:**
  - The "Blocked channel" record 143402691 now runs **30 Nov 2026 - 31 Dec 2027**.
  - It ran from 22 Nov when last seen; it was modified 5 Nov 17:31:32.
  - It was modified again at **12 Nov 12:59:51 (Smoobu time)**, after PriceLabs' last P06 refresh at 09:23:14Z.
- **On sale in Smoobu:** 22-29 Nov at **346 / 348 / 350 / 353 / 358 / 400 / 445 / 382 = £2,982**, min 2 / 3 / 3 / 3 / 3 / 4 / 4 / 4.
  - These are the prices PriceLabs computed while it held the dates as blocked.
  - Together with 15-17 Nov, P06 has **11 open nights** in the next 180 (`an2.py`).
- **Policy** lists P06 as blocked on purpose. Shortening the block is a decision, so this is not raised as an opportunity.
- **Question for Corentin:** was opening 22-29 Nov intended?
  - If yes, PriceLabs will re-price these nights at its next P06 refresh; `policy.json intentional_blocks` then needs a date note.
  - If no, re-extend the Smoobu block to 22 Nov.
- **Check:** Smoobu > Marylebone > block 143402691. Then PriceLabs 3288517 > Sync Now (it currently counts 22-29 Nov as blocked).

**C3. Nights that are unsellable or mis-set tonight, 13 Nov** (Smoobu 07:24:29Z; live prices)
- **P12 13 Nov: £275, min 2, 14 Nov booked, so unsellable** (`unbookable` 1 after the 07:22:40Z refresh).
  - It was sellable as a 1-night stay until 07:22Z, through the Smoobu-side min 1 (C1).
  - The PriceLabs DSO for 13 Nov is +5% min 2 (10 Nov 16:28:21Z). The night is lost unless a min-1 DSO is set today.
- **P04 13 Nov: £130, min 2, 14-17 Nov booked: a 1-night gap.** Policy says P04 is never under 3 nights, so numbers only.
- **P20 13 Nov:** sellable (13-17 Nov is a 5-night run, min 3). Smoobu is at £250 vs PriceLabs £267 (C1).
- **P11 13 Nov: blocked.** Smoobu "Blocked channel" 162775668 covers 10-14 Nov. t-p11-1013block ends tonight with the night lost.
- **P13 12 Nov orphan (t-p13-1112-orphan): lapsed.** Last night passed unsold (£164 / £155, yesterday's audit).

### HIGH

**H1. P11 Camden 8-14 Dec is now open in PriceLabs and has been re-priced. Smoobu = PriceLabs. t-pl-push-fresh is met for P11** (live `get_listing_prices` 3064196, refreshed 06:34:59Z and pushed 06:35:00Z; Smoobu 07:24Z; Vrbo copy `_7fd3…`)
- **8-14 Dec**, open, min 3: **202 / 197 / 220 / 263 / 266 / 186 / 201 = £1,535**.
  - Yesterday Smoobu held £1,885, priced while PriceLabs thought the dates were booked: **-£350**.
  - **The full open run, 8-18 Dec (11 nights), is £2,475**, against £2,874 yesterday (-£399).
  - 4 Dec fell from £349 to £259.
- **Smoobu = PriceLabs** on all 36 open nights in the raw window and on 8-18 Dec (`sync.py`).
- **The Vrbo copy** (refreshed 05:53:50Z, pushed 05:59:17Z) also shows 8-14 Dec open, at £200 / £195 / £220 / £265 / £265 / £185 / £200.
- **Darts nights 13-17 Dec: 186 / 201 / 209 / 216 / 233 = £1,045, an average of £209** (yesterday £225).
  - Policy (21 Oct) says the average should be above £300. Policy (24 Oct) says "leave the darts override as it is (+5%)".
  - Reyhan's **-3% DSO, 22 Nov-18 Dec** (9 Nov 21:21:47Z), is still in place. It is reported again for Corentin as a conflict, not a new proposal.
  - 13 Dec is £186 against uncustomized £219 (-15%). Beyond the -3%, the rest comes from the Aggressive occupancy profile and Booking Recency, which are both on (H2).
- **`occupancy_next_30` is now 43%** (yesterday 60%, which included 8-11 Dec as booked).

**H2. a-discount-cut recomputed: next 14 nights £633, next 30 nights £1,875 (yesterday £843 / £1,687). For the four target listings: £790 / £1,962. Not done** (method as yesterday: `uncustomized_price - price` on nights open in both PriceLabs and Smoobu; 14 = 14-27 Nov, 30 = 14 Nov-13 Dec; excludes handbacks, P14, P06 and P04 2 Dec. P12 uses the live 07:22Z values; the others use raw, whose refresh times equal live `last_refreshed_at`. Script `an.py`.)

| Ref | Next 14 | Next 30 | Yesterday next 30 |
|---|---|---|---|
| P04 | 7 n £1,070 vs £1,461 (**£391**, -26.8%) | 15 n £2,536 vs £3,155 (**£619**, -19.6%) | £644 |
| P11 | 6 n (**£250**, -17.3%) | 18 n £3,724 vs £4,425 (**£701**, -15.8%), now including 8-13 Dec | £413 (£539 incl. 8-12 Dec) |
| P05 | 2 n (**£104**) | 9 n £4,239 vs £4,758 (**£519**, -10.9%) | £369 |
| P20 | 9 n (**£45**) | 10 n £2,515 vs £2,638 (**£123**) | £241 |
| P12 | -£115 | -£244 | -£52 |
| P13 3064856 / 3090701 | -£18 / -£24 | +£89 / +£68 | +£42 / +£30 |
| **Total** | **£633** | **£1,875** | **£1,687** |

- **Customizations, live and unchanged from yesterday's P11 read:**
  - All four listings: Occupancy profile **"Aggressive"** (0-15 days: -30% at 10% occupancy up to 0% at 100%). Booking Recency **default** (5% to 15%, next 30 days). Far-out **+30% after 150 days**.
  - Last-minute: **P04 -5% gradual within 15 days; P05 -1%; P11 0%; P20 0%.**
- **Check:** 3562176 / 3166592 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment, Booking Recency Factor and Last Minute Prices.

**H3. Status of the PriceLabs-side plan items, 13 Nov** (live prices and overrides; Smoobu 07:24Z)

| Item | Status | Numbers |
|---|---|---|
| a-discount-cut | **Not done** | £633 / £1,875 (H2) |
| a-p12-trim | **Not done.** P12 overrides are unchanged; the last `updated_at` is 10 Nov 16:28:36Z. | After today's refresh: 17-20 Nov 267 / 273 / 288 / 292 = **£1,120** (4 n, min 2). 30 Nov-3 Dec 254 / 273 / 274 / 276 = **£1,077** (was £1,113). 7-10 Dec 261 / 255 / 271 / 296 = **£1,083** (was £1,106). 11-13 Dec 287 / 294 / 291 = **£872** (was £940). 12 and 13 Dec are still min 3 before the 14 Dec handback block, so arrivals on those days cannot sell. |
| a-p05-dec | **Open; DSOs unchanged** (21 Dec 9 Nov 14:08:13Z, 29 Dec 14:08:30Z) | Since the 12 Nov 08:37Z refresh: 21 Dec **£2,074** (+300%, min 1, uncustomized £700; was £2,198). 29 Dec **£2,712** (+300%, min 1, uncustomized £1,131; was £2,777). 7-8 Dec 479 / 470 = **£949** (+3% min 2; was £923). 13-14 Dec 494 / 481 = **£975** (+5% min 2; was £1,023). Smoobu = PriceLabs. |
| a-peak-check (P13) | **Not done; Reyhan's 10-26 Dec -5% min 3 (11 Nov 15:38:45Z) is still set** | 17 nights 10-26 Dec, all open: 3064856 **£3,721** (uncustomized £4,081; yesterday £3,701). 3090701 **£3,705** (uncustomized £4,170; yesterday £3,760). Split for 3064856 / 3090701: 10-12 Dec £803 / £612; 13-17 Dec £989 / £1,048; 18-26 Dec £1,929 / £2,045. The plan's 10-12 Dec +5% and 18-26 Dec 0% is for Corentin. |
| t-p12-26nov-price | **Not fixed; price up again** | 26 Nov **£306**, min 1 (yesterday £298; Smoobu was £304 before 07:22Z). DSO +15% unchanged (4 Nov 01:24:21Z); uncustomized £283. |
| t-p20-5dec-orphan | **Not fixed (4th day)** | 5 Dec **£313**, min 3, `unbookable` 1; uncustomized £391. 25 Nov-4 Dec and 6-12 Dec are both booked. DSO 1-20 Dec 0% min 3 unchanged (9 Nov 21:25:55Z). |
| t-p04-min2-nov | **Setting still in place; almost nothing left for it to affect** | DSO 13-17 Nov min 2, 0% (11 Nov 17:16:19Z). 14-17 Nov are booked. The only open night, 13 Nov at £130, is a 1-night gap that cannot sell at min 2 or min 3. After tonight the item has no effect. Still for Corentin to confirm or revert (policy says min 3). |
| t-pl-push-fresh | **P11 met; P12 met at 07:22:41Z. Not met for P06 / P20 / P04** | P06, P20 and P04 carry Smoobu-side prices (C1). P06 22-29 Nov status (C2). |

**H4. Reyhan's settings are all still in place. These conflicts with standing decisions are for Corentin to confirm, not proposals** (live overrides and `get_listing_data`; `policy.json`)
- **P04:**
  - 13-17 Nov min 2 (policy: never under 3).
  - 18-24 Nov **-5% min 3** and 6-22 Dec **-5% min 3**. Policy price change of 24 Oct says -8% on 1-25 Nov.
  - Base **200**.
- **P11:** 22 Nov-18 Dec **-3%**, covering the darts nights (H1).
- **P13:** 10-26 Dec **-5%** (H3).
- **P20:**
  - **Min 2** on 16-17 Nov and 22-24 Nov (8 Nov 12:40:48Z / 12:41:16Z). Policy says min 3 from 25 Oct to 30 Nov.
  - Base **330**; policy and `id_map` say 350.
- **P05:** 21 / 29 Dec **+300% min 1**; max **3500**.
- **P12:** 13-20 Nov and 30 Nov-3 Dec **+5%**.
- **P14:** min **450** vs the £500 special setup. Numbers only.
- **P06:** 11-17 Nov -10% min 2. Intentional-block listing, numbers only.
- `policy.json` still has no entry for the 9-11 Nov edits (a-p13-record).

**H5. P20 delivery dates (t-p20-delivery): Smoobu now shows the 20-22 Nov block was cancelled and an 18-20 Nov block was created** (Smoobu reservations 160937106 and 162432556)
- **160937106** "Blocked channel", **20-22 Nov**: type **cancellation**, modified **30 Oct 18:11:05** (created 21 Oct 20:27).
- **162432556** "Blocked channel", **18-20 Nov**: created **3 Nov 10:31:56**. Smoobu shows 18-19 Nov unavailable.
- So the delivery appears to have moved to 18-19 Nov. `policy.json listing_facts.P20.block_20_21_nov` (20-22 Nov) is likely out of date. Corentin to confirm and update the policy.
- **20-24 Nov now:** 241 / 242 / 215 / 247 / 245 = **£1,190**, against £1,219 yesterday. Min 3 / 3 / 2 / 2 / 2. Smoobu = PriceLabs.

**H6. Orphans and min stay vs policy, next 180 nights** (Smoobu 07:24:29Z, after the P12 push; `an2.py`. Policy: 2-3 nights; 5 from 13 Jan; 7 from 13 Mar.)
- **Unsellable 1-night gaps:**
  - P12 13 Nov £275 (C3).
  - P04 13 Nov £130 (policy: no gap-fill below 3).
  - **P20 5 Dec £313** (H3).
- **Short runs a gap-fill rule would sell:**
  - P11: 18-19 Nov £160 / £187 (min 2); 22-25 Nov £207 / £215 / £213 / £212 (min 3); 23-25 Dec £276 / £259 / £266 (min 2).
  - P12: 17-20 Nov; 26 Nov (min 1); 30 Nov-3 Dec (min 2).
  - P05: 16-17 Nov £382 / £398; 29 Nov-2 Dec; 7-8 Dec; 13-14 Dec (min 2-3).
  - P06: 15-17 Nov (intentional-block listing, numbers only).
- **Min 1 inside 2 months:**
  - P12 26 Nov.
  - P13 17 Nov (£228 / £216) and 27 Nov (£287 / £272).
  - P13 1 Dec (£294 / £224): intentional per policy.
  - P05 21 / 29 Dec.
  - P04 2 Dec (£459): deprioritised.
- **Below 3 against policy:** P04 13 Nov min 2. P20 15 Nov (Smoobu-side), 16-17 Nov and 22-24 Nov min 2.
- **Above 3 inside 2 months:**
  - P20 26 Dec min 4; 27-28 Dec min 6; 29-31 Dec min 5.
  - P06 27-29 Nov min 4.
  - P14 Fri-Sun min 4 (special setup).
- **2-4 months ahead (13 Jan-12 Mar) below 5:**
  - P11: 47 nights at min 3.
  - P13: 46 nights at min 3-4 on each twin.
  - P05: 44 nights at min 3-4.
  - P20: 55 nights at min 3-4.
  - P04: 47 nights at min 3-4.
  - P14: special setup.
- **4+ months ahead (13 Mar onwards) below 7:**
  - P11: 61 nights at min 5.
  - P13: 61 nights at min 5-6 on each twin.
  - P20: 61 nights at min 5-6.
  - P05 and P04 are at 7 or more.
- **P01 18-20 Dec: still blocked** (Smoobu 160657036, 30 Nov-21 Dec, modified 10 Nov 14:41:27). P01 has 0 open nights before its 20 Dec handback. The question for Corentin is unchanged.

### MEDIUM

**M1. Push freshness at about 07:29Z: nothing is over 24 h, but eight Smoobu listings and one Vrbo copy cross 24 h between 07:40Z and 09:24Z today** (live `get_listing_data`)

| Listing | Last push (Z) | Crosses 24 h at |
|---|---|---|
| P13 Vrbo `_3d48…` | 12 Nov 07:40:29 (refreshed 13 Nov 06:32:45, **not pushed**) | 07:40Z |
| P08 3318167 | 12 Nov 08:00:58 | 08:01Z (fully booked; handback after tonight) |
| P05 3166592 / P14 3267077 | 12 Nov 08:37:40 / 08:37:42 | 08:38Z |
| P13 3064856 / 3090701 | 12 Nov 09:21:15 / 09:21:19 | 09:21Z |
| P06 / P04 / P20 | 12 Nov 09:23:15 / 09:23:19 / 09:23:35 | 09:23-09:24Z |

- **Pushed on 13 Nov:** P12 07:22:41Z; P09 06:54:49Z; P11 06:35:00Z; P12 Vrbo 06:10:55Z; P11 Vrbo 05:59:17Z; P10 05:18:22Z; P01 04:46:04Z; P07 04:09:45Z; P03 Channex 03:34:05Z; P02 00:23:22Z.
- **Stale with push on:** P02 Vrbo `_ca1c…`, last push **24 Feb 2026**, `last_refreshed_at` null.
- **Check:** `last_date_pushed` on the listings in the table after about 09:30Z. That push should also revert C1 and register C2.

**M2. Floor and ceiling, next 180 nights** (Smoobu open nights 13 Nov 2026 - 11 May 2027 vs live PriceLabs min/max; `an2.py`; `kpi_pack` `bounds` = next 60)
- **P14: 67 of 180 open nights (37.2%) at £450 = min.** `kpi_pack` gives 0.6 of 60. Special setup: numbers only.
- **Every other listing: 0 nights at min and 0 at max.**
  - Open nights: P11 155, P13 149 per twin, P20 153, P04 153, P05 128, P12 17, P06 11.
  - P05: max 3500, highest night £2,712 (29 Dec).

**M3. Base vs market** (last row per ref in `data/snapshots/2026-11-13/market.csv`, bedroom-matched Nearby Listings; `kpi_pack` `market_percentiles` is null)

| Ref | Base | P50 | vs P50 | P75 | vs P75 | Row pulled |
|---|---|---|---|---|---|---|
| P12 | £284 | £207 | +37.2% | £232 | +22.4% | 13 Nov |
| P09 | £176 | £133 | +32.3% | £160 | +10.0% | 9 Nov |
| P20 | £330 | £255 | +29.4% | £326 | +1.2% | 13 Nov |
| P04 | £200 | £178 | +12.4% | £216 | -7.4% | 13 Nov |
| P13 | £250 | £225 | +11.1% | £268 | -6.7% | 13 Nov |
| P11 | £286 | £291 | -1.7% | £329 | -13.1% | 13 Nov |
| P01 | £253 | £263 | -3.8% | £337 | -24.9% | 13 Nov |
| P05 (4 BR) | £550 | £583 | -5.7% | £728 | -24.5% | 13 Nov |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% | 2 Nov |

- P02, P03, P07, P08, P10 and P14 have no usable row: UNKNOWN (`market.csv`).

**M4. Listing hygiene and info pack: unchanged from 12 Nov, plus one new item** (live `get_listing_data`; `data/id_map.json`; `/home/user/seeker-social/seeker-estates/build/properties.py`, last changed 22 Oct)
- **All 20 PriceLabs listings:** `push_enabled` true, `isHidden` false.
- **New: the P13 Vrbo copy `_3d48…` was refreshed at 06:32:45Z with no push** (last push 12 Nov 07:40:29Z).
- **Vrbo copies push separately and inherit DSOs from their parent:** P13 `_3d48…`, P11 `_7fd3…`, P12 `_386e…`.
  - **P02 `_ca1c…` has been stale since 24 Feb 2026.**
  - Question: should the Vrbo copies push at all?
- **Duplicates:** P13 3064856 and 3090701 share coordinates 51.5088201, -0.2342476. This is one flat by policy.
- **`_unmatched`:** the three Marylebone Vrbo ids (`_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are not among PriceLabs' 20 listings. Question: remove them from `id_map.json`?
- **`confidence: check`:**
  - **P03** is priced via **Channex**, not Smoobu. Pushed 13 Nov 03:34:05Z; 100 / 323 / 1500; fully blocked (intentional).
  - **P15-P19** have no PriceLabs listing. Question: are they priced elsewhere?
- **Not in the info pack:** P20 3547481, PriceLabs 200 / 330 / 1800. Question: is base 330 or 350?
- **Pack vs PriceLabs.** The pack is out of date (22 Oct); these are differences, not errors.
  - Base: P04 220 vs 200; P05 455 vs 550; P01 230 vs 253; P06 340 vs 357; P09 160 vs 176; P11 260 vs 286; P12 270 vs 284; P13 235 vs 250.
  - P14: min 400 / base 475 vs 450 / 525.
  - Every PriceLabs max is above the pack "high". For example: P05 780 vs 3500, P11 400 vs 1200, P12 400 vs 2000.
  - The pack lists P05 as "5-bed". Policy says 4 bedrooms.

**M5. 18 Oct base-rise tally: no change.** There are no new bookings or cancellations overnight (Dispatcher; Smoobu reservations 07:22Z). Yesterday's figures stand: **+8 nights / +£3,888.80 like-for-like; +12 nights / +£4,745.59 including P06**; P11 -11 nights / -£2,355.27; P01 0; P05 is the whole gain.

Data gaps:
1. Who wrote the lower Smoobu prices and min stays (C1), and exactly when: UNKNOWN. The Smoobu API has no rate history. The window is 12 Nov 07:56Z / 09:23Z to 13 Nov 07:21:30Z.
2. When P06, P20 and P04 will next refresh and push (and so revert C1 and register C2): UNKNOWN. What triggered P12's 07:22:40Z refresh: UNKNOWN.
3. Who shortened the P06 block (12 Nov 12:59:51) and the P20 delivery-block history, and why: UNKNOWN. The Smoobu record has no user field.
4. The Smoobu timestamp zone (UTC vs UTC+1) is inferred, not verified.
5. NOT CHECKED: overrides for P06, P09, P14 and P13 3090701, and customizations for P12, P13, P06 and P14. "Unchanged" rests on `get_user_logs` (0 entries since 11 Nov 17:16:47Z), which does not log customization changes.
6. The raw P05, P13 and P09 prices files were not value-checked date by date. Their refresh times equal live `last_refreshed_at`, and the P05 / P13 December nights used in H3 were read live.
7. Market: `kpi_pack` `market_percentiles` is null. P06 (2 Nov) and P09 (9 Nov) rows are old; P02, P03, P07, P08, P10 and P14 have no row.
8. P04 last-minute -5% and P05 -1% were first read today, so whether they changed recently is NOT CHECKED. Yesterday's audit read customizations for P11 only.

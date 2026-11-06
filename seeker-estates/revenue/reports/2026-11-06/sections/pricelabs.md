## PriceLabs audit (D = 2026-11-06)

**Sources**
- Snapshot `data/snapshots/2026-11-06/`: `raw/listing_data.json` (06:55Z) and `raw/prices_*.json` (06:57-07:16Z, window **7 Nov 2026 - 5 Jan 2027**), plus `listings.csv` and `prices.csv`. Yesterday's files: `data/snapshots/2026-11-05/` and `reports/2026-11-05/sections/pricelabs.md`.
- **Live PriceLabs calls (read-only), 6 Nov ~07:15-07:25Z:**
  - `get_listing_date_overrides` for P06 3288517 and P13 3064856.
  - `get_user_logs`: listing, group and account logs for 5-6 Nov.
  - `get_listing_data` for all 20 listings.
  - `get_listing_prices` for P06 (6-22 Nov).
  - `get_customizations` for P04 3562176.
  - **Rule breach:** the group and account `get_user_logs` calls ran as a parallel pair. Both returned 200 with 0 entries. Every other call ran one at a time.
- **Live Smoobu GET `/api/rates`** for all 15 apartments, 6 Nov 2026-5 May 2027, at **07:18:36Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live06pl/smoobu_rates_a.json` (no guest data). It is compared against yesterday's 07:20:47Z pull (`.../scratchpad/live05pl/smoobu_rates_b.json`).
- Reservation ids and times come from the Dispatcher's guest-free extract: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live06/smoobu_mod06_pe.json`.
- `kpi_pack.json`: `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all **null**. Everything below was recomputed.
- Policy respected:
  - P02/P03/P06/P07 blocks and the P14 special setup.
  - Handbacks: P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec.
  - P13 is one flat. P12 17 Nov and P04 2 Dec are deprioritised (numbers only).
  - Reyhan's edits that cross a standing decision are listed as conflicts for Corentin to confirm. They are not new proposals.

### What changed since 5 Nov 06:00Z (`get_user_logs`: 16 listing entries, all by reyhan@, 5 Nov 10:53:39-10:57:23Z; group and account: 0)

| Time (5 Nov, Z) | Listing | DSO | Was |
|---|---|---|---|
| 10:53:39 | P12 2699998 (+ Vrbo copy) | 12-20 Nov **-5%**, min 2 | -15% (17 Nov: +50% policy, deprioritised) |
| 10:53:48 | P12 2699998 (+ Vrbo copy) | 30 Nov-12 Dec **-5%**, min 2 | -15% |
| 10:54:34 | P11 3064196 (+ Vrbo copy) | 23 Dec **+7%**, min 2 | min 3 |
| 10:54:55 | P13 3064856 (+ 3090701, Vrbo copy) | 8-12 Nov **-10%**, min 2 | -7% (policy 0%) |
| 10:55:02 | P13 3064856 (+ 3090701, Vrbo copy) | 7-20 Dec **-7%**, min 2 | not set in this range before (21-26 Dec -5% kept) |
| 10:55:47 / 10:55:55 | P08 3318167 | 5-21 Nov **+5%**, min 2 | -5% |
| 10:56:24 | P09 3318172 | 5-12 Nov `price_type` fixed **with no price**, min 2 | - |
| 10:57:23 | P04 3562176 | 9-24 Nov **-7%**, min 3 | -15% (policy -8%) |

- No `base_price`, `min_price`, `max_price` or sync-toggle entry. Base, min and max are unchanged on all 20 listings (`listings.csv` 6 Nov vs 5 Nov). Recommended base moved: P01 £255 -> £256, P20 £347 -> £351.
- P04 customizations are identical to 5 Nov: last-minute -5% gradual over 15 days, Aggressive occupancy profile, Booking Recency default (5-15%), Conservative demand.

---

### CRITICAL

**C1. P06 Marylebone 9 Nov: the £2 is no longer on sale. Smoobu now shows £200 (the PriceLabs minimum). PriceLabs' "Your Price" still records £2, and no override or log entry sets it** (live overrides, logs, `get_listing_prices`, Smoobu 07:18:36Z)

| Night | PriceLabs `price` / uncustomized | `user_price` = `booked_price` | Smoobu 5 Nov 07:20Z | **Smoobu now** |
|---|---|---|---|---|
| 8 Nov | £213 / £207 | £200 | £200 | **£200** |
| 9 Nov | £219 / £219 | **£2** | **£2** | **£200** |
| 10 Nov | £226 / £232 | £241 | £241 | £226 |
| 11 Nov | £238 / £250 | £255 | £255 | £238 |

- **Overrides on 9 Nov:** -5% percent, min 2 (updated 4 Nov 01:28:22Z). There is no fixed price and no £2 value. 8-14 Nov all carry -5%.
- **Logs:** no P06 entry since the 4 Nov 12:52:23Z price-less "fixed" DSO on 15-22 Nov.
- **What `booked_price` and `user_price` hold.** On every P06 date they equal what Smoobu held on 5 Nov: £200 / **£2** / £241 / £255, and on 15-21 Nov £279-£432. So "Your Price" is PriceLabs' record of the previous cycle's pushed price. The **£2 is the value PriceLabs pushed in that cycle**, which is consistent with yesterday's finding that the 4 Nov 12:52:54Z push carried it. Why a price below the £200 minimum was produced is still UNKNOWN.
- **What the 5 Nov 10:34:00Z push did** (P06's only push since; refresh 10:33:59Z, no log entry, so it was not triggered by an edit):
  - 10-14 Nov and 15-21 Nov in Smoobu now equal the PriceLabs `price`.
  - **8 and 9 Nov sit at £200, £13 and £19 below PriceLabs.** A manual Smoobu edit that set 9 Nov from £2 to £200 fits this, but cannot be proven: Smoobu has no rate history over the API.
  - Other possible causes: a push that skipped those two dates, or a Smoobu-side rule.
- No P06 reservation covers 8-11 Nov (Smoobu extract), so **nothing sold at £2**.
- **t-p06-2pound: FIXED on the Smoobu side at £200.**
  - Still open: Airbnb and Booking.com display for 9 Nov is NOT CHECKED.
  - PriceLabs' "Your Price" on 9 Nov still reads £2 and should clear on the next P06 cycle.
- **Check:**
  - PriceLabs > 3288517 > Calendar 9 Nov: does "Your Price" show £2?
  - Channel calendars for 8-9 Nov.
  - Decide whether 8-9 Nov should stay at £200 or follow PriceLabs (£213 / £219).

**C2. P06 15-21 Nov is now OPEN in Smoobu (7 nights, £2,143, min 2), but PriceLabs still shows it Blocked** (Smoobu block **143402691** modified **5 Nov 17:31:32**, now starting 22 Nov; Smoobu rates; `get_listing_prices`)
- Smoobu prices: 15-21 Nov **£265 / £264 / £270 / £277 / £295 / £342 / £430**, min 2. These equal PriceLabs' last pushed `price` on each night, so the nights are not mispriced today.
- PriceLabs last refreshed P06 at **10:33:59Z**, seven hours before the block changed. It does not know these nights are sellable. Its occupancy-based and last-minute logic will not treat them as open until it refreshes, and P06 did not refresh overnight (C3).
- Reyhan's 4 Nov DSO (15-22 Nov min 2, no price) suggests the opening was planned.
- Policy: P06 is an intentional block. **Question for Corentin: is opening 15-21 Nov intended?** This is a fact for confirmation, not a proposal.
- **Check:** PriceLabs > 3288517 > Sync Now (Corentin's action), then confirm 15-21 Nov shows as available.

**C3. LISTING_NO_DATA has recovered. Eight listings did not refresh overnight; their pushes will be 24 h old at 10:34-10:58Z today** (live `get_listing_data` 07:15Z; current time 07:18Z)

| Ref | Listing | `last_refreshed_at` | Last push | Age now | Crosses 24 h |
|---|---|---|---|---|---|
| P06 | 3288517 | 5 Nov 10:33:59Z | 10:34:00Z | 20 h 44 m | **10:34Z today** |
| P12 | 2699998 | 10:54:30Z | 10:54:30Z | 20 h 24 m | 10:54Z |
| P11 | 3064196 | 10:55:15Z | 10:55:16Z | 20 h 23 m | 10:55Z |
| P13 | 3064856 / 3090701 | 10:55:36Z / 10:55:37Z | same | 20 h 23 m | 10:55Z |
| P08 | 3318167 | 10:56:35Z | 10:56:36Z | 20 h 22 m | 10:56Z |
| P09 | 3318172 | 10:56:56Z | 10:56:57Z | 20 h 22 m | 10:56Z |
| P04 | 3562176 | 10:58:00Z | 10:58:01Z | 20 h 20 m | 10:58Z |

- **Fresh (refreshed and pushed 6 Nov):**
  - P02 00:24Z, P05 01:18Z, P20 01:29Z, P03 (Channex) 03:28Z.
  - P07 04:15Z, P14 04:38Z, **P01 05:28Z, P10 05:43Z**.
  - P12 Vrbo copy 07:11Z.
- **Recovery timeline:**
  - P06 was back by **5 Nov 10:33:59Z**. That refresh has no log entry, so it was a manual "Sync Now" or a system retry (UNKNOWN which).
  - P09 was back by 10:56:56Z, 32 s after Reyhan's DSO at 10:56:24Z.
  - P01 and P10: still no data at 5 Nov 07:14Z (yesterday's section). Their first refresh visible now is 6 Nov 05:28Z / 05:43Z. The exact recovery time is UNKNOWN; the logs do not record refreshes.
  - All four have pushed again: P06 10:34Z, P09 10:56Z, P01 05:28Z, P10 05:43Z. **t-pl-nodata: FIXED.**
- **Why the eight missed the overnight cycle:** all eight were refreshed at 10:33-10:58Z yesterday, seven of them by Reyhan's edits. That fits a roughly 24 h per-listing cadence; P09's slot drifted the same way (2 Nov 07:53Z, 3 Nov 07:37Z, 4 Nov 07:27Z). This is not proven to be a fault.
- **Consequence:** PriceLabs has not seen what changed after 10:58Z:
  - P06 15-21 Nov opened (C2).
  - P12 11-13 Dec was booked at 22:39Z; PriceLabs still shows it open at £302 / £312.
  - The Smoobu edits below (H1).
- **Check at ~11:00Z:** `last_date_pushed` on these eight. Any still at 5 Nov after 11:00Z is past 24 h: CRITICAL. Then Sync Now.

### HIGH

**H1. Sync next 30 (6 Nov-5 Dec): 15 nights where Smoobu sells £2-£32 below PriceLabs, £256 in total, all within 8-12 Nov. Plus the C2 availability gap** (raw 6 Nov `price` vs Smoobu 07:18:36Z, nights open in both)

| Ref | Nights | PriceLabs | Smoobu now | Smoobu 5 Nov 07:20Z | Gap |
|---|---|---|---|---|---|
| P13 3090701 | 8-11 Nov | £173 / £173 / £176 / £181 | **£150 / £150 / £150 / £160** | £179 / £179 / £182 / £188 | -£93 |
| P11 | 10-12 Nov | £189 / £199 / £212 | £175 / £179 / £189 | £189 / £201 / £212 | -£57 |
| P04 | 9-11 Nov | £152 / £153 / £158 | **£140 x 3** | - | -£43 |
| P09 | 8-10 Nov | £112 / £110 / £109 | **£100 x 3** (= PriceLabs min) | 8-9 closed, 10 Nov £113 | -£31 |
| P06 | 8-9 Nov | £213 / £219 | £200 / £200 (= min) | £200 / £2 | -£32 (C1) |

- Every other open night matches within £2 on P12, P13 3064856, P05, P14, P20, P08 and P09 (7, 11 and 12 Nov). Min stays are equal everywhere.
- **These Smoobu values match none of PriceLabs' series** (`price`, `user_price` or uncustomized), and the listings have not pushed since 10:5xZ. Many are round figures (£100, £140, £150, £200).
- Possible causes, none proven: manual Smoobu overrides after the 5 Nov push; the push skipping those dates; a Smoobu-side rule. Sync is on and there is no DSO with a fixed price on these dates.
- **Availability mismatches:**
  - P06 15-21 Nov (C2).
  - Beyond 30 days: P12 11-12 Dec, booked in Smoobu (id 162688853, created 5 Nov 22:39) but still open in PriceLabs at £302 / £312. This is timing.
- **Check:** Smoobu > Rates on 3090701 8-11 Nov, 3064196 10-12 Nov, 3562176 9-11 Nov, 3318172 8-10 Nov and 3288517 8-9 Nov. Who set them? Keep them, or let PriceLabs overwrite them?

**H2. a-p13-record: Reyhan's 5 Nov edits, set against the standing decisions (for Corentin to confirm)**

| Conflict | Policy | Now | Prices (raw 6 Nov) |
|---|---|---|---|
| P04 1-25 Nov | -8%, min 3 | **9-24 Nov -7%**, min 3 (was -15%). Now within 1 pt of policy | 9-24 Nov open nights **£2,051** (5 Nov £1,874) |
| P13 8-12 Nov | 0% | **-10%** (was -7%), further from policy | 3064856 £154 / £154 / £156 / £161 / £163 = **£788** (£815). 3090701 £886 in PriceLabs, but Smoobu sells £150-£183 (H1) |
| P12 17 Nov | +50% (deprioritised) | -5% (was -15%) | £245 (uncustomized £276) |
| P20 16-19 Nov min 3; base 350 | `listing_facts.P20` | Unchanged: min 2, base **330** | 16-17 Nov £225 / £229 |
| P11 darts 13-17 Dec, avg > £300 | 21 Oct | Unchanged (-5%) | **£1,098, avg £219.60** |
| Jan-Feb min stays (5 at 2+ months) | policy | Unchanged: min 3 / 4 | See M2 |

- New: **P13 7-20 Dec -7%** (Reyhan). This runs against the a-peak-check proposal (+5%), which is a plan item, not a standing decision.
- **Status: NOT done.** Nothing has been recorded or confirmed.

**H3. a-discount-cut recomputed: next 14 £997, next 30 £1,807 (yesterday £1,041 / £2,285)** (raw `uncustomized_price - price` on nights open in PriceLabs AND Smoobu; window 7-19 Nov / 7 Nov-5 Dec because raw starts 7 Nov)
- Excluded: handback nights, P14 (special setup), P06, P05 9 Nov and P04 2 Dec. P13 premiums are netted.

| Ref | Next 14 | Next 30 | Yesterday n30 |
|---|---|---|---|
| P04 | 7 n £1,105 vs £1,521, **-27.4% (£416)** | 12 n £2,051 vs £2,702, **-24.1% (£651)** | £825 |
| P11 | 6 n -19.3% (£286) | 16 n -11.1% (£426) | £428 |
| P12 | 5 n -13.1% (£188) | 11 n -12.2% (£407) | £654 |
| P05 | 2 n -19.8% (£187) | 6 n -10.6% (£342) | £332 |
| P20 | 8 n +0.5% (-£9) | 14 n -6.1% (£223) | £326 |
| P13 3064856 / 3090701 | -£31 / +£5 | -£135 / -£62 | -£161 / -£94 |
| P08 | 1 n +13.5% (-£23) | same | -£25 |
| P09 | 6 n +3.2% (-£22) | same | not counted (no data) |
| **Total** | **£997** | **£1,807** | **£2,285** |

- **Why it fell:** Reyhan's DSOs moved P04 from -15% to -7% and P12 from -15% to -5%, and P20's uncustomized price fell (e.g. 13 Nov £256 -> £244).
- **P04 is still 24% under uncustomized** with the customization layers unchanged.
- **Status: NOT done.**
- **Check:** PriceLabs > 3562176 > Customizations > Last-minute, Occupancy profile and Booking Recency: Custom 0%.

**H4. Plan items (PriceLabs side), status 6 Nov**

| Item | Status | Numbers |
|---|---|---|
| t-p06-2pound | **Fixed in Smoobu** (C1) | 9 Nov £200, min 2. PriceLabs "Your Price" still £2 |
| t-pl-nodata | **Fixed** (C3) | All four refreshed and pushed. Eight listings are due by ~11:00Z |
| a-raise-1012nov | **Not done; moved the wrong way** | 3064856 12 Nov **£163**, min 2 (target >= £176, min 1; 5 Nov £168). 3090701 12 Nov £183 (target met, at the line) |
| a-handback-lastnights | **Partly met on P08; wrong way on P09** | **P08:** 6 Nov £175 (Smoobu; outside raw), 7 Nov **£193** (Reyhan +5%; target ~£193 met). **P09: reopened** by the Airbnb 1-10 Nov cancellation (id 158710021, cancelled 5 Nov 09:32:47). 6-12 Nov are open in Smoobu: **£110 / £130 / £100 / £100 / £100 / £116 / £125 = £781**, min 2. PriceLabs 7-12 Nov = £702 (target for 10-12 Nov was £124 / £134 / £142; Smoobu has £100 / £116 / £125). Three nights sit at the £100 floor. Reyhan's 5-12 Nov "fixed" DSO has no price. Handback 26 Nov; 13-26 Nov booked |
| a-p05-dec | **Not done** | 7-8 Dec £470 / £452 = **£922** (target ~£1,174). 13-21 Dec **£5,316** (target ~£5,818). No P05 log entry since 4 Nov |
| a-peak-check | **Not done; P13 moved the other way** | P13 7-26 Dec 3064856 **£4,148** (5 Nov £4,211), 3090701 £4,389. 7-20 Dec is now -7%; 21-26 Dec -5%, min 3. P05 29 Dec **£1,351**, min 1 (uncustomized £1,071; 5 Nov £1,322) |
| t-p12-26nov-price | **Not fixed** | £316, min 1 (uncustomized £304), Smoobu £316 |
| t-channel-gaps (P11 23 Dec) | **Partly done** | Reyhan +7%: **£300**, min 2 (target >= £317) |
| a-p13-record | Not done (H2) | - |
| a-discount-cut | Not done (H3) | £997 / £1,807 |

- **P05 9 Nov: £1,403 vs £1,383.** `price` £1,383 is current (refresh 6 Nov 01:18:47Z) and equals Smoobu now (5 Nov: £1,403). `user_price` £1,403 is the previous cycle's price, consistent with C1. Uncustomized is £353, so 9 Nov is **3.9x**, min 1. The Airbnb display (a-p05-9nov) is NOT CHECKED here.
- **P04 2 Dec (deprioritised, numbers only):** `price` £496 = Smoobu, `user_price` £493 (previous cycle), uncustomized £228 (2.2x), min 1.
- **P12 11-13 Dec new booking:** room £513.81. Smoobu sold 11-12 Dec at **£302 / £312 = £614** after the 10:54Z push (the 5 Nov 01:2xZ raw had £270 / £279 = £549). That is **0.837x** of the price at booking time, or 0.936x of the early-morning price. The discount stack (Booking.com +15% markup, then promotions) is for the channel section.

### MEDIUM

**M1. Floor and ceiling** (Smoobu-available nights, 6 Nov-4 May, vs PriceLabs min and max; PriceLabs-open nights in raw give the same result)
- **P09: 3 of 8 open nights (38%) at the £100 min** (8-10 Nov).
- **P06: 2 of 11 (18%) at the £200 min** (8-9 Nov).
- Both come from the Smoobu values in H1, not from PriceLabs, which has 0 nights at min on these listings.
- P14: 113 of 180 nights (63%) at £500 (special setup: numbers only).
- All others: 0% at min and 0% at max.

**M2. Min stay vs policy** (Smoobu 6 Nov-4 May; Smoobu = PriceLabs min stay wherever both exist)
- **Below 2:**
  - P12 26 Nov (£316).
  - P13 17 Nov, 27 Nov and 1 Dec, both listings (1 Dec +50% is policy).
  - P05 9 Nov (£1,383) and 29 Dec (£1,351).
  - P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:** P20 25-26 Dec min 4, 27-28 Dec min 6, 29-31 Dec min 5 (unchanged). P14 min 4 on weekends is a special setup.
- **2+ months ahead, below 5:**
  - P11 min 3, 5 Jan-28 Feb (55 n).
  - P13 min 3, 5 Jan-3 Feb, then min 4.
  - P05 3 (Jan) / 4 (Feb).
  - P20 3 (Jan) / 4 (to 4 Mar).
  - P04 3 / 4.
- **4+ months ahead, below 7:** P11 min 5; P13 min 5-6; P20 min 5-6; P09 25 Apr min 5.
- **Short open runs a gap-fill rule would sell:**
  - P06 8-11 Nov (4 n).
  - P09 6-12 Nov (7 n, reopened).
  - P08 6-7 Nov.
  - P12 26 Nov (1 n).
  - P13 17 Nov, 27 Nov and 1 Dec (1 n each).
  - P05 16-17 Nov and 7-8 Dec.
  - `kpi_pack` has no gaps field.

**M3. Base vs market**
- No new `market.csv` today. Base prices are unchanged, so yesterday's table stands (`data/snapshots/2026-11-05/market.csv`).
- Examples: P12 £284 is +39.2% vs P50; P04 +30.2%; P20 +32.5%; P06 -11.9%. P08, P10 and P14 are UNKNOWN (no market row).

**M4. Listing hygiene** (`get_listing_data`; `data/id_map.json`)
- **Vrbo copies:**
  - P13 `_3d48…` pushed 5 Nov 10:56:36Z and P11 `_7fd3…` 5 Nov 11:03:00Z (both > 24 h stale yesterday; now fresh via Reyhan's copied DSOs).
  - P12 `_386e…` pushed 6 Nov 07:11:22Z.
  - **P02 `_ca1c…` last pushed 24 Feb 2026** (`last_refreshed_at` null).
  - Question: should Vrbo copies push at all?
- **`_unmatched`:** the three Marylebone Vrbo ids (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are still absent from PriceLabs' 20 listings. Remove them from `id_map.json`?
- **`confidence: check`:**
  - P03 is priced via **Channex**: push on, last push 6 Nov 03:28:58Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing** (t-unmapped).
- **`pricelabs_other` ids not in PriceLabs:** P01 `d1f3bd96…`, P08 `10339b41…`, P09 `e36cf9e9…`, P10 `babeec20…`, P04 `_units_0001_20df1e73…`, P13 `_d0a5f202…` and `_125c15c5…`.
- `id_map.json` P20 note says min 220 / base 350; PriceLabs has **min 200 / base 330**. The note is out of date, or this is the H2 conflict.
- P13 3064856 and 3090701 share coordinates (one flat, policy). The twin now differs in Smoobu on 8-11 Nov: 3090701 £150-£160 vs 3064856 £154-£161 (H1).
- P09 25 Apr 2027 is open in Smoobu at £458, min 5 (after handback). Unchanged.
- All 20 listings: `push_enabled` true, `isHidden` false.
- Min/max vs info pack (`/home/user/seeker-social/seeker-estates/build/properties.py`): no change in PriceLabs since 5 Nov. The pack is out of date (P05 base 455 vs 550; P14 400 vs 500, special setup; P20 missing).

Data gaps:
1. Who set Smoobu 9 Nov £2 -> £200, and the H1 values (£100, £140, £150, £175-£189), is UNKNOWN. Smoobu has no rate history over the API, and PriceLabs logs only record PriceLabs edits.
2. Exact recovery times for P01 and P10 are UNKNOWN (between 5 Nov 07:29Z and 6 Nov 05:28Z / 05:43Z). Whether P06's 10:33:59Z refresh was a manual Sync Now is UNKNOWN.
3. Channel displays (Airbnb, Booking.com) for P06 8-9 Nov, P06 15-21 Nov and P05 9 Nov: NOT CHECKED.
4. Raw window is 7 Nov-5 Jan, so 6 Nov comes from Smoobu only. Floor shares and Jan-May min stays come from Smoobu.
5. Read live today: overrides for P06 and P13 only; customizations for P04 only. The state of every other listing comes from logs plus raw.
6. `market.csv` was not refreshed today.
7. The 18 Oct base-rise tracker (P09 cancellation, P12 new booking) was not re-run here: NOT CHECKED.
8. The group and account `get_user_logs` calls ran as a parallel pair, against the one-call-at-a-time rule. Both returned 200.

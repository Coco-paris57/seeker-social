## PriceLabs audit (D = 2026-11-21)

**Sources**
- Snapshot `data/snapshots/2026-11-21/`: `raw/prices_*.json` (window 22 Nov 2026-20 Jan 2027; pulled 06:58-07:14Z), `raw/listing_data.json` (now **21** listings), `listings.csv`, `prices.csv`, `reservations.csv`. No 21 Nov `market.csv` (kpi_pack `missing.market` = empty), so base vs market uses the latest rows in `data/snapshots/2026-11-20/market.csv`.
- Baseline: `data/snapshots/2026-11-20/raw/`, `reports/2026-11-20/sections/pricelabs.md`, Smoobu rates 20 Nov 07:19Z (`scratchpad/pl20/smoobu_rates.json`).
- Live PriceLabs reads, 21 Nov about 07:20-07:40Z, all 200. Read only:
  - `get_user_logs`: listing, group and account, 20-21 Nov.
  - `get_customizations`: 3588993 (all keys, toggled_on false); P05, P04, P11, P20 (occupancy, last-minute, booking recency).
  - `get_listing_date_overrides`: 3588993, P20, P04, P05, P11, P13 3064856, P13 3090701, P12.
  - `get_listing_prices`: 3588993 22 Nov-20 Jan; P20 21 Nov-20 Jan, then P20 22-24 Nov again (last check); P14 24 Dec-3 Jan; P13 3090701 22 Nov-20 Jan.
  - **Process note:** two batches went out in parallel by mistake: group and account logs (2 calls), and the P04 / P11 / P20 customizations (3 calls). All were read only, all returned 200, and nothing was written. Every other call went out one at a time.
- Live Smoobu GET (read only):
  - `/api/rates` for 15 apartments, 21 Nov 2026-21 May 2027, taken **07:18:04Z**. Re-read for P14, P20 and 3090701 at 07:19:57Z.
  - `/api/rates` and `/api/apartments/3588993`.
  - `/api/reservations` 15 Nov-20 Jan: only dates, created/modified times, type, channel and amount were kept. No guest fields.
- Scripts and data are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl21/`:
  - `an21.py`: sync, floor, orphans and min stay.
  - `mv21.py`: day-on-day moves and twins.
  - `disc21.py`: a-discount-cut.
  - `det.py`: per-date detail.
  - Data: `smoobu_rates.json`, `smoobu_3588993.json`, `smoobu_res.json`.
- **Policy respected:**
  - P02/P03/P06/P07 blocks are intentional (P06 gets numbers only). P14 is a special setup (numbers only). P13 is one flat, and the twin rule applies.
  - The 15% / 20% stay discounts are policy. P04 is never under 3 nights. P04 2 Dec and P12 17 Nov are deprioritised.
  - Reyhan's edits that conflict with policy go to Corentin as **confirm or revert**.

### Changes since 20 Nov 06:00Z
- **PriceLabs listing logs: 33 entries, all by Reyhan, in two batches.** Group and account logs: 0.
  - **20 Nov 17:29-17:35Z, new listing 3588993 Scott Ellis Gardens** (H1):
    - Base 285 -> 265 -> 285 -> 295.
    - Min 0 -> 170; max 0 -> 4000.
    - Push toggled ON at 17:35:04Z.
    - Min-stay DSOs: 27 Dec min 7, 28 Dec min 5, 29-31 Dec min 4.
  - **20 Nov 21:10-22:54Z, 16 DSO saves on P11 (+ its Vrbo copy), P13 (both twins + Vrbo, copied from parent 3064856), P05, P06 and P04** (H2).
  - **There are no PriceLabs log entries for P20** since 20 Nov.
- **Settings** (`listing_data.json` 20 vs 21 Nov):
  - Base, min, max, push and hidden are unchanged on the 20 listings seen yesterday.
  - New: 3588993.
  - P20 `recommended_base_price` is 351 (unchanged). P04 and 3588993 show "Unavailable".
- **Customizations** (live, unchanged vs 18-20 Nov):
  - P04, P05, P11 and P20: Aggressive occupancy (0-15 d: -30% at 10% occupancy up to 0% at 100%) and default Booking Recency (5-15%).
  - Last-minute: P04 5% gradual, P05 1% gradual, P11 / P20 0%.
- **Smoobu changes since 20 Nov 06:00Z** (`modifiedAt`):
  - P20: Airbnb 5 Dec (1 n) £493.33, made 10:54 and cancelled 20:19:05. 5 Dec is open again at £512, min 1.
  - P11: Booking.com 28 Nov-2 Dec cancelled 22:08:32. A new Booking.com stay 27-30 Nov £687.73 was made at 23:06.
  - 3588993: blocks 20-28 Nov (made 18:21), plus 1-night blocks on 3, 8 and 15 Dec and 5 Jan (made 18:35-18:36). Who made them is NOT KNOWN.
  - P20 22-24 Nov rates changed with no PriceLabs push (C1).

---

### CRITICAL

**C1. P20 Waterford: Smoobu has 22-24 Nov at £266 / £266 / £250 (£782). PriceLabs last pushed £288 / £282 / £273 (£843). That is £61 lower (-7.2%), and the change was made outside PriceLabs.** (Sources: Smoobu `/api/rates` 07:18:04Z and 07:19:57Z; live `get_listing_prices` 3547481, last check about 07:40Z; `get_user_logs` listing 20-21 Nov; `raw/prices_3547481.json`; `prices.csv`.)
- **Timeline:**
  - Smoobu 20 Nov 07:19Z: 290 / 283 / 276, which equals the 19 Nov push.
  - PriceLabs refresh **20 Nov 09:20:45Z**: `price` 288 / 282 / 273, min 2.
  - On every other P20 date, Smoobu equals this push (for example 29 Nov 301, 3 Dec 312, 5 Dec 512, 26 Dec 543), so the 09:20Z push did reach Smoobu.
  - On 22-24 Nov, Smoobu now holds values that PriceLabs never produced.
  - There is no PriceLabs log entry for P20 and no PriceLabs refresh since 09:20:45Z.
- **So the change was made in Smoobu after 09:20Z on 20 Nov.** Smoobu has no rate-change history in its API, so who made it is NOT KNOWN.
  - The ratios differ by night (0.924 / 0.943 / 0.916), which looks like typed values rather than a % rule (inference).
  - Possible causes: a manual Smoobu override (most consistent with the data), a Smoobu-side rule, or a partial push failure. A PriceLabs DSO is ruled out: the live DSO is -5% min 2, `updated_at` 8 Nov 12:41:16Z.
- **The 19-22 Nov stay IS registered now.** 21 Nov shows Booked, `booked_date` 19 Nov, ADR £238.18. It was picked up by the 20 Nov 09:20Z refresh.
- **Refresh still stale.** P20 `last_refreshed_at` / `last_date_pushed` is **20 Nov 09:20:45Z**. It crosses 24 h at **09:20Z today** (about 22 h old at 07:40Z).
- **Min stay:** 22-24 Nov is min 2. It conflicts with policy `listing_facts.P20.min_stay` "3 nights to 30 Nov" (unchanged; confirm or revert).
- **Check in Smoobu:** Waterford Court > Rates 22-24 Nov (manual price?). **Check in PriceLabs:** 3547481 > last sync after 09:20Z today. If it does not refresh, a Sync Now is a user action; this audit does not trigger it. If Smoobu was edited by hand, the next PriceLabs push will overwrite it back to about £288 / £282 / £273.

**C2. t-pl-push-1811: the refresh gap is NOT shown to be fixed.** (Sources: `listing_data.json` `last_date_pushed`; `get_user_logs` timestamps; live `get_listing_prices` P14 / P20.)
- **The 22:49-22:54Z refreshes match Reyhan's saves.** P04, P05, P06, P11 and P13 each refreshed 20-60 s after one of Reyhan's DSO saves on that listing:

| Listing | Reyhan DSO saved | Refreshed |
|---|---|---|
| P11 3064196 | 22:50:18Z | 22:50:38Z |
| P13 3064856 / 3090701 | 22:50:45Z | 22:51:36Z / 22:51:40Z |
| P05 | 22:52:14Z | 22:52:38Z |
| P06 | 22:52:57Z | 22:53:14Z |
| P04 | 22:53:59Z | 22:54:25Z |
| P11 Vrbo | 21:10:15Z | 21:11:32Z |

  - So these look like save-triggered refreshes, not the nightly run (inference from timing).
- **Listings with no edit did not refresh overnight:**
  - **P20 is still 20 Nov 09:20:45Z** (C1).
  - **P14 refreshed at 21 Nov 07:17:56Z**, which is daytime again. It was 20 Nov 07:49:26Z in the snapshot.
- **The normal overnight group refreshed as usual:** P02 00:22Z, P07 03:56Z, P10 05:17Z, P01 04:22Z, P08 06:38Z, P09 06:46Z, P03 Channex 03:27Z.
  - Exception: P12 (+ Vrbo) refreshed at 22:50:07Z / 22:49:53Z with no P12 log entry. Cause NOT KNOWN.
- **Fourth day of the pattern.** Cause UNKNOWN: the nightly run skips these listings, a queue delay, or a push failure. Sync is on everywhere.
- **Check:** PriceLabs > Listings > last sync for P20 (and P04 / P05 / P06 / P11 / P13 tonight, with no edits). If they stay daytime-only, raise it with PriceLabs support.

### HIGH

**H1. New PriceLabs listing 3588993 "Scott Ellis Gardens": live and pushing to Smoobu, but not in `id_map.json`, `policy.json` or the info pack. Report only; nothing was mapped.** (Sources: `raw/listing_data.json`; live `get_customizations`, `get_listing_date_overrides` and `get_listing_prices` 3588993; `get_user_logs`; Smoobu `/api/apartments/3588993` and `/api/rates`.)
- **listing_data:**
  - smoobu, 3 bedrooms, lat/long 51.5282882 / -0.1761715 (London NW8; Smoobu address Scott Ellis Gardens, NW8 9RS; maxOccupancy 6, 2 bathrooms).
  - About 0.5 km from P05 Abbey Rd (51.5323 / -0.1787). These are different coordinates, so there is no sign of a duplicate.
  - **Base 295 / min 170 / max 4000.** **push_enabled true**, hidden false, group none.
  - Last push / refresh **20 Nov 17:35:54Z** (24 h at 17:35Z today).
  - Recommended base "Unavailable". Occupancy next 7 / 30 / 60: 100% / 27% / 13% (market 50% / 43% / 34%). No ADR history.
  - `channel_listing_details` absent.
- **Customizations:**
  - Engine defaults only: last-minute 0% (gradual), far-out premium market-driven (Balanced: 60 d out, rising to 20% at 197 d), occupancy "Market Driven", booking recency default (5-15%).
  - No seasonality, day-of-week, weekly or monthly discount, or min weekend price.
- **DSOs:** min-stay only: 27 Dec min 7, 28 Dec min 5, 29-31 Dec min 4 (Reyhan, 20 Nov 17:35Z). No price DSOs.
- **Prices 22 Nov-20 Jan:**
  - 50 Smoobu-open nights, **£174-£377**, total £12,722. The 20 open nights to 20 Dec come to £5,203.
  - Smoobu equals the PriceLabs `price` on every date checked (for example 28 Nov 331, 3 Dec 306, 31 Dec 376, 10 Jan 174).
  - Min stay 3-4 (5 / 7 at New Year). 0 nights at min or max.
- **Anomalies:**
  1. `user_price` / `booked_price` ("Your Price") reads **£4,000 (= max) on every open night** 28 Nov-20 Jan, while `price` and Smoobu are normal. It may be a leftover of the 17:29Z min 0 / max 0 setup. Effect UNKNOWN: confirm on the next push that Smoobu does not receive £4,000.
  2. PriceLabs still shows 3, 8 and 15 Dec and 5 Jan as open. The Smoobu blocks came after the last refresh, so PriceLabs is stale on availability.
  3. 22-27 Nov show occupancy 1 with a blank booking status.
- **Questions for Corentin:**
  - Is this a new managed property (P21?), with its channels, info-pack facts and min/base/max to confirm?
  - Should base 295 / min 170 / max 4000 stand?
  - Who made the 20 Nov Smoobu blocks, and why?
  - Add it to `id_map.json` / `policy.json` once confirmed.
  - No bedroom-matched (3 BR) row exists in `market.csv`, so base vs market is UNKNOWN.

**H2. Reyhan's 20 Nov 21:10-22:54Z DSO edits. These go to Corentin as confirm or revert; they are not new proposals.** (Sources: `get_user_logs`; live overrides; Smoobu 07:18Z.)
1. **P04 24-26 Dec +5%, min 2** (22:53:59Z).
   - **Conflicts with `listing_facts.P04.min_stay_rule`** ("never open for less than 3 nights").
   - Smoobu 190 / 192 / 190 (yesterday 181 / 177 / 174, min 4).
   - 23 Dec is now min 3 (was 4) at -5%: £170.
2. **P05 29 Nov-2 Dec -5%, min 3** (was -2%; 22:51:49Z).
   - 493 / 477 / 472 / 495 = **£1,937** (yesterday £1,967). This is deeper than the 18 Nov -2% that was already against "cut PriceLabs discounts".
   - Also: 7-8 Dec +3% -> **-1%** (467 / 450 = £917, was £970); 13-14 Dec +5% -> **no % (min 2)** (497 / 482 = £979, was £1,015).
3. **P05 4-31 Jan -8%, min 3** (22:52:14Z).
   - Smoobu 4-8 Jan fell 7-8% (for example 429 -> 398, 421 -> 387).
   - Min 3 in the 2-4-month band (policy 5 from 20 Jan).
4. **P11 2 Jan-28 Feb -8%, min 3** (22:50:18Z, + Vrbo).
   - Smoobu 3-10 Jan fell £6-£9 per night (for example 200 -> 191).
   - Min 3 from 20 Jan is under policy 5.
5. **P11 22 Nov-7 Dec -2%, min 2.** Saved first as -5% min 3 at 21:10:15Z, then -2% min 3, then min 2 at 22:49:52Z.
   - Open nights: 22-26 Nov 187 / 184 / 200 / 197 / 218; 30 Nov-4 Dec 182 / 184 / 209 / 215 / 260.
   - This includes the 18 Nov P11 3-4 Dec -2% (now 215 / 260).
6. **P13 10-26 Dec -2%, min 3** on 3064856, copied to 3090701 and Vrbo (22:50:45Z).
   - 3064856 13-19 Dec fell from 240-266 to **209 / 205 / 203 / 207 / 215 / 228 / 234** (£1,715 -> £1,501, -£214 over 7 nights).
   - The 3090701 DSOs are now identical to 3064856.
7. **P06 23 Nov +25%, min 1** (+20% at 22:52:45Z, then +25% at 22:52:57Z).
   - The orphan is now sellable at £275 (was £255, min 2).
   - P06 is an intentional-block property: numbers only.
- **Check:** each listing > Calendar > DSO on the dates above.

**H3. Reyhan's 18 Nov conflicts: NOT reverted.** (Live overrides.)
- **P13 1 Dec +25%, min 1** (`updated_at` 18 Nov 12:14:53Z, on both twins). Policy says +50%.
  - 3064856 **£226** (yesterday £229); 3090701 **£158** (£161).
  - 3090701 is below its uncustomized £167 even with +25%. Cause NOT KNOWN.
- **P11 darts 14-18 Dec -2%.**
  - 16-18 Dec unchanged (18 Nov 12:14:18Z).
  - **14-15 Dec re-saved 20 Nov 22:50:01Z at -2% with min 3 -> 2.**
  - Policy (21 / 24 Oct): +5%, "leave as it is".
  - 14-17 Dec 219 / 221 / 229 / 252: **average £230.25** (£230.00). 14-18 Dec average £246.80.
  - Revert = +5%.
- P05 29 Nov-2 Dec and P11 3-4 Dec: deepened or extended, see H2.

**H4. P20 5 Dec and 26 Dec: +100%, min 1, unchanged** (DSO `updated_at` 18 Nov 12:17:39Z / 12:17:57Z).
- **5 Dec £512** (yesterday £528). **26 Dec £543** (£571). Together **£1,055** vs the plan of about £537 (+96%).
- 5 Dec sold overnight on Airbnb for £343.33 room (0.650 x the £528 then in Smoobu) and was cancelled the same day (20:19). So the +100% does not stop a sale. The guest-facing paid rate is the channel agent's part.
- **Check:** 3547481 > DSO 5 Dec / 26 Dec: confirm +100%, or set it to the plan (min 1 kept).

**H5. a-discount-cut: not done.** All four targets have the same customizations as 18-20 Nov (H-section sources; `disc21.py`; gap = uncustomized minus pushed `price`, on Smoobu-open nights, raw window from 22 Nov).

| Listing | Next 13 (22 Nov-3 Dec, net) | Next 30 (22 Nov-20 Dec, net) | Next 30 positive-only |
|---|---|---|---|
| P05 | 4 n £246 (-11.3%) | **8 n £780 (-16.9%)** | £780 |
| P04 | 2 n -£200 (2 Dec +200% DSO) | 17 n -£11 (+0.4%) | £232 |
| P11 | 9 n £46 (-2.5%) | 16 n £136 (-3.7%) | £203 |
| P20 | 3 n -£9 | 9 n £4 (5 Dec +100%) | £166 |
| **Four targets** | **£83** (20 Nov £29) | **£909** (20 Nov £905) | **£1,381** (20 Nov £1,419) |

- P05 rose from £698 to £780 on the deeper DSOs (H2), which are DSO cuts rather than customizations.
- P20 uses PriceLabs `price` (288 / 282 / 273), not the lower Smoobu 22-24 Nov rates (C1).
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment (Aggressive), Booking Recency Factor (default) and Last Minute (P04 5%, P05 1%).

**H6. Plan items (PriceLabs side)** (Smoobu 07:18:04Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| **t-p04-xmas-1711** | **Changed by Reyhan** (H2): 23 Dec -5% min 3; 24-26 Dec +5% min 2 | 20-26 Dec **149 / 168 / 166 / 170 / 190 / 192 / 190 = £1,225** (£1,216). Min 3/3/3/3/2/2/2. 23 Dec now sells as 23-27 (3 n before the 27 Dec stay); 26 Dec alone still cannot sell (min 2, 1 night). 20 Dec fell 168 -> 149 |
| a-p04-dec-1611 | **Not done.** -5% DSO 6-22 Dec unchanged (11 Nov 17:16:47Z) | 6-16 Dec **£1,544** (£1,561); 17-19 Dec **142 / 146 / 151** (144 / 149 / 153) |
| a-p12-trim | Engine-driven, DSOs unchanged (min 2 only, 30 Nov-3 Dec, 15 Nov) | 30 Nov 268 (268), **1 Dec 283** (282; target about 245), **2-3 Dec 286 / 296** (285 / 297; target about 250 / 255) |
| t-p12-26nov-price | Not fixed. DSO +15% min 1 (4 Nov 01:24:21Z) | 26 Nov **£310** (£311); target about £224 (**+£86**) |
| a-p05-dec | Open; Reyhan changed 29 Nov-2 Dec / 7-8 / 13-14 Dec (H2). +300% min 1 on 21 / 29 Dec unchanged (9 Nov) | 21 Dec **£2,010** (£2,049), 29 Dec **£2,398** (£2,540); 7-8 Dec **£917** (£970); 13-14 Dec **£979** (£1,015) |
| t-p11-8dec-orphan | Unchanged. DSO +50% min 1 (15 Nov 18:48:33Z) | 8 Dec **£309** (£311); target about £150 |
| t-p13-twins | **Not fixed; gap narrower in Dec** | **138 of 148** jointly open nights in the next 180 are identical. One identical run, **21 Dec-19 May**. They differ only on 27 Nov (266 / 186), 1 Dec (226 / 158) and **13-20 Dec (3064856 about 6% dearer: 209-234 vs 198-221; was about 15%)**. The DSO sets are now identical on both twins |
| P20 5 / 26 Dec +100% | Unchanged (H4) | £512 / £543, min 1 |
| t-pl-push-1811 | **Not shown fixed** (C2) | P20 stale since 20 Nov 09:20Z; P14 daytime 07:17Z |
| P11 30 Nov-2 Dec reopened | Open after the cancellation | **30 Nov 182, 1 Dec 184, 2 Dec 209** (min 2, -2% DSO). With 3-4 Dec it is a 5-night run 30 Nov-4 Dec = **£1,050** (182 / 184 / 209 / 215 / 260) |

- **P11 Booking.com change, PriceLabs side only:**
  - Net nights: 28 Nov-1 Dec (4 n, £605.29 room) became 27-29 Nov (3 n, £538.73 room). That is -1 night and -£66.56 room.
  - The P11 refresh at 22:50:38Z pushed 27-29 Nov at **251 / 257 / 190 = £698**, 16 min before the 23:06 booking. The Smoobu values before that refresh were 262 / 268 / 197 = £727.
  - ceil(x1.15) Standard = **£804** (or £838 on the earlier values). Paid £538.73 = **0.670x** (or 0.643x).
  - Which value Booking.com held at 23:06 is NOT CHECKED. The promotion stack is for the channel agent.

### MEDIUM

**M1. Sync (open nights, Smoobu 07:18Z vs PriceLabs, 22 Nov-20 Jan)**
- **P20 22-24 Nov: -£22 / -£16 / -£23** (C1).
- **P13 3090701, 14 / 15 / 20 Jan: Smoobu 165 / 169 / 186 vs PriceLabs `price` 162 / 166 / 189** (±£3, live check at about 07:35Z, refresh 20 Nov 22:51:40Z). Cause UNKNOWN (sync off / Smoobu override / DSO / push failure). There is no DSO beyond the -10% 2 Jan-28 Feb (4 Nov), which also applies to 3064856. Small: check at the next push.
- **P14 25 Dec-2 Jan (9 nights) showed £3-£22 differences against the snapshot raw (07:14Z)**: a timing effect.
  - P14 refreshed at 07:17:56Z, and live `price` now equals Smoobu (for example 28 Dec 633, 31 Dec 669).
  - The Dispatcher's "3 mismatches" and the kpi `prices.csv` (Smoobu read before 07:17:56Z) both pre-date it.
- Every other Smoobu listing: 0 differences over £2, and min stay matches. The only availability difference is 3588993 (H1).
- `kpi_pack` `sync_issues` / `bounds` are null at the top level; per-property fields were not used.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:18Z, `an21.py`). Policy: 2-3 nights to 20 Jan; 5 from 21 Jan; 7 from 21 Mar.
- **Unsellable 1-night orphans:**
  - P04 24 Nov: £144, min 3 (P04 rule, numbers only).
  - P09 25 Apr: handback, ignored.
  - **P06 23 Nov is now sellable** (min 1, £275, H2).
- **Sellable short gaps a gap-fill rule would cover:**
  - **P20 22-24 Nov** (3 n, 266 / 266 / 250, min 2).
  - P20 5 Dec and 26 Dec (min 1).
  - P13 27 Nov and 1 Dec (min 1).
  - P12 26 Nov (min 1).
  - P11 8 Dec (min 1) and 23-25 Dec (285 / 256 / 267, min 2).
  - P05 7-8 and 13-14 Dec (min 2); 21 and 29 Dec (min 1).
  - P04 2 Dec (deprioritised).
- **Below 3 that conflicts with policy:**
  - P04 24-26 Dec min 2 (H2).
  - P20 22-24 Nov min 2 (C1).
- **Above 3 inside 2 months:** P14 Fri-Sun min 4 (special).
  - 3588993 min 4 on Fri-Sun (unmapped; no policy yet).
  - P04 23-26 Dec min 4 is gone (now 3 / 2).
- **21 Jan-20 Mar, below 5:**
  - P11 39 / 59, P13 45 / 59 per twin, P05 32 / 50, P20 51 / 59 and P04 39 / 59.
  - P14 33 / 59 (special).
  - The new P05 / P11 January DSOs set min 3.
- **21 Mar on, below 7:**
  - P11, P13 and P20 are 60 / 60.
  - P05 (0 / 53) and P04 (0 / 60) comply.
  - P14 36 / 60 (special).
- `kpi_pack` `gaps` is [] for every ref.

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 74 of 180 (41.1%) at the £450 minimum**, 21 Nov-15 Mar (20 Nov: 76). Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.** Open nights: P04 159, P11 156, P13 148 per twin, P20 147, P05 130, P06 8, P12 5, P09 1.
- 3588993: 0 of 50 (22 Nov-20 Jan).

**M4. Base vs market** (bases unchanged; latest bedroom-matched rows in `data/snapshots/2026-11-20/market.csv`, base vs P50 / P75)
- P12 284 vs 205 / 234: **+38.5% / +21.4%**
- P20 330 vs 257 / 322: +28.4% / +2.5%
- P04 200 vs 174 / 215: +14.9% / -7.0%
- P13 250 vs 222 / 273: +12.6% / -8.4%
- P11 286 vs 293 / 335: -2.4% / -14.6%
- P05 550 vs 567 / 695 (4 BR): -3.0% / -20.9%
- P01 253 vs 268 / 338: -5.6% / -25.1%
- P06 357 vs 414 / 529: -13.8% / -32.5%
- UNKNOWN (no row): P02, P03, P07, P08, P09, P10, P14 and **3588993** (3 BR).
- P20 `recommended_base_price` is 351 against a base of 330 (policy 24 Oct says 350).

**M5. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json` and `build/properties.py`, both last modified 18 Nov 06:53 and likely out of date)
- **21 PriceLabs listings, all push on, none hidden.** New: 3588993 (H1). It is not in id_map, policy or the pack.
- **Vrbo copies:**
  - P11 `_7fd3…` pushed 20 Nov 21:11:32Z.
  - P13 `_3d48…` pushed 23:04:21Z.
  - P12 `_386e…` pushed 22:49:53Z.
  - P02 `_ca1c…` has not pushed since 24 Feb.
  - Reyhan's DSOs are copied from parent to the P11 / P13 Vrbo copies and to 3090701 (`add_custom_pricing_from_parent`). So **3090701 is set up as a child of 3064856 in PriceLabs.**
  - Question: should the Vrbo copies push at all, and is 3090701 meant to inherit 3064856's DSOs (twin rule)?
- **Unchanged since 20 Nov:**
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 3064856 / 3090701 are at identical coordinates, which is one flat (policy).
  - P03 is priced via Channex (pushed 21 Nov 03:28Z).
  - P15-P19 have no PriceLabs listing.
  - P20 is not in the info pack.
  - The pack vs PriceLabs min / base / max differences are as listed 19 Nov.

Data gaps:
1. Who changed the P20 22-24 Nov Smoobu rates is NOT KNOWN: Smoobu has no rate audit in its API, and PriceLabs has no P20 log. Who made the 3588993 Smoobu blocks is also NOT KNOWN.
2. The cause of the daytime-only / edit-triggered refreshes (fourth day) is UNKNOWN. So is the P12 22:50Z refresh with no edit.
3. The effect of the 3588993 `user_price` £4,000 is UNKNOWN until the next push. So are why 3090701 1 Dec is under its uncustomized price despite +25%, and the 3090701 ±£3 Jan differences.
4. No 21 Nov `market.csv`; there is no 3-BR benchmark for 3588993.
5. Not re-read live today: P14 and P06 overrides; P13 / P11 Vrbo overrides; account and group customizations (logs show no changes). The raw window ends 20 Jan, so sync after that is NOT CHECKED.
6. P11 Booking.com: which rate (251/257/190 vs 262/268/197) Booking.com held at 23:06 is NOT CHECKED, and the promotion stack belongs to the channel section.
7. Process: 5 PriceLabs read calls were sent in two parallel batches by mistake (see Sources). All were read only.

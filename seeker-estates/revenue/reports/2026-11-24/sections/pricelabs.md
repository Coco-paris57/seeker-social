## PriceLabs audit (D = 2026-11-24)

**Sources**
- Snapshot `data/snapshots/2026-11-24/`: `raw/listing_data.json` (21 listings, none added or removed), `raw/prices_*.json` (window 25 Nov 2026-23 Jan 2027, 17 files incl. 3588993), `listings.csv`, `prices.csv`, `reservations.csv`. Baseline: `data/snapshots/2026-11-23/raw/*`, `reports/2026-11-23/sections/pricelabs.md`, Smoobu rates 23 Nov 07:19:58Z (`scratchpad/pl23/smoobu_rates.json`).
- Market: `data/snapshots/2026-11-24/market.csv` was absent, so it was copied forward from `2026-11-23/market.csv` under flock (`.market.csv.lock`). No rows added. Latest bedroom-matched rows are from 23 Nov (3588993 also has a 22 Nov row).
- Live PriceLabs reads, 24 Nov about 07:15-07:35Z, all 200, all read only. No write, sync or refresh tool was called.
  - `get_user_logs`: listing, group and account logs, 23-24 Nov. **Process note:** the group and account log reads went out together in one message, which breaks the one-call-at-a-time rule. Both were read-only and both returned 0 entries. Every other call went out alone.
  - `get_listing_date_overrides`: P12 2699998, P13 3090701.
  - `get_customizations`: P13 3090701 (all), P05 3166592 (occupancy, booking recency, last-minute).
  - `get_listings` and `get_listing_data`: P14 3267077, P11 Vrbo copy `_7fd3…` (push timestamps).
- Live Smoobu reads (GET only):
  - `/api/rates` for 16 apartments, 24 Nov 2026-23 May 2027, taken **07:20:44Z**.
  - `/api/reservations` for 15 Nov 2026-31 Dec 2029. Only dates, created and modified times, type, channel, amount and commission were kept. No guest fields of any kind.
- Scripts and data are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/pl24/`:
  - Scripts: `an24.py` (sync, floor, orphans, min stay), `det24.py` (per-date detail, day on day), `disc24.py` (discount gap).
  - Data: `smoobu_rates.json`, `smoobu_res.json`.
- **Policy respected:**
  - Blocks on P02, P03, P06 and P07 are intentional (P06 gets numbers only). P14 is a special setup (numbers only). P13 is one flat.
  - The 15% / 20% stay discounts and the Booking.com Visibility Booster are policy. P04 is never under 3 nights. Handbacks (P01, P08, P09, P10, P12 after 13 Dec) are excluded.
  - Reyhan's edits that conflict with policy go to Corentin as **confirm or revert**.
- **Smoobu timestamps** are shown as Smoobu returns them. New evidence that they are **CET (UTC+1)**: Smoobu logs the P12 cancellation at 21:46:04, but PriceLabs had already registered 4-6 Dec as open at its 21:20:10Z refresh. That only works if 21:46:04 is 20:46:04Z. Yesterday's P11 timing fits the same reading. It is still NOT CONFIRMED.

### Changes since 23 Nov 06:00Z
- **PriceLabs listing logs: 2 new entries, both one save by Reyhan.** Group and account logs: 0. There is no `remove_custom_pricing` entry.
  - **23 Nov 21:18:56Z: P12 2699998, 4-6 Dec, min stay 2 with no %** (live override `updated_at` 21:18:56Z). Copied to the P12 Vrbo copy `_386e…`. It came from IP `2a04:4a43:…`, the same address as the 22 Nov 3588993 base change. Reyhan's 23 Nov 00:07-00:17Z edits came from `2a01:4b00:…`.
  - Nothing else since 23 Nov 00:17:37Z. **No edit on P04, P05, P06, P11, P13, P20 or 3588993.**
- **Settings** (`listing_data.json`, 23 vs 24 Nov): every base, min, max, push and hidden flag is unchanged on all 21 listings.
- **Customizations:** P05 is unchanged: Aggressive occupancy (down to -30% within 15 days at low occupancy), default Booking Recency, last-minute 1% gradual. P04, P11 and P20 were not re-read today. Their customization changes would not show in the logs.
- **Smoobu changes** (`modifiedAt`, Smoobu clock):
  - **P12: Booking.com 4-7 Dec cancelled** (21:46:04; made 5 Nov; room £677.79, commission £124.17 in `reservations.csv`). 4-6 Dec is open again (H3).
  - **3588993 blocks reworked** (23 Nov 10:58-10:59). The 20 Nov-10 Dec block was modified, and the 3-4 Dec, 8-9 Dec and 5-6 Jan blocks were cancelled. New 1-night blocks: 15 Dec, 6 Jan, 12 Jan. **29 Nov-2 Dec, 4-7 Dec and 9 Dec are now closed.** Those 9 nights were open yesterday at £4,372 (Smoobu). 5 Jan reopened at £321 (H4).
  - **P11** (23 Nov 10:54-10:55): a block on 18-20 Nov (past dates) was made, and a second 22-27 Nov block was made and cancelled within a minute. The Booking.com 27-30 Nov stay was modified at 15:21:12. The **5 Jan 2027-31 Jul 2029 block is unchanged** (C1).
  - No new booking.

---

### CRITICAL

**C1. t-p11-block2029-2311: P11 Camden Smoobu "Blocked channel" block from 5 Jan 2027 to 31 Jul 2029 is still there** (made and last modified 22 Nov 12:18:28; type reservation). It is not in `policy.json` handbacks. (Sources: Smoobu `/api/reservations` and `/api/rates` 07:20:44Z; `raw/prices_3064196.json`, where 5 Jan onwards is `Blocked` at the 00:30:43Z refresh.)
- Open nights in the next 180: **19** (yesterday 20).
- **3-4 Jan is still an unsellable 2-night orphan at min 3:** **151 / 163 = £314** (yesterday 144 / 155 = £299). Uncustomized is 205 / 222. The -8% min 3 DSO (2 Jan-28 Feb) is unchanged.
- Who made the block is NOT KNOWN. Smoobu has no author field.
- **Question for Corentin (unchanged):** is Camden being handed back after 4 Jan? If yes, add it to `policy.json` handbacks with last night 4 Jan, and 3-4 Jan needs min 2 to sell. If no, remove the block in Smoobu.
- **Check:** Smoobu > Camden calendar from 5 Jan, and PriceLabs 3064196 > Calendar 3-4 Jan (min stay).

### HIGH

**H1. t-pl-push-1811 (day 7): the first clean overnight refresh. P04, P05, P06, P11, P20 and 3588993 refreshed and pushed at 00:30:42-00:31:19Z on 24 Nov with no edit logged on any listing after 23 Nov 21:18:56Z.** P12 and P13 refreshed in the evening instead. (Sources: `raw/listing_data.json` and `raw/prices_*.json` `last_refreshed_at` / `last_date_pushed`; `get_user_logs`; live `get_listing_data` for P14.)

| Listing | Last logged edit | Refresh / push | Reading |
|---|---|---|---|
| P12 2699998 | **23 Nov 21:18:56Z** (4-6 Dec min 2) | 23 Nov 21:20:10Z / 21:20:11Z | **Edit-triggered (74 s later)** |
| P12 Vrbo `_386e…` | 21:18:56Z (copied from parent) | 21:19:27Z / 21:19:39Z | Edit-triggered |
| P13 3064856 / 3090701 | 23 Nov 00:08:04Z | 23 Nov 21:35:19-20Z / 21:35:20-21Z | **No edit.** Trigger NOT KNOWN |
| P13 Vrbo `_3d48…` | 23 Nov 00:08:04Z | 21:46:16Z / 21:50:29Z | No edit |
| P05 3166592 | none in 23-24 Nov logs | **24 Nov 00:30:42Z / 00:30:43Z** | **Clean** |
| P11 3064196 | 23 Nov 00:07:04Z | **00:30:43Z / 00:30:43Z** | **Clean** |
| P06 3288517 | 23 Nov 00:11:07Z | **00:31:04Z / 00:31:04Z** | **Clean** |
| P04 3562176 | 23 Nov 00:14:34Z | **00:31:07Z / 00:31:08Z** | **Clean** |
| P20 3547481 | none in 23-24 Nov logs | **00:31:11Z / 00:31:12Z** | **Clean** |
| 3588993 | 23 Nov 00:17:37Z (base) | **00:31:18Z / 00:31:19Z** | **Clean** |
| P14 3267077 | none | 24 Nov 06:57:34Z / **06:57:35Z** (live) | Pushed; just after 06:00Z |
| P11 Vrbo `_7fd3…` | 23 Nov 00:07:04Z | refresh 24 Nov 02:26:49Z / **push still 23 Nov 00:09:05Z** (live) | **Refreshed without pushing** (M4) |

- The usual overnight group ran too: P02 00:23:08Z, P03 (Channex) 03:31:31Z, P07 03:41:48Z, P01 04:14:16Z, P10 04:36:43Z, P08 06:22:48Z, P09 06:28:25Z.
- **Nothing is stale at 07:20Z.** Every Smoobu listing pushed within 24 h. P12 reaches 24 h at **21:20Z tonight** and the P13 twins at **21:35Z**, unless the overnight run picks them up again.
- **What it would take to close:**
  1. A **second clean night, 24 to 25 Nov.** With no logged edit after now, all nine Smoobu listings (P04, P05, P06, P11, P12, both P13 twins, P20, 3588993) must show a refresh **and** push between 00:00 and 06:00Z on 25 Nov.
  2. **P12 and P13 in particular** must refresh overnight. Tonight they were refreshed in the evening, so whether they belong to the nightly run is still unproven.
  3. P14 must push within 24 h of its last push (06:57:35Z today).
  4. Smoobu must still equal PriceLabs (0 mismatches over £2) at the 07:20Z check.
  - If all of these hold on 25 Nov, close t-pl-push-1811 and drop the support ticket. If the six go back to daytime-only, raise the ticket with the 9 IDs.
- **Check:** PriceLabs > Listings > Last Sync for these IDs on 25 Nov. Sync Now is a user action; this audit does not trigger it.

**H2. a-reyhan-2011: none reverted. The only new edit is P12 4-6 Dec min 2 (no %), which is in line with policy.** (`get_user_logs` 23-24 Nov: no `remove_custom_pricing`; Smoobu 07:20:44Z vs 23 Nov 07:19:58Z.) Engine moves only, no edits:
- **P04 24-26 Dec +5% min 2** (20 Nov 22:53:59Z). This breaches `listing_facts.P04.min_stay_rule`. Smoobu **175 / 188 / 185** (yesterday 187 / 190 / 187).
- **P05:**
  - 29 Nov-2 Dec -5% min 3: **503 / 489 / 484 / 490 = £1,966** (£1,980).
  - 7-8 Dec -1% min 2: **429 / 407 = £836** (£835); uncustomized 567 / 517.
  - 13-14 Dec, no % and min 2: **483 / 477 = £960** (£964); uncustomized 602 / 573.
  - 4-31 Jan -8% min 3 is unchanged.
- **P11:**
  - 27 Nov-7 Dec -2% min 2. Open 30 Nov-4 Dec **196 / 195 / 204 / 230 / 261 = £1,086** (£1,037; +£49 with no edit).
  - 2 Jan-28 Feb -8% min 3: moot from 5 Jan (C1).
- **P13:**
  - 1 Dec +25% min 1 (policy `intentional_overrides.P13`: +50%): 3064856 **£235** (uncustomized 244); 3090701 **£188** (178).
  - 10-26 Dec -2% (min 2 on 14-16 Dec; 20-21 Dec now no %).
  - 2-31 Jan -8% min 3: 3090701 live `updated_at` 23 Nov 00:08:04Z.
- **P11 darts 14-18 Dec -2%** (policy 21 Oct: average above £300): 14-17 Dec **203 / 213 / 223 / 244, average £220.75** (£223.50); 18 Dec **£309** (£314).
- **Check:** each listing > Calendar > Date Specific Overrides on the dates above.

**H3. P12 4-6 Dec reopened after the Booking.com cancellation: £312 / £332 / £271 = £915, min 2. PriceLabs and Smoobu agree. The nights join 30 Nov-3 Dec into one 7-night open run before the 7-14 Dec stay.** (Smoobu 07:20:44Z; `raw/prices_2699998.json` refresh 21:20:10Z; live overrides.)
- **Handback:** last night is 13 Dec (`policy.json` handbacks.P12), so 4-6 Dec is still live inventory.
- **Prices:**
  - 4-6 Dec is **8.3% under uncustomized** (340 / 370 / 288 = £998). The DSO has no %, so the cut comes from customizations (not read today on P12).
  - The cancelled stay paid **£677.79 room** for those 3 nights, 0.74x today's £915 Smoobu.
  - Yesterday's Smoobu figures for these nights, while booked, were 322 / 343 / 277.
- **Min stay:** 2 on every night of 30 Nov-6 Dec (30 Nov-3 Dec DSO 15 Nov 18:47:42Z; 4-6 Dec DSO 23 Nov 21:18:56Z). That is within policy (2-3 nights).
- **Orphan risk:** the run is 7 nights at min 2, bounded by 29 Nov (booked) and 7 Dec (booked check-in).
  - Two short stays can strand single nights. For example, 30 Nov-2 Dec plus 3-5 Dec leaves 6 Dec (£271) alone at min 2, and 1-3 Dec leaves 30 Nov (£242) alone.
  - A gap-fill rule (1-night minimum on gaps of 1 night) would sell such a leftover. Whether PriceLabs Orphan Day settings are on for P12 is UNKNOWN (not read).
- **Whole run 30 Nov-6 Dec:** 242 / 241 / 256 / 275 / 312 / 332 / 271 = **£1,929**.
- **Check:** 2699998 > Customizations > Orphan Day / gap-fill, and Calendar 30 Nov-6 Dec.

**H4. Scott Ellis Gardens 3588993 (t-scott-ellis-2011): base 450 unchanged. 9 nights (29 Nov-2 Dec, 4-7 Dec, 9 Dec) were closed in Smoobu on 23 Nov 10:58 (Smoobu clock). Still unmapped.** (Smoobu `/api/reservations` and `/api/rates`; `raw/listing_data.json`; `market.csv`.)
- **The closed nights were open yesterday at £4,372** (479 / 449 / 427 / 443 / 547 / 570 / 518 / 500 / 439). No PriceLabs log covers this: it was a Smoobu block change, author NOT KNOWN. New 1-night blocks were added on 15 Dec, 6 Jan and 12 Jan, and 5 Jan reopened (£321).
- The first open night is now 10 Dec. Open nights in the next 180: **156** (yesterday 165).
- **Market:** 3 BR Nearby Listings n=148, 23 Nov row. **Base 450 is +17.2% vs P50 £384 and -5.3% vs P75 £475.**
- **Floor and ceiling:** 0 of 156 open nights are at min 170 or max 4000. Max 4000 is 8.9x base.
- **Question for Corentin:** are the 29 Nov-9 Dec blocks intended (owner use? works?), and is this P21 for `id_map.json`, `policy.json` and the pack?
- **Check:** Smoobu > Scott Ellis Gardens calendar 29 Nov-9 Dec, and PriceLabs 3588993 > Base and Max.

**H5. a-discount-cut: not done. P05's targeted layers are unchanged (live).** (`disc24.py`. Gap = uncustomized minus pushed `price`, on Smoobu-open nights. Window 25 Nov-20 Dec. Raw starts 25 Nov, so this is not like for like with yesterday's 24 Nov start.)

| Listing | 25 Nov-4 Dec (net) | 25 Nov-20 Dec (net) | 25 Nov-20 Dec positive-only |
|---|---|---|---|
| P05 | 4 n -£4 | **8 n £459** (-10.9%) | £472 |
| P04 | 1 n -£225 (2 Dec +200%) | 12 n £108 | £333 |
| P11 | 7 n -£86 | 13 n -£71 | £62 |
| P20 | 0 n | 6 n -£26 (5 Dec +100%) | £156 |
| **Four targets** | **-£315** | **£470** (yesterday £634) | **£1,023** (£1,161) |

- The fall comes from the shorter window and from P11 rising above uncustomized. No setting changed.
- **Check:** 3166592 / 3562176 / 3064196 / 3547481 > Customizations > Occupancy Based Adjustment (Aggressive), Booking Recency Factor (default), Last Minute (P04 5%, P05 1%).

**H6. Plan items (PriceLabs side)** (Smoobu 07:20:44Z vs 23 Nov 07:19:58Z)

| Item | Status | Today (yesterday) |
|---|---|---|
| t-pl-push-1811 | **First clean night** (H1) | 6 listings refreshed 00:30-00:31Z with no edit; P12 edit-triggered 21:20Z; P13 21:35Z, no edit |
| t-p11-block2029-2311 | **Block still there** (C1) | 3-4 Jan orphan **151 / 163 = £314**, min 3 |
| t-p04-xmas-1711 | Unchanged DSOs; engine only | 20-26 Dec **160 / 160 / 159 / 162 / 175 / 188 / 185 = £1,189** (£1,209); 24 Dec 187 -> 175; 24-26 Dec min 2 |
| a-p04-dec-1611 | Not done beyond Reyhan's -2% | 6-9 Dec **168 / 170 / 169 / 166** and 14-19 Dec **144 / 148 / 151 / 153 / 157 / 163** = **£1,589** (£1,585); uncustomized £1,882 (-15.6%) |
| a-p12-trim | **Engine moved toward target, no edit** | 30 Nov-3 Dec **242 / 241 / 256 / 275 = £1,014** (£1,090); targets about 235 / 250 / 250 / 260 = £995. Now -£19 from target, with 4-6 Dec added (H3) |
| t-p12-26nov-price | Not fixed; DSO +15% min 1 (4 Nov 01:24:21Z) | 26 Nov **£294** (£307); uncustomized £216; target about £224-230 |
| a-p05-dec | Open; +300% min 1 unchanged | 21 Dec **£2,194** (£2,215; uncustomized £734); 29 Dec **£2,247** (£2,392; uncustomized £888); 29 Nov-2 Dec £1,966; 7-8 Dec £836; 13-14 Dec £960 |
| t-p05-valentine-2211 | Open in both systems | 13-16 Feb **438 / 408 / 417 / 420 = £1,683**, min 4 (£1,688); -5% min 4 DSO unchanged |
| t-p11-8dec-orphan | DSO +50% min 1 unchanged (15 Nov 18:48:33Z) | 8 Dec **£245** (£233; uncustomized £207). Target about £150-159 |
| t-p13-twins | **Gap reopened slightly, no edit** | 152 jointly open nights; 123 identical (yesterday 148 of 150). 3090701 is now **+£8-9 a night on 13-21 Dec** (£1,893 vs £1,820, +4.0%) and +£1 on 18 January nights. 27 Nov **265 / 212**, 1 Dec **235 / 188** (3090701 +£29 / +£25 overnight). 3090701 DSOs unchanged (live, latest `updated_at` 23 Nov 00:08:04Z). Cause NOT KNOWN; candidates are the occupancy / booking-recency layers |
| P20 5 / 26 Dec +100% | Unchanged (18 Nov) | 5 Dec **£582** (£591; uncustomized £400); 26 Dec **£509** (£508; uncustomized £339); min 1 |

### MEDIUM

**M1. Sync (Smoobu 07:20:44Z vs PriceLabs `price`, 25 Nov-23 Jan open nights): 0 differences over £2 on all 16 Smoobu listings, incl. P14 and 3588993.** Availability and min stay match too.
- `kpi_pack` `sync_issues` is [] for every ref.
- 24 Nov is outside the raw window. Smoobu has P04 £136, P11 £209 and P20 £222 open tonight.

**M2. Min stay and orphans, next 180 nights** (Smoobu 07:20:44Z, `an24.py`). Policy: 2-3 nights to 22 Jan; 5 from 23 Jan; 7 from 23 Mar.
- **Unsellable orphans:**
  - **P11 3-4 Jan**, 2 n at £151 / £163, min 3 (C1).
  - P04 24 Nov (tonight) £136, min 3 (P04 rule, numbers only).
  - P09 25 Apr £462, min 5 (handback, ignored).
- **Sellable short gaps a gap-fill rule would cover:**
  - P12 26 Nov £294 (min 1).
  - P13 27 Nov (265 / 212) and 1 Dec (235 / 188), min 1.
  - P11 8 Dec £245 (min 1) and 23-25 Dec **291 / 268 / 304** (min 2).
  - P05 7-8 Dec (429 / 407) and 13-14 Dec (483 / 477) at min 2; 21 Dec and 29 Dec at min 1.
  - P20 5 Dec and 26 Dec (min 1).
  - P06 2 Dec £363 (min 1; yesterday £349).
  - P04 2 Dec £423 (deprioritised).
  - **New: P12 30 Nov-6 Dec** carries leftover-night risk (H3).
- **Below 3 that conflicts with policy:** P04 24-26 Dec min 2 (H2). P20 tonight min 2 at £222; yesterday's report said record it, not revert.
- **2-4 months out, below 5:**
  - P13 47 / 59 per twin (unchanged). The 22-31 Jan nights are min 3 under Reyhan's -8% DSO.
  - P05 33 / 51, P20 50 / 59, P04 36 / 59, 3588993 47 / 59, P14 34 / 59 (special).
- **4+ months out, below 7:**
  - P13, P20 and 3588993 are 60 / 60.
  - P05 (0 / 56) and P04 (0 / 60) comply.
  - P14 34 / 60 (special).
- **Day-on-day min stay changes with no PriceLabs log:**
  - P05 22 May 10 -> 7.
  - P14 23 Jan and 24 Mar 5 -> 4.
  - P20 24 Mar 5 -> 4.
  - 3588993 22 Feb 4 -> 3.
  - These are most likely PriceLabs' own min-stay rules rolling with the date. NOT CONFIRMED.

**M3. Floor and ceiling, next 180 nights** (Smoobu open nights vs `listings.csv` min / max)
- **P14: 71 of 180 (39.4%) at the £450 minimum**, 24 Nov-21 Mar (yesterday 79 / 180). `kpi_pack` `bounds` next 30: 86.7%, average open price £450. Special setup: numbers only.
- **Every other listing: 0 at the minimum and 0 at the maximum.** Open nights: 3588993 156, P04 158, P13 151 per twin, P20 148, P05 137, P11 19, P12 8, P06 1, P09 1.

**M4. Listing hygiene and the info pack** (`listing_data.json`; `data/id_map.json`; `seeker-estates/build/properties.py`, both likely out of date)
- **21 PriceLabs listings, all push on, none hidden.**
- **New: the P11 Vrbo copy `_7fd3…` refreshed at 24 Nov 02:26:49Z without pushing.** Its last push is 23 Nov 00:09:05Z, over 24 h ago (live `get_listing_data`). That makes it push on but stale.
  - The P12 and P13 copies pushed at 21:19:39Z and 21:50:29Z.
  - P02 `_ca1c…` has not pushed since 24 Feb (known).
  - Question (unchanged): should the Vrbo copies push at all? They also inherit Reyhan's DSOs (`add_custom_pricing_from_parent`, P12 copy 21:18:56Z).
- **Unchanged:**
  - 3588993 is not in id_map, policy or the pack.
  - id_map entries not in PriceLabs: `_unmatched` Marylebone Vrbo x3; P01 / P04 / P08 / P09 / P10 `pricelabs_other`; P13 Vrbo `_d0a5…` / `_125c…`.
  - P13 twins are at identical coordinates (one flat, policy).
  - P03 is priced via Channex (pushed 03:31:35Z).
  - P15-P19 have no PriceLabs listing. P20 is not in the info pack.
- **Pack vs PriceLabs (unchanged; the pack is likely out of date):**
  - Mins match except P14 (pack 400, PriceLabs 450).
  - Every PriceLabs max is above the pack's.
  - Bases differ on P01, P04, P05, P06, P09, P11, P12, P13 and P14.
  - P05 is 5-bed in the pack but 4 in PriceLabs.
- **P12 handback block:** Smoobu shows 14 Dec 2026-29 Jun 2029 (made 14 Sep). `policy.json` says blocked 14 Dec 2026-21 Oct 2027. The nights are excluded either way. Fix the policy text or the block, whichever is wrong.
- `kpi_pack` `gaps` is [] for every ref. It misses the P11 3-4 Jan orphan and P04 24 Nov.

**M5. Base vs market** (`market.csv` 23 Nov rows, copied forward; base vs P50 / P75)
- P12 284 vs 205 / 235: **+38.5% / +20.9%**
- P20 330 vs 253 / 320: +30.4% / +3.1%
- 3588993 450 vs 384 / 475 (3 BR): +17.2% / -5.3%
- P04 200 vs 175 / 211: +14.3% / -5.2%
- P13 250 vs 220 / 270: +13.6% / -7.4%
- P11 286 vs 292 / 332: -2.1% / -13.9%
- P01 253 vs 262 / 337: -3.4% / -24.9%
- P05 550 vs 582 / 704 (4 BR): -5.5% / -21.9%
- P06 357 vs 414 / 528: -13.8% / -32.4%
- UNKNOWN (no row): P02, P03, P07, P08, P09, P10 and P14.
- `kpi_pack` `market_percentiles` are empty because `market.csv` was missing when the pack was built.

Data gaps:
1. Whether P12 and P13 are in the nightly run is NOT PROVEN, because both refreshed in the evening (P12 74 s after an edit; P13 with no edit, trigger NOT KNOWN). Only tonight (24 to 25 Nov) can settle it.
2. Why 3090701 rose +£25-29 (27 Nov, 1 Dec) and +£8-10 (13-21 Dec) with no DSO change is NOT KNOWN. Customizations have no history in the API.
3. Who changed the Scott Ellis Gardens and P11 Smoobu blocks on 23 Nov 10:54-10:59 (Smoobu clock) is NOT KNOWN. The Smoobu time zone (CET) is inferred, NOT CONFIRMED.
4. Not re-read live today: customizations on P04, P11, P20, P12 and 3588993; overrides on P04, P05, P11, P13 3064856, P20 and P06. Unchanged status for these rests on the logs (no add or remove entry since 23 Nov 00:17:37Z).
5. P12 Orphan Day / gap-fill settings: UNKNOWN (not read).
6. Prices pushed to Smoobu for P12 4-6 Dec at the time of the cancelled booking were not captured, so the 0.74x compares against today's prices.
7. No new market rows today. No row for P02, P03, P07-P10 or P14.
8. H5's window starts 25 Nov (raw), so it is not like for like with yesterday's.

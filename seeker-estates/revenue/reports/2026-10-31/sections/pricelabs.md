## PriceLabs audit (D = 2026-10-31)

**Sources**
- Snapshot `data/snapshots/2026-10-31/`:
  - `raw/listing_data.json` (06:55Z);
  - `raw/prices_*.json` (06:56-07:16Z). The window is **1 Nov-30 Dec**, so 31 Oct is not covered;
  - `prices.csv` (PriceLabs vs Smoobu), `listings.csv`, `reservations.csv` (Smoobu, room only).
- Baseline: `data/snapshots/2026-10-30/raw/*` and `reports/2026-10-30/sections/pricelabs.md`.
- **Live read-only calls, 31 Oct ~07:15-07:25Z, one at a time:**
  - `get_user_logs`: listing, group and account for 30-31 Oct, plus listing base/min/max changes since 1 Sep;
  - `get_listing_date_overrides` on 3562176 (P04), 3166592 (P05), 3064196 (P11), 3064856 (P13) and 3547481 (P20);
  - `get_customizations` (toggled_on=false) on P04, P05, P11, P12, both P13 listings, P20, P09, P08, P06 and P01;
  - `get_listing_data` (all 20 listings).
- `kpi_pack.json`:
  - `sync_issues` is [] on every property;
  - `bounds` is filled for 10 listings;
  - `market_percentiles` and `avg_open_price_next30` are null;
  - `gaps` is [] everywhere.
- Today's `market.csv` is empty, so base vs market uses `data/snapshots/2026-10-30/market.csv` (latest rows, pulled 30 Oct) and today's `raw/neighbourhood_P13.json`.
- Policy respected:
  - P02/P03/P06/P07 blocks, P14 special setup and handbacks;
  - P13 1 Dec (intentional), P04 2 Dec and P12 17 Nov (deprioritised);
  - the P11 darts "+5%, leave as is" instruction.
- Reyhan's edits that cross a standing decision are reported as conflicts for Corentin to confirm. They are not new proposals.

### What changed since 30 Oct 06:00Z
- **Logs:** reyhan@ made **35 listing edits on 30 Oct between 22:05:53Z and 22:12:33Z**, all Date-Specific Overrides. Group and account logs show 0 entries. There was no base, min or max change. The edits were on P11 (+ Vrbo copy), P13 (+3090701 and the Vrbo copy), P05, P20 and P04.
- **Overrides now in force** (live `get_listing_date_overrides`, `updated_at` 30 Oct 22:05-22:12Z):

| Ref | Dates | New override | Before (30 Oct section) |
|---|---|---|---|
| P04 | 1-2 Nov | **+50%, min 2** (set +25% at 22:12:05Z, then +50% at 22:12:14Z) | unbookable 2-night gap at min 3, £129 |
| P04 | 18-24 Nov | **-3%, min 3** | +15% min 2 on 18-20 and 23-25 Nov; -7% elsewhere |
| P05 | 9 Nov | **+300%, min 1** (set +100%, then +150%, then +300% between 22:09:21Z and 22:09:42Z) | min 2, £426 |
| P05 | 7-8 Dec | +3%, min 2 | earlier override |
| P11 | 31 Oct, 10 Nov | -3%, min 3 | - |
| P11 | 18-19, 22-25, 29 Nov-4 Dec, 8-9 Dec, **13-16 Dec** | -2%, min 2 | 13-16 Dec were min-only (no price) |
| P13 (3 listings) | 31 Oct | -1%, min 3 | - |
| P13 (3 listings) | 1-12 Nov | **min 2 only, no price** | +2% on 4-12 Nov |
| P20 | 27 Dec | min 6 (was 7) | - |
| P20 | Jan 2027 | -5%, min 3 | - |
| P20 | Feb 2027 | -5%, min 4 | - |

- **Customizations:** the raw values and the `effective` text are identical to 30 Oct on all 10 listings read. P06's market-driven last-minute is still "40% same-day to 0% after 13 days".
- **Catalogue:** `get_listing_data` returns the same 20 listings. Push is on for every listing; each listing's push status is under "Push freshness" below.
- **The edits triggered refreshes and pushes at 22:07-22:19Z** on P04, P05, P11, P13 (both listings + Vrbo), P20 and the P11 Vrbo copy (`listing_data.json`).

---

### CRITICAL
None. Today's Smoobu-pushed nights match PriceLabs, and no push-on listing other than the intentionally blocked P02 Vrbo copy is older than 24 h at 07:21Z.

### HIGH

**H1. P05 9 Nov orphan (a-p05-9nov): min 1 is now set, but it is priced at £1,442, so it will not sell**
- Sources: live overrides 3166592; raw `prices_3166592.json`; `prices.csv`.
- The DSO is **+300%, min 1**, set by reyhan@ at 30 Oct 22:09:42Z after +100% and +150%.
- PriceLabs and Smoobu both show **£1,442**, available, min 1. The uncustomized price is **£425**.
- That is **3.0x the 8 Nov rate (£483) and 3.2x the 10 Nov rate (£451)**, both booked. 9 Nov sits between Airbnb 6-9 Nov and Airbnb 10-16 Nov (`reservations.csv`).
- The plan item asked for min 1 at about £426.
- **Corentin to confirm:** is +300% intended? It makes the min-1 change useless.
- **Check:** PriceLabs 3166592 > Date Specific Overrides > 9 Nov.

**H2. Reyhan conflicts with standing decisions: status after the 30 Oct 22:05Z edits**
- Sources: live overrides; `get_user_logs`; raw prices; policy.json.

| Conflict | Policy | PriceLabs now | Price now | Status |
|---|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised.p12_17nov_override` (+50%) | -2%, min 2 (28 Oct 12:44:36Z, not edited) | **£234** (uncust £257); was £255 on 30 Oct | **Unchanged** |
| (b) **P11 darts 13-17 Dec** | 21 Oct "average above £300/night"; `darts_override_24oct` "+5%, leave as is" | **13-16 Dec now -2%, min 2** (30 Oct 22:07:10Z, was min-only); 17-18 Dec -2% min 2 | 13-17 Dec **£226 / £201 / £204 / £215 / £234 = £1,080, avg £216/night** (30 Oct £1,104) | **Wider gap**: a discount was added to nights policy says to raise |
| (c) **P04 min 3 / -8% on 1-25 Nov** | 24 Oct: -8% 1-25 Nov; "never open for fewer than 3 nights" | 18-24 Nov now **min 3**, -3%; **1-2 Nov +50% min 2 (NEW)**; 25 Nov +15% min 2 (booked); -7% on 3-17 Nov | 1-2 Nov **£231 / £231** at min 2 (uncust £197 / £207) | **18-19 and 23-24 Nov fixed (min 3). New conflict on 1-2 Nov (min 2)** |
| (d) **P20 min 2** | `listing_facts.P20.min_stay` 3 nights 25 Oct-30 Nov | 31 Oct-1 Nov still **+10% min 2** (27 Oct 14:38:39Z); 2-5 Nov -2% min 2 (booked) | 1 Nov **£232** (uncust £243) | **Not edited.** It runs out after 1 Nov: tonight 31 Oct + 1 Nov is the last 2-night window. From tomorrow 1 Nov is a 1-night orphan before the 2-6 Nov stay, unsellable at min 2 or 3. No open P20 night before 30 Nov is below min 3 after that |
| (e) **P13 base 235 -> 250** | Not in `price_changes` (the 24 Oct P13 entry covers overrides only) | **Logged**: `base_price` 235 -> 250 by reyhan@ on **24 Oct 21:14:47Z** (source reviewPrices). Third 235/250 swap since 22 Sep (22 Sep 235->250; 27 Sep 250->231->250->235; 24 Oct 235->250). The pack says 235 | base £250, recommended £233 (`listing_data`) | **Recorded in PriceLabs, not in policy.** Corentin to confirm or revert |

- Other Reyhan edits that touch policy or plan:
  - **P13 1-12 Nov at 0%** matches Corentin's 24 Oct "overrides set to 0%". It removes the earlier +2%, so 10-11 Nov is now £153 / £154 (was £158 / £160). That runs against **a-raise-1012nov**.
  - **P05 7-8 Dec +3%:** £504 / £493 (30 Oct £516 / £499). **a-p05-dec** (about £598 / £594) is not done.
- **Check** PriceLabs > Date Specific Overrides on:
  - 2699998, 17 Nov;
  - 3064196 + Vrbo `_7fd3…`, 13-18 Dec;
  - 3562176, 1-2 Nov;
  - 3547481, 31 Oct-1 Nov;
  - 3064856 > Base Price.

**H3. a-discount-cut: not applied; customization layers unchanged**
- Source: live `get_customizations`, `effective`.

| Ref | Last-minute | Occupancy | Booking Recency | Seasonality | Demand Factor | Far-out |
|---|---|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default (5-15%) | off | Conservative | +30% after 150 d |
| P05 3166592 | -1% gradual, 15 d | Aggressive | ON default | off | Conservative | +30% after 150 d |
| P01 / P08 / P09 | **-18%** gradual, 15 d | Market Driven (toggle off) | off, so the default applies | off | Moderately Aggressive | +20% after 120 d |
| P11 3064196 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P12 2699998 | 0% | Custom (milder) | ON default | off | Moderately Conservative | +30% after 150 d |
| P13 3064856 / 3090701 | -5% gradual, 14 d | Aggressive | ON default | **Moderately Conservative ON** | Conservative | +30% after 150 d |
| P20 3547481 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P06 3288517 | Market Driven 40%->0% at 13 d | Market Driven | default | off | off | Market Driven |

- **Final vs uncustomized on open nights.** `price` vs `uncustomized_price` from the raw files; Smoobu `available` decides whether a night is open; nights after handback are excluded.
- Windows are **1-14 Nov** (next 14) and **1-30 Nov** (next 30).

| Ref | Next 14 | 30 Oct | Next 30 | 30 Oct |
|---|---|---|---|---|
| P04 | 7 n £1,342 vs £1,573, **-14.7% (£231)**. Without 1-2 Nov (+50%): 5 n £880 vs £1,169, **-24.7%** | -30.1% | 14 n £2,790 vs £3,243, **-14.0% (£453)** | -21.8% |
| P20 | 10 n £2,423 vs £2,892, **-16.2% (£469)** | -20.1% | 20 n £5,219 vs £6,057, **-13.8% (£838)** | -15.1% |
| P11 | 6 n £1,220 vs £1,341, -9.0% (£121) | -5.0% | 19 n £3,998 vs £4,662, **-14.2% (£664)** | -12.8% |
| P05 | 1 n (9 Nov) £1,442 vs £425, +239% | -1.8% | 5 n £3,364 vs £2,606, +29.1%. **Without 9 Nov: 4 n £1,922 vs £2,181, -11.9% (£259)** | -9.8% |
| P12 | 6 n £1,413 vs £1,379, +2.5% | -1.0% | 15 n £3,782 vs £4,020, **-5.9% (£238)** | -7.1% |
| P09 | 3 n £442 vs £469, -5.8% (£27) | -3.4% | same (handback 26 Nov) | |
| P08 | 3 n £635 vs £639, -0.6% | -1.4% | same (handback 13 Nov) | |
| P13 3064856 | 8 n £1,193 vs £1,210, -1.4% | 0.0% | 10 n £1,804 vs £1,753, +2.9% | +3.5% |
| P13 3090701 | 8 n £1,449 vs £1,371, +5.7% | +6.2% | 10 n £2,004 vs £1,882, +6.5% | +5.1% |
| P06 | 7 n £2,099 vs £2,097, +0.1% | +0.2% | same | |

- **Net uncustomized minus final**, same method as 30 Oct (excluding P06 and P14, both P13 listings netted):
  - **with P05 9 Nov:** next 14 -£260, next 30 £1,293;
  - **without it:** **next 14 £757** (30 Oct £980), **next 30 £2,310** (30 Oct £2,253).
- The +300% on one night hides an unchanged discount stack. The P04 next-14 improvement comes only from the +50% on 1-2 Nov.
- **Check:** PriceLabs > each listing > Customizations. Set each layer to Custom 0% explicitly; switching a layer off is not enough, because the default then applies.

**H4. P05 29 Dec: 1-night orphan still listed at £1,338, min 1** (overrides 3166592; raw; `prices.csv`)
- DSO **+100%, min 1**, last updated 18 Oct 20:34:32Z, not edited. The uncustomized price is **£1,054**.
- Neighbours (booked): 28 Dec **£807** and 30 Dec **£800**, so 29 Dec is **1.66x**.
- 29 Dec sits between Airbnb 22-29 Dec (£4,527.95) and Airbnb 30 Dec-4 Jan (£3,188.70).
- **Corentin to confirm** (a-peak-check / t-p05-calendar).

**H5. Push freshness: P06 and P09 cross 24 h at 08:23Z and 08:34Z today** (live `get_listing_data` ~07:20Z)
- P06 3288517 last pushed **30 Oct 08:23:30Z** and P09 3318172 **30 Oct 08:34:21Z**. Both were 22 h 50 min+ old at 07:21Z and are the only priced Smoobu listings with no push since yesterday morning.
- On 29 Oct they pushed at 08:58Z / 08:45Z, so they look like a mid-morning daily cycle that runs a little earlier each day.
- **Check:** re-read `last_date_pushed` after 08:40Z. If either is still 30 Oct, it is CRITICAL (Sync status / push error log).

### MEDIUM

**M1. t-pl-sync: fixed. PriceLabs now sees P04 and P05 6-9 Nov and the P04 20-23 Nov cancellation** (raw; `prices.csv`; `reservations.csv`)

| Change (Smoobu) | PriceLabs now | Status |
|---|---|---|
| P04 Airbnb 6-9 Nov (£355.72) | 6-8 Nov **Booked**, ADR £118.57 | **Fixed** (3562176 refreshed 30 Oct 22:15:12Z) |
| P05 Airbnb 6-9 Nov (£893.52) | 6-8 Nov **Booked**, ADR £297.84 | **Fixed** (3166592 refreshed 22:10:30Z) |
| P04 Booking.com 20-23 Nov **cancelled** (£355.82, booked 26 Oct) | 20-22 Nov **open**, £214 / £216 / £204, min 3. Smoobu shows available at the same prices | **Fixed.** 18-24 Nov is now a 7-night open run between 14-18 Nov and 25 Nov-2 Dec |

- PriceLabs occupancy_next_30: P04 53%, P05 90% (was 80%).
- Whether the unsynced Barking Airbnb 1455876748739910219 took 20-23 Nov, or still sells 3-9 Nov, cannot be seen from PriceLabs: NOT CHECKED here (t-p04-doublebook).
- The resync only happened because of Reyhan's edits. Neither listing refreshed by itself between 29 Oct 09:09Z and 30 Oct 22:10Z.

**M2. Sync PriceLabs vs Smoobu: 0 open nights differ by more than £2** (`prices.csv`, all Smoobu listings, 1 Nov-30 Dec)
- Matches `kpi_pack.sync_issues` = [] on every property.
- 3090701 has no Smoobu rate in `prices.csv`: NOT CHECKED.
- P11 Vrbo copy: **fixed**, last push **30 Oct 22:12:20Z** (was 29 Oct 06:18:54Z), so t-p11-vrbo can close.
- Overnight pushes:
  - **pushed by themselves:** P01 06:29Z, P02 00:23Z, P03 (Channex) 02:55Z, P07 04:47Z, P08/P10 06:01Z, P12 05:42Z, P12 Vrbo 05:20Z, P14 04:29Z;
  - **edit-triggered**, not proof of a nightly cycle: P04, P05, P11, P13 (both + Vrbo 22:19:25Z) and P20, 22:07-22:15Z.

**M3. P13 25-26 Dec still min 3** (overrides 3064856: 21-22 and 23-26 Dec -3% min 3, not edited since 27 Oct)
- 21-26 Dec open at £230 / £231 / £237 / £228 / £229 / £235, min 3. 27 Dec onward is Blocked by the 3090701 Airbnb 27 Dec-3 Jan (£1,766).
- **Arrivals on 25 or 26 Dec cannot fit.** A 24 Dec arrival still can.
- **Check:** 3064856 DSO 25-26 Dec, min stay.

**M4. P06 8-14 Nov still open (t-p06-open)** (`prices.csv` available=True; raw 3288517)
- 7 nights at £255 / £258 / £268 / £292 / £313 / £353 / £360 = **£2,099**, min 2. 30 Oct it was £2,159.
- 15-30 Nov is Blocked. P06 is an intentional block in policy.
- **Question:** is 8-14 Nov meant to be sold?

**M5. P20 20-22 Nov delivery block lifted**
- Sources: raw 3547481 (20-21 Nov was `Blocked` on 30 Oct, open today); `prices.csv` available=True, £292 / £305, min 3.
- Policy `listing_facts.P20.block_20_21_nov`: "Smoobu block 20-22 Nov = delivery. Intentional."
- **Question:** is the delivery done or moved? If yes, these are sellable nights in a 19-night open run (6-24 Nov).

**M6. a-p13-orphan-price: unchanged** (3064856 overrides: 17 Nov +35% min 1, 27 Nov +50% min 1, 28 Oct)
- 3064856: **17 Nov £273**, **27 Nov £338** (uncustomized £246 / £297).
- 3090701: £248 / £307.
- Both nights are true 1-night orphans: 17 Nov sits between Airbnb 13-17 Nov and Booking.com 18-27 Nov; 27 Nov between Booking.com 18-27 Nov and Airbnb 28 Nov-1 Dec.

**M7. a-p12-2228nov: not applied** (2699998: -2% min 2, no edit)
- 26-28 Nov **£261 / £283 / £315 = £859** (30 Oct £897; target £715).
- Every P12 open night fell 5-14% overnight with no edit, e.g. 16 Nov £250 -> £214 and 24 Nov £269 -> £233.
- `uncustomized_price` fell too (16 Nov £274 -> £229), and PriceLabs occupancy_next_30 went 57% -> 53%. That points to the algorithm or market inputs, not a setting change.

**M8. Min stay vs policy and orphan gaps** (raw `min_stay` on Smoobu-open nights)
- **Below 2:**
  - P05 9 Nov (H1) and 29 Dec (H4);
  - P13 17 Nov and 27 Nov (true orphans, M6);
  - P13 1 Dec (intentional);
  - P04 2 Dec (deprioritised).
- **P04 below 3:** only 1-2 Nov (H2c). 18-20 and 23-25 Nov are now min 3.
- **P20 below 3 before 30 Nov:** only 1 Nov (H2d).
- **Above 3 inside 2 months:**
  - P20 25-26 Dec min 4. There is no P20 override on those dates, so it is the min-stay profile: UNKNOWN which setting;
  - P20 27-28 Dec min 6 and 29 Dec min 5 (27 Dec edited 30 Oct 22:11:24Z).
- **5-night rule (2+ months, from 30 Dec):** P20 30 Dec min 5 complies; the other open listings have no open 30 Dec night. 7-night rule (4+ months): outside the window, NOT CHECKED.
- P14 (special setup): min 3-4 throughout. Numbers only.
- **Orphans a gap-fill rule would sell:**
  - P05 9 Nov (min 1 now, but £1,442);
  - P20 1 Nov from tomorrow (min 2, £232);
  - P13 17 / 27 Nov (min 1 already).
- **Short gaps sellable now:**
  - P11 1-2 Nov (£193 / £190, min 2) and 23-25 Dec (£311 / £307 / £315);
  - P05 16-17 Nov (£406 / £426) and 7-8 Dec (£504 / £493);
  - P12 12-13 Nov (£213 / £269);
  - P13 1-3 Nov (£144 / £143 / £144);
  - P08 5-7 Nov (£198 / £217 / £220);
  - P09 10-12 Nov (£142 / £147 / £153, a-raise-1012nov not applied).
- `kpi_pack.gaps` is [] on every property, so the pack does not list the gaps above.

**M9. Floor / ceiling** (`kpi_pack.bounds`, 60-day raw)
- P14: **76.7% of 60 open nights at the £500 minimum** (special setup: numbers only).
- P04, P05, P06, P08, P09, P11, P12, P13 and P20: 0% at min and 0% at max.
- 180-day check: NOT POSSIBLE (raw ends 30 Dec).

**M10. Base vs market** (`listings.csv` `pl_base`; `2026-10-30/market.csv` latest rows pulled 30 Oct; P13 from today's `raw/neighbourhood_P13.json`, 2 BR n=117)

| Ref | Base | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|
| P01 | £253 | £257 | -1.6% | £331 | -23.6% |
| P04 | £220 | £173 | **+27.2%** | £220 | 0.0% |
| P05 (4 BR) | £550 | £577 | -4.7% | £720 | -23.6% |
| P06 | £357 | £403 | -11.4% | £508 | -29.7% |
| P09 | £176 | £136 | **+29.4%** | £161 | +9.3% |
| P11 | £286 | £289 | -1.0% | £330 | -13.3% |
| P12 | £284 | £206 | **+37.9%** | £245 | **+15.9%** |
| P13 | £250 | £225 | +11.1% | £281 | -11.0% |
| P20 | £350 | £254 | **+37.8%** | £314 | **+11.5%** |

- P08, P10 and P14: no row, UNKNOWN.
- The market horizon is unstated and cleaning inclusion is unknown, so treat these gaps as indicative.

**M11. 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect and the Mon 2 Nov review**
- Bases are unchanged since 18/20 Oct (`get_user_logs`). PriceLabs occupancy_next_30 vs market (`get_listing_data` 31 Oct):
  - P01 100% vs 34% (sold to handback);
  - P05 90% vs 40%;
  - P06 77% vs 45%;
  - P09 83% vs 36%;
  - **P11 40% vs 46%**;
  - P12 53% vs 40%.
- **The 2 Nov review should look at:**
  - **P11**, the only raised flat below market. 19 open nights in the next 30 at -14.2% vs uncustomized; Reyhan has now added -2%/-3% overrides on most open nights. Check whether base 286 or the Aggressive occupancy layer is the lever;
  - **P05**: 90% booked, but its two orphans are priced at £1,442 and £1,338. Check that the base rise is not being judged on unsold orphan nights;
  - **P12**: +37.9% vs P50 while PriceLabs cut its own prices 5-14% overnight; it hands back on 13 Dec;
  - **P09**: +29.4% vs P50 at 83% booked, with 3 open nights before handback on 26 Nov;
  - **P06**: mostly blocked (8-14 Nov the only open run);
  - **P01**: sold out to handback. Nothing to review.

**M12. Listing hygiene** (`get_listing_data`; `data/id_map.json`)
- **`_unmatched`:** three Vrbo listings at Marylebone coordinates are in `id_map` (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`, note "push off") but **not in PriceLabs** (20 listings returned). **Question:** removed on purpose? Then update `id_map.json`.
- **`confidence: check`:**
  - **P03** is priced via **Channex**, not Smoobu: push on, last push 31 Oct 02:55:16Z, fully blocked (intentional);
  - **P15-P19 have no PriceLabs listing.** **Question:** should they be priced?
- **P02 Vrbo copy `_units_0004_ca1ccf61`:** push on, last push **2026-02-24T07:31:33Z**. P02 is an intentional block. **Question:** turn push off or remove the listing?
- **Vrbo copies push separately** and receive overrides copied from the parent. Last pushes: P11 `_7fd3…` 30 Oct 22:12:20Z, P12 `_386e…` 31 Oct 05:20:37Z, P13 `_3d48…` 30 Oct 22:19:25Z.
- **P13:** 3064856 and 3090701 share coordinates (51.5088201, -0.2342476) and push together. One flat (policy).
- **P20** is not in the info pack. P04 recommended base reads "Unavailable".
- **Info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`, header "10 Sep 2026", mtime 13 Oct) vs `listings.csv`:
  - minimums match except P14 (pack £400, PriceLabs £500; special setup);
  - bases differ where the 18-24 Oct changes happened: P01 230/253, P05 455/550, P06 340/357, P09 160/176, P11 260/286, P12 270/284, **P13 235/250**, P14 475/525;
  - the pack lists P05 as 5-bed, while policy and PriceLabs say 4 bedrooms;
  - **the pack is out of date.**

### Open plan items: status 31 Oct

| Item | Status |
|---|---|
| t-pl-sync | **Fixed** (M1) |
| t-p11-vrbo | **Fixed**: pushed 30 Oct 22:12:20Z (M2) |
| a-p05-9nov | **Partly**: min 1 set, but +300% = £1,442 (H1) |
| Reyhan conflicts | P04 18-24 Nov min 3 **fixed**; P04 1-2 Nov min 2 **new**; P11 darts **worse** (-2%); P12 17 Nov and P20 31 Oct-1 Nov **unchanged**; P13 base 235->250 **logged 24 Oct, not in policy** (H2) |
| a-discount-cut | **Not done.** £757 / £2,310 without P05 9 Nov (H3) |
| a-peak-check | P13 25-26 Dec min 3 unchanged (M3); P05 29 Dec £1,338 unchanged (H4) |
| t-p05-calendar | 29 Dec unchanged (H4). 30 Oct passed; 31 Oct is booked (Airbnb 31 Oct-6 Nov) |
| a-p05-dec | Not done: +3% only, £504 / £493 (H2) |
| a-p12-2228nov | Not done: £859 (M7) |
| a-raise-1012nov | Not done. P13 moved the other way (0%); P09 £142-£153 (M8) |
| a-p13-orphan-price | Unchanged (M6) |
| t-p06-open | Still open, £2,099 (M4) |
| t-p04-doublebook, a-airbnb-rules, t-p05-0609, a-p05-earlybird, t-p13-offer, a-p13-twin | OTA-side: NOT CHECKED here |

Data gaps:
1. The raw window is 1 Nov-30 Dec. 31 Oct is not covered; the 180-day floor/ceiling check and the 7-night (4+ months) rule are NOT CHECKED.
2. `kpi_pack.json`: `market_percentiles` and `avg_open_price_next30` are null, and `gaps` is [] even though real orphans exist. Today's `market.csv`, `comps.csv` and `channel_checks.csv` are empty; base vs market uses the 30 Oct `market.csv`.
3. 3090701 Smoobu rates are missing from `prices.csv`, so its sync is NOT CHECKED.
4. Not read live today:
   - overrides on P01, P06, P08, P09, P10, P12, P14, 3090701 and the Vrbo copies (3090701 and the Vrbo copies are mirrored per the `add_custom_pricing_from_parent` logs);
   - customizations on P10, P14 and the blocked P02/P03/P07;
   - the P20 min-stay profile behind 25-26 Dec min 4.
5. Customization edits do not show in `get_user_logs`. "No change" rests on comparing live readings with 30 Oct.
6. The meaning of `user_price` vs `price` is UNKNOWN. Smoobu matches `price`; `user_price` today tracks the previous run's `price`.
7. P06/P09 push status after 08:23Z / 08:34Z today: NOT CHECKED. Re-read then.

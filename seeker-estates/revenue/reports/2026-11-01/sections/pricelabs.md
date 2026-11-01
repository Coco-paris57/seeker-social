## PriceLabs audit (D = 2026-11-01)

**Sources**
- Snapshot `data/snapshots/2026-11-01/`: `raw/listing_data.json` (06:56Z), `raw/prices_*.json` (06:57-07:17Z), `prices.csv`, `listings.csv`, `reservations.csv` (Smoobu, room only).
  - **The raw window is 2 Nov-31 Dec.** Tonight (1 Nov) is not in it. For 1 Nov I use the live overrides plus the 31 Oct `prices.csv`, which shows 1 Nov open on P04, P11, P12, P13 and P20; there were no bookings overnight.
- Baseline: `data/snapshots/2026-10-31/raw/*` and `reports/2026-10-31/sections/pricelabs.md`.
- **Live read-only calls, 1 Nov 07:19-07:40Z.** Calls were meant to go one at a time; two pairs ran in parallel and both returned 200.
  - `get_user_logs`: listing, group and account, 31 Oct-1 Nov.
  - `get_listing_data`: all 20 listings, 07:20Z.
  - `get_listing_date_overrides`: P04 3562176, P05 3166592, P20 3547481, P13 3064856, P11 3064196, P12 2699998 and P06 3288517.
  - `get_customizations` (toggled_on=false; last-minute, occupancy, booking recency, seasonality, demand factor, far-out): P04, P05, P11, P12, 3064856, 3090701, P20, P09, P06, P08 and P01.
- `kpi_pack.json`:
  - `sync_issues` is [] on every property and `gaps` is [] everywhere;
  - `market_percentiles` are all null;
  - `bounds` is filled for P04, P05, P06, P08, P09, P11, P12, P13, P14 and P20.
- `missing`: market, comps and channel_checks are empty today. Base vs market therefore uses the latest rows of `data/snapshots/2026-10-31/market.csv`, plus today's `raw/neighbourhood_P13.json` for P13 (2 BR n=117, P50 £224, P75 £280).
- Policy respected:
  - P02/P03/P06/P07 blocks, the P14 special setup and the handbacks;
  - P13 1 Dec (intentional);
  - P04 2 Dec and P12 17 Nov are deprioritised; P12 17 Nov appears only because Reyhan's edit moved it further from Corentin's decision;
  - P11 darts "+5%, leave as is".
- Reyhan's edits that cross a standing decision are reported as conflicts for Corentin to confirm, not as new proposals.

### What changed since 31 Oct 06:00Z
- **Logs:** reyhan@ made **59 listing log entries, all Date-Specific Overrides**, in two batches:
  - **31 Oct 14:28:21-14:34:04Z** (IP 2a00:…);
  - **31 Oct 22:05:24-22:11:52Z** (IP 143.58.198.67).
  - Group and account logs: 0 entries. No base, min or max change.
- **Direction:** every new override is a cut except **P04 1-2 Nov +20%** and **P20 1 Nov +5%**.

| Ref | Dates | Override now (live) | Was (31 Oct section) |
|---|---|---|---|
| P04 | 1-2 Nov | **+20%, min 2** (22:11:25Z) | +50%, min 2 |
| P04 | 9-24 Nov | **-10%, min 3** (22:11:36Z; 18-24 Nov first set -5% at 14:34Z) | -7% (3-17 Nov), -3% (18-24 Nov) |
| P04 | 6-22 Dec | **-10%, min 3** | earlier override |
| P04 | 2-31 Jan | -7%, min 3 | - |
| P20 | 31 Oct-1 Nov | **+5%, min 2** (14:32:41Z) | +10%, min 2 |
| P20 | 6-24 Nov | **-10%, min 3** (22:10:52Z; 8-24 Nov first set -7% at 14:33Z) | Corentin's -5% (31 Oct-19 Nov) |
| P20 | Jan 2027 | -7%, min 3 | -5% |
| P11 (+ Vrbo) | 10 Nov-4 Dec | **-7%, min 2** (22:06:22Z; -5% blocks set at 14:29Z) | -2% / -3% |
| P11 (+ Vrbo) | 8-18 Dec (incl. darts 13-17 Dec) | **-5%, min 2** (22:06:44Z) | -2% |
| P12 (+ Vrbo) | 1-4 Nov and **16 Nov-13 Dec (incl. 17 Nov)** | **-7%, min 2** (22:05Z; -5% first at 14:28Z) | -2% (17 Nov), -4% elsewhere |
| P13 3064856 (+3090701, Vrbo) | 1-3 Nov | **-5%, min 2** | Corentin's 0% (24 Oct) |
| P13 | 4-7 Nov | -3%, min 2 | 0% |
| P13 | 8-12 Nov | **-5%, min 2** | Corentin's 0% (24 Oct) |
| P13 | 7-20 Dec | -5%, min 2 | earlier override |
| P05 | 29 Nov-2 Dec, 13-19 Dec | -5%, min 3 | earlier override |
| P05 | 4-31 Jan | -7%, min 3 | - |
| P06 | **8-14 Nov** | **-2%, min 2** (22:09:46Z) | none |

- **Customizations:** identical to 31 Oct on P04, P05, P11, P12, both P13 listings, P20, P01, P08 and P09.
- **P06 3288517 changed, and the change does not appear in the logs** (customization edits are not logged):

| Layer | 31 Oct reading | Now |
|---|---|---|
| Last-minute | Market Driven, "40% same-day to 0% at 13 d" | Custom **0%** within 15 days ("No Discount") |
| Occupancy | Market Driven | **Aggressive** (on; -30% at ≤10% occupancy within 15 days) |
| Booking recency | default | ON, default |
| Far-out | Market Driven | toggle off; `effective` = "Market Driven (Balanced) 60 d -> 20% at 179 d" |

  - P06 `recommended_base` also moved **342 -> 357** (`listings.csv`).
  - Who made the change and when: NOT CHECKED.
- **Catalogue:** the same 20 listings, push on for all of them; base, min and max are unchanged in `listings.csv`.

---

### CRITICAL
**C1. P06 went 37 h 47 min without a push before Reyhan's edit forced one** (live `get_listing_data` 07:20Z; `data/snapshots/2026-10-31/listings.csv` vs today)
- `last_date_pushed` was **30 Oct 08:23:30Z**, then **31 Oct 22:10:08Z**.
- There was no self-driven push on the morning of 31 Oct, so P06 was over 24 h stale from **31 Oct 08:23Z to 22:10Z** (13 h 47 min).
- It is fresh now (9 h 10 min at 07:20Z), but only because of the 22:09:46Z override.
- **Same pattern elsewhere:** P04, P05, P11, P13 (both listings + Vrbo) and P20 have had **no self-driven push since 29 Oct**. Every push since then came 0-8 min after a Reyhan edit: 30 Oct 22:07-22:19Z and 31 Oct 22:06-22:16Z.
- If nobody edits tonight, these listings may not push again. That cannot be proven from here.
- **Check:** PriceLabs > each listing > Sync status / push log (3288517, 3562176, 3166592, 3064196, 3064856, 3090701, 3547481). Look for failed scheduled syncs on 30-31 Oct.

### HIGH

**H1. Reyhan conflicts with standing decisions: status after the 31 Oct edits** (live overrides; `get_user_logs`; raw prices; policy.json)

| Conflict | Policy | PriceLabs now | Price now (raw) | Status |
|---|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised.p12_17nov_override`: Corentin "won't change Mile End 17 Nov +50%" | **-7%, min 2** (31 Oct 22:05:35Z) | **£224** (uncust £258); was £234 | **Worse** (-2% to -7%) |
| (b) **P11 darts 13-17 Dec** | 21 Oct "average above £300/night"; `darts_override_24oct` "+5%, leave as is" | **-5%, min 2** (31 Oct 22:06:44Z) | **£217 / £194 / £196 / £207 / £229 = £1,043, avg £208.60** (31 Oct £1,080, avg £216) | **Worse** (-2% to -5%) |
| (c) **P04 min 3 and -8% on 1-25 Nov** | 24 Oct: "-8% on 1-25 Nov… never open for fewer than 3" | **1-2 Nov +20%, min 2**; 3-8 Nov -7%; **9-24 Nov -10%**, min 3; 25 Nov +15% min 2 (booked) | 2 Nov **£183** at min 2 (uncust £201). 1 Nov not in raw | **1-2 Nov min 2 is still open tonight.** 9-24 Nov is now -10%, deeper than Corentin's -8% |
| (d) **P20 min 3 (25 Oct-30 Nov) and -5% (31 Oct-19 Nov)** | `listing_facts.P20.min_stay`; `price_24oct` | 1 Nov **+5%, min 2**; 2-5 Nov -2% min 2 (booked); **6-24 Nov -10%**, min 3 | 6-9 Nov **£221 / £224 / £220 / £220** (8-9 Nov at the **£220 floor**; uncust £259 / £264) | **1 Nov min 2 is unchanged** (a 1-night orphan tonight, H4). **-10% replaces Corentin's -5%** |
| (e) **P13 base 235 -> 250** | Not in `price_changes` | base **250** (no base log since 24 Oct 21:14:47Z) | recommended **233** (3064856) / **232** (3090701) (`get_listing_data`) | **Unchanged.** Corentin to confirm or revert |
| (f) **NEW: P13 1-3 and 8-12 Nov** | `price_changes` 24 Oct: "31 Oct-3 Nov, 8-12 Nov… overrides set to 0%" (Corentin) | **-5%, min 2** on 1-3 Nov and 8-12 Nov; -3% on 4-7 Nov (3 listings) | 3064856 2-3 Nov **£136 / £138**; 10-12 Nov **£144 / £145 / £147** (31 Oct £153 / £154 / £155). 3090701 10-11 Nov £175 / £176 | **New conflict** with Corentin's 0%. It also moves 12 Nov (Wembley, a-raise-1012nov) the wrong way |

- **Check:** PriceLabs > Date Specific Overrides on:
  - 2699998, 17 Nov;
  - 3064196 + Vrbo `_7fd3…`, 13-17 Dec;
  - 3562176, 1-2 Nov and 9-24 Nov;
  - 3547481, 1 Nov and 6-24 Nov;
  - 3064856 (mirrors 3090701 + Vrbo `_3d48…`), 1-12 Nov;
  - 3064856 > Base Price.

**H2. a-discount-cut: not applied. The stack got deeper overnight through Reyhan's overrides and P06's layer change**
- Sources: live `get_customizations`; raw `price` vs `uncustomized_price` on Smoobu-open nights (`prices.csv` available), handback nights excluded.
- **Layers still active (vs Custom 0%):**

| Ref | Last-minute | Occupancy | Booking Recency | Seasonality | Demand | Far-out |
|---|---|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default (5-15%) | off | Conservative | +30% after 150 d |
| P05 3166592 | -1% gradual, 15 d | Aggressive | ON default | off | Conservative | +30% after 150 d |
| P11 3064196 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P12 2699998 | 0% | Custom (milder) | ON default | off | Mod. Conservative | +30% after 150 d |
| P13 3064856 / 3090701 | -5% gradual, 14 d | Aggressive | ON default | **Mod. Conservative ON** | Conservative | +30% after 150 d |
| P20 3547481 | 0% | Aggressive | ON default | off | off | +30% after 150 d |
| P01 / P08 / P09 | **-18%** gradual, 15 d | Market Driven (toggle off) | off, so the default applies | off | Mod. Aggressive | +20% after 120 d |
| P06 3288517 | **0% (was Market Driven 40%)** | **Aggressive (was Market Driven)** | ON default | off | off | Market Driven (Balanced) |

- **Final vs uncustomized, open nights.**
  - Windows: next 14 = **2-15 Nov**, next 30 = **2 Nov-1 Dec**. The 31 Oct column is recomputed on the **same dates** from the 31 Oct raw, so the numbers differ from yesterday's 1-14 / 1-30 Nov figures.

| Ref | Next 14 now | 31 Oct, same dates | Next 30 now | 31 Oct, same dates |
|---|---|---|---|---|
| P04 | 6 n £1,013 vs £1,340, **-24.4% (£327)** | -19.3% (£265) | 13 n £2,347 vs £3,001, **-21.8% (£654)** | -16.0% (£487) |
| P20 | 10 n £2,264 vs £2,717, **-16.7% (£453)** | -16.7% (£494) | 19 n £4,607 vs £5,584, **-17.5% (£977)** | -14.2% (£827) |
| P11 | 5 n £968 vs £1,201, **-19.4% (£233)** | -11.4% (£132) | 19 n £3,811 vs £4,652, **-18.1% (£841)** | -14.6% (£690) |
| P05 (excl. 9 Nov) | 0 n | 0 n | 5 n £2,424 vs £2,755, **-12.0% (£331)** | -10.1% (£276) |
| P12 | 5 n £1,190 vs £1,213, -1.9% (£23) | -1.3% (£16) | 15 n £3,712 vs £4,132, **-10.2% (£420)** | -7.2% (£298) |
| P06 | 7 n £1,841 vs £2,039, **-9.7% (£198)** | +0.1% (-£2) | same | same |
| P09 | 3 n £445 vs £467, -4.7% (£22) | -5.8% (£27) | same (handback 26 Nov) | |
| P08 | 3 n £624 vs £620, +0.6% | -0.6% | same (handback 13 Nov) | |
| P13 3064856 | 7 n £995 vs £1,075, -7.4% (£80) | -3.3% (£36) | 10 n £1,858 vs £1,819, +2.1% | +4.2% |
| P13 3090701 | 7 n £1,208 vs £1,216, -0.7% (£8) | +3.6% | 10 n £1,961 vs £1,884, +4.1% | +7.2% |

- **Net uncustomized minus final** (yesterday's method: P06 and P14 excluded, both P13 listings netted, P05 9 Nov excluded):
  - **next 14: £1,142** (31 Oct, same dates: £930);
  - **next 30: £3,125** (31 Oct: £2,392). That is **+£733 in one day**.
  - Adding P06 gives £1,340 / £3,323.
  - Including the P05 9 Nov +300%: £112 / £2,095.
- **List value on open nights next 30 fell by about £1,402 overnight:** P04 -£212, P20 -£380, P11 -£215, P12 -£118, P13 -£180, P06 -£258, P05 -£39 (excl. 9 Nov). Part of this is the algorithm's own move: `uncustomized_price` fell on P20 (£5,814 -> £5,584) and P04 as well.
- **Check:** PriceLabs > listing > Customizations. Set Last-minute, Occupancy and Booking Recency to **Custom 0%** explicitly; switching a layer off lets the default apply. Re-read the DSOs listed in H1.

**H3. P05 9 Nov and 29 Dec orphans: both unchanged** (live overrides 3166592; raw; `prices.csv`)
- **9 Nov:** DSO **+300%, min 1** (last updated 30 Oct 22:09:42Z, not edited since). Price **£1,462**, uncustomized £432, Smoobu £1,462, available.
  - Neighbours (booked): 8 Nov **£460**, 10 Nov **£457**, so 9 Nov is 3.2x.
  - a-p05-9nov (Airbnb showing £253 after a Special offer) is OTA-side: NOT CHECKED here.
- **29 Dec:** DSO **+100%, min 1** (18 Oct 20:34:32Z). Price **£1,354**, uncustomized £1,077. Neighbours (booked): 28 Dec **£791**, 30 Dec **£827** (1.7x).
- **Corentin to confirm** (a-peak-check / t-p05-calendar). **Check:** 3166592 > DSO 9 Nov and 29 Dec.

**H4. Tonight's 1-night or short gaps under min stay** (live overrides; 31 Oct `prices.csv` for 1 Nov availability; today's raw for 2 Nov)
- **P20 1 Nov orphan:** open, between Airbnb 28-31 Oct (ended) and Airbnb 2-6 Nov (`reservations.csv`).
  - DSO **+5%, min 2** (31 Oct 14:32:41Z), so it cannot sell as a 1-night stay.
  - Policy says min 3 on P20 until 30 Nov, so a gap-fill min 1 would also conflict. Corentin to decide. The price is not in raw (31 Oct reading £232 at +10%).
- **P04 1-2 Nov:** 2-night gap before Booking.com 3-6 Nov. **+20%, min 2**; 2 Nov **£183**. This is conflict H1(c), and it is also the period of the unsynced Barking Airbnb double-sell (t-p04-doublebook, channel section).
- **P11 1-2 Nov** (1 Nov min 2 only, 2 Nov -3% min 2, **£151**), **P12 1-4 Nov** (-7%, £240 / £222 / £233 on 2-4 Nov) and **P13 1-3 Nov** (-5%, 3064856 £136 / £138): sellable at min 2.

### MEDIUM

**M1. Push freshness at 07:20Z** (live `get_listing_data`)
- **P09 3318172: last push 31 Oct 08:09:32Z = 23 h 11 min.** It crosses 24 h at **08:09Z today**.
  - Its pushes have come about 15-25 min earlier each day (29 Oct 08:45Z, 30 Oct 08:34Z, 31 Oct 08:09Z), which fits a daily cycle due about 07:45-08:10Z.
  - Not re-read after 08:09Z: **re-check** `last_date_pushed`. If it still shows 31 Oct, it is CRITICAL. P09 has 3 open nights, 10-12 Nov.
- **Overnight self-driven pushes:** P01 06:25Z, P02 00:23Z, P03 (Channex) 02:48Z, P07 04:46Z, P08 06:10Z, P10 06:10Z, P14 04:34Z.
- **Edit-triggered pushes (31 Oct 22:06-22:16Z):** P04, P05, P06, P11 (+ Vrbo 22:09Z), P12 (+ Vrbo 22:06Z), P13 3064856 / 3090701 (+ Vrbo 22:16Z) and P20.
  - P12 self-pushed at 05:42Z on 31 Oct but not this morning; its last push is the 22:06Z edit push.
- P02 Vrbo copy: last push **24 Feb 2026** (P02 is an intentional block; see M8).

**M2. Sync: 0 open nights differ by more than £2** (`prices.csv`, 2 Nov-31 Dec)
- Matches `kpi_pack.sync_issues` = [].
- 3090701 has no Smoobu rate in `prices.csv` (30 open nights): NOT CHECKED.

**M3. P04 19-20 Dec cancellation: PriceLabs sees it**
- Sources: raw 3562176, refreshed 31 Oct 22:12:27Z; `prices.csv`; `reservations.csv` (Airbnb 19-20 Dec, £216, booked 26 Oct, status cancelled).
- 19 Dec moved from `Booked (Check-In)` on 31 Oct to **open, £207, min 3**, under Reyhan's 6-22 Dec -10% DSO. Smoobu shows it available at £207.
- 6-19 Dec is now a **14-night open run** (£183-£207/night) between Booking.com 3-6 Dec and Booking.com 20 Dec-2 Jan.
- It was picked up only because of the 22:12Z edit-triggered refresh (see C1).

**M4. P13 25-26 Dec still min 3** (3064856 DSO 23-26 Dec -3% min 3, updated 27 Oct 11:58:10Z; not edited)
- 21-26 Dec are open (3064856 21 Dec £234; 24 / 25 / 26 Dec £227 / £228 / £233; 3090701 25 / 26 Dec £228 / £233).
- 27 Dec is blocked by the 3090701 Airbnb 27 Dec-3 Jan stay, which counts as a booking under policy. **Arrivals on 25 or 26 Dec cannot fit.**
- **Check:** 3064856 DSO 25-26 Dec, min stay.

**M5. P06 8-14 Nov still open, now with a Reyhan discount (t-p06-open)** (`prices.csv` available=True; raw 3288517; live overrides)
- 7 nights **£228 / £231 / £236 / £255 / £273 / £307 / £311 = £1,841**, min 2 (31 Oct: **£2,099**, so -£258).
- Causes: the DSO **-2%** (31 Oct 22:09:46Z) plus the layer change in "What changed" (Aggressive occupancy). Uncustomized is £2,039.
- 15 Nov onward is blocked. P06 is an intentional block in policy.
- **Question:** is 8-14 Nov meant to be sold? If yes, was the P06 customization change intended?

**M6. Other plan items on the PriceLabs side**
- **a-p13-orphan-price:** unchanged. 3064856 **17 Nov £271** (+35% min 1) and **27 Nov £336** (+50% min 1); 3090701 £222 / £275.
- **a-raise-1012nov (12 Nov Wembley):** not applied, and moved the other way (H1f). 3064856 12 Nov **£147** (31 Oct £155). P09 10-12 Nov £145 / £147 / £153 (hold).
- **a-p05-dec:** not done. 7-8 Dec **£496 / £487** (31 Oct £504 / £493), +3% min 2.
- **P12 26-28 Nov:** **£248 / £269 / £298 = £815** (31 Oct £859), via Reyhan's -7%.
- **t-p20-delivery:** 20-22 Nov is still open (£268 / £281), min 3, -10%.

**M7. Floor / ceiling** (`kpi_pack.bounds`; 60-day raw)
- **P20: 4.3% of 46 open nights at the £220 minimum.** 8 and 9 Nov sit at exactly £220 (uncust £259 / £264) and 6 Nov at £221. None were on 31 Oct. The -10% DSO plus Aggressive occupancy now push against the floor.
- P14: **78.3%** of 60 open nights at the £500 minimum (special setup: numbers only).
- All other listings: 0% at min and 0% at max.
- 180-day check: NOT POSSIBLE (raw ends 31 Dec).

**M8. Min stay vs policy and orphans** (raw `min_stay` on Smoobu-open nights)
- **Below 2:**
  - P05 9 Nov and 29 Dec (H3);
  - P13 17 Nov, 27 Nov and 1 Dec (1 Dec intentional);
  - P04 2 Dec (deprioritised).
- **P04 below 3:** 1-2 Nov (H1c).
- **P20 below 3 before 30 Nov:** 1 Nov (H4).
- **Above 3 inside 2 months:** P20 25-26 Dec min 4 (no DSO, so it comes from the min-stay profile: UNKNOWN which setting). P20 27-28 Dec min 6 and 29-31 Dec min 5 (DSOs).
- 5-night rule (2+ months, from 1 Jan): outside the window, NOT CHECKED. 7-night rule: NOT CHECKED.
- P14 (special setup): min 3-4.
- **Orphans a gap-fill rule would sell:**
  - P05 9 Nov (min 1, but £1,462);
  - P20 1 Nov (tonight, min 2);
  - P13 17 / 27 Nov (min 1 already);
  - P04 2 Dec (deprioritised).
- **Short gaps at min 2 now:**
  - P11 23-25 Dec (£304 / £304 / £315);
  - P05 16-17 Nov (£406 / £425) and 7-8 Dec;
  - P12 12-13 Nov (£218 / £277);
  - P08 5-7 Nov (£194 / £214 / £216);
  - P09 10-12 Nov.
- `kpi_pack.gaps` is [] everywhere, so the pack does not list any of these.

**M9. Base vs PriceLabs recommended base vs market: input to tomorrow's base review (a-base-review-1102)**
- Sources: `listings.csv` / live `get_listing_data` for base and recommended; latest rows of `2026-10-31/market.csv` (bedroom-matched Nearby Listings, horizon unstated, cleaning inclusion unknown); P13 from today's `raw/neighbourhood_P13.json`.

| Ref | Base | PL recommended | P50 | Gap | P75 | Gap | PL occ next 30 vs market | Bookings made 4-18 Oct / 19 Oct-1 Nov (`reservations.csv`, confirmed) |
|---|---|---|---|---|---|---|---|---|
| P01 | £253 | £255 | £259 | -2.3% | £332 | -23.8% | 100% vs 35% | 1 bk 30 n ADR £152 / 1 bk 3 n £240 |
| P05 (4 BR) | £550 | £548 | £582 | -5.5% | £719 | -23.5% | 87% vs 40% | 2 bk 11 n £578 / 1 bk 3 n £298 |
| P06 | £357 | £357 (was 342) | £406 | -12.1% | £510 | -30.0% | 77% vs 46% | 4 bk 18 n £189 / 1 bk 3 n £268 |
| P09 | £176 | £176 | £134 | **+31.3%** | £161 | +9.3% | 87% vs 36% | 3 bk 23 n £103 / 1 bk 2 n £127 |
| P11 | £286 | £285 | £289 | -1.0% | £330 | -13.3% | **40% vs 46%** | 1 bk 4 n £163 / 2 bk 6 n £204 |
| P12 | £284 | **£273** | £205 | **+38.5%** | £244 | **+16.4%** | 53% vs 40% | 2 bk 5 n £170 / 4 bk 20 n £173 |
| P13 | £250 | **£233 / £232** | £224 | +11.6% | £280 | -10.7% | 63% vs 41% | 6 bk 24 n £151 / 2 bk 16 n £182 |
| P20 | £350 | £347 | £254 | +37.8% | £314 | +11.5% | 30% vs 38% | 2 bk 15 n £159 / 3 bk 17 n £177 |
| P04 | £220 | Unavailable | £170 | +29.4% | £218 | +0.9% | 53% vs 24% | - (bookings imported 26 Oct; not pickup) |

- **The six 18 Oct raises (P01, P05, P06, P09, P11, P12) together:**
  - 4-18 Oct (15 days): 13 bookings, 91 nights, £18,199, ADR £200;
  - 19 Oct-1 Nov (14 days): 10 bookings, 37 nights, £7,346, ADR £199.
  - The later window had less unsold inventory (P01 is sold to handback), it includes a Sunday, and there have been 2 nights with no bookings (last booking 29 Oct). Do not over-read it.
- **PriceLabs-side notes for the review:**
  - **P12** and **P13** are the only listings where PriceLabs' own recommended base is clearly below the set base (-£11 and -£17/-£18);
  - **P11** is the only raised flat below market occupancy. Its open nights next 30 are now -18.1% vs uncustomized, after Reyhan's -7%/-5%. The base is not what sets its price;
  - **P05**'s next-30 open-night value is distorted by the 9 Nov £1,462 orphan;
  - **P06** gets a new layer set (M5);
  - **P09** has 3 open nights before handback;
  - **P01** has nothing left to sell.

**M10. Listing hygiene** (live `get_listing_data`; `data/id_map.json`, last committed 22 Oct)
- **`_unmatched`:** the three Marylebone Vrbo listings (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`, "push off") are still **not among the 20 PriceLabs listings**. **Question:** were they removed on purpose? If so, update `id_map.json`.
- **`confidence: check`:**
  - **P03** is priced via **Channex**: push on, last push 1 Nov 02:48:05Z, fully blocked (intentional);
  - **P15-P19 have no PriceLabs listing.** **Question:** should they be priced?
- **P02 Vrbo copy `_units_0004_ca1ccf61`:** push on, last push **24 Feb 2026**. **Question:** turn push off or remove it?
- **Vrbo copies get every override copied from the parent** (`add_custom_pricing_from_parent`) and push separately: P11 `_7fd3…` 31 Oct 22:09:18Z, P12 `_386e…` 22:06:47Z, P13 `_3d48…` 22:16:00Z.
- **P13:** 3064856 and 3090701 share coordinates (51.5088201, -0.2342476), get the same overrides and are one flat (policy).
- P20 is not in the info pack. P04 recommended base reads "Unavailable".
- **Info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`, mtime 13 Oct, unchanged): same differences as 31 Oct.
  - Bases P01 230/253, P05 455/550, P06 340/357, P09 160/176, P11 260/286, P12 270/284, P13 235/250, P14 475/525;
  - P14 min 400/500;
  - P05 listed as 5-bed.
  - **The pack is out of date.**

### Open plan items: status 1 Nov

| Item | Status |
|---|---|
| Reyhan conflicts | P04 1-2 Nov min 2 **still open tonight** (now +20%); P11 darts **worse** (-5%, avg £208.60); P12 17 Nov **worse** (-7%, £224); P13 base 250 **unchanged**; **new**: P13 1-3 / 8-12 Nov -5% vs Corentin's 0%, P20 -10% vs Corentin's -5%, P04 -10% vs Corentin's -8% (H1) |
| t-push-check (P06/P09) | P06 was stale 31 Oct 08:23Z-22:10Z, rescued by an edit (C1). P09 is due by 08:09Z today, not re-read (M1) |
| a-discount-cut | **Not done, and the gap widened**: £3,125 / £1,142 (was £2,392 / £930 on the same dates) (H2) |
| a-p05-9nov | PriceLabs side unchanged, £1,462 (H3). Airbnb side NOT CHECKED |
| a-peak-check / t-p05-calendar | P05 29 Dec £1,354 and P13 25-26 Dec min 3: unchanged (H3, M4) |
| P20 1 Nov orphan | Unsellable at min 2 tonight (H4) |
| t-p20-delivery | 20-22 Nov still open (M6) |
| P04 19-20 Dec cancellation | **Seen by PriceLabs**; 19 Dec open at £207 (M3) |
| t-p06-open | Still open, now £1,841 (M5) |
| a-raise-1012nov | Not done; 12 Nov moved down to £147 (M6) |
| a-p13-orphan-price, a-p05-dec | Unchanged (M6) |
| a-base-review-1102 | Inputs in M9 |
| t-p04-doublebook, a-airbnb-rules, a-p13-twin, a-bcom-cancel, t-p05-calendar (OTA side) | NOT CHECKED here |

Data gaps:
1. The raw window is **2 Nov-31 Dec**: tonight (1 Nov) has no PriceLabs price in the snapshot. The 180-day floor/ceiling check and the 5-night / 7-night rules are NOT CHECKED.
2. `kpi_pack.json`:
   - `market_percentiles` are null and `gaps` is [] despite real orphans;
   - today's `market.csv`, `comps.csv` and `channel_checks.csv` are empty, so base vs market uses the latest 31 Oct `market.csv` rows.
3. 3090701 has no Smoobu rate in `prices.csv`, so its sync is NOT CHECKED.
4. P09 push status after 08:09Z today is NOT CHECKED (the run ended before it).
5. Customization changes do not appear in `get_user_logs`. Who changed P06's layers, and when, is NOT CHECKED.
6. Not read live today:
   - overrides on P01, P08, P09, P10, P14, 3090701 and the Vrbo copies (mirrored per the `_from_parent` logs);
   - customizations on P10, P14 and P02/P03/P07;
   - the P20 min-stay profile behind 25-26 Dec min 4.
7. Whether the edit-only push pattern (C1) is a failed scheduled sync or the normal PriceLabs schedule is NOT CHECKED. It needs the PriceLabs sync log.
8. Two pairs of PriceLabs calls ran in parallel, against the one-at-a-time rule. Both returned 200, so no data is affected.

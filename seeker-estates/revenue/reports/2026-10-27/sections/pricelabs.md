## PriceLabs audit (D = 2026-10-27)

**Sources**
- Snapshot `data/snapshots/2026-10-27/`: `raw/listing_data.json` (06:56Z), `raw/prices_*.json` (28 Oct-26 Dec, refreshed 26 Oct 07:48Z-27 Oct 05:50Z), `prices.csv`, `listings.csv`, `reservations.csv`. No `market.csv`.
- `reports/2026-10-27/kpi_pack.json`: `sync_issues`, `bounds`, `market_percentiles`, `avg_open_price_next30`, `gaps` all null.
- Baseline: `reports/2026-10-26/sections/pricelabs.md`, `reports/2026-10-26/daily-report.md`.
- Live read-only PriceLabs, 07:05-07:20Z, one call at a time:
  - `get_user_logs` listing / group / account, 26-27 Oct;
  - `get_customizations` (last-minute, occupancy, booking recency; toggled_on=false) on 3562176, 3166592, 3318167, 3318172, 3064196, 2699998, 3064856, 3090701, 3547481;
  - `get_listing_date_overrides` on 2699998, 3562176, 3064196, 3064856, 3547481, 3318172, 3166592, 3318167.
- Nothing changed. Policy respected:
  - P02/P03/P06/P07 blocks excluded;
  - P14 numbers only;
  - not re-raised: P04 2 Dec, P12 17 Nov, P13 1 Dec, P11 darts +5%;
  - nights after handback dates excluded.

### What changed since the 26 Oct run
- **Logged:** 36 listing-log entries, all from reyhan@, made in two sessions on 26 Oct: 10:11-10:21Z and 18:36-18:45Z. Group and account logs are empty.
- **Unlogged customization changes** (live `get_customizations` vs the 26 Oct section). Who made them and when is UNKNOWN; customization edits are not in the logs:
  - P05: last-minute -25% flat changed to -1% gradual (15 days). But Occupancy changed from custom "Default" to **Aggressive**, and Booking Recency was switched **ON (default 5-15%)**.
  - P11: last-minute -18% changed to **0%**.
  - P13 (both listings): Booking Recency switched **ON (default)**; it was off on 26 Oct.
- **Pushes:** the 18:35-18:50Z pushes on P04, P05, P09, P11, P12, P13 and the Vrbo copies coincide with Reyhan's edits (`listing_data.json`).

---

### CRITICAL

**1. P08 Islington: PriceLabs refreshed but did not push. Smoobu is below PriceLabs on every open night.** (`listing_data.json`, `prices.csv`)
- `last_refreshed_at` 26 Oct 18:40:37Z, but `last_date_pushed` is **26 Oct 07:48:44Z**. That is over 24 h old since 07:48Z today, with push on.
- Open nights where Smoobu is lower:

  | Dates | PriceLabs | Smoobu |
  |---|---|---|
  | 29-30 Oct | £172 / £185 | £169 / £181 |
  | 5-7 Nov | £190 / £213 / £211 | £187 / £207 / £206 |

  Smoobu is **£21 lower** over these 5 nights. Smoobu also differs on the booked nights 31 Oct-13 Nov and the blocked nights after the handback.
- Possible causes, none confirmed: push failure after the refresh; sync off on the Smoobu side; a manual Smoobu rate.
- Check: PriceLabs 3318167 > Sync Now and the push log; Smoobu > Rates for 29-30 Oct and 5-7 Nov.

**2. Stale pushes on listings with no sellable nights** (critical by rule, about £0 at stake)
- P10 3318177: last push 26 Oct 07:48:45Z.
- P01 3320302: 07:52:59Z.
- P06 3288517: 07:53:02Z.
- All three have 0 open nights in the next 60 days (`prices.csv`).
- P10 Smoobu differs from PriceLabs on every booked or blocked night, e.g. 14 Nov £169 vs £183. This is not revenue-relevant.
- Check: whether PriceLabs is still syncing these listings (Sync Now).

### HIGH

**3. a-discount-cut: two settings cut, three new layers added. The overall gap is unchanged.** (live `get_customizations`; target from daily-report 26 Oct row 1: Custom 0% on all three settings)

| Ref | Last-minute | Occupancy | Booking Recency | vs 26 Oct |
|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default | unchanged |
| P05 3166592 | **-1%** gradual, 15 d (was -25% flat) | **Aggressive** (was custom Default) | **ON** default (was off) | 1 cut, 2 new layers |
| P08 3318167 | -18% gradual | Market Driven (toggle off) | off, so default applies | unchanged |
| P09 3318172 | -18% gradual | Market Driven (toggle off) | off, so default applies | unchanged |
| P11 3064196 | **0%** (was -18%) | Aggressive | ON default | 1 cut |
| P12 2699998 | 0% | custom milder table | ON default | unchanged |
| P13 3064856 / 3090701 | -5% / 14 d | Aggressive | **ON** default (was off) | 1 new layer |
| P20 3547481 | 0% | Aggressive | ON default | unchanged |

- **Fully at Custom 0% on all three settings:** none.
- **Final vs uncustomized, open nights** (`raw/prices_*.json` `price` vs `uncustomized_price`; windows 28 Oct-10 Nov and 11-26 Nov; the 26 Oct column used 27 Oct-9 Nov). The gap mixes customizations, overrides and floors.

  | Ref | Next 14 days now | 26 Oct | Days 15-30 now | 26 Oct |
  |---|---|---|---|---|
  | P04 | 10 n £1,643 vs £2,244, **-26.8% (£601)** | -29.9% | 7 n £1,485 vs £1,662, -10.6% (£177) | -25.3% |
  | P05 | 6 n £2,522 vs £2,805, **-10.1% (£283)** | -9.6% | 2 n £871 vs £1,053, **-17.3% (£182)** | -0.5% |
  | P20 | 11 n £2,687 vs £2,976, **-9.7% (£289)** | -8.9% | 14 n £3,645 vs £3,881, -6.1% (£236) | -6.0% |
  | P11 | 7 n £1,443 vs £1,562, -7.6% (£119) | **-18.2%** | 12 n £2,692 vs £3,106, **-13.3% (£414)** | -12.9% |
  | P13 3064856 | 7 n £1,068 vs £1,143, -6.6% (£75) | -3.5% | 12 n £2,275 vs £2,335, -2.6% | +3.4% |
  | P13 3090701 | 7 n £1,297 vs £1,361, -4.7% (£64) | -1.1% | 12 n £2,390 vs £2,610, -8.4% (£220) | -3.3% |
  | P12 | 4 n £967 vs £991, -2.4% | -6.3% | 8 n £2,238 vs £2,359, -5.1% (£121) | -5.3% |
  | P09 | 5 n £689 vs £685, +0.6% | +0.6% | 2 n £313 vs £329, -4.9% | -1.8% |
  | P08 | 6 n £1,140 vs £1,121, +1.7% | +1.6% | 0 (handback 13 Nov) | - |

- **Remaining gap over the next 30 days: about £2,877**, against about £3,000 on 26 Oct. This is (uncustomized - final) summed over P04 £778, P20 £525, P11 £533, P05 £465, P13 £135 + £284, P12 £145 and P09 £12. It is an upper bound and is not weighted for booking probability.
- **Cut worked:** P11 inside 14 days (-18.2% to -7.6%) and P12 (-6.3% to -2.4%).
- **Got worse:** P05 days 15-30 (-0.5% to -17.3%, on 2 nights only) and P13 inside 14 days. These match the new Aggressive / Recency layers and the new -2% overrides (item 4). Not decomposed per setting.
- **P08 and P09:** final is at or above uncustomized despite the -18% last-minute setting and a -5% override on P09. Why the `uncustomized_price` field does not reflect these is UNKNOWN.
- **Check in PriceLabs > listing > Customizations:** set Custom 0% explicitly, not toggle off.
  - P05: Occupancy and Recency;
  - P13 (both): last-minute, Occupancy and Recency;
  - P04: all three;
  - P11 and P20: Occupancy and Recency;
  - P12: Occupancy and Recency;
  - P08 and P09: last-minute and Recency.

**4. New negative date overrides on 26 Oct (Reyhan), against the direction of the cut** (`get_user_logs`, `get_listing_date_overrides`)
- **P13** 3064856, copied to 3090701 and the Vrbo copy:
  - 31 Oct-27 Nov **-2%**, min 2 (18:37:34Z). This overwrote the 31 Oct +1% set 30 s earlier, and the 0% recorded in policy `price_changes` on 24 Oct (31 Oct-3 Nov, 8-12 Nov, 17-27 Nov).
  - 7-20 Dec **-2%**, min 2 (no override on 26 Oct).
- **P11** 3064196, copied to Vrbo:
  - 28 Oct-13 Nov **-3%** (was -1%);
  - 18-27 Nov **-3%**, min 2;
  - still in place: 14-17 Nov -5%, 27 Oct -2%.
- **P09** 3318172: **-5% extended to 27 Oct-12 Nov** (was 26-31 Oct). It was removed at 10:18Z and re-added at 18:41Z. 13-26 Nov -2% remains.
- **P04** 3562176. Corentin's -8% on 1-25 Nov (policy `price_changes` 24 Oct) was replaced:

  | Dates | Override | Min stay |
  |---|---|---|
  | 1-17 Nov | **-3%** | 3 |
  | 18-20 Nov | **+25%** | **2** |
  | 21-22 Nov | -2% | 3 |
  | 23-25 Nov | **+25%** | **2** |
  | 6-22 Dec | -3% (was -5%) | 3 |

  Unchanged: 26-30 Nov -8%, 3-5 Dec -8%, 23-31 Dec -5%, Jan -2% / -5%, Feb -5%.
- **Removed or raised (in the direction of the cut):**
  - P12: 22 Nov-13 Dec -2%/-1% removed; 1-4 Nov -4% changed to -2%; 12-13 Nov -4% removed.
  - P20: 2-5 Nov and 9-12 Nov -2% removed (min 2).
  - P05: 29-30 Oct +10%, 6-7 Nov +10%, 7-8 Dec +5%; negatives removed on 8-9 Nov, 16-17 Nov and 13-21 Dec.
- **Negatives still on open nights:**
  - P12: -4% 27-31 Oct, 5-11 Nov, 14-15 Nov; -2% 1-4 Nov; -8% 18-21 Nov.
  - P05: -2% 27 Oct; -3% 31 Oct and 10-15 Nov; -2% 29 Nov-2 Dec; -5% 3-6 Dec; -3% 9-12 and 22-28 Dec.
  - P20: -4% 28-30 Oct; -2% 31 Oct-1 Nov, 6-8 Nov, 13-30 Nov.
  - P08: -2% 27 Oct-13 Nov.
  - P13: -1% 27-30 Oct and 28-30 Nov; -3% 2-6 Dec and 21-31 Dec.
- **Check:** PriceLabs > Date Specific Overrides on 3064856, 3064196, 3318172 and 3562176. Corentin to confirm whether Reyhan's -2% / -3% / -5% stand.

**5. a-p12-2228nov NOT applied. 22-28 Nov rose instead of moving to the market median.** (`get_listing_date_overrides` 2699998; `raw/prices_2699998.json`, refreshed 26 Oct 18:35Z)
- 22 Nov-13 Dec is now a **price-less override (0%, min 2)**, set by Reyhan 26 Oct 10:11:19Z and copied to the Vrbo copy. There are no fixed prices.
- PriceLabs 22-28 Nov:

  | | 22 Nov | 23 | 24 | 25 | 26 | 27 | 28 | Total |
  |---|---|---|---|---|---|---|---|---|
  | Now | £269 | £273 | £252 | £272 | £269 | £298 | £309 | **£1,942** |
  | Target (fixed) | £224 | £219 | £220 | £221 | £233 | £246 | £236 | **£1,599** |

  Now is **+21.5% over target**, and up from £1,886 on 26 Oct.
- Uncustomized for these nights is £2,130. The remaining -8.8% comes from the custom occupancy table and Booking Recency.
- Check: PriceLabs 2699998 > Date Specific Overrides > fixed price on 22-28 Nov. Corentin to decide.

**6. P20 push goes stale at 10:20Z today** (`listing_data.json`)
- Last refresh and last push were 26 Oct 10:20:36/37Z. No evening refresh.
- P20 has **55 open nights** in the next 60 days.
- Re-check `last_date_pushed` after 10:20Z.

### MEDIUM

**7. 26 Oct sync items closed** (`prices.csv`)
- **P04 1-7 Nov:** Smoobu now equals PriceLabs (£165/164/165/166/163/162/165). Pushed 26 Oct 18:45:23Z.
- **P13 3064856 7-20 Dec:** Smoobu equals PriceLabs (e.g. 7 Dec £227, 19 Dec £248). Pushed 18:38:09Z.
- **3090701:** its Smoobu rate is still not merged into `prices.csv`: NOT CHECKED.
- No other open-night differences above £2 except P08 (item 1).

**8. New bookings in PriceLabs** (`raw/prices_*.json` vs `reservations.csv`)

| Booking | In PriceLabs? |
|---|---|
| P12 Booking.com 4-8 Dec | Yes. 4-7 Dec Booked, booked_date 26 Oct (PriceLabs £309/323/275/273) |
| P04 Airbnb 19-20 Dec | Yes. 19 Dec Booked, booked_date 26 Oct |
| P06 5-8 Nov (25 Oct booking) | Yes, now |
| P08 31 Oct-5 Nov (25 Oct booking) | Yes, now |
| P13 Airbnb 27 Dec-3 Jan | Outside the 60-day raw window (ends 26 Dec): NOT CHECKED |

- **P04 Booking.com 20-23 Nov is NOT cancelled.**
  - `reservations.csv` has 3 rows for it, all booked 26 Oct at £355.82: **one confirmed** and two cancelled.
  - PriceLabs shows 20-22 Nov Booked (booked_date 26 Oct).
  - This corrects the overnight note that said "appears cancelled".
- **P04 19 Dec, 1 night on Airbnb, sold despite PriceLabs min stay 3** (19 Dec min_stay 3 in raw).
  - Policy `listing_facts.P04.min_stay_rule` says never fewer than 3 nights.
  - This suggests the Barking Airbnb account's minimum stay is not fed from PriceLabs/Smoobu. This is an inference.
  - Check: Airbnb (Barking account) > Availability > minimum nights, and whether Smoobu now manages it.

**9. Min stay set against policy by the 26 Oct edits** (`prices.csv`, overrides)
- **P04 18-19 Nov and 23-24 Nov: min 2.** These are two 2-night gaps, priced £210/£211 and £216/£216 with a +25% override. They sit between the 14-18 Nov, 20-23 Nov and 25 Nov bookings.
  - Policy: P04 never opens for fewer than 3 nights. Corentin to confirm or revert.
- **P20 27 Oct, 2-5 Nov and 9-12 Nov: min 2.** Policy `listing_facts.P20.min_stay` says 3 nights to 30 Nov. Corentin to confirm.

**10. Orphan gaps and short runs** (open nights; policy 2-3 nights, 5 at 60+ days)
- Sellable at the current minimum:
  - P04 18-19 Nov and 23-24 Nov (item 9);
  - P05 29-30 Oct £367/£372, 16-17 Nov £427/£444, 7-8 Dec £512/£504 (min 2);
  - P08 28-30 Oct £169/£172/£185 and 5-7 Nov £190/£213/£211;
  - P09 10-12 Nov £149/£156/£157;
  - P12 12-13 Nov £225/£291;
  - P11 23-25 Dec £348/£351/£346 (min 3/2/2).
- **P13 25-26 Dec: min 4** on both listings (£238/£271 and £225/£271). The 27 Dec-3 Jan booking now follows, so arrivals on 25 or 26 Dec cannot be sold. Those nights only sell inside a stay that starts on or before 24 Dec (24 Dec is min 3).
  - Check: Date Specific Override min stay on 25-26 Dec, or the orphan-day setting. Whether PriceLabs already knows about the 27 Dec booking is UNKNOWN (outside the window).
- **P20 min 4** on 11 weekend nights between 4 and 26 Dec. Carried over; source UNKNOWN.
- Not re-raised: min 1 on P04 2 Dec, P12 17 Nov, P13 1 Dec.

**11. a-p08-arsenal not applied** (`get_listing_date_overrides` 3318167)
- 6-7 Nov is still -2% (PriceLabs £213/£211; Smoobu £207/£206, see item 1).

**12. a-p13-twin**
- 24-25 Nov now differ: 3064856 £186/£188 vs 3090701 £197/£200.
- The only identical open night is **26 Dec, £271 on both**.
- The child offset was not read: NOT CHECKED.

**13. Floor and ceiling** (raw, 60 days)
- P14: 44 of 60 open nights at the £500 minimum (73%). Special setup, numbers only.
- Every other listing: 0 open nights at min or at max.
- The 180-day check is NOT POSSIBLE (raw ends 26 Dec).

**14. Listing hygiene** (`listing_data.json`)
- All 20 PriceLabs listings have push on.
- The P02 Vrbo copy last pushed 2026-02-24 (intentional block).
- Vrbo copies push separately: P11 18:39Z, P12 18:36Z, P13 18:50Z on 26 Oct.
- P03 is priced via Channex.
- Carried over: P15-P19 have no PriceLabs listing, and P20 is not in the info pack.

Data gaps:
1. Customization edits are not in `get_user_logs`. Who changed P05 (Aggressive, Recency ON), P11 (last-minute 0%) and P13 (Recency ON), and when, is UNKNOWN.
2. 3090701 Smoobu rates are not in `prices.csv`: its sync is NOT CHECKED.
3. P13 27 Dec-3 Jan and everything after 26 Dec: outside raw, NOT CHECKED.
4. No `market.csv`, and the pack's `market_percentiles` / `bounds` are null: base vs market is NOT CHECKED. For reference only, PriceLabs `recommended_base` vs base (`listings.csv`): P05 £464 vs £550, P11 £265 vs £286, P13 £233/232 vs £250, P12 £279 vs £284.
5. Not read today:
   - customizations on P14, P06, P01, P10 and account level;
   - overrides on 3090701 and the Vrbo copies (the logs show them copied);
   - the orphan-day setting (not returned by `get_customizations`).
6. Info-pack min/max comparison (`build/properties.py`) not redone; unchanged from the 25-26 Oct sections.
7. Why `uncustomized_price` on P08 and P09 does not reflect the -18% last-minute setting or the P09 -5% override is UNKNOWN.

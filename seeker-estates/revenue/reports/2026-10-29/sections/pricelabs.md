## PriceLabs audit (D = 2026-10-29)

**Sources**
- Snapshot `data/snapshots/2026-10-29/`: `raw/listing_data.json` (pulled 06:56Z), `raw/prices_*.json` (06:57-07:18Z; window **30 Oct-28 Dec**, 29 Oct not in raw), `prices.csv` (PriceLabs vs Smoobu), `listings.csv`, `reservations.csv` (`total_gbp` = room only, cleaning excluded).
- Baseline: `data/snapshots/2026-10-28/raw/*`, `reports/2026-10-28/sections/pricelabs.md`, `reports/2026-10-28/daily-report.md`.
- Live read-only PriceLabs calls on 29 Oct, one at a time:
  - `get_user_logs` listing / group / account, 28-29 Oct;
  - `get_listing_date_overrides` on 3547481, 3562176, 3064196, 3064856, 2699998, 3166592, 3288517;
  - `get_customizations` (toggled_on=false) on 3547481, 3064196, 3166592, 3064856, 3090701, 3562176, 2699998, 3318167, 3318172, 3288517, 3267077, plus the Smoobu account level (empty);
  - `get_listings`: 20 listings, the same set as 28 Oct.
- `kpi_pack.json` `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all null. There is no 29 Oct `market.csv`, so base vs market uses `data/snapshots/2026-10-28/market.csv` and today's `raw/neighbourhood_P13.json`.
- Price field: `price` in the raw files equals Smoobu's stored rate on every open night (`prices.csv`, 0 differences), so `price` is used as "final" throughout. `user_price` differs from `price` on many nights (e.g. P20 13 Nov `price` £264, `user_price` £235). Its meaning is UNKNOWN (see Data gaps).
- Policy respected:
  - P02/P03/P06/P07 blocks, P14 special setup (numbers only), handback dates, P13 1 Dec, P04 2 Dec;
  - P04 min-3 rule;
  - P11 darts and P12 17 Nov are reported only as conflicts with standing decisions, not as new proposals.

### What changed since the 28 Oct run
- **Logs:** 29 listing-log entries, all from reyhan@ on **28 Oct** (10:28:59-10:32:30Z, 12:44:13-12:44:36Z, 14:15:45Z). Group and account logs are empty.
  - **P11 3064196** (copied to Vrbo): min-stay-only overrides, **min 2**, with no price. Ranges: 31 Oct-1 Nov (10:28:59Z), 22-25 Nov, 29 Nov-2 Dec, 8-9 Dec and **13-16 Dec** (10:29:53Z). The last one replaces the 27 Oct -2% on 13-16 Dec.
  - **P13 3064856** (copied to 3090701 and Vrbo):
    - **17 Nov +35%, min 1** (10:30:28Z);
    - **27 Nov +50%, min 1** (10:30:36Z);
    - 31 Oct-12 Nov **+2%**, min 2 (10:30:49Z).
  - **P20 3547481:**
    - 9-12 Nov -5% min 2 (10:31:50Z), then **6-24 Nov -5%, min 3** (14:15:45Z). This replaces the -10% on 6-8 Nov and 13-24 Nov and the -2% min 2 on 9-12 Nov;
    - unchanged: 31 Oct-1 Nov +10% min 2, 25-30 Nov -10% and 1-20 Dec -5%.
  - **P04 3562176:** 1-17 Nov **-7%** (was -5%) and 6-22 Dec **-7%** (was -5%), both min 3 (10:32:22Z / 10:32:30Z).
  - **P12 2699998** (copied to Vrbo):
    - 17 Nov-3 Dec min-stay-only min 2 (12:44:13Z);
    - 1-4 Nov **-5%** (12:44:26Z);
    - **16 Nov-13 Dec -2%**, min 2 (12:44:36Z).
- **Customizations: no change** from the 28 Oct readings on any listing read (same values and same `effective` text). Account level is empty.
- **PriceLabs calendar now shows** these as Booked:
  - P11 30 Oct and 5-7 Dec;
  - P13 18-26 Nov (3064856; 3090701 unavailable);
  - P20 25 Nov-4 Dec.
- **Reopened:** P12 18-21 Nov (cancellation). **P06 8-14 Nov is now open** (status blank, `user_price` set, `prices.csv` available=True).

---

### CRITICAL
- **None at pull time.** All 20 listings have push on, and every Smoobu/Channex listing pushed within 24 h of 06:56Z (`listing_data.json`).
- **Watch:** 8 listings have pushed only at the moments someone edited or refreshed them on 28 Oct. None pushed overnight, for the second night running. They go stale (24 h) today if they do not push again:

  | Stale at (29 Oct) | Listing | Last push 28 Oct |
  |---|---|---|
  | 08:54Z | P09 3318172 | 08:54:49Z (no log entry) |
  | 09:04Z / 09:05Z | P05 3166592 / P06 3288517 | 09:04:45Z / 09:05:00Z (no log entry) |
  | 10:30Z / 10:31Z / 10:33Z | P11 3064196 / P13 3064856 + 3090701 / P04 3562176 | right after Reyhan's edits |
  | 12:45Z | P12 2699998 | 12:45:11Z (edit 12:44Z) |
  | 14:20Z | P20 3547481 | 14:20:20Z (edit 14:15Z) |

  P01, P02, P03, P07, P08, P10 and P14 pushed between 00:25Z and 06:46Z on 29 Oct by themselves. **Check:** re-read `last_date_pushed` after 14:30Z. If any is older than 24 h, it is critical (push failure or a refresh that only runs on edit).

### HIGH

**1. t-pl-sync: the P11/P13 bookings are now seen, but two new bookings and one cancellation are not** (`raw/prices_3562176.json`, refreshed 28 Oct 10:33:06Z; `raw/prices_2699998.json`, refreshed 28 Oct 12:45:09Z; `reservations.csv` 29 vs 28 Oct)

| Smoobu (`reservations.csv`) | Booked | PriceLabs shows | PriceLabs price |
|---|---|---|---|
| P04 Booking.com 3-6 Nov, room £393.18 | 28 Oct | 3-5 Nov **open** | £156 / £156 / £157 |
| P12 Booking.com 21-26 Nov, room £1,012.36 | 28 Oct | 21-25 Nov **open** | £262 / £240 / £243 / £222 / £242 |
| P12 Booking.com 4-8 Dec, **cancelled** (£1,116.99) | - | 4-7 Dec still **Booked** | (£301 / £310 / £264 / £263) |

- Fixed since yesterday: P11 30 Oct and 5-7 Dec, and P13 18-26 Nov, are Booked in PriceLabs.
- Smoobu holds these dates closed, so there is no overbooking risk on the open-in-PriceLabs nights. The P12 4-7 Dec nights are open in Smoobu but closed in PriceLabs, so they are priced from stale data.
- Effects:
  - PriceLabs `occupancy_next_30` is P04 43% and P12 47% (`listing_data.json`), so the Aggressive (P04) and Custom (P12) occupancy tables work from the wrong occupancy;
  - when P04 is refreshed, **1-2 Nov becomes a 2-night gap at min 3** (£156/£156). Policy `listing_facts.P04.min_stay_rule` keeps it closed. This is a fact, not a proposal.
- Possible causes, none confirmed: no PriceLabs re-sync since the 28 Oct edit-triggered refreshes; Smoobu-to-PriceLabs reservation lag.
- **Check:** PriceLabs 3562176 and 2699998 > Sync Now / Refresh. Then confirm 3-5 Nov (P04) and 21-25 Nov (P12) show Booked and P12 4-7 Dec opens.

**2. Conflict with standing decision: P12 17 Nov +50% removed by Reyhan** (`get_user_logs` 28 Oct 12:44:13Z and 12:44:36Z; `get_listing_date_overrides` 2699998; policy `deprioritised.p12_17nov_override`)
- Policy: "Corentin 24 Oct: won't change Mile End 17 Nov +50%."
- Now 17 Nov is **-2%, min 2**. The price is **£227**, down from **£387** on 28 Oct (uncustomized £241). Min stay went from 1 to 2.
- This is not a proposal. **Corentin to confirm** whether Reyhan's 16 Nov-13 Dec -2% should overwrite his 17 Nov decision.
- **Check:** PriceLabs 2699998 and the Vrbo copy > Date Specific Overrides > 17 Nov.

**3. Conflict with standing decision: P11 darts 13-17 Dec still well under the 21 Oct raise** (`get_listing_date_overrides` 3064196; `raw/prices_3064196.json`; policy `price_changes` 21 Oct and `listing_facts.P11.darts_override_24oct`)
- Today:
  - **13-16 Dec** is a min-stay-only override (min 2, no price), set 28 Oct 10:29:53Z. Reyhan's -2% is gone, but the +5% Corentin said to leave is not restored;
  - **17-18 Dec -2%**, min 2, and **12 Dec -2%**, min 3, remain from 27 Oct.
- Prices 13-17 Dec:

  | | 13 Dec | 14 | 15 | 16 | 17 | Total | Average/night |
  |---|---|---|---|---|---|---|---|
  | 27 Oct | £260 | £235 | £236 | £250 | £269 | £1,250 | £250 |
  | 28 Oct | £218 | £198 | £199 | £211 | £228 | £1,054 | £211 |
  | **29 Oct** | **£223** | **£200** | **£201** | **£212** | **£224** | **£1,060** | **£212** |

  Policy says "average above £300/night". 12 Dec is £303 and 18 Dec £269.
- Min stay on 13-16 Dec went from 3 to 2.
- **Corentin to confirm.** Check PriceLabs 3064196 + Vrbo copy > Date Specific Overrides > 12-18 Dec.

**4. a-discount-cut: NOT applied. Every customization is unchanged** (live `get_customizations`, `effective` block). Remaining layers vs the Custom 0% target are the same as 28 Oct:

| Ref | Last-minute | Occupancy | Booking Recency | Seasonality | Demand Factor |
|---|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default | None (off) | Conservative |
| P05 3166592 | -1% gradual, 15 d | Aggressive | ON default | None (off) | Conservative |
| P08 3318167 / P09 3318172 | -18% gradual, 15 d | Market Driven (off) | off, so default applies | None | Moderately Aggressive |
| P11 3064196 | 0% | Aggressive | ON default | None (off) | None (off) |
| P12 2699998 | 0% | Custom (milder) | ON default | None | Moderately Conservative |
| P13 3064856 / 3090701 | -5% gradual, 14 d | Aggressive | ON default | Moderately Conservative (ON) | Conservative |
| P20 3547481 | 0% | Aggressive | ON default | None (off) | None (off) |
| P06 3288517 | Market Driven (40% same-day to 0% at 12 d) | Market Driven | default | None | None |
| P14 3267077 (special) | -25% gradual, 30 d | Market Driven | default | None | None |

- **Final vs uncustomized, open nights.** `price` vs `uncustomized_price`. P04 3-5 Nov and P12 21-25 Nov are excluded (booked in Smoobu). Nights after handback are excluded.
- Today's windows are **30 Oct-12 Nov** (14) and **30 Oct-28 Nov** (30). Yesterday's were 29 Oct-11 Nov / 29 Oct-27 Nov.

  | Ref | Next 14 | 28 Oct | Next 30 | 28 Oct |
  |---|---|---|---|---|
  | P04 | 9 n £1,422 vs £1,796, **-20.8% (£374)** | -24.0% | 14 n £2,407 vs £2,970, **-19.0% (£563)** | -20.9% |
  | P20 | 9 n £2,309 vs £2,833, **-18.5% (£524)** | -19.4% | 19 n £4,948 vs £5,807, **-14.8% (£859)** | -16.9% |
  | P11 | 6 n £1,275 vs £1,400, -8.9% (£125) | -11.2% | 18 n £4,158 vs £4,708, **-11.7% (£550)** | -12.6% |
  | P05 | 4 n £1,812 vs £1,985, -8.7% (£173) | -10.1% | 6 n £2,673 vs £3,026, **-11.7% (£353)** | -12.5% |
  | P12 | 5 n £1,163 vs £1,215, -4.3% (£52) | +0.2% | 13 n £3,190 vs £3,419, **-6.7% (£229)** | -2.3% |
  | P09 | 5 n £752 vs £766, -1.8% (£14) | +0.4% | 5 n (handback 26 Nov) | -0.5% |
  | P08 | 3 n £661 vs £665, -0.6% | -0.4% | 3 n (handback 13 Nov) | |
  | P13 3064856 | 9 n £1,408 vs £1,439, -2.2% (£31) | -5.7% | 11 n £2,025 vs £1,990, **+1.8%** | -5.7% |
  | P13 3090701 | 9 n £1,709 vs £1,658, +3.1% | -4.5% | 11 n £2,326 vs £2,209, +5.3% | -5.6% |
  | P06 (now open, 8-14 Nov) | 5 n £1,575 vs £1,571, +0.3% | n/a | 7 n £2,137 vs £2,133, +0.2% | n/a |

- **Total uncustomized minus final** (excluding P06 and P14; both P13 listings counted, so this is an upper bound):
  - **next 14 £1,246** (28 Oct £1,515);
  - **next 30 £2,420** (28 Oct £3,138).
- Most of the fall is the window moving and nights selling: P13 18-26 Nov is now Booked, P20 25-28 Nov sold. The rest is Reyhan's edits on P13 (+2%, 17/27 Nov premiums) and on P20 (-10% to -5%).
- **P04 and P20 are still about -15% to -21%**, and the cause is the customization stack, not the overrides. Example: P20 13 Nov is £264 vs £297 uncustomized with only a -5% override.
- **Check:** PriceLabs > listing > Customizations: set each remaining layer to Custom 0% explicitly (not toggle off).

**5. Reyhan's 27 Oct edits: what changed overnight** (logs, overrides, raw)

| 27 Oct edit | Status 29 Oct | Source |
|---|---|---|
| P11 18 Nov-16 Dec -2% min 3; 17-18 Dec -2% min 2 | **Partly reversed.** 22-25 Nov, 29 Nov-2 Dec, 8-9 Dec and 13-16 Dec are now min-only (0%), min 2. -2% remains on 18-21 Nov, 26-28 Nov, 3-7 Dec, 10-12 Dec and 17-18 Dec | overrides 3064196 |
| P20 6-8 Nov and 13-30 Nov -10%; 1-20 Dec -5% | **Partly reversed.** 6-24 Nov is now -5% min 3 (14:15:45Z), so 13-19 Nov went from £237-£243 to £261-£266. 25-30 Nov -10% remains (now booked); 1-20 Dec -5% remains. Corentin's 24 Oct "-5% 31 Oct-19 Nov" (policy) now runs to 24 Nov | overrides 3547481, raw |
| P20 9-12 Nov min 2 | **Fixed:** min 3 | overrides, `prices.csv` |
| P20 31 Oct-1 Nov +10% min 2 | Unchanged. 2-night gap between bookings, £240/£244 (uncustomized £277/£295) | overrides |
| P04 18-19 / 23-24 Nov +15% min 2 | **Unchanged: min 2** vs policy min 3 (£191/£193, £198/£198) | overrides 3562176, `prices.csv` |
| P04 1-17 Nov / 6-22 Dec -5% | Deepened to **-7%** (28 Oct 10:32Z). Policy 24 Oct records Corentin's -8% on 1-25 Nov, so the current state differs from policy on 18-25 Nov (+15% / -2% / booked) | overrides, policy `price_changes` |
| P13 23-26 Dec -3% min 3 | Unchanged | overrides 3064856 |
| P05 6-7 Nov 0% min 2 | Unchanged | overrides 3166592 |
| P06 9-15 Nov min 2 | Unchanged, and 8-14 Nov is now open (item 10) | overrides 3288517 |

**Corentin to confirm or revert:** P04 min 2 (policy conflict), P04 -7% vs -8%, and P20 -5% extended to 24 Nov.

**6. P20 25 Nov-5 Dec Airbnb booking sold inside the deepest overrides** (`reservations.csv`; 28 Oct raw `prices_3547481.json`, refreshed 27 Oct 14:42:29Z; overrides)
- 10 nights, room **£1,742.65**, booked 28 Oct.
- PriceLabs price on those nights in the 28 Oct raw: **£2,726**, with the -10% override on 25-30 Nov and -5% on 1-4 Dec in force. Ratio **0.639x**.
- After the policy 15% weekly discount (7-27 nights), the expected room is about **£2,317**. Paid is **0.752x of that, about £574 unexplained** by PriceLabs or policy-listed Airbnb discounts.
- 25 Nov is 28 days after booking, so Airbnb's 0-14-day last-minute discount does not apply.
- The price pushed at booking time is UNKNOWN: P20 pushed at 14:20Z on 28 Oct, and the booking time is not in the CSV.
- **Check:** the Airbnb reservation price breakdown, and whether Smoobu Airbnb default pricing rules apply to P20 (a-airbnb-rules).

### MEDIUM

**7. a-p13-orphans-nov: min stay fixed, but priced at a premium** (`get_user_logs` 28 Oct 10:30:28Z / 10:30:36Z; overrides 3064856; `prices.csv`)

| Night | Override | Min stay | Smoobu = PriceLabs | Uncustomized | Price 28 Oct |
|---|---|---|---|---|---|
| 17 Nov | +35% | 1 | **£273** (both listings) | £246 | £180 / £192 |
| 27 Nov | +50% | 1 | **£344** (both listings) | £305 | £233 / £220 |

- Both orphans are now sellable.
- They are priced **11% and 13% above uncustomized**. The plan assumed today's prices (£180 + £233 = £413); the list is now £617.
- Whether a 1-night stay sells at +35%/+50% is untested. The 27 Nov premium may fit the Finals Weekend eve.
- **Status:** min-stay part done. Corentin to confirm the premium.

**8. a-peak-check: Seasonality / Demand Factor unchanged; P13 25-26 Dec still min 3** (`get_customizations`, `raw/prices_*.json`, `raw/neighbourhood_P13.json`)
- **P20:** Seasonality None, Demand Factor None.
  - 21-26 Dec £353-£363 vs uncustomized £392-£404 (-10%). No override applies after 20 Dec, so the gap comes from the customizations.
  - 25-26 Dec min 4; 27 Dec min 7; 28 Dec **£592** min 6.
  - No NYE override was added (no log entry).
- **P11:** Seasonality None (saved "recommended", off); Demand Factor None (saved "moderately_aggressive", off). 23-25 Dec £318/£311/£313, +0.6% over uncustomized (+10% override).
- **P05:** Seasonality None; Demand Factor **Conservative**.
  - Open 13-21 Dec £582-£693, between -5.7% (21 Dec) and +7% vs uncustomized.
  - **The 29 Dec source is found:** a date-specific override of **+100%, min 1**, created 4 Sep and last updated 18 Oct 20:34Z (`get_listing_date_overrides` 3166592). 29 Dec is outside the raw window, so today's price there is NOT CHECKED.
- **P13:** Seasonality **Moderately Conservative (ON)**; Demand Factor **Conservative**.
  - 21-26 Dec £229-£236 on 3064856, 8-13% under uncustomized (£251-£270).
  - **25-26 Dec still min 3** (overrides: 23-26 Dec -3% min 3), so an arrival on 25 or 26 Dec cannot fit before the 27 Dec booking (3090701 Booked 27-28 Dec).
  - Market insight today: **+27.7% for 27-31 Dec**.
- **Check:** PriceLabs 3064856 > Date Specific Overrides > 25-26 Dec min stay. Customizations > Seasonality / Demand Factor on P13, P05.

**9. a-p12-2228nov: still not applied as fixed prices; 22-25 Nov now sold** (overrides 2699998; `reservations.csv`)
- 22-28 Nov now carries Reyhan's **-2%** (no fixed prices).
- 22-25 Nov are inside the new Booking.com 21-26 Nov booking (room £1,012.36; 0.741x the 28 Oct PriceLabs £1,366).
- Remaining open target nights: **26 Nov £246, 27 Nov £274, 28 Nov £312** (£832) vs target £233/£246/£236 (£715).
- **Status:** mostly overtaken by the booking. Corentin to decide on 26-28 Nov only.

**10. P06 8-14 Nov is open for sale** (`raw/prices_3288517.json`, `prices.csv` available=True; overrides 3288517)
- 7 nights at £331/£289/£298/£322/£335/£279/£283 = **£2,137**, min 2.
- PriceLabs and Smoobu agree. Yesterday status was blank with `user_price` -1.
- P06 is an intentional block in policy. **Question:** is 8-14 Nov meant to be sold? If yes, nothing to change. If not, the calendar has opened.

**11. a-raise-1012nov: not applied** (no P09 log entry; P13 got +2%, not +10%)
- P09 10-12 Nov is £159/£155/£156 (algorithm moves; was £148/£152/£158).
- P13 10-11 Nov is £162/£162 (3064856) and £197/£196 (3090701), with Reyhan's +2% on 31 Oct-12 Nov.

**12. P05 30 Oct still Blocked** (`raw/prices_3166592.json`)
- Policy explains only 27-28 Oct (delivery). 29-30 Oct were open at £367/£372 on 27 Oct.
- Ask whether this block is intentional (carried from 28 Oct item 10).

**13. Floor and ceiling** (raw, 60 days, open nights)
- P14: **46 of 60** open nights at the £500 minimum (77%). Special setup: numbers only.
- Every other listing: 0 nights at min, 0 at max.
- 180-day check: NOT POSSIBLE (raw ends 28 Dec).

**14. Base vs market** (`pl_base` from `listings.csv`; percentiles from 28 Oct `market.csv`; P13 from today's `neighbourhood_P13.json`, 2 BR n=118)

| Ref | Base | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|
| P01 | £253 | £267 | -5.2% | £337 | -24.9% |
| P04 | £220 | £178 | **+23.6%** | £225 | -2.2% |
| P05 (4 BR) | £550 | £594 | -7.4% | £760 | -27.6% |
| P09 | £176 | £143 | **+23.1%** | £173 | +1.7% |
| P11 | £286 | £302 | -5.3% | £352 | -18.8% |
| P12 | £284 | £210 | **+35.2%** | £251 | **+13.1%** |
| P13 | £250 | £230 | +8.7% | £283 | -11.7% |
| P20 | £350 | £261 | **+34.1%** | £321 | **+9.0%** |

- The P13 P50 moved £238 to £230 since yesterday.
- The percentile horizon is not stated in the source and cleaning inclusion is unknown, so treat the gaps as indicative.
- The 18 Oct base rises (P01, P05, P06, P09, P11, P12) are on hold. Bases are unchanged since 28 Oct. Next review is 2 Nov.

**15. Min stay vs policy** (`prices.csv`; overrides)
- Open nights below 2: only P13 17 Nov, 27 Nov and 1 Dec (min 1). 1 Dec is intentional in policy; 17 and 27 Nov are item 7. P04 2 Dec min 1 is policy-settled.
- **P04 below 3:** 18-19 Nov and 23-24 Nov (min 2), item 5.
- **P20 below 3 before 30 Nov:** 31 Oct-1 Nov (min 2). It is a 2-night gap between bookings, so min 3 would close it.
- P14 min 4 throughout (special setup).
- 5-night (2+ months ahead) and 7-night (4+ months ahead) rules: the window ends 28 Dec, before 29 Dec, so NOT CHECKED.
- **Short gaps sellable now:**
  - P11 31 Oct-2 Nov (£255/£206/£200, min 2);
  - P11 23-25 Dec (min 3/2/2);
  - P20 22-24 Nov (3 n, min 3);
  - P12 12-13 Nov (£216/£250);
  - P05 16-17 Nov (£420/£441) and 7-8 Dec (£508/£498);
  - P08 5-7 Nov;
  - P09 10-12 Nov.
- **Unsellable:** P13 25-26 Dec arrivals (item 8). P04 1-2 Nov once the 3-6 Nov booking syncs (policy min 3, no proposal).

**16. Listing hygiene** (`get_listings` 20 listings; `listing_data.json`; `data/id_map.json`)
- **`_unmatched`**: the three Vrbo listings at Marylebone coordinates (a7f5a076…, 4a980bb7…, 380ddc1a…) are **still absent** from PriceLabs.
- Also absent: the `pricelabs_other` copies of P01, P04 (Vrbo 20df1e73…), P08, P09, P10 and P13 (d0a5f202…, 125c15c5…).
- **Question:** were these removed on purpose? If so, `id_map.json` needs updating.
- **`confidence: check` entries:**
  - P03 is priced via **Channex**, not Smoobu (pushed 29 Oct 02:46:05Z; intentional block);
  - P15-P19 still have **no PriceLabs listing**.
  - Question: are P15-P19 meant to be priced?
- **Vrbo copies still pushing separately, with overrides copied from the parent** (logs):
  - P11 `_units_0001_7fd3…`, last push 29 Oct 06:18:54Z;
  - P12 `_units_0001_386e…`, 29 Oct 06:40:55Z;
  - P13 `_units_0001_3d48…`, 28 Oct 10:33:30Z.
- **P02 Vrbo copy:** push on, last push **2026-02-24** (stale; intentional block).
- **P13:** 3064856 and 3090701 share coordinates and push together (one flat, policy).
- **P20 is not in the info pack.** The recommended base reads "Unavailable" for P20 and P04.
- **Info pack vs PriceLabs** (`build/properties.py` vs `listings.csv`) is unchanged from 28 Oct:
  - minimums match except P14 (pack £400 vs £500, special setup);
  - bases differ where the 18/20 Oct rises happened (P01 230/253, P05 455/550, P06 340/357, P09 160/176, P11 260/286, P12 270/284, P13 235/250, P14 475/525). The pack is out of date.

**17. Sync check (Smoobu vs PriceLabs)** (`prices.csv`)
- **0 open nights differ by more than £2** on any Smoobu-priced listing.
- 3090701 has no `ref` and no Smoobu rate in `prices.csv` (32 open nights): NOT CHECKED.
- P03 is not priced via Smoobu.

### Open plan items: status today

| Item | Status |
|---|---|
| Reyhan's 27 Oct edits | Partly reversed by Reyhan on 28 Oct (item 5). P04 min 2 still present. P11 darts and P12 17 Nov conflict with standing decisions (items 2-3) |
| a-discount-cut | Not done. Gap £1,246 / £2,420 (item 4) |
| a-p12-2228nov | Not done as fixed prices. 22-25 Nov now sold; 26-28 Nov £832 vs £715 (item 9) |
| a-p13-orphans-nov | Min 1 done, with +35%/+50% premiums (item 7) |
| a-peak-check | Not done. P13 25-26 Dec min 3; settings unchanged. P05 29 Dec source = DSO +100% min 1 (item 8) |
| a-raise-1012nov | Not done (item 11) |
| t-pl-sync | P11/P13 fixed. New: P04 3-6 Nov, P12 21-26 Nov and P12 4-8 Dec cancellation unseen. 8 listings push only on edit (CRITICAL watch, item 1) |
| a-airbnb-rules, t-p04-airbnb-minstay, t-p05-calendar, t-p11-commission | Smoobu/OTA settings, not visible in PriceLabs: NOT CHECKED here. P05 30 Oct still Blocked (item 12) |

Data gaps:
1. Raw window is 30 Oct-28 Dec, so 29 Oct is not covered and windows shift by a day vs 28 Oct. The 180-day floor/ceiling check and the 5/7-night far-out rules are NOT CHECKED.
2. The meaning of `user_price` vs `price` in the raw files is UNKNOWN. They differ on 3-36 open nights per priced listing (e.g. P20 13 Nov £264 vs £235; P12 17 Nov £227 vs £386). Smoobu matches `price`. Confirm with PriceLabs which value is pushed on the next sync.
3. `kpi_pack.json` `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null. There is no 29 Oct `market.csv`; base vs market uses the 28 Oct file.
4. 3090701 Smoobu rates are missing from `prices.csv`: its sync is NOT CHECKED.
5. Customization edits are not logged in `get_user_logs`. "No change" rests on comparing live readings with 28 Oct.
6. Not read today: overrides on P08, P09, P14, P01, P10, 3090701 and the Vrbo copies (logs show copies made); customizations on P01, P02, P03, P07, P10; the PriceLabs orphan-day setting.
7. Booking times for the P04 3-6 Nov, P12 21-26 Nov and P20 25 Nov-5 Dec reservations are not in `reservations.csv`, so the PriceLabs price at booking time is UNKNOWN. The ratios use the 28 Oct raw prices.

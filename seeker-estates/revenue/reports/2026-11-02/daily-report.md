# Seeker Estates - Daily revenue report, 2026-11-02 (Monday, base review day)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-02/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-02/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `data/snapshots/2026-11-02/reservations.csv` (694 rows; used for the direct share; `total_gbp` is room only, cleaning excluded).
- `reports/2026-11-01/daily-report.md` and its JSON (base_review, actions), for what changed since yesterday.
- The dashboard action list at the start of this step.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Settled, not raised: Visibility Booster commission, 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov (deprioritised), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests, P04 min 3.
- Nights after the handbacks are not inventory: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
- **Where Reyhan's edits cross a standing decision, I report the conflict for you to confirm. I do not counter-propose.**

## Corrections I made to the specialists' figures

1. **P06 12-15 Nov was sold at 0.650x the PriceLabs price at booking, not 0.607x.**
   - Smoobu shows it was booked 1 Nov 19:40. No PriceLabs edit was logged on 1 Nov. The last P06 push was 1 Nov 09:13:55Z, so the price in force was **£832** (256/286/290), not the 31 Oct 22:10Z **£891** (channel.md §1).
   - The 0.607x figure (Dispatcher, occupancy.md, market.md 2a, comp-central) used £891. pricelabs.md H3 shows both because it did not have the booking time.
   - The £541.00 breaks down exactly as £832 × 0.765 (the hidden Airbnb layer) × **0.850 unexplained**. The unexplained part is £95.48 and the hidden layer is £195.52.
   - Against the market the figure does not depend on PriceLabs: 0.52x the daily P50 (market.md 2a) and -58% vs the comp median all-in (comp-central).
2. **P12 27-30 Nov is 0.793x, not 0.797x.** PriceLabs `booked_price` on the nights is £824 (268/299/257), not the £820 in the 1 Nov raw (channel.md §1; pricelabs.md H3).
3. **P05 29 Jan-1 Feb is 0.880x, not 0.869x.**
   - market.md 2a used today's neighbourhood `final_price` (£1,219). PriceLabs `booked_price` was **£1,204** (410/414/380).
   - £1,204 × 0.88 (the visible 12% early-booking discount) = £1,059.52, exact to the penny (channel.md §1; pricelabs.md H3).
   - Reyhan's -7% on 29-31 Jan is already inside the £1,204.
4. **P11: occupancy.md's "lower-leaning" does not follow the positioning rule.**
   - At 37.9% vs 46% we are at comp **P7** (room price, 30d). `recommend(0.379, 0.46, 0.07, 0)` returns **fix-listing**.
   - The rule only returns "lower" above P75. For 60d, `recommend(0.407, 0.39, 0.10, 0)` returns **+5%** (comp-central).
5. **market.md §5 "P12 3-4 Nov to the default (-£43)" is not adopted.**
   - comp-east puts 3-5 Nov at band **P33 (-14.7%)**, with P12 booked 62.1% vs 40%.
   - `recommend` returns raise +10% at P50, which comp-east offsets with quality to a **hold**. No reading returns "lower".
6. **The discount gap must be compared on the same dates.**
   - Today: **£2,281** on 3 Nov-2 Dec (next 14: £926). The same dates yesterday were **£3,040** (£1,295).
   - Yesterday's headline of £3,125 covered 2 Nov-1 Dec, a different window.
   - **The P20 part of the drop (£977 to £604) is Reyhan's base cut moving the discount into the base, not a discount removed.** P20's uncustomized price fell £243 while its final price rose only £130 (pricelabs.md H2).
7. **kpi_pack `sync_issues` for P12 (13 nights) is a timing artefact.**
   - The pack compares raw PriceLabs from 1 Nov 09:13Z with Smoobu as read after PriceLabs pushed at 07:22Z today. Live prices match Smoobu on every night.
   - **P04's 5 nights (9-13 Nov) are real:** Smoobu is £43 under PriceLabs (pricelabs.md C1).
8. **Running effect of the base rises uses occupancy.md's windows: bookings made 19 Oct-1 Nov (14 days) vs 4-18 Oct (15 days).**
   - The result is 1.07x / 0.54x / 0.57x per day. Yesterday's 0.89x / 0.47x / 0.47x covered 13 days.
   - market.md §6 uses 19 Oct-2 Nov (15 days). The totals are the same because nothing has been booked on 2 Nov.

## Executive summary

1. **Critical: Barking double-booking. The first guest arrives TOMORROW (Tue 3 Nov).**
   - The unsynced Airbnb listing 1455876748739910219 is still bookable:
     - **3-6 Nov at £518.20 card**, over the confirmed Booking.com stay (room £393.18) that arrives tomorrow;
     - **6-9 Nov at £514.20**, over the confirmed Airbnb stay (£355.72).
   - That is **£748.90** of room at risk, plus relocation cost (channel.md §2, 07:28:21Z / 07:28:28Z; comp-east confirms).
   - This is the third day it is not fixed.
2. **Base review (today): hold every base.**
   - All specialists agree. P11's lower-leaning signal is overruled by the comps (P7 → fix-listing).
   - **New conflict to confirm:** Reyhan cut P20's base **350 → 330** and its minimum **220 → 200** at 00:16Z today. Your 24 Oct decision is base 350. PriceLabs recommends 347, and the comps show P0-P44.
3. **Reyhan's 2 Nov 00:10-00:17Z edits mostly undo their own 31 Oct cuts.**
   - **Fixed:** P13 2-12 Nov is back to 0% (matches your 24 Oct decision); the P11 2 Nov orphan now has min 1.
   - **Resolved:** P20 6-24 Nov -5% now matches your -5%, although it runs to 24 Nov, not 19 Nov.
   - **Narrowed:** P11 darts 13-17 Dec is at 0% (£1,150), not your +5%.
   - **New:** the P20 base and minimum cuts.
   - **Unchanged:** P04 -10% vs your -8%; P12 17 Nov -7%; P13 base 250 still unrecorded.
4. **Three bookings on 1 Nov, the first since 29 Oct; no cancellations.**
   - **P06 12-15 Nov £541** at 0.650x PriceLabs (58% under comps). It falls inside the "intentional block" flat's open run.
   - **P12 27-30 Nov £653.39** at 0.793x, at market rate. The Booking.com stack is 31.15% off list.
   - **P05 29 Jan-1 Feb £1,059.52** at 0.880x, after the 12% early-booking discount, which is not in policy.
   - **The raised flats are net positive for the first time since the 18 Oct rise: +2 n / +£312.59** (was -7 n / -£1,941.32).
5. **PriceLabs push: the "pushes only after edits" theory is weaker.**
   - P04, P05, P06 and P12 pushed on 1 Nov 09:13Z with no logged edit. Seven other listings self-pushed overnight.
   - However, **P09 crossed 24 h at 07:55Z, and P05/P06/P04 cross it at 09:13-09:14Z.**
   - **P04 refreshed at 00:17Z without pushing**, so Smoobu is £43 under PriceLabs on 9-13 Nov.
   - **PriceLabs has not seen the P06 12-15 Nov booking.**
6. **Airbnb monitoring ends 4 Nov: bookings -48%, nights -70%, £ -65%** (20 Oct-2 Nov vs 6-19 Oct). Excluding 28+ night stays, nights and £ are both -51%. P12 has 0 Airbnb bookings while bookable; P13 bookings are -80%. The hidden 0.765 / 0.900 layers are still on every synced listing (day 4).

**Last 30 nights (3 Oct-1 Nov, 13 units):** occupancy **68.2%**, ADR **£171.48**, RevPAR **£116.96**, revenue £45,613.67. Yesterday: 69.2% / £172.25 / £119.25 / £46,506.64 (kpi_pack `portfolio_last30`; occupancy.md).
**Next 30 (3 Nov-1 Dec):** **61.1%** booked (179/293; yesterday 59.7%). **Next 60:** **50.0%** (244/488; 48.8%). Smoobu is the truth; figures are handback-aware (occupancy.md).
**7-day pickup** (27 Oct-2 Nov): 14 bookings / 60 n / £11,347.61, less 5 cancellations (26 n / £5,425.78): **net +34 n / +£5,921.83** (yesterday +32 n / +£5,433.92).

## Base review - decide today (a-base-review-1102)

These are the final recommendations for you to act on today. No base change by you shows in `get_user_logs` (1-2 Nov); the only base edit is Reyhan's on P20.

| Ref | Base / PL rec | Today's evidence | Specialists | **Recommendation** |
|---|---|---|---|---|
| **P01** | 253 / 255 | 0 sellable nights before the 20 Dec handback; 27/27 non-blocked nights booked next 30 vs market 34%. Same-stay comps £360-384 all-in (comp-east). 1 booking since the rise (18-21 Dec, £240.30/n). | occupancy hold; market "off the agenda"; comp-east keep | **Hold 253; off the agenda.** A base change earns nothing before handback. |
| **P05** | 550 / 548 | Next 30 **79.3% vs 40%**, next 60 67.8% vs 38%. Base is under 4 BR P50 £578 (market.md §1). Comps P30 (60d), 32-48% under the December medians, qp +0.15, `recommend(0.793, 0.40, 0.38, 0.15)` = +25% (comp-central). Since the rise: 2 bk / 6 n / £1,953.04, no cancellations. The Jan booking sold at 0.96x market P50. The fall from 82.8% is the window rolling, not a lost booking. | all hold 550 | **Hold 550. The lever is dates:** 7-8 Dec, 13-21 Dec, 9 Nov, 29 Dec (actions 5, 7, 9). |
| **P06** | 357 / 357 | **4 sellable nights** (8-11 Nov, £214/217/222/238, min 2). Booked 66.7% of non-blocked nights vs market 46%. P0 on every stay (-31% to -39%), quality -2%, `recommend(0.667, 0.46, 0.0, -0.024)` = +10% (comp-central). The 12-15 Nov sale at 0.650x PriceLabs / 0.52x market P50 is a channel gap, not a base problem (correction 1). | all hold 357 | **Hold 357.** 8-11 Nov is a date-level question inside an intentional-block flat (t-p06-open). |
| **P09** | 176 / 176 | 3 open nights (10-12 Nov) before the 26 Nov handback; 87.5% vs 36%. Airbnb 10-12 Nov P25 (-1.8%), 10-13 Nov P20 (-11.3%). `recommend` = +10%, but our 5.0 rests on 3 reviews (quality 0) (comp-east). | all hold 176 | **Hold 176.** It affects 3 nights only. |
| **P11** | 286 / 285 | Next 30 **37.9% vs 46%**; next 60 40.7% vs 39%. Comp **P7** at room price (P0-P60 at the Booking.com list ×1.15). `recommend` 30d = **fix-listing**, 60d = +5% (comp-central). Base = market P50 £289. Reyhan removed their -7%/-5% at 00:11:52Z, so open nights are now -7.9% vs uncustomized (was -17.6%; pricelabs.md H2). No booking since 28 Oct. | occupancy lower-leaning; market, comp-central, pricelabs hold | **Hold 286. The base is not the lever.** Fix Booking.com visibility (policy: search views -64%, click-through 0.81% vs 1.70%). |
| **P12** | 284 / 273 | Next 30 **62.1% vs 40%**. Pace30 **-11.9%** vs STLY (was -32.6%; -30.3% without the new booking). Band: November P33-P60, December P57-P77; `recommend` 30d raise +10% at P50, offset by quality -0.15 = hold; 60d hold (comp-east). The 27-30 Nov sale landed at market P50. Reyhan's -7% (16 Nov-13 Dec) unchanged. Since the rise: 5 bk / 23 n vs 4 cancellations / 22 n. | occupancy, comp-east, market: hold 284 while -7% stands | **Hold 284 while Reyhan's -7% stands; 273 only if you remove it.** Do not stack a base cut on the -7%. Fix the 26 Nov orphan instead (action 8). |
| **P13** | 250 / 237 (3090701: 236) | Next 30 **69.0% vs 41%**. 250 ≈ P61 of the 2 BR market (P50 £225, P75 £280). November stays now sit above each listing's quality line: 3090701 +2% to +5% vs supported -4%; 3064856 -7% to -9% vs -15% (comp-west). PriceLabs rec rose £4. | all keep 250 | **Keep 250 and record it in policy** (Reyhan set it 24 Oct 21:14:47Z). The levers are 12 Nov and Christmas (actions 6, 12). |
| **P20** (not a raised flat; changed today) | **330** (350 until 00:16Z) / 347 | Next 30 34.5% vs 37%. Comps: November P0-P40 (-14% to -42%), December P17-P44 (-20% to 0%). `recommend` = +5% (30d) / fix-listing (60d) (comp-east). December Airbnb prices fell about 11% with the cut (5-8 Dec £970 → £863). 31 Dec £588 → £465 (market.md). 8 Nov is now £215, under the old £220 floor (pricelabs.md M4). | all: conflict for you to confirm | **Conflict, not a proposal: your 24 Oct base is 350 (policy `price_24oct`).** Nothing in today's data supports a lower base: rec 347, the rule says +5% or fix-listing, and the gap is 0 reviews vs 18. Confirm 350 or record 330 (and the 200 floor). |

**Bottom line: hold every base.** P20 is yours to decide (350 or 330). The money is at date level and on the channel side.

## What changed since 1 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect
No base change on these six since 18 Oct. Reyhan's 2 Nov edits touch P11 only, and only date overrides (occupancy.md; pricelabs.md).

| Group | Made 19 Oct-1 Nov (bk / n / £) | Made 4-18 Oct | Per day, after ÷ before (bk / n / £) | Yesterday | Net since the rise (made − cancelled) |
|---|---|---|---|---|---|
| **Raised** | 13 / 46 / £9,600.22 | 13 / 91 / £18,199.03 | **1.07× / 0.54× / 0.57×** | 0.89× / 0.47× / 0.47× | **+2 n / +£312.59** (was -7 n / -£1,941.32) |
| Unraised (P02, P08, P10, P14, P20*) | 5 / 26 / £4,207.79 | 7 / 68 / £8,054.83 | 0.76× / 0.41× / 0.56× | 0.82× / 0.44× / 0.60× | +26 n / +£4,207.79 |
| P13 (base 235 → 250, unrecorded) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.36× / 0.71× / 0.86× | 0.38× / 0.77× / 0.93× | +16 n / +£2,909.76 |

\* P20's base was cut twice (380 → 350 on 24 Oct, 330 on 2 Nov), so it is not a clean control.

- **Per raised property** (made from 19 Oct; new today in bold):

| Ref | Since the rise | Before | Cancelled after the rise |
|---|---|---|---|
| P01 | 1 / 3 n / £720.90 | 1 / 30 n | – |
| P05 | **2 / 6 n / £1,953.04** (new: 29 Jan-1 Feb £353.17/n) | 2 / 11 n / £6,363.05 | – |
| P06 | **2 / 6 n / £1,345.77** (new: 12-15 Nov £180.33/n, 0.650x PL) | 4 / 18 n | – |
| P09 | 1 / 2 n / £253.21 | 3 / 23 n | – |
| P11 | 2 / 6 n / £1,221.45 | 1 / 4 n | 2 / 22 n / £4,687.23 (both booked before the rise) |
| P12 | **5 / 23 n / £4,105.85** (new: 27-30 Nov £217.80/n, 0.793x) | 2 / 5 n | 4 / 22 n / £4,600.40 (3 booked before the rise) |

- **Reading:**
  - Bookings per day are now level or higher in the raised group (1.07×) and down in the unraised group (0.76×).
  - Revenue per day fell by the same share in both groups (0.57× vs 0.56×).
  - The raised group's net turned positive with 3 bookings on 1 Nov.
  - Caveats: the sample is 1-5 bookings per property. Several changes overlap and cannot be separated: the 24 Oct markup cut and Last Minute 10%, the flexible-cancellation test (P05/P06/P20), and Reyhan's 30 Oct-2 Nov overrides.
  - The one P06 sale was made at 0.650x PriceLabs (channel-side), so it is no evidence about price elasticity.
- **Conclusion: still no evidence that the rises cost demand. Hold the bases.**

### Per property

| Ref | Change since 1 Nov |
|---|---|
| P01 | No change. 100% to the 20 Dec handback; self-pushed 06:02Z. Base 253: 1 booking since the rise; hold, off the agenda. |
| P02 / P03 / P07 | Intentional blocks. P02 self-pushed 00:24Z (its Vrbo copy last pushed 24 Feb 2026, t-p02-vrbo); P03 03:12Z via Channex; P07 04:44Z. |
| P04 | No booking. **1455 still double-sells 3-6 / 6-9 Nov (arrival tomorrow)** and sells every open Barking night (18-24 Nov, 6-19 Dec). **PriceLabs refreshed at 00:17:15Z but did not push:** Smoobu holds £820 vs PriceLabs £863 on 9-13 Nov (-£43). Reyhan's -10% on 9-24 Nov still conflicts with your -8%. 2 Nov is an unbookable 1-night gap (min 2) and lapses tonight. **New:** the synced Airbnb weekly discount on 6-19 Dec is **18%**, not 15% (£66.83 on that stay; channel.md §2). Fwd30 58.6% vs 24% (was 55.2%). |
| P05 | **New booking: 29 Jan-1 Feb 2027, £1,059.52 room, 0.880x** = PL £1,204 × visible 12% early-booking discount (not in policy). **9 Nov:** Smoobu £1,451 vs Airbnb £253.44 room after a 20% Special offer, unchanged (07:29:29Z). 29 Dec £1,342 (+100%) unchanged. 7-8 Dec £490 / £483. Fwd30 79.3% vs 40% (window roll). Base 550: 2 bookings since the rise, 0 cancellations; hold. Last push 1 Nov 09:13:53Z (crosses 24 h at 09:13Z). |
| P06 | **New booking: 12-15 Nov, £541.00 room = 0.650x PL £832** (0.765 hidden layer × 0.850 unexplained); 58% under the comp median, 0.52x market P50. **PriceLabs has not seen it** (still lists 12-14 Nov open at £256/286/290). Remaining open nights: 8-11 Nov, £214/217/222/238 (down about 6% with no log; Aggressive occupancy and booking recency per comp-central). Fwd30 ex-blocks 66.7% vs 46% (was 46.2%). Base 357: hold. |
| P08 | No booking. 5-7 Nov open (£190/209/213); Airbnb £305.23 room = 0.765. Self-pushed 06:15Z. Handback 13 Nov. |
| P09 | No booking. 10-12 Nov £120/144/146 (10 Nov was £145; PriceLabs last-minute -18% decay). Airbnb 10-12 Nov P25. **Last push 1 Nov 07:55:36Z, crossed 24 h at 07:55Z**; not re-read. Base 176: hold. |
| P10 | No change. Sold to the 18 Nov handback; self-pushed 06:15Z. |
| P11 | No booking (none since 28 Oct). **Reyhan removed the -7% / -5% on 10 Nov-18 Dec** (00:11:52Z); open-night prices rose 3-13%; open nights now -7.9% vs uncustomized (was -17.6%). **Darts 13-17 Dec £1,150**, avg £230 (was £1,043), at 0%, not your +5%. **2 Nov orphan fixed:** +10%, min 1, £176. Fwd30 37.9% vs 46%. Base 286: hold, fix-listing. |
| P12 | **New booking: 27-30 Nov Booking.com, £653.39 room, 0.793x PL £824**, Genius booker, stack 0.6885 (31.15% off list, £295.61). This is at the market P50 (1.03x) and £217.80/n vs a comp median of £232.33 all-in. **New 1-night orphan on 26 Nov** (min 2, unbookable). Pace30 -11.9% (was -32.6%). Self-pushed 07:22Z today (kpi_pack's 13 sync nights are an artefact). Airbnb: 0 bookings in 14 days. Base 284: hold while -7% stands. |
| P13 | No booking. **Reyhan: 2-12 Nov back to 0% (conflict fixed); 7-20 Dec -5% → -2%.** **Unlogged:** last-minute -5% → Custom 0% on both listings. 12 Nov £159 (was £147), min 2. 17 Nov 3064856 fell to £170 with the +35% override still set (cause unknown). **3 Nov becomes a 1-night orphan from tomorrow** if tonight does not sell. The twins are identical on 54 of 64 jointly open dates from 7 Dec. 25-26 Dec still min 3. Fwd30 69.0% vs 41%. Base 250: keep and record. |
| P14 | Numbers only: 75% of open nights at the £500 minimum; 0% vs 41% booked; P100 vs comps (+72% to +104%). |
| P15-P19 | Not connected (second account; t-unmapped). |
| P20 | No booking. **Reyhan: base 350 → 330, min 220 → 200 (00:16:02Z, new conflict); 6-24 Nov -10% → -5% (matches your -5%; runs to 24 Nov, not 19).** 6-9 Nov £216/219/215/227; 8 Nov is below the old floor. NYE run £2,735 (was £3,183), now under P90. **Airbnb sells 20-23 Nov at £831** (delivery block still missing). Fwd30 34.5% vs 37%. Flexible test day 9 of 14: test group 6 bookings, 0 cancelled. |

### Reyhan's 2 Nov edits vs your decisions (status of the conflict list)

| # | Ref / dates | Your decision (policy) | Now (live) | Status |
|---|---|---|---|---|
| a | P04 9-24 Nov | -8% on 1-25 Nov, min 3 | -10%, min 3 (not edited) | **Open** |
| b | P04 1-2 Nov | never fewer than 3 nights | 2 Nov min 2, unbookable; lapses tonight | **Lapsed** |
| c | P20 6-24 Nov | -5% on 31 Oct-19 Nov | **-5%**, min 3 (00:16:48Z) | **Resolved** (runs to 24 Nov) |
| c2 | **P20 base / min** | base 350 (`price_24oct`) | **330 / min 200** (00:16:02Z) | **New conflict** |
| e | P13 1-3 / 8-12 Nov | 0% | 0%, min 2 on 2-12 Nov (00:12:22Z) | **Fixed** |
| f | P12 17 Nov | keep +50% (deprioritised) | -7%, min 2 = £233 (uncust £276) | **Open** |
| g | P11 darts 13-17 Dec | "above £300"; leave the +5% | 0%: £1,150, avg £230 | **Narrowed** (was -5%, £1,043) |
| h | P13 base 250 | not in policy | 250 | **Record it** |
| – | Not policy conflicts | – | P11 non-darts cuts removed (consistent with comps); P13 Dec -5% → -2%; P05 Dec/Jan and P06 -2% unchanged; P04 6-22 Dec -10% unchanged | Evidence only |

Value of restoring your settings on a, c2, f and g: **about £264 a month** (formula in action 7).

### Open plan items: status today

| Item | Status 2 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed (day 3); arrival tomorrow.** channel.md §2 07:28Z; comp-east |
| t-push-check | **Changed.** Pushes without logged edits seen on 1 Nov 09:13Z (P04/P05/P06/P12) and overnight on 7 listings, so the edit-only theory is weaker. But P09 is past 24 h, P04/P05/P06 cross at 09:13Z, P04 refreshed without pushing (-£43), and P06's booking is not seen (pricelabs.md C1, H3) |
| a-airbnb-rules | **Not fixed (day 4).** Boundary exact: lead 28 = 0.765, lead 29 = 0.900 |
| a-discount-cut | **Partly moving:** £2,281 / £926 (same dates £3,040 / £1,295); the P20 part is the base cut |
| a-p13-record | Updated above (c and e resolved; c2 new; g narrowed) |
| **t-p11-2nov** | **Done:** 2 Nov DSO +10%, min 1 (00:11:22Z), Smoobu £176, min 1 (pricelabs.md M1; occupancy.md) |
| a-p05-9nov | **Not fixed.** Airbnb £253.44 room vs Smoobu £1,451 |
| a-peak-check | **Unchanged** (P13 25-26 Dec min 3; P05 29 Dec £1,342) |
| a-raise-1012nov | **Partly:** 12 Nov £159 because the -5% is gone; no raise; min 2 still on |
| a-p05-dec | **Not done:** 7-8 Dec £490 / £483 |
| t-p06-open | **12-15 Nov sold at 0.650x**; 8-11 Nov still open |
| t-p20-delivery | **Not fixed.** Airbnb 20-23 Nov £831 |
| a-p13-orphan-price | 17 Nov fixed in effect (3064856 £170), not in settings; 27 Nov 3064856 £336 unchanged |
| **a-p12-2228nov** | **Done:** 22-30 Nov now booked except the 26 Nov orphan (moved to a new item) |
| a-p05-earlybird | Now realised: £144.48 on the 29 Jan booking |
| a-p13-twin | Wider: identical on 54 of 64 open dates (39 of 49 yesterday) |
| a-base-review-1102 | **Decide today** (table above) |
| Others (a-amenities, a-bcom-cancel, a-bcom-lm, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p11-commission, t-p13-commission, t-unmapped) | Unchanged; no new evidence. No cancellation since 31 Oct 14:36 |

## Actions - 2026-11-02

**Ranking:** critical channel-safety rows first, then expected £ over the next 30-60 days, then unquantified rows.
**Expected effect** = price move in £ on open nights × the flat's booked share (kpi_pack `forward_occ_30`, or `forward_occ_60` for December), unless the row says otherwise. These are upper bounds; elasticity is not measured.
**Bounds** (kpi_pack `settings`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 now £200-1,800. Every price below is inside them.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, arrival TOMORROW).** **Today:** on 1455876748739910219, block the nights of **2-8 Nov**. Also block **9-13 Nov, 18-24 Nov and 6-19 Dec** (open in Smoobu), or snooze the listing. Then map 1455 to Smoobu 3562176 (it keeps 4.69 (26) reviews) or unlist it. | Airbnb host 551951609 > listing 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel.md §2 (07:28:21Z / 07:28:28Z): 3-6 Nov £518.20 and 6-9 Nov £514.20 bookable on 1455, against Smoobu Booking.com 3-6 Nov (£393.18) and Airbnb 6-9 Nov via 1657… (£355.72). 18-24 Nov sells at £944.84 on 1455 vs £1,066.21 on 1657; 6-19 Dec at £2,275.22 vs £1,968.54. | Protects **£748.90** (393.18 + 355.72). Relocation cost not quantified | Corentin | 2026-11-02 |
| 2 | P09 P04 P05 P06 | **t-push-check (critical).** (1) After 09:15Z, re-read `last_date_pushed` on 3318172, 3562176, 3166592 and 3288517. If any still shows 1 Nov, it is a push failure: raise it with PriceLabs support. (2) On P04, find out why the 00:17:15Z refresh did not push, and force a sync so Smoobu gets £863 on 9-13 Nov. (3) Confirm that P06 registers the 12-15 Nov booking. | PriceLabs > listing > Sync status / push history (3318172, 3562176, 3166592, 3288517); PriceLabs > Integrations (Smoobu) | pricelabs.md C1: P09 last push 1 Nov 07:55:36Z (past 24 h at 07:55Z); P05/P06/P04 1 Nov 09:13-09:14Z. P04 refreshed 2 Nov 00:17:15Z, not pushed: Smoobu £159-170 vs PL £167-179 (-£43 over 5 nights). Pushes without logged edits: P04/P05/P06/P12 on 1 Nov 09:13Z; overnight P01, P02, P03, P07, P08, P10, P14, P12 (07:22Z). H3: P06 12-14 Nov still open in PriceLabs. | P04: £43 × 0.586 = **£25**. P06 occupancy and recency layers price 8-11 Nov as if 12-14 Nov were unsold: not quantified | Corentin | 2026-11-02 |
| 3 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 4).** On every apartment, remove "last-minute -15% within 28 days" and the ~-10% rule out to about 60 days. Check for a global rule. Use a visible Airbnb discount for any discount you want (policy `airbnb_visible_discounts`). **Also check the P06 reservation of 12-15 Nov for a host-sent special offer** (×0.850 unexplained). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb host inbox (P06 reservation, Smoobu id 162228256) | channel.md §3: 25 live searches 07:28-07:31Z. Every synced card is 0.765 at ≤28 days and 0.900 at 29-46 days; lead 28 = 0.765 and lead 29 = 0.900 exactly. channel.md §1: P06 £832 × 0.765 × 0.850 = £541.00. comp-west sees the same pattern on P13. | **£633.56** realised so far on 3 bookings: P05 £328.76 + P04 £109.28 + **P06 £195.52**; P20 £545 not reconciled. Forward: 23.5% of every ≤28-day Airbnb night; total not quantified | Corentin | 2026-11-03 |
| 4 | P04 P05 P09 P11 P12 P20 P06 | **a-discount-cut (critical).** Set **Custom 0%** explicitly (not toggled off) on Last-minute, Occupancy and Booking Recency. Still active: P04 last-minute -5%, P05 -1%, **P09 -18%**; Aggressive occupancy everywhere except P12 (Custom) and P09; Booking Recency default everywhere. Confirm whether the unlogged P06 change (31 Oct-1 Nov) and P13 change (to 0%) were intended. | PriceLabs > listing > Customizations | pricelabs.md H2: next 30 (3 Nov-2 Dec) **£2,281** vs £3,040 same dates; next 14 £926 vs £1,295. P04 -20.6% (£568), P20 -11.3% (£604; partly the base cut), P11 -7.9% (£351), P05 -12.0% (£400), P12 -14.9% (£449, wider: the algorithm moved), P09 -5.1% (£22); P13 +£108 and P08 +£5 offset. | **Upper bound about £1,211 per 30 days:** 568×0.586 = £333; 604×0.345 = £208; 351×0.379 = £133; 400×0.793 = £317; 449×0.621 = £279; 22×0.875 = £19; less P13 108×0.69 = £75 and P08 5×0.727 = £4. Includes overrides; the customization-only share is not separated | Corentin | 2026-11-03 |
| 5 | P05 | **a-p05-9nov (high).** (1) On Airbnb, clear the 9 Nov custom price / Special offer so the Smoobu rate flows; check the Smoobu Airbnb sync log for 9 Nov. (2) Decide 9 Nov: to sell it, replace +300% with **0%, min 1** (about £425 uncustomized; market P50-P75 £371-519). For a soft block, close it in Smoobu. | Airbnb > listing 1618929775762183214 > Calendar 9 Nov; Smoobu > Channel Manager > Airbnb sync log; PriceLabs 3166592 > DSO 9 Nov | channel.md §3 (07:29:29Z): room £316.80 less a 20% "Special offer" (-£63.36) = **£253.44**, identical to 31 Oct and 1 Nov; Smoobu £1,451, min 1. pricelabs.md H4: +300% since 30 Oct 22:09:42Z; uncustomized £425; neighbours booked at £456 / £454. market.md §5. | Upper bound **£337** = £425 × 0.793. Protects up to £171.56 per sale against the Airbnb room now (425 − 253.44) | Corentin | 2026-11-02 |
| 6 | P13 P05 | **a-peak-check.** **P13:** **min 2 on 25-26 Dec**; **+10% on 21-26 Dec** on 3064856 and **+12%** on 3090701, replacing the -3%, so the twins differ. **P05 29 Dec:** replace +100% with **0%**, min 1 (about £1,081 uncustomized, at market P90). P20 NYE: hold (now under P90). | PriceLabs 3064856 / 3090701 > DSO 21-26 Dec; 3166592 > DSO 29 Dec | pricelabs.md M2: 25-26 Dec min 3 with 27 Dec booked, so arrivals cannot fit; 24-26 Dec £228/229/232. comp-west: 23-26 Dec P17 of the wider sample, `recommend` +10% (60d lead +14.8 pts); 3090701 about 11% under its quality level. market.md 2b: 24-26 Dec £689 vs P50 £843, market +8.5 to +12.3 pts vs STLY. P05: pricelabs.md H4 (£1,342 vs neighbours £784 / £820). | P13 24-26 Dec: £69 × 0.508 = £35, plus 25-26 Dec unlocked (£229 + £232) × 0.508 = £234; **about £269**. 21-23 Dec and P05 29 Dec not quantified | Corentin | 2026-11-03 |
| 7 | P04 P20 P12 P11 P13 | **a-p13-record: confirm the remaining conflicts** (table above). These are not new proposals: confirm or restore. (c2) P20 base 330 / min 200 vs your 350 / 220. (a) P04 9-24 Nov -10% vs -8%. (f) P12 17 Nov -7% vs +50%. (g) P11 darts 0% vs +5%. (h) record P13 base 250. | PriceLabs 3547481 > Base / Min; 3562176 > DSO 9-24 Nov; 2699998 > DSO 17 Nov; 3064196 (+ Vrbo) > DSO 13-17 Dec; then `policy.json` | pricelabs.md H1; market.md edits table and §4; comp-east (P20 Nov P0-P40, Dec P17-P44; rec 347); comp-central (darts £1,150, avg £230) | **About £264** if your settings are restored: (c2) £4,737 × (350/330 − 1) = £287 × 0.345 = £99; (f) (£276 × 1.5 − £233) = £181 × 0.621 = £112; (a) £2,190 × (0.92/0.90 − 1) = £49 × 0.586 = £29; (g) +5% ≈ £58 × 0.407 = £24 | Corentin | 2026-11-02 |
| 8 | P12 | **New, a-p12-26nov.** DSO on **26 Nov: min 1**, keep the price (Smoobu £262). | PriceLabs 2699998 > DSO 26 Nov (min stay) | kpi_pack `gaps` P12 26 Nov (1 night, min 2); pricelabs.md M1: `unbookable=1`, £262; comp-east: 1-night comps £284-318 all-in; created by the 1 Nov booking. P04's min-3 rule does not apply; 26 Nov is not a deprioritised date. | Upper bound £262 × 0.621 = **£163** | Corentin | 2026-11-03 |
| 9 | P05 | **a-p05-dec.** DSO on **7-8 Dec** to about **£597 / £593** (market P75). | PriceLabs 3166592 > DSO 7-8 Dec | market.md §5: £490 / £483 vs P75 £597 / £593, market +11.0 / +5.5 pts vs STLY. comp-central: P25-P33 on December stays; `recommend` +25%, **capped at P75 (+22%)** because 3 of 6 comps are rated under 4.3, which inflates the quality premium. | (£1,190 − £973) × 0.678 = **£147** | Corentin | 2026-11-03 |
| 10 | P13 | **New, t-p13-3nov.** If tonight (2 Nov) does not sell, set **3 Nov min 1** on 3064856 and 3090701 tomorrow morning; keep the price (3064856 £124). | PriceLabs 3064856 / 3090701 > DSO 3 Nov | occupancy.md orphans: 2-3 Nov is a 2-night run before the 4 Nov arrival; 3 Nov becomes a 1-night orphan below min 2. comp-west gap 6. No standing decision on P13 min stay. | Upper bound £124 × 0.69 = **£86**, only if tonight does not sell | Corentin | 2026-11-03 |
| 11 | P04 | **New, t-p04-weekly.** Set the synced Barking Airbnb weekly discount to **15%** (policy) from 18%. | Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly (or the Smoobu Airbnb rule for 3562176, whichever holds it) | channel.md §2: 6-19 Dec card £2,369.50 − "Weekly stay discount" £400.96 = 18% of room vs policy `length_of_stay_discounts` 15% | **£66.83** per 6-19 Dec stay | Corentin | 2026-11-04 |
| 12 | P06 | **t-p06-open (question).** Confirm whether 8-14 Nov was meant to be open: it has now sold 12-15 Nov. If the remaining 8-11 Nov should sell, the rule says **+10%** (about £980 for 4 nights vs £891). | Smoobu > Calendar P06; PriceLabs 3288517 > DSO 8-11 Nov and Customizations | comp-central: P0 (-31% to -39%), `recommend(0.667, 0.46, 0.0, -0.024)` = +10%; 12-15 Nov sold 58% under the median. Policy lists P06 as an intentional block, so this is a question first. | £891 × 10% × 0.667 = **£59** | Corentin | 2026-11-03 |
| 13 | P13 | **a-raise-1012nov.** **12 Nov on 3064856: £176** (market P25; `recommend` +10% on £159 = £175) and **min 1**. Keep 3090701 at £193 so the twins differ. | PriceLabs 3064856 > DSO 12 Nov | market.md 2b: England v Croatia (sold out); £159 vs fortnight £172, P25 £176, P50 £214; min 2 with 13 Nov booked. comp-west: 3064856 11-13 Nov P25 (-7.3%), `recommend` +10%. Not a policy conflict (8-12 Nov at your 0%; policy is silent on event uplifts). | (£176 − £159) × 0.69 = **£12**. The min-1 unlock is not quantified | Corentin | 2026-11-03 |
| 14 | P11 | **t-channel-gaps.** On untouched event nights: **26 Nov at least £231** (Nia Archives) and **3 Jan at least £201** (darts final). Fix Booking.com visibility. | PriceLabs 3064196 (+ Vrbo) > DSO 26 Nov, 3 Jan; Booking.com extranet > Camden > Opportunities / photos | market.md §4: 26 Nov £219 vs fortnight £231; 3 Jan £185 vs £201. comp-central: P7, fix-listing. Policy ranking: click-through 0.81% vs 1.70%. | £12 × 0.379 + £16 × 0.407 = **£11**. Visibility not quantified | Corentin | 2026-11-04 |
| 15 | P01 P05 P06 P09 P11 P12 P13 P20 | **a-base-review-1102: decide today.** Hold P01 253 (off the agenda), P05 550, P06 357, P09 176, P11 286; P12 284 while the -7% stands (273 only if it goes); P13 keep 250 and record it; P20: confirm 350 or record 330. | PriceLabs > each listing > Base price (review only) | Base table above | £0 (holds); P20 is in row 7 | Corentin | 2026-11-02 |
| 16 | P20 | **t-p20-delivery (question).** Was the 20-22 Nov delivery block removed on purpose? If it is still needed, re-block now: Airbnb sells 20-23 Nov at £831. | Smoobu > Calendar P20 20-22 Nov | comp-east: £763 → £831 overnight; pricelabs.md M3: £301 / £299 / £290, min 3, -5%. Policy `block_20_21_nov`. | Not quantified | Corentin | 2026-11-02 |
| 17 | P05 | **a-p05-earlybird.** Confirm the visible 12% early-booking discount is yours; it is now realised. | Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules > Early bird | channel.md §1: 29 Jan-1 Feb £1,204 × 0.88 = £1,059.52 exactly (£144.48); 4-7 Jan card -£150.24 (12.0%). Policy records an early bird for P13 only. | £144.48 on this booking; forward not quantified | Corentin | 2026-11-04 |
| 18 | P13 | **a-p13-orphan-price.** 17 Nov is fixed in effect (3064856 £170, 3090701 £207, at the quality lines ~£177 / ~£199), but the +35% is still set. 27 Nov 3064856 £336 (+39% vs P50 £241). Confirm; the rule (lead +28 pts, n=1 comp at P100) gives +5%, so no trim is proposed. | PriceLabs 3064856 > DSO 17 / 27 Nov | comp-west Focus 17 / 27 Nov | Not quantified | Corentin | 2026-11-04 |

## Top 5 for today
1. **Barking (arrival TOMORROW):** block **2-8 Nov** on unsynced Airbnb 1455876748739910219 now: £748.90 of confirmed stays can be double-sold. Also block 9-13 Nov, 18-24 Nov and 6-19 Dec, then map it to Smoobu 3562176 or unlist it.
2. **Base review, decide today:**
   - Hold every base: P05 550, P06 357, P09 176, P11 286, P12 284 (while the -7% stands), P13 250 (record it). P01 is off the agenda.
   - **P20: confirm your 350 or record Reyhan's 330 / £200 floor.** No data supports the cut: rec 347, comps P0-P44.
3. **PriceLabs push:** after 09:15Z, re-read the last push on P09, P04, P05 and P06.
   - P04 refreshed without pushing, so Smoobu is £43 under PriceLabs on 9-13 Nov.
   - PriceLabs has not seen the P06 12-15 Nov booking.
4. **Airbnb:**
   - remove the hidden 0.765 / 0.900 rules (£633.56 lost on 3 bookings);
   - check the P06 12-15 Nov reservation for a special offer (×0.850, £95.48);
   - clear P05 9 Nov (£253.44 room vs Smoobu £1,451).
   - Monitoring ends 4 Nov with bookings -48%.
5. **Reyhan's edits and gap-fill:**
   - confirm P04 -10% vs your -8%, P11 darts 0% vs +5% (£1,150), and P12 17 Nov;
   - set **P12 26 Nov min 1**, and **P13 3 Nov min 1** if tonight does not sell.

## Growth plays

- **Airbnb net rate and volume (monitoring ends 4 Nov).**
  - **Trend** (channel.md §4a; `reservations.csv`, confirmed, room only):

    | Measure | Last 14 days (20 Oct-2 Nov) | Prior 14 (6-19 Oct) | Change |
    |---|---|---|---|
    | All Airbnb bookings | 12 bk / 50 n / £9,881.53 | 23 bk / 164 n / £28,179.02 | **-48% / -70% / -65%** |
    | Excluding 28+ night stays | 50 n / £9,881.53 | 102 n / £20,224.27 | nights and £ both **-51%** |
    | Unconstrained flats (P04, P05, P08, P12, P13, P20) | 9 bk / 42 n | 12 bk / 57 n | -25% / -26%, £ -39% |

    - P12: 0 bookings (was 2).
    - P13: 1 booking (was 5), -80%.
    - P05: £ -69%.
    - P20 and P08 did not fall.
  - Paid ÷ PriceLabs: 10 of 11 Airbnb bookings made after 21 Oct are below PriceLabs minus the policy stay discounts. The only one explained is P13 27 Dec-3 Jan (0.903).
  - **Reading for 4 Nov:** removing the 21 Oct manual promotions did not bring Airbnb up to PriceLabs. The hidden Smoobu rules still cut 23.5% (≤28 days) and 10% (29-46 days), and volume fell anyway. The volume drop cannot be separated from the 24 Oct changes or the weekend gap.
  - KPI: Airbnb room ÷ Smoobu rate. Target 1.00× before stay discounts and visible promotions, by 2026-11-04 (action 3).
- **Booking.com volume vs net.**
  - Since the 24 Oct markup cut: 12 gross / 52 n / £8,774.74 at 0.780×; 10 still confirmed at 0.766×; net of all cancellations **+20 n / +£2,250.56**. Pace 1.4 a day gross vs ~0.33 before (channel.md §4b).
  - As sold, Booking.com nets about £61-67 per £100 of PriceLabs price, below the Airbnb model's £84.50 (channel.md §5).
  - The P12 Genius stack (0.6885) supports unticking Genius Level 2&3 on Mile End (a-p12-genius).
  - Target: median paid at least 0.80× PriceLabs by 2026-11-15.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 vs 4.86; P13 4.67 / 4.31 vs 4.78; P08 4.33 vs 4.87; P06 4.60 vs 4.66; P04 synced 4.11 (9) vs 4.83 (unsynced 4.69 (26)); P05 4.77 vs 4.27; P09 5.0 (3); P20 none (comp-east, comp-central, comp-west). Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The gap caps P12, P04 synced, P08 and the P13 4.31 twin at -15% (`quality_premium`).
  - Fixes: the P12 arrival message on key collection (the process is fixed by policy); cleanliness and photo accuracy on the P13 4.31 twin; review requests on P20 and P09. Mapping 1455 keeps Barking's 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.**
  - The rule returns fix-listing for P11 (P7 at 37.9% vs 46%) and P20 in December (P30 at 10% vs 30%).
  - P20 has 0 reviews vs 18 for comps.
  - Free amenity fixes (a-amenities): add the lift on P13 (both listings), P04, P09 and P12.
- **Gap fill / length of stay.**
  - New orphans: P12 26 Nov (action 8), P13 3 Nov (action 10). P11 2 Nov is fixed. P04 2 Nov lapses tonight (your min 3).
  - Still open: P05 9 Nov and 29 Dec, P13 25-26 Dec (min 3), P13 12 Nov (min 2).
  - Mid-term (91+ nights) pipeline: 0 in `reservations.csv`.
- **Direct share.**
  - **1.48%** of room revenue on arrivals 2 Nov 2025-1 Nov 2026: Website £4,468 + Direct booking £1,476 = £5,944 of £402,450.89 (`reservations.csv` 2 Nov, confirmed). Airbnb's share is 62.0% (£249,703.50).
  - Direct (£90 per £100, modelled) is not the cheapest guest price (channel.md §5).
- **Event compression** (market.md §4).
  - Like for like: **11 n / £126** (1 Nov 13 n / £116).
  - Full total: 24 n / £550, including the P11 darts £300 (conflict g).
  - P13 12 Nov is now £13 (was £30): action 13.
  - P20's Noah Kahan nights (£148) rest on the fortnight rule only; market P50 is flat. Not proposed.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **68.2%** (kpi_pack; 69.2% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£171.48** (£172.25) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£116.96** (£119.25) | £129 | 2026-12-18 |
| Booked next 30 (Smoobu, handback-aware) | **61.1%** (179/293; 59.7%) | each unit at least market + 10 pts (below today: P11 37.9% vs 46%, P20 34.5% vs 37%) | 2026-11-08 |
| Booked next 60 | **50.0%** (244/488; 48.8%) | at least market + 10 pts | 2026-11-15 |
| 7-day pickup, net | **14 bk / 60 n / £11,347.61; net +34 n / +£5,921.83** | at least 10 bookings a week, net positive | 2026-11-08 |
| 18 Oct raised flats, net since the rise | **+2 n / +£312.59** (−7 n / −£1,941.32 yesterday) | positive and rising | 2026-11-09 |
| Booking.com paid ÷ PriceLabs (since cut) | **0.766×** (10 confirmed); latest 0.793× | median at least 0.80× | 2026-11-15 |
| Airbnb room ÷ Smoobu rate | **0.765× ≤28 d; 0.900× 29-46 d; 1.000× 62+ d** | 1.00× before stay discounts | 2026-11-04 |
| Airbnb bookings, 14 d vs prior 14 | **−48%** (nights −70%, £ −65%) | back to the prior level | 2026-11-18 |
| PriceLabs-side gap, next 30 (3 Nov-2 Dec) | **£2,281** (£3,040 same dates); next 14 £926 | £0 apart from your own overrides | 2026-11-03 |
| PriceLabs push freshness | P09 past 24 h (07:55Z); P04/P05/P06 cross at 09:13Z; P04 refreshed without pushing (−£43) | every listing pushed within 24 h | 2026-11-02 |
| Double-sellable Barking stays | **2 stays / £748.90, arrival 3 Nov** | 0 | 2026-11-02 |
| Missed compression | **11 n / £126** like for like; full 24 n / £550 | under 10 nights | 2026-11-07 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data 2026-11-04; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.27-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.48%** (12 months to 1 Nov) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Push status after 09:15Z** on P04, P05, P06 and P09, and why P04's 00:17Z refresh did not push. What triggered the 1 Nov 09:13Z and 2 Nov 07:22Z pushes is also unknown. Source: PriceLabs > listing > Sync status / push history; Integrations (Smoobu). NOT CHECKED (the run ended about 07:31Z).
2. **P06 12-15 Nov ×0.850 residual (£95.48):** NOT CHECKED. Source: the Airbnb host inbox / reservation price breakdown for Smoobu 162228256.
3. **Smoobu Airbnb rule settings:** still not read on any apartment; the layers are inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules. Where the P04 synced weekly 18% is set is also NOT CHECKED.
4. **P05 9 Nov on Airbnb:** why Airbnb builds on £316.80 with a 20% Special offer. Source: Airbnb > 1618929775762183214 > Calendar / Promotions; Smoobu sync log.
5. **Customization edits are not logged.** Who changed P13's last-minute to 0% (and P06's layers 31 Oct-1 Nov), and when: NOT CHECKED. Source: PriceLabs Customizations history or the team.
6. **Booking.com:** displayed prices, comps, rate plans and which two promotions joined Genius on P12 27-30 Nov are NOT CHECKED (AWS WAF challenge 07:32:50Z; not circumvented). Cancellation reasons and fees are not in Smoobu. Source: extranet screenshots.
7. **RGI** needs comp occupancy. Source: PriceLabs Competitor Listings / Market Dashboard (not enabled).
8. **Windows:** the PriceLabs raw window is 3 Nov-1 Jan, so tonight comes from live calls only. The 180-day floor/ceiling check and the 5- and 7-night rules are NOT CHECKED. Overrides on P01, P08, P09, P10 and P14 were not read live today.
9. **Price field:** which of `price` / `user_price` Smoobu receives is NOT CHECKED. P13 3064856 17 Nov shows `price` £170 vs `user_price` £258 (comp-west).
10. **P20 delivery block:** who removed it and whether the delivery moved. Source: you / Smoobu audit.
11. **Barking 1455:** its own reservations and cleaning fee are NOT CHECKED (not in Smoobu). Source: Airbnb host 551951609 > Reservations.
12. **STLY** is missing for every unit except P12. **P15-P19** need the second-account keys (t-unmapped). Vrbo +8% / Direct -10% are unconfirmed defaults. P20 28 Oct realised loss (£545 vs £574) is still not reconciled.
13. **Events:** WebSearch summaries only (wembleystadium.com and theo2.co.uk do not resolve). Conflicts: Muse 13-17 vs 15-16 Nov; Phoebe Bridgers; Horse Show end 21 vs 22 Dec; darts end 3 vs 4 Jan (market.md gap 2).

```json
{"scoreboard":{"note":"2 Nov 2026 (base review day). Last 30 nights = 3 Oct-1 Nov, 13 Smoobu units (kpi_pack portfolio_last30). Forward figures handback-aware, Smoobu confirmed stays as truth (occupancy.md; prices.csv starts 3 Nov). Pickup = bookings made 27 Oct-2 Nov, imports excluded. Booking.com since the 24 Oct markup cut (channel.md §4b). Airbnb ratios from 25 live searches 2 Nov 07:28-07:31Z (channel.md §3). PriceLabs gap from pricelabs.md H2 on 3 Nov-2 Dec (same dates yesterday £3,040); includes Reyhan's overrides; P20 part is the base cut. Direct share from reservations.csv arrivals 2 Nov 2025-1 Nov 2026. RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"68.2% (69.2% yesterday)"},{"label":"ADR last 30","value":"£171.48 (£172.25)"},{"label":"RevPAR last 30","value":"£116.96 (£119.25)"},{"label":"Revenue last 30","value":"£45,614 (£46,507)"},{"label":"Booked next 30","value":"61.1% (179/293; 59.7% yesterday)"},{"label":"Booked next 60","value":"50.0% (244/488; 48.8% yesterday)"},{"label":"7-day pickup","value":"14 bk / 60 n / £11,348; less 5 cancellations 26 n / £5,426 = net +34 n / +£5,922"},{"label":"Raised flats net since 18 Oct","value":"+2 n / +£312.59 (was -7 n / -£1,941.32)"},{"label":"Booking.com since markup cut","value":"10 confirmed, 45 n, £7,302; 0.766x PriceLabs; net +20 n / +£2,251"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at <=28 days; 0.900x at 29-46 days; 1.000x at 62+ days"},{"label":"Airbnb bookings 14 d vs prior 14","value":"-48% (nights -70%, £ -65%); P12 0, P13 -80%"},{"label":"PriceLabs-side gap next 30","value":"£2,281 (£3,040 same dates); next 14 £926"},{"label":"PriceLabs push freshness","value":"P09 past 24 h 07:55Z; P04/P05/P06 cross 09:13Z; P04 refreshed not pushed (-£43 9-13 Nov)"},{"label":"Double-sellable Barking stays","value":"2 stays / £748.90; first arrival TOMORROW 3 Nov"},{"label":"Missed compression","value":"11 n / £126 like for like; full 24 n / £550"},{"label":"Direct share","value":"1.48% (12 months to 1 Nov)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","type":"task","priority":"critical","ref":"P04","status":"open","title":"Not fixed (day 3): unsynced Barking Airbnb 1455876748739910219 still sells 3-6 and 6-9 Nov over two confirmed stays (£748.90); first arrival TOMORROW Tue 3 Nov; also sells 18-24 Nov and 6-19 Dec alongside the synced listing","why":"channel.md §2 live 2 Nov 07:28:21Z / 07:28:28Z: 1455 bookable 3-6 Nov £518.20 card and 6-9 Nov £514.20; Smoobu has Booking.com 3-6 Nov room £393.18 (confirmed, arrival 3 Nov) and Airbnb 6-9 Nov £355.72 via synced 1657859794156786222. Open Smoobu runs sell on both listings: 18-24 Nov 1455 £944.84 vs 1657 £1,066.21; 6-19 Dec £2,275.22 vs £1,968.54. comp-east confirms (critical).","where":"Airbnb host 551951609 'Seeker Estates LTD' > listing 1455876748739910219 > Calendar: block nights 2-8 Nov today; also block 9-13 Nov, 18-24 Nov and 6-19 Dec (or snooze the listing); then Smoobu > Channel Manager > Airbnb: map 1455 to apartment 3562176, or unlist it","impact":"Protects £748.90 room (393.18 + 355.72) plus relocation cost (not quantified)","source":"channel.md §2; comp-east"},
{"id":"t-push-check","type":"task","priority":"critical","ref":"P09 P04 P05 P06","status":"open","title":"Changed: pushes without logged edits seen (1 Nov 09:13Z on P04/P05/P06/P12; 7 listings overnight), so 'edit-only' is weaker; but P09 is past 24 h, P04/P05/P06 cross 24 h at 09:13Z, P04 refreshed without pushing (Smoobu £43 under PL 9-13 Nov) and PriceLabs has not seen the P06 12-15 Nov booking","why":"pricelabs.md C1 (get_listing_data 07:25Z): P09 3318172 last push 1 Nov 07:55:36Z (24 h at 07:55Z); P05 09:13:53Z, P06 09:13:55Z, P04 09:14:21Z. P04 refreshed 2 Nov 00:17:15Z, not pushed: Smoobu £159/161/164/166/170 = £820 vs PL £167/169/173/175/179 = £863. Self-pushed with no logged edit: P02 00:24Z, P03 03:12Z, P14 04:32Z, P07 04:44Z, P01 06:02Z, P08/P10 06:15Z, P12 07:22Z; P04/P05/P06/P12 on 1 Nov 09:13Z (no log that day). H3: P06 12-14 Nov still open in PriceLabs at £256/286/290 although booked in Smoobu. kpi_pack P12 13 sync nights are a timing artefact (live matches Smoobu).","where":"PriceLabs > listing 3318172, 3562176, 3166592, 3288517 > Sync status / push history: re-read last_date_pushed after 09:15Z; if still 1 Nov, raise a push failure with PriceLabs support. P04: find the failed or skipped push after 00:17:15Z and force a sync. PriceLabs > Integrations (Smoobu) > auto-sync","impact":"P04 £43 x 0.586 = £25; P06 occupancy/recency layers price 8-11 Nov as if 12-14 Nov were unsold (not quantified)","source":"pricelabs.md C1, H3; kpi_pack"},
{"id":"a-airbnb-rules","type":"task","priority":"critical","ref":"P20 P12 P13 P05 P06 P08 P04","status":"open","title":"Not fixed (day 4): hidden Airbnb layers 0.765x (<=28 days) / 0.900x (29-46 days) on every synced listing; now realised on P06 12-15 Nov (£195.52, plus a further unexplained x0.850 = £95.48)","why":"channel.md §3, 25 live searches 2 Nov 07:28-07:31Z: every synced card (P20, P12, both P13, P05, P08, P06, synced Barking) resolves per night to 0.765 at <=28 days, 0.900 at 29-46 days, 1.000 at 62+ days; boundary exact (lead 28 = 0.765, lead 29 = 0.900 on P05 29 Nov-2 Dec and P12 30 Nov-3 Dec). channel.md §1: P06 booking £541.00 = PL £832 x 0.765 x 0.850; the 8-11 Nov card at lead 6 shows 0.765 only, so the 0.850 is not a listing rule (special offer likely; inbox NOT CHECKED). Realised: P05 £328.76 + P04 £109.28 + P06 £195.52 = £633.56; P20 £545 (channel £574) not reconciled. 10 of 11 Airbnb bookings made after 21 Oct are below PL minus policy stay discounts. comp-west confirms on P13.","where":"Smoobu > Channel Manager > Airbnb > each apartment (and any global rule) > Default pricing rules: remove the <=28-day last-minute rule and the ~10% rule out to ~60 days; use a visible Airbnb discount if wanted (policy airbnb_visible_discounts). Airbnb host inbox: P06 reservation (Smoobu 162228256) price breakdown","impact":"£633.56 realised on 3 bookings; 23.5% of every <=28-day Airbnb night forward (total not quantified)","source":"channel.md §1, §3, §4; comp-west"},
{"id":"a-discount-cut","type":"task","priority":"critical","ref":"P04 P05 P09 P11 P12 P20 P06","status":"open","title":"Partly moving: next-30 gap £2,281 (£3,040 on the same 3 Nov-2 Dec dates), next-14 £926 (£1,295); mostly Reyhan removing their own DSO cuts and an unlogged P13 last-minute change; the P20 narrowing is the base cut moved into the base","why":"pricelabs.md H2 (live get_customizations 2 Nov): final vs uncustomized on open nights 3 Nov-2 Dec: P04 -20.6% (£568), P20 -11.3% (£604; uncustomized fell £243 with base 350->330 while final rose only £130), P11 -7.9% (£351, was -17.6%), P05 -12.0% (£400), P12 -14.9% (£449, wider: algorithm), P09 -5.1% (£22); P13 +£108 and P08 +£5 offset. Still active: last-minute P04 -5%, P05 -1%, P09 -18%; Aggressive occupancy on P04, P05, P11, P13, P20, P06; Booking Recency default everywhere. P13 last-minute -5% -> Custom 0% (unlogged, author NOT CHECKED); P06 layers unchanged since the unlogged 31 Oct-1 Nov change.","where":"PriceLabs > listing (3562176, 3166592, 3318172, 3064196, 2699998, 3547481, 3288517) > Customizations: set Last-minute, Occupancy and Booking Recency to Custom 0% explicitly (not toggled off)","impact":"Upper bound about £1,211 per 30 days: 568x0.586 + 604x0.345 + 351x0.379 + 400x0.793 + 449x0.621 + 22x0.875 - (108x0.69) - (5x0.727); includes overrides, customization-only share not separated","source":"pricelabs.md H2"},
{"id":"a-p13-record","type":"task","priority":"high","ref":"P20 P04 P12 P11 P13","status":"open","title":"Reyhan's 2 Nov 00:10-00:17Z edits: NEW conflict P20 base 350->330 and min 220->200 (vs your base 350); RESOLVED P20 6-24 Nov now -5% (= your -5%) and P13 2-12 Nov back to 0% (fixed); NARROWED P11 darts 0% (£1,150) vs your +5%; OPEN P04 9-24 Nov -10% vs -8%, P12 17 Nov -7% (£233); P13 base 250 still unrecorded","why":"pricelabs.md H1, get_user_logs: 18 entries, all Reyhan, 2 Nov 00:10:52-00:16:48Z. (c2) P20 base 350->330 and min 220->200 at 00:16:02Z vs policy listing_facts.P20.price_24oct base 350; PL rec 347; comp-east Nov P0-P40, Dec P17-P44, recommend +5% / fix-listing; 5-8 Dec Airbnb £970->£863; 8 Nov £215 under the old £220 floor. (c) P20 6-24 Nov -10% -> -3% -> -5% min 3 (00:16:48Z): matches your -5% but runs to 24 Nov, not 19. (e) P13 2-12 Nov price removed (0%), min 2, 00:12:22Z on 3064856/3090701/Vrbo: fixed; 12 Nov £159. (g) P11 13-17 Dec 0% (00:11:52Z) = £240/213/218/229/250 = £1,150, avg £230 vs 'above £300' and darts_override_24oct +5%. (a) P04 9-24 Nov -10% min 3 unchanged. (f) P12 17 Nov -7% min 2 = £233 (uncust £276) vs deprioritised +50%. (b) P04 2 Nov min 2 lapses tonight. (h) P13 base 250 (Reyhan 24 Oct) not in policy. Not policy conflicts: P11 non-darts cuts removed (comps P7 agree); P13 7-20 Dec -2%; P05 Dec/Jan and P06 -2% unchanged.","where":"PriceLabs 3547481 > Base / Min price; 3562176 > DSO 9-24 Nov; 2699998 > DSO 17 Nov; 3064196 (+ Vrbo) > DSO 13-17 Dec; 3064856 > Base; then data/policy.json","impact":"About £264/month if your settings are restored: P20 base £287 x 0.345 = £99; P12 17 Nov £181 x 0.621 = £112; P04 £49 x 0.586 = £29; P11 darts £58 x 0.407 = £24","source":"pricelabs.md H1; market.md edits table; comp-east; comp-central; comp-west"},
{"id":"a-base-review-1102","type":"advice","priority":"high","ref":"P01 P05 P06 P09 P11 P12 P13 P20","status":"open","title":"Decide today (Mon 2 Nov): hold every base - P01 253 off agenda; P05 550; P06 357; P09 176; P11 286 (fix-listing, not price); P12 284 while Reyhan's -7% stands (273 only if it goes); P13 keep 250 and record it; P20: confirm your 350 or record Reyhan's 330","why":"All specialists hold. P05 79.3% vs 40%, base under 4 BR P50 £578, comps P30, recommend +25% (dates are the lever). P06 4 sellable nights, P0, recommend +10%; 12-15 Nov sold at 0.650x PL = channel gap. P09 3 nights to handback. P11 37.9% vs 46% at comp P7 -> recommend(0.379,0.46,0.07,0) = fix-listing (rule never lowers below P75); open nights now -7.9% vs uncustomized after Reyhan removed -7%/-5%. P12 62.1% vs 40%, pace30 -11.9% (was -32.6%), band Nov P33-P60 / Dec P57-P77 = hold. P13 69% vs 41%, 250 ~P61, above rec 237. Raised flats net +2 n / +£312.59 since 18 Oct (bookings/day 1.07x vs 0.76x unraised). P20 base cut by Reyhan 00:16Z vs your 350; rec 347; comps P0-P44. No base change by Corentin in get_user_logs 1-2 Nov.","where":"PriceLabs > each listing > Base price (review only): 3320302, 3166592, 3288517, 3318172, 3064196, 2699998, 3064856/3090701, 3547481","impact":"£0 (holds); P20 restoration valued in a-p13-record (£99)","source":"occupancy.md; pricelabs.md M6; market.md §6; comp-central; comp-east; comp-west"},
{"id":"t-p11-2nov","type":"task","priority":"medium","ref":"P11","status":"done","title":"Done: Camden 2 Nov orphan now sellable at min 1 (Reyhan, 00:11:22Z)","why":"Today's data shows it fixed: get_user_logs 2 Nov 00:10:52-00:11:22Z set 2 Nov DSO +10% (via +20%), min 1; live price £176 (uncust £139), pushed 00:12:14Z; Smoobu /api/rates 2 Nov £176 min 1 (pricelabs.md M1; occupancy.md orphans). Price is 27% above uncustomized on a same-day orphan: your judgement; it lapses tonight.","where":"PriceLabs 3064196 > DSO 2 Nov (no further change)","impact":"Up to £176 room if it sells tonight","source":"pricelabs.md M1; occupancy.md"},
{"id":"a-p12-2228nov","type":"task","priority":"medium","ref":"P12","status":"done","title":"Done: 22-30 Nov now sold except the 26 Nov orphan (27-30 Nov booked 1 Nov at market rate); orphan moved to a-p12-26nov","why":"Today's data shows it resolved: reservations.csv 2 Nov has Booking.com 27-30 Nov £653.39 (booked 1 Nov, 0.793x PL £824; market 1.03x P50; comp median £232.33 all-in vs £217.80/n room) next to 21-26 Nov; only 26 Nov is open (1 night, min 2). No further cut needed (comp-east hold).","where":"PriceLabs 2699998 (no edit)","impact":"£0","source":"occupancy.md; comp-east; market.md 2a; channel.md §1"},
{"id":"a-p12-26nov","type":"task","priority":"medium","ref":"P12","status":"open","title":"New: Mile End 26 Nov is a 1-night orphan (min 2) after the 1 Nov booking: set 26 Nov min 1, keep £262","why":"kpi_pack gaps P12 26 Nov (1 night, min 2); pricelabs.md M1 live: DSO -7% min 2, unbookable=1, £262; occupancy.md: between Booking.com 21-26 Nov and the new 27-30 Nov arrival; comp-east: 1-night comps £284-318 all-in, our listing not returned. P04's min-3 rule does not apply; 26 Nov is not a deprioritised date.","where":"PriceLabs 2699998 > Date Specific Overrides > 26 Nov: minimum stay 1 (price unchanged)","impact":"Upper bound £262 x 0.621 = £163","source":"kpi_pack; pricelabs.md M1; comp-east"},
{"id":"t-p13-3nov","type":"task","priority":"medium","ref":"P13","status":"open","title":"New: Shepherd's Bush 3 Nov becomes a 1-night orphan from tomorrow if tonight does not sell: set 3 Nov min 1 on both listings, keep £124","why":"occupancy.md orphans: 2-3 Nov is a 2-night run at min 2 before the 4 Nov arrival (Smoobu £122/£148 tonight); pricelabs.md M1: 3064856 2/3 Nov £122/£124, min 2 (Reyhan 0% since 00:12:22Z); comp-west gap 6: not returned for 3-4 Nov. No standing decision on P13 min stay.","where":"PriceLabs 3064856 and 3090701 > DSO 3 Nov: minimum stay 1 (tomorrow morning, only if 2 Nov is unsold)","impact":"Upper bound £124 x 0.69 = £86","source":"occupancy.md; pricelabs.md M1; comp-west"},
{"id":"t-p04-weekly","type":"task","priority":"medium","ref":"P04","status":"open","title":"New: synced Barking Airbnb applies an 18% weekly discount, not the policy 15%","why":"channel.md §2 live 2 Nov: 1657859794156786222 6-19 Dec (13 n) card £2,369.50 - 'Weekly stay discount' £400.96 = 18% of room £2,227.50, vs policy length_of_stay_discounts weekly 15%: £66.83 extra on that stay. Where it is set (Airbnb vs Smoobu rule) NOT CHECKED.","where":"Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly: 15% (or Smoobu > Channel Manager > Airbnb > apartment 3562176 pricing rules, whichever holds it)","impact":"£66.83 per 6-19 Dec stay","source":"channel.md §2"},
{"id":"t-p06-open","type":"task","priority":"medium","ref":"P06","status":"open","title":"Marylebone 8-14 Nov run sold 12-15 Nov at £541 = 0.650x PriceLabs (58% under comps); 8-11 Nov still open at £891: intended? If it should sell, the rule now says +10%","why":"channel.md §1: booked 1 Nov 19:40, room £541.00 = PL £832 at booking (09:13:55Z push; not £891) x 0.765 hidden layer x 0.850 unexplained (£95.48). comp-central: -58% vs comp median all-in (n=3), 46% under the cheapest available comp; market.md 2a: 0.52x daily P50. PriceLabs still shows 12-14 Nov open (pricelabs.md H3). Remaining 8-11 Nov £214/217/222/238 = £891, min 2, down ~6% with no log (Aggressive occupancy, recency). recommend(0.667, 0.46, 0.0, -0.024) = +10%. Policy lists P06 as an intentional block, so a question first.","where":"Smoobu > Calendar P06 8-11 Nov; PriceLabs 3288517 > DSO 8-11 Nov and Customizations; Airbnb host inbox for reservation 162228256","impact":"If it should sell: £891 x 10% x 0.667 = £59","source":"channel.md §1; comp-central; market.md 2a; pricelabs.md H3"},
{"id":"a-p05-9nov","type":"task","priority":"high","ref":"P05","status":"open","title":"Not fixed: Airbnb still sells 9 Nov at £253.44 room (20% Special offer on £316.80) while Smoobu holds £1,451: clear the Airbnb date price/offer and decide the night","why":"channel.md §3 (07:29:29Z): 1 night card £511.80, 'Special offer -£63.36' = 20% of £316.80 room, identical to 31 Oct and 1 Nov; Smoobu £1,451, min 1, open. pricelabs.md H4: DSO +300% min 1 since 30 Oct 22:09:42Z; uncustomized £425; neighbours 8/10 Nov booked at £456/£454. market.md §5: P50-P75 £371-519, market -11.8 pts vs STLY. No P05 log since 31 Oct.","where":"Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove custom price / Special offer; Smoobu > Channel Manager > Airbnb sync log; PriceLabs 3166592 > DSO 9 Nov: 0% min 1 to sell, or close in Smoobu for a soft block","impact":"Upper bound £425 x 0.793 = £337; protects up to £171.56 per sale vs the Airbnb room now","source":"channel.md §3; pricelabs.md H4; market.md §5"},
{"id":"a-p05-dec","type":"task","priority":"medium","ref":"P05","status":"open","title":"St John's Wood 7-8 Dec now £490 / £483: raise to about £597 / £593 (market P75)","why":"market.md §5: 7-8 Dec £490/£483 vs P75 £597/£593, market +11.0 / +5.5 pts vs STLY; no 7-8 Dec edit. comp-central: December stays P25-P33, 32-48% under medians; recommend(0.793, 0.40, 0.38, 0.15) = +25%, capped at P75 (+22%) because 3 of 6 comps are rated under 4.3.","where":"PriceLabs 3166592 > Date Specific Overrides > 7-8 Dec","impact":"(£1,190 - £973) x 0.678 = £147","source":"market.md §5; comp-central"},
{"id":"a-peak-check","type":"task","priority":"high","ref":"P13 P05","status":"open","title":"Unchanged: P13 25-26 Dec still min 3 with 27 Dec booked (arrivals cannot fit); 21-26 Dec at -3%; P05 29 Dec +100% (£1,342); P20 NYE now under P90 (hold)","why":"pricelabs.md M2: 3064856/3090701 DSO 23-26 Dec -3% min 3 (27 Oct), 24-26 Dec £228/229/232. comp-west: 23-26 Dec P17 of the wider sample (median 298.84), 3090701 ~11% under its quality level, recommend +10%. market.md 2b: 24-26 Dec £689 vs P50 £843, +8.5 to +12.3 pts vs STLY. P05 29 Dec £1,342 vs neighbours £784/£820, uncust £1,081 (pricelabs.md H4). market.md 2d: P20 28 Dec-2 Jan £2,735, £142 under P90.","where":"PriceLabs 3064856 > DSO 21-26 Dec: +10%, min 2 on 25-26 Dec; 3090701: +12% (twins differ); 3166592 > DSO 29 Dec: 0%, min 1","impact":"P13 24-26 Dec £69 x 0.508 = £35 + 25-26 Dec unlocked (£229 + £232) x 0.508 = £234; about £269","source":"pricelabs.md M2, H4; comp-west; market.md 2b, 2d"},
{"id":"a-raise-1012nov","type":"task","priority":"medium","ref":"P13","status":"open","title":"Partly: 12 Nov (England v Croatia) back to £159 after Reyhan removed the -5%; still under market P25 and min 2: set 3064856 12 Nov to £176 with min 1","why":"market.md 2b/§4: sold out; 3064856 £159 vs fortnight £172, P25 £176, P50 £214; twin 3090701 £193; min 2 with 13 Nov booked means 12 Nov only sells as 11-12 Nov. comp-west: 11-13 Nov 3064856 P25 (-7.3%), recommend +10% (£175). Policy: 8-12 Nov 0% (now matched), silent on event uplifts.","where":"PriceLabs 3064856 > DSO 12 Nov: price about £176 (+11%), minimum stay 1; leave 3090701 at £193","impact":"(£176 - £159) x 0.69 = £12; min-1 unlock not quantified","source":"market.md 2b, §4; comp-west"},
{"id":"t-channel-gaps","type":"task","priority":"high","ref":"P11","status":"open","title":"Camden: Reyhan's -7%/-5% removed (open nights now -7.9% vs uncustomized); still P7 at 37.9% vs 46% = fix-listing; event nights 26 Nov >= £231, 3 Jan >= £201; fix Booking.com visibility","why":"occupancy.md: fwd30 37.9% vs 46%, fwd60 40.7% vs 39%, no booking since 28 Oct. comp-central: P7 room (30d), P10 (60d), P0-P60 at list x1.15; recommend 30d fix-listing, 60d +5%. pricelabs.md H1/H2: 10 Nov-18 Dec price removed 00:11:52Z; open nights £4,119 vs £4,470. market.md §4: 26 Nov £219 vs fortnight £231; 3 Jan £185 vs £201. Policy ranking: search views -64%, click-through 0.81% vs 1.70%.","where":"PriceLabs 3064196 (+ Vrbo) > DSO 26 Nov and 3 Jan; Booking.com extranet > Camden > Opportunities / photos / ranking","impact":"£12 x 0.379 + £16 x 0.407 = £11; visibility not quantified","source":"occupancy.md; comp-central; pricelabs.md H2; market.md §4"},
{"id":"t-p20-delivery","type":"task","priority":"high","ref":"P20","status":"open","title":"Not fixed: Waterford 20-22 Nov delivery block still removed; Airbnb now sells 20-23 Nov at £831 (was £763): intended?","why":"comp-east 2 Nov: Airbnb 1791529331262420081 20-23 Nov £831 (1 Nov £763; rise from Reyhan's 2 Nov edits). pricelabs.md M3: 20-22 Nov open £301/£299/£290, min 3, -5%. occupancy.md: block cancelled 30 Oct 18:11; actor UNKNOWN. Policy listing_facts.P20.block_20_21_nov 'delivery, intentional'.","where":"Smoobu > Calendar P20 (3547481) 20-22 Nov: re-block if the delivery still needs those nights","impact":"Not quantified","source":"comp-east; pricelabs.md M3; occupancy.md"},
{"id":"a-p05-earlybird","type":"advice","priority":"medium","ref":"P05","status":"open","title":"St John's Wood visible 12% early-booking discount (60+ days) is now realised on the 29 Jan-1 Feb booking (£144.48): not in policy - yours?","why":"channel.md §1: PL booked_price £1,204 (410/414/380) x 1.000 lead layer x 0.88 = £1,059.52 exactly; §3: 4-7 Jan card 'Early booking discount -£150.24' = 12.0%. Policy records an early bird only for P13 (10%). Visible, so it fits airbnb_visible_discounts: confirm rather than remove.","where":"Smoobu > Channel Manager > Airbnb > Abbey Rd (3166592) > pricing rules > Early bird","impact":"£144.48 on this booking; forward not quantified","source":"channel.md §1, §3"},
{"id":"a-p13-orphan-price","type":"advice","priority":"medium","ref":"P13","status":"open","title":"17 Nov fixed in effect (3064856 £170 / 3090701 £207, at the quality lines) but the +35% is still set; 27 Nov 3064856 £336 (+39% vs P50) under +50%: confirm; rule gives +5%, so no trim proposed","why":"comp-west Focus: 17 Nov PL price 207/170 vs market P50 208, quality lines ~£199/~£177; 3064856 price £170 vs user_price £258 with +35% min 1 still set (cause NOT CHECKED); 27 Nov 3064856 336 (+39% vs P50 241, above P75 303), 3090701 244; one comp £394 (n=1). pricelabs.md M3: 17 Nov fell from £271.","where":"PriceLabs 3064856 > DSO 17 / 27 Nov","impact":"Not quantified","source":"comp-west; pricelabs.md M3"},
{"id":"a-p13-twin","type":"task","priority":"medium","ref":"P13","status":"open","title":"Shepherd's Bush twins identical in Smoobu on 54 of 64 jointly open dates from 7 Dec (was 39 of 49) and on Airbnb cards: keep a small gap","why":"channel.md §3: identical Airbnb cards 7-10 Dec £739.50 and 3-6 Jan £555.30 on both listings; market.md 2b: both £4,600 on 7-26 Dec. Policy twin_listings: slightly different prices, never identical.","where":"PriceLabs 3090701 > DSO 7-26 Dec (e.g. -2% vs 3064856) or base offset","impact":"Not quantified (duplicate-listing risk)","source":"channel.md §3; market.md 2b"},
{"id":"a-p12-genius","type":"task","priority":"medium","ref":"P12","status":"open","title":"Mile End 27-30 Nov Genius booker paid 0.6885 of list (31.15% off, £295.61): Genius plus two 10%/15% layers; confirm whether Genius Level 2&3 is still ticked","why":"channel.md §1: list = Smoobu x1.15 (309+344+296 = £949, rounding inferred) x 0.6885 = £653.39; 0.6885 = 0.90 x 0.90 x 0.85; Smoobu notice shows Genius booker; best fit with 25 Oct stack = Genius 15% x Mobile 10% x Last Minute 10%. 3-7 Dec fitted two 10% layers. Policy: stacking is settled, size only; Camden/Shepherd's Bush unticked Level 2&3 on 21 Oct.","where":"Booking.com extranet > Mile End > Promotions > Genius: check / untick Level 2&3","impact":"Not quantified","source":"channel.md §1"},
{"id":"a-p20-conversion","type":"task","priority":"medium","ref":"P20","status":"open","title":"Waterford: fwd30 34.5% vs 37% at Nov P0-P40 / Dec P17-P44 with 0 reviews: hold price, fix conversion (base cut is a conflict in a-p13-record)","why":"occupancy.md: 34.5% (10/29) vs 37% next 30, 22.0% vs 30% next 60. comp-east 2 Nov: Nov -14% to -42% (P0-P40), Dec -20% to 0% (P17-P44); 0 reviews vs 18; recommend +5% (30d) / fix-listing (60d). Flexible test day 9 of 14: test group 6 bookings (P20 x2), 0 cancelled.","where":"Airbnb > listing 1791529331262420081 > photos / title / amenities; review requests to past guests","impact":"Not quantified","source":"occupancy.md; comp-east; channel.md §4"}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still double-sells 3-6 / 6-9 Nov (£748.90); first arrival TOMORROW 3 Nov","evidence":"Live 2 Nov 07:28:21Z/07:28:28Z: 3-6 Nov £518.20, 6-9 Nov £514.20 on 1455 over Smoobu Booking.com £393.18 and Airbnb £355.72; also sells 18-24 Nov and 6-19 Dec alongside 1657."},
{"agent":"pricelabs","severity":"critical","ref":"P09 P04 P05 P06","title":"P09 past 24 h without push; P04/P05/P06 cross 09:13Z; P04 refreshed without pushing (-£43 9-13 Nov); P06 booking not seen","evidence":"get_listing_data 07:25Z: P09 1 Nov 07:55:36Z, P05/P06/P04 1 Nov 09:13-09:14Z; P04 refresh 2 Nov 00:17:15Z; P06 12-14 Nov still open in PriceLabs."},
{"agent":"pricelabs","severity":"high","ref":"P20","title":"Reyhan cut P20 base 350->330 and min 220->200 on base-review day: new conflict with Corentin's 24 Oct base 350","evidence":"get_user_logs 2 Nov 00:16:02Z; PL rec 347; comp-east Nov P0-P40, Dec P17-P44; 5-8 Dec Airbnb £970->£863; 8 Nov £215 under old floor."},
{"agent":"channel","severity":"high","ref":"P06","title":"P06 12-15 Nov sold at 0.650x PriceLabs (£541 vs £832): hidden 0.765 layer x unexplained 0.850","evidence":"Booked 1 Nov 19:40 after the 09:13:55Z push; £832 x 0.765 x 0.850 = £541.00; comp-central -58% vs median; market 0.52x P50."},
{"agent":"channel","severity":"high","ref":"P20 P12 P13 P05 P06 P08 P04","title":"Hidden Airbnb layers 0.765 (<=28 d) / 0.900 (29-46 d) unchanged, day 4; boundary exact at lead 28/29","evidence":"25 live searches 07:28-07:31Z; realised £633.56 on P05, P04, P06 bookings."},
{"agent":"channel","severity":"high","ref":"Portfolio","title":"Airbnb monitoring (ends 4 Nov): bookings -48%, nights -70%, £ -65% (20 Oct-2 Nov vs 6-19 Oct); P12 0, P13 -80%","evidence":"reservations.csv: 12 bk / 50 n / £9,881.53 vs 23 / 164 / £28,179.02; ex 28+ night stays -51% nights and £; unconstrained flats -25% / -26% / -39%."},
{"agent":"channel","severity":"high","ref":"P05","title":"P05 9 Nov still sells on Airbnb at £253.44 room vs Smoobu £1,451","evidence":"07:29:29Z: £316.80 room less 20% Special offer; identical since 31 Oct."},
{"agent":"pricelabs","severity":"high","ref":"P13 P11 P20","title":"Reyhan fixed P13 2-12 Nov (0%) and P20 6-24 Nov (-5%); P11 darts back to 0% (£1,150) but not your +5%","evidence":"get_user_logs 2 Nov 00:11:52Z / 00:12:22Z / 00:16:48Z; live overrides; darts avg £230 vs 'above £300'."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £2,281 next 30 (same dates yesterday £3,040); P20 narrowing is the base cut moved into the base","evidence":"pricelabs.md H2: P20 uncustomized -£243, final +£130; P04 -20.6%, P12 -14.9%, P05 -12.0%; P13 last-minute set to 0% unlogged."},
{"agent":"occupancy","severity":"medium","ref":"P12 P13","title":"New 1-night orphans: P12 26 Nov (min 2, unbookable) and P13 3 Nov from tomorrow","evidence":"kpi_pack gaps P12 26 Nov; occupancy.md orphans; P13 2-3 Nov 2-night run before the 4 Nov arrival."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct raised flats net positive for the first time: +2 n / +£312.59; bookings/day 1.07x vs 0.76x unraised","evidence":"Made 19 Oct-1 Nov 13 / 46 n / £9,600.22 vs 4-18 Oct 13 / 91 n / £18,199.03; new P06, P12, P05 bookings."},
{"agent":"channel","severity":"medium","ref":"P04","title":"Synced Barking Airbnb weekly discount 18% vs policy 15%","evidence":"6-19 Dec card: £400.96 weekly discount on £2,227.50 room = 18%; £66.83 extra."}
],
"top5":[
"Barking (arrival TOMORROW 3 Nov): block nights 2-8 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 of confirmed stays double-sellable); also block 9-13 Nov, 18-24 Nov, 6-19 Dec, then map to Smoobu 3562176 or unlist.",
"Base review, decide today: hold every base (P05 550, P06 357, P09 176, P11 286, P12 284 while the -7% stands, P13 250 recorded; P01 off agenda); P20: confirm your 350 or record Reyhan's 330 / £200 floor (rec 347, comps P0-P44 do not support a cut).",
"PriceLabs push: after 09:15Z re-read last push on P09, P04, P05, P06; P04 refreshed but did not push (Smoobu £43 under PL 9-13 Nov); PriceLabs has not seen the P06 12-15 Nov booking.",
"Airbnb: remove the hidden 0.765 / 0.900 Smoobu rules (£633.56 lost on 3 bookings), check the P06 12-15 Nov reservation for a special offer (x0.850), clear P05 9 Nov (£253.44 vs £1,451); monitoring ends 4 Nov at bookings -48%.",
"Confirm Reyhan's remaining conflicts (P04 -10% vs -8%; P11 darts 0% vs +5% at £1,150; P12 17 Nov) and fill the new orphans: P12 26 Nov min 1, P13 3 Nov min 1 if tonight does not sell."
],
"per_property":[
{"ref":"P01","change":"No change. 100% to the 20 Dec handback; self-pushed 06:02Z. Base 253: 1 booking since the rise, 0 sellable nights; hold, off the agenda."},
{"ref":"P02","change":"Intentional block; self-pushed 00:24Z; Vrbo copy last pushed 24 Feb 2026 (t-p02-vrbo)."},
{"ref":"P03","change":"Intentional block; pushed 03:12Z via Channex."},
{"ref":"P04","change":"No booking. 1455 still double-sells 3-6 / 6-9 Nov (arrival tomorrow). PriceLabs refreshed 00:17:15Z without pushing: Smoobu £820 vs PL £863 on 9-13 Nov. Reyhan -10% 9-24 Nov vs your -8% unchanged; 2 Nov min-2 gap lapses tonight. Synced weekly discount 18% vs 15%. Fwd30 58.6% vs 24%."},
{"ref":"P05","change":"New booking 29 Jan-1 Feb £1,059.52 = 0.880x PL £1,204 (visible 12% early bird, not in policy). 9 Nov Airbnb £253.44 vs Smoobu £1,451 unchanged; 29 Dec £1,342; 7-8 Dec £490/£483. Fwd30 79.3% vs 40% (window roll). 18 Oct base 550: 2 bk / 6 n since the rise, 0 cancellations; hold. Push crosses 24 h 09:13Z."},
{"ref":"P06","change":"New booking 12-15 Nov £541 = 0.650x PL £832 at booking (0.765 hidden layer x 0.850 unexplained); 58% under comps, 0.52x market P50; not yet seen by PriceLabs. 8-11 Nov open £891 (down ~6%, no log). Fwd30 ex-blocks 66.7% vs 46%. 18 Oct base 357: 2 bk / 6 n since the rise; hold."},
{"ref":"P07","change":"Intentional block; self-pushed 04:44Z."},
{"ref":"P08","change":"No booking. 5-7 Nov open (£190/209/213); Airbnb 0.765. Self-pushed 06:15Z. Handback 13 Nov."},
{"ref":"P09","change":"No booking. 10-12 Nov £120/144/146 (last-minute -18% decay); Airbnb P25. Last push 1 Nov 07:55:36Z, past 24 h. 18 Oct base 176: 1 booking since the rise; hold."},
{"ref":"P10","change":"No change; sold to the 18 Nov handback; self-pushed 06:15Z."},
{"ref":"P11","change":"No booking (none since 28 Oct). Reyhan removed -7%/-5% on 10 Nov-18 Dec (open nights -7.9% vs uncust, was -17.6%); darts 13-17 Dec £1,150 at 0% vs your +5%; 2 Nov orphan fixed (min 1, £176). Fwd30 37.9% vs 46%, comp P7. 18 Oct base 286: 2 bk / 6 n vs 22 n cancelled (pre-rise); hold, fix-listing."},
{"ref":"P12","change":"New booking 27-30 Nov Booking.com £653.39 = 0.793x PL £824 (stack 31.15% off list), at market P50. New 26 Nov orphan. Pace30 -11.9% (was -32.6%). Self-pushed 07:22Z. Airbnb 0 bookings in 14 days. 18 Oct base 284: 5 bk / 23 n vs 4 cancelled / 22 n; hold while -7% stands."},
{"ref":"P13","change":"No booking. Reyhan: 2-12 Nov back to 0% (conflict fixed), 7-20 Dec -5% -> -2%; last-minute -5% -> 0% unlogged. 12 Nov £159 min 2. 3 Nov orphan from tomorrow. Twins identical on 54 of 64 Dec dates. Fwd30 69% vs 41%. Base 250: keep and record."},
{"ref":"P14","change":"Numbers only: 75% of open nights at the £500 minimum; 0% vs 41% booked."},
{"ref":"P20","change":"No booking. Reyhan: base 350->330 and min 220->200 (new conflict vs your 350); 6-24 Nov -5% (matches your -5%, to 24 Nov). 8 Nov £215 under old floor; NYE run £2,735 (was £3,183). Airbnb sells 20-23 Nov at £831 (delivery block missing). Fwd30 34.5% vs 37%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 255)","recommendation":"Hold 253; off the agenda","reason":"0 sellable nights before the 20 Dec handback (27/27 non-blocked booked vs market 34%); same-stay comps £360-384 all-in (occupancy.md; comp-east)."},
{"ref":"P05","base":"550 (rec 548)","recommendation":"Hold 550; use date overrides","reason":"79.3% vs 40% next 30, 67.8% vs 38% next 60; base under 4 BR P50 £578; comps P30, recommend +25% on Dec stays; 2 bk since the rise, 0 cancellations; levers 7-8 Dec, 13-21 Dec, 9 Nov, 29 Dec (market.md; comp-central)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold 357; date level (t-p06-open)","reason":"4 sellable nights (8-11 Nov); 66.7% of non-blocked vs 46%; P0, recommend +10%; 12-15 Nov sold at 0.650x PL / 0.52x market P50 = channel gap, not base (comp-central; channel.md §1)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold 176","reason":"3 open nights before the 26 Nov handback; 87.5% vs 36%; Airbnb P20-P25; 5.0 on 3 reviews (comp-east)."},
{"ref":"P11","base":"286 (rec 285)","recommendation":"Hold 286; fix-listing, base is not the lever","reason":"37.9% vs 46% at comp P7 -> recommend fix-listing (occupancy's lower-leaning overruled: rule never lowers below P75); 60d +5%; base = market P50 £289; Reyhan's cuts removed, open nights -7.9% vs uncust (comp-central; pricelabs.md H2)."},
{"ref":"P12","base":"284 (rec 273)","recommendation":"Hold 284 while Reyhan's -7% on 16 Nov-13 Dec stands; 273 only if it is removed","reason":"62.1% vs 40%; pace30 -11.9% (was -32.6%); band Nov P33-P60, Dec P57-P77, recommend raise offset by quality = hold; 27-30 Nov sold at market P50 (comp-east; occupancy.md; market.md)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"69% vs 41%; 250 ~P61 of 2 BR market; Nov stays above each listing's quality line after Reyhan's -5% removal; levers 12 Nov and Christmas (comp-west; market.md §6)."},
{"ref":"P20","base":"330 (350 until 2 Nov 00:16Z; rec 347)","recommendation":"Conflict for Corentin: confirm your 350 or record Reyhan's 330 (and £200 floor); not a new proposal","reason":"Policy price_24oct base 350; rec 347; comps Nov P0-P40, Dec P17-P44; recommend +5% / fix-listing; gap is 0 reviews vs 18, not price (comp-east; pricelabs.md H1)."}
]}
```

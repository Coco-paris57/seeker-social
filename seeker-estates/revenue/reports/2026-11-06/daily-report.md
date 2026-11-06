# Seeker Estates - Daily revenue report, 2026-11-06 (Friday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-06/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-06/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-05/daily-report.md` and its JSON, the dashboard action list (6 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/max come from `data/snapshots/2026-11-06/listings.csv`.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.
- Process note: the pricelabs section ran its group and account `get_user_logs` calls as a parallel pair, which breaks the one-call-at-a-time rule. Both calls returned 200 with 0 entries, so no data was lost.

**Policy respected**
- The P02/P03/P06/P07 blocks are intentional.
  - P06 8-11 Nov is open inventory outside the block.
  - P06 15-21 Nov was opened on 5 Nov. That cuts across the block, so it goes to you to confirm. It is not a proposal.
- P14 is reported as numbers only. P13 is one flat (3064856 + 3090701).
- Settled items, not raised again:
  - Visibility Booster commission and the 15%/20% stay discounts.
  - Booking.com promotion stacking (I report the size only).
  - P04 2 Dec, P04 min 3, P12 17 Nov and P13 1 Dec.
  - P13 twin price order and the P09 Airbnb rules screen. P09 is therefore left out of a-airbnb-rules.
  - P12 key collection and P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - I do **not** adopt channel's suggestion to set Mile End Genius to Level 1 only.
  - Reyhan's edits that cross your decisions are listed for you to confirm. They are not proposed again.
  - One proposal below (a-p12-trim) lowers a PriceLabs price. I say so where it appears, with the evidence.

## Corrections and conflicts resolved between sections

1. **Last 30 is correct as packed.** The brief worried that kpi_pack might still count P09's cancelled 1-5 Nov nights. It does not.
   - `rm.metrics.performance` drops cancelled rows, and occupancy recomputed **261 n / £44,986.57** from `reservations.csv`.
   - Live Smoobu `/api/rates` shows 1-5 Nov available.
   - Whether the guest actually stayed 1-5 Nov is NOT CONFIRMED. If they did, last 30 would be 266 n / 68.2%, with revenue unknown.
2. **"Pushed price above Your Price" on P12, P04 and P09 (comp-east): explained, not a push fault.** The pricelabs section (C1) and channel (§1) show that "Your Price" (`user_price`) is the **previous cycle's** pushed price. Reyhan's 5 Nov edits fit the gaps exactly:
   - P12 -15% to -5%: 0.95 / 0.85 = **+11.8%** (seen: +11-12%).
   - P04 -15% to -7%: 0.93 / 0.85 = **+9.4%** (seen: +9%).
   - P09 -5% removed: 1 / 0.95 = **+5.3%** (seen: +5-6%).
   - The P12 overnight jump is therefore Reyhan's -5% taking effect.
3. **P12 11-13 Dec commission is 15%, not 19.4% of room (channel wins over comp-east).** £99.57 = 15.000% x (room £513.81 + cleaning £150). There is no booster on Mile End on record. The cleaning share is £22.50, which belongs to the open item t-cleaning-commission.
4. **P12 11-13 Dec ratio.** Use **0.837x** of the price on sale at booking (£614, from the 10:54:30Z push). 0.936x is measured against the stale 01:25Z price.
   - The Booking.com stack is **27.3% off list**: £707 x 0.85 x 0.90 x 0.95 = £513.81. The best reading is Genius 15% x Mobile 10% x occupancy -5%. Size only, and kept per your direction.
5. **18 Oct base rises, corrected method: +3 n / +£1,798.65** (yesterday +10 n / +£2,145.44).
   - P09's cancellation takes off -9 n / -£860.60. It was booked 4 Oct, before the rise, so it says nothing about the rise.
   - P12's 11-13 Dec booking adds +2 n / +£513.81.
6. **P09 payout fields are not evidence of a retained payout.** Smoobu's "Cancellation Payout £832.83" is the generic Airbnb payout label, and it also appears on confirmed stays (channel §3; occupancy). The retained payout is NOT CHECKED.
7. **Discount gap: next 30 £1,807, next 14 £997** (pricelabs H3; yesterday £2,285 / £1,041). It fell mostly because of Reyhan's P04/P12 DSO edits, not because any discount layer changed. P04 is still 24.1% under its uncustomized price.

## Executive summary

1. **CRITICAL: Barking day 7. The Airbnb guest for 6-9 Nov (161888271, room £355.72) arrives today.** The unsynced Airbnb listing 1455876748739910219 still sells **6-9 Nov (£514.20) and 7-10 Nov (£517.40)** (channel §2, 07:19Z). No booking is visible on 1455 yet.
2. **t-p06-2pound: fixed in Smoobu, now downgraded to high and watched.**
   - Smoobu 9 Nov is **£200**, 8 Nov £200. Airbnb follows Smoobu again (9 Nov shows as £153 room = 0.765 x £200). Nothing sold at £2.
   - PriceLabs "Your Price" for 9 Nov still reads **£2**. There is no override and no log entry behind it.
   - P06's next cycle is due about 10:34Z. Watch that push, and set 8-9 Nov to PriceLabs' **£213 / £219**.
3. **t-pl-nodata: closed.** P01, P06, P09 and P10 all have data again and have pushed.
   - **Eight listings last pushed 5 Nov 10:34-10:58Z** (P06, P12, P11, P13 x2, P08, P09, P04). They reach 24 h at about 11:00Z today, so a push-freshness watch replaces the item.
   - **15 nights (8-12 Nov) sit £256 below PriceLabs in Smoobu**, at values that match no PriceLabs series: P13 3090701, P11, P04, P09 and P06. These look like manual Smoobu edits. **Who made them?** The ~11:00Z cycle will likely overwrite them.
4. **NEW: P06 15-21 Nov is open and selling on Airbnb (£2,143 Smoobu, min 2).**
   - The block was shortened 5 Nov 17:31; PriceLabs still shows these nights blocked.
   - P06 is a policy intentional block, so **you need to confirm this was meant.**
5. **NEW: P09 Airbnb 1-10 Nov cancelled mid-stay (5 Nov 09:32).** 6-12 Nov reopened at **£781**, with 8-10 Nov at the £100 floor.
   - Comps show price is not the barrier: our 2-night stays are already in the band's cheapest quartile.
   - Proposal: raise 8-10 Nov to PriceLabs' £112 / £110 / £109.
   - Payout retention is NOT CHECKED.
6. **Reyhan's 5 Nov edits:**
   - **P04 -7%.** This is within 1 pt of your -8%, and the comps support it.
   - **P13 8-12 Nov -10%** (you set 0%) and **new 7-20 Dec -7%.** Both conflict with your decisions, and the comps say raise.
   - **P12 eased to -5%.** Open 30 Nov-4 Dec and 7-11 Dec are now **10-17% over the comp median**: proposal to trim.
   - P08 +5% and P11 23 Dec +7% go the way the plan asked.

**Last 30 nights (7 Oct-5 Nov, 13 units):** occupancy **66.9%**, ADR **£172.36**, RevPAR **£115.35**, revenue **£44,986.57** (261 n; kpi_pack `portfolio_last30`). Yesterday: 67.9% / £170.36 / £115.75 / £45,144.33.
**Next 30 (6 Nov-5 Dec):** **58.6%** (170/290; yesterday 62.2%).
- P09 lost 4 nights.
- P06 gained 7 sellable nights (15-21 Nov).
- The window rolled forward one day.

**Next 60:** **47.4%** (228/481; yesterday 50.0%). Smoobu truth, handback-aware.
**7-day pickup (31 Oct-6 Nov):**
- Gross: 8 bookings / 21 n / £4,493.18.
- Cancellations: 4 / 16 n / £2,635.72.
- **Net: +5 n / +£1,857.46** (yesterday +12 n / +£2,907.95).

## Base review

There was no `base_price`, `min_price` or `max_price` change on 5-6 Nov. PriceLabs' recommended base moved on two listings: P01 255 -> 256, P20 347 -> 351.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% booked to the 20 Dec handback; data recovered | **Hold; off the agenda** |
| P04 | 220 / Unavailable | 56.7% vs 23%. November at -7% is -13% vs comp median, which is the supported line (qp -0.15). December -11% to +3.5% (comp-east) | **Hold 220.** Get the data on "Unavailable" |
| P05 | 550 / 544 | 76.7% vs 41%; comps P25; qp +0.15; `recommend` +25% | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | Only 8-11 Nov (and 15-21 Nov, if you confirm) are sellable | **Hold** |
| P09 | 176 / 176 | 66.7% vs 36% to handback; reopened 6-12 Nov at band P25-P34 | **Hold**; fix the 8-10 Nov floor values |
| P11 | 286 / 283 | 46.7% vs 45%; comps P0-P8; `recommend` +5% = removing Reyhan's -5% | **Hold 286** (conflict, a-p13-record) |
| P12 | 284 / 284 | 63.3% vs 41%; **pace30 -19.9%**; open Nov-Dec nights at band P67-P85, qp -0.15; handback 13 Dec | **Hold 284.** Correct the level with dates (a-p12-trim), not with the base |
| P13 | 250 / 237 (236) | 73.3% vs 42%; P0 on every 8-12 Nov stay | **Keep 250 and record it in policy** |
| P20 | **330** (your 350) / 351 | 46.4% vs 36% (30d), 22.4% vs 30% (60d); 0 reviews; December `recommend` fix-listing | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 5 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Per day, made 19 Oct-4 Nov vs 2-18 Oct (bk / n / £) |
|---|---|---|
| **Raised** | **+3 n / +£1,798.65** (made 19 / 62 n / £13,506.00; cancelled 9 / 59 n / £11,707.35) | **1.08x / 0.53x / 0.52x** (yesterday 1.00x / 0.48x / 0.50x) |
| Unraised (P02, P08, P10, P14, P20*) | +29 n / +£4,717.79 (unchanged) | 0.86x / 0.43x / 0.59x |
| P13 (base 235 -> 250, not recorded in policy) | +16 n / +£2,909.76 (unchanged) | - |

\* P20's base was cut twice, so it is not a clean control.
- Per raised flat:
  - P01 +3 n / +£720.90; P05 +6 / +£1,953.04; P06 +6 / +£1,345.77.
  - **P09 -7 / -£607.39** (cancellation of a booking made before the rise).
  - P11 -11 / -£2,355.27; **P12 +6 / +£741.60**.
- **Reading:** still positive. Today's fall comes from a booking made before the rise, so it is not evidence about the rise itself. Both new P12 bookings sold under Reyhan's overrides. **Hold the bases.**

### Per property
| Ref | Change since 5 Nov |
|---|---|
| P01 | Data recovered; pushed 6 Nov 05:28Z. Nothing open before the 20 Dec handback. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy last pushed 24 Feb. |
| P04 | No booking. The 6-9 Nov Airbnb guest arrives today, and **1455 still sells 6-9 and 7-10 Nov (day 7)**. Reyhan moved 9-24 Nov from -15% to **-7%** (open nights £2,051, was £1,874). Smoobu 9-11 Nov sells **£140 x 3** vs PriceLabs 152/153/158. Weekly discount still 18.0%. |
| P05 | No booking, no edit. **9 Nov Airbnb still £253.44 room vs Smoobu £1,383 (7th check).** 7-8 Dec £922; 13-21 Dec £5,316 (P75 £1,171 / £5,813). 29 Dec £1,351 (uncustomized £1,071). 12% early bird still visible. |
| P06 | **9 Nov £2 -> £200 in Smoobu**; 8 Nov £200 (PriceLabs 213/219). PriceLabs Your Price for 9 Nov still £2. **15-21 Nov opened** (block 143402691 shortened 5 Nov 17:31) and selling on Airbnb; PriceLabs still shows blocked. Rating 4.64 (11) -> 4.58 (12). |
| P08 | Reyhan +5% on 5-21 Nov: 7 Nov **£193** (target met), 6 Nov still **£175**. No comp is bookable for 6-8 Nov. If 6 Nov does not sell today, **7 Nov becomes a 1-night orphan under min 2**. |
| P09 | **Airbnb 1-10 Nov (158710021, £860.60 room) cancelled 5 Nov 09:32:47.** 6-12 Nov open: £110/£130/**£100/£100/£100**/£116/£125 = £781, min 2. Reyhan's 5-12 Nov "fixed" DSO has no price (min 2 only; the -5% is gone). Next 30: 66.7% (was 86.4%). |
| P10 | Data recovered; booked to the 18 Nov handback. |
| P11 | No booking, no edit beyond 23 Dec **+7%** (£294 -> £300, min 2). Smoobu 10-12 Nov £175/£179/£189 vs PriceLabs £189/£199/£212. A comp at £191 sold out for 10-12 Nov. Darts £1,098 (avg £219.60). |
| P12 | **New Booking.com booking 11-13 Dec**, £513.81 (0.837x; 27.3% stack; 15% commission on room + cleaning). Reyhan moved -15% to **-5%** on 12-20 Nov and 30 Nov-12 Dec. Open Dec stays now +10% to +17% vs band median. 26 Nov £316 (P100). Pace30 **-19.9%**. |
| P13 | No booking. Reyhan: 8-12 Nov **-10%** (was -7%), new **7-20 Dec -7%**. 3064856 12 Nov **£163** (below market P25 £173). 3090701 Smoobu 8-11 Nov **£150/£150/£150/£160** vs PriceLabs £173/£173/£176/£181. Christmas 3064856 £4,148 (was £4,211). |
| P14 | Numbers only: 113 of 180 Smoobu nights at £500; 0% vs 44%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | No booking, no edit. 21 Nov fell £293 -> £244 (15-day band); 6 Dec rose £251 -> £298 (Jingle Bell Ball sale). 13-16 Nov P14 (-26.7%), 20-23 Nov P10 (-21%). 18-19 Nov blocked; 20-22 Nov open (t-p20-delivery). |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
| # | Ref / dates | Your decision | Now (5 Nov 10:53-10:57Z) | Evidence | Status |
|---|---|---|---|---|---|
| a | P12 17 Nov | keep +50% (deprioritised) | -5%, min 2, £245 (uncustomized £276) | numbers only | Changed (-15% -> -5%), still off +50% |
| b | P11 darts 13-17 Dec | "above £300"; keep +5% | -5%: £1,098, avg £219.60 | comp-central P14, -45% | Unchanged |
| b2 | P11 10 Nov-18 Dec | standing direction: cut PriceLabs discounts | -5% | `recommend` +5% | Unchanged |
| c | **P13 8-12 Nov** | **0%** (24 Oct) | **-10%** (was -7%), min 2; 3064856 £788 | comp-west: P0 on every stay, comps flat, +31 pts vs market: **evidence supports 0%** | **Gap widened** |
| c2 | **P13 7-20 Dec (new)** | standing direction: cut PriceLabs discounts | **-7%**, min 2 (on top of 21-26 Dec -5% min 3) | market: occupancy +5.6 to +24.6 pts vs STLY, under P50 every night; comp-west `recommend` +10% | **New conflict** |
| d | P20 base | 350 | 330 / 200 | - | Unchanged |
| d2 | P20 16-19 Nov | min 3 to 30 Nov | min 2 on 16-17 Nov | - | Unchanged |
| e | **P04 9-24 Nov** | -8% on 1-25 Nov, min 3 | **-7%**, min 3 (was -15%) | comp-east: November median stay -13% vs comps at -7%, which is the supported -15% quality line. **The comps support -7% to -8%** | **Within 1 pt: accept and record -7%, or restore -8%. Either is supported** |
| f | Jan-Feb min stays | the audit's 5-night rule is **not in `policy.json`** | min 3-4 | - | Unchanged: please confirm |
| g | P13 base 250 | not in policy | 250 | - | Record it |

- **Edits in line with the plan:** P08 5-21 Nov +5% (7 Nov at £193 as asked) and P11 23 Dec +7% (£300 vs target ≥ £317).
- **No conflict:** P12 -15% -> -5% on 12-20 Nov and 30 Nov-12 Dec crosses no standing decision. The comps say the open December nights are now too high (a-p12-trim).
- **Plan reversals still in place:** P06 8-14 Nov -5%, P05 13-19 Dec -7% and 29 Nov-2 Dec -5%, P13 21-26 Dec -5%, P20 21-26 Dec -5%.

### Open plan items: status today
| Item | Status 6 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed, day 7.** The guest arrives today (channel §2; comp-east) |
| t-p06-2pound | **Fixed in Smoobu (£200); kept open as a watch, downgraded to high.** PriceLabs Your Price is still £2 (pricelabs C1; channel §1; comp-central) |
| t-pl-nodata | **Closed: recovered.** All four listings refreshed and pushed (pricelabs C3) |
| a-airbnb-rules | **Not fixed, day 8.** Ratios 0.765 / 0.900 / 0.850 unchanged to the penny (channel §5) |
| a-p05-9nov | Not fixed, 7th check |
| a-handback-lastnights | **P08 7 Nov met** (£193). P08 6 Nov not. The P09 part is superseded by t-p09-cancel |
| t-channel-gaps | **Partly done:** 23 Dec £300 (target £317); 3 Jan £189 (target £204) |
| a-raise-1012nov | **Moved the wrong way:** 3064856 12 Nov £163, min 2. Now part of conflict c |
| a-peak-check | **Moved the wrong way:** P13 7-26 Dec £4,148 (conflict c2). P05 29 Dec £1,351 |
| a-discount-cut | Not done; £1,807 / £997 |
| a-p05-dec, a-p20-conversion, t-p12-26nov-price, t-p04-weekly, a-p05-earlybird | Not done |
| t-p20-delivery | Unchanged: 18-19 Nov blocked, 20-22 Nov open and sold on Airbnb; policy still says 20-22 Nov |
| Others (a-amenities, a-bcom-cancel, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-tidy, a-titles, t-cleaning-commission, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped, t-p06-open) | Unchanged; see JSON |

## Actions - 2026-11-06

**Ranking:** critical channel-safety rows first, then rows that must be decided **before the ~10:34-10:58Z PriceLabs cycle**, then expected £, then rows that cannot be quantified.

**Expected effect** = £ price move on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware).
- Next 30: P04 0.567, P05 0.767, P06 0.312 (ex-blocks), P08 0.75, P09 0.667, P11 0.467, P12 0.633, P13 0.733, P20 0.464.
- Next 60: P05 0.667, P11 0.467, P13 0.50, P20 0.224.
- These are upper bounds; elasticity is not measured.

**Bounds** (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P08 £150-1,000; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 7; guest arrives today).** On 1455876748739910219, **block 6-10 Nov now**, then every open night, or snooze the listing. Then map 1455 to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §2 07:19:49-07:19:55Z: 6-9 Nov £514.20 and 7-10 Nov £517.40 bookable. comp-east: 6-10 Nov £648. Smoobu Airbnb 161888271 6-9 Nov confirmed, arriving today | Protects **£355.72** room; relocation cost not quantified | Corentin | 2026-11-06 |
| 2 | P13 P11 P04 P09 P06 | **NEW t-smoobu-below-pl (decide before ~10:34Z).** Ask Reyhan, and check your own edits: who set these Smoobu rates after the 5 Nov push? 3090701 8-11 Nov £150/150/150/160; P11 10-12 Nov £175/179/189; P04 9-11 Nov £140 x 3; P09 8-10 Nov £100 x 3; P06 8-9 Nov £200/£200. If they were not intended, let PriceLabs overwrite them (Sync Now) so they return to **£173/173/176/181; £189/199/212; £152/153/158; £112/110/109; £213/219**. If intended, say so and I will treat them as overrides. | Smoobu > Rates (3090701, 3064196, 3562176, 3318172, 3288517); PriceLabs > each > Sync Now | pricelabs H1: 15 nights, **£256** below PriceLabs. The values match none of `price`, `user_price` or uncustomized; there is no fixed DSO; mostly round figures. kpi_pack `sync_issues` flags the same nights. comp-west: 3090701 sits below market P25 and became the cheaper twin | (93 x 0.733) + (57 x 0.467) + (43 x 0.567) + (31 x 0.667) + (32 x 0.312) = **£150**. Overlaps rows 3 and 9 | Corentin (ask Reyhan) | 2026-11-06 |
| 3 | P06 | **t-p06-2pound (downgraded to high: watch + fix).** (a) After P06's next PriceLabs cycle (due ~10:34Z; Sync Now if not), read 3288517 9 Nov: Smoobu must show **£219**, not £2, and Your Price must no longer be £2. (b) Set 8-9 Nov to PriceLabs' **£213 / £219** (row 2). (c) If any push writes below the £200 minimum again, set Smoobu 9 Nov to £219 by hand and send PriceLabs support the 4 Nov 12:52:54Z push plus the £2 `user_price`/`booked_price`. Booking.com 8-11 Nov: check the extranet (NOT CHECKED). | PriceLabs 3288517 > Calendar 9 Nov; Smoobu > Rates > Marylebone; Booking.com extranet | pricelabs C1: 9 Nov `price` 219, uncustomized 219, Your Price **£2**; overrides -5% only; no P06 log since 4 Nov 12:52:23Z. Smoobu 07:18Z £200. channel §1: Airbnb 9 Nov = 0.765 x £200; not sold | Guards **£217** (£219 - £2) on 9 Nov if £2 returns. Restoring 8-9 Nov: (£13 + £19) x 0.312 = **£10** (inside row 2) | Corentin | 2026-11-06 |
| 4 | P06 P12 P11 P13 P08 P09 P04 | **NEW t-pl-push-fresh (watch; replaces t-pl-nodata, now closed).** At **11:15Z** read `last_date_pushed` on 3288517, 2699998, 3064196, 3064856, 3090701, 3318167, 3318172, 3562176. Any still dated 5 Nov is past 24 h: press Sync Now and treat it as critical. Decide row 2 first, because this cycle overwrites the Smoobu values. | PriceLabs > each listing | pricelabs C3: last pushes 5 Nov 10:34:00-10:58:01Z; the rest pushed 6 Nov 00:24-05:43Z. PriceLabs has not seen P06 15-21 Nov opening or P12 11-12 Dec booked | Not quantified | Corentin | 2026-11-06 |
| 5 | P06 | **NEW t-p06-1521open (confirm; not a proposal).** Smoobu block 143402691 was shortened 5 Nov 17:31:32 and now starts 22 Nov. 15-21 Nov are open at **£265/264/270/277/295/342/430 = £2,143**, min 2, and Airbnb sells them (15-17 Nov £533.68 card). P06 is an intentional block in policy. **Is this intended?** If yes, record it in `policy.json` and Sync Now so PriceLabs prices the nights as open. If no, re-block 15-21 Nov in Smoobu. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > Sync Now; `policy.json` | pricelabs C2; channel §6; occupancy (P06 +7 sellable nights). Matches Reyhan's 4 Nov min-2 DSO on 15-22 Nov | Not quantified (policy question) | Corentin | 2026-11-06 |
| 6 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 8).** Remove the hidden ≤14-day rule (0.765), the 31-59-day rule (0.900) and the lead-0 rule (0.850) on every apartment and any global rule. Keep only visible discounts (policy `airbnb_visible_discounts`). P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §5: 25 live searches 07:19-07:21Z; ratios unchanged to the penny; P20 0.765 at 14 days. Not shown to guests | Layer-only loss carried **£693.57**; forward 23.5% on every Airbnb night sold 2-14 days out (not quantified) | Corentin | 2026-11-07 |
| 7 | P04 P05 P11 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off"). P04 live: last-minute -5% over 15 days, Aggressive occupancy, Recency default. Aggressive occupancy also on P05, P11, P20 and P13. **P12: see row 13** (its open nights are already above band). | PriceLabs > listing > Customizations | pricelabs H3, next 30: P04 £651 (-24.1%), P11 £426, P12 £407, P05 £342, P20 £223; offsets P13 -£197, P08 -£23, P09 -£22. **£1,807 / £997** | Upper bound excluding P12: 651 x 0.567 + 426 x 0.467 + 342 x 0.767 + 223 x 0.464 - 197 x 0.733 - 23 x 0.75 - 22 x 0.667 = **£758 / 30 days** | Corentin | 2026-11-07 |
| 8 | P13 P04 P12 P11 P20 | **a-p13-record: confirm or restore your settings** (table a-g); record P13 base 250. Not new proposals. **P04: the comps support Reyhan's -7%, so accept and record it, or restore -8%.** | PriceLabs 3064856 (+3090701) DSO 8-12 Nov and 7-20 Dec; 3562176 DSO 9-24 Nov; 2699998 17 Nov; 3064196 DSO; 3547481 base and 16-19 Nov min; then `policy.json` | pricelabs H2; comp-west (P13 P0, supports 0%; Dec `recommend` +10%); market §2 (P13 Christmas +5.6 to +24.6 pts); comp-east (P04 supported -7% to -8%); comp-central (P11 P0-P14) | **Up to about £554/month:** P13 8-12 Nov £788 x (1/0.90 - 1) x 0.733 = £64; P13 7-20 Dec £2,850 x (1/0.93 - 1) x 0.50 = £107; P12 17 Nov (£414 - £245) x 0.633 = £107; P11 darts £1,098 x (1.05/0.95 - 1) x 0.467 = £54; P11 rest £5,106 x (1/0.95 - 1) x 0.467 = £125; P20 base £3,456 x (350/330 - 1) x 0.464 = £97 (approx.). P04 -8% instead of -7%: -£12. Overlaps rows 7 and 11 | Corentin | 2026-11-07 |
| 9 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,171 for the two nights** (P75; now £922) and **13-21 Dec to about £5,813** (P75; now £5,316). Reyhan's 13-19 Dec -7% is a plan reversal: your call. | PriceLabs 3166592 > DSO | market §2: occupancy +8.5 / +2.1 and +2.7 to +10.3 vs STLY. comp-central: P25, -35% to -41% vs medians; `recommend` +25%, **capped at P75** (three comps under 4.3 inflate qp) | (£249 + £497) x 0.667 = **£498** | Corentin | 2026-11-07 |
| 10 | P05 | **a-p05-9nov (7th check).** Clear the Airbnb 9 Nov custom price and the 20% Special offer; check the sync log. To sell the night, replace +300% with **0%, min 1** (uncustomized £353). | Airbnb > 1618929775762183214 > Calendar 9 Nov; PriceLabs 3166592 > DSO 9 Nov | channel §5: £316.80 - £63.36 = **£253.44** room, unchanged since 31 Oct, vs Smoobu £1,383. comp-central: the one open comp asks £320 | Upper bound £353 x 0.767 = **£271**; avoids **-£1,129.56** if it sells as is | Corentin | 2026-11-06 |
| 11 | P13 P05 | **a-peak-check.** 3064856 and 3090701 7-26 Dec to **+5%** (replacing Reyhan's -7% on 7-20 Dec and -5% on 21-26 Dec: conflict c2, your call); **min 2 on 25-26 Dec**. P05 29 Dec **+100% -> 0%, min 1** (about £1,071). | PriceLabs 3064856 / 3090701 / 3166592 > DSO | market §2: 3064856 £4,148 vs P50 £4,870, occupancy +5.6 to +24.6 on all 20 nights. comp-west: 23-26 Dec P14 / P5; 25-26 Dec unsellable (min 3 into booked 27 Dec). P05 29 Dec £1,351 vs P90 £1,076 | +£415 x 0.50 = **£208**; the unlock and the P05 cut are not quantified. Overlaps row 8 | Corentin | 2026-11-07 |
| 12 | P08 | **a-handback-lastnights.** If 6 Nov has not sold by this evening, set **7 Nov min stay 1** (keep £193). 8-14 Nov is booked, so with min 2 the night cannot sell. | PriceLabs 3318167 > DSO 7 Nov (min stay); Smoobu follows | comp-central: no comp bookable for 6-8 Nov or either single night (all taken); `recommend` +10%; handback 13 Nov, so 7 Nov is inventory | Upper bound £193 x 0.75 = **£145** | Corentin | 2026-11-06 |
| 13 | P12 | **NEW a-p12-trim.** DSO **30 Nov-3 Dec and 7-10 Dec: -5% -> -15%** (-10.5% on price: £1,083 -> about £969 and £1,034 -> about £925). Hold 12-14 and 17-21 Nov. This cuts a PriceLabs price, against your standing direction. It is proposed only because the comps support it: **your call.** **Override of `recommend`** (30-day raise +10%), reason below. | PriceLabs 2699998 > DSO | comp-east: 30 Nov-3 Dec +13.4%, 2-4 Dec +14.8%, 7-10 Dec +14.4%, 9-11 Dec +17.3% vs band median (P67-P85); qp **-0.15** (4.27 vs 4.86) gives a supported -15% to 0%. 11-13 Dec sold at about the median. The 30-day `recommend` lead comes from nights already booked; 60-day `recommend` and NL both say hold. Pace30 -19.9% | Not quantified (a cut; price cost £212-£318 if all 8 nights sell; elasticity not measured) | Corentin | 2026-11-09 |
| 14 | P09 | **NEW t-p09-cancel.** (a) Smoobu 8-10 Nov **£100 -> £112 / £110 / £109** (PriceLabs' own price; row 2). Hold 6-7 and 11-12 Nov. No further cut. (b) Check Airbnb > Earnings / Transaction history for reservation 158710021: payout retained, and which nights were stayed. | Smoobu > Rates > Torrent Lodge 3318172; Airbnb host > Reservations / Earnings | comp-east: 2-night stays already band P17-P50 at £136-151 all-in; stored comps P0; `recommend` +10%; qp 0 (3 reviews). market §2b: occupancy above STLY on all six nights. channel §3: Smoobu payout fields are generic | (12 + 10 + 9) x 0.667 = **£21** (inside row 2); payout NOT CHECKED (up to £860.60 room) | Corentin | 2026-11-07 |
| 15 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §5: £396.25 on £2,201.40 = 18.0% (6-19 Dec) | **£66.04** per 6-19 Dec stay | Corentin | 2026-11-07 |
| 16 | P20 | **a-p20-conversion.** **+5% on 13-15 Nov** (DSO -5% -> 0%; supersedes your 24 Oct -5% there, your call). Remove Reyhan's 21-26 Dec -5%. Parking first photo; review requests. | PriceLabs 3547481 > DSO; Airbnb 1791529331262420081 | comp-west: 13-16 Nov P14 / -26.7%; 30-day lead fell to +7 pts, so `recommend` is now +5% (was +10%). December: fix-listing, not price | £678 x 0.05 x 0.464 = **£16**; 21-26 Dec not quantified | Corentin | 2026-11-07 |
| 17 | P11 | **t-channel-gaps.** **23 Dec ≥ £317** (now £300 after Reyhan's +7%; check after the next refresh), **3 Jan ≥ £204** (now £189). Booking.com visibility (CTR 0.81% vs 1.70%). | PriceLabs 3064196 (+Vrbo) > DSO | market §4: fortnight £317 / £204; 3 Jan occupancy +4.7 | (£17 + £15) x 0.467 = **£15** | Corentin | 2026-11-09 |
| 18 | P06 | **t-p06-open.** 10-11 Nov **+5%** (£226/£238 -> about £237/£250), replacing Reyhan's -5% (plan reversal, your call). 8-9 Nov per row 3. | PriceLabs 3288517 > DSO 10-11 Nov | comp-central: Airbnb P0, -23% to -30%; qp -0.036; `recommend(0.50, 0.47, 0, -0.036)` +5% | £23 x 0.312 = **£7** | Corentin | 2026-11-07 |
| 19 | P13 | **a-raise-1012nov (now inside conflict c).** 3064856 **12 Nov ≥ £176, min 1** (now £163, min 2). | PriceLabs 3064856 > DSO 12 Nov | market §2: £163, below P25 £173; comp-west supported level about £178 | £13 x 0.733 = **£10** | Corentin | 2026-11-07 |
| 20 | P12 | **t-p12-26nov-price.** DSO 26 Nov **+15% -> -15%**, keep **min 1**. | PriceLabs 2699998 > DSO 26 Nov | comp-east: £367 all-in, **P100, +29.2%** (n=3); supported £241-284 all-in. Override of flat-level `recommend`: single orphan at P100 | Not quantified | Corentin | 2026-11-09 |
| 21 | P20 | **t-p20-delivery (confirm).** Smoobu 20-22 Nov block cancelled 30 Oct 18:11; 18-20 Nov block created 3 Nov. If delivery moved, update `policy.json`; if not, re-block 20-22 Nov. | Smoobu > Calendar; `policy.json` | channel §9: Airbnb sells 20-23 Nov (£738.28) | Not quantified | Corentin | 2026-11-07 |
| 22 | P11 P12 | **t-cleaning-commission (question).** Booking.com commissions cleaning: **£22.50** on P12 (again on 11-13 Dec), £26.82 on P11. Accept or challenge? | Booking.com extranet > Finance | channel §4: £99.57 = 15% x (£513.81 + £150) | £22.50-£26.82 per booking | Corentin | 2026-11-09 |
| 23 | P05 | **a-p05-earlybird.** Confirm the visible 12% early-booking discount (60+ d) is yours. | Smoobu > Channel Manager > Airbnb > Abbey Rd | channel §5: 4-7 Jan -£100.20 (12.0%) | £100.20 per such stay | Corentin | 2026-11-09 |

## Top 5 for today
1. **Barking:** the 6-9 Nov Airbnb guest arrives today, and the unsynced Airbnb 1455876748739910219 still sells 6-9 and 7-10 Nov (day 7). Block 6-10 Nov on 1455 now (£355.72), then map or unlist it.
2. **Before the ~10:34-10:58Z PriceLabs cycle:**
   - Decide on the 15 Smoobu nights sitting £256 below PriceLabs on 8-12 Nov (P13 3090701, P11, P04, P09, P06). Who set them?
   - Watch P06 9 Nov. Its PriceLabs Your Price is still £2, so confirm Smoobu shows £219 after the push and set 8-9 Nov to £213 / £219.
   - t-pl-nodata is closed. Check push freshness on the eight listings at 11:15Z.
3. **P06 15-21 Nov was opened in Smoobu** (block shortened 5 Nov 17:31) and is selling on Airbnb (£2,143). PriceLabs still shows it blocked. P06 is a policy block: confirm it was intended, or re-block.
4. **P09 1-10 Nov was cancelled mid-stay**, reopening 6-12 Nov at £781. Raise 8-10 Nov from £100 to £112 / £110 / £109; the comps say price is not the barrier. Check the Airbnb payout (NOT CHECKED).
   - P08: if 6 Nov is unsold tonight, set 7 Nov to min 1 (£193).
5. **Your decisions on Reyhan's 5 Nov edits:**
   - P04 -7% is supported by the comps: accept and record it.
   - P13 8-12 Nov -10% (you set 0%) and the new 7-20 Dec -7% go against the comps, which say raise.
   - P12 eased to -5%, so 30 Nov-3 Dec and 7-10 Dec are 10-17% over the median: trim with DSO -15%.
   - Also still open: Airbnb hidden layers (day 8) and P05 9 Nov (7th check).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).** Today 0.850x at lead 0, 0.765x at 2-14 d, 0.900x at 31-33 d and 1.000x at 59-61 d. Target **1.00x before visible discounts by 2026-11-10** (row 6).
- **Booking.com since the 24 Oct markup cut** (channel §7):
  - Gross: 17 bookings / 64 n / £11,563.53 at **0.804x** PriceLabs.
  - Still confirmed: 13 / 51 n / £8,531.60 at **0.778x**.
  - Net: +26 n / +£3,480.23. Pace is 1.02 confirmed bookings a day (about 0.33 before the cut).
  - Promotions stay. The lever is the PriceLabs price under them.
  - KPI: at least 1.0 a day by 2026-11-15.
- **Net to owner per £100 PriceLabs** (channel §8):
  - Booking.com as sold: £63-67 (P12 11-13 Dec £67.47).
  - Airbnb: £64.64 at 2-14 d and £71.83 at lead 0.
  - Models: £97.75 / £84.50. Direct (£90 model) is not the cheapest channel against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 vs 4.86; P13 4.67 / 4.31 vs 4.78.
  - P06 **4.58 (12)** vs 4.67, down from 4.64 after one new review.
  - P08 4.50 (4) vs 4.87; P04 synced 4.11 (9) vs 4.85 (unsynced 4.69 (26)).
  - P05 4.77 vs 4.27; P09 5.0 (3) vs 4.58; P01 4.75 (4) vs 4.71; P20 none vs 4.8.
  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The gap caps P12, the synced P04 and the P13 4.31 twin at -15%.
  - Fixes:
    - P12 pre-arrival key-collection message (the process itself is fixed by policy).
    - P13 4.31 twin: cleanliness and photo accuracy.
    - P06: read the new review.
    - P20 and P09: review requests.
    - Barking: mapping 1455 keeps its 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.**
  - P20: 0 reviews; `recommend` is fix-listing on every December stay (60-day lead -8 pts).
  - P11: Booking.com CTR 0.81% vs 1.70%, while comps sold out for 10-12 Nov.
  - P06: no lift (5 of 12 comps have one); 2nd floor.
- **Gap fill / length of stay.** No open run is shorter than its minimum (occupancy). At-minimum runs: P08 6-7 Nov (row 12), P12 26 Nov, P13 17 / 27 Nov, P05 9 Nov and 16-17 Nov. P13 25-26 Dec is still unsellable (row 11). The P09 6-12 Nov run sells best as one 6-night stay (£623 all-in beats any 2-night pair). Mid-term (91+ nights): NOT CHECKED.
- **Direct share.** 1.47% of room revenue (12 months to 2 Nov; not re-run). Target 5% by 2027-06-30.
- **Event compression** (market §4): **22 n / £315** excluding darts R1; full **27 n / £612** (yesterday 29 n / £607).
  - New today: England v Australia, 8 Nov. Market soft (-12.0); not proposed.
  - The market is clearly ahead of STLY only on P13 Christmas, P05 December, P04 14-19 Dec and P11 3 Jan.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **66.9%** (67.9% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£172.36** (£170.36) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£115.35** (£115.75) | £129 | 2026-12-18 |
| Revenue, last 30 | **£44,986.57** (£45,144.33) | - | - |
| Booked next 30 (Smoobu) | **58.6%** (170/290) | each unit at least market + 10 pts (below: P11 46.7% vs 45%, P06 31.2% vs 47%) | 2026-11-10 |
| Booked next 60 | **47.4%** (228/481) | at least market + 10 pts (P20 22.4% vs 30%) | 2026-11-17 |
| 7-day pickup, net | gross 8 bk / 21 n / £4,493.18; **net +5 n / +£1,857.46** | at least 10 bookings a week, net positive | 2026-11-10 |
| P12 pace30 vs STLY | **-19.9%** (-8 n / -£855.31) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+3 n / +£1,798.65** | positive and rising | 2026-11-09 |
| Booking.com paid / PriceLabs (since cut) | **0.778x** (13 confirmed) | median at least 0.80x | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 0.850x (lead 0)**, day 8 | 1.00x before visible discounts | 2026-11-10 |
| PriceLabs-side gap | **£1,807 next 30; £997 next 14** | £0 apart from your own overrides | 2026-11-07 |
| Listings with no PriceLabs data | **0** (was 4) | 0 | met |
| Listings with a push older than 24 h | **8 at ~11:00Z** unless they refresh | 0 | 2026-11-06 |
| Smoobu open nights below PriceLabs | **15 nights / £256** (8-12 Nov) | 0 unintended | 2026-11-06 |
| Open nights below PL min in Smoobu | **0** (P06 9 Nov now £200; Your Price still £2) | 0 | met; watch |
| Double-sellable Barking stays | **2 stays (6-9, 7-10 Nov) / £355.72**, day 7 | 0 | 2026-11-06 |
| Missed compression | **22 n / £315** excl. darts R1; full 27 n / £612 | under 10 nights | 2026-11-10 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-10; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.27-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who set the 15 Smoobu rates below PriceLabs, and who moved P06 9 Nov from £2 to £200:** UNKNOWN. Smoobu has no rate history over the API. Source: Smoobu > each apartment > Rates change log, or ask Reyhan.
2. **Why PriceLabs produced £2 on P06 9 Nov:** UNKNOWN. Source: PriceLabs > 3288517 > Sync history for 4 Nov 12:52:54Z; PriceLabs support.
3. **P09 158710021:** retained payout and nights actually stayed are NOT CHECKED. Source: Airbnb host > Reservations / Earnings.
4. **Booking.com displayed prices, P06 8-11 and 15-21 Nov, comps and rank:** NOT CHECKED (AWS WAF 07:22:16Z; not bypassed). Source: extranet screenshots.
5. **Listing 1455's own reservations:** NOT CHECKED (not in Smoobu). Source: Airbnb host 551951609 > Reservations.
6. **Smoobu Airbnb rule settings:** still not read; the layers are inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
7. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
8. **Other open questions:**
   - Min-stay rule at 2+ months (5 nights) is not in `policy.json`.
   - P04 recommended base is "Unavailable".
   - P15-P19 need the second-account keys.
   - Vrbo +8% / Direct -10% are unconfirmed; P02 Vrbo copy is stale (24 Feb).
   - P09 25 Apr 2027 is open at £458 after the handback block (question only).

```json
{"scoreboard":{"note":"6 Nov 2026. Last 30 nights = 7 Oct-5 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact; cancelled P09 1-5 Nov already excluded per occupancy.md). Forward figures handback-aware, Smoobu confirmed stays as truth. Pickup = bookings made 31 Oct-6 Nov net of cancellations. Base-rise net on the corrected method only. Booking.com since the 24 Oct markup cut (channel §7). Airbnb ratios from 25 live searches 07:19-07:21Z (channel §5). PriceLabs gap from pricelabs H3. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"66.9%"},{"label":"ADR last 30","value":"£172.36"},{"label":"RevPAR last 30","value":"£115.35"},{"label":"Revenue last 30","value":"£44,986.57"},{"label":"Booked next 30","value":"58.6% (170/290)"},{"label":"Booked next 60","value":"47.4% (228/481)"},{"label":"7-day pickup","value":"gross 8 bk / 21 n / £4,493.18; net +5 n / +£1,857.46"},{"label":"P12 pace30 vs STLY","value":"-19.9% (-8 n / -£855.31)"},{"label":"Raised flats net since 18 Oct","value":"+3 n / +£1,798.65 (was +10 n / +£2,145.44)"},{"label":"Booking.com since markup cut","value":"13 confirmed, 51 n, £8,531.60; 0.778x PriceLabs; net +26 n / +£3,480.23"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at 2-14 d; 0.900x at 31-33 d; 0.850x lead 0; 1.000x at 59-61 d (day 8)"},{"label":"PriceLabs-side gap","value":"£1,807 next 30; £997 next 14"},{"label":"Listings with no PriceLabs data","value":"0 (was 4)"},{"label":"Pushes reaching 24 h today","value":"8 listings at ~10:34-10:58Z"},{"label":"Smoobu below PriceLabs","value":"15 nights / £256 (8-12 Nov)"},{"label":"Double-sellable Barking stays","value":"2 stays / £355.72 (day 7)"},{"label":"Missed compression","value":"22 n / £315 excl. darts R1; full 27 n / £612"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 7): guest for 6-9 Nov (161888271, £355.72) arrives today; unsynced Barking Airbnb 1455876748739910219 still sells 6-9 Nov (£514.20) and 7-10 Nov (£517.40); block 6-10 Nov now, then all open nights; map to 3562176 or unlist","gbp":355.72},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 8, unchanged: remove hidden Smoobu Airbnb layers 0.765 (2-14 d) / 0.900 (31-33 d) / 0.850 (lead 0); P20 0.765 at 14 d; P09 excluded (deprioritised); layer-only loss £693.57","gbp":693.57},
{"id":"t-smoobu-below-pl","status":"open","prop":"P13 P11 P04 P09 P06","priority":"high","title":"New: Smoobu sells 15 nights 8-12 Nov £256 below PriceLabs at values matching no PL series (3090701 150/150/150/160; P11 175/179/189; P04 140x3; P09 100x3; P06 200/200), likely manual Smoobu edits: who set them? Decide before the ~10:34-10:58Z cycle overwrites them","gbp":150},
{"id":"t-p06-2pound","status":"open","prop":"P06","priority":"high","title":"Downgraded: Smoobu 9 Nov now £200 (never sold at £2), but PriceLabs Your Price still £2 with no override or log; watch P06's next push (~10:34Z): Smoobu 9 Nov must read £219; set 8-9 Nov to PL £213/£219; if a push goes below £200 again set £219 by hand and raise with PriceLabs support; Booking.com NOT CHECKED","gbp":217},
{"id":"t-pl-push-fresh","status":"open","prop":"P06 P12 P11 P13 P08 P09 P04","priority":"high","title":"New watch: 8 listings last pushed 5 Nov 10:34-10:58Z (3288517, 2699998, 3064196, 3064856, 3090701, 3318167, 3318172, 3562176); at 11:15Z any still dated 5 Nov is past 24 h: Sync Now (critical)","gbp":null},
{"id":"t-pl-nodata","status":"done","prop":"P01 P06 P09 P10","priority":"critical","title":"Closed: LISTING_NO_DATA recovered; P06 pushed 5 Nov 10:34Z, P09 10:56Z, P01 6 Nov 05:28Z, P10 05:43Z; push freshness now tracked in t-pl-push-fresh","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"New, for Corentin to confirm (policy intentional block): Smoobu block 143402691 shortened 5 Nov 17:31, P06 15-21 Nov open (£2,143, min 2) and selling on Airbnb (15-17 Nov £533.68); PriceLabs still blocked; confirm and record + Sync Now, or re-block","gbp":null},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done: gap £1,807 next 30 / £997 next 14 (P04 still -24.1% vs uncustomized); set Last-minute, Occupancy, Booking Recency to Custom 0%; P12 handled by a-p12-trim (open nights above band)","gbp":758},
{"id":"a-p13-record","status":"open","prop":"P13 P04 P12 P11 P20","priority":"high","title":"For Corentin to confirm: P13 8-12 Nov -10% vs 0% (widened); new P13 7-20 Dec -7% (comps say raise); P04 9-24 Nov -7% vs -8% (comps support: accept and record); P12 17 Nov -5% vs +50%; P11 darts -5% (£1,098) and 10 Nov-18 Dec -5%; P20 base 330 vs 350, 16-17 Nov min 2 vs 3; Jan-Feb min 3-4; record P13 base 250","gbp":554},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Not done: 7-8 Dec £922 -> about £1,171 (P75) and 13-21 Dec £5,316 -> about £5,813 (P75); Reyhan's 13-19 Dec -7% unchanged (your call)","gbp":498},
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"high","title":"Not fixed (7th check): Airbnb sells 9 Nov at £253.44 room (20% Special offer on £316.80) vs Smoobu £1,383: clear the Airbnb date; to sell, DSO 0% min 1 (uncust £353)","gbp":271},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"Not done, moved the wrong way: P13 7-26 Dec £4,148 vs P50 £4,870 (Reyhan 7-20 Dec -7%, 21-26 Dec -5% min 3): +5% on both listings and min 2 on 25-26 Dec; P05 29 Dec £1,351 (+100%) vs P90 £1,076: 0% min 1","gbp":208},
{"id":"a-handback-lastnights","status":"open","prop":"P08","priority":"medium","title":"P08 7 Nov met at £193 (Reyhan +5%); 6 Nov still £175; if 6 Nov unsold tonight set 7 Nov min 1 (8-14 Nov booked; no comp bookable 6-8 Nov). P09 part moved to t-p09-cancel","gbp":145},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"medium","title":"New: after Reyhan's -15% -> -5%, open 30 Nov-3 Dec and 7-10 Dec sit +10% to +17% vs band median (P67-P85, qp -0.15); DSO -5% -> -15% (about £1,083 -> £969, £1,034 -> £925); override of 30-day recommend; cuts a PriceLabs price: Corentin's call","gbp":null},
{"id":"t-p09-cancel","status":"open","prop":"P09","priority":"high","title":"New: Airbnb 1-10 Nov (158710021, £860.60 room) cancelled 5 Nov 09:32 mid-stay; 6-12 Nov open £781 with 8-10 Nov at the £100 floor; comps say price is not the barrier: set Smoobu 8-10 Nov to PL £112/£110/£109, hold the rest; retained payout NOT CHECKED (Airbnb Earnings)","gbp":21},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£66.04 on 6-19 Dec)","gbp":66.04},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Waterford: +5% on 13-15 Nov (P14, -26.7%; recommend now +5% at +7 pts lead; your 24 Oct -5% there: your call); remove Reyhan's 21-26 Dec -5%; December recommend fix-listing (0 reviews)","gbp":16},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Partly done: 23 Dec £300 after Reyhan +7% (target >= £317; check after refresh); 3 Jan £189 (target >= £204); Booking.com visibility CTR 0.81% vs 1.70%","gbp":15},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"P06 8-11 Nov open, Airbnb P0 -23% to -30%: 10-11 Nov +5% (£226/£238 -> about £237/£250) replacing Reyhan's -5% (your call); 8-9 Nov via t-p06-2pound","gbp":7},
{"id":"a-raise-1012nov","status":"open","prop":"P13","priority":"medium","title":"Moved the wrong way: 3064856 12 Nov £163 min 2 (below P25 £173) under Reyhan's -10%; target >= £176 min 1; now part of a-p13-record conflict","gbp":10},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov +15% (£316; £367 all-in, P100 +29.2% vs 1-night comps); set -15%, keep min 1","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Confirm: 20-22 Nov delivery block cancelled 30 Oct 18:11, 18-20 Nov block created 3 Nov; 20-23 Nov selling on Airbnb (£738.28); update policy if delivery moved","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12","priority":"medium","title":"Booking.com commissions cleaning: P12 15% x £150 = £22.50 (again on 11-13 Dec), P11 18% x £149 = £26.82 per booking: accept or challenge?","gbp":null},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early bird (60+ d) still on (£100.20 on 4-7 Jan): not in policy - yours?","gbp":100.20},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -19.9% (-8 n / -£855.31), to handback -23.2%; new Booking.com 11-13 Dec £513.81 at 0.837x; correct open December via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 27 Nov 3064856 £334 (+42% vs P50, above P75) at +50%; 17 Nov +35% (£316/£298 Airbnb vs 2 comps £185): confirm; no trim proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Booking.com cancellations in window (P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec): send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (14 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, pricelabs_other ids); id_map P20 note min 220/base 350 vs PL 200/330; Vrbo copies now fresh (P13/P11 5 Nov, P12 6 Nov); Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps refreshed 6 Nov (P01 one comp inactive, dropped, not replaced); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 sells 6-9 and 7-10 Nov while the synced 6-9 Nov Airbnb guest arrives today (£355.72), day 7; no booking on 1455 visible yet","evidence":"Live cards 07:19:49-07:19:55Z £514.20 / £517.40; comp-east 6-10 Nov £648; Smoobu 161888271."},
{"agent":"pricelabs","severity":"high","ref":"P06","title":"9 Nov £2 gone from Smoobu (now £200) and Airbnb; PriceLabs Your Price still £2 with no override or log; next push could restore it","evidence":"pricelabs C1; channel §1; comp-central; Smoobu 07:18Z; raw prices_3288517.json refreshed 5 Nov 10:33:59Z."},
{"agent":"pricelabs","severity":"high","ref":"P13 P11 P04 P09 P06","title":"Smoobu sells 15 nights 8-12 Nov £256 below PriceLabs at values matching no PL series; likely manual Smoobu edits (cause unknown)","evidence":"pricelabs H1; comp-west (3090701 150/160); comp-central (P11); comp-east (P04/P09); kpi_pack sync_issues."},
{"agent":"pricelabs","severity":"high","ref":"P01 P06 P09 P10","title":"LISTING_NO_DATA recovered; 8 listings last pushed 5 Nov 10:34-10:58Z reach 24 h at ~11:00Z today","evidence":"pricelabs C3; get_listing_data 07:15Z."},
{"agent":"channel","severity":"high","ref":"P06","title":"P06 15-21 Nov opened in Smoobu (block 143402691 shortened 5 Nov 17:31), £2,143, selling on Airbnb; PriceLabs still blocked; policy intentional block","evidence":"channel §6; pricelabs C2; occupancy."},
{"agent":"occupancy","severity":"high","ref":"P09","title":"Airbnb 1-10 Nov cancelled 5 Nov 09:32 mid-stay (£860.60 room); 6-12 Nov reopened at £781; next 30 66.7% (was 86.4%); payout retention NOT CHECKED","evidence":"Smoobu 158710021; occupancy P09 subsection; channel §3."},
{"agent":"comp-east","severity":"high","ref":"P09","title":"P09 2-night stays already at band P17-P50 (£136-151 all-in): price is not the barrier; lift 8-10 Nov from £100 floor to PL £112/£110/£109","evidence":"comp-east Priority 1; market §2b (occ above STLY all six nights)."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"After Reyhan's -15% -> -5%, open 30 Nov-4 Dec and 7-11 Dec at +10% to +17% vs band median (P67-P85) vs supported -15% to 0%; 11-13 Dec sold at about median","evidence":"comp-east Priority 2; qp -0.15."},
{"agent":"comp-west","severity":"high","ref":"P13","title":"Reyhan 8-12 Nov -10% (policy 0%) and new 7-20 Dec -7%: P0 on every 8-12 Nov stay, 12 Nov £163 below P25; Christmas under P50 every night with occ +5.6 to +24.6 vs STLY","evidence":"comp-west; market §2; pricelabs H2."},
{"agent":"channel","severity":"high","ref":"P20 P12 P13 P05 P06 P08 P04","title":"Hidden Airbnb layers unchanged day 8 (0.765 / 0.900 / 0.850 lead 0); P05 9 Nov £253.44 vs £1,383 seventh check","evidence":"25 live searches 07:19-07:21Z (channel §5)."},
{"agent":"comp-central","severity":"medium","ref":"P08","title":"No comp bookable 6-8 Nov; 6 Nov £175 unsold; 7 Nov becomes a 1-night orphan under min 2 if 6 Nov does not sell","evidence":"comp-central P08 section; Smoobu 07:19Z."},
{"agent":"comp-east","severity":"medium","ref":"P04","title":"Reyhan's P04 9-24 Nov -7% (vs standing -8%) puts November at -13% vs median, the supported quality line: comps support -7% to -8%","evidence":"comp-east Priority 3."},
{"agent":"channel","severity":"medium","ref":"P12","title":"P12 Booking.com 11-13 Dec £513.81 = 0.837x PL at booking; stack 27.3% off list; commission 15% on room + cleaning (£22.50 on cleaning)","evidence":"channel §4; supersedes comp-east 19.4%-of-room reading."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £1,807 next 30 / £997 next 14 (was £2,285 / £1,041), fall from Reyhan's DSO edits; P04 still -24.1% vs uncustomized","evidence":"pricelabs H3."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct raised flats: corrected net +3 n / +£1,798.65 (was +10 / +£2,145.44); fall is a pre-rise P09 booking cancelled; hold bases","evidence":"occupancy.md base-rise tracker."},
{"agent":"market","severity":"medium","ref":"P05 P13 P04 P11","title":"Raises still supported: P05 7-8 Dec +£249 and 13-21 Dec +£497 to P75; P13 Christmas +£415; P04 14-19 Dec +£153; missed compression 22 n / £315 excl. darts R1","evidence":"market.md §2, §4."}
],
"top5":[
"Barking: the 6-9 Nov Airbnb guest arrives today and unsynced Airbnb 1455876748739910219 still sells 6-9 and 7-10 Nov (day 7): block 6-10 Nov on 1455 now (£355.72), then map or unlist.",
"Before the ~10:34-10:58Z PriceLabs cycle: decide the 15 Smoobu nights £256 below PriceLabs on 8-12 Nov (P13 3090701, P11, P04, P09, P06; who set them?) and watch P06 9 Nov (Your Price still £2): confirm Smoobu reads £219 after the push, set 8-9 Nov to £213/£219. t-pl-nodata closed; push-freshness check at 11:15Z.",
"P06 15-21 Nov opened in Smoobu (block shortened 5 Nov 17:31) and selling on Airbnb (£2,143) while PriceLabs shows it blocked: policy block, so confirm it was intended or re-block.",
"P09 1-10 Nov cancelled mid-stay: 6-12 Nov reopened at £781; raise 8-10 Nov £100 -> £112/£110/£109 (comps: price is not the barrier); check the Airbnb payout (NOT CHECKED). P08: if 6 Nov unsold tonight, 7 Nov min 1.",
"Your decisions on Reyhan's 5 Nov edits: P04 -7% is supported by comps (accept and record); P13 8-12 Nov -10% (your 0%) and new 7-20 Dec -7% go against comps that say raise; P12 eased to -5% puts 30 Nov-3 Dec / 7-10 Dec 10-17% over median: trim via DSO -15%. Still open: Airbnb hidden layers day 8, P05 9 Nov 7th check."
],
"per_property":[
{"ref":"P01","change":"Data recovered; pushed 6 Nov 05:28Z; nothing open to the 20 Dec handback."},
{"ref":"P02","change":"Intentional block; pushed 00:24Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 03:28Z via Channex."},
{"ref":"P04","change":"No booking; 6-9 Nov Airbnb guest arrives today while 1455 sells 6-9 / 7-10 Nov (day 7); Reyhan 9-24 Nov -15% -> -7% (comps support); Smoobu 9-11 Nov £140 vs PL 152-158; weekly 18%; fwd30 56.7% vs 23%."},
{"ref":"P05","change":"No booking, no edit; 9 Nov Airbnb £253.44 vs Smoobu £1,383 (7th check); 7-8 Dec £922 and 13-21 Dec £5,316 under P75; 29 Dec £1,351; 12% early bird visible; fwd30 76.7% vs 41%."},
{"ref":"P06","change":"9 Nov £2 -> £200 in Smoobu (PL Your Price still £2); 8-9 Nov £200 vs PL £213/£219; 15-21 Nov opened 5 Nov 17:31 and selling on Airbnb (confirm vs policy block); rating 4.58 (12)."},
{"ref":"P07","change":"Intentional block; pushed 04:15Z."},
{"ref":"P08","change":"Reyhan +5%: 7 Nov £193 (target met), 6 Nov £175; no comp bookable 6-8 Nov; 7 Nov becomes an orphan if 6 Nov does not sell; handback 13 Nov."},
{"ref":"P09","change":"Airbnb 1-10 Nov cancelled 5 Nov 09:32 (-£860.60 room, payout NOT CHECKED); 6-12 Nov open £781 with 8-10 Nov at £100 floor; next 30 66.7%; data recovered."},
{"ref":"P10","change":"Data recovered; booked to the 18 Nov handback."},
{"ref":"P11","change":"No booking; 23 Dec +7% (£300); Smoobu 10-12 Nov £175-189 vs PL £189-212; darts £1,098 under -5%; fwd30 46.7% vs 45%."},
{"ref":"P12","change":"New Booking.com 11-13 Dec £513.81 (0.837x, 27.3% stack, 15% on room + cleaning); Reyhan -15% -> -5% puts open Dec stays +10-17% over band; 26 Nov P100; pace30 -19.9%."},
{"ref":"P13","change":"No booking; Reyhan 8-12 Nov -10% and new 7-20 Dec -7% (conflicts); 3064856 12 Nov £163; 3090701 Smoobu 8-11 Nov £150-160 vs PL £173-181; Christmas £4,148."},
{"ref":"P14","change":"Numbers only: 113 of 180 nights at £500; 0% vs 44%."},
{"ref":"P20","change":"No booking, no edit; 21 Nov £293 -> £244 (15-day band), 6 Dec £251 -> £298; 13-16 Nov P14 -26.7%; December recommend fix-listing; delivery block question open."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback; data recovered (occupancy.md; pricelabs C3)."},
{"ref":"P04","base":"220 (rec Unavailable)","recommendation":"Hold 220; get the data on why the PL recommendation is Unavailable","reason":"56.7% vs 23%; November at -7% is -13% vs comps (supported line, qp -0.15); December -11% to +3.5% (comp-east)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides","reason":"76.7% vs 41%; comps P25; qp +0.15; recommend +25% (comp-central)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Only 8-11 Nov (and 15-21 Nov if confirmed) sellable; fix 8-9 Nov values first (pricelabs C1-C2)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"66.7% vs 36% to the 26 Nov handback; reopened 6-12 Nov at band P25-P34; fix 8-10 Nov floor values (comp-east; market §2b)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"46.7% vs 45%; comps P0-P8; recommend +5% = removing Reyhan's -5% (conflict b2) (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open December with dates (a-p12-trim), not the base","reason":"63.3% vs 41%; pace30 -19.9%; open nights band P67-P85 with qp -0.15; handback 13 Dec (comp-east; occupancy.md)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 42%; P0 on every 8-12 Nov stay; recommend +10% (comp-west)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"46.4% vs 36% (30d), 22.4% vs 30% (60d); December recommend fix-listing; 0 reviews (comp-west; pricelabs H2)."}
]}
```

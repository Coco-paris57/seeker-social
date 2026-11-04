# Seeker Estates - Daily revenue report, 2026-11-04 (Wednesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-04/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-04/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-03/daily-report.md` and its JSON, the dashboard action list (4 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Settled, not raised: Visibility Booster commission, 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov (reported only as Reyhan's conflict), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after the handbacks are not inventory: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.** Where Reyhan's PriceLabs edits cross your decisions, I list them for you to confirm. I do not propose them again as new changes.

## Corrections and conflicts resolved between sections

1. **P11 commission: answered, t-p11-commission closed.** comp-central called the 21.9% "above the booster, unexplained". channel.md §2 shows that all three Camden Booking.com bookings since 2 Nov come to exactly **18.000% of room + £149 cleaning**:
   - 20-22 Nov: £104.24 / £579.11
   - 26-29 Nov: £149.29 / £829.40
   - 12-14 Dec: £114.42 / £635.68

   The rate is the Visibility Booster rate (policy). The extra points come from cleaning being commissioned: 18% x £149 = **£26.82 per booking**. I prefer the channel evidence. **What is left is your call:** do you accept Booking.com charging commission on the cleaning fee?
2. **18 Oct base-rise effect: two methods, and the corrected one is right** (occupancy.md).
   - Yesterday's basis: **+5 n / +£936.42**. It deducts bookings that were made after the rise and then cancelled, but never adds them in. That counts P12 4-8 Dec (£1,116.99) and P11 12-14 Dec (£486.68) as pure losses.
   - **Corrected: +11 n / +£2,540.09.** Each of those bookings is counted as made and cancelled, so it nets to zero. **This is the right figure.**
   - P11 is still **-11 n / -£2,355.27** (corrected). Most of that is two cancellations of bookings made before the rise (22 n / £4,687.23).
3. **P11 20-22 Nov is 0.933x PriceLabs, not 0.889x.** occupancy.md still quotes 0.889x in its running line. Yesterday's correction stands (channel.md 3 Nov §2).
4. **Discount gap: smaller headline, lower prices.** The next-30 gap fell from £2,656 to **£2,485**, and the next-14 gap from £1,330 to **£971**. That is not progress:
   - The layers are unchanged.
   - Uncustomized prices fell, nights sold, and P13's pushed price now sits above uncustomized.
   - Open-night prices are lower than yesterday: P04 9-13 Nov £758 (was £859), P20 6-9 Nov £858 (£931), P08 5-7 Nov £539 (£594) (pricelabs.md H2).
5. **P12 26 Nov: the two sections are measuring different things.**
   - market.md calls it "done in substance": £311 against a PriceLabs default of £298.
   - comp-east still has it at **P100, +27.8%** against 1-night comps (£363 all-in, n=3).
   - Both are right on their own basis. I keep it open as a question (action 13).
6. **Airbnb layer boundary.** Today 0.900 was seen at 32-40 days (yesterday's boundary was 28/29). comp-west reads P20 at 0.765 at 16-18 days out. Policy gives P20 a last-minute discount for 0-14 days only, so this is not that discount.
7. **PriceLabs pushed price is not "Your Price" on 32 of 85 open nights in the next 30** (8 of 93 yesterday; pricelabs.md data gap 3). Smoobu follows the pushed `price`.
   - This explains two oddities today: P12 tonight is £302 against a Your Price of £209, and Reyhan's P13 8-12 Nov -7% does not show in the pushed price (160 vs 140 on 8 Nov).
   - The cause is UNKNOWN. **New data action: t-pl-price-divergence.**

## Executive summary

1. **Critical, day 5: Barking.** The unsynced Airbnb listing 1455876748739910219 is still bookable **4-7 Nov (£515.00), 5-8 Nov (£514.20) and 6-9 Nov (£514.20)**.
   - Those nights sit over the Booking.com guest in residence (3-6 Nov, £393.18) and the confirmed Airbnb stay 6-9 Nov (£355.72): **£748.90 at risk**, plus relocation cost.
   - No booking is visible on 1455 yet: every one of those nights still showed as available at 07:18-07:21Z (channel.md §1; comp-east).
2. **Reyhan made 37 PriceLabs edits on 4 Nov 01:24-01:31Z. Seventeen are deeper or new cuts** (pricelabs.md). There are no base, min or max changes.
   - **Seven cross your decisions** (conflict table below).
   - **Five go against yesterday's plan:** P08 -5% instead of +10%; P06 -5% instead of +10%; P05 13-19 Dec -7%; P13 21-26 Dec -5%; P20 21-26 Dec -5%.
   - **Value of restoring your settings: up to about £465 a month** (action 5).
3. **Tonight, P12 Mile End 4 Nov is priced at £302** (Airbnb £382 all-in). That is **P100, +35.5%** against 1-night comps (n=3), on a night PriceLabs labels "Low Demand" (uncustomized £178).
   - The minimum-stay blocker is fixed (min 1) and the sync gap is closed. The price now blocks the sale.
4. **Bookings.** One booking was made on 3 Nov, and one more was made and cancelled the same day:
   - **P11 26-29 Nov, £680.40**, 0.932x PriceLabs. This is P0, -46% against the same-stay comp median (£416.33).
   - P11 12-14 Dec was made and cancelled within about 3 minutes. Both nights have reopened (£321 / £229).
   - P11 is now **48.3% vs 45% market** over the next 30 days (was 41.4% vs 46%).
5. **Airbnb hidden layers are still on, day 6** (0.765 at 28 days or less, 0.900 at 32-40 days, 1.000 at 61+ days).
   - **P05 9 Nov is still wrong on the fifth check** (£253.44 room vs Smoobu £1,411).
   - The monitoring (21 Oct-4 Nov) ends today. **Its result is confirmed as FAILED:** bookings -43%, nights -68%, £ -63% (channel.md §4). t-airbnb-monitoring is marked done.
6. **P20 Waterford: new Smoobu block 18-20 Nov** (created 3 Nov 10:31Z), while **20-22 Nov, the delivery block recorded in policy, is open** and Airbnb sells 20-23 Nov (£835.43 card). Which one is right?

**Last 30 nights (5 Oct-3 Nov, 13 units):** occupancy **67.4%**, ADR **£170.10**, RevPAR **£114.71**, revenue **£44,737.32**. Yesterday: 67.4% / £170.81 / £115.19 / £44,922.70 (kpi_pack `portfolio_last30`).
**Next 30 (5 Nov-3 Dec):** **62.3%** booked (175/281; yesterday 61.5%). **Next 60:** **50.6%** (240/474; unchanged). Smoobu is the truth; handback-aware (occupancy.md).
**7-day pickup (29 Oct-4 Nov):** 9 confirmed bookings / 27 n / £6,196.10, less cancellations: **net +23 n / +£5,624.28** (yesterday +33 n / +£6,754.31; the 28 Oct bookings left the window).

## Base review

No `base_price`, `min_price` or `max_price` change was logged on 3-4 Nov (pricelabs.md). PriceLabs' recommended base moved: P12 273 -> 284, P11 285 -> 283, P05 548 -> 544.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 255 | 100% booked (25/25 non-blocked) to the 20 Dec handback | **Hold; off the agenda** |
| P04 | 220 / Unavailable | 55.2% vs 23% (30d), 52.5% vs 20% (60d). Base +29.4% vs P50 £170, +0.9% vs P75 £218. Comps P0-P50 with qp -0.15; `recommend` +10% | **Hold 220.** Get the data: why the PriceLabs recommendation reads "Unavailable" (PriceLabs > 3562176 > Base price help) |
| P05 | 550 / 544 | 75.9% vs 40%, 67.8% vs 39%. Comps P0/P12/P22, qp +0.15, `recommend` +25%. Base -4.0% vs P50 £573 | **Hold 550; use date overrides** (actions 6, 8) |
| P06 | 357 / 357 | Only 8-11 Nov is sellable; P0, -35%; `recommend` +10% | **Hold** (date question, action 15) |
| P09 | 176 / 176 | 86.4% vs 36%; 3 open nights before the 26 Nov handback | **Hold** |
| P11 | 286 / 283 | 48.3% vs 45% (30d), 49.2% vs 40% (60d). P11/P12/P9 room; `recommend` +5% on both windows | **Hold 286.** The +5% equals Reyhan's -5% on 10 Nov-18 Dec (conflict b2) |
| P12 | 284 / **284** | 65.5% vs 40%; pace30 **-12.1%** (was -8.8%); no booking since 1 Nov. Multi-night stays at band P20-P57, qp -0.15 | **Hold 284.** Recommendation now equals the base. No base cut on top of Reyhan's -15% |
| P13 | 250 / 237 (236) | 72.4% vs 41%; base +12.6% vs P50 £222, -10.4% vs P75 | **Keep 250 and record it in policy** |
| P20 | **330** (your 350) / 347 | 48.1% vs 36% (30d, blocks excluded); 24.6% vs 30% (60d). November comps P0-P40; December -20% to +2%; 0 reviews vs 18 | **Conflict for you: confirm 350 or record 330 / £200 floor.** Not a new proposal |

## What changed since 3 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect
| Group | Made 19 Oct-3 Nov (bk / n / £) | Made 3-18 Oct | After ÷ before, per day (bk / n / £) | Net since the rise |
|---|---|---|---|---|
| **Raised** | 15 / 51 / £10,710.73 | 14 / 98 / £19,226.61 | **1.07x / 0.52x / 0.56x** (was 1.08x / 0.53x / 0.55x) | **Corrected +11 n / +£2,540.09** (yesterday's basis +5 n / +£936.42; was +4 n / +£742.70) |
| Unraised (P02, P08, P10, P14, P20*) | 6 / 29 / £4,717.79 | 7 / 68 / £8,054.83 | 0.86x / 0.43x / 0.59x | +29 n / +£4,717.79 |
| P13 (base 235 -> 250, unrecorded) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.33x / 0.67x / 0.80x | +16 n / +£2,909.76 |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat (corrected net):** P01 +3 n / +£720.90; P05 +6 / +£1,953.04; P06 +6 / +£1,345.77; P09 +2 / +£253.21 (no booking since 23 Oct); **P11 -11 / -£2,355.27**; P12 +5 / +£622.44.
- **Reading:**
  - Bookings per day are level in the raised group. Nights and £ per day fell by a similar share in both groups.
  - Both new P11 bookings sold on dates carrying Reyhan's -5%, at P0 against comps. They are no evidence that the base is too high.
  - Reyhan's new overrides on P05, P06, P11 and P12 blur the raised group further.
- **Conclusion: still no evidence that the rises cost demand. Hold the bases.**

### Per property
| Ref | Change since 3 Nov |
|---|---|
| P01 | No change. Sold to the 20 Dec handback; self-pushed 05:46Z. |
| P02 / P03 / P07 | Intentional blocks. P02 Vrbo copy last pushed 24 Feb 2026. |
| P04 | No booking. **1455 still double-sells 4-9 Nov (day 5).** **Reyhan: -15% on 9-24 Nov** (vs your -8%); 9-13 Nov £758 (was £859). Comps P0-P50, -13% to -28% vs median. Jan -10% min 3, Feb -10% min 4. Weekly 18% vs 15% still. Fwd30 55.2% vs 23%. PL recommended base "Unavailable". |
| P05 | No booking. **Reyhan: 13-19 Dec -7%** (was -5%); Feb -5% min 4. 9 Nov Airbnb still £253.44 vs Smoobu £1,411 (5th check). 29 Dec £1,277 (default £1,039, P90 £1,091). December 33-51% under comp medians. Fwd30 75.9% vs 40%. |
| P06 | **Reyhan: -5% on 8-14 Nov.** 8-11 Nov £956 (was £987); P0, -35%. Intentional-block flat. |
| P08 | **Reyhan: -5% on 4-21 Nov** (plan said +10%). 5-7 Nov £168 / £186 / £185 = £539; P0, -52% (n=1). Handback 13 Nov. |
| P09 | No edit. **Pushed 4 Nov 07:27:40Z, 23 h 50 m after the last push.** The slot keeps moving earlier (07:53Z, 07:37Z, 07:27Z). Smoobu held £100 / £110 on 10-11 Nov (cause UNKNOWN) until that push; now £113 / £122 / £129 = £364. P0, -16.9% vs comps, the cheapest in its set. |
| P10 | No change. Sold to the 18 Nov handback. |
| P11 | **New 26-29 Nov £680.40 (0.932x; P0, -46%).** 12-14 Dec made and cancelled; reopened at £321 / £229. Reyhan: 23 Dec +5% min 3 and 24-25 Dec +7%, yet prices fell to £298 / £290 / £302 (default fell). 22-25 Nov rose 12-13% (algorithm). Commission explained (18% on room + cleaning). Fwd30 48.3% vs 45%. |
| P12 | No booking since 1 Nov; pace30 -12.1%. **Reyhan:** 4 Nov +15% min 1 (**£302**, P100); 12-13 Nov -10%; 16-25 Nov and 27 Nov-13 Dec **-15%**; 26 Nov +25% -> +15% (£311). 3 Nov lapsed unsold. 4 Nov sync gap closed. |
| P13 | No booking; 3 Nov lapsed unsold (about £124). **Reyhan: 8-12 Nov -7%** (vs your 0%), **21-26 Dec -5% min 3**, Jan -10% min 3, Feb -10% (no min). Pushed 8-12 Nov rose anyway (3064856 £160-£170) because the pushed price now sits above Your Price. 12 Nov £170, min 2. Twins now 4-7% apart in December, but identical in January. |
| P14 | Numbers only: 73.3% of open nights at the £500 minimum; 0% vs 42%; P100 vs comps. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **New Smoobu block 18-20 Nov**; 20-22 Nov open. **Reyhan:** 16-19 Nov -5% **min 2** (vs policy min 3); **21-26 Dec -5%**; Jan -10% min 3; Feb -7% min 4. Base 330. 6-9 Nov P0 (-41%), 13-16 Nov P12 (-29%). Fwd30 48.1% vs 36%. |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
| # | Ref / dates | Your decision | Now (live, 4 Nov) | Status |
|---|---|---|---|---|
| a | P12 17 Nov | keep +50% (deprioritised) | **-15%**, min 2, £218 (uncust £277) | **Worse** (-10% -> -15%) |
| b | P11 darts 13-17 Dec | "above £300"; keep +5% | -5%: £1,094, average £218.80 | Unchanged since 2 Nov |
| b2 | P11 10 Nov-18 Dec (rest) | standing direction: cut PriceLabs discounts | -5% | Unchanged; comps P0-P20, `recommend` +5% |
| c | P13 8-12 Nov | 0% (24 Oct) | **-7%**, min 2 | **Worse** (-5% -> -7%) |
| d | P20 base | 350 | 330 / 200 | Open |
| d2 | P20 16-19 Nov | min stay 3 to 30 Nov | -5% (matches your -5%), **min 2** | Min still against policy; 18-19 Nov now blocked |
| e | P04 9-24 Nov | -8% on 1-25 Nov, min 3 | **-15%**, min 3 | **Worse** (-10% -> -15%) |
| f | Jan-Feb 2027 min stays (P04, P13, P20 Jan min 3; P04, P20, P05 Feb min 4; P13 Feb no min) | the audit rule says 5 nights at 2+ months (pricelabs.md M2). **This is not in `policy.json`: please confirm which rule applies** | min 3-4 | New |
| g | P13 base 250 | not in policy | 250 | Record it |

**Against yesterday's plan (not standing decisions; evidence attached):**
- **P08 5-7 Nov -5%** (plan +10%). P0, -52%, n=1.
- **P06 8-14 Nov -5%** (plan +10%). P0, -35%.
- **P05 13-19 Dec -7%** (plan P75). Gap to P75 is now +£592.
- **P13 21-26 Dec -5%** (plan +7%). 23-26 Dec is at P13 / P4 of the wider sample (comp-west).
- **P20 21-26 Dec -5%** (plan hold). Already -19% / -20% vs comps (comp-west).

### Open plan items: status today
| Item | Status 4 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed, day 5** (channel.md §1; comp-east) |
| a-airbnb-rules | **Not fixed, day 6** (channel.md §3) |
| t-airbnb-monitoring | **Done.** The final confirmation (channel.md §4) matches the 3 Nov close: FAILED. The policy monitoring period ends today |
| t-p12-4nov | **Done.** Min 1 set (Reyhan 01:24:03Z); Smoobu = PriceLabs = £302. The price is a new item (t-p12-4nov-price) |
| t-p13-3nov | **Expired, closed.** 3 Nov passed unsold (about £124) |
| t-push-check | **Narrowed to P09.** P12 gap closed; P11 now sees both new bookings; P09 pushed 07:27:40Z, 10 min inside 24 h |
| t-p11-commission | **Done (answered):** 18% booster on room + cleaning. Your call on cleaning commission (£26.82 per booking) |
| t-p12-26nov-price | **Partly:** +25% -> +15% (£311); still P100 vs 1-night comps |
| a-p05-9nov | **Not fixed, 5th check** |
| a-discount-cut | Layers unchanged; gap £2,485 / £971 |
| a-raise-1012nov, a-peak-check, a-p05-dec, a-p04-dec | **Still open.** P13 Christmas and P05 December moved the wrong way (Reyhan) |
| a-handback-lastnights | **Wrong way** (P08 -5%); P09 not raised |
| t-p20-delivery | **Changed, not as recorded:** 18-20 Nov blocked, 20-22 Nov open |
| t-channel-gaps | 26 Nov moot (booked at £208); 23 Dec £298 and 3 Jan £188, both further below target |
| a-p13-twin | December gap now 4-7% (not from an override); January identical |
| Others (a-amenities, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped, a-p13-orphan-price, a-p05-earlybird, t-p04-weekly, t-p06-open) | Unchanged; details in the actions or the JSON |

## Actions - 2026-11-04

**Ranking:** critical channel-safety and same-day rows first, then expected £ over the next 30-60 days, then rows that cannot be quantified.

**Expected effect** = price move in £ on open nights x the flat's booked share. The booked share is kpi_pack `forward_occ_30`: P04 0.552, P05 0.759, P06 0.60 (ex-blocks), P08 0.667, P09 0.864, P11 0.483, P12 0.655, P13 0.724, P20 0.448. For December I use `_60`: P04 0.525, P05 0.678, P11 0.492, P13 0.525. These are upper bounds; elasticity is not measured.

**Bounds** (kpi_pack): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P08 £150-1,000; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every price below is inside them.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 5, guest in residence).** On 1455876748739910219, **block the nights 4-8 Nov now**. Then block 9-13 Nov, 18-24 Nov and 6-19 Dec, or snooze the listing. Then map 1455 to Smoobu 3562176 (keeps its 4.69 (26) reviews) or unlist it. | Airbnb host 551951609 > listing 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel.md §1 (07:18:51Z-07:21:34Z): 4-7 Nov £515.00, 5-8 Nov £514.20 and 6-9 Nov £514.20 bookable on 1455. They sit over Smoobu Booking.com 161785771 (3-6 Nov, in residence, £393.18) and Airbnb 161888271 (6-9 Nov, £355.72). comp-east confirms | Protects **£748.90** (393.18 + 355.72). Relocation cost not quantified | Corentin | 2026-11-04 |
| 2 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 6).** On every apartment and any global rule, remove the 28-days-or-less rule (0.765) and the hidden 0.900 rule (seen at 32-40 days). Keep only visible Airbnb discounts (policy `airbnb_visible_discounts`). Then update `policy.json` monitoring to "closed 4 Nov, failed". | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel.md §3: 26 live searches, 07:18-07:21Z. Every synced card is 0.765 at 28 days or less, 0.900 at 32-40 days and 1.000 at 61+ days. P20 is 0.765 at 16-18 days, outside its 0-14-day policy discount (comp-west). Monitoring final: -43% / -68% / -63% (§4) | Layer-only loss so far **£693.57** (carried from 3 Nov). Forward: 23.5% of every Airbnb night sold 28 days out or less. Not quantified | Corentin | 2026-11-05 |
| 3 | P12 | **New, t-p12-4nov-price (lapses tonight).** Replace the 4 Nov DSO **+15% with 0%, keeping min 1** (uncustomized £178; about £286 all-in on Airbnb at 0.765 + £150). Also find what lifts Your Price £209 to the pushed £302. | PriceLabs 2699998 > DSO 4 Nov; calendar 4 Nov | pricelabs.md T2: pushed £302, user_price £209, uncustomized £178, "Low Demand". comp-east: £382 all-in = **P100, +35.5%** vs 1-night band 238 / 282 / 285. The supported level is -15% to 0% vs the £282 median (qp -0.15). **Override of `recommend`** (+10% on the flat's 30-day lead): this is a same-day 1-night orphan at P100 | Upper bound £178 x 0.655 = **£117**, only if it sells tonight | Corentin | 2026-11-04 |
| 4 | P04 P05 P09 P11 P12 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** explicitly. Still active: last-minute P04 -5%, P05 -1%, **P09 -18%**; Aggressive occupancy on P04, P05, P11, P20 and P13; Booking Recency default on all except P09. | PriceLabs > listing > Customizations | pricelabs.md H2, 4 Nov-3 Dec, uncustomized minus final: P12 £663, P04 £749, P20 £517, P11 £486, P05 £387, P09 £26; P13 -£183 / -£17 and P08 -£19 offset. Next 30 **£2,485**, next 14 **£971** | Upper bound **about £1,473 per 30 days**: 663x0.655 + 749x0.552 + 517x0.448 + 486x0.483 + 387x0.759 + 26x0.864 - 183x0.724 - 17x0.724 - 19x0.667. Includes Reyhan's DSOs (overlaps row 5) | Corentin | 2026-11-06 |
| 5 | P12 P11 P13 P20 P04 | **a-p13-record: confirm or restore your settings** (conflict table a-g; plus the five plan reversals). These are not new proposals. Also record P13 base 250. | PriceLabs 2699998 DSO 16-25 Nov; 3064196 (+Vrbo) DSO 10 Nov-18 Dec; 3064856 (+children) DSO 8-12 Nov; 3547481 Base and DSO 16-19 Nov; 3562176 DSO 9-24 Nov; Jan-Feb DSOs; then `policy.json` | pricelabs.md H1, M2; comp-east (P04 -13% to -28%); comp-west (P13 comps support 0%); comp-central (P11 P0-P20, darts -46%); market.md §5 | **Up to about £465/month:** P04 £1,960 x (0.92/0.85 - 1) = £161 x 0.552 = £89; P12 17 Nov (277 x 1.5 - 218) = £198 x 0.655 = £129; P11 darts (£1,239 - £1,094) = £145 x 0.492 = £71; P11 rest £3,132 x (1/0.95 - 1) = £165 x 0.483 = £80; P20 base £3,507 x (350/330 - 1) = £213 x 0.448 = £95. P13 8-12 Nov not quantified (the -7% is not in the pushed price). Overlaps row 4 | Corentin | 2026-11-05 |
| 6 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,183 for the two nights** (P75). DSO **13-21 Dec to about P75 £5,866** total. This replaces Reyhan's -7% on 13-19 Dec, which is a plan reversal for you to decide. | PriceLabs 3166592 > DSO 7-8 Dec, 13-21 Dec | market.md §2: 7-8 Dec £933 vs P75 £1,183 (market +10.6 / +6.3 pts vs STLY); 13-21 Dec £5,274 vs P75 £5,866 (all 9 nights up vs STLY). comp-central: P12 / P22, `recommend` +25%, 33-51% under the medians. **Capped at P75** (below +25%) because 3 of 6 comps are rated under 4.3 | (£250 + £592) x 0.678 = **£571** | Corentin | 2026-11-06 |
| 7 | P05 | **a-p05-9nov (5th check).** (1) On Airbnb, clear the 9 Nov custom price and Special offer, and check the sync log. (2) To sell the night, replace +300% with **0%, min 1**. For a soft block, close it in Smoobu. | Airbnb > 1618929775762183214 > Calendar 9 Nov; Smoobu > Channel Manager > Airbnb sync log; PriceLabs 3166592 > DSO 9 Nov | channel.md §3: £316.80 less 20% Special offer gives a room of **£253.44**, identical for 5 checks, vs Smoobu £1,411 (P05 pushed 01:28:33Z). comp-central control: 29 Dec flows correctly | Upper bound **£313** (3 Nov basis: £412 uncustomized x 0.759; not re-read today) | Corentin | 2026-11-05 |
| 8 | P13 P05 | **a-peak-check.** P13 7-26 Dec: replace **-5% with +5%** (about +10% on today's price) on 3064856 and 3090701, and **min 2 on 25-26 Dec**. Keep 3090701 slightly dearer (today 4-7%, but not set by an override: see a-p13-twin). P05 29 Dec: replace +100% with **0%, min 1** (about £1,039). | PriceLabs 3064856 / 3090701 > DSO 7-26 Dec; 3166592 > DSO 29 Dec | market.md §2: P13 3064856 £4,221 vs P50 £4,943; market +5.5 to +24.9 pts vs STLY on every night. comp-west: 23-26 Dec P13 / P4 of the wider sample, `recommend` +10%. 25-26 Dec cannot sell (min 3 runs into the booked 27 Dec). P05 29 Dec £1,277 vs P90 £1,091 | P13 +£422 x 0.525 = **£222**; 25-26 Dec unlock and the P05 cut not quantified | Corentin | 2026-11-06 |
| 9 | P20 | **a-p20-conversion.** **+10% on 6-9 Nov** (£858 to about £944) **and 13-15 Nov** (£689 to about £758): DSO from -5% to +5% on those dates. This supersedes your own 24 Oct -5% there, so it is your call. Remove Reyhan's **21-26 Dec -5%** (back to hold). Fix conversion: parking in the first photo, review requests. | PriceLabs 3547481 > DSO 6-9, 13-15 Nov, 21-26 Dec; Airbnb 1791529331262420081 | comp-west: 6-9 Nov **P0, -40.6%**; 13-16 Nov **P12, -28.7%**; `recommend` +10% (lead +10.7 pts); supported up to about £300 / £270 all-in. Caveat: 6-9 Nov is 2 days out, only 5 of 12 comps bookable, PL already at market P50. December -19% / -20% vs comps on 21-27 Dec | (£86 + £69) x 0.448 = **£69**. The 21-26 Dec removal is not quantified | Corentin | 2026-11-05 |
| 10 | P04 | **a-p04-dec.** DSO **14-19 Dec 0%** in place of -10% (about £1,270 for 6 n). | PriceLabs 3562176 > DSO 14-19 Dec | market.md §2: £1,143 vs P75 £1,300 / default £1,346; market +1.6 to +4.0 pts vs STLY; Horse Show 17-21 Dec. comp-east: 14-17 Dec P0, -17.8% (below the -15% quality line), `recommend` +10% (60d P0). Caveat: comp n is 1-4, and comp-east supports only +2-3% on 9-12 / 14-17 Dec. The 8 Dec part is dropped (market occupancy -1.9) | £127 x 0.525 = **£67** | Corentin | 2026-11-06 |
| 11 | P08 P09 | **a-handback-lastnights.** **+10%** on P08 5-7 Nov (£539 to about £593; replaces Reyhan's -5%) and P09 10-12 Nov (£364 to about £400; replaces the -5% DSO). | PriceLabs 3318167 > DSO 5-7 Nov; 3318172 > DSO 10-12 Nov | comp-central: P08 P0, -52% (n=1), `recommend` +10%. comp-east: P09 **P0, -16.9%** vs £172 (n=4), the cheapest in its set; qp 0 (3 reviews); `recommend` +10% (comp-east supports +15-20% to parity; I keep the rule's +10%) | £54 x 0.667 + £36 x 0.864 = **£67** | Corentin | 2026-11-04 |
| 12 | P04 | **t-p04-weekly.** Set the synced Barking Airbnb weekly discount to **15%** (policy), from 18%. | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts (or the Smoobu rule for 3562176) | channel.md §7: 6-19 Dec weekly £393.98 / £2,188.80 = 18.0% | **£65.66** per 6-19 Dec stay | Corentin | 2026-11-06 |
| 13 | P06 | **t-p06-open (question).** Is 8-11 Nov meant to sell? If yes, the rule says **+10%** (about £1,052 vs £956), replacing Reyhan's -5%. | Smoobu > Calendar P06; PriceLabs 3288517 > DSO 8-11 Nov | comp-central: P0, -35%; `recommend(0.60, 0.47, 0.0, -0.024)` = +10%. Policy lists P06 as an intentional block, so this is a question first | £96 x 0.60 = **£57** | Corentin | 2026-11-05 |
| 14 | P11 | **t-channel-gaps.** **23 Dec at least £311**, **3 Jan at least £203**. Fix Booking.com visibility. | PriceLabs 3064196 (+Vrbo) > DSO 23 Dec, 3 Jan; Booking.com extranet > Camden | market.md §4/§5: 23 Dec £298 vs fortnight £311; 3 Jan £188 vs £203. 26 Nov booked (moot). Policy: CTR 0.81% vs 1.70% | (£13 + £15) x 0.492 = **£14**. Visibility not quantified | Corentin | 2026-11-06 |
| 15 | P13 | **a-raise-1012nov.** 3064856 **12 Nov £176, min 1**. Keep 3090701 at or above £183 (today £191). | PriceLabs 3064856 > DSO 12 Nov | market.md §2: £170 vs P25 £176 / P50 £212; England v Croatia sold out. comp-west: evidence level about £180; min 2 with 13 Nov booked means it only sells as part of 11-13 Nov | (£176 - £170) x 0.724 = **£4**. The min-1 unlock is not quantified | Corentin | 2026-11-05 |
| 16 | P20 | **t-p20-delivery (question).** Which is right: the new Smoobu block **18-20 Nov** (162432556, created 3 Nov 10:31Z) or policy's **20-22 Nov** delivery block (cancelled 30 Oct)? If delivery is 20-22 Nov, re-block it and release 18-19 Nov. If it is 18-20 Nov, update `policy.json`. | Smoobu > Calendar P20 | occupancy.md; channel.md §7: 20-22 Nov open at £300 / £305 / £291, min 3; Airbnb sells 20-23 Nov at £835.43 card. pricelabs.md M1 | Not quantified | Corentin | 2026-11-05 |
| 17 | P12 | **t-p12-26nov-price (question, partly done).** 26 Nov is now +15% (£311). To sit at the 1-night market, set **0%** (about £298), keeping min 1. | PriceLabs 2699998 > DSO 26 Nov | comp-east: £363 all-in, **P100, +27.8%** vs 213 / 284 / 297 (n=3). market.md: £311 vs default £298, P90 £331. **Override:** `recommend` gives +10% on the flat-level lead, but this is a single orphan night at P100 | Not quantified | Corentin | 2026-11-06 |
| 18 | P09 | **t-push-check (P09).** Re-read P09 `last_date_pushed` tomorrow before 07:27Z. If there is no push, raise a push failure with PriceLabs support. Find who set Smoobu £100 / £110 on 10-11 Nov. | PriceLabs > 3318172 > Sync history; Smoobu > Rates > Torrent Lodge change history | pricelabs.md T1: pushes 2 Nov 07:53Z, 3 Nov 07:37Z, 4 Nov 07:27:40Z (23 h 50 m), never without an edit; the -£15 gap closed only by that push | Not quantified (the gap is closed) | Corentin | 2026-11-05 |
| 19 | P05 | **a-p05-earlybird.** Confirm the visible 12% early-booking discount (60+ days) is yours. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel.md §3: 4-7 Jan card -£151.92 (12.0%). Policy records an early bird for P13 only | £151.92 per such stay; forward not quantified | Corentin | 2026-11-06 |

## Top 5 for today
1. **Barking (day 5, guest in residence):** block 4-8 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 of confirmed stays can be double-sold). Then block every open night and map 1455 to Smoobu 3562176, or unlist it.
2. **P12 tonight:** £302 (£382 all-in) is P100, +35.5% vs 1-night comps, on a Low Demand night. Set 4 Nov to 0%, min 1 (about £178). Also find why the pushed price is £302 against Your Price £209.
3. **Confirm Reyhan's 4 Nov edits against your decisions (up to about £465 a month):**
   - P04 -15% vs your -8%;
   - P13 8-12 Nov -7% vs 0%;
   - P12 17 Nov -15%;
   - P20 16-19 Nov min 2 vs 3, and base 330 vs 350;
   - P11 darts -5%;
   - Jan-Feb min 3-4 vs the audit's 5.

   Also decide on the plan reversals: P08 -5% instead of +10%, P06 -5%, P05 13-19 Dec -7%, P13 21-26 Dec -5%, P20 21-26 Dec -5%.
4. **Airbnb:** remove the hidden Smoobu 0.765 / 0.900 rules (day 6; monitoring closed FAILED). Clear P05 9 Nov (£253.44 vs £1,411, 5th check). PriceLabs-side gap: £2,485 next 30 / £971 next 14. Set the layers to Custom 0%.
5. **Questions and market raises:**
   - P20: is the delivery block 18-20 Nov (new) or 20-22 Nov (policy, open and selling)?
   - P11 commission is answered: 18% on room + cleaning. Do you accept £26.82 per booking on cleaning?
   - Raises: P05 December to P75 (£571); P13 Christmas +10% with min 2 on 25-26 Dec (£222); P04 14-19 Dec to 0% (£67); P13 12 Nov £176 min 1; P20 6-9 Nov / 13-15 Nov +10% (£69).

## Growth plays

- **Airbnb net rate (KPI: Airbnb room ÷ Smoobu rate).** Today 0.765x at 28 days or less, 0.900x at 32-40 days, 1.000x at 61+ days. Target **1.00x before visible discounts by 2026-11-10** (action 2). After the change, re-measure Airbnb volume over 14 days against the -43% baseline.
- **Booking.com since the markup cut** (channel.md §5): 12 bookings still confirmed, 50 n, £8,412.44 at **0.784x** PriceLabs; net **+25 n / +£3,361.07**.
  - Pace was 1.1 confirmed bookings a day, but only 4 in the last 5 days.
  - The promotions stay, per your direction. The lever is the PriceLabs price under them: both P11 November sales landed at P0 against comps.
  - KPI: at least 1.0 booking a day by 2026-11-15.
- **Net to owner:** the P11 26-29 Nov sale netted **£72.75 per £100 of PriceLabs price** (0.932x, with 18% commission on room + cleaning), against the Booking.com model's £97.75 (channel.md §6). That gap is a cost of the cleaning-commission question.
- **Review score** (Airbnb, ours vs comp median; today's comp sections):
  - P12 4.27 vs 4.86; P13 4.67 / 4.31 vs 4.78; P08 4.33 vs 4.87; P06 4.60 vs 4.66; P04 synced 4.11 (9) vs 4.83 (unsynced 4.69 (26)); P05 4.77 vs 4.27; P09 5.0 (3) vs 4.58; P20 none vs 4.80 (18).
  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The gap caps P12, P04 synced, P08 and the P13 4.31 twin at -15% (`quality_premium`).
  - Fixes:
    - P12: the arrival message on key collection (the process itself is fixed by policy).
    - P13 4.31 twin: cleanliness and photo accuracy.
    - P20 and P09: review requests.
    - Barking: mapping 1455 keeps its 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.**
  - P20: 0 reviews vs 18, and P0-P12 on early November while PL sits at market P50, so visibility is part of the gap.
  - P11: basement with patio; 4 of 12 comps have a lift (comp-central). Booking.com CTR is 0.81% vs 1.70%.
  - Free amenity fixes (a-amenities).
- **Gap fill / length of stay.**
  - Today: P12 4 Nov is open at min 1 but priced at P100.
  - Lapsed: P13 3 Nov (about £124) and P12 3 Nov.
  - Still blocked: P13 25-26 Dec (min 3); P13 12 Nov (min 2).
  - Short runs: P12 12-13 Nov and 30 Nov-2 Dec; P11 18-19 Nov (P0, -46%); P05 16-17 Nov and 7-8 Dec (pricelabs.md M3).
  - Mid-term (91+ nights): 0 in `reservations.csv` (3 Nov basis; not re-run).
- **Direct share.** **1.47%** of room revenue (12 months to 2 Nov, from the 3 Nov report; not re-run today). Direct nets £90 per £100 (model, unconfirmed), yet Airbnb at 28 days or less sells at £76.50 (channel.md §6). Target 5% by 2027-06-30.
- **Event compression** (market.md §4).
  - Excluding darts R1: **21 n / £281** (3 Nov 23 / £211).
  - Full set: 26 n / £577.
  - The rise comes from Reyhan's cuts. The P04 November gaps rest on the fortnight rule against a market 3-14 pts below STLY, so they are not proposed. The only verified events where the market is clearly ahead of STLY (P11 11-12 Dec, P20 31 Dec) are already priced; the P13 Christmas holiday is the exception (action 8).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **67.4%** (67.4% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£170.10** (£170.81) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£114.71** (£115.19) | £129 | 2026-12-18 |
| Revenue, last 30 | **£44,737.32** (£44,922.70) | - | - |
| Booked next 30 (Smoobu) | **62.3%** (175/281; 61.5%) | each unit at least market + 10 pts (below today: P11 48.3% vs 45%) | 2026-11-10 |
| Booked next 60 | **50.6%** (240/474) | at least market + 10 pts (P20 24.6% vs 30%) | 2026-11-17 |
| 7-day pickup, net | 9 bk / 27 n / £6,196.10; **net +23 n / +£5,624.28** | at least 10 bookings a week, net positive | 2026-11-10 |
| 18 Oct raised flats, net since the rise | **+11 n / +£2,540.09 corrected** (+5 n / +£936.42 on yesterday's basis); P11 -11 n | positive and rising | 2026-11-09 |
| Booking.com paid ÷ PriceLabs (since the cut) | **0.784x** (12 confirmed); latest 0.932x | median at least 0.80x | 2026-11-15 |
| Airbnb room ÷ Smoobu rate | **0.765x (28 d or less) / 0.900x (32-40 d) / 1.000x (61+ d)**, day 6 | 1.00x before visible discounts | 2026-11-10 |
| PriceLabs-side gap | **£2,485 next 30; £971 next 14** (£2,656 / £1,330 yesterday) | £0 apart from your own overrides | 2026-11-06 |
| Double-sellable Barking stays | **2 stays / £748.90, guest in residence** (day 5) | 0 | 2026-11-04 |
| Missed compression | **21 n / £281** excl. darts R1; full 26 n / £577 | under 10 nights | 2026-11-10 |
| RGI | **UNKNOWN** (no comp occupancy; comps.csv not priced into kpi_pack) | above 1.10 on every property | data by 2026-11-10; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.27-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (12 months to 2 Nov; not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Pushed `price` vs Your Price (`user_price`)** differ on 32 of 85 open nights in the next 30 (t-pl-price-divergence). Source: PriceLabs > listing calendar > price breakdown on 2699998 4 Nov and 3064856 8 Nov; ask PriceLabs support.
2. **Smoobu Airbnb rule settings** are still not read on any apartment; the layers are inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
3. **P05 9 Nov:** why Airbnb prices on £316.80 with a 20% Special offer. Source: Airbnb calendar 1618929775762183214; Smoobu sync log.
4. **Listing 1455's own reservations** cannot be seen (not in Smoobu). Source: Airbnb host 551951609 > Reservations.
5. **Booking.com:** displayed prices, comps and rank are NOT CHECKED (AWS WAF challenge at 07:22:40Z; not circumvented). Source: extranet screenshots.
6. **RGI** needs comp occupancy. Source: PriceLabs Competitor Listings / Market Dashboard (not enabled). STLY exists only for P12.
7. **Windows:** raw PriceLabs covers 5 Nov-3 Jan only, so Jan-Feb DSO prices and the 180-day floor/ceiling are NOT CHECKED. P11 23-25 Dec DSO values before 01:25Z are NOT CHECKED.
8. **P09 Smoobu £100 / £110 on 10-11 Nov:** who set them. P20 18-20 Nov block: who placed it and why. P04 recommended base "Unavailable".
9. **Min-stay rule for 2+ months (5 nights):** used by the PriceLabs audit, but not in `policy.json`. Corentin to confirm.
10. **P15-P19:** need the second-account keys (t-unmapped). Vrbo +8% / Direct -10% are unconfirmed defaults.

```json
{"scoreboard":{"note":"4 Nov 2026. Last 30 nights = 5 Oct-3 Nov, 13 Smoobu units (kpi_pack portfolio_last30). Forward figures handback-aware, Smoobu confirmed stays as truth (occupancy.md; prices.csv starts 5 Nov). Pickup = bookings made 29 Oct-4 Nov, made-and-cancelled nets to zero. Base-rise net on the corrected method (yesterday's basis +5 n / +£936.42). Booking.com since the 24 Oct markup cut (channel.md §5). Airbnb ratios from 26 live searches 4 Nov 07:18-07:21Z (channel.md §3). PriceLabs gap from pricelabs.md H2. Direct share carried from 3 Nov (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"67.4% (67.4% yesterday)"},{"label":"ADR last 30","value":"£170.10 (£170.81)"},{"label":"RevPAR last 30","value":"£114.71 (£115.19)"},{"label":"Revenue last 30","value":"£44,737.32 (£44,922.70)"},{"label":"Booked next 30","value":"62.3% (175/281; 61.5% yesterday)"},{"label":"Booked next 60","value":"50.6% (240/474; unchanged)"},{"label":"7-day pickup","value":"9 bk / 27 n / £6,196 confirmed; net of cancellations +23 n / +£5,624"},{"label":"Raised flats net since 18 Oct","value":"+11 n / +£2,540.09 corrected (+5 n / +£936.42 on yesterday's basis); P11 -11 n"},{"label":"Booking.com since markup cut","value":"12 confirmed, 50 n, £8,412; 0.784x PriceLabs; net +25 n / +£3,361"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at <=28 days; 0.900x at 32-40 days; 1.000x at 61+ days (day 6)"},{"label":"Airbnb monitoring (closed, failed)","value":"bookings -43%, nights -68%, £ -63% (final, 4 Nov)"},{"label":"PriceLabs-side gap","value":"£2,485 next 30; £971 next 14 (was £2,656 / £1,330); open-night prices lower"},{"label":"Double-sellable Barking stays","value":"2 stays / £748.90; guest in residence (day 5)"},{"label":"Missed compression","value":"21 n / £281 excl. darts R1; full 26 n / £577"},{"label":"Direct share","value":"1.47% (12 months to 2 Nov; not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 5): unsynced Barking Airbnb 1455876748739910219 sells 4-7, 5-8 and 6-9 Nov over the guest in residence (3-6 Nov) and the 6-9 Nov Airbnb stay (£748.90); block 4-8 Nov now, then all open nights, then map to 3562176 or unlist","gbp":748.90},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 6, unchanged: remove hidden Smoobu Airbnb layers 0.765 (<=28 d) / 0.900 (32-40 d); P20 0.765 at 16-18 d is outside its 0-14 d policy discount; layer-only loss £693.57","gbp":693.57},
{"id":"t-airbnb-monitoring","status":"done","prop":"Portfolio","priority":"high","title":"Closed: policy monitoring 21 Oct-4 Nov ends today; final confirmation FAILED (bookings -43%, nights -68%, £ -63%); next step a-airbnb-rules","gbp":null},
{"id":"t-p12-4nov-price","status":"open","prop":"P12","priority":"high","title":"New: Mile End tonight (4 Nov) pushed at £302 (£382 all-in, P100, +35.5% vs 1-night comps; Low Demand; uncust £178, Your Price £209): set DSO 0% min 1 and find what lifts £209 to £302","gbp":117},
{"id":"t-p12-4nov","status":"done","prop":"P12","priority":"medium","title":"Done: 4 Nov min 1 set (Reyhan 01:24Z) and Smoobu = PriceLabs = £302; price moved to t-p12-4nov-price","gbp":null},
{"id":"t-p13-3nov","status":"done","prop":"P13","priority":"high","title":"Expired: Shepherd's Bush 3 Nov passed unsold at min 2 (about £124)","gbp":null},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P09 P11 P12 P20","priority":"high","title":"Layers unchanged (P04 -5%, P05 -1%, P09 -18% last-minute; Aggressive occupancy; Booking Recency default): gap £2,485 next 30 / £971 next 14, narrower only because uncustomized fell and nights sold; set Custom 0%","gbp":1473},
{"id":"a-p13-record","status":"open","prop":"P12 P11 P13 P20 P04","priority":"high","title":"Reyhan 4 Nov 01:24-01:31Z (37 edits) for Corentin to confirm: P04 9-24 Nov -15% vs -8%; P13 8-12 Nov -7% vs 0%; P12 17 Nov -15%; P20 16-19 Nov min 2 vs 3; P20 base 330 vs 350; P11 darts -5% (£1,094); Jan-Feb min 3-4 vs audit 5. Against plan: P08 -5%, P06 -5%, P05 13-19 Dec -7%, P13 21-26 Dec -5%, P20 21-26 Dec -5%. Record P13 base 250","gbp":465},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Gap wider: 7-8 Dec £933 -> about £1,183 (P75) and 13-21 Dec £5,274 -> about £5,866 (P75); Reyhan deepened 13-19 Dec to -7%","gbp":571},
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"high","title":"Not fixed (5th check): Airbnb sells 9 Nov at £253.44 room (20% Special offer on £316.80) vs Smoobu £1,411: clear the Airbnb date; to sell, DSO 0% min 1","gbp":313},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"P13 7-26 Dec -5% -> +5% on both listings (+£422 on £4,221; P50 £4,943; Reyhan moved 21-26 Dec to -5%), min 2 on 25-26 Dec; P05 29 Dec +100% (£1,277 vs P90 £1,091) to 0% min 1","gbp":222},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Waterford: +10% on 6-9 Nov (P0, -41%) and 13-15 Nov (P12, -29%) (supersedes Corentin's 24 Oct -5% there: his call); remove Reyhan's 21-26 Dec -5% (-19% vs comps); 0 reviews vs 18","gbp":69},
{"id":"a-handback-lastnights","status":"open","prop":"P08 P09","priority":"medium","title":"Wrong way: P08 got -5% instead of +10% (5-7 Nov £539, P0 -52%); P09 10-12 Nov £364, P0 -16.9% (cheapest in set): +10% on both","gbp":67},
{"id":"a-p04-dec","status":"open","prop":"P04","priority":"medium","title":"Barking 14-19 Dec DSO 0% instead of -10% (£1,143 -> about £1,270; P75 £1,300; Horse Show 17-21 Dec); 8 Dec part dropped (market soft)","gbp":67},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£65.66 on 6-19 Dec)","gbp":65.66},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"Marylebone 8-11 Nov open at £956 after Reyhan's -5% (P0, -35%): intended? If it should sell, rule says +10% (~£1,052)","gbp":57},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Camden: 26 Nov booked (moot); 23 Dec £298 -> >= £311, 3 Jan £188 -> >= £203; fix Booking.com visibility (CTR 0.81% vs 1.70%)","gbp":14},
{"id":"a-raise-1012nov","status":"open","prop":"P13","priority":"medium","title":"Not done: 3064856 12 Nov £170 min 2 (England v Croatia); set £176 min 1, keep 3090701 >= £183 (now £191)","gbp":4},
{"id":"t-push-check","status":"open","prop":"P09","priority":"high","title":"Narrowed to P09: pushed 4 Nov 07:27:40Z (23 h 50 m), slot drifting earlier (07:53, 07:37, 07:27Z); Smoobu £100/£110 on 10-11 Nov until that push, cause unknown; re-read before 07:27Z tomorrow. P12 gap closed; P11 sees both bookings","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Question: new Smoobu block 18-20 Nov (created 3 Nov 10:31Z) while policy delivery 20-22 Nov is open and Airbnb sells 20-23 Nov (£835.43): which is right?","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Partly: Mile End 26 Nov +25% -> +15% (£311; default £298) but still P100 +27.8% vs 1-night comps (£363 all-in); 0% keeps min 1 at market","gbp":null},
{"id":"t-p11-commission","status":"done","prop":"P11","priority":"medium","title":"Answered: all three Camden Booking.com bookings since 2 Nov = exactly 18.0% of room + £149 cleaning (booster rate charged on cleaning); Corentin's call whether to accept commission on cleaning (£26.82/booking)","gbp":null},
{"id":"t-pl-price-divergence","status":"open","prop":"P12 P13 P20 P11","priority":"medium","title":"New: PriceLabs pushed price differs from Your Price on 32 of 85 open nights next 30 (P12 4 Nov £302 vs £209; P13 8 Nov £160 vs £140, so Reyhan's -7% is not visible); Smoobu follows pushed price; ask PriceLabs support","gbp":null},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early bird (60+ d) still on cards (£151.92 on 4-7 Jan): not in policy - yours?","gbp":151.92},
{"id":"a-p13-twin","status":"open","prop":"P13","priority":"medium","title":"December twins now 4-7% apart (not from an override, so fragile); January identical on Airbnb cards after Reyhan's parent copy","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 27 Nov 3064856 £335 (+41% vs P50, above P75) at +50%; 17 Nov +35%: confirm; no trim proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Cancellations in 7-day window 3 / 6 n / £1,058.50, incl. P11 12-14 Dec made and cancelled within ~3 min on 3 Nov: send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284 (PL rec now 284); 12-13 Nov £199/£249 after Reyhan's -10%; pace30 -12.1%","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: stale id_map ids (Marylebone Vrbo x3 and pricelabs_other ids); Vrbo copies pushing; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps refreshed 4 Nov (east 487, west 298 rows; P01 comp replaced); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still double-sells 4-7, 5-8, 6-9 Nov over the guest in residence and the 6-9 Nov Airbnb stay (£748.90), day 5","evidence":"Live 4 Nov 07:18:51Z-07:21:34Z: £515.00 / £514.20 / £514.20 bookable on 1455 over Smoobu Booking.com 161785771 (£393.18) and Airbnb 161888271 (£355.72); no booking visible on 1455 yet."},
{"agent":"pricelabs","severity":"high","ref":"P04 P13 P12 P20 P11","title":"Reyhan 37 edits 4 Nov 01:24-01:31Z: 17 deeper or new cuts; conflicts worse on P04 (-15% vs -8%), P13 8-12 Nov (-7% vs 0%), P12 17 Nov (-15%); P20 min 2 vs 3; new Jan-Feb min 3-4","evidence":"get_user_logs 37 entries all Reyhan; live overrides; pricelabs.md H1, M2."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"P12 tonight £302 (£382 all-in) = P100, +35.5% vs 1-night comps on a Low Demand night; pushed price £302 vs Your Price £209","evidence":"get_listing_prices 2699998 (uncust £178); comp-east band 238/282/285; pricelabs.md T2."},
{"agent":"channel","severity":"high","ref":"P20 P12 P13 P05 P06 P08 P04","title":"Hidden Airbnb layers 0.765 / 0.900 unchanged day 6; monitoring confirmed FAILED","evidence":"26 live searches 07:18-07:21Z; channel.md §3-4; comp-west reads 0.765 on P20 at 16-18 d."},
{"agent":"channel","severity":"high","ref":"P05","title":"P05 9 Nov still sells on Airbnb at £253.44 room vs Smoobu £1,411 (5th check)","evidence":"channel.md §3; comp-central control 29 Dec flows correctly."},
{"agent":"channel","severity":"medium","ref":"P11","title":"P11 commission explained: exactly 18.0% of room + £149 cleaning on all three bookings since 2 Nov (£26.82/booking on cleaning)","evidence":"channel.md §2: 104.24/579.11, 149.29/829.40, 114.42/635.68; supersedes comp-central 'unexplained'."},
{"agent":"comp-central","severity":"medium","ref":"P11","title":"P11 26-29 Nov sold at £680.40 = 0.932x PL, P0 -46% vs same-stay comp median £416.33; 12-14 Dec made and cancelled in ~3 min, reopened","evidence":"comp-central; channel.md §2; occupancy.md."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct raised flats: corrected net +11 n / +£2,540.09 (yesterday's basis +5 n / +£936.42); P11 -11 n; hold bases","evidence":"occupancy.md base-rise tracker, method correction for made-and-cancelled bookings."},
{"agent":"pricelabs","severity":"medium","ref":"P09","title":"P09 pushed 07:27:40Z, 23 h 50 m after last push; slot drifting earlier; Smoobu £100/£110 on 10-11 Nov until the push (cause unknown); last nights P0 -16.9%","evidence":"pricelabs.md T1; comp-east."},
{"agent":"occupancy","severity":"medium","ref":"P20","title":"New Smoobu block 18-20 Nov (created 3 Nov 10:31Z) while policy delivery block 20-22 Nov is open and selling","evidence":"occupancy.md; channel.md §7 (162432556); pricelabs.md M1."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £2,485 next 30 / £971 next 14, narrower only because uncustomized fell and nights sold; open-night prices lower","evidence":"pricelabs.md H2."},
{"agent":"pricelabs","severity":"medium","ref":"P12 P13 P20","title":"Pushed price differs from Your Price on 32 of 85 open nights (8 of 93 yesterday); Smoobu follows pushed price","evidence":"pricelabs.md data gap 3; comp-west data gap 3."},
{"agent":"market","severity":"medium","ref":"P13 P05 P04 P20","title":"Market raises still open and wider: P13 Christmas +£422 (+10%) / +£722 to P50; P05 7-8 Dec +£250 and 13-21 Dec +£592 to P75; P04 14-19 Dec +£157 to P75; P20 6-9 / 13-16 Nov -41% / -29% vs comps","evidence":"market.md §2, §5; comp-west; comp-central; comp-east."}
],
"top5":[
"Barking (day 5, guest in residence): block 4-8 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 double-sellable), then all open nights; map to Smoobu 3562176 or unlist.",
"P12 tonight: £302 (£382 all-in) is P100, +35.5% vs 1-night comps on a Low Demand night; set 4 Nov DSO 0% min 1 (~£178) and find why pushed £302 vs Your Price £209.",
"Confirm Reyhan's 4 Nov edits vs your decisions (up to ~£465/month): P04 -15% vs -8%, P13 8-12 Nov -7% vs 0%, P12 17 Nov -15%, P20 16-19 Nov min 2 vs 3 and base 330 vs 350, P11 darts -5%, Jan-Feb min 3-4; plus plan reversals P08 -5%, P06 -5%, P05 13-19 Dec -7%, P13 and P20 21-26 Dec -5%.",
"Airbnb: remove hidden Smoobu 0.765 / 0.900 rules (day 6; monitoring closed FAILED); clear P05 9 Nov (£253.44 vs £1,411, 5th check); set PriceLabs layers to Custom 0% (gap £2,485 next 30 / £971 next 14).",
"Questions and raises: P20 delivery block 18-20 Nov (new) or 20-22 Nov (policy, selling)?; accept 18% commission on cleaning (£26.82/booking)?; P05 December to P75 (£571), P13 Christmas +10% with 25-26 Dec min 2 (£222), P04 14-19 Dec 0% (£67), P13 12 Nov £176 min 1, P20 6-9 / 13-15 Nov +10% (£69)."
],
"per_property":[
{"ref":"P01","change":"No change; sold to the 20 Dec handback; self-pushed 05:46Z."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 03:28Z via Channex."},
{"ref":"P04","change":"No booking; 1455 still double-sells 4-9 Nov (day 5); Reyhan -15% 9-24 Nov vs your -8% (9-13 Nov £758 from £859); Jan/Feb -10% min 3/4; weekly 18%; fwd30 55.2% vs 23%; PL rec base Unavailable."},
{"ref":"P05","change":"No booking; Reyhan 13-19 Dec -7% and Feb -5% min 4; 9 Nov Airbnb £253.44 vs £1,411 (5th check); 29 Dec £1,277; December 33-51% under comps; fwd30 75.9% vs 40%."},
{"ref":"P06","change":"Reyhan -5% 8-14 Nov; 8-11 Nov £956, P0 -35%; intentional-block flat."},
{"ref":"P07","change":"Intentional block."},
{"ref":"P08","change":"Reyhan -5% 4-21 Nov instead of planned +10%; 5-7 Nov £539, P0 -52% (n=1); handback 13 Nov."},
{"ref":"P09","change":"Pushed 07:27:40Z (23 h 50 m; slot drifting earlier); Smoobu £100/£110 on 10-11 Nov until the push; 10-12 Nov £364, P0 -16.9%, cheapest in set."},
{"ref":"P10","change":"No change; sold to the 18 Nov handback."},
{"ref":"P11","change":"New Booking.com 26-29 Nov £680.40 (0.932x, P0 -46%); 12-14 Dec made and cancelled, reopened £321/£229; commission = 18% on room + cleaning; 23-25 Dec edited but prices fell; fwd30 48.3% vs 45%."},
{"ref":"P12","change":"No booking since 1 Nov; pace30 -12.1%; Reyhan 4 Nov +15% min 1 (£302, P100), 16-25 Nov and 27 Nov-13 Dec -15%, 12-13 Nov -10%, 26 Nov +15% (£311); 3 Nov lapsed; sync gap closed."},
{"ref":"P13","change":"No booking; 3 Nov lapsed (~£124); Reyhan 8-12 Nov -7% (vs 0%), 21-26 Dec -5% min 3, Jan -10% min 3, Feb -10%; 12 Nov £170 min 2; December twins 4-7% apart, January identical."},
{"ref":"P14","change":"Numbers only: 73.3% of open nights at £500 minimum; 0% vs 42%."},
{"ref":"P20","change":"New Smoobu block 18-20 Nov while 20-22 Nov (policy delivery) open; Reyhan 16-19 Nov -5% min 2, 21-26 Dec -5%, Jan -10% min 3, Feb -7% min 4; base 330; 6-9 Nov P0 -41%, 13-16 Nov P12 -29%; fwd30 48.1% vs 36%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 255)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback; no sellable nights (occupancy.md)."},
{"ref":"P04","base":"220 (rec Unavailable)","recommendation":"Hold 220; get the data on why the PL recommendation is Unavailable","reason":"55.2% vs 23% / 52.5% vs 20%; base +29.4% vs P50, +0.9% vs P75; comps P0-P50 with qp -0.15, recommend +10% (comp-east; pricelabs.md M5)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides","reason":"75.9% vs 40% / 67.8% vs 39%; comps P0/P12/P22, recommend +25%; levers 7-8 Dec, 13-21 Dec, 9 Nov, 29 Dec (comp-central; market.md)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Only 8-11 Nov sellable; P0 -35%, recommend +10% at date level (t-p06-open) (comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"3 nights before the 26 Nov handback; 86.4% vs 36% (comp-east)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"48.3% vs 45% / 49.2% vs 40%; comps P11/P12/P9, recommend +5% = Reyhan's -5% (conflict b2), so restore that rather than move the base (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; no base cut on top of Reyhan's -15%","reason":"65.5% vs 40%; pace30 -12.1%; multi-night band P20-P57 with quality cap; PL rec now equals base (comp-east; occupancy.md)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"72.4% vs 41%; base +12.6% vs P50, -10.4% vs P75; recommend +10% on Nov/Dec stays (comp-west; market.md)."},
{"ref":"P20","base":"330 (Corentin 350; rec 347)","recommendation":"Conflict for Corentin: confirm 350 or record 330 and £200 floor; not a new proposal","reason":"No base change logged 3-4 Nov; rec 347; Nov comps P0-P40, Dec -20% to +2%; 0 reviews vs 18 (comp-west; pricelabs.md H1)."}
]}
```

# Seeker Estates - Daily revenue report, 2026-11-03 (Tuesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-03/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-03/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `data/snapshots/2026-11-03/reservations.csv` (696 rows; used only for the direct share; `total_gbp` is room only, cleaning excluded).
- `reports/2026-11-02/daily-report.md` and its JSON, the dashboard action list (3 Nov, before this step), the overnight brief and the caller's corrections.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Settled, not raised: Visibility Booster commission, 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov (deprioritised; reported only as Reyhan's conflict), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after the handbacks are not inventory: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.** As a result, two Booking.com items are dropped today (a-p12-genius, a-bcom-lm). Where Reyhan's PriceLabs edits cross your decisions, I list them for you to confirm. I do not propose them again as new changes.

## Corrections I made to the specialists' figures

1. **P11 Booking.com 20-22 Nov (£430.11) was 0.933x PriceLabs (£461), not 0.889x (£484).**
   - Reyhan put the -5% on 10 Nov-18 Dec back at **2 Nov 15:05:01Z**. It was pushed at 15:05:46Z. The booking was made at 23:10, about 8 h later.
   - The stack is exact: list £531 (Smoobu x1.15, rounded up per night: 265 + 266) x Mobile 10% x Genius 10% = **£430.11** (channel.md §2). No clean stack fits the £484.
   - The 0.889x figure in the overnight brief, occupancy.md and market.md 2a is superseded. The brief was also wrong to say the booking came after the cuts were removed.
   - **Commission to check:** £104.24 is **24.2% of the room** and **18.0% of room + cleaning (£579.11)**. The Booster rate is 18%. Whether Booking.com charges commission on cleaning is NOT CHECKED. Per policy we ask before assuming (t-p11-commission).
2. **P20 Airbnb 10-13 Nov is 0.722x, confirmed.** £706 x 0.765 = £540.09, then x0.944 = £510.00.
   - Against what policy expects (P20's 15% last-minute discount = £600.10), the guest paid **£90.10 less**.
   - Of that, **£60.01** is the hidden 0.90 layer and **£30.09** is a residual x0.944 that no listing rule shows (channel.md §2).
3. **The discount gap must be compared on the same dates.** On 4 Nov-3 Dec it is **£2,656**, against **£2,009 on the same dates yesterday**. The next 14 days are £1,330 against £1,009. Yesterday's £2,281 covered a different window (pricelabs.md H2).
4. **P13 3 Nov price.** PriceLabs live shows 3064856 at £124, min 2 (pricelabs.md H3). Smoobu `/api/rates` shows £110 on 3064856 and £122 on 3090701 (occupancy.md). The difference is NOT CHECKED. The guest sees the Smoobu rate.
5. **Base-rise tracker uses occupancy.md's windows:** bookings made 19 Oct-2 Nov (15 days) against 4-18 Oct (15 days).

## Executive summary

1. **Critical, day 4: the Barking guest arrives TODAY.** The unsynced Airbnb listing 1455876748739910219 is still bookable for **3-6 Nov (£518.20 card)** and **6-9 Nov (£514.20)**. Both stays are already confirmed in Smoobu: Booking.com £393.18 and Airbnb £355.72.
   - **£748.90 at risk**, plus relocation cost.
   - At 07:21Z the cards showed 1455 unbooked for 3-9 Nov, so no double booking is visible yet (channel.md §1; comp-east).
2. **The base review (2 Nov) was not actioned in PriceLabs.** `get_user_logs` shows no `base_price` entry after 2 Nov 00:16:02Z.
   - The holds therefore stand as they are.
   - **P20 is still 330 / min 200, against your 350.**
3. **Reyhan's 2 Nov afternoon edits (15:02-15:05Z) and one at 23:26Z undid yesterday's fixes** (pricelabs.md H1):
   - **P11:** -5% on 10 Nov-18 Dec again, including the darts nights 13-17 Dec. Those now total £1,091, an average of £218, against your "above £300".
   - **P13:** 8-12 Nov is at -5% again, against your 0%. 12 Nov (England v Croatia) fell to £151.
   - **P12:** 16 Nov-13 Dec moved from -7% to -10% (17 Nov now £226). There are also new cuts on 2-4 Nov and 12-13 Nov.
   - **P20:** min stay 2 on 16-19 Nov, against your 3 nights to 30 Nov.
   - **Value of your settings if restored: about £605 a month** (action 6).
4. **Two bookings were made on 2 Nov. There were no cancellations.**
   - **P20 10-13 Nov, £510** at 0.722x. This was the bottom of the comp set (P14, -37.5%).
   - **P11 20-22 Nov, £430.11** at 0.933x. This is P0 against comps (-36%) and the first P11 booking since 28 Oct.
   - **18 Oct raised flats: net +4 n / +£742.70** since the rise (was +2 n / +£312.59). Both new bookings sold on dates carrying fresh cuts, so they say nothing about the bases.
5. **The Airbnb monitoring (21 Oct-4 Nov) closes as FAILED. I propose removing the hidden layers.**
   - Bookings -43%, nights -68%, £ -63%.
   - Bookings made after 21 Oct paid **0.731x PriceLabs**. 10 of 12 are below what policy expects, and **£2,348.39** of the gap is unexplained.
   - The hidden Smoobu layers, 0.765 at 28 days or less and 0.900 at 29-45 days, are unchanged for the fifth day (channel.md §4-5).
6. **Gap-fill tonight.**
   - P13 3 Nov cannot sell: it is a 1-night gap with min 2.
   - P12 4 Nov becomes a 1-night gap tomorrow if tonight does not sell.
   - P12 26 Nov is fixed (min 1), but at +25% (£352, above market P90 £336).

**Last 30 nights (4 Oct-2 Nov, 13 units):** occupancy **67.4%**, ADR **£170.81**, RevPAR **£115.19**, revenue £44,922.70. Yesterday: 68.2% / £171.48 / £116.96 (kpi_pack `portfolio_last30`).
**Next 30 (4 Nov-2 Dec):** **61.5%** booked (177/288; yesterday 61.1%). **Next 60:** **50.6%** (244/482; 50.0%). Smoobu is the truth; handback-aware (occupancy.md).
**7-day pickup (28 Oct-3 Nov):** 12 bookings / 45 n / £9,229.27. Less 4 cancellations (12 n / £2,474.96): **net +33 n / +£6,754.31** (yesterday +34 n / +£5,921.83).

## Base review (follow-up to a-base-review-1102)

No base change was logged on 2-3 Nov. Today's evidence supports holding every base. The exception is P20, which stays for you to decide.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 255 | 100% booked (26/26 non-blocked) to the 20 Dec handback; no sellable nights | **Hold; off the agenda** |
| P05 | 550 / 548 | 75.9% vs 40% (30d), 67.8% vs 38% (60d). Comps P12/P22 with qp +0.15, so `recommend` = +25%. Base 4.8% under P50 £573 | **Hold 550. Use date overrides** (a-p05-dec, a-peak-check) |
| P06 | 357 / 357 | Only 8-11 Nov is sellable. 63.6% of non-blocked nights vs 45%; P0; `recommend` +10% | **Hold** (date question t-p06-open) |
| P09 | 176 / 176 | 87% vs 36%; 3 nights before the 26 Nov handback | **Hold** |
| P11 | 286 / 285 | 41.4% vs 46% (30d), 44.1% vs 39% (60d). Comp P2 room (30d) / P7 (60d). `recommend` is now **+5%** on both windows (was fix-listing) | **Hold 286.** The +5% the rule supports is exactly Reyhan's re-added -5% (conflict b, action 6) |
| P12 | 284 / 273 | 62.1% vs 40%. Pace30 -8.8% vs STLY. November band P25-P50, quality cap -0.15, so hold. Reyhan now at -10% on 16 Nov-13 Dec | **Hold 284.** Do not stack a base cut on the -10% |
| P13 | 250 / 237 (236) | 72.4% vs 41%. 250 is about P61 of the 2 BR band (P50 £224, P75 £280) | **Keep 250 and record it in policy** |
| P20 | **330** (your 350) / 347 | 44.8% vs 36% (30d) after the new booking; 25.4% vs 30% (60d). Comps: November P0-P30, December P17-P44. `recommend` +5% (30d) / fix-listing (60d). Rated 0 reviews vs 18 | **Conflict for you: confirm 350 or record 330 / £200 floor.** Nothing supports the cut: rec 347, and the new booking sold at P14 |

## What changed since 2 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect
| Group | Made 19 Oct-2 Nov (bk / n / £) | Made 4-18 Oct | After ÷ before, per day (bk / n / £) | Net since the rise |
|---|---|---|---|---|
| **Raised** | 14 / 48 / £10,030.33 | 13 / 91 / £18,199.03 | **1.08x / 0.53x / 0.55x** (was 1.07x / 0.54x / 0.57x) | **+4 n / +£742.70** (was +2 n / +£312.59) |
| Unraised (P02, P08, P10, P14, P20*) | 6 / 29 / £4,717.79 | 7 / 68 / £8,054.83 | 0.86x / 0.43x / 0.59x | +29 n / +£4,717.79 |
| P13 (base 235 -> 250, unrecorded) | 2 / 16 / £2,909.76 | 6 / 24 / £3,617.87 | 0.33x / 0.67x / 0.80x | +16 n / +£2,909.76 |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:**
  - P01: 1 bk / 3 n.
  - P05: 2 / 6 / £1,953.04.
  - P06: 2 / 6 / £1,345.77.
  - P09: 1 / 2 / £253.21 (no booking since 23 Oct).
  - **P11: 3 / 8 / £1,651.56**, new 20-22 Nov at 0.933x. Net -14 n / -£3,035.67 after 2 pre-rise cancellations.
  - P12: 5 / 23 / £4,105.85. Net +1 n / -£494.55.
- **Reading:**
  - Bookings per day are level or higher in both groups. Nights and £ per day fell by about the same share in both groups.
  - The only new raised-group booking (P11) sold at P0 against comps, on a date carrying Reyhan's fresh -5%. It is no evidence on elasticity.
  - The changes that overlap cannot be separated: the 24 Oct markup cut and Last Minute 10%, the flexible-cancellation test, and Reyhan's overrides.
- **Conclusion: still no evidence that the rises cost demand. Hold the bases.**

### Per property
| Ref | Change since 2 Nov |
|---|---|
| P01 | No change. Sold to the 20 Dec handback; self-pushed 05:54Z. |
| P02 / P03 / P07 | Intentional blocks. Self-pushed (P02 00:24Z, P03 03:14Z via Channex, P07 04:38Z). P02 Vrbo copy last pushed 24 Feb 2026. |
| P04 | No booking. **1455 still double-sells 3-6 / 6-9 Nov (arrival today, day 4).** Smoobu-vs-PriceLabs gap on 9-13 Nov is **closed** (2 Nov 08:54Z push). Synced weekly discount 18.0% again (£66.42 on 6-19 Dec). Reyhan -10% unchanged. Fwd30 55.2% vs 23% (window roll). |
| P05 | No booking, no edit. 9 Nov still £253.44 room on Airbnb vs Smoobu £1,435 (4th check). 29 Dec £1,354; 7-8 Dec £487 / £483. Visible 12% early bird again (£152.16 on a 4-7 Jan card). Reyhan's -5% (29 Nov-2 Dec, 13-19 Dec) and -7% (4-31 Jan) confirmed still set. Fwd30 75.9% vs 40%. |
| P06 | 12-15 Nov booking now seen by PriceLabs. 8-11 Nov rose to £987 (was £891) through the occupancy layer, no log entry. Fwd30 63.6% of non-blocked vs 45%. |
| P08 | No booking. 5-7 Nov £186 / £205 / £203; P0 (-48%, n=1). Handback 13 Nov. |
| P09 | No booking. 10-12 Nov down to £117 / £127 / £145 (last-minute -18% decay); comps P0 / P20. Push crosses 24 h at 07:53Z. |
| P10 | No change. Sold to the 18 Nov handback. |
| P11 | **New booking 20-22 Nov £430.11, 0.933x** (Mobile x Genius). PriceLabs has not seen it yet. **Reyhan re-added -5% on 10 Nov-18 Dec** (darts £1,091). Fwd30 41.4% vs 46% (was 37.9%). `recommend` now +5%. |
| P12 | No booking. **Reyhan, 15:02-15:04Z:** -10% on 2-4 Nov, -5% on 12-13 Nov, **-10% on 16 Nov-13 Dec** (was -7%), **26 Nov +25% min 1** (£352). **New sync gap 4 Nov:** PriceLabs £196 vs Smoobu £170. Pace30 -8.8% (was -11.9%; the window moved). Airbnb 0 bookings in 14 days. |
| P13 | No booking. **Reyhan re-added -5% on 8-12 Nov** (against your 0%) and moved 7-20 Dec from -2% to -5%; both copied to 3090701. 12 Nov £151 / £183. Twins identical on all 20 December nights. 3 Nov cannot sell (min 2). 25-26 Dec still min 3. Fwd30 72.4% vs 41%. |
| P14 | Numbers only: 75% of open nights at the £500 minimum; 0% vs 42%; P100 vs comps. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **New booking 10-13 Nov £510, 0.722x** (layer + x0.944). **Reyhan 23:26Z: 16-19 Nov -2%, min 2** (against policy min 3). Base 330 unchanged. Delivery block 20-22 Nov still absent: Airbnb sells 21-24 Nov at £807.89. Fwd30 44.8% vs 36% (was 34.5%). Flexible test day 10 of 14. |

### Reyhan's edits vs your decisions (status of the conflict list)
| # | Ref / dates | Your decision | Now (live) | Status |
|---|---|---|---|---|
| a | P12 17 Nov | keep +50% (deprioritised) | -10%, min 2, £226 (uncustomized £276) | **Worse** (-7% -> -10%) |
| b | P11 darts 13-17 Dec | "above £300"; keep +5% | -5%: £1,091, average £218.20 | **Reversed** (yesterday 0%, £1,150) |
| b2 | P11 10 Nov-18 Dec (rest) | standing direction: cut PriceLabs discounts | -5%, min 2 | **Re-added** 15:05:01Z. Comps P0-P14; `recommend` +5% |
| c | P13 8-12 Nov | 0% (24 Oct) | -5%, min 2, 3 listings | **Re-broken** (fixed at 00:12Z) |
| c2 | P13 7-20 Dec | standing direction | -5% (was -2%) | **Worse**; Christmas gap to P50 now £455 |
| d | P20 base / min | base 350 | 330 / 200 | **Open** (base review not actioned) |
| d2 | P20 16-19 Nov | min stay 3 to 30 Nov | -2%, **min 2** (live in Smoobu) | **New** |
| e | P04 9-24 Nov | -8%, min 3 | -10%, min 3 | **Unchanged** |
| f | P12 2-4 Nov, 12-13 Nov | standing direction | -10% / -5% | **New** |
| g | P13 base 250 | not in policy | 250 | **Record it** |
| - | Evidence only | P05 -5% / -7% (31 Oct); P04 6-22 Dec -10% | unchanged | contradicted by comps; covered in actions 8 and 11 |

### Open plan items: status today
| Item | Status 3 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed, day 4; arrival today** (channel.md §1 07:21Z; comp-east) |
| t-push-check | **Partly.** P04 gap closed. No priced listing pushed overnight without an edit; daily slots seem to sit about 1 h earlier (P09 about 07:53Z, P04/P05 about 08:54Z, P06 about 09:39Z). **New gap on P12 4 Nov (-£26).** PriceLabs has not seen the P11 booking (pricelabs.md C1) |
| a-airbnb-rules | **Not fixed, day 5.** Monitoring closes as failed (below) |
| a-discount-cut | **Widened:** £2,656 vs £2,009 on the same dates; the customization layers are unchanged |
| a-base-review-1102 | **Closed:** no base change, so the holds stand. P20 is carried in a-p13-record |
| a-p13-record | Updated above (b, c re-broken; a, c2 worse; d2, f new) |
| a-p12-26nov | **Done** (Reyhan 15:04Z: min 1). The +25% price is a new question (t-p12-26nov-price) |
| t-p13-3nov | **Not fixed;** lapses tonight |
| a-p05-9nov | **Not fixed** (£253.44 vs £1,435) |
| a-raise-1012nov | **Moved the wrong way:** £151 (was £159) |
| a-peak-check, a-p05-dec, a-p13-orphan-price, t-p20-delivery, t-p04-weekly, a-p05-earlybird, a-p13-twin, t-p06-open | Not done; details in the actions |
| a-p12-genius, a-bcom-lm | **Dropped:** both cut Booking.com discounts, which is against your standing direction. Stack sizes are still reported |
| Others (a-amenities, a-bcom-cancel, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) | Unchanged; no new evidence. No cancellation since 31 Oct 14:36 |

**Airbnb monitoring, final (21 Oct-4 Nov), CLOSED: FAILED** (channel.md §5):
- **Volume:** bookings made 20 Oct-2 Nov vs 6-19 Oct: **13 vs 23 bookings (-43%), 53 vs 164 nights (-68%), £10,391.53 vs £28,179.02 (-63%).**
  - Excluding the two long prior stays: -38% / -48% / -49%.
  - Clear drops on bookable inventory: P12 0 bookings; P13 -80%; P05 £ -69%. P20 rose from 2 to 4.
- **Price:** 12 bookings made after 21 Oct paid **0.731x** PriceLabs (£9,861.61 vs £13,483). Policy expects £12,474.19, so the gap is £2,612.58, of which **£2,348.39 is unexplained**.
- **Cause:** the hidden Smoobu lead-time layers. Removing the manual promotions on 21 Oct could not lift the rate while these layers stay on.
- **Next step:** remove the layers (action 2), then re-measure.

## Actions - 2026-11-03

**Ranking:** critical channel-safety and same-day rows first, then expected £ over the next 30-60 days, then rows that cannot be quantified.

**Expected effect** = price move in £ on open nights x the flat's booked share, using Smoobu `forward_occ_30` (P04 0.552, P05 0.759, P06 0.636, P08 0.70, P09 0.87, P11 0.414, P12 0.621, P13 0.724, P20 0.448), or `_60` for December (P04 0.542, P05 0.678, P11 0.441, P13 0.525). These are upper bounds; elasticity is not measured.

**Bounds** (kpi_pack): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P08 £150; P09 £100; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every price below is inside them.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, arrival TODAY).** On 1455876748739910219, **block the nights 3-8 Nov now**. Then block 9-12 Nov, 18-24 Nov and 6-19 Dec, or snooze the listing. Then map 1455 to Smoobu 3562176 (keeps its 4.69 (26) reviews) or unlist it. | Airbnb host 551951609 > listing 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel.md §1 (07:21:15Z / 07:21:23Z): 3-6 Nov £518.20 and 6-9 Nov £514.20 bookable on 1455, over Smoobu Booking.com 161785771 (£393.18) and Airbnb 161888271 (£355.72). 1455 also sells 9-12 Nov £497, 18-24 Nov £944.84, 6-19 Dec £2,275.22 | Protects **£748.90** (393.18 + 355.72). Relocation cost not quantified | Corentin | 2026-11-03 |
| 2 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 5): close the monitoring as failed and remove the hidden layers.** On every apartment and any global rule, remove the 28-days-or-less rule (x0.85) and the hidden ~10% (x0.90) out to about 60 days. Keep only visible Airbnb discounts (policy `airbnb_visible_discounts`). Also check reservation 162347031 (P20) for a special offer (x0.944) and 162228256 (P06, x0.850). Then update `policy.json` monitoring to "closed 4 Nov, failed". | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb host inbox | channel.md §4: 28 live searches 07:21-07:24Z. Every synced card is 0.765 at 28 days or less, 0.900 at 29-45 days, 1.000 at 62+ days; P12 lead 28 = 0.765, lead 29 = 0.900. comp-west reads the same split on P13. §5: post-21 Oct Airbnb 0.731x, £2,348.39 unexplained | Layer-only loss so far **£693.57** (P05 £328.76 + P04 £109.28 + P06 £195.52 + P20 £60.01). Forward: 23.5% of every Airbnb night booked 28 days out or less; total not quantified | Corentin | 2026-11-04 |
| 3 | P13 P12 | **t-p13-3nov (lapses tonight).** Set **3 Nov min 1** on 3064856 and 3090701 now; keep the price. **New, t-p12-4nov:** if P12 3 Nov does not sell tonight, set **4 Nov min 1** tomorrow morning. | PriceLabs 3064856 / 3090701 > DSO 3 Nov; 2699998 > DSO 4 Nov | pricelabs.md H3: 3 Nov min 2 with 4 Nov blocked by the 3090701 Airbnb 4-8 Nov stay, so it cannot sell. Smoobu £110 / £122 (occupancy.md). P12 3-4 Nov is a 2-night run at min 2 before the 5 Nov arrival (occupancy.md). No standing decision on P12/P13 min stay | P13: £110 x 0.724 = **£80**. P12: £170 x 0.621 = **£106**, only if 3 Nov goes unsold | Corentin | 2026-11-03 |
| 4 | P09 P04 P05 P06 P12 P11 | **t-push-check.** (1) After 09:45Z re-read `last_date_pushed` on 3318172, 3166592, 3562176, 3288517. If any still shows 2 Nov, raise a push failure with PriceLabs support. (2) **P12 4 Nov:** find the source of Smoobu's £170 (PriceLabs £196): manual Smoobu rate or a failed push. (3) Have P11 refresh so it sees the 20-22 Nov booking. | PriceLabs > listing > Sync status; Smoobu > Rates (Mile End 4 Nov) | pricelabs.md C1: last pushes P09 2 Nov 07:53:39Z, P05/P04 08:54Z, P06 09:39Z, all with no log entry. P12 4 Nov £196 vs £170 (kpi_pack `sync_issues`). P11 raw still shows 20-21 Nov open at £230 / £231 | P12 £26 x 0.621 = **£16**. The P11 occupancy and recency layers are mispriced until refresh: not quantified | Corentin | 2026-11-03 |
| 5 | P04 P05 P09 P11 P12 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** explicitly. Still active: last-minute P04 -5%, P05 -1%, **P09 -18%**; Aggressive occupancy on all except P12 (Custom) and P09; Booking Recency default on all. | PriceLabs > listing > Customizations | pricelabs.md H2, 4 Nov-3 Dec final vs uncustomized: P12 -£501, P11 -£574, P20 -£607, P04 -£568, P05 -£415, P09 -£24. P13 net +£16 and P08 +£17 offset | Upper bound **about £1,447 per 30 days**: 501x0.621 + 574x0.414 + 607x0.448 + 568x0.552 + 415x0.759 + 24x0.87 - 16x0.724 - 17x0.70. Includes Reyhan's overrides (row 6 overlaps). Overstated by P11 20-21 Nov and P20 20-22 Nov counted as open | Corentin | 2026-11-04 |
| 6 | P11 P13 P12 P20 P04 | **a-p13-record: confirm or restore your settings** (conflict table, items a-g). These are not new proposals. Also record P13 base 250. | PriceLabs 3064196 (+Vrbo) DSO 10 Nov-18 Dec; 3064856 (+children) DSO 8-12 Nov; 2699998 DSO 2-4 Nov, 12-13 Nov, 16 Nov-13 Dec; 3547481 Base and DSO 16-19 Nov; 3562176 DSO 9-24 Nov; then `policy.json` | pricelabs.md H1, H2; market.md §0, §4; comp-central (P11 P0-P14, `recommend` +5%; darts comps £420-448) | **About £605/month:** P12 DSOs £226x0.621 = £140; P11 £218x0.414 = £90; P13 8-12 Nov £83x0.724 = £60; P20 base £4,166x(350/330-1) = £252x0.448 = £113; P04 £1,992x(0.92/0.90-1) = £44x0.552 = £24; P11 darts (£1,229-£1,091) = £138x0.441 = £61; P12 17 Nov (276x1.5-226) = £188x0.621 = £117 (overlaps P12 by about £8) | Corentin | 2026-11-04 |
| 7 | P13 | **a-peak-check (P13 Christmas) + a-p13-twin.** Replace Reyhan's 7-20 Dec -5% and the 21-26 Dec -3% on **3064856 with +5% (7-20 Dec) and +7% (21-26 Dec)**, and on **3090701 with +7% / +9%**, so the twins differ by about 2%. This is current x1.10. Set **min 2 on 25-26 Dec**. | PriceLabs 3064856 and 3090701 > DSO 7-26 Dec (detach copy-from-parent on 3090701) | comp-west: 18-20 Dec P50 and 23-26 Dec wider P13; `recommend` +10% (60d lead +16.5 pts). market.md 2b: 7-26 Dec £4,506 vs P50 £4,963 (+£455), market +4.7 to +24.1 pts vs STLY. Twins identical on all 20 nights. pricelabs.md H3: 25-26 Dec min 3 with 27 Dec booked | +10% = £451 x 0.525 = £237, plus 25-26 Dec unlocked (£229 + £232) x 0.525 = £242: **about £479** (upper bound) | Corentin | 2026-11-05 |
| 8 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,184 for the two nights** (market P75; replaces +3%). DSO **13-21 Dec to about P75 £5,857** total (replaces Reyhan's -5% on 13-19 Dec; their part is a conflict for you, item "evidence only"). Hold 29 Nov-2 Dec. | PriceLabs 3166592 > DSO 7-8 Dec, 13-21 Dec | market.md 2c: 7-8 Dec £970 vs P75 £1,184 (market +11.2 / +6.0 pts vs STLY); 13-21 Dec £5,453 vs P75 £5,857 / default £5,945. comp-central: P12/P22, 32-49% under the December medians, `recommend` +25%; capped at P75 because 3 of 6 comps are rated under 4.3 | (£214 + £404) x 0.678 = **£419** | Corentin | 2026-11-05 |
| 9 | P05 | **a-p05-9nov.** (1) On Airbnb, clear the 9 Nov custom price / Special offer and check the sync log. (2) To sell the night, replace +300% with **0%, min 1** (about £412 uncustomized). For a soft block, close it in Smoobu. | Airbnb > 1618929775762183214 > Calendar 9 Nov; Smoobu > Channel Manager > Airbnb sync log; PriceLabs 3166592 > DSO 9 Nov | channel.md §3: card £511.80 less 20% Special offer, giving a room of **£253.44** vs Smoobu £1,435, identical for 4 checks. comp-central control: 29 Dec flows correctly, so the fault is date-specific. pricelabs.md H3: neighbours booked at £444 / £450 | Upper bound £412 x 0.759 = **£313**. Protects up to £158.56 per sale vs the current Airbnb room | Corentin | 2026-11-03 |
| 10 | P05 | **a-peak-check (P05 29 Dec).** Replace +100% with **0%, min 1** (about £1,121). | PriceLabs 3166592 > DSO 29 Dec | market.md 2c: £1,354 = 1.25x P90 £1,080; neighbours booked £790 / £831 (pricelabs.md H3) | Not quantified: a cut, so value depends on whether it sells | Corentin | 2026-11-05 |
| 11 | P04 | **New, a-p04-dec.** DSO **14-19 Dec 0%** in place of -10% (about £1,286 for 6 n), and **8 Dec at least £193**. | PriceLabs 3562176 > DSO 14-19 Dec, 8 Dec | comp-east: synced P04 P0-P50, `recommend` +10% on both windows (57% vs 23%; 52% vs 20%); 14-17 Dec -17% vs median. market.md 2d: £1,157 vs P75 £1,295, market +2.2 to +5.5 pts vs STLY, Horse Show 17-21 Dec, Kasabian 18 Dec. **Override:** +11% vs the rule's +10%, kept under P75 and the PL default £1,362. Not covered by your -8% (Nov only) | £129 x 0.542 + £11 x 0.542 = **£76** | Corentin | 2026-11-05 |
| 12 | P08 P09 | **New, a-handback-lastnights.** **+10%** on P08 5-7 Nov (to about £653) and P09 10-12 Nov (to about £428). | PriceLabs 3318167 > DSO 5-7 Nov; 3318172 > DSO 10-12 Nov | comp-central P08 P0 (-48%, n=1), `recommend` +10%. comp-east P09 P0 / P20 (-6% / -15%), `recommend` +10%; 5.0 on 3 reviews gives qp 0 (parity) | £59 x 0.70 + £39 x 0.87 = **£75** | Corentin | 2026-11-04 |
| 13 | P04 | **t-p04-weekly.** Set the synced Barking Airbnb weekly discount to **15%** (policy) from 18%. | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts (or the Smoobu rule for 3562176) | channel.md §1: 6-19 Dec weekly £398.52 / £2,214.00 = 18.0% | **£66.42** per 6-19 Dec stay | Corentin | 2026-11-05 |
| 14 | P06 | **t-p06-open (question).** Is 8-11 Nov meant to sell? If yes, the rule says **+10%** (about £1,086 for 4 n vs £987). | Smoobu > Calendar P06; PriceLabs 3288517 > DSO 8-11 Nov | comp-central: P0 (-28% / -30%), `recommend(0.636, 0.45, 0.0, -0.024)` = +10%. Policy lists P06 as an intentional block, so this is a question first | £987 x 10% x 0.636 = **£63** | Corentin | 2026-11-04 |
| 15 | P13 | **a-raise-1012nov.** 3064856 **12 Nov £176, min 1**. Keep 3090701 at £183 or higher so the twins differ. Restoring your 0% (row 6) gives £159; +10% per the rule gives £175. | PriceLabs 3064856 > DSO 12 Nov | comp-west: 3064856 11-13 Nov P0 (-11.9%), `recommend` +10%. market.md 2b: £151 vs P25 £176 / P50 £214, England v Croatia sold out; min 2 with 13 Nov booked | (£176 - £151) x 0.724 = **£18**. Min-1 unlock not quantified | Corentin | 2026-11-04 |
| 16 | P20 | **a-p20-conversion.** **+5% on 13-15 Nov** (£724 to about £760). Otherwise hold, and fix conversion: photos/parking first, review requests. | PriceLabs 3547481 > DSO 13-15 Nov; Airbnb 1791529331262420081 | comp-east: 13-16 Nov P12 (-29%), `recommend` +5% at 45% vs 36%; December P17-P44, fix-listing (0 reviews vs 18). New booking at P14 / -37.5% | £36 x 0.448 = **£16** | Corentin | 2026-11-05 |
| 17 | P11 | **t-channel-gaps.** On event nights outside the conflict: **26 Nov at least £219**, **23 Dec at least £316**, **3 Jan at least £201**. Fix Booking.com visibility. | PriceLabs 3064196 (+Vrbo) > DSO; Booking.com extranet > Camden | market.md §4/§5: 26 Nov £208, 23 Dec £314, 3 Jan £185 vs fortnight. Policy ranking: click-through 0.81% vs 1.70% | £11 x 0.414 + £2 x 0.441 + £16 x 0.441 = **£13**. Visibility not quantified | Corentin | 2026-11-05 |
| 18 | P05 | **a-p05-earlybird.** Confirm the visible 12% early-booking discount (60+ days) is yours. It is visible, so it fits your preference. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel.md §4: 4-7 Jan card -£152.16 (12.0%); realised £144.48 on 29 Jan-1 Feb. Policy records an early bird for P13 only | £144.48 realised; forward not quantified | Corentin | 2026-11-05 |
| 19 | P11 | **t-p11-commission.** Ask Booking.com whether commission applies to cleaning. 20-22 Nov: £104.24 = 24.2% of room / 18.0% of room + cleaning. 28-31 Oct: 25.0%. | Booking.com extranet > Finance > reservation 162400946 | channel.md §2; comp-central | Up to **£26.82** on this booking if it should be 18% of room (104.24 - 0.18 x 430.11) | Corentin | 2026-11-06 |
| 20 | P20 | **t-p20-delivery (question).** The 20-22 Nov delivery block is still gone; Airbnb sells 21-24 Nov at £807.89. Re-block if it is still needed. | Smoobu > Calendar P20 20-22 Nov | channel.md §7 (`/api/rates`: available); comp-east (20-23 Nov £824). Policy `block_20_21_nov` | Not quantified | Corentin | 2026-11-04 |
| 21 | P12 | **New, t-p12-26nov-price (question).** 26 Nov is now sellable (min 1) at **+25% = £352**. To sit at market, set **0%** (about £303), keeping min 1. | PriceLabs 2699998 > DSO 26 Nov | comp-east: £395 all-in vs 1-night band £213 / 284 / 297 (P100, +39%, n=3). market.md: above P90 £336, no verified event. **Override:** `recommend` gives +5% on the flat-level 30-day lead, but this is a single orphan night priced above P90 | Not quantified | Corentin | 2026-11-06 |

## Top 5 for today
1. **Barking (arrival TODAY, day 4):** block 3-8 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 of confirmed stays can be double-sold). Then block every open night and map 1455 to Smoobu 3562176, or unlist it.
2. **Gap-fill tonight:** set P13 3 Nov to min 1 on both listings (it cannot sell at min 2). If P12 3 Nov goes unsold, set P12 4 Nov to min 1 tomorrow. Also find the source of P12's Smoobu 4 Nov £170 (PriceLabs £196).
3. **Confirm Reyhan's 2 Nov edits against your decisions (about £605 a month):**
   - P11 -5% on 10 Nov-18 Dec, including the darts nights (£1,091, average £218 vs above £300);
   - P13 8-12 Nov -5% vs your 0%;
   - P12 -10% including 17 Nov;
   - P20 16-19 Nov min 2 vs 3;
   - **P20 base 330 vs your 350** (base review not actioned).
4. **Airbnb:** close the monitoring as failed (bookings -43%, paid 0.731x PriceLabs, £2,348 unexplained). Remove the hidden Smoobu 0.765 / 0.900 rules. Clear P05 9 Nov (£253.44 vs £1,435).
5. **Market raises:**
   - P13 Christmas: +10% with the twins about 2% apart, and min 2 on 25-26 Dec (about £479).
   - P05 7-8 Dec and 13-21 Dec to P75 (£419).
   - P04 14-19 Dec at 0% (£76).
   - P13 12 Nov £176, min 1.

## Growth plays

- **Airbnb net rate (KPI: Airbnb room ÷ Smoobu rate).** Today it is 0.765x at 28 days or less, 0.900x at 29-45 days and 1.000x at 62+ days. Target **1.00x before visible discounts by 2026-11-10** (action 2).
  - The test group (P20, P06, P05 on flexible cancellation) has 7 of 11 confirmed Airbnb bookings with 0 cancelled. Review on 7 Nov.
  - Re-measure Airbnb volume over the 14 days after the layers come off.
- **Booking.com.** Since the markup cut: 11 bookings still confirmed, 47 n, £7,732.04 at **0.773x** PriceLabs; net **+22 n / +£2,680.67** (channel.md §5b).
  - Pace was front-loaded: 11 bookings in the first 5.7 days, then 2 in 4 days.
  - Per your direction, Booking.com promotions stay. The lever is the PriceLabs price under them.
  - KPI: bookings per day of at least 1.0 by 2026-11-15.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 vs 4.86; P13 4.67 / 4.31 vs 4.78; P08 4.33 vs 4.87; P06 4.60 vs 4.66; P04 synced 4.11 (9) vs 4.83 (unsynced 4.69 (26)); P05 4.77 vs 4.27; P09 5.0 (3); P20 none vs 4.80 (18).
  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The gap caps P12, P04 synced, P08 and the P13 4.31 twin at -15% (`quality_premium`).
  - Fixes:
    - P12: the arrival message on key collection (the process itself is fixed by policy).
    - P13 4.31 twin: cleanliness and photo accuracy.
    - P20 and P09: review requests.
    - Barking: mapping 1455 keeps its 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.**
  - P20: 0 reviews vs 18; December at fix-listing.
  - P11: the rule moved from fix-listing to +5% today, but click-through is 0.81% vs 1.70%.
  - Free amenity fixes (a-amenities): add the lift on P13, P04, P09 and P12.
- **Gap fill / length of stay.**
  - Today: P13 3 Nov, P12 4 Nov (conditional).
  - Fixed: P12 26 Nov (priced high).
  - Still open: P05 9 Nov and 29 Dec; P13 25-26 Dec (min 3); P13 12 Nov (min 2).
  - Mid-term (91+ nights): 0 in `reservations.csv`.
- **Direct share.** **1.47%** of room revenue on arrivals 3 Nov 2025-2 Nov 2026: Website £4,468 + Direct £1,476 = £5,944 of £403,184.51 (`reservations.csv` 3 Nov, confirmed). Airbnb 62.1%, Booking.com 36.0%.
  - Direct nets £90 per £100 (model, unconfirmed), but it is not the cheapest guest price: Airbnb at 45 days or less sells at £76.50-90 (channel.md §6).
  - Target 5% by 2027-06-30.
- **Event compression** (market.md §4).
  - Like for like: **11 n / £107** (was £126).
  - Full set: 28 n / £530, or 23 n / £211 excluding the P11 darts conflict.
  - P13 12 Nov widened to £18 (action 15). P20's Kahan/Muse nights rest on the fortnight rule only, so they are not proposed.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **67.4%** (68.2% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£170.81** (£171.48) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£115.19** (£116.96) | £129 | 2026-12-18 |
| Booked next 30 (Smoobu) | **61.5%** (177/288; 61.1%) | each unit at least market + 10 pts (below today: P11 41.4% vs 46%) | 2026-11-10 |
| Booked next 60 | **50.6%** (244/482; 50.0%) | at least market + 10 pts (P20 25.4% vs 30%) | 2026-11-17 |
| 7-day pickup, net | 12 bk / 45 n / £9,229.27; **net +33 n / +£6,754.31** | at least 10 bookings a week, net positive | 2026-11-10 |
| 18 Oct raised flats, net since the rise | **+4 n / +£742.70** (+2 n / +£312.59) | positive and rising | 2026-11-09 |
| Booking.com paid ÷ PriceLabs (since the cut) | **0.773x** (11 confirmed); latest 0.933x | median at least 0.80x | 2026-11-15 |
| Airbnb room ÷ Smoobu rate | **0.765x (28 d or less) / 0.900x (29-45 d) / 1.000x (62+ d)** | 1.00x before visible discounts | 2026-11-10 |
| Airbnb bookings, 14 d vs prior 14 (monitoring final) | **-43%** (nights -68%, £ -63%) | back to the prior level | 2026-11-24 |
| PriceLabs-side gap, next 30 (4 Nov-3 Dec) | **£2,656** (£2,009 same dates); next 14 £1,330 | £0 apart from your own overrides | 2026-11-06 |
| Double-sellable Barking stays | **2 stays / £748.90, arrival today** | 0 | 2026-11-03 |
| Missed compression | **11 n / £107** like for like; 28 n / £530 full | under 10 nights | 2026-11-10 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-10; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.27-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (12 months to 2 Nov) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Push status after 09:45Z** on P09, P04, P05, P06, and the source of Smoobu's P12 4 Nov £170. Source: PriceLabs > Sync status; Smoobu > Rates. NOT CHECKED (the run ended about 07:40Z).
2. **Smoobu Airbnb rule settings:** still not read on any apartment; the layers are inferred from cards. Also NOT CHECKED: where the Barking 18% weekly is set, and the P20 x0.944 / P06 x0.850 residuals. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules; Airbnb reservations 162347031 and 162228256.
3. **P05 9 Nov:** why Airbnb prices on £316.80 with a 20% Special offer. Source: Airbnb calendar 1618929775762183214; Smoobu sync log.
4. **Booking.com:** displayed prices, comps, rank and the commission basis are NOT CHECKED (AWS WAF challenge at 07:27:14Z; not circumvented). Source: extranet screenshots.
5. **RGI** needs comp occupancy. Source: PriceLabs Competitor Listings / Market Dashboard (not enabled). STLY exists only for P12.
6. **Windows:** raw PriceLabs covers 4 Nov-2 Jan only, so the 180-day floor/ceiling and the 5- and 7-night rules are NOT CHECKED. The P20 min-stay profile behind 25-26 Dec min 4 is UNKNOWN.
7. **P13 3 Nov:** PriceLabs £124 vs Smoobu £110 on 3064856 is unexplained.
8. **P20 delivery block:** who removed it (cancelled 30 Oct 18:11, actor UNKNOWN).
9. **P15-P19:** need the second-account keys (t-unmapped). Vrbo +8% / Direct -10% are unconfirmed defaults. Marylebone Vrbo ids are missing from PriceLabs (a-tidy).
10. **Events:** WebSearch summaries only. Open conflicts: The Script 21 vs 28 Nov; Mariah Carey 30 Nov vs December dates.

```json
{"scoreboard":{"note":"3 Nov 2026. Last 30 nights = 4 Oct-2 Nov, 13 Smoobu units (kpi_pack portfolio_last30). Forward figures handback-aware, Smoobu confirmed stays as truth (occupancy.md; prices.csv starts 4 Nov). Pickup = bookings made 28 Oct-3 Nov, imports excluded. Booking.com since the 24 Oct markup cut (channel.md §5b). Airbnb ratios from 28 live searches 3 Nov 07:21-07:24Z (channel.md §4). Monitoring final from channel.md §5a (booked 20 Oct-2 Nov vs 6-19 Oct). PriceLabs gap from pricelabs.md H2 on 4 Nov-3 Dec (same dates yesterday £2,009). Direct share from reservations.csv arrivals 3 Nov 2025-2 Nov 2026. RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"67.4% (68.2% yesterday)"},{"label":"ADR last 30","value":"£170.81 (£171.48)"},{"label":"RevPAR last 30","value":"£115.19 (£116.96)"},{"label":"Revenue last 30","value":"£44,923 (£45,614)"},{"label":"Booked next 30","value":"61.5% (177/288; 61.1% yesterday)"},{"label":"Booked next 60","value":"50.6% (244/482; 50.0% yesterday)"},{"label":"7-day pickup","value":"12 bk / 45 n / £9,229; less 4 cancellations 12 n / £2,475 = net +33 n / +£6,754"},{"label":"Raised flats net since 18 Oct","value":"+4 n / +£742.70 (was +2 n / +£312.59)"},{"label":"Booking.com since markup cut","value":"11 confirmed, 47 n, £7,732; 0.773x PriceLabs; net +22 n / +£2,681"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at <=28 days; 0.900x at 29-45 days; 1.000x at 62+ days (day 5)"},{"label":"Airbnb monitoring final (closed, failed)","value":"bookings -43%, nights -68%, £ -63%; post-21 Oct paid 0.731x PL; £2,348 unexplained"},{"label":"PriceLabs-side gap next 30","value":"£2,656 (£2,009 same dates); next 14 £1,330"},{"label":"PriceLabs push freshness","value":"No priced listing pushed overnight without an edit; P09 crosses 24 h 07:53Z, P04/P05 08:54Z, P06 09:39Z; new P12 4 Nov gap -£26"},{"label":"Double-sellable Barking stays","value":"2 stays / £748.90; arrival TODAY 3 Nov (day 4)"},{"label":"Missed compression","value":"11 n / £107 like for like; full 28 n / £530"},{"label":"Direct share","value":"1.47% (12 months to 2 Nov)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 4): unsynced Barking Airbnb 1455876748739910219 still sells 3-6 Nov (guest arrives TODAY) and 6-9 Nov over confirmed stays (£748.90); block 3-8 Nov now, then all open nights, then map to 3562176 or unlist","gbp":748.90},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Monitoring closed as failed; remove hidden Smoobu Airbnb layers 0.765 (<=28 d) / 0.900 (29-45 d), unchanged day 5; layer-only loss £693.57 (P20 +£60.01); check P20 x0.944 and P06 x0.850 residuals","gbp":693.57},
{"id":"t-airbnb-monitoring","status":"done","prop":"Portfolio","priority":"high","title":"Closed 3 Nov: Airbnb monitoring 21 Oct-4 Nov FAILED - bookings -43%, nights -68%, £ -63%; post-21 Oct bookings 0.731x PL, £2,348.39 unexplained; next step a-airbnb-rules"},
{"id":"t-p13-3nov","status":"open","prop":"P13","priority":"high","title":"Not fixed: Shepherd's Bush 3 Nov (tonight) is a 1-night orphan at min 2 and cannot sell; set 3 Nov min 1 on 3064856 and 3090701 now","gbp":80},
{"id":"t-p12-4nov","status":"open","prop":"P12","priority":"medium","title":"New: if Mile End 3 Nov goes unsold, 4 Nov becomes a 1-night orphan at min 2: set 4 Nov min 1 tomorrow morning","gbp":106},
{"id":"t-push-check","status":"open","prop":"P09 P04 P05 P06 P12 P11","priority":"high","title":"P04 gap closed; no priced listing pushed overnight without an edit (slots ~07:53Z P09, ~08:54Z P04/P05, ~09:39Z P06: re-read after 09:45Z); new P12 4 Nov Smoobu £170 vs PL £196; PriceLabs has not seen the P11 20-22 Nov booking","gbp":16},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P09 P11 P12 P20","priority":"high","title":"Widened: next-30 gap £2,656 (£2,009 same dates), mostly Reyhan's re-added DSOs; layers unchanged (P04 -5%, P05 -1%, P09 -18% last-minute; Aggressive occupancy; Booking Recency default): set Custom 0%","gbp":1447},
{"id":"a-p13-record","status":"open","prop":"P11 P13 P12 P20 P04","priority":"high","title":"Reyhan 2 Nov 15:02-23:26Z: P11 -5% 10 Nov-18 Dec re-added (darts £1,091 avg £218 vs >£300); P13 8-12 Nov -5% vs your 0% (re-broken); P12 -10% 16 Nov-13 Dec incl 17 Nov (worse) + new 2-4 / 12-13 Nov cuts; P20 16-19 Nov min 2 vs min 3 (new); P20 base 330 vs 350 (open); P04 -10% vs -8%; record P13 base 250","gbp":605},
{"id":"a-base-review-1102","status":"done","prop":"P01 P05 P06 P09 P11 P12 P13 P20","priority":"medium","title":"Closed: no base change logged 2-3 Nov, so all holds stand (P01 253, P05 550, P06 357, P09 176, P11 286, P12 284, P13 250); P20 330 vs 350 carried in a-p13-record"},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"P13 Christmas: 7-20 Dec +5% / 21-26 Dec +7% on 3064856 (+7% / +9% on 3090701) replacing -5% / -3% (= current x1.10, P50 gap £455), min 2 on 25-26 Dec; P05 29 Dec +100% (£1,354, 1.25x P90) to 0% min 1","gbp":479},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"St John's Wood 7-8 Dec £970 -> about £1,184 (P75) and 13-21 Dec £5,453 -> about £5,857 (P75; replaces Reyhan's -5% on 13-19 Dec)","gbp":419},
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"high","title":"Not fixed (4th check): Airbnb sells 9 Nov at £253.44 room (20% Special offer on £316.80) vs Smoobu £1,435: clear the Airbnb date; to sell, DSO 0% min 1 (~£412)","gbp":313},
{"id":"a-p04-dec","status":"open","prop":"P04","priority":"medium","title":"New: Barking 14-19 Dec DSO 0% instead of -10% (~£1,286 vs £1,157; P75 £1,295; Horse Show 17-21 Dec) and 8 Dec >= £193 (Kehlani)","gbp":76},
{"id":"a-handback-lastnights","status":"open","prop":"P08 P09","priority":"medium","title":"New: +10% on P08 5-7 Nov (P0, -48%) and P09 10-12 Nov (P0/P20, last-minute decay) before handback","gbp":75},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount 18.0% again vs policy 15% (£66.42 on 6-19 Dec)","gbp":66.42},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"Marylebone 8-11 Nov still open, now £987 after the occupancy layer (P0 -28%): intended? If it should sell, rule says +10% (~£1,086)","gbp":63},
{"id":"a-raise-1012nov","status":"open","prop":"P13","priority":"medium","title":"Moved the wrong way: 3064856 12 Nov (England v Croatia, sold out) now £151 after Reyhan's -5%; set £176 with min 1, keep 3090701 >= £183","gbp":18},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Waterford: fwd30 44.8% vs 36% after 10-13 Nov booking sold at P14 (-37.5%); +5% on 13-15 Nov (rule); December fix-listing (0 reviews vs 18)","gbp":16},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Camden: rule now +5% (P2/P7, 41.4% vs 46%); event nights 26 Nov >= £219, 23 Dec >= £316, 3 Jan >= £201; fix Booking.com visibility (CTR 0.81% vs 1.70%)","gbp":13},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early bird (60+ d) again on cards (£152.16 on 4-7 Jan), £144.48 realised: not in policy - yours?","gbp":144.48},
{"id":"t-p11-commission","status":"open","prop":"P11","priority":"medium","title":"Camden commission: 20-22 Nov £104.24 = 24.2% of room / 18.0% of room+cleaning vs 18% booster; 28-31 Oct 25.0%: ask Booking.com whether cleaning is commissioned","gbp":26.82},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Not fixed: Waterford 20-22 Nov delivery block still absent; Airbnb sells 21-24 Nov at £807.89: intended?"},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"New question: Mile End 26 Nov now min 1 but +25% (£352, £395 all-in = P100 +39% vs 1-night band, above P90 £336); 0% (~£303) keeps it at market"},
{"id":"a-p12-26nov","status":"done","prop":"P12","priority":"medium","title":"Done: Mile End 26 Nov min 1 (Reyhan 2 Nov 15:04Z); price question moved to t-p12-26nov-price"},
{"id":"a-p13-twin","status":"open","prop":"P13","priority":"medium","title":"Shepherd's Bush twins identical on all 20 December nights and on Airbnb cards (Reyhan's parent copy): keep ~2% gap (built into a-peak-check)"},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 17 Nov £170 / £207 with +35% still set; 27 Nov £336 / £244 at +50%: confirm; no trim proposed"},
{"id":"a-p12-genius","status":"dropped","prop":"P12","priority":"medium","title":"Dropped: unticking Genius Level 2&3 cuts a Booking.com discount, against Corentin's standing direction (keep Booking.com discounts); stack sizes still reported"},
{"id":"a-bcom-lm","status":"dropped","prop":"P04 P12 P13","priority":"medium","title":"Dropped: reducing Booking.com Last Minute deals is against Corentin's standing direction (keep Booking.com discounts)"},
{"id":"a-bcom-cancel","status":"open","prop":"Portfolio","priority":"medium","title":"7-day cancellations now 4 / 12 n / £2,474.96 (none since 31 Oct 14:36): send rate plans and reasons"},
{"id":"a-amenities","status":"open","prop":"P13 P04 P09 P12 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)"},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change"},
{"id":"a-extra-guest","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests"},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)"},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Unchanged: hold base 284; 12-13 Nov now £205 / £256 after Reyhan's -5% (conflict f)"},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: stale id_map ids (Marylebone Vrbo x3); Vrbo copies pushing; Vrbo +8% / Direct -10% unconfirmed"},
{"id":"a-titles","status":"open","prop":"P04 P11","priority":"medium","title":"Unchanged: titles for Barking and Camden"},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps refreshed (east 619, west 143 rows); still need Booking.com comps and comp occupancy for RGI"},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026"},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown"},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended"},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?"},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts"}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still double-sells 3-6 Nov (arrival today) and 6-9 Nov (£748.90), day 4","evidence":"Live 3 Nov 07:21:15Z/07:21:23Z: £518.20 / £514.20 bookable on 1455 over Smoobu Booking.com £393.18 and Airbnb £355.72; also sells 9-12 Nov, 18-24 Nov, 6-19 Dec."},
{"agent":"pricelabs","severity":"high","ref":"P11 P13 P12 P20","title":"Reyhan's 2 Nov 15:02-15:05Z / 23:26Z edits reverse yesterday's fixes: P11 -5% incl darts (£1,091), P13 8-12 Nov -5% vs 0%, P12 -10% incl 17 Nov, P20 16-19 Nov min 2 vs 3","evidence":"get_user_logs 35 entries, all Reyhan; live overrides; pricelabs.md H1."},
{"agent":"pricelabs","severity":"high","ref":"P20","title":"Base review not actioned: P20 still 330 / min 200 vs Corentin's 350; no base_price log after 2 Nov 00:16:02Z","evidence":"get_user_logs; listings.csv 3 Nov; PL rec 347; comps Nov P0-P30, Dec P17-P44."},
{"agent":"channel","severity":"high","ref":"Portfolio","title":"Airbnb monitoring final: FAILED - bookings -43%, nights -68%, £ -63%; post-21 Oct paid 0.731x PL with £2,348.39 unexplained","evidence":"channel.md §5a: 13 / 53 / £10,391.53 vs 23 / 164 / £28,179.02; 10 of 12 bookings below policy."},
{"agent":"channel","severity":"high","ref":"P20 P12 P13 P05 P06 P08 P04","title":"Hidden Airbnb layers 0.765 / 0.900 unchanged day 5; boundary exact lead 28/29","evidence":"28 live searches 07:21-07:24Z; comp-west reads 0.90 x 0.85 on P13."},
{"agent":"channel","severity":"high","ref":"P11","title":"P11 20-22 Nov £430.11 = 0.933x PL £461 (Mobile x Genius exact), booked after Reyhan re-added -5%; commission 24.2% of room / 18.0% of room+cleaning","evidence":"channel.md §2; Smoobu priceElements; get_user_logs 15:05:01Z; booking 23:10."},
{"agent":"channel","severity":"medium","ref":"P20","title":"P20 10-13 Nov £510 = 0.722x PL £706; £90.10 under policy LM15 (layer £60.01 + x0.944 £30.09); sold at comp P14 (-37.5%)","evidence":"channel.md §2; comp-east."},
{"agent":"channel","severity":"high","ref":"P05","title":"P05 9 Nov still sells on Airbnb at £253.44 room vs Smoobu £1,435 (4th check)","evidence":"channel.md §3; comp-central control 29 Dec flows correctly."},
{"agent":"pricelabs","severity":"medium","ref":"P12","title":"New sync gap P12 4 Nov: PriceLabs £196 vs Smoobu £170; P04 9-13 Nov gap closed","evidence":"kpi_pack sync_issues; prices.csv; pricelabs.md C1."},
{"agent":"occupancy","severity":"medium","ref":"P13 P12","title":"P13 3 Nov orphan cannot sell tonight (min 2); P12 4 Nov becomes an orphan tomorrow if 3 Nov unsold; P12 26 Nov fixed at +25%","evidence":"occupancy.md orphans; pricelabs.md H3."},
{"agent":"market","severity":"medium","ref":"P13 P05 P04","title":"Market raises: P13 Christmas +£455 to P50, P05 7-8 / 13-21 Dec to P75 (+£214 / +£404), P04 14-19 Dec to P75 (+£138), P13 12 Nov to >= £176","evidence":"market.md 2b-2d, §5; comp-west / comp-central / comp-east recommend raise."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap widened: £2,656 next 30 vs £2,009 same dates, from Reyhan's re-added DSOs","evidence":"pricelabs.md H2."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct raised flats net +4 n / +£742.70; bookings/day 1.08x vs 0.86x unraised; hold bases","evidence":"occupancy.md base-rise tracker."}
],
"top5":[
"Barking (arrival TODAY, day 4): block 3-8 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 double-sellable), then all open nights; map to Smoobu 3562176 or unlist.",
"Gap-fill tonight: P13 3 Nov min 1 on both listings (cannot sell at min 2); P12 4 Nov min 1 tomorrow if 3 Nov unsold; find the source of P12 Smoobu 4 Nov £170 vs PL £196.",
"Confirm Reyhan's 2 Nov edits vs your decisions (~£605/month): P11 -5% incl darts (£1,091, avg £218 vs >£300), P13 8-12 Nov -5% vs 0%, P12 -10% incl 17 Nov, P20 16-19 Nov min 2 vs 3, P20 base 330 vs your 350 (base review not actioned).",
"Airbnb: close monitoring as failed (bookings -43%, paid 0.731x PL, £2,348 unexplained) and remove the hidden Smoobu 0.765 / 0.900 rules; clear P05 9 Nov (£253.44 vs £1,435).",
"Market raises: P13 Christmas +10% with twins ~2% apart and 25-26 Dec min 2 (~£479); P05 7-8 and 13-21 Dec to P75 (£419); P04 14-19 Dec to 0% (£76); P13 12 Nov £176 min 1."
],
"per_property":[
{"ref":"P01","change":"No change; sold to the 20 Dec handback; self-pushed 05:54Z."},
{"ref":"P02","change":"Intentional block; self-pushed 00:24Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 03:14Z via Channex."},
{"ref":"P04","change":"No booking; 1455 still double-sells 3-6 / 6-9 Nov (arrival today, day 4); 9-13 Nov Smoobu gap closed; weekly 18% again; fwd30 55.2% vs 23% (window roll)."},
{"ref":"P05","change":"No booking or edit; 9 Nov Airbnb £253.44 vs £1,435 unchanged; 29 Dec £1,354; Reyhan -5%/-7% confirmed still set; fwd30 75.9% vs 40%."},
{"ref":"P06","change":"12-15 Nov booking now seen by PriceLabs; 8-11 Nov rose to £987 (from £891, occupancy layer); still P0."},
{"ref":"P07","change":"Intentional block; self-pushed 04:38Z."},
{"ref":"P08","change":"No booking; 5-7 Nov £186/205/203 at P0 (n=1); handback 13 Nov."},
{"ref":"P09","change":"No booking; 10-12 Nov fell to £117/127/145 (last-minute decay), comps P0/P20; push crosses 24 h 07:53Z."},
{"ref":"P10","change":"No change; sold to the 18 Nov handback."},
{"ref":"P11","change":"New Booking.com 20-22 Nov £430.11 at 0.933x (not yet seen by PriceLabs); Reyhan re-added -5% 10 Nov-18 Dec (darts £1,091); fwd30 41.4% vs 46%; rule now +5%."},
{"ref":"P12","change":"No booking; Reyhan -10% 2-4 Nov, -5% 12-13 Nov, -10% 16 Nov-13 Dec, 26 Nov +25% min 1 (£352); new 4 Nov sync gap £196 vs £170; pace30 -8.8%."},
{"ref":"P13","change":"No booking; Reyhan re-added -5% 8-12 Nov (vs your 0%) and -5% 7-20 Dec; 12 Nov £151; twins identical in December; 3 Nov orphan unsellable tonight."},
{"ref":"P14","change":"Numbers only: 75% of open nights at £500 minimum; 0% vs 42%."},
{"ref":"P20","change":"New Airbnb 10-13 Nov £510 at 0.722x (P14 vs comps); Reyhan 16-19 Nov -2% min 2 (vs policy 3); base 330 unchanged; delivery block still absent; fwd30 44.8% vs 36%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 255)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback; no sellable nights (occupancy.md)."},
{"ref":"P05","base":"550 (rec 548)","recommendation":"Hold 550; use date overrides","reason":"75.9% vs 40% / 67.8% vs 38%; comps P12/P22, recommend +25%; levers 7-8 Dec, 13-21 Dec, 9 Nov, 29 Dec (comp-central; market.md 2c)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Only 8-11 Nov sellable; P0, recommend +10% at date level (t-p06-open) (comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"3 nights before the 26 Nov handback; 87% vs 36% (comp-east)."},
{"ref":"P11","base":"286 (rec 285)","recommendation":"Hold 286","reason":"41.4% vs 46% / 44.1% vs 39%; comp P2/P7, recommend now +5% on both windows - equal to Reyhan's re-added -5% (conflict b2), so restore that rather than move the base (comp-central)."},
{"ref":"P12","base":"284 (rec 273)","recommendation":"Hold 284; no base cut on top of Reyhan's -10%","reason":"62.1% vs 40%; pace30 -8.8%; Nov band P25-P50 with quality cap = hold (comp-east; occupancy.md)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"72.4% vs 41%; ~P61 of 2 BR band; recommend +10% on Nov/Dec stays (comp-west; market.md)."},
{"ref":"P20","base":"330 (Corentin 350; rec 347)","recommendation":"Conflict for Corentin: confirm 350 or record 330 and £200 floor; not a new proposal","reason":"No base change since 2 Nov 00:16Z; rec 347; comps Nov P0-P30 / Dec P17-P44; new booking sold at P14; gap is 0 reviews vs 18 (comp-east; pricelabs.md H1)."}
]}
```

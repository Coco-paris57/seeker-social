# Seeker Estates - Daily revenue report, 2026-11-14 (Saturday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-14/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-14/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-13/daily-report.md` and its JSON, the dashboard action list (14 Nov, before this step), the full id list, and the overnight brief (Dispatcher: `reservations.csv` 14 Nov vs 13 Nov, full-row diff).
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/base/max come from `kpi_pack` `settings` (14 Nov). No base, min, max or push setting changed since 13 Nov (pricelabs, live `get_listing_data`; `get_user_logs` 0 entries on 13-14 Nov for listing, group and account).
- I used no guest data and no booking reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 block change of 12 Nov is still a question for you (t-p06-2229open), not an opportunity. P06 numbers are reported; no P06 price proposal is made unless you confirm the reopening.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701).
- Not raised again: Booking.com +10% markup (12 Nov), Visibility Booster commission (Camden 18%: both new Camden stays are exactly 18.00% of room + cleaning), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests, P04 min-stay 3.
- Nights after each handback are not inventory: P08 after 13 Nov (now fully out), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion. The Camden stack is now verified and is reported for size only.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **t-smoobu-manual-1213 is fixed, and the evidence supports the PriceLabs auditor's reading, not channel's.**
   - pricelabs H1: every 12-13 Nov Smoobu-side cut was overwritten by PriceLabs pushes (P12 13 Nov 07:22:41Z and 14 Nov 05:49:56Z; P06 / P04 / P20 13 Nov 09:07:38-53Z). Smoobu = PriceLabs `price` on every open night in the next 30 (0 price, status or min-stay mismatches outside the two unregistered bookings). P20 15 Nov is back to min 3.
   - The manual values (P12 250/250/266, P06 222/222/233, P20 270/222/210/222, P04 130/135/140) are now PriceLabs' `user_price`, which is PriceLabs' read of Smoobu at its last refresh. That is what you would see if someone typed them into Smoobu and PriceLabs then read and overwrote them.
   - channel §5 says the lower near-term Smoobu numbers "are PriceLabs' own `price` field, not a manual Smoobu edit". **That is right for today's numbers and wrong for 12-13 Nov.** Its examples (P11 18 Nov 143 vs 160; P11 28 Nov 260 vs 292; P06 24-28 Nov £1,553 vs £1,906) are PriceLabs re-pricing downward at the 13 Nov refreshes, with `user_price` still holding the previous Smoobu value. On 13 Nov, by contrast, Smoobu held a third value **below both** the old and the new PriceLabs `price`, with round figures and min-stay cuts, and 0 log entries. A PriceLabs push cannot put Smoobu below PriceLabs' own `price`. So both things happened: manual cuts on 12-13 Nov (now gone), then PriceLabs cuts on 13 Nov (live, and what both new P11 stays and the P06 stay were sold on).
   - Who made the 12-13 Nov edits: still UNKNOWN. Closed as fixed; the "who" stays a data gap.
2. **PriceLabs has not registered any of the three overnight bookings.** P11 3064196 last refreshed 13 Nov 10:47:05Z, before both new stays (13 Nov 23:20 and 14 Nov 05:48, Smoobu time). P06 3288517 last refreshed 13 Nov 09:07:38Z, before the 24-29 Nov stay. The P11 cancellation is registered (pricelabs C1, C2).
   - P11 `occupancy_next_30` reads **33%** in PriceLabs vs **60%** in Smoobu (18/30). The Aggressive occupancy profile is pricing every open P11 night against 33%.
   - kpi_pack `forward_occ_30` is therefore stale for P11 (58.6%) and P06 (31.0%). **I use Smoobu: P11 60.0%, P06 62.5% (10/16 non-blocked).**
3. **The +10% Booking.com markup reached Booking.com** (channel §1). Both new Camden stays fit paid = Σ ceil(Smoobu × 1.10) × 0.9 × 0.9 × 0.9 × 0.95 to the penny (£605.29 and £863.61). ×1.00 misses by at least £2.37; ×1.15 by at least £6.34. The Last Minute deal acted as **10%** (your 24 Oct record), not 15%, so yesterday's question (a) is answered and yesterday's "fifth 10%" model is withdrawn.
   - pricelabs M1 found a candidate stack within £1.23 (no ceil); occupancy found the same within £1.25. channel's ceil version matches exactly, so I use it.
4. **P06 22-29 Nov is no longer Blocked in PriceLabs.** Yesterday's "PriceLabs still Blocked" is resolved: the 13 Nov 09:07:38Z refresh re-priced 22-29 Nov to **£2,399 (from £2,982 in Smoobu, -19.6%)**. The 24-29 Nov stay sold on that lower price.
5. **P06 22-23 Nov.** occupancy and channel: not an orphan; it sells only as a 22-24 Nov 2-night stay (22 Nov min 2; Airbnb offers it, room £437.58 = 0.765 × £572). pricelabs, market and comp-central call it a "2-night orphan" that can sell as 22-24 Nov. Same facts: **a 2-night gap that one stay can fill.** 29 Nov (£274, min 4) is a true orphan.
6. **P11 darts 13 Dec.** Sold inside 9-14 Dec. Smoobu £186; Booking.com list £205 (ceil × 1.10); paid about **£141.90-£141.97** (pro rata, occupancy/comp-central/channel). The remaining darts nights 14-17 Dec are £201/£209/£216/£233 = **£214.75 average**; gap to your >£300 on those 4 nights **£341** (market §2). 13-17 Dec Smoobu average is still £209.
7. **P20 forward occupancy: 64.3% (18/28 non-blocked), from Smoobu** (occupancy). comp-west has 60.0% (18/30, counting 18-19 Nov as open). I use 64.3%.
8. **P11 near-term fell about 11% overnight with no edit** (market §2, comp-central): 18 Nov 160 -> 143, 22 Nov 207 -> 184, 27 Nov 293 -> 261, 28 Nov 292 -> 260. This happened at the 10:47Z refresh, right after the 26-29 Nov cancellation dropped PriceLabs' occupancy reading from 43% to 33%. **28 Nov then sold at the cut price.**
9. **Booking.com ratio "paid / PriceLabs since cut" (0.774x yesterday) was not recomputed today.** channel gives counts and £ only. Reported as such.

## Executive summary

1. **PriceLabs is blind to three new bookings and keeps discounting Camden.**
   - P11 reads occupancy 33% vs Smoobu 60%; the Aggressive occupancy profile and Booking Recency price the 12 open nights in the next 30 against that (pricelabs C1).
   - The overnight -11% on P11 15-28 Nov came from that refresh (correction 8).
   - **Sync Now on P11 3064196 and P06 3288517 today** (new t-pl-sync-1411). P11's last push crosses 24 h at 10:47Z today.
2. **P11 Camden: first two bookings at +10%, both sold far under the market.**
   - 28 Nov-2 Dec £605.29 (£151.32/n) and 9-14 Dec £863.61 (£172.72/n). Room = 0.762-0.763 × Smoobu. Owner nets **£62.47 per £100 Smoobu base** after the 18% booster (model £93.50).
   - vs comps: **-50% / -56% all-in vs the kept median, -41% / -40% vs the wider sample** (comp-central). Every one of the 17 wider 2BRs on 9-14 Dec was above us.
   - One cancellation (26-29 Nov, £680.40, booked 3 Nov) was replaced by one night (28 Nov) at a lower rate. Net P11: +6 n / +£788.50.
   - **New 8 Dec orphan** (£202, min 3) between the 5-8 Dec and 9-14 Dec stays.
   - Darts 13 Dec sold at about £142 room vs your >£300 (correction 6).
   - Per your direction, **no Booking.com discount change**. The levers are PriceLabs: Sync (row 1), a-discount-cut (P11 £557 of the gap), and Reyhan's -3% on the darts nights (confirm or revert).
3. **P06 Marylebone (intentional-block listing): the reopened nights sold, cheaply.**
   - Airbnb 24-29 Nov, room **£1,009.82 = 0.650 × Smoobu** (£1,553 after the 09:07Z push) = 0.765 hidden layer × a further **0.85 that no rule on file explains**. **-38% vs the same-stay comp (n = 1), -44% vs the 24-26 Nov median (n = 6)** (comp-central).
   - Gap vs policy -£543.18. **a-airbnb-rules realised cost now £2,906.29** (day 16).
   - Left behind: 22-23 Nov 2-night gap, 29 Nov 1-night orphan (min 4). Who reopened 22-29 Nov and why: UNKNOWN. **t-p06-2229open is still your question.**
4. **With the manual Smoobu cuts gone, three flats moved off their supported level.**
   - **P12 17-19 Nov is +14.1% vs the band (P78)**; it was at parity at the Smoobu-side level. About -10% on 17-18 Nov is supported (your call).
   - **P04 6-13 Dec fell about 10% overnight with no edit** (£1,466 -> £1,319); now **-22% to -26% vs comps**, below the -15% quality floor; about +10% supported. November is -27% to -36% vs comps.
   - **P13 10-13 Dec fell on Airbnb on both twins** (3064856 -7.6%, 3090701 -3.7%): both now sell at 0.765 × PriceLabs inside about 28 days, while **policy records the Shepherd's Bush last-minute rule as -10% within 14 days**. +5-10% on 10-12 Dec and 0% on 18-26 Dec are supported vs Reyhan's -5% (your call).
5. **Standing items.**
   - P20: 20-24 Nov P0 of 7 (-27.1%); +15.8% on 20-21 Nov supported once you confirm the delivery dates; 5 Dec orphan, 5th day.
   - Barking 1455 day 15 (now repricing by itself: 18-21 Nov £525.80 -> £571.00).
   - a-discount-cut **£650 next 14 / £1,502 next 30**; missed compression **19 n / £419**.
   - Booking.com since 24 Oct: **14 confirmed / 58 n / £9,291.49; 8 of 22 cancelled (36%)**; 2 bookings since +10%.
   - 18 Oct base rises: **+14 n / +£4,677.30 like-for-like**; P11 now **-5 / -£1,566.77**.

**Last 30 nights (15 Oct-13 Nov, 13 units):** occupancy **61.3%**, ADR **£172.34**, RevPAR **£105.61**, revenue **£41,189.17**, **239 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 61.8% / £171.30 / £105.85 / £41,282.39 / 241 n.

**Next 30 (14 Nov-13 Dec):** **58.9%** booked (152/258; yesterday 56.1%, 147/262). **Next 60 (14 Nov-12 Jan):** **47.7%** (209/438; yesterday 46.3%).
- Source: occupancy section, live Smoobu GET 07:19:08Z, handback-aware.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, nights after each handback.
- Reconciliation: new bookings +14 (P06 +5, P11 +4 and +5); cancellation -3 (P11 26-28 Nov); 13 Nov out -7; 13 Dec in +1. 147 + 14 - 3 - 7 + 1 = 152.

**7-day pickup (bookings made 8-14 Nov, to 07:19Z):**
- Gross: 7 bookings / 35 n / £7,803.06. Still confirmed: 4 / 20 n / £5,440.89 (= kpi_pack `pickup_7d`).
- Cancelled in the window: 6 / 23 n / £4,277.28.
- **Net: +12 n / +£3,525.78** (yesterday +16 n / +£4,069.60). 7 Nov leaving the window -15 n / -£2,342.14; new bookings +14 n / +£2,478.72; P11 cancellation -3 n / -£680.40.

## The three overnight bookings

**Source:** occupancy, pricelabs C1/C2/M1, channel §1-§2, comp-central. Smoobu rate at booking = today's Smoobu (each flat's last push was before the booking and there has been no log entry since; Smoobu keeps no price history).

| Flat / stay | Room paid | Smoobu at booking | Paid / Smoobu | Comps (same dates) | In PriceLabs? | Left behind |
|---|---|---|---|---|---|---|
| **P11** Booking.com 28 Nov-2 Dec (4 n, 15 d lead) | **£605.29** (£151.32/n); commission £135.77 = 18.00% (booster) | 260/188/170/176 = £794 (28 Nov was £292 before the 10:47Z push) | 0.762 (0.69255 of ceil ×1.10 list £874) | kept median £373.75 (n = 1), wider £321.38 (n = 8): **P0 / -60% room, -50% all-in kept; -41% all-in wider** | No (shows open) | 26-27 Nov reopened, now part of a 22-27 Nov 6-night run (£184-261, min 3); 2-4 Dec exact 3-night run |
| **P11** Booking.com 9-14 Dec (5 n, 25 d lead) | **£863.61** (£172.72/n); commission £182.27 = 18.00% | 197/220/263/266/186 = £1,132 | 0.763 (0.69255 of list £1,247) | kept median £455.60 (n = 5), wider £340 (n = 17): **P0 / -62% room, -56% all-in kept; -40% all-in wider** | No | **8 Dec 1-night orphan** (£202, min 3); 14-18 Dec 5-night run (sellable) |
| P11 cancellation 26-29 Nov (booked 3 Nov) | -£680.40 | PriceLabs dropped the nights 236/293/292 -> 210/261/260 when they reopened | - | - | Yes (registered) | - |
| **P06** Airbnb 24-29 Nov (5 n, 11 d lead) | **£1,009.82** (£201.96/n); commission £176.52 = 15.5% | 291/293/303/338/328 = £1,553 (were £1,906 before the 09:07Z push) | **0.650** = 0.765 × 0.85 (0.530 vs the pre-push prices) | same-stay comp £326 (n = 1): **P0 / -38%**; 24-26 Nov median £363.75 (n = 6): **-44%** | No | **29 Nov orphan** (£274, min 4); 22-23 Nov sellable only as 22-24 Nov |

- **The Camden stack (a-p11-bcom-stack):** three 10% layers × one 0.95. The three 10% layers are most consistent with **Last Minute 10%, Mobile 10% and Genius Level 1 10%**, all on record in policy; the 0.95 with occupancy pricing at -5% for 1-4 guests (policy `non_refundable_rate`). **All four are recorded promotions, so per `booking_stacked_promotions` this is a size, not a leak:** -£652.10 vs list on £2,121 (-30.7%), -£457.10 vs Smoobu. Dropping any one 10% layer would have added £163.21 on these two stays; the -5% layer £77.31. **Per your direction I propose no change to any of them.** Which three applied is NOT CHECKED (extranet breakdown; Booking.com WAF 07:23:29Z, not bypassed).
- **What the stack means for pricing:** with the stack, a Smoobu rate of £100 reaches the owner as £62.47. The only lever that respects your direction is the PriceLabs rate itself, which is already P0 on every open and sold P11 stay (comp-central: -20% to -65% vs median; no cut supported anywhere; `recommend` +5% 30d / +10% 60d).
- **P06's extra 0.85** is not the 15% weekly (7+ nights) and not the Shepherd's Bush LOS 5+ (-8%/-10%). P13's 5-night card today shows 0.9 × a visible 10% instead. Source: Smoobu > Channel Manager > Airbnb > Marylebone default pricing rules, or Airbnb listing 1671691529957957272 > Pricing > Discounts: NOT CHECKED.

## P06 Marylebone 22-29 Nov opened (intentional-block listing)

| Item | Value (source) |
|---|---|
| Change | Smoobu "Blocked channel" record modified 12 Nov 12:59:51 (Smoobu time); start 22 Nov -> 30 Nov. No block changed overnight (occupancy) |
| Sold | 24-29 Nov, £1,009.82 room, 0.650 × Smoobu, -38% to -44% vs comps (above) |
| Still on sale | **22-23 Nov** £282 / £290 (min 2 / 3): sells only as 22-24 Nov (Airbnb room £437.58); P0 / -8% vs median £307.50 (n = 5), under market P25 (comp-central, market). **29 Nov** £274 min 4: cannot sell (block from 30 Nov) |
| PriceLabs | Shows 22-29 Nov open and re-priced (£2,399); 24-28 Nov **not registered** as booked (pricelabs C2) |
| Forward | 62.5% of 16 non-blocked nights (10/16) vs market 50% (occupancy) |
| Who / why | UNKNOWN (no Smoobu user field; 0 PriceLabs log entries) |
| Question | **Intended?** If yes: Sync Now on 3288517, add a date note to `policy.json intentional_blocks`, and (your call) 29 Nov min 4 -> 1 so the orphan can sell. If no: re-block 22-23 and 29 Nov in Smoobu (24-29 Nov is sold) |

## Reyhan's changes, for you to confirm or revert

**Source:** pricelabs H2 and `get_user_logs`. **0 PriceLabs log entries since 11 Nov 17:16:47Z.** Every 9-11 Nov setting is still live. `policy.json` records none of them.

| # | Ref / setting | Your standing decision | Today's evidence | My read |
|---|---|---|---|---|
| b1 | **P04 base 220 -> 200** | Pack/`id_map` 220; PriceLabs recommends 221 | comp-east: 18-24 Nov **-27% to -36%** vs comps (NL P33); 6-13 Dec -22% to -26%; `recommend` 30d raise +10%; base +12.4% vs P50 (pricelabs M3) | **Revert to 220 recommended.** £2,387 (15 open nights next 30, pricelabs H3) × 0.10 × 0.467 = **£111** (upper bound) |
| b2 | **P11 22 Nov-18 Dec -3%** (darts 13-18 Dec) | Darts +5% "leave as it is" (24 Oct); average above £300 (21 Oct) | **13 Dec sold at about £142 room** (Smoobu £186); 14-17 Dec average £214.75, gap £341 to policy (market §2); 14-18 Dec comp median £394.60 all-in (n = 8), P0 / -42% (comp-central); market 14-18 Dec -6.8 to +1.0 vs STLY | **Against your decision: confirm or revert.** Revert to +5% on 14-18 Dec: £1,141 × (1.05/0.97 - 1) × 0.762 × 0.50 = **£36**. Even reverted the average stays under £300; the rest is the occupancy profile (a-discount-cut) |
| b3 | **P04 14-17 Nov min 2** | Never under 3 nights | 14-17 Nov booked, so no exposure (comp-east) | Confirm or revert so it is not copied forward |
| b4 | P04 18-24 Nov -5% | -8% on 1-25 Nov | comps -27% to -36%; +10% supported by comps; market below STLY on 6 of 7 nights (market §2) | **Confirm -5%** (the comps support more, not less; market soft, so no raise proposed) |
| b5 | **P04 6-22 Dec -5%** | Not covered | **6-13 Dec cut a further ~10% by the algorithm overnight** (£1,466 -> £1,319; uncustomized and overrides unchanged); now -22% to -26% vs comps; 14-20 Dec -4% to -12% (in range); market 11-13 Dec +5.7 to +9.6 vs STLY | **Remove on 6-13 Dec, keep 14-22 Dec.** £1,319 × 0.0526 × 0.467 = **£32**. The other half of the +10% comes from a-discount-cut |
| b6 | **P13 10-26 Dec -5%** | Not covered; against a-peak-check | Market +1.1 to +25.4 pts on all 17 nights; under P50 on 13 of 17 (market §2); 10-13 Dec cheaper twin P0 / -21.3% (comp-west) | **Revert on 10-12 and 18-26 Dec** (row 12) |
| b7 | P05 29 Nov-2 Dec -5% | Not covered | 29 Nov-3 Dec P0 / -14% vs comps (comp-central) | Confirm or revert. Not re-quantified today |
| b8 | P05 21 / 29 Dec +300% min 1; max 3,500 | Not covered | £2,073 / £2,647 (2.3-2.4 × market P90) | Confirm intent (row 9) |
| b9 | P12 14-20 Nov and 30 Nov-3 Dec +5% | None | **17-19 Nov now +14.1% (P78)**; 1-3 Dec +12.1% (P67), 2-4 Dec +12.7% (comp-east) | Your call (row 16): revert on 17-18 Nov and 30 Nov-3 Dec |
| b10 | P20 min 2 on 16-17 and 22-24 Nov; base 330 | Min 3 to 30 Nov; base 350 | 15 Nov back to min 3 (channel §5) | Confirm or revert |
| b11 | P14 min 500 -> 450 | `special_setups.P14` | 71 of 180 open nights at £450 (pricelabs M2); P100 / +36% to +90% (comp-central); 0% vs 48% | **Conflicts with your special setup:** confirm 450 (and update policy) or revert. No proposal |
| b12 | P06 14-17 Nov -10% | Intentional block (numbers only) | 15-17 Nov now £211/£210/£216, below the manual £222-233; comps P0 / -19% to -30% | Numbers only (row 3) |

**If you revert as recommended** (P04 base, P11 darts, P04 6-13 Dec): £111 + £36 + £32 = **£179** (upper bound). P13 is in row 12 (£83).

## Base review

`base_price` is unchanged on every listing since 10 Nov (pricelabs). Base vs market P50 is from pricelabs M3 (13 Nov `market.csv`), except P06 and P11, which use today's new `market.csv` rows (market §1).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 16 non-blocked nights to the 20 Dec handback; base -3.8% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (was 220)** / 221 | 46.7% vs 25%; November -27% to -36% vs comps; 6-13 Dec -22% to -26%; base +12.4% vs P50 | **Conflict: confirm 200 or revert to 220.** I recommend reverting |
| P05 | 550 / 537 | 70.0% vs 45%; 7-8 / 13-14 Dec P25 (-19% / -18%); qp +0.15; `recommend` +25%; base -5.7% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 62.5% of 16 non-blocked vs 50%; base -14.2% vs today's P50 £416 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback; no sellable night | **Hold; off the agenda** |
| P11 | 286 / 281 | 60.0% vs 50% (Smoobu); every open and sold stay P0-P20, -20% to -65% vs median; `recommend` +5% 30d / +10% 60d; base -2.1% vs today's P50 £292 | **Hold 286.** No cut supported. Levers: Sync (row 1), a-discount-cut, the darts override |
| P12 | 284 / 284 | 46.7% vs 43%; **pace30 -37.8%**; band P40-P100; base +37.2% vs P50 | **Hold 284; correct open nights with DSOs** (a-p12-trim) |
| P13 | 250 / 239 | 76.7% vs 46%; 60d 50.0% vs 38% | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 48%; P100 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 64.3% vs 39%; 43.1% vs 30% (60d); 0 reviews; base +29.4% vs P50 | **Conflict: confirm 350 or record 330** |

## What changed since 13 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights: 18-22 Nov and 24-29 Nov) | **+14 n / +£4,677.30** (yesterday +8 / +£3,888.80) |
| Raised, excluding only P06 18-22 Nov (yesterday's method) | +19 n / +£5,687.12 |
| Raised, including P06 | **+23 n / +£6,543.91** (made 26 / 97 n / £21,179.23; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 |
| P04 | +46 n / +£1,625.79 |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 **0 n / £0**; **P05 +12 / +£4,915.21**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; **P11 -5 / -£1,566.77** (was -11 / -£2,355.27: two new stays +9 / +£1,468.90, one cancellation -3 / -£680.40); P12 +4 / +£227.79.
- **Reading:** without P05 the raised group is +2 n / -£237.91 (yesterday -4 / -£1,026.41). Hold the bases. P11 improved on volume but both new stays sold at P0 / -40% to -56% vs comps, so its problem is still the PriceLabs discounting and conversion, not the base.
- **Caveat:** the rise cannot be separated from the 24 Oct and 12 Nov markup changes, Booking.com promotions, Reyhan's overrides or the P06 block changes. n = 1-8 bookings per flat.

### Per property
| Ref | Change since 13 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked (who: UNKNOWN); PriceLabs 271/268/237 (£776). If reopened £308.33/n all-in = P14 / -16.6% vs stored median £369.67 (n = 7), P25 / -9.1% vs band £339.17. Pickup -3 / -£720.90 (18-21 Dec cancellation, inside the 7-day window). Base-rise 0. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy stale since 24 Feb. |
| P04 | Smoobu-side cut 18-20 Nov gone (now 148/151/154; Airbnb £163/n). **6-13 Dec cut ~10% by the algorithm, no edit** (£1,466 -> £1,319), now -22% to -26% vs comps. November -27% to -36%. Synced listing 4.2 (10) (was 4.11 (9)). 1455 bookable on all 11 runs (day 15), repricing by itself. Weekly 18% (£60.16 over policy on 6-19 Dec). Gap n30 £762. |
| P05 | No edit. 21 Dec £2,073 / 29 Dec £2,647 (+300% min 1); 7-8 Dec £919 (P25 / -19%); 13-14 Dec £982 (P25 / -18%). Early booking 12% and LOS 10% still visible. Base-rise +12 / +£4,915.21. |
| P06 | **24-29 Nov sold on Airbnb (£1,009.82, 0.650 × Smoobu, -38% to -44% vs comps)**; PriceLabs dropped Blocked on 22-29 Nov and re-priced -19.6% but has not registered the stay. 22-23 Nov 2-night gap; 29 Nov orphan (min 4). Smoobu-side 15-17 Nov cut gone (now £211/£210/£216, lower than the manual level). Fwd 62.5% of 16. |
| P08 | Handed back (last night 13 Nov). |
| P09 | No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70. |
| P10 | Booked to the 18 Nov handback. |
| P11 | **Two new Booking.com stays (28 Nov-2 Dec £605.29; 9-14 Dec £863.61) and one cancellation (26-29 Nov £680.40).** +10% proven to reach Booking.com; stack exact (0.69255 of list); nets £62.47 per £100. Both sold 40-56% under comps. Darts 13 Dec sold (~£142 room). New 8 Dec orphan. PriceLabs has not registered either stay (occupancy 33% vs 60%). Near-term -11% overnight with no edit. Fwd30 60.0% vs 50%. Base-rise -5 / -£1,566.77. |
| P12 | Smoobu-side cut on 17-19 Nov overwritten; **17-19 Nov now +14.1% vs band (P78)** at 269/275; 20 Nov 290 -> 322; 11-12 Dec 290/296 -> 317/323; 26 Nov £306 P100 / +27.7%; 30 Nov-3 Dec +5.5%, 7-10 Dec +7.4%, 11-14 Dec +6.8% vs band. Pace30 **-37.8%** (-12 n / -£1,746.53). |
| P13 | **10-13 Dec both twins fell on Airbnb** (247.00 / 207.67 all-in, both 0.765 × PriceLabs). Reyhan's 10-26 Dec -5% unchanged. 13 Dec twins swapped order (3064856 199 -> 234, 3090701 210 -> 187; cause NOT CHECKED). 14-17 Jan twins identical on Airbnb (£664.80 each). Fwd30 76.7% vs 46%. |
| P14 | Min 450; 71 of 180 open nights at £450; P100 / +36% to +90%; 0% vs 48%. Numbers only. |
| P15-P19 | Not connected (t-unmapped). P15 comp 1557062894259099964 returned again. |
| P20 | Smoobu-side cut 13-17 Nov gone (15 Nov back to min 3). 20-24 Nov £1,179 (£216.00/n all-in), **P0 of 7 / -27.1%**; comps +6% overnight. 14 Nov tonight unsold. 5 Dec orphan (£306, min 3), 5th day. Fwd30 64.3% vs 39%. |

### Open plan items: status today
| Item | Status 14 Nov (evidence) |
|---|---|
| t-smoobu-manual-1213 | **Done: fixed.** All manual cuts overwritten by PriceLabs pushes; Smoobu = PriceLabs on every open night next 30 (pricelabs H1). Who made them: UNKNOWN |
| t-pl-sync-1411 (new) | P11 and P06 bookings not in PriceLabs; Sync Now |
| t-p11-8dec-orphan (new) | P11 8 Dec orphan from the 9-14 Dec booking |
| a-p11-bcom-stack | Stack verified (exact formula); LM acts as 10%; all layers on record; no change proposed |
| t-p06-2229open | Partly sold; still your question |
| a-airbnb-rules | Not fixed, day 16; £2,906.29 |
| t-p04-doublebook | Not fixed, day 15 |
| a-discount-cut | Not done; £650 / £1,502 |
| a-peak-check | Not done; Reyhan's -5% still set; 10-13 Dec now 0.765 on Airbnb |
| a-p12-trim | 17-19 Nov back above band; December not done |
| t-p12-26nov-price | Not fixed; £306 |
| t-p20-5dec-orphan | Not fixed, 5th day |
| t-p20-delivery | Unchanged; 20-24 Nov on sale |
| t-p01-1820block | Not changed |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-14

**Ranking:** time-bound rows first (on sale now or tomorrow), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights × the flat's booked share from Smoobu (occupancy.md, handback-aware). On Airbnb-only or Airbnb-majority flats (P05, P06, P20, P01) the price is first multiplied by the observed Airbnb factor (channel §4): 0.765 up to 28 d, 0.900 at 29-59 d. **New today: on P11 (Booking.com only) the price is multiplied by the observed 0.762** (paid / Smoobu on both new stays, channel §1), so P11 figures are lower than yesterday's method would give. Upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.700, P06 0.625, P11 0.600, P12 0.467, P13 0.767, P20 0.643.
- Booked share, next 60: P05 0.650, P11 0.500, P13 0.500, P20 0.431.

**Bounds** (`kpi_pack` settings, 14 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P11 P06 | **NEW t-pl-sync-1411 (critical, today).** PriceLabs **Sync Now** on 3064196 (Camden) and 3288517 (Marylebone). Then check: P11 28 Nov-1 Dec and 9-13 Dec show Booked and `occupancy_next_30` is about 60%; P06 24-28 Nov shows Booked; `last_date_pushed` after 10:47Z. | PriceLabs > 3064196 / 3288517 > Sync Now | pricelabs C1/C2: P11 last refresh 13 Nov 10:47:05Z, before both stays; occupancy reads **33% vs Smoobu 60%** under the Aggressive profile; P11 near-term -11% overnight (market §2); P11 push crosses 24 h at 10:47Z today (pricelabs H4) | Not quantified (effect of the occupancy correction on P11's 12 open nights is UNKNOWN until PriceLabs re-reads the calendar) | Corentin | 2026-11-14 |
| 2 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the Marylebone block to start 30 Nov intended? It has now sold 24-29 Nov. **If yes:** record a date note in `policy.json intentional_blocks`; Sync Now (row 1); your call: DSO **29 Nov min 4 -> 1** (keep £274). **If no:** re-block 22-23 and 29 Nov in Smoobu. | Smoobu > Calendar > Marylebone; PriceLabs 3288517; `policy.json` | occupancy, pricelabs C2, channel §2: 24-29 Nov £1,009.82 = 0.650 × Smoobu; 22-23 Nov £572 sellable only as 22-24 Nov (P0 / -8%, comp-central); 29 Nov orphan; who/why UNKNOWN | Not quantified (policy question) | Corentin | 2026-11-14 |
| 3 | P06 | **t-p06-1521open (confirm; not a proposal; 15 Nov is tomorrow).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it and set 15-17 Nov **-10% -> 0%** (= `recommend` +10%). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov £226 all-in P0 / -19%; 16-18 Nov P0 / -30%; supported -2% vs median (qp -0.016); `recommend(0.625, 0.50, 0.0, -0.016)` = +10%; PriceLabs now £211/£210/£216, below the manual level | If confirmed: £637 × 0.111 × 0.765 × 0.625 = **£34** | Corentin | 2026-11-14 |
| 4 | P04 | **t-p04-doublebook (critical, day 15).** On 1455876748739910219, **block every open night** or snooze the listing; then map it to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. Also check why its price moves by itself (Smart Pricing?). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §3: 18-21 Nov £571.00 (was £525.80, no Smoobu feed), 6-19 Dec £2,275.22 bookable; comp-east: bookable on all 11 P04 runs (18-25 Nov £1,324, 6-13 Dec £1,291) | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-14 |
| 5 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 16).** Remove the hidden rules: nights up to 28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). On Marylebone also find and remove the extra 15% on 5-night stays. **Policy mismatch to settle:** the Shepherd's Bush last-minute rule is recorded as -10% within 14 days, but both twins now sell 10-13 Dec at 0.765 from 26 days out. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb 1671691529957957272 > Pricing > Discounts | channel §4: 11 live searches 07:21-07:23Z, same factors on every synced flat (P06 22-24 Nov 0.765; P12 7-10 Dec 0.765; P20 14-17 Dec 0.900); P06 24-29 Nov paid 0.65025 (-£543.18); comp-west: P13 10-13 Dec 0.765 on both twins | **Realised cost £2,906.29** (confirmed stays). +£58.48 on P20 20-23 Nov if it sells at today's card | Corentin | 2026-11-15 |
| 6 | P11 | **a-p11-bcom-stack (updated: verified; no Booking.com change proposed, per your direction).** The stack is exact: paid = ceil(Smoobu × 1.10) × 0.9 × 0.9 × 0.9 × 0.95. Last Minute acted as 10% (your record). Only ask: send the extranet breakdown of the 28 Nov-2 Dec and 9-14 Dec reservations so we can name the three 10% layers (Last Minute / Mobile / Genius L1 most likely) and confirm the 0.95 is 1-4 guest occupancy pricing. | Booking.com extranet (Camden) > Reservations | channel §1: both stays to the penny; 30.7% off list; owner nets **£62.47 per £100 Smoobu** (model £93.50); comp-central: sold at -50% / -56% all-in vs kept median | Not quantified (no change proposed). Size for reference: one 10% layer = £163.21 on these two stays; the 0.95 = £77.31 | Corentin | 2026-11-15 |
| 7 | P04 P05 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P04, P05, P11 and P20. P11 live: Aggressive / Recency default (5-15%) / last-minute 0% / far-out +30%; P04/P05/P20 not re-read today. **P12, P13 excluded** (P12 net -£281). On P04 this is what reverses the 6-13 Dec overnight cut (it stops exactly at the 30-day Recency edge, comp-east). | PriceLabs 3562176 / 3166592 / 3064196 / 3547481 > Customizations | pricelabs H3, next 30: P04 £762 (-24.2%), P11 £557 (-18.9%; understated while PriceLabs reads 33%), P05 £244, P20 £51; total **£1,502 next 30 / £650 next 14**; four targets £1,614 / £829 | 762 × 0.467 + 557 × 0.762 × 0.600 + 244 × 0.765 × 0.700 + 51 × 0.765 × 0.643 = **£766 / 30 days** (upper bound) | Corentin | 2026-11-15 |
| 8 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not intended:** end the block on 18 Dec so **18-20 Dec** sell at £271 / £268 / £237, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £308.33/n = P14 / -16.6% vs stored median £369.67 (n = 7), P25 / -9.1% vs band £339.17; parity supported (qp 0) | £776 × 0.900 = **£698** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-15 |
| 9 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £696 = market P75 £699) and **29 Dec +300% -> 0%** (uncustomized £1,086; P90 £1,100). **7-8 Dec DSO +3% -> +29%** (£471 / £448 -> about £589 / £560) and **13-14 Dec +5% -> +31%** (£496 / £486 -> about £620 / £608), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-8 Dec P25 / -19%, 13-14 Dec P25 / -18% (n = 4); supported +15% vs median = room about £702 / £728; `recommend(0.70, 0.45, 0.12, 0.15)` = +25%; market §2: +£227 / +£173 to P75, occ +5.8/+1.5 and +13.8/+6.3; 21 / 29 Dec no comp (n = 0) | 7-8 Dec £230 × 0.765 × 0.700 = £123; 13-14 Dec £246 × 0.900 × 0.650 = £144; 21 Dec £696 × 0.900 × 0.650 = £407: **£674** (upper bound). 29 Dec not quantified | Corentin | 2026-11-15 |
| 10 | P04 P14 P05 P11 P12 P13 P20 P06 | **a-p13-record: confirm or revert Reyhan's 9-11 Nov changes** (table above). Recommended: **P04 base 200 -> 220**; **P11 DSO -3% -> +5% on 14-18 Dec** (darts; 13 Dec already sold); **P04 6-13 Dec -5% -> 0%** (keep 14-22 Dec); **P04 18-24 Nov keep -5%**; **P04 14-17 Nov min 2: revert to min 3**. Confirm or revert: P14 min 450, P05 max 3,500, P05 29 Nov-2 Dec -5%, P20 min 2 and base 330 vs 350, P12 +5%. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3267077, 3166592, 3064196, 2699998, 3547481; `policy.json` | pricelabs H2 + logs (0 entries since 11 Nov 17:16:47Z); comp-east (P04 -27% to -36%; 6-13 Dec -22% to -26%); comp-central (14-18 Dec P0 / -42%); market §2 (darts gap £341; 13 Dec sold ~£142) | P04 base £111 + P11 £36 + P04 Dec £32 = **£179** (upper bound) | Corentin | 2026-11-15 |
| 11 | P20 | **t-p20-5dec-orphan (5th day).** DSO **5 Dec min 3 -> 1**, keep £306 (outside policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1); comp-west: at market P75 (£303), 29% under the only 1-night comp (£431, was £538); Jingle Bell Ball 5-6 Dec (market §3) | £306 × 0.765 × 0.643 = **£151** | Corentin | 2026-11-15 |
| 12 | P13 | **a-peak-check (conflicts with Reyhan's 11 Nov -5%: confirm or revert).** Both twins: DSO **10-12 Dec -5% -> +5%** (about +10.5%; 3090701 about £218-233); **18-26 Dec -5% -> 0%**; **hold 13-17 Dec at -5%**. Do not raise 3064856 more than 3090701 on 10-12 Dec (it is already +10% over its line). | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 10-13 Dec cheaper twin P0 / -21.3% (n = 2), P5 of 21 wider, PriceLabs 14% under market P50; both twins now 0.765 on Airbnb; `recommend` +10%; Christmas wider P12-P24, 0% supported, +10% not (qp -0.15 on 3064856); market §2: +1.1 to +25.4 pts on all 17 nights, gap to P50 £459 | Cheaper twin 10-12 Dec £618 × 0.105 + 18-26 Dec £1,923 × 0.0526 = £166 × 0.500 = **£83** | Corentin | 2026-11-15 |
| 13 | P11 | **NEW t-p11-8dec-orphan.** DSO **8 Dec min 3 -> 1**, keep £202. | PriceLabs 3064196 > DSO 8 Dec | occupancy, pricelabs H5, channel §1: 8 Dec unsellable between 5-8 Dec and the new 9-14 Dec stay; comp-central 8-9 Dec P0 / -20% vs kept median £253 (n = 3), wider £276; market P50 £257, occ +4.4 | £202 × 0.762 × 0.600 = **£92** | Corentin | 2026-11-15 |
| 14 | P20 | **t-p20-delivery (back to you).** Smoobu blocks 18-19 Nov only; 20-22 Nov is open and selling on Airbnb (20-23 Nov £526.32 room). **Confirm delivery is 18-20 Nov so `policy.json listing_facts.P20.block_20_21_nov` can be updated.** If 20-24 Nov stay on sale: DSO **20-21 Nov -5% -> +10%** (about +15.8% on those two nights); hold 22-24 Nov. | Smoobu > Calendar > Waterford; `policy.json`; PriceLabs 3547481 > DSO 20-21 Nov | comp-west: 20-24 Nov **£216.00/n, P0 of 7 / -27.1%**, 14.2% under the 0-review line; comps +6.3% overnight; 20-23 Nov at +15.8% about £244.90/n, still -19% vs median; 22-25 Nov on the line; market 20-24 Nov P55-P58, soft (-5.1 to +1.2) | £476 × 0.158 × 0.765 × 0.643 = **£37** | Corentin | 2026-11-15 |
| 15 | P11 | **t-channel-gaps.** 3 Jan: set a DSO so the price is about **£194** (£172 now; fortnight £193). Hold 23 Dec at £276 (market -4.6, soft). | PriceLabs 3064196 > DSO 3 Jan | comp-central: 3-4 Jan P0 / -64% (n = 1), 3-6 Jan P0 / -38% (median £298, n = 8); market §3: 3 Jan +3.2, P50 £221 | £22 × 0.762 × 0.500 = **£8** | Corentin | 2026-11-15 |
| 16 | P12 | **a-p12-trim (your call: lowers a price; reverses Reyhan's +5%).** **17-18 Nov DSO +5% -> -5%** (269/275 -> about 243/249); hold 19-20 Nov. **30 Nov-3 Dec +5% -> 0%** (£1,063 -> about £1,012). **7-10 Dec 0% -> -5%** (£1,062 -> about £1,009). **11-13 Dec 0% -> -5%** (£927 -> about £881). **Min stay 12 Dec 3 -> 2, 13 Dec 3 -> 1.** Override of `recommend` 30d "hold" with stay-level evidence. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 1: 17-19 Nov **+14.1% (P78)**, 18-20 Nov +9.3%; 17-20 and 17-21 Nov in range (hold those runs); 1-3 Dec +12.1%, 2-4 Dec +12.7%, 30 Nov-3 Dec +5.5%; 7-10 Dec +7.4%; 11-14 Dec +6.8% (NL >P90); qp -0.15 supports -15% to 0%. market: 17-20 Nov above P75, occ -2.8 to -18.5 vs STLY. Pace30 -37.8% | Not quantified (a cut) | Corentin | 2026-11-15 |
| 17 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -15%**, keep min 1 (£306 -> about £226). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £360 all-in, **P100 / +27.7%** (n = 5), NL >P90; supported room £204-240 | Not quantified (a cut) | Corentin | 2026-11-15 |
| 18 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: -£192.80 on 13-18 Jan | **£192.80** per 5-night stay | Corentin | 2026-11-16 |
| 19 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §4: -£138.36 on 13-16 Jan | **£138.36** per such stay | Corentin | 2026-11-16 |
| 20 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: -£90.99 / -£108.09 on 10-15 Dec; also 20-25 Dec -£101.25 / -£95.67 (comp-west) | **£90.99** per 5-night stay (cheaper twin) | Corentin | 2026-11-16 |
| 21 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb listing 1657859794156786222 > Pricing > Discounts | channel §4: -£360.94 = 18.0% on 6-19 Dec; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£60.16** per 6-19 Dec stay | Corentin | 2026-11-16 |
| 22 | P13 | **t-p13-twins (from 13 Jan).** Restore a gap: DSO **3090701 about +4%** on 13 Jan-28 Feb (child only; set it after any parent edit). | PriceLabs 3090701 > DSO | channel §4: 47 open nights identical (13 Jan-28 Feb); comp-west: 14-17 Jan both £664.80 with the same early-booking discount; `user_price` identical from 13 Jan | Not quantified (duplicate-listing risk) | Corentin | 2026-11-16 |
| 23 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 8 post-cut Booking.com cancellations (P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec, P11 8-15 Dec, **P11 26-29 Nov**). | Booking.com extranet > Reservations | channel §1: 8 of 22 (36%); confirmed 14 / 58 n / £9,291.49 | Not quantified | Corentin | 2026-11-16 |
| 24 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified (£2,962.17 at stake) | Corentin | 2026-11-16 |
| 25 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-16 |

**Closed today:** t-smoobu-manual-1213 (fixed: overwritten by PriceLabs pushes; who: UNKNOWN). **New today:** t-pl-sync-1411, t-p11-8dec-orphan.

## Top 5 for today
1. **PriceLabs is blind to three new bookings; Sync Now on P11 and P06 today.** P11 reads occupancy 33% vs Smoobu 60%, so the Aggressive occupancy profile keeps cutting Camden: near-term fell about 11% overnight with no edit (28 Nov £292 -> £260, then sold). P11's last push crosses 24 h at 10:47Z today. P06 has not registered 24-29 Nov either.
2. **P11 Camden: +10% reached Booking.com, but both new stays sold 40-56% under comps.** 28 Nov-2 Dec £605.29 and 9-14 Dec £863.61 = ceil(Smoobu × 1.10) × 0.9 × 0.9 × 0.9 × 0.95 exactly (Last Minute acted as 10%). The owner nets £62.47 per £100, after the 18% booster commission (expected). Darts 13 Dec sold at about £142 vs your >£300. One cancellation (26-29 Nov) was replaced by one night at a lower rate. New 8 Dec orphan: min 1 (£92). Per your direction no Booking.com discount changes; the levers are PriceLabs (Sync, a-discount-cut £557, Reyhan's -3% on the darts nights).
3. **P06 (intentional-block listing): the reopened nights sold cheaply.** Airbnb 24-29 Nov £1,009.82 = 0.650 × Smoobu (the 0.765 layer × an unidentified 0.85), -38% to -44% vs comps. a-airbnb-rules is now £2,906.29 (day 16). PriceLabs dropped Blocked on 22-29 Nov and re-priced -19.6%, but has not registered the booking. That leaves a 22-23 Nov 2-night gap and a 29 Nov orphan (min 4). Intended? (t-p06-2229open is still your question.)
4. **Manual Smoobu cuts closed (overwritten by PriceLabs), and three flats moved off their supported level.** P12 17-19 Nov is +14% vs band (-10% on 17-18 Nov supported, your call); 26 Nov P100; December +7-13%. P04 6-13 Dec was cut about 10% overnight with no edit (-22% to -26% vs comps, +10% supported); November -27% to -36%. P13 10-13 Dec fell on both twins (0.765 inside about 28 days, but policy records -10% within 14 days: mismatch). +5-10% on 10-12 Dec and 0% at Christmas are supported vs Reyhan's -5%.
5. **Standing items.** P20 20-24 Nov is P0 of 7 (+15.8% on 20-21 Nov once you confirm delivery dates); 5 Dec orphan day 5 (£151). Barking 1455 day 15. a-discount-cut £650 / £1,502 (£766 expected). Missed compression 19 n / £419. Booking.com since 24 Oct: 14 confirmed / 58 n / £9,291.49, 36% cancelled. Base rises +14 n / +£4,677.30 like-for-like (P05 the whole gain; P11 -5 / -£1,566.77).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 from 60 d (channel §4, day 16). P06's 5-night booking: 0.650 (extra 0.85 unidentified). P13 now hits 0.765 from about 28 days out, against the policy record of -10% within 14 days.
  - Target: **1.00x before visible discounts by 2026-11-20** (row 5).
- **Booking.com since the 24 Oct markup cut** (channel §1):
  - Gross 22 / 87 n / £15,241.26; **confirmed 14 / 58 n / £9,291.49**; 8 of 22 cancelled (36%).
  - Pace 1.06 a day gross, 0.68 confirmed (about 0.33 before the cut). **Since +10% (12 Nov): 2 bookings / 9 n / £1,468.90 (both P11).** Too few to judge the markup.
  - Targets: under 20% cancelled by 2026-11-20; confirmed paid / PriceLabs at least 0.80x (not recomputed today).
- **Net to owner per £100 base** (channel §6): Booking.com model £93.50 (Camden 18% £90.20); **Camden observed £62.47**; Airbnb at 0.765 £64.64, at 0.900 £76.05, at 1.000 £84.50; P06 observed £54.95; direct model £90 (unconfirmed). Camden and near-term Airbnb are below the direct model, which is the case for direct booking (below).
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.62 |
  | P04 synced | **4.2 (10)** (was 4.11 (9)) | 4.85 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.26 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 0 reviews | 4.8 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12 17-19 Nov and December need trims, why P04's supported level is -15% vs comps, and why P13 Christmas is held to 0%, not +10%.
  - Fixes: P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; review requests after P20's first stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P11:** both new stays sold at P0; every open stay P0-P20 (comp-central). Booking.com CTR 0.81% vs 1.70% (21 Oct only). Basement with a patio; 4 of 12 comps have a lift, 3 a terrace. Titles (a-titles).
  - **P06:** sold only at P0 (-38% to -44%); 15-17 Nov still unsold at P0.
  - **P20:** 0 reviews; parking photo first; P0 of 7 on 20-24 Nov.
- **Gap fill / length of stay.**
  - Unsellable now: P11 8 Dec (row 13), P20 5 Dec (row 11), P06 29 Nov (row 2, policy). Soft blocks: P05 21 / 29 Dec (row 9). Min-3 pins: P12 12 / 13 Dec (row 16).
  - Exact-fit runs: P11 2-4 Dec (only 2-5 Dec), P06 22-23 Nov (only 22-24 Nov), P11 26-27 Nov (only with 22-25 Nov).
  - Policy min stay vs Smoobu, 2-4 months ahead below 5 nights: P11 46, P13 46 per twin, P05 43, P20 54, P04 46 nights (pricelabs H5). For you to confirm the policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps). PriceLabs > Customizations > Orphan day: NOT CHECKED. Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): NOT CHECKED, 7 days overdue. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. With Camden netting £62.47 and near-term Airbnb £64.64 per £100, a direct guest at -10% (£90) is worth about 40% more to the owner.
- **Event compression** (market §4): **19 n / £419** (yesterday 24 / £453); bookable 18 / £386.
  - Lower mainly because P11 13 Dec sold (below policy) and P04's fortnight fell with the 6-13 Dec cut, not because our event prices rose.
  - By flat: P11 darts 14-17 Dec £129, 23 Dec £22, 3 Jan £21; P20 16-18 Dec £164 (partly an artefact of a repriced fortnight, market §4), 20-24 Nov £22, 5 Dec £33; P04 £28.
  - Where the market supports a raise: P13 10-26 Dec (+£459 to P50; row 12); P05 7-8 / 13-14 Dec (+£227 / +£173 to P75; row 9); **P04 11-13 Dec** (+£58 to restore 13 Nov prices, market +5.7 to +9.6; rows 7 and 10); P04 14-19 Dec (+£186 to P75; comp-east holds 14-20 Dec in range, so no move); P11 3 Jan (row 15).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **61.3%** (61.8% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£172.34** (£171.30) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£105.61** (£105.85) | £129 | 2026-12-18 |
| Revenue, last 30 | **£41,189.17** (239 n) | - | - |
| Booked next 30 (Smoobu) | **58.9%** (152/258) | each unit at least market + 10 pts (below: P11 60.0% vs 50%, P12 46.7% vs 43%) | 2026-11-20 |
| Booked next 60 | **47.7%** (209/438) | at least market + 10 pts (P11 50.0% vs 39%) | 2026-11-20 |
| 7-day pickup, net | gross 7 bk / 35 n / £7,803.06; cancelled 6 / 23 n / £4,277.28; **net +12 n / +£3,525.78** | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace30 vs STLY | **-37.8%** (-12 n / -£1,746.53), to the 13 Dec handback | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+14 n / +£4,677.30 like-for-like**; +23 n / +£6,543.91 incl. P06; P05 +12 / +£4,915.21; P11 -5 / -£1,566.77; P01 0 | positive without P05 (today +2 n / -£237.91) | 2026-11-26 |
| Booking.com since cut | **14 confirmed / 58 n / £9,291.49; 8 of 22 cancelled (36%)**; 2 since +10% | cancellations under 20% | 2026-11-20 |
| Camden Booking.com paid / Smoobu | **0.762-0.763** (stack verified); net £62.47 per £100 | lever is PriceLabs, not promotions (your direction) | 2026-11-20 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 16; realised cost **£2,906.29** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,502 next 30; £650 next 14** | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **0 open-night price mismatches**; 3 bookings not registered (P11 x2, P06); P11 occupancy 33% vs 60% | all bookings registered | 2026-11-14 |
| Unsellable orphan nights (next 60) | **3** (P11 8 Dec, P20 5 Dec, P06 29 Nov (policy)), plus P05 21 / 29 Dec at +300% | 0 | 2026-11-15 |
| Double-sellable Barking stays | **every open P04 run**, day 15 | 0 | 2026-11-14 |
| Missed compression | **19 n / £419**; bookable 18 / £386 | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.77; comp medians 4.26-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who made the Smoobu-side price and min-stay edits on 12-13 Nov:** UNKNOWN (closed as fixed). Source: ask Reyhan; Smoobu has no rate history.
2. **Who shortened the P06 block (12 Nov 12:59:51) and why; who moved the P20 delivery block:** UNKNOWN. Source: Smoobu booking history, or ask Reyhan / operations.
3. **What triggered the 13 Nov 09:07Z and 10:47Z refreshes, and when P11 / P06 will next refresh:** UNKNOWN (Sync Now is not in `get_user_logs`).
4. **Camden Booking.com breakdown of the two new stays** (which three 10% layers; is the 0.95 occupancy pricing): NOT CHECKED. Source: extranet reservation detail (WAF 07:23:29Z, not bypassed).
5. **P06 extra 0.85 on the 5-night Airbnb stay:** NOT CHECKED. Source: Smoobu > Channel Manager > Airbnb > Marylebone rules; Airbnb reservation breakdown.
6. **P13 live Smoobu Airbnb rules** (0.765 from about 28 days vs policy -10% within 14 days; 20-25 Dec 10% long stay; 13 Dec twin swap): NOT CHECKED.
7. **P04 6-13 Dec cut cause** (Recency vs occupancy factor) and per-date factor breakdown on P11's overnight cut: NOT CHECKED (not in the API output).
8. **Why 1455's Airbnb price moves by itself:** NOT CHECKED (not in Smoobu).
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Flexible-cancellation test result** (due 7 Nov): NOT CHECKED.
11. **Other:** Smoobu timestamp zone (UTC+1 inferred); P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; events are search summaries (venue pages unreachable: ENOTFOUND; ExCeL 18-19 Nov and O2 RnB Winter Ball dates conflict); P04/P05/P20 customizations and P14/P09 overrides not read today; P20 14-17 Nov sells at 0.851 (cause NOT CHECKED).

```json
{"scoreboard":{"note":"14 Nov 2026. Last 30 nights = 15 Oct-13 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:19:08Z, handback-aware); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and nights after each handback excluded. Pickup = bookings made 8-14 Nov net of cancellations. P11 and P06 forward use Smoobu (60.0% / 62.5%); kpi_pack is stale because PriceLabs has not registered the three overnight bookings. Base-rise like-for-like excludes both P06 stays on reopened nights. Airbnb ratios from 11 live searches 07:21-07:23Z (channel §4). Camden stack from channel §1 (exact fit). PriceLabs gap from pricelabs H3. Booking.com since cut from channel §1. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"61.3%"},{"label":"ADR last 30","value":"£172.34"},{"label":"RevPAR last 30","value":"£105.61"},{"label":"Revenue last 30","value":"£41,189.17"},{"label":"Nights last 30","value":"239"},{"label":"Booked next 30","value":"58.9% (152/258)"},{"label":"Booked next 60","value":"47.7% (209/438)"},{"label":"7-day pickup","value":"gross 7 bk / 35 n / £7,803.06; cancelled 6 / 23 n / £4,277.28; net +12 n / +£3,525.78"},{"label":"P11 booked next 30","value":"60.0% (18/30) vs market 50% (PriceLabs reads 33%)"},{"label":"P12 pace30 vs STLY","value":"-37.8% (-12 n / -£1,746.53), to the 13 Dec handback"},{"label":"Raised flats net since 18 Oct","value":"+14 n / +£4,677.30 like-for-like; +23 n / +£6,543.91 incl. P06; P05 +12 / +£4,915.21; P01 0; P11 -5 / -£1,566.77"},{"label":"Booking.com since markup cut","value":"14 confirmed, 58 n, £9,291.49; 8 of 22 cancelled (36%); 2 bookings since +10% (12 Nov), both P11, 9 n, £1,468.90"},{"label":"Camden Booking.com stack","value":"paid = ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95 (0.762-0.763 x Smoobu); owner nets £62.47 per £100; commission 18% booster"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x from 60 d; day 16; realised cost £2,906.29"},{"label":"PriceLabs-side gap","value":"£1,502 next 30; £650 next 14"},{"label":"PriceLabs vs Smoobu","value":"0 open-night price mismatches; 3 bookings not registered (P11 x2, P06)"},{"label":"Unsellable orphans","value":"P11 8 Dec, P20 5 Dec, P06 29 Nov (policy); plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 15"},{"label":"Missed compression","value":"19 n / £419; bookable 18 n / £386"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-pl-sync-1411","status":"open","prop":"P11 P06","priority":"critical","title":"New: PriceLabs has not registered the three overnight bookings (P11 28 Nov-2 Dec and 9-14 Dec; P06 24-29 Nov); P11 last refresh 13 Nov 10:47:05Z, occupancy reads 33% vs Smoobu 60%, so the Aggressive occupancy profile keeps discounting the 12 open nights (near-term -11% overnight, 28 Nov £292 -> £260 then sold); Sync Now on 3064196 and 3288517 today (P11 push crosses 24 h at 10:47Z); effect not quantified","gbp":null},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): the 22-29 Nov reopening has now sold 24-29 Nov on Airbnb (£1,009.82 = 0.650 x Smoobu, -38% to -44% vs comps); PriceLabs dropped Blocked and re-priced 22-29 Nov -19.6% (£2,982 -> £2,399) but has not registered the stay; 22-23 Nov sellable only as 22-24 Nov; 29 Nov orphan (min 4); who/why UNKNOWN; if intended note in policy + Sync Now + (your call) 29 Nov min 1; if not re-block 22-23 and 29 Nov","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; Reyhan -10%; PriceLabs now £211/£210/£216 (below the manual £222-233); 15-17 Nov P0 / -19%, 16-18 Nov P0 / -30%; supported -2% vs median; if confirmed record in policy and -10% -> 0% (£34), else re-block; 15 Nov is tomorrow","gbp":34},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 15): unsynced Barking Airbnb 1455876748739910219 bookable on all 11 open P04 runs (18-21 Nov £571 (was £525.80, repricing by itself), 18-25 Nov £1,324, 6-13 Dec £1,291, 6-19 Dec £2,275.22); block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P04","priority":"critical","title":"Day 16, unchanged: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d); P06 24-29 Nov paid 0.650 (0.765 x unidentified 0.85, -£543.18); realised cost now £2,906.29; P13 now 0.765 from ~28 d vs policy record -10% within 14 d (mismatch); +£58.48 on P20 20-23 Nov if it sells; P09 excluded (deprioritised)","gbp":2906.29},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Verified on the first two bookings at +10%: paid = ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95 exactly (£605.29, £863.61); +10% reached Booking.com; Last Minute acted as 10% (not 15%); commission 18% booster; owner nets £62.47 per £100 Smoobu (model £93.50); both stays -50%/-56% all-in vs kept comps; all layers are recorded promotions, so per Corentin's direction no change proposed; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,502 next 30 / £650 next 14 (P04 £762, P11 £557 understated while PriceLabs reads 33%, P05 £244, P20 £51); P11 Aggressive occupancy + Booking Recency default unchanged; P04 6-13 Dec cut ~10% overnight with no edit (stops at the 30-day Recency edge); set Occupancy, Booking Recency and Last-minute to Custom 0% on P04, P05, P11, P20; expected £766 / 30 days","gbp":766},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (£271/£268/£237, min 3) are closed; confirm intent; if not, end the block 18 Dec (£308.33/n = P14 / -16.6% vs stored median £369.67, P25 / -9.1% vs band; parity supported); £698","gbp":698},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,073 / 29 Dec £2,647 at Reyhan's +300% min 1 act as soft blocks: confirm intent (block in Smoobu) or, your call, both +300% -> 0% (uncustomized £696 = market P75; £1,086); 7-8 Dec +3% -> +29% (£919, P25 / -19%) and 13-14 Dec +5% -> +31% (£982, P25 / -18%) per recommend +25%; £674","gbp":674},
{"id":"a-p13-record","status":"open","prop":"P04 P14 P05 P11 P12 P13 P20 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9-11 Nov changes (0 log entries since 11 Nov 17:16Z): P04 base 200 (revert, £111), P11 22 Nov-18 Dec -3% vs darts +5% (13 Dec sold ~£142; 14-17 Dec avg £214.75 vs >£300; revert on 14-18 Dec £36), P04 14-17 Nov min 2 (revert to 3), P04 18-24 Nov -5% (keep), P04 6-22 Dec -5% (remove on 6-13 Dec after the overnight -10% algorithm cut, £32), P13 10-26 Dec -5% (a-peak-check), P14 min 450, P05 max 3500 and 29 Nov-2 Dec -5%, P12 +5%, P20 min 2 and base 330 vs 350, P06 -10% (numbers only)","gbp":179},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (5th day): P20 5 Dec 1-night orphan, min 3, unbookable at £306; DSO 5 Dec min 1, keep price (at market P75 £303, 29% under the only 1-night comp £431); £151","gbp":151},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Not done: Reyhan's 10-26 Dec -5% still set (confirm or revert); 10-13 Dec both twins fell on Airbnb (0.765 x PriceLabs; cheaper twin P0 / -21.3%, P5 of 21 wider); both twins 10-12 Dec -5% -> +5% (do not raise 3064856 more than 3090701), 18-26 Dec -5% -> 0%, hold 13-17 Dec; market +1.1 to +25.4 pts all 17 nights, gap to P50 £459; £83","gbp":83},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"New: P11 8 Dec 1-night orphan (£202, min 3) between the 5-8 Dec stay and the new 9-14 Dec Booking.com stay; DSO 8 Dec min 3 -> 1, keep £202 (P0 / -20% vs kept median £253, market P50 £257); £202 x 0.762 x 0.600 = £92","gbp":92},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Policy looks out of date: Smoobu blocks 18-19 Nov only; 20-22 Nov open and selling on Airbnb (20-23 Nov £526.32 room); Corentin to confirm delivery 18-20 Nov so policy can be updated; 20-24 Nov £216.00/n all-in P0 of 7 / -27.1%; if on sale, DSO 20-21 Nov -5% -> +10% (+15.8%), hold 22-24 Nov; £37","gbp":37},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 3 Jan £172 (3-4 Jan P0 / -64%, 3-6 Jan P0 / -38% vs median £298) -> DSO to about £194 (fortnight £193); 23 Dec £276 hold (market -4.6); Booking.com CTR 0.81% vs 1.70% (21 Oct only); £8","gbp":8},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"17-19 Nov back above band now the manual cuts are gone: +14.1% (P78) at 269/275 -> DSO 17-18 Nov +5% -> -5% (about 243/249), hold 19-20 Nov; 30 Nov-3 Dec +5% -> 0% (+5.5%, 1-3 Dec +12.1%); 7-10 Dec 0% -> -5% (+7.4%); 11-13 Dec 0% -> -5% (+6.8%, NL >P90); 12 Dec min 3->2, 13 Dec min 3->1; pace30 -37.8%; lowers a price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £306 (£360 all-in, P100 +27.7%, n=5, NL >P90; uncustomized £290); DSO +15% -> -15% (about £226; supported £204-240), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£192.80 on 13-18 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":192.8},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (-£138.36 on 13-16 Jan): not in policy - yours, or 0%?","gbp":138.36},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (-£90.99 / -£108.09 on 10-15 Dec; -£101.25 / -£95.67 on 20-25 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":90.99},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (£60.16 over policy on 6-19 Dec)","gbp":60.16},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Open from 13 Jan: user_price identical on both twins from 13 Jan; 47 open nights identical (13 Jan-28 Feb); Airbnb 14-17 Jan both £664.80 with the same early-booking discount; DSO 3090701 about +4% on 13 Jan-28 Feb, set on the child after any parent edit","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"medium","title":"8 of 22 post-cut Booking.com bookings cancelled (36%: P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec, P11 8-15 Dec, new P11 26-29 Nov £680.40); confirmed 14 / 58 n / £9,291.49; 2 bookings since +10%; send rate plans and reasons","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"20-24 Nov £216.00/n all-in, P0 of 7 comps (-27.1%), 14.2% under the 0-review line; comps +6% overnight; remaining: parking first photo, review requests (0 reviews); Flexible-test 14-day comparison overdue (due 7 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -37.8% (-12 n / -£1,746.53) to the 13 Dec handback; base +37.2% vs P50; correct open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov twins £372 / £383 all-in (+50% min 1; P100 of wider 3; market +15.2 Finals Weekend); 17 Nov £326/£336 all-in at +35% (P75 of 4, P62 wider): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20 P06 P11","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P06 sold 24-29 Nov only at P0 (-38% to -44%), 15-17 Nov unsold at P0; P11 basement vs 4 of 12 comps with lift, both new stays at P0","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (6 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 max 780 vs 3500, P05 '5-bed'); P11 Vrbo copy refreshed 14 Nov 07:15Z but not pushed (reads 60% while parent reads 33%): should Vrbo copies push?; P02 Vrbo stale since 24 Feb; Vrbo +8% / Direct -10% unconfirmed; record 9-11 Nov edits, P06 reopening and P20 delivery dates in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No replacements 14 Nov; not returned on any stay: P04 1083936003491396261 and 1387112821878102742 (day 3; sweep January on 15 Nov), P09 958156921765583815, P15 1371771992549776701, P06 2, P14 2, P17 1 (inactive NOT CHECKED); P15 1557062894259099964 back; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-smoobu-manual-1213","status":"done","prop":"P20 P06 P04 P12","priority":"critical","title":"Fixed: every 12-13 Nov Smoobu-side cut overwritten by PriceLabs pushes (P12 13 Nov 07:22:41Z and 14 Nov 05:49:56Z; P06/P04/P20 13 Nov 09:07Z); Smoobu = PriceLabs on every open night next 30; P20 15 Nov back to min 3; manual values now sit in PriceLabs user_price; who made them still UNKNOWN (channel's 'PriceLabs price field' reading explains today's lower prices, not the 12-13 Nov edits)","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P11 P06","title":"PriceLabs has not registered the two new P11 Booking.com stays or the P06 Airbnb stay; P11 occupancy_next_30 33% vs Smoobu 60%, so the Aggressive occupancy profile and Booking Recency price the open nights as unsold","evidence":"pricelabs C1/C2 (live get_listing_prices; last refresh P11 13 Nov 10:47:05Z, P06 09:07:38Z, both before the bookings); occupancy; market §2 (P11 near-term -11% overnight, no log)."},
{"agent":"channel","severity":"critical","ref":"P11","title":"+10% markup proven to reach Booking.com: both new Camden stays = ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95 to the penny; Last Minute acted as 10%; owner nets £62.47 per £100 Smoobu; commission 18.00% (booster, expected)","evidence":"channel §1 (Smoobu price elements, stack.py); occupancy and pricelabs M1 agree within £1.25."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"Both new P11 stays sold at P0: 28 Nov-2 Dec -50% all-in vs kept median (-41% wider), 9-14 Dec -56% (-40% wider); every open stay P0-P20, -20% to -65%; darts 13 Dec sold at ~£142 room vs policy >£300; 8 Dec new orphan","evidence":"comp-central P11 tables; occupancy darts section; market §2 (14-17 Dec gap £341 to policy)."},
{"agent":"channel","severity":"critical","ref":"P06","title":"P06 24-29 Nov Airbnb paid 0.650 x Smoobu = 0.765 hidden layer x an unidentified 0.85 (-£543.18 vs policy); a-airbnb-rules realised cost now £2,906.29","evidence":"channel §2/§4 (Smoobu price elements); comp-central (-38% vs same-stay comp, -44% vs 24-26 Nov median); occupancy."},
{"agent":"pricelabs","severity":"high","ref":"P20 P06 P04 P12","title":"t-smoobu-manual-1213 fixed: all 12-13 Nov Smoobu-side cuts overwritten by PriceLabs pushes; Smoobu = PriceLabs on every open night next 30; manual values now in user_price","evidence":"pricelabs H1 (sync.py, 0 mismatches); comp-east, comp-west (guests now see the PriceLabs price)."},
{"agent":"channel","severity":"medium","ref":"P11 P06","title":"Lower near-term Smoobu prices are PriceLabs' own price field pushed at the 13 Nov refreshes, not manual edits (correct for today's numbers; does not explain the 12-13 Nov values, which sat below PriceLabs price)","evidence":"channel §5 (P11 18 Nov 143 vs 160; 28 Nov 260 vs 292; P06 24-28 Nov £1,553 vs £1,906)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 6-13 Dec fell ~10% overnight with no edit (£1,466 -> £1,319; uncustomized and overrides unchanged; stops at the 30-day Recency edge); now -22% to -26% vs comps, +10% supported; November -27% to -36% vs comps","evidence":"comp-east Priority 2; market §2 (11-13 Dec market +5.7 to +9.6 vs STLY)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still bookable on all open P04 runs (day 15), and its price moved by itself (18-21 Nov £525.80 -> £571.00)","evidence":"channel §3; comp-east 1455 table (11 runs)."},
{"agent":"comp-east","severity":"medium","ref":"P12","title":"P12 17-19 Nov back to +14.1% vs band (P78) now the Smoobu-side cuts are gone; -10% on 17-18 Nov supported; 26 Nov P100 +27.7%; 1-3 Dec +12%, 7-10 Dec +7.4%, 11-14 Dec +6.8%","evidence":"comp-east Priority 1; market §2 (17-20 Nov above P75, occ below STLY); occupancy pace -37.8%."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 10-13 Dec both twins fell on Airbnb to 0.765 x PriceLabs inside ~28 days (policy records -10% within 14 days: mismatch); +5-10% on 10-12 Dec and 0% on 18-26 Dec supported vs Reyhan's -5%; 14-17 Jan twins identical","evidence":"comp-west P13; market §2 (+1.1 to +25.4 pts); channel §4 (47 identical nights)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 20-24 Nov P0 of 7 (-27.1%), comps +6% overnight; +15.8% on 20-21 Nov supported if not the delivery block; 5 Dec orphan min 1 at £306 supported (5th day)","evidence":"comp-west P20 tables; market §2; channel §5."},
{"agent":"pricelabs","severity":"medium","ref":"P04 P05 P11 P20","title":"PriceLabs discount gap £1,502 next 30 / £650 next 14 (P04 £762, P11 £557, P05 £244, P20 £51); P11 Aggressive occupancy + Recency default unchanged","evidence":"pricelabs H3 (an.py)."},
{"agent":"market","severity":"medium","ref":"P11 P20 P04","title":"Missed compression 19 n / £419 (was 24 / £453): lower because P11 13 Dec sold below policy and P04's fortnight fell, not because event prices rose","evidence":"market §4."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises: +14 n / +£4,677.30 like-for-like (excl. both P06 reopened stays); +23 / +£6,543.91 incl. P06; P11 -5 / -£1,566.77 (was -11); P05 +12 / +£4,915.21","evidence":"occupancy base-rise section (rise.py, full recompute)."}
],
"top5":[
"PriceLabs is blind to three new bookings; Sync Now on P11 3064196 and P06 3288517 today. P11 reads occupancy 33% vs Smoobu 60%, so the Aggressive occupancy profile keeps cutting Camden: near-term fell ~11% overnight with no edit (28 Nov £292 -> £260, then sold). P11's last push crosses 24 h at 10:47Z.",
"P11 Camden: +10% reached Booking.com (both new stays = ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95 exactly; Last Minute acted as 10%); owner nets £62.47 per £100 after the 18% booster. Both sold 40-56% under comps; darts 13 Dec sold ~£142 vs >£300; 26-29 Nov cancellation replaced by one cheaper night; new 8 Dec orphan (min 1, £92). Per your direction no Booking.com discount changes; levers are PriceLabs (Sync, a-discount-cut £557, Reyhan's -3% on darts).",
"P06 (intentional-block listing): the reopened nights sold - Airbnb 24-29 Nov £1,009.82 = 0.650 x Smoobu (0.765 x an unidentified 0.85), -38% to -44% vs comps; a-airbnb-rules now £2,906.29 (day 16). PriceLabs dropped Blocked on 22-29 Nov (re-priced -19.6%) but has not registered the stay; 22-23 Nov 2-night gap, 29 Nov orphan (min 4). Intended? (t-p06-2229open).",
"Manual Smoobu cuts closed (overwritten by PriceLabs). P12 17-19 Nov back to +14% vs band (-10% on 17-18 Nov supported, your call); 26 Nov P100; December +7-13%. P04 6-13 Dec cut ~10% overnight with no edit (-22% to -26% vs comps, +10% supported); November -27% to -36%. P13 10-13 Dec fell on both twins (0.765 inside ~28 days vs policy -10% within 14 days: mismatch); +5-10% on 10-12 Dec and 0% at Christmas supported vs Reyhan's -5%.",
"Standing: P20 20-24 Nov P0 of 7 (+15.8% on 20-21 Nov once delivery dates confirmed), 5 Dec orphan day 5 (£151); Barking 1455 day 15; a-discount-cut £650 / £1,502 (£766 expected); missed compression 19 n / £419; Booking.com since 24 Oct 14 confirmed / 58 n / £9,291.49, 8 of 22 cancelled (36%); base rises +14 n / +£4,677.30 like-for-like (P11 -5 / -£1,566.77)."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked (who UNKNOWN) at £271/£268/£237; if reopened £308.33/n = P14 / -16.6% vs stored median £369.67 (n = 7), P25 / -9.1% vs band, parity supported (£698); 100% of 16 non-blocked nights booked; pickup -3 / -£720.90 (18-21 Dec cancellation in window); base-rise 0 n / £0."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 14 Nov 03:19Z via Channex."},
{"ref":"P04","change":"Smoobu-side cut 18-20 Nov gone (148/151/154; Airbnb £163/n); 6-13 Dec cut ~10% by the algorithm with no edit (£1,466 -> £1,319), now -22% to -26% vs comps (+10% supported); November -27% to -36%; synced rating 4.2 (10); 1455 bookable on all 11 runs (day 15), repricing by itself; weekly 18% (£60.16); gap n30 £762; base 200 (revert recommended, £111); fwd30 46.7% vs 25%."},
{"ref":"P05","change":"No edit; 21 Dec £2,073 / 29 Dec £2,647 (+300% min 1, soft blocks); 7-8 Dec £919 (P25 / -19%), 13-14 Dec £982 (P25 / -18%), +25% supported (£674 incl. 21 Dec); visible 12% early booking and 10% LOS 5+ still on; base-rise +12 n / +£4,915.21; fwd30 70.0% vs 45%."},
{"ref":"P06","change":"Reopened 24-29 Nov sold on Airbnb (£1,009.82 = 0.650 x Smoobu, -38% to -44% vs comps); PriceLabs dropped Blocked on 22-29 Nov and re-priced -19.6% but has not registered the stay; 22-23 Nov 2-night gap (sellable as 22-24 Nov), 29 Nov orphan min 4; 15-17 Nov now £211/£210/£216 (below the manual level), P0; who reopened UNKNOWN; base-rise +15 n / +£3,212.38 (like-for-like +6 / +£1,345.77); fwd30 62.5% of 16 non-blocked."},
{"ref":"P07","change":"Intentional block; pushed 14 Nov 03:58Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"Two new Booking.com stays (28 Nov-2 Dec £605.29; 9-14 Dec £863.61) and one cancellation (26-29 Nov £680.40): net +6 n / +£788.50; +10% proven to reach Booking.com, stack exact (0.69255 of list), net £62.47 per £100, commission 18% booster; both sold 40-56% under comps; darts 13 Dec sold ~£142 vs >£300 (14-17 Dec avg £214.75); new 8 Dec orphan; PriceLabs has not registered either stay (33% vs 60%); near-term -11% overnight with no edit; base-rise -5 n / -£1,566.77; fwd30 60.0% vs 50%."},
{"ref":"P12","change":"Smoobu-side cut overwritten; 17-19 Nov now +14.1% vs band (P78) at 269/275 (-10% on 17-18 Nov supported); 20 Nov 290 -> 322; 11-12 Dec 317/323; 26 Nov £306 P100 +27.7%; 30 Nov-3 Dec +5.5%, 7-10 Dec +7.4%, 11-14 Dec +6.8% vs band; pace30 -37.8% (-12 n / -£1,746.53); base-rise +4 n / +£227.79."},
{"ref":"P13","change":"10-13 Dec both twins fell on Airbnb (3064856 -7.6%, 3090701 -3.7%; both 0.765 x PriceLabs inside ~28 days vs policy -10% within 14 days); Reyhan's 10-26 Dec -5% still set (+5-10% on 10-12 Dec and 0% on 18-26 Dec supported); 13 Dec twins swapped order; 14-17 Jan twins identical on Airbnb; fwd30 76.7% vs 46%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 71 of 180 open nights at £450; P100 / +36% to +90%; 0% vs 48%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped); comp 1557062894259099964 returned again."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"Smoobu-side cut 13-17 Nov gone (15 Nov back to min 3); 20-24 Nov £216.00/n all-in, P0 of 7 / -27.1%, comps +6% overnight (+15.8% on 20-21 Nov supported if not the delivery block); delivery dates still to confirm (Smoobu blocks 18-19 Nov only); 14 Nov tonight unsold; 5 Dec orphan £306 min 3 (5th day); fwd30 64.3% vs 39%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 16 non-blocked nights booked to the 20 Dec handback; base -3.8% vs P50; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (rec 221)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"November -27% to -36% and 6-13 Dec -22% to -26% vs comps vs supported -15% (qp -0.15); recommend 30d raise +10%; 46.7% vs 25%; base +12.4% vs P50 (comp-east; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"70.0% vs 45%; 7-8 / 13-14 Dec P25 (-19% / -18%); qp +0.15; recommend +25%; base -5.7% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 10 of 16 non-blocked nights booked (62.5%) vs 50%; base -14.2% vs today's P50 £416 (occupancy; market §1; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"60.0% vs 50% (Smoobu); every open and newly sold stay P0-P20, -20% to -65% vs comp median; recommend +5% 30d / +10% 60d; base -2.1% vs today's P50 £292; no cut supported; levers are Sync Now, a-discount-cut and the darts override (comp-central; pricelabs C1/H3; market §1)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"46.7% vs 43%; pace30 -37.8%; band P40-P100 with qp -0.15; base +37.2% vs P50; handback 13 Dec (comp-east; pricelabs M3; occupancy)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"76.7% vs 46% (+31 pts); 60d 50.0% vs 38% (comp-west; occupancy)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 48%; P100 / +36% to +90% vs comps at £450; 71 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"64.3% vs 39% (30d), 43.1% vs 30% (60d); 0 reviews; base +29.4% vs P50; 20-24 Nov P0 of 7, December at or near the median (occupancy; comp-west; pricelabs M3)."}
]}
```

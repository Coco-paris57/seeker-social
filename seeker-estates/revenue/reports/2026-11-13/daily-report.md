# Seeker Estates - Daily revenue report, 2026-11-13 (Friday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-13/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-13/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-12/daily-report.md` and its JSON, the dashboard action list (13 Nov, before this step), the full id list, and the overnight brief (Dispatcher: `reservations.csv` unchanged, no bookings and no cancellations).
- `data/policy.json`, read first. New since yesterday: **Booking.com markup +10% from 12 Nov** (`channel_pricing.booking_markup` 0.1). It is settled and not raised again. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/base/max come from `kpi_pack` `settings` (13 Nov). No base, min, max or push setting changed since 12 Nov (pricelabs, live `get_listing_data`).
- I used no guest data and no booking reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 block change of 12 Nov is a question for you (t-p06-2229open), not an opportunity.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list. No P14 proposal of my own.
- P13 is one flat (3064856 + 3090701).
- Not raised again: Booking.com +10% markup, Visibility Booster commission (Camden 18%), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests, P04 min-stay 3.
- Nights after each handback are not inventory: P08 after 13 Nov (tonight is its last night, booked), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes a Booking.com promotion. On Camden I still ask you to confirm or revert one deal that differs from your recorded 10%.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **The 13 "PriceLabs ≠ Smoobu" nights are Smoobu-side manual edits, not a copy error or an unpushed refresh** (pricelabs C1).
   - Live `get_listing_prices` equals the raw file on all 13 nights. Each listing's last refresh was pushed within 0-15 s. There are 0 PriceLabs log entries since 11 Nov 17:16:47Z.
   - Smoobu holds a third value, below both the old and new PriceLabs prices. The pattern is round figures (£130/£135/£140, £222 twice, £250 twice), near-term gaps only, and two min-stay cuts (P12 13 Nov to 1, P20 15 Nov to 2).
   - Who made them: **UNKNOWN** (Smoobu has no rate history). The timing overlaps your 12 Nov Booking.com overwrite work in Smoobu, but nothing shows it was that.
   - channel, comp-east, comp-central and comp-west all show **guests see the Smoobu figure**, not PriceLabs. The cuts reached Airbnb.
2. **The P06 block change does not appear in the Dispatcher's diff.** `reservations.csv` carries no blocks. The occupancy full-record diff found it: the Marylebone "Blocked channel" record was modified 12 Nov 12:59:51 (Smoobu time) and now starts **30 Nov instead of 22 Nov**. So "no changes overnight" is true for bookings only.
3. **P06 forward occupancy: 35.3% (6/17 non-blocked), from Smoobu.** kpi_pack has 17.2% because PriceLabs (last refreshed 12 Nov 09:23Z) still counts 22-29 Nov as blocked. Without the 8 reopened nights it is 66.7% (6/9, comp-central). The fall is new inventory, not lost bookings.
4. **P20 forward occupancy: 60.7% (17/28), from Smoobu.** comp-west has 56.7% (it counts the blocked 18-19 Nov as open). kpi_pack has 58.6%. I use 60.7%.
5. **P11 darts average.**
   - occupancy and market: **£209** over 13-17 Dec (186/201/209/216/233).
   - comp-central and channel: **£203** over 13-16 Dec (the 4-night stay).
   - The PriceLabs "Your Price" (`user_price`) of £215.60 is PriceLabs' read of Smoobu before the 06:35Z refresh (pricelabs: `user_price` is the PMS price read at the last refresh). Smoobu equals the PriceLabs pushed `price` on all 36 open P11 nights (pricelabs H1).
   - Gap to your ">£300 average": **£455 over 5 nights** (market) / **£388 over 4 nights** (comp-central). I quote £209 and £455.
6. **P20 "£224.50/night" is not today's figure.** Airbnb all-in 21-25 Nov is now **£219.00/night** (comp-west). 20-24 Nov Smoobu room is £1,190 (£238.00 average; occupancy, pricelabs H5). Smoobu equals PriceLabs `price` on 20-24 Nov. The difference from `user_price` that channel noted is the normal gap after a re-price (correction 5 reading).
7. **P12 17-20 Nov.** comp-east measured parity (P44-P57, -2% to +2%) at the Smoobu-side prices 250/250/266. The 07:22:41Z PriceLabs push restored **267/273/288**. comp-east says that level is about **+5-8% vs band**, above the quality ceiling (qp -0.15 supports -15% to 0%). market says the PriceLabs level is above P75 on all 4 nights with the market below STLY. Reading: hold, unless you want the parity level kept, which needs a DSO (row 15).
8. **Missed compression fell from £590 to £453 with no improvement in our prices.** The whole Camden curve fell after the sync, so the fortnight average fell faster than our event nights (market §4). Against your darts policy level, the gap **widened from £375 to £455**.
9. **a-discount-cut rose to £1,875 next 30** because P11 8-13 Dec is now open in PriceLabs and priced under the Aggressive occupancy profile (pricelabs H2).
10. **18 Oct base rises: unchanged** (occupancy recomputed in full; pricelabs M5 agrees). No booking or cancellation since yesterday.

## Executive summary

1. **Smoobu-side manual edits on 12-13 Nov (who: UNKNOWN).**
   - 13 nights were cut 5-12% below PriceLabs in Smoobu: P12 17-19 Nov, P06 15-17 Nov, P20 14-17 Nov, P04 18-20 Nov (-£270), plus P20 13 Nov (-£17). Min stays were cut on P12 13 Nov (to 1) and P20 15 Nov (to 2, against policy min 3).
   - **PriceLabs overwrites them at the next push.** P12 was already overwritten at 07:22:41Z. That put P12 13 Nov back to min 2 with 14 Nov booked, so **P12 tonight is unsellable**. **Still in Smoobu at 07:24Z: 11 nights, -£226** (P06 £74, P20 £105, P04 £47).
   - **Please ask Reyhan, or tell us, who made them.** If the cuts are wanted, they must be PriceLabs DSOs (your call: they lower prices). The comps do not support them: P20 14-17 Nov at the Smoobu level is **P0 of 6 / -18%** vs median, and the PriceLabs level (-12% vs median, +3.5% vs the 0-review line) is what comp-west supports. P04 November is already -28% to -37% vs comps. P06 15-17 Nov is under the comp-supported level even at PriceLabs prices.
2. **P06 Marylebone (an intentional-block listing): 22-29 Nov is on sale in Smoobu and on Airbnb (£2,982 room), while PriceLabs still shows it blocked.** The Smoobu block was shortened on 12 Nov 12:59:51. Airbnb returns our listing on 22-24 Nov (£330/night all-in, P50 / -1.5%) and 22-29 Nov (£302.57/night, P0 / -7%). **Was this intended?** (new t-p06-2229open).
3. **P20 delivery: the policy entry looks out of date.** Smoobu shows the 20-22 Nov delivery block was **cancelled on 30 Oct**, and an **18-20 Nov block was created on 3 Nov** (18-19 Nov unavailable). Please confirm delivery is 18-20 Nov so `policy.json` can be updated (t-p20-delivery). 20-24 Nov (£1,190) is on sale and P0 of 7-8 comps; -5% -> 0% is supported once confirmed.
4. **P11 Camden: PriceLabs re-priced after the sync, with no user edit.**
   - 8-18 Dec fell **£2,874 -> £2,475** (-13.9%). 8-15 Dec is now **P0 / -42%** vs comps (median £375.43, unchanged).
   - Darts 13-17 Dec average **£209** (13-16 Dec £203) vs your >£300: gap **£388-455**. 3 Jan **£172** is below every comp's nightly price (cheapest £195).
   - Cause: the **Aggressive occupancy profile and Booking Recency** (a-discount-cut) reacting to P11 occ30 falling 60% -> 43%, plus Reyhan's -3% DSO. Final price sits about 15% under `uncustomized_price` on every date checked.
   - At the +10% markup, the Camden Booking.com weekly stack nets **£47.51 per £100 base** (a-p11-bcom-stack still open). A rebooking of 8-14 Dec would pay **£891.71 vs the £1,439.05 model**.
5. **Lapsed:** P13 12 Nov orphan (made min 1 at £200 during 12 Nov, did not sell); P04 min-2 window (12 Nov passed unsold, 13 Nov is a 1-night gap, nothing left to sell); P12 13 Nov (unsellable since 07:22Z, £275).
6. **Standing problems.** Barking 1455 day 14; hidden Airbnb layers day 15 (£2,363.11); PriceLabs discount gap **£633 next 14 / £1,875 next 30**; P12 pace30 **-36.5%**; missed compression **24 n / £453**; **0 Booking.com bookings since the +10% markup** (last booking 10 Nov, 2.6 days, too short to judge).

**Last 30 nights (14 Oct-12 Nov, 13 units):** occupancy **61.8%**, ADR **£171.30**, RevPAR **£105.85**, revenue **£41,282.39**, **241 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 62.3% / £170.10 / £105.98 / £41,333.93 / 243 n.

**Next 30 (13 Nov-12 Dec):** **56.1%** booked (147/262; yesterday 58.5%). **Next 60 (13 Nov-11 Jan):** **46.3%** (205/443; yesterday 48.0%).
- Source: occupancy section, live Smoobu GET 07:20:53Z, handback-aware.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, P11 13 Nov.
- Reconciliation of -4 booked nights with no booking change: 12 Nov dropped out (-6), 12 Dec came in (+2). The denominator rose by 4, including the 8 reopened P06 nights.

**7-day pickup (bookings made 7-13 Nov, to 07:20Z):**
- Gross: 7 bookings / 36 n / £7,666.48.
- Cancelled in the window: 5 / 20 n / £3,596.88.
- **Net: +16 n / +£4,069.60** (yesterday +27 n / +£6,354.39).
- The whole change is 6 Nov leaving the window (P06 18-22 Nov and P20 19-26 Dec: -11 n / -£2,284.79).

## Smoobu-side edits of 12-13 Nov

**Source:** pricelabs C1 (live `get_listing_prices`; Smoobu `/api/rates` 07:21:30Z and 07:24:29Z); channel §4; comp-west, comp-east, comp-central.

| Ref | Dates | PriceLabs `price` | Smoobu 07:21Z | Gap | After 07:22Z | What the comps support |
|---|---|---|---|---|---|---|
| P12 2699998 | 17-19 Nov (+13 Nov min 2 -> 1) | 267 / 272 / 288 | 250 / 250 / 266 | -£61 | **Overwritten** at 07:22:41Z (267/273/288; 13 Nov back to min 2, unsellable) | Parity at the Smoobu level; +5-8% vs band at PriceLabs (comp-east). Hold, or a DSO (row 15) |
| P06 3288517 | 15-17 Nov | 248 / 248 / 255 | 222 / 222 / 233 | -£74 | Still in Smoobu | Both levels under supported: Smoobu P0-P50 / -13% to -23%; supported about £260-312 room (comp-central) |
| P20 3547481 | 13-17 Nov (+15 Nov min 3 -> 2) | 267 / 286 / 247 / 238 / 241 | 250 / 270 / 222 / 210 / 222 | -£105 | Still in Smoobu | Smoobu level P0 of 6 / -18% (14-17 Nov); PriceLabs level -12% vs median, +3.5% vs 0-review line: **PriceLabs supported**, +10% not (comp-west) |
| P04 3562176 | 18-20 Nov | 147 / 150 / 155 | 130 / 135 / 140 | -£47 | Still in Smoobu | November -28% to -37% vs comps; about +10% supported over PriceLabs (comp-east) |
| **Total** | | | | **-£287** (13 nights + P20 13 Nov) | **11 nights, -£226 still in Smoobu** | |

- **The next push restores PriceLabs prices on P06, P20 and P04.** Their last push was 12 Nov 09:23Z; the next push time is UNKNOWN (pricelabs M1). P20 14 Nov is tomorrow and P06 15 Nov is in two days.
- **My read:** nothing in today's data supports the cuts. I do not propose converting them to DSOs. If you or Reyhan want them, that is your call and must be done as PriceLabs DSOs.

## P06 Marylebone 22-29 Nov opened (intentional-block listing)

| Item | Value (source) |
|---|---|
| Change | Smoobu "Blocked channel" record modified 12 Nov 12:59:51 (Smoobu time); start moved 22 Nov -> 30 Nov; runs to 31 Dec 2027 (occupancy, pricelabs C2) |
| On sale in Smoobu | 22-29 Nov: 346 / 348 / 350 / 353 / 358 / 400 / 445 / 382 = **£2,982**, min 2/3/3/3/3/4/4/4. These are prices PriceLabs computed while it held the nights as blocked |
| On Airbnb | Returned: 22-24 Nov **£330/night all-in, P50 / -1.5%** vs median £335 (n = 6); 22-29 Nov **£302.57/night** after the weekly 15%, P0 / -7% vs £326.71 (n = 3); 27-29 Nov derived £387.71, P0 / -22% (comp-central) |
| PriceLabs | Still "Blocked" on all 8 nights (last refresh 12 Nov 09:23:14Z, before the change); kpi_pack P06 fwd30 17.2% is stale |
| Who / why | NOT CHECKED (Smoobu has no user field) |
| Question | **Intended?** If yes: Sync Now on 3288517 so PriceLabs re-prices the nights, and add a date note to `policy.json intentional_blocks`. If no: re-extend the Smoobu block to start 22 Nov |

## Reyhan's changes, for you to confirm or revert

**Source:** pricelabs H4 and `get_user_logs`. **0 PriceLabs log entries since 11 Nov 17:16:47Z.** Every 9-11 Nov setting is still live. `policy.json` records none of them.

| # | Ref / setting | Your standing decision | Today's evidence | My read |
|---|---|---|---|---|
| b1 | **P04 base 220 -> 200** | Pack/`id_map` 220; PriceLabs recommends 221 | comp-east: 18-24 Nov **-28% to -37%** vs comps (NL P33); `recommend` 30d raise +10%; base +12.4% vs P50 (pricelabs M3) | **Revert to 220 recommended.** £2,536 (15 open nights next 30, pricelabs H2) x 0.10 x 0.467 = **£118** (upper bound) |
| b2 | **P11 22 Nov-18 Dec -3%** (darts 13-18 Dec) | Darts +5% "leave as it is" (24 Oct); average above £300 (21 Oct) | 13-17 Dec **£209 average**; comp median £373.75 all-in (n = 9), £300 room = P33 / -20%; market P75 about £305/night; market 13-17 Dec -0.1 to -6.4 vs STLY | **Against your decision: confirm or revert.** Revert to +5%: £1,045 x (1.05/0.97 - 1) x 0.407 = **£35**. Even reverted, the average is about £226, under £300; the rest comes from the occupancy profile (a-discount-cut) |
| b3 | **P04 13-17 Nov min 2** | Never under 3 nights | 12 Nov passed unsold; 13 Nov is a 1-night gap (14-17 Nov booked). No 2-night stay left | t-p04-min2-nov closed as lapsed (£0 vs policy). **The setting is still there**: confirm or revert so it is not copied forward |
| b4 | P04 18-24 Nov -5% | -8% on 1-25 Nov | comps -28% to -37%; +10% supported | **Confirm -5%** (the comps support more, not less) |
| b5 | **P04 6-22 Dec -5%** | Not covered | 6-12 Dec -15% to -20% vs comps, at the quality floor; 11-20 Dec inside range | **Remove on 6-12 Dec, keep 13-22 Dec.** £1,285 x 0.0526 x 0.467 = **£32** |
| b6 | **P13 10-26 Dec -5%** | Not covered; against a-peak-check | Market +3.6 to +27.3 pts on all 17 nights; under P50 on 14 of 17 | **Revert on 10-12 and 18-26 Dec** (row 11) |
| b7 | P05 29 Nov-2 Dec -5% | Not covered | £494-517/night; 29 Nov-3 Dec P0 / -14% vs comps (comp-central) | Confirm or revert. Not re-quantified today (12 Nov: £60) |
| b8 | P05 21 / 29 Dec +300% min 1; max 3,500 | Not covered | £2,074 / £2,712 (soft blocks) | Confirm intent (row 7) |
| b9 | P12 12-20 Nov and 30 Nov-3 Dec +5% | None | 17-20 Nov at parity at the guest price; 1-3 Dec P73-P80 / +13% to +16% | Your call (row 15) |
| b10 | P20 min 2 on 16-17 and 22-24 Nov; base 330 | Min 3 to 30 Nov; base 350 | Smoobu also shows 15 Nov at min 2 (Smoobu-side edit) | Confirm or revert |
| b11 | P14 min 500 -> 450 | `special_setups.P14` | 67 of 180 open nights at £450; P100 / +35% to +92%; 0% booked vs 48% | **Conflicts with your special setup:** confirm 450 (and update policy) or revert. No proposal |
| b12 | P06 11-17 Nov -10% | Intentional block (numbers only) | 15-17 Nov Smoobu £222-233; comps P0-P50 | Numbers only (row 13) |

**If you revert as recommended** (P04 base, P11 darts, P04 6-12 Dec): £118 + £35 + £32 = **£185** (upper bound). P13 is in row 11 (£69).

## Base review

`base_price` is unchanged on every listing since 10 Nov. Base vs market P50 is from pricelabs M3 (13 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 17 non-blocked nights to the 20 Dec handback; base -3.8% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (was 220)** / 221 | 46.7% vs 25%; November -28% to -37% vs comps; base +12.4% vs P50 | **Conflict: confirm 200 or revert to 220.** I recommend reverting |
| P05 | 550 / 537 | 73.3% vs 44%; 7-8 / 13-14 Dec P25 (-14% to -17%); qp +0.15; `recommend` +25%; base -5.7% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 35.3% of 17 non-blocked (66.7% of 9 without the reopened nights) vs 50%; base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback; no sellable night | **Hold; off the agenda** |
| P11 | 286 / 281 | 41.4% vs 50%; every open stay -27% to -51% vs median; `recommend` 30d fix-listing 0% / 60d +5%; base -1.7% vs P50 | **Hold 286.** No cut supported. The levers are the occupancy/recency discounts, the darts override and the Booking.com stack |
| P12 | 284 / 284 | 46.7% vs 42%; **pace30 -36.5%**; band P44-P100; base +37.2% vs P50 | **Hold 284; correct open nights with DSOs** (a-p12-trim) |
| P13 | 250 / 239 | 80.0% vs 45%; 60d 51.7% vs 38% | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 48%; P100 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 60.7% vs 39%; 43.1% vs 30% (60d); 0 reviews; base +29.4% vs P50 | **Conflict: confirm 350 or record 330** |

## What changed since 12 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): unchanged (occupancy, full recompute)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. P06 18-22 Nov) | **+8 n / +£3,888.80** |
| Raised, including P06 18-22 Nov | **+12 n / +£4,745.59** (made 23 / 83 n / £18,700.51; cancelled 12 / 71 n / £13,954.92) |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 |
| P04 | +46 n / +£1,625.79 |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 **0 n / £0**; **P05 +12 / +£4,915.21 (the whole like-for-like gain)**; P06 +10 / +£2,202.56; P09 -3 / -£244.70; **P11 -11 / -£2,355.27**; P12 +4 / +£227.79.
- **Reading:** without P05 the raised group is -4 n / -£1,026.41. Hold the bases: P05's gain is real (73.3% vs 44%; `recommend` +25%). P11's problem is the discount stack and conversion, not the base (already P0-P14).
- **New:** any booking on P06 22-29 Nov will need the same like-for-like exclusion.
- **Caveat:** the rise cannot be separated from the 24 Oct and 12 Nov markup changes, Booking.com promotions, Reyhan's overrides or the P06 block changes. n = 1-8 bookings per flat.

### Per property
| Ref | Change since 12 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked (who: UNKNOWN). 18-21 Dec stored comp median £382.67 (n = 7); ours if reopened £318.33/n = P14 / -17%. Base-rise 0. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy stale since 24 Feb. |
| P04 | **Smoobu-side cut 18-20 Nov** to 130/135/140 (PriceLabs 147/150/155). Min-2 window lapsed with no sale; 13 Nov is a 1-night gap tonight (numbers only). November -28% to -37% vs comps; 6-12 Dec at the floor. 1455 bookable (day 14). Weekly 18% (£64.31 over policy). Gap n30 £619. |
| P05 | No edit. Algorithm: 21 Dec £2,074 / 29 Dec £2,712 (were £2,198 / £2,777); 7-8 Dec £949 (P25 / -17%); 13-14 Dec £975 (P25 / -14%). Early booking 12% and LOS 10% still visible. Base-rise +12 / +£4,915.21. |
| P06 | **Block shortened 12 Nov: 22-29 Nov on sale (£2,982), PriceLabs still blocked.** **Smoobu-side cut 15-17 Nov** to 222/222/233. Fwd 35.3% of 17. |
| P08 | Booked to tonight's handback. |
| P09 | 12 Nov passed unsold (closed yesterday). No sellable night before 26 Nov. |
| P10 | Booked to the 18 Nov handback. |
| P11 | **8-14 Dec open in PriceLabs and re-priced (sync met).** 8-18 Dec £2,874 -> £2,475 with no edit; 8-15 Dec P0 / -42%; darts £209 avg (gap £455); 3 Jan £172 (below every comp); 23 Dec £276. 13 Nov blocked (lapsed). Fwd30 41.4% vs 50%. |
| P12 | **Smoobu-side cut on 17-19 Nov overwritten at 07:22:41Z; 13 Nov now unsellable (min 2).** 17-20 Nov parity at the Smoobu level; 26 Nov £306 P100; Dec +6% to +16% vs band; pace30 -36.5%. |
| P13 | **12 Nov lapsed unsold.** 10-13 Dec cheaper twin -8% on Airbnb (0.812x PriceLabs, unexplained). Reyhan's -5% unchanged on 10-26 Dec. Twins identical from 11 Jan. Fwd30 80.0%. |
| P14 | Min 450; 67 of 180 open nights at £450; P100 / +35% to +92%. Numbers only. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **Smoobu-side cut 13-17 Nov** (-£105) and 15 Nov min 2. **Delivery block history: 20-22 Nov cancelled 30 Oct, 18-20 Nov created 3 Nov.** 20-24 Nov £1,190 (re-price -2.4%, no edit), P0 of 7-8. 5 Dec orphan, 4th day. |

### Open plan items: status today
| Item | Status 13 Nov (evidence) |
|---|---|
| t-p13-1112-orphan | **Done: lapsed.** 12 Nov was made min 1 (£200/£200) during 12 Nov, by whom NOT CHECKED (0 log entries), but did not sell (occupancy, comp-west). Loss £155-200 list (£124 expected, 12 Nov estimate) |
| t-p04-min2-nov | **Done: lapsed.** 12 Nov passed unsold; 13 Nov is a 1-night gap that cannot sell at min 2 or 3; 14-17 Nov booked (pricelabs H3, channel §4, comp-east). Loss vs policy £0 (at min 3 neither night could sell). **The DSO is still set**: the conflict stays in a-p13-record (b3) |
| t-p12-1113-orphan (new) | **Done: lapsed.** P12 13 Nov became unsellable at 07:22:41Z when the push restored min 2 (14 Nov booked). £275 list, £358 all-in = P100 / +27% vs band (n = 3); a min-1 DSO today is the only way to sell it, and at that price a sale is unlikely, so I do not propose it |
| t-pl-push-fresh | **Done: fixed.** P11 8-14 Dec open in PriceLabs and Smoobu = PriceLabs on all 36 open nights (06:35Z push); every listing's last refresh pushed within 0-15 s (pricelabs C1, H1). The remaining gaps are Smoobu-side edits and the P06 block change, tracked as new items |
| a-p11-bcom-stack | Open; settings NOT CHECKED (WAF); net £47.51 per £100 at +10% |
| t-p04-doublebook | Not fixed, day 14 |
| a-airbnb-rules | Not fixed, day 15; £2,363.11 |
| a-discount-cut | Not done; £633 / £1,875 |
| a-peak-check | Not done; Reyhan's -5% still set |
| a-p12-trim | 17-20 Nov overtaken by the market (parity); December not done |
| t-p12-26nov-price | Not fixed; £306 |
| t-p20-5dec-orphan | Not fixed, 4th day |
| t-p20-delivery | Block history found; policy looks out of date |
| t-p01-1820block | Not changed |
| t-channel-gaps | Moving away: 3 Jan £172 (was £182), 23 Dec £276 (was £293) |
| t-p13-twins | Open from 11 Jan |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-13

**Ranking:** time-bound rows first (on sale now or tomorrow), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). On Airbnb-only or Airbnb-majority flats (P05, P06, P20, P01) the price is first multiplied by the observed Airbnb factor (channel §3): 0.765 up to 28 d, 0.900 at 29-59 d. Upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.667 (excl. the 8 reopened nights), P11 0.414, P12 0.467, P13 0.800, P20 0.607.
- Booked share, next 60: P05 0.667, P11 0.407, P13 0.517, P20 0.431.

**Bounds** (`kpi_pack` settings, 13 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P20 P06 P04 P12 | **NEW t-smoobu-manual-1213 (question, time-bound).** Who edited Smoobu prices and min stays on 12-13 Nov (Reyhan, you, or another tool)? **If the cuts are not wanted:** PriceLabs **Sync Now** on 3547481, 3288517 and 3562176 today, so the PriceLabs prices and P20 15 Nov min 3 return before P20 14 Nov and P06 15 Nov. **If they are wanted:** they must be PriceLabs DSOs (your call: they lower prices; not recommended by the comps). | Smoobu > Rates calendar (3547481 13-17 Nov, 3288517 15-17 Nov, 3562176 18-20 Nov); PriceLabs > Sync Now | pricelabs C1 (13 nights -£270; 11 still -£226 at 07:24Z; P12 overwritten 07:22:41Z); comp-west P20 14-17 Nov Smoobu level P0 / -18%, PriceLabs level supported; comp-east P04 -28% to -37%; comp-central P06 under supported | Restore: P20 £105 x 0.765 x 0.607 + P06 £74 x 0.765 x 0.667 + P04 £47 x 0.467 = **£108** (upper bound) | Corentin / Reyhan | 2026-11-13 |
| 2 | P06 | **NEW t-p06-2229open (confirm; not a proposal).** Was shortening the Marylebone block to start 30 Nov (12 Nov 12:59:51) intended? **If yes:** Sync Now on 3288517 (PriceLabs still holds 22-29 Nov as Blocked and has not priced them) and add a date note to `policy.json intentional_blocks`. **If no:** re-extend the Smoobu block to 22 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517; `policy.json` | occupancy, pricelabs C2: £2,982 on sale, min 2-4; comp-central: Airbnb 22-24 Nov £330/n P50 / -1.5%, 22-29 Nov £302.57/n P0 / -7% | Not quantified (policy question; £2,982 room on sale) | Corentin | 2026-11-13 |
| 3 | P04 | **t-p04-doublebook (critical, day 14).** On 1455876748739910219, **block every open night** or snooze the listing; then map it to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §2: 18-21 Nov £525.80, 6-19 Dec £2,275.22 bookable; comp-east: bookable on all 11 P04 runs (18-25 Nov £1,203, 6-13 Dec £1,291) | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-13 |
| 4 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 15).** Remove the hidden rules: nights up to 28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §3: 20 live searches 07:22-07:24Z, same factors on every synced flat (e.g. P12 7-10 Dec £621.18 = 0.765 x £812; P20 14-17 Dec 0.900) | **Realised cost £2,363.11** (confirmed stays). +£101.16 on P20 20-25 Nov if it sells | Corentin | 2026-11-14 |
| 5 | P11 | **a-p11-bcom-stack (critical; keeps every Booking.com discount).** (a) **Last Minute "Portfolio deal" 15% vs your 10%: confirm 15% (and record it) or revert to 10%.** (b) Find the fifth 10% (Weekly occupancy pricing for 2 adults, or Genius dynamic). (c) Genius dynamic Yes/No: your call. (d) Option: untick Weekly/Monthly in the Last Minute and Mobile deals. Also tell us who cancelled 8-15 Dec and why. | Booking.com extranet (Camden) > Promotions; Rates; Reservations | channel §1: at +10% the weekly stack nets **£47.51 per £100 base** (18%); 8-14 Dec rebooking would pay **£891.71 vs £1,439.05 model**; comp-central: £148.34/n = P0 / -60% if the stack recurs | On a rebooked 8-14 Dec: (a) **+£52.45**; (b)+(c) **+£209.16**. Forward volume not quantified | Corentin | 2026-11-14 |
| 6 | P04 P05 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P04, P05, P11 and P20. Live: all four Aggressive / Recency default (5-15%) / Far-out +30%; Last-minute P04 -5%, P05 -1%, P11 0%, P20 0%. **P12, P13 excluded** (net negative). On P11 this is what undoes the post-sync cut on 8-18 Dec and the darts nights. | PriceLabs 3562176 / 3166592 / 3064196 / 3547481 > Customizations | pricelabs H2, next 30: P04 £619 (-19.6%), P11 £701 (-15.8%, incl. 8-13 Dec), P05 £519 (-10.9%), P20 £123; total **£1,875 next 30 / £633 next 14**; market §2: P11 8-12 Dec under P50 on 4 of 5 nights (-£174) while the market leads STLY by 5-8 pts | 619 x 0.467 + 519 x 0.765 x 0.733 + 701 x 0.414 + 123 x 0.765 x 0.607 = **£927 / 30 days** (upper bound) | Corentin | 2026-11-14 |
| 7 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £700 = market P75 £698) and **29 Dec +300% -> 0%** (uncustomized £1,131; P90 £1,098). **7-8 Dec DSO +3% -> +29%** (£479 / £470 -> about £600 / £589) and **13-14 Dec +5% -> +31%** (£494 / £481 -> about £616 / £600), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-8 Dec P25 / -17%, 13-14 Dec P25 / -14% (n = 4), at least +25% supported; 21 Dec supported room about £517-606 (21 Dec n = 0, overlapping 20-22 Dec), 29 Dec n = 0; market §2: 7-8 Dec +£206 to P75, 13-14 Dec occ +13.1 / +5.9; `recommend(0.733, 0.44, 0.12, 0.15)` = +25% | 7-8 Dec £240 x 0.765 x 0.733 = £134; 13-14 Dec £241 x 0.900 x 0.667 = £145; 21 Dec £700 x 0.900 x 0.667 = £420: **£699** (upper bound). 29 Dec not quantified | Corentin | 2026-11-14 |
| 8 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to 21 Dec (10 Nov 14:41) intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally" to the 20 Dec handback. **If not intended:** end the block on 18 Dec so **18-20 Dec** sell at £282 / £278 / £246, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £318.33/n = P14 / -17% vs stored median £382.67 (n = 7), P27 / -8% vs band £345; parity supported, up to about +8% | £806 x 0.900 = **£725** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-14 |
| 9 | P04 P14 P05 P11 P12 P13 P20 P06 | **a-p13-record: confirm or revert Reyhan's 9-11 Nov changes** (table above). Recommended: **P04 base 200 -> 220**; **P11 22 Nov-18 Dec DSO -3% -> +5% on 13-18 Dec** (darts); **P04 6-12 Dec -5% -> 0%** (keep 13-22 Dec); **P04 18-24 Nov keep -5%**; **P04 13-17 Nov min 2: revert to min 3** (lapsed, but the DSO is still there). Confirm or revert: P14 min 450, P05 max 3,500, P05 29 Nov-2 Dec -5%, P20 min 2 and base 330 vs 350, P12 +5%. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3267077, 3166592, 3064196, 2699998, 3547481; `policy.json` | pricelabs H4 + logs (0 entries since 11 Nov 17:16:47Z); comp-east (P04 -28% to -37%; 6-12 Dec at the floor); comp-central (darts £203 = P11 / -46%); market §2 (darts gap £455) | P04 base £118 + P11 £35 + P04 Dec £32 = **£185** (upper bound) | Corentin | 2026-11-14 |
| 10 | P20 | **t-p20-delivery (back to you).** Smoobu: 20-22 Nov delivery block **cancelled 30 Oct**; 18-20 Nov block **created 3 Nov**. **Confirm delivery is 18-20 Nov so `policy.json listing_facts.P20.block_20_21_nov` can be updated.** If 20-24 Nov stay on sale: DSO **20-24 Nov -5% -> 0%**. | Smoobu > Calendar > Waterford; `policy.json`; PriceLabs 3547481 > DSO 20-24 Nov | pricelabs H5; comp-west: 21-25 Nov **£219.00/n = P0 of 8 / -20.2%**, cheapest of 12 wider; at 0% about £228.50 (-2.0% vs 0-review line); +10% not supported; market 20-24 Nov between P50 and P75 | £1,190 x 0.0526 x 0.765 x 0.607 = **£29** | Corentin | 2026-11-14 |
| 11 | P13 | **a-peak-check (conflicts with Reyhan's 11 Nov -5%: confirm or revert).** Both twins: DSO **10-12 Dec -5% -> 0%**; **18-26 Dec -5% -> 0%**; **hold 13-17 Dec at -5%**. Override of `recommend` +10%: 3064856 qp -0.15 and the kept comps are n = 2. Also: tell the channel agent to pull the Smoobu Airbnb rate/rules for 10-12 Dec (0.812x). | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 10-13 Dec cheaper twin P0 / -17.9% (n = 2), P5 of 21 wider, **0.812x PriceLabs on Airbnb (was 0.86x; other December stays 0.90x), unexplained**; Christmas wider P6-P19; market §2: +3.6 to +27.3 pts on all 17 nights, gap to P50 £459 | Cheaper twin 10-12 Dec £612 + 18-26 Dec £1,929 = £2,541 x 0.0526 x 0.517 = **£69** | Corentin | 2026-11-14 |
| 12 | P20 | **t-p20-5dec-orphan (4th day).** DSO **5 Dec min 3 -> 1**, keep £313 (outside policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1); comp-west: above market P75 £300, under the only 1-night comp £538 | £313 x 0.765 x 0.607 = **£145** | Corentin | 2026-11-14 |
| 13 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it and set 15-17 Nov **-10% -> 0%** (= `recommend` +10% on the 9 non-reopened nights). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: Smoobu level P0-P50 / -13% to -23%; supported about £260-312 room, above even PriceLabs £248-255; qp -0.016; `recommend(0.667, 0.50, 0.20, -0.016)` = +10% | If confirmed: £751 x 0.111 x 0.765 x 0.667 = **£43** | Corentin | 2026-11-14 |
| 14 | P11 | **t-channel-gaps.** DSO **3 Jan -5% -> +7%** (£172 -> about £194 = fortnight £193). Hold 23 Dec at £276 (market -5.0, soft). | PriceLabs 3064196 > DSO 3 Jan | comp-central: 3 Jan below every comp (cheapest £195), 3-6 Jan P0 / -37% (median £291.67, n = 9); market §3: 3 Jan +3.3, P50 £222 | £22 x 0.407 = **£9** | Corentin | 2026-11-14 |
| 15 | P12 | **a-p12-trim (your call: lowers a price; reverses Reyhan's +5%).** **17-20 Nov: hold** (parity at the Smoobu-side level, P44-P57). Option, only if you want that parity level kept after the 07:22Z push: DSO 17-20 Nov **+5% -> -1%** (267/273/288/292 -> about 252/258/272/276). **30 Nov-3 Dec +5% -> -5%** (£1,077 -> about £975); **7-10 Dec 0% -> -10%** (£1,083 -> about £975); **11-13 Dec 0% -> -5%** (£872 -> about £828). **Min stay 12 Dec 3 -> 2, 13 Dec 3 -> 1.** Override of `recommend` 30d "hold" with stay-level evidence. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 1: 30 Nov-3 Dec +9.5% (P57), 1-4 Dec +13% to +16% (P73-P80); 7-10 Dec +14.4% (P55); 11-14 Dec +5.8% (P57; was +15.3%); qp -0.15 supports -15% to 0%; at PriceLabs prices 17-19 Nov +5-8% vs band. market: 17-20 Nov above P75, occ -2.6 to -14.5 vs STLY. Pace30 -36.5% | Not quantified (a cut) | Corentin | 2026-11-14 |
| 16 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -15%**, keep min 1 (£306 -> about £241; uncustomized £283). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £358 all-in, **P100 / +27%** (n = 5), NL >P90; supported room £204-239 (cleaning is 42% of the 1-night all-in) | Not quantified (a cut) | Corentin | 2026-11-15 |
| 17 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §3: -£190.90 on 12-17 Jan | **£190.90** per 5-night stay | Corentin | 2026-11-15 |
| 18 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §3: -£135.24 on 12-15 Jan; -£45.12 on 10-13 Jan | **£135.24** per such stay | Corentin | 2026-11-15 |
| 19 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §3: -£92.61 / -£107.73 on 10-15 Dec | **£92.61** per 5-night stay (cheaper twin) | Corentin | 2026-11-15 |
| 20 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb listing 1657859794156786222 > Pricing > Discounts | channel §3: -£385.88 = 18.0% on 6-19 Dec; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£64.31** per 6-19 Dec stay | Corentin | 2026-11-15 |
| 21 | P13 | **t-p13-twins (from 11 Jan).** Restore a gap: DSO **3090701 about +4%** on 11 Jan-28 Feb (child only; set it after any parent edit). | PriceLabs 3090701 > DSO | comp-west: `user_price` identical 11-18 Jan; channel §3: 48 open nights identical (20 in January from 12 Jan, all 28 in February); Airbnb 12-15 Jan both £654.00 | Not quantified (duplicate-listing risk) | Corentin | 2026-11-15 |
| 22 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 7 post-cut Booking.com cancellations (P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec, P11 8-15 Dec). | Booking.com extranet > Reservations | channel §1: 7 of 20 (35%); confirmed 13 / 52 n / £8,502.99; **0 bookings since the +10% markup** | Not quantified | Corentin | 2026-11-15 |
| 23 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified (£2,962.17 at stake) | Corentin | 2026-11-15 |
| 24 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel §1 (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-15 |

**Closed today:** t-p13-1112-orphan (lapsed, £124 expected), t-p04-min2-nov (lapsed, £0 vs policy; DSO still set, kept in a-p13-record), t-p12-1113-orphan (new, lapsed, £275 list), t-pl-push-fresh (fixed).

## Top 5 for today
1. **Smoobu-side manual edits on 12-13 Nov (who: UNKNOWN; please ask Reyhan).** 13 nights were cut 5-12% below PriceLabs (P12, P06, P20, P04), with round figures and min-stay cuts. PriceLabs overwrites them at the next push: P12 was already reverted at 07:22:41Z, which left P12 tonight unsellable at min 2. 11 nights (-£226) are still live. If the cuts are wanted they must be PriceLabs DSOs; the comps support the PriceLabs level (P20 14-17 Nov at the Smoobu level is P0 / -18%). Also: **P06 22-29 Nov (£2,982) is on sale in Smoobu and on Airbnb while PriceLabs shows it blocked. Intended?**
2. **P11 Camden re-priced after the sync with no edit.** 8-18 Dec fell £2,874 -> £2,475; 8-15 Dec is P0 / -42% vs comps; darts average £209 (13-16 Dec £203) vs your >£300 (gap £388-455); 3 Jan £172 is below every comp. Cause: the Aggressive occupancy profile and Booking Recency (a-discount-cut, £701 of the £1,875 gap) plus Reyhan's -3% (confirm or revert). At +10% the Booking.com stack nets £47.51 per £100 (a-p11-bcom-stack).
3. **P20 delivery: confirm 18-20 Nov** (20-22 Nov block cancelled 30 Oct, 18-20 Nov created 3 Nov) so policy can be updated. 20-24 Nov (£1,190) is on sale and cheapest of 7-8 comps; -5% -> 0% supported (£29). 5 Dec orphan: min 1 at £313 (£145).
4. **Lapsed and smaller pricing items.** Lapsed: P13 12 Nov, P04 min-2 window (DSO still set: confirm or revert), P12 13 Nov. P13: 10-13 Dec cheaper twin fell 8% on Airbnb (0.812x, unexplained); 0% supported on 10-12 and 18-26 Dec (Reyhan's -5%: your call); twins identical from 11 Jan. P12: 17-20 Nov at parity (hold), 26 Nov P100, December +6% to +16% (trim 5-15%), pace -36.5%. P04: November -28% to -37% vs comps; remove -5% on 6-12 Dec.
5. **Standing problems.** Barking 1455 day 14; Airbnb hidden layers day 15 (£2,363.11); a-discount-cut £633 / £1,875 (£927 expected); missed compression 24 n / £453 (lower only because Camden's curve fell); 0 Booking.com bookings since +10%; base rises +8 n / +£3,888.80 like-for-like (P05 the whole gain, P11 -11 / -£2,355.27, P01 0).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 from 60 d (channel §3, day 15). New: P13 10-13 Dec sells at 0.812x, an extra ~10% on those dates only (comp-west; cause NOT CHECKED).
  - Target: **1.00x before visible discounts by 2026-11-20** (row 4).
- **Booking.com since the 24 Oct markup cut** (channel §1):
  - Gross 20 / 78 n / £13,772.36; **confirmed 13 / 52 n / £8,502.99 at 0.774x**; 7 of 20 cancelled (35%).
  - Pace 0.66 confirmed a day (about 0.33 before the cut). **0 bookings since +10% (12 Nov)**; last booking 10 Nov.
  - Targets: under 20% cancelled and at least 0.80x confirmed by 2026-11-20; at least one Booking.com booking at +10% by 2026-11-17, else review with you.
  - Whether Booking.com shows Smoobu x 1.10: NOT CHECKED (no API field; WAF; no booking since 10 Nov).
- **Net to owner per £100 base** (channel §5): Booking.com model £93.50; Camden weekly stack **£47.51**; Camden under 7 nights £55.89; Airbnb at 0.765 £64.64, at 0.900 £76.05, at 1.000 £84.50. The observed Camden and near-term Airbnb nets are below the £90 direct model.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.62 |
  | P04 synced | 4.11 (9) | 4.85 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.26 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 0 reviews | 4.8 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12 December needs trims, why P04 December sits at the floor and why P13 Christmas is held to 0%, not +10%.
  - Fixes: P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; review requests after P20's first stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P11:** P0-P14 vs comps, 9 pts under market (41.4% vs 50%); `recommend` 30d "fix-listing". Booking.com CTR 0.81% vs 1.70% (21 Oct only). Basement with a patio; 4 of 12 comps have a lift, 3 a terrace.
  - **P06:** 15-17 Nov unsold at P0-P50; 22-29 Nov reopened at P0-P50.
  - **P20:** 0 reviews; parking photo first; cheapest of 7-8 on every 20-25 Nov stay.
- **Gap fill / length of stay.**
  - Unsellable tonight: P12 13 Nov (lapsed), P04 13 Nov (policy). Unsellable later: P20 5 Dec (row 12). Soft blocks: P05 21 / 29 Dec (row 7). Min-3 pins: P12 12 / 13 Dec (row 15).
  - Short runs a gap-fill rule would sell: P11 18-19 Nov, 22-25 Nov, 23-25 Dec; P12 17-20 Nov, 26 Nov, 30 Nov-3 Dec; P05 16-17 Nov, 29 Nov-2 Dec, 7-8 and 13-14 Dec (pricelabs H6).
  - Policy min stay vs Smoobu, 2-4 months ahead below 5 nights: P11 47, P13 46 per twin, P05 44, P20 55, P04 47 nights (pricelabs H6). For you to confirm the policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps); PriceLabs > Customizations > Orphan day is not exposed by `get_customizations`: NOT CHECKED. Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): NOT CHECKED, 6 days overdue. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30.
- **Event compression** (market §4): **24 n / £453** (yesterday 24 / £590); bookable 23 / £430.
  - By flat: P11 7 n / £233 (darts 13-17 Dec £190), P20 8 n / £179, P04 9 n / £41.
  - Where the market supports a raise: P13 10-26 Dec (+£459 to P50; row 11); P05 7-8 / 13-14 Dec (+£206 / +£192 to P75; row 7); **P11 8-12 Dec to P50 (+£174; row 6)**; P04 14-19 Dec (+£175 to P75; comp-east holds 11-20 Dec at the quality cap, so only the 6-12 Dec step, row 9); P11 3 Jan (row 14).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **61.8%** (62.3% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£171.30** (£170.10) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£105.85** (£105.98) | £129 | 2026-12-18 |
| Revenue, last 30 | **£41,282.39** (241 n) | - | - |
| Booked next 30 (Smoobu) | **56.1%** (147/262) | each unit at least market + 10 pts (below: P11 41.4% vs 50%, P12 46.7% vs 42%, P06 35.3% vs 50%) | 2026-11-20 |
| Booked next 60 | **46.3%** (205/443) | at least market + 10 pts (P11 40.7% vs 39%) | 2026-11-20 |
| 7-day pickup, net | gross 7 bk / 36 n / £7,666.48; cancelled 5 / 20 n / £3,596.88; **net +16 n / +£4,069.60** | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace30 vs STLY | **-36.5%** (-12 n / -£1,651.49); to handback -39.1% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+8 n / +£3,888.80 like-for-like**; +12 n / +£4,745.59 incl. P06; P05 +12 / +£4,915.21; P11 -11 / -£2,355.27; P01 0 | positive without P05 | 2026-11-26 |
| Booking.com paid / PriceLabs (since cut) | **0.774x** (13 confirmed / 52 n / £8,502.99); 35% cancelled; 0 since +10% | at least 0.80x; cancellations under 20% | 2026-11-20 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 15; realised cost **£2,363.11** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,875 next 30; £633 next 14** | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **13 nights below PriceLabs (-£270) from Smoobu-side edits; 11 still live (-£226)**; P06 22-29 Nov open in Smoobu, Blocked in PriceLabs | 0 | 2026-11-14 |
| Unsellable orphan nights (next 60) | **3** (P12 13 Nov, P04 13 Nov (policy), P20 5 Dec), plus P05 21 / 29 Dec at +300% | 0 | 2026-11-15 |
| Double-sellable Barking stays | **every open P04 run**, day 14 | 0 | 2026-11-14 |
| Missed compression | **24 n / £453**; bookable 23 / £430 | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who made the Smoobu-side price and min-stay edits on 12-13 Nov:** UNKNOWN. Source: ask Reyhan; Smoobu has no rate history. **When P06, P20 and P04 next push:** UNKNOWN (PriceLabs `last_date_pushed` after about 09:30Z).
2. **Who shortened the P06 block (12 Nov 12:59:51) and who moved the P20 delivery block (cancelled 30 Oct, re-created 18-20 Nov on 3 Nov):** UNKNOWN. Source: Smoobu booking history, or ask Reyhan / operations.
3. **Booking.com live view** (Standard = Smoobu x 1.10, promotions, 8-14 Dec resale price, rank): NOT CHECKED (AWS WAF 07:25:43Z, not bypassed). Source: extranet screenshots.
4. **P11 fifth 10% layer and the 15% Last Minute deal; who cancelled 8-15 Dec:** NOT CHECKED. Source: extranet > Promotions / Reservations.
5. **Per-date PriceLabs factor breakdown for P11's post-sync cut and P20's 2.4% re-price:** NOT CHECKED (not in the API output).
6. **P13 10-13 Dec at 0.812x on Airbnb, P13 12 Dec twin swap, 3064856 Christmas strikethroughs:** NOT CHECKED. Source: Smoobu > Channel Manager > Airbnb rates and rules for those dates.
7. **Who set P13 12 Nov and P12 13 Nov to min 1 on 12 Nov:** NOT CHECKED (no log entry; probably the same Smoobu-side edits).
8. **Smoobu Airbnb rule settings:** still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Flexible-cancellation test result** (due 7 Nov): NOT CHECKED.
11. **Other:** Smoobu timestamp zone (UTC+1 inferred); P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; events are search summaries (venue pages unreachable: ENOTFOUND); customizations for P12, P13, P06, P14 and overrides for P06, P09, P14, P13 3090701 not read today; two `get_user_logs` calls went out in parallel by mistake (both returned 200).

```json
{"scoreboard":{"note":"13 Nov 2026. Last 30 nights = 14 Oct-12 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:20:53Z, handback-aware); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and P11 13 Nov excluded. Pickup = bookings made 7-13 Nov net of cancellations. P06 forward uses Smoobu (35.3%); kpi_pack 17.2% still counts the reopened 22-29 Nov as blocked. Base-rise like-for-like excludes P06 18-22 Nov. Airbnb ratios from 20 live searches 07:22-07:24Z (channel §3). PriceLabs gap from pricelabs H2. Booking.com since cut from channel §1. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"61.8%"},{"label":"ADR last 30","value":"£171.30"},{"label":"RevPAR last 30","value":"£105.85"},{"label":"Revenue last 30","value":"£41,282.39"},{"label":"Nights last 30","value":"241"},{"label":"Booked next 30","value":"56.1% (147/262)"},{"label":"Booked next 60","value":"46.3% (205/443)"},{"label":"7-day pickup","value":"gross 7 bk / 36 n / £7,666.48; cancelled 5 / 20 n / £3,596.88; net +16 n / +£4,069.60"},{"label":"P11 booked next 30","value":"41.4% (12/29) vs market 50%"},{"label":"P12 pace30 vs STLY","value":"-36.5% (-12 n / -£1,651.49); to handback -39.1%"},{"label":"Raised flats net since 18 Oct","value":"+8 n / +£3,888.80 like-for-like; +12 n / +£4,745.59 incl. P06; P05 +12 / +£4,915.21 (whole gain); P01 0; P11 -11 / -£2,355.27"},{"label":"Booking.com since markup cut","value":"13 confirmed, 52 n, £8,502.99; 0.774x PriceLabs; 7 of 20 cancelled (35%); 0 bookings since +10% (12 Nov)"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x from 60 d; day 15; realised cost £2,363.11"},{"label":"PriceLabs-side gap","value":"£1,875 next 30; £633 next 14"},{"label":"PriceLabs vs Smoobu","value":"13 nights below PriceLabs (-£270) from Smoobu-side edits 12-13 Nov; 11 still live at 07:24Z (-£226); P06 22-29 Nov open in Smoobu, Blocked in PriceLabs"},{"label":"Unsellable orphans","value":"P12 13 Nov, P04 13 Nov (policy), P20 5 Dec; plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 14"},{"label":"Missed compression","value":"24 n / £453; bookable 23 n / £430"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-smoobu-manual-1213","status":"open","prop":"P20 P06 P04 P12","priority":"critical","title":"New: Smoobu-side manual edits 12-13 Nov (who UNKNOWN; ask Corentin/Reyhan): 13 nights cut 5-12% below PriceLabs (P12 17-19 Nov, P06 15-17 Nov, P20 14-17 Nov, P04 18-20 Nov; -£270) plus P20 13 Nov, round figures, min stays cut (P12 13 Nov to 1, P20 15 Nov to 2); PriceLabs overwrites at next push (P12 reverted 07:22:41Z, leaving P12 13 Nov unsellable at min 2); 11 nights -£226 still live; if wanted they must be PriceLabs DSOs (your call); comps support the PriceLabs level (P20 14-17 Nov Smoobu level P0 / -18%); if not wanted, Sync Now on 3547481, 3288517, 3562176 today","gbp":108},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"New, for Corentin to confirm (policy intentional block): Smoobu Marylebone block shortened 12 Nov 12:59:51 to start 30 Nov, so 22-29 Nov (£2,982, min 2-4) is on sale in Smoobu and on Airbnb (22-24 Nov £330/n P50, 22-29 Nov £302.57/n P0 / -7%) while PriceLabs still shows it Blocked; intended? If yes Sync Now on 3288517 and note in policy; if no re-extend the block to 22 Nov","gbp":null},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 14): unsynced Barking Airbnb 1455876748739910219 bookable on every open P04 run (18-21 Nov £525.80, 18-25 Nov £1,203, 6-13 Dec £1,291, 6-19 Dec £2,275.22); block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 15, unchanged: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d); realised cost £2,363.11 on confirmed stays; +£101.16 on P20 20-25 Nov if it sells; P09 excluded (deprioritised)","gbp":2363.11},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"critical","title":"Stack unchanged as far as visible (NOT CHECKED at source, WAF): at +10% markup the Camden weekly stack nets £47.51 per £100 base (18%); a rebooking of 8-14 Dec (now £1,535) would pay £891.71 vs £1,439.05 model. Keeping all discounts: confirm or revert Last Minute 15% vs policy 10% (+£52.45); identify fifth 10% and decide Genius dynamic (+£209.16); option Last Minute/Mobile off Weekly/Monthly; who cancelled 8-15 Dec","gbp":209.16},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,875 next 30 / £633 next 14 (P11 £701 incl. 8-13 Dec, P04 £619, P05 £519, P20 £123); all four Aggressive occupancy + Booking Recency default; P11 8-18 Dec fell £2,874 -> £2,475 after the sync with no edit (8-15 Dec P0 / -42%); set Occupancy, Booking Recency and Last-minute to Custom 0% on P04, P05, P11, P20; expected £927 / 30 days","gbp":927},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,074 / 29 Dec £2,712 at Reyhan's +300% min 1 act as soft blocks: confirm intent (block in Smoobu) or, your call, both +300% -> 0% (uncustomized £700 = market P75; £1,131); 7-8 Dec +3% -> +29% (£949, P25 / -17%) and 13-14 Dec +5% -> +31% (£975, P25 / -14%) per recommend +25%","gbp":699},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block extended to 21 Dec after the 18-21 Dec cancellation, so 18-20 Dec (£282/£278/£246, min 3) are closed before the 20 Dec handback; confirm intent; if not, end the block 18 Dec (£318/n = P14 / -17% vs stored median £382.67, parity supported)","gbp":725},
{"id":"a-p13-record","status":"open","prop":"P04 P14 P05 P11 P12 P13 P20 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9-11 Nov changes (0 new log entries since 11 Nov 17:16Z): P04 base 200 (revert, £118), P11 22 Nov-18 Dec -3% vs darts +5% (13-17 Dec avg £209 vs >£300; revert £35), P04 13-17 Nov min 2 (lapsed, DSO still set: revert to 3), P04 18-24 Nov -5% (keep), P04 6-22 Dec -5% (remove on 6-12 Dec, £32), P13 10-26 Dec -5% (a-peak-check), P14 min 450, P05 max 3500 and 29 Nov-2 Dec -5%, P12 +5%, P20 min 2 and base 330 vs 350, P06 -10% (numbers only)","gbp":185},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Policy looks out of date: Smoobu 20-22 Nov delivery block cancelled 30 Oct, 18-20 Nov block created 3 Nov (18-19 Nov unavailable); Corentin to confirm delivery 18-20 Nov so policy can be updated; 20-24 Nov £1,190 on sale, 21-25 Nov £219.00/n all-in P0 of 8; if on sale, 20-24 Nov -5% -> 0% (about £228.50/n, supported)","gbp":29},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Not done: Reyhan's 10-26 Dec -5% still set (confirm or revert); both twins 10-12 Dec and 18-26 Dec -5% -> 0%, hold 13-17 Dec; 10-13 Dec cheaper twin fell 8% on Airbnb overnight (0.812x PriceLabs, unexplained; was 0.86x); market +3.6 to +27.3 pts all 17 nights, gap to P50 £459","gbp":69},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (4th day): P20 5 Dec 1-night orphan, min 3, unbookable at £313; DSO 5 Dec min 1, keep price (above market P75 £300, under the only 1-night comp £538)","gbp":145},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; Reyhan -10%; Smoobu-side cut to £222/£222/£233 (PriceLabs £248-255); comps P0-P50 / -13% to -23%, supported about £260-312 room; if confirmed record in policy and -10% -> 0% (£43), else re-block","gbp":43},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Moving away: P11 3 Jan £172 (was £182), below every comp (cheapest £195; median £291.67) -> DSO -5% -> +7% (about £194 = fortnight £193); 23 Dec £276 (was £293) hold (market -5.0); Booking.com CTR 0.81% vs 1.70% (21 Oct only)","gbp":9},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Partly overtaken: 17-20 Nov now at parity at the Smoobu-side level (P44-P57): hold (option DSO +5% -> -1% to keep that level after the 07:22Z push); not done: 30 Nov-3 Dec +5% -> -5% (+9.5%, 1-4 Dec P73-P80), 7-10 Dec 0% -> -10% (+14.4%), 11-13 Dec 0% -> -5% (+5.8%), 12 Dec min 3->2, 13 Dec min 3->1; pace30 -36.5%; lowers a price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed, price up again: Mile End 26 Nov £306 (£358 all-in, P100 +27%, n=5, NL >P90; uncustomized £283); DSO +15% -> -15% (about £241; supported £204-239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£190.90 on 12-17 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":190.9},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (-£135.24 on 12-15 Jan): not in policy - yours, or 0%?","gbp":135.24},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (-£92.61 / -£107.73 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":92.61},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (£64.31 over policy on 6-19 Dec)","gbp":64.31},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Open from 11 Jan: user_price identical on both twins 11-18 Jan; 48 open nights identical (20 in January from 12 Jan, all 28 February); Airbnb 12-15 Jan both £654.00; 5-8 Jan still +4.4%; DSO 3090701 about +4% on 11 Jan-28 Feb, set on the child after any parent edit","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"medium","title":"Unchanged: 7 of 20 post-cut Booking.com bookings cancelled (35%: P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec, P11 8-15 Dec); confirmed 13 / 52 n / £8,502.99; 0 bookings since +10%; send rate plans and reasons","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"21-25 Nov now £219.00/n all-in, P0 of 8 comps (cheapest of 12 wider), 2-10% under the 0-review line; remaining: parking first photo, review requests (0 reviews); Flexible-test 14-day comparison overdue (due 7 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -36.5% (-12 n / -£1,651.49), to handback -39.1%; base +37.2% vs P50; correct open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov Smoobu 3064856 £287 / 3090701 £272 (+50% min 1; Airbnb all-in £370 / £359, P100 of wider 3; market +16.6 Finals Weekend); 17 Nov £228/£216 at +35% (P75 of 4, P62 wider): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20 P06 P11","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P06 conversion gap (15-17 Nov unsold at P0-P50; 22-29 Nov reopened at P0-P50); P11 basement vs 4 of 12 comps with lift, recommend 'fix-listing'","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (7 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 max 780 vs 3500, P05 '5-bed'); P13 Vrbo refreshed 13 Nov with no push; P02 Vrbo stale since 24 Feb; Vrbo +8% / Direct -10% unconfirmed; record 9-11 Nov edits and P20 delivery dates in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No replacements 13 Nov; not returned on any stay: P04 1083936003491396261 and 1387112821878102742, P09 958156921765583815, P15 1557062894259099964 and 1371771992549776701, P06 2, P14 2, P17 1 (inactive NOT CHECKED); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-p13-1112-orphan","status":"done","prop":"P13","priority":"critical","title":"Lapsed: P13 12 Nov was made min 1 (£200/£200) during 12 Nov (who NOT CHECKED, no log entry) but passed unsold; loss £155-200 list (£124 expected, 12 Nov estimate)","gbp":124},
{"id":"t-p04-min2-nov","status":"done","prop":"P04","priority":"high","title":"Lapsed with no sale: 12 Nov passed unsold, 13 Nov is a 1-night gap (14-17 Nov booked), no 2-night stay left; loss vs policy £0 (at min 3 neither night could sell); Reyhan's 13-17 Nov min-2 DSO is still set: confirm or revert kept in a-p13-record","gbp":0},
{"id":"t-p12-1113-orphan","status":"done","prop":"P12","priority":"high","title":"Lapsed: P12 13 Nov became unsellable at 07:22:41Z when the PriceLabs push restored min 2 over the Smoobu-side min 1 (14 Nov booked); £275 list, £358 all-in = P100 / +27% vs band (n=3), so a min-1 DSO is not proposed","gbp":275},
{"id":"t-pl-push-fresh","status":"done","prop":"P11 P12 P06 P20 P04","priority":"high","title":"Fixed: P11 8-14 Dec open in PriceLabs and Smoobu = PriceLabs on all 36 open nights (06:35Z push); every listing's last refresh pushed within 0-15 s; remaining gaps are Smoobu-side edits (t-smoobu-manual-1213) and the P06 block change (t-p06-2229open)","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P12 P06 P20 P04","title":"13 PriceLabs ≠ Smoobu nights are Smoobu-side manual edits (round figures, near-term, min-stay cuts), not a copy error or unpushed refresh; -£270; P12 overwritten 07:22:41Z (13 Nov now unsellable); 11 nights -£226 still live; who UNKNOWN","evidence":"pricelabs C1 (live get_listing_prices = raw; refresh->push 0-15 s; 0 log entries since 11 Nov 17:16:47Z); channel §4; comp-west/comp-east/comp-central: guests see the Smoobu figure."},
{"agent":"occupancy","severity":"critical","ref":"P06","title":"P06 Marylebone block shortened 12 Nov 12:59:51 (start 22 Nov -> 30 Nov): 22-29 Nov (£2,982) open in Smoobu and on Airbnb, PriceLabs still Blocked; missed by the reservations.csv diff","evidence":"occupancy full-record Smoobu diff; pricelabs C2; comp-central (Airbnb 22-24 Nov £330/n P50, 22-29 Nov £302.57/n P0)."},
{"agent":"pricelabs","severity":"high","ref":"P20","title":"P20 delivery: 20-22 Nov block cancelled 30 Oct, 18-20 Nov block created 3 Nov; policy block_20_21_nov likely out of date","evidence":"pricelabs H5 (Smoobu reservations history)."},
{"agent":"market","severity":"high","ref":"P11","title":"P11 8-18 Dec re-priced after the sync with no edit: £2,874 -> £2,475 (-13.9%); 8-12 Dec under P50 on 4 of 5 nights (-£174) while market leads STLY by 5-8 pts; darts avg £209, gap to policy £455","evidence":"market §2/§4; pricelabs H1/H2 (Aggressive occupancy, Booking Recency on); comp-central (8-15 Dec P0 / -42%, darts P11 / -46%)."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"Every open P11 stay -27% to -51% vs comp median at room price; 3 Jan £172 below every comp; supported at the median (qp 0); no cut supported","evidence":"comp-central P11 tables; recommend 30d fix-listing / 60d +5%."},
{"agent":"channel","severity":"critical","ref":"P11","title":"At +10% markup the Camden weekly stack nets £47.51 per £100 base; 8-14 Dec rebooking would pay £891.71 vs £1,439.05 model; 0 Booking.com bookings since +10%","evidence":"channel §1 and §5."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still bookable on 18-21 Nov (£525.80) and 6-19 Dec (£2,275.22), day 14","evidence":"channel §2; comp-east 1455 table (all 11 runs)."},
{"agent":"channel","severity":"critical","ref":"P20 P12 P13 P05 P06 P04","title":"Hidden Airbnb layers unchanged on day 15 (0.765 / 0.900); realised cost £2,363.11; £101.16 on P20 20-25 Nov if it sells","evidence":"channel §3 (20 live searches)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 14-17 Nov at the Smoobu level is P0 of 6 / -18%; the PriceLabs level (-12% vs median, +3.5% vs 0-review line) is supported; 20-25 Nov P0 of 7-8, -5% -> 0% supported; 5 Dec min 1 at £313 supported","evidence":"comp-west P20 tables; market §2."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 10-13 Dec cheaper twin fell 8% on Airbnb overnight (0.812x PriceLabs, unexplained); 10-12 and 18-26 Dec back to 0% supported; twins identical from 11 Jan","evidence":"comp-west P13; market §2 (+3.6 to +27.3 pts); channel §3 (48 identical nights)."},
{"agent":"comp-east","severity":"medium","ref":"P12","title":"P12 17-20 Nov at parity at the Smoobu level (P44-P57) after cheap comps sold; 26 Nov P100 +27%; 30 Nov-3 Dec +9.5%, 7-10 Dec +14.4%, 11-14 Dec +5.8% (was +15.3%); pace30 -36.5%","evidence":"comp-east Priority 1; occupancy pace."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 November -28% to -37% vs comps (+10% supported); 6-12 Dec at the -15% floor (remove Reyhan's -5%); min-2 window lapsed with no sale","evidence":"comp-east Priority 2; pricelabs H3."},
{"agent":"pricelabs","severity":"medium","ref":"P04 P05 P11 P20","title":"PriceLabs discount gap £1,875 next 30 / £633 next 14 (P11 £701, P04 £619, P05 £519, P20 £123); all four Aggressive occupancy + Recency default","evidence":"pricelabs H2."},
{"agent":"market","severity":"medium","ref":"P11 P20 P04","title":"Missed compression 24 n / £453 (was £590): lower only because Camden's fortnight fell; P11 7 n / £233, P20 8 n / £179, P04 9 n / £41","evidence":"market §4."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises unchanged: +8 n / +£3,888.80 like-for-like (+12 / +£4,745.59 incl. P06); P05 +12 / +£4,915.21 the whole gain; P11 -11 / -£2,355.27; P01 0","evidence":"occupancy base-rise section; pricelabs M5."}
],
"top5":[
"Smoobu-side manual edits 12-13 Nov (who UNKNOWN; please ask Reyhan): 13 nights cut 5-12% below PriceLabs on P12, P06, P20, P04 with round figures and min-stay cuts; PriceLabs overwrites them at the next push (P12 already reverted at 07:22:41Z, leaving P12 tonight unsellable at min 2); 11 nights (-£226) still live; if wanted they must be PriceLabs DSOs; comps support the PriceLabs level (P20 14-17 Nov at the Smoobu level is P0 / -18%). Also P06 22-29 Nov (£2,982) is on sale in Smoobu/Airbnb while PriceLabs shows it blocked: intended?",
"P11 Camden re-priced after the sync with no edit: 8-18 Dec £2,874 -> £2,475; 8-15 Dec P0 / -42% vs comps; darts avg £209 (13-16 Dec £203) vs your >£300 (gap £388-455); 3 Jan £172 below every comp. Cause: Aggressive occupancy + Booking Recency (a-discount-cut, £701 of £1,875) plus Reyhan's -3% (confirm or revert). At +10% the Booking.com stack nets £47.51 per £100 (a-p11-bcom-stack).",
"P20 delivery: confirm 18-20 Nov (20-22 Nov block cancelled 30 Oct, 18-20 Nov block created 3 Nov) so policy can be updated; 20-24 Nov (£1,190) is on sale and cheapest of 7-8 comps, -5% -> 0% supported (£29); 5 Dec orphan min 1 at £313 (£145).",
"Lapsed: P13 12 Nov, P04 min-2 window (DSO still set: confirm or revert), P12 13 Nov. P13 10-13 Dec cheaper twin -8% on Airbnb (0.812x, unexplained); 0% supported on 10-12 and 18-26 Dec (Reyhan's -5%: your call); twins identical from 11 Jan. P12 17-20 Nov parity (hold), 26 Nov P100, December +6% to +16% (trim 5-15%), pace -36.5%. P04 November -28% to -37%; remove -5% on 6-12 Dec.",
"Standing: Barking 1455 day 14; Airbnb hidden layers day 15 (£2,363.11); a-discount-cut £633 / £1,875 (£927 expected); missed compression 24 n / £453 (lower only because Camden's curve fell); 0 Booking.com bookings since +10%; base rises +8 n / +£3,888.80 like-for-like (P05 the whole gain, P11 -11 / -£2,355.27, P01 0)."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked (who UNKNOWN); 18-21 Dec stored comp median £382.67 (n = 7), ours if reopened £318.33/n = P14 / -17%, parity supported (£725); 100% of 17 non-blocked nights booked; base-rise 0 n / £0."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 13 Nov 03:34Z via Channex."},
{"ref":"P04","change":"Smoobu-side cut 18-20 Nov to 130/135/140 (PriceLabs 147/150/155); min-2 window lapsed with no sale (13 Nov 1-night gap, numbers only); November -28% to -37% vs comps (+10% supported); 6-12 Dec at the floor (remove -5%); base 200 (revert recommended, £118); 1455 bookable (day 14); weekly 18% (£64.31); gap n30 £619; fwd30 46.7% vs 25%."},
{"ref":"P05","change":"No edit; 21 Dec £2,074 / 29 Dec £2,712 (+300% min 1, soft blocks); 7-8 Dec £949 (P25 / -17%), 13-14 Dec £975 (P25 / -14%), +25% supported; visible 12% early booking and 10% LOS 5+ still on; base-rise +12 n / +£4,915.21 (the whole like-for-like gain); fwd30 73.3% vs 44%."},
{"ref":"P06","change":"Smoobu block shortened 12 Nov 12:59:51: 22-29 Nov (£2,982) on sale in Smoobu/Airbnb, PriceLabs still Blocked (confirm); Smoobu-side cut 15-17 Nov to £222/£222/£233 (PriceLabs £248-255); comps P0-P50; base-rise +10 n / +£2,202.56; fwd30 35.3% of 17 non-blocked (66.7% of 9 without the reopened nights)."},
{"ref":"P07","change":"Intentional block; pushed 13 Nov 04:09Z."},
{"ref":"P08","change":"Booked to tonight's handback (13 Nov last night)."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"8-14 Dec open in PriceLabs and synced; re-priced with no edit: 8-18 Dec £2,874 -> £2,475, 8-15 Dec P0 / -42%; darts 13-17 Dec avg £209 vs >£300 (gap £455), Reyhan's -3% still set; 3 Jan £172 below every comp; 23 Dec £276; 13 Nov blocked (lapsed); Booking.com stack nets £47.51 per £100 at +10%; base-rise -11 n / -£2,355.27; fwd30 41.4% vs 50%."},
{"ref":"P12","change":"Smoobu-side cut on 17-19 Nov overwritten by the 07:22:41Z push (267/273/288); 13 Nov now unsellable at min 2 (lapsed, £275); 17-20 Nov parity at the Smoobu level (hold); 26 Nov £306 P100; 30 Nov-3 Dec +9.5%, 7-10 Dec +14.4%, 11-14 Dec +5.8% vs band; pace30 -36.5% (-12 n / -£1,651.49); base-rise +4 n / +£227.79."},
{"ref":"P13","change":"12 Nov orphan lapsed unsold (made min 1 at £200 during 12 Nov); 10-13 Dec cheaper twin -8% on Airbnb (0.812x PriceLabs, unexplained); Reyhan's 10-26 Dec -5% still set (0% supported on 10-12 and 18-26 Dec); 12 Dec twins swapped order; twins identical from 11 Jan; fwd30 80.0% vs 45%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 67 of 180 open nights at £450; P100 / +35% to +92%; 0% vs 48%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"Smoobu-side cut 13-17 Nov (-£105) and 15 Nov min 2 (PriceLabs level supported by comps); delivery block history: 20-22 Nov cancelled 30 Oct, 18-20 Nov created 3 Nov (confirm, update policy); 20-24 Nov £1,190 after a 2.4% re-price with no edit, 21-25 Nov £219.00/n P0 of 8; 5 Dec orphan £313 min 3 (4th day); fwd30 60.7% vs 39%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 17 non-blocked nights booked to the 20 Dec handback; base -3.8% vs P50; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (rec 221)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"November -28% to -37% vs comps vs supported -15% (qp -0.15); recommend 30d raise +10%; 46.7% vs 25%; base +12.4% vs P50 (comp-east; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 44%; 7-8 / 13-14 Dec P25 (-14% to -17%); qp +0.15; recommend +25%; base -5.7% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 6 of 17 non-blocked nights booked (6 of 9 without the reopened 22-29 Nov) vs 50%; base -11.9% vs P50 (occupancy; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"41.4% vs 50%, but every open stay -27% to -51% vs comp median; recommend 30d fix-listing 0% / 60d +5%; base -1.7% vs P50; no cut supported; levers are a-discount-cut, the darts override and the Booking.com stack (comp-central; pricelabs H1/H2)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"46.7% vs 42%; pace30 -36.5%; band P44-P100 with qp -0.15; base +37.2% vs P50; handback 13 Dec (comp-east; pricelabs M3; occupancy)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"80.0% vs 45% (+35 pts); 60d 51.7% vs 38% (comp-west; occupancy)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 48%; P100 / +35% to +92% vs comps at £450 (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"60.7% vs 39% (30d), 43.1% vs 30% (60d); 0 reviews; base +29.4% vs P50; PriceLabs level supported by comps, +10% not (occupancy; comp-west; pricelabs M3)."}
]}
```

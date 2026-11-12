# Seeker Estates - Daily revenue report, 2026-11-12 (Thursday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-12/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-12/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-11/daily-report.md` and its JSON, the dashboard action list (12 Nov, before this step), the full id list, and the overnight brief (Dispatcher: one change in `reservations.csv`, the P11 cancellation).
- `data/policy.json`, read first. It is unchanged since 25 Oct and records none of the 9-11 Nov edits. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/base/max come from `kpi_pack` `settings` (12 Nov). No base, min, max or push setting changed since 11 Nov.
- I used no guest data and no booking reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. Reyhan's P06 -10% is reported as numbers only. Whether 15-21 Nov should be open stays with you (t-p06-1521open); I do not propose it.
- P14 is numbers only. Reyhan's minimum (500 -> 450) is still reported as a conflict with your special setup. I make no P14 proposal of my own.
- P13 is one flat (3064856 + 3090701).
- Not raised again: Visibility Booster commission (Camden 18%), the 15%/20% stay discounts, Booking.com promotion stacking (I report its size only), P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes a Booking.com promotion. On Camden I ask you to confirm or revert one deal that differs from your recorded 10%, and to check one Smoobu setting.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price and the P05 21 Dec reset in a-p05-dec.
  - Reyhan's 9-11 Nov edits that cross your decisions are framed as **confirm or revert**. I do not re-propose them as new ideas.

## Corrections and conflicts resolved between sections

1. **P11 forward occupancy is 42.9% (12/28), from Smoobu.**
   - kpi_pack has 55.2%: PriceLabs still shows the cancelled 8-11 Dec as booked.
   - channel has 40.0% (12/30): it counts the blocked 12-13 Nov as open nights.
   - I use occupancy's 42.9%. P11 is now 6 pts **below** market (49%).
2. **The "P11 refresh not pushed" price gap (£325) is closed.**
   - channel: Smoobu equals the PriceLabs 15:38Z refresh on every open night of all 12 apartments.
   - pricelabs C1: the Smoobu-vs-PriceLabs gap is £0 on all 60 dates, but no push was recorded after the refresh (`last_date_pushed` 11 Nov 07:46:49Z, second day running).
   - comp-central: Smoobu P11 rose 5-12% overnight.
   - **Reading:** the prices reached Smoobu and the push timestamp is stale. The open P11 sync problem is now **availability**: PriceLabs still holds 8-14 Dec as Booked, 13 h after the cancellation. Its occupancy and recency logic priced the £1,885 now on sale for a calendar that no longer exists. Sync Now is still needed (t-pl-push-fresh).
3. **Booking.com since the 24 Oct cut: 20 made / 7 cancelled (channel) vs 22 / 9 (occupancy).**
   - The difference is the three duplicate P04 20-23 Nov rows: channel counts them once, occupancy counts each row.
   - Both agree on the live figures: **13 / 52 n / £8,502.99**. I use channel's 7 of 20 (35%).
4. **P13 twins.**
   - comp-west: met (5-8 Jan +4.4%; December about 5% apart).
   - channel: identical on **21 of 29 open January nights (11-31 Jan)** and all 28 open February nights. 10 Jan now differs.
   - Both are right for different windows. t-p13-twins stays open for **11 Jan-28 Feb**.
5. **P20 forward occupancy: 60.7% (17/28), from Smoobu.**
   - comp-west has 56.7%: it counts the blocked 18-19 Nov as open.
   - kpi_pack has 55.2%: its window starts 13 Nov, so the booked 12 Nov is outside it.
   - pl_kpis has 63%.
   - I use 60.7%.
6. **P20 5 Dec Airbnb factor.** 5 Dec is 23 days out, so the factor is 0.765, not the 0.900 used yesterday and in comp-west (about £282 room). Corrected value: **£145** (row 13).
7. **P05 21 / 29 Dec.** Today's prices are **£2,198 / £2,777**. The brief's £2,230 / £2,786 were 11 Nov values (pricelabs H3).
8. **P11 darts average.**
   - occupancy: £225.00 over 13-17 Dec (5 nights: 231/208/215/225/246).
   - comp-central: £219.75 for the 13-17 Dec 4-night stay.
   - market: £218 over 13-15 Dec.
   - All three are the same Smoobu prices over different spans. I quote £225 (the policy range 13-17 Dec).
9. **P13 3064856 10 Dec 272 vs user_price 221: resolved.** Today it is 256 / 264 (comp-west). I drop that sub-question from a-peak-check.
10. **18 Oct base rises.**
    - occupancy recomputed in full: **+8 n / +£3,888.80 like-for-like; +12 n / +£4,745.59 including P06.**
    - pricelabs M5 gets the same by arithmetic.
    - The only change is the P11 8-15 Dec cancellation (-7 n / -£1,012.86).

## Executive summary

1. **Tonight, and items that lapsed.**
   - **P13 12 Nov is a new orphan tonight.** 11 Nov passed unsold, the 13 Nov arrival is tomorrow, and min 2 means 12 Nov cannot sell. Only min 1 sells it: **£124**.
   - **P04 12-13 Nov is on sale tonight as a 2-night stay** because of Reyhan's 11 Nov min 2. Your rule is never under 3: confirm or revert.
   - **Lapsed:**
     - P09 12 Nov passes unsold (£117).
     - P06 11 Nov passed unsold (£200 list, £108 expected).
     - P11 11-13 Nov block: 11 Nov lost; 12-13 Nov is still blocked (£463 list) and becomes unsellable after tonight. Reason for the block: UNKNOWN.
2. **P11 Camden Booking.com 8-15 Dec was CANCELLED** at 11 Nov 18:03 Smoobu time, 24.6 h after it was made.
   - Who cancelled and why: **NOT CHECKED**. Smoobu has no such field; the extranet reservation page would show it.
   - 8-14 Dec are back on sale in Smoobu at **£1,885** (P14, -28% vs comp median £375). PriceLabs still shows them booked: **Sync Now**.
   - The stack has not changed as far as we can see. The next Camden booking on these dates would pay about **£1,094 of a £1,843 model**. a-p11-bcom-stack and t-bcom-markup-110 stay open.
3. **Darts and Reyhan's edits.**
   - Darts 13-17 Dec average **£225** vs your ">£300" and comp median **£394** (P11). Reyhan's -3% replaced your +5%: confirm or revert. Even after reverting, the average is about £244.
   - Reyhan's 11 Nov edits:
     - P13 Christmas 10-26 Dec -2% -> **-5%**, the opposite of a-peak-check (comps and market support 0%).
     - P04: 11-17 Nov **min 2**, 18-24 Nov **-5%** vs your -8%, and new **6-22 Dec -5%** (comps support removing it on 6-12 Dec).
     - P06 -10% on 11-17 Nov.
     - P20 -5% re-saved on 20-21 Nov, which are the policy delivery dates.
   - The 9-10 Nov settings are all still live: P04 base 200, P14 min 450, P05 max 3,500 with +300% on 21/29 Dec, and P12 +5%.
4. **P20 is synced.** The re-sync cut prices 4-15%.
   - 21-25 Nov is now **£224.50/night all-in, the cheapest of 9 comps** (P0, -19.6%).
   - Moving 20-24 Nov back to 0% is supported, but only after you confirm the delivery dates (t-p20-delivery).
   - 5 Dec is still an orphan: min 1 at £313 = **£145**.
5. **Standing problems.**
   - Barking 1455, day 13: still bookable on every open P04 run.
   - Hidden Airbnb layers, day 14: running cost **£2,363.11**.
   - PriceLabs discount gap (a-discount-cut): **£843 next 14 / £1,687 next 30**.
   - P12 pace30: **-35.1%**.
   - Missed event compression: **24 n / £590**.

**Last 30 nights (13 Oct-11 Nov, 13 units):** occupancy **62.3%**, ADR **£170.10**, RevPAR **£105.98**, revenue **£41,333.93**, **243 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 63.3% / £169.32 / £107.24 / £41,822.67 / 247 n.

**Next 30 (12 Nov-11 Dec):** **58.5%** booked (151/258; yesterday 60.5%). **Next 60 (12 Nov-10 Jan):** **48.0%** (211/440; yesterday 50.5%).
- Source: occupancy section, live Smoobu GET at 07:19:36Z, handback-aware.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 22 Nov, P20 18-19 Nov and P11 12-13 Nov.
- Of the -7 booked nights, P11 accounts for -3 (8-10 Dec cancelled). The rest is the window rolling forward.

**7-day pickup (bookings made 6-12 Nov, to 07:19Z):**
- Gross: 10 bookings / 52 n / £10,869.00.
- Cancelled in the window: 5 / 25 n / £4,514.61.
- **Net: +27 n / +£6,354.39** (yesterday +26 n / +£6,625.81).
- P11 nets 0: the stay was made and cancelled inside the window.

## Overnight: P11 Camden Booking.com 8-15 Dec cancelled

| Item | Value (source) |
|---|---|
| Stay | 7 n, 2 adults, room £1,012.86, commission £209.13 (18% booster, expected), booked 10 Nov, cancelled 11 Nov 18:03:27 Smoobu time (about 17:03Z) (occupancy, channel §1) |
| Who / why / any fee | **NOT CHECKED.** Smoobu has no cancelled-by or reason field and no payout element; the `notice` field was not read (data rules). Source: Booking.com extranet > Reservations |
| Back on sale | **Smoobu: yes.** 8-18 Dec is one 11-night open run at min 3: 261 / 250 / 274 / 329 / 332 / **231 / 208 / 215 / 225 / 246** / 303. 8-14 Dec = **£1,885** (it paid £1,012.86). **PriceLabs: still "Booked"** (refresh 11 Nov 15:38Z, before the cancellation). **Booking.com: NOT CHECKED** (AWS WAF 07:24:48Z, not bypassed) |
| vs comps | 8-15 Dec Smoobu £269.29/n = **P14 / -28%** vs median £375.43 (n = 7). At the policy-expected guest price (x 0.85 weekly + cleaning) it is £250.18 = P14 / -33%. If the same stack recurs: £177.30 = **P0 / -53%** (comp-central) |
| If it rebooks under the same stack | List at Smoobu x 1.10 = £2,077 x 0.5267 = **£1,093.96**, against the model (x 1.15 x 0.85) of **£1,842.59**. At x 1.15: £1,144.00 (channel §1). Last Minute 0-28 d now applies (8 Dec is 26 d out) |
| Effects | P11 fwd30 **55.6% -> 42.9%**, fwd60 54.4% -> 41.4%. P11 pickup +7 -> 0. Base-rise tally P11 **-4 -> -11 n / -£2,355.27**. Booking.com since cut: live 14 -> **13**, cancelled 6 -> **7 of 20 (35%)**. t-cleaning-commission: the £26.82 on this stay drops out; 3 entries remain (£79.32). Missed compression +2 n / +£132 (13-14 Dec back below the fortnight) |

## Reyhan's 9-11 Nov changes, for you to confirm or revert

**Source:** pricelabs C2 and `get_user_logs`. Since 11 Nov 06:00Z there are **9 new listing entries, all by Reyhan, on 11 Nov between 15:38Z and 17:16Z**. Each edit was refreshed and pushed. Every 9-10 Nov setting is still live (live `get_listing_data` 07:20Z). `policy.json` records none of them.

### A. Settings (base / min / max), unchanged since 9 Nov
| Ref | Change | Your standing decision | Today's evidence | My read |
|---|---|---|---|---|
| **P04** 3562176 | Base 220 -> **200** | None recorded (pack and `id_map` say 220; PriceLabs recommends 221) | comp-east: November 18-24 Nov **-30% to -39%** vs comps (NL P27). The quality-supported level is -15%, so the supported move is **+7-10%**. December is P54 | **Revert to 220 recommended.** £2,437 (next 30 open, pricelabs H2) x 0.10 x 0.467 = **£114** (upper bound) |
| **P14** 3267077 | Min 500 -> **450** | `special_setups.P14` (£500 minimum) | 66 of 180 open nights at £450; P100, +29% to +113% vs comps; 0% booked vs 46% | **Conflicts with your special setup.** Confirm 450 (and update policy) or revert to 500. No proposal from me |
| **P05** 3166592 | Max 2,500 -> **3,500** | Not covered | Only 29 Dec (£2,777) is above 2,500 | Confirm or revert; linked to a-p05-dec |

### B. Date overrides that cross your decisions or the evidence
| # | Ref / dates | Your decision | Now | Evidence | Direction |
|---|---|---|---|---|---|
| b1 | **P11 13-18 Dec (darts)** | Darts +5%, "leave as it is"; average above £300 (21/24 Oct) | **-3% min 3** (9 Nov) | 13-17 Dec **£231 / £208 / £215 / £225 / £246, average £225** (13-14 Dec reopened). comp-central: median **£394 (n = 9)**, ours P11 / -44%; £300 room would be P33 / -24%; the qp-0 median is about £357 room. market: 13-17 Dec occ +0.8 / -6.1 / -1.9 / -2.8 / +1.1 vs STLY; P75 about £304/night | **Against your decision: confirm or revert.** Revert = +5%: £1,125 x (1.05/0.97 - 1) x 0.414 = **£38**. Even reverted, the average is about £244, under your £300. Which of your two decisions governs (+5% or >£300) is for you to say |
| b2 | **P04 11-17 Nov min 2, price 0%** (NEW, 11 Nov 17:16:19Z) | "Never open for less than 3 nights"; -8% on 1-25 Nov (24 Oct) | 12-13 Nov **£146 / £147 at min 2**. Synced Airbnb sells **12-14 Nov as 2 nights** (£378.05 card) | channel §2, comp-east, pricelabs C2 | **Conflict: confirm or revert** (row 2). Revert = DSO 11-17 Nov min 3 |
| b3 | **P04 18-24 Nov -5% min 3** (NEW, 17:16:39Z) | -8% on 1-25 Nov | £138-148 | comp-east: P0, -30% to -39% vs comps. The comps support the higher price, not your -8% | **Confirm -5% recommended** (the evidence is on Reyhan's side); reverting to -8% would cut further |
| b4 | **P04 6-22 Dec -5% min 3** (NEW, 17:16:47Z) | Not covered | 6-12 Dec £179-193 (6-19 Dec down 1-5%) | comp-east: 6-12 Dec now **-11% to -19%** vs comps, at or below the -15% quality floor; 11-20 Dec inside range | **Remove on 6-12 Dec (0%), keep on 13-22 Dec.** £1,288 x 0.0526 x 0.467 = **£32** |
| b5 | **P13 10-26 Dec -2% -> -5%** (NEW, 15:38:45Z, copied to 3090701 and Vrbo) | Not covered; runs against open a-peak-check | 3064856 £3,701 (was £3,807), 3090701 £3,760 (was £3,948) | comp-west: 10-13 Dec back to 0% supported; Christmas 0% supported. market: occ **+4.9 to +27.3 pts** on all 17 nights, under P50 on 15 of 17 | **Revert recommended** (row 9, a-peak-check) |
| b6 | P13 12 Nov -5% | 0% on 8-12 Nov (24 Oct) | £164 / £155, min 2 | Unsellable tonight (orphan) | Moot unless min 1 (row 1) |
| b7 | P05 29 Nov-2 Dec -5% min 3 | Not covered | £499-514 | comp-central 29 Nov-3 Dec P0 / -30%; `recommend` +25% | Confirm or revert: £2,024 x 0.0526 x 0.765 x 0.733 = **£60** |
| b8 | P05 21 / 29 Dec +300% min 1 | Not covered | £2,198 / £2,777 | Soft blocks (a-p05-dec) | Confirm intent |
| b9 | **P12 12-20 Nov and 30 Nov-3 Dec +5%** (10 Nov) | None; a-p12-trim not approved | 17-20 Nov £247-291; 30 Nov-3 Dec £1,113 | comp-east: 2-night band P64-P70 (+15% to +29%); pace30 -35.1% | **Your call** (row 17) |
| b10 | **P20 20-21 Nov -5% min 3 re-saved** (11 Nov 17:15:58Z); 13-15 Nov -5% min 3 re-saved | Delivery block 20-22 Nov; -5% on 31 Oct-19 Nov | 20-24 Nov £1,219 | 13-15 Nov sits inside your -5% range (no conflict). Pricing 20-21 Nov treats delivery dates as for sale | See t-p20-delivery (row 14) |
| b11 | P20 16-17 / 22-24 Nov min 2 (8 Nov); base 330 | Min 3 to 30 Nov; base 350 (24 Oct) | as shown | channel §4, pricelabs C2 | Confirm or revert |
| b12 | P06 11-17 Nov -8% -> **-10%** min 2 (NEW, 17:12:54Z) | Intentional block (numbers only) | 15-17 Nov £245 / £245 / £254 | comp-central: P0-P50, -8% to -16% vs median | Numbers only; see t-p06-1521open (row 15) |

**If you revert as recommended** (P04 base, P11 darts, P05 29 Nov-2 Dec, P04 6-12 Dec): £114 + £38 + £60 + £32 = **£244** (upper bound). The P13 Christmas revert is in row 9 (£71). P14 back to 500: £0 measurable (0% booked).

## Base review

`base_price` is unchanged on every listing since 10 Nov. Base vs market P50 is from pricelabs M3 (11 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 18 non-blocked nights to the 20 Dec handback; 0 open nights; base -2.7% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question (t-p01-1820block) |
| P04 | **200 (was 220)** / 221 | 46.7% vs 24%; November -30% to -39% vs comps; December P54; qp -0.15; base +13.6% vs P50 | **Conflict for you: confirm 200 or revert to 220.** I recommend reverting |
| P05 | 550 / 537 | 73.3% vs 43%; open December P25 vs comps (-34% to -44%); qp +0.15; `recommend` +25%; base -4.7% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 70.0% of 10 non-blocked nights vs 50%; base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 93.3% vs 38% to the 26 Nov handback; no sellable night left | **Hold; off the agenda** |
| P11 | 286 / 281 | **42.9% vs 49%** (now below market); comps P9-P14, open stays -23% to -45%; `recommend` 30d "fix-listing" 0% / 60d +5%; base -1.0% vs P50 | **Hold 286.** No cut is supported (already P10). The levers are the Booking.com stack, the darts override and conversion |
| P12 | 284 / 284 | 46.7% vs 42%; **pace30 -35.1%** (-12 n / -£1,556.45); to handback -40.4%; band P58-P100; base +38.5% vs P50 | **Hold 284; correct open nights with date overrides** (a-p12-trim) |
| P13 | 250 / 239 | 80.0% vs 45% (+35 pts); 60d 51.7% vs 38% | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 (was 500) | 0% vs 46%; P100 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 351 | 60.7% vs 38% (30d), 44.8% vs 30% (60d); 0 reviews; base +31.0% vs P50; re-sync cut 4-15% | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 11 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (occupancy, full recompute)
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+8 n / +£3,888.80** (was +15 / +£4,901.66) | The only change: P11 8-15 Dec cancelled (-7 / -£1,012.86) |
| Raised, including P06 18-22 Nov | **+12 n / +£4,745.59** (made 23 / 83 n / £18,700.51; cancelled 12 / 71 n / £13,954.92) | |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 (unchanged) | |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 (unchanged) | |
| P04 | +46 n / +£1,625.79 (unchanged) | |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:**
  - P01 **0 n / £0**.
  - **P05 +12 / +£4,915.21: the whole like-for-like gain.**
  - P06 +10 / +£2,202.56 (includes +4 / +£856.79 reopened).
  - P09 -3 / -£244.70.
  - **P11 -11 / -£2,355.27** (back to the 10 Nov figure).
  - P12 +4 / +£227.79.
- **Reading:** without P05, the raised group is **-4 n / -£1,026.41** like-for-like.
  - **Hold the bases.** P05's gain is real (73.3% vs 43%, comps support +25%).
  - P11's problem is the Booking.com stack and conversion, not the base: it is already P10 vs comps.
- **Caveat:** the rise cannot be separated from the markup cut, Booking.com promotions, Reyhan's overrides or the P06 block change. n = 1-8 bookings per flat.

### Per property
| Ref | Change since 11 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked (who extended the block: UNKNOWN). Comps 18-21 Dec median £353.50 (n = 8); we would be £318.33/n = P25 / -10%, parity supported. Base-rise 0. Pushed 12 Nov 04:50Z. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy stale since 24 Feb. |
| P04 | **Reyhan 11 Nov: 11-17 Nov min 2 / 0%; 18-24 Nov -5%; 6-22 Dec -5%.** 12-13 Nov on sale as 2 nights (policy conflict). November P0 / -30% to -39%; 6-12 Dec -11% to -19% (at the floor). **1455 still bookable (day 13).** Weekly 18% (£64.37 over policy on 6-19 Dec). Gap n30 £644. Fwd30 46.7% vs 24%. |
| P05 | No edit. 21 Dec **£2,198** / 29 Dec **£2,777** (+300% min 1). 7-8 Dec £923 P25 / -44%; 13-14 Dec £1,023 P25 / -34%. Visible 12% early booking and 10% long-stay still on. Base-rise +12 / +£4,915.21. Fwd30 73.3% vs 43%. |
| P06 | **11 Nov passed unsold (t-p06-open lapsed).** Reyhan -10% on 11-17 Nov; 15-17 Nov £245-254, P0-P50 / -8% to -16%. Fwd 70.0% of 10. |
| P08 | Booked to the 13 Nov handback. |
| P09 | **12 Nov passes unsold tonight (t-p09-1112block lapsed, £117).** No sellable night left before the 26 Nov handback. |
| P10 | Booked to the 18 Nov handback. |
| P11 | **Booking.com 8-15 Dec cancelled** (who/why NOT CHECKED). 8-14 Dec back on sale at £1,885 (P14 / -28%); PriceLabs still shows it booked. Darts 13-17 Dec average £225 vs >£300 / median £394. Price gap vs PriceLabs closed (£0). 12-13 Nov still blocked (lapsed). Fwd30 **42.9%** vs 49%; base-rise **-11 / -£2,355.27**. |
| P12 | No edit since 10 Nov. Algorithm: 17-20 Nov £247-291, 26 Nov **£298** (P100), 30 Nov-3 Dec £1,113, 7-10 Dec £1,106, 11-13 Dec £940 (P77, NL >P90). Pace30 **-35.1%**; to handback -40.4%. Base-rise +4 / +£227.79. |
| P13 | **Reyhan 10-26 Dec -2% -> -5%** (against a-peak-check). **12 Nov orphan tonight (new).** Special offer not seen on any of 5 searches. 10 Dec price/user_price gap gone. Twins identical 11 Jan-28 Feb. Fwd30 80.0% vs 45%. |
| P14 | Min 450 (Reyhan). 66 of 180 open nights at £450; P100. Numbers only. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **Cancellation now in PriceLabs; 20-24 Nov open at £1,219** (re-sync cut 4-15% with no edit on 16-17 / 22-24 Nov and December; which factor moved is NOT CHECKED). 21-25 Nov **£224.50/n, P0 of 9**. Reyhan re-saved 13-15 and 20-21 Nov -5% min 3. 5 Dec orphan £313. Fwd30 60.7%. |

### Open plan items: status today
| Item | Status 12 Nov (evidence) |
|---|---|
| t-p09-1112block | **Done: lapsed.** 12 Nov passes unsold (£117, min 2); not offered on Airbnb at 07:23Z; no P09 log entry (occupancy, comp-east, channel §6). Loss **£117** list |
| t-p06-open | **Done: lapsed.** 11 Nov passed unsold at £200, min 2 (occupancy). Loss **£200** list (£108 expected) |
| t-p11-1013block | **Done: lapsed.** The block still covers 10-13 Nov. 11 Nov lost; 12-13 Nov (£207 / £256 = **£463** list) cannot sell after tonight (13 Nov alone is under min 2). Reason: UNKNOWN. If you delete the block this morning, 12-13 Nov can still sell tonight |
| t-p13-special-offer | **Done: lapsed.** The offer sat on 11-13 Nov; it was not seen on any of 5 P13 searches 12 Nov (channel §3). Removed or date-bound, and who set it: NOT CHECKED. No booking, so £0 lost |
| t-pl-push-fresh | **P20 met; P11 price gap met (£0); P11 availability NOT met** (8-14 Dec Booked in PriceLabs; last push 07:46:49Z, crosses 24 h at 07:46Z today) |
| a-p11-bcom-stack / t-bcom-markup-110 | The stay is gone; the settings are unchanged and NOT CHECKED at source. They apply to the next Camden booking. **Open** |
| t-p04-doublebook | Not fixed, day 13 (channel §2; comp-east) |
| a-airbnb-rules | Not fixed, day 14; £2,363.11 (channel §3) |
| a-discount-cut | Not done; £843 / £1,687 (pricelabs H2) |
| a-peak-check | **Moved the other way** (Reyhan -5%) |
| a-p12-trim / t-p12-26nov-price | Not done; 26 Nov rose to £298 |
| a-p05-dec | Open; DSOs unchanged |
| t-p20-5dec-orphan | Not fixed (£313, min 3, unbookable) |
| t-p20-delivery | Still open; 20-21 Nov re-priced by Reyhan as sellable |
| t-p01-1820block | Not changed |
| t-channel-gaps | Closer: 3 Jan £182 (was £174), 23 Dec £293 (was £274) |
| a-bcom-cancel | **7 of 20 (35%)**: P11 8-15 Dec added |
| t-cleaning-commission | P11 8-15 Dec £26.82 drops out; 3 entries remain (£79.32) |
| t-p13-twins | Open for 11 Jan-28 Feb (correction 4) |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-12

**Ranking:** time-bound rows first (tonight, today's sync), then critical rows and your confirmations, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). On Airbnb-only or Airbnb-majority flats (P05, P06, P20, P01) the price is first multiplied by the observed Airbnb factor (channel §3): 0.765 up to 28 d, 0.900 at 29-59 d. Upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.700 (ex-blocks), P11 0.429, P12 0.467, P13 0.800, P20 0.607.
- Booked share, next 60: P05 0.683, P11 0.414, P12 0.438 (to handback), P13 0.517, P20 0.448.

**Bounds** (`kpi_pack` settings, 12 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P13 | **NEW t-p13-1112-orphan (tonight).** DSO **12 Nov min 2 -> 1** on 3064856 (copies to 3090701), keep £164 / £155. If not set today it lapses. | PriceLabs 3064856 > DSO 12 Nov | occupancy orphan table: 11 Nov passed unsold, 13-17 Nov arrives tomorrow; pricelabs C3 | £155 (cheaper twin) x 0.800 = **£124** | Corentin | 2026-11-12 |
| 2 | P04 | **NEW t-p04-min2-nov (conflict, live tonight).** Reyhan's 11 Nov DSO puts **11-17 Nov at min 2**; Smoobu and synced Airbnb sell 12-14 Nov as 2 nights (£146 / £147). Your rule: never under 3. **Confirm min 2 (and record it) or revert: DSO 11-17 Nov min 3.** Not a proposal. | PriceLabs 3562176 > DSO 11-17 Nov; `policy.json` | pricelabs C2; channel §2 (£378.05 card 07:21:27Z); comp-east (£189.50/n) | Not quantified (policy question) | Corentin | 2026-11-12 |
| 3 | P11 | **t-pl-push-fresh.** **Sync Now on 3064196**, then confirm PriceLabs shows **8-14 Dec open and re-priced** and that `last_date_pushed` moves past 11 Nov 07:46:49Z. P20: met. | PriceLabs > 3064196 > Sync Now | pricelabs C1: 8-14 Dec Booked 13 h after the cancellation; refresh 15:38Z with no push timestamp; Smoobu = PriceLabs on all 60 dates (£0 gap); channel §1 | Not quantified (PriceLabs will re-price the 11-night run, £2,874 now) | Corentin | 2026-11-12 |
| 4 | P04 | **t-p04-doublebook (critical, day 13).** On 1455876748739910219, **block every open night** or snooze the listing; then map it to Smoobu 3562176 (it keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §2: 18-21 Nov £525.80, 6-19 Dec £2,275.22 bookable; comp-east: bookable on all 11 P04 runs (18-25 Nov £1,203, 6-13 Dec £1,291) | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-12 |
| 5 | P11 | **a-p11-bcom-stack (critical; keeps every Booking.com discount).** The 0.5267x stay is cancelled, but the stack applies to the next Camden booking, and 8-15 Dec is back on sale. **(a) Last Minute "Portfolio deal" 15% (6 Nov, 0-28 d) vs your 10% (24 Oct): confirm 15% (and record it) or revert to 10%.** (b) Find the fifth 10% (Weekly occupancy pricing for 2 adults, or Genius dynamic). (c) Genius dynamic Yes/No: your call. (d) Option: untick Weekly/Monthly in the Last Minute and Mobile deals so they apply to Standard only. Also tell us who cancelled 8-15 Dec and why. | Booking.com extranet (Camden) > Promotions; Rates > Weekly plan; Reservations | channel §1: a rebooking would pay **£1,093.96 vs the £1,842.59 model**; comp-central: £177.30/n = P0 / -53% if the stack recurs, vs supported about £375 all-in | Per comparable 7-night stay: (a) +£59.57; (b)/(c) +£112.54; (d) **+£311 to +£389** room. Forward volume not quantified | Corentin | 2026-11-13 |
| 6 | Portfolio (P04 P11 P12 P13 P20) | **t-bcom-markup-110.** Is the Smoobu global Booking.com markup **+15%** (policy 24 Oct) or +10%? If +10%, set +15% and run a full resync. | Smoobu > Channel Manager > Booking.com > price settings | channel §1 / pricelabs: 13 Camden nights on 10 Nov = ceil(Smoobu x 1.10); no new evidence today (WAF) | **+£50.04** on a re-sold 8-15 Dec under the same stack (£1,144.00 vs £1,093.96) | Corentin | 2026-11-13 |
| 7 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 14).** Remove the hidden rules: nights 1-28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). P09 is excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §3: 23 live searches 07:21-07:23Z, same factors on every synced flat (e.g. P12 17-20 Nov £579.09 = 0.765 x £757) | **Realised cost £2,363.11** (confirmed stays). +£103.62 on P20 20-25 Nov if it sells. Forward: 23.5% off every Airbnb night sold up to 28 d out | Corentin | 2026-11-13 |
| 8 | P04 P14 P05 P11 P12 P13 P20 P06 | **a-p13-record: confirm or revert Reyhan's 9-11 Nov changes** (tables A and B). Recommended: **P04 base 200 -> 220**; **P11 13-18 Dec -3% -> +5%**; **P04 6-12 Dec -5% -> 0%** (keep 13-22 Dec); **P04 18-24 Nov keep -5%** (comps support it over your -8%). Confirm or revert: P14 min 450, P05 max 3,500, P05 29 Nov-2 Dec -5%, P20 min 2 on 16-17 / 22-24 Nov, P20 base 330 vs 350, P12 +5% (row 17). P13 10-26 Dec in row 9. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3267077, 3166592, 3064196, 2699998, 3547481; `policy.json` | pricelabs C2 + logs; comp-east (P04 Nov -30% to -39%, Dec 6-12 at the floor); comp-central (darts median £394); market §2 | P04 base £114 + P11 £38 + P05 £60 + P04 Dec £32 = **£244** (upper bound) | Corentin | 2026-11-13 |
| 9 | P13 | **a-peak-check (conflicts with Reyhan's 11 Nov -5%: confirm or revert).** Both twins: DSO **10-12 Dec -5% -> 0%**; **18-26 Dec -5% -> 0%**; **hold 13-17 Dec at -5%**. Override of `recommend` +10%: 3064856 qp -0.15 and the kept Christmas comps are n = 2. | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 10-13 Dec P50 (n = 2) / P19 wider, -17.5% vs line, 0% supported; 14-17 Dec P57-P86, hold; 20-27 Dec wider P5-P14, PriceLabs 11-23% under market P50. market: +4.9 to +27.3 pts on all 17 nights, net gap to P50 £466 | 12 n x £217.71 (£3,701 / 17) x 0.0526 x 0.517 = **£71** | Corentin | 2026-11-13 |
| 10 | P04 P05 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P04, P05, P11 and P20. P11 is still Aggressive / Recency default / LM 0% (read live). **P12, P13 and P09 are excluded** (net negative or no open nights). | PriceLabs 3562176 / 3166592 / 3064196 / 3547481 > Customizations | pricelabs H2, next 30: P04 £644 (-20.9%), P11 £539 incl. 8-12 Dec, P05 £369, P20 £241; total **£1,687 (£1,813 incl. P11 8-12 Dec) / £843** next 14 | 644 x 0.467 + 369 x 0.765 x 0.733 + 539 x 0.429 + 241 x 0.765 x 0.607 = **£851 / 30 days** (upper bound) | Corentin | 2026-11-13 |
| 11 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): are they meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec -> fixed £900** and **29 Dec +300% -> 0%** (uncustomized £1,120). **7-8 Dec DSO +3% -> +29%** (£471 / £452 -> about £589 / £565) and **13-14 Dec +5% -> +31%** (£518 / £505 -> about £648 / £631), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 21 Dec supported £796-1,087 room, market P75-P90 £700-903 (£900 is inside both); 29 Dec n = 0; 7-8 Dec P25 / -44%; 13-14 Dec P25 / -34%; `recommend(0.733, 0.43, 0.08, 0.15)` = +25%. market: 7-8 Dec +£237 to P75, 13-14 Dec occ +11.8 / +4.8 | 21 Dec £900 x 0.900 x 0.683 = £553; 7-8 Dec £231 x 0.765 x 0.733 = £130; 13-14 Dec £256 x 0.900 x 0.683 = £157: **£840** (upper bound). 29 Dec not quantified | Corentin | 2026-11-13 |
| 12 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to 21 Dec (10 Nov 14:41, 36 s after the cancellation) intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally" to the 20 Dec handback. **If not intended:** end the block on 18 Dec so **18-20 Dec** sell at £284 / £276 / £246, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £318.33/n = P25 / -10% vs median £353.50 (n = 8), parity supported (up to +6-10% still parity); NL P52 | £806 x 0.900 = **£725** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-13 |
| 13 | P20 | **t-p20-5dec-orphan.** DSO **5 Dec min 3 -> 1**, keep £313. This is outside policy's min-3 window (ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1); comp-west: above market P75 £300, under the only 1-night comp £567; market Jingle Bell Ball +2.3 | £313 x **0.765** x 0.607 = **£145** (correction 6) | Corentin | 2026-11-13 |
| 14 | P20 | **t-p20-delivery (back to you).** Smoobu blocks 18-19 Nov; policy says delivery is 20-22 Nov; Reyhan re-priced **20-21 Nov -5% min 3** on 11 Nov, so the nights are on sale (Airbnb 20-25 Nov £932.53 room). **Confirm the delivery moved to 18-19 Nov (then update policy), or block 20-22 Nov.** **Only if 20-24 Nov stay on sale:** DSO **20-24 Nov -5% -> 0%**. | Smoobu > Calendar > Waterford; PriceLabs 3547481 > DSO 20-24 Nov; `policy.json` | comp-west: 21-25 Nov **£224.50/n = P0 of 9 / -19.6%** (was P11), cheapest of 14 wider; at 0% about £234 = P11, -1.3% vs the 0-review line; +10% not supported. market: 20 / 23 Nov occ +4.5 / +5.6 | £1,219 x 0.0526 x 0.765 x 0.607 = **£30** | Corentin | 2026-11-13 |
| 15 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it and set 15-17 Nov **-10% -> 0%** (about +10% on £245 / £245 / £254, = `recommend`). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov P0 / -10%, 16-18 Nov P0 / -14% (n = 1-2); qp -0.016, supported -2% vs median; `recommend(0.70, 0.50, 0.17, -0.016)` = +10% | If confirmed: £744 x 0.10 x 0.765 x 0.700 = **£40** | Corentin | 2026-11-13 |
| 16 | P11 | **t-channel-gaps.** DSO **3 Jan -5% -> +7%** (£182 -> about £204; fortnight £203). Hold 23 Dec at £293 (market -3.6; darts R2 that day UNVERIFIED). | PriceLabs 3064196 > DSO 3 Jan | market §3/§4: 3 Jan occ +3.5; comp-central 3-6 Jan P12 / -30% (median £282.50, n = 8), supported about £233 room | £22 x 0.414 = **£9** | Corentin | 2026-11-14 |
| 17 | P12 | **a-p12-trim (your call: lowers a price; reverses Reyhan's +5%).** DSO **17-20 Nov +5% -> -15%** (£247-291 -> about £200-236); **30 Nov-3 Dec +5% -> -5%** (£1,113 -> about £1,007); **7-10 Dec 0% -> -10%** (£1,106 -> about £995); **11-13 Dec 0% -> -15%** (£940 -> about £799). **Min stay: 12 Dec 3 -> 2, 13 Dec 3 -> 1** so the last nights before the 14 Dec handback can sell. Override of `recommend` 30d "hold" with stay-level evidence. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 1: 17-19 / 18-20 Nov band P64 / P70 (+29% / +15%), supported £164-219; 30 Nov-3 Dec -5% to -10%; 7-10 Dec +12% (P58); 11-14 Dec P77 / +15%, NL >P90, supported £231-272; qp -0.15. market: 13-20 Nov occ -3.9 to -16.8 vs STLY. Pace30 -35.1% | Not quantified (a cut) | Corentin | 2026-11-14 |
| 18 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -13%**, keep min 1 (£298 -> about £240; uncustomized £276). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £353 all-in, **P100 / +24.7%** (n = 4), NL >P90; supported room £203-239 | Not quantified (a cut) | Corentin | 2026-11-14 |
| 19 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §3: -£188.20 on 11-16 Jan | **£188.20** per 5-night stay | Corentin | 2026-11-14 |
| 20 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §3: -£95.76 / -£103.95 on 10-15 Dec | **£95.76** per 5-night stay | Corentin | 2026-11-14 |
| 21 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §3: -£89.52 on 10-13 Jan; -£44.76 on 9-12 Jan | **£89.52** per such stay | Corentin | 2026-11-14 |
| 22 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb listing 1657859794156786222 > Pricing > Discounts | channel §3: -£386.21 = 18.0% of £2,145.60 on 6-19 Dec; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£64.37** per 6-19 Dec stay | Corentin | 2026-11-14 |
| 23 | P13 | **t-p13-twins (11 Jan-28 Feb).** Restore a gap: DSO **3090701 about +4%** on 11 Jan-28 Feb (child only; set it after any parent edit). | PriceLabs 3090701 > DSO | channel §3: 21 of 29 open January nights and all 28 open February nights identical; comp-west: met to 9 Jan | Not quantified (duplicate-listing risk) | Corentin | 2026-11-14 |
| 24 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the **7** post-cut Booking.com cancellations: P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec, and **P11 8-15 Dec (new)**. | Booking.com extranet > Reservations | channel §1: 7 of 20 (35%); confirmed 13 / 52 n / £8,502.99 | Not quantified | Corentin | 2026-11-14 |
| 25 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | PriceLabs and Smoobu both show it booked; Smoobu type "modification of booking" | Not quantified (£2,962.17 at stake) | Corentin | 2026-11-14 |
| 26 | P11 P12 P13 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning. 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32); the P11 8-15 Dec £26.82 drops out with the cancellation. Accept or challenge? | Booking.com extranet > Finance | channel §1 | £22.50-£30.00 per booking | Corentin | 2026-11-14 |

**Closed today (lapsed):** t-p09-1112block (P09 12 Nov, £117), t-p06-open (P06 11 Nov, £200 list / £108 expected), t-p11-1013block (P11 11-13 Nov, 12-13 Nov £463 list plus 11 Nov, price NOT CHECKED), t-p13-special-offer (dates passed, £0).

## Top 5 for today
1. **Tonight:** P13 12 Nov min 1 (£124). P04 12-17 Nov min 2 is live on Airbnb against your never-under-3 rule: confirm or revert. Lapsed: P09 12 Nov (£117), P06 11 Nov (£200), P11 11-13 Nov block (12-13 Nov £463 list).
2. **P11 Camden Booking.com 8-15 Dec cancelled** (who/why NOT CHECKED). 8-14 Dec are back on sale at £1,885 (P14, -28% vs comp median £375), but PriceLabs still shows them booked: Sync Now. The stack is unchanged: the next Camden booking would pay about £1,094 of an £1,843 model (a-p11-bcom-stack, t-bcom-markup-110). P11 fwd30 is now 42.9% vs market 49%.
3. **Darts and Reyhan's edits.**
   - Darts: 13-17 Dec average £225 vs your >£300 and comp median £394. Reyhan's -3%: confirm or revert.
   - 11 Nov: P13 Christmas -2% -> -5% (comps/market support 0%); P04 min 2, 18-24 Nov -5% vs your -8%, new 6-22 Dec -5% (remove on 6-12 Dec); P06 -10%; P20 -5% on the delivery dates.
   - Still live from 9-10 Nov: P04 base 200 (revert recommended), P14 min 450, P05 max 3,500 / +300% on 21/29 Dec, P12 +5%.
4. **P20:** synced; the re-sync cut prices 4-15%. 21-25 Nov is £224.50/night, cheapest of 9 comps. Moving back to 0% is supported once you confirm the delivery dates. 5 Dec orphan: min 1 at £313 (£145).
5. **Standing problems.**
   - Barking 1455 day 13; Airbnb hidden layers day 14 (£2,363.11).
   - a-discount-cut £843 / £1,687 (£851 expected).
   - Booking.com since the cut: 13 / 52 n / £8,502.99 (0.774x), 35% cancelled.
   - Base rises +8 n / +£3,888.80 like-for-like: P05 is the whole gain, P11 is -11 / -£2,355.27.
   - P12 pace -35.1%; missed compression 24 n / £590.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 at about 58 d and beyond (channel §3, day 14).
  - Target: **1.00x before visible discounts by 2026-11-16** (row 7).
- **Booking.com since the 24 Oct markup cut** (channel §1):
  - Gross: 20 / 78 n / £13,772.36 at 0.782x. **Confirmed: 13 / 52 n / £8,502.99 at 0.774x.** Net of all cancellations, including pre-cut: +27 n / +£3,451.62.
  - Pace is 0.69 confirmed a day (about 0.33 before the cut), with **35% cancelled (7 of 20)**.
  - Targets: under 20% cancelled and a confirmed ratio of at least 0.80x by 2026-11-20.
  - The levers keep every promotion: the Camden stack scope (row 5), the markup check (row 6), the PriceLabs level under the promotions (row 10) and the cancellation reasons (row 24).
- **Net to owner per £100 PriceLabs** (channel §5):
  - Booking.com P11 stack £47.38.
  - Booking.com since the cut about £62-66.
  - Airbnb at 0.765 £64.64.
  - The model (Booking.com £97.75, Airbnb £84.50) is not what we realise.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.62 |
  | P08 | 4.50 | 4.87 |
  | P04 synced | 4.11 (9) | 4.85 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.26 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 0 reviews | 4.8 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12 cannot carry +5%, why P04 December sits at the floor of its range, and why P13 Christmas is held to 0%, not +10%.
  - Fixes:
    - P12: pre-arrival key-collection message (the 6/10 review cited the key; the process itself is settled).
    - P13 3064856: cleanliness and photo accuracy.
    - Review requests after P20's first stays and on P09.
    - Map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P11:** P9-P14 vs comps and now 6 pts under market. `recommend` returns "fix-listing" (30d). Booking.com CTR was 0.81% vs 1.70% (21 Oct, nothing newer). It is a basement with a patio; 4 of 12 comps have a lift and 3 have a terrace.
  - **P06:** P0-P50 on 15-17 Nov, still unsold.
  - **P20:** 0 reviews; parking photo first; cheapest of 9 on 21-25 Nov.
- **Gap fill / length of stay.**
  - Unsellable orphans today: P13 12 Nov (row 1), P09 12 Nov (lapsed), P20 5 Dec (row 13).
  - Soft blocks: P05 21 / 29 Dec (row 11).
  - Min-3 pins: P12 12 / 13 Dec (row 17).
  - Short runs a gap-fill rule would sell: P11 18-19 Nov and 23-25 Dec; P12 12-13 and 17-20 Nov; P05 16-17 Nov, 7-8 and 13-14 Dec (pricelabs H4).
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps). PriceLabs > Customizations > Orphan day is not exposed by `get_customizations`: NOT CHECKED.
  - Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): NOT CHECKED, now 5 days overdue. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Website: P01 13.3%, P10 3.1%. Direct: P02 3.2%, P09 1.5% (`booking_profile`). Target 5% by 2027-06-30.
- **Event compression** (market §4): **24 n / £590** (yesterday 21 / £456); bookable excluding P20 5 Dec **22 / £541**.
  - By flat: P11 7 n / £344 (darts 13-17 Dec £302), P20 8 n / £188, P04 9 n / £58.
  - Where the market supports a raise:
    - P13 10-26 Dec (+£466 to P50; row 9).
    - P05 7-8 / 13-14 Dec (+£237 / +£145; row 11).
    - P11 3 Jan (row 16).
    - P20 20 and 23 Nov (row 14).
  - P04 14-19 Dec (market +£178 to P75): comp-east holds 11-20 Dec at the quality cap, so I propose only the 6-12 Dec step (row 8).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **62.3%** (63.3% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£170.10** (£169.32) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£105.98** (£107.24) | £129 | 2026-12-18 |
| Revenue, last 30 | **£41,333.93** (243 n) | - | - |
| Booked next 30 (Smoobu) | **58.5%** (151/258) | each unit at least market + 10 pts (below: P11 42.9% vs 49%, P12 46.7% vs 42%) | 2026-11-19 |
| Booked next 60 | **48.0%** (211/440) | at least market + 10 pts (P11 41.4% vs 39%) | 2026-11-19 |
| 7-day pickup, net | gross 10 bk / 52 n / £10,869.00; cancelled 5 / 25 n / £4,514.61; **net +27 n / +£6,354.39** | at least 10 bookings a week, net positive | 2026-11-19 |
| P12 pace30 vs STLY | **-35.1%** (-12 n / -£1,556.45); to handback -40.4% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+8 n / +£3,888.80 like-for-like**; +12 n / +£4,745.59 incl. P06; P05 +12 / +£4,915.21; P11 -11 / -£2,355.27 | positive without P05 | 2026-11-26 |
| Booking.com paid / PriceLabs (since cut) | **0.774x** (13 confirmed / 52 n / £8,502.99); 35% cancelled | at least 0.80x; cancellations under 20% | 2026-11-20 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 14; realised cost **£2,363.11** | 1.00x before visible discounts | 2026-11-16 |
| PriceLabs-side gap | **£1,687 next 30 (£1,813 incl. P11 8-12 Dec); £843 next 14** | £0 apart from your own overrides | 2026-11-16 |
| PriceLabs vs Smoobu | **0 price mismatches**; 1 status (P11 8-14 Dec Booked in PriceLabs) | 0 | 2026-11-12 |
| Unsellable orphan nights (next 60) | **3** (P09 12 Nov, P13 12 Nov, P20 5 Dec), plus P05 21 / 29 Dec at +300% | 0 | 2026-11-13 |
| Double-sellable Barking stays | **every open P04 run**, day 13 | 0 | 2026-11-12 |
| Missed compression | **24 n / £590**; bookable 22 / £541 | under 10 nights | 2026-11-16 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-16; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who cancelled P11 8-15 Dec, why, and whether any fee or commission was charged:** NOT CHECKED. Source: Booking.com extranet > Reservations.
2. **Booking.com live view** (8-15 Dec resale price, promotions, rank): NOT CHECKED (AWS WAF 07:24:48Z, not bypassed). Source: extranet screenshots.
3. **P11 fifth 10% layer, the scope and creator of the 15% Last Minute deal, and the Smoobu Booking.com markup (x 1.10 vs x 1.15):** NOT CHECKED. Source: extranet > Promotions / Rates; Smoobu > Channel Manager > Booking.com.
4. **What P11 8-14 Dec re-prices to once PriceLabs registers the cancellation, and why the 15:38Z refresh shows no push:** NOT CHECKED. Source: PriceLabs > 3064196 > sync log, after Sync Now.
5. **Who placed the P09 11 Nov and P11 10-13 Nov blocks, and who extended P01's block to 21 Dec:** UNKNOWN. Source: Smoobu booking history, or ask Reyhan.
6. **P20 delivery dates** (policy 20-22 Nov vs Smoobu 18-19 Nov): you / operations. **Why the P20 re-sync cut 4-15% on untouched nights:** NOT CHECKED (PriceLabs factor breakdown).
7. **P13 Special offer** (removed or date-bound; who set it) and **P13 10-13 Dec selling at 0.86x on Airbnb vs 0.90x:** NOT CHECKED.
8. **Smoobu Airbnb rule settings:** still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Flexible-cancellation test result** (due 7 Nov): NOT CHECKED.
11. **Other:**
    - Smoobu timestamp zone (UTC+1 inferred).
    - P15-P19 need the second-account keys.
    - Vrbo +8% / Direct -10% are unconfirmed.
    - Events are search summaries, with open date conflicts (Kahan / Muse unverified, darts 23 Dec, Don Toliver 23 vs 24-25 Nov).
    - 4 of 7 market calls were batched against the one-at-a-time rule (none failed).

```json
{"scoreboard":{"note":"12 Nov 2026. Last 30 nights = 13 Oct-11 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:19Z, handback-aware); policy blocks, P01 30 Nov-20 Dec, P06 from 22 Nov, P20 18-19 Nov and P11 12-13 Nov excluded. Pickup = bookings made 6-12 Nov net of cancellations. P11 forward uses Smoobu (42.9%); kpi_pack 55.2% still counts the cancelled 8-11 Dec. Base-rise like-for-like excludes P06 18-22 Nov. Airbnb ratios from 23 live searches 07:21-07:23Z (channel §3). PriceLabs gap from pricelabs H2. Booking.com since cut from channel §1 (duplicate P04 rows counted once). Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"62.3%"},{"label":"ADR last 30","value":"£170.10"},{"label":"RevPAR last 30","value":"£105.98"},{"label":"Revenue last 30","value":"£41,333.93"},{"label":"Nights last 30","value":"243"},{"label":"Booked next 30","value":"58.5% (151/258)"},{"label":"Booked next 60","value":"48.0% (211/440)"},{"label":"7-day pickup","value":"gross 10 bk / 52 n / £10,869.00; cancelled 5 / 25 n / £4,514.61; net +27 n / +£6,354.39"},{"label":"P11 booked next 30","value":"42.9% (12/28) vs market 49% (was 55.6%; 8-15 Dec Booking.com cancelled)"},{"label":"P12 pace30 vs STLY","value":"-35.1% (-12 n / -£1,556.45); to handback -40.4%"},{"label":"Raised flats net since 18 Oct","value":"+8 n / +£3,888.80 like-for-like; +12 n / +£4,745.59 incl. P06; P05 +12 / +£4,915.21 (whole gain); P01 0; P11 -11 / -£2,355.27"},{"label":"Booking.com since markup cut","value":"13 confirmed, 52 n, £8,502.99; 0.774x PriceLabs; gross 20 / 78 n / £13,772.36; 7 of 20 cancelled (35%)"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x at about 58 d+; day 14; realised cost £2,363.11"},{"label":"PriceLabs-side gap","value":"£1,687 next 30 (£1,813 incl. P11 8-12 Dec); £843 next 14"},{"label":"PriceLabs vs Smoobu","value":"0 price mismatches; P11 8-14 Dec still Booked in PriceLabs (availability not synced)"},{"label":"Unsellable orphans","value":"3 nights: P09 12 Nov, P13 12 Nov, P20 5 Dec; plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 13"},{"label":"Missed compression","value":"24 n / £590; bookable 22 n / £541"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p13-1112-orphan","status":"open","prop":"P13","priority":"critical","title":"New, tonight: P13 12 Nov is a 1-night orphan (11 Nov passed unsold, 13-17 Nov arrives tomorrow) at min 2, £164/£155; DSO 12 Nov min 1 on 3064856 (copies to 3090701), keep price; lapses tonight if not set","gbp":124},
{"id":"t-p04-min2-nov","status":"open","prop":"P04","priority":"high","title":"New conflict for Corentin to confirm or revert: Reyhan's 11 Nov DSO puts P04 11-17 Nov at min 2 (price 0%); Smoobu and synced Airbnb sell 12-14 Nov as 2 nights (£146/£147; £378.05 card) vs policy never under 3 nights; revert = DSO 11-17 Nov min 3","gbp":null},
{"id":"t-pl-push-fresh","status":"open","prop":"P11 P20","priority":"high","title":"P20 met (cancellation in PriceLabs, pushed 11 Nov 17:16Z); P11 price gap closed (Smoobu = PriceLabs on all 60 dates, £0) but availability not: 8-14 Dec still Booked 13 h after the cancellation, 15:38Z refresh with no push timestamp (last push 11 Nov 07:46:49Z); Sync Now on 3064196, confirm 8-14 Dec open and re-priced","gbp":null},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 13): unsynced Barking Airbnb 1455876748739910219 bookable on every open P04 run (18-21 Nov £525.80, 18-25 Nov £1,203, 6-13 Dec £1,291, 6-19 Dec £2,275.22); block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"critical","title":"8-15 Dec Booking.com stay (0.5267x Standard) cancelled 11 Nov (who/why NOT CHECKED); 8-14 Dec back on sale at £1,885 (P14, -28% vs comp median £375); stack unchanged: a rebooking would pay about £1,094 vs £1,843 model. Keeping all discounts: confirm or revert Last Minute 15% portfolio deal vs policy 10% (+£59.57); identify fifth 10% and decide Genius dynamic (+£112.54); option Last Minute/Mobile off Weekly/Monthly (+£311-389)","gbp":311},
{"id":"t-bcom-markup-110","status":"open","prop":"P04 P11 P12 P13 P20","priority":"high","title":"Unchanged, NOT CHECKED today (WAF): Camden Booking.com Standard = ceil(Smoobu x 1.10) on 13 nights vs policy +15%; check Smoobu > Channel Manager > Booking.com price settings, set +15% and full resync if needed (+£50.04 on a re-sold 8-15 Dec under the same stack)","gbp":50.04},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 14, unchanged: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d); realised cost £2,363.11 on confirmed stays; +£103.62 on P20 20-25 Nov if it sells; P09 excluded (deprioritised)","gbp":2363.11},
{"id":"a-p13-record","status":"open","prop":"P04 P14 P05 P11 P12 P13 P20 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9-11 Nov changes: P04 base 200 (revert recommended, £114), P14 min 450 (special setup), P05 max 3500 + 21/29 Dec +300%, P11 darts 13-18 Dec -3% vs +5% (13-17 Dec avg £225 vs >£300, median £394; revert £38), NEW 11 Nov: P04 11-17 Nov min 2 / 18-24 Nov -5% (vs -8%; keep, comps -30% to -39%) / 6-22 Dec -5% (remove on 6-12 Dec, £32), P13 10-26 Dec -5% (a-peak-check), P06 -10% (numbers only), P20 20-21 Nov -5% re-saved (delivery dates); P05 29 Nov-2 Dec -5% (£60); P12 +5%; P20 min 2 and base 330 vs 350","gbp":244},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Moved the other way: Reyhan 11 Nov 10-26 Dec -2% -> -5% (confirm or revert); both twins 10-12 Dec and 18-26 Dec -5% -> 0%, hold 13-17 Dec at -5%; comp-west 0% supported, +10% not (3064856 qp -0.15); market +4.9 to +27.3 pts all 17 nights, under P50 on 15 of 17","gbp":71},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,687 next 30 (£1,813 incl. P11 8-12 Dec) / £843 next 14 (P04 £644 -20.9%, P11 £539, P05 £369, P20 £241); set Occupancy, Booking Recency and Last-minute to Custom 0% on P04, P05, P11, P20; expected £851 / 30 days","gbp":851},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,198 / 29 Dec £2,777 at Reyhan's +300% min 1 act as soft blocks: confirm intent (block in Smoobu) or, your call, 21 Dec fixed £900 (comps £796-1,087, market P75-P90 £700-903) and 29 Dec 0% (uncustomized £1,120); 7-8 Dec +3% -> +29% (£923, P25 / -44%) and 13-14 Dec +5% -> +31% (£1,023, P25 / -34%) per recommend +25%","gbp":840},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block extended to 21 Dec 36 s after the 18-21 Dec cancellation, so 18-20 Dec (£284/£276/£246, min 3) are closed before the 20 Dec handback; confirm intent; if not, end the block 18 Dec (£318/n = P25 / -10% vs median £353.50, parity supported)","gbp":725},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (3rd day): P20 5 Dec 1-night orphan, min 3, unbookable at £313; DSO 5 Dec min 1, keep price (above market P75 £300, under the only 1-night comp £567); value restated with the 0.765 factor (23 d out)","gbp":145},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Back to Corentin: Smoobu blocks 18-19 Nov, policy delivery 20-22 Nov, and Reyhan re-priced 20-21 Nov -5% min 3 on 11 Nov so they are on sale (Airbnb 20-25 Nov £932.53 room); confirm delivery moved (update policy) or block 20-22 Nov; if on sale, 20-24 Nov -5% -> 0% (21-25 Nov £224.50/n now P0 of 9, about £234 at 0%)","gbp":30},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; Reyhan 11 Nov -8% -> -10%; 15-17 Nov £245/£245/£254, P0-P50 / -8% to -16% vs comps; recommend +10%; if confirmed record in policy and -10% -> 0%, else re-block","gbp":40},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Closer, not fixed: P11 3 Jan £182 (was £174) -> about £204 (DSO -5% -> +7%; fortnight £203; comps P12 / -30%; market +3.5); 23 Dec £293 hold (market -3.6); Booking.com CTR 0.81% vs 1.70% (21 Oct only)","gbp":9},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Not done: 17-20 Nov £247-291 (2-night band P64-P70, +15% to +29%) -> DSO +5% -> -15%; 30 Nov-3 Dec £1,113 -> -5%; 7-10 Dec £1,106 (+12%) -> -10%; 11-13 Dec £940 (P77, NL >P90) -> -15%; 12 Dec min 3->2, 13 Dec min 3->1; market 4-17 pts below STLY; pace30 -35.1%; lowers a price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed, price up: Mile End 26 Nov £298 (£353 all-in, P100 +24.7%, n=4, NL >P90; uncustomized £276); DSO +15% -> -13% (about £240, top of supported £203-239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£188.20 on 11-16 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":188.2},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (-£95.76 / -£103.95 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":95.76},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (-£89.52 on 10-13 Jan): not in policy - yours, or 0%?","gbp":89.52},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (£64.37 over policy on 6-19 Dec)","gbp":64.37},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Met to 10 Jan (5-8 Jan +4.4%; December about 5% apart) but identical on 21 of 29 open January nights (11-31 Jan) and all 28 open February nights; DSO 3090701 about +4% on 11 Jan-28 Feb, set on the child after any parent edit","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"medium","title":"Grew: 7 of 20 post-cut Booking.com bookings cancelled (35%; new: P11 8-15 Dec, made 10 Nov, cancelled 11 Nov, who/why NOT CHECKED; others P12 11-13 Dec, P13 11-15 Dec, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec, P13 20-25 Dec); confirmed 13 / 52 n / £8,502.99; send rate plans and reasons","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"P11 8-15 Dec £26.82 drops out with the cancellation; 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"After the re-sync 21-25 Nov is £224.50/n all-in, P0 of 9 comps (cheapest of 14 wider); remaining: parking first photo, review requests (0 reviews); Flexible-test 14-day comparison overdue (due 7 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -35.1% (-12 n / -£1,556.45), to handback -40.4%; Reyhan's 10 Nov +5% runs the other way; correct open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov PriceLabs 3090701 £245 / 3064856 £322 (+50% min 1; market +18.3 Finals Weekend); 17 Nov £216/£228 at +35% (P71 wider): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20 P06 P11","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P06 conversion gap (P0-P50 on 15-17 Nov, unsold); P11 basement vs 4 of 12 comps with lift, recommend 'fix-listing'","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (8 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 max 780 vs 3500); policy booking_markup_scope text says +20% vs booking_markup 0.15; Vrbo +8% / Direct -10% unconfirmed; record 9-11 Nov edits in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No replacements 12 Nov; 11 central comps not returned on any stay (P06 3, P08 5, P14 2, P17 1; inactive NOT CHECKED); P15 1557062894259099964 kept (bookable 3-5 Jan); P04 1387112821878102742 kept; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-p09-1112block","status":"done","prop":"P09","priority":"critical","title":"Lapsed: P09 12 Nov passes unsold tonight (£117, min 2, between the 11 Nov block and the 13 Nov arrival; no min-1 DSO set, not offered on Airbnb 07:23Z); loss £117 list; no sellable P09 night left before the 26 Nov handback","gbp":117},
{"id":"t-p06-open","status":"done","prop":"P06","priority":"high","title":"Lapsed: P06 11 Nov passed unsold at £200, min 2; loss £200 list (£108 expected); next open nights 15-17 Nov (t-p06-1521open)","gbp":200},
{"id":"t-p11-1013block","status":"done","prop":"P11","priority":"high","title":"Lapsed: Smoobu 'Blocked channel' still covers 10-13 Nov (reason unknown); 11 Nov lost, 12-13 Nov (£207/£256 = £463 list) cannot sell after tonight (13 Nov alone under min 2); if deleted this morning 12-13 Nov could still sell tonight","gbp":463},
{"id":"t-p13-special-offer","status":"done","prop":"P13","priority":"medium","title":"Lapsed: the -£101.92 Airbnb Special offer sat on 3090701 11-13 Nov; not seen on any of 5 P13 searches 12 Nov; removed or date-bound and who set it NOT CHECKED; no booking, £0 lost","gbp":0}
],
"finds":[
{"agent":"occupancy","severity":"critical","ref":"P11","title":"P11 Booking.com 8-15 Dec cancelled 11 Nov 18:03 (24.6 h after booking; who/why NOT CHECKED); 8-14 Dec back on sale in Smoobu at £1,885; fwd30 55.6% -> 42.9% vs market 49%; base-rise P11 back to -11 n / -£2,355.27","evidence":"occupancy overnight section; channel §1; comp-central P11."},
{"agent":"pricelabs","severity":"critical","ref":"P11","title":"PriceLabs still holds P11 8-14 Dec as Booked 13 h after the cancellation; Smoobu = PriceLabs on all 60 dates (£0 price gap) but the 15:38Z refresh has no push timestamp (second day); Sync Now","evidence":"pricelabs C1, M1; channel §1 and §6; kpi_pack P11 forward_occ_30 0.552."},
{"agent":"channel","severity":"critical","ref":"P11","title":"Camden stack unchanged as far as visible: a rebooking of 8-15 Dec would pay £1,093.96 vs the £1,842.59 model; Booking.com since cut 13 / 52 n / £8,502.99 (0.774x), 7 of 20 cancelled (35%)","evidence":"channel §1; comp-central 8-15 Dec table (P0 / -53% if the stack recurs)."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"Darts 13-17 Dec average £225 (P11 / -44%) vs policy >£300 and comp median £394 (n = 9); Reyhan's -3% replaces the +5%; even reverted about £244","evidence":"comp-central darts table; occupancy conflicts; market §2 (P75 about £304/night)."},
{"agent":"occupancy","severity":"critical","ref":"P13 P09 P06 P11","title":"Tonight: new P13 12 Nov orphan (min 2); P09 12 Nov passes unsold (£117); P06 11 Nov passed unsold (£200); P11 12-13 Nov still blocked (£463 list)","evidence":"occupancy orphan table; pricelabs C3; comp-east P09; comp-central P06."},
{"agent":"pricelabs","severity":"high","ref":"P04 P13 P06 P20","title":"Reyhan's 11 Nov edits: P04 11-17 Nov min 2 (policy never under 3; Airbnb sells 12-14 Nov), 18-24 Nov -5% vs policy -8%, new 6-22 Dec -5%; P13 10-26 Dec -2% -> -5%; P06 11-17 Nov -10%; P20 13-15 and 20-21 Nov -5% re-saved","evidence":"pricelabs C2 and change table; get_user_logs; channel §2; comp-east."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 re-sync cut prices 4-15% (no edit on 16-17 / 22-24 Nov and December); 21-25 Nov £224.50/n = P0 of 9 (was P11); 0% supported after delivery dates are confirmed; 5 Dec orphan min 1 at £313 supported","evidence":"comp-west P20 tables; pricelabs H1; market §2."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"Reyhan's -5% on 10-26 Dec runs against the evidence: 10-13 Dec and Christmas back to 0% supported (wider sample P5-P19), +10% not; 10 Dec price/user_price gap resolved","evidence":"comp-west P13; market §2 (+4.9 to +27.3 pts, gap to P50 £466)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 November -30% to -39% vs comps (NL P27) after base 200 and -5%; 6-12 Dec -11% to -19% after Reyhan's new -5% (at the quality floor): remove it there","evidence":"comp-east Priority 2; market §2."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"P12 17-20 Nov band P64-P70 (+15% to +29%), 26 Nov £298 P100 (+24.7%), 11-14 Dec P77 / NL >P90 with 0 of 3 booked; pace30 -35.1%","evidence":"comp-east Priority 1; occupancy pace; market §2 (occ -3.9 to -16.8 vs STLY)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still bookable on 18-21 Nov (£525.80) and 6-19 Dec (£2,275.22), day 13","evidence":"channel §2; comp-east 1455 table (all 11 runs)."},
{"agent":"channel","severity":"critical","ref":"P20 P12 P13 P05 P06 P04","title":"Hidden Airbnb layers unchanged on day 14 (0.765 / 0.900); realised cost £2,363.11; £103.62 on P20 20-25 Nov if it sells","evidence":"channel §3 (23 live searches)."},
{"agent":"pricelabs","severity":"medium","ref":"P04 P05 P11 P20","title":"PriceLabs discount gap £1,687 next 30 (£1,813 incl. P11 8-12 Dec) / £843 next 14; P04 up to £644 (-20.9%); customizations unchanged","evidence":"pricelabs H2."},
{"agent":"market","severity":"medium","ref":"P11 P20 P04 P13 P05","title":"Missed compression 24 n / £590 (was 21 / £456): +2 n / +£132 from the reopened P11 darts nights; P11 7 n / £344, P20 8 n / £188, P04 9 n / £58","evidence":"market §4."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises +8 n / +£3,888.80 like-for-like (+12 / +£4,745.59 incl. P06); P05 +12 / +£4,915.21 is the whole like-for-like gain; without P05 -4 n / -£1,026.41","evidence":"occupancy base-rise section; pricelabs M5."}
],
"top5":[
"Tonight: P13 12 Nov is a new orphan, min 1 (£124); P04 12-17 Nov min 2 is live on Airbnb against your never-under-3 rule: confirm or revert. Lapsed: P09 12 Nov (£117), P06 11 Nov (£200), P11 11-13 Nov block (12-13 Nov £463 list).",
"P11 Camden Booking.com 8-15 Dec cancelled (who/why NOT CHECKED); 8-14 Dec back on sale at £1,885 (P14, -28% vs comp median £375) but PriceLabs still shows it booked: Sync Now. The stack is unchanged: the next Camden booking would pay about £1,094 of a £1,843 model (a-p11-bcom-stack, t-bcom-markup-110). P11 fwd30 42.9% vs market 49%.",
"Darts 13-17 Dec average £225 vs your >£300 and comp median £394: confirm or revert Reyhan's -3%. Reyhan's 11 Nov edits: P13 Christmas -2% -> -5% (comps/market support 0%), P04 min 2 / 18-24 Nov -5% vs your -8% / new 6-22 Dec -5% (remove on 6-12 Dec), P06 -10%, P20 -5% on the delivery dates; 9-10 Nov settings still live (P04 base 200, P14 min 450, P05 max 3,500 / +300% 21/29 Dec, P12 +5%).",
"P20 synced; the re-sync cut prices 4-15%; 21-25 Nov £224.50/night, cheapest of 9 comps; back to 0% supported once you confirm the delivery dates; 5 Dec orphan min 1 at £313 (£145).",
"Barking 1455 day 13; Airbnb hidden layers day 14 (£2,363.11); a-discount-cut £843 / £1,687; Booking.com since cut 13 / 52 n / £8,502.99 (0.774x), 35% cancelled; base rises +8 n / +£3,888.80 like-for-like (P05 is the whole gain, P11 -11 / -£2,355.27); P12 pace -35.1%; missed compression 24 n / £590."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked (block extended to 21 Dec 36 s after the 10 Nov cancellation; who UNKNOWN); comps 18-21 Dec median £353.50 (n = 8), ours £318.33/n = P25, parity supported (£725); base-rise 0 n / £0; pushed 12 Nov 04:50Z."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 12 Nov 03:28Z via Channex."},
{"ref":"P04","change":"Reyhan 11 Nov: 11-17 Nov min 2 / 0% (12-13 Nov on sale as 2 nights; policy conflict), 18-24 Nov -5% (vs policy -8%), 6-22 Dec -5% (remove on 6-12 Dec); base 200 still live; November -30% to -39% vs comps; 1455 still bookable (day 13); weekly 18% (£64.37); gap n30 £644; fwd30 46.7% vs 24%."},
{"ref":"P05","change":"No edit; 21 Dec £2,198 / 29 Dec £2,777 at +300% min 1 (soft blocks); 7-8 Dec £923 (P25 / -44%), 13-14 Dec £1,023 (P25 / -34%); visible 12% early booking and 10% LOS 5+ still on; base-rise +12 n / +£4,915.21, the whole like-for-like gain; fwd30 73.3% vs 43%."},
{"ref":"P06","change":"11 Nov passed unsold (t-p06-open lapsed, £200); Reyhan -8% -> -10% on 11-17 Nov (numbers only); 15-17 Nov £245-254, P0-P50 / -8% to -16%; base-rise +10 n / +£2,202.56; 70.0% of 10 non-blocked nights."},
{"ref":"P07","change":"Intentional block; pushed 12 Nov 03:57Z."},
{"ref":"P08","change":"Booked to the 13 Nov handback."},
{"ref":"P09","change":"12 Nov passes unsold tonight (t-p09-1112block lapsed, £117); no sellable night left before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"Booking.com 8-15 Dec cancelled 11 Nov (who/why NOT CHECKED); 8-14 Dec back on sale at £1,885 (P14 / -28%), PriceLabs still shows it booked (Sync Now); Smoobu = PriceLabs (£325 gap closed); darts 13-17 Dec avg £225 vs >£300 / median £394; 11-13 Nov block lapsed (12-13 Nov £463 list); base-rise -11 n / -£2,355.27 (was -4 / -£1,342.41); fwd30 42.9% vs 49% (was 55.6%)."},
{"ref":"P12","change":"No edit since 10 Nov; algorithm 17-20 Nov £247-291 (band P64-P70), 26 Nov £298 (P100), 11-13 Dec £940 (P77); pace30 -35.1% (-12 n / -£1,556.45), to handback -40.4%; base-rise +4 n / +£227.79."},
{"ref":"P13","change":"Reyhan 11 Nov 10-26 Dec -2% -> -5% (against a-peak-check; 0% supported); new 12 Nov orphan tonight (min 2); Special offer not seen (lapsed); 10 Dec price/user_price gap gone; twins identical 11 Jan-28 Feb; fwd30 80.0% vs 45%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 66 of 180 open nights at £450; P100 / +29% to +113%; 0% vs 46%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"Cancellation now in PriceLabs (pushed 11 Nov 17:16Z); 20-24 Nov open at £1,219 after a 4-15% algorithm cut; 21-25 Nov £224.50/n = P0 of 9; Reyhan re-saved 13-15 and 20-21 Nov -5% min 3 (20-21 Nov are policy delivery dates); 5 Dec orphan £313 min 3 (£145 at min 1); fwd30 60.7% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 18 non-blocked nights booked to the 20 Dec handback; 18-20 Dec is a block question (occupancy.md; comp-east)."},
{"ref":"P04","base":"200, was 220 (rec 221)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"November -30% to -39% vs comps vs supported -15% (qp -0.15); December P54; 46.7% vs 24%; base +13.6% vs P50 (comp-east; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 43%; open December P25 (-34% to -44%); qp +0.15; recommend +25%; base -4.7% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 7 of 10 non-blocked nights booked (70.0% vs 50%); base -11.9% vs P50."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"93.3% vs 38% to the 26 Nov handback; no sellable night left (occupancy.md; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"42.9% vs 49% after the cancellation, but already P9-P14 vs comps (-23% to -45%); recommend 30d fix-listing 0% / 60d +5%; no cut supported; levers are the Booking.com stack, the darts override and conversion (comp-central; occupancy)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"46.7% vs 42%; pace30 -35.1%; band P58-P100 with qp -0.15; base +38.5% vs P50; handback 13 Dec (comp-east; pricelabs M3; occupancy)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"80.0% vs 45% (+35 pts); 60d 51.7% vs 38% (comp-west; occupancy)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 46%; P100 / +29% to +113% vs comps at £450 (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"60.7% vs 38% (30d), 44.8% vs 30% (60d); 0 reviews; base +31.0% vs P50; re-sync cut 4-15% (occupancy; comp-west; pricelabs M3)."}
]}
```

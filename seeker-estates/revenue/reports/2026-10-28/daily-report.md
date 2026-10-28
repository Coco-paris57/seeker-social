# Seeker Estates - Daily revenue report, 2026-10-28

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-10-28/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-10-28/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `data/snapshots/2026-10-28/`: `reservations.csv` (688 rows), `prices.csv`, `listings.csv` (for min/max), `raw/prices_*.json`, `comps.csv`, `market.csv`, `channel_checks.csv`.
- The 27 Oct snapshot and `reports/2026-10-27/daily-report.md`.
- `data/policy.json`, read first.
- No guest data was used.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P14 is reported as numbers only.
- Settled and not raised: Visibility Booster commission, the 15%/20% stay discounts, and Booking.com promotion stacking (size reported only). P13 is one flat.
- Nights after the handbacks are not inventory: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
- Not re-raised: P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key safe, P20 max 4 guests, and a-p08-arsenal (dismissed yesterday).
- Where Reyhan's 27 Oct edits overwrite a decision of yours, I list them as **conflicts for you to confirm**, not as new proposals.

**Note on the KPI pack**
- `kpi_summary.md` still lists comps, channel_checks and market as empty. The sections filled them after the pack was built: `comps.csv` 430 rows by comp-central's load, `market.csv` 9 rows.
- RGI is still UNKNOWN: there is no comp occupancy.

## Corrections I made to the specialists' figures (checked against the files)

1. **P13 Booking.com 18-27 Nov is 0.669x PriceLabs, not 0.658x.** `raw/prices_3064856.json` in the 28 Oct snapshot was refreshed 27 Oct 11:59:13Z, before the booking (Smoobu created 27 Oct 20:49). It sums 18-26 Nov to **£1,709**. The 27 Oct snapshot (refreshed 26 Oct 18:38Z) gave £1,739. So £1,143.76 / £1,709 = **0.669**.
   - market.md, comp-west.md and pricelabs.md item 11 used £1,739. Their "unexplained 2.2% / £26 residual" therefore mostly disappears.
   - The policy stack (Weekly -15% × Last Minute 15% × Mobile 10% × Genius L1 10%, on list = PL × 1.15) predicts 0.673 of PriceLabs. The residual is -0.6% (channel.md §2).
2. **Commission basis.** market.md and comp-west.md give the P13 commission as 22.6%, which is £258.75 on room only. Booking.com charges on the Smoobu total including cleaning (£1,293.76), so it is **20.0%** (channel.md). Booster is on for P13 check-ins 21 Oct-20 Dec, so this is expected per policy.
   - On the same basis, P11 28-31 Oct is **25.0%** (£178.59 / £714.38). P11 5-8 Dec is 18.0%.
3. **P20 Airbnb 2-6 Nov: room £733.62 (cleaning already excluded) = 0.738x** the £994 PriceLabs/Smoobu price for 2-5 Nov (`prices.csv` 27 Oct: 251/250/251/242).
   - pricelabs.md item 2 calls about £94 "unexplained". channel.md shows that the hidden Airbnb 10% layer explains £84-94 of it, with a £12-27 residual inside Reyhan's -2% override.
   - So the gap is the a-airbnb-rules issue, not a new leak.
4. **P11 reopened nights: 11, not 12.** The cancelled stay was 28 Nov-12 Dec, which is the nights of 28 Nov-11 Dec (14 nights), and 5-7 Dec is resold. That leaves 28 Nov-4 Dec (7) and 8-11 Dec (4).
   - market.md §2a counts 12 Dec as a 12th night, but 12 Dec was already open on 27 Oct (`prices.csv` 27 Oct: 12 Dec available, £360). I use 11, as occupancy.md and comp-central do.
5. **P12 22-28 Nov: both figures are right but use different benchmarks.**
   - Today's sum is **£1,996** (`prices.csv` 277/278/258/276/287/299/321, verified).
   - That is **+24.8% vs the plan's fixed-price target of £1,599** (pricelabs.md), and **+31.0% vs the PriceLabs 2-3 BR market P50 of £1,524** (market.md §2b).
   - I track the item against the plan target (+24.8%) and quote +31% as the market context.
6. **P11 and P13 forward occupancy.**
   - market.md and comp-west use `pl_kpis.csv`: P11 40%/27%, P13 40%/33%. PriceLabs has not yet seen three new bookings (pricelabs.md item 3).
   - I use kpi_pack, which overlays the Smoobu bookings: **P11 44.8% / 35.6%; P13 65.5% / 45.8%**.
   - With P13 at 65.5% vs 41%, `recommend` for 10-12 Nov becomes **raise +10%** on both twins, not comp-west's "+5% / hold".
7. **Free parking is not unique to P20** (comp-east correction). Watch comp 1685056866796470494 (4.8, 10 reviews, free parking, about 0.8 km away) undercuts us on every stay, and so does 1418178473526356202.
8. **Pickup excludes imported past stays** (occupancy.md). That gives 15 bookings / 63 n / £10,618.57, not the pack's figure for P04.

## Executive summary

1. **Reyhan's 27 Oct edits conflict with three of your decisions. Please confirm** (`get_user_logs`: 24 entries, all reyhan@, 27 Oct 11:56-14:42Z):
   - **(a) P11 darts.** Your "leave the +5% darts override" (policy, 24 Oct) is now **-2%** on 12-16 Dec (min 3) and 17-18 Dec (min 2). 13-17 Dec went from **£1,250 to £1,054 (-15.7%)**. About 7 points of that comes from the override; the rest comes from the Aggressive occupancy table after the cancellation (inferred).
   - **(b) P20.** Your 24 Oct -5% on 31 Oct-19 Nov is replaced by -10% on 6-8 Nov and 13-30 Nov and -5% on 1-20 Dec. Next-30 final vs uncustomized went from **-7.7% to -16.9% (£1,116)**. comp-east says hold and do not cut further: we are already P0-P33.
   - **(c) Min stay.** P04 min 2 on 18-20 and 23-25 Nov was re-saved, against your never-under-3 rule. P20 min 2 on 31 Oct-1 Nov and 9-12 Nov, against policy's 3 to 30 Nov.
2. **The hidden Airbnb discount got worse overnight.** Every live card on P20, P12 and both P13 listings now resolves to **0.765x the Smoobu rate at 9-25 days** (0.85 × 0.90) and **0.900x at 29-41 days** (channel.md §1).
   - Yesterday the 15-28-day window showed 0.900. Example: P20 16-19 Nov went from 0.900 to 0.765.
   - The pattern matches the old Smoobu default "Last-minute -15% within 28 days".
   - It cost about **£220-230 on three bookings made 25-27 Oct** (P20, P06, P08). Separately, **Barking Airbnb is still bookable for 1 night** (4-5 Nov, 18-19 Nov, 07:27Z today).
3. **The P11 cancellation: 28 Nov-12 Dec, 14 n, -£2,950.82, cancelled 27 Oct 11:29.** Of the 14 nights, 3 were resold the same evening (5-8 Dec, £656.07). P11 also took a same-day booking for 28-31 Oct (£565.38).
   - P11 fwd60 fell from **49.2% to 35.6% vs market 38%**.
   - Since 18 Oct, the raised flats have lost **41 booked nights / £8,676.58** to cancellations of pre-rise Booking.com bookings (P11, P12). The unraised flats have lost none.
4. **PriceLabs has not seen three new Smoobu bookings.** P11 29-30 Oct and 5-7 Dec, and P13 18-26 Nov, still show as open.
   - Smoobu has them closed, so there is no overbooking risk.
   - But Aggressive occupancy and Recency are discounting the remaining nights against understated occupancy.
   - P13's new 9-night stay also created **two 1-night orphans: 17 Nov and 27 Nov (min 2)**.
5. **None of yesterday's price tasks were applied.** a-discount-cut: unchanged, with a gap of **£3,138 over 30 days** (£3,055 yesterday). a-p12-2228nov: **£1,996 vs £1,599** (was £1,942).
   - Booking.com since the markup cut: **8 bookings / 37 n / £5,643.37 in 3.7 days, 0.745x PriceLabs weighted.** That is about 2.1 bookings a day, against 0.33 a day in the 30 days before.

**Last 30 nights:** occupancy **69.7%**, ADR **£173.92**, RevPAR **£121.29** (yesterday 69.2% / £175.52 / £121.52).

**Next 30:** **60.5% booked** (184/304; 55.0% yesterday).

**7-day pickup:** **15 bk / 63 n / £10,618.57**, less 4 cancellations (36 n / £7,384.49), for a net **+27 n / +£3,234.08** (occupancy.md).

## What changed since 27 Oct

### 18 Oct base rises: running effect (review closed 26 Oct; next base review 2 Nov)

Source: occupancy.md. Bookings made 18-27 Oct (10 full days) are compared with bookings made 4-17 Oct (14 days). Imported past stays are excluded.

| Ref (new base) | Made 18-27 Oct: bk / n / £ | Made 4-17 Oct | Cancelled since 18 Oct (pre-rise bookings) | Booked next 30 vs market: 18 Oct -> 28 Oct |
|---|---|---|---|---|
| P01 (253) | 1 / 3 / £720.90 | 1 / 30 / £4,563.90 | - | 100% vs 34% -> 100% vs 34% (sold out to handback) |
| P05 (550) | 1 / 7 / £4,527.95 (18 Oct; timing vs the rise unknown). **None since; none at £550** | 1 / 4 / £1,835.10 | - | 69.0% vs 32% -> 72.4% vs 38% |
| P06 (357) | 1 / 3 / £804.77 | 4 / 18 / £3,400.07 | - | 100% of non-blocked nights booked |
| P09 (176) | 1 / 2 / £253.21 | 3 / 23 / £2,371.55 | - | 58.6% vs 38% -> 79.3% vs 36% |
| P11 (286) | 1 / 3 / £656.07, plus 28 Oct 1 / 3 / £565.38 | 1 / 4 / £650.48 | **2 / 22 n / £4,687.23** | 58.6% vs 47% -> 44.8% vs 43% |
| P12 (284) | 3 / 15 / £2,484.65 (all Booking.com, 24-26 Oct) | 2 / 5 / £849.98 | **3 / 19 n / £3,989.35** | 58.6% vs 41% -> 58.6% vs 39% |
| **Raised total** | **8 / 33 / £9,447.55 (0.80 bk / £944.76 a day)** | 12 / 84 / £13,671.08 (0.86 / £976.51) | **5 / 41 n / £8,676.58** | |
| Unraised (P02, P08, P10, P13, P14, P20) | 8 / 39 / £6,491.51 (0.80 / £649.15) | 11 / 85 / £10,556.09 (0.79 / £754.01) | 0 | |

**Running line**
- **Booking rate.** Raised flats are at 0.93x their earlier booking rate and 0.97x their revenue per day. Unraised flats are at 1.01x and 0.86x.
- **Without P05's 18 Oct booking,** raised flats fall to 0.81x and 0.50x.
- **Cancellations are what separates the groups.** Net booked revenue since 18 Oct: raised **+£770.97**, unraised **+£6,491.51**. These cancellations were made at old prices, so they are not a response to the rise, but they put 41 nights back on sale at the higher bases.
- **P05 has had no booking for 10 days.** It is still 72.4% vs 38% booked.
- **Confounders.** P12's three bookings and P11's two came after the 24 Oct markup cut.
- **Recommendation: hold all bases until 2 Nov.** Review them only on flats where the discount cut has been applied; none has been yet.

### Per property

| Ref | Change since 27 Oct |
|---|---|
| P01 | **No change.** Sold out to the 20 Dec handback (100% vs 34%). Pushed 28 Oct 06:40Z. |
| P02 / P03 / P07 | Intentional blocks. The P02 Vrbo copy last pushed 24 Feb (t-p02-vrbo is open, unchanged). |
| P04 | **Reyhan 27 Oct 12:01Z:**<br>- 1-17 Nov -3% -> -5% (your 24 Oct figure was -8%).<br>- 18-20 / 23-25 Nov +25% -> **+15%, min 2 re-saved** (rule: 3).<br>- 6-22 Dec -3% -> -5%.<br>**Airbnb:** still bookable for 1 night on 4-5 and 18-19 Nov. Airbnb totals did not follow PriceLabs on 3-5 Nov (£360 for 2 nights, unchanged while PriceLabs fell 165/166 -> 159/160).<br>Fwd30 41.4% vs 25%. Next-14 final vs uncustomized -24.0% (-25.4% yesterday).<br>Missed compression: 11 n / £90 (8 / £47 yesterday). |
| P05 | **29-30 Oct changed from open (£367/£372) to Blocked.** Smoobu block 160279886 was modified 27 Oct 09:29. Policy covers only 27-28 Oct, so the reason is UNKNOWN.<br>Reyhan: 6-7 Nov +10% -> 0% (min 2).<br>Customizations unchanged (Aggressive, Recency ON, last-minute -1%).<br>**29 Dec is a 1-night orphan at £1,385, min 1.** That is 2.07x P50 and above its own uncustomized £1,085, from a source NOT CHECKED.<br>No booking for 10 days. Comp P39; `recommend` +25% (thin set; a ceiling for 2 Nov). |
| P06 | 8-14 Nov changed from "Blocked" to blank status. It is still unavailable (user_price -1). Reyhan added a min-2 override on 9-15 Nov.<br>Intentional block per policy: is it meant to open? Question only. |
| P08 | **Push fixed:** last push 28 Oct 06:36Z (t-pl-sync P08 part resolved).<br>**Airbnb 27-31 Oct, 4 n, £525 room** (same day; a £362.69 duplicate was cancelled) = 0.772x PriceLabs.<br>Fwd30 81.2% vs 50% (to the 13 Nov handback).<br>PriceLabs rose about 10% (3-4 Nov 186/188 -> 215/206); 5-7 Nov £213/234/235 are the only open nights. No new action: the Arsenal item was dismissed. |
| P09 | **Airbnb now 3 reviews (5.0).**<br>10-12 Nov £148/152/158 sit at P0 vs the comp median £179.25 (-12.7%, n=4). 79.3% vs 36%. `recommend` raise +10% (new row 7).<br>6 open nights before the 26 Nov handback. |
| P10 | No change. Sold out to the 18 Nov handback. |
| P11 | **Cancelled: 28 Nov-12 Dec, 14 n, £2,950.82** (booked 16 Jul, cancelled 27 Oct 11:29).<br>**New Booking.com bookings:** 5-8 Dec £656.07 (0.811x, 18.0% commission, Booster) and 28-31 Oct £565.38 (0.916x, **25.0% commission, outside the Booster window**).<br>11 nights reopened; the open runs are 18 Nov-4 Dec (17 n) and 8-18 Dec (11 n).<br>**Darts override overwritten by Reyhan** (-2%; conflict, see row 5).<br>The `uncustomized_price` itself fell 7-13% overnight with the base unchanged (cause NOT CHECKED).<br>Fwd30 44.8% vs 43%; **fwd60 35.6% vs 38%**. Comp P5 (room vs all-in, biased low); `recommend` +5% for 30 and 60 days. |
| P12 | No booking and no cancellation. **Pace30 moves to -4 n / -10.5% vs STLY** because the window rolled one day; class changes On track -> Soft. To handback: -10 n / -26.9%.<br>**22-28 Nov rose to £1,996** (target £1,599); fixed overrides still not set.<br>Airbnb 22-25 Nov now shows at 0.765x (it was 0.90x at that lead). |
| P13 | **Booking.com 18-27 Nov, 9 n, £1,143.76 room (£127.08/n), 0.669x PriceLabs**, 20.0% commission (Booster).<br>It creates **orphans on 17 Nov and 27 Nov (min 2)**. Fwd30 37.9% -> 65.5% vs 41%.<br>**Reyhan:** 23-26 Dec -3%, min 3 (25-26 Dec min 4 -> 3). **26 Dec fell 271 -> 240** while PriceLabs' own P13 insight shows a +24.4% surge for 26-31 Dec. 24-26 Dec (232/235/240) is under the market P25 (237/239/236).<br>**PriceLabs still shows 18-26 Nov as open.**<br>Twins: no identical open night now (26 Dec £240 vs £227). |
| P14 | Numbers only: 0% vs 40% market; 43 of 60 open nights at the £500 minimum (72%). |
| P15-P19 | Not connected (second account; t-unmapped). |
| P20 | **First booking since the Flexible test:** Airbnb 2-6 Nov, £733.62 room (0.738x).<br>**Reyhan reworked the overrides twice.** Your -5% has been replaced (conflict, see row 5). Next-30 gap is now -16.9% (-7.7% yesterday).<br>Push fixed (27 Oct 14:42Z).<br>Fwd30 20.7% vs 36%. Comp P0/P14/P33; `recommend` fix-listing.<br>Free parking is not unique (comp-east).<br>Missed compression: 15 n / £208 (12 / £184 yesterday), mostly from the new -10%. |
| Market | Flat to slightly softer: NL medians fell £0-9 (comp-east). **Missed compression: 29 n / £325 actionable** (23 / £239 yesterday), plus P11 darts 13-17 Dec at £316. |

## Actions - 2026-10-28

**Expected effect formula:** price change on open nights × the flat's booked share (kpi_pack `forward_occ_30`, or `forward_occ_60` for December nights), unless stated otherwise.
- These are upper bounds, because elasticity is not measured.
- Every price stays inside PriceLabs min/max (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £220-1,800.
- Rows are ranked by £ where it can be computed; unquantified rows follow in priority order.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 P05 P08 P09 P11 P12 P13 P20 | **a-discount-cut (not applied, unchanged).** Set **Custom 0%** explicitly (not toggle off) on every remaining layer (detail below the table). | PriceLabs > listing > Customizations | pricelabs.md item 4: every customization is unchanged since 27 Oct; no listing is at 0% on all three. Next 30, final vs uncustomized: P04 -20.9%, **P20 -16.9%** (was -7.7%), P11 -12.6%, P05 -12.5%. Gap £3,138 (£3,055 yesterday). | **About £1,279 over 30 days**, as (uncustomized - final) × booked share: P04 £778 × 41.4% = £322; P05 £385 × 72.4% = £279; P11 £537 × 44.8% = £241; P20 £1,116 × 20.7% = £231; P13 £233 × 65.5% = £153 (both twins, upper bound); P12 £82 × 58.6% = £48; P09 + P08 £5. Unweighted £3,138. | Corentin | 2026-11-02 |
| 2 | P12 | **a-p12-2228nov (not applied).** Fixed-price Date Specific Overrides: **22 Nov £224, 23 £219, 24 £220, 25 £221, 26 £233, 27 £246, 28 £236** (total £1,599 vs £1,996 now, -19.9%). They replace Reyhan's price-less min-2 override on those 7 nights only.<br>**Override of `recommend`, with the reason:** 30-day `recommend` says raise (fwd30 58.6% vs 39%). But this week sits **above P75 on 6 of 7 nights** while market occupancy is **6 points behind STLY** (31.6% vs 37.4%); days 31-60 are 24% vs 33% booked (comp-east: `recommend` -7%); and `quality_premium` is -0.15 (4.27 vs 4.88). | PriceLabs 2699998 > Date Specific Overrides (fixed price) | pricelabs.md item 5: £277/278/258/276/287/299/321; uncustomized £2,161. market.md §2b: +31% vs P50 £1,524. comp-east: 24-27 Nov £272.33 all-in vs £237.83 comp median (n=6, P67, +14.5%). All 7 nights open. P12 to handback -10 n / -26.9%. | Ceiling **£1,599** if the week resells. It costs £397 if the nights would have sold at today's list. Probability not measured. | Corentin | 2026-11-02 |
| 3 | P13 | **New, a-p13-orphans-nov.** Date Specific Override **min stay 1 on 17 Nov and 27 Nov** on 3064856 (copied to 3090701). Prices unchanged. | PriceLabs 3064856 > Date Specific Overrides (min stay only) | occupancy.md and pricelabs.md item 9: 1-night orphans created by the 18-27 Nov booking; Smoobu min 2 on both listings. 27 Nov is Finals Weekend eve (market.md §3). Policy sets no P13 min-stay rule, and the 1 Dec min 1 is intentional. | (£180 + £233) × 65.5% = **£271** | Corentin | 2026-10-30 |
| 4 | P20 P12 P13 P06 P08 (all Airbnb) | **a-airbnb-rules (worse today).** Find and remove the hidden layers.<br>(1) Smoobu > Channel Manager > Airbnb > Default pricing rules on **every apartment**: look for "Last-minute -15% within 28 days" (the old default) and a ~10% rule up to ~55-60 days. Only Shepherd's Bush was reset on 21 Oct.<br>(2) Airbnb > each listing > Pricing > Discounts: was the last-minute window widened on 27 Oct?<br>If you want a discount, make it a visible one (your preference). | Smoobu > Channel Manager > Airbnb > Default pricing rules; Airbnb > listing > Pricing > Discounts | channel.md §1: 14 live cards on 28 Oct resolve exactly to 0.765 at 9-25 days and 0.900 at 29-41 days on P20, P12 and both P13 listings. P20 16-19 Nov went 0.900 (27 Oct) -> 0.765. Bookings made after 21 Oct within 28 days paid 0.74-0.85x (P06 0.765, P08 0.772, P20 0.738). | **About £220-230 lost on 3 bookings made 25-27 Oct** (P20 £84-94, P06 £89, P08 £45). About £80-95 more per 3-night stay at 15-28 days. Forward total not quantified (no lead-time split). | Corentin | 2026-10-29 |
| 5 | P04 P11 P13 P20 | **a-p13-record: conflicts for you to confirm (not new proposals).**<br>(a) **P11 darts:** your standing "leave +5%" is now -2% on 12-16 Dec (min 3) and 17-18 Dec (min 2). Keep Reyhan's -2%, or restore your +5%?<br>(b) **P20:** your 24 Oct -5% on 31 Oct-19 Nov is replaced by +10% 31 Oct-1 Nov (min 2), -2% 9-12 Nov (min 2), -10% 6-8 and 13-30 Nov, and -5% 1-20 Dec.<br>(c) **P04 min 2** on 18-20 / 23-25 Nov, re-saved 12:01Z (rule: never under 3).<br>(d) **P20 min 2** on 9-12 Nov (not an orphan) and 31 Oct-1 Nov (an orphan between two bookings; min 2 is the only way it sells). Policy says 3 to 30 Nov.<br>(e) Still open from 26 Oct: P13 -2% on 31 Oct-27 Nov and 7-20 Dec, P09 -5% to 12 Nov, and who switched on P05 Aggressive/Recency and P13 Recency. | PriceLabs > Date Specific Overrides on 3064196 (+ Vrbo copy), 3547481, 3562176; policy.json | pricelabs.md items 1, 2 and 6; market.md §3. P11 13-17 Dec £1,250 -> £1,054 (-£196, -15.7%). P20 next-30 gap -7.7% -> -16.9% (+£559). comp-east: P20 is at P0-P33, so "hold, do not cut further". | P11 13-17 Dec: £196 × fwd60 35.6% = **£70** at stake. P20: the extra override depth is about £559 × 20.7% = **£116**. P04/P20 min stay: rule compliance. | Corentin | 2026-10-29 |
| 6 | P13 P20 P05 P11 | **a-peak-check (update, readings done).**<br>(1) **P13:** min stay **2 on 25-26 Dec** (3064856, copies to 3090701), and remove Reyhan's -3% on 21-26 Dec (set 0%). Demand Factor Conservative and Seasonality Moderately Conservative -> PriceLabs default for 20 Dec-3 Jan.<br>(2) **P20 NYE 28 Dec-1 Jan:** -7% (the `recommend` "lower" rule: above P90 and behind market), i.e. £580-620 -> about £539-577. Hold 20-26 Dec.<br>(3) **P05 29 Dec:** send what sets £1,385 (Date Specific Override or orphan rule) before any change.<br>(4) **P11 23-25 Dec:** hold (£321/315/316, above the booked median). | PriceLabs 3064856/3090701, 3547481, 3166592 > Date Specific Overrides / Customizations > Seasonality, Demand Factor | pricelabs.md item 7: P13 21-26 Dec £232-240 is 9-13% under uncustomized £256-277, and 25-26 Dec min 3 still blocks arrivals before the 27 Dec booking. market.md §2d: P13 24-26 Dec under P25; market occupancy 39% vs STLY 25%; insight +24.4% for 26-31 Dec. P20 £580-620 vs P90 £519-548, 0 reviews, fwd60 10.2% vs 29%. P05 29 Dec P50 £669 / P75 £847. | P13 25-26 Dec: £475 × 45.8% = **£218**. Removing -3% on 21-26 Dec: £44 × 45.8% = **£20**. Settings to default: up to about £156 × 45.8% = £71. P20 and P05: not quantified. | Corentin | 2026-10-30 |
| 7 | P11 | **New, t-p11-commission.** Ask why the 28-31 Oct Booking.com stay carries **25.0% commission** (£178.59) when check-in is outside the Camden Booster window (1 Nov-18 Dec). | Booking.com extranet > Camden > Reservation 28-31 Oct (commission line); Opportunities > Visibility Booster dates | channel.md §2: £178.59 on £714.38. At 15% it would be £107.16. Policy: flag >15% not explained by the Booster, and ask before assuming. | **£71.43** on this booking | Corentin | 2026-10-30 |
| 8 | P09 P13 | **New, a-raise-1012nov.** Date Specific Override **+10% on 10-12 Nov**:<br>- P09 3318172: £148/152/158 -> about £163/167/174. Reyhan's -5% to 12 Nov is in place, so set the net override to +5% on those 3 nights.<br>- P13 3064856 and 3090701 (10-11 Nov): £158/152 and £192/184 -> about +10%. | PriceLabs 3318172, 3064856 > Date Specific Overrides | `recommend`: P09 79.3% vs 36% at P0 (-12.7% vs £179.25, n=4), q=0 -> +10% (comp-east). P13 65.5% vs 41% (kpi_pack), 3064856 at P0 (-13.3%) on 10-12 Nov -> +10% (my recompute; comp-west used the lagging 40%). | P09 £46 × 79.3% = £36; P13 £31 × 65.5% = £20. **£56 total** | Corentin | 2026-11-02 |
| 9 | P04 | **t-p04-airbnb-minstay (not fixed).** Barking Airbnb > Minimum nights = 3, and confirm whether Smoobu controls that listing (the price did not follow PriceLabs either). | Airbnb (Barking account) > listing 1455876748739910219 > Availability; Smoobu > Channel Manager > Airbnb | channel.md §1: 1-night stays bookable on 4-5 Nov (£239.24 card) and 18-19 Nov (£251.48) at 07:27-07:28Z. comp-east: 3-5 Nov total £360 unchanged while PriceLabs fell. Policy: never under 3 nights. | Not quantified (rule compliance) | Corentin | 2026-10-29 |
| 10 | P11 P13 | **t-pl-sync (P08/P20 pushes fixed; new issue).** PriceLabs 3064196 and 3064856 > Sync Now / Refresh. Then confirm 29-30 Oct, 5-7 Dec (P11) and 18-26 Nov (P13) show Booked. After 12:20Z, re-check `last_date_pushed`: P09 goes stale at 09:52Z, most listings at 11:56-12:16Z, P20 at 14:42Z. | PriceLabs > listing > Sync Now; listing_data push log | pricelabs.md items 3 and 8. Raw refresh is 27 Oct 11:58-11:59Z, before the bookings. PriceLabs `occupancy_next_30` shows P11 0.40 and P13 0.40, vs kpi_pack 0.448 and 0.655 (occupancy.md). | Not quantified. Understated occupancy feeds Aggressive + Recency on both listings. | Corentin | 2026-10-28 |
| 11 | P11 P12 P13 | **a-bcom-lm (update).** P13's 18-27 Nov stay fits **Last Minute 15%**, not the 10% you added on 24 Oct. Check Promotions on Shepherd's Bush (and Mile End, Camden) and keep **one** Last Minute deal. Also confirm whether the stay sold on the Weekly or the Monthly plan. | Booking.com extranet > Shepherd's Bush > Promotions; Reservation 18-27 Nov rate plan | channel.md §2: 0.582 of list. Weekly × LM15 × Mobile × Genius L1 = 0.5852 (paid -0.6%). The Monthly fit (0.5814) would mean the 28-night minimum is unenforced again. Net per £100 PriceLabs: **£53.54 on Booking.com vs £64.64 on Airbnb** at the same lead. | Not quantified. LM 15% -> 10% on this stay would have been worth about £67 (£1,143.76 / 0.85 × 0.90 - £1,143.76). | Corentin | 2026-10-30 |
| 12 | P11 P12 | **a-bcom-cancel (update).** Send the cancellation-policy screen for Camden and Mile End (Standard rate). | Booking.com extranet > Property > Policies > Cancellation | occupancy.md: 22-28 Oct, 4 real cancellations, 36 n / **£7,384.49**, all Booking.com. Since 18 Oct, P11+P12 lost 41 n / £8,676.58. P11 28 Nov-12 Dec was cancelled 32 days out; the fee retained is UNKNOWN. | Not quantified | Corentin | 2026-11-02 |
| 13 | P05 | **New, t-p05-calendar.** Confirm whether the 29-30 Oct block (extended 27 Oct 09:29) is intentional, and what sets 29 Dec at £1,385. | Smoobu > Calendar (reservation 160279886); PriceLabs 3166592 > Date Specific Overrides | pricelabs.md item 10: 29-30 Oct were open at £367/£372 and are now Blocked; policy covers only 27-28 Oct. market.md §2d: 29 Dec £1,385 is above uncustomized £1,085. | 29-30 Oct: up to £739 of sellable nights if unintentional | Corentin | 2026-10-29 |
| 14 | P20 | **a-p20-conversion (update).** Hold price; fix conversion. Lead with balcony and river/skyline views as well as parking, since parking is not unique. Ask the 2-6 Nov guest for a review. Confirm Flexible shows the "Free cancellation" pill. | Airbnb > listing 1791529331262420081 > Photos / Title / Policies | comp-east: P0 / P14 / P33 vs comps; 20.7% vs 36% booked (kpi); `recommend` fix-listing. A watch comp has free parking (4.8, 10 reviews, £211-253/n). First booking since the Flexible test. | Not quantified (conversion) | Corentin | 2026-11-03 |
| 15 | P11 | **t-channel-gaps (update).** The 2 Nov safety net (last-minute back if 0 bookings) no longer triggers: there were 2 bookings on 27-28 Oct. But fwd60 is now 35.6% vs 38% after the cancellation. Relisting on Airbnb is still the volume lever. For the 2 Nov review, `recommend` gives +5% on midweek window nights (29 Nov-3 Dec, 8-10 Dec: £1,830 -> +£92). | Airbnb; Smoobu > Channels | occupancy.md; comp-central: P5 (room only, biased low); midweek 30 Nov, 1 Dec, 9 Dec are below NL P25. | +5% midweek: £92 × 35.6% = £33 (2 Nov). Relisting not quantified. | Corentin | 2026-11-02 |

### Row 1 detail: what remains per listing (live `get_customizations`, 28 Oct; pricelabs.md item 4)

| Ref (id) | Last-minute: now -> set | Occupancy: now -> set | Booking Recency: now -> set |
|---|---|---|---|
| P04 (3562176) | -5% gradual -> **0%** | Aggressive -> **custom 0%** | ON default -> **0%** |
| P05 (3166592) | -1% gradual -> **0%** | Aggressive -> **custom 0%** | ON -> **0%** |
| P08 (3318167), P09 (3318172) | -18% gradual -> **0%** | Market Driven -> leave | off (default applies) -> **0%** |
| P11 (3064196) | 0% (done) | Aggressive -> **custom 0%** | ON default -> **0%** |
| P12 (2699998) | 0% (done) | custom milder -> **custom 0%** | ON default -> **0%** |
| P13 (3064856, 3090701) | -5% gradual -> **0%** | Aggressive -> **custom 0%** | ON -> **0%** |
| P20 (3547481) | 0% (done) | Aggressive -> **custom 0%** | ON default -> **0%** |

### Dashboard changes today
- **New:**
  - a-p13-orphans-nov
  - t-p11-commission
  - a-raise-1012nov
  - t-p05-calendar
- **Updated:**
  - a-discount-cut, a-p12-2228nov, a-airbnb-rules (priority high -> critical), a-p13-record, a-peak-check
  - t-p04-airbnb-minstay, t-pl-sync (re-scoped: the P08/P20 pushes are fixed)
  - a-bcom-lm, a-bcom-cancel, a-p20-conversion, t-channel-gaps, a-p13-twin, a-tidy
- **Marked done:** none. No open task is fully fixed in today's data. t-pl-sync's original P08/P20 push problem is fixed, but the task stays open for the new calendar lag.
- **Unchanged and still open:** a-amenities, a-deposit, a-extra-guest, a-p04-monthly, a-p12-genius, a-p12-hold, a-titles, t-comps, t-p02-vrbo, t-p13-commission, t-unmapped.

## Top 5 for today
1. **Confirm or reverse Reyhan's 27 Oct edits that conflict with your decisions:**
   - P11 darts +5% replaced by -2% (13-17 Dec £1,250 -> £1,054).
   - P20 -5% replaced by -10% to 30 Nov and -5% to 20 Dec (gap -16.9%).
   - P04 min 2 on 18-20 / 23-25 Nov; P20 min 2 on 9-12 Nov.
2. **Find the hidden Airbnb layers**, now 0.765x at 9-25 days and 0.900x at 29-41 days, in the Smoobu Airbnb default pricing rules on every apartment. Set **Barking Airbnb minimum nights to 3** (1 night is still bookable).
3. **Finish the discount cut at Custom 0%** on all 8 listings: £3,138 unweighted, about £1,279 weighted over 30 days.
4. **P12 22-28 Nov:** fixed overrides £224/219/220/221/233/246/236 (£1,599 vs £1,996 now; above P75 on 6 of 7 nights).
5. **P11/P13 PriceLabs Sync Now** (three bookings not seen). **P13:** min 1 on the 17 and 27 Nov orphans (£271) and min 2 on 25-26 Dec (£218).

## Growth plays

- **Airbnb net rate.**
  - KPI: Airbnb room ÷ Smoobu rate. Today 0.765 at 9-25 days and 0.900 at 29-41 days; 1.000 at 98 days (27 Oct).
  - Airbnb is 61.1% of revenue on stays arriving in the last 365 days (`reservations.csv`: £240,666.60 of £393,802.25). Every 10 points of hidden discount is the largest single leak.
  - Target: 1.00x before stay discounts and visible promotions by 2026-11-04 (row 4).
- **Booking.com volume vs net.**
  - Since the cut: 8 bk / 37 n / £5,643.37 in 3.7 days (2.1/day vs 0.33/day before), 0.745x PriceLabs weighted.
  - Net of cancellations since the cut: +16 n / +£1,378.15.
  - Booking.com nets £53.54-68.70 per £100 PriceLabs on today's three bookings, vs £97.75 modelled. One Last Minute deal (row 11), Genius Level 1 only on Mile End (a-p12-genius) and a cancellation window (row 12) are the levers.
  - Target: median paid at least 0.80x PriceLabs by 2026-11-15.
- **Review score.**
  - Airbnb: P12 4.27 vs comp 4.88; P13 4.31 / 4.67 vs 4.78; P08 4.33 vs 4.81; P06 4.56 vs 4.64; P04 4.69 vs 4.83; P05 4.76 vs 4.33 (leads); P09 5.0 (3 reviews). Booking.com: P11 8.0, P12 9.1, P13 8.4 (policy).
  - P12's gap caps its premium at -15% (`quality_premium`), which is why 22-28 Nov cannot hold +14.5% over comps.
  - Fixes:
    - P12: arrival message on shop key collection (process fixed per policy).
    - P13 4.31 twin: cleanliness and photo accuracy.
    - P20, P09, P08: review requests (0 / 3 / 3 reviews).
  - Target: P12 and the P13 4.31 twin to 4.5 by 2027-01-31.
- **Listing conversion.**
  - P20 is cheapest-tier (P0-P33) at 20.7% vs 36% booked.
  - Parking is not unique, so the listing must win on balcony, views and reviews (row 14). Amenity fixes are in a-amenities (lift on P13, P04, P09, P12).
  - Flexible test (P20, P05, P06) is on day 4 of 14: test group 2 bookings vs others 3. Too early to read (channel.md §3a).
- **Gap fill / length of stay.**
  - P13 17 and 27 Nov orphans (row 3). P13 25-26 Dec (row 6). P05 29 Dec (row 13).
  - Runs at min stay: P05 16-17 Nov and 7-8 Dec; P12 12-13 Nov; P20 31 Oct-1 Nov; P11 23-25 Dec.
  - Mid-term (91+ nights) pipeline: 0 bookings in `reservations.csv`.
  - P11's reopened 17- and 11-night runs suit a weekly stay. The 15% weekly discount is already on (policy).
- **Direct share.** **1.51%** of revenue on stays arriving 28 Oct 2025-27 Oct 2026 (Website £4,468 + Direct £1,476 of £393,802.25; `reservations.csv`).
  - Direct is not the cheapest guest price: Airbnb at 9-25 days gives £76.50 per £100 vs direct £90 (channel.md §4).
  - Get the data: the direct-site URL and booking engine.
- **Event compression.** **29 nights / £325 actionable** (market.md §4).
  - Largest: P20 30 Nov-2 Dec (£72), caused by Reyhan's -10% / -5%. Row 5(b) decides it.
  - P11 darts round one, 13-17 Dec: £316 below the fortnight (conflict, row 5(a)).
  - P04 Business Show 10-11 Nov: £39.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **69.7%** (kpi_pack; 69.2% yesterday) | hold at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£173.92** (£175.52) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£121.29** (£121.52) | £129 | 2026-12-18 |
| Booked next 30 (handback-aware) | **60.5%** (184/304; 55.0% yesterday) | each unit at least market + 10 points | 2026-11-08 |
| 7-day pickup (net of cancellations) | **15 bk / 63 n / £10,618.57; net +27 n / +£3,234.08** | at least 10 bookings a week, net positive | 2026-11-08 |
| Booking.com since the markup cut | **8 bk / 37 n / £5,643.37 in 3.7 days; 0.745x PriceLabs** | median at least 0.80x | 2026-11-15 |
| Airbnb room ÷ Smoobu rate | **0.765x at 9-25 days; 0.900x at 29-41 days** | 1.00x before stay discounts | 2026-11-04 |
| PriceLabs-side gap, next 30 | **£3,138** unweighted / about £1,279 weighted | £0 apart from your overrides | 2026-11-02 |
| Missed compression | **29 n / £325** (excl. P11 darts £316) | under 10 nights | 2026-11-07 |
| RGI | **UNKNOWN** (comp prices exist; comp occupancy does not) | above 1.10 on every property | data 2026-11-04; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.27-4.76; comp medians 4.33-4.88 | 4.8 / Booking 9.3, then top decile | 2027-01-31 |
| Direct share | **1.51%** (last 365 stays) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Source of the Airbnb layers.** The 0.765 / 0.900 factors are not visible from public pages. Needed: Smoobu > Channel Manager > Airbnb > Default pricing rules on every apartment, and each Airbnb listing's Discounts page. The upper edge (55-97 days) was not tested today.
2. **Booking.com displayed prices, comps and search position.** NOT CHECKED (AWS WAF; not circumvented). Needed: extranet reservation breakdowns (rate plan and promotions) for P13 18-27 Nov, P11 5-8 Dec and P11 28-31 Oct, plus Promotions screens for Shepherd's Bush, Camden and Mile End.
3. **RGI needs comp occupancy.** Source: PriceLabs Competitor Listings / Market Dashboard (not enabled on this account).
4. **Barking Airbnb account.** Whether it is connected to Smoobu, and the real booking date of the 19-20 Dec night (imported 26 Oct).
5. **P11 `uncustomized_price` fell 7-13% overnight with the base unchanged.** Cause NOT CHECKED. Also unknown: the cancellation fee retained on the 28 Nov-12 Dec cancellation.
6. **P05.** The reason for the 29-30 Oct block, and the source of the 29 Dec £1,385. **P06:** whether 8-14 Nov is meant to open.
7. **Customization edits are not in `get_user_logs`.** We still do not know who set P05 Aggressive/Recency and P13 Recency.
8. **PriceLabs window gaps.** Raw ends 27 Dec, so the 180-day floor/ceiling, far-out min-stay rules and the P13 twins on 2-5 Feb are NOT CHECKED. `prices.csv` 3090701 rows have an empty ref and no Smoobu rate.
9. **STLY** is missing for every unit except P12. **P15-P19** need the second-account keys (t-unmapped). **id_map.json** has 11 PriceLabs ids that no longer exist (pricelabs.md item 13).
10. **Vrbo +8% and Direct -10%** are unconfirmed defaults, and there is no direct-site URL.

```json
{"scoreboard":{"note":"28 Oct 2026. Last 30 nights, 13 Smoobu units (kpi_pack). Next 30 handback-aware with Smoobu bookings overlaid (occupancy.md). Pickup excludes imported past stays; net of 4 real cancellations. Booking.com since the 24 Oct markup cut (channel.md §3b). Airbnb ratios from live cards 28 Oct (channel.md §1). RGI unknown: comp prices exist, comp occupancy does not.","items":[{"label":"Occupancy last 30","value":"69.7% (69.2% yesterday)"},{"label":"ADR last 30","value":"£173.92"},{"label":"RevPAR last 30","value":"£121.29"},{"label":"Revenue last 30","value":"£47,305"},{"label":"Booked next 30","value":"60.5% (184/304; 55.0% yesterday)"},{"label":"7-day pickup","value":"15 bk / 63 n / £10,619; net +27 n / +£3,234 after cancellations"},{"label":"Booking.com since markup cut","value":"8 bk / 37 n / £5,643 in 3.7 days; 0.745x PriceLabs"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at 9-25 days; 0.900x at 29-41 days (worse than yesterday)"},{"label":"PriceLabs-side gap next 30","value":"£3,138 (weighted ~£1,279)"},{"label":"Missed compression","value":"29 n / £325 (excl. P11 darts £316)"},{"label":"Direct share","value":"1.51% (last 365)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"a-discount-cut","type":"task","priority":"critical","ref":"P04 P05 P08 P09 P11 P12 P13 P20","status":"open","title":"Discount cut still not applied: set Custom 0% on every remaining layer; P20 gap doubled to -16.9%","why":"get_customizations 28 Oct: no change since 27 Oct; no listing at 0% on all three. Next 30 final vs uncustomized: P04 -20.9% (£778), P20 -16.9% (£1,116, was -7.7%), P11 -12.6% (£537), P05 -12.5% (£385), P13 -5.6/-5.7%, P12 -2.3%. Total £3,138 (£3,055 yesterday). Remaining: P04 LM -5%/Aggressive/Recency; P05 LM -1%/Aggressive/Recency; P08/P09 LM -18% + default Recency; P11 and P20 Aggressive/Recency; P12 custom occupancy/Recency; P13 LM -5%/Aggressive/Recency.","where":"PriceLabs > listing > Customizations, Custom 0% (not toggle off): P04 3562176, P05 3166592, P08 3318167, P09 3318172, P11 3064196, P12 2699998, P13 3064856/3090701, P20 3547481 (per-listing table in report row 1)","impact":"About £1,279 over 30 days (upper bound) = (uncustomized - final) x booked share: P04 £778 x 41.4% = £322; P05 £385 x 72.4% = £279; P11 £537 x 44.8% = £241; P20 £1,116 x 20.7% = £231; P13 £233 x 65.5% = £153; P12 £82 x 58.6% = £48; P08+P09 £5. Unweighted £3,138.","source":"Daily run 28 Oct 2026 (pricelabs.md item 4; kpi_pack forward_occ_30)"},
{"id":"a-p12-2228nov","type":"task","priority":"high","ref":"P12","status":"open","title":"P12 22-28 Nov still not fixed: £1,996 vs £1,599 target (+24.8%; +31% vs market P50); set fixed overrides £224/219/220/221/233/246/236","why":"get_listing_date_overrides 2699998: 22 Nov-13 Dec min-stay only, no price. prices.csv 22-28 Nov £277/278/258/276/287/299/321 = £1,996 (was £1,942); uncustomized £2,161. Market P50 (2-3 BR) £1,524, above P75 on 6 of 7 nights; market occ 31.6% vs STLY 37.4%. comp-east 24-27 Nov £272.33 all-in vs £237.83 (n=6, P67, +14.5%); quality_premium -0.15 (4.27 vs 4.88). Override of recommend (30d raise) because days 31-60 are 24% vs 33% booked (recommend -7%) and demand is behind STLY. P12 to handback -10 n / -26.9%.","where":"PriceLabs 2699998 > Date Specific Overrides > fixed price 22 Nov £224, 23 £219, 24 £220, 25 £221, 26 £233, 27 £246, 28 £236 (inside min £100 / max £2,000), replacing the price-less override on those 7 nights only","impact":"Ceiling £1,599 if resold; cost £397 if they would have sold at today's list. Probability not measured.","source":"Daily run 28 Oct 2026 (pricelabs.md item 5, market.md §2b, comp-east)"},
{"id":"a-airbnb-rules","type":"task","priority":"critical","ref":"P20 P12 P13 P06 P08","status":"open","title":"Hidden Airbnb discount got worse: 0.765x at 9-25 days, 0.900x at 29-41 days; check Smoobu Airbnb default rules on every apartment","why":"channel.md §1, 14 live cards 28 Oct: every card resolves exactly to 0.765 (0.85 x 0.90) at 9-25 days and 0.900 at 29-41 days on P20, P12, P13 x2. P20 16-19 Nov was 0.900 on 27 Oct, 0.765 today. Matches the old Smoobu default 'Last-minute -15% within 28 days'; P20 Airbnb Discounts page allows only 15% at 0-14 days. Airbnb bookings after 21 Oct within 28 days paid 0.74-0.85x (P06 0.765, P08 0.772, P20 0.738). No PriceLabs change explains it.","where":"Smoobu > Channel Manager > Airbnb > Default pricing rules on every apartment (last-minute window 28 days / ~10% to ~55-60 days); Airbnb > each listing > Pricing > Discounts (was the last-minute window widened 27 Oct?). If a discount is wanted, make it visible.","impact":"About £220-230 lost on 3 bookings made 25-27 Oct (P20 £84-94, P06 £89, P08 £45); ~£80-95 per further 3-night stay at 15-28 days. Forward total not quantified.","source":"Daily run 28 Oct 2026 (channel.md §1-§3, comp-west, comp-east)"},
{"id":"a-p13-record","type":"task","priority":"high","ref":"P04 P11 P13 P20","status":"open","title":"Conflicts to confirm: Reyhan's 27 Oct edits overwrite the P11 darts +5% and your P20 -5%, and re-save P04/P20 min 2","why":"get_user_logs 27 Oct (24 entries, reyhan@, 11:56-14:42Z). P11: 12-16 Dec -2% min 3, 17-18 Dec -2% min 2, replacing the +5% you decided to keep (policy darts_override_24oct); 13-17 Dec £1,250 -> £1,054 (-15.7%). P20: your 24 Oct -5% 31 Oct-19 Nov replaced by +10% 31 Oct-1 Nov (min 2), -2% 9-12 Nov (min 2), -10% 6-8 and 13-30 Nov, -5% 1-20 Dec; next-30 gap -7.7% -> -16.9%; comp-east P0-P33, hold. P04: 1-17 Nov -5% (your -8%), 18-20/23-25 Nov +15% min 2 re-saved (rule never under 3), 6-22 Dec -5%. Still open from 26 Oct: P13 -2% 31 Oct-27 Nov/7-20 Dec, P09 -5% to 12 Nov; who set P05 Aggressive/Recency and P13 Recency.","where":"PriceLabs > Date Specific Overrides on 3064196 (+ Vrbo copy), 3547481, 3562176, 3064856, 3318172; policy.json","impact":"P11 13-17 Dec £196 x 35.6% = £70 at stake; P20 extra override depth ~£559 x 20.7% = £116; P04/P20 min stay: compliance","source":"Daily run 28 Oct 2026 (pricelabs.md items 1, 2, 6; market.md §3; comp-east)"},
{"id":"a-peak-check","type":"task","priority":"high","ref":"P13 P20 P05 P11","status":"open","title":"Peak readings done: P13 Christmas under market P25 (set 25-26 Dec min 2, remove -3%, defaults); P20 NYE above P90 (-7%); P05 29 Dec £1,385 source","why":"get_customizations 28 Oct: P13 Seasonality Moderately Conservative ON + Demand Factor Conservative; P05 DF Conservative; P20 and P11 both None. P13 21-26 Dec £232-240, 9-13% under uncustomized £256-277; 26 Dec 271 -> 240 while PriceLabs insight +24.4% for 26-31 Dec; 24-26 Dec under market P25; market occ 39% vs STLY 25%. Reyhan 23-26 Dec -3% min 3: 25-26 Dec min 4 -> 3 still blocks arrivals before the 27 Dec booking. P20 28 Dec-1 Jan £580-620 vs P90 £519-548, 0 reviews, fwd60 10.2% vs 29% -> recommend lower -7%. P05 29 Dec £1,385 min 1 vs P75 £847, above its uncustomized £1,085. P11 23-25 Dec £321/315/316 hold.","where":"PriceLabs 3064856 (copies to 3090701) > Date Specific Overrides: min stay 2 on 25-26 Dec, 21-26 Dec 0% instead of -3%; Customizations > Seasonality/Demand Factor default; PriceLabs 3547481 > DSO -7% on 28 Dec-1 Jan; PriceLabs 3166592 > send DSO on 29 Dec","impact":"P13 25-26 Dec £475 x 45.8% = £218; remove -3% £44 x 45.8% = £20; defaults up to £156 x 45.8% = £71. P20/P05 not quantified.","source":"Daily run 28 Oct 2026 (pricelabs.md item 7, market.md §2d, comp-west)"},
{"id":"a-p13-orphans-nov","type":"task","priority":"high","ref":"P13","status":"open","title":"Shepherd's Bush 17 Nov and 27 Nov are 1-night orphans at min 2: set min stay 1","why":"The Booking.com 18-27 Nov booking (made 27 Oct) left 17 Nov (between 13-17 Nov and 18 Nov) and 27 Nov (between 27 Nov and the 28 Nov-1 Dec Airbnb stay) open; Smoobu min 2 on both listings, so neither can sell. 3064856 £180 / £233. 27 Nov is Finals Weekend eve (Twickenham 27-29 Nov, verified). Policy sets no P13 min-stay rule; 1 Dec min 1 is intentional.","where":"PriceLabs 3064856 > Date Specific Overrides > min stay 1 on 17 Nov and 27 Nov (copied to 3090701), prices unchanged","impact":"(£180 + £233) x 65.5% = £271","source":"Daily run 28 Oct 2026 (occupancy.md Orphan gaps; pricelabs.md item 9; market.md §3)"},
{"id":"t-p11-commission","type":"advice","priority":"medium","ref":"P11","status":"open","title":"Camden 28-31 Oct Booking.com commission 25.0% with check-in outside the Booster window: why?","why":"reservations.csv: commission £178.59 on Smoobu total £714.38 (room £565.38 + cleaning) = 25.0%. Camden Booster (18%) covers check-ins 1 Nov-18 Dec and Jan-Feb 2027 (policy); 28 Oct is outside. At 15% it would be £107.16. Policy: flag >15% not explained by the Booster; ask before assuming.","where":"Booking.com extranet > Camden > Reservations 28-31 Oct (commission line); Opportunities > Visibility Booster dates","impact":"£71.43 on this booking","source":"Daily run 28 Oct 2026 (channel.md §2)"},
{"id":"a-raise-1012nov","type":"task","priority":"medium","ref":"P09 P13","status":"open","title":"Midweek 10-12 Nov at P0 while booked far ahead of market: +10% on P09 and P13","why":"positioning.recommend: P09 79.3% vs 36%, P0 (£156.50 vs £179.25 all-in, n=4, -12.7%), quality 0 -> raise +10% (comp-east). P13 65.5% vs 41% (kpi_pack, not the lagging 40% comp-west used), 3064856 P0 (£194 vs £223.75, n=6, -13.3%) -> raise +10%. PriceLabs P09 £148/152/158; P13 3064856 £158/152, 3090701 £192/184. Reyhan's P09 -5% runs to 12 Nov.","where":"PriceLabs 3318172 > Date Specific Overrides 10-12 Nov net +5% (replacing -5%, ~+10% on price); PriceLabs 3064856 and 3090701 > DSO +10% on 10-11 Nov (inside min/max)","impact":"P09 £46 x 79.3% = £36; P13 £31 x 65.5% = £20; £56 total","source":"Daily run 28 Oct 2026 (comp-east, comp-west, kpi_pack)"},
{"id":"t-p04-airbnb-minstay","type":"task","priority":"critical","ref":"P04","status":"open","title":"Not fixed: Barking Airbnb still bookable for 1 night (4-5 Nov, 18-19 Nov) and not following PriceLabs prices","why":"channel.md §1 live 28 Oct 07:27-07:28Z: 4-5 Nov 1 night bookable (£239.24 card, Smoobu min 3) and 18-19 Nov 1 night (£251.48, Smoobu min 2 from Reyhan's override, policy 3). comp-east: 3-5 Nov Airbnb £360 for 2 nights unchanged while PriceLabs fell 165/166 -> 159/160. Earlier: 19-20 Dec sold as 1 night (£216). Policy: never under 3 nights.","where":"Airbnb (Barking account) > listing 1455876748739910219 > Availability > Minimum nights = 3; Smoobu > Channel Manager > Airbnb (confirm the listing is connected and receives price/min stay)","impact":"Not quantified (rule compliance)","source":"Daily run 28 Oct 2026 (channel.md §1, comp-east)"},
{"id":"t-pl-sync","type":"task","priority":"high","ref":"P11 P13","status":"open","title":"P08/P20 pushes fixed; now PriceLabs has not seen 3 new bookings (P11 29-30 Oct, 5-7 Dec; P13 18-26 Nov): Sync Now","why":"listing_data 28 Oct: P08 pushed 06:36:32Z, P20 27 Oct 14:42:30Z (fixed). raw/prices_3064196 and 3064856 last refreshed 27 Oct 11:58-11:59Z, before the bookings; they show booked nights open. Smoobu has them closed (no overbooking). PriceLabs occupancy_next_30 P11 0.40, P13 0.40 vs kpi_pack 0.448 / 0.655, so Aggressive + Recency discount from understated occupancy. Pushes go stale today: P09 09:52Z, most listings 11:56-12:16Z, P20 14:42Z.","where":"PriceLabs 3064196 and 3064856 > Sync Now / Refresh; confirm Booked on 29-30 Oct, 5-7 Dec, 18-26 Nov; re-check last_date_pushed after 12:20Z","impact":"Not quantified","source":"Daily run 28 Oct 2026 (pricelabs.md items 3 and 8, occupancy.md)"},
{"id":"a-bcom-lm","type":"advice","priority":"medium","ref":"P11 P12 P13","status":"open","title":"P13 18-27 Nov sold with Last Minute 15%, not your 24 Oct 10%: keep one Last Minute deal per property; confirm Weekly vs Monthly plan","why":"P13 Booking.com 18-27 Nov £1,143.76 room = 0.669x PriceLabs at booking (£1,709, refresh 27 Oct 11:59Z) = 0.582 of list. Weekly -15% x LM 15% x Mobile 10% x Genius L1 10% = 0.5852 (paid -0.6%); Monthly fit 0.5814 would mean the 28-night minimum unenforced again. Net per £100 PriceLabs £53.54 vs Airbnb £64.64 at the same lead. Earlier: P12 stack had LM 15%.","where":"Booking.com extranet > Shepherd's Bush, Mile End, Camden > Promotions (keep one Last Minute); Reservation 18-27 Nov > rate plan","impact":"LM 15% -> 10% on this stay ~£67 (1,143.76/0.85 x 0.90 - 1,143.76); forward not quantified","source":"Daily run 28 Oct 2026 (channel.md §2 and §4)"},
{"id":"a-bcom-cancel","type":"advice","priority":"high","ref":"P11 P12","status":"open","title":"Booking.com cancellations: 4 in 7 days (36 n / -£7,384.49), incl. Camden 14 nights; send the cancellation policy","why":"occupancy.md: cancellations 22-28 Oct (Smoobu modifiedAt): P12 1-8 Nov £1,382.86, P12 22-29 Nov £1,314.40, P11 19-27 Nov £1,736.41, P11 28 Nov-12 Dec £2,950.82 (cancelled 27 Oct 11:29, 32 days out, booked 16 Jul). All Booking.com. Since 18 Oct P11+P12 lost 41 n / £8,676.58 of pre-rise bookings. Fee retained UNKNOWN.","where":"Booking.com extranet > Camden / Mile End > Policies > Cancellation (Standard rate)","impact":"Not quantified","source":"Daily run 28 Oct 2026 (occupancy.md)"},
{"id":"t-p05-calendar","type":"task","priority":"medium","ref":"P05","status":"open","title":"St John's Wood: is the 29-30 Oct block intentional, and what sets 29 Dec at £1,385?","why":"prices_3166592 27 -> 28 Oct: 29-30 Oct open £367/£372 -> Blocked; Smoobu block 160279886 modified 27 Oct 09:29; policy block_27_28_oct covers 27-28 Oct only. 29 Dec 1-night orphan at £1,385, min 1, above uncustomized £1,085 (market P50 £669, P75 £847). P05 no booking since 18 Oct.","where":"Smoobu > Calendar > reservation 160279886; PriceLabs 3166592 > Date Specific Overrides 29 Dec","impact":"Up to £739 of sellable nights on 29-30 Oct if unintentional","source":"Daily run 28 Oct 2026 (pricelabs.md item 10, market.md §2d, occupancy.md)"},
{"id":"a-p20-conversion","type":"task","priority":"medium","ref":"P20","status":"open","title":"Waterford: first booking since the Flexible test, still 20.7% vs 36%; free parking not unique: lead with views/balcony, get reviews","why":"comp-east 28 Oct: P0 / P14 / P33 (31 Oct-2 Nov £264 vs £322; 10-12 Nov £283 vs £320.50; 24-27 Nov £250.67 vs £333.33); recommend fix-listing. Watch comp 1685056866796470494 (4.8, 10 reviews, free parking, 0.8 km) at £211-253/n and 1418178473526356202 also have free parking. Airbnb 2-6 Nov booked 27 Oct (£733.62 room). 0 reviews.","where":"Airbnb > listing 1791529331262420081 > Photos / Title / Policies (confirm Free cancellation pill); review request to the 2-6 Nov guest","impact":"Not quantified (conversion)","source":"Daily run 28 Oct 2026 (comp-east, channel.md)"},
{"id":"t-channel-gaps","type":"task","priority":"high","ref":"P11","status":"open","title":"Camden: 2 bookings 27-28 Oct but 14-night cancellation; fwd60 35.6% vs 38%: relist on Airbnb; +5% midweek for 2 Nov","why":"occupancy.md: bookings 5-8 Dec £656.07 and 28-31 Oct £565.38 end the 23-day gap, so the 0-bookings safety net no longer triggers. Cancellation 28 Nov-12 Dec -£2,950.82; 11 nights reopened (28 Nov-4 Dec, 8-11 Dec). Fwd30 44.8% vs 43%; fwd60 49.2% -> 35.6% vs 38%. comp-central P5 (room vs all-in); recommend +5% (30d and 60d); midweek 30 Nov, 1 Dec, 9 Dec below NL P25.","where":"Airbnb (relist Camden); Smoobu > Channels; for 2 Nov: PriceLabs 3064196 midweek 29 Nov-3 Dec and 8-10 Dec +5%","impact":"+5% midweek £92 x 35.6% = £33; relisting not quantified","source":"Daily run 28 Oct 2026 (occupancy.md, comp-central, market.md §2a)"},
{"id":"a-p13-twin","type":"task","priority":"medium","ref":"P13","status":"open","title":"Shepherd's Bush twins: 26 Dec now differs; 2-5 Feb not re-checked","why":"pricelabs.md item 13: no identical open night in the window (26 Dec £240 vs £227); 27 Dec-2 Jan now booked. 2-5 Feb identical on 27 Oct (Airbnb £951 / £870.90) is outside the raw window (ends 27 Dec): NOT CHECKED. Policy twin_listings: narrow, never equal.","where":"Smoobu > Rates 3064856 vs 3090701, 2-5 Feb; if still equal, PriceLabs 3090701 offset +2-3%","impact":"£0 (protects both listings)","source":"Daily run 28 Oct 2026 (pricelabs.md item 13)"},
{"id":"a-tidy","type":"task","priority":"medium","ref":"Portfolio","status":"open","title":"Tidy: 11 id_map ids no longer exist in PriceLabs; Vrbo copies still pushing; Vrbo +8% / Direct -10% unconfirmed","why":"pricelabs.md item 13: get_listings returns 0 for 11 id_map ids (3 unmatched Marylebone Vrbo, pricelabs_other copies of P01, P04 Vrbo, P08, P09, P10, two P13 Vrbo). Vrbo copies of P11, P12, P13 pushed 27 Oct. channel.md: Vrbo +8% and Direct -10% are unconfirmed defaults.","where":"data/id_map.json; PriceLabs > Vrbo listings; rm/config.py","impact":"£0 (data hygiene)","source":"Daily run 28 Oct 2026 (pricelabs.md item 13, channel.md)"}
],
"finds":[
{"agent":"pricelabs","severity":"high","ref":"P11","title":"Darts override you decided to keep was overwritten with -2%","evidence":"get_user_logs 27 Oct 11:56Z: 12-16 Dec -2% min 3, 17-18 Dec -2% min 2; 13-17 Dec £1,250 -> £1,054 (-15.7%); policy darts_override_24oct says leave +5%."},
{"agent":"pricelabs","severity":"high","ref":"P20","title":"Reyhan replaced your -5% with -10%/-5% to 20 Dec; gap doubled","evidence":"Next-30 final vs uncustomized -7.7% -> -16.9% (£1,116); 13-19 Nov 257-268 -> 227-243; comp-east P0-P33, hold."},
{"agent":"channel","severity":"critical","ref":"P20 P12 P13","title":"Hidden Airbnb discount deepened to 0.765x at 9-25 days","evidence":"14 live cards 28 Oct: 0.765 at 9-25 days, 0.900 at 29-41; P20 16-19 Nov 0.900 -> 0.765 overnight; ~£220-230 lost on 3 bookings 25-27 Oct."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Barking Airbnb still sells 1 night","evidence":"4-5 Nov and 18-19 Nov bookable as 1 night at 07:27Z; prices not following PriceLabs (3-5 Nov £360 unchanged)."},
{"agent":"occupancy","severity":"high","ref":"P11","title":"Camden 14-night Booking.com cancellation","evidence":"28 Nov-12 Dec £2,950.82 cancelled 27 Oct 11:29; 3 nights resold (5-8 Dec £656.07); fwd60 49.2% -> 35.6% vs market 38%."},
{"agent":"pricelabs","severity":"high","ref":"P11 P13","title":"PriceLabs has not seen 3 new bookings","evidence":"P11 29-30 Oct, 5-7 Dec and P13 18-26 Nov open in PriceLabs (refresh 27 Oct 11:58Z), closed in Smoobu; PL occ30 0.40 vs actual 0.448 / 0.655."},
{"agent":"occupancy","severity":"high","ref":"P13","title":"Two new 1-night orphans at min 2","evidence":"17 Nov (£180) and 27 Nov (£233, Finals Weekend eve) between the new 18-27 Nov booking and neighbouring stays."},
{"agent":"pricelabs","severity":"high","ref":"P12","title":"22-28 Nov rose again; fixed overrides not set","evidence":"£1,996 vs £1,599 target (+24.8%), +31% vs market P50 £1,524, above P75 on 6 of 7 nights; market occ 6 pts behind STLY."},
{"agent":"channel","severity":"medium","ref":"P13","title":"Booking.com 18-27 Nov at 0.669x PriceLabs nets £53.54 per £100","evidence":"£1,143.76 room vs £1,709 at booking (strategy correction of 0.658x/£1,739); stack Weekly x LM15 x Mobile x Genius L1 = 0.5852 of list, paid -0.6%; commission 20.0% (Booster)."},
{"agent":"channel","severity":"medium","ref":"P11","title":"25.0% commission outside the Booster window","evidence":"28-31 Oct £178.59 on £714.38; Booster covers check-ins 1 Nov-18 Dec; excess vs 15% £71.43."},
{"agent":"market","severity":"high","ref":"P13","title":"Christmas priced under market P25 while demand surges","evidence":"24-26 Dec 232/235/240 vs P25 237/239/236; market occ 39% vs STLY 25%; insight +24.4% 26-31 Dec; Reyhan -3% 23-26 Dec; 26 Dec 271 -> 240."},
{"agent":"pricelabs","severity":"medium","ref":"P05","title":"29-30 Oct newly blocked, reason not in policy","evidence":"Open at £367/£372 on 27 Oct, Blocked on 28 Oct; Smoobu block modified 27 Oct 09:29; policy covers 27-28 Oct only. P05 no booking for 10 days."}
],
"top5":["Confirm or reverse Reyhan's 27 Oct edits that conflict with your decisions: P11 darts +5% -> -2% (13-17 Dec £1,250 -> £1,054); P20 -5% -> -10%/-5% to 20 Dec (gap -16.9%); P04 min 2 on 18-20/23-25 Nov; P20 min 2 on 9-12 Nov","Find the hidden Airbnb layers (0.765x at 9-25 days, 0.900x at 29-41 days) in Smoobu Airbnb default pricing rules on every apartment; set Barking Airbnb minimum nights 3 (1 night still bookable)","Finish the discount cut at Custom 0% on all 8 listings (£3,138 unweighted, ~£1,279 weighted over 30 days)","P12 22-28 Nov: fixed overrides £224/219/220/221/233/246/236 (£1,599 vs £1,996 now; above P75 on 6 of 7 nights)","PriceLabs Sync Now on P11 3064196 and P13 3064856 (3 bookings unseen); P13 min 1 on 17 and 27 Nov orphans (£271) and min 2 on 25-26 Dec (£218)"],
"per_property":[
{"ref":"P01","change":"No change; sold out to 20 Dec handback (100% vs 34%); pushed 28 Oct 06:40Z."},
{"ref":"P02","change":"Intentional block; Vrbo copy last pushed 24 Feb (t-p02-vrbo)."},
{"ref":"P03","change":"Intentional block; priced via Channex; no change."},
{"ref":"P04","change":"Reyhan 27 Oct: 1-17 Nov -5% (was -3%; your -8%), 18-20/23-25 Nov +15% min 2 re-saved (rule 3), 6-22 Dec -5%; Airbnb still bookable 1 night (4-5, 18-19 Nov) and not following PriceLabs; fwd30 41.4% vs 25%; next-14 gap -24.0%."},
{"ref":"P05","change":"29-30 Oct changed open -> Blocked (reason unknown); Reyhan 6-7 Nov +10% -> 0%; 29 Dec orphan £1,385 min 1 (source unknown); still Aggressive + Recency; no booking for 10 days; 72.4% vs 38%; 18 Oct rise: none sold at £550 yet."},
{"ref":"P06","change":"8-14 Nov status Blocked -> blank (still unavailable) and Reyhan min 2 on 9-15 Nov; intentional block, question only; 18 Oct rise: 1 booking since (£804.77)."},
{"ref":"P07","change":"Intentional block; no change."},
{"ref":"P08","change":"Push fixed (28 Oct 06:36Z); Airbnb 27-31 Oct £525 room (0.772x); PriceLabs up ~10%; fwd30 81.2% vs 50% to 13 Nov handback."},
{"ref":"P09","change":"Airbnb 3 reviews (5.0); 10-12 Nov at P0 (-12.7%), 79.3% vs 36%: propose +10%; 18 Oct rise: 1 booking since, fwd30 58.6% -> 79.3%."},
{"ref":"P10","change":"No change; sold out to 18 Nov handback."},
{"ref":"P11","change":"14-night cancellation (-£2,950.82); new Booking.com 5-8 Dec £656.07 and 28-31 Oct £565.38 (25.0% commission outside Booster); 11 nights reopened; darts override overwritten to -2% (conflict); uncustomized price -7-13%; fwd60 35.6% vs 38%; 18 Oct rise: lost 22 n / £4,687.23 to cancellations."},
{"ref":"P12","change":"No booking/cancel; pace30 -10.5% (window roll), class Soft; to handback -26.9%; 22-28 Nov up to £1,996 (target £1,599); Airbnb 0.765x at 25 days; 18 Oct rise: 3 bookings since, 19 n / £3,989.35 cancelled."},
{"ref":"P13","change":"Booking.com 18-27 Nov £1,143.76 (0.669x, 20.0% commission); orphans 17 and 27 Nov; fwd30 65.5% vs 41%; PriceLabs still shows 18-26 Nov open; Reyhan -3% 23-26 Dec, 26 Dec 271 -> 240, 25-26 Dec min 3."},
{"ref":"P14","change":"Numbers only: 0% vs 40% market; 72% of open nights at £500 minimum."},
{"ref":"P20","change":"Airbnb 2-6 Nov £733.62 room (0.738x), first since Flexible test; Reyhan overrides -10%/-5% replace your -5% (gap -16.9%); push fixed; fwd30 20.7% vs 36%; parking not unique in catchment."}
]}
```

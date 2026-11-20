# Seeker Estates - Daily revenue report, 2026-11-20 (Friday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval. Where a PriceLabs refresh is needed, you or Reyhan press Sync Now; Claude does not.**

**Inputs**
- `reports/2026-11-20/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-20/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-19/daily-report.md` and its JSON, the dashboard action list (20 Nov, before this step), the full id list, the overnight brief, and `data/policy.json` (read first).
- Yesterday's snapshot `data/snapshots/2026-11-19/` is available, so the day-on-day comparisons in the sections are file diffs.
- kpi_pack was built before the agents appended today's `market.csv`, `comps.csv` and `channel_checks.csv`. Its `missing` block lists all three as empty, so ARI, RGI and price percentiles are null. The sections use the appended rows.
- `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (20 Nov). **Base, min and max are unchanged on all 20 listings** (pricelabs).
- **PriceLabs edits since 19 Nov 06:00Z: one.** Reyhan, 19 Nov 10:55:50Z: P06 DSO 24 Nov-5 Dec, min 3, no price (pricelabs, market, comp-central). Group and account logs: 0. **None of Reyhan's 18 Nov edits has been reverted.**
- I used no guest data and no booking or reservation reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 calendar changes of 19 Nov are your question (t-p06-2229open). P06 gets numbers only.
- P14 is numbers only. Reyhan's minimum of 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701). The twins must keep slightly different prices, never identical.
- **P04 is never open for fewer than 3 nights.** There is no min-1 or min-2 proposal on P04. The 23-26 Dec question asks for min 3, the policy floor.
- Not raised again:
  - the Booking.com +15% markup (`booking_markup` 0.15) and the derived rate plans (`booking_rate_plans`);
  - the Visibility Booster commission and the 15%/20% stay discounts;
  - Booking.com promotion stacking (size only);
  - P04 2 Dec, P12 17 Nov, the P13 twin price order, P09 Airbnb rules, P12 key collection;
  - P20 max 4 guests (the 6-guest display is a confirm-or-revert, not a proposal).
- Nights after each handback are not inventory: P08 and P10 are fully out, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price, t-p11-8dec-orphan, the P13 3064856 20-21 Dec twin fix, and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **The P20 19-22 Nov paid factor.**
   - channel and pricelabs: **0.7225 x £989** (312 + 326 + 351, the rates pushed at the 19 Nov 09:23Z refresh) = £714.55, to the penny. It assumes 19 Nov was £312, £1 above the 07:18Z reading.
   - occupancy brackets it at 0.723-0.771x. market and comp-west give about 0.787x, but they use the pre-09:23Z list (£908), which was not live at booking time (21:24).
   - **I use 0.7225 (a fit; the breakdown was not seen).**
2. **Is the P20 0.7225 a leak? The sections disagree.**
   - pricelabs: it is "the same 0.72x pattern as 28-31 Oct", which `listing_facts.P20.airbnb_discounts_22oct` says not to flag.
   - channel: about **-£126.10 (estimate)** against last-minute 15% alone (£840.65).
   - **My reading:** the 22 Oct 0.72 note was written while the 20% new-listing promotion was live. The same policy entry says that promotion **ended on 24 Oct**. Today the only listed discount for this stay is last-minute 15% (0.85x), so the second 0.85 layer is unexplained on policy.
   - I keep the £126.10 **as an estimate**, inside the "incl. estimates" total, not in the confirmed one.
   - It is not a pricing fault. comp-west puts the sale at **P25 / -9.2% vs the comp median**, +6.8% over the 1-review line: inside the supported band.
3. **No P20 21 Nov double-sell.**
   - Smoobu shows 20-21 Nov `available` 0 (occupancy, channel).
   - Airbnb does not offer 20-23 or 21-24 Nov (channel 07:20Z).
   - PriceLabs still shows 21 Nov open at £351 because it has not refreshed since 19 Nov 09:23Z (pricelabs C1). Its reservation API already has the stay (channel).
   - Booking.com: NOT CHECKED (AWS WAF, not bypassed).
   - `prices.csv` `available` comes from PriceLabs, not Smoobu (pricelabs C1), so the KPI pack cannot see this kind of mismatch.
4. **P04 Christmas bookability.** Yesterday's report said 23-26 Dec was unsellable. comp-east checked live: **20-23, 21-24 and 23-27 Dec ARE bookable.** Only 23-26 Dec, and check-ins on 24, 25 and 26 Dec, are blocked (min 4 next to the 27 Dec arrival).
5. **P06 occupancy:** occupancy 46.7% (7/15 non-blocked) vs comp-central 77.8% (7/9). The two use different denominators. I use occupancy (Smoobu is the truth).
   - comp-central priced 22-24 Nov as open, but **22 Nov has been blocked since 19 Nov 21:26** (occupancy, pricelabs). That leaves **23 Nov as a 1-night orphan**, so the 22-23 Nov price comparison is moot.
6. **P13 identical twin nights.** There are three counts on three windows:
   - pricelabs: **138 of 147** jointly open nights, next 180 (Smoobu);
   - channel: **59 of 68** to 28 Feb;
   - comp-west: **18 open nights** inside the PriceLabs window (20-21 Dec and 3-18 Jan).
   - The 13-19 Dec gap went the other way: **3064856 is now 17.2-17.8% dearer** (comp-west; pricelabs "about -15%"). I use comp-west.
7. **P20 22-24 Nov.** Yesterday I proposed about -7%. comp-west now says **hold**: with the new stay, the 7-day lead turned from -21 to +9 points (57.1% vs 48%), and the price is P100 of only 2 comps (+1.8%). **The -7% is withdrawn.**
8. **The a-discount-cut metric fell, but nothing was switched off.** It went £141 -> **£29** next 13 and £1,069 -> **£905** next 30. On yesterday's calendar windows it is £11 / £873. The fall comes from the window shift, the 19 Nov refreshes, and 20-21 Nov leaving P20 (pricelabs H3).
9. **Missed compression is 14 n / £425 (+£77).** That splits into +£12.8 from P20 17 Dec joining, +£5.0 from our prices, and **+£59.2 from method drift**: booked neighbouring nights were re-priced, and the cut-off moved. It is not a market move (market §4).
10. **The P12 26 Nov target:** comp-east supports £205-240 room (about -25%); pricelabs targets about £224. I use **about £224**, which is inside the band.
11. **The P11 8 Dec target:** pricelabs about £150; comp-central £154-183. I use **about £170**, inside the comp range.
12. **Next-30 by flat:** occupancy (Smoobu) P04 **46.7%**, P20 **70.0%**, vs kpi_pack `forward_occ_30` 44.8% / 69.0% (PriceLabs; P20 has not registered the stay). I use occupancy.
13. **The rate leak in kpi_pack is overstated by VAT** (channel §6). Corrected: P04 -4.4%, P11 -28.1%, P12 -28.1%, P13 -35.7%.
14. **In today's raw PriceLabs file, `price` differs from `user_price` on many open nights** (pricelabs H4; e.g. P20 21 Nov 351 vs 282, P04 19 Dec 153 vs 175). Smoobu matches `price` everywhere, so I quote `price`.

## Executive summary

1. **Barking 1455 still sells the booked 20-24 Nov, and the guest arrives TODAY (day 21).**
   - At 07:22Z the card was bookable at **£780.30** (comp-east £781), along with 21-24 Nov £613.70, 20-23 Nov £617.95 and 22-25 Nov £605.20 (channel §2).
   - The synced listing does not offer these dates. A second guest could book tonight. At risk: the £631.59 stay plus relocation.
2. **The PriceLabs refresh gap is on its third day, and it has now missed a booking (t-pl-push-1811: high -> critical).**
   - **9 listings refresh only in daytime**: P04, P05, P06, P13 twins, P14, P20, P09, plus 2 Vrbo copies. Their last pushes were 19 Nov 06:42-10:56Z, and each crosses 24 h between 07:28Z and 10:56Z today. P09 and the P11 Vrbo copy are already past 24 h (pricelabs C2).
   - This is why the **P20 booking made at 21:24 is not in PriceLabs**. Its 22-24 Nov (£290/£283/£276) are still priced without the stay.
   - Price sync itself is clean: 0 open nights differ by more than £2.
3. **P20 sold the delivery dates.**
   - Airbnb 19-22 Nov, **£714.55 room** (£238.18/n), booked at lead 0. It covers the policy delivery block 20-22 Nov, which was shortened on 18 Nov 16:16Z.
   - **Is the delivery still happening with a guest in? That is your call. I keep t-p20-delivery open as "confirm the delivery moved"** (priority critical -> high), because the inventory side is now overtaken: the dates are sold and nothing was double-sold on Smoobu or Airbnb.
   - The Airbnb listing still shows **6 guests** (policy 4; day 2). This stay is 4 guests, within policy.
   - **22-24 Nov min 2** is a conflict with policy min 3 to 30 Nov. On price, hold (correction 7).
   - **5 / 26 Dec +100%:** £528 / £571. comps support about **£382 on 26 Dec**.
4. **Calendar changes for you to confirm.**
   - **P06 (intentional block):** the long block now starts **6 Dec** (moved 19 Nov 11:55Z), which opened **29 Nov-5 Dec, 7 n, £2,624** at min 3. A new 1-night block on **22 Nov** leaves a **23 Nov orphan** (£255). Reyhan added a min-3 DSO on 24 Nov-5 Dec.
   - **Reyhan's 18 Nov conflicts are still live:**
     - P13 1 Dec +25% (policy +50%; £229 / £161);
     - P11 darts -2% (14-17 Dec average **£230.00** vs your >£300);
     - P05 29 Nov-2 Dec -2% and P11 3-4 Dec -2%.
5. **Price gaps the comps support (all within PriceLabs min/max).**
   - **P04:** 6-16 Dec **+20%**; 17-19 Dec **+15%** (19 Dec was cut 175 -> 153 overnight).
   - **P04 20-26 Dec £1,216:** hold 20-22 Dec, +5% on 23-26 Dec, **min 4 -> 3** (your call).
   - **P05:** 7-8 / 13-14 Dec **+21.6%** (`recommend`, inside the +12%-over-median support).
   - **P13 3090701** (engine cut it 7%, now P0): **+12%** on 13-17 Dec, +5% on 18-19 Dec.
   - **P12** is above the band on every open stay (cuts, your call).
6. **Discount layers.**
   - Airbnb hidden layer: **£4,130.07 confirmed**, £4,301.02 including estimates (day 22).
   - PriceLabs-side gap on the four targets: **£29 next 13 / £905 next 30**.
   - Booking.com: **no booking for about 80 h**. The +15% is not evidenced. Totals 25 gross / 16 confirmed / **37.0%** cancelled.

**Last 30 nights (21 Oct-19 Nov, 14 units with Smoobu history):** occupancy **56.9%**, ADR **£169.51**, RevPAR **£96.46**, revenue **£40,514.05**, **239 nights** (kpi_pack `portfolio_last30`, exact; reproduced by occupancy).
- Reconciliation with yesterday: 20 Oct leaves -9 n / -£1,553.01; 19 Nov enters +7 n / +£1,420.15. 241 - 9 + 7 = 239. £40,646.92 - £1,553.01 + £1,420.15 = £40,514.06 (1p rounding vs the pack).

**Next 30 (20 Nov-19 Dec):** **57.2%** booked (135/236; yesterday 57.9%, 136/235). **Next 60 (20 Nov-18 Jan):** **46.2%** (192/416; yesterday 47.2%, 196/415).
- Source: occupancy, live Smoobu GET at 07:18:30Z, handback-aware. Reservations and `/api/rates` agree on every unit-night.
- Next 30 reconciliation: yesterday's window recounted on today's pull = 139/240 (+3 for the P20 stay; +6 for P06 30 Nov-5 Dec reopened; -1 for P06 22 Nov blocked). 19 Nov leaves -7 / -10; 19 Dec enters +3 / +6. Result: 135 / 236.
- Next 60 reconciliation: 199/420 recount; 19 Nov -7 / -10; 18 Jan 0 / +6. Result: 192 / 416.

**7-day pickup (bookings made 14-20 Nov, to 07:18Z):**
- Gross: 11 bookings / 53 n / £10,011.61. Still confirmed: 10 / 48 n / £9,164.51.
- Cancelled in the window: 2 / 18 n / £3,264.44 (P04 20 Dec-2 Jan £2,417.34; P13 18-23 Dec £847.10). **No new cancellation.**
- **Net: +35 n / +£6,747.17** (yesterday +38 n / +£6,967.33).
- Reconciliation: 13 Nov leaving the window takes -6 n / -£934.71; the P20 stay adds +3 n / +£714.55.

## P20 Waterford: the delivery-date sale

**Source:** occupancy, channel §1, pricelabs C1, market §2, comp-west P20.

| 19-22 Nov, 3 nights, Airbnb, booked 19 Nov 21:24 (lead 0) | £ | Source |
|---|---|---|
| Room paid | **714.55** (£238.18/n) | Smoobu price-elements; PriceLabs `get_pms_reservations` |
| Cleaning / commission / payout | 150 / 134.01 / 730.54 | channel §1 |
| Smoobu at booking (fit): 312 / 326 / 351 | 989 | channel, pricelabs |
| Paid / Smoobu | **0.7225** (0.85 x 0.85, a fit) | channel, pricelabs |
| Policy expectation (last-minute 15%) | 840.65; gap **-£126.10 (estimate)** | channel; correction 2 |
| Kept comps on the booking day (20-23 Nov, n = 4) | **P25 / -9.2% vs median** £317.50; +6.8% over the 1-review line | comp-west |
| Market 20-21 Nov room P50 / P75 | 217-219 / 283-288 (occupancy 59-60%, Δ -8.5 / -10.8 vs STLY) | comp-west, market |

- **Read:** the sale is fair for a soft market (comp-west `recommend` at booking: "fix-listing 0%", so price was not the constraint). The only open money question is the second 0.85 layer, which goes to a-airbnb-rules as an estimate.
- **Inventory:** no double-sell found (correction 3). After the stay, 22-24 Nov is open at **£849** (290/283/276), min 2, before the 25 Nov arrival. Under the policy min 3 it would still sell, as exactly 22-25 Nov.
- **For you:**
  - The delivery: is it moved? If so, record the new date in `policy.json` (`listing_facts.P20.block_20_21_nov`).
  - Guests: 6 vs 4.
  - 22-24 Nov: min 2 vs 3.
  - Booking.com: confirm 20-21 Nov show closed in the extranet calendar (NOT CHECKED here).

## P04 Barking: today's arrival and Christmas

**1455 on the sold 20-24 Nov (channel §2 07:22Z; comp-east 07:20Z):** £780.30 bookable; 21-24 Nov £613.70; 20-23 Nov £617.95; 22-25 Nov £605.20; 18-20 Dec £481 (comp-east). It is static on 6-13 Dec £1,290.26, 13-20 Dec £1,282.97 and 4-7 Jan £639.20, and not offered on Christmas-NYE.

**What is left at Christmas: 20-26 Dec, 7 n, £1,216** (168/171/168/177/181/177/174; yesterday £1,233, -£17, no edit; min 3/3/3/4/4/4/4)

| Stay | Ours, Airbnb all-in £/n | Band median (n), vs | Supported room £/n | Bookable? | Market |
|---|---|---|---|---|---|
| 20-23 Dec | 199.67 | 218.67 (5), -8.7% | 157-185: **in range, hold** | yes | P54 |
| 21-24 Dec | 202.33 | 215 (4), -5.9% | 155-183: **in range, hold** | yes | P54 |
| 23-26 Dec | - | 226.67 (5) | - | **no (23 Dec min 4)** | P52 |
| 23-27 Dec | 195.25 | 228 (5), -14.4% | 176-207: **about +5%** | yes | P50 |

- Source: comp-east Priority 1 (`quality_premium` -0.15). market: £19 over the mixed P50, **about £89 under the matched P50**, £266 under P75, occupancy Δ +2.4 to +9.1.
- `prices_with_default_customization` 20-26 Dec is £215.3/n vs £173.7 final (-19%; comp-east). The customisations are pulling these nights down.

**6-19 Dec (comp-east Priority 1):**
- 6-9 Dec -27.7%, 9-12 Dec -26.4%, 11-14 Dec -25.0%, **14-17 Dec -32.3%**, 16-19 Dec -30.9%, 17-20 Dec -24.3% vs band. P0 vs the stored comps on every stay. Comps did not move by £10 or more.
- Supported: **about +20% on 6-16 Dec** (room £165-175) and **about +15% on 17-19 Dec**. 19 Dec fell 175 -> 153 overnight (now in the 16-30 d occupancy band at -20%; pricelabs H4), which reopens the gap.
- market: 6-19 Dec is **£220 under the mixed P50** (yesterday £176).

**24 Nov:** a 1-night orphan (£145, min 3), day 6. P04 rule: numbers only.

## Reyhan's PriceLabs edits: confirm or revert

| Edit | Standing decision | Effect now (yesterday) | Revert = |
|---|---|---|---|
| **P13 1 Dec +50% -> +25%, min 1** (3064856, `updated_at` 18 Nov 12:14:53Z) | `intentional_overrides.P13`: +50% min 1 | 3064856 **£229** (232); 3090701 £161 (163) | DSO 1 Dec +50% on 3064856 (child copies) |
| **P11 14-18 Dec -2%** (14-15 min 3, 16-18 min 2) | 21 Oct darts average >£300; 24 Oct "+5%, leave" | 14-17 Dec 219/222/229/250 = **£230.00 avg** (£229.00); 18 Dec 310 | DSO 14-18 Dec +5% (about 235/238/245/268/332); comps support **£279-309** room (comp-central) |
| P05 29 Nov-2 Dec -2%, min 3 | "cut PriceLabs discounts" | 500/484/482/501 = **£1,967** (£1,981); -5% vs kept | DSO 0% |
| P11 3-4 Dec -2%, min 2 | "cut PriceLabs discounts" | 230 / **277** (214 / 329; 4 Dec -£52 from the engine on top) | Prior DSO (not in logs; about +25% on 3 Dec, inferred). comps support about **£270** room on 2-4 Dec |
| P20 5 Dec +100%, min 1 | none | **£528** (531); uncustomized £363; above the market P90 £409 | Your call: confirm, or step toward P75-P90 (£297-409) if unsold by about 28 Nov |
| P20 26 Dec +100%, min 1 | none | **£571** (569); uncustomized £376 | Your call: about **£382** (comp-west, n = 1; it rests on one comp) |
| P20 22-24 Nov -5% **min 2** (8 Nov) | `listing_facts.P20.min_stay`: 3 to 30 Nov | £849, sold as 2 or 3 nights | Min 3 (still sells as 22-25 Nov). **Price: hold** (correction 7) |
| **P06 24 Nov-5 Dec min 3** (19 Nov 10:55:50Z, new) | P06 intentional block (numbers only) | 29 Nov-5 Dec sellable at min 3 since the block moved | Part of t-p06-2229open |

Carried (unchanged): P05 Jan/Feb -5%; **P04 base 200 vs your 220**; P04 6-22 Dec -5%; P14 min 450 vs £500; P05 max 3,500; P20 base 330 vs 350. P04 18-19 Nov min 2 has expired (it sold); record it. **Then record the outcomes in `policy.json`.**

## Base review

`base_price` is unchanged on every listing (pricelabs). Base vs market P50 uses `market.csv` 20 Nov (bedroom-matched `summary_table`; market §1).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 10 non-blocked nights to the 20 Dec handback; base -5.6% vs P50 £268 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (your 220)** / **"Unavailable"** | 46.7% vs 23% next 30, 36.7% vs 19% next 60; 6-19 Dec -24% to -32% vs band; base +14.9% vs 2 BR P50 £174, -7.0% vs P75 £215 | **Conflict: confirm 200 or revert to 220.** Revert recommended (not additive with a-p04-dec-1611). Ask PriceLabs support why the recommendation is missing |
| P05 | 550 / 538 | 73.3% vs 47%; 7-8 / 13-14 Dec -15% / -8% vs kept; qp +0.116; `recommend` +21.6%; base -3.0% vs 4 BR P50 £567 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 46.7% of 15 non-blocked vs 52%; base -13.8% vs P50 £414 | **Hold** (policy block; numbers only) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / 280 | 50.0% vs 51% (Soft); 22-27 Nov +21% to +37% over kept on list; December -9% to -20%; base -2.4% vs P50 £293 | **Hold 286.** The levers are date overrides (darts, 2-4 Dec, 23-25 Dec, 3 Jan) and a-discount-cut |
| P12 | 284 / 284 | 75.0% to handback vs 44%; pace **-1.1%** (On track, window effect); every open stay +4% to +28% vs band with qp -0.15; base +38.5% vs P50 £205; 6 open nights left | **Hold 284; correct the open nights by DSO** |
| P13 | 250 / 241 | 70.0% vs 47% next 30, 55.0% vs 37% next 60; base +12.6% vs P50 £222 | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 47%; P100, +49% to +130% vs kept; 76 of 180 open nights at £450 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / **351** (was 354) | 70.0% vs 38% next 30, 56.7% vs 30% next 60; 5.0 (1); base +28.4% vs P50 £257 | **Conflict: confirm 350 or record 330** |

## What changed since 19 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+25 n / +£7,329.70** (unchanged, fourth day) |
| Raised, including P06 | **+34 n / +£9,196.31** (made 28 / 108 n / £23,831.63; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +54 n / +£10,158.37 (+3 n / +£714.55: the P20 stay) |
| P13 (comparison) | +27 n / +£4,704.65 (unchanged) |
| P04 (comparison) | **+47 n / +£5,933.67** (unchanged; +£3,446.27 if import-batch records count as £0) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 0 / £0; **P05 +16 / +£6,135.19**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21.
- **No raised unit has had a booking or a cancellation since 13 Nov 22:20 (7 days flat).**
- **Reading: hold the bases.** The caveats stand. The markup changes (24 Oct, 12 Nov, 18 Nov), promotions, Reyhan's overrides and the P06 reopening cannot be separated out, and the sample is 1-9 bookings per flat.

### Per property
| Ref | Change since 19 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked, now 288/293/249 (**£830**). If reopened: 18-21 Dec -11.7% vs stored (n = 7), -4.2% vs band; parity supported, up to +5% (comp-east). 100% of 10 non-blocked nights booked. Base-rise 0. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight (P03 via Channex 03:26Z). P02 Vrbo copy stale since 24 Feb. |
| P04 | **1455 still sells the sold 20-24 Nov (£780.30) on arrival day (day 21).** 20-26 Dec £1,233 -> **£1,216** (no edit); 20-23 / 21-24 / 23-27 Dec bookable, 23-26 Dec and check-ins on 24-26 Dec not (min 4). 6-16 Dec £1,577 -> £1,561; **19 Dec 175 -> 153**. 24 Nov orphan day 6 (£145). Fwd30 46.7% vs 23%; fwd60 36.7% vs 19%. Pickup +1 n / -£596.86. Last push 19 Nov 09:23Z. |
| P05 | No booking. 7-8 Dec £970 (P25 / -15% vs kept), 13-14 Dec £1,015 (P20 / -8%). The gaps narrowed because a comp cut 7-15%. 29 Nov-2 Dec £1,967 (Reyhan -2%). 21 / 29 Dec £2,049 / £2,540 (+300% min 1). Long stay 10% on 5 n still on. **The extra-guest fee is confirmed: +£20/night at 8 guests, £0 at 6** (source NOT CHECKED). Fwd30 73.3% vs 47%. Engine -£106 on 25 open nights (19 Nov refresh). |
| P06 | **The block moved to start 6 Dec (19 Nov 11:55:35)**, opening 29 Nov-5 Dec at 269/324/363/376/388/432/472 = **£2,624**, min 3. **New 22 Nov block (19 Nov 21:26)** -> 23 Nov orphan (£255, min 2). Reyhan: min-3 DSO 24 Nov-5 Dec. Fwd30 46.7% (7/15) vs 52%, now Soft (the denominator moved; no cancellation). Numbers only (policy). |
| P08 / P10 | Handed back. |
| P09 | No sellable night before the 26 Nov handback; last push 19 Nov 06:42Z (past 24 h; no impact). |
| P11 | No booking. 22-27 Nov £204.60 avg (+5.4%; hold: +21% to +37% over kept on list). 2-4 Dec 215/230/**277** (4 Dec -£52). 8 Dec **£311** (+55% vs kept). Darts 14-17 Dec avg £230.00 (-19% vs kept). 23-25 Dec **£282/£256/£268** (-14% kept, -2% wider). 3 Jan £172. Fwd30 50.0% vs 51% (Soft). Refreshed overnight again (00:30Z). |
| P12 | 20 Nov 319 -> 294 (orphan, lapses tonight; min 2 with a 21 Nov arrival); 26 Nov **£311** (P100, +28% vs band); 30 Nov-3 Dec **268/282/285/297** (moved up again, no edit). Pace **-1.1%** (-2 n / -£42.84), On track (window effect). |
| P13 | **The engine cut 3090701 about 7% on 13-19 Dec** (now 204/200/198/202/208/221/226; P0 vs comps); 3064856 19 Dec 243 -> 266. 13-19 Dec gap now 17-18%; **20-21 Dec and 3-18 Jan still identical** (18 open nights; Airbnb £203.00 / £200.00 on both). 27 Nov £270 (Finals Weekend, Δ +7.3); 1 Dec £229 (+25% vs policy +50%). Fwd30 70.0% vs 47%. |
| P14 | Numbers only: 76 of 180 open nights at £450 (18 Dec joined); P100 / +49% to +130% vs kept; 0% vs 47%; last push 19 Nov 07:28Z. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **New Airbnb stay 19-22 Nov £714.55** on the delivery dates (0.7225x, est. -£126.10 vs policy; P25 / -9.2% vs comps). Not in PriceLabs (refresh 19 Nov 09:23Z). Airbnb still shows 6 guests. 22-24 Nov £849 min 2: hold. 5 / 26 Dec £528 / £571. 14-19 Dec hold (P14 / -12.6%, +2.9% over the line). Fwd30 **70.0%** vs 38%. Recommended base 354 -> 351. |

### Open plan items: status today
| Item | Status 20 Nov (evidence) |
|---|---|
| t-pl-push-1811 | **Worse, third day: high -> critical.** 9 listings daytime-only; P20 missed a booking |
| t-p20-delivery | **Overtaken on inventory (dates sold, no double-sell); kept open as "confirm the delivery moved"; critical -> high.** 22-24 Nov price: hold (the -7% is withdrawn) |
| t-p06-2229open | Updated: block moved to 6 Dec, 29 Nov-5 Dec opened (£2,624), 22 Nov blocked -> 23 Nov orphan, Reyhan min 3 |
| t-p04-xmas-1711 | Updated: £1,216; three stays bookable; min 3 question narrowed to 23-26 Dec / 24-26 Dec arrivals |
| a-p04-dec-1611 | Updated: 17-19 Dec now +15% (19 Dec cut to 153) |
| a-p05-dec | Updated: gaps narrowed (-15% / -8%); size = `recommend` +21.6% |
| t-p13-twins | Changed shape: 13-19 Dec now 17-18% apart (3090701 cut); 20-21 Dec and 3-18 Jan still identical; new sizes from comp-west |
| a-p12-trim | 19-20 Nov part lapsed; 30 Nov-3 Dec now about -12% |
| t-channel-gaps | Further away (23-25 Dec £806); resized to `recommend` +5% |
| a-airbnb-rules | Day 22; P20 0.7225 added as an estimate |
| a-deposit | **Deadline today** |
| Others | Unchanged; numbers refreshed in the JSON |

**Closed today:** none. Nothing in today's data shows an open item fixed or lapsed. **New today:** none; every finding maps to an existing open id. None reopened.

## Actions - 2026-11-20

**Ranking:** time-bound rows first (today's arrival, today's deadline), then critical rows, then rows by expected £, then cuts marked "your call", then per-stay rows and questions.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). These are upper bounds; elasticity is not measured.
- Airbnb factor (channel §1, §6): 0.765 up to 28 d, 0.900 at 29-60 d. P11 (Booking.com only): 0.762 (carried). P04: booked share only (same method as the last five days).
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.467, P11 0.500, P12 0.750, P13 0.700, P20 0.700. Next 60: P04 0.367, P05 0.583, P11 0.433, P13 0.550, P20 0.567.

**Bounds** (`kpi_pack` settings, 20 Nov, unchanged): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 21, ARRIVAL TODAY).** On 1455876748739910219, **block 20 Nov-5 Jan now** (20-24 Nov first), or snooze/unlist it. Keep its Christmas-NYE dates closed. Then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §2 (07:22:07Z): **20-24 Nov bookable at £780.30**, 21-24 Nov £613.70, 20-23 Nov £617.95, 22-25 Nov £605.20, while the synced listing does not offer them (sold: £489.59 room + £142 cleaning). comp-east (07:20:11Z): £781; also 20-22 Nov £457, 18-20 Dec £481 | Not quantified (exposure: the £631.59 stay arriving today, plus relocation if a second guest books) | Corentin | 2026-11-20 |
| 2 | P04 P05 P06 P13 P14 P20 P09 | **t-pl-push-1811 (high -> critical, third day).** Check last sync on the 9 listings after 09:23Z / 10:56Z today. **Press Sync Now on P20 3547481 first**: it must show 20-21 Nov Booked and reprice 22-24 Nov. If the others are unmoved, Sync Now, and ask PriceLabs support why these listings miss the nightly run. | PriceLabs > Listings (last sync); 3547481 > Calendar | pricelabs C2: last pushes P09 19 Nov 06:42Z, P14 07:28Z, P13 twins 09:22:50Z, P05 09:22:54Z, P20 09:23:01Z, P04 09:23:03Z, P06 10:56:27Z, P13 Vrbo 12:05Z, P11 Vrbo 18 Nov 12:34Z; overnight group 00:23-06:49Z (P01, P02, P03, P07, P08, P10, P11, P12). C1: P20 21 Nov still open at £351 in PriceLabs; `occupancy_next_7` 14% vs 4/7 actual | Not quantified (a check; it affects the price of every open night on 7 listings) | Corentin / Reyhan | 2026-11-20 |
| 3 | P20 | **t-p20-delivery (critical -> high): confirm the delivery moved.** A guest is in 19-22 Nov. If a delivery is still due, give the new date and record it in `policy.json` `listing_facts.P20.block_20_21_nov`. Also confirm in the Booking.com extranet that 20-21 Nov show closed. **22-24 Nov min 2** vs policy min 3 to 30 Nov: confirm or revert (min 3 still sells as 22-25 Nov). **Price: hold** (no cut). | Smoobu > Calendar > Waterford 3547481; Booking.com extranet > Calendar; PriceLabs 3547481 > DSO 22-24 Nov; `policy.json` | occupancy: stay 19-22 Nov £714.55, block shortened 18 Nov 16:16:46Z; Smoobu 20-21 Nov `available` 0; channel: Airbnb not offering 20-23 / 21-24 Nov, Booking.com NOT CHECKED (WAF). comp-west: 22-24 Nov P100 / +1.8% (n = 2), 7-day lead +9 pts -> **hold** | Not quantified (an ops and policy question) | Corentin | 2026-11-20 |
| 4 | Portfolio | **a-deposit (deadline TODAY).** Decide: £1,000 hold, damage waiver, or ID check only, before Airbnb's 20 Nov rule change. | Airbnb account settings | policy `guest_requirements` | Not quantified | Corentin | 2026-11-20 |
| 5 | P20 | **t-p20-guests-1911 (confirm or revert, day 2).** The P20 Airbnb listing still shows **6 guests**; policy max 4 (Corentin 24 Oct). If 4 stands, set it back; if you changed it, record it in `policy.json` and say whether Booking.com changed too. No proposal from me. | Airbnb 1791529331262420081 > Listing > Guests; `policy.json` | channel §1: `personCapacity` 6 (4 occurrences, 07:25:05Z); comp-west: 6 on 19 and 20 Nov, 4 on 18 Nov; today's stay is 4 guests (within policy) | Not quantified | Corentin | 2026-11-20 |
| 6 | Portfolio (P04 first) | **t-bcom-nr-base-1811 (critical; kept open).** Send an extranet screenshot of the **Standard Rate for 2 Dec and 20 Dec** on Barking (and one other flat). Expected at +15%: **£519** on 2 Dec (Smoobu £451), and P04 20-26 Dec **£1,403** (at x1.10 it would be £1,341). If it is still x1.10, re-save the +15% overwrite in Smoobu pricing. Confirm the derived set-up on every flat. | Smoobu > Pricing > Booking.com overwrite; Booking.com extranet > Rates & availability | channel §3: last screenshot (18 Nov) x1.10; live NOT CHECKED (AWS WAF 07:25:06Z, not bypassed); **no Booking.com booking since 16 Nov 22:52 (about 80 h), 0 since +15%** | At x1.10 Standard is about 4.3% low (P04 20-26 Dec -£62): not quantified as a monthly £ | Corentin | 2026-11-21 |
| 7 | P20 P13 P05 P06 P04 P12 | **a-airbnb-rules (critical, day 22).** Remove the hidden lead-time rules behind **0.850 (lead 0, P04) / 0.7225 (lead 0, P20) / 0.765 (1-28 d) / 0.900 (29-59 d)**. The tiers vary by listing, so check each apartment's rule set. Keep only the visible discounts (policy `airbnb_visible_discounts`). P09 excluded. **Also open the Airbnb breakdown of the P20 19-22 Nov stay** to name the second 0.85 layer. | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Reservations | channel §1, §5: P20 19-22 Nov 0.7225 x £989 = £714.55 (est. **-£126.10** vs last-minute 15%); P13 18-21 Dec 0.765 / 0.900 to the penny on both twins; open cards P05 5-10 Jan £398.81, **P20 14-19 Dec £357.45** (uniform 0.765), P05 4-11 Jan £248.39, P04 20-26 Dec £197.98, P13 14-19 Dec £195.51 | **Realised cost £4,130.07 confirmed**; £4,301.02 incl. estimates (P20 £126.10 + P04 18-20 Nov £44.85). Open-card gaps overlap, not summed | Corentin | 2026-11-21 |
| 8 | P01 | **t-p01-1820block (confirm).** Was extending the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec, so **18-20 Dec** sell at £288 / £293 / £249, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: if reopened, 18-21 Dec £326/n = **-11.7% vs stored (n = 7), -4.2% vs band**; 18-20 Dec +2.1% vs band; PriceLabs NL P63-P68; qp -0.02 (4 reviews); still `Blocked` | £830 x 0.900 = **£747** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-21 |
| 9 | P05 | **a-p05-dec.** Apply `recommend` **+21.6%**: **DSO 7-8 Dec +3% -> about +25%** (484/486 -> about 589/591) and **13-14 Dec +5% -> about +28%** (515/500 -> about 626/608). Both stay under the +12%-over-median support (about £680 / £645). **21 and 29 Dec (+300% min 1): meant to be blocked?** If yes, block them in Smoobu. If they are meant to sell (your call: lowers a price), +300% -> 0% (uncustomized £642 / £959). | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-9 Dec **P25 / -15%** vs kept (wider -11%), 13-15 Dec **P20 / -8%** (wider -6%); qp **+0.116**; `recommend(0.733, 0.47, 0.25, 0.116)` = **+21.6%**; kept n = 3-5 with a £1,020 outlier. market: 7-8 Dec **£164** and 13-14 Dec **£119** under the 4 BR median; 13 Dec Δ **+13.5**; 21 / 29 Dec 1.66x / 2.06x the 4 BR P90 | 7-8 + 13-14 Dec £429 x 0.765 x 0.733 = £240; 21 Dec £642 x 0.900 x 0.583 = £337: **£577** (upper bound). 29 Dec not quantified | Corentin | 2026-11-21 |
| 10 | P05 P04 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off"), and Last-minute to 0%, on P05, P04, P11 and P20. All four are still on Aggressive occupancy plus the Booking Recency default; last-minute P04 5% gradual, P05 1% gradual. **P12 and P13 excluded.** | PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations | pricelabs H3 (`disc20.py`), next 30 (21 Nov-20 Dec): **P05 8 n £698 (-15.0%)**, P04 17 n £123 (-4.3%; the metric understates P04's band), P11 15 n £147 (-4.0%), P20 -£63 (5 Dec +100%); four targets **£29 next 13 / £905 next 30** (positive-only £1,419); the fall is the window, not a fix. comp-east: P04 20-26 Dec default-customization price £215.3/n vs £173.7 (-19%) | 698 x 0.765 x 0.733 + 123 x 0.467 + 147 x 0.762 x 0.500 + P20 £0 = **£505 / 30 days** (upper bound) | Corentin | 2026-11-21 |
| 11 | P04 | **a-p04-dec-1611.** DSO **6-16 Dec -5% -> +14%** (about +20%: 141/140/140/140/142/150/152/142/135/138/141 -> about 169-182). **Split 17-19 Dec out of 6-22 Dec and set -5% -> about +9%** (about +15%: 144/149/153 -> about 166/171/176). Hold 20-22 Dec (row 15). If you do row 10 on P04 first, re-read: part of this gap is the occupancy band. If you revert the base to 220 (row 12), use **+4%** on 6-16 Dec instead. | PriceLabs 3562176 > DSO 6-16 Dec, 17-19 Dec | comp-east Priority 1: 6-9 Dec **-27.7%**, 9-12 -26.4%, 11-14 -25.0%, **14-17 -32.3%**, 16-19 -30.9%, 17-20 -24.3% vs band (P0 vs stored); supported room £165-209; comps flat; `recommend` +10% (30 d and 31-60 d), adopted at the larger size because the comp gap exceeds the step. pricelabs H4: **19 Dec 175 -> 153**. market: £220 under the mixed P50 | 6-16 Dec £1,561 x 0.20 x 0.467 = £146; 17-19 Dec £446 x 0.15 x 0.467 = £31: **£177** (upper bound) | Corentin | 2026-11-21 |
| 12 | P13 P11 P05 P04 P20 P14 | **a-p13-record: confirm or revert Reyhan's edits** (table above). (a) **P13 1 Dec +25% -> +50%** (policy). (b) **P11 darts 14-18 Dec -2% -> +5%** (your 24 Oct setting). (c) P05 29 Nov-2 Dec -2% -> 0%; P11 3-4 Dec -2% -> prior. (d) P20 5 Dec £528 / 26 Dec £571 (+100%): confirm, or 26 Dec to about £382. (e) P20 22-24 Nov min 2 -> 3 (also in row 3). (f) P04 base 200 -> 220. (g) P05 Jan/Feb -5%, P04 6-22 Dec -5%, P14 min 450, P05 max 3,500, P20 base 330 vs 350: confirm. Then record the outcomes in `policy.json`. | PriceLabs 3064856, 3064196, 3166592, 3547481, 3562176, 3267077; `policy.json` | pricelabs H1-H2 (all DSOs live, `updated_at` 18 Nov 12:14-12:18Z); comp-central: darts **P0 / -19% kept**, supported £279-309; 2-4 Dec -9% vs wider (n = 15), about £270; P05 29 Nov-3 Dec -5% vs kept. market: darts £920 vs policy £1,200 (gap £280); 1 Dec P50 227 / P75 290. comp-west: 26 Dec n = 1 comp £494 -> £382 | Darts £1,230 x 0.0714 x 0.762 x 0.500 = £33; 1 Dec £46 x 0.765 x 0.700 = £25; P11 3-4 Dec £10 x 0.762 x 0.500 = £4; P05 £40 x 0.765 x 0.733 = £23: **£84** (upper bound). P04 base: not additive with row 11. P20 26 Dec: not quantified (a cut) | Corentin | 2026-11-21 |
| 13 | P13 | **t-p13-twins (twin rule).** (a) **DSO 3090701 +12% on 13-17 Dec** (204/200/198/202/208 -> about 228/224/222/226/233; keeps a 4.5-5.3% gap below 3064856). (b) **DSO 3090701 +5% on 18-19 Dec** (221/226 -> about 232/237). (c) **DSO 3064856 -3% on 20-21 Dec** (222/233 -> about 215/226; your call, lowers a price; breaks the identical pair). (d) **DSO 3090701 +3% on 3-18 Jan** (3064856 unchanged). Set these on the child after any parent edit. Hold 3064856 13-19 Dec. | PriceLabs 3090701 / 3064856 > DSO | comp-west: 3090701 13-16 Dec **P0 / -13.4%** (n = 4), 16-19 Dec **P0 / -10.6%** (n = 6), 8-11% under its line; comps flat, so the fall is ours (PriceLabs -7% at the 19 Nov refresh); 20-21 Dec and 3-18 Jan identical (18 nights; Airbnb £203.00 / £200.00); 5-8 / 14-17 Jan -3.9% / -7.8% vs median at market occupancy 12-16%. pricelabs H5: 138 of 147 identical (next 180); channel: 59 of 68 | (a)+(b) £144 x 0.765 x 0.700 = **£77** (upper bound). (c) a cut; (d) not quantified (duplicate-listing risk) | Corentin | 2026-11-21 |
| 14 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**, and the **Long stay 10% on 5-6 nights**: keep and record, or 0%. | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §4: 6-13 Dec -£162.80, 13-20 Dec -£162.33 (18.0%); Long stay on 20-26 Dec -£93.78 (card 0.810 of Smoobu); the extra 3 weekly points cost £39.39 on the 27 Dec-4 Jan sale | **£39.39** realised; £93.78 on one 6-night Christmas stay | Corentin | 2026-11-21 |
| 15 | P04 | **t-p04-xmas-1711 (high).** For the 7 open nights: **20-22 Dec hold**; **23-26 Dec DSO -5% -> 0%** (about +5%: 177/181/177/174 -> about 186/190/186/183). **Your question: min 4 -> 3 on 23-26 Dec** (the policy floor), so that 23-26 Dec and check-ins on 24-26 Dec can sell. | PriceLabs 3562176 > DSO 23-26 Dec (price, min) | comp-east (live): 20-23 / 21-24 / 23-27 Dec bookable; 23-26 Dec not (min 4); 20-23 / 21-24 Dec -8.7% / -5.9% vs band (in range); 23-27 Dec -14.4% (about +5%). market: about £89 under the matched P50, Δ +2.4 to +9.1. pricelabs H5: £1,216 (-£17, no edit) | 23-26 Dec £709 x 0.05 x 0.367 = **£13**. Min 3: not quantified | Corentin / Reyhan | 2026-11-21 |
| 16 | P11 | **t-channel-gaps (resized to `recommend`).** **23-25 Dec DSO +5% -> about +10%** (282/256/268 -> about 296/269/281). **3 Jan:** DSO so the price is about **£181** (+5%; £172 now). | PriceLabs 3064196 > DSO 23-25 Dec, 3 Jan | comp-central: 23-25 Dec **P43 / -14% kept** (n = 7), -2% wider (n = 43), supported £275-319; 3-5 Jan P38 / -13% kept, -1% wider, supported £189-222; `recommend` = **raise +5%** at P0-P44. market: 23-25 Dec Δ -3.3 to -10.3 (soft); 3 Jan £20 under the fortnight. Sized at the formula, not the comp top, because the market is soft | 23-25 Dec £40 x 0.762 x 0.433 = £13; 3 Jan £9 x 0.762 x 0.433 = £3: **£16** | Corentin | 2026-11-21 |
| 17 | P06 | **t-p06-2229open (confirm; not a proposal).** On 19 Nov the long block moved to **start 6 Dec** (11:55:35), opening **29 Nov-5 Dec, 7 n, £2,624** at min 3. A **1-night block on 22 Nov** (21:26) leaves **23 Nov as an orphan** (£255, min 2). Reyhan set a min-3 DSO on 24 Nov-5 Dec (10:55:50Z). **If all intended:** add a date note to `policy.json`, no price change. **If not:** restore the 30 Nov start and/or remove the 22 Nov block. | Smoobu > Calendar > Marylebone; `policy.json` | occupancy: block `modifiedAt` 19 Nov 11:55:35; 30 Nov-5 Dec 324/363/376/388/432/472 + 29 Nov £269; new 22 Nov block; fwd30 46.7% (7/15) vs 52%. pricelabs: who made the Smoobu changes NOT KNOWN. comp-central: qp -0.02; 22-23 Nov comparison moot (22 Nov blocked) | Not quantified (a policy question) | Corentin | 2026-11-21 |
| 18 | P12 | **a-p12-trim (your call: lowers a price).** **30 Nov-3 Dec DSO 0% -> about -12%** (268/282/285/297 -> about 235/250/250/260). The 19-20 Nov part has lapsed (20 Nov is a 1-night orphan tonight). | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 30 Nov-3 Dec **+10.4%** vs band (n = 11), 1-3 Dec **+17.7%**, 2-4 Dec +18.7%; PriceLabs NL P82; qp -0.15 (ceiling 0%); moved up again with no edit; `recommend` +10% not adopted (lead from sold nights). occupancy: pace -1.1% (On track) | Not quantified (a cut) | Corentin | 2026-11-21 |
| 19 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -17%**, keep min 1 (£311 -> about £224). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £363 all-in, **P100 / +27.8%** vs band (n = 5); supported room £207-243; PriceLabs NL above P90; pricelabs: target about £224 (+£87 gap) | Not quantified (a cut) | Corentin | 2026-11-21 |
| 20 | P11 | **t-p11-8dec-orphan (your call: lowers a price).** Keep min 1. DSO 8 Dec **+50% -> about -18%** (£311 -> about **£170**). | PriceLabs 3064196 > DSO 8 Dec | comp-central: list all-in £506.65, **P100 / +55% kept, +41% wider**; it rose £292 -> £311 overnight; a 1-night stay carries the full £149 cleaning; supported **£154-183 room** | Not quantified (a cut) | Corentin | 2026-11-21 |
| 21 | P05 | **t-p05-los.** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: **-£188.91 on 5-10 Jan, -£200.20 on 18-23 Jan**; weekly 15% on 4-11 Jan matches policy | **£188.91** per 5-night stay | Corentin | 2026-11-21 |
| 22 | P05 | **a-p05-earlybird.** Visible 12% early booking: yours, or 0%? | Airbnb 1618929775762183214 > Pricing > Discounts | channel (carried): applied on the Valentine's stay (£195.24) | **£195.24** per such stay | Corentin | 2026-11-21 |
| 23 | P13 | **t-p13-los5.** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: 14-19 Dec 3090701 **-£92.61**; 3-8 Jan -£76.59 on each twin; not in the 21 Oct rule set | **£76.59-£92.61** per 5-night stay | Corentin | 2026-11-21 |
| 24 | P05 P11 P13 P04 | **a-extra-guest (updated).** Confirmed: P05 Airbnb adds **£20/night at 8 guests** (5-10 Jan £1,989.10 at 8 vs £1,889.10 at 6) and nothing at 6. Smoobu and PriceLabs do not set it (`extra_person_fee` 0). Is it your Airbnb extra-guest fee, and from which guest count? Record it; then decide on the other flats. | Airbnb 1618929775762183214 > Pricing > Extra guest fee | channel §4 (07:23:16Z / 07:23:23Z); 7 guests not tested | Not quantified (guest-paid) | Corentin | 2026-11-21 |
| 25 | P06 P20 P05 | **t-airbnb-flex15-1611.** Open the Airbnb reservation price breakdowns (P20 27 Dec-3 Jan, P05 13-17 Feb, P06 24-29 Nov, **and now P20 19-22 Nov**), and check what the Flexible test turned on. The comparison is 13 days overdue. | Airbnb host app > Reservations; Listings > Policies / Pricing | channel §1 (P20 0.7225); comp-central: the P06 card was not returned today, so the 0.845 cause is still NOT CHECKED | **£530.11** identified (inside row 7, not additive) | Corentin | 2026-11-21 |
| 26 | Portfolio | **t-bcom-minstay-1811 (high; kept open).** Confirm on the extranet that the plan minimum stays are enforced now that the plans derive from Standard: **NR 3, Weekly 7, Monthly 28, NR Weekly 7**. | Booking.com extranet > Rate plans > Restrictions | channel §3, §7: NOT CHECKED (WAF); 24 Oct precedent (a-p04-monthly) | Not quantified | Corentin | 2026-11-21 |
| 27 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 9 post-cut Booking.com cancellations and the P04 Christmas-NYE cancellation. | Booking.com extranet > Reservations | channel §3: **9 of 25 gross cancelled (37.0%, £6,796.87)**; confirmed 16 / 70 n / £11,564.66; 0.94 gross / 0.60 confirmed a day, falling; no booking in about 80 h | Not quantified | Corentin | 2026-11-21 |
| 28 | P13 P12 | **t-bcom-breakdown-1511 (question; no promotion change).** Send the extranet breakdown of the P13 22-27 Dec stay and of P12 7-14 Dec. | Booking.com extranet > Reservations | channel (18 Nov): P13 22-27 Dec 0.6926 of list (a fit) | Not quantified | Corentin | 2026-11-21 |
| 29 | P11 | **a-p11-bcom-stack (no change proposed).** Only the ask: the extranet breakdown naming the three 10% layers. | Booking.com extranet (Camden) | channel (14 Nov): nets £62.47 per £100 | Not quantified | Corentin | 2026-11-21 |
| 30 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-21 |
| 31 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-21 |

**Carried medium items** (a-amenities, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-p20-conversion, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) are in the JSON with today's status. **a-tidy gains one item:** `prices.csv` `available` is built from PriceLabs, not Smoobu, so Smoobu-only closures (P20 21 Nov, P06 22 Nov) are invisible to the KPI pack (pricelabs C1).

## Top 5 for today
1. **Barking 1455 still sells the sold 20-24 Nov, and the guest arrives today (day 21).**
   - Bookable at £780.30 (plus 21-24, 20-23 and 22-25 Nov) at 07:22Z.
   - Block 20 Nov-5 Jan on 1455 now, or unlist it. Then map it to Smoobu 3562176.
2. **The PriceLabs refresh gap is on its third day and has now missed a booking (critical).**
   - 9 listings refresh only in daytime (P04, P05, P06, P13, P14, P20, P09, two Vrbo copies).
   - The P20 19-22 Nov stay is not in PriceLabs, so 21 Nov shows open at £351 and 22-24 Nov is priced without it. Smoobu and Airbnb are closed; Booking.com is NOT CHECKED.
   - Sync Now on P20 first, then the rest after 09:23Z / 10:56Z, and ask PriceLabs support.
3. **P20 sold the delivery dates.**
   - Airbnb 19-22 Nov £714.55 room: 0.7225x Smoobu, est. -£126.10 vs policy, but P25 / -9.2% vs comps, so inside the band.
   - Confirm the delivery has moved and record it.
   - The listing still shows 6 guests (policy 4).
   - 22-24 Nov min 2 vs policy 3. On price, hold.
   - 5 / 26 Dec +100% (£528 / £571). About £382 is supported on 26 Dec.
4. **Calendar changes and Reyhan's conflicts for you to confirm or revert.**
   - P06: the block moved to 6 Dec, opening 29 Nov-5 Dec (£2,624); the new 22 Nov block leaves a 23 Nov orphan; Reyhan set min 3 on 24 Nov-5 Dec.
   - Still unreverted from 18 Nov: P13 1 Dec +25% (policy +50%); P11 darts -2% (14-17 Dec average £230 vs >£300); P05 29 Nov-2 Dec and P11 3-4 Dec -2%.
5. **Where the money is.**
   - Airbnb hidden layers: £4,130.07 confirmed (£4,301.02 incl. estimates, day 22).
   - a-discount-cut: £905 next 30 (£505 expected).
   - P04 6-16 Dec +20% / 17-19 Dec +15%; 20-26 Dec £1,216: hold 20-22, +5% on 23-26, min 3.
   - P05 7-8 / 13-14 Dec +21.6% (£577 with 21 Dec).
   - P13 3090701 +12% on 13-17 Dec.
   - P01's 18-20 Dec block holds £830.
   - Booking.com: no booking for about 80 h, and the +15% is not evidenced.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Observed tiers (channel §1, §6, day 22): **0.850 at lead 0 (P04), 0.7225 at lead 0 (P20, a fit), 0.765 at 1-28 d, 0.900 at 29-59 d, 1.000 from 60 d**.
  - The tiers are not a simple per-night rule: the P13 3090701 14-19 Dec card is a uniform 0.900, including 18 Dec, which is 0.765 on the 18-21 Dec card.
  - Owner net per £100 Smoobu (channel §6):
    - Airbnb: 1.000 £84.50; 0.900 £76.05; 0.850 £71.83; 0.765 £64.64; 0.738 £62.36; **0.7225 £61.05**.
    - Booking.com model at +15%: £97.75. Direct model: £90 (unconfirmed).
  - Every observed Airbnb price inside 60 d nets below the direct model. Target: **1.00x before visible discounts by 2026-11-27** (row 7).
- **Booking.com since the 24 Oct markup cut** (channel §3).
  - **16 confirmed / 70 n / £11,564.66**; 9 of 25 cancelled (**37.0%** of gross room).
  - 0.94 gross / 0.60 confirmed a day, falling. **0 bookings since +15% (18 Nov); none since 16 Nov 22:52 (about 80 h).**
  - The leaks are cancellations (row 27) and whether +15% has reached Standard (row 6), not the markup decision. Target: under 20% cancelled by 2026-11-30.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.88 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.63 |
  | P04 synced | **4.2 (10)** | 4.83 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.79 (38) | 4.50 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 5.0 (1), still "New" | 4.80 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** That is why P12's open nights need trims and why P04's Christmas ceiling sits at the band median.
  - Fixes: a P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; P20 review requests after the November, December and NYE stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31; P20 3 reviews by 2026-12-31 (the 19-22 Nov stay is the next review chance).
- **Listing conversion.**
  - **P04:** mapping 1455 (row 1) fixes both the double-booking risk and conversion (4.69 (26) vs 4.2 (10)).
  - **P11:** a basement with a patio; 4 of 12 comps have a lift. Titles: a-titles.
  - **P20:** put parking in the first photo; one review; the 6-guest display is a policy question (row 5).
  - **No "Free cancellation" pill on our listings.** 4 P13 comps and 2 P20 comps show it (comp-west). The Flexible test (P20, P06, P05 since 24 Oct; comparison due 7 Nov, **13 days overdue**) is how to measure it.
- **Gap fill and length of stay.**
  - Unsellable now:
    - P04 24 Nov (P04 rule);
    - **P06 23 Nov** (new; policy listing);
    - P12 20 Nov tonight (min 2 with a 21 Nov arrival; lapses tonight).
  - The P06 29 Nov orphan is gone (29 Nov-5 Dec reopened).
  - **Stranded by min stay:** P04 23-26 Dec and check-ins on 24-26 Dec (row 15).
  - Exact-stay runs: P05 7-8 / 13-14 Dec; P11 2-4 Dec; P20 22-24 Nov (as 22-25 under min 3).
  - 20 Jan-19 Mar below 5 nights (pricelabs M1): P11 40/59, P13 46/59 per twin, P05 33/51, P20 52/59, P04 40/59. **Please confirm the 5-night policy still applies.**
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded) at the normal price, not +100%. `kpi_pack` `gaps` is still [] on every ref. Mid-term (91+ nights): NOT CHECKED.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. A direct guest at -10% nets £90 per £100, vs £61.05 on today's P20 sale.
- **Event compression** (market §4): **14 n / £425** (yesterday 13 / £348); bookable 13 / £392.
  - The change splits into +£12.8 from P20 17 Dec joining, +£5.0 from our prices and +£59.2 from method drift (correction 9).
  - **£234 is P11 Round One (14-17 Dec)**, which is Reyhan's -2% (row 12b), in a market at or below STLY.
  - Real items not in the headline:
    - P04 6-19 Dec, £220 under the mixed P50 (row 11);
    - P04 20-26 Dec, about £89 under the matched P50 (row 15);
    - P05 7-8 / 13-14 Dec, £164 / £119 under the 4 BR median (row 9);
    - P13 19-21 Dec, £17 under P50 on Δ +11 to +15, with the twins identical on 20-21 Dec (row 13).
  - Next:
    - Finals Weekend 27 Nov: P13 £270, Δ +7.3, £25 under P75; hold (a-p13-orphan-price).
    - Jingle Bell Ball 5-6 Dec: P20 5 Dec £528.
    - NYE fireworks final ticket release: today 12:00.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (14 units) | **56.9%** (239 n; yesterday 57.4%, 241 n) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£169.51** (yesterday £168.66) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£96.46** (yesterday £96.78) | £129 | 2026-12-18 |
| Revenue, last 30 | **£40,514.05** (239 n) | - | - |
| Booked next 30 (Smoobu) | **57.2%** (135/236) | each unit at least market + 10 pts (below: P11 50.0% vs 51%, P06 46.7% vs 52%) | 2026-11-30 |
| Booked next 60 (Smoobu) | **46.2%** (192/416) | at least market + 10 pts (below: P11 43.3% vs 38%) | 2026-11-30 |
| 7-day pickup, net | gross 11 bk / 53 n / £10,011.61; cancelled 2 / 18 n / £3,264.44; **net +35 n / +£6,747.17** | at least 10 bookings a week, net positive | 2026-11-27 |
| P12 pace vs STLY (to 13 Dec handback) | **-1.1%** (-2 n / -£42.84), On track (window effect) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+25 n / +£7,329.70 like-for-like** (unchanged, fourth day); +34 n / +£9,196.31 incl. P06; P04 comparison +47 n / +£5,933.67 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **16 confirmed / 70 n / £11,564.66; 9 of 25 cancelled (37.0%)**; 0 since +15%; none for about 80 h | cancellations under 20% | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.850 / 0.7225 (lead 0) / 0.765 / 0.900 / 1.000** by lead time, day 22; realised cost **£4,130.07 confirmed** (£4,301.02 incl. estimates) | 1.00x before visible discounts | 2026-11-27 |
| PriceLabs-side gap (four targets) | **£29 next 13; £905 next 30** (window shift, not fixed) | £0 apart from your own overrides | 2026-11-27 |
| PriceLabs vs Smoobu | **0 open nights differ by more than £2**; availability differs on P20 21 Nov and P06 22 Nov; **9 listings past or crossing 24 h today** | 0 mismatches; pushes under 24 h | 2026-11-20 |
| Unsellable orphan nights (next 60) | **3**: P04 24 Nov (rule), P06 23 Nov (policy listing), P12 20 Nov (tonight); P04 23-26 Dec / 24-26 Dec arrivals stranded by min 4 | 0 outside policy | 2026-11-27 |
| Double-sellable Barking stays | **1455 bookable on the sold 20-24 Nov (£780.30)**; day 21; arrival today | 0 | 2026-11-20 |
| P13 identical twin nights | **59 of 68** (Smoobu to 28 Feb); **138 of 147** next 180; 18 in the PriceLabs window | 0 | 2026-11-27 |
| Missed compression | **14 n / £425** (+£59.2 of it method drift); bookable 13 / £392 | under 10 nights | 2026-11-30 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-30; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.79; comp medians 4.50-4.88; P20 5.0 (1) | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Booking.com live:** whether +15% reached Standard, derived-plan display, plan minimum stays, P20 20-21 Nov closure, and same-date ordering: NOT CHECKED (AWS WAF, not bypassed). Source: your extranet screenshots (rows 3, 6, 26).
2. **The P20 19-22 Nov discount breakdown** (the second 0.85 layer) and the Smoobu 19 Nov price after the 09:23Z push: NOT CHECKED. Source: Airbnb host app > Reservations > price breakdown.
3. **Why 9 listings refresh only in daytime** (third day), and why `price` and `user_price` diverged in today's raw: UNKNOWN. Source: PriceLabs support.
4. **Who changed the P06 calendar on 19 Nov** (block start 6 Dec; 22 Nov block), and who shortened the P20 block and set 6 guests: NOT CHECKED. Source: Smoobu calendar history; Airbnb listing change log.
5. **The P20 delivery:** NOT KNOWN (ops). Source: you.
6. **Prior DSO values** before Reyhan's edits are not in the logs (P11 3 Dec about +25%, inferred). Source: Reyhan.
7. **The source and threshold of the P05 extra-guest fee** (7 guests not tested), and the P06 card factor 0.845: NOT CHECKED. Source: Airbnb listing pricing pages.
8. **Market percentiles:** daily series mix bedroom counts; "est. matched" figures are estimates. Source: PriceLabs Market Dashboard with a 2 BR / 4 BR filter.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY before 20 Nov 2025).
10. **Other:**
    - Vrbo +8% / Direct -10% are unconfirmed.
    - Barking recommended base is "Unavailable": ask PriceLabs support.
    - P15-P19 need the second-account keys.
    - 11 central kept comps were not returned (5 for 8 days); 3 P04 comps were not returned on any of 20 stays; P20 789954794593691037 was found by probe only (7th day). Calendars NOT CHECKED.
    - Events are domain-restricted search summaries: www.pdc.tv returned ENOTFOUND again and must be allowed in the session's network settings. Unresolved: darts Round One start (11 / 13 / 14 Dec) and end (3 / 4 Jan); Eng v NZ kick-off 14:10 vs 14:50; ExCeL HOMES UK 24-25 vs 25-26 Nov.

```json
{"scoreboard":{"note":"20 Nov 2026. Last 30 nights = 21 Oct-19 Nov, 14 Smoobu units (kpi_pack portfolio_last30, exact; reproduced by occupancy: 241 - 9 + 7 = 239). Forward and pickup from occupancy.md (live Smoobu GET 07:18:30Z, handback-aware, Smoobu as truth); policy blocks, P01 30 Nov-20 Dec, P06 22 Nov and from 6 Dec, and nights after each handback excluded. Pickup = bookings made 14-20 Nov net of cancellations; the change vs yesterday is 13 Nov leaving (-6 n / -£934.71) and the P20 19-22 Nov stay (+3 n / +£714.55). Airbnb ratios and hidden-layer cost from channel sections 1, 5 and 6 (£4,130.07 confirmed; £4,301.02 incl. the P20 £126.10 and P04 £44.85 estimates). Booking.com from channel section 3 (live NOT CHECKED, AWS WAF). PriceLabs gap from pricelabs H3 (window shift, not fixed). Sync from pricelabs C2. Missed compression from market section 4. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"56.9%"},{"label":"ADR last 30","value":"£169.51"},{"label":"RevPAR last 30","value":"£96.46"},{"label":"Revenue last 30","value":"£40,514.05"},{"label":"Nights last 30","value":"239"},{"label":"Booked next 30","value":"57.2% (135/236)"},{"label":"Booked next 60","value":"46.2% (192/416)"},{"label":"7-day pickup","value":"gross 11 bk / 53 n / £10,011.61; cancelled 2 / 18 n / £3,264.44; net +35 n / +£6,747.17"},{"label":"P12 pace vs STLY","value":"-1.1% (-2 n / -£42.84) to the 13 Dec handback; On track (window effect)"},{"label":"Raised flats net since 18 Oct","value":"+25 n / +£7,329.70 like-for-like (unchanged, fourth day); +34 n / +£9,196.31 incl. P06; P01 0; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21; P04 comparison +47 n / +£5,933.67"},{"label":"Booking.com since markup cut","value":"25 gross, 16 confirmed, 70 n, £11,564.66; 9 cancelled = 37.0% of gross room; 0 bookings since +15% (18 Nov); none for about 80 h"},{"label":"Airbnb displayed / Smoobu","value":"0.850 (P04) / 0.7225 (P20, fit) at lead 0; 0.765 to 28 d; 0.900 at 29-59 d; 1.000 from 60 d; day 22; realised cost £4,130.07 confirmed (£4,301.02 incl. estimates)"},{"label":"Owner net per £100 Smoobu","value":"Airbnb 1.000 £84.50, 0.900 £76.05, 0.850 £71.83, 0.765 £64.64, 0.738 £62.36, P20 sale 0.7225 £61.05; Booking.com model +15% £97.75; direct model £90 (unconfirmed)"},{"label":"PriceLabs-side gap","value":"Four targets £29 next 13 / £905 next 30 (positive-only £1,419); same windows as yesterday £11 / £873; window shift, not discounts removed"},{"label":"PriceLabs vs Smoobu","value":"0 open nights differ by more than £2; availability differs on P20 21 Nov and P06 22 Nov (PriceLabs open, Smoobu closed); 9 listings refresh only in daytime (P09 and P11 Vrbo past 24 h; P14, P13, P05, P20, P04, P06 cross 24 h 07:28-10:56Z today)"},{"label":"P20 delivery-date sale","value":"Airbnb 19-22 Nov £714.55 room = 0.7225 x £989 (fit); est. -£126.10 vs policy last-minute 15%; P25 / -9.2% vs comps (inside the band)"},{"label":"P04 Christmas","value":"20-26 Dec open at £1,216 (-£17, no edit); 20-23, 21-24, 23-27 Dec bookable; 23-26 Dec and 24-26 Dec arrivals blocked by min 4"},{"label":"Unsellable orphans","value":"3: P04 24 Nov (rule, day 6), P06 23 Nov (policy listing, new), P12 20 Nov (tonight)"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£780.30), 21-24 Nov (£613.70), 20-23 Nov (£617.95), 22-25 Nov (£605.20); day 21; arrival today"},{"label":"P13 identical twin nights","value":"59 of 68 (Smoobu to 28 Feb); 138 of 147 next 180; 18 open nights in the PriceLabs window (20-21 Dec, 3-18 Jan)"},{"label":"Missed compression","value":"14 n / £425 (was 13 / £348; +£59.2 method drift); bookable 13 n / £392"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 21), ARRIVAL TODAY: unsynced Barking Airbnb 1455876748739910219 still sells the sold 20-24 Nov at £780.30 (07:22Z; comp-east £781), 21-24 Nov £613.70, 20-23 Nov £617.95, 22-25 Nov £605.20, plus 6-13 Dec £1,290.26, 13-20 Dec £1,282.97, 4-7 Jan £639.20 and 18-20 Dec £481; not offered on Christmas-NYE; block 20 Nov-5 Jan now or unlist, then map to 3562176","gbp":null},
{"id":"t-pl-push-1811","status":"open","prop":"P04 P05 P06 P13 P14 P20 P09","priority":"critical","title":"Third day, now critical: 9 listings refresh only in daytime (last pushes 19 Nov: P09 06:42Z, P14 07:28Z, P13 twins 09:22Z, P05 09:22Z, P20 09:23Z, P04 09:23Z, P06 10:56Z; P13 Vrbo 19 Nov 12:05Z; P11 Vrbo 18 Nov 12:34Z); P20 missed the 19 Nov 21:24 booking (21 Nov still open at £351 in PriceLabs; Smoobu and Airbnb closed; Booking.com NOT CHECKED); Sync Now on P20 first, check the rest after 09:23Z / 10:56Z, ask PriceLabs support; price sync clean (0 open nights differ by more than £2)","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Overtaken on inventory, kept open as 'confirm the delivery moved': Airbnb guest 19-22 Nov (£714.55 room) on the policy delivery block after it was shortened 18 Nov 16:16Z; no double-sell on Smoobu or Airbnb (Booking.com NOT CHECKED - confirm 20-21 Nov closed in the extranet); give the new delivery date and update policy listing_facts.P20.block_20_21_nov; 22-24 Nov min 2 vs policy min 3 to 30 Nov: confirm or revert; price hold (comp-west P100 / +1.8%, n=2; the -7% is withdrawn)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Deadline TODAY: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change","gbp":null},
{"id":"t-p20-guests-1911","status":"open","prop":"P20","priority":"high","title":"Day 2: P20 Airbnb listing still shows 6 guests (personCapacity 6 on 19 and 20 Nov; 4 on 18 Nov) vs policy max 4 (Corentin 24 Oct): confirm or revert; if changed on purpose, record in policy and say whether Booking.com changed too; today's stay is 4 guests","gbp":null},
{"id":"t-bcom-nr-base-1811","status":"open","prop":"P04 (check all)","priority":"critical","title":"Kept open: +15% not evidenced (last screenshot 18 Nov x1.10); live NOT CHECKED (AWS WAF); no Booking.com booking since 16 Nov 22:52 (about 80 h), 0 since +15%; send Standard screenshots for 2 Dec (expected £519 on Smoobu £451) and 20 Dec (P04 20-26 Dec £1,403 vs £1,341 at x1.10) and confirm the derived set-up on every flat","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P13 P05 P06 P04 P12","priority":"critical","title":"Day 22, not fixed: realised cost £4,130.07 confirmed, £4,301.02 incl. estimates (new: P20 19-22 Nov 0.7225 x £989 = £714.55, est. -£126.10 vs last-minute 15%; P04 18-20 Nov 0.850 est. £44.85); remove hidden Smoobu Airbnb layers 0.850 / 0.7225 (lead 0) / 0.765 (1-28 d) / 0.900 (29-59 d), rule sets differ by listing; open the P20 breakdown; open-card gaps (overlapping): P05 5-10 Jan £398.81, P20 14-19 Dec £357.45, P05 4-11 Jan £248.39, P04 20-26 Dec £197.98, P13 14-19 Dec £195.51; P09 excluded","gbp":4130.07},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (now £288/£293/£249 = £830, min 3) are closed; confirm intent; if not, end the block 18 Dec (reopened 18-21 Dec -11.7% vs stored n=7, -4.2% vs band; parity, up to +5% supported); £830 x 0.900 = £747","gbp":747},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"7-8 Dec £970 (484/486) P25 / -15% and 13-14 Dec £1,015 (515/500) P20 / -8% vs kept (gaps narrowed: a comp cut 7-15%); qp +0.116, recommend +21.6%, inside +12% over median (about £680 / £645): DSO 7-8 Dec +3% -> about +25% (about 589/591) and 13-14 Dec +5% -> about +28% (about 626/608); 21 Dec £2,049 / 29 Dec £2,540 at +300% min 1 (1.66x / 2.06x the 4 BR P90): confirm intent or, your call, +300% -> 0% (uncustomized £642 / £959); £577","gbp":577},
{"id":"a-discount-cut","status":"open","prop":"P05 P04 P11 P20","priority":"high","title":"Not done: four targets £29 next 13 / £905 next 30 (P05 8 n £698 -15.0%, P04 17 n £123 -4.3%, P11 15 n £147 -4.0%, P20 -£63 distorted by +100% on 5 Dec); fall is the window shift (same windows £11 / £873), not a fix; all four still Aggressive occupancy + Booking Recency default; P04 20-26 Dec default-customization £215.3/n vs £173.7; set Occupancy, Booking Recency and Last-minute to Custom 0% on P05, P04, P11, P20; P12/P13 excluded; expected £505 / 30 days","gbp":505},
{"id":"a-p04-dec-1611","status":"open","prop":"P04","priority":"high","title":"Not done: 6-16 Dec £1,561, -25% to -32% vs band (P0 vs stored; comps flat), about +20% supported: DSO 6-16 Dec -5% -> +14%; 17-19 Dec 144/149/153 (19 Dec cut 175 -> 153 overnight), -24% vs band, about +15%: split DSO 17-19 Dec -5% -> about +9%; hold 20-22 Dec; re-read if a-discount-cut is done on P04; +4% on 6-16 Dec instead if base goes back to 220; £177","gbp":177},
{"id":"a-p13-record","status":"open","prop":"P13 P11 P05 P04 P20 P14","priority":"high","title":"Still unreverted: confirm or revert Reyhan's 18 Nov edits: P13 1 Dec +50% -> +25% (policy; £229 / £161); P11 darts 14-18 Dec -2% (14-17 Dec avg £230.00 vs >£300; revert to +5%; comps £279-309); P05 29 Nov-2 Dec -2% (£1,967) and P11 3-4 Dec -2% (230/277; about £270 supported) against 'cut PriceLabs discounts'; P20 5 / 26 Dec +100% min 1 (£528 / £571; about £382 supported on 26 Dec, n=1); P20 22-24 Nov min 2 vs policy 3; P04 18-19 Nov min 2 expired (sold; record); carried: P05 Jan/Feb -5%, P04 base 200 vs 220, P04 6-22 Dec -5%, P14 min 450, P05 max 3500, P20 base 330 vs 350; £84","gbp":84},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Changed shape: the engine cut 3090701 about 7% on 13-19 Dec (204/200/198/202/208/221/226; P0 / -13.4% and -10.6% vs comps), so 3064856 is now 17-18% dearer there; 20-21 Dec and 3-18 Jan still identical (18 open nights; Airbnb £203.00 / £200.00 on both); 138 of 147 next 180, 59 of 68 to 28 Feb; DSO 3090701 +12% on 13-17 Dec and +5% on 18-19 Dec (£77), 3064856 -3% on 20-21 Dec (your call), 3090701 +3% on 3-18 Jan; Corentin to confirm","gbp":77},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Not fixed: synced Barking Airbnb weekly 18.0% vs policy 15% (cost £39.39 on the 27 Dec-4 Jan sale; open 6-13 Dec -£162.80, 13-20 Dec -£162.33); Long stay 10% on 5-6 nights (-£93.78 on 20-26 Dec), not in policy: keep and record, or 0%","gbp":39.39},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Further away: P11 23-25 Dec £282/£256/£268 (£806), P43 / -14% kept (n=7), -2% wider, supported £275-319; recommend +5%: DSO +5% -> about +10% (about 296/269/281); 3 Jan £172 -> about £181 (-13% kept, -1% wider); market soft (Δ -3.3 to -10.3); £16","gbp":16},
{"id":"t-p04-xmas-1711","status":"open","prop":"P04","priority":"high","title":"20-26 Dec £1,216 (168/171/168/177/181/177/174; -£17, no edit); live: 20-23, 21-24 and 23-27 Dec bookable, only 23-26 Dec and 24-26 Dec arrivals blocked by min 4 next to the 27 Dec booking; hold 20-22 Dec (-8.7% / -5.9% vs band, in range), 23-26 Dec DSO -5% -> 0% (about +5%; 23-27 Dec -14.4%); min 4 -> 3 on 23-26 Dec (policy floor) for Corentin; about £89 under matched P50; £13","gbp":13},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): on 19 Nov the long block moved to start 6 Dec (11:55:35), opening 29 Nov-5 Dec, 7 n, £2,624 at min 3; a new 1-night block on 22 Nov (21:26) leaves 23 Nov as an orphan (£255, min 2); Reyhan set a min-3 DSO 24 Nov-5 Dec (10:55:50Z); 24-29 Nov sold; if intended note it in policy, if not restore the 30 Nov start and/or remove the 22 Nov block; numbers only","gbp":null},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"medium","title":"Not done; 19-20 Nov part lapsed (20 Nov orphan tonight); 30 Nov-3 Dec moved up again with no edit (268/282/285/297): +10.4% vs band, 1-3 Dec +17.7%, 2-4 Dec +18.7%, PriceLabs NL P82, qp -0.15 (ceiling 0%); your call (lowers a price): DSO 0% -> about -12% (about 235/250/250/260); pace -1.1% On track","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed (day 3): Mile End 26 Nov £311 (£363 all-in, P100 +27.8% vs band n=5; above PriceLabs NL P90); DSO +15% -> about -17% (about £224; supported £207-243), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Worse: 8 Dec min 1 (sellable) but £311 (was £292; list all-in £506.65, P100 / +55% kept, +41% wider); comps support about £154-183 Smoobu room on a 1-night stay; your call (lowers a price): keep min 1, DSO +50% -> about -18% (about £170); not quantified","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Still live: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£188.91 on 5-10 Jan, -£200.20 on 18-23 Jan); weekly 15% matches policy; not in policy: keep and record, or set to 0%","gbp":188.91},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking applied on the Valentine's stay (£195.24); not in policy - yours, or 0%?","gbp":195.24},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Still live: visible Airbnb 'Long stay discount' 10.0% on 5+ nights on both twins (14-19 Dec 3090701 -£92.61; 3-8 Jan -£76.59 each); 3064856 not offered for 14-19 Dec (reason NOT CHECKED); not in the 21 Oct rule set or policy: keep and record, or set LOS 5+ to 0%","gbp":92.61},
{"id":"a-extra-guest","status":"open","prop":"P05 P11 P13 P04","priority":"medium","title":"Confirmed: P05 Airbnb adds £20/night at 8 guests (5-10 Jan £1,989.10 at 8 vs £1,889.10 at 6) and £0 at 6; not set in Smoobu or PriceLabs (extra_person_fee 0); is it your Airbnb extra-guest fee and from which guest count (7 not tested)? Record it; then decide the extra-guest fee above 4 guests on the other flats","gbp":null},
{"id":"t-airbnb-flex15-1611","status":"open","prop":"P06 P20 P05","priority":"high","title":"No booking on the test flats except P20 19-22 Nov (0.7225, breakdown not seen); P06 card not returned today, so the 0.845 cause is still NOT CHECKED; open the reservation price breakdowns (P20 19-22 Nov and NYE, P06 24-29 Nov, P05 Feb) and check what the Flexible test turned on; comparison 13 days overdue; £530.11 identified (included in a-airbnb-rules)","gbp":530.11},
{"id":"t-bcom-minstay-1811","status":"open","prop":"P04 (check all)","priority":"high","title":"Kept open, not verified (AWS WAF; no Booking.com booking since 16 Nov 22:52, about 80 h): confirm the Non-refundable (3), Weekly (7), Monthly (28) and NR Weekly (7) minimum stays are enforced now that these plans derive from Standard (24 Oct precedent: a 4-night stay priced on the Monthly plan)","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"high","title":"Unchanged: 9 of 25 post-cut Booking.com bookings cancelled (37.0% of gross room, £6,796.87); confirmed 16 / 70 n / £11,564.66; 0.94 gross / 0.60 confirmed a day, falling; 0 since +15%, none for about 80 h; plus the pre-cut P04 Christmas-NYE stay (£2,417.34); send rate plans and reasons","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P13 P12","priority":"medium","title":"Unchanged: send the extranet breakdown of the P13 Booking.com 22-27 Dec stay on 3064856 (£840.75 room = 0.6926 of list, a fit) and of P12 7-14 Dec; no promotion change proposed","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; 18% booster; nets £62.47 per £100); per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Still 5.0 (1), 'New' in search, so comp-west keeps the 1-review line (median x 0.85); the 19-22 Nov sale sat at P25 / -9.2% vs comps, +6.8% over the line; 14-19 Dec hold; remaining: parking first photo, review requests after the November, December and NYE stays (target 3 reviews by 31 Dec); Flexible-test comparison 13 days overdue; listing shows 6 guests (t-p20-guests-1911)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback -1.1% (-2 n / -£42.84), On track (window effect: only STLY moved); base +38.5% vs P50 £205; 6 open nights left (20 Nov tonight, 26 Nov, 30 Nov-3 Dec); correct them via a-p12-trim and t-p12-26nov-price, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov now £270 / £189 (Reyhan +25% min 1) on Finals Weekend Friday: market P50 238 / P75 295, Δ +7.3 (was +13.5), £32.8 above the fortnight 237.2 and £25 under P75; 1 Dec is a policy conflict (a-p13-record); priced, hold; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps; no Free cancellation pill on ours (4 P13 and 2 P20 comps show it)","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced on the 14-18 Nov stay; now checked under t-bcom-minstay-1811; ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Hygiene (pricelabs M4): id_map _unmatched (Marylebone Vrbo x3) and 7 pricelabs_other ids no longer in PriceLabs - remove?; P02 Vrbo copy not pushed since 24 Feb, P11/P13 Vrbo copies now last_refreshed_at null; info pack out of date (every max, most bases, P14 min); P20 not in the pack (330 vs policy 350); Barking recommended base 'Unavailable'; Vrbo +8% / Direct -10% unconfirmed; kpi_pack gaps [] misses P04 24 Nov, P06 23 Nov, P12 20 Nov; new: prices.csv 'available' comes from PriceLabs not Smoobu, so Smoobu-only closures (P20 21 Nov, P06 22 Nov) are invisible to the pack; record in policy: Reyhan's 15, 18 and 19 Nov edits and outcomes, P06 block changes, P20 delivery date and guest count, P04 2-night cleaning £129 and the synced P04 Airbnb listing","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No comp replaced; 11 central kept ids not returned (P06 917140285217729256 / 1452940332365117153, P14 x2, P17 975294297333089697 for 8 days; plus P06 x3, P17 x1, P11 1515051936255130803, P05 912053248917940403); P04 985683261536682900, 1733027244747346716, 1387112821878102742 not returned on any of 20 stays; P20 789954794593691037 only on probes (7th day); calendars NOT CHECKED; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026, never refreshed; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown (also relevant to t-airbnb-flex15-1611)","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (22-27 Dec Booking.com stay is the standard 15.0% of room + cleaning)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still sells the sold 20-24 Nov at £780.30 on arrival day (also 21-24 Nov £613.70, 20-23 Nov £617.95, 22-25 Nov £605.20), day 21; not offered on Christmas-NYE","evidence":"channel section 2 (live Airbnb 07:22:07-07:22:20Z); comp-east (£781 at 07:20:11Z)."},
{"agent":"pricelabs","severity":"critical","ref":"P20 P04 P05 P06 P13 P14 P09","title":"Third day of daytime-only refreshes on 9 listings (last pushes 19 Nov 06:42-10:56Z); P20 missed the 19 Nov 21:24 booking, so PriceLabs still shows 21 Nov open at £351 and prices 22-24 Nov without the stay; price sync clean (0 open nights differ by more than £2)","evidence":"pricelabs C1-C2 (listing_data last_date_pushed; live get_listing_prices P20/P04/P14; Smoobu rates 07:19:07Z)."},
{"agent":"occupancy","severity":"critical","ref":"P20","title":"New Airbnb stay 19-22 Nov (£714.55 room, lead 0) covers the policy delivery block shortened on 18 Nov 16:16:46Z; Smoobu closes 20-21 Nov; whether the delivery still happens NOT CHECKED (for Corentin)","evidence":"occupancy (live Smoobu reservations and rates 07:18:30Z)."},
{"agent":"channel","severity":"high","ref":"P20","title":"P20 sale = 0.7225 x £989 (fit, to the penny), est. -£126.10 vs policy last-minute 15%; no double-sell on Smoobu or Airbnb (Booking.com NOT CHECKED); listing still shows 6 guests vs policy 4","evidence":"channel section 1 (Smoobu price-elements; get_pms_reservations; Airbnb 07:20:45-07:25:05Z)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"The 19-22 Nov sale sat at P25 / -9.2% vs kept comps (+6.8% over the 1-review line): inside the supported band; 22-24 Nov now hold (7-day lead +9 pts); 26 Dec +100% (£571) about -33% to £382 supported (n=1); 5 Dec no comp","evidence":"comp-west P20 section (12 comps x 12 stays, 07:20-07:30Z)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 20-26 Dec £1,216: 20-23, 21-24 and 23-27 Dec are bookable; only 23-26 Dec and 24-26 Dec arrivals blocked by min 4 (min 3 fixes it); hold 20-22, about +5% on 23-26; 6-16 Dec -25% to -32% vs band (+20%), 17-19 Dec -24% (+15%; 19 Dec cut 175 -> 153)","evidence":"comp-east Priority 1 (quality_premium -0.15; live bookability checks 07:19-07:25Z)."},
{"agent":"market","severity":"high","ref":"P04 P05 P13","title":"P04 6-19 Dec £220 under the mixed P50 and 20-26 Dec about £89 under the matched P50; P05 7-8 / 13-14 Dec £164 / £119 under the 4 BR median (13 Dec Δ +13.5); P13 19-21 Dec £17 under P50 on Δ +11 to +15","evidence":"market sections 2 and 4 (get_neighbourhood_data 07:18-07:21Z)."},
{"agent":"pricelabs","severity":"high","ref":"P13 P11 P05 P20","title":"Reyhan's 18 Nov edits all still live: P13 1 Dec +25% vs policy +50% (£229); P11 darts -2% (avg £230.00); P05 29 Nov-2 Dec and P11 3-4 Dec -2%; P20 5 / 26 Dec +100% (£528 / £571)","evidence":"pricelabs H1-H2 (live overrides, updated_at 18 Nov 12:14-12:18Z)."},
{"agent":"occupancy","severity":"high","ref":"P06","title":"P06 long block moved to start 6 Dec (19 Nov 11:55:35), opening 29 Nov-5 Dec at £2,624, min 3; new 22 Nov block leaves 23 Nov as an orphan; Reyhan min-3 DSO 24 Nov-5 Dec; fwd30 46.7% (7/15) vs 52%","evidence":"occupancy; pricelabs (get_user_logs 19 Nov 10:55:50Z)."},
{"agent":"comp-west","severity":"high","ref":"P13","title":"The engine cut 3090701 about 7% on 13-19 Dec (P0 / -13.4% and -10.6% vs comps; comps flat): +12% on 13-17 Dec and +5% on 18-19 Dec supported; twins still identical on 20-21 Dec and 3-18 Jan (18 nights): -3% on 3064856 20-21 Dec, +3% on 3090701 3-18 Jan","evidence":"comp-west P13 section; pricelabs H5 (138 of 147); channel section 4 (59 of 68)."},
{"agent":"comp-central","severity":"high","ref":"P05 P11","title":"P05 7-9 / 13-15 Dec P25 / -15% and P20 / -8% vs kept (narrowed by a comp cutting 7-15%), recommend +21.6%; P11 darts P0 / -19% kept (£279-309 supported), 8 Dec P100 / +55% (rose to £311), 23-25 Dec -14% kept, 2-4 Dec -9% wider","evidence":"comp-central P05 and P11 tables (45 Airbnb searches 07:19-07:24Z)."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"Every open P12 stay is above the band (+4% to +28%, qp -0.15): 26 Nov £311 P100 +27.8% (about £205-240 supported); 30 Nov-3 Dec moved up again with no edit, +10.4% (about -12%)","evidence":"comp-east Priority 2; pricelabs H5."},
{"agent":"channel","severity":"high","ref":"Portfolio","title":"Booking.com: +15% still not evidenced; live NOT CHECKED (AWS WAF); no booking since 16 Nov 22:52 (about 80 h), 0 since +15%; 25 gross / 16 confirmed / 37.0% cancelled; 0.94 gross / 0.60 confirmed a day","evidence":"channel section 3 (reservations.csv; WAF challenge 07:25:06Z)."},
{"agent":"channel","severity":"critical","ref":"Portfolio","title":"Airbnb hidden layers day 22: £4,130.07 confirmed, £4,301.02 incl. estimates; tier pattern differs by listing (P13 18-21 Dec 0.765 / 0.900 to the penny; 3090701 14-19 Dec uniform 0.900; P20 14-19 Dec uniform 0.765)","evidence":"channel sections 1, 5 and 6 (22 live Airbnb searches 07:20-07:24Z)."},
{"agent":"pricelabs","severity":"medium","ref":"P05 P04 P11 P20","title":"a-discount-cut not done: £29 next 13 / £905 next 30 (same windows as yesterday £11 / £873); the fall is the window and refreshes, not discounts removed; all four still Aggressive occupancy + Booking Recency default","evidence":"pricelabs H3 (disc20.py; live customizations)."},
{"agent":"market","severity":"medium","ref":"P11 P04 P20","title":"Missed compression 14 n / £425 (+£77: P20 17 Dec joined £12.8, our prices £5.0, method drift £59.2); £234 is P11 darts Round One under Reyhan's -2%","evidence":"market section 4 (analyse20.py, cmp.py)."},
{"agent":"occupancy","severity":"medium","ref":"Portfolio","title":"Last 30 56.9% / ADR £169.51 / RevPAR £96.46 / £40,514.05 / 239 n; next 30 57.2% (135/236), next 60 46.2% (192/416); net pickup +35 n / +£6,747.17; P12 pace -1.1% On track","evidence":"occupancy (kpi_pack portfolio_last30; live Smoobu 07:18:30Z; pick_rise.py)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12 P04","title":"18 Oct base rises unchanged a fourth day: +25 n / +£7,329.70 like-for-like, +34 / +£9,196.31 incl. P06; no raised-unit booking or cancellation since 13 Nov 22:20; P04 comparison +47 n / +£5,933.67","evidence":"occupancy base-rise section (full recompute from the 20 Nov pull)."},
{"agent":"comp-east","severity":"high","ref":"P01","title":"P01 18-20 Dec still blocked (288/293/249 = £830); if reopened 18-21 Dec -11.7% vs stored (n=7), -4.2% vs band; parity supported","evidence":"comp-east Priority 3."},
{"agent":"channel","severity":"medium","ref":"P05 P13 P04","title":"Long stay 10% on 5-6 n live on P05 (-£188.91 / -£200.20), P13 (-£92.61 / -£76.59 x2) and P04 (-£93.78); P04 weekly 18% (-£162.80 / -£162.33); P05 extra-guest fee £20/night at 8 guests, £0 at 6","evidence":"channel sections 4 and 7."}
],
"top5":[
"Barking 1455 still sells the sold 20-24 Nov at £780.30 (plus 21-24, 20-23 and 22-25 Nov) at 07:22Z, and the guest arrives today (day 21): block 20 Nov-5 Jan on 1455 now or unlist it, then map it to Smoobu 3562176.",
"PriceLabs refresh gap, third day, now critical: 9 listings refresh only in daytime (P04, P05, P06, P13, P14, P20, P09, two Vrbo copies); the P20 19-22 Nov stay is not in PriceLabs, so 21 Nov shows open at £351 and 22-24 Nov is priced without it (Smoobu and Airbnb closed; Booking.com NOT CHECKED). Sync Now on P20 first, check the rest after 09:23Z / 10:56Z, ask PriceLabs support.",
"P20 sold the delivery dates: Airbnb 19-22 Nov £714.55 room (0.7225x Smoobu, est. -£126.10 vs policy, but P25 / -9.2% vs comps, inside the band). Confirm the delivery moved and record it; listing still shows 6 guests (policy 4); 22-24 Nov min 2 vs policy 3 (price: hold); 5 / 26 Dec +100% (£528 / £571; about £382 supported on 26 Dec).",
"Confirm or revert: P06's block moved to 6 Dec (29 Nov-5 Dec, £2,624, opened), a new 22 Nov block leaves a 23 Nov orphan, and Reyhan set min 3 on 24 Nov-5 Dec; Reyhan's 18 Nov conflicts are still live - P13 1 Dec +25% (policy +50%), P11 darts -2% (14-17 Dec avg £230 vs >£300), P05 29 Nov-2 Dec and P11 3-4 Dec -2%.",
"Where the money is: Airbnb hidden layers £4,130.07 confirmed (£4,301.02 incl. estimates, day 22); a-discount-cut £905 next 30 (£505 expected); P04 6-16 Dec +20% / 17-19 Dec +15% and 20-26 Dec £1,216 (hold 20-22, +5% 23-26, min 3); P05 7-8 / 13-14 Dec +21.6% (£577 with 21 Dec); P13 3090701 +12% on 13-17 Dec; P01 18-20 Dec block holds £830; Booking.com no booking for about 80 h, +15% not evidenced."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked at £288/£293/£249 (£830); if reopened 18-21 Dec -11.7% vs stored (n=7), -4.2% vs band, parity supported (£747); 100% of 10 non-blocked nights booked; base-rise 0."},
{"ref":"P02","change":"Intentional block; pushed 20 Nov 00:23Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 20 Nov 03:26Z via Channex."},
{"ref":"P04","change":"1455 still sells the sold 20-24 Nov (£780.30) on arrival day (day 21); 20-26 Dec £1,233 -> £1,216 (no edit), 20-23 / 21-24 / 23-27 Dec bookable, 23-26 Dec and 24-26 Dec arrivals blocked by min 4; 6-16 Dec £1,561 (-25% to -32% vs band, +20% supported); 19 Dec 175 -> 153 (+15% on 17-19 Dec); 24 Nov orphan day 6; fwd30 46.7% vs 23%, fwd60 36.7% vs 19%; no refresh since 19 Nov 09:23Z."},
{"ref":"P05","change":"No booking; 7-8 Dec £970 (P25 / -15%) and 13-14 Dec £1,015 (P20 / -8%), narrowed by a comp's cut; recommend +21.6%; 29 Nov-2 Dec £1,967 (Reyhan -2%); 21 / 29 Dec £2,049 / £2,540 at +300% min 1; extra-guest fee confirmed £20/night at 8 guests (source NOT CHECKED); fwd30 73.3% vs 47%."},
{"ref":"P06","change":"Block moved to start 6 Dec (19 Nov 11:55Z): 29 Nov-5 Dec open, £2,624, min 3; new 22 Nov block leaves 23 Nov orphan (£255); Reyhan min-3 DSO 24 Nov-5 Dec; fwd30 46.7% (7/15) vs 52%, now Soft (denominator); numbers only (policy); for Corentin to confirm."},
{"ref":"P07","change":"Intentional block; pushed 20 Nov 04:11Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; last push 19 Nov 06:42Z (past 24 h, no impact); base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Handed back (last night 18 Nov); out of every window."},
{"ref":"P11","change":"No booking; refreshed overnight (00:30Z); 22-27 Nov £204.60 avg (+5.4%, hold); 4 Dec 329 -> 277; 8 Dec £311 (+55% vs kept); darts 14-17 Dec avg £230.00 (-19% vs kept; Reyhan -2% conflict); 23-25 Dec £282/£256/£268 (-14% kept, +5% recommend); 3 Jan £172; fwd30 50.0% vs 51% (Soft)."},
{"ref":"P12","change":"20 Nov 294 (orphan, lapses tonight); 26 Nov £311 (P100 +27.8% vs band); 30 Nov-3 Dec 268/282/285/297 (up again, no edit; about -12% supported); pace -1.1% On track (window effect); base-rise +11 / +£1,660.21."},
{"ref":"P13","change":"Engine cut 3090701 about 7% on 13-19 Dec (now P0 vs comps; +12% / +5% supported); 3064856 19 Dec 243 -> 266; twins still identical on 20-21 Dec and 3-18 Jan (18 nights); 27 Nov £270 (Finals Weekend, Δ +7.3); 1 Dec £229 (+25% vs policy +50%); fwd30 70.0% vs 47%."},
{"ref":"P14","change":"Numbers only: 76 of 180 open nights at £450 (18 Dec joined); P100 / +49% to +130% vs kept; 0% vs 47%; last push 19 Nov 07:28Z (crosses 24 h today)."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only (145-160.50)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only (kept median 4.68)."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"New Airbnb stay 19-22 Nov £714.55 on the delivery dates (0.7225x, est. -£126.10 vs policy; P25 / -9.2% vs comps); not in PriceLabs (refresh 19 Nov 09:23Z; 21 Nov shown open at £351); no double-sell on Smoobu/Airbnb (Booking.com NOT CHECKED); Airbnb still shows 6 guests; 22-24 Nov £849 min 2, hold; 5 / 26 Dec £528 / £571; 14-19 Dec hold; fwd30 70.0% vs 38%; recommended base 354 -> 351."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 10 non-blocked nights booked to the 20 Dec handback; base -5.6% vs P50 £268; 18-20 Dec is a block question (occupancy; comp-east; market section 1)."},
{"ref":"P04","base":"200, was 220 (rec Unavailable)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended (not additive with a-p04-dec-1611); ask PriceLabs why the recommendation is missing","reason":"6-19 Dec -24% to -32% vs band; 20-26 Dec default-customization price £215.3/n vs £173.7; 46.7% vs 23% next 30, 36.7% vs 19% next 60; base +14.9% vs 2 BR P50 £174, -7.0% vs P75 £215 (comp-east; occupancy; market section 1)."},
{"ref":"P05","base":"550 (rec 538)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 47%; 7-8 / 13-14 Dec -15% / -8% vs kept; qp +0.116; recommend +21.6%; base -3.0% vs 4 BR P50 £567 (comp-central; market section 1)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 7 of 15 non-blocked nights booked (46.7%) vs 52% after the 19 Nov block changes; base -13.8% vs P50 £414 (occupancy; market section 1)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 280)","recommendation":"Hold 286","reason":"50.0% vs 51% (Soft); 22-27 Nov +21% to +37% over kept on list while December is -9% to -20%; base -2.4% vs P50 £293; levers are date overrides (darts, 2-4 Dec, 23-25 Dec, 3 Jan) and a-discount-cut (comp-central; occupancy; market section 1)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim, t-p12-26nov-price), not the base","reason":"75.0% to handback vs 44%; pace -1.1% (On track, window effect); every open stay +4% to +28% vs band with qp -0.15; base +38.5% vs P50 £205; 6 open nights before the 13 Dec handback (comp-east; occupancy; market section 1)."},
{"ref":"P13","base":"250 (rec 241)","recommendation":"Keep 250 and record it in policy","reason":"70.0% vs 47% next 30, 55.0% vs 37% next 60; base +12.6% vs P50 £222; December at or near the 2 BR median (comp-west; occupancy; market section 1)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 47%; P100 / +49% to +130% vs kept at £450; 76 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"70.0% vs 38% (30 d), 56.7% vs 30% (60 d); 5.0 (1), still priced on the 1-review line; base +28.4% vs P50 £257; 19-22 Nov sold inside the band, 14-19 Dec hold (occupancy; comp-west; market section 1)."}
]}
```

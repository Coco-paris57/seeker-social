# Seeker Estates - Daily revenue report, 2026-11-19 (Thursday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval. Where a PriceLabs refresh is needed, you or Reyhan press Sync Now; Claude does not.**

**Inputs**
- `reports/2026-11-19/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-19/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-18/daily-report.md` and its JSON, the dashboard action list (19 Nov, before this step), the full id list, the overnight brief, and `data/policy.json` (read first).
- **Yesterday's snapshot `data/snapshots/2026-11-18/` is available today**, so the day-on-day comparisons below are file diffs (reservations, prices), not report-to-report.
- kpi_pack was built before the agents appended today's `market.csv`, `comps.csv` and `channel_checks.csv`, so its `missing` block lists all three as empty and ARI / RGI / price percentiles are null. The sections use the appended rows.
- `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (19 Nov); **base, min and max are unchanged on every listing** (pricelabs).
- **Reyhan made 18 PriceLabs DSO edits on 18 Nov 12:13:55-12:18:46Z** (`get_user_logs`, pricelabs / occupancy / market / comp-central / comp-west). They came after yesterday's agents ran (about 07:20Z), which is why yesterday's report said "0 edits since 15 Nov". Group and account logs: 0.
- I used no guest data and no booking or reservation reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.
- **Process note (once):** the market agent ran 7 `get_neighbourhood_data` reads in one parallel batch and the pricelabs agent ran 3 `get_customizations` reads in parallel, against the one-call-at-a-time rule. All were read-only and every file was validated (listing_id, 540 days, all ops OK); all later calls were sequential.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 22-29 Nov opening is still your question (t-p06-2229open); P06 is numbers only.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701). The twins must keep slightly different prices, never identical.
- **P04 "never open for fewer than 3 nights" is respected.** No min-1 or min-2 proposal on P04. The 23-26 Dec question asks about min 3, the policy floor.
- Not raised again: the Booking.com +15% markup (`booking_markup` 0.15) and the derived rate plans (`booking_rate_plans`), Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests (the 6-guest display is a confirm-or-revert, not a proposal).
- Nights after each handback are not inventory: P08 and **P10 are now fully out** (P10's last night was 18 Nov), P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price, t-p11-8dec-orphan, P20 22-24 Nov, P13 3064856 19-21 Dec (twin fix) and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **P04 next 30: 50.0% (15/30, occupancy, Smoobu)**, not kpi_pack `forward_occ_30` 48.3%. **P20 next 30: 60.0% (18/30)**, not 62.1%: 19 Nov is no longer blocked, so the denominator rose. I use occupancy (Smoobu is the truth).
2. **Which Airbnb listing sold P04 27 Dec-4 Jan.** Smoobu does not expose the Airbnb listing id. pricelabs, channel and occupancy all reconcile the room to the penny as **£1,459 x 0.900 x 0.82 = £1,076.74**, the synced 1657859794156786222 pattern; the unsynced 1455 takes no Smoobu price and was not offered on any Christmas-NYE stay. **Synced listing: inferred, not verified.**
3. **What the occupancy cut cost on that sale (all estimates; they assume the same guest books at the higher price).** occupancy: -£160.88 (6 nights 27 Dec-1 Jan at 17 Nov prices, x 0.738). market: about -£157 (8 nights, 2-3 Jan unchanged). pricelabs: -£202.95 (8 nights at the pre-cut `user_price` £1,734). **I report the range £157-£203.**
4. **P04 20-26 Dec yesterday:** £1,157 (pricelabs, occupancy, 18 Nov file) vs £1,164 (brief, comp-east). I use **£1,157 -> £1,233 (+6.6%)**.
5. **P04 1455 20-24 Nov:** channel £780.30 vs comp-east £781 (rounded). I use £780.30.
6. **The 0.809 on yesterday's P04 2-night card is resolved** (channel §1): 2-night stays carry £129 cleaning, not £142, and the room is 0.850 x Smoobu at lead 0. No longer an unknown.
7. **P13 identical twin nights.** pricelabs: **138 of 146** jointly open nights identical over the next 180 (Smoobu). channel: **60 of 68** to 28 Feb. comp-west: **19 identical open nights inside the PriceLabs window** (19-21 Dec and 3-18 Jan). Different windows, same direction; all three got worse at the 18 Nov 12:15Z refresh.
8. **P06 22-23 Nov is now at the comp median** (comp-central P50 / -1%, n = 2), but because **our Airbnb card rose** (£518 -> £556 for 22-24 Nov, implied factor 0.766 -> 0.845) with Smoobu flat. The yesterday +18% proposal is withdrawn: hold. The factor jump goes to t-airbnb-flex15-1611 (P06 is a Flexible-test flat).
9. **P20 delivery block.** occupancy: the Smoobu block was shortened from 18-20 Nov to 18-19 Nov (end exclusive, so it covers 18 Nov only), `modifiedAt` 18 Nov 16:16:46. pricelabs / channel: 20-21 Nov open at £334 / £282 (min 3), 22 Nov £292 (min 2). Consistent: **19-24 Nov are all open.** Who shortened it is NOT CHECKED.
10. **P11 23-25 Dec target.** channel quotes yesterday's targets (about £320/£295/£305). comp-central today supports **£298-308 room average** (+9% to +13%). I size from comp-central (the positioning rules): average about £300.
11. **P11 8 Dec supported room.** Yesterday about £95-169; comp-central today **£154-184**. I use today's figure.
12. **P20 26 Dec override sizing.** comp-west says about +40% instead of +100%; on today's price (569 at +100% = about 284.5 before the DSO) the £382 target is about **+34%**. Same target price (£382 = PriceLabs `uncustomized_price`); I quote the price, not the percentage.
13. **a-discount-cut metric is distorted today** (pricelabs H3): the next-13 / next-30 fall (£335 -> £141; £1,441 -> £1,069) is the window shift and Reyhan's P20 +100% on 5 Dec, **not discounts removed**. P20's net next 30 is -£53 for the same reason.
14. **Rate leak (kpi_pack) is overstated by VAT** (channel §6). Corrected: P04 -4.4%, P11 -28.0%, P12 -26.9%, P13 -36.8% (pack -17.0% / -40.0% / -39.1% / -42.4%).

## Executive summary

1. **P04 Barking NYE week sold at the bottom of the market, the day after PriceLabs cut it.**
   - Airbnb 27 Dec-4 Jan, 8 n, **£1,076.74 room (£134.59/n)**, booked 18 Nov 09:27, 39 days out. It equals the 18 Nov PriceLabs price **£1,459 x 0.900 x 0.82** to the penny (synced listing, inferred).
   - **£163.41 under policy** (weekly 15% alone = £1,240.15): the 0.900 hidden tier £124.02 + 3 extra weekly points £39.39 (channel).
   - **P0 vs comps: -31% vs the band (n = 2)**, supported room £1,363-1,628, **shortfall £286-552 (estimate)** (comp-east). **£289 under the market P50** (1-3 BR, booking-day pull; market). -27.6% per night vs the cancelled Booking.com stay.
   - **The occupancy cut cost about £157-£203 on this stay** (estimates, correction 3).
   - **Lesson:** the Aggressive occupancy profile sold the NYE week at the market floor while occupancy was above last year on every night (+1.7 to +17.9). This strengthens a-discount-cut.
   - **Left: 20-26 Dec, 7 n, £1,233**, repriced +6.6% by the engine as the 31-60 d band moved -15% -> -10% (8 of 30 nights now booked). Comps: **hold 20-22 Dec, 0 to +5% on 23-26 Dec**. **Min 4 on 23-26 Dec next to the 27 Dec arrival makes 24-26 Dec arrivals unsellable; min 3 (policy floor) fixes it** (your call).
2. **Two Friday (20 Nov) arrivals at risk, tomorrow.**
   - **t-p04-doublebook, day 20:** 1455 still sells the sold 20-24 Nov at **£780.30** (18 Nov £741.40), plus 21-24 Nov £613.70 and 20-23 Nov £617.95 (channel §2).
   - **t-p20-delivery:** the Smoobu block was shortened to 18 Nov only (18 Nov 16:16Z), so **19-24 Nov are open** and Airbnb sells **20-23 Nov at £694.62 room** (channel §4). Confirm or revert.
   - **New: the P20 Airbnb listing now shows 6 guests** (policy max 4; it showed 4 on 18 Nov 07:21Z; comp-west). Confirm or revert.
3. **Reyhan's 18 Nov edits (18 DSOs): five cross your decisions.**
   - **P13 1 Dec +50% -> +25%** (policy `intentional_overrides`): £278 -> £232 (3090701 £194 -> £163).
   - **P11 darts 14-18 Dec -2%**: 14-17 Dec average **£229.00** (was £236.75) vs your >£300.
   - **P04 18-19 Nov min 2** (never-under-3 rule): it **sold** (£254.15 room). Record or restate the rule.
   - **P05 29 Nov-2 Dec -2%** (-£24) and **P11 3-4 Dec -2%** (3 Dec 273 -> 214): against "cut PriceLabs discounts".
   - **P20 5 / 26 Dec +100% min 1**: the orphans are now sellable, but at **£531 / £569** (planned £265 / £272). comp-west supports about **£382 on 26 Dec** (= uncustomized); 5 Dec has no comp (step down toward P75-P90 £296-424 if unsold by about 28 Nov).
4. **PriceLabs refresh gap.** 7 Smoobu listings had no overnight refresh on 18 or 19 Nov: **P14 is past 24 h** (18 Nov 07:19Z); P06 crosses at 08:29Z, P13 twins / P11 12:15Z, P05 12:17Z, P04 / P20 12:20Z (pricelabs C2). Sync itself is clean (0 open nights differ by more than £2). t-pl-push-1811 recurs.
5. **Booking.com: +15% not evidenced; no Booking.com booking for about 56 h.**
   - 18 Nov screenshots: Standard still x1.10 (2 Dec £471 = ceil(£428 x 1.10); +15% = £493). Derived plans were correct on those screenshots. Plan minimum stays (3/7/28/7): **not verified**. Live Booking.com: NOT CHECKED (AWS WAF, not bypassed).
   - 25 gross / **16 confirmed** / 70 n / £11,564.66 since 24 Oct; 9 cancelled = **37.0%** of gross room; 0 bookings since +15% (channel §3).
6. **Engine moves with no edit.**
   - **P12: the engine undid a-p12-trim (+6-7%).** 26 Nov **£310** vs about £205-240 supported; 19-20 Nov about -15%; 30 Nov-3 Dec about -10% (comp-east).
   - **P13 twins identical again** (138/146; 60/68; 19 open nights incl. 19-21 Dec and Jan).
   - P04 6-16 Dec still **-25% to -32%** vs the band: +20%; 17-18 Dec +10%. P05 7-8 / 13-14 Dec **-19% / -18%** vs kept (+12% over the median supported). P11 darts -21%, 8 Dec +48%.
7. **Discount layers.** Airbnb hidden layer **£4,130.07 confirmed** (day 21; +£163.41 today). PriceLabs-side gap on the four targets **£141 next 13 / £1,069 next 30**. Missed compression **13 n / £348**.

**Last 30 nights (20 Oct-18 Nov, 14 units with Smoobu history):** occupancy **57.4%**, ADR **£168.66**, RevPAR **£96.78**, revenue **£40,646.92**, **241 nights** (kpi_pack `portfolio_last30`, exact; reproduced by occupancy).
- **P04 enters last-30 for the first time** (20 n, £2,398.11; its Smoobu history starts 20 Oct). Its figure mixes bases (import-batch stays have no basePrice).
- **Like-for-like with yesterday (same 13 units): 221 n / 56.7%** / £38,248.81 / ADR £173.07 / RevPAR £98.07. Yesterday 224 n / 57.4% / £172.50 / £99.08. Reconciliation: 19 Oct leaves -9, 18 Nov enters +6: 224 - 9 + 6 = 221.

**Next 30 (19 Nov-18 Dec):** **57.9%** booked (136/235; yesterday 58.8%, 140/238). **Next 60 (19 Nov-17 Jan):** **47.2%** (196/415; yesterday 46.2%, 193/418).
- Source: occupancy, live Smoobu GET 07:18:35Z, handback-aware; reservations and `/api/rates` agree on every unit-night.
- Reconciliation, next 30: yesterday's window recounted on today's pull = 142 (140 + 2 new P04 nights); 18 Nov out -7; 18 Dec in +1: 142 - 7 + 1 = 136. Denominator 238 + 1 (P20 19 Nov unblocked) - 10 + 6 = 235.
- Reconciliation, next 60: 193 + 10 new P04 nights = 203; - 7 (18 Nov) + 0 (17 Jan) = 196. Denominator 418 + 1 - 10 + 6 = 415.

**7-day pickup (bookings made 13-19 Nov, to 07:18Z):**
- Gross: 12 bookings / 59 n / £10,912.17. Still confirmed: 11 / 54 n / £10,065.07.
- Cancelled in the window: 3 / 21 n / £3,944.84 (P04 20 Dec-2 Jan £2,417.34, P11 26-29 Nov £680.40, P13 18-23 Dec £847.10).
- **Net: +38 n / +£6,967.33** (yesterday +28 n / +£5,636.44).
- Reconciliation: the difference is exactly **the two new P04 Airbnb bookings**, +10 n / +£1,330.89 (£254.15 + £1,076.74). **First real booking activity since 16 Nov 22:52.** No cancellation since 16 Nov.

## P04 Christmas-NYE after the sale

**Source:** pricelabs C1, occupancy, channel §1, market §2, comp-east Priority 1. Room = Smoobu = PriceLabs `price`.

| 27 Dec-4 Jan, 8 nights | £ | Source |
|---|---|---|
| PriceLabs / Smoobu at booking (175/192/193/194/201/194/164/146) | 1,459 | pricelabs, occupancy |
| Before the 17 Nov occupancy cut (`user_price`) | 1,734 | pricelabs |
| Uncustomized at booking | 1,875 | pricelabs |
| Policy expectation (weekly -15%) | 1,240.15 | channel |
| **Paid (room)** = £1,459 x 0.900 x 0.82 | **1,076.74** (£134.59/n) | all sections |
| Gap vs policy (0.900 tier £124.02 + weekly 18% vs 15% £39.39) | **-163.41** (-13.2%) | channel |
| Market 1-3 BR P50 / P75, booking-day pull | 1,366 / 1,747 (sale -£289.26 / -£670.26) | market |
| Market P50 / P75 after the policy weekly -15% | 1,161 / 1,485 (sale -£84 / -£408) | market |
| comp-east supported room (band £221.31 all-in x 0.85-1.00, less cleaning) | 1,363-1,628 (shortfall **£286-552**, estimate, n = 2) | comp-east |
| Cancelled Booking.com stay at £185.95/n x 8 | 1,487.59 (sale -27.6%/n) | occupancy |
| PriceLabs now (after the sale lifted the band) | 1,550 (+6.2%) | pricelabs |

- **NYE min 7 (27 Dec) / 5 (28-31 Dec) still applied** and the 8-night stay met it. 6 of the 13 cancelled nights are resold; 2-3 Jan are new nights.
- **Read (market §2):** most of the gap below P50 is the discount stack beyond policy (0.738 vs 0.85), not the PriceLabs list (£1,459 was £93 over the mixed P50). Both are levers we control: a-airbnb-rules (the 0.900) and a-discount-cut (the occupancy profile that cut £1,734 -> £1,459).

**What is left: 20-26 Dec, 7 n, £1,233** (171/174/169/180/183/179/177; min 3/3/3/4/4/4/4)

| Stay | Ours, Airbnb all-in £/n | Band median (n), vs | Supported room £/n | Market |
|---|---|---|---|---|
| 20-23 Dec (3 n) | 201.67 | 218.67 (5), -7.8% | 158-186: **in range, hold** | P56; +£61 over mixed P50, about £44 under matched P50 (20-26 Dec) |
| 21-24 Dec (3 n) | 204.33 | 218.67 (5), -6.6% | 159-187: **in range, hold** | P57 |
| 23-26 Dec (3 n) | **not bookable** (23 Dec min 4) | 226.67 (5) | - | P56 |
| 23-27 Dec (4 n) | 197.50 | 228 (5), -13.4% | 176-208: **hold to +5%** | |

- **Price:** DSO 23-26 Dec **-5% -> 0%** (about +5%: 180/183/179/177 -> about 189/192/188/186). 20-22 Dec: hold (keep -5%).
- **At band 0%** (a-discount-cut on P04) the block would be about **£1,370** (estimate, pricelabs), which is slightly above the comp-supported range on 20-22 Dec (about £190-193/n vs £186-187 top). So on Christmas the remaining price gap is small; the case for a-discount-cut on P04 now rests on 6-19 Dec and January, and on the lesson above.
- **Min stay (your call):** 27 Dec is booked, so with min 4 on 23-26 Dec the only stay from 23 Dec is exactly 23-27 Dec, and no check-in on 24, 25 or 26 Dec can be sold; if 21-24 Dec sells, 24-26 Dec are stranded. **Min 3 on 23-26 Dec** stays within policy and makes 23-26 and 24-27 Dec sellable (comp-east, occupancy).
- **1455** is not offered on any Christmas-NYE stay, including the sold 27 Dec-4 Jan (channel §2): no double-booking exposure there.

## Reyhan's PriceLabs edits, 18 Nov 12:13-12:18Z: confirm or revert

`get_user_logs` (listing, 18-19 Nov): 18 entries, all Reyhan. Live overrides confirm them (pricelabs H1, comp-central, comp-west).

| Edit | Standing decision | Effect now (was) | Revert = |
|---|---|---|---|
| **P13 1 Dec +50% -> +25%, min 1** (3064856, copied to 3090701 and Vrbo) | `intentional_overrides.P13`: +50% min 1 | 3064856 **£232** (278); 3090701 £163 (194) | DSO 1 Dec +50% on parent 3064856 (child copies) |
| **P11 14-15 Dec -2% min 3; 16-18 Dec -2% min 2** | 21 Oct darts average >£300; 24 Oct "+5%, leave" | 14-17 Dec 218/220/227/251 = **£229.00 avg** (£236.75); 18 Dec 313 | DSO 14-18 Dec +5% (about 234/236/243/269/335) |
| **P04 18-19 Nov +5%, min 2** | P04 never under 3 nights | **Sold** 18-20 Nov, £254.15 room (0.850 at lead 0, £129 cleaning) | Nothing to revert; record the outcome or restate the rule |
| P05 29 Nov-2 Dec -2%, min 3 | "cut PriceLabs discounts" | 501/485/485/510 = £1,981 (£2,005); -15% vs kept already | DSO 29 Nov-2 Dec 0% |
| P11 3-4 Dec -2%, min 2 | "cut PriceLabs discounts" | 3 Dec **214** (273; prior DSO about +25%, inferred); 4 Dec 329 (334) | Prior DSO (comps support about +8% on 2-4 Dec, about £267 room avg) |
| P20 5 Dec +100%, min 1 | none (plan: min 1, keep about £265) | **£531** (265, min 3, unbookable) | Your call: confirm, or step down toward £296-424 if unsold by about 28 Nov |
| P20 26 Dec +100%, min 1 | none (plan: min 1, keep about £272) | **£569** (272, min 4, unbookable) | Your call: about **£382** (comp-west, = uncustomized) |
| P13 27 Nov +25%, min 1 (prior likely +50%, inferred) | none | 272 / 191 (304 / 213); Finals Weekend Friday, market Δ +13.5, £25 under P75 £297 | For your view only |
| P11 18-19 Nov +5% min 2 | none | 19 Nov £172 (lapses tonight) | - |

Carried from yesterday's list (unchanged): P05 Jan/Feb -5%; **P04 base 200 vs your 220**; P04 6-22 Dec -5%; P14 min 450 vs £500; P05 max 3,500; P20 base 330 vs 350. **Then record the outcomes in `policy.json`.**

## Base review

`base_price` unchanged on every listing (pricelabs). Base vs market P50 uses `market.csv` 19 Nov (bedroom-matched `summary_table`; pricelabs M3, market §1).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 11 non-blocked nights to the 20 Dec handback; base -5.2% vs P50 £267 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (your 220)** / **"Unavailable"** | 50.0% vs 23% next 30, 38.3% vs 19% next 60; 6-16 Dec -25% to -32% vs band; NYE sold at P0; base +15.6% vs 2 BR P50 £173, -6.1% vs P75 £213 | **Conflict: confirm 200 or revert to 220.** Revert recommended (£94, not additive with a-p04-dec-1611). Ask PriceLabs support why the recommendation is missing |
| P05 | 550 / 538 | 73.3% vs 46%; 7-8 / 13-14 Dec -19% / -18% vs kept; qp +0.116; `recommend` +21.6%; base -2.7% vs 4 BR P50 £565 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 72.7% of 11 non-blocked vs 51%; 22-23 Nov at the median; base -12.9% vs P50 £410 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / **280** (was 281) | 46.7% vs 50% (Soft); 22-27 Nov +25% to +28% over kept on list; December -9% to -21%; base -2.1% vs P50 £292 | **Hold 286.** Levers are date overrides (darts, 2-4 Dec, 23-25 Dec, 3 Jan) and a-discount-cut |
| P12 | 284 / 284 | 72.0% to handback vs 43%; pace -4.5% (On track, window effect); every open stay +3% to +28% vs band with qp -0.15; base +37.9% vs P50 £206; 7 open nights left | **Hold 284; correct the open nights by DSO** (a-p12-trim, t-p12-26nov-price) |
| P13 | 250 / 241 | 73.3% vs 47% next 30, 56.7% vs 37% next 60; base +13.1% vs P50 £221 | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 47%; P100, +49% to +116% vs kept; 74 of 180 open nights at £450 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 60.0% vs 38% next 30, 53.3% vs 30% next 60; 5.0 (1); base +28.9% vs P50 £256 | **Conflict: confirm 350 or record 330** |

## What changed since 18 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+25 n / +£7,329.70** (unchanged, third day) |
| Raised, including P06 | **+34 n / +£9,196.31** (made 28 / 108 n / £23,831.63; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +51 n / +£9,443.82 (unchanged) |
| P13 (comparison) | +27 n / +£4,704.65 (unchanged) |
| P04 (comparison) | **+47 n / +£5,933.67** (was +37 n / +£4,602.78; +10 n / +£1,330.89 from the two new Airbnb sales) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 0 / £0; **P05 +16 / +£6,135.19**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21.
- **No raised unit has had a booking or cancellation since 13 Nov 22:20.** The unraised P04 picked up 10 nights in one day, at 0.738x its Smoobu price.
- **Reading: hold the bases.** Caveats stand: the markup changes (24 Oct, 12 Nov, 18 Nov), promotions, Reyhan's overrides and the P06 reopening cannot be separated out (n = 1-9 bookings per flat).

### Per property
| Ref | Change since 18 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked, now 284/293/246 (£823). Reopened: 18-21 Dec -12.4% vs stored, -6.1% vs band; parity supported, up to +6% (comp-east). 100% of 11 non-blocked nights. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight (P03 via Channex 03:01Z). P02 Vrbo copy stale since 24 Feb. |
| P04 | **Two Airbnb sales: 27 Dec-4 Jan £1,076.74 (£1,459 x 0.738; P0 vs comps; £163.41 under policy) and 18-20 Nov £254.15 (Reyhan's min 2).** 20-26 Dec £1,157 -> £1,233 (+6.6%, band -15% -> -10%); min 4 strands 24-26 Dec. 6-16 Dec £1,577 (-25% to -32% vs band); 17-19 Dec 146/150/175. 1455 still sells the sold 20-24 Nov (£780.30), day 20; the 20-24 Nov record was modified 18 Nov 17:30 (room unchanged, what changed NOT CHECKED). Fwd30 50.0% vs 23%; fwd60 38.3% vs 19%. Pickup +1 n / -£596.86. |
| P05 | No booking. 7-8 Dec £950 (£973), 13-14 Dec £1,019: -19% / -18% vs kept. 29 Nov-2 Dec -2% (Reyhan) to £1,981, -15% vs kept. 21 Dec £2,038 / 29 Dec £2,536 (+300% min 1). Long stay 10% on 5 n still on (-£192.78 / -£203.00). **New: about £20/night extra on 8-guest Airbnb cards**, not set in Smoobu or PriceLabs (source NOT CHECKED). Fwd30 73.3% vs 46%. |
| P06 | 22-23 Nov £260/£245; **now at the kept median** (P50 / -1%, n = 2) because our Airbnb card rose (factor 0.766 -> 0.845; cause NOT CHECKED): hold. 29 Nov orphan at min 4. Numbers only (policy). Refresh 18 Nov 08:29Z, crosses 24 h today. |
| P08 | Handed back. |
| P09 | No sellable night before the 26 Nov handback. |
| P10 | **Handed back** (last night 18 Nov, booked). Now out of every window. |
| P11 | No booking. Reyhan -2% on 3-4 and 14-18 Dec: darts 14-17 Dec average **£229.00** (-21% vs kept); 3 Dec 273 -> 214. 8 Dec £292 (+48% vs kept). 23-25 Dec 285/263/273 (-10% kept). 3 Jan £172. 22-27 Nov +25% to +28% over kept on list (hold; comps fell 4-6%). Fwd30 46.7% vs 50% (Soft). Recommended base 281 -> 280. |
| P12 | **Engine raised it 6-7% overnight (no edit; refresh 19 Nov 06:31Z), undoing a-p12-trim:** 19-20 Nov 251/319, 26 Nov **310**, 30 Nov-3 Dec 261/286/282/282. Every open stay +3% to +28% vs band. Pace **-4.5%** (-3 n / -£179.77), On track (window effect). Airbnb all-in below PriceLabs room on 30 Nov-3 Dec (£785 vs £829; NOT VERIFIED). |
| P13 | **Twins identical again** on 19-21 Dec (243/224/227) and 3-18 Jan (identical Airbnb cards, e.g. £204.33 on 5-8 Jan); 13-18 Dec still about 10% apart. Reyhan +25% on 27 Nov / 1 Dec (1 Dec is a policy conflict). Fwd30 73.3% vs 47%. Pickup +8 n / +£1,309.69. |
| P14 | Numbers only: 74 of 180 open nights at £450; **last refresh 18 Nov 07:19Z, past 24 h**; P100 / +49% to +116% vs kept; 0% vs 47%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **Delivery block shortened to 18 Nov only (18 Nov 16:16Z): 19-24 Nov open** (£311/£334/£282/£292/£284/£278); Airbnb 20-23 Nov £694.62 room. **Airbnb now shows 6 guests** (policy 4). Orphans 5 / 26 Dec sellable at min 1 but +100% (£531 / £569). 20-24 Nov P0 / -15.3% vs median, on the 1-review line (hold); 22-24 Nov P100, about -7% supported. Fwd30 60.0% vs 38%. |

### Open plan items: status today
| Item | Status 19 Nov (evidence) |
|---|---|
| t-p04-xmas-1711 | **Partly overtaken: 27 Dec-3 Jan sold** (£1,076.74). Left: 20-26 Dec £1,233, hold 20-22 / up to +5% 23-26, min 3 question. Priority critical -> high |
| t-p20-5dec-orphan | **Done:** min 1 since 18 Nov 12:17:39Z (Reyhan), sellable. Price (+100%, £531) moves to a-p13-record |
| t-p20-26dec-orphan | **Done:** min 1 since 18 Nov 12:17:57Z (Reyhan), sellable. Price (+100%, £569 vs about £382 supported) moves to a-p13-record |
| a-p12-trim | **Reversed by the engine** (+6-7%); new sizes from comp-east |
| t-p13-twins | **Worse** (138/146; 60/68) |
| t-pl-push-1811 | 18 Nov part resolved by the 12:15-12:36Z pushes; **recurs today**; priority medium -> high |
| t-p06-2229open | Price part withdrawn (now at the median); the opening question stays |
| t-p04-doublebook, t-p20-delivery | Not fixed; arrivals tomorrow |
| t-bcom-nr-base-1811, t-bcom-minstay-1811 | Kept open: +15% and plan minimums not evidenced (WAF; screenshots still x1.10) |
| **New:** t-p20-guests-1911 | P20 Airbnb 6 guests vs policy 4 |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-19

**Ranking:** time-bound rows first (arrivals tomorrow, deadlines), then critical rows, then rows by expected £, then cuts marked "your call", then per-stay rows and questions.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). Airbnb factor (channel §3, §5): 0.765 up to 28 d, 0.900 at 29-60 d. P11 (Booking.com only): 0.762 (carried). P04: booked share only (same method as the last four days). These are upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.500, P05 0.733, P06 0.727, P11 0.467, P12 0.720, P13 0.733, P20 0.600.
- Booked share, next 60: P04 0.383, P05 0.600, P11 0.433, P13 0.567, P20 0.533.

**Bounds** (`kpi_pack` settings, 19 Nov, unchanged): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 20, arrival TOMORROW).** On 1455876748739910219, **block 19 Nov-5 Jan today** (20-24 Nov first), or snooze/unlist it. Keep its Christmas-NYE dates closed. Then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §2 (07:20:25Z): **20-24 Nov bookable at £780.30** (18 Nov £741.40) although sold on the synced listing; 21-24 Nov £613.70; 20-23 Nov £617.95; also 6-13 Dec £1,290.26, 13-20 Dec £1,282.97, 4-7 Jan £639.20. comp-east: £781; also 18-20 Dec £509. Not offered on any Christmas-NYE stay | Not quantified (exposure: the £631.59 stay arriving tomorrow plus relocation if a second guest books) | Corentin | 2026-11-19 |
| 2 | P20 | **t-p20-delivery (critical, TOMORROW): confirm or revert.** The Smoobu block was shortened from 18-20 Nov to 18 Nov only (`modifiedAt` 18 Nov 16:16:46). **If delivery is still 20-21 (22) Nov:** re-block those nights in Smoobu today. **If not:** update `policy.json listing_facts.P20.block_20_21_nov` and hold 20-24 Nov. **22-24 Nov min 2** (Reyhan, vs min 3 to 30 Nov): confirm or revert; if kept open, (your call, lowers a price) DSO 22-24 Nov about -7% (292/284 -> about 272/264). | Smoobu > Calendar > Waterford Court 3547481; PriceLabs 3547481 > DSO; `policy.json` | occupancy: 19-24 Nov open (£311/£334/£282/£292/£284/£278, min 2/3/3/2/2/2). channel §4: **Airbnb sells 20-23 Nov at £694.62 room** (07:21:40Z), 22-24 Nov at £440.64. comp-west: 20-24 Nov P0 / -15.3% vs median, -0.3% vs the 1-review line (hold); 22-24 Nov P100 / +2.4%, +20.5% over the line, `recommend` (7 d, 29% vs 50%) lower -7%. market: 20-24 Nov Δ -2.8 to -8.6 vs STLY (soft) | Not quantified (a policy question; the -7% is a cut) | Corentin | 2026-11-19 |
| 3 | P20 | **NEW t-p20-guests-1911 (confirm or revert).** The P20 Airbnb listing shows **6 guests**; policy says max 4 (Corentin 24 Oct). If 4 is still your decision, set guests back to 4; if you changed it, record it in `policy.json` (and say whether Booking.com changed too). No proposal from me. | Airbnb 1791529331262420081 > Listing > Guests; `policy.json` | comp-west: `personCapacity` 6 on the listing page 19 Nov 07:2xZ, 4 on 18 Nov 07:21Z; `listing_facts.P20.max_guests` | Not quantified | Corentin | 2026-11-19 |
| 4 | Portfolio | **a-deposit (deadline 20 Nov, tomorrow).** Decide: £1,000 hold, damage waiver, or ID check only, before Airbnb's rule change. | Airbnb account settings | policy `guest_requirements` | Not quantified | Corentin | 2026-11-19 |
| 5 | P14 P06 P13 P11 P05 P04 P20 | **t-pl-push-1811 (check today; recurs).** Check `last_date_pushed` on P14 now, P06 after 08:30Z and P13 twins / P11 / P05 / P04 / P20 after 12:25Z. If unchanged, press Sync Now and ask PriceLabs support why these listings miss the nightly refresh. | PriceLabs > Listings (last sync) | pricelabs C2: **P14 last push 18 Nov 07:19:20Z (past 24 h at 07:19Z)**; P06 08:29Z; P13 12:15:24-25Z; P11 12:15:30Z; P05 12:17:15Z; P04 / P20 12:20:21Z; Vrbo copies 12:34-12:36Z; only P01/P02/P03/P07/P08/P09/P10/P12 refreshed overnight on both nights; price sync clean (0 open nights differ by more than £2) | Not quantified (a check) | Corentin / Reyhan | 2026-11-19 |
| 6 | Portfolio (P04 first) | **t-bcom-nr-base-1811 (critical; kept open).** Send an extranet screenshot of the **Standard Rate for 2 Dec and 20 Dec** on Barking (and one other flat): expected at +15% **£493** on 2 Dec (Smoobu £428) and the derived plans NR £443.70 / Weekly £419.05 / Monthly £394.40 / NR Weekly £404.26. If Standard is still £471 (x1.10), re-save the +15% overwrite in Smoobu pricing. Confirm the derived set-up on every flat, not only Barking. | Smoobu > Pricing > Booking.com overwrite; Booking.com extranet > Rates & availability | channel §3: 18 Nov screenshots Standard = ceil(Smoobu x 1.10) (2 Dec £471); derived plans correct on those screenshots; live NOT CHECKED (AWS WAF 07:24:44Z, not bypassed); **no Booking.com booking for about 56 h, 0 since +15%** | At x1.10 instead of x1.15 Standard is about 4.3% low (P04 20-26 Dec £1,360 vs £1,421, -£61): not quantified as a monthly £ | Corentin | 2026-11-20 |
| 7 | P20 P13 P05 P06 P04 P12 | **a-airbnb-rules (critical, day 21).** Remove the hidden lead-time rules: **0.850 at lead 0, 0.765 at 1-28 d, 0.900 at 29-59 d**. Keep only the visible discounts (policy `airbnb_visible_discounts`). P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §1, §5: **P04 27 Dec-4 Jan paid £1,459 x 0.900 x 0.82, £163.41 under policy** (0.900 tier £124.02); P04 18-20 Nov 0.850 (est. £44.85); open cards P05 5-10 Jan £406.98, P20 14-19 Dec £321.87, P05 4-11 Jan £253.32, P13 14-19 Dec £233.89 / £210.33, P04 20-26 Dec £200.64 | **Realised cost £4,130.07 confirmed** (£3,966.66 + £163.41; £4,174.92 with the 18-20 Nov estimate). Open-card gaps overlap, not summed | Corentin | 2026-11-20 |
| 8 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec so **18-20 Dec** sell at £284 / £293 / £246, min 3 (no price change; up to +6% supported on 18-21 Dec). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: reopened 18-21 Dec £324/n = **-12.4% vs stored (n = 7), -6.1% vs band**; 18-20 Dec -3.5% / +1.1%; PriceLabs NL P62-P67; qp -0.02 (4 reviews); `prices.csv` 19 Nov still `Blocked` | £823 x 0.900 = **£741** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-20 |
| 9 | P05 | **a-p05-dec.** **7-8 Dec DSO +3% -> about +34%** (485/465 -> about 620/620) and **13-14 Dec +5% -> about +33%** (518/501 -> about 645/645): the kept-median level. **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu; if meant to sell (your call: lowers a price), +300% -> 0% (uncustomized £653 / £981). | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-9 Dec **P25 / -19%**, 13-15 Dec **P20 / -18%** vs kept (wider n = 8-9: -19% / -14%); qp **+0.116**; `recommend` **+21.6%**; supported +12% over the median (about £707 / £735). Sizing override, stated: the comp gap (-18% to -19%) is larger than the formula step, so I adopt the median level (+27% to +30%), which sits inside the +12%-over-median support. market: 13 Dec Δ +13.4 (most compressed open P05 night); 4 BR P50 £565; 21 / 29 Dec 1.66x / 2.07x the 4 BR P90 | 7-8 Dec £290 x 0.765 x 0.733 = £163; 13-14 Dec £271 x 0.765 x 0.733 = £152; 21 Dec £653 x 0.900 x 0.600 = £353: **£667** (upper bound). 29 Dec not quantified | Corentin | 2026-11-20 |
| 10 | P05 P04 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P05, P04, P11 and P20. All four still Aggressive occupancy + Booking Recency default; last-minute P04 5% gradual, P05 1% gradual. **P12 and P13 excluded.** | PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations | pricelabs H3 (`disc19.py`), next 30 (20 Nov-19 Dec): **P05 8 n £674 (-14.6%)**, P04 16 n £238 (-8.4%), P11 15 n £210 (-5.7%), P20 -£53 (distorted by +100% on 5 Dec); four targets **£141 next 13 / £1,069 next 30** (positive-only £1,559). The metric misses the P04 band (-10% on 31-60 d now). **Lesson today: the P04 occupancy cut (£1,734 -> £1,459) sold the NYE week at P0 vs comps and £289 under the market P50; cost about £157-203 on that stay (estimate)** | 674 x 0.765 x 0.733 + 238 x 0.500 + 210 x 0.762 x 0.467 + P20 £0 = **£572 / 30 days** (upper bound) | Corentin | 2026-11-20 |
| 11 | P13 P11 P05 P04 P20 P14 | **a-p13-record: confirm or revert Reyhan's edits** (table above). (a) **P13 1 Dec +25% -> +50%** (policy). (b) **P11 darts 14-18 Dec -2% -> +5%** (about 234/236/243/269/335; your 24 Oct setting; comps support about £280-318 room). (c) P04 18-19 Nov min 2: sold; record it or restate the rule. (d) P05 29 Nov-2 Dec -2% -> 0%; P11 3-4 Dec -2% -> prior. (e) P20 5 Dec £531 / 26 Dec £569 (+100%): confirm, or 26 Dec to about £382. (f) P04 base 200 -> 220. (g) P05 Jan/Feb -5%, P04 6-22 Dec -5%, P14 min 450, P05 max 3,500, P20 base 330 vs 350: confirm. Then record the outcome in `policy.json`. | PriceLabs 3064856, 3064196, 3166592, 3547481, 3562176, 3267077; `policy.json` | pricelabs H1-H2; comp-central (darts P0 / -21% kept; 2-4 Dec -6% vs wider n = 16, about +8% supported; P05 29 Nov-3 Dec -15% vs kept); comp-west (26 Dec n = 1 comp £494 all-in, need £381 Smoobu = uncustomized 382; 5 Dec no comp, P25 of 1-night 2-beds); market (1 Dec P50 229 / P75 294, Δ +9.0; darts £916 vs policy £1,200) | Darts: £1,229 x 0.0714 x 0.762 x 0.467 = £31; 1 Dec: £46 x 0.765 x 0.733 = £26; P11 2-4 Dec: £59 x 0.762 x 0.467 = £21; P05: £24 x 0.765 x 0.733 = £13; P04 base: £1,873 (6-18 Dec) x 0.10 x 0.500 = £94 (not additive with row 12). **Total £185** (upper bound). P20 26 Dec: not quantified (a cut) | Corentin | 2026-11-20 |
| 12 | P04 | **a-p04-dec-1611.** DSO **6-16 Dec -5% -> +14%** (about +20%: 143/142/142/141/144/151/153/143/136/139/143 -> about 172/170/170/169/173/181/184/172/163/167/172). **17-18 Dec: split from 6-22 Dec and set -5% -> about +4.5%** (about +10%: 146/150 -> about 161/165). **Hold 19-22 Dec.** If you do row 10 on P04 first, re-read: part of this gap is the occupancy band. If you revert the base to 220 (row 11f), use **+4%** on 6-16 Dec instead. | PriceLabs 3562176 > DSO 6-16 Dec, 17-18 Dec | comp-east Priority 1: 6-9 Dec **-27.1%**, 9-12 Dec -26.0%, 11-14 Dec -24.7%, **14-17 Dec -31.9%**, 17-20 Dec -17.9% vs band; supported room £166-204 (6-17 Dec), £162-191 (17-20 Dec); comps did not move; `recommend` +10% (30 d and 31-60 d), adopted at the larger size on 6-16 Dec because the comp gap exceeds the step. market: 6-19 Dec £2,048, £176 under the mixed P50 | 6-16 Dec £1,577 x 0.20 x 0.500 = £158; 17-18 Dec £296 x 0.10 x 0.500 = £15: **£173** (upper bound) | Corentin | 2026-11-20 |
| 13 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**, and the **Long stay 10% on 5-6 nights**: keep and record, or 0%. | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §4: the extra 3 weekly points cost **£39.39 on the 27 Dec-4 Jan sale**; open 6-13 Dec -£164.59, 13-20 Dec -£167.19 (18.0%); Long stay on 20-26 Dec -£95.04 | **£39.39** realised; £95.04 on one 6-night Christmas stay | Corentin | 2026-11-20 |
| 14 | P11 | **t-channel-gaps.** **23-25 Dec DSO +5% -> about +15%** (285/263/273 -> about 312/288/300, average about £300). **3 Jan:** DSO so the price is about **£195** (£172 now). Low end of the supported range because the market is soft. | PriceLabs 3064196 > DSO 23-25 Dec, 3 Jan | comp-central: 23-25 Dec **P38 / -10% kept (n = 8), -7% wider**, supported £298-308 room; 3-5 Jan -9% kept / 0% wider, supported £186-208; market: 23-25 Dec Δ -3.4 to -9.2 vs STLY (soft); 3 Jan darts final, £19.7 under the fortnight | 23-25 Dec £79 x 0.762 x 0.433 = £26; 3 Jan £23 x 0.762 x 0.433 = £8: **£34** | Corentin | 2026-11-20 |
| 15 | P13 | **t-p13-twins (twin rule).** (a) **DSO 3090701 +7% on 13-15 Dec** (219/215/213 -> about 234/230/228; gap 10% -> about 4%). (b) **DSO 3064856 about -3% on 19-21 Dec** (243/224/227 -> about 236/217/220; your call, lowers a price; breaks the identical prices). (c) **DSO 3090701 +3% on 3-18 Jan** (3064856 unchanged); set on the child after any parent edit, and check why the existing 3090701 -10% DSO (2 Jan-28 Feb) no longer separates them. Which twin is cheaper is not raised (deprioritised). | PriceLabs 3090701 / 3064856 > DSO | pricelabs H4: **138 of 146** jointly open nights identical (Smoobu, next 180); channel §4: **60 of 68** to 28 Feb, identical Airbnb cards on 3-8 Jan (£921.30); comp-west: **19 identical open nights**; 3090701 13-16 Dec P25 / -9.3%, -7.0% vs its line; 19-22 Dec both P100 / +14.1% (n = 2); 5-8 / 14-17 Jan -3.3% / -7.5% vs median, market occupancy 12-16% | (a) £647 x 0.07 x 0.765 x 0.733 = **£25**. (b) a cut, (c) not quantified (duplicate-listing risk) | Corentin | 2026-11-20 |
| 16 | P04 | **t-p04-xmas-1711 (updated; critical -> high).** 27 Dec-3 Jan is sold. For the 7 open nights: **20-22 Dec hold**; **23-26 Dec DSO -5% -> 0%** (about +5%: 180/183/179/177 -> about 189/192/188/186). **Your question: min 4 -> 3 on 23-26 Dec** (policy floor) so 23-26 and 24-27 Dec can sell. | PriceLabs 3562176 > DSO 23-26 Dec (price, min) | pricelabs C1: 20-26 Dec £1,157 -> **£1,233** (+6.6%; band -15% -> -10% after the sale); about £1,370 at band 0% (estimate). comp-east: 20-23 / 21-24 Dec -7.8% / -6.6% vs band (in range); 23-27 Dec -13.4% (hold to +5%); 23-26 Dec not bookable (min 4). market: about £44 under the matched P50, Δ +2.1 to +8.5, 31-37 d out vs a 19-day December window | 23-26 Dec £36 x 0.383 = **£14**. Min 3: not quantified | Corentin / Reyhan | 2026-11-20 |
| 17 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the block to start 30 Nov intended? **If yes:** add a date note to `policy.json` and **hold 22-23 Nov** (no price change now). **If no:** re-block 22-23 Nov. Also: 29 Nov (min 4 orphan, £255): intended? | Smoobu > Calendar > Marylebone; `policy.json` | comp-central: 22-23 Nov **P50 / -1% vs kept (n = 2)** (was -13%) because our Airbnb card rose to £556 (factor 0.845); qp -0.02, supported about £275 all-in vs £278 now; occupancy: 29 Nov £255 min 4 | Not quantified (hold) | Corentin | 2026-11-20 |
| 18 | P12 | **a-p12-trim (your call: lowers a price; reversed by the engine).** **19-20 Nov DSO 0% -> -15%** (251/319 -> about 213/271; 19 Nov is tonight). **30 Nov-3 Dec 0% -> -10%** (261/286/282/282 -> about 235/257/254/254). | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 19-21 Nov **P100 / +16.6%** vs band; 30 Nov-3 Dec +7.0%; **1-3 Dec +12.8%**; 2-4 Dec +15.8%; qp -0.15 (ceiling 0%); PriceLabs NL P79-P90+; engine +6-7% on 19 Nov 06:31Z with DSOs unchanged; `recommend` +10% not adopted (lead from sold nights). occupancy: pace -4.5% (On track) | Not quantified (a cut) | Corentin | 2026-11-19 |
| 19 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -17%**, keep min 1 (£310 -> about £224). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £363 all-in, **P100 / +27.8%** vs band (n = 5); supported room £206-243; PriceLabs NL above P90; uncustomized £255 | Not quantified (a cut) | Corentin | 2026-11-20 |
| 20 | P11 | **t-p11-8dec-orphan (your call: lowers a price).** Keep min 1. DSO 8 Dec **+50% -> about -13%** (about **£170**). | PriceLabs 3064196 > DSO 8 Dec | comp-central: £292 = list all-in £485, **P100 / +48% kept, +35% wider**; a 1-night stay carries the full £149 cleaning; supported **£154-184 room**; uncustomized £253 | Not quantified (a cut) | Corentin | 2026-11-20 |
| 21 | P05 | **t-p05-los.** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: **-£192.78 on 5-10 Jan, -£203.00 on 18-23 Jan**; weekly 15% on 4-11 Jan matches policy | **£192.78** per 5-night stay | Corentin | 2026-11-20 |
| 22 | P05 | **a-p05-earlybird.** Visible 12% early booking: yours, or 0%? | Airbnb 1618929775762183214 > Pricing > Discounts | channel §4: not shown at 47-64 d; applied on the Valentine's stay (£195.24) | **£195.24** per such stay | Corentin | 2026-11-20 |
| 23 | P13 | **t-p13-los5.** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: 14-19 Dec **-£110.79 / -£99.63**; 3-8 Jan -£77.13 each; not in the 21 Oct rule set | **£99.63-£110.79** per 5-night stay | Corentin | 2026-11-20 |
| 24 | P05 P11 P13 P04 | **a-extra-guest (updated).** New: P05 8-guest Airbnb cards carry about **£20/night extra** (£100 on 5 n, £140 on 7 n) that Smoobu and PriceLabs do not set (`extra_person_fee` 0). Is it yours (Airbnb extra-guest fee)? If yes, record it; then decide the extra-guest fee above 4 guests on the other flats. | Airbnb 1618929775762183214 > Pricing > Extra guest fee | channel §4 (p05_0510jan, p05_0411jan, p05_1823jan); discounts are computed excluding it | Not quantified (guest-paid; source NOT CHECKED) | Corentin | 2026-11-20 |
| 25 | P06 P20 P05 | **t-airbnb-flex15-1611.** Open the Airbnb reservation price breakdowns for P20 27 Dec-3 Jan, P05 13-17 Feb and P06 24-29 Nov, and check what the Flexible test turned on. New: **P06's 22-24 Nov card jumped to factor 0.845** (£518 -> £556) with Smoobu flat: what changed? | Airbnb host app > Reservations; Listings > Policies / Pricing | comp-central (P06 card); channel §5 | **£530.11** identified (inside row 7, not additive) | Corentin | 2026-11-20 |
| 26 | Portfolio | **t-bcom-minstay-1811 (high; kept open).** Confirm on the extranet that the plan minimum stays are enforced now that the plans derive from Standard: **NR 3, Weekly 7, Monthly 28, NR Weekly 7**. | Booking.com extranet > Rate plans > each plan > Restrictions | channel §3, §7: NOT CHECKED (WAF); 24 Oct precedent: a 4-night P04 stay priced on the Monthly plan (a-p04-monthly) | Not quantified | Corentin | 2026-11-20 |
| 27 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 9 post-cut Booking.com cancellations and the P04 Christmas-NYE cancellation. | Booking.com extranet > Reservations | channel §3: **9 of 25 gross cancelled (37.0%, £6,796.87)**; confirmed 16 / 70 n / £11,564.66; 0.97 gross / 0.62 confirmed a day; no booking for about 56 h | Not quantified | Corentin | 2026-11-20 |
| 28 | P13 P12 | **t-bcom-breakdown-1511 (question; no promotion change).** Send the extranet breakdown of the P13 22-27 Dec stay and of P12 7-14 Dec. | Booking.com extranet > Reservations | channel (18 Nov): P13 22-27 Dec 0.6926 of list (a fit) | Not quantified | Corentin | 2026-11-20 |
| 29 | P11 | **a-p11-bcom-stack (no change proposed).** Only the ask: the extranet breakdown naming the three 10% layers. | Booking.com extranet (Camden) | channel (14 Nov): nets £62.47 per £100 | Not quantified | Corentin | 2026-11-20 |
| 30 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-20 |
| 31 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-20 |

**Closed today:** t-p20-5dec-orphan and t-p20-26dec-orphan (fixed: both min 1 and sellable since Reyhan's 18 Nov 12:17Z DSOs; their +100% prices move to a-p13-record). **New today:** t-p20-guests-1911. **Updated in place:** t-p04-xmas-1711 (critical -> high), t-pl-push-1811 (medium -> high), a-p12-trim (reversed), t-p06-2229open (price part withdrawn), a-extra-guest (P05 extra). None reopened. The carried medium items (a-amenities, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-p20-conversion, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) are in the JSON with today's status.

## Top 5 for today
1. **P04 Barking's NYE week sold at the bottom of the market, the day after PriceLabs cut it.**
   - Airbnb 27 Dec-4 Jan paid £1,076.74 room (£134.59/n). That is the 18 Nov PriceLabs £1,459 x 0.900 x 0.82, to the penny.
   - It is £163.41 under policy, P0 vs comps (-31% vs the band; shortfall £286-552, estimate) and £289 under the market P50. The occupancy cut cost about £157-203 on this stay (estimate).
   - Left: 20-26 Dec at £1,233. Hold 20-22 Dec; 23-26 Dec 0 to +5%. Min 4 on 23-26 Dec makes 24-26 Dec arrivals unsellable; min 3 fixes it (your call).
   - Lesson: the occupancy profile, not the market, set this price. That strengthens a-discount-cut.
2. **Two Friday arrivals at risk, tomorrow.**
   - 1455 still sells the sold 20-24 Nov (£780.30, day 20): block it today.
   - P20: the Smoobu delivery block was shortened to 18 Nov only (18 Nov 16:16Z), so 19-24 Nov are open and Airbnb sells 20-23 Nov (£694.62 room). Confirm or revert.
   - P20's Airbnb listing now shows 6 guests (policy 4): confirm or revert.
3. **Reyhan's 18 Nov edits: confirm or revert.**
   - P13 1 Dec +50% -> +25% (policy says +50%).
   - P11 darts -2%: average £229 vs your >£300.
   - P04 18-19 Nov min 2: it sold at £254.15. Record it or restate the rule.
   - P05 29 Nov-2 Dec and P11 3-4 Dec -2%: these go against "cut PriceLabs discounts".
   - P20 5 / 26 Dec are now sellable but doubled (£531 / £569). Comps support about £382 on 26 Dec.
4. **Discount layers are still the biggest controllable leak.**
   - Airbnb hidden layer: £4,130.07 confirmed, day 21.
   - PriceLabs: £1,069 next 30 on the four targets (£572 expected).
   - Booking.com +15% is not yet evidenced (2 Dec was £471 = x1.10), and there has been no Booking.com booking for about 56 h.
   - Your direction covers it: keep Booking.com discounts, cut PriceLabs discounts.
5. **Engine moves with no edit; refresh gap.**
   - The engine undid a-p12-trim (+6-7%; 26 Nov £310 vs about £224). P13 twins are identical again (138 of 146 nights).
   - P04 6-16 Dec +20% and P05 7-8 / 13-14 Dec to the median are still supported. P01 18-20 Dec block holds £823.
   - Seven listings missed the overnight PriceLabs refresh (P14 is past 24 h): check after 12:25Z.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night by lead time: **0.850 at lead 0, 0.765 at 1-28 d, 0.900 at 29-59 d, 1.000 from 60 d** (channel §1, §6, day 21). The 0.850 is new today (P04 18-20 Nov sale).
  - Today's proof: the P04 NYE sale paid 0.738x; at the policy 0.85 it would have been **£163.41 more on one stay**.
  - Owner net per £100 Smoobu (channel §6): Airbnb 1.000 £84.50, 0.900 £76.05, 0.850 £71.83, 0.765 £64.64, 0.738 £62.36; Booking.com model at +15% £97.75 (at x1.10 £93.50); direct model £90 (unconfirmed). Every Airbnb sale inside 60 d nets below the direct model.
  - Target: **1.00x before visible discounts by 2026-11-20** (row 7).
- **Booking.com since the 24 Oct markup cut** (channel §3):
  - **Confirmed 16 / 70 n / £11,564.66**; 9 of 25 cancelled (**37.0% of gross room**). Pace 0.97 gross / 0.62 confirmed a day, falling; **0 bookings since +15% (18 Nov)**, no booking for about 56 h.
  - The leaks are cancellations (row 27) and whether +15% has reached Standard (row 6), not the markup decision.
  - Target: under 20% cancelled by 2026-11-30.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.88 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.63 |
  | P04 synced | **4.2 (10)** | 4.83 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.79 (38) | 4.50 (6 kept) |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 5.0 (1), still "New" | 4.80 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12's open nights need trims and why P04's Christmas ceiling sits at the band median.
  - Fixes: P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; P20 review requests after the December and NYE stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31; P20 3 reviews by 2026-12-31.
- **Listing conversion.**
  - **P04:** mapping 1455 (row 1) fixes both the double-booking risk and conversion (4.69 (26) vs 4.2 (10)).
  - **P11:** basement with a patio; 4 of 12 comps have a lift. Titles (a-titles).
  - **P20:** parking photo first; one review; the 6-guest display is a policy question (row 3).
  - **No "Free cancellation" pill on our listings**; 4 P13 comps and 2 P20 comps show it (comp-west). The Flexible test (P20, P06, P05 since 24 Oct; comparison due 7 Nov, **12 days overdue**) is how to measure it: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days, plus the breakdowns (row 25).
- **Gap fill / length of stay.**
  - Unsellable now: only **P04 24 Nov** (P04 rule) and **P06 29 Nov** (policy). The P20 orphans are sellable (min 1) at +100% (row 11e).
  - **Stranded by min stay:** P04 24-26 Dec arrivals (min 4 next to the 27 Dec booking; row 16).
  - Exact-stay runs (sell only as one stay): P12 19-20 Nov, P06 22-23 Nov, P05 7-8 / 13-14 Dec, P11 2-4 Dec (occupancy).
  - 19 Jan-18 Mar below 5 nights (pricelabs M1): P11 41/59, P13 47/59 per twin, P05 34/52, P20 53/59, P04 41/59. Please confirm the 5-night policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded) at the normal price, not +100%. `kpi_pack` `gaps` is still [] although Smoobu has P04 24 Nov and P06 29 Nov (data gap for `rm`). Mid-term (91+ nights): NOT CHECKED.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. A direct guest at -10% nets £90 per £100 vs £62.36 on today's P04 NYE sale.
- **Event compression** (market §4): **13 n / £348** (yesterday 15 / £403); bookable 12 / £313.
  - Left the list: P04 19 Nov (sold), P20 5 / 26 Dec (Reyhan +100%). Joined: P11 23 Dec.
  - **£217 of the £348 is P11 Round One (14-17 Dec)**, and it widened £30 overnight because of Reyhan's -2%, not the market (row 11b).
  - Real items not in the headline: **the P04 NYE sale** (about £285 under the mixed P50 at list, £84 after the policy weekly); **P04 20-26 Dec** about £44 under the matched P50; **P04 6-19 Dec** £176 under the mixed P50 (row 12); **P05 7-8 Dec** £180 under the 4 BR median (row 9); **P13 19-21 Dec** £41 under P50 on Δ +12.5 to +15.8, twins identical (row 15).
  - Next: **NYE fireworks final ticket release Fri 20 Nov 12:00**; Finals Weekend 27 Nov (P13 £272, Δ +13.5, £25 under P75; row 11 table).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (14 units) | **57.4%** (241 n; like-for-like 13 units 56.7%, 221 n; yesterday 57.4%) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£168.66** (like-for-like £173.07; yesterday £172.50) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£96.78** (like-for-like £98.07; yesterday £99.08) | £129 | 2026-12-18 |
| Revenue, last 30 | **£40,646.92** (241 n; P04 enters for the first time) | - | - |
| Booked next 30 (Smoobu) | **57.9%** (136/235) | each unit at least market + 10 pts (below: P11 46.7% vs 50%) | 2026-11-20 |
| Booked next 60 (Smoobu) | **47.2%** (196/415) | at least market + 10 pts (below: P11 43.3% vs 38%) | 2026-11-20 |
| 7-day pickup, net | gross 12 bk / 59 n / £10,912.17; cancelled 3 / 21 n / £3,944.84; **net +38 n / +£6,967.33** (difference vs yesterday = the two new P04 bookings) | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace vs STLY (to 13 Dec handback) | **-4.5%** (-3 n / -£179.77), On track (window effect) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+25 n / +£7,329.70 like-for-like** (unchanged, third day); +34 n / +£9,196.31 incl. P06; P04 comparison +47 n / +£5,933.67 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **16 confirmed / 70 n / £11,564.66; 9 of 25 cancelled (37.0%)**; 0 since +15%; none for about 56 h | cancellations under 20% | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.850 / 0.765 / 0.900 / 1.000** by lead time, day 21; realised cost **£4,130.07 confirmed** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap (four targets) | **£141 next 13; £1,069 next 30** (distorted by +100% / +200% DSOs) | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **0 open nights differ by more than £2**; P14 push past 24 h, 7 more cross today | 0 mismatches; pushes under 24 h | 2026-11-19 |
| Unsellable orphan nights (next 60) | **2**, both policy (P04 24 Nov, P06 29 Nov); P04 24-26 Dec arrivals stranded by min 4; P20 5 / 26 Dec sellable at +100% | 0 outside policy | met today |
| Double-sellable Barking stays | **1455 bookable on the sold 20-24 Nov (£780.30)**; day 20 | 0 | 2026-11-19 |
| P13 identical twin nights | **60 of 68** (Smoobu to 28 Feb); **138 of 146** next 180 | 0 | 2026-11-20 |
| Missed compression | **13 n / £348**; bookable 12 / £313 | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.79; comp medians 4.50-4.88; P20 5.0 (1) | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Booking.com live:** whether +15% reached Standard, derived-plan display, plan minimum stays and same-date ordering: NOT CHECKED (AWS WAF, not bypassed). Source: Corentin's extranet screenshots (rows 6, 26).
2. **Which Airbnb listing took the two P04 bookings**, and what changed in the 18 Nov 17:30 modification of P04 20-24 Nov: NOT CHECKED. Source: Airbnb host app > Reservations.
3. **P04 18 Nov price after the 12:20Z push** (firms up the 0.850 / £44.85 estimate): NOT CHECKED (Smoobu has no price history). Source: PriceLabs calendar history for 18 Nov.
4. **Who shortened the P20 delivery block and who set 6 guests:** NOT CHECKED. Source: Smoobu calendar history; Airbnb listing change log.
5. **Why 7 listings miss the overnight PriceLabs refresh**, and the causes of the P12 +6-7% and the P13 twins merging despite 3090701's -10% DSO: UNKNOWN. Source: PriceLabs support; calendar per-date factor breakdown.
6. **Prior DSO values** before Reyhan's edits are not in the logs (P13 27 Nov about +50% and P11 3 Dec about +25% are inferred). Source: Reyhan.
7. **Source of the P05 ~£20/night 8-guest extra and the P06 card factor 0.845:** NOT CHECKED. Source: Airbnb listing pricing pages.
8. **Market percentiles:** daily series mix bedroom counts; "est. matched" figures are estimates. Source: PriceLabs Market Dashboard with a 2 BR / 4 BR filter.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY before 19 Nov 2025).
10. **Other:**
    - Vrbo +8% / Direct -10% unconfirmed; P13 Vrbo copy vs 22-27 Dec NOT CHECKED.
    - Barking recommended base "Unavailable": ask PriceLabs support.
    - P15-P19 need the second-account keys.
    - Seven kept comp ids not returned today (five for 7 days: P06 x2, P14 x2, P17 x1; new P06 673753763892997438, P11 1515051936255130803); P04 1387112821878102742 not returned on any of 22 stays; P20 789954794593691037 only by probe (6th day). Calendars NOT CHECKED.
    - Events are domain-restricted search summaries: www.pdc.tv, help.englandrugby.com, www.theo2.co.uk, www.excel.london and www.london.gov.uk returned ENOTFOUND and must be allowed in the session's network settings. Unresolved: darts Round One start 13 / 14 Dec and end 3 / 4 Jan; Eng v NZ kick-off 14:10 vs 14:50.

```json
{"scoreboard":{"note":"19 Nov 2026. Last 30 nights = 20 Oct-18 Nov, 14 Smoobu units (kpi_pack portfolio_last30, exact; reproduced by occupancy). P04 enters last-30 for the first time (20 n, £2,398.11; mixed bases from the import batch); like-for-like with yesterday's 13 units: 221 n / 56.7% / ADR £173.07 / RevPAR £98.07. Forward and pickup from occupancy.md (live Smoobu GET 07:18:35Z, handback-aware, Smoobu as truth); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov and nights after each handback excluded (P10 now fully out); P20 19 Nov no longer blocked. Pickup = bookings made 13-19 Nov net of cancellations; the rise vs yesterday is exactly the two new P04 Airbnb bookings (+10 n / +£1,330.89). Airbnb ratios and hidden-layer cost from channel sections 1, 5 and 6 (£3,966.66 + £163.41 on the P04 NYE sale = £4,130.07 confirmed). Booking.com from channel section 3 (live NOT CHECKED, AWS WAF). PriceLabs gap from pricelabs H3 (distorted by +100%/+200% DSOs). Sync from pricelabs C2. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"57.4%"},{"label":"ADR last 30","value":"£168.66"},{"label":"RevPAR last 30","value":"£96.78"},{"label":"Revenue last 30","value":"£40,646.92"},{"label":"Nights last 30","value":"241 (P04 enters for the first time; like-for-like 13 units 221 n / 56.7%)"},{"label":"Booked next 30","value":"57.9% (136/235)"},{"label":"Booked next 60","value":"47.2% (196/415)"},{"label":"7-day pickup","value":"gross 12 bk / 59 n / £10,912.17; cancelled 3 / 21 n / £3,944.84; net +38 n / +£6,967.33 (difference vs yesterday = the two new P04 bookings, +10 n / +£1,330.89)"},{"label":"P12 pace vs STLY","value":"-4.5% (-3 n / -£179.77) to the 13 Dec handback; On track (window effect)"},{"label":"Raised flats net since 18 Oct","value":"+25 n / +£7,329.70 like-for-like (unchanged, third day); +34 n / +£9,196.31 incl. P06; P01 0; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21; P04 comparison +47 n / +£5,933.67"},{"label":"Booking.com since markup cut","value":"25 gross, 16 confirmed, 70 n, £11,564.66; 9 cancelled = 37.0% of gross room; 0 bookings since +15% (18 Nov); none for about 56 h"},{"label":"Airbnb displayed / Smoobu","value":"0.850 at lead 0; 0.765 to 28 d; 0.900 at 29-59 d; 1.000 from 60 d; day 21; realised cost £4,130.07 confirmed (£4,174.92 incl. the 18-20 Nov estimate)"},{"label":"Owner net per £100 Smoobu","value":"Airbnb 1.000 £84.50, 0.900 £76.05, 0.850 £71.83, 0.765 £64.64, P04 NYE sale 0.738 £62.36; Booking.com model +15% £97.75 (x1.10 £93.50); direct model £90 (unconfirmed)"},{"label":"PriceLabs-side gap","value":"Four targets £141 next 13 / £1,069 next 30 (positive-only £1,559); distorted by +100%/+200% DSOs, not discounts removed"},{"label":"PriceLabs vs Smoobu","value":"0 open nights differ by more than £2; P14 last push 18 Nov 07:19Z (past 24 h); P06, P13, P11, P05, P04, P20 cross 24 h today"},{"label":"P04 Christmas-NYE","value":"27 Dec-4 Jan sold £1,076.74 room (£1,459 x 0.900 x 0.82; £163.41 under policy; P0 vs comps; £289 under market P50); 20-26 Dec open at £1,233 (+6.6%)"},{"label":"Unsellable orphans","value":"2, both policy (P04 24 Nov, P06 29 Nov); P04 24-26 Dec arrivals stranded by min 4; P20 5 / 26 Dec sellable at +100%"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£780.30), 21-24 Nov (£613.70), 20-23 Nov (£617.95); day 20; arrival 20 Nov"},{"label":"P13 identical twin nights","value":"60 of 68 (Smoobu to 28 Feb); 138 of 146 next 180; 19 open nights in the PriceLabs window (19-21 Dec, 3-18 Jan)"},{"label":"Missed compression","value":"13 n / £348 (was 15 / £403); bookable 12 n / £313"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 20), arrival TOMORROW (20 Nov): unsynced Barking Airbnb 1455876748739910219 still sells the sold 20-24 Nov at £780.30 (18 Nov £741.40), 21-24 Nov £613.70, 20-23 Nov £617.95, plus 6-13 Dec £1,290.26, 13-20 Dec £1,282.97, 4-7 Jan £639.20; not offered on Christmas-NYE incl. the sold 27 Dec-4 Jan; the 20-24 Nov record was modified 18 Nov 17:30 (room unchanged); block 19 Nov-5 Jan today or unlist, then map to 3562176","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"critical","title":"TOMORROW: Smoobu block shortened from 18-20 Nov to 18 Nov only (18 Nov 16:16Z), so 19-24 Nov are open (£311/£334/£282/£292/£284/£278); Airbnb sells 20-23 Nov at £694.62 room against policy's delivery block - Corentin confirm or revert (re-block in Smoobu, or update policy and hold: 20-24 Nov P0 / -15.3% vs median, on the 1-review line); 22-24 Nov min 2 vs min 3 to 30 Nov: confirm or revert, and if open (your call) about -7% (P100, +20.5% over the line)","gbp":null},
{"id":"t-p20-guests-1911","status":"open","prop":"P20","priority":"high","title":"New: P20 Airbnb listing now shows 6 guests (personCapacity 6 on 19 Nov; 4 on 18 Nov 07:21Z) vs policy max 4 (Corentin 24 Oct): confirm or revert; if changed on purpose, record in policy and say whether Booking.com changed too","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Deadline tomorrow: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change","gbp":null},
{"id":"t-pl-push-1811","status":"open","prop":"P14 P06 P13 P11 P05 P04 P20","priority":"high","title":"Recurs: 7 Smoobu listings got no overnight PriceLabs refresh on 18 or 19 Nov; P14 last push 18 Nov 07:19Z (past 24 h at 07:19Z today); P06 crosses 24 h at 08:29Z, P13 twins and P11 12:15Z, P05 12:17Z, P04 and P20 12:20Z, Vrbo copies 12:34-12:36Z; only P01/P02/P03/P07/P08/P09/P10/P12 refreshed overnight; check last sync after 12:25Z, Sync Now if unmoved, and ask PriceLabs support why; price sync itself clean (0 open nights differ by more than £2)","gbp":null},
{"id":"t-bcom-nr-base-1811","status":"open","prop":"P04 (check all)","priority":"critical","title":"Kept open: +15% not evidenced - 18 Nov screenshots Standard still ceil(Smoobu x1.10) (2 Dec £471; at +15% £493); derived plans correct on those screenshots (NR x0.90, Weekly x0.85, Monthly x0.80, NR Weekly x0.82); live NOT CHECKED (AWS WAF); no Booking.com booking for about 56 h, 0 since +15%; send Standard screenshots for 2 Dec and 20 Dec (expected £493; P04 20-26 Dec £1,421 vs £1,360 at x1.10) and confirm the derived set-up on every flat","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P13 P05 P06 P04 P12","priority":"critical","title":"Day 21, not fixed: P04 27 Dec-4 Jan sold at £1,459 x 0.900 x 0.82 (to the penny), £163.41 under policy (0.900 tier £124.02 + weekly 18% £39.39); realised cost now £4,130.07 confirmed (£4,174.92 with the P04 18-20 Nov 0.850 estimate £44.85); remove hidden Smoobu Airbnb layers 0.850 (lead 0) / 0.765 (1-28 d) / 0.900 (29-59 d); open-card gaps (overlapping): P05 5-10 Jan £406.98, P20 14-19 Dec £321.87, P05 4-11 Jan £253.32, P13 14-19 Dec £233.89 / £210.33, P04 20-26 Dec £200.64; the P04 2-night 0.809 is resolved (£129 cleaning, 0.850); P12 Airbnb all-in below PriceLabs room on 30 Nov-3 Dec (NOT VERIFIED); P09 excluded","gbp":4130.07},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (now £284/£293/£246 = £823, min 3) are closed; confirm intent; if not, end the block 18 Dec (reopened 18-21 Dec -12.4% vs stored n=7, -6.1% vs band; parity, up to +6% supported); £823 x 0.900 = £741","gbp":741},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"7-8 Dec £950 (485/465) and 13-14 Dec £1,019 (518/501): P25 / -19% and P20 / -18% vs kept; qp +0.116, recommend +21.6%, +12% over median supported (about £707 / £735); DSO 7-8 Dec +3% -> about +34% and 13-14 Dec +5% -> about +33% to the median level (about £620 / £645 a night); 21 Dec £2,038 / 29 Dec £2,536 at +300% min 1 act as soft blocks (1.66x / 2.07x the 4 BR P90): confirm intent or, your call, +300% -> 0% (uncustomized £653 / £981); £667","gbp":667},
{"id":"a-discount-cut","status":"open","prop":"P05 P04 P11 P20","priority":"high","title":"Not done; four targets £141 next 13 / £1,069 next 30 (P05 8 n £674 -14.6%, P04 16 n £238 -8.4%, P11 15 n £210 -5.7%, P20 -£53 distorted by +100% on 5 Dec); all four still Aggressive occupancy + Booking Recency default; lesson today: the P04 occupancy cut (£1,734 -> £1,459) sold the NYE week at P0 vs comps and £289 under the market P50, costing about £157-203 on that stay (estimate); set Occupancy, Booking Recency and Last-minute to Custom 0% on P05, P04, P11, P20; P12/P13 excluded; expected £572 / 30 days","gbp":572},
{"id":"a-p13-record","status":"open","prop":"P13 P11 P05 P04 P20 P14","priority":"high","title":"For Corentin to confirm or revert Reyhan's 18 Nov 12:13-12:18Z edits (18 DSOs): P13 1 Dec +50% -> +25% (policy intentional; £278 -> £232, twin £194 -> £163); P11 darts 14-18 Dec -2% (14-17 Dec avg £229 vs >£300; revert to +5% about 234/236/243/269/335); P04 18-19 Nov min 2 sold £254.15 (record or restate the rule); P05 29 Nov-2 Dec -2% and P11 3-4 Dec -2% (3 Dec 273 -> 214) against 'cut PriceLabs discounts'; P20 5 / 26 Dec +100% min 1 (orphans sellable but £531 / £569; comp-west about £382 on 26 Dec = uncustomized; 5 Dec no comp); carried: P05 Jan/Feb -5%, P04 base 200 vs 220 (£94, not additive with a-p04-dec-1611), P04 6-22 Dec -5%, P14 min 450, P05 max 3500, P20 base 330 vs 350; £185","gbp":185},
{"id":"a-p04-dec-1611","status":"open","prop":"P04","priority":"high","title":"Not done: 6-16 Dec £1,577, -25% to -32% vs band (comps flat), about +20% supported: DSO 6-16 Dec -5% -> +14% (about 163-184); 17-18 Dec 146/150, -17.9% vs band, about +10%: split DSO 17-18 Dec -5% -> about +4.5%; hold 19-22 Dec (19 Dec now 175); re-read first if a-discount-cut is done on P04; +4% on 6-16 Dec instead if the base goes back to 220; £173","gbp":173},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Not fixed: synced Barking Airbnb weekly 18.0% vs policy 15% cost £39.39 on the 27 Dec-4 Jan sale; open 6-13 Dec -£164.59, 13-20 Dec -£167.19; Long stay 10% on 5-6 nights (-£95.04 on 20-26 Dec), not in policy: keep and record, or 0%","gbp":39.39},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 23-25 Dec £285/£263/£273, P38 / -10% kept (n=8), -7% wider -> DSO +5% -> about +15% (average about £300; supported £298-308; market soft -3.4 to -9.2 vs STLY); 3 Jan £172 -> about £195 (3-5 Jan -9% kept, supported £186-208); £34","gbp":34},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Worse: twins identical again after the 18 Nov 12:15Z refresh - 138 of 146 jointly open nights (next 180, Smoobu), 60 of 68 to 28 Feb, 19 open nights in the PriceLabs window (19-21 Dec 243/224/227 and 3-18 Jan; identical Airbnb cards on 3-8 Jan) despite 3090701's -10% DSO 2 Jan-28 Feb; DSO 3090701 +7% on 13-15 Dec (219/215/213 -> about 234/230/228; £25), 3064856 about -3% on 19-21 Dec (your call), 3090701 +3% on 3-18 Jan; Corentin to confirm","gbp":25},
{"id":"t-p04-xmas-1711","status":"open","prop":"P04 P13","priority":"high","title":"Partly overtaken: 27 Dec-3 Jan sold on Airbnb (£1,076.74 = 18 Nov PriceLabs £1,459 x 0.900 x 0.82; £163.41 under policy; P0 vs comps, -31% vs band, shortfall £286-552 est.; £289 under market P50; occupancy cut cost about £157-203, est.); left 20-26 Dec £1,233 (171/174/169/180/183/179/177, +6.6% as the band moved -15% -> -10%): hold 20-22 Dec, 23-26 Dec DSO -5% -> 0% (about +5%); min 4 on 23-26 Dec next to the 27 Dec booking makes 24-26 Dec arrivals unsellable - min 3 (policy floor) fixes it: for Corentin; £14","gbp":14},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): 22-29 Nov reopening (24-29 Nov sold); 22-23 Nov £260/£245 now P50 / -1% vs kept (n=2) because our Airbnb card rose (factor 0.766 -> 0.845), so hold - the +18% raise is withdrawn; if intended note in policy; if not re-block 22-23 Nov; 29 Nov min-4 orphan at £255: intended?","gbp":null},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"medium","title":"Reversed by the engine (+6-7% on 19 Nov 06:31Z, no edit): every open stay +3% to +28% vs band (qp -0.15, ceiling 0%); your call (lowers a price): 19-20 Nov DSO 0% -> -15% (251/319 -> about 213/271; 19 Nov tonight; P100 +16.6%), 30 Nov-3 Dec 0% -> -10% (261/286/282/282 -> about 235/257/254/254; 1-3 Dec +12.8%, 2-4 Dec +15.8%); pace -4.5% On track","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed, worse: Mile End 26 Nov £310 (was £294; £363 all-in, P100 +27.8% vs band n=5; uncustomized £255); DSO +15% -> about -17% (about £224; supported £206-243), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Partly fixed: 8 Dec min 1 (sellable) but +50% -> £292 (list all-in £485, P100 / +48% kept, +35% wider; uncustomized £253); comps support about £154-184 Smoobu room on a 1-night stay; your call (lowers a price): keep min 1, DSO +50% -> about -13% (about £170); not quantified","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Still live: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£192.78 on 5-10 Jan, -£203.00 on 18-23 Jan); weekly 15% matches policy; not in policy: keep and record, or set to 0%","gbp":192.78},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (not shown at 47-64 d) applied on the Valentine's stay (£195.24); not in policy - yours, or 0%?","gbp":195.24},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Still live: visible Airbnb 'Long stay discount' 10.0% on 5+ nights on both twins (14-19 Dec -£110.79 / -£99.63; 3-8 Jan -£77.13 each); not in the 21 Oct Shepherd's Bush rule set or policy LOS; keep and record, or set LOS 5+ to 0%","gbp":99.63},
{"id":"a-extra-guest","status":"open","prop":"P05 P11 P13 P04","priority":"medium","title":"New evidence: P05 8-guest Airbnb cards carry about £20/night extra (£100 on 5 n, £140 on 7 n) not set in Smoobu or PriceLabs (extra_person_fee 0) - is it your Airbnb extra-guest fee? Record it; then decide the extra-guest fee above 4 guests on the other flats","gbp":null},
{"id":"t-airbnb-flex15-1611","status":"open","prop":"P06 P20 P05","priority":"high","title":"No new booking on the three test flats; new: P06 22-24 Nov Airbnb card rose £518 -> £556 with Smoobu flat (implied factor 0.766 -> 0.845; cause NOT CHECKED); open the reservation price breakdowns (P06 24-29 Nov, P20 NYE £318.33, P05 Feb £211.78) and check what the Flexible test turned on; comparison 12 days overdue; £530.11 identified (included in a-airbnb-rules)","gbp":530.11},
{"id":"t-bcom-minstay-1811","status":"open","prop":"P04 (check all)","priority":"high","title":"Kept open, not verified (AWS WAF; no Booking.com booking since 16 Nov 22:52): confirm the Non-refundable (3), Weekly (7), Monthly (28) and NR Weekly (7) minimum stays are enforced now that these plans derive from Standard (24 Oct precedent: a 4-night stay priced on the Monthly plan)","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"high","title":"Unchanged: 9 of 25 post-cut Booking.com bookings cancelled (37.0% of gross room, £6,796.87); confirmed 16 / 70 n / £11,564.66; 0.97 gross / 0.62 confirmed a day, falling; 0 since +15%, none for about 56 h; plus the pre-cut P04 Christmas-NYE stay (£2,417.34); send rate plans and reasons","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P13 P12","priority":"medium","title":"Unchanged: send the extranet breakdown of the P13 Booking.com 22-27 Dec stay on 3064856 (£840.75 room = 0.6926 of list, a fit) and of P12 7-14 Dec; no promotion change proposed","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; 18% booster; nets £62.47 per £100); per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"t-p20-5dec-orphan","status":"done","prop":"P20","priority":"high","title":"Done (min-stay fixed): P20 5 Dec is sellable at min 1 since Reyhan's DSO of 18 Nov 12:17:39Z; but at +100% (£531 vs the planned about £265; above market P90 £424; P25 of 1-night 2-beds) - the price question moves to a-p13-record","gbp":null},
{"id":"t-p20-26dec-orphan","status":"done","prop":"P20","priority":"high","title":"Done (min-stay fixed): P20 26 Dec is sellable at min 1 since Reyhan's DSO of 18 Nov 12:17:57Z (the min-4 source question is moot); but at +100% (£569; comp-west supports about £382 = uncustomized) - the price question moves to a-p13-record","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Still 5.0 (1), 'New' in search, so comp-west keeps the 0-review line (median x 0.85); 20-24 Nov P0 / -15.3% vs median, on the line (hold); remaining: parking first photo, review requests after the December and NYE stays (target 3 reviews by 31 Dec); Flexible-test comparison 12 days overdue; listing now shows 6 guests (see t-p20-guests-1911)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback -4.5% (-3 n / -£179.77), On track (window effect, fragile); base +37.9% vs P50 £206; 7 open nights left (19-20 Nov, 26 Nov, 30 Nov-3 Dec); correct them via a-p12-trim and t-p12-26nov-price, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov now £272 / £191 (Reyhan +25% min 1 replacing about +50%, inferred) on Finals Weekend Friday: market P50 238 / P75 297, Δ +13.5 (most compressed open night), above the fortnight 240.2 but £25 under P75; 1 Dec is a policy conflict (a-p13-record); priced, confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps; no Free cancellation pill on ours (4 P13 and 2 P20 comps show it)","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced on the 14-18 Nov stay; now checked under t-bcom-minstay-1811; ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Hygiene (pricelabs M4): id_map _unmatched (Marylebone Vrbo x3) and 7 pricelabs_other ids no longer in PriceLabs - remove?; P02 Vrbo copy not pushed since 24 Feb; info pack out of date (every max, most bases, P14 min); P20 3547481 not in the pack (330 vs policy 350); Barking recommended base 'Unavailable'; Vrbo +8% / Direct -10% unconfirmed; kpi_pack gaps [] misses P04 24 Nov and P06 29 Nov; record in policy: Reyhan's 15 and 18 Nov edits and outcomes, P06 reopenings, P20 delivery dates and guest count, P04 2-night cleaning £129 and the synced P04 Airbnb listing","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No comp replaced; kept ids not returned: P06 917140285217729256 / 1452940332365117153, P14 x2, P17 x1 (7th day; pages 200, two gained reviews), new P06 673753763892997438 and P11 1515051936255130803; P04 1387112821878102742 not returned on any of 22 stays; P20 789954794593691037 only on probes (6th day); calendars NOT CHECKED; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy _units_0004 last pushed 24 Feb 2026, never refreshed; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown (also relevant to t-airbnb-flex15-1611)","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (22-27 Dec Booking.com stay is the standard 15.0% of room + cleaning)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P04","title":"P04 27 Dec-4 Jan sold on Airbnb at exactly the cut PriceLabs price x 0.900 x 0.82 (£1,459 x 0.738 = £1,076.74, booked 18 Nov 09:27 before the 12:20Z refresh); about -£203 vs the pre-cut £1,734 (estimate); 20-26 Dec still open, repriced +6.6% to £1,233 as the 31-60 d band moved -15% -> -10%; about £1,370 at band 0% (estimate)","evidence":"pricelabs C1 (2026-11-18 raw prices_3562176.json, live get_listing_prices, customizations, Smoobu reservation created-at)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still sells the sold 20-24 Nov at £780.30 (21-24 Nov £613.70, 20-23 Nov £617.95), day 20, arrival tomorrow; closed on all Christmas-NYE stays incl. the sold 27 Dec-4 Jan","evidence":"channel section 2 (live Airbnb 07:20:25-07:21:01Z); comp-east (£781)."},
{"agent":"channel","severity":"critical","ref":"P04 Portfolio","title":"Airbnb hidden layers day 21: the P04 NYE sale paid £163.41 under policy (0.900 tier £124.02 + weekly 18% £39.39); total £4,130.07 confirmed (£4,174.92 incl. P04 18-20 Nov 0.850 est.); new 0.850 tier at lead 0 resolves yesterday's 0.809","evidence":"channel sections 1, 5, 6 (Smoobu reservations; 21 live Airbnb searches 07:20-07:23Z)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 27 Dec-4 Jan sold at P0 vs comps: £152.34/n all-in vs band £221.31 (n=2) and stored £248.25 (n=1), -31% / -39%; supported room £1,363-1,628, shortfall £286-552 (estimate); 20-22 Dec in range (hold), 23-26 Dec hold to +5%; min 4 on 23-26 Dec strands 24-26 Dec arrivals - min 3 fixes it","evidence":"comp-east Priority 1 (quality_premium -0.15; 22 P04 stays checked 07:19-07:27Z)."},
{"agent":"market","severity":"high","ref":"P04","title":"P04 NYE sale £289 under the mixed 1-3 BR P50 at list (£84 under after the policy weekly); demand above STLY on all 8 nights (+1.7 to +17.9); the 17->18 Nov cut cost about £157 on the stay (estimate); 20-26 Dec about £44 under the matched P50; 6-19 Dec £176 under the mixed P50","evidence":"market section 2 (get_neighbourhood_data P04, 18 and 19 Nov pulls)."},
{"agent":"occupancy","severity":"critical","ref":"P20","title":"P20 Smoobu delivery block shortened from 18-20 Nov to 18 Nov only (modifiedAt 18 Nov 16:16:46): 19-24 Nov all open (£311-334), conflicting with policy block_20_21_nov; P04 18-19 Nov min 2 sold (£254.15); two new P04 bookings are the only booking activity since 16 Nov 22:52","evidence":"occupancy (live Smoobu reservations and rates 07:18:35Z; get_user_logs)."},
{"agent":"channel","severity":"high","ref":"P20","title":"Airbnb sells P20 20-23 Nov at £694.62 room against the delivery block (arrival tomorrow) and 22-24 Nov at £440.64 on Reyhan's min 2","evidence":"channel section 4 (p20_2023nov 07:21:40Z, p20_2224nov 07:21:53Z)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 Airbnb listing now shows 6 guests (4 on 18 Nov) vs policy max 4: confirm or revert; 20-24 Nov P0 / -15.3% vs median on the 1-review line (hold); 22-24 Nov P100, about -7%; 26 Dec +100% (£569) about -33% to £382 supported (n=1, = uncustomized); 5 Dec no comp","evidence":"comp-west P20 section (listing page personCapacity; 12 comps x 12 stays 07:19-07:26Z)."},
{"agent":"pricelabs","severity":"high","ref":"P13 P11 P04 P05 P20","title":"Reyhan made 18 DSO edits 18 Nov 12:13-12:18Z: P13 1 Dec +50% -> +25% (policy conflict; £278 -> £232); P11 darts 14-18 Dec -2% (avg £229.00 vs >£300); P04 18-19 Nov min 2 (sold); P05 29 Nov-2 Dec and P11 3-4 Dec -2% (against cut PriceLabs discounts); P20 5 / 26 Dec +100% min 1 (£531 / £569)","evidence":"pricelabs H1-H2 (get_user_logs listing 18-19 Nov; get_listing_date_overrides)."},
{"agent":"pricelabs","severity":"high","ref":"P14 P06 P13 P11 P05 P04 P20","title":"7 Smoobu listings got no overnight PriceLabs refresh on 18 or 19 Nov: P14 last push 18 Nov 07:19Z (past 24 h); P06 08:29Z and P13/P11/P05/P04/P20 12:15-12:20Z cross 24 h today; sync itself clean (0 open nights differ by more than £2)","evidence":"pricelabs C2 (listing_data last_date_pushed 06:55Z; live get_listing_prices P14)."},
{"agent":"channel","severity":"high","ref":"Portfolio","title":"Booking.com +15% not evidenced (18 Nov screenshots x1.10; 2 Dec £471 vs £493 expected); derived plans and plan minimums NOT CHECKED live (AWS WAF); no Booking.com booking for about 56 h, 0 since +15%; 25 gross / 16 confirmed / 37.0% cancelled since 24 Oct","evidence":"channel section 3 (reservations.csv; one plain search 07:24:44Z returned the WAF challenge)."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"PriceLabs raised P12 6-7% overnight with no edit, undoing a-p12-trim: every open stay +3% to +28% vs band (qp -0.15); 26 Nov £310 P100 +27.8% (about £205-240 supported); 19-20 Nov about -15%; 30 Nov-3 Dec about -10%","evidence":"comp-east Priority 2; pricelabs H4 (refresh 19 Nov 06:31Z)."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 twins identical again on 19 open nights (19-21 Dec, 3-18 Jan; identical Airbnb cards); supported: +7% on 3090701 13-15 Dec, about -3% on 3064856 19-21 Dec, +3% on 3090701 3-18 Jan","evidence":"comp-west P13 section; pricelabs H4 (138 of 146); channel section 4 (60 of 68)."},
{"agent":"comp-central","severity":"high","ref":"P05 P11 P06","title":"P05 7-9 / 13-15 Dec P25 / -19% and P20 / -18% vs kept (qp +0.116, recommend +21.6%, +12% over median supported); P11 darts -21% vs kept after Reyhan's -2%, 8 Dec +48%, 23-25 Dec -10%; P06 22-23 Nov now at the median (-1%) because our Airbnb card rose (factor 0.845): hold","evidence":"comp-central P05, P11, P06 tables (44 Airbnb searches 07:19-07:24Z)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 6-16 Dec still -25% to -32% vs band (comps flat; about +20% supported); 17-18 Dec -17.9% (about +10%); 19 Dec hold at 175","evidence":"comp-east Priority 1 (24 Nov and 6-19 Dec table)."},
{"agent":"pricelabs","severity":"medium","ref":"P05 P04 P11 P20","title":"a-discount-cut not done: four targets £141 next 13 / £1,069 next 30; the fall vs yesterday is the window shift and the P20 +100%, not discounts removed; all four still Aggressive occupancy + Booking Recency default","evidence":"pricelabs H3 (disc19.py; live customizations)."},
{"agent":"market","severity":"medium","ref":"P11 P04 P20","title":"Missed compression 13 n / £348 (was 15 / £403), bookable 12 / £313; £217 is P11 darts Round One, widened £30 by Reyhan's -2%; P20 orphans left the list at +100%","evidence":"market section 4 (analyse19.py)."},
{"agent":"occupancy","severity":"medium","ref":"Portfolio","title":"Last 30 57.4% / ADR £168.66 / RevPAR £96.78 / £40,646.92 / 241 n with P04 entering for the first time (like-for-like 221 n / 56.7%); next 30 57.9% (136/235), next 60 47.2% (196/415); net pickup +38 n / +£6,967.33 (the two P04 sales)","evidence":"occupancy (kpi_pack portfolio_last30; live Smoobu 07:18:35Z; pick_rise.py)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12 P04","title":"18 Oct base rises unchanged a third day: +25 n / +£7,329.70 like-for-like, +34 / +£9,196.31 incl. P06; no raised-unit booking since 13 Nov; P04 comparison +47 n / +£5,933.67","evidence":"occupancy base-rise section (full recompute from the 19 Nov pull)."},
{"agent":"channel","severity":"medium","ref":"P05 P13 P04","title":"Long stay 10% on 5-6 n live on P05 (-£192.78 / -£203.00), P13 twins (-£110.79 / -£99.63) and P04 (-£95.04); new about £20/night extra on P05 8-guest cards not set in Smoobu or PriceLabs","evidence":"channel sections 4 and 7."}
],
"top5":[
"P04 Barking's NYE week sold at the bottom of the market the day after PriceLabs cut it: Airbnb 27 Dec-4 Jan paid £1,076.74 room (£134.59/n) = 18 Nov PriceLabs £1,459 x 0.900 x 0.82 to the penny; £163.41 under policy, P0 vs comps (-31% vs band, shortfall £286-552 est.), £289 under the market P50; the occupancy cut cost about £157-203 (estimates). Left: 20-26 Dec £1,233 - hold 20-22, 0 to +5% on 23-26; min 4 on 23-26 Dec makes 24-26 Dec arrivals unsellable, min 3 fixes it (your call). Lesson: strengthens a-discount-cut.",
"Two Friday arrivals at risk tomorrow: 1455 still sells the sold 20-24 Nov (£780.30, day 20) - block it today; P20's Smoobu delivery block was shortened to 18 Nov only (18 Nov 16:16Z), so 19-24 Nov are open and Airbnb sells 20-23 Nov (£694.62 room) - confirm or revert; P20's Airbnb listing now shows 6 guests (policy 4) - confirm or revert.",
"Reyhan's 18 Nov edits to confirm or revert: P13 1 Dec +50% -> +25% (policy), P11 darts -2% (avg £229 vs >£300), P04 18-19 Nov min 2 (sold £254.15 - record it), P05 29 Nov-2 Dec and P11 3-4 Dec -2% (against cut PriceLabs discounts); P20 5 / 26 Dec now sellable but doubled (£531 / £569; comps support about £382 on 26 Dec).",
"Discount layers remain the biggest controllable leak: Airbnb hidden layer £4,130.07 confirmed (day 21); PriceLabs £1,069 next 30 on the four targets (£572 expected); Booking.com +15% not yet evidenced (2 Dec £471 = x1.10) and no Booking.com booking for about 56 h. Your direction covers it: keep Booking.com discounts, cut PriceLabs discounts.",
"Engine moves with no edit and a refresh gap: the engine undid a-p12-trim (+6-7%; 26 Nov £310 vs about £224); P13 twins identical again (138 of 146 nights); P04 6-16 Dec +20% and P05 7-8 / 13-14 Dec to the median still supported; P01 18-20 Dec block holds £823; 7 listings missed the overnight PriceLabs refresh (P14 past 24 h) - check after 12:25Z."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked at £284/£293/£246 (£823); if reopened 18-21 Dec -12.4% vs stored (n=7), -6.1% vs band, parity supported (£741); 100% of 11 non-blocked nights booked; base-rise 0."},
{"ref":"P02","change":"Intentional block; pushed 19 Nov 00:32Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 19 Nov 03:01Z via Channex."},
{"ref":"P04","change":"Two Airbnb sales: 27 Dec-4 Jan £1,076.74 room (£1,459 x 0.900 x 0.82; £163.41 under policy; P0 vs comps; £289 under market P50; occupancy cut cost about £157-203 est.) and 18-20 Nov £254.15 (Reyhan's min 2); 20-26 Dec £1,157 -> £1,233 (+6.6%), min 4 strands 24-26 Dec; 6-16 Dec £1,577 (-25% to -32% vs band, +20% supported); 1455 still sells the sold 20-24 Nov (£780.30, day 20); enters last-30 (20 n, £2,398.11); fwd30 50.0% vs 23%, fwd60 38.3% vs 19%; pickup +1 n / -£596.86."},
{"ref":"P05","change":"No booking; 7-8 Dec £950 / 13-14 Dec £1,019, -19% / -18% vs kept (to the median about £620 / £645); 29 Nov-2 Dec -2% (Reyhan) to £1,981; 21 / 29 Dec £2,038 / £2,536 at +300% min 1; Long stay 10% on 5 n still on; new about £20/night extra on 8-guest Airbnb cards (source NOT CHECKED); fwd30 73.3% vs 46%."},
{"ref":"P06","change":"22-23 Nov £260/£245 now at the kept median (-1%, n=2) because our Airbnb card rose (factor 0.766 -> 0.845): hold; 29 Nov min-4 orphan £255; refresh 18 Nov 08:29Z crosses 24 h today; numbers only (policy); fwd 72.7% of 11 non-blocked vs 51%."},
{"ref":"P07","change":"Intentional block; pushed 19 Nov 04:02Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Handed back: last night 18 Nov (booked); now out of every window."},
{"ref":"P11","change":"No booking; Reyhan -2% on 3-4 and 14-18 Dec: darts 14-17 Dec avg £229.00 (-21% vs kept; conflict), 3 Dec 273 -> 214; 8 Dec £292 (+48% vs kept); 23-25 Dec 285/263/273 (-10% kept); 3 Jan £172; 22-27 Nov +25% to +28% over kept on list (hold); recommended base 281 -> 280; fwd30 46.7% vs 50% (Soft)."},
{"ref":"P12","change":"Engine raised open nights 6-7% overnight with no edit (19-20 Nov 251/319, 26 Nov £310, 30 Nov-3 Dec 261/286/282/282), undoing a-p12-trim; every open stay +3% to +28% vs band; pace -4.5%, On track (window effect); base-rise +11 / +£1,660.21."},
{"ref":"P13","change":"Twins identical again on 19-21 Dec and 3-18 Jan (138 of 146 nights; identical Airbnb cards); 13-18 Dec still about 10% apart (+7% on 3090701 13-15 Dec supported); Reyhan +25% on 27 Nov (£272) and 1 Dec (£232, policy says +50%); fwd30 73.3% vs 47%; pickup +8 n / +£1,309.69."},
{"ref":"P14","change":"Numbers only: last PriceLabs refresh 18 Nov 07:19Z (past 24 h); 74 of 180 open nights at £450; P100 / +49% to +116% vs kept; 0% vs 47%."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only (145-160.50)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only (kept median 4.68)."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"Smoobu delivery block shortened to 18 Nov only (18 Nov 16:16Z): 19-24 Nov open, Airbnb sells 20-23 Nov £694.62 room (confirm or revert); Airbnb listing now shows 6 guests (policy 4); orphans 5 / 26 Dec sellable at min 1 but +100% (£531 / £569; t-p20-5dec-orphan and t-p20-26dec-orphan done, price in a-p13-record); 20-24 Nov P0 / -15.3% vs median, hold; 22-24 Nov about -7%; fwd30 60.0% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 11 non-blocked nights booked to the 20 Dec handback; base -5.2% vs P50 £267; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (rec Unavailable)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended (£94, not additive with a-p04-dec-1611); ask PriceLabs why the recommendation is missing","reason":"6-16 Dec -25% to -32% vs band; NYE sold at P0 vs comps after the occupancy cut, not the base; 50.0% vs 23% next 30, 38.3% vs 19% next 60; base +15.6% vs 2 BR P50 £173, -6.1% vs P75 £213 (comp-east; occupancy; pricelabs C1 and M3)."},
{"ref":"P05","base":"550 (rec 538)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 46%; 7-8 / 13-14 Dec -19% / -18% vs kept; qp +0.116; recommend +21.6%; base -2.7% vs 4 BR P50 £565 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 8 of 11 non-blocked nights booked (72.7%) vs 51%; 22-23 Nov at the median; base -12.9% vs P50 £410 (occupancy; comp-central; pricelabs M3)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 280, was 281)","recommendation":"Hold 286","reason":"46.7% vs 50% (Soft); 22-27 Nov +25% to +28% over kept on list while December is -9% to -21%; base -2.1% vs P50 £292; levers are date overrides (darts, 2-4 Dec, 23-25 Dec, 3 Jan) and a-discount-cut (comp-central; occupancy; pricelabs M3)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim, t-p12-26nov-price), not the base","reason":"72.0% to handback vs 43%; pace -4.5% (On track, window effect); every open stay +3% to +28% vs band with qp -0.15 after the engine's +6-7%; base +37.9% vs P50 £206; 7 open nights before the 13 Dec handback (comp-east; occupancy; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 241)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 47% next 30, 56.7% vs 37% next 60; base +13.1% vs P50 £221; December at or near the 2 BR median (comp-west; occupancy; pricelabs M3)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 47%; P100 / +49% to +116% vs kept at £450; 74 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"60.0% vs 38% (30 d), 53.3% vs 30% (60 d); 5.0 (1), still priced on the 0-review line; base +28.9% vs P50 £256; 20-24 Nov on the line, December -6% to -12% vs median (occupancy; comp-west; pricelabs M3)."}
]}
```

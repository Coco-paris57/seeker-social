# Seeker Estates - Daily revenue report, 2026-11-18 (Wednesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval. Where a PriceLabs refresh is needed, you or Reyhan press Sync Now; Claude does not.**

**Inputs**
- `reports/2026-11-18/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-18/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-17/daily-report.md` and its JSON, the dashboard action list (18 Nov, before this step), the full id list, and the overnight brief.
- **The session container was rebuilt overnight.** The 17 Nov snapshot (`data/snapshots/2026-11-17/`, including `reservations.csv`, `comps.csv`, `market.csv`, `channel_checks.csv`) and yesterday's scratch files no longer exist.
  - Every day-on-day comparison below therefore uses the **committed `reports/2026-11-17/` files**, not a file diff.
  - The occupancy agent reproduced yesterday's windows on today's Smoobu pull (144/243 and 198/423 recount exactly), so the forward figures are comparable.
  - The 18 Nov `comps.csv`, `market.csv` and `channel_checks.csv` were created fresh by the agents today. kpi_pack was built before that, so its `missing` block lists all three as empty and ARI / RGI / price percentiles are null.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (18 Nov). **No PriceLabs edits since 15 Nov 19:17Z:** `get_user_logs` returned 0 entries for listing, group and account, 17-18 Nov (pricelabs). Every overnight price move is the engine's own, from the 17 Nov 09:08-09:10Z refresh (P12 18 Nov 06:43Z, P14 18 Nov 07:19Z).
- I used no guest data and no booking or reservation reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 22-29 Nov opening is still your question (t-p06-2229open). The P06 price figure below is conditional on you confirming the opening.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701). The twins must keep slightly different prices, never identical.
- **P04 "never open for fewer than 3 nights" is respected.** No min-1 or min-2 proposal on P04. The NYE question asks about min 3-4, which policy allows.
- Not raised again: the Booking.com +10% markup, Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 (fully out), P10 after 18 Nov (tonight is its last), P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price, t-p11-8dec-orphan and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **P04 Christmas: sync is done, but the price moved.** Yesterday's plan asked you or Reyhan to press Sync Now. PriceLabs re-read Barking itself at **17 Nov 09:09:57Z** and now shows 20 Dec-1 Jan open (pricelabs C1, channel §1, comp-east). The "press Sync Now" part of t-p04-xmas-1711 is overtaken. The price part is now live (see the next section).
2. **P04 Christmas target: market vs comps.** market says the market supports **£2,417 (the cancelled sale) to £2,849 (P75)**. comp-east, applying `quality_premium(4.2, 4.83)` = -0.15 and `recommend` (raise +5% at 31-60 d), supports about **£2,545** (20-22 Dec hold, 23-26 Dec +10%, 27 Dec-1 Jan +15%). pricelabs sized the DSO needed to hold yesterday's **£2,733**. **I size from comp-east (the positioning rules) and use the market range as the ceiling: target £2,545-£2,733.** Both are under P75.
3. **P04 next 30: 46.7% (14/30, occupancy, Smoobu)**, not kpi_pack `forward_occ_30` 48.3% (14 of 29 price nights) or `pl_kpis` 50%. I use occupancy.
4. **P20 next 30: 64.3% (18/28 non-blocked, occupancy)** vs comp-west 60.0% (18/30, delivery block not excluded). I use occupancy.
5. **P06 29 Nov.** occupancy (Smoobu `/api/rates` 07:19Z) lists it as an orphan at £254, min 4. comp-central (`prices.csv`) reads it as unavailable since overnight, with no reservation. **Either way it cannot sell.** Why it closed is NOT CHECKED. It sits next to the intentional block from 30 Nov, so it stays numbers only, inside t-p06-2229open.
6. **P13 3090701 22-26 Dec.** The brief says "Booked on both twins". pricelabs H1: 3064856 is Booked (ADR 140.13 = £840.75 / 1.2 / 5); 3090701 has a blank status and `user_price` -1 (closed). It is not offered anywhere, so the label is cosmetic.
7. **P13 identical twin nights.** pricelabs: **121 of 146** jointly open nights identical over the next 180, all in one run, 17 Jan-17 May. channel: **43 of 68** in Smoobu to 28 Feb. Different windows, same direction (yesterday 124/145 and 48/69).
8. **P04 NYE "Long stay" discount size.** comp-east says 8.6% (of the £1,018.60 card incl. cleaning). channel says **10.0% of room** (£87.66 of £876.60). Same £87.66; I use channel's room basis.
9. **P04 Booking.com list for the block.** pricelabs about £2,537 (x1.10 on the total) vs channel **£2,544** (ceil x1.10 per night, as Smoobu prices it). I use £2,544. Display NOT CHECKED (AWS WAF).
10. **P12 2-3 Dec.** pricelabs says 263/268 is at yesterday's target. comp-east says 2-4 Dec is still +15.5% vs the band (P70) against a 0% quality ceiling, so about -5% more. I use comp-east (comp evidence).
11. **a-p20-dec-1711.** pricelabs calls it "partly done" (16-18 Dec average £315 vs the ~£292 target). comp-west says 16-19 Dec is now **P38 / -2.6% vs the comp median**, within £8/night of the -5% level the target was sized on, and the Airbnb price falls further as 17-18 Dec cross 28 days. **I use comp-west: done (self-corrected by the engine).**
12. **P20 5 Dec orphan day count.** occupancy says day 10; pricelabs and comp-west say day 9. Yesterday's report said day 8. I use **day 9**.
13. **P11 darts average.** £236.75 on 14-17 Dec (occupancy, pricelabs) vs £252.20 on 14-18 Dec (comp-central, includes 18 Dec £314). Policy is about the darts nights 13-17 Dec, so I use **£236.75**.
14. **P05 21 / 29 Dec.** The brief quotes £2,054 / £2,563 (PriceLabs `user_price`). The pushed price (= Smoobu) is **£2,039 / £2,569** (occupancy, pricelabs). I use the pushed price.
15. **P04 base-rise comparison group (occupancy correction).** Yesterday's "+£4,532.72 -> +£2,115.38" does not reproduce. Counting the six import-batch records at `reservations.csv` `total_gbp`, P04 is **+37 n / +£4,602.78**. The raised-group figures are not affected.
16. **Base vs market.** pricelabs M3 says UNKNOWN for most refs because `market.csv` was empty when it ran. market §1 later wrote the bedroom-matched P50s to `market.csv`. **The base review below uses market §1.**
17. **Rate leak (kpi_pack) is overstated by VAT** (channel §7). Corrected: P04 -9.3%, P11 -27.7%, P12 -25.3%, P13 -34.9% (pack -21.2% / -39.8% / -37.7% / -41.0%).

## Executive summary

1. **P04 Barking Christmas-NYE: PriceLabs registered the cancellation itself, then cut the block 15.6%.**
   - 20 Dec-1 Jan (13 n) went **£2,733 -> £2,306** (162/162/159/169/173/167/165/175/192/193/194/201/194). Min stays are unchanged at 3/3/3/4/4/4/4/7/5/5/5/5/4.
   - **Cause: the Aggressive occupancy profile.** The 31-60 day band applies -15% at 10% occupancy, and Smoobu has 0 of 30 nights booked in that band (pricelabs C1). No edit, no DSO change.
   - The cut is uniform on every open night 17 Dec-16 Jan: **£5,751 -> £4,858 (-£893 on 31 nights)**. 17 Jan (day 61) is unchanged.
   - **The market held:** P50 £2,233 / P75 £2,849 (17 Nov £2,246 / £2,880). Occupancy is above last year on all 13 nights (+1.7 to +17.9 points; 31 Dec +17.9). The market's December booking window is 19-23 days, so most demand has not booked yet (market §2).
   - **Comps held too.** Both priced comps are within £1 of 17 Nov. Our 3-4 night stays went from in range to -12.5% / -17.9% vs the band; 28 Dec-2 Jan is -26% (n = 2) (comp-east).
   - **It will cut further with no edit.** From 20 Nov, 20 Dec enters the 16-30 day band (-20% at up to 20% occupancy). That is inferred from the customization table, not observed (market).
   - Synced Airbnb now sells the 13 nights at **£1,701.83 room (0.738x)**, £715.51 below the lost Booking.com stay (£2,417.34) (channel §1).
   - **Decision for you (one, not both):** (A) set P04's occupancy profile to Custom 0% under a-discount-cut, or (B) raise the 20 Oct DSOs (20-31 Dec -5% -> about +12.6%, 1 Jan -2% -> about +16%; estimate). Target £2,545-£2,733. I recommend (A), because (B) leaves the engine cutting again from 20 Nov.
   - The NYE min 7 (27 Dec) / 5 (28-31 Dec) still blocks every 2-4 night NYE stay. Comps sell 31 Dec-2 Jan at £192.50-248.50 and policy allows min 3. That is your question.
2. **Two Friday (20 Nov) arrivals still at risk.**
   - **t-p04-doublebook, day 19:** unsynced Barking Airbnb 1455876748739910219 still sells the sold 20-24 Nov at **£741.40** (comp-east £742), plus 21-24 Nov £584.60 and 18-21 Nov £571.00 (channel §2).
   - **t-p20-delivery, 2 days out:** 20 Nov £317 and 21 Nov £331 (min 3), 22 Nov £278 (min 2) are open against the policy delivery block. Airbnb sells 20-23 Nov at **£708.38 room** (channel §4).
   - P04 18-19 Nov min 2 (check-in today) did **not** sell (£158/£159). P20 22-24 Nov min 2 is on sale at £820 (Airbnb £422.28 room). Both still need your confirm-or-revert.
3. **No booking activity for about 32 hours.**
   - The last booking was made 16 Nov 22:52 (P13). Nothing was made or cancelled on 17-18 Nov (occupancy).
   - The 7-day net pickup rose to **+28 n / +£5,636.44** only because the window moved: two cancellations dated 11 Nov dropped out (P11 8-15 Dec £1,012.86, P20 21-25 Nov £638.54).
   - 717 -> 716 Smoobu reservations is the 365-day window rolling (a P12 stay of 14-17 Nov 2025 left it); nothing was deleted.
4. **Price gaps (all engine moves, no edits).**
   - **P04 6-16 Dec £1,575**, -25% to -36% vs comps: +20% supported. **17-19 Dec was cut 15-20% at the 30-day edge** (182/188/194 -> 146/159/164): +10% supported (comp-east).
   - **P05 7-8 / 13-14 Dec** -18% / -15% vs comps (comp-central); the engine raised them 5-6%, but a kept comp also rose. To the median: about £620 / £619.
   - **P11 darts** 14-17 Dec average £236.75: -22% vs kept, against your 21 Oct ">£300" (conflict). **8 Dec £288 is still +84% vs kept.** 23-25 Dec is -12% vs kept.
   - **P06 22-23 Nov** -13% vs kept (n = 2): about £299 if you confirm the opening.
   - a-discount-cut: **£92 next 13 / £1,236 next 30**, plus the P04 occupancy cut above (-£893), which the metric does not capture.
   - Missed compression: **15 n / £403** (yesterday 18 / £410; the market agent rebuilt the method, so part of the change is method).
5. **Self-corrections and closures.**
   - **a-p20-dec-1711 done:** the engine cut 16-18 Dec 6.3% (£1,008 -> £945). 16-19 Dec is now -2.6% vs the comp median (comp-west).
   - **a-p12-trim mostly done by the engine:** 18-19 Nov 268/268 -> 225/234, 2-3 Dec 299/308 -> 263/268. **26 Nov is still £294 vs about £224 supported** (t-p12-26nov-price). P12 pace is back to **On track (-7.7%)**, a window effect.
   - **P13 twins split by PriceLabs:** 3090701 is now 0.90x 3064856 on 13-17 Dec. +6% on 3090701 13-15 Dec is supported (comp-west). 121 of 146 nights are still identical from 17 Jan.
   - **t-p06-1521open done (lapsed):** 16-17 Nov passed unsold (17 Nov £230); 18-21 Nov sits inside the booked 18-22 Nov stay.
6. **Airbnb hidden layer, day 20:** £3,966.66 realised (no new Airbnb booking). Largest open-card gaps: P05 5-10 Jan £409.83, P20 14-19 Dec £275.57, P04 13 n £258.27 (channel §3, §6).
7. **Booking.com since 24 Oct: unchanged.** 25 gross / **16 confirmed** / 70 n / £11,564.66; 9 cancelled = **37.0% of gross room** (channel §5).

**Last 30 nights (19 Oct-17 Nov, 13 units):** occupancy **57.4%**, ADR **£172.50**, RevPAR **£99.08**, revenue **£38,640.95**, **224 nights** (kpi_pack `portfolio_last30`, exact; reproduced by occupancy). Yesterday: 59.0% / £172.90 / £101.97 / £39,766.52 / 230 n. Reconciliation: 18 Oct leaves (-10 booked), 17 Nov enters (+4): 230 - 10 + 4 = 224.

**Next 30 (18 Nov-17 Dec):** **58.8%** booked (140/238; yesterday 59.3%, 144/243). **Next 60 (18 Nov-16 Jan):** **46.2%** (193/418; yesterday 46.8%, 198/423).
- Source: occupancy section, live Smoobu GET 07:19:57Z, handback-aware. Reservations and `/api/rates` agree on every unit-night. Smoobu is the truth.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, and nights after each handback.
- Reconciliation, next 30: 0 new and 0 cancelled inside the window; 17 Nov out -5; 17 Dec in +1. 144 - 5 + 1 = 140.
- Reconciliation, next 60: 198 - 5 (17 Nov) + 0 (16 Jan) = 193.
- PriceLabs now agrees with Smoobu on P04 (kpi_pack `forward_occ_60` 23.7%, was a stale 45.8%) and P13 (57.6%).

**7-day pickup (bookings made 12-18 Nov, to 07:19Z):**
- Gross: 10 bookings / 49 n / £9,581.28. Still confirmed: 9 / 44 n / £8,734.18 (equals kpi_pack `pickup_7d`).
- Cancelled in the window: 3 / 21 n / £3,944.84 (P04 20 Dec-2 Jan £2,417.34, P11 26-29 Nov £680.40, P13 18-23 Dec £847.10).
- **Net: +28 n / +£5,636.44** (yesterday +17 n / +£3,985.04).
- Reconciliation: 17 + 7 + 4 = 28 n; £3,985.04 + £1,012.86 + £638.54 = £5,636.44. **The rise is the window moving, not bookings.**

## P04 Christmas-NYE after the repricing

**Source:** pricelabs C1, market §2, comp-east Priority 1, channel §1. Room = Smoobu = PriceLabs `price`.

| 13 nights, 20 Dec-1 Jan | £ | Source |
|---|---|---|
| Smoobu / PriceLabs 17 Nov (before the refresh) | 2,733 | pricelabs `user_price` |
| **Smoobu / PriceLabs now** | **2,306** (£177.38/n; -£427, -15.6%) | pricelabs, occupancy, channel |
| Uncustomized now (17 Nov) | 2,833 (3,473); fell by the same ~16% | pricelabs |
| Market daily P50 / P75 (1-3 BR mix; est. matched 2 BR P50 about 2,450) | 2,233 / 2,849 | market §2 |
| Cancelled booking (room) | 2,417.34 | occupancy |
| comp-east supported (20-22 Dec hold, 23-26 Dec +10%, 27 Dec-1 Jan +15%) | about 2,545 | comp-east |
| Booking.com list at +10% (before promotions; display NOT CHECKED) | 2,544 | channel §1 |
| Synced Airbnb 13 n card, room after the 0.900 tier and 18% weekly | 1,701.83 (0.738x) | channel §1 |

| Stay | Our Airbnb all-in £/n | Band median (n), vs | Supported room £/n (comp-east) |
|---|---|---|---|
| 21-24 Dec (3 n) | 194.33 | 222 (5), -12.5% (in range) | 159-187: hold |
| 23-27 Dec (4 n) | 187.25 | 228 (5), -17.9% | 174-205: about +10% |
| 28 Dec-2 Jan (5 n) | 186.20 | 252.60 (2), -26.3% | 225-264: about +15% (n = 2; PriceLabs market P59-P62 argues for the low end) |
| 31 Dec-2 Jan (2 n) | not bookable (min 5) | 220.50 (2): £192.50 / £248.50 | policy min 3 |

- **The two options do not add up. Choose one, then re-read prices.**
  - **(A) a-discount-cut on P04: Occupancy profile -> Custom 0%.** Reverses the ~-15% on all 31 nights 17 Dec-16 Jan (estimate: block about £2,700) and stops the -20% step from 20 Nov. It is your direction (cut PriceLabs discounts). **Recommended.**
  - **(B) DSO only:** 20-31 Dec -5% -> about **+12.6%**, 1 Jan -2% -> about **+16%** (x1.185 to hold £2,733; estimate, assumes the bucket stays at -15%). For £2,545 instead: about +5% / +8%. This leaves 17-19 Dec and 2-16 Jan cut, and the engine will cut again from 20 Nov, so the DSOs would need raising again.
- **The 20 Oct DSOs were carried in with the listing** (`created_at` 69 s after the listing was created at the Smoobu migration, the same day the cancelled stay was booked). The -5% / -2% and the min 4-7 on 23 Dec-1 Jan were set for a sold block, not an open Christmas (pricelabs; inference from timestamps, to confirm with you or Reyhan).
- **Min stay (your question, unchanged):** 27 Dec min 7 and 28-31 Dec min 5 block 27 Dec-2 Jan and every 2-4 night NYE stay. The market's median booked LOS was 2 (Dec 2025) and 3 (Dec 2024). Policy allows min 3.
- **1455** is still not offered on any Christmas-NYE stay (5 exhaustive searches): no double-booking exposure on the block. Why it is closed is NOT CHECKED.

## Reyhan's PriceLabs edits: none since 15 Nov

`get_user_logs` returned 0 entries (listing, group, account, 17-18 Nov); the 15-18 Nov control returns the same 25 edits. **The confirm-or-revert list (a-p13-record), with today's numbers:**
- **P04 18-19 Nov +10% min 2** vs your never-under-3 rule. Check-in was today and it did **not** sell (£158/£159; synced Airbnb 18-20 Nov £256.45 room, 0.809, source of the 0.809 NOT CHECKED). After today 19 Nov is a single night at min 2.
- **P20 22-24 Nov min 2** vs min 3 to 30 Nov: on sale at £278/£274/£268 = £820; Airbnb £422.28 room.
- **P11 darts 14-18 Dec:** no price override (min-stay only) vs your +5% / >£300. 14-17 Dec average **£236.75**; comps support about £290-332 room (comp-central).
- **P05 Jan/Feb -5%**, **P04 base 200** (your 220), P04 6-22 Dec -5%, P14 min 450, P05 max 3,500, P20 base 330 (your 350).
- **Removed from the list: P13 twins identical on 13-16 Dec.** PriceLabs split them on 17 Nov (now in t-p13-twins).

## Base review

`base_price` is unchanged on every listing (pricelabs). Base vs market P50 uses market §1 (bedroom-matched `summary_table`, 18 Nov).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 12 non-blocked nights to the 20 Dec handback; base -5.2% vs P50 £267 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (your 220)** / **"Unavailable"** | 46.7% vs 23% next 30, 23.3% vs 19% next 60; 6-19 Dec -19% to -36% vs comps; the Christmas cut is the occupancy profile, not the base; base +14.9% vs 2 BR P50 £174, -6.5% vs P75 | **Conflict: confirm 200 or revert to 220.** Revert recommended (£88, not additive with a-p04-dec-1611). Ask PriceLabs support why the recommendation is missing |
| P05 | 550 / **538** | 73.3% vs 46%; 7-8 / 13-14 Dec -18% / -15% vs kept; qp +0.15; `recommend` +25%; base -3.2% vs 4 BR P50 £568 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 75.0% of 12 non-blocked vs 51%; base -12.7% vs P50 £409 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / 281 | 46.7% vs 50% (Soft); 18-27 Nov +16% to +23% over kept on list; December -11% to -22%; base -1.4% vs P50 £290 | **Hold 286.** Levers are date overrides (darts, 23-25 Dec, 3 Jan) and a-discount-cut |
| P12 | 284 / 284 | 69.2% to handback vs 42%; pace -7.7% (On track, window effect); open stays +4% to +23% vs band with qp -0.15; base +37.9% vs P50 £206; 8 open nights left | **Hold 284; correct the open nights by DSO** (a-p12-trim, t-p12-26nov-price) |
| P13 | 250 / 241 | 76.7% vs 47% next 30, 58.3% vs 37% next 60; base +13.6% vs P50 £220 | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 48%; P100, +49% to +114% vs kept; 75 of 180 open nights at £450 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 64.3% of 28 non-blocked vs 38%; 55.2% vs 30% next 60; first review 5.0 (1); base +28.9% vs P50 £256 | **Conflict: confirm 350 or record 330** |

## What changed since 17 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+25 n / +£7,329.70** (unchanged, second day) |
| Raised, including P06 | **+34 n / +£9,196.31** (made 28 / 108 n / £23,831.63; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +51 n / +£9,443.82 (unchanged) |
| P13 (comparison) | +27 n / +£4,704.65 (unchanged) |
| P04 (comparison) | **+37 n / +£4,602.78** (corrected; see correction 15) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 0 / £0; **P05 +16 / +£6,135.19**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21.
- **No raised unit has had a booking or a cancellation since 13 Nov.**
- **Reading: hold the bases.** Without P05 the raised group like-for-like is +9 n / +£1,194.51. Caveats stand: the markup changes, promotions, Reyhan's overrides and the P06 reopening cannot be separated out (n = 1-9 bookings per flat).

### Per property
| Ref | Change since 17 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked, now 279/276/245 (£800). If reopened: £316.33/n all-in = -14.4% vs stored median £369.67 (n = 7), -8.3% vs band; parity supported. 100% of 12 non-blocked nights. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight (P03 via Channex 02:56Z). P02 Vrbo copy stale since 24 Feb. |
| P04 | **Christmas registered by PriceLabs (17 Nov 09:09:57Z) and cut £2,733 -> £2,306 (-15.6%) by the occupancy profile; -£893 on 17 Dec-16 Jan.** Airbnb 13 n £1,701.83 room. **17-19 Dec 182/188/194 -> 146/159/164.** 6-16 Dec £1,575 (-25% to -36% vs comps). 18-19 Nov min 2 not sold. 1455 still sells the sold 20-24 Nov (£741.40), day 19. Fwd30 46.7% vs 23%; fwd60 23.3% vs 19%. Pickup -9 n / -£1,927.75. |
| P05 | No booking. 7-8 Dec £463/£460 -> £487/£486, 13-14 Dec £488/£474 -> £516/£500 (engine): still -18% / -15% vs kept. 21 Dec £2,039 / 29 Dec £2,569 (+300% min 1). Long stay 10% on 5-n stays (-£194.13 / -£202.60). Airbnb 18-22 Nov stay modified 17 Nov (dates and amount unchanged; what changed NOT CHECKED). Fwd30 73.3% vs 46%. |
| P06 | 22-23 Nov 265/249 -> 261/247: -13% vs kept (n = 2), about £299 supported if the opening is confirmed. 29 Nov closed overnight with no reservation (comp-central) / orphan at min 4 (occupancy); cause NOT CHECKED. 16-17 Nov lapsed unsold. Airbnb 24-29 Nov stay modified 17 Nov (amount unchanged). Numbers only (policy). |
| P08 | Handed back. |
| P09 | No sellable night before the 26 Nov handback. |
| P10 | Tonight is the last night before the handback (booked). |
| P11 | No booking. Darts 14-17 Dec £229/£227/£233/£258 (average £236.75): -22% vs kept (conflict). 8 Dec £310 -> £288, still +84% vs kept. 23-25 Dec £291/£276/£273: -12% kept. 3 Jan £170. 18-27 Nov +16% to +23% over kept on list (hold). Fwd30 46.7% vs 50% (Soft). |
| P12 | **Engine cut overnight:** 18-19 Nov 268/268 -> 225/234, 26 Nov 307 -> 294, 2-3 Dec 299/308 -> 263/268. **Pace -7.7%, On track** (was -10.7% Soft; window roll). 26 Nov still P100 / +23.2% vs band. |
| P13 | **Christmas stay now in PriceLabs.** **Twins split:** 3090701 0.90x 3064856 on 13-17 Dec (220/215/213/217/225 vs 244/239/236/241/250), +5-6% on 18-21 Dec and 3-16 Jan. 3090701 13-15 Dec at -6.2% vs its line: +6% supported. 121 of 146 nights still identical from 17 Jan. Fwd30 76.7% vs 47%. |
| P14 | Numbers only: 75 of 180 open nights at £450; refreshed 18 Nov 07:19Z (18 Dec 543 -> 484, 28-31 Dec down 2-4%); P100 / +49% to +114%; 0% vs 48%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **First review: 5.0 (1).** 20-24 Nov rose 300/299/254/257 -> 317/331/278/274 (engine): -7.4% vs median, hold if selling; still on sale against the delivery block. **16-18 Dec 325/338/345 -> 302/332/311: -2.6% vs median (a-p20-dec-1711 done).** Orphans 5 Dec £265 (day 9) and 26 Dec £272 (min 4). Fwd30 64.3% vs 38%. |

### Open plan items: status today
| Item | Status 18 Nov (evidence) |
|---|---|
| t-p04-xmas-1711 | **Still open, critical.** Sync part done by the engine (17 Nov 09:09:57Z); price part now live: -15.6% to £2,306 (pricelabs C1) |
| a-p20-dec-1711 | **Done: self-corrected by the engine.** 16-18 Dec -6.3% to £945; 16-19 Dec -2.6% vs median (comp-west) |
| t-p06-1521open | **Done: lapsed.** 16-17 Nov unsold; 18-21 Nov booked (occupancy). The policy note moves to a-tidy |
| t-p04-doublebook | Not fixed, day 19 |
| t-p20-delivery | Unchanged; 2 days out |
| a-airbnb-rules | Not fixed, day 20; £3,966.66 |
| a-p04-dec-1611 | Not done; 17-19 Dec now also cut (+10% supported there) |
| a-p12-trim | Mostly done by the engine; 19 Nov, 1 Dec, 2-3 Dec remainders |
| t-p13-twins | 13-16 Dec resolved by the engine; 121 nights from 17 Jan remain |
| t-pl-push-1811 (new, medium) | 8 listings' last push 22-23 h old at 07:20Z: check after 09:15Z |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-18

**Ranking:** time-bound rows first (arrivals this week, deadlines), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). Airbnb factor (channel §3): 0.765 up to 28 d, 0.900 at 29-60 d. P11 (Booking.com only): 0.762. P04: booked share only (same method as the last three days). These are upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.750, P11 0.467, P12 0.692, P13 0.767, P20 0.643.
- Booked share, next 60: P04 0.233, P05 0.617, P11 0.433, P13 0.583, P20 0.552.

**Bounds** (`kpi_pack` settings, 18 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 19, arrival Friday).** On 1455876748739910219, **block every date now, starting with 18-24 Nov**, or snooze/unlist it. Keep its Christmas-NYE dates closed. Then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §2 (07:22Z): **20-24 Nov bookable at £741.40** although sold on the synced listing (Airbnb, booked 14 Nov); 21-24 Nov £584.60; 18-21 Nov £571.00; also 6-13 Dec £1,290.26, 17-20 Dec £694.10, 2-5 Jan £684.20. comp-east: £742; not offered on any Christmas-NYE stay | Not quantified (exposure = any booking on 1455 plus relocation cost; 20-24 Nov would be a certain double booking) | Corentin | 2026-11-19 |
| 2 | P20 | **t-p20-delivery (critical, 2 days out).** Confirm the delivery dates. **If delivery is 20-22 Nov:** block 20-22 Nov in Smoobu today. **If not:** update `policy.json listing_facts.P20.block_20_21_nov` and hold the price (no change). | Smoobu > Calendar > Waterford; `policy.json` | channel §4: Smoobu blocks 18-19 Nov only; **20 Nov £317, 21 Nov £331 (min 3), 22 Nov £278 (min 2) open; Airbnb sells 20-23 Nov at £708.38 room** (07:22:43Z). comp-west: 20-24 Nov P0 / -7.4% vs median, +9% over the 1-review line: hold if selling. market: 20-21 Nov occupancy -2.6 / -6.1 vs STLY | Not quantified (a policy question) | Corentin | 2026-11-19 |
| 3 | P04 | **t-p04-xmas-1711 (critical, updated).** The Sync Now step is done: PriceLabs registered the cancellation itself. **Choose ONE:** **(A, recommended)** in a-discount-cut, set P04 Occupancy profile to **Custom 0%** (reverses the ~-15% on 17 Dec-16 Jan and stops the -20% step from 20 Nov); **or (B)** DSO **20-31 Dec -5% -> about +12.6%** and **1 Jan -2% -> about +16%** (to hold about £2,733; about +5% / +8% for £2,545). Target **£2,545-£2,733**, under P75 £2,849. Re-read prices after either. **(C) Your question:** keep 27 Dec min 7 / 28-31 Dec min 5, or set **27-31 Dec to min 3-4** (policy floor 3). Keep 20-26 Dec as they are. | PriceLabs 3562176 > Customizations > Occupancy Based Adjustment, or > DSO 20 Dec-1 Jan | pricelabs C1: refresh 17 Nov 09:09:57Z, 13 nights open, **£2,733 -> £2,306 (-15.6%)**, uniform -15.4% to -16.7% on every open night 17 Dec-16 Jan (**-£893 on 31 nights**), 17 Jan unchanged; Smoobu 0 of 30 booked at 31-60 d; band -15% at 10%. market §2: P50 £2,233 / P75 £2,849 (flat vs 17 Nov), occupancy +1.7 to +17.9 vs STLY on all 13 nights; from 20 Nov the 16-30 d band (-20%) applies (inferred). comp-east: 23-27 Dec -17.9%, 28 Dec-2 Jan -26.3% vs band (comps held); supported 20-22 Dec hold, 23-26 Dec +10%, 27 Dec-1 Jan +15% = about £2,545; band sells 31 Dec-2 Jan at £192.50-248.50. channel §1: Airbnb 13 n £1,701.83 room (0.738x), £715.51 below the lost stay | To £2,545: £239 x 0.233 = **£56**; to £2,733: £427 x 0.233 = **£100** (estimate; not additive with row 7). Min-stay change: not quantified | Corentin / Reyhan | 2026-11-19 |
| 4 | P04 P20 P11 P05 P14 | **a-p13-record: confirm or revert Reyhan's edits.** (a) **P04 18-19 Nov min 2 -> 3**, or keep it and record it (18 Nov lapsed unsold today). (b) **P20 22-24 Nov min 2 -> 3**, or record it. (c) **P11 darts: add DSO 14-18 Dec +5%** (about 240/238/245/271/330). (d) P05 Jan/Feb -5%: confirm or revert. (e) **P04 base 200 -> 220**. (f) P04 6-22 Dec -5% (see row 10). (g) P14 min 450, P05 max 3,500, P20 base 330 vs 350: confirm. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3547481, 3064196, 3166592, 3267077; `policy.json` | pricelabs H4 (logs 0 since 15 Nov; overrides unchanged); channel §4 (P04 18-20 Nov £256.45 room, not sold; P20 22-24 Nov £422.28); comp-central (darts 14-19 Dec -22% kept / -12% wider; supported £290-332 room; average £236.75 vs your >£300; no price override present); comp-east (P04 6-19 Dec -19% to -36%) | P11 darts: £1,261 x 0.05 x 0.762 x 0.433 = **£21**. P04 base: £1,880 (19 Nov + 6-17 Dec) x 0.10 x 0.467 = **£88** (not additive with row 10). Total **£109** (upper bound) | Corentin | 2026-11-19 |
| 5 | Portfolio | **a-deposit (deadline 20 Nov, 2 days).** Decide: £1,000 hold, damage waiver, or ID check only, before Airbnb's rule change. | Airbnb account settings | policy `guest_requirements` | Not quantified | Corentin | 2026-11-19 |
| 6 | P20 P13 P05 P06 P04 P12 | **a-airbnb-rules (critical, day 20).** Remove the hidden rules: nights up to 28 d (0.765) and 29-60 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). On Barking, find the 0.809 on the 2-night card. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §3: tiers unchanged, per night by lead time (P20 14-19 Dec £1,266.435 modelled vs £1,266.43 card; P05 18-23 Jan at 61 d = 1.000); P13 0.900 from 26 d to 46 d is not in its 21 Oct rule set; comp-west: P13/P20 ≤28-day 0.765 not explained by policy; no new Airbnb booking | **Realised cost £3,966.66** (unchanged). Largest open-card gaps (overlapping, not summed): P05 5-10 Jan **£409.83**, P20 14-19 Dec **£275.57**, P04 13 n **£258.27**, P05 4-11 Jan £254.94, P13 14-19 Dec £228.95 / £213.18 | Corentin | 2026-11-19 |
| 7 | P05 P04 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P05, P04, P11 and P20. All four are still Aggressive occupancy with Booking Recency default; last-minute is P04 5% gradual, P05 1% gradual. **P12 and P13 excluded** (priced above uncustomized). On P04 this is option (A) of row 3. | PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations | pricelabs H2 (`disc.py`), next 30 (19 Nov-18 Dec): **P05 8 n £649 (-14.0%)**, P04 16 n £311 (-10.7%), P20 11 n £276 (-7.8%), P11 16 n £205 (-5.0%); total **£1,236 next 30 / £92 next 13**. The metric misses the P04 occupancy cut on 17 Dec-16 Jan (**-£893**) because uncustomized fell with it | 649 x 0.765 x 0.733 + 311 x 0.467 + 276 x 0.765 x 0.643 + 205 x 0.762 x 0.467 = **£718 / 30 days** (upper bound). P04 31-60 d counted in row 3 | Corentin | 2026-11-19 |
| 8 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec so **18-20 Dec** sell at £279 / £276 / £245, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £316.33/n all-in = **-14.4%** vs stored median £369.67 (n = 7), **-8.3%** vs band £345; parity supported (qp -0.02 on 4 reviews); `prices.csv` 18 Nov still `Blocked` | £800 x 0.900 = **£720** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-19 |
| 9 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £660) and **29 Dec +300% -> 0%** (£1,011). **7-8 Dec DSO +3% -> about +31%** (487/486 -> about 620/620) and **13-14 Dec +5% -> about +28%** (516/500 -> about 629/609, about £619 average), the comp median level. Comps support up to +15% over the median (about £731). | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-9 Dec **P0 / -18%**, 13-15 Dec **P0 / -15%** vs kept (n = 3-4; a kept comp rose 6%); qp +0.15; `recommend(0.733, 0.46, 0.0, 0.15)` = +25%; median-level £620 / £619; market: 4 BR summary P50 £568/n, 13 Dec +12.4 vs STLY; 21 / 29 Dec n = 0 kept comps, 1.7x / 2.1x the 4 BR P90 | 7-8 Dec £267 x 0.765 x 0.733 = £150; 13-14 Dec £222 x 0.765 x 0.733 = £125; 21 Dec £660 x 0.900 x 0.617 = £366: **£641** (upper bound). 29 Dec not quantified | Corentin | 2026-11-19 |
| 10 | P04 | **a-p04-dec-1611.** DSO **6-16 Dec -5% -> +14%** (about +20%: 143/141/141/140/144/151/153/143/136/140/143 -> about 172/169/169/168/173/181/184/172/163/168/172). **17-19 Dec: split from 6-22 Dec and set -5% -> about +4.5%** (about +10%: 146/159/164 -> about 161/175/180). If you do row 7 on P04 first, re-read: part of this gap is the same occupancy cut. If you revert the base to 220 (row 4e), use **+4%** on 6-16 Dec instead. | PriceLabs 3562176 > DSO 6-16 Dec, 17-19 Dec | comp-east Priority 1: 6-9 Dec **-29.7%**, 9-12 Dec -28.7%, 11-14 Dec -24.6%, **14-17 Dec -35.7%**, 17-20 Dec -18.8% vs band; supported room £165-217 (6-17 Dec), £164-193 (17-20 Dec); comps did not move; 17-19 Dec 182/188/194 -> 146/159/164 overnight at the 30-day edge; `recommend` +10% at 30 d, adopted at the larger size on 6-16 Dec because the comp gap exceeds the step. market: 6-15 Dec £1,432 vs P50 £1,581 / P75 £2,065 | 6-16 Dec £1,575 x 0.20 x 0.467 = £147; 17 Dec £15 x 0.467 = £7; 18-19 Dec £32 x 0.233 = £8: **£161** (upper bound) | Corentin | 2026-11-19 |
| 11 | P20 | **t-p20-26dec-orphan.** DSO **26 Dec min 4 -> 1**, keep the price (£272; Reyhan's -5% stays your call). Where the min 4 comes from (no DSO min field) is UNKNOWN: check the min-stay customization too. | PriceLabs 3547481 > DSO 26 Dec | occupancy, pricelabs H3 (`unbookable` 1, min 4); comp-west: supported min 1 at £272-300 (1-night comp £494, n = 1; market P50 £253 / P75 £330) | £272 x 0.900 x 0.552 = **£135** | Corentin | 2026-11-19 |
| 12 | P20 | **t-p20-5dec-orphan (day 9).** DSO **5 Dec min 3 -> 1**, keep £265 (outside the policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1; DSO 0% min 3 since 9 Nov); comp-west: supported min 1 at about £265-277, between market P50 £227 and P75 £296; Jingle Bell Ball 5-6 Dec | £265 x 0.765 x 0.643 = **£130** | Corentin | 2026-11-19 |
| 13 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the block to start 30 Nov intended? **If yes:** add a date note to `policy.json` and (your call) raise 22-23 Nov to about **£299/night** (261/247 -> 299/299; DSO about +18%). **If no:** re-block 22-23 Nov. Also: 29 Nov closed overnight with no reservation (or sits at min 4): which is intended? | Smoobu > Calendar > Marylebone; PriceLabs 3288517 | comp-central: 22-23 Nov **P0 / -13% vs kept (n = 2)**, -28% wider; qp -0.02; supported -2% vs median = about £299; `recommend` +10%; occupancy: 29 Nov £254 min 4 in Smoobu rates; comp-central: unavailable in `prices.csv`, cause NOT CHECKED | 22-23 Nov: (£598 - £508) x 0.765 x 0.750 = **£52** (only if the opening is confirmed) | Corentin | 2026-11-19 |
| 14 | P11 | **t-channel-gaps.** **23-25 Dec DSO +5% -> about +15%** (291/276/273 -> about 320/304/300, average about £308). **3 Jan:** DSO so the price is about **£205** (£170 now). Low end of the supported range because the market is soft. | PriceLabs 3064196 > DSO 23-25 Dec, 3 Jan | comp-central: 23-25 Dec **-12% kept (n = 8) / -6% wider**, supported £300-322 room; 3 Jan priced as 3-5 Jan -17% kept / -8% wider, supported £205-232; channel §4: 23 Dec ≥£320 and 3 Jan ≥£204 targets not met; market: 23-25 Dec occupancy -3.2 to -8.2 vs STLY (soft) | 23-25 Dec £84 x 0.762 x 0.433 = £28; 3 Jan £35 x 0.762 x 0.433 = £12: **£39** | Corentin | 2026-11-20 |
| 15 | P13 | **t-p13-twins (conflict: twin rule).** (a) **DSO 3090701 +6% on 13-15 Dec** (220/215/213 -> about 233/228/226); this narrows the gap PriceLabs opened (10% -> about 4%). (b) For the 121 identical nights **17 Jan-17 May**: DSO **3090701 about +3%** (child only; set it after any parent edit). Which twin is cheaper is not raised (deprioritised). | PriceLabs 3090701 > DSO | comp-west: 3090701 13-16 Dec £215.33 all-in = P25 / -8.4% vs median, **-6.2% vs its line** (£229.52), comps flat; 17 Nov refresh cut it to 0.90x 3064856 with no edit. pricelabs H3: **121 of 146** jointly open nights identical, all 17 Jan-17 May; channel §3: 43 of 68 to 28 Feb | (a) £39 x 0.765 x 0.767 = **£23**. (b) not quantified (duplicate-listing risk) | Corentin | 2026-11-20 |
| 16 | P12 | **a-p12-trim (your call: lowers a price; mostly done by the engine).** Remaining: **19 Nov DSO 0% -> -5%** (234 -> about £222). **1 Dec 0% -> -8%** (268 -> about £245). **2-3 Dec 0% -> -5%** (263/268 -> about 250/255). Hold 30 Nov (244). | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 18-20 Nov +5.0% vs band (P75); **1-3 Dec +12.0%** (P67); **2-4 Dec +15.5%** (P70); qp -0.15 (ceiling 0%); `recommend` +10% not adopted (lead from nights already sold). occupancy: pace -7.7% (On track) | Not quantified (a cut) | Corentin | 2026-11-19 |
| 17 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -12%**, keep min 1 (£294 -> about £224). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £350 all-in, **P100 / +23.2%** vs band (n = 5), NL P87; supported room £203-239; uncustomized £244 (pricelabs H3) | Not quantified (a cut) | Corentin | 2026-11-19 |
| 18 | P11 | **t-p11-8dec-orphan (your call: lowers a price).** Keep min 1 (Reyhan's). Set the 8 Dec price to about **£150**: DSO **+50% -> about -22%** (on the pre-override about £192). | PriceLabs 3064196 > DSO 8 Dec | comp-central: £288 = list all-in £466, **P100 / +84% kept, +39% wider**; a 1-night stay carries the full £149 cleaning, so comps support about **£95-169 room**; uncustomized £251 | Not quantified (a cut on a sellable night) | Corentin | 2026-11-20 |
| 19 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**, and the **Long stay 10% on 5-6 nights**: keep and record, or 0%. | Airbnb 1657859794156786222 > Pricing > Discounts | channel §1: weekly 18.0% on the 13 n Christmas card (-£373.57), the extra 3 points = **£62.26**; 6-13 Dec 18.0% (-£164.11); Long stay -£87.66 on 28 Dec-2 Jan (not in policy) | **£62.26** on the Christmas stay; £87.66 per 5-night NYE stay | Corentin | 2026-11-20 |
| 20 | P05 | **t-p05-los.** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §3: **-£194.13 on 5-10 Jan, -£202.60 on 18-23 Jan** (10.0%) | **£194.13** per 5-night stay | Corentin | 2026-11-20 |
| 21 | P05 | **a-p05-earlybird.** Visible 12% early booking: yours, or 0%? | Airbnb 1618929775762183214 > Pricing > Discounts | channel §3: not shown at 61 d (threshold above 61 d); applied on the Valentine's stay (£195.24) | **£195.24** per such stay | Corentin | 2026-11-20 |
| 22 | P13 | **t-p13-los5 (confirmed live).** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §3: **10.0% on both twins**: 14-19 Dec -£108.45 / -£100.98; 3-8 Jan -£77.40 / -£81.72; not in the 21 Oct rule set | **£100.98-£108.45** per 5-night stay | Corentin | 2026-11-20 |
| 23 | P06 P20 P05 | **t-airbnb-flex15-1611.** Open the Airbnb reservation price breakdowns for P20 27 Dec-3 Jan, P05 13-17 Feb and P06 24-29 Nov, and check what the Flexible test turned on. Also: what changed on P05 18-22 Nov and P06 24-29 Nov (both modified on Airbnb 17 Nov)? | Airbnb host app > Reservations; Listings > Policies / Pricing | channel §3: no new booking on the three flats; today's cards reconcile without the extra layer; occupancy: 2 Airbnb records modified 17 Nov, dates and room unchanged | **£530.11** identified (inside row 6, not additive) | Corentin | 2026-11-20 |
| 24 | P13 P12 | **t-bcom-breakdown-1511 (question; no promotion change).** Send the extranet breakdown of the P13 22-27 Dec stay (rate plan; which layers make 0.6926 of list) and of P12 7-14 Dec. | Booking.com extranet (Shepherd's Bush, Mile End) > Reservations | channel §7: P13 22-27 Dec observed £64.85 net per £100 Smoobu (stack 0.6926, a fit, not seen); now registered in PriceLabs (ADR 140.13) | Not quantified (no change proposed) | Corentin | 2026-11-20 |
| 25 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 9 post-cut Booking.com cancellations and for the P04 Christmas-NYE cancellation. | Booking.com extranet > Reservations | channel §5: **9 of 25 gross cancelled (37.0% of gross room, £6,796.87)**; confirmed 16 / 70 n / £11,564.66; 4 of 5 since +10% confirmed; no Booking.com booking or cancellation since 16 Nov 22:52 | Not quantified | Corentin | 2026-11-20 |
| 26 | P11 | **a-p11-bcom-stack (no change proposed).** Still only the ask: the extranet breakdown naming the three 10% layers. | Booking.com extranet (Camden) | channel (14 Nov): ceil x 1.10 x 0.9 x 0.9 x 0.9 x 0.95; nets £62.47 per £100 | Not quantified | Corentin | 2026-11-20 |
| 27 | Portfolio | **NEW t-pl-push-1811 (check).** At 07:20Z, 8 listings' last push was 22 h 10 m old (P04, P05, P06, P11, both P13 twins, P20) and the P13 Vrbo copy 22 h 43 m; they cross 24 h at 08:37-09:10Z. Check `last_date_pushed` after 09:15Z; if it has not moved, you or Reyhan press Sync Now. | PriceLabs > Listings (last push) | pricelabs H1; price sync itself is clean: 0 open nights differ by more than £2 (19 Nov-17 Jan, 14 listings) | Not quantified (a check) | Corentin / Reyhan | 2026-11-18 |
| 28 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-20 |
| 29 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-20 |

**Closed today:** a-p20-dec-1711 (self-corrected by the engine), t-p06-1521open (lapsed: 16-17 Nov unsold, 18-21 Nov booked). **New today:** t-pl-push-1811. None reopened. The carried medium items (a-amenities, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-p20-conversion, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) are in the JSON with today's status.

## Top 5 for today
1. **P04 Barking Christmas-NYE was cut 15.6% by PriceLabs' occupancy profile, not by the market.**
   - PriceLabs registered the cancellation itself (Sync Now is no longer needed), then cut 20 Dec-1 Jan from £2,733 to £2,306.
   - The market held (P50 £2,233 / P75 £2,849, occupancy above last year on all 13 nights) and comps held. Airbnb now sells the block at £1,701.83 room.
   - From 20 Nov the cut is likely to deepen.
   - Choose one: set P04's occupancy profile to 0% (recommended) or raise the 20 Oct DSOs to about +12.6% / +16%. Target £2,545-£2,733.
   - Decide whether NYE min 7/5 drops to 3-4.
2. **Two Friday arrivals at risk.**
   - 1455 still sells the sold 20-24 Nov (£741.40, day 19): block its calendar today.
   - P20 20-22 Nov is on sale against the delivery block (Airbnb 20-23 Nov £708.38 room), 2 days out: block it or update policy.
   - P04 18-19 Nov min 2 did not sell; P20 22-24 Nov min 2 is on sale: confirm or revert.
3. **Discount layers are now the biggest controllable leak.**
   - Airbnb hidden tiers: day 20, £3,966.66 realised.
   - PriceLabs: £1,236 next 30 (£718 expected), plus the P04 occupancy cut of £893 on 17 Dec-16 Jan, which the metric misses.
   - Your direction covers both: cut PriceLabs discounts (Custom 0% on P05, P04, P11, P20), keep Booking.com discounts.
4. **Prices below comps with no edit.**
   - P04 6-16 Dec is -25% to -36% vs comps: +20%. 17-19 Dec was cut 15-20%: +10%.
   - P05 7-8 / 13-14 Dec is -18% / -15%: to the median, about £620.
   - P11 darts average is £236.75 against your >£300 (conflict). P06 22-23 Nov is about £299 if you confirm the opening.
   - P01 18-20 Dec block holds £800 at -14% vs comps.
5. **Engine self-corrections, and a quiet market.**
   - a-p20-dec-1711 is done (16-19 Dec now -2.6% vs median). a-p12-trim is mostly done; P12 26 Nov is still P100 (£294 vs about £224). P12 is back On track (-7.7%).
   - PriceLabs split the P13 twins: +6% on 3090701 13-15 Dec; 121 identical nights remain from 17 Jan.
   - There has been no booking for about 32 hours. The +28 n net pickup is the window moving.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-60 d, 1.000 from 61 d (channel §3, day 20). P13 sits at 0.900 from 26 to 46 days, which is not in its own 21 Oct rule set.
  - Today it decides how the P04 Christmas block re-sells: £1,701.83 room on the 13 n card (0.738x) against £1,960.10 at the policy weekly 15% (**£258.27 on one stay**).
  - Owner net per £100 Smoobu (channel §7): Airbnb 0.765 £64.64, 0.900 £76.05, 1.000 £84.50; Booking.com P13 Christmas observed £64.85 (£52.14 ex-VAT); Booking.com model £93.50; direct model £90 (unconfirmed). Every Airbnb card inside 60 d is at or below the direct model.
  - Target: **1.00x before visible discounts by 2026-11-20** (row 6).
- **Booking.com since the 24 Oct markup cut** (channel §5):
  - **Confirmed 16 / 70 n / £11,564.66**; 9 of 25 cancelled (**37.0% of gross room**). Pace 0.65 confirmed a day, falling (no booking for about 32 h). Since +10%: 4 of 5 confirmed.
  - The leaks are cancellations (row 25) and peak-date stacks, not the markup.
  - Target: under 20% cancelled by 2026-11-30.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.63 |
  | P04 synced | **4.2 (10)** | 4.83 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.24 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | **5.0 (1), new today** | 4.80 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12's open nights need trims and why P04's Christmas ceiling sits at the band median, not above it.
  - **P20's first review (5.0) is not yet evidence**: comp-west keeps the 0-review line (median x 0.85). Three to five more reviews would let P20 price at the median (about +15%).
  - Fixes: the P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; P20 review requests after the December and NYE stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31; P20 3 reviews by 2026-12-31.
- **Listing conversion.**
  - **P04:** mapping 1455 (row 1) fixes both the double-booking risk and conversion (4.69 (26) vs 4.2 (10)).
  - **P11:** basement with a patio; 4 of 12 comps have a lift. Booking.com CTR 0.81% vs 1.70% (21 Oct only). Titles (a-titles).
  - **P20:** parking photo first; first review in.
  - **No "Free cancellation" pill on any of our listings**; it shows on 4 P13 comps and 2 P20 comps (comp-west). The Flexible test (P20, P06, P05 since 24 Oct; comparison due 7 Nov, 11 days overdue) is the way to measure it: source Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days, plus the Airbnb breakdowns (row 23).
- **Gap fill / length of stay.**
  - Unsellable now: P20 26 Dec (row 11), P20 5 Dec (row 12), P06 29 Nov (policy), P04 24 Nov (P04 rule). The three 17 Nov single nights (P05 £373, P06 £230, P20 £208) lapsed unsold.
  - **P04 NYE:** 27 Dec min 7 and 28-31 Dec min 5 were carried in for the cancelled 13-night stay (pricelabs). They block 2-6 night NYE stays (row 3c).
  - Soft blocks: P05 21/29 Dec (row 9).
  - 17 Jan-17 Mar below 5 nights (pricelabs M1): P11 42/59, P13 47/59 per twin, P05 35/52, P20 53/59, P04 42/59. Please confirm the 5-night policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded). `kpi_pack` `gaps` is [] although Smoobu has the two P20 orphans (data gap for `rm`). Mid-term (91+ nights): NOT CHECKED.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. A direct guest at -10% nets £90 per £100 vs £64.85 on P13's Christmas Booking.com stay.
- **Event compression** (market §4, rebuilt method): **15 n / £403** (yesterday 18 / £410); bookable 12 / £285.
  - The headline is mostly fortnight artefacts in soft markets (P11 Round One Δ -4.8 to +2.0; P11 24-25 Dec; P20 December).
  - Real items not in the headline: **P04 Christmas -£427 overnight** in a flat market above STLY (row 3); **P04 6-19 Dec -£106 overnight**, £180 under the 1-3 BR P50 (row 10); **P05 7-8 / 13-14 Dec** under the 4 BR median (row 9); **P13 19-21 Dec** at the median on Δ +12 to +14 (comp-west says hold, so no row).
  - Next: Finals Weekend 27 Nov (P13 £304 vs fortnight £242.7, Δ +12.1: priced); NYE fireworks final release Fri 20 Nov 12:00.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **57.4%** (59.0% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£172.50** (£172.90) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£99.08** (£101.97) | £129 | 2026-12-18 |
| Revenue, last 30 | **£38,640.95** (224 n) | - | - |
| Booked next 30 (Smoobu) | **58.8%** (140/238) | each unit at least market + 10 pts (below: P11 46.7% vs 50%) | 2026-11-20 |
| Booked next 60 (Smoobu) | **46.2%** (193/418) | at least market + 10 pts (below: P04 23.3% vs 19%, P11 43.3% vs 38%) | 2026-11-20 |
| 7-day pickup, net | gross 10 bk / 49 n / £9,581.28; cancelled 3 / 21 n / £3,944.84; **net +28 n / +£5,636.44** (window moving; no booking for ~32 h) | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace vs STLY (to 13 Dec handback) | **-7.7%** (-4 n / -£316.70), **On track** (was -10.7%, Soft; window effect) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+25 n / +£7,329.70 like-for-like** (unchanged); +34 n / +£9,196.31 incl. P06; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P12 +11 / +£1,660.21; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P01 0 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **16 confirmed / 70 n / £11,564.66; 9 of 25 cancelled (37.0% of gross room)**; 4 of 5 since +10% confirmed | cancellations under 20% | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 20; realised cost **£3,966.66** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,236 next 30; £92 next 13**; plus P04 occupancy cut -£893 on 17 Dec-16 Jan | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **0 open nights differ by more than £2**; both 16 Nov events registered (17 Nov 09:08-09:10Z); push age 22 h at 07:20Z | 0 mismatches; pushes under 24 h | 2026-11-18 |
| Unsellable orphan nights (next 60) | **4** (P20 5 Dec day 9, P20 26 Dec, P06 29 Nov (policy), P04 24 Nov (P04 rule)); P05 21/29 Dec at +300% | 0 outside P04 | 2026-11-19 |
| Double-sellable Barking stays | **1455 bookable on the sold 20-24 Nov (£741.40)**, 21-24 Nov, 18-21 Nov, 6-19 Dec, 2-5 Jan; not on Christmas-NYE; day 19 | 0 | 2026-11-19 |
| P13 identical twin nights | **43** of 68 jointly open (Smoobu to 28 Feb); **121 of 146** next 180, all 17 Jan-17 May | 0 | 2026-11-20 |
| Missed compression | **15 n / £403**; bookable 12 / £285 (rebuilt method) | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.77; comp medians 4.24-4.86; P20 5.0 (1) | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **The 17 Nov snapshot is gone (container rebuild).** Field-level diffs of the two Airbnb records modified 17 Nov (P05 18-22 Nov, P06 24-29 Nov) are not possible. Source: Airbnb host app > Reservations > change history.
2. **P04 occupancy bucket before the refresh** is not visible: the 0% -> -15% reading is inferred from the price ratio. The -20% step from 20 Nov is inferred from the customization table. Source: PriceLabs calendar per-date factor breakdown, re-read on 20 Nov.
3. **P04 cancellation: who cancelled and why**, and whether the reopened nights show on Booking.com: NOT CHECKED (no reason field; AWS WAF, not bypassed). Source: Booking.com extranet > Reservations (row 25) and a guest-view screenshot of 20 Dec-2 Jan.
4. **Why 1455 is closed over exactly the cancelled block**: NOT CHECKED. Source: Airbnb host 551951609 > 1455876748739910219 > Calendar.
5. **Cause of other engine moves with no edit** (P04 17-19 Dec -15-20% at the 30-day edge; P12 -4-16%; P20 20-24 Nov +8%; P13 3090701 0.90x on 13-17 Dec): NOT VERIFIED. Source: PriceLabs calendar factor breakdown.
6. **Source of P20 26 Dec min 4** (no DSO min field) and P06 29 Nov closing: UNKNOWN. Source: PriceLabs min-stay customizations; Smoobu calendar history for Marylebone.
7. **Push freshness** after 09:10Z today: NOT CHECKED (row 27).
8. **The extra ~15% on the Flexible-test flats** and the P04 2-night 0.809: NOT CHECKED. Source: Airbnb reservation breakdowns (row 23).
9. **Market percentiles:** daily series mix bedroom counts; "est. matched" figures are estimates. Source: PriceLabs Market Dashboard with a 2 BR / 4 BR filter.
10. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY before 18 Nov 2025).
11. **Other:**
    - Booking.com live prices and same-date channel ordering: NOT CHECKED (WAF).
    - Vrbo +8% / Direct -10% are unconfirmed; whether the P13 Vrbo copy reflects 22-27 Dec is NOT CHECKED.
    - Barking recommended base "Unavailable": ask PriceLabs support.
    - P15-P19 need the second-account keys.
    - Five kept comp ids not returned for 6 days (P06 x2, P14 x2, P17 x1); calendars NOT CHECKED (a calendar probe was refused by the permission system). P04 1387112821878102742 not returned on any of 19 stays. P20 789954794593691037 found only by probe (5th day).
    - Events are search summaries: www.pdc.tv, www.alexandrapalace.com and www.theo2.co.uk returned ENOTFOUND and must be allowed in the session's network settings. Unresolved: darts Round One 13 vs 14 Dec, end 3 vs 4 Jan; Fontaines D.C. 27 vs 28 Nov; Kehlani 29 Nov vs 8 Dec.

```json
{"scoreboard":{"note":"18 Nov 2026. The session container was rebuilt overnight, so the 17 Nov snapshot directory (reservations, comps, market, channel_checks) was unavailable; every day-on-day comparison uses the committed reports/2026-11-17 files (occupancy recounted yesterday's windows on today's pull: 144/243 and 198/423 reproduce). Last 30 nights = 19 Oct-17 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:19:57Z, handback-aware, Smoobu as truth); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and nights after each handback excluded. Pickup = bookings made 12-18 Nov net of cancellations; the rise to +28 n is two 11 Nov cancellations leaving the window, with no booking made for ~32 h. P12 pace handback-aware to 13 Dec. Airbnb ratios from channel section 3; Booking.com from channel section 5; PriceLabs gap from pricelabs H2 (misses the P04 occupancy cut, -£893 on 17 Dec-16 Jan); sync from pricelabs H1. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"57.4%"},{"label":"ADR last 30","value":"£172.50"},{"label":"RevPAR last 30","value":"£99.08"},{"label":"Revenue last 30","value":"£38,640.95"},{"label":"Nights last 30","value":"224"},{"label":"Booked next 30","value":"58.8% (140/238)"},{"label":"Booked next 60","value":"46.2% (193/418)"},{"label":"7-day pickup","value":"gross 10 bk / 49 n / £9,581.28; cancelled 3 / 21 n / £3,944.84; net +28 n / +£5,636.44 (rise is the window moving; no booking for ~32 h)"},{"label":"P12 pace vs STLY","value":"-7.7% (-4 n / -£316.70) to the 13 Dec handback; On track (was -10.7%, Soft; window effect)"},{"label":"Raised flats net since 18 Oct","value":"+25 n / +£7,329.70 like-for-like (unchanged); +34 n / +£9,196.31 incl. P06; P01 0; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21; P04 comparison corrected to +37 n / +£4,602.78"},{"label":"Booking.com since markup cut","value":"25 gross, 16 confirmed, 70 n, £11,564.66; 9 cancelled = 37.0% of gross room (£6,796.87); since +10% (12 Nov) 5 gross, 4 confirmed; unchanged"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-60 d; 1.000x from 61 d; per night by lead time; day 20; realised cost £3,966.66"},{"label":"Owner net per £100 Smoobu","value":"Booking.com P13 Christmas observed £64.85 (£52.14 ex-VAT); Airbnb 0.765 £64.64, 0.900 £76.05, 1.000 £84.50; Booking.com model £93.50; direct model £90 (unconfirmed)"},{"label":"PriceLabs-side gap","value":"£1,236 next 30; £92 next 13; plus P04 occupancy cut -£893 on 17 Dec-16 Jan"},{"label":"PriceLabs vs Smoobu","value":"0 open nights differ by more than £2 (19 Nov-17 Jan, 14 listings); P04 cancellation and P13 22-27 Dec registered 17 Nov 09:08-09:10Z; last push 22 h old at 07:20Z"},{"label":"P04 Christmas-NYE 20 Dec-1 Jan","value":"£2,306 (was £2,733, -15.6%, occupancy profile); market P50 £2,233 / P75 £2,849; Airbnb 13 n £1,701.83 room"},{"label":"Unsellable orphans","value":"P20 5 Dec (day 9), P20 26 Dec (min 4), P06 29 Nov (policy), P04 24 Nov (P04 rule); P05 21/29 Dec at +300%"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£741.40), 21-24 Nov (£584.60), 18-21 Nov (£571.00), 6-19 Dec, 2-5 Jan; not offered on Christmas-NYE; day 19"},{"label":"P13 identical twin nights","value":"43 of 68 jointly open (Smoobu to 28 Feb); 121 of 146 next 180 (PriceLabs), all 17 Jan-17 May; 13-16 Dec no longer identical"},{"label":"Missed compression","value":"15 n / £403 (rebuilt method; was 18 / £410); bookable 12 n / £285"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 19), arrival Friday: unsynced Barking Airbnb 1455876748739910219 still sells the sold 20-24 Nov at £741.40 (comp-east £742), 21-24 Nov £584.60, 18-21 Nov £571.00, plus 6-13 Dec £1,290.26, 17-20 Dec £694.10, 2-5 Jan £684.20; not offered on Christmas-NYE (keep closed); block all dates now (18-24 Nov first) or unlist, then map to 3562176","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"critical","title":"2 days out: Smoobu blocks 18-19 Nov only; 20 Nov £317, 21 Nov £331 (min 3), 22 Nov £278 (min 2) on sale against policy's 20-22 Nov delivery block; Airbnb sells 20-23 Nov at £708.38 room; Corentin to confirm: block 20-22 Nov in Smoobu today, or update policy and hold the price (20-24 Nov P0 / -7.4% vs median, +9% over the 1-review line)","gbp":null},
{"id":"t-p04-xmas-1711","status":"open","prop":"P04","priority":"critical","title":"Sync part done (PriceLabs registered the cancellation itself, refresh 17 Nov 09:09Z), but its Aggressive occupancy band (0/30 booked at 31-60 d, -15%) cut 20 Dec-1 Jan £2,733 -> £2,306 (-15.6%; -£893 on 17 Dec-16 Jan) while the market held (P50 £2,233, P75 £2,849; occupancy above last year on all 13 nights) and comps held; from 20 Nov the 16-30 d band (-20%) applies (inferred); Airbnb sells the 13 n at £1,701.83 room (0.738x); market supports £2,417-£2,849, comp-east about £2,545 (23-26 Dec +10%, 27 Dec-1 Jan +15%); choose ONE: occupancy profile Custom 0% under a-discount-cut (recommended) OR DSO 20-31 Dec -5% -> about +12.6% and 1 Jan -2% -> about +16% (estimate, holds about £2,733); NYE min 7/5 blocks 2-4 night stays comps sell at £192.50-248.50 (policy min 3): for Corentin; £56-£100 (estimate)","gbp":100},
{"id":"a-p13-record","status":"open","prop":"P04 P20 P11 P05 P14","priority":"high","title":"For Corentin to confirm or revert Reyhan's edits (no edits since 15 Nov, logs 0): P04 18-19 Nov +10% min 2 vs the never-under-3 rule (check-in today, not sold, £158/£159); P20 22-24 Nov min 2 vs min 3 to 30 Nov (on sale £820, Airbnb £422.28 room); P11 darts 14-18 Dec no price override vs your +5% / >£300 (avg £236.75; -22% vs kept; +5% = £21); P05 Jan/Feb -5%; P04 base 200 vs 220 (revert £88, not additive with a-p04-dec-1611); P04 6-22 Dec -5%; P14 min 450; P05 max 3500; P20 base 330 vs 350; P13 twins 13-16 Dec no longer identical (moved to t-p13-twins); £109","gbp":109},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (2 days)","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P13 P05 P06 P04 P12","priority":"critical","title":"Day 20, not fixed: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-60 d), per night by lead time (P05 at 61 d = 1.000; P13 0.900 from 26 d, not in its 21 Oct rules); no new Airbnb booking, realised cost £3,966.66; largest open-card gaps today (overlapping): P05 5-10 Jan £409.83, P20 14-19 Dec £275.57, P04 Christmas 13 n £258.27, P05 4-11 Jan £254.94; P04 2-night 0.809 unidentified; P09 excluded","gbp":3966.66},
{"id":"a-discount-cut","status":"open","prop":"P05 P04 P11 P20","priority":"high","title":"Not done; gap £1,236 next 30 / £92 next 13 (P05 8 n £649 -14.0%, P04 16 n £311 -10.7%, P20 11 n £276 -7.8%, P11 16 n £205 -5.0%); the metric misses the P04 occupancy cut (-£893 on 17 Dec-16 Jan, the Christmas -15.6%) because uncustomized fell with it; all four still Aggressive occupancy + Booking Recency default; set Occupancy, Booking Recency and Last-minute to Custom 0% on P05, P04, P11, P20 (on P04 this is option A of t-p04-xmas-1711); P12/P13 excluded; expected £718 / 30 days","gbp":718},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (now £279/£276/£245, min 3) are closed; confirm intent; if not, end the block 18 Dec (£316.33/n all-in = -14.4% vs stored median £369.67, -8.3% vs band; parity supported); £800 x 0.900 = £720","gbp":720},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"7-8 Dec rose to £973 and 13-14 Dec to £1,016 (engine, +5-6%) but still P0 / -18% and -15% vs kept (a kept comp also rose); DSO 7-8 Dec +3% -> about +31% and 13-14 Dec +5% -> about +28% to the median level (£620 / £619; +15% over median, about £731, supported; recommend +25%); 21 Dec £2,039 / 29 Dec £2,569 at +300% min 1 act as soft blocks (n=0 kept comps, 1.7x / 2.1x the 4 BR P90): confirm intent or, your call, +300% -> 0% (uncustomized £660 / £1,011); £641","gbp":641},
{"id":"a-p04-dec-1611","status":"open","prop":"P04","priority":"high","title":"Not done: 6-16 Dec £1,575, -25% to -36% vs comps (comps flat), about +20% supported: DSO 6-16 Dec -5% -> +14% (about 163-184); new: 17-19 Dec cut 182/188/194 -> 146/159/164 at the 30-day edge, now -18.8% vs band, about +10% supported: split DSO 17-19 Dec -5% -> about +4.5%; re-read first if a-discount-cut is done on P04 (same occupancy cut); +4% on 6-16 Dec instead if the base goes back to 220; £161","gbp":161},
{"id":"t-p20-26dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (day 3): 26 Dec 1-night orphan, min 4 (source unknown, no DSO min field), unbookable at £272; DSO 26 Dec min 1 keep price (supported £272-300; 1-night comp £494, n=1; market P50 £253 / P75 £330); £272 x 0.900 x 0.552 = £135","gbp":135},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (day 9): P20 5 Dec 1-night orphan, min 3, unbookable at £265 (was £277); DSO 5 Dec min 1, keep price (supported £265-277, between market P50 £227 and P75 £296; Jingle Bell Ball); £265 x 0.765 x 0.643 = £130","gbp":130},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): 22-29 Nov reopening (24-29 Nov sold); 22-23 Nov £261/£247, P0 / -13% vs kept (n=2), -28% wider; if intended note in policy and (your call) raise 22-23 Nov to about £299 (DSO about +18%); if not re-block 22-23 Nov; 29 Nov closed overnight with no reservation (comp-central) or min-4 orphan at £254 (occupancy), cause NOT CHECKED: which is intended?; £52 if confirmed","gbp":52},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 23-25 Dec £291/£276/£273, -12% kept (n=8) / -6% wider -> DSO +5% -> about +15% (about 320/304/300; low end of supported £300-322, market soft -3.2 to -8.2 vs STLY); 3 Jan £170 -> DSO to about £205 (3-5 Jan -17% kept / -8% wider, supported £205-232); targets 23 Dec ≥£320 and 3 Jan ≥£204 not met; £39","gbp":39},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Partly resolved by the engine: PriceLabs split the twins on 17 Nov (3090701 = 0.90x 3064856 on 13-17 Dec), so 13-16 Dec are no longer identical, but 3090701 13-15 Dec now sits -6.2% under its line (P25 / -8.4% vs median): DSO 3090701 +6% on 13-15 Dec (220/215/213 -> about 233/228/226; gap 10% -> about 4%; £23); 121 of 146 jointly open nights still identical (17 Jan-17 May, PriceLabs), 43 of 68 to 28 Feb (Smoobu): DSO 3090701 about +3% on 17 Jan-17 May, set on the child after any parent edit; Corentin to confirm","gbp":23},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"medium","title":"Mostly done by the engine (no edit): 18-19 Nov 268/268 -> 225/234, 2-3 Dec 299/308 -> 263/268; remaining (your call, lowers a price): 19 Nov DSO 0% -> -5% (about £222; 18-20 Nov +5.0% vs band), 1 Dec 0% -> -8% (about £245; 1-3 Dec +12.0%), 2-3 Dec 0% -> -5% (about 250/255; 2-4 Dec +15.5%, P70); hold 30 Nov; quality ceiling 0% (qp -0.15); pace -7.7% On track","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £294 (was £307; £350 all-in, P100 +23.2% vs band, n=5, NL P87; uncustomized £244); DSO +15% -> about -12% (about £224; supported £203-239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"a-p20-dec-1711","status":"done","prop":"P20","priority":"high","title":"Done: self-corrected by the engine (no edit) - 16-18 Dec cut 325/338/345 -> 302/332/311 (£1,008 -> £945, -6.3%); 16-19 Dec now P38 / -2.6% vs comp median (comp-west), within £8/night of the -5% level the proposal was sized on; 17-18 Dec cross 28 days next, so the Airbnb price falls further; no edit needed","gbp":null},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Partly fixed: 8 Dec min 1 (sellable) but +50% -> £288 (was £310; list all-in £466, P100 / +84% kept, +39% wider; uncustomized £251); comps support about £95-169 Smoobu room on a 1-night stay; your call (lowers a price): keep min 1, DSO +50% -> about -22% (about £150); not quantified","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P13 P12","priority":"medium","title":"P13 Booking.com 22-27 Dec on 3064856 (£840.75 room = 0.6926 of list, a fit; nets £64.85 per £100 Smoobu) now registered in PriceLabs (ADR 140.13 = £840.75 / 1.2 / 5); send its extranet breakdown and the P12 7-14 Dec one; no promotion change proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"high","title":"Unchanged: 9 of 25 post-cut Booking.com bookings cancelled (37.0% of gross room, £6,796.87); confirmed 16 / 70 n / £11,564.66; 4 of 5 since +10% confirmed; no Booking.com booking or cancellation since 16 Nov 22:52; plus the pre-cut P04 Christmas-NYE stay (£2,417.34); send rate plans and reasons","gbp":null},
{"id":"t-airbnb-flex15-1611","status":"open","prop":"P06 P20 P05","priority":"high","title":"No new booking on the three test flats; today's cards reconcile without the layer; P05 18-22 Nov and P06 24-29 Nov were modified on Airbnb 17 Nov (dates and room unchanged; what changed NOT CHECKED); open the reservation price breakdowns (P06 24-29 Nov, P20 NYE £318.33, P05 Feb £211.78) and check what the Flexible test turned on; £530.11 identified (included in a-airbnb-rules)","gbp":530.11},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Not fixed: synced Barking Airbnb weekly 18.0% vs policy 15% (-£373.57 on the 13 n Christmas card; the extra 3 points = £62.26; 6-13 Dec -£164.11); Long stay 10% on 5-6 nights (-£87.66 on 28 Dec-2 Jan), not in policy: keep and record, or 0%","gbp":62.26},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Still live: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£194.13 on 5-10 Jan, -£202.60 on 18-23 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":194.13},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (not shown at 61 d; threshold above 61 d) applied on the Valentine's stay (£195.24); not in policy - yours, or 0%?","gbp":195.24},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Confirmed live: visible Airbnb 'Long stay discount' 10.0% on 5+ nights on both twins (14-19 Dec -£108.45 / -£100.98; 3-8 Jan -£77.40 / -£81.72); not in the 21 Oct Shepherd's Bush rule set or policy LOS; keep and record, or set LOS 5+ to 0%","gbp":100.98},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; 18% booster; nets £62.47 per £100); per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"t-pl-push-1811","status":"open","prop":"P04 P05 P06 P11 P13 P20","priority":"medium","title":"New: at 07:20Z the last push of 8 Smoobu listings (P04, P05, P06, P11, both P13 twins, P20) was 22 h 10 m old and the P13 Vrbo copy 22 h 43 m; they cross 24 h at 08:37-09:10Z today; check last_date_pushed after 09:15Z and, if unmoved, Corentin or Reyhan press Sync Now; price sync itself clean (0 open nights differ by more than £2)","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"t-p06-1521open","status":"done","prop":"P06","priority":"medium","title":"Done (lapsed with the loss): the 15-21 Nov opening on the intentional-block flat has run out - 16 and 17 Nov passed unsold (17 Nov £230, min 2), 18-21 Nov sit inside the booked 18-22 Nov Airbnb stay (£856.79); the policy note for the reopening moves to a-tidy","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"First review in: 5.0 (1), still 'New' in search, so comp-west keeps the 0-review line (median x 0.85); 20-24 Nov £267/n all-in, P0 / -7.4% vs median, +9% over the line (hold); remaining: parking first photo, review requests after the December and NYE stays (target 3 reviews by 31 Dec); Flexible-test comparison 11 days overdue","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback -7.7% (-4 n / -£316.70), On track again (was -10.7% Soft; window effect, fragile); base +37.9% vs P50 £206; 8 open nights left; correct them via a-p12-trim and t-p12-26nov-price, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"17 Nov single night lapsed; 27 Nov £304 / £213 (+50% min 1) on Finals Weekend Friday (market +12.1 vs STLY, 304 vs fortnight 242.7): priced, confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps; no Free cancellation pill on ours (4 P13 and 2 P20 comps show it)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced (the 14-18 Nov stay priced on it checks out today): ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Hygiene (pricelabs M4): id_map _unmatched (Marylebone Vrbo x3) and 7 pricelabs_other ids (P01/P08/P09/P10, P04 Vrbo, P13 Vrbo x2) no longer in PriceLabs - remove?; P02 Vrbo copy not pushed since 24 Feb (push on, never refreshed); info pack out of date (P04 base 220 vs 200 / max 450 vs 2000, P14 min 400 vs 450 / base 475 vs 525, P05 base 455 vs 550 / max 780 vs 3500; P11/P12/P13/P06/P01/P09 also behind); P20 3547481 not in the pack (330 vs policy 350); Barking recommended base 'Unavailable'; Vrbo +8% / Direct -10% unconfirmed; kpi_pack gaps [] misses the P20 orphans; record Reyhan's 15 Nov edits, P06 reopenings (15-21 Nov lapsed, 22-29 Nov), P20 delivery dates and the P04 synced Airbnb listing in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No comp replaced; P05 gained 1481043902711346984 (4 BR, 4.76 (17)) to reach 6; kept ids not returned for 6 days: P06 x2, P14 x2, P17 x1 (pages 200, calendars NOT CHECKED - probe refused by the permission system); P04 1387112821878102742 not returned on any of 19 stays; P20 789954794593691037 only on probes (5th day); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy _units_0004 last pushed 24 Feb 2026, never refreshed; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown (also relevant to t-airbnb-flex15-1611)","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (22-27 Dec Booking.com stay is the standard 15.0% of room + cleaning)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P04","title":"PriceLabs registered the P04 cancellation itself (refresh 17 Nov 09:09:57Z) and its Aggressive occupancy band (0 of 30 booked at 31-60 d, -15%) cut 20 Dec-1 Jan £2,733 -> £2,306 (-15.6%); uniform on every open night 17 Dec-16 Jan (-£893 on 31 nights); 17 Jan unchanged; DSOs unchanged; uncustomized fell ~16% too, so the a-discount-cut metric misses it","evidence":"pricelabs C1 (raw prices_3562176.json, live customizations and overrides, Smoobu rates 07:20Z)."},
{"agent":"market","severity":"high","ref":"P04","title":"The market does not justify the P04 Christmas cut: P50 £2,233 / P75 £2,849 flat vs 17 Nov, occupancy above STLY on all 13 nights (+1.7 to +17.9), December booking window 19-23 days; supports £2,417-£2,849; from 20 Nov the 16-30 d band (-20%) applies (inferred)","evidence":"market section 2 (get_neighbourhood_data P04, get_customizations, market_history)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 Christmas now below the comp band while comps held: 21-24 Dec -12.5% (in range), 23-27 Dec -17.9%, 28 Dec-2 Jan -26.3% (n=2); supported 20-22 Dec hold, 23-26 Dec +10%, 27 Dec-1 Jan +15% (about £2,545); NYE min 7/5 blocks 2-4 night stays the band sells at £192.50-248.50","evidence":"comp-east Priority 1 Christmas table; quality_premium -0.15; recommend +5% at 31-60 d."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still sells the sold 20-24 Nov at £741.40 (also 21-24 Nov £584.60, 18-21 Nov £571.00), day 19, arrival Friday; not offered on any Christmas-NYE stay","evidence":"channel section 2 (live Airbnb 07:22Z); comp-east (£742)."},
{"agent":"channel","severity":"high","ref":"P04","title":"Synced Barking Airbnb sells the repriced 13 n at £1,701.83 room (0.738x: 0.900 tier x weekly 18%), £715.51 below the lost Booking.com stay and £258.27 below policy; Long stay 10% on 5 n (-£87.66)","evidence":"channel section 1 (p04_2002jan, p04_2802jan cards 07:21Z)."},
{"agent":"channel","severity":"critical","ref":"P20","title":"P20 20-22 Nov on sale against the policy delivery block, 2 days out (20 Nov £317, 21 Nov £331, 22 Nov £278); Airbnb sells 20-23 Nov at £708.38 room; 22-24 Nov on sale at min 2 (£422.28 room)","evidence":"channel section 4 (p20_2023nov, p20_2224nov 07:22-07:23Z); pricelabs H4."},
{"agent":"occupancy","severity":"high","ref":"Portfolio","title":"No booking made or cancelled since 16 Nov 22:52 (~32 h); 717 -> 716 reservations is the 365-day window rolling; net pickup +28 n / +£5,636.44 is two 11 Nov cancellations leaving the window","evidence":"occupancy (two-window Smoobu pull 07:19Z; pick_rise.py)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 6-16 Dec £1,575 is -25% to -36% vs comps (about +20% supported); 17-19 Dec cut 182/188/194 -> 146/159/164 overnight at the 30-day edge, now -18.8% vs band (about +10% supported)","evidence":"comp-east Priority 1; pricelabs H3; market section 2 (6-15 Dec £1,432 vs P50 £1,581)."},
{"agent":"comp-central","severity":"high","ref":"P05 P11 P06","title":"P05 7-9 / 13-15 Dec -18% / -15% vs kept (qp +0.15; to median about £620 / £619); P11 darts 14-17 Dec avg £236.75, -22% vs kept (conflict), 8 Dec £288 +84% (P100), 23-25 Dec -12%; P06 22-23 Nov -13% (about £299 if the opening is confirmed); P06 29 Nov closed overnight with no reservation","evidence":"comp-central P05, P11, P06 tables (44 Airbnb searches 07:21-07:26Z)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 16-19 Dec self-corrected: engine cut 16-18 Dec -6.3% (to 302/332/311), now P38 / -2.6% vs comp median; a-p20-dec-1711 can close; P20 got its first review (5.0, 1)","evidence":"comp-west P20 December section; recompute check (comp_summary)."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"PriceLabs split the twins on 17 Nov (3090701 = 0.90x 3064856 on 13-17 Dec, no edit); 3090701 13-16 Dec -6.2% under its line: about +6% on 13-15 Dec supported; P13 Christmas registered in PriceLabs","evidence":"comp-west P13 section; raw prices_3064856 / 3090701."},
{"agent":"pricelabs","severity":"medium","ref":"P13","title":"121 of 146 jointly open P13 twin nights over the next 180 are still identical, all 17 Jan-17 May (channel: 43 of 68 to 28 Feb)","evidence":"pricelabs H3 (Smoobu rates 07:20Z); channel section 3."},
{"agent":"comp-east","severity":"medium","ref":"P12","title":"P12 cut overnight with no edit (18-19 Nov -13% to -16%, 2-3 Dec -12% to -13%): a-p12-trim mostly done; 26 Nov still P100 / +23.2% vs band (£294, supported £203-239); 1-3 Dec +12.0%","evidence":"comp-east Priority 2; pricelabs H3."},
{"agent":"occupancy","severity":"medium","ref":"P12","title":"P12 pace to the 13 Dec handback -7.7% (-4 n / -£316.70): On track again (was -10.7% Soft); window effect only, fragile","evidence":"occupancy pace section (rm.metrics.on_the_books)."},
{"agent":"pricelabs","severity":"medium","ref":"P05 P04 P11 P20","title":"PriceLabs discount gap £1,236 next 30 / £92 next 13 (P05 £649, P04 £311, P20 £276, P11 £205); all four still Aggressive occupancy + Booking Recency default","evidence":"pricelabs H2 (disc.py)."},
{"agent":"channel","severity":"high","ref":"P04 P05 P20 P13 P06","title":"Airbnb hidden layer day 20: no new booking, realised £3,966.66; largest open-card gaps P05 5-10 Jan £409.83, P20 14-19 Dec £275.57, P04 13 n £258.27; Long stay 10% on 5-6 n live on P05, P13 twins and P04 (not in policy)","evidence":"channel sections 3 and 6 (23 live Airbnb searches 07:21-07:25Z; 28 channel_checks rows)."},
{"agent":"channel","severity":"medium","ref":"P11 P12 P13 P04","title":"Booking.com since 24 Oct unchanged: 25 gross / 16 confirmed / 70 n / £11,564.66; 9 cancelled = 37.0% of gross room","evidence":"channel section 5."},
{"agent":"market","severity":"medium","ref":"P11 P20 P04","title":"Missed compression 15 n / £403 (rebuilt method; was 18 / £410), bookable 12 / £285; mostly fortnight artefacts in soft markets; real items are P04 Christmas -£427 and P04 6-19 Dec -£106 overnight, P05 7-8 / 13-14 Dec and P13 19-21 Dec","evidence":"market section 4 (analyse18.py)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12 P04","title":"18 Oct base rises unchanged: +25 n / +£7,329.70 like-for-like, +34 / +£9,196.31 incl. P06; no raised-unit booking or cancellation since 13 Nov; P04 comparison corrected to +37 n / +£4,602.78","evidence":"occupancy base-rise section (pick_rise.py, full recompute from the 18 Nov pull)."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Hygiene: id_map _unmatched and 7 secondary ids no longer in PriceLabs; P02 Vrbo copy not pushed since 24 Feb; info pack property facts out of date (P04/P14/P05 bases); 8 listings' push 22 h old at 07:20Z","evidence":"pricelabs H1 and M4 (listing_data.json, id_map.json, build/properties.py)."}
],
"top5":[
"P04 Barking Christmas-NYE was cut 15.6% by PriceLabs' own occupancy profile, not by the market: PriceLabs registered the cancellation itself (Sync Now no longer needed) and repriced 20 Dec-1 Jan from £2,733 to £2,306 while the market held (P50 £2,233 / P75 £2,849, occupancy above last year on all 13 nights) and comps held; Airbnb now sells it at £1,701.83 room and the cut likely deepens from 20 Nov. Choose one: P04 occupancy profile to 0% (recommended) or the 20 Oct DSOs to about +12.6% / +16%; target £2,545-£2,733. Also decide whether NYE min 7/5 drops to 3-4.",
"Two Friday arrivals at risk: 1455 still sells the sold 20-24 Nov (£741.40, day 19) - block its calendar today; P20 20-22 Nov is on sale against the delivery block (Airbnb 20-23 Nov £708.38 room), 2 days out - block it or update policy. P04 18-19 Nov min 2 did not sell; P20 22-24 Nov min 2 is on sale: confirm or revert.",
"Discount layers are now the biggest controllable leak: Airbnb hidden tiers day 20, £3,966.66 realised; PriceLabs £1,236 next 30 (£718 expected) plus the P04 occupancy cut of £893 on 17 Dec-16 Jan that the metric misses. Your direction covers both: cut PriceLabs discounts (Custom 0% on P05, P04, P11, P20), keep Booking.com discounts.",
"Prices below comps with no edit: P04 6-16 Dec -25% to -36% (+20%) and 17-19 Dec cut 15-20% (+10%); P05 7-8 / 13-14 Dec -18% / -15% (to the median, about £620); P11 darts avg £236.75 vs your >£300 (conflict); P06 22-23 Nov about £299 if you confirm the opening; P01 18-20 Dec block holds £800 at -14% vs comps.",
"Engine self-corrections and a quiet market: a-p20-dec-1711 done (16-19 Dec now -2.6% vs median); a-p12-trim mostly done, but P12 26 Nov is still P100 (£294 vs about £224); P12 back On track (-7.7%); PriceLabs split the P13 twins (+6% on 3090701 13-15 Dec supported; 121 identical nights remain from 17 Jan); no booking for ~32 hours - the +28 n net pickup is the window moving."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked at £279/£276/£245 (£800); if reopened £316.33/n all-in = -14.4% vs stored median £369.67 (n = 7), -8.3% vs band, parity supported (£720); 100% of 12 non-blocked nights booked; base-rise 0."},
{"ref":"P02","change":"Intentional block; pushed 18 Nov 00:23Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 18 Nov 02:56Z via Channex."},
{"ref":"P04","change":"PriceLabs registered the Christmas cancellation (17 Nov 09:09Z) and its occupancy profile cut 20 Dec-1 Jan £2,733 -> £2,306 (-15.6%; -£893 on 17 Dec-16 Jan) while market and comps held; Airbnb 13 n £1,701.83 room; 17-19 Dec cut 182/188/194 -> 146/159/164 (+10% supported); 6-16 Dec £1,575, -25% to -36% vs comps (+20%); 18-19 Nov min 2 not sold; 1455 still sells the sold 20-24 Nov (£741.40, day 19); fwd30 46.7% vs 23%, fwd60 23.3% vs 19%; pickup -9 n / -£1,927.75."},
{"ref":"P05","change":"No booking; 7-8 Dec rose to £487/£486 and 13-14 Dec to £516/£500 (engine) but still -18% / -15% vs kept (to the median about £620 / £619); 21 / 29 Dec £2,039 / £2,569 at +300% min 1; Long stay 10% on 5-n stays (-£194.13 / -£202.60); 18-22 Nov Airbnb stay modified 17 Nov (amount unchanged); recommended base 537 -> 538; fwd30 73.3% vs 46%."},
{"ref":"P06","change":"22-23 Nov £261/£247, -13% vs kept (n = 2), about £299 supported if the opening is confirmed (£52); 29 Nov closed overnight with no reservation (or min-4 orphan), cause NOT CHECKED; 16-17 Nov lapsed unsold (t-p06-1521open done); 24-29 Nov Airbnb stay modified 17 Nov; numbers only (policy); fwd 75.0% of 12 non-blocked vs 51%."},
{"ref":"P07","change":"Intentional block; pushed 18 Nov 03:54Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Tonight (18 Nov) is the last night before the handback; booked."},
{"ref":"P11","change":"No booking; darts 14-17 Dec avg £236.75 (-22% vs kept; conflict with >£300 / +5%); 8 Dec £310 -> £288, still +84% vs kept; 23-25 Dec £291/£276/£273, -12% kept (about +10% proposed); 3 Jan £170 (about £205 supported); 18-27 Nov +16% to +23% over kept on list (hold); fwd30 46.7% vs 50% (Soft); pickup +6 n / +£788.50 (window)."},
{"ref":"P12","change":"Engine cut overnight (18-19 Nov 225/234, 26 Nov 294, 2-3 Dec 263/268): a-p12-trim mostly done; 26 Nov still P100 / +23.2% vs band; 1-3 Dec +12.0%; pace -7.7%, On track again (window effect); base-rise +11 / +£1,660.21."},
{"ref":"P13","change":"Christmas 22-27 Dec now registered in PriceLabs; twins split by the engine (3090701 = 0.90x on 13-17 Dec, +5-6% on 18-21 Dec and 3-16 Jan); +6% on 3090701 13-15 Dec supported; 121 of 146 nights still identical from 17 Jan; Long stay 10% live on both twins; 27 Nov £304 on Finals Weekend; fwd30 76.7% vs 47%, fwd60 58.3%."},
{"ref":"P14","change":"Numbers only: min 450 (Reyhan; conflicts with the £500 special setup); refreshed 18 Nov 07:19Z (18 Dec 543 -> 484); 75 of 180 open nights at £450; P100 / +49% to +114% vs kept; 0% vs 48%."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only (145-160.50)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only (kept median 4.68)."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"First review 5.0 (1); 20-24 Nov rose to 317/331/278/274 (engine), -7.4% vs median, hold if selling, still on sale against the delivery block; 22-24 Nov min 2 conflict; 16-18 Dec cut to 302/332/311, -2.6% vs median (a-p20-dec-1711 done); orphans 5 Dec £265 (day 9) and 26 Dec £272 (min 4); fwd30 64.3% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 12 non-blocked nights booked to the 20 Dec handback; base -5.2% vs P50 £267; 18-20 Dec is a block question (occupancy; comp-east; market section 1)."},
{"ref":"P04","base":"200, was 220 (rec Unavailable)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended (£88, not additive with a-p04-dec-1611); ask PriceLabs why the recommendation is missing","reason":"6-19 Dec -19% to -36% vs comps; the Christmas cut is the occupancy profile, not the base; 46.7% vs 23% next 30, 23.3% vs 19% next 60; base +14.9% vs 2 BR P50 £174, -6.5% vs P75 (comp-east; occupancy; pricelabs C1 and M3)."},
{"ref":"P05","base":"550 (rec 538)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 46%; 7-8 / 13-14 Dec -18% / -15% vs kept; qp +0.15; recommend +25%; base -3.2% vs 4 BR P50 £568 (comp-central; market section 1)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 9 of 12 non-blocked nights booked (75.0%) vs 51%; base -12.7% vs P50 £409 (occupancy; market section 1; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"46.7% vs 50% (Smoobu, Soft); December open stays -11% to -22% vs kept while 18-27 Nov is +16% to +23% over on list; base -1.4% vs P50 £290; levers are date overrides (darts, 23-25 Dec, 3 Jan) and a-discount-cut (comp-central; occupancy; market section 1)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim, t-p12-26nov-price), not the base","reason":"69.2% to handback vs 42%; pace -7.7% (On track, window effect); open stays +4% to +23% vs band with qp -0.15; base +37.9% vs P50 £206; 8 open nights before the 13 Dec handback (comp-east; occupancy; market section 1)."},
{"ref":"P13","base":"250 (rec 241)","recommendation":"Keep 250 and record it in policy","reason":"76.7% vs 47% next 30, 58.3% vs 37% next 60; base +13.6% vs P50 £220; open December nights at or above the 2 BR median (comp-west; occupancy; pricelabs M3; market section 1)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 48%; P100 / +49% to +114% vs kept at £450; 75 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"64.3% vs 38% (30d), 55.2% vs 30% (60d); first review 5.0 (1), still priced on the 0-review line; base +28.9% vs P50 £256; December now -2.6% vs median after the engine cut (occupancy; comp-west; market section 1)."}
]}
```

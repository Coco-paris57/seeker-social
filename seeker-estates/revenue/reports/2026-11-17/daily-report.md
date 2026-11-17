# Seeker Estates - Daily revenue report, 2026-11-17 (Tuesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval. Where a PriceLabs refresh is needed, you or Reyhan press Sync Now; Claude does not.**

**Inputs**
- `reports/2026-11-17/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-17/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-16/daily-report.md` and its JSON, the dashboard action list (17 Nov, before this step), the full id list, and the overnight brief (Dispatcher: `reservations.csv` 17 Nov vs 16 Nov, full-row diff).
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (17 Nov). **No PriceLabs edits since 16 Nov:** `get_user_logs` returned 0 entries for listing, group and account, 16-17 Nov. Base, min, max and push are unchanged on all 20 listings (pricelabs). Every overnight price move is the engine's own, from the 16 Nov 09:40-09:43Z refresh.
- I used no guest data and no booking or reservation reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 openings (15-21 Nov, 22-29 Nov) are still your questions (t-p06-1521open, t-p06-2229open). The P06 price figure below is conditional on you confirming the opening.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701). Nights closed on one twin because the other is booked are bookings, not blocks. The twins must keep slightly different prices.
- **P04 "never open for fewer than 3 nights" is respected.** No min-1 or min-2 proposal on P04. The NYE question below asks about min 3, which policy allows.
- Not raised again: the Booking.com +10% markup, Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 (fully out), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion. The new P13 Christmas stay, sold through the promotion stack, is reported for size only.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price, t-p11-8dec-orphan, a-p20-dec-1711 (new) and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **P13 22-27 Dec commission: 15.0%, standard.** comp-west and market read £148.61 as 17.7% (of room only) and say it is outside the booster window. channel, occupancy and pricelabs show £148.61 = **15.0% of room + cleaning (£990.75)**. Booking.com charges on room + cleaning: the cancelled 18-23 Dec stay inside the booster window was 18.02% on the same basis (channel). **I use channel: standard 15%, not the booster. Nothing to flag.**
2. **P13 22-27 Dec: which twin, and is there a double-booking risk?** market says the twin is NOT CHECKED and raises a risk. occupancy, channel and comp-west read Smoobu: the stay is on **3064856**, and Smoobu has closed 22-26 Dec on **both** twins. Neither twin is offered on Airbnb for 22-27 Dec (channel 07:21:13Z, comp-west). PriceLabs still shows the nights open on both twins because its last refresh (16 Nov 09:42:53Z) came before the 22:52 booking. **I use occupancy/channel: sync lag only, no double-booking.**
3. **P04 unsynced Airbnb 1455 over Christmas-NYE.** market and occupancy say NOT CHECKED. channel (4 exhaustive searches, 49-61 cards each) and comp-east (10 Christmas-NYE stays) both find 1455 **not offered** on any Christmas-NYE stay, though it is offered just either side (17-20 Dec, 2-5 Jan). **No double-booking exposure on the reopened nights today.** Why 1455 is closed for exactly that block is NOT CHECKED.
4. **P04 forward occupancy.** occupancy 50.0% next 30 (15/30) and **25.0% next 60 (15/60)** (Smoobu); comp-east 52% (14/27) and 25% (14/57) on a sellable-night count; pricelabs/market 48% next 60 (stale: PriceLabs still holds the cancelled 13 nights). **I use occupancy.**
5. **P04 Christmas Airbnb price.** channel £2,016.94 room; comp-east £2,159 all-in. They agree: £2,158.94 card after weekly minus £142 cleaning = £2,016.94. comp-east's "about £144/n room" is the 20-27 Dec 7-night stay, not the full block.
6. **P04 Booking.com list for the block.** pricelabs about £3,006 (x1.10 on the total) vs channel **£3,011** (ceil x1.10 per night, the way Smoobu prices it). I use £3,011. Display NOT CHECKED (AWS WAF).
7. **P04 Christmas pricing.** market says nothing supports a cut, and raises a possible move above P75 on 28-31 Dec for you. comp-east says hold: 3-4 night stays are in range (-6% to +1% vs band), and the min stay, not the price, is the binding constraint. **I use comp-east: hold about P75; the min stay goes to you as a question.**
8. **P12 pace.** occupancy handback-aware **-10.7%** (-5 n / -£453.63, to 13 Dec) vs kpi_pack `pace_30` -18.9% (includes 14-16 Dec 2025 STLY, after the handback). **I use -10.7%: P12 is now Soft** (was On track at -9.3%).
9. **P11 darts average.** £234.25 on 14-17 Dec (occupancy, pricelabs) vs £248 on 14-18 Dec (comp-central, includes 18 Dec £303). Policy is about the darts nights 13-17 Dec, so I use **£234.25**.
10. **P13 identical twin nights.** channel 48 of 69 jointly open nights (Smoobu to 28 Feb) and pricelabs 124 of 145 (next 180). Different windows, same direction (yesterday 49 / 125).
11. **Missed compression fell £542 -> £410, but this is not a fix.** market §4: -£128 of the -£132 is P20 December rising **above P75 in a soft market** (16-18 Dec +15-20% with no edit). The real compression items are P13 Christmas (sold £513 under P50), P04 6-15 Dec and P05 7-8 / 13-14 Dec.
12. **Market percentiles mix bedroom counts (market correction).** The daily P25-P90 series are not bedroom-matched: 1-3 BR for P04, P11, P20, P01, P06; 2-3 BR for P13, P12; 3-5 BR for P05. Only the summary table is bedroom-matched. The 1 BR share pulls the daily P50 down for 2 BR flats (Barking 1 BR P50 £120 vs 2 BR £175); the 3 BR share pulls it down for P05 (3 BR £370 vs 4 BR £575). **Where a daily percentile drives a recommendation below, I say so:**
    - P04 Christmas "about P75" (1-3 BR): the 2 BR P75 is likely higher, so holding at P75 is conservative.
    - P20 16-18 Dec "above P75" (1-3 BR): overstated; the trim rests on the comp median (+7.0%), not on the percentile.
    - P13 Christmas "-37.9% vs P50" (2-3 BR): the comp gap (-9.3%, n = 3) is the like-for-like figure.
    - P05 7-8 / 13-14 Dec "to P75" (3-5 BR): understated for a 4 BR, so the raise is if anything conservative.
13. **P20 16-18 Dec `user_price` vs `price`.** comp-west asks which one is pushed. pricelabs field note: `price` is what is pushed (Smoobu equals `price` on every open night); `user_price` carries the previous refresh. Airbnb follows `price` (£1,058 for 16-19 Dec).
14. **P20 5 Dec orphan day count.** occupancy says day 9; pricelabs and comp-west say day 8. Yesterday's report said day 7. I use **day 8**.
15. **Rate leak (kpi_pack) is overstated by VAT** (channel §6). Corrected: P04 -8.7%, P11 -28.0%, P12 -24.6%, P13 -36.5% (pack -20.7% / -40.0% / -37.2% / -42.4%).

## Executive summary

1. **P04 Barking lost its Christmas-NYE stay.** The Booking.com 20 Dec-2 Jan booking (13 n, £2,417.34 room, £185.95/n) was cancelled on 16 Nov at 15:37. Who cancelled and why: NOT CHECKED.
   - Smoobu reopened 20 Dec-1 Jan at **£2,733** (£210.23/n), min 3-7. Synced Airbnb sells it now (13 n £2,016.94 room). Unsynced 1455 is **not** offering these dates.
   - **PriceLabs (last refresh 16 Nov 09:43Z) still shows the nights Booked**, so no PriceLabs change reaches them until it is refreshed.
   - Pricing: **£2,733 is about P75** (P50 £2,246, P75 £2,880, 1-3 BR mix). **Hold it there.** Once PriceLabs registers the cancellation, Aggressive occupancy will likely cut the block **10-15%, to about £2,323-2,445**. That is an estimate from the visible occupancy profile, not a reading.
   - **NYE min 7 (27 Dec) and min 5 (28-31 Dec) block the 2-4 night stays that comps sell** (31 Dec-2 Jan £192.50-264.50). Policy allows min 3. That is your question.
   - New critical **t-p04-xmas-1711**.
2. **P13 sold Christmas on Booking.com, cheaply.** 22-27 Dec, **£840.75 room (£168.15/n)** on 3064856.
   - That is 0.763x Smoobu and **0.694x the x1.10 list**. It is **-9.3% vs the comp median** (n = 3) and -37.9% vs market P50 (2-3 BR mix).
   - The value went on the promotion stack (likely NR 10% x NR occupancy -5% x Mobile 10% x Genius 10% = 0.6926; inferred, not seen). PriceLabs' price was not the cause: list was +24.7% over the comp median.
   - Commission is **15.0%, standard**.
   - It **nets £714.64 vs about £754.27 on Airbnb** for the same flat. Per your direction, no promotion change. I only ask for the breakdown (t-bcom-breakdown-1511).
   - PriceLabs has not registered it (sync lag, no double-booking).
3. **Two critical items this week, both with arrivals on Friday 20 Nov.**
   - **t-p04-doublebook, day 18:** 1455 still sells the sold 20-24 Nov (£741.40) and 18-21 Nov (£571).
   - **t-p20-delivery, 3 days out:** 20-22 Nov is on sale against the policy delivery block. Airbnb sells 20-23 Nov at £652.54 room. Only 18-19 Nov is blocked.
4. **Sync.**
   - **t-pl-sync-1611 is done:** P20 NYE is registered.
   - Price sync is clean: 0 mismatches on 237 open nights.
   - No listing has been refreshed for ~21 h 40 m, which is why both overnight bookings are missing from PriceLabs.
5. **Price gaps (no PriceLabs edits, all engine moves).**
   - **P04 6-16 Dec cut again** (£1,586, -6.8%; 16 Dec 179 -> 143). It is now **-24% to -33% vs comps**, so **+20% is supported** (£159).
   - **P12 rose overnight** with no edit. Pace is -10.7%, so P12 is now **Soft**. Trims supported: 18-19 Nov -8%, 26 Nov to about £205-240, 1 Dec -5%, 2-3 Dec -12%.
   - **P20 16-18 Dec rose +15-20%** with no edit, to +7% vs the comp median on a 0-review flat in a soft market. Back to about -5% vs median (new a-p20-dec-1711, your call).
   - a-discount-cut: **£277 next 13 / £1,348 next 30** (expected £811).
   - P05 7-8 / 13-14 Dec are -16% vs comps. P06 22-23 Nov is -12% vs comps (if the opening is confirmed). P11 darts is -24% vs kept (conflict). P11 8 Dec £310 is far above comps.
   - Missed compression is 18 n / £410 (not a fix; see correction 11).
6. **Airbnb hidden layer, day 19:** £3,966.66 realised (no new Airbnb booking overnight). The largest open-card gaps are P05 5-10 Jan £413.25, P04 Christmas £306.11 and P20 14-19 Dec £250.50.
7. **Booking.com since 24 Oct:** 25 gross / **16 confirmed** / 70 n / £11,564.66. **Cancellations are 37.0% of gross room** (£6,796.87; down from 38.8% because the new P13 stay raised the base). The P04 Christmas cancellation was booked before the cut, so it is outside that figure.

**Last 30 nights (18 Oct-16 Nov, 13 units):** occupancy **59.0%**, ADR **£172.90**, RevPAR **£101.97**, revenue **£39,766.52**, **230 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 60.0% / £173.85 / £104.31 / £40,682.01 / 234 n.

**Next 30 (17 Nov-16 Dec):** **59.3%** booked (144/243; yesterday 60.5%, 150/248). **Next 60 (17 Nov-15 Jan):** **46.8%** (198/423; yesterday 49.8%, 213/428).
- Source: occupancy section, live Smoobu GET 07:18:33Z, handback-aware. The two endpoints agree on every unit-night. **Smoobu is used, not kpi_pack**, because PriceLabs still holds the cancelled P04 stay and lacks the new P13 stay.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, and nights after each handback.
- Reconciliation, next 30: 0 new and 0 cancelled inside the window; 16 Nov out -7; 16 Dec in +1. 150 - 7 + 1 = 144.
- Reconciliation, next 60: 213 + 5 (P13 22-27 Dec) - 13 (P04 cancellation) - 7 (16 Nov) + 0 (15 Jan) = 198.

**7-day pickup (bookings made 11-17 Nov, to 07:18Z):**
- Gross: 10 bookings / 49 n / £9,581.28. Still confirmed: 9 / 44 n / £8,734.18.
- Cancelled in the window: 5 / 32 n / £5,596.24.
- **Net: +17 n / +£3,985.04** (yesterday +29 n / +£5,853.59).
- Reconciliation: 10 Nov leaving the window -4 n / -£291.96; overnight +5 n / +£840.75 (P13) - 13 n / -£2,417.34 (P04) = -8 n / -£1,576.59.

## The two overnight changes

**Source:** occupancy, pricelabs C1/H2, channel §1-§2, market §2, comp-east, comp-west. Room = Smoobu basePrice (cleaning excluded; Booking.com includes VAT).

| Flat / stay | Room | Smoobu / PriceLabs | Comps (same dates) | Market (daily, bedroom mix) | In PriceLabs? | Channels now |
|---|---|---|---|---|---|---|
| **P04** Booking.com 20 Dec-2 Jan (13 n), **cancelled** 16 Nov 15:37 (booked 20 Oct) | **-£2,417.34** (£185.95/n) | Reopened 20 Dec-1 Jan at 189/193/187/200/204/198/195/208/228/229/230/241/231 = **£2,733**. Min 3 (20-22 Dec), 4 (23-26 Dec), **7 (27 Dec)**, **5 (28-31 Dec)**, 4 (1 Jan). Uncustomized £3,473 (0.787x) | 21-24 Dec +1.2% / 23-27 Dec -5.7% vs band (in range). 7+ night stays -20% to -24% (mostly the standing weekly 15%). 28 Dec-2 Jan -15.9% (n = 2). 5 of 7 comps booked over Christmas (comp-east) | P50 £2,246 / **P75 £2,880** (1-3 BR). Occupancy +2.8 to +18.2 vs STLY, peak 31 Dec | **No:** Booked, last refresh 09:43:29Z | Synced Airbnb **£2,016.94 room for 13 n** (0.738: 0.900 tier x weekly 18%); 3-4 n stays at 0.900. **1455 not offered.** Booking.com NOT CHECKED (WAF) |
| **P13** Booking.com 22-27 Dec (5 n), **new**, 16 Nov 22:52, on **3064856**, 36 d lead | **+£840.75** (£168.15/n) | 216/225/219/220/222 = £1,102 (0.763x); list £1,212.20 at x1.10 (**0.694x**). Commission £148.61 = **15.0%** of room + cleaning | All-in £198.15/n = **P0 of 3 / -9.3%** vs median £218.40; P5 of wider 19 (£302.60); between the twin lines | **-37.9% vs P50** £270.8/n (2-3 BR); occupancy +9.9 to +21.6, the most compressed nights in the series | **No** (both twins show 22-26 Dec open; refresh 09:42:53Z) | Smoobu and Airbnb closed on both twins: no double sale |

- **P04 effect:** next 60 drops to 25.0% (from 48.3%); next 30 is unchanged at 50.0%. Pickup -13 n / -£2,417.34.
- **P13 effect:** +5 n / +£840.75; next 60 rises to 58.3%. Nets £714.64 (x0.85) against about £754.27 modelled on Airbnb (0.900 tier, LOS 10%, 15.5% fee). Black Friday (bookable from 19 Nov) would have shown £849.80, so it does not undercut the stack that applied.

## Reyhan's PriceLabs edits: none since 16 Nov

`get_user_logs` returned 0 entries (listing, group, account, 16-17 Nov). As a control, the 15-17 Nov listing query returns the same 25 edits as yesterday. **The confirm-or-revert list is unchanged (a-p13-record), with today's numbers:**
- **P04 18-19 Nov +10% min 2** vs your never-under-3 rule. Check-in would be **tomorrow**. Smoobu £167/£170. Airbnb sells 18-20 Nov as 2 nights at £244.80 room (0.726). The price is in range (-5% to -7% vs band, comp-east).
- **P20 17 Nov and 22-24 Nov min 2** vs min 3 to 30 Nov. 22-24 Nov is on sale at £390.91 room.
- **P13 twins identical** on 13-16 Dec (244/240/237/241 on both; Airbnb £702 on both for 13-16 Dec).
- **P11 darts 14-18 Dec 0%** vs your +5% / >£300. The 14-17 Dec average is £234.25. Comps support about £284-334 room.
- **P05 Jan/Feb -5%**, **P04 base 200** (your 220), P04 6-22 Dec -5%, P14 min 450, P05 max 3,500, P20 base 330 (your 350).

## Base review

`base_price` is unchanged on every listing (pricelabs). Base vs market P50 is from pricelabs M3 (bedroom-matched summary table).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 13 non-blocked nights to the 20 Dec handback; base -4.9% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (your 220)** / **"Unavailable"** | 50.0% vs 24% next 30, 25.0% vs 19% next 60; 6-16 Dec -24% to -33% vs comps after another engine cut; `recommend` raise +10% at 30 d; base +14.3% vs 2 BR P50 (£175) | **Conflict: confirm 200 or revert to 220.** I recommend reverting (£96, not additive with a-p04-dec-1611). Ask PriceLabs support why the recommendation dropped out |
| P05 | 550 / 537 | 70.0% vs 46%; 7-8 / 13-14 Dec -16% vs median; qp +0.15; `recommend` +25%; base -4.5% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 69.2% of 13 non-blocked vs 51%; base -13.1% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / 281 | 50.0% vs 50%; December open stays -13% to -24% vs kept; 18-27 Nov +20% to +23% over on list; `recommend` +5%; base -1.4% vs P50 | **Hold 286.** Levers: a-discount-cut, the darts override, 23-25 Dec / 3 Jan |
| P12 | 284 / 284 | 66.7% to handback vs 43%; **pace -10.7% (Soft)**; open short stays +5% to +28% vs band with qp -0.15; base +37.2% vs P50; 9 open nights left before the 13 Dec handback | **Hold 284; correct the open nights with date overrides** (a-p12-trim, t-p12-26nov-price). A base cut would reprice nothing that the trims do not already cover |
| P13 | 250 / 241 | 76.7% vs 47%; next 60 58.3% vs 37%; base +12.1% vs P50; Christmas loss was the Booking.com stack, not the base | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 48%; P100 / +49% to +122%; 75 of 180 open nights at £450 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 64.3% of 28 non-blocked vs 39%; 55.2% vs 30% next 60; 0 reviews; base +29.4% vs P50 | **Conflict: confirm 350 or record 330** |

## What changed since 16 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+25 n / +£7,329.70** (unchanged) |
| Raised, including P06 | **+34 n / +£9,196.31** (made 28 / 108 n / £23,831.63; cancelled 13 / 74 n / £14,635.32; unchanged) |
| Unraised (P02, P08, P10, P14, P20*) | +51 n / +£9,443.82 (unchanged) |
| P13 (comparison) | **+27 n / +£4,704.65** (was +22 / +£3,863.90; the new Christmas stay adds +5 / +£840.75) |
| P04 (comparison) | **+37 n / +£2,115.38** (was +50 / +£2,115.38) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat (occupancy table, confirmed):** P01 0 / £0; **P05 +16 / +£6,135.19**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21. No raised flat had a booking or cancellation overnight.
- **Method flaw (occupancy), P04 comparison only.** The P04 20 Oct import batch (6 records, including the cancelled Christmas stay) has no Smoobu basePrice. The script counts its nights at £0. So P04's nights moved (-13) but its £ did not. With `reservations.csv` `total_gbp`, P04 was +50 / +£4,532.72 yesterday and is +37 / +£2,115.38 today. The batch is an import, not post-rise pickup. **The raised-group figures are not affected.**
- **Reading:** unchanged. Without P05 the raised group like-for-like is +9 n / +£1,194.51. **Hold the bases.** The caveats stand: the markup changes, promotions, Reyhan's overrides and the P06 reopening cannot be separated out (n = 1-9 bookings per flat).

### Per property
| Ref | Change since 16 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked, now 280/277/246 (£803). If reopened: £317.33/n all-in = P29 / -14.2% vs stored median £369.67 (n = 7), -8.0% vs band; parity supported. 100% of 13 non-blocked nights. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight (P03 via Channex 03:01Z). P02 Vrbo copy stale since 24 Feb. |
| P04 | **Christmas-NYE Booking.com stay cancelled (-13 n / -£2,417.34)**; 20 Dec-1 Jan open in Smoobu at £2,733, PriceLabs still Booked. Synced Airbnb sells it (13 n £2,016.94 room); 1455 not offered. **6-16 Dec cut again: £1,586 (-6.8%), 16 Dec 179 -> 143; -24% to -33% vs comps.** 1455 still sells the sold 20-24 Nov (£741.40), day 18. 18-19 Nov min 2 (conflict). Synced Airbnb: weekly 18% and a new Long stay 10% on 5 n. Fwd30 50.0% vs 24%; fwd60 25.0% vs 19%. Pickup -9 n / -£1,927.75. |
| P05 | No booking. 7-8 Dec £923, 13-14 Dec £962: P0 / -16% vs kept (n = 3-4). 1 Dec 523 -> 495 (engine). 21 Dec £2,054 / 29 Dec £2,563 (+300% min 1, n = 0 comps). Long stay 10% confirmed on 5-10 Jan (-£195.75). 17 Nov orphan tonight (£373). Fwd30 70.0% vs 46%. |
| P06 | 22-23 Nov rose 250/236 -> 265/249 (engine): P0 / -12% vs kept (n = 3), -33% wider; about £295/n supported if the opening is confirmed. 29 Nov orphan £256 min 4. 17 Nov orphan tonight (£230). Numbers only (policy). Fwd 69.2% of 13 non-blocked vs 51%. |
| P08 | Handed back. |
| P09 | No sellable night before the 26 Nov handback. |
| P10 | Booked to the 18 Nov handback. |
| P11 | No booking. Darts 14-17 Dec £227/£228/£236/£246 (average £234.25): **-24% vs kept / -11% wider on list** (conflict). 23-25 Dec 286/263/272: -13% kept / -9% wider. 8 Dec £310: list all-in +94% kept / +70% wider. 3 Jan £171. 18-27 Nov +20% to +23% over on list (hold). Fwd30 50.0% vs 50%. Pickup -1 / -£224.36 (10 Nov booking dropped out of the window). |
| P12 | **Rose overnight with no edit:** 18-19 Nov 255/265 -> 268/268, 26 Nov 301 -> 307, 2-3 Dec 287/294 -> 299/308. **Pace -10.7% -> Soft** (window roll; no booking change). 18-20 Nov +5.5% vs band (P60); 26 Nov P100 / +27.7%; 2-4 Dec P91 / +22.7%. |
| P13 | **New Booking.com 22-27 Dec £840.75 (0.694x list; P0 of 3 / -9.3%; commission 15.0%)** on 3064856; not yet in PriceLabs. 13-21 Dec open (hold). 16 Dec 3064856 206 -> 241 (engine). Twins identical on 13-16 Dec. Fwd30 76.7% vs 47%; fwd60 58.3%. |
| P14 | Numbers only: 75 of 180 open nights at £450; P100 / +49% to +122%; 0% vs 48%. Push 23 h 16 m old at 07:23Z (crosses 24 h at 08:07Z). |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **t-pl-sync-1611 done** (NYE registered; PriceLabs occupancy_next_60 45% -> 57%). **December rose about 13% with no edit: 16-18 Dec 271/292/301 -> 325/338/345**, 16-19 Dec now P62 / +7.0% vs median, 25.9% over the 0-review line. 20-24 Nov 300/299/254/257/239 on sale (delivery conflict); comp-west: hold if selling. Orphans 5 Dec £277 min 3 (day 8) and 26 Dec £271 min 4. Fwd30 64.3% vs 39%. |

### Open plan items: status today
| Item | Status 17 Nov (evidence) |
|---|---|
| t-pl-sync-1611 | **Done: fixed.** Raw 3547481 (refresh 16 Nov 09:43:29Z): 27 Dec "Booked (Check-In)", 2 Jan Booked, ADR 257.68 (pricelabs H3, occupancy, channel §5) |
| t-p04-xmas-1711 (new, critical) | P04 Christmas-NYE reopened; PriceLabs stale; pricing and min-stay decision |
| a-p20-dec-1711 (new, your call) | P20 16-18 Dec +15-20% with no edit, +7.0% vs median |
| t-p04-doublebook | Not fixed, day 18 |
| t-p20-delivery | Unchanged; 3 days out |
| a-airbnb-rules | Not fixed, day 19; £3,966.66 (no new Airbnb booking) |
| a-p04-dec-1611 | Not done and worse: +20% now supported (was +15%) |
| a-p12-trim | Partly reversed by the engine; sizes updated |
| t-p20-5dec-orphan / t-p20-26dec-orphan | Not fixed (day 8 / day 2); 26 Dec no longer needs a sync first (`unbookable` 1) |
| t-bcom-breakdown-1511 | Extended to the new P13 22-27 Dec stack |
| t-p06-1521open | 16 Nov lapsed unsold; 17 Nov lapses tonight; the policy question remains |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-17

**Ranking:** time-bound rows first (arrivals this week), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). Airbnb factor (channel §4): 0.765 up to 28 d, 0.900 at 29-59 d. P11 (Booking.com only): 0.762. P04: booked share only (same method as the last two days). These are upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.500, P05 0.700, P06 0.692, P11 0.500, P12 0.667, P13 0.767, P20 0.643.
- Booked share, next 60: P04 0.250, P05 0.617, P11 0.450, P13 0.583, P20 0.552.

**Bounds** (`kpi_pack` settings, 17 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 18, arrival Friday).** On 1455876748739910219, **block every date now, starting with 18-24 Nov**, or snooze/unlist it. Keep its Christmas-NYE dates closed. Then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §3 (07:21:00Z): **20-24 Nov bookable at £741.40** although sold on the synced listing; 18-21 Nov £571.00 (includes booked 20 Nov); 6-13 Dec £1,290.26, 17-20 Dec £694.10, 2-5 Jan £684.20. comp-east: £742; not offered on any Christmas-NYE stay | Not quantified (exposure = any booking on 1455 plus relocation cost; 20-24 Nov would be a certain double booking) | Corentin | 2026-11-18 |
| 2 | P20 | **t-p20-delivery (critical, 3 days out).** Confirm the delivery dates. **If delivery is 20-22 Nov:** block 20-22 Nov in Smoobu today. **If not:** update `policy.json listing_facts.P20.block_20_21_nov` and hold the price (no change). | Smoobu > Calendar > Waterford; `policy.json` | channel §5: Smoobu/PriceLabs block 18-19 Nov only; **20 Nov £300, 21 Nov £299 (min 3), 22 Nov £254 (min 2) open; Airbnb sells 20-23 Nov at £652.54 room** (07:21:23Z). comp-west: 20-24 Nov P0 / -13.3% vs median, +2.0% over the 0-review line: hold. market: 20-21 Nov occupancy -2.6 / -6.5 vs STLY | Not quantified (a policy question) | Corentin | 2026-11-18 |
| 3 | P04 P13 | **NEW t-p04-xmas-1711 (critical).** (a) **You or Reyhan press Sync Now** in PriceLabs on Barking 3562176 and on both Shepherd's Bush listings (3064856, 3090701). Check that P04 20 Dec-1 Jan shows open and P13 22-26 Dec shows Booked / Blocked. (b) **Then read the new P04 prices before deciding.** Target: **hold the 13 nights at about £2,733 (about P75)**. If the refresh cuts them, raise the 20 Oct DSOs (20-31 Dec -5%, 1 Jan -2%) by the cut's size: about **+5%** if prices fall 10%, about **+12%** if they fall 15%. (c) **Your question (min stay, not price):** keep 27 Dec min 7 and 28-31 Dec min 5, or set **27-31 Dec to min 3-4** (policy floor 3) so 2-4 night NYE stays can sell. Keep 20-26 Dec as they are (min 3/4). | PriceLabs > Barking / Shepherd's Bush > Sync Now; PriceLabs 3562176 > DSO 20 Dec-1 Jan | pricelabs C1: PriceLabs last refresh 16 Nov 09:43:29Z, 6 h before the 15:37 cancellation; 13 nights "Booked", `user_price` -1, so no PriceLabs edit reaches them. Smoobu: open at **£2,733** vs P50 £2,246 / **P75 £2,880** (1-3 BR mix: 2 BR P75 likely higher) / uncustomized £3,473. comp-east: 21-24 Dec +1.2%, 23-27 Dec -5.7% vs band (in range, hold); 27 Dec-1 Jan hold; **min 7/5 blocks every 2-4 night NYE stay; comps sell 31 Dec-2 Jan at £192.50-264.50**. market: occupancy +2.8 to +18.2 vs STLY (31 Dec +18.2). pricelabs: Aggressive occupancy at 0 of 30 booked in the 31-60 d band would cut **10-15% (about £2,445 / £2,323; estimate)**. P13 22-26 Dec open on both twins in PriceLabs (refresh 09:42:53Z, booking 22:52). Refresh age ~21 h 40 m | Re-sells a block that paid **£2,417.34**. Protecting the price: £288-£410 on the 13 nights (estimate, from the estimated cut) x 0.250 = **£72-£103 (estimate, not a reading)**. Min-stay change: not quantified | Corentin / Reyhan | 2026-11-18 |
| 4 | P04 P20 P13 P11 P05 P14 | **a-p13-record: confirm or revert Reyhan's edits.** **Time-bound:** (a) **P04 18-19 Nov min 2 -> 3** (check-in tomorrow), or keep it and record it in policy. (b) **P20 22-24 Nov (and 17 Nov) min 2 -> 3**, or record it. Then: (c) **P11 darts DSO 14-18 Dec 0% -> +5%** (about 238/239/248/258/318); (d) P05 Jan/Feb -5%: confirm or revert; (e) **P04 base 200 -> 220**; (f) P04 6-22 Dec -5% (see row 9); (g) P14 min 450, P05 max 3,500, P20 base 330 vs 350: confirm. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3547481, 3064196, 3166592, 3267077; `policy.json` | pricelabs H5 (logs 0 since 16 Nov; overrides unchanged); channel §5 (P04 18-20 Nov on Airbnb at £244.80 room, 0.726; P20 22-24 Nov at £390.91); comp-central (darts -24% kept / -11% wider; supported £284-334 room; average £234.25 vs your >£300); comp-east (P04 6-16 Dec -24% to -33%) | P11 darts: £1,240 x 0.05 x 0.762 x 0.450 = **£21**. P04 base: £1,923 (18-19 Nov + 6-16 Dec) x 0.10 x 0.500 = **£96** (not additive with row 9). Total **£117** (upper bound) | Corentin | 2026-11-18 |
| 5 | Portfolio | **a-deposit (deadline 20 Nov, 3 days).** Decide: £1,000 hold, damage waiver, or ID check only, before Airbnb's rule change. | Airbnb account settings | policy `guest_requirements` | Not quantified | Corentin | 2026-11-19 |
| 6 | P20 P13 P05 P06 P04 P12 | **a-airbnb-rules (critical, day 19).** Remove the hidden rules: nights up to 28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). On Barking, find the extra 0.95 on 2-night stays. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §4: tiers unchanged and applied per night by lead time (P20 14-19 Dec £1,394.51 modelled vs £1,394.50 card); every synced card reconciles to Smoobu x tier x visible discount; no new Airbnb booking overnight | **Realised cost £3,966.66** (unchanged). Largest gaps on today's open cards (they overlap, not summed): P05 5-10 Jan **£413.25**, P04 Christmas 13 n **£306.11**, P20 14-19 Dec **£250.50**, P05 4-11 Jan £256.97, P04 28 Dec-2 Jan £220.21 | Corentin | 2026-11-18 |
| 7 | P05 P04 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P05, P04, P11 and P20. All four are still Aggressive occupancy with Booking Recency default; last-minute is P04 5% gradual and P05 1% gradual. **P12 and P13 excluded** (priced above uncustomized). On P04 this stops the 30-day-edge cuts (16 Dec 179 -> 143 today; 15 Dec 176 -> 148 yesterday) and the expected Christmas cut once the block registers (row 3). | PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations | pricelabs H4 (an17.py), next 30 (18 Nov-16 Dec): **P05 8 n £659 (-14.5%)**, **P04 14 n £492 (-19.2%)**, P11 15 n £273 (-7.3%), P20 9 n £219 (-7.8%); total **£1,348 next 30 / £277 next 13** | 659 x 0.765 x 0.700 + 492 x 0.500 + 273 x 0.762 x 0.500 + 219 x 0.765 x 0.643 = **£811 / 30 days** (upper bound) | Corentin | 2026-11-18 |
| 8 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec so **18-20 Dec** sell at £280 / £277 / £246, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £317.33/n all-in = **P29 / -14.2%** vs stored median £369.67 (n = 7), **-8.0%** vs band £345; parity supported (qp 0; up to about +8%); raw 17 Nov still `Blocked` | £803 x 0.900 = **£723** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-18 |
| 9 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £680) and **29 Dec +300% -> 0%** (£1,020). **7-8 Dec DSO +3% -> +29%** (463/460 -> about 580/576) and **13-14 Dec +5% -> +31%** (488/474 -> about 609/591), per `recommend` +25%. That lands at about the comp median level (£578 / £598). Comps support up to +15% over the median (about £684 / £706). | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-8 Dec **P0 / -16%**, 13-14 Dec **P0 / -16%** vs kept (n = 3-4), -14% vs wider; qp +0.15; `recommend(0.70, 0.46, 0.08, 0.15)` = +25%; market: +£208 / +£193 to P75 (3-5 BR mix understates a 4 BR), 13 Dec +12.4 vs STLY; 21/29 Dec n = 0 qualifying comps, 2.3-2.4x P90 | 7-8 Dec £231 x 0.765 x 0.700 = £124; 13-14 Dec £241 x 0.765 x 0.700 = £129; 21 Dec £680 x 0.900 x 0.617 = £378: **£631** (upper bound). 29 Dec not quantified | Corentin | 2026-11-18 |
| 10 | P04 | **a-p04-dec-1611 (worse).** DSO **6-16 Dec -5% -> +14%** (about +20%: 144/142/142/142/145/152/154/144/137/141/143 -> about 173/170/170/170/174/182/185/173/164/169/172). Keep 17-19 Dec at -5% (hold). If you revert the base to 220 (row 4e), use **+4%** on 6-16 Dec instead. | PriceLabs 3562176 > DSO 6-16 Dec | comp-east Priority 1: 6-9 Dec **P0 / -29.4%**, 9-12 Dec -28.2%, 11-14 Dec -24.1%, **14-17 Dec -32.9%**; supported room about £166-205; comps 0.0% like-for-like overnight while PriceLabs cut 5% (16 Dec -20% at the 30-day edge); `recommend` +10% at 30 d, adopted at the larger size because the comp gap exceeds the step. pricelabs H4: £1,586 vs £1,702 at the previous refresh. market: 6-15 Dec £1,443 vs P50 £1,588 / P75 £2,053 | £1,586 x 0.20 x 0.500 = **£159** (upper bound) | Corentin | 2026-11-18 |
| 11 | P20 | **t-p20-5dec-orphan (day 8).** DSO **5 Dec min 3 -> 1**, keep £277 (outside the policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H4 / M1 (`unbookable` 1; DSO 0% min 3 since 9 Nov); comp-west: supported min 1 at about £277, between market P50 £228 and P75 £298 (1-3 BR mix); Jingle Bell Ball 5-6 Dec | £277 x 0.765 x 0.643 = **£136** | Corentin | 2026-11-18 |
| 12 | P20 | **t-p20-26dec-orphan.** DSO **26 Dec min 4 -> 1**, keep the price (£271; Reyhan's -5% stays your call). PriceLabs now knows the NYE stay, so no sync is needed first. Where the min 4 comes from (no DSO min field) is UNKNOWN: check the min-stay customization too. | PriceLabs 3547481 > DSO 26 Dec | occupancy, pricelabs H4 (raw `unbookable` 1, min 4); comp-west: supported min 1 at £271-300, between market P50 £256 and P75 £335 (1-3 BR mix); wider 1-night median £345 (n = 5) | £271 x 0.900 x 0.552 = **£135** | Corentin | 2026-11-18 |
| 13 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the block to start 30 Nov intended? **If yes:** add a date note to `policy.json`, and (your call) raise 22-23 Nov to about **£295/night** (265/249 -> 295/295; DSO about +15%) and set 29 Nov min 4 -> 1 (keep £256). **If no:** re-block 22-23 and 29 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 | comp-central: 22-23 Nov **P0 / -12% vs kept (n = 3)**, -33% wider; qp -0.016; supported -2% vs median = about £295; `recommend` +10%; 29 Nov orphan P50 / -18% at min 4 | 22-23 Nov: (£590 - £514) x 0.765 x 0.692 = **£40** (only if the opening is confirmed) | Corentin | 2026-11-18 |
| 14 | P11 | **t-channel-gaps.** **23-25 Dec DSO about +12%** (286/263/272 -> about 320/295/305, average about £307). **3 Jan:** DSO so the price is about **£195** (£171 now). The +12% overrides `recommend`'s +5% because the kept gap (-13%, n = 8, up from n = 6) exceeds the step; it stays at the low end of the supported £306-322. | PriceLabs 3064196 > DSO 23-25 Dec, 3 Jan | comp-central: 23-25 Dec -13% kept / -9% wider; 3 Jan priced as 3-5 Jan -17% kept / -4% wider, supported £194-232; channel §5: 23 Dec target ≥£320 not met; market: 23-25 Dec occupancy -3.0 to -8.2 vs STLY (soft; the reason I stop at the low end) | 23-25 Dec £821 x 0.12 x 0.762 x 0.450 = £34; 3 Jan £24 x 0.762 x 0.450 = £8: **£42** | Corentin | 2026-11-19 |
| 15 | P12 | **a-p12-trim (your call: lowers a price; the engine reversed part of Reyhan's fix).** **18-19 Nov DSO 0% -> -8%** (268/268 -> about £247; 17 Nov excluded per policy). **1 Dec 0% -> -5%** (270 -> about £257). **2-3 Dec 0% -> -12%** (299/308 -> about 263/271). Hold 20 Nov and 30 Nov. Override of `recommend` (mechanical raise +5%): the raise branch ignores qp -0.15, and the occupancy lead comes from nights already sold. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 18-20 Nov **P60 / +5.5%** vs band (NL P84); 1-3 Dec **P80 / +14.1%**; **2-4 Dec P91 / +22.7%**; 30 Nov-3 Dec +9.9%; overnight engine rise 18 Nov +5%, 2-3 Dec +4-5%. occupancy: **pace -10.7%, Soft** | Not quantified (a cut) | Corentin | 2026-11-18 |
| 16 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -15%**, keep min 1 (£307 -> about £224). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £360 all-in, **P100 / +27.7%** vs band (n = 5), NL >P90; supported room £204-240; uncustomized £264 | Not quantified (a cut) | Corentin | 2026-11-18 |
| 17 | P20 | **NEW a-p20-dec-1711 (your call: lowers a price).** DSO **16-18 Dec about -13%** (325/338/345 -> about 283/294/300, average about £292). Hold 14-15 Dec (318/319). Sized from comp-west's supported -5% vs the comp median for a 0-review flat. | PriceLabs 3547481 > DSO 16-18 Dec | comp-west: the 16 Nov refresh raised 16-18 Dec **271/292/301 -> 325/338/345 (+15-20%) with no edit or override**; 16-19 Dec Airbnb £1,058 = **P62 / +7.0% vs median (n = 8), 25.9% over the 0-review line**; same-comp change 0%; market P50 16-18 Dec unchanged (226 vs 227), occupancy 21-24%, -2.2 to -6.5 vs STLY; market "above P75" uses a 1-3 BR mix, so the comp figure drives this | Not quantified (a cut) | Corentin | 2026-11-19 |
| 18 | P11 | **t-p11-8dec-orphan (partly fixed; your call: lowers a price).** Keep min 1 (Reyhan's). Set the 8 Dec price to about **£150**: DSO **+50% -> about -27%** (on the pre-override £207). | PriceLabs 3064196 > DSO 8 Dec | comp-central: £310 = list all-in £490, **P100 / +94% kept, +70% wider**; a 1-night stay carries the full £149 cleaning, so the wider median supports about **£126 room** (kept about £95) | Not quantified (a cut on a sellable night) | Corentin | 2026-11-19 |
| 19 | P13 | **t-p13-twins (conflict: Reyhan's copy-from-parent).** Restore a gap: DSO **3090701 about +3%** on **13-16 Dec** and on 16 Jan-28 Feb (child only; set it after any parent edit). Which twin is cheaper is not raised (deprioritised). | PriceLabs 3090701 > DSO | pricelabs H4: 13-16 Dec 244/240/237/241 on **both**; 124 of 145 open nights identical (next 180); channel §4: 48 of 69 jointly open nights identical; comp-west: Airbnb £702 on both for 13-16 Dec | Not quantified (duplicate-listing risk) | Corentin | 2026-11-19 |
| 20 | P13 P12 | **t-bcom-breakdown-1511 (question; no promotion change).** Send the extranet breakdown of the **new P13 22-27 Dec stay** (rate plan NR or Standard; which layers make 0.6926 of list) and of P12 7-14 Dec. | Booking.com extranet (Shepherd's Bush, Mile End) > Reservations | channel §2: paid £840.75 = **0.6926 of the £1,214 list** (best fit NR 10% x NR occupancy -5% x Mobile 10% x Genius L1 10%; not seen); **nets £714.64 vs about £754.27 on Airbnb** for the same flat; comp-west: list +24.7% over the comp median, paid -9.3% under | Not quantified (no change proposed) | Corentin | 2026-11-19 |
| 21 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 9 post-cut Booking.com cancellations, **and for the P04 Christmas-NYE cancellation** (booked 20 Oct, cancelled 16 Nov). | Booking.com extranet > Reservations | channel §2: **9 of 25 gross cancelled (37.0% of gross room, £6,796.87)**; confirmed 16 / 70 n / £11,564.66; 4 of 5 since +10% confirmed; channel §1: P04 £2,417.34 cancelled, no reason in Smoobu | Not quantified | Corentin | 2026-11-19 |
| 22 | P06 P20 P05 | **t-airbnb-flex15-1611 (no new evidence).** Open the Airbnb reservation price breakdowns for P20 27 Dec-3 Jan, P05 13-17 Feb and P06 24-29 Nov, and check what the Flexible test turned on. | Airbnb host app > Reservations; Listings > Policies / Pricing | channel §4: no new booking on the three flats; today's P20, P05 and P06 cards reconcile without the extra layer, so it shows only in paid amounts | **£530.11** identified (inside row 6, not additive) | Corentin | 2026-11-19 |
| 23 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**, and confirm the new **Long stay 10% on 5-6 nights** (keep and record, or 0%). | Airbnb 1657859794156786222 > Pricing > Discounts | channel §4: -£442.76 = 18.0% on the 13 n Christmas card (**£73.79 over policy**); 6-13 Dec 18.0% (£27.57 over); Long stay -£104.31 on 28 Dec-2 Jan (not in policy) | **£73.79** on the Christmas stay; £104.31 per 5-night stay | Corentin | 2026-11-19 |
| 24 | P05 | **t-p05-los (confirmed live).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: **-£195.75 = 10.0% on 5-10 Jan** (07:21:44Z) | **£195.75** per 5-night stay | Corentin | 2026-11-19 |
| 25 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Airbnb 1618929775762183214 > Pricing > Discounts | channel §4: not shown at 48-49 d (applies from 60 d); applied on the Valentine's stay (£195.24) | **£195.24** per such stay | Corentin | 2026-11-19 |
| 26 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: not testable today (only a 4 n run open before 22 Dec); last seen -£104.85 / -£98.82 | **£98.82** per 5-night stay | Corentin | 2026-11-19 |
| 27 | P11 | **a-p11-bcom-stack (no change proposed).** Still only the ask: the extranet breakdown naming the three 10% layers. | Booking.com extranet (Camden) | channel (14 Nov): ceil x 1.10 x 0.9 x 0.9 x 0.9 x 0.95; nets £62.47 per £100 | Not quantified | Corentin | 2026-11-19 |
| 28 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-19 |
| 29 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-19 |
| 30 | P06 | **t-p06-1521open (confirm; not a proposal).** 16 Nov lapsed unsold; 17 Nov sits alone tonight at £230 (min 2, unsellable). Was opening 15-21 Nov intended? **If yes:** record it in `policy.json`. **If no:** re-block. | Smoobu > Calendar > Marylebone; `policy.json` | occupancy orphan table (17 Nov £230 / 2, created by the date roll) | Not quantified (policy question; the window lapses tonight) | Corentin | 2026-11-18 |

**Closed today:** t-pl-sync-1611 (fixed). **New today:** t-p04-xmas-1711 (critical), a-p20-dec-1711. None reopened. The carried medium items (a-amenities, a-extra-guest, a-p04-monthly, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped, a-p12-hold, a-p13-orphan-price, a-p20-conversion) are in the JSON with today's status.

## Top 5 for today
1. **P04 Barking's Christmas-NYE Booking.com stay was cancelled (13 n, £2,417.34).**
   - Smoobu reopened 20 Dec-1 Jan at £2,733 (about P75), and synced Airbnb sells it. 1455 does not, so there is no double-booking exposure.
   - PriceLabs still shows the nights Booked (refresh 16 Nov 09:43Z), so no change reaches them. You or Reyhan need to press Sync Now.
   - Then hold the block at about P75 against the likely 10-15% Aggressive-occupancy cut (estimate).
   - Decide whether NYE min 7/5 drops to 3-4: comps sell 2-night NYE stays at £192.50-264.50.
   - New critical t-p04-xmas-1711.
2. **Two Friday arrivals at risk.**
   - 1455 still sells the sold 20-24 Nov (£741.40, day 18): block its calendar today.
   - P20 20-22 Nov is on sale against the delivery block (Airbnb 20-23 Nov £652.54 room): block it or update policy.
   - P04 18-19 Nov min 2 (check-in tomorrow) and P20 22-24 Nov min 2 still need your confirm-or-revert.
3. **P13 sold Christmas on Booking.com at £168.15/n.**
   - That is 0.694x list, -9.3% vs comps and -37.9% vs market P50. Commission is the standard 15.0%, not the booster.
   - The promotion stack took the value, not PriceLabs. It nets £714.64 vs about £754.27 on Airbnb.
   - Per your direction there is no promotion change; please send the breakdown. It is not yet in PriceLabs (sync lag, no double-booking).
4. **Sync.**
   - t-pl-sync-1611 is done (P20 NYE registered).
   - There are no PriceLabs edits since 16 Nov, and 0 price mismatches on 237 open nights.
   - No refresh for about 21 h 40 m, so both overnight bookings are missing from PriceLabs. The P20 5 Dec (day 8) and 26 Dec orphans are still unsellable: set min 1 (£136 + £135).
5. **Engine moves with no edit.**
   - P04 6-16 Dec was cut again (£1,586, 16 Dec 179 -> 143) and is now -24% to -33% vs comps: +20% (£159).
   - P12 rose, and pace -10.7% makes it Soft: trim 18-19 Nov -8%, 26 Nov to about £224, 1 Dec -5%, 2-3 Dec -12%.
   - P20 16-18 Dec rose +15-20%, to +7% vs median on a 0-review flat in a soft market: about -13% (your call).
   - a-discount-cut is £277 next 13 / £1,348 next 30 (£811). Missed compression is 18 n / £410, but the fall from £542 is P20 overpricing, not a fix.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 from 60 d (channel §4, day 19). It is applied per night by that night's lead time (P20 14-19 Dec reconciles to the penny).
  - Today it decides how the P04 Christmas block re-sells. The 13-night card is £2,016.94 room (0.738x), against £2,323.05 at the policy weekly 15%: **£306.11 on one stay**.
  - Owner net per £100 Smoobu (channel §6): Airbnb 0.765 £64.64, 0.900 £76.05, 1.000 £84.50. Booking.com P13 Christmas observed **£64.85** (£52.14 ex-VAT); Booking.com model £93.50. Direct model £90 (unconfirmed).
  - Target: **1.00x before visible discounts by 2026-11-20** (row 6).
- **Booking.com since the 24 Oct markup cut** (channel §2):
  - **Confirmed 16 / 70 n / £11,564.66**; 9 of 25 cancelled (**37.0% of gross room**). Pace 0.67 confirmed a day. Since +10%: 4 of 5 confirmed.
  - The markup is not stopping bookings. The leaks are cancellations (row 21) and peak-date stacks (P13 Christmas 0.6926 of list).
  - Target: under 20% cancelled by 2026-11-30.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.62 |
  | P04 synced | **4.2 (10)** | 4.83 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.24 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 0 reviews | 4.8 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12's open nights need trims, why P04's Christmas ceiling is the band median, and why P13's Booking.com line sits 15% under its comps.
  - **P20's 0 reviews cost about 15% on every stay.** It is also why 16-18 Dec at +7% over the median is not supported.
  - Fixes: the P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; P20 review requests after the December and NYE stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31; P20 first 3 reviews by 2026-12-31.
- **Listing conversion.**
  - **P04:** mapping 1455 (row 1) is both a risk fix and a conversion fix (4.69 (26) vs 4.2 (10)), and it would put the better-rated listing on the Christmas block.
  - **P11:** basement with a patio; 4 of 12 comps have a lift. Booking.com CTR 0.81% vs 1.70% (21 Oct only). Titles (a-titles).
  - **P20:** parking photo first; 0 reviews.
  - **P13:** keep the twins distinct (row 19).
- **Gap fill / length of stay.**
  - Unsellable now: P20 26 Dec (row 12), P20 5 Dec (row 11), P06 29 Nov (policy), P04 24 Nov (P04 rule). Three single nights tonight (P05 £373, P06 £230, P20 £208) were created by the date roll and lapse tonight.
  - **New LOS question:** P04 27 Dec min 7 and 28-31 Dec min 5 were set for the cancelled 13-night stay. They now block 2-6 night NYE stays (row 3c).
  - Soft blocks: P05 21/29 Dec (row 9).
  - 17 Jan-16 Mar below 5 nights (pricelabs M1): P11 43/59, P13 47/59 per twin, P05 36/52, P20 53/59, P04 43/59 open nights. Please confirm the 5-night policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded). `kpi_pack` `gaps` is [] even though Smoobu has the two P20 orphans (data gap for `rm`). Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): 10 days overdue. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days, plus the Airbnb breakdowns (row 22).
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. A direct guest at -10% (£90 per £100) nets 39% more than P13's Christmas Booking.com stay (£64.85).
- **Event compression** (market §4): **18 n / £410** (yesterday 18 / £542); bookable 15 / £324.
  - The fall is mostly P20 16-18 Dec rising above the fortnight in a soft market (row 17), not a gain.
  - Real gaps: P11 darts 14-17 Dec £191 (row 4c), P11 23 Dec £22 and 3 Jan £20 (row 14), P04 6 / 8 / 16 Dec (row 10), P20 24 Nov £27.
  - Sold under compression overnight: **P13 22-26 Dec, £513 under P50** (Booking.com stack).
  - Reopened under compression: **P04 20 Dec-1 Jan**, priced at about P75 (row 3).
  - Where the market supports more: P05 7-8 / 13-14 Dec (row 9). P13 19-21 Dec is £78 under P50, but the kept comps say hold (comp-west).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **59.0%** (60.0% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£172.90** (£173.85) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£101.97** (£104.31) | £129 | 2026-12-18 |
| Revenue, last 30 | **£39,766.52** (230 n) | - | - |
| Booked next 30 (Smoobu) | **59.3%** (144/243) | each unit at least market + 10 pts (below: P11 50.0% vs 50%) | 2026-11-20 |
| Booked next 60 (Smoobu) | **46.8%** (198/423) | at least market + 10 pts (below: P04 25.0% vs 19%, P11 45.0% vs 38%) | 2026-11-20 |
| 7-day pickup, net | gross 10 bk / 49 n / £9,581.28; cancelled 5 / 32 n / £5,596.24; **net +17 n / +£3,985.04** | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace vs STLY (to 13 Dec handback) | **-10.7%** (-5 n / -£453.63), **Soft** (was -9.3%, On track) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+25 n / +£7,329.70 like-for-like** (unchanged); +34 n / +£9,196.31 incl. P06; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P12 +11 / +£1,660.21; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P01 0 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **16 confirmed / 70 n / £11,564.66; 9 of 25 cancelled (37.0% of gross room)**; 4 of 5 since +10% confirmed | cancellations under 20% | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 19; realised cost **£3,966.66** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,348 next 30; £277 next 13** | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **0 of 237 open nights differ by more than £2**; **2 bookings not registered** (P04 cancellation, P13 22-27 Dec); refresh age ~21 h 40 m | 0 mismatches; all bookings registered | 2026-11-18 |
| Unsellable orphan nights (next 60) | **4** (P20 26 Dec, P20 5 Dec day 8, P06 29 Nov (policy), P04 24 Nov (P04 rule)), plus 3 tonight from the date roll; P05 21/29 Dec at +300% | 0 outside P04 | 2026-11-18 |
| Double-sellable Barking stays | **1455 bookable on the sold 20-24 Nov (£741.40)** and 18-21 Nov, 6-19 Dec, 2-5 Jan; not on Christmas-NYE; day 18 | 0 | 2026-11-18 |
| P13 identical twin nights | **48** of 69 jointly open (124 of 145, next 180) | 0 | 2026-11-19 |
| Missed compression | **18 n / £410**; bookable 15 / £324 (not a real improvement) | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.77; comp medians 4.24-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **P04 and P13 not registered in PriceLabs** (last refresh 16 Nov 09:42-09:43Z). Source: you or Reyhan press PriceLabs Sync Now on 3562176, 3064856 and 3090701 (row 3). Then read P04 20 Dec-1 Jan prices: the 10-15% cut is an estimate.
2. **P04 cancellation: who cancelled and why**, plus whether the reopened nights show on Booking.com: NOT CHECKED (Smoobu has no reason field; Booking.com AWS WAF, not bypassed). Source: Booking.com extranet > Reservations (row 21) and a guest-view screenshot of 20 Dec-2 Jan.
3. **Why 1455 is closed over exactly the cancelled block** (manual block or its own booking): NOT CHECKED. Source: Airbnb host 551951609 > 1455876748739910219 > Calendar.
4. **P13 22-27 Dec promotion stack** (0.6926 is a fit, not seen): source: Booking.com extranet reservation breakdown (row 20).
5. **Cause of engine moves with no edit** (P04 6-16 Dec -5% and 16 Dec -20% at the 30-day edge; P20 December +13% after the NYE registered; P12 +4-5%; P13 3064856 16 Dec +£35): NOT VERIFIED (Booking Recency / occupancy suspected). Source: PriceLabs per-date factor breakdown (calendar view).
6. **Source of P20 26 Dec min 4** (no DSO min field) and of the P04 27 Dec-1 Jan gap below uncustomized (0.70-0.78x) beyond the visible settings: UNKNOWN. Source: PriceLabs > account / group / min-stay customizations.
7. **The extra ~15% on the Flexible-test flats:** NOT CHECKED. Source: Airbnb reservation breakdowns (row 22).
8. **Market percentiles:** the daily series mix bedroom counts (correction 12). Source: PriceLabs Market Dashboard with a 2 BR / 4 BR filter, or per-bedroom Nearby Listings.
9. **Market length-of-stay data** for P04 NYE (what min stay the market supports): does not exist in Nearby Listings. Source: PriceLabs Market Dashboard LOS chart, or a comp min-stay sweep on 27 Dec-2 Jan.
10. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history before 17 Nov 2025).
11. **Other:**
    - Booking.com live prices and same-date channel ordering: NOT CHECKED (WAF).
    - Vrbo +8% / Direct -10% are unconfirmed; whether the P13 Vrbo copy reflects 22-27 Dec is NOT CHECKED.
    - Barking recommended base "Unavailable": ask PriceLabs support.
    - P15-P19 need the second-account keys.
    - Five kept comp ids have not been returned for 5 days (P06 x2, P14 x2, P17 x1); P04 1387112821878102742 has not been returned on any stay including Christmas.
    - Events are search summaries (www.pdc.tv / www.alexandrapalace.com unreachable). Unresolved: darts end 3 vs 4 Jan, Squeeze dates, Finals Friday date.

```json
{"scoreboard":{"note":"17 Nov 2026. Last 30 nights = 18 Oct-16 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:18:33Z, handback-aware, Smoobu as truth) because PriceLabs still holds the cancelled P04 20 Dec-2 Jan stay and lacks the new P13 22-27 Dec stay; policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and nights after each handback excluded. Pickup = bookings made 11-17 Nov net of cancellations. P12 pace handback-aware to 13 Dec (kpi_pack 30-day -18.9% includes 14-16 Dec STLY). Base-rise like-for-like excludes both P06 stays on reopened nights; the P04 comparison has a method flaw (import batch without basePrice) that does not affect the raised group. Airbnb ratios from channel section 4; Booking.com from channel section 2; PriceLabs gap from pricelabs H4; sync from pricelabs H1. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"59.0%"},{"label":"ADR last 30","value":"£172.90"},{"label":"RevPAR last 30","value":"£101.97"},{"label":"Revenue last 30","value":"£39,766.52"},{"label":"Nights last 30","value":"230"},{"label":"Booked next 30","value":"59.3% (144/243)"},{"label":"Booked next 60","value":"46.8% (198/423)"},{"label":"7-day pickup","value":"gross 10 bk / 49 n / £9,581.28; cancelled 5 / 32 n / £5,596.24; net +17 n / +£3,985.04"},{"label":"P12 pace vs STLY","value":"-10.7% (-5 n / -£453.63) to the 13 Dec handback; Soft (was -9.3%, On track)"},{"label":"Raised flats net since 18 Oct","value":"+25 n / +£7,329.70 like-for-like (unchanged); +34 n / +£9,196.31 incl. P06; P01 0; P05 +16 / +£6,135.19; P06 +15 / +£3,212.38; P09 -3 / -£244.70; P11 -5 / -£1,566.77; P12 +11 / +£1,660.21"},{"label":"Booking.com since markup cut","value":"25 gross, 16 confirmed, 70 n, £11,564.66; 9 cancelled = 37.0% of gross room (£6,796.87); since +10% (12 Nov) 5 gross, 4 confirmed"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x from 60 d; per night by lead time; day 19; realised cost £3,966.66"},{"label":"Owner net per £100 Smoobu","value":"Booking.com P13 Christmas observed £64.85 (£52.14 ex-VAT); Airbnb 0.765 £64.64, 0.900 £76.05, 1.000 £84.50; Booking.com model £93.50; direct model £90 (unconfirmed)"},{"label":"PriceLabs-side gap","value":"£1,348 next 30; £277 next 13"},{"label":"PriceLabs vs Smoobu","value":"0 of 237 open nights differ by more than £2; not registered: P04 20 Dec-1 Jan cancellation, P13 22-27 Dec booking; refresh age ~21 h 40 m; P20 NYE now registered"},{"label":"Unsellable orphans","value":"P20 26 Dec (min 4), P20 5 Dec (day 8), P06 29 Nov (policy), P04 24 Nov (P04 rule); 3 single nights tonight from the date roll; P05 21/29 Dec at +300%"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£741.40) and 18-21 Nov, 6-19 Dec, 2-5 Jan; not offered on Christmas-NYE; day 18"},{"label":"P13 identical twin nights","value":"48 of 69 jointly open (Smoobu to 28 Feb); 124 of 145 next 180 (PriceLabs)"},{"label":"Missed compression","value":"18 n / £410 (was £542; fall is mostly P20 Dec rising above P75, not a fix); bookable 15 n / £324"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 18), live, arrival Friday: unsynced Barking Airbnb 1455876748739910219 still sells the sold 20-24 Nov at £741.40 and 18-21 Nov at £571.00, plus 6-13 Dec £1,290.26, 17-20 Dec £694.10, 2-5 Jan £684.20; not offered on Christmas-NYE (keep closed); block all dates now (18-24 Nov first) or unlist, then map to 3562176","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"critical","title":"3 days out: Smoobu/PriceLabs block 18-19 Nov only; 20 Nov £300, 21 Nov £299 (min 3), 22 Nov £254 (min 2) on sale against policy's 20-22 Nov delivery block; Airbnb sells 20-23 Nov at £652.54 room; Corentin to confirm: block 20-22 Nov in Smoobu today, or update policy and hold the price (20-24 Nov P0 / -13.3% vs median, +2.0% over the 0-review line)","gbp":null},
{"id":"t-p04-xmas-1711","status":"open","prop":"P04 P13","priority":"critical","title":"New: P04 Booking.com 20 Dec-2 Jan cancelled (13 n, £2,417.34); Smoobu reopened 20 Dec-1 Jan at £2,733 (about P75: P50 £2,246 / P75 £2,880, 1-3 BR mix), min 3-7; synced Airbnb sells it (13 n £2,016.94 room), 1455 not offered; PriceLabs (refresh 16 Nov 09:43Z) still shows Booked so no edit reaches it; P13 22-27 Dec also not registered; Corentin or Reyhan press Sync Now on 3562176 / 3064856 / 3090701, then hold the block at about £2,733 (raise the 20 Oct -5% DSOs about +5% / +12% if the refresh cuts 10% / 15%, an estimate); question: NYE min 7 (27 Dec) / 5 (28-31 Dec) blocks 2-4 night stays comps sell at £192.50-264.50; policy allows min 3; estimate £72-£103 protected","gbp":null},
{"id":"a-p13-record","status":"open","prop":"P04 P20 P13 P11 P05 P14 P12","priority":"high","title":"For Corentin to confirm or revert Reyhan's edits (no new edits since 16 Nov, logs 0): P04 18-19 Nov +10% min 2 vs the never-under-3 rule (check-in tomorrow; Airbnb sells 18-20 Nov at £244.80 room, 0.726); P20 17 Nov and 22-24 Nov min 2 vs min 3 to 30 Nov (22-24 Nov on sale at £390.91); P13 twins identical 13-16 Dec; P05 Jan/Feb -5%; P11 darts 14-18 Dec 0% vs your +5% / >£300 (avg £234.25; -24% vs kept; revert to +5% £21); P04 base 200 vs 220 (revert £96, not additive with a-p04-dec-1611); P04 6-22 Dec -5%; P14 min 450; P05 max 3500; P20 base 330 vs 350; £117","gbp":117},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (3 days)","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P13 P05 P06 P04 P12","priority":"critical","title":"Day 19, not fixed: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d), applied per night by lead time; no new Airbnb booking overnight, realised cost £3,966.66; largest open-card gaps today (overlapping): P05 5-10 Jan £413.25, P04 Christmas 13 n £306.11, P20 14-19 Dec £250.50, P05 4-11 Jan £256.97, P04 28 Dec-2 Jan £220.21; extra 0.95 on P04 2-night cards unidentified; P09 excluded","gbp":3966.66},
{"id":"a-discount-cut","status":"open","prop":"P05 P04 P11 P20","priority":"high","title":"Not done; gap £1,348 next 30 / £277 next 13 (P05 8 n £659 -14.5%, P04 14 n £492 -19.2%, P11 15 n £273 -7.3%, P20 9 n £219 -7.8%); all four still Aggressive occupancy + Booking Recency default; P04 16 Dec cut 179 -> 143 at the 30-day edge and the Christmas block likely cut 10-15% once registered; set Occupancy, Booking Recency and Last-minute to Custom 0% on P05, P04, P11, P20; P12/P13 excluded; expected £811 / 30 days","gbp":811},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (now £280/£277/£246, min 3) are closed; confirm intent; if not, end the block 18 Dec (£317.33/n all-in = P29 / -14.2% vs stored median £369.67, -8.0% vs band; parity supported); £803 x 0.900 = £723","gbp":723},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"Unchanged: 21 Dec £2,054 / 29 Dec £2,563 at Reyhan's +300% min 1 act as soft blocks (2.3-2.4x P90, n=0 qualifying comps): confirm intent (block in Smoobu) or, your call, both +300% -> 0% (uncustomized £680 / £1,020); 7-8 Dec +3% -> +29% (£923, P0 / -16%) and 13-14 Dec +5% -> +31% (£962, P0 / -16%) per recommend +25%, landing at the median level £578/£598; £631","gbp":631},
{"id":"a-p04-dec-1611","status":"open","prop":"P04","priority":"high","title":"Worse: P04 6-16 Dec cut again with no edit to £1,586 (-6.8%; 16 Dec 179 -> 143); now -24% to -33% vs comps (P0) vs supported -15% to 0%, about +20% supported (was +15%); DSO 6-16 Dec -5% -> +14% (about 164-185), hold 17-19 Dec; +4% instead if the base goes back to 220; £1,586 x 0.20 x 0.500 = £159","gbp":159},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (day 8): P20 5 Dec 1-night orphan, min 3, unbookable at £277; DSO 5 Dec min 1, keep price (between market P50 £228 and P75 £298; no kept comp returned); £277 x 0.765 x 0.643 = £136","gbp":136},
{"id":"t-p20-26dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed: 26 Dec 1-night orphan, min 4 (source unknown, no DSO min field), unbookable at £271 (was £300); PriceLabs now has the NYE stay so no sync needed first; DSO 26 Dec min 1 keep price (market P50 £256 / P75 £335; wider 1-night median £345, n=5); £271 x 0.900 x 0.552 = £135","gbp":135},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): 22-29 Nov reopening (24-29 Nov sold); 22-23 Nov rose to 265/249 (engine) but still P0 / -12% vs kept (n=3), -33% wider; if intended note in policy and (your call) raise 22-23 Nov to about £295 (DSO about +15%) and 29 Nov min 4 -> 1 (£256); if not re-block 22-23 and 29 Nov; £40 if confirmed","gbp":40},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 23-25 Dec 286/263/272 -13% kept / -9% wider -> DSO about +12% (about 320/295/305; low end of supported £306-322, market soft); 3 Jan £171 -> DSO to about £195 (3-5 Jan -17% kept / -4% wider, supported £194-232); Booking.com CTR 0.81% vs 1.70% (21 Oct only); £42","gbp":42},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Partly reversed by the engine (no edit): 18-19 Nov 255/265 -> 268/268, 2-3 Dec 287/294 -> 299/308; Corentin's call (lowers a price): 18-19 Nov DSO 0% -> -8% (about £247; 17 Nov excluded per policy; P60 / +5.5% vs band, NL P84), 1 Dec 0% -> -5% (about £257; 1-3 Dec P80 / +14.1%), 2-3 Dec 0% -> -12% (about 263/271; 2-4 Dec P91 / +22.7%); hold 20 Nov and 30 Nov; pace now -10.7% (Soft)","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed, worse: Mile End 26 Nov £307 (£360 all-in, P100 +27.7% vs band, n=5, NL >P90); DSO +15% -> about -15% (about £224; supported £204-240), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"a-p20-dec-1711","status":"open","prop":"P20","priority":"high","title":"New: PriceLabs raised P20 16-18 Dec 271/292/301 -> 325/338/345 (+15-20%) with no edit; 16-19 Dec Airbnb £1,058 = P62 / +7.0% vs median (n=8), 25.9% over the 0-review line, market occupancy 21-24% and -2.2 to -6.5 vs STLY; your call (lowers a price): DSO 16-18 Dec about -13% (about 283/294/300, avg £292 = -5% vs median), hold 14-15 Dec; not quantified","gbp":null},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Partly fixed: 8 Dec min 1 (sellable) but +50% -> £310 (list all-in £490, P100 / +94% kept, +70% wider); comps support about £126-150 Smoobu room on a 1-night stay; your call (lowers a price): keep min 1, DSO +50% -> about -27% (about £150); not quantified","gbp":null},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Not fixed, conflict with the twin rule: 13-16 Dec 244/240/237/241 identical on both twins (Airbnb £702 on both); 48 of 69 jointly open nights identical (Smoobu) / 124 of 145 next 180 (PriceLabs); DSO 3090701 about +3% on 13-16 Dec and 16 Jan-28 Feb, set on the child after any parent edit; Corentin to confirm","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P13 P12","priority":"medium","title":"New P13 Booking.com 22-27 Dec stay on 3064856: £840.75 room = 0.6926 of the £1,214 list (best fit NR 10% x NR occupancy -5% x Mobile 10% x Genius L1 10%; not seen), -9.3% vs comps, nets £714.64 vs about £754.27 on Airbnb; commission 15.0% (standard); send its extranet breakdown and the P12 7-14 Dec one; no promotion change proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"high","title":"9 of 25 post-cut Booking.com bookings cancelled (37.0% of gross room, £6,796.87); confirmed 16 / 70 n / £11,564.66; 4 of 5 since +10% confirmed; plus the pre-cut P04 Christmas-NYE stay (£2,417.34) cancelled 16 Nov, no reason in Smoobu; send rate plans and reasons","gbp":null},
{"id":"t-airbnb-flex15-1611","status":"open","prop":"P06 P20 P05","priority":"high","title":"No new evidence (no new booking on the three test flats; today's cards reconcile without the layer): an extra ~15% Airbnb layer shows only in paid amounts on the Flexible-cancellation test flats (P06 24-29 Nov, P20 NYE £318.33, P05 Feb £211.78); open the Airbnb reservation price breakdowns and check what the Flexible test turned on; £530.11 identified (included in a-airbnb-rules)","gbp":530.11},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Not fixed: synced Barking Airbnb weekly 18.0% vs policy 15% (-£442.76 on the 13 n Christmas card, £73.79 over policy; 6-13 Dec £27.57 over); new: Long stay 10% on 5-6 nights (-£104.31 on 28 Dec-2 Jan), not in policy: keep and record, or 0%","gbp":73.79},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Confirmed live: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£195.75 on 5-10 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":195.75},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d; not shown at 48-49 d today) applied on the Valentine's stay (£195.24); not in policy - yours, or 0%?","gbp":195.24},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged (not testable today: only a 4 n run open before 22 Dec): visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (last -£104.85 / -£98.82); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":98.82},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; 18% booster; nets £62.47 per £100); per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"medium","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; 16 Nov lapsed unsold, 17 Nov sits alone tonight at £230 (min 2, unsellable) and lapses tonight; if intended record in policy, else re-block","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"0 reviews cost ~15% on every stay (comp-west line = median x 0.85); 20-24 Nov £250/n all-in, P0 / -13.3%, +2.0% over the line (hold); 16-18 Dec now +7.0% over median (see a-p20-dec-1711); remaining: parking first photo, review requests after the December and NYE stays; Flexible-test comparison 10 days overdue","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback -10.7% (-5 n / -£453.63), now Soft (was -9.3% On track; window roll, no booking change); base +37.2% vs P50; 9 open nights left; correct them via a-p12-trim and t-p12-26nov-price, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"17 Nov single night (twins £235 / £198, min 1) lapses tonight; 27 Nov £289 / £244 (+50% min 1; market Finals Weekend +11.6 vs STLY, 289 vs fortnight 234): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced (14-18 Nov stay checks out 18 Nov tomorrow): ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); P20 3547481 not in the info pack (330 vs policy 350); pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 base 455 vs 550); Barking recommended base 'Unavailable' (ask PriceLabs support); Vrbo copies push separately (P13 copy vs 22-27 Dec NOT CHECKED; P02 stale since 24 Feb): should they push?; Vrbo +8% / Direct -10% unconfirmed; kpi_pack gaps [] misses the P20 orphans; record Reyhan's 15 Nov edits, P06 reopening, P20 delivery dates and the P04 synced Airbnb listing in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"No comp replaced today; kept ids not returned for 5 days: P06 x2, P14 x2, P17 x1 (pages 200, calendars NOT CHECKED); P04 1387112821878102742 not returned on any stay incl. Christmas; P20 789954794593691037 absent from standard searches 4th day but bookable on probes; P05 at 5 kept; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown (also relevant to t-airbnb-flex15-1611)","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (new 22-27 Dec Booking.com stay is the standard 15.0% of room + cleaning)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-pl-sync-1611","status":"done","prop":"P20","priority":"high","title":"Fixed: P20 27 Dec-3 Jan registered in PriceLabs (raw 3547481 refresh 16 Nov 09:43:29Z: 27 Dec Booked (Check-In), 2 Jan Booked, ADR 257.68; occupancy_next_60 45% -> 57%); price sync 0 mismatches on 237 open nights; the new unregistered events (P04 cancellation, P13 22-27 Dec) moved to t-p04-xmas-1711","gbp":null}
],
"finds":[
{"agent":"occupancy","severity":"critical","ref":"P04","title":"P04 Booking.com 20 Dec-2 Jan cancelled (13 n, £2,417.34 room, £185.95/n); Smoobu reopened 20 Dec-1 Jan at £2,733, min 3-7; P04 next 60 falls to 25.0% (from 48.3%); pickup -13 n / -£2,417.34","evidence":"occupancy full-record diff (Smoobu 17 Nov 07:18Z vs 16 Nov 07:17Z); reservations.csv total_gbp; cause NOT CHECKED."},
{"agent":"pricelabs","severity":"critical","ref":"P04","title":"PriceLabs still shows P04 20 Dec-1 Jan Booked (last refresh 16 Nov 09:43:29Z, before the 15:37 cancellation), so no PriceLabs edit reaches the nights; Aggressive occupancy likely cuts the block 10-15% (about £2,445 / £2,323) once registered (estimate)","evidence":"pricelabs C1 (live get_listing_prices 3562176; customizations; occupancy profile bands); market section 2; comp-east."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 Christmas: 3-4 night stays in range (21-24 Dec +1.2%, 23-27 Dec -5.7% vs band): hold about P75; 27 Dec min 7 / 28-31 Dec min 5 block every 2-4 night NYE stay that comps sell (31 Dec-2 Jan £192.50-264.50); policy allows min 3: for Corentin","evidence":"comp-east Christmas-NYE table (5 of 7 comps booked; band n 2-7); market section 2 (P50 £2,246 / P75 £2,880, 1-3 BR mix; occupancy +2.8 to +18.2)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still sells the sold 20-24 Nov at £741.40 and 18-21 Nov at £571 (day 18, arrival Friday); not offered on any Christmas-NYE stay, so no exposure on the reopened block","evidence":"channel section 3 (live Airbnb 07:21Z); channel section 1 (4 exhaustive Christmas searches); comp-east (£742; 10 Christmas-NYE stays)."},
{"agent":"channel","severity":"high","ref":"P04","title":"Synced Barking Airbnb sells the reopened 13 n at £2,016.94 room (0.738: 0.900 tier x weekly 18%), £306.11 under the policy weekly 15%; new Long stay 10% on 5 n (-£104.31)","evidence":"channel section 1 and 4 (p04_2002jan, p04_2802jan cards 07:20Z)."},
{"agent":"channel","severity":"high","ref":"P13","title":"New P13 Booking.com 22-27 Dec on 3064856: £840.75 room = 0.6926 of list (stack fit NR x occupancy x Mobile x Genius L1); commission 15.0% of room + cleaning (standard, outside the booster); nets £714.64 vs about £754.27 on Airbnb; both twins closed in Smoobu and Airbnb","evidence":"channel section 2 (Smoobu price elements; per-night fit); occupancy diff; comp-west's 17.7% is room-only (resolved)."},
{"agent":"comp-west","severity":"high","ref":"P13","title":"P13 Christmas sold at £198.15/n all-in: P0 of 3 / -9.3% vs comp median, P5 of wider 19; list was +24.7% over the median, so the promotion stack, not PriceLabs, took it under; -37.9% vs market P50 (2-3 BR mix)","evidence":"comp-west P13 section and comp_summary recompute; market section 2 (£513 under P50, occupancy +9.9 to +21.6)."},
{"agent":"pricelabs","severity":"high","ref":"P04 P13 P20","title":"No PriceLabs edits since 16 Nov (logs 0); 0 price mismatches on 237 open nights; no refresh of the 9 active Smoobu listings for ~21 h 40 m, so P04 cancellation and P13 22-27 Dec are unregistered; t-pl-sync-1611 fixed (P20 NYE registered)","evidence":"pricelabs H1-H3 (get_user_logs, get_listing_data, sync.py); occupancy registration table."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 6-16 Dec cut again with no edit (£1,586, -6.8%; 16 Dec 179 -> 143 at the 30-day edge); now -24% to -33% vs comps while comps held; about +20% supported","evidence":"comp-east Priority 1; pricelabs H4; market section 2 (6-15 Dec £1,443 vs P50 £1,588)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"PriceLabs raised P20 16-18 Dec +15-20% with no edit or override; 16-19 Dec now P62 / +7.0% vs median, 25.9% over the 0-review line, in a soft market (occupancy 21-24%); about -5% vs median supported (PriceLabs avg about £292 vs £336)","evidence":"comp-west P20 December section; market section 2 and 4 (above P75 on a 1-3 BR mix; most of the missed-compression fall)."},
{"agent":"channel","severity":"critical","ref":"P20","title":"P20 20-22 Nov on sale against the policy delivery block, 3 days out; Airbnb sells 20-23 Nov at £652.54 room; 22-24 Nov also on sale at min 2 (£390.91) against min 3 to 30 Nov","evidence":"channel section 5 (p20_2023nov, p20_2224nov 07:21-07:24Z); pricelabs H5; comp-west (hold if selling)."},
{"agent":"occupancy","severity":"medium","ref":"P12","title":"P12 pace to the 13 Dec handback -10.7% (-5 n / -£453.63): Soft (was -9.3%, On track); window roll only; kpi_pack -18.9% includes post-handback STLY","evidence":"occupancy pace section (rm.metrics.on_the_books)."},
{"agent":"comp-east","severity":"medium","ref":"P12","title":"P12 rose overnight with no edit: 18-20 Nov +5.5% vs band (P60), 26 Nov P100 / +27.7%, 2-4 Dec P91 / +22.7%; trims supported: 18-19 Nov -8%, 26 Nov to about £205-240, 1 Dec -5%, 2-3 Dec -12%","evidence":"comp-east Priority 2; NL P81-P90."},
{"agent":"comp-central","severity":"high","ref":"P11 P05 P06","title":"P11 darts 14-18 Dec -24% vs kept on list (conflict, avg £234.25 vs >£300), 23-25 Dec -13%, 8 Dec +94% (P100); P05 7-8 / 13-14 Dec P0 / -16% (+15% vs median supported); P06 22-23 Nov P0 / -12% (about £295 supported if the opening is confirmed)","evidence":"comp-central P11, P05, P06 tables (Smoobu 07:18:45Z; 95 Airbnb searches)."},
{"agent":"market","severity":"medium","ref":"Portfolio","title":"Daily PriceLabs percentiles mix bedroom counts (1-3 BR for P04/P11/P20/P01/P06; 2-3 BR for P13/P12; 3-5 BR for P05); daily P50/P75 understate 2 BR and 4 BR flats; only the summary table is bedroom-matched","evidence":"market sources and method (compset_settings.br_range_selected); Barking 1 BR P50 £120 vs 2 BR £175."},
{"agent":"market","severity":"medium","ref":"P20 P04 P11","title":"Missed compression 18 n / £410 (was £542); the fall is mostly P20 16-18 Dec rising above P75 in a soft market, not a fix; real items: P13 Christmas sold £513 under P50, P04 6-15 Dec, P05 7-8 / 13-14 Dec","evidence":"market section 4 (analyse17.py; 16 Nov rerun reproduces £542)."},
{"agent":"pricelabs","severity":"medium","ref":"P05 P04 P11 P20","title":"PriceLabs discount gap £1,348 next 30 / £277 next 13 (P05 £659, P04 £492, P11 £273, P20 £219); all four still Aggressive occupancy + Booking Recency default","evidence":"pricelabs H4 (an17.py)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises unchanged: +25 n / +£7,329.70 like-for-like, +34 / +£9,196.31 incl. P06; method flaw found in the P04 comparison only (import batch without basePrice counted at £0)","evidence":"occupancy base-rise section (rise.py, full recompute from the 17 Nov pull)."},
{"agent":"channel","severity":"high","ref":"P04 P05 P20 P13 P06","title":"Airbnb hidden layer day 19: no new booking, realised £3,966.66; tiers apply per night by lead time; largest open-card gaps P05 5-10 Jan £413.25, P04 Christmas £306.11, P20 14-19 Dec £250.50","evidence":"channel section 4 (19 live Airbnb searches 07:20-07:24Z; 21 channel_checks rows)."},
{"agent":"channel","severity":"medium","ref":"P11 P12 P13 P04","title":"Booking.com since 24 Oct: 25 gross / 16 confirmed / 70 n / £11,564.66; 9 cancelled = 37.0% of gross room; since +10% 4 of 5 confirmed","evidence":"channel section 2 (bk.py reproduces 16 Nov exactly)."}
],
"top5":[
"P04 Barking's Christmas-NYE Booking.com stay was cancelled (13 n, £2,417.34). Smoobu reopened 20 Dec-1 Jan at £2,733 (about P75) and synced Airbnb sells it; 1455 does not (no double-booking exposure). PriceLabs still shows the nights Booked (refresh 16 Nov 09:43Z), so no change reaches them: you or Reyhan press Sync Now, then hold the block at about P75 against the likely 10-15% Aggressive-occupancy cut (estimate), and decide whether NYE min 7/5 drops to 3-4 (comps sell 2-night NYE at £192.50-264.50). New critical t-p04-xmas-1711.",
"Two Friday arrivals at risk: 1455 still sells the sold 20-24 Nov (£741.40, day 18) - block its calendar today; P20 20-22 Nov is on sale against the delivery block (Airbnb 20-23 Nov £652.54 room) - block or update policy. P04 18-19 Nov min 2 (check-in tomorrow) and P20 22-24 Nov min 2 still need your confirm-or-revert.",
"P13 sold Christmas on Booking.com at £168.15/n: 0.694x list, -9.3% vs comps, -37.9% vs market P50; commission is the standard 15.0%, not the booster. The promotion stack took the value, not PriceLabs; it nets £714.64 vs about £754.27 on Airbnb. Per your direction no promotion change; please send the breakdown. Not yet in PriceLabs (sync lag, no double-booking).",
"Sync: t-pl-sync-1611 done (P20 NYE registered); no PriceLabs edits since 16 Nov; 0 price mismatches on 237 open nights; but no refresh for ~21 h 40 m, so both overnight bookings are missing from PriceLabs. P20 5 Dec (day 8) and 26 Dec orphans are still unsellable: min 1 (£136 + £135).",
"Engine moves with no edit: P04 6-16 Dec cut again (£1,586, 16 Dec 179 -> 143), -24% to -33% vs comps: +20% (£159); P12 rose and pace -10.7% makes it Soft: trim 18-19 Nov -8%, 26 Nov to ~£224, 1 Dec -5%, 2-3 Dec -12%; P20 16-18 Dec +15-20% to +7% vs median on a 0-review flat in a soft market: ~-13% (your call). a-discount-cut £277 next 13 / £1,348 next 30 (£811); missed compression 18 n / £410, but the fall from £542 is P20 overpricing, not a fix."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked, now £280/£277/£246 (£803); if reopened £317.33/n all-in = P29 / -14.2% vs stored median £369.67 (n = 7), -8.0% vs band, parity supported (£723); 100% of 13 non-blocked nights booked; base-rise 0."},
{"ref":"P02","change":"Intentional block; pushed 17 Nov 00:23Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 17 Nov 03:01Z via Channex."},
{"ref":"P04","change":"Booking.com 20 Dec-2 Jan cancelled (-13 n / -£2,417.34); 20 Dec-1 Jan open in Smoobu at £2,733 (about P75), min 3-7, but still Booked in PriceLabs; synced Airbnb sells 13 n at £2,016.94 room; 1455 not offered at Christmas but still sells the sold 20-24 Nov (£741.40, day 18); 6-16 Dec cut again to £1,586 (16 Dec 179 -> 143), -24% to -33% vs comps, +20% supported (£159); 18-19 Nov min 2 conflict; weekly 18% plus new Long stay 10%; fwd30 50.0% vs 24%, fwd60 25.0% vs 19%; pickup -9 n / -£1,927.75."},
{"ref":"P05","change":"No booking; 7-8 Dec £923 and 13-14 Dec £962, P0 / -16% vs kept, +25% DSO supported; 1 Dec 523 -> 495 (engine); 21/29 Dec £2,054 / £2,563 at +300% (n = 0 comps); Long stay 10% confirmed (-£195.75 on 5-10 Jan); 17 Nov orphan tonight; fwd30 70.0% vs 46%."},
{"ref":"P06","change":"22-23 Nov rose to 265/249 (engine), still P0 / -12% vs kept, about £295 supported if the opening is confirmed (£40); 29 Nov orphan £256 min 4; 16 Nov lapsed unsold, 17 Nov orphan tonight; numbers only (policy); fwd 69.2% of 13 non-blocked vs 51%."},
{"ref":"P07","change":"Intentional block; pushed 17 Nov 04:12Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"No booking; darts 14-17 Dec avg £234.25 (-24% vs kept on list; conflict); 23-25 Dec -13% kept (+12% proposed); 8 Dec £310 P100 (+94%); 3 Jan £171 (~£195 supported); 18-27 Nov +20% to +23% over on list (hold); fwd30 50.0% vs 50%; pickup -1 n / -£224.36."},
{"ref":"P12","change":"Rose overnight with no edit (18-19 Nov 268/268, 26 Nov 307, 2-3 Dec 299/308); pace -10.7%, now Soft; 18-20 Nov +5.5% vs band, 26 Nov P100 / +27.7%, 2-4 Dec P91 / +22.7%; trims proposed (your call); base-rise +11 / +£1,660.21."},
{"ref":"P13","change":"New Booking.com 22-27 Dec £840.75 on 3064856 (0.694x list; P0 of 3 / -9.3% vs comps; commission 15.0%; nets below Airbnb), not yet registered in PriceLabs; 13-21 Dec hold; twins identical on 13-16 Dec (48 identical jointly open nights); fwd30 76.7% vs 47%, fwd60 58.3%; base-rise comparison +27 / +£4,704.65."},
{"ref":"P14","change":"Numbers only: min 450 (Reyhan; conflicts with the £500 special setup); 75 of 180 open nights at £450; P100 / +49% to +122%; 0% vs 48%; push 23 h 16 m old at 07:23Z."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"NYE now registered in PriceLabs (t-pl-sync-1611 done); December rose ~13% with no edit, 16-18 Dec 325/338/345 = +7.0% vs median on a 0-review flat (about -13% proposed, your call); 20-24 Nov on sale against the delivery block (hold price if selling); 22-24 Nov min 2 conflict; orphans 5 Dec £277 (day 8) and 26 Dec £271 (min 4); fwd30 64.3% vs 39%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 13 non-blocked nights booked to the 20 Dec handback; base -4.9% vs P50; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (rec Unavailable)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended (£96, not additive with a-p04-dec-1611); ask PriceLabs why the recommendation dropped out","reason":"6-16 Dec -24% to -33% vs comps after another engine cut vs supported -15% to 0% (qp -0.15); recommend raise +10% at 30 d; 50.0% vs 24% next 30, 25.0% vs 19% next 60 after the Christmas cancellation; base +14.3% vs 2 BR P50 (comp-east; occupancy; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"70.0% vs 46%; 7-8 / 13-14 Dec -16% vs median; qp +0.15; recommend +25%; base -4.5% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 9 of 13 non-blocked nights booked (69.2%) vs 51%; base -13.1% vs P50 (occupancy; pricelabs M3; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"50.0% vs 50% (Smoobu); December open stays -13% to -24% vs kept while 18-27 Nov is +20% to +23% over on list; recommend +5%; base -1.4% vs P50; levers are a-discount-cut, the darts override and date overrides (comp-central; pricelabs H4; occupancy)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim, t-p12-26nov-price), not the base","reason":"66.7% to handback vs 43%; pace -10.7% (Soft); open short stays +5% to +28% vs band with qp -0.15; base +37.2% vs P50; 9 open nights before the 13 Dec handback (comp-east; occupancy; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 241)","recommendation":"Keep 250 and record it in policy","reason":"76.7% vs 47% next 30, 58.3% vs 37% next 60; base +12.1% vs P50; the Christmas loss was the Booking.com stack, not the base (comp-west; occupancy; pricelabs M3)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 48%; P100 / +49% to +122% vs comps at £450; 75 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"64.3% vs 39% (30d), 55.2% vs 30% (60d); 0 reviews; base +29.4% vs P50; December rose ~13% with no edit to +7% vs median, handled by a date override (a-p20-dec-1711), not the base (occupancy; comp-west; pricelabs M3)."}
]}
```

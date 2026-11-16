# Seeker Estates - Daily revenue report, 2026-11-16 (Monday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-16/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-16/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-15/daily-report.md` and its JSON, the dashboard action list (16 Nov, before this step), the full id list, and the overnight brief (Dispatcher: `reservations.csv` 16 Nov vs 15 Nov, full-row diff).
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (16 Nov). Base, min, max and push are unchanged on all 20 listings (pricelabs, live `get_listing_data`). **But Reyhan made 25 date-override edits on 15 Nov, 18:47:37-19:17:38Z** (`get_user_logs`; group and account logs empty). They are listed below.
- I used no guest data and no booking reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 openings (15-21 Nov, 22-29 Nov) are still your questions (t-p06-1521open, t-p06-2229open). P06 numbers are reported; no P06 price proposal is made.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701). The twins must keep slightly different prices: Reyhan's copy-from-parent edit broke that on 13-15 Dec (conflict below).
- **P04 "never open for fewer than 3 nights" is respected.** No min-1 or min-2 proposal on P04. The 24 Nov orphan is numbers only. Reyhan's new PriceLabs override with min 2 on 18-19 Nov is reported as a conflict for you.
- Not raised again: the Booking.com +10% markup, Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P12 17 Nov (excluded from a-p12-trim again), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 (fully out), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion. The Black Friday 30% (bookable from 19 Nov) and the P13 cancellation are reported for size only.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price, t-p11-8dec-orphan (price) and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **P20 NYE stay: not registered in PriceLabs.** market §1 says "registered (booked 27 Dec-2 Jan)", but its P20 row (67 / 45%) is unchanged from 15 Nov. occupancy and pricelabs H2/H3 read PriceLabs live on 16 Nov: last refresh 15 Nov 19:20:15Z, before the 22:58 booking; 27 Dec-2 Jan `booking_status` "" and `unbookable` 0, open at £2,774. **I use occupancy and pricelabs: not registered** (new t-pl-sync-1611).
2. **P20 NYE paid ratio: 0.650, not 0.628.** comp-west divides by the 15 Nov morning Smoobu (£2,873). The booking came at 22:58, after the 19:20Z push, so Smoobu at booking was **£2,774** (channel §1, pricelabs H3, occupancy). Paid £1,803.78 = **0.650 x £2,774** = 0.765 x 0.85 (or 0.900 x 0.85 x 0.85; the two cannot be told apart). The gap beyond policy (weekly 15% only, £2,357.90) is **£554.12**: £235.79 is the 0.900 tier at 29-59 d and **£318.33 is a further 15% not identified** (channel). comp-west's "about £394" uses the wrong base. Its comp position stands (all-in basis, independent of the ratio).
3. **P05 Valentine's ratio:** 0.750 of Smoobu at booking (£1,627, 07:20Z read; channel), 0.748 of PriceLabs `booked_price` (£1,631; occupancy, pricelabs), **0.724 of today's PriceLabs `price`** (£1,686, after Reyhan's Feb -5% at 19:14:20Z, which came after the 18:54 booking; comp-central). The visible 12% early bird explains £195.24. **The unexplained part is £211.78** (channel, on the Smoobu basis; market £212, occupancy £215.30 on `booked_price`). I use channel.
4. **P13 10-13 Dec: three numbers, three meanings.** £144.06 = paid vs Smoobu at booking (0.765 layer; channel). **About £152** = gap to the 3090701 comp line (£151.61; comp-west). About £25 = what Reyhan's -5% cost (pricelabs H4). The stay sold on twin 3090701 at **£613, £153 under the parent's £766**.
5. **P11 darts average:** £227.75 (14-17 Dec: 220/227/222/242; occupancy, pricelabs) vs £241 (14-18 Dec incl. 18 Dec £295; comp-central). Policy is about the darts nights 13-17 Dec, so I use **£227.75**.
6. **P11 -5% scope:** occupancy says 22 Nov-18 Dec and market says 22 Nov-13 Dec. pricelabs and comp-central read the live overrides: **-5% on 22 Nov-2 Dec, 5-7 and 9-13 Dec only; 14-18 Dec has min-stay overrides and no price.** I use pricelabs.
7. **P13 identical twin nights:** channel 49 open nights (Smoobu to 28 Feb; was 45) and pricelabs 125 (next 180; was 119). Different windows, same direction. 13-15 Dec is new in both.
8. **P04 forward:** occupancy 53.3% (16/30, Smoobu), comp-east 56%, market 57% (PriceLabs). I use 53.3%. **P20 forward:** occupancy 64.3% (18/28 non-blocked) vs comp-west 60.0% (18/30). I use 64.3%.
9. **P20 20-24 Nov: yesterday's +15.8% proposal is superseded.** PriceLabs repriced 20 Nov 258 -> 297 and 21 Nov 234 -> 302 in the 19:20Z refresh (comp-west). Stays are now +1.2% to +8.9% over the 0-review line: **hold**. market notes the risk now runs the other way (£254 over P50, soft week); comp-west does not support a trim either. No price proposal.
10. **t-p20-5dec-orphan day count:** occupancy says day 8; yesterday's report said day 6. I use **day 7** (pricelabs, comp-west).
11. **Rate leak (kpi_pack) is overstated by VAT** (channel §7). Corrected: P04 -11.6%, P11 -25.6%, P12 -24.6%, P13 -36.5% (pack -23.4% / -38.0% / -37.1% / -42.4%).

## Executive summary

1. **The Airbnb hidden layer took three more stays overnight, and a new pattern has appeared.**
   - **P20 NYE** 27 Dec-3 Jan sold at **£257.68/n (0.650 x Smoobu)**. That is P14 of 7 comps, -17.8% vs the median and 3.3% under the 0-review line. **PriceLabs priced the week right** (£396/n vs a £254 fortnight). The cut came after PriceLabs.
   - **P13** 10-13 Dec sold at **£156.31/n (0.765)**, P0 / -27.6%. It sold through the twin priced £153 under the parent. About £152 was left vs the line.
   - **P05** Valentine's 13-17 Feb sold at **£305/n**, the cheapest of the comps (P0 / -22%), at 0.72x today's PriceLabs price.
   - a-airbnb-rules is now **£3,966.66** (day 18).
   - **New lead (channel):** an extra ~15% hits only the three Flexible-cancellation test flats (P06, P20, P05). That is **£530.11** of today's £909.96. New **t-airbnb-flex15-1611**: read the Airbnb reservation breakdowns.
2. **Reyhan made 25 PriceLabs date-override edits last night.** Several fix our plan items:
   - a-peak-check: the Christmas -5% is gone (done).
   - a-p12-trim: +5% -> 0% (half the gap).
   - t-p11-8dec-orphan: min 1. **But** it was set at +50% (£308), while comps support about £122-150.
   - The P11 darts price override is gone: the nights average **£227.75 vs your >£300**.
   - **Conflicts for you to confirm or revert:**
     - **P04 18-19 Nov min 2** (Airbnb sells 18-20 Nov as 2 nights).
     - **P20 16-17 Nov min 2**.
     - **P13 twins now identical** on 13-15 Dec.
     - **P05 Jan/Feb -5%**.
3. **Two critical items carry over.**
   - **P04 1455 (unsynced) is still bookable on the sold 20-24 Nov at £741.40** (day 17).
   - **P20 delivery:** 20-22 Nov is on sale (Airbnb 20-23 Nov £654.83 room). The arrival would be **this Friday**, against the policy's 20-22 Nov delivery block. You need to decide today.
4. **Sync is clean except one stay.**
   - t-smoobu-manual-1415 is **fixed**: Smoobu = PriceLabs on all 270 open nights.
   - t-pl-sync-1511 is **fixed** (P04 20-24 Nov and P13 registered).
   - **New:** P20 27 Dec-3 Jan is not in PriceLabs (Sync Now). It created a **26 Dec orphan** (£300, min 4).
5. **Price gaps.**
   - **P04 December fell again with no edit:** 6-16 Dec is -19% to -30% vs comps, and **+15% on 6-15 Dec is supported** (£133).
   - P12: a further -8% on 18 Nov and -6% on 30 Nov-3 Dec are supported. 26 Nov is P100. Pace is -9.3%, On track by only 0.7 pts.
   - a-discount-cut: **£351 next 14 / £1,296 next 30** (£779 expected).
   - P05: 7-8 / 13-14 Dec +25% (£240). 21/29 Dec are still at +300%.
   - Missed compression: **18 n / £542**.
   - P01 18-20 Dec block (£707).
6. **Booking.com:** the P13 18-23 Dec stay (£847.10) was cancelled. Since 24 Oct, **9 of 24 bookings were cancelled (38.8% of room)**; 15 confirmed / 65 n / £10,723.91.

**Last 30 nights (17 Oct-15 Nov, 13 units):** occupancy **60.0%**, ADR **£173.85**, RevPAR **£104.31**, revenue **£40,682.01**, **234 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 60.8% / £173.88 / £105.67 / £41,210.28 / 237 n.

**Next 30 (16 Nov-15 Dec):** **60.5%** booked (150/248; yesterday 60.9%, 154/253). **Next 60 (16 Nov-14 Jan):** **49.8%** (213/428; yesterday 49.9%).
- Source: occupancy section, live Smoobu GET 07:17:47Z, handback-aware; the two endpoints agree on every unit-night.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, nights after each handback.
- Reconciliation, next 30: new +3 (P13 10-13 Dec); cancellations 0 inside the window; 15 Nov out -8; 15 Dec in +1. 154 + 3 - 8 + 1 = 150.
- Reconciliation, next 60: 216 + 3 - 5 (P13 cancellation) + 7 (P20 NYE) - 8 + 0 = 213.

**7-day pickup (bookings made 10-16 Nov, to 07:17Z):**
- Gross: 10 bookings / 51 n / £9,753.39. Still confirmed: 8 / 39 n / £7,893.43.
- Cancelled in the window: 5 / 22 n / £3,899.80.
- **Net: +29 n / +£5,853.59** (yesterday +22 n / +£3,332.72). 9 Nov leaving the window -2 n / -£124.73; overnight +9 n / +£2,645.60.

## The four overnight changes

**Source:** occupancy, pricelabs H2-H4, channel §1-§2, comp-west, comp-central, market §2. Room = Smoobu basePrice (Booking.com includes VAT). Commission on all three Airbnb stays is 15.5% of room + cleaning (normal host fee).

| Flat / stay | Room paid | Smoobu at booking | Paid / Smoobu | Comps (same dates) | Market | In PriceLabs? | Left behind |
|---|---|---|---|---|---|---|---|
| **P20** Airbnb 27 Dec-3 Jan (7 n, 42 d lead, booked 22:58 after the 19:20Z push) | **£1,803.78** (£257.68/n) | 352/411/426/433/433/358/361 = **£2,774** (£2,873 on the 15 Nov morning read) | **0.650** = 0.765 x 0.85 (policy expects 0.85 only: **-£554.12**, of which £318.33 unidentified) | all-in £279.11/n: **P14 of 7 / -17.8%** vs median £339.71; **3.3% under the 0-review line** (£67.48 over the stay); P6 of wider 18 (comp-west) | room about P50 (£254.3), **£595 under P75**; occupancy +4.6 to +13.6 vs STLY (market) | **No** (last refresh 19:20:15Z) | **26 Dec 1-night orphan** (£300, min 4) |
| **P13** Airbnb 10-13 Dec (3 n, 25 d), on **3090701** | **£468.94** (£156.31/n) | 194/209/210 = **£613** (parent 3064856 £766, **£153 higher**) | **0.765** exactly (policy expects 1.00: **-£144.06**) | all-in £206.31/n: **P0 of 2 / -27.6%** (-21.6% vs the booking-day median); P5 of wider 20; 19.7% under the line, **about £152 left** (comp-west) | room 34% under P50, under P25; occupancy +9.8 to +16.2 (market) | Yes, on both twins | None: 7-9 Dec runs into it; 13-26 Dec is a 14-night run at min 3 |
| **P05** Airbnb 13-17 Feb 2027 (4 n, 90 d) | **£1,219.98** (£305/n) | 424/391/404/408 = **£1,627** | **0.750** = early bird 0.88 x a further ~0.85 (**-£407.02**: £195.24 visible early bird, **£211.78 unidentified**) | paid all-in £353.75/n: **P0 / -22%** vs kept median £451.25 (n = 4), -30% vs wider (comp-central) | at P25 (+£6), **£315 under P50**; no Valentine's premium in the market | Yes (ADR 305) | Nothing |
| **P13** Booking.com 18-23 Dec, **cancelled** 15 Nov 12:24 (Smoobu) | (£847.10, booked 14 Nov) | - | - | Reopened 18-22 Dec at 3064856 £1,098 / 3090701 £1,165, 0% min 3. Kept comps (n = 2) P100 / P50; wider P11-P16 (comp-west): **hold** | occupancy about +8 to +20 vs STLY | Yes (reopened) | Airbnb shows 18-23 Dec at £889.38 / £943.65 room, already above the cancelled £847.10 (channel) |

- **PriceLabs priced all three Airbnb stays at or above the market.** P20: £396/n vs P50 £254. P13 parent: at the line; the twin was 20% under. P05: £422/n vs P50 £384. **The losses happened after PriceLabs:** the 0.765/0.900 hidden layer, the unidentified 15% and the P13 twin gap.
- **The Flexible-test pattern (channel §1).** The extra ~15% shows on bookings at **P06** (24-29 Nov, 0.65025 at 11 d), **P20** and **P05**. These are exactly the three flats on Airbnb Flexible cancellation since 24 Oct. The P04 (14 Nov) and P13 (today) bookings, on flats outside the test, match their card tiers exactly. Today's P20 card at 49 d shows only 0.900 x the visible weekly 15%, so the extra 15% is not on the public card. Cause NOT CHECKED. **This is a lead, not a finding.**
- **Booking.com since the 24 Oct cut** (channel §2): gross 24 / 99 n / £17,520.78; **confirmed 15 / 65 n / £10,723.91**; **cancelled 9 / 34 n / £6,796.87 (38.8% of gross room)**. Since +10% (12 Nov): 4 gross, **3 confirmed** / 16 n / £2,901.32. Pace 1.06 a day gross, 0.66 confirmed. From 19 Nov, Black Friday 30% would show the reopened P13 18-23 Dec at £847.00, the same as the cancelled stay. Per your direction, no promotion change.

## Reyhan's 25 PriceLabs edits (15 Nov 18:47:37-19:17:38Z)

**Source:** pricelabs (table "Changes since 15 Nov"), `get_user_logs` and live `get_listing_date_overrides`. There were 16 edits on Smoobu listings and 9 copies (Vrbo copies of P11/P12/P13 and the P13 child). The evening pushes ran 18:48-19:22Z. "Was" values come from the 15 Nov section. Some old values are UNKNOWN (logs show new values only).

| Ref | Edits (time Z) | Now (was) | Smoobu effect | Plan item / policy | Verdict |
|---|---|---|---|---|---|
| **P04** | 18-19 Nov (19:17:38) | **+10%, min 2** (-5%, min 3) | 166/168 min 2; Airbnb sells 18-20 Nov at £242.51 room (0.726) | **Conflicts with "never fewer than 3 nights"** | **Confirm or revert** (min 3). Price is at the top of the supported range (comp-east): hold the price |
| **P20** | 15-17 Nov (19:16:17) | **-2%, min 2** (-5%, 15 Nov min 3) | 16-17 Nov 250/261 | **Conflicts with min 3 to 30 Nov** (`listing_facts.P20`) | **Confirm or revert.** 17 Nov cannot sell alone before the 18-19 Nov block (comp-west) |
| **P13** 3064856 + 3090701 + Vrbo | 10-26 Dec (19:12:34) | **0%, min 3** (-5%) | 3064856 +1.4%, 3090701 +8.9% on 9 open nights; **twins identical 13-15 Dec (245/240/237)** | **a-peak-check: fixed** (23-26 Dec at 0%, the supported level). **Twin rule broken** (copy-from-parent) | Done, plus a twin-rule conflict: **confirm a ~3% gap on 3090701** (t-p13-twins) |
| **P05** | 29 Nov-2 Dec (19:14:04) | 0%, min 3 (-5%) | £2,040 | Yesterday's b7 conflict | **Resolved** (back to 0%) |
| **P05** | 4-31 Jan, min 3 (19:14:14); 1-28 Feb, min 4 (19:14:20) | **-5%** (old values UNKNOWN; Jan prices rose +6.0%, so the old Jan cut was deeper) | Jan £9,668 -> £10,250 (25 n); Feb £9,778 -> £10,161 (24 n) | Not covered by policy. The Feb -5% came **after** the Valentine's booking, which sold at P0 / -22% (comp-central) with PriceLabs at the median | **Confirm or revert.** Not quantified (no booked share beyond 60 days) |
| **P11** + Vrbo | 18-19 Nov (18:48:12) | **+10%, min 2** | 169/195; list all-in P100 / +19% vs kept | None | Numbers only. comp-central: no raise and no clear cut: hold |
| **P11** | 22 Nov-2 Dec, 5-7, 9-13 Dec (18:48:18) | **-5%**, min 3 (-3%) | 22-27 Nov about -2% | Not covered; 18-27 Nov is +15% to +21% over median on list (comp-central) | Numbers only (part of a-discount-cut's P11 gap) |
| **P11** | 3-4 Dec (18:48:27) | 0%, **min 2** (-3%, min 3) | 270/328 | None | Numbers only (2-4 Dec at the wider median: hold) |
| **P11** | **8 Dec** (18:48:33) | **+50%, min 1** (min 3) | **£308** (was £199) | **t-p11-8dec-orphan: min fixed.** Price +72% to +93% over median on list (P100); supported Smoobu about **£122-150** | Partly fixed. **Your call:** +50% -> about -27% (about £150) |
| **P11** | 14-15 Dec min 3; 16-18 Dec min 2 (18:48:42/52) | **0%** (-3%) | 220/227/222/242/295; **14-17 Dec average £227.75** (£221) | **Darts: your 21 Oct ">£300" and 24 Oct "leave Reyhan's +5%"** | **Confirm or revert.** Revert to +5% on 14-18 Dec: £21. Even then the average is £239, still under £300; comps support about £284-335 |
| **P12** + Vrbo | 17-20 Nov and 30 Nov-3 Dec (18:47:37/42) | **0%, min 2** (+5%) | 17-20 Nov 259/255/265/310; 30 Nov-3 Dec 255/285/287/294 (£1,121, was £1,170) | **a-p12-trim: partly fixed** (+5% -> 0%, proposed -5%) | About half the gap closed (comp-east). Rest in row 4 |
| **P06** | 15-23 Nov (19:14:48) | 0%, min 2 (-10%, 23 Nov min 3) | 16-17 Nov 264/268; 22-23 Nov 250/236 | Intentional-block listing | Numbers only |

**Still live from 9-11 Nov (a-p13-record):** P04 base 200 (your 220); P04 6-22 Dec -5%; P04 15-17 Nov min 2 (booked, no exposure); P04 18-24 Nov -5% (confirm); P14 min 450 (special setup); P05 max 3,500 and 21/29 Dec +300%; P20 base 330 (your 350).

**Unexplained (pricelabs H1/C1):** P04 18-19 Nov's +10% does not show in the pushed price (166/168 is below uncustomized 181/192). P06 and P20 16-17 Nov sit 20-34% above uncustomized with no price override. Account and group customizations are NOT CHECKED.

## Base review

`base_price` is unchanged on every listing (pricelabs). Base vs market P50 is from pricelabs M3 (15 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 14 non-blocked nights to the 20 Dec handback; base -4.9% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (your 220)** / **"Unavailable"** (was 221 on 8-14 Nov) | 53.3% vs 24%; December -19% to -30% vs comps after more overnight cuts; `recommend` +10% at 30 d and 60 d; base +12.4% vs P50 | **Conflict: confirm 200 or revert to 220.** I recommend reverting (£99, not additive with a-p04-dec-1611). Ask PriceLabs support why the recommendation dropped out |
| P05 | 550 / 537 | 66.7% vs 46%; 7-8 Dec -18%, 13-14 Dec -17% vs median; qp +0.15; `recommend` +25%; base -5.8% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 64.3% of 14 non-blocked vs 51%; base -13.3% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / 281 | 53.3% vs 50%; December open stays -14% to -26% on list; 18-27 Nov +15% to +21% over; `recommend` +5%; base -1.7% vs P50 | **Hold 286.** Levers: a-discount-cut, the darts override, 3 Jan / 23-25 Dec |
| P12 | 284 / 284 | 67.9% to handback vs 43%; pace -9.3% (On track by 0.7 pts); open short stays +10% to +26% over band, qp -0.15; base +37.2% vs P50 | **Hold 284; correct the open nights with date overrides** (a-p12-trim) |
| P13 | 250 / 241 | 80.0% vs 47%; 60 d 51.7% vs 37%; base +11.6% vs P50 | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 49%; P100 / +49% to +147%; 75 of 180 open nights at £450 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 64.3% vs 39%; 55.2% vs 30% (60 d); 0 reviews; base +27.9% vs P50 | **Conflict: confirm 350 or record 330** |

## What changed since 15 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+25 n / +£7,329.70** (yesterday +21 / +£6,109.72) |
| Raised, including P06 | **+34 n / +£9,196.31** (made 28 / 108 n / £23,831.63; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +51 n / +£9,443.82 (was +44 / +£7,640.04; P20 NYE +7 / +£1,803.78) |
| P13 (base 235 -> 250, not in policy) | +22 n / +£3,863.90 (was +24 / +£4,242.06: +3 new, -5 cancelled) |
| P04 | +50 n / +£2,115.38 (unchanged) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:**
  - **P05 +16 / +£6,135.19** (was +12 / +£4,915.21): the **new 13-17 Feb stay, +4 / +£1,219.98**, is the whole day-on-day move.
  - P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77).
  - P12 +11 / +£1,660.21.
  - P01 0 / £0.
  - P09 -3 / -£244.70.
  - P11 -5 / -£1,566.77.
- **Reading:** without P05, the raised group like-for-like is unchanged at **+9 n / +£1,194.51**. P05's new stay sold in February at 0.750 x Smoobu, and P05's base also rose on 20 Oct (500 -> 550), so it is not only an 18 Oct effect. **Hold the bases.**
- **Caveat:** the rise cannot be separated from the markup changes, Booking.com promotions, Reyhan's overrides (25 more on 15 Nov) or the P06 reopening. n = 1-9 bookings per flat.

### Per property
| Ref | Change since 15 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked at 276/270/239 (£785). If reopened: £311.33/n all-in = P14 / -15.8% vs stored median £369.67 (n = 7), P21 / -8.2% vs band; parity supported. 100% of 14 non-blocked nights. Pickup -3 n / -£720.90 (an 18-21 Dec cancellation in the window). Base-rise 0. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight (P03 via Channex 02:51Z). P02 Vrbo copy stale since 24 Feb. |
| P04 | PriceLabs registered 20-24 Nov (t-pl-sync-1511 fixed). **1455 still bookable on the sold 20-24 Nov (£741.40)** and 18-21 Nov (£571). **18-19 Nov: Reyhan +10% min 2** (166/168; Airbnb sells 2 nights at 0.726). **December cut again with no edit:** 6-13 Dec -6%, 15 Dec 176 -> 148; now **-19% to -30% vs comps**, +15% supported on 6-15 Dec. 24 Nov orphan £143 (numbers only). Weekly 18% (£55.89 over policy). Fwd30 53.3% vs 24%. |
| P05 | **New Airbnb 13-17 Feb £1,219.98 (0.750; P0 / -22%)**. Reyhan: 29 Nov-2 Dec -5% removed; Jan/Feb -5% re-saved after the booking. 7-8 Dec £922 (-18%), 13-14 Dec £962 (-17%). 21 Dec £2,063 / 29 Dec £2,556 (+300% min 1). One comp inactive (HTTP 410), 5 kept. Base-rise +16 / +£6,135.19. Fwd30 66.7% vs 46%. |
| P06 | Manual Smoobu rates overwritten: 16-17 Nov 264/268 = PriceLabs. Reyhan removed the 15-23 Nov -10% (min 2 kept). 22-23 Nov 250/236: **P0 / -17% kept, -23% wider**, supported about £302/n. 29 Nov orphan £243 min 4. Numbers only (policy). Fwd 64.3% of 14 non-blocked vs 51%. |
| P08 | Handed back. |
| P09 | No sellable night before the 26 Nov handback. Base-rise -3 / -£244.70. |
| P10 | Booked to the 18 Nov handback. |
| P11 | No booking. Reyhan: 18-19 Nov +10% min 2; -5% on 22 Nov-13 Dec (excl. 3-4 and 8 Dec); **8 Dec +50% min 1 (£308; sellable)**; **darts 14-18 Dec price override removed (average £227.75)**. 18-27 Nov +15% to +21% over median on list (hold). 23-25 Dec -5%/-9%; 3 Jan £173. Fwd30 53.3% vs 50%. |
| P12 | Reyhan +5% -> 0% on 17-20 Nov and 30 Nov-3 Dec (about half of the supported trim). 17-19 Nov still P75 / +11.9%; 30 Nov-3 Dec +9.5% (1-3 Dec +14.5%); 26 Nov £301 P100 / +26.2%. **Pace -9.3% (-5 n / -£407.12), On track by 0.7 pts.** |
| P13 | **New Airbnb 10-13 Dec £468.94 (0.765; P0 / -27.6%) on 3090701.** **Booking.com 18-23 Dec (£847.10) cancelled**; 18-22 Dec reopened (hold). Christmas -5% removed (a-peak-check done). **Twins identical on 13-15 Dec** (245/240/237) and 1 Dec. Fwd30 80.0% vs 47%. |
| P14 | Min 450; 75 of 180 open nights at £450; P100 / +49% to +147%; 0% vs 49%. Push crossed 24 h this morning (last 15 Nov 07:49:56Z). Numbers only. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **New Airbnb 27 Dec-3 Jan £1,803.78 (0.650; P14 of 7 / -17.8%)**, **not registered in PriceLabs**; **new 26 Dec orphan** (£300, min 4). Manual Smoobu rates overwritten (16-17 Nov 250/261). Reyhan 15-17 Nov -2% min 2. 20-24 Nov repriced up (+£165) and on sale against the delivery block. 5 Dec orphan £286 min 3 (day 7). Fwd30 64.3% vs 39%. |

### Open plan items: status today
| Item | Status 16 Nov (evidence) |
|---|---|
| t-smoobu-manual-1415 | **Done: fixed.** The 15 Nov evening pushes overwrote the manual rates: P06 16-17 Nov 264/268, P20 250/261, P04 166/168 = PriceLabs. 0 of 270 open nights differ by more than £2 (pricelabs H1, channel §6). The P04 min 2 now comes from a PriceLabs override (a-p13-record) |
| t-pl-sync-1511 | **Done: fixed.** P04 20-23 Nov Booked (refresh 19:20:15Z); P13 10-13 Dec registered on both twins; the cancelled 18-22 Dec reopened on both (pricelabs H2, occupancy) |
| a-peak-check | **Done.** The -5% was removed on 10-26 Dec (19:12:34Z), so 23-26 Dec is at the supported 0%. 10-12 Dec **lapsed with the loss**: sold 17:08, before the edit, at P0 / -27.6% (about £152 under the line; the -5% cost about £25) |
| t-pl-sync-1611 (new) | P20 27 Dec-2 Jan not registered |
| t-p20-26dec-orphan (new) | 26 Dec min 4, unsellable |
| t-airbnb-flex15-1611 (new) | Extra ~15% only on the Flexible-test flats |
| a-p04-dec-1611 (new) | P04 6-16 Dec -19% to -30% vs comps |
| t-p11-8dec-orphan | **Partly fixed:** min 1 (sellable), but at +50% (£308) |
| a-p12-trim | **Partly fixed:** +5% -> 0% |
| t-bcom-breakdown-1511 | P13 part closed with the cancellation; P12 part open |
| t-p04-doublebook | Not fixed, day 17 |
| a-airbnb-rules | Not fixed, day 18; £3,966.66 |
| t-p20-5dec-orphan | Not fixed, day 7 |
| t-p20-delivery | Unchanged; now urgent (Friday) |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-16

**Ranking:** time-bound rows first (on sale this week), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). Airbnb factor (channel §5): 0.765 up to 28 d, 0.900 at 29-59 d. P11 (Booking.com only): 0.762. P04: booked share only (same method as yesterday). These are upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.533, P05 0.667, P06 0.643, P11 0.533, P12 0.679, P13 0.800, P20 0.643.
- Booked share, next 60: P04 0.483, P05 0.617, P11 0.467, P13 0.517, P20 0.552.

**Bounds** (`kpi_pack` settings, 16 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 17, live).** On 1455876748739910219, **block every date now, starting with 18-24 Nov**, or snooze/unlist it. Then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §3: **20-24 Nov bookable at £741.40** (was £679.16) although sold on the synced listing; 18-21 Nov £571.00 (includes booked 20 Nov); 6-19 Dec £2,275.22. comp-east: bookable on all 11 runs | Not quantified (exposure = any booking on 1455 plus relocation cost; 20-24 Nov would be a certain double booking) | Corentin | 2026-11-16 |
| 2 | P20 | **t-p20-delivery (urgent: arrival would be Friday).** Confirm the delivery dates. **If delivery is 20-22 Nov:** block 20-22 Nov in Smoobu today. **If not:** update `policy.json listing_facts.P20.block_20_21_nov` and hold the price (no change). | Smoobu > Calendar > Waterford; `policy.json` | channel §6: Smoobu blocks 18-19 Nov only; **20 Nov £297, 21 Nov £302 (min 3), 22 Nov £257 (min 2) open; Airbnb sells 20-23 Nov at £654.83 room**. comp-west: 20-24 Nov +1.2% to +8.9% over the 0-review line, hold | Not quantified (a policy question; yesterday's +15.8% is superseded by the PriceLabs repricing) | Corentin | 2026-11-17 |
| 3 | P04 P20 P13 P11 P05 P14 P12 | **a-p13-record: confirm or revert Reyhan's edits** (table above). **Time-bound:** (a) **P04 18-19 Nov min 2 -> 3**, or keep it and record it in policy (Airbnb sells 18-20 Nov now). (b) **P20 16-17 Nov min 2 -> 3**, or record it. Then: (c) **P11 darts DSO 14-18 Dec 0% -> +5%** (about 231/238/233/254/310); (d) P05 Jan/Feb -5%: confirm or revert; (e) **P04 base 200 -> 220**; (f) P04 6-22 Dec -5% (see row 13); (g) P14 min 450, P05 max 3,500, P20 base 330 vs 350: confirm. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3547481, 3064196, 3166592, 3267077; `policy.json` | pricelabs C1 + logs; channel §4 (P04 18-20 Nov £242.51 room at 0.726); comp-west (P20 17 Nov unsellable); occupancy and comp-central (darts £227.75 vs >£300; comps support about £284-335); comp-central (Valentine's sold P0 / -22% while PriceLabs was at the median); comp-east (P04 `recommend` +10% at 30 d / 60 d) | P11 darts: £1,206 x 0.05 x 0.762 x 0.467 = **£21**. P04 base: £1,857 (18-19 Nov + 6-15 Dec) x 0.10 x 0.533 = **£99** (not additive with row 13). Total **£120** (upper bound) | Corentin | 2026-11-17 |
| 4 | P12 | **a-p12-trim (your call: lowers a price; partly done by Reyhan).** **18 Nov DSO 0% -> -8%** (255 -> about £235; 17 Nov excluded per policy). **30 Nov-3 Dec 0% -> -6%** (255/285/287/294 -> about 240/268/270/276). Hold 19-20 Nov and the 3-4 night stays. Override of `recommend` (a mechanical raise +10% / NL +5%): the raise branch ignores qp -0.15, and the occupancy lead comes from nights already sold. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 17-19 Nov £259.50 all-in **P75 / +11.9%** vs band, 18-20 Nov +10.1%; 30 Nov-3 Dec **+9.5%**, 1-3 Dec +14.5% (P80), 2-4 Dec +18.5%; NL P82-P87; Reyhan's 0% covered about half | Not quantified (a cut) | Corentin | 2026-11-17 |
| 5 | P20 P13 P05 P06 P04 P12 | **a-airbnb-rules (critical, day 18).** Remove the hidden rules: nights up to 28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). On Barking find the extra 0.95 on 2-night stays. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §1/§5: **P13 10-13 Dec 0.765 (-£144.06)**, **P20 NYE 0.650 (-£554.12)**, **P05 Feb 0.750 (-£211.78 beyond the visible 12%)**; comp-west and comp-central: all three sold at P0-P14 of comps while the PriceLabs price was at or above the market | **Realised cost £3,966.66** (+£909.96 today). Exposed on today's open cards: **£582.29** (P04 18-20 Nov £91.49, P20 20-23 Nov £72.77, P20 4-11 Jan £132.28, P13 18-23 Dec £109.80, P04 6-19 Dec £175.95) | Corentin | 2026-11-17 |
| 6 | P06 P20 P05 | **NEW t-airbnb-flex15-1611 (high).** Open the Airbnb reservation price breakdown (host payout detail) for **P20 27 Dec-3 Jan, P05 13-17 Feb and P06 24-29 Nov**. Name the extra ~15% layer. Then check on those three listings what the Flexible-cancellation test turned on (Airbnb > Listing > Policies > Cancellation, and Pricing > Discounts / promotions). Send screenshots; nothing is changed until we know the layer. | Airbnb host app > Reservations (3 stays); Airbnb > Listings P20 / P05 / P06 > Policies and Pricing | channel §1: the extra 15% appears **only on the three Flexible-test flats** (P06 0.65025 at 11 d; P20 £318.33; P05 £211.78); the P04 and P13 bookings outside the test match their card tiers exactly; the public P20 7-night card at 49 d shows only 0.900 x weekly 15% | **£530.11 identified on today's two stays** (included in row 5's total, not additive). Ongoing size not quantified | Corentin | 2026-11-17 |
| 7 | P20 | **NEW t-pl-sync-1611.** PriceLabs **Sync Now** on Waterford Court 3547481. Check that 27 Dec-2 Jan shows Booked and 26 Dec shows `unbookable` 1. | PriceLabs > 3547481 > Sync Now | pricelabs H2/H3, occupancy: last refresh 15 Nov 19:20:15Z, before the 22:58 booking; 27 Dec-2 Jan shown open at £2,774; P20 `occupancy_next_60` understated by 7 nights while Aggressive occupancy pricing runs | Not quantified (no double sale: Smoobu holds the nights) | Corentin | 2026-11-17 |
| 8 | Portfolio | **a-deposit (deadline 20 Nov, 4 days).** Decide: £1,000 hold, damage waiver, or ID check only, before Airbnb's rule change. | Airbnb account settings | policy `guest_requirements` | Not quantified | Corentin | 2026-11-19 |
| 9 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec so **18-20 Dec** sell at £276 / £270 / £239, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £311.33/n all-in = **P14 / -15.8%** vs stored median £369.67 (n = 7), **P21 / -8.2%** vs band £339.17; parity supported (qp 0; up to about +8%) | £785 x 0.900 = **£707** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-17 |
| 10 | P05 P04 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P05, P04, P11 and P20. All four still have Aggressive occupancy and Booking Recency default (pricelabs). **P12, P13 excluded** (priced above uncustomized). On P04 this reverses the 30-day-edge cuts (15 Dec 176 -> 148). | PriceLabs 3166592 / 3562176 / 3064196 / 3547481 > Customizations | pricelabs H5, next 30 (17 Nov-16 Dec): **P05 £531 (-11.0%)**, **P04 £496 (-18.5%)**, **P11 £422 (-10.9%)**, P20 £146 (-5.0%); total **£1,296 next 30 / £351 next 14**; comp-east: P04 December cut with no edit | 531 x 0.765 x 0.667 + 496 x 0.533 + 422 x 0.762 x 0.533 + 146 x 0.765 x 0.643 = **£779 / 30 days** (upper bound) | Corentin | 2026-11-17 |
| 11 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £696) and **29 Dec +300% -> 0%** (£1,034). **7-8 Dec DSO +3% -> +29%** (464/458 -> about 580/573) and **13-14 Dec +5% -> +31%** (487/475 -> about 609/594), per `recommend` +25%. That stays under the comp median-level £595/£606; comps support up to +15% over the median (about £703/£716). | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-8 Dec **P0 / -18%**, 13-14 Dec **P0 / -17%** (n = 3-4); qp +0.15; `recommend(0.667, 0.46, 0.08, 0.15)` = +25%; market: +£211 / +£192 to P75, occupancy +6.6/+1.2 and +11.9/+5.2; 21/29 Dec n = 0 qualifying comps, 2.3x P90 | 7-8 Dec £231 x 0.765 x 0.667 = £118; 13-14 Dec £241 x 0.765 x 0.667 = £123; 21 Dec £696 x 0.900 x 0.617 = £386: **£626** (upper bound). 29 Dec not quantified | Corentin | 2026-11-17 |
| 12 | P20 | **NEW t-p20-26dec-orphan (after row 7).** DSO **26 Dec min 1**, keep the price (about £300; Reyhan's -5% stays your call). | PriceLabs 3547481 > DSO 26 Dec | occupancy, pricelabs H6: 1-night gap between the 19-26 Dec and 27 Dec-3 Jan stays, min 4, `kpi_pack gaps`; comp-west: market P50 £256 / P75 £334, kept 26-30 Dec comps median £377.88 (n = 8); supported min 1 at about £300 | £300 x 0.900 x 0.552 = **£149** | Corentin | 2026-11-17 |
| 13 | P20 | **t-p20-5dec-orphan (day 7).** DSO **5 Dec min 3 -> 1**, keep £286 (outside the policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H5/H6 (`unbookable` 1; override 0% min 3 since 9 Nov); comp-west: between market P50 £228 and P75 £297, about 36% under the only 1-night comp (£445); Jingle Bell Ball 5-6 Dec | £286 x 0.765 x 0.643 = **£141** | Corentin | 2026-11-17 |
| 14 | P04 | **NEW a-p04-dec-1611.** DSO **6-15 Dec -5% -> +10%** (about +15.8%: 152/151/150/150/153/160/163/151/145/148 -> about 176/175/174/174/177/185/189/175/168/171) and **16 Dec -5% -> 0%** (179 -> about £188). Keep 17-22 Dec at -5% (hold). If you revert the base to 220 (row 3e), use **+5%** on 6-15 Dec instead. | PriceLabs 3562176 > DSO 6-16 Dec | comp-east Priority 1: 6-9 Dec **P0 / -26.6%**, 9-12 Dec -25.4%, 11-14 Dec -21.3%, 14-17 Dec -23.7% (band -19% to -30%), supported -15% to 0% (qp -0.15); supported room 175-207 / 171-202; December cut -6% overnight, 15 Dec -16%, no edit; `recommend` +10% at 30 d and 60 d, adopted at the larger size because the gap exceeds the step; market 11-13 Dec +3.8 to +6.3, 14-19 Dec +£221 to P75 | (£1,523 x 0.158) x 0.533 + £9 x 0.483 = **£133** (upper bound) | Corentin | 2026-11-17 |
| 15 | P11 | **t-channel-gaps.** **3 Jan:** DSO so the price is about **£195** (£173 now). **23-25 Dec:** DSO **+5%** (23 Dec 282 -> about £296), per `recommend` +5%. | PriceLabs 3064196 > DSO 23-25 Dec, 3 Jan | comp-central: 3 Jan priced as 3-5 Jan -16% kept / -4% wider, supported £195-232; 23-25 Dec -5% kept / -9% wider, supported £288-300; market 3 Jan +2.0 vs STLY, £19 under the fortnight | 3 Jan £22 x 0.762 x 0.467 = £8; 23-25 Dec £811 x 0.05 x 0.762 x 0.467 = £14: **£22** | Corentin | 2026-11-18 |
| 16 | P11 | **t-p11-8dec-orphan (partly fixed; your call: lowers a price).** Keep min 1 (Reyhan's). Set the price DSO **+50% -> -27%** (308 -> about £150). | PriceLabs 3064196 > DSO 8 Dec | comp-central: £308 = list all-in £487.80, **P100 / +93% kept, +72% wider**; a 1-night stay carries the full £149 cleaning, so the median supports about **£122-150** Smoobu room; market P50 £255 / P75 £312 (market says "near P75", but on room only) | Not quantified (a cut on a now-sellable night) | Corentin | 2026-11-18 |
| 17 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -15%**, keep min 1 (£301 -> about £222). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £356 all-in, **P100 / +26.2%** (n = 5), NL >P90; supported room £203-238 | Not quantified (a cut) | Corentin | 2026-11-18 |
| 18 | P13 | **t-p13-twins (conflict: Reyhan's copy-from-parent).** Restore a gap: DSO **3090701 about +3%** on **13-15 Dec** and on 15 Jan-28 Feb (child only; set it after any parent edit). Which twin is cheaper is not raised (deprioritised). | PriceLabs 3090701 > DSO | channel §5: **49 identical open nights** (was 45); 13-15 Dec 245/240/237 on both since 19:12:34Z; pricelabs M1: 125 of 180 (was 119); comp-west: 13-16 Dec £735 on both on Airbnb; +3% keeps 3090701 near its line | Not quantified (duplicate-listing risk) | Corentin | 2026-11-18 |
| 19 | P06 | **t-p06-1521open (confirm; not a proposal).** Was opening 15-21 Nov intended? 16-17 Nov now sell at the PriceLabs 264/268 (the manual rates are gone). **If yes:** record it in `policy.json`. **If no:** re-block. | Smoobu > Calendar > Marylebone; `policy.json` | pricelabs H1 (264/268 is 20-33% above uncustomized, cause UNKNOWN); comp-central | Not quantified (policy question; 16 Nov lapses tonight) | Corentin | 2026-11-17 |
| 20 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the block to start 30 Nov intended? **If yes:** date note in `policy.json`; your call: DSO 29 Nov min 4 -> 1 (keep £243). **If no:** re-block 22-23 and 29 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 | comp-central: 22-23 Nov 250/236, **P0 / -17% kept, -23% wider**, supported about £302/n; 29 Nov orphan P0 / -24% at min 4 | Not quantified (policy question) | Corentin | 2026-11-18 |
| 21 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 9 post-cut Booking.com cancellations, including P13 18-23 Dec (cancelled 15 Nov). | Booking.com extranet > Reservations | channel §2: **9 of 24 (38.8% of gross room; £6,796.87)**; confirmed 15 / 65 n / £10,723.91; 3 of 4 since +10% confirmed | Not quantified | Corentin | 2026-11-18 |
| 22 | P12 | **t-bcom-breakdown-1511 (question; no promotion change).** The P13 part closed with the cancellation. Still send the extranet breakdown of P12 7-14 Dec: which two 10% layers applied. | Booking.com extranet (Mile End) > Reservations | channel §2 (15 Nov stack Weekly 0.85 x 0.9 x 0.9 x 0.95; Genius L2&3 did not apply); nets £61.21 per £100 | Not quantified (no change proposed) | Corentin | 2026-11-18 |
| 23 | P11 | **a-p11-bcom-stack (no change proposed).** Still only the ask: the extranet breakdown of the 28 Nov-2 Dec and 9-14 Dec stays. | Booking.com extranet (Camden) | channel (14 Nov): ceil x 1.10 x 0.9 x 0.9 x 0.9 x 0.95; nets £62.47 per £100 | Not quantified | Corentin | 2026-11-18 |
| 24 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Airbnb 1618929775762183214 > Pricing > Discounts (or Smoobu Airbnb rules) | channel §1/§5: **applied on the new Valentine's stay (£195.24)**; -12.0% on the 6-10 and 17-21 Feb cards | **£195.24** per such stay | Corentin | 2026-11-18 |
| 25 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel (15 Nov): -£192.30 on 14-19 Jan; not testable today | **£192.30** per 5-night stay | Corentin | 2026-11-18 |
| 26 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §5: -£104.85 / -£98.82 on the reopened 18-23 Dec | **£98.82** per 5-night stay (cheaper twin) | Corentin | 2026-11-18 |
| 27 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb 1657859794156786222 > Pricing > Discounts | channel §5: -£335.34 = 18.0% of £1,863 on 6-19 Dec | **£55.89** per 6-19 Dec stay | Corentin | 2026-11-18 |
| 28 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-18 |
| 29 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-18 |

**Closed today:** t-smoobu-manual-1415 (fixed), t-pl-sync-1511 (fixed), a-peak-check (fixed; 10-12 Dec lapsed with the loss). **New today:** t-airbnb-flex15-1611, t-pl-sync-1611, t-p20-26dec-orphan, a-p04-dec-1611. None reopened.

## Top 5 for today
1. **Three new Airbnb stays sold under their comps, all after PriceLabs had priced them right.**
   - P20 NYE: £257.68/n = 0.650 x Smoobu, about 18% under the comp median and 3.3% under the 0-review line.
   - P13 10-13 Dec: £156.31/n, P0. It sold on the twin priced £153 under the parent, leaving about £152.
   - P05 Valentine's: £305/n, the cheapest of the comps, at 0.72x PriceLabs.
   - a-airbnb-rules is now £3,966.66 (day 18).
   - An extra ~15% shows only on the three Flexible-cancellation test flats (P06/P20/P05; £530.11 today). New t-airbnb-flex15-1611: open the Airbnb reservation breakdowns.
2. **Reyhan made 25 PriceLabs override edits last night.**
   - They close a-peak-check (Christmas -5% removed) and half of a-p12-trim (+5% -> 0%).
   - They open P11 8 Dec at min 1, but at +50% (£308) where comps support about £122-150.
   - They remove the P11 darts override (average £227.75 vs your >£300).
   - **For you to confirm or revert:** P04 18-19 Nov min 2 and P20 16-17 Nov min 2 (vs your min-3 rules), the P13 twins made identical on 13-15 Dec, and the P05 Jan/Feb -5%.
3. **Two critical items this week.**
   - P04's unsynced Airbnb 1455 is still bookable on the sold 20-24 Nov (£741.40, day 17): block its calendar today.
   - P20 20-22 Nov is on sale against the delivery block, with a Friday arrival: decide today.
4. **Sync is clean.** t-smoobu-manual-1415 is fixed (the pushes overwrote the manual rates; Smoobu = PriceLabs on all 270 open nights) and t-pl-sync-1511 is fixed. New: P20's NYE stay is not in PriceLabs (Sync Now), and it created a 26 Dec orphan (min 1 at about £300, £149).
5. **Price gaps.**
   - P04 December was cut again with no edit: 6-16 Dec is -19% to -30% vs comps, and +15% on 6-15 Dec is supported (£133).
   - P12: a further -8% on 18 Nov and -6% on 30 Nov-3 Dec; 26 Nov is P100; pace -9.3%, On track by 0.7 pts.
   - a-discount-cut £351 next 14 / £1,296 next 30 (£779).
   - Missed compression 18 n / £542. P05 7-8 / 13-14 Dec +25% (P0, -17% to -18%). P06 22-23 Nov is 17-23% under comps (numbers only). P05 21/29 Dec are still at +300%.
   - P13 Booking.com 18-23 Dec was cancelled: 9 of 24 Booking.com bookings cancelled since 24 Oct (38.8%).
   - 18 Oct base rises: +25 n / +£7,329.70 like-for-like. The change is P05's February stay.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 from 60 d (channel §5, day 18). Flexible-test flats show a further ~0.85 on real bookings (P06, P20, P05).
  - **Today it is the single cause of all three under-comp sales.** PriceLabs had P20 NYE at £396/n vs P50 £254 and P05 Valentine's at £422/n vs P50 £384. The rate dropped between Smoobu and the guest.
  - Owner net per £100 Smoobu (channel §7): **P20 NYE £54.95, P05 Feb £63.36**, Airbnb 0.765 £64.64, 1.000 £84.50; Booking.com P12 £61.21. Direct model £90 (unconfirmed).
  - Target: **1.00x before visible discounts by 2026-11-20** (rows 5-6). Then rerun the Flexible-test comparison (row 6).
- **Booking.com since the 24 Oct markup cut** (channel §2):
  - Confirmed 15 / 65 n / £10,723.91; **9 of 24 cancelled (38.8% of room)**, up from 33%. Pace 0.66 confirmed a day (about 0.33 before the cut). Since +10%: 3 of 4 confirmed.
  - The markup is not stopping bookings; cancellations are the leak. Target: under 20% cancelled by 2026-11-30 (row 21 finds the cause first).
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
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** That is why P12's open nights need trims, why P04's ceiling is the comp median, and why P13 Christmas is held at 0%.
  - **P20's 0 reviews cost about 15% on every stay** (comp-west line = median x 0.85). Review requests after the NYE and December stays are the cheapest RevPAR lever on P20.
  - Fixes: the P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; P20 review requests; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31; P20 first 3 reviews by 2026-12-31.
- **Listing conversion.**
  - **P11:** 18-27 Nov sits over the median on list while December is under it. Basement with a patio; 4 of 12 comps have a lift. Booking.com CTR 0.81% vs 1.70% (21 Oct only). Titles (a-titles).
  - **P20:** parking photo first; 0 reviews.
  - **P04:** mapping 1455 (row 1) is both a risk fix and a conversion fix (4.69 (26) vs 4.2 (10)).
  - **P13:** keep the twins distinct (row 18). Identical twins risk Airbnb's duplicate block.
- **Gap fill / length of stay.**
  - Unsellable now: P20 26 Dec (row 12, new), P20 5 Dec (row 13), P06 29 Nov (policy), P04 24 Nov (P04 rule). Fixed today: P11 8 Dec (min 1). Soft blocks: P05 21/29 Dec (row 11).
  - Exact fits only: P04 18-20 Nov (min 2, conflict), P06 22-24 Nov.
  - 16 Jan-15 Mar below 5 nights (pricelabs H6): P11 44/59, P13 46/59 per twin, P05 37/52, P20 53/59, P04 44/59 open nights. For you to confirm that the 5-night policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded). PriceLabs > Customizations > Orphan day: NOT CHECKED. Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): now 9 days overdue. Today's lead is that the test flats pay an extra ~15%. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days, plus the Airbnb breakdowns (row 6).
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. At P20 NYE's £54.95 per £100, a direct guest at -10% (£90) nets about 64% more.
- **Event compression** (market §4): **18 n / £542** (yesterday 17 / £540); bookable 16 / £481.
  - New: P04 24 Nov (+£31, unbookable, algorithm cut 164 -> 143).
  - Real gaps: P11 darts 14-17 Dec (£201; row 3c); P20 16-18 Dec (£138, mostly a fortnight artefact); P20 24 Nov (£39).
  - Sold under compression overnight: P20 NYE (£595 under P75), P13 10-12 Dec (£244 under P50), P05 Valentine's (£315 under P50). All three were the Airbnb layer, not PriceLabs.
  - Where the market supports a raise: P04 11-19 Dec (row 14); P05 7-8 / 13-14 Dec (row 11); P11 3 Jan and 23-25 Dec (row 15). P13 13-26 Dec is £323 under P50, but the kept comps say hold (comp-west).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **60.0%** (60.8% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£173.85** (£173.88) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£104.31** (£105.67) | £129 | 2026-12-18 |
| Revenue, last 30 | **£40,682.01** (234 n) | - | - |
| Booked next 30 (Smoobu) | **60.5%** (150/248) | each unit at least market + 10 pts (below: P11 53.3% vs 50%) | 2026-11-20 |
| Booked next 60 | **49.8%** (213/428) | at least market + 10 pts (below: P11 46.7% vs 38%) | 2026-11-20 |
| 7-day pickup, net | gross 10 bk / 51 n / £9,753.39; cancelled 5 / 22 n / £3,899.80; **net +29 n / +£5,853.59** | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace vs STLY (to 13 Dec handback) | **-9.3%** (-5 n / -£407.12), On track by 0.7 pts (was -8.0%) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+25 n / +£7,329.70 like-for-like**; +34 n / +£9,196.31 incl. P06; P05 +16 / +£6,135.19; P12 +11 / +£1,660.21; P11 -5 / -£1,566.77 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **15 confirmed / 65 n / £10,723.91; 9 of 24 cancelled (38.8%)**; 3 of 4 since +10% confirmed | cancellations under 20% | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 18; Flexible-test flats about 0.85x lower again; realised cost **£3,966.66** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,296 next 30; £351 next 14** | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **0 of 270 open nights differ by more than £2**; 1 booking not registered (P20 27 Dec-2 Jan) | 0 mismatches; all bookings registered | 2026-11-17 |
| Unsellable orphan nights (next 60) | **4** (P20 26 Dec new, P20 5 Dec, P06 29 Nov (policy), P04 24 Nov (P04 rule)); P11 8 Dec fixed; P05 21/29 Dec at +300% | 0 outside P04 | 2026-11-18 |
| Double-sellable Barking stays | **1455 bookable on the sold 20-24 Nov (£741.40) and every open run**, day 17 | 0 | 2026-11-16 |
| P13 identical twin nights | **49** open nights (was 45) | 0 | 2026-11-18 |
| Missed compression | **18 n / £542**; bookable 16 / £481 | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.77; comp medians 4.24-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **The extra ~15% on the Flexible-test flats (P06/P20/P05):** NOT CHECKED. Source: Airbnb host app > reservation price breakdown for the three stays (row 6).
2. **P20 NYE in PriceLabs:** not registered. Source: PriceLabs Sync Now on 3547481 (row 7).
3. **Old values replaced by Reyhan's 15 Nov edits** (P11 18-19 Nov and 8 Dec, P05 Jan/Feb, P20 20-24 Nov): UNKNOWN. `get_user_logs` shows new values only. Source: ask Reyhan, or PriceLabs support for override history.
4. **Why P04 18-19 Nov's +10% does not show in the price, and why P06/P20 16-17 Nov sit 20-34% above uncustomized:** UNKNOWN. Account and group customizations: NOT CHECKED. Source: PriceLabs > Account / Group customizations.
5. **Cause of overnight algorithm cuts with no edit** (P04 6-15 Dec -6% to -16%, P04 24 Nov 164 -> 143, P13 16-26 Dec uncustomized -8% after the cancellation): NOT VERIFIED (Booking Recency suspected). Source: PriceLabs per-date factor breakdown (calendar view).
6. **Barking recommended base "Unavailable"** (was 221 on 8-14 Nov): cause UNKNOWN. Source: PriceLabs support.
7. **Booking.com live prices** (reopened P13 18-22 Dec; Black Friday from 19 Nov) and same-date channel ordering: NOT CHECKED (AWS WAF 07:22:34Z, not bypassed). Source: Corentin extranet screenshots.
8. **Price at the moment of booking:** Smoobu keeps no rate history. The P05 rate at booking (£1,627 vs £1,631) and the P20 rate (assumes no Smoobu change 19:20Z-22:58) are not confirmed. Source: Smoobu rate history / Airbnb breakdowns.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Other:**
    - Airbnb listing id behind P13 3090701 is likely, not confirmed.
    - Listing 1455's reservations, cleaning and min stay: NOT CHECKED.
    - P15-P19 need the second-account keys.
    - Vrbo +8% / Direct -10% are unconfirmed.
    - P02 Vrbo copy stale since 24 Feb (the P13 Vrbo copy is now fresh).
    - Events are search summaries (alexandrapalace.com / pdc.tv ENOTFOUND). Unresolved: darts end 3 vs 4 Jan, Squeeze 21 vs 26 Nov.
    - P05 comp set is down to 5 kept comps (one HTTP 410) with no qualifying replacement.
    - comp-west made two PriceLabs calls in parallel once (both OK).

```json
{"scoreboard":{"note":"16 Nov 2026. Last 30 nights = 17 Oct-15 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:17:47Z, handback-aware, Smoobu as truth); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and nights after each handback excluded. Pickup = bookings made 10-16 Nov net of cancellations. P20 forward uses Smoobu because PriceLabs has not registered the 27 Dec-3 Jan stay. P12 pace handback-aware to 13 Dec (kpi_pack 30-day -14.9% includes 14-15 Dec STLY). Base-rise like-for-like excludes both P06 stays on reopened nights. Airbnb ratios from channel sections 1 and 5 (Smoobu at booking; live cards 07:18-07:20Z). Booking.com figures from channel section 2. PriceLabs gap from pricelabs H5. Sync from pricelabs H1/H2. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"60.0%"},{"label":"ADR last 30","value":"£173.85"},{"label":"RevPAR last 30","value":"£104.31"},{"label":"Revenue last 30","value":"£40,682.01"},{"label":"Nights last 30","value":"234"},{"label":"Booked next 30","value":"60.5% (150/248)"},{"label":"Booked next 60","value":"49.8% (213/428)"},{"label":"7-day pickup","value":"gross 10 bk / 51 n / £9,753.39; cancelled 5 / 22 n / £3,899.80; net +29 n / +£5,853.59"},{"label":"P12 pace vs STLY","value":"-9.3% (-5 n / -£407.12) to the 13 Dec handback; On track by 0.7 pts (was -8.0%)"},{"label":"Raised flats net since 18 Oct","value":"+25 n / +£7,329.70 like-for-like; +34 n / +£9,196.31 incl. P06; P05 +16 / +£6,135.19 (new Feb stay +4 / +£1,219.98); P12 +11 / +£1,660.21; P11 -5 / -£1,566.77; P01 0"},{"label":"Booking.com since markup cut","value":"15 confirmed, 65 n, £10,723.91; 9 of 24 cancelled (38.8% of gross room); since +10% (12 Nov) 4 gross, 3 confirmed, 16 n, £2,901.32"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x from 60 d; Flexible-test flats a further ~0.85x on real bookings; day 18; realised cost £3,966.66"},{"label":"Owner net per £100 Smoobu","value":"Airbnb P20 NYE £54.95, P05 Feb £63.36, 0.765 tier £64.64; Booking.com P12 £61.21; direct model £90 (unconfirmed)"},{"label":"PriceLabs-side gap","value":"£1,296 next 30; £351 next 14"},{"label":"PriceLabs vs Smoobu","value":"0 of 270 open nights differ by more than £2 (manual rates overwritten); P20 27 Dec-2 Jan not registered"},{"label":"Unsellable orphans","value":"P20 26 Dec (new), P20 5 Dec (day 7), P06 29 Nov (policy), P04 24 Nov (P04 rule); P11 8 Dec now min 1; P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£741.40) and every open P04 run, day 17"},{"label":"P13 identical twin nights","value":"49 open nights (was 45); 13-15 Dec newly identical"},{"label":"Missed compression","value":"18 n / £542; bookable 16 n / £481"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 17), live: unsynced Barking Airbnb 1455876748739910219 is bookable for the sold 20-24 Nov at £741.40 (was £679.16) and 18-21 Nov £571.00, plus every other open run (6-19 Dec £2,275.22); block all dates now (18-24 Nov first) or unlist, then map to 3562176","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"critical","title":"Urgent, arrival would be Friday: Smoobu blocks 18-19 Nov only; 20 Nov £297, 21 Nov £302 (min 3), 22 Nov £257 (min 2) on sale against policy's 20-22 Nov delivery block; Airbnb sells 20-23 Nov at £654.83 room; Corentin to confirm: block 20-22 Nov in Smoobu today, or update policy and hold the price (20-24 Nov now +1.2% to +8.9% over the 0-review line; yesterday's +15.8% superseded by the PriceLabs repricing)","gbp":null},
{"id":"a-p13-record","status":"open","prop":"P04 P20 P13 P11 P05 P14 P12","priority":"high","title":"For Corentin to confirm or revert Reyhan's edits (25 on 15 Nov 18:47-19:17Z plus 9-11 Nov): P04 18-19 Nov +10% min 2 vs the never-under-3 rule (Airbnb sells 18-20 Nov at £242.51 room, 0.726); P20 16-17 Nov -2% min 2 vs min 3 to 30 Nov; P13 twins identical 13-15 Dec (copy-from-parent, twin rule); P05 4-31 Jan / 1-28 Feb -5% (Feb set after the Valentine's sale at P0 / -22%); P11 darts 14-18 Dec 0% vs your +5% / >£300 (avg £227.75; revert to +5% £21); P04 base 200 vs 220 (revert £99, not additive with a-p04-dec-1611); P04 6-22 Dec -5%; P14 min 450; P05 max 3500; P20 base 330 vs 350; resolved: P05 29 Nov-2 Dec back to 0%, P12 +5% to 0%, P06 -10% removed; £120","gbp":120},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Partly fixed by Reyhan (+5% -> 0% on 17-20 Nov and 30 Nov-3 Dec, about half the gap); remaining, Corentin's call (lowers a price): 18 Nov DSO 0% -> -8% (255 -> about £235; 17 Nov excluded per policy; 17-19 Nov P75 / +11.9% vs band); 30 Nov-3 Dec 0% -> -6% (about 240/268/270/276; +9.5% vs band, 1-3 Dec +14.5%); hold 19-20 Nov and 3-4 night stays","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P13 P05 P06 P04 P12","priority":"critical","title":"Day 18, not fixed: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d); three new stays: P13 10-13 Dec 0.765 (-£144.06, P0 / -27.6%), P20 NYE 0.650 (-£554.12, P14 of 7 / -17.8%), P05 13-17 Feb 0.750 (-£211.78 beyond the visible 12%, P0 / -22%), all priced at or above market by PriceLabs; realised cost now £3,966.66 (+£909.96); £582.29 exposed on today's open cards; extra 0.95 on P04 2-night cards unidentified; P09 excluded","gbp":3966.66},
{"id":"t-airbnb-flex15-1611","status":"open","prop":"P06 P20 P05","priority":"high","title":"New: an extra ~15% Airbnb layer appears only on the three Flexible-cancellation test flats (P06 24-29 Nov 0.65025 at 11 d; P20 NYE £318.33; P05 Feb £211.78), while P04 and P13 bookings match their card tiers exactly and the public cards do not show it; open the Airbnb reservation price breakdowns for these three stays and check what the Flexible test turned on (Policies > Cancellation, Pricing > Discounts); £530.11 identified today (included in a-airbnb-rules)","gbp":530.11},
{"id":"t-pl-sync-1611","status":"open","prop":"P20","priority":"high","title":"New: PriceLabs has not registered P20 Airbnb 27 Dec-3 Jan (3547481 last refresh 15 Nov 19:20:15Z, booking 22:58; 27 Dec-2 Jan shown open at £2,774, unbookable 0; occupancy_next_60 understated by 7 nights under Aggressive occupancy pricing); Sync Now on 3547481; not quantified","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (4 days)","gbp":null},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (£276/£270/£239, min 3) are closed; confirm intent; if not, end the block 18 Dec (£311.33/n all-in = P14 / -15.8% vs stored median £369.67, P21 / -8.2% vs band; parity supported); £785 x 0.900 = £707","gbp":707},
{"id":"a-discount-cut","status":"open","prop":"P05 P04 P11 P20","priority":"high","title":"Not done; gap £1,296 next 30 / £351 next 14 (P05 £531 -11.0%, P04 £496 -18.5%, P11 £422 -10.9%, P20 £146 -5.0%); all four still Aggressive occupancy + Booking Recency default; P04 December cut again at the 30-day edge (15 Dec 176 -> 148); set Occupancy, Booking Recency and Last-minute to Custom 0% on P05, P04, P11, P20; P12/P13 excluded; expected £779 / 30 days","gbp":779},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"Unchanged: 21 Dec £2,063 / 29 Dec £2,556 at Reyhan's +300% min 1 act as soft blocks (2.3x P90, n=0 qualifying comps): confirm intent (block in Smoobu) or, your call, both +300% -> 0% (uncustomized £696 / £1,034); 7-8 Dec +3% -> +29% (£922, P0 / -18%) and 13-14 Dec +5% -> +31% (£962, P0 / -17%) per recommend +25%, still under the median level £595/£606; £626","gbp":626},
{"id":"t-p20-26dec-orphan","status":"open","prop":"P20","priority":"high","title":"New: 26 Dec 1-night orphan between the 19-26 Dec and new 27 Dec-3 Jan stays, min 4, unsellable at about £300; after Sync Now, DSO 26 Dec min 1 keep price (market P50 £256 / P75 £334; kept 26-30 Dec comps £377.88); £300 x 0.900 x 0.552 = £149","gbp":149},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (day 7): P20 5 Dec 1-night orphan, min 3, unbookable at £286; DSO 5 Dec min 1, keep price (between market P50 £228 and P75 £297, ~36% under the only 1-night comp £445); £286 x 0.765 x 0.643 = £141","gbp":141},
{"id":"a-p04-dec-1611","status":"open","prop":"P04","priority":"high","title":"New: P04 December cut again with no edit (6-13 Dec -6%, 15 Dec 176 -> 148); 6-16 Dec now -19% to -30% vs comps (P0) vs supported -15% to 0%; DSO 6-15 Dec -5% -> +10% (about 168-189) and 16 Dec -5% -> 0% (about £188), hold 17-22 Dec; +5% instead if the base goes back to 220; £133","gbp":133},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 3 Jan £173 -> DSO to about £195 (3-5 Jan -16% kept / -4% wider, supported £195-232); 23-25 Dec DSO +5% (23 Dec 282 -> about £296; -5% kept / -9% wider, supported £288-300); 8 Dec now sellable (t-p11-8dec-orphan); Booking.com CTR 0.81% vs 1.70% (21 Oct only); £22","gbp":22},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Partly fixed: Reyhan set 8 Dec min 1 (sellable) but +50% -> £308 (list all-in £487.80, P100 / +93% kept, +72% wider); comps support about £122-150 Smoobu room on a 1-night stay; your call (lowers a price): keep min 1, DSO +50% -> -27% (about £150); not quantified","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £301 (£356 all-in, P100 +26.2%, n=5, NL >P90); DSO +15% -> -15% (about £222; supported £203-238), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Worse, conflict with the twin rule: Reyhan's copy-from-parent DSO (15 Nov 19:12Z) made 13-15 Dec identical (245/240/237 on both; Airbnb £735 on both); 49 identical open nights (was 45; 125 of next 180); DSO 3090701 about +3% on 13-15 Dec and 15 Jan-28 Feb, set on the child after any parent edit; Corentin to confirm","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; manual Smoobu rates now overwritten, 16-17 Nov sell at PriceLabs 264/268 (20-33% above uncustomized, cause unknown); Reyhan removed the -10% (min 2 kept); if intended record in policy, else re-block; 16 Nov lapses tonight","gbp":null},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): 22-29 Nov reopening (24-29 Nov sold); 22-23 Nov 250/236 after Reyhan removed the 15-23 Nov fixed DSO: P0 / -17% kept, -23% wider, supported ~£302/n; 29 Nov orphan £243 min 4 (P0 / -24%); who/why UNKNOWN; if intended note in policy + (your call) 29 Nov min 1; if not re-block 22-23 and 29 Nov","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"high","title":"Worse: P13 18-23 Dec (£847.10) cancelled 15 Nov; 9 of 24 post-cut Booking.com bookings cancelled (38.8% of gross room, £6,796.87); confirmed 15 / 65 n / £10,723.91; 3 of 4 since +10% confirmed; send rate plans and reasons for the 9 cancellations","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P12","priority":"medium","title":"P13 part closed with the 18-23 Dec cancellation; still send the P12 7-14 Dec extranet breakdown (exact Weekly 0.85 x 0.9 x 0.9 x 0.95: which two 10% layers; Genius L2&3 15% did not apply); nets £61.21 per £100; no promotion change proposed","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; 18% booster; nets £62.47 per £100); per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Applied on the new 13-17 Feb stay (£195.24) and -12.0% on the 6-10 / 17-21 Feb cards: St John's Wood visible 12% early booking (60+ d) not in policy - yours, or 0%?","gbp":195.24},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged (not testable today): P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£192.30 on 14-19 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":192.3},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (-£104.85 / -£98.82 on the reopened 18-23 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":98.82},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (-£335.34 on 6-19 Dec, £55.89 over policy)","gbp":55.89},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"0 reviews cost ~15% on every stay (NYE sold P14 of 7, 3.3% under the 0-review line); 20-24 Nov now £248/n all-in, P0 / -14.0%, +1.2% over the line (hold); remaining: parking first photo, review requests after the December and NYE stays; Flexible-test comparison 9 days overdue (see t-airbnb-flex15-1611)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback -9.3% (-5 n / -£407.12), On track by only 0.7 pts (was -8.0%); base +37.2% vs P50; correct the open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 17 Nov twins £309 / £337 all-in (+35% min 1; P75 of 4, P62 wider): hold; 27 Nov £348 / £383 (+50% min 1; P100 of wider 3; market Finals Weekend +14.4): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests (new P05 Feb stay is 8 guests)","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced (14-18 Nov stay checks out 18 Nov; record carries a £129 cleaning element): ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 '5-bed'); Barking recommended base 'Unavailable' (ask PriceLabs support); P13 Vrbo copy now fresh, P02 Vrbo stale since 24 Feb: should Vrbo copies push?; Vrbo +8% / Direct -10% unconfirmed; record Reyhan's 15 Nov edits, P06 reopening, P20 delivery dates and the P04 synced Airbnb listing in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"P05 comp 1617681646241740026 inactive (HTTP 410), dropped, no qualifying replacement (P05 now 5 kept); kept ids not returned for 4 days: P06 x2, P14 x2, P17 x1 (pages 200, calendars NOT CHECKED); P20 789954794593691037 absent from standard searches 3rd day but bookable on probes (kept); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown (now also relevant to t-airbnb-flex15-1611)","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (new 10-13 Dec Airbnb stay is the normal 15.5% host fee)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-smoobu-manual-1415","status":"done","prop":"P20 P06 P04","priority":"critical","title":"Fixed: the 15 Nov evening pushes (18:48-19:22Z) overwrote the manual Smoobu rates (P06 16-17 Nov 264/268, P20 250/261, P04 166/168 = PriceLabs); 0 of 270 open nights differ by more than £2; the P04 18-19 Nov min 2 now comes from Reyhan's PriceLabs override (moved to a-p13-record)","gbp":null},
{"id":"t-pl-sync-1511","status":"done","prop":"P04 P13","priority":"high","title":"Fixed: P04 20-23 Nov shown Booked (refresh 15 Nov 19:20:15Z); P13 10-13 Dec registered on 3090701 with 3064856 Blocked; cancelled 18-22 Dec reopened on both twins; remaining gap (P20 27 Dec-2 Jan) moved to t-pl-sync-1611","gbp":null},
{"id":"a-peak-check","status":"done","prop":"P13","priority":"high","title":"Done: Reyhan removed the 10-26 Dec -5% on both twins (15 Nov 19:12:34Z), so 23-26 Dec is at the supported 0%; 10-12 Dec lapsed with the loss: sold on Airbnb at 17:08, before the edit, at £156.31/n (P0 / -27.6%, about £152 under the line; the -5% cost about £25); twin-rule side effect moved to t-p13-twins","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 is bookable for the sold 20-24 Nov at £741.40 (was £679.16) and 18-21 Nov at £571; double-booking risk live, day 17","evidence":"channel section 3 (live Airbnb 07:18:58-07:19:23Z); comp-east (£742; open on all 11 runs)."},
{"agent":"channel","severity":"critical","ref":"P20 P13 P05","title":"Three new Airbnb stays paid under Smoobu at booking: P13 0.765 (-£144.06), P20 NYE 0.650 (-£554.12), P05 Feb 0.750 (-£211.78 beyond the visible 12%); a-airbnb-rules now £3,966.66 (day 18)","evidence":"channel section 1 (Smoobu price elements, fit.py; pushes 19:13-19:20Z vs booking times); pricelabs H3/H4; occupancy."},
{"agent":"channel","severity":"high","ref":"P06 P20 P05","title":"Extra ~15% Airbnb layer appears only on the three Flexible-cancellation test flats (P06, P20, P05; £530.11 today); P04 and P13 bookings match their card tiers; not on the public cards; cause not identified","evidence":"channel section 1 pattern; policy monitoring.airbnb_flexible_cancellation_test; P20 4-11 Jan card shows only 0.900 x weekly 15%."},
{"agent":"pricelabs","severity":"critical","ref":"P04 P20","title":"Reyhan's 15 Nov overrides set P04 18-19 Nov +10% min 2 and P20 15-17 Nov -2% min 2, against the P04 never-under-3 rule and P20 min 3 to 30 Nov; Airbnb sells P04 18-20 Nov as 2 nights at 0.726","evidence":"pricelabs C1 (get_user_logs 19:17:38Z / 19:16:17Z, live overrides, Smoobu 07:18:38Z); channel section 4; comp-east."},
{"agent":"pricelabs","severity":"high","ref":"P13 P12 P11 P05 P06","title":"25 date-override edits by Reyhan 15 Nov 18:47-19:17Z: P13 Christmas -5% removed (a-peak-check done), P12 +5% -> 0% (a-p12-trim half), P11 8 Dec +50% min 1, P11 darts price override removed (avg £227.75), P05 Jan/Feb -5%, P06 -10% removed","evidence":"pricelabs changes table and H5; market section 2; comp-central; comp-west (get_listing_date_overrides)."},
{"agent":"pricelabs","severity":"high","ref":"P20 P06 P04","title":"t-smoobu-manual-1415 fixed: evening pushes overwrote the manual Smoobu rates; 0 of 270 open nights differ by more than £2; t-pl-sync-1511 fixed","evidence":"pricelabs H1/H2 (live Smoobu rates vs raw price); channel section 6; occupancy registration table."},
{"agent":"occupancy","severity":"high","ref":"P20","title":"P20 27 Dec-3 Jan not registered in PriceLabs (last refresh 19:20:15Z, booking 22:58); new 26 Dec 1-night orphan at min 4","evidence":"occupancy (live get_listing_prices); pricelabs H3/H6; kpi_pack gaps; market section 1 read it as registered from a stale row (corrected)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 NYE sold at £279.11/n all-in: P14 of 7 / -17.8% vs median £339.71, 3.3% under the 0-review line, P6 of wider 18; PriceLabs level was right (£396/n vs £254 fortnight); the loss is the Airbnb layer","evidence":"comp-west P20 table and comp_summary recompute; market section 2 (room about P50, £595 under P75)."},
{"agent":"comp-west","severity":"high","ref":"P13","title":"P13 10-13 Dec sold on twin 3090701 at £156.31/n room, P0 / -27.6%, P5 of wider 20, 19.7% under the line (about £152); the twin was priced £153 under the parent at booking","evidence":"comp-west P13 table; pricelabs H4 (£613 vs £766; -5% cost ~£25); market section 2 (£244 under P50)."},
{"agent":"comp-central","severity":"high","ref":"P05","title":"P05 Valentine's 13-17 Feb paid £353.75/n all-in, P0 / -22% vs kept (cheapest of comps), 0.72x today's PriceLabs; PriceLabs was at the median; Reyhan's Feb -5% came after the booking","evidence":"comp-central P05 Valentine's table; channel section 1; market section 2 (P25, £315 under P50, no Valentine's premium)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 December cut again with no edit (6-13 Dec -6%, 15 Dec -16%); 6-16 Dec -19% to -30% vs comps; +15% on 6-15 Dec and +5% on 16 Dec supported; 18-19 Nov at the top of range (hold)","evidence":"comp-east Priority 1; market section 2/4 (P04 11-19 Dec occupancy +0.8 to +6.3; 24 Nov 164 -> 143)."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"P11 darts 14-18 Dec has no price override (avg £227.75 on 14-17 Dec) vs policy >£300 and comps ~£284-335; 8 Dec +50% at £308 is P100 (+72% to +93% on list), supported ~£122-150; 18-27 Nov +15% to +21% over median on list (hold)","evidence":"comp-central P11 table; pricelabs H5; market section 2 (darts gap £289)."},
{"agent":"comp-east","severity":"medium","ref":"P12","title":"Reyhan's 0% covered about half of the P12 trim: 17-19 Nov still P75 / +11.9% vs band, 30 Nov-3 Dec +9.5%, 26 Nov P100 / +26.2%; a further -8% (18 Nov) and -6% (30 Nov-3 Dec) supported","evidence":"comp-east Priority 2; NL P82-P87."},
{"agent":"channel","severity":"high","ref":"P13 P11 P12 P04","title":"P13 Booking.com 18-23 Dec (£847.10) cancelled 15 Nov; 9 of 24 post-cut Booking.com bookings cancelled (38.8% of gross room); 15 confirmed / 65 n / £10,723.91","evidence":"channel section 2 (reservations.csv 16 Nov; same script reproduces 15 Nov)."},
{"agent":"channel","severity":"medium","ref":"P13","title":"P13 twins identical on 49 open nights (was 45); 13-15 Dec newly identical after Reyhan's copy-from-parent override; conflicts with the twin rule","evidence":"channel section 5; pricelabs M1 (125 of 180); comp-west (Airbnb £735 on both for 13-16 Dec)."},
{"agent":"occupancy","severity":"medium","ref":"P12","title":"P12 pace to the 13 Dec handback -9.3% (-5 n / -£407.12): On track by only 0.7 pts (was -8.0%); kpi_pack -14.9% includes 14-15 Dec STLY","evidence":"occupancy pace section (rm.metrics.on_the_books)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises: +25 n / +£7,329.70 like-for-like; +34 / +£9,196.31 incl. P06; the whole move is P05's new Feb stay (+4 / +£1,219.98); without P05 +9 / +£1,194.51","evidence":"occupancy base-rise section (rise.py, full recompute)."},
{"agent":"pricelabs","severity":"medium","ref":"P05 P04 P11 P20","title":"PriceLabs discount gap £1,296 next 30 / £351 next 14 (P05 £531, P04 £496, P11 £422, P20 £146); all four still Aggressive occupancy + Booking Recency default","evidence":"pricelabs H5 (an16.py)."},
{"agent":"market","severity":"medium","ref":"P04 P11 P20","title":"Missed compression 18 n / £542 (was 17 / £540); new P04 24 Nov (+£31, unbookable); sold under compression overnight: P20 NYE, P13 10-12 Dec, P05 Valentine's","evidence":"market section 4 (analyse16.py)."}
],
"top5":[
"Three new Airbnb stays sold under comps after PriceLabs priced them right: P20 NYE £257.68/n (0.650x Smoobu, P14 of 7 / ~18% under the comp median, 3.3% under the 0-review line); P13 10-13 Dec £156.31/n (P0, sold on the twin priced £153 under the parent, ~£152 left); P05 Valentine's £305/n (cheapest of comps, 0.72x PriceLabs). a-airbnb-rules now £3,966.66 (day 18). An extra ~15% hits only the three Flexible-cancellation test flats (P06/P20/P05, £530.11 today): new t-airbnb-flex15-1611 - open the Airbnb reservation breakdowns.",
"Reyhan's 25 PriceLabs override edits (15 Nov 18:47-19:17Z) closed a-peak-check (Christmas -5% removed) and half of a-p12-trim (+5% -> 0%), and opened P11 8 Dec at min 1 but +50% (£308 vs comps ~£122-150); the P11 darts override is gone (avg £227.75 vs your >£300). For you to confirm or revert: P04 18-19 Nov min 2 and P20 16-17 Nov min 2 (vs min-3 rules), P13 twins made identical on 13-15 Dec, P05 Jan/Feb -5%.",
"Critical this week: P04's unsynced Airbnb 1455 still sells the already-sold 20-24 Nov (£741.40, day 17) - block its calendar today; P20 20-22 Nov is on sale against the delivery block with a Friday arrival (Airbnb 20-23 Nov £654.83 room) - block or update policy today.",
"Sync clean: t-smoobu-manual-1415 fixed (pushes overwrote the manual rates; Smoobu = PriceLabs on all 270 open nights) and t-pl-sync-1511 fixed. New: P20 NYE 27 Dec-3 Jan not registered in PriceLabs (Sync Now) and a new 26 Dec orphan (min 1 at ~£300, £149); 5 Dec orphan day 7 (£141).",
"Price gaps: P04 December cut again with no edit, 6-16 Dec -19% to -30% vs comps, +15% on 6-15 Dec supported (£133); P12 a further -8% on 18 Nov and -6% on 30 Nov-3 Dec, 26 Nov P100, pace -9.3% (On track by 0.7 pts); a-discount-cut £351 / £1,296 (£779); missed compression 18 n / £542; P05 7-8 / 13-14 Dec +25% (£240), 21/29 Dec still +300%; P06 22-23 Nov 17-23% under comps (numbers only); P13 Booking.com 18-23 Dec cancelled (9 of 24 since 24 Oct, 38.8%); base rises +25 n / +£7,329.70 like-for-like, the change is P05's Feb stay."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked at £276/£270/£239 (£785); if reopened £311.33/n all-in = P14 / -15.8% vs stored median £369.67 (n = 7), P21 / -8.2% vs band, parity supported (£707); 100% of 14 non-blocked nights booked; pickup -3 n / -£720.90; base-rise 0."},
{"ref":"P02","change":"Intentional block; pushed 16 Nov 00:23Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 16 Nov 02:51Z via Channex."},
{"ref":"P04","change":"20-24 Nov now registered in PriceLabs; unsynced 1455 still bookable on the sold 20-24 Nov (£741.40) and 18-21 Nov (£571), day 17; Reyhan 18-19 Nov +10% min 2 (166/168; Airbnb sells 2 nights at 0.726; policy conflict; price at top of range); December cut again with no edit (6-13 Dec -6%, 15 Dec 176 -> 148), now -19% to -30% vs comps, +15% on 6-15 Dec supported (£133); 24 Nov orphan £143 (numbers only); recommended base 'Unavailable'; weekly 18%; fwd30 53.3% vs 24%."},
{"ref":"P05","change":"New Airbnb 13-17 Feb £1,219.98 (£305/n, 0.750 x Smoobu; P0 / -22% vs kept; £211.78 unexplained beyond the 12% early bird); Reyhan removed 29 Nov-2 Dec -5% and re-saved Jan/Feb -5% (Feb after the booking); 7-8 Dec £922 (-18%), 13-14 Dec £962 (-17%), +25% supported; 21/29 Dec +300%; one comp inactive (5 kept); base-rise +16 / +£6,135.19; fwd30 66.7% vs 46%."},
{"ref":"P06","change":"Manual Smoobu rates overwritten (16-17 Nov 264/268 = PriceLabs, 20-33% above uncustomized, cause unknown); Reyhan removed 15-23 Nov -10% (min 2 kept); 22-23 Nov 250/236 P0 / -17% kept, -23% wider (supported ~£302/n); 29 Nov orphan £243 min 4; Flexible-test extra ~15% on its 24-29 Nov stay; numbers only (policy); fwd 64.3% of 14 non-blocked vs 51%."},
{"ref":"P07","change":"Intentional block; pushed 16 Nov 04:15Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"No booking; Reyhan: 18-19 Nov +10% min 2 (list P100 / +19%, hold), -5% on 22 Nov-13 Dec (excl. 3-4, 8 Dec), 3-4 Dec min 2, 8 Dec +50% min 1 (£308, sellable; supported ~£122-150), darts 14-18 Dec price override removed (avg £227.75 vs policy >£300; conflict); 23-25 Dec -5%/-9% (+5% supported), 3 Jan £173 (~£195 supported); fwd30 53.3% vs 50%."},
{"ref":"P12","change":"Reyhan +5% -> 0% on 17-20 Nov and 30 Nov-3 Dec (about half the supported trim); 17-19 Nov P75 / +11.9% vs band, 30 Nov-3 Dec +9.5%; 26 Nov £301 P100 / +26.2%; pace -9.3% (-5 n / -£407.12), On track by 0.7 pts; base-rise +11 / +£1,660.21."},
{"ref":"P13","change":"New Airbnb 10-13 Dec £468.94 on 3090701 (0.765; P0 / -27.6%; twin was £153 under the parent; ~£152 left); Booking.com 18-23 Dec (£847.10) cancelled, 18-22 Dec reopened (hold); Christmas -5% removed (a-peak-check done); twins identical on 13-15 Dec and 1 Dec (49 identical nights); fwd30 80.0% vs 47%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 75 of 180 open nights at £450; P100 / +49% to +147%; 0% vs 49%; push crossed 24 h this morning; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"New Airbnb 27 Dec-3 Jan £1,803.78 (£257.68/n, 0.650 x Smoobu; P14 of 7 / -17.8%; £554.12 beyond the weekly 15%), not registered in PriceLabs; new 26 Dec orphan (£300 min 4); manual rates overwritten (16-17 Nov 250/261); Reyhan 15-17 Nov -2% min 2 (conflict); 20-24 Nov repriced up and on sale against the delivery block (hold price); 5 Dec orphan £286 min 3 (day 7); fwd30 64.3% vs 39%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 14 non-blocked nights booked to the 20 Dec handback; base -4.9% vs P50; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (rec Unavailable; 221 on 8-14 Nov)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended (£99, not additive with a-p04-dec-1611); ask PriceLabs why the recommendation dropped out","reason":"December -19% to -30% vs comps after more overnight cuts vs supported -15% to 0% (qp -0.15); recommend +10% at 30 d and 60 d; 53.3% vs 24%; base +12.4% vs P50 (comp-east; occupancy; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"66.7% vs 46%; 7-8 Dec -18%, 13-14 Dec -17% vs median; qp +0.15; recommend +25%; base -5.8% vs P50; Valentine's loss was after PriceLabs (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 9 of 14 non-blocked nights booked (64.3%) vs 51%; base -13.3% vs P50 (occupancy; pricelabs M3; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"53.3% vs 50% (Smoobu); December open stays -14% to -26% on list while 18-27 Nov is +15% to +21% over; recommend +5% 30d / 60d; base -1.7% vs P50; levers are a-discount-cut, the darts override and date overrides (comp-central; pricelabs H5; occupancy)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"67.9% to handback vs 43%; pace -9.3% (On track by 0.7 pts); open short stays +10% to +26% vs band with qp -0.15; base +37.2% vs P50; handback 13 Dec (comp-east; occupancy; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 241)","recommendation":"Keep 250 and record it in policy","reason":"80.0% vs 47% (+33 pts); 60d 51.7% vs 37%; base +11.6% vs P50 (comp-west; occupancy; pricelabs M3)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 49%; P100 / +49% to +147% vs comps at £450; 75 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"64.3% vs 39% (30d), 55.2% vs 30% (60d); 0 reviews; base +27.9% vs P50; NYE priced well above market by PriceLabs, the loss was the Airbnb layer (occupancy; comp-west; pricelabs M3)."}
]}
```

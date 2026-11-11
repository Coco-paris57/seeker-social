# Seeker Estates - Daily revenue report, 2026-11-11 (Wednesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-11/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-11/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-10/daily-report.md` and its JSON, the dashboard action list (11 Nov, before this step) and the overnight brief (Dispatcher facts from your 10 Nov extranet screenshots).
- `data/policy.json`, read first (unchanged since 25 Oct). `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/base/max come from `kpi_pack` `settings` (11 Nov). No base/min/max changed since 10 Nov. Recommended bases moved: P05 544 -> 537, P11 283 -> 281.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 15-21 Nov opening stays with you to confirm (t-p06-1521open). It is not a proposal.
- P14 is numbers only. Reyhan's P14 minimum (500 -> 450) is still reported as a conflict with your special setup. No P14 proposal of my own.
- P13 is one flat (3064856 + 3090701). Bookings on either twin count once.
- Not raised again: Visibility Booster commission (P11 8-15 Dec 18.00% = Camden booster, expected), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov, P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes a Booking.com promotion. The Camden stack item (a-p11-bcom-stack) asks you to confirm or revert a 15% Last Minute deal that differs from your recorded 10%, to check one Smoobu setting and one rate-plan setting, and offers stacking scope as an option. Every discount stays.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price and the P05 21 Dec reset inside a-p05-dec.
  - Reyhan's 9-10 Nov edits that cross your decisions are framed as **confirm or revert**. They are not re-proposed as new ideas.

## Corrections and conflicts resolved between sections

1. **The Dispatcher's 10 Nov estimate (£1,471 for P11 8-15 Dec with Weekly + Genius only) was wrong.**
   - Once Last Minute and Mobile no longer apply to the Weekly plan, the **Standard plan would carry Last Minute 10% x Mobile 10% x Genius 10% = 0.729 = £1,401.87**. That is cheaper than Weekly + Genius (0.765), and Booking.com shows the guest the cheapest plan (channel §1).
   - If the fifth layer is Weekly occupancy pricing and stays, the stay prices at 0.6885 = £1,323.99.
   - **Realistic value of the fix on this stay: +£311 to +£389 room** (+£255 to +£319 net of 18%), not +£458.
2. **P11 guest count: answered.** Smoobu priceElements show **2 adults, 0 children** (channel §1). The fifth 10% is therefore most likely occupancy pricing on the Weekly plan (fewer than 6 guests; the NR plan already has 1-4 guests -5%). Genius dynamic is the other candidate. **Which one: NOT CHECKED.** A single 20% Genius is ruled out (0.5202 = £1,000.38, not £1,012.86).
3. **Booking.com list on Camden = Smoobu x 1.10, not x 1.15.** pricelabs H2 and channel §1 agree on all 13 screenshot nights (ceil(Smoobu x 1.10) exactly). Earlier bookings (P11 20-22 Nov, P13 11-15 Dec) fitted x 1.15. Either the global markup changed between 9 Nov 08:58 and 10 Nov 12:50, or Smoobu held prices about 4% lower at 12:50 (no push in `listings.csv` supports that). **NOT CHECKED.** Separately, policy `booking_markup_scope` still says "+20%", which is stale text against `booking_markup` 0.15 (a-tidy).
4. **a-airbnb-rules running cost: £2,363.11, not £2,559.27.** I adopt channel's method: a cancelled stay pays nothing, so it has no shortfall against policy. The P20 21-25 Nov -£196.16 moves to a memo line ("sold-then-cancelled"). P01 18-21 Dec was booked 19 Oct, before the tally starts, so no adjustment.
5. **P20 forward occupancy: 60.7% (17/28), Smoobu.** kpi_pack says 69.0% because PriceLabs still shows the cancelled 21-24 Nov as Booked. comp-west's 56.7% (17/30) counts the blocked 18-19 Nov as open. I use occupancy's 60.7%.
6. **P20 delivery conflict is live, not gone.** market §2 says the delivery conflict is "gone"; channel, occupancy and comp-west say 20-22 Nov are now open and bookable on Airbnb. Policy says the delivery block is 20-22 Nov; Smoobu blocks 18-19 Nov. **It goes back to you (t-p20-delivery).** The 20 Nov orphan itself is gone.
7. **P09 12 Nov.** occupancy: block 162726554 still on 11 Nov. comp-east: 12 Nov `available 1`, min 2. Both are right: the block covers 11 Nov only, and 12 Nov cannot sell because of min 2. **Only min 1 sells it** (or deleting the 11 Nov block so a 2-night stay from tonight fits).
8. **P13 twins.** comp-west: met (5-8 Jan £207 vs £198.33, +4.4%; December about 5% apart). channel: **identical on 22 of 29 open January nights (10-31 Jan) and all 28 open February nights** (Smoobu to 28 Feb). Both are right for different windows. The rule is met to 9 Jan and broken from 10 Jan. t-p13-twins stays open for 10 Jan-28 Feb.
9. **P11 8-15 Dec ratios.** Paid £1,012.86 = 0.5267 x Booking.com Standard (£1,923); 0.580 x Smoobu at booking (£1,745, the 09:27Z push); 0.578 x PriceLabs 9 Nov 21:22Z (£1,753); **0.680 x PriceLabs after the policy 15% weekly (£1,490; -£477.14)**. PriceLabs layers took £199 (10.2%) off uncustomized, of which Reyhan's -3% is about £54; about 82% of the gap sits on the Booking.com side (pricelabs H2).
10. **18 Oct base rises.** Recomputed in full by occupancy: **+15 n / +£4,901.66 like-for-like; +19 n / +£5,758.45 including P06.** The change is exactly two bookings: P11 8-15 Dec (+7 / +£1,012.86) and the P01 18-21 Dec cancellation (-3 / -£720.90). pricelabs H2's plain arithmetic gives the same.

## Executive summary

1. **Tonight and tomorrow.**
   - **P09 12 Nov (tomorrow)** is unsellable: £120, min 2, between the 11 Nov block and the 13 Nov arrival. Min 1 is the only lever: **£112**.
   - **P06 11 Nov (tonight)** is a 1-night gap at min 2 (£200): min 1 for tonight, **£108**.
   - **P11 11-13 Nov block** (162775668, reason unknown): tonight is lost; 12-13 Nov (£195 / £243) are worth **£244** if the block is unintended.
   - **Sync Now on P11 and P20.** P11's 16:28Z refresh was not pushed: Smoobu sells 20 open nights **£325 under PriceLabs**. P20's cancellation is not in PriceLabs: 21-24 Nov still "Booked", 20 Nov still `unbookable`.
2. **P11 Camden Booking.com 8-15 Dec sold at 0.5267 of Standard** (£1,012.86 room; -£477.14 vs PriceLabs after weekly; **-56% vs the comp median all-in**, P0). Within your "keep Booking.com discounts" direction: confirm or revert the **15% Last Minute portfolio deal (6 Nov) vs your 10% (24 Oct)** (+£59.57 on this stay); check the **Smoobu Booking.com markup (x 1.10 seen, policy 1.15)** (+£45.81); check the **fifth 10%** (2 adults: Weekly occupancy pricing likely, NOT CHECKED) and **Genius dynamic** (+£112.54). The stacking-scope option is worth **+£311-£389** on such a stay.
3. **Darts.** 13-14 Dec sold at **£126.94 / £113.24 room vs your "above £300"** (shortfall at least £359.82). 15-17 Dec are open at **£201 / £211 / £234** (PriceLabs £212 / £222 / £246) vs comp median **£394-£398**. Reyhan's 9 Nov **-3% replaced your +5%**: confirm or revert. The rest of Reyhan's 9 Nov settings are still live (P04 base 200, P14 min 450, P05 max 3,500 and 21/29 Dec +300%), plus their **10 Nov P12 +5%**, which reverses a-p12-trim while P12 pace is **-30.6%**.
4. **Two Airbnb cancellations overnight.**
   - **P01 18-21 Dec (£720.90):** the Smoobu block was extended to 21 Dec **36 seconds later**, so 18-20 Dec did not reopen. Please confirm intent; if unintended, £806 at a comp-supported price. P01's 18 Oct base-rise gain is now **0**.
   - **P20 21-25 Nov (£638.54):** 20-24 Nov is now a 5-night open run (Smoobu £1,355) that PriceLabs has not seen. The delivery-date question (policy 20-22 Nov vs Smoobu 18-19 Nov) is back with you. 5 Dec is still an orphan: min 1 at £311 is supported (£170).
5. **Barking 1455, day 12**, still bookable on every open P04 run. **Hidden Airbnb layers, day 13**, running cost **£2,363.11**.

**Last 30 nights (12 Oct-10 Nov, 13 units):** occupancy **63.3%**, ADR **£169.32**, RevPAR **£107.24**, revenue **£41,822.67**, 247 nights (kpi_pack `portfolio_last30`, exact). Yesterday: 64.1% / £170.06 / £109.01 / £42,514.05 / 250 n.

**Next 30 (11 Nov-10 Dec):** **60.5%** booked (158/261; yesterday 61.9%). **Next 60 (11 Nov-9 Jan):** **50.5%** (224/444; yesterday 51.1%).
- Smoobu is the source of truth (occupancy, live GET 07:18Z). Handback-aware. Excludes policy blocks, P01 30 Nov-20 Dec, P06 from 22 Nov, P20 18-19 Nov, P09 11 Nov and P11 11-13 Nov.

**7-day pickup (bookings made 5-11 Nov, to 07:18Z):**
- Gross: 12 bookings / 57 n / £12,060.60. Cancelled in window: 7 / 31 n / £5,434.79.
- **Net: +26 n / +£6,625.81** (yesterday +26 n / +£6,972.39).
- Reconciles exactly: + P11 8-15 Dec (+7 / +£1,012.86), - P01 18-21 Dec (-3 / -£720.90), - P20 21-25 Nov (-4 / -£638.54).

## Reyhan's 9-10 Nov changes, for you to confirm or revert

**Source:** pricelabs C2 and `get_user_logs`. Since 10 Nov 06:00Z: **6 new entries, all by Reyhan at 10 Nov 16:28Z, all on P12** (copied to the P12 Vrbo child). Every 9 Nov setting is still live (live `get_listing_data` 07:18Z). `policy.json` unchanged since 25 Oct.

### A. Settings (base / min / max), unchanged since 9 Nov
| Ref | Change | Your standing decision | Today's evidence | My read |
|---|---|---|---|---|
| **P04** 3562176 | Base 220 -> **200** | None recorded (pack, `id_map` 220; PriceLabs rec 221) | comp-east: **November 18-24 Nov -30% to -38% vs comps** (NL P28), quality-supported -15%; supported move **about +7-10%**. December -16% to +4% vs band (NL P60): consistent with the cut. market: November soft (-4.0 to +0.6 vs STLY) | **Revert to 220 recommended** (November). December would sit at the top of its supported range; watch it. Revert: £2,420 x 0.10 x 0.467 = **£113** (upper bound) |
| **P14** 3267077 | Min 500 -> **450** | `special_setups.P14` (£500 minimum) | 65 of 180 open nights at £450; 28 of 30 next 30 (pricelabs C2); P100, +28% to +117% vs comps; 0% vs 46% | **Conflicts with your special setup.** Confirm 450 (and update policy) or revert 500. No proposal from me |
| **P05** 3166592 | Max 2,500 -> **3,500** | Not covered | Only 29 Dec (£2,786) is above 2,500 | Confirm or revert; linked to a-p05-dec |

### B. Date overrides that cross your decisions or the evidence
| # | Ref / dates | Your decision | Now | Evidence | Direction |
|---|---|---|---|---|---|
| b1 | **P11 13-18 Dec (darts)** inside 22 Nov-18 Dec | Darts +5%, "leave as it is", average above £300 (21/24 Oct) | **-3% min 3** (9 Nov 21:21:47Z) | **13-14 Dec SOLD at £126.94 / £113.24 room** (8-15 Dec stay). 15-17 Dec open: Smoobu £201/£211/£234 (PL £212/£222/£246). comp-central: 13-17 Dec median **£394 (9)**, 15-18 Dec **£397.67 (8)**, ours P12 / -46%; £300 would still be P38 / -25%. market: 15-17 Dec soft (-3.3 / -3.7 / +1.2) | **Against your decision: confirm or revert.** Revert = 15-17 Dec back to +5%: £680 x (1.05/0.97 - 1) x 0.544 = **£31** |
| b2 | **P12 12-20 Nov +5% min 2; 30 Nov-3 Dec +5% min 2; 7-13 Dec price removed, min 3** (NEW, 10 Nov 16:28Z) | None recorded; open plan a-p12-trim (not approved) | 17-20 Nov £262/£268/£274/£299; 30 Nov-3 Dec £1,116; 11-13 Dec £953 | comp-east: 17-19 / 18-20 Nov band **P73 / P89 (+22% / +24%)**; 30 Nov-3 Dec +9.6%; 11-14 Dec +18.2%; quality cap -0.15. market: 12-20 Nov above P75 on 5 of 6 nights while the market runs **5-18 pts below STLY**. Pace30 **-30.6%** | **Runs against the evidence: your call** (see a-p12-trim) |
| b3 | P04 9-24 Nov | -8% on 1-25 Nov (24 Oct) | **-4% min 3** on the lower base | Your -8% on 220 = about 202; now -4% on 200 = 192 | Confirm. Reverting A restores your November level |
| b4 | P13 12 Nov (only night left of 9-12 Nov) | 0% on 8-12 Nov (24 Oct) | **-5%** | comp-west: past except 12 Nov | Confirm or revert: £182 x 0.0526 x 0.800 = **£8** |
| b5 | P05 29 Nov-2 Dec | Not covered | **-5% min 3** | comp-central 29 Nov-3 Dec P0 / -30%; `recommend` +25% | Confirm or revert: £2,024 x 0.0526 x 0.765 x 0.733 = **£60** |
| b6 | P05 21 / 29 Dec | Not covered | **+300% min 1** (£2,230 / £2,786) | Soft blocks (a-p05-dec) | Confirm intent |
| b7 | **P20 16-17 Nov and 22-24 Nov min 2** (8 Nov) | Min 3 from 25 Oct to 30 Nov | as shown | channel §6, pricelabs C2 | Confirm min 2 or revert to min 3 |
| b8 | P20 base | 350 (24 Oct) | **330** | comp-west / pricelabs M4 (+32.0% vs P50) | Confirm 350 or record 330. Also record P13 base 250 |
| b9 | P06 9-17 Nov | Intentional block; 15-21 Nov opening not confirmed | **-8% min 2** | comp-central: P0 on every open stay (-12% to -23%); `recommend` 30d +10% | See t-p06-1521open / t-p06-open |

**If you revert to your recorded decisions:** P04 £113 + P11 £31 + P05 £60 + P13 £8 = **£212** (upper bound). P14 back to 500: £0 measurable (0% booked).

## Base review

`base_price` unchanged on every listing since 10 Nov. Base vs market from pricelabs M4 (10 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% of non-blocked nights to the 20 Dec handback; 0 open nights | **Hold; off the agenda.** 18-20 Dec is a block question (t-p01-1820block), not a base question |
| P04 | **200 (was 220)** / 221 | 46.7% vs 24%; November -30% to -38% vs comps; December consistent; qp -0.15; base +14.9% vs P50 | **Conflict for you: confirm 200 or revert to 220.** I recommend reverting (November) |
| P05 | 550 / 537 | 73.3% vs 43%; open December P25 vs comps (-34% to -44%); qp +0.15; `recommend` +25%; base -3.8% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 63.6% of 11 non-blocked vs 49%; base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 93.3% vs 38% to the handback | **Hold** |
| P11 | 286 / 281 | 55.6% vs 49% (ex block); comps P8-P16 (-22% to -48%); `recommend` +5% (30d) / +10% (60d); base -0.7% vs P50 | **Hold 286.** Levers are the unpushed refresh, Reyhan's -3% (b1) and the Booking.com stack |
| P12 | 284 / 284 | 50.0% vs 42%; **pace30 -30.6%** (-11 n / -£1,328.14); to handback -39.0%; band P33-P100; base +39.2% vs P50 | **Hold 284; correct open nights with date overrides** (a-p12-trim). Handback 13 Dec |
| P13 | 250 / 239 | 80.0% vs 43% (+37 pts) | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 (was 500) | 0% vs 46% | **Numbers only** (special setup); min change in A |
| P20 | 330 (your 350) / 351 | 60.7% vs 38% (30d), 46.6% vs 30% (60d); 0 reviews; base +32.0% vs P50 | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 10 Nov

### Overnight bookings and cancellations (reservations.csv full-row diff; channel, occupancy)
- **NEW P11 Booking.com 8-15 Dec** (162798595, 7 n, 2 adults, booked 10 Nov, 28 d out): room **£1,012.86** (ADR £144.69), cleaning £149, commission **£209.13 = 18.00%** of £1,161.86 (booster, expected), of which £26.82 on cleaning. Fills 8-14 Dec; no orphans (5-7 Dec checks out 8 Dec; 15-18 Dec is a 4-night run at min 3).
- **CANCELLED P20 Airbnb 21-25 Nov** (162781746, £638.54) at 11 Nov 04:37:07 Smoobu time, 10 days out (P20 is on the Flexible-cancellation test, so it would be free). 20-24 Nov now open: £234 / £301 / £247 / £294 / £279 (min 3/3/2/2/2) = £1,355. Airbnb sells 20-25 Nov at £1,036.56 room and 21-24 Nov at £644.12 (both 0.765 of Smoobu).
- **CANCELLED P01 Airbnb 18-21 Dec** (160573351, £720.90, booked 19 Oct) at 10 Nov 14:40:51. At 14:41:27 the gap block 160657036 was extended from 30 Nov-18 Dec to **30 Nov-21 Dec**. Policy's gap block is 30 Nov-17 Dec and the handback is after 20 Dec.

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+15 n / +£4,901.66** (was +11 / +£4,609.70) | + P11 8-15 Dec, - P01 18-21 Dec |
| Raised, including P06 18-22 Nov | **+19 n / +£5,758.45** (made 23 / 83 n / £18,700.51; cancelled 11 / 64 n / £12,942.06) | P06 nights reopened 5 Nov |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 (was +48 / +£8,278.58) | The change is the P20 cancellation |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 (unchanged) | |
| P04 | +46 n / +£1,625.79 (unchanged) | |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:**
  - **P01 0 n / £0** (was +3 / +£720.90): its whole gain was the 18-21 Dec stay, now cancelled.
  - P05 +12 / +£4,915.21 (unchanged; the largest).
  - P06 +10 / +£2,202.56 (unchanged; includes +4 / +£856.79 reopened).
  - P09 -3 / -£244.70 (unchanged).
  - **P11 -4 / -£1,342.41** (was -11 / -£2,355.27). The 8-15 Dec stay counts (+7 / +£1,012.86, made at base 286), **but it sold at 0.578x the PriceLabs price**: the night count credits the rise, the rate does not.
  - P12 +4 / +£227.79 (unchanged).
- **Reading:** up on the night count, but the gain is one stay sold at about half its list. **Hold the bases.** P11's problem is the Booking.com stack and the PriceLabs level under it, not the base.
- **Caveat:** the rise cannot be separated from the markup cut, Booking.com promotions (including the 15% portfolio deal from 6 Nov), Reyhan's overrides and the P06 block change. n = 1-8 bookings per flat.

### Per property
| Ref | Change since 10 Nov |
|---|---|
| P01 | 18-21 Dec cancelled; block extended to 21 Dec 36 s later (who: UNKNOWN). 0 open nights to the 20 Dec handback. 18-20 Dec model £806 (NL P53; comps £324-342 all-in, parity supported). Base-rise effect now 0. Pushed 11 Nov 04:47Z. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy last push 24 Feb (260 days). |
| P04 | No edit since 9 Nov. Base 200 (Reyhan). November 18-24 Nov £139-150, -30% to -38% vs comps (NL P28); December NL P60. 12-13 Nov becomes a 2-night orphan after tonight (policy min 3: no proposal). **1455 still bookable (day 12).** Weekly 18.0% (£66.53 over policy on 6-19 Dec). Gap n30 £536. Fwd30 46.7% vs 24%. |
| P05 | No edit. 21 Dec **£2,230** / 29 Dec **£2,786** (+300% min 1). 7-8 Dec £923 (was £947), P25 / -44%. 13-14 Dec £1,023, P25 / -34%. Visible 12% early booking and 10% long-stay (5+ n) still on. Fwd30 73.3% vs 43%. |
| P06 | 10 Nov passed unsold; **11 Nov tonight is a 1-night gap at min 2 (£200)**. 15-17 Nov £237-244, P0 / -12% to -23%; two more comps sold mid-Nov stays overnight. Class moved Soft -> Unclassifiable (63.6% of 11). |
| P08 | Booked to the 13 Nov handback. |
| P09 | **12 Nov (tomorrow) still unsellable**: £120, min 2, `unbookable` 1; 11 Nov block 162726554 (created 7 Nov 18:37, owner unknown). Comps 1-night £183-184.50; at min 1 we would be +11% to +19% vs band. Pushed 11 Nov 07:21Z. |
| P10 | Booked to the 18 Nov handback. |
| P11 | **New Booking.com 8-15 Dec at 0.5267 of Standard.** Darts 13-14 Dec sold £126.94 / £113.24. **16:28Z refresh not pushed: 20 nights £325 under PriceLabs** (29 Nov-4 Dec -£161). 11-13 Nov still blocked. All open stays **-22% to -48% vs comps**. Fwd30 55.6% (was 46.2%); 60d 54.4%. |
| P12 | **Reyhan 10 Nov 16:28Z: 12-20 Nov +5%, 30 Nov-3 Dec +5%, 7-13 Dec price removed (min 3).** 17-20 Nov now band P73-P89; 26 Nov £287 (P100); 11-13 Dec £953 (+18%). 7-10 Dec now inside range (P50, +3.9%). Pace30 **-30.6%**; to handback -39.0%. Pushed 16:30Z. |
| P13 | No edit, no booking. 10-26 Dec 17-night run at -2% min 3 (3064856 £3,807 / 3090701 £3,948); market +4.3 to +26.9 pts vs STLY. **New Airbnb "Special offer" -£101.92 on 3090701 (11-13 Nov).** 10 Dec 3064856 `price` 272 vs `user_price` 221 (looks like the replaced +40% still pushed; NOT EXPLAINED). Twins identical 10 Jan-28 Feb. Fwd30 80.0%. |
| P14 | Min 450 (Reyhan). 65 of 180 open nights at £450; P100 / +28% to +117%; 0% vs 46%. Numbers only. |
| P15-P19 | Not connected (t-unmapped). P17 comp 774061637963678253 (HTTP 410) replaced by 1582737718080351704. |
| P20 | **21-25 Nov cancelled; 20-24 Nov open (£1,355), not in PriceLabs yet** (last refresh/push 10 Nov 09:27:29Z). 20 Nov orphan gone; delivery conflict live. 22-24 Nov -5% min 2 (Reyhan 8 Nov). 5 Dec orphan £311 min 3. Fwd30 **60.7%** (was 75.0%). |

### Open plan items: status today
| Item | Status 11 Nov (evidence) |
|---|---|
| t-p09-1112block | **Not fixed; 12 Nov is tomorrow** (occupancy, comp-east, pricelabs C3) |
| t-p11-1013block | **Not fixed**; tonight lost (pricelabs C3) |
| t-p06-open | **Triggered:** 10 Nov unsold, so 11 Nov is a min-2 gap tonight |
| t-pl-push-fresh | **Not met in substance:** 0 listings over 24 h at 07:28Z, but **P11 refresh unpushed (£325)** and **P20 cancellation unregistered**; both due at 09:27Z (pricelabs C1, H1, M1) |
| t-p04-doublebook | **Not fixed, day 12** (channel §3; comp-east) |
| a-airbnb-rules | **Not fixed, day 13.** Cost restated **£2,363.11** (correction 4) |
| a-p13-record | Not done; **P12 10 Nov edits added** (table B b2) |
| a-discount-cut | **Not done.** £1,565 next 30 / £960 next 14 (pricelabs H3) |
| a-p05-dec | Open; DSOs unchanged |
| a-p12-trim | **Moved the other way** (Reyhan +5%) |
| a-peak-check | Not moved (comp-west, pricelabs H4) |
| t-p12-26nov-price | Not fixed (£287, P100) |
| t-p13-twins | **Open for 10 Jan-28 Feb** (correction 8) |
| t-p20-5dec-orphan | Not fixed (£311, min 3) |
| t-p20-delivery | **Changed:** 20 Nov orphan gone; 20-22 Nov open and bookable over the policy delivery dates |
| t-p05-1521-live | Unchanged (Airbnb confirmation NOT CHECKED) |
| t-channel-gaps | Not fixed: 3 Jan £174 (unpushed £183) vs at least £204; 23 Dec hold |
| a-bcom-cancel | No new cancellation: 6 of 20 post-cut bookings cancelled (30%) |
| t-cleaning-commission | +£26.82 (P11 8-15 Dec) |
| t-p04-weekly, t-p13-los5, t-p05-los, a-p05-earlybird | Unchanged (channel §4) |
| Others | Unchanged; numbers refreshed in the JSON |

Nothing on the dashboard is fixed by today's data, so **no item is closed today.**

## Actions - 2026-11-11

**Ranking:** time-bound rows first (tonight, tomorrow, today's sync), then critical rows and your confirmations, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). On Airbnb-only or Airbnb-majority flats (P05, P06, P20, P01) the price is first multiplied by the observed Airbnb factor (channel §4): 0.765 up to 28 d, 0.900 at 29-59 d, 0.850 same-day. Upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.636 (ex-blocks), P09 0.933, P11 0.556, P12 0.500, P13 0.800, P20 0.607.
- Booked share, next 60: P05 0.700, P11 0.544, P12 0.455 (to handback), P13 0.517, P20 0.466.

**Bounds** (`kpi_pack` settings, 11 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P09 | **t-p09-1112block (12 Nov is TOMORROW).** DSO **12 Nov min 2 -> 1**, keep £120. Or, if the 11 Nov block (162726554) is not intended, delete it so a 2-night stay from tonight fits. Last nights before the 26 Nov handback. | PriceLabs 3318172 > DSO 12 Nov; Smoobu > Calendar > Torrent Lodge > 11 Nov | occupancy orphan table (£120, min 2); pricelabs C3 (`unbookable` 1); comp-east: 1-night band £183 (n = 5), we would be +11-19% at min 1 (supported); channel: Airbnb does not offer 12 Nov | £120 x 0.933 = **£112** (11 Nov price NOT CHECKED, so the unblock option is not quantified) | Corentin (ask Reyhan about the block) | 2026-11-11 |
| 2 | P06 | **t-p06-open (tonight).** DSO **11 Nov min 2 -> 1**, keep £200 (= min). The earlier +5% ask on 11 Nov lapses tonight. | PriceLabs 3288517 > DSO 11 Nov | occupancy / pricelabs H5: 10 Nov unsold, 12-15 Nov booked; comp-central: unsellable at min 2, no comp offers 1 night | £200 x 0.850 x 0.636 = **£108** | Corentin | 2026-11-11 |
| 3 | P11 | **t-p11-1013block.** Who placed Smoobu "Blocked channel" **162775668 (10-14 Nov)**, and why? If unintended, delete it so **12-13 Nov** sell (£195 / £243). Tonight is lost. | Smoobu > Calendar > Camden > 11-13 Nov | pricelabs C3; occupancy (reason NOT KNOWN); comp-central | (£195 + £243) x 0.556 = **£244** | Corentin (ask Reyhan) | 2026-11-11 |
| 4 | P11 P20 | **t-pl-push-fresh.** **Sync Now on P11 3064196** (16:28:54Z refresh never pushed; confirm Smoobu 29 Nov = £241). **Sync Now on P20 3547481**, then confirm 21-24 Nov show open and 20 Nov loses `unbookable`. Check both after the 09:27Z group. | PriceLabs > 3064196 / 3547481 > Sync Now | pricelabs C1: 20 nights £9-35 under, **£325**; kpi_pack `sync_issues` P11 = 20 dates; H1: P20 21-24 Nov still Booked, last push 10 Nov 09:27:29Z | P11: £325 x 0.544 = **£177**. P20: not quantified (PriceLabs will reprice 20-24 Nov) | Corentin | 2026-11-11 |
| 5 | P04 | **t-p04-doublebook (critical, day 12).** On 1455876748739910219, **block every open night** or snooze the listing; then map it to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §3: 11-14 Nov £578.20, 18-21 Nov £525.80, 6-19 Dec £2,275.22 bookable; comp-east: bookable on all 11 P04 runs (18-25 Nov £1,203, 6-13 Dec £1,291) | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-11 |
| 6 | P11 | **NEW a-p11-bcom-stack (critical; within "keep Booking.com discounts").** 8-15 Dec sold at **0.5267 x Standard** (Weekly 0.85 x Last Minute 0.85 x Mobile 0.9 x Genius 0.9 x unnamed 0.9). Four decisions, no discount removed: **(a) Last Minute "Portfolio deal" 15% (created 6 Nov, 0-28 d, stays to 6 Feb) vs your 10% within 30 days (24 Oct): confirm 15% (and record) or revert to 10%.** **(b) Fifth 10%:** open Rates > Weekly plan > Occupancy pricing (2 adults on this stay) and Promotions > Genius > dynamic; tell us which applied (NOT CHECKED). **(c) Genius dynamic Yes/No:** your call (Level 1 10% stays). **(d) Option, stacking scope:** untick Weekly and Monthly in the Last Minute and Mobile deals so they apply to Standard only; every discount stays. | Booking.com extranet (Camden 1547304401) > Promotions; Rates > Weekly plan | channel §1 (5 visible nights match to the penny; sum = £1,012.86 exact); comp-central: **£165.98/n all-in = P0 / -56% vs median £376.36**, 32% below the cheapest comp; pricelabs H2: about 82% of the gap is Booking.com-side. **Correction: the Dispatcher's £1,471 is not reachable** (Standard + LM 10% + Mobile + Genius = 0.729 becomes the cheapest plan) | Per comparable 7-night Weekly stay: (a) **+£59.57**; (b)/(c) +£112.54; (a)+(b) +£178.73; (d) **+£311 to +£389** room (+£255 to +£319 net of 18%). Forward volume not quantified | Corentin | 2026-11-12 |
| 7 | Portfolio (Booking.com flats P04 P11 P12 P13 P20) | **NEW t-bcom-markup-110.** Open Smoobu Booking.com price settings: is the global markup **+15%** (policy 24 Oct) or +10%? If +10%, set +15% and run a full resync. | Smoobu > Channel Manager > Booking.com > price settings | channel §1 / pricelabs H2: all 13 Camden Standard nights (2-4, 8-14, 15-17 Dec) = ceil(Smoobu x 1.10); earlier bookings fitted x 1.15 | **+£45.81** on the P11 stay; about 4.3% of Booking.com list portfolio-wide if confirmed (not quantified) | Corentin | 2026-11-12 |
| 8 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 13).** Remove the hidden rules: nights 1-28 d (0.765), 29-59 d (0.900), same-day (0.850). Keep only visible discounts (policy `airbnb_visible_discounts`); then confirm P20's own last-minute 15% is the only rule left on 1791529331262420081. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §4: 20 live searches 07:22-07:24Z, same factors on every synced flat (e.g. P12 7-10 Dec £631.88 = 0.765 x £826; P20 14-17 Dec 0.900) | **Realised cost £2,363.11** (confirmed stays; P20 -£196.16 memo only). Forward: 23.5% on every Airbnb night sold up to 28 d out (not quantified) | Corentin | 2026-11-12 |
| 9 | P04 P14 P05 P11 P12 P13 P20 P06 | **a-p13-record: confirm or revert Reyhan's 9-10 Nov changes** (tables A and B). Recommended: **P04 base 200 -> 220**; **P14 min** confirm 450 or revert 500; **P05 max** confirm or revert 2,500; **P11 13-18 Dec -3% -> +5%** (darts); **P12 10 Nov +5%** (your call, a-p12-trim); **P13 12 Nov -5%** confirm or revert 0%; **P05 29 Nov-2 Dec -5%** confirm or revert 0%; **P20 min 2 on 16-17 / 22-24 Nov** confirm or revert min 3; P20 base 350 vs 330. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3267077, 3166592, 3064196, 2699998, 3064856 (+3090701), 3547481; `policy.json` | pricelabs C2 + logs; comp-east (P04 November -30% to -38%; P12 band P73-P89); comp-central (darts median £394-£398); market §2 | If reverted: P04 £113 + P11 £31 + P05 £60 + P13 £8 = **£212** (upper bound). P14: £0 measurable | Corentin | 2026-11-12 |
| 10 | P01 | **NEW t-p01-1820block (confirm).** Was extending gap block 160657036 to 21 Dec (10 Nov 14:41:27, 36 s after the cancellation) intended? Policy: gap block 30 Nov-17 Dec, handback after 20 Dec, "before the date, maximise revenue normally". **If not intended:** shorten the block to end 18 Dec so **18-20 Dec** sell at today's PriceLabs £284 / £279 / £243, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point > block 160657036 | occupancy; pricelabs M3; comp-east Priority 3: £318/n all-in = P29 / -2% vs median £324.33 (n = 7), **parity supported**; market: P50 £710 / P75 £951, +3.5 / +3.5 / -4.9 | £806 x 0.900 = **£725** (upper bound; P01 has sold 100% of its non-blocked nights) | Corentin | 2026-11-12 |
| 11 | P20 | **t-p20-delivery (back to you).** Smoobu blocks 18-19 Nov; policy says delivery 20-22 Nov; **20, 21 and 22 Nov are now open and bookable on Airbnb** (20-25 Nov £1,036.56 room). Confirm the delivery moved to 18-19 Nov (then update policy), or block 20-22 Nov. **Only if 20-22 Nov stay on sale:** after the Sync (row 4), DSO **22-24 Nov -5% -> 0%** (Reyhan's 8 Nov, not your -5% range) and price 20 Nov like 21 Nov (comp-west). | Smoobu > Calendar > Waterford; PriceLabs 3547481 > DSO 20, 22-24 Nov; `policy.json` | occupancy; channel §2, §6; comp-west: 21-25 Nov P11 / -9.7% (n = 9), 22-24 Nov at 0% = about £260/n, P22, supported; 20-25 Nov P0 / -21% (20 Nov still priced as an orphan) | 22-24 Nov: £820 x 0.0526 x 0.765 x 0.607 = **£20**; 20 Nov not quantified (PriceLabs reprice pending) | Corentin | 2026-11-12 |
| 12 | P04 P05 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P04, P05, P11 and P20. Live: P11 occupancy Aggressive (16-30 d: -20% to +10%), Recency default 5-15%, LM 0%; P05 LM 1%, Aggressive, Recency default; P20 LM 0%, Aggressive, Recency default; P04 LM -5% over 15 d, Aggressive, Recency default. **P12, P13, P09 excluded** (net negative gaps). | PriceLabs 3562176 / 3166592 / 3064196 / 3547481 > Customizations | pricelabs H3, n30: P04 £536 (-18.1%), P11 £500 (£661 on Smoobu prices), P05 £413, P20 £303; total **£1,565 / £960** next 14 | 536 x 0.467 + 413 x 0.765 x 0.733 + 500 x 0.556 + 303 x 0.765 x 0.607 = **£901 / 30 days** (upper bound) | Corentin | 2026-11-12 |
| 13 | P05 | **a-p05-dec.** **21 and 29 Dec (Reyhan +300% min 1): confirm whether they are meant to be blocked** (then block in Smoobu). If meant to sell (your call: lowers a price): **21 Dec -> fixed about £940** (supported £796-1,087 room) and **29 Dec +300% -> 0%** (default £1,148). **7-8 Dec DSO +3% -> about +29%** (£471 / £452 -> about £589 / £565) and **13-14 Dec +5% -> about +31%** (£518 / £505 -> about £648 / £631), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 21 Dec +116% vs £1,020 (n = 3, 20-22 Dec), +85% vs NL P90; 29 Dec n = 0; 7-8 Dec P25 / -44% (n = 4); 13-14 Dec P25 / -34%; `recommend(0.733, 0.43, 0.08, 0.15)` = +25%. market: 7-8 Dec +£235 to P75 (occ +5.0 / +1.0); 13-14 Dec +11.4 / +4.3 | 21 Dec £940 x 0.900 x 0.700 = £592; 7-8 Dec £231 x 0.765 x 0.733 = £130; 13-14 Dec £256 x 0.900 x 0.700 = £161: **£883** (upper bound). 29 Dec not quantified | Corentin | 2026-11-12 |
| 14 | P20 | **t-p20-5dec-orphan.** DSO **5 Dec min 3 -> 1**, keep £311. Outside policy's min-3 window (ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | occupancy; pricelabs H4 (`unbookable` 1); comp-west: £311 above market P75 £299, under the only 1-night comp £567 (n = 1); market Jingle Bell Ball +4.4 | £311 x 0.900 x 0.607 = **£170** | Corentin | 2026-11-12 |
| 15 | P13 | **a-peak-check (P13).** Both twins: DSO **10-12 Dec -2% -> +5%**; **18-26 Dec -2% -> 0%**; **hold 13-17 Dec at -2%**. Also check why 3064856 10 Dec pushes **272 vs user_price 221** (looks like the replaced +40%). Override of `recommend` +10%: 3064856 qp -0.15 and the kept Christmas comps at our level. 25-26 Dec min 3 stays (17-night run). | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 10-13 Dec P33 / -16.3%, P24 wider (n = 25), +5% supported, +10% would put 3064856 +12% over its line; 14-17 Dec P71-P86 (hold); 20-27 Dec wider P7-P20, PL 6-19% under market P50. market: +4.3 to +26.9 pts on all 17 nights | 17-night average £224 (£3,807 / 17): 3 n x £224 x 0.0714 + 9 n x £224 x 0.0204 = £89 x 0.517 = **£46** | Corentin | 2026-11-12 |
| 16 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it and set 15-17 Nov **-8% -> +1%** (= +10% on £237 / £238 / £244). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov P0 / -12%, 16-18 Nov P0 / -23%; 673753763892997438 and 1273781636585601427 sold overnight; `recommend(0.636, 0.49, 0.00, -0.016)` = +10% | If confirmed: £719 x 0.10 x 0.765 x 0.636 = **£35** | Corentin | 2026-11-12 |
| 17 | P13 | **NEW t-p13-special-offer.** Airbnb 3090701 shows a visible **"Special offer" -£101.92 on 11-13 Nov** (not there on 10 Nov). Policy: all manual Airbnb promotions removed 21 Oct. Remove it, or confirm it is yours. | Airbnb 1587576514709814818 > Calendar 11-12 Nov > Special offers | channel §4: £542.00 - £101.92 = £440.08 all-in (0.804 vs policy 0.900); pre-offer nightly 8.6% above Smoobu (unresolved) | **£34.82** vs policy on this stay | Corentin | 2026-11-11 |
| 18 | P11 | **t-channel-gaps.** **3 Jan >= £204** (now £174 live / £183 unpushed; fortnight £203). 23 Dec hold (£274 live; market -5.5). | PriceLabs 3064196 > DSO 3 Jan | market §2/§4: 3 Jan +4.2 vs STLY; comp-central 3-6 Jan P0 / -34% (median £282.50, n = 8) | £30 x 0.544 = **£16** | Corentin | 2026-11-12 |
| 19 | P12 | **a-p12-trim (your call: lowers a price; reverses Reyhan's 10 Nov +5%).** DSO **17-20 Nov +5% -> about -14%** (£262-299 -> about £215-245); **30 Nov-3 Dec +5% -> about -6%** (£1,116 -> about £1,004); **11-13 Dec 0% -> about -15%** (£953 -> about £810). Hold 12-14 Nov and 7-10 Dec. **Min stay: 12 Dec 3 -> 2, 13 Dec 3 -> 1** so the last nights before the 14 Dec handback can sell. Override of `recommend` 30d hold (60d gives lower -7%). | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 1: 17-19 / 18-20 Nov band P73 / P89 (+22% / +24%), supported £185-218; 30 Nov-3 Dec +9.6%; 11-14 Dec +18.2%, supported £228-269; 7-10 Dec P50 (+3.9%, hold); qp -0.15. market: 12-20 Nov 5-18 pts below STLY. Pace30 -30.6% | Not quantified (a cut) | Corentin | 2026-11-12 |
| 20 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -8%**, keep min 1 (£287 -> about £235; uncustomized £256). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £345 all-in, **P100 / +21.9%** (n = 4); supported room £200-235; NL P89 | Not quantified (a cut) | Corentin | 2026-11-12 |
| 21 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: £189.70 on 11-16 Jan | **£189.70** per 5-night stay | Corentin | 2026-11-13 |
| 22 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §4: £134.88 on 10-13 Jan | **£134.88** per such stay | Corentin | 2026-11-13 |
| 23 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: £102.06 / £103.32 on 10-15 Dec | **£102.06** per 5-night stay | Corentin | 2026-11-13 |
| 24 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §4: £399.16 = 18.0% of £2,217.60; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£66.53** per 6-19 Dec stay | Corentin | 2026-11-13 |
| 25 | P13 | **t-p13-twins (10 Jan-28 Feb).** Restore a gap: DSO **3090701 about +4%** on 10 Jan-28 Feb (child only; set it after any parent edit). | PriceLabs 3090701 > DSO | channel §4: 22 of 29 open January nights (10-31 Jan) and all 28 open February nights identical; comp-west: met to 9 Jan | Not quantified (duplicate-listing risk) | Corentin | 2026-11-13 |
| 26 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that 162753757 (£2,962.17, 15-21 Dec) is live. | Airbnb > Reservations | PriceLabs and Smoobu both show Booked; Smoobu type "modification of booking" | Not quantified (£2,962.17 at stake) | Corentin | 2026-11-13 |
| 27 | P12 P13 P11 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 6 post-cut Booking.com cancellations (P12 11-13 Dec 162688853, P13 11-15 Dec 162759785, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec). | Booking.com extranet > Reservations | channel §1: 6 of 20 cancelled (30%); confirmed 14 / 59 n / £9,515.85 | Not quantified | Corentin | 2026-11-13 |
| 28 | P11 P12 P13 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning (P11 £26.82 again on 8-15 Dec). Accept or challenge? | Booking.com extranet > Finance | channel §6 | £22.50-£30.00 per booking | Corentin | 2026-11-13 |

## Top 5 for today
1. **Tonight and tomorrow:** P09 12 Nov min 1 (£112); P06 11 Nov min 1 tonight (£108); P11 11-13 Nov block (12-13 Nov £244 if unintended); Sync Now on P11 (20 nights £325 under PriceLabs) and P20 (cancellation not registered).
2. **P11 Camden Booking.com 8-15 Dec sold at 0.5267 of Standard** (0.680 of PriceLabs after weekly, -£477.14; -56% vs comp median). Keeping every Booking.com discount: confirm or revert the 15% Last Minute portfolio deal vs your 10% (+£59.57); check the Smoobu markup (x 1.10 seen vs policy 1.15, +£45.81); identify the fifth 10% (2 adults: Weekly occupancy pricing likely, NOT CHECKED) and decide Genius dynamic (+£112.54). The stacking-scope option is worth +£311-£389 on such a stay; the earlier £1,471 estimate was wrong.
3. **Darts and Reyhan's edits:** 13-14 Dec sold at £126.94 / £113.24 vs your >£300; 15-17 Dec open at £201-£234 vs comp median £394-£398. Reyhan's -3% replaced your +5%: confirm or revert. Still live: P04 base 200 (November -30% to -38% vs comps; revert recommended), P14 min 450, P05 max 3,500 with 21/29 Dec +300%, and their 10 Nov P12 +5% (P12 pace -30.6%).
4. **Cancellations:** P01 18-21 Dec: block extended to 21 Dec 36 s later, so 18-20 Dec (£806, comp parity) did not reopen; confirm intent (P01 base-rise effect now 0). P20 21-25 Nov: 20-24 Nov open but not in PriceLabs; the delivery dates (policy 20-22 Nov vs Smoobu 18-19 Nov) are back with you; 5 Dec min 1 at £311 (£170).
5. **Barking 1455 day 12** (bookable on every open P04 run) and **hidden Airbnb layers day 13** (0.765 / 0.900 / 0.850; realised cost £2,363.11).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 at 60+ d; 0.850 on same-day stays (channel §4, day 13).
  - Target **1.00x before visible discounts by 2026-11-14** (row 8).
- **Booking.com since the 24 Oct markup cut** (channel §1):
  - Gross 20 bookings / 78 n / £13,772.36 at 0.782x PriceLabs. **Confirmed 14 / 59 n / £9,515.85 at 0.747x.** Net of all cancellations +34 n / +£4,464.48.
  - Pace 0.79 confirmed a day (about 0.33 before the cut); 30% cancelled (6 of 20). Target at least 1.0 a day and under 20% cancelled by 2026-11-18.
  - Promotions stay. The levers are the Camden stack scope (row 6), the markup check (row 7), the PriceLabs level under the promotions (row 12) and the cancellation reasons (row 27). Genius Potential Score 70/100 (your screenshot).
- **Net to owner per £100 PriceLabs** (channel §5): Booking.com P11 8-15 Dec **£47.38**; Booking.com since cut about £60-64; Airbnb at 0.765 £64.64. The model (Booking.com £97.75, Airbnb £84.50) is not what we realise. Booking.com as sold nets less than Airbnb.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 (15) vs 4.86; P13 3090701 4.7 (10) / 3064856 4.31 (13) vs 4.76; P06 4.58 (12) vs 4.62; P08 4.50 vs 4.87; P04 synced 4.11 (9) vs 4.85 (unsynced 1455 has 4.69 (26)); P05 4.77 (35) vs 4.26; P09 5.0 (3) vs 4.56; P01 4.75 (4) vs 4.8; P20 no reviews vs 4.8. Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12 cannot carry its +5%, why P04 December is at the top of its range, and why P13 Christmas is held to +5% / 0%.
  - Fixes: P12 pre-arrival key-collection message (the 6/10 review cited the key); P13 3064856 cleanliness and photo accuracy; review requests after P20's first stays and on P09; map Barking 1455 to keep its 26 reviews. Target P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P06:** cheapest of its comps (P0, -12% to -23%) yet unsold while comps sold mid-Nov stays overnight: conversion, not price. 2nd floor, no lift (5 of 12 comps have one).
  - **P11:** every open stay -22% to -48% vs comps, Booking.com CTR 0.81% vs 1.70% (policy). Basement with patio; 4 of 12 comps have a lift.
  - **P20:** 0 reviews; parking photo first; the cancellation came from a Flexible-policy stay.
- **Gap fill / length of stay.**
  - Unsellable orphans today: P09 12 Nov (row 1), P06 11 Nov (row 2), P20 5 Dec (row 14).
  - Single nights priced as soft blocks: P05 21 / 29 Dec (row 13).
  - Min-3 pins: P12 7-13 Dec blocks 12/13 Dec arrivals (row 19).
  - Short runs a gap-fill rule would sell: P13 11-12 Nov, P12 12-13 Nov, P11 18-19 Nov and 23-25 Dec, P05 16-17 Nov, 7-8 Dec and 13-14 Dec (pricelabs H5).
  - Systemic fix: an orphan-gap rule (min 1 on 1-night gaps). The setting is PriceLabs > Customizations > Orphan day, not exposed by `get_customizations` (NOT CHECKED).
  - Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (policy: P20, P06, P05 since 24 Oct; compare after 14 days, due 7 Nov): today's P20 cancellation was free under Flexible. The 14-day comparison is NOT CHECKED; it is overdue.
- **Direct share.** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Website share: P01 13.3%, P10 3.1%; Direct: P02 3.2%, P09 1.5% (kpi_pack `booking_profile`). Target 5% by 2027-06-30.
- **Event compression** (market §4): **21 n / £456** missed on the same method (yesterday 26 / £478); bookable excluding darts R1 and the two unbookable P20 nights **16 n / £200**.
  - Two of the five nights that left the list are the P11 darts nights, which sold at a loss to the price, not because the price was fixed.
  - The market supports raises on P13 10-26 Dec (row 15), P05 7-8 / 13-14 Dec (row 13), P04 14-19 Dec (+£132 to P75; covered by reverting the base in row 9) and P11 3 Jan (row 18). P20 5 Dec is a min-stay problem (row 14).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **63.3%** (64.1% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£169.32** (£170.06) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£107.24** (£109.01) | £129 | 2026-12-18 |
| Revenue, last 30 | **£41,822.67** (247 n) | - | - |
| Booked next 30 (Smoobu) | **60.5%** (158/261) | each unit at least market + 10 pts (below: P11 55.6% vs 49%, P12 50.0% vs 42%) | 2026-11-13 |
| Booked next 60 | **50.5%** (224/444) | at least market + 10 pts (P12 45.5% vs 34% to handback) | 2026-11-17 |
| 7-day pickup, net | gross 12 bk / 57 n / £12,060.60; cancelled 7 / 31 n / £5,434.79; **net +26 n / +£6,625.81** | at least 10 bookings a week, net positive | 2026-11-12 |
| P12 pace30 vs STLY | **-30.6%** (-11 n / -£1,328.14); to handback -39.0% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+15 n / +£4,901.66 like-for-like**; +19 n / +£5,758.45 incl. P06 | positive and rising, at the raised rate | 2026-11-12 |
| Booking.com paid / PriceLabs (since cut) | **0.747x** (14 confirmed / 59 n / £9,515.85); 30% cancelled | median at least 0.80x; cancellations under 20% | 2026-11-18 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 13; realised cost **£2,363.11** | 1.00x before visible discounts | 2026-11-14 |
| PriceLabs-side gap | **£1,565 next 30; £960 next 14** | £0 apart from your own overrides | 2026-11-13 |
| Listings pushed more than 24 h late | **0 at 07:28Z**, but P11 refresh unpushed and P20 unsynced | 0, and every refresh pushed | 2026-11-11 |
| PriceLabs vs Smoobu mismatches | **20 prices (P11, £325)**; 1 status (P20 21-24 Nov) | 0 | 2026-11-11 |
| Unsellable orphan nights (next 60) | **3** (P09 12 Nov, P06 11 Nov, P20 5 Dec), plus P05 21 / 29 Dec at +300% | 0 | 2026-11-12 |
| Double-sellable Barking stays | **every open P04 night**, day 12 | 0 | 2026-11-11 |
| Missed compression | **21 n / £456**; bookable 16 n / £200 | under 10 nights | 2026-11-13 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-13; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who placed the P09 11 Nov (162726554) and P11 10-14 Nov (162775668) blocks, and who extended P01's block to 21 Dec:** UNKNOWN. Source: Smoobu booking history, or ask Reyhan.
2. **P11 fifth 10% layer** (Weekly occupancy pricing vs Genius dynamic), who created the 15% Last Minute portfolio deal, which flats it covers, and whether your 24 Oct 10% deal still exists: NOT CHECKED. Source: Booking.com extranet > Rates > Weekly plan; Promotions.
3. **Smoobu Booking.com markup** (+10% vs +15%): NOT CHECKED. Source: Smoobu > Channel Manager > Booking.com > price settings.
4. **P20 delivery dates** (policy 20-22 Nov vs Smoobu 18-19 Nov): you / operations.
5. **Why P11's 16:28:54Z refresh did not push:** UNKNOWN (push failure vs refresh-only trigger). Source: PriceLabs > 3064196 > sync log.
6. **P13 3090701 Special offer** (who created it; why the pre-offer nightly is 8.6% above Smoobu) and **3064856 10 Dec 272 vs 221:** NOT CHECKED. Source: Airbnb calendar; PriceLabs 3064856 > DSO 10 Dec.
7. **Airbnb price details** for 162753757 (P05) and 162719002; whether the P20 / P01 cancellations paid anything: NOT CHECKED. Source: Airbnb > Reservations.
8. **Smoobu Airbnb rule settings:** still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
9. **Booking.com displayed prices, comps and rank:** NOT CHECKED (AWS WAF challenge 07:25:39Z; not bypassed). Source: extranet screenshots.
10. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
11. **Flexible-cancellation test result** (due 7 Nov): NOT CHECKED. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days.
12. **Other:** Smoobu timestamp zone (UTC+1 inferred); P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; P02 Vrbo copy stale; events are search summaries (WebFetch ENOTFOUND on alexandrapalace.com, pdc.tv), with open date conflicts (darts R1 11 vs 14 Dec, R2 20 vs 22-23 Dec, Kahan, Kasabian, Bryson Tiller).

```json
{"scoreboard":{"note":"11 Nov 2026. Last 30 nights = 12 Oct-10 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:18Z, handback-aware); policy blocks, P01 30 Nov-20 Dec, P06 from 22 Nov, P20 18-19 Nov, P09 11 Nov and P11 11-13 Nov excluded. Pickup = bookings made 5-11 Nov net of cancellations. Base-rise like-for-like excludes P06 18-22 Nov. Airbnb ratios from 20 live searches 07:22-07:24Z (channel §4); realised Airbnb cost restated to confirmed stays only (P20 21-25 Nov cancelled). PriceLabs gap from pricelabs H3. Booking.com since cut from channel §1. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"63.3%"},{"label":"ADR last 30","value":"£169.32"},{"label":"RevPAR last 30","value":"£107.24"},{"label":"Revenue last 30","value":"£41,822.67"},{"label":"Nights last 30","value":"247"},{"label":"Booked next 30","value":"60.5% (158/261)"},{"label":"Booked next 60","value":"50.5% (224/444)"},{"label":"7-day pickup","value":"gross 12 bk / 57 n / £12,060.60; cancelled 7 / 31 n / £5,434.79; net +26 n / +£6,625.81"},{"label":"P12 pace30 vs STLY","value":"-30.6% (-11 n / -£1,328.14); to handback -39.0%"},{"label":"Raised flats net since 18 Oct","value":"+15 n / +£4,901.66 like-for-like; +19 n / +£5,758.45 incl. P06; P01 0, P11 -4 / -£1,342.41 (8-15 Dec counted but sold at 0.578x PriceLabs)"},{"label":"Booking.com since markup cut","value":"14 confirmed, 59 n, £9,515.85; 0.747x PriceLabs; gross 20 / 78 n / £13,772.36; 6 of 20 cancelled (30%)"},{"label":"P11 8-15 Dec Booking.com","value":"£1,012.86 room = 0.5267x Standard, 0.680x PriceLabs after weekly (-£477.14); -56% vs comp median"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x at 60+ d; 0.850x same-day; day 13; realised cost £2,363.11 (confirmed stays)"},{"label":"PriceLabs-side gap","value":"£1,565 next 30; £960 next 14"},{"label":"PriceLabs vs Smoobu mismatches","value":"20 P11 nights £325 under PriceLabs (refresh not pushed); P20 21-24 Nov still Booked in PriceLabs"},{"label":"Unsellable orphans","value":"3 nights: P09 12 Nov, P06 11 Nov, P20 5 Dec; plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 12"},{"label":"Missed compression","value":"21 n / £456; bookable 16 n / £200"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p09-1112block","status":"open","prop":"P09","priority":"critical","title":"Not fixed; 12 Nov is TOMORROW: £120, min 2, unbookable 1 between the 11 Nov block 162726554 (owner unknown) and the 13 Nov arrival; DSO 12 Nov min 1 keep £120 (comps 1-night £183, +11-19% at min 1, supported), or delete the 11 Nov block if unintended","gbp":112},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"high","title":"Triggered: 10 Nov unsold, so 11 Nov (tonight) is a 1-night gap at min 2 (£200): DSO 11 Nov min 1; the +5% ask on 11 Nov lapses tonight","gbp":108},
{"id":"t-p11-1013block","status":"open","prop":"P11","priority":"high","title":"Not fixed: Smoobu 'Blocked channel' 162775668 (10-14 Nov, created 9 Nov 18:37, reason unknown); tonight lost; if unintended delete so 12-13 Nov sell (£195 / £243)","gbp":244},
{"id":"t-pl-push-fresh","status":"open","prop":"P11 P20 P06 P12 P13 P08 P09 P04","priority":"high","title":"Not met in substance: P11 16:28:54Z refresh not pushed (20 open nights £325 under PriceLabs, last push 10 Nov 09:27:10Z); P20 21-25 Nov cancellation not in PriceLabs (21-24 Nov Booked, 20 Nov unbookable); Sync Now on 3064196 and 3547481, then confirm Smoobu 29 Nov = £241 and P20 20-24 Nov repriced","gbp":177},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 12): unsynced Barking Airbnb 1455876748739910219 bookable on every open P04 run (11-14 Nov £578.20, 18-21 Nov £525.80, 18-25 Nov £1,203, 6-19 Dec £2,275.22); block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"critical","title":"New: P11 Booking.com 8-15 Dec (2 adults) sold at 0.5267x Standard (£1,012.86; 0.680x PriceLabs after weekly, -£477.14; -56% vs comp median). Keeping all discounts: confirm or revert Last Minute 15% portfolio deal (6 Nov) vs policy 10% (+£59.57); identify fifth 10% (Weekly occupancy pricing likely, NOT CHECKED) and decide Genius dynamic (+£112.54); option: Last Minute and Mobile off the Weekly/Monthly plans (+£311-389; Dispatcher's £1,471 was wrong)","gbp":311},
{"id":"t-bcom-markup-110","status":"open","prop":"P04 P11 P12 P13 P20","priority":"high","title":"New: Camden Booking.com Standard = ceil(Smoobu x 1.10) on all 13 screenshot nights vs policy +15%; check Smoobu > Channel Manager > Booking.com price settings, set +15% and full resync if needed (+£45.81 on P11 8-15 Dec; about 4.3% of Booking.com list portfolio-wide)","gbp":45.81},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 13, unchanged: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d) / 0.850 same-day; realised cost restated to £2,363.11 on confirmed stays (P20 21-25 Nov -£196.16 cancelled, memo only); P09 excluded (deprioritised)","gbp":2363.11},
{"id":"a-p13-record","status":"open","prop":"P04 P14 P05 P11 P12 P13 P20 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9-10 Nov changes: P04 base 200 (Nov -30% to -38% vs comps; revert recommended, £113), P14 min 450 (special setup conflict), P05 max 3500 + 21/29 Dec +300%; P11 13-18 Dec -3% replaced darts +5% (13-14 Dec sold £126.94/£113.24; revert £31); NEW P12 10 Nov +5% 12-20 Nov / 30 Nov-3 Dec and 7-13 Dec price removed; P13 12 Nov -5%; P05 29 Nov-2 Dec -5%; P20 min 2 16-17 / 22-24 Nov; P20 base 330 vs 350; record P13 base 250","gbp":212},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"New: P01 Airbnb 18-21 Dec (£720.90) cancelled 10 Nov 14:40:51 and gap block 160657036 extended to 21 Dec 36 s later, so 18-20 Dec (£284/£279/£243, min 3) did not reopen before the 20 Dec handback; confirm intent; if not, end the block 18 Dec (comp parity supported, £318/n vs median £324.33)","gbp":725},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Back to Corentin: 21-25 Nov cancelled, 20 Nov orphan gone, but 20-22 Nov (policy delivery dates) now open and bookable on Airbnb while Smoobu blocks 18-19 Nov; confirm delivery moved (update policy) or block 20-22 Nov; if on sale, after sync 22-24 Nov -5% -> 0% (about £260/n, supported) and 20 Nov priced like 21 Nov; 16-17 / 22-24 Nov min 2 vs policy min 3","gbp":20},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,565 next 30 / £960 next 14 (P04 £536 -18.1%, P11 £500, P05 £413, P20 £303; P12/P13/P09 negative); set Occupancy, Booking Recency and Last-minute to Custom 0% on P04, P05, P11, P20 (customizations read live 11 Nov)","gbp":901},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,230 / 29 Dec £2,786 at Reyhan's +300% min 1 act as soft blocks: confirm intent (block in Smoobu) or, your call, 21 Dec fixed about £940 (supported £796-1,087) and 29 Dec 0% (default £1,148); 7-8 Dec +3% -> about +29% (£923, P25 / -44%) and 13-14 Dec +5% -> about +31% (£1,023, P25 / -34%) per recommend +25%","gbp":883},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed: P20 5 Dec 1-night orphan, min 3 (Reyhan 1-20 Dec), unbookable at £311; DSO 5 Dec min 1, keep price (above P75 £299, under the only 1-night comp £567; policy min-3 window ends 30 Nov)","gbp":170},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Not moved: both twins 10-12 Dec -2% -> +5% (P33 kept / P24 wider, supported), 18-26 Dec -2% -> 0%, hold 13-17 Dec at -2% (P71-P86); +10% not supported (3064856 qp -0.15); market +4.3 to +26.9 pts all 17 nights; also check 3064856 10 Dec price 272 vs user_price 221 (replaced +40% still pushed?)","gbp":46},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; 15-17 Nov £237/£238/£244 at Reyhan's -8%, P0 -12% to -23%; two more comps sold mid-Nov overnight; recommend +10%; if confirmed record in policy and -8% -> +1%, else re-block","gbp":35},
{"id":"t-p13-special-offer","status":"open","prop":"P13","priority":"medium","title":"New: visible Airbnb 'Special offer' -£101.92 on 3090701 (1587576514709814818) 11-13 Nov, not there 10 Nov; policy says manual Airbnb promotions removed 21 Oct; remove or confirm (-£34.82 vs policy on this stay)","gbp":34.82},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 3 Jan £174 live (£183 unpushed) -> >= £204 (fortnight £203; P0 / -34% vs comps; market +4.2); 23 Dec £274 hold (market -5.5); Booking.com CTR 0.81% vs 1.70%","gbp":16},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Reversed by Reyhan 10 Nov 16:28Z (+5% on 12-20 Nov and 30 Nov-3 Dec; 7-13 Dec -5% removed): 17-20 Nov £262-299 band P73-P89 -> about -14% (supported £185-218); 30 Nov-3 Dec £1,116 -> about -6%; 11-13 Dec £953 (+18%) -> about -15%; hold 12-14 Nov and 7-10 Dec (P50); 12 Dec min 3->2, 13 Dec min 3->1; market 5-18 pts below STLY; lowers a price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £287 (£345 all-in, P100 +21.9%, n=4; uncustomized £256); DSO +15% -> about -8% (about £235, top of supported £200-235), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (£189.70 on 11-16 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":189.7},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (£134.88 on 10-13 Jan): not in policy - yours, or 0%?","gbp":134.88},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (£102.06 / £103.32 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":102.06},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (£66.53 over policy on 6-19 Dec)","gbp":66.53},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Met to 9 Jan (5-8 Jan +4.4%, December about 5% apart) but identical on 22 of 29 open January nights (10-31 Jan) and all 28 open February nights (Smoobu to 28 Feb); DSO 3090701 about +4% on 10 Jan-28 Feb, set on the child after any parent edit","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that 162753757 (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P13 P11 P04","priority":"medium","title":"No new cancellation: 6 of 20 post-cut Booking.com bookings cancelled (30%; P12 11-13 Dec 162688853, P13 11-15 Dec 162759785, P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec); send rate plans and reasons","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Grew: Booking.com commissions cleaning, +£26.82 on P11 8-15 Dec (running: P12 £22.50, P11 £26.82 x2, P13 £30.00 per booking): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"21-25 Nov booking cancelled (Flexible test listing); 20-25 Nov now P0 / -21% on Airbnb (20 Nov priced as orphan until sync); remaining: parking first photo, review requests (0 reviews); Flexible-test 14-day comparison overdue (due 7 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -30.6% (-11 n / -£1,328.14), to handback -39.0%; Reyhan's 10 Nov +5% runs the other way; correct open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov PriceLabs 3090701 £245 / 3064856 £322 (+50% min 1; Airbnb £338 / £397 all-in vs 1 comp £394; market +19.7 Finals Weekend); 17 Nov £203/£227 at +35% (P71 wider): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20 P06 P11","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P06 conversion gap (cheapest of comps, comps sold overnight); P11 basement vs 4 of 12 comps with lift","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (9 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 max 780 vs 3500); policy booking_markup_scope text says +20% vs booking_markup 0.15; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"P17 comp 774061637963678253 (HTTP 410) replaced by 1582737718080351704; 9 central comps absent on every stay (P06 2, P08 5, P14 1, P17 1; pages load); P04 1387112821878102742 kept (bookable 7-10 Jan); P01 1005647070760859698 back; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026 (260 days); keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P11","title":"P11 Booking.com 8-15 Dec (2 adults) = 0.5267x Standard (Weekly x LM 15% x Mobile x Genius x unnamed 10%); £1,012.86 vs £1,490 PriceLabs after weekly (-£477.14); realistic fix +£311-389, not the Dispatcher's £1,471","evidence":"channel §1 (5 visible nights to the penny; 7-night sum exact); pricelabs H2; comp-central P11 (P0 / -56% all-in)."},
{"agent":"channel","severity":"high","ref":"P11 Portfolio","title":"Camden Booking.com list = Smoobu x 1.10 on all 13 screenshot nights vs policy +15%; Last Minute 15% portfolio deal (6 Nov) vs policy 10% (24 Oct)","evidence":"channel §1; pricelabs H2; policy monitoring.booking_last_minute_24oct."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"Darts 13-14 Dec sold £126.94 / £113.24 room vs >£300 policy (P0 / -68% / -71%); 15-17 Dec open £201-234 vs median £397.67; Reyhan's -3% replaced the +5%","evidence":"comp-central darts table; occupancy darts section; pricelabs C2; market §2."},
{"agent":"pricelabs","severity":"critical","ref":"P11","title":"P11 16:28:54Z refresh not pushed: 20 open nights £325 under PriceLabs; last push 10 Nov 09:27:10Z","evidence":"pricelabs C1; kpi_pack sync_issues P11; channel §6."},
{"agent":"pricelabs","severity":"high","ref":"P20","title":"P20 21-25 Nov cancellation not in PriceLabs: 21-24 Nov Booked, 20 Nov unbookable; Smoobu sells 20-24 Nov at £1,355; delivery dates 20-22 Nov now open","evidence":"pricelabs H1; occupancy; channel §2; comp-west P20."},
{"agent":"occupancy","severity":"high","ref":"P01","title":"P01 18-21 Dec cancelled; gap block extended to 21 Dec 36 s later, so 18-20 Dec did not reopen before the 20 Dec handback; base-rise gain now 0","evidence":"occupancy overnight; pricelabs M3; comp-east Priority 3 (parity supported, £806)."},
{"agent":"occupancy","severity":"critical","ref":"P09 P06","title":"P09 12 Nov (tomorrow) and P06 11 Nov (tonight) are 1-night gaps at min 2","evidence":"occupancy orphan table; pricelabs C3/H5; comp-east P09; comp-central P06."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 bookable on every open P04 run, day 12","evidence":"channel §3; comp-east 1455 section."},
{"agent":"channel","severity":"critical","ref":"P20 P12 P13 P05 P06 P04","title":"Hidden Airbnb layers unchanged day 13; realised cost restated £2,363.11 after removing the cancelled P20 stay","evidence":"channel §2, §4."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"Reyhan's 10 Nov +5% puts 17-20 Nov at band P73-P89 (+22-24%) and 11-14 Dec +18%; pace30 -30.6%; market 5-18 pts below STLY","evidence":"comp-east Priority 1; pricelabs changes table; market §2; occupancy pace."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"After the base cut P04 November -30% to -38% vs comps (supported about +7-10%); December consistent with the cut","evidence":"comp-east Priority 2; market §2."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 10-12 Dec +5% supported (P33 / P24 wider); Christmas 20-26 Dec -2% -> 0%; hold 14-17 Dec; 3064856 10 Dec 272 vs user_price 221 unexplained","evidence":"comp-west P13; market §2 (+£381 at +10%)."},
{"agent":"channel","severity":"medium","ref":"P13","title":"New visible Airbnb Special offer -£101.92 on 3090701 11-13 Nov; twins identical 10-31 Jan and February","evidence":"channel §4 standing items."},
{"agent":"pricelabs","severity":"medium","ref":"P04 P05 P11 P20","title":"PriceLabs discount gap £1,565 next 30 / £960 next 14; P11, P05, P20 customizations read live (Aggressive occupancy, default Recency)","evidence":"pricelabs H3."},
{"agent":"market","severity":"medium","ref":"P13 P05 P04 P11 P20","title":"Missed compression 21 n / £456 (was 26 / £478); 2 of the 5 nights left because P11 darts sold at a loss to the price","evidence":"market §4."}
],
"top5":[
"Tonight and tomorrow: P09 12 Nov min 1 (£112); P06 11 Nov min 1 tonight (£108); P11 11-13 Nov block (12-13 Nov £244 if unintended); Sync Now on P11 (20 nights £325 under PriceLabs) and P20 (cancellation not registered).",
"P11 Camden Booking.com 8-15 Dec sold at 0.5267 of Standard (0.680 of PriceLabs after weekly, -£477.14; -56% vs comp median). Keeping every Booking.com discount: confirm or revert the 15% Last Minute portfolio deal vs your 10% (+£59.57); check the Smoobu markup (x1.10 seen vs 1.15, +£45.81); identify the fifth 10% (2 adults: Weekly occupancy pricing likely, NOT CHECKED) and decide Genius dynamic (+£112.54); stacking-scope option +£311-389 (the £1,471 estimate was wrong).",
"Darts and Reyhan's edits: 13-14 Dec sold at £126.94/£113.24 vs your >£300; 15-17 Dec open at £201-234 vs comp median £394-398; Reyhan's -3% replaced your +5%: confirm or revert. Still live: P04 base 200 (November -30% to -38% vs comps; revert recommended), P14 min 450, P05 max 3,500 with 21/29 Dec +300%, and the 10 Nov P12 +5% (pace -30.6%).",
"Cancellations: P01 18-21 Dec block extended to 21 Dec 36 s later, so 18-20 Dec (£806, comp parity) did not reopen: confirm intent (P01 base-rise effect now 0). P20 21-25 Nov: 20-24 Nov open but not in PriceLabs; delivery dates (policy 20-22 Nov vs Smoobu 18-19 Nov) back to you; 5 Dec min 1 at £311 (£170).",
"Barking 1455 day 12 (bookable on every open P04 run) and hidden Airbnb layers day 13 (0.765/0.900/0.850; realised cost £2,363.11)."
],
"per_property":[
{"ref":"P01","change":"Airbnb 18-21 Dec (£720.90) cancelled; gap block extended to 21 Dec 36 s later (who unknown), so 18-20 Dec (£806 model, comp parity) not reopened before the 20 Dec handback; base-rise effect now 0 n / £0 (was +3 / +£720.90); pushed 11 Nov 04:47Z."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb (260 days)."},
{"ref":"P03","change":"Intentional block; pushed 11 Nov 03:29Z via Channex."},
{"ref":"P04","change":"No edit since 9 Nov; base 200 (Reyhan, confirm or revert); November -30% to -38% vs comps (supported +7-10%), December consistent; 1455 still bookable (day 12); weekly 18% (£66.53); gap n30 £536; fwd30 46.7% vs 24%."},
{"ref":"P05","change":"No edit; 21 Dec £2,230 / 29 Dec £2,786 at +300% min 1 (soft blocks); 7-8 Dec £923 (P25 / -44%), 13-14 Dec £1,023 (P25 / -34%); visible 12% early booking and 10% LOS 5+ still on; base-rise +12 n / +£4,915.21 unchanged; fwd30 73.3% vs 43%."},
{"ref":"P06","change":"10 Nov passed unsold; 11 Nov tonight a min-2 gap (£200); 15-17 Nov £237-244 at P0 while two more comps sold; base-rise +10 n / +£2,202.56 unchanged; 63.6% of 11 non-blocked."},
{"ref":"P07","change":"Intentional block; pushed 11 Nov 03:59Z."},
{"ref":"P08","change":"Fully booked to the 13 Nov handback."},
{"ref":"P09","change":"12 Nov (tomorrow) still unsellable (£120, min 2) next to the 11 Nov block; pushed 11 Nov 07:21Z; base-rise -3 n / -£244.70 unchanged; fwd30 93.3%."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"New Booking.com 8-15 Dec £1,012.86 (0.5267x Standard, 0.680x PL after weekly, -56% vs comps); darts 13-14 Dec sold £126.94/£113.24 vs >£300; 15-17 Dec open £201-234 vs median £394-398; refresh not pushed (20 nights £325 under); 11-13 Nov still blocked; base-rise -4 n / -£1,342.41 (was -11 / -£2,355.27; 8-15 Dec counted but sold at 0.578x PriceLabs); fwd30 55.6% (was 46.2%)."},
{"ref":"P12","change":"Reyhan 10 Nov 16:28Z: 12-20 Nov +5%, 30 Nov-3 Dec +5%, 7-13 Dec price removed (min 3), reversing a-p12-trim; 17-20 Nov band P73-P89, 11-13 Dec +18%, 7-10 Dec now P50; pace30 -30.6% (-11 n / -£1,328.14), to handback -39.0%; base-rise +4 n / +£227.79 unchanged."},
{"ref":"P13","change":"No edit, no booking; 10-26 Dec still open at -2% min 3 (£3,807 / £3,948); +5% 10-12 Dec and Christmas 0% supported; new Airbnb Special offer -£101.92 on 3090701 11-13 Nov; 10 Dec 3064856 272 vs user 221 unexplained; twins identical 10 Jan-28 Feb; fwd30 80.0% vs 43%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 65 of 180 open nights at £450; P100 / +28% to +117%; 0% vs 46%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); comp 774061637963678253 (HTTP 410) replaced by 1582737718080351704."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"Airbnb 21-25 Nov (£638.54) cancelled; 20-24 Nov open in Smoobu (£1,355) but PriceLabs still shows Booked (last push 10 Nov 09:27Z); 20 Nov orphan gone; policy delivery dates 20-22 Nov now bookable (for Corentin); 5 Dec orphan £311 min 3; fwd30 60.7% (Smoobu; pack 69.0%)."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% of non-blocked nights booked to the 20 Dec handback; 18-20 Dec is a block question, not a base question (occupancy.md; comp-east)."},
{"ref":"P04","base":"200, was 220 (rec 221)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"Reyhan cut it 9 Nov; November -30% to -38% vs comps vs supported -15% (qp -0.15), supported move +7-10%; December consistent with the cut; 46.7% vs 24% (comp-east; pricelabs C2; market §2)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 43%; open December P25 (-34% to -44%); qp +0.15; recommend +25%; base -3.8% vs P50 (comp-central; pricelabs M4)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 7 of 11 non-blocked nights booked (63.6% vs 49%); base -11.9% vs P50 (pricelabs M4)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"93.3% vs 38% to the 26 Nov handback (occupancy.md)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"55.6% vs 49% ex block; open stays -22% to -48% vs comps; recommend +5% / +10%; levers are the unpushed refresh, Reyhan's -3% and the Booking.com stack, not the base (comp-central; pricelabs C1, H2)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"50.0% vs 42%; pace30 -30.6%; band P33-P100 with qp -0.15; base +39.2% vs P50; handback 13 Dec (comp-east; pricelabs M4; occupancy)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"80.0% vs 43% (+37 pts); open December at comp P33-P86 (comp-west)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 46%; P100 / +28% to +117% vs comps at £450 (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"60.7% vs 38% (30d), 46.6% vs 30% (60d) after the cancellation; 0 reviews; base +32.0% vs P50 (occupancy; comp-west; pricelabs M4)."}
]}
```

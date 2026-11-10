# Seeker Estates - Daily revenue report, 2026-11-10 (Tuesday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-10/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-10/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-09/daily-report.md` and its JSON, the dashboard action list (10 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/max come from `kpi_pack` `settings` (10 Nov). Three of them changed on 9 Nov: P04 base, P14 min, P05 max.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 15-21 Nov opening stays with you to confirm (t-p06-1521open). It is not a proposal.
- P14 is numbers only. **Reyhan's P14 minimum cut (500 -> 450) is reported as a conflict with your special setup.** I make no P14 proposal of my own.
- P13 is one flat (3064856 + 3090701). Bookings on either twin count once.
- Not raised again: Visibility Booster commission (P13's 20% on the cancelled 11-15 Dec stay is inside its booster window), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov, P13 1 Dec, P13 twin price order, the P09 Airbnb rules screen, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal touches a Booking.com promotion.
  - Four proposals lower a PriceLabs price: a-p12-trim, t-p12-26nov-price, and the P05 21 Dec reset inside a-p05-dec. Each is marked "your call", with the evidence.
  - Reyhan's 9 Nov edits (49 log entries) that cross your decisions are framed as **confirm or revert**. They are not re-proposed as new ideas.

## Corrections and conflicts resolved between sections

1. **P20 21-25 Nov: 0.650x, not 0.604x.**
   - comp-west divided the room price (£638.54) by the 9 Nov raw price (£1,058, refreshed 8 Nov). That gave 0.604x and an "unexplained 21%".
   - The last push before the 22:34 booking was at **9 Nov 21:26:36Z** (`listings.csv`). It pushed **£982** (266/219/250/247), which is also what Smoobu still shows today (channel §1, pricelabs H1, occupancy).
   - **I use 0.650 = 0.765 x 0.85.** The 0.85 is P20's Airbnb last-minute 15% (0-14 d), which policy recognises. The 0.765 is the hidden layer.
   - Against policy the stay is **-£196.16** (expected £834.70). comp-west's comp reading stands: P0, -29% vs a comp median of £279 (n = 9).
2. **P13 twins in January: both sections are right, for different windows.**
   - comp-west read the PriceLabs raw, which ends 9 Jan, plus Airbnb 5-8 Jan. It found the twins about 4-6% apart (5-8 Jan £209 vs £200.33).
   - channel read Smoobu to 9 Feb. It found **3-8 Jan different, but 9-31 Jan (23 nights) and all 9 open February nights identical**; the 10-13 Jan Airbnb cards are both £503.10.
   - **Resolution:** the policy rule is met to 8 Jan and **broken on 9 Jan-9 Feb (32 nights)**. t-p13-twins stays open for 9 Jan-9 Feb only. a-p13-twin (done) is not reopened.
3. **P13 11-15 Dec commission (20.0% of total).** comp-west wanted to ask about it, on the view that policy names the booster for Camden only. That is not right: policy `booking_promotions_p13_21oct.visibility_booster` covers P13 check-ins to 20 Dec. The rate is expected and the stay was cancelled anyway (no commission due). **Not flagged.**
4. **P13 Christmas sizing.**
   - market says +10% (+£375): we are under P50 on all 17 nights, +3.8 to +25.7 pts vs STLY.
   - comp-west says only remove the -2% (back to 0%) on 10-13 and 20-26 Dec, and hold 14-17 Dec. Its reasons: the 3 kept comps still open are at our price, comp 1761224847419174970 is cutting, and 3064856 (4.31, `quality_premium` -0.15) is already 14% above its quality line.
   - **I use comp-west's sizing.** It overrides `recommend` +10%, and the reason is the rating cap. So: **0% on 10-13 and 17-26 Dec, hold 14-16 Dec at -2%.** The 25-26 Dec min-2 ask is dropped: they now sit inside a 17-night run, so min 3 strands nothing (comp-west).
5. **P11 darts average.** pricelabs gives **£211.60 over 13-17 Dec** (5 nights, £1,058). comp-central gives £206.25 over the 4-night 13-17 Dec stay. I use the 5-night policy window: **£211.60 vs your "above £300"**.
6. **P04 base-cut size.** pricelabs: **-£253 on the 16 open nights to 10 Dec**, -£467 on 32 nights to 8 Jan. market: -£427 on 31 nights excluding 2 Dec. These are the same effect over different windows. **I use -£253 for next 30.**
7. **P12 13 Dec.** occupancy, channel, pricelabs and comp-east agree that it is no longer an orphan: the cancellation reopened 11-12 Dec, so 7-13 Dec is one 7-night run. Reyhan's 7-14 Dec min 3 (22:30:10Z), however, means **arrivals on 12 and 13 Dec cannot sell before the 14 Dec handback**.
8. **Push freshness.** No listing is over 24 h late (pricelabs H2). But most listings pushed only because Reyhan saved them, and **P20's 22:34 booking is still unregistered in PriceLabs**.
9. **18 Oct base rises.** Like-for-like **+11 n / +£4,609.70** (was +13 / +£5,123.51). Including the P06 reopened nights it is **+15 n / +£5,466.49** (was +17 / +£5,980.30). The whole change is the P12 11-13 Dec cancellation (-2 n / -£513.81). The P13 11-15 Dec booking was made and cancelled the same day, so it nets to zero in its own group.

## Executive summary

1. **Reyhan changed three settings on 9 Nov. Please confirm or revert each.**
   - **P04 base 220 -> 200** (21:26:45Z): -£253 over next 30. November is now **-34% to -48% vs comps** (quality-supported -15%); December is about -5%, which the evidence supports.
   - **P14 minimum 500 -> 450** (21:24:24Z): this conflicts with your special setup. -£1,388 over next 30.
   - **P05 maximum 2,500 -> 3,500** (14:08:54Z): it only matters for 29 Dec.
   - They come with **46 more date-override entries**, among them P11 darts **-3%** (average £211.60 vs your >£300).
2. **P05 21 Dec (£2,207) and 29 Dec (£2,855) work as soft blocks.** Reyhan set +300% with min 1 (14:08Z). 21 Dec is 3.2x its neighbours; supported is about **£796-1,087 room** (comp-central).
   - Confirm whether they are meant to be blocked. If not, set 21 Dec to about £940.
   - Raise 7-8 Dec and 13-14 Dec by +25% (`recommend`, P25).
   - Upper bound for the three: **£905**.
3. **New P20 Airbnb booking, 21-25 Nov: £638.54 = 0.650x the £982 on sale.**
   - That is **-£196.16 against policy** and brings the hidden-layer cost to **£2,559.27**.
   - It leaves **20 Nov as a min-3 orphan** (£259).
   - It **puts a guest in the flat on 21-22 Nov, which policy lists as delivery dates** (Smoobu blocks 18-19 Nov instead). Please confirm the delivery dates.
4. **Barking 1455, day 11.** It is still bookable on every open P04 run (10-13 Nov £557.40, 18-21 Nov £525.80, 6-19 Dec £2,275.22). Any booking there is a double booking.
5. **Two unexplained Smoobu blocks.**
   - **P09 11 Nov** (162726554) leaves **12 Nov, the day after tomorrow, unsellable** (£120, min 2).
   - **New: P11 10-13 Nov** (162775668, created 9 Nov 18:37) removes 4 nights, including tonight.
   - Who placed them, and why?

**Last 30 nights (11 Oct-9 Nov, 13 units):** occupancy **64.1%**, ADR **£170.06**, RevPAR **£109.01**, revenue **£42,514.05**, 250 nights (kpi_pack `portfolio_last30`, exact). Yesterday: 65.4% / £171.65 / £112.24 / £43,772.01 / 255 n.

**Next 30 (10 Nov-9 Dec):** **61.9%** booked (164/265; yesterday 59.5%). **Next 60 (10 Nov-8 Jan):** **51.1%** (231/452; yesterday 50.9%).
- Smoobu is the source of truth. The figures are handback-aware and exclude policy blocks, the P01 gap block, P20 18-19 Nov, P09 11 Nov and P11 10-13 Nov.
- If the P11 block were counted as open, next 30 would be 61.0% (164/269).

**7-day pickup (bookings made 4-10 Nov):**
- Gross: 11 bookings / 50 n / £11,047.74.
- Cancelled: 5 / 24 n / £4,075.35.
- **Net: +26 n / +£6,972.39** (yesterday +27 n / +£7,528.06).
- The change since yesterday: + the P20 21-25 Nov booking (£638.54), - the P12 11-13 Dec cancellation (£513.81), and P11 26-29 Nov leaving the 7-day window (£680.40).

## Reyhan's 9 Nov changes, for you to confirm or revert

**Source:** pricelabs `get_user_logs`, listing log. There are **49 entries, all by reyhan@, in two sessions: 14:06:06-14:10:56Z and 21:20:20-22:30:10Z.** The group and account logs have 0 entries. All of the changes are live in the pushed prices (raw 10 Nov = Smoobu 07:26Z). `policy.json` has no entry after 24 Oct.

### A. Settings (base / min / max)
| Ref | Change (time Z) | Your standing decision | Effect (source) | Evidence | My read |
|---|---|---|---|---|---|
| **P04** 3562176 | **Base 220 -> 200** (21:26:45, source "reviewPrices") | None recorded. Pack and `id_map` say 220; PriceLabs recommended base is 221 | **-£253 on the 16 open nights to 10 Dec** (£3,091 -> £2,838); -£467 to 8 Jan. Examples: 11-13 Nov £150/151/154 -> £139/140/144; 24 Nov £199 -> £148 (pricelabs; comp-east) | comp-east: **November -34% to -48% vs comps** (NL P30), against a quality-supported -15% (qp -0.15). **December -15% to +3.5%** (median about -5%, NL P59), which is supported. market: November soft (-0.8 to -5.0 vs STLY), December firm (+0.2 to +11.7). 14-19 Dec gap to P75 widened to +£135 | **Revert to 220.** The November evidence does not support the cut. December goes back to about parity, which is acceptable. Revert: +£253 x 0.467 = **£118** (upper bound) |
| **P14** 3267077 | **Min 500 -> 450** (21:24:24) | `special_setups.P14`: the "£500 minimum" is deliberate | 30 open nights 11 Nov-10 Dec go from £500 to £450: **-£1,388**; to 9 Jan -£1,981. Nights at the floor: 59 of 179 (pricelabs M1) | 0% booked vs 46% market (numbers only, policy) | **Conflicts with your special setup.** Confirm 450 (and update the policy), or revert to 500. No proposal from me |
| **P05** 3166592 | **Max 2,500 -> 3,500** (14:08:54) | Not covered | Only 29 Dec is affected: £2,855 would be capped at £2,500 under the old max (pricelabs C2) | No comp is bookable on 29 Dec (n = 0); NL P90 is £1,175 | Confirm or revert. It is linked to the +300% DSO in B |

### B. Date overrides that cross your decisions or the evidence
| # | Ref / dates | Your decision | Now (Reyhan, 9 Nov) | Evidence | Direction |
|---|---|---|---|---|---|
| b1 | **P11 22 Nov-18 Dec**, which includes darts 13-17 Dec | Darts +5%, "leave as it is", average above £300 (21/24 Oct) | -8% (21:21:32), then **-3% min 3** (21:21:47). Darts **£221/195/200/209/233 = £1,058, average £211.60** | comp-central: darts P14 / -41% vs a median of £350.75 (n = 7); two £394 comps sold darts overnight. market: R1 soft (-8.4 to +0.3) | **Against your decision: confirm or revert.** Revert = darts back to +5% |
| b2 | **P20 13-15 Nov** | -5% on 31 Oct-19 Nov; min 3 to 30 Nov | -5% removed, min 3 (now £294/306/249) | comp-west 13-16 Nov: P20 / -8% and 8% above the -15% new-listing line. **The evidence supports the removal.** | Against your -5%, but evidence-backed. **Confirm and record it in policy** |
| b3 | **P20 16-17 Nov** | as above | -5% kept, **min 2** | The price matches policy; the min stay does not | Min stay: **confirm min 2 or revert to min 3** |
| b4 | **P20 20-21 Nov and 1-20 Dec** | No price decision; min 3 to 30 Nov | 20-21 Nov 0% min 3; 1-20 Dec **0% min 3** (5 Dec stays unbookable) | comp-west: 14-19 Dec at P50, hold | Record it. The 5 Dec min stay is in t-p20-5dec-orphan |
| b5 | **P04 9-24 Nov** | -8% on 1-25 Nov (24 Oct, "no demand") | **-4% min 3**, on the lower base | The -4% sits on a base 9% lower, so November is below where your -8% on 220 put it | Confirm. Reverting the base (A) restores your November level |
| b6 | **P04 6-22 Dec; Jan; Feb** | None recorded | -3% min 3; Jan -8% min 3; Feb -8% min 4 | comp-east: December supported | Record it |
| b7 | **P13 9-12 Nov** (both twins) | 0% on 8-12 Nov (24 Oct) | **-5% re-added** (21:22:26), min 2 | comp-west: 11-13 Nov P67, above both lines | Against your 0%: **confirm or revert** (revert: +£16) |
| b8 | **P13 10-26 Dec** (both twins) | None recorded; standing direction | **-2% min 3** (21:22:44). It replaced 8 Nov's -5% and a 10 Dec +40% min 1 that was set while 11-15 Dec was booked | market: under P50 every night; comp-west: 0% supported, except hold 14-16 Dec | Partly moves toward the plan: see a-peak-check |
| b9 | **P12 12-20 Nov / 30 Nov-10 Dec -2% min 2; 7-14 Dec -5% min 3** | None recorded | as shown | comp-east supports cuts of -10% to -20%; **but min 3 blocks 12/13 Dec arrivals before the 14 Dec handback** | The price direction is supported. **Min stay: see a-p12-trim** |
| b10 | **P06 9-17 Nov** | Intentional block (policy); 15-21 Nov opening not confirmed | **-8% min 2** (was -5%) | comp-central: P0 on every open stay (-7% to -30%); `recommend` +5% | Against the evidence and your standing direction: see t-p06-open / t-p06-1521open |
| b11 | **P05 13-14 Dec +5% min 2; 21 Dec +300% min 1; 29 Dec +300% min 1; 29 Nov-2 Dec -5% min 3; Jan -10% min 3; Feb -8% min 4** | Not covered | as shown | comp-central: 29 Nov-3 Dec P25 / -30% with `recommend` +25%; 21/29 Dec P100 / no comp | 13-14 Dec min 2 **fixes the orphan**. 21/29 Dec: a-p05-dec. **29 Nov-2 Dec -5%: confirm or revert** (revert: +£60) |
| b12 | **P11 10-13 / 18-19 Nov price removed (min 2); 23-25 Dec +5% min 2** | None | as shown | market: 23 Dec hold (-4.5 vs STLY) | Record it |
| b13 | Carried from 7-8 Nov | P20 base 350 (24 Oct) | **330** | comp-west / pricelabs M3 | Still to confirm: 350, or record 330. Also record the P13 base 250 |

**If you revert to your recorded decisions** (Expected effect = Δ price on open nights x booked share, x Airbnb factor on Airbnb-only flats):
- P04 base: **£118**.
- P11 darts: £1,058 x (1.05/0.97 - 1) x 0.429 = **£37**.
- P05 29 Nov-2 Dec: £2,025 x (1/0.95 - 1) x 0.765 x 0.733 = **£60**.
- P13 11-12 Nov: £380 x (1/0.95 - 1) x 0.800 = **£16**.
- **Total £231 (upper bound).**
- P14 back to 500: £0 measurable (0% booked).
- P04 -4% -> -8% lowers the price; that is your own call.

## Base review

`base_price` changed on **P04 only (220 -> 200)**. Recommended bases (`kpi_pack` settings) are unchanged. Base vs market comes from pricelabs M3 (9 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% booked to the 20 Dec handback | **Hold; off the agenda** |
| P04 | **200 (was 220)** / 221 | 46.7% vs 24%; base +13.6% vs P50, -8.7% vs P75; November -34% to -48% vs comps; December about -5%; qp -0.15 | **Conflict for you: confirm 200 or revert to 220.** I recommend reverting (November evidence) |
| P05 | 550 / 544 | 73.3% vs 43%; open December P25 vs comps; qp +0.15; `recommend` +25%; base -4.3% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 7/12 non-blocked booked (58.3% vs 49%); base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 93.8% vs 37% to the handback | **Hold** |
| P11 | 286 / 283 | 46.2% vs 48% (ex block); comps P0-P17 (-26% to -45%); `recommend` +5% | **Hold 286.** The levers are Reyhan's -3% (b1) and Booking.com visibility |
| P12 | 284 / 284 | 53.3% vs 42%; **pace30 -27.6%** (-10 n / -£1,194.87); to handback -36.3%; open nights band P33-P100; base +38.5% vs P50 | **Hold 284; correct the level with date overrides** (a-p12-trim). Handback 13 Dec |
| P13 | 250 / 239 | 80.0% vs 43% (+37 pts) | **Keep 250 and record it in policy** |
| P14 | 525 / 503; **min 450 (was 500)** | 0% vs 46% | **Numbers only** (special setup); the min change is in A |
| P20 | 330 (your 350) / 351 | 75.0% vs 38% (30d), 55.2% vs 31% (60d); 0 reviews; base +31.0% vs P50 | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 9 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+11 n / +£4,609.70** (was +13 / +£5,123.51) | The change is the **P12 11-13 Dec cancellation (-2 n / -£513.81)** |
| Raised, including P06 18-22 Nov | +15 n / +£5,466.49 (made 22 / 76 n / £17,687.65; cancelled 10 / 61 n / £12,221.16) | P06 nights reopened 5 Nov |
| Unraised (P02, P08, P10, P14, P20*) | +48 n / +£8,278.58 (was +44 / +£7,640.04) | The change is the new P20 21-25 Nov booking |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 (unchanged) | 11-15 Dec booked and cancelled, nets to 0 |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat, today vs yesterday:**
  - P01 +3 n / +£720.90 (unchanged).
  - P05 **+12 / +£4,915.21** (unchanged; the largest).
  - P06 +10 / +£2,202.56 (unchanged).
  - P09 -3 / -£244.70 (unchanged).
  - P11 **-11 / -£2,355.27** (unchanged).
  - **P12 +4 / +£227.79 (was +6 / +£741.60).**
- **Reading:** still positive like-for-like, but down for the first time, and all of the drop is one Booking.com cancellation. **Hold the bases.**
  - P11 is the weak flat. Its open nights sit at comp P0-P17, so the problem there is not the base.
  - P12 is now near zero, and its pace is -27.6%. The fix there is the December override trim, not the base.
- **Caveat:** the rise cannot be separated from four other changes (the markup cut, Booking.com promotions, Reyhan's overrides, the P06 block change), and n is 1-8 bookings per flat.

### Per property
| Ref | Change since 9 Nov |
|---|---|
| P01 | Pushed 10 Nov 04:47Z. Nothing open before the 20 Dec handback. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy: last push 24 Feb (259 days). |
| P04 | **Base 220 -> 200** (Reyhan); 9-24 Nov -4%, 6-22 Dec -3%, Jan/Feb -8%. 11-13 Nov now £139-144; 24 Nov £199 -> £148. November -34% to -48% vs comps. **1455 is still bookable on every open run (day 11)**, now 4-34% dearer than the synced listing. Weekly 18% (£66.07 over policy on 6-19 Dec). Gap n30 £462. Fwd30 46.7% vs 24%. |
| P05 | **9 Nov passed unsold** (a-p05-9nov closed, no loss). 13-14 Dec now **min 2** (£520/£501): the orphan is fixed. **21 Dec £2,207 and 29 Dec £2,855 at +300% min 1** (soft blocks). Max raised to 3,500. 29 Nov-2 Dec -5%. PriceLabs now shows 15-20 Dec Booked. 7-8 Dec £947. Visible 12% early booking and 10% long-stay (5+ n) still on. Fwd30 73.3% vs 43%. |
| P06 | Reyhan 9-17 Nov **-5% -> -8%**: 10/11 Nov £218/£231, 15-17 Nov £241/£238/£246, P0 on every stay. Two comps sold 15-17 / 16-18 Nov overnight; we did not. 11 Nov becomes a 1-night gap under min 2 if 10 Nov does not sell. |
| P08 | Fully booked to the 13 Nov handback. Last push 9 Nov 08:48:53Z (low risk). |
| P09 | **12 Nov still an unsellable orphan** (£120, min 2, `unbookable` 1). The 11 Nov block's owner is unknown. Pushed 10 Nov 07:27:40Z. No PriceLabs edit. |
| P10 | Booked to the 18 Nov handback. |
| P11 | **New Smoobu block 10-13 Nov** (162775668, reason unknown). Reyhan 22 Nov-18 Dec **-3% min 3**; darts **£1,058, average £211.60**. 18-19 Nov £165/£191 (P0 -33%). 3 Jan £174 (under P25 £178). 23 Dec £276. Fwd30 46.2% vs 48%. |
| P12 | **Booking.com 11-13 Dec (£513.81) cancelled 9 Nov 23:30.** 7-13 Dec is now a 7-night run at **min 3** (Reyhan -5%, 22:30Z): 13 Dec is no longer an orphan, but 12/13 Dec arrivals are blocked. 13 Dec £364 -> £283. 30 Nov-3 Dec £1,126 (+17.8% vs band); 7-10 Dec £1,124 (+18%); 11-13 Dec £913 (+13%); 26 Nov £306 (+24%, P100). **Pace30 -27.6%**; to handback -36.3%. |
| P13 | **Booking.com 11-15 Dec on 3064856 (£710.77, 0.839x PriceLabs £847, 0.730x list) booked 08:58 and cancelled 20:36 on 9 Nov.** 10-26 Dec now a 17-night run at **-2% min 3** (3064856 £3,754 / 3090701 £3,973). 9-12 Nov -5% re-added. Twins differ to 8 Jan, **identical 9 Jan-9 Feb**. Fwd30 80.0% vs 43%. |
| P14 | **Min 500 -> 450 (Reyhan; conflicts with your special setup).** 59 of 179 open nights at £450; P100 / +28% to +95% vs comps; 0% vs 46%. Numbers only. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **New Airbnb 21-25 Nov £638.54 (0.650x £982; -£196.16 vs policy)**; not yet registered in PriceLabs. **20 Nov is now a min-3 orphan (£259)**; the stay covers the policy delivery dates 21-22 Nov. Reyhan removed the -5% on 13-15 and 20-21 Nov (min 3), kept 16-17 Nov -5% min 2, and set 1-20 Dec to 0% min 3. 5 Dec orphan £309 (min 3). Fwd30 75.0% vs 38% (was 57.1%). |

### Open plan items: status today
| Item | Status 10 Nov (evidence) |
|---|---|
| a-p05-9nov | **Closed: lapsed unsold, no loss.** No reservation covers 9 Nov (occupancy, channel §5) |
| t-p05-dec-orphans | **Closed: fixed by Reyhan.** 13-14 Dec min 2 (£1,021) and 21 Dec min 1 (pricelabs H3, comp-central). The 21 Dec price (+300%) moves to a-p05-dec |
| t-p12-13dec-orphan | **Closed: the orphan is gone.** 11-12 Dec reopened by the cancellation; 13 Dec £283 sits in the 7-13 Dec run. Reyhan's min 3 blocks 12/13 Dec arrivals; that moves to a-p12-trim |
| t-p04-doublebook | **Not fixed, day 11** (channel §3; comp-east) |
| t-pl-push-fresh | **Met for 24 h (0 listings late), but fragile.** Pushes followed Reyhan's saves. **P20 21-25 Nov not registered**; P05 15-20 Dec now registered |
| a-airbnb-rules | **Not fixed, day 12.** +£196.16 today; cumulative **£2,559.27** |
| t-p09-1112block | **Not fixed**; 12 Nov is the day after tomorrow |
| a-discount-cut | Not done. Gap **£1,591 / £861** (was £1,816 / £1,136). The fall comes from Reyhan's P20 edits, a sale, and the P04 base cut lowering the uncustomized price itself. PriceLabs' own layers are unchanged |
| a-p05-dec | Open. 7-8 Dec £947 (target +25%); **21/29 Dec now +300%** |
| a-peak-check | **P13 part partly moved** (-5% -> -2%); P05 29 Dec part moved the other way (+300%); now in a-p05-dec |
| a-p12-trim | **Partly moved by Reyhan** (-2% / -5%); gaps still +13% to +18% vs band |
| t-p12-26nov-price | Not fixed (£306, P100 +24%) |
| t-p13-twins | **Open for 9 Jan-9 Feb only** (correction 2) |
| t-p20-5dec-orphan | Not fixed (min 3 re-saved 21:25:55Z; £309) |
| t-p20-delivery | **Sharpened:** the new stay sells 21-22 Nov over the policy delivery dates; 20 Nov orphan |
| a-p13-record | Not done; **list replaced by the 9 Nov table above** |
| t-p06-1521open, t-p06-open | Moved the other way (Reyhan -8%) |
| t-p05-1521-live | PriceLabs and Smoobu both show Booked. Airbnb-side confirmation still NOT CHECKED |
| t-channel-gaps | Not fixed: 3 Jan £174, 23 Dec £276 (hold) |
| a-bcom-cancel | **Grew:** P12 11-13 Dec and P13 11-15 Dec added; 6 of 19 post-cut Booking.com bookings cancelled (32%) |
| t-p04-weekly, t-p13-los5, t-p05-los, a-p05-earlybird, t-cleaning-commission, a-p20-conversion | Unchanged (channel §4, §8) |
| Others (a-amenities, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-10

**Ranking:**
1. Time-bound rows first: the 11-13 Nov blocks, Barking, and today's P20 registration.
2. Then critical rows and your 9 Nov confirmations.
3. Then rows by expected £.
4. Then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). On Airbnb-only or Airbnb-majority flats (P05, P06, P20), the price is first multiplied by the observed Airbnb factor (channel §4): 0.765 up to 28 d, 0.900 at 29-59 d. These are upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.467, P05 0.733, P06 0.583 (ex-blocks), P09 0.938, P11 0.462, P12 0.533, P13 0.800, P20 0.750.
- Booked share, next 60: P05 0.717, P11 0.429, P12 0.471 (to handback), P13 0.517, P20 0.552.

**Bounds** (`kpi_pack` settings, 10 Nov): P04 £90-2,000; P05 £150-3,500; P06 £200-800; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P09 | **t-p09-1112block (12 Nov is the day after tomorrow).** Who placed Smoobu "Blocked channel" **162726554 on 11 Nov**, and why? **If not intended:** delete it so 11-13 Nov sells at the current price (do not cut). **If intended:** DSO **12 Nov min 2 -> 1**, keep £120. | Smoobu > Calendar > Torrent Lodge > 11 Nov; PriceLabs 3318172 > DSO 12 Nov | occupancy orphan table; pricelabs H3 (£120, min 2, `unbookable` 1); comp-east: about £156/n all-in if unblocked = -4% vs band (supported); 12 Nov alone P80 / +21% vs the 1-night band, but the band median needs about £75 room, under the £100 min | Unblocked: £241 x 0.938 = **£226**. Min 1 only: £120 x 0.938 = £113 | Corentin (ask Reyhan) | 2026-11-11 |
| 2 | P04 | **t-p04-doublebook (critical, day 11).** On 1455876748739910219, **block every open night**, or snooze the listing. Then map it to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §3 07:29-07:32Z: 10-13 Nov £557.40, 18-21 Nov £525.80, 6-19 Dec £2,275.22 bookable; not offered on Smoobu-booked windows (closed by an unseen route). comp-east: bookable on every open run, 11 Nov-20 Dec | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-11 |
| 3 | P11 | **NEW t-p11-1013block (question).** Who placed Smoobu "Blocked channel" **162775668 on 10-13 Nov** (created 9 Nov 18:37), and why? **If not intended:** delete it so 11-13 Nov sells (yesterday £179/£186/£234). | Smoobu > Calendar > Camden > 10-13 Nov | occupancy; pricelabs (PriceLabs shows 11-13 Nov "Blocked"); comp-central: the cause moves `recommend` between raise +5% and fix-listing | If unintended: £599 x 0.462 = **£277** (11-13 Nov; tonight lapses) | Corentin (ask Reyhan) | 2026-11-10 |
| 4 | P20 (all) | **t-pl-push-fresh.** After tonight's ~21:26Z refresh (or Sync Now), **confirm 3547481 shows 21-24 Nov "Booked"**. Check P08 `last_date_pushed` after 08:48Z, and the evening group at ~21:30Z if nobody saves. | PriceLabs > 3547481 > Sync Now; > each listing | pricelabs H1: PriceLabs still shows 21-24 Nov open at £982 while Smoobu is closed (no double-booking risk). H2: 0 listings over 24 h, but all evening pushes followed Reyhan's saves | Not quantified | Corentin | 2026-11-11 |
| 5 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 12).** Remove the hidden rules on every apartment and any global rule: nights 1-28 d (0.765), 29-59 d (0.900), same-day stays (0.850). Keep only visible discounts (policy `airbnb_visible_discounts`). Then confirm on Airbnb listing 1791529331262420081 that P20's own last-minute 15% (policy) is the only rule left. Pull price details for **162781746** (P20), 162753757 (P05) and 162719002. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Reservations | channel §1, §4: 25 live searches 07:29-07:32Z, unchanged bands. **P20 21-25 Nov £638.54 = 0.765 x 0.85 x £982** (£638.55 fit); policy-expected £834.70 | **Realised -£196.16 today; cumulative £2,559.27.** Forward: 23.5% on every Airbnb night sold up to 28 d out (not quantified) | Corentin | 2026-11-11 |
| 6 | P04 P14 P05 P11 P13 P20 P12 P06 | **a-p13-record: confirm or revert Reyhan's 9 Nov changes** (tables A and B). Recommended: **P04 base 200 -> 220** (revert); **P14 min**: confirm 450 or revert 500 (your setup); **P05 max**: confirm or revert 2,500; **P11 22 Nov-18 Dec -3%**: revert darts 13-17 Dec to +5%; **P20 13-15 Nov 0%**: confirm and record; **P20 16-17 Nov min 2**: confirm or revert to min 3; **P13 9-12 Nov -5%**: confirm or revert 0%; **P05 29 Nov-2 Dec -5%**: confirm or revert 0%. Then record the outcome, P20 base and P13 base 250 in `policy.json`. | PriceLabs 3562176, 3267077, 3166592, 3064196, 3547481, 3064856 (+3090701); `policy.json` | pricelabs C1 + log; comp-east (P04 November -34% to -48%); comp-central (darts -41%, P05 29 Nov-3 Dec P25 / -30%); comp-west (P20 13-16 Nov P20 / -8%) | If reverted: P04 £118 + P11 £37 + P05 £60 + P13 £16 = **£231** (upper bound). P14: £0 measurable | Corentin | 2026-11-11 |
| 7 | P05 | **a-p05-dec (revised).** **21 and 29 Dec (Reyhan +300% min 1): confirm whether they are meant to be blocked.** If yes, block them in Smoobu (clearer than a price). If they are meant to sell (your call: lowers a PriceLabs price): **21 Dec DSO +300% -> fixed about £940** (supported £796-1,087 room) and **29 Dec +300% -> 0%** (about £1,176 default; P90 £1,073-1,175). Separately, **7-8 Dec DSO +3% -> about +29%** (£475/£472 -> about £594/£590) and **13-14 Dec +5% -> about +31%** (£520/£501 -> about £650/£626), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 21 Dec P100, +114% / +175% vs £1,020 / £792.50; 29 Dec n = 0. pricelabs C2: 3.2x the neighbouring nights. 7-8 Dec P25 / -43% (n = 4); 13-15 Dec P25 / -34%. `recommend(0.733, 0.43, 0.17, 0.15)` = +25%. market: P75 £1,149 / £1,159; +5.8 / +2.3 and +11.5 / +5.0 vs STLY | 21 Dec: £940 x 0.900 x 0.717 = £607; 7-8 Dec: £237 x 0.765 x 0.733 = £133; 13-14 Dec: £255 x 0.900 x 0.717 = £165. **£905** (upper bound). 29 Dec not quantified | Corentin | 2026-11-11 |
| 8 | P04 P05 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off") on P04 and P05. P04 live: last-minute -5% linear over 15 d, Aggressive occupancy (-30% at 10% occupancy, 0-15 d), Recency default (5-15%). Then P11 and P20 (customizations not read today). **P12 excluded** (open nights above band). | PriceLabs 3562176 / 3166592 (then 3064196, 3547481) > Customizations | pricelabs H4, n30: P04 £462 (-16.3%), P05 £493 (-11.6%), P11 £610, P20 £145, P12 £153; offsets P13 -£268, P09 -£4. **Total £1,591 / £861** | 462 x 0.467 + 493 x 0.765 x 0.733 = **£492 / 30 days** (upper bound) | Corentin | 2026-11-12 |
| 9 | P20 | **t-p20-5dec-orphan.** DSO **5 Dec min 3 -> 1**, keep £309. Outside policy's min-3 window (ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1, re-saved min 3 at 21:25:55Z); comp-west: £309 above market P75, under the only 1-night comp (£567, n = 1); market Jingle Bell Ball +6.0 | £309 x 0.900 x 0.750 = **£209** | Corentin | 2026-11-11 |
| 10 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights. Not in policy (7+ 15%, 28+ 20%). Keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ (or Airbnb 1618929775762183214 > Pricing > Discounts) | channel §4: £190.70 on 11-16 Jan (5 n), £230.70 on 11-17 Jan; none on 4 n | **£190.70** per 5-night stay | Corentin | 2026-11-12 |
| 11 | P05 | **a-p05-earlybird.** Confirm the visible 12% early booking discount (60+ d) is yours, or set it to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §4: £139.92 on 9-12 Jan | **£139.92** per such stay | Corentin | 2026-11-12 |
| 12 | P13 | **t-p13-los5 (confirm).** Visible 10% "Long stay discount" on 5+ nights, both twins. Keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: £104.94 / £99.09 on 10-15 Dec | **£104.94** per 5-night stay | Corentin | 2026-11-12 |
| 13 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §4: £396.41 = 18.0% of £2,202.30; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£66.07** per 6-19 Dec stay | Corentin | 2026-11-12 |
| 14 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it in `policy.json` and set 15-17 Nov **-8% -> +5%** (£241/£238/£246 -> about £275/£272/£281). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov P0 / -26%, 15-18 Nov -24%, 16-18 Nov -30%; two comps sold overnight; `recommend(0.583, 0.49, 0.00, -0.016)` = +5% | If confirmed: £725 x (1.05/0.92 - 1) x 0.765 x 0.583 = **£46** | Corentin | 2026-11-11 |
| 15 | P13 | **a-peak-check (revised, P13 only).** Both twins: DSO **10-13 Dec and 17-26 Dec -2% -> 0%**; **hold 14-16 Dec at -2%**. Override of `recommend` +10%: the kept comps are open at our price and 3064856 is capped by qp -0.15 (correction 4). | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 11-15 Dec P50 (wider P9-P17); 20-27 Dec P0-P67 kept, P6-P19 wider; 14-17 Dec P71-P86. market: under P50 on all 17 nights, +3.8 to +25.7 pts | (£3,754 - £621 on 14-16 Dec) x (1/0.98 - 1) x 0.517 = **£33** | Corentin | 2026-11-12 |
| 16 | P06 | **t-p06-open (your call over Reyhan's -8%).** DSO **11 Nov -8% -> +5%** (£231 -> about £264). **If 10 Nov does not sell tonight, 11 Nov becomes a 1-night gap: set 11 Nov min 2 -> 1.** Hold tonight. | PriceLabs 3288517 > DSO 11 Nov | comp-central: 10-12 Nov P0 / -7%; `recommend` +5% | £231 x (1.05/0.92 - 1) x 0.765 x 0.583 = **£15** | Corentin | 2026-11-11 |
| 17 | P11 | **t-channel-gaps.** **3 Jan >= £195** (fortnight; now £174, £4 under P25 £178). 23 Dec hold (£276). | PriceLabs 3064196 (+Vrbo) > DSO 3 Jan | market §2 / §4: 3 Jan +4.4 vs STLY; 23 Dec -4.5 | £21 x 0.429 = **£9** | Corentin | 2026-11-12 |
| 18 | P12 | **a-p12-trim (your call: lowers a PriceLabs price).** DSO **30 Nov-3 Dec -2% -> about -17%** (£1,126 -> about £957); **7-10 Dec -5% -> about -19%** (£1,124 -> about £955); **11-13 Dec -5% -> about -16%** (£913 -> about £803); **18-20 Nov -2% -> about -9%**. Hold 12-14 Nov. **Min stay: 12 Dec min 3 -> 2, 13 Dec min 3 -> 1**, so the last nights before the 14 Dec handback can sell. Override of `recommend` 30d +10%; 60d gives lower -7%. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east: 30 Nov-3 Dec P64 **+17.8%**, 7-10 Dec P85 **+18.1%**, 11-14 Dec P69 **+13.2%** (n = 13-14); qp **-0.15**; the cancelled stay paid £257/n, inside the supported £228-269. Pace30 -27.6% | Not quantified (a cut) | Corentin | 2026-11-12 |
| 19 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> about -9%**, keep min 1 (£306 -> about £247, top of supported £210-247; uncustomized now £271). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £360 all-in, **P100, +23.9%** (n = 4) | Not quantified (a cut) | Corentin | 2026-11-12 |
| 20 | P13 | **t-p13-twins (9 Jan-9 Feb only; policy conflict).** Restore a gap on **9 Jan-9 Feb: 3090701 about +4%** (DSO on 3090701 only; Reyhan's parent edits copy to the child, so set it on the child after any parent edit). | PriceLabs 3090701 > DSO 9 Jan-9 Feb | channel §4: identical on 23 January and 9 February open nights; 10-13 Jan cards £503.10 both. comp-west: 3-8 Jan differ by 4-6%. Policy `twin_listings` | Not quantified (duplicate-listing risk) | Corentin | 2026-11-12 |
| 21 | P20 | **t-p20-delivery (confirm).** Smoobu blocks 18-19 Nov; policy says delivery 20-22 Nov; the new stay sells 21-22 Nov. Confirm the delivery moved to 18-19 Nov (then update `policy.json`), or tell us how to handle the clash with the 21 Nov arrival. **20 Nov is a min-3 orphan (£259):** selling it needs min 1, below your recorded P20 min 3 to 30 Nov, so **no proposal unless you change that rule.** Also confirm 16-17 Nov min 2 (b3). | Smoobu > Calendar > Waterford; `policy.json` | occupancy; channel §1; comp-west (20 Nov n = 1, £420); market (20 Nov +4.7) | Not quantified (20 Nov if opened: £259 x 0.765 x 0.750 = £149) | Corentin | 2026-11-11 |
| 22 | P05 | **t-p05-1521-live (question).** PriceLabs (booked_date 8 Nov) and Smoobu both show 15-21 Dec booked. Still confirm on Airbnb that 162753757 is live (Smoobu type "modification of booking"; price details "Cancellation Payout £2,667.81"). | Airbnb > Reservations; Smoobu > Bookings > 162753757 | pricelabs H1; occupancy (P05 22 n on the books) | Not quantified (£2,962.17 at stake) | Corentin | 2026-11-12 |
| 23 | P12 P13 P11 P04 | **a-bcom-cancel (question).** Send the rate plan and the cancellation reason for **P12 162688853 (11-13 Dec)** and **P13 162759785 (11-15 Dec, booked and cancelled in 12 h)**, plus the earlier P11 12-14 Dec, P12 3-7 Dec and P04 19-20 Dec. | Booking.com extranet > Reservations | channel §2, §6: 6 of 19 post-cut bookings cancelled (32%); confirmed post-cut £8,502.99 | Not quantified | Corentin | 2026-11-12 |
| 24 | P11 P12 P13 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning: P12 £22.50, P11 £26.82, P13 £30.00 per booking. Accept or challenge? | Booking.com extranet > Finance | channel §8 | £22.50-£30.00 per booking | Corentin | 2026-11-12 |

## Top 5 for today
1. **Confirm or revert Reyhan's 9 Nov settings.**
   - **P04 base 220 -> 200**: -£253 over next 30, and November is now -34% to -48% vs comps. Revert recommended.
   - **P14 min 500 -> 450**: against your special setup; -£1,388 over next 30.
   - **P05 max 2,500 -> 3,500.**
   - Among the 46 date overrides: **P11 darts -3%** (average £211.60 vs your >£300), P13 9-12 Nov -5% (policy 0%), P20 13-15 Nov -5% removed (evidence supports it) and 16-17 Nov min 2, P05 29 Nov-2 Dec -5% at comp P25.
2. **P05 21 Dec £2,207 and 29 Dec £2,855 (+300% min 1) work as soft blocks.**
   - Confirm whether they are meant to be blocked (then block in Smoobu), or set 21 Dec to about £940 (supported £796-1,087).
   - Raise 7-8 Dec and 13-14 Dec by +25% (P25).
   - Upper bound £905.
3. **P20's new Airbnb stay (21-25 Nov) paid 0.650x (-£196.16 vs policy).** That brings the hidden-layer cost to £2,559.27, and the layers are now on day 12. Remove the 0.765 / 0.900 / 0.850 rules in Smoobu. The stay also leaves 20 Nov as a min-3 orphan and sells 21-22 Nov over the policy delivery dates: please confirm the delivery dates.
4. **Barking 1455, day 11:** bookable on every open P04 run (10-13 Nov £557.40 to 6-19 Dec £2,275.22). Block every night, then map it to 3562176 or unlist it.
5. **Two unexplained Smoobu blocks.** P09 11 Nov makes 12 Nov (the day after tomorrow) unsellable: £226 if unblocked, else min 1. The new P11 block on 10-13 Nov is worth £277 if unintended. Who placed them?

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765x up to 28 d, 0.900x at 29-59 d, 1.000x at 60+ d; 0.850x on same-day stays (channel §4, day 12).
  - Bookings take one more 0.85: P20 21-25 Nov 0.650x, P20 6-14 Dec the same stack, P05 15-21 Dec 0.81x.
  - Target **1.00x before visible discounts by 2026-11-13** (row 5).
- **Booking.com since the 24 Oct markup cut** (channel §6):
  - Gross: 19 bookings / 71 n / £12,759.50 at 0.805x.
  - **Confirmed: 13 / 52 n / £8,502.99 at 0.774x.** Net +27 n / +£3,451.62.
  - **Cancellation rate 32% (6 of 19).** Pace is 0.78 confirmed bookings a day (target at least 1.0 by 2026-11-15).
  - Promotions stay. The levers are the PriceLabs price under them and the cancellation reasons (row 23).
- **Net to owner per £100 PriceLabs** (channel §7):
  - Booking.com as sold: about £62-66.
  - Airbnb: £64.64 at 0.765; **£54.94 on P20 21-25 Nov**.
  - Models: Booking.com £97.75, Airbnb £84.50.
  - Direct (£90 model) is not the cheapest channel against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 (15) vs 4.86.
  - P13 3090701 4.7 (10) / 3064856 4.31 (13) vs 4.76.
  - P06 4.58 (12) vs 4.62.
  - P08 4.50 vs 4.87.
  - P04: synced 4.11 (9) vs 4.85; the unsynced listing has 4.69 (26).
  - P05 4.77 (35) vs 4.26.
  - P09 5.0 (3) vs 4.58.
  - P01 4.75 (4) vs 4.80.
  - P20: no reviews vs 4.8.
  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12 December, P04 and P13 Christmas cannot carry a premium (correction 4).
  - Fixes: P12 pre-arrival key-collection message (the 6/10 review cited the key); P13 3064856 cleanliness and photo accuracy; review requests on P20 (first stays done) and P09; map Barking 1455 to keep its 26 reviews. Target P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P06:** two comps sold 15-18 Nov overnight while we stayed unsold at P0 (-24% to -30%), so the gap is not price-led. 4.58 from 12 reviews; 2nd floor, no lift (5 of 12 comps have one).
  - **P11:** Booking.com CTR 0.81% vs 1.70% (policy), with every open stay at P0-P17.
  - **P20:** 0 reviews; the parking photo should come first. The new booking sold at comp P0, so it converts at a price the layers set, not at our list.
- **Gap fill / length of stay.**
  - Unsellable orphans today: P09 12 Nov (row 1), P20 20 Nov (row 21, policy min 3), P20 5 Dec (row 9).
  - Single nights priced as soft blocks: P05 21 / 29 Dec (row 7).
  - New min-3 pins, no orphans yet: P12 7-14 Dec blocks 12/13 Dec arrivals (row 18); P11 22 Nov-18 Dec and P13 10-26 Dec remove 2-night stays (comp-central, comp-west: no proposal).
  - Short runs a gap-fill rule would sell: P13 10-12 Nov, P12 12-13 / 17-20 Nov, P11 18-19 Nov, P05 16-17 Nov and 7-8 Dec, P06 10-11 / 15-17 Nov (pricelabs H3).
  - Systemic fix: an orphan-gap rule (min 1 on 1-night gaps, min 2 on 2-night gaps). The setting is in PriceLabs > Customizations > Orphan day, which `get_customizations` does not expose (NOT CHECKED).
  - Mid-term (91+ nights): NOT CHECKED.
- **Direct share.** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30.
- **Event compression** (market §4): **26 n / £478** on the same method (yesterday 29 / £683); bookable excluding darts R1 and the two orphans, **19 n / £172**.
  - Most of the fall is Reyhan's P20/P11 edits (-£131) and the P20 booking (-£68), not PriceLabs catching up.
  - New: P04 24 Nov (£148 vs fortnight £162, after the base cut) and P20 18 Dec.
  - The market supports raises on P13 10-26 Dec (row 15), P05 7-8 / 13-14 Dec (row 7), P04 14-19 Dec (+£135 to P75; covered by reverting the base in row 6), P11 3 Jan (row 17), and P20 5 Dec (min stay, row 9).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **64.1%** (65.4% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£170.06** (£171.65) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£109.01** (£112.24) | £129 | 2026-12-18 |
| Revenue, last 30 | **£42,514.05** (250 n) | - | - |
| Booked next 30 (Smoobu) | **61.9%** (164/265) | each unit at least market + 10 pts (below: P11 46.2% vs 48%, P06 58.3% vs 49%) | 2026-11-13 |
| Booked next 60 | **51.1%** (231/452) | at least market + 10 pts (P11 42.9% vs 38%) | 2026-11-17 |
| 7-day pickup, net | gross 11 bk / 50 n / £11,047.74; cancelled 5 / 24 n / £4,075.35; **net +26 n / +£6,972.39** | at least 10 bookings a week, net positive | 2026-11-12 |
| P12 pace30 vs STLY | **-27.6%** (-10 n / -£1,194.87); to handback -36.3% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+11 n / +£4,609.70 like-for-like**; +15 n / +£5,466.49 incl. P06 reopened nights | positive and rising | 2026-11-12 |
| Booking.com paid / PriceLabs (since cut) | **0.774x** (13 confirmed / 52 n / £8,502.99); 32% cancelled | median at least 0.80x; cancellations under 20% | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x (to 28 d) / 0.900x (29-59 d) / 1.000x (60+ d)**, day 12; realised cost **£2,559.27** | 1.00x before visible discounts | 2026-11-13 |
| PriceLabs-side gap | **£1,591 next 30; £861 next 14** | £0 apart from your own overrides | 2026-11-12 |
| Listings pushed more than 24 h late | **0** (met; all evening pushes followed manual saves) | 0 without manual saves | 2026-11-11 |
| PriceLabs vs Smoobu mismatches | **0 prices**; 1 status (P20 21-24 Nov not registered) | 0 | 2026-11-11 |
| Unsellable orphan nights (next 60) | **3 nights** (P09 12 Nov, P20 20 Nov, P20 5 Dec), plus P05 21 / 29 Dec at +300% | 0 | 2026-11-12 |
| Double-sellable Barking stays | **every open P04 night**, day 11 | 0 | 2026-11-11 |
| Missed compression | **26 n / £478**; bookable excl. darts R1 and orphans 19 n / £172 | under 10 nights | 2026-11-13 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-13; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who placed the P09 11 Nov (162726554) and P11 10-13 Nov (162775668) Smoobu blocks, and why:** UNKNOWN. Source: Smoobu booking history, or ask Reyhan.
2. **P20 delivery dates** (policy 20-22 Nov vs Smoobu 18-19 Nov): UNKNOWN. Source: Corentin / operations.
3. **Airbnb price details** for P20 162781746 (0.765 x 0.85), P05 162753757 (0.9 x 0.9, "Cancellation Payout") and 162719002: NOT CHECKED. Source: Airbnb > Reservations > price details.
4. **Smoobu Airbnb rule settings:** still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules; Airbnb > Pricing > Discounts.
5. **How PriceLabs turns +300% into 3.02x (21 Dec) and 2.43x (29 Dec)**, and whether P05 has an orphan-gap customization: NOT CHECKED. Source: PriceLabs > 3166592 > Customizations. P05/P11/P20 customizations were not read today.
6. **Why P05 13-14 Dec fell £123 overnight despite the +5%** (default 637/584): NOT CHECKED (market).
7. **P12 / P13 cancellation reasons and rate plans:** NOT CHECKED. Source: Booking.com extranet > Reservations.
8. **Listing 1455's own reservations, and how its calendar closes on Smoobu-booked dates:** NOT CHECKED. Source: Airbnb host 551951609 > Reservations / Calendar sync.
9. **Booking.com displayed prices, comps and rank:** NOT CHECKED (AWS WAF challenge 07:31:41Z; not bypassed). Source: extranet screenshots.
10. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
11. **Other:**
    - `user_price` vs `price` gaps on P12/P13/P20 are unexplained.
    - The Jan-Feb min-stay rules (Reyhan's new P04/P05/P20 min 3/4) are not in policy.
    - P15-P19 need the second-account keys.
    - Vrbo +8% / Direct -10% are unconfirmed.
    - The P02 Vrbo copy is stale (24 Feb).
    - Events are search summaries (theo2.co.uk, excel.london and alexandrapalace.com return ENOTFOUND to WebFetch). Unresolved event-date conflicts: Don Toliver, Kasabian, Kahan, Bryson Tiller.

```json
{"scoreboard":{"note":"10 Nov 2026. Last 30 nights = 11 Oct-9 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward figures handback-aware, Smoobu confirmed stays as truth; policy blocks, P01 gap block, P20 18-19 Nov, P09 11 Nov and P11 10-13 Nov (new, reason unknown) excluded. Pickup = bookings made 4-10 Nov net of cancellations. Base-rise like-for-like excludes P06 18-22 Nov. Airbnb ratios from 25 live searches 07:29-07:32Z (channel §4). PriceLabs gap from pricelabs H4. Booking.com since cut from channel §6. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"64.1%"},{"label":"ADR last 30","value":"£170.06"},{"label":"RevPAR last 30","value":"£109.01"},{"label":"Revenue last 30","value":"£42,514.05"},{"label":"Nights last 30","value":"250"},{"label":"Booked next 30","value":"61.9% (164/265)"},{"label":"Booked next 60","value":"51.1% (231/452)"},{"label":"7-day pickup","value":"gross 11 bk / 50 n / £11,047.74; cancelled 5 / 24 n / £4,075.35; net +26 n / +£6,972.39"},{"label":"P12 pace30 vs STLY","value":"-27.6% (-10 n / -£1,194.87); to handback -36.3%"},{"label":"Raised flats net since 18 Oct","value":"+11 n / +£4,609.70 like-for-like; +15 n / +£5,466.49 incl. P06 reopened nights (drop = P12 11-13 Dec cancellation)"},{"label":"Booking.com since markup cut","value":"13 confirmed, 52 n, £8,502.99; 0.774x PriceLabs; gross 19 / 71 n / £12,759.50; 6 of 19 cancelled (32%)"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x at 60+ d; 0.850x same-day; day 12; P20 21-25 Nov 0.650x (-£196.16); £2,559.27 cumulative"},{"label":"PriceLabs-side gap","value":"£1,591 next 30; £861 next 14"},{"label":"Late pushes","value":"0 listings over 24 h; evening pushes only after Reyhan's saves"},{"label":"PriceLabs vs Smoobu mismatches","value":"0 prices; P20 21-24 Nov booking not yet registered in PriceLabs"},{"label":"Unsellable orphans","value":"3 nights: P09 12 Nov, P20 20 Nov, P20 5 Dec; plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 11"},{"label":"Missed compression","value":"26 n / £478; bookable excl. darts R1 and orphans 19 n / £172"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p09-1112block","status":"open","prop":"P09","priority":"critical","title":"Not fixed; 12 Nov is the day after tomorrow: Smoobu block 162726554 on 11 Nov (owner unknown) leaves 12 Nov unsellable (£120, min 2, unbookable 1); if unintended delete (11-13 Nov sells at current price, about -4% vs band, supported), else DSO 12 Nov min 1; last nights before 26 Nov handback","gbp":226},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 11): unsynced Barking Airbnb 1455876748739910219 bookable on every open P04 run (10-13 Nov £557.40, 18-21 Nov £525.80, 6-19 Dec £2,275.22); block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"t-p11-1013block","status":"open","prop":"P11","priority":"high","title":"New: Smoobu 'Blocked channel' 162775668 on Camden 10-13 Nov (created 9 Nov 18:37, reason unknown) removes 4 nights incl. tonight (were £170/£179/£186/£234); who and why? If unintended delete so 11-13 Nov sells","gbp":277},
{"id":"t-pl-push-fresh","status":"open","prop":"P20 P08 P05 P06 P11 P12 P13 P14 P04","priority":"high","title":"Met for 24 h (0 listings late) but only via Reyhan's saves; P20 21-25 Nov booking (22:34) not registered in PriceLabs (21-24 Nov open at £982, Smoobu closed); P05 15-20 Dec now registered. Confirm 3547481 21-24 Nov Booked after tonight's refresh or Sync Now; P08 after 08:48Z; evening group ~21:30Z","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P04","priority":"critical","title":"Day 12, unchanged: remove hidden Smoobu Airbnb layers per night 0.765 (to 28 d) / 0.900 (29-59 d), 0.850 same-day; new P20 21-25 Nov £638.54 = 0.765 x 0.85 x £982, -£196.16 vs policy; cumulative £2,559.27; pull 162781746, 162753757, 162719002 price details; P09 excluded (deprioritised)","gbp":196.16},
{"id":"a-p13-record","status":"open","prop":"P04 P14 P05 P11 P13 P20 P12 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9 Nov changes (49 log entries): P04 base 220->200 (-£253 next 30; Nov -34% to -48% vs comps; revert recommended), P14 min 500->450 (conflicts with special setup; -£1,388), P05 max 2500->3500; P11 22 Nov-18 Dec -3% min 3 (darts avg £211.60 vs >£300); P20 13-15 Nov -5% removed (evidence supports: confirm and record), 16-17 Nov min 2 vs min 3; P13 9-12 Nov -5% (policy 0%); P05 29 Nov-2 Dec -5% (P25); P04 Nov -4% vs -8%; carried P20 base 330 vs 350, record P13 base 250","gbp":231},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,207 / 29 Dec £2,855 at Reyhan's +300% min 1 act as soft blocks: confirm intent (block in Smoobu) or, your call, 21 Dec fixed about £940 (supported £796-1,087) and 29 Dec 0% (about £1,176); 7-8 Dec +3% -> about +29% (£947 -> about £1,184) and 13-14 Dec +5% -> about +31% per recommend +25% (P25 / -34% to -43%)","gbp":905},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,591 next 30 / £861 next 14 (was £1,816 / £1,136) only because of Reyhan's P20 edits, a sale and the P04 base cut; PriceLabs layers unchanged (P04 £462 -16.3%, P05 £493, P11 £610, P20 £145); set Last-minute, Occupancy, Booking Recency to Custom 0% on P04/P05 (then P11/P20); P12 excluded","gbp":492},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed: P20 5 Dec 1-night orphan, min 3 (Reyhan re-saved 1-20 Dec 0% min 3), unbookable at £309; DSO 5 Dec min 1, keep price (policy min-3 window ends 30 Nov)","gbp":209},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (£190.70 on 11-16 Jan; £230.70 on 11-17 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":190.7},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (£139.92 on 9-12 Jan): not in policy - yours, or 0%?","gbp":139.92},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (£104.94 / £99.09 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":104.94},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (£66.07 over policy on 6-19 Dec)","gbp":66.07},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; Reyhan now -8% on 9-17 Nov: 15-17 Nov £241/£238/£246, P0 -24% to -30%; two comps sold overnight; if confirmed record in policy and -8% -> +5% on 15-17 Nov, else re-block","gbp":46},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Partly moved (Reyhan 10-26 Dec -5% -> -2% min 3): both twins 10-13 and 17-26 Dec -2% -> 0%, hold 14-16 Dec at -2% (comp-west P71-P86; 3064856 qp -0.15 caps the +10% recommend); market under P50 all 17 nights; min-2 ask on 25-26 Dec dropped (17-night run); P05 29 Dec moved to a-p05-dec","gbp":33},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"Reyhan's 9-17 Nov -8% (was -5%): 11 Nov £231 -> about £264 (+5%, recommend; P0 -7%), your call; if 10 Nov unsold tonight set 11 Nov min 2 -> 1 (12-15 Nov booked)","gbp":15},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 3 Jan £174 -> >= £195 (fortnight; £4 under P25 £178; market +4.4); 23 Dec £276 hold (market -4.5); Booking.com CTR 0.81% vs 1.70%","gbp":9},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Partly moved by Reyhan (-2% / -5%), gaps still +13% to +18% vs band: 30 Nov-3 Dec £1,126 -> about -17% (£957); 7-10 Dec £1,124 -> about -19% (£955); 11-13 Dec reopened £913 -> about -16% (£803); 18-20 Nov -> about -9%; hold 12-14 Nov; 12 Dec min 3->2 and 13 Dec min 3->1 so last nights before the 14 Dec handback sell; lowers a PriceLabs price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £306 (£360 all-in, P100 +23.9%, n=4); DSO +15% -> about -9% (about £247, top of supported £210-247), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Narrowed: twins differ to 8 Jan (3-8 Jan 4-6% apart, comp-west) but identical on 32 open nights 9 Jan-9 Feb (Smoobu; 10-13 Jan cards £503.10 both); DSO 3090701 about +4% on 9 Jan-9 Feb, set on the child after any parent edit","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Confirm: Smoobu blocks 18-19 Nov, policy delivery 20-22 Nov; new Airbnb 21-25 Nov sells 21-22 Nov over the policy dates; 20 Nov now a min-3 orphan (£259; min 1 below your P20 min 3, no proposal); 16-17 Nov still min 2 vs policy min 3; update policy or re-plan delivery","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"PriceLabs (booked_date 8 Nov) and Smoobu now both show 15-21 Dec booked; still confirm on Airbnb that 162753757 (£2,962.17) is live (Smoobu type 'modification of booking', price details 'Cancellation Payout £2,667.81')","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P13 P11 P04","priority":"medium","title":"Grew: Booking.com cancellations P12 11-13 Dec (162688853, £513.81) and P13 11-15 Dec (162759785, booked and cancelled in 12 h) added to P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec; 6 of 19 post-cut bookings cancelled (32%): send rate plans and reasons","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: Booking.com commissions cleaning: P12 £22.50, P11 £26.82, P13 £30.00 per booking: accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"New 21-25 Nov booking sold at comp P0 (-29% vs £279, n=9) via the Airbnb layers; remaining: parking first photo, review requests after first stays (0 reviews); price asks via a-p13-record and a-airbnb-rules","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -27.6% (-10 n / -£1,194.87), to handback -36.3% after the 11-13 Dec cancellation; correct open December via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov PriceLabs 3090701 £246 / 3064856 £338 (+50% min 1; Airbnb £339 / £409 all-in vs 1 comp £394; market +18.0 Finals Weekend); 17 Nov £208/£220 at +35%: confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P06 conversion gap (comps sold at P0)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (10 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date: P04 base 220 vs 200, P14 min 400 vs 450, P05 max 780 vs 3500; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps unchanged 10 Nov (no replacements; P04 1387112821878102742 first miss, P01 1005647070760859698 not returned, P06 2, P08 4, P14 1, P17 2 absent); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026 (259 days); keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"a-p05-9nov","status":"done","prop":"P05","priority":"critical","title":"Closed: 9 Nov lapsed unsold (no reservation covers it; Smoobu still open £1,422 at 07:26Z); the -£1,121.40 Airbnb exposure was not realised; no loss","gbp":null},
{"id":"t-p05-dec-orphans","status":"done","prop":"P05","priority":"high","title":"Fixed: Reyhan set 13-14 Dec min 2 (+5%, now £520/£501, sellable) and 21 Dec min 1 on 9 Nov; 21 Dec price (+300%, £2,207) moved to a-p05-dec","gbp":null},
{"id":"t-p12-13dec-orphan","status":"done","prop":"P12","priority":"medium","title":"Fixed by events: the 11-13 Dec Booking.com cancellation reopened 11-12 Dec, so 13 Dec (£283, was £364) sits in a 7-13 Dec run; note Reyhan's 7-14 Dec min 3 now blocks 12/13 Dec arrivals before the 14 Dec handback (moved to a-p12-trim)","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P04 P14 P05","title":"Reyhan's 9 Nov settings: P04 base 220->200 (-£253 next 30), P14 min 500->450 (conflicts with special setup; -£1,388), P05 max 2500->3500; 49 log entries, policy unchanged since 24 Oct","evidence":"pricelabs C1 + get_user_logs table; occupancy; market §2; comp-east P04."},
{"agent":"pricelabs","severity":"critical","ref":"P05","title":"P05 21 Dec £2,207 / 29 Dec £2,855 are Reyhan's +300% min 1 DSOs (3.2x neighbours); 29 Dec only possible via the new max; soft blocks","evidence":"pricelabs C2; comp-central P05 gaps (21 Dec supported £796-1,087 room); market §2 (P90 £891 / £1,073)."},
{"agent":"channel","severity":"critical","ref":"P20","title":"New P20 Airbnb 21-25 Nov £638.54 = 0.650x £982 (0.765 x 0.85): -£196.16 vs policy; Airbnb-layer cost £2,559.27, day 12","evidence":"channel §1, §4; pricelabs H1; occupancy; comp-west (P0, -29% vs £279)."},
{"agent":"occupancy","severity":"high","ref":"P20","title":"P20 20 Nov now a min-3 orphan (£259); the stay sells 21-22 Nov over the policy delivery dates 20-22 Nov (Smoobu blocks 18-19 Nov)","evidence":"occupancy orphan table; channel §1; comp-west; market §2."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 bookable on every open P04 run (day 11), now 4-34% dearer than the synced listing after the base cut","evidence":"channel §3 07:29-07:32Z; comp-east 1455 section."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"After the base cut P04 November sits -34% to -48% vs comps (NL P30) vs supported -15%; December -15% to +3.5% (supported)","evidence":"comp-east Priority 2; market §2 (-£427 on 31 nights)."},
{"agent":"occupancy","severity":"high","ref":"P09 P11","title":"Two unexplained Smoobu blocks: P09 11 Nov (12 Nov orphan, the day after tomorrow) and new P11 10-13 Nov (162775668, 4 nights)","evidence":"occupancy; pricelabs H3; comp-central P11; comp-east P09."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"P11 darts 13-17 Dec now -3% (Reyhan 22 Nov-18 Dec), avg £211.60 vs Corentin's >£300; P14 -41% vs median; two £394 comps sold","evidence":"comp-central P11; pricelabs C1; market §2."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"P12 11-13 Dec cancelled and reopened at +13% vs band; 30 Nov-3 Dec +17.8%, 7-10 Dec +18.1%; min 3 blocks 12/13 Dec arrivals before handback; pace30 -27.6%","evidence":"comp-east Priority 1; pricelabs H3; occupancy pace."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"Base-rise tally down to +11 n / +£4,609.70 like-for-like (+15 / +£5,466.49 incl. P06); whole drop = P12 11-13 Dec cancellation","evidence":"occupancy base-rise section; channel §2."},
{"agent":"channel","severity":"medium","ref":"P13","title":"P13 twins identical on 32 open nights 9 Jan-9 Feb (Smoobu); differ 3-8 Jan (comp-west 4-6%)","evidence":"channel §4 standing items; comp-west twins."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 Christmas: remove Reyhan's remaining -2% on 10-13 and 20-26 Dec; hold 14-17 Dec; +10% not supported (3064856 qp -0.15, kept comps at our level)","evidence":"comp-west P13 positioning; market §2 (+£375 at +10%)."},
{"agent":"channel","severity":"medium","ref":"P12 P13","title":"Booking.com since cut: 6 of 19 bookings cancelled (32%); confirmed 13 / 52 n / £8,502.99 at 0.774x","evidence":"channel §2, §6."},
{"agent":"market","severity":"medium","ref":"P13 P05 P11 P20 P04","title":"Missed compression 26 n / £478 (was 29 / £683), mostly from Reyhan's edits and the P20 booking; new P04 24 Nov after the base cut","evidence":"market §4."}
],
"top5":[
"Confirm or revert Reyhan's 9 Nov settings: P04 base 220->200 (-£253 next 30; November now -34% to -48% vs comps, December fine; revert recommended), P14 min 500->450 (against your special setup; -£1,388), P05 max 2,500->3,500; plus 46 date overrides incl. P11 darts -3% (avg £211.60 vs your >£300), P13 9-12 Nov -5%, P20 13-15 Nov -5% removed (evidence supports) and 16-17 Nov min 2, P05 29 Nov-2 Dec -5%.",
"P05 21 Dec £2,207 and 29 Dec £2,855 (+300% min 1) act as soft blocks: confirm they are meant to be blocked, or set 21 Dec to about £940 (supported £796-1,087); and raise 7-8 / 13-14 Dec +25% (P25). Upper bound £905.",
"New P20 Airbnb 21-25 Nov paid 0.650x (-£196.16 vs policy); hidden-layer cost £2,559.27 on day 12: remove the 0.765/0.900/0.850 Smoobu rules. It leaves 20 Nov a min-3 orphan and sells 21-22 Nov over the policy delivery dates: confirm the delivery dates.",
"Barking 1455 day 11: bookable on every open P04 run (10-13 Nov £557.40 to 6-19 Dec £2,275.22). Block every night, then map to 3562176 or unlist.",
"Two unexplained Smoobu blocks: P09 11 Nov leaves 12 Nov (the day after tomorrow) unsellable (£226 if unblocked, else min 1), and new P11 10-13 Nov (£277 if unintended). Who placed them?"
],
"per_property":[
{"ref":"P01","change":"Pushed 10 Nov 04:47Z; nothing open to the 20 Dec handback; base-rise +3 n / +£720.90 unchanged."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb (259 days)."},
{"ref":"P03","change":"Intentional block; pushed 10 Nov 03:30Z via Channex."},
{"ref":"P04","change":"Reyhan base 220->200 (-£253 next 30; for Corentin to confirm or revert); 9-24 Nov -4% (policy -8%), 6-22 Dec -3%; November -34% to -48% vs comps; 1455 still bookable (day 11); weekly 18% (£66.07); gap £462; fwd30 46.7% vs 24%."},
{"ref":"P05","change":"9 Nov lapsed unsold (no loss); 13-14 Dec min 2 (orphan fixed); 21 Dec £2,207 / 29 Dec £2,855 at Reyhan's +300% min 1 (soft blocks); max 2500->3500; 29 Nov-2 Dec -5%; 15-20 Dec now Booked in PriceLabs; base-rise +12 n / +£4,915.21 unchanged; fwd30 73.3% vs 43%."},
{"ref":"P06","change":"Reyhan 9-17 Nov -5% -> -8% (P0 on every stay, recommend +5%); two comps sold 15-18 Nov overnight; 11 Nov becomes a gap if 10 Nov unsold; base-rise +10 n / +£2,202.56 unchanged."},
{"ref":"P07","change":"Intentional block; pushed 10 Nov 04:08Z."},
{"ref":"P08","change":"Fully booked to the 13 Nov handback; last push 9 Nov 08:48Z."},
{"ref":"P09","change":"12 Nov still an unsellable orphan (£120, min 2) behind the unexplained 11 Nov block; pushed 10 Nov 07:27Z; base-rise -3 n / -£244.70 unchanged; fwd30 93.8%."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"New Smoobu block 10-13 Nov (reason unknown); Reyhan 22 Nov-18 Dec -3% min 3, darts £1,058 avg £211.60 (vs >£300); 3 Jan £174; base-rise -11 n / -£2,355.27 unchanged; fwd30 46.2% vs 48%."},
{"ref":"P12","change":"Booking.com 11-13 Dec (£513.81) cancelled; 7-13 Dec open run at -5% min 3 (12/13 Dec arrivals blocked); 13 Dec no longer an orphan (£283); pace30 -27.6%; base-rise +4 n / +£227.79 (was +6 / +£741.60)."},
{"ref":"P13","change":"Booking.com 11-15 Dec on 3064856 (£710.77, 0.839x PL) booked and cancelled 9 Nov; 10-26 Dec -2% min 3 (17 open nights £3,754 / £3,973); 9-12 Nov -5% re-added; twins identical 9 Jan-9 Feb; fwd30 80.0% vs 43%."},
{"ref":"P14","change":"Reyhan min 500->450 (conflicts with special setup; -£1,388 next 30); 59 of 179 nights at £450; 0% vs 46%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped)."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); comp reference set only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"New Airbnb 21-25 Nov £638.54 (0.650x, -£196.16 vs policy), not yet registered in PriceLabs; 20 Nov new min-3 orphan; stay covers policy delivery dates 21-22 Nov; Reyhan removed -5% on 13-15 / 20-21 Nov, 16-17 Nov -5% min 2, 1-20 Dec 0% min 3; 5 Dec orphan £309; fwd30 75.0% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback (occupancy.md)."},
{"ref":"P04","base":"200, was 220 (rec 221)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"Reyhan cut it 9 Nov 21:26:45Z (-£253 next 30); November now -34% to -48% vs comps vs supported -15% (qp -0.15); December -5% median (supported); 46.7% vs 24% (comp-east; pricelabs C1; market §2)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 43%; open December P25; qp +0.15; recommend +25%; base -4.3% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 7 of 12 non-blocked nights booked (58.3% vs 49%); base -11.9% vs P50 (pricelabs M3)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"93.8% vs 37% to the 26 Nov handback (occupancy.md)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"46.2% vs 48% ex block; comps P0-P17 (-26% to -45%); recommend +5%; levers are Reyhan's -3% and Booking.com visibility (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"53.3% vs 42%; pace30 -27.6%; open nights band P33-P100 with qp -0.15; base +38.5% vs P50; handback 13 Dec (comp-east; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"80.0% vs 43% (+37 pts); open December at comp P50-P86 (comp-west)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 46%; P100 / +28% to +95% vs comps at £450 (comp-central; pricelabs M1)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"75.0% vs 38% (30d), 55.2% vs 31% (60d); 0 reviews; base +31.0% vs P50 (comp-west; pricelabs M3)."}
]}
```

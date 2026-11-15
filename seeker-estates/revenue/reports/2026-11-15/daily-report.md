# Seeker Estates - Daily revenue report, 2026-11-15 (Sunday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-15/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-15/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-14/daily-report.md` and its JSON, the dashboard action list (15 Nov, before this step), the full id list, and the overnight brief (Dispatcher: `reservations.csv` 15 Nov vs 14 Nov, full-row diff).
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move, as applied in the comp sections. PriceLabs min/base/max come from `kpi_pack` `settings` (15 Nov). No base, min, max or push setting changed since 14 Nov (pricelabs, live `get_listing_data`; `get_user_logs` 0 entries on 14-15 Nov for listing, group and account).
- I used no guest data and no booking reference numbers. I made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 block change of 12 Nov and the 15-21 Nov opening are still your questions (t-p06-2229open, t-p06-1521open), not opportunities. P06 numbers are reported; no P06 price proposal is made unless you confirm.
- P14 is numbers only. Reyhan's minimum 450 (vs your £500 special setup) stays in the confirm-or-revert list.
- P13 is one flat (3064856 + 3090701).
- **P04 "never open for fewer than 3 nights" is respected.** No min-1 or min-2 proposal on P04 (24 Nov orphan and 18-19 Nov are numbers only). The Smoobu min 2 on 18-19 Nov is reported as a conflict for you.
- Not raised again: Booking.com +10% markup (12 Nov), Visibility Booster commission (P13 18-23 Dec is inside the booster window), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, **P12 17 Nov** (excluded from a-p12-trim today), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 (fully out), P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - No proposal removes or reduces a Booking.com promotion. The P12 and P13 stacks, and the fact that Booking.com now nets less than Airbnb on both, are reported for size only.
  - Proposals that lower a PriceLabs price are marked "your call": a-p12-trim, t-p12-26nov-price and the P05 21/29 Dec reset in a-p05-dec.
  - Reyhan's edits that cross your decisions are framed as **confirm or revert**, not re-proposed.

## Corrections and conflicts resolved between sections

1. **The manual Smoobu writes are back (new t-smoobu-manual-1415; t-smoobu-manual-1213 stays closed).**
   - pricelabs C1: after the 14 Nov 08:42Z PriceLabs push, something wrote other values into Smoobu on the first open nights of three flats. `get_user_logs` 0 entries; no fixed-price DSO; `push_enabled` true; the same push landed on every later date.
     - **P06 15-17 Nov:** Smoobu 222/222/233 (£677) vs PriceLabs 247/249/254 (£750) = **-£73**. These are **exactly the 12 Nov manual values**.
     - **P20 15-17 Nov:** Smoobu 200/200/210 (£610) vs PriceLabs 232/223/239 (£694) = **-£84**; 15-16 Nov sit **at the £200 PriceLabs min**. New round values.
     - **P04 18-19 Nov:** Smoobu 175/165 (£340) vs PriceLabs 155/158 (£313), **higher by £27, and min stay cut 3 -> 2.** Airbnb (synced) now sells **18-20 Nov as a 2-night stay** at £247.09 room = 0.727 x Smoobu (channel §2). This breaks your P04 min-3 rule.
   - Airbnb confirms guests see the Smoobu values: P20 16-18 Nov £464 all-in = £150 + 0.766 x £410 (comp-west); P06 16-18 Nov £477.07 = 0.765 x (£222 + £233) + £129 (comp-central).
   - comp-west and comp-central: at these Smoobu levels **P20 16-18 Nov is P0 of 4 (-19.9%, 5.7% under the 0-review line)** and **P06 16-17 Nov is P31 / -25% of the wider 32**: the cheapest of the comps.
   - **P11's 9 "mismatches" in kpi_summary are not manual.** They were a pricing lag: PriceLabs refreshed and pushed P11 at 07:08:47Z, after the raw file was read, and live Smoobu = live PriceLabs on all 26 open nights 15 Nov-14 Jan (pricelabs C1).
   - **P06 22-23 Nov (271/239) is the PriceLabs push, not a manual cut.** comp-central read the 23 Nov drop (£290 -> £239) as a Smoobu cut with no log; pricelabs shows the 08:42Z push landed there (`user_price` 282/290 is the previous read).
   - Who: UNKNOWN (Smoobu has no user field). P04/P06/P20 cross 24 h since last push at about 08:42Z today; that push should overwrite them, as on 13 Nov.
2. **P04 Airbnb 20-24 Nov came through the synced listing, priced at 0.765 of £640.**
   - channel and comp-east: the booking is in Smoobu on 3562176 via the Airbnb channel; its £142 cleaning is the synced listing's fee; synced 1657859794156786222 is no longer returned for 20-24 Nov. occupancy and pricelabs left the listing NOT CHECKED. **I use channel/comp-east: synced.**
   - Ratio: PriceLabs pushed P04 at 14 Nov 08:42Z, before the 20:29 booking, so Smoobu at booking = £640 (161/164/158/157). Paid £489.59 = **0.765 x £640** (1p off). The 0.795 ratio uses the pre-push 07:19Z read (£616) and is not the price at booking.
   - pricelabs noted "Cancellation Host Fee / Payout" element names on a record typed "modification of booking". Smoobu counts it confirmed and Airbnb no longer offers the synced listing for those nights, so I treat it as live. The element naming is NOT CHECKED.
3. **P13 18-23 Dec Smoobu at booking: £1,067** (channel, market, comp-west: 14 Nov Smoobu/PriceLabs 216/219/204/213/215). pricelabs M1 used PriceLabs `booked_price` £1,055. I use £1,067: paid **0.794 x Smoobu, 0.720 x the ceil x 1.10 list £1,176**. Reyhan's -5% cost about **£45 of room** on either base (pricelabs H3 £45; comp-west £891.70 at 0% vs £847.10 = £44.60).
4. **P13 commission: channel 18.02%, comp-west 21.2%. Same money, different base.** £179.64 / (£847.10 room + £150 cleaning) = 18.02%; / £847.10 room = 21.2%. Policy and the booster are measured on room + cleaning, so it is **the 18% Visibility Booster, expected** (check-in 18 Dec is inside 21 Oct-20 Dec). Not flagged.
   - Same for P12: channel 15.00% of room + cleaning, comp-east 16.6% of room only. **Standard commission; no booster on Mile End.** comp-east's booster question is closed.
5. **P11 forward:** Smoobu 56.7% (17/30; occupancy), PriceLabs 57% (pricelabs H2), market section 60% (`pl_kpis`). I use Smoobu 56.7%. The fall from 60.0% is the window roll only.
6. **P20 forward:** occupancy 64.3% (18/28 non-blocked) vs comp-west 60.0% (18/30, counting 18-19 Nov as open). I use 64.3%.
7. **P20 5 Dec Airbnb factor:** comp-west applies 0.90 ("December factor"); 5 Dec is 20 days out, inside channel's 0.765 tier (up to 28 d). I use 0.765.
8. **P12 pace:** handback-aware to 13 Dec **-8.0% (-5 n / -£360.62)**, On track (occupancy). kpi_pack `pace_30` -10.8% includes 14 Dec 2025 (1 STLY night) with no 2026 inventory. I use -8.0%.
9. **Missed compression +£121 is mostly a fortnight artefact** (market §4): P11 14-17 Dec +£93 because PriceLabs repriced the booked 11-12 Dec nights about +22% after registering the stay, which lifted the fortnight 247 -> 272 while our open prices moved +9/-2/-1/+1. The only real new cut is P20 23 Nov 245 -> 214.
10. **Rate leak (kpi_pack) is overstated by VAT** (channel §6): corrected P04 -1.0%, P11 -7.7%, P12 -20.7%, P13 -36.1% (pack -17.5% / -23.1% / -33.2% / -42.0%).

## Executive summary

1. **Manual Smoobu writes recurred after yesterday's push** (correction 1). P20 15-17 Nov -£84 (at the £200 floor) and P06 15-17 Nov -£73 (the 12 Nov values) make both flats the cheapest of their comps. P04 18-19 Nov is higher but at min 2, which breaks your min-3 rule. New **t-smoobu-manual-1415**. Who did it: UNKNOWN.
2. **P04 Barking: one new Airbnb sale, and the double-booking risk is now real.**
   - 20-24 Nov sold at **£489.59 = 0.765 x Smoobu (-£150.41 vs policy)**. a-airbnb-rules is now **£3,056.70** (day 17).
   - All-in £157.90/n is **-25% to -34% vs comps** (comp-east). The PriceLabs room (avg £160) was inside the supported range; the gap is the Airbnb-side 0.765 layer.
   - **The unsynced listing 1455876748739910219 is still bookable for the same, already-sold 20-24 Nov at £679.16** (channel) / £680 (comp-east). A booking there would not reach Smoobu. **Critical: block 1455's calendar today** (t-p04-doublebook, day 16).
   - PriceLabs has not registered the stay (pricelabs C2). It leaves a 24 Nov 1-night orphan (min 3; numbers only under the P04 rule).
3. **Two Booking.com sales: P12 fills to its handback, P13 sells Christmas nights low.**
   - **P12 7-14 Dec £1,432.42** (£204.63/n). Exact stack: ceil(Smoobu x 1.10) x **Weekly 0.85 x 0.9 x 0.9 x 0.95** = 0.654 of list (channel §1). **Genius L2&3 15% did not apply.** -10.4% vs band (P27), inside the supported -15% to 0% (comp-east). **Pace -37.8% -> -8.0%: P12 is On track.** The December parts of a-p12-trim close.
   - **P13 18-23 Dec £847.10** (£169.42/n) = **0.720 of list**. Policy-listed Mobile x Genius L1 would give £952.56; paid is £105.46 below, **one layer unidentified**. **P0 of the kept comps (-4.1%), P6 of 17 wider.** Sold inside Reyhan's -5% (about £45). Registered on 3064856, **not on twin 3090701**.
   - **Booking.com now nets less than Airbnb at the same lead** (channel §6): P12 £61.21 vs £64.64, P13 £65.10 vs £68.45 per £100 Smoobu. Reported only: per your direction, no Booking.com discount change.
   - Since 24 Oct: **16 confirmed / 70 n / £11,571.01**; 8 of 24 cancelled (33%); 4 bookings since +10%, all confirmed.
4. **PriceLabs sync: fixed for P11/P06/P12 (t-pl-sync-1411 done); new gaps on P04 and the P13 twin.**
   - P11 occupancy 33% -> 57%; PriceLabs repriced open nights **+£301 on 14 nights** (pricelabs H2).
   - Not registered: **P04 20-24 Nov** and **P13 3090701 18-22 Dec** (new t-pl-sync-1511).
   - P11 December-January open stays are still **-15% to -27% vs comps at list all-in** (comp-central): the darts nights 14-17 Dec average **£221 Smoobu** vs about £333 median-level and your >£300. Reyhan's -3% is your call. 8 Dec orphan (£86); 3 Jan £173.
5. **Standing items.**
   - P13 Christmas: **23-26 Dec back to 0% and 10-12 Dec +5-10%** supported (a-peak-check, £63). January twins identical on 15-17 Jan.
   - P04 December: **+10% on 6-13 Dec, +5% on 14-17 Dec** supported (14 Dec cut 175 -> 155 by the algorithm).
   - P01 18-20 Dec block (£697); P20 20-21 Nov +15.8% once you confirm delivery (£38); P20 5 Dec orphan day 6 (£147).
   - a-discount-cut **£280 next 14 / £1,445 next 30** (£761 expected). Missed compression **17 n / £540** (mostly artefact).
   - 18 Oct base rises: **+21 n / +£6,109.72 like-for-like**; P12 +11 / +£1,660.21.

**Last 30 nights (16 Oct-14 Nov, 13 units):** occupancy **60.8%**, ADR **£173.88**, RevPAR **£105.67**, revenue **£41,210.28**, **237 nights** (kpi_pack `portfolio_last30`, exact). Yesterday: 61.3% / £172.34 / £105.61 / £41,189.17 / 239 n.

**Next 30 (15 Nov-14 Dec):** **60.9%** booked (154/253; yesterday 58.9%, 152/258). **Next 60 (15 Nov-13 Jan):** **49.9%** (216/433; yesterday 47.7%).
- Source: occupancy section, live Smoobu GET 07:20:38Z, handback-aware.
- Excluded: policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov, nights after each handback.
- Reconciliation: new bookings +11 (P04 +4, P12 +7; P13 is outside 30 days); cancellations 0; 14 Nov out -9; 14 Dec in +0. 152 + 11 - 9 = 154.

**7-day pickup (bookings made 9-15 Nov, to 07:20Z):**
- Gross: 9 bookings / 45 n / £7,610.00. Still confirmed: 6 / 30 n / £5,247.83 (= kpi_pack `pickup_7d` sum).
- Cancelled in the window: 6 / 27 n / £4,277.28.
- **Net: +22 n / +£3,332.72** (yesterday +12 n / +£3,525.78). 8 Nov leaving the window -6 n / -£2,962.17 (P05 15-21 Dec); new bookings +16 n / +£2,769.11.

## The three overnight bookings

**Source:** occupancy, pricelabs C2/H1/M1, channel §1-§2, comp-east, comp-west, market §2. Room = Smoobu basePrice (Booking.com includes VAT).

| Flat / stay | Room paid | Smoobu at booking | Paid / Smoobu (list) | Comps (same dates) | In PriceLabs? | Left behind |
|---|---|---|---|---|---|---|
| **P04** Airbnb 20-24 Nov (4 n, 6 d lead), synced listing | **£489.59** (£122.40/n); commission £97.90 = 15.5% of room + £142 cleaning (normal host fee) | 161/164/158/157 = £640 (after the 08:42Z push, which carries Reyhan's -5%) | **0.765** (policy expects 1.00 at 4 nights: **-£150.41**) | £157.90/n all-in: stored median £239.50 (n = 2) **P0 / -34.1%**; band £231.25 / £211.13 op-collapsed **-31.7% / -25.2%**; supported room £144-162/n (comp-east) | **No** (shows open, last refresh 14 Nov 08:42:40Z) | **24 Nov 1-night orphan** (£164, min 3); 18-19 Nov 2-night gap (Smoobu min 2); **1455 still sells 20-24 Nov** |
| **P12** Booking.com 7-14 Dec (7 n, 23 d lead) | **£1,432.42** (£204.63/n); commission £237.36 = 15.00% of room + £150 cleaning (standard) | 259/249/267/287/317/323/287 = £1,989 | **0.720** (0.654 of ceil list £2,190) = Weekly 0.85 x 0.9 x 0.9 x 0.95, exact to 1p | band £228.29 (n = 11) **P27 / -10.4%**; stored £242.79 (n = 2) -15.7%: **inside supported -15% to 0%** | Yes (05:48Z) | Nothing: fills 7-13 Dec to the handback |
| **P13** Booking.com 18-23 Dec (5 n, 34 d lead), on 3064856 | **£847.10** (£169.42/n); commission £179.64 = 18.02% of room + cleaning (booster, expected) | 216/219/204/213/215 = £1,067 (inside Reyhan's -5%) | **0.794** (**0.720** of list £1,176); no exact fit; Mobile x Genius L1 would be £952.56, paid £105.46 below | £199.42/n all-in: kept median £208 (n = 2) **P0 / -4.1%**; wider £288.80 (n = 17) **P6**; market P50 18-22 Dec £1,239, occ +8.4 to +20.0 vs STLY (market §2) | 3064856 yes; **3090701 no** (shows 18-22 Dec open at £1,166) | No orphan: 10-17 Dec 8-night run; 23-26 Dec 4-night run to the 27 Dec arrival |

- **P12 stack:** the two 10% layers are two of Last Minute (inside 30 d) / Mobile / Genius L1; which two is NOT CHECKED (extranet). The 0.95 fits occupancy pricing -5% for 1-4 guests (4 adults). Size: -£556.58 vs Smoobu (-28.0%), -£429.08 vs list after the weekly 15%. **Per your direction no change is proposed.** For scale only: removing the -5% layer would be +£75.39; one 10% layer +£159.16.
- **P13 stack:** Last Minute does not apply at 34 d; Early Booker, Domestic and EEA are off (policy, 21 Oct); occupancy is -0% at 5 guests. So the 0.720 needs a layer not in policy (channel §1). Black Friday 30% (bookable from 19 Nov) was not live. **Ask for the extranet breakdown** (new t-bcom-breakdown-1511).
- **Net to owner per £100 Smoobu** (channel §6): Booking.com P12 £61.21, P13 £65.10, P11 £62.47 (14 Nov) vs Airbnb same-lead 0.765 £64.64 / 5-night 0.810 £68.45; direct model £90 (unconfirmed). **Booking.com now nets less than Airbnb on P12 and P13.** Reported; under your direction the levers are PriceLabs prices and the Airbnb hidden layer, not Booking.com promotions.
- **P12 effect:** pace to handback **-37.8% -> -8.0%** (occupancy); classed On track. comp-east: the sale **closes the 7-10 / 7-11 / 11-14 Dec trims** in a-p12-trim; it came in about 28% under PriceLabs through the stack, and is still in the supported band.

## Manual Smoobu writes after the 14 Nov push (t-smoobu-manual-1415)

| Flat / nights | PriceLabs (live) | Smoobu (live) | Gap | Position at the Smoobu level | Policy |
|---|---|---|---|---|---|
| P06 15-17 Nov | 247/249/254, min 2 | **222/222/233** (= 12 Nov manual values) | -£73 | 16-18 Nov £239/n all-in: P31 / -25% of wider 32; P0 / -24% kept (n = 1) (comp-central) | Intentional-block listing: numbers only; opening still your question (t-p06-1521open) |
| P20 15-17 Nov | 232/223/239, min 3/2/2 | **200/200/210**; 15-16 Nov at the **£200 min** | -£84 | 16-18 Nov £232/n all-in: **P0 of 4 / -19.9%**, 5.7% under the 0-review line; back at PriceLabs level would be -13.0%, +2.4% over the line (comp-west) | Min 2 on 16-17 Nov is Reyhan's (vs policy min 3 to 30 Nov) |
| P04 18-19 Nov | 155/158, **min 3** | **175/165, min 2** | +£27 | 18-20 Nov £195/n all-in, -6% to -13% vs comps: **in range, hold price** (comp-east) | **Breaks "never fewer than 3 nights"**; Airbnb sells 18-20 Nov as 2 nights at 0.727 |

- PriceLabs' next push (due at about 08:42Z, when P04/P06/P20 cross 24 h) should overwrite them again, as it did on 13 Nov. **Check after 09:00Z:** Smoobu = PriceLabs on these 7 nights, and P04 18-19 Nov back to min 3.
- **Your decision on P04 18-19 Nov:** either revert to min 3 in Smoobu (policy), or keep it as a deliberate 2-night fill and update `policy.json`. I do not propose min 2.
- **Ask:** who edits Smoobu rates directly (Reyhan, a channel tool, another user)? It has now happened twice on the first open nights after a push.

## Reyhan's changes, for you to confirm or revert

**Source:** pricelabs H4 and `get_user_logs`. **0 PriceLabs log entries since 11 Nov 17:16:47Z.** Every 9-11 Nov setting is still live. `policy.json` records none of them.

| # | Ref / setting | Your standing decision | Today's evidence | My read |
|---|---|---|---|---|
| b1 | **P04 base 220 -> 200** | Pack/`id_map` 220 | 20-24 Nov sold at -25% to -34% vs comps; 6-14 Dec -17% to -26%; `recommend` 30d and 60d raise +10% (comp-east); base +12.4% vs P50 (pricelabs M3) | **Revert to 220 recommended.** £2,119 (13 open nights next 30, pricelabs H3) x 0.10 x 0.567 = **£120** (upper bound) |
| b2 | **P11 22 Nov-18 Dec -3%** (darts) | Darts +5% "leave as it is" (24 Oct); average above £300 (21 Oct) | 14-17 Dec Smoobu 214/220/215/235 = **£221 average** (occupancy); comps support about £333 (comp-central: 14-18 Dec P0 / -41% room, list -27%); market -6.3 to +1.8 vs STLY (soft); gap to policy £334 | **Against your decision: confirm or revert.** Revert to +5% on 14-18 Dec: £1,170 x (1.05/0.97 - 1) x 0.762 x 0.483 = **£36**. Even reverted the average stays under £300; the rest is a-discount-cut (P11 £551) |
| b3 | P04 15-17 Nov min 2 | Never under 3 nights | Booked: no exposure | Confirm or revert so it is not copied forward |
| b4 | P04 18-24 Nov -5% | -8% on 1-25 Nov | 20-23 Nov sold at the -5% price; 18-19 Nov in range | **Confirm -5%** (no lower price supported) |
| b5 | **P04 6-22 Dec -5%** | Not covered | comp-east: **6-13 Dec -17% to -26%, +10% supported; 14-17 Dec -16% to -17%, +5% supported** (14 Dec cut 175 -> 155 by the algorithm at the 30-day Recency edge); 17-20 Dec in range; market 11-13 Dec +4.8 to +7.6 vs STLY | **Remove on 6-17 Dec, keep 18-22 Dec.** (£1,311 + £155) x 0.0526 x 0.567 + £538 x 0.0526 x 0.500 = **£58**. The other half of +10% on 6-13 Dec comes from a-discount-cut |
| b6 | **P13 10-26 Dec -5%** | Not covered; against a-peak-check | **18-23 Dec sold under it at P0 of kept comps (cost about £45)**; market +3 to +23 pts on the open nights, 6 of 12 under P50 (market §2) | **Revert on 10-12 and 23-26 Dec** (row 12) |
| b7 | P05 29 Nov-2 Dec -5% | Not covered | 29 Nov-3 Dec P25 / -14% vs comps (comp-central) | Confirm or revert. Not re-quantified |
| b8 | P05 21 / 29 Dec +300% min 1; max 3,500 | Not covered | £2,066 / £2,557 (2.3 x market P90; n = 0 qualifying comps) | Confirm intent (row 8) |
| b9 | P12 15-20 Nov and 30 Nov-3 Dec +5% | None | 17-19 Nov +13.3% (P78); **30 Nov-3 Dec +7.8%, 1-3 Dec +17.8% (P90)** after an algorithm rise of about 11% overnight (comp-east) | Your call (row 16): revert on 18 Nov and 30 Nov-3 Dec |
| b10 | P20 min 2 on 16-17 and 22-24 Nov; base 330 | Min 3 to 30 Nov; base 350 | Smoobu shows 22-24 Nov min 2 (channel §5) | Confirm or revert |
| b11 | P14 min 500 -> 450 | `special_setups.P14` | 68 of 180 open nights at £450 (pricelabs M2); P100 / +49% to +111% (comp-central); 0% vs 49% | **Conflicts with your special setup:** confirm 450 (and update policy) or revert. No proposal |
| b12 | P06 15-17 Nov -10% | Intentional block (numbers only) | PriceLabs 247/249/254 sits **above** uncustomized 198/220/237 despite the -10% (cause UNKNOWN, pricelabs H4); Smoobu shows the manual 222/222/233 | Numbers only (row 3) |

**If you revert as recommended** (P04 base, P11 darts, P04 6-17 Dec): £120 + £36 + £58 = **£214** (upper bound). P13 is in row 12 (£63).

## Base review

`base_price` is unchanged on every listing since 10 Nov (pricelabs). Base vs market P50 is from pricelabs M3 (14 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 253 | 100% of 15 non-blocked nights to the 20 Dec handback; base -4.5% vs P50 | **Hold; off the agenda.** 18-20 Dec is a block question |
| P04 | **200 (was 220)** / none in pack | 56.7% vs 24% (Smoobu); 20-24 Nov sold -25% to -34% vs comps; 6-14 Dec -17% to -26%; base +12.4% vs P50 | **Conflict: confirm 200 or revert to 220.** I recommend reverting |
| P05 | 550 / 537 | 66.7% vs 46%; 7-8 Dec P25 / -19%, 13-14 Dec P0 / -23%; qp +0.15; `recommend` +25%; base -6.0% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 353 | 60.0% of 15 non-blocked vs 51%; base -14.2% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 100% to the 26 Nov handback | **Hold; off the agenda** |
| P11 | 286 / 281 | 56.7% vs 51%; Dec-Jan open stays -15% to -27% at list all-in, P0-P14 at room; `recommend` +5% 30d / 60d; base -2.1% vs P50 | **Hold 286.** No cut supported. Levers: a-discount-cut, the darts override, orphan rules |
| P12 | 284 / 284 | 69.0% to handback vs 44%; **pace -8.0% (On track)**; 9 open nights +8% to +27% vs band; base +37.2% vs P50 | **Hold 284; correct the open nights with DSOs** (a-p12-trim) |
| P13 | 250 / 239 | 73.3% vs 46%; 60d 56.7% vs 38% | **Keep 250 and record it in policy** |
| P14 | 525 / 503; min 450 | 0% vs 49%; P100 | **Numbers only** (special setup) |
| P20 | 330 (your 350) / 354 | 64.3% vs 40%; 43.1% vs 31% (60d); 0 reviews; base +29.4% vs P50 | **Conflict: confirm 350 or record 330** |

## What changed since 14 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): recomputed in full (occupancy, same method)
| Group | Net since the rise |
|---|---|
| **Raised, like-for-like** (excl. both P06 stays on reopened nights) | **+21 n / +£6,109.72** (yesterday +14 / +£4,677.30) |
| Raised, including P06 | **+30 n / +£7,976.33** (made 27 / 104 n / £22,611.65; cancelled 13 / 74 n / £14,635.32) |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 (unchanged) |
| P13 (base 235 -> 250, not in policy) | +24 n / +£4,242.06 (was +19 / +£3,394.96) |
| P04 | +50 n / +£2,115.38 (was +46 / +£1,625.79) |

\* P20's base was cut twice, so it is not a clean control.

- **Per raised flat:** P01 **0 n / £0**; **P05 +12 / +£4,915.21**; P06 +15 / +£3,212.38 (like-for-like +6 / +£1,345.77); P09 -3 / -£244.70; **P11 -5 / -£1,566.77** (unchanged); **P12 +11 / +£1,660.21** (was +4 / +£227.79: the new 7-14 Dec stay, +7 / +£1,432.42).
- **Reading:** without P05 the raised group like-for-like is +9 n / +£1,194.51 (yesterday +2 / -£237.91). The whole day-on-day move is one P12 booking sold at 0.720 x Smoobu. Hold the bases.
- **Caveat:** the rise cannot be separated from the 24 Oct and 12 Nov markup changes, Booking.com promotions, Reyhan's overrides or the P06 block changes. n = 1-9 bookings per flat.

### Per property
| Ref | Change since 14 Nov |
|---|---|
| P01 | No change. 18-20 Dec still blocked at 269/268/237 (£774); if reopened £307.67/n = P14 / -16.8% vs stored median £369.67 (n = 7), P25 / -9.3% vs band; parity supported. 100% of 15 non-blocked nights. Base-rise 0. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy stale since 24 Feb. |
| P04 | **New Airbnb 20-24 Nov £489.59 (0.765 x £640, -£150.41; -25% to -34% vs comps)**, synced listing; not in PriceLabs. **1455 bookable on the sold 20-24 Nov (£679.16)** and every other open run. 24 Nov new orphan (min 3). 18-19 Nov Smoobu 175/165 min 2 (manual write; Airbnb sells 2 nights). 14 Dec cut 175 -> 155 by the algorithm. 6-13 Dec +10% / 14-17 Dec +5% supported. Weekly 18% (£59.21 over policy on 6-19 Dec). Fwd30 56.7% vs 24%. |
| P05 | No edit. 21 Dec £2,066 / 29 Dec £2,557 (+300% min 1); 7-8 Dec £912 (P25 / -19%); 13-14 Dec £971 (P0 / -23%; Airbnb card fell £539.50 -> £501.50 as 13 Dec entered the 0.765 tier). Early booking 12% and LOS 10% still visible. Fwd30 66.7% vs 46%. |
| P06 | PriceLabs registered 24-29 Nov (t-pl-sync-1411 fixed). **15-17 Nov Smoobu back to the 12 Nov manual values** (222/222/233 vs PriceLabs 247/249/254). 22-23 Nov 271/239 (PriceLabs push; P0 / -15% kept). 29 Nov orphan £258 min 4. Fwd 60.0% of 15 non-blocked. |
| P08 | Handed back. |
| P09 | No sellable night before the 26 Nov handback. |
| P10 | Booked to the 18 Nov handback. |
| P11 | No booking or cancellation. PriceLabs registered both stays (occupancy 33% -> 57%); open nights **+£301 on 14 nights** (2-4 Dec 192/211/259 -> 247/263/318). Dec-Jan stays still -15% to -27% at list all-in; darts 14-17 Dec average £221. 8 Dec orphan £199. 3 Jan £173. Fwd30 56.7% vs 51% (window roll). |
| P12 | **New Booking.com 7-14 Dec £1,432.42 fills to the handback; pace -37.8% -> -8.0% (On track).** 30 Nov-3 Dec rose about 11% overnight with no edit (267/297/299/307; +7.8% vs band, 1-3 Dec +17.8%). 17-19 Nov +13.3% (P78). 26 Nov £303 (P100 +26.6%). Base-rise +11 / +£1,660.21. |
| P13 | **New Booking.com 18-23 Dec £847.10 (0.720 of list, P0 kept / P6 wider)**; registered on 3064856, not 3090701. 10-13 Dec cheaper twin P0 / -21.6%; 23-26 Dec P67-P100 kept but P18-P20 wider. Twins identical 15-17 Jan; 45 identical open nights (from 47). Fwd30 73.3% vs 46%. |
| P14 | Min 450; 68 of 180 open nights at £450; P100 / +49% to +111%; 0% vs 49%. Numbers only. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **15-17 Nov Smoobu 200/200/210 (manual write; 15-16 Nov at the £200 min), P0 of 4.** 20-24 Nov £213.75/n all-in P0 / -27.8% (comps flat); 23 Nov cut 245 -> 214 by the algorithm. 5 Dec orphan £298 min 3 (6th day). 15 Nov tonight unsold. Fwd30 64.3% vs 40%. |

### Open plan items: status today
| Item | Status 15 Nov (evidence) |
|---|---|
| t-pl-sync-1411 | **Done: fixed.** P11 28 Nov-1 Dec and 9-13 Dec Booked, occupancy 57%; P06 24-28 Nov Booked; P12 7-13 Dec Booked (pricelabs H2, occupancy) |
| t-pl-sync-1511 (new) | P04 20-24 Nov and P13 3090701 18-22 Dec not registered |
| t-smoobu-manual-1415 (new) | Manual Smoobu writes on P06/P20/P04 after the 14 Nov push (t-smoobu-manual-1213 stays closed) |
| t-bcom-breakdown-1511 (new) | P13 unidentified layer; P12 which two 10% layers |
| a-p12-trim | December parts closed by the 7-14 Dec sale; November and 30 Nov-3 Dec still open |
| a-airbnb-rules | Not fixed, day 17; £3,056.70 |
| t-p04-doublebook | Not fixed, day 16; now sells already-booked nights |
| a-discount-cut | Not done; £280 / £1,445 |
| a-peak-check | Not done; 18-23 Dec sold under the -5% (about £45) |
| t-p20-5dec-orphan | Not fixed, 6th day |
| t-p11-8dec-orphan | Not fixed |
| t-p20-delivery, t-p01-1820block, t-p06-1521open, t-p06-2229open | Unchanged; your questions |
| Others | Unchanged; numbers refreshed in the JSON |

## Actions - 2026-11-15

**Ranking:** time-bound rows first (on sale tonight or already sold twice), then critical rows, then rows by expected £, then rows that cannot be quantified.

**Expected effect** = £ change on open nights x the observed channel factor x the flat's booked share from Smoobu (occupancy.md, handback-aware). Airbnb factor (channel §4): 0.765 up to 28 d, 0.900 at 29-59 d. P11 (Booking.com only): 0.762 (paid / Smoobu on the 14 Nov stays). P04: booked share only (same method as yesterday). Upper bounds; elasticity is not measured.
- Booked share, next 30: P04 0.567, P05 0.667, P06 0.600, P11 0.567, P12 0.690, P13 0.733, P20 0.643.
- Booked share, next 60: P04 0.500, P05 0.633, P11 0.483, P13 0.567, P20 0.431.

**Bounds** (`kpi_pack` settings, 15 Nov): P01 £120-650; P04 £90-2,000; P05 £150-3,500; P06 £200-800; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P14 £450-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P20 P06 P04 | **NEW t-smoobu-manual-1415 (critical, today).** (a) After the next PriceLabs push (about 08:42Z), check that Smoobu = PriceLabs on P20 15-17 Nov (232/223/239), P06 15-17 Nov (247/249/254) and P04 18-19 Nov (155/158). If not, Sync Now on 3547481 / 3288517 / 3562176. (b) **P04 18-19 Nov min 2: confirm or revert to min 3** (policy). (c) Tell us who writes Smoobu rates directly. | Smoobu > Rates (Waterford, Marylebone, Barking); PriceLabs > Sync Now | pricelabs C1: P20 -£84 (15-16 Nov at the £200 min), P06 -£73 (= 12 Nov values), P04 +£27 with min 2; 0 log entries; push landed on later dates. comp-west: P20 16-18 Nov P0 of 4 / -19.9%; comp-central: P06 P31 / -25%; channel §2: Airbnb sells P04 18-20 Nov as 2 nights | P20 only (P06 is numbers only): £84 x 0.765 x 0.643 = **£41** (15 Nov lapses tonight) | Corentin | 2026-11-15 |
| 2 | P04 | **t-p04-doublebook (critical, day 16, now live).** On 1455876748739910219, **block every date now, starting with 20-24 Nov (already sold on the synced listing)**, or snooze/unlist it; then map it to Smoobu 3562176 (keeps 4.69 (26)). | Airbnb host 551951609 > 1455876748739910219 > Calendar | channel §3: 20-24 Nov **bookable at £679.16** while booked in Smoobu; 6-19 Dec £2,275.22; comp-east: bookable on all 11 runs (18-21 Nov £571, 6-13 Dec £1,291) | Not quantified (exposure = any booking on 1455 plus relocation cost; 20-24 Nov would be a certain double booking) | Corentin | 2026-11-15 |
| 3 | P06 | **t-p06-1521open (confirm; not a proposal; 15 Nov is tonight).** Is the opening of 15-21 Nov intended? **If yes:** record it in `policy.json` and let PriceLabs' level stand (row 1 clears the manual 222/222/233). **If no:** re-block 16-17 Nov. | Smoobu > Calendar > Marylebone; `policy.json` | comp-central: 16-17 Nov £239/n all-in, P31 / -25% of 32; supported -2% vs median (qp -0.016); `recommend` +5% (30d); pricelabs C1/H4 | If confirmed, 16-17 Nov at PriceLabs: (£503 - £455) x 0.765 x 0.600 = **£22** | Corentin | 2026-11-15 |
| 4 | P04 P13 | **NEW t-pl-sync-1511.** PriceLabs **Sync Now** on 3562176 (P04) and 3090701 (P13 twin). Check: P04 20-23 Nov show Booked and `last_date_pushed` after 08:42Z; 3090701 18-22 Dec show Booked or Blocked. | PriceLabs > 3562176 / 3090701 > Sync Now | pricelabs C2 (P04 last refresh 14 Nov 08:42:40Z, before the 20:29 booking; 20-23 Nov open at £640); H1 (3090701 18-22 Dec open at £1,166; earlier linked stays registered on both); occupancy (kpi_pack P04 55.2% stale vs Smoobu 56.7%) | Not quantified (PriceLabs' occupancy reading on both listings is understated; no double sale because Smoobu is closed) | Corentin | 2026-11-15 |
| 5 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 17).** Remove the hidden rules: nights up to 28 d (0.765) and 29-59 d (0.900). Keep only the visible discounts (policy `airbnb_visible_discounts`). On Barking find also the extra 0.95 on 2-night stays; on Marylebone the extra 0.85 on 5 nights. P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §2/§4: **P04 20-24 Nov paid 0.765 (-£150.41)**; same tiers on P04, P06, P12, P13, P20 today; comp-east: P04 sale -25% to -34% vs comps while the PriceLabs price was in range | **Realised cost £3,056.70** (confirmed stays). Exposed on today's open cards: £498 (P06 £119.86, P12 £140.07, P04 £92.91, P20 £60.10 + £85.50) | Corentin | 2026-11-16 |
| 6 | P04 P05 P11 P20 | **a-discount-cut (your direction).** Set Occupancy profile and Booking Recency to **Custom 0%** (not "off") and Last-minute to 0% on P04, P05, P11 and P20. P11 live: Aggressive / Recency default 5-15% / last-minute 0% / far-out +30% (unchanged). **P12, P13 excluded** (P12 net -£168). On P04 this reverses the Recency cuts (6-13 Dec yesterday, 14 Dec today). | PriceLabs 3562176 / 3166592 / 3064196 / 3547481 > Customizations | pricelabs H3, next 30 (16 Nov-15 Dec): **P11 £551 (-15.1%)**, **P04 £498 (-19.0%)**, P05 £345 (-6.9%), P20 £131; total **£1,445 next 30 / £280 next 14**; four targets £1,525 / £559; comp-central: P11 Dec-Jan -15% to -27% at list; comp-east: P04 14 Dec 175 -> 155 | 551 x 0.762 x 0.567 + 498 x 0.567 + 345 x 0.765 x 0.667 + 131 x 0.765 x 0.643 = **£761 / 30 days** (upper bound) | Corentin | 2026-11-16 |
| 7 | P01 | **t-p01-1820block (confirm).** Was the extension of the gap block to the 20 Dec handback intended? Policy: gap block 30 Nov-17 Dec, then "maximise revenue normally". **If not:** end the block on 18 Dec so **18-20 Dec** sell at £269 / £268 / £237, min 3 (no price change). | Smoobu > Calendar > Bowsprit Point | comp-east Priority 3: £307.67/n = P14 / -16.8% vs stored median £369.67 (n = 7), P25 / -9.3% vs band £339.17; parity supported (qp 0; up to +9% supported) | £774 x 0.900 = **£697** (upper bound; P01 sold 100% of non-blocked nights) | Corentin | 2026-11-16 |
| 8 | P05 | **a-p05-dec.** **21 and 29 Dec (+300% min 1): meant to be blocked?** If so, block them in Smoobu. If they are meant to sell (your call: it lowers a price): **21 Dec +300% -> 0%** (uncustomized £707; market P75 £716) and **29 Dec +300% -> 0%** (uncustomized £1,046; P90 £1,101). **7-8 Dec DSO +3% -> +29%** (466/446 -> about 583/558) and **13-14 Dec +5% -> +31%** (492/479 -> about 615/599), per `recommend` +25%. | PriceLabs 3166592 > DSO 7-8, 13-14, 21, 29 Dec | comp-central: 7-8 Dec P25 / -19%, 13-14 Dec P0 / -23% (n = 4); qp +0.15; `recommend(0.667, 0.46, 0.19, 0.15)` = +25%; market §2: +£228 / +£191 to P75, occ +6.1/+1.7 and +13.0/+6.8; 21/29 Dec n = 0 qualifying comps, 2.3 x P90 | 7-8 Dec £228 x 0.765 x 0.667 = £116; 13-14 Dec (£123 x 0.765 + £120 x 0.900) x 0.667 = £135; 21 Dec £707 x 0.900 x 0.633 = £403: **£654** (upper bound). 29 Dec not quantified | Corentin | 2026-11-16 |
| 9 | P04 P11 P14 P05 P12 P13 P20 P06 | **a-p13-record: confirm or revert Reyhan's 9-11 Nov changes** (table above). Recommended: **P04 base 200 -> 220**; **P11 DSO -3% -> +5% on 14-18 Dec**; **P04 6-17 Dec -5% -> 0%** (keep 18-22 Dec); **P04 18-24 Nov keep -5%**; **P04 15-17 Nov min 2 -> 3**. Confirm or revert: P14 min 450, P05 max 3,500 and 29 Nov-2 Dec -5%, P20 min 2 and base 330 vs 350, P12 +5%. Then record the outcome in `policy.json`. | PriceLabs 3562176, 3064196, 3267077, 3166592, 2699998, 3547481; `policy.json` | pricelabs H4 + logs (0 entries since 11 Nov 17:16:47Z); comp-east (P04 sold -25% to -34%; 6-13 Dec +10%, 14-17 Dec +5% supported); comp-central (darts 14-18 Dec P0 / -41%); market §2 (darts gap £334) | P04 base £120 + P11 £36 + P04 Dec £58 = **£214** (upper bound) | Corentin | 2026-11-16 |
| 10 | P20 | **t-p20-5dec-orphan (6th day).** DSO **5 Dec min 3 -> 1**, keep £298 (outside policy's min-3 window, which ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` 1); comp-west: just under market P75 (£300), about 31% under the only 1-night comp (£431); Jingle Bell Ball 5-6 Dec (market §3) | £298 x 0.765 x 0.643 = **£147** | Corentin | 2026-11-16 |
| 11 | P11 | **t-p11-8dec-orphan.** DSO **8 Dec min 3 -> 1**, keep £199. | PriceLabs 3064196 > DSO 8 Dec | occupancy, pricelabs H3/H6: 8 Dec unsellable between the 5-8 and 9-14 Dec stays (`unbookable` 1); comp-central P0 / -21% vs kept median £253 (n = 3); market P50 £255, occ +5.6 | £199 x 0.762 x 0.567 = **£86** | Corentin | 2026-11-16 |
| 12 | P13 | **a-peak-check (conflicts with Reyhan's 11 Nov -5%: confirm or revert).** Both twins: DSO **10-12 Dec -5% -> +5%** (about +10.5%; 3090701 about £225-231); **23-26 Dec -5% -> 0%**; **hold 13-17 Dec at -5%**. Do not raise 3064856 more than 3090701 on 10-12 Dec. | PriceLabs 3064856 (copies to 3090701) > DSO | comp-west: 18-23 Dec sold at P0 of kept / P6 wider (cost of -5% about £45); 10-13 Dec cheaper twin P0 / -21.6%, P5 of 21 wider, `recommend` +10%; 23-27 Dec P67 kept (n = 3) but P18-P20 wider, 0% supported, +10% not (qp -0.15 on 3064856); market §2: open nights +3 to +23 pts, 6 of 12 under P50 | (3090701 10-12 Dec £613 x 0.105 + 3064856 23-26 Dec £892 x 0.0526) x 0.567 = **£63** | Corentin | 2026-11-16 |
| 13 | P20 | **t-p20-delivery (back to you).** Smoobu blocks 18-19 Nov only; 20-24 Nov is on sale. **Confirm delivery is 18-20 Nov so `policy.json listing_facts.P20.block_20_21_nov` can be updated.** If 20-24 Nov stays on sale: DSO **20-21 Nov -5% -> +10%** (about +15.8%); hold 22-24 Nov. | Smoobu > Calendar > Waterford; `policy.json`; PriceLabs 3547481 > DSO 20-21 Nov | comp-west: 20-24 Nov **£213.75/n, P0 of 6 / -27.8%**, 15.0% under the line; 22-24 Nov on the line (-0.5%); comps flat; channel §5: Airbnb sells 20-23 Nov £540.85 room; market soft (-5.6 to +1.7) | £492 x 0.158 x 0.765 x 0.643 = **£38** | Corentin | 2026-11-16 |
| 14 | P11 | **t-channel-gaps.** 3 Jan: DSO so the price is about **£194** (£173 now; fortnight £193). Hold 23 Dec at £281 (market -4.1, soft). | PriceLabs 3064196 > DSO 3 Jan | market §2-§4: 3 Jan +3.1 vs STLY, P50 £221; comp-central: 3-5 Jan P0 / -39% room, list -16% vs kept | £21 x 0.762 x 0.483 = **£8** | Corentin | 2026-11-16 |
| 15 | P06 | **t-p06-2229open (confirm; not a proposal).** Was shortening the Marylebone block to start 30 Nov intended? 24-29 Nov is sold and now registered. **If yes:** date note in `policy.json`; your call: DSO **29 Nov min 4 -> 1** (keep £258). **If no:** re-block 22-23 and 29 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517; `policy.json` | occupancy: 22-23 Nov sellable only as 22-24 Nov (£271/£239); 29 Nov orphan; comp-central 22-23 Nov P0 / -15% kept, supported about £310/n; who/why UNKNOWN | Not quantified (policy question) | Corentin | 2026-11-16 |
| 16 | P12 | **a-p12-trim (your call: lowers a price; reverses Reyhan's +5%).** December closed by the 7-14 Dec sale. Remaining: **18 Nov DSO +5% -> -5%** (270 -> about £244; 17 Nov excluded per policy); hold 19-20 Nov. **30 Nov-3 Dec +5% -> -5%** (267/297/299/307 -> about 242/269/271/278). Override of `recommend` (mechanical raise) with stay-level evidence: the raise ignores qp -0.15. | PriceLabs 2699998 (+Vrbo) > DSO | comp-east Priority 2: 17-19 Nov +13.3% (P78), 18-20 Nov +9.7% (P75); 17-20 / 17-21 Nov in range (hold); 30 Nov-3 Dec +7.8%, 1-3 Dec +17.8% (P90), 2-4 Dec +22.5% after an 11% algorithm rise; market: £312 above P75, occ -0.6 to -18.0 vs STLY | Not quantified (a cut) | Corentin | 2026-11-16 |
| 17 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -15%**, keep min 1 (£303 -> about £224). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £357 all-in, **P100 / +26.6%** (n = 5), NL >P90; supported room £203-239 | Not quantified (a cut) | Corentin | 2026-11-16 |
| 18 | P13 P12 | **NEW t-bcom-breakdown-1511 (question; no promotion change proposed).** Send the extranet price breakdown of the P13 18-23 Dec and P12 7-14 Dec reservations: which layer took P13 to 0.720 of list (not Mobile x Genius L1, not Last Minute at 34 d), and which two 10% layers applied on P12. | Booking.com extranet (Shepherd's Bush, Mile End) > Reservations | channel §1: P13 £105.46 below the policy-listed stack; P12 exact Weekly x 0.9 x 0.9 x 0.95; Genius L2&3 15% did not apply; channel §6: Booking.com nets £61.21 / £65.10 vs Airbnb £64.64 / £68.45 | Not quantified (no change proposed). Size: P13 -£219.90 vs Smoobu; P12 -£556.58 | Corentin | 2026-11-16 |
| 19 | P11 | **a-p11-bcom-stack (no change proposed).** Still only the ask: extranet breakdown of the 28 Nov-2 Dec and 9-14 Dec stays. | Booking.com extranet (Camden) | channel (14 Nov): exact ceil x 1.10 x 0.9 x 0.9 x 0.9 x 0.95; nets £62.47 per £100 | Not quantified | Corentin | 2026-11-17 |
| 20 | P05 | **t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% from 5 nights: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+ | channel §4: -£192.30 on 14-19 Jan | **£192.30** per 5-night stay | Corentin | 2026-11-17 |
| 21 | P05 | **a-p05-earlybird.** Visible 12% early booking (60+ d): yours, or 0%? | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §4: -£141.72 on 14-17 Jan | **£141.72** per such stay | Corentin | 2026-11-17 |
| 22 | P13 | **t-p13-los5 (confirm).** Visible 10% LOS 5+ on both twins: keep and record, or 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §4: -£88.29 / -£110.43 on 10-15 Dec | **£88.29** per 5-night stay (cheaper twin) | Corentin | 2026-11-17 |
| 23 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly **18% -> 15%**. | Airbnb 1657859794156786222 > Pricing > Discounts | channel §4: -£355.27 = 18.0% on 6-19 Dec | **£59.21** per 6-19 Dec stay | Corentin | 2026-11-17 |
| 24 | P13 | **t-p13-twins (from 15 Jan).** Restore a gap: DSO **3090701 about +3%** on 15 Jan-28 Feb (child only; set after any parent edit). | PriceLabs 3090701 > DSO | channel §4: 45 identical open nights (15 Jan-28 Feb); comp-west: 15-17 Jan identical `price` (193/195/186), 14-17 Jan P29 / -5.3%, +3% keeps 3090701 under its line (-1.4%) | Not quantified (duplicate-listing risk) | Corentin | 2026-11-17 |
| 25 | P11 P12 P13 P04 | **a-bcom-cancel (question).** Send the rate plan and reason for the 8 post-cut Booking.com cancellations. | Booking.com extranet > Reservations | channel §1: 8 of 24 (33%; £5,949.77 room); confirmed 16 / 70 n / £11,571.01 | Not quantified | Corentin | 2026-11-17 |
| 26 | P05 | **t-p05-1521-live (question).** Confirm on Airbnb that the 15-21 Dec stay (£2,962.17) is live. | Airbnb > Reservations | Smoobu type "modification of booking" | Not quantified | Corentin | 2026-11-17 |
| 27 | P11 P12 P13 | **t-cleaning-commission (question).** 3 entries (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32): accept or challenge? | Booking.com extranet > Finance | channel (12 Nov) | £22.50-£30.00 per booking | Corentin | 2026-11-17 |

**Closed today:** t-pl-sync-1411 (fixed for P11, P06 and P12). **New today:** t-smoobu-manual-1415, t-pl-sync-1511, t-bcom-breakdown-1511. t-smoobu-manual-1213 stays closed (not reopened).

## Top 5 for today
1. **Manual Smoobu writes are back after the 14 Nov push.** P20 15-17 Nov is £84 under PriceLabs (15-16 Nov at the £200 floor) and P06 15-17 Nov is £73 under (the exact 12 Nov values). At those levels both are the cheapest of their comps. P04 18-19 Nov is higher but at min 2, which breaks your min-3 rule; Airbnb now sells 18-20 Nov as 2 nights. New t-smoobu-manual-1415: check that the 08:42Z push overwrites them, confirm or revert P04's min 2, and tell us who edits Smoobu rates. Who did it: UNKNOWN.
2. **P04 Barking: the double booking is now live.** The new Airbnb 20-24 Nov stay paid £489.59 = 0.765 x Smoobu (-£150.41), taking a-airbnb-rules to £3,056.70 on day 17. That is 25-34% under comps. The unsynced listing 1455 is still bookable for those same sold nights at £679.16, so block its calendar today. PriceLabs has not registered the stay (t-pl-sync-1511). 24 Nov is an orphan (numbers only under the min-3 rule).
3. **Two Booking.com sales.**
   - **P12 7-14 Dec (£1,432.42)** fills to the handback. The stack is exact: x1.10 x Weekly 0.85 x 0.9 x 0.9 x 0.95, and Genius L2&3 15% did not apply. It sold at -10% vs band, inside the supported range. Pace moved from -37.8% to -8.0% (On track), and a-p12-trim's December parts close.
   - **P13 18-23 Dec (£847.10)** paid 0.720 of list through one unidentified layer. It sold at P0 of kept comps, and Reyhan's -5% cost about £45. It is not registered on twin 3090701. Commission is 18.02% of room + cleaning (= 21.2% of room), which is the booster.
   - Booking.com now nets less than Airbnb (£61-65 vs £64-68 per £100). This is reported only, under your keep-Booking.com-discounts direction.
4. **t-pl-sync-1411 is fixed.** P11 occupancy went from 33% to 57% and its open nights rose +£301. P11's December-January nights are still 15-27% under comps: the darts nights 14-17 Dec average £221 against about £333 at the median and your >£300 policy. Reyhan's -3% is your call (£36 if reverted). 8 Dec orphan: min 1 (£86). 3 Jan: £173 -> £194 (£8).
5. **Standing items.**
   - P13: Christmas 23-26 Dec back to 0% and 10-12 Dec +5-10% (£63).
   - P04: December +10% on 6-13 Dec and +5% on 14-17 Dec supported.
   - P01: 18-20 Dec block (£697).
   - P20: 20-21 Nov +15.8% after you confirm delivery (£38); 5 Dec orphan on day 6 (£147).
   - a-discount-cut £280 next 14 / £1,445 next 30 (£761 expected). Missed compression 17 n / £540, mostly a fortnight artefact.
   - Booking.com since 24 Oct: 16 confirmed / 70 n / £11,571.01.
   - 18 Oct base rises: +21 n / +£6,109.72 like-for-like (P12 +11 / +£1,660.21).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).**
  - Per night: 0.765 up to 28 d, 0.900 at 29-59 d, 1.000 from 60 d (channel §4, day 17). P04 20-24 Nov paid 0.765; P04 2-night card 0.727 (extra 0.95); P06 5-night booking 0.650 (extra 0.85).
  - The layer is now the single largest reason sold stays land under comps while PriceLabs is in range (P04 20-24 Nov, comp-east).
  - Target: **1.00x before visible discounts by 2026-11-20** (row 5).
- **Booking.com since the 24 Oct markup cut** (channel §1):
  - Gross 24 / 99 n / £17,520.78; **confirmed 16 / 70 n / £11,571.01**; 8 of 24 cancelled (33%).
  - Pace 1.10 a day gross, 0.74 confirmed (about 0.33 before the cut). **Since +10% (12 Nov): 4 bookings / 21 n / £3,748.42, all confirmed.** The markup is not stopping bookings.
  - Paid / Smoobu on the four: 0.762, 0.763, 0.720, 0.794: the stack takes 21-28% off Smoobu. Per your direction, the lever is the PriceLabs rate, not the promotions.
  - Targets: under 20% cancelled by 2026-11-30; confirmed paid / Smoobu at least 0.80x.
- **Net to owner per £100 base** (channel §6): Booking.com model £93.50 (booster £90.20); **observed P12 £61.21, P13 £65.10, P11 £62.47**; Airbnb at 0.765 £64.64, 0.810 £68.45, 0.900 £76.05, 1.000 £84.50; direct model £90 (unconfirmed). Every observed OTA stay nets below the direct model.
- **Review score** (Airbnb, ours vs comp median):

  | Ref | Ours (reviews) | Comp median |
  |---|---|---|
  | P12 | 4.27 (15) | 4.86 |
  | P13 3090701 / 3064856 | 4.7 (10) / 4.31 (13) | 4.76 |
  | P06 | 4.58 (12) | 4.62 |
  | P04 synced | **4.2 (10)** | 4.83 (unsynced 1455 has 4.69 (26)) |
  | P05 | 4.77 (35) | 4.26 |
  | P09 | 5.0 (3) | 4.56 |
  | P01 | 4.75 (4) | 4.8 |
  | P20 | 0 reviews | 4.8 |

  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - **The -0.15 cap binds on P12, synced P04 and P13 3064856.** It is why P12's open nights need trims, why P04's supported level is -15% vs comps, and why P13 Christmas is held to 0%, not +10%.
  - Fixes: P12 pre-arrival key-collection message (the process itself is settled); P13 3064856 cleanliness and photo accuracy; review requests after P20's first stays; map Barking 1455 to keep its 26 reviews.
  - Target: P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.**
  - **P11:** Dec-Jan open stays P0-P14 at room price; basement with a patio; 4 of 12 comps have a lift, 3 a terrace (comp-central). Booking.com CTR 0.81% vs 1.70% (21 Oct only). Titles (a-titles).
  - **P20:** 0 reviews; parking photo first; P0 of 4-6 on every November stay.
  - **P04:** the synced listing is 4.2 (10) vs 4.83; the unsynced one has 4.69 (26). Mapping 1455 (row 2) is both a risk fix and a conversion fix.
- **Gap fill / length of stay.**
  - Unsellable now: P11 8 Dec (row 11), P20 5 Dec (row 10), P06 29 Nov (row 15, policy), P04 24 Nov (P04 min-3 rule; numbers only). Soft blocks: P05 21 / 29 Dec (row 8).
  - Exact fits: P11 2-4 Dec (only 2-5 Dec), P06 22-23 Nov (only 22-24 Nov).
  - Policy min stay vs Smoobu, 2-4 months ahead below 5 nights: P11 45, P13 46 per twin, P05 42, P20 53, P04 45 nights (pricelabs H6). For you to confirm the policy still applies.
  - Systemic fix: an orphan-day rule (min 1 on 1-night gaps, P04 excluded). PriceLabs > Customizations > Orphan day: NOT CHECKED. Mid-term (91+ nights): NOT CHECKED.
- **Flexible-cancellation test** (P20, P06, P05 since 24 Oct; comparison due 7 Nov): NOT CHECKED, 8 days overdue. Source: Smoobu reservations by flat, 24 Oct-7 Nov vs the prior 14 days.
- **Direct share:** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30. With Booking.com netting £61-65 and near-term Airbnb £64.64 per £100, a direct guest at -10% (£90) is worth about 40% more to the owner.
- **Event compression** (market §4): **17 n / £540** (yesterday 19 / £419); bookable 14 / £489.
  - Most of the rise is a fortnight artefact (P11 14-17 Dec +£93; P20 16-18 Dec). Real new cut: P20 23 Nov 245 -> 214 (£27).
  - Where the market supports a raise: P05 7-8 / 13-14 Dec (+£228 / +£191 to P75; row 8); P13 10-17 and 23-26 Dec (+£159 to P50; row 12); P04 11-13 Dec (+£58; row 9) and 14-19 Dec (+£195 to P75; rows 6 and 9); P11 3 Jan (row 14).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **60.8%** (61.3% yesterday) | at least 68% while ADR rises | 2026-11-30 |
| ADR, last 30 | **£173.88** (£172.34) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£105.67** (£105.61) | £129 | 2026-12-18 |
| Revenue, last 30 | **£41,210.28** (237 n) | - | - |
| Booked next 30 (Smoobu) | **60.9%** (154/253) | each unit at least market + 10 pts (below: P11 56.7% vs 51%) | 2026-11-20 |
| Booked next 60 | **49.9%** (216/433) | at least market + 10 pts (P11 48.3% vs 39%) | 2026-11-20 |
| 7-day pickup, net | gross 9 bk / 45 n / £7,610.00; cancelled 6 / 27 n / £4,277.28; **net +22 n / +£3,332.72** | at least 10 bookings a week, net positive | 2026-11-20 |
| P12 pace vs STLY (to 13 Dec handback) | **-8.0%** (-5 n / -£360.62), On track (was -37.8%) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+21 n / +£6,109.72 like-for-like**; +30 n / +£7,976.33 incl. P06; P05 +12 / +£4,915.21; P12 +11 / +£1,660.21; P11 -5 / -£1,566.77 | positive without P05 (today +9 n / +£1,194.51) | 2026-11-26 |
| Booking.com since cut | **16 confirmed / 70 n / £11,571.01; 8 of 24 cancelled (33%)**; 4 since +10% | cancellations under 20% | 2026-11-30 |
| Booking.com net per £100 Smoobu | **P12 £61.21, P13 £65.10, P11 £62.47** (Airbnb same lead £64.64-68.45) | lever is PriceLabs, not promotions (your direction) | 2026-11-30 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 17; realised cost **£3,056.70** | 1.00x before visible discounts | 2026-11-20 |
| PriceLabs-side gap | **£1,445 next 30; £280 next 14** | £0 apart from your own overrides | 2026-11-20 |
| PriceLabs vs Smoobu | **7 open nights overwritten in Smoobu** (P06 3, P20 3, P04 2 with min 2); 2 bookings not registered (P04 20-24 Nov, P13 3090701 18-22 Dec) | 0 mismatches; all bookings registered | 2026-11-15 |
| Unsellable orphan nights (next 60) | **4** (P11 8 Dec, P20 5 Dec, P06 29 Nov (policy), P04 24 Nov (P04 rule)), plus P05 21 / 29 Dec at +300% | 0 outside P04 | 2026-11-16 |
| Double-sellable Barking stays | **every open P04 run plus the sold 20-24 Nov**, day 16 | 0 | 2026-11-15 |
| Missed compression | **17 n / £540**; bookable 14 / £489 | under 10 nights | 2026-11-20 |
| RGI | **UNKNOWN** (no comp occupancy; kpi_pack `rgi` null on every ref) | above 1.10 on every property | data by 2026-11-20; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.2-4.77; comp medians 4.26-4.86 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who wrote the P06 / P20 / P04 Smoobu rates and the P04 min 2 after the 14 Nov 08:42Z push:** UNKNOWN. Source: ask Reyhan / operations; Smoobu has no rate history or user field.
2. **P13 18-23 Dec Booking.com breakdown** (layer behind 0.720 of list) and **P12 7-14 Dec** (which two 10% layers): NOT CHECKED. Source: extranet reservation detail (Booking.com WAF 07:24:20Z, not bypassed).
3. **P04 Airbnb listing behind 20-24 Nov:** synced on strong evidence (cleaning £142, synced listing no longer offered), not confirmed by listing ID. The "Cancellation Host Fee / Payout" element names on that record: NOT CHECKED. Source: Airbnb reservation detail on the synced listing.
4. **Extra 0.95 on P04 2-night Airbnb cards and extra 0.85 on P06 5-night stays:** NOT CHECKED. Source: Smoobu > Channel Manager > Airbnb rules per flat.
5. **Why P06 15-17 Nov PriceLabs sits above uncustomized despite -10%:** UNKNOWN (account / group customizations NOT CHECKED). P04, P05, P20, P12, P13 customizations not read today.
6. **Cause of overnight algorithm moves** (P12 30 Nov-3 Dec +11%, P04 14 Dec -11%, P20 23 Nov -13%): NOT VERIFIED (no per-date factor breakdown in the API).
7. **Reyhan's -5% on P13 at the moment of the 18-23 Dec booking:** NOT CHECKED (no override history; assumed applied, as all three sections read it).
8. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
9. **Flexible-cancellation test result** (due 7 Nov): NOT CHECKED.
10. **Other:** Smoobu timestamp zone (UTC+1 inferred); P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; P13 Vrbo copy 24 h 28 min stale and P02 Vrbo stale since 24 Feb (should they push?); events are search summaries (alexandrapalace.com ENOTFOUND; RnB Winter Ball 13 vs 7 / 11-12 Dec, darts end 3 vs 4 Jan unresolved); PriceLabs `get_neighbourhood_data` failed for P20/P13 in comp-west (market section's retries succeeded); Barking Booking.com cleaning fee (£129 on the 14-18 Nov record) not on record.

```json
{"scoreboard":{"note":"15 Nov 2026. Last 30 nights = 16 Oct-14 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward and pickup from occupancy.md (live Smoobu GET 07:20:38Z, handback-aware); policy blocks, P01 30 Nov-20 Dec, P06 from 30 Nov, P20 18-19 Nov and nights after each handback excluded. Pickup = bookings made 9-15 Nov net of cancellations. P04 forward uses Smoobu (56.7%) because PriceLabs has not registered 20-24 Nov. P12 pace handback-aware to 13 Dec (kpi_pack 30-day -10.8% includes 14 Dec STLY). Base-rise like-for-like excludes both P06 stays on reopened nights. Airbnb ratios from channel §4 live searches 07:22-07:23Z. Booking.com stacks and net per £100 from channel §1/§6. Manual Smoobu writes from pricelabs C1. PriceLabs gap from pricelabs H3. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"60.8%"},{"label":"ADR last 30","value":"£173.88"},{"label":"RevPAR last 30","value":"£105.67"},{"label":"Revenue last 30","value":"£41,210.28"},{"label":"Nights last 30","value":"237"},{"label":"Booked next 30","value":"60.9% (154/253)"},{"label":"Booked next 60","value":"49.9% (216/433)"},{"label":"7-day pickup","value":"gross 9 bk / 45 n / £7,610.00; cancelled 6 / 27 n / £4,277.28; net +22 n / +£3,332.72"},{"label":"P12 pace vs STLY","value":"-8.0% (-5 n / -£360.62) to the 13 Dec handback; On track (was -37.8%)"},{"label":"Raised flats net since 18 Oct","value":"+21 n / +£6,109.72 like-for-like; +30 n / +£7,976.33 incl. P06; P05 +12 / +£4,915.21; P12 +11 / +£1,660.21; P11 -5 / -£1,566.77; P01 0"},{"label":"Booking.com since markup cut","value":"16 confirmed, 70 n, £11,571.01; 8 of 24 cancelled (33%); 4 bookings since +10% (12 Nov), all confirmed, 21 n, £3,748.42"},{"label":"Booking.com net per £100 Smoobu","value":"P12 £61.21, P13 £65.10, P11 £62.47 vs Airbnb same lead £64.64 / £68.45 (reported; keep Booking.com discounts)"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x from 60 d; day 17; realised cost £3,056.70"},{"label":"PriceLabs-side gap","value":"£1,445 next 30; £280 next 14"},{"label":"PriceLabs vs Smoobu","value":"7 open nights overwritten in Smoobu after the 14 Nov push (P06 -£73, P20 -£84, P04 +£27 with min 2); P04 20-24 Nov and P13 3090701 18-22 Dec not registered"},{"label":"Unsellable orphans","value":"P11 8 Dec, P20 5 Dec, P06 29 Nov (policy), P04 24 Nov (P04 rule); plus P05 21/29 Dec at +300% (soft blocks)"},{"label":"Double-sellable Barking","value":"1455 bookable on the sold 20-24 Nov (£679.16) and every open P04 run, day 16"},{"label":"Missed compression","value":"17 n / £540 (mostly fortnight artefact); bookable 14 n / £489"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-smoobu-manual-1415","status":"open","prop":"P20 P06 P04","priority":"critical","title":"New (t-smoobu-manual-1213 stays closed): Smoobu rates overwritten after the 14 Nov 08:42Z PriceLabs push, 0 log entries: P06 15-17 Nov 222/222/233 = the 12 Nov manual values (-£73 vs PriceLabs 247/249/254); P20 15-17 Nov 200/200/210 (-£84, 15-16 Nov at the £200 min), P0 of 4 / -19.9%; P04 18-19 Nov 175/165 (+£27) with min stay cut 3 -> 2, breaking the P04 min-3 policy (Airbnb sells 18-20 Nov as 2 nights at 0.727); check the ~08:42Z push overwrites them, Corentin to confirm or revert P04 min 2, and say who edits Smoobu rates; P20 £84 x 0.765 x 0.643 = £41","gbp":41},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 16) and now live: unsynced Barking Airbnb 1455876748739910219 is bookable for 20-24 Nov (£679.16), nights already sold on the synced listing, and on every other open P04 run (6-19 Dec £2,275.22; 6-13 Dec £1,291); block all dates now (20-24 Nov first) or unlist, then map to 3562176","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; Smoobu shows the manual 222/222/233 vs PriceLabs 247/249/254 (t-smoobu-manual-1415); 16-17 Nov £239/n all-in P31 / -25% of 32 wider; supported -2% vs median; if confirmed record in policy and let the PriceLabs level stand (16-17 Nov £22), else re-block; 15 Nov lapses tonight","gbp":22},
{"id":"t-pl-sync-1511","status":"open","prop":"P04 P13","priority":"high","title":"New: PriceLabs has not registered P04 Airbnb 20-24 Nov (3562176 last refresh 14 Nov 08:42:40Z, before the booking; 20-23 Nov shown open at £640) or the P13 18-23 Dec stay on twin 3090701 (18-22 Dec shown open at £1,166; registered on 3064856); Sync Now on 3562176 and 3090701; not quantified","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P04","priority":"critical","title":"Day 17, unchanged: remove hidden Smoobu Airbnb layers 0.765 (to 28 d) / 0.900 (29-59 d); new P04 20-24 Nov paid 0.765 x £640 (-£150.41; -25% to -34% vs comps while PriceLabs was in range); realised cost now £3,056.70; extra 0.95 on P04 2-night cards and 0.85 on P06 5-night unidentified; £498 exposed on today's open cards; P09 excluded (deprioritised)","gbp":3056.7},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap £1,445 next 30 / £280 next 14 (P11 £551 -15.1%, P04 £498 -19.0%, P05 £345, P20 £131); P11 Aggressive occupancy + Booking Recency default unchanged; P04 14 Dec cut 175 -> 155 at the 30-day Recency edge; set Occupancy, Booking Recency and Last-minute to Custom 0% on P04, P05, P11, P20; P12/P13 excluded; expected £761 / 30 days","gbp":761},
{"id":"t-p01-1820block","status":"open","prop":"P01","priority":"high","title":"Unchanged: gap block runs to the 20 Dec handback, so 18-20 Dec (£269/£268/£237, min 3) are closed; confirm intent; if not, end the block 18 Dec (£307.67/n = P14 / -16.8% vs stored median £369.67, P25 / -9.3% vs band; parity supported); £774 x 0.900 = £697","gbp":697},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"high","title":"21 Dec £2,066 / 29 Dec £2,557 at Reyhan's +300% min 1 act as soft blocks (2.3x P90, n=0 qualifying comps): confirm intent (block in Smoobu) or, your call, both +300% -> 0% (uncustomized £707 / £1,046); 7-8 Dec +3% -> +29% (£912, P25 / -19%) and 13-14 Dec +5% -> +31% (£971, P0 / -23%) per recommend +25%; £654","gbp":654},
{"id":"a-p13-record","status":"open","prop":"P04 P11 P14 P05 P12 P13 P20 P06","priority":"high","title":"For Corentin to confirm or revert Reyhan's 9-11 Nov changes (0 log entries since 11 Nov 17:16Z): P04 base 200 (revert to 220, £120), P11 22 Nov-18 Dec -3% vs darts +5% (14-17 Dec avg £221 vs >£300; revert on 14-18 Dec £36), P04 6-22 Dec -5% (remove on 6-17 Dec, keep 18-22 Dec, £58), P04 15-17 Nov min 2 (revert to 3), P04 18-24 Nov -5% (keep), P13 10-26 Dec -5% (a-peak-check; cost ~£45 on the 18-23 Dec sale), P14 min 450, P05 max 3500 and 29 Nov-2 Dec -5%, P12 +5%, P20 min 2 and base 330 vs 350, P06 -10% (numbers only); £214","gbp":214},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed (6th day): P20 5 Dec 1-night orphan, min 3, unbookable at £298; DSO 5 Dec min 1, keep price (just under market P75 £300, ~31% under the only 1-night comp £431); £298 x 0.765 x 0.643 = £147","gbp":147},
{"id":"t-p11-8dec-orphan","status":"open","prop":"P11","priority":"high","title":"Not fixed: P11 8 Dec 1-night orphan (£199, min 3, unbookable) between the 5-8 and 9-14 Dec stays; DSO 8 Dec min 3 -> 1, keep £199 (P0 / -21% vs kept median £253, market P50 £255); £199 x 0.762 x 0.567 = £86","gbp":86},
{"id":"a-peak-check","status":"open","prop":"P13","priority":"high","title":"Not done: Reyhan's 10-26 Dec -5% still set (confirm or revert); 18-23 Dec sold under it on Booking.com at P0 of kept comps / P6 wider (cost ~£45); both twins 10-12 Dec -5% -> +5% (cheaper twin P0 / -21.6%, P5 of 21 wider; do not raise 3064856 more than 3090701), 23-26 Dec -5% -> 0% (P18-P20 wider; 0% supported, +10% not), hold 13-17 Dec; market +3 to +23 pts; £63","gbp":63},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Policy looks out of date: Smoobu blocks 18-19 Nov only; 20-24 Nov on sale (Airbnb 20-23 Nov £540.85 room); Corentin to confirm delivery 18-20 Nov so policy can be updated; 20-24 Nov £213.75/n all-in P0 / -27.8%; if on sale, DSO 20-21 Nov -5% -> +10% (+15.8%), hold 22-24 Nov; £38","gbp":38},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Not fixed: P11 3 Jan £173 (market +3.1, P50 £221; 3-5 Jan P0 / -39% room, list -16%) -> DSO to about £194 (fortnight £193); 23 Dec £281 hold (market -4.1, soft); Booking.com CTR 0.81% vs 1.70% (21 Oct only); £8","gbp":8},
{"id":"t-p06-2229open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): the 22-29 Nov reopening sold 24-29 Nov (£1,009.82 = 0.650 x Smoobu), now registered in PriceLabs; 22-23 Nov £271/£239 sellable only as 22-24 Nov (P0 / -15% kept, supported ~£310/n); 29 Nov orphan £258 min 4; who/why UNKNOWN; if intended note in policy + (your call) 29 Nov min 1; if not re-block 22-23 and 29 Nov","gbp":null},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"December parts closed by the 7-14 Dec Booking.com sale (-10.4% vs band, in range); remaining: 18 Nov DSO +5% -> -5% (about £244; 17 Nov excluded per policy; 17-19 Nov +13.3% P78, 18-20 Nov +9.7%), hold 19-20 Nov; 30 Nov-3 Dec +5% -> -5% (about 242/269/271/278; +7.8% vs band, 1-3 Dec +17.8% P90 after an 11% algorithm rise); lowers a price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £303 (£357 all-in, P100 +26.6%, n=5, NL >P90); DSO +15% -> -15% (about £224; supported £203-239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-bcom-breakdown-1511","status":"open","prop":"P13 P12","priority":"medium","title":"New: send extranet breakdowns (no promotion change proposed, per Corentin's direction): P13 18-23 Dec paid £847.10 = 0.720 of list, £105.46 below the policy-listed Mobile x Genius L1 (one layer unidentified; LM not at 34 d); P12 7-14 Dec exact Weekly 0.85 x 0.9 x 0.9 x 0.95 (which two 10% layers; Genius L2&3 15% did not apply); Booking.com nets £61.21 / £65.10 per £100 vs Airbnb £64.64 / £68.45","gbp":null},
{"id":"a-p11-bcom-stack","status":"open","prop":"P11","priority":"high","title":"Unchanged: stack verified on the two 14 Nov stays (ceil(Smoobu x 1.10) x 0.9 x 0.9 x 0.9 x 0.95; LM acted as 10%; commission 18% booster; nets £62.47 per £100); all layers recorded promotions, so per Corentin's direction no change; only ask: extranet breakdown to name the three 10% layers","gbp":null},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"Unchanged: P05 visible Airbnb 'Long stay discount' 10% from 5 nights (-£192.30 on 14-19 Jan); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":192.3},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood visible 12% early booking (60+ d) still on (-£141.72 on 14-17 Jan): not in policy - yours, or 0%?","gbp":141.72},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Unchanged: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (-£88.29 / -£110.43 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":88.29},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: synced Barking Airbnb weekly discount 18.0% vs policy 15% (-£355.27 on 6-19 Dec, £59.21 over policy)","gbp":59.21},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"Improving, not fixed: 45 identical open nights (15 Jan-28 Feb; was 47); 15-17 Jan identical price 193/195/186 on both twins; 14-17 Jan P29 / -5.3%; DSO 3090701 about +3% on 15 Jan-28 Feb (keeps it under its line), set on the child after any parent edit","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P11 P12 P13 P04","priority":"medium","title":"8 of 24 post-cut Booking.com bookings cancelled (33%; £5,949.77 room); confirmed 16 / 70 n / £11,571.01; 4 bookings since +10%, all confirmed; send rate plans and reasons for the 8 cancellations","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"medium","title":"Unchanged: PriceLabs and Smoobu both show 15-21 Dec booked; still confirm on Airbnb that the stay (£2,962.17) is live (Smoobu type 'modification of booking')","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Unchanged: 3 entries remain (P12 £22.50, P11 £26.82, P13 £30.00 = £79.32; whether the P13 entry belongs to a cancelled stay is NOT CHECKED): accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"20-24 Nov £213.75/n all-in, P0 / -27.8% (comps flat); 16-18 Nov P0 of 4 at the manual Smoobu level; remaining: parking first photo, review requests (0 reviews); Flexible-test 14-day comparison overdue (due 7 Nov)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace to the 13 Dec handback now -8.0% (-5 n / -£360.62), On track, after the 7-14 Dec sale; base +37.2% vs P50; correct the 9 open nights via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"17 Nov twins £309 / £337 all-in (+35% min 1; P75 of 4, P62 wider): hold; 27 Nov £348 / £383 (+50% min 1; P100 of wider 3; market Finals Weekend +14.3): confirm; no trim proposed","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20 P06 P11","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo); P11 basement vs 4 of 12 comps with lift; P04 synced 4.2 (10) vs 4.83 comps","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (5 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Booking.com Monthly-plan 28-night minimum not enforced (14-18 Nov stay, now in progress; record modified 14 Nov with a £129 cleaning element): ask Booking.com","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 220/350 vs PL 200/330; pack out of date (P04 base 220 vs 200, P14 min 400 vs 450, P05 '5-bed'); P13 Vrbo copy 24 h 28 min stale, P02 Vrbo since 24 Feb: should Vrbo copies push?; Vrbo +8% / Direct -10% unconfirmed; record 9-11 Nov edits, P06 reopening, P20 delivery dates and the P04 synced Airbnb listing in policy","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"P04 1083936003491396261 dropped as inactive (Jan-Feb sweep) and replaced by 985683261536682900 (4.82 (17), Superhost); P04 1387112821878102742 kept (bookable in January); not returned 3 days: P06 x2, P14 x2, P17 x1 (pages up, calendars NOT CHECKED); P09 958156921765583815 not swept; still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026; keep or remove","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why? (the new 18-23 Dec stay is 18.02% of room + cleaning = booster, expected)","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null},
{"id":"t-pl-sync-1411","status":"done","prop":"P11 P06","priority":"critical","title":"Fixed: PriceLabs registered P11 28 Nov-1 Dec and 9-13 Dec (refresh 14 Nov 09:03Z, again 15 Nov 07:08Z; occupancy 33% -> 57%; open nights repriced +£301 on 14 nights) and P06 24-28 Nov (14 Nov 08:42Z); P12 7-13 Dec also registered; remaining gaps (P04 20-24 Nov, P13 3090701) moved to t-pl-sync-1511","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P20 P06 P04","title":"Manual Smoobu writes recurred after the 14 Nov 08:42Z push: P06 15-17 Nov = the 12 Nov values (-£73), P20 15-17 Nov -£84 (at the £200 min), P04 18-19 Nov higher (+£27) with min stay cut 3 -> 2; P11's 9 mismatches were only a pricing lag (in sync after 07:08Z)","evidence":"pricelabs C1 (live get_listing_prices vs Smoobu /api/rates 07:21:26Z; overrides; 0 user logs); comp-west (Airbnb 16-18 Nov £464 = £150 + 0.766 x Smoobu; P0 of 4); comp-central (P06 P31 / -25%); channel §2 (P04 18-20 Nov sold as 2 nights at 0.727)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 is bookable for 20-24 Nov (£679.16), nights already sold on the synced listing: double-booking risk is live (day 16)","evidence":"channel §2-§3 (live Airbnb 07:22:37Z); comp-east (£680; synced listing no longer returned for 20-24 Nov)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"New P04 Airbnb 20-24 Nov paid 0.765 x Smoobu £640 (-£150.41 vs policy) through the synced listing; a-airbnb-rules realised cost now £3,056.70 (day 17)","evidence":"channel §2/§4 (Smoobu price elements; push 08:42Z before the 20:29 booking); comp-east (-25% to -34% vs comps while the PriceLabs room was in range); pricelabs C2."},
{"agent":"pricelabs","severity":"high","ref":"P04 P13","title":"PriceLabs has not registered P04 20-24 Nov (last refresh 14 Nov 08:42:40Z) or the P13 18-23 Dec stay on twin 3090701 (18-22 Dec shown open at £1,166)","evidence":"pricelabs C2, H1 (live get_listing_prices; raw prices_3090701.json 06:55:54Z); occupancy (kpi_pack P04 55.2% stale vs Smoobu 56.7%)."},
{"agent":"pricelabs","severity":"high","ref":"P11 P06 P12","title":"t-pl-sync-1411 fixed: P11 and P06 bookings registered; P11 occupancy 33% -> 57%; open nights repriced +£301 on 14 nights; P12 7-13 Dec registered","evidence":"pricelabs H2; occupancy; market §1; comp-central."},
{"agent":"channel","severity":"high","ref":"P12","title":"P12 Booking.com 7-14 Dec £1,432.42 = ceil(Smoobu x 1.10) x Weekly 0.85 x 0.9 x 0.9 x 0.95 exactly (0.720 x Smoobu); Genius L2&3 15% did not apply; commission 15.00% of room + cleaning (standard); nets £61.21 per £100 vs Airbnb £64.64","evidence":"channel §1/§6 (stack.py); comp-east (-10.4% vs band, P27, in supported range; 16.6% is the same commission on room only)."},
{"agent":"channel","severity":"high","ref":"P13","title":"P13 Booking.com 18-23 Dec £847.10 = 0.720 of list (0.794 x Smoobu £1,067); one layer unidentified (£105.46 below Mobile x Genius L1); commission 18.02% of room + cleaning = 21.2% of room = booster, expected; nets £65.10 per £100 vs Airbnb £68.45","evidence":"channel §1/§6 (p13fit.py); comp-west (P0 of kept comps -4.1%, P6 of 17 wider; 21.2% on room); market §2 (£392 under P50, occ +8 to +20 vs STLY); pricelabs H3 (Reyhan's -5% cost ~£45)."},
{"agent":"occupancy","severity":"high","ref":"P12","title":"P12 pace to the 13 Dec handback moved from -37.8% to -8.0% (-5 n / -£360.62) with the 7-14 Dec stay: On track; kpi_pack 30-day -10.8% includes a 14 Dec STLY night with no inventory","evidence":"occupancy pace section (rm.metrics.on_the_books on reservations.csv 15 Nov)."},
{"agent":"comp-east","severity":"high","ref":"P04","title":"P04 6-14 Dec -17% to -26% vs comps; 14 Dec cut 175 -> 155 by the algorithm at the 30-day Recency edge; +10% on 6-13 Dec and +5% on 14-17 Dec supported; 18-19 Nov in range","evidence":"comp-east Priority 1; market §2 (11-13 Dec occ +4.8 to +7.6; 14-19 Dec +£195 to P75)."},
{"agent":"comp-central","severity":"high","ref":"P11","title":"P11 Dec-Jan open stays -15% to -27% vs kept median at list all-in (P0-P14 at room); darts 14-17 Dec Smoobu average £221 vs ~£333 median-level and policy >£300; 18-27 Nov at or above median on list (hold)","evidence":"comp-central P11 table; market §2 (darts gap £334, market soft); pricelabs H4 (Reyhan -3%)."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 23-26 Dec back to 0% supported (+10% not; P18-P20 wider, P67-P100 kept n=2-3); 10-12 Dec +5-10% supported (cheaper twin P0 / -21.6%); twins identical 15-17 Jan","evidence":"comp-west P13 tables; market §2 (+3 to +23 pts); channel §4 (45 identical nights)."},
{"agent":"comp-west","severity":"high","ref":"P20","title":"P20 20-24 Nov P0 / -27.8% (comps flat); +15.8% on 20-21 Nov supported if not the delivery block; 16-18 Nov P0 of 4 at the manual Smoobu level; 5 Dec orphan min 1 at £298 supported (6th day)","evidence":"comp-west P20 tables; channel §5; market §2."},
{"agent":"pricelabs","severity":"medium","ref":"P04 P05 P11 P20","title":"PriceLabs discount gap £1,445 next 30 / £280 next 14 (P11 £551, P04 £498, P05 £345, P20 £131); P11 Aggressive occupancy + Recency default unchanged","evidence":"pricelabs H3 (an.py)."},
{"agent":"market","severity":"medium","ref":"P11 P20 P04","title":"Missed compression 17 n / £540 (was 19 / £419); +£121 mostly a fortnight artefact (P11 14-17 Dec +£93 after PriceLabs repriced booked nights); real new cut P20 23 Nov 245 -> 214","evidence":"market §4 (analyse15.py; open-only variant 4 n / £28)."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct base rises: +21 n / +£6,109.72 like-for-like; +30 / +£7,976.33 incl. P06; P12 +11 / +£1,660.21 (new stay); P05 +12 / +£4,915.21; P11 -5 / -£1,566.77; P01 0; P09 -3 / -£244.70","evidence":"occupancy base-rise section (rise.py, full recompute)."}
],
"top5":[
"Manual Smoobu writes are back after the 14 Nov push: P20 15-17 Nov -£84 (15-16 Nov at the £200 floor) and P06 15-17 Nov -£73 (the exact 12 Nov values) put both at the bottom of their comps; P04 18-19 Nov is higher but at min 2, breaking your min-3 rule (Airbnb sells 18-20 Nov as 2 nights). New t-smoobu-manual-1415: check the ~08:42Z push overwrites them, confirm or revert P04 min 2, and say who edits Smoobu rates (UNKNOWN).",
"P04 Barking: new Airbnb 20-24 Nov paid £489.59 = 0.765 x Smoobu (-£150.41; a-airbnb-rules now £3,056.70, day 17), 25-34% under comps, and the unsynced 1455 is still bookable for those same sold nights at £679.16 - block its calendar today (critical). PriceLabs has not registered the stay (t-pl-sync-1511); 24 Nov orphan is numbers only under the min-3 rule.",
"Booking.com: P12 7-14 Dec £1,432.42 fills to the handback (exact x1.10 x Weekly 0.85 x 0.9 x 0.9 x 0.95; Genius L2&3 15% did not apply; -10% vs band, in range); pace -37.8% -> -8.0%, On track; a-p12-trim's December parts close. P13 18-23 Dec £847.10 = 0.720 of list (one layer unidentified), P0 of kept comps; Reyhan's -5% cost ~£45; not registered on twin 3090701; commission 18.02% of room + cleaning (= 21.2% of room) = booster. Booking.com nets £61-65 vs Airbnb £64-68 per £100: reported only, under your keep-Booking.com-discounts direction.",
"t-pl-sync-1411 fixed: P11 occupancy 33% -> 57%, open nights +£301. P11 Dec-Jan still 15-27% under comps (darts 14-17 Dec avg £221 vs ~£333 and your >£300; Reyhan's -3% is your call, £36); 8 Dec orphan min 1 (£86); 3 Jan £173 -> £194 (£8).",
"Standing: P13 Christmas 23-26 Dec back to 0% and 10-12 Dec +5-10% (£63); P04 December +10% (6-13) / +5% (14-17) supported; P01 18-20 Dec block (£697); P20 20-21 Nov +15.8% after delivery confirmation (£38), 5 Dec orphan day 6 (£147); a-discount-cut £280 / £1,445 (£761); missed compression 17 n / £540 (mostly artefact); Booking.com since 24 Oct 16 confirmed / 70 n / £11,571.01; base rises +21 n / +£6,109.72 like-for-like."
],
"per_property":[
{"ref":"P01","change":"No change; 18-20 Dec still blocked at £269/£268/£237 (£774); if reopened £307.67/n = P14 / -16.8% vs stored median £369.67 (n = 7), P25 / -9.3% vs band, parity supported (£697); 100% of 15 non-blocked nights booked; base-rise 0 n / £0."},
{"ref":"P02","change":"Intentional block; pushed 15 Nov 00:23Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 15 Nov 03:13Z via Channex."},
{"ref":"P04","change":"New Airbnb 20-24 Nov £489.59 (0.765 x £640, -£150.41; -25% to -34% vs comps) via the synced listing, not in PriceLabs; unsynced 1455 bookable on the sold 20-24 Nov (£679.16) and every open run (day 16); 24 Nov new orphan (min 3, numbers only); 18-19 Nov Smoobu 175/165 min 2 (manual write, policy conflict; Airbnb sells 2 nights at 0.727; price in range); 14 Dec cut 175 -> 155 by the algorithm; 6-13 Dec +10% / 14-17 Dec +5% supported; base 200 (revert recommended, £120); fwd30 56.7% vs 24%."},
{"ref":"P05","change":"No edit; 21 Dec £2,066 / 29 Dec £2,557 (+300% min 1, soft blocks); 7-8 Dec £912 (P25 / -19%), 13-14 Dec £971 (P0 / -23%; Airbnb card fell as 13 Dec entered the 0.765 tier); +25% supported (£654 incl. 21 Dec); visible 12% early booking and 10% LOS 5+ still on; base-rise +12 n / +£4,915.21; fwd30 66.7% vs 46%."},
{"ref":"P06","change":"24-29 Nov now registered in PriceLabs; 15-17 Nov Smoobu back to the 12 Nov manual values 222/222/233 vs PriceLabs 247/249/254 (P31 / -25% wider); PriceLabs above uncustomized despite -10% (cause UNKNOWN); 22-23 Nov £271/£239 (PriceLabs push; P0 / -15% kept); 29 Nov orphan £258 min 4; opening questions still with Corentin; fwd 60.0% of 15 non-blocked vs 51%."},
{"ref":"P07","change":"Intentional block; pushed 15 Nov 04:18Z."},
{"ref":"P08","change":"Handed back (last night 13 Nov); no inventory."},
{"ref":"P09","change":"No sellable night before the 26 Nov handback; base-rise -3 n / -£244.70."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"No booking or cancellation; PriceLabs registered both 14 Nov stays (occupancy 33% -> 57%), open nights +£301 on 14 nights (2-4 Dec 247/263/318); Dec-Jan open stays still -15% to -27% at list all-in; darts 14-17 Dec avg £221 vs >£300 (Reyhan -3%: Corentin); 8 Dec orphan £199; 3 Jan £173; base-rise -5 n / -£1,566.77; fwd30 56.7% vs 51% (window roll)."},
{"ref":"P12","change":"New Booking.com 7-14 Dec £1,432.42 (exact stack, Genius L2&3 did not apply; -10.4% vs band, in range) fills to the 13 Dec handback; pace -37.8% -> -8.0% (On track); 30 Nov-3 Dec rose ~11% overnight with no edit (+7.8% vs band, 1-3 Dec +17.8%); 17-19 Nov +13.3% (P78); 26 Nov £303 P100 +26.6%; base-rise +11 n / +£1,660.21."},
{"ref":"P13","change":"New Booking.com 18-23 Dec £847.10 (0.720 of list, one layer unidentified; P0 of kept comps, P6 wider; Reyhan's -5% cost ~£45; commission 18.02% of room + cleaning = booster); registered on 3064856, not 3090701; 10-13 Dec cheaper twin P0 / -21.6%; 23-26 Dec 0% supported; twins identical 15-17 Jan (45 identical nights); fwd30 73.3% vs 46%."},
{"ref":"P14","change":"Min 450 (Reyhan; conflicts with special setup); 68 of 180 open nights at £450; P100 / +49% to +111%; 0% vs 49%; numbers only."},
{"ref":"P15","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P16","change":"Not connected (t-unmapped)."},
{"ref":"P17","change":"Not connected (t-unmapped); reference comps only."},
{"ref":"P18","change":"Not connected (t-unmapped)."},
{"ref":"P19","change":"Not connected (t-unmapped)."},
{"ref":"P20","change":"15-17 Nov Smoobu 200/200/210 (manual write; 15-16 Nov at the £200 min) vs PriceLabs 232/223/239, P0 of 4 / -19.9%; 20-24 Nov £213.75/n all-in P0 / -27.8% (+15.8% on 20-21 Nov supported once delivery confirmed); 23 Nov cut 245 -> 214 by the algorithm; 5 Dec orphan £298 min 3 (6th day); 15 Nov tonight unsold; fwd30 64.3% vs 40%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 253)","recommendation":"Hold; off the agenda","reason":"100% of 15 non-blocked nights booked to the 20 Dec handback; base -4.5% vs P50; 18-20 Dec is a block question (occupancy; comp-east; pricelabs M3)."},
{"ref":"P04","base":"200, was 220 (no rec in pack)","recommendation":"Conflict for Corentin: confirm 200 or revert to 220; revert recommended","reason":"20-24 Nov sold -25% to -34% and 6-14 Dec -17% to -26% vs comps vs supported -15% (qp -0.15); recommend 30d and 60d raise +10%; 56.7% vs 24%; base +12.4% vs P50 (comp-east; occupancy; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 537)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"66.7% vs 46%; 7-8 Dec P25 / -19%, 13-14 Dec P0 / -23%; qp +0.15; recommend +25%; base -6.0% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 353)","recommendation":"Hold","reason":"Policy block; 9 of 15 non-blocked nights booked (60.0%) vs 51%; base -14.2% vs P50 (occupancy; pricelabs M3; comp-central)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold; off the agenda","reason":"100% to the 26 Nov handback; no sellable night left (occupancy; comp-east)."},
{"ref":"P11","base":"286 (rec 281)","recommendation":"Hold 286","reason":"56.7% vs 51% (Smoobu); Dec-Jan open stays -15% to -27% at list all-in, P0-P14 at room; recommend +5% 30d / 60d; base -2.1% vs P50; no cut supported; levers are a-discount-cut, the darts override and orphan rules (comp-central; pricelabs H3; occupancy)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"69.0% to handback vs 44%; pace -8.0% (On track) after the 7-14 Dec sale; 9 open nights +8% to +27% vs band with qp -0.15; base +37.2% vs P50; handback 13 Dec (comp-east; occupancy; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 239)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 46% (+27 pts); 60d 56.7% vs 38% (comp-west; occupancy)."},
{"ref":"P14","base":"525 (rec 503); min 450, was 500","recommendation":"Numbers only (special setup); min change for Corentin to confirm or revert","reason":"0% vs 49%; P100 / +49% to +111% vs comps at £450; 68 of 180 open nights at min (comp-central; pricelabs M2)."},
{"ref":"P20","base":"330 (Corentin 350; rec 354)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"64.3% vs 40% (30d), 43.1% vs 31% (60d); 0 reviews; base +29.4% vs P50; November P0 of comps, December at or above the median (occupancy; comp-west; pricelabs M3)."}
]}
```

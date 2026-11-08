# Seeker Estates - Daily revenue report, 2026-11-08 (Sunday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-08/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-08/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-07/daily-report.md` and its JSON, the dashboard action list (8 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/max come from `data/snapshots/2026-11-08/listings.csv` (unchanged since 7 Nov).
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.
- Process note: comp-west sent one `get_listing_date_overrides` call in parallel with `get_user_logs`, against the one-call-at-a-time rule. Both returned 200, so no data was lost.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P06 15-21 Nov was opened against the block, so it stays with you to confirm (t-p06-1521open). It is not a proposal.
- P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Not raised again: Visibility Booster commission (P13 7-10 Dec 20% is expected under it), the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov, P13 1 Dec, P13 twin price order, the P09 Airbnb rules screen (the P09 -£139.31 is a memo only), P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - Four proposals lower a PriceLabs price: a-p12-trim, t-p12-26nov-price, the P12 13 Dec price and the P05 9 Nov/29 Dec resets. Each is marked "your call", with the evidence.
  - Reyhan's 7 Nov edits that cross your decisions are listed for you to confirm (a-p13-record, t-p13-twins, t-p20-delivery). They are not proposed again.

## Corrections and conflicts resolved between sections

1. **P09 7-11 Nov: price on sale was £502, not £466, so the ratio is 0.7225.** comp-east used the 7 Nov 07:19Z Smoobu figures (£466, 0.778, "no layer fits"). pricelabs H2 and channel §2 show P09 pushed at 08:16:19Z, before the booking at 13:23, at 154/119/115/114 = £502. £362.69 / £502 = 0.7225 = 0.85 x 0.85 to the penny. I use £502. The shortfall (-£139.31) is a memo; P09 Airbnb rules are deprioritised.
2. **P13 7-10 Dec Booking.com: price on sale was £636, not £580.** market and comp-west assumed the 6 Nov push was live until booking. pricelabs and channel show the 12:30:42Z push landed before creation at 13:20. Ratio **0.763x PriceLabs (0.663x the £731.40 list)**. Either way the verdict is the same: **P14 of 7 comps, -18.3% (comp-west); 0.699x market P50, £97 under P25 (market).**
3. **P13 twin 3090701 on 7-9 Dec is not a double-sell risk.** market asked whether Smoobu blocked it. pricelabs M3: Smoobu has the nights closed (linked block); only PriceLabs shows them open. It should clear at the next sync.
4. **P20 6-14 Dec layer.** channel fits 0.765 x weekly 0.85; comp-west 0.90 x 0.85 x 0.85. Both are 0.65025 (£1,494.27). Against policy's weekly-only £1,953.30 it is **-£459.05**. The source of the extra layer needs the Airbnb price breakdown (162719002).
5. **P04 December: market and comp-east disagree.** market: 14-19 Dec +£87 to P75 (occupancy +2.8 to +6.2, but absolute 9.6-22.9%). comp-east: December stays already at comp parity (P50, about 0%) with a -0.15 quality cap; supports a 5-10% trim (n = 2-4). **Resolution: hold P04 December; no raise, no trim.** Reyhan's new 6-22 Dec -5% goes to you to confirm (a-p13-record).
6. **P13 Christmas sizing.** market: +10% (+£368) and under P50 on all 17 open nights. comp-west: `recommend` +10%, but 3064856 (4.31, qp -0.15) is already at its quality line on 18-20 Dec. **I keep the `recommend` +10%** because the 60-day lead is +13 pts and the 21-26 Dec -5% is unsupported by both sections; review on 12 Nov if nothing books.
7. **P06 15-17 Nov: the price half of t-p06-1521open is moot.** The 7 Nov 08:20:49Z PriceLabs refresh put them back at **£265 / £264 / £270** with no DSO (pricelabs M1; comp-central). Only the "was opening intended?" question remains.
8. **P20 13-16 Nov: the price ask stays dropped.** comp-west sees P0 -23%, but market has PriceLabs at £988 vs P50 £852 with the market -9.1 / -11.0 vs STLY. Reyhan's removal of the -5% has already lifted these nights about 5%. The remaining guest-side gap is the 0.766 Airbnb layer (a-airbnb-rules).
9. **18 Oct base rises (corrected method):** like-for-like **+7 n / +£2,161.34** (was +3 / +£1,798.65); including P06 reopened nights **+11 n / +£3,018.13** (was +7 / +£2,655.44). The whole change is P09 7-11 Nov (+4 n / +£362.69). The cancellation it replaces is already netted.

## Executive summary

1. **TOMORROW: P05 9 Nov sells on Airbnb at £253.44 room (£448.44 all-in, "Special offer" -£63.36 on £511.80) against Smoobu £1,378 (channel §3; comp-central). Ninth check. If it sells: -£1,124.56.** Fix on Airbnb today (row 1).
2. **CRITICAL: Barking 1455, day 9.** The unsynced Airbnb 1455876748739910219 sells **8-11 Nov (£519.00)** over the synced guest in residence (161888271, leaves 9 Nov, £355.72 room). From 9 Nov every night it sells is also open on the synced listing and Booking.com (channel §1; comp-east).
3. **Pushes: t-pl-push-fresh was NOT met on 7 Nov.** P11/P13/P08/P04 crossed 24 h at 08:48Z and pushed only at 12:30-12:34Z, 3h42-3h46 late; the P13 Vrbo copy was 4h10 late. Every one of those pushes came 13-47 s after a manual save by Reyhan. P09 refreshed at 12:32Z without pushing: PriceLabs £132/£141 vs Smoobu £120/£128 on 11-12 Nov. **Due today: P09 08:16Z, P06 08:20Z, the rest 12:30-12:35Z** (pricelabs H1).
4. **Two new orphans and one changed one.**
   - **P20 5 Dec:** 1 night, min 3, `unbookable = 1` at £279. Set min 1 at the current price.
   - **P09 12 Nov:** unsellable because of a Smoobu "Blocked channel" block on 11 Nov (162726554, created 7 Nov 18:37, creator unknown). 11-12 Nov is not bookable on Airbnb (comp-east, 5 searches). These are the last unsold nights before the 26 Nov handback.
   - **P12 13 Dec:** now min 1 (done by Reyhan), but at +15% = **£369 room, £458 all-in, +55% vs the 1-night band (P100, n = 4)**. Supported about £205 room.
5. **Airbnb hidden layers, day 10: cumulative £1,668.28.** P20 6-14 Dec sold £1,494.25 = 0.6502x £2,298, **-£459.05** vs policy. Both December P20 bookings sold at the bottom of comps (**P0, -28% and -32%**), and the P13 Booking.com stay at **P14, -18% / 0.70x market P50**.
6. **Reyhan's 25 DSO edits (7 Nov 12:27-12:34Z)** moved some items toward our asks and some away; five cross your recorded decisions (table below).

**Last 30 nights (9 Oct-7 Nov, 13 units):** occupancy **66.2%**, ADR **£172.60**, RevPAR **£114.18**, revenue **£44,531.25** (258 n; kpi_pack `portfolio_last30`). Yesterday: 66.4% / £173.08 / £114.94 / £44,827.37.
**Next 30 (8 Nov-7 Dec):** **60.6%** (169/279; yesterday 59.6%). **Next 60:** **50.6%** (237/468; yesterday 48.6%). Smoobu truth, handback-aware; P09 11 Nov block excluded.
**7-day pickup (made 2-8 Nov):** gross 12 bookings / 46 n / £8,843.45; cancelled 4 / 20 n / £3,337.45; **net +26 n / +£5,506.00** (yesterday +20 n / +£5,417.77).

## Base review

No change to `base_price`, `min_price` or `max_price` on any listing (listings.csv 7 vs 8 Nov). Only P04's `recommended_base` changed, empty -> 221. Base vs market from pricelabs M4.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% booked to the 20 Dec handback | **Hold; off the agenda** |
| P04 | 220 / 221 | 50.0% vs 24%; base +26.4% vs P50; November -27% vs comps, December at parity; qp -0.15 | **Hold 220.** The "Unavailable" data gap is closed (rec 221) |
| P05 | 550 / 544 | 73.3% vs 43%; December P25 vs comps; qp +0.15; `recommend` +25% | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 7/14 non-blocked (50.0% vs 49%); base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 94.4% vs 36% to handback | **Hold** |
| P11 | 286 / 283 | 46.7% vs 48%; comps P0-P29; `recommend` +5% | **Hold 286**; the lever is PriceLabs discounts (a-discount-cut) and the -2% (a-p13-record) |
| P12 | 284 / 284 | 60.0% vs 42%; **pace30 -24.5%**; open December P86-P92 vs band; base +38.5% vs P50 | **Hold 284; fix the level with date overrides** (a-p12-trim). Handback 13 Dec |
| P13 | 250 / 237 (236) | 73.3% vs 44% (+29 pts) | **Keep 250 and record it in policy** |
| P20 | 330 (your 350) / 351 | 53.6% vs 38% (30d), 48.3% vs 31% (60d); 0 reviews; base +31.5% vs P50 | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 7 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+7 n / +£2,161.34** (was +3 / +£1,798.65) | Change = P09 7-11 Nov (+4 n / +£362.69) |
| Raised, including P06 18-22 Nov | +11 n / +£3,018.13 (made 21 / 70 n / £14,725.48; cancelled 9 / 59 n / £11,707.35) | P06 nights reopened 5 Nov |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 (was +36 / +£6,145.79) | Change = P20 6-14 Dec |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 (was +16 / +£2,909.76) | Change = 7-10 Dec |

\* P20's base was cut twice, so it is not a clean control.
- **Reading:** positive and rising on the like-for-like figure. **Hold the bases.**

### Per property
| Ref | Change since 7 Nov |
|---|---|
| P01 | Pushed 8 Nov 05:11Z. Nothing open before the 20 Dec handback. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy last pushed 24 Feb. |
| P04 | **1455 sells 8-11 Nov over the guest leaving 9 Nov (day 9).** Reyhan: 9-24 Nov -7% -> -3% (policy -8%); new 6-22 Dec -5% min 3. November still fell 3-6% (uncustomized fell). Weekly 18% (£70.25 on 6-19 Dec). Gap n30 £702 (-22.8%). Rec base now 221. |
| P05 | **9 Nov Airbnb £253.44 vs Smoobu £1,378 (9th check).** Reyhan 13-19 Dec -7% -> -2% (13-21 Dec £5,288 -> £5,507). 7-8 Dec £917. 29 Dec £1,346 vs default £1,067. Early bird 12% (£147.96 on 7-10 Jan). |
| P06 | Algorithm refresh 7 Nov 08:20Z: 8-11 Nov £219/223/228/236 and **15-17 Nov back to £265/264/270** (no DSO). 18-21 Nov now shows Booked in PriceLabs. Reyhan's -5% on 8-14 Nov unchanged. |
| P08 | **7 Nov lapsed unsold** at £417 (Reyhan +100%, min 1, 12:31:48Z). 8-13 Nov fully booked to handback. |
| P09 | **7-11 Nov sold** (Airbnb, £362.69, 0.7225x £502). **New Smoobu block 11 Nov** (162726554) leaves 12 Nov a min-2 orphan; Airbnb not bookable 11-13 Nov. PL £132/£141 vs Smoobu £120/£128 (no push since 08:16Z). |
| P10 | Booked to the 18 Nov handback. |
| P11 | Reyhan 10 Nov-18 Dec -5% -> -2%, but uncustomized fell, so most nights fell 2-8%. **Darts 13-17 Dec £1,078, average £215.60.** 18-20 Nov P0 -43% (£158 vs uncust £225). 23 Dec £281; 3 Jan £178. |
| P12 | **Reyhan removed the -5% on 12-20 Nov and 30 Nov-10 Dec**: 7-10 Dec £1,186 (+36% vs band, P86), 30 Nov-3 Dec £1,144 (+18%). **13 Dec +15% min 1 = £369.** 26 Nov £323 (P100). Pace30 -24.5%. |
| P13 | **Booking.com 7-10 Dec sold** on 3064856, £485.20 (P14 -18.3%; 0.699x P50). Reyhan 8-12 Nov -10% -> -5%; 10-20 Dec -7% -> -2%. **12 Nov £181 (ask met).** **Twins identical 9-17 Nov** (copied from parent). 3090701 7-9 Dec shows open in PriceLabs only. |
| P14 | Numbers only: 109 of 180 open nights at £500; 0% vs 46%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **Airbnb 6-14 Dec sold £1,494.25** (0.6502x; P0 -27.7% vs 7 comps; -£459.05 vs policy). **5 Dec now a 1-night orphan, min 3, unbookable.** Reyhan removed -5% and set min 2 on 7-9 / 13-17 / 20-24 Nov. 26 Dec £344 (P78 hold). |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
All 25 entries are reyhan@, 7 Nov 12:27:39-12:33:52Z, "Added Date Specific Override" (pricelabs log). No entries since.

| # | Ref / dates | Your decision | Now | Evidence | Direction vs our plan |
|---|---|---|---|---|---|
| a | **P11 darts 13-17 Dec** | +5%, average above £300 (21/24 Oct) | **-2%**: £1,078, **average £215.60** | comp-central: P11, -47% vs median £394; market R1 soft (0.0 to -7.1) | Away from your decision |
| b | **P20 7-9 / 13-17 / 20-24 Nov** | -5% to 19 Nov; min 3 to 30 Nov (24 Oct) | -5% removed; **min 2** | comp-west: P0 -21% to -23% (supports the price direction); min 2 created the sellable 8-9 Nov gap | Price toward `recommend`; min stay against policy |
| c | **P04 9-24 Nov** | -8% on 1-25 Nov (24 Oct) | **-3%** | comp-east: either level stays under the -15% quality line | Either fits |
| c2 | **P04 6-22 Dec** (new) | standing direction | **-5%** min 3 | comp-east parity (P50); market +£87 to P75 on 14-19 Dec (correction 5) | Away from standing direction |
| d | **P13 8-12 Nov** | **0%** (24 Oct) | **-5%** (was -10%) | comp-west: 3090701 12% under its line; comps cut 4-7% overnight | Toward, not there |
| e | P12 17 Nov | +50% (deprioritised) | price DSO removed, £254 | numbers only | - |
| f | **P13 twins 9-17 Nov** | policy `twin_listings`: must differ | **identical** (price, user_price, uncustomized) | comp-west; channel §3 (Airbnb totals identical on every November stay) | Against policy |
| g | P20 base / Jan-Feb min stays / P13 base 250 | 350 / 5-night rule not in policy / not in policy | 330 / min 3-4 / 250 | - | Unchanged |

**Moved toward our asks:** P13 12 Nov **£181** (a-raise-1012nov met); P05 13-19 Dec -7% -> -2% (+£219); P13 10-20 Dec -7% -> -2%; P11 -5% -> -2%. P06 15-17 Nov back to £265/£264/£270 (algorithm, not Reyhan).
**Moved away:** **P12 -5% removed** -> 7-10 Dec +36% vs band (a-p12-trim gap £1,127 -> £1,186); 13 Dec +15% (£273 -> £369); **P04 new 6-22 Dec -5%**; P08 7 Nov +100% (lapsed at £417 vs the £225 proposed).

### Open plan items: status today
| Item | Status 8 Nov (evidence) |
|---|---|
| a-p05-9nov | **Not fixed, 9th check; night is tomorrow** (channel §3; comp-central) |
| t-p04-doublebook | **Not fixed, day 9.** 1455 sells 8-11 Nov (channel §1; comp-east) |
| t-pl-push-fresh | **Not met 7 Nov** (3h42-4h10 late; manual pushes). Re-armed: P09 08:16Z, P06 08:20Z, rest 12:30-12:35Z |
| a-airbnb-rules | **Not fixed, day 10.** 0.765 at 1-14 d, 0.900 at 28-42 d, 1.000 at 60+ d; cumulative £1,668.28 |
| **a-handback-lastnights** | **CLOSED: lapsed.** P08 7 Nov opened min 1 at 12:31:48Z but at +100% (£417); unsold. P08 fully booked to handback |
| **a-raise-1012nov** | **CLOSED: price met.** Both twins 12 Nov £181 (ask >= £176). Min 1 not done; 12 Nov sells as 11-13 Nov |
| **t-p09-cancel** | **CLOSED: resolved by events.** 8-10 Nov sold inside 7-11 Nov (£362.69). Payout for 158710021 moved to data gaps |
| t-p12-13dec-orphan | **Min-1 part done** (Reyhan 12:27:54Z). Price item stays open: £369 vs supported about £205 |
| a-discount-cut | Not done: **£1,510 / £820** (was £1,897 / £1,108; fell because Reyhan reduced DSOs, not because layers changed) |
| a-p12-trim | **Not done; reversed by Reyhan's edit** |
| a-p05-dec | Partly moved: 7-8 Dec £917 (P75 £1,175); 13-21 Dec £5,507 (P75 £5,818) |
| a-peak-check | Partly moved: P13 10-20 Dec -2%; 21-26 Dec -5% min 3 unchanged; P05 29 Dec £1,346 unchanged |
| t-p06-1521open | Price part moot (£265/264/270 restored). Opening still for you |
| t-p06-open | Price rose past the ask (10-11 Nov £228/£236 vs about £215/£223). Revised: remove Reyhan's -5% on 9-11 Nov (P0 -12% to -16%) |
| t-channel-gaps | Worse: 23 Dec £281 (dropped: market -2.7); 3 Jan £178 vs fortnight £199 |
| a-p20-conversion | Price asks dropped (13-16 Nov and 26 Dec, correction 8; 26 Dec P78). Listing fixes remain |
| t-p20-delivery | Unresolved; plus Reyhan's min 2 vs policy min 3 |
| t-p04-weekly, t-p13-los5, a-p05-earlybird, t-cleaning-commission | Unchanged (P13 adds £30.00 cleaning commission) |
| Others (a-amenities, a-bcom-cancel, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) | Unchanged; see JSON |

## Actions - 2026-11-08

**Ranking:** time-bound rows first (tomorrow's P05 night, tonight's Barking night, the 08:16-08:20Z pushes, the P09 last nights), then critical, then by expected £, then unquantified rows.

**Expected effect** = £ price move on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). These are upper bounds; elasticity is not measured.
- Next 30: P04 0.500, P05 0.733, P06 0.500 (ex-blocks), P09 0.944, P11 0.467, P12 0.600, P13 0.733, P20 0.536.
- Next 60: P05 0.633, P11 0.433, P12 0.556 (to handback), P13 0.517, P20 0.483.

**Bounds** (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P05 | **a-p05-9nov (TOMORROW, 9th check).** On Airbnb listing 1618929775762183214, **9 Nov: delete the custom nightly price and withdraw the "Special offer"** so the night reads the Smoobu rate; if the night cannot be cleared today, **block 9 Nov on Airbnb**. Check the Smoobu sync log for that date. **To sell the night (your call: lowers a PriceLabs price):** PriceLabs 3166592 DSO 9 Nov **+300% -> 0%, min 1** (uncustomized £335). | Airbnb > 1618929775762183214 > Calendar > 9 Nov; Smoobu > Channel Manager > Airbnb > sync log; PriceLabs 3166592 > DSO 9 Nov | channel §3 (07:20:41Z): £511.80 - £63.36 offer = £448.44 all-in = **£253.44 room** vs Smoobu **£1,378** min 1; unchanged since 31 Oct. comp-central: the one open comp asks £320 all-in; qp +0.15 supports about £368 all-in | Avoids **-£1,124.56** (£1,378 - £253.44) if it sells as is. If reset: upper bound £335 x 0.733 = **£246** | Corentin | 2026-11-08 |
| 2 | P04 | **t-p04-doublebook (critical, day 9).** On 1455876748739910219, **block 8 Nov tonight**, then every open night from 9 Nov, or snooze the listing. Then map 1455 to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §1 07:20:17Z: 8-11 Nov bookable £519.00; guest 161888271 in residence to 9 Nov. From 9 Nov 1455 sells 9-14 / 18-25 Nov / 6-20 Dec, all open on the synced listing and Booking.com (comp-east) | Protects **£355.72** room; relocation cost not quantified | Corentin | 2026-11-08 |
| 3 | P09 P06 P12 P11 P13 P05 P08 P20 P04 | **t-pl-push-fresh.** At **~08:30Z** read `last_date_pushed` on 3318172 (P09, due 08:16Z) and 3288517 (P06, due 08:20Z); **Sync Now on P09 regardless** (pushes £132/£141 and registers the 11 Nov block). At **~12:45Z** check 2699998, 3064196, 3064856, 3090701, 3166592, 3318167, 3547481, 3562176 and the P11/P13 Vrbo copies; Sync Now on any still dated 7 Nov. Then confirm 3090701 shows 7-9 Dec "Blocked". | PriceLabs > each listing > Sync Now | pricelabs H1: 7 Nov crossings 08:48Z, pushes 12:30-12:34Z only after manual saves (3h42-4h10 late); P09 refreshed 12:32Z, not pushed; H2: 11-12 Nov PL £132/£141 vs Smoobu £120/£128; M3 | Not quantified | Corentin | 2026-11-08 |
| 4 | P09 | **NEW t-p09-1112block (question first).** Who placed Smoobu "Blocked channel" **162726554 on 11 Nov** (created 7 Nov 18:37) and why? **If not intended:** delete it, so 11-13 Nov sells as a 2-night stay at £120/£128 (price supported: about £159 all-in, -3% vs band; do not cut). **If intended:** PriceLabs 3318172 DSO **12 Nov min 2 -> 1**, keep the price. Also check why Airbnb shows 11-13 Nov unavailable. | Smoobu > Calendar > Torrent Lodge > 11 Nov; PriceLabs 3318172 > DSO 12 Nov; Airbnb 1681417771483132994 > Calendar | occupancy orphan table; pricelabs H2; comp-east Priority 1 (not returned in 5 searches incl. 1-3 guests). Last unsold nights before the 26 Nov handback | Unblocked: £248 x 0.944 = **£234** (upper bound). Min 1 only: £128 x 0.944 = £121 | Corentin (ask Reyhan) | 2026-11-09 |
| 5 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 10).** Remove the hidden rules on every apartment and any global rule: 1-14 d (0.765), 28-~60 d (0.900) and whatever produced the extra 0.85 on P20's two bookings. Keep only visible discounts (policy `airbnb_visible_discounts`). Pull price details for Airbnb **162719002** (P20 6-14 Dec) and **162694102** (P20 19-26 Dec). P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Reservations | channel §2-3: 21 live searches 07:20-07:22Z, 0.765 on P04/P05/P06/P12/P13/P20 at 1-14 d, 0.900 at 28-42 d, 1.000 at 60-61 d. P20 6-14 Dec £1,494.25 = 0.6502 x £2,298 vs policy £1,953.30. comp-west: P0 -27.7% (6-14 Dec) and -31.7% (19-26 Dec) | **Realised -£459.05 on 7 Nov's P20 booking; cumulative £1,668.28** (£1,209.23 + £459.05). Forward: 23.5% on every Airbnb night sold 1-14 d out (not quantified) | Corentin | 2026-11-10 |
| 6 | P04 P05 P11 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off"). P04 live: last-minute -5% over 15 d, Aggressive occupancy (-30% to 0% at 0-15 d), Recency default. P11: Aggressive occupancy (18 Nov £158 vs uncustomized £225). **P12 excluded** (open nights above band, row 11). | PriceLabs > listing > Customizations | pricelabs H3, n30: P04 £702 (-22.8%), P05 £410, P11 £374, P20 £153; offsets P13 -£362, P09 -£13. Total **£1,510 / £820** | 702 x 0.500 + 410 x 0.733 + 374 x 0.467 + 153 x 0.536 - 362 x 0.733 - 13 x 0.944 = **£631 / 30 days** (upper bound) | Corentin | 2026-11-10 |
| 7 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,175 for the two nights** (P75; now £917) and **13-21 Dec to about £5,818** (P75; now £5,507). Reyhan's 13-19 Dec -2% is replaced (your call). | PriceLabs 3166592 > DSO | market §2: occupancy +6.4 / +2.2 and +2.9 to +10.6 vs STLY. comp-central: P25, -32% to -39% vs medians; `recommend` +25%, **capped at P75** (n = 3-4) | (£258 + £311) x 0.633 = **£360** | Corentin | 2026-11-10 |
| 8 | P13 P05 | **a-peak-check.** 3064856 and 3090701 **10-26 Dec to +10%** (replacing Reyhan's -2% on 10-20 Dec and -5% on 21-26 Dec: your call); **25-26 Dec min 3 -> 2**. P05 **29 Dec +100% -> 0%, min 1** (about £1,067; your call: lowers price). | PriceLabs 3064856 / 3090701 / 3166592 > DSO | market §2: 17 open nights £3,675, under P50 on every night, occupancy +5.1 to +25.3. comp-west: Christmas P5-P15; `recommend` +10% (60d lead +13 pts). P05 29 Dec £1,346 vs default £1,067 / P90 £1,085 | £368 x 0.517 = **£190**; P05 29 Dec cut not quantified | Corentin | 2026-11-10 |
| 9 | P20 | **NEW t-p20-5dec-orphan.** PriceLabs DSO **5 Dec min 3 -> 1**, keep £279. Outside policy's min-3 window (ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | occupancy orphan table; pricelabs M2 (`unbookable` = 1, user_price £332, uncustomized £384); comp-west: P67 vs market, the only 1-night comp asks £567 all-in | £279 x 0.90 Airbnb factor = £251 room; x 0.536 = **£135** | Corentin | 2026-11-10 |
| 10 | P13 P11 P04 P20 P12 | **a-p13-record: confirm or restore your settings** (table a-g). Not new proposals. Record P13 base 250. | PriceLabs 3064856 (+3090701), 3064196, 3562176, 3547481, 2699998; then `policy.json` | pricelabs C1; comp-central (darts P11 -47%); comp-west (P13 line, P20 P0); comp-east (P04 either) | If you restore: P13 8-12 Nov £870 x (1/0.95 - 1) x 0.733 = £34; P11 darts £1,078 x (1.05/0.98 - 1) x 0.467 = £36. **£70**; P04 / P20 restores lower prices (not quantified) | Corentin | 2026-11-10 |
| 11 | P12 | **a-p12-trim (your call: lowers a PriceLabs price).** DSO **7-10 Dec -25%** (£286/289/303/308 -> about £215/217/227/231 = £889). **30 Nov-3 Dec -15%** (£274/280/291/299 -> about £233/238/247/254 = £972). **18-21 Nov -5%.** Hold 12-14 Nov. Override of `recommend` 30d +10%, reason in Evidence. | PriceLabs 2699998 > DSO | comp-east: 7-10 Dec band P86 **+36.1%** (n = 14); 30 Nov-3 Dec P69 +18.3% (n = 16); 18-20 Nov +12.4%; qp **-0.15**. The 30d raise comes from booked nights; 60d `recommend` is hold. Pace30 -24.5% | Not quantified (a cut) | Corentin | 2026-11-10 |
| 12 | P12 | **t-p12-13dec-orphan (price item; your call).** Keep min 1 (done). DSO 13 Dec **+15% -> fixed £205**. | PriceLabs 2699998 > DSO 13 Dec | comp-east: £458 all-in, **P100, +55.3%** vs 1-night band £295 (n = 4); supported about £205 room. market: P50 £210, P90 £339 | Not quantified (a cut); the night is lost at the 13 Dec handback if unsold | Corentin | 2026-11-10 |
| 13 | P13 | **NEW t-p13-twins (confirm; policy conflict from Reyhan's copy-to-child).** Restore a gap on **9-17 Nov: 3090701 about 4% above 3064856** (DSO on 3090701 only), as in December (4.4-4.8%). Check whether the 8-12 Nov DSO left 3090701 linked as a child. | PriceLabs 3090701 > DSO 9-17 Nov | comp-west: price, user_price and uncustomized identical 9-17 Nov (7 Nov: 3090701 £9-13 above); channel §3: Airbnb totals identical. Policy `listing_facts.P13.twin_listings`. Quality supports 3090701 dearer (line -3% vs -15%) | Not quantified (duplicate-listing risk) | Corentin | 2026-11-09 |
| 14 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? 18-22 Nov is sold. **If yes:** record it in `policy.json` and set 15-17 Nov **+5%** (£278/£277/£284). **If no:** re-block 15-17 Nov in Smoobu. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov P0 -28% to -32%; `recommend(0.50, 0.49, 0.05, -0.036)` = +5%; prices already back at £265/£264/£270 | If confirmed: £40 x 0.500 = **£20** | Corentin | 2026-11-09 |
| 15 | P13 | **t-p13-los5 (confirm).** Visible Airbnb "Long stay discount" 10% on 5+ nights on both twins. Policy LOS is 7+ 15% / 28+ 20% only. Keep and record, or set LOS 5+ to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §3: £103.50 on 10-15 Dec; £103.32 / £97.74 on 20-25 Dec | **£103.50** per 5-night stay | Corentin | 2026-11-10 |
| 16 | P05 | **a-p05-earlybird.** Confirm the visible 12% early booking discount (60+ d) is yours, or set it to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §3: £147.96 on 7-10 Jan | **£147.96** per such stay | Corentin | 2026-11-10 |
| 17 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §3: £421.53 = 18.0% of £2,341.80 | **£70.25** per 6-19 Dec stay | Corentin | 2026-11-10 |
| 18 | P06 | **t-p06-open (revised; your call: Reyhan's -5%).** DSO **9-11 Nov -5% -> 0%** (£223/228/236 -> about £235/240/248). Hold tonight. | PriceLabs 3288517 > DSO 9-11 Nov | comp-central: 9-11 Nov P0 -16%, 10-12 Nov P0 -17%; 8-10 Nov P33 -6% (hold); `recommend` +5% | £36 x 0.500 = **£18** | Corentin | 2026-11-09 |
| 19 | P11 | **t-channel-gaps (revised).** **3 Jan >= £199** (fortnight; now £178, under P25 £180). **23 Dec ask dropped** (market -2.7 vs STLY). | PriceLabs 3064196 (+Vrbo) > DSO 3 Jan | market §2 / §4: 3 Jan +3.8 vs STLY | £21 x 0.433 = **£9** | Corentin | 2026-11-10 |
| 20 | P12 | **t-p12-26nov-price (your call: lowers price).** DSO 26 Nov **+15% -> -15%**, keep **min 1** (£323 -> about £239). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £373 all-in, **P100, +27-28%** (n = 2-4); supported £197-240 room | Not quantified (a cut) | Corentin | 2026-11-10 |
| 21 | P20 | **t-p20-delivery (confirm).** Block live 18-19 Nov; policy says 20-22 Nov and Airbnb sells 20-23 Nov. Also confirm Reyhan's min 2 vs policy min 3. Update `policy.json`, or re-block. | Smoobu > Calendar; `policy.json` | channel §6; comp-west | Not quantified | Corentin | 2026-11-10 |
| 22 | P11 P12 P13 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning: P12 £22.50, P11 £26.82, **P13 £30.00** per booking. Accept or challenge? | Booking.com extranet > Finance | channel §2, §6 | £22.50-£30.00 per booking | Corentin | 2026-11-12 |

## Top 5 for today
1. **P05 9 Nov is tomorrow.** Airbnb sells it at £253.44 room (£448.44 all-in, 20% "Special offer") against Smoobu £1,378: **-£1,124.56 if it sells.** Delete the 9 Nov custom price and offer on Airbnb 1618929775762183214, or block the night. To sell it, DSO 0% min 1 (£335), your call.
2. **Barking 1455, day 9:** it sells 8-11 Nov over the guest leaving 9 Nov (£355.72), and from 9 Nov overlaps all synced inventory. Block 8 Nov tonight, then every night; map to 3562176 or unlist.
3. **Pushes and P09:** 7 Nov pushes were 3h42-4h10 late and only after Reyhan's manual saves. P09 refreshed without pushing (£132/£141 vs £120/£128). Check P09 08:16Z / P06 08:20Z at ~08:30Z, Sync Now P09 anyway, the rest at ~12:45Z. **Ask who placed the P09 11 Nov block** (162726554); it makes 12 Nov unsellable and 11-12 Nov is closed on Airbnb.
4. **Orphans:** P20 5 Dec min 3 -> 1 at £279; P12 13 Dec is sellable (min 1) but £369 is +55% vs band, supported about £205 (your call).
5. **Airbnb layers day 10, cumulative £1,668.28** (P20 6-14 Dec -£459.05). Both December P20 stays and the P13 Booking.com stay sold at the bottom of comps. Then your calls on Reyhan's edits: P11 darts average £215.60 vs your >£300, P20 -5%/min 3 removed, P04 -3% vs -8%, P13 8-12 Nov -5% vs 0%, P13 twins identical 9-17 Nov, P12 -5% removed (+36% vs band).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).** Today 0.765x at 1-14 d, 0.900x at 28-42 d, 1.000x at 60+ d. Bookings take more: P20 0.6502x at 29 d, P09 0.7225x same-day. Target **1.00x before visible discounts by 2026-11-10** (row 5).
- **Booking.com since the 24 Oct markup cut** (channel §4): gross 18 / 67 n / £12,048.73 at 0.803x; **confirmed 14 / 54 n / £9,016.80 at 0.777x**; net of all cancellations +29 n / +£3,965.43. Pace 0.95 confirmed a day (target at least 1.0 a day by 2026-11-15). Promotions stay; the lever is the PriceLabs price under them.
  - P13 7-10 Dec paid 0.663x list (£246.20 under £731.40). Size only; stacking is settled.
- **Net to owner per £100 PriceLabs** (channel §5): Booking.com as sold about £61-66; Airbnb £64.64 at 0.765, **£54.94 on P20 6-14 Dec**. Models: Booking.com £97.75, Airbnb £84.50. Direct (£90 model) is not the cheapest channel against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 vs 4.86; P13 3090701 4.7 (10) / 3064856 4.31 (13) vs 4.78; P06 4.58 vs 4.67; P08 4.50 vs 4.87; P04 synced 4.11 vs 4.85 (unsynced 4.69 (26)); P05 4.77 vs 4.26; P09 5.0 (3) vs 4.58; P20 none vs 4.8. Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The -0.15 cap binds on P12, synced P04 and P13 3064856: it is why P12 December and P13 3064856 cannot carry a premium.
  - Fixes: P12 pre-arrival key-collection message; P13 3064856 cleanliness and photo accuracy; P20 and P09 review requests; map Barking 1455 to keep its 26 reviews. Target P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.** P20: 0 reviews, parking in first photo. P11: Booking.com CTR 0.81% vs 1.70% (policy) with every open stay at P0-P29; P11 is a basement with patio, 4 of 12 comps have a lift. P06: no lift (5 of 12 comps have one).
- **Gap fill / length of stay.** Orphans: P20 5 Dec (row 9), P09 12 Nov (row 4). P12 13 Dec sellable at min 1 (row 12). P13 25-26 Dec arrivals impossible under min 3 (row 8). P20 8-9 Nov is now a sellable 2-night gap (Reyhan's min 2). PriceLabs does not expose orphan rules (`get_customizations`), so an orphan-gap rule (min 1 on 1-night gaps) is the systemic fix: get the setting from PriceLabs > Customizations > Orphan day. Mid-term (91+ nights): NOT CHECKED.
- **Direct share.** 1.47% of room revenue (not re-run). Target 5% by 2027-06-30.
- **Event compression** (market §4): bookable excluding darts R1 **21 n / £312**; full **27 n / £612** (yesterday 29 / £609). The market supports raises only on P13 10-26 Dec, P05 December and P11 3 Jan; P04 14-19 Dec is held (correction 5).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **66.2%** (66.4% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£172.60** (£173.08) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£114.18** (£114.94) | £129 | 2026-12-18 |
| Revenue, last 30 | **£44,531.25** (258 n) | - | - |
| Booked next 30 (Smoobu) | **60.6%** (169/279) | each unit at least market + 10 pts (below: P11 46.7% vs 48%, P06 50.0% vs 49%) | 2026-11-12 |
| Booked next 60 | **50.6%** (237/468) | at least market + 10 pts (P11 43.3% vs 39%) | 2026-11-17 |
| 7-day pickup, net | gross 12 bk / 46 n / £8,843.45; **net +26 n / +£5,506.00** | at least 10 bookings a week, net positive | 2026-11-12 |
| P12 pace30 vs STLY | **-24.5%** (-9 n / -£1,103.52); to handback -23.2% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+7 n / +£2,161.34 like-for-like**; +11 n / +£3,018.13 incl. P06 reopened nights | positive and rising | 2026-11-12 |
| Booking.com paid / PriceLabs (since cut) | **0.777x** (14 confirmed / 54 n / £9,016.80) | median at least 0.80x | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x (1-14 d) / 0.900x (28-42 d) / 1.000x (60+ d)**, day 10; realised cost £1,668.28 | 1.00x before visible discounts | 2026-11-10 |
| PriceLabs-side gap | **£1,510 next 30; £820 next 14** | £0 apart from your own overrides | 2026-11-10 |
| Listings pushed more than 24 h late | **5 on 7 Nov** (3h42-4h10); today P09/P06 due 08:16-08:20Z | 0 | 2026-11-08 |
| PriceLabs vs Smoobu mismatches | **2** (P09 11-12 Nov) | 0 | 2026-11-08 |
| Unsellable orphan nights (next 60) | **2** (P09 12 Nov, P20 5 Dec) | 0 | 2026-11-10 |
| Double-sellable Barking stays | **8-11 Nov and every open night from 9 Nov**, day 9 | 0 | 2026-11-08 |
| Missed compression | **21 n / £312** excl. darts R1; full 27 n / £612 | under 10 nights | 2026-11-12 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-12; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Who placed the P09 11 Nov block and why** (162726554, 7 Nov 18:37): UNKNOWN. Source: Smoobu > Calendar > booking 162726554 > history, or ask Reyhan.
2. **The extra Airbnb layer on P20 162719002 and 162694102:** NOT CHECKED. Source: Airbnb > Reservations > price details.
3. **Smoobu Airbnb rule settings:** still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
4. **Why the 7 Nov pushes waited for manual saves, and why P09's 12:32Z refresh did not push:** UNKNOWN. Source: PriceLabs support / sync log.
5. **Why P20 5 Dec fell £332 -> £279 and why P04 November fell 3-6% under a smaller discount:** NOT CHECKED. Source: PriceLabs > Customizations (orphan rules not exposed by `get_customizations`).
6. **P05 9 Nov Airbnb custom price origin:** NOT CHECKED. Source: Airbnb host calendar + Smoobu sync log.
7. **Retained payouts:** P09 158710021 (1-10 Nov cancellation) and P13 162696296: NOT CHECKED. Source: Airbnb > Earnings.
8. **Listing 1455's own reservations:** NOT CHECKED. Source: Airbnb host 551951609 > Reservations.
9. **Booking.com displayed prices, comps and rank:** NOT CHECKED (AWS WAF 07:22:54Z; not bypassed). Source: extranet screenshots.
10. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
11. **Other:** Jan-Feb min-stay rule not in policy; P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; P02 Vrbo copy stale (24 Feb); event facts are search summaries (theo2.co.uk, excel.london, alexandrapalace.com return ENOTFOUND to WebFetch).

```json
{"scoreboard":{"note":"8 Nov 2026. Last 30 nights = 9 Oct-7 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward figures handback-aware, Smoobu confirmed stays as truth, P09 11 Nov block excluded. Pickup = bookings made 2-8 Nov net of cancellations. Base-rise like-for-like excludes P06 18-22 Nov (reopened nights). Airbnb ratios from 21 live searches 07:20-07:22Z (channel §3). PriceLabs gap from pricelabs H3. Booking.com since cut from channel §4. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"66.2%"},{"label":"ADR last 30","value":"£172.60"},{"label":"RevPAR last 30","value":"£114.18"},{"label":"Revenue last 30","value":"£44,531.25"},{"label":"Nights last 30","value":"258"},{"label":"Booked next 30","value":"60.6% (169/279)"},{"label":"Booked next 60","value":"50.6% (237/468)"},{"label":"7-day pickup","value":"gross 12 bk / 46 n / £8,843.45; cancelled 4 / 20 n / £3,337.45; net +26 n / +£5,506.00"},{"label":"P12 pace30 vs STLY","value":"-24.5% (-9 n / -£1,103.52)"},{"label":"Raised flats net since 18 Oct","value":"+7 n / +£2,161.34 like-for-like; +11 n / +£3,018.13 incl. P06 reopened nights"},{"label":"Booking.com since markup cut","value":"14 confirmed, 54 n, £9,016.80; 0.777x PriceLabs; gross 18 / 67 n / £12,048.73"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at 1-14 d; 0.900x at 28-42 d; 1.000x at 60+ d; day 10; P20 6-14 Dec -£459.05; £1,668.28 cumulative"},{"label":"PriceLabs-side gap","value":"£1,510 next 30; £820 next 14"},{"label":"Late pushes 7 Nov","value":"5 listings 3h42-4h10 late (P11, P13 x2, P08, P04, P13 Vrbo); due today P09 08:16Z, P06 08:20Z"},{"label":"PriceLabs vs Smoobu mismatches","value":"2 (P09 11-12 Nov)"},{"label":"Unsellable orphans","value":"2 (P09 12 Nov, P20 5 Dec)"},{"label":"Double-sellable Barking","value":"1455 sells 8-11 Nov over guest leaving 9 Nov (£355.72), day 9"},{"label":"Missed compression","value":"21 n / £312 excl. darts R1; full 27 n / £612"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"critical","title":"TOMORROW (9th check): Airbnb 9 Nov £253.44 room (£448.44 all-in, Special offer -£63.36 on £511.80) vs Smoobu £1,378 (-£1,124.56 if sold); delete the Airbnb 9 Nov custom price and offer or block the night; to sell, DSO +300% -> 0% min 1 (uncust £335, your call)","gbp":1124.56},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 9): unsynced Barking Airbnb 1455876748739910219 sells 8-11 Nov (£519.00) over guest in residence (161888271, leaves 9 Nov, £355.72) and from 9 Nov overlaps all synced inventory; block 8 Nov tonight, then all open nights; map to 3562176 or unlist","gbp":355.72},
{"id":"t-pl-push-fresh","status":"open","prop":"P09 P06 P12 P11 P13 P05 P08 P20 P04","priority":"high","title":"Not met 7 Nov: P11/P13/P08/P04 pushed 3h42-3h46 late (P13 Vrbo 4h10), only after Reyhan's manual saves; P09 refreshed 12:32Z without pushing (PL £132/£141 vs Smoobu £120/£128 on 11-12 Nov). Check P09 08:16Z / P06 08:20Z at ~08:30Z, Sync Now P09 anyway; rest at ~12:45Z","gbp":null},
{"id":"t-p09-1112block","status":"open","prop":"P09","priority":"high","title":"New: Smoobu Blocked channel 162726554 on 11 Nov (created 7 Nov 18:37, creator unknown) makes 12 Nov an unsellable min-2 orphan; 11-12 Nov not bookable on Airbnb; ask who/why; if unintended delete (11-13 Nov £120/£128, supported), else DSO 12 Nov min 1","gbp":234},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P04","priority":"critical","title":"Day 10, unchanged: remove hidden Smoobu Airbnb layers 0.765 (1-14 d) / 0.900 (28-42 d) and the extra 0.85 on bookings; P20 6-14 Dec £1,494.25 = 0.6502x £2,298, -£459.05 vs policy (P0 -27.7%); cumulative £1,668.28; pull 162719002 and 162694102 price details; P09 memo -£139.31 excluded (deprioritised)","gbp":459.05},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done: gap £1,510 next 30 / £820 next 14 (P04 -22.8%, £702; P11 18 Nov £158 vs uncust £225); set Last-minute, Occupancy, Booking Recency to Custom 0%; P12 excluded (open nights above band)","gbp":631},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Partly moved by Reyhan: 7-8 Dec £917 -> about £1,175 (P75, +£258) and 13-21 Dec £5,507 -> about £5,818 (P75, +£311); replaces Reyhan's 13-19 Dec -2% (your call)","gbp":360},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"Partly moved: P13 10-26 Dec 3064856 £3,675 (17 n) under P50 every night: +10% both twins replacing Reyhan's -2%/-5% (your call), 25-26 Dec min 2; P05 29 Dec £1,346 vs default £1,067: 0% min 1","gbp":190},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"New: P20 5 Dec 1-night orphan between 25 Nov-5 Dec and 6-14 Dec, min 3, unbookable at £279; DSO 5 Dec min 1, keep price (policy min-3 window ends 30 Nov)","gbp":135},
{"id":"a-p13-record","status":"open","prop":"P13 P11 P04 P20 P12","priority":"high","title":"For Corentin to confirm Reyhan's 7 Nov edits: P11 darts -2% (£1,078, avg £215.60 vs >£300); P20 -5% removed + min 2 on 7-24 Nov vs policy -5% / min 3; P04 9-24 Nov -3% vs -8% and new 6-22 Dec -5%; P13 8-12 Nov -5% vs 0%; P12 17 Nov price DSO removed (deprioritised); P20 base 330 vs 350; Jan-Feb min 3-4; record P13 base 250","gbp":70},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Reversed by Reyhan (-5% removed): 7-10 Dec £1,186 (+36% vs band, P86) -> -25% (about £889); 30 Nov-3 Dec £1,144 (+18%) -> -15% (about £972); 18-21 Nov -5%; override of 30-day recommend; lowers a PriceLabs price: Corentin's call","gbp":null},
{"id":"t-p12-13dec-orphan","status":"open","prop":"P12","priority":"medium","title":"Min-1 part done (Reyhan 7 Nov 12:27:54Z) but +15% = £369 room / £458 all-in, P100 +55% vs 1-night band (n=4); DSO 13 Dec fixed about £205, keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"New, policy conflict for Corentin: twins identical 9-17 Nov (price, user_price, uncustomized; Airbnb totals identical) after Reyhan's 8-12 Nov DSO copied to child 3090701; policy twin_listings says they must differ; restore 3090701 about 4% above 3064856","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; price part moot (algorithm restored £265/£264/£270 at 7 Nov 08:20Z); 18-22 Nov sold; if confirmed record in policy and +5% on 15-17 Nov (P0 -28% to -32%), else re-block","gbp":20},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Confirm: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (£103.50 on 10-15 Dec; £103.32/£97.74 on 20-25 Dec); not in policy LOS (7+ 15%, 28+ 20%); keep and record, or set LOS 5+ to 0%","gbp":103.5},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early booking (60+ d) still on (£147.96 on 7-10 Jan): not in policy - yours?","gbp":147.96},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£70.25 on 6-19 Dec)","gbp":70.25},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"Revised: algorithm lifted 10-11 Nov to £228/£236 (ask met); remaining: Reyhan's -5% on 9-11 Nov -> 0% (£223/228/236 -> about £235/240/248), P0 -12% to -17%, recommend +5% (your call); hold tonight (P33 -6%)","gbp":18},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Revised: 3 Jan £178 -> >= £199 (fortnight; under P25 £180; market +3.8); 23 Dec £281 ask dropped (market -2.7); Booking.com CTR 0.81% vs 1.70%","gbp":9},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £323 (£373 all-in, P100 +27-28%); DSO +15% -> -15% (about £239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"medium","title":"Confirm: block live 18-19 Nov, policy says 20-22 Nov; Airbnb sells 20-23 Nov; Reyhan's min 2 on 7-24 Nov vs policy min 3 to 30 Nov; update policy or re-block","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Booking.com commissions cleaning: P12 £22.50, P11 £26.82, P13 £30.00 per booking: accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Revised: price asks dropped (13-16 Nov PL £988 vs P50 £852, Reyhan's -5% removal already +5%; 26 Dec £344 P78 hold); guest-side P0 is the Airbnb layer (a-airbnb-rules); remaining: parking first photo, review requests","gbp":null},
{"id":"a-handback-lastnights","status":"done","prop":"P08","priority":"high","title":"Closed: P08 7 Nov lapsed unsold (min 1 set 12:31:48Z but at +100%, £417 vs £225 proposed); 8-13 Nov fully booked to the handback","gbp":null},
{"id":"a-raise-1012nov","status":"done","prop":"P13","priority":"medium","title":"Closed: price met, both twins 12 Nov £181 (ask >= £176) after Reyhan's -10% -> -5%; min 1 not set (12 Nov sells as 11-13 Nov); 3090701 differentiation moved to t-p13-twins","gbp":null},
{"id":"t-p09-cancel","status":"done","prop":"P09","priority":"medium","title":"Closed: resolved by events, 8-10 Nov sold inside Airbnb 7-11 Nov (£362.69, 0.7225x £502); 11-12 Nov moved to t-p09-1112block; payout for 158710021 NOT CHECKED (data gap)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -24.5% (-9 n / -£1,103.52), to handback -23.2%; correct open December via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 27 Nov 3064856 £332 / 3090701 £272 at +50%; 17 Nov £207 at +35%: confirm; no trim proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Booking.com cancellations in window (P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec): send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (12 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P13 Vrbo x2, Channex others); id_map P20 note min 220/base 350 vs PL 200/330; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps unchanged 8 Nov (no replacements; P08 4 comps absent 7 days, P01/P04 one each); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P05","title":"P05 9 Nov (tomorrow) sells on Airbnb at £253.44 room (Special offer) vs Smoobu £1,378: -£1,124.56 if sold; 9th check","evidence":"channel §3 p05_0910nov 07:20:41Z; comp-central P05 table."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 sells 8-11 Nov over the guest leaving 9 Nov (£355.72), day 9; from 9 Nov overlaps synced inventory","evidence":"channel §1 07:20:17Z £519.00; comp-east."},
{"agent":"pricelabs","severity":"high","ref":"P11 P13 P08 P04 P09","title":"7 Nov pushes 3h42-4h10 late, only after Reyhan's manual saves; P09 refreshed 12:32Z without pushing (PL £132/£141 vs Smoobu £120/£128)","evidence":"pricelabs H1, H2; live get_listing_data ~07:30Z."},
{"agent":"occupancy","severity":"high","ref":"P09","title":"Smoobu Blocked channel 162726554 on 11 Nov (7 Nov 18:37, creator unknown) makes 12 Nov an unsellable orphan; 11-13 Nov not bookable on Airbnb","evidence":"occupancy orphan table; pricelabs H2; comp-east Priority 1."},
{"agent":"channel","severity":"high","ref":"P20","title":"P20 6-14 Dec sold £1,494.25 = 0.6502x £2,298, -£459.05 vs policy; P0 -27.7% vs 7 comps; a-airbnb-rules cumulative £1,668.28","evidence":"channel §2; comp-west 6-14 Dec table; market §2b."},
{"agent":"occupancy","severity":"high","ref":"P20","title":"P20 5 Dec 1-night orphan, min 3, unbookable at £279","evidence":"occupancy orphan table; pricelabs M2; comp-west 5 Dec."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"Reyhan removed -5%: 7-10 Dec +36% vs band (P86), 30 Nov-3 Dec +18%; 13 Dec +15% = £458 all-in, +55% vs band; supported about £205 room","evidence":"comp-east Priority 2; pricelabs H4."},
{"agent":"pricelabs","severity":"high","ref":"P11 P20 P04 P13 P12","title":"Reyhan's 25 DSO edits 7 Nov cross five recorded decisions (P11 darts avg £215.60, P20 -5%/min 3, P04 -3% vs -8%, P13 8-12 Nov -5% vs 0%, P12 17 Nov)","evidence":"pricelabs C1 and log; comp-central; comp-west."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 twins identical 9-17 Nov after child copy; policy says they must differ","evidence":"comp-west twins section; channel §3."},
{"agent":"comp-west","severity":"medium","ref":"P13","title":"P13 Booking.com 7-10 Dec £485.20: P14 -18.3% vs comps, 0.699x market P50; 0.763x PriceLabs £636; commission 20% under Booster (expected)","evidence":"comp-west; market §2b; channel §2."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"Base-rise tally like-for-like +7 n / +£2,161.34 (was +3 / +£1,798.65); +11 / +£3,018.13 incl. P06; change is P09 7-11 Nov; pickup net +26 n / +£5,506.00","evidence":"occupancy.md base-rise and pickup sections."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £1,510 next 30 / £820 next 14 (was £1,897 / £1,108), fell via Reyhan's DSOs; P04 -22.8% unchanged layers","evidence":"pricelabs H3."},
{"agent":"market","severity":"medium","ref":"P13 P05 P11","title":"Raises still supported: P13 10-26 Dec +10% (+£368), P05 7-8 Dec +£258 and 13-21 Dec +£311 to P75, P11 3 Jan +£21; missed compression 21 n / £312 excl. darts R1","evidence":"market §2, §4, §5."}
],
"top5":[
"P05 9 Nov is tomorrow: Airbnb sells it at £253.44 room (£448.44 all-in, Special offer) vs Smoobu £1,378, -£1,124.56 if sold. Delete the 9 Nov custom price and offer on Airbnb 1618929775762183214 or block the night; to sell, DSO 0% min 1 (£335), your call.",
"Barking 1455 day 9: sells 8-11 Nov over the guest leaving 9 Nov (£355.72) and from 9 Nov overlaps all synced inventory. Block 8 Nov tonight, then every night; map to 3562176 or unlist.",
"Pushes: 7 Nov pushes 3h42-4h10 late and only after Reyhan's manual saves; P09 refreshed without pushing (£132/£141 vs £120/£128). Check P09 08:16Z / P06 08:20Z at ~08:30Z, Sync Now P09, rest at ~12:45Z. Ask who placed the P09 11 Nov block (162726554): it makes 12 Nov unsellable.",
"Orphans: P20 5 Dec min 3 -> 1 at £279. P12 13 Dec now min 1 but £369 (+55% vs band); supported about £205 (your call).",
"Airbnb layers day 10, cumulative £1,668.28 (P20 6-14 Dec -£459.05); December P20 stays P0 -28%/-32%, P13 Booking.com P14 -18%. Confirm Reyhan's edits: P11 darts avg £215.60 vs >£300, P20 -5%/min 3 removed, P04 -3% vs -8%, P13 8-12 Nov -5% vs 0%, twins identical 9-17 Nov, P12 -5% removed."
],
"per_property":[
{"ref":"P01","change":"Pushed 8 Nov 05:11Z; nothing open to the 20 Dec handback."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 8 Nov 03:25Z via Channex."},
{"ref":"P04","change":"1455 sells 8-11 Nov over the guest leaving 9 Nov (day 9); Reyhan 9-24 Nov -3% (policy -8%) and new 6-22 Dec -5%; November fell 3-6%; weekly 18% (£70.25); gap £702; rec base 221; fwd30 50.0% vs 24%."},
{"ref":"P05","change":"9 Nov Airbnb £253.44 vs Smoobu £1,378 (9th check, tomorrow); 13-21 Dec £5,507 (Reyhan -2%); 7-8 Dec £917; 29 Dec £1,346; 12% early bird; fwd30 73.3% vs 43%."},
{"ref":"P06","change":"Algorithm lifted 8-11 Nov to £219-236 and restored 15-17 Nov to £265/264/270; 18-21 Nov now Booked in PriceLabs; Reyhan -5% 8-14 Nov unchanged; 7/14 non-blocked booked."},
{"ref":"P07","change":"Intentional block; pushed 8 Nov 04:11Z."},
{"ref":"P08","change":"7 Nov lapsed unsold at £417 (+100% min 1); fully booked to the 13 Nov handback."},
{"ref":"P09","change":"7-11 Nov sold £362.69 (0.7225x £502); new Smoobu block 11 Nov makes 12 Nov an orphan; Airbnb closed 11-13 Nov; PL/Smoobu mismatch 11-12 Nov (no push since 08:16Z); fwd30 94.4%."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"Reyhan -5% -> -2% but prices fell 2-8% (uncust fell); darts £1,078 avg £215.60; 18-20 Nov P0 -43%; 23 Dec £281; 3 Jan £178; fwd30 46.7% vs 48%."},
{"ref":"P12","change":"Reyhan removed -5%: 7-10 Dec £1,186 (+36% vs band), 30 Nov-3 Dec £1,144; 13 Dec +15% min 1 £369; 26 Nov £323 P100; pace30 -24.5%."},
{"ref":"P13","change":"Booking.com 7-10 Dec sold £485.20 on 3064856 (P14 -18.3%); Reyhan 8-12 Nov -5%, 10-20 Dec -2%; 12 Nov £181 (ask met); twins identical 9-17 Nov; 3090701 7-9 Dec open in PriceLabs only."},
{"ref":"P14","change":"Numbers only: 109 of 180 open nights at £500; 0% vs 46%."},
{"ref":"P20","change":"Airbnb 6-14 Dec sold £1,494.25 (0.6502x; P0 -27.7%; -£459.05 vs policy); 5 Dec orphan min 3 unbookable; Reyhan removed -5% and set min 2 on 7-24 Nov; 26 Dec £344 P78; fwd30 53.6% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback (occupancy.md)."},
{"ref":"P04","base":"220 (rec 221)","recommendation":"Hold 220","reason":"50.0% vs 24%; base +26.4% vs P50; November -27% vs comps, December at parity; qp -0.15 (comp-east; pricelabs M4)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"73.3% vs 43%; December P25; qp +0.15; recommend +25% (comp-central)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 7 of 14 non-blocked nights booked (50.0% vs 49%); base -11.9% vs P50 (pricelabs M4)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"94.4% vs 36% to the 26 Nov handback (occupancy.md)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"46.7% vs 48%; comps P0-P29; recommend +5%; lever is PriceLabs discounts and Reyhan's -2% (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open December with date overrides (a-p12-trim), not the base","reason":"60.0% vs 42%; pace30 -24.5%; open December P86-P92 vs band with qp -0.15; base +38.5% vs P50; handback 13 Dec (comp-east; pricelabs M4)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 44% (+29 pts); recommend +10% (comp-west)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"53.6% vs 38% (30d), 48.3% vs 31% (60d); 0 reviews; base +31.5% vs P50 (comp-west; pricelabs M4)."}
]}
```

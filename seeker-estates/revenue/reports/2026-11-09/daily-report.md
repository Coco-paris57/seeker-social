# Seeker Estates - Daily revenue report, 2026-11-09 (Monday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-09/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-09/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-08/daily-report.md` and its JSON, the dashboard action list (9 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/max come from `data/snapshots/2026-11-09/listings.csv` (unchanged since 7 Nov).
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.
- Process note: the market section sent six `get_neighbourhood_data` calls together, against the one-call-at-a-time rule. All returned `all_operations_ok`, so no data was lost.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. The P06 15-21 Nov opening stays with you to confirm (t-p06-1521open). It is not a proposal.
- P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Not raised again: Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov, P13 1 Dec, P13 twin price order, the P09 Airbnb rules screen, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - Four proposals lower a PriceLabs price: a-p12-trim, t-p12-13dec-orphan, t-p12-26nov-price and the P05 9 Nov / 29 Dec resets. Each is marked "your call", with the evidence.
  - Reyhan's 8 Nov edits (8 more cuts) that cross your decisions are listed for you to confirm (a-p13-record). They are not proposed again.
- P20 9 Nov (tonight, £200 floor, min 2) is a 1-night orphan. Selling it needs min 1, which is below your recorded P20 min 3 to 30 Nov. **No proposal; it lapses tonight.**

## Corrections and conflicts resolved between sections

1. **P05 15-21 Dec: what made the 0.81.** pricelabs could not name the second 0.9 (NOT CHECKED). channel found a **visible Airbnb "Long stay discount" 10%** on P05 (6-night card, 11-17 Jan). comp-central's LOS test at 56 days out shows it from **5 nights** (4-9 Jan and 4-10 Jan), and 7 nights switches to the weekly 15%. **I use 5+ nights.** Split of the -£694.83: hidden 0.9 layer £365.70, visible long-stay £329.13 (channel §2). At 56 days the two layers did not stack (net 0.900); at 37 days the booking paid both (0.81). Why: NOT CHECKED, needs the Airbnb breakdown of 162753757.
2. **How cheap was it?** comp-central: **P33, -44%** vs the comp median £940 (n = 3 survivors). market: **at P50 (£7 under), £970 under P75** (0.753x), on nights +2.9 to +8.5 pts vs STLY. Both say it sold cheap. The list price was £275 under P75 and the Airbnb layers took £695 more.
3. **P13 twins.** pricelabs and comp-west say "fixed": November and December now differ (3090701 about 6% under in November, about 5-6% over in December). channel (Smoobu to 8 Feb) finds them **identical on all 32 open nights, 8 Jan-8 Feb**; the PriceLabs raw window ends 8 Jan, so pricelabs saw only one of those nights. **Resolution: November/December closed; t-p13-twins stays open for January only.**
4. **P20 13-16 / 20-23 Nov.** comp-west: P0, -28% and -21.5%, `recommend` +10%. market: PriceLabs is already above P50 (P59-P61; 14-15 Nov -8.1 / -7.9 vs STLY), so no raise. **Resolution:** the guest-side gap is the 0.765 Airbnb layer (a-airbnb-rules), not the PriceLabs price. **13-17 Nov -5% matches your 24 Oct decision: confirm it, no change. 20-24 Nov -5% is outside policy and both sections support removing it** (comp-west P0 of n = 8; market 20 / 21 / 23 Nov +4.6 / +1.9 / +6.5). No +10% on top.
5. **P13 Christmas sizing.** market: +10% (+£362), under P50 on all 17 nights, under P25 on 25-26 Dec. comp-west: hold 14-16 Dec midweek at -5% (P57-P71 of n = 7, 10-20% above the quality line); raise the rest. **Resolution: +10% on 10-13 and 17-26 Dec (`recommend`), hold 14-16 Dec at -5%.** The override on 14-16 Dec is backed by comp-west's n = 7.
6. **P11 23 Dec / 3 Jan targets.** channel used £320 / £204; market (which owns event sizing) has 23 Dec at -3.2 vs STLY (hold) and 3 Jan fortnight £196. **I use market: 23 Dec hold, 3 Jan >= £196.**
7. **Push freshness.** All six late pushes on 8 Nov were 7 m 31 s-10 m 35 s past 24 h, each 1-2 min after one of Reyhan's saves. P12 and P05 refreshed at 12:37-12:40Z without pushing. No price was left unpushed (pricelabs H2: 0 mismatches over £2), but **PriceLabs had not registered the P05 15-21 Dec booking** at 07:21Z.
8. **18 Oct base rises (corrected method):** like-for-like **+13 n / +£5,123.51** (was +7 / +£2,161.34). Including the P06 reopened nights it is **+17 n / +£5,980.30** (was +11 / +£3,018.13). The whole change is P05 15-21 Dec (+6 n / +£2,962.17).

## Executive summary

1. **TONIGHT: P05 9 Nov, tenth check.** Airbnb sells it at **£281.60 room** (£476.60 all-in: £547.00 less a "Special offer" of £70.40) against Smoobu **£1,403** (+300% DSO). Still unsold at 07:21Z. **If it sells today: -£1,121.40.** After tonight the night passes, so this item closes tomorrow either way.
2. **New P05 booking, 15-21 Dec: £2,962.17 = 0.81x the £3,657 on sale (-£694.83).** That is the hidden 0.9 layer times a visible 10% long-stay discount on a 6-night stay; neither is in policy. It sold P33 / -44% vs comps and £970 under market P75. a-airbnb-rules cumulative is now **£2,363.11**. Smoobu records it as "modification of booking" (price details read "Cancellation Payout £2,667.81"): **please confirm it is a live stay.**
3. **New P05 orphans from that booking:** 13-14 Dec (£579 / £565, min 3) and 21 Dec (£645, min 2) cannot sell. Set **13-14 Dec min 2 and 21 Dec min 1**, keeping the price (comp-central: 13-15 Dec is already P25 / -27%).
4. **Barking 1455, day 10.** The guest in residence left today, but the unsynced listing is still bookable on every open P04 run (9-12 Nov £539.00; 6-13 Dec £1,291). Any booking there is a double booking.
5. **Reyhan made 8 more cuts on 8 Nov (12:38-12:41Z), for you to confirm.** P11 10 Nov-18 Dec -5% (darts now £1,039, average **£207.80** vs your >£300); P13 10-20 Dec -5%; P20 13-17 / 20-24 Nov -5% min 2; P04 9-24 Nov -5% vs your -8%. **PriceLabs discount gap rose to £1,816 next 30 / £1,136 next 14** (from £1,510 / £820).

**Last 30 nights (10 Oct-8 Nov, 13 units):** occupancy **65.4%**, ADR **£171.65**, RevPAR **£112.24**, revenue **£43,772.01** (255 n; kpi_pack `portfolio_last30`). Yesterday: 66.2% / £172.60 / £114.18 / £44,531.25.
**Next 30 (9 Nov-8 Dec):** **59.5%** (163/274; yesterday 60.6%). **Next 60:** **50.9%** (235/462; yesterday 50.6%). Smoobu truth, handback-aware; policy blocks, P01 gap block, P20 18-19 Nov and P09 11 Nov excluded. kpi_pack on-the-books nights match Smoobu on every unit.
**7-day pickup (made 3-9 Nov):** gross 11 bookings / 47 n / £10,865.51; cancelled 4 / 20 n / £3,337.45; **net +27 n / +£7,528.06** (yesterday +26 n / +£5,506.00).

## Base review

`base_price`, `min_price` and `max_price` are unchanged on all 20 listings (listings.csv 8 vs 9 Nov). Recommended bases moved only on P13 (237 -> 239, 236 -> 238), P02 (176 -> 177) and P08 (254 -> 252). Base vs market is from pricelabs M3.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% booked to the 20 Dec handback | **Hold; off the agenda** |
| P04 | 220 / 221 | 46.7% vs 24%; base +25.0% vs P50; November about -25% vs comps, December at parity; qp -0.15 | **Hold 220** |
| P05 | 550 / 544 | 70.0% vs 43%; open December P25 vs comps; qp +0.15; `recommend` +25%; base -4.3% vs P50 | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 7/13 non-blocked (53.8% vs 49%); base -11.9% vs P50 | **Hold** (policy block) |
| P09 | 176 / 176 | 94.1% vs 37% to handback | **Hold** |
| P11 | 286 / 283 | 43.3% vs 48%; comps P0-P33; `recommend` +5% | **Hold 286**; the levers are Reyhan's -5% (a-p13-record) and visibility |
| P12 | 284 / 284 | 56.7% vs 42%; **pace30 -24.5%** (-9 n / -£1,061.60); open nights band P62-P100; base +38.5% vs P50 | **Hold 284; fix the level with date overrides** (a-p12-trim). Handback 13 Dec |
| P13 | 250 / 239 (238) | 76.7% vs 44% (+33 pts) | **Keep 250 and record it in policy** |
| P20 | 330 (your 350) / 351 | 57.1% vs 38% (30d), 48.3% vs 31% (60d); 0 reviews; base +31.5% vs P50 | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 8 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+13 n / +£5,123.51** (was +7 / +£2,161.34) | Change = P05 15-21 Dec (+6 n / +£2,962.17) |
| Raised, including P06 18-22 Nov | +17 n / +£5,980.30 (made 22 / 76 n / £17,687.65; cancelled 9 / 59 n / £11,707.35) | P06 nights reopened 5 Nov |
| Unraised (P02, P08, P10, P14, P20*) | +44 n / +£7,640.04 (unchanged) | |
| P13 (base 235 -> 250, not in policy) | +19 n / +£3,394.96 (unchanged) | |

\* P20's base was cut twice, so it is not a clean control.
- **Per raised flat:** P05 **+12 n / +£4,915.21** (largest), P06 +10 / +£2,202.56, P12 +6 / +£741.60, P01 +3 / +£720.90, P09 -3 / -£244.70, P11 **-11 / -£2,355.27**.
- **Reading:** positive and rising like-for-like. **Hold the bases.** P11 is the weak one, and its open nights sit at comp P0-P33, so the problem there is not the base.

### Per property
| Ref | Change since 8 Nov |
|---|---|
| P01 | Pushed 9 Nov 05:15Z. Nothing open before the 20 Dec handback. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy last pushed 24 Feb. |
| P04 | **1455 still bookable on all open runs (day 10)**; the guest in residence left 9 Nov. Reyhan 9-24 Nov -3% -> **-5%** (policy -8%). 23 Nov £205 -> £158 (PriceLabs default fell 236 -> 212). Weekly 18% (£70.17 on 6-19 Dec). Gap n30 £651 (-20.4%). |
| P05 | **9 Nov Airbnb £281.60 vs Smoobu £1,403 (10th check, tonight).** **New Airbnb 15-21 Dec £2,962.17** (0.81x £3,657; -£694.83). New orphans 13-14 Dec (min 3) and 21 Dec (min 2). 7-8 Dec £913. 29 Dec £1,332. Visible 12% early booking and 10% long-stay (5+ n). PriceLabs had not yet registered the booking. |
| P06 | PriceLabs model cut 5-7% (8 Nov 08:00Z refresh): 9-11 Nov £211/213/224, 15-17 Nov £249/249/255. Two comps sold 15-18 Nov; we did not, at P0. 8 Nov lapsed unsold. |
| P08 | Fully booked to the 13 Nov handback. |
| P09 | PriceLabs now registers the 11 Nov block; the 11-12 Nov mismatch is gone (£122 / £126). **12 Nov still a min-2 orphan**; who placed block 162726554 is unknown. |
| P10 | Booked to the 18 Nov handback. |
| P11 | Reyhan 10 Nov-18 Dec -2% -> **-5%**. Darts 13-17 Dec **£1,039, average £207.80**. 18-20 Nov £152 (P0 -47%). 3 Jan £174 (under P25 £180). |
| P12 | No edits. 7-10 Dec £1,192 (+28% vs band, P85); 30 Nov-3 Dec £1,139 (+17%); 13 Dec £364 (+54%); 26 Nov £317 (+27%). Pace30 -24.5%. |
| P13 | Reyhan 10-20 Dec -2% -> **-5%** (both twins, Vrbo). Christmas 17 open nights £3,623 (was £3,675), under P50 every night. Twins differ in November/December, **identical 8 Jan-8 Feb**. 3090701 7-9 Dec now Blocked in PriceLabs (fixed). 8 Nov lapsed unsold. |
| P14 | Numbers only: 108 of 179 open nights at £500; 0% vs 46%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | Reyhan re-added **-5% min 2 on 13-17 and 20-24 Nov**. 23 Nov £333 -> £244 (market +6.5). Price / uncustomized fell about 0.87 -> 0.83 on all dates (likely the occupancy profile; NOT CONFIRMED). 5 Dec orphan unchanged. 9 Nov tonight orphan at £200 (policy min 3: no proposal). |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
8 Nov entries are all reyhan@, 12:38:36-12:41:48Z, "Added Date Specific Override" (pricelabs log). Group and account logs: 0 entries. Nothing on P05, P06, P09 or P12.

| # | Ref / dates | Your decision | Now | Evidence | Direction |
|---|---|---|---|---|---|
| a | **P11 darts 13-17 Dec** (inside 10 Nov-18 Dec) | +5%, average above £300 (21/24 Oct) | **-5%**: £1,039, **average £207.80** | comp-central P11 / -48% vs median £394 (n = 9); market R1 soft (-0.6 to -7.7) | Further from your decision |
| b | **P20 13-17 Nov** | -5% to 19 Nov; min 3 to 30 Nov | -5% back on, **min 2** | matches your price; min 2 vs min 3 | Price: confirm. Min stay: against policy |
| b2 | **P20 20-24 Nov** | none (outside your -5% window) | **-5%**, min 2 | comp-west P0 of 8, -21.5%; market +4.6 / +1.9 / +6.5 | Against evidence: **remove** (correction 4) |
| c | **P04 9-24 Nov** | -8% on 1-25 Nov (24 Oct) | **-5%** | comp-east: either level stays under the -15% quality line | Either fits |
| d | **P13 10-20 Dec** | none recorded; standing direction | **-5%** (was -2%) | market under P50 every night, +4.2 to +25.6 pts; comp-west: hold midweek only | Against standing direction (a-peak-check) |
| e | Carried from 7 Nov: P13 8-12 Nov -5% (policy 0%); P04 6-22 Dec -5%; P20 base 330 vs 350; P13 base 250 and Jan-Feb min stays not in policy | | unchanged | | Still to confirm |

### Open plan items: status today
| Item | Status 9 Nov (evidence) |
|---|---|
| a-p05-9nov | **Not fixed, 10th check; night is tonight.** Room £253.44 -> £281.60 (the 0.9 layer fell away at lead 0; the 20% offer remains). Closes 10 Nov |
| t-p04-doublebook | **Not fixed, day 10** (channel §4; comp-east) |
| t-pl-push-fresh | **Not met 8 Nov** (second day). Re-armed: P09 07:56Z, P06 08:00Z, P05/P12/P08 08:53Z, rest 12:39-12:43Z |
| a-airbnb-rules | **Not fixed, day 11.** Cumulative £2,363.11 |
| t-p09-1112block | **Half resolved:** PriceLabs registers the block, mismatch gone. 12 Nov orphan and block reason open |
| a-discount-cut | Not done; **gap up to £1,816 / £1,136** (Reyhan's P11 and P20 DSOs) |
| a-p05-dec | **Overtaken in part:** 15-20 Dec sold below the ask. 7-8 Dec and the orphans remain |
| a-peak-check | Not done; **moved the other way** (P13 10-20 Dec -5%) |
| a-p12-trim, t-p12-13dec-orphan, t-p12-26nov-price | Not done (comp-east: gaps about unchanged) |
| t-p13-twins | **November/December fixed; January identical** (32 nights) |
| t-p20-5dec-orphan | Not fixed (min 3, `unbookable` = 1) |
| a-p13-record | Not done; **list grew** (table above) |
| t-p06-1521open, t-p06-open | Unchanged; prices fell 5-7% from the PriceLabs model |
| t-channel-gaps | 3 Jan worse (£174); 23 Dec hold |
| t-p04-weekly, t-p13-los5, a-p05-earlybird, t-cleaning-commission, t-p20-delivery, a-p20-conversion | Unchanged |
| Others (a-amenities, a-bcom-cancel, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped) | Unchanged; see JSON |

## Actions - 2026-11-09

**Ranking:** time-bound rows first (tonight's P05 night, Barking, today's pushes and the P05 booking check, the P05 orphans created today), then critical, then by expected £, then unquantified rows.

**Expected effect** = £ change on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). For Airbnb nights, the Smoobu price is first multiplied by the observed Airbnb factor (channel §3). These are upper bounds; elasticity is not measured.
- Next 30: P04 0.467, P05 0.700, P06 0.538 (ex-blocks), P09 0.941, P11 0.433, P12 0.567, P13 0.767, P20 0.571.
- Next 60: P05 0.717, P11 0.417, P12 0.543 (to handback), P13 0.517, P20 0.483.

**Bounds** (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every proposed price is inside its bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P05 | **a-p05-9nov (TONIGHT, 10th and last check).** On Airbnb 1618929775762183214, **9 Nov: delete the custom nightly price and withdraw the "Special offer"**, or **block 9 Nov on Airbnb**. To sell the night instead (your call: lowers a PriceLabs price): PriceLabs 3166592 DSO 9 Nov **+300% -> 0%, min 1** (uncustomized £335, 8 Nov raw). **Tomorrow: close the item** (realised -£1,121.40 if sold, lapsed if not). | Airbnb > 1618929775762183214 > Calendar > 9 Nov; PriceLabs 3166592 > DSO 9 Nov | channel §1 07:21:02Z: £547.00 - £70.40 offer = £476.60 all-in = **£281.60 room** (0.201x) vs Smoobu **£1,403** min 1; unsold at 07:21Z. comp-central: the one open comp asks £320 all-in; qp +0.15 supports about £368 all-in | Avoids **-£1,121.40** (£1,403 - £281.60) if it sells as is. If reset: £335 x 0.700 = **£235** (upper bound) | Corentin | 2026-11-09 |
| 2 | P04 | **t-p04-doublebook (critical, day 10).** On 1455876748739910219, **block every open night from 9 Nov**, or snooze the listing. Then map it to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §4 07:21Z: 9-12 Nov £539.00, 10-13 Nov £557.40, 6-19 Dec bookable; comp-east: bookable on every P04 open run, 10 Nov-20 Dec. All are open on the synced listing and Booking.com | Not quantified (exposure = any booking on 1455 plus relocation cost) | Corentin | 2026-11-10 |
| 3 | P05 P09 P06 P12 P08 P11 P13 P20 P04 | **t-pl-push-fresh.** At **~09:00Z** read `last_date_pushed` on 3318172 (due 07:56Z), 3288517 (08:00Z), 3166592 / 2699998 / 3318167 (08:53Z); at **~12:50Z** on 3064196, 3064856, 3090701, 3547481, 3562176 and the P11/P13 Vrbo copies. Sync Now on any still dated 8 Nov. **Then confirm 3166592 shows 15-20 Dec "Booked"** (row 5 depends on it). | PriceLabs > each listing > Sync Now | pricelabs H1: 8 Nov six late pushes, 7 m 31 s-10 m 35 s, each 1-2 min after a Reyhan save; P12/P05 refreshed 12:37-12:40Z without pushing. H2: P05 15-20 Dec still open in PriceLabs at £569-650 | Not quantified | Corentin | 2026-11-09 |
| 4 | P05 | **NEW t-p05-1521-live (question).** Confirm Airbnb 15-21 Dec (Smoobu 162753757, £2,962.17) is a live stay. Smoobu `type` = "modification of booking" (modified 21:57:04); price details read "Cancellation Host Fee £489.36 / Cancellation Payout £2,667.81". | Smoobu > Bookings > 162753757; Airbnb > Reservations | pricelabs H2; channel §2. `reservations.csv` shows it confirmed and the Smoobu calendar is closed | Not quantified (£2,962.17 at stake; if not live, 13-21 Dec reopens and row 5 changes) | Corentin | 2026-11-09 |
| 5 | P05 | **NEW t-p05-dec-orphans.** PriceLabs DSO **13-14 Dec min 3 -> 2** and **21 Dec min 2 -> 1**. Keep the prices (£579 / £565 / £645). Do it after row 3 shows 15-20 Dec Booked. | PriceLabs 3166592 > DSO 13-14 Dec, 21 Dec | occupancy orphan table; pricelabs H3 (13-14 Dec pinned by Reyhan's 13-19 Dec min 3; 21 Dec by DSO min 2 of 26 Oct). comp-central: 13-15 Dec already P25 / -27% at today's price. market: +10.9 / +3.6 / +3.4 vs STLY; our price under P75 (£587 / £589 / £708) | £1,789 x 0.900 Airbnb factor (29-59 d) x 0.717 = **£1,154** (upper bound; today £0) | Corentin | 2026-11-10 |
| 6 | P20 P12 P13 P05 P06 P04 | **a-airbnb-rules (critical, day 11).** Remove the hidden rules on every apartment and any global rule: nights 1-28 d (0.765), 29-59 d (0.900), same-day stays (0.850), and whatever stacks extra layers on bookings. Keep only visible discounts (policy `airbnb_visible_discounts`). Pull price details for **162753757** (P05), 162719002 and 162694102 (P20). P09 excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Reservations | channel §3: 23 live searches 07:21-07:23Z; mixed-lead stays fit per-night bands to the penny (P05 7-9 Dec, P12 7-10 Dec). P05 15-21 Dec 0.81x: hidden £365.70 + visible £329.13 | **Realised -£694.83 on 8 Nov's P05 booking; cumulative £2,363.11** (£1,668.28 + £694.83). Forward: 23.5% on every Airbnb night sold up to 28 d out (not quantified) | Corentin | 2026-11-10 |
| 7 | P09 | **t-p09-1112block (question first).** Who placed Smoobu "Blocked channel" **162726554 on 11 Nov**, and why? **If not intended:** delete it so 11-13 Nov sells at £122 / £126 (supported: about £159 all-in, -3% vs band; do not cut). **If intended:** DSO **12 Nov min 2 -> 1**, keep £126. | Smoobu > Calendar > Torrent Lodge > 11 Nov; PriceLabs 3318172 > DSO 12 Nov | occupancy; pricelabs H3 (`unbookable` = 1); comp-east Priority 3: last unsold nights before the 26 Nov handback; a price cut below £100 min is not possible | Unblocked: £248 x 0.941 = **£233**. Min 1 only: £126 x 0.941 = £119 | Corentin (ask Reyhan) | 2026-11-10 |
| 8 | P04 P05 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off") on P04 and P05. P04 live: last-minute -5% over 15 d, Aggressive occupancy, Recency default. P11 and P20 gaps are now mostly Reyhan's DSOs (row 12); P20's 0.87 -> 0.83 drop points to its Aggressive occupancy profile too (comp-west; NOT CONFIRMED). **P12 excluded** (open nights above band). | PriceLabs 3562176 / 3166592 (then 3064196, 3547481) > Customizations | pricelabs H4, n30: P04 £651 (-20.4%), P05 £409, P11 £572, P20 £323, P12 £183; offsets P13 -£319, P09 -£3. **Total £1,816 / £1,136** | 651 x 0.467 + 409 x 0.700 = **£590 / 30 days** (upper bound). P11/P20 customization share not separable | Corentin | 2026-11-11 |
| 9 | P05 | **a-p05-dec (revised).** 15-20 Dec is sold. DSO **7-8 Dec +3% -> about +28%** (£464 / £449 -> about **£580 / £561**, `recommend` +25%). 13-14 / 21 Dec: min stay first (row 5); their price gap to P75 is only +£95. | PriceLabs 3166592 > DSO 7-8 Dec | comp-central: 7-9 Dec P25 / -42% vs £828.50 (n = 4); `recommend(0.700, 0.43, 0.25, 0.15)` = +25%; market P75 £1,170, +6.5 / +3.0 vs STLY | £228 x 0.717 = **£163** | Corentin | 2026-11-11 |
| 10 | P13 P05 | **a-peak-check (revised; your call over Reyhan's -5%).** Both twins **10-13 Dec and 17-26 Dec: +10%** (DSO -5% -> about +5%); **hold 14-16 Dec at -5%**; **25-26 Dec min 3 -> 2**. P05 **29 Dec +100% -> 0%, min 1** (about £1,068; lowers price). | PriceLabs 3064856 / 3090701 / 3166592 > DSO | market §3: 17 open nights £3,623, under P50 every night, under P25 on 25-26 Dec, +4.2 to +25.6 pts; `recommend` +10%. comp-west: 14-16 Dec P57-P71 of n = 7 (override reason). P05 29 Dec £1,332 vs default £1,068 / P90 £1,084; no comp (n = 0) | (£3,623 - £601 on 14-16 Dec) x 10% x 0.517 = **£156**; P05 29 Dec cut not quantified | Corentin | 2026-11-11 |
| 11 | P20 | **t-p20-5dec-orphan.** DSO **5 Dec min 3 -> 1**, keep £281. Outside policy's min-3 window (ends 30 Nov). | PriceLabs 3547481 > DSO 5 Dec | pricelabs H3 (`unbookable` = 1, uncust £370); comp-west: P67 vs market, the only 1-night comp £567 | £281 x 0.90 x 0.571 = **£144** | Corentin | 2026-11-10 |
| 12 | P11 P20 P04 P13 P12 | **a-p13-record: confirm or restore your settings** (table a-e). Not new proposals. The one evidence-backed change: **P20 20-24 Nov -5% -> 0%** (correction 4). Record P13 base 250. | PriceLabs 3064196, 3547481, 3562176, 3064856 (+3090701); then `policy.json` | pricelabs C1; comp-central (darts -48%); comp-west (P20 P0); comp-east (P04 either) | If restored: P11 darts £1,039 x (1.05/0.95 - 1) x 0.433 = £47; P20 20-24 Nov £1,297 x (1/0.95 - 1) x 0.571 = £39; P13 9-12 Nov £500 x (1/0.95 - 1) x 0.767 = £20. **£106**. P04 -8% lowers price (not quantified) | Corentin | 2026-11-11 |
| 13 | P05 | **NEW t-p05-los (confirm).** Visible Airbnb "Long stay discount" 10% on **5-6 nights**. Not in policy (7+ 15%, 28+ 20%). Keep and record, or set to 0%. | Airbnb 1618929775762183214 > Pricing > Discounts > Length of stay (or Smoobu > Channel Manager > Airbnb > Abbey Rd > LOS 5+) | channel §2-3: £234.50 on 11-17 Jan; comp-central LOS test 4-9 / 4-10 Jan; second layer on 15-21 Dec | **£329.13** on the 15-21 Dec stay; per 5-6 night stay thereafter | Corentin | 2026-11-11 |
| 14 | P05 | **a-p05-earlybird.** Confirm the visible 12% early booking discount (60+ d) is yours, or set it to 0%. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §3: £146.16 on 8-11 Jan | **£146.16** per such stay | Corentin | 2026-11-11 |
| 15 | P13 | **t-p13-los5 (confirm).** Visible 10% "Long stay discount" on 5+ nights, both twins. Keep and record, or set to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §3: £100.71 / £95.04 on 10-15 Dec | **£100.71** per 5-night stay | Corentin | 2026-11-11 |
| 16 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §3: £421.02 = 18.0% of £2,339.10; comp-east 18.0% on 18-25 Nov and 6-13 Dec | **£70.17** per 6-19 Dec stay | Corentin | 2026-11-11 |
| 17 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? **If yes:** record it in `policy.json` and set 15-17 Nov **+5%** (£249/249/255 -> about £261/261/268). **If no:** re-block 15-17 Nov. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO; `policy.json` | comp-central: 15-17 Nov P0 -34%, 15-18 Nov -37%; `recommend(0.538, 0.49, 0.00, -0.016)` = +5% | If confirmed: £753 x 5% x 0.538 = **£20** | Corentin | 2026-11-10 |
| 18 | P06 | **t-p06-open (your call: Reyhan's -5%).** DSO **10-11 Nov -5% -> 0%** (£213 / £224 -> about £224 / £236). Hold tonight. | PriceLabs 3288517 > DSO 10-11 Nov | comp-central: 10-12 Nov P0 / -20%; 9-11 Nov P0 / -12%; `recommend` +5% | £437 x (1/0.95 - 1) x 0.538 = **£12** | Corentin | 2026-11-10 |
| 19 | P11 | **t-channel-gaps.** **3 Jan >= £196** (fortnight; now £174, £6 under P25 £180). 23 Dec hold. | PriceLabs 3064196 (+Vrbo) > DSO 3 Jan | market §3 / §5: 3 Jan +3.6 vs STLY; 23 Dec -3.2 (correction 6) | £22 x 0.417 = **£9** | Corentin | 2026-11-11 |
| 20 | P12 | **a-p12-trim (your call: lowers a PriceLabs price).** DSO **7-10 Dec -22%** (£1,192 -> about £930), **30 Nov-3 Dec -15%** (£1,139 -> about £968), **18-21 Nov -10%**. Hold 12-14 Nov. Override of `recommend` 30d +10%, reason in Evidence. | PriceLabs 2699998 > DSO | comp-east: 7-10 Dec band P85 **+28.0%** (n = 13); 30 Nov-3 Dec P62 +17.3% (n = 13); 18-20 Nov +12%; qp **-0.15**. The 30d raise comes from booked nights; 60d `recommend` is hold. Pace30 -24.5% | Not quantified (a cut) | Corentin | 2026-11-11 |
| 21 | P12 | **t-p12-13dec-orphan (price; your call).** Keep min 1. DSO 13 Dec **+15% -> fixed about £219** (supported £201-237). | PriceLabs 2699998 > DSO 13 Dec | comp-east: £453 all-in, **P100, +53.6%** vs 1-night band £295 (n = 4). market: P90 £365 | Not quantified (a cut); lost at the 13 Dec handback if unsold | Corentin | 2026-11-11 |
| 22 | P12 | **t-p12-26nov-price (your call).** DSO 26 Nov **+15% -> -15%**, keep min 1 (£317 -> about £250, top of supported £213-250). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £368 all-in, **P100, +26.7%** (n = 4) | Not quantified (a cut) | Corentin | 2026-11-11 |
| 23 | P13 | **t-p13-twins (January only; policy conflict).** Restore a gap on **8 Jan-8 Feb: 3090701 about +4%** (DSO on 3090701 only). November/December already differ. | PriceLabs 3090701 > DSO 8 Jan-8 Feb | channel §3: identical on all 32 open nights (Smoobu), 10-13 Jan cards both £500.40. Policy `twin_listings` | Not quantified (duplicate-listing risk) | Corentin | 2026-11-12 |
| 24 | P20 | **t-p20-delivery (confirm).** Block live 18-19 Nov; policy says 20-22 Nov and Airbnb sells 20-23 Nov. Also confirm Reyhan's min 2 vs policy min 3. Update `policy.json`, or re-block. | Smoobu > Calendar; `policy.json` | channel §7; comp-west | Not quantified | Corentin | 2026-11-11 |
| 25 | P11 P12 P13 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning: P12 £22.50, P11 £26.82, P13 £30.00 per booking. Accept or challenge? | Booking.com extranet > Finance | channel §7 | £22.50-£30.00 per booking | Corentin | 2026-11-12 |

## Top 5 for today
1. **P05 9 Nov is tonight (10th check).** Airbnb sells it at £281.60 room (£476.60 all-in, Special offer) against Smoobu £1,403: **-£1,121.40 if it sells.** Delete the custom price and offer on Airbnb 1618929775762183214, or block the night. To sell it, DSO 0% min 1 (£335), your call. The item closes tomorrow.
2. **P05 15-21 Dec sold at 0.81x (-£694.83):** the hidden 0.9 plus a visible 10% long-stay discount that is not in policy. It sold P33 / -44% vs comps and £970 under P75. Cumulative Airbnb-layer cost £2,363.11. Confirm the booking is live (Smoobu "modification of booking"), then set **13-14 Dec min 2 and 21 Dec min 1** to sell the two new orphans (£1,154 upper bound).
3. **Barking 1455, day 10:** bookable on every open P04 run (9-12 Nov £539.00 to 6-13 Dec £1,291). Block every night, then map it to 3562176 or unlist it.
4. **Pushes and other orphans:** 8 Nov pushes were late again, only after Reyhan's saves; P05 had not registered its new booking. Check at ~09:00Z / ~12:50Z. Ask who placed the P09 11 Nov block (12 Nov orphan, £233 if unblocked). P20 5 Dec min 3 -> 1 at £281.
5. **Your calls on Reyhan's 8 Nov cuts:** P11 darts average £207.80 vs your >£300; P20 20-24 Nov -5% (remove: comps P0); P20 13-17 Nov -5% (matches your decision: confirm); P04 -5% vs your -8%; P13 10-20 Dec -5% while the market sits under P50. Discount gap £1,816 / £1,136. P12 trims (13 Dec +54% vs band, 7-11 Dec +24-28%, 26 Nov +27%) are also yours.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).** Per night: 0.765x up to 28 d, 0.900x at 29-59 d, 1.000x at 60+ d; 0.850x on same-day stays. Bookings take more: P05 0.81x at 37 d, P20 0.6502x, P09 0.7225x. Target **1.00x before visible discounts by 2026-11-12** (row 6).
- **Booking.com since the 24 Oct markup cut** (channel §5): **no change today**, the first zero day since the cut. Gross 18 / 67 n / £12,048.73 at 0.803x; **confirmed 14 / 54 n / £9,016.80 at 0.777x**; net +29 n / +£3,965.43. Pace 0.89 confirmed a day (target at least 1.0 by 2026-11-15). Promotions stay; the lever is the PriceLabs price under them.
- **Net to owner per £100 PriceLabs** (channel §6): Booking.com as sold about £62-66; Airbnb £64.64 at 0.765, **£68.45 on P05 15-21 Dec**, £54.94 on P20 6-14 Dec. Models: Booking.com £97.75, Airbnb £84.50. Direct (£90 model) is not the cheapest channel against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 (15) vs 4.86; P13 3090701 4.7 (10) / 3064856 4.31 (13) vs 4.78; P06 4.58 (12) vs 4.62; P08 4.50 vs 4.87; P04 synced 4.11 (9) vs 4.85 (unsynced 4.69 (26)); P05 4.77 (35) vs 4.26; P09 5.0 (3) vs 4.58; P01 4.75 (4) vs 4.80; P20 none vs 4.8. Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The -0.15 cap binds on P12, synced P04 and P13 3064856: it is why P12 December and P04 December cannot carry a premium.
  - Fixes: P12 pre-arrival key-collection message; P13 3064856 cleanliness and photo accuracy; P20 and P09 review requests; map Barking 1455 to keep its 26 reviews. Target P12 and P13 3064856 at 4.5 by 2027-01-31.
- **Listing conversion.** P06: two comps sold 15-18 Nov overnight while we stayed unsold at P0 (-24% to -37%), so the gap is not price-led: 4.58 from 12 reviews, 2nd floor, no lift (5 of 12 comps have one). P20: 0 reviews, parking in first photo. P11: Booking.com CTR 0.81% vs 1.70% (policy) with every open stay at P0-P33.
- **Gap fill / length of stay.** Orphans today: P05 13-14 Dec and 21 Dec (row 5), P09 12 Nov (row 7), P20 5 Dec (row 11), P20 9 Nov (tonight; policy min 3, no proposal). Short runs that a gap-fill rule would sell: P13 9-12 Nov, P06 9-11 / 15-17 Nov, P12 12-13 Nov, P11 18-19 Nov, P05 16-17 Nov and 7-8 Dec (pricelabs H3). The systemic fix is an orphan-gap rule (min 1 on 1-night gaps, min 2 on 2-night gaps): get the setting from PriceLabs > Customizations > Orphan day (not exposed by `get_customizations`). Mid-term (91+ nights): NOT CHECKED.
- **Direct share.** 1.47% of room revenue (not re-run; kpi_pack has no direct-share field). Target 5% by 2027-06-30.
- **Event compression** (market §5): bookable excluding darts R1 **23 n / £362**; full **29 n / £683** (yesterday 21 / £312 and 27 / £612). New: 23 Nov on P04 (£22) and P20 (£42), driven by PriceLabs' own default falling plus Reyhan's -5%. The market supports raises on P13 10-26 Dec, P05 7-8 Dec, P11 3 Jan and P20 23 Nov (the last one weakly, covered by removing the 20-24 Nov -5% in row 12). P04 14-19 Dec (+£66 to P75) is held because comp-east has December at comp parity with a -0.15 cap.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **65.4%** (66.2% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£171.65** (£172.60) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£112.24** (£114.18) | £129 | 2026-12-18 |
| Revenue, last 30 | **£43,772.01** (255 n) | - | - |
| Booked next 30 (Smoobu) | **59.5%** (163/274) | each unit at least market + 10 pts (below: P11 43.3% vs 48%, P06 53.8% vs 49%) | 2026-11-12 |
| Booked next 60 | **50.9%** (235/462) | at least market + 10 pts (P11 41.7% vs 39%) | 2026-11-17 |
| 7-day pickup, net | gross 11 bk / 47 n / £10,865.51; **net +27 n / +£7,528.06** | at least 10 bookings a week, net positive | 2026-11-12 |
| P12 pace30 vs STLY | **-24.5%** (-9 n / -£1,061.60); to handback -23.2% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+13 n / +£5,123.51 like-for-like**; +17 n / +£5,980.30 incl. P06 reopened nights | positive and rising | 2026-11-12 |
| Booking.com paid / PriceLabs (since cut) | **0.777x** (14 confirmed / 54 n / £9,016.80) | median at least 0.80x | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x (to 28 d) / 0.900x (29-59 d) / 1.000x (60+ d)**, day 11; realised cost **£2,363.11** | 1.00x before visible discounts | 2026-11-12 |
| PriceLabs-side gap | **£1,816 next 30; £1,136 next 14** | £0 apart from your own overrides | 2026-11-11 |
| Listings pushed more than 24 h late | **6 on 8 Nov** (7 m 31 s-10 m 35 s, only after manual saves) | 0 | 2026-11-09 |
| PriceLabs vs Smoobu mismatches | **0 prices**; 1 status (P05 15-20 Dec not registered) | 0 | 2026-11-09 |
| Unsellable orphan nights (next 60) | **5 nights** (P05 13-14 Dec, P05 21 Dec, P09 12 Nov, P20 5 Dec) plus P20 9 Nov tonight | 0 | 2026-11-10 |
| Double-sellable Barking stays | **every open P04 night**, day 10 | 0 | 2026-11-10 |
| Missed compression | **23 n / £362** excl. darts R1; full 29 n / £683 | under 10 nights | 2026-11-12 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-12; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **Is P05 162753757 a live stay, and why did it pay 0.9 x 0.9?** Smoobu type "modification of booking" with cancellation price details. Source: Smoobu > Bookings > 162753757; Airbnb > Reservations > price details.
2. **Who placed the P09 11 Nov block and why** (162726554): UNKNOWN. Source: Smoobu booking history, or ask Reyhan.
3. **Smoobu Airbnb rule settings** (and P05's LOS threshold): still inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules; Airbnb > Pricing > Discounts.
4. **Why pushes wait for manual saves, and why P05/P12 refreshes did not push:** UNKNOWN. Source: PriceLabs support / sync log.
5. **Why P20 price / uncustomized fell 0.87 -> 0.83, and why P04 / P20 23 Nov defaults fell £24 / £74:** NOT CONFIRMED. Source: PriceLabs > Customizations (occupancy profile).
6. **P05 9 Nov Airbnb custom price and Special offer origin:** NOT CHECKED. Source: Airbnb host calendar + Smoobu sync log. Whether it sold after 07:21Z shows in tomorrow's diff.
7. **Listing 1455's own reservations:** NOT CHECKED. Source: Airbnb host 551951609 > Reservations.
8. **Booking.com displayed prices, comps and rank:** NOT CHECKED (AWS WAF 07:24:13Z; not bypassed). Source: extranet screenshots.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Other:** retained payouts (P09 158710021, P13 162696296); Jan-Feb min-stay rule not in policy; P15-P19 need the second-account keys; Vrbo +8% / Direct -10% unconfirmed; P02 Vrbo copy stale (24 Feb); events are search summaries (theo2.co.uk, excel.london, alexandrapalace.com return ENOTFOUND to WebFetch).

```json
{"scoreboard":{"note":"9 Nov 2026. Last 30 nights = 10 Oct-8 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward figures handback-aware, Smoobu confirmed stays as truth, policy blocks / P01 gap block / P20 18-19 Nov / P09 11 Nov excluded. Pickup = bookings made 3-9 Nov net of cancellations. Base-rise like-for-like excludes P06 18-22 Nov. Airbnb ratios from 23 live searches 07:21-07:23Z (channel §3). PriceLabs gap from pricelabs H4. Booking.com since cut from channel §5 (unchanged). Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"65.4%"},{"label":"ADR last 30","value":"£171.65"},{"label":"RevPAR last 30","value":"£112.24"},{"label":"Revenue last 30","value":"£43,772.01"},{"label":"Nights last 30","value":"255"},{"label":"Booked next 30","value":"59.5% (163/274)"},{"label":"Booked next 60","value":"50.9% (235/462)"},{"label":"7-day pickup","value":"gross 11 bk / 47 n / £10,865.51; cancelled 4 / 20 n / £3,337.45; net +27 n / +£7,528.06"},{"label":"P12 pace30 vs STLY","value":"-24.5% (-9 n / -£1,061.60)"},{"label":"Raised flats net since 18 Oct","value":"+13 n / +£5,123.51 like-for-like; +17 n / +£5,980.30 incl. P06 reopened nights"},{"label":"Booking.com since markup cut","value":"14 confirmed, 54 n, £9,016.80; 0.777x PriceLabs; gross 18 / 67 n / £12,048.73 (no change)"},{"label":"Airbnb displayed / Smoobu","value":"0.765x to 28 d; 0.900x at 29-59 d; 1.000x at 60+ d; 0.850x same-day; day 11; P05 15-21 Dec -£694.83; £2,363.11 cumulative"},{"label":"PriceLabs-side gap","value":"£1,816 next 30; £1,136 next 14"},{"label":"Late pushes 8 Nov","value":"6 listings 7m31s-10m35s past 24 h, only after Reyhan's saves; P05/P12 refreshed without pushing"},{"label":"PriceLabs vs Smoobu mismatches","value":"0 prices; P05 15-20 Dec booking not yet registered in PriceLabs"},{"label":"Unsellable orphans","value":"5 nights: P05 13-14 Dec, P05 21 Dec, P09 12 Nov, P20 5 Dec (plus P20 9 Nov tonight)"},{"label":"Double-sellable Barking","value":"1455 bookable on every open P04 run, day 10"},{"label":"Missed compression","value":"23 n / £362 excl. darts R1; full 29 n / £683"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"critical","title":"TONIGHT, 10th and final check: Airbnb 9 Nov £281.60 room (£476.60 all-in, Special offer -£70.40 on £352) vs Smoobu £1,403 (+300% DSO); unsold 07:21Z; -£1,121.40 if sold. Delete the Airbnb custom price and offer or block the night; to sell, DSO 0% min 1 (£335, your call). CLOSE ON 10 NOV: realised loss if sold, lapsed if not","gbp":1121.4},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 10): unsynced Barking Airbnb 1455876748739910219 bookable on every open P04 run (9-12 Nov £539.00, 6-13 Dec £1,291); guest in residence left 9 Nov; block all open nights, then map to 3562176 or unlist","gbp":null},
{"id":"t-pl-push-fresh","status":"open","prop":"P05 P09 P06 P12 P08 P11 P13 P20 P04","priority":"high","title":"Not met 8 Nov (2nd day): 6 listings pushed 7m31s-10m35s past 24 h, only after Reyhan's saves; P05/P12 refreshed 12:37-12:40Z without pushing; P05 15-20 Dec booking not registered. Check ~09:00Z (P09 07:56, P06 08:00, P05/P12/P08 08:53) and ~12:50Z; Sync Now if still 8 Nov; confirm 3166592 15-20 Dec Booked","gbp":null},
{"id":"t-p05-1521-live","status":"open","prop":"P05","priority":"high","title":"New: confirm Airbnb 15-21 Dec (Smoobu 162753757, £2,962.17) is live: Smoobu type 'modification of booking', price details 'Cancellation Host Fee £489.36 / Cancellation Payout £2,667.81'; reservations.csv confirmed, calendar closed","gbp":null},
{"id":"t-p05-dec-orphans","status":"open","prop":"P05","priority":"high","title":"New: P05 13-14 Dec (£579/£565, min 3) and 21 Dec (£645, min 2) unsellable after the 15-21 Dec booking; DSO 13-14 Dec min 2, 21 Dec min 1, keep prices (13-15 Dec already P25 / -27% vs comps); after PriceLabs registers the booking","gbp":1154},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P04","priority":"critical","title":"Day 11, unchanged: remove hidden Smoobu Airbnb layers per night 0.765 (to 28 d) / 0.900 (29-59 d), 0.850 same-day, and stacked layers on bookings; P05 15-21 Dec £2,962.17 = 0.81x £3,657, -£694.83 (hidden £365.70 + visible LOS £329.13); cumulative £2,363.11; pull 162753757, 162719002, 162694102 price details; P09 excluded (deprioritised)","gbp":694.83},
{"id":"t-p09-1112block","status":"open","prop":"P09","priority":"high","title":"Half resolved: PriceLabs now registers the 11 Nov block (mismatch gone, £122/£126). Still: who placed Smoobu block 162726554 and why; 12 Nov min-2 orphan; if unintended delete (11-13 Nov sells, supported), else DSO 12 Nov min 1; last nights before 26 Nov handback","gbp":233},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done; gap UP to £1,816 next 30 / £1,136 next 14 (was £1,510 / £820) via Reyhan's P11/P20 DSOs; P04 -20.4% (£651) unchanged layers; set Last-minute, Occupancy, Booking Recency to Custom 0% on P04/P05 (then P11/P20); P12 excluded","gbp":590},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Overtaken in part: 15-20 Dec sold at £3,657 list (paid £2,962.17, £970 under P75). Remaining: 7-8 Dec £913 -> about £1,141 (recommend +25%, P25 / -42% vs comps); 13-14 / 21 Dec min stay first (t-p05-dec-orphans)","gbp":163},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"Moved the other way (Reyhan 10-20 Dec -5%): P13 17 open nights £3,623 under P50 every night, under P25 25-26 Dec; +10% on 10-13 and 17-26 Dec both twins, hold 14-16 Dec at -5% (comp-west P57-P71), 25-26 Dec min 2; P05 29 Dec £1,332 vs default £1,068: 0% min 1 (your call)","gbp":156},
{"id":"t-p20-5dec-orphan","status":"open","prop":"P20","priority":"high","title":"Not fixed: P20 5 Dec 1-night orphan, min 3, unbookable at £281; DSO 5 Dec min 1, keep price (policy min-3 window ends 30 Nov)","gbp":144},
{"id":"a-p13-record","status":"open","prop":"P11 P20 P04 P13 P12","priority":"high","title":"For Corentin to confirm Reyhan's 8 Nov cuts: P11 10 Nov-18 Dec -5% (darts £1,039, avg £207.80 vs >£300); P20 13-17 Nov -5% (matches policy) and 20-24 Nov -5% (outside policy; remove, comps P0) with min 2 vs policy min 3; P04 9-24 Nov -5% vs -8%; P13 10-20 Dec -5%; carried: P13 8-12 Nov -5% vs 0%, P04 6-22 Dec -5%, P20 base 330 vs 350, record P13 base 250","gbp":106},
{"id":"t-p05-los","status":"open","prop":"P05","priority":"medium","title":"New: P05 visible Airbnb 'Long stay discount' 10% on 5-6 nights (£234.50 on 11-17 Jan; second layer on 15-21 Dec, £329.13); not in policy (7+ 15%, 28+ 20%): keep and record, or set to 0%","gbp":329.13},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early booking (60+ d) still on (£146.16 on 8-11 Jan): not in policy - yours, or 0%?","gbp":146.16},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"Confirm: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (£100.71 / £95.04 on 10-15 Dec); not in policy LOS; keep and record, or set LOS 5+ to 0%","gbp":100.71},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£70.17 on 6-19 Dec)","gbp":70.17},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): opening of 15-21 Nov; 15-17 Nov now £249/£249/£255 (PriceLabs model cut), P0 -34% to -37%; two comps sold 15-18 Nov; if confirmed record in policy and +5% on 15-17 Nov, else re-block","gbp":20},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"Reyhan's -5% on 10-11 Nov -> 0% (£213/£224 -> about £224/£236), P0 -20%, recommend +5% (your call); hold tonight","gbp":12},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"P11 3 Jan £174 -> >= £196 (fortnight; £6 under P25 £180; market +3.6); 23 Dec £281 hold (market -3.2); Booking.com CTR 0.81% vs 1.70%","gbp":9},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Not done: 7-10 Dec £1,192 (+28% vs band, P85) -> -22% (about £930); 30 Nov-3 Dec £1,139 (+17%) -> -15% (about £968); 18-21 Nov -10%; hold 12-14 Nov; override of 30-day recommend; lowers a PriceLabs price: Corentin's call","gbp":null},
{"id":"t-p12-13dec-orphan","status":"open","prop":"P12","priority":"medium","title":"Min 1 done; price open: 13 Dec £364 room / £453 all-in, P100 +53.6% vs 1-night band (n=4); DSO fixed about £219 (supported £201-237), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £317 (£368 all-in, P100 +26.7%); DSO +15% -> -15% (about £250, supported £213-250), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p13-twins","status":"open","prop":"P13","priority":"medium","title":"November/December now differ (policy met); still identical on all 32 open nights 8 Jan-8 Feb (Smoobu; cards £500.40 both): DSO 3090701 about +4% on 8 Jan-8 Feb; January only","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"medium","title":"Confirm: block live 18-19 Nov, policy says 20-22 Nov; Airbnb sells 20-23 Nov; Reyhan's min 2 on 9, 13-17, 20-24 Nov vs policy min 3 to 30 Nov; update policy or re-block","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12 P13","priority":"medium","title":"Booking.com commissions cleaning: P12 £22.50, P11 £26.82, P13 £30.00 per booking: accept or challenge?","gbp":null},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Price asks resolved via a-p13-record (20-24 Nov -5% removal) and a-airbnb-rules (0.765 layer); remaining: parking first photo, review requests (0 reviews)","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -24.5% (-9 n / -£1,061.60), to handback -23.2%; correct open December via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"27 Nov 3064856 £334 / 3090701 £243 (+50%; Airbnb £406 vs £336, market +12.6); 17 Nov £209/£197 at +35%: confirm; no trim proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Booking.com cancellations in window (P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec): send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (11 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, P04 Vrbo, P13 Vrbo x2, Channex P01/P08/P09/P10); id_map P20 note min 220/base 350 vs PL 200/330; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps unchanged 9 Nov (no replacements; P08 4 comps absent 8 days, P06 2, P14 2, P13 1411449348357673454 1 day); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P05","title":"P05 9 Nov (tonight) sells on Airbnb at £281.60 room (Special offer) vs Smoobu £1,403: -£1,121.40 if sold; 10th check, unsold 07:21Z","evidence":"channel §1 p05_0910nov_1n 07:21:02Z; occupancy (Smoobu available 07:19Z); comp-central P05."},
{"agent":"channel","severity":"critical","ref":"P05","title":"New P05 15-21 Dec £2,962.17 = 0.81x £3,657 (hidden 0.9 x visible 10% long-stay on 6 nights): -£694.83; a-airbnb-rules cumulative £2,363.11","evidence":"channel §2; pricelabs H2; comp-central LOS test (5+ nights); market §2."},
{"agent":"comp-central","severity":"high","ref":"P05","title":"P05 15-21 Dec sold P33 / -44% vs comp median £940 (n=3); market: at P50, £970 under P75 on nights +2.9 to +8.5 pts vs STLY","evidence":"comp-central P05 booking table; market §2."},
{"agent":"occupancy","severity":"high","ref":"P05","title":"New orphans from the booking: P05 13-14 Dec (min 3) and 21 Dec (min 2) unsellable","evidence":"occupancy orphan table; pricelabs H3; comp-central remaining December."},
{"agent":"pricelabs","severity":"high","ref":"P05","title":"Smoobu records 162753757 as 'modification of booking' with cancellation price details; PriceLabs had not registered it at 07:21Z","evidence":"pricelabs H2."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 bookable on every open P04 run (day 10); guest in residence left 9 Nov","evidence":"channel §4 07:21Z; comp-east 1455 section."},
{"agent":"pricelabs","severity":"high","ref":"P11 P13 P20 P04","title":"Reyhan's 8 more cuts 8 Nov 12:38-12:41Z: P11 10 Nov-18 Dec -5% (darts avg £207.80 vs >£300), P13 10-20 Dec -5%, P20 13-17/20-24 Nov -5% min 2, P04 9-24 Nov -5% vs -8%; discount gap £1,816 / £1,136","evidence":"pricelabs C1, H4; market §3; comp-central P11; comp-west."},
{"agent":"pricelabs","severity":"high","ref":"P11 P13 P20 P04 P05 P12","title":"8 Nov pushes 7m31s-10m35s past 24 h, only after Reyhan's saves; P05/P12 refreshed without pushing","evidence":"pricelabs H1; channel §7."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"P12 13 Dec £364 (+54% vs band), 7-11 Dec +24-28%, 30 Nov-3 Dec +17%, 26 Nov +27%; pace30 -24.5%","evidence":"comp-east Priority 1; occupancy pace table."},
{"agent":"comp-west","severity":"medium","ref":"P20","title":"P20 13-16 / 20-23 Nov P0 vs comps (-28% / -21.5%); market has PL above P50; 20-24 Nov -5% outside policy, remove; 13-17 Nov -5% matches policy","evidence":"comp-west P20 table; market §6; pricelabs C1."},
{"agent":"channel","severity":"medium","ref":"P13","title":"P13 twins differ in November/December but identical on all 32 open nights 8 Jan-8 Feb","evidence":"channel §3; pricelabs H5; comp-west twins."},
{"agent":"market","severity":"medium","ref":"P13 P05 P11 P20","title":"Missed compression 29 n / £683 (23 n / £362 excl. darts R1); new 23 Nov P04/P20; P13 Christmas under P50 every night","evidence":"market §3, §5."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"Base-rise tally like-for-like +13 n / +£5,123.51 (+17 / +£5,980.30 incl. P06); change is P05 15-21 Dec; pickup net +27 n / +£7,528.06","evidence":"occupancy base-rise and pickup sections."}
],
"top5":[
"P05 9 Nov is tonight (10th check): Airbnb sells it at £281.60 room (£476.60 all-in, Special offer) vs Smoobu £1,403, -£1,121.40 if sold. Delete the custom price and offer or block the night; to sell, DSO 0% min 1 (£335), your call. Closes tomorrow.",
"P05 15-21 Dec sold at 0.81x (-£694.83: hidden 0.9 x visible 10% long-stay, not in policy), P33 / -44% vs comps, £970 under P75; Airbnb-layer cost £2,363.11. Confirm the booking is live (Smoobu 'modification of booking'), then 13-14 Dec min 2 and 21 Dec min 1.",
"Barking 1455 day 10: bookable on every open P04 run (9-12 Nov £539.00 to 6-13 Dec £1,291). Block every night, then map to 3562176 or unlist.",
"Pushes late again 8 Nov (only after Reyhan's saves); P05 had not registered its booking: check ~09:00Z / ~12:50Z. Ask who placed the P09 11 Nov block (12 Nov orphan). P20 5 Dec min 3 -> 1 at £281.",
"Your calls on Reyhan's 8 Nov cuts: P11 darts avg £207.80 vs your >£300; P20 20-24 Nov -5% (remove; comps P0); P20 13-17 Nov -5% (matches policy, confirm); P04 -5% vs -8%; P13 10-20 Dec -5% under P50. Gap £1,816 / £1,136. P12 trims (13 Dec +54%, 7-11 Dec +24-28%, 26 Nov +27%) are yours."
],
"per_property":[
{"ref":"P01","change":"Pushed 9 Nov 05:15Z; nothing open to the 20 Dec handback."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 9 Nov 03:14Z via Channex."},
{"ref":"P04","change":"1455 bookable on all open runs (day 10); guest in residence left 9 Nov; Reyhan 9-24 Nov -5% (policy -8%); 23 Nov £205 -> £158; weekly 18% (£70.17); gap £651; fwd30 46.7% vs 24%."},
{"ref":"P05","change":"9 Nov Airbnb £281.60 vs Smoobu £1,403 (tonight, 10th check); new Airbnb 15-21 Dec £2,962.17 (0.81x, -£694.83); new orphans 13-14 Dec and 21 Dec; visible 10% long-stay (5+ n) and 12% early bird; 7-8 Dec £913; 29 Dec £1,332; fwd30 70.0% vs 43%."},
{"ref":"P06","change":"PriceLabs model cut 5-7% (9-11 Nov £211-224, 15-17 Nov £249-255); 8 Nov lapsed; two comps sold 15-18 Nov while we stayed at P0; 7/13 non-blocked booked."},
{"ref":"P07","change":"Intentional block; pushed 9 Nov 04:16Z."},
{"ref":"P08","change":"Fully booked to the 13 Nov handback."},
{"ref":"P09","change":"PriceLabs now registers the 11 Nov block (mismatch gone); 12 Nov still a min-2 orphan; block reason unknown; fwd30 94.1%."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"Reyhan 10 Nov-18 Dec -5% (was -2%); darts £1,039 avg £207.80; 18-20 Nov £152 P0 -47%; 3 Jan £174; fwd30 43.3% vs 48%."},
{"ref":"P12","change":"No edits; 7-10 Dec £1,192 (+28% vs band), 30 Nov-3 Dec £1,139 (+17%), 13 Dec £364 (+54%), 26 Nov £317 (+27%); pace30 -24.5%."},
{"ref":"P13","change":"Reyhan 10-20 Dec -5% (was -2%); Christmas £3,623 under P50; twins differ Nov/Dec, identical 8 Jan-8 Feb; 3090701 7-9 Dec now Blocked; 8 Nov lapsed; fwd30 76.7% vs 44%."},
{"ref":"P14","change":"Numbers only: 108 of 179 open nights at £500; 0% vs 46%."},
{"ref":"P20","change":"Reyhan re-added -5% min 2 on 13-17 and 20-24 Nov; 23 Nov £333 -> £244; price/uncust 0.87 -> 0.83; 5 Dec orphan unchanged; 9 Nov tonight orphan at £200 (policy min 3); fwd30 57.1% vs 38%."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback (occupancy.md)."},
{"ref":"P04","base":"220 (rec 221)","recommendation":"Hold 220","reason":"46.7% vs 24%; base +25.0% vs P50; November about -25% vs comps, December at parity; qp -0.15 (comp-east; pricelabs M3)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"70.0% vs 43%; open December P25; qp +0.15; recommend +25%; base -4.3% vs P50 (comp-central; pricelabs M3)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 7 of 13 non-blocked nights booked (53.8% vs 49%); base -11.9% vs P50 (pricelabs M3)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"94.1% vs 37% to the 26 Nov handback (occupancy.md)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"43.3% vs 48%; comps P0-P33; recommend +5%; levers are Reyhan's -5% and Booking.com visibility (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open nights with date overrides (a-p12-trim), not the base","reason":"56.7% vs 42%; pace30 -24.5%; open nights band P62-P100 with qp -0.15; base +38.5% vs P50; handback 13 Dec (comp-east; pricelabs M3)."},
{"ref":"P13","base":"250 (rec 239/238)","recommendation":"Keep 250 and record it in policy","reason":"76.7% vs 44% (+33 pts); recommend +10% (comp-west)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"57.1% vs 38% (30d), 48.3% vs 31% (60d); 0 reviews; base +31.5% vs P50 (comp-west; pricelabs M3)."}
]}
```

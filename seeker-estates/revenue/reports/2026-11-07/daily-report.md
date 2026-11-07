# Seeker Estates - Daily revenue report, 2026-11-07 (Saturday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-07/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-07/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-06/daily-report.md` and its JSON, the dashboard action list (7 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move. PriceLabs min/max come from `data/snapshots/2026-11-07/listings.csv` (unchanged since 6 Nov).
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.
- Process note: comp-west made two `get_listing_date_overrides` calls in parallel, against the one-call-at-a-time rule. Both returned 200, so no data was lost.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional. P06 8-11 Nov is open inventory outside the block. P06 15-21 Nov was opened against the block, so it stays with you to confirm (t-p06-1521open). It is not a proposal.
- P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Not raised again: Visibility Booster commission, the 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov, P13 1 Dec, P13 twin price order, the P09 Airbnb rules screen, P12 key collection, P20 max 4 guests.
- Nights after each handback are not inventory: P08 after 13 Nov, P10 after 18 Nov, P09 after 26 Nov, P12 after 13 Dec, P01 after 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.**
  - Three proposals below lower a PriceLabs price: a-p12-trim, t-p12-26nov-price and the P09 8-9 Nov £100. Each is marked "your call", with the evidence.
  - Reyhan's edits that cross your decisions are listed for you to confirm (a-p13-record). They are not proposed again.

## Corrections and conflicts resolved between sections

1. **P06 15-21 Nov is open in PriceLabs too.** The brief said PriceLabs still showed these nights blocked. That is out of date.
   - PriceLabs opened them at its 6 Nov 08:40:13Z refresh (pricelabs H2: 6 Nov raw "Blocked", 7 Nov raw open).
   - The same refresh **cut 15-21 Nov by 11-28%**, with no override or log entry: £265/264/270/277/295/342/430 -> £237/237/244/247/264/301/308. Uncustomized prices fell too (comp-central). The cause is NOT CHECKED: P06 customizations were not read.
   - **18-22 Nov then sold on Airbnb** (6 Nov 21:22) for £856.79 room. That is **0.765x the £1,120 on sale**. At 0.765x the pre-refresh rates it would have paid £1,028.16, so the refresh cost **£171.37** (comp-central).
   - PriceLabs has not yet seen the booking: it still shows 18-21 Nov open. This is timing, not a price gap (pricelabs H1).
2. **18 Oct base rises (corrected method): two figures, and the like-for-like one is +3 n / +£1,798.65.**
   - Including P06 18-22 Nov: **+7 n / +£2,655.44**.
   - **Excluding it: +3 n / +£1,798.65.** This is unchanged from yesterday and is the like-for-like figure. That booking sold nights that were not for sale on 18 Oct: they opened when the policy block was shortened on 5 Nov. It measures the reopening, not the rise (occupancy).
3. **7-day pickup: yesterday's figure was understated.** P05 29 Jan-1 Feb (£1,059.52) was made 1 Nov 09:32, not 30 Oct. **Yesterday's net corrects from +5 n / +£1,857.46 to +8 n / +£2,916.98.** Today: **+20 n / +£5,417.77**.
4. **P20 13-16 Nov: drop the +10% ask, and do not move price to fix the Airbnb gap.** Market and comp-west disagree here; this is how they fit together.
   - **Market:** PriceLabs room prices on all four nights are above the P50 (£939 vs £856). The market is -9.4 / -9.7 vs STLY on 14-15 Nov, so the market gives no case for +10%.
   - **Comp-west:** guests see us at **P0, -26.2% (13-16 Nov) and -29.1% (20-23 Nov)**, and `recommend` gives +5%.
   - **They fit together:** the guest-side gap is the hidden Airbnb factor (**0.766**) applied to a PriceLabs price already at market P58-P59. The fix is a-airbnb-rules. Removing the layer lifts the Airbnb guest price by 1/0.766 = +30.5% without touching Booking.com.
   - **Fallback:** if a-airbnb-rules is not done by 9 Nov, apply `recommend`'s **+5%** on 13-16 and 20-23 Nov.
5. **P09 8-12 Nov: hold, with £100 on 8-9 Nov only.** This replaces yesterday's "raise 8-10 Nov to £112/110/109". That ask was met by the 6 Nov 08:48Z push (Smoobu now £113/110/111).
   - With the nights still unsold 1-2 days out, comp-east puts the 8-10 Nov stay at **P75, +7.8% vs the band**.
   - `recommend` says raise +10%. I am not adopting it: its lead comes from nights already booked, and the five unsold nights are the last before the 26 Nov handback.
6. **P12 7-10 Dec rose overnight with no edit.** The algorithm moved it from £253/249/257/275 to **£272/274/288/293**, with uncustomized up too.
   - This puts us **+28% to +33% over the band (P82-P90)** while comps were flat (comp-east). The trim needed grows from 10-17% to **20-25%**.
7. **P08 7 Nov £225.** The brief listed the source as NOT CHECKED. Live `get_listing_prices` shows PriceLabs itself at £225 against uncustomized £163 ("Low Demand"; pricelabs H4).
8. **Discount gap: next 30 £1,897, next 14 £1,108** (yesterday £1,807 / £997). It rose because the window rolled forward and P04's uncustomized price went up under unchanged layers (pricelabs H3).

## Executive summary

1. **CRITICAL: Barking day 8.** The unsynced Airbnb 1455876748739910219 still sells **7-10 Nov (£517.40) and 8-11 Nov (£519.00)**. Both overlap the synced guest in residence 6-9 Nov (161888271, room £355.72) (channel §1, 07:21Z). No booking is visible on 1455.
2. **Tonight: P08 7 Nov cannot sell.** 6 Nov lapsed unsold. 7 Nov is £225 with min 2, and the 8-14 Nov stay arrives tomorrow. **Set 7 Nov to min 1 now: about £172 room at stake** (0.765 x £225). After tonight P08 has nothing left to sell before the 13 Nov handback.
3. **Airbnb hidden layers, day 9: this is now the money case.** Two Airbnb bookings on 6 Nov lost **£515.66** of room revenue between them:
   - P06 18-22 Nov: -£263.21 (0.765).
   - P20 Christmas 19-26 Dec: -£252.45 against policy's weekly-only rule.
   - **P20 sold at £1,428 = 0.7223x £1,977 (0.85 x weekly 0.85). That is 31.7% under same-stay comps and below all 7 of them.**
   - The realised layer cost is now **£1,209.23** (£693.57 carried + £515.66).
4. **Closed: t-p06-2pound and t-smoobu-below-pl.**
   - P06 9 Nov is £200 in PriceLabs (`price`, `user_price`, `booked_price`) and in Smoobu.
   - The 15 manual Smoobu nights were overwritten by the 6 Nov 08:40-08:49Z pushes (+£194). **0 mismatches** on any listing.
   - **t-pl-push-fresh stays open.** Seven listings plus the P13 Vrbo copy were last pushed 6 Nov 08:22-08:49Z, so they cross 24 h at 08:22-08:49Z today. The PriceLabs check ran at about 07:25Z. **Check at about 09:00Z, and press Sync Now on any listing still dated 6 Nov.**
5. **Your decisions:**
   - **P06 15-21 Nov (policy block):** confirm the opening. 18-22 Nov sold, and 15-17 Nov is still open at P0.
   - **P13 Christmas:** 20-25 Dec was booked and cancelled within 10 minutes, then reopened at the same price. It shows a visible 10% long-stay discount that is not in policy's length-of-stay rules.
   - **Reyhan's P13 -10% / -7%** go against comps that say raise.
   - **P12:** open December is now 28-33% over the band. Trimming it is your call.
   - **P05 9 Nov:** 8th check.

**Last 30 nights (8 Oct-6 Nov, 13 units):** occupancy **66.4%**, ADR **£173.08**, RevPAR **£114.94**, revenue **£44,827.37** (259 n; kpi_pack `portfolio_last30`). Yesterday: 66.9% / £172.36 / £115.35 / £44,986.57.
**Next 30 (7 Nov-6 Dec):** **59.6%** (170/285; yesterday 58.6%). **Next 60:** **48.6%** (231/475; yesterday 47.4%). Both are Smoobu truth and handback-aware. The +7 n is P20 19-26 Dec.
**7-day pickup (made 1-7 Nov):**
- Gross: 12 bookings / 40 n / £8,755.22.
- Cancelled: 4 / 20 n / £3,337.45.
- **Net: +20 n / +£5,417.77.** Yesterday corrected to +8 n / +£2,916.98.

## Base review

No change to `base_price`, `min_price` or `max_price`, and no PriceLabs log entry since 5 Nov 10:57:23Z (pricelabs). Market gaps are from M3 (6 Nov `market.csv`).

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 256 | 100% booked to the 20 Dec handback | **Hold; off the agenda** |
| P04 | 220 / Unavailable | 53.3% vs 24%. November about -20% vs comps; December -11% to +4%; qp -0.15 (comp-east) | **Hold 220**; get the data on "Unavailable" |
| P05 | 550 / 544 | 76.7% vs 43%; P25 on December stays; qp +0.15; `recommend` +25% | **Hold 550; use date overrides** (a-p05-dec) |
| P06 | 357 / 357 | 8 of 15 non-blocked nights booked (53.3% vs 48%); 8-9 Nov at the £200 min | **Hold** (policy block) |
| P09 | 176 / 176 | 70.0% vs 36% to handback; 8-12 Nov at band P30 | **Hold** |
| P11 | 286 / 283 | 46.7% vs 46%; comps P0-P29; `recommend` +5% = removing Reyhan's -5% | **Hold 286** (conflict, a-p13-record) |
| P12 | 284 / 284 | 63.3% vs 42%; **pace30 -19.7%**; open December at band P82-P90; base +39.9% vs P50 | **Hold 284; fix the level with date overrides** (a-p12-trim). Handback is 13 Dec |
| P13 | 250 / 237 (236) | 73.3% vs 43% (+30 pts); P0 on every 8-12 Nov stay | **Keep 250 and record it in policy** |
| P20 | 330 (your 350) / 351 | 46.4% vs 37% (30d); 60-day lead now +3 pts (was -8); 0 reviews | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 6 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Note |
|---|---|---|
| **Raised, like-for-like** | **+3 n / +£1,798.65** | Unchanged from yesterday |
| Raised, including P06 18-22 Nov | +7 n / +£2,655.44 (made 20 / 66 n / £14,362.79; cancelled 9 / 59 n / £11,707.35) | P06 nights were reopened 5 Nov, not on sale at the rise |
| Unraised (P02, P08, P10, P14, P20*) | +36 n / +£6,145.79 (was +29 / +£4,717.79) | The change is P20 19-26 Dec |
| P13 (base 235 -> 250, not in policy) | +16 n / +£2,909.76 (unchanged) | 20-25 Dec made and cancelled; nets to 0 |

\* P20's base was cut twice, so it is not a clean control.
- **Reading:** still positive on the like-for-like figure. **Hold the bases.**

### Per property
| Ref | Change since 6 Nov |
|---|---|
| P01 | Pushed 7 Nov 05:22Z. Nothing open before the 20 Dec handback. |
| P02 / P03 / P07 | Intentional blocks; pushed overnight. P02 Vrbo copy last pushed 24 Feb. |
| P04 | **1455 sells 7-10 and 8-11 Nov over the 6-9 Nov guest (day 8).** 9-11 Nov now £157/157/158 (was £140, manual). Weekly discount still 18.0% (£66.58 on 6-19 Dec). Discount gap n30 £719 (-24.4%). |
| P05 | No booking, no edit. **9 Nov Airbnb £253.44 vs Smoobu £1,376 (8th check).** 7-8 Dec £920 and 13-21 Dec £5,288, both under P75. 29 Dec £1,346 vs default £1,071. Early bird 12% (£147.00 on 6-9 Jan). |
| P06 | **9 Nov £2 fixed (£200 everywhere).** PriceLabs opened 15-21 Nov at the 08:40Z refresh and cut those nights 11-28%. **18-22 Nov sold £856.79 (0.765x £1,120).** 15-17 Nov open at £237/237/244, P0 -30% to -39%. 8-9 Nov at the £200 min; 10-11 Nov fell to £204/£212. |
| P08 | 6 Nov lapsed. **7 Nov £225 min 2: unsellable** unless min 1 is set today. Handback 13 Nov. |
| P09 | 6 Nov lapsed. 7-12 Nov open: £132 / **£113 / £110 / £111** / £116 / £125. The £100 manual values were overwritten. Market P30. |
| P10 | Booked to the 18 Nov handback. |
| P11 | No booking, no edit. 10-12 Nov now £194/200/209 (was £175/179/189 manual). 23 Dec £305; 3 Jan £188. Darts £1,098 under -5%. |
| P12 | No booking. **7-10 Dec raised by the algorithm to £272/274/288/293 (+28% to +33% vs band).** 26 Nov £323 (P100). **New orphan 13 Dec** (£273, min 2) before the handback. Pace30 **-19.7%** (-8 n / -£866.45). |
| P13 | **20-25 Dec Airbnb booked 6 Nov 11:08 and cancelled 11:18 (£917.73).** It is back on sale at the identical price, with a visible 10% "Long stay discount". 3090701 Smoobu 8-11 Nov now £161/162/165/170 (was £150/150/150/160). 3064856 12 Nov £162. Christmas 3064856 £4,133. 3090701 rating 4.7 (10). |
| P14 | Numbers only: 108 of 180 open nights at £500; 0% vs 46%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | **Airbnb 19-26 Dec sold £1,428** (0.7223x; P0, -31.7% vs 7 comps). The 7 Nov refresh raised December (19-25 Dec £1,977 -> £2,069) and cut 22 Nov from £287 to £235. 60-day occupancy 34.5%. 18-19 Nov blocked; 20-24 Nov selling (t-p20-delivery). |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
No new edits since 5 Nov 10:57Z. Values as of 7 Nov.

| # | Ref / dates | Your decision | Now | Evidence | Status |
|---|---|---|---|---|---|
| a | P12 17 Nov | keep +50% (deprioritised) | -5%, £242 | numbers only | Unchanged |
| b | P11 darts 13-17 Dec | "above £300"; keep +5% | -5%: £1,098, avg £219.60 | comp-central: P11, -46% | Unchanged |
| b2 | P11 10 Nov-18 Dec | standing direction: cut PriceLabs discounts | -5% | `recommend` +5% (30d and 60d) | Unchanged |
| c | **P13 8-12 Nov** | **0%** (24 Oct) | **-10%**: 3064856 £781, 3090701 £830 | comp-west: P0 on every stay (-8% to -24%), lead +30 pts. Market: 12 Nov occupancy -11.1 vs STLY | Unchanged. **Comps support your 0%** |
| c2 | **P13 7-20 Dec** | standing direction | **-7%** min 2 (21-26 Dec -5% min 3) | market: occupancy +4.8 to +25.3, under P50 every night; comp-west P5-P14, `recommend` +10% | Unchanged |
| d | P20 base | 350 | 330 / 200 | - | Unchanged |
| d2 | P20 16-17 Nov | min 3 to 30 Nov | min 2 (£213 / £230) | - | Unchanged |
| d3 | P20 19-26 Dec | standing direction | -5% (19-20 Dec 27 Oct; 21-26 Dec 4 Nov) | cost about £75 on the Christmas booking; now touches only 26 Dec (£310) | Now about £16 at stake |
| e | P04 9-24 Nov | -8% on 1-25 Nov, min 3 | -7% (12 open nights £2,035) | comp-east: the evidence fits either | Accept and record -7%, or restore -8% |
| f | Jan-Feb min stays | 5-night rule not in `policy.json` | min 3-4 | - | Please confirm |
| g | P13 base 250 | not in policy | 250 | - | Record it |

### Open plan items: status today
| Item | Status 7 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed, day 8.** 1455 sells 7-10 / 8-11 Nov (channel §1; comp-east) |
| **t-p06-2pound** | **CLOSED: fixed.** £200 in Smoobu and in PriceLabs `price`/`user_price`/`booked_price` (pricelabs H4; channel §3; comp-central). Booking.com display NOT CHECKED |
| **t-smoobu-below-pl** | **CLOSED: fixed.** Overwritten by the 6 Nov 08:40-08:49Z pushes, +£194; 0 mismatches (pricelabs H1; channel §6). Who typed them is UNKNOWN |
| t-pl-push-fresh | **Met 6 Nov; re-armed.** Due 08:22-08:49Z today; check at about 09:00Z |
| t-p06-1521open | **Still for you.** 18-22 Nov sold; 15-17 Nov open |
| a-airbnb-rules | **Not fixed, day 9.** 0.765 at 1-14 d; 0.900 at 30-57 d; 7-night stays inconsistent |
| a-handback-lastnights | **Not done.** P08 7 Nov still min 2 (override +5%, 5 Nov 10:55Z) |
| a-p05-9nov | Not fixed, 8th check |
| t-p09-cancel | Part (a) met by the push (£113/110/111). Revised today: £100 on 8-9 Nov only. Payout NOT CHECKED |
| a-p12-trim | **Not done; gap grew** (7-10 Dec £1,034 -> £1,127) |
| a-raise-1012nov | Not done: 3064856 12 Nov £162; 3090701 £172 (was £183). Part of conflict c |
| a-peak-check | Not done: P13 £4,133 (twin £4,373); P05 29 Dec £1,346 |
| a-discount-cut | Not done: £1,897 / £1,108 |
| a-p05-dec | Not done: gaps to P75 now +£261 / +£549 |
| a-p20-conversion | **Revised:** the 13-16 Nov price ask is dropped (correction 4). Still open: remove 26 Dec -5%; listing fixes |
| t-p12-26nov-price | Not fixed: £323 (was £316) |
| t-channel-gaps | Partly: 23 Dec £305 (fortnight £320); 3 Jan £188 (target £204) |
| t-p04-weekly, a-p05-earlybird, t-p20-delivery, t-cleaning-commission | Unchanged |
| Others (a-amenities, a-bcom-cancel, a-deposit, a-extra-guest, a-p04-monthly, a-p12-hold, a-p13-orphan-price, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped, t-p06-open) | Unchanged; see JSON |

## Actions - 2026-11-07

**Ranking:** critical and time-bound rows first (tonight, the ~09:00Z push check), then by expected £, then unquantified rows.

**Expected effect** = £ price move on open nights x the flat's booked share from Smoobu (occupancy.md, handback-aware). These are upper bounds; elasticity is not measured.
- Next 30: P04 0.533, P05 0.767, P06 0.533 (ex-blocks), P08 0.857, P09 0.700, P11 0.467, P12 0.633, P13 0.733, P20 0.464.
- Next 60: P05 0.650, P12 0.568 (to handback), P13 0.483, P20 0.345.

**Bounds** (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P08 £150-1,000; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. Every proposed price is inside its bounds. P09 £100 is exactly the minimum.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P04 | **t-p04-doublebook (critical, day 8).** On 1455876748739910219, **block 7-8 Nov now**, then every open night, or snooze the listing. Then map 1455 to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §1 07:21:02-07:21:08Z: 7-10 Nov £517.40 and 8-11 Nov £519.00 bookable; guest 161888271 in residence 6-9 Nov. comp-east: 1455 open on every P04 run | Protects **£355.72** room; relocation cost not quantified | Corentin | 2026-11-07 |
| 2 | P08 | **a-handback-lastnights (tonight).** PriceLabs 3318167 DSO **7 Nov: min stay 2 -> 1**; keep the price (£225). | PriceLabs 3318167 > DSO 7 Nov; Smoobu follows | occupancy: 6 Nov lapsed, 8-14 Nov arrives tomorrow, so min 2 cannot sell. pricelabs H4: £225 vs uncustomized £163. comp-central: zero comps bookable 7-8 Nov | Upper bound £225 x 0.765 = **£172** (one night only) | Corentin | 2026-11-07 |
| 3 | P06 P11 P13 P09 P08 P04 | **t-pl-push-fresh (watch).** At **~09:00Z** read `last_date_pushed` on 3288517, 3064196, 3064856, 3090701, 3318172, 3318167, 3562176 and the P13 Vrbo copy `_3d48…`. Any still dated 6 Nov is past 24 h: **Sync Now**. On 3288517 Sync Now anyway, so PriceLabs registers 18-21 Nov as booked. | PriceLabs > each listing | pricelabs C1: last push 6 Nov 08:22:36-08:48:54Z; checked about 07:25Z. Status after 08:49Z NOT CHECKED | Not quantified | Corentin | 2026-11-07 |
| 4 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 9).** Remove the hidden rules on every apartment and any global rule: the 1-14 d rule (0.765), the 30-57 d rule (0.900) and whatever produced the P20 second 0.85. Keep only visible discounts (policy `airbnb_visible_discounts`). Pull the price details for Airbnb reservation 162694102 (P20). P09 is excluded (deprioritised). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules; Airbnb > Reservations > 162694102 | channel §2-3: 25 live searches 07:21-07:23Z. P06 18-22 Nov £856.79 = 0.765 x £1,120 (-£263.21). P20 19-26 Dec £1,428 = 0.7223 x £1,977, versus policy's £1,680.45 (-£252.45). comp-west: P20 stay P0, -31.7%, below all 7 comps | **Realised £515.66 on 6 Nov's two bookings**; cumulative **£1,209.23** (£693.57 + £515.66). Forward: 23.5% on every Airbnb night sold 1-14 d out, 10% at 30-57 d (not quantified) | Corentin | 2026-11-09 |
| 5 | P04 P05 P11 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off"). P04 live: last-minute -5% over 15 d, Aggressive occupancy (-30% to 0% at 0-15 d), Recency default. **P12 is excluded:** its open nights are above band (row 9). | PriceLabs > listing > Customizations | pricelabs H3, n30: P04 £719 (-24.4%), P11 £428, P05 £343, P20 £275; offsets P13 -£209, P09 -£12. Total **£1,897 / £1,108** | 719 x 0.533 + 428 x 0.467 + 343 x 0.767 + 275 x 0.464 - 209 x 0.733 - 12 x 0.70 = **£812 / 30 days** (upper bound) | Corentin | 2026-11-09 |
| 6 | P13 P04 P12 P11 P20 | **a-p13-record: confirm or restore your settings** (table a-g); record P13 base 250. Not new proposals. | PriceLabs 3064856 (+3090701), 3562176, 2699998, 3064196, 3547481; then `policy.json` | comp-west (P13 P0 on 8-12 Nov, `recommend` +10%); market (Christmas +4.8 to +25.3); comp-east (P04 fits either); comp-central (P11 P0-P29) | P13 8-12 Nov £781 x (1/0.90 - 1) x 0.733 = **£64**; others carried from 6 Nov (about £490, approx.). Overlaps rows 5 and 8 | Corentin | 2026-11-09 |
| 7 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,181 for the two nights** (P75; now £920) and **13-21 Dec to about £5,837** (P75; now £5,288). Reyhan's 13-19 Dec -7% is a plan reversal: your call. | PriceLabs 3166592 > DSO | market §2: occupancy +6.5 / +1.8 and +2.5 to +10.4 vs STLY. comp-central: P25, -35% to -41% vs medians; `recommend` +25%, **capped at P75** (n = 3-4) | (£261 + £549) x 0.650 = **£527** | Corentin | 2026-11-09 |
| 8 | P13 P05 | **a-peak-check.** 3064856 and 3090701 7-26 Dec to **+10%** (replacing Reyhan's -7% and -5%: conflict c2, your call); **25-26 Dec min 2** (if 20-25 Dec rebooks, min 3 strands them). P05 29 Dec **+100% -> 0%, min 1** (about £1,071). | PriceLabs 3064856 / 3090701 / 3166592 > DSO | market §2: 3064856 £4,133 vs P50 £4,895. comp-west: 20-27 Dec P0-P14; `recommend(0.483, 0.38, <0.75, q)` = +10%. P05 29 Dec £1,346 vs P90 £1,082 | £413 x 0.483 = **£199**; the P05 cut is not quantified. Overlaps row 6 | Corentin | 2026-11-09 |
| 9 | P12 | **a-p12-trim (your call: lowers a PriceLabs price).** DSO **7-10 Dec: -5% -> -25%** (£272/274/288/293 -> about £215/216/227/231 = £889). **30 Nov-3 Dec: -5% -> -15%** (£260/266/277/284 -> about £233/238/248/254 = £973). Hold 12-21 Nov. Override of `recommend` (30-day raise +10%), reason in Evidence. | PriceLabs 2699998 > DSO | comp-east: 7-10 Dec band P86, +30.3% (n = 14); 30 Nov-3 Dec P67, +13.8% (n = 15); qp **-0.15** supports -15% to 0%. The 30-day raise comes from booked nights; 60-day `recommend` is hold. 11-13 Dec sold at band P0-P25. Pace30 -19.7% | Not quantified (a cut). Price cost if all 8 nights sell: -£238 and -£114 | Corentin | 2026-11-09 |
| 10 | P05 | **a-p05-9nov (8th check).** Clear the Airbnb 9 Nov custom price and the 20% Special offer; check the sync log. To sell the night, replace +300% with **0%, min 1** (uncustomized £334). | Airbnb > 1618929775762183214 > Calendar 9 Nov; PriceLabs 3166592 > DSO 9 Nov | channel §3: £316.80 - £63.36 = **£253.44** room, unchanged since 31 Oct, vs Smoobu £1,376. comp-central: the one open comp asks £320 | Avoids **-£1,122.56** if it sells as is; upper bound £334 x 0.767 = **£256** | Corentin | 2026-11-08 |
| 11 | P12 | **NEW t-p12-13dec-orphan.** DSO **13 Dec min 2 -> 1** (keep £273). It is the last night before the 14 Dec handback block. | PriceLabs 2699998 > DSO 13 Dec | occupancy orphan table: created by the 11-13 Dec booking; PriceLabs 7 Nov raw price 273, min 2 | Upper bound £273 x 0.568 = **£155** | Corentin | 2026-11-10 |
| 12 | P06 | **t-p06-1521open (confirm; not a proposal).** Is the 5 Nov opening of 15-21 Nov intended? 18-22 Nov is now sold. **If yes:** record it in `policy.json`, and restore 15-17 Nov to the pre-refresh **£265 / £264 / £270** by DSO. This overrides `recommend`'s +5% because the restored price is still P0 (-30%) and 11 of 12 comps were unavailable for 18-22 Nov. **If no:** re-block 15-17 Nov in Smoobu. | Smoobu > Calendar > Marylebone; PriceLabs 3288517 > DSO 15-17 Nov; `policy.json` | pricelabs H2; comp-central (15-18 Nov P0 -36%; supported line -4% vs median, about £341 all-in); the 08:40Z refresh cut cost £171.37 on 18-22 Nov | If confirmed: (£28 + £27 + £26) x 0.533 = **£43** | Corentin | 2026-11-09 |
| 13 | P13 | **NEW t-p13-los5 (confirm).** The visible Airbnb **"Long stay discount" 10% on 5+ nights** is live on both twins (£101.97 on 20-25 Dec). Policy's length-of-stay rules are 7+ nights 15% and 28+ nights 20% only. Keep and record it, or set LOS 5+ to 0%. | Smoobu > Channel Manager > Airbnb > Shepherd's Bush > LOS 5+ | channel §2: £1,133 x 0.9 x 0.9 = £917.73 on the cancelled 162696296; it matches 21 Oct `pricing_rules_listing_B` | **£101.97** per 5-night Christmas stay | Corentin | 2026-11-09 |
| 14 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §3: £399.49 on £2,219.40 = 18.0% | **£66.58** per 6-19 Dec stay | Corentin | 2026-11-09 |
| 15 | P09 | **t-p09-cancel (revised; your call: lowers price).** DSO **8-9 Nov fixed £100** (now £113 / £110). Hold 10-12 Nov at £111 / £116 / £125. Check Airbnb > Earnings for 158710021 (payout retained, nights stayed). | PriceLabs 3318172 > DSO 8-9 Nov; Airbnb host > Reservations / Earnings | comp-east: the 8-10 Nov stay is P75, +7.8% vs band (n = 4). At £100 + £100 it is about £133 all-in = band median. 10-12 Nov already -11% to -17%. `recommend` +10% not adopted (lead from booked nights) | Cut of £23 if both sell; unsold nights are lost at the 26 Nov handback. Not quantified | Corentin | 2026-11-07 |
| 16 | P11 | **t-channel-gaps.** **23 Dec ≥ £320** (fortnight; now £305), **3 Jan ≥ £204** (now £188). | PriceLabs 3064196 (+Vrbo) > DSO | market §2 / §4: 3 Jan +4.9 vs STLY | (£15 + £16) x 0.467 = **£14** | Corentin | 2026-11-09 |
| 17 | P06 | **t-p06-open.** 10-11 Nov **-5% -> 0%** (£204/£212 -> about £215/£223), replacing Reyhan's -5% (your call). | PriceLabs 3288517 > DSO 10-11 Nov | comp-central: Airbnb 9-11 Nov P0 -27%; `recommend(0.533, 0.48, 0, -0.036)` = +5% | (£11 + £11) x 0.533 = **£12** | Corentin | 2026-11-08 |
| 18 | P20 | **a-p20-conversion (revised).** **Drop the 13-16 Nov price ask** (correction 4). Remove Reyhan's -5% on **26 Dec** (£310 -> about £326; your call). If row 4 is not done by 9 Nov, apply +5% on 13-16 and 20-23 Nov. Parking first photo; review requests. | PriceLabs 3547481 > DSO; Airbnb 1791529331262420081 | market §2: 13-16 Nov £939 vs P50 £856. comp-west: P0 -26.2% / -29.1% at factor 0.766; 26-30 Dec P67 hold | £16 x 0.345 = **£6** | Corentin | 2026-11-09 |
| 19 | P05 | **a-p05-earlybird.** Confirm the visible 12% early booking discount (60+ d) is yours. | Smoobu > Channel Manager > Airbnb > Abbey Rd | channel §3: £147.00 on 6-9 Jan (12.0%) | £147.00 per such stay | Corentin | 2026-11-10 |
| 20 | P12 | **t-p12-26nov-price (your call: lowers price).** DSO 26 Nov **+15% -> -15%**, keep **min 1** (£323 -> about £239). | PriceLabs 2699998 > DSO 26 Nov | comp-east: £373 all-in, **P100, +31.3%** (n = 3); supported £230-270 room | Not quantified (a cut) | Corentin | 2026-11-09 |
| 21 | P20 | **t-p20-delivery (confirm).** The block is on 18-19 Nov; policy says 20-22 Nov, and Airbnb sells 20-23 Nov. Update `policy.json`, or re-block. | Smoobu > Calendar; `policy.json` | channel §6 | Not quantified | Corentin | 2026-11-09 |
| 22 | P11 P12 | **t-cleaning-commission (question).** Booking.com takes commission on cleaning: £22.50 on P12, £26.82 on P11. Accept or challenge? | Booking.com extranet > Finance | channel §6 | £22.50-£26.82 per booking | Corentin | 2026-11-10 |

## Top 5 for today
1. **Barking day 8:** unsynced Airbnb 1455876748739910219 sells 7-10 and 8-11 Nov over the guest in residence (6-9 Nov, £355.72). Block 7-8 Nov on 1455 now, then map or unlist it.
2. **Tonight:** set P08 7 Nov to min 1 (£225; about £172 room). Otherwise P08's last sellable night before the 13 Nov handback is lost.
   - At about 09:00Z, check pushes on the seven listings and the P13 Vrbo copy (last pushed 6 Nov 08:22-08:49Z). Press Sync Now on any still dated 6 Nov, and on P06 anyway.
3. **Airbnb hidden layers, day 9:** two 6 Nov bookings lost £515.66 room.
   - P06 18-22 Nov at 0.765x.
   - P20 Christmas at 0.7223x £1,977. That is £252 under policy's weekly-only rule and 31.7% under same-stay comps, below all 7.
   - Remove the Smoobu Airbnb rules, and pull the price details for reservation 162694102. Cumulative cost: £1,209.23.
4. **Closed:** t-p06-2pound (£200 everywhere) and t-smoobu-below-pl (overwritten; 0 mismatches).
   - P06 15-21 Nov (policy block): confirm the opening (18-22 Nov sold at 0.765x after PriceLabs cut those nights 11-28%). If confirmed, restore 15-17 Nov to £265/£264/£270.
5. **Your calls on price:**
   - P13: restore 0% on 8-12 Nov and +10% at Christmas, replacing Reyhan's -10% / -7% / -5%. Comps are P0-P14. Confirm the visible 10% on 5+ nights.
   - P12: trim 7-10 Dec by -25% (+28-33% over band) and 30 Nov-3 Dec by -15%; set 13 Dec to min 1.
   - P05 9 Nov: 8th check.
   - The P20 13-16 Nov +10% is dropped.

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).** Today 0.765x at 1-14 d and 0.900x at 30-57 d. 7-night stays are inconsistent: 0.765x at 33 d, 0.85x at 57 d, and 0.7223x on P20 Christmas. Target **1.00x before visible discounts by 2026-11-10** (row 4).
- **Booking.com since the 24 Oct markup cut** (channel §4): unchanged at 13 confirmed / 51 n / £8,531.60 at **0.778x**.
  - 6 Nov was the first day since the cut with no Booking.com booking or cancellation.
  - Pace: 0.95 confirmed bookings a day (was 1.02).
  - Promotions stay. The lever is the PriceLabs price under them. KPI: at least 1.0 a day by 2026-11-15.
- **Net to owner per £100 PriceLabs** (channel §5):
  - Booking.com as sold: about £63-66.
  - Airbnb: £64.64 at 0.765; £61.03 on P20 Christmas.
  - Models: Booking.com £97.75, Airbnb £84.50.
  - Direct (£90 model) is not the cheapest channel against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median):
  - P12 4.27 vs 4.86; P13 **4.7 (10, +1 review)** / 4.31 vs 4.78; P06 4.58 vs 4.67.
  - P08 4.50 vs 4.87; P04 synced 4.11 vs 4.85 (unsynced 4.69 (26)).
  - P05 4.77 vs 4.26; P09 5.0 (3) vs 4.58; P20 none vs 4.8.
  - Booking.com (policy): P11 8.0, P12 9.1, P13 8.4.
  - The -0.15 cap binds on P12, the synced P04 and the P13 4.31 twin.
  - Fixes:
    - P12 pre-arrival key-collection message (the process itself is fixed by policy).
    - P13 4.31 twin: cleanliness and photo accuracy.
    - P20 and P09: review requests.
    - Barking: mapping 1455 keeps its 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.**
  - P20: 0 reviews; the guest-side P0 is mostly the Airbnb layer (correction 4).
  - P11: Booking.com CTR 0.81% vs 1.70% (policy), with every open stay at P0-P29.
  - P06: no lift (5 of 12 comps have one).
- **Gap fill / length of stay.**
  - Orphans: P08 7 Nov (row 2) and P12 13 Dec (row 11).
  - P13 25-26 Dec is sellable now, but would strand if 20-25 Dec rebooks (row 8).
  - P20 26 Dec sits inside a min-4 rule.
  - The P09 7-12 Nov run sells best as one stay (8-13 Nov £551 all-in).
  - Mid-term (91+ nights): NOT CHECKED.
- **Direct share.** 1.47% of room revenue (not re-run). Target 5% by 2027-06-30.
- **Event compression** (market §4): **24 n / £307** excluding darts R1; full **29 n / £609** (yesterday 27 / £612).
  - The market supports raises only on P13 Christmas, P05 December, P04 14-19 Dec (+£155 to P75) and P11 3 Jan.
  - The rest rests on the fortnight rule while the market runs below STLY, so it is not proposed.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **66.4%** (66.9% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£173.08** (£172.36) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£114.94** (£115.35) | £129 | 2026-12-18 |
| Revenue, last 30 | **£44,827.37** (259 n) | - | - |
| Booked next 30 (Smoobu) | **59.6%** (170/285) | each unit at least market + 10 pts (below: P11 46.7% vs 46%, P06 53.3% vs 48%, P20 46.4% vs 37%) | 2026-11-10 |
| Booked next 60 | **48.6%** (231/475) | at least market + 10 pts (P20 34.5% vs 30%) | 2026-11-17 |
| 7-day pickup, net | gross 12 bk / 40 n / £8,755.22; **net +20 n / +£5,417.77** (yesterday corrected +8 n / +£2,916.98) | at least 10 bookings a week, net positive | 2026-11-10 |
| P12 pace30 vs STLY | **-19.7%** (-8 n / -£866.45); to handback -23.2% | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+3 n / +£1,798.65 like-for-like**; +7 n / +£2,655.44 incl. P06 reopened nights | positive and rising | 2026-11-09 |
| Booking.com paid / PriceLabs (since cut) | **0.778x** (13 confirmed) | median at least 0.80x | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x (1-14 d) / 0.900x (30-57 d)**, day 9; realised cost £1,209.23 | 1.00x before visible discounts | 2026-11-10 |
| PriceLabs-side gap | **£1,897 next 30; £1,108 next 14** | £0 apart from your own overrides | 2026-11-09 |
| Listings with a push older than 24 h | **7 + P13 Vrbo copy at 08:22-08:49Z** unless they refresh | 0 | 2026-11-07 |
| Smoobu open nights below PriceLabs | **0** (was 15 / £256) | 0 unintended | met |
| Double-sellable Barking stays | **2 stays (7-10, 8-11 Nov) / £355.72**, day 8 | 0 | 2026-11-07 |
| Missed compression | **24 n / £307** excl. darts R1; full 29 n / £609 | under 10 nights | 2026-11-10 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-10; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.26-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **P20 162694102: what made the second 0.85.** Source: Airbnb > Reservations > 162694102 > price details.
2. **Smoobu Airbnb rule settings:** still not read; the layers are inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
3. **Why PriceLabs cut P06 15-21 Nov by 11-28% at the 08:40Z refresh:** NOT CHECKED. Source: PriceLabs 3288517 > Customizations.
4. **Push status after 08:49Z today:** NOT CHECKED (row 3).
5. **Retained payouts:** P09 158710021 and P13 162696296 are NOT CHECKED. Source: Airbnb > Earnings.
6. **Listing 1455's own reservations:** NOT CHECKED. Source: Airbnb host 551951609 > Reservations.
7. **Booking.com displayed prices, comps and rank:** NOT CHECKED (AWS WAF 07:25:05Z; not bypassed). Source: extranet screenshots.
8. **Who typed the 6 Nov manual Smoobu rates:** UNKNOWN. Source: Smoobu rate log, or ask Reyhan.
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12.
10. **Other:**
    - Jan-Feb min-stay rule is not in policy.
    - P04 recommended base is "Unavailable".
    - P15-P19 need the second-account keys.
    - Vrbo +8% / Direct -10% are unconfirmed.
    - P02 Vrbo copy is stale (24 Feb).

```json
{"scoreboard":{"note":"7 Nov 2026. Last 30 nights = 8 Oct-6 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward figures handback-aware, Smoobu confirmed stays as truth. Pickup = bookings made 1-7 Nov net of cancellations; yesterday corrected to +8 n / +£2,916.98 (P05 29 Jan booking made 1 Nov). Base-rise like-for-like excludes P06 18-22 Nov (reopened nights). Airbnb ratios from 25 live searches 07:21-07:23Z (channel §3). PriceLabs gap from pricelabs H3. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"66.4%"},{"label":"ADR last 30","value":"£173.08"},{"label":"RevPAR last 30","value":"£114.94"},{"label":"Revenue last 30","value":"£44,827.37"},{"label":"Nights last 30","value":"259"},{"label":"Booked next 30","value":"59.6% (170/285)"},{"label":"Booked next 60","value":"48.6% (231/475)"},{"label":"7-day pickup","value":"gross 12 bk / 40 n / £8,755.22; net +20 n / +£5,417.77 (yesterday corrected +8 n / +£2,916.98)"},{"label":"P12 pace30 vs STLY","value":"-19.7% (-8 n / -£866.45)"},{"label":"Raised flats net since 18 Oct","value":"+3 n / +£1,798.65 like-for-like; +7 n / +£2,655.44 incl. P06 reopened nights"},{"label":"Booking.com since markup cut","value":"13 confirmed, 51 n, £8,531.60; 0.778x PriceLabs; net +26 n / +£3,480.23"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at 1-14 d; 0.900x at 30-57 d; 7-night inconsistent (P20 Xmas 0.7223x); day 9; realised £515.66 on 6 Nov, £1,209.23 cumulative"},{"label":"PriceLabs-side gap","value":"£1,897 next 30; £1,108 next 14"},{"label":"Pushes reaching 24 h today","value":"7 listings + P13 Vrbo copy at 08:22-08:49Z"},{"label":"Smoobu below PriceLabs","value":"0 (was 15 nights / £256)"},{"label":"Double-sellable Barking stays","value":"2 stays (7-10, 8-11 Nov) / £355.72 (day 8)"},{"label":"Missed compression","value":"24 n / £307 excl. darts R1; full 29 n / £609"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 8): unsynced Barking Airbnb 1455876748739910219 sells 7-10 Nov (£517.40) and 8-11 Nov (£519.00) over guest in residence 6-9 Nov (161888271, £355.72); block 7-8 Nov now, then all open nights; map to 3562176 or unlist","gbp":355.72},
{"id":"a-handback-lastnights","status":"open","prop":"P08","priority":"high","title":"Tonight: P08 6 Nov lapsed; 7 Nov £225 min 2 cannot sell (8-14 Nov arrives 8 Nov); set PriceLabs 3318167 7 Nov min 1, keep £225 (about £172 room at 0.765)","gbp":172},
{"id":"t-pl-push-fresh","status":"open","prop":"P06 P11 P13 P09 P08 P04","priority":"high","title":"Met 6 Nov (pushed 08:40-08:49Z); re-armed: 7 listings + P13 Vrbo copy last pushed 6 Nov 08:22-08:49Z cross 24 h at 08:22-08:49Z today; check ~09:00Z, Sync Now if still 6 Nov (and on P06 3288517 anyway so 18-21 Nov shows booked)","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 9, unchanged: remove hidden Smoobu Airbnb layers 0.765 (1-14 d) / 0.900 (30-57 d) and the P20 second 0.85; 6 Nov bookings lost £515.66 (P06 18-22 Nov -£263.21 at 0.765; P20 19-26 Dec £1,428 = 0.7223x £1,977, -£252.45 vs policy, P0 -31.7% vs 7 comps); cumulative £1,209.23; pull Airbnb 162694102 price details; P09 excluded","gbp":515.66},
{"id":"t-p06-2pound","status":"done","prop":"P06","priority":"high","title":"Closed: P06 9 Nov £200 everywhere (Smoobu; PriceLabs price/user_price/booked_price); £2 gone; Booking.com display NOT CHECKED","gbp":null},
{"id":"t-smoobu-below-pl","status":"done","prop":"P13 P11 P04 P09 P06","priority":"high","title":"Closed: 15 manual Smoobu nights 8-12 Nov overwritten by the 6 Nov 08:40-08:49Z pushes (+£194); 0 mismatches on every listing; who typed them still UNKNOWN","gbp":null},
{"id":"t-p06-1521open","status":"open","prop":"P06","priority":"high","title":"For Corentin to confirm (policy intentional block): PriceLabs opened 15-21 Nov at 6 Nov 08:40Z refresh and cut them 11-28% (-£171.37 on the sale); 18-22 Nov sold £856.79 = 0.765x £1,120; 15-17 Nov open at £237/237/244 (P0 -30% to -39%); if confirmed record in policy and restore £265/£264/£270; else re-block","gbp":43},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P20","priority":"high","title":"Not done: gap £1,897 next 30 / £1,108 next 14 (P04 -24.4%, £719); set Last-minute, Occupancy, Booking Recency to Custom 0%; P12 excluded (open nights above band)","gbp":812},
{"id":"a-p13-record","status":"open","prop":"P13 P04 P12 P11 P20","priority":"high","title":"For Corentin to confirm: P13 8-12 Nov -10% vs 0% (comps P0, support 0%); P13 7-20 Dec -7% / 21-26 Dec -5%; P04 -7% vs -8% (either fits); P12 17 Nov -5% (£242) vs +50%; P11 darts -5% (£1,098) and 10 Nov-18 Dec -5%; P20 base 330 vs 350, 16-17 Nov min 2, 19-26 Dec -5% (about £75 on the Christmas booking); Jan-Feb min 3-4; record P13 base 250","gbp":554},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Not done: 7-8 Dec £920 -> about £1,181 (P75, +£261) and 13-21 Dec £5,288 -> about £5,837 (P75, +£549); Reyhan's 13-19 Dec -7% your call","gbp":527},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"Not done: P13 7-26 Dec 3064856 £4,133 vs P50 £4,895 (comp P0-P14, recommend +10%): +10% both twins replacing Reyhan's -7%/-5% (your call), min 2 on 25-26 Dec; P05 29 Dec £1,346 vs P90 £1,082: 0% min 1","gbp":199},
{"id":"a-p12-trim","status":"open","prop":"P12","priority":"high","title":"Gap grew: algorithm raised 7-10 Dec to £272/274/288/293 (+28-33% vs band, P86); DSO 7-10 Dec -5% -> -25% (about £889) and 30 Nov-3 Dec -5% -> -15% (about £973); override of 30-day recommend; lowers a PriceLabs price: Corentin's call","gbp":null},
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"high","title":"Not fixed (8th check): Airbnb 9 Nov £253.44 room (20% Special offer on £316.80) vs Smoobu £1,376 (-£1,122.56 if sold); clear the Airbnb date; to sell, DSO 0% min 1 (uncust £334)","gbp":256},
{"id":"t-p12-13dec-orphan","status":"open","prop":"P12","priority":"medium","title":"New: 13 Dec orphan (£273, min 2) between the 11-13 Dec booking and the 14 Dec handback block; set DSO 13 Dec min 1, keep price","gbp":155},
{"id":"t-p13-los5","status":"open","prop":"P13","priority":"medium","title":"New, confirm: visible Airbnb 'Long stay discount' 10% on 5+ nights on both twins (£101.97 on 20-25 Dec; booking 162696296 made and cancelled in 10 min, nights back on sale at same price); not in policy LOS (7+ 15%, 28+ 20%); keep and record, or set LOS 5+ to 0%","gbp":101.97},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£66.58 on 6-19 Dec)","gbp":66.58},
{"id":"t-p09-cancel","status":"open","prop":"P09","priority":"medium","title":"Revised: Smoobu 8-10 Nov now PL £113/110/111 (ask met); 8-12 Nov (5 n, £575) unsold; comps support £100 on 8-9 Nov only (8-10 Nov stay P75 +7.8% vs band), hold 10-12 Nov; lowers price: Corentin's call; payout for 158710021 NOT CHECKED","gbp":null},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Partly done: 23 Dec £305 (target >= £320 fortnight); 3 Jan £188 (target >= £204); Booking.com CTR 0.81% vs 1.70%","gbp":14},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"P06 10-11 Nov fell to £204/£212 at the refresh; Airbnb P0 -27%: DSO -5% -> 0% (about £215/£223) replacing Reyhan's -5% (your call); 8-9 Nov at the £200 min (PL output)","gbp":12},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Revised: drop the 13-16 Nov price ask (PL £939 above P50 £856; guest-side P0 -26%/-29% is the 0.766 Airbnb layer, fix via a-airbnb-rules; fallback +5% on 13-16 / 20-23 Nov if not fixed by 9 Nov); remove Reyhan's -5% now only on 26 Dec (£310); parking first photo, review requests","gbp":6},
{"id":"a-raise-1012nov","status":"open","prop":"P13","priority":"medium","title":"Not done: 3064856 12 Nov £162 min 2 (below P25 £174), 3090701 £172; supported about £176 / £200; inside a-p13-record conflict","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov £323 (£373 all-in, P100 +31.3%, n=3); DSO +15% -> -15% (about £239), keep min 1; lowers price: Corentin's call","gbp":null},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"medium","title":"Confirm: block live 18-19 Nov, policy says 20-22 Nov delivery; Airbnb sells 20-23 Nov; update policy or re-block","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12","priority":"medium","title":"Booking.com commissions cleaning: P12 £22.50, P11 £26.82 per booking: accept or challenge?","gbp":null},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early booking (60+ d) still on (£147.00 on 6-9 Jan): not in policy - yours?","gbp":147},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284; pace30 -19.7% (-8 n / -£866.45), to handback -23.2%; correct open December via a-p12-trim, not base","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 27 Nov 3064856 £333 (+40%, above P75) at +50%; 17 Nov +35%: confirm; no trim proposed","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Booking.com cancellations in window (P11 12-14 Dec, P12 3-7 Dec, P04 19-20 Dec): send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change (13 days)","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3); id_map P20 note min 220/base 350 vs PL 200/330; Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps unchanged 7 Nov (no replacements; P08 4 comps absent 6 days); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 sells 7-10 and 8-11 Nov over the 6-9 Nov guest in residence (£355.72), day 8; no booking on 1455 visible","evidence":"channel §1 live cards 07:21:02-07:21:08Z £517.40 / £519.00; comp-east."},
{"agent":"channel","severity":"high","ref":"P20 P06","title":"Hidden Airbnb layers cost £515.66 on two 6 Nov bookings: P06 18-22 Nov 0.765x £1,120; P20 19-26 Dec £1,428 = 0.7223x £1,977 (0.85 x weekly 0.85), £252.45 below policy","evidence":"channel §2-3; market §2b; comp-west (P20 P0 -31.7% vs 7 comps)."},
{"agent":"occupancy","severity":"high","ref":"P08","title":"P08 6 Nov lapsed; 7 Nov £225 min 2 unsellable before the 8-14 Nov stay; a-handback-lastnights not applied","evidence":"occupancy orphan table; pricelabs H4 (live get_listing_prices £225 vs uncust £163); comp-central (0 comps 7-8 Nov)."},
{"agent":"pricelabs","severity":"high","ref":"P06 P11 P13 P09 P08 P04","title":"7 listings + P13 Vrbo copy last pushed 6 Nov 08:22-08:49Z cross 24 h today; t-p06-2pound and t-smoobu-below-pl fixed (0 mismatches)","evidence":"pricelabs C1, H1, H4; get_listing_data ~07:25Z."},
{"agent":"pricelabs","severity":"high","ref":"P06","title":"PriceLabs opened P06 15-21 Nov at 6 Nov 08:40Z refresh and cut them 11-28% (no edit); 18-22 Nov sold £856.79; refresh cost £171.37; 15-17 Nov open at P0","evidence":"pricelabs H2; comp-central; channel §2."},
{"agent":"comp-east","severity":"high","ref":"P12","title":"Algorithm raised 7-10 Dec to £272-293 (+28-33% vs band, P82-P90) with comps flat; trim 20-25%; 30 Nov-4 Dec trim 10-15%; 26 Nov P100","evidence":"comp-east Priority 2; qp -0.15."},
{"agent":"comp-west","severity":"high","ref":"P13","title":"Reyhan's 8-12 Nov -10% (policy 0%) and 7-26 Dec -7%/-5%: P0 on 8-12 Nov, P0-P14 at Christmas; 20-25 Dec booked/cancelled in 10 min and reopened at same price with visible 10% LOS 5+","evidence":"comp-west; market §2; channel §2."},
{"agent":"market","severity":"medium","ref":"P20","title":"Drop P20 13-16 Nov +10%: PL £939 now above P50 £856, market -9.4/-9.7 on 14-15 Nov; guest-side gap is the Airbnb layer","evidence":"market §2, §5; comp-west P20 table (factor 0.766)."},
{"agent":"comp-east","severity":"medium","ref":"P09","title":"P09 8-12 Nov (5 n, £575) unsold; 8-10 Nov stay already P75 +7.8% vs band; £100 supported on 8-9 Nov only, hold 10-12 Nov","evidence":"comp-east Priority 1; market §2c."},
{"agent":"occupancy","severity":"medium","ref":"P12","title":"New orphan 13 Dec (£273, min 2) before the 14 Dec handback; pace30 -19.7%","evidence":"occupancy orphan table and pace table."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"Base-rise tally +7 n / +£2,655.44 incl. P06 reopened nights; like-for-like +3 n / +£1,798.65 unchanged; pickup net +20 n / +£5,417.77; yesterday corrected to +8 n / +£2,916.98","evidence":"occupancy.md base-rise and pickup sections."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £1,897 next 30 / £1,108 next 14 (was £1,807 / £997); P04 -24.4%","evidence":"pricelabs H3."},
{"agent":"market","severity":"medium","ref":"P05 P13 P04 P11","title":"Raises still supported: P05 7-8 Dec +£261, 13-21 Dec +£549 to P75; P13 Christmas +10% (+£413); P04 14-19 Dec +£155; missed compression 24 n / £307 excl. darts R1","evidence":"market §2, §4, §5."}
],
"top5":[
"Barking day 8: unsynced Airbnb 1455876748739910219 sells 7-10 and 8-11 Nov over the guest in residence (6-9 Nov, £355.72): block 7-8 Nov on 1455 now, then map or unlist.",
"Tonight: set P08 7 Nov to min 1 (£225, about £172 room), or P08's last sellable night before the 13 Nov handback is lost. At ~09:00Z check pushes on 7 listings + P13 Vrbo copy (last 6 Nov 08:22-08:49Z); Sync Now if still 6 Nov, and on P06 anyway.",
"Airbnb hidden layers day 9: 6 Nov bookings lost £515.66 (P06 18-22 Nov at 0.765x; P20 Christmas £1,428 = 0.7223x £1,977, £252 under policy, 31.7% under same-stay comps, below all 7). Remove the Smoobu Airbnb rules; pull reservation 162694102 price details. Cumulative £1,209.23.",
"Closed: t-p06-2pound (£200 everywhere) and t-smoobu-below-pl (overwritten, 0 mismatches). P06 15-21 Nov policy block: confirm the opening (18-22 Nov sold at 0.765x after PriceLabs cut those nights 11-28%); if confirmed restore 15-17 Nov to £265/£264/£270.",
"Your price calls: P13 restore 0% on 8-12 Nov and +10% Christmas vs Reyhan's -10%/-7%/-5% (comps P0-P14), confirm visible 10% LOS 5+; P12 trim 7-10 Dec -25% (+28-33% over band) and 30 Nov-3 Dec -15%, 13 Dec min 1; P05 9 Nov 8th check; P20 13-16 Nov +10% dropped."
],
"per_property":[
{"ref":"P01","change":"Pushed 7 Nov 05:22Z; nothing open to the 20 Dec handback."},
{"ref":"P02","change":"Intentional block; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 03:31Z via Channex."},
{"ref":"P04","change":"1455 sells 7-10 / 8-11 Nov over the 6-9 Nov guest (day 8); 9-11 Nov now £157/157/158 (manual £140 overwritten); weekly 18%; discount gap £719; fwd30 53.3% vs 24%."},
{"ref":"P05","change":"No booking, no edit; 9 Nov Airbnb £253.44 vs Smoobu £1,376 (8th check); 7-8 Dec £920 and 13-21 Dec £5,288 under P75; 29 Dec £1,346; 12% early bird; fwd30 76.7% vs 43%."},
{"ref":"P06","change":"9 Nov £2 fixed (£200); PriceLabs opened 15-21 Nov at 08:40Z and cut them 11-28%; 18-22 Nov sold £856.79 (0.765x £1,120); 15-17 Nov open at P0; 8-9 Nov at £200 min; 10-11 Nov £204/£212."},
{"ref":"P07","change":"Intentional block; pushed 04:14Z."},
{"ref":"P08","change":"6 Nov lapsed; 7 Nov £225 min 2 unsellable unless min 1 today; handback 13 Nov."},
{"ref":"P09","change":"6 Nov lapsed; 7-12 Nov open £132/113/110/111/116/125 (manual £100 overwritten); comps support £100 on 8-9 Nov only; payout NOT CHECKED."},
{"ref":"P10","change":"Booked to the 18 Nov handback."},
{"ref":"P11","change":"No booking; 10-12 Nov £194/200/209 (manual values overwritten); 23 Dec £305; 3 Jan £188; darts £1,098 under -5%; fwd30 46.7% vs 46%."},
{"ref":"P12","change":"Algorithm raised 7-10 Dec to £272-293 (+28-33% vs band); 26 Nov £323 P100; new orphan 13 Dec £273 min 2; pace30 -19.7%."},
{"ref":"P13","change":"20-25 Dec booked and cancelled in 10 min (£917.73), reopened at same price with visible 10% LOS 5+; 3090701 8-11 Nov now £161-170; 3064856 12 Nov £162; Christmas £4,133; 3090701 4.7 (10)."},
{"ref":"P14","change":"Numbers only: 108 of 180 open nights at £500; 0% vs 46%."},
{"ref":"P20","change":"Airbnb 19-26 Dec sold £1,428 (0.7223x £1,977; P0 -31.7% vs 7 comps); 7 Nov refresh raised December, cut 22 Nov £287 -> £235; 13-16 Nov +10% ask dropped; 60-day lead now +3 pts; delivery block question open."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 256)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback (occupancy.md)."},
{"ref":"P04","base":"220 (rec Unavailable)","recommendation":"Hold 220; get the data on why the PL recommendation is Unavailable","reason":"53.3% vs 24%; November about -20% vs comps, December -11% to +4%, qp -0.15 (comp-east)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides (a-p05-dec)","reason":"76.7% vs 43%; December P25; qp +0.15; recommend +25% (comp-central)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Policy block; 8 of 15 non-blocked nights booked (53.3% vs 48%); 8-9 Nov at the £200 min (pricelabs M1)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"70.0% vs 36% to the 26 Nov handback; 8-12 Nov at market P30 (comp-east; market)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"46.7% vs 46%; comps P0-P29; recommend +5% = removing Reyhan's -5% (conflict b2) (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; correct open December with date overrides (a-p12-trim), not the base","reason":"63.3% vs 42%; pace30 -19.7%; open December band P82-P90 with qp -0.15; handback 13 Dec (comp-east; occupancy.md)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 43% (+30 pts); P0 on every 8-12 Nov stay; recommend +10% (comp-west)."},
{"ref":"P20","base":"330 (Corentin 350; rec 351)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"46.4% vs 37% (30d), 34.5% vs 30% (60d, lead now +3 pts); 0 reviews (comp-west; occupancy.md)."}
]}
```

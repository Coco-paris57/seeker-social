# Seeker Estates - Daily revenue report, 2026-11-05 (Thursday)

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs your explicit approval.**

**Inputs**
- `reports/2026-11-05/kpi_pack.json` and `kpi_summary.md`.
- All seven sections in `reports/2026-11-05/sections/`: occupancy, pricelabs, channel, market, comp-east, comp-central, comp-west.
- `reports/2026-11-04/daily-report.md` and its JSON, the dashboard action list (5 Nov, before this step) and the overnight brief.
- `data/policy.json`, read first. `rm/positioning.py` (`recommend`, `quality_premium`) sizes every price move; PriceLabs min/max from `data/snapshots/2026-11-05/listings.csv`.
- I used no guest data and made no PriceLabs, Smoobu or OTA calls. Anything the sections did not read is NOT CHECKED.

**Policy respected**
- P02/P03/P06/P07 blocks are intentional (P06 8-11 Nov is open inventory, not under the block). P14 is numbers only. P13 is one flat (3064856 + 3090701).
- Settled, not raised: Visibility Booster commission, 15%/20% stay discounts, Booking.com promotion stacking (size only), P04 2 Dec, P04 min 3, P12 17 Nov (reported only as Reyhan's conflict), P13 1 Dec, P13 twin price order, P09 Airbnb rules, P12 key collection, P20 max 4 guests.
- Nights after the handbacks are not inventory: P08 13 Nov, P10 18 Nov, P09 26 Nov, P12 13 Dec, P01 20 Dec.
- **Your standing direction: keep Booking.com discounts, cut PriceLabs discounts.** So I do **not** adopt channel's suggestion to switch Mile End Genius to Level 1 only; the P12 stack is reported by size. Reyhan's edits that cross your decisions are listed for you to confirm, not proposed again.

## Corrections and conflicts resolved between sections

1. **P12 new booking commission: 15%, not 18.3%. channel wins.** occupancy.md quotes £124.17 as "18.3% of room". channel.md §2 shows £124.17 = **15.000% x (room £677.79 + cleaning £150)**; the cancelled booking is the same (£183.37 = 15% x £1,222.44). Both figures are the same money: 18.3% of room is 15% of room + cleaning. There is no booster on Mile End on record. The cleaning part is **£22.50 per booking** (Camden: £26.82 at 18%). New question **t-cleaning-commission**.
2. **P12 3-7 Dec -> 4-7 Dec: a rebooking is NOT proven.** Different Booking.com reference and party (6 vs 5 guests), created 5 h 50 m after the cancellation (occupancy, channel, comp-east). comp-east reads Smoobu type "modification of booking" on 162667435, occupancy reads it as a new reservation; neither links it to 161902221. **Net -1 n / -£394.65 room.** Price at booking: £769 PriceLabs (01:25:58Z refresh, Reyhan's -15% on), paid 0.881x; Booking.com stack £886 list x 0.765 (two layers, best reading Genius 15% x Mobile 10%; size only).
3. **3 Dec is not an orphan** (occupancy, pricelabs H1, comp-east): last night of the 4-night run 30 Nov-3 Dec, £232/£238/£246/£253, min 2. Hold.
4. **18 Oct base rises, corrected method only: +10 n / +£2,145.44** (was +11 / +£2,540.09). The change is all P12: 3-7 Dec now nets to zero (-4 n / -£1,072.44) and 4-7 Dec adds +3 n / +£677.79. P12 is now +4 n / +£227.79.
5. **t-pl-price-divergence: closed as explained (pricelabs H4).** `user_price` ("Your Price") equals the **previous cycle's** pushed price on 96 of 108 open nights, including 56 of the 68 that differ. Smoobu follows `price` on every comparable night. So it is a one-cycle lag, not a push fault. Two residual observations, not actions:
   - P20 20 Nov pushed **£238** vs Your Price £300 = yesterday's price. The fall is the 0-15-day band (P20 default £347 -> £274; P04's Aggressive occupancy profile is -30% to 0% in that band; market.md §3).
   - P12 30 Nov-2 Dec pushed £232/£238/£246 vs £203/£208/£217 (+13-14%), 13 Nov +18%: an algorithmic overnight rise of £29-30, cause NOT CHECKED (comp-east, market.md §2).
6. **P04 December: comp-east now supports HOLD, so a-p04-dec is dropped.** The replacement comp 1601606251010507286 lowered December medians by £12-46; our December stays are -11.3% to +3.5% vs median, above the -15% quality line (4.11 vs 4.85, `quality_premium` -0.15). market.md still shows +£149 to P75; with comp n=2-4 and the quality cap binding, the positioning rule says hold.
7. **Discount gap next 30 £2,285 / next 14 £1,041** (pricelabs H3; yesterday £2,485 / £971). Excludes P01/P06/P09/P10 (no PriceLabs data) and P14. On the same nights it fell £420, mostly because P20 uncustomized fell; **P04's gap widened** (£749 -> £825) with no edit.

## Executive summary

1. **NEW CRITICAL - P06 Marylebone 9 Nov is on sale in Smoobu at £2/night** (min 2), and 8 Nov at **£200** (the PriceLabs floor). On 4 Nov both were £228/£233 (PriceLabs = Smoobu). Reconfirmed at 07:20:47Z.
   - Airbnb does **not** show it: its P06 sync is stale, every card equals 0.765 x the 4 Nov rates. If that sync resumes, the £2 goes live.
   - **Booking.com: NOT CHECKED** (AWS WAF, not bypassed). P06 has 11 Booking.com bookings on record; at +15% the list price would be about £2.30.
   - Likely written by the **4 Nov 12:52:54Z PriceLabs push** (31 s after Reyhan's price-less "fixed" DSO on 15-22 Nov); **cause unknown**. No override explains it (9 Nov = -5% percent).
   - Exposure: 8-10 Nov at £202 vs £461 (-£259).
2. **NEW CRITICAL - LISTING_NO_DATA on P01, P06, P09, P10.** Still listed, `push_enabled` true, no removal/unlink log since 6 Oct, but `last_refreshed_at` null and **no push since 4 Nov** (P09 past 24 h; its ~07:30Z slot did not fire). A data failure, not a removal. Smoobu keeps selling the last-pushed prices: P09's handback nights 10-12 Nov are frozen at **£113 / £122 / £129** (P0 vs comps, -5.5% to -26.6%). P01 and P10 have nothing for sale.
3. **Barking, day 6: unsynced Airbnb 1455876748739910219 still sells 5-8, 6-9, 5-9 and 6-10 Nov** over tonight's in-house Booking.com guest (last night) and the 6-9 Nov Airbnb stay. **£748.90 at risk**; no booking on 1455 visible yet.
4. **P12 Mile End:** 3-7 Dec cancelled (£1,072.44), 4-7 Dec booked (£677.79): net -1 n / -£394.65. 4 Nov (£302) lapsed unsold. **Pace30 -16.6%** (was -12.1%).
5. **Airbnb hidden layers day 7** (0.765 at 28 days or less, 0.900 at 31-34 days; P08 same-day 0.850). **P05 9 Nov still £253.44 room vs Smoobu £1,403 (sixth check).**
6. **Reyhan:** one new edit only (P06 15-22 Nov min 2, price-less "fixed" DSO, 4 Nov 12:52:23Z). All seven conflicts and the five plan reversals are unchanged; none of the open raises was done. P08's handback nights fell further to **£509** (5-7 Nov).

**Last 30 nights (6 Oct-4 Nov, 13 units):** occupancy **67.9%**, ADR **£170.36**, RevPAR **£115.75**, revenue **£45,144.33** (265 n; kpi_pack `portfolio_last30`). Yesterday 67.4% / £170.10 / £114.71 / £44,737.32.
**Next 30 (5 Nov-4 Dec):** **62.2%** (179/288); same window as yesterday 61.9% (174/281, was 62.3%; only P12 3 Dec reopened). **Next 60:** **50.0%** (240/480). Smoobu truth, handback-aware (occupancy.md).
**7-day pickup (30 Oct-5 Nov):** gross 8 bk / 22 n / £5,038.89; cancellations 4 / 10 n / £2,130.94; **net +12 n / +£2,907.95** (yesterday +23 n / +£5,624.28).

## Base review

No `base_price`, `min_price` or `max_price` change on 4-5 Nov; recommended bases unchanged (pricelabs.md). Base vs NL market from pricelabs M5.

| Ref | Base / PL rec | Today's evidence | **Recommendation** |
|---|---|---|---|
| P01 | 253 / 255 | 100% booked to the 20 Dec handback; LISTING_NO_DATA | **Hold; off the agenda.** Fix the data failure (t-pl-nodata) |
| P04 | 220 / Unavailable | 56.7% vs 23% (30d); base +30.2% vs P50 £169, +2.8% vs P75 £214; November stays P0-P50 at -16% to -32%, December -11% to +3.5% (comp-east) | **Hold 220.** Get the data on "Unavailable" |
| P05 | 550 / 544 | 76.7% vs 40%; P0/P12/P22, qp +0.15, `recommend` +25%; base -3.3% vs P50 £569 | **Hold 550; date overrides** (a-p05-dec) |
| P06 | 357 / 357 | Only 8-11 Nov sellable; LISTING_NO_DATA; base -11.9% vs P50 | **Hold.** Fix the £2 first |
| P09 | 176 / 176 | 86.4% vs 36%; 3 nights before handback; LISTING_NO_DATA | **Hold** |
| P11 | 286 / 283 | 46.7% vs 45%; P5/P9/P5 at room price; `recommend` +5% = removing Reyhan's -5% | **Hold 286** (conflict b2) |
| P12 | 284 / 284 | 63.3% vs 41%; **pace30 -16.6%**; base +39.2% vs P50 £204, but multi-night stays sit at band P40-P64 with qp -0.15; December window 22% vs 34% | **Hold 284.** No base cut on top of Reyhan's -15% |
| P13 | 250 / 237 (236) | 73.3% vs 42%; base +12.6% vs P50 £222, -10.1% vs P75 | **Keep 250 and record it in policy** |
| P20 | **330** (your 350) / 347 | 50.0% vs 36% (30d), 24.1% vs 30% (60d); `recommend` **fix-listing** on every December stay; 0 reviews vs 17.5 | **Conflict for you: confirm 350 or record 330.** Not a new proposal |

## What changed since 4 Nov

### 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect (corrected method)
| Group | Net since the rise | Per day, made 19 Oct-4 Nov vs 2-18 Oct (bk / n / £) |
|---|---|---|
| **Raised** | **+10 n / +£2,145.44** (made 18 / 60 n / £12,992.19; cancelled 8 / 50 n / £10,846.75) | **1.00x / 0.48x / 0.50x** (was 1.07x / 0.52x / 0.56x) |
| Unraised (P02, P08, P10, P14, P20*) | +29 n / +£4,717.79 (unchanged) | 0.86x / 0.43x / 0.59x |
| P13 (base 235 -> 250, unrecorded) | +16 n / +£2,909.76 (unchanged) | - |

\* P20's base was cut twice; not a clean control.
- Per raised flat: P01 +3 / +£720.90; P05 +6 / +£1,953.04; P06 +6 / +£1,345.77; P09 +2 / +£253.21; **P11 -11 / -£2,355.27**; **P12 +4 / +£227.79** (was +5 / +£622.44).
- **Reading:** first fall since the method was corrected, all from one P12 cancellation. Nights and £ per day fell by a similar share in both groups. The new P12 booking sold under Reyhan's -15%, so it is not clean evidence. **Hold the bases.**

### Per property
| Ref | Change since 4 Nov |
|---|---|
| P01 | LISTING_NO_DATA; last push 4 Nov 05:46:57Z. No open nights to handback. New Airbnb review: 4.75 (4). |
| P02 / P03 / P07 | Intentional blocks; pushed normally overnight. P02 Vrbo copy last pushed 24 Feb. |
| P04 | No booking. **1455 still sells 5-10 Nov (day 6).** Prices fell again with no edit: 9-13 Nov **£715** (was £758); 20 Nov £155 (was £182; 0-15-day band). Reyhan -15% vs your -8% unchanged. Weekly 18.0%. Fwd30 56.7% vs 23%. One comp replaced. |
| P05 | No booking. 9 Nov Airbnb £253.44 vs Smoobu £1,403 (6th check). 29 Dec £1,322 (default £1,063, P90 £1,075). 7-8 Dec £935, 13-21 Dec £5,299 (P75 £1,174 / £5,818). Reyhan 13-19 Dec -7% unchanged. 12% early bird still visible. |
| P06 | **9 Nov £2, 8 Nov £200 in Smoobu** (10-11 Nov £241/£255). LISTING_NO_DATA since the 12:52:54Z push. Reyhan's 15-22 Nov price-less "fixed" DSO min 2 (12:52:23Z); 15-22 Nov stays unavailable. Airbnb on 4 Nov rates. |
| P08 | **5-7 Nov £159 / £175 / £175 = £509** (was £539); P0, -49% vs the one comp (£408). Reyhan -5% unchanged. Handback 13 Nov. |
| P09 | **LISTING_NO_DATA; no push since 4 Nov 07:27:40Z (past 24 h).** 10-12 Nov frozen at £113/£122/£129, P0. -5% DSO still set. 25 Apr 2027 open at £458 after the handback block (question, below). |
| P10 | LISTING_NO_DATA; no open nights to the 18 Nov handback. |
| P11 | No booking. 23 Dec £294, 3 Jan £190. Darts 13-17 Dec £1,098 (avg £219.60). Comps sold out on 10-14 / 18-20 Nov (demand signal). Fwd30 46.7% vs 45%. |
| P12 | 3-7 Dec cancelled; 4-7 Dec booked (net -1 n / -£394.65). 4 Nov lapsed. 3 Dec £253 min 2 (not orphan). 30 Nov-2 Dec +£29-30 overnight (algorithm). 26 Nov £316 (£367 all-in, P100 +29.2%). Pace30 -16.6%. |
| P13 | No booking, no edit. 3064856 12 Nov £168 min 2. Christmas 3064856 £4,211, 25-26 Dec still unsellable (min 3). Twins differ on every date checked, January included (£175 vs £165 on 4 Jan). |
| P14 | Numbers only: 30 of 30 open nights at £500; 0% vs 43%. |
| P15-P19 | Not connected (t-unmapped). |
| P20 | No booking, no edit. 20 Nov £238 (was £300, band effect). 6-9 Nov £842 (P0, -34%), 13-15 Nov P14 (-23%). December `recommend` fix-listing. 18-20 Nov block; 20-22 Nov block cancelled 30 Oct. One comp replaced. |

### Reyhan's edits vs your decisions (for you to confirm, not new proposals)
| # | Ref / dates | Your decision | Now (live, 5 Nov) | Status |
|---|---|---|---|---|
| a | P12 17 Nov | keep +50% (deprioritised) | -15%, min 2, £219 (uncust £276) | Unchanged |
| b | P11 darts 13-17 Dec | "above £300"; keep +5% | -5%: £1,098, avg £219.60 | Unchanged; comps P12, -46% |
| b2 | P11 10 Nov-18 Dec | standing direction: cut PriceLabs discounts | -5% | Unchanged; `recommend` +5% |
| c | P13 8-12 Nov | 0% (24 Oct) | -7%, min 2; 3064856 £815 | Unchanged; comp-west: evidence supports 0% |
| d | P20 base | 350 | 330 / 200 | Unchanged |
| d2 | P20 16-19 Nov | min 3 to 30 Nov | -5%, **min 2** (Smoobu 16-17 Nov min 2) | Unchanged |
| e | P04 9-24 Nov | -8% on 1-25 Nov, min 3 | **-15%**, min 3; 9-13 Nov £715 | Unchanged; prices still falling |
| f | Jan-Feb min stays (P04, P05, P13, P20 min 3/4; P11 min 3) | the audit's 5-night rule at 2+ months is **not in `policy.json`**: please confirm | min 3-4 | Unchanged |
| g | P13 base 250 | not in policy | 250 | Record it |

**New edit:** P06 15-22 Nov "fixed" DSO with no price, min 2 (4 Nov 12:52:23Z). Not a policy conflict (nights stay blocked), but it is the last write before the £2 and the data failure: ask Reyhan what was intended.
**Plan reversals, unchanged:** P08 -5% (plan +10%), P06 8-14 Nov -5%, P05 13-19 Dec -7%, P13 21-26 Dec -5%, P20 21-26 Dec -5%.

### Open plan items: status today
| Item | Status 5 Nov (evidence) |
|---|---|
| t-p04-doublebook | **Not fixed, day 6** (channel §1; comp-east) |
| a-airbnb-rules | **Not fixed, day 7** (channel §3) |
| t-p12-4nov-price | **Closed: lapsed unsold** (£302 asked, no reservation) |
| t-pl-price-divergence | **Closed: explained** as a one-cycle lag (96/108 nights; pricelabs H4) |
| t-push-check | **Dropped: superseded by t-pl-nodata** (P09 no push today) |
| a-p13-twin | **Closed:** twins differ on every date, January included; no override needed |
| a-p04-dec | **Dropped:** comp-east supports hold after comp replacement |
| a-p05-9nov | Not fixed, 6th check |
| a-discount-cut | Not done; £2,285 / £1,041 |
| a-p13-record | Not done; one new edit (P06) |
| a-raise-1012nov, a-peak-check, a-p05-dec, a-p20-conversion, a-handback-lastnights | Not done; no edit on any of them |
| t-p20-delivery | Evidence: 20-22 Nov block cancelled 30 Oct 18:11; 18-20 Nov block created 3 Nov. Confirm the move |
| t-p04-weekly, a-p05-earlybird, t-channel-gaps, t-p12-26nov-price, a-p13-orphan-price | Unchanged |
| Others (a-amenities, a-deposit, a-extra-guest, a-p04-monthly, a-tidy, a-titles, t-comps, t-p02-vrbo, t-p05-0609, t-p05-calendar, t-p13-commission, t-unmapped, a-bcom-cancel) | Unchanged; see JSON |

## Actions - 2026-11-05

**Ranking:** critical channel-safety and data rows first, then expected £, then rows that cannot be quantified.

**Expected effect** = price move in £ on open nights x the flat's booked share from Smoobu (occupancy.md; kpi_pack forward_occ is PriceLabs-based and P01/P06/P09/P10 have none): next 30 P04 0.567, P05 0.767, P06 0.60 (ex-blocks), P08 0.667, P09 0.864, P11 0.467, P12 0.633, P13 0.733, P20 0.50; next 60 P05 0.683, P11 0.483, P13 0.517. Upper bounds; elasticity is not measured.

**Bounds** (`listings.csv`): P04 £90-2,000; P05 £150-2,500; P06 £200-800; P08 £150-1,000; P09 £100-550; P11 £120-1,200; P12 £100-2,000; P13 £110-2,000; P20 £200-1,800. **P06 9 Nov at £2 is outside its £200 minimum.** Every proposed price is inside the bounds.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P06 | **NEW t-p06-2pound (critical, now).** In Smoobu set **9 Nov to £233 and 8 Nov to £228** (the last good PriceLabs = Smoobu values, 4 Nov) or **close 8-9 Nov** until the cause is found. Then check the **Booking.com extranet** for P06 8-11 Nov (is £2.30 bookable? any booking?) and the Smoobu -> Airbnb sync for P06 before it resumes. Ask Reyhan what the 15-22 Nov price-less DSO was for. | Smoobu > Rates > Marylebone 3288517; Booking.com extranet > Marylebone > Calendar; Smoobu > Channel Manager > Airbnb | pricelabs C1; channel §4; comp-central: Smoobu 07:13:45Z and 07:20:47Z 8 Nov £200 / **9 Nov £2** / £241 / £255, min 2, available; 4 Nov £228 / £233. Override on 9 Nov = -5% only. Last P06 push 4 Nov 12:52:54Z, 31 s after the 15-22 Nov DSO. Airbnb cards = 0.765 x 4 Nov rates. Booking.com NOT CHECKED | Protects **£259** on an 8-10 Nov stay (£461 - £202); whole 8-12 Nov run -£218 | Corentin | 2026-11-05 |
| 2 | P04 | **t-p04-doublebook (critical, day 6).** On 1455876748739910219 **block 5-10 Nov now**, then every open night (9-13 Nov, 18-24 Nov, December) or snooze the listing; then map 1455 to Smoobu 3562176 (keeps 4.69 (26)) or unlist it. | Airbnb host 551951609 > 1455876748739910219 > Calendar; Smoobu > Channel Manager > Airbnb | channel §1 07:15:37-07:15:44Z: 5-8 Nov and 6-9 Nov £514.20 bookable; comp-east: also 5-9 Nov £647, 6-10 Nov £648. Smoobu: Booking.com 161785771 in residence to 6 Nov (£393.18), Airbnb 161888271 6-9 Nov (£355.72) | Protects **£748.90**; relocation cost not quantified | Corentin | 2026-11-05 |
| 3 | P01 P06 P09 P10 | **NEW t-pl-nodata (critical).** Open each listing in PriceLabs; press **Sync Now**; if the calendar is still empty, raise LISTING_NO_DATA with PriceLabs support quoting 3320302, 3288517, 3318172, 3318177 and `last_refreshed_at` null since 4 Nov. Until P09 pushes, any P09 price change must be made in Smoobu. | PriceLabs > each listing > Calendar / Sync Now; PriceLabs support | pricelabs C2: `get_listings` and `get_listing_data` still return all four, push on, not hidden, no removal/unlink log 6 Oct-5 Nov; `get_listing_prices` LISTING_NO_DATA on 3+ calls. Last pushes P06 4 Nov 12:52:54Z, P09 07:27:40Z, P10 05:54:26Z, P01 05:46:57Z. P09 re-read 07:28:33Z: no push (past 24 h) | Not quantified (P09's 3 nights are £364 room; P01/P10 nothing for sale) | Corentin | 2026-11-06 |
| 4 | P20 P12 P13 P05 P06 P08 P04 | **a-airbnb-rules (critical, day 7).** Remove the hidden <=28-day rule (0.765) and the 31-59-day rule (0.900) on every apartment and any global rule; keep only visible discounts (policy `airbnb_visible_discounts`). | Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules | channel §3: 25 live searches 07:15-07:17Z; 0.765 at <=28 d, 0.900 at 31-34 d, 1.000 at 60 d; P08 same-day 0.850. P20 0.765 at 15 days, outside its 0-14-day policy discount | Layer-only loss carried **£693.57**; forward 23.5% of every Airbnb night sold <=28 days out, not quantified | Corentin | 2026-11-06 |
| 5 | P04 P05 P11 P12 P20 | **a-discount-cut.** Set Last-minute, Occupancy and Booking Recency to **Custom 0%** (not "off"). Live: P04 -5% last-minute, Aggressive occupancy (0-15 d band -30% to 0%), Recency default; P09 -18% last-minute; Aggressive occupancy on P05, P11, P20, P13. | PriceLabs > listing > Customizations | pricelabs H3, next 30: P04 £825 (widened), P12 £654, P11 £428, P05 £332, P20 £326; P13 -£255 and P08 -£25 offset. **£2,285 next 30 / £1,041 next 14.** market §3: 20 Nov P04 £182 -> £155 and P20 £300 -> £238 from the 15-day band | Upper bound **about £1,296 / 30 days** = 825x0.567 + 654x0.633 + 428x0.467 + 332x0.767 + 326x0.50 - 255x0.733 - 25x0.667. Overlaps row 7 | Corentin | 2026-11-07 |
| 6 | P05 | **a-p05-dec.** DSO **7-8 Dec to about £1,174 for the two nights** (P75) and **13-21 Dec to about £5,818** (P75). The 13-19 Dec -7% is Reyhan's plan reversal: your call. | PriceLabs 3166592 > DSO | market §2: 7-8 Dec £935 vs P75 £1,174 (occ +12.3 / +5.8 vs STLY); 13-21 Dec £5,299 vs P75 £5,818 (occ +1.7 to +8.5 on all 9). comp-central: P25 at -34% to -41%; `recommend` +25%; **capped at P75** because 3 comps are under 4.3 | (£239 + £519) x 0.683 = **£518** | Corentin | 2026-11-07 |
| 7 | P04 P12 P11 P13 P20 | **a-p13-record: confirm or restore your settings** (table a-g) and the five plan reversals; record P13 base 250. Not new proposals. | PriceLabs 3562176 DSO 9-24 Nov; 2699998 DSO 17 Nov; 3064196 DSO 10 Nov-18 Dec; 3064856 (+children) DSO 8-12 Nov; 3547481 Base and 16-19 Nov min; then `policy.json` | pricelabs H2; comp-east (P04 -16% to -32%); comp-west (P13 supports 0%); comp-central (P11 P0-P14) | **Up to about £497/month:** P04 £1,874 x (0.92/0.85-1) x 0.567 = £88; P12 17 Nov (£276x1.5 - £219) x 0.633 = £123; P11 darts £1,098 x (1.05/0.95-1) x 0.483 = £56; P11 rest £3,428 x (1/0.95-1) x 0.467 = £84; P20 base £3,346 x (350/330-1) x 0.50 = £101; P13 £815 x (1/0.93-1) x 0.733 = £45. Overlaps row 5 | Corentin | 2026-11-06 |
| 8 | P05 | **a-p05-9nov (6th check).** Clear the Airbnb 9 Nov custom price and Special offer; check the sync log. To sell the night, replace +300% with **0%, min 1** (uncustomized £369). | Airbnb > 1618929775762183214 > Calendar 9 Nov; PriceLabs 3166592 > DSO 9 Nov | channel §3: £316.80 - 20% Special offer = **£253.44** room, unchanged since 31 Oct, vs Smoobu £1,403; 29 Dec control flows through (comp-central) | Upper bound £369 x 0.767 = **£283**; avoids -£1,149.56 if it sells as is | Corentin | 2026-11-06 |
| 9 | P13 | **a-peak-check.** 3064856 and 3090701 7-26 Dec: **-5% -> +5%**; **min 2 on 25-26 Dec**. P05 29 Dec: **+100% -> 0%, min 1** (about £1,063). | PriceLabs 3064856 / 3090701 / 3166592 > DSO | market §2: 3064856 £4,211 vs P50 £4,931, occ +5.5 to +24.9 on all 20 nights. comp-west: 23-26 Dec P14/P5 of 21, `recommend` +10%; 25-26 Dec unsellable (min 3 into booked 27 Dec). P05 29 Dec £1,322 vs P90 £1,075 | P13 +£421 x 0.517 = **£218**; unlock and P05 cut not quantified | Corentin | 2026-11-07 |
| 10 | P06 | **t-p06-open (question, after row 1).** If 8-11 Nov should sell, `recommend` says **+10%** (about £1,052 on the 4 Nov £956 basis), replacing Reyhan's -5%. | PriceLabs 3288517 > DSO 8-11 Nov (only once data returns), else Smoobu rates | comp-central: Airbnb P0, -14% to -25% vs median; `recommend(0.60, 0.47, 0.0, -0.008)` = +10%; 3 of 4 comps sold out on 8-12 Nov | £96 x 0.60 = **£57** | Corentin | 2026-11-06 |
| 11 | P08 P09 | **a-handback-lastnights.** P08 6-7 Nov: DSO -5% -> **+5%** (about +10%: £175 -> about £193 each). P09 10-12 Nov: **+10%** (£113/£122/£129 -> **£124 / £134 / £142**) - set directly in Smoobu while P09 has no PriceLabs data. | PriceLabs 3318167 > DSO 6-7 Nov; Smoobu > Rates > Torrent Lodge 3318172 | comp-central: P08 P0 -49% (n=1), `recommend` +10%. comp-east: P09 P0 on all three stays (-5.5% to -26.6%), qp 0, `recommend` +10%. P09 C2: PriceLabs edits will not push | £35 x 0.667 + £36 x 0.864 = **£54** | Corentin | 2026-11-05 |
| 12 | P04 | **t-p04-weekly.** Synced Barking Airbnb weekly discount **18% -> 15%** (policy). | Airbnb host 660820693 > 1657859794156786222 > Pricing > Discounts | channel §8: £395.27 on £2,196 room (6-19 Dec) = 18.0% | **£65.88** per 6-19 Dec stay | Corentin | 2026-11-07 |
| 13 | P20 | **a-p20-conversion.** **+10% on 13-15 Nov** (£679 -> about £747; DSO -5% -> +5%; supersedes your 24 Oct -5%: your call). **6-9 Nov part dropped** (arrival tomorrow, market -10 to -16 pts vs STLY, PL already at P50). Remove Reyhan's 21-26 Dec -5%. Parking first photo; review requests. | PriceLabs 3547481 > DSO 13-15 Nov, 21-26 Dec; Airbnb 1791529331262420081 | comp-west: 13-16 Nov P14, -23%; supported about £240 all-in. December -14% to -18%, `recommend` fix-listing (not price) | £68 x 0.50 = **£34**; 21-26 Dec not quantified | Corentin | 2026-11-06 |
| 14 | P11 | **t-channel-gaps.** **23 Dec >= £317, 3 Jan >= £204.** Booking.com visibility (CTR 0.81% vs 1.70%). | PriceLabs 3064196 (+Vrbo) > DSO 23 Dec, 3 Jan | market §4: £294 vs fortnight £317; £190 vs £204 (occ +5.2) | (£23 + £14) x 0.483 = **£18** | Corentin | 2026-11-07 |
| 15 | P13 | **a-raise-1012nov.** 3064856 **12 Nov £176, min 1**; keep 3090701 >= £183 (now £189). | PriceLabs 3064856 > DSO 12 Nov | market §2: £168 vs P25 £177 / P50 £210 (occ -10.5 vs STLY, weaker); comp-west evidence level £179 | £8 x 0.733 = **£6**; min-1 unlock not quantified | Corentin | 2026-11-06 |
| 16 | P20 | **t-p20-delivery (confirm).** Smoobu: 20-22 Nov "Blocked channel" 160937106 **cancelled 30 Oct 18:11**; 18-20 Nov block 162432556 created 3 Nov 10:31. If delivery moved to 18-20 Nov, update `policy.json`; if not, re-block 20-22 Nov. | Smoobu > Calendar P20; `policy.json` | channel §8; comp-west. 20-23 Nov open (£238/£293/£279, min 3) and sold on Airbnb (£769.64 card) | Not quantified | Corentin | 2026-11-06 |
| 17 | P12 | **t-p12-26nov-price.** DSO 26 Nov **+15% -> -15%** (matching the nights either side), keep **min 1**. | PriceLabs 2699998 > DSO 26 Nov | comp-east: £367 all-in, **P100, +29.2%** vs 198 / 284 / 297 (n=3); supported -15% to 0% vs the 1-night median = £241-284 all-in. **Override of `recommend`** (+10% at flat level): a single orphan at P100 | Not quantified | Corentin | 2026-11-07 |
| 18 | P11 P12 | **NEW t-cleaning-commission (question).** Booking.com commissions the cleaning fee: P12 15% x £150 = **£22.50**, P11 18% x £149 = **£26.82** per booking. Accept, or ask Booking.com / move cleaning outside the commissionable base? | Booking.com extranet > Finance / Property > Fees | channel §2 (P12 £124.17 = 15% x £827.79; £183.37 = 15% x £1,222.44); 4 Nov report (P11) | £22.50-£26.82 per booking; forward not quantified | Corentin | 2026-11-09 |
| 19 | P05 | **a-p05-earlybird.** Confirm the visible 12% early-booking discount (60+ d) is yours. | Smoobu > Channel Manager > Airbnb > Abbey Rd > Early bird | channel §3: 4-7 Jan -£152.52 (12.0%); policy records an early bird for P13 only | £152.52 per such stay | Corentin | 2026-11-07 |

## Top 5 for today
1. **P06 Marylebone 9 Nov is on sale at £2 (8 Nov £200) in Smoobu.** Set £233 / £228 or close 8-9 Nov now, and check the Booking.com extranet (NOT CHECKED; about £2.30 there). Airbnb is still on 4 Nov rates only because its P06 sync is stale.
2. **PriceLabs LISTING_NO_DATA on P01, P06, P09, P10** since 4 Nov (still listed, push on, no removal log). Sync Now, then PriceLabs support. P09 is past 24 h with no push; its handback nights 10-12 Nov are frozen at £113/£122/£129 (P0): raise them +10% in Smoobu.
3. **Barking day 6:** block 5-10 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 of confirmed stays double-sellable, guest in residence tonight); then map or unlist.
4. **Airbnb and PriceLabs discounts:** remove the hidden Smoobu 0.765 / 0.900 rules (day 7); clear P05 9 Nov (£253.44 vs £1,403, sixth check); set PriceLabs layers to Custom 0% (gap £2,285 next 30 / £1,041 next 14; P04 widened).
5. **Your decisions:** Reyhan's conflicts unchanged (up to about £497/month); P20 delivery moved to 18-20 Nov?; commission on cleaning (£22.50-£26.82/booking). Raises still open: P05 December to P75 (£518), P13 Christmas +10% with min 2 on 25-26 Dec (£218).

## Growth plays

- **Airbnb net rate (Airbnb room / Smoobu rate).** Today 0.765x (<=28 d), 0.900x (31-34 d), 1.000x (60 d), 0.850x same-day. Target **1.00x before visible discounts by 2026-11-10** (row 4).
- **Booking.com since the 24 Oct markup cut** (channel §5): 12 confirmed, 49 n, £8,017.79 at **0.775x** PriceLabs; gross 16 / 62 n / £11,049.72 (0.803x); net +24 n / +£2,966.42. Pace 1.03 confirmed bookings a day (1.1 yesterday). Promotions stay; the lever is the PriceLabs price under them. KPI: at least 1.0 a day by 2026-11-15.
- **Net to owner per £100 PriceLabs:** Booking.com as sold £63-72 (P12 4-7 Dec £71.99), Airbnb <=28 d £64.64, vs models £97.75 / £84.50 (channel §6). Direct (£90 model) is not cheapest against observed OTA prices.
- **Review score** (Airbnb, ours vs comp median; comp sections): P12 4.27 vs 4.86; P13 4.67 / 4.31 vs 4.78; P08 4.50 (4) vs 4.87; P06 4.64 vs 4.66; P04 synced 4.11 (9) vs 4.85 (unsynced 4.69 (26)); P05 4.77 vs 4.27; P09 5.0 (3) vs 4.58; P01 4.75 (4) vs 4.71; P20 none vs 4.8 (17.5). Booking.com (policy): P11 8.0, P12 9.1, P13 8.4. The gap caps P12, P04 synced and the P13 4.31 twin at -15%.
  - Fixes: P12 arrival message on key collection (process fixed by policy); P13 4.31 twin cleanliness and photo accuracy; P20 and P09 review requests; Barking mapping 1455 keeps 26 reviews.
  - Target: P12 and the P13 4.31 twin at 4.5 by 2027-01-31.
- **Listing conversion.** P20: 0 reviews; `recommend` is **fix-listing** on every December stay (60-day lead -7 pts). P11: Booking.com CTR 0.81% vs 1.70%; comps sold out on our open 10-14 / 18-20 Nov dates while we sit at P0-P14. P06: no lift (5 of 12 comps have one).
- **Gap fill / length of stay.** No open run is shorter than its minimum (occupancy). Runs at exactly the minimum: P12 12-13 Nov and 26 Nov; P11 18-19 Nov (P0, -47%); P13 17 / 27 Nov; P05 9 Nov and 16-17 Nov. P13 25-26 Dec still unsellable (row 9). Mid-term (91+ nights): NOT CHECKED today.
- **Direct share.** 1.47% of room revenue (12 months to 2 Nov; not re-run). Target 5% by 2027-06-30.
- **Event compression** (market §4): **24 n / £310** excluding darts R1 (4 Nov 21 / £281); full **29 n / £607**. New: Jingle Bell Ball 5-6 Dec (P20 6 Dec £251 vs £275; P04 £185 vs £192) and 20 Nov (band effect). Market clearly ahead of STLY only on P13 Christmas, P05 December and P11 3 Jan; the P04 November gaps sit in a market 2-12 pts below STLY and are not proposed.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 units) | **67.9%** (67.4% yesterday) | at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£170.36** (£170.10) | £190 | 2026-12-18 |
| RevPAR, last 30 | **£115.75** (£114.71) | £129 | 2026-12-18 |
| Revenue, last 30 | **£45,144.33** (£44,737.32) | - | - |
| Booked next 30 (Smoobu) | **62.2%** (179/288) | each unit at least market + 10 pts (below: P11 46.7% vs 45%) | 2026-11-10 |
| Booked next 60 | **50.0%** (240/480) | at least market + 10 pts (P20 24.1% vs 30%) | 2026-11-17 |
| 7-day pickup, net | gross 8 bk / 22 n / £5,038.89; **net +12 n / +£2,907.95** | at least 10 bookings a week, net positive | 2026-11-10 |
| P12 pace30 vs STLY | **-16.6%** (-7 n / -£668.97) | 0% | 2026-11-30 |
| 18 Oct raised flats, net since rise | **+10 n / +£2,145.44** (corrected) | positive and rising | 2026-11-09 |
| Booking.com paid / PriceLabs (since cut) | **0.775x** (12 confirmed) | median at least 0.80x | 2026-11-15 |
| Airbnb room / Smoobu rate | **0.765x / 0.900x / 1.000x**, day 7 | 1.00x before visible discounts | 2026-11-10 |
| PriceLabs-side gap | **£2,285 next 30; £1,041 next 14** | £0 apart from your own overrides | 2026-11-07 |
| Listings with no PriceLabs data | **4** (P01, P06, P09, P10) | 0 | 2026-11-06 |
| Mispriced open nights (below PL min) | **1** (P06 9 Nov £2) | 0 | 2026-11-05 |
| Double-sellable Barking stays | **2 stays / £748.90** (day 6) | 0 | 2026-11-05 |
| Missed compression | **24 n / £310** excl. darts R1; full 29 n / £607 | under 10 nights | 2026-11-10 |
| RGI | **UNKNOWN** (no comp occupancy) | above 1.10 on every property | data by 2026-11-10; target 2027-03-31 |
| Rating (Airbnb, 9+ reviews) | 4.11-4.77; comp medians 4.27-4.87 | 4.8 / Booking.com 9.3, then top decile | 2027-01-31 |
| Direct share | **1.47%** (not re-run) | 5% | 2027-06-30 |
| Search placement (Booking.com, 24 Oct, policy) | P12 1/937, P13 23/69, P20 49/103, P11 91/313 | page 1 on area search | 2026-11-30 |

## Data gaps (get the data)
1. **PriceLabs prices for P01, P06, P09, P10:** LISTING_NO_DATA; cause UNKNOWN. Source: PriceLabs listing calendar / Sync Now / support (row 3).
2. **Cause of P06 £2 / £200:** Smoobu has no rate history over the API. Source: Smoobu > Marylebone > Rates change log; PriceLabs > 3288517 > Sync history for 4 Nov 12:52:54Z.
3. **Booking.com displayed prices, P06 exposure, comps and rank:** NOT CHECKED (AWS WAF 07:18:03Z; not bypassed). Source: extranet screenshots.
4. **Listing 1455's own reservations:** NOT CHECKED (not in Smoobu). Source: Airbnb host 551951609 > Reservations.
5. **Smoobu Airbnb rule settings** still not read; layers inferred from cards. Source: Smoobu > Channel Manager > Airbnb > Default pricing rules.
6. **P12 4-7 Dec:** whether the same guest rebooked, and any fee kept on 161902221: NOT CHECKED (no guest data). Source: Booking.com extranet > reservation 5178123645.
7. **P12 30 Nov-2 Dec +£29-30 overnight:** cause NOT CHECKED. Source: PriceLabs 2699998 > price breakdown.
8. **P09 25 Apr 2027 open at £458, min 5**, after the handback block (27 Nov-23 Apr): should the block extend? Question only (nights after handback are not inventory).
9. **RGI** needs comp occupancy (PriceLabs Competitor Listings / Market Dashboard). Pace is UNKNOWN except P12 (no STLY history).
10. **Min-stay rule for 2+ months (5 nights):** used by the audit, not in `policy.json`. P04 recommended base "Unavailable". P15-P19 need the second-account keys. Vrbo +8% / Direct -10% unconfirmed. Vrbo copies stale: P11 4 Nov 01:37Z, P13 4 Nov 01:49Z, P02 24 Feb.

```json
{"scoreboard":{"note":"5 Nov 2026. Last 30 nights = 6 Oct-4 Nov, 13 Smoobu units (kpi_pack portfolio_last30, exact). Forward figures handback-aware, Smoobu confirmed stays as truth (occupancy.md). Pickup = bookings made 30 Oct-5 Nov, net of cancellations. Base-rise net on the corrected method only. Booking.com since the 24 Oct markup cut (channel.md §5). Airbnb ratios from 25 live searches 07:15-07:17Z (channel.md §3). PriceLabs gap from pricelabs.md H3, excluding P01/P06/P09/P10 (no data) and P14. Direct share carried (not re-run). RGI unknown: no comp occupancy.","items":[{"label":"Occupancy last 30","value":"67.9%"},{"label":"ADR last 30","value":"£170.36"},{"label":"RevPAR last 30","value":"£115.75"},{"label":"Revenue last 30","value":"£45,144.33"},{"label":"Booked next 30","value":"62.2% (179/288); like-for-like 61.9% vs 62.3% yesterday"},{"label":"Booked next 60","value":"50.0% (240/480)"},{"label":"7-day pickup","value":"gross 8 bk / 22 n / £5,038.89; net +12 n / +£2,907.95"},{"label":"P12 pace30 vs STLY","value":"-16.6% (-7 n / -£668.97)"},{"label":"Raised flats net since 18 Oct","value":"+10 n / +£2,145.44 (corrected; was +11 n / +£2,540.09)"},{"label":"Booking.com since markup cut","value":"12 confirmed, 49 n, £8,017.79; 0.775x PriceLabs; net +24 n / +£2,966.42"},{"label":"Airbnb displayed / Smoobu","value":"0.765x at <=28 d; 0.900x at 31-34 d; 1.000x at 60 d; 0.850x same-day (day 7)"},{"label":"PriceLabs-side gap","value":"£2,285 next 30; £1,041 next 14"},{"label":"Listings with no PriceLabs data","value":"4 (P01, P06, P09, P10)"},{"label":"Mispriced open nights","value":"P06 9 Nov £2 (8 Nov £200)"},{"label":"Double-sellable Barking stays","value":"2 stays / £748.90 (day 6)"},{"label":"Missed compression","value":"24 n / £310 excl. darts R1; full 29 n / £607"},{"label":"Direct share","value":"1.47% (not re-run)"},{"label":"RGI","value":"UNKNOWN"}]},
"actions":[
{"id":"t-p06-2pound","status":"open","prop":"P06","priority":"critical","title":"New: Marylebone 9 Nov on sale in Smoobu at £2 (min 2), 8 Nov £200 (were £233/£228); likely the 4 Nov 12:52:54Z PriceLabs push, cause unknown; set £233/£228 or close 8-9 Nov now; check Booking.com extranet (NOT CHECKED); Airbnb not showing it (P06 sync stale since 4 Nov)","gbp":259},
{"id":"t-p04-doublebook","status":"open","prop":"P04","priority":"critical","title":"Not fixed (day 6): unsynced Barking Airbnb 1455876748739910219 sells 5-8, 6-9, 5-9, 6-10 Nov over the in-house guest (last night 5 Nov) and the 6-9 Nov Airbnb stay (£748.90); block 5-10 Nov now, then all open nights; map to 3562176 or unlist","gbp":748.90},
{"id":"t-pl-nodata","status":"open","prop":"P01 P06 P09 P10","priority":"critical","title":"New: PriceLabs LISTING_NO_DATA on P01/P06/P09/P10 since 4 Nov: still listed, push on, no removal log, last_refreshed_at null, no push (P09 past 24 h); data failure: Sync Now, then PriceLabs support; P09 10-12 Nov frozen at £113/£122/£129 (P0)","gbp":null},
{"id":"a-airbnb-rules","status":"open","prop":"P20 P12 P13 P05 P06 P08 P04","priority":"critical","title":"Day 7, unchanged: remove hidden Smoobu Airbnb layers 0.765 (<=28 d) / 0.900 (31-34 d); P08 same-day 0.850; P20 0.765 at 15 d outside its 0-14 d policy discount; layer-only loss £693.57","gbp":693.57},
{"id":"a-discount-cut","status":"open","prop":"P04 P05 P11 P12 P20","priority":"high","title":"Not done: gap £2,285 next 30 / £1,041 next 14 (P04 widened to £825 with no edit; 20 Nov P04 £182->£155, P20 £300->£238 from the 0-15 d band); set Last-minute, Occupancy, Booking Recency to Custom 0%","gbp":1296},
{"id":"a-p05-dec","status":"open","prop":"P05","priority":"medium","title":"Not done: 7-8 Dec £935 -> about £1,174 (P75) and 13-21 Dec £5,299 -> about £5,818 (P75); Reyhan's 13-19 Dec -7% unchanged (your call)","gbp":518},
{"id":"a-p13-record","status":"open","prop":"P04 P12 P11 P13 P20","priority":"high","title":"Unchanged, for Corentin to confirm: P04 9-24 Nov -15% vs -8%; P13 8-12 Nov -7% vs 0%; P12 17 Nov -15%; P20 16-19 Nov min 2 vs 3; P20 base 330 vs 350; P11 darts -5% (£1,098); Jan-Feb min 3-4. Plan reversals unchanged. New: P06 15-22 Nov price-less fixed DSO min 2 (4 Nov 12:52:23Z). Record P13 base 250","gbp":497},
{"id":"a-p05-9nov","status":"open","prop":"P05","priority":"high","title":"Not fixed (6th check): Airbnb sells 9 Nov at £253.44 room (20% Special offer on £316.80) vs Smoobu £1,403: clear the Airbnb date; to sell, DSO 0% min 1 (uncust £369)","gbp":283},
{"id":"a-peak-check","status":"open","prop":"P13 P05","priority":"high","title":"Not done: P13 7-26 Dec -5% -> +5% on both listings (+£421 on £4,211; P50 £4,931), min 2 on 25-26 Dec; P05 29 Dec +100% (£1,322 vs P90 £1,075) to 0% min 1","gbp":218},
{"id":"t-p04-weekly","status":"open","prop":"P04","priority":"medium","title":"Synced Barking Airbnb weekly discount still 18.0% vs policy 15% (£65.88 on 6-19 Dec)","gbp":65.88},
{"id":"t-p06-open","status":"open","prop":"P06","priority":"medium","title":"After t-p06-2pound: is 8-11 Nov meant to sell? If yes, recommend +10% (about £1,052 on the 4 Nov £956 basis) replacing Reyhan's -5%; Airbnb P0 -14% to -25%","gbp":57},
{"id":"a-handback-lastnights","status":"open","prop":"P08 P09","priority":"medium","title":"Not done: P08 5-7 Nov fell to £509 (P0 -49%): 6-7 Nov +10% (~£193 each); P09 10-12 Nov £113/£122/£129 (P0): +10% to £124/£134/£142 set in Smoobu (no PriceLabs data)","gbp":54},
{"id":"a-p20-conversion","status":"open","prop":"P20","priority":"medium","title":"Waterford: +10% on 13-15 Nov (P14, -23%; your 24 Oct -5% there: your call); 6-9 Nov part dropped (arrives tomorrow, market soft, PL at P50); remove Reyhan's 21-26 Dec -5%; December recommend fix-listing (0 reviews)","gbp":34},
{"id":"t-channel-gaps","status":"open","prop":"P11","priority":"medium","title":"Camden: 23 Dec £294 -> >= £317, 3 Jan £190 -> >= £204; fix Booking.com visibility (CTR 0.81% vs 1.70%)","gbp":18},
{"id":"a-raise-1012nov","status":"open","prop":"P13","priority":"medium","title":"Not done: 3064856 12 Nov £168 min 2 (England v Croatia); set £176 min 1; 3090701 £189 (>= £183 met)","gbp":6},
{"id":"t-p20-delivery","status":"open","prop":"P20","priority":"high","title":"Confirm: Smoobu 20-22 Nov delivery block cancelled 30 Oct 18:11, new 18-20 Nov block created 3 Nov 10:31; 20-23 Nov open and selling on Airbnb (£769.64): update policy if delivery moved","gbp":null},
{"id":"t-p12-26nov-price","status":"open","prop":"P12","priority":"medium","title":"Not fixed: Mile End 26 Nov +15% (£316; £367 all-in, P100 +29.2% vs 1-night comps); set -15% (matching neighbours), keep min 1","gbp":null},
{"id":"t-cleaning-commission","status":"open","prop":"P11 P12","priority":"medium","title":"New question: Booking.com commissions the cleaning fee (P12 15% x £150 = £22.50; P11 18% x £149 = £26.82 per booking): accept or challenge?","gbp":null},
{"id":"a-p05-earlybird","status":"open","prop":"P05","priority":"medium","title":"St John's Wood visible 12% early bird (60+ d) still on cards (£152.52 on 4-7 Jan): not in policy - yours?","gbp":152.52},
{"id":"t-p12-4nov-price","status":"done","prop":"P12","priority":"high","title":"Closed: Mile End 4 Nov lapsed unsold at £302 (no reservation covers 4 Nov)","gbp":null},
{"id":"t-pl-price-divergence","status":"done","prop":"P12 P13 P20 P11","priority":"medium","title":"Closed as explained: user_price (Your Price) = previous cycle's pushed price on 96 of 108 nights; Smoobu follows price. Observations kept: P20 20 Nov 238 vs 300 (0-15 d band), P12 30 Nov-2 Dec +13-14% / 13 Nov +18% (overnight rise, cause not checked)","gbp":null},
{"id":"t-push-check","status":"dropped","prop":"P09","priority":"high","title":"Superseded by t-pl-nodata: P09 has no PriceLabs data and did not push today (last 4 Nov 07:27:40Z)","gbp":null},
{"id":"a-p13-twin","status":"done","prop":"P13","priority":"medium","title":"Closed: twins differ on every date checked, January included (4 Jan £175 vs £165; Dec 4-6%; Nov 12%)","gbp":null},
{"id":"a-p04-dec","status":"dropped","prop":"P04","priority":"medium","title":"Dropped: after the comp replacement Barking December stays sit -11.3% to +3.5% vs median, above the -15% quality line; hold supported (comp-east). Market P75 gap +£149 noted","gbp":null},
{"id":"a-p13-orphan-price","status":"open","prop":"P13","priority":"medium","title":"Unchanged: 27 Nov 3064856 £333 (+40% vs P50, above P75) at +50%; 17 Nov +35%: confirm; no trim proposed","gbp":null},
{"id":"a-p12-hold","status":"open","prop":"P12","priority":"medium","title":"Hold base 284 (PL rec 284); pace30 -16.6%; 3-7 Dec cancelled / 4-7 Dec booked (net -1 n / -£394.65); 3 Dec £253 min 2 not an orphan; 30 Nov-2 Dec rose £29-30 overnight","gbp":null},
{"id":"a-bcom-cancel","status":"open","prop":"P12 P11 P04","priority":"medium","title":"Cancellations in 7-day window 4 / 10 n / £2,130.94 (P04 x2, P11 12-14 Dec, P12 3-7 Dec): send rate plans and reasons","gbp":null},
{"id":"a-amenities","status":"open","prop":"P04 P09 P12 P13 P20","priority":"medium","title":"Unchanged: free Airbnb fixes (lift P13/P04/P09/P12; view/balcony; P20 parking in first photo)","gbp":null},
{"id":"a-deposit","status":"open","prop":"Portfolio","priority":"medium","title":"Unchanged: decide £1,000 hold / waiver / ID check before Airbnb's 20 Nov rule change","gbp":null},
{"id":"a-extra-guest","status":"open","prop":"P11 P13 P05 P04","priority":"medium","title":"Unchanged: extra-guest fee above 4 guests","gbp":null},
{"id":"a-p04-monthly","status":"open","prop":"P04","priority":"medium","title":"Unchanged: Monthly-plan minimum not enforced (14-18 Nov)","gbp":null},
{"id":"a-tidy","status":"open","prop":"Portfolio","priority":"medium","title":"Stale id_map ids (Marylebone Vrbo x3, pricelabs_other ids); Vrbo copies stale (P11 4 Nov 01:37Z, P13 4 Nov 01:49Z); Vrbo +8% / Direct -10% unconfirmed","gbp":null},
{"id":"a-titles","status":"open","prop":"P20 P04 P12 P05 P11 P13","priority":"medium","title":"Unchanged: titles for Barking and Camden","gbp":null},
{"id":"t-comps","status":"open","prop":"Portfolio","priority":"medium","title":"Comps refreshed 5 Nov (P04 and P20 one comp replaced each); still need Booking.com comps and comp occupancy for RGI","gbp":null},
{"id":"t-p02-vrbo","status":"open","prop":"P02","priority":"medium","title":"Unchanged: Notting Hill Vrbo copy last pushed 24 Feb 2026","gbp":null},
{"id":"t-p05-0609","status":"open","prop":"P05","priority":"medium","title":"Unchanged: St John's Wood 6-9 Nov paid 0.639x PL: send the price breakdown","gbp":null},
{"id":"t-p05-calendar","status":"open","prop":"P05","priority":"medium","title":"Unchanged: 30 Oct passed closed and unsold: confirm if intended","gbp":null},
{"id":"t-p13-commission","status":"open","prop":"P13","priority":"medium","title":"Unchanged: Shepherd's Bush 12-16 Oct commission 26.3%: why?","gbp":null},
{"id":"t-unmapped","status":"open","prop":"P15 P16 P17 P18 P19","priority":"medium","title":"Unchanged: connect the second Smoobu and PriceLabs accounts","gbp":null}
],
"finds":[
{"agent":"pricelabs","severity":"critical","ref":"P06","title":"Marylebone 9 Nov on sale in Smoobu at £2 (min 2), 8 Nov at the £200 floor (were £233/£228); likely the 4 Nov 12:52:54Z push, cause unknown","evidence":"Smoobu /api/rates 07:13:45Z and 07:20:47Z; 4 Nov raw 228/233; overrides 9 Nov -5% only; push 31 s after Reyhan's price-less 15-22 Nov fixed DSO (pricelabs C1; channel §4; comp-central)."},
{"agent":"pricelabs","severity":"critical","ref":"P01 P06 P09 P10","title":"LISTING_NO_DATA on four listings since 4 Nov: still listed, push on, no removal log, no refresh or push; P09 past 24 h","evidence":"get_listings / get_listing_data 07:14Z and P09 07:28:33Z; get_listing_prices LISTING_NO_DATA on 3+ calls; user logs 6 Oct-5 Nov no unlink (pricelabs C2)."},
{"agent":"channel","severity":"critical","ref":"P04","title":"Unsynced Barking 1455 still double-sells 5-8, 6-9, 5-9, 6-10 Nov over the in-house guest and the 6-9 Nov Airbnb stay (£748.90), day 6","evidence":"Live 07:15:37-07:15:44Z £514.20 cards; comp-east £647/£648 on 5-9/6-10 Nov; Smoobu 161785771 and 161888271."},
{"agent":"channel","severity":"high","ref":"P06","title":"P06 Airbnb not following Smoobu: every card = 0.765 x 4 Nov rates, so the £2 is not live on Airbnb; Booking.com NOT CHECKED","evidence":"p06_0810nov / p06_0911nov / p06_0811nov 07:16-07:21Z; WAF at 07:18:03Z (channel §4)."},
{"agent":"channel","severity":"high","ref":"P20 P12 P13 P05 P06 P08 P04","title":"Hidden Airbnb layers unchanged day 7 (0.765 / 0.900; same-day 0.850); P05 9 Nov £253.44 vs £1,403 sixth check","evidence":"25 live searches 07:15-07:17Z (channel §3)."},
{"agent":"occupancy","severity":"high","ref":"P12","title":"3-7 Dec cancelled (£1,072.44), 4-7 Dec booked (£677.79, 0.881x PL £769): net -1 n / -£394.65; rebooking not proven; pace30 -16.6%","evidence":"reservations.csv 5 vs 4 Nov; Smoobu ids 161902221 / 162667435; occupancy pace table."},
{"agent":"channel","severity":"medium","ref":"P12","title":"P12 commission £124.17 = 15% of room + £150 cleaning (= 18.3% of room); £22.50 per booking on cleaning; no booster on record","evidence":"channel §2; supersedes occupancy's 18.3%-of-room reading."},
{"agent":"pricelabs","severity":"medium","ref":"Portfolio","title":"Discount gap £2,285 next 30 / £1,041 next 14 (excl. P01/P06/P09/P10/P14); P04 widened to £825 with no edit","evidence":"pricelabs H3; market §3 (0-15 d occupancy band)."},
{"agent":"pricelabs","severity":"medium","ref":"P12 P13 P20","title":"Your Price is the previous cycle's price (96/108 nights): t-pl-price-divergence explained; P12 30 Nov-2 Dec rose £29-30 overnight (cause not checked)","evidence":"pricelabs H4; comp-east; comp-west data gap 3."},
{"agent":"occupancy","severity":"medium","ref":"P01 P05 P06 P09 P11 P12","title":"18 Oct raised flats: corrected net +10 n / +£2,145.44 (was +11 / +£2,540.09), all from P12; hold bases","evidence":"occupancy.md base-rise tracker."},
{"agent":"comp-east","severity":"medium","ref":"P04","title":"P04 December now -11.3% to +3.5% vs comp median after comp replacement: hold (a-p04-dec dropped); November -16% to -32% under -15% override","evidence":"comp-east summary and supported positioning."},
{"agent":"market","severity":"medium","ref":"P13 P05 P20 P11","title":"Raises still open: P13 Christmas +£421; P05 7-8 Dec +£239, 13-21 Dec +£519 to P75; missed compression 24 n / £310 excl. darts R1","evidence":"market.md §2, §4."}
],
"top5":[
"P06 Marylebone 9 Nov is on sale at £2 (8 Nov £200) in Smoobu: set £233/£228 or close 8-9 Nov now and check the Booking.com extranet (NOT CHECKED); Airbnb still on 4 Nov rates only because its P06 sync is stale.",
"PriceLabs LISTING_NO_DATA on P01, P06, P09, P10 since 4 Nov (still listed, push on, no removal log): Sync Now, then PriceLabs support; P09 past 24 h with handback nights 10-12 Nov frozen at £113/£122/£129 (P0): raise +10% in Smoobu.",
"Barking day 6: block 5-10 Nov on unsynced Airbnb 1455876748739910219 now (£748.90 double-sellable, guest in residence tonight); then map to 3562176 or unlist.",
"Airbnb and PriceLabs discounts: remove hidden Smoobu 0.765/0.900 rules (day 7); clear P05 9 Nov (£253.44 vs £1,403, sixth check); set PriceLabs layers to Custom 0% (gap £2,285 next 30 / £1,041 next 14).",
"Your decisions: Reyhan's conflicts unchanged (up to ~£497/month); P20 delivery moved to 18-20 Nov?; commission on cleaning (£22.50-£26.82/booking); raises open: P05 December to P75 (£518), P13 Christmas +10% with min 2 on 25-26 Dec (£218)."
],
"per_property":[
{"ref":"P01","change":"LISTING_NO_DATA; last push 4 Nov 05:46:57Z; no open nights to the 20 Dec handback; Airbnb rating 4.75 (4)."},
{"ref":"P02","change":"Intentional block; pushed 00:24Z; Vrbo copy stale since 24 Feb."},
{"ref":"P03","change":"Intentional block; pushed 03:48Z via Channex."},
{"ref":"P04","change":"No booking; 1455 still sells 5-10 Nov (day 6); 9-13 Nov £715 (was £758) and 20 Nov £155 (was £182) with no edit; Reyhan -15% vs -8% unchanged; weekly 18%; December hold; fwd30 56.7% vs 23%."},
{"ref":"P05","change":"No booking; 9 Nov Airbnb £253.44 vs £1,403 (6th check); 29 Dec £1,322; 7-8 Dec £935 and 13-21 Dec £5,299 under P75; 12% early bird visible; fwd30 76.7% vs 40%."},
{"ref":"P06","change":"9 Nov £2 and 8 Nov £200 in Smoobu (were £233/£228); LISTING_NO_DATA after the 4 Nov 12:52:54Z push; Reyhan 15-22 Nov price-less fixed DSO min 2; Airbnb on 4 Nov rates; Booking.com NOT CHECKED."},
{"ref":"P07","change":"Intentional block; pushed 06:10Z."},
{"ref":"P08","change":"5-7 Nov £159/£175/£175 = £509 (was £539); P0 -49% (n=1); Reyhan -5% unchanged; handback 13 Nov."},
{"ref":"P09","change":"LISTING_NO_DATA; no push since 4 Nov 07:27:40Z (past 24 h); 10-12 Nov frozen £113/£122/£129, P0; -5% DSO set; 25 Apr 2027 open after handback block (question)."},
{"ref":"P10","change":"LISTING_NO_DATA; no open nights to the 18 Nov handback."},
{"ref":"P11","change":"No booking; 23 Dec £294, 3 Jan £190; darts £1,098 (avg £219.60) under Reyhan's -5%; comps sold out on our open November dates; fwd30 46.7% vs 45%."},
{"ref":"P12","change":"3-7 Dec cancelled, 4-7 Dec booked (net -1 n / -£394.65, 15% commission on room + cleaning); 4 Nov lapsed; 3 Dec £253 min 2 (not orphan); 30 Nov-2 Dec +£29-30 overnight; 26 Nov P100; pace30 -16.6%."},
{"ref":"P13","change":"No booking, no edit; 12 Nov £168 min 2; Christmas £4,211 with 25-26 Dec unsellable; twins differ on all dates incl. January."},
{"ref":"P14","change":"Numbers only: all 30 open nights at the £500 minimum; 0% vs 43%."},
{"ref":"P20","change":"No booking, no edit; 20 Nov £238 (was £300, 0-15 d band); 6-9 Nov P0 -34%, 13-16 Nov P14 -23%; December recommend fix-listing; 20-22 Nov block cancelled 30 Oct, 18-20 Nov block live."}
],
"base_review":[
{"ref":"P01","base":"253 (rec 255)","recommendation":"Hold; off the agenda","reason":"100% booked to the 20 Dec handback; no sellable nights; LISTING_NO_DATA (occupancy.md; pricelabs C2)."},
{"ref":"P04","base":"220 (rec Unavailable)","recommendation":"Hold 220; get the data on why the PL recommendation is Unavailable","reason":"56.7% vs 23%; base +30.2% vs P50, +2.8% vs P75; November P0-P50, December -11% to +3.5% vs comps with qp -0.15 (comp-east; pricelabs M5)."},
{"ref":"P05","base":"550 (rec 544)","recommendation":"Hold 550; use date overrides","reason":"76.7% vs 40%; comps P0/P12/P22, qp +0.15, recommend +25%; base -3.3% vs P50 (comp-central; pricelabs M5)."},
{"ref":"P06","base":"357 (rec 357)","recommendation":"Hold","reason":"Only 8-11 Nov sellable; fix the £2 / £200 Smoobu rates and the data failure first (pricelabs C1-C2)."},
{"ref":"P09","base":"176 (rec 176)","recommendation":"Hold","reason":"3 nights before the 26 Nov handback; 86.4% vs 36%; no PriceLabs data (comp-east; pricelabs C2)."},
{"ref":"P11","base":"286 (rec 283)","recommendation":"Hold 286","reason":"46.7% vs 45%; comps P5/P9/P5, recommend +5% = removing Reyhan's -5% (conflict b2) (comp-central)."},
{"ref":"P12","base":"284 (rec 284)","recommendation":"Hold 284; no base cut on top of Reyhan's -15%","reason":"63.3% vs 41%; pace30 -16.6%; multi-night stays band P40-P64 with qp -0.15; base +39.2% vs NL P50 (comp-east; occupancy.md; pricelabs M5)."},
{"ref":"P13","base":"250 (rec 237/236)","recommendation":"Keep 250 and record it in policy","reason":"73.3% vs 42%; base +12.6% vs P50, -10.1% vs P75; recommend +5-10% on Nov/Dec stays (comp-west)."},
{"ref":"P20","base":"330 (Corentin 350; rec 347)","recommendation":"Conflict for Corentin: confirm 350 or record 330; not a new proposal","reason":"50.0% vs 36% (30d), 24.1% vs 30% (60d); December recommend fix-listing; 0 reviews (comp-west; pricelabs H2)."}
]}
```

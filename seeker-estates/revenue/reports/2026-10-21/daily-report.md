# Seeker Estates - Daily revenue report, 2026-10-21

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs: `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `kpi_pack.json`, `kpi_summary.md`, `data/policy.json` (updated 20 Oct, read first), `reports/2026-10-20/daily-report.md`. Window figures recomputed from `data/snapshots/2026-10-21/{prices.csv,reservations.csv}`.

Policy respected: P02/P03/P06/P07 blocks are intentional and not counted as lost demand. P14 gets numbers only. Visibility Booster commission is not flagged. 15% weekly / 20% monthly stay discounts are expected. P13 is one flat. P05 is a 4-bed. Booking +20% markup and stacked Booking promotions are confirmed; the Airbnb extra discount is confirmed (type/% unknown); P20 extension nights were paid separately.

## Executive summary

1. **Biggest open question: new Smoobu "Blocked channel" blocks on four units, not in policy.** Created in Smoobu 19 Oct 17:33-17:36Z (dispatcher, Smoobu API): **P08 14 Nov 2026 -> 30 Jun 2028; P10 19 Nov 2026 -> 31 Aug 2028; P09 27 Nov 2026 -> 23 Apr 2027 (plus 25 Oct); P01 30 Nov-18 Dec and 21 Dec 2026 -> 30 Sep 2028.** 109 nights in today's 60-day file went from open to Blocked (occupancy.md). No reservation and no PriceLabs log entry sits behind them. They are **not counted as lost demand** and price ideas on those dates are moot. Corentin must say whether these are intentional (units leaving / long let / owner use) or a mistake (t-smoobu-blocks).
2. **Last 30 nights** (13 Smoobu units): occupancy **70.0%**, ADR **£172.56**, RevPAR **£120.79**, revenue £47,109.79 (20 Oct: 70.3% / £173.85 / £122.14; the change is only the window moving). **Next 30:** 46.6% booked (189/406); 47.4% with the new blocks taken out of capacity. **No new confirmed booking on any existing unit since 20 Oct** (reservations diff, channel.md section 4).
3. **P04 Barking is now in Smoobu (3562176) and two channel managers push its prices.** Channex shows 2-6 Nov Booked; Smoobu has that stay (2-7 Nov, £682.02) cancelled and the nights open at £149-172. Evidence favours keeping Smoobu 3562176 and switching Channex push off, **only after** Corentin confirms the Booking.com connectivity provider and the 2-7 Nov cancellation (t-p04-sync).
4. **Airbnb extra discount is deepening:** 22.6% implied on October bookings (16 bookings, 113 nights, -£4,769), **30.1% on bookings made 16-21 Oct** vs 19.5% on 1-15 Oct. Pattern fits a custom / limited-time promotion of roughly 20-30% (inference, channel.md section 2). Run-rate about **£4,640/month** at the 18 Oct anchor. Explained by policy; the decision is whether to keep it.
5. **20 Oct changes are live:** P05 £550 lifted open nights +9.7% (£492 -> £540 on 22 shared nights), but only back to the 19 Oct level. P13 +10% is live on both listings (11 nights £187.1 -> £207.4), but the 2-bed P50 rose 5.3% the same day, so position moved only P25 -> P29. Neither has a booking yet.

## Effect so far of the price changes

Sources: pricelabs.md items 5-6 and 9, comp sections (same-date comparisons), occupancy.md (bookings with booked_on on/after the change).

| Ref | Change | Price on open nights now | Bookings since change | Booked next 30 vs market | Position now | Read |
|---|---|---|---|---|---|---|
| P01 | 18 Oct base £230 -> £253 | No open nights in next 60 (booked or newly blocked); booked-night list +3-10 (algorithm) | 1: Airbnb 18-21 Dec, £240.30/n (no pre-raise comparable) | 100% vs 33% | 31-60 P56 (+5.6% vs P50 £270) | Cannot pick up at any price until the block is explained. Out of the 26 Oct test. |
| P05 | 18 Oct £455 -> £500; 20 Oct £500 -> £550 | +9.9% on open nights vs 20 Oct; -5.3% vs 19 Oct; +4.0% vs 18 Oct while base is +20.9% (comp-central) | 0 (22-29 Dec booking predates both) | 65.5% vs 37% | Next 30 £483 = P25 (-18% vs 4-bed P50 £591); next 60 £543 = P39 | The base passes through; the 20 Oct algorithm drop (about -13%) is still inside the price, cause unknown. Joins the 26 Oct test. |
| P06 | 18 Oct £340 -> £357 | 3 open nights (5-7 Nov) fell 12.2% overnight to £253/£281/£285 (algorithm) | 0 | 82.4% of unblocked nights vs 42% | £273 <P25 (-34%) | Only 3 open nights; little at stake. Hold to 26 Oct. |
| P09 | 18 Oct £160 -> £176 | Near-date -£6-13 (29 Oct £165 -> £152) | 0 | 58.6% vs 38% | Next 30 P65 (was P70); 31-60 blocked from 27 Nov | PriceLabs recommended base £167, below £176. Hold to 26 Oct. |
| P11 | 18 Oct £260 -> £286 | Flat overnight; +11.5% vs 18 Oct | 0 | 62.1% vs 45% | Next 30 £233 <P25 (-23%); 60 days P43 | Rise holding. Hold to 26 Oct. |
| P12 | 18 Oct £270 -> £284 | Near-date -£5-8 (28 Oct £213 -> £206) | 0 | 58.6% vs 39% | Next 30 P66; 31-60 P85 | **Pace90 -31.9% / -14 nights** (was -29.1%). Hold; no further rise. |
| P13 | 20 Oct +10% on 11 nights | £187.1 -> £207.4 (+10.9%), both listings | 0 since 20 Oct; all 11 nights still open | 48.3% vs 41% | Next 30 P24.5 (-16.6% vs P50 £240); the 11 nights P29 | Market rose the same day and absorbed it. Re-test after pickup, not before. |

Baseline for judging: the six 18 Oct units took 35 bookings in the 30 days before the raise (about 1.2/day). About 2 booking days have passed, with 1 booking. Too soon to judge (occupancy.md).

## Since yesterday (per property)

| Ref | Change since 20 Oct |
|---|---|
| P01 | **30 Nov-17 Dec newly Blocked (Smoobu, 19 Oct).** 0 open nights in 22 Oct-19 Dec. Fwd30 29/29. |
| P02 | Intentional block. Fwd30 7 -> 6 (window). Vrbo 4438728 still unsynced, last push 24 Feb (239 days). |
| P03 | Intentional block. No data. |
| P04 | **In Smoobu as 3562176 (mapped 20 Oct 10:32Z, sync on).** 6 Booking rows imported (5 confirmed, 32 nights, £4,904.74; 1 cancelled 2-7 Nov £682.02). Fwd30 48.3% on Channex calendar vs 31.0% on confirmed Smoobu stays. -5% on 1-24 Nov added to 3562176 only. The "17 sync issues" are Channex vs 3562176 prices, not a push failure. |
| P05 | £550 live, open nights +9.7%. 27 Oct still Blocked (reason unknown). PriceLabs market occ next 30 33% -> 37%. |
| P06 | 3 open nights -12.2% (algorithm). Last-30 occ 73.3% -> 70.0% (window). |
| P07 | Intentional block. No change. |
| P08 | **14 Nov-20 Dec newly Blocked (Smoobu, to 30 Jun 2028).** Open nights next 60: 48 -> 13. Ex-block: 43.5% booked vs 48% market, open avg £200 = P35. |
| P09 | **25 Oct and 27 Nov-20 Dec newly Blocked** (25 Oct is not in the dispatcher's block list). Open next 60: 34 -> 11. Position P70 -> P65. |
| P10 | **19 Nov-20 Dec newly Blocked (to 31 Aug 2028).** 0 bookable nights in next 60. Yesterday's 2 Nov re-test is moot. |
| P11 | Flat. Single open nights 18 Nov (£318) and 27 Nov (£595) unchanged. |
| P12 | No booking. **22 Oct is a 1-night gap at min stay 2 (£188): cannot sell.** 14-20 Dec Blocked (already in 20 Oct file, reason not in data). |
| P13 | +10% live on both listings. **New: 1 Dec opened at £344 (+50%, min stay 1, logged 20 Oct 09:30Z), not in policy.** Twin gap 8.7% (3090701 £217.5 vs 3064856 £200.2 on 15 open nights). 2-bed P50 £228 -> £240. |
| P14 | Special setup, numbers only: 0% booked next 30/60 vs 41%/37% market; 65% of open nights at the £500 minimum. |
| P15-P19 | Not connected (second account). |
| P20 | Algorithm took back about half of the 19->20 Oct rise: 25 Oct-3 Nov -3-9%; next 30 P56 -> P53; 31-60 £331.7 = P77. Live occ 17% vs 34% market (next 30). No setting change. 4-night min stay on 4-6, 11-13, 18-20 Dec with no DSO (source unknown). |

## Actions - 2026-10-21

**Windows** (prices.csv): W1 = 22 Oct-20 Nov, W2 = 21 Nov-20 Dec.

**Formula used throughout:** expected effect = price move % x average open PriceLabs price in the window x expected nights sold. Expected nights sold = nights placed in that window by confirmed bookings made 21 Sep-20 Oct (30 days), capped at open nights. Upper bounds: elasticity is not measured.

| Ref | W1 open / avg £ / 30d pickup | W2 open / avg £ / 30d pickup |
|---|---|---|
| P05 | 9 / £483.4 / 3 | 14 / £581.1 / 9 |
| P06 | 3 / £273.0 / 14 | 0 (policy block) |
| P08 | 13 / £200.5 / 10 | 0 (new block) |
| P09 | 11 / £157.6 / 17 | 0 (new block) |
| P11 | 11 / £232.6 / 13 | 8 / £352.6 / 2 |
| P12 | 12 / £236.5 / 15 | 15 / £276.9 / 0 |
| P13 | 16 / £202.2 / 14 | 22 / £238.8 / 8 |
| P20 | 27 / £269.6 / 3 | 30 / £333.6 / 0 |
| P01, P10 | 0 open | 0 open (new block) |
| P04 | 15 / £171.6 / n/a | 19 / £207.3 / n/a (imported rows, not pickup) |

Ranked by expected monthly £; "not quantified" rows follow, ranked by risk.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P01, P08, P09, P10 | **t-smoobu-blocks (new, critical).** Tell us if the 19 Oct "Blocked channel" blocks are intentional: P08 14 Nov 2026-30 Jun 2028; P10 19 Nov 2026-31 Aug 2028; P09 27 Nov 2026-23 Apr 2027 plus 25 Oct; P01 30 Nov-18 Dec and 21 Dec 2026-30 Sep 2028. If intentional (leaving / long let / owner use), we add them to policy.json; if not, remove them in Smoobu. Also: does "Blocked channel" close every OTA or one? | Smoobu > Calendar (each unit) | occupancy.md, pricelabs.md HIGH 3: 109 nights open -> Blocked in the 60-day file; created 19 Oct 17:33-17:36Z; no reservation, no PriceLabs log; not in policy. P01 and P10 now have 0 bookable nights in 60 days. | Not quantified (supply question, not demand; list prices on the blocked nights are £24,950 in-window for scale only, not lost revenue). | Corentin | 2026-10-22 |
| 2 | P06, P10, P01, P08, P09, P12, P02, P20 | **t-airbnb-gap (update).** Send the name and % of the active Airbnb discount (likely a custom / limited-time promotion) per listing, plus Smoobu > Channel Manager > Airbnb adjustment %. Decide keep / cut / cap. | Airbnb > Listing > Pricing > Promotions; Smoobu Channel Manager | channel.md: October bookings 22.6% under price after stay discounts (median 25.1%, range 9.7-38.2%), **30.1% on bookings made 16-21 Oct**. Present at every lead time (5-60 days). Next 30: -£3,249 (84 nights). Biggest: P06 -£1,054, P10 -£613, P01 -£490, P08 -£475. Airbnb Oct net ≈ £63.9 per £100 vs Booking £73.8. | **≈ £4,640/month** = £3,249 x 30 / 21 booking days since 1 Oct (channel.md). Upper bound: assumes bookings hold without the discount. | Corentin | 2026-10-23 |
| 3 | P11, P12 (all Booking units) | **a-bcom-promos (update).** List active Booking.com deals per property (Genius, Mobile, Early Booker, Basic). Remove or cap the Early Booker-type deal, or raise the Smoobu Booking markup above +20% to hit a net target. | Booking extranet > Promotions; Smoobu Channel Manager | channel.md: guests pay ≈ 0.90 x PriceLabs after stay discount; stack 24-29% off the 1.2x price; 31-60 day lead 35.4%, 61+ days 26.5%, 15-30 days 13.6%. Next 30 (excl. P04): -£1,143 on 27 nights (P11 -£638, P12 -£381). No time trend: standing stack. | **Up to £1,143 on the next 30 nights** (next-30 shortfall vs 1.2x, channel.md). Upper bound. | Corentin | 2026-10-26 |
| 4 | P05, P11, P09, P06 (P12 decide) | **a-review-1026 (update).** Hold all bases to 26 Oct. **P01 leaves the test** (0 open nights in 60 days). **P05 joins** (£550 live since 20 Oct). Pass = booked next 30 still ≥ market + 10 points AND bookings made 19-26 Oct ≥ half the pre-raise 7-day rate. If pass: P05 £550 -> **£605** (+10%); P11 £286 -> **£315** (+10%); P09 £176 -> **£185** (+5%); P06 £357 -> **£375** (+5%); P12 no rise. All within max (P05 £2,500, P11 £1,200, P09 £550). | PriceLabs > Base price | Effect table above. `recommend`: P05 raise +10% (65.5% vs 37%, P25) and +10% at 60 days (P39); P11 +10% (<P25); P09 +10% next 30 at P65, but 31-60 is blocked and recommended base is £167, so +5% (comp-east: hold band +12-18% vs P50, now +11.8%); P06 +10% on 3 nights, sized +5% (only 3 nights, 12% algorithm drop). P12 rule +10%/+5% overridden: pace90 -31.9% and 31-60 already P85. | **≈ £1,122/month if all pass:** P05 10% x (3 x £483.4 + 9 x £581.1) = £668; P11 10% x (11 x £232.6 + 2 x £352.6) = £326; P09 5% x 11 x £157.6 = £87; P06 5% x 3 x £273 = £41; P12 £0. | Corentin (approve) / Claude (review) | 2026-10-26 |
| 5 | P08 | **a-p08 (update).** Date override **+5%** on the 13 open nights 26 Oct-13 Nov (avg £200 -> ~£210). Listing work on hold until the 14 Nov block is explained. Min £150 unchanged. | PriceLabs 3318167 > Date-specific overrides | comp-central: with the block excluded, 43.5% booked vs 48% market at P35 (-10.5% vs 2-bed P50 £224); `recommend(0.435, 0.48, 0.35)` = raise +5% on both horizons. Supersedes yesterday's "fix-listing", which was measured with the now-blocked nights as open. | **≈ £100/month** = 5% x £200.5 x 10 nights (W1 pickup 10 of 13 open). | Corentin | 2026-10-26 |
| 6 | P11 | **a-events (update).** Darts **13-17 Dec override +10% -> +20%** (£306/£285/£284/£295/£310 -> about £334/£311/£310/£322/£338 vs fortnight £330). Dropped: P01 and P09 nights (now blocked, moot). | PriceLabs 3064196 > Date-specific overrides | market.md section 3: 5 nights £170 below fortnight; darts verified (alexandrapalace.com, 180,000 fans). PriceLabs labels the nights low demand. `recommend` P11 = raise +10%. | **≈ £34 one-off** = (£1,480 / 1.1 x 10%) x W2 sell-through 2/8. | Corentin | 2026-10-26 |
| 7 | P04 | **t-p04-sync (new, critical).** Confirm (a) which connectivity provider the Barking Booking.com property uses now, (b) whether Booking reservation 2-7 Nov (£682.02) is cancelled, (c) which OTAs Channex still serves, (d) P04 = Smoobu 3562176 in id_map. Then switch **Channex 7dc96cda push OFF** and keep 3562176; switch off Vrbo copy 12038555 (push on, fully blocked). | Booking extranet; PriceLabs > Listings; Smoobu | pricelabs.md CRITICAL 1: four PriceLabs listings, three pushing. Channex shows 2-6 Nov Booked, Smoobu cancelled + open at £149-172; 1 Nov £475 min 1 (Channex) vs £162 min 3 (Smoobu). Smoobu price = 3562176 on all 60 dates. Risk: double booking if the cancellation is wrong; 5 nights wrongly closed if right. | Not quantified (risk control). If 2-6 Nov is open: 5 nights at £149-172 become sellable. | Corentin | 2026-10-22 |
| 8 | P12 | **a-p12-22oct (new).** Set **22 Oct min stay 2 -> 1** (keep £188). | PriceLabs 2699998 > Date-specific override | pricelabs.md item 8: 1 open night between today's checkout and a 23 Oct arrival, min stay 2, so unsellable. | Up to **£188 one-off** if it sells; sell-through of 1-night gaps not measured. | Corentin | 2026-10-21 |
| 9 | P20 | **a-p20 (update).** Drop yesterday's -15% on 25-31 Oct (the algorithm already took back half the rise; next 30 now P53, in line). Keep: **1-30 Nov override -2% -> -9% from 20 Nov, and -7% on 1-20 Dec** (31-60 avg £331.7 -> ~£308). Listing work (photos, title, Booking.com). Check the source of 4-night min stay on 4-6, 11-13, 18-20 Dec. Min £220 / base £350 unchanged; lowest result stays above £220. | PriceLabs 3547481 > Overrides; Airbnb listing | comp-east: next 30 10% booked vs 34% at P53 = fix-listing 0%; 31-60 5% vs 26% at P77 = **lower -7%**. P01 (0.67 km) is cheaper on shared dates and full. | Not quantified: W2 pickup 0, W1 pickup 3. | Corentin | 2026-10-26 |
| 10 | P04, P11, P12, P13 | **a-orphans (update).** Reset premium overrides on single open nights to 0%: P04 2 Dec +200% (£551) on both listings and 1 Nov +150% (£475, Channex only); P11 18 Nov +30% (£318) and 27 Nov +60% (£595); P12 17 Nov +50% (£369); P13 22 Oct +40% (£192). **P13 1 Dec +50% (£344, P84), added 20 Oct and not in policy: confirm intent or reset.** | PriceLabs > Date-specific overrides | pricelabs.md item 8 (live DSOs). | Not quantified: no orphan sell-through data. | Corentin | 2026-10-26 |
| 11 | P04 | **a-p04-raise (update).** Base £220 -> **£242** (+10%), **after t-p04-sync**, on the listing kept. Also reconcile overrides (3562176 -5% on 1-24 Nov vs Channex -3% / +150% / -8%). Min £90 / max £2,000 unchanged. | PriceLabs 3562176 > Base price | comp-east: 48% booked vs 27% (Channex calendar; 31% on confirmed Smoobu stays), P53 next 30 / P69 for 31-60; `recommend` +10% / +10%; recommended base £228. If 31% is the true figure, lead is +4 points and the rule gives +5% at P53. | Not quantified: no real P04 pickup (imported rows). | Corentin | 2026-10-26 |
| 12 | P02 | **t-p02-vrbo (update).** Reconnect Vrbo 4438728 or switch push off. | PriceLabs > Vrbo 4438728 | pricelabs.md CRITICAL 2: push on, last push 24 Feb (239 days). | Not quantified (hygiene). | Corentin | 2026-10-25 |
| 13 | P13, P04, others | **a-tidy (update).** Align P13 twin prices (3090701 +8.7% on 15 open nights); say which listing feeds which OTA. Refresh `build/properties.py` (P05 5-bed £455, stale bases, no P20). Duplicates: P04 Vrbo 12038555, Channex copies of P01/P08/P09/P10 (push off). | PriceLabs > Listings; info pack | comp-west twin gap; pricelabs.md item 10. | Not quantified. | Corentin / Claude | 2026-10-25 |
| 14 | P10 | **t-p10-leak (update: paused).** The 2 Nov -7% test is moot: P10 is booked to 18 Nov and blocked from 19 Nov. Re-open only if the block is removed. | - | comp-west: 0 bookable nights in next 60. | - | Claude | after t-smoobu-blocks |
| 15 | P15-P19 | **t-unmapped (no change).** Second Smoobu / PriceLabs keys. | Env vars + connectors | All KPIs unknown. | Not quantified. | Corentin | 2026-10-26 |

No proposed price is outside PriceLabs min/max. P14 is excluded by policy. Approval needed for every row.

## Top 5 open tasks
1. **t-smoobu-blocks** - are the P01/P08/P09/P10 blocks intentional?
2. **t-p04-sync** - Barking: confirm Booking.com provider and the 2-7 Nov cancellation, then one channel manager.
3. **t-airbnb-gap** - name and % of the Airbnb discount (now about 30% on new bookings).
4. **a-bcom-promos** - which stacked Booking deals to keep.
5. **a-review-1026** - 26 Oct base review (P05, P11, P09, P06; P12 decide).

## Growth plays

- **Rate integrity (KPI: realised vs list after stay discounts).** Airbnb October -22.6% and deepening; Booking ≈ 0.90x PriceLabs. Target Airbnb ≥ -5% by 2026-11-15 once the promo is named. Actions 2-3 together (≈ £4,640/month + up to £1,143 next 30) outweigh every price move combined (≈ £1,256 quantified).
- **Supply (KPI: bookable nights).** If the 19 Oct blocks are real exits, the portfolio loses P01, P08, P09, P10 from late Nov: that changes every portfolio target below. Answer to t-smoobu-blocks first.
- **Review score (KPI: rating).** Airbnb 4.4 / Booking 8.9 (info pack, portfolio). Per-listing ratings blank in `listings.csv`; no comp ratings (Competitor Listings off), so `quality_premium` = 0 by default and the gap is unknown. **Get the data:** Airbnb host dashboard > Reviews and Booking extranet > Guest reviews per listing. Target ≥ 4.8 / 9.3 by 2027-01-31.
- **Listing conversion (KPI: MPI on soft units).** P20 10% vs 34% at P53 (price is in line, so photos / title / Booking connection). P13 48% vs 41% at P24.5 (room to price up after pickup). Superhost / Preferred: **get the data** from Airbnb and Booking settings.
- **Length of stay and gap fill (KPI: unsellable gaps).** One unsellable gap today (P12 22 Oct, action 8). Short runs: P13 25-26 Oct, P05 28-30 Oct, P06 5-7 Nov. Suggest a gap-fill rule (min stay 1 at no premium for 1-night gaps) instead of the premium orphans in action 10. Mid-term (91+ nights): 0 on books; do not push until the Airbnb discount is known (28+ night stays carry about 17.7% beyond the 20% monthly).
- **Direct share (KPI: direct + website share of revenue).** 1.54% of last-365 stay revenue (Direct 0.38% + Website 1.16%); **forward 0%** of £60,237 on the books (excl. P04). Direct nets £90 per £100 (config default, unconfirmed) vs Airbnb Oct ≈ £63.9. **Get the data:** direct-site URL and booking engine for `channel_checks.csv`.
- **Event compression (KPI: event-night price vs fortnight).** 27 open nights £583 below fortnight (market.md), down from 42 / £860 only because 16 missed nights moved into the new blocks. Live gaps: P20 £296 (left alone: priced above demand at 31-60), P11 darts £170 (action 6), P04 £106 (our own -3% / -5% overrides; fix after t-p04-sync), P13 26 Nov £11.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | 70.0% (kpi_pack) | hold ≥ 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | £172.56 | £190 | 2026-12-18 |
| RevPAR, last 30 | £120.79 | £129 (68% x £190) | 2026-12-18 |
| Booked next 30 | 46.6% (189/406); 47.4% ex new blocks | ≥ market + 10 points per unit | 2026-10-26 |
| Airbnb realised vs list (after stay discounts) | -22.6% Oct bookings; -30.1% 16-21 Oct | ≥ -5% | 2026-11-15 |
| RGI | UNKNOWN: no market ADR/RevPAR (percentiles only; comps.csv empty) | > 1.10 every property | data 2026-10-26; target 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 (portfolio); per-listing blank | ≥ 4.8 / 9.3, then top decile | data 2026-11-01 |
| Direct share | 1.54% last 365; forward 0% | 5% | 2027-06-30 |
| Search placement | UNKNOWN: no OTA ranking feed | page 1 for area search | data source needed |

## Data gaps (get the data)

1. **Reason for the 19 Oct Smoobu blocks** (P01, P08, P09, P10) and for P09 25 Oct; whether "Blocked channel" closes all OTAs. Source: Corentin / Smoobu calendar.
2. **P04:** Booking.com connectivity provider, status of reservation 2-7 Nov (£682.02), channels on Channex, id_map confirmation. Source: Booking extranet, Channex dashboard.
3. **Airbnb discount type and %.** Source: Airbnb > Promotions screenshots; then set `CHANNELS["airbnb"]["discount"]` in `rm/config.py`.
4. **Booking.com active deals per property** and Visibility Booster dates. Source: Booking extranet.
5. **P05 20 Oct algorithm drop** (about -13% still in the price). Source: PriceLabs UI price breakdown (read-only API has none).
6. **Market ADR / comps / ratings** for RGI: enable PriceLabs Competitor Listings or a Market Dashboard; load per-listing ratings into `listings.csv`.
7. **OTA displayed prices:** `channel_checks.csv` empty; OTAs blocked here.
8. **P13 1 Dec +50% min-stay-1** intent (not in policy). **P12 14-20 Dec** and **P05 27 Oct** block reasons.
9. **P20 4-night min stay** on 4-6, 11-13, 18-20 Dec with no DSO. Source: PriceLabs min-stay rules / Smoobu.
10. **Pipeline:** `rm/analyse.py` counts P04 imported rows as pickup; `pace_vs_stly` returns 0 instead of null without history. STLY exists only for P12.
11. **prices.csv covers 60 days** (no 180-day check; blocks beyond 20 Dec not in file).
12. **reservations.csv** has no booking ID, modification or cancellation date.
13. **`price` vs `user_price`:** P13 `user_price` excludes the 20 Oct DSOs; which value OTAs show is unverified.
14. **P15-P19:** second account keys. **P03:** no reservation data (Channex).

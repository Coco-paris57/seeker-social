# Seeker Estates - Daily revenue report, 2026-10-23

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs: `kpi_pack.json`, `kpi_summary.md`, `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `data/policy.json` (read first), `reports/2026-10-22/daily-report.md`, open dashboard actions at the start of this step. Window figures were recomputed from `data/snapshots/2026-10-23/{prices.csv,reservations.csv}` (no guest data used).

Policy respected: P02/P03/P06/P07 blocks are intentional. P14 gets numbers only. Visibility Booster commission is expected. The 15%/20% stay discounts are expected. P13 is one flat, and its 1 Dec +50% is intentional. The Booking.com +20% markup is global and its promotions stack. Nights after the handback dates (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec) are not inventory. P20's Airbnb discounts (weekly 15%, monthly 20%, last-minute 15%, plus the 20% new-listing promo) and its separately paid 18-22 Oct extension are explained.

## Executive summary

1. **Last 30 nights (13 Smoobu units): occupancy 69.5%, ADR £173.34, RevPAR £120.45, revenue £46,974.17** (kpi_pack `portfolio_last30`). On 22 Oct it was 69.7% / £172.76 / £120.49. **Next 30, handback-aware: 43.3% (177/409), down from 45.8%.** Next 60: 35.1% (252/717), down from 37.4% (occupancy.md).
2. **No booking was made on 22 or 23 Oct. Two Booking.com stays were cancelled overnight:**
   - P12 Mile End, 1-8 Nov: 7 nights, £1,382.86.
   - P11 Camden, 19-27 Nov: 8 nights, £1,736.41.
   - Booking.com over the last 14 days: 1 organic booking against 4 cancellations, a **net -21 nights / -£4,621**.
   - Booking.com cancels **33%** of bookings (365 days), against 17% on Airbnb (channel.md §2).
   - You confirmed on 22 Oct that the account runs normally, so this is demand and cancellation policy, not a fault.
3. **P11 Camden: PriceLabs has not seen the cancellation.**
   - PriceLabs still shows 19-26 Nov as Booked. It last refreshed on 22 Oct at 08:37Z.
   - Smoobu is selling 18-27 Nov at £2,955.
   - Two old 1-night overrides now sit inside the 10-night run: 18 Nov +30% (£314, min 1) and 27 Nov +60% (£589, min 1).
   - Needed: Sync Now, then reset those two nights (pricelabs.md CRITICAL 1).
4. **P12 Mile End: 1-7 Nov were repriced to £181-265, 16.6% below their list prices on 22 Oct.**
   - Causes: the Aggressive occupancy rule, plus reyhan's -4% override (22 Oct 18:47Z).
   - Demand is soft. Market occupancy is 4-21 points behind last year on every night.
   - Pace to handback is -35.4% (-15 nights).
   - Advice: hold the £284 base and add no manual cut on top (comp-east, market.md §5).
5. **The six flats raised on 18 Oct took 2 bookings on 18-23 Oct (0.4 a day), against 14 bookings on 4-17 Oct (1.0 a day).** Both bookings were made by 19 Oct; none since. Hold all bases to the 26 Oct review.

## What changed since 22 Oct

### The 18 Oct rises (P01, P05, P06, P09, P11, P12)

Source: occupancy.md "Raised flats" (reservations.csv `booked_on`), comp sections. "Before" = bookings made 4-17 Oct.

| Ref | Base | Bookings made 18-23 Oct (before) | Cancelled since 18 Oct | Booked next 30 vs market | Position (open nights) | Read today |
|---|---|---|---|---|---|---|
| P01 | £253 | 1 (1) | 0 | 100% vs 32% | 0 open nights to the 20 Dec handback | Out of the test: nothing left to sell |
| P05 | £550 (since 20 Oct) | 1 (2), made 18 Oct; **0 since the £550 base** | 0 | 66.7% vs 38% | Next 30 £476 <P25 (-22% vs 4-bed P50 £614); next 60 P36 | Rule says +10%. Still 29 points ahead of market |
| P06 | £357 | 0 (5) | 0 | 81.2% vs 43% (blocks excluded) | 3 open nights, £331 = P27; 6 Nov 281 -> 375, no log | Rule says +10% on 3 nights |
| P09 | £176 | 0 (3) | 0 | 60.0% vs 37% | 11 open nights, P64 (+11.8%) | Hold. PriceLabs recommended base is £167 |
| P11 | £286 | 0 (1); last booking made 4 Oct | **19-27 Nov, -8 n, -£1,736** | **53.3% vs 45%** (was 63.3%) | Next 30 £244 = P25 (-20%), with the cancelled nights counted open | Rule now +5% (was +10%) |
| P12 | £284 | 0 (2) | **1-8 Nov, -7 n, -£1,383** | **40.0% vs 40%** (was 63.3%) | Next 30 P54; 31-60 P82 | Rule now hold (was +10%) |
| **Total** | | **2 (14)** | **-15 n, -£3,119** | | | Net nights since 18 Oct: -5 |

For comparison, flats with no rise: P13 2 bookings since 18 Oct (4 before), P20 1 (2), P08 0 (1), P10 0 (2), P02 0 (2). Five days is too short, and the cancellations do not say whether price played a part.

### Per property

| Ref | Change since 22 Oct |
|---|---|
| P01 | No change. Sold out to the 20 Dec handback. Its Channex copy was removed from PriceLabs; no price effect. |
| P02 | Intentional block. Vrbo 4438728 last push 24 Feb (now 241 days). |
| P03 | Intentional block. No data. |
| P04 | 25 Oct still unsellable (min stay 3, `unbookable`), now 2 days out. 2 Dec £612 -> £601 (+200% override, 3.1x its neighbours). Next 30 P43 -> **P41** (-7.3%), 25% booked vs 25% market. 21 Nov (The Script) fell 205 -> 174 through the algorithm. The Vrbo copy 12038555 was pushed off (reyhan, 22 Oct 12:43Z) and is now gone from PriceLabs. |
| P05 | Flat (-0.2% on open nights). No booking since the £550 base. 27 Oct still blocked, reason unknown. |
| P06 | 6 Nov 281 -> 375 (+33%, no log). 3 open nights, average £331 = P27. |
| P07 | Intentional block. |
| P08 | Open nights **-5.4% (no log), the second day running** (about -9% in 2 days). 6 Nov 280 -> 203, now £6 under the Arsenal v Hull fortnight. 40.9% booked vs 50% market at <P25: fix-listing, hold. |
| P09 | No booking. Open nights -7 to +20. P63 -> P64. |
| P10 | No change. Sold out to the 18 Nov handback. |
| P11 | **19-27 Nov cancelled.** PriceLabs is stale (above). Fwd30 63.3% -> **53.3%** (Soft). Ally Pally Great Hall concerts are newly found on 20-21 and 26-28 Nov; the reopened 20, 21 and 26 Nov are above their fortnight. Darts 13-16 Dec £52 under, 23 Dec £16 under (newly assessed). |
| P12 | **1-8 Nov cancelled.** Reyhan's overrides (22 Oct 18:47Z): -4% on 26 Oct-15 Nov, -1% on 29 Nov-13 Dec. Near nights cut 15-22%; 26-29 Oct now **below P25** (£157-172 vs £178). Pace30 +20.4% -> **-24.2%** revenue; pace to handback -11.1% -> **-35.4%**. |
| P13 | No booking or setting change. Near open nights -£5 to -£7 (algorithm). Next 30 P24.9 -> **P22** (-18.4%), booked 43-50% vs 36-40% market. The twins are still identical on 22 Nov-21 Dec. Likely cause: PriceLabs occupancy windows (gap +11.1% at 0-14 days, +5.6% at 15-29 days, 0% from 30 days). Settings are identical on both. |
| P14 | Numbers only: 0% booked vs 40% market; 67% of open nights at the £500 minimum. |
| P15-P19 | Not connected (second account). |
| P20 | **20-21 Nov newly Blocked** (open at £299/£337 yesterday). There is no reservation, no override and no log entry. The 28-31 Oct booking is now in PriceLabs and is explained by its Airbnb discounts (policy). Open prices on 25 Oct-6 Nov rose £14-32 through the algorithm. **Correction:** the Bett "uplift" reported on 22 Oct was the 30% far-out premium (after 89 days), not event pricing. 11 event nights are £248 under their fortnight. |
| Account | **10 listings were removed from PriceLabs** (20 remain): 4 Channex copies (P01, P08, P09, P10), the Barking Vrbo 12038555, 2 blank P13 Vrbo copies and 3 unmatched Vrbo units. None of them was pushing prices, so there is no price effect. Their ids are dead in `id_map.json`. |

## Actions - 2026-10-23

**Windows** (prices.csv, before handback). W1 = 23 Oct-21 Nov; W2 = 22 Nov-21 Dec. P11's cancelled 19-26 Nov are counted as open.

**Formula:** expected effect = price move % x average open PriceLabs price x expected nights sold. Expected nights sold = nights in the window from confirmed bookings made 23 Sep-22 Oct (30-day pickup), capped at the open nights. These are upper bounds, because elasticity is not measured.

| Ref | W1 open / avg £ / 30d pickup | W2 open / avg £ / 30d pickup |
|---|---|---|
| P05 | 9 / £475.9 / 4 | 15 / £593.3 / 8 |
| P06 | 3 / £331.0 / 13 | 0 (policy block) |
| P08 | 13 / £179.1 / 9 | 0 (handback) |
| P09 | 11 / £158.7 / 18 | 0 (handback) |
| P11 | 14 / £243.5 / 12 (near nights 28 Oct-2 Nov and 10-13 Nov: 10 / £225.7) | 13 / £339.0 / 3 |
| P12 | 18 / £218.1 / 8 | 15 / £274.7 / 0 |
| P13 (3064856) | 16 / £197.1 / 14 | 22 / £239.0 / 8 |
| P20 | 23 / £272.7 / 5 | 30 / £335.9 / 0 |
| P04 | 21 / £166.0 / n/a (20 Oct import rows) | 18 / £219.1 / n/a |
| P01, P10 | 0 open | 0 open |

Rows are ranked by expected monthly £. The "not quantified" rows follow, ranked by risk.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P05, P06 (P09, P11, P12 hold) | **a-review-1026 (update).** Hold all bases to 26 Oct. Pass test: booked next 30 at least market + 10 points AND bookings made 19-26 Oct at least half the pre-raise rate. If P05 passes: base £550 -> **£605**. If P06 passes: **+10% override on 5-7 Nov**. **P11: no base rise.** The rule is now +5% on the near nights only (28 Oct-2 Nov, 10-13 Nov), and only if the review passes. **P09: hold £176. P12: hold £284.** All within min/max (P05 £150-2,500; P06 £200-800; P11 £120-1,200). | PriceLabs > Base price; date-specific overrides | Rule outputs: P05 66.7% vs 38% at <P25 = +10%; P06 81.2% vs 43% at P27 = +10%; P11 53.3% vs 45% at P25 = +5% (was +10%); P12 40% vs 40% at P54 = hold; P09 +10%, overridden to hold (0 bookings since 18 Oct; PriceLabs recommended base £167). P11 held below its rule because its last booking was made 4 Oct and Booking.com (its only channel) had 1 organic booking in 14 days. Raised flats: 2 bookings since 18 Oct vs 14 in the 14 days before. | **About £812/month if all pass.** P05: 10% x (4 x £475.9 + 8 x £593.3) = £665. P06: 10% x 3 x £331.0 = £99. P11: 5% x 10 x £225.7 = £113, counted only if it passes. | Corentin (approve) / Claude (review) | 2026-10-26 |
| 2 | P13 | **a-p13-1023 (new).** +5% override on the 5 open next-30 nights **not** raised on 20 Oct: 25, 26 Oct and 19, 20, 21 Nov (£144/£150/£197/£216/£222 -> about £151/£158/£207/£227/£233), on both 3064856 and 3090701, keeping the twin gap. Leave the 11 nights raised +10% on 20 Oct as they are until 26 Oct. | PriceLabs 3064856 + 3090701 > Date-specific overrides | comp-west: next 30 £198.2 = P22 (-18.4% vs 2-bed P50 £243), booked 43-50% vs 36-40% market = rule +5%. The 11 nights raised on 20 Oct have had no booking since, so no extra step goes on them. 20 Nov (England v NZ eve) is £4 under its fortnight. Within £110-2,000. | **About £46 one-off.** 5% x 5 nights x £185.8 average (pickup 14 caps at 5). | Corentin | 2026-10-26 |
| 3 | P11 | **a-camden-dec (update).** (a) Is **18 Dec** meant to be in the +20% override (live 13-18 Dec, policy 13-17 Dec)? (b) Raise **14-16 Dec from +20% to +28%** (£308/£314/£327 -> about £329/£335/£349, against the £333 fortnight). (c) **New: 23 Dec +5%** (£340 -> about £357, against £356; darts round two, last session before the break). | PriceLabs 3064196 > Date-specific overrides | market.md §3: 13/14/15/16 Dec £2/£25/£19/£6 under = £52; 23 Dec £16 under. | **About £16 one-off.** £68 gap x W2 sell-through 3/13. | Corentin | 2026-10-26 |
| 4 | P11 | **t-p11-sync (new, critical).** (1) PriceLabs 3064196 > **Sync Now**, then check that 19-26 Nov turn open and occupancy drops from 63%. (2) Reset the orphan overrides: **18 Nov +30% min 1 -> -5% min 3** (matching 19-24 Nov; about £229) and **27 Nov +60% min 1 -> -2% min 2** (matching 25-26 Nov; about £361, still above the £307 daily P50 on a Blossoms night). (3) **Do not raise 19-26 Nov.** | PriceLabs 3064196 > Sync Now; Date-specific overrides | pricelabs.md CRITICAL 1: last refresh 22 Oct 08:37Z; 19-26 Nov still Booked, `user_price` -1. 27 Nov £589 is >P90 (+92% vs P50) and makes any 8-9 night stay ending on 28 Nov pay for it. 19-26 Nov average £282 vs daily P50 £286; demand normal to firm (ahead of last year on 9 of 10 nights). | Not quantified: no sell-through data for this run. At stake: 10 open nights listed at £2,955; the cancelled stay paid £1,736.41. | Corentin | 2026-10-24 |
| 5 | P11, P12, P13 | **a-bcom-cancel (update).** Still waiting on you: the flexible rate's free-cancellation window (free until how many days?). Then we size a tighter window. | Booking.com extranet > Property > Policies > flexible rate | channel.md §2: last 14 days 1 organic booking vs 4 cancellations = net -21 n / -£4,621. 365-day cancellation share 33% (nights 43%) vs Airbnb 17%. Today's two cancellations came 10 days (P12) and 27 days (P11) before check-in, and reopened 15 nights 9-35 days out. | Not quantified until the policy is known. Exposure: £5,093 cancelled in 14 days. | Corentin | 2026-10-26 |
| 6 | P20 | **a-p20 (update).** (1) **Why are 20-21 Nov blocked?** (England v NZ / The Script weekend; open at £299/£337 yesterday; no reservation, no override, no log.) If not intended, reopen them. (2) Send the end date of the 20% new-listing promo. (3) No price change while the promo runs (policy). (4) Source of the 4-night minimum on 4-6, 11-13 and 18-20 Dec (no override): set 3. Closed: the check that 28-30 Oct is closed, because PriceLabs now shows them Booked. | Smoobu calendar 3547481; PriceLabs 3547481 > min stay | occupancy.md, comp-east: 15% booked vs 35% market at P53 = fix-listing. 31-60: 7% vs 27% at P78 = rule -7%, not proposed (policy: promo). 11 event nights £248 under fortnight (market.md §3). | Not quantified: W1 pickup 5, W2 0. If reopened, 2 nights at £299/£337 list. | Corentin | 2026-10-24 |
| 7 | P04, P12 | **a-orphans (update).** (a) **P04 25 Oct min stay 3 -> 1** (£155). This must be done by 24 Oct or the night is lost. (b) **P04 2 Dec +200% -> 0%** (now £601, 3.1x its £192-£198 neighbours; about £200). (c) **P12 17 Nov +50% (£375, min 1): reset to 0%** or confirm it is intended. P11 18/27 Nov moved to row 4. | PriceLabs 3562176 / 2699998 > Date-specific overrides | pricelabs.md items 6, 7, 9. | Not quantified (no sell-through data on 1-night gaps). Up to £155 + about £200 one-off if they sell. | Corentin | 2026-10-24 |
| 8 | P04 | **a-p04-raise (update).** Remove the **-5% override on 1-24 Nov** (set 0%, keep min stay 3). Hold base £220. | PriceLabs 3562176 > Date-specific overrides | comp-east: next 30 £166.0 = P41 (-7.3% vs P50 £179), booked 25% vs 25% = rule +5%. The lead is 0 points, so +5% is the ceiling. It also narrows (does not close) the 7 P04 event nights in Nov that are £84 under their fortnight. | Not quantified (no P04 pickup history). | Corentin | 2026-10-26 |
| 9 | P12 | **a-p12-hold (new, advice).** Hold the £284 base. **Add no manual cut** on top of the -4% override and the Aggressive occupancy rule. If 1-7 Nov has no pickup by 28 Oct, review min stay 2 -> 1 on 1-7 Nov only. | PriceLabs 2699998 | comp-east, market.md §5: reopened 1-7 Nov average £201 (P42, -4.7% vs P50 £211), about what the cancelled guest paid (£197.55). 26-29 Oct already below P25. The occupancy and last-minute rules keep stepping prices down, so a manual cut would stack. Market occupancy is 4-21 points behind last year. | £0 (protects ADR). | Claude | 2026-10-28 |
| 10 | Portfolio | **a-airbnb-rules (update).** Waterford is explained. Send the **Airbnb Discounts screen** (and the Smoobu Airbnb default pricing rules) for **P05, P06, P08, P09, P12** first; P01 and P10 have no open nights. We need to see whether a last-minute discount sits on each. | Airbnb > Listing > Pricing > Discounts; Smoobu > Channel Manager > Airbnb > Default pricing rules | channel.md §3: forward Airbnb-led nights are -£4,690 vs PriceLabs after stay discounts (P06 -35.6%, P08 -38.7%, P09 -28.7%). There is no Airbnb booking yet made after 21 Oct to test. | Not quantified. | Corentin | 2026-10-26 |
| 11 | P11, P04 | **t-channel-gaps (update).** Camden: its last booking was made **4 Oct**, it lost 19-27 Nov, and it has 27 open nights before 18 Dec on a single channel. Relisting on Airbnb is the main volume lever. Barking's Airbnb account connection is still unconfirmed. | Airbnb (Camden listing); Smoobu > Channels | occupancy.md; policy `listing_facts.P11`: 30 Airbnb bookings before, last made 2 Jun. | Not quantified. | Corentin | 2026-10-30 |
| 12 | P13 | **a-p13-twin (update).** Add **+3% on 3090701 for 22 Nov-21 Dec** (identical to 3064856 on all 22 open nights). Likely cause: PriceLabs occupancy windows. From day 30 nothing keeps the twins apart, so every night that rolls past D+30 joins the identical block. | PriceLabs 3090701 > Date-specific overrides | comp-west twin check: gap +11.1% (0-14 days), +5.6% (15-29 days), 0.0% (30+ days); customizations and overrides identical. Policy `listing_facts.P13.twin_listings`. | Not quantified (protects against Airbnb duplicate blocking). | Corentin | 2026-10-24 |
| 13 | P04, info pack | **a-tidy (update).** The Barking Vrbo part is closed: 12038555 was pushed off on 22 Oct and removed from PriceLabs. Left to do: (1) confirm that Vrbo 12038555 is no longer live on Vrbo; (2) did someone delete the 10 listings, or did a connection drop them?; (3) drop the dead ids from `id_map.json`; (4) refresh `build/properties.py` (bases P01 £253, P05 £550 and 4 bedrooms, P06 £357, P09 £176, P11 £286, P12 £284, P14 £525; add P20). | Vrbo; PriceLabs; info pack | pricelabs.md HIGH 3, item 13. | Not quantified (hygiene). | Corentin / Claude | 2026-10-26 |
| 14 | P08 | **a-p08 (update, advice).** Hold to the 13 Nov handback. Make no manual change, even though open prices fell a further 5.4% without a logged change. | - | comp-central: 40.9% vs 50% market at <P25 = fix-listing 0%. 6 Nov 280 -> 203 is algorithmic. | £0. | Claude | 2026-10-26 |
| 15 | P12 | **a-p12-22oct: dismissed (expired).** The night of 22 Oct has passed without the change. | - | Valid on 22 Oct only. | £0. | Claude | - |

No proposed price is outside PriceLabs min/max. P14 is excluded by policy. Every row needs approval.

## Top 5 for today
1. **t-p11-sync**: Camden PriceLabs Sync Now, then reset 18 Nov (+30%) and 27 Nov (+60%, £589). 10 nights (£2,955 listed) are open, but PriceLabs still thinks 8 of them are booked.
2. **a-orphans (a)**: Barking 25 Oct min stay 3 -> 1 before tomorrow, or the night is lost.
3. **a-bcom-cancel**: tell us the flexible free-cancellation window. Booking.com is net -21 nights / -£4,621 over 14 days.
4. **a-p20**: why are Waterford 20-21 Nov blocked? It is the England v NZ / The Script weekend.
5. **a-review-1026**: hold all bases. P12 hold, with no manual cut on top. Judge P05/P06 on 26 Oct (2 bookings since 18 Oct vs 14 before).

## Growth plays

- **Booking.com volume and cancellations.** KPI: net Booking.com nights a week. Last 14 days: -21 nights. Booking.com is still 20.8% of forward stay revenue (£11,055 of £53,133, excluding P04; reservations.csv). Levers:
  - a tighter flexible window (row 5);
  - visible non-refundable value (the -10% rate already exists, per policy);
  - Camden back on Airbnb (row 11).
  - Target: net positive Booking.com nights every week by 2026-11-06.
- **Airbnb pace (watch).** Since the 21 Oct promotion removal there has been 1 Airbnb booking on 21-22 Oct, against about 2.3 a day on 9-19 Oct (channel.md §1). The 14-day total is still 3x the prior 14 days. If 23-25 Oct stay at 0-1 a day, treat it as a real slowdown at the 26 Oct review.
- **Review score.** KPI: rating. Portfolio Airbnb 4.4 / Booking 8.9 (info pack).
  - Per listing we only have P13 Booking 8.4 (15 reviews), P13 twin Airbnb 4.63 (8 reviews) and Camden Booking 8.0. P20 has no reviews yet.
  - `listings.csv` ratings are blank and there are no comp ratings, so the gap that caps our premium cannot be measured.
  - **Get the data:** Airbnb > Reviews and Booking.com extranet > Guest reviews, per listing.
  - Target 4.8 / 9.3 by 2027-01-31.
- **Listing conversion.** KPI: booked vs market on Soft units.
  - P20: 15% vs 35% at P53 (fix-listing). Photo order to match the parking/views title; first reviews from the 22-25 Oct and 28-31 Oct guests.
  - P08: 40.9% vs 50% at <P25 (fix-listing, but only 13 nights left).
  - P13's weak twin converts at 0.48% vs 2.26%.
  - Superhost / Preferred status: **get the data**.
- **Gap fill.** KPI: unsellable nights.
  - Today: P04 25 Oct (min 3).
  - Premium single nights: P04 2 Dec, P12 17 Nov; P11 18/27 Nov are now inside a run.
  - Proposed standing rule: 1-night gaps go to min stay 1 at no premium, and premiums are removed when a gap widens.
  - Mid-term (91+ nights): 0 on the books.
- **Direct share.** KPI: direct + website share of stay revenue.
  - **1.53%** of last-365 stays by arrival (Direct 0.38% + Website 1.15% of £387,929); **0%** of forward revenue (reservations.csv).
  - Direct nets £90 per £100 (config default, unconfirmed), against Booking.com £102 and Airbnb £84.50 before promotions and rules.
  - **Get the data:** the direct-site URL and booking engine.
- **Event compression.** KPI: open event nights below their fortnight. Today: **27 nights / £418** (22 Oct: 24 / £441). By flat:
  - P20: 11 / £248, left alone because of the promo (policy).
  - P04: 8 / £87, mostly closed by row 8.
  - P11: 5 / £68, row 3.
  - P08: 1 / £6.
  - P13: 2 / £9; 20 Nov is covered by row 2.
  - Ahead: NYE tickets on sale 23 Oct (P20 £630, P13 £392, already above). Bett 19-20 Jan: P20 sits only +£8 once the far-out premium falls away.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | **69.5%** (kpi_pack) | hold at least 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | **£173.34** | £190 | 2026-12-18 |
| RevPAR, last 30 | **£120.45** | £129 (68% x £190) | 2026-12-18 |
| Revenue, last 30 | £46,974.17 | £51,680 | 2026-12-18 |
| Booked next 30 (handback-aware) | **43.3%** (177/409), was 45.8% | each unit at least market + 10 points | 2026-10-26 |
| 7-day pickup | 7 bookings / 29 n / £8,209.68, all Airbnb; minus 2 Booking.com cancellations (15 n / £3,119.27) = net +14 n | net Booking.com nights positive each week | 2026-11-06 |
| Booking.com cancellation share | 33% of bookings (365 days) vs Airbnb 17% | at most 20% | 2027-01-31 |
| RGI | UNKNOWN: comps.csv empty, Competitor Listings not enabled | above 1.10 on every property | data 2026-10-30; target 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 (portfolio); per listing blank | 4.8 / 9.3, then top decile | data 2026-11-01; target 2027-01-31 |
| Direct share | 1.53% last 365; 0% forward | 5% | 2027-06-30 |
| Search placement | UNKNOWN (Camden 21 Oct: search views -64% vs market) | page 1 for area search | data source needed |

## Data gaps (get the data)

1. **P11 PriceLabs refresh.** Source: PriceLabs Sync Now on 3064196. Until then, kpi_pack `forward_occ_30/60` and pl_kpis `occupancy_next_30` for P11 are overstated.
2. **Booking.com flexible cancellation policy**, per property. Source: Booking.com extranet > Policies.
3. **P20 20-21 Nov block reason**, and the P05 27 Oct block reason. Source: Smoobu calendar notes / Corentin.
4. **Airbnb Discounts screens** for P05, P06, P08, P09, P12.
5. **Live OTA prices.** Airbnb and Booking.com are refused by the proxy (23 Oct 06:21Z), so `channel_checks.csv` is empty.
6. **Competitor Listings and per-listing ratings**, needed for RGI and the rating gap (t-comps).
7. **Pipeline issues:**
   - kpi_pack reports `market.csv` as empty, but the comp agents wrote 12 percentile rows at 06:23Z, after the pack was built.
   - kpi_pack is not handback-aware.
   - `prices.csv` has a blank `ref` for 3090701.
8. **How the 10 PriceLabs listings were removed.** PriceLabs logs no removal.
9. **P15-P19:** keys for the second account. **P03:** no reservation data.

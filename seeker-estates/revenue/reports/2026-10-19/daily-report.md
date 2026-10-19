# Seeker Estates - Daily revenue report, 2026-10-19

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs:
- `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`.
- `kpi_pack.json` and `kpi_summary.md`, rebuilt 06:14 UTC. The checks now use "pushed in the last day" and, for intentional blocks, the booked share of unblocked nights.
- `data/policy.json`, read first.
- Yesterday's `reports/2026-10-18/daily-report.md`.
- Window figures recomputed from `data/snapshots/2026-10-19/{prices.csv,reservations.csv}`.

Policy respected throughout:
- P02, P03, P06 and P07 are blocked on purpose and are not treated as lost demand.
- P14 numbers are reported only.
- Booking.com Visibility Booster commission is not flagged.
- 15% weekly and 20% monthly stay discounts are treated as expected.
- P13 is one flat.
- P05 is benchmarked as a 4-bed.

## Executive summary

1. **Last 30 nights** (13 Smoobu units, P13 combined, P20 included): occupancy 70.0%, ADR £177.48, RevPAR £124.24, revenue £48,452. **Next 29 nights:** 54.2% booked against a 38.1% market (11 unblocked units, simple mean). Demand is still ahead of the market. The rises made yesterday evening are about 9 hours old and have one booking since (P01 Dec), so they are **not judged today**. The review is on **26 Oct**.
2. **Biggest new money item: Airbnb bookings made since 1 Oct pay 23.4% below the PriceLabs price, after the 15%/20% stay discounts.** That is −£3,307 on 82 next-30 nights. Before 1 Oct the gap was −3.2%. Short stays with no stay discount are also 30–38% under (P02, P06, P08, P12, P20). So the cause is on the Airbnb side: a promotion, Smart Pricing, a Smoobu Airbnb adjustment, or discounts deeper than policy. Run-rate is about **£5,200 a month**, which is larger than every price move combined.
3. **Booking.com is on price.** Smoobu basePrice = 1.2000 × PriceLabs ADR on all 31 Booking nights, which is the +20% Smoobu markup. On that basis Booking is −0.3% (−£14). The pack's P11 (−19%) and P12 (−16%) "leaks" are a config artefact (`rm/config.py` still assumes 1.035).
4. **Disagreements between the rule and the specialists, resolved:**
   - P09 and P12: hold until 26 Oct, overriding the rule's +5% and +10% (reasons in the action table).
   - P10: the +5% is withdrawn. Nights 31–60 are 0/30 booked at 1-bed P75.
   - P13: +10% on next-30 open nights only. It is 55.2% booked vs 42% market at P27 (restated as one flat; yesterday's 6.9% is superseded).
   - P20: −7% on 18 Nov–18 Dec only. It is 10% booked vs 35% market. Near-term open prices are already at the 2-bed P50 (£254.6), so the listing (not price) is the fix there. 31–60 days out sits at P77.
5. **Double-booking risk on P13.** The Airbnb stay of 4–8 Nov (booked 18 Oct) still shows 4–7 Nov as open on Smoobu 3064856, in both pulls and live in PriceLabs. Check today.
6. **P05 is now a 4-bed in PriceLabs.** Its open price of £498 is P32 of the 4-bed market (P50 £589) while it is 65.5% booked vs 33%. If the 26 Oct review passes, the next step to £550 is worth about £701 a month. Hold until then.
7. **Still unmeasurable:**
   - RGI, because there is no market ADR. PriceLabs Competitor Listings is off and comps.csv is empty.
   - Per-listing ratings, which are blank.
   - OTA parity, because the sites are blocked.
   - Direct share: 1.34% of revenue, and 0% of forward revenue.
   - Five managed units (P15–P19), pending Corentin's keys.

## Reading notes and corrections to the sections

- **total_gbp excludes cleaning.** This was checked in reservations.csv:
  - P08's 8–14 Nov booking has total £776.46 and PriceLabs booked_adr £129.41 = 776.46 ÷ 6.
  - P01's new booking has commission £134.83 = 15.5% of (£720.90 + £149 cleaning).
  - So comp-central's "P08 £105/night" and comp-west's P13 realised rates (£100–159, −34% to −47%) subtract cleaning twice. The correct figures are P08 £129.41 (−38% vs £209 list) and P13 4–8 Nov £149.68 (−27%). The conclusion is unchanged, but the gaps are smaller. Channel.md's figures are the right basis.
- **Positioning basis.** There is no named comp set. Every percentile is a PriceLabs Nearby Listings bedroom-matched percentile (summary_table, horizon not stated). Ratings are blank, so `quality_premium` = 0 by default, not by evidence.
- **Expected-effect formula (used throughout).** Effect = price move % × average open PriceLabs price in the window × expected nights sold. Expected nights sold = nights picked up into that window by confirmed bookings made 19 Sep–19 Oct (30 days), capped at open nights. It assumes conversion holds and elasticity is not measured, so these figures are upper bounds. Windows: **W1 = 20 Oct–17 Nov, W2 = 18 Nov–18 Dec** (prices.csv).

| Ref | W1 open / avg £ / 30d pickup into W1 | W2 open / avg £ / 30d pickup into W2 |
|---|---|---|
| P01 | 0 / - / 14 | 19 / £284.5 / 13 |
| P04 | 14 / £178.6 / n/a (not in Smoobu) | 21 / £201.8 / n/a |
| P05 | 9 / £498.0 / 0 | 12 / £584.6 / 12 |
| P06 | 5 / £317.8 / 14 | 0 (blocked, policy) |
| P08 | 17 / £209.1 / 12 | 31 / £204.9 / 0 |
| P09 | 12 / £168.1 / 14 | 22 / £195.2 / 9 |
| P10 | 0 / - / 29 | 30 / £149.1 / 1 |
| P11 | 11 / £224.4 / 14 | 9 / £350.1 / 8 |
| P12 | 13 / £240.6 / 15 | 15 / £292.7 / 4 |
| P13 | 13* / £191.5 / 16 | 22 / £228.9 / 8 |
| P14 | 29 / £500.0 / 0 | 31 / £552.1 / 0 |
| P20 | 26 / £254.6 / 3 | 31 / £334.2 / 0 |

\*P13: 17 nights show as available on 3064856. 4 of them (4–7 Nov) are booked through the twin listing, so 13 are truly open.

## Since yesterday

Overall:
- No calendar night changed status on the 58 shared dates. Every forward move is the window rolling by one day.
- One new booking and no cancellations (occupancy.md).
- Yesterday's portfolio figures (67.5% / £177.24 / £119.64, 12 units) are not like-for-like with today's (70.0% / £177.48 / £124.24). The pack was rebuilt with P13 combined and P20 added.

| Ref | Since yesterday |
|---|---|
| P01 | Base £253 is live (pushed 18 Oct 20:40Z). +10% overrides on 16–17 Dec are live (£254 / £291, Smoobu = PriceLabs). **New booking:** Airbnb 18–21 Dec, 3 nights, £720.90 (£240.30/night), booked 19 Oct. 18 Dec (Horse Show + Kasabian) is now sold, so that event gap is closed. Fwd30 29/29 unchanged, fwd60 42→41 (window). Pace90 OTB 43→45 nights (£7,232.56). Not judged: review 26 Oct. |
| P02 | Intentional block (policy). Fwd30 9→8 (window). Vrbo copy 4438728 is still unsynced: last push 2026-02-24, now 237 days. |
| P03 | Intentional block. No reservation data. No change. |
| P04 | No change: fwd30 14/29 (48.3%) vs market 28%. Not in Smoobu. Vrbo copy 12038555 still pushes into a fully blocked calendar. |
| P05 | PriceLabs now shows 4 bedrooms (was 5). Base £500 is live (pushed 21:10Z). Open average next 30 is £498 = P32 of the 4-bed market (P50 £589, −15%). Fwd30 20→19 (window), 65.5% vs 33%. No booking since the raise: the £4,527.95 22–29 Dec booking was made before it. Paid rate is −3.3% vs expected, fully explained by the raise (+5.6% vs the 18 Oct price). |
| P06 | Base £357 is live. Blocked share 31.0%→34.5% (window). Booked share of unblocked nights is 73.7% vs market 43%. Open average £318 = P27. No booking since the raise. |
| P07 | Intentional block. No change. |
| P08 | Fwd30 13→12 (window): 41.4% vs market 50%, fwd60 20.3% vs 43%. **Nothing is booked after 13 Nov** (0/30 nights 18 Nov–17 Dec). Its last booking (8–14 Nov, made 17 Oct) pays £129.41/night vs £209 list (−38%, no stay discount applies). |
| P09 | Base £176 is live. Fwd30 17/29 unchanged (58.6% vs 38%). Now at P75 of the 1-bed market (P87 for 31–60 days out). No booking since the raise. |
| P10 | Fwd30 29/29 unchanged, all from one 32-night stay at £105.96/night. Nights 31–60: 0/30 booked vs 18.6% market at P75 of 1-bed. **Yesterday's +5% is withdrawn** (comp-west). |
| P11 | Base £286 is live. Darts override +10% on 12–18 Dec is live: 12 Dec £394, fixed vs the fortnight. 13–17 Dec are now level by weekday. Fwd30 17→18, because 17 Nov came in booked (62.1% vs 46%). No booking since the raise. |
| P12 | Base £284 is live. Fwd30 17→16 (window), 55.2% vs 40%. Price P64→P73 (P90 for 31–60 days out). Pace90 is still −10 nights / −25.2% revenue vs STLY. No booking since the raise. |
| P13 | **Restated as one flat:** 55.2% booked next 30 vs 42% market. Yesterday's 6.9% and "fix-listing" are superseded. Pickup 7d: 3 bookings / 12 nights / £2,012.35. 4–7 Nov is still open on 3064856 despite the 4–8 Nov Airbnb booking. |
| P14 | Special setup, numbers only: 0/60 booked, 40 of 60 open nights at the £500 minimum, market 42%. No change. |
| P15–P19 | Still in no system: second Smoobu and PriceLabs account, integration pending Corentin's keys. |
| P20 | New in the pack: 3/29 nights booked (10.3%) vs market 35%. 57 of 60 nights are open. Base £350 vs 2-bed P50 £254. The only booking made with notice (22–25 Oct) pays £179.28/night vs about £246 list (−27%, 3 nights, no stay discount). |

## Actions - 2026-10-19

Ranked by expected monthly £. Rows marked "not quantified" follow, ranked by risk.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P06, P10, P08, P01, P09, P02, P12, P20 (all Airbnb) | **t-airbnb-gap (new, critical).** For each listing, send screenshots of: Airbnb > Pricing & availability > Promotions and discounts (early-bird, last-minute, custom, new-listing); Weekly/Monthly % (must be exactly 15%/20% per policy); and the Smart Pricing toggle. Also send Smoobu > Channel Manager > Airbnb > price adjustment %. Remove any promotion or adjustment that is not intended. Start with P06, P10, P08 and P20. | Airbnb; Smoobu | Next-30 Airbnb nights after the stay-discount allowance: **booked since 1 Oct −23.4% on 82 nights (−£3,307); booked before 1 Oct −3.2% on 34 nights**. 1–6-night stays are −13.4% with no stay discount applying (P08 6n −38%, P20 3n −27%, P02 4n −37%). P10's 32-night stay is −33.6% vs the 20% policy, and P06's 11-night stay is −42% vs 15% (channel.md §1). Price drift from 18 to 19 Oct is only +0.7%, so it does not explain the gap. | **≈ £5,221/month** = £3,307 shortfall on bookings made 1–19 Oct × 30 / 19 days. It counts next-30 stays only. | Corentin | 2026-10-21 |
| 2 | P05, P11, P01, P09, P06, P12 | **a-review-1026 (new).** Hold every base raised on 18 Oct until 26 Oct (7 days). Then judge each unit on: **(a) booked next 30 vs market** must stay at least market + 10 points; **(b) 7-day pickup at the new price** (bookings made 19–26 Oct) must be at least half the pre-raise rate; **(c) paid ADR vs list**. Pre-raise rates (30d pickup × 7/30): P01 3.0 nights/wk (into W2), P05 2.8, P06 3.3, P09 5.4, P11 5.1, P12 4.4. If both (a) and (b) pass, the next step under `rm/positioning.py` is:<br>- P05 Base £500→**£550** (+10%; 4-bed P32→~P42, still below P50 £589)<br>- P11 £286→**£315** (+10%; open next 30 still <P25)<br>- P01 £253→**£278** (+10%; P33 next 30, P57 for 31–60)<br>- P09 £176→**£185** (+5%; rule at P75 is "test a step")<br>- P06 £357→**£375** (+5%; 5 open nights)<br>- P12 **hold** (see note)<br>All are within PriceLabs min/max (P05 max £2,500, P11 £1,200, P01 £650, P09 £550). | PriceLabs > Base Price | **Rule vs specialist.** The rule says raise now: P09 +5% (booked +21% at P75) and P12 +10% (booked +15% at P73). Comp-east says hold 7 days. **Resolved: hold.**<br>(i) Both raises are under 24 hours old, with 0 bookings since. Stacking a second move before any pickup leaves neither measurable.<br>(ii) P09 median lead is 18 days and P12's is 31 days, so 7 days already covers a large share of each booking window.<br>(iii) P09 Airbnb paid rate is −24% vs list, so list rises are not yet reaching realised ADR (action 1).<br>(iv) P12 is the only unit with STLY. Pace90 is −10 nights / −25.2% revenue, and 31–60-day prices are already at P90. The rule ignores pace, which is why I overrode it to +5% yesterday and hold it again today. | If every review passes: **≈ £1,868/month**.<br>- P05: 10% × £584.6 × 12 W2 nights = £701<br>- P11: 10% × (11 × £224.4 + 8 × £350.1) = £527<br>- P01: 10% × £284.5 × 13 = £370<br>- P09: 5% × (12 × £168.1 + 9 × £195.2) = £189<br>- P06: 5% × £317.8 × 5 = £79<br>- P12: £0 | Corentin (approve) / Claude (review) | **2026-10-26** |
| 3 | P13 | **a-p13-raise (new).** Date-specific override **+10%** on 31 Oct–3 Nov, 8–12 Nov and 17–18 Nov (10 open nights, about £189 → £207). Base £235 unchanged, because nights 31–60 are P53 and the rule there is "hold". Leave the close-in orphans (22 Oct, 25–26 Oct) to action 9. | PriceLabs 3064856 (and 3090701) > Date-specific overrides | One flat, combined calendar: 55.2% booked next 30 vs 42% market. Open average £188.6 = P27 of 2-bed (P50 £223). `recommend(0.552, 0.42, 0.27)` returns raise +10%; for 31–60 days (P53) it returns hold. 7d pickup is 3 bookings / 12 nights. | **≈ £192/month** = 10% × £191.5 × 10 nights (W1 pickup 16 ≥ 13 open, so all 10 counted as sold). | Corentin | 2026-10-26 |
| 4 | P01, P09, P11 | **a-events (new).** Event-night overrides, sized to the same-weekday average in market.md:<br>- P01 16 Dec (Horse Show) +10% → **+20%** (£254 → ~£277; Wed average £278)<br>- P09 18 Dec (Kasabian) new **+20%** (£169 → ~£203; Fri average £217)<br>- P11 18 Dec (darts) +10% → **+20%** (£324 → ~£353; Fri average £362)<br>All are within max. | PriceLabs > Date-specific overrides | These are VERIFIED events and the nights are open. market.md §5 identifies them as the real event shortfalls after the weekday check. P01's 18 Dec night is now booked, so it drops out. P11 13–17 Dec are level by weekday, so there is no change there. | **≈ £57 one-off** = Σ(Δ£ × W2 sell-through): P01 £23 × 13/19 + P09 £34 × 9/22 + P11 £29 × 8/9 = £16 + £14 + £26. | Corentin | 2026-10-26 |
| 5 | P13 | **t-p13-pricelabs (update).** Check in Smoobu that **3064856 is closed on 4–7 Nov on every channel**. The Airbnb booking 4–8 Nov was made 18 Oct, probably on 3090701. Then make PriceLabs read both listings' bookings: add 3090701 to PriceLabs or link the calendars. | Smoobu calendar 3064856; PriceLabs | 3064856 shows 4–7 Nov "available" (£199–£212) in the 18 Oct pull, the 19 Oct pull and a live read; last refreshed 18 Oct 09:25Z. Its other linked stays (27–30 Oct, 28 Nov–1 Dec) do show as Blocked. | Not quantified: double-booking risk on a confirmed £598.71 stay. | Corentin | 2026-10-20 |
| 6 | P20 | **a-p20 (new).** (a) Set date-specific overrides so 18 Nov–18 Dec prices fall **7%**: change the 18–30 Nov override from −2% to **−9%**, and add **−7%** on 1–18 Dec. The average open price goes from about £334 to about £311 (still above P50 £254). Base £350, min £220 and max £1,800 are unchanged, and nothing goes below the min. (b) Leave the next 30 nights' price level alone and work the listing: check Booking.com connection status, first photos and title, instant book, and the reviews count. (c) Send the Airbnb promotion screenshot (action 1): the 22–25 Oct stay paid £179.28 vs ~£246 list. | PriceLabs 3547481 > Date-specific overrides; Airbnb and Booking listing | 10.3% booked next 30 vs 35% market; 5.1% next 60 vs 27%. Next 30: open average £254.6 = P50, `recommend(0.103, 0.35, 0.50)` gives **fix-listing 0%**. 31–60 days: £332.6 = P77, `recommend(0.051, 0.27, 0.77)` gives **lower −7%**. 100% of bookings are Airbnb. P01, 0.67 km away, is 6–23% cheaper on the same nights and 100% booked. | Not quantified: 0 nights picked up into W2 in 30 days, so there is no rate to multiply. | Corentin | 2026-10-26 |
| 7 | P10 | **t-p10-leak (update).** **Withdraw "base £160 → £168 after 19 Nov"**: hold base £160. The Airbnb monthly discount check moves into action 1: the 32-night stay is 33.6% under list vs the 20% policy. On **2 Nov**, if 19 Nov–2 Dec is still 0 booked against the market, lower the base 7% (£160 → **£149**; min £85 unchanged). | PriceLabs 3318177 > Base Price (2 Nov only); Airbnb | Nights 31–60: 0/30 booked vs 18.6% market. Open average £149.1 = P75 of 1-bed (P50 £125). `recommend` gives fix-listing at P75 and lower −7% at P76. Next-30 100% is one stay at £105.96 (below P25), so it is not demand at list. Median lead is 12 days, so wait one more week before cutting. | Not quantified until 2 Nov: W2 pickup is 1 night in 30 days. | Corentin | 2026-11-02 |
| 8 | P08 | **a-p08 (update).** Hold price (`recommend` gives fix-listing 0%). Listing work: terrace in photo 1, title naming Emirates and Upper St, check instant book. Confirm the Airbnb promotion behind the £129.41/night 8–14 Nov stay (action 1) before any price cut. The fill target is 26 Oct–7 Nov (13 nights) and now also 18 Nov–17 Dec (0/30 booked). | Airbnb and Booking listing content | 41.4% next 30 vs 50% market, 20.3% next 60 vs 43%. Open average £209 = P45 (−4% vs P50 £217). Median lead 16 days vs a 28-day market window. | Not quantified. | Corentin | 2026-10-26 |
| 9 | P04, P11, P12, P13, P05 | **a-orphans (new).** Reset the premium orphan overrides to 0% and let PriceLabs price the night: P04 1 Nov (£462) and 2 Dec (£548); P11 18 Nov (£348, P83) and 27 Nov (£595); P12 17 Nov (£377, above daily P90 £320); P13 22 Oct (£211). Leave the 2–3-night gaps for P05 (28–30 Oct, 16–17 Nov, 7–8 Dec) at PriceLabs pricing. | PriceLabs > Date-specific overrides | pricelabs.md item 6, comp-east and comp-central. These nights also distort market.md's P04 fortnights. The pack's `gaps` field is empty for every unit. | Not quantified: no orphan sell-through data. | Corentin | 2026-10-26 |
| 10 | all Booking.com units | **t-config-bcom (new, Claude).** Set `rm/config.py` CHANNELS booking markup to the confirmed Smoobu +20% (factor 1.20 instead of 1.15 × 0.90), then rebuild the pack so `rate_leak_after_los` and `channel_economics` use it. | `rm/config.py`, `rm/analyse.py` | Smoobu basePrice = 1.2000 × PriceLabs ADR on all 31 Booking nights. On the Smoobu basis Booking is −0.3%. The pack shows P11 −18.8% and P12 −15.6%, which on the correct basis are −2.6% and −2.9%. | Not quantified: reporting accuracy, no revenue change. | Claude (after Corentin OK) | 2026-10-21 |
| 11 | P04 | **a-p04-raise (new).** Base Price £220 → **£242** (+10%). Min £90 and max £2,000 unchanged. | PriceLabs Channex 7dc96cda… > Base Price | 48.3% booked next 30 vs 28% market. Open average £178.6 = P59 of 2-bed (P50 £159). `recommend` gives raise +10% (kpi_pack). | Not quantified: not in Smoobu, so there is no pickup data. | Corentin | 2026-10-26 |
| 12 | P02 | **t-p02-vrbo (update).** No change since yesterday: Vrbo 4438728 is push-on, last push 2026-02-24 (237 days), `last_refreshed_at` null, "Fully Blocked". Reconnect it or switch push off. The P02 block itself is intentional. | PriceLabs > Vrbo account > 4438728 | pricelabs.md CRITICAL 1. | Not quantified (hygiene). | Corentin | 2026-10-25 |
| 13 | P04, P13, P06, P01, P08, P09, P10 | **a-tidy (update).** As before, switch off the duplicate PriceLabs copies. Add **P04 Vrbo copy 12038555**, which pushes into a 100% blocked calendar while the Channex listing shows 57%. Also refresh the info pack `build/properties.py`: P20 is missing, P05 is still "5-bed / £455", and the bases are stale. Separately, check that the 9 listings last pushed 18 Oct 06:43–10:14Z (P07, P14, P04 Vrbo, P10, P13 ×2, P08, P20, P13 Vrbo) pushed again today. | PriceLabs listings; `build/properties.py` | pricelabs.md items 4, 5 and 8. | Not quantified. | Corentin / Claude | 2026-10-25 |
| 14 | P15–P19 | **t-unmapped (update).** Still pending Corentin's API keys for the second Smoobu and PriceLabs account. Once connected, add them to `data/id_map.json` and the snapshot. | Second Smoobu / PriceLabs account | Every KPI for P15–P19 is UNKNOWN in the pack. | Not quantified. | Corentin | 2026-10-26 |

**Approval is needed for every row.** No proposed price is outside PriceLabs min/max. P14 is excluded by policy. Its rule output would be "lower −7%" (0% booked vs 42%, 66.7% of open nights at the £500 minimum), but no proposal is made.

**Closed today:** none. Every open dashboard id is still live and updated above (t-p10-leak is changed in substance).

## Growth plays

- **Rate integrity (KPI: Airbnb paid rate vs list, target within −2% after stay discounts by 2026-11-02).**
  - Action 1 is worth more than all price moves together.
  - Once the promotion source is found, move any intended long-stay discount into PriceLabs so it is visible and capped at the policy 15%/20%.
  - The Airbnb shortfall since 1 Oct is −23.4%; the target is ≥ −2%.
- **Review score (KPI: rating).**
  - The info pack gives Airbnb 4.4 / Booking 8.9 portfolio-wide. Per-listing ratings are blank in `listings.csv`, and there are no comp ratings because PriceLabs Competitor Listings is off. So the rating gap, and the premium it caps, are **unknown**.
  - **Get the data:** per-listing rating and review count from the Airbnb host dashboard > Reviews and the Booking extranet > Guest reviews, loaded into `listings.csv`. Enable PriceLabs Competitor Listings (or a Market Dashboard) for comp ratings.
  - P20's review count is the first one needed, because its conversion problem is likely review-driven.
  - Target: Airbnb ≥ 4.8 / Booking ≥ 9.3 portfolio. The real top-decile threshold will be set once comp ratings are in (by 2026-11-01).
- **Listing conversion (KPI: MPI on fix-listing units).**
  - P08: MPI 0.83, at P45. P20: MPI 0.29, at P50. Both get photos, titles and instant-book checks.
  - P20 needs a Booking.com connection check: 100% of its bookings are Airbnb, while P12 earns 90% of its revenue on Booking.
  - Superhost, Preferred and instant-book status are in no feed. **Get the data** from the Airbnb and Booking listing settings.
- **Length of stay, gap fill, mid-term (KPI: open nights in the next 30 on soft units).**
  - Orphans: action 9.
  - Open runs to fill: P08 26 Oct–7 Nov (13 nights); P04 7–24 Nov (18); P13 17–27 Nov (11); P09 25–31 Oct (7).
  - Mid-term (91+ nights): 0 stays on the books.
  - Long stays currently realise the deepest discounts (Airbnb 7–27 nights −36% vs list in total). So mid-term should only be sold on P08, P20 and P10's W2 block, and only at or above the unit's last-30 ADR (P08 £168.64, P10 £112.55), once action 1 has fixed the discount stack.
- **Direct-booking share (KPI: direct share of revenue).**
  - Direct is 1.34% of confirmed revenue (4 bookings) and **0% of forward revenue** (39 future bookings, £60,237). The last direct booking was 30 Sep.
  - Airbnb's observed commission is 15.5% of (base + cleaning), about 17% of base.
  - Moving 1 point of the last-365 revenue from Airbnb to direct is worth about **£637 a year** = £374,425.81 × 1% × 17%. Direct-site costs are unknown, so this is an upper bound.
  - **Get the data:** the direct-site URL and booking engine, added to `channel_checks.csv`, so the "direct is cheapest" rule can be tested.
- **Event compression (KPI: event-night price vs same-weekday average).**
  - Action 4 covers the verified shortfalls inside the 60-day window.
  - prices.csv stops at 18 Dec, so darts after 18 Dec, Horse Show 19–20 Dec and the PriceLabs NYE surge (+11.2% occupancy, +22.2% price, 27 Dec–1 Jan) cannot be checked.
  - **Get the data:** extend the snapshot to 180 days.
  - Bett UK (ExCeL, 20–22 Jan 2027) is for the next run.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | 70.0% (kpi_pack) | hold ≥ 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | £177.48 | £190 | 2026-12-18 |
| RevPAR, last 30 | £124.24 | £129 (68% × £190) | 2026-12-18 |
| Booked next 29 nights vs market (11 unblocked units) | 54.2% vs 38.1% (portfolio incl. blocked units 48.0%, 195/406) | ≥ market + 10 points after the raises | 2026-10-26 |
| Airbnb paid rate vs list after stay discounts | −23.4% on bookings since 1 Oct | ≥ −2% | 2026-11-02 |
| RGI | UNKNOWN: no market ADR (CCC off, no Market Dashboard) | > 1.10 on every property | data by 2026-10-26; target by 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 portfolio (info pack); per-listing blank | ≥ 4.8 / 9.3, then top decile once comp ratings are connected | data by 2026-11-01 |
| Direct share of revenue | 1.34% (forward 0%) | 5% | 2027-06-30 |
| Search placement | UNKNOWN: no OTA ranking feed | top of page 1 for the area search | data source needed |

## Data gaps (get the data)

1. Market ADR, RGI and ARI: no market ADR feed. Enable PriceLabs Competitor Listings or a Market Dashboard.
2. Named comp set and comp ratings: comps.csv is empty.
3. OTA displayed prices, parity and discount stack: channel_checks.csv is empty, and Airbnb, Booking and Vrbo are blocked from this environment.
4. Airbnb promotion settings, Smart Pricing and the Smoobu Airbnb adjustment: screenshots needed (action 1).
5. Per-listing ratings and review counts: blank in listings.csv.
6. P03 and P04 reservations: not in Smoobu (Channex). P04 prices on the OTAs are unknown.
7. P15–P19: second account, keys pending.
8. STLY exists only for P12, so pace is unknown for 12 units.
9. prices.csv covers 60 days (to 18 Dec): no 180-day checks and no Christmas/NYE.
10. No price-at-booking history (snapshots start 18 Oct).
11. P13 twin 3090701 prices are not in the snapshot, and PriceLabs freshness for 3064856 is 18 Oct 09:25Z.
12. P20 go-live date, postcode and info-pack record.
13. Reason for P05's blocked night in the next 30.
14. reservations.csv has no booking ID or cancellation date, and booked_on has no time.
15. Booking.com cleaning_gbp is blank on every row.
16. Direct-site URL and booking engine.

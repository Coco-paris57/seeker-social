# Seeker Estates - Daily revenue report, 2026-10-20

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval.**

Inputs:
- `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`.
- `kpi_pack.json` and `kpi_summary.md` (built 06:06 UTC).
- `data/policy.json` (read first) and `reports/2026-10-19/daily-report.md`.
- Window figures below recomputed from `data/snapshots/2026-10-20/{prices.csv,reservations.csv}`.

Policy respected: P02/P03/P06/P07 blocks are intentional and are not counted as lost demand. P14 gets numbers only. Visibility Booster commission is not flagged. The 15% weekly / 20% monthly stay discounts are treated as expected. P13 is one flat. P05 is benchmarked as a 4-bed.

## Executive summary

1. **Last 30 nights** (13 Smoobu units): occupancy 70.3%, ADR £173.85, RevPAR £122.14, revenue £47,634. The 19 Oct figures were 70.0% / £177.48 / £124.24; the change is only the window moving by a day. **Next 29 nights:** 53.9% booked vs a 37.5% market (simple mean of the 11 unblocked units). **No new confirmed booking since yesterday.** The only booking made since the 18 Oct rises is P01 18-21 Dec, which was already counted yesterday.
2. **The 18 Oct rises are about 33 hours old, so it is too soon to judge them** (occupancy.md: 1 booking after the raise vs a baseline of 35 bookings in 30 days across the six units). The review stays on **26 Oct**. On price, P01, P09, P11 and P12 are holding at +4% to +12% vs 18 Oct. **P05 and P06 have fallen back below where they were before the raise** (P05 −3.0%, P06 −3.4%; pricelabs.md §2). No setting was changed: PriceLabs recalculated on its own at 19 Oct 09:38Z.
3. **P05 is the biggest pricing problem today.** Its open nights average £439 vs a date-matched 4-bed P50 of £543 (bottom quartile), while it is 65.5% booked vs a 33% market. Until the cause of the drop is known, the 26 Oct review cannot test the P05 rise. P05 therefore leaves the review and gets its own task (t-p05-drop).
4. **P20 moved the wrong way overnight.** With no setting change, prices on 25 Oct-3 Nov rose 15-18% while the unit is 13.8% booked vs a 34% market. The Airbnb stay of 10 Oct now ends 22 Oct, but its total is unchanged at £1,854.40. A direct booking for 18-22 Oct (£927.20) was created and then cancelled.
5. **The Airbnb rate gap is unchanged like-for-like:** −23.0% vs the 18 Oct anchor, −£3,188 on 82 next-30 nights, a run-rate of **£4,782/month**. It is still the largest money item. The new P01 Dec booking paid 14.2% under the PriceLabs price on a 3-night stay, where no stay discount applies, so the gap is still happening.
6. **Closed:** the P13 4-8 Nov sync problem fixed itself. 4-7 Nov is now Blocked on 3064856, because the booking sits on twin 3090701 (pricelabs.md "Resolved"). t-p13-pricelabs can close.
7. **Booking.com +20% markup (1.2000×) is still unconfirmed.** Until Corentin confirms it, the £1,120 Booking.com shortfall on next-30 nights (channel.md §3) is provisional.

## Effect so far of the 18 Oct base rises

Sources: pricelabs.md §2 (prices on the same open nights), occupancy.md (bookings made on or after 18 Oct), comp sections (percentiles).

| Ref | Base | Open-night price vs 18 Oct / vs 19 Oct | Bookings since raise | Booked next 30 vs market | Position now | Read |
|---|---|---|---|---|---|---|
| P01 | £230→£253 | +9.7% / −1.4% (18 nights) | **1**: Airbnb 18-21 Dec, 3 n, £720.90 = £240.30/n (−14.2% vs PriceLabs £280; no comparable from before the raise) | 100% vs 33% | 31-60 days P55 (+4.6% vs P50 £269) | Rise is live. Nothing is open in the next 30. Hold to 26 Oct. |
| P05 | £455→£500 | **−3.0% / −11.2%** (20/21 nights) | 0 (the 22-29 Dec booking was made before the raise) | 65.5% vs 33% | Next 30: £439 vs 4-bed P50 £543, <P25 | **Rise cancelled out by PriceLabs' own price** (uncustomized_price −9.4%). See t-p05-drop. |
| P06 | £340→£357 | **−3.4% / −8.1%** (4 nights) | 0 | 78% of unblocked nights vs 43% | £302 <P25 (−26%) | Only 4 open nights. Hold to 26 Oct. |
| P09 | £160→£176 | +8.2% / −1.5% | 0 | 58.6% vs 38% | P70 next 30, P83 for 31-60 days; base is £14 above PriceLabs' recommended £162 | Hold to 26 Oct. |
| P11 | £260→£286 | +11.7% / −1.5% (comp-central +8.4%) | 0 | 62.1% vs 46% | Next 30 <P25 (−23%); 60 days P43 | Rise is holding. Hold to 26 Oct. |
| P12 | £270→£284 | +4.2% / −3.3% | 0 | 55.2% vs 40% | P68 next 30, P85 for 31-60 days | **Pace90 worsened to −13 nights / −29.1%** (from −25.2%). Hold; decide on 26 Oct. |

## Since yesterday (per property)

| Ref | Change since 19 Oct |
|---|---|
| P01 | 18 Dec now shows Booked in PriceLabs (the 18-21 Dec booking). Fwd30 29/29, fwd60 41. The +10% overrides on 16-17 Dec are live (£255 / £292). |
| P02 | Intentional block. Fwd30 8→7 (window). Vrbo copy 4438728 is still unsynced, last push 24 Feb (238 days). |
| P03 | Intentional block. No reservation data. |
| P04 | 21 Oct is now unavailable with no Booked/Blocked label (reason not in data). 48.3% vs 27% market, P54 next 30, P70 for 31-60 days. November event nights fell £10-28 (algorithm). |
| P05 | Open prices fell 11.2% with no setting change. A +100% override on 29 Dec (set 18 Oct) was found; its price is outside the window. 27 Oct is still Blocked, reason unknown. |
| P06 | 4 open nights −8.1% (algorithm). Last-30 occupancy 76.7%→73.3% (window). |
| P07 | Intentional block. No change. |
| P08 | Fwd30 12→11 (37.9% vs 49%), fwd60 18.6% vs 43%. P39 (−9% vs P50 £221). Nights 21 Oct-3 Nov are 5-9% lower (algorithm). |
| P09 | No booking. Near-date prices −£2-11. Position P75→P70 next 30. |
| P10 | No change: 100% next 30 (one 32-night stay at £105.96). Nights 31-60 are 0/30 booked; position P75→P67. |
| P11 | No booking. 18 Dec £324→£354 (yesterday's gap there is now closed). 18 Nov orphan £348→£317. |
| P12 | No booking. 31-60-day average £292.7→£279.5 (P90→P85). Pace90 −29.1%. |
| P13 | 4-7 Nov is now closed (sync resolved). Open average £188.6→£185.6 while P50 rose £223→£228, so P27→**P24**. Yesterday's +10% was not applied. Twin 3090701 lists 8.5% above 3064856 on the same nights. |
| P14 | Special setup, numbers only: 0/60 booked, 39/60 open nights at the £500 minimum, market 41%. |
| P15-P19 | Not connected (second account). |
| P20 | Airbnb stay 10 Oct now ends 22 Oct (total unchanged at £1,854.40). Direct booking 18-22 Oct (£927.20) created and cancelled. 21 Oct shows Booked in PriceLabs at £231.80. Prices on 25 Oct-3 Nov rose 15-18% with no logged change; next 30 moved from P47 to **P56**. |

## Actions - 2026-10-20

**Windows.** W1 = 21 Oct-18 Nov and W2 = 19 Nov-19 Dec, from prices.csv.

**Formula used throughout.** Expected effect = price move % × average open PriceLabs price in the window × expected nights sold. Expected nights sold = nights that confirmed bookings made 20 Sep-19 Oct (30 days) placed in that window, capped at the open nights.

**These are upper bounds:** elasticity is not measured.

| Ref | W1 open / avg £ / 30d pickup | W2 open / avg £ / 30d pickup |
|---|---|---|
| P01 | 0 / - / 19 | 18 / £281.5 / 13 |
| P04 | 13 / £172.8 / n/a | 21 / £203.2 / n/a |
| P05 | 9 / £439.3 / 1 | 13 / £528.8 / 11 |
| P06 | 4 / £302.2 / 14 | 0 (blocked, policy) |
| P08 | 18 / £201.3 / 11 | 31 / £207.0 / 0 |
| P09 | 12 / £162.2 / 15 | 23 / £193.6 / 8 |
| P10 | 0 / - / 29 | 31 / £147.8 / 0 |
| P11 | 11 / £230.2 / 14 | 8 / £352.8 / 1 |
| P12 | 13 / £236.7 / 15 | 15 / £279.5 / 0 |
| P13 | 14 / £185.6 / 14 | 22 / £232.0 / 8 |
| P20 | 25 / £274.4 / 4 | 31 / £337.5 / 0 |

Ranked by expected monthly £. Rows marked "not quantified" follow, ranked by risk.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | P06, P10, P08, P01, P09, P12, P02, P20 | **t-airbnb-gap (update, critical).** For each listing, send screenshots of Airbnb > Pricing > Promotions and discounts (early-bird, last-minute, custom, new-listing), Weekly/Monthly % (must be exactly 15%/20%) and the Smart Pricing toggle. Also send Smoobu > Channel Manager > Airbnb price adjustment %. Remove anything not intended. Start with P06, P10, P08, P01. | Airbnb; Smoobu | channel.md §1: Airbnb bookings made since 1 Oct are **−23.0% vs the 18 Oct anchor, −£3,188 on 82 next-30 nights**; like-for-like unchanged since yesterday. Bookings made before 1 Oct: +1.6%. By stay length after the stay-discount allowance: 1-6 nights −14.8%, 7-27 nights −28.8%, 28+ nights −17.5%. Biggest: P06 −£1,054, P10 −£627, P08 −£481, P01 −£461. New P01 18-21 Dec booking −14.2% (3 nights, no stay discount). | **≈ £4,782/month** = £3,188 × 30 / 20 booking days since 1 Oct (channel.md). | Corentin | 2026-10-22 |
| 2 | P11, P12 (all Booking units) | **t-bcom-markup (new).** Confirm the Smoobu Booking.com price adjustment is **+20%** (send Smoobu > Channel Manager > Booking.com screenshot). If yes, check the Booking extranet > Promotions on P11 and P12 for Early Booker / Mobile / Country rate / Basic Deal stacking with Genius. | Smoobu; Booking extranet | Smoobu basePrice = 1.2000 × PriceLabs on every Booking night (channel.md, config changed 19 Oct without your confirmation). On that basis Booking next-30 is −18.7% vs 18 Oct, **−£1,120 on 28 nights** (P11 −£638, P12 −£292). The P11 3-10 Nov stay is −44%, deeper than any single promotion. If the 1.2 is not a markup, Booking is about on price. | Up to **£1,120 on the next 30 nights** if the markup is confirmed; monthly run-rate not computed. | Corentin | 2026-10-22 |
| 3 | P20 | **t-p20-stay (new).** In Smoobu, open the Airbnb reservation of 10 Oct: it now ends 22 Oct (12 nights) but the total is still £1,854.40. Confirm whether the 4 extra nights (18-21 Oct) were paid. Then check the PriceLabs calendar on 18-21 Oct, which still shows 21 Oct Booked at £231.80, the rate of the cancelled direct booking. | Smoobu reservation; Airbnb reservation; PriceLabs calendar 3547481 | occupancy.md, channel.md §2: extension with unchanged total. A direct booking 18-22 Oct £927.20 was created and cancelled 19 Oct. No confirmed row holds revenue for 18-21 Oct. | Up to **£927.20 one-off** (4 nights at the cancelled direct rate of £231.80) if the nights are unpaid. | Corentin | 2026-10-21 |
| 4 | P01, P09, P11, P06, P12 | **a-review-1026 (update).** Keep holding the 18 Oct bases until 26 Oct. **P05 moves out** (its rise is not live on price; see #5). On 26 Oct a unit passes if (a) booked next 30 is still ≥ market + 10 points and (b) bookings made 19-26 Oct give at least half the pre-raise 7-day rate. If both pass:<br>- P11 £286→**£315** (+10%)<br>- P01 £253→**£278** (+10%)<br>- P09 £176→**£185** (+5%)<br>- P06 £357→**£375** (+5%)<br>- P12: decide on 26 Oct (no rise)<br>All are within max (P11 £1,200, P01 £650, P09 £550). | PriceLabs > Base price | Effect table above: no bookings since the raise on P06/P09/P11/P12, one on P01. The baseline is 35 bookings in 30 days across the six units (occupancy.md), so 1.5 days is too short to judge. **Rule vs hold:** `recommend` says raise now (P01 31-60 days +10%, P09 +10%, P11 +10%, P12 +10%). The hold stands because a second step before any pickup would make neither step measurable. P12 pace90 is now −29.1%, so the rule's raise is overridden. | **≈ £889/month if all pass:**<br>- P11 10% × (11 × £230.2 + 1 × £352.8) = £289<br>- P01 10% × £281.5 × 13 = £366<br>- P09 5% × (12 × £162.2 + 8 × £193.6) = £175<br>- P06 5% × £302.2 × 4 = £60<br>- P12 £0 | Corentin (approve) / Claude (review) | 2026-10-26 |
| 5 | P05 | **t-p05-drop (new).** (1) PriceLabs 3166592 > Calendar > price breakdown on **28 Oct, 16 Nov and 30 Nov**: find which factor cut the algorithm price (28 Oct £548→£458). Also check which comp set / bedroom band it now uses. (2) If no setting error is found, **Base £500→£550** now, without waiting for 26 Oct. Min £150 / max £2,500 unchanged. | PriceLabs 3166592 | pricelabs.md HIGH 2: open nights −11.2% overnight (−3.0% vs before the raise). 85% of the fall is in uncustomized_price; recalculated 19 Oct 09:38Z; no log entry. comp-central: next-30 open average £439 <P25 vs 4-bed P50 £590 (−26%). 65.5% booked vs 33% market (MPI 1.98). `recommend(0.655, 0.33, 0.20)` = **raise +10%**. comp-central's supported position is −15% to −20% vs P50; +10% takes the next-30 average to about £483 (−18%). | **≈ £626/month** = 10% × £528.8 × 11 W2 nights + 10% × £439.3 × 1 W1 night. | Corentin | 2026-10-22 |
| 6 | P13 | **a-p13-raise (update).** Date-specific override **+10%** on the 11 open nights 31 Oct-3 Nov, 8-12 Nov and 17-18 Nov on 3064856 (average £187→~£206). Base £235 unchanged (nights 31-60 are P51, rule says hold). Set the same nights on twin 3090701, which already lists 8.5% higher. | PriceLabs 3064856 (+3090701) > Date-specific overrides | comp-west: one flat, 51.7% booked next 30 vs 41% market, open average £185.6 = **P24** (−18.6% vs 2-bed P50 £228; was P27 yesterday). `recommend` = raise +10%. Not applied yet (no log entries). | **≈ £206/month** = 10% × £187.1 × 11 nights (W1 pickup 14 ≥ 14 open, so all counted as sold). | Corentin | 2026-10-26 |
| 7 | P01, P09, P11 | **a-events (update).** Event nights still below their fortnight (market.md §3):<br>- P01 **1-2 Dec** (Phoebe Bridgers, O2) new **+10%** (£254/£269 vs £289); **16 Dec** Horse Show +10%→**+20%** (£255→~£278 vs £275)<br>- P09 **1, 2, 17 Dec** (Phoebe, Greg Davies) new **+5%** (£188/£186/£170 vs £199/£199/£182)<br>- P11 **13-17 Dec** darts +10%→**+20%** (£283-312 vs £331)<br>Dropped from yesterday: P09 18 Dec (now level at £180) and P11 18 Dec (now £354, closed). | PriceLabs > Date-specific overrides | All events VERIFIED 20 Oct. PriceLabs labels P11 13-17 Dec and P01 14-17 Dec "Low Demand": it does not see darts / Horse Show. Rule sizing: P01 31-60 days and P11 = raise +10%; P09 31-60 days at P83 = +5% only. | **≈ £80 one-off** = Σ Δ£ × W2 sell-through:<br>- P01 (£25 + £27 + £23) × 13/18 = £54<br>- P09 (£9 × 3) × 8/23 = £9<br>- P11 (£27 × 5) × 1/8 = £17 | Corentin | 2026-10-26 |
| 8 | P20 | **a-p20 (update).** (a) Undo the overnight rise on shoulder nights: change the **20-31 Oct override −4%→−15%** (about 25-31 Oct back to the 19 Oct level, e.g. 28 Oct £266→~£236). Leave 1-3 Nov (WTM / Stevie Wonder, priced above fortnight). (b) 19 Nov-18 Dec: change the 1-30 Nov override −2%→**−9%** from 18 Nov, and add **−7%** on 1-18 Dec. (c) Listing work: photos, title, Booking.com connection. Min £220 / base £350 / max £1,800 unchanged; the lowest result is about £235, above the min. | PriceLabs 3547481 > Date-specific overrides; Airbnb / Booking listing | pricelabs.md HIGH 3 and market.md §4: 25 Oct-3 Nov rose 15-18% with no logged change. Next 30: 13.8% booked vs 34% market at **P56** (was P47); 31-60 days: £337.5 = P78, 0 booked. `recommend` gives fix-listing (next 30) and **lower −7%** (31-60). **Override of the next-30 "0%":** the move to P56 came from the algorithm, not from demand, so (a) only returns those nights to the position the rule assessed yesterday. P01, 0.67 km away, is cheaper on every shared date and 100% booked. | Not quantified: 0 nights picked up into W2 in 30 days and 4 into W1, so there is no reliable rate to multiply. | Corentin | 2026-10-26 |
| 9 | P04, P11, P12, P13 | **a-orphans (update).** Reset the premium overrides on single open nights to **0%**: P04 1 Nov +150% (£475) and 2 Dec +200% (£551); P11 18 Nov +30% (£317) and 27 Nov +60% (£595); P12 17 Nov +50% (£373, above 2-bed P90 £294); P13 22 Oct +40% (£199). | PriceLabs > Date-specific overrides | pricelabs.md MEDIUM 6 (confirmed live). These are min-stay-1 nights priced to stay empty. | Not quantified: no orphan sell-through data. | Corentin | 2026-10-26 |
| 10 | P04 | **a-p04-raise (update).** Base £220→**£242** (+10%). Min £90 / max £2,000 unchanged. | PriceLabs Channex 7dc96cda > Base price | comp-east: 48.3% booked vs 27% market; P54 next 30, P70 for 31-60 days; `recommend` = raise +10% / +10%. PriceLabs' recommended base is £228. Our own −3% overrides sit on 8 verified event nights (market.md §4). | Not quantified: P04 is not in Smoobu, so there is no pickup data. | Corentin | 2026-10-26 |
| 11 | P08 | **a-p08 (update).** Hold price (`recommend` = fix-listing 0%). Work the listing (terrace in photo 1, title naming Upper St / Emirates, instant book). Consider removing our own −5% override only on verified event nights 24 Nov, 9 Dec and 13-17 Dec. | Airbnb / Booking listing; PriceLabs overrides | comp-central: 37.9% vs 49% next 30, 18.6% vs 43% next 60, P39 (−9% vs P50 £221). market.md: the −5% override puts darts nights £8-14 below the PriceLabs default. | Not quantified (W2 pickup 0). | Corentin | 2026-10-26 |
| 12 | P10 | **t-p10-leak (update).** Hold base £160. On **2 Nov**, if 19 Nov-2 Dec is still empty, Base £160→**£149** (−7%). | PriceLabs 3318177 > Base price | comp-west: nights 31-60 0/30 vs 18.7% market at P67 (`recommend` = fix-listing 0%). Median lead 12 days. Next 30 is one stay at £102/night excl. cleaning. | Not quantified until 2 Nov (W2 pickup 0). | Corentin | 2026-11-02 |
| 13 | P02 | **t-p02-vrbo (update).** Reconnect Vrbo 4438728 or switch its push off. | PriceLabs > Vrbo 4438728 | pricelabs.md CRITICAL 1: push on, last push 24 Feb (238 days), fully blocked. | Not quantified (hygiene). | Corentin | 2026-10-25 |
| 14 | P04, P13, P06, P01, P08, P09, P10 | **a-tidy (update).** Switch off duplicate copies (incl. P04 Vrbo 12038555, fully blocked while Channex shows 71% / 50% / 42% for next 7/30/60). Align P13 twin prices (3090701 +8.5% vs 3064856). Refresh `build/properties.py` (P20 missing, P05 "5-bed £455", stale bases). | PriceLabs > Listings; info pack | pricelabs.md MEDIUM 5 and 8; comp-west twin gap. | Not quantified. | Corentin / Claude | 2026-10-25 |
| 15 | P13 | **t-p13-pricelabs: close.** 4-7 Nov is now Blocked on 3064856 (booking on 3090701). | - | pricelabs.md "Resolved since 19 Oct". | - | - | - |
| 16 | P15-P19 | **t-unmapped (no change).** Second Smoobu / PriceLabs account keys still pending. | Env vars + connectors | All KPIs UNKNOWN. | Not quantified. | Corentin | 2026-10-26 |

**Approval is needed for every row.** No proposed price is outside PriceLabs min/max. P14 is excluded by policy.

## Growth plays

- **Rate integrity (KPI: Airbnb paid rate vs list after stay discounts).** −23.0% today (bookings since 1 Oct); target ≥ −2% by 2026-11-02. Action 1 is worth more than every price move combined (£4,782 vs about £1,800/month for all quantified price rows).
- **Review score (KPI: rating).** The info pack gives Airbnb 4.4 / Booking 8.9 portfolio-wide. Per-listing ratings are blank in `listings.csv`, and comp ratings are unavailable (Competitor Listings off), so the gap is **unknown** and `quality_premium` = 0 by default. **Get the data:** per-listing rating and review count from the Airbnb host dashboard > Reviews and the Booking extranet > Guest reviews. Start with P20 (2 bookings ever) and P08. Target: ≥ 4.8 / 9.3 by 2027-01-31, then top decile once comp ratings exist.
- **Listing conversion (KPI: MPI on fix-listing units).** P20 MPI 0.41 at P56, 100% Airbnb. P08 MPI 0.77 at P39. P10 31-60 days 0% at P67. Photos, title, instant book, Booking.com connection for P20. Superhost / Preferred status is in no feed: **get the data** from the Airbnb and Booking settings.
- **Length of stay and gap fill (KPI: open nights next 30 on soft units).** No orphan gaps below min stay (pack `gaps: []`). Single nights to free up: action 9. Open runs to fill: P08 18 open in W1 and 31 in W2; P20 25 in W1; P04 13 in W1. Mid-term (91+ nights): 0 on the books. Long stays currently realise the deepest discounts (7-27 nights −28.8% beyond policy), so do not push mid-term until action 1 is resolved.
- **Direct share (KPI: direct share of revenue).** Direct + Website = 1.5% of last-365 stay revenue (Direct 0.38% + Website 1.16%, by arrival date). **Forward 0%** of £60,237 on the books. The only new direct booking (P20) was cancelled. Net per £100 base: Airbnb realised about £82.80, Direct £90 (config default, unconfirmed). **Get the data:** direct-site URL and booking engine for `channel_checks.csv`.
- **Event compression (KPI: event-night price vs fortnight).** 44 open nights are £852 below fortnight (market.md §3), up £58 overnight. By submarket: East £508, Central £327, West £17. Action 7 covers the rule-sized ones. P20's event nights are left alone because the unit is priced above demand overall. NYE is priced strongly (P01 31 Dec £467 vs £260; P20 £624 vs £365). **Get the data:** a 180-day snapshot (prices.csv stops 19 Dec).

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (13 Smoobu units) | 70.3% (kpi_pack) | hold ≥ 68% while ADR rises | 2026-11-17 |
| ADR, last 30 | £173.85 | £190 | 2026-12-18 |
| RevPAR, last 30 | £122.14 | £129 (68% × £190) | 2026-12-18 |
| Booked next 29 nights vs market (11 unblocked units, mean) | 53.9% vs 37.5% | ≥ market + 10 points after the raises | 2026-10-26 |
| Airbnb paid rate vs list after stay discounts | −23.0% (bookings since 1 Oct, 18 Oct anchor) | ≥ −2% | 2026-11-02 |
| RGI | UNKNOWN: no market ADR (Competitor Listings off, market.csv missing from the pack) | > 1.10 on every property | data by 2026-10-26; target 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 (info pack); per-listing blank | ≥ 4.8 / 9.3, then top decile | data by 2026-11-01 |
| Direct share of revenue | 1.5% last 365; forward 0% | 5% | 2027-06-30 |
| Search placement | UNKNOWN: no OTA ranking feed | top of page 1 for the area search | data source needed |

## Data gaps (get the data)

1. **P05 price breakdown**: why uncustomized_price fell 9.4% on 19 Oct 09:38Z. Source: PriceLabs UI calendar breakdown (the read-only API has none).
2. **P20 price rise** (25 Oct-3 Nov +15-18%) cause. Source: PriceLabs UI breakdown on 1 Nov.
3. **P20 reservation** 10-22 Oct revenue and the cancelled direct booking. Source: Smoobu reservation detail.
4. **Booking.com +20% markup** confirmation, plus Vrbo +8% and Direct −10%. Source: Smoobu Channel Manager.
5. **Airbnb promotions / Smart Pricing / Smoobu Airbnb adjustment.** Source: screenshots (action 1).
6. **market.csv** was not in the 06:06 pack (market percentiles null, ARI/RGI unknown). The comp agents appended rows after the build: rebuild the pack from it next run.
7. **Market ADR / comps / ratings:** enable PriceLabs Competitor Listings or a Market Dashboard; load per-listing ratings into `listings.csv`.
8. **OTA displayed prices / parity:** `channel_checks.csv` is empty and OTAs are blocked here.
9. **P03 / P04 reservations** (Channex, not in Smoobu). P04 21 Oct unlabelled closure.
10. **P15-P19:** second account keys.
11. **STLY** exists only for P12.
12. **prices.csv** covers 60 days only (no 180-day checks, no Christmas/NYE for P04, P09, P10, P12, P13; P05 29 Dec +100% override price unknown).
13. **P05 27 Oct block** reason.
14. **reservations.csv** has no booking ID, modification or cancellation date; booked_on has no time.
15. **Visibility Booster dates** (to split Booking commission).
16. **`price` vs `user_price`** in PriceLabs: which one the OTAs show.

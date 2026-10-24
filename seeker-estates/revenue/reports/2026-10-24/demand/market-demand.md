# Market demand: is the booking drought market-wide or ours? (D = 2026-10-24)

Author: market-demand agent. READ-ONLY. Sources: PriceLabs `get_neighbourhood_data` (one call per listing, pulled 24 Oct 2026, `include_occupancy` + `market_history_yoy`; P13 taken from `data/snapshots/2026-10-24/raw/neighbourhood_P13.json`, pulled 06:20 the same day by the comp-west agent), Smoobu `reservations.csv` (snapshot 24 Oct), and web search (each source dated below). PriceLabs data is Airbnb-derived Nearby Listings (`nd_source: airbnb`), bedroom-band market rather than a curated comp set. **Supply trend: NOT AVAILABLE**. The tool returns only the current listing count (n), with no history. **PriceLabs `market_research`: NOT AVAILABLE**. It returned `ERR-MCP-FEATURE-NOT-ENABLED` ("Market Research is not enabled on this account… email support@pricelabs.co"), so no submarket options were offered and nothing was selected.

## Bottom line

1. **The market is not in a drought.** For November, forward market occupancy is roughly level with the same time last year (STLY) in 6 of 9 submarkets (within 2 pts). It is clearly behind only in Mile End (−9 pts) and Shepherd's Bush (−6 pts), and clearly ahead in Greenwich (+9 pts). December is ahead of STLY in every submarket (+1 to +9 pts). Market pickup over the last 7 days for November stays-dates is equal to or faster than last year in 6 of 9 submarkets.
2. **Our booking rate collapsed while the market's did not.** Smoobu shows 31 new bookings on 10–24 Sep (about 2.1/day) and 13 on 14–19 Oct (about 2.2/day). On 20–24 Oct there were only **2** (P20 on 21 Oct, P09 on 23 Oct), about 0.4/day, an **~80% drop**. Five P04 Booking.com rows dated 20 Oct are excluded: they are re-imports from the move to Smoobu that day (data/id_map.json) and were not new demand. Over the same window, PriceLabs market pickup ran at 2.6–7.4 occupancy points per week for November, against 2.7–6.8 STLY.
3. **Estimate (inference):** at most about **10–20%** of the drop can be put down to the market, mainly in Mile End, Shepherd's Bush and the slower pickup in Barking, St John's Wood and Camden. The remaining **~80–90% is specific to our listings and channels**. That matches the Booking.com facts in the brief: no organic booking for 13 days, a +20% markup and stacked promotions.
4. **Booking windows are short (median 6–22 days)**, so most November demand is being booked now. A 5–13-day lull costs a large share of the bookable November window. The macro picture (below) is soft for long-haul travel but firm for Europe, and does not explain a step change in the week of 20 Oct.

## Per-submarket evidence (PriceLabs, pulled 24 Oct 2026)

"Mkt" means market occupancy (%) of the bedroom-band neighbourhood set already on the books for that month. "STLY" is the same measure at the same point last year. "Pickup" is the change in market occupancy over the last 7 days, in points. Sep is the last full month: occupancy and ADR for 2026 vs 2025. LOS and window are medians for Sep 2026 (Sep 2025 in brackets). "Ours" is our listing's booked / unavailable % per PriceLabs.

| Listing / submarket (band, n) | Nov Mkt vs STLY | Dec Mkt vs STLY | Nov pickup 7d vs STLY | Sep occ 26 vs 25 | Sep ADR 26 vs 25 | LOS / window (days) | Ours Nov booked / blocked | Ours Dec booked / blocked |
|---|---|---|---|---|---|---|---|---|
| P04 Barking (1–3BR; 2BR n=86) | 20 vs 22 (−2) | 19 vs 14 (+5) | 2.60 vs 3.64 (slower) | 46 vs 43 | £155 vs £144 (+8%) | 3 / 6 (10) | 20 / 0 | 52 / 0 |
| P05 St John's Wood (3–5BR; 4BR n=90) | 39 vs 39 (0) | 37 vs 34 (+3) | 5.16 vs 6.76 (slower) | 62 vs 62 | £461 vs £450 (+2%) | 3 / 21 (22) | 73 / 0 | 55 / 0 |
| P06 Marylebone (1–3BR; 2BR n=215) | 40 vs 40 (0) | 35 vs 26 (+9) | 5.00 vs 5.05 (equal) | 71 vs 70 | £361 vs £362 (0%) | 4 / 18 (13) | 13 / 77 | 0 / 100 |
| P08 Islington (1–3BR; 2BR n=148) | 52 vs 54 (−2) | 41 vs 38 (+3) | 4.85 vs 4.56 (faster) | 78 vs 80 | £202 vs £193 (+5%) | 4 / 22 (22) | 20 / 57 | 0 / 100 |
| P09 Greenwich (Studio–2BR; 1BR n=127) | 33 vs 24 (+9) | 28 vs 18 (+10) | 4.37 vs 3.74 (faster) | 68 vs 67 | £143 vs £149 (−4%) | 3 / 12 (10) | 77 / 13 | 0 / 100 |
| P11 Camden (1–3BR; 2BR n=174) | 35 vs 36 (−1) | 28 vs 27 (+1) | 4.66 vs 6.05 (slower) | 77 vs 77 | £256 vs £254 (+1%) | 3 / 13 (14) | 47 / 0 | 68 / 0 |
| P12 Mile End (2–3BR; 2BR n=121) | 33 vs 42 (**−9**) | 27 vs 26 (+1) | 3.46 vs 2.67 (faster) | 67 vs 70 | £210 vs £214 (−2%) | 3 / 9 (12) | 47 / 0 | 0 / 58 |
| P13 Shepherd's Bush (2–3BR; 2BR n=117) | 30 vs 36 (**−6**) | 32 vs 23 (+9) | 4.39 vs 3.74 (faster) | 69 vs 66 | £242 vs £263 (**−8%**) | 4 / 12 (20) | 10 / 27 | 16 / 0 |
| P20 Canary Wharf (1–3BR; 2BR n=147) | 31 vs 31 (0) | 21 vs 17 (+4) | **7.43 vs 4.85** (much faster) | 72 vs 70 | £244 vs £222 (+10%) | 4 / 9 (9) | **0** / 7 | **0** / 0 |

Other points from the same pulls:
- **October so far (actuals plus on the books) vs October 2025 final**: Barking 45 vs 47, St John's Wood 62 vs 63, Marylebone 69 vs 70, Islington 75 vs 79, Greenwich 65 vs 59, Camden 74 vs 80, Mile End 65 vs 67, Shepherd's Bush 67 vs 68, Canary Wharf 63 vs 65. Most of these are a few points behind, but October 2026 is not finished, so this is not a like-for-like comparison.
- **Barking short-term softness (my calculation from daily series):** market occupancy for 24–31 Oct averages about 29.7% vs about 40.2% STLY, which is −10 pts. Barking is the one submarket where the next week is clearly weaker than last year.
- **PriceLabs narrative (occ_insights):** "slightly better" next 2–3 months vs last year for Barking and Shepherd's Bush. "Significantly better" over the next 4–6 months for St John's Wood, Marylebone, Greenwich and Canary Wharf. "At par" for Islington, "slightly better" for Camden. "**Slightly worse** for the next 2 months" for Mile End.
- **ADR trend (Jan–Sep 2026 vs 2025)**: higher in Barking, Islington, Camden and Canary Wharf (Camden Jan–May +20–30%). Flat to lower in Marylebone, Greenwich, Mile End and Shepherd's Bush. Shepherd's Bush is below last year in every month from May to Sep (e.g. Aug £241 vs £292). Lower market ADR there means comps are cheaper, so our prices look relatively expensive.
- **Booking windows have shortened** in Shepherd's Bush (12 vs 20 days in Sep), Greenwich (Apr–Jul 10–18 vs 22–26) and Camden (spring 29 vs 45). Last-minute demand matters more, which makes a channel outage hurt faster.
- **Demand spikes ahead (PriceLabs)**: 27 Dec–1 Jan (+10–20% occupancy everywhere), 2–7 Dec (Shepherd's Bush, Barking, Camden, Greenwich, Mile End), 22–27 Nov (Marylebone +12.4%). WTM London at ExCeL on 3–5 Nov is close to P20 and P12 (see web sources).

### Market-wide vs ours, by submarket (inference, with the numbers that drive it)

| Submarket | Market factor | Our-listing factor | Read |
|---|---|---|---|
| Canary Wharf (P20) | None: Nov at STLY, pickup +53% vs STLY, ADR +10% | Ours 0% booked Nov and Dec while the market is at 31% / 21% | **~100% ours** (new listing with no reviews: see listings-reviews.md) |
| Greenwich (P09) | Tailwind: Nov +9, Dec +10 vs STLY | Ours 77% booked Nov (sells to 26 Nov) | Not in drought. Fine |
| St John's Wood (P05) | Neutral (Nov 0, Dec +3), pickup slower (5.2 vs 6.8) | Ours 73% Nov, 55% Dec | Not in drought. Small market drag on pickup |
| Camden (P11) | Neutral (Nov −1), pickup slower (4.7 vs 6.1) | Booking.com only, 47% Nov / 68% Dec already booked | Mostly ours/channel (Booking.com organic drought). About 20% market |
| Islington (P08) | Slight (−2 Nov), pickup faster | 20% booked, 57% blocked (handback 13 Nov) | Few sellable nights. Mostly ours |
| Marylebone (P06) | Neutral, Dec +9 | 3 open nights only (policy) | Not a demand question |
| Barking (P04) | **Some**: next 8 days −10 pts vs STLY, Nov −2, pickup slower (2.6 vs 3.6) | 20% Nov (= market), 52% Dec | About 40% market / 60% ours. Corentin's −8% on 1–25 Nov fits the market |
| Mile End (P12) | **Yes**: Nov −9 pts vs STLY, PriceLabs "slightly worse" | 47% Nov (above market 33%) | Market-driven softness. We are outperforming the market here |
| Shepherd's Bush (P13 + twin) | **Some**: Nov −6 pts, market ADR −8% YoY | 10% booked Nov vs market 30% | About 30% market / 70% ours (we trail the market by 20 pts) |

Portfolio-weighted (inference): November market occupancy across these nine submarkets averages about 35% vs about 37% STLY (simple mean, about −2 pts, about −5% relative). Pickup is on average equal to or slightly faster than last year. A ~5% softer market cannot by itself produce an ~80% fall in our daily booking rate.

## Macro / external (web, each with date)

- **Inbound tourism:** VisitBritain's January 2026 forecast was 45.5m UK visits / £35.7bn, made before the Iran conflict. A later update cut it to **44.2m visits (+~2% on 2025's 43.6m)**: Europe +4% volume, long-haul −3%. VisitBritain's July 2026 State of the Nation: European visits up, long-haul down, H1 inbound slightly above 2025, and July–Aug inbound flight arrivals down on 2025. Sources: [travelextra.ie, Visit Britain forecasts 4pc inbound growth for 2026](https://www.travelextra.ie/visit-britain-forecasts-4pc-inbound-tourism-growth-for-2026/) (Jan 2026); [VisitBritain State of the Nation, July 2026](https://www.visitbritain.org/media/6050/download); [Travel Weekly, rising cost of living due to war dampens tourism outlook](https://travelweekly.co.uk/news/rising-cost-of-living-due-to-war-dampens-tourism-outlook) (2026, exact date not shown). The search summary reported the August 44.2m figure; the primary VisitBritain release was not opened, so treat 44.2m as reported, not verified.
- **Long-haul / Iran conflict:** [Express & Star, Iran war weighing on long-haul travel demand, says Hostelworld](https://www.expressandstar.com/uk-news/iran-war-weighing-on-long-haul-travel-demand-says-hostelworld-9272180) (2026); [TravelMole, Iran–USA war takes its toll on Heathrow traffic forecasts](https://travelmole.com/news/iran-usa-war-takes-its-toll-on-london-heathrow-traffic-forecasts) (2026); [TravelMole, Barclays sees UK spending slip on travel](https://travelmole.com/news/barclays-sees-uk-spending-slips-on-travel-due-to-middle-east-tensions) (Mar–Apr 2026 data).
- **Airline capacity / Heathrow:** 2026 forecast is 85m passengers (+0.6%). Q1 2026 was 18.9m (+3.7%). June–Aug 2026 was 23m, with August 7.8m and a record day on 2 Aug. [Heathrow business and traffic commentary, Aug 2026 (Investegate)](https://www.investegate.co.uk/announcement/rns/heathrow-funding-limited--44bi/business-and-traffic-commentary-aug-2026/9766701); [travelextra.ie, Heathrow forecasts 85m for 2026](https://www.travelextra.ie/heathrow-airport-forecasts-85m-passengers-for-2026/). September/October 2026 figures were NOT FOUND.
- **London hotels:** Sep 2025 baseline was 86.5% occupancy, ADR £209.97, boosted by concerts ([CoStar, 14 Oct 2025](https://www.costar.com/products/benchmark/resources/press-releases/september-concerts-boosted-london-hotel-performance)). PwC (Nov 2025) forecast 2026 London occupancy 81.6% (+1.7 pts) and RevPAR +1.8% ([PwC Hotels Forecast](https://image.uk.info.pwc.com/lib/fe31117075640475701c74/m/1/Latest+PwC+Hotels+Forecast.pdf)). **No Sep/Oct 2026 London hotel figures found (NOT FOUND).** The September 2025 concert boost makes the autumn comparison harder for 2026.
- **London STR (AirDNA):** July 2026 London occupancy 59%, **occupancy −3.5% YoY, RevPAR +0.7%** ([AirDNA London seasonality](https://www.airdna.co/vacation-rental-data/app/gb/default/london/seasonality), July 2026). **Supply:** AirDNA via selfcatering.co.uk reports 108,144 active listings in April 2026, **+3% YoY**, with 57% average occupancy ([selfcatering.co.uk UK Airbnb stats 2026](https://www.selfcatering.co.uk/reports/uk-airbnb-stats/)). bnbcalc says London supply is −9% YoY, undated ([bnbcalc London](https://www.bnbcalc.com/markets/gb/london)). These conflict, so supply direction is UNRESOLVED. Inside Airbnb Dec 2025: 64.9% entire homes ([Statista](https://statista.com/statistics/816076/london-airbnb-listings-by-room-type)).
- **ETA (visitor cost):** fee rose from £16 to **£20 from 8 Apr 2026** (it went from £10 to £16 in 2025). Enforcement tightened after Feb 2026, with no ETA meaning boarding is denied ([The Local, 7 Feb 2026](https://www.thelocal.de/20260207/uk-confirms-eta-price-hike-for-european-travellers-as-rules-set-to-toughen)). That I could not confirm the change took effect as scheduled; check gov.uk. It is a small cost per trip and was already in force in the summer, when the market performed. Unlikely to be the cause of an October step change (inference).
- **Tourist tax:** London has none yet. Mayors were confirmed on 10 Sep 2026 to get powers; Khan has floated about 5%, earliest about 2028 ([The New Daily, 14 Sep 2026](https://www.thenewdaily.com.au/travel/2026/09/14/uk-tourist-tax); [GLA ECS Committee letter, Aug 2026](https://www.london.gov.uk/sites/default/files/2026-08/ECS%20Committee%20-%20Visitor%20Levy%20-%20final.pdf)). No current demand impact.
- **90-night rule / registration:** the rule is unchanged. Westminster had 2,712 properties under investigation at 30 Mar 2026 ([Property Reporter](https://www.propertyreporter.co.uk/over-2700-westminster-properties-under-investigation-for-unlawful-short-term-letting.html), Apr 2026). The national short-let register was not launched as of the latest sources ([Landlord Today, Feb 2026](https://www.landlordtoday.co.uk/breaking-news/2026/02/new-short-lets-register-likely-to-kick-off-this-spring/)). No evidence of an October 2026 enforcement wave affecting guests.
- **Currency:** the latest dated figures found are 14 Jul 2026 (EUR 1 = USD 1.1405 = GBP 0.85215, implying about USD 1.34/GBP; GBP/EUR 2026 range 1.138–1.175) ([EUR-Lex C/2026/3593](https://eur-lex.europa.eu/eli/C/2026/3593/oj/eng/pdf); [Pound Sterling Live GBP/EUR 2026](https://www.poundsterlinglive.com/history/GBP-EUR-2026)). **October 2026 rates NOT FOUND.** No evidence of a sterling shock.
- **Events:** WTM London, ExCeL, 3–5 Nov 2026; B2B Marketing Live, ExCeL, 18–19 Nov ([Mews hotel conferences 2026](https://www.mews.com/en/blog/hotel-conferences); [Expobeds](https://www.expobeds.com/event/b2b-marketing-expo/2026/book)). Dates are from secondary listings; verify against the organisers.

**Macro read:** soft long-haul travel, firm European travel, flat to slightly lower London STR occupancy (−3.5% YoY in July) and possibly more supply (+3%). That is a gentle headwind of a few percent, consistent with the PriceLabs numbers above. It is not a step change in the week of 20 Oct.

## What this means for the fix (for the strategy director)

- Treat the drought as **channel and listing-driven**: the Booking.com markup and promotions (P11 Camden is Booking.com only), plus P20's lack of reviews. Market-level price cuts across the board are not justified by market data, except:
  - **Mile End (P12)**: market Nov −9 pts vs STLY. We are already ahead of the market at 47% vs 33%, so hold.
  - **Barking (P04)**: next 8 days −10 pts vs STLY. Corentin's −8% on 1–25 Nov is in line; no further cut indicated by market data (min stay never below 3, per P04 policy).
  - **Shepherd's Bush (P13)**: market ADR −8% YoY and Nov −6 pts, while we trail the market by 20 pts (10% vs 30%). This is the one place where market softness and our underperformance combine. Compare our net rate with the Nearby Listings 2BR median of £244 (Sep market ADR £242).
- **Canary Wharf (P20)**: market pickup is the strongest in the portfolio (7.4 pts/week vs 4.9 STLY, WTM at ExCeL 3–5 Nov), yet we have 0% booked in Nov and Dec. This is entirely a listing problem (new, no reviews).
- Short windows (6–22 days) mean fixes made today can still capture November.

## Limits

- PriceLabs market = Airbnb Nearby Listings by bedroom band, not a curated comp set. Booking.com-only demand (P11) is not directly measured.
- Supply trend: NOT AVAILABLE from PriceLabs; web sources conflict.
- `market_research`: NOT ENABLED on the account (403). No submarket selection was offered or made.
- Smoobu 2025 history covers only P12 for October, so a year-on-year comparison of our own bookings is not possible. I compared against our own September/mid-October run-rate instead.
- airbnb.* / booking.com: NOT CHECKED (blocked by network policy).

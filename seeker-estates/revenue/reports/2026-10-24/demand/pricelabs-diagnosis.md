# PriceLabs' own diagnosis of each sellable listing (24 Oct 2026)

Prepared by Claude for Corentin. **Read-only.** Nothing was changed in PriceLabs, Smoobu or any channel. All PriceLabs calls were made one at a time, today.

## Sources

| Code | Tool / file |
|---|---|
| DX | PriceLabs `diagnose_no_bookings`, run today with the question "we have 0 reservations, no demand — understand WHY" |
| HL | PriceLabs `get_listing_health_and_recommendations` (Pulse), today |
| PM | PriceLabs `get_listing_performance_metrics`, today. Run for P04, P05, P08, P11 and P12. |
| NB | PriceLabs `get_listing_neighborhood_market`, today (Airbnb comparable set, same bedroom count). Percentiles were computed by Claude: our PriceLabs nightly price (`data/snapshots/2026-10-24/prices.csv`, PriceLabs refresh of 23 Oct) placed against the NB 25th/50th/75th/90th percentile future prices for the same dates. "Open" means available and not booked. Script: scratchpad `plscripts/nb.py`. |
| LO | PriceLabs `get_listing_optimizer_summary`, `_report` and `_ranking` |
| POL | `data/policy.json` |
| AC | `reports/2026-10-21/airbnb-conversion.md` (Airbnb Insights screenshots, 23 Jul–21 Oct) |

### How to read the PriceLabs output (important)

1. **PriceLabs' written answer repeats our question back to us.** For P09 and P11 it says the listing "does not have any upcoming bookings", but its own data in the same answer shows **70%** (P09) and **48%** (P11) booked for the next 30 days. Below, I use the data sections and the `reccomendations` field. I do not use the generated prose.
2. **The min-stay values in DX come from PriceLabs' min-stay profile, not from the calendar.** DX reports "weekend min stay 4" on most listings. The calendar actually pushed for open nights in the next 45 days shows min stay **2** (P05, P06, P08, P09, P11), **1–2** (P12), **1–3** (P13), **3** (P04, by policy) and **3–4** (P20). Source: prices.csv. Before acting on any DX min-stay point, check the profile.
3. **The price percentiles compare PriceLabs prices, not what guests pay.** Booking.com guests see 1.2× the PriceLabs price, less stacked promotions (POL). Airbnb guests pay about 0.77× (P09 booking) and about 0.72× on P20 (POL). So on Booking.com we sit higher in the market than the table shows, and on Airbnb lower.
4. **P13 is one flat** (POL). PriceLabs counts nights booked on the twin listing as "blocked", so 3064856 on its own looks much worse than the flat really is.
5. **No Listing Optimizer data for any sellable listing (LO).** The account has optimizer reports for only 2 listings. One is an Airbnb Camden listing ("Central Camden 2-Bed by the Station", id 1571116366722196727, overall score **7.4/10**, analysed 19 Dec 2025). The other is Notting Hill (6.9, blocked). The subscription ended 22 Jul 2026, and both the report and the ranking calls return `payment_restricted: true`. **Search rank, photo, title, review and amenity scores: NOT AVAILABLE from PriceLabs.** The only conversion evidence we have is AC.

## Portfolio picture from PriceLabs

**1. "0 reservations" does not hold for most flats.** PriceLabs shows forward occupancy above the market for P04, P05, P06, P09, P11 and P13 (one flat). Only **P08, P12 and P20** are clearly below the market in their booking window. What has really gone wrong is **pickup**: the last booking dates in PriceLabs are P11 **4 Oct**, P12 15 Oct, P08 17 Oct, P05 18 Oct and P04 20 Oct (PM). P11 has taken **0 bookings in 15 days**. P12 has taken 0 in the last 7 days, against 2 bookings (7 nights) at the same time last year (PM).

**2. Demand for the next 14 days is behind last year in five of the nine submarkets.** NB market occupancy, next 14 days, now vs same time last year:

| Submarket (comp set) | Now | STLY | Gap |
|---|---|---|---|
| Mile End (P12) | 45.6% | 59.1% | **-13.5** |
| Camden (P11) | 50.6% | 59.9% | **-9.3** |
| Canary Wharf (P20) | 46.6% | 55.7% | **-9.1** |
| St John's Wood 4-bed (P05) | 44.6% | 53.5% | **-8.9** |
| Barking (P04) | 39.6% | 42.1% | -2.5 |
| Marylebone (P06) | 50.2% | 50.4% | -0.2 |
| Islington (P08) | 61.7% | 61.4% | +0.3 |
| Shepherd's Bush (P13) | 48.7% | 46.8% | +1.9 |
| Greenwich 1-bed (P09) | 51.5% | 45.7% | +5.8 |

For days 15–45 the gaps are smaller, between -4 and +4 points.

**3. Supply has roughly doubled.** In every comp set, the "available listings" count is about 1.8–2.0× the count a year ago (for example Barking 70 vs 31, Marylebone 189 vs 94, Camden 150 vs 75). *Inference:* part of this may be PriceLabs tracking more listings than it did a year ago. Still, more competing supply is consistent with flat or weaker occupancy at the same demand.

**4. Guests book late.** Market booking window in October 2026 (NB): Barking 10 days, Greenwich 13, Canary Wharf 12, Shepherd's Bush 15, Camden 16, Mile End 18, Marylebone 19, Islington 29, St John's Wood 30. HL says November bookings "generally happen" **0–5 days** (Barking), 0–3 (Greenwich), 0–8 (Canary Wharf) and 0–18 days (Camden) before the stay. So December and January being empty today is normal (HL: market January occupancy is 3–13%). The real gap is in the next 14 days.

**5. Typical length of stay is 3 nights** in every comp set (4 in Marylebone, and in Islington and Shepherd's Bush in October). Our pushed minimum stays (2–3) are not above that, except P20 at 4 on some December weekends.

**6. PriceLabs makes the same setting call on almost every listing (HL):** "Your current Last Minute Factor (18–25%) is quite conservative". The market-recommended setting is up to 27–40% off in the last 8–17 days. Caution: P04, P11 and P12 already have custom occupancy-based adjustments of up to **-30%** for 0–15 days (DX), and Smoobu Airbnb rules add their own last-minute cuts (POL). These discounts stack.

## Per property

### P04 Barking 2-bed (3562176): main cause is weak market demand, not price

- **DX:** booking window 36 days. To 29 Nov: **32% booked vs market 24%**. Market pace 24% vs 25% last year. Next 30 days: 23% vs 26%. Base £220; no recommended base available (new to PriceLabs since 20 Oct). Demand is set "moderately conservative" (×0.75). Custom occupancy-based adjustments give up to -30% at 0–15 days. Not hitting min (£90) or max. Recommendations: min stay 4→2 on weekdays and weekends, demand back to default.
- **HL:** Blue, "outperforming the market". November: market 18%, P04 20%, market reached 44% last year, bookings 0–5 days before stay. December: market 18%, P04 52%. Recommendation: last-minute 25%/15 days is conservative; market setting up to 27%/14 days.
- **PM:** booked next 15 days **47% vs 31%**, next 30 days 23% vs 26%, next 60 days 33% vs 20%. 5 bookings (32 nights) in the last 7 days, all from the migration week. Last booking 20 Oct. Its past-30 figure (7% vs 50%) is an artefact: PriceLabs only has data from 20 Oct.
- **Price (NB, 86 comps):** next 14 days, open nights (6) average £167 = **P36** (-11% vs median). Days 15–45, open nights (21) average £191 = **P51**.
- **Min stay vs LOS:** calendar shows 3 nights against a market LOS of 3. Policy says never below 3. **Do not follow PriceLabs' "min stay 2".**
- **Conclusion: market demand.** Barking is the weakest submarket: November market occupancy is 18% against 44% reached last year, with 0–5 day lead times. P04 is already ahead of that market on 15 and 60 days. Price is mid-market. Data: DX, HL, PM, NB.

### P05 St John's Wood 4-bed (3166592): ahead of the market; the risk is price in the far window

- **DX:** booking window 60 days. To 23 Dec: **61% vs 36%**, and this market is **ahead** of last year (36% vs 34%). Next 30 days: 72% vs 37%. Base **£550 > recommended £464**. Demand "moderately aggressive" (×1.25). Overrides of +15% on 28–30 Oct, 6–7 Nov and 16–17 Nov, and +40% on 7–8 Dec. Recommendations: **base 550→464**, demand back to default.
- **HL:** Blue. November: market 36%, P05 73% (market reached 57% last year), bookings 0–12 days out. December: market 34%, P05 55% (61% last year). Recommends base £464, and last-minute up to 40% over 15 days.
- **PM:** next 15 days 73% vs 43%, next 30 days 73% vs 38%. Last booking 18 Oct (1 booking in 7 days, 6 in 30, 12 in 60).
- **Price (NB, 90 four-bed comps):** next 14 days, 3 open nights average £424 = **below P25** (P25 £452). Days 15–45, 10 open nights average £547 = **P39**.
- **Search and listing:** AC shows 69% first-page impressions but only **7.3% click-through**, against 42% for the portfolio. *Inference:* the problem is the search card (the cover photo and title were changed 21 Oct, POL).
- **Conclusion: no demand problem today.** Near nights are already cheap. For far dates, base £550 and demand ×1.25 put December at risk: P05 is 55% booked vs 61% last year, and the market books 2–27 days out. Visibility (click-through) is the second lever.

### P06 Marylebone (3288517): no issue (3 open nights; the rest is blocked on purpose)

- **DX:** to 6 Nov **86% vs 49%**, and the market is ahead of last year (49% vs 47%). Base £357 vs recommended £342. All customizations default. Recommendations: base →£342, weekend min stay 4→3 (the calendar shows 2).
- **HL:** Blue. November: market 37%, P06 90%. "Open 351 blocked dates" can be ignored: the blocks are intentional (POL).
- **Price (NB, 216 comps):** open 5–7 Nov at £348 = **P37** and £366 = P43. Market LOS 4, booking window 19 days.
- **Conclusion: no problem.**

### P08 Islington 2-bed (3318167, last night 13 Nov): the clearest non-price failure

- **DX:** booking window 16 days. To 9 Nov **25% vs market 53%**. The market is behind last year at this horizon (53% vs 60%), but NB says the next 14 days are at last year's level (61.7% vs 61.4%). Next 30 days: 40% vs 52%. Base £250 vs recommended £243. Demand ×1.25. Recommendations: demand back to default, weekend min stay 4→3 (the calendar shows 2).
- **HL:** Blue, but the 77% November figure includes the post-handback block. Last-minute 18%/15 days vs market setting up to 40%/17 days.
- **PM:** next 15 days **14% vs 55%**. **Weekday occupancy for the next 15 days is 0% vs 51%.** 8% of nights in days 15–90 are at the £150 minimum. Last booking 17 Oct (1 booking in 7 days, 2 in 30).
- **Price (NB, 148 comps):** next 14 days, **12 open nights average £165 vs median £237 (-30%) = below P25** (P25 £185). Market LOS 4, booking window 29 days. Min stay 2.
- **Listing:** AC shows P08 is the **best Airbnb converter** in the portfolio: 70.5% click-through, 4.33% booking, +2.52 points vs similar listings, over the 90 days to 21 Oct.
- **Conclusion: channel or visibility, not price and not the market.** The flat is the cheapest in its comp set, in a market running at last year's level, with a good Airbnb page, and still sells almost nothing in the next 2 weeks. *Inference:* exposure has fallen. Possibly Airbnb impressions after the 13 Nov block shortened the bookable horizon, or Booking.com, which has had no organic booking portfolio-wide for 13 days. PriceLabs cannot show impressions or rank (LO restricted). **Do not cut price further**: the £150 floor is already being hit.

### P09 Greenwich 1-bed (3318172, last night 26 Nov): no issue; the gaps are last-minute by nature

- **DX:** booking window 22 days. To 15 Nov **59% vs 38%**, and the market is **ahead** of last year (38% vs 32%). Next 30 days: 70% vs 34%. Base £176 > recommended £167. Demand ×1.25. Recommendations: base →£167, demand lower.
- **HL:** Blue. November: market 33%, P09 90%. Bookings "generally happen **0–3 days** before stay". Last-minute 18%/15 days vs market setting up to 36%/16 days.
- **Price (NB, 127 one-bed comps):** next 14 days, 6 open nights at £154 = **P48**. Days 15–33, 5 open nights at £163 = **P61** (+9%). The new 13–15 Nov booking paid about 0.77× PriceLabs (POL / daily report), so the guest price is about P33.
- **Conclusion: no problem.** The remaining nights will sell 0–3 days out. PriceLabs' base cut is optional.

### P11 Camden 2-bed (3064196, Booking.com only): the cause is the channel, with a soft market on top

- **DX:** booking window 14 days. To 7 Nov **60% vs 51%**. The market is behind last year (51% vs 54%). Next 30 days: 48% vs 42%. Base £286 > recommended £265. Demand "moderately conservative" (×0.75). Custom occupancy-based adjustments up to -30%. Recommendations: base →£265, demand back to default.
- **HL:** Blue. November: market 34%, P11 47%, **market reached 72% last year**, bookings 0–18 days out. December: market 26%, P11 68%. Recommends base £265; last-minute up to 40% over the last 8 days.
- **PM:** **last booking 4 Oct. 0 bookings in the last 15 days**, 2 in 21 days, 12 in 60 days. Next 7 days 57% vs 66%, next 10 days 40% vs 60%.
- **Price (NB, 174 comps):** next 14 days, 6 open nights average £204 vs median £297 (**-31%, below P25**). Days 15–45, 14 open nights at £247 = **P26**. On Booking.com (×1.2) that is still only about P25–P40.
- **Visibility:** an Airbnb listing for this flat existed ("Central Camden 2-Bed by the Station", optimizer score 7.4 in Dec 2025, LO). It no longer sells; the flat is Booking.com only (POL).
- **Conclusion: channel.** It is the cheapest quartile in Camden and still has 20 days without a booking, while Booking.com has had no organic booking portfolio-wide for 13 days. The Camden market is also 9.3 points behind last year for the next 14 days. A lower base (PriceLabs' £265) will not fix a channel with no traffic.

### P12 Mile End 2-bed (2699998, last night 13 Dec): price (days 15–45) plus the weakest market

- **DX** (confidence 1/3): booking window 16 days. To 9 Nov **24% vs 44%**. The market is behind last year (44% vs 50%). Next 30 days: 42% vs 38%. Base £284 vs recommended £279. Demand ×0.75. Custom occupancy-based adjustments up to -30%. 17 Nov +50% (min 1). Recommendations: base →£279, more aggressive occupancy-based adjustments.
- **HL:** Blue. November: market 37%, P12 47% (market reached 66% last year), bookings 0–17 days out. Last-minute 25%/15 days vs market setting up to 38%/14 days.
- **PM (the only flat with same-time-last-year data):**

  | Window | Booked now | Booked STLY | ADR now | ADR STLY |
  |---|---|---|---|---|
  | Next 15 days | **27%** | 87% | £179 | £88 |
  | Next 30 days | **40%** | 83% | £172 | £80 |

  Revenue on the books for the next 30 days is about the same (£2,060 vs £2,005): half the nights at double the ADR. Pickup in the last 30 days was 15 nights from 5 bookings, against 51 nights from 15 bookings last year. **Weekday occupancy for the next 21 days is 0% vs 39% for the market.**
- **Price (NB, 121 comps):** next 14 days, 10 open nights average £177 = just **below P25** (-20%). **Days 15–45, 17 open nights average £260 = P68 (+15% vs median).**
- **Listing:** weak at both steps on Airbnb (AC: 31.8% click-through, 1.22% booking).
- **Conclusion: price for days 15–45, plus market demand.** Mile End is the softest submarket (-13.5 points next 14 days), and P12 sits above the median for late November and early December. Last year the same flat filled at about half today's ADR. *Inference:* this year's price positioning, not the flat itself, explains most of the volume gap.

### P13 Shepherd's Bush 2-bed (3064856 + child 3090701, one flat): fine near term; December is weak

- **DX 3064856:** 8% vs 40% to 14 Nov, but 10 of those "blocked" dates are twin bookings, so this is an artefact.
- **DX 3090701:** booking window 15 days. To 8 Nov **53% vs 43%**. The market is behind last year at this horizon (43% vs 46%). Next 30 days: 40% vs 38%. Base £235 (recommended £233 / £230). **Seasonality and demand both "moderately conservative"** (×0.75). Custom occupancy-based adjustments up to -15%. Recommendations: weekend min stay 4→3, seasonality and demand back to default.
- **HL 3090701: Yellow, "catching up".** November: market 35%, flat 37% (61% last year). **December: market 29%, flat 16%** (65% last year), bookings 1–27 days out.
- **Price (NB, 116 comps):** next 14 days, 6 open nights £185 (3090701) / £167 (3064856) = **below P25**. Days 15–45, 18 open nights at P42 / P37. NB says the market is slightly ahead of last year for the next 14 days (48.7% vs 46.8%).
- **Listing:** the twin "Shepherd's Bush 2" converts **0.79%** listing-to-booking, against 4.09% for "Shepherd's Bush 1" (AC).
- **Conclusion: listing quality on the twin, and December pickup.** Near-term nights are cheap and the market is firm. December is 13 points behind the market, though at P37–42 price is not the main brake. *Inference:* the weak twin page wastes half the flat's Airbnb traffic.

### P20 Waterford Court, Canary Wharf, 2-bed (3547481, new): reviews, plus price on Booking.com and for days 15–45

- **DX:** booking window 5 days. To 29 Oct 50% vs 50%. **Next 30 days: 14% vs 35%**. The market is behind last year (35% vs 39%). Base £350; no recommended base, and PriceLabs' "imported historic" average is £740. All customizations default. Recommendations: weekend min stay 4→3, and consider a lower base if occupancy stays low.
- **HL: Red, "Your listing needs attention".** November: market 29%, P20 **7%** (60% last year), bookings 0–8 days out. December: market 21%, P20 0%. Last-minute 25%/15 days vs market setting up to 38% over the last 9 days. Synced since 9 Oct.
- **Price (NB, 147 comps):** next 14 days, 10 open nights at £269 = **P53**. **Days 15–45, 29 open nights at £306 = P69 (+18% vs median).** On Booking.com (×1.2) that is about £323–367, around or above **P75**. On Airbnb, after the 20% new-listing promotion and 15% last-minute discount (about 0.72×, POL), it is about £194–220, around or below P25.
- **Min stay vs LOS:** 3 nights (4 on some December weekends) against a market LOS of 3. Market booking window 11–12 days.
- **Listing:** no reviews (POL). The Airbnb page converts well (AC: 4.40% listing-to-booking).
- **Conclusion: reviews (new listing) first, then Booking.com price and the days 15–45 band.** Canary Wharf is 9.1 points behind last year for the next 14 days. The 4-night December weekends are above the market LOS.

## Summary table

| Ref | PriceLabs status | Booked vs market (booking window) | Mkt vs last year, next 14 days | Price, next 14 days (open) | Price, days 15–45 (open) | Main cause |
|---|---|---|---|---|---|---|
| P04 | Blue | 32% vs 24% (36 days) | -2.5 | P36 | P51 | **Market demand** (Barking Nov 18% vs 44% last year) |
| P05 | Blue | 61% vs 36% (60 days) | -8.9 | <P25 | P39 | None now; far-window price (base £550 vs £464) and search click-through |
| P06 | Blue | 86% vs 49% | -0.2 | P37 | P43 | None |
| P08 | Blue* | **25% vs 53%** (16 days); weekdays 0% | +0.3 | **<P25 (-30%)** | n/a (handback) | **Channel / visibility** (inference) |
| P09 | Blue | 59% vs 38% | +5.8 | P48 | P61 | None; 0–3 day lead times |
| P11 | Blue | 60% vs 51%; **no booking since 4 Oct** | -9.3 | **<P25 (-31%)** | P26 | **Channel** (Booking.com only) + soft market |
| P12 | Blue | **24% vs 44%**; 27% vs 87% last year | **-13.5** | <P25 | **P68** | **Price (days 15–45) + market demand** |
| P13 | Yellow | 53% vs 43%; **Dec 16% vs 29%** | +1.9 | <P25 | P37–42 | **Listing quality on twin**; December pickup |
| P20 | **Red** | **14% vs 35%** (30 days) | -9.1 | P53 | **P69** (≥P75 on Booking.com) | **Reviews (new)** + price on Booking.com / days 15–45 |

\* The Blue rating on P08 is skewed by the post-handback block.

## Fixes by expected booking impact (for Corentin's approval; nothing applied)

1. **P11: get it back onto a second channel** (Airbnb, which already had a listing scored 7.4 by Listing Optimizer). Smoobu > Channels. PriceLabs shows it is already cheapest-quartile, so price is not the lever.
2. **P12: bring days 15–45 (8 Nov–8 Dec) from P68 down to about the median.** In PriceLabs 2699998, either take PriceLabs' recommended base £284→£279 *and* add a -10% date override on 8 Nov–8 Dec (£260 → about £234, close to the £227 median), or set demand back to default. *Inference:* the STLY data (83% booked at £80) says volume responds to price here. Leave the next 14 days alone; they are already below P25.
3. **P20: hold Airbnb and fix Booking.com.** Booking.com guests see about P75+ for days 15–45. Add a per-property Booking.com promotion (Booking.com extranet > Promotions, Waterford Court) of about 10–15% on 8 Nov–8 Dec, or a PriceLabs override on those dates. Remove the 4-night December weekend minimum (PriceLabs 3547481 > min-stay settings), since market LOS is 3. Reviews: no setting fixes this; the first guests' reviews are the lever.
4. **P08: do not cut price** (it is already at the £150 floor on 1 Nov, and 30% under the median). Check channel exposure: is the Booking.com listing open and visible for 26 Oct–13 Nov, and are Airbnb search impressions holding (Airbnb Insights > Conversion, last 7 days)? Without impression data this cannot be diagnosed further.
5. **P13: fix the twin page** (3090701 / "Shepherd's Bush 2"): align photos and price per AC and POL, and never make the two identical. Optional: set seasonality back to default (PriceLabs 3090701/3064856 > Customizations > Seasonality), which PriceLabs flags as dampening.
6. **P05: for far dates only, consider PriceLabs' £464 base recommendation, or set demand ×1.25 back to default** if December pickup stalls by the 26 Oct review. No change to near dates.
7. **Portfolio, last-minute:** PriceLabs recommends deeper last-minute discounts (27–40%) everywhere. **I do not recommend applying this wholesale.** The custom occupancy-based adjustments (up to -30%) and the Smoobu Airbnb rules already stack, and the near-term prices of P05, P08, P11, P12 and P13 are already below P25.
8. **P04: no change beyond today's -8% (1–25 Nov).** Keep min stay at 3 (POL). PriceLabs' "min stay 2" conflicts with your standing decision.

## Not checked or not available

- Listing Optimizer scores, search rank, photos, title, reviews and amenity gaps: **not available** (subscription ended, `payment_restricted`).
- Same-time-last-year listing metrics: only P12 has them. The other listings have no last-year history in PriceLabs.
- Performance metrics were not pulled for P06, P09, P13 and P20; DX and HL covered their occupancy.
- Prices are from the PriceLabs refresh of 23 Oct. Today's P04 -8% and P13 changes are not reflected in the percentile figures.

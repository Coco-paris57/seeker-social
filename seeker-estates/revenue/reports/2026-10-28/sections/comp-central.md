# Competitor positioning: CENTRAL/NORTH (D = 2026-10-28)

**Method.** I kept the same 55 comp ids as 27 Oct. There are no additions and no replacements. I re-ran the same Airbnb map-box searches with the same parameters (airbnb.co.uk, plain HTTP 200, no challenge): entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. There were 31 searches. Stays (2 nights each):
- **Tue 3–Thu 5 Nov** (midweek), **Fri 30 Oct–Sun 1 Nov** (next weekend) and **Tue 24–Thu 26 Nov**. All three are like for like with 27 Oct.
- **Fri 27–Sun 29 Nov**: new today, the 30-days-out weekend.
- **P11 only:** **Tue 1–Thu 3 Dec**, **Tue 8–Thu 10 Dec** and **Fri 11–Sun 13 Dec**. These sit inside the reopened 28 Nov–12 Dec window. 5–8 Dec was skipped because it is rebooked.

Other sources:
- **Booking.com: NOT CHECKED.** A plain search request got an AWS WAF challenge (HTTP 202). I did not try to get round it.
- **PriceLabs:** still no comp source (no Competitor Listings, no Market Dashboard). For P11 I pulled `get_neighbourhood_data` (detail, prices), `get_customizations`, `get_listing_date_overrides` and `get_user_logs`, one call at a time.

**Price basis:**
- Airbnb UK search shows "N nights x £X" with cleaning folded in. So every comp price is **nightly, excl. taxes, cleaning INCLUDED**, after any offer.
- Our prices come from PriceLabs `data/snapshots/2026-10-28/prices.csv`:
  - P06 Airbnb all-in = 0.765 x PL + £129/2, and P08 = 0.85 x PL + £149/2. Both factors were observed 25–26 Oct and not re-observed.
  - P05 = PL + £195/2, an upper estimate.
  - P11 and P14 are PL room price only.
- None of our listings appeared in the 31 searches.

**Rows written:**
- `data/snapshots/2026-10-28/comps.csv`: 256 rows appended (55 comps x 4 stays, plus 12 P11 comps x 3 extra stays; a blank price means not available). The file lock was used, the header was checked against `rm/snapshot.py`, and other agents' rows are untouched.
- `market.csv`: 1 row added, P11 NL.
- `rm.snapshot.load('2026-10-28')` reads 430 comps and 9 market rows.

**Positioning:**
- Calculated with `rm/positioning.py` (`percentile_rank`, `quality_premium`, `recommend`).
- Occupancy comes from `reports/2026-10-28/kpi_pack.json`. I used `forward_occ_30_ex_blocks` where present, else `forward_occ_30`/`_60`, against `market_occ_30`/`_60`.
- "Avg pct" is the mean of the per-stay percentiles.
- The base review is closed (hold; next review 2 Nov), so the `recommend` outputs are positioning signals.

**Comps kept although missing from every stay today:** all six pages returned HTTP 200 today, and `personCapacity` was unchanged. They are not inactive by the rule, so I kept them.

| Ref | Comp | Missing from every stay since | `personCapacity` |
|---|---|---|---|
| P08 | 1289147258305624118 | 26 Oct (3rd day) | 4 |
| P06 | 917140285217729256 | 26 Oct (3rd day) | 5 |
| P11 | 1515051936255130803 | 27 Oct (2nd day, across 7 stays out to 13 Dec) | 6 |
| P06 | 1452940332365117153 | 27 Oct | 5 |
| P14 | 1595613237427991150 | 27 Oct | 3 |
| P14 | 1075245497252121738 | today | 4 |

If P11 1515051936255130803 is missing again tomorrow, the reserve is 1423000888558890581 ("The Camden Loft Apartment!", 2 BR, 0.41 km, 4.69 (42), priced on 6 of 7 stays today). Its capacity is not yet checked.

## Summary

| Ref | Comps (n priced per stay) | Comp median, stays as listed | Ours (basis) | Our pct (avg) | Rating ours vs comp median; reviews gap | Booked vs mkt 30d | `recommend` / supported positioning |
|---|---|---|---|---|---|---|---|
| P05 4BR | 6 (3–5; 2 on 27 Nov) | £529 / £509 / £674 / £970 | £529 / £560 / £751 / £713 (est. all-in; all booked or blocked) | **P39** | Airbnb 4.76 (34) vs 4.33 (21.5); +12.5 | 77.8% vs 38% | raise +25% (ceiling, thin set) |
| P06 2BR | 12 (2–6) | £348 / £371 / blocked / blocked | £289 / £286 (derived; booked) | **P10** | Airbnb 4.56 (9) vs 4.64 (25); −16 | 58.9% vs 45% (ex-blocks) | raise +10% (no open night to apply it) |
| P08 2BR | 6 (2) | £314 / £286 / after handback | £253 / £250 (derived; booked) | **P50** | Airbnb 4.33 (3) vs 4.81 (27.5); −24.5 | 81.2% vs 50% | raise +10% |
| **P11 2BR** | 12 (3–9) | £322 / £272 / £358 / £615 / **£350 / £374 / £478** (1–3 Dec, 8–10 Dec, 11–13 Dec) | £191 / £218 / £216 / £307 / **£221 / £231 / £301** (PL room only) | **P5** (near-term P7, reopened window P3) | Booking.com 8.0/10 (policy, 21 Oct): not comparable with Airbnb 4.67 (35.5); review count NOT CHECKED | 44.8% vs 43% (30d); 35.6% vs 38% (60d) | **raise +5%** (30d and 60d) |
| P14 1BR | 12 (3–7) | £236 / £228 / £296 / £304 | £500 / £500 / £500 / £555 (room) | P100 | not seen on Airbnb | 0% vs 40% | special setup: numbers only |
| P17 1BR | 7 (1–6) | £237 / £204 / £227 / £273 | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

Stays in the median column are in the table order: 3–5 Nov / 30 Oct–1 Nov / 24–26 Nov / 27–29 Nov.

**Comp prices day on day (same comp and stay, 27 → 28 Oct):**
- Median change is 0.0% for P05, P06, P08, P14 and P17.
- **P11 at the weekend: −3.9% (n=5).** Four comps each cut about 4% for 30 Oct–1 Nov: 1542815721953379556, 1543632408013225027, 1542960049319560709 and 1675590787835266115.
- P14 1405104068242896146 is −13% at the weekend.

## P11 Camden 2-bed (3064196): Booking.com only. Focus: reopened 28 Nov–12 Dec

**What reopened.** Smoobu shows the 28 Nov–12 Dec booking (14 nights, £2,950.82, which is £210.77 per night excl. cleaning) cancelled on 27 Oct at 11:29 (Dispatcher; `reservations.csv`). 5–8 Dec was resold the same day: Booking.com, £656.07, £218.69 per night. That leaves **11 nights for sale: 28 Nov–4 Dec and 8–11 Dec.** PriceLabs `prices.csv` 28 Oct still shows 5–7 Dec and 29–31 Oct as open, which is a calendar lag.

**Price move after the cancellation.** PriceLabs for 28 Nov–11 Dec is now £3,558 against £4,055 on 27 Oct, **−12.3%**. Per night, for example: 28 Nov 349 → 308, 1 Dec 240 → 211, 11 Dec 339 → 299 (`prices.csv` 27 vs 28 Oct). Two inputs are consistent with this:
- `get_user_logs`: Reyhan added a −2% override with **min stay 3** on 18 Nov–16 Dec on 27 Oct at 11:56Z, 27 minutes after the cancellation. The same change set 17–18 Dec to −2% min 2, and it replaced the −3% min 2 override on 18–27 Nov.
- `get_customizations`: the occupancy profile is **"Aggressive"**. For 31–60 days out it ranges from +20% at full occupancy to −15% at 10%, and the cancellation lowered occupancy. Other settings: last-minute "No Discount", Booking Recency Factor on, far-out +30% after 150 days.
- For the record: the overrides on 13–16 Dec (darts) are now −2% min 3, and 17–18 Dec are −2% min 2. Both were set by Reyhan on 27 Oct (`get_user_logs`). Reported only; policy says leave the darts override, so no proposal here.

The table below is generated by `c28s/tables28.py`.

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Fri 27–Sun 29 Nov | Tue 1–Thu 3 Dec | Tue 8–Thu 10 Dec | Fri 11–Sun 13 Dec | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.69 (29) | £352 | £328 (-4%) | £440 | £440 | £440 | £440 | £589 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £285 | n/a | £282 | £374 | £374 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £350 | £272 (-4%) | £474 | £615 | £434 | £454 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (68) | £238 (-4%) | n/a | £438 | n/a | n/a | n/a | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £294 | £272 (-4%) | £474 | £615 | £434 | £454 | £554 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a (was £286) | £298 (-4%) | £358 | n/a | £388 | £388 | £478 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | n/a (was £212) | n/a (was £262) | £312 | n/a | £312 | £312 | n/a | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | £241 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (86) | n/a | n/a | £210 | n/a | £226 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (71) | n/a | £228 | n/a | n/a | n/a | £222 | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | n/a | n/a | £290 | £308 | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £322 (4) | £272 (5) | £358 (9) | £615 (3) | £350 (8) | £374 (9) | £478 (5) | |
| **Ours, PL room/night (status, min stay)** | | | | £191 Booked, min 2 | £218 Open, min 2 | £216 Open, min 3 | £307 Open, min 3 | £221 Open, min 3 | £231 Open, min 3 | £301 Open, min 3 | |
| **Our percentile / vs median** | | | | P0 / −41% | P0 / −20% | P22 / −40% | P0 / −50% | P0 / −37% | P11 / −38% | P0 / −37% | |

**How robust the gap is:**
1. **Basis bias.** The comps include cleaning on a 2-night stay, while ours is room only. Even if I assume the Booking.com guest pays the full list price (PL x 1.15 Smoobu markup, no Mobile or Genius discount), we are still at P0–P22, **−27% to −43%** vs the comp median in the window. At PL x 0.93 (markup x Mobile 10% x Genius 10%) we are at P0, −41% to −54%.
2. **PriceLabs Nearby Listings.** This is the second source. It is host-only fee, uses the listing's 1–3 BR filter, n=283, and is not a comp set (`get_neighbourhood_data` 28 Oct). Over the 14 reopened nights we average **−11% vs NL P50**:
   - Fri/Sat 28 Nov, 5 Dec and 11 Dec sit between P50 and P75 (308 vs 288; 319 vs 310; 299 vs 292).
   - **Midweek 30 Nov, 1 Dec and 9 Dec are below NL P25** (202 vs 207; 211 vs 217; 225 vs 227).
   - The same-BR 2 BR band is 241 / 302 / 352 / 401 (n=172).
3. **Market demand in the window** (NL daily): Fri/Sat occupancy is 48–51% (27–28 Nov, 4–5 Dec) and midweek is 22–26%. PriceLabs flags 5–7 Dec as a +9.7% demand surge, and we have resold those nights.
4. **Booking.com search position, price and review count: NOT CHECKED** today. The last data is Corentin's 24 Oct search (position 91 of 313, policy).

**Supported positioning:** `quality_premium` = 0, because 8.0/10 cannot be compared with Airbnb stars.
- 30 days: `recommend(0.448, 0.43, 0.07, 0)` returns **raise +5%** ("in line with market but priced below what quality supports (P7)").
- 60 days, window stays only: `recommend(0.356, 0.38, 0.03, 0)` also returns **raise +5%**.
- **Reasoning:** we are the cheapest or near-cheapest in the Airbnb set on every reopened stay. Midweek nights sit below NL P25 even after allowing for cleaning, so a +5% step on the midweek window nights (29 Nov–3 Dec, 8–10 Dec) is supported. Weekends already sit at NL P50–P75, so they are a hold. Because the base review is closed, I am noting this for 2 Nov. The window is 31+ days out, so it is a candidate for the Reyhan override if Corentin wants to act sooner.
- **Min stay 3** (Reyhan, 27 Oct) applies to all 11 open window nights. The 2-night comp stays here would not be bookable on ours.

**Differentiators:** 6 of the 12 comps have a lift or a balcony/terrace, and 1 is a Superhost. P11 is a basement with a patio, no lift and no parking. It is next to Camden Town station.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

The comp table, with a 27–29 Nov column added, is in `c28/tables.md` and in `comps.csv`. Medians: £529 (n=5) / £509 (3) / £674 (4) / £970 (2).
- **Our side:** all four probe stays are booked, plus 29–30 Oct, which is blocked with the reason unknown (`prices.csv`; kpi_summary "7% blocked, reason unknown"). Our comparable all-in estimate is £529 / £560 / £751 / £713. That puts us at P40 / P67 / P50 / P0 (**avg P39**), which is 0% / +10% / +12% / −26% vs the median. The 27 Nov median rests on 2 comps (£920, £1,020).
- **Supported positioning:** `quality_premium(4.76, 4.33)` = +0.15 (capped). `recommend(0.778, 0.38, 0.39, 0.15)` returns **raise +25%** ("booked +40% vs market but priced at P39"), and 60 days gives the same. Reasoning: it books at 2x the market and is rated 0.4 stars above the comps, but 2–5 priced comps per stay make +25% a ceiling for 2 Nov, not a step.
- **Open nights:** 6–9 Nov 460/468/456/431 (6–7 Nov fell from 475/482 overnight), 16–17 Nov 430/446, 29 Nov–2 Dec 553/531/551/554, 7–8 Dec 512/503 and 13–14 Dec 596/582. Base is £550.
- **Differentiators:** the comps list parking (4 of 6), a terrace (3) and a lift with a park view (912053248917940403, 5.0, Superhost, priced again at £672/£772). P05 has no lift and no parking.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

- Medians are £348 (n=5) and £371 (2) on 3–5 Nov and 30 Oct–1 Nov. Our derived all-in is £289 / £286 (booked), which is **P20 / P0 (avg P10), −17% / −23%**. 24–29 Nov is blocked on purpose and excluded per policy.
- `quality_premium(4.56, 4.64)` = −0.034. `recommend(0.589, 0.45, 0.10, −0.034)` returns **raise +10%** ("booked +14% vs market but priced at P10"). Reasoning: what is sellable sells, and we sit in the bottom decile.
- The 60-day output, fix-listing, is not used: `forward_occ_60` (16.9%) counts intentional blocks.
- `prices.csv` 28 Oct has **no available P06 night up to 14 Dec**. 8–14 Nov changed from "Blocked" to unavailable with no status. Whether this is a block or a closure is NOT CHECKED (occupancy section).
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor with no lift.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

- Medians are £314 / £286 on 3–5 Nov and 30 Oct–1 Nov, each on **n=2**. 693487869095756237 (4.98, Superhost) was priced yesterday and is not available today.
- Our derived all-in is £253 / £250 (both booked; 29–30 Oct is now booked by the 27–31 Oct Airbnb stay). That is **P50 / P50, −19% / −13%**. Our PriceLabs prices rose about 10% overnight (3–4 Nov 186/188 → 215/206).
- `quality_premium(4.33, 4.81)` = −0.15. `recommend(0.812, 0.50, 0.50, −0.15)` returns **raise +10%** ("booked +31% vs market but priced at P50"). Reasoning: the flat books well ahead of the market and is still under the median, but 3 reviews cap the premium.
- **Open nights before handback:** only 5–7 Nov (213/234/235). The derived all-in for Fri–Sat 6–7 Nov is about £273, under the £286 weekend median. A +10% move gives about £295.
- **Differentiators:** ground-floor terrace. 2 of the 6 comps are Superhost / Guest favourite at 4.98–5.0.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

PriceLabs £500 / £500 / £500 / £555 (27–28 Nov 525/585), min stay 3–4, base 525 and min 500 (`listings.csv`). Comp medians are £236 / £228 / £296 / £304, which puts us at P100 and **+111% / +120% / +69% / +83%**. Comp median rating is 4.91 (18.5 reviews). Occupancy is 0% vs 40% market over 30 days (`kpi_pack`). No positioning, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

Comp medians are £237 / £204 / £227 / £273 (n=4 / 3 / 6 / 1), with a median rating of 4.56 (49). `kpi_pack`: no PriceLabs listing mapped. This remains a reference set only.

Data gaps:
- Booking.com is NOT CHECKED for all six properties (WAF challenge). That leaves P11's Booking.com display price, search position and review count unknown. P11's percentile is measured as PL room price against Airbnb all-in comps, so it is biased low; see the robustness checks.
- PriceLabs `prices.csv` 28 Oct still shows P11 29–31 Oct and 5–7 Dec as open, although Smoobu has both booked. This is a calendar lag.
- Our Airbnb all-in factors for P06 and P08 were not re-observed (they date from 25–26 Oct). P05 cleaning is folded in as an upper estimate.
- The P08 and P05 sets are thin (2 priced comps per stay on several stays). Six comps were missing from every stay but their pages are live (listed above).
- P06 has no available night to 14 Dec in `prices.csv`, cause NOT CHECKED. P05 29–30 Oct block reason unknown.
- P17 is not in PriceLabs or Smoobu.
- PriceLabs NL percentiles are not a comp set. The daily figures use a 1–3 BR mix, and whether cleaning is included is unclear (fee_structure "Host-only fee").

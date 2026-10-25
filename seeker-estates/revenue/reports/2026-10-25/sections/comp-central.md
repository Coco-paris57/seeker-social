# Competitor positioning: CENTRAL/NORTH (D = 2026-10-25)

**What changed in the method today:** airbnb.co.uk is reachable through the proxy today (HTTP 200; it was CONNECT 403 on 24 Oct). So this batch now has **real individual comps**, not just percentiles. Booking.com still returns an empty bot-challenge page (HTTP 202), so it is **NOT CHECKED**. PriceLabs still has no comp source: `get_neighborhood_data_sources` (P11, 25 Oct) reports "Competitor Listings source is not enabled for this account" and "No Market Dashboard reports available". I used the Nearby Listings same-BR percentiles only as context, and I appended them to `data/snapshots/2026-10-25/market.csv` (P05, P06, P08, P11, P14) without touching the other agents' rows.

**Comp method (Airbnb public search, checked 25 Oct):**
- **Search:** a map box of about 1 km around the PriceLabs listing coordinates (`raw/listing_data.json`). P17 is not in PriceLabs, so for it I centred the box on St John's Wood station (tube catchment). Filters: entire home, `min_bedrooms` = ours, adults = our sleeps − 1. I read up to 10 result pages for each stay.
- **Comp filter:** exactly the same bedroom count, at least 10 reviews, capacity within ±1 of ours (read from each listing page as `personCapacity`), within 1.0 km. The radius widens to 1.6 km for P05, P08 and P17 because fewer than 6 listings qualified inside 1 km. I excluded Airbnb 24200192 (P06 area), which shows a flat £2,600/night on every date, i.e. a parked price.
- **Stays, the same for every comp and for us:** midweek Tue 27–Thu 29 Oct, weekend Fri 30 Oct–Sun 1 Nov, and 30 days out Tue 24–Thu 26 Nov (2 nights each).
- **Price basis:** Airbnb UK search shows one all-in figure, "N nights x £X". I verified on our own listings that **cleaning is folded into that per-night figure**. P08: 2, 3 and 4-night totals fit 0.85 × PriceLabs + £149 exactly, and £149 is the P08 Airbnb cleaning fee in `reservations.csv`. P06: 0.765 × PriceLabs + £129, and £129 is the P06 cleaning fee in `reservations.csv`. So every comp price below is **nightly excl. taxes, cleaning INCLUDED**, and so are "Ours, Airbnb all-in" figures. Where a comp shows a "Special offer" or "Early booking discount", I give the price after it.
- **Gaps in the comp tables:** "n/a" for a comp means it was not returned for those dates (booked, or min stay above 2 nights). That is why the per-date n is smaller than the comp count.
- **Comp ids:** stored in `data/snapshots/2026-10-25/comps.csv` (156 rows: 52 comps × 3 stays, unavailable stays kept with a blank price). This is the first day with comp ids for this batch: `data/snapshots/2026-10-24/comps.csv` has no rows. Keep the same ids from 26 Oct.
- **Positioning:** `rm/positioning.py` `percentile_rank`, `quality_premium` and `recommend`. Our occupancy comes from `reports/2026-10-25/kpi_pack.json`: `forward_occ_30_ex_blocks` where present (blocks excluded, per policy), otherwise `forward_occ_30` / `forward_occ_60`, with `market_occ_30` / `market_occ_60`. "avg pct" is the mean of the per-stay percentiles.

## Summary

| Ref | Comps (radius) | Comp median 27–29 Oct / 30 Oct–1 Nov / 24–26 Nov | Ours (basis) | Our pct (avg) | Rating ours vs comp median; reviews | Booked vs mkt 30d | `recommend` |
|---|---|---|---|---|---|---|---|
| P05 4BR | 5 (1.6 km) | £547 (2) / £465 (2) / £678 (4) | £473 / £491 / £750 (est. all-in) | P50 | Airbnb 4.76 (34) vs 4.29 (16); +18 reviews | 70.4% vs 38% | raise +25% (thin sample) |
| P06 2BR | 12 (1.0 km) | £342 (6) / £384 (6) / £478 (7) | £285 / £310 / blocked (derived all-in) | P17 | Airbnb 4.56 (9) vs 4.64 (25); −16 reviews | 77% vs 44% (blocks excl.) | raise +10% |
| P08 2BR | 5 (1.6 km) | £384 (2) / £278 (3) / after handback | £208 / £215 (our Airbnb, as displayed) | P0 | Airbnb 4.33 (3) vs 4.82 (20); −17 reviews | 33.4% vs 51% | fix-listing, 0% |
| P11 2BR | 12 (1.0 km) | £293 (3) / £322 (8) / £312 (9) | £194 / £210 / £244 (PriceLabs room only) | P7 (biased low) | Booking.com 8.0/10 vs Airbnb 4.69 (35.5): not comparable | 44.8% vs 44% | raise +5% (30d) / +10% (60d) |
| P14 1BR | 12 (1.0 km) | £254 (3) / £243 (8) / £302 (7) | £500 every night (room only) | P100 | not found on Airbnb in 2-night searches | 0% vs 40% | special setup: numbers only |
| P17 1BR | 6 (1.6 km) | £242 (2) / £206 (2) / £233 (6) | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £421 | £421 | £819 | parking |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.38 (16) | n/a | £509 | £1020 | parking, balcony/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 5.0 (27) | £672 | n/a | n/a | Superhost, Guest favourite, lift, Park view |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £356 | parking |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.91 (11) | n/a | n/a | £537 | balcony/terrace |
| **Comp median (n)** | | | 4.29 (16) | £547 (2) | £465 (2) | £678 (4) | |
| **Ours, PriceLabs room/night** | | | | £376 Blocked/Blocked | £394 Open/Booked (Check-In) | £653 Booked/Booked | |
| **Ours, Airbnb all-in basis** | | | | £473 | £491 | £750 | estimate PL + £195/2 (Airbnb rules not verified) |
| **Our percentile / vs median** | | | | P50 / -14% | P50 / +6% | P50 / +11% | |

- **Our side:** the PriceLabs price is from `prices.csv`. On every stay date at least one night is blocked or booked. 27–28 Oct is a delivery block (policy), 31 Oct is a check-in, and 24–25 Nov is booked at ADR £621. Our Airbnb listing was not returned on any of the three stays. "All-in" adds the £195 cleaning fee (policy, and `reservations.csv`) spread over the 2 nights. It assumes no Airbnb pricing-rule discount, so it is an upper estimate: P06 and P08 show 0.765–0.85 × PriceLabs on Airbnb.
- **Position:** P50 on every stay, i.e. between the 2–4 comps priced, which is about −14% / +6% / +11% vs the median. The PriceLabs NL 4 BR band is 507 / 615 / 743 / 1172 (n=89). Our 30-day open average is £471 (`kpi_pack`), which is below P25.
- **Supported positioning:** `quality_premium(4.76, 4.29)` = +0.15 (capped). `recommend(0.704, 0.38, 0.50, 0.15)` returns **raise +25%** ("booked +32% vs market but priced at P50: under-priced"). Reasoning: it books at 1.85x the market and is rated 0.47 stars above the comps. But only 2–4 comp prices exist per stay, so treat +25% as an upper bound for the 26 Oct base review (policy `price_changes`), not as a step to apply in one go.
- **Differentiators:** the comps mostly list parking, and one has a lift and a park view (912053248917940403, 5.0, Superhost). We have no lift, are spread over 4 floors and have no parking, but have Abbey Road / Lord's and 2 bathrooms plus a WC.
- **Since 24 Oct:** median +1.4% (n=59). 7 Nov fell 630 -> 459 (−27%), which is not logged (`get_user_logs` 24–25 Oct: no entries).

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272): intentional blocks excluded

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.9 (10) | £347 | £382 | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.63 (19) | £280 | n/a | £296 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.78 (60) | n/a | £328 | £348 | parking |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £337 | n/a | £478 | lift, parking |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | n/a | £359 | £557 | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £708 | n/a | £894 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.57 (21) | £563 | £532 | n/a | lift (Special offer -317; Special offer -293) |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | £386 | n/a | - |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.52 (21) | n/a | n/a | £474 | - |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | n/a | £445 | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | £222 | n/a | n/a | - |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (85) | n/a | n/a | £656 | parking |
| **Comp median (n)** | | | 4.64 (25) | £342 (6) | £384 (6) | £478 (7) | |
| **Ours, PriceLabs room/night** | | | | £288 Booked/Booked | £321 Booked/Booked | £454 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £285 | £310 | £411 | derived 0.765xPL + cleaning £129/2 |
| **Our percentile / vs median** | | | | P33 / -17% | P0 / -19% | excluded | |

- **Our side:** every one of our stay nights is already booked (27 Oct–1 Nov, booked ADR £177.83) or blocked on purpose (24 Nov, excluded per policy). So the "ours" figures are the listed price, not something a guest can buy. Our Airbnb all-in = 0.765 × PriceLabs + £129/2. I derived this from our own listing on the only open nights, 5–7 Nov: 2 nights at £329.19 and 3 nights at £312.53 per night (Airbnb search, 25 Oct), against PriceLabs 331 / 361 / 365. Our Airbnb rating is 4.56 (9), read from the same search.
- **Position:** P33 / P0, which is −17% / −19% vs the comp median on the stays priced. The NL 2 BR band is 325 / 415 / 542 / 692 (n=216).
- **Supported positioning:** `quality_premium(4.56, 4.635)` = −0.03. `recommend(0.77, 0.44, 0.17, −0.03)` returns **raise +10%**: about −9% to −11% vs the comp median, on the 3 open nights (5–7 Nov) only. Reasoning: 77% of non-blocked nights are booked while we sit in the bottom fifth of comps, and our rating is level with theirs.
- **Airbnb factor 0.765 × PriceLabs:** P06's Airbnb price is 23.5% below PriceLabs before cleaning. Most likely this is the Smoobu Airbnb default pricing rules stacking on top of PriceLabs. Policy records that mechanism for the Shepherd's Bush listings only, and it was changed there on 21 Oct. Whether P06's Smoobu Airbnb rules were changed is NOT CHECKED.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor with no lift and a street view.

## P08 Islington 2-bed (3318167; Airbnb 1683999279257475317): sellable to 13 Nov only (handback)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | - |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £215 | £201 | - |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (64) | n/a | £278 | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | £361 | n/a | n/a | Superhost, Guest favourite, parking, balcony/terrace |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | £204 | - (Early booking discount -14) |
| **Comp median (n)** | | | 4.82 (20) | £384 (2) | £278 (3) | £204 (3) | |
| **Ours, PriceLabs room/night** | | | | £158 Open/Open | £165 Open/Open | £236 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £208 | £215 | £276 | our Airbnb listing as displayed in the same search |
| **Our percentile / vs median** | | | | P0 / -46% | P0 / -23% | excluded | |

- **Our side:** P08 is our own Airbnb listing as returned in the same searches. 27–29 Oct shows £208.38/night all-in and 30 Oct–1 Nov shows £214.75, against PriceLabs £157.5 and £165. That is 0.85 × PriceLabs + £149 cleaning, verified on 2-, 3- and 4-night stays. The 24–26 Nov stay is after the 13 Nov handback and is excluded. Rating 4.33 from 3 reviews.
- **Position:** the cheapest option in the set on both stays (P0): −46% and −23% vs the comp median. On the weekend, comp 1275323094602434212 (1.4 km, £215) is the same price as us. The NL 2 BR band is 184 / 227 / 283 / 346.
- **Supported positioning:** `quality_premium(4.33, 4.82)` = −0.15. `recommend(0.334, 0.51, 0.0, −0.15)` returns **fix-listing, 0%** ("behind market −18% while already at P0"). Reasoning: we are already the cheapest comp and still do not book, so the problem is the listing (3 reviews, 4.33, no Superhost, against Superhost / Guest-favourite comps), not the price. Further cuts only hit the £150 floor.
- **Since 24 Oct:** 26 Oct changed from Open to Blocked (reason unknown). Open nights are flat (median 0.0%).
- **Differentiators:** we have a ground-floor terrace. 2 of the 5 comps are Superhost / Guest favourite with 4.98–5.0.

## P11 Camden 2-bed (3064196): Booking.com only, so the comparison is indirect

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.69 (29) | £328 | £352 | £440 | lift, balcony/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (179) | n/a | £291 | £293 | - |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £293 | £350 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (68) | n/a | £338 | £438 | - |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | n/a | £308 | £474 | - |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.82 (11) | n/a | £358 | £358 | balcony/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | n/a | £262 | £312 | - |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.49 (57) | n/a | n/a | £191 | - |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (86) | n/a | n/a | £210 | - |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (71) | n/a | £234 | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | £300 | balcony/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | £220 | n/a | n/a | lift, parking |
| **Comp median (n)** | | | 4.69 (35.5) | £293 (3) | £322 (8) | £312 (9) | |
| **Ours, PriceLabs room/night** | | | | £194 Booked/Open | £210 Open/Open | £244 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | room only (cleaning unknown) |
| **Our percentile / vs median** | | | | P0 / -34% | P0 / -35% | P22 / -22% | |

- **Basis problem:** Camden is not on Airbnb (policy) and Booking.com is NOT CHECKED, so I can only compare our **PriceLabs room price (no cleaning)** with comp prices that **include cleaning**. That biases our percentile low. Booking.com list = PriceLabs × 1.15 (markup since 24 Oct), before Mobile 10%, Genius and Last Minute 10% (policy). The Booking.com cleaning fee is not recorded in `reservations.csv` (blank for P11). Thresholds: for the weekend to reach the comp median of £322.5, the Booking.com cleaning fee would need to be at least **£163** on the list-price basis ((322.5 − 209.5 × 1.15) × 2), or £226 on the PriceLabs basis, before promotions. Below that, P11 is under the comp median.
- **Position:** P0 / P0 / P22 (avg P7) on the room-only basis: −34% / −35% / −22% vs the median. The NL 2 BR band is 244 / 306 / 361 / 409.
- **Supported positioning:** `quality_premium` = 0, because Booking.com 8.0/10 (policy, analytics) cannot be compared with Airbnb 5-star ratings. 30 days: `recommend(0.448, 0.44, 0.07)` returns **raise +5%**. 60 days: `recommend(0.525, 0.38, 0.22)` returns **raise +10%**. Reasoning: occupancy is in line with the market at 30 days and +15 points at 60 days, and even with plausible cleaning added we sit in the lower half of comps.
- **Discount stack still on (relevant to Corentin's direction to cut PriceLabs-side discounts):** on 25 Oct `get_customizations` (P11) shows last-minute **18% within 15 days (gradual)**, the Booking Recency Factor (5% → 15%) and the **Aggressive** occupancy profile, all switched on. `get_user_logs` shows no listing changes on P05/P06/P08/P11/P14 on 24–25 Oct. So for P11, the cut has **not been applied** in PriceLabs as of this check. The last P11 booking was 4 Oct (pickup_7d 0).
- **Since 24 Oct:** median −0.5%. 23 Nov fell 253 -> 205 and 24 Nov fell 262 -> 222 (both −16 to −19%). 9 Nov rose 194 -> 224.
- **Differentiators:** 6 of the 12 comps have a lift and/or balcony. P11 is a basement with a patio, no lift and no parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | n/a | £228 | £252 | - |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £278 | £352 | parking |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (18) | £260 | £260 | n/a | Superhost, Guest favourite, parking |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.76 (46) | n/a | £232 | £302 | - |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £232 | £278 | - |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | £254 | n/a | Superhost, Guest favourite, parking |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | £402 | balcony/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | £308 | Superhost, Guest favourite, Canal view, City skyline view, Garden view |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (17) | n/a | £216 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (14) | n/a | n/a | £200 | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £276 | n/a | Superhost, Guest favourite, parking, balcony/terrace |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | £206 | n/a | n/a | balcony/terrace |
| **Comp median (n)** | | | 4.91 (18.5) | £254 (3) | £243 (8) | £302 (7) | |
| **Ours, PriceLabs room/night** | | | | £500 Open/Open | £500 Open/Open | £500 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | room only (cleaning unknown) |
| **Our percentile / vs median** | | | | P100 / +97% | P100 / +106% | P100 / +65% | |

- **Numbers:** PriceLabs is £500 on every stay night (min stay 3–4). Comp medians are £254 / £243 / £302 all-in, so P14 is +97% / +106% / +65% vs the median on room price alone, P100 on every stay. The NL 1 BR band is 153 / 204 / 255 / 301 (n=174). 0% booked in the next 30 and 60 days, against a market of 40% / 37% (`kpi_pack`). Day on day: 0.0%. P14 was not returned in any 2-night search (its min stay is 3–4), so its Airbnb display and rating are NOT CHECKED. No positioning, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

| Airbnb id | Dist km | Sleeps | Rating (reviews) | 27–29 Oct | 30 Oct–1 Nov | 24–26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £186 | £192 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | £294 | n/a | £320 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | £226 | £228 | - |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | n/a | n/a | £273 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £239 | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (167) | n/a | n/a | £126 | parking |
| **Comp median (n)** | | | 4.61 (54) | £242 (2) | £206 (2) | £233 (6) | |
| **Ours, PriceLabs room/night** | | | | NOT IN SYSTEMS | NOT IN SYSTEMS | NOT IN SYSTEMS | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | room only (cleaning unknown) |
| **Our percentile / vs median** | | | | n/a | n/a | n/a | |

- `get_listings(search_query="St John's Wood")` returns 0 listings (25 Oct), so there is no price and no occupancy. The comps above are a ready reference set (1 BR, sleeps 3–5, around St John's Wood station) for when it is connected.

## Changes since 24 Oct (this batch)
1. **New:** the first real comp set for P05, P06, P08, P11, P14 and P17 (Airbnb), ids stored in `comps.csv`.
2. **P08:** confirmed as the cheapest listing in its comp set on Airbnb, and 26 Oct is now Blocked (reason unknown). Still fix-listing.
3. **P06 / P08:** our Airbnb shows 0.765x / 0.85x PriceLabs before cleaning. The Smoobu Airbnb rules discount still applies on these flats.
4. **P11:** the PriceLabs-side discounts (last-minute 18%/15d, booking recency, aggressive occupancy) are all still on. No logged change.
5. **P05:** 7 Nov fell −27% (unlogged). The comps support a raise, but the sample is thin.

## Data gaps:
1. Booking.com: NOT CHECKED (HTTP 202 bot challenge). P11's actual guest price and cleaning fee are unknown, so its percentile is a room-only lower bound.
2. Thin comp sets: P05 has 5 comps and P08 has 5 (below 6), and P17 has 6 even at a 1.6 km radius. Per-stay n is 2–4 for P05 and P08, so percentiles move a lot with a single comp.
3. Comp availability differs by date (a comp is "n/a" when it is booked or its min stay is above 2 nights), so per-date medians are taken over different subsets.
4. Cancellation policy for comps and for us: NOT CHECKED. It is not in the Airbnb page HTML I could read.
5. Comp "parking" includes paid or off-site parking as listed. Floor level is not available from Airbnb data.
6. P05's Airbnb all-in is an estimate (PriceLabs + £195/2, with no Airbnb rule discount verified). P14's Airbnb display and rating are not observable in 2-night searches. P17 is not connected.
7. Whether P06/P08's Smoobu Airbnb pricing rules are the source of the 0.765x / 0.85x factor is NOT CHECKED (Smoobu UI).
8. The PriceLabs NL summary_table has no stated horizon and its cleaning inclusion is unknown. I fetched it in summary mode and did not save it to `raw/`.

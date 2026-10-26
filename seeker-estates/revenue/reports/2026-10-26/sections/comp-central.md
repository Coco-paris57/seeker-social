# Competitor positioning: CENTRAL/NORTH (D = 2026-10-26)

**Method (unchanged from 25 Oct, comp ids reused):** airbnb.co.uk answered plain requests today (HTTP 200, no challenge), so I refreshed the prices for the **same 52 comp ids** stored in `data/snapshots/2026-10-25/comps.csv`. I re-ran the same Airbnb map-box searches (same box, entire home, min bedrooms = ours, adults = our sleeps − 1, every result page) and matched on comp id. I priced the **same stays as 25 Oct**: Tue 27–Thu 29 Oct (midweek), Fri 30 Oct–Sun 1 Nov (next weekend) and Tue 24–Thu 26 Nov (29 days out, kept rather than moving to 25–27 Nov so the day-on-day change is like for like). Booking.com was not tried (it was a bot challenge on 25 Oct and I did not work around it): **NOT CHECKED**. PriceLabs still has no comp source (Competitor Listings not enabled, no Market Dashboard: `get_neighborhood_data_sources`, 25 Oct). So the Nearby Listings same-BR percentiles are context only. I pulled them one call at a time with `get_neighbourhood_data` (P05, P06, P08, P11, P14, 26 Oct).
- **Price basis:** Airbnb UK search shows "N nights x £X" with cleaning folded in. So every comp price is **nightly, excl. taxes, cleaning INCLUDED**, after any special offer or early-booking discount. One comp (P06 1259401393497276633) showed a separate "Taxes" line, which I removed (£415.10 = line price before taxes). Our P08 Airbnb figure was observed again today: 27–29 Oct "2 nights x £206.68". That equals 0.85 × PriceLabs (154/157) + £149/2, so the 25 Oct factor still holds.
- **Comp set changes:** none. Four comps came back on none of today's three stays: P05 912053248917940403, P06 917140285217729256, P06 673753763892997438, and P08 1289147258305624118. All four listing pages still load (HTTP 200, same capacity and review count), so I kept them as "n/a for these dates", not inactive. I found no new qualifying comps for the thin sets: the 4 new exact-BR candidates near P05/P08 fail the ±1 capacity rule (sleeps 10/11 vs 8; 7/8 vs 5).
- **Rows written:** 156 rows (52 comps × 3 stays, unavailable stays have a blank price) appended to `data/snapshots/2026-10-26/comps.csv`, and 5 rows (P05, P06, P08, P11, P14) appended to `data/snapshots/2026-10-26/market.csv`. The other agents' rows are untouched. `rm.snapshot.load('2026-10-26')` reads 358 comps and 12 market rows.
- **Positioning:** `rm/positioning.py` `percentile_rank` / `quality_premium` / `recommend`. Occupancy comes from `reports/2026-10-26/kpi_pack.json` (`forward_occ_30_ex_blocks` where present, else `forward_occ_30`/`_60`; `market_occ_30`/`_60`). "Avg pct" is the mean of the per-stay percentiles. "(+x%)" in a comp cell is the change against the same comp and stay on 25 Oct.

## Summary

| Ref | Comps | Comp median 27–29 Oct / 30 Oct–1 Nov / 24–26 Nov | Ours (basis) | Our pct (avg) | Rating ours vs comp median; reviews gap | Booked vs mkt 30d | `recommend` |
|---|---|---|---|---|---|---|---|
| P05 4BR | 5 (1.6 km) | £421 (1) / £465 (2) / £678 (4) | £470 / £486 / £782 (est. all-in; blocked / check-in / booked) | P67 | Airbnb 4.76 (34) vs 4.29 (16); +18 | 70.4% vs 39% | raise +25% (thin; see base review) |
| P06 2BR | 12 (1.0 km) | £337 (5) / £371 (4) / £478 (7) | £276 / £304 / blocked (derived all-in; all booked) | P10 | Airbnb 4.56 (9) vs 4.65 (25); −16 | 100% of non-blocked nights | raise +10%, but no open nights left |
| P08 2BR | 5 (1.6 km) | £416 (1) / £278 (3) / after handback | £207 (observed) / £213 (derived) | P0 | Airbnb 4.33 (3) vs 4.82 (20); −17 | 61.1% vs 51% | raise +10% (was fix-listing) |
| P11 2BR | 12 (1.0 km) | £293 (3) / £316 (6) / £358 (9) | £182 / £198 / £220 (PriceLabs room only) | P7 (biased low) | Booking.com 8.0/10: not comparable | 41.4% vs 44% | raise +5% (30d) / +10% (60d) |
| P14 1BR | 12 (1.0 km) | £254 (3) / £254 (7) / £290 (7) | £500 every night (room only) | P100 | not seen on Airbnb (min stay 3–4) | 0% vs 40% | special setup: numbers only |
| P17 1BR | 6 (1.6 km) | £227 (2) / £209 (2) / £232 (5) | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

**Comp prices day on day:** flat. The median like-for-like change is 0.0% on every stay for P05, P06, P08, P11 and P14 (same comp, same stay, 25 → 26 Oct). Individual moves: P06 1259401393497276633 +8% at the weekend; P17 1182369331195783741 −10% midweek and 836419796998711919 +10% at the weekend. Our own PriceLabs prices moved more than the comps did: **P11 −5% to −10%** on the probe stays (room 194.5 → 181.5, 209.5 → 197.5, 243.5 → 219.5, `prices.csv` 25 vs 26 Oct).

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £421 | £421 | £819 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.38 (16) | n/a | £509 | £1020 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 5.0 (27) | n/a (was £672) | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £354 (-1%) | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.91 (11) | n/a | n/a | £537 | balcony/patio/terrace |
| **Comp median (n)** | | | 4.29 (16) | £421 (1) | £465 (2) | £678 (4) | |
| **Ours, PriceLabs room/night (status)** | | | | £372 Blocked/Blocked | £388 Open/Booked (Check-In) | £685 Booked/Booked | |
| **Ours, Airbnb all-in basis** | | | | £470 | £486 | £782 | estimate PL + £195/2 |
| **Our percentile / vs median** | | | | P100 / +12% | P50 / +4% | P50 / +15% | |

- **Our side:** none of the three probe stays can be bought. 27–28 Oct is the delivery block (policy), 31 Oct is a check-in, and 24–25 Nov is booked (ADR £621.47). Our Airbnb listing was not returned in any search. "All-in" = PriceLabs + £195/2 (`reservations.csv` cleaning). It is an upper estimate because no Airbnb rule factor has been verified for P05.
- **Position:** P100 / P50 / P50, i.e. +12% / +4% / +15% against medians of 1, 2 and 4 comps. That is too thin to rank on. The broader benchmark is the PriceLabs NL 4 BR band, 508 / 616 / 745 / 1172 (n=89, cleaning unknown). Our 30-day open average is £447.88 (`kpi_pack`), which is **below NL P25**.
- **Supported positioning:** `quality_premium(4.76, 4.29)` = +0.15 (capped). `recommend(0.704, 0.39, 0.67, 0.15)` returns **raise +25%** ("booked +31% vs market but priced at P67"). Reasoning: it books at 1.8x the market and is rated 0.47 stars above the comps, but the price rank rests on 1–4 comps, so +25% is a ceiling, not a step.
- **P05 base review (£550 → £605?):** **hold £550 today; do not apply £605 unless the agreed trigger fires.** The rule (`a-review-1026`) is to raise only if a booking arrives by the end of 26 Oct. `reservations.csv` (26 Oct) shows no P05 booking made after 18 Oct. That is 0 bookings in the 6 days at £550 (base rise pushed 20 Oct 09:27Z, policy). The comps **do not argue against £605**: +10% leaves P05 inside the comp range on the stays priced and still below the NL 4 BR median. So if a booking lands today, £605 is supported. But the only demand test of £550 so far reads zero, and the near-term open nights (29–30 Oct, 6–9 Nov, 16–17 Nov) are mostly inside the **flat 25% last-minute window (15 days)**. `get_customizations` on P05 (26 Oct) shows it still on, and the occupancy profile is "Default". So on those nights the base is not what guests see. Corentin's 25 Oct direction to set the last-minute discount to custom 0% has **not been applied on P05**. Applying it would lift the near nights by about 33% (1/0.75), much more than the base step.
- **Since 25 Oct:** 24 Nov 652 → 715 (booked, so no effect). Open nights 29–30 Oct: 415 / 424.
- **Differentiators:** the comps list parking (3 of 5), a terrace (2) and a lift with a park view (912053248917940403, 5.0, Superhost). P05 has no lift, is spread over several floors and has no parking, but is next to Abbey Road / Lord's.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272): intentional blocks excluded

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.9 (10) | £340 (-2%) | £382 | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.65 (20) | £280 | n/a | £296 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £328 | £348 | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | £337 | n/a | £478 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | n/a | £359 | £557 | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £692 (-2%) | n/a | £902 (+1%) | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.57 (21) | n/a (was £563) | n/a (was £532) | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | £415 (+8%) | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.52 (21) | n/a | n/a | £458 (-3%) | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | n/a | n/a (was £445) | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | £236 (+6%) | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (85) | n/a | n/a | £652 (-1%) | parking listed |
| **Comp median (n)** | | | 4.65 (25) | £337 (5) | £371 (4) | £478 (7) | |
| **Ours, PriceLabs room/night (status)** | | | | £277 Booked/Booked | £314 Booked/Booked | £448 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £276 | £304 | £408 | derived 0.765xPL + £129/2 |
| **Our percentile / vs median** | | | | P20 / -18% | P0 / -18% | excluded | |

- **Our side:** every probe night is booked (27 Oct–1 Nov) or blocked on purpose (24 Nov, excluded per policy). So the "ours" figures are listed prices, not a buyable offer. Derived all-in = 0.765 × PriceLabs + £129/2 (factor from 25 Oct). The new Airbnb booking (5–8 Nov, made 25 Oct) took the last open nights. `kpi_pack` shows `forward_occ_30_ex_blocks` = 1.0, and `prices.csv` 26 Oct has no other open night in the 365-day file.
- **Position:** P20 / P0, i.e. −18% / −18% vs the comp median. NL 2 BR band 325 / 416 / 543 / 691 (n=216).
- **Supported positioning:** `quality_premium(4.56, 4.645)` = −0.03. `recommend(1.0, 0.44, 0.10, −0.03)` returns **raise +10%** ("booked +56% vs market but priced at P10"). Reasoning: every sellable night is sold while we sit in the bottom decile of comps. **Nothing to apply now** (no open nights), and the planned +10% on 5–7 Nov is moot (booked). Use +10% if and when nights reopen.
- **New booking value:** 5–8 Nov `total_gbp` £804.77 + commission £144.74, minus £129 cleaning, is about £273/night room. That compares with PriceLabs 325 / 362 / 365 (`reservations.csv`, `prices.csv`). Reading total + commission as the guest price is my inference: NOT CHECKED against Airbnb.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor, no lift.

## P08 Islington 2-bed (3318167; Airbnb 1683999279257475317): sellable to 13 Nov only (handback)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £416 (+2%) | £408 | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | £215 | £201 | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (64) | n/a | £278 | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a (was £361) | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | £194 (-5%) | none listed (Early booking discount -£6.26) |
| **Comp median (n)** | | | 4.82 (20) | £416 (1) | £278 (3) | £201 (3) | |
| **Ours, PriceLabs room/night (status)** | | | | £156 Open/Open | £164 Open/Open | £238 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £207 | £213 | £277 | our Airbnb listing as displayed (26 Oct search) |
| **Our percentile / vs median** | | | | P0 / -50% | P0 / -23% | excluded | |

- **Our side:** 27–29 Oct is **observed** in today's search: £206.68/night all-in (£413.35 for 2 nights), rating 4.33 (3). 30 Oct–1 Nov is derived (0.85 × PL + £149/2). Our listing was not returned for it because the new 31 Oct–5 Nov Airbnb booking blocks it. 24–26 Nov is after the handback and excluded.
- **Position:** still the cheapest in the set: P0 on both stays, −50% / −23% vs the median. NL 2 BR band 184 / 227 / 283 / 333.
- **Supported positioning:** `quality_premium(4.33, 4.82)` = −0.15. With the 31 Oct–5 Nov booking, the 30-day occupancy rose to 61.1% vs market 51% (`kpi_pack`). `recommend(0.611, 0.51, 0.0, −0.15)` now returns **raise +10%** (it was fix-listing on 25 Oct). Reasoning: once we are ahead of the market and at P0, the low rating (3 reviews) no longer explains a P0 price. Only 6 open nights remain before the handback (27–30 Oct and 6–7 Nov). In practice +10% matters for **Fri–Sat 6–7 Nov** (PL 188/185, about £233 derived all-in), and that is still below the £278 weekend comp median. 27–30 Oct is 1–4 days out.
- **Booking value:** 31 Oct–5 Nov `total_gbp` £676.60 (5 nights, £149 cleaning) is £105.5/night room before commission, or about £131 with commission added back, vs PriceLabs about £159 average (`reservations.csv`, `prices.csv`).
- **Differentiators:** ground-floor terrace. 2 of the 5 comps are Superhost / Guest favourite at 4.98–5.0.

## P11 Camden 2-bed (3064196): Booking.com only, indirect comparison

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.69 (29) | £328 | £352 | £440 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | £282 (-3%) | £284 (-3%) | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £293 | £350 | £474 (new avail.) | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (68) | n/a | n/a (was £338) | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | n/a | n/a (was £308) | £474 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £358 | £358 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | n/a | £262 | £312 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.49 (57) | n/a | n/a | £191 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (86) | n/a | n/a | £210 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (71) | n/a | £234 | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | n/a (was £300) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | £220 | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.68 (35.5) | £293 (3) | £316 (6) | £358 (9) | |
| **Ours, PriceLabs room/night (status)** | | | | £182 Booked/Open | £198 Open/Open | £220 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | P0 / -38% | P0 / -38% | P22 / -39% | |

- **Basis problem (unchanged):** Camden is not on Airbnb (policy) and Booking.com is NOT CHECKED. So our **PriceLabs room price (no cleaning)** is set against comp prices that **include cleaning**, which biases our percentile low. Booking.com list = PriceLabs × 1.15 (policy markup) before Mobile 10% / Genius / Last Minute 10%.
- **Position:** P0 / P0 / P22 (avg P7): −38% / −38% / −39% vs median. NL 2 BR band 243 / 305 / 358 / 401 (n=173).
- **Supported positioning:** `quality_premium` = 0 (Booking.com 8.0/10 cannot be compared with Airbnb stars). 30 days: `recommend(0.414, 0.44, 0.07)` returns **raise +5%**. 60 days: `recommend(0.508, 0.38, 0.07)` returns **raise +10%**. Reasoning: occupancy is level with the market at 30 days and +13 points at 60 days, while even a generous cleaning fee would leave us in the lower half of comps.
- **Why our price fell 5–10% overnight while the comps did not move:** `get_customizations` (P11, 26 Oct) shows last-minute **18% within 15 days (gradual)**, the **Aggressive** occupancy profile and the **Booking Recency Factor** ("5% after 15 days without a booking up to 15% after 45 days, next 30 days"). All three are still on, so Corentin's 25 Oct custom-0% instruction is **not applied on P11**. The last P11 booking was made 4 Oct (22 days ago), so the recency discount is still deepening. This is consistent with the fall, but I have not shown it is the cause.
- **Differentiators:** 6 of the 12 comps have a lift or balcony. P11 is a basement with a patio, no lift, no parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | n/a | £228 | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £278 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (18) | £260 | £260 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a (was £232) | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £232 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | £254 | £290 (new avail.) | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a (was £308) | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (17) | n/a | £218 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (14) | n/a | n/a | £200 | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £276 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | £206 | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (18.5) | £254 (3) | £254 (7) | £290 (7) | |
| **Ours, PriceLabs room/night (status)** | | | | £500 Open/Open | £500 Open/Open | £500 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | P100 / +97% | P100 / +97% | P100 / +73% | |

- Numbers only (policy): PriceLabs base 525, min 500, max 2000 (`listings.csv`). Price £500 on every probe night, min stay 3–4. Occupancy 0% at 30 and 60 days vs market 40% / 38% (`kpi_pack`). Comp medians £254 / £254 / £290 (+97% / +97% / +73%, P100). NL 1 BR band 154 / 204 / 256 / 301 (n=174). Comp median rating 4.91 (18.5 reviews). P14's Airbnb display and rating were not observable in 2-night searches. No positioning, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 27–Thu 29 Oct | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £204 (+10%) | n/a (was £192) | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | £264 (-10%) | n/a | £320 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | £214 (-5%) | £222 (-3%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | n/a | n/a | £273 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £232 (-3%) | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (167) | n/a | n/a | £126 | parking listed |
| **Comp median (n)** | | | 4.61 (54.0) | £227 (2) | £209 (2) | £232 (5) | |
| **Ours, PriceLabs room/night (status)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | |

- `get_listings(search_query="St John's Wood")` still returns 0 listings (26 Oct), and P17 is `in_smoobu: false` in `kpi_pack`. These comps are a reference set for when it is connected.

## Changes since 25 Oct (this batch)
1. Comp prices are flat like for like (median 0.0%). Comp ids unchanged, no replacements. 4 comps were unavailable on all 3 stays but their pages are live.
2. **P08:** `recommend` flips from fix-listing to **raise +10%** after the 31 Oct–5 Nov booking (occupancy 33.4% → 61.1% vs market 51%). It is still P0.
3. **P06:** fully sold on non-blocked nights. The +10% has nothing to apply to.
4. **P11:** our prices are −5% to −10% on the probe stays while comps held. The PriceLabs-side discounts are still on.
5. **P05:** no booking since 18 Oct, so the £605 trigger has not fired as of the 26 Oct snapshot. The last-minute 25% is still on.
6. **PriceLabs calendar lag (to verify):** the 25 Oct Airbnb bookings for P06 (5–7 Nov) and P08 (31 Oct–4 Nov) are in Smoobu `reservations.csv` but still show **Open** in PriceLabs `prices.csv` (26 Oct). `listings.csv` `last_push` for P05/P06/P08 is 25 Oct 07:48–08:16Z, while P11/P14 pushed 26 Oct 05:50–05:55Z. PriceLabs occupancy-based logic on these flats may be working from a stale calendar.

## Data gaps:
1. Booking.com: NOT CHECKED (not attempted after the 25 Oct bot challenge). P11's guest price and cleaning fee are unknown, so its percentile is a room-only lower bound.
2. Thin comp sets: P05 and P08 have 5 comps each (below 6, even at 1.6 km), and the per-stay n is 1–4. No qualifying replacements exist within the capacity rule.
3. Ours is not buyable on most probe stays (P05 and P06 blocked or booked, P08 weekend booked), so those percentiles compare listed prices. P05 all-in is an estimate (no Airbnb factor verified). The P06 0.765 factor dates from 25 Oct and was not re-observed today.
4. Comp availability differs by date. "n/a" means booked or min stay above 2 nights, so per-date medians cover different subsets. The 4 all-n/a comps were confirmed live but not confirmed bookable in the next 60 days.
5. Cancellation policy (comps and ours) and floor level: NOT CHECKED. "Parking" includes paid or off-site parking as listed.
6. The NL summary_table horizon and cleaning treatment are unstated. Pulled in summary mode and not saved to `raw/`.
7. Reading `total_gbp` + commission as the guest-paid price for the P06/P08 bookings is an inference: NOT CHECKED in Airbnb.
8. The P05 £605 trigger was evaluated on the 26 Oct morning snapshot. A booking later on 26 Oct would not be seen here.
9. Raw search results (18 JSON files) are kept in the scratchpad, not in `raw/`: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c26/search/`.

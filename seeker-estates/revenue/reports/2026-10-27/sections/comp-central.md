# Competitor positioning: CENTRAL/NORTH (D = 2026-10-27)

**Method (same comp ids as 26 Oct, plus 3 additions):** airbnb.co.uk answered plain requests today (HTTP 200, no challenge, no workaround). I re-ran the same Airbnb map-box searches as 25–26 Oct: same box, entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. I matched on the 52 comp ids stored in `data/snapshots/2026-10-26/comps.csv`. The stays are:
- **Tue 3–Thu 5 Nov** (midweek). This replaces 27–29 Oct, which checks in today. Because the stay is new, it has no day-on-day comparison.
- **Fri 30 Oct–Sun 1 Nov** (next weekend), the same stay as 25–26 Oct.
- **Tue 24–Thu 26 Nov** (28 days out), kept so the day-on-day change is like for like.

Booking.com was not tried: **NOT CHECKED**. PriceLabs still has no comp source (Competitor Listings not enabled, no Market Dashboard). So the Nearby Listings (NL) same-BR percentiles are context only. I pulled them one call at a time with `get_neighbourhood_data` (P05, P06, P08, P11, P14, 27 Oct). I also pulled `get_customizations` (P05, P11, P08) and `get_listings` (P17).
- **Price basis:** Airbnb UK search shows "N nights x £X" with cleaning folded in. So every comp price is **nightly, excl. taxes, cleaning INCLUDED**, after any special offer.
  - Our side comes from PriceLabs `prices.csv` (27 Oct).
  - Airbnb all-in: P06 = 0.765 × PL + £129/2 and P08 = 0.85 × PL + £149/2. These factors were observed 25–26 Oct and not re-observed today.
  - P05 = PL + £195/2, an upper estimate.
  - P11 and P14 are PriceLabs room only, no cleaning.
  - None of our listings appeared in today's 18 searches.
- **Comp set changes: 3 additions, no replacements.** The thin sets gained a qualifying listing each. All three pass the BR, ±1 capacity, ≥10 reviews and ≤1.6 km rules, and I checked each listing page (`personCapacity`):
  - **P05:** + [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) (4 BR house, sleeps 8, 4.89 (27), 0.94 km, Superhost, parking, terrace). Set is now 6.
  - **P08:** + [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) (2 BR, sleeps 4, 4.6 (77), 1.22 km). Set is now 6.
  - **P17:** + [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) (1 BR, sleeps 3, 4.5 (34), 0.54 km, Superhost, parking). Set is now 7.
  - I rejected 4 other candidates on capacity: 734516999957733627 (sleeps 10) and 1293429681283799279 (11) for P05; 1447084246908114710 (8) and 1074635507664792849 (8) for P08. 1448083566004093592 (sleeps 7) would be P08 +2, so I rejected it too.
- **Comps on none of the 3 stays (kept, pages live):**
  - On none for 2 days running: P06 917140285217729256 and P08 1289147258305624118.
  - On none today: P06 1452940332365117153, P11 1568808216094734994, P11 1515051936255130803 and P14 1595613237427991150.
  - All 6 pages returned HTTP 200 today with the same capacity and review count.
  - P05 912053248917940403 and P06 673753763892997438 (all n/a on 26 Oct) are priced again today, so I am right not to have replaced them yet.
- **Rows written:** 165 rows (55 comps × 3 stays; unavailable stays have a blank price) appended to `data/snapshots/2026-10-27/comps.csv`, and 5 rows (P05, P06, P08, P11, P14) appended to `data/snapshots/2026-10-27/market.csv`. The other agents' rows are untouched (append with lock; header checked against `rm/snapshot.py`). `rm.snapshot.load('2026-10-27')` reads 376 comps and 12 market rows after my append.
- **Positioning:** I used `rm/positioning.py` `percentile_rank` / `quality_premium` / `recommend`.
  - Occupancy comes from `reports/2026-10-27/kpi_pack.json`. I used `forward_occ_30_ex_blocks` where present, else `forward_occ_30`/`_60`, against `market_occ_30`/`_60`.
  - "Avg pct" is the mean of the per-stay percentiles.
  - "(+x%)" in a comp cell is the change against the same comp and stay on 26 Oct.
  - The base review is closed (hold all, next review 2 Nov, per run context). So the `recommend` outputs below are **positioning signals for 2 Nov**, not changes for today.

## Summary

| Ref | Comps | Comp median 3–5 Nov / 30 Oct–1 Nov / 24–26 Nov (n) | Ours (basis) | Our pct (avg) | Rating ours vs comp median; reviews gap | Booked vs mkt 30d | `recommend` |
|---|---|---|---|---|---|---|---|
| P05 4BR | 6 (1.6 km) | £484 (4) / £509 (3) / £672 (4) | £502 / £486 / £748 (est. all-in; booked / check-in / booked) | P44 | Airbnb 4.76 (34) vs 4.34 (21.5); +12.5 | 71.4% vs 38% | raise +25% (thin set; ceiling) |
| P06 2BR | 12 (1.0 km) | £350 (6) / £343 (2) / £478 (5) | £291 / £296 / blocked (derived; all booked) | P9 | Airbnb 4.56 (9) vs 4.65 (25); −16 | 100% of non-blocked nights | raise +10%, no open nights |
| P08 2BR | 6 (1.6 km) | £244 (4) / £278 (3) / after handback | £233 / £233 (derived; booked / check-in) | P42 | Airbnb 4.33 (3) vs 4.81 (27.5); −24.5 | 64.7% vs 51% | raise +10% |
| P11 2BR | 12 (1.0 km) | £290 (6) / £283 (6) / £398 (8) | £198 / £228 / £214 (PL room only) | P8 (biased low) | Booking.com 8.0/10: not comparable | 37.9% vs 43% | fix-listing (30d) / raise +10% (60d) |
| P14 1BR | 12 (1.0 km) | £228 (8) / £254 (7) / £296 (8) | £500 every night (room only) | P100 | not seen on Airbnb | 0% vs 40% | special setup: numbers only |
| P17 1BR | 7 (1.6 km) | £237 (4) / £204 (3) / £225 (6) | NOT IN SYSTEMS | n/a | n/a | n/a | collect-data |

**Comp prices day on day (weekend and 24 Nov, same comp and stay, 26 → 27 Oct):**
- The median change is 0.0% for P05 (−0.4% on 24 Nov), P06, P08 and P14, −0.9% for P17, and **−3.4% for P11 at the weekend** (n=5).
- Individual moves:
  - P11 1543632408013225027 −19% and 1675590787835266115 −13% at the weekend.
  - P08 1275323094602434212 −23% at the weekend (£215 → £165).
  - P14 1248499039857613537 −11% at the weekend.
- **Our own PriceLabs prices moved much more than the comps** (`prices.csv` 26 vs 27 Oct):
  - P11 weekend +15% (190/205 → 219/237).
  - P08 open nights +13–16% (30 Oct 162 → 185).
  - P05 30 Oct −12% (424 → 372).
  - The customization changes below explain these moves.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | £421 | £819 | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.38 (16) | £575 | £509 | £1020 | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 5.0 (27) | n/a | £772 (new avail.) | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £351 (-1%) | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.91 (11) | £400 | n/a | £524 (-2%) | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) (new) | 0.94 | 8 | 4.89 (27) | £440 | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.34 (21.5) | £484 (4) | £509 (3) | £672 (4) | |
| **Ours, PriceLabs room/night (status)** | | | | £404 Booked/Booked | £389 Open/Booked (Check-In) | £650 Booked/Booked | |
| **Ours, Airbnb all-in basis** | | | | £502 | £486 | £748 | estimate PL + £195/2 |
| **Our percentile / vs median** | | | | P50 / +4% | P33 / -4% | P50 / +11% | |

- **Our side:** none of the three stays can be bought. 3–5 Nov and 24–26 Nov are booked (`prices.csv` booked ADR £347.85 / £621.47), and 31 Oct is a check-in (30 Oct is an orphan night at min stay 2). Our listing was not returned in any search.
- **Position:** P50 / P33 / P50 (avg **P44**, it was P67 on 26 Oct). Against the median that is +4% / −4% / +11%, on 3–4 comps per stay. The fall in rank is mostly composition: there is a new midweek stay and a 6th comp, and 912053248917940403 (£772) is now available at the weekend. The broader benchmark is the NL 4 BR band 509 / 618 / 751 / 1175 (n=89). Our 30-day open average is £424.12 (`kpi_pack`), still **below NL P25**.
- **Supported positioning:** `quality_premium(4.76, 4.34)` = +0.15 (capped). `recommend(0.714, 0.38, 0.44, 0.15)` returns **raise +25%** ("booked +33% vs market but priced at P44"); 60 days gives the same. Reasoning: it books at 1.9x the market and is rated 0.4 stars above the comps, but the price rank rests on 3–4 comps, so +25% is a ceiling for the 2 Nov review, not a step.
- **Customizations (get_customizations, 27 Oct):**
  - Last-minute is now "1% discount within 15 days (Gradual)". The flat 25% seen on 26 Oct is gone, so that part of the discount cut **is applied**.
  - **New:** the occupancy profile now reads **"Aggressive"** (it read "Default" on 26 Oct, see the 26 Oct comp-central section). Within 0–15 days this cuts down to −30% at low occupancy.
  - The Booking Recency Factor is on (5% after 15 days without a booking, up to 15% after 45 days). The last P05 booking was made 18 Oct (`reservations.csv`), so the recency discount starts to bite from about 2 Nov.
  - The Aggressive profile is the opposite of the a-discount-cut intent (the same plan removes Aggressive on P13/P20) and is the likely cause of 30 Oct 424 → 372. **Check who switched it on and whether it was intended.**
- **Open nights:** 29–30 Oct 367/372; 6–9 Nov 475/482/422/404; 16–17 Nov 427/444. Base is still £550 (`listings.csv`). There has been no P05 booking since 18 Oct.
- **Differentiators:** the comps list parking (4 of 6), a terrace (3) and a lift with a park view (912053248917940403, 5.0, Superhost). P05 has no lift and no parking, but is by Abbey Road / Lord's.

## P06 Marylebone 2-bed (3288517; Airbnb 1671691529957957272): intentional blocks excluded

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | £352 | n/a (was £382) | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.65 (20) | n/a | n/a | £296 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £348 | £328 | n/a (was £348) | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £478 | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £318 | £359 | £557 | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.73 (52) | £768 | n/a | n/a (was £902) | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.57 (21) | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a (was £415) | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.52 (21) | £283 | n/a | £458 | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | £490 | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (86) | n/a | n/a | £646 (-1%) | parking listed |
| **Comp median (n)** | | | 4.65 (25) | £350 (6) | £343 (2) | £478 (5) | |
| **Ours, PriceLabs room/night (status)** | | | | £296 Booked/Booked | £302 Booked/Booked | £441 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £291 | £296 | £402 | derived 0.765xPL + £129/2 |
| **Our percentile / vs median** | | | | P17 / -17% | P0 / -14% | excluded | |

- **Our side:** every probe night is booked (30 Oct–5 Nov) or blocked on purpose (24 Nov, excluded per policy). `prices.csv` 27 Oct has no open P06 night up to 26 Nov, and `kpi_pack` shows `forward_occ_30_ex_blocks` = 1.0. So "ours" is a listed price, not a buyable offer.
- **Position:** P17 / P0 (avg **P9**), −17% / −14% vs median. NL 2 BR band 328 / 418 / 546 / 694 (n=215).
- **Supported positioning:** `quality_premium(4.56, 4.65)` = −0.03. `recommend(1.0, 0.44, 0.09, −0.03)` returns **raise +10%** ("booked +56% vs market but priced at P9"). Reasoning: everything sellable is sold while we sit in the bottom decile of comps. Nothing to apply now; use +10% if nights reopen.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor, no lift.

## P08 Islington 2-bed (3318167; Airbnb 1683999279257475317): sellable to 13 Nov only (handback)

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | £201 | £165 (-23%) | £201 | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (64) | £268 | £278 | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1596458903516109468](https://www.airbnb.co.uk/rooms/1596458903516109468) | 1.26 | 5 | 4.0 (10) | n/a | n/a | £194 | none listed |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) (new) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.81 (27.5) | £244 (4) | £278 (3) | £201 (3) | |
| **Ours, PriceLabs room/night (status)** | | | | £187 Booked/Booked | £187 Open/Booked (Check-In) | £237 Blocked/Blocked | |
| **Ours, Airbnb all-in basis** | | | | £233 | £233 | £276 | derived 0.85xPL + £149/2 |
| **Our percentile / vs median** | | | | P50 / -4% | P33 / -16% | excluded | |

- **Our side:** 3–5 Nov is booked and 31 Oct is a check-in (the 31 Oct–5 Nov Airbnb booking now shows in PriceLabs, which **resolves the 26 Oct calendar-lag note for P08**). 24–26 Nov is after the handback and excluded. The prices are derived, not observed today.
- **Position:** P50 / P33 (avg **P42**, it was P0 on 26 Oct), −4% / −16% vs median. The jump is mainly our price: PriceLabs rose ~+15% overnight (30–31 Oct avg 163.5 → 187), plus the new midweek stay and the 6th comp. NL 2 BR band 183 / 228 / 284 / 334.
- **Supported positioning:** `quality_premium(4.33, 4.81)` = −0.15. `recommend(0.647, 0.51, 0.42, −0.15)` returns **raise +10%** ("booked +14% vs market but priced at P42"). Reasoning: we are ahead of the market and below the comp median even after the overnight rise, but 3 reviews cap the premium.
- **Open nights before the handback:** 28–30 Oct 169/172/185 and 5–7 Nov 190/213/211. At +10% on Fri–Sat 6–7 Nov the derived all-in is about £254, still under the £278 weekend comp median.
- **Customizations:** last-minute is still "18% discount within 15 days (Gradual)" (get_customizations 27 Oct). So the a-discount-cut custom 0% is **not yet applied on P08**. That matters for every remaining open night, since all are within 15 days.
- **Differentiators:** ground-floor terrace. 2 of the 6 comps are Superhost / Guest favourite at 4.98–5.0.

## P11 Camden 2-bed (3064196): Booking.com only, indirect comparison

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.69 (29) | £352 | £340 (-3%) | £440 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a (was £282) | £284 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | £350 | £282 (-19%) | £474 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (68) | £248 | n/a | £438 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £294 | £284 (new avail.) | £474 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £286 | £310 (-13%) | £358 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.52 (27) | £212 | £262 | n/a (was £312) | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.48 (58) | n/a | n/a | £191 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (86) | n/a | n/a | £210 | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (71) | n/a | £228 (-3%) | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | n/a | n/a | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.68 (35.5) | £290 (6) | £283 (6) | £398 (8) | |
| **Ours, PriceLabs room/night (status)** | | | | £198 Booked (Check-In)/Booked | £228 Open/Open | £214 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | P0 / -32% | P0 / -19% | P25 / -46% | |

- **Basis problem (unchanged):** Camden is not on Airbnb (policy) and Booking.com is NOT CHECKED. So our **PriceLabs room price (no cleaning)** is set against comp prices that **include cleaning**, which biases our percentile low.
- **Position:** P0 / P0 / P25 (avg **P8**), −32% / −19% / −46% vs median. NL 2 BR band 244 / 307 / 359 / 399 (n=172).
- **Supported positioning:** `quality_premium` = 0 (8.0/10 cannot be compared with Airbnb stars).
  - 30 days: `recommend(0.379, 0.43, 0.08)` returns **fix-listing** ("behind market −5% while already at P8"). On 26 Oct it returned raise +5%; it flipped because forward 30-day occupancy fell from 41.4% to 37.9%.
  - 60 days: `recommend(0.492, 0.38, 0.08)` returns **raise +10%**.
  - Reasoning: near-term demand trails the market even though we are the cheapest in the set, so near nights point to visibility (Booking.com ranking, per policy notes) rather than price. Further out we are ahead of the market and still cheap.
- **Customizations (27 Oct):**
  - Last-minute is now "No Discount", so the a-discount-cut **is applied on P11**. That fits the weekend rising +15% overnight.
  - The **Aggressive** occupancy profile and the **Booking Recency Factor** are still on. The last P11 booking was made 4 Oct (`reservations.csv`), 23 days ago.
- **Differentiators:** 6 of the 12 comps have a lift or balcony. P11 is a basement with a patio, no lift, no parking.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | £172 | £202 (-11%) | £252 | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | n/a (was £278) | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (18) | n/a | £260 | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | £202 | £232 (new avail.) | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | £202 | n/a (was £232) | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | £254 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | £345 | n/a | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | £308 | £308 (new avail.) | £308 (new avail.) | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (17) | n/a | £216 | n/a | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (15) | £149 | n/a | £200 | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | £276 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (18.5) | £228 (8) | £254 (7) | £296 (8) | |
| **Ours, PriceLabs room/night (status)** | | | | £500 Open/Open | £500 Open/Open | £500 Open/Open | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | P100 / +119% | P100 / +97% | P100 / +69% | |

- Numbers only (policy): PriceLabs base 525, min 500, max 2000 (`listings.csv`). Price £500 on every probe night, min stay 3–4. Occupancy 0% at 30 and 60 days vs market 40% / 37% (`kpi_pack`). Comp medians £228 / £254 / £296 (+119% / +97% / +69%, P100). NL 1 BR band 153 / 205 / 255 / 298 (n=173). Comp median rating 4.91 (18.5 reviews). No positioning, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3–Thu 5 Nov | Fri 30 Oct–Sun 1 Nov | Tue 24–Thu 26 Nov | Differentiators |
|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £174 | £204 | £192 (new avail.) | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | £311 | n/a | £320 | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | £210 | £210 (-2%) | £218 (-1%) | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | £264 | n/a | £273 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £232 | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.43 (167) | n/a | n/a | £126 | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) (new) | 0.54 | 3 | 4.5 (34) | n/a | £198 (new avail.) | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £237 (4) | £204 (3) | £225 (6) | |
| **Ours, PriceLabs room/night (status)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, Airbnb all-in basis** | | | | n/a | n/a | n/a | PriceLabs room only |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | |

- `get_listings(search_query="St John's Wood")` still returns 0 listings (27 Oct), and P17 is `in_smoobu: false` in `kpi_pack`. These comps are a reference set for when it is connected.

## Changes since 26 Oct (this batch)
1. **Discount cut, partly applied:**
   - **P11** last-minute is now 0% (weekend +15%).
   - **P05** flat 25% has become 1%, **but P05 now has the Aggressive occupancy profile (Default on 26 Oct)**.
   - **P08** last-minute is still 18%.
   - Aggressive and Booking Recency remain on P11 and P05.
2. Comp prices are flat like for like, except P11 at the weekend (−3.4%). I added 3 comps (P05, P08, P17) and replaced none.
3. **P08** goes from P0 to P42 after a ~15% PriceLabs rise; `recommend` still says raise +10%.
4. **P11** `recommend` 30d goes from raise +5% to fix-listing as forward occupancy slips to 37.9%.
5. **P06** remains fully sold on non-blocked nights.
6. No new booking for P05, P06, P08, P11 or P14 since 25 Oct (`reservations.csv` 27 Oct).

## Data gaps:
1. Booking.com: NOT CHECKED (not attempted). P11's guest price and cleaning fee are unknown, so its percentile is a room-only lower bound.
2. Thin comp sets: P05 and P08 have 6 comps each after today's additions, but the per-stay n is still 3–4.
3. Ours is not buyable on any P05, P06 or P08 probe stay (booked, blocked or check-in), so those percentiles compare listed prices. The P05 all-in is an estimate (no Airbnb rule factor verified). The P06 0.765 and P08 0.85 factors date from 25–26 Oct and were not re-observed today (our listings did not appear in searches).
4. The midweek stay moved to 3–5 Nov, so it has no day-on-day comparison today. Per-date medians cover different comp subsets ("n/a" = booked or min stay above 2 nights).
5. Two comps (P06 917140285217729256, P08 1289147258305624118) have been unavailable on every probe stay for 2 days. Their pages are live, but bookability in the next 60 days is not confirmed. If they are still unavailable on 28 Oct, I will treat them as replacement candidates.
6. The P06 3–5 Nov search hit the 10-page cap (147 results), so a comp may have been missed on that stay.
7. Cancellation policy (comps and ours) and floor level: NOT CHECKED. "Parking" includes paid or off-site parking as listed.
8. The NL summary_table horizon and cleaning treatment are unstated. Pulled in summary mode and not saved to `raw/`.
9. Who switched P05 to the Aggressive occupancy profile, and when: NOT CHECKED (`get_user_logs` not pulled).
10. Raw search results (18 JSON files) and comp listing pages are kept in the scratchpad, not in `raw/`: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c27/search/` and `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c27/pdp/`.

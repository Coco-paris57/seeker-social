# Competitor positioning: CENTRAL/NORTH (D = 2026-11-01)

**Method**
- **Comp ids:** the same 55 comp ids as 27–31 Oct (`data/snapshots/2026-10-31/comps.csv`, comp-central rows checked 2026-10-31), with **one replacement**: P08 comp 1596458903516109468 is **delisted** (listing page HTTP 410 / "404 Page Not Found", fetched 1 Nov). It is replaced by **1497137911142581794** (Islington, 0.8 km, 2-bedroom cottage, sleeps 4, 4.91 from 23 reviews, Superhost; capacity read from its listing page).
- **Absent comps re-checked:** I opened the listing pages of the other comps that have been absent for several days. All load normally (HTTP 200): P08 1289147258305624118, P11 1515051936255130803, P14 1595613237427991150 and 1075245497252121738, P06 1259401393497276633, P17 1304473419588771105 and 774061637963678253. So all are kept. Absence from date-filtered searches means booked or min-stay, not inactive. P06 1452940332365117153 is back (£250 on 3–5 Nov).
- **Searches:** 43 plain public Airbnb search pages (airbnb.co.uk, HTTP 200, no challenge). Same map boxes as 25–31 Oct, entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages. Script `c01s/search.py`, raw results `c01/search/*.json` (scratchpad).
- **Like-for-like stays, the same for every comp and for us:**
  - Tue 3–Thu 5 Nov (midweek).
  - Fri 6–Sun 8 Nov (next Fri–Sun).
  - Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov (about 30 days out).
- **Our open stays** (`prices.csv` 1 Nov, cross-checked with Smoobu `reservations.csv` 1 Nov):
  - **P11:** 2 Nov (1-night orphan, min 2), 10–13 Nov, 18 Nov–4 Dec, 8–18 Dec, 23–25 Dec.
  - **P05:** 9 Nov (min 1), 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec (min 1).
  - **P06:** 8–14 Nov.
  - **P08:** 5–7 Nov.
  - These are the same open stays as yesterday. There were no new bookings overnight.
- **Price basis:**
  - **Comps:** Airbnb displayed total / nights, **excl. taxes, cleaning INCLUDED**, after any offer.
  - **Ours, observed:** our Airbnb listing seen in the same searches on 12 stays: P05 x7, P06 x3, P08 x2. These are rows in `channel_checks.csv`. P06 10–12 Nov is **observed today** (it was missing yesterday).
  - **Ours, booked stays:** derived as before.
  - **P11** (Booking.com only) and **P14:** PriceLabs room price. P11 is also shown at the Booking.com list price (PL x 1.15).
  - **Observed factors per night** confirm the a-airbnb-rules pattern: 0.765 x PL for nights ≤ 28 days out, 0.900 beyond. P05 29 Nov–3 Dec = 0.765 x £546 + 0.900 x (£528 + £519 + £525) + £195 = £2,027.49, the exact amount displayed.
- **Booking.com: NOT CHECKED.** There was a bot check on 28 Oct. It was not retried or bypassed.
- **PriceLabs:** one `get_user_logs` call (listing log for P05, P06, P08, P11 and P14, 31 Oct–1 Nov). It returned **14 entries, all from Reyhan**, at 31 Oct 14:29–14:31Z and 22:06–22:09Z:
  - **P11, 14:29Z:** −5% on 10 Nov, 11–13, 18–19, 20–21, 22–25, 26–28 Nov and 29 Nov–4 Dec. Min stay is now mostly 2.
  - **P11, 22:06Z:** **−7% on 10 Nov–4 Dec** and **−5% on 8–18 Dec**.
  - **P05:** −3% on 13–19 Dec (14:31Z). Then at 22:08Z: **−5% on 13–19 Dec**, **−5% on 29 Nov–2 Dec** and **−7% on 4–31 Jan 2027**.
  - **P06, 22:09Z:** **−2% on 8–14 Nov**.
  - Nothing on P08 or P14.
- **Positioning:** calculated with `rm/positioning.py` (`quality_premium`, `recommend`). Occupancy comes from `reports/2026-11-01/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, else `forward_occ_30` / `_60`, against `market_occ_30` / `_60`. The percentile is the mean over **open multi-night stays**: check-in ≤ 29 Nov for 30d, all open stays for 60d. P05's 1-night orphans are left out.

## Summary

| Ref | Comps (priced per stay) | Comp median on open stays | Ours on the same stays | Our pct (open) | Rating ours vs comp median; review gap | Booked vs mkt | Supported positioning |
|---|---|---|---|---|---|---|---|
| **P05 4BR** | 6 (1–5) | 16–18 Nov £454 (4); 29 Nov–3 Dec £884 (4); 7–9 Dec £790 (4); 13–16 Dec £884 (4); 17–20 Dec £954 (4) | £416 / £507 / £540 / £573 / £616 observed all-in | **P30** (60d; P38 30d); −9% / −43% / −32% / −35% / −35% | Airbnb 4.77 (35) vs 4.27 (22); **+13 reviews** | 30d 82.8% vs 40%; 60d 67.8% vs 38% | qp **+0.15** → supported **+15% over the comp median**. `recommend` 30d and 60d = **raise +25%** |
| **P06 2BR** | 12 (3–7) | 8–11 Nov £366 (4); 10–12 Nov £346 (3); 12–15 Nov £554 (3) | £220 / £252 / £270, all observed | **P0** (−40% / −27% / −51%) | 4.60 (10) vs 4.65 (25); **−15 reviews** | 30d ex-blocks 46.2% vs 46% | qp −0.022 → supported **−2% vs median**. `recommend` 30d = **raise +5%** |
| **P08 2BR** | 6 (1–3) | 5–8 Nov £321 (2); 6–8 Nov £408 (1) | £209 / £239 observed | **P0** (−35% / −41%) | 4.33 (3) vs 4.87 (29); **−26 reviews** | 75% vs 48% (30d) | qp −0.15 → supported **−15% vs median**. `recommend` = **raise +10%** (thin, n ≤ 2) |
| **P11 2BR** | 12 (1–9) | 10–14 Nov £281 (5); 18–21 Nov £316 (4); 24–26 Nov £306 (9); 27–29 Nov £462 (3); 28 Nov–4 Dec £424 (2); 8–11 Dec £359 (7); 11–14 Dec £417 (7); 15–19 Dec £413 (8); 23–26 Dec £417 (5) | PL room £204 / £195 / £182 / £258 / £219 / £234 / £276 / £226 / £308 | **P7** room (60d; P0 30d); **P10** at Booking.com list (x1.15) | Booking.com 8.0/10 (policy), not comparable with the Airbnb median 4.67 (35.5); our review count NOT CHECKED | 30d 37.9% vs 46%; 60d 39% vs 39% | qp 0 → supported **at median (0%)**. `recommend` 30d = **fix-listing**, 60d = **raise +5%** |
| P14 1BR | 12 (3–6) | £245 / £278 / £290 / £290 | £500 room | P100 (+104% / +80% / +73% / +73%) | not seen on Airbnb; comp median 4.91 (19) | 0% vs 41% (30d) | special setup: numbers only |
| P17 1BR | 7 (0–5) | £190 / £186 / £220 / n/a | NOT IN SYSTEMS | n/a | comp median 4.56 (49) | n/a | collect-data |

**Day-on-day (same comp, same stay, same checkout; 31 Oct → 1 Nov):**
- **Comps were flat.** The median like-for-like change is 0.0% on every common stay for all six sets. The exceptions are small:
  - P11: −1.9% on 3–5 Nov.
  - P05: −0.5% on 29 Nov–3 Dec.
  - P06: −0.9% on 12–15 Nov.
  - Single-comp moves: P05 1639043256346803626 3–5 Nov £440 → £380; P11 1480693526878012391 6–8 Nov £312 → £212; P06 854346637654279747 8–11 Nov £322 → £292.
- **We moved down; the market did not.**
  - **P06**, observed: 8–11 Nov **£242 → £220 (−9%)**, 12–15 Nov **£305 → £270 (−11%)**. The PL room fell 11–14% on every open night (8 Nov £255 → £228 … 14 Nov £360 → £311). Reyhan's −2% explains only part of this; the rest is the PriceLabs algorithm (cause NOT CHECKED).
  - **P05**, observed: 29 Nov–3 Dec **£538 → £507 (−6%)**, 13–16 Dec £599 → £573 (−4%), 17–20 Dec £640 → £616 (−4%), 7–9 Dec £546 → £540.
  - **P11**, PL room: −1% to −10% on almost every open night (Reyhan −5/−7%), **2 Nov £190 → £151 (−21%)** and 30 Nov £213 → £177 (−17%).
  - Our premium vs the median therefore widened by 3–11 points on every observed open stay.
- **P06's nearest comp** 1700204078606711134 (0.16 km, Superhost, lift, 4.91; £283–£313 yesterday) dropped out of all three open stays. It is probably booked, which is a mild demand signal.

## Input for tomorrow's base review (Mon 2 Nov, raised flats in this batch)

- **P05 (base £550):** keep £550 and do not cut. The comps support **+25% on the Dec open stays** (29 Nov–3 Dec, 13–20 Dec). We sit at P25, 32–43% under the medians, with qp +0.15 and bookings 43 points ahead of the market. Reyhan's 31 Oct −5% on 29 Nov–2 Dec and 13–19 Dec, and −7% on 4–31 Jan, go against this evidence: report for Corentin to confirm. For 16–18 Nov (now P50, −9%), about +15% (≈ £478 all-in, near the 0.55 km comps at £509–£519) is enough.
- **P06 (base £357):** keep £357. The comps do not support any cut: we are the cheapest priced listing on every open stay (P0, −27% to −51%), while the quality-supported position is only −2% vs the median. `recommend` = +5% on 8–14 Nov. The PL drop of 11–14% overnight (incl. Reyhan's −2%) is not supported by comp evidence: report for Corentin to confirm.
- **P11 (base £286):** keep £286. Price is not the constraint: we are P0–P14 at room price (P10 mean even at the Booking.com list price). The 30d shortfall is visibility/conversion (`recommend` 30d = fix-listing), and the 60d evidence supports +5%. Reyhan's 31 Oct −5%/−7% (10 Nov–4 Dec) and −5% (8–18 Dec) cuts are not supported by comp evidence: report for Corentin to confirm. The 8–18 Dec −5% also covers the darts nights 13–17 Dec, which policy `darts_override_24oct` says to leave at Reyhan's +5%. PL 13–17 Dec fell 2–4% overnight, which is a conflict with a standing decision for Corentin to confirm.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**a-p05-9nov: NOT FIXED.**
- **PriceLabs:** 9 Nov is **£1,462, min stay 1** (`prices.csv` 1 Nov; £1,442 yesterday).
- **Airbnb, 9–10 Nov, 7 adults, checked 1 Nov:** still **1 night x £511.80, "Special offer −£63.36", total £448.44**. That is identical to 31 Oct.
- £511.80 − £195 cleaning = £316.80 room. That equals 0.765 x about £414, so Airbnb is still running on a pre-override rate. The offer is exactly **20% of the room** (£63.36 / £316.80).
- **Control:** 29 Dec (PL £1,354, min 1) shows £1,413.60 = 0.900 x £1,354 + £195. So the 1-night override flows through on other dates, and the 9 Nov problem is specific to that date.
- Still to check, in the Airbnb calendar and Smoobu: the stored rate for 9 Nov, and the source of the 20% offer (manual promotions were removed 21 Oct per policy). The intent of +300% is also still for Corentin to confirm.
- At what guests see (£448), we are P100, +40% vs the single comp priced that night (1617681646241740026, £320; n=1).

**Open stays:**

| Stay | Ours (observed all-in) | Comp median (n) | Our pct | vs median | vs 31 Oct (ours) |
|---|---|---|---|---|---|
| 16–18 Nov | £416 | £454 (4) | P50 | −9% | 0% |
| 29 Nov–3 Dec | £507 | £884 (4) | P25 | −43% | −6% |
| 7–9 Dec | £540 | £790 (4) | P25 | −32% | −1% |
| 13–16 Dec | £573 | £884 (4) | P25 | −35% | −4% |
| 17–20 Dec | £616 | £954 (4) | P25 | −35% | −4% |
| 9–10 Nov (1n) | £448 (offer) | £320 (1) | P100 | +40% | 0% |
| 29–30 Dec (1n) | £1,414 | none priced | n/a | n/a | +1% |

**Positioning:**
- `quality_premium(4.77, 4.27)` = **+0.15** (cap).
- `recommend(0.828, 0.40, 0.38, 0.15)` → **raise +25%** (30d).
- `recommend(0.678, 0.38, 0.30, 0.15)` → **raise +25%** (60d).
- **Reasoning:** P05 books 43 points ahead of the market, with half a star more and 13 more reviews than the set median, yet sits 32–43% under the Dec medians. +25% on the Dec stays (≈ £634–£770 all-in) still lands under every Dec median.
- **Caveat:** only 6 comps qualify, and three are rated below 4.3, which inflates the quality premium.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.96.
  - 1639043256346803626: Superhost house with a terrace, 4.89.
  - 1610095240357069208 and 1606112160333193293: 0.55 km, parking.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

- **Open 8–14 Nov, all observed today.** Our listing is 4.60 (10), with no offer line.
  - 8–11 Nov £220.33 = (£660.67 − £129) / 3 = 0.765 x PL £231.67.
  - 10–12 Nov £252.
  - 12–15 Nov £270.
- **Position:** P0 on every open stay, −27% / −51% / −40% vs the medians (£346 / £554 / £366).
- **Excluded per policy:** 24–29 Nov (blocked on purpose).
- **Positioning:**
  - `quality_premium(4.60, 4.65)` = −0.022.
  - `recommend(0.462, 0.46, 0.0, −0.022)` → **raise +5%**.
  - The 60d `fix-listing` output is not used, because `forward_occ_60` (10.2%) counts the intentional blocks.
  - **Reasoning:** the sellable nights book in line with the market while we are the cheapest in the set. A further 11–14% cut is not supported, and +5% (£231–£284 all-in) stays far under every median.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor with no lift and has 15 fewer reviews than the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

- **Last open nights, 5–8 Nov:** **£208.79 x 3 = £626.36** all-in (0.765 x PL £208 + £149 / 3). 6–8 Nov shows £239. No offer line on either.
- **Comps priced:** 28354043 (4.8, 35 reviews) £386, and the new comp 1497137911142581794 (Superhost cottage, 4.91, 23 reviews) £255. Median £321: we are **P0, −35%**. 6–8 Nov is −41% vs the single comp priced (£408).
- **Positioning:**
  - `quality_premium(4.33, 4.87)` = −0.15.
  - `recommend(0.75, 0.48, 0.0, −0.15)` → **raise +10%** (≈ £230 / £263 all-in).
  - **Reasoning:** we book 27 points ahead of the market, and even a 15% quality discount puts the supported price at about £273 on 5–8 Nov. With 4 days to arrival and the handback on 13 Nov, do not go beyond +10%.
- **Differentiator:** P08 has a ground-floor private terrace.

## P11 Camden 2-bed (3064196): Booking.com only

- **Open nights:** as listed in the method. PriceLabs and Smoobu agree; the last push was 31 Oct 22:07Z.
- **2 Nov:** an orphan between tonight and the 3 Nov arrival. Its PL is £151 with min stay 2, so it can only sell together with tonight (1 Nov).
- **Position:**
  - Every open stay is at **P0–P40** at room price, 26–51% under the comp median.
  - At the Booking.com list price (PL x 1.15, before Mobile 10% / Genius / Last Minute 10%) we are P0–P40, 15–44% under.
  - The comps include cleaning and our room price does not, so the room percentile is biased low. The list-price view corrects only part of that.
- **Reyhan's 31 Oct overrides:** reported above for Corentin to confirm, including the darts-night conflict with `darts_override_24oct`.
- **Positioning:**
  - qp = 0 (Booking.com 8.0/10 is not on the Airbnb scale).
  - `recommend(0.379, 0.46, 0.0, 0)` → **fix-listing** (30d).
  - `recommend(0.39, 0.39, 0.07, 0)` → **raise +5%** (60d).
  - **Reasoning:** we trail the market at 30 days while already the cheapest listing. Policy records Booking.com search views −64% and CTR 0.81% vs 1.70%, so the problem is visibility, not price. Further cuts are not supported.
- **Differentiators:** 4 of the 12 comps have a lift and 3 have a balcony or terrace. The closest comps (0.08 km) are £191–£307. P11 is a basement flat with a patio.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Ours:** PL room £500, min stay 3–4, open on all four stays.
- **Comp medians:** £245 / £278 / £290 / £290 (n = 6 / 5 / 5 / 3), which puts us at P100, +104% / +80% / +73% / +73%.
- **Occupancy:** 0% vs 41% (30d, `kpi_pack`).
- **Rating:** comp median 4.91 (19). Ours was not seen on Airbnb.
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £190 / £186 / £220 / n/a (n = 1 / 1 / 5 / 0).
- **Rating:** comp median 4.56 (49).
- Reference set only.

## Comp tables

Source for every comp row: Airbnb public search, checked 2026-11-01. Nightly price excludes taxes and includes cleaning. (±%) is the change vs 31 Oct for the same stay and checkout. "n/a" = not returned by the date-filtered search (booked or min stay).

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | n/a | £509 | £920 | n/a | £509 | £960 | £1020 | £980 | £980 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £519 | £570 | £1020 | n/a | £519 | £960 | £1020 | £980 | £980 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.96 (28) | £632 | n/a | n/a | n/a | n/a | n/a | £807 (-1%) | n/a | £789 | £928 (-1%) | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £352 | n/a | £320 | n/a | n/a | £340 | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | £400 | n/a | £468 (-1%) | n/a | n/a | £400 | £420 (-2%) | n/a | £440 | £499 | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (27) | £380 (-14%) | n/a | n/a | n/a | n/a | £400 | n/a | £560 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.0) | £519 (5) | £519 (1) | £488 (4) | £970 (2) | £320 (1) | £454 (4) | £884 (4) | £790 (4) | £884 (4) | £954 (4) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £449 Booked (Smoobu), min 3 | £499 Booked (Smoobu), min 2 | £614 Booked (Smoobu), min 3 | £627 Booked (Smoobu), min 4 | £1462 Open, min 1 | £416 Open, min 2 | £530 Open, min 3 | £492 Open, min 2 | £565 Open, min 3 | £612 Open, min 3 | £1354 Open, min 1 | |
| **Ours, comparable basis** | | | | £441 | £479 | £567 | £577 | £449 obs | £416 obs | £507 obs | £540 obs | £573 obs | £616 obs | £1414 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P40 / -15% | P0 / -8% | P75 / +16% | P0 / -40% | P100 / +40% | P50 / -9% | P25 / -43% | P25 / -32% | P25 / -35% | P25 / -35% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Tue 10 Nov–Thu 12 Nov (2n) | Thu 12 Nov–Sun 15 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | n/a | £339 | n/a | n/a | n/a (was £283) | n/a (was £304) | n/a (was £313) | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.67 (21) | £280 | n/a | £296 | n/a | n/a (was £291) | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a (was £328) | n/a | £348 | n/a | £292 (-9%) | n/a (was £328) | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £478 | n/a | n/a | £346 | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £311 | n/a | £557 | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | £588 | £588 | £894 | £1102 | £552 | n/a (was £588) | £732 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | £384 | n/a | £554 (-1%) | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £422 | £484 | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (53) | £332 (+1%) | £452 | n/a | £641 | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | £250 | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £572 (-1%) | £636 | £349 | £373 | £436 (-1%) | parking listed |
| **Comp median (n)** | | | 4.65 (25.0) | £311 (5) | £452 (3) | £478 (7) | £639 (4) | £366 (4) | £346 (3) | £554 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £252 Booked (Smoobu), min 2 | £285 Booked (Smoobu), min 2 | £405 Blocked, min 3 | £477 Blocked, min 4 | £232 Open, min 2 | £246 Open, min 2 | £297 Open, min 2 | |
| **Ours, comparable basis** | | | | £257 | £283 | £374 | £429 | £220 obs | £252 obs | £270 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P20 / -17% | P0 / -38% | excluded | excluded | P0 / -40% | P0 / -27% | P0 / -51% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | n/a | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | £270 | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | £255 | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £270 (3) | £408 (1) | £304 (2) | £304 (2) | £321 (2) | |
| **Ours, PL room/night (status, min stay)** | | | | £195 Booked (Smoobu), min 2 | £215 Open, min 2 | £237 Blocked, min 3 | £301 Blocked, min 3 | £208 Open, min 2 | |
| **Ours, comparable basis** | | | | £240 | £239 obs | £276 | £330 | £209 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P33 / -11% | P0 / -41% | excluded | excluded | P0 / -35% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 2 Nov–Tue 3 Nov (1n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Sat 21 Nov (3n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a (was £288) | n/a | £440 | £440 | n/a | n/a (was £283) | £336 | n/a | n/a (was £447) | £529 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £286 | n/a | £310 | n/a | n/a | n/a | £359 | £359 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | £294 | £462 | n/a | £258 | £270 | £424 | £444 | £494 | £420 | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £238 | £438 | £438 | n/a | n/a | £406 | £417 | n/a | n/a (was £417) | £417 | £406 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £272 (-4%) | £306 | £306 | £615 | n/a | n/a (was £270) | n/a (was £282) | £424 | £444 | n/a (was £494) | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £292 | £328 | £358 | n/a | n/a | £329 | n/a | n/a | £373 | £448 | £470 | £499 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | £202 (-5%) | £212 (-32%) | £312 | n/a | n/a | £281 | n/a | n/a | £292 | n/a | £281 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £210 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £217 | £258 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | £294 (-4%) | n/a | n/a | n/a | £257 | £297 | n/a | £311 | £352 | n/a | n/a (was £361) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £255 (4) | £306 (5) | £306 (9) | £462 (3) | £310 (1) | £281 (5) | £316 (4) | £424 (2) | £359 (7) | £417 (7) | £413 (8) | £417 (5) | |
| **Ours, PL room/night (status, min stay)** | | | | £198 Booked (Smoobu), min 2 | £230 Booked (Smoobu), min 2 | £182 Open, min 2 | £258 Open, min 2 | £151 Open, min 2 | £204 Open, min 2 | £195 Open, min 2 | £219 Open, min 2 | £234 Open, min 2 | £276 Open, min 2 | £226 Open, min 2 | £308 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £198 | £230 | £182 | £258 | £151 | £204 | £195 | £219 | £234 | £276 | £226 | £308 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £228 P25 / -10% | £264 P20 / -14% | £210 P11 / -32% | £297 P0 / -36% | £174 P0 / -44% | £235 P0 / -16% | £225 P0 / -29% | £251 P0 / -41% | £269 P14 / -25% | £317 P14 / -24% | £260 P0 / -37% | £354 P40 / -15% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -22% | P20 / -25% | P0 / -40% | P0 / -44% | P0 / -51% | P0 / -27% | P0 / -38% | P0 / -48% | P14 / -35% | P14 / -34% | P0 / -45% | P40 / -26% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.4 (30) | £168 | £252 | n/a (was £252) | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.66 (47) | n/a | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £302 | £302 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £278 | £278 | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | n/a (was £254) | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | £345 | n/a | n/a (was £402) | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (18) | £218 | n/a | n/a | £271 (+2%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (19.0) | £245 (6) | £278 (5) | £290 (5) | £290 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +104% | P100 / +80% | P100 / +73% | P100 / +73% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £186 | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | n/a | n/a | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | n/a | n/a | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | n/a (was £258) | n/a (was £323) | £264 | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £220 (-3%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | £126 | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £190 (1) | £186 (1) | £220 (5) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |
## Rows written
- **`data/snapshots/2026-11-01/comps.csv`:** **400 comp-central rows** (55 comp ids x their stays; 158 priced, a blank price means not available).
  - Written under `.comps.csv.lock`, with the header checked against `rm/snapshot.py` and a duplicate guard.
  - Each row carries platform, URL, stay dates, adults, price basis, check date, distance, capacity and differentiators. The P08 replacement is flagged "NEW 2026-11-01, replaces 1596458903516109468 (delisted)".
  - Rows copied forward by other agents were left as they were.
- **`data/snapshots/2026-11-01/channel_checks.csv`:** **12 rows**, our observed Airbnb prices (P05 x7, P06 x3, P08 x2). Written under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-11-01')` reads 2,280 comps and 188 channel checks (all agents, at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all properties (bot check; not retried or bypassed). This leaves several P11 items unknown: its displayed price after promotions, its search rank and its review count. P11's percentile compares PL room (or x1.15) with Airbnb all-in comps.
- **P05 9 Nov:** why Airbnb holds about £414 (pre-override) plus a 20% "Special offer" while PL / Smoobu hold £1,462 is NOT CHECKED. The Airbnb calendar and the Smoobu stored rate were not read.
- **P06:** the cause of the algorithmic −9% to −12% overnight on 8–14 Nov (beyond Reyhan's −2%) is NOT CHECKED. `get_customizations` was not called.
- **Thin comp evidence:**
  - P08: 1–2 priced comps on its open stays.
  - P05: 4 per Dec stay, and n ≤ 1 on the 1-night stays.
  - P11: n = 2 on 28 Nov–4 Dec, n = 1 on 2 Nov.
- **Absent comps:** their listing pages load, but whether they have availability in the next 60 days was not verified (calendars not read).
- **P14:** not seen on Airbnb, so its rating and reviews are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu.

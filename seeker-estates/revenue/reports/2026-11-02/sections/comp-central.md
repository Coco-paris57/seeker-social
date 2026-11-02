# Competitor positioning: CENTRAL/NORTH (D = 2026-11-02)

**Method**
- **Comp ids:** the same 55 comp ids as 1 Nov (`data/snapshots/2026-11-01/comps.csv`, comp-central rows checked 2026-11-01). **No replacements today.** Nine comps were not returned on any of today's stays. I opened all nine listing pages on 2 Nov and every one returned HTTP 200, so all are kept as active (absence from date-filtered searches = booked or min stay):
  - P06: 1259401393497276633, 1452940332365117153.
  - P08: 1289147258305624118, 1497137911142581794.
  - P11: 1515051936255130803.
  - P14: 1595613237427991150, 1075245497252121738.
  - P17: 1304473419588771105, 774061637963678253.
- **Searches:** 45 plain public Airbnb search pages (airbnb.co.uk, no challenge). Same map boxes as 25 Oct–1 Nov: entire home, min bedrooms = ours, adults = our sleeps − 1, all result pages (P06 searches hit the 10-page cap, same as yesterday). Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c02s/search.py`. Raw results: `.../scratchpad/c02/search/*.json`.
- **Like-for-like stays, the same for every comp and for us:** Tue 3–Thu 5 Nov (midweek), Fri 6–Sun 8 Nov (next Fri–Sun), Tue 24–Thu 26 Nov and Fri 27–Sun 29 Nov (about 30 days out). These are the same as yesterday, so day-on-day changes are like for like.
- **Our open stays** (`prices.csv` 2 Nov, cross-checked with Smoobu `reservations.csv` 2 Nov; Smoobu wins where they differ):
  - **P11:** 10–13 Nov, 18 Nov–4 Dec, 8–18 Dec, 23–25 Dec. 2 Nov is tonight and outside the price window (see P11).
  - **P05:** 9 Nov (min 1), 16–17 Nov, 29 Nov–2 Dec, 7–8 Dec, 13–21 Dec, 29 Dec (min 1).
  - **P06:** **8–11 Nov only.** 12–14 Nov is now booked (Smoobu, Airbnb, booked 1 Nov). PriceLabs `prices.csv` still shows 12–14 Nov as open (£256 / £286 / £290). PriceLabs had not yet registered the booking at snapshot time; this goes to the push/sync check. **There is no open 14 Nov.**
  - **P08:** 5–7 Nov (last nights before the 13 Nov handback; 8–13 Nov is booked).
- **Price basis:**
  - **Comps:** Airbnb displayed total / nights, **excl. taxes, cleaning INCLUDED**, after any offer.
  - **Ours:** our own Airbnb listing seen in the same searches on 12 stays (P05 x8, P06 x2, P08 x2). These are written to `channel_checks.csv`.
  - **P06 8–11 Nov** was not returned today, so it is derived: 0.765 x PL + £129 / 3. The 0.765 factor is confirmed today on 8–12 Nov: (£810.61 − £129) / 4 = £170.40 = 0.765 x PL £222.75.
  - **P11** (Booking.com only) and **P14:** PriceLabs room price. P11 is also shown at the Booking.com list price (PL x 1.15).
  - **P05 factor check (a-airbnb-rules):** 29 Nov–3 Dec displayed £1,969.61. That is exactly 0.765 x (£543 + £525) + 0.900 x (£541 + £523) + £195. So the Smoobu rule is applied **per night by lead time**: 0.765 up to 28 days out, 0.900 beyond.
- **Booking.com: NOT CHECKED.** There was a bot check on 28 Oct. It was not retried or bypassed.
- **PriceLabs (read-only, one call at a time):**
  - **`get_user_logs`** (P05, P06, P08, P11, P14; 1–2 Nov) returned 4 entries, all from Reyhan, all on P11, at 2 Nov 00:10–00:12Z:
    - 2 Nov: +10%, then +20%, then +10% again, all with min stay 1.
    - **10 Nov–18 Dec: override re-saved with min stay 2 and no price adjustment.**
    - There was nothing on P05, P06, P08 or P14 since 1 Nov.
  - **`get_listing_date_overrides` P11** confirms it: 10 Nov–18 Dec now carries min-stay-only overrides (no %), so the 31 Oct −7%/−5% cuts are gone.
  - **`get_customizations` P06** (last-minute, occupancy, booking factor, demand):
    - Occupancy-based adjustment is **"Aggressive"**: −20% to −30% when occupancy is 10–40%, 0–15 days out.
    - **Booking recency factor** is on at default: a gradual 5–15% discount after 15–45 days with no bookings, over the next 30 days.
    - Last-minute: no discount.
- **Positioning:**
  - Calculated with `rm/positioning.py` (`quality_premium`, `recommend`).
  - Occupancy is from `reports/2026-11-02/kpi_pack.json`: `forward_occ_30_ex_blocks` where present, else `forward_occ_30` / `_60`, against `market_occ_30` / `_60`.
  - Percentile = mean over open multi-night stays: check-in up to 1 Dec for 30d, all open stays for 60d. 1-night orphans are left out.
- **Script:** `.../scratchpad/c02s/analyse02.py`; output `.../scratchpad/c02/analysis.json`.

## Summary

| Ref | Comps (priced per stay) | Comp median on open stays | Ours on the same stays | Our pct (open) | Rating ours vs comp median; review gap | Booked vs mkt | Supported positioning |
|---|---|---|---|---|---|---|---|
| **P05 4BR** | 6 (2–5) | 16–18 Nov £455 (4); 29 Nov–3 Dec £945 (4); 7–9 Dec £790 (4); 13–16 Dec £947 (4); 17–20 Dec £980 (4); 20–22 Dec £1,020 (3) | £405 / £492 / £535 / £573 / £615 / £687, all observed all-in | **P30** (60d; P38 30d); −11% / −48% / −32% / −39% / −37% / −33% | Airbnb 4.77 (35) vs 4.27 (22.5); **+12.5 reviews** | 30d 79.3% vs 40%; 60d 67.8% vs 38% | qp **+0.15**, so quality supports **+15% over the comp median**. `recommend` 30d and 60d = **raise +25%** |
| **P06 2BR** | 12 (1–7) | 8–11 Nov £343 (4); 10–12 Nov £346 (5); 8–12 Nov £308 (4) | £210 derived / £240 obs / £203 obs | **P0** (−39% / −31% / −34%) | 4.60 (10) vs 4.66 (25); **−15 reviews** | 30d ex-blocks **66.7%** vs 46% (was 46.2% yesterday, before the 12–15 Nov booking) | qp −0.024, so supported is **−2% vs median**. `recommend` 30d = **raise +10%** |
| **P08 2BR** | 6 (1–3) | 5–8 Nov £386 (1); 6–8 Nov £408 (1) | £206 / £236 observed | **P0** (−47% / −42%) | 4.33 (3) vs 4.87 (29); **−26 reviews** | 72.7% vs 48% (30d) | qp −0.15, so supported is **−15% vs median**. `recommend` = **raise +10%** (thin, n = 1) |
| **P11 2BR** | 12 (3–9) | 10–14 Nov £258 (5); 18–21 £306 (4); 21–24 £300 (4); 24–26 £307 (5); 27–29 £462 (3); 28 Nov–4 Dec £424 (3); 8–11 Dec £374 (9); 11–14 Dec £433 (8); 15–19 Dec £421 (5); 23–26 Dec £389 (6) | PL room £231 / £202 / £211 / £198 / £275 / £228 / £259 / £305 / £249 / £315 | **P7** room (30d), **P10** (60d); at Booking.com list (x1.15) P0–P60 | Booking.com 8.0/10 (policy), not comparable with the Airbnb median 4.67 (35.5); our review count NOT CHECKED | 30d 37.9% vs 46%; 60d 40.7% vs 39% | qp 0, so supported is **at median (0%)**. `recommend` 30d = **fix-listing**, 60d = **raise +5%** |
| P14 1BR | 12 (3–4) | £254 / £245 / £290 / £290 | £500 room | P100 (+97% / +105% / +72% / +73%) | not seen on Airbnb; comp median 4.91 (19) | 0% vs 41% (30d) | special setup: numbers only |
| P17 1BR | 7 (0–5) | £191 / £204 / £213 / n/a | NOT IN SYSTEMS | n/a | comp median 4.56 (49) | n/a | collect-data |

**Day-on-day (same comp, same stay, same checkout; 1 Nov → 2 Nov):**
- **Comps were mostly flat:** the median like-for-like change is 0.0% on most stays. The exceptions:
  - **P06:** 8–11 Nov −2.9% and 12–15 Nov −4.9% (917140285217729256 £554 → £527; 1018722159796386217 £436 → £410).
  - **P11:** −1% to −2% on 3–5, 10–14 and 18–21 Nov. 1159915905276842600 cut about £100 per stay (6–8 Nov £438 → £338) and 1480693526878012391 cut 10–14 Nov from £281 to £231.
  - **P14:** 6–8 Nov −18%. Three comps each cut £50–£75 for this weekend (1248499039857613537, 1039993866991009459, 1405104068242896146). This looks like a last-minute softening.
  - **P17:** 6–8 Nov +9% (n = 1).
- **Ours moved again, and in both directions:**
  - **P06 kept falling.** The PL room fell again with no log entry: 8–11 Nov £231.67 → £217.67 (−6%), 12–15 Nov £297 → £277. Observed 10–12 Nov fell £252 → £240. 
    - Likely drivers are the Aggressive occupancy profile and the booking recency factor (`get_customizations`). How much each one contributed, and whether the intentional blocks pull down the occupancy PriceLabs sees, is NOT CHECKED.
    - The new 12–15 Nov booking may reset the recency factor at the next refresh.
  - **P05 dipped slightly:** observed 16–18 Nov £416 → £405, 29 Nov–3 Dec £507 → £492, 7–9 Dec £540 → £535. 13–20 Dec was flat.
  - **P08 dipped slightly:** 5–8 Nov £209 → £206, 6–8 Nov £239 → £236.
  - **P11 rose 3–13% on every open stay** because Reyhan removed the 31 Oct cuts: 10–14 Nov £204 → £231, 8–11 Dec £234 → £259, 11–14 Dec £276 → £305.

## P06 12–15 Nov booking vs comps (same stay)

- **What we sold:** Airbnb, booked 1 Nov. Room **£541.00 = £180.33/night** (Smoobu basePrice, cleaning excluded). With the £129 cleaning that is **£223.33/night all-in**, on the same basis as the comps.
- **Comps for 12–15 Nov, checked 2 Nov:**
  - 1018722159796386217 (0.67 km, 4.87 from 87 reviews, parking): £410.
  - 917140285217729256 (1.0 km, lift, 4.59 from 22): £527.
  - 1273781636585601427 (0.93 km, lift, 4.7 from 53): £732.
  - Median **£527** (n = 3). The other 9 of 12 comps are unavailable for this stay, which is itself a demand signal.
- **Where we landed:** P0. The sale is **−58% vs the median** all-in (−66% on room alone) and 46% under the cheapest available comp.
- **Ratios to our own prices:**
  - **0.607x** the PL room for the stay at the 31 Oct refresh (£891, Dispatcher).
  - **0.79x** the room implied by our own Airbnb display on 1 Nov (£270 x 3 − £129 = £681).
  - The gap between the price Airbnb displayed and the room Smoobu recorded is **unexplained, NOT CHECKED**: the Airbnb reservation's price breakdown was not seen.
- **Conclusion:** the stay sold at roughly half the market for those dates. Quality supports only −2% vs the median (≈ £514 all-in). This booking is evidence that P06 is under-priced, not a reason to cut.

## Input for today's base review (raised flats in this batch)

- **P05 (base £550): keep £550, do not cut; raise the December open stays by about +25%** (≈ £615–£860 all-in, still under every December median). We are P25–P33, 32–48% under the medians on December stays, with qp +0.15 and bookings 39 points ahead of the market at 30 days.
  - The new 29 Jan–1 Feb booking (£1,059.52 room = £353/night) is outside the comp window. January comps are NOT CHECKED.
  - Reyhan's 31 Oct −5% (29 Nov–2 Dec, 13–19 Dec) and −7% (4–31 Jan) have no change logged since 1 Nov, so they are taken to still stand (overrides not re-read today). They conflict with the comp evidence: report for Corentin to confirm.
- **P06 (base £357): keep £357, do not cut.**
  - The comps support **+10% on 8–11 Nov** (`recommend`, with 30d ex-blocks occupancy now 66.7% vs 46%), about £230 all-in, still 33% under the median.
  - The real problem is not the base: PriceLabs' Aggressive occupancy profile and booking recency factor took another 6% off overnight. The 12–15 Nov stay sold at 0.607x PL and 58% under comps.
  - Report the algorithmic drift for Corentin to confirm. Proposals are out of scope here; the 8–14 Nov run being open at all is t-p06-open under policy intentional blocks.
- **P11 (base £286): keep £286.** Reyhan's 2 Nov 00:11Z removal of the −7%/−5% cuts (10 Nov–18 Dec) is consistent with the comp evidence: even after the +3–13% we are P0–P40 at room price and P0–P60 at the Booking.com list price. The 30d shortfall is visibility (`fix-listing`), and 60d supports +5%.
  - **Darts conflict:** the same edit made 13–17 Dec min-stay-only too. The darts +5% that policy `darts_override_24oct` says to leave in place no longer applies, and 13–17 Dec now prices at £240 / £213 / £218 / £229 / £250 (average £230, against the 21 Oct intent of over £300). This is a conflict with a standing decision for Corentin to confirm.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

**a-p05-9nov: NOT FIXED.**
- **PriceLabs:** 9 Nov is £1,451, min stay 1 (`prices.csv` 2 Nov).
- **Airbnb, 9–10 Nov, 7 adults, checked 2 Nov:** still **1 night x £511.80, "Special offer −£63.36", total £448.44**. That is identical to 31 Oct and 1 Nov.
- **Control:** 29 Dec (PL £1,342, min 1) displays £1,402.80 = 0.900 x £1,342 + £195. So the override flows through on other dates, and the 9 Nov problem is specific to that date.
- **Position:** at what guests see on 9 Nov we are P100, +40% vs the single comp priced (1617681646241740026, £320).

**Positioning:**
- `quality_premium(4.77, 4.27)` = **+0.15** (cap).
- `recommend(0.793, 0.40, 0.38, 0.15)` → **raise +25%** (30d).
- `recommend(0.678, 0.38, 0.30, 0.15)` → **raise +25%** (60d).
- **Reasoning:** P05 books 30–39 points ahead of the market with half a star more and 12.5 more reviews than the set median, yet sits a third to a half under every December median.
- **Caveat:** only 6 comps qualify, and three are rated below 4.3, which inflates qp.
- **Differentiators:**
  - 912053248917940403: Superhost, lift, park view, 4.96.
  - 1639043256346803626: Superhost house with a terrace, 4.89.
  - 1610095240357069208 and 1606112160333193293: 0.55 km, parking.

## P06 Marylebone 2-bed (3288517): intentional blocks excluded

- **Open 8–11 Nov only:** £209.52 derived (0.765 x £217.67 + £43).
- **Observed:** 8–12 Nov £202.65 and 10–12 Nov £240.45. Our listing is 4.60 (10), with no offer line.
- **Position:** P0 on every stay, −31% to −39% vs the medians.
- **Excluded per policy:** 24–29 Nov (blocked on purpose).
- **Positioning:**
  - `quality_premium(4.60, 4.66)` = −0.024.
  - `recommend(0.667, 0.46, 0.0, −0.024)` → **raise +10%**.
  - The 60d `fix-listing` output is not used, because `forward_occ_60` (13.6%) counts the intentional blocks.
- **Differentiators:** 5 of the 12 comps have a lift and 2 are Superhosts. P06 is on the 2nd floor with no lift and has 15 fewer reviews than the median.

## P08 Islington 2-bed (3318167): sellable to 13 Nov only (handback)

- **5–8 Nov:** £205.72 x 3 all-in, observed (0.765 x PL £204 + £149 / 3). No offer line.
- **Comps priced:** only 28354043 (4.8, 35 reviews), at £386: we are P0, −47%. 6–8 Nov £236 vs £408 (same comp).
- **Positioning:**
  - `quality_premium(4.33, 4.87)` = −0.15.
  - `recommend(0.727, 0.48, 0.0, −0.15)` → **raise +10%** (≈ £226 / £260 all-in).
  - **Reasoning:** n = 1 is too thin to go further. Three days from arrival and with the handback, +10% is the ceiling.
- **Differentiator:** P08 has a ground-floor private terrace.

## P11 Camden 2-bed (3064196): Booking.com only

- **2 Nov orphan (t-p11-2nov):** Reyhan set +10% with min 1 at 00:11Z today. 2 Nov is outside the `prices.csv` window, and Smoobu shows no booking for it at the 06:59 snapshot. Whether it sold is NOT CHECKED.
- **Position:** every open stay is P0–P40 at room price and 11–46% under the comp median. At the Booking.com list price (before Mobile 10%, Genius and Last Minute) we are P0–P60, from −38% to +3% (10–14 Nov is the only stay above the median at list price).
- **Bias:** the comps include cleaning and our room price does not, so the room percentile is biased low.
- **Positioning:**
  - qp = 0 (Booking.com 8.0/10 is not on the Airbnb scale).
  - `recommend(0.379, 0.46, 0.07, 0)` → **fix-listing** (30d).
  - `recommend(0.407, 0.39, 0.10, 0)` → **raise +5%** (60d).
  - **Reasoning:** we trail the market at 30 days while already near the bottom on price. Policy records Booking.com search views −64% and CTR 0.81% vs 1.70%, so the problem is visibility, not price.
- **Differentiators:** 4 of the 12 comps have a lift and 3 have a balcony or terrace. P11 is a basement flat with a patio.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only

- **Ours:** PL room £500, min stay 3–4.
- **Comp medians:** £254 / £245 / £290 / £290 (n = 3 / 4 / 4 / 3), which puts us at P100, +97% / +105% / +72% / +73%.
- **Occupancy:** 0% vs 41% (30d).
- **Comp rating median:** 4.91 (19).
- No proposal, per policy.

## P17 St John's Wood 1-bed: NOT IN SYSTEMS

- **Comp medians:** £191 / £204 / £213 / n/a (n = 1 / 1 / 5 / 0).
- **Comp rating median:** 4.56 (49).
- Reference set only.

## Comp tables

Source for every comp row: Airbnb public search, checked 2026-11-02. Nightly price excludes taxes and includes cleaning. (±%) is the change vs 1 Nov for the same stay and checkout. "n/a" = not returned by the date-filtered search (booked or min stay).

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Mon 9 Nov–Tue 10 Nov (1n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 7 Dec–Wed 9 Dec (2n) | Sun 13 Dec–Wed 16 Dec (3n) | Thu 17 Dec–Sun 20 Dec (3n) | Sun 20 Dec–Tue 22 Dec (2n) | Tue 29 Dec–Wed 30 Dec (1n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £529 | n/a | £509 | £920 | n/a | £509 | £960 | £1020 | £980 | £980 | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £519 | £570 | £1020 | n/a | £519 | £960 | £1020 | £980 | £980 | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.96 (28) | £618 (-2%) | £896 | n/a | n/a | n/a | n/a | £930 (+15%) | n/a | £914 (+16%) | £1080 (+16%) | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.29 (45) | n/a | n/a | £337 (-4%) | n/a | £320 | n/a | n/a | £326 (-4%) | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.83 (12) | £400 | n/a | £474 (+1%) | n/a | n/a | £400 | £420 | n/a | £451 (+2%) | £504 (+1%) | £589 | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | £280 (-26%) | n/a | n/a | n/a | n/a | £400 | n/a | £560 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.27 (22.5) | £519 (5) | £707 (2) | £492 (4) | £970 (2) | £320 (1) | £454 (4) | £945 (4) | £790 (4) | £947 (4) | £980 (4) | £1020 (3) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | £446 Booked (Smoobu), min 3 | £494 Booked (Smoobu), min 2 | £602 Booked (Smoobu), min 3 | £626 Booked (Smoobu), min 4 | £1451 Open, min 1 | £402 Open, min 2 | £533 Open, min 3 | £486 Open, min 2 | £564 Open, min 3 | £611 Open, min 3 | £655 Open, min 2 | £1342 Open, min 1 | |
| **Ours, comparable basis** | | | | £439 | £476 | £558 | £576 | £449 obs | £405 obs | £492 obs | £536 obs | £573 obs | £615 obs | £687 obs | £1403 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P40 / -15% | P0 / -33% | P75 / +13% | P0 / -41% | P100 / +40% | P50 / -11% | P25 / -48% | P25 / -32% | P25 / -40% | P25 / -37% | P33 / -33% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Sun 8 Nov–Wed 11 Nov (3n) | Tue 10 Nov–Thu 12 Nov (2n) | Sun 8 Nov–Thu 12 Nov (4n) | Thu 12 Nov–Sun 15 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.91 (11) | £280 | £339 | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.68 (22) | £280 | n/a | £296 | n/a | n/a | £296 | £292 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | £308 | n/a | £348 | n/a | £292 | £308 | £284 | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | n/a | £432 (-10%) | n/a | n/a | £346 | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.38 (24) | £311 | n/a | £557 | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | £576 (-2%) | n/a (was £588) | £902 (+1%) | £1112 (+1%) | £552 | £588 | £534 | £732 | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | £362 (-6%) | n/a | n/a | £527 (-5%) | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | £239 | n/a | £426 (+1%) | £490 (+1%) | n/a | n/a | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a (was £332) | n/a (was £452) | n/a | £650 (+1%) | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.12 (26) | n/a (was £250) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.87 (87) | n/a | n/a | £550 (-4%) | £604 (-5%) | £323 (-7%) | £348 (-7%) | £324 | £410 (-6%) | parking listed |
| **Comp median (n)** | | | 4.66 (25.0) | £294 (6) | £339 (1) | £432 (7) | £627 (4) | £342 (4) | £346 (5) | £308 (4) | £527 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £236 Booked (Smoobu), min 2 | £267 Booked (Smoobu), min 2 | £399 Blocked, min 3 | £472 Blocked, min 4 | £218 Open, min 2 | £230 Open, min 2 | £223 Open, min 2 | £277 Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £245 | £269 | £370 | £426 | £210 | £240 obs | £203 obs | £255 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P17 / -17% | P0 / -21% | excluded | excluded | P0 / -39% | P0 / -30% | P0 / -34% | P0 / -52% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Thu 5 Nov–Sun 8 Nov (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | £408 | £408 | £408 | £386 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | n/a | £201 | £201 | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | £262 (-3%) | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | £220 | n/a | n/a | n/a | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | n/a | n/a | n/a | n/a (was £255) | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £262 (3) | £408 (1) | £304 (2) | £304 (2) | £386 (1) | |
| **Ours, PL room/night (status, min stay)** | | | | £193 Booked (Smoobu), min 2 | £211 Open, min 2 | £236 Blocked, min 3 | £300 Blocked, min 3 | £204 Open, min 2 | |
| **Ours, comparable basis** | | | | £222 | £236 obs | £255 | £304 | £206 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P33 / -15% | P0 / -42% | excluded | excluded | P0 / -47% | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Tue 10 Nov–Sat 14 Nov (4n) | Wed 18 Nov–Sat 21 Nov (3n) | Sat 21 Nov–Tue 24 Nov (3n) | Sat 28 Nov–Fri 4 Dec (6n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 23 Dec–Sat 26 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | n/a | n/a | £440 | £440 | £283 | £336 | £416 | £392 | £447 | £529 | £456 | n/a | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | n/a (was £286) | n/a | n/a | n/a | n/a | n/a | £359 | £359 | £382 | £440 | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | n/a | n/a (was £294) | £462 | £258 | n/a (was £270) | £270 | £424 | £444 | £494 | n/a (was £420) | n/a | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | £218 (-8%) | £338 (-23%) | £338 (-23%) | n/a | n/a (was £406) | £317 (-24%) | £317 | n/a | £417 | £417 | n/a (was £406) | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.45 (11) | £272 | £306 | £306 | £615 | n/a | £282 | £282 | £424 | £444 | £494 | £420 | n/a | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £286 (-2%) | £328 | n/a (was £358) | n/a | £329 | n/a | n/a | n/a | £374 | £448 | £472 | £501 | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a (was £202) | n/a (was £212) | n/a (was £312) | n/a | £231 (-18%) | n/a | n/a | n/a | £292 | n/a | n/a (was £281) | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.5 (60) | n/a | n/a | £191 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £270 | £307 | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £190 (-10%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £217 | £258 | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.54 (37) | n/a | £294 | n/a | n/a | £250 (-3%) | £294 (-1%) | n/a | n/a | £314 (+1%) | £353 | n/a | £361 | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (35.5) | £272 (3) | £317 (4) | £306 (5) | £462 (3) | £258 (5) | £306 (4) | £300 (4) | £424 (3) | £374 (9) | £432 (8) | £420 (5) | £389 (6) | |
| **Ours, PL room/night (status, min stay)** | | | | £208 Booked (Smoobu), min 2 | £240 Booked (Smoobu), min 2 | £198 Open, min 2 | £274 Open, min 2 | £231 Open, min 2 | £202 Open, min 2 | £211 Open, min 2 | £228 Open, min 2 | £259 Open, min 2 | £305 Open, min 2 | £249 Open, min 2 | £315 Open, min 2/3 | |
| **Ours, comparable basis** | | | | £208 | £240 | £198 | £274 | £231 | £202 | £211 | £228 | £259 | £305 | £249 | £315 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = PL x 1.15 (before promotions)** | | | | £240 P33 / -12% | £276 P0 / -13% | £227 P40 / -26% | £316 P0 / -32% | £266 P60 / +3% | £232 P0 / -24% | £243 P0 / -19% | £262 P0 / -38% | £298 P22 / -20% | £351 P12 / -19% | £287 P20 / -32% | £362 P50 / -7% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -24% | P0 / -24% | P40 / -36% | P0 / -40% | P0 / -11% | P0 / -34% | P0 / -29% | P0 / -46% | P11 / -31% | P12 / -30% | P0 / -41% | P33 / -19% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a (was £168) | £202 (-20%) | n/a | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | £278 (-21%) | n/a (was £352) | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | £236 | £236 | n/a | n/a | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £252 (-17%) | £302 | n/a | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | n/a (was £278) | £278 | n/a | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | £254 | n/a | n/a (was £290) | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a (was £345) | n/a | £402 | n/a | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (19) | n/a (was £218) | n/a | n/a | £259 (-4%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (16) | n/a | n/a | £200 | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | £264 | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.9 (10) | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.91 (19.0) | £254 (3) | £244 (4) | £290 (4) | £290 (3) | |
| **Ours, PL room/night (status, min stay)** | | | | £500 Open, min 3 | £500 Open, min 4 | £500 Open, min 3 | £500 Open, min 4 | |
| **Ours, comparable basis** | | | | £500 | £500 | £500 | £500 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +97% | P100 / +104% | P100 / +72% | P100 / +73% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Tue 3 Nov–Thu 5 Nov (2n) | Fri 6 Nov–Sun 8 Nov (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £190 | £204 (+9%) | £192 | n/a | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (49) | n/a | n/a | £320 | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.56 (27) | n/a | n/a | n/a | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.87 (87) | n/a | n/a | £264 | n/a | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.66 (59) | n/a | n/a | £213 (-3%) | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | £126 | n/a | parking listed |
| [774061637963678253](https://www.airbnb.co.uk/rooms/774061637963678253) | 0.54 | 3 | 4.5 (34) | n/a | n/a | n/a | n/a | Superhost, parking listed |
| **Comp median (n)** | | | 4.56 (49) | £190 (1) | £204 (1) | £213 (5) | n/a (0) | |
| **Ours, PL room/night (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | |
## Rows written
- **`data/snapshots/2026-11-02/comps.csv`:** **418 comp-central rows** (55 comp ids x their stays; 160 priced, a blank price means not available).
  - Appended under `.comps.csv.lock`. The file already existed (created by another agent), so it was not copied forward by me. The header was checked against `rm/snapshot.py` and a duplicate guard was applied.
  - Each row carries platform, URL, stay dates, adults, price basis, check date, distance, capacity and differentiators.
- **`data/snapshots/2026-11-02/channel_checks.csv`:** **12 rows**, our observed Airbnb prices (P05 x8, P06 x2, P08 x2). Appended under `.channel_checks.csv.lock`.
- `rm.snapshot.load('2026-11-02')` reads 1,096 comps and 222 channel checks (all agents, at the time of writing).

Data gaps:
- **Booking.com: NOT CHECKED** for all properties (bot check; not retried or bypassed). This leaves several P11 items unknown: its displayed price after promotions, its search rank and its review count. P11's percentile compares PL room (or x1.15) with Airbnb all-in comps.
- **P06 12–15 Nov:** why the Smoobu room (£541) is 0.79x what our Airbnb listing displayed on 1 Nov is NOT CHECKED (the Airbnb reservation breakdown was not seen).
- **P06:** the split of the overnight −6% between the occupancy profile and the recency factor is NOT CHECKED. So is whether the intentional blocks depress PriceLabs' occupancy input.
- **P06 sync:** PriceLabs `prices.csv` still showed 12–14 Nov as open after the Smoobu booking. This goes to t-push-check.
- **P05 9 Nov:** the source of Airbnb's stale £316.80 room and the 20% "Special offer" is NOT CHECKED (Airbnb calendar and Smoobu stored rate not read).
- **P05:** January comps were not priced, so the 29 Jan–1 Feb booking is not benchmarked. Reyhan's −5%/−7% overrides were not re-read today; the inference that they stand rests on no log entry.
- **P11 2 Nov:** whether the orphan sold is NOT CHECKED.
- **Thin comp evidence:**
  - P08: n = 1 on its open stays.
  - P05: n = 3–4 per stay, n ≤ 1 on the 1-night stays.
  - P06 12–15 Nov: n = 3.
- **Absent comps:** their listing pages load (HTTP 200), but whether they have availability in the next 60 days was not verified (calendars not read).
- **P14:** not seen on Airbnb, so its rating and reviews are NOT CHECKED.
- **P17:** not in PriceLabs or Smoobu.

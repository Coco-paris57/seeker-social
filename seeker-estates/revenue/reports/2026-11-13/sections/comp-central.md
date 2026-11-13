# Competitor positioning: CENTRAL/NORTH (D = 2026-11-13)

**Method**
- **Policy read first** (`data/policy.json`). Not re-raised: P06 intentional blocks, P14 special setup, Booking.com stacking (size only), Camden Visibility Booster 18%, 15%/20% stay discounts, Booking.com markup +10% (12 Nov), darts `darts_override_24oct`.
- **Commission:** I use the channel agent's finding (Camden ~18% = Visibility Booster, expected). Not re-raised.
- **Comp ids:** the same ids I kept on 12 Nov (comp-central rows in `data/snapshots/2026-11-12/comps.csv`). **No replacement today.** These were not returned on any of today's stays (booked or min-stay; whether they are inactive is NOT CHECKED): P06 917140285217729256 and 1452940332365117153; P14 1075245497252121738 and 1659680062193836633; P17 975294297333089697. P08: all 6 (one stay, handback).
- **Searches:** 88 public Airbnb searches on airbnb.co.uk, **checked 2026-11-13 07:21:58–07:33:26Z**. Every result page was read: 0 parse failures, no bot challenge. Map boxes and filters are the same as 25 Oct–12 Nov: entire home, min bedrooms = ours, adults = our sleeps − 1. Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c13s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c13/search/*.json`.
- **Stays priced for every comp and for us:**
  - **Fri 20–Sun 22 Nov** (next Friday–Sunday).
  - **Tue 17–Thu 19 Nov** (midweek).
  - **Sun 13–Tue 15 Dec** (30 days out).
  - The 12 Nov stays, repeated for day-on-day comparison.
  - **P11 extras:** 8–15 Dec, darts 13–17 Dec, 15–18 Dec, 15–19 Dec, 18–20 Nov, 22–26 Nov, 29 Nov–5 Dec, 8–11 Dec, 11–14 Dec, 23–26 Dec, 3–6 Jan.
  - **P05 extras:** 16–18 Nov, 29 Nov–3 Dec, 21–22 Dec, 29–30 Dec, 20–22 Dec, 28–30 Dec.
  - **P06 extras:** 15–17, 15–18 and 16–18 Nov, plus **22–24 Nov and 22–29 Nov (newly reopened)**.
- **Our prices:**
  - Rates come from a live **Smoobu GET `/api/rates` at 13 Nov 07:21:04Z** (`.../scratchpad/c13/smoobu_rates13.json`). That is what the channels sell.
  - Booked/open status comes from Smoobu `reservations.csv` 13 Nov (confirmed bookings only).
  - P11 and P06 were also checked live with PriceLabs `get_listing_prices` (one call at a time).
- **Price basis:**
  - **Comps:** Airbnb total ÷ nights. Excludes taxes, includes cleaning, after offers and weekly discounts.
  - **P05 and P06:** our own Airbnb listing as seen in the same search (rows in `channel_checks.csv`). Where it was not returned, the price is derived as before: P06 = 0.765 × Smoobu + £129 per stay; P05 = 0.765 × Smoobu at ≤28 days out or 0.900 × at 29–56 days, + £195.
    - Re-checked exactly today: P06 15–18 Nov £646.90 = 0.765 × £677 + £129; P06 22–24 Nov £659.91 = 0.765 × £694 + £129; P05 21 Dec £2,061.60 = 0.900 × £2,074 + £195.
  - **P11 and P14:** Smoobu room rate, which excludes cleaning. For P11 I also show:
    - "+ cleaning" = + £149 ÷ nights, the like-for-like figure.
    - "list" = Smoobu × 1.10 (policy markup, 12 Nov) + cleaning.
    - "stack" = 0.5267 × list + cleaning (channel agent, 11 Nov).
  - Whether the Airbnb comp prices include VAT is NOT CHECKED.
- **Booking.com live: NOT CHECKED.** I did not attempt it: it showed an AWS WAF challenge on 11 and 12 Nov, and the rules forbid getting past it.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 12–13 Nov): **0 entries**.
  - `get_listing_date_overrides` P11 3064196 (13 Nov–13 Jan): unchanged since 9 Nov. **13–18 Dec −3% min 3** (Reyhan 9 Nov 21:21:47Z); 22 Nov–12 Dec −3% min 3; 23–25 Dec +5%; 2–13 Jan −5%.
  - `get_listing_prices` P11 (29 Nov–18 Dec) and P06 (14–18 Nov).
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy from Smoobu, confirmed bookings only. Nights that are unavailable and unbooked are excluded. Windows: 13 Nov–12 Dec (30d) and 13 Nov–11 Jan (60d).
  - Market occupancy from `reports/2026-11-13/kpi_pack.json`.
  - Percentile = mean over open multi-night stays.
  - Script: `.../scratchpad/c13s/analyse13.py`. Output: `.../scratchpad/c13/analysis.json`.
- **Rows written** under `flock`:
  - **871 comp rows** appended to `data/snapshots/2026-11-13/comps.csv` (`.comps.csv.lock`). The file already existed, copied forward by another agent.
  - **9 own-listing rows** appended to `channel_checks.csv` (`.channel_checks.csv.lock`).

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d | Rating ours vs comp median; review gap | Booked vs market (Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P11 2BR** | 12 (1–10) | **P14 / P5 / P4** at room price (12 Nov: P14 / P10 / P9) | Booking.com 8.0/10 (policy) vs Airbnb comp median 4.67 (36): not comparable | 30d **41.4%** (12 of 29) vs 50%; 60d 40.7% (24/59) vs 39% | qp 0, so **at the comp median (0%)**. `recommend`: 30d "fix-listing" 0%; 60d **raise +5%**. **Every open stay is now −27% to −51% vs median at room price** (−7% to −41% with cleaning added). No cut is supported. |
| **P05 4BR** | 6 (0–4) | P0 / P12 / P12 | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 30d 73.3% (22/30) vs 44%; 60d 66.7% (40/60) vs 39% | qp **+0.15**, so **+15% vs median**. `recommend` **raise +25%** (30d and 60d). **Exception: the single nights of 21 Dec (£2,074) and 29 Dec (£2,712) have no comp support.** |
| **P06 2BR** | 12 (1–7 on open stays) | P20 / P20 / P20 | 4.58 (12) vs 4.62 (26); −14 | **35.3% (6/17)** vs 50% with 22–29 Nov counted as open. **66.7% (6/9)** without them | qp −0.016, so **−2% vs median**. `recommend` "fix-listing" 0% (with 22–29 Nov, which only reopened 12 Nov 12:59Z) / **raise +10%** (without them). |
| P08 2BR | 6 (0) | n/a | 4.50 vs 4.87 (29) | 100% vs 52% | Moot: tonight (13 Nov) is the handback last night, and it is booked. |
| P14 1BR | 12 (0–9) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 48% (kpi_pack; no Smoobu reservation) | Special setup: numbers only. **+35% to +92% vs median.** |
| P17 1BR | 7 (0–3) | n/a | comp median 4.68 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

## P11 Camden (3064196; Booking.com only)

**What changed overnight: our prices, not the comps'.**
- The PriceLabs refresh of **13 Nov 06:34:59Z** (live `get_listing_prices`, `last_refreshed_at`) reached Smoobu. **Open P11 nights 29 Nov–18 Dec are now 3% to 30% lower than yesterday.** Examples (Smoobu 12 Nov → 13 Nov):
  - 29 Nov £242 → £188
  - 3 Dec £301 → £211
  - 4 Dec £349 → £259
  - 8 Dec £261 → £202
  - 11 Dec £329 → £263
  - 12 Dec £332 → £266
  - 13 Dec £231 → £186
  - 3 Jan £182 → £172
- **This is not a user edit.** `get_user_logs` 12–13 Nov shows 0 entries, base stays 286 (`listings.csv`) and the DSOs have not changed since 9 Nov.
- The PriceLabs `uncustomized_price` fell as well, and the final price now sits about 15% under it on every date checked (8 Dec £202 vs £238, 29 Nov £188 vs £221, 13 Dec £186 vs £219). The −3% DSO does not explain a 15% gap. **Cause NOT CHECKED** (pricelabs auditor). One possibility is that the 7 reopened nights changed the occupancy-based or last-minute inputs.
- **The kept comps did not move:** median like-for-like change is **0%** on every P11 stay priced on both days, except 27–29 Nov (n = 1, −14%; we are booked). The one mover is 1675590787835266115 (4.67, terrace), which cut 13–17 Dec −18% (£456 → £374) and 8–15 Dec −10% (£362 → £326).
- **8–14 Dec is now open in PriceLabs as well as in Smoobu** (live `get_listing_prices` shows booking_status empty, user_price £217 on 8 Dec). The sync gap from 12 Nov is closed.

### 8–15 Dec (7 nights, reopened): same kept comps

| Comp | Rating (reviews) | £/night 8–15 Dec, 5 adults (13 Nov) | vs 12 Nov |
|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) (lift, terrace) | 4.71 (31) | £413.29 | 0% |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) (lift) | 4.50 (12) | £391.00 | 0% |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 4.54 (13) | £391.00 | 0% |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 4.68 (69) | £375.43 | 0% |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) (terrace) | 4.67 (12) | £326 | −10% |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) (terrace) | 4.55 (38) | £305 | +1% |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 4.46 (28) | £242.86 | 0% |
| **Median (n = 7)** | | **£375.43** (unchanged) | |

| Our figure for 8–15 Dec | £/night | Pct / vs median | 12 Nov |
|---|---|---|---|
| Smoobu room (£1,535 / 7) | £219.29 | **P0 / −42%** | £269.29, P14 / −28% |
| Room + £149 cleaning ÷ 7 | £240.58 | P0 / −36% | £290.58 |
| **Policy-expected guest price: list (× 1.10) × 0.85 weekly + cleaning** | **£226.32** | **P0 / −40%** | – |
| If the same Booking.com stack recurs (0.5267 × list + cleaning) | £148.34 | P0 / −60% | £177.30 |

- **Supported:** qp 0, so **at the comp median**. That is about **£375/night all-in after the weekly discount**, roughly **£379 Smoobu room** once the 1.10 markup, 0.85 weekly and cleaning are backed out ((375.43 − 21.29) / 0.935).
- **Gap at the policy-expected price:** (£375.43 − £226.32) × 7 = **£1,043.77 on the week** (12 Nov: £876.75). The overnight drop added about £167.

### Darts nights 13–17 Dec (policy: raised by Corentin 21 Oct, average above £300/night)

| Comp | Rating (reviews) | 13–17 Dec £/night (4n, 5 adults) | 15–18 Dec (3n) |
|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) (lift, terrace) | 4.71 (31) | £429 | £451 |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 4.68 (69) | £406 | £417 |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) (lift) | 4.50 (12) | £394 | £416 |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 4.54 (13) | £394 | £416 |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) (terrace) | 4.67 (12) | £374 (−18%) | £388 (−19%) |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 4.72 (180) | £351 | not returned (was £363) |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 4.46 (28) | £281 | £292 |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 4.44 (61) | £235 | £260 |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) / [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) (Superhost, lift) | 4.72 (87) / 4.69 (74) | £197 (1090…) | £215 (6543…) |
| **Median (n)** | | **£373.75 (9)**; 12 Nov £394 (9) | **£402 (8)** |

| Ours (Smoobu 13 Nov) | £/night | Pct / vs median |
|---|---|---|
| **13–17 Dec room** (£186 / £201 / £209 / £216; 12 Nov £231 / £208 / £215 / £225) | **£203.00** (12 Nov £219.75) | **P11 / −46%** |
| Room + £149 ÷ 4 cleaning | £240.25 | P22 / −36% |
| List (× 1.10) + cleaning | £260.55 | P22 / −30% |
| If the stack recurs | £154.86 | P0 / −59% |
| **Policy level £300 room** (all-in with cleaning £337.25) | £300 | P33 / −20% (all-in P33 / −10%) |
| 15–18 Dec room (£209 / £216 / £233) | £219.33 | P12 / −45% (all-in £269.00: P25 / −33%) |

- **Policy says darts average above £300/night. Smoobu now sells £186–£216 on 13–16 Dec**, an average of **£203**, down from £219.75. The gap to the policy level is **(£300 − £203) × 4 = £388 room** on the stay.
- The −3% DSO (Reyhan 9 Nov) is still in place of the +5% darts override. **That conflict with the standing decision is still for Corentin to confirm. It is not a new proposal.** Today's extra drop comes from the PriceLabs algorithm (see above), not from a user edit.
- **The comps back the policy level and more.** 6 of 9 comps ask more than £337 all-in on 13–17 Dec. Supported at the median (qp 0) is **£373.75 all-in, about £336.50 room**.

### Other open P11 nights (Smoobu 13 Nov room; comps all-in)

| Stay (open nights) | Ours room (12 Nov) | Comp median (n) | Pct / vs median | List × 1.10 + cleaning |
|---|---|---|---|---|
| 18–20 Nov (18, 19; min 2) | £173.50 (£172.50) | £267.00 (8) | P0 / −35% | £265.35: P50 / −1% |
| 22–26 Nov (22–25; min 3) | £211.75 (£214.25) | £293.75 (6) | P17 / −28% | £270.18: P33 / −8% |
| 24–26 Nov | £212.50 (£214.00) | £294.00 (8) | P25 / −28% | – |
| 29 Nov–5 Dec (29 Nov–4 Dec) | **£199.33 (£267.33)** | £378.83 (3) | P0 / −47% | £244.10: P0 / −36% |
| 8–11 Dec | **£206.33 (£261.67)** | £373.00 (9) | P0 / −45% | £276.63: P11 / −26% |
| 11–14 Dec | **£238.33 (£297.33)** | £416.67 (7) | P0 / −43% | £311.83: P14 / −25% |
| 12–14 Dec | **£226.00 (£281.50)** | £437.50 (7) | P0 / −48% | £323.10: P29 / −26% |
| **13–15 Dec (30 days out)** | £193.50 | £396.00 (10) | **P0 / −51%** | £287.35: P30 / −27% |
| 15–19 Dec (15–18) | £235.00 (£247.25) | £406.25 (7) | P0 / −42% | £295.75: P29 / −27% |
| 23–26 Dec (min 2; +5% DSO) | £267.00 (£282.67) | £365.34 (6) | P0 / −27% | £343.37: P50 / −6% |
| **3–6 Jan (3 Jan, min 3; −5% DSO)** | **£184.33** (£172 / £184 / £197; 12 Nov £196.67) | **£291.67 (9)** | **P0 / −37%** | £252.43: P33 / −13% |

- **3 Jan:** £172 is below every comp's 3–6 Jan nightly; the cheapest is 1090528454481682946, 4.72, at £195. With cleaning the stay is £234.00 all-in (P22 / −20%). **Supported (median, qp 0): about £291.67 all-in, about £242 room.**
- **Positioning:**
  - `quality_premium` = 0 (no Airbnb rating to compare).
  - `recommend(0.414, 0.50, 0.05, 0)` → **"fix-listing", 0%** ("behind market −9% while already at P5"). `recommend(0.407, 0.39, 0.04, 0)` → **raise +5%** (60d).
  - The 30d shortfall does not support a cut. P11 is already P0–P14 at room price, and the comps did not move while we fell 20%.
  - **Supported: at the comp median (0%).**
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (min) | Ours, Airbnb all-in/night (observed) | Kept comp median (n) | Pct / vs median | All ≥10-review 4BR in search: median (n) |
|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £479 / £470 (min 2); 12 Nov £471 / £452 | **£460.50** | £552 (4); 12 Nov £807.50 | **P25 / −17%** | £509 (5): −10% |
| **13–14 Dec** (13–15 Dec, 30 days out) | £494 / £481 (min 2); 12 Nov £518 / £505 | **£536.50** | £625 (4); 12 Nov £850 | **P25 / −14%** | £570 (5): −6% |
| **21 Dec** (1 night) | **£2,074** (min 1); 12 Nov £2,198 | **£2,061.60** | **n = 0**. Overlapping 20–22 Dec: £574 (3) | **+259% vs £574** | 21–22 Dec: **0**. 20–22 Dec: £643.50 (5) → +220% |
| **29 Dec** (1 night) | **£2,712** (min 1); 12 Nov £2,777 | **£2,635.80** | **n = 0** | n/a | **0** (only two 0-review 4BR at £2,132 / £2,399; we are above both) |

- **Why the kept median fell:** comp 1610095240357069208 (4.15, 13 reviews) cut December from £1,020 to £509–£570 (−44% to −50%). The other comps did not move. With n = 4 the median swings on one listing.
- **7–8 and 13–14 Dec** are still unsold at P25.
  - qp +0.15 supports **+15% vs median**: about **£635 all-in on 7–9 Dec**, which is about **£702 Smoobu room** ((635 − 97.5) / 0.765). On 13–15 Dec it is about **£719 all-in**, about **£690 room** ((719 − 97.5) / 0.900).
  - `recommend` gives **+25%**: about £599 / £588 and £618 / £601 room, which is still under the +15% target.
  - **A rise of at least +25% is supported** on both gaps. Caveat: n = 4, and the top of the set is 1606112160333193293 (4.24) at £1,020.
- **21 and 29 Dec:**
  - Smoobu eased 2–6% overnight (no P05 log entry, so this is PriceLabs).
  - On 21 Dec, +15% vs the overlapping medians means about **£660–£740 all-in**, about **£517–£606 room** ((660 − 195) / 0.900 to (740 − 195) / 0.900). Today's £2,074 is 3.4–4.0× that.
  - 29 Dec has no qualifying comp at all.
  - This is Reyhan's +300% DSO (9 Nov). It is the open action a-p05-dec, not raised as new.
- **Other open P05:**
  - 16–18 Nov: £396 observed vs £419 (3), P0 / −5%.
  - 29 Nov–3 Dec: £434.50 observed vs £502.75 (4), P0 / −14%.
- **Positioning:** `quality_premium(4.77, 4.26)` = +0.15 (cap). `recommend(0.733, 0.44, 0.12, 0.15)` → **raise +25%**. `recommend(0.667, 0.39, 0.12, 0.15)` → **raise +25%**.
- **Differentiators:** 912053248917940403 is a Superhost with a lift and park view (4.97); it was returned only on 29 Nov–3 Dec (£688). 1639043256346803626 is a Superhost house with a terrace (4.89): £595 on 7–9 Dec, £680 on 13–15 Dec. Three comps list parking.

## P06 Marylebone 2-bed (3288517)

**Block change, for Corentin to confirm (not a proposal):**
- Smoobu block 143402691 ("Blocked channel") was **modified 12 Nov 12:59:51** and now runs **30 Nov 2026–31 Dec 2027**. Source: Smoobu GET `/api/reservations`, guest fields dropped, `.../scratchpad/c13/p06_res.json`.
- Until yesterday the blocks started 22 Nov. **22–29 Nov (8 nights) are now open in Smoobu** (available, min 2–4, £346–£445).
- **They are bookable on Airbnb:** our listing was returned on 22–24 Nov (£329.96/night) and 22–29 Nov (£352.71 × 7 − weekly £351.01 = £302.57/night).
- PriceLabs `prices.csv` (13 Nov) still shows them Blocked.
- Who changed the block, and whether that was intended: NOT CHECKED. Nights from 30 Nov stay excluded as intentional.

**15–17 Nov: what guests see.**
- Smoobu sells **£222 / £222 / £233**. Live PriceLabs shows `price` **£248 / £248 / £255** (`user_price` £245 / £245 / £254; last refreshed 12 Nov 09:23:14Z).
- **Airbnb shows the Smoobu figure:** 15–18 Nov £646.90 = 0.765 × (222 + 222 + 233) + £129, which is £215.67/night. Had the PriceLabs £751 reached Smoobu, it would be about £234.50/night.
- Why Smoobu sits under PriceLabs: NOT CHECKED (pricelabs auditor).

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Supported (−2%), all-in → Smoobu room |
|---|---|---|---|---|
| 15–18 Nov | **£215.67 observed** (12 Nov £233.00) | £247.00 (2) | P50 / −13% | about £242 → about **£260/night** |
| 15–17 Nov | £234.33 derived | £280.00 (1) | P0 / −16% | about £274 → about **£274/night** |
| 16–18 Nov | £238.54 derived | £308.75 (2) | P0 / −23% | about £303 → about **£312/night** |
| **22–24 Nov (reopened)** | **£330.00 observed** | £335.00 (6) | **P50 / −1.5%** | at supported level |
| **22–29 Nov (reopened, 7n)** | **£302.57 observed** (weekly −15% shown) | £326.71 (3) | P0 / −7% | about £320 |
| 24–26 Nov (reopened; min 3) | £333.40 derived | £385.50 (7) | P43 / −14% | about £378 |
| 27–29 Nov (reopened; min 4) | £387.71 derived | £500.30 (4) | P0 / −22% | about £490 |

- On 15–17 Nov the Smoobu price that guests see is **P0–P50, −13% to −23% vs median**. The supported level is about **£260–£312 Smoobu room**, which is **+17% to +37% over £222–£233**. Even the PriceLabs £248–£255 would be under it.
  - Kept-comp availability is thin (n = 1–2), and only 3 nights are left to sell.
  - Reyhan's DSO **11–17 Nov −10% min 2** (11 Nov) is unchanged. The comps do not support the cut.
- **The reopened 22–29 Nov** opens at the median on 22–24 Nov and at −7% to −22% on the later stays.
- **Positioning:** `quality_premium(4.58, 4.62)` = −0.016.
  - `recommend(0.353, 0.50, 0.20, −0.016)` → "fix-listing" 0%. That counts the 8 nights that only reopened 12 Nov 12:59Z, so the shortfall is new inventory, not weak demand.
  - Without them: `recommend(0.667, 0.50, 0.20, −0.016)` → **raise +10%**.
  - **Supported: −2% vs median.**

## P08 Islington 2-bed (3318167): handback tonight
- Booked 8–14 Nov (Airbnb, Smoobu). 13 Nov is the policy last night. No proposal.
- No kept comp was returned for 13–15 Nov today. Yesterday 28354043 was £408.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- Smoobu is **£450** on 13 Nov–3 Dec and 6–10 Dec. Other nights:
  - 4–5 Dec £475 / £526
  - 11–13 Dec £483 / £597 / £515
  - 14–17 Dec £459–£481
  - 18–20 Dec £518–£589
  - 21–27 Dec £455–£568
  - **28–31 Dec £719–£779**
  - 1–2 Jan £687 / £620
  - Min stay 3–4.
- Booked: **0% vs market 48%** at 30d (kpi_pack; no P14 reservation in Smoobu). Minimum 450 (Reyhan, 9 Nov): already reported for Corentin, not re-raised.
- Against the comp median: **P100 on every priced stay, +35% to +92%.**
  - 17–19 Nov £450 vs £236.50 (7): +90%
  - 13–15 Dec £487 vs £277.50 (7): +76%
  - 7–9 Dec £450 vs £277.50 (7): +62%
  - 27–29 Nov £450 vs £333 (2): +35%
  - 20–22 Nov and 4–6 Dec: n = 0

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- Comp medians:
  - 20–22 Nov £292.50 (1)
  - 17–19 Nov £190.50 (2)
  - 13–15 Dec £242 (3)
  - 24–26 Nov £174.50 (3)
  - 7–9 Dec £228.50 (3)
  - 9–11 Dec £240.50 (3)
  - 11–13 Dec £316 (2)
  - 27–29 Nov: n = 0
- Comp rating median 4.68 (52).

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-13 07:21:58–07:33:26Z.
- Nightly price excludes taxes, includes cleaning and is after offers.
- (±%) is the change vs 12 Nov for the same stay. "n/a" means the listing was not returned (booked or min-stay).
- The "Ours" rows use the live Smoobu rate (13 Nov 07:21Z).
- The P06 22–24 / 22–29 Nov columns are not in these tables. Their rows are in `comps.csv` and summarised above.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.15 (13) | n/a | £419 | £570 (-44%) | £419 | £570 (-44%) | £570 (-44%) | £509 | £509 (-45%) | £509 (-50%) | £509 (-50%) | £509 (-50%) | £509 (-50%) | £540 (-47%) | £419 | £449 (-53%) | n/a | n/a | £570 (-44%) | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £441 | £468 (-2%) | £1020 | £420 (-19%) | £1020 | £1020 | £441 (-7%) | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £454 (-9%) | £552 | n/a | n/a | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | £266 | n/a | n/a | n/a | n/a | £313 | n/a | n/a | £317 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | £480 (+7%) | n/a | n/a | n/a | £440 (-3%) | n/a | n/a | n/a | n/a | n/a | n/a | £400 | £454 (-4%) | n/a | n/a | £574 (+1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | £680 | n/a | n/a | n/a | n/a | n/a | n/a | £595 | £595 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £441 (1) | £409 (4) | £625 (4) | £420 (2) | £795 (2) | £795 (2) | £441 (4) | £509 (1) | £764 (2) | £552 (4) | £595 (3) | £764 (2) | £780 (2) | £419 (3) | £503 (4) | n/a (0) | n/a (0) | £574 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | £558 Booked (Smoobu), min 3 | £452 Booked (Smoobu)/Open, min 2/3 | £488 Open, min 2 | £502 Booked (Smoobu), min 4 | £561 Booked (Smoobu)/Open, min 2/3 | £624 Booked (Smoobu), min 3 | £539 Booked (Smoobu), min 3 | £578 Booked (Smoobu), min 4 | £584 Booked (Smoobu), min 4 | £474 Open, min 2 | £506 Booked (Smoobu)/Open, min 2/3 | £560 Booked (Smoobu), min 3 | £598 Booked (Smoobu), min 3 | £390 Open, min 2 | £504 Open, min 3 | £2074 Open, min 1 | £2712 Open, min 1 | £1352 Booked (Smoobu)/Open, min 1/2 | £1750 Booked (Smoobu)/Open, min 1/3 | |
| **Ours, comparable basis** | | | | £524 | £443 | £536 obs | £482 | £602 | £574 | £510 | £540 | £544 | £460 obs | £485 | £526 | £555 | £396 obs | £434 obs | £2062 obs | £2636 obs | £1315 | £1672 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P100 / +19% | P75 / +8% | P25 / -14% | P100 / +15% | P50 / -24% | P50 / -28% | P100 / +16% | P100 / +6% | P50 / -29% | P25 / -17% | P0 / -19% | P50 / -31% | P50 / -29% | P0 / -6% | P0 / -14% | n/a | n/a | P100 / +129% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 22 Nov–Tue 24 Nov (2n) | Sun 22 Nov–Sun 29 Nov (7n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | £286 | £460 | n/a | n/a | n/a | £330 | £412 | n/a | £420 | £420 | £440 | n/a | n/a | n/a | n/a | £294 | £315 | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | £280 | £340 | n/a | n/a | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | £280 | £280 | £280 | £296 | n/a | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £308 (-6%) | n/a | n/a | n/a | n/a | £308 (-12%) | n/a | n/a | £342 (-4%) | £342 (-4%) | £342 (-4%) | n/a | n/a | n/a | n/a | £308 | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £318 (-2%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | n/a (was £315) | n/a | n/a | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | £382 | n/a | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a | £982 | n/a | £1008 (-26%) | £1008 (-32%) | n/a | £1008 (-25%) | £1098 (-27%) | £1008 (-16%) | £1008 (-16%) | £1008 (-22%) | £1008 (-30%) | n/a | n/a | n/a | n/a | n/a | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | £472 | n/a | £565 (+3%) | n/a | £443 (-4%) | £546 (-6%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £415 | £391 | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £421 | n/a | £451 (-4%) | £484 | £386 (-6%) | £455 (-1%) | £471 (-1%) | £394 (-1%) | n/a (was £404) | £416 (-1%) | £458 | £214 (-5%) | n/a | n/a | £362 | £327 | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | £506 | n/a | n/a | n/a | n/a | n/a | £726 (-8%) | £647 (-2%) | £684 (-1%) | n/a (was £628) | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | £355 (-2%) | £476 | n/a | n/a | n/a | £414 (+3%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £338 | £388 | n/a | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £308 (5) | £466 (8) | n/a (0) | £565 (3) | £746 (2) | £386 (7) | £500 (4) | £726 (3) | £420 (5) | £420 (5) | £416 (5) | £458 (3) | £247 (2) | £280 (1) | £309 (2) | £335 (6) | £327 (3) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | £386 Booked (Smoobu), min 2 | £264 Booked (Smoobu)/Open, min 2 | £439 Blocked, min 3/4 | £292 Booked (Smoobu), min 2 | £477 Blocked, min 4 | £496 Blocked, min 4 | £352 Open, min 3 | £422 Open, min 4 | £487 Blocked, min 4 | £386 Blocked, min 3 | £394 Blocked, min 3 | £419 Blocked, min 3 | £468 Blocked, min 3/4 | £226 Open, min 2 | £222 Open, min 2 | £228 Open, min 2 | £347 Open, min 2/3 | £371 Open, min 2/3/4 | |
| **Ours, comparable basis** | | | | £360 | £267 | £400 | £288 | £429 | £444 | £333 | £388 | £437 | £359 | £366 | £385 | £423 | £216 obs | £234 | £239 | £330 obs | £303 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -13% | excluded | n/a | excluded | excluded | P43 / -14% | P0 / -22% | excluded | excluded | excluded | excluded | excluded | P50 / -13% | P0 / -16% | P0 / -23% | P50 / -2% | P0 / -7% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | n/a (was £408) | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | n/a (0) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | £250 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £266 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 8 Dec–Tue 15 Dec (7n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Fri 18 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.71 (31) | n/a | £276 | £472 | n/a (was £287) | £545 | £589 | £440 | n/a | £440 | £440 | £440 | £486 | £550 | £413 | £429 | £451 | £456 | £276 (-10%) | £404 | £392 | n/a | £273 | £447 | £529 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | £374 | n/a | n/a | n/a | n/a | n/a | n/a | £374 | £374 | £374 | n/a | n/a | £351 | n/a (was £363) | £357 | n/a | n/a | n/a | £392 | £308 | £359 | n/a | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a | £272 | £436 | n/a | £510 | £554 | £272 | n/a | £544 | £463 | £454 | £470 | £516 | £391 | £394 | £416 | £420 | £272 | n/a | £379 | n/a | £304 | £444 | £494 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | n/a | £438 | £438 | £338 | n/a | n/a | £438 | £438 | £438 | £438 | £375 | £406 | £417 | £406 | n/a | £306 | n/a | £417 | £417 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.54 (13) | £282 | £282 | £436 | n/a | £510 | £554 | n/a (was £306) | n/a (was £342) | n/a | £463 | £454 | £470 | £516 | £391 | £394 | £416 | £420 | £282 | n/a (was £270) | n/a | n/a | £247 | £444 | £494 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | n/a | £256 (-4%) | £418 | n/a (was £310) | £418 (-13%) | £418 (-13%) | £388 (-24%) | £418 (-14%) | £424 (-11%) | n/a (was £388) | £388 | £410 | £424 (-7%) | £326 (-10%) | £374 (-18%) | £388 (-19%) | n/a (was £472) | £286 (-2%) | £344 (-26%) | £320 (-13%) | £499 | £369 | £373 | £388 (-13%) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a | £212 | £312 | n/a | £312 | £312 | £312 | n/a | n/a | £312 | £312 | £312 | £312 | £243 | £281 | £292 | £281 | £262 | £281 | n/a | £292 | £292 | £292 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (62) | n/a | n/a | £241 | n/a | n/a | n/a | £191 | n/a | n/a | n/a | £241 | £241 | £241 | n/a | £235 | £260 | £270 | £191 | £185 | n/a | £307 | n/a | £237 | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | £220 | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £197 | n/a | n/a | n/a | n/a | n/a | n/a | £195 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.69 (74) | n/a | n/a | £222 | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | £215 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | £283 | £228 | n/a | n/a | n/a | n/a | £276 | n/a | n/a | n/a | £308 | £332 (+1%) | n/a | £305 (+1%) | n/a | n/a | n/a | £238 (-5%) | £256 | n/a | £339 | £217 | £312 (+1%) | £339 (+1%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | n/a | n/a | £280 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £283 (2) | £256 (7) | £396 (10) | n/a (0) | £438 (7) | £438 (7) | £294 (8) | £418 (1) | £440 (3) | £438 (7) | £388 (9) | £410 (9) | £438 (7) | £375 (7) | £374 (9) | £402 (8) | £406 (7) | £267 (8) | £294 (6) | £379 (3) | £365 (6) | £292 (9) | £373 (9) | £417 (7) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | £276 Booked (Smoobu), min 2 | £172 Booked (Smoobu)/Open, min 2 | £194 Open, min 3 | £244 Booked (Smoobu)/Unavailable, min 2 | £226 Open, min 3 | £264 Open, min 3 | £212 Open, min 3 | £292 Booked (Smoobu), min 3 | £267 Booked (Smoobu)/Open, min 3 | £202 Booked (Smoobu)/Open, min 3 | £200 Open, min 3 | £208 Open, min 3 | £242 Open, min 3 | £219 Open, min 3 | £203 Open, min 3 | £219 Open, min 3 | £235 Open, min 3 | £174 Open, min 2 | £212 Open, min 3 | £199 Open, min 3 | £267 Open, min 2 | £184 Open, min 3 | £206 Open, min 3 | £238 Open, min 3 | |
| **Ours, comparable basis** | | | | £276 | £172 | £194 | £244 | £226 | £264 | £212 | £292 | £267 | £202 | £200 | £208 | £242 | £219 | £203 | £219 | £235 | £174 | £212 | £199 | £267 | £184 | £206 | £238 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.10 (before promotions)** | | | | £304 P100 / +8% | £190 P0 / -26% | £213 P0 / -46% | £268 | £249 P0 / -43% | £291 P14 / -34% | £234 P25 / -20% | £322 P0 / -23% | £294 P0 / -33% | £223 P14 / -49% | £219 P0 / -43% | £229 P0 / -44% | £266 P14 / -39% | £241 P0 / -36% | £223 P11 / -40% | £241 P12 / -40% | £258 P0 / -36% | £191 P0 / -28% | £233 P17 / -21% | £219 P0 / -42% | £294 P17 / -20% | £203 P11 / -30% | £227 P0 / -39% | £262 P0 / -37% | Smoobu Booking.com markup +10% (policy, 12 Nov) |
| **Our percentile / vs median** | | | | P0 / -2% | P0 / -32% | P0 / -51% | n/a | P0 / -48% | P0 / -40% | P25 / -28% | P0 / -30% | P0 / -39% | P0 / -54% | P0 / -48% | P0 / -49% | P14 / -45% | P0 / -42% | P11 / -46% | P12 / -45% | P0 / -42% | P0 / -35% | P17 / -28% | P0 / -47% | P0 / -27% | P0 / -37% | P0 / -45% | P0 / -43% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £182 | n/a | n/a | n/a | n/a | £202 | n/a | n/a | n/a (was £202) | n/a (was £202) | £202 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | n/a | £352 | £352 | £352 | £428 | n/a | £352 | n/a (was £352) | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | £236 | £246 | n/a | £253 | £260 | n/a | n/a | n/a | £246 | £246 | £246 | £253 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | £182 | £302 | n/a | £302 | £302 | £252 | n/a | n/a | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £182 | £278 | n/a | £278 | £278 | £252 | n/a | n/a | £278 | £278 | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | £290 | £290 | n/a | £290 | £290 | n/a | n/a | n/a | n/a | n/a | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | n/a | n/a | n/a | £368 | n/a | n/a | £402 | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £235 | n/a | n/a | £270 (-6%) | n/a | £238 (-12%) | n/a | £255 (+1%) | £266 (+1%) | £262 (+1%) | £268 (+1%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | £264 | £241 | n/a | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £238 | n/a | £238 | n/a | n/a | £238 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £236 (7) | £278 (7) | £238 (1) | £290 (5) | £284 (6) | £252 (6) | £333 (2) | n/a (0) | £278 (7) | £272 (6) | £278 (9) | £290 (7) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £487 Open, min 3/4 | £450 Open, min 4 | £556 Open, min 4 | £540 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £500 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £450 Open, min 3 | £466 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £487 | £450 | £556 | £540 | £450 | £450 | £500 | £450 | £450 | £450 | £466 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +90% | P100 / +76% | P100 / +90% | P100 / +92% | P100 / +90% | P100 / +78% | P100 / +35% | n/a | P100 / +62% | P100 / +66% | P100 / +62% | P100 / +61% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 20 Nov–Sun 22 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Sun 13 Dec–Tue 15 Dec (2n) | Fri 13 Nov–Sun 15 Nov (2n) | Sat 12 Dec–Mon 14 Dec (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | n/a | £190 (+9%) | £192 | £204 | n/a | n/a | £174 | n/a | n/a | £192 | £192 | £192 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | £292 | n/a | £293 | n/a | £309 (-7%) | £325 (-5%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £292 (-3%) | £243 (-2%) | £237 (-2%) | £240 (-2%) | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | n/a | n/a | £242 | £238 (-19%) | £278 (-8%) | £307 (-5%) | £212 (-10%) | n/a | n/a | n/a | n/a | £242 (-6%) | £272 (-7%) | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.68 (62) | n/a | n/a | n/a | n/a | n/a | n/a | £172 (+4%) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.74 (27) | n/a | £190 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.68 (52) | £292 (1) | £190 (2) | £242 (3) | £221 (2) | £293 (2) | £316 (2) | £174 (3) | n/a (0) | £292 (1) | £228 (3) | £228 (3) | £240 (3) | £235 (2) | |
| **Ours, Smoobu live rate/night 13 Nov 07:21Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
Data gaps:
- **Booking.com live prices: NOT CHECKED** (WAF on 11–12 Nov; not tried, not bypassed). The P11 guest price on Booking.com today, and whether the full promotion stack still applies, are unverified.
- **Why the PriceLabs 13 Nov 06:35Z refresh cut P11 by up to 30%: NOT CHECKED.** There is no user log and the DSOs are unchanged. The final price sits about 15% under `uncustomized_price` on every date checked. Referred to the PriceLabs auditor.
- **P06 Smoobu £222/£222/£233 vs PriceLabs £248/£248/£255 on 15–17 Nov: cause NOT CHECKED.** Airbnb shows the Smoobu figure.
- **P06 block 143402691 moved to start 30 Nov (12 Nov 12:59:51):** who did it and whether it was intended is NOT CHECKED. PriceLabs still shows 22–29 Nov as Blocked.
- **Whether Airbnb comp prices include VAT: NOT CHECKED.** P11 and P14 are compared at room price, plus cleaning-added figures for P11.
- **P11 has no Airbnb rating,** so `quality_premium` is 0 by construction.
- **Thin samples:**
  - P06: n = 1–2 on 15–17 Nov and n = 3 on 22–29 Nov.
  - P05: n = 4 kept (one comp's −50% cut moved the median), and n = 0 on 21 and 29 Dec.
  - P14: n = 0 on 20–22 Nov and 4–6 Dec.
  - P11: n = 3 on 29 Nov–5 Dec.
- **Kept comps not returned on any stay** (listed in Method): whether they are inactive is NOT CHECKED, so none was replaced.
- The source text of the comps.csv rows gives the check window as 07:21–07:36Z. The actual last search was 07:33:26Z.
- **P17 is not in PriceLabs or Smoobu:** reference set only.

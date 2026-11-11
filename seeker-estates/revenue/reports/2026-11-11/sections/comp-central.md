# Competitor positioning: CENTRAL/NORTH (D = 2026-11-11)

**Method**
- **Comp ids:** the same comp ids as 1–10 Nov (comp-central rows in `data/snapshots/2026-11-10/comps.csv`). **One replacement:**
  - **P17: 774061637963678253 is replaced by 1582737718080351704.** The old comp's Airbnb room page returned **HTTP 410 Gone** (11 Nov ~07:32Z), so it is inactive. The new comp is "Apartment in Little Venice Westminster": 1 BR, sleeps 3 (room page `personCapacity`), 4.74 (27), 1.0 km away.
  - These comps were not returned on any of today's stays, but their room pages load (HTTP 200): P06 917140285217729256 and 1452940332365117153; P08 693487869095756237, 1289147258305624118, 1409413462916896898, 1497137911142581794 and 1275323094602434212; P14 1075245497252121738; P17 975294297333089697. I did not replace them because inactive is NOT CHECKED.
- **Searches:** 73 public Airbnb searches on airbnb.co.uk, checked **2026-11-11 07:19–07:31Z**. Every result page was read, with 0 parse failures and no bot challenge. Map boxes and filters are the same as 25 Oct–10 Nov: entire home, min bedrooms = ours, adults = our sleeps − 1.
  - Script: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c11s/search.py`. Raw results: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/c11/search/*.json`.
- **Stays priced for every comp and for us:**
  - Fri 13–Sun 15 Nov (next Friday–Sunday).
  - Tue 17–Thu 19 Nov (midweek).
  - **Fri 11–Sun 13 Dec (30 days out).**
  - Kept for day-on-day comparison: 24–26 Nov, 27–29 Nov, 4–6 Dec, 7–9 Dec, 8–10 Dec, 9–11 Dec, 10–12 Dec.
- **Extra stays:**
  - **P11:** **8–15 Dec (7 nights, the new booking)**, **13–17 Dec (darts)**, **15–18 Dec (the darts nights still open)**, 15–19 Dec, 18–20 Nov, 22–26 Nov, 29 Nov–5 Dec, 23–26 Dec, **3–6 Jan**, 8–11 Dec, 11–14 Dec.
  - **P05:** 16–18 Nov, 29 Nov–3 Dec, 13–15 Dec, 21–22 Dec, 29–30 Dec, 20–22 Dec, 28–30 Dec.
  - **P06:** 11–12 Nov, 15–17 Nov, 15–18 Nov, 16–18 Nov.
  - **P08:** 13–15 Nov only.
- **Our prices:** live **Smoobu GET `/api/rates` at 11 Nov 07:18:31Z** (`.../scratchpad/c11/smoobu_rates11.json`). Booked/open status comes from Smoobu `reservations.csv` (11 Nov).
- **Price basis:**
  - **Comps:** Airbnb total ÷ nights. Excludes taxes, includes cleaning, after any offer or weekly discount.
  - **P05 and P06:** our own Airbnb listing as seen in the same search (9 stays; rows in `channel_checks.csv`). Where it was not returned, the price is derived as before (P06: 0.765 × Smoobu + £129 per stay; P05: 0.765 × at ≤28 days out, 0.900 × at 29–56 days, + £195). The P05 factors re-check exactly today: 7–9 Dec £451 = (0.765 × 923 + 195) / 2; 21 Dec £2,202 = 0.900 × 2,230 + 195; 29 Dec £2,703 = 0.900 × 2,786 + 195.
  - **P11 and P14:** Smoobu room rate, which excludes cleaning while the comps include it, so their percentiles are biased low.
  - P11 is also shown at "list" = Smoobu × 1.15 (policy markup). The channel agent found today that the Camden Booking.com Standard on 8–14 Dec was Smoobu × ~1.10 (`sections/channel.md` §1). The × 1.15 row is therefore an upper bound.
  - Booking.com prices include VAT (channel: £1,012.86 includes £168.81 VAT). Whether the Airbnb comp prices include VAT is NOT CHECKED.
- **Booking.com live: NOT CHECKED.** I did not attempt it. The channel agent's plain search at 07:25Z hit an AWS WAF challenge, which was not bypassed.
- **PriceLabs (read-only, one call at a time):**
  - `get_user_logs` (listing, 10–11 Nov): 6 entries, **all on P12 (Reyhan, 10 Nov 16:28Z). Nothing on P05, P06, P08, P11 or P14** since yesterday's report.
  - `get_listing_date_overrides` on P11 3064196 (11 Nov–12 Jan): **13–18 Dec still −3% min 3** (updated 9 Nov 21:21:47Z, created 7 Sep). 23–25 Dec +5% min 2. **2–12 Jan −5% min 3** (updated 11 Oct). 11–13 Nov min 2 with no price.
- **Positioning:** `rm/positioning.py` `quality_premium` + `recommend`.
  - Occupancy from Smoobu `reservations.csv` (confirmed only). Nights that are unavailable and unbooked are excluded. Windows: 11 Nov–10 Dec (30d) and 11 Nov–9 Jan (60d).
  - Market occupancy from `reports/2026-11-11/kpi_pack.json`.
  - Percentile = mean over open multi-night stays (14d: check-in by 25 Nov; 30d: by 11 Dec).
  - Script `.../scratchpad/c11s/analyse11.py`, output `.../scratchpad/c11/analysis.json`.
- **Commission:** the channel agent's finding stands (P11 18% = Visibility Booster, expected). Not re-raised here.
- **Rows written** under `flock`: **718 comp rows** appended to `data/snapshots/2026-11-11/comps.csv` (`.comps.csv.lock`; the file had already been copied forward) and **9 own-listing rows** to `channel_checks.csv` (`.channel_checks.csv.lock`).

## Summary

| Ref | Comps (n per stay) | Our pct, open stays 14d / 30d / 60d | Rating ours vs comp median; review gap | Booked vs market (Smoobu) | Supported positioning |
|---|---|---|---|---|---|
| **P05 4BR** | 6 (0–4) | **P0 / P8 / P12** | Airbnb 4.77 (35) vs 4.26 (22.5); +12.5 | 30d 73.3% (22/30) vs 43%; 60d 70.0% vs 39% | `quality_premium` **+0.15**, so **+15% vs median is supported**. `recommend`: **raise +25%** (30d and 60d). **Exception: 21 Dec (£2,230) and 29 Dec (£2,786) single nights sit far above every reference.** |
| **P06 2BR** | 12 (1–5 on open stays) | **P0 / P0 / P0** | 4.58 (12) vs 4.62 (26); −14 | 63.6% (7 of 11 unblocked nights) vs 49% | qp −0.016, so **−2% vs median is supported**. `recommend` 30d: **raise +10%**. Every open stay is −12% to −23% vs median. **11 Nov is a 1-night gap under min 2** (below). |
| P08 2BR | 1 | n/a: nothing to sell | 4.50 vs 4.87 (29) | 100% vs 51% | Moot: booked to the 13 Nov handback. |
| **P11 2BR** | 12 (2–9) | **P16 / P12 / P8** at room price | Booking.com 8.0/10 (policy) vs Airbnb comp median 4.67 (36); not comparable | 30d 55.6% (15 of 27 unblocked) vs 49%; 60d 54.4% vs 39% | qp 0 → **at median (0%) is supported**. `recommend` **raise +5% (30d), +10% (60d)**. Open stays are −22% to −48% vs median at room price. **8–15 Dec sold at −56% vs median all-in (P0).** |
| P14 1BR | 12 (0–9) | P100 | Not seen on Airbnb; comp median 4.88 (19.5) | 0% vs 46% (kpi_pack) | Special setup: numbers only. **+28% to +117% vs median.** |
| P17 1BR | 7 (0–3) | n/a | comp median 4.67 (52) | n/a | Not in PriceLabs or Smoobu: reference set only. |

## P11 Camden (3064196; Booking.com only)

### 8–15 Dec (7 nights, booked 10 Nov on Booking.com): what comps charge for the same week

Comps are the same kept ids, from the Airbnb search for 8–15 Dec with 5 adults. Prices are per night, include cleaning, and are after each comp's own weekly discount.

| Comp | Rating (reviews) | £/night 8–15 Dec | Weekly discount shown |
|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) (lift, terrace) | 4.70 (30) | £413.29 | −£278.10 |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) (lift) | 4.50 (12) | £391.00 | −£287.90 |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 4.50 (12) | £391.00 | −£287.90 |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) (terrace) | 4.67 (12) | £361.71 | −£177.38 |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) (terrace) | 4.55 (38) | £307.29 | none |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 4.46 (28) | £242.86 | −£175.00 |
| **Median (n = 6)** | 4.53 | **£376.36** | |

| Our figure for the same week | £/night | Percentile / vs comp median |
|---|---|---|
| **Paid on Booking.com, room** (£1,012.86 / 7) | **£144.69** | **P0 / −62%** |
| **Paid, guest total incl. £149 cleaning** (£1,161.86 / 7; like-for-like with the comps) | **£165.98** | **P0 / −56%**. That is 32% below the cheapest comp (£242.86, rated 4.46). |
| PriceLabs 10 Nov morning (£1,753 / 7) | £250.43 | P17 / −33% |
| PriceLabs after the policy 15% weekly discount (£1,490 / 7) | £212.86 | P0 / −43% |
| Booking.com Standard (£1,923 / 7, Corentin's screenshot) | £274.71 | P17 / −27% |
| Standard × 0.85 Weekly plan (£233.50) | £233.50 | P0 / −38% |

- **Gap vs comp median, all-in:** (£376.36 − £165.98) × 7 = **£1,472.66 on the week**. Comp prices are unsold asks; 4 of the 6 comps were still bookable for the whole week.
- **Supported:** qp 0, so **at the comp median (0%)**, about £376 all-in or about £355 room. Even the policy-expected level (PriceLabs − 15% weekly, £212.86 room) would have been P0 / −43%. The underpricing therefore comes from two things: the PriceLabs level itself, and the Booking.com stack (0.5267 × Standard, sized by the channel agent; stacking is settled by policy, so only its size is reported).

### Darts nights 13–17 Dec (policy: raised by Corentin 21 Oct, average above £300/night)

| Night(s) | Ours | Comp median (n) | Pct / vs median |
|---|---|---|---|
| **13 Dec (sold, in 8–15 Dec)** | **£126.94 room** (Booking.com Standard £241) | 13–17 Dec stay: **£394.00 (9)**, up from £350.75 (7) on 10 Nov | **P0 / −68%**, below the cheapest comp (1090528454481682946, 4.72, £195.25) |
| **14 Dec (sold)** | **£113.24 room** (Standard £215) | as above | **P0 / −71%** |
| **15 / 16 / 17 Dec (open, min 3; 15–18 Dec stay)** | Smoobu **£201 / £211 / £234** = **£215.33 avg** (list × 1.15 ≈ £247.63) | 15–18 Dec stay: **£397.67 (8)** | **P12 / −46%** (list P12 / −38%) |

- **Policy says darts average above £300/night.** Two facts show that is not what is being sold. Booking.com Standard on 13–14 Dec was £241/£215 even before promotions. The open darts nights sit at £201–£234 in Smoobu.
- PriceLabs `get_listing_date_overrides` shows **13–18 Dec at −3% min 3**, last updated by **Reyhan 9 Nov 21:21:47Z** inside the 22 Nov–18 Dec range DSO. That DSO replaced the darts override, which policy (`darts_override_24oct`) says to leave at +5%.
- **This is a conflict with a standing decision, for Corentin to confirm. It is not a new proposal.**
- **Comp evidence backs the policy level.** £300/night on 15–18 Dec would still be only **P38 / −25%** vs the comp median. On 13–17 Dec the 9 priced comps ask £195–£456; 6 of 9 ask more than £300.
- **Realised on the two sold darts nights:** £240.18 room against ≥£600 at the policy level, a shortfall of **≥£359.82 room**.

### Other open P11 nights

| Stay (open nights) | Ours room (Smoobu 11 Nov) | Comp median (n) | Pct / vs median | List × 1.15 |
|---|---|---|---|---|
| 18–20 Nov (18, 19; min 2) | £160.00 (£150 / £170; were £165 / £191 yesterday) | £262.50 (7) | P0 / −39% | £184: P0 / −30% |
| 22–26 Nov (22–25; min 3) | £201.50 (were ~£214) | £281.25 (5) | P20 / −28% | £232: P20 / −18% |
| 24–26 Nov | £201.00 | £312.50 (7) | P29 / −36% | £231: P29 / −26% |
| 29 Nov–5 Dec (29 Nov–4 Dec) | £242.33 | £367.00 (5) | P0 / −34% | £279: P0 / −24% |
| 15–19 Dec (15–18) | £233.50 | £413.38 (8) | P0 / −44% | £269: P0 / −35% |
| 23–26 Dec (min 2; +5% DSO) | £266.00 | £339.00 (5) | P0 / −22% | £306: P20 / −10% |
| **3–6 Jan (3 Jan, min 3; −5% DSO)** | **£186.33** (£174 / £185 / £200) | **£282.50 (8)** | **P0 / −34%** | £214: P12 / −24% |

- **3 Jan** is the check-in day after the 26 Dec–3 Jan stay. Every night from 3 Jan is open with min 3, so it is not an orphan. At £174 it sits under all 8 comps (cheapest is 1090528454481682946 at £195). Supported (median, qp 0) is about £282 all-in, about £233 room (less £149 cleaning ÷ 3).
- **11–13 Nov** is still closed with no Smoobu reservation (from yesterday's t-p11-1013block). The cause is NOT CHECKED.
- **Day-on-day comp moves:** 1542960049319560709 cut 27–29 Nov by 44% and 4–6 Dec by 37% (to £342.50). 1675590787835266115 raised 24–26 Nov by 42%.
  - Gone since yesterday (sold or min-stay): 2557770 from 5 stays, 1480693526878012391 from 4 stays, 1675590787835266115 from 5 stays, 1543632408013225027 from 13–15 and 24–26 Nov.
  - **Comps are selling at prices well above ours.**
- **Positioning:**
  - `quality_premium` = 0 (no Airbnb rating to compare).
  - `recommend(0.556, 0.49, 0.12, 0)` → **raise +5%** ("in line with market but priced below what quality supports"). `recommend(0.544, 0.39, 0.08, 0)` → **raise +10%** (60d).
  - Counting the 11–13 Nov block as available, 30d is 50.0%: still raise +5%.
  - **Supported: at the comp median (0%). We are 22–48% under on every open stay.**
- **Differentiators:** P11 is a basement flat with a patio. Of the 12 comps, 4 have a lift and 3 have a terrace or balcony.

## P05 St John's Wood 4-bed (3166592; Airbnb 1618929775762183214)

| Gap (stay) | Smoobu room/night (min) | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | NL 4BR (market.csv 11 Nov) |
|---|---|---|---|---|---|
| **7–8 Dec** (7–9 Dec) | £471 / £452 (min 2) (were £475 / £472) | **£451 observed** | £807.50 (4) | **P25 / −44%** | P50 £577, P75 £721 |
| **13–14 Dec** (13–15 Dec) | £518 / £505 (min 2) | **£558 observed** | £850.00 (4) | **P25 / −34%** | as above |
| **21 Dec** (1 night) | **£2,230** (min 1) (was £2,207) | **£2,202 observed** | **n = 0** kept comps. Overlapping 20–22 Dec: kept £1,020 (3). All ≥10-review 4BR: £792.50 (5) | **+116% vs £1,020; +178% vs £792.50** | **+85% vs P90 £1,191** |
| **29 Dec** (1 night) | **£2,786** (min 1) (was £2,855) | **£2,703 observed** | **n = 0**. No ≥10-review 4BR is bookable for 29–30 or 28–30 Dec; only two 0-review listings at £2,132–£2,494 | n/a | **+127% vs P90 £1,191** |

- **21 Dec:** the only rated 4-bed bookable that single night is 1694996617222055382 (4.88, 8 reviews, so not a comp) at £500.
  - Supported (comp median +15%) is **about £911–£1,173 all-in**, which is **about £796–£1,087 Smoobu room** (all-in = 0.900 × room + £195).
  - Today's £2,230 is 2.1–2.8× that.
  - It comes from Reyhan's +300% DSO (9 Nov 14:08:13Z; unchanged per `get_user_logs`). It is the open action a-p05-dec. Not re-raised as new.
- **29 Dec:** price position is unknown (no qualifying comp is bookable). `recommend` gives only a hold-signal. £2,786 rests on no comp evidence.
- **7–8 and 13–14 Dec:** both are bookable at min 2, at P25. At the supported +15% vs median they would be about £929 and £978 all-in, so even the `recommend` +25% (≈ £589 / £565 and £648 / £631 Smoobu) keeps them under the median. Caveat: two comps rated 4.17 / 4.24 ask £1,020 on most December stays and set the top. n = 4.
- **Other open P05:**
  - 16–18 Nov £392.50 obs vs £419 (3), P0 / −6%.
  - 29 Nov–3 Dec £435.75 obs vs £620.13 (4), P0 / −30%. Reyhan's −5% DSO on 29 Nov–2 Dec still runs against `recommend` (yesterday's item, for Corentin).
- **Positioning:** `quality_premium(4.77, 4.26)` = +0.15 (cap). `recommend(0.733, 0.43, 0.08, 0.15)` → **raise +25%**. `recommend(0.700, 0.39, 0.12, 0.15)` → **raise +25%**.
- **Comp moves:** 1639043256346803626 (4.89 Superhost) cut 8–10 Dec by 8% to £595. 1363636555926649515 sold 27–29 Nov.
- **Differentiators:** 912053248917940403 is a Superhost with a lift and park view (4.97). 1639043256346803626 is a Superhost house with a terrace. Three comps list parking.

## P06 Marylebone 2-bed (3288517): open nights only (intentional blocks from 22 Nov excluded)

| Stay | Ours, Airbnb all-in/night | Comp median (n) | Pct / vs median | Supported (−2%) | Smoobu room |
|---|---|---|---|---|---|
| **11 Nov (tonight, 1 night)** | £282 derived (£200 room) | n/a (0; no comp offers 1 night) | n/a | – | **£200, min 2: unsellable** (12–15 Nov booked, 10 Nov passed) |
| 15–17 Nov | £246.50 obs | £280.00 (1) | P0 / −12% | about £274 | £237 / £238 |
| 15–18 Nov | £226.67 obs | £259.00 (2) | P0 / −12% | about £254 | £237 / £238 / £244 |
| 16–18 Nov | £249.00 obs | £321.50 (3) | P0 / −23% | about £315 | £238 / £244 |
| 17–19 Nov (17th open only) | £262 derived | £327.50 (5) | P0 / −20% | – | £244 / booked |

- **11 Nov is a 1-night gap at min 2** (Reyhan's 9–17 Nov −8% min 2 DSO). It cannot sell tonight. Yesterday's report flagged this would happen if 10 Nov did not sell, and it did not. Min stay 1 on 11 Nov is the only lever. The value is small (£200 room, same-day).
- **15–17 Nov is still unsold while we are the cheapest.** Overnight, 673753763892997438 (4.85 Guest favourite) sold all three mid-Nov stays and 1273781636585601427 (4.70) sold 15–18 and 16–18 Nov. 1315177393080154583 cut 15–18 Nov by 12% to £238.
- **Positioning:** `quality_premium(4.58, 4.62)` = −0.016. `recommend(0.636, 0.49, 0.00, −0.016)` → **raise +10%**. This rests on 11 unblocked nights, so it is a thin sample.
  - At P0, the gap is not price-led. It points to conversion: 4.58 from 12 reviews, 2nd floor, no lift. Of the 12 comps, 5 have a lift and 2 are Superhosts.
  - **Supported: −2% vs median**, i.e. a rise of +10–20% on the open nights.

## P08 Islington 2-bed (3318167): handback 13 Nov, nothing left to sell
- Booked 8–14 Nov (Airbnb). 13 Nov is the policy last night. No proposal.
- The only comp returned for 13–15 Nov is 28354043 at £408.

## P14 Primrose Hill 1-bed (3267077): special setup, numbers only
- Smoobu: **£450** on 11 Nov–8 Dec (5 Dec £513). December then runs £450–£776; 3–12 Jan £450. Min 3–5.
- Minimum 500 → 450 (Reyhan, 9 Nov) is unchanged. The conflict with the special setup was reported yesterday for Corentin. Not re-raised.
- Booked: **0% vs market 46%** at 30d (kpi_pack; Smoobu has no P14 reservation in the window).

| Stay | Ours (Smoobu room) | Comp median (n) | Pct / vs median |
|---|---|---|---|
| 13–15 Nov | £450 | n/a (0) | n/a |
| 17–19 Nov | £450 | £220.00 (4) | P100 / +104% |
| 24–26 Nov | £450 | £252.50 (7) | P100 / +78% |
| 27–29 Nov | £450 | £351.25 (2) | P100 / +28% |
| 4–6 Dec | £481.50 | n/a (0) | n/a |
| 7–9 Dec | £450 | £250.75 (6) | P100 / +80% |
| 8–10 Dec | £450 | £277.50 (7) | P100 / +62% |
| 9–11 Dec | £474 | £277.50 (9) | P100 / +71% |
| 10–12 Dec | £554 | £289.50 (7) | P100 / +91% |
| 11–13 Dec (30 days out) | £627 | £288.75 (6) | P100 / +117% |

## P17 St John's Wood 1-bed: NOT IN SYSTEMS (reference set only)
- Comp medians: 13–15 Nov £248.25 (2), 17–19 Nov £182.50 (2), 24–26 Nov £174.50 (3), 4–6 Dec £300 (1), 7–9 Dec £228.50 (3), 8–10 Dec £228.50 (3), 9–11 Dec £245 (3), 10–12 Dec £245.75 (2), 11–13 Dec £334.75 (2). 27–29 Nov: n = 0.
- Comp rating median 4.67 (52). One comp was replaced (see Method).

## Comp tables

**Source for every comp row:** Airbnb public search, checked 2026-11-11 07:19–07:31Z.
- Nightly price excludes taxes, includes cleaning and is after offers.
- (±%) is the change vs 10 Nov for the same stay. "n/a" means the listing was not returned (booked or min-stay).
- The "Ours" rows use the live Smoobu rate (11 Nov 07:18Z).
- For P11 8–15 Dec and 13–14 Dec, the "Ours" cell shows today's Smoobu rate on booked nights, not the price paid. The paid figures are above.

### P05

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Sun 29 Nov–Thu 3 Dec (4n) | Sun 13 Dec–Tue 15 Dec (2n) | Mon 21 Dec–Tue 22 Dec (1n) | Tue 29 Dec–Wed 30 Dec (1n) | Sun 20 Dec–Tue 22 Dec (2n) | Mon 28 Dec–Wed 30 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1610095240357069208](https://www.airbnb.co.uk/rooms/1610095240357069208) | 0.56 | 8 | 4.17 (12) | £419 | £419 | £1020 | £509 | £920 | £1020 | £1020 | £1020 | £1020 | £1020 | £419 | £960 | £1020 | n/a | n/a | £1020 | n/a | parking listed |
| [1606112160333193293](https://www.airbnb.co.uk/rooms/1606112160333193293) | 0.55 | 8 | 4.24 (17) | £519 | £476 | £1020 | £476 | n/a | £1020 | £1020 | £1020 | £1020 | £1020 | £498 | £552 | £1020 | n/a | n/a | £1070 | n/a | parking listed, balcony/patio/terrace |
| [912053248917940403](https://www.airbnb.co.uk/rooms/912053248917940403) | 0.78 | 8 | 4.97 (29) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £688 | n/a | n/a | n/a | n/a | n/a | Superhost, lift, Park view, Guest favourite |
| [1617681646241740026](https://www.airbnb.co.uk/rooms/1617681646241740026) | 0.86 | 8 | 4.28 (46) | n/a | £272 (+2%) | n/a | £318 (-2%) | n/a | n/a | £331 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1363636555926649515](https://www.airbnb.co.uk/rooms/1363636555926649515) | 1.23 | 8 | 3.93 (14) | n/a | £400 | n/a | £474 (+1%) | n/a (was £529) | n/a | n/a | n/a | n/a | n/a | £400 | £471 (+9%) | £460 | n/a | n/a | £579 (-1%) | n/a | balcony/patio/terrace |
| [1639043256346803626](https://www.airbnb.co.uk/rooms/1639043256346803626) | 0.94 | 8 | 4.89 (28) | n/a | n/a | n/a | n/a | n/a | n/a | £595 | £595 (-8%) | n/a | n/a | n/a | n/a | £680 | n/a | n/a | n/a | n/a | Superhost, parking listed, balcony/patio/terrace (house) |
| **Comp median (n)** | | | 4.26 (22.5) | £469 (2) | £409 (4) | £1020 (2) | £475 (4) | £920 (1) | £1020 (2) | £808 (4) | £1020 (3) | £1020 (2) | £1020 (2) | £419 (3) | £620 (4) | £850 (4) | n/a (0) | n/a (0) | £1020 (3) | n/a (0) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | £489 Booked (Smoobu), min 4 | £446 Booked (Smoobu)/Open, min 2/3 | £656 Booked (Smoobu), min 3 | £540 Booked (Smoobu), min 3 | £576 Booked (Smoobu), min 4 | £578 Booked (Smoobu), min 4 | £462 Open, min 2 | £499 Booked (Smoobu)/Open, min 2/3 | £564 Booked (Smoobu), min 3 | £618 Booked (Smoobu), min 3 | £386 Open, min 2 | £506 Open, min 3 | £512 Open, min 2 | £2230 Open, min 1 | £2786 Open, min 1 | £1454 Booked (Smoobu)/Open, min 1/2 | £1796 Booked (Smoobu)/Open, min 1/3 | |
| **Ours, comparable basis** | | | | £472 | £438 | £687 | £510 | £538 | £539 | £451 obs | £479 | £529 | £653 | £392 obs | £436 obs | £558 obs | £2202 obs | £2703 obs | £1407 | £1714 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | P50 / +1% | P75 / +7% | P0 / -33% | P100 / +7% | P0 / -42% | P0 / -47% | P25 / -44% | P0 / -53% | P0 / -48% | P0 / -36% | P0 / -6% | P0 / -30% | P25 / -34% | n/a | n/a | P100 / +38% | n/a | |

### P06

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Wed 11 Nov–Thu 12 Nov (1n) | Sun 15 Nov–Wed 18 Nov (3n) | Sun 15 Nov–Tue 17 Nov (2n) | Mon 16 Nov–Wed 18 Nov (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1700204078606711134](https://www.airbnb.co.uk/rooms/1700204078606711134) | 0.16 | 5 | 4.58 (12) | n/a | £286 (-1%) | n/a | n/a | n/a | n/a | £420 | £420 | £440 | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [744585770789956203](https://www.airbnb.co.uk/rooms/744585770789956203) | 0.56 | 5 | 4.71 (24) | n/a | £280 | n/a | £296 | n/a | n/a | n/a | n/a | n/a | £296 | n/a | £280 | £280 | £280 | Superhost |
| [854346637654279747](https://www.airbnb.co.uk/rooms/854346637654279747) | 0.66 | 6 | 4.79 (61) | n/a | £328 | n/a | £348 | n/a | n/a | £358 | £358 | £358 | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1399094207699964827](https://www.airbnb.co.uk/rooms/1399094207699964827) | 0.87 | 7 | 4.64 (39) | n/a | £332 | n/a | n/a | n/a | n/a | n/a | £398 | £402 | n/a | n/a | n/a | n/a | £322 (-2%) | lift, parking listed |
| [1420126228540342938](https://www.airbnb.co.uk/rooms/1420126228540342938) | 0.89 | 6 | 4.4 (25) | n/a | n/a | n/a | £397 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1273781636585601427](https://www.airbnb.co.uk/rooms/1273781636585601427) | 0.93 | 7 | 4.7 (53) | n/a | n/a (was £498) | £1418 | n/a (was £902) | £1324 (+13%) | £1497 (+5%) | £1189 (+14%) | £1189 (+14%) | £1280 (+13%) | £1378 (+5%) | n/a | n/a (was £462) | n/a | n/a (was £498) | lift |
| [917140285217729256](https://www.airbnb.co.uk/rooms/917140285217729256) | 1.0 | 5 | 4.59 (22) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [1259401393497276633](https://www.airbnb.co.uk/rooms/1259401393497276633) | 0.11 | 6 | 4.38 (13) | n/a | n/a | n/a | £492 (-1%) | £585 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1315177393080154583](https://www.airbnb.co.uk/rooms/1315177393080154583) | 0.11 | 5 | 4.55 (22) | n/a | n/a | £502 | £450 (-5%) | £454 (-1%) | £482 (-1%) | £407 | £402 (-2%) | £419 | £461 | n/a | £238 (-12%) | n/a | n/a | none listed |
| [673753763892997438](https://www.airbnb.co.uk/rooms/673753763892997438) | 0.42 | 5 | 4.85 (54) | n/a | n/a | n/a | n/a | n/a | £810 (+15%) | £672 | £706 (-5%) | £637 (-10%) | n/a | n/a | n/a (was £317) | n/a (was £336) | n/a (was £370) | Guest favourite |
| [1452940332365117153](https://www.airbnb.co.uk/rooms/1452940332365117153) | 0.43 | 5 | 4.07 (27) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | none listed |
| [1018722159796386217](https://www.airbnb.co.uk/rooms/1018722159796386217) | 0.67 | 6 | 4.88 (88) | n/a | £358 (+1%) | n/a | £405 (-7%) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £344 (+1%) | parking listed |
| **Comp median (n)** | | | 4.62 (26.0) | n/a (0) | £328 (5) | £960 (2) | £401 (6) | £585 (3) | £810 (3) | £420 (5) | £411 (6) | £430 (6) | £461 (3) | n/a (0) | £259 (2) | £280 (1) | £322 (3) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | £282 Booked (Smoobu), min 2 | £258 Booked (Smoobu)/Open, min 2 | £538 Blocked, min 4 | £351 Blocked, min 3 | £455 Blocked, min 4 | £493 Blocked, min 4 | £400 Blocked, min 3 | £390 Blocked, min 3 | £416 Blocked, min 3 | £488 Blocked, min 3/4 | £200 Open, min 2 | £240 Open, min 2 | £238 Open, min 2 | £241 Open, min 2 | |
| **Ours, comparable basis** | | | | £281 | £262 | £476 | £333 | £413 | £442 | £370 | £363 | £382 | £438 | £282 | £227 obs | £246 obs | £249 obs | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P0 / -20% | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | n/a | P0 / -12% | P0 / -12% | P0 / -23% | |

### P08

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Differentiators |
|---|---|---|---|---|---|
| [28354043](https://www.airbnb.co.uk/rooms/28354043) | 0.92 | 4 | 4.8 (35) | £408 | none listed |
| [1275323094602434212](https://www.airbnb.co.uk/rooms/1275323094602434212) | 1.43 | 4 | 4.82 (11) | n/a | none listed |
| [693487869095756237](https://www.airbnb.co.uk/rooms/693487869095756237) | 0.34 | 4 | 4.98 (66) | n/a | Superhost, Guest favourite |
| [1289147258305624118](https://www.airbnb.co.uk/rooms/1289147258305624118) | 1.03 | 4 | 5.0 (20) | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1409413462916896898](https://www.airbnb.co.uk/rooms/1409413462916896898) | 1.22 | 4 | 4.6 (77) | n/a | none listed |
| [1497137911142581794](https://www.airbnb.co.uk/rooms/1497137911142581794) | 0.8 | 4 | 4.91 (23) | n/a | Superhost, house (2-bedroom cottage) |
| **Comp median (n)** | | | 4.87 (29.0) | £408 (1) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | £254 Blocked/Booked (Smoobu), min 2 | |
| **Ours, comparable basis** | | | | £268 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | |

### P11

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Tue 8 Dec–Tue 15 Dec (7n) | Sun 13 Dec–Thu 17 Dec (4n) | Tue 15 Dec–Fri 18 Dec (3n) | Tue 15 Dec–Sat 19 Dec (4n) | Wed 18 Nov–Fri 20 Nov (2n) | Sun 22 Nov–Thu 26 Nov (4n) | Sun 29 Nov–Sat 5 Dec (6n) | Wed 23 Dec–Sat 26 Dec (3n) | Sun 3 Jan–Wed 6 Jan (3n) | Tue 8 Dec–Fri 11 Dec (3n) | Fri 11 Dec–Mon 14 Dec (3n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1542815721953379556](https://www.airbnb.co.uk/rooms/1542815721953379556) | 0.4 | 6 | 4.7 (30) | £287 (-3%) | £306 | £589 | £440 | n/a | £440 | £440 | £440 | £486 | £550 | £413 | £429 | £451 | £456 | £306 | £404 | £392 | n/a | £273 | £447 | £529 | lift, balcony/patio/terrace |
| [2557770](https://www.airbnb.co.uk/rooms/2557770) | 0.31 | 6 | 4.72 (180) | n/a | n/a | n/a | n/a (was £270) | n/a | n/a | n/a (was £374) | £374 | £374 | n/a (was £374) | n/a | £351 | £380 | £382 | n/a | n/a (was £244) | n/a | £440 | £326 | £359 | n/a (was £359) | none listed |
| [1543632408013225027](https://www.airbnb.co.uk/rooms/1543632408013225027) | 0.32 | 6 | 4.5 (12) | n/a (was £262) | £272 | £554 | n/a (was £272) | n/a | £544 | £463 | £454 | £470 | £516 | £391 | £394 | £416 | £420 | £272 | n/a | £379 | n/a | n/a | £444 | £494 | lift |
| [1159915905276842600](https://www.airbnb.co.uk/rooms/1159915905276842600) | 0.43 | 5 | 4.68 (69) | n/a | n/a | £438 | £338 | n/a | n/a | £438 | £438 | £438 | £438 | n/a | £406 | £417 | £406 | n/a | £306 | £296 | £417 | £417 | £417 | £417 | none listed |
| [1542960049319560709](https://www.airbnb.co.uk/rooms/1542960049319560709) | 0.49 | 5 | 4.5 (12) | n/a | £282 | £554 | £306 | £342 (-44%) | £342 (-37%) | £463 | £454 | £470 | £516 | £391 | £394 | n/a | £420 | £282 | £270 | £294 (-28%) | n/a | £247 | £444 | £494 | none listed |
| [1675590787835266115](https://www.airbnb.co.uk/rooms/1675590787835266115) | 0.5 | 5 | 4.67 (12) | £316 | £268 (-15%) | £478 | £508 (+42%) | £480 | £478 | £388 | £388 | n/a (was £421) | £454 | £362 | £456 | £478 | £470 (-2%) | n/a (was £316) | n/a (was £306) | £367 | n/a (was £513) | £369 | £373 (-2%) | n/a (was £448) | balcony/patio/terrace |
| [1480693526878012391](https://www.airbnb.co.uk/rooms/1480693526878012391) | 0.56 | 5 | 4.46 (28) | n/a (was £242) | n/a (was £212) | £312 | £312 | n/a | n/a | n/a (was £312) | £312 | n/a (was £312) | £312 | £243 | £281 | £292 | £281 | £262 | £281 | n/a | £292 | £292 | £292 | £292 | none listed |
| [1263490105174331990](https://www.airbnb.co.uk/rooms/1263490105174331990) | 0.08 | 6 | 4.44 (61) | n/a | n/a | n/a | £191 | n/a | n/a | n/a | £241 | n/a | n/a | n/a | £235 | £260 | £270 | £191 | £185 | n/a | £307 | n/a | n/a | n/a | none listed |
| [1090528454481682946](https://www.airbnb.co.uk/rooms/1090528454481682946) | 0.08 | 5 | 4.72 (87) | n/a | n/a | n/a | £184 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £195 | n/a | n/a | n/a | n/a | n/a | n/a | £195 | n/a | n/a | none listed |
| [654396087724294901](https://www.airbnb.co.uk/rooms/654396087724294901) | 0.13 | 5 | 4.68 (73) | n/a | n/a | n/a | n/a | n/a | n/a | £201 | n/a | n/a | n/a | n/a | n/a | £215 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, lift |
| [1568808216094734994](https://www.airbnb.co.uk/rooms/1568808216094734994) | 0.16 | 6 | 4.55 (38) | n/a | £239 | n/a | n/a | n/a | n/a | n/a | £312 (-3%) | £336 (-3%) | n/a | £307 | n/a | n/a | n/a | £260 | n/a | n/a | £339 | £216 | £316 (-3%) | £342 (-1%) | balcony/patio/terrace |
| [1515051936255130803](https://www.airbnb.co.uk/rooms/1515051936255130803) | 0.19 | 6 | 4.76 (34) | n/a | £250 | £280 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | £212 | n/a | n/a | n/a | n/a | n/a | n/a | lift, parking listed |
| **Comp median (n)** | | | 4.67 (36.0) | £301 (2) | £270 (6) | £478 (7) | £312 (7) | £412 (2) | £459 (4) | £439 (6) | £388 (9) | £454 (6) | £485 (6) | £376 (6) | £394 (9) | £398 (8) | £413 (8) | £262 (7) | £281 (5) | £367 (5) | £339 (5) | £282 (8) | £395 (8) | £455 (6) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | £242 Blocked/Booked (Smoobu), min 2 | £164 Booked (Smoobu)/Open, min 2 | £315 Booked (Smoobu), min 3 | £201 Open, min 3 | £290 Booked (Smoobu), min 3 | £320 Booked (Smoobu)/Open, min 3 | £234 Booked (Smoobu), min 3 | £228 Booked (Smoobu), min 3 | £234 Booked (Smoobu), min 3 | £280 Booked (Smoobu), min 3 | £249 Booked (Smoobu), min 3 | £206 Booked (Smoobu)/Open, min 3 | £215 Open, min 3 | £234 Open, min 3 | £160 Open, min 2 | £202 Open, min 3 | £242 Open, min 3 | £266 Open, min 2 | £186 Open, min 3 | £234 Booked (Smoobu), min 3 | £283 Booked (Smoobu), min 3 | |
| **Ours, comparable basis** | | | | £242 | £164 | £315 | £201 | £290 | £320 | £234 | £228 | £234 | £280 | £249 | £206 | £215 | £234 | £160 | £202 | £242 | £266 | £186 | £234 | £283 | obs = our Airbnb listing seen in the same search |
| **Ours, Booking.com list = Smoobu x 1.15 (before promotions)** | | | | £278 P0 / -8% | £189 P0 / -30% | £362 P29 / -24% | £231 P29 / -26% | £334 P0 / -19% | £368 P25 / -20% | £269 P17 / -39% | £262 P11 / -32% | £270 P0 / -41% | £321 P17 / -34% | £287 P17 / -24% | £237 P22 / -40% | £248 P12 / -38% | £269 P0 / -35% | £184 P0 / -30% | £232 P20 / -18% | £279 P0 / -24% | £306 P20 / -10% | £214 P12 / -24% | £269 P0 / -32% | £325 P17 / -28% | Smoobu Booking.com markup +15% (policy) |
| **Our percentile / vs median** | | | | P0 / -20% | P0 / -39% | P29 / -34% | P29 / -36% | P0 / -29% | P0 / -30% | P17 / -47% | P0 / -41% | P0 / -48% | P0 / -42% | P17 / -34% | P11 / -48% | P12 / -46% | P0 / -44% | P0 / -39% | P20 / -28% | P0 / -34% | P0 / -22% | P0 / -34% | P0 / -41% | P0 / -38% | |

### P14

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1248499039857613537](https://www.airbnb.co.uk/rooms/1248499039857613537) | 0.82 | 4 | 4.39 (31) | n/a | £202 | n/a | £202 | n/a | n/a | £202 | £202 | £202 | n/a | none listed |
| [1039993866991009459](https://www.airbnb.co.uk/rooms/1039993866991009459) | 0.84 | 4 | 4.67 (48) | n/a | n/a | £352 | £352 | £428 | n/a | £352 | £352 | £352 | £352 | parking listed |
| [1513597702759149270](https://www.airbnb.co.uk/rooms/1513597702759149270) | 0.96 | 3 | 5.0 (19) | n/a | n/a (was £236) | £260 | n/a | n/a | n/a | £246 | n/a (was £246) | £246 | £253 | Superhost, parking listed, Guest favourite |
| [1405104068242896146](https://www.airbnb.co.uk/rooms/1405104068242896146) | 0.97 | 4 | 4.77 (47) | n/a | n/a | £302 | £252 | n/a | n/a | £302 | £302 | £302 | £302 | none listed |
| [1477465073811441968](https://www.airbnb.co.uk/rooms/1477465073811441968) | 0.98 | 4 | 4.47 (19) | n/a | £202 | £278 | £252 | n/a | n/a | n/a | £278 | £278 | £278 | none listed |
| [1459390808864489268](https://www.airbnb.co.uk/rooms/1459390808864489268) | 1.0 | 3 | 5.0 (12) | n/a | £290 | £290 | n/a | n/a | n/a | n/a | n/a | £290 | £290 | Superhost, parking listed, Guest favourite |
| [1435253477626754812](https://www.airbnb.co.uk/rooms/1435253477626754812) | 0.22 | 4 | 4.7 (27) | n/a | n/a | n/a | £368 | n/a | n/a | n/a (was £402) | £402 | £402 | £402 | balcony/patio/terrace |
| [1075245497252121738](https://www.airbnb.co.uk/rooms/1075245497252121738) | 0.38 | 4 | 4.92 (38) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Canal view, City skyline view, Garden view, Guest favourite |
| [1688600915462932837](https://www.airbnb.co.uk/rooms/1688600915462932837) | 0.46 | 3 | 5.0 (20) | n/a | n/a | £288 | n/a | £275 | n/a | £255 (-1%) | £266 | £263 (-1%) | £269 (-1%) | Guest favourite |
| [1659680062193836633](https://www.airbnb.co.uk/rooms/1659680062193836633) | 0.65 | 4 | 5.0 (17) | n/a | n/a | n/a | £200 | n/a | n/a | n/a | n/a | n/a | n/a | Guest favourite |
| [1460955085260023644](https://www.airbnb.co.uk/rooms/1460955085260023644) | 0.83 | 3 | 4.94 (16) | n/a | n/a | n/a | n/a | n/a | n/a | £241 | £241 | £241 | n/a | Superhost, parking listed, balcony/patio/terrace, Guest favourite |
| [1595613237427991150](https://www.airbnb.co.uk/rooms/1595613237427991150) | 1.0 | 3 | 4.85 (13) | n/a | £238 | n/a | £238 | n/a | n/a | n/a | n/a | n/a | n/a | balcony/patio/terrace |
| **Comp median (n)** | | | 4.88 (19.5) | n/a (0) | £220 (4) | £289 (6) | £252 (7) | £351 (2) | n/a (0) | £251 (6) | £278 (7) | £278 (9) | £290 (7) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | £450 Open, min 4 | £450 Open, min 3 | £627 Open, min 4 | £450 Open, min 3 | £450 Open, min 4 | £482 Open, min 4 | £450 Open, min 3 | £450 Open, min 3 | £474 Open, min 3 | £554 Open, min 3/4 | |
| **Ours, comparable basis** | | | | £450 | £450 | £627 | £450 | £450 | £482 | £450 | £450 | £474 | £554 | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | n/a | P100 / +104% | P100 / +117% | P100 / +78% | P100 / +28% | n/a | P100 / +80% | P100 / +62% | P100 / +71% | P100 / +91% | |

### P17

| Airbnb id | Dist km | Sleeps | Rating (reviews) | Fri 13 Nov–Sun 15 Nov (2n) | Tue 17 Nov–Thu 19 Nov (2n) | Fri 11 Dec–Sun 13 Dec (2n) | Tue 24 Nov–Thu 26 Nov (2n) | Fri 27 Nov–Sun 29 Nov (2n) | Fri 4 Dec–Sun 6 Dec (2n) | Mon 7 Dec–Wed 9 Dec (2n) | Tue 8 Dec–Thu 10 Dec (2n) | Wed 9 Dec–Fri 11 Dec (2n) | Thu 10 Dec–Sat 12 Dec (2n) | Differentiators |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [836419796998711919](https://www.airbnb.co.uk/rooms/836419796998711919) | 0.7 | 3 | 4.47 (17) | £204 | £174 | n/a | £174 (-5%) | n/a | n/a | £192 | £192 | £192 | £199 | lift |
| [1182369331195783741](https://www.airbnb.co.uk/rooms/1182369331195783741) | 0.29 | 4 | 4.94 (52) | n/a | n/a | £348 | n/a | n/a | n/a | n/a | n/a | n/a | n/a | Superhost, Guest favourite |
| [1304473419588771105](https://www.airbnb.co.uk/rooms/1304473419588771105) | 1.31 | 4 | 4.54 (28) | n/a | n/a | n/a | n/a | n/a | £300 (-2%) | £248 (-2%) | £242 (-2%) | £245 (-2%) | n/a | none listed |
| [1242000869201075198](https://www.airbnb.co.uk/rooms/1242000869201075198) | 0.3 | 4 | 4.88 (88) | £292 | n/a | £322 | £234 (-4%) | n/a | n/a (was £323) | n/a | n/a | £257 (-6%) | £292 | Superhost, Guest favourite |
| [1537937424523813717](https://www.airbnb.co.uk/rooms/1537937424523813717) | 0.68 | 5 | 4.67 (61) | n/a | n/a | n/a | £174 (-3%) | n/a | n/a | n/a | n/a | n/a | n/a | lift |
| [975294297333089697](https://www.airbnb.co.uk/rooms/975294297333089697) | 1.38 | 3 | 4.42 (168) | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | parking listed |
| [1582737718080351704](https://www.airbnb.co.uk/rooms/1582737718080351704) | 1.0 | 3 | 4.74 (27) | n/a | £190 | n/a | n/a | n/a | n/a | £228 | £228 | n/a | n/a | none listed |
| **Comp median (n)** | | | 4.67 (52) | £248 (2) | £182 (2) | £335 (2) | £174 (3) | n/a (0) | £300 (1) | £228 (3) | £228 (3) | £245 (3) | £246 (2) | |
| **Ours, Smoobu live rate/night 11 Nov 07:18Z (status, min stay)** | | | | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | n/a NOT IN SYSTEMS | |
| **Ours, comparable basis** | | | | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | n/a | obs = our Airbnb listing seen in the same search |
| **Our percentile / vs median** | | | | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | excluded | |
## Data gaps:
- **Booking.com: NOT CHECKED.** Not attempted (the channel agent hit an AWS WAF challenge at 07:25Z, not bypassed). There is no live guest view of the P11 open nights or the darts list price. Booking.com Standard for 8–14 Dec comes only from Corentin's 10 Nov screenshot.
- **P11 8–15 Dec guest count: NOT CHECKED** (asked of Corentin). Comps were priced for 5 adults. The fifth 10% layer of the stack is NOT CHECKED (channel/dispatcher).
- **VAT basis:** Booking.com paid figures include VAT. Whether the Airbnb comp prices do is NOT CHECKED. P11 and P14 room prices exclude cleaning while the comps include it, so their percentiles are biased low. The P11 "list × 1.15" overstates the list, since the channel found × ~1.10 on 8–14 Dec.
- **Inactive comps:** 9 comps were absent on every stay but their room pages load. Whether they are inactive is NOT CHECKED. Only P17 774061637963678253 (HTTP 410) was replaced.
- **P05 21 and 29 Dec:** no qualifying comp is bookable for either single night. The evidence is overlapping stays and NL P90 (`market.csv` 11 Nov) only.
- **P11 11–13 Nov block:** cause NOT CHECKED.
- **Thin samples:** P05 n = 0–4, P06 n = 1–5 on open stays, P08 n = 1, P14 and P17 some stays n = 0–2.
- **Comp asks are unsold asks.** The prices at which the vanished comps actually sold are unknown.
- **No PriceLabs comp-set or Market Dashboard pull was made by this agent.** NL percentiles are the market agent's (`market.csv` 11 Nov).

# Competitor positioning: EAST batch (D = 2026-10-23)

**Sources.**
- **Market figures:** PriceLabs Nearby Listings bedroom-matched percentiles, pulled 2026-10-23 with read-only `get_neighbourhood_data` (summary mode). All five calls returned `all_operations_ok = true`: P01 3320302, P04 3562176, P09 3318172, P12 2699998, P20 3547481.
- **Saved data:** tables are in `data/snapshots/2026-10-23/raw/neighbourhood_<ref>.json`. Five rows were appended to `data/snapshots/2026-10-23/market.csv`, each with its source.
- **Comp sources:** `get_neighborhood_data_sources` (3547481) shows Competitor Listings "not enabled for this account" and Market Dashboards "No Market Dashboard reports available". A request with `include_competitors` / `fields=nearby_listings` returned no listing rows. So there are **no comp ids**.
- **OTA pages: NOT CHECKED.** The agent proxy refused connections to www.airbnb.co.uk and www.booking.com in this run.
- **`comps.csv`:** 0 rows added. I created the file with its header only.
- **Our price:** the Smoobu price in `prices.csv`. It equals the PriceLabs `price` on every open night checked. It excludes taxes; whether it includes cleaning is unknown.
- **Data age:** PriceLabs data was last refreshed on 22 Oct (P12 18:50Z, P04 17:35Z, others about 08:00Z). `prices.csv` starts on 24 Oct.

**Method.**
- Same as 22 Oct.
- Windows: "next 30" is 24 Oct-21 Nov; "31-60" is 22 Nov-21 Dec.
- Sellable means open nights only. I left out booked nights, handback nights (P01 after 20 Dec and the 30 Nov-17 Dec gap block; P09 after 26 Nov plus 25 Oct; P12 after 13 Dec), and unbookable orphans.
- Our occupancy = booked / (booked + sellable). Market occupancy comes from `pl_kpis.csv`.
- Percentiles are linear between P25, P50, P75 and P90.
- `quality_premium(None, None) = 0.0` for all: our ratings are blank in `listings.csv` and there are no comp ratings. That zero is a default, not evidence.

## Bedroom-matched tables, today vs 22 Oct

| Ref | Band (n) | P25 / P50 / P75 / P90 today | 22 Oct | P50 move |
|---|---|---|---|---|
| P01 Canary Wharf | 2BR (143) | 226 / 277 / 336 / 412 | 226 / 277 / 333 / 412 | 0% |
| P04 Barking | 2BR (87) | 142 / 179 / 222 / 281 | 140 / 177 / 222 / 281 | +1.1% |
| P09 Greenwich | 1BR (127) | 119 / 142 / 172 / 219 | 118 / 142 / 172 / 223 | 0% |
| P12 Mile End | 2BR (120) | 178 / 211 / 255 / 295 | 176 / 211 / 255 / 295 | 0% |
| P20 Waterford Court | 2BR (148) | 225 / 267 / 322 / 399 | 225 / 266 / 322 / 398 | +0.4% |

The market is flat overnight. The changes below are all on our side.

## Where we sit (sellable nights only)

| Ref | Next 30: open / avg | Pctl | vs P50 | 31-60: open / avg | Pctl | vs P50 | Booked 0-30 / 0-60 vs mkt | `recommend` 30 / 31-60 |
|---|---|---|---|---|---|---|---|---|
| P01 | 0 (29 booked) | n/a | n/a | 0 (11 booked; rest handback gap block) | n/a | n/a | 100% / 100% vs 32% / 25% | no open nights |
| P04 | 21 / 166.0 | P41 | -7.3% | 17 / 196.6 (excl. 2 Dec orphan at 601) | P60 | +9.8% | 25% / 33% vs 25% / 19% | raise +5% / raise +10% |
| P09 | 11 / 158.7 | P64 | +11.8% | 0 (22-26 Nov booked; 27 Nov+ handback) | n/a | n/a | 61% / 67% vs 37% / 30% | raise +10% / none |
| **P12** | **18 / 218.1** (208.9 excl. 17 Nov at 375, a +50% override) | P54 (P50) | +3.3% (-1.0%) | 15 / 274.7 | P82 | +30.2% | **38% / 35% vs 40% / 33%** | **hold** / hold |
| P20 | 23 / 272.7 | P53 | +2.1% | 30 / 335.9 | P78 | +25.8% | 15% / 7% vs 35% / 27% | fix-listing / lower -7% |

`recommend` reasons, verbatim:
- **P04:** "in line with market but priced below what quality supports (P41)" / "booked +14% vs market but priced at P60: under-priced".
- **P09:** "booked +24% vs market but priced at P64: under-priced".
- **P12:** "in line with market at P54" / "in line with market at P82".
- **P20:** "behind market -20% while already at P53: conversion/visibility problem, not price" / "behind market -20% at P78: priced above demand".

## Same-date check
Our price from `prices.csv` and its percentile on today's table. Stays: Tue-Thu 27-29 Oct, Fri-Sun 30 Oct-1 Nov, and Sun 22 Nov (D+30). Comp prices for these dates: **NOT CHECKED** (no comp set, OTAs unreachable).

| Ref | Tue 27 Oct | Wed 28 Oct | Fri 30 Oct | Sat 31 Oct | Sun 22 Nov |
|---|---|---|---|---|---|
| P01 | 220 bk <P25 | 219 bk <P25 | 220 bk <P25 | 243 bk P33 | 254 bk P39 |
| P04 | 146 bk P28 | 150 bk P30 | 151 bk P31 | 156 bk P34 | **185 open P53** |
| P09 | **158 open P63** | **158 open P63** | **161 open P66** | **161 open P66** | 170 bk P73 |
| P12 | **162 open <P25** (193 on 22 Oct) | **169 open <P25** (201) | 185 bk P30 | 187 bk P32 | 252 bk P73 |
| P20 | **257 open P44** (239) | 259 bk P45 | 269 bk P51 | **280 open P56** (265) | **304 open P67** (302) |

## P12 Mile End: the 1-8 Nov cancellation
- **Inventory:** the Booking.com stay 1-8 Nov (7 nights, £1,382.86, booked 3 Oct) is cancelled (`reservations.csv`). PriceLabs now shows **1-7 Nov open** (min stay 2). The PriceLabs refresh at 22 Oct 18:50Z already includes it.
- **Prices on the reopened nights:**

  | Night | 1 Nov | 2 Nov | 3 Nov | 4 Nov | 5 Nov | 6 Nov | 7 Nov |
  |---|---|---|---|---|---|---|---|
  | Price | 181 | 184 | 186 | 188 | 192 | 211 | 265 |

  - The average is **201.0**: **P42, -4.7% vs the 2BR P50**.
  - The cancelled booking paid **£197.55/night**, so the reopened nights are priced at about the rate that was lost.
  - Booking.com guests see 1.2x before promotions (policy), about £241.
- **Overnight, PriceLabs cut every P12 night within about 15 days by 15-22%:**
  - Booked nights: 24 Oct 189 to 153; 30 Oct 225 to 185.
  - Open nights: 26 Oct 190 to 157; 27 Oct 193 to 162; 29 Oct 206 to 172.
  - Reopened nights against their old booked-night price: 1 Nov 219 to 181; 6 Nov 271 to 211.
  - Nights 16 or more days out moved only about ±1-6. The open nights 26-29 Oct are now **below P25** (157-172 vs 178).
- **Cause, from read-only reads:**
  - `get_user_logs`: reyhan@ set new P12 overrides on 22 Oct at 18:47Z: **-4% on 26 Oct-15 Nov** and -1% on 29 Nov-13 Dec. The values before are not in the log.
  - `get_customizations`: the "Aggressive" occupancy-based adjustment is on (0-15 days: -20% at 30-40% occupancy, -30% at 10%). A gradual 25% last-minute discount within 15 days is also on.
  - The cancellation lowered near-term occupancy. **The pattern fits the occupancy rule firing:** the cut is limited to 0-15 days, and the -15% override on 24-25 Oct is unchanged since 27 Sep. PriceLabs does not show a per-night breakdown, so this is inferred, not confirmed.
  - The booking-recency factor has not started yet: the last P12 booking was 15 Oct, 8 days ago, and it starts at 15 days.
- **Effect:** next-30 booked fell from 62% (22 Oct section) to **38% vs market 40%**. `recommend` moves from "raise +10%" to **"hold"**.

## Other changes since 22 Oct
- **P20:**
  - The 28-31 Oct Airbnb booking is now in PriceLabs as booked.
  - **20-21 Nov now shows "Blocked"** in PriceLabs (both were open at 299/337 yesterday). There is no override (`get_listing_date_overrides`), no entry in `reservations.csv`, and no log entry. The cause is NOT CHECKED. It is not a policy block.
  - Open-night prices **rose by 14-32 on 25 Oct-6 Nov** (for example 27 Oct 239 to 257; 4 Nov 280 to 312). Overrides are unchanged (-4% to 31 Oct, -2% 1-30 Nov, last updated 17 Oct), so the rise is algorithmic, consistent with the extra booked nights. 21 Dec fell 412 to 368.
  - Next 30 sits at P53 (P50 yesterday). The 20% new-listing Airbnb promotion and the other Airbnb discounts are explained in policy (`listing_facts.P20`) and not flagged.
- **P04:** most open nights fell by 1-6 (for example 21 Nov 205 to 174; 2 Nov 187 to 180). 6 Nov rose 160 to 179. There are no P04 log entries and no new bookings. Next 30 is now P41 (P43 yesterday).
- **P09:** open nights moved by -7 to +20 (11 Nov 140 to 160; 28 Oct 151 to 158). There are still no new bookings since the 176 base went live on 18 Oct (Dispatcher: no new booking since 22 Oct).
- **P01:** booked-night prices moved by ±1-27. This makes no revenue difference. There are 0 sellable nights before the 20 Dec handback.

## Supported positioning (judgement on top of `recommend`)
- **P01: no action.** There are no sellable nights before the handback.
- **P04: 0% to +5% vs P50 for next 30 is supported** (now -7.3%, P41). The lead over market is 0 points, so +5% is the ceiling. For 31-60, hold at +10% / P60 rather than take `recommend`'s +10% on top: the lead rests on the 20 Oct imported bookings, and there has been no pickup since. Booking.com guests see 1.2x.
- **P09: hold 176.** It is +12% / P64 on 11 sellable nights. `recommend` says +10%, but zero pickup since 18 Oct does not support it. The PriceLabs recommended base is 167 (`listings.csv`). The formal judgement on the 18 Oct base rises is 26 Oct.
- **P12: hold the 284 base; take no manual cut now.**
  - The reopened 1-7 Nov block is at P42 (-5%). That is already a discount, and it matches what the cancelled guest paid.
  - The near open nights 26-29 Oct are below P25. They are 3-6 days out, at 38% occupancy vs 40% market.
  - The occupancy and last-minute rules will keep stepping prices down as dates approach. A manual cut would stack on top of them.
  - The one lever worth reviewing is the min stay on 1-7 Nov (2 nights) only if no pickup by around 28 Oct. That is a watch item, not a change today.
- **P20:** next 30 is P53 on the PriceLabs price. After the Airbnb new-listing and other discounts (policy), the guest price is well below P25, so price is not the Airbnb barrier (`recommend`: fix-listing; no reviews yet, per policy). For 31-60, `recommend`'s -7% is supported on the PriceLabs basis: 7% booked vs 27% market at P78. Per policy the promotion is why price has not been adjusted, so I'm reporting this, not pushing it.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No pricing advice.

## P15 Bow / Devons Road, 1-bed
**No data.** P15 is in the second PriceLabs/Smoobu account, which is not connected. It has no rows in `prices.csv`, `listings.csv` or `pl_kpis.csv`.

---

Data gaps:
1. **No individual comps for any EAST property.** Competitor Listings is not enabled, there is no Market Dashboard, and Nearby Listings returns percentiles only. There are 0 comp rows: no comp ids, comp median rating, review-count gap, or differentiators (view, balcony, lift, parking, Superhost, cancellation policy).
2. **OTA pages NOT CHECKED.** The proxy refused airbnb.co.uk and booking.com. Same-date comp prices and cleaning-fee treatment are unverified.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` is a 0.0 default.
4. P12: the per-night breakdown of today's 15-22% near-date cut (occupancy rule vs last-minute vs override) is not exposed. The previous value of the 26 Oct-15 Nov override, before 22 Oct 18:47Z, is not in the logs.
5. P20: the cause of the 20-21 Nov block is unknown (not in overrides, reservations or logs). P20 is still missing from `build/properties.py`.
6. PriceLabs refresh times range from 22 Oct 07:55Z to 18:50Z, so no listing has been refreshed today. `prices.csv` has no 23 Oct row.
7. The Nearby Listings tables state no forward window and no cleaning treatment.
8. P15 is in an unconnected account. P07 is not analysed (policy block).
9. Process note: three `get_neighbourhood_data` calls (P04, P09, P12) were sent in parallel against the one-at-a-time rule. All returned 200 with `all_operations_ok = true`.

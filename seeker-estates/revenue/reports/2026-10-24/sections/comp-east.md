# Competitor positioning: EAST batch (D = 2026-10-24)

**Sources.**
- **Market figures:** PriceLabs Nearby Listings bedroom-matched percentiles, pulled 2026-10-24 with read-only `get_neighbourhood_data`, one call at a time. All five returned `all_operations_ok = true`: P01 3320302, P04 3562176, P09 3318172, P12 2699998, P20 3547481. Tables are saved in `data/snapshots/2026-10-24/raw/neighbourhood_<ref>.json`. Five rows were appended to `data/snapshots/2026-10-24/market.csv` under a file lock, after rows from other agents (P05, P06, P08, P10, P11, P13, P14). No existing rows were touched.
- **Comp sources:** `get_neighborhood_data_sources` (3320302) still shows Competitor Listings "not enabled for this account" and Market Dashboards "No Market Dashboard reports available". `get_neighbourhood_data` with `include_competitors=true` (P01) returned no listing rows. So there are **no comp ids** to store or track.
- **OTA pages: NOT CHECKED.** The proxy answered 403 to CONNECT for www.airbnb.co.uk, www.booking.com and www.vrbo.com (`__agentproxy/status`, 06:19Z). WebFetch got ENOTFOUND for airbnb.co.uk and booking.com.
- **`comps.csv`:** 0 rows. The file was created with its header only.
- **Our price:** `pricelabs_price` in `prices.csv` (equal to `smoobu_price` on every row). It excludes taxes; whether it includes cleaning is unknown. PriceLabs `last_refreshed_at` is 23 Oct 08:40-09:15Z for all five listings (`raw/prices_*.json`). `prices.csv` starts 25 Oct.
- **Windows:** next 30 = 25 Oct-23 Nov; 31-60 = 24 Nov-23 Dec. Same method as 23 Oct: only open, bookable nights count as sellable. Left out: blocked nights, handback nights (P01 after 20 Dec plus the 30 Nov-17 Dec gap block; P09 after 26 Nov plus 25 Oct; P12 after 13 Dec) and `unbookable` orphans. Market occupancy is from `pl_kpis.csv`. Percentiles are linear between P25/P50/P75/P90.
- **Quality:** `quality_premium(None, None) = 0.0` for every listing, because our ratings are blank in `listings.csv` and there are no comp ratings. The zero is a default, not evidence.
- **Changes in PriceLabs:** `get_user_logs` (listings 3320302, 3562176, 3318172, 2699998, 3547481, 3288427; 22-24 Oct) has no entries after reyhan@'s two P12 overrides on 22 Oct 18:47Z. **Nobody changed these listings in PriceLabs after the 23 Oct report.**

## Bedroom-matched tables, today vs 23 Oct

| Ref | Band (n) | P25 / P50 / P75 / P90 today | 23 Oct | P50 move |
|---|---|---|---|---|
| P01 Canary Wharf | 2BR (142) | 226 / 274 / 338 / 413 | 226 / 277 / 336 / 412 | -1.1% |
| P04 Barking | 2BR (86) | 142 / 179 / 222 / 282 | 142 / 179 / 222 / 281 | 0% |
| P09 Greenwich | 1BR (127) | 119 / 142 / 172 / 218 | 119 / 142 / 172 / 219 | 0% |
| P12 Mile End | 2BR (121) | 179 / 215 / 257 / 295 | 178 / 211 / 255 / 295 | +1.9% |
| P20 Waterford Court | 2BR (147) | 224 / 266 / 324 / 402 | 225 / 267 / 322 / 399 | -0.4% |

The market is flat again.

## Where we sit (sellable nights only)

| Ref | Next 30: open / avg | Pctl | vs P50 | 31-60: open / avg | Pctl | vs P50 | Booked 0-30 / 0-60 vs mkt | `recommend` 30 / 31-60 |
|---|---|---|---|---|---|---|---|---|
| P01 | 0 (30 booked) | n/a | n/a | 0 (9 booked; rest handback) | n/a | n/a | 100% / 100% vs 33% / 26% | raise-signal (no open nights) |
| P04 | 23 / 163.5 (+25 Oct orphan) | P40 | -8.7% | 15 / 206.4 (excl. 2 Dec orphan at 630) | P66 | +15.3% | 21% / 34% vs 25% / 20% | raise +5% / raise +10% |
| P09 | 9 / 156.0 * | P62 | +9.9% | 0 (booked to 26 Nov; then handback) | n/a | n/a | 69% / 71% vs 37% / 31% * | raise +10% / none |
| P12 | 18 / 213.1 | P49 | -0.9% | 15 / 260.7 | P76 | +21.3% | 40% / 34% vs 40% / 33% | raise +5% / hold |
| P20 | 25 / 270.3 | P52 | +1.6% | 30 / 345.4 | P79 | +29.8% | 11% / 5% vs 35% / 27% | fix-listing / lower -7% |

\* P09 is adjusted for the new 13-15 Nov Airbnb booking (`reservations.csv`, booked 23 Oct). PriceLabs still shows 13 and 14 Nov as open at 163/168, because its refresh (23 Oct 08:51Z) is older than the booking. Unadjusted figures are 11 open / 157.7 / P63 / 62% booked.

`recommend` reasons, verbatim:
- **P04:** "in line with market but priced below what quality supports (P40)" / "booked +14% vs market but priced at P66: under-priced". P04's 31-60 is computed without the 2 Dec orphan; with it, the result is P78 and +5%.
- **P09:** "booked +32% vs market but priced at P62: under-priced" (adjusted).
- **P12:** "in line with market but priced below what quality supports (P49)" / "in line with market at P76".
- **P20:** "behind market -24% while already at P52: conversion/visibility problem, not price" / "behind market -22% at P79: priced above demand".

## Same-date check
Our price from `prices.csv` and its percentile on today's table. Stays: Tue-Thu 27-29 Oct, Fri-Sun 30 Oct-1 Nov, and Mon 23 Nov (D+30). Comp prices for these dates: **NOT CHECKED** (no comp set; OTAs unreachable).

| Ref | Tue 27 Oct | Wed 28 Oct | Fri 30 Oct | Sat 31 Oct | Mon 23 Nov |
|---|---|---|---|---|---|
| P01 | 209 bk <P25 | 209 bk <P25 | 210 bk <P25 | 228 bk P26 | 267 bk P46 |
| P04 | 134 bk <P25 | 137 bk <P25 | 139 bk <P25 | 143 bk P26 | **191 open P57** |
| P09 | **154 open P60** | **154 open P60** | **158 open P63** | **157 open P62** | 169 bk P72 |
| P12 | **160 open <P25** | **167 open <P25** | 181 bk P26 | 182 bk P27 | 240 bk P65 |
| P20 | **240 open P35** (257 on 23 Oct) | 242 bk P36 | 251 bk P41 | **259 open P46** (280) | **325 open P75** (321) |

## Changes since 23 Oct and open items
- **P09: new booking, 13-15 Nov** (Airbnb, 2 nights, £253.21 rental, booked 23 Oct). This is the first P09 pickup since the 176 base went live on 18 Oct.
  - It pays **£126.61/night = P33 of the 1BR band** and 0.77x the PriceLabs price for those nights (162+167 = 329 in the 23 Oct snapshot; 163+168 = 331 after the 23 Oct 08:51Z refresh).
  - A 2-night stay gets no length-of-stay discount, so under policy (`channel_pricing.airbnb_discount`) the ~23% gap is **unexplained**. P09's Smoobu/Airbnb discount rules have not been seen.
  - The size matches the Shepherd's Bush Smoobu Airbnb default rules (~0.76-0.80x, policy) but is not confirmed for P09. Channel section to confirm.
  - Next-30 booked is now 69% vs 37% market.
- **P04 25 Oct (open item):** still a 1-night gap between the 22-25 Oct and 26 Oct-1 Nov Booking.com stays. Min stay 3, PriceLabs `unbookable = 1`, price 141. It is tomorrow, so it will go unsold unless the min stay is set to 1. At stake: at most one night at about £141 (Booking.com shows 1.2x). Corentin's call; I'm not changing anything. P04 open nights 1-6 Nov fell 11-14 (for example 1 Nov 170 to 156) and 22 Nov fell 185 to 157. There are no log entries. The 2 Dec 1-night orphan is now 630 (was 601) at min stay 1, which is 3.5x the 2BR P50.
- **P12 1-7 Nov (open item):** all seven nights are still open and unsold. Today: 177 / 180 / 180 / 185 / 189 / 206 / 210, average **189.6 = P32, -11.8% vs P50** (23 Oct: 201.0, P42). 7 Nov fell 265 to 210 (-21%) as it came within 15 days. That matches the occupancy-based (0-15 days) and last-minute rules described on 23 Oct; it is inferred, since there is no per-night breakdown. 8-13 Nov (242-279, P63-P83) are unchanged. The overrides are unchanged since 22 Oct 18:47Z (`get_user_logs`).
- **P20 20-21 Nov block (open item): cause found.** A Smoobu GET of `/api/reservations` for apartment 3547481 returns a **"Blocked channel" block, arrival 20 Nov, departure 22 Nov, created 21 Oct 20:27** (Smoobu id 160937106). It is a manual Smoobu block, not a PriceLabs override: `get_listing_date_overrides` for 15-25 Nov shows only the -2% / min-stay-3 overrides from 17 Oct. It is not in policy, so its purpose (owner stay or other) is for Corentin to confirm.
  - Separately, P20 open nights on 25 Oct-9 Nov **fell 14-23**, reversing most of yesterday's rise (for example 27 Oct 257 to 240; 4 Nov 312 to 293). There are no log entries, so the move is algorithmic. 22 Nov fell 304 to 279; 22 Dec fell 403 to 370.
- **P01:** booked-night prices moved by -30 to +16. No revenue effect; there are 0 sellable nights before the 20 Dec handback. The 22-26 Apr 2027 cancelled row is only a window effect (Dispatcher).

## Supported positioning (judgement on top of `recommend`)
- **P01: no action.** There are no sellable nights before the handback.
- **P04: hold.** Next 30 is at -8.7% / P40 while booked 21% vs 25% market. `recommend`'s +5% rests on the 0.0 quality default, and the listing has no pickup since the 20 Oct import. For 31-60 (P66, +15%), hold rather than add +10%: the 34% vs 20% lead is entirely the 20 Oct imported Booking.com stays.
- **P09: hold 176.** Next 30 is +9.9% / P62 at 69% booked vs 37%. The new booking proves demand at the current level, but it came in at a guest price of £126.61 (P33), so the evidence for `recommend`'s +10% is pickup at a discounted Airbnb price, not at the listed price. Only 9 sellable nights remain before the 26 Nov handback. The formal judgement on the 18 Oct base rise is 26 Oct.
- **P12: hold the 284 base; no manual change.** Next 30 sits at P49 with occupancy exactly at market (40% vs 40%). `recommend`'s +5% is an edge case: P49 against a 0.50 threshold with a default quality of 0. The near-term rules are already cutting 1-7 Nov to P32. Keep watching whether 1-7 Nov picks up by about 28 Oct, as noted yesterday.
- **P20:** next 30 is at P52 on the PriceLabs price. After the Airbnb new-listing 20% and last-minute 15% (policy `listing_facts.P20`), the guest price is below P25, so price is not the barrier (`recommend`: fix-listing; no reviews yet, per policy). For 31-60, `recommend`'s -7% is supported on the PriceLabs basis: 5% booked vs 27% market at P79. Per policy the promotion is why price has not been adjusted, so I'm reporting this, not pushing it.

## P07 Woolwich, 1-bed
Blocked on purpose (policy). No pricing advice.

## P15 Bow / Devons Road, 1-bed
**No data.** P15 has no PriceLabs listing (`id_map.json`: "no matching PriceLabs listing") and no rows in `prices.csv`, `listings.csv` or `pl_kpis.csv`.

---

Data gaps:
1. **No individual comps for any EAST property** (day 3). Competitor Listings is not enabled, there is no Market Dashboard, and Nearby Listings returns percentiles only. There are 0 comp rows: no comp ids to keep day to day, no comp median rating, review-count gap or differentiators. Enabling Competitor Listings or a Market Dashboard in PriceLabs is the only route while OTAs are blocked.
2. **OTA pages NOT CHECKED.** The proxy returned 403 for airbnb.co.uk, booking.com and vrbo.com. Same-date comp prices and cleaning-fee treatment are unverified.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` is a 0.0 default.
4. PriceLabs data is from 23 Oct about 08:50Z. It has no 24 Oct refresh and does not yet include the P09 13-15 Nov booking.
5. P09 Airbnb discount rules are unknown, so the 0.77x paid-vs-price gap is unexplained.
6. The P12 per-night breakdown of the near-date cuts is not exposed.
7. The purpose of the P20 20-21 Nov Smoobu "Blocked channel" block is unknown. P20 is still missing from `build/properties.py`.
8. The Nearby Listings tables state no forward window and no cleaning treatment.
9. P15 has no PriceLabs/Smoobu data. P07 is not analysed (policy block).

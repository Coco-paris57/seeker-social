# Competitor positioning: EAST batch (D = 2026-10-22)

**Source for every market figure:** PriceLabs **Nearby Listings bedroom-matched percentiles**, pulled 2026-10-22 with read-only `get_neighbourhood_data` calls (summary mode), one listing at a time. Every call returned `all_operations_ok = true`: P01 3320302, P04 3562176, P09 3318172, P12 2699998 and P20 3547481. The tables are saved in `data/snapshots/2026-10-22/raw/neighbourhood_<ref>.json` and the rows are appended to `data/snapshots/2026-10-22/market.csv` with the source on each row.

**These are percentiles, not a comp set.** Competitor Listings is not enabled, so there are no comp ids, comp ratings, review gaps or differentiator checks. OTA pages were **NOT CHECKED**. I added 0 rows to `comps.csv`.

**Method:**
- Our price is the PriceLabs price in `prices.csv`, which equals the Smoobu price on every open night. Prices exclude taxes; whether they include cleaning is unknown.
- Percentiles are linearly interpolated between P25, P50, P75 and P90.
- "Next 30" is 22 Oct to 20 Nov; "31-60" is 21 Nov to 20 Dec.
- **Sellable nights** are open nights only. I left out booked nights, policy blocks, nights after a handback (P01 after 20 Dec, P09 after 26 Nov, P12 after 13 Dec), the P01 gap block 30 Nov-17 Dec (part of the handback block set, per policy), and unbookable orphan nights.
- Our occupancy is booked / (booked + sellable) for 0-30 and 0-60. Market occupancy is PriceLabs next 30 / next 60 from `pl_kpis.csv`.
- **Method change vs 21 Oct:** yesterday's occupancy counted blocked nights as unbooked. Today's leaves out handback nights, as the policy requires.
- `quality_premium(None, None) = 0.0` for every listing, because our ratings are blank in `listings.csv` and there are no comp ratings. That zero is a default, not evidence.
- Setting changes come from `get_user_logs` (listing, 21-22 Oct). Overrides were read live for P04 and P20.

## Bedroom-matched tables, today vs 21 Oct

| Ref | Band (n) | P25 / P50 / P75 / P90 today | 21 Oct | P50 move |
|---|---|---|---|---|
| P01 Canary Wharf | 2BR (143) | 226 / 277 / 333 / 412 | 223 / 270 / 335 / 415 | +2.6% |
| P04 Barking | 2BR (**87**) | 140 / 177 / 222 / 281 | 127 / 165 / 219 / 303 (n=60, Channex listing) | +7.3%, but **a different pool** |
| P09 Greenwich | 1BR (127) | 118 / 142 / 172 / 223 | 116 / 141 / 169 / 216 | +0.7% |
| P12 Mile End | 2BR (120) | 176 / 211 / 255 / 295 | 176 / 211 / 250 / 292 | 0% |
| P20 Waterford Court | 2BR (148) | 225 / 266 / 322 / 398 | 220 / 260 / 321 / 401 | +2.3% |

**P04:** yesterday's table came from the Channex listing. The Channex listing's sync was switched **OFF on 21 Oct at 09:06Z** and it now shows as a deleted listing. Today's table comes from Smoobu 3562176, the only P04 listing (policy). Its pool is larger (n 87 vs 60), so **the day-on-day change for P04 is not like for like.**

## Where we sit (sellable nights only)

| Ref | Next 30: open / avg | Pctl (on 21 Oct table) | vs P50 | 31-60: open / avg | Pctl | vs P50 | Booked 0-30 / 0-60 vs mkt | `recommend` 30 / 31-60 |
|---|---|---|---|---|---|---|---|---|
| P01 | **0 sellable** (29 booked) | n/a | n/a | **0 sellable** (12 booked, 18 in the handback gap block) | n/a | n/a | 100% / 100% vs 32% / 25% | no open nights |
| P04 | 20 / 166.6 | **P43** (P51) | -5.9% | 18 / 199.0, excl. the 2 Dec orphan (612, a +200% override); 220.7 with it | P62 | +12.4% | 29% / 33% vs 25% / 20% | raise +5% / raise +10% |
| P09 | 11 / 157.3 | P63 (P65) | +10.8% | **0 sellable** (21-26 Nov booked; 27 Nov+ handback) | n/a | n/a | 61% / 68% vs 37% / 30% | raise +10% / none |
| P12 | 11 / 240.7 | P67 (P69) | +14.1% | 15 / 275.3 (21 Nov-13 Dec; 14 Dec+ handback) | P83 | +30.5% | 62% / 50% vs 40% / 32% | raise +10% / raise +5% |
| P20 | 24 / 266.5 | **P50** (P53) | +0.2% | 30 / 332.5 | P77 | +25.0% | **17% / 8% vs 34% / 27%** | fix-listing / lower -7% |

**P04 orphan night:** 25 Oct is `unbookable` (a 1-night gap with min-stay 3) and is excluded.

`recommend` reasons, verbatim:
- **P04:** "in line with market but priced below what quality supports (P43)" / "booked +13% vs market but priced at P62: under-priced".
- **P09:** "booked +24% vs market but priced at P63: under-priced".
- **P12:** "booked +22% vs market but priced at P67: under-priced" / "booked +18% vs market at P83: test a further step up".
- **P20:** "behind market -17% while already at P50: conversion/visibility problem, not price" / "behind market -19% at P77: priced above demand".

## Same-date check
Our PriceLabs price, status and percentile against today's table; 21 Oct price in brackets. Stay dates:
- Fri-Sun 23-25 Oct
- Tue-Thu 27-29 Oct
- Sat 21 Nov (D+30)
- Fri 20 Nov, for continuity with yesterday

`bk` = booked, `open` = open.

| Ref | Fri 23 Oct | Sat 24 Oct | Tue 27 Oct | Wed 28 Oct | Thu 29 Oct | Fri 20 Nov | Sat 21 Nov |
|---|---|---|---|---|---|---|---|
| P01 | 216 bk <P25 (222) | 233 bk P28 (234) | 220 bk <P25 (215) | 212 bk <P25 (218) | 221 bk <P25 (227) | 273 bk P48 (272) | 295 bk P58 (297) |
| P04 | 156 bk P36 | 162 bk P40 | 145 bk P28 | 150 bk P32 | 154 bk P34 | **170 open P45** (Smoobu calendar 181) | **205 open P66** (185) |
| P09 | 153 bk P59 (156) | 178 bk P77 (179) | **161 open P66** (158) | **151 open P58** (157) | **150 open P57** (152) | 187 bk P79 (188) | 193 bk P81 (195) |
| P12 | 177 bk P26 (178) | 189 bk P34 (187) | **193 open P37** (198) | **201 open P43** (206) | **206 open P46** (211) | 286 bk P87 (277) | 272 bk P81 (275) |
| P20 | 234 bk P30 (248) | 251 bk P41 (267) | **239 open P34** (247) | 234 **bk (new)** P30 (252) | 248 **bk (new)** P39 (268) | **299 open P65** (315) | **337 open P78** (330) |

**P04 bracketed prices:** for 20-21 Nov, yesterday's figure is the Smoobu calendar price, which came from 3562176. The 23-29 Oct nights have no comparable 3562176 price from yesterday.

## What changed since 21 Oct

**P20: new Airbnb booking 28-31 Oct (3 nights), booked 21 Oct, £529.92 room + £150 cleaning.**
- It shows as confirmed in `reservations.csv` and is the only EAST reservation change overnight. It is **not yet in PriceLabs**: the listing was last refreshed 21 Oct at 08:52Z, and the live `get_listing_prices` call still shows 28-30 Oct open. I counted those nights as booked.
- Effect: next-30 booked goes from 7% (2/29 per PriceLabs) to **17% (5/29)**, vs 34% market. It is still 17 points behind, so `recommend` still says fix-listing.
- **Paid vs price:** the stay paid **£176.64/night**, which is **below the 2BR P25 (225)**.
  - PriceLabs price for those nights: 234 / 248 / 254 (avg 245.3) in the 21 Oct 08:52Z push, or 252 / 268 / 277 (avg 265.7) in the 20 Oct push. The booking time is unknown, so either may have applied.
  - With the 20% Airbnb new-listing promotion (policy), expected room revenue is about £196 or £213/night. That leaves a further **-10% or -17%** unexplained.
  - There is no length-of-stay discount at 3 nights. The 21 Oct Smoobu Airbnb pricing-rules screenshots cover only the Shepherd's Bush listings, so P20's rules are unknown. Booked on 21 Oct, the day the manual promotions were removed, so this falls in the monitoring window.
- **Prices:** open-night prices moved on 49 dates. They fell on near dates (25 Oct 259 to 237; 31 Oct 285 to 265; 1-4 Nov down 9-21; 20 Nov 315 to 299) and rose slightly on most mid-Nov nights.
  - The overrides are unchanged: -4% on 22-31 Oct and -2% on 1-30 Nov, last updated 17 Oct at 20:50Z, plus min-stay-only overrides on 27-31 Dec.
  - There are no P20 log entries. The moves are algorithmic.
  - Next-30 average 267.8 to 266.5 (the three cheapest nights are now booked); P53 to P50.

**P04: now a single PriceLabs listing (Smoobu 3562176).**
- The Channex listing's sync was turned OFF on 21 Oct at 09:06Z (by reyhan@). This removes yesterday's two-listing conflict. On 1 Nov, the Channex orphan price of 475 is gone; 3562176 shows **175 open**. On 2-6 Nov, 3562176 shows the nights **open** (187 / 192 / 185 / 183 / 160), which matches the cancelled Smoobu reservation.
- 3562176's open-night prices **rose about 7-20 vs yesterday's Smoobu calendar** on 7-24 Nov (for example 7 Nov 149 to 163; 10 Nov 137 to 160; 18 Nov 139 to 158), and by 2-14 on 6-19 Dec.
  - The live overrides are the same as when they were copied on 20 Oct: -5% on 1-24 Nov (updated 20 Oct 11:29Z), -3% on 6-21 Dec, and +200% with a 1-night minimum on 2 Dec. No new P04 log entry, so these are algorithmic moves; the trigger is not visible in this data.
- P04 had no new bookings (`pickup_7d` = 0).

**P01:**
- **There are no sellable nights through the handback.** 22 Oct-29 Nov is booked, including the 30-night Airbnb stay from 31 Oct. 30 Nov-17 Dec is the handback gap block (policy, so not demand and not a finding). 18-20 Dec is booked.
- Yesterday's "block cause unknown" is now **resolved by policy**.
- Booked-night PriceLabs prices moved by ±1-17 (algorithmic). This makes no revenue difference.

**P09:**
- The 27 Nov+ block is the handback (last night 26 Nov), and 25 Oct is blocked per the policy note. Both are resolved by policy.
- 11 sellable nights are left: 26-31 Oct and 10-14 Nov. Prices moved by -6 to +23 (10 Nov 138 to 161). Next-30 is P63 (P65 yesterday on the old table).
- **There are still no bookings since the 176 base went live on 18 Oct** (`pickup_7d` = 0). The PriceLabs recommended base is 167.

**P12:**
- Near-date prices fell by 5 (27 Oct 198 to 193; 29 Oct 211 to 206). 9-10 Nov rose (223 to 241; 234 to 242).
- 31-60 is P83 (P84 yesterday). 14 Dec+ is the handback and is excluded.
- There were no new bookings.
- `kpi_pack` pace: 30-day revenue +15.6% / -4 nights; 90-day **-30.6% revenue / -13 nights** vs the same time last year. The 90-day window has rolled forward a day, so this is not strictly comparable with yesterday's -31.9% / -14.
- 3 nights differ from Smoobu by 3 (26, 28 and 29 Oct; Smoobu is lower).

**Settings:** the 21-22 Oct listing logs have no entries for P01, P09, P12 or P20. The only EAST entry is the P04 Channex sync-off.

## Supported positioning (judgement on top of `recommend`)
- **P01: no action.** There are 0 sellable nights before the 20 Dec handback, so no price move can earn anything.
- **P04: about 0% to +5% vs the 2BR P50 for next 30 is supported (now -5.9%, P43).** The lead over market is small (+4 points), so `recommend`'s +5% is the ceiling, not +10%. The documented lever is the extra **-5% override on 1-24 Nov**, which on its own accounts for that gap.
  - 31-60 (6-19 Dec) is +12% / P62, excluding the orphan night. Hold rather than take `recommend`'s +10%: the 0-60 lead rests on bookings imported on 20 Oct, and there has been no pickup since.
  - Booking.com guests see 1.2x these prices before promotions (policy).
- **P09: hold 176.** For its 11 sellable nights, +11% vs the 1BR P50 (P63) is in the supported range. `recommend` says +10%, but there has been zero pickup in 4 days at the new base and PriceLabs recommends 167, so a further rise is not supported yet.
- **P12: hold 284.** Next 30 is +14% / P67, which fits a +22-point booking lead. 31-60 is already +31% / P83. Do not take the "+5% test": 90-day pace is -30.6% and there were no bookings overnight.
- **P20:** next 30 is at P50 (+0%) on the PriceLabs price. With the 20% new-listing promotion, the guest-facing Airbnb price averages about 213, below P25. The new booking paid 177, also below P25. Booking.com guests see about 320 (1.2x), roughly P74.
  - **On Airbnb, price is not the barrier at P50.** The 17-point gap fits a new listing with no reviews (`recommend`: fix-listing).
  - For 31-60, `recommend`'s -7% (332 to about 309) is supported on the PriceLabs basis: 0% booked vs 27% market at P77.
  - Per policy, the promotion is why the price has not been adjusted, so I'm reporting this, not pushing it. It has still **not been applied**.
  - The 350 base and 220 minimum are owner settings.

## P07 Woolwich 1-bed (3288427 smoobu)
Blocked on purpose (policy). No pricing advice and no neighbourhood pull. Excluded from occupancy and opportunity findings.

## P15 Bow / Devons Road 1-bed
**No data.** P15 is in the second PriceLabs/Smoobu account, which is not connected. It has no rows in `prices.csv`, `listings.csv` or `pl_kpis.csv`, and `kpi_pack` reads "No priced PriceLabs listing mapped". No analysis.

---

Data gaps:
1. **No individual comps.** Competitor Listings is not enabled, and Nearby Listings gives percentiles only. `comps.csv` has 0 EAST rows: no comp ids, comp median rating, review gap or differentiators (view, balcony, lift, parking, Superhost, cancellation policy).
2. OTA pages were NOT CHECKED. Comp cleaning fees and our own guest-facing prices on Airbnb and Booking.com are not verified.
3. Our ratings and review counts are blank in `listings.csv`, so `quality_premium` is 0.0 by default. P20 has no reviews (policy), which `quality_premium` cannot express.
4. The Nearby Listings tables state no forward window and no cleaning treatment, and they come from a summary-only pull (no daily P50).
5. PriceLabs has not refreshed P20 since 21 Oct 08:52Z, so the 28-31 Oct booking is missing there and its occupancy and KPIs understate it. The booking time is unknown, so the price in force when it was made is unknown.
6. P20's Smoobu Airbnb pricing rules are unknown, and so are the scope and end date of its 20% new-listing promotion. That leaves a -10% to -17% unexplained gap on the 28-31 Oct booking.
7. The P04 comp pool changed (Channex n=60 to Smoobu 3562176 n=87), so P04's day-on-day position is not like for like. The cause of the 7-20 rise in 3562176 prices is not visible.
8. P20 is still missing from `build/properties.py` (sleeps and amenities unknown beyond the policy title "Parking & Views").
9. P15 is in an unconnected account. P07 is not analysed (policy block).

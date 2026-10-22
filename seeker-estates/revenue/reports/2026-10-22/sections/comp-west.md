# Competitor positioning: WEST + HERTS (D = 2026-10-22)

**Sources.** `data/policy.json` read first. Read-only PriceLabs calls on 2026-10-22, one at a time:
- `get_neighbourhood_data` for 3064856 (detail mode, prices + occupancy) -> `data/snapshots/2026-10-22/raw/neighbourhood_P13.json`; for 3318177 (summary mode) -> `raw/neighbourhood_P10.json` (summary_table excerpt).
- `get_listing_date_overrides` 3064856; `get_user_logs` 21-22 Oct for 3064856, 3090701, 3318177 (0 entries); `get_listing_prices` 3090701 (23 Oct-21 Dec); `get_listings` search for P16/P18/P19 (0 results).

Our prices: `data/snapshots/2026-10-22/prices.csv` (PriceLabs = Smoobu on every open night). PriceLabs last refreshed 3064856 at 2026-10-21 10:13Z and 3090701 at 09:28Z, i.e. after yesterday's snapshot.

**Every benchmark below is a PriceLabs Nearby Listings (NL) percentile, not a comp median.** Competitor Listings is not enabled and there is no Market Dashboard (`market_dashboard_compsets` = []). So: no individual comps, no comp rating / review-count gap / Superhost / cancellation comparison, `quality_premium` = 0.0, and **0 rows written to comps.csv**. Live OTA pages: **NOT CHECKED**. NL prices are Airbnb-derived, host-only fee: cleaning excluded, tax 0; our PriceLabs price also excludes cleaning.

**Method (unchanged from 21 Oct).** Position = linear interpolation between P25/P50/P75/P90 of the bedroom-matched summary_table (below P25 extrapolated on the P25-P50 slope). Sellable nights = nights open on the calendar; nights blocked on one P13 listing because the twin is booked count as booked (policy). Next 30 = 23 Oct-21 Nov; nights 31-60 = 22 Nov-21 Dec. Yesterday's figures are recomputed on the same D+1..D+30 basis for comparison.

## P02 Notting Hill, P03 Bayswater
Blocked on purpose (policy). 0 sellable nights in the next 60 (P02: 5 booked, 54 blocked, 1 closed; P03: 60 closed). No positioning or advice.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat)
2BR summary n=116: **P25 201 / P50 244 / P75 302 / P90 373** (21 Oct: 201/240/301/372, n=117). P50 +1.7%.

| Stay date | Fri 23 Oct | Sat 24 Oct | Tue 27 Oct | Wed 28 Oct | Thu 29 Oct | Wed 18 Nov | Thu 19 Nov | Fri 20 Nov | Sat 21 Nov (D+30) |
|---|---|---|---|---|---|---|---|---|---|
| NL daily, 2-3BR band n=150 (not comps): P25/P50/P75/P90 | 213/258/320/390 | 212/255/332/391 | 207/247/313/384 | 206/248/311/372 | 203/250/308/373 | 205/246/292/386 | 209/257/313/389 | 215/265/330/388 | 211/256/309/386 |
| Band market occ % | 64.1 | 69.7 | 55.3 | 53.3 | 48.9 | 22.0 | 23.6 | 32.0 | 32.0 |
| 3064856 price / status | 140 booked | 152 booked | 164 twin-booked | 169 twin-booked | 174 twin-booked | **213 open** | **199 open** | **218 open** | **236 open** |
| 3090701 price | 155 | 168 | 183 booked | 187 booked | 193 booked | 225 | 210 | 230 | 236 |
| 21 Oct band P25/P50 | 202/241 | 199/239 | - | - | - | 201/235 | 203/250 | 207/249 | - |

The daily band moved up 4-7% on the near dates overnight (Fri 23 Oct P50 241 -> 258).

| Horizon | Booked (combined) | Market occ | Avg open price (3064856) | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30, 23 Oct-21 Nov | 14/30 = 46.7% (kpi 48.3% on 29 n) | 40% kpi; 35.8% band avg | **£200.8 on 16 nights** | **-17.7%** | **P24.9** (21 Oct same basis: £202.2, P25.8) | raise +5% (kpi 40%: "in line... below what quality supports (P25)"); raise +10% (band 35.8%: "booked +11%... under-priced") |
| 11 nights with the +10% DSO | all open | - | £204.4 (21 Oct £207.4) | -16.2% | P27 (P29) | - |
| 6 open nights within 14 days (25-26 Oct, 31 Oct-3 Nov) | - | - | £181.5 list | -25.6% | P14 | - |
| Nights 31-60, 22 Nov-21 Dec | 8/30 = 26.7% | 29.2% band avg; 35% kpi 60-day | £239.2 on 22 nights (£234.2 ex 1 Dec) | -2.0% (-4.0%) | P47 (P44 ex 1 Dec) | raise +5% (band); fix-listing 0% (kpi 35%) |

**Supported positioning: hold today at about -18% vs 2BR P50 (P25) for the next 30; the evidence supports moving toward about -10% (about P36, £220) only after post-21 Oct pickup.** One line: booked ahead of market (+7 to +11 pts) while at P25 supports more price, but guest-facing totals changed on 21 Oct (Airbnb cleaning £100 -> £150, manual Airbnb promotions removed and replaced by -10% last-minute within 14 days, Booking.com Domestic/EEA/Early Booker off, Last Minute widened to 0-30 days) and no booking has been made since, so the price response is not yet observable. Nights 31-60: **hold** at about median (P44-47); the call flips between raise and fix-listing on the market-occupancy source.

Guest-facing note (arithmetic from policy rules, not an OTA check): the Smoobu Airbnb last-minute rule (-10% within 14 days) applies to the 6 near open nights, putting the Airbnb nightly at about £163 = **about P3 of 2BR** before cleaning. Policy's 21 Oct check "31 Oct-2 Nov, 4 guests, £488" equals (197 + 179) x 0.9 + £150 on today's 3064856 prices, i.e. consistent with the rule being applied; which twin was checked is not recorded.

**Changes since 21 Oct**
- **No PriceLabs setting changes**: 0 log entries 21-22 Oct; overrides identical (+10% on the 11 nights, last updated 20 Oct 09:29Z; 1 Dec +50% min-stay 1, intentional per policy, open at £344 = P84). Base 235.
- **Algorithm drift after the 21 Oct refresh**: open near nights fell £6-9 (25 Oct 162 -> 153, 26 Oct 168 -> 159, 31 Oct 204 -> 197, 1 Nov 186 -> 179, 2 Nov 214 -> 208, 3 Nov 200 -> 193); 20 Nov 232 -> 218; later nights within ±£2 except 20 Dec 247 -> 237. Net: next-30 position P25.8 -> P24.9, gap to P50 -15.8% -> -17.7%.
- **No new bookings or cancellations** (reservations identical to 21 Oct). The 7-day pickup (3 bookings, 12 nights) is the 16 and 18 Oct bookings, before the +10% and the 21 Oct channel changes.
- **`user_price` now equals `price` on 3064856** including the DSO nights (31 Oct 197/197, 1 Dec 344/344), so yesterday's "Your Price excludes DSOs" gap no longer shows on 3064856. On 3090701 they still differ by up to about £14 (e.g. 8 Nov price 229, user_price 241).
- **Twin gap on open nights**: next 30 3090701 is **+7.0%** over 3064856 (21 Oct +8.7%); +11.0% up to 3 Nov (was about 5.5%), +4.9% from 8 Nov (was about 11%). **Nights 22 Nov-21 Dec: PriceLabs prices are identical on all 22 open nights (gap 0.0%).** Policy says the two Airbnb listings must keep slightly different prices; whether Airbnb displays them identically depends on Smoobu rules, which were made the same on 21 Oct. Not compared on 21 Oct (no 3090701 price file for 31-60 yesterday), so whether this is new is unknown.
- **Channel level (dispatcher / policy)**: Airbnb and Booking.com now priced level after 21 Oct changes; consistent with policy's £488 vs £490 check. No OTA re-check today.
- Differentiators (no comp data to price them): top-floor private terrace, lift to 3rd floor, Booking.com 8.4 (15 reviews), Airbnb 4.63 (8 reviews) on one twin (policy). Not usable for `quality_premium` without comp ratings.

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
1BR summary n=122: **P25 113 / P50 132 / P75 160 / P90 194** (21 Oct: 113/130/158/192, n=121).
- **Sellable nights before handback: 0.** 23 Oct-18 Nov are booked (one Airbnb stay 18 Oct-19 Nov, booked 9 Oct). From 19 Nov the calendar is closed: **this is the handback block (last night 18 Nov, policy)**, which resolves yesterday's "block reason unknown". Nothing is proposed for nights after 18 Nov.
- **Supported positioning: none** (nothing to price). `recommend` is not applied: kpi "raise-signal +63% vs market" rests on one pre-booked 32-night stay.
- Realised rental about £102/night excl. cleaning, about P10 of 1BR: 28+ night stay, 20% monthly discount applies; the remainder was the manual Airbnb promotion in place when booked (9 Oct, before the 21 Oct removal). Not flagged.
- Changes since 21 Oct: no bookings, cancellations or PriceLabs log entries; list prices on booked/blocked nights moved by the algorithm (e.g. 23 Oct 155 -> 148), irrelevant.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
Unconnected PriceLabs account, not in Smoobu (policy / dispatcher). `get_listings` search returned 0. **NOT CHECKED**: no percentiles, prices or positioning.

## Data gaps:
1. No individual comps: Competitor Listings not enabled, no Market Dashboard; NL percentiles only. No comp median, comp rating, review gap, Superhost or cancellation comparison; 0 comps.csv rows.
2. Live OTA prices: NOT CHECKED. The P13 Airbnb guest-facing figures are arithmetic from policy rules.
3. Our ratings and review counts are empty in listings.csv; quality_premium = 0.
4. summary_table horizon unstated; daily bands not bedroom-matched (P13 2-3BR, n=150). Positions are interpolated.
5. P13 market occupancy depends on source (40% kpi vs 35.8% band next 30; 35% kpi 60-day vs 29.2% band for 31-60); `recommend` changes with it.
6. P13 twins identical in PriceLabs on all 22 open nights 22 Nov-21 Dec; Airbnb display not checked; yesterday's comparison not available.
7. P13 Twin mapping (which Airbnb listing = which Smoobu id) still "likely", unconfirmed (policy).
8. 3090701 `user_price` differs from `price` by up to about £14; which value each channel shows is unverified.
9. P13 Vrbo listing 12037152 not analysed.
10. P16, P18, P19: PriceLabs account not connected, not in Smoobu.
11. `data/snapshots/2026-10-22/market.csv` did not exist; created with the schema header before appending.

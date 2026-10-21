# Competitor positioning: WEST + HERTS (D = 2026-10-21)

**Sources.** I read `data/policy.json` first. PriceLabs read-only calls made on 2026-10-21:
- `get_neighbourhood_data` (detail mode, Nearby Listings source, Airbnb, GBP, host-only fee, so cleaning is excluded and tax is 0) for 3064856 and 3318177. Saved to `data/snapshots/2026-10-21/raw/neighbourhood_P13.json` and `neighbourhood_P10.json`.
- `get_listing_prices` for the P13 twin 3090701 and for 3318177.
- `get_listing_date_overrides` for 3064856.
- `get_user_logs` for 19–21 Oct.
- `get_pms_reservations`: stays 18 Nov–21 Dec for 3318177, and all bookings made 19–21 Oct.
- `get_listings` for P16/P18/P19.

Our prices come from `data/snapshots/2026-10-21/prices.csv`. PriceLabs `price` equals Smoobu. PriceLabs last refreshed 3064856 at 2026-10-20 09:30:51Z, 3090701 at 09:30:50Z and 3318177 at 08:41:41Z, so the P13 prices already include the 20 Oct +10%.

**Live OTA checks (Airbnb, Booking.com, Vrbo): NOT CHECKED.** OTA sites are blocked from this environment.

**Individual comps: none.** Competitor Listings is not enabled and there is no Market Dashboard. Every figure below is a **PriceLabs Nearby Listings percentile, not a comp median**. That means:
- There is no comp rating, review-count gap, Superhost or cancellation comparison.
- Our ratings are empty in listings.csv, so `quality_premium` = **0.0**.
- 0 rows were written to comps.csv.
- P13 and P10 rows were appended to `data/snapshots/2026-10-21/market.csv`.

**Method.** Positioning uses the **bedroom-matched summary_table**. The daily series mixes bedroom bands and is context only. Positions are linear interpolations between P25, P50, P75 and P90; below P25 I extrapolate on the P25–P50 slope. Stay dates are the same as yesterday (Wed 21 Oct, Fri 23 and Sat 24 Oct, Wed 18 Nov, Thu 19 Nov), plus the new D+30, Fri 20 Nov.

## P02 Notting Hill, P03 Bayswater
Both are blocked on purpose (policy.json). No positioning or pricing advice. Blocked nights are not counted as demand or as lost revenue.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 are one flat)
2BR summary, n=117: **P25 201 / P50 240 / P75 301 / P90 372**. On 20 Oct it was 187 / 228 / 298 / 367 (n=116), so the market moved up overnight: **P25 +7.5%, P50 +5.3%**.

| NL daily, 2–3BR band n=151 (not comps) | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov | Thu 19 Nov | Fri 20 Nov |
|---|---|---|---|---|---|---|
| P25 / P50 / P75 / P90 | 198/232/311/380 | 202/241/310/382 | 199/239/322/385 | 201/235/285/370 | 203/250/312/384 | 207/249/321/384 |
| Market occupancy % | 56.3 | 62.7 | 68.3 | 21.9 | 24.2 | 32.5 |
| Our price (3064856) | booked (twin stay 16–22 Oct) | 146, booked | 158, booked | **214, open (+10% DSO)** | **200, open** | **232, open** |

| Horizon | Booked (combined) | Market | Avg open list | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30 (22 Oct–19 Nov, 29 nights) | 14/29, 48.3% | 41% (kpi), 35.5% (band avg) | **£200.2 on 15 nights** | **-16.6%** | **P24.5** | **raise +5%**, "in line with market but priced below what quality supports (P24)". On the band average: raise +10% ("booked +13% vs market"). |
| The 11 nights with the +10% override (31 Oct–3 Nov, 8–12 Nov, 17–18 Nov) | all open | – | **£207.4** (was £187.1 on 20 Oct, +10.9%) | -13.6% | **P29** (P35 on the daily band) | – |
| Nights 31–60 (20 Nov–19 Dec) | 8/30, 26.7% | 28.4% (band avg), 35% (kpi, 60-day) | £238.1 on 22 nights; £233.1 excluding 1 Dec | -0.8% (-2.9% excluding 1 Dec) | P49 (P46 excluding 1 Dec) | **raise +5%** against the band average, "in line… below what quality supports (P49)". **fix-listing 0%** against the kpi 35%. |

**Where P13 sits after the +10%.** The override is live on both listings: 11 DSOs at +10% on 3064856 and the same 11 copied to 3090701, logged 20 Oct 09:29Z by reyhan@. Effect on those 11 nights:
- The list price rose from £187.1 to £207.4.
- Against yesterday's percentiles that would have been about P37. The 2BR distribution rose the same day, so the position is only **P25 → P29**.
- Across all open nights in the next 30, the position is **unchanged at about P24–25** (P25.2 → P24.5) and the gap to P50 is **-16.6%** (yesterday -17.8% on the same basis). The +10% was absorbed by the market move.
- The 4 open nights without the override are still the cheapest: 22 Oct £192, 25 Oct £162, 26 Oct £168, 19 Nov £200. Three of them are short-notice (D+1 to D+5).

**Supported positioning: about -10% to -12% vs 2BR P50 for the next 30, with no further action today.**
- Reasoning: P13 is booked ahead of the market (48% vs 41%) while priced at P24. Its 4th-floor terrace and lift (to the 3rd floor) support at least the median.
- `recommend` gives +5% or +10% depending on the market-occupancy source.
- The +10% is one day old and there has been no pickup since. Re-test after pickup data on the overridden nights, not before.
- Nights 31–60 sit at about P46–49, which is roughly median. **Hold.** The call is fragile: it flips to fix-listing if the kpi 35% market figure is used.

**Changes since 20 Oct:**
- **+10% applied and verified** (see above). This closes yesterday's "not applied" item.
- **New: 1 Dec is open at £344, about P84.** A +50% DSO with min-stay 1 was added on 20 Oct 09:30Z by reyhan@ on both listings (logged). 1 Dec is a single night between the stays of 28 Nov–1 Dec and 2–7 Dec. This DSO is not in policy.json `price_changes`. I am reporting it as a fact only; its intent is not recorded.
- **No new bookings and no cancellations.** P10/P13 reservations are identical to 20 Oct, and PriceLabs shows no booking made 19–21 Oct for these listings. kpi `pickup_7d` (3 bookings, 12 nights) covers 14–20 Oct, so the bookings of 16 and 18 Oct were already in yesterday's data.
- The base is still 235. The algorithm moved some near dates down: 22 Oct 199 → 192, 25 Oct 170 → 162, 19 Nov 212 → 200.
- **Twin gap persists.** On the 15 nights open on 3064856, 3090701 lists **8.7% higher** (£217.5 vs £200.2). The gap is about 5.5% up to 3 Nov and about 11% from 8 Nov. Guests can still book the same flat at two prices.
- **PriceLabs "Your Price" (`user_price`) does not include the 20 Oct DSOs.** For example, 31 Oct shows `user_price` 183 against `price` 204, and 1 Dec 221 against 344. The Smoobu price matches `price`, per the kpi check.
- **Realised rates are unchanged** (no new bookings). They sit below 2BR P25. All stays are under 7 nights, so the length-of-stay discounts do not apply. Per policy, the Airbnb paid-vs-price gap is explained by the active Airbnb discount.

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
1BR summary, n=121: **P25 113 / P50 130 / P75 158 / P90 192**. On 20 Oct it was 111 / 129 / 155 / 186.

| NL daily, Studio–2BR band n=176 (not comps) | Wed 21 Oct | Fri 23 Oct | Sat 24 Oct | Wed 18 Nov | Thu 19 Nov | Fri 20 Nov |
|---|---|---|---|---|---|---|
| P25 / P50 / P75 / P90 | 119/146/176/213 | 121/149/184/231 | 123/150/182/231 | 113/139/172/203 | 115/141/175/209 | 126/147/180/213 |
| Market occupancy % | 52.3 | 47.8 | 51.3 | 23.9 | 22.6 | 25.4 |
| Our price | booked | 155 booked | 165 booked | 167 booked | **161 BLOCKED** | **169 BLOCKED** |

- **New since 20 Oct: blocked from 19 Nov 2026 to 31 Aug 2028.**
  - The dispatcher checked the Smoobu API: the block was created in Smoobu on 19 Oct, the reason is unknown and it is awaiting Corentin.
  - PriceLabs shows "Blocked" from 19 Nov onward; I checked through 21 Dec. Yesterday these nights were open, at £138 on 19 Nov and an average of £146.7.
  - No reservation explains it: Smoobu reservations are unchanged and `get_pms_reservations` returns no stay from 18 Nov to 21 Dec.
  - P10 is not in policy `intentional_blocks`, and there is no PriceLabs log entry.
  - **Do not count these nights as lost revenue or as demand until Corentin confirms the reason.**
  - Result: P10 has **0 bookable nights in the next 60 days**, and none until the block ends.
- **Next 30 (22 Oct–18 Nov):** 100% booked against a 31% market, all from one Airbnb stay (18 Oct–19 Nov, 32 nights, booked 9 Oct).
  - Rental excluding cleaning is £102.06/night (**about P9 of 1BR**). PriceLabs booked ADR is £105.96 (about P15).
  - This is a 28+ night stay, so the 20% monthly discount applies (policy). The rest of the paid-vs-price gap (kpi -19% after length-of-stay discounts) is explained by the active Airbnb discount per policy.
  - This is not evidence of demand at list price.
- `recommend(1.0, 0.31, P78 on booked-night list £163.7)` returns raise +5%. **That is not actionable**: there are no open nights to price, and the list price on booked nights does not position anything.
- **Supported positioning: none.** P10 is positioned only on open nights, and it has none: 22 Oct–18 Nov are booked and everything from 19 Nov is blocked.
  - **Yesterday's 2 Nov re-test is withdrawn.** It is moot because the dates it covered are blocked.
  - For the record only (not advice): PriceLabs list prices on the blocked nights rose about 17% overnight, to an average of £173.7 for 19 Nov–18 Dec (about P82). The algorithm did this; no setting change was logged.
- Differentiators (unchanged): ground floor, lift, modern, no parking, Wembley 2 stops, Piccadilly line to Heathrow. None of these justifies sitting above P75.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
These are in a PriceLabs account that is not connected. `get_listings` returned 0 results today, and they are not in Smoobu. **NOT CHECKED: no percentiles, prices or positioning.**

## Data gaps:
1. No individual comps: Competitor Listings is not enabled, there is no Market Dashboard, and Nearby Listings gives aggregates only. So there is no comp median, comp rating, review-count gap, Superhost or cancellation comparison, and 0 comps.csv rows.
2. Live OTA prices: NOT CHECKED (blocked).
3. Our ratings and review counts are empty in listings.csv, so quality_premium = 0.
4. The summary_table horizon is unstated and it moves a lot day to day: P13 2BR P25 went 187 → 201 overnight. The daily bands are not bedroom-matched (P13 is 2–3BR, P10 is Studio–2BR). All positions are interpolated.
5. P13 market occupancy depends on the source: 41% kpi next-30, 35.5% band average next-30, 35% kpi 60-day, 28.4% band average for nights 31–60. The `recommend` action changes with the source.
6. P10 Smoobu block from 19 Nov 2026 to 31 Aug 2028 (created 19 Oct, per the dispatcher's Smoobu API check): reason unknown, awaiting Corentin. It is not in policy, and there is no reservation or PriceLabs log behind it.
7. P13 1 Dec +50% DSO: intent not recorded in policy.json.
8. PriceLabs `user_price` ("Your Price") excludes the 20 Oct P13 DSOs. Which value each channel displays is unverified, because OTAs were not checked.
9. P13 Vrbo listing 12037152 was not analysed.
10. P16, P18, P19: PriceLabs account not connected and not in Smoobu.

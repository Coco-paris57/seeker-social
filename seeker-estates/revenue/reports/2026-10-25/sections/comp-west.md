# Competitor positioning: WEST + HERTS (D = 2026-10-25)

**Sources.** I read `data/policy.json` first. I made these read-only PriceLabs calls on 2026-10-25, one at a time except for the three `get_listings` searches:
- `get_neighbourhood_data` 3064856 in detail mode (prices and competitors), saved verbatim as `data/snapshots/2026-10-25/raw/neighbourhood_P13.json`.
- `get_neighbourhood_data` 3318177 in summary mode. The numbers are in market.csv only.
- `get_user_logs` for 3064856, 3090701 and 3318177, 23-25 Oct.
- `get_listing_date_overrides` for 3064856, 25 Oct-31 Dec.
- `get_customizations` for 3064856 (last-minute, booking factor, occupancy, far-out).
- `get_listings` searches for Little Venice, Fulham, Langley and Venice. All returned 0.

Our prices come from `raw/prices_3064856.json` (refreshed 2026-10-24T21:18Z) and `raw/prices_3090701.json` (21:15Z). Both start on 26 Oct, so there is no 25 Oct row. KPIs come from `pl_kpis.csv` and reservations from `reservations.csv`.

**Live OTA pages: NOT CHECKED.** WebFetch to airbnb.co.uk returned ENOTFOUND, and the permission classifier denied a direct curl to the Airbnb search page. **0 comp rows.** `comps.csv` was created with its header only. That means there is no comp median, comp rating, review-count gap, Superhost or cancellation comparison. Every benchmark below is a **PriceLabs Nearby Listings (NL) percentile, not a comp median**. NL is Airbnb-derived, "Host-only fee", cleaning excluded. CCC is not enabled (`nd_source_ccc` null; 9 Airbnb ids are stored, 4 of them "not available") and there is no Market Dashboard (`market_dashboard_id` null). `quality_premium` = 0.0 because there is no comp rating.

**Stay dates (the same for market and us):** Tue 27-Thu 29 Oct (midweek), Fri 30 Oct-Sun 1 Nov (weekend), Tue 24-Thu 26 Nov (D+30).

**Method (unchanged from 24 Oct).**
- Position is interpolated linearly between P25, P50, P75 and P90, and extrapolated below P25.
- "Next 30" = 26 Oct-24 Nov. "Nights 31-60" = 25 Nov-24 Dec.
- A night counts as booked if either P13 twin is booked or blocked (policy: one flat).

## P02 Notting Hill, P03 Bayswater
These calendars are blocked on purpose (policy), so there is no positioning. `raw/prices_2999946.json` next 60 days: 57 blocked, 2 booked, 1 open.

## P13 Shepherd's Bush, 2-bed sleeps 6 (3064856 + 3090701 = one flat)
**NL 2BR summary, n=117: P25 204 / P50 244 / P75 302 / P90 368.** On 24 Oct it was 204/244/302/367.

| Stay | Night | NL daily 2-3BR band n=151, P25/P50/P75/P90 (not comps) | Band occ % (vs LY pts) | 3064856 | 3090701 | Position |
|---|---|---|---|---|---|---|
| Tue 27-Thu 29 Oct | 27 Oct | 209/247/313/380 | 60.6 (+0.5) | 163, twin booked | 195, booked | sold |
| | 28 Oct | 209/247/315/367 | 60.5 (-2.7) | 165, twin booked | 198, booked | sold |
| Fri 30 Oct-Sun 1 Nov | 30 Oct | 203/251/318/375 | 54.9 (-0.6) | 169, twin booked | 203, booked | sold |
| | 31 Oct | 203/248/322/371 | 45.6 (-2.6) | **187 open** | **224 open** | Whole stay not sellable. 31 Oct sits about P16 (3064856) / P37 (3090701) |
| Tue 24-Thu 26 Nov (D+30) | 24 Nov | 209/251/314/388 | 20.1 (-11.7) | **220 open** | **201 open** | about P32 / P20 |
| | 25 Nov | 207/253/315/398 | 22.1 (-11.3) | **227 open** | **207 open** | about P36 / P25 |

| Horizon | Booked (combined) | Market occ | Avg open price 3064856 / 3090701 | vs 2BR P50 | Position | `recommend` (q = 0) |
|---|---|---|---|---|---|---|
| Next 30, 26 Oct-24 Nov | 12/30 = 40.0% (pl_kpis 43% vs market 41%) | 35.0% band; 41% pl_kpis | **£186.2 / £212.4 on 18 nights** | -23.7% / -12.9% | **P14** / P30 (24 Oct: P20 / P28) | raise +5%: "in line with market but priced below what quality supports". Same result with either occupancy source and either twin. |
| Within 14 days, 26 Oct-8 Nov | 8/14 = 57% | 42.4% band | £168.5 / £202.0 on 6 nights | -30.9% / -17.2% | P3 / P24 | lead +15 pts. Rule output: raise +10% ("under-priced") |
| Nights 31-60, 25 Nov-24 Dec | 8/30 = 26.7% (pl_kpis 60-day 35% vs 35%) | 31.8% band; 35% pl_kpis | £244.0 / £223.4 on 22 nights | 0.0% / -8.5% | P50 / P37 | Depends on the occupancy source. Band: -5.1 pts gives **fix-listing** (a boundary case, -0.051 vs -0.05). pl_kpis: hold (3064856) / raise +5% (3090701) |

**Supported positioning, next 30 days: about -15% vs the NL 2BR P50, up from -24% on 3064856 and -13% on 3090701.** That is +5% on open nights. Reasoning: we are 2-5 pts ahead of the market (pl_kpis 43% vs 41%, band 40% vs 35%) while priced at P14 on the parent listing, so `recommend` gives +5% from both sources. The within-14-day nights sit at P3 even before the channel last-minute rules. +10% is not taken because no P13 booking has been made since 18 Oct (`reservations.csv`).

**Nights 31-60: hold near the median.** The signal is mixed: fix-listing on band occupancy (exactly at the -5 pt boundary), hold or raise on pl_kpis. No comp quality evidence either way (q = 0).

**Changes since 24 Oct (`get_user_logs`, `get_listing_date_overrides`, price files)**
- **Base price 235 -> 250 on 3064856.** Logged as "Base Price Updated", source `reviewPrices`, 24 Oct 21:14Z, by Reyhan. The change was copied to child 3090701, and `listings.csv` also shows Vrbo 12037152 at 250. **This change is not recorded in `policy.json` price_changes.**
- 24 Oct 11:25-11:26Z, matching the policy note: 25-26 Oct +10%, and the 1-27 Nov percent overrides cleared (min stay 2 kept). Two items differ from the note:
  - **A +10% override was re-added on 20-21 Nov at 11:26:53Z.** Policy says 17-27 Nov was set to 0%.
  - **31 Oct still has +10%** (last updated 20 Oct 09:29Z). Policy says 31 Oct-3 Nov was set to 0%.
  - These are facts for Corentin to confirm, not a re-raise.
- Price moves, 3064856 / 3090701:
  - 31 Oct: 183/203 -> 187/224.
  - 8 Nov: 216/228 -> 186/223, because the +10% was removed.
  - 23 Nov: 218/218 -> 193/220.
  - 24 Nov: 206/206 -> 220/201.
- Next-30 open-night average on 3064856 went from £195.7 to £186.2, even after the base rise. Lower last-minute pricing and the removal of the +10% overrides outweighed it.
- **1 Dec:** the +50% override is still set (policy: intentional; not re-raised). The delivered price is 274 on 3064856, against an uncustomized price of 226 (+21%). On 24 Oct it was 328, against 217 (+51%). 3090701 shows 250, against 206. Why the delivered uplift fell is NOT CHECKED.
- **PriceLabs-side discounts (`get_customizations` 3064856):**
  - Last-minute is "20% discount within 14 days (Gradual)".
  - Occupancy adjustment is "Market Driven".
  - Booking recency factor was not returned with `toggled_on`, so it appears to be off.
  - Far-out: none.
  - These stack with the Airbnb last-minute -10% (14 days) and the Booking.com Last Minute deal (policy). On the double-discount direction: the PriceLabs last-minute cut is still on.

### P13 twin price gap (3064856 vs 3090701)
Yesterday the twins were identical from 23 Nov. **They are no longer identical** (`price`, today's files):
- 26 Oct-23 Nov: 3090701 is about **+20%** above 3064856 (26 Oct 206 vs 172; 8 Nov 223 vs 186; 20 Nov 258 vs 227). Yesterday the gap was +11% / +5.6%.
- 24 Nov-23 Dec: 3090701 is about **-9%** below (24 Nov 201 vs 220; 1 Dec 250 vs 274; 21 Dec 228 vs 250).
- 24 Dec: identical, 263/263.

Policy says to narrow the gap, never make the prices identical. About 20% in the next 30 days is wide, and the order flips on 24 Nov. The flip itself is deprioritised (twin price order; not re-raised); the size of the gap is the point here. `is_child_listing` = 0 on 3064856. Why the gap widened after the base change (the child copied the same base) is NOT CHECKED.

Differentiators (cannot be priced without comp data): top-floor large private terrace, lift to 3rd floor, Booking.com 8.4 (15). On Airbnb, 1571600691689064213 shows 4.31 (13) and 1587576514709814818 shows 4.67 (9) (policy, 24 Oct). The first is in the bottom 10% for Airbnb quality.

## P10 Hanger Lane, 1-bed sleeps 4 (3318177)
NL 1BR summary, n=122: **P25 113 / P50 132 / P75 160 / P90 194** (24 Oct: 114/133/161/194). There are **0 sellable nights before the handback** (last night 18 Nov, policy): `raw/prices_3318177.json` next 60 days = 24 booked, 36 blocked, and every night up to 18 Nov is booked. No positioning; nothing is proposed after 18 Nov.

## P16 Little Venice, P18 Fulham, P19 Kings Langley
These are not in this PriceLabs account (4 `get_listings` searches returned 0) and not in `listings.csv`. **NOT CHECKED.**

## Data gaps:
1. Live OTA prices NOT CHECKED: WebFetch ENOTFOUND for airbnb.co.uk, and curl was denied by the permission classifier. 0 comps, so no comp median, rating, review gap, Superhost or cancellation comparison. `comps.csv` has its header only.
2. CCC is not enabled and there is no Market Dashboard, so only NL percentiles are available. The daily bands are 2-3BR (n=151), not bedroom-matched. The horizon of the summary table is not stated.
3. Our ratings and review counts are empty in `listings.csv`, so quality_premium = 0.
4. P13 occupancy: the price files give 40% (next 30) and 26.7% (31-60). pl_kpis gives 43% and 35%. The 31-60 recommendation flips with the source.
5. P13 overrides vs policy: 31 Oct +10% and 20-21 Nov +10% are still active. The base rise 235->250 is not in policy.json.
6. P13 1 Dec delivered uplift is +21%, not +50%; the cause is not visible through read-only tools.
7. The P13 Airbnb-to-Smoobu id mapping is still "likely" (policy). Vrbo 12037152 was not analysed.
8. The P10 neighbourhood output was not saved to raw.
9. P16, P18 and P19 are not in PriceLabs or `listings.csv`.
10. The three `get_listings` searches ran in parallel, against the one-at-a-time rule. All returned 200.

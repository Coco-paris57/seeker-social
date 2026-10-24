## PriceLabs audit (D = 2026-10-24)

**Sources**
- Snapshot `data/snapshots/2026-10-24/`:
  - `raw/listing_data.json` (pulled 05:55Z) and `raw/prices_*.json` (05:57–06:17Z);
  - `prices.csv` (25 Oct–23 Dec, with Smoobu rates merged in), `listings.csv` and `reservations.csv`.
- Yesterday's snapshot (`data/snapshots/2026-10-23/`) and `reports/2026-10-23/sections/pricelabs.md`, used for the diffs.
- `reports/2026-10-24/kpi_pack.json`, `kpi_summary.md`, `data/policy.json`, `data/id_map.json` and `../build/properties.py`.
- Live read-only PriceLabs calls from 06:21Z, one at a time:
  - `get_user_logs`: listing, group and account logs for 22–24 Oct;
  - `get_listing_date_overrides` for 3064196, 3562176, 3064856, 3090701 and 3547481;
  - `get_listing_prices` for 3064196 (17 Nov–19 Dec) and 3318172 (12–15 Nov).

**Nothing was changed.** Policy was respected:
- The P02, P03, P06 and P07 blocks are not raised.
- For P14, numbers are reported only.
- P13 is one flat, and its 1 Dec +50% override is intentional.
- Nights after each handback date are excluded (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec).
- Stay discounts and the Booking.com +20% markup are not raised.

### Changes logged since the last audit (`get_user_logs`, 22 Oct to 24 Oct)
There are no group-level or account-level entries. The only new entries since yesterday's audit are both by reyhan@:

| Time (Z) | Listing | Change |
|---|---|---|
| 23 Oct 11:11:16 | P11 3064196, copied to Vrbo 12037367 | Date-specific override (DSO) on **18–27 Nov**: no price adjustment, **min stay 2**. It replaces the earlier set: 18 Nov +30% / min 1; 19–24 Nov −5% / min 3; 25–26 Nov −2% / min 2; 27 Nov +60% / min 1. |
| 23 Oct 11:11:36 | P11 3064196, copied to Vrbo 12037367 | DSO on **12–18 Dec**: **+5%**, min stay 2. It replaces 12 Dec +10% and 13–18 Dec +20%. |

Earlier entries in the 22–24 Oct window were already reported yesterday:
- P12 overrides at 22 Oct 18:47Z;
- the Barking Vrbo push-off at 22 Oct 12:43Z.

---

### CRITICAL
None today.
- **P11 cancellation:** resolved (see item 1).
- **P02 Vrbo copy:** stale since 24 Feb. This is carried as HIGH because the P02 block is intentional and the copy has no price effect (item 4).

### HIGH

**1. P11 Camden: PriceLabs has picked up the 19–27 Nov cancellation, and the orphan premiums are gone.**

*Timing*
- The listing recalculated at **2026-10-23T11:12:14Z**, one minute after Reyhan's override, and pushed at 11:12:15Z.
- The Vrbo copy pushed at 11:13:35Z (`listings.csv`).

*What PriceLabs shows now*
- 18–27 Nov is open with min stay 2.
- `occupancy_next_30` fell from **63% to 53%** (market 45%) in `raw/listing_data.json`.
- Smoobu's rate matches PriceLabs on every night (`prices.csv`).

| Night | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 Nov |
|---|---|---|---|---|---|---|---|---|---|---|
| Today | £214 | £236 | £268 | £268 | £219 | £253 | £262 | £272 | £282 | £326 |
| Yesterday | £314 | (booked) | | | | | | | | £589 |

- 18–27 Nov now totals **£2,600** for 10 nights (£260/night), against yesterday's list of £2,955.
- The cancelled Booking.com stay was 8 nights for £1,736.41 (£217/night).

*Still open*
- Whether Booking.com shows 19–27 Nov as open is NOT CHECKED.
- **Data quirk:** on these dates the `user_price` / `booked_price` field ("Your Price" in the Download-prices CSV) still reads 18 Nov **£278** and 27 Nov **£522**. That equals the new price × the old +30% / +60% overrides. Smoobu shows £214 and £326. Anyone reading the CSV would see stale numbers.

*Check in PriceLabs:* none needed for pricing. Optionally confirm in the Booking.com extranet that 19–26 Nov is open.

**2. P11 13–17 Dec darts nights now average £256, below the "above £300/night" recorded in policy.**

*The rule:* `policy.json` `price_changes` (21 Oct) says "P11 Camden darts nights 13–17 Dec raised (Corentin); average above £300/night".

*What changed:* Reyhan's 23 Oct 11:11Z override cut the DSO from **+20% to +5%** on 13–18 Dec, and from +10% to +5% on 12 Dec.

| Night | 12 | 13 | 14 | 15 | 16 | 17 | 18 Dec |
|---|---|---|---|---|---|---|---|
| Yesterday | £389 | £331 | £308 | £314 | £327 | £342 | £393 |
| Today | £333 | £262 | £241 | £247 | £259 | £272 | £306 |

- **13–17 Dec average:** £256.20 today, against £324.40 yesterday (−21%).
- Smoobu equals PriceLabs on every night (`prices.csv`; live `get_listing_prices`).
- The 13 Dec uncustomized price is £271, so the other customizations now net about −8% even with the +5% override. This follows the occupancy drop in item 1.
- Booked nights fell too, for example 10 Dec £302 → £271 and 20 Dec £334 → £297. So the cancellation also lowered the algorithm's general level.

*Question:* was the cut agreed with Corentin? It conflicts with the policy entry.

*Check in PriceLabs:* 3064196 → Date Specific Overrides → 12–18 Dec (+5%, min stay 2), and the copy on Vrbo 12037367.

**3. P13 twins (3064856 / 3090701): prices are identical on all 31 nights from 23 Nov to 23 Dec, 24 of them open.**

*Prices* (`raw/prices_3064856.json` vs `raw/prices_3090701.json`)
- Identical nights, for example: 23–27 Nov £218 / £206 / £214 / £229 / £250; 7–12 Dec £223 / £227 / £229 / £245 / £260 / £261; 1 Dec £328 (intentional).
- Up to 22 Nov, 3090701 is £10–£22 higher, for example 22 Nov £213 vs £202.

*Overrides* (live `get_listing_date_overrides`)
- The **two override sets are identical** from 15 Nov to 31 Dec:
  - 19–30 Nov −1%, min stay 2;
  - 1 Dec +50%, min stay 1;
  - 2–22 Dec −3%, min stay 3;
  - 23–26 Dec −3%, no min stay set;
  - 27 Dec min 7; 28 Dec min 5; 29–31 Dec min 4.
- Last updated 16–20 Oct.

*Rule:* `policy.json` `listing_facts.P13.twin_listings` says the two must keep slightly different prices.

*Check in PriceLabs:* 3090701 → Date Specific Overrides 23 Nov–23 Dec. Make it slightly different from 3064856 (for example +2–3%), never identical.

**4. P02 Vrbo copy `_units_0004_ca1ccf61…` (Vrbo 4438728): push is on, but the last push was 2026-02-24T07:31:33Z (242 days ago).**
- Unchanged (`listings.csv`, `raw/listing_data.json`).
- The P02 block is intentional, and this item is not about the block.
- **Check:** PriceLabs → Vrbo 4438728 → Sync toggle. If the Vrbo listing is not live, switch push off.

**5. P04 Barking, 2 Dec: £630 for one night with min stay 1, up from £601 yesterday.**
- **Override:** unchanged at **+200%, min stay 1**, created and updated 2026-10-20T10:32:25Z (live).
- **Uncustomized price:** £231.
- **Neighbouring nights:** booked 1 Dec £202 and 3 Dec £204; the next open night, 6 Dec, is £208. So 2 Dec is about 3.1× its neighbours.
- **What the night is:** a 1-night gap between the confirmed Booking.com stays of 25 Nov–2 Dec and 3–6 Dec.
- **Policy:** covers only P13 1 Dec.
- **Check:** 3562176 → Date Specific Overrides → 2 Dec. Is an orphan premium intended, or should a gap-fill discount sell the night?

### MEDIUM

**6. P04, 25 Oct (tomorrow): still unsellable, so the night is effectively lost.**
- £141 with min stay 3, `unbookable=1` (`raw/prices_3562176.json`).
- **Override:** −5%, min stay 3, updated 2026-10-20T10:32:25Z (live).
- **What the night is:** a 1-night gap between the confirmed 22–25 Oct and 26 Oct–1 Nov stays.
- **Check:** 3562176 → 25 Oct, min stay 3 → 1. This only helps if it is done today.

**7. P09 Greenwich: the 13–15 Nov Airbnb booking (made 23 Oct) is not yet seen by PriceLabs.**
- Live `get_listing_prices` at about 06:25Z shows 13 and 14 Nov as **open** at £163 / £168. The last refresh was **2026-10-23T08:51:57Z**.
- PriceLabs' list price for those nights at the 23 Oct 05:58Z pull was £162 + £167 = **£329** (`data/snapshots/2026-10-23/prices.csv`).
- Paid versus price belongs to the channel section.
- Whether the booking came in after the 08:51Z refresh (a normal lag) is UNKNOWN, because the booking time is not in `reservations.csv`.
- **Check:** after today's cycle, confirm 13–14 Nov show as Booked in PriceLabs.

**8. P20 Waterford Court: 20–21 Nov is still blocked, and the cause is not in PriceLabs.**
- The block itself:
  - Both nights read `Blocked` in `raw/prices_3547481.json` (£303 / £311).
  - There is no reservation for them in `reservations.csv`.
  - The live overrides on those dates are only −2% / min stay 3 (updated 17 Oct), so no PriceLabs override closes them.
  - It is a Smoobu/channel block. Owner use or channel import is UNKNOWN.
- Separately, the 4-night minimum on 4–6, 11–13 and 18–20 Dec has no override behind it, and its source is UNKNOWN.
- Policy gives P20 a 3-night minimum only for 25 Oct–30 Nov.
- **Question for Corentin:** what are the 20–21 Nov block and the December 4-night rule?

**9. P12 Mile End: the 1–7 Nov open run eased another 5.7%, to £1,327, from £1,407 yesterday.**

| Night | 1 | 2 | 3 | 4 | 5 | 6 | 7 Nov |
|---|---|---|---|---|---|---|---|
| Today | £177 | £180 | £180 | £185 | £189 | £206 | £210 |

- 7 Nov fell from £265 to £210; its uncustomized price fell from £294 to £251.
- 26–29 Oct: £155 / £160 / £167 / £169.
- There was no new user change after 22 Oct 18:47Z.
- `occupancy_next_30` is 40%, against a market of 40%.
- The 18 Oct base rise to £284 comes up for review on 26 Oct.

**10. Orphan and short gaps** (`prices.csv`; the pack's `gaps` field is null):

| Ref | Night(s) | Price | Min stay | Note |
|---|---|---|---|---|
| P12 | 17 Nov | £378 | 1 | +50% override; was £375 |
| P04 | 2 Dec | £630 | 1 | Item 5 |
| P04 | 25 Oct | £141 | 3 | Item 6; unbookable |
| P05 | 29–30 Oct | £419 / £404 | 2 | |
| P05 | 16–17 Nov | £473 / £523 | 2 | |
| P05 | 7–8 Dec | £770 / £743 | 2 | |
| P06 | 5–7 Nov | £332 / £363 / £366 | 2 | |
| P13 | 1 Dec | £328 | 1 | Intentional |
| P11 | 18 Nov, 27 Nov | | | No longer orphans |

**11. Push freshness** (`raw/listing_data.json` at 05:55Z): every listing pushed within 24 h except item 4.
- The 23 Oct pushes pass 24 h between 06:55Z (P14, 06:55:53Z) and 11:12Z (P11) today unless the daily cycle runs.
- Not re-checked after 06:30Z.

**12. Sync:** on every Smoobu-mapped listing, no open night differs by more than £2 between PriceLabs and Smoobu (`prices.csv`, 25 Oct–23 Dec).
- **Exception, NOT CHECKED:** 3090701's 40 open nights. It is not in `id_map` `smoobu`, so no Smoobu rate is merged for it.

**13. Floor/ceiling and min stay** (`prices.csv`, 60 days, after handback cut-offs):
- **P14:** 43 of 60 open nights (72%) are at the £500 minimum. This is a special setup; numbers only.
- **P08:** 1 of 13 open nights (1 Nov £150) is at the minimum, which is 8%.
- Every other listing has 0% at the minimum and 0% at the maximum.
- Min stay is 2–4 everywhere, except the min-1 orphan nights above.

**14. Info pack** (`../build/properties.py`, last modified 13 Oct) is still out of date. PriceLabs base/min/max are unchanged from 23 Oct.
- **Base differences** (pack → PriceLabs):

  | Ref | Pack | PriceLabs |
  |---|---|---|
  | P01 | £230 | £253 |
  | P05 | £455 | £550 |
  | P06 | £340 | £357 |
  | P09 | £160 | £176 |
  | P11 | £260 | £286 |
  | P12 | £270 | £284 |
  | P14 | £475 | £525 |

- **Minimum:** P14 £400 → £500.
- **P20** is not in the pack.

**15. Listing hygiene** (`raw/listing_data.json`, 20 listings, the same set as 23 Oct; `data/id_map.json`):
- **Separate Vrbo copies:** P11 12037367, P12 12038157 and P13 12037152. They push separately and copy overrides from their parent listings.
- **P03:** priced through Channex (`id_map` confidence `check`). It is blocked on purpose.
- **P15–P19:** no PriceLabs listing (`id_map` confidence `check`).
- **Dead ids:** the `_unmatched` Marylebone Vrbo ids (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) and the P01/P04/P08/P09/P10/P13 `pricelabs_other` ids no longer exist in PriceLabs.
- **Question:** should `id_map.json` drop them?

Data gaps:
1. `market.csv` and `comps.csv` are empty, so base vs market P50/P75 was NOT CHECKED. The pack's `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null.
2. `prices.csv` covers only 25 Oct–23 Dec. The 180-day floor/ceiling check and the 5-night and 7-night min-stay rules were NOT CHECKED.
3. 3090701 has no Smoobu rate merged, so its sync was NOT CHECKED.
4. Not known:
   - whether Booking.com shows P11 19–26 Nov as open;
   - the P09 booking time;
   - the cause of P20's 20–21 Nov block;
   - the source of P20's December 4-night minimum.
5. `user_price` / `booked_price` disagree with `price` on overridden dates. Smoobu follows `price`. Why the field lags is UNKNOWN.
6. Overrides and customizations for P01, P05, P06, P08, P09, P10, P12 and P14 were not re-read. None of them has a log entry since 22 Oct 18:47Z.

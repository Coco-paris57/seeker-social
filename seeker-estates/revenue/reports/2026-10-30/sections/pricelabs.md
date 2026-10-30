## PriceLabs audit (D = 2026-10-30)

**Sources**
- Snapshot `data/snapshots/2026-10-30/`:
  - `raw/listing_data.json`, pulled 06:56Z;
  - `raw/prices_*.json`, pulled 06:58-07:19Z. The window is **31 Oct-29 Dec**, so 30 Oct is not covered;
  - `prices.csv`, `listings.csv`, `pl_kpis.csv`;
  - `reservations.csv` (Smoobu; `total_gbp` is room only).
- Baseline: `data/snapshots/2026-10-29/` and `reports/2026-10-29/sections/pricelabs.md` + `daily-report.md`.
- **Live read-only calls on 30 Oct (one at a time):**
  - `get_user_logs`, listing / group / account, 29-30 Oct;
  - `get_listings` (20 listings);
  - `get_listing_data` (~07:27Z);
  - `get_listing_date_overrides` on 3562176, 3166592, 3288517, 3064196, 2699998, 3064856, 3090701, 3547481, 3318172;
  - `get_customizations` (toggled_on=false) on 3562176, 3166592, 3064196, 2699998, 3064856, 3090701, 3547481, 3318167, 3318172, 3288517;
  - `get_listing_prices` 3064856 (after its 07:16Z refresh).
- **Smoobu GET `/api/rates`** (07:25Z) for 3562176, 3166592, 2699998, 3064856 and 3288517. Rates only, no guest data.
- `kpi_pack.json`: `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null. Today's `market.csv` is empty (`kpi_pack.missing`). Base vs market uses `data/snapshots/2026-10-29/market.csv` (rows pulled 29 Oct) and today's `raw/neighbourhood_P13.json`.
- Policy respected:
  - P02/P03/P06/P07 blocks, P14 special setup, handbacks;
  - P13 1 Dec, P04 2 Dec, P04 min-3 rule;
  - the Reyhan items are reported as conflicts for Corentin, not as proposals.

### What changed since 29 Oct 06:00Z
- **Logs:** `get_user_logs` listing, group and account for 29-30 Oct return **0 entries**. A control query for 28-30 Oct returns total 29, the same 29 entries from reyhan@ on 28 Oct. **Nobody edited PriceLabs overrides or prices since 28 Oct 14:15:45Z.**
- **Overrides:** no change on any of the 9 listings read. The newest `updated_at` is still 28 Oct (P04 10:32:30Z, P11 10:29:53Z, P12 12:44:36Z, P13 10:30:49Z, P20 14:15:45Z). 3090701 mirrors 3064856. P09's newest is 26 Oct 18:41:53Z.
- **Customizations:** identical to 29 Oct on every listing read (raw values and `effective` text). The only drift is P06's Market-Driven last-minute text: "40% same-day to 0% after 13 days", was 12. That setting is market-computed, not an edit.
- **Catalogue:** `get_listings` returns the same 20 listings as 28-29 Oct.
- **Prices moved without edits:**
  - P12 open nights rose about 10-15% (e.g. 17 Nov £227 to **£255**, 18 Nov £223 to £249) after PriceLabs picked up the 21-26 Nov and 3-7 Dec bookings (occupancy 47% to 57%, `listing_data.json`);
  - P11 13-17 Dec rose from £1,060 to £1,104.

---

### CRITICAL

**C1. P11 Vrbo copy `_units_0001_7fd3a4c7…` has not pushed for more than 24 h**
- Sources: `raw/listing_data.json` and live `get_listing_data`.
- Push is on. `last_date_pushed` is **2026-10-29T06:18:54Z**: 24 h 37 min old at the 06:56Z pull, and still the same at ~07:27Z.
- `last_refreshed_at` is 30 Oct 05:37:00Z, so PriceLabs recalculated the listing but did not push.
- The parent 3064196 pushed at 05:51:29Z today, and the P12/P13 Vrbo copies pushed at 05:46Z/06:22Z.
- Possible causes, none confirmed: push failure on the Vrbo connection; the Vrbo listing deactivated on the Vrbo side.
- **Check:** PriceLabs > listing 12037367 (Vrbo) > Sync status / push error log. Is this Vrbo listing still live? If it is not, turn push off (Corentin to decide).

### HIGH

**H1. t-pl-sync: three of the five calendar changes are now seen; P04 6-9 Nov and P05 6-9 Nov are not**
- Sources: raw prices; `reservations.csv`; Smoobu `/api/rates` 07:25Z.

| Change (Smoobu `reservations.csv`) | Booked | PriceLabs (raw 30 Oct) | Smoobu live 07:25Z | Status |
|---|---|---|---|---|
| P04 Booking.com 3-6 Nov, room £393.18 | 28 Oct | 3-5 Nov **Booked** (booked_date 28 Oct) | closed | **Fixed** |
| P04 Airbnb 6-9 Nov, room £355.72 | 29 Oct | 6-8 Nov **open**, £154 / £155 / £156, min 3 | closed | **Not seen.** 3562176 last refreshed **29 Oct 09:09:41Z** |
| P05 Airbnb 6-9 Nov, room £893.52 | 29 Oct | 6-8 Nov **open**, £463 / £477 / £459, min 2 | closed | **Not seen.** 3166592 last refreshed **29 Oct 08:57:56Z** |
| P12 Booking.com 21-26 Nov, room £1,012.36 | 28 Oct | 21-25 Nov **Booked** | closed | **Fixed** |
| P12 Booking.com 3-7 Dec, room £1,072.44 | 29 Oct | 3-6 Dec **Booked** (booked_date 29 Oct) | closed | **Fixed** (2699998 refreshed 30 Oct 06:19:19Z) |
| P12 4-8 Dec **cancelled** (£1,116.99) | - | 7 Dec now **open** £261; 4-6 Dec Booked by the new 3-7 Dec stay | 7-9 Dec open | **Fixed** |

- Smoobu holds P04 and P05 6-8 Nov closed, so there is **no overbooking risk**. But PriceLabs occupancy and the Aggressive occupancy tables on both listings work from stale data.
- P05 PriceLabs occupancy_next_30 is 80%. P04's is 53%, which includes 3-6 Nov but not 6-9 Nov.
- **P04 6-9 Nov came in through Smoobu as channel "Airbnb".** The room total equals the PriceLabs price pushed at 29 Oct 09:09Z × 0.765 exactly: (154 + 155 + 156) = £465, × 0.765 = £355.72.
  - So the booking was priced off Smoobu's pushed rate, after that push, with a 0.765 Airbnb-side factor (a-airbnb-rules ≤28-day ratio).
  - Whether it came from Barking's separate Airbnb account cannot be seen in PriceLabs: NOT CHECKED.
- **P05 6-9 Nov:** £893.52 vs £1,399 PriceLabs = **0.639x**. That is not explained by the 0.765 pattern: unexplained, ask for the Airbnb breakdown.
- **P12 3-7 Dec:** £1,072.44 vs £1,186 today = 0.904x. Against 29 Oct's raw £1,148 it is 0.934x.
- **Check:** PriceLabs 3562176 and 3166592 > Sync Now. Then confirm 6-8 Nov shows Booked.

**H2. Reyhan conflicts with standing decisions: all four unchanged, none fixed**
- Sources: overrides (live); raw prices; policy.json; no log entries since 28 Oct.

| Conflict | Policy | PriceLabs today | Price today |
|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised.p12_17nov_override`: "won't change Mile End 17 Nov +50%" | **-2%, min 2** (16 Nov-13 Dec, 28 Oct 12:44:36Z) | **£255** (uncustomized £281). Was £387 on 28 Oct, £227 on 29 Oct |
| (b) **P11 darts 13-17 Dec** | `price_changes` 21 Oct "average above £300/night"; `listing_facts.P11.darts_override_24oct` "+5%, leave as is" | 13-16 Dec min-only (min 2, no price); 17-18 Dec -2% min 2; 12 Dec -2% min 3 | 13-17 Dec **£232 / £206 / £209 / £221 / £236 = £1,104, average £221/night** (29 Oct £1,060). 12 Dec £320, 18 Dec £283 |
| (c) **P04** | 24 Oct: -8% on 1-25 Nov; "never open for less than 3 nights" | -7% on 1-17 Nov and 6-22 Dec; **+15% min 2** on 18-20 and 23-25 Nov | Open at min 2: **18-19 Nov £205 / £201** and **23-24 Nov £202 / £205** (20-22 and 25 Nov are booked) |
| (d) **P20** | `listing_facts.P20.min_stay` "3 nights from 25 Oct to 30 Nov"; 24 Oct -5% on 31 Oct-19 Nov | 31 Oct-1 Nov **+10% min 2**; -5% runs 6-24 Nov | 31 Oct-1 Nov **£225 / £230** (uncustomized £250 / £274). This is a 2-night gap between the 28-31 Oct and 2-6 Nov bookings, so min 3 would close it |

- **Corentin to confirm each.**
- Check in PriceLabs > Date Specific Overrides:
  - 2699998 (+ Vrbo `_386e…`), 17 Nov;
  - 3064196 (+ Vrbo `_7fd3…`), 12-18 Dec;
  - 3562176, 18-25 Nov;
  - 3547481, 31 Oct-1 Nov.

**H3. a-discount-cut: not applied. Every customization layer is unchanged** (live `get_customizations`, `effective`)

| Ref | Last-minute | Occupancy | Booking Recency | Seasonality | Demand Factor | Far-out |
|---|---|---|---|---|---|---|
| P04 3562176 | -5% gradual, 15 d | Aggressive | ON default (5-15%) | None (off) | Conservative | +30% after 150 d |
| P05 3166592 | -1% gradual, 15 d | Aggressive | ON default | None (off) | Conservative | +30% after 150 d |
| P08 3318167 / P09 3318172 | **-18%** gradual, 15 d | Market Driven (toggle off) | off, so default applies | None | Moderately Aggressive | +20% after 120 d |
| P11 3064196 | 0% | Aggressive | ON default | None (off) | None (off) | +30% after 150 d |
| P12 2699998 | 0% | Custom (milder) | ON default | None | Moderately Conservative | +30% after 150 d |
| P13 3064856 / 3090701 | -5% gradual, 14 d | Aggressive | ON default | **Moderately Conservative (ON)** | Conservative | +30% after 150 d |
| P20 3547481 | 0% | Aggressive | ON default | None | None | +30% after 150 d |
| P06 3288517 | Market Driven (40% same-day to 0% at 13 d) | Market Driven | default | None | None | Market Driven |

- **Final vs uncustomized, open nights.** `price` vs `uncustomized_price` from the raw files. P04 and P05 6-8 Nov are excluded (booked in Smoobu); so are nights after handback.
- Today's windows are **31 Oct-13 Nov** (14) and **31 Oct-29 Nov** (30). Yesterday's were 30 Oct-12 Nov / 30 Oct-28 Nov.

| Ref | Next 14 | 29 Oct | Next 30 | 29 Oct |
|---|---|---|---|---|
| P04 | 5 n £794 vs £1,136, **-30.1% (£342)** | -20.8% | 9 n £1,607 vs £2,056, **-21.8% (£449)** | -19.0% |
| P20 | 10 n £2,410 vs £3,017, **-20.1% (£607)** | -18.5% | 19 n £4,899 vs £5,768, **-15.1% (£869)** | -14.8% |
| P11 | 7 n £1,471 vs £1,548, -5.0% (£77) | -8.9% | 19 n £4,070 vs £4,669, **-12.8% (£599)** | -11.7% |
| P05 | 1 n £426 vs £434, -1.8% | -8.7% | 4 n £1,844 vs £2,045, **-9.8% (£201)** | -11.7% |
| P12 | 6 n £1,459 vs £1,474, -1.0% | -4.3% | 14 n £3,706 vs £3,989, **-7.1% (£283)** | -6.7% |
| P09 | 4 n £593 vs £614, -3.4% (£21) | -1.8% | same (handback 26 Nov) | |
| P08 | 3 n £645 vs £654, -1.4% | -0.6% | same (handback 13 Nov) | |
| P13 3064856 | 9 n £1,392 vs £1,392, 0.0% | -2.2% | 11 n £2,006 vs £1,938, +3.5% | +1.8% |
| P13 3090701 | 9 n £1,689 vs £1,590, +6.2% | +3.1% | 11 n £2,246 vs £2,136, +5.1% | +5.3% |
| P06 | 6 n £1,877 vs £1,874, +0.2% | +0.3% | 7 n £2,159 vs £2,156 | +0.2% |

- **Net uncustomized minus final**, with the same method as 29 Oct (excluding P06 and P14, both P13 listings netted):
  - **next 14 £980** (29 Oct £1,246);
  - **next 30 £2,253** (29 Oct £2,420).
- The fall is the window moving and P12 prices rising on higher occupancy. No setting changed.
- **P04 (-30% on the next 14) and P20 (-20%) are still driven by the stack.** Example: P04 9-12 Nov is £158/night vs uncustomized £223-£225 under a -7% override.
- **Check:** PriceLabs > each listing > Customizations: set each layer to Custom 0% explicitly (not toggle off).

**H4. P05 29 Dec: 1-night orphan listed at £1,331, min 1** (raw `prices_3166592.json`; Smoobu rates; overrides 3166592)
- DSO **+100%, min 1**, created 4 Sep, last updated **18 Oct 20:34:32Z**. Uncustomized price is **£1,035**.
- 29 Dec now sits between the 22-29 Dec booking (£4,527.95 room) and the 30 Dec-4 Jan booking. The 27-30 Dec booking was cancelled. Smoobu live: 29 Dec **available, £1,331, min 1**.
- Neighbouring nights: 28 Dec £806 and 30 Dec £800 (Smoobu), so 29 Dec is **1.65x** its neighbours.
- **Question for Corentin:** is +100% on this orphan intended (t-p05-calendar)? Check PriceLabs 3166592 > DSO 29 Dec.

### MEDIUM

**M1. The kpi_summary "P13: 7 nights differ" is a snapshot timing artefact, not a sync fault** (`prices.csv`; raw `prices_3064856.json` pulled 07:14:57Z; live `get_listing_prices` 3064856; Smoobu rates 07:25Z)
- 3064856 differed by £3-£7 on 8 Nov (£156 PriceLabs vs £153 Smoobu), 27 Nov (£342 vs £338), 18-21 Dec (£241/£237, £243/£240, £227/£231, £236/£229) and 23 Dec (£233/£236).
- 3064856 and 3090701 were refreshed at **07:16:38Z** and pushed at **07:16:40Z / 07:16:39Z**. That is after the raw pull and before the Smoobu read.
- Live PriceLabs after the refresh shows **8 Nov £153, 17 Nov £274, 27 Nov £338, 18 Dec £237, 20 Dec £231, 21 Dec £229, 23 Dec £236**. Each equals the Smoobu rate.
- On every other Smoobu listing, 0 open nights differ by more than £2. 3090701 has no Smoobu rate in `prices.csv`: NOT CHECKED.

**M2. Push freshness: the morning-cycle listings did not push overnight again**
- Sources: `listing_data.json` 06:56Z and live ~07:27Z.
- P04 (09:09:43Z), P05 (08:57:58Z), P06 (08:58:05Z), P09 (08:45:43Z) and P20 (09:20:25Z) last pushed on **29 Oct**. There is no log entry for any of these pushes.
- They pushed at similar times on 28 Oct (08:54-14:20Z), so they look like a once-a-day mid-morning cycle. They are under 24 h now but **cross 24 h at 08:45-09:20Z today**.
- P13 already pushed at 07:16Z today.
- Pushed overnight by themselves: P01 06:30Z, P02 00:24Z, P03 (Channex) 02:45Z, P07 04:51Z, P08/P10 06:13Z, P11 05:51Z, P12 06:19Z, P14 04:38Z, Vrbo P12 05:46Z, Vrbo P13 06:22Z.
- **Check:** re-read `last_date_pushed` after 09:30Z. Any listing older than 24 h is CRITICAL.

**M3. a-p13-orphan-price: unchanged** (overrides 3064856/3090701 +35% min 1 on 17 Nov and +50% min 1 on 27 Nov)
- 3064856 (07:16Z): **17 Nov £274**, **27 Nov £338** (uncustomized £247 / £297).
- 3090701 (06:56Z raw): £247 / £310, with `user_price` £273 / £344.
- Corentin to confirm the premiums.

**M4. a-peak-check: P13 25-26 Dec still min 3** (overrides 3064856 23-26 Dec -3% min 3)
- 21-26 Dec open on 3064856 at £227-£236, all min 3. 27 Dec is Blocked because 3090701 is booked 27 Dec-3 Jan.
- Arrivals on **25 or 26 Dec cannot fit** (only 1-2 nights before 27 Dec). A 24 Dec arrival for 3 nights still fits.
- Prices are 6-12% under uncustomized (£241-£260) with Seasonality Moderately Conservative ON and Demand Factor Conservative.
- Other listings:
  - **P20:** 21-26 Dec £344-£355 vs uncustomized £383-£396 (-10%). No override on these dates, so the customization stack is the cause. 27-29 Dec £417 / £528 / £589, min 7 / 6 / 5;
  - **P11:** 23-25 Dec £313 / £310 / £317, +10% override, min 3 / 2 / 2.

**M5. a-p12-2228nov: still not applied** (overrides 2699998 -2% min 2)
- 26-28 Nov now **£272 / £303 / £322 = £897** (29 Oct £832; target £715). The prices rose on higher PriceLabs occupancy.

**M6. t-p06-open: P06 8-14 Nov still open** (`raw/prices_3288517.json`; `prices.csv` available=True)
- 7 nights at £312 / £274 / £285 / £309 / £327 / £370 / £282 = **£2,159**, min 2. PriceLabs and Smoobu agree.
- P06 also has an Airbnb booking for 5-8 Nov (booked 25 Oct, `reservations.csv`).
- P06 is an intentional block in policy. **Question:** is 8-14 Nov meant to be sold?

**M7. a-raise-1012nov: not applied** (no log entries)
- P09 10-12 Nov is **£150 / £153 / £154**, under the 26 Oct -5% DSO (31 Oct-12 Nov).
- P13 3064856 10-11 Nov is £158 / £160 (07:16Z), with +2%.

**M8. P05 30 Oct still closed** (Smoobu rates 07:25Z: 30 Oct `available` 0, £493, min 2)
- `reservations.csv` has no P05 stay covering 30 Oct. The 31 Oct-6 Nov stay starts on the 31st. PriceLabs DSO 30 Oct is +10% min 2.
- Policy explains only 27-28 Oct. **Ask** whether the block is intentional (t-p05-calendar).

**M9. Min stay vs policy and orphan gaps** (raw `min_stay`; Smoobu rates; `kpi_pack.gaps`)
- **Below 2 on open nights:**
  - P13 17 Nov, 27 Nov (M3) and 1 Dec (policy-intentional);
  - P04 2 Dec (+200% min 1, policy-settled);
  - P05 29 Dec (H4).
- **P04 below 3:** 18-19 and 23-24 Nov (H2c).
- **P20 below 3 before 30 Nov:** 31 Oct-1 Nov (H2d).
- P14: min 3-4 throughout (special setup).
- 5-night (2+ months ahead, from 30 Dec) and 7-night (4+ months) rules: the window ends 29 Dec, so NOT CHECKED. Not visible after 29 Dec in the raw files.
- **Orphans a gap-fill rule would sell:**
  - **P05 9 Nov** (1 night between 6-9 Nov and 10-16 Nov, min 2, £426; Smoobu available, min 2; `kpi_pack.gaps`);
  - **P09 31 Oct** (1 night, min 2, £136; before handback).
- **Unsellable by policy:** P04 1-2 Nov, a 2-night gap at min 3. PriceLabs shows `unbookable` 1 at £129 / £129; Smoobu shows available, min 3. No proposal.
- **Short gaps sellable now:**
  - P11 31 Oct-2 Nov (£247 / £194 / £190, min 2);
  - P20 22-24 Nov (£275 / £275 / £277, min 3);
  - P12 12-13 Nov (£220 / £277);
  - P05 16-17 Nov (£428 / £448) and 7-8 Dec (£516 / £499);
  - P08 5-7 Nov (£201 / £220 / £224);
  - P09 10-12 Nov.

**M10. Floor / ceiling** (raw, 60 days, open nights vs `listing_data` min/max)
- P14: **44 of 60** open nights at the £500 minimum (73%). Special setup: numbers only.
- Every other listing: 0 at min, 0 at max.
- 180-day check: NOT POSSIBLE (raw ends 29 Dec).

**M11. Base vs market** (`listings.csv` `pl_base`; 29 Oct `market.csv` rows pulled 29 Oct; P13 from today's `raw/neighbourhood_P13.json` 2 BR n=118)

| Ref | Base | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|
| P01 | £253 | £259 | -2.3% | £333 | -24.0% |
| P04 | £220 | £175 | **+25.7%** | £221 | -0.5% |
| P05 (4 BR) | £550 | £579 | -5.0% | £722 | -23.8% |
| P09 | £176 | £139 | **+26.6%** | £172 | +2.3% |
| P11 | £286 | £290 | -1.4% | £331 | -13.6% |
| P12 | £284 | £207 | **+37.2%** | £247 | **+15.0%** |
| P13 | £250 | £226 | +10.6% | £282 | -11.3% |
| P20 | £350 | £255 | **+37.3%** | £315 | **+11.1%** |

- P06, P08, P10 and P14 have no `market.csv` row: UNKNOWN.
- The horizon is unstated and cleaning inclusion is unknown, so treat the gaps as indicative.

**M12. 18 Oct base rises (P01, P05, P06, P09, P11, P12): running effect and the 2 Nov review**
- Bases are unchanged (`listings.csv` 30 Oct = 29 Oct). PriceLabs occupancy_next_30 vs market (`pl_kpis.csv`):
  - P01 100% vs 34% (sold to handback);
  - P05 80% vs 39%;
  - P06 77% vs 45% (mostly blocks);
  - P09 80% vs 36%;
  - **P11 40% vs 46%**;
  - P12 57% vs 40%.
- **The 2 Nov review should look at:**
  - P11, the only one below market next 30. 19 open nights in the next 30; its gap is driven by Aggressive occupancy, not base;
  - P05: its first booking since 18 Oct came at 0.639x PriceLabs (H1);
  - P12 at +37% vs P50 while selling at 0.90-0.93x on Booking.com;
  - whether the P04/P20 stack (H3), rather than base, is what is moving price.

**M13. Listing hygiene** (`get_listings`; `listing_data.json`; `data/id_map.json`)
- **The brief's note does not hold.** All four Vrbo listings in `listing_data.json` **are** in `id_map.json` as `pricelabs_other`: `_units_0004_ca1ccf61` (P02), `_0001_3d48ae56` (P13), `_0001_7fd3a4c7` (P11) and `_0001_386e99b2` (P12).
  - The reverse is true: the three **`_unmatched`** Vrbo listings (`a7f5a076…`, `4a980bb7…`, `380ddc1a…`, Marylebone coordinates) are in `id_map` but **not in PriceLabs**.
  - The same applies to the `pricelabs_other` copies for P01 (`d1f3bd96…`), P04 Vrbo (`20df1e73…`), P08 (`10339b41…`), P09 (`e36cf9e9…`), P10 (`babeec20…`) and P13 (`d0a5f202…`, `125c15c5…`).
  - **Question:** were they removed on purpose? If so, `id_map.json` needs updating.
- **`confidence: check`:**
  - P03 is priced via **Channex**, not Smoobu (push on, last push 30 Oct 02:45:27Z; intentional block);
  - **P15-P19 have no PriceLabs listing.** Question: should they be priced?
- **Vrbo copies push separately** and receive overrides copied from the parent (28 Oct logs):
  - P11 `_7fd3…` is **stale (C1)**;
  - P12 `_386e…` pushed 30 Oct 05:46:33Z;
  - P13 `_3d48…` pushed 06:22:38Z.
- **P02 Vrbo copy:** push on, last push **2026-02-24T07:31:33Z**. This meets the stale rule, but P02 is an intentional block (fully blocked next 360). Question: turn push off or remove the listing?
- **P13:** 3064856 and 3090701 share coordinates (51.5088201, -0.2342476) and push together. One flat (policy).
- **P20 is not in the info pack.** The recommended base reads "Unavailable" for P04.
- **Info pack (`/home/user/seeker-social/seeker-estates/build/properties.py`, mtime 13 Oct) vs `listings.csv`:** unchanged from 29 Oct.
  - Minimums match except P14 (pack £400, PriceLabs £500; special setup).
  - Bases differ where the 18/20 Oct rises happened (P01 230/253, P05 455/550, P06 340/357, P09 160/176, P11 260/286, P12 270/284, P13 235/250, P14 475/525). **The pack is out of date.**

### Open plan items: status 30 Oct

| Item | Status |
|---|---|
| Reyhan conflicts (P12 17 Nov, P11 darts, P04 -7%/min 2, P20 min 2) | **Unchanged, none fixed** (H2) |
| a-discount-cut | Not done. Gap £980 / £2,253 (H3) |
| t-pl-sync | P04 3-6 Nov, P12 21-26 Nov, P12 3-7 Dec and the P12 4-8 Dec cancellation are now right. **P04 and P05 6-9 Nov are unseen** (H1). P11 Vrbo stale (C1) |
| a-p12-2228nov | Not done. 26-28 Nov £897 (M5) |
| a-p13-orphan-price | Unchanged (M3) |
| a-peak-check | Unchanged. P13 25-26 Dec min 3 (M4). P05 29 Dec £1,331 (H4) |
| a-raise-1012nov | Not done (M7) |
| t-p06-open | Still open, £2,159 (M6) |
| t-p05-calendar | 30 Oct still closed (M8); 29 Dec +100% (H4) |
| t-p04-doublebook | Smoobu now closes 3-8 Nov (07:25Z). The Airbnb side is not visible from PriceLabs/Smoobu: NOT CHECKED here |
| t-p04-airbnb-minstay, a-airbnb-rules, t-p08-offer | OTA-side settings: NOT CHECKED here. P04 6-9 Nov booking = PriceLabs × 0.765 exactly (H1) |

Data gaps:
1. Raw window is 31 Oct-29 Dec. 30 Oct is not covered, the 180-day floor/ceiling check and the 5/7-night far-out rules are NOT CHECKED, and the windows shift by a day vs 29 Oct.
2. `kpi_pack.json` `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null. Today's `market.csv`, `comps.csv` and `channel_checks.csv` are empty. Base vs market uses the 29 Oct `market.csv`.
3. The meaning of `user_price` vs `price` is still UNKNOWN. Smoobu matches `price` (M1).
4. Not read today:
   - customizations on P01, P10, P14 and the blocked P02/P03/P07;
   - overrides on P01, P08, P10, P14 and the Vrbo copies;
   - PriceLabs orphan-day settings.
5. Customization edits are not logged in `get_user_logs`. "No change" rests on comparing live readings with 29 Oct.
6. Booking times for the P04, P05 and P12 bookings of 29 Oct are not in `reservations.csv`. Ratios use today's raw prices (P04 matches the 29 Oct 09:09Z push exactly).
7. 3090701 Smoobu rates are missing from `prices.csv`: sync NOT CHECKED.

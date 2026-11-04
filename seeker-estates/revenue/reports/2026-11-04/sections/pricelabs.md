## PriceLabs audit (D = 2026-11-04)

**Sources**
- Snapshot `data/snapshots/2026-11-04/`: `raw/listing_data.json` (06:55Z), `raw/prices_*.json` (06:57-07:16Z, window **5 Nov 2026 - 3 Jan 2027**), `prices.csv` (07:17Z), `listings.csv`, `reservations.csv` (Smoobu, room only, cleaning excluded). Yesterday: `data/snapshots/2026-11-03/` and `reports/2026-11-03/sections/pricelabs.md`.
- **Live read-only calls, 4 Nov 07:17-07:40Z**, one at a time except one pair (the group and account `get_user_logs` calls ran in parallel; both returned 200 and empty).
  - `get_user_logs` listing / group / account, 3-4 Nov.
  - `get_listing_data` (all 20 listings) at 07:18Z, and again for P09 after 07:38Z.
  - `get_customizations` (toggled_on=false): P12, P04, P09.
  - `get_listing_date_overrides`: P09, P13 3064856.
  - `get_listing_prices`: P12, 4-5 Nov.
- **Live Smoobu `GET /api/rates`** at 07:19Z for 12 apartments, 4 Nov-3 Jan. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/smoobu_rates_0404.json` (contains no guest data).
- `kpi_pack.json`: `sync_issues` lists only P09 10-11 Nov. `gaps` is [] for every property. `market_percentiles` are all null, and market/comps/channel_checks are "empty". Base vs market therefore uses the latest rows in `data/snapshots/2026-11-03/market.csv` (pulled 2-3 Nov), plus today's `raw/neighbourhood_P13.json` for P13.
- Policy respected: P02/P03/P06/P07 blocks, P14 special setup, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), P13 1 Dec intentional, P13 = one flat, and the deprioritised items (P12 17 Nov, P04 2 Dec). Where Reyhan's edits cross a standing decision, they are reported as conflicts for Corentin to confirm. They are not new proposals.

### What changed since 3 Nov 06:00Z
- **Logs (`get_user_logs`, listing): 37 entries, all on 4 Nov 01:24:03-01:31:02Z.** Every entry is from reyhan@ (same IP as on 2 Nov). No entries on 3 Nov. Group and account logs: 0.
- **There is no `base_price`, `min_price` or `max_price` entry.** `listings.csv` agrees: base, min and max are unchanged vs 3 Nov. Recommended base moved: P12 273 -> **284**, P11 285 -> 283, P05 548 -> 544.
- **Edits.** Each parent edit was mirrored to its Vrbo copy (and, for P13, to 3090701) via `add_custom_pricing_from_parent`.

| Time (Z) | Listing | Change | Was |
|---|---|---|---|
| 01:24:03 | P12 2699998 | **4 Nov +15%, min 1** | -10%, min 2 |
| 01:24:12 | P12 | **12-13 Nov -10%**, min 2 | -5% |
| 01:24:21 | P12 | **26 Nov +15%**, min 1 | +25% |
| 01:24:30 | P12 | **16-25 Nov -15%**, min 2 (covers 17 Nov) | -10% |
| 01:24:35 | P12 | **27 Nov-13 Dec -15%**, min 2 | -10% |
| 01:25:17 | P11 3064196 | 23 Dec +5%, min 3 | NOT CHECKED (prices fell, see H3) |
| 01:25:23 | P11 | 24-25 Dec +7%, min 2 | NOT CHECKED |
| 01:26:30 | P13 3064856 (+3090701, Vrbo) | **8-12 Nov -7%**, min 2 | -5% |
| 01:26:42 | P13 (3 listings) | **21-26 Dec -5%, min 3** | 23-26 Dec -3%, min 3 |
| 01:26:55 | P13 (3 listings) | 2-31 Jan 2027 -10%, min 3 | new |
| 01:27:00 | P13 (3 listings) | Feb 2027 -10% (no min stay set) | new |
| 01:27:42 | P05 3166592 | Feb 2027 -5%, min 4 | new |
| 01:27:55 | P05 | **13-19 Dec -7%**, min 3 | -5% |
| 01:28:22 | P06 3288517 | 8-14 Nov -5%, min 2 | -2% |
| 01:28:45 | P08 3318167 | **4-21 Nov -5%**, min 2 | new |
| 01:29:27 | P20 3547481 | **16-19 Nov -5%, min 2** | -2%, min 2 |
| 01:30:03 | P20 | 21-26 Dec -5% | new |
| 01:30:10 | P20 | Jan 2027 -10%, min 3 | new |
| 01:30:16 | P20 | Feb 2027 -7%, min 4 | new |
| 01:30:39 | P04 3562176 | **9-24 Nov -15%**, min 3 | -10% |
| 01:30:55 | P04 | 2-31 Jan 2027 -10%, min 3 | new |
| 01:31:02 | P04 | Feb 2027 -10%, min 4 | new |

- **Net effect: 2 raises, 3 "less negative" moves and 17 deeper cuts or new cuts.**
  - Raises: P12 4 Nov and P11 23-25 Dec.
  - Less negative: P12 26 Nov +25% -> +15% (a cut), P13 Jan/Feb, P20 Dec.
  - Deeper or new cuts: everything else.
- **Customizations: no change** on P12, P04 and P09 (live). The other listings were not re-read today; the logs carry no customization entries, but whether the logs record customization changes at all is UNKNOWN.

---

### CRITICAL

**C1. P09 Torrent Lodge has not pushed for over 24 h, and Smoobu is £15 under PriceLabs on 10-11 Nov** (live `get_listing_data`; live Smoobu rates; `kpi_pack.sync_issues`; `prices.csv`)
- `last_date_pushed` **3 Nov 07:37:46Z**, `last_refreshed_at` 3 Nov 07:37:45Z, push_enabled true. P09_PUSH_STATUS
- **Every other Smoobu-priced listing refreshed and pushed at 01:25-01:31Z today**, triggered by Reyhan's edits. P09 had no edit and no refresh.
  - P01 (05:46Z) and P10 (05:54Z) pushed with no edit. Their daily slot works; P09's 07:3xZ slot (2 Nov 07:53Z, 3 Nov 07:37Z) did not repeat.
- **Sync gap, P09 10-11 Nov (consecutive):**

| Night | PriceLabs `price` | Smoobu (live 07:19Z) | Gap |
|---|---|---|---|
| 10 Nov | £115 | **£100** | -£15 |
| 11 Nov | £125 | **£110** | -£15 |
| 12 Nov | £131 | £131 | 0 |

  - On 3 Nov `prices.csv` showed Smoobu = PriceLabs = £117 / £127 on these dates, so Smoobu changed after 3 Nov 07:18Z.
  - **£100 equals P09's PriceLabs minimum.** £110 matches no PriceLabs field.
  - No PriceLabs log entry exists for P09. Its DSO on 4-12 Nov is -5%, min 2 (set 26 Oct; live `get_listing_date_overrides`), and that is already inside £115 / £125.
  - Possible causes, none proven: a manual Smoobu rate entered after 3 Nov 07:18Z; the 3 Nov 07:37Z push carrying different values for these 2 dates; a Smoobu-side rule. "Sync off" is ruled out (push_enabled true). A PriceLabs DSO is ruled out (no log, and the DSO is already in the price).
- P09's 10-12 Nov are its last open nights before the 26 Nov handback. They sell £30 below PriceLabs, the opposite of a-handback-lastnights (+10%).
- **Check:** Smoobu > Rates for Torrent Lodge 10-11 Nov (manual price? who entered it, when?). PriceLabs > 3318172 > Sync history (why no refresh since 3 Nov 07:37Z?). Use "Sync now" on 3318172 only if Corentin wants it (read-only here).

**C2. Tonight, P12 4 Nov: min 1 is fixed and Smoobu = PriceLabs, but the pushed price is £302 against PriceLabs' own £209** (live `get_listing_prices` 2699998; live Smoobu)
- Live PriceLabs: `price` **£302**, `user_price` £209, `uncustomized_price` £178, min 1, demand "Low Demand", refreshed 01:25:11Z. Smoobu: **£302, min 1, available**.
- Yesterday's gap (PriceLabs £196 vs Smoobu £170) is **closed**: Smoobu now equals the pushed price.
- The DSO is +15% (Reyhan 01:24:03Z). +15% on £178 is about £205, close to `user_price` £209. **£302 is 1.70x uncustomized**, and nothing visible explains it.
  - Nights either side: 3 Nov went unsold (no Smoobu stay covers it); 5-11 Nov is booked at £111.06 ADR (PriceLabs `ADR`).
- At £302 for one Low-Demand night, the orphan is unlikely to sell tonight.
- **Check:** PriceLabs > 2699998 calendar, 4 Nov: which final price does it show, and what lifts £209 to £302? (See data gap 3: `price` and `user_price` diverge on 32 open nights today.)

### HIGH

**H1. Reyhan conflicts with standing decisions: three got worse at 01:24-01:31Z, one is mixed, two are unchanged** (`get_user_logs`; live overrides P13; raw prices; `policy.json`)

| Conflict | Policy | PriceLabs now | Prices (4 Nov raw) | vs 3 Nov |
|---|---|---|---|---|
| (a) **P12 17 Nov** | `deprioritised`: Corentin won't change Mile End 17 Nov +50% | **-15%, min 2** (01:24:30Z) | **£218** (uncust £277; 3 Nov £226) | **Worse** (-10% -> -15%) |
| (b) **P11 darts 13-17 Dec** | 21 Oct "average above £300/night" | -5%, min 2 (2 Nov 15:05Z; no edit today) | £229 / £203 / £207 / £218 / £237 = **£1,094, avg £218.80** | Unchanged (3 Nov £1,091) |
| (c) **P13 8-12 Nov** | 24 Oct: set to 0% (Corentin) | **-7%, min 2** (01:26:30Z; live overrides confirm) | 3064856 £160 / £158 / £162 / £166 / £170; 3090701 £180 / £178 / £182 / £187 / £191 | **Worse** (-5% -> -7%). Prices rose anyway because `price` now sits above uncustomized on these dates |
| (d) **P20 base 350 / -5% 31 Oct-19 Nov / min 3 to 30 Nov** | `price_24oct`, `listing_facts.P20.min_stay` | base **330** (no change); **16-19 Nov -5%, min 2** (01:29:27Z) | 16-17 Nov **£227 / £234**; 18-19 Nov now **Blocked** (H4) | Base open; price back to -5% (matches Corentin) but **min 2 is still against min 3** |
| (e) **P04 -8% on 1-25 Nov, min 3** | 24 Oct (Corentin) | **9-24 Nov -15%, min 3** (01:30:39Z) | 9-13 Nov **£148 / £149 / £151 / £154 / £156 = £758** (3 Nov £859) | **Worse** (-10% -> -15%, now 7 points past Corentin's -8%) |
| (f) **P13 base 250** | not in `price_changes` | 250 (recommended 237 / 236) | - | Unchanged |

- Also against plan items (not standing decisions): P08 4-21 Nov -5% and P06 8-14 Nov -5% (a-handback-lastnights / t-p06-open asked for +10%), P05 13-19 Dec -7% (a-p05-dec asked for P75), P13 21-26 Dec -5% (a-peak-check asked for +7%). Details in H3.
- **Check:** PriceLabs > Date Specific Overrides on 2699998 16-25 Nov, 3064856 8-12 Nov, 3562176 9-24 Nov, 3547481 16-19 Nov (min stay), and 3547481 > Base. Corentin to confirm each.

**H2. a-discount-cut: the measured gap narrowed, but only because uncustomized prices fell and nights sold; open-night prices fell** (raw `price` vs `uncustomized_price` on PriceLabs-open nights; same method and exclusions as 3 Nov: handback nights excluded, P05 9 Nov and P04 2 Dec excluded, P13 netted, P06 and P14 excluded)
- Layers (live today: P12, P04, P09) are **identical to 3 Nov**: P04 -5% gradual last-minute, Aggressive occupancy, Booking Recency default; P09 -18% gradual last-minute, Booking Recency off (so the default applies); P12 0% last-minute, Custom occupancy. P05, P11, P13, P20 and P06: NOT re-read today (3 Nov values in yesterday's section).

| Ref | Next 14 (4-17 Nov) now | 3 Nov raw, same dates | Next 30 (4 Nov-3 Dec) now | 3 Nov raw, same dates |
|---|---|---|---|---|
| P12 | 3 n £666 vs £826, **-19.4% (£160)** + 4 Nov **+£124 premium** | £140 | 10 n £2,303 vs £2,966, **-22.4% (£663)** + 4 Nov +£124 | £492 |
| P04 | 5 n £758 vs £1,070, **-29.2% (£312)** | £240 | 12 n £1,960 vs £2,709, **-27.6% (£749)** | £568 |
| P11 | 4 n £865 vs £1,027, -15.8% (£162) | £189 | 15 n £3,132 vs £3,618, -13.4% (£486) | £574 (20 n; £430 on today's 15 open nights) |
| P20 | 9 n £2,008 vs £2,288, -12.2% (£280) | £389 | 14 n £3,507 vs £4,024, -12.8% (£517) | £607 (16 n) |
| P05 | 2 n £761 vs £974, -21.9% (£213) | £226 | 6 n £2,906 vs £3,293, -11.8% (£387) | £415 |
| P13 3064856 | 6 n £1,009 vs £929, **+8.6%** (-£80) | £61 | 8 n £1,654 vs £1,471, +12.4% (-£183) | -£40 |
| P13 3090701 | 6 n £1,135 vs £1,176, -3.5% (£41) | £69 | 8 n £1,603 vs £1,586, +1.1% (-£17) | £24 |
| P09 | 3 n £371 vs £397, -6.5% (£26) | £24 | same (handback) | |
| P08 | 3 n £539 vs £520, +3.7% (-£19) | -£17 | same (handback) | |
| P06 (8-11 Nov) | 4 n £956 vs £966, -1.0% (£10) | £80 | same | |

- **Net uncustomized minus final, P06 and P14 excluded, P13 netted:**
  - **Next 14: £971** (yesterday **£1,330**). On 5-17 Nov only: £1,095 vs £1,321 in 3 Nov raw.
  - **Next 30: £2,485** (yesterday **£2,656**). On 5 Nov-3 Dec only: £2,609 vs £2,647.
  - The P12 4 Nov £302-vs-£178 premium (C2) takes £124 off both totals. Without it: £1,095 / £2,609.
- **Why it narrowed although Reyhan cut deeper:**
  - P12 (+£171 on next 30) and P04 (+£181) widened with the -15% DSOs.
  - P13 3064856's pushed price now sits above uncustomized (-£143 swing).
  - P20's uncustomized fell about £40-£50 a night (6-9 Nov £203-£249 vs £249-£286 yesterday).
  - P11 lost 5 open nights to the 26-29 Nov booking and to PriceLabs now seeing 20-21 Nov.
- **Absolute open-night prices are lower than yesterday:** P04 9-13 Nov **£758** (£859); P20 6-9 Nov **£858** (£931); P08 5-7 Nov **£539** (£594); P06 8-11 Nov **£956** (£987); P12 12-13 Nov **£448** (£461).
- **Check:** PriceLabs > listing > Customizations on 3562176 (last-minute -5%, Aggressive occupancy), 3318172 (-18% last-minute), Booking Recency on all. To get no adjustment, a layer must be set to "Custom 0%"; switching the toggle off lets the PriceLabs default apply.

**H3. Plan items on the PriceLabs side: only t-p12-4nov's min 1 was done; four items moved the wrong way** (raw 4 Nov vs 3 Nov; logs)

| Item | Status 4 Nov | Numbers |
|---|---|---|
| **t-p12-4nov** | **Min fixed** (4 Nov min 1, +15%, Reyhan 01:24:03Z). Price question in C2 | £302 pushed; Smoobu £302 |
| **t-p13-3nov** | **Passed unsold.** No Smoobu stay covers 3 Nov (`reservations.csv`). The P13 Airbnb 4-8 Nov stay arrives today | ~£124 lost (3 Nov price) |
| **a-raise-1012nov** (3064856 12 Nov >= £176, min 1) | **Not done.** 3064856 12 Nov **£170, min 2** (up from £151 through the algorithm, not an edit; the DSO went to -7%). 3090701 **£191** (>= £183 met) | £6 short; min stay not changed |
| **a-handback-lastnights** (+10% P08 5-7 Nov, P09 10-12 Nov) | **Wrong way.** P08 got **-5% on 4-21 Nov** (01:28:45Z): 5-7 Nov **£168 / £186 / £185 = £539** (was £594). P09: no edit; PriceLabs £115 / £125 / £131, Smoobu **£100 / £110** / £131 (C1) | P08 -£55; P09 -£30 vs PriceLabs |
| **a-p04-dec** (14-19 Dec DSO 0%, about £1,286; 8 Dec >= £193) | **Not done.** 14-19 Dec **£182 / £185 / £187 / £189 / £197 / £203 = £1,143** (3 Nov £1,157). 8 Dec **£180** | £143 below target; 8 Dec £13 short |
| **a-p05-dec** (7-8 Dec about £1,184; 13-21 Dec about £5,857) | **Wrong way.** 13-19 Dec DSO -5% -> **-7%** (01:27:55Z). 7-8 Dec **£476 / £457 = £933** (£970). 13-21 Dec **£5,274** (£5,453) | -£37 / -£179 vs 3 Nov |
| **t-p12-26nov-price** (0% would be about £303) | **Partly.** DSO +25% -> **+15%**, min 1 (01:24:21Z): **£311** (uncust £298; `user_price` £345) | £41 lower than 3 Nov's £352; still +4% over uncust |
| **a-p13-twin** (keep about a 2% gap) | **Gap now exists.** 7-20 Dec: 3064856 £197-£225, 3090701 £209-£239, i.e. 3090701 is £8-£14 (4-7%) dearer each night (identical on 3 Nov). 21-26 Dec: £216-£223 vs £224-£236 | Gap is wider than about 2%; no edit drove it (both copy the same parent DSO) |
| **a-peak-check** (P13 Christmas +5% / +7%; P05 29 Dec to 0%) | **Wrong way for P13.** 21-26 Dec now -5%, min 3. 3064856 21-26 Dec **£1,299** (3 Nov £1,399). P05 29 Dec still +100%, min 1: **£1,277** (uncust £1,039). P05 9 Nov **£1,411** (+300%, min 1) | -£100 on P13 Christmas |
| **a-p13-record** | Nothing recorded; conflicts (a), (c), (d), (e) got worse (H1) | - |
| **a-discount-cut** | Layers unchanged; gap £971 / £2,485 (H2) | - |
| **P11 12-13 Dec reopened** | **Yes.** PriceLabs open (raw, refreshed 01:26Z), Smoobu available: **£321 / £229, min 2** (the cancelled booking was priced £323 + £228) | - |
| **P11 26-29 Nov booking** | **Seen** by PriceLabs (`booked_date` 2026-11-03). The 20-22 Nov booking is now seen too | - |
| **t-channel-gaps** (P11 23 Dec >= £316) | **Below target.** 23 Dec **£298** after Reyhan's +5% (it was £314 on 3 Nov; the earlier DSO value is NOT CHECKED); 24-25 Dec £290 / £302 | £18 short |

### MEDIUM

**M1. P20 18-19 Nov newly Blocked, while 20-22 Nov (the policy delivery block) is still open** (`prices.csv` 3 vs 4 Nov; live Smoobu; `reservations.csv`)
- 18-19 Nov: open on 3 Nov at £295 / £293. Today they are **"Blocked" in PriceLabs** and **unavailable in Smoobu**. No reservation covers them.
- 20-22 Nov: open in PriceLabs and in Smoobu at **£300 / £305 / £291, min 3**. `listing_facts.P20.block_20_21_nov` says "Smoobu block 20-22 Nov = delivery (Corentin 24 Oct). Intentional".
- **Question:** was the delivery block placed on 18-19 Nov instead of 20-22 Nov (moved date?), or are these two separate blocks? Who blocked them is UNKNOWN; the block is not a PriceLabs action.

**M2. New Jan-Feb 2027 DSOs set min stays below the policy's 5 nights at 2+ months** (logs)
- Jan 2027 min 3: P04 (2-31 Jan), P20 (1-31 Jan), P13 (2-31 Jan). Feb 2027 min 4: P04, P20, P05.
- P13 Feb has **no min stay** set in the DSO, so the profile applies (value UNKNOWN).
- Policy: 5 nights if 2+ months ahead (from 4 Jan) and 7 if 4+ months ahead (from 4 Mar). All these dates are 2-4 months out, so 5 applies. Prices are outside the raw window (ends 3 Jan): NOT CHECKED.
- **Check:** DSO 2 Jan-28 Feb on 3562176, 3547481, 3064856 (+3090701) and 3166592 (min stay).

**M3. Min stay vs policy and short gaps** (`prices.csv`, PriceLabs-open nights, handback nights excluded)
- **Below 2:** P12 4 Nov (tonight orphan, C2) and 26 Nov; P13 17 Nov, 27 Nov and 1 Dec (1 Dec intentional; 3064856 £193 / £335 / £310, 3090701 £217 / £243 / £225); P05 9 Nov and 29 Dec; P04 2 Dec (deprioritised).
- **Above 3 inside 2 months:** P20 25-26 Dec min 4 (no DSO; profile UNKNOWN) and 27-28 Dec min 6, 29-31 Dec min 5. Unchanged.
- **Short open runs a gap-fill rule would sell** (`kpi_pack.gaps` is [] for all):
  - P12 12-13 Nov (£199 / £249, min 2) and 30 Nov-2 Dec (£203 / £208 / £217, min 2).
  - P11 18-19 Nov (£159 / £174, min 2) and 23-25 Dec (£298 / £290 / £302, min 3 / 2 / 2).
  - P05 16-17 Nov (£373 / £388) and 7-8 Dec (£476 / £457), both min 2.
  - P09 10-12 Nov (C1). P08 5-7 Nov (£168 / £186 / £185, min 2).
  - P13 25-26 Dec: min 3 with 27 Dec taken by the 3090701 stay, so arrivals on 25 or 26 Dec cannot fit (unchanged).

**M4. Floor / ceiling** (`kpi_pack.bounds`)
- 0% at min and 0% at max on every priced listing. P14 73.3% at the £500 minimum (special setup: numbers only).
- The 180-day check is NOT POSSIBLE, because raw ends 3 Jan.

**M5. Base vs market and recommended** (`listings.csv`; latest rows in `data/snapshots/2026-11-03/market.csv`, Nearby Listings, bedroom-matched, horizon unstated, cleaning inclusion unknown; P13 from today's `raw/neighbourhood_P13.json`, 2 BR n=117)

| Ref | Base | PL recommended | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|---|
| P01 | £253 | £255 | £258 (2 Nov) | -1.9% | £331 | -23.6% |
| P04 | £220 | **Unavailable** | £170 (3 Nov) | +29.4% | £218 | +0.9% |
| P05 (4 BR) | £550 | £544 | £573 (3 Nov) | -4.0% | £714 | -23.0% |
| P06 | £357 | £357 | £405 (2 Nov) | -11.9% | £507 | -29.6% |
| P09 | £176 | £176 | £132 (2 Nov) | +33.3% | £160 | +10.0% |
| P11 | £286 | £283 | £288 (3 Nov) | -0.7% | £330 | -13.3% |
| P12 | £284 | **£284** (was £273) | £205 (3 Nov) | +38.5% | £242 | +17.4% |
| P13 | £250 | £237 / £236 | £222 (4 Nov) | +12.6% | £279 | -10.4% |
| P20 | £330 | £347 | £249 (3 Nov) | +32.5% | £314 | +5.1% |

- **P04's recommended base reads "Unavailable"** (live `get_listing_data` and `listings.csv`, since at least 3 Nov). PriceLabs gives no base benchmark for Barking. Question: does the listing (Smoobu since 20 Oct) lack enough history? Check PriceLabs > 3562176 > Base price help.
- P08, P10 and P14 have no market row: UNKNOWN.
- **Running effect of the 18 Oct rises** (P01, P05, P06, P09, P11, P12; `reservations.csv`, confirmed, by booked date):
  - 4-18 Oct: **13 bookings, 91 n, £18,199.03, ADR £200**.
  - 19 Oct-3 Nov: **15 bookings, 51 n, £10,710.73, ADR £210** (through 2 Nov: 14 / 48 / £10,030.33).
  - 3 Nov added P11 26-29 Nov (+3 n, +£680.40). P11 12-14 Dec (£486.68) was booked and cancelled the same day, so it is excluded.
  - Cancelled bookings made 19 Oct-3 Nov in these flats: 2 / 6 n / £1,603.67.
  - Inventory is smaller (P01 sold out, handbacks). Do not over-read.

**M6. Min/max vs info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`, mtime 13 Oct): **no change** vs 3 Nov. Mins match PriceLabs for P01-P13. P14 pack 400 vs PriceLabs 500 (special setup). Pack bases and "high" values are older (e.g. P05 455 vs 550; P20 not in the pack). **The pack is out of date**, not PriceLabs.

**M7. Listing hygiene** (live `get_listing_data` 07:18Z; `data/id_map.json`)
- **`_unmatched`:** the three Marylebone Vrbo listings (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are still absent from the 20 PriceLabs listings. **Question:** removed on purpose? If so, drop them from `id_map.json`.
- **`confidence: check`:**
  - P03 is priced via **Channex**: push on, last push 4 Nov 03:28:37Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing** (t-unmapped). **Question:** connect the second Smoobu and PriceLabs accounts?
- **P02 Vrbo copy `_units_0004_ca1ccf61`:** push on, last push **24 Feb 2026**, `last_refreshed_at` null. **Question:** turn push off or remove it?
- **Vrbo copies (P11 `_7fd3…`, P12 `_386e…`, P13 `_3d48…`)** received every one of today's parent DSOs and pushed separately (01:37:45Z, 01:26:22Z, 01:49:46Z).
- **id_map lists `pricelabs_other` ids that are not in PriceLabs today:**
  - P01 `d1f3bd96…`, P08 `10339b41…`, P09 `e36cf9e9…`, P10 `babeec20…`, P04 `_units_0001_20df1e73…`, P13 `_units_0001_d0a5f202…` and `_125c15c5…`.
  - **Question:** removed? If so, update `id_map.json`.
- P13 3064856 and 3090701 share coordinates (51.5088201, -0.2342476). Policy says they are one flat: fact only.

### Open plan items: status 4 Nov (PriceLabs side)

| Item | Status |
|---|---|
| t-push-check | **P09 not pushed since 3 Nov 07:37Z; Smoobu -£15 on 10-11 Nov (C1).** P12 4 Nov gap **closed** (both £302). All other Smoobu listings pushed 01:25-01:31Z (edit-triggered), P01 05:46Z, P10 05:54Z |
| t-p12-4nov | Min 1 done; £302 vs `user_price` £209 (C2) |
| t-p13-3nov | Passed unsold |
| a-p13-record | Not recorded; P12 17 Nov, P13 8-12 Nov, P04 9-24 Nov worse; P20 16-19 Nov -5% but min 2; P20 base 330 open (H1) |
| a-discount-cut | Gap £971 (next 14) / £2,485 (next 30) vs £1,330 / £2,656; layers unchanged; absolute prices lower (H2) |
| a-raise-1012nov | Not done (£170, min 2) |
| a-handback-lastnights | Wrong way (P08 -5%; P09 Smoobu £100 / £110) |
| a-p04-dec / a-p05-dec | Not done / wrong way (P05 13-19 Dec -7%) |
| t-p12-26nov-price | Partly (+15%, £311) |
| a-p13-twin | 4-7% gap now present in December |
| a-peak-check | P13 21-26 Dec -5% (wrong way); P05 29 Dec / 9 Nov unchanged |
| P11 12-13 Dec | Reopened (£321 / £229) |
| t-p20-delivery | 20-22 Nov still open (£300 / £305 / £291); 18-19 Nov blocked instead (M1) |
| t-p04-doublebook, a-airbnb-rules, t-channel-gaps (Booking.com side), a-p05-earlybird, t-p11-commission | OTA side: NOT CHECKED here. PriceLabs shows P04 3-8 Nov as booked |

Data gaps:
1. The raw window is **5 Nov-3 Jan**. Tonight (4 Nov) comes from a live call for P12 only; Smoobu shows every other listing unavailable tonight. The 180-day floor/ceiling check, the Jan-Feb DSO prices and the 5-night / 7-night rules beyond 3 Jan are NOT CHECKED.
2. `kpi_pack.json`: `market_percentiles` null and market/comps/channel_checks empty, so base vs market uses the 2-3 Nov `market.csv` rows. P08, P10 and P14 have no market row.
3. **`price` vs `user_price` diverge on 32 of 85 PriceLabs-open nights in next 30** (4 Nov raw; on 3 Nov: 8 of 93). Range: P12 4 Nov **+£93** (£302 vs £209) to P12 26 Nov **-£34** (£311 vs £345); P11 19 Nov £174 vs £146. Smoobu matches `price` on every date, so `price` is what reaches the channels. What `user_price` represents and why the two diverge is UNKNOWN. All gap figures use `price`.
4. The cause of the P09 10-11 Nov Smoobu £100 / £110 is UNKNOWN (C1), and so is why P09 skipped its refresh.
5. Who blocked P20 18-19 Nov is UNKNOWN (M1).
6. Not re-read live today: customizations on P05, P06, P11, P13, P20 and the rest; overrides on P04, P05, P06, P08, P11, P12, P20 and the Vrbo copies (today's state comes from the logs plus raw prices). P11's DSO values on 23-25 Dec before 01:25Z: NOT CHECKED.
7. One pair of `get_user_logs` calls (group, account) ran in parallel, against the one-at-a-time rule. Both returned 200 and empty.

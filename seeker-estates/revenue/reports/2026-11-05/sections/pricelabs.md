## PriceLabs audit (D = 2026-11-05)

**Sources**
- Snapshot `data/snapshots/2026-11-05/`: `raw/listing_data.json` (06:56Z), `raw/prices_*.json` (06:57-07:11Z, window **6 Nov 2026 - 4 Jan 2027**), `prices.csv`, `listings.csv`, `reservations.csv` (Smoobu, room only, cleaning excluded), `market.csv`. Yesterday: `data/snapshots/2026-11-04/` and `reports/2026-11-04/sections/pricelabs.md`.
- **Live PriceLabs calls (read-only), 5 Nov 07:14-07:3xZ:**
  - `get_listings` for 3288517, 3318172, 3318177 and 3320302.
  - `get_listing_data` for all 20 listings (07:14Z).
  - `get_listing_prices` for P09 3318172 (6-30 Nov) and P06 3288517 (6-15 Nov).
  - `get_user_logs`: listing, group and account for 4-5 Nov, plus listing logs for the four no-data ids over 6 Oct-5 Nov.
  - `get_listing_date_overrides` for P09, P06 (Nov) and P12 (5 Nov-13 Dec).
  - `get_customizations` for P09 and P04.
  - `get_listing_health_and_recommendations` for P06.
  - **Rule breach:** `get_listing_prices` (P09) and `get_listing_data` ran as a parallel pair. Both returned 200. Every other call ran one at a time.
- **Live Smoobu GET** (read-only):
  - `/api/rates` for all 15 apartments, 5 Nov 2026-4 May 2027, at **07:13:45Z**. Saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live05pl/smoobu_rates_a.json` (no guest data).
  - `/api/apartments` (all four no-data apartments are still listed).
  - Reservation ids and times come from the Dispatcher's guest-free extract `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live05/smoobu_mod05_pe.json`.
  - Three other agents pulled Smoobu rates at 07:13-07:14Z. All three show the same P06 values.
- `kpi_pack.json`: `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are all **null**, so every check below was recomputed from raw + live Smoobu.
- Policy respected:
  - P02/P03/P06/P07 blocks, P14 special setup, handbacks (P01 20 Dec, P08 13 Nov, P09 26 Nov, P10 18 Nov, P12 13 Dec), P13 1 Dec intentional, P13 = one flat, and the deprioritised items (P12 17 Nov, P04 2 Dec).
  - Where Reyhan's edits cross a standing decision, they are reported as conflicts for Corentin to confirm. They are not new proposals.

### What changed since 4 Nov 06:00Z
- **`get_user_logs` (listing): 1 entry.** **4 Nov 12:52:23Z, reyhan@: P06 3288517 DSO 15-22 Nov, `price_type` fixed with no price value, min stay 2.**
  - Live overrides confirm 15-22 Nov carries min stay 2 and no price.
  - Smoobu keeps 15-22 Nov unavailable, so nothing opened.
  - P06 pushed 31 s later (12:52:54Z). It has not pushed since.
- Group and account logs: 0 entries.
- No `base_price`, `min_price` or `max_price` entry. `listings.csv` 5 Nov vs 4 Nov: base, min, max and recommended base are unchanged on all 20 listings. P04 recommended base still reads **"Unavailable"**.
- Customizations: P04 and P09 are identical to 4 Nov. P04: last-minute -5% gradual, Aggressive occupancy, Booking Recency default, Conservative demand. P09: -18% gradual last-minute, Booking Recency off (default applies), Moderately Aggressive demand.
- P12 overrides are identical to the 4 Nov log entries (the 3 Dec DSO is -15%, min 2).
- **Pushes overnight without any edit.** Every Smoobu listing that has data pushed at 01:21-01:32Z, except P14 (06:01Z) and P07 (06:10Z). P02 pushed at 00:24Z and P03 (Channex) at 03:48Z. With no log entries overnight, ~01:20-01:32Z looks like the nightly cycle. Yesterday's 01:2x pushes were attributed to Reyhan's edits; that attribution now looks partly wrong.

---

### CRITICAL

**C1. P06 Marylebone, 9 Nov is on sale in Smoobu at £2 a night (min 2). 8 Nov sits at the £200 floor** (live Smoobu 07:13:45Z, confirmed by three other agents' pulls at 07:13-07:14Z; `smoobu_rates_0404.json` 4 Nov 07:19Z; `data/snapshots/2026-11-04/raw/prices_3288517.json`)

| Night | Smoobu now | Smoobu 4 Nov 07:19Z | PriceLabs 4 Nov raw (`price` / uncustomized) | PriceLabs today |
|---|---|---|---|---|
| 8 Nov | **£200** (= PriceLabs min) | £228 | £228 / £222 | NOT AVAILABLE (LISTING_NO_DATA) |
| **9 Nov** | **£2** | £233 | £233 / £233 | NOT AVAILABLE |
| 10 Nov | £241 | £241 | £241 / £246 | NOT AVAILABLE |
| 11 Nov | £255 | £254 | £254 / £265 | NOT AVAILABLE |

- 8-11 Nov are P06's only available nights in the Smoobu 5 Nov-4 May window. They now total **£698** (4 Nov: £956). A 2-night stay on 8-10 Nov costs **£202 room** (plus the channel markup).
- **What changed after 4 Nov 07:19Z** (Smoobu diff):
  - 20 P06 dates changed. 15-22 Nov min stay moved from 3/4 to **2**, which exactly matches Reyhan's 12:52:23Z DSO.
  - Nine dates moved by £1-£2.
  - 8 Nov fell to £200 and 9 Nov to £2.
  - The only PriceLabs push in that window was at 12:52:54Z. The £2 most likely arrived with that push. A manual Smoobu edit in the same window cannot be ruled out: Smoobu has no rate history over the API.
- **£2 is below P06's PriceLabs minimum of £200.** A normal PriceLabs calculation cannot produce it. The live DSO on 9 Nov is -5% (percent, 4 Nov 01:28Z) and carries no fixed price. After this push the listing returns LISTING_NO_DATA (C2).
- **Reconfirmed live at 07:20:47Z** (second Smoobu pull, `smoobu_rates_b.json`): 8 Nov £200, **9 Nov £2**, 10 Nov £241, 11 Nov £255, all min 2 and available.
- **Most likely source, from logs and overrides (read-only).**
  - The P06 actions since the last good data are Reyhan's -5% DSO on 8-14 Nov (4 Nov 01:28:22Z) and a "fixed"-type DSO on 15-22 Nov with no price (12:52:23Z). The push followed at 12:52:54Z.
  - Live overrides show 9 Nov = **-5% percent, min 2**. No fixed price sits on 9 Nov.
  - The 12:52Z DSO covers 15-22 Nov, not 8-9 Nov. Earlier price-less "fixed" DSOs on P06 did not produce sub-minimum prices: 17 Oct on 5-7 Nov (now £270 / £290 / £295) and 27 Oct on 9-15 Nov (later overwritten on 8-14 Nov; 4 Nov raw had 9 Nov £233).
  - **No log entry or override explains £2 or £200.** The £2 arrived between 4 Nov 07:19Z and 5 Nov 07:13Z. The 12:52:54Z push is the only recorded write to P06 in that window. It is the most likely carrier, but this is not proven.
- **Link to LISTING_NO_DATA: timing only, not proven causal.**
  - The 12:52:54Z push is P06's last before its price data disappeared.
  - But P01, P09 and P10 went into the same state with no edit at all (last activity: pushes at 05:46Z, 05:54Z and 07:27Z on 4 Nov). So the edit is not needed to explain the failure.
  - Whether P06's recalculation was already failing when it pushed (writing a corrupt £2 and the £200 floor) is UNKNOWN. Question for PriceLabs support.
- Policy: P06 is an intentional block, but 8-11 Nov is open on purpose (Reyhan DSOs, t-p06-open). A £2 night is a pricing fault, not a blocked-night question.
- **Check now:**
  - Smoobu > Marylebone 3288517 > Rates, 9 Nov (and 8 Nov): set the correct rate, or close the night.
  - Booking.com / Airbnb: confirm what each channel shows for 8-10 Nov.
  - PriceLabs > 3288517 > Calendar and Sync history for the 4 Nov 12:52Z push.
  - Possible causes, none proven: PriceLabs data failure at the 12:52Z recalculation, a manual Smoobu override, a Smoobu-side rule, or a push failure.

**C2. Four listings return "Listing data does not exist in PriceLabs" (LISTING_NO_DATA). They are not removed, but they have had no price data and no push since 4 Nov** (live `get_listings`, `get_listing_data` 07:14Z, `get_listing_prices` P09 and P06 today plus three Dispatcher calls, `get_user_logs`, overrides/customizations, Smoobu `/api/apartments` and `/api/rates`)

| Ref | Listing | Last push (`last_date_pushed`) | Age at 07:14Z | `last_refreshed_at` | Smoobu available nights, 5 Nov-4 May (what is on sale) | Smoobu vs last PriceLabs |
|---|---|---|---|---|---|---|
| P06 | 3288517 | 4 Nov 12:52:54Z | 18 h 21 m (24 h at 12:52Z today) | null (4 Nov: 01:29:01Z) | 8-11 Nov **£200 / £2 / £241 / £255**, min 2 | 8-9 Nov changed after the last raw (C1) |
| P09 | 3318172 | 4 Nov 07:27:40Z | 23 h 46 m (**24 h at 07:27:40Z today**) | null | 10-12 Nov **£113 / £122 / £129**, min 2 (handback 26 Nov). Also **25 Apr 2027 £458, min 5** (after the handback; see M6) | Equals what the 4 Nov 07:27Z push wrote (pricelabs 4 Nov T1). No change since |
| P10 | 3318177 | 4 Nov 05:54:26Z | **25 h 20 m** | null | **0** (handback 18 Nov) | No Smoobu change since 4 Nov 07:19Z |
| P01 | 3320302 | 4 Nov 05:46:57Z | **25 h 27 m** | null | **0** (handback 20 Dec; 30 Nov-17 Dec blocked) | No Smoobu change since 4 Nov 07:19Z |

- **Evidence that these listings are still in PriceLabs:**
  - `get_listings` returns all four (same `parent_key`, group -1).
  - `get_listing_data` shows `push_enabled` true and `isHidden` false. Occupancy, ADR and recommended base are still populated (e.g. P06 recommended £357, P09 £176).
  - `get_listing_date_overrides` (P09, P06), `get_customizations` (P09) and `get_listing_health_and_recommendations` (P06) all answer normally.
  - Smoobu `/api/apartments` still lists all four.
  - Listing logs from 6 Oct to 5 Nov contain no removal, unlink, remap or sync-toggle entry for these ids. The last entry is P06's DSO at 4 Nov 12:52:23Z.
- **Conclusion: this is a price-data failure, not a removal or unlink.**
  - The price calendar is gone (`last_refreshed_at` null) and pushes have stopped.
  - **Smoobu still sells the last-pushed prices**, including P06's £2.
  - The cause is UNKNOWN. These four were not the only near-fully-blocked listings: P02, P03 and P07 are fully blocked and still refreshed and pushed normally overnight.
  - Whether the failure is temporary cannot be said until a refresh lands.
- **Impact today:**
  - P01 and P10: no sellable nights, so nothing mispriced is on sale.
  - P09: three last nights at £364 total, frozen at the 4 Nov push.
  - P06: the £2 night (C1).
- **Check:**
  - PriceLabs > each of 3288517, 3318172, 3318177, 3320302 > open the listing: does the calendar load?
  - Use "Sync Now" (Corentin's action; not done here). If the calendar is still empty, raise LISTING_NO_DATA with PriceLabs support and quote the ids and `last_refreshed_at` null since 4 Nov.
  - **PUSH-CHECK-P09 PLACEHOLDER**

### HIGH

**H1. P12 3-7 Dec: the cancellation and the new booking** (`reservations.csv` 5 vs 4 Nov; Smoobu extract ids/times, no guest data; raw `prices_2699998.json` refreshed 01:25:58Z; live Smoobu; live P12 overrides)
- **Cancelled:** Smoobu id **161902221**, Booking.com 3-7 Dec. Created 29 Oct 21:04. Cancellation recorded 5 Nov 00:58:16. Room **£1,072.44** (£268.11/n), commission £183.37.
- **New:** Smoobu id **162667435**, Booking.com 4-7 Dec. Created 5 Nov 06:48, modified 06:50:15. Room **£677.79** (£225.93/n), commission £124.17.
  - It is a different reservation id, created 5 h 50 m after the cancellation, on the same channel.
  - Whether it is the same guest shortening their stay is NOT CHECKED (no guest data used).
  - Net: **-1 night, -£394.65 room.**
- **Price at booking.** PriceLabs refreshed at 01:25:58Z, after the cancellation and before the new booking. It priced 4-6 Dec at **£267 / £276 / £226 = £769** (uncustomized £358 / £373 / £259; DSO -15%). The room paid is 0.881x that. Booking.com markup and promotions sit in between, so this is not a leak finding.
- **PriceLabs has not yet seen the new booking.** Raw still shows 4-6 Dec open; Smoobu has them unavailable. This is the only PriceLabs-vs-Smoobu availability mismatch today. It is timing, not a sync fault.
- **3 Dec is open at £253, min 2** (Smoobu = PriceLabs). **It is not a 1-night orphan.** It closes a 4-night run, 30 Nov-3 Dec: **£232 / £238 / £246 / £253 = £969**, min 2 on each night, DSO -15% (uncustomized £298 / £308 / £321 / £333).
  - 27-30 Nov and 4-7 Dec are booked.
  - 7-13 Dec (7 nights, £223-£279) is open up to the handback.
- 18 Oct base-rise tracker (P12 is one of the six):
  - Both bookings were made after 18 Oct. If yesterday's +11 n / +£2,540.09 counted the 3-7 Dec booking, today's figure is **+10 n / +£2,145.44**.
  - The "corrected method" itself was not re-run here: NOT CHECKED.

**H2. Reyhan's conflicts with standing decisions: no change since 4 Nov, and absolute prices kept falling on P04** (`get_user_logs`; live P12 overrides; raw today vs 4 Nov; `policy.json`)

| Conflict | Policy | PriceLabs now | Prices today (4 Nov raw) |
|---|---|---|---|
| P04 1-25 Nov -8%, min 3 | 24 Oct (Corentin) | **9-24 Nov -15%**, min 3 | 9-13 Nov **£139 / £140 / £144 / £145 / £147 = £715** (£758). Uncustomized £197-£230 |
| P13 8-12 Nov 0% | 24 Oct | **-7%**, min 2 | 3064856 £159 / £159 / £162 / £167 / £168 = **£815** (£816) |
| P12 17 Nov +50% (deprioritised: won't change) | 24 Oct | **-15%**, min 2 | **£219** (uncustomized £276) |
| P20 16-19 Nov min 3 / base 350 | `listing_facts.P20`, `price_24oct` | 16-19 Nov -5%, **min 2**; base **330** | 16-17 Nov £220 / £223 (£227 / £234). 18-19 Nov Blocked |
| P11 darts 13-17 Dec avg > £300 | 21 Oct | -5%, min 2 (set 2 Nov) | £227 / £203 / £210 / £219 / £239 = **£1,098, avg £219.60** |
| Jan-Feb min stays | policy 5 nights at 2+ months | min 3 (Jan) / min 4 (Feb) on P04, P20, P13, P05 | See M3 |

- **a-p13-record: NOT done.** Nothing was edited or recorded since 4 Nov 01:31Z. Corentin still needs to confirm each conflict.
- **Check:** PriceLabs > Date Specific Overrides on 3562176 (9-24 Nov), 3064856 (8-12 Nov), 2699998 (16-25 Nov), 3547481 (16-19 Nov min stay) and 3547481 > Base.

**H3. a-discount-cut, recomputed: next 14 £1,041, next 30 £2,285 (yesterday £971 / £2,485)** (raw `price` vs `uncustomized_price` on nights that are PriceLabs-open AND Smoobu-available; handback nights excluded; P05 9 Nov and P04 2 Dec excluded; P13 netted; window 5-18 Nov / 5 Nov-4 Dec)
- **Excluded today:**
  - P06, P09, P10, P01: no PriceLabs data (C2). P09 contributed £26 to yesterday's figure. P06 was excluded yesterday too. P01 and P10 had no open nights.
  - P14: special setup.
  - P12 4-6 Dec: PriceLabs shows them open, Smoobu shows them booked.

| Ref | Next 14 | Next 30 | Same nights in 4 Nov raw (gap n30) |
|---|---|---|---|
| P04 | 6 n £862 vs £1,293, **-33.3% (£431)** | 12 n £1,874 vs £2,699, **-30.6% (£825)** | £749 (**wider**) |
| P12 | 4 n £914 vs £1,140, -19.8% (£226) | 11 n £2,673 vs £3,327, -19.7% (£654) | £745 |
| P11 | 5 n £1,022 vs £1,226, -16.6% (£204) | 16 n £3,428 vs £3,856, -11.1% (£428) | £509 |
| P05 | 2 n £766 vs £946, -19.0% (£180) | 6 n £2,904 vs £3,236, -10.3% (£332) | £387 |
| P20 | 9 n £1,964 vs £2,073, -5.3% (£109) | 14 n £3,346 vs £3,672, -8.9% (£326) | £517 |
| P13 3064856 | 6 n +6.1% (-£58) | 8 n +10.8% (-£161) | -£183 |
| P13 3090701 | 6 n +2.3% (-£26) | 8 n +6.2% (-£94) | -£17 |
| P08 | 2 n £350 vs £325, +7.7% (-£25) | same | -£2 |
| **Total** | **£1,041** | **£2,285** | **£2,705** on the same nights |

- **Why the gap narrowed:**
  - On the same nights, the gap fell £420 (n30) since yesterday. The drop is mostly P20, where uncustomized fell (e.g. 20 Nov uncustomized £274, final **£238**; 4 Nov final £300), then P12 and P11.
  - The window shift dropped P12 4 Nov (+£124 premium) and P09 out.
- **P04 is the exception: its gap widened** (£749 -> £825), and its prices fell again with no edit (9-13 Nov -£43).
- Layers are unchanged: P04 -5% last-minute, Aggressive occupancy, Booking Recency default; P09 -18% last-minute. Others were not re-read today.
- **Check:** PriceLabs > 3562176 > Customizations: Last-minute, Occupancy, Booking Recency set to "Custom 0%". Switching a layer off lets the PriceLabs default apply.

**H4. Plan items (PriceLabs side): status 5 Nov**

| Item | Status | Numbers (raw 5 Nov = Smoobu) |
|---|---|---|
| t-push-check (P09 slot) | **Superseded by C2.** P09 has no PriceLabs data and has not pushed since 4 Nov 07:27:40Z. Slot drift: 2 Nov 07:53Z, 3 Nov 07:37Z, 4 Nov 07:27Z, 5 Nov none (see C2) | 10-12 Nov £113 / £122 / £129 frozen |
| t-p12-4nov-price | **Passed unsold.** No Smoobu reservation covers 4 Nov (`reservations.csv`: 30 Oct-1 Nov, then 5-12 Nov) | £302 asked, £0 |
| t-pl-price-divergence | **Probably explained, to confirm.** `user_price` differs from `price` on 68 of 108 open nights (6 Nov-4 Dec, 9 listings). **`user_price` equals the 4 Nov raw `price` on 96 of 108 nights, including 56 of the 68 that differ.** So "Your Price" / `booked_price` looks like the previous cycle's price, one refresh behind. Smoobu = `price` on every comparable night | e.g. P20 20 Nov `price` £238, `user_price` £300 = 4 Nov price; P12 30 Nov-2 Dec £232/£238/£246 vs £203/£208/£217 = 4 Nov prices |
| a-p13-record | Not done (H2) | - |
| a-discount-cut | Not done. £1,041 / £2,285 (H3) | - |
| a-raise-1012nov (3064856 12 Nov >= £176, min 1) | **Not done.** £168, min 2 (4 Nov £170). 3090701 £189 (target >= £183 met) | £8 short |
| a-handback-lastnights (+10%) | **Wrong way / frozen.** P08: 5 Nov **£159** (Smoobu, tonight), 6-7 Nov **£175 / £175** = **£509** (4 Nov: £168 / £186 / £185 = £539; 3 Nov £594). DSO -5% 4-21 Nov is unchanged. P09: £364 frozen (C2) | P08 -£30 vs yesterday |
| a-p04-dec (14-19 Dec ~£1,286; 8 Dec >= £193) | **Not done.** 14-19 Dec £182 / £185 / £187 / £189 / £197 / £203 = **£1,143** (unchanged). 8 Dec **£182** | £143 short; £11 short |
| a-p05-dec (7-8 Dec ~£1,184; 13-21 Dec ~£5,857) | **Not done.** 7-8 Dec £477 / £458 = **£935**. 13-21 Dec **£5,299** (4 Nov £5,274). 13-19 Dec DSO -7% stays | -£249 / -£558 vs target |
| a-peak-check | **Not done.** P13 21-26 Dec -5%, min 3: 3064856 **£1,298**, 3090701 £1,373. P20 21-26 Dec -5%: **£1,735** (£1,705). P05 29 Dec +100%, min 1: **£1,322** (uncustomized £1,063). P05 9 Nov **£1,403**, min 1 (uncustomized £369) | - |
| t-p12-26nov-price | **Unchanged.** +15%, min 1: **£316** (uncustomized £304, `user_price` £311). Isolated 1-night gap between bookings | +4% over uncustomized |
| a-p13-twin (keep about a 2% gap) | **Gap is now about 6%, not 2%.** 7-26 Dec 3090701 is £11-£13 dearer (5.5-6.1%). 8-12 Nov **+12.3-12.6%** (£20-£21). 17 Nov +12.4%. 27 Nov and 1 Dec 3090701 is **27% cheaper** (£242 vs £333; £229 vs £314; 1 Dec intentional +50% per policy). No log entry drove it | - |
| P12 3 Dec | Open £253, min 2, part of 30 Nov-3 Dec (H1) | - |
| P14 0% next 30 | **Numbers only (special setup).** 30 open nights 5 Nov-4 Dec, **all at the £500 minimum**. Min stay 3-4 (4 on Fri-Sun). PriceLabs occupancy next 7/30/60 = 0%, market 46% / 43% / 39%. Over 5 Nov-4 May, 111 of 181 nights (61%) sit at £500 | - |

### MEDIUM

**M1. Push freshness, all listings** (live `get_listing_data` 07:14Z)
- Fresh (< 24 h, push on):
  - P02 00:24Z, P03 (Channex) 03:48Z.
  - P12 01:26Z, P11 01:27Z, P13 3064856 and 3090701 01:28Z, P05 01:29Z, P08 01:30Z, P20 01:32Z, P04 01:32Z.
  - P14 06:01Z, P07 06:10Z.
  - P12 Vrbo copy 01:21Z.
- **Stale > 24 h:**
  - P01 and P10 (C2). P09 from 07:27:40Z (C2).
  - **P11 Vrbo copy `_7fd3…` 4 Nov 01:37:45Z** (refreshed 4 Nov 01:33Z).
  - **P13 Vrbo copy `_3d48…` 4 Nov 01:49:46Z** (refreshed 5 Nov 01:22:23Z, not pushed).
  - **P02 Vrbo copy `_ca1c…` 24 Feb 2026.**
- All 20 listings have `push_enabled` true.
- **Check:** PriceLabs > the Vrbo listings > Sync. Are they meant to push at all (M6)?

**M2. Sync, PriceLabs vs Smoobu, next 60** (raw 5 Nov vs live Smoobu 07:13:45Z)
- **0 price gaps above £2** on 9 priced Smoobu listings, across every night that is PriceLabs-open or Smoobu-available:
  - P12 21, P11 32, P13 30 + 30, P05 20, P14 60, P20 45, P04 30, P08 2. P02 and P07 have none (fully blocked, intentional).
- Min stays are equal on all of them.
- **One availability mismatch:** P12 4-6 Dec (H1, timing).
- The four no-data listings cannot be compared with today's PriceLabs (C1, C2).
- `prices.csv` has no rows for P01, P06, P09 and P10.

**M3. Min stay vs policy and short gaps** (raw 5 Nov; Smoobu 5 Nov-4 May; handback nights excluded; P14 and P04 2 Dec numbers only)
- **Below 2 (open):**
  - P12 26 Nov (£316).
  - P13 17 Nov, 27 Nov, 1 Dec (1 Dec intentional). 3064856 £193 / £333 / £314; 3090701 £217 / £242 / £229.
  - P05 9 Nov (£1,403) and 29 Dec (£1,322).
  - P04 2 Dec (£493, deprioritised).
- **Above 3 inside 2 months:** P20 25-26 Dec min 4, 27-28 Dec min 6, 29-31 Dec min 5. Unchanged. P14 min 4 is a special setup.
- **2+ months ahead (from 4 Jan) below 5 nights, Smoobu:**
  - P11 min 3, 4 Jan-28 Feb (56 n).
  - P13 (both) min 3, 4 Jan-3 Feb; min 4, 4 Feb-4 Mar.
  - P05 min 3 (Jan) / 4 (Feb).
  - P20 min 3 (Jan) / 4 (Feb-4 Mar).
  - P04 min 3 (Jan) / 4 (Feb).
- **4+ months ahead (from 5 Mar) below 7:** P11 min 5; P13 min 5-6; P20 min 5-6 (to 4 May).
- **Short open runs a gap-fill rule would sell** (Smoobu-available; `kpi_pack.gaps` not used: properties list has no gaps field):
  - P12 12-13 Nov (£208 / £261, min 2) and 26 Nov (1 n, min 1).
  - P11 18-19 Nov (£159 / £174) and 23-25 Dec (£294 / £273 / £308, min 3 / 2 / 2).
  - P05 16-17 Nov (£376 / £390) and 7-8 Dec (£477 / £458).
  - P08 5-7 Nov (£159 / £175 / £175, min 2).
  - P09 10-12 Nov (£113 / £122 / £129).
  - P06 8-11 Nov (C1).
  - P13 17 Nov, 27 Nov, 1 Dec (1 n each, min 1).
- **Check:** PriceLabs > Customizations > Minimum Stay profile and orphan-gap rule on 2699998, 3064196, 3166592, 3318167, 3064856.

**M4. Floor / ceiling** (Smoobu-available nights 5 Nov-4 May priced at or below the PriceLabs min, or at the max; Smoobu = PriceLabs wherever both exist)
- **0% at min and 0% at max** on P04, P05, P11, P12, P13 (both), P20, P08 and P09.
- P06: 2 of 4 open nights are at or below the £200 min (8 Nov £200, 9 Nov £2; C1).
- P14: 111 of 181 nights (61%) at £500 (special setup: numbers only).
- `kpi_pack.bounds`: null.

**M5. Base vs market** (`listings.csv`; latest rows in `data/snapshots/2026-11-05/market.csv`, Nearby Listings, bedroom-matched, horizon unstated, cleaning inclusion unknown)

| Ref | Base | P50 | Gap | P75 | Gap |
|---|---|---|---|---|---|
| P01 | £253 | £258 | -1.9% | £331 | -23.6% |
| P04 | £220 | £169 | +30.2% | £214 | +2.8% |
| P05 (4 BR) | £550 | £569 | -3.3% | £713 | -22.9% |
| P06 | £357 | £405 | -11.9% | £507 | -29.6% |
| P09 | £176 | £132 | +33.3% | £160 | +10.0% |
| P11 | £286 | £287 | -0.3% | £328 | -12.8% |
| P12 | £284 | £204 | +39.2% | £234 | +21.4% |
| P13 | £250 | £222 | +12.6% | £278 | -10.1% |
| P20 | £330 | £249 | +32.5% | £315 | +4.8% |

- P08, P10 and P14 have no market row: UNKNOWN.

**M6. Listing hygiene** (live `get_listing_data`; `data/id_map.json`)
- **`_unmatched`:** the three Marylebone Vrbo listings (`_units_0001_a7f5a076…`, `_4a980bb7…`, `_380ddc1a…`) are not among the 20 PriceLabs listings.
  - Question: were they removed on purpose? If so, drop them from `id_map.json`.
- **`confidence: check`:**
  - P03 is priced via **Channex**: push on, last push 5 Nov 03:48:47Z, fully blocked (intentional).
  - **P15-P19 have no PriceLabs listing** (t-unmapped). Question: connect the second Smoobu and PriceLabs accounts?
- **Duplicates pushing separately:**
  - Vrbo copies of P11, P12, P13 and P02. P11 and P13 copies are > 24 h stale (M1); P02's copy last pushed 24 Feb.
  - Question: should Vrbo copies push at all?
- **`pricelabs_other` ids in `id_map.json` that are not in PriceLabs:** P01 `d1f3bd96…`, P08 `10339b41…`, P09 `e36cf9e9…`, P10 `babeec20…`, P04 `_units_0001_20df1e73…`, P13 `_d0a5f202…` and `_125c15c5…`. Update `id_map.json`.
- P13 3064856 and 3090701 share coordinates (one flat per policy): fact only.
- **P09 25 Apr 2027 is available in Smoobu at £458, min 5.** This is after the 26 Nov handback; the policy block runs 27 Nov-23 Apr. Fact only, per the handback rule.
  - Question: should the block extend past 23 Apr?
- **Min/max vs info pack** (`/home/user/seeker-social/seeker-estates/build/properties.py`): no change vs 4 Nov. The pack is out of date (e.g. P05 base 455 vs 550; P14 400 vs 500, special setup; P20 not in the pack).

Data gaps:
1. **PriceLabs prices NOT AVAILABLE for P01, P06, P09 and P10** (LISTING_NO_DATA). What is on sale comes from live Smoobu only. The cause of the failure is UNKNOWN.
2. The cause of P06 9 Nov £2 is UNKNOWN. Smoobu has no rate history over the API.
3. Raw window is 6 Nov-4 Jan. 5 Nov comes from Smoobu only. Jan-May min stays and floor shares come from Smoobu prices, not PriceLabs.
4. `kpi_pack` `sync_issues`, `bounds`, `market_percentiles` and `avg_open_price_next30` are null. Everything was recomputed.
5. What `user_price` represents is inferred, not confirmed (a one-cycle lag, matching on 96 of 108 nights).
6. Whether the 4-7 Dec P12 booking is the 3-7 Dec guest rebooking is NOT CHECKED. The 18 Oct base-rise "corrected method" was not re-run.
7. Not re-read live today: customizations on all listings except P04 and P09; overrides on P04, P05, P08, P11, P13, P20 (their state comes from the logs plus raw).
8. `get_listing_prices` (P09) and `get_listing_data` ran as one parallel pair, against the one-at-a-time rule. Both returned 200.

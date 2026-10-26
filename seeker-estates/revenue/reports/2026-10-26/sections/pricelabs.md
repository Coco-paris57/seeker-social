## PriceLabs audit (D = 2026-10-26)

**Sources**
- Snapshot `data/snapshots/2026-10-26/`: `raw/prices_*.json` (60 days, 27 Oct–25 Dec), `raw/listing_data.json`, `prices.csv` (Smoobu rates merged), `listings.csv`, `reservations.csv`. There is no `market.csv` today.
- `reports/2026-10-26/kpi_pack.json`. Its `sync_issues`, `bounds`, `market_percentiles`, `avg_open_price_next30` and `gaps` are all null.
- Yesterday's files, for the comparison: `reports/2026-10-25/sections/pricelabs.md`, `reports/2026-10-25/daily-report.md` and `data/snapshots/2026-10-25/raw/`.
- Policy files: `data/policy.json` and `data/id_map.json`.
- Live read-only PriceLabs calls, about 07:22–07:40Z:
  - `get_customizations` (toggled_on=false) on 3562176, 2699998, 3064196, 3166592, 3547481, 3064856, 3090701, 3318172, 3318167, 3288517, 3320302, 3318177 and 3267077;
  - `get_user_logs` for listing, group and account, 25–26 Oct;
  - `get_listing_date_overrides` on 3562176, 2699998, 3547481, 3318172, 3064196, 3166592, 3064856 and 3318167.
- Nothing was changed.
- Policy was respected:
  - The P02, P03, P06 and P07 blocks are excluded.
  - P14: numbers only.
  - P13 1 Dec, P04 2 Dec and P12 17 Nov are not re-raised.
  - Nights after each handback date are excluded.

### What changed in PriceLabs since the 25 Oct run

**Logged changes** (`get_user_logs`). Group and account logs are empty. All 16 listing entries were made by reyhan@ on 25 Oct between 21:28 and 22:00Z:

| Time (Z) | Listing | Change |
|---|---|---|
| 21:28:04 | P13 3064856 (copied to 3090701 and Vrbo 12037152) | 26 Oct **+35%**, min stay 1 |
| 21:29:44 | P13 (copied) | 31 Oct–3 Nov override, no price (0%), min 2 |
| 21:29:56 | P13 (copied) | 31 Oct **+10%**, min 2 |
| 21:30:11 | P13 (copied) | 7–20 Dec: override, no price, min 2. The old **−3%, min 3 was removed**. |
| 21:58:50 | P20 3547481 | 26–27 Oct: override, no price, **min 2**. The old −4% was removed. |
| 21:59:03 | P20 | 31 Oct–19 Nov **−5% → −2%**, min 3 |
| 21:59:41 | P20 | 1–31 Jan 2027 **−2%**, min 3 (new) |
| 21:59:52 | P20 | 1–28 Feb 2027 **−2%**, min 4 (new) |

**Unlogged customization changes.** The log API does not record customization edits, so who made these and when is UNKNOWN. They were found by comparing live `get_customizations` with the 25 Oct table (read about 07:10Z on 25 Oct):
- **P04:** last-minute −25% → **−5%**.
- **P12:** last-minute −25% → **0%**. Occupancy profile changed from Aggressive to a milder custom table.
- **P20:** last-minute −25% → **0%**. But an **Aggressive occupancy table** and **Booking Recency (default) were switched ON**; both were off on 25 Oct.
- **P13** (both listings): last-minute −20% → **−5%**. But the **Aggressive occupancy table was switched ON** (it was Market Driven on 25 Oct). Seasonality is now "moderately conservative" and a far-out premium of +30% after 150 days was added (25 Oct said none).
- **No change:** P11, P05, P08, P09, P01, P10, P06 and P14.

---

### HIGH

**1. a-discount-cut is only partly applied** (live `get_customizations`; target from `reports/2026-10-25/daily-report.md` row 1: custom 0% on all three settings)

| Ref (id) | Last-minute: 25 Oct → now | Occupancy: 25 Oct → now | Booking Recency: 25 Oct → now | Status |
|---|---|---|---|---|
| P12 (2699998) | −25% gradual → **0%** | Aggressive → custom milder (0–15 d: −15% at ≤20% occupancy … 0 at 60%+; 16–30 d: −10% … +10%) | ON default (5–15%) → **unchanged** | Partial |
| P04 (3562176) | −25% → **−5%** gradual | Aggressive → **unchanged** | ON default → **unchanged** | Partial |
| P20 (3547481) | −25% → **0%** | off (Market Driven) → **Aggressive ON** | off (default) → **ON default** | Partial; two new discount layers added |
| P13 (3064856 and 3090701) | −20% / 14 d → **−5%** | Market Driven → **Aggressive ON** | off (default) → unchanged | Partial; one new layer added |
| P05 (3166592) | **−25% FLAT, unchanged** | custom "Default" (−15% … 0), unchanged | off, so the default 5–15% applies; unchanged | Not applied |
| P11 (3064196) | **−18%, unchanged** | **Aggressive, unchanged** | **ON default, unchanged** | Not applied |
| P08, P09 (and P01, P10, which have no open nights) | **−18%, unchanged** | Market Driven | off, so the default applies | Not applied |
| P06 (3288517) | toggle off, so Market Driven: 40% same-day falling to 0% at 12 days | Market Driven | default | Moot: 0 open nights after the 5–8 Nov booking |
| P14 (3267077) | −25% / 30 d, unchanged | Market Driven | default | Excluded (special setup) |

- **What the Aggressive table does.** In the 0–15 day band it takes −30% at ≤10% occupancy, −25% at 20%, −20% at 30–40%, then eases to −5% at 70–80%.
- **What it means for P20 and P13.**
  - P20 `occupancy_next_30` is **17%** (`listing_data.json`). The table's 10–20% rows therefore apply: **−25% to −30% in 0–15 days, −20% in 16–30 days**.
  - P13 is at **40%**, which is −20% in 0–15 days and −10% in 16–30 days.
  - Whether the 25 Oct 21:30Z / 22:00Z refreshes already include this is UNKNOWN.
- **Check in PriceLabs → Customizations:**
  - P20 and P13: Occupancy Based Adjustments (set custom 0% on every band) and Booking Recency Factor (set custom 0%);
  - P04: Last-Minute 0%, Occupancy custom 0%, Booking Recency 0%;
  - P12: Occupancy custom 0% and Booking Recency 0%;
  - P05: Last-Minute (now −25% flat), plus Occupancy and Booking Recency;
  - P11: all three;
  - P08 and P09: Last-Minute −18% and Booking Recency.
- **Do not just switch toggles off.** When a toggle is off, the `effective` field shows PriceLabs' default (Booking Recency 5–15%) taking over.

**2. Final vs uncustomized price, open nights** (`raw/prices_*.json` `price` vs `uncustomized_price`; the gap combines customizations, overrides and the min floor)
- Today's windows are 27 Oct–9 Nov (next 14) and 10–25 Nov (days 15–30); 25 Oct used 26 Oct–8 Nov and 9–24 Nov.
- P06 5–7 Nov and P08 31 Oct–4 Nov are treated as booked (Smoobu `reservations.csv`), because PriceLabs has not yet picked these bookings up (item 4).

| Ref | Next 14 now | 25 Oct | Days 15–30 now | 25 Oct |
|---|---|---|---|---|
| **P04** | 9 n £1,421 vs £2,028, **−29.9% (£607)** | −32.1% | 11 n £1,866 vs £2,499, **−25.3% (£633)** | −24.6% |
| **P11** | 6 n £1,107 vs £1,353, **−18.2% (£246)** | −17.7% | 12 n £2,631 vs £3,022, **−12.9% (£391)** | −12.1% |
| **P05** | 6 n £2,535 vs £2,804, **−9.6% (£269)** | −12.3% | 2 n £1,048 vs £1,053, −0.5% | −2.3% |
| **P20** | 11 n £2,744 vs £3,012, **−8.9% (£268)** | −10.7% | 14 n £3,705 vs £3,941, **−6.0% (£236)** | −4.4% |
| P12 | 4 n £942 vs £1,005, −6.3% (£63) | **−16.7%** | 7 n £1,893 vs £2,000, −5.3% (£107; includes the reopened 22–24 Nov) | +3.2% |
| P13 3064856 | 6 n £931 vs £965, −3.5% | +7.6% | 12 n £2,337 vs £2,261, +3.4% | +3.8% |
| P13 3090701 | 6 n £1,130 vs £1,142, −1.1% | +7.7% | 12 n £2,456 vs £2,539, −3.3% | +3.8% |
| P08 | 7 n £1,165 vs £1,147, +1.6% | −0.5% | 0 (handback 13 Nov) | – |
| P09 | 5 n £719 vs £715, +0.6% | +0.8% | 3 n £490 vs £499, −1.8% | −1.8% |
| P14 | 14 n £7,000 vs £4,402, +59.0% (£500 floor) | +59.7% | 16 n £8,000 vs £5,944, +34.6% | +37.8% |
| P01, P06, P10 | 0 open | | 0 open | |

- **Only P12 shows a clear lift so far** (−16.7% → −6.3% inside 14 days).
- **P04 barely moved:** the −8% override plus the Aggressive occupancy and recency settings remain.
- **P11 is unchanged.**
- **Remaining PriceLabs-side gap over the next 30 days: about £3,000.** Sum of (uncustomized − final) for P04, P11, P05, P20, P12 and P13. This is an upper bound and is not weighted for booking probability.

**3. Sync: Smoobu holds older prices than PriceLabs on two listings** (`prices.csv`, open nights, difference above £2)
- **P04 (3562176), 1–7 Nov (7 nights):**
  - PriceLabs £157/163/166/166/156/152/157 = **£1,117**; Smoobu £140/147/153/154/148/145/152 = **£1,039** (Smoobu £78 lower). 8 Nov differs by £2.
  - **Timing:** PriceLabs last refreshed **25 Oct 21:26:58Z**, but its **last push was 25 Oct 09:46:14Z** (`listing_data.json`).
  - **Gap shape:** the gap shrinks from −11% six days out to −1% at 13 days. That looks like Smoobu holding prices calculated before the last-minute change from −25% to −5%. This is not proven.
  - **Excluded:** 2 Dec (PL £509 vs Smoobu £636) also differs. That is the deprioritised +200% night: reported only, not re-raised.
- **P13 (3064856), 7–20 Dec (14 nights):**
  - PriceLabs **£3,277**; Smoobu **£3,177** (£6–8 lower per night, about 3%).
  - **Timing:** the last push was **21:30:09Z**, two seconds **before** the 21:30:11Z log entry that removed the −3% override on those dates. So the removal has not reached Smoobu yet.
  - **3090701** received the same copy, but its Smoobu rate is not merged into `prices.csv`: NOT CHECKED.
- **Possible causes**, none confirmed:
  - the next push is pending or has failed;
  - a manual Smoobu override;
  - sync off. Push is on for both (`listing_data.json`), so this is less likely.
- **Check:** PriceLabs → 3562176 and 3064856 → Sync Now / last push status; Smoobu → Rates for P04 1–8 Nov and P13 7–20 Dec.

**4. PriceLabs has not refreshed six listings since 25 Oct morning, and two new bookings are not reflected yet** (`listing_data.json` `last_refreshed_at` / `last_date_pushed`)

| Listing | Last refresh / push (25 Oct) |
|---|---|
| P08, P10 | 07:48Z |
| P01, P06 | 07:59Z |
| P05 | 08:16Z |
| P09 | 09:30Z |
| P04 | push 09:46Z |

- **Each crosses 24 h between 07:48Z and 09:46Z today**, which becomes CRITICAL under the push-freshness rule.
- **P06 5–7 Nov** (Airbnb, booked 25 Oct, £804.77) still reads **open** in PriceLabs.
- **P08 31 Oct–4 Nov** (Airbnb, booked 25 Oct, £676.60) still reads **open**.
- **Re-check `last_date_pushed` after 10:00Z.**
- **Fresh (within 24 h):** P11, P14, P02, P07, P03 (pushed 26 Oct), plus P12 (25 Oct 11:50Z), P13 (21:30Z) and P20 (22:00Z).

### MEDIUM

**5. Your four negative-override decisions are still open; Reyhan has changed one** (live `get_listing_date_overrides`)
- **P04:** unchanged.
  - 1–24 Nov −8% (24 Oct); 6–22 Dec −5%; Feb 2027 −5% (24 Oct).
  - Older ones also unchanged: 26–31 Oct −10% (all booked), 25–30 Nov −8%, 1 Dec −2%, 3–5 Dec −8%, 23–31 Dec −5%, 2–31 Jan −5%.
- **P09:** 26–31 Oct −5% unchanged (24 Oct 11:28Z).
- **P20:** **−5% → −2%** on 31 Oct–19 Nov (25 Oct 21:59Z, Reyhan). The old 20–30 Nov −2% and 28–30 Oct −4% remain. New: Jan −2% and Feb −2%.
- **Older negatives on open nights, unchanged:**
  - P12: 26 Oct–15 Nov −4%; 18–21 Nov −8%; 22–28 Nov −2%; 29 Nov–13 Dec −1%;
  - P11: 26–27 Oct −2%; 28 Oct–13 Nov −1%; 14–17 Nov −5%;
  - P05: 26 Oct −8%; 27 Oct −2%; 31 Oct −3%; 10–15 Nov −3%; 29 Nov–2 Dec −2%; 3–6 Dec −5%; 9–28 Dec −3%;
  - P08: 26 Oct–13 Nov −2%;
  - P13: 27–30 Oct −1%; 28–30 Nov −1%; 2–6 Dec and 21–31 Dec −3%.
- **Check:** PriceLabs → Date Specific Overrides on 3562176, 3318172, 3547481 and 2699998.

**6. Reyhan's 25 Oct evening changes to confirm against policy**
- **P13 31 Oct is +10% again.** Policy (24 Oct) says 31 Oct–3 Nov was set to 0%. Reyhan re-applied +10% on 31 Oct only; 1–3 Nov is 0%.
- **P13 26 Oct is +35% with a 1-night minimum** (today). That night is not in `raw/` or `prices.csv`, so whether it is open is UNKNOWN.
- **P20 26–27 Oct is now min stay 2.** `policy.json` `listing_facts.P20.min_stay` says "3 nights from 25 Oct to 30 Nov". Ask whether policy should be updated.
- **P13 7–20 Dec:** the −3% was removed and min stay went 3 → 2.

**7. New bookings and the P12 cancellation in PriceLabs** (`raw/prices_2699998.json`, refreshed 25 Oct 11:50Z)
- **P12 26–30 Oct** Booking.com: reflected. 27–29 Oct read Booked with booked_date 2026-10-25 and PriceLabs £250 / £254 / £257.
- **P12 22–28 Nov** (the cancelled £1,314.40 stay): reopened.
  - Now open at £264 / £263 / £247 / £250 / £263 / £295 / £304 = **£1,886** (uncustomized £2,004), min stay 2.
  - The old −2% override applies on 22–28 Nov, and −1% on 29–30 Nov.
  - P12 Booking Recency is still ON, and Mile End still has Genius Level 2&3 (policy `booking_discount_stack_25oct`), so a Booking.com resale of these nights would carry the same stack.
- **P06 5–8 Nov and P08 31 Oct–5 Nov:** NOT reflected yet (item 4).

**8. Min stay and orphan gaps** (`raw/prices_*.json`, open nights; policy 2–3 nights, 5 at 60+ days, 7 at 120+ days)
- **New: P08 5–7 Nov** (3 nights, £165 / £188 / £185, min 2). Created by the 31 Oct–5 Nov booking; it sits before the 8–14 Nov stay. Sellable as is.
- **Carried short runs, all sellable at their current minimum:**

  | Ref | Nights | Prices | Min stay |
  |---|---|---|---|
  | P12 | 12–13 Nov | £210 / £274 | 2 |
  | P05 | 29–30 Oct | £415 / £424 | 2 |
  | P05 | 16–17 Nov | £500 / £548 | 2 |
  | P05 | 7–8 Dec | £792 / £751 | 2 |
  | P09 | 10–12 Nov | £163 / £163 / £164 | 2 |
  | P20 | 26–27 Oct | £253 on 27 Oct | 2 |

- **Off-policy minimums:**
  - P20 min 4 on 9 nights between 4 and 20 Dec (source UNKNOWN, carried over);
  - 25 Dec (60 days out): P11 min 2, P13 min 4, P20 min 4. The policy says 5.
  - The P14 min 4 on 24 nights is a special setup.
- **Not re-raised:** the min 1 nights P12 17 Nov, P13 1 Dec and P04 2 Dec (policy).

**9. Floor and ceiling** (raw, 60 days; the 180-day check is NOT POSSIBLE because raw ends 25 Dec)
- **P14:** 48 of 60 open nights at the £500 minimum (80%). Special setup; numbers only.
- **Every other listing:** 0 nights at min or at max.

**10. Listing hygiene** (`listing_data.json` vs `data/id_map.json`; facts only)
- **Push freshness:** every one of the 20 PriceLabs listings has push on.
- **Stale:** the P02 Vrbo copy `_units_0004_…` last pushed **2026-02-24** (P02 block is intentional).
- **Vrbo copies push separately:** P11 12037367 (26 Oct 05:31Z), P12 12038157 (25 Oct 11:48Z) and P13 12037152 (25 Oct 21:35Z).
- **P03** is priced via Channex.
- **Copies no longer in PriceLabs:** the P04 Vrbo copy and the P01 Channex copy listed in `id_map.json` are not in today's `listing_data.json`. Question: retired on purpose?
- **Carried over:** P15–P19 have no PriceLabs listing, and P20 is not in the info pack.

Data gaps:
1. Customization change history is not in `get_user_logs`. Who changed P04, P12, P20 and P13 on 25 Oct, and when, is UNKNOWN.
2. Whether the new Aggressive occupancy settings on P20 and P13 are already in the 25 Oct 21:30Z / 22:00Z prices is UNKNOWN.
3. Not re-read today:
   - overrides on 3090701 and the Vrbo copies (only the logs show them as copied);
   - account-level customizations;
   - the orphan-day setting, which `get_customizations` does not return.
4. 3090701 Smoobu sync is NOT CHECKED (no Smoobu rate merged into `prices.csv`).
5. No `market.csv` today, and the pack's `market_percentiles` / `bounds` are null: base vs market is NOT CHECKED.
6. `raw/` and `prices.csv` cover 60 days only (to 25 Dec). The 180-day floor/ceiling check and the 7-night (120+ days) min-stay check are NOT CHECKED.
7. Whether P13 26 Oct (+35%) is open is UNKNOWN (outside the snapshot window).
8. Info-pack min/max comparison (`build/properties.py`) was not redone today; it is unchanged since the 25 Oct section, apart from P13 £250 vs pack £235.

# Seeker Estates - Daily revenue report, 2026-10-18

Prepared by: Revenue strategy (Claude) for Corentin. **Status: PROPOSALS ONLY. Nothing has been changed in PriceLabs, Smoobu, Airbnb, Booking.com or Vrbo. Every setting below needs Corentin's explicit approval before anyone touches it.**

Inputs: `sections/{occupancy,pricelabs,channel,market,comp-east,comp-central,comp-west}.md`, `kpi_pack.json` (rebuilt after the PriceLabs audit; `settings` now read from the priced listing in `id_map.json`), `data/id_map.json`, and recomputed window figures from `data/snapshots/2026-10-18/{prices.csv,reservations.csv}`.

## Executive summary

1. Last 30 nights (12 Smoobu units): occupancy 67.5%, ADR £177.24, RevPAR £119.64, revenue £43,070. Last 365: 44.6% / £185.58 / £82.79. That 365-day occupancy is understated, because 10 of the 12 units only started in Smoobu during the year.
2. Next 29 nights: 48.0% Booked plus 18.3% Blocked, against a 38.7% simple-average market. Demand is ahead of the market on P01, P04, P05, P09, P10, P11 and P12, and those units are priced at or below the P25–P63 PriceLabs percentile. So the main lever is ADR.
3. The largest quantified item is not a price. Booking.com's effective commission rose from 15.0% (Q4 2025) to 21.9% (Q4 2026). That is £3,810 above 15% on bookings made since July, about **£1,058 a month**.
4. Proposed base-price rises, each sized with `rm/positioning.py`: P05 +10%, P11 +10% (plus darts week), P09 +10%, P01 +10%, P12 +5%, P06 +5%. Together they come to about **£2,222 a month** on the open nights, at the current 30-day pickup.
5. P14 Primrose Hill is the critical fix. The £500 minimum is 71% above the 1-bed P90 (£292), 41 of 60 open nights sit at that floor, and nothing has been booked in 60 nights.
6. On next-30 stays of 7+ nights we are £6,804 below the PriceLabs price, which is 92% of the total leak. PriceLabs has no weekly or monthly discount, so the cause sits on the OTA side. It stays unproven until Corentin sends his Airbnb and Booking discount settings.
7. Inventory is closed on 5 units and the reasons are unknown: P03 (unavailable for 360 days), P07 (60/60 nights Blocked), P02 (50/60), P06 (40/60) and P13 (11/60). Five managed units (P15–P19) are in no system at all. RGI, ratings and comp positioning cannot be measured yet.

### Reading notes, and what changed since the sections were written
- The KPI pack `settings` now show the priced listing for every unit. P01, P08, P09, P10 and P13 have sync on, pushed 2026-10-18, with bases of £230 / £250 / £160 / £160 / £235. **The "sync_on false" lines in market.md and in pricelabs.md item 6 are superseded. There is no sync alarm today.**
- One residual pack bug remains. `bounds.min/max` for P01, P08, P09, P10 and P13 still hold the info-pack values (for example P01 120/450), not PriceLabs (P01 120/650). This report uses `settings.pl_min/pl_max` (logged under a-tidy).
- **Positioning basis:** there is no named comp set. PriceLabs Competitor Listings is "not enabled for this account", and the OTA sites are unreachable. Every percentile below is a **PriceLabs Nearby Listings bedroom-matched percentile** (summary_table, horizon not stated). Ratings are blank, so `quality_premium = 0` for everyone and the quality premium is **unknown**, not zero.
- **Occupancy basis:** our forward occupancy counts Booked nights only. PriceLabs' own figure includes blocks (P02 97%, P06 77%, P07 100%, P13 47%). Block reasons are unknown, and I have asked rather than assumed.
- **Expected-effect formula (used throughout):** price move % × average open PriceLabs price in the window × expected nights sold. Expected nights sold = nights picked up into that window by confirmed bookings made in the last 30 days (19 Sep–18 Oct), capped at the open nights. W1 = 19 Oct–16 Nov, W2 = 17 Nov–17 Dec (prices.csv). The formula assumes conversion holds after the move. Elasticity is not measured, so treat these figures as upper bounds.

| Ref | W1 open / avg £ / 30d pickup into W1 | W2 open / avg £ / 30d pickup into W2 |
|---|---|---|
| P01 | 0 / - / 17 | 18 / £257 / 13 |
| P04 | 14 / £178 / n/a (not in Smoobu) | 21 / £199 / n/a |
| P05 | 8 / £449 / 0 | 12 / £533 / 12 |
| P06 | 6 / £291 / 14 | 0 (31 Blocked) / - / 0 |
| P08 | 16 / £210 / 13 | 31 / £203 / 0 |
| P09 | 12 / £152 / 13 | 21 / £179 / 10 |
| P10 | 0 / - / 29 | 29 / £149 / 2 |
| P11 | 12 / £201 / 14 | 8 / £300 / 8 |
| P12 | 12 / £218 / 15 | 16 / £273 / 4 |
| P13 | 16 / £192 / 2 | 22 / £226 / 8 |
| P14 | 29 / £500 / 0 | 31 / £548 / 0 |

## Actions - 2026-10-18

Quantified rows are ranked by expected monthly £. The "not quantified" rows follow, ranked by severity. Owner "Corentin" means approve and execute; nothing moves without his approval.

| # | Ref | Action (exact setting + value) | Where | Evidence | Expected effect | Owner | Review date |
|---|---|---|---|---|---|---|---|
| 1 | all (Booking.com units P02, P09, P10, P11, P12, P13, P01, P06, P08) | **t-bcom-commission.** Open Booking extranet > Opportunities (Visibility Booster, Preferred Partner) and Finance > commission statement for the 33 bookings since 2026-06-17 that carry 26–46% commission. Switch off any opt-in programme that is the source, unless it can be shown to bring volume that covers the cost. | Booking.com extranet | Effective commission by booking quarter: 15.0% (Q4-25), 15.9%, 16.6%, 21.4% (Q3-26, 64 bk), 21.9% (Q4-26). Median P10 27.9%, P09 23.4%, P01 21.3%. At 21.9%, Booking nets £78.10 per £100 vs Airbnb £82.78 (channel.md §4.2). | Up to **£1,058/month** = £3,810 excess on bookings made since 1 Jul ÷ 3.6 months. Any volume the programme brings is not quantified. | Corentin | 2026-10-25 |
| 2 | P05 | **a-p05-raise.** Base Price £455 → **£500** (+10%). Min £150 / max £2,500 unchanged, both within bounds. Also correct the listing bedroom count ("4Bed" in the PriceLabs/OTA name vs 5-bed in the info pack). | PriceLabs 3166592 > Base Price; Airbnb listing > Rooms | fwd30 69% vs market 32%, fwd60 66% vs 32%. Open 17 Nov £485 is below the 5BR P25 (P50 £972, P75 £1,308, n=34). Booked ADR is +6.6% above the PriceLabs price. `recommend` → raise +10%. PriceLabs recommended base £467. | **+£640/month** = 10% × £533 × 12 nights (W2: 12 open, 12 picked up in the last 30 days). W1 adds £0 (0 pickup). | Corentin | 2026-10-25 |
| 3 | P11 | **a-p11-raise.** Base Price £260 → **£286** (+10%), plus a percentage date override of **+10% on 13–17 Dec** (darts). Max £1,200 unchanged. | PriceLabs 3064196 > Base Price; Date-specific overrides | fwd30 59% vs 47%, **fwd60 68% vs 39%**. Avg £181 is below the 2BR P25 (P50 £291, n=172). Darts nights £233–255 vs fortnight £309 and same weekday £266–289 (market.md §3). `recommend` → raise +10%. | **+£615/month** = 10% × (12 × £201 + 8 × £300) + 10% × 1.10 × £244 × 5 darts nights. Pickup: 14 into W1 (capped at 12 open), 8 into W2. | Corentin | 2026-10-25 |
| 4 | P09 | **a-p09-raise.** Base Price £160 → **£176** (+10%). Max £550 unchanged. | PriceLabs 3318172 > Base Price | fwd30 59% vs market 38%. Avg £150 ≈ 1BR P63 (P50 £134, n=126). `recommend` → raise +10%. Realised ADR is £101.92 because of long stays (see t-channels). | **+£361/month** = 10% × (12 × £152 + 10 × £179). | Corentin | 2026-10-25 |
| 5 | P01 | **a-p01-raise.** Base Price £230 → **£253** (+10%), plus a +10% date override on **16–17 Dec** (Horse Show). Max £650 unchanged. | PriceLabs 3320302 > Base Price; Date-specific overrides | fwd30 100% vs 34%, fwd60 71% vs 26%. Next-30 avg £212.8 is below the 2BR P25 (£220; P50 £266, n=147). Horse Show 16/17 Dec open at £206/£236 vs fortnight £258 and same weekday £252/£274. `recommend` → raise +10%. | **+£334/month** = 10% × £257 × 13 (W2: 18 open, 13 picked up). The Horse Show uplift is inside W2, so it is not added separately. | Corentin | 2026-10-25 |
| 6 | P12 | **a-p12-raise.** Base Price £270 → **£284** (+5%). **Override of the +10% rule.** Reason: P12 is the only unit with STLY, and pace90 is −10 nights (29 vs 39) and **−24.4% revenue** vs STLY. Keep the 17 Nov orphan as is (see #13). | PriceLabs 2699998 > Base Price | fwd30 59% vs 41%, fwd60 47.5% vs 34%. Avg £220 ≈ 2BR P60 (P50 £205). `recommend` → raise +10%. Pace30 −4 nights / +8.9% revenue. | **+£185/month** = 5% × (12 × £218 + 4 × £273). | Corentin | 2026-10-25 |
| 7 | P06 | **a-p06-price (update).** Base Price £340 → **£357** (+5%). Still no named comps (CCC not enabled), so this rests on percentiles. | PriceLabs 3288517 > Base Price | fwd30 48% vs 43% at <P25 2BR (avg £290, −28% vs P50 £404). `recommend` 30d → raise +5%. The 60d "fix-listing" call is **invalid**: 17 Nov–17 Dec is 31/31 Blocked, so the 24% vs 40% compares closed stock. | **+£87/month** = 5% × £291 × 6 open W1 nights (pickup 14 ≥ 6). | Corentin | 2026-10-25 |
| 8 | P10 | **(within t-p10-leak.)** Base Price £160 → **£168** (+5%) for stays beyond 19 Nov. Max £500 unchanged. | PriceLabs 3318177 > Base Price | fwd30 100% vs 32%. List price £161 ≈ 1BR P80 (P50 £125). `recommend` → raise +5% ("test a further step up"). | **+£15/month** = 5% × £149 × 2 (W2 pickup = 2 nights). | Corentin | 2026-10-25 |
| 9 | P14 | **t-p14-floor (update).** Min Price £500 → **£290**, Base Price £525 → **£356**, and set Fri/Sat/Sun minimum stay from 4 nights back to **2** (policy is 2–3). **Override of the −7% rule.** Reason: −7% gives £488, which is still above the 1BR P90, and the £500 minimum blocks any downward move by PriceLabs. £290 ≈ 1BR P90 (£292). £356 = 2BR P75, the top of the premium range the terrace, yoga room, 4 floors and parking can justify (comp-central). Step down again after 7 days if pickup stays at 0. | PriceLabs 3267077 > Min Price, Base Price, Min-stay profile | 0/60 nights booked vs market 42%/38%. 41/60 open nights (68.3%) at the £500 minimum. Uncustomised PriceLabs price averages £439 (low £262). Base +173% vs 1BR P50 £192. Info pack says min £400 / base £475. The only stay in 365 days was 10 nights at £410 (lead 57 days). | Not quantified: 0 pickup at any price in 60 days, so there is no rate to multiply. Today's revenue is £0 on 60 open nights. | Corentin | 2026-10-25 |
| 10 | all | **t-channels (update).** Send (a) Airbnb Pricing > Discounts > Weekly / Monthly % for P01, P06, P08, P09 and P10; (b) Booking extranet Promotions (Long-stay deal, Genius level, Early-booker) for P02, P09, P11 and P12; (c) the Smoobu > Channel Manager > Booking.com price adjustment %, to explain the exact 1.2 factor. | Airbnb, Booking.com, Smoobu | Next-30 matched nights: 7–27 night stays −27.2%, 28–90 night stays −29.8%, 1–6 night stays −4.3% vs PriceLabs. **£6,804 of £7,374 (92%) is on 7+ night stays.** PriceLabs weekly/monthly discounts are off on every listing checked. Booking ADR = Smoobu basePrice / 1.2000 on all 39 Booking nights. | Not quantified: the source of the discount is unproven. | Corentin | 2026-10-21 |
| 11 | P03, P07, P02, P06, P13 | **t-blocks (new).** Tell us why each calendar is closed: owner use, off-platform let, works or delisted. For P03, check Channex availability. P03 PriceLabs shows ADR past 30 £202 and pickup 3, so it may be selling through a channel we cannot see. For P07, review Min £165 / Base £226 before reopening. | Smoobu calendar; Channex; PriceLabs | P03 `fully_blocked_next_360 = true`. P07 60/60 Blocked, min £165 > 1BR P75 £145. P02 50/60 Blocked (17 Nov–17 Dec 31/31). P06 40/60 (W2 31/31). P13 11/60 (20–22 Oct may be left over from the cancelled Booking stay; inference only). | Not quantified: we do not know whether the blocked nights are sellable. | Corentin | 2026-10-21 |
| 12 | P10 | **t-p10-leak (update).** The cause is narrowed. The 32-night Airbnb stay (18 Oct–19 Nov, booked 9 Oct, £3,390.85 = £105.96/night vs PriceLabs £159.79) was not discounted by PriceLabs, because weekly/monthly discounts are off. Send the P10 Airbnb Monthly discount %. If it is above 15%, cut it to 15% or move it into PriceLabs `monthly_discount`. | Airbnb listing > Pricing > Discounts | rate_leak −33.7% on 29 nights. 28–90 night stays earn £141 ADR vs £196 for 1–6 nights. The P10 long stay indexes 0.98 against same-month short stays, so PriceLabs may also be pricing above what converts. | Not quantified until the Airbnb discount value is known. | Corentin | 2026-10-21 |
| 13 | P04, P11, P12, P13 | **a-orphans (new).** Reset the premium orphan overrides to 0% and let PriceLabs price them: P04 1 Nov (+150%, £462) and 2 Dec (+200%, £548); P11 18 Nov (+30%, £316) and 27 Nov (+60%, £542); P12 17 Nov (+50%, £358, above the daily P90 £321); P13 22 Oct (+40%, £211 vs PriceLabs £163). This does not go below PriceLabs' own price. | PriceLabs > Date-specific overrides | pricelabs.md item 7. The pack's `gaps` field missed all of these. | Not quantified: no sell-through data for orphan nights. | Corentin | 2026-10-25 |
| 14 | P04 | **a-p04-raise (new).** Base Price £220 → **£242** (+10%). Max £2,000 unchanged. | PriceLabs Channex 7dc96cda… > Base Price | fwd30 48% vs 28%. Avg £167 ≈ 2BR P54 (P50 £159). `recommend` → raise +10%. Booked ADR £126.29. | Not quantified: P04 is not in Smoobu, so there is no pickup data. | Corentin | 2026-10-25 |
| 15 | P13 | **t-w12 (update).** Confirm whether Smoobu 3064856 and 3090701 are one flat. Both sit at identical coordinates and both push 110/235/2000; 3090701 has 21 bookings. **Hold price** (`recommend` → fix-listing, 0%). | Smoobu apartments; PriceLabs | fwd30 6.9% vs market 42% at ~P29 2BR (avg open £191.5 vs P50 £225). Two cancellations hit the window (Booking 19–28 Oct £1,468; Vrbo 12 Oct–2 Nov). | Not quantified. If it is one flat, there is a double-booking risk and demand is split. | Corentin | 2026-10-21 |
| 16 | P02 | **t-p02-vrbo (update).** Vrbo copy 4438728 still last pushed 2026-02-24 (236 days), shows "Fully Blocked", and `last_refreshed_at = null`. Confirm whether it is live, then reconnect or switch push off. | PriceLabs > Vrbo account > 4438728 | pricelabs.md item 2. | Not quantified. | Corentin | 2026-10-25 |
| 17 | all Booking units | **t-bcom-cancel (new).** Add a non-refundable rate plan alongside the flexible one, and review the free-cancellation window. | Booking extranet > Policies / Rate plans | Booking cancels 47.9% of booked value (£146,277, 110 bk) vs Airbnb 21.2%. 7–27 night Booking stays cancel at 55.4%, and stays booked 91+ days out at 63.4%. | Not quantified: no non-refundable conversion data. | Corentin | 2026-11-01 |
| 18 | P08 | **a-p08 (update).** Hold price (`recommend` → fix-listing, 0%). Work the listing (photos, title, terrace in the first photo), and check for an Airbnb weekly discount before targeting 7–27 night stays for the 26 Oct–7 Nov gap. | Airbnb / Booking listing content | 47 open nights in 60 days. W2 has 31 open with **0 pickup in 30 days**. fwd60 22% vs 43% at ~P35 2BR. 7–27 night stays are 70.8% of P08's nights. | Not quantified. | Corentin | 2026-10-25 |
| 19 | P15–P19 | **t-unmapped.** Confirm whether each is still managed and where it is priced. | PriceLabs / Smoobu / Corentin | Not in PriceLabs or Smoobu. Every KPI is UNKNOWN. | Not quantified. | Corentin | 2026-10-21 |
| 20 | - | **t-waterford.** Say what Waterford Court is (Smoobu 3547481, PriceLabs 220/350/1800 pushing, E14 coordinates, 2 bookings). | Corentin | Not in the info pack. | Not quantified. | Corentin | 2026-10-21 |
| 21 | P04, P13, P06, P01, P08, P09, P10 | **a-tidy (update).** Switch off or remove the duplicate PriceLabs copies: P04 old Smoobu 3254047 plus a pushing Vrbo copy, P13 Vrbo copies, 3 Marylebone Vrbo copies, and the Channex copies of P01/P08/P09/P10. Separately (Claude), fix `bounds.min/max` in analyse so it uses PriceLabs min/max, not the info pack. | PriceLabs listings; `rm/analyse.py` | pricelabs.md item 5. Pack bounds P01 120/450 vs PriceLabs 120/650. | Not quantified (hygiene and double-booking risk). | Corentin / Claude | 2026-10-25 |

**Closed today:** a-highocc. P01 and P10 are full because of long stays sold below the PriceLabs price. P01 has 37 nights at £162.31 and 30 nights at £152.13 against £214. P10 has 32 nights at £105.96 against £159.79. The follow-up moves to t-channels and t-p10-leak.

**Approval needed for every row.** No price is outside PriceLabs min/max. The P14 change lowers the minimum itself, which is why it needs explicit approval.

## Growth plays

- **Review score (KPI: rating).** The info pack gives a portfolio score of Airbnb 4.4 / Booking 8.9 on 520 reviews. Per-listing ratings are blank in `listings.csv`, and comp ratings do not exist because CCC is off. So the rating gap is **unknown**, and `quality_premium` is 0 by default, not by evidence. **Get the data:** per-listing rating and review count from Airbnb host dashboard > Reviews and Booking extranet > Guest reviews, loaded into `listings.csv` `rating_*` / `reviews_*`. Also enable PriceLabs Competitor Listings or build a Market Dashboard so comp ratings can be read. Target: the top-decile threshold, which can only be set once comp ratings are connected (by 2026-11-01). Operational fixes can only be named per listing once the review text is in.
- **Listing conversion (KPI: MPI on soft units).** P13 is at 6.9% vs 42% while priced at ~P29, and P08 at 22% vs 43% (60d) at ~P35. `recommend` → fix-listing on both, so price is not the problem. Fix photos and titles, put the terraces in lead photos, check instant book and Superhost/Preferred status. Correct P05's "4Bed" title, which currently benchmarks it against the 4BR band (P50 £598) instead of 5BR (£972). Superhost, Preferred and instant-book status are not in any feed. **Get the data** from the Airbnb and Booking listing settings.
- **Length of stay and gap fill (KPI: ADR on 7+ night stays).** 7+ night stays are 36% of nights (7–27: 31.6%, 28–90: 4.4%) and carry 92% of the next-30 leak. Move any OTA weekly/monthly discount into PriceLabs (`weekly_discount` / `monthly_discount`) so it can be seen and capped. Bring Jan 2027 minimum stays (3 on P01, P04, P10, P12) in line with the 5-night policy for bookings 2+ months ahead, and remove P14's 4-night weekends. **Mid-term (91+):** 0 stays. 28–90 night stays earn £141 vs £196 for 1–6 nights, so mid-term dilutes ADR at today's pricing. Use it only to fill the open blocks on soft units (P08 26 Oct–7 Nov, 13 nights; P13 31 Oct–12 Nov and 17–27 Nov), and only at or above that unit's 30-day ADR.
- **Direct-booking share (KPI: direct share).** Direct is 1.4% of revenue (4 bookings, none since 2026-09-30). Direct nets £100 per £100 of basePrice vs Airbnb £82.78 and Booking £82.03 (observed). Each 1 point of revenue moved from Airbnb to direct is worth about **£635/year** = £369,073 (365-day revenue) × 1% × 17.22%. The 10% direct discount cannot be checked: there is no direct-site URL. **Get the data:** the direct-site URL and booking engine, added to `channel_checks.csv`.
- **Event compression (KPI: event-night ADR vs fortnight).** Verified events with open nights priced below the fortnight: P11 darts 13–17 Dec (£54–76/night below fortnight, in action 3), P01 Horse Show 16–17 Dec (£22–52, in action 5), and P04 Noah Kahan 16–17 Nov (below by weekday too). Winter Wonderland is priced (P03 +28.5%, P06 +44.4%), but both units are blocked. `prices.csv` stops at 17 Dec, so Kasabian (18 Dec), the darts run-in and NYE (PriceLabs flags a +9.5–22.4% occupancy surge, 28 Dec–1 Jan, in every market) cannot be checked. **Get the data:** extend the snapshot to 180 days.
- **Booking.com economics (KPI: net per £100).** Commission creep (action 1) and the 47.9% cancelled value (action 17). Booking must net at least what Airbnb nets. It currently does not (£78.10 vs £82.78 at Q4 commission), unless the 1.2 Smoobu factor is a markup that covers the gap.

## KPI scoreboard

| KPI | Today (source) | Target | Date |
|---|---|---|---|
| Occupancy, last 30 (12 Smoobu units) | 67.5% (kpi_pack) | hold ≥ 65% while ADR rises | 2026-11-17 |
| ADR, last 30 | £177.24 | £190 | 2026-12-17 |
| RevPAR, last 30 | £119.64 | £124 (65% × £190) | 2026-12-17 |
| Occupancy, last 365 | 44.6%, understated (fixed 365-night capacity; 10/12 units started mid-year) | restate on an active-days basis in the pack | 2026-10-25 |
| ADR, last 365 | £185.58 | track only | - |
| Booked next 29 nights vs market | 48.0% Booked (+18.3% Blocked) vs 38.7% market (13-unit simple mean) | keep ≥ market + 10 pts after the price rises | 2026-11-01 |
| RGI | UNKNOWN: no market ADR (market.csv empty, CCC off) | > 1.10 on every property | data by 2026-10-25; target by 2027-03-31 |
| Rating | Airbnb 4.4 / Booking 8.9 portfolio (info pack); per-listing blank | top decile (threshold set once comp ratings are connected) | data by 2026-11-01 |
| Direct share of revenue | 1.4% (4 bookings) | 5% | 2027-06-30 |
| Search placement | UNKNOWN: no OTA ranking feed | top of page 1 for the area search | data source needed |

## Data gaps (get the data)

1. Market ADR / RGI / ARI: `market.csv` is empty. Connect a PriceLabs Market Dashboard or enable Competitor Listings (CCC).
2. Named comp set: CCC is not enabled and `comps.csv` is empty. P13 already holds 9 stored competitor ids (5 active).
3. OTA displayed prices and parity: `channel_checks.csv` is empty, and Airbnb, Booking and Vrbo are blocked from this environment.
4. Per-listing ratings and review counts: blank in `listings.csv`.
5. Channel markups and promotions: `rm/config.py` CHANNELS are placeholders. The meaning of the Booking 1.2 factor is unknown.
6. Block reasons for P02, P06, P07 and P13.
7. P03 availability and reservations: Channex only, not in Smoobu.
8. P04 reservations: not in Smoobu.
9. P15–P19: in no system.
10. Waterford Court (Smoobu 3547481): identity unknown.
11. P13 second listing 3090701: unmapped.
12. STLY: missing for 11 of 12 units, so pace is UNKNOWN except on P12.
13. `prices.csv` covers 60 days only, so there is no 180-day floor/ceiling check and nothing on 18 Dec–16 Jan.
14. There is no PriceLabs price history at booking date, so price drift cannot be separated from discounts.
15. Booking.com `cleaning_gbp` is blank on all 338 rows.
16. P14's minimum-stay profile source is not exposed by the API.
17. Cancellation dates are not in `reservations.csv`.
18. P05 bedroom count conflict: 5-bed in the info pack and PriceLabs class, "4Bed" in the listing name.

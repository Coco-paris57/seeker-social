## Channel parity

Run date D = 2026-10-28 (GMT). `data/policy.json` was read first. Nothing it settles is raised again: the 15%/20% stay discounts, Booking.com promotion stacking (size reported only), the Visibility Booster, P13 = one flat, the P02/P03/P06/P07 blocks, P14, the P20 Airbnb discounts, nights after handback, and the deprioritised items (including P09's Airbnb rules).

**Sources**
- **Live Airbnb pages, loaded by me on 28 Oct, 07:26:25Z–07:28:55Z.** These were airbnb.co.uk map searches with plain curl and no workarounds.
  - Log: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live28/air/log.txt`, with one JSON file per search in the same folder.
  - 19 rows were appended to `data/snapshots/2026-10-28/channel_checks.csv`, each with URL, stay dates, guests and timestamp.
- **Smoobu API, GET only.**
  - `/api/rates` at 07:27:50Z: `live28/smoobu_rates28.json`.
  - `/api/reservations?modifiedFrom=2026-10-26` with price elements, guest fields dropped: `live28/smoobu_mod28_pe.json`.
- **Snapshots** `data/snapshots/2026-10-25` to `2026-10-28`: `prices.csv` and `raw/prices_*.json`. I used `last_refreshed_at` to pick the PriceLabs price that applied when each booking was made.
- **PriceLabs `get_user_logs`** (listing level, 26–28 Oct).
- **Booking.com: NOT CHECKED.** One plain search at 07:31:02Z returned HTTP 202 with an AWS WAF challenge (`live28/bk/search.html`). I did not try to get around it.
- **Vrbo and Direct: NOT CHECKED.** No URL and no checks rows.

**Config status**
- Booking.com +15% and Airbnb 0% are confirmed in policy.
- **Vrbo +8% and Direct −10% are still unconfirmed defaults.**

**Correction to the Dispatcher's figures** (now confirmed by the Dispatcher): `reservations.csv` `total_gbp` is Smoobu `basePrice`, which already excludes cleaning (Smoobu price elements, `rm/snapshot.py` l.200).
- P20 Airbnb 2–6 Nov: room **£733.62**, guest total £883.62. It is not £583.62.
- P08: room £525.
- P13 Booking.com: £1,143.76 is room only.

### 1. Airbnb parity (live, 28 Oct)

- **Expected** = Smoobu rate × (1 + 0%) × the discounts policy recognises:
  - P20: last-minute 15% for stays 0–14 days out (`listing_facts.P20.airbnb_discounts_22oct`).
  - P13: Smoobu last-minute 10% within 14 days (`changed_21oct`).
  - P12: none recorded.
  - Stays are 3 nights, so no stay discount applies.
- **Displayed** = card total minus £150 cleaning (the card total includes cleaning, before taxes). No card showed a strikethrough.

| Ref | Channel | Stay (lead days) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 6–9 Nov (9) | 2 | £760 | £646.00 (LM 15%) | £581.39 (£731.39) | −10.0% | FLAG | air/p20_0609nov.json 07:26:25Z |
| P20 | Airbnb | 13–16 Nov (16) | 2 | £717 | £717.00 | £548.49 (£698.49) | **−23.5%** | FLAG | air/p20_1316nov.json 07:28:21Z |
| P20 | Airbnb | 16–19 Nov (19) | 2 | £699 | £699.00 | £534.73 (£684.73) | **−23.5%** (was −10.0% at 20 days on 27 Oct) | FLAG | air/p20_1619nov.json 07:28:28Z |
| P20 | Airbnb | 22–25 Nov (25) | 2 | £716 | £716.00 | £547.74 (£697.74) | **−23.5%** | FLAG | air/p20_2225nov.json |
| P20 | Airbnb | 26–29 Nov (29) | 2 | £850 | £850.00 | £765.00 (£915.00) | −10.0% | FLAG | air/p20_2629nov.json 07:28:37Z |
| P20 | Airbnb | 30 Nov–3 Dec (33) | 2 | £769 | £769.00 | £692.10 (£842.10) | −10.0% | FLAG | air/p20_3003dec.json 07:28:45Z |
| P20 | Airbnb | 8–11 Dec (41) | 2 | £888 | £888.00 | £799.20 (£949.20) | −10.0% | FLAG | air/p20_0811dec.json |
| P13 3064856 | Airbnb | 8–11 Nov (11) | 4 | £472 | £424.80 (LM 10%) | £361.08 (£511.08) | −15.0% | FLAG | air/p13_0811nov.json |
| P13 3090701 | Airbnb | 8–11 Nov (11) | 4 | £573 | £515.70 (LM 10%) | £438.34 (£588.34) | −15.0% | FLAG | same |
| P13 3064856 | Airbnb | 8–11 Dec (41) | 4 | £676 | £676.00 | £608.40 (£758.40) | −10.0% | FLAG | air/p13_0811dec.json |
| P13 3090701 | Airbnb | 8–11 Dec (41) | 4 | £638 | £638.00 | £574.20 (£724.20) | −10.0% | FLAG | same |
| P12 | Airbnb | 22–25 Nov (25) | 2 | £813 | £813.00 | £621.94 (£771.94) | **−23.5%** | FLAG | air/p12_2225nov.json 07:28:52Z |
| P12 | Airbnb | 27–30 Nov (30) | 2 | £889 | £889.00 | £800.10 (£950.10) | −10.0% | FLAG | air/p12_2730nov.json 07:28:55Z |
| P12 | Airbnb | 8–11 Dec (41) | 2 | £796 | £796.00 | £716.40 (£866.40) | −10.0% | FLAG | air/p12_0811dec.json |
| P04 | Airbnb (separate account) | 4–5 Nov, **1 night** | 2 | £160 (Smoobu min 3) | not bookable | **bookable**, £239.24 card | min-stay breach | FLAG | air/p04_0405nov_1n.json |
| P04 | Airbnb (separate account) | 18–19 Nov, **1 night** | 2 | £192 (Smoobu min 2) | not bookable (policy min 3) | **bookable**, £251.48 card | min-stay breach | FLAG | air/p04_1819nov_1n.json |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:31:02Z | — | — | live28/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Lead-time schedule on Airbnb today**

Every card resolves exactly to one of these factors. It is the same on P20, P12 and both P13 listings.

| Lead time | Factor | Breakdown |
|---|---|---|
| 9–25 days | **0.765** | 0.85 × 0.90 |
| 29–41 days | **0.900** | |
| 98 days (27 Oct reading) | 1.000 | |

**This changed since yesterday.**
- On 27 Oct 07:25Z, P20 16–19 Nov (20 days out) displayed 0.900.
- Today the same stay (19 days out) displays 0.765, and 0.765 now reaches 25 days on both P20 and P12.
- So the extra 15% layer now applies at about 15–28 days. That window matches the old Smoobu default "Last-minute −15% within 28 days" (`airbnb_smoobu_settings_21oct`, listing A).
- P20's Airbnb Discounts page only allows last-minute 15% at 0–14 days.
- No PriceLabs change explains it. `get_user_logs` shows only date overrides on 26–27 Oct.

### 2. New bookings: paid vs PriceLabs, with the channel stack

The PriceLabs price used is the last refresh before each booking's Smoobu `created-at`.

| Ref | Channel | Stay / guests / lead | Created | PriceLabs at booking (refresh) | Paid room | Paid ÷ PriceLabs | Stack explanation (policy) | Commission | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **P13** | Booking.com | 18–27 Nov, 9 nights, 4 adults, 22 days | 27 Oct 20:49 | **£1,709** (27 Oct 11:59Z; Smoobu identical, and still £1,709 on 28 Oct). The Dispatcher's £1,739 was the 26 Oct refresh. | £1,143.76 | **0.669** (0.658 against £1,739) | List = £1,709 × 1.15 = £1,965.35; paid = **0.582 of list**. Best fit: Weekly rate −15% × Last Minute 15% (0–30 days, extended 21 Oct) × Mobile 10% × Genius L1 10% = 0.5852 → £1,150.17 (paid −0.6%). Exact to 0.1%: Monthly −20% × LM 15% × one 10% × occupancy −5% = 0.5814; that would mean the Monthly plan sold to a 9-night stay (same unenforced minimum as `booking_monthly_rate_issue_24oct`). Not involved: Black Friday (bookable only from 19 Nov); Early Booker, Domestic and EEA (off since 21 Oct). | £258.75 = 20.0% of £1,293.76 | Booster is on for P13 check-ins 21 Oct–20 Dec, so expected. Promotions take £526.79 off the policy expectation (£1,709 × 1.15 × 0.85 = £1,670.55). Size only; stacking is settled. |
| **P20** | Airbnb | 2–6 Nov, 4 nights, 1 adult, 6 days | 27 Oct 14:22 | £994 Smoobu (27 Oct snapshot) / £974 PriceLabs `user_price` (26 Oct 10:20Z). Reyhan added a −2% override for 2–5 Nov at 27 Oct 12:00Z. | **£733.62** (+ £150 cleaning) | **0.738** against £994 (0.753 against £974) | Policy allows Airbnb last-minute 15% (0–14 days) → £844.90 / £827.90. Today's live 0.765 schedule (15% × hidden 10%) → £760.41 / £745.11. Paid is −3.5% / −1.5% from that. The hidden 10% explains about £84–94; the residual £12–27 is within the 2% override plus an unknown pushed rate. | £136.96 = 15.5% | Not the 0.587 reported. This is the first P20 booking on the Flexible test. The gap beyond policy is the hidden 10% (issue 1). |
| P08 | Airbnb | 27–31 Oct, 4 nights, 3 adults + 2 children, same day | 27 Oct 18:05 (a 15:09 duplicate was cancelled at 15:25) | ≈£680 PriceLabs / £671 Smoobu (27 Oct night from the 25 Oct refresh; 28–30 Oct from the 26 Oct 18:40Z refresh) | £525 | 0.772 | Against Smoobu: 0.782, close to the 0.765 schedule (+2.3%). P08's Airbnb rules are not in policy. | £104.47 = 15.5% | Gap beyond policy (no stay discount for 4 nights) is about −22%: the same hidden layers. |
| P11 | Booking.com | 5–8 Dec, 3 nights, 2 adults, 39 days | 27 Oct 18:16 | £809 (27 Oct 11:58Z, after the 11:29 cancellation reopened the nights) | £656.07 | 0.811 | 0.705 of list (£930.35). Nearest fit: non-refundable −10% × Mobile 10% × Genius 10% × occupancy −5% (1–4 guests) = 0.6926 (+1.8%). Last Minute does not apply at 39 days, and Early Booker has been off since 21 Oct. | £144.91 = 18.0% | Camden Booster (18%, 1 Nov–18 Dec) explains the commission. |
| P11 | Booking.com | 28–31 Oct, 3 nights, 2 adults + 3 children, same day | 28 Oct 04:42 | £617 (28 Oct night £217 from the 26 Oct refresh; 29–30 Oct £191 + £209 from 27 Oct 11:58Z) | £565.38 | 0.916 (0.886 against all-26 Oct £638) | 0.797 of list. Consistent with two 10% promotions (for example Last Minute 10% × Mobile 10% = 0.81, −1.6%). 5 of 6 guests, so no occupancy discount. | **£178.59 = 25.0%** | **Check-in 28 Oct is outside the Camden Booster window (1 Nov–18 Dec), so the 25% commission is not explained.** Ask before assuming. |
| P11 | Booking.com | 28 Nov–12 Dec, 14 nights | cancelled 27 Oct 11:29 | — | −£2,950.82 | — | — | — | Reopened 14 nights; 5–8 Dec has since been resold. Smoobu now shows 5–8 Dec and P13 18–27 Nov unavailable, so there is no overbooking. The 28 Oct snapshot predates both bookings. |

`rate_leak_next_30` (pack): average booked ADR against today's PriceLabs price for booked nights in the next 30 days:

| Ref | Gap | Nights |
|---|---|---|
| P12 | −46.0% | 13 |
| P04 | −41.3% | 9 |
| P01 | −39.2% | 28 |
| P09 | −37.8% | 20 |
| P06 | −32.9% | 9 |
| P20 | −32.9% | 5 |
| P08 | −32.5% | 11 |
| P10 | −32.5% | 21 |
| P11 | −26.8% | 9 |
| P05 | −17.2% | 17 |
| P13 | null | — |

These use today's price, which has risen since many of the bookings were made, and include the 15%/20% stay discounts. So they overstate the leak. The per-booking ratios above are the like-for-like measure.

### 3. Monitoring

**a) Airbnb after the promotions were removed (21 Oct; runs to 4 Nov).** Source: `reservations.csv`, grouped by `booked_on`, room £ only.

| Window | Confirmed | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 days (15–28 Oct), all | 20 | 111 | £21,775.84 | £196.18 | 2 |
| Last 14 days, excl. P04 (separate account; one row is a 28 Sep stay imported 26 Oct) | 18 | 106 | £21,120.64 | £199.25 | 2 |
| Prior 14 days (1–14 Oct) | 13 | 95 | £13,208.10 | £139.03 | 1 |

Per property, last 14 vs prior 14 (count / nights / £ per night):

| Property | Last 14 | Prior 14 |
|---|---|---|
| P01 | 2 / 33 / £160 | 0 |
| P02 | 1 / 4 / £104 | 1 / 6 / £108 |
| P04 | 2 / 5 / £131 | 0 |
| P05 | 1 / 7 / £647 | 1 / 4 / £459 |
| P06 | 2 / 14 / £197 | 3 / 7 / £206 |
| P08 | 3 / 15 / £132 | 0 |
| **P09** | **1 / 2 / £127** | **3 / 23 / £103** |
| **P10** | **0** | **1 / 32 / £106** |
| P12 | 1 / 2 / £159 | 1 / 3 / £177 |
| P13 | 4 / 19 / £199 | 2 / 8 / £142 |
| P20 | 3 / 10 / £180 | 1 / 12 / £155 |

- **Portfolio: there is no drop over 14 days.** Bookings are up 38% (excluding P04).
- **The weekly rate has halved.** Confirmed bookings per week:
  - 15–21 Oct: 12.
  - 22–28 Oct: 6 excluding P04, 8 including it.
  - That is exactly −50% excluding P04, so it does not cross the >50% threshold. It is the trend to watch to 4 Nov.
- **Drops over 50% by property:**
  - P09: −67% in count, −91% in nights. P09 is 79% booked for the next 30 days and is handed back on 26 Nov.
  - P10: −100%. P10 is 100% booked for the next 30 days and is handed back on 18 Nov.
  - Both are limited by inventory, not demand.

**Paid vs PriceLabs, Airbnb bookings made after 21 Oct:**

| Ref | Booked | Stay | Lead | Paid ÷ PriceLabs at booking |
|---|---|---|---|---|
| P09 | 23 Oct | 13–15 Nov | 21 days | 0.770 (rules deprioritised) |
| P08 | 25 Oct | 31 Oct–5 Nov | 6 days | **0.850** |
| P06 | 25 Oct | 5–8 Nov | 11 days | **0.765** |
| P04 | 26 Oct | 19–20 Dec | 54 days, separate account | 0.947 |
| P13 | 26 Oct | 27 Dec–3 Jan | 62 days | 0.768 (weekly × early-bird; explained) |
| P08 | 27 Oct | 27–31 Oct | same day | 0.772 |
| P20 | 27 Oct | 2–6 Nov | 6 days | 0.738 |

Every booking within 28 days sits at 0.74–0.85. Only P20's 15% last-minute is covered by policy, so the rest is an unexplained gap (issue 1).

**Flexible-cancellation test (P20, P06, P05 since 24 Oct; day 4 of 14):**
- Test group: 2 bookings, P20 2–6 Nov and P06 5–8 Nov.
- Other Airbnb flats: 3 bookings, P08 ×2 and P13 New Year (plus P04 on its separate account).
- No cancellations in the test group. Too early to read.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38).** Organic bookings only; P04 Channex imports dated 20 Oct are excluded.

| Booked | Booking | Nights | Room £ | Paid ÷ PriceLabs |
|---|---|---|---|---|
| 24 Oct | P12 5–12 Nov | 7 | £932.90 | 0.64 (policy) |
| 24 Oct | P04 14–18 Nov | 4 | £437.69 | 0.71 (policy) |
| 25 Oct | P12 26–30 Oct | 4 | £434.76 | 0.640 |
| 26 Oct | P04 20–23 Nov | 3 | £355.82 | 0.668 |
| 26 Oct | P12 4–8 Dec | 4 | £1,116.99 | 0.965 |
| 27 Oct | **P13 18–27 Nov** | 9 | £1,143.76 | **0.669** |
| 27 Oct | **P11 5–8 Dec** | 3 | £656.07 | **0.811** |
| 28 Oct | **P11 28–31 Oct** | 3 | £565.38 | **0.916** |
| **Since the cut (3.7 days)** | **8** | **37** | **£5,643.37** | **0.745 weighted** (paid £5,643 ÷ PriceLabs £7,577) |

- That is about 2.1 bookings per day, against 0.33 per day in the 30 days before the cut and 0 in the 13 days before.
- **Cancellations since the cut:**
  - P12 22–29 Nov: −£1,314.40, cancelled 25 Oct.
  - P11 28 Nov–12 Dec: −£2,950.82, cancelled 27 Oct 11:29. This booking was made in July, so it is not linked to the cut.
- **Net: +16 nights, +£1,378.15.**
- The cut cannot be credited on its own. Last Minute 10% was added the same day, and six of the eight bookings sold at 0.64–0.81 of PriceLabs.

### 4. Net to owner per £100 PriceLabs price

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com, model (pack) | £115.00 | £97.75 |
| Booking.com, observed P13 18–27 Nov (0.669, 20% commission) | £66.93 | **£53.54** |
| Booking.com, observed P11 5–8 Dec (0.811, 18%) | £81.10 | £66.50 |
| Booking.com, observed P11 28–31 Oct (0.916, 25%) | £91.60 | £68.70 |
| Booking.com, since the cut (0.745, about 15–20%) | £74.50 | about £60–63 |
| Airbnb, model (pack) | £100.00 | £84.50 |
| Airbnb, live 29–41 days (0.900) | £90.00 | £76.05 |
| Airbnb, live 9–25 days (0.765) | £76.50 | **£64.64** |
| Direct (−10%, unconfirmed) | £90.00 | £90.00 |

- The pack's `channel_economics.warnings` is empty, but the observed figures break both rules:
  - **Direct is not the cheapest guest price.** Airbnb at 9–25 days (£76.50) and most Booking.com sales are below direct (£90).
  - **Booking.com does not net at least what Airbnb nets on P13.** It nets £53.54, against £64.64 for Airbnb at 22 days.

### Issues ordered by £ impact

1. **Hidden Airbnb discounts on P20, P12, P13 (both listings), and probably P06 and P08 (seen in their bookings).** Today the factor is −10% at about 29–55 days and −23.5% at about 15–25 days (0.85 × 0.90). Within 14 days it is 0.765, against the 0.85 policy allows for P20 and the 0.90 for P13.
   - **This is not fixed, and it got worse in the last 24 hours.** Yesterday the 15–28-day window showed only −10%.
   - Cost on this week's bookings: P20 about £84–94, P06 about £89 (£1,052 × 0.85 = £894 expected against £804.77 paid), and P08 27–31 Oct about £45 against Smoobu × 0.85. That is roughly £220–230 on three bookings.
   - Each 3-night stay now loses another £80–95 at 15–28 days.
   - **Settings to check:**
     - Smoobu > Channel Manager > Airbnb > Default pricing rules on every apartment. Look for "Last-minute −15% within 28 days" (the old default) and the rule giving −10% up to about 55–60 days. Only Shepherd's Bush was reset on 21 Oct.
     - Airbnb > each listing > Pricing > Discounts. Was the last-minute window widened from 14 to 28 days on 27 Oct?
   - Ask Corentin or Reyhan whether either was edited on 27 Oct. If a discount is wanted, keep it visible (policy `airbnb_visible_discounts`).
2. **P13 Booking.com 18–27 Nov at 0.669 of PriceLabs, netting £53.54 per £100.** The size is reported only. One thing to check is that two Last Minute deals are not both live on Shepherd's Bush:
   - Policy shows LM 15% at 0–30 days (21 Oct) and the 24 Oct "Last Minute 10% within 30 days".
   - Setting: Booking.com extranet > Shepherd's Bush > Promotions. Keep one Last Minute deal.
   - Also confirm whether the Weekly or Monthly plan was sold. If Monthly, it is the same unenforced 28-night minimum that is open with Booking.com.
3. **P11 Camden 28–31 Oct commission £178.59 = 25.0%.** Check-in is outside the 18% Booster window. At 15% the commission would be £107.16, so the excess is £71.43.
   - Ask Corentin before assuming.
   - Check Booking.com extranet > Camden > Opportunities / Visibility Booster dates and the reservation's commission line.
4. **P04 Barking Airbnb still sells 1 night.** It was bookable for 4–5 Nov and 18–19 Nov at 07:27–07:28Z today. So t-p04-airbnb-minstay is **not fixed**.
   - Setting: Barking's Airbnb account > Listing 1455876748739910219 > Availability > Minimum nights = 3 (Corentin 24 Oct: never fewer than 3).
   - **Related:** Reyhan's PriceLabs overrides on 26–27 Oct set **min stay 2 on P04 for 18–20 Nov and 23–25 Nov**. Smoobu shows min 2 on 18–19 and 23–24 Nov, which also opens Booking.com to 2-night stays against policy. Fix in PriceLabs > Barking > Date-specific overrides: set min stay to 3.
   - P20 also has min 2 on 31 Oct–1 Nov and 9–12 Nov against policy's 3 to 30 Nov (part of a-p13-record).
5. **Data correction.** The P20 booking is 0.738 of PriceLabs, not 0.587; the room is £733.62. The P13 booking is 0.669, not 0.658 (the Dispatcher used the stale £1,739).

**Airbnb −10% lead-time rule (a-airbnb-rules): still active.** It is present at 29, 30, 33 and 41 days on P20, P12 and both P13 listings, at exactly 0.900. It is now combined with a 15% layer out to at least 25 days. Not fixed.

Data gaps:
1. Booking.com displayed prices and promotions were NOT CHECKED (AWS WAF; not circumvented). Stack breakdowns for P13 and P11 are inferred from paid ÷ list. The extranet reservation screenshots would confirm which rate plan and promotions applied.
2. The exact Smoobu rate pushed to Airbnb for P20 2–6 Nov at 14:22 on 27 Oct is unknown. Between £974 and £994, after Reyhan's −2% override at 12:00Z.
3. The P11 28 Oct nightly price at booking is not in the pre-booking refresh. The 26 Oct value of £217 was used.
4. The P08 27 Oct night price is from the 25 Oct refresh.
5. The source of the 0.765 / 0.900 Airbnb layers (Smoobu rule or Airbnb discount) is not visible from public pages. The upper edge of the 10% (55–97 days) was not tested today.
6. The P04 Airbnb cleaning fee and price basis (separate account) were not resolved. The 1- and 2-night pair implies about £119 cleaning, against £129 on its Smoobu booking.
7. Vrbo +8% and Direct −10% are unconfirmed defaults. There is no direct URL, so direct < OTA ordering is model-only.
8. Airbnb cleaning (£150) is inferred from exact factor fits, not read from an itemised page.

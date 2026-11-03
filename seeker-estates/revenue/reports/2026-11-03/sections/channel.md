## Channel parity

Run date D = 2026-11-03 (Tuesday, GMT). I read `data/policy.json` first and do not re-raise anything it settles: the 15%/20% stay discounts, Booking.com promotion stacking (I report sizes only), the Visibility Booster, P13 as one flat, the P02/P03/P06/P07 blocks, P14, P20's recorded Airbnb discounts, nights after handback, and deprioritised items.

**Sources (all read-only)**
- **Smoobu GET** `/api/rates` 2026-11-03T07:20:40Z for 9 apartments, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live03/smoobu_rates03.json`. `/api/reservations?modifiedFrom=2026-10-01` with priceElements, 07:20:42Z, saved to `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live03/smoobu_mod03_pe.json`. Guest fields are dropped from that file (only key names are kept, and the free-text notice is not stored).
- **PriceLabs:** `get_user_logs` (listing, 2–3 Nov: 35 entries, all Reyhan, none from Corentin). I also used `data/snapshots/2026-11-03/raw/prices_3547481.json` and `prices_3064196.json` (`booked_price`, ADR) and `raw/listing_data.json` (last refresh/push).
- **Live Airbnb:** 28 plain public airbnb.co.uk searches (curl, no workarounds) between 07:21:15Z and 07:24:38Z. Search JSON and `log.txt` are in `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/live03/air/`. **I appended 36 rows under lock to `data/snapshots/2026-11-03/channel_checks.csv`** (URL, stay, guests, timestamp, Smoobu rates per row).
  - "Displayed room" = card total before taxes, minus cleaning. Cleaning: P20/P13 £150, P12 £150 for 3+ nights, P05 £195, P08 £149, synced Barking £142, P06 £129.
  - **P12 2-night cards fit a £125 cleaning fee to the penny on three stays.** This matches the £125 cleaning on Smoobu's P12 Airbnb 30 Oct–1 Nov booking, so it is a short-stay cleaning fee. Inference from the arithmetic; not a leak.
- **Booking.com: NOT CHECKED.** One plain search at 07:27:14Z returned HTTP 202 with an AWS WAF challenge (`live03/bk/search.html`). I did not try to get past it.
- **Vrbo / Direct: NOT CHECKED** (no URL, no checks row).
- **Config:** Booking.com +15% and Airbnb 0% are confirmed in policy. **Vrbo +8% and Direct −10% are still unconfirmed defaults** (`rm/config.py` CHANNELS) until Corentin confirms them.

### 1. Barking (P04): the guest arrives TODAY and the unsynced listing still double-sells

Smoobu live (3562176):
- 3–6 Nov: Booking.com 161785771, confirmed, £393.18 room.
- 6–9 Nov: Airbnb 161888271 via the synced listing, confirmed, £355.72 room.
- Open: 9–13 Nov, 18–24 Nov, 6–19 Dec. Minimum stay 3 nights.
- PriceLabs = Smoobu on every open Barking date. The 9–13 Nov push gap reported yesterday has closed (last push 2 Nov 08:54:44Z).

| Stay (2 adults) | Smoobu | Unsynced 1455876748739910219 (host 551951609) | Synced 1657859794156786222 | Verdict | Source (`live03/air/`) |
|---|---|---|---|---|---|
| **3–6 Nov (arrival today)** | booked (Booking.com) | **bookable, £518.20 card** | not offered | **DOUBLE-SELL, tonight** | p04_0306nov 07:21:15Z |
| **6–9 Nov** | booked (Airbnb) | **bookable, £514.20 card** | not offered | **DOUBLE-SELL** | p04_0609nov 07:21:23Z |
| 9–12 Nov | open, £506 | bookable, £497.00 | £529.08 card = £387.08 room (0.765) | both sell the same nights | p04_0912nov |
| 18–24 Nov (6 n) | open, £1,133 | bookable, £944.84 | £1,161.70 − "Long stay discount" £101.97 → room £917.73 (0.900 × 0.90 = 0.810) | both sell | p04_1824nov 07:21:39Z |
| 18–21 Nov | open, £565 | £525.80 | £432.21 room (0.765) | both sell | p04_1821nov |
| 6–19 Dec (13 n) | open, £2,460 | £2,514.80 − weekly £239.58 = **£2,275.22** | £2,356.00 − "Weekly stay discount" £398.52 = £1,957.48 (room 0.900, then weekly **18.0%**) | both sell | p04_0619dec 07:21:59Z |
| 6–9 Dec | open, £552 | £672.50 | £496.80 room (0.900) | both sell | p04_0609dec |

- **Still double-sellable: yes.** This is the fourth consecutive day. Listing 1455… offers both confirmed stays: tonight's arrival (3–6 Nov) and 6–9 Nov. That puts **£748.90 of room revenue at risk**, plus relocation cost if either listing takes a booking.
- 1455… also sells every open Barking night checked. A sale on either listing can double-book the other. t-p04-doublebook is NOT fixed.
- The synced listing's weekly discount is **18.0%** again (£398.52 / £2,214.00), not the policy 15%. On a 13-night stay that is £66.42 extra.

### 2. New bookings (made 2 Nov): paid vs PriceLabs at booking, exact stack

| Booking (Smoobu id) | Booked (lead) | Smoobu priceElements | PriceLabs/Smoobu at booking | Stack | Paid ÷ PL | Unexplained |
|---|---|---|---|---|---|---|
| **P20 Airbnb 10–13 Nov** (162347031), 2 adults | 2 Nov 16:28 (8 d); created = modified (16:28:10) | base £510.00, cleaning £150, commission £102.30 (15.5% of £660) | **£706** (233/234/239 = PriceLabs `booked_price`, `raw/prices_3547481.json`; identical to Smoobu 2 Nov 07:25Z). Already includes Reyhan's base 330 and −5% 6–24 Nov (logged 00:16Z). No P20 change or refresh between 00:16Z and 23:26Z | £706 × **0.765** (hidden ≤28-day Airbnb layer) = £540.09. That is the public card, seen live at lead 7 on 9–12 Nov yesterday and at lead 13–20 today. Then × **0.9443** = **£510.00** | **0.722** (Dispatcher's 0.722 confirmed) | **Policy-recognised expectation (P20 last-minute 15% at 0–14 d) = £600.10; paid is −15.0% (£90.10) below it.** The hidden layer costs £165.91 vs PriceLabs. The extra ×0.944 (£30.09) is not explained by any listing-level rule: no card shows it, and the booking was not modified after creation. Cause NOT CHECKED (Airbnb host inbox / reservation price breakdown not visible) |
| **P11 Booking.com 20–22 Nov** (162400946), 5 adults, Genius booker | 2 Nov 23:10 (18 d); modified 23:27 | base £430.11 (VAT £71.69 incl.), cleaning £149, commission **£104.24 = 18.0%** of £579.11 (Visibility Booster, expected by policy) | **£461** (230/231). Reyhan **re-added −5% on 10 Nov–18 Dec at 2 Nov 15:05:01Z** (`get_user_logs`), 15 h after removing it at 00:11Z. Pushed 15:05:46Z; no refresh after (`listing_data.json`). Smoobu today 230/231. PriceLabs `booked_price`/user_price still read 241/243 (£484, the pre-override value) | List = Smoobu × 1.15 rounded up per night (265 + 266 = £531; rounding inferred, as for P12 yesterday) × **Mobile 10% × Genius 10%** (0.81) = **£430.11 exactly**. From £484 no clean stack fits | **0.933** (Dispatcher's 0.889 used £484, before the −5% was re-added); 0.778 ex-VAT | None (stacked promotions are policy). **Size: 19% off list = £100.89.** No Last Minute deal applied at lead 18, so Camden has no ≤30-day Last Minute active (or it did not apply). No occupancy discount at 5 guests |

Correction to the Dispatcher's overnight facts: the P11 booking was **not** made after the cuts were removed. The −5% (10 Nov–18 Dec) was back in place 8 h before the booking. P11 room = £215.06/night.

### 3. P05 9 Nov on Airbnb: still £253.44 room plus the special offer

| Stay | Guests | Smoobu | Airbnb card | Room after offer | Source |
|---|---|---|---|---|---|
| 9–10 Nov, 1 n (lead 6) | 7 and 2 | **£1,435** (min 1, open) | 1 night × £511.80 − **"Special offer" −£63.36** = £448.44 | **£253.44** (−82.3% vs Smoobu) | p05_0910nov_1n 07:22:12Z, _a2 07:22:14Z |

- **a-p05-9nov: NOT fixed.** The card is identical to 31 Oct, 1 Nov and 2 Nov: Airbnb prices the night on a £316.80 room, not Smoobu's £1,435, and adds a 20% special offer.
- P05 was last pushed 2 Nov 08:54:33Z and there is no P05 log since. A stuck Airbnb-side custom price or offer on 9 Nov is the likely cause; NOT CHECKED in the Airbnb calendar.

### 4. Live Airbnb parity and lead-time layers, 3 Nov

Expected = Smoobu × (1 + 0%) × only the discounts policy recognises:
- P20: last-minute 15% at 0–14 d.
- P13: last-minute 10% within 14 d; early bird 10% at 60+ d.
- All listings: weekly 15%.

Gap = displayed room ÷ expected − 1.

| Ref | Channel | Stay (lead d) | Guests | Smoobu rate | Expected | Displayed room (card) | Gap | Flag | Source (`live03/air/`) |
|---|---|---|---|---|---|---|---|---|---|
| P20 | Airbnb | 16–19 Nov (13) | 2 | £788 | £669.80 | £602.81 (£752.81) = 0.765 | −10.0% | FLAG | p20_1619nov 07:22:36Z |
| P20 | Airbnb | 21–24 Nov (18) | 2 | £860 | £860.00 | £657.89 (£807.89) = 0.765 | **−23.5%** | FLAG | p20_2124nov 07:22:46Z |
| P20 | Airbnb | 7–10 Dec (34) | 2 | £756 | £756.00 | £680.40 (£830.40) = 0.900 | −10.0% | FLAG | p20_0710dec |
| P20 | Airbnb | 4–7 Jan (62) | 2 | £768 | £768.00 | £768.00 (£918.00) | 0.0% | ok | p20_0407jan |
| P12 | Airbnb | 17–20 Nov (14) | 2 | £684 | £684.00 | £523.26 (£673.26) = 0.765 | **−23.5%** | FLAG | p12_1720nov 07:23:13Z |
| P12 | Airbnb | 17–19 Nov (14), 2 n | 2 | £450 | £450.00 | £344.25 (£469.25, £125 cleaning) = 0.765 | −23.5% | FLAG | p12_1719nov |
| P12 | Airbnb | 30 Nov–3 Dec (27–29) | 2 | £694 | £694.00 | £562.90 (£712.90): 0.765 at leads 27–28, 0.900 at 29 | −18.9% | FLAG | p12_3003dec 07:24:28Z |
| P12 | Airbnb | 7–10 Dec (34) | 2 | £774 | £774.00 | £696.60 (£846.60) = 0.900 | −10.0% | FLAG | p12_0710dec |
| P13 3090701 (1587576514709814818) | Airbnb | 8–11 Nov (5) | 4 | £537 | £483.30 (LM10) | £410.79 (£560.79) = 0.765 | −15.0% | FLAG | p13_0811nov 07:23:28Z |
| P13 3064856 (1571600691689064213) | Airbnb | 8–11 Nov (5) | 4 | £442 | £397.80 (LM10) | £338.12 (£488.12) = 0.765 | −15.0% | FLAG | same |
| P13 both | Airbnb | 9–12 Dec (36) | 4 | £671 each | £671.00 | £603.90 (£753.90) = 0.900, **identical on both** | −10.0% | FLAG | p13_0912dec |
| P13 both | Airbnb | 4–7 Jan (62) | 4 | £609 each | £548.10 (EB10) | £548.10 (visible "Early booking discount −£60.90"), **identical on both** | 0.0% | ok | p13_0407jan |
| P05 | Airbnb | 16–18 Nov (13) | 7 | £771 | £771.00 | £589.81 (£784.81) = 0.765 | **−23.5%** | FLAG | p05_1618nov |
| P05 | Airbnb | 29 Nov–2 Dec (26–28) | 7 | £1,608 | £1,608.00 | £1,230.12 (£1,425.12) = 0.765 | **−23.5%** | FLAG | p05_2902dec |
| P05 | Airbnb | 14–17 Dec (41) | 7 | £1,697 | £1,697.00 | £1,527.30 (£1,722.30) = 0.900 | −10.0% | FLAG | p05_1417dec |
| P05 | Airbnb | 4–7 Jan (62) | 7 | £1,268 | £1,268.00 | £1,115.84 (visible **"Early booking discount −£152.16" = 12.0%**) | −12.0% | FLAG (visible, not in policy) | p05_0407jan |
| P05 | Airbnb | 9–10 Nov (6) | 7 / 2 | £1,435 | £1,435.00 | £253.44 | **−82.3%** | FLAG | §3 |
| P08 | Airbnb | 5–7 Nov (2) | 4 | £391 | £391.00 | £299.11 (£448.11) = 0.765 | −23.5% | FLAG | p08_0507nov 07:23:43Z |
| P06 | Airbnb | 8–11 Nov (5) | 3 | £722 | £722.00 | £552.33 (£681.33) = 0.765 | −23.5% | FLAG (intentional-block flat; layer check only) | p06_0811nov 07:23:55Z |
| P04 synced | Airbnb | 9–12 / 18–21 Nov (6 / 15) | 2 | £506 / £565 | Smoobu | 0.765 | −23.5% | FLAG | §1 |
| P04 synced | Airbnb | 18–24 Nov, 6 n | 2 | £1,133 | £1,133.00 | £917.73 = 0.900 × visible 10% long stay | −19.0% | FLAG | §1 |
| P04 synced | Airbnb | 6–19 Dec, 13 n (33–45) | 2 | £2,460 | £2,091.00 (weekly 15%) | £1,815.48 = 0.900 × 0.82 | −13.2% | FLAG | §1 |
| P04 synced | Airbnb | 6–9 Dec (33) | 2 | £552 | £552.00 | £496.80 = 0.900 | −10.0% | FLAG | §1 |
| all | Booking.com | — | — | — | — | NOT CHECKED: AWS WAF challenge 07:27:14Z | — | — | live03/bk/search.html |
| all | Vrbo / Direct | — | — | — | — | NOT CHECKED: no URL, no checks row | — | — | — |

**Lead-time layers re-checked live on P20, P12, P13 ×2, P05, P08, P06 (plus synced P04): unchanged, fifth day.**
- Every synced listing resolves per night to the same hidden multipliers:
  - **0.765 at ≤28 days**
  - **0.900 at 29 to at least 45 days**
  - **1.000 at 62+ days**
- The boundary is exact again: P12 lead 28 = 0.765, lead 29 = 0.900.
- Guests see none of these as a discount line. At 62+ days the only discounts are the visible early-booking ones: P13 10% (policy) and P05 12% (not in policy).
- **a-airbnb-rules: NOT fixed.**

**a-p13-twin: NOT fixed and spreading.**
- Reyhan's 2 Nov 15:05Z −5% override on 3064856 for 7–20 Dec and 8–12 Nov was copied to 3090701 as a parent copy (`get_user_logs`).
- Smoobu is identical on both listings (209/223/239; 205/204/200), and the 9–12 Dec and 4–7 Jan Airbnb cards are identical to the penny.
- Policy says the two listings must never be identical. For Corentin to confirm; this is not a new proposal.

### 5. Monitoring: FINAL (period 21 Oct–4 Nov)

**a) Airbnb bookings, last 14 complete days (booked 20 Oct–2 Nov) vs prior 14 (6–19 Oct).**
- Source: `data/snapshots/2026-11-03/reservations.csv`; confirmed bookings only, room £ (cleaning excluded); imported past stays excluded.
- The alternative windows 21 Oct–3 Nov vs 7–20 Oct give identical figures: no Airbnb booking was made on 20 Oct or on 3 Nov before 07:20Z (Smoobu live).

| Window | Bookings | Nights | Room £ | £/night | Cancelled |
|---|---|---|---|---|---|
| Last 14 | 13 | 53 | £10,391.53 | £196 | 2 (P08 duplicate; P04 19–20 Dec) |
| Prior 14 | 23 | 164 | £28,179.02 | £172 | 1 |
| **Change** | **−43%** | **−68% (>50%)** | **−63% (>50%)** | +14% | |
| Excluding 28+ night stays (prior: P01 30 n, P10 32 n) | 13 vs 21 | 53 vs 102 | £10,391.53 vs £20,224.27 | £196 vs £198 | |
| Change | −38% | −48% | −49% | −1% | |
| Uninhibited flats (P04, P05, P08, P12, P13, P20) | 10 vs 12 | 45 vs 57 | £8,792.55 vs £13,527.41 | £195 vs £237 | |
| Change | −17% | −21% | −35% | −18% | |

| Property | Last 14 (count / nights / £ per n) | Prior 14 | >50% drop? |
|---|---|---|---|
| P01 | 0 | 2 / 33 / £160 | yes (−100%); gap block + handback, inventory-limited |
| P02 | 0 | 2 / 10 / £106 | intentional block, not raised |
| P04 | 1 / 3 / £119 | 0 | — (+1 cancelled) |
| **P05** | 2 / 6 / £326 | 2 / 11 / £578 | **£ −69%** (nights −45%) |
| P06 | 2 / 6 / £224 | 4 / 18 / £189 | yes (nights −67%, £ −60%); intentional-block flat, not lost demand |
| P08 | 2 / 9 / £134 | 1 / 6 / £129 | no (handback 13 Nov) |
| P09 | 1 / 2 / £127 | 2 / 14 / £108 | yes; handback 26 Nov |
| P10 | 0 | 1 / 32 / £106 | yes; sold to its 18 Nov handback |
| **P12** | **0** | 2 / 5 / £170 | **yes, −100%, not inventory** (bookable on Airbnb today at 0.765/0.900) |
| **P13** | 1 / 7 / £252 | 5 / 20 / £157 | **yes: count −80%, nights −65%, £ −44%** |
| P20 | **4 / 20 / £176** | 2 / 15 / £159 | no (up) |

Pace by booking date: 23 bookings across 6–19 Oct vs 13 across 20 Oct–2 Nov. The last 14 days had 1–3 bookings on 9 of 14 days; 30–31 Oct had none.

**Paid ÷ PriceLabs at booking, Airbnb bookings made after 21 Oct (12 confirmed; P04 19–20 Dec cancelled).**
- Rows before 1 Nov are carried from `reports/2026-10-30/sections/channel.md` §3. The 1 Nov rows are from `reports/2026-11-02/sections/channel.md` §1. P20 10–13 Nov is new (§2).
- PriceLabs £ = paid ÷ ratio, so ±£1.

| Booked | Ref | Stay (lead) | Paid | PL at booking | Paid ÷ PL | Policy-expected | Gap to policy | Explained? |
|---|---|---|---|---|---|---|---|---|
| 23 Oct | P09 | 13–15 Nov (21) | £253.21 | £329 | 0.770 | £328.84 | £75.63 | rules deprioritised (policy) |
| 25 Oct | P08 | 31 Oct–5 Nov (6) | £676.60 | £796 | 0.850 | £796.00 | £119.40 | no |
| 25 Oct | P06 | 5–8 Nov (11) | £804.77 | £1,052 | 0.765 | £1,051.99 | £247.22 | no: hidden layer |
| 26 Oct | P13 | 27 Dec–3 Jan (62) | £1,766.00 | £2,299 | 0.768 | £1,954.56 (weekly) | £188.56 | yes (weekly × P13 early bird 10%) |
| 27 Oct | P08 | 27–31 Oct (0) | £525.00 | £680 | 0.772 | £680.05 | £155.05 | no |
| 27 Oct | P20 | 2–6 Nov (6) | £733.62 | £994 | 0.738 | £844.96 (LM15) | £111.34 | partly |
| 28 Oct | P20 | 25 Nov–5 Dec (28) | £1,742.65 | £2,727 | 0.639 | £2,318.08 (weekly) | £575.43 | no: hidden layer |
| 29 Oct | P05 | 6–9 Nov (8) | £893.52 | £1,398 | 0.639 | £1,398.31 | £504.79 | no |
| 29 Oct | P04 | 6–9 Nov (8) | £355.72 | £465 | 0.765 | £464.99 | £109.27 | no: hidden layer |
| 1 Nov | P06 | 12–15 Nov (11) | £541.00 | £832 | 0.650 | £832.31 | £291.31 | no: layer + ×0.850 |
| 1 Nov | P05 | 29 Jan–1 Feb (89) | £1,059.52 | £1,204 | 0.880 | £1,204.00 | £144.48 | visible early bird, not in policy |
| **2 Nov** | **P20** | **10–13 Nov (8)** | **£510.00** | **£706** | **0.722** | **£600.10 (LM15)** | **£90.10** | **no: layer + ×0.944** |
| **Total** | | | **£9,861.61** | **£13,483** | **0.731** | **£12,474.19** | **£2,612.58** | 10 of 12 not explained; **£2,348.39** unexplained (excl. P13 explained and P09 deprioritised) |

**End-of-monitoring conclusion (21 Oct–4 Nov):**
1. **The test failed on both measures.**
   - **Volume:** Airbnb volume fell by more than 50% at portfolio level on nights (−68%) and room £ (−63%). Excluding the two long prior stays, the drop is just under the line (−48% / −49%).
   - **Price:** paid-vs-PriceLabs never came close to "PriceLabs minus the 15%/20% stay discounts". Bookings made after 21 Oct paid 0.731 of PriceLabs on average; 10 of 12 sit below policy, and **£2,348 of the shortfall is unexplained**.
2. **Removing the manual promotions did not lift the realised rate.** £/night is £196 vs £172, but it is flat (−1%) once the long prior stays are excluded. The reason is that the systematic cut comes from the hidden lead-time layers (0.765 at ≤28 d, 0.900 at 29–~60 d). These are still live on every synced listing today and are invisible to guests.
3. **The drop is concentrated, not portfolio-wide demand loss.**
   - P12 (0 bookings) and P13 (−80% count) are the clear >50% drops on bookable inventory.
   - P05 is down 69% on £.
   - P20 is the only flat that grew (4 vs 2).
   - P01, P06, P09 and P10 drops are inventory, block or handback effects.
4. **Recommendation: close the monitoring. The promotion removal should not be judged further until the hidden layers are removed** (issue 2). Then re-measure Airbnb paid ÷ PriceLabs on new bookings. Per policy, Corentin prefers visible discounts, so any discount that is still wanted should be "priced in" as a visible Airbnb discount.

**Flexible-cancellation test (P20, P06, P05 from 24 Oct; day 10 of 14, review 7 Nov):**
- Test group: 7 bookings (P20 ×3, P06 ×2, P05 ×2), 0 cancelled.
- Others: 4 confirmed (P08 ×2, P13, P04) and 2 cancelled.
- The test group now takes 7 of 11 confirmed Airbnb bookings. The sample is small.

**b) Booking.com since the markup cut (+30% → +15%, 24 Oct 13:38; 9.7 days).** One new booking: P11 20–22 Nov, £430.11, PriceLabs £461, **0.933**. No Booking.com cancellation since 30 Oct (3 Nov vs 2 Nov full-row diff; P11 3–10 Nov modified 2 Nov 19:19 with no change to dates or price).

| Measure | Bookings | Nights | Room £ (VAT incl.) | PL at booking | Ratio |
|---|---|---|---|---|---|
| Gross since cut | 13 | 54 | £9,204.85 | £11,711 | 0.786 |
| Still confirmed | 11 | 47 | £7,732.04 | £9,998 | 0.773 |
| Net of all cancellations (incl. −25 n / −£5,051.37 on pre-cut bookings) | | **+22 n** | **+£2,680.67** | | |

- Pace: 1.3 bookings/day gross and 1.1/day confirmed, vs about 0.33/day before the cut. The pace is front-loaded: 11 bookings in the first 5.7 days, then 2 in the last 4 (1 Nov P12, 2 Nov P11).
- The rise still cannot be credited to the markup cut alone, because Last Minute 10% started the same day. Earlier PriceLabs-at-booking values are carried from the 30 Oct and 2 Nov sections.

### 6. Net to owner per £100 PriceLabs price (`channel_economics` in `kpi_pack.json`, plus observed)

| Channel / basis | Guest pays (room) | Net |
|---|---|---|
| Booking.com model | £115.00 | £97.75 |
| Booking.com P11 20–22 Nov (0.933, 18% booster) | £93.30 | £76.51 (VAT inside, as in the pack; £63.75 ex-VAT) |
| Booking.com since cut, confirmed (0.773) | £77.30 | ~£63–66 |
| Airbnb model | £100.00 | £84.50 |
| Airbnb live 62+ d | £100 (P13 £90, P05 £88 visible early bird) | £84.50 (£76.05 / £74.36) |
| Airbnb live 29–45 d (0.900) | £90.00 | £76.05 |
| Airbnb live ≤28 d (0.765) | £76.50 | £64.64 |
| Airbnb post-21 Oct bookings (0.731) | £73.10 | £61.77 |
| Airbnb P20 10–13 Nov (0.722) | £72.20 | £61.01 |
| Vrbo model (+8%, unconfirmed) | £108.00 | £99.36 |
| Direct model (−10%, unconfirmed) | £90.00 | £90.00 |

The pack's `warnings` list is empty, but observed prices break both rules:
- **Direct (£90) is not the cheapest:** Airbnb at ≤45 days is £76.50–£90, and Booking.com as sold is £77–93.
- **Booking.com as sold (~£63–66 confirmed average) nets below the Airbnb model (£84.50).** The P11 stay (£76.51) nets above Airbnb's realised ≤28-day £64.64.

Same-date ordering (direct < Airbnb / Booking / Vrbo) is NOT CHECKED: Booking.com is behind the WAF and there is no Vrbo or direct URL.

### 7. Fees and min stay, displayed vs Smoobu

- **Cleaning** is unchanged and exact on every card. P12 2-night stays show £125 (short-stay fee, §Sources).
- **Booking.com cleaning:** P11 £149, which differs from policy's £150 for Shepherd's Bush only; Camden is not covered by that policy line.
- **Min stay:** every check at the Smoobu minimum was offered; none below.
  - P04: no stay under 3 nights was offered.
  - P05: 9 Nov min 1 is offered as 1 night, at the wrong price (§3).
- **P20 min stay conflict.** Reyhan's 2 Nov 23:26Z override (16–19 Nov −2%, `min_stay` 2) is live in Smoobu: 16–19 Nov min 2. This conflicts with policy P20 `min_stay` "3 nights from 25 Oct to 30 Nov". For Corentin to confirm.
- **P20 delivery block (t-p20-delivery).** Smoobu shows 20–21 Nov **available** (`/api/rates`), and Airbnb sold the 21–24 Nov card live (£807.89). Policy records the 20–22 Nov Smoobu block as intentional (delivery), so the block is gone. For Corentin to confirm.
- **P06 (t-p06-open).** 8–11 Nov is still bookable on Airbnb (£681.33 card), inside the run policy lists as intentionally blocked. Status only.
- **Push check (t-push-check).** PriceLabs = Smoobu on all available dates for the 9 listings checked, except **P12 4 Nov (PriceLabs £196 vs Smoobu £170)**. P04/P05/P06 were last pushed 2 Nov 08:54–09:39Z.

### Issues ordered by £ impact

1. **Critical — P04 unsynced Airbnb listing 1455876748739910219 double-sells tonight's arrival (3–6 Nov) and 6–9 Nov.** £748.90 room at risk plus relocation. It also sells every open Barking night (9–12 Nov, 18–24 Nov, 6–19 Dec).
   **Setting:** Airbnb host 551951609 "Seeker Estates LTD" > listing 1455876748739910219 > Calendar: **block 3–9 Nov now**, and block all nights while unsynced. Then either map it in Smoobu > Channel Manager > Airbnb to apartment 3562176, or snooze/unlist it (Barking already sells through 1657859794156786222).
2. **High — hidden Airbnb layers 0.765 (≤28 d) / 0.900 (29–~60 d) on every synced listing (a-airbnb-rules).** These drive the £2,348 unexplained shortfall on post-21 Oct Airbnb bookings. The new P20 booking alone lost £165.91 vs PriceLabs to the layer.
   **Setting:** Smoobu > Channel Manager > Airbnb > each apartment > Default pricing rules (and any global rule): remove the ≤28-day last-minute rule and the ~10% ≤60-day rule. If a discount is wanted, use a visible Airbnb discount (`airbnb_visible_discounts`).
3. **High — P05 9 Nov sells on Airbnb at £253.44 room (20% special offer on a £316.80 base) vs Smoobu £1,435; fourth check unchanged.**
   **Setting:** Airbnb > listing 1618929775762183214 > Calendar > 9 Nov: remove the custom price / special offer. Check Smoobu > Channel Manager > Airbnb sync log for 9 Nov. Block 9 Nov on Airbnb if the orphan night should not sell.
4. **Medium — P05 visible 12% early-booking discount at 60+ days** (£152.16 on a 4–7 Jan stay; £144.48 realised on 29 Jan). Not in policy.
   **Confirm with Corentin, or set:** Smoobu > Channel Manager > Airbnb > Abbey Rd > pricing rules > Early bird.
5. **Medium — P20 10–13 Nov paid ×0.944 below the 0.765 card (£30.09) and £90.10 below policy (LM15).**
   **Check:** Airbnb reservation 162347031 price breakdown / host inbox for a special offer or pre-approval. This is the second sub-layer residual in two days (P06 ×0.850 on 1 Nov).
6. **Medium — P04 synced Barking weekly 18% vs policy 15%** (£66.42 on 6–19 Dec).
   **Setting:** Airbnb host 660820693 > listing 1657859794156786222 > Pricing > Discounts > Weekly: 15% (or the Smoobu Airbnb pricing rule for 3562176, whichever holds it).
7. **Medium — P13 twins identical** (Reyhan's −5% parent copy; identical cards 9–12 Dec and 4–7 Jan). a-p13-twin: for Corentin to confirm. Policy says keep a small gap.
   **Setting:** PriceLabs > 3090701 > detach the copy-from-parent on 7–20 Dec, or set a ±2–3% offset.
8. **Medium — P20 min stay 2 on 16–19 Nov and the 20–21 Nov delivery block removed.** Both conflict with policy. For Corentin to confirm; not a new proposal.

Data gaps:
1. Booking.com displayed prices and promotions: NOT CHECKED (AWS WAF 07:27:14Z; not circumvented). The P11 stack (Mobile 10% × Genius 10% on a rounded-up list) is inferred from paid ÷ list, and the per-night rounding is an inference.
2. P20 ×0.944 and P06 ×0.850 residuals: cause NOT CHECKED (Airbnb host inbox and reservation breakdown are not visible).
3. Listing 1455…'s own reservations and cleaning fee: NOT CHECKED (not in Smoobu). The cards show it unbooked on 3–9 Nov at 07:21Z.
4. Why Airbnb prices P05 9 Nov on £316.80: NOT CHECKED.
5. Vrbo +8% and Direct −10% are unconfirmed defaults; the direct < OTA ordering is model-only.
6. Barking synced weekly 18%: where it is set is NOT CHECKED.
7. PriceLabs-at-booking for pre-1 Nov rows is carried from the 29–30 Oct sections, and PriceLabs £ in §5a is derived from rounded ratios (±£1). The P11 PriceLabs `booked_price` field (241/243) disagrees with the pushed price (230/231); I used the pushed price because it reproduces the paid amount exactly.

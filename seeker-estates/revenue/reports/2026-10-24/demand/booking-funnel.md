# Booking funnel: what our own data says about the drought (D = 24 Oct 2026)

**Scope.** This report uses only our own data: Smoobu bookings and the daily price snapshots. It looks at booking velocity, a year-on-year check, lead time and length of stay, min-stay effects, asked vs paid prices, and gap structure. No guest identities are used.

**Sources**
- `data/snapshots/2026-10-24/reservations.csv`: 669 Smoobu rows. It holds stays from 21 Oct 2025 onwards. Revenue (`total_gbp`) is Smoobu basePrice, before cleaning and commission.
- `data/snapshots/2026-10-18 … 2026-10-24/prices.csv`: seven daily snapshots covering 25 Oct–23 Dec. P13 combines 3064856 and 3090701 (twin). 3090701 has no `ref` in the CSV, so it is shown as P13b.
- `data/policy.json`: price changes, promotion changes, handbacks and min-stay rules.
- Scripts: `/tmp/claude-0/-home-user-seeker-social/33ffe751-5682-5be6-8410-99ebc2a7045b/scratchpad/funnel.py`, `funnel2.py`, `funnel3.py`.

**Counting rules**
- **P04 booking dates.** In Smoobu, P04's `booked_on` is its import date (20 Oct). The real Channex booking dates are 18 Sep (cancelled), 23 Sep, 26 Sep, 11 Oct, 16 Oct and 18 Oct (from `reports/2026-10-21/demand-review.md`). They are used for daily counts only, and P04 is left out of lead-time figures.
- **Gross vs confirmed.** "Gross" counts every booking made, including ones cancelled later. "Confirmed" means `status = confirmed`.
- **Today.** 24 Oct is a partial day.

---

## 0. Answer

1. **The drought is mainly Booking.com, and it started on 3–10 Oct. That is before every recent change.**
   - The last Smoobu-connected Booking.com bookings were:
     - P12 on 3 Oct
     - P11 on 4 Oct
     - P10 on 5 Oct
     - P13 on 10 Oct
   - Since 10 Oct there have been **0 Booking.com bookings in 14 days**. In the previous 365 days the longest gap between Booking.com bookings was **8 days**: 0 of 214 gaps came close.
   - The 7-day rolling count of Booking.com bookings fell from 6 (3–4 Oct) to 1 (12 Oct) and has been 0 since 17 Oct.
   - The silence therefore began 8–15 days **before** the 18 Oct base rises, the 20 Oct P05 rise, and the 21 Oct Airbnb and Booking.com promotion changes. None of those started it.
   - P04 is the exception. It was on Channex at the time, not Smoobu, and its Booking.com bookings kept coming on 11, 16 and 18 Oct. It moved to Smoobu on 20 Oct and has had none since.
   - *Inference:* the cause is something shared by the Smoobu → Booking.com listings from early October (rate level after the +20% markup, or visibility). The data cannot say which.
2. **Airbnb is running at its normal rate. Twenty-one days of strong Airbnb pace hid the Booking.com collapse.**
   - Airbnb took 13 gross bookings in the week of 10–16 Oct, the highest in 120 days, and 6 more on 17–19 Oct.
   - On 20–24 Oct it took **2** (P20 on 21 Oct, P09 on 23 Oct).
   - Over the 4 months before 20 Oct, the flats that are sellable now (P05, P08, P09, P11, P12, P13, P20) produced **0.47 Airbnb bookings a day**, which is **2.4 per 5 days**. That is what we got.
   - Since 26 Jun, 29% of 5-day windows had 2 or fewer Airbnb bookings, so this is not yet abnormal.
   - The same flats produced **0.66 Booking.com bookings a day (3.3 per 5 days)**, and that is the part that is missing.
3. **The pool of sellable flats has shrunk.**
   - P02 and P06 (intentionally blocked) and P01 and P10 (sold out up to handback) produced **75 of 212 bookings (35%)** made between 26 Jun and 19 Oct. They cannot generate new bookings now.
   - Some of "no bookings" is therefore expected: they are flats that have nothing left to sell.
4. **We are asking much more than guests have actually paid.**
   - Booking.com asks for the next 30 days (1.2 × the Smoobu/PriceLabs rate, before promotions) are **1.35–2.24× the Booking.com ADR guests paid on bookings made in the last 90 days**:
     - P13: £235 vs £122
     - P09: £189 vs £117
     - P11: £265 vs £174
     - P12: £256 vs £189
   - On nights already booked in the next 30 days, guests are paying **0.53–0.89×** the PriceLabs price.
5. **Min stay is not the blocker.**
   - In the next 60 days only **1** open night is unsellable under current min stays (P11 23 Dec: a single night with min 3).
   - 1–2-night stays were 10.5% of Airbnb and 19.3% of Booking.com bookings. On the nights open now, the current min stays exclude about 0–6% of each flat's historical stays, except P13 (13%) and P20 (11%).
   - P04's min-3 rule excludes **0%** of its known bookings (all 5 were 3+ nights).
6. **Year on year: there is no usable comparison except P12.**
   - P12 is the only flat that was in Smoobu in October 2025.
   - Bookings made 25 Sep–24 Oct (stays from 21 Oct): **18 gross / 13 confirmed in 2025, all Booking.com**, against **4 gross / 3 confirmed in 2026** (2 Booking.com, 2 Airbnb).
   - Confirmed nights on the books for the next 30 days: 22 on 24 Oct 2025, 12 now.
   - P12's Booking.com demand in this window is down about 89% on last year, at a similar paid ADR (£190 then, £196 now).

---

## 1. Booking velocity, last 120 days

### 1a. Daily gross bookings, last 31 days (confirmed in brackets)
| Date | Airbnb | Booking.com | Other | Event |
|---|---|---|---|---|
| 24 Sep–30 Sep | 12 (8) | 7 (7) | 1 | |
| 1–2 Oct | 0 | 0 | 0 | |
| 3 Oct | 0 | 2 (1) | 0 | P12's last Booking.com booking |
| 4 Oct | 1 | 1 | 0 | P11's last Booking.com booking; Camden Early Booker created |
| 5 Oct | 1 (0) | 1 | 0 | P10's last Booking.com booking |
| 6–8 Oct | 0 | 0 | 0 | |
| 9 Oct | 4 | 0 | 0 | |
| 10 Oct | 4 | 1 | 0 | **last Smoobu Booking.com booking (P13)** |
| 11 Oct | 0 | 1 (P04, Channex) | 0 | |
| 12–15 Oct | 8 (7) | 0 | 0 | |
| 16 Oct | 2 | 1 (P04, Channex) | 0 | |
| 17 Oct | 2 | 0 | 0 | |
| 18 Oct | 3 | 1 (P04, Channex) | 0 | base rises P01, P05, P06, P09, P11, P12 |
| 19 Oct | 1 | 0 | 1 (P20 direct, cancelled) | handback blocks created |
| 20 Oct | 0 | 0 | 0 | P05 base 550; P13 +10%; P04 moved to Smoobu |
| 21 Oct | 1 (P20) | 0 | 0 | Airbnb promotions removed; P13/P11 Booking.com promotions changed |
| 22 Oct | 0 | 0 | 0 | |
| 23 Oct | 1 (P09) | 0 | 0 | |
| 24 Oct (partial) | 0 | 0 | 0 | P04 −8%; P13 overrides reset |

### 1b. Rate per day across the change dates (gross, all channels)
| Window | Days | Gross | Per day | Airbnb / Booking.com / Other |
|---|---|---|---|---|
| 24 Sep–9 Oct | 16 | 30 | 1.88 | 18 / 11 / 1 |
| 10–17 Oct | 8 | 19 | 2.38 | 16 / 3 (2 are P04) / 0 |
| 18–20 Oct (after base rises) | 3 | 6 | 2.00 | 4 / 1 (P04) / 1 |
| 21–24 Oct (after promotion removal) | 4 | 2 | **0.50** | 2 / 0 / 0 |

### 1c. Weekly confirmed bookings by channel (weeks run Saturday to Friday)
| Week from | Airbnb | Booking.com conf (cancelled) | Airbnb nights | Booking.com nights |
|---|---|---|---|---|
| 27 Jun | 7 | 4 (2) | 39 | 13 |
| 4 Jul | 3 | 6 (7) | 27 | 46 |
| 11 Jul | 2 | 4 (3) | 10 | 23 |
| 18 Jul | 4 | 2 (2) | 18 | 7 |
| 25 Jul | 2 | 4 (3) | 7 | 23 |
| 1 Aug | 7 | 4 (1) | 24 | 25 |
| 8 Aug | 5 | 2 (1) | 36 | 12 |
| 15 Aug | 4 | 3 (2) | 14 | 16 |
| 22 Aug | 3 | 2 (0) | 13 | 9 |
| 29 Aug | 5 | 10 (1) | 27 | 51 |
| 5 Sep | 5 | 8 (2) | 54 | 36 |
| 12 Sep | 8 | 6 (6) | 66 | 24 |
| 19 Sep | 7 | 8 (4) | 40 | 37 |
| 26 Sep | 5 | 5 (0) | 22 | 22 |
| 3 Oct | 5 | 3 (1) | 51 | 16 |
| 10 Oct | **13** | 3 (0), 2 of them P04 | 96 | 14 |
| 17 Oct (to 23 Oct) | 8 | 1 (0), P04 | 31 | 13 |

### 1d. Booking.com gross bookings per property per week (Booking.com listings only)
| Ref | 29 Aug | 5 Sep | 12 Sep | 19 Sep | 26 Sep | 3 Oct | 10 Oct | 17 Oct | Last Booking.com booking |
|---|---|---|---|---|---|---|---|---|---|
| P11 | 2 | 2 | 4 | 5 | 1 | 2 | 0 | 0 | 4 Oct (20 days) |
| P12 | 2 | 1 | 4 | 6 | 2 | 1 | 0 | 0 | 3 Oct (21 days) |
| P13 | 1 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 10 Oct (14 days) |
| P09 | 1 | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 17 Sep (37 days) |
| P10 | 1 | 2 | 1 | 0 | 0 | 1 | 0 | 0 | 5 Oct |
| P08 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 28 Jul (88 days) |
| P05 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 3 Mar (235 days; 3 Booking.com rows in 365 days) |
| P04 (Channex) | 0 | 0 | 1 | 1 | 1 | 0 | 2 | 1 | 18 Oct; none since the move to Smoobu on 20 Oct |

P11 and P12 were Booking.com's two volume flats: 9 and 10 gross bookings in the weeks of 12–19 Sep. Both stopped in the first days of October.

### 1e. Does the slowdown line up with a change?
| Change | Date | Booking.com | Airbnb |
|---|---|---|---|
| Base rises (P01, P05, P06, P09, P11, P12) | 18 Oct | Already silent for 8 days (14 for P11/P12). **Not the trigger.** | Pace stayed high on 18–19 Oct (4 bookings). From 20 Oct the pace dropped; it may have contributed, but see the prices below. |
| P05 base 550, P13 +10% | 20 Oct | n/a | P05 and P13 have had 0 Airbnb bookings since 18 Oct (P13 had 4 in the week of 10 Oct). |
| Manual Airbnb promotions (15–20%) removed | 21 Oct | n/a | 2 bookings in 21–24 Oct, which matches the sellable-set baseline of 0.47 a day. Too early to call; the timing fits a conversion drag. |
| Booking.com promotion changes (P13: Domestic, EEA and Early Booker off, Genius 2/3 off, Last Minute to 0–30 days; P11: Early Booker off, Genius 2/3 off) | 21 Oct | Already silent for 11–17 days. **Not the trigger.** The only coincidence: Camden's Early Booker was created on 4 Oct, the day of P11's last Booking.com booking. That fits the timing but not the direction (a discount should not stop bookings). | n/a |
| Handback blocks created | 19 Oct | They only block nights after each handback date. Open nights in the next 30 days for P08 (13) and P09 (11–12) did not change between the 18 and 24 Oct snapshots. **Not a cause.** | Same. |

Open nights in the next 30 days did not shrink over the week:

| Snapshot | P04 | P05 | P06 | P08 | P09 | P11 | P12 | P13 | P20 |
|---|---|---|---|---|---|---|---|---|---|
| 18 Oct | 15 | 9 | 6 | 13 | 12 | 12 | 13 | 17 | — |
| 24 Oct | 23 | 8 | 3 | 13 | 11 | 16 | 18 | 18 | 25 |

So the slowdown is not a supply loss inside each flat's window. Across the portfolio, though, supply is down: see section 0, point 3.

---

## 2. Same booking window last year

Smoobu coverage starts with P12 (stays from 21 Oct 2025). P02, P11 and P13 arrive in November–December 2025, and P05, P06, P01, P08, P09 and P10 in 2026. There was no Airbnb in Smoobu before November 2025. **A portfolio-level year-on-year comparison is therefore not possible; this is UNKNOWN.**

The like-for-like check below uses P12 only, counting bookings with arrival on or after 21 Oct of the same year so that both years are cut the same way:

| P12 | 25 Sep–24 Oct gross / conf | 10–24 Oct gross / conf | Confirmed nights | Paid ADR | OTB nights next 30 / 60 (as of 24 Oct) |
|---|---|---|---|---|---|
| 2025 | 18 / 13, all Booking.com | 7 / 6 | 44 | £190 | 22 / 35 |
| 2026 | 4 / 3 (2 Booking.com, 2 Airbnb) | 2 / 2, both Airbnb | 8 | £196 | 12 / 17 |

Last year P12 went on to take 16 Booking.com bookings (10 confirmed) between 25 Oct and 23 Nov. The season was not dead last year at this flat, and it paid similar rates to those paid now. What has changed is the Booking.com volume.

---

## 3. Lead time, length of stay and min stay

### 3a. Confirmed bookings made in the last 365 days
| Channel | n | Median lead | P25–P75 lead | Lead ≤7 d | Lead ≤14 d | Lead ≤30 d | Median LOS | 1 night | 2 nights | **1–2 nights** | 3–6 nights | 7+ nights |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Airbnb | 258 | 22.5 d | 9–51 | 22% | 35% | 59% | 4 | 2.7% | 7.8% | **10.5%** | 72.9% | 16.7% |
| Booking.com | 218 | 21 d | 5–54 | 31% | 43% | 56% | 4 | 4.1% | 15.1% | **19.3%** | 65.6% | 15.1% |

**What the lead times imply:**
- Booking.com is the more last-minute channel: 31% of its bookings are made within 7 days of arrival.
- About 35–43% of bookings arrive within 14 days, so the open nights between 25 Oct and 7 Nov are still inside normal booking range.
- Bookings made in the last 120 days by lead: 0–7 d: 65; 8–14 d: 24; 15–30 d: 38; 31–60 d: 25; 60+ d: 17.

**Share of 1–2-night stays by property** (confirmed, 365 days):
- P13: 23%
- P06: 20%
- P02: 18%
- P10: 18%
- P09: 17%
- P12: 14%
- P11: 13%
- P01, P05, P08: 5%
- P04: 0% (n=5)
- P20: 0% (n=3)

Last year's November–December stays (P02 and P12 only): Booking.com had 19% at 1–2 nights, Airbnb 0% (n=6).

### 3b. Min stay on the open nights in the next 60 days (24 Oct snapshot, nights after handback excluded)
| Ref | Open | Min-stay mix | Unsellable under min stay | Share of the flat's past stays shorter than the night's min stay |
|---|---|---|---|---|
| P04 | 39 | 38 nights at 3, 1 at 1 (2 Dec) | 0 | **0%** (all 5 known stays were 3+ nights). Policy rule min 3 is kept and costs nothing measurable. |
| P05 | 23 | 13 at 3, 10 at 2 | 0 | 3.6% |
| P06 | 3 | 3 at 2 | 0 | 0% |
| P08 | 13 | 13 at 2 | 0 | 0% |
| P09 | 11 | 11 at 2 | 0 | 0% |
| P11 | 28 | 27 at 2, 1 at 3 | **1 (23 Dec: single night, min 3)** | 6.1% |
| P12 | 33 | 32 at 2, 1 at 1 | 0 | 1.4% |
| P13 | 40 | 22 at 2, 17 at 3 (7–23 Dec), 1 at 1 (1 Dec) | 0 | **13.2%**: 33% of its Booking.com stays and 11% of its Airbnb stays were 1–2 nights, and the 17 December nights at min 3 lose that share |
| P20 | 55 | 46 at 3, 9 at 4 | 0 | 10.9% (from portfolio history, since P20 has n=3) |
| P14 | 60 | 3/4 | 0 | numbers only (policy) |

Min stays did not change over 18–24 Oct (snapshot means are flat), so they cannot explain a change in pace. **Only 1 open night in 60 days is unsellable.** Min stay is not a cause of the drought.

---

## 4. Price guests paid vs price we now ask

### 4a. Paid ADR by month booked, portfolio (confirmed; basePrice ÷ nights)
| Booked | May | Jun | Jul | Aug | Sep | Oct |
|---|---|---|---|---|---|---|
| Airbnb | 186 | 236 | 226 | 222 | 228 | 168 |
| Booking.com | 220 | 191 | 179 | 144 | 163 | 129 |

Booking.com bookings were paid **£129–163/night** across August–October. The October Airbnb figure (168) reflects the mix of flats booked.

### 4b. Asked for open nights in the next 30 days vs paid ADR
- **Asked on Airbnb** = the Smoobu rate, before the Smoobu Airbnb rules (last-minute −15% within 28 days on most listings; P13 now −10% within 14 days; P20 also has the 20% new-listing discount).
- **Asked on Booking.com** = 1.2 × the Smoobu rate, before Booking.com promotions (Mobile 10%, Genius 10%, non-refundable −10%; stacking).
- **bk90** = bookings made in the last 90 days; "stay90" = stays that arrived in the last 90 days.

| Ref | Open nights (30 d) | Asked Airbnb | Paid Airbnb bk90 (n) | Ask ÷ paid | Asked Booking.com (×1.2) | Paid Booking.com bk90 (n) | Ask ÷ paid | Booked nights next 30: PriceLabs price → paid |
|---|---|---|---|---|---|---|---|---|
| P04 | 23 | 163 | — (0) | — | 196 | 153 (5) | **1.28** | 151 → 120 (0.79) |
| P05 | 8 | 482 | 444 (17) | 1.09 | 578 | — (0) | — | 457 → 415 (0.91) |
| P06 | 3 | 354 | 203 (14) | **1.74** | 424 | 189 (3) | **2.24** | 330 → 178 (0.54) |
| P08 | 13 | 167 | 163 (6) | 1.02 | 201 | 212 (1) | 0.95 | 239 → 134 (0.56) |
| P09 | 11 | 158 | 106 (6) | **1.49** | 189 | 117 (6) | **1.62** | 165 → 99 (0.60) |
| P11 | 16 | 221 | — (not on Airbnb) | — | 265 | 174 (16) | **1.52** | 207 → 147 (0.71) |
| P12 | 18 | 213 | 166 (4) | 1.28 | 256 | 189 (11) | **1.35** | 235 → 170 (0.72) |
| P13 (3064856) | 18 | 196 | 158 (12) | 1.24 | 235 | 122 (2) | **1.93** | — |
| P13b (3090701) | 18 | 209 | 158 | 1.32 | 251 | 122 | **2.06** | 202 → 144 (0.71) |
| P20 | 25 | 270 | 162 (3) | **1.67** | 324 | — (0) | — | 267 → 177 (0.66) |

**Reading the table:**
- **Booking.com.** Our list price is 1.3–2.2× what Booking.com guests have actually paid in the last 90 days. Even if all three 10% promotions apply (×0.73 at most), the guest price is still above recent paid levels:
  - P11 at about £193 vs £174 paid
  - P13 at about £172 vs £122
  - P09 at about £138 vs £117
  - P12 at about £187 vs £189 (roughly at parity)
  - Booking.com P12 paid £146 for November stays last year.
- **Airbnb.** After the −15% last-minute rule, asks run at about 0.87–1.48× recent paid:
  - P09: £134 vs £106
  - P06: £301 vs £203
  - P20: £270 × 0.85 × 0.8 = £184 vs £162
  - P08, P05 and P12 are close to parity (P12: £181 vs £166).
- **Inference:** P06, P09, P20 and P13 on Booking.com are the flats where the current ask is furthest above what the market has recently paid us.

### 4c. Price history for the same open nights (25 Oct–23 Nov nights still open on 24 Oct), mean Smoobu rate by snapshot
| Ref | 18 Oct | 19 Oct | 20 Oct | 21 Oct | 22 Oct | 23 Oct | 24 Oct | 24 Oct vs 18 Oct |
|---|---|---|---|---|---|---|---|---|
| P05 | 458 | 504 | 446 | 491 | 487 | 486 | 482 | +5% |
| P06 | 325 | 342 | 311 | 273 | 300 | 331 | 354 | +9% |
| P08 | 209 | 209 | 199 | 200 | 193 | 179 | 167 | −20% |
| P09 | 150 | 166 | 161 | 158 | 157 | 159 | 158 | +5% |
| P11 | 232 | 256 | 250 | 250 | 251 | 246 | 221 | −5% |
| P12 | 239 | 252 | 247 | 241 | 238 | 218 | 213 | −11% |
| P13 | 198 | 198 | 196 | 207 | 203 | 199 | 196 | −1% |
| P04 | — | — | — | 154 | 170 | 168 | 163 | +6% vs 21 Oct |
| P20 | — | 265 | 276 | 271 | 268 | 276 | 270 | +2% vs 19 Oct |

**What the history shows:**
- The 18 Oct base rises lifted these nights by **+5% to +11% on 19 Oct**: P05 +10%, P09 +11%, P11 +10%, P12 +5%.
- By 24 Oct PriceLabs' last-minute dynamics had taken P08, P11 and P12 back below their 18 Oct level.
- The rises are still live on P05 (+5%), P06 (+9%) and P09 (+5%).
- The rises did not start the Booking.com silence (point 1 of section 0). They are a plausible but small extra drag on Airbnb for P05, P06 and P09.
- Removing the 15–20% Airbnb promotions on 21 Oct is a larger guest-facing increase than the base rises on the dates where it applied. Which dates had promotions is NOT IN DATA.

---

## 5. Open nights and gap structure (24 Oct snapshot; nights after handback and intentional blocks excluded)

| Ref | Open next 30 | Open next 60 | Runs in 60 d (length in nights) | Nights in 1–2-night runs | Open Fri/Sat nights (60 d) | Runs in detail (mean Smoobu £) |
|---|---|---|---|---|---|---|
| P04 | 23 | 39 | 24, 1, 14 | 1 | 10 | 1–24 Nov (£165, min 3); **2 Dec single at £630** (min 1); 6–19 Dec (£207) |
| P05 | 8 | 23 | 2, 4, 2, 4, 2, 9 | 6 | 5 | 29–30 Oct (£412); 6–9 Nov (£509); 16–17 Nov (£498); 29 Nov–2 Dec (£529, min 3); 7–8 Dec (£756); 13–21 Dec (£585, min 3) |
| P06 | 3 | 3 | 3 | 0 | 2 | 5–7 Nov (£354), the only open nights (rest intentionally blocked) |
| P08 | 13 | 13 (to 13 Nov handback) | 13 | 0 | 4 | 26 Oct–7 Nov (£167) |
| P09 | 11 | 11 (to 26 Nov handback) | 6, 5 | 0 | 4 | 26–31 Oct (£154); 10–14 Nov (£163) |
| P11 | 16 | 28 | 6, 4, 10, 7, 1 | 1 | 8 | 28 Oct–2 Nov (£204); 10–13 Nov (£214); 18–27 Nov (£260); 12–18 Dec (£274); 23 Dec single (min 3, unsellable) |
| P12 | 18 | 33 (to 13 Dec handback) | 4, 13, 1, 15 | 1 | 7 | 26–29 Oct (£163); 1–13 Nov (£216); **17 Nov single at £378**; 29 Nov–13 Dec (£261) |
| P13 | 18 | 40 | 2, 4, 5, 11, 1, 17 | 3 | 8 | 25–26 Oct (£138); 31 Oct–3 Nov (£181); 8–12 Nov (£208); 17–27 Nov (£216); 1 Dec single (£328, intentional +50%); 7–23 Dec (£239, min 3) |
| P20 | 25 | 55 | 3, 20, 32 | 0 | 13 | 25–27 Oct (£238); 31 Oct–19 Nov (£272); 22 Nov–23 Dec (£343) |
| P14 | 30 | 60 | 60 | 0 | 16 | numbers only (policy) |
| **Total excl. P14** | **135** | **245** | | 12 | | |

**What the gap structure shows:**
- Most open inventory sits in long runs (P04 1–24 Nov, P20 31 Oct–23 Dec, P12, P11 and P13 mid-November). Gap structure does not explain the drought either.
- **The single orphan nights are priced far above their neighbours:**
  - P04 2 Dec: £630 vs £165–207
  - P12 17 Nov: £378 vs £216/£261
  - P13 1 Dec: £328, intentional per policy
- The orphans are only 3 nights in total, so this is a rate issue, not a volume issue.
- The 135 open nights in the next 30 days are concentrated in P04 (23), P20 (25), P12 (18), P13 (18) and P11 (16).

---

## 6. What our own data explains, ranked

1. **Booking.com stopped producing on 3–10 Oct across all Smoobu-connected listings. This is the main cause.** Same evidence as section 0, point 1, plus:
   - Those flats normally got 3.3 Booking.com bookings per 5 days, and that is the volume now missing.
   - P12's Booking.com bookings in this window are down about 89% on last year.
   - The cause is UNKNOWN from our data. Two leads to check in the Booking.com extranet:
     - The list price (1.2× markup) is 1.3–2.2× recent Booking.com paid ADR.
     - The extranet shows search views −64% and availability-for-search at 13.28% (policy.json, Camden screenshot 21 Oct).
2. **A smaller sellable portfolio.** The flats now blocked or sold out produced 35% of recent bookings (section 0, point 3). Fewer bookings per day are expected for that reason alone.
3. **Airbnb is normal, not broken.** It took 2 bookings in 20–24 Oct against an expected 2.4 for the sellable flats. The 21 Oct promotion removal and the base rises still live on P05, P06 and P09 are plausible drags to watch. The next 7 days will show whether Airbnb falls below baseline: under 3 bookings in 7 days would be in the bottom 20%. That threshold is an inference from the 4-day distribution: 20% of 4-day windows had 1 or fewer.
4. **Asked prices well above paid history:**
   - Booking.com on P13, P09, P11 and P06
   - Airbnb on P06, P09 and P20 (the P20 sample is only 3 bookings)
5. **Not causes:**
   - Min stay: 1 unsellable night in 60 days. P04's min-3 rule excludes 0% of its known demand.
   - Handback blocks: these only affect nights after each handback date.
   - Gap structure: most open nights are in long runs.

**Data gaps:**
- Which dates carried the Airbnb promotions removed on 21 Oct.
- Booking.com extranet search and ranking data after 10 Oct.
- When the +20% Smoobu markup was first switched on (policy only says it was confirmed on 20 Oct). If it started in early October, it would line up with the Booking.com cliff. This is UNVERIFIED and the most important thing to check.
- P04's history before Smoobu.
- Portfolio-wide year-on-year data (Smoobu only covers P12 in October 2025).

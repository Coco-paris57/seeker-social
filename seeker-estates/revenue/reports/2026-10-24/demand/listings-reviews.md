# What a guest sees, per property (24 Oct 2026)

Scope: the sellable units P04, P05, P06, P08, P09, P11, P12, P13 and P20. P14 is excluded (numbers only, per policy). The work is read-only. No guest personal data is included. `policy.json` was read first; the `listing_facts` entries are respected and quoted as [policy].

## Sources

| Tag | Source |
|---|---|
| L1 | `reports/2026-10-21/listing-review.md` (titles, Smoobu facts, comps found 21 Oct) |
| L2 | `reports/2026-10-21/airbnb-conversion.md`: Airbnb Insights screenshots, 23 Jul–21 Oct |
| L3 | `reports/2026-10-21/shepherds-bush-booking.md`: Booking.com extranet screenshots and mystery shop, 21 Oct |
| DB | Dropbox `/Airbnb booking conversion`, re-listed 24 Oct. It holds the same 12 PNGs, all modified 21 Oct 10:47Z, so **nothing is new** since L2 |
| SM | Smoobu API `GET /api/apartments/{id}` for all 10 apartment ids, 24 Oct (`rm/smoobu.py`, read-only). The client exposes only `me`, `apartments`, `apartment`, `rates` and `reservations`. **The Smoobu API has no review, rating, photo, description or cancellation-policy fields**, so those cannot come from SM |
| SN | `data/snapshots/2026-10-24/`: `listings.csv` (rating and review columns are **blank for every unit**), `prices.csv` (open nights 25 Oct–23 Nov), `reservations.csv`, `market.csv` (PriceLabs Nearby Listings P25/P50/P75 for same-bedroom units; these are percentiles, not comps) |
| W | WebSearch snippets, 24 Oct (URLs inline). WebFetch on expedia.com failed with `ENOTFOUND`, and airbnb.* and booking.com are blocked by network policy, so **every live OTA page is NOT CHECKED** |
| P | `data/policy.json` |

## Headline: what a guest sees, and why it isn't converting

1. **Our own public review scores are almost all NOT FOUND.** Searches on every known title (Smoobu, Vrbo and Channex names) returned no Airbnb or Booking.com page clearly ours (W). The only verified scores come from Corentin's screenshots:
   - P13 Booking.com: 8.4 from 15 reviews (L3).
   - P13 Airbnb listing 3090701: 4.63 from 8 reviews (L3).
   - P11 Booking.com: 8.0 (P `booking_promotions_camden_21oct`).
   - P20: 0 reviews [policy].

   Two unconfirmed Expedia-group pages may be ours (see P08 and P09). The PriceLabs `listings.csv` rating columns are empty, which is why every comp agent uses `quality_premium` = 0.
2. **A guest who sees one of our listings on two channels sees two different prices.** For the same Shepherd's Bush flat and dates, Booking.com was 21–43% dearer than Airbnb (L3). The cause is portfolio-wide: Booking.com carries a global +20% markup [policy]. On P13 the Booking.com page converted at 0.45% against a market of 2.74% (L3). A guest who recognises the flat books the cheaper channel, or leaves.
3. **The first impression is weak on the card, not on the page.**
   - P05 is on Airbnb page 1 69% of the time, but only 7.3% of searchers click through (portfolio 42%) (L2).
   - On Booking.com, P13 and P11 have click-through of 0.98% and 0.81% against a market of 1.70% (L3, P).
   - Guests who do open the page book well on P05 (6.2%) and P11 (Booking.com 5.9%).

   So the search card (cover photo, title and the total price shown) is the first leak on those units.
4. **Bare building names are still the Smoobu names** for P04 "Barking", P08 "Handa Walk", P09 "Torrent Lodge" and P20 "Waterford Court" (SM). [policy] says Smoobu names are not the public titles. For P20 the public title is known ("Parking & Views - 2 Bedrooms in Canary Wharf"). For P04, P08 and P09 the public title is **NOT FOUND**, so whether guests see a bare name is unverified.
5. **Amenity records are thin on the filters London guests use.** Across all 10 Smoobu apartments (SM), the following are recorded:

   | Amenity | Recorded on |
   |---|---|
   | Self check-in | 0 of 10 |
   | Air conditioning | 0 of 10 |
   | Lift / elevator | 0 of 10 |
   | Work space | 0 of 3 on P11, P12 and P13 |
   | Smart TV / TV | not on P05 |
   | "WiFi" | not on P12 (recorded as "Internet") |
   | Bed types | all empty on P04, P06, P08, P09, P11, P20 and P13-3090701 |

   Comps that rank and sell on these features: "Self check-in (lockbox)" on Guest-favourite Marylebone comps; "Brand New 2 bed/2 bath (with A/C)" in Marylebone; "Gym & Concierge" and "Free Parking" in Canary Wharf; "lift access" in Mile End (W).

   The channel-side amenity lists are NOT CHECKED. One gap is confirmed: the P13 Airbnb page shows "self check-in" (L3) while Smoobu does not record it. So Smoobu under-records some features, and other channels may be missing them too.
6. **Cancellation policy.** Booking.com: every listing has a non-refundable rate at -10% [policy] plus a flexible rate. On P13 the flexible rate was free to cancel up to about 4–5 days before arrival (31 Oct stay: "fully refundable before 27 Oct"; 8 Nov: "before 25 Oct"; 17 Nov: "before 3 Nov") (P mystery shop). Airbnb cancellation policy is **NOT FOUND for every unit**: it is not in the Smoobu API, and Airbnb pages are blocked. History: Booking.com cancellation rates were P11 22 of 60, P12 37 of 109 and P13 21 of 67 (SN `reservations.csv`).

---

## Per property

Notes on the figures below:
- **Price vs market:** the median PriceLabs price on our open nights, 25 Oct–23 Nov (SN `prices.csv`), against same-bedroom Nearby Listings P25/P50/P75 (SN `market.csv`). Nearby Listings prices exclude cleaning. A Booking.com guest sees about 1.2 × the price before promotions [policy].
- **Price points:** individual comp prices were not visible in any snippet (W). The percentiles above are the only price points available.

### P20 Waterford Court, Canary Wharf, 2-bed 2-bath (Smoobu 3547481)

| Item | Finding |
|---|---|
| Public title | "Parking & Views - 2 Bedrooms in Canary Wharf" [policy]. The Smoobu name is "Waterford Court" (SM). Searching the public title returned no match (W) |
| Photos / cover | NOT FOUND. No screenshot exists |
| Reviews | **0 reviews** (new listing, first guest from about 7 Oct [policy]). 3 Airbnb stays in total (SN) |
| Channels | [policy] says Airbnb + Booking.com, but **0 Booking.com reservations ever** (SN). Booking.com listing status and content are NOT CHECKED |
| Airbnb conversion | 1.93% overall; 4.40% listing-to-booking, +1.56 pt vs similar listings (L2) |
| Open next 30 | 25 nights, all min stay 3 [policy: 3 to 30 Nov]. Median £272 vs P50 £266 (P25 224 / P75 324). On Booking.com, ~£326 before promotions = above P75, with 0 reviews (inference) |
| Amenities (SM) | Recorded: free parking on premises, balcony, work space, washer, dryer, dishwasher, Smart TV, intercom, 24 items in all. **Not recorded:** concierge, lift, self check-in, AC, view, gym. Bed types all 0; sleeps 4 |
| Comps (W) | ["Modern/Spacious 2BR Canary Wharf, Gym & Concierge"](https://www.airbnb.ae/rooms/18976813): free parking, city view. ["CanaryWharf FreeParking 25%Weekly 35%Monthly Sale"](https://www.airbnb.com/rooms/1528489702537473050): parking and discount in the title. ["Contemporary 2 Bedroom Flat in Canary Wharf"](https://www.airbnb.com/rooms/1247965628367005807): 4.58 from 12, Superhost, balcony views. A 2-bed/2-bath comp at 4.9 from 10 sells on "skyline view" + free parking. ["Canary Wharf Retreat with Free Secure Parking"](https://www.travelocity.com/London-Hotels-Canary-Wharf-Retreat-With-Free-Secure-Parking.h101755857.Hotel-Information): 10/10. Pattern: area + parking/view + concierge/gym |
| Complaint themes | NOT FOUND (no reviews) |
| Cancellation | Booking.com non-refundable -10% [policy]. Airbnb policy NOT FOUND |

**3 fixes**
1. **Booking.com:** confirm in Smoobu → Channel Manager → Booking.com that 3547481 is mapped and open, and that rates are flowing. Zero Booking.com reservations ever, while the other units take 40–87% of their bookings there (L1), suggests the listing is not live or not visible (inference). If it is live, add a per-property Booking.com new-listing or Genius discount so a 0-review page is not priced above P75.
2. **Smoobu → Apartments → Waterford Court → Rooms/Amenities:**
   - fill in bed types (all 0);
   - add concierge, lift and self check-in, but only if true (the building is described as having concierge and video entry, per L1/JLL);
   - make sure the same is ticked on the Airbnb and Booking.com amenity screens.
3. **First 5 reviews:** request a review from every guest at checkout (Guest favourite needs at least 5 reviews, L1). Keep min stay at 3 [policy]. Lead the photos with the parking space and the balcony view, since the title promises both.

### P04 Barking, 2-bed 2-bath, sleeps 6 (Smoobu 3562176)

| Item | Finding |
|---|---|
| Public title | NOT FOUND. Smoobu name "Barking" (SM). Vrbo "Fantastic 2 bed Flat with amazing view in Barking". Old Channex "Perfect Stay in East London - Barking with views" (L1). Searching both titles found nothing (W) |
| Photos / cover | NOT FOUND |
| Reviews | NOT FOUND. Airbnb is under a different account, whose Smoobu connection is unconfirmed [policy] |
| Bookings | 5 confirmed Booking.com + 1 cancelled, all imported 20 Oct. 0 Airbnb in Smoobu (SN) |
| Open next 30 | 23 nights, min 3 [policy: never below 3]. Median £162 vs P50 £179 (P25 142 / P75 222). Corentin set -8% on 1–25 Nov [policy] |
| Amenities (SM) | Recorded: balcony, work space, Smart TV, washer, dryer, dishwasher, microwave. **Not recorded:** parking, lift, self check-in, AC, view. Bed types all 0 |
| Comps (W) | ["Barking 2 Bed Apt With Parking & Good Travel Links"](https://www.expedia.com/London-Hotels-Riverside-Apt-Sleeps-4.h114179230.Hotel-Information): 10/10 from 10 reviews, parking, city view. ["2 Bed Penthouse - Balcony - Smoking - Parking"](https://ph.trip.com/hotels/barking-hotel-detail-103755308/beautiful-2-bed-penthouse-with-balcony-views-ldn): 2 min from Barking tube; a 6.0 review on Hotels.com says "bit far from city centre". ["Captivating 2-bed Apartment in Barking"](https://www.expedia.com/es/London-Hoteles-Captivating-2-Bed-Apartment-In-Barking.h101604360.Informacion-Hotel): free self-parking. ["Stunning 2 bedroom apartment"](https://ph.trip.com/hotels/barking-hotel-detail-131943266/stunning-2-bedroom-apartment): 18th floor, 360° balcony. **Barking comps sell on parking + station distance + view** |
| Complaint themes | Ours NOT FOUND. Area theme from a comp review: distance to central London (W) |
| Cancellation | Booking.com non-refundable -10% + flexible [policy]. Airbnb NOT FOUND |

**3 fixes**
1. **Airbnb:** confirm whether the separate-account Airbnb listing is live, connected to Smoobu 3562176 and has these dates open. Smoobu shows no Airbnb demand at all (SN), and Barking market occupancy is the lowest of all areas at 25% (SN `market.csv`).
2. **Title and first line on every channel:** state the travel time to central London (for example "Barking 2Bed 2Bath | 20 min to City | Balcony & View | Sleeps 6"). The "far from centre" objection is the area's known weakness (W). The minutes figure must be verified before use. Remove the bare "Barking" name from anywhere it is pushed.
3. **Amenities:** add parking if any exists, plus self check-in and bed types for 6 guests. Comps lead with parking (W).

### P05 St John's Wood, Abbey Rd, 4-bed 3-bath, sleeps 8 (Smoobu 3166592)

| Item | Finding |
|---|---|
| Public title | Changed 21 Oct; the new text is NOT FOUND [policy]. Smoobu still shows "Abbey Rd 4Bed Flat -Step away The Beatles Crossing" (SM) |
| Photos / cover | Cover changed to an external shot on 21 Oct [policy]. Not seen |
| Reviews | NOT FOUND. Possibly ours: Expedia ["4 Bedrooms Peaceful Home Abbey Rd - St Johns Wood"](https://www.expedia.com/London-Hotels-4-Bedrooms-Peaceful-Home-Abbey-Rd-St-Johns-Wood.h120180937.Hotel-Information), 4-bed/3-bath; no score in the 24 Oct snippet (W). L1 saw 4.5 from 34 on an unreliable mirror. Corentin to confirm |
| Airbnb conversion | Page 1 69%, **search → listing 7.31%** (portfolio 42%), listing → booking 6.21% (L2). The card is the leak |
| Bookings | 59 Airbnb confirmed, 0 Booking.com confirmed (3 cancelled) (SN). 0 bookings since the £550 base on 20 Oct (daily-report) |
| Open next 30 | 8 nights, min 2. Median £470 vs 4-bed P50 £616 (P25 507) |
| Amenities (SM) | **No TV/Smart TV, no microwave**, no lift, no AC, no parking, no self check-in. Work space, dishwasher, washer and dryer present. Beds: 2 king, 1 double, 1 single, 1 sofa bed (matches [policy]) |
| Comps (W) | ["Abbey Road Apartment"](https://www.travelocity.com/London-Hotels-Abbey-Road-Apartment.h117400193.Hotel-Information): 4-bed, sleeps 10 (L1). No 4-bed short-let comp with a score was found on 24 Oct |
| Complaint themes | NOT FOUND |
| Cancellation | Airbnb NOT FOUND. 9 Airbnb cancellations in total (SN) |

**3 fixes**
1. **Check the 21 Oct cover and title change against the Airbnb Insights → Conversion search→listing rate** for 22 Oct onward (send a new screenshot). This is the unit's main leak (7.3% click-through). The total shown on the card includes the £195 cleaning fee, which is not to be cut [policy]. Make sure the weekly/monthly discount is shown, so the card total for a long stay shows a strikethrough (Corentin prefers visible discounts [policy]).
2. **Amenities:** add TV/Smart TV and microwave on Smoobu and Airbnb if present. A 4-bed for 8 with no TV is a filter miss (SM).
3. **Booking.com:** 0 of 3 bookings stayed (SN). Audit the 4-bedroom room setup, photos and policies in the extranet before relying on that channel.

### P06 Marylebone, 2-bed 1-bath, sleeps 6 (Smoobu 3288517), 3 open nights (5–7 Nov)

| Item | Finding |
|---|---|
| Title | Smoobu "Elegant 2Bed Marylebone Stay \| Great Location" (SM). Public title NOT FOUND (W) |
| Photos / reviews | NOT FOUND |
| Airbnb conversion | 1.66% overall; 74.8% click, 2.21% book (L2) |
| Open | 3 nights, median £363 vs P50 £416 |
| Amenities (SM) | No dishwasher, microwave, lift, AC or self check-in. Bed types empty |
| Comps (W) | ["Brand New 2 bed/2 bath (with A/C) in Marylebone"](https://www.airbnb.com/rooms/1455815596949778867): 5.0 from 14 reviews, Guest favourite, Superhost, lockbox self check-in. ["Luxury Central Marylebone Mews Town House 2BR 2BA"](https://www.airbnb.co.uk/rooms/38306981): 4.98 from 94, Guest favourite. ["Elegant 2 Bedrooms Flat in Marylebone"](https://www.travelocity.com/London-Hotels-Elegant-2-Bedroom-Apartment-Marylebone-High-Street.h112294782.Hotel-Information): Expedia 8.2 from 24. Comps sell on A/C, 2 baths, self check-in and minutes to Baker St/Bond St |

**3 fixes** (only 3 nights, so low impact)
1. Add self check-in and dishwasher on Smoobu and the channels, if true.
2. Fill in bed types (sleeps 6 with 1 bathroom: show the beds).
3. Replace "Great Location" with a concrete hook ("2 min to Baker St").

### P08 Islington, 2-bed 1-bath, sleeps 4 (Smoobu 3318167), last night 13 Nov

| Item | Finding |
|---|---|
| Title | Smoobu "Handa Walk". Channex "Fabulous 2 Bed Garden Flat in Islington" (L1). Public title NOT FOUND |
| Reviews | NOT FOUND. **Possibly ours:** Expedia/Travelocity ["2 Bed Garden Flat In Islington" / "The Canonbury Apartment"](https://www.travelocity.com/London-Hotels-2-Bed-Garden-Flat-In-Islington.h100785083.Hotel-Reviews), "Rating 10 - Excellent", count not shown. Bedroom count inconsistent (2 vs 3) (W). Unconfirmed |
| Airbnb conversion | Best in the portfolio: 3.05% overall, 70.5% click, 4.33% book (L2) |
| Open next 30 | 13 nights to 13 Nov, min 2. Median £164 vs P50 £227 (P25 190): **below P25** |
| Amenities (SM) | Terrace, work space, dishwasher, washer, dryer. No parking, lift or self check-in. Bed types empty |
| Comps (W) | ["Beautiful Islington Home ~ Garden & Free Parking"](https://www.airbnb.com.au/rooms/13191114): Superhost, top 10%. An Islington 2-bed garden flat with a dedicated workspace and 100% 5-star location ratings ([airbnb.gy/rooms/4799154](https://www.airbnb.gy/rooms/4799154)) |

**3 fixes**
1. Make sure "Handa Walk" is not the public title anywhere. Use "Islington 2Bed Garden Flat | Terrace | Workspace" (L1).
2. The listing converts best of all and is priced below P25, so a listing fix is not the lever here. Make the open nights visible: check that the calendar is open on Booking.com (6 Booking.com stays in total, none recently, SN).
3. Add self check-in and bed types.

### P09 Greenwich, 1-bed, sleeps 2 (Smoobu 3318172), last night 26 Nov

| Item | Finding |
|---|---|
| Title | Smoobu "Torrent Lodge". Channex "Modern 1 Bed Flat in Greenwich" (L1) |
| Reviews | **Possibly ours:** Travelocity/Expedia ["Modern 1 Bed Flat in Greenwich"](https://www.travelocity.com/London-Hotels-Modern-1-Bed-Flat-In-Greenwich.h112382077.Hotel-Reviews), **10/10 from 2 reviews**, praised for cleanliness. The title matches our Channex title exactly (W). Unconfirmed. Airbnb/Booking.com NOT FOUND |
| Airbnb conversion | Weak: 0.41% overall, 38% click, 1.09% book (L2) |
| Open next 30 | 11 nights, min 2. Median £158 vs P50 £142 (P75 172) |
| Amenities (SM) | Balcony, work space, dishwasher, washer, dryer. No view recorded. The building's adverts mention creek-view balconies ([Zoopla](https://www.zoopla.co.uk/to-rent/details/71431485)); our flat's view is unverified |
| Comps | No scored 1-bed comp found 24 Oct. ["Cosy 1 Bed Flat in Greenwich"](https://zh.hotels.com/ho3769099616/cosy-1-bed-flat-in-greenwich): balcony, near Deptford Bridge DLR |

**3 fixes**
1. Airbnb listing-to-booking is 1.09%, so audit the Airbnb page: title (no "Torrent Lodge"), cover photo (balcony/creek view if true), and the first 3 lines.
2. Put the 10/10 Expedia-group reviews to use: if the listing is ours, keep it open, since it is a reviewed channel.
3. The Airbnb rules screen is deprioritised by Corentin [policy]. No action there.

### P11 Camden, 2-bed 2-bath, sleeps 6 (Smoobu 3064196), Booking.com only

| Item | Finding |
|---|---|
| Title | Main photo and property name updated on Booking.com 21 Oct; new text NOT FOUND [policy]. Smoobu "Stylish Camden 2-Bed Next to Camden Station" (SM) |
| Reviews | Booking.com **8.0** (+29.8% vs market); count NOT FOUND [policy]. Searching the title found nothing (W) |
| Booking.com funnel (P) | Search views -64% vs market, click-through 0.81% vs 1.70%, page-to-booking 5.92% vs 2.74%, page score 97.75%, availability for search 13% |
| Bookings | Last booking made 4 Oct (comp-central). A 19–27 Nov stay was cancelled (SN) |
| Open next 30 | 16 nights, min 2. Median £213 vs P50 £306 (P25 244): **below P25 before the 1.2× markup**; Booking.com guest ≈ £256 before promotions |
| Amenities (SM) | **No work space, no dishwasher**, no lift, no AC, no self check-in. Balcony, Smart TV, washer, dryer present. Bed types empty |
| Comps (W) | ["Cozy in Camden Town \| Balcony"](https://www.travelocity.com/es/London-Hoteles-Cozy-In-Camden-Town-Balcony.h111240524.Informacion-Hotel): 8.8, 2-bed 2-bath, 5 min to Camden Town tube. ["Spacious Camden Town Apartment with Balcony"](https://www.expedia.com/London-Hotels-Spacious-Camden-Town-Apartment-With-Balcony.h106322351.Hotel-Information): 10/10, lift, canal view. Airbnb comps: "Home from Home in Camden Town" 4.97/31, Guest favourite; "Camden Town Duplex" 4.47/206 with street/pub noise complaints (L1). **Camden themes: noise, lift, canal view, minutes to tube** |
| Complaint themes | Ours NOT FOUND. Area theme: noise (L1) |
| Cancellation | Booking.com flexible + non-refundable -10% [policy]. 22 of 60 Booking.com bookings cancelled (SN) |

**3 fixes**
1. **The search card is the leak** (0.81% click-through). Booking.com extranet → Property → Photos: check the 21 Oct main-photo change in Analytics once data is past the 10 Oct reporting lag [policy]. Put "2 bathrooms" and "balcony" in the name if not already there.
2. **Get back on Airbnb (decision for Corentin).** Camden had 30 Airbnb bookings, the last made 2 Jun [policy]. It is now on a single channel with search views 64% below the market. Inference: a second channel is the largest volume lever.
3. **Amenities:** add work space and dishwasher if present (SM gaps). State quiet or soundproofing only if true, to answer the area noise theme.

### P12 Mile End, 2-bed 2-bath, sleeps 6 (Smoobu 2699998), last night 13 Dec

| Item | Finding |
|---|---|
| Title | Smoobu "Stylish 2-Bed w/ Stunning View" (no location). Vrbo "Clean & Comfortable 2-Bed with Views in Mile End" (SM, SN). Public titles NOT FOUND (W) |
| Reviews | NOT FOUND |
| Airbnb conversion | 0.39% overall, 31.8% click, 1.22% book: weak at both steps (L2) |
| Bookings | 72 Booking.com confirmed / 37 cancelled; 11 Airbnb (SN). 1–7 Nov stay cancelled |
| Open next 30 | 18 nights, min 2 (one at 1). Median £197.50 vs P50 £215 (P25 179) |
| Amenities (SM) | "Internet", not "WiFi". **No work space, no microwave**, no lift, no self check-in. Beds: 1 king, 1 double, 1 sofa bed |
| Comps (W) | ["Sun Filled 2BD Flat With City Views"](https://www.orbitz.com/London-Hotels-Sun-Filled-2BD-Flat-With-City-Views.h112665307.Hotel-Information): 9.6–9.8, 1 min to Mile End Park, balcony. ["Modern 2BD Flat in Mile End with Private Balcony"](https://www.expedia.com/es/London-Hoteles-Modern-2BD-Flat-In-Mile-End-With-Private-Balcony.h107750248.Informacion-Hotel): 9.6. ["Airy 2-Bedroom Flat with Balcony"](https://www.expedia.com/London-Hotels-Airy-2-Bedroom-Flat-With-Balcony.h104374965.Hotel-Information): 8.8, lift, refurbished 2024. Comps lead with balcony + city view + park/station |

**3 fixes**
1. **Airbnb title with the area:** "Mile End 2Bed 2Bath \| Balcony & Skyline View" (L1). The Smoobu/Airbnb name has no location.
2. **Amenities:** change "Internet" to "WiFi"; add work space and lift if true.
3. **Booking.com cancellations (34%):** there is an open action to tighten the flexible cancellation window (daily-report a-bcom-cancel). Send the P12 Booking.com promotions screen, which has never been seen (daily-report row 7).

### P13 Shepherd's Bush, 2-bed 1-bath, sleeps 6 (Smoobu 3064856 + twin 3090701, one flat)

| Item | Finding |
|---|---|
| Titles | Booking.com: "Top Floor 2Bed with Private Terrace in Shepherds Bush Near Westfield & Tube" (P). Airbnb (Smoobu names): 3064856 "Top-Floor 2Bed with Private Terrace in W12"; 3090701 "Bright 2BR w/Terrace in W12 •Near Westfield & Tube" (SM) |
| Photos / cover | Booking.com: 28 photos, strong main photo of the living room with skyline view (L3). Airbnb twins must keep slightly different photos [policy] |
| Reviews | Booking.com **8.4 from 15** (nine 10s, two 5s, one 3); Staff 8.7, Location 8.6, Comfort 8.4; flat Aug–Oct (L3). Airbnb 3090701 **4.63 from 8** (L3). Airbnb 3064856 NOT FOUND |
| Complaint themes | The low Booking.com scores (two 5s, one 3) exist, but their text is NOT FOUND. Comfort (8.4) is the lowest category (L3). Inference to verify: top floor + 1 bathroom for 6 guests. comp-west notes a lift to the 3rd floor |
| Conversion | Airbnb: SB1 2.26% / 4.09% book; SB2 0.48% / **0.79% book** (L2; mapping to confirm [policy]). Booking.com page-to-booking 0.45% vs market 2.74% (L3) |
| Price as seen | Booking.com flexible was 21–43% dearer than Airbnb for the same dates (L3). Corentin reset the overrides to 0% on 24 Oct [policy] |
| Open next 30 | 18 nights, min 2. Median £201 vs P50 £244 (P25 204): **below P25** |
| Amenities (SM) | 3064856 records 21 amenities, 3090701 23. Neither has work space or lift. Self check-in is shown on Airbnb (L3) but not recorded in Smoobu. Bed types filled only on 3064856 |
| Comps (W) | ["Cozy 2 Bedroom Apt in Shepherds Near Westfield"](https://www.expedia.com/London-Hotels-Cozy-2-Bedroom-Apt-In-Shepherds-Near-Westfield.h76806183.Hotel-Information): 8.0, sleeps 5. "2 superking bedrm Garden flat in w central LDN": 4.84/25 (L1). An Expedia "Bright 2BR" W12 comp advertises fast WiFi + workspace (W) |
| Cancellation | Booking.com flexible (free until about 4–5 days before) + NR -10% (P). Airbnb NOT FOUND. 21 of 67 Booking.com cancelled; 47% of bookings made 30+ days ahead cancelled (L3) |

**3 fixes**
1. **Narrow the cross-channel gap** on Booking.com through per-property promotions (the +20% markup is global [policy]). The Last Minute 0–30 days deal is on since 21 Oct [policy]. Recheck the Booking.com vs Airbnb total for 8–11 Nov after the 24 Oct reset.
2. **Fix SB2's 0.79% listing-to-booking on Airbnb.** Do a photo-by-photo and amenity comparison against SB1. Keep the photos and prices slightly different, never identical [policy]. Add TV and "no smoking" to 3064856 if missing on Airbnb (L1). Narrow the price gap rather than closing it.
3. **Answer the comfort/space objection:** state "1 bathroom" and the lift honestly, add a workspace if there is one, and reply publicly to the three low Booking.com reviews. The complaint text is needed first (extranet → Guest reviews).

---

## Not found / not checked
- Live Airbnb, Booking.com and Vrbo pages for every unit (network-blocked; WebFetch expedia ENOTFOUND).
- Our review scores and counts, except P13 (both channels), P11 (Booking.com score only) and P20 (0).
- Review text and complaint themes for every unit.
- Airbnb cancellation policy for every unit.
- Current public titles for P04, P05 (changed 21 Oct), P06, P08, P09, P11 (changed 21 Oct) and P12.
- Cover photos and photo order, except P13 on Booking.com and the P05 change note.
- Whether the Expedia-group pages for P05, P08 and P09 are ours.
- Whether P20 is live on Booking.com, and whether P04's Airbnb account is live and connected.
- Individual comp prices. Only PriceLabs Nearby Listings percentiles exist; Competitor Listings is not enabled (comp agents).

## Data needed from Corentin (5 minutes each)
1. Airbnb Insights → Conversion screenshot for 1–24 Oct (P05 click-through after the 21 Oct cover change).
2. Booking.com extranet → Guest reviews text for P13 and P11.
3. Booking.com: whether Waterford Court (P20) exists in the extranet, with its status and review count.
4. Airbnb → each listing → Policies → Cancellation policy (one screenshot per listing).
5. Airbnb review score and count per listing (Today → Reviews).

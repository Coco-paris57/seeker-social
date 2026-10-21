# Listing-quality review (non-price), 21 Oct 2026

Scope: P04, P05, P11, P12, P13, P20 (must sell now), then P08 (until 13 Nov) and P09 (until 26 Nov), and P14 (numbers only). P02/P03/P06/P07 are blocked on purpose and P01/P10 are handbacks, so they are excluded. Policy read first: `data/policy.json` (21 Oct 2026).

**Rule used:** every fact has a source tag. Anything not seen is **NOT FOUND** and has not been estimated. No guest names or personal data are included.

## Sources

| Tag | Source (all pulled 2026-10-21) |
|---|---|
| S1 | `data/snapshots/2026-10-21/listings.csv` and `raw/listing_data.json` (PriceLabs): listing names per PMS/channel |
| S2 | Smoobu API `Smoobu().apartment(id)`: rooms, max occupancy, amenities |
| S3 | `data/snapshots/2026-10-21/reservations.csv` (666 rows, 494 confirmed, 172 cancelled) |
| S4 | `data/snapshots/2026-10-21/prices.csv`: min stay on open nights, 22 Oct–20 Dec |
| S5 | PriceLabs `diagnose_no_bookings` (read-only) |
| S6 | PriceLabs `get_listing_health_and_recommendations` (read-only) |
| S7 | WebSearch result snippets (URLs inline). OTA pages could not be opened: WebFetch on expedia.com and on a mirror site both failed with `ENOTFOUND` |
| S8 | `reports/2026-10-21/sections/pricelabs.md`, `comp-east.md`, `kpi_summary.md` |

## Headline findings

1. **Our live public listings could not be seen.** 20+ searches found no Airbnb, Booking.com or Vrbo page that is clearly ours for any unit (S7). So the following are all **NOT FOUND** for every unit:
   - public rating and review count;
   - badges (Guest favourite, Superhost, Genius);
   - photo count and photo order;
   - description text and review themes.

   A proper photo, description and review audit needs read access to the Airbnb host dashboard and the Booking.com extranet (see Access needed). Every rating in `listings.csv` is blank (S1).
2. **Some channel names are bare building or area names.** The Smoobu names are "Waterford Court" (P20), "Barking" (P04), "Handa Walk" (P08) and "Torrent Lodge" (P09) (S1, S2). If Smoobu pushes these names to Airbnb or Booking.com as the public title, the title has no location hook, no bedroom count and no feature.
   - P20 is the most exposed: it has only a Smoobu listing in PriceLabs (S1).
   - Before anything else, check what title guests actually see.
3. **P20 is effectively a one-channel listing.**
   - All 3 reservations ever recorded are 2 Airbnb (confirmed) and 1 direct (cancelled). There is no Booking.com or Vrbo reservation (S3).
   - PriceLabs sync started on 2026-10-09 and the health flag is **Red** (S6).
   - Every open night in the next 60 days needs a stay of 3 nights or more, and 9 nights need 4 (S4).
4. **Booking.com cancellations are heavy on the busiest units** (S3; share of all Booking.com reservations that were cancelled):

   | Unit | Booking.com cancelled | Airbnb cancelled |
   |---|---|---|
   | P12 | 36 of 109 (33%) | 0 of 11 |
   | P11 | 21 of 60 (35%) | 16 of 46 (35%) |
   | P13 | 21 of 67 (31%) | 9 of 44 (20%) |

   The cancellation policy and rate plans are NOT FOUND. A partly or non-refundable Booking.com rate plan is a non-price lever to check.
5. **The channel mix is lopsided** (confirmed reservations, S3):

   | Unit | Airbnb | Booking.com | Other |
   |---|---|---|---|
   | P05 | 59 | 0 (3 cancelled) | — |
   | P12 | 11 | 73 | — |
   | P04 | 0 (Smoobu since 20 Oct only) | 5 | — |

   Each unit is under-converting on one channel, which points to that channel's listing content or setup.
6. **P12 has 312 blocked dates, 14 Dec 2026 to 21 Oct 2027** (S6). This block is not in `policy.json`. If it is not intentional, it is the biggest "sell now" blocker for P12.
7. **None of the 9 focus listings records the same set of amenities in Smoobu** (S2). Self check-in, lift, air conditioning, concierge and gym appear on none of them. Workspace, dishwasher, TV and dryer are missing on some. Whether these are missing on Airbnb or Booking.com too is NOT FOUND, because each channel's amenity list was not visible.

## Title best practice (sources)
- Airbnb title limit is 50 characters including spaces, per Guesty: https://help.guestyforhosts.com/hc/en-gb/articles/11783015183133.
- Airbnb's own guidance suggests about 32 characters so the full title shows on mobile: https://de.airbnb.lu/resources/hosting-homes/a/guidelines-for-writing-your-listing-title-533 (S7 snippet).
- Guest favourite needs at least 5 reviews in 4 years. It is based on ratings (cleanliness, accuracy, check-in and the other categories), reviews and reliability (cancellations): https://www.airbnb.com/help/article/3495 (S7 snippet).
- Pattern seen in nearby top comps (S7): **area + bedrooms/bathrooms + one hard feature** (view, balcony, parking, gym and concierge, minutes to the station).

---

## P20 Waterford Court, Canary Wharf (2-bed). Top priority
**Found**
- **Channel title:** Smoobu name is "Waterford Court" (15 characters) (S1). It is the only PriceLabs listing, with no Channex or Vrbo copy (S1, `id_map.json`). The public Airbnb title is NOT FOUND.
- **Facts (S2):** postcode E14 9GH. 2 bedrooms, 2 bathrooms, sleeps 4. Bed types not filled in (all bed counts are 0).
- **Amenities in Smoobu (24, S2):** balcony, **free parking on premises**, work space, washer and dryer, dishwasher, Smart TV, WiFi, coffee maker, microwave. Lift, concierge, self check-in, air conditioning and view are not listed.
- **Building facts (S7):**
  - JLL rental listing for a Waterford Court E14 9GH flat: daytime concierge, close to Crossharbour DLR. https://residential.jll.co.uk/rent-flat/london-e14-9gh-p163828
  - Estate-agent guide to the development: Waterford Court flats "generally have dock views, balconies, video entry and concierge". https://alexneil.com/development-dockside-turnberry-quay-e14
  - Whether **our** flat has a dock view is NOT FOUND.
- **Rating, reviews, badges, photos, description:** NOT FOUND (S7).
- **Booking history (S3):** 2 confirmed Airbnb stays (arrivals from 10 Oct, median 12 nights) and 1 cancelled direct booking. No Booking.com.
- **Performance and setup:**
  - Next 30 days: 13% booked vs 34% market (S5).
  - Health Red. Market lines: November market 25% vs ours 0%; December market 18% vs ours 0% (S6).
  - Sync started 2026-10-09 (S6).
- **Setup frictions:**
  - Min stay is 3 on all 48 other open nights and 4 on 9 nights (Fri/Sat nights 4–6 Dec, 11–13 Dec, 18–20 Dec) (S4). PriceLabs says the weekend minimum of 4 is above its recommended 3 (S5). The source of the 4-night rule is UNKNOWN (S8).
  - PriceLabs: "Bookings generally happen 0-1 days before stay" in October and 0-8 days in November (S6). The average booking window is 2 days (S5).
  - Last-minute rule: 25% within 15 days. PriceLabs' market setting suggests up to 38% over the last 9 days (S6).
  - Far-out premium: default, not customised (S5).
- **Comparables (S7):**
  - "Perfect London Xmas + 2BR/2BA Apt in Canary Wharf": 4.95 from 38 reviews. It sits next to a "Guest favorite" label, but the snippet does not show which listing the label belongs to. https://www.airbnb.com/the-o2-london-england/stays
  - "Modern/Spacious 2BR Canary Wharf | Gym & Concierge": rating NOT FOUND. https://www.airbnb.ae/rooms/18976813
  - "2 Bed | Canary Wharf | Stunning Views": 9.0/10, 10 minutes to Crossharbour, balcony with City and O2 views. https://www.expedia.com/London-Hotels-2-Bed-Canary-Wharf-Stunning-Views.h111544401.Hotel-Information
  - All three titles lead with area, bedrooms and a hard feature (gym and concierge, views).

**Fixes**
1. HIGH: **Check and replace the public title.**
   - Proposal (48 characters): **"Canary Wharf 2Bed 2Bath | Balcony + Free Parking"**.
   - Free on-site parking and two bathrooms are verified in Smoobu (S2). Comps don't advertise parking.
   - If the flat has a dock view, use "Dock View" in place of "Free Parking", but only once it is verified.
2. HIGH: **Get P20 onto Booking.com (and Vrbo) or confirm it is connected.** All recorded demand is from Airbnb (S3), and the PriceLabs mapping shows no Channex or Vrbo copy (S1). The other units take 40–87% of confirmed bookings from Booking.com (P11, P12, P13; S3).
3. HIGH: **Cut the minimum stay.** Lower the 4-night Fri/Sat nights to 3, as PriceLabs recommends (S5), and test 2 nights on weekdays. Bookings in this market happen 0–8 days before the stay (S6), and a 3+-night rule on a listing with no reviews blocks short city-break and business stays.
4. HIGH: **Get the first 5 reviews.** Guest favourite and search ranking need reviews (help article 3495). The listing has only 2 completed Airbnb stays (S3). Message every guest at check-out and reply to every review. Airbnb's new-listing promotion is a pricing decision for Corentin.
5. MEDIUM: **Complete the amenities and room data.**
   - Fill in bed types (all 0 in Smoobu, S2).
   - Add lift, concierge, self check-in and air conditioning only if they are true. The building has concierge and video entry per S7.
   - Make the Smart TV, work space, washer and dryer, and parking prominent.
6. MEDIUM: **Photos (cannot audit, NOT FOUND).** Lead with the balcony and any view, then both bathrooms, the workspace and the parking. Comps sell on views (S7).
7. MEDIUM: **Last-minute setting:** PriceLabs suggests switching from 25%/15 days to the market setting of up to 38%/9 days (S6). This touches price, so it is listed for completeness.

## P04 Barking (2-bed, sleeps 6)
**Found**
- **Titles (S1):**

  | Listing | Title | Length |
  |---|---|---|
  | Smoobu 3562176 (primary since 20 Oct) | "Barking" | 7 characters |
  | Channex | "Perfect Stay in East London - Barking with views" | 48 characters |
  | Vrbo | "Fantastic 2 bed Flat with amazing view in Barking" | 49 characters |
  | Old Smoobu 3254047 (push off) | "Perfect Stay in East London - Barking with views" | — |

  None of the titles states the 2 bathrooms or sleeps 6. Public Airbnb and Booking.com titles: NOT FOUND (S7 searches on both titles found nothing).
- **Facts (S2):** postcode IG11 7ZH. 2 bedrooms, 2 bathrooms, sleeps 6. Bed types not filled in.
- **Amenities (S2):** 23, including balcony, work space, washer and dryer, dishwasher, Smart TV. No parking, lift, self check-in or air conditioning listed.
- **Rating, reviews, photos:** NOT FOUND.
- **Bookings (S3):** 5 confirmed Booking.com stays plus 1 cancelled, all imported 20 Oct. Median stay 6 nights, median lead time 36 days. No Airbnb reservation in this data.
- **Setup:**
  - Min stay is 3 on 32 of 34 open nights (S4). PriceLabs `diagnose_no_bookings` says the weekday and weekend minimum is 4 vs its recommended 2 (S5). Smoobu's own minimum-stay setting is NOT FOUND.
  - Last-minute: 25%/15 days vs market up to 27%/13 days (S6).
  - Far-out +30% after 150 days is set on both priced listings (S8).
  - Two channel managers push prices and their calendars disagree (S8, item 1).
- **Health:** Blue, outperforming. October 82% vs market 43%; November 20% vs 17% (S6).
- **Comparables (S7):**
  - "Riverside Apt Sleeps 4": 2-bed, 2-bath, near Barking Riverside station, 10/10. https://www.travelocity.com/London-Hotels-Riverside-Apt-Sleeps-4.h114179230.Hotel-Information
  - "The Perfect Home": Barking 2-bed with balcony, 8.0/10. https://www.expedia.com/es/London-Hoteles-The-Perfect-Home.h102324151.Informacion-Hotel
  - "2br 360 Views Balcony Parking Wifi Smarttv": title made entirely of features. https://www.expedia.com/cn/London-Hotels-2br-360-Views-Balcony-Parking-Wifi-Smarttv.h112353562.Hotel-Information
  - Trip.com "Stunning 2 bedroom apartment": 18th floor, 360° balcony. https://uk.trip.com/hotels/barking-hotel-detail-131943266/stunning-2-bedroom-apartment

**Fixes**
1. HIGH: **One clear title on every channel.**
   - Proposal (47 characters): **"Barking 2Bed 2Bath | Balcony & Views | Sleeps 6"**.
   - Both of our own existing titles already claim a view. Bathrooms and sleeps 6 are verified (S2).
   - Do not let "Barking" (7 characters) reach any channel.
2. HIGH: **Get Airbnb live or confirm it.** No Airbnb reservation appears in the data (S3). Which OTAs the Channex property and Smoobu 3562176 are connected to is UNKNOWN (S8).
3. HIGH: **Settle on one channel manager** (S8 item 1) so availability is identical everywhere. A double-booking or a "not available" error hurts reliability, which counts toward Guest favourite (help article 3495).
4. MEDIUM: **Minimum stay:** align with PriceLabs' recommended 2 nights (S5). Smoobu shows 3 (S4).
5. MEDIUM: **Amenities:** fill in bed types for 6 guests. Add parking, lift and self check-in only if they are true. Comps sell on parking and Smart TV (S7).

## P05 St John's Wood, Abbey Rd (4-bed)
**Found**
- **Title (S1):** "Abbey Rd 4Bed Flat -Step away The Beatles Crossing" (50 characters, exactly at the Airbnb limit). The wording "-Step away" is awkward, and the title omits 3 bathrooms and sleeps 8. Public title: NOT FOUND.
- **Facts (S2):** NW8 9QE. 4 bedrooms, 3 bathrooms, sleeps 8. Beds: 2 king, 1 double, 1 single, 1 sofa bed. This matches the policy's "5 beds incl. sofa bed".
- **Amenities (S2):** 20. **No TV or Smart TV and no microwave listed.** Work space, washer and dryer, and dishwasher are listed. No lift, air conditioning, parking or self check-in.
- **Bookings (S3):** 59 confirmed Airbnb. Booking.com: **0 confirmed, 3 cancelled**. 10 future arrivals, all Airbnb.
- **Health:** Blue, outperforming. November 73% vs market 34% (S6).
- **Setup:** min stay 2–3 (S4). Last-minute 25%/15 days vs market up to 40%/15 days (S6).
- **Comparable, possibly ours (S7):** "4 Bedrooms Peaceful Home Abbey Rd / St Johns Wood", 4-bed, 3-bath, steps from Abbey Road. https://www.expedia.com/London-Hotels-4-Bedrooms-Peaceful-Home-Abbey-Rd-St-Johns-Wood.h120180937.Hotel-Information
  - It shows 4.5 from 34 reviews, but only on an unreliable dev-mirror domain.
  - It has the same bedroom and bathroom count as P05. **Corentin to confirm whether this is our listing.**
- **Other comparable (S7):** "Abbey Road Apartment": 4-bed, sleeps 10, 1.5 bathrooms. https://www.travelocity.com/London-Hotels-Abbey-Road-Apartment.h117400193.Hotel-Information
- **Rating, reviews, photos:** NOT FOUND.

**Fixes**
1. HIGH: **Fix the Booking.com listing.** 0 of 3 Booking.com bookings stayed, while 59 Airbnb bookings did (S3). Audit Booking.com photos, room setup (4 bedrooms with bed types), policies and the cancellation rule in the extranet.
2. MEDIUM: **Title.** Proposal (49 characters): **"Abbey Rd 4Bed 3Bath | Sleeps 8 | Beatles Crossing"**. It adds 3 bathrooms and sleeps 8 (S2) and fixes the "-Step away" wording.
3. MEDIUM: **Amenities.** Add TV or Smart TV and microwave if they are present. Both are missing in Smoobu (S2) and are standard for groups of 8.

## P11 Camden (2-bed)
**Found**
- **Title (S1):** "Stylish Camden 2-Bed Next to Camden Station" (43 characters) on Smoobu and Vrbo. It is good, but omits 2 bathrooms, balcony and sleeps 6. Public title: NOT FOUND.
- **Facts (S2):** NW1 9NN. 2 bedrooms, 2 bathrooms, sleeps 6. Bed types not filled in.
- **Amenities (S2):** 20. **No dishwasher, no work space, no "smoking not allowed".** Balcony, washer and dryer, Smart TV listed.
- **Bookings (S3):**
  - Confirmed: 39 Booking.com, 30 Airbnb, 1 Agoda.
  - **Cancelled: 21 Booking.com (35%), 16 Airbnb (35%).**
  - Future arrivals: 7, all Booking.com.
- **Health:** Blue. Recommends min stay 2. Last-minute 18%/15 days vs market up to 40%/8 days (S6). Open nights are mostly min stay 2 (S4).
- **Comparables (S7):**
  - "Home from Home in Camden Town": 4.97 from 31 reviews, Guest favourite. https://www.airbnb.gy/rooms/2813876
  - "2 Minutes Walk To Camden Town Stn": 4.73 from 171 reviews. https://www.airbnb.gy/rooms/2557770
  - "Stunning 2-bedroom top-floor duplex with balcony": 4.68 from 100 reviews, canal view. https://www.airbnb.co.uk/rooms/2328836
  - "Camden Town Duplex, with Downtown City Views": 4.47 from 206 reviews, shown as a bottom-10% listing. Its listing warns of street and pub noise. https://www.airbnb.co.uk/rooms/369383

**Fixes**
1. HIGH: **Cut cancellations.** 37 of 106 Airbnb and Booking.com bookings were cancelled (S3). Review the cancellation policy on both channels and add a non-refundable rate on Booking.com. Cancellations reopen nights at short notice, and a host-side cancellation would also hurt reliability (help article 3495).
2. MEDIUM: **Title.** Proposal (47 characters): **"Camden Town 2Bed 2Bath + Balcony | Next to Tube"**. Facts from S2.
3. MEDIUM: **Amenities.** Add work space and dishwasher if present, and set "no smoking" (S2 gaps). Comps highlight noise. If the flat is quiet, say so in the description; this is NOT FOUND either way.

## P12 Mile End (2-bed, sleeps 6)
**Found**
- **Titles (S1):** Smoobu "Stylish 2-Bed w/ Stunning View" (30 characters, **no location**). Vrbo "Clean & Comfortable 2-Bed with Views in Mile End" (48 characters). Public Airbnb and Booking.com titles: NOT FOUND.
- **Facts (S2):** E3 4NZ. 2 bedrooms, 2 bathrooms, sleeps 6. Beds: 1 king, 1 double, 1 sofa bed.
- **Amenities (S2):** 19. Recorded as **"Internet" rather than "WiFi"**. **No work space, dryer, microwave or coat hangers listed.** Smart TV is present. Balcony, dishwasher, washing machine listed.
- **Bookings (S3):** confirmed 73 Booking.com and 11 Airbnb. **36 Booking.com bookings cancelled (33%).**
- **Health (S6):** Blue. **312 blocked dates from 14 Dec 2026 to 21 Oct 2027.** Last-minute 25%/15 days vs market up to 38%/14 days.
- **Diagnose (S5):** 58% vs market 39% for the next 30 days; no setup issue flagged.
- **Setup frictions:** one orphan night on 22 Oct with a 2-night minimum (S8).
- **Comparables (S7):**
  - "Sun Filled 2BD Flat With City Views": 2-bed, 2-bath, 797 sq ft, 9.6, Mile End Park across the street. https://www.orbitz.com/London-Hotels-Sun-Filled-2BD-Flat-With-City-Views.h112665307.Hotel-Information
  - "Stylish 2 Bedroom Apartment 3 Mins Walk To Mile End Station". https://www.expedia.com/London-Hotels-Stylish-2-Bedroom-Apartment-3-Mins-Walk-To-Mile-End-Station.h101033852.Hotel-Information
  - "Modern 2BD Flat In Mile End With Private Balcony". https://www.expedia.com/es/London-Hoteles-Modern-2BD-Flat-In-Mile-End-With-Private-Balcony.h107750248.Informacion-Hotel

**Fixes**
1. HIGH: **Confirm the 312-day block (14 Dec 2026–21 Oct 2027) with Corentin** (S6). It is not in `policy.json`. If it is not intentional, open the calendar.
2. HIGH: **Fix Airbnb conversion.** Airbnb has 11 confirmed bookings vs 73 on Booking.com (S3). Put "Mile End" in the Airbnb title. Proposal (44 characters): **"Mile End 2Bed 2Bath | Balcony & Skyline View"**. The view is our own claim in both existing titles; balcony and 2 bathrooms are verified in S2.
3. HIGH: **Cut Booking.com cancellations** (33%, S3) with a non-refundable or partly refundable rate plan.
4. MEDIUM: **Amenities.** Change "Internet" to "WiFi" (guests filter on WiFi). Add work space and dryer if present (S2).

## P13 Shepherd's Bush (one flat on two listings)
**Found**
- **Titles (S1):**

  | Listing | Title | Length |
  |---|---|---|
  | 3064856 | "Top-Floor 2Bed with Private Terrace in W12" | 42 characters |
  | 3090701 | "Bright 2BR w/Terrace in W12 •Near Westfield & Tube" | 50 characters |
  | Vrbo | "Flat w/Terrace Shepherds Bush" | — |

  3064856 says "W12" but not "Shepherd's Bush" or "Westfield". Public titles: NOT FOUND.
- **Facts (S2):** W12 7BT. 2 bedrooms, **1 bathroom**, sleeps 6, terrace.
- **Amenities (S2):** **3064856 is missing "Smoking not allowed" and "TV", which 3090701 has.** Neither listing has work space, lift or self check-in.
- **Bookings (S3):**
  - Confirmed: 46 Booking.com, 35 Airbnb, 1 Agoda.
  - Cancelled: **21 Booking.com (31%)**, 9 Airbnb, 3 Agoda, 1 Vrbo.
- **Health:** Green, 13 blocked dates (S6). Blocked nights on one listing are bookings on the other, per policy.
- **Diagnose (S5):** 3064856 shows 17% vs market 39% over 21 days, but it excludes blocked nights, which policy says are bookings. Weekend minimum 4 vs recommended 3. Open nights in `prices.csv` show 2–3 (S4).
- **Comparables (S7):**
  - "2 superking bedrm Garden flat in w central LDN": 2-bed, 2-bath, 4.84 from 25 reviews, near Westfield. https://www.airbnb.co.uk/rooms/38631852
  - "Modern Apartment Shepherd's Bush Near Westfield": 2-bed, 1-bath, sleeps 4. https://www.vrbo.com/en-gb/p4088374vb

**Fixes**
1. MEDIUM: **Title on 3064856.** Proposal (50 characters): **"Shepherd's Bush 2Bed | Private Terrace | Westfield"**. Guests search by area name, and the comps use "Westfield".
2. MEDIUM: **Cut Booking.com cancellations** (31%, S3).
3. MEDIUM: **Make the two listings match.** Add "no smoking" and TV to 3064856 (S2). Show "top floor" honestly, with lift status. Lift status is NOT FOUND; with no lift, a top floor is a common review complaint, so disclose it.
4. MEDIUM: **Min stay:** PriceLabs' weekend 4 vs recommended 3 (S5). Check which setting produces the 4.

## P08 Islington (2-bed, last night 13 Nov)
- **Titles (S1):** Smoobu "Handa Walk" (10 characters). Channex "Fabulous 2 Bed Garden Flat in Islington" (39 characters, push off).
- **Facts (S2):** N1 2RF. 2 bedrooms, 1 bathroom, sleeps 4. Terrace, work space, dishwasher, washer and dryer.
- **Bookings (S3):** 1 future arrival (Airbnb). Booked next 30 days 34% vs market 48%; KPI action "fix-listing" (S8).
- **Possible public listing, unconfirmed (S7):** Expedia "The Canonbury Apartment" / Travelocity "2 Bed Garden Flat In Islington", sleeps 5. https://www.travelocity.com/London-Hotels-2-Bed-Garden-Flat-In-Islington.h100785083.Hotel-Reviews
  - Smoobu says sleeps 4, so this may not be ours. Corentin to confirm.
- **Comparable (S7):** "Beautiful Islington Home ~ Garden & Free Parking": Superhost, top 10%. https://www.airbnb.com.au/rooms/13191114
- **Fixes:**
  - HIGH (cheap): make sure no channel shows "Handa Walk". Proposal (48 characters): **"Islington 2Bed Garden Flat | Terrace | Workspace"**.
  - MEDIUM: keep min stay at 2 (S4) so gaps up to 13 Nov can sell.

## P09 Greenwich (1-bed, last night 26 Nov)
- **Titles (S1):** Smoobu "Torrent Lodge" (13 characters). Channex "Modern 1 Bed Flat in Greenwich" (30 characters, push off).
- **Facts (S2):** SE10 8EQ. 1 bedroom, 1 bathroom, sleeps 2. Balcony, work space, dishwasher, washer and dryer.
- **Bookings and performance:** booked next 30 days 59% vs market 38% (S8). Future arrivals: 3, all Airbnb (S3).
- **Possible public listing, unconfirmed:** Hotels.com "Modern 1 Bed Flat in Greenwich", the same wording as our Channex title (S7). https://ie.hotels.com/ho3597226464/modern-1-bed-flat-in-greenwich
- **Building facts (S7):** a Torrent Lodge rental advert mentions a creek-view balcony. https://zoopla.co.uk/to-rent/details/71431485 Our flat's view is NOT FOUND.
- **Fixes:** MEDIUM: replace any "Torrent Lodge" public title. Proposal (41 characters): **"Greenwich 1Bed Flat | Balcony | Workspace"**.

## P14 Primrose Hill (numbers only, special setup)
- **Title (S1):** "Roof Terrace, Yoga Room up to 4 | Primrose Hill" (47 characters).
- **Facts (S2):** 1 bedroom, 3 bathrooms (as recorded), sleeps 4. Terrace, free parking, work space.
- **Performance (S8):** occupancy last 30 days 0%. Booked next 30 days 0% vs market 41%. 65% of nights at the minimum price.
- **Bookings (S3):** 2 reservations ever: 1 confirmed Airbnb (10 nights), 1 cancelled.
- No changes are proposed, per policy.

---

## Not found (needs a login or access)
- Public titles as shown on Airbnb, Booking.com and Vrbo for every unit.
- Ratings, review counts, category scores, review text and themes.
- Badges: Guest favourite, Superhost, Genius, Preferred.
- Photo count and order, cover photo, description text.
- Booking.com review score and category scores.
- Cancellation policies and rate plans per channel.
- Whether P20 is connected to Booking.com or Vrbo, and whether P04 is connected to Airbnb.
- Lift, air conditioning, self check-in and view status for every flat.
- Whether the Expedia, Hotels.com and Travelocity pages flagged as "possibly ours" (P05, P08, P09) are ours.
- Why P20 has a 4-night minimum on some weekends.
- Whether the P12 block from 14 Dec 2026 to 21 Oct 2027 is intentional.

## Access needed
- Airbnb host account: read-only co-host access, or screenshots of each listing page, its reviews and its Insights (conversion, views).
- Booking.com extranet: property page score, Guest reviews, Opportunity/Analytics, Policies, Rate plans.
- Smoobu channel settings: whether the apartment name is pushed as the OTA title, and which channels each apartment is connected to.
- Vrbo dashboard (the P04, P11, P12 and P13 copies).

"""Everything you might need to change lives in this file.

Items marked  # CONFIRM  are proposals or placeholders that Corentin must
check before the site goes live (prices, contact details, tracking IDs).
"""

SITE_URL = "https://seekerestates.com"          # no trailing slash
BRAND = "Seeker Estates"
TAGLINE = "London homes, properly run."

# --- Contact --------------------------------------------------------------
EMAIL = "corentin@seekerestates.com"            # main public inbox (forms are delivered here)
EMAILS = ["corentin@seekerestates.com", "reyhan@seekerestates.com"]  # both shown on the site; Reyhan is cc'd on every form
PHONE = "+44 7397 573367"                       # as published on the current seekerestates.com ("" to hide)
WHATSAPP = ""                                   # CONFIRM: optional, digits only e.g. "447700900000"
COMPANY_LEGAL = ""                              # CONFIRM: e.g. "Seeker Estates Ltd · Company no. 12345678 · Registered in England & Wales"
INSTAGRAM = ""                                  # CONFIRM: profile URL
FACEBOOK = ""                                   # CONFIRM: page URL
TIKTOK = ""                                     # CONFIRM: profile URL

# --- Booking engine (Smoobu) ---------------------------------------------
BOOKING_URL = "https://seekerestates.myweb.smoobu.com"   # hosted booking site: new-tab fallback only (it refuses to be framed)
# What the on-site /book/ page frames: Smoobu's booking-tool iframe for all apartments.
# Taken from the current site's /reservation/ embed (Smoobu → booking tool 843651, which
# serves this URL). The hosted myweb site above sends X-Frame-Options and can't be framed.
BOOKING_EMBED_URL = "https://booking.smoobu.com/9A843651"
# Query-string names the booking bar passes through. Smoobu's hosted site may
# ignore them, in which case guests just pick dates again on the next screen.  # CONFIRM
BOOKING_PARAMS = {"arrival": "arrival", "departure": "departure", "guests": "guests"}

# --- Forms ----------------------------------------------------------------
# Free, no-account form delivery by FormSubmit (formsubmit.co). Each submission is
# emailed to EMAIL with the other EMAILS in cc. The very first submission sends an
# activation email to EMAIL: click "Activate" once and every later lead arrives.
# FormSubmit then offers a random alias to use instead of the address; paste it here.
FORM_ENDPOINT = f"https://formsubmit.co/ajax/{EMAIL}"

# --- Google tags (leave "" until the accounts exist) ---------------------  # CONFIRM
GA4_ID = "G-W3H8XF3EEN"  # existing GA4 property, taken from the current site (Google Ads ID still to add)
ADS_ID = ""             # "AW-XXXXXXXXXX"
ADS_LEAD_LABEL = ""     # conversion label for landlord leads
ADS_BOOK_LABEL = ""     # conversion label for "Book" clicks (true bookings tracked in Smoobu)
GOOGLE_SITE_VERIFICATION = ""

# --- Facts shown on the site (from Corentin's info pack, 10 Sep 2026) -----
FACTS = {
    "homes": "19",
    "reviews": "520+",
    "booking_score": "8.9",          # Booking.com guest score
    "occupancy": "90%",              # last 12 months, confirmed by Corentin
    "avg_stay": "6 nights",
    "direct_discount": "10%",
}

# --- Landlord pricing (confirmed by Corentin, Oct 2026) ------------------
PRICING = {
    "managed_fee": 15,       # % of booking revenue, + VAT
    "midterm_fee": 12,       # % of rent, + VAT, stays of 1 month+
    "setup_fee": "£0",       # onboarding / listing creation
    "min_term": "12 months", # initial agreement
    "notice": "60 days",     # notice period after the initial term
}

# --- Earnings calculator assumptions --------------------------------------
# Baseline = "inner London" for a well-presented, furnished home. Shown to the
# visitor under "How we estimate this". Tune them to your own portfolio data.
CALC = {
    "bands": {
        "prime":   {"label": "Prime central London", "mult": 1.5},
        "central": {"label": "Central London (zones 1–2)", "mult": 1.2},
        "inner":   {"label": "Inner London", "mult": 1.0},
        "outer":   {"label": "Outer London & commuter belt", "mult": 0.78},
    },
    "postcodeBands": {
        "prime": ["W1", "W2", "W8", "W11", "SW1", "SW3", "SW5", "SW7", "SW10", "NW3", "NW8",
                  "WC1", "WC2", "EC1", "EC2", "EC3", "EC4"],
        "central": ["E1", "E2", "E14", "E20", "N1", "N5", "N7", "N16", "NW1", "NW5", "NW6",
                    "SE1", "SE10", "SE11", "SE16", "SE17", "SW4", "SW6", "SW8", "SW9", "SW11",
                    "W4", "W6", "W9", "W10", "W12", "W14"],
    },
    "innerAreas": ["E", "N", "NW", "SE", "SW", "W", "EC", "WC"],
    #           typical unfurnished long-let rent (£/month), short-stay nightly rate (£), running costs (£/month)
    "beds": {
        "0": {"label": "Studio", "rent": 1650, "adr": 125, "running": 230},
        "1": {"label": "1 bed",  "rent": 2000, "adr": 160, "running": 260},
        "2": {"label": "2 beds", "rent": 2650, "adr": 220, "running": 320},
        "3": {"label": "3 beds", "rent": 3450, "adr": 300, "running": 390},
        "4": {"label": "4+ beds", "rent": 4500, "adr": 390, "running": 470},
    },
    "shortCap": 90,                 # London planning limit on short lets (nights / calendar year)
    "shortNights": [75, 88],        # short-stay nights actually sold, low / high
    "midPremium": [1.35, 1.6],      # furnished, bills-included mid-term rent vs unfurnished long let
    "midOcc": [0.82, 0.92],         # occupancy of the remaining nights on mid-term stays
    "fee": PRICING["managed_fee"] / 100 * 1.2,   # incl. VAT
    "platformShort": 0.15,          # Airbnb / Booking.com / payment fees on short stays
    "platformMid": 0.03,            # payment & referencing on mid-term stays
    "longVoid": 0.05,               # long-let void allowance (share of the year)
    "longAgency": 0.12 * 1.2,       # typical full-management agency fee incl. VAT
}

# --- Areas we host in (guest SEO landing pages) ----------------------------
# Journey times are approximate — verify before running ads that quote them.
AREAS = [
    {
        "slug": "canary-wharf", "name": "Canary Wharf", "short": "Canary Wharf & Docklands",
        "postcode": "E14", "lines": "Jubilee, Elizabeth line, DLR",
        "pitch": "River views, the Elizabeth line on the doorstep and the quickest hop to ExCeL and The O2. Ideal for business trips, exhibitions and concerts.",
        "who": "Business travellers, ExCeL exhibitors and visitors, concert-goers at The O2, families who want space and a view.",
        "near": [("ExCeL London", "Exhibitions and conferences — a short ride on the Elizabeth line or DLR"),
                 ("The O2", "Concerts and events — one stop on the Jubilee line"),
                 ("Canary Wharf offices", "Walk to the financial district"),
                 ("Greenwich", "Across the river by Thames Clipper")],
        "homes": "Two-bedroom apartments sleeping up to 5–6, high floors, balconies and Canary Wharf views.",
        "palette": ("#0F3D2E", "#E9A27F"), "motif": "towers",
    },
    {
        "slug": "marylebone", "name": "Marylebone", "short": "Marylebone",
        "postcode": "W1", "lines": "Baker Street — Bakerloo, Jubilee, Metropolitan, Circle, Hammersmith & City",
        "pitch": "A village in the middle of the West End: Marylebone High Street, Regent's Park and Oxford Street within a walk.",
        "who": "Families and couples who want central London on foot, Harley Street patients and their families, shoppers and theatre-goers.",
        "near": [("Regent's Park", "Walking distance"), ("Oxford Street & Bond Street", "Walking distance"),
                 ("Marylebone High Street", "Cafés, bookshops and restaurants"), ("Harley Street", "Medical district, close by")],
        "homes": "Two-bedroom apartments sleeping up to 6 in a period building.",
        "palette": ("#4A1C17", "#E9A27F"), "motif": "terrace",
    },
    {
        "slug": "st-johns-wood", "name": "St John's Wood", "short": "St John's Wood & Little Venice",
        "postcode": "NW8", "lines": "St John's Wood (Jubilee), Warwick Avenue (Bakerloo)",
        "pitch": "Leafy, quiet and very London: Abbey Road, Lord's Cricket Ground, Regent's Park and the canals of Little Venice.",
        "who": "Larger families and groups, cricket fans at Lord's, Beatles pilgrims, visitors who want calm with the West End close by.",
        "near": [("Lord's Cricket Ground", "Walking distance"), ("Abbey Road crossing", "Walking distance"),
                 ("Regent's Park & London Zoo", "A short walk"), ("Little Venice canals", "Nearby")],
        "homes": "From one-bedroom flats to a five-bedroom house sleeping 8.",
        "palette": ("#1F5A44", "#F6D7B8"), "motif": "terrace",
    },
    {
        "slug": "camden-primrose-hill", "name": "Camden & Primrose Hill", "short": "Camden & Primrose Hill",
        "postcode": "NW1", "lines": "Camden Town, Chalk Farm (Northern line), Camden Road (Overground)",
        "pitch": "Markets, live music and the best free view of London from the top of Primrose Hill.",
        "who": "Music fans heading to the Roundhouse and KOKO, groups of friends, couples who want character.",
        "near": [("Camden Market", "Walking distance"), ("The Roundhouse & KOKO", "Walking distance"),
                 ("Primrose Hill", "The view over the London skyline"), ("Regent's Park & London Zoo", "A short walk")],
        "homes": "One- and two-bedroom homes, including a house with a roof terrace and parking.",
        "palette": ("#2B2D42", "#F0A483"), "motif": "hill",
    },
    {
        "slug": "islington", "name": "Islington", "short": "Islington & Angel",
        "postcode": "N1", "lines": "Angel (Northern line), Highbury & Islington (Victoria, Overground)",
        "pitch": "Upper Street's restaurants and theatres, and a straight run into the City and King's Cross.",
        "who": "Football fans at the Emirates, City workers, couples on a food-and-theatre weekend.",
        "near": [("Upper Street", "Restaurants, bars and theatres"), ("Emirates Stadium", "A short ride"),
                 ("King's Cross St Pancras", "Eurostar, a few stops away"), ("Alexandra Palace", "Concerts, around 25 minutes")],
        "homes": "A two-bedroom home with a private terrace, sleeping up to 5.",
        "palette": ("#5B3A29", "#F6D7B8"), "motif": "terrace",
    },
    {
        "slug": "greenwich", "name": "Greenwich & Woolwich", "short": "Greenwich & Woolwich",
        "postcode": "SE10", "lines": "DLR, Elizabeth line at Woolwich, Thames Clipper",
        "pitch": "Maritime Greenwich, the Cutty Sark and the river — with The O2 and the Elizabeth line close at hand.",
        "who": "Families, O2 concert-goers, visitors to the Royal Observatory and Woolwich Works.",
        "near": [("The O2", "A short ride"), ("Cutty Sark & Royal Observatory", "Walking distance from Greenwich"),
                 ("Woolwich Works", "Next to our Woolwich home"), ("Elizabeth line", "Central London in around 20 minutes from Woolwich")],
        "homes": "One-bedroom apartments sleeping up to 4, with balconies or a riverside terrace.",
        "palette": ("#14365C", "#F0C27B"), "motif": "dome",
    },
    {
        "slug": "notting-hill-bayswater", "name": "Notting Hill & Bayswater", "short": "Notting Hill, Bayswater & Paddington",
        "postcode": "W2", "lines": "Paddington (Elizabeth line, Heathrow Express), Bayswater, Ladbroke Grove",
        "pitch": "Portobello Road, Hyde Park and Paddington's direct trains to Heathrow.",
        "who": "Families visiting London, Heathrow arrivals, groups of up to 8 who want to stay together.",
        "near": [("Hyde Park & Kensington Gardens", "Walking distance"), ("Portobello Road Market", "Walking distance from Ladbroke Grove"),
                 ("Paddington", "Heathrow Express and the Elizabeth line"), ("Winter Wonderland", "Hyde Park, in season")],
        "homes": "From a one-bedroom flat to a three-bedroom apartment sleeping 8.",
        "palette": ("#7A2E3A", "#F6D7B8"), "motif": "terrace",
    },
    {
        "slug": "west-london", "name": "West London", "short": "Shepherd's Bush, Fulham & Ealing",
        "postcode": "W12", "lines": "Central, Hammersmith & City, District and Piccadilly lines",
        "pitch": "Westfield, Stamford Bridge, Wembley within easy reach and a direct line to Heathrow.",
        "who": "Football and concert-goers at Wembley, Chelsea fans at Stamford Bridge, shoppers, Heathrow travellers.",
        "near": [("Westfield London", "Shepherd's Bush"), ("Stamford Bridge", "Walk from our Fulham flat"),
                 ("Wembley Stadium", "Easy reach from Hanger Lane"), ("Heathrow", "Piccadilly line from Hanger Lane")],
        "homes": "One- and two-bedroom apartments, including a large private terrace.",
        "palette": ("#0F3D2E", "#C9D8CF"), "motif": "stadium",
    },
    {
        "slug": "harry-potter-studio-tour", "name": "Near the Studio Tour", "short": "Kings Langley, Hertfordshire",
        "postcode": "WD4", "lines": "Kings Langley (London Northwestern), Watford Junction nearby",
        "pitch": "A modern two-bedroom base around 10 minutes from the Warner Bros. Studio Tour London, with parking.",
        "who": "Families visiting the Studio Tour, visitors who want to drive, groups of up to 6.",
        "near": [("Warner Bros. Studio Tour London", "Around 10 minutes by car"), ("Watford", "Shops and restaurants"),
                 ("London Euston", "Direct trains from Kings Langley"), ("Parking", "Included with the apartment")],
        "homes": "A two-bedroom apartment sleeping 6, with a balcony, lift and parking.",
        "palette": ("#2E2A4F", "#F0C27B"), "motif": "hill",
    },
]

# --- Photos of our homes ----------------------------------------------------
# Only the property photos shown on the old site's /reservation/ page (Oct 2026).
# tools/import_photos.py downloads each "src", strips camera metadata and writes
# assets/img/homes/<key>-640.webp and -1200.webp. "area" puts the photo on that
# area page; "featured" puts it on the home page.
OLD = "https://seekerestates.com/wp-content/uploads/"
PHOTOS = [
    {"key": "nw8-a-lounge", "src": OLD + "2024/04/IMG_4593.jpg", "where": "St John's Wood, NW8", "area": "st-johns-wood", "featured": True,
     "alt": "Open living room with wooden floors, a corner sofa and a dining table"},
    {"key": "nw8-c-living", "src": OLD + "2024/03/IMG_4553.jpg", "where": "Wellington Road, NW8", "area": "st-johns-wood", "featured": True,
     "alt": "Living and dining room with a balcony door and wooden floors"},
]

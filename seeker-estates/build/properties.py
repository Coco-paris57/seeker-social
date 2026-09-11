# From Corentin's info pack, 10 Sep 2026
PROPS=[
# ref, postcode, area, station, type, sleeps, low, high, base, nearest venue, notes
("P01","E14 8NT","Canary Wharf","Canary Wharf (Jubilee/Elizabeth)","2-bed",5,120,450,230,"ExCeL 12 min · O2 9 min","21st floor, lift to 20th, river + City view, balcony, no parking"),
("P02","W10 6JE","Ladbroke Grove","Ladbroke Grove","1-bed",4,60,350,175,"Portobello Rd 5 min","1st floor, new bathroom, new balcony, no lift, no parking"),
("P03","W2 6HG","Bayswater","Bayswater / Paddington","3-bed",8,100,500,323,"Paddington 5 min · Hyde Park","3rd floor, lift, 1 bath + separate WC, no parking"),
("P04","IG11 7ZH","Barking","Barking","2-bed",6,90,450,220,"ExCeL 12 min · O2 9 min [verify]","5th floor, lift, balcony, Canary Wharf view, no parking"),
("P05","NW8 9QE","St John's Wood","St John's Wood","5-bed",8,150,780,455,"Abbey Road crossing · Lord's · Regent's Park","1st-floor entry, over 4 floors, no lift, 2 bath + WC, no parking"),
("P06","W1U 5AL","Marylebone","Baker Street","2-bed",6,200,450,340,"Marylebone Village · Regent's Park · Oxford St","2nd floor, no lift, no parking, street view"),
("P07","SE18 6TL","Woolwich","Woolwich Arsenal (Elizabeth)","1-bed",4,165,350,226,"Woolwich Works · O2 via Elizabeth line","Ground floor, terrace, modern, by the river, no parking"),
("P08","N1 2RF","Islington","Angel / Highbury & Islington","2-bed",5,150,350,250,"Upper St · Ally Pally 25 min · Emirates","Ground floor, bedroom on 1st, terrace, no parking"),
("P09","SE10 8EQ","Greenwich","Greenwich / Cutty Sark","1-bed",4,100,250,160,"Greenwich village · O2 · Cutty Sark","1st floor, lift, balcony, no parking"),
("P10","W5 1AY","Ealing / Hanger Lane","Hanger Lane","1-bed",4,85,250,160,"Wembley Stadium","Ground floor, lift, modern, no parking"),
("P11","NW1 9NN","Camden","Camden Road / Camden Town","2-bed",6,120,400,260,"Camden Market · Roundhouse · KOKO","Basement flat, patio, no lift, no parking"),
("P12","E3 4RZ","Mile End","Mile End","2-bed",6,100,400,270,"Victoria Park · Olympic Park","4th floor, lift, balcony, Canary Wharf view, no parking"),
("P13","W12 7BT","Shepherd's Bush","Shepherd's Bush","2-bed",6,110,380,235,"Westfield · Notting Hill · Loftus Rd","4th floor, lift to 3rd, large terrace, no parking"),
("P14","NW1 8XY","Primrose Hill","Chalk Farm / Camden Town","1-bed",4,400,800,475,"Primrose Hill · Regent's Park · Zoo","Ground-floor house over 4 floors, roof terrace, 1 parking space"),
("P15","E3 3AN","Bow / Devons Road","Devons Road (DLR)","1-bed",4,130,350,190,"Canary Wharf · Olympic Park","2nd floor, lift, balcony, no parking"),
("P16","W9 2PP","Little Venice","Warwick Avenue","1-bed",4,120,350,190,"Little Venice · Paddington","1st floor, no lift, no balcony, no parking"),
("P17","NW8 7BB","St John's Wood","St John's Wood","1-bed",4,105,300,180,"Lord's · Abbey Road · Regent's Park","2nd floor, no lift, no balcony, no parking"),
("P18","SW6 7BG","Fulham","Fulham Broadway","1-bed",4,110,280,180,"Stamford Bridge · King's Rd","1st floor, no lift, no parking"),
("P19","WD4 8FY","Kings Langley (Herts)","Kings Langley","2-bed",6,130,300,185,"Warner Bros. Studio Tour (Harry Potter) ~10 min","4th floor, lift, parking, balcony, modern — outside Greater London"),
]
# Venue → best-placed properties (journey times are estimates to verify before publishing)
VENUES={
"Twickenham":["P18 Fulham (~30 min via Clapham Jn)","P10 Hanger Lane (~35 min)","P13 Shepherd's Bush (~35 min)","P16 Little Venice (~40 min)"],
"Wembley":["P10 Hanger Lane (2 stops)","P13 Shepherd's Bush","P02 Ladbroke Grove"],
"The O2":["P01 Canary Wharf (9 min)","P09 Greenwich","P07 Woolwich (Elizabeth line)","P04 Barking"],
"ExCeL":["P01 Canary Wharf (12 min)","P04 Barking","P07 Woolwich","P15 Devons Rd"],
"Alexandra Palace":["P08 Islington (~25 min)","P11 Camden (~30 min)"],
"Regent's Park / Frieze":["P05 St John's Wood","P06 Marylebone","P14 Primrose Hill","P17 St John's Wood"],
"Hyde Park / Winter Wonderland":["P03 Bayswater","P16 Little Venice","P06 Marylebone"],
"Stamford Bridge":["P18 Fulham (walk)"],
"Emirates":["P08 Islington"],
"Harry Potter Studio Tour":["P19 Kings Langley (~10 min)"],
"Heathrow":["P10 Hanger Lane (Piccadilly)","P03 Bayswater (Elizabeth from Paddington)","P07/P01 via Elizabeth line"],
}
FACTS={"occupancy":"90%","adr":"£290","avg_stay":"6 nights","mix":"65% leisure / 20% family / 10% corporate / 5% long-stay",
"direct_discount":"10% vs OTA nightly rate","min_stay":"2–3 nights; 5 if booking 2+ months ahead; 7 if 4+ months","reviews":"520 total · Airbnb 4.4 · Booking 8.9",
"tone":"Professional. Premium. Reliable.","never":"Never cheap or desperate · never argumentative · never misrepresent","tagline":"Exceptional stays. Professionally managed.",
"founder_on_camera":"NO — faceless brand; voiceover to be confirmed","cleaners_on_camera":"None","booking_engine":"Smoobu"}

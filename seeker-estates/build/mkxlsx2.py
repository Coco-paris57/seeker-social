import sys; sys.path.insert(0,'/home/claude/seeker-estates/build')
from posts import P
from datetime import date
from openpyxl import load_workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation
F="Arial"; NAVY="1F3A5F"
thin=Side(style="thin",color="CCCCCC"); BOX=Border(left=thin,right=thin,top=thin,bottom=thin)
wb=load_workbook("/home/claude/seeker-estates/build/_c1.xlsx")

def header(ws,row,cols,widths):
    for i,(c,w) in enumerate(zip(cols,widths),1):
        cell=ws.cell(row=row,column=i,value=c)
        cell.font=Font(name=F,bold=True,color="FFFFFF",size=10)
        cell.fill=PatternFill("solid",fgColor=NAVY)
        cell.alignment=Alignment(vertical="center",horizontal="center",wrap_text=True)
        cell.border=BOX; ws.column_dimensions[get_column_letter(i)].width=w
    ws.row_dimensions[row].height=32
def title(ws,t,s,n):
    ws.merge_cells(start_row=1,start_column=1,end_row=1,end_column=n); c=ws.cell(row=1,column=1,value=t); c.font=Font(name=F,bold=True,size=15,color=NAVY); ws.row_dimensions[1].height=26
    ws.merge_cells(start_row=2,start_column=1,end_row=2,end_column=n); c=ws.cell(row=2,column=1,value=s); c.font=Font(name=F,size=9,italic=True,color="666666"); ws.row_dimensions[2].height=16
def rows(ws,data,start,wrapcols,heights=40,fills=None):
    r=start
    for row in data:
        for i,v in enumerate(row,1):
            c=ws.cell(row=r,column=i,value=v); c.font=Font(name=F,size=9); c.border=BOX
            c.alignment=Alignment(vertical="top",wrap_text=(i in wrapcols))
            if fills and fills.get(i): c.fill=PatternFill("solid",fgColor=fills[i])
        ws.row_dimensions[r].height=heights; r+=1
    return r-1

# ============ SHEET 2: ASSET REQUESTS ============
ws=wb.create_sheet("Asset Requests")
cols=["Ref","Priority","Capture run","What to shoot","How to shoot it","Kit","Time needed","Feeds which posts","Who","Due","Done?"]
widths=[7,10,22,46,50,20,11,30,12,11,9]
title(ws,"Asset Requests — what the team needs you to capture","Everything the content engine needs. Nothing here requires a professional. A phone, daylight and a steady hand cover 90% of it.",len(cols))
header(ws,4,cols,widths)

A=[
# FOUNDATION — one big batch, week 1
("F01","CRITICAL","Foundation shoot (wk 1)","DONE per Corentin — Full photo + video set of the flagship flat (P01 Canary Wharf?)","Daylight only, curtains open, lights off. Every room from the doorway corner. Then 8-10 video clips of 3-5s: kettle boiling, door opening, bed made, window view, kitchen worktop, shower running, key in lock, sofa.","Phone, tripod optional","3 hrs","Multiple STAY posts, hotel comparison","Ops / you","2026-09-14",""),
("F02","HIGH","Foundation shoot (wk 1)","Founder VOICEOVER — 6 audio clips, voice only (no face)","Record on the phone in a quiet room, 15-25s each: what Seeker is, why you started, what a turnover involves, what you fixed after a bad review. Or confirm text-only and skip.","Phone voice memo","30 min","Launch post, HUMAN slot, PROOF responses","You","2026-09-14",""),
("F03","CRITICAL","Foundation shoot (wk 1)","DONE per Corentin — One complete turnover, filmed start to finish","15-20 clips of 3-5s AND one continuous unedited take of a single room. No music, real sound. Unglamorous is the point.","Phone","2 hrs","PROOF posts 17 Sep, 29 Oct","Cleaning team + you","2026-09-16",""),
("F04","HIGH","Foundation shoot (wk 1)","Brand title card + on-screen text template","Not filming — a designed 2s intro card reading LONDON THIS WEEK, plus a lower-third text style. Same every week.","Canva / designer","1 hr","All 13 weekly anchor posts","Design","2026-09-13",""),
("F05","HIGH","Foundation shoot (wk 1)","Timed walk: flagship flat → nearest station → the venue","ONE continuous take, no cuts, phone held steady at chest height. Speed up 4x in edit, timer overlay. This is your signature format.","Phone, gimbal helps","45 min","STAY 29 Sep (ExCeL)","Ops","2026-09-25",""),
("F06","HIGH","Foundation shoot (wk 1)","Linen store / stock cupboard","One clip, doors open, count out loud. Show the systems: labels, rotation, spares.","Phone","15 min","PROOF 12 Nov","Ops","2026-10-30",""),
("F07","MEDIUM","Foundation shoot (wk 1)","Photo sets for 4 more properties at 4 price points","Same method as F01 but lighter — 12 stills + 4 clips each. Studio / 1-bed / 2-bed / large.","Phone","4 hrs (spread)","STAY 17 Oct 'pick one'","Ops","2026-10-10",""),
("F08","MEDIUM","Foundation shoot (wk 1)","Property set: one large flat shot AS A GROUP SPACE","Table laid for 6, sofa with people on it, kitchen in use. Needs 2-3 friendly humans in frame. Very different from an empty-flat shoot.","Phone + 3 people","1.5 hrs","STAY 1 Dec group booking post","Ops","2026-11-25",""),
("F09","MEDIUM","Guest-places run","The six places guests mention most in reviews — exteriors and a detail each","Pulled from the review export (D02). Film each spot for 2-3 min. Replaces the cleaners-on-camera idea.","Phone","2 hrs","PROOF 1 Oct","Anyone","2026-09-28",""),
# LOCATION / B-ROLL
("L01","HIGH","London B-roll run A","Generic London: tube platform, escalator, black cab, red bus, Thames, terrace street, rain on a window, a kettle, keys","20-30 clips of 3-5s. Shoot on one 2-hour walk. This is your filler library and you will use it constantly.","Phone","2 hrs","Almost every post","Anyone","2026-09-18",""),
("L02","HIGH","London B-roll run B","Heathrow arrivals, luggage storage, Piccadilly line, an early-opening café","For the 6am-landing post. Genuinely go at 6am — the light and the emptiness are the story.","Phone","3 hrs","PRACTICAL 22 Sep","Anyone","2026-09-20",""),
("L03","HIGH","Venue exteriors set 1","ExCeL, The O2 / North Greenwich, Wembley Stadium + Wembley Way, Twickenham + the walk from the station","3-5 clips each. One Saturday covers O2 + ExCeL; a second covers Wembley + Twickenham.","Phone","2 x 3 hrs","Every event-tied post Sep-Dec","Anyone","2026-09-27",""),
("L04","MEDIUM","Venue exteriors set 2","Alexandra Palace, Regent's Park, Trafalgar Square, Hyde Park Corner","For darts, Frieze, Diwali and Winter Wonderland posts.","Phone","3 hrs","LONDON posts Oct-Dec","Anyone","2026-10-08",""),
("L05","HIGH","Timed journeys","Waterloo→Twickenham, and North Greenwich→O2, both filmed as one continuous journey","Same signature format as F05. Film the actual train, the actual walk. Timer added in edit.","Phone","2 x 1.5 hrs","LONDON 21 Nov, STAY 10 Nov","Anyone","2026-11-05",""),
("L06","MEDIUM","Free museums run","Sir John Soane's, Wellcome Collection, Hunterian, Foundling, Leighton House, Garden Museum","Check each one's filming policy at the desk first — several restrict it. Exteriors always work.","Phone","4 hrs (2 trips)","LONDON 10 Oct","Anyone","2026-10-06",""),
("L07","MEDIUM","Wembley food run","5 places to eat within 12 min walk of Wembley Park","Shoot the food, the frontage and the walk. Note real prices.","Phone","2 hrs","LONDON 26 Sep","Anyone","2026-09-24",""),
("L08","MEDIUM","Twickenham matchday run","Pubs that take away fans, the station, the walk, the queue","Best filmed ON a matchday — 8 Nov works. Ask permission inside pubs.","Phone","3 hrs","LONDON 7 Nov + all rugby dates","Anyone","2026-11-08",""),
# SEASONAL — time-critical
("S01","CRITICAL","Seasonal — Oct","Frieze Sculpture in Regent's Park + Mayfair gallery fronts","Free and public. Must be shot 14-18 Oct — it does not exist after that.","Phone","3 hrs","LONDON 13 Oct","Anyone","2026-10-15",""),
("S02","CRITICAL","Seasonal — Nov","Winter Wonderland: entrances, queues, rides, food, the Hyde Park Corner exit","Go on OPENING WEEKEND (19-22 Nov) so the content runs for the full 46 days. Check their filming rules.","Phone","3 hrs","PRACTICAL 17 Nov","Anyone","2026-11-21",""),
("S03","HIGH","Seasonal — Nov","Bonfire night displays + the walk home from one","5 Nov only. Night footage — brace the phone against something solid.","Phone","2 hrs","LONDON 3 Nov (shoot 2025 or stock for the 3rd, real for follow-ups)","Anyone","2026-11-05",""),
("S04","HIGH","Seasonal — Dec","Ten Christmas markets","One weekend covers most of them. Shoot the crowds and the prices, not just the lights.","Phone","5 hrs","LONDON 5 Dec","Anyone","2026-12-03",""),
("S05","HIGH","Seasonal — Nov","Nations Championship weekend at Twickenham, filmed live","27-29 Nov. Crowds, flags, atmosphere. Post SAME DAY.","Phone","3 hrs","LONDON 28 Nov","Anyone","2026-11-28",""),
# DOCUMENTS & DATA — not photography
("D01","CRITICAL","Documents","Your real cost-per-property breakdown (every line item)","A spreadsheet: cleaning, linen, utilities, wifi, insurance, OTA commission, void allowance, restocking, management, licensing.","-","1 hr","LANDLORD 11 Nov, 30 Sep","You","2026-09-25",""),
("D02","CRITICAL","Documents","Export of every guest review, all platforms, last 12 months","CSV or screenshots. Needed for the monthly review posts and the 'we fixed it' format. Include the bad ones — especially the bad ones.","-","1 hr","All PROOF posts","You","2026-09-16",""),
("D03","HIGH","Documents","Your standard management agreement","So the team can write the '6 clauses to check' post honestly against your own contract.","-","15 min","LANDLORD 25 Nov","You","2026-11-18",""),
("D04","HIGH","Documents","A real hotel comparison — screenshot 3 comparable hotels + your rate, same dates","Must be checkable and dated. Never invent these numbers.","-","30 min","STAY 15 Sep, 27 Oct","You","2026-09-13",""),
("D05","HIGH","Documents","RECEIVED 10 Sep — Property list (19 properties)","Now in the Properties tab. Still needed: which is the flagship, and a Drive/Dropbox link to the existing 2026 photo sets.","-","-","Everything","You","2026-09-12",""),
("D06","MEDIUM","Documents","A property you turned down, and why","For the LANDLORD 4 Nov post. Real case, anonymised.","-","20 min","LANDLORD 4 Nov","You","2026-10-28",""),
("D07","MEDIUM","Permissions","Written permission from one guest to tell their story","Ask a happy long-stay guest. Offer something — a discount on their next stay.","-","-","PROOF 5 Nov","You","2026-10-29",""),
("D10","CRITICAL","Accounts","Create a Facebook Page, convert Instagram to Business, link the two, connect Facebook in Metricool","Facebook Page: facebook.com/pages/create (5 min). Then Instagram → Settings → Account type → Business → link to the Page. Then Metricool → Connections → Facebook. Without the Page, Instagram auto-publishing and the whole Facebook channel are blocked.","-","30 min","All scheduled publishing","You","2026-09-12",""),
("D11","CRITICAL","Documents","Smoobu direct-booking page URL","seekerestates.com is a real-estate homepage, not a booking page. Every 'book direct, 10% off' CTA needs a link that lands on availability. Smoobu provides a hosted booking page — send its URL.","-","5 min","Every CTA","You","2026-09-12",""),
("D12","CRITICAL","Compliance","Written answer to the four compliance flags (90-night basis, insurance, licences, redress)","See the message of 10 Sep. The Wednesday landlord track cannot claim anything about Seeker's own compliance until these are answered, and the 90-night post is on hold.","-","20 min","All 13 LANDLORD posts","You","2026-09-16",""),
("D08","HIGH","Brand","RECEIVED logo (PNG on gradient background). Still needed: a version on transparent background, or approval for us to cut one","Navy #0B1F35 extracted from the logo. Fonts: none chosen — we will propose a pairing. Tagline confirmed: Exceptional stays. Professionally managed.","-","-","Every post","You","2026-09-12",""),
]
last=rows(ws,A,5,{4,5,8},46,fills={11:"FFFFCC",2:None})
for r in range(5,last+1):
    p=ws.cell(row=r,column=2).value
    col={"CRITICAL":"F8D7DA","HIGH":"FFF3CD","MEDIUM":"E2E3E5"}.get(p)
    if col: ws.cell(row=r,column=2).fill=PatternFill("solid",fgColor=col)
    ws.cell(row=r,column=10).number_format="ddd dd mmm"
dv=DataValidation(type="list",formula1='"Yes,In progress,No"',allow_blank=True); ws.add_data_validation(dv); dv.add(f"K5:K{last}")
ws.freeze_panes="A5"; ws.auto_filter.ref=f"A4:K{last}"
ws.cell(row=last+2,column=1,value="Critical items outstanding").font=Font(name=F,bold=True,size=10)
ws.cell(row=last+2,column=4,value=f'=COUNTIFS(B5:B{last},"CRITICAL",K5:K{last},"<>Yes")').font=Font(name=F,bold=True,size=10)
ws.cell(row=last+3,column=1,value="Total shoot hours requested").font=Font(name=F,bold=True,size=10)
ws.cell(row=last+3,column=4,value="~48 hrs across 13 weeks ≈ 3.7 hrs/week").font=Font(name=F,size=9,italic=True)
print("assets:",last-4)
wb.save("/home/claude/seeker-estates/build/_c2.xlsx")

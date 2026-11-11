// Demo data for trying the app without Smoobu or real guests: npm run seed-demo
// Creates one property, one booking (surname "Demo", arriving today) and a starter knowledge base.
import { q } from '../src/db.js';
import { createUser } from '../src/auth.js';
import { addDays, londonDate, newToken } from '../src/util.js';
import { config } from '../src/config.js';

const today = londonDate();
let property = q.get("SELECT * FROM properties WHERE ref = 'DEMO'");
if (!property) {
  const id = q.insert(
    `INSERT INTO properties(ref, name, display_name, area, postcode, address, station, notes, details, qr_token)
     VALUES('DEMO', 'Demo Flat', 'Canary Wharf apartment', 'Canary Wharf', 'E14 0XX', '1 Example Quay, London E14 0XX',
       'Canary Wharf (Jubilee / Elizabeth line)', '2-bed, sleeps 5. 21st floor, lift, balcony, no parking.', ?, ?)`,
    JSON.stringify({ rooms: { bedrooms: 2, bathrooms: 1, maxOccupancy: 5 }, amenities: ['WiFi', 'Washing machine', 'Smart TV', 'Dishwasher machine', 'Kitchen', 'Heating'] }),
    process.env.DEMO_QR_TOKEN || newToken(9),
  );
  property = q.get('SELECT * FROM properties WHERE id = ?', id);
  const kb = [
    [id, 'checkin', 'Check-in time and how to check in', 'Check-in is from 15:00. The building has a concierge desk in the lobby: give your name and they will direct you to the lifts. Take the lift to floor 21.', 0],
    [id, 'access', 'Door code and key safe', 'The flat door has a keypad. The code is 4821 followed by the tick button. A spare key is in the key safe inside the hallway cupboard, code 1907.', 1],
    [id, 'wifi', 'WiFi network and password', 'Network: Seeker-Demo. Password: riverview2026.', 1],
    [id, 'appliances', 'How to use the TV', '1. Press the red power button on the Samsung remote.\n2. Press the Home button to open the apps bar for Netflix, YouTube and iPlayer.\n3. Sign in with your own account and please sign out before you leave.\nIf the screen says "No signal", press Source and choose TV.', 0],
    [id, 'appliances', 'How to use the washing machine', '1. Detergent pods are under the kitchen sink: place one in the drum.\n2. Close the door until it clicks.\n3. Turn the dial to Cotton 40 and press Start.\nA normal cycle takes about 2 hours. The door unlocks 2 minutes after the cycle ends. The machine is a washer-dryer: for drying, turn the dial to Dry after the wash.', 0],
    [id, 'transport', 'Nearest station', 'Canary Wharf station (Jubilee and Elizabeth lines) is a 6-minute walk. Heron Quays DLR is 4 minutes.', 0],
    [id, 'checkout', 'Checkout', 'Checkout is by 11:00. Please leave used towels in the bath, put rubbish in the chute by the lifts, switch off the heating and close the door behind you. It locks automatically.', 0],
    [null, 'rules', 'House rules', 'No smoking anywhere in the property. No parties or events. Quiet hours are 22:00 to 08:00. Only the guests on the booking may stay.', 0],
    [null, 'local', 'Paying for public transport', 'You do not need a ticket: tap the same contactless card or phone on the yellow reader at the start and end of each Tube, DLR or Elizabeth line journey. On buses tap once when boarding.', 0],
  ];
  for (const k of kb) q.run("INSERT INTO knowledge(property_id, category, question, answer, sensitive, source) VALUES(?, ?, ?, ?, ?, 'team')", ...k);
}
q.run('DELETE FROM reservations WHERE id = 900000001');
q.run(
  `INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, check_in, check_out, adults, children, channel, language)
   VALUES(900000001, ?, 'Alex', 'Demo', 'Alex Demo', ?, ?, '15:00', '11:00', 2, 0, 'Direct booking', 'en')`,
  property.id, today, addDays(today, 4),
);
if (process.env.DEMO_ADMIN_PASSWORD && !q.get("SELECT 1 FROM users WHERE email = 'demo@example.com'")) {
  createUser({ email: 'demo@example.com', name: 'Demo Admin', password: process.env.DEMO_ADMIN_PASSWORD, role: 'admin' });
  console.log('Team sign-in: demo@example.com with the password from DEMO_ADMIN_PASSWORD');
}
console.log(`Demo property ready. Guest chat: ${config.baseUrl}/g/${property.qr_token}`);
console.log(`Verify the booking with surname "Demo" and arrival date ${today}.`);

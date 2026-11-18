import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startServer, seed, signIn, client, q } from './helpers.js';
import { config } from '../src/config.js';
import { useSmoobuClient } from '../src/smoobu.js';
import { handleSmoobuEvent } from '../src/routes/webhooks.js';
import { setSetting } from '../src/db.js';

let srv, ctx;
const outbox = [];
const fake = {
  messages: async (bookingId) => (bookingId === 501
    ? [{ id: 9001, type: 1, message: '', htmlMessage: '<p>How do I use the washing machine?</p>' }, { id: 9002, type: 2, message: 'Welcome!', htmlMessage: '' }]
    : []),
  sendMessageToGuest: async (bookingId, body) => { outbox.push({ bookingId, body }); return { status: 201 }; },
  reservation: async () => { throw new Error('unknown booking'); },
};

before(async () => { srv = await startServer(); ctx = seed({ mode: 'auto' }); useSmoobuClient(fake); config.smoobuInbox = true; setSetting('channelAuto', true); });
after(() => { useSmoobuClient(null); config.smoobuInbox = false; return srv.close(); });

test('a guest message from Smoobu is answered back through Smoobu, once', async () => {
  const event = { action: 'newMessage', data: { id: 9001, sender: 'guest', booking: { id: 501 } } };
  await handleSmoobuEvent(event);
  await handleSmoobuEvent(event); // Smoobu retries deliveries
  assert.equal(outbox.length, 1);
  assert.equal(outbox[0].bookingId, 501);
  assert.match(outbox[0].body, /Cotton 40/);
  const c = q.get("SELECT * FROM conversations WHERE channel = 'smoobu'");
  assert.equal(c.reservation_id, 501);
  assert.equal(c.verified, 1);
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND role = 'guest'", c.id).n, 1);
});

test('concurrent deliveries of the same message are processed once; a host message is never treated as guest text', async () => {
  fake.messages = async () => [{ id: 9020, type: 1, message: 'washing machine?', htmlMessage: '' }, { id: 9021, type: 2, message: 'washing machine template from host', htmlMessage: '' }];
  outbox.length = 0;
  const e = { action: 'newMessage', data: { id: 9020, sender: 'guest', booking: { id: 501 } } };
  await Promise.all([handleSmoobuEvent(e), handleSmoobuEvent(e)]);
  assert.equal(outbox.length, 1);
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9021, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 1);
  fake.messages = async (bookingId) => (bookingId === 501 ? [{ id: 9001, type: 1, message: '', htmlMessage: '<p>How do I use the washing machine?</p>' }, { id: 9002, type: 2, message: 'Welcome!', htmlMessage: '' }] : []);
});

test('host messages, unknown bookings and a disabled inbox are ignored', async () => {
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9002, sender: 'host', booking: { id: 501 } } });
  await assert.rejects(handleSmoobuEvent({ action: 'newMessage', data: { id: 9003, sender: 'guest', booking: { id: 777 } } }));
  config.smoobuInbox = false;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9001, sender: 'guest', booking: { id: 501 } } });
  config.smoobuInbox = true;
  assert.equal(outbox.length, 0);
});

test('in learning mode the Smoobu reply waits for approval and no holding note is sent to the channel', async () => {
  q.run('UPDATE properties SET mode = NULL WHERE id = ?', ctx.propertyId);
  fake.messages = async () => [{ id: 9010, type: 1, message: 'washing machine instructions?', htmlMessage: '' }];
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9010, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 0);
  const team = await signIn(srv.base);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals[0].draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(outbox.length, 1);
  assert.match(outbox[0].body, /Cotton 40/);
});

test('the Settings switch connects Smoobu, and channel replies wait for approval until the second switch', async () => {
  config.smoobuInbox = false;
  setSetting('channelAuto', false);
  q.run("UPDATE properties SET mode = 'auto' WHERE id = ?", ctx.propertyId);
  const registered = [];
  fake.webhooks = async () => ({ webhooks: [{ id: 1, webhookUrl: 'https://other.example/hook' }] });
  fake.createWebhook = async (url) => { registered.push(url); return { id: 2 }; };
  const team = await signIn(srv.base);

  // Without a public https address the switch refuses and stays off.
  assert.equal((await team('PATCH', '/api/admin/settings', { channelInbox: true })).status, 400);
  assert.equal((await team('GET', '/api/admin/settings')).json.settings.channelInbox, false);

  config.baseUrl = 'https://concierge.example';
  assert.equal((await team('PATCH', '/api/admin/settings', { channelInbox: true })).status, 200);
  assert.equal(registered.length, 1);
  assert.equal(registered[0], 'https://concierge.example/api/webhooks/smoobu/test-webhook-token');
  assert.equal((await team('GET', '/api/admin/me')).json.smoobuInbox, true);

  // Property is in auto, but channel replies still wait for a person.
  fake.messages = async () => [{ id: 9030, type: 1, message: 'How do I use the washing machine?', htmlMessage: '' }];
  outbox.length = 0;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9030, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 0);
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.at(-1).draft;
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  assert.equal(outbox.length, 1);

  // Even an urgent first reply waits on a booking channel.
  fake.messages = async () => [{ id: 9031, type: 1, message: 'I can smell gas in the kitchen', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9031, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 1);
  const inbox = (await team('GET', '/api/admin/inbox')).json;
  assert.ok(inbox.tickets.some((t) => t.type === 'urgent'));
  assert.equal(inbox.approvals.at(-1).draft.kind, 'urgent');

  // Second switch: now the auto property answers by itself.
  assert.equal((await team('PATCH', '/api/admin/settings', { channelAuto: true })).status, 200);
  fake.messages = async () => [{ id: 9032, type: 1, message: 'washing machine instructions please', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9032, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 2);

  // Switched off again: messages are ignored.
  await team('PATCH', '/api/admin/settings', { channelInbox: false });
  fake.messages = async () => [{ id: 9033, type: 1, message: 'washing machine?', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9033, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 2);
});

test('a photo sent on the booking channel arrives empty: the team is told where to see it and no draft is written', async () => {
  const { sent } = await import('../src/notify.js');
  const team = await signIn(srv.base);
  await team('PATCH', '/api/admin/settings', { channelInbox: true });
  fake.messages = async () => [{ id: 9040, type: 1, message: '', htmlMessage: '' }];
  outbox.length = 0;
  const before = (await team('GET', '/api/admin/inbox')).json.counts.total;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9040, sender: 'guest', booking: { id: 501 } } });
  assert.equal(outbox.length, 0);
  assert.equal((await team('GET', '/api/admin/inbox')).json.counts.total, before);
  assert.match(sent.at(-1).title, /Photo or file from a guest/);
  const c = q.get("SELECT id FROM conversations WHERE channel = 'smoobu' AND reservation_id = 501");
  const last = (await team('GET', `/api/admin/conversations/${c.id}`)).json.messages.filter((m) => m.role === 'guest').at(-1);
  assert.match(last.text, /cannot be shown here/);
});

test('booking-channel replies speak as the team ("we"); the web chat speaks as the assistant ("I")', async () => {
  const { systemPrompt } = await import('../src/llm.js');
  const { buildContext } = await import('../src/bot.js');
  const { openChat, say } = await import('./helpers.js');
  const channel = q.get("SELECT * FROM conversations WHERE channel = 'smoobu' AND reservation_id = 501");
  const forChannel = systemPrompt(buildContext(channel));
  assert.match(forChannel, /say "we" and "us", never "I" or "me"/);
  assert.match(forChannel, /do not claim to be a person/);
  assert.ok(!forChannel.includes('Speak as that assistant'));
  const guest = await openChat(srv.base);
  const web = q.get('SELECT * FROM conversations WHERE id = ?', (await guest('GET', '/api/guest/me')).json.conversation.id);
  const forWeb = systemPrompt(buildContext(web));
  assert.match(forWeb, /first person singular \("I"\)/);
  assert.ok(!forWeb.includes('never "I" or "me"'));

  // Demo mode follows the same rule, so what the team sees in drafts matches.
  const team = await signIn(srv.base);
  await team('PATCH', '/api/admin/settings', { channelInbox: true, channelAuto: false });
  fake.messages = async () => [{ id: 9050, type: 1, message: 'The shower is leaking onto the floor', htmlMessage: '' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9050, sender: 'guest', booking: { id: 501 } } });
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.at(-1).draft;
  assert.match(draft.text, /We are looking into this/);
  assert.ok(!/\bI\b/.test(draft.text), draft.text);
  const me = await say(guest, 'Is there a cot available?');
  assert.match(me.messages.at(-1).text, /\bI\b/);
});

test('an enquiry from a booking channel is answered as an enquiry: never a stay, never automatic, no access details', async () => {
  const { upsertReservation, bookingState } = await import('../src/sync.js');
  const { buildContext } = await import('../src/bot.js');
  const { addDays, londonDate } = await import('./helpers.js');
  assert.deepEqual(['reservation', 'modification of booking', 'cancellation', 'inquiry', 'Request to book'].map((type) => bookingState({ type })), [0, 0, 1, 2, 2]);
  q.run('UPDATE properties SET smoobu_id = 77 WHERE id = ?', ctx.propertyId);
  const today = londonDate();
  upsertReservation({ id: 7001, type: 'inquiry', apartment: { id: 77 }, arrival: today, departure: addDays(today, 3), firstname: 'Ella', lastname: 'Ask', adults: 2, channel: { name: 'Airbnb' } });
  // Not a stay: not on the calendar, nothing to sell, no scheduled messages.
  const team = await signIn(srv.base);
  assert.ok(!(await team('GET', '/api/admin/calendar')).json.reservations.some((r) => r.id === 7001));
  assert.ok(!(await team('GET', '/api/admin/todo')).json.tasks.some((t) => t.reservationId === 7001));
  fake.messages = async (id) => (id === 7001 ? [{ id: 9101, type: 1, message: 'How do I use the washing machine? And what is the door code?' }] : []);
  const before = outbox.length;
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9101, sender: 'guest', booking: { id: 7001 } } });
  const c = q.get('SELECT * FROM conversations WHERE reservation_id = 7001');
  assert.ok(c);
  assert.equal(outbox.length, before); // auto mode and channel auto are on in this file, yet nothing went out by itself
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND status = 'pending'", c.id).n, 1);
  const context = buildContext(c);
  assert.equal(context.stage, 'enquiry');
  assert.ok(!context.stay); // no booking facts for someone who has not booked
  assert.equal(context.verified, false);
  assert.equal(context.accessReleased, false);
  assert.match(context.enquiry.dates_asked_about, /^\d{4}-\d{2}-\d{2} to /);
  assert.ok(!context.knowledge.some((k) => /door code/i.test(k.question))); // verified-only knowledge is held back
  assert.equal(context.property.address, undefined);
  assert.equal((await team('GET', `/api/admin/conversations/${c.id}`)).json.conversation.stage, 'enquiry');
});

test('a reply sent directly on Airbnb or in Smoobu appears in the chat and settles the waiting draft', async () => {
  const { syncThread, pollThreads } = await import('../src/thread-sync.js');
  const { importGuestMessage } = await import('../src/routes/webhooks.js');
  setSetting('channelAuto', false); // replies wait for approval, as on the live service
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, channel) VALUES(7100, ?, 'Mo', 'Reed', 'Mo Reed', date('now'), date('now', '+3 days'), 'Airbnb')", ctx.propertyId);
  let thread = [
    { id: 9200, type: 2, message: 'Welcome! Your check-in instructions will follow.' }, // an older automatic message
    { id: 9201, type: 1, message: 'How do I use the washing machine?' },
  ];
  fake.messages = async (id) => (id === 7100 ? thread : []);
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9201, sender: 'guest', booking: { id: 7100 } } });
  const c = () => q.get('SELECT * FROM conversations WHERE reservation_id = 7100');
  const pending = () => q.all("SELECT * FROM messages WHERE conversation_id = ? AND status = 'pending'", c().id);
  assert.equal(pending().length, 1);
  assert.equal(c().needs_reply, 1);
  const sentBefore = outbox.length;

  // Nothing new in Smoobu: nothing changes, and the old automatic message is not pulled in as a reply.
  assert.equal(await syncThread(7100, { importGuest: importGuestMessage, force: true }), 0);
  assert.equal(pending().length, 1);

  // A colleague answers in the Airbnb app. Smoobu tells us a host message was sent.
  thread = [...thread, { id: 9202, type: 2, message: '', htmlMessage: '<p>Turn the dial to Cotton 40 and press Start. The washing machine is how you use it with pods under the sink.</p>' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9202, sender: 'host', booking: { id: 7100 } } });
  const team = await signIn(srv.base);
  const view = (await team('GET', `/api/admin/conversations/${c().id}`)).json;
  const outside = view.messages.at(-1);
  assert.equal(outside.role, 'team');
  assert.equal(outside.external, true);
  assert.match(outside.text, /^Turn the dial to Cotton 40/);
  assert.equal(pending().length, 0); // the draft said the same thing: withdrawn, not sent on top
  assert.equal(c().needs_reply, 0);
  assert.equal(outbox.length, sentBefore); // nothing was sent by the app
  assert.ok(q.get("SELECT 1 FROM examples WHERE answer LIKE 'Turn the dial to Cotton 40 and press Start. The washing%'")); // and the team's own wording is learned
  // The same notice again, or a later check, does not add it twice.
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9202, sender: 'host', booking: { id: 7100 } } });
  assert.equal(await syncThread(7100, { force: true }), 0);
  assert.equal(q.get("SELECT COUNT(*) AS n FROM messages WHERE conversation_id = ? AND json_extract(meta, '$.external') = 1", c().id).n, 1);

  // A reply approved in the app reaches Smoobu too; it is recognised as ours and not added again.
  thread = [...thread, { id: 9203, type: 1, message: 'And how do I use the washing machine dryer setting?' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9203, sender: 'guest', booking: { id: 7100 } } });
  const draft = pending()[0];
  await team('POST', `/api/admin/messages/${draft.id}/approve`, {});
  thread = [...thread, { id: 9204, type: 2, message: outbox.at(-1).body }];
  assert.equal(await syncThread(7100, { force: true }), 0);

  // An unrelated automatic message while a draft waits leaves the draft alone.
  thread = [...thread, { id: 9205, type: 1, message: 'Where is the nearest pharmacy and supermarket please?' }];
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9205, sender: 'guest', booking: { id: 7100 } } });
  const waiting = pending().length + q.get("SELECT COUNT(*) AS n FROM tickets WHERE conversation_id = ? AND status = 'open'", c().id).n;
  assert.ok(waiting >= 1);
  thread = [...thread, { id: 9206, type: 2, message: 'Reminder: quiet hours are from 22:00 to 08:00.' }];
  assert.equal(await pollThreads(importGuestMessage), 1); // found by the regular check, with no notification
  assert.equal(pending().length + q.get("SELECT COUNT(*) AS n FROM tickets WHERE conversation_id = ? AND status = 'open'", c().id).n, waiting);
  assert.equal(c().needs_reply, 1); // still waiting for a real answer

  // A guest message whose notification never arrived is picked up by the same check.
  thread = [...thread, { id: 9207, type: 1, message: 'Hello? Is anyone there?' }];
  await syncThread(7100, { importGuest: importGuestMessage, force: true });
  assert.ok(q.get("SELECT 1 FROM messages WHERE conversation_id = ? AND role = 'guest' AND body = 'Hello? Is anyone there?'", c().id));
});

test('outside replies teach the assistant: real answers are kept for the property, and the team\'s way of writing is learned', async () => {
  const { syncThread } = await import('../src/thread-sync.js');
  const { importGuestMessage } = await import('../src/routes/webhooks.js');
  const { learnStyle, styleStatus } = await import('../src/style.js');
  const { buildContext } = await import('../src/bot.js');
  const { systemPrompt } = await import('../src/llm.js');
  q.run("INSERT INTO reservations(id, property_id, first_name, last_name, guest_name, arrival, departure, channel) VALUES(7200, ?, 'Ada', 'West', 'Ada West', date('now'), date('now', '+3 days'), 'Airbnb')", ctx.propertyId);
  let thread = [{ id: 9301, type: 1, message: 'Is there an iron and ironing board in the flat?' }];
  fake.messages = async (id) => (id === 7200 ? thread : []);
  await handleSmoobuEvent({ action: 'newMessage', data: { id: 9301, sender: 'guest', booking: { id: 7200 } } });
  const c = q.get('SELECT * FROM conversations WHERE reservation_id = 7200');
  const say = async (id, message) => { thread = [...thread, { id, type: 2, message }]; await syncThread(7200, { importGuest: importGuestMessage, force: true }); };

  // A colleague answers in the Airbnb app, in the team's own voice.
  await say(9302, 'Hi Ada,\nYes, the iron and ironing board are in the tall hallway cupboard, bottom shelf.\nKind regards,\nThe Seeker Team');
  const kept = q.get("SELECT * FROM examples WHERE property_id = ? AND answer LIKE '%tall hallway cupboard%'", ctx.propertyId);
  assert.equal(kept.question, 'Is there an iron and ironing board in the flat');
  assert.equal(kept.edited, 1); // team-written: the pattern to follow
  const team = await signIn(srv.base);
  const shown = (await team('GET', `/api/admin/conversations/${c.id}`)).json.messages.find((m) => m.external);
  assert.equal(shown.learned, true);
  // The next guest asking the same thing is answered from it.
  assert.ok(buildContext(c, { latest: 'Do you have an iron?' }).examples.some((e) => /tall hallway cupboard/.test(e.approved_reply)));
  // The weekly tidy-up can then propose it as a knowledge entry.
  assert.ok((await team('POST', '/api/admin/suggestions/run', {})).json.suggestions.some((s) => /tall hallway cupboard/.test(s.answer)));

  // An automatic template is not learned from, either as an answer or as the team's style.
  await say(9303, 'Reminder: quiet hours are from 22:00 to 08:00 for all our guests in the building.');
  assert.ok(!q.get("SELECT 1 FROM examples WHERE answer LIKE '%quiet hours are from 22:00%'"));
  assert.equal(JSON.parse(q.get("SELECT meta FROM messages WHERE body LIKE 'Reminder: quiet hours%'").meta).automatic, 1);

  // Style: nothing until there are a few team-written replies, then a guide the assistant follows.
  q.run("DELETE FROM settings WHERE key LIKE 'house_style%'");
  assert.equal(styleStatus().style, '');
  for (let i = 0; i < 8; i++) q.run("INSERT INTO messages(conversation_id, role, body, status, sent_at) VALUES(?, 'team', ?, 'sent', datetime('now'))", c.id, `Hi Ada,\nThank you for letting us know about item ${i}, we are on it and will update you shortly.\nKind regards,\nThe Seeker Team`);
  assert.ok(await learnStyle());
  const s = (await team('GET', '/api/admin/style')).json;
  assert.match(s.style, /Greeting: opens with "Hi"/);
  assert.match(s.style, /Sign-off: ends with "The Seeker Team"/);
  assert.ok(!s.style.includes('quiet hours')); // the template was left out
  assert.match(systemPrompt(buildContext(c)), /How this team writes[\s\S]*Greeting: opens with "Hi"/);
  assert.equal(await learnStyle(), null); // nothing new: not studied again

  // A person can rewrite the guide; it then stays theirs until they ask for it to be learned again.
  assert.equal((await client(srv.base)('PUT', '/api/admin/style', { style: 'x' })).status, 401);
  await team('PUT', '/api/admin/style', { style: 'Always open with "Good day".' });
  for (let i = 0; i < 9; i++) q.run("INSERT INTO messages(conversation_id, role, body, status, sent_at) VALUES(?, 'team', ?, 'sent', datetime('now'))", c.id, `Hello Ada, another note number ${i} from the team about your stay with us this week.`);
  assert.equal(await learnStyle(), null);
  assert.equal(styleStatus().style, 'Always open with "Good day".');
  assert.match((await team('POST', '/api/admin/style/learn', {})).json.style, /Greeting: opens with/);
  // Cleared: the assistant goes back to its standard voice.
  await team('PUT', '/api/admin/style', { style: '' });
  assert.ok(!systemPrompt(buildContext(c)).includes('How this team writes'));
});

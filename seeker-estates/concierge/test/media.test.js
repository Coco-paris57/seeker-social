import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { startServer, seed, signIn, openChat, say, q } from './helpers.js';
import { sniff, modelImages, getFile, filePath, UPLOAD_DIR } from '../src/media.js';
import { buildContext } from '../src/bot.js';

let srv, ctx;
before(async () => { srv = await startServer(); ctx = seed({ mode: 'auto' }); });
after(() => srv.close());

// Smallest valid PNG (1x1) and a JPEG header; enough for type detection and storage.
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
const hasFfmpeg = (() => { try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } })();

/** Upload raw bytes with a cookie-carrying client. */
async function upload(client, url, bytes, type = 'image/png') {
  const jar = await client('GET', '/healthz'); // no-op; keeps the helper signature simple
  void jar;
  return client.raw('POST', url, bytes, type);
}

// The shared client only speaks JSON; add a raw sender that reuses its cookies.
function withRaw(client, base) {
  client.raw = async (method, url, bytes, type) => {
    const probe = await client('GET', '/api/guest/welcome'); void probe;
    const res = await fetch(base + url, { method, headers: { 'Content-Type': type, Cookie: client.cookies() }, body: bytes });
    const text = await res.text();
    let json = null; try { json = JSON.parse(text); } catch { /* not JSON */ }
    return { status: res.status, json };
  };
  return client;
}

test('file types are decided from the bytes, not the label', () => {
  assert.equal(sniff(PNG).mime, 'image/png');
  assert.equal(sniff(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(20)])).mime, 'image/jpeg');
  assert.equal(sniff(Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypisom'), Buffer.alloc(8)])).mime, 'video/mp4');
  assert.equal(sniff(Buffer.from('<html><script>alert(1)</script></html>')), null);
  assert.equal(sniff(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>')), null);
  assert.equal(sniff(Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypheic'), Buffer.alloc(8)])), null);
});

test('a guest sends a photo: stored, attached, visible to them and the team, and given to the model', async () => {
  const guest = withRaw(await openChat(srv.base), srv.base);
  const up = await upload(guest, '/api/guest/uploads', PNG);
  assert.equal(up.status, 201);
  assert.equal(up.json.file.kind, 'image');

  // Not a picture, whatever the label says.
  assert.equal((await upload(guest, '/api/guest/uploads', Buffer.from('<html>not a picture, just text pretending</html>'), 'image/png')).status, 415);

  const sent = await guest('POST', '/api/guest/messages', { text: '', attachments: [up.json.file.token] });
  assert.equal(sent.status, 202);
  assert.equal(sent.json.message.attachments.length, 1);
  // The same file cannot be attached twice, and an empty message without files is refused.
  assert.equal((await guest('POST', '/api/guest/messages', { text: 'again', attachments: [up.json.file.token] })).status, 400);
  assert.equal((await guest('POST', '/api/guest/messages', { text: '' })).status, 400);

  const me = await say(guest, 'The oven shows this');
  const file = await fetch(srv.base + up.json.file.url, { headers: { Cookie: guest.cookies() } });
  assert.equal(file.status, 200);
  assert.equal(file.headers.get('content-type'), 'image/png');
  assert.equal(file.headers.get('x-content-type-options'), 'nosniff');

  // Another guest cannot fetch it; neither can someone without a session.
  const other = withRaw(await openChat(srv.base), srv.base);
  assert.equal((await fetch(srv.base + up.json.file.url, { headers: { Cookie: other.cookies() } })).status, 404);
  assert.equal((await fetch(srv.base + up.json.file.url)).status, 401);
  // And a guest cannot attach another guest's file to their own message.
  assert.equal((await other('POST', '/api/guest/messages', { text: 'x', attachments: [up.json.file.token] })).status, 400);

  // The model receives the picture; the team sees it on the request.
  const images = await modelImages(q.all('SELECT * FROM files WHERE conversation_id = ?', me.conversation.id));
  assert.equal(images.length, 1);
  assert.equal(images[0].media_type, 'image/png');
  const team = await signIn(srv.base);
  const ticket = (await team('GET', '/api/admin/inbox')).json.tickets.find((t) => t.conversationId === me.conversation.id);
  assert.equal(ticket.attachments.length, 1);
  assert.match(ticket.question, /sent 1 image/);
  assert.equal((await team('GET', ticket.attachments[0].url)).status, 200);
  const thread = (await team('GET', `/api/admin/conversations/${me.conversation.id}`)).json;
  assert.equal(thread.messages[0].attachments.length, 1);

  // Erasing the chat removes the file from disk.
  const onDisk = filePath(getFile(up.json.file.token));
  assert.ok(fs.existsSync(onDisk));
  await guest('POST', '/api/guest/erase', {});
  assert.ok(!fs.existsSync(onDisk));
});

test('team pictures and a video link on a knowledge entry reach the guest with the answer', async () => {
  const team = withRaw(await signIn(srv.base), srv.base);
  const up = await team.raw('POST', '/api/admin/uploads', PNG, 'image/png');
  assert.equal(up.status, 201);
  // A video can be uploaded (for a reply) but not used as a knowledge-base picture.
  const video = await team.raw('POST', '/api/admin/uploads', Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypisom'), Buffer.alloc(64)]), 'video/mp4');
  assert.equal(video.status, 201);
  assert.equal((await team('POST', '/api/admin/knowledge', { propertyId: ctx.propertyId, category: 'appliances', question: 'x', answer: 'y', pictures: [video.json.file.token] })).status, 400);

  const d = await team('POST', '/api/admin/knowledge/describe', { pictures: [up.json.file.token], topic: 'TV remote' });
  assert.equal(d.status, 200);
  assert.match(d.json.instructions, /Demo mode/);

  assert.equal((await team('POST', '/api/admin/knowledge', { propertyId: ctx.propertyId, category: 'appliances', question: 'How to use the TV remote', answer: 'Press the red button.', videoUrl: 'javascript:alert(1)' })).status, 400);
  const created = await team('POST', '/api/admin/knowledge', {
    propertyId: ctx.propertyId, category: 'appliances', question: 'How to use the TV remote', answer: 'Press the red button, then Home.',
    pictures: [up.json.file.token], videoUrl: 'https://youtu.be/abc123', pictureNotes: 'Samsung remote, red power button top left.',
  });
  assert.equal(created.status, 201);
  assert.equal(created.json.knowledge.pictures.length, 1);
  assert.equal(created.json.knowledge.videoUrl, 'https://youtu.be/abc123');

  // Before it is shown in their chat, a guest cannot fetch the picture.
  const guest = withRaw(await openChat(srv.base), srv.base);
  const guestUrl = `/api/guest/files/${up.json.file.token}`;
  assert.equal((await fetch(srv.base + guestUrl, { headers: { Cookie: guest.cookies() } })).status, 404);

  const me = await say(guest, 'How do I use the TV remote?');
  const answer = me.messages.at(-1);
  assert.match(answer.text, /red button/);
  assert.deepEqual(answer.attachments, [{ token: up.json.file.token, kind: 'image', url: guestUrl }]);
  assert.deepEqual(answer.links, [{ url: 'https://youtu.be/abc123', label: 'How to use the TV remote' }]);
  assert.equal((await fetch(srv.base + guestUrl, { headers: { Cookie: guest.cookies() } })).status, 200);

  // The model is told the entry has pictures and what they show.
  const k = buildContext(q.get('SELECT * FROM conversations WHERE id = ?', me.conversation.id)).knowledge.find((x) => x.id === created.json.knowledge.id);
  assert.equal(k.pictures, 1);
  assert.equal(k.has_video, true);
  assert.match(k.what_the_pictures_show, /Samsung/);

  // Removing the picture from the entry deletes it from disk.
  const onDisk = filePath(getFile(up.json.file.token));
  await team('PATCH', `/api/admin/knowledge/${created.json.knowledge.id}`, { pictures: [] });
  assert.ok(!fs.existsSync(onDisk));
});

test('a guest video is turned into frames for the model', { skip: !hasFfmpeg && 'ffmpeg not installed' }, async () => {
  const clip = path.join(UPLOAD_DIR, '..', 'clip.mp4');
  fs.mkdirSync(path.dirname(clip), { recursive: true });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=duration=3:size=320x240:rate=10', '-pix_fmt', 'yuv420p', clip]);
  const guest = withRaw(await openChat(srv.base), srv.base);
  const up = await guest.raw('POST', '/api/guest/uploads', fs.readFileSync(clip), 'video/mp4');
  assert.equal(up.status, 201);
  assert.equal(up.json.file.kind, 'video');
  const images = await modelImages([getFile(up.json.file.token)]);
  assert.ok(images.length >= 3, `expected several frames, got ${images.length}`);
  assert.ok(images.every((i) => i.media_type === 'image/jpeg' && i.data.length > 500));
  assert.match(images[0].label, /video frame 1 of/);
});

test('the team attaches a picture and a video to replies; saved ones come back for the next guest', async () => {
  const team = withRaw(await signIn(srv.base), srv.base);
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: null }); // learning: answers wait for approval
  const pic = (await team.raw('POST', '/api/admin/uploads', PNG, 'image/png')).json.file;
  const vid = (await team.raw('POST', '/api/admin/uploads', Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypisom'), Buffer.alloc(64)]), 'video/mp4')).json.file;

  // 1. Answering a request with files, saved to the knowledge base.
  const guest = withRaw(await openChat(srv.base), srv.base);
  const me = await say(guest, 'Where is the fuse box?');
  const ticket = (await team('GET', '/api/admin/inbox')).json.tickets.find((t) => t.conversationId === me.conversation.id);
  const answered = await team('POST', `/api/admin/tickets/${ticket.id}/answer`, { answer: 'The fuse box is in the hallway cupboard.', attachments: [pic.token, vid.token], remember: true, sensitive: false });
  assert.equal(answered.status, 200);
  const got = (await guest('GET', '/api/guest/me')).json.messages.at(-1);
  assert.deepEqual(got.attachments.map((a) => a.kind), ['image', 'video']);
  for (const a of got.attachments) assert.equal((await fetch(srv.base + a.url, { headers: { Cookie: guest.cookies() } })).status, 200);
  const entry = (await team('GET', `/api/admin/properties/${ctx.propertyId}`)).json.knowledge.find((k) => k.id === answered.json.knowledgeId);
  assert.equal(entry.pictures.length, 1);
  assert.equal(entry.videos.length, 1);

  // 2. The next guest asking the same thing gets the picture and video with the answer.
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: 'auto' });
  const next = withRaw(await openChat(srv.base), srv.base);
  const again = await say(next, 'Where is the fuse box please?');
  assert.match(again.messages.at(-1).text, /hallway cupboard/);
  assert.deepEqual(again.messages.at(-1).attachments.map((a) => a.kind), ['image', 'video']);
  assert.equal((await fetch(srv.base + again.messages.at(-1).attachments[0].url, { headers: { Cookie: next.cookies() } })).status, 200);

  // 3. A direct reply with only a picture, not saved: a third guest cannot fetch it, and erasing the chat removes it.
  const once = (await team.raw('POST', '/api/admin/uploads', PNG, 'image/png')).json.file;
  assert.equal((await team('POST', `/api/admin/conversations/${me.conversation.id}/reply`, { text: '', attachments: [once.token] })).status, 201);
  assert.equal((await guest('GET', '/api/guest/me')).json.messages.at(-1).attachments.length, 1);
  assert.equal((await fetch(`${srv.base}/api/guest/files/${once.token}`, { headers: { Cookie: next.cookies() } })).status, 404);
  const onDisk = filePath(getFile(once.token));
  const kept = filePath(getFile(pic.token));
  await guest('POST', '/api/guest/erase', {});
  assert.ok(!fs.existsSync(onDisk), 'a one-off file goes with the chat');
  assert.ok(fs.existsSync(kept), 'a file saved for future guests stays');

  // 4. Approving a draft with an extra picture; a guest's own file can never be attached by the team route.
  await team('PATCH', `/api/admin/properties/${ctx.propertyId}`, { mode: null });
  const third = withRaw(await openChat(srv.base), srv.base);
  const t3 = await say(third, 'How do I use the washing machine?');
  const draft = (await team('GET', '/api/admin/inbox')).json.approvals.find((a) => a.conversation.id === t3.conversation.id).draft;
  const extra = (await team.raw('POST', '/api/admin/uploads', PNG, 'image/png')).json.file;
  const guestFileToken = (await third.raw('POST', '/api/guest/uploads', PNG, 'image/png')).json.file.token;
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/approve`, { attachments: [guestFileToken] })).status, 400);
  assert.equal((await team('POST', `/api/admin/messages/${draft.id}/approve`, { attachments: [extra.token] })).status, 200);
  assert.equal((await third('GET', '/api/guest/me')).json.messages.at(-1).attachments.length, 1);

  // 5. Booking channels are text only.
  const c = q.insert("INSERT INTO conversations(property_id, channel, verified) VALUES(?, 'smoobu', 1)", ctx.propertyId);
  const refused = await team('POST', `/api/admin/conversations/${c}/reply`, { text: 'see picture', attachments: [extra.token] });
  assert.equal(refused.status, 400);
  assert.match(refused.json.error, /cannot be sent through Airbnb/);
});

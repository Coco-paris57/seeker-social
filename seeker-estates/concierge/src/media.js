// Pictures and videos: files the team attaches to knowledge entries and files guests send in
// the chat. Stored on the data disk under uploads/, named by a random token, never by a name
// the sender chose. The type is decided from the file's own bytes, not from what was claimed.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { config } from './config.js';
import { q } from './db.js';
import { HttpError } from './util.js';

const run = promisify(execFile);
export const UPLOAD_DIR = path.join(config.dataDir, 'uploads');
export const MAX_IMAGE = 8 * 1024 * 1024;
export const MAX_VIDEO = 40 * 1024 * 1024;
const MODEL_IMAGE_LIMIT = 4.5 * 1024 * 1024; // the model accepts images up to 5 MB

/** Work out what a file really is from its first bytes. Null when it is not a picture or video we accept. */
export function sniff(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 12) return null;
  const ascii = (from, to) => buf.subarray(from, to).toString('latin1');
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { kind: 'image', mime: 'image/jpeg', ext: 'jpg' };
  if (buf[0] === 0x89 && ascii(1, 4) === 'PNG') return { kind: 'image', mime: 'image/png', ext: 'png' };
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return { kind: 'image', mime: 'image/webp', ext: 'webp' };
  if (ascii(0, 3) === 'GIF') return { kind: 'image', mime: 'image/gif', ext: 'gif' };
  if (ascii(4, 8) === 'ftyp') {
    const brand = ascii(8, 12);
    if (/^(heic|heix|hevc|mif1|msf1|avif)$/.test(brand)) return null; // phone formats browsers cannot show; the chat converts these to JPEG first
    return brand === 'qt  ' ? { kind: 'video', mime: 'video/quicktime', ext: 'mov' } : { kind: 'video', mime: 'video/mp4', ext: 'mp4' };
  }
  if (buf[0] === 0x1a && buf[1] === 0x45 && buf[2] === 0xdf && buf[3] === 0xa3) return { kind: 'video', mime: 'video/webm', ext: 'webm' };
  return null;
}

const fileOut = (f, base) => ({ token: f.token, kind: f.kind, url: `${base}/${f.token}` });
export const guestFile = (f) => fileOut(f, '/api/guest/files');
export const adminFile = (f) => fileOut(f, '/api/admin/files');
export const filePath = (f) => path.join(UPLOAD_DIR, `${f.token}.${f.ext}`);

/** Store an uploaded file. `allow` limits the kinds accepted (e.g. only pictures for the knowledge base). */
export function saveUpload(buf, { conversationId = null, userId = null, allow = ['image', 'video'] } = {}) {
  const type = sniff(buf);
  if (!type || !allow.includes(type.kind)) {
    throw new HttpError(415, allow.includes('video') ? 'Please send a photo (JPEG, PNG, WebP) or a video (MP4, MOV, WebM).' : 'Please choose a picture (JPEG, PNG or WebP).');
  }
  if (buf.length > (type.kind === 'image' ? MAX_IMAGE : MAX_VIDEO)) {
    throw new HttpError(413, type.kind === 'image' ? 'That picture is too large (8 MB at most).' : 'That video is too large (40 MB at most). A shorter clip of the problem is enough.');
  }
  const token = crypto.randomBytes(18).toString('base64url');
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, `${token}.${type.ext}`), buf);
  q.run('INSERT INTO files(token, kind, mime, ext, size, conversation_id, created_by) VALUES(?, ?, ?, ?, ?, ?, ?)', token, type.kind, type.mime, type.ext, buf.length, conversationId, userId);
  return q.get('SELECT * FROM files WHERE token = ?', token);
}

export const getFile = (token) => q.get('SELECT * FROM files WHERE token = ?', String(token || '')) || null;

/** Send a stored file to the browser. */
export function sendFile(res, f) {
  const file = filePath(f);
  if (!fs.existsSync(file)) throw new HttpError(404, 'That file is no longer available.');
  res.set({ 'Content-Type': f.mime, 'Cache-Control': 'private, max-age=3600', 'Content-Disposition': 'inline', 'X-Content-Type-Options': 'nosniff' });
  res.sendFile(file, { acceptRanges: true });
}

/** Remove files from disk that no longer have a record, and uploads that were never used. */
export function sweepFiles() {
  for (const f of q.all("SELECT * FROM files WHERE message_id IS NULL AND knowledge_id IS NULL AND created_at < datetime('now', '-1 day')")) {
    q.run('DELETE FROM files WHERE token = ?', f.token);
  }
  if (!fs.existsSync(UPLOAD_DIR)) return;
  const known = new Set(q.all('SELECT token, ext FROM files').map((f) => `${f.token}.${f.ext}`));
  for (const name of fs.readdirSync(UPLOAD_DIR)) {
    if (!known.has(name)) fs.rmSync(path.join(UPLOAD_DIR, name), { force: true });
  }
}

/** A few still frames from a video, as JPEG buffers, so the model can look at it. Empty if ffmpeg is unavailable. */
export async function videoFrames(file, count = 5) {
  try {
    const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { timeout: 15_000 });
    const duration = Math.max(0.1, parseFloat(stdout) || 0.1);
    const frames = [];
    for (let i = 0; i < count; i++) {
      const at = (duration * (i + 0.5)) / count;
      const { stdout: jpeg } = await run('ffmpeg', ['-v', 'error', '-ss', at.toFixed(2), '-i', file, '-frames:v', '1', '-vf', 'scale=960:-2', '-q:v', '5', '-f', 'image2pipe', '-vcodec', 'mjpeg', '-'], { timeout: 20_000, encoding: 'buffer', maxBuffer: 8 * 1024 * 1024 });
      if (jpeg.length > 500) frames.push(jpeg);
      if (duration < 1.5) break; // a very short clip: one frame is enough
    }
    return frames;
  } catch (e) {
    console.warn(`Video frames unavailable: ${e.message.split('\n')[0]}`);
    return [];
  }
}

/** Turn stored files into image blocks for the model: pictures as they are, videos as a few frames. */
export async function modelImages(files) {
  const out = [];
  for (const f of files) {
    const file = filePath(f);
    if (!fs.existsSync(file)) continue;
    if (f.kind === 'image') {
      if (f.size <= MODEL_IMAGE_LIMIT) out.push({ label: 'photo', media_type: f.mime, data: fs.readFileSync(file).toString('base64') });
    } else {
      const frames = await videoFrames(file);
      frames.forEach((jpeg, i) => out.push({ label: `video frame ${i + 1} of ${frames.length}`, media_type: 'image/jpeg', data: jpeg.toString('base64') }));
    }
    if (out.length >= 10) break;
  }
  return out.slice(0, 10);
}

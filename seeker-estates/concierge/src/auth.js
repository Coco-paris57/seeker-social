// Team sign-in (scrypt password hashes, server-side sessions) and guest chat sessions.
// Both use httpOnly cookies holding a random token; only the SHA-256 of a token is stored.
import crypto from 'node:crypto';
import { config } from './config.js';
import { q } from './db.js';
import { HttpError, newToken, sha256 } from './util.js';

const TEAM_COOKIE = 'sc_team';
const GUEST_COOKIE = 'sc_guest';
const TEAM_DAYS = 30;
const GUEST_DAYS = 120;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored).split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'base64');
  const actual = crypto.scryptSync(password, Buffer.from(salt, 'base64'), expected.length);
  return crypto.timingSafeEqual(expected, actual);
}

export function createUser({ email, name, password, role = 'agent' }) {
  const e = String(email || '').trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new HttpError(400, 'Please enter a valid email address.');
  if (String(password || '').length < 10) throw new HttpError(400, 'Passwords need at least 10 characters.');
  if (!String(name || '').trim()) throw new HttpError(400, 'Please enter a name.');
  if (q.get('SELECT 1 FROM users WHERE email = ?', e)) throw new HttpError(409, 'A team member with this email already exists.');
  return q.insert('INSERT INTO users(email, name, role, password_hash) VALUES(?, ?, ?, ?)', e, name.trim(), role === 'admin' ? 'admin' : 'agent', hashPassword(password));
}

function readCookie(req, name) {
  const header = req.headers.cookie || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

function setCookie(res, name, value, { days, sameSite }) {
  const attrs = [`${name}=${encodeURIComponent(value)}`, 'Path=/', 'HttpOnly', `SameSite=${sameSite}`, `Max-Age=${days * 86400}`];
  if (config.production) attrs.push('Secure');
  res.append('Set-Cookie', attrs.join('; '));
}

function clearCookie(res, name, sameSite) {
  res.append('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=0${config.production ? '; Secure' : ''}`);
}

// --- team -----------------------------------------------------------------------------

export function startTeamSession(res, userId) {
  const token = newToken();
  q.run("INSERT INTO sessions(token_hash, user_id, expires_at) VALUES(?, ?, datetime('now', ?))", sha256(token), userId, `+${TEAM_DAYS} days`);
  setCookie(res, TEAM_COOKIE, token, { days: TEAM_DAYS, sameSite: 'Strict' });
}

export function endTeamSession(req, res) {
  const token = readCookie(req, TEAM_COOKIE);
  if (token) q.run('DELETE FROM sessions WHERE token_hash = ?', sha256(token));
  clearCookie(res, TEAM_COOKIE, 'Strict');
}

export function currentUser(req) {
  const token = readCookie(req, TEAM_COOKIE);
  if (!token) return null;
  return (
    q.get(
      `SELECT u.id, u.email, u.name, u.role FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > datetime('now')`,
      sha256(token),
    ) || null
  );
}

export function requireUser(req, res, next) {
  const user = currentUser(req);
  if (!user) return res.status(401).json({ error: 'Please sign in.' });
  req.user = user;
  next();
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Only an administrator can do this.' });
  next();
}

// --- guests ---------------------------------------------------------------------------

export function startGuestSession(res, conversationId) {
  const token = newToken();
  q.run('UPDATE conversations SET token_hash = ? WHERE id = ?', sha256(token), conversationId);
  setCookie(res, GUEST_COOKIE, token, { days: GUEST_DAYS, sameSite: 'Lax' });
}

export function endGuestSession(res) {
  clearCookie(res, GUEST_COOKIE, 'Lax');
}

export function currentConversation(req) {
  const token = readCookie(req, GUEST_COOKIE);
  if (!token) return null;
  return q.get("SELECT * FROM conversations WHERE token_hash = ? AND channel = 'web'", sha256(token)) || null;
}

export function requireGuest(req, res, next) {
  const conversation = currentConversation(req);
  if (!conversation) return res.status(401).json({ error: 'Your chat session has ended. Please scan the QR code again.' });
  req.conversation = conversation;
  next();
}

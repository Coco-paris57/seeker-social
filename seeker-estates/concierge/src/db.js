// SQLite storage (node:sqlite, no native build). One file in DATA_DIR.
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { config, SETTING_DEFAULTS } from './config.js';

const SCHEMA = `
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY,
  smoobu_id INTEGER UNIQUE,
  ref TEXT,                       -- our reference, e.g. P01
  name TEXT NOT NULL,             -- listing name from Smoobu
  display_name TEXT,              -- friendly name shown to guests
  area TEXT, postcode TEXT, address TEXT, station TEXT, notes TEXT,
  details TEXT NOT NULL DEFAULT '{}',   -- JSON: Smoobu rooms, amenities, coordinates
  qr_token TEXT NOT NULL UNIQUE,
  mode TEXT,                      -- 'learning' | 'auto' | NULL (follow the default)
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY,         -- Smoobu booking id
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  first_name TEXT, last_name TEXT, guest_name TEXT,
  arrival TEXT NOT NULL, departure TEXT NOT NULL,
  check_in TEXT, check_out TEXT,
  adults INTEGER, children INTEGER,
  channel TEXT, language TEXT,
  cancelled INTEGER NOT NULL DEFAULT 0,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS reservations_lookup ON reservations(property_id, arrival, departure);
CREATE TABLE IF NOT EXISTS knowledge (
  id INTEGER PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,  -- NULL = applies to every property
  category TEXT NOT NULL DEFAULT 'other',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sensitive INTEGER NOT NULL DEFAULT 0,  -- 1 = only for verified guests close to or during their stay
  source TEXT NOT NULL DEFAULT 'team',   -- 'team' | 'learned'
  created_by INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS knowledge_property ON knowledge(property_id);
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY,
  property_id INTEGER REFERENCES properties(id) ON DELETE SET NULL,
  reservation_id INTEGER,
  channel TEXT NOT NULL DEFAULT 'web',   -- 'web' | 'smoobu'
  token_hash TEXT UNIQUE,
  guest_name TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  bot_paused INTEGER NOT NULL DEFAULT 0, -- 1 = a team member has taken over
  language TEXT,
  consent_at TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  last_message_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS conversations_recent ON conversations(last_message_at);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,              -- 'guest' | 'bot' | 'team'
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',  -- 'sent' | 'pending' | 'rejected' | 'superseded'
  kind TEXT NOT NULL DEFAULT 'answer',  -- 'answer' | 'holding' | 'relay'
  meta TEXT NOT NULL DEFAULT '{}',
  created_by INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  sent_at TEXT
);
CREATE INDEX IF NOT EXISTS messages_conversation ON messages(conversation_id, id);
CREATE INDEX IF NOT EXISTS messages_status ON messages(status);
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY,
  conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  property_id INTEGER,
  type TEXT NOT NULL,              -- 'question' | 'maintenance' | 'urgent'
  category TEXT,
  summary TEXT NOT NULL,
  question TEXT NOT NULL,          -- what the bot needs from the team
  guest_message_id INTEGER,
  status TEXT NOT NULL DEFAULT 'open',  -- 'open' | 'answered' | 'closed'
  answer TEXT,
  answered_by INTEGER,
  answered_at TEXT,
  knowledge_id INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS tickets_status ON tickets(status);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agent',   -- 'admin' | 'agent'
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  action TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS smoobu_seen (message_id INTEGER PRIMARY KEY);
`;

export function openDb(file) {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  db.exec(SCHEMA);
  return db;
}

export let db = openDb(process.env.DB_FILE || path.join(config.dataDir, 'concierge.db'));

/** Tests swap in a fresh in-memory database. */
export function useDb(next) {
  db = next;
}

export const q = {
  get: (sql, ...p) => db.prepare(sql).get(...p),
  all: (sql, ...p) => db.prepare(sql).all(...p),
  run: (sql, ...p) => db.prepare(sql).run(...p),
  insert: (sql, ...p) => Number(db.prepare(sql).run(...p).lastInsertRowid),
};

export function getSettings() {
  const out = { ...SETTING_DEFAULTS };
  for (const row of q.all('SELECT key, value FROM settings')) {
    if (row.key in SETTING_DEFAULTS) {
      try {
        out[row.key] = JSON.parse(row.value);
      } catch {
        /* keep the default */
      }
    }
  }
  return out;
}

export function setSetting(key, value) {
  q.run(
    'INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key,
    JSON.stringify(value),
  );
}

export function getRaw(key) {
  return q.get('SELECT value FROM settings WHERE key = ?', key)?.value ?? null;
}

export function setRaw(key, value) {
  q.run(
    'INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key,
    value,
  );
}

export function audit(userId, action, detail = '') {
  q.run('INSERT INTO audit(user_id, action, detail) VALUES(?, ?, ?)', userId ?? null, action, String(detail).slice(0, 500));
}

export const parseJson = (s, d = {}) => {
  try {
    return JSON.parse(s);
  } catch {
    return d;
  }
};

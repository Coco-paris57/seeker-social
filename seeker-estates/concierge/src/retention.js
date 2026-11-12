// Data retention: erase conversations once they are older than the configured period.
import { q, getSettings } from './db.js';
import { sweepFiles } from './media.js';

export function runRetention() {
  const { retentionDays } = getSettings();
  const old = q.run("DELETE FROM conversations WHERE last_message_at < datetime('now', ?)", `-${retentionDays} days`).changes;
  // Chats that were opened but never used.
  const empty = q.run("DELETE FROM conversations WHERE created_at < datetime('now', '-1 day') AND id NOT IN (SELECT conversation_id FROM messages)").changes;
  q.run("DELETE FROM sessions WHERE expires_at < datetime('now')");
  q.run("DELETE FROM audit WHERE created_at < datetime('now', '-730 days')");
  q.run('DELETE FROM smoobu_seen WHERE message_id NOT IN (SELECT message_id FROM smoobu_seen ORDER BY message_id DESC LIMIT 20000)');
  sweepFiles(); // pictures and videos of erased conversations and removed knowledge entries
  if (old) q.run("INSERT INTO audit(action, detail) VALUES('retention', ?)", `${old} conversation(s) erased after ${retentionDays} days`);
  return { old, empty };
}

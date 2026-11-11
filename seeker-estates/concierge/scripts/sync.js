// Pull apartments and reservations from Smoobu once: npm run sync
import { syncAll } from '../src/sync.js';
import { config } from '../src/config.js';

if (config.smoobuMode !== 'live') {
  console.error('Smoobu is not configured. Set SMOOBU_API_KEY and SMOOBU_API_SECRET.');
  process.exit(1);
}
console.log(await syncAll());

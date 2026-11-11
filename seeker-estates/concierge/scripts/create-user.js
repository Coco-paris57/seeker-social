// Create a team member from the command line:
//   npm run create-user -- --email you@example.com --name "Your Name" --password "long password" [--admin]
import { createUser } from '../src/auth.js';

const arg = (name) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : undefined;
};
try {
  const id = createUser({ email: arg('email'), name: arg('name'), password: arg('password'), role: process.argv.includes('--admin') ? 'admin' : 'agent' });
  console.log(`Created team member ${id}.`);
} catch (e) {
  console.error(e.message);
  console.error('Usage: npm run create-user -- --email you@example.com --name "Your Name" --password "at least 10 characters" [--admin]');
  process.exit(1);
}

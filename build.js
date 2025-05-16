import { execSync } from 'child_process';

console.log('Starting build process...');

try {
  // Build client
  console.log('Building client...');
  execSync('cd client && npm install && npm run build', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 
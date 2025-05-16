import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting Vercel build process...');

try {
  // Navigate to client directory
  const clientDir = resolve(__dirname, 'client');
  console.log('Moving to client directory:', clientDir);
  process.chdir(clientDir);

  // Install client dependencies
  console.log('Installing client dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build the client
  console.log('Building client...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify the build
  const distDir = resolve(clientDir, 'dist');
  if (!fs.existsSync(distDir)) {
    throw new Error('Build failed - dist directory not found');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 
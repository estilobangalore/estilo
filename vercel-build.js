import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

console.log('Starting Vercel build process...');

// Verify environment variables
if (!process.env.NEON_DATABASE_URL) {
  console.error('NEON_DATABASE_URL is not set in environment variables');
  process.exit(1);
}

try {
  // Build the client application
  console.log('Building client...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create database configuration
  console.log('Setting up database configuration...');
  const dbConfig = {
    driver: 'pg',
    url: process.env.NEON_DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
    },
    pool: {
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  };

  // Ensure the config directory exists
  execSync('mkdir -p ./server/config', { stdio: 'inherit' });
  
  // Write database configuration
  writeFileSync(
    './server/config/database.json',
    JSON.stringify(dbConfig, null, 2)
  );

  // Run database migrations
  console.log('Running database migrations...');
  try {
    execSync('npm run db:push', { stdio: 'inherit' });
    console.log('Database migrations completed successfully');
  } catch (error) {
    console.warn('Warning: Database migration failed:', error.message);
    console.log('Continuing build process...');
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

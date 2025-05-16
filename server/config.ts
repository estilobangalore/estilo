import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const databaseUrl = process.env.NEON_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('NEON_DATABASE_URL is not set in environment variables');
}

// Neon database connection with proper configuration
const client = postgres(databaseUrl, {
  max: 20, // Connection pool size
  idle_timeout: 30, // Max idle time for connections
  connect_timeout: 10, // Connection timeout in seconds
  ssl: {
    rejectUnauthorized: true, // Verify SSL certificate
  },
});

// Initialize Drizzle with the client
export const db = drizzle(client);

// Server configuration
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  sessionSecret: process.env.SESSION_SECRET || 'your-secret-key',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  database: {
    url: databaseUrl,
    poolSize: 20,
  },
};

export default { db, config }; 
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Configure Neon to use WebSocket in Node.js environment
// This is required for server-side rendering and API routes
neonConfig.webSocketConstructor = ws;

// Create the Neon connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create Drizzle ORM instance
export const db = drizzle(pool);

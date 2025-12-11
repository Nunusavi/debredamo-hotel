import { Pool, neonConfig } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import ws from 'ws';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Configure WebSocket for Node.js
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkDatabase() {
  try {
    console.log('Testing database connection...');
    const client = await pool.connect();

    const result = await client.query('SELECT current_database(), current_user');
    console.log('✅ Connected to:', result.rows[0]);

    console.log('\nChecking if reservation_requests table exists...');
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('Tables found:', tables.rows.map(t => t.table_name));

    if (tables.rows.length === 0) {
      console.log('\n⚠️  No tables found! You need to run the migration SQL.');
      console.log('File: lib/db/migrations/001_initial_schema.sql');
      console.log('\nGo to https://console.neon.tech and run the SQL in the SQL Editor.');
    } else {
      console.log('\n✅ Database is set up correctly!');
    }

    client.release();
    await pool.end();
  } catch (error) {
    console.error('❌ Database error:', error);
    await pool.end();
  }
}

checkDatabase();

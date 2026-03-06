import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool 
  ? drizzle(pool, { schema })
  : null;

if (!db) {
  console.log("Warning: No database configured. Data will not persist.");
  console.log("Set DATABASE_URL to use PostgreSQL.");
}

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// Lazy initialization — only connect when DATABASE_URL is set
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to your .env.local file."
    );
  }

  if (!_db) {
    const client = postgres(connectionString, { prepare: false });
    _db = drizzle(client, { schema });
  }

  return _db;
}

// Re-export schema for convenience
export { schema };

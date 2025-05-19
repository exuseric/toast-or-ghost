import { Pool } from "pg";
import { env } from "@/env";

/**
 * Cache the database connection in development.
 * This avoids spawning a million database clients like gremlins on every HMR update.
 */
const globalForDb = globalThis as unknown as {
    conn: Pool | undefined;
};

// Create a new database pool
const createPool = () => {
    const pool = new Pool({
        connectionString: env.DATABASE_URL,
        max: Number(env.MAX_CLIENTS),
        idleTimeoutMillis: Number(env.IDLE_TIMEOUT),
        connectionTimeoutMillis: Number(env.CONNECTION_TIMEOUT),
    });

    return pool;
}

// Get the database pool
const getPool = () => {
    if (env.NODE_ENV === "production") {
        return createPool();
    }

    if (!globalForDb.conn) {
        globalForDb.conn = createPool();
    }

    return globalForDb.conn;
}

export const pool = getPool();

pool.on("error", (err) => {
    console.error("PostgreSQL pool error:", err);
    // Don't exit the process in serverless environments
    if (process.env.NODE_ENV === "production" && !process.env.NEXT_RUNTIME) {
        process.exit(-1);
    }
});

pool.on("connect", () => {
    console.log("✅ Connected to database");
});

pool.on("remove", () => {
    console.log("❌ Client removed from pool");
});

/**
 * Cleanup function for graceful shutdown.
 * Only relevant in non-serverless environments
 */
const cleanup = async () => {
    console.log("♻️ Closing database pool...");
    await pool.end();
  };
  
  // Only add process event handlers in non-serverless environments
  if (!process.env.NEXT_RUNTIME) {
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
  }
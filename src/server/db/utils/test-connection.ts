import { pool } from "@/server/db/utils/pool";

export const testConnection = async (retries  = 5): Promise<boolean> => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query('SELECT NOW() as now');
        console.log("✅ Database connection test successful:", result.rows[0].now);
        return true;
    } catch (error) {
        console.error("❌ Database connection test failed:", error);
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return testConnection(retries - 1); // TODO: Fix potential infinite loop
        }
        return false;
    } finally {
        if (client) client.release();
    }
}   
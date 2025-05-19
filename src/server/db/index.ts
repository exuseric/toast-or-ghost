import { drizzle } from "drizzle-orm/node-postgres";
import { pool } from "@/server/db/utils/pool";
import * as schema from "./schema";

export const db = drizzle(pool, { schema });

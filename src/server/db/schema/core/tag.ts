import { uuid, text, date } from "drizzle-orm/pg-core";
import { createTable } from "@/server/db/schema/";

export const tagsTable = createTable('tags', {
    tag_id: uuid('tag_id').defaultRandom().primaryKey().unique().notNull(),
    name: text('name').notNull().unique(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});
import { createTable } from "@/server/db/schema/";
import { text, date, uuid, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = createTable('categories', {
    id: uuid('id').defaultRandom().primaryKey().unique().notNull(),
    name: text('name').notNull().unique(),
    description: text('description'),
    icon: text('icon'),
    slug: varchar('slug', { length: 100 }).notNull().unique(),
    createdAt: date('created_at').defaultNow().notNull(),
    updatedAt: date('updated_at').defaultNow().notNull(),
});
import { createTable, categoriesTable, eventsTable } from "@/server/db/schema/"
import { primaryKey, uuid } from "drizzle-orm/pg-core";

export const eventCategoriesTable = createTable('event_categories', {
    event_id: uuid('event_id').notNull().references(() => eventsTable.event_id, { onDelete: 'cascade' }),
    category_id: uuid('category_id').notNull().references(() => categoriesTable.id, { onDelete: 'cascade' }),
}, (t) => {
    return {
        pk: primaryKey({ columns: [t.event_id, t.category_id] }),
    };
});
import { createTable, eventsTable, tagsTable } from "@/server/db/schema/"
import { primaryKey, uuid } from "drizzle-orm/pg-core";

export const eventTagsTable = createTable('event_tags', {
    event_id: uuid('event_id').notNull().references(() => eventsTable.event_id, { onDelete: 'cascade' }),
    tag_id: uuid('tag_id').notNull().references(() => tagsTable.tag_id, { onDelete: 'cascade' }),
}, (t) => {
    return {
        pk: primaryKey({ columns: [t.event_id, t.tag_id] }),
    };
});
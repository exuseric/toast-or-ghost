import { createTable, eventsTable, organiserTable } from "@/server/db/schema/";
import { integer, text, date, index, uuid } from "drizzle-orm/pg-core";

export const eventImageTable = createTable('event_images', {
    id: uuid('id').defaultRandom().primaryKey().unique().notNull(),
    event_id: uuid('event_id').notNull().references(() => eventsTable.event_id, { onDelete: 'cascade' }),
    image_url: text('image_url').array().notNull(),
    caption: text('caption'),
    sort_order: integer('sort_order').default(0).notNull(),
    uploaded_by: uuid('uploaded_by').references(() => organiserTable.organiser_id, { onDelete: 'set null' }),
    created_at: date('created_at').defaultNow().notNull(),
}, (table) => {
    return {
        eventIdx: index('image_event_idx').on(table.event_id),
    };
});
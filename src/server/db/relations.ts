import * as s from "@/server/db/schema/"
import { relations } from "drizzle-orm"

export const organiserRelations = relations(s.organiserTable, ({ many }) => ({
    events: many(s.eventsTable, { relationName: "organiser_id" }),
}))

export const eventsRelations = relations(s.eventsTable, ({ one, many }) => ({
    organiser: one(s.organiserTable, {
        fields: [s.eventsTable.organiser_id],
        references: [s.organiserTable.organiser_id],
        relationName: 'organizer',
    }),
    rsvps: many(s.rsvpsTable),
    categories: many(s.eventCategoriesTable),
    eventImage: many(s.eventImageTable),
}));

export const rsvpsRelations = relations(s.rsvpsTable, ({ one }) => ({
    event: one(s.eventsTable, {
        fields: [s.rsvpsTable.event_id],
        references: [s.eventsTable.event_id],
    }),
    organiser: one(s.organiserTable, {
        fields: [s.rsvpsTable.guest_id],
        references: [s.organiserTable.organiser_id],
    }),
}));

export const eventImageRelations = relations(s.eventImageTable, ({ one }) => ({
    event: one(s.eventsTable, {
        fields: [s.eventImageTable.event_id],
        references: [s.eventsTable.event_id],
    }),
    uploader: one(s.organiserTable, {
        fields: [s.eventImageTable.uploaded_by],
        references: [s.organiserTable.organiser_id],
    }),
}));

export const categoriesRelations = relations(s.categoriesTable, ({ many }) => ({
    events: many(s.eventCategoriesTable),
}));

export const eventCategoriesRelations = relations(s.eventCategoriesTable, ({ one }) => ({
    event: one(s.eventsTable, {
        fields: [s.eventCategoriesTable.event_id],
        references: [s.eventsTable.event_id],
    }),
    category: one(s.categoriesTable, {
        fields: [s.eventCategoriesTable.category_id],
        references: [s.categoriesTable.id],
    }),
}));

export const tagsRelations = relations(s.tagsTable, ({ many }) => ({
    events: many(s.eventTagsTable),
}));

export const eventTagsRelations = relations(s.eventTagsTable, ({ one }) => ({
    event: one(s.eventsTable, {
        fields: [s.eventTagsTable.event_id],
        references: [s.eventsTable.event_id],
    }),
    tag: one(s.tagsTable, {
        fields: [s.eventTagsTable.tag_id],
        references: [s.tagsTable.tag_id],
    }),
}));
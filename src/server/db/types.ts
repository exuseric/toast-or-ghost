import { organiserTable, eventsTable, rsvpsTable, eventImagesTable, categoriesTable, tagsTable } from "@/server/db/schema/";

export type EventsType = typeof eventsTable.$inferSelect
export type EventsInsertType = typeof eventsTable.$inferInsert

export type OrganiserType = typeof organiserTable.$inferSelect
export type OrganiserInsertType = typeof organiserTable.$inferInsert

export type RsvpType = typeof rsvpsTable.$inferSelect
export type RsvpInsertType = typeof rsvpsTable.$inferInsert

export type EventImagesType = typeof eventImagesTable.$inferSelect
export type EventImagesInsertType = typeof eventImagesTable.$inferInsert

export type CategoriesType = typeof categoriesTable.$inferSelect
export type CategoriesInsertType = typeof categoriesTable.$inferInsert

export type TagsType = typeof tagsTable.$inferSelect
export type TagsInsertType = typeof tagsTable.$inferInsert


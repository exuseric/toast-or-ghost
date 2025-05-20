import { pgTableCreator } from "drizzle-orm/pg-core";
export { organiserTable } from "./core/organiser"
export { eventsTable } from "./core/events"
export { rsvpsTable } from "./core/rsvp"
export { eventImageTable } from "./core/image"
export { categoriesTable } from "./core/categories"
export { eventCategoriesTable } from "./core/event-categories"
export { tagsTable } from "./core/tag"
export { eventTagsTable } from "./core/event-tags"


export const createTable = pgTableCreator((name: string) => `toast-or-ghost_${name}`);
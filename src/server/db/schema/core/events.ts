import {createTable } from "@/server/db/schema/"
import { boolean, date, decimal, index, integer, text, time, uuid, varchar } from "drizzle-orm/pg-core"
import { organiserTable } from "@/server/db/schema/"

export const eventsTable = createTable("event", {
    event_id: uuid("event_id").defaultRandom().primaryKey().unique().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    organiser_id: uuid("organiser_id").references(() => organiserTable.organiser_id, { onDelete: "cascade" }),
    start_date: date("start_date").notNull(),
    end_date: date("end_date").notNull(),
    start_time: time("start_time").notNull(),
    end_time: time("end_time").notNull(),
    venue: text("venue"),
    capacity: integer("capacity").notNull(),
    visibility: text("visibility").notNull().default("public").notNull(),
    is_virtual: boolean("is_virtual").notNull().default(false).notNull(),
    is_cancelled: boolean("is_cancelled").notNull().default(false).notNull(),
    is_published: boolean("is_published").notNull().default(false).notNull(),
    is_free: boolean("is_free").notNull().default(true).notNull(),
    slug: varchar('slug', { length: 100 }).notNull(),
    ticket_price: decimal("ticket_price", { precision: 10, scale: 2 }).default("0"),
    tags: text("tags").array(),
    virtual_url: text("virtual_url"),
    cancellation_reason: text("cancellation_reason"),
    createdAt: date("created_at").notNull().defaultNow().notNull(),
    updatedAt: date("updated_at").notNull().defaultNow().notNull(),
}, (t) => [
    index("organiser_id_idx").on(t.organiser_id),
    index("event_id_idx").on(t.event_id),
    index("slug_idx").on(t.slug),
])
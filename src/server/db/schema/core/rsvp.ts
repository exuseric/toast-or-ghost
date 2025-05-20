import {createTable} from "@/server/db/schema/"
import {char, date, index, text, uuid} from "drizzle-orm/pg-core"
import {eventsTable} from "./events"

export const rsvpsTable = createTable("rsvp", {
    rsvp_id: uuid("rsvp_id").defaultRandom().primaryKey().unique().notNull(),
    event_id: uuid("event_id").references(() => eventsTable.event_id, { onDelete: "cascade" }),
    guest_id: char('guest_id', { length: 8 }).notNull().unique(),
    status: text("status").notNull().default("pending").notNull(),
    response_date: date("response_date").defaultNow().notNull(),
    ticketId: char('ticket_id', { length: 24 }).notNull(),
    notes: text("notes"),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
}, (t) => [
    index("event_id_idx").on(t.event_id),
    index("guest_id_idx").on(t.guest_id),
    index("rsvp_id_idx").on(t.rsvp_id),
])
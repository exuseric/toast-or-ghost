import { createTable } from "@/server/db/schema/"
import { date, index, serial, text, uuid } from "drizzle-orm/pg-core"

export const organiserTable = createTable("organiser", {
    organiser_id: uuid("organiser_id").defaultRandom().primaryKey().unique().notNull(),
    user_id: serial("user_id").notNull(),
    name: text("name").notNull(),
    role: text("role").notNull().default("organiser"),
    avatar_image: text("avatar_image").default("https://api.dicebear.com/9.x/pixel-art/svg"),
    createdAt: date("created_at").notNull().defaultNow(),
    updatedAt: date("updated_at").notNull().defaultNow(),
}, (t) => [
    index("user_id_idx").on(t.user_id),
    index("organiser_id_idx").on(t.organiser_id),
])
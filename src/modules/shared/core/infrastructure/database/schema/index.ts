import { index, pgTable, uuid } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { text, integer } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const tobaccoTable = pgTable('tobacco', {
    id: uuid('id').primaryKey().defaultRandom(),
    brand: varchar('brand', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    description: text('description').notNull(),
    nicotine_content: integer('nicotine_content').notNull(),
    throat_hit: integer('throat_hit').notNull(),
    required_experience: integer('required_experience').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),

}, (table) => ({
    experience_level: index('experience_level_index').on(table.required_experience),
    nicotine_content: index('nicotine_content_index').on(table.nicotine_content)
})
);
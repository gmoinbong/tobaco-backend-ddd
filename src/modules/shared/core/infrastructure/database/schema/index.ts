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
    recommendIdx: index('idx_recommend')
        .on(table.required_experience, table.throat_hit, table.nicotine_content),

    suitableIdx: index('idx_suitable')
        .on(table.required_experience),

    expNicotineIdx: index('idx_exp_nicotine')
        .on(table.required_experience, table.nicotine_content),
})
);
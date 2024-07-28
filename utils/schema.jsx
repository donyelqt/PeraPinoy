import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets=pgTable('budgets', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon: varChar('icon'),
    createdBy: varchar('createdBy')
})
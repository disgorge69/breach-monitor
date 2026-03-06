import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const breaches = pgTable("breaches", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }).notNull(),
  breachDate: timestamp("breach_date").notNull(),
  addedDate: timestamp("added_date").defaultNow().notNull(),
  description: text("description").notNull(),
  recordCount: integer("record_count").notNull(),
  severity: varchar("severity", { length: 50 }).notNull(),
});

export const insertBreachSchema = createInsertSchema(breaches).omit({ 
  id: true, 
  addedDate: true 
});

export type InsertBreach = z.infer<typeof insertBreachSchema>;
export type Breach = typeof breaches.$inferSelect;

export type BreachResponse = Breach;
export type BreachesListResponse = Breach[];

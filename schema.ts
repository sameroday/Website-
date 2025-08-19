import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ratings = pgTable("ratings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true,
});

export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratings.$inferSelect;

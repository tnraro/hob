import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text().primaryKey(),
  displayName: text(),
  username: text().notNull().unique(),
  passwordHash: text().notNull(),
});

export const sessions = sqliteTable("session", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
});

export const problems = sqliteTable(
  "problems",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    url: text().notNull(),
    title: text().notNull(),
    no: integer(),
  },
  (t) => [index("problems__url__index").on(t.url)],
);
export const explanations = sqliteTable(
  "explanations",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    authorId: text()
      .notNull()
      .references(() => users.id, { onDelete: "no action" }),
    problemId: integer()
      .notNull()
      .references(() => problems.id, { onDelete: "no action" }),
    content: text().notNull(),
  },
  (t) => [
    index("explanations__author_id__index").on(t.authorId),
    index("explanations__problem_id__index").on(t.problemId),
  ],
);
export const comments = sqliteTable(
  "comments",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    authorId: text()
      .notNull()
      .references(() => users.id, { onDelete: "no action" }),
    explanationId: integer()
      .notNull()
      .references(() => explanations.id, { onDelete: "no action" }),
    content: text().notNull(),
  },
  (t) => [
    index("comments__author_id__index").on(t.authorId),
    index("comments__explanation_id__index").on(t.explanationId),
  ],
);

export type Session = typeof sessions.$inferSelect;

export type User = typeof users.$inferSelect;

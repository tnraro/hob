import { getUserOrRedirect } from "$lib/server/auth";
import { db } from "$lib/server/db/index.js";
import { explanations, users } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { and, eq } from "drizzle-orm";

export async function load({ locals, parent }) {
  const user = getUserOrRedirect(locals);
  const { problem } = await parent();

  const hasExplanation =
    single(
      await db
        .select({ id: explanations.id })
        .from(explanations)
        .where(and(eq(explanations.problemId, problem.id), eq(explanations.authorId, user.id)))
        .limit(1),
    ) != null;

  let allExplanations: (Pick<typeof explanations.$inferSelect, "id" | "authorId"> &
    Pick<typeof users.$inferSelect, "displayName" | "username">)[] = [];
  if (hasExplanation) {
    allExplanations = await db
      .select({
        id: explanations.id,
        authorId: explanations.authorId,
        username: users.username,
        displayName: users.displayName,
      })
      .from(explanations)
      .innerJoin(users, eq(explanations.authorId, users.id))
      .where(eq(explanations.problemId, problem.id));
  }

  return {
    user,
    problem,
    hasExplanation,
    explanations: allExplanations,
  };
}

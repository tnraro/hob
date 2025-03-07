import { getUserOrRedirect } from "$lib/server/auth";
import { db } from "$lib/server/db/index.js";
import { explanations, problems, users } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { error } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const paramSchema = z.coerce.number().min(0);

export async function load({ locals, params }) {
  const problemId = paramSchema.parse(params.problemId);
  const user = getUserOrRedirect(locals);
  const problem = single(
    await db
      .select({
        id: problems.id,
        title: problems.title,
        url: problems.url,
        no: problems.no,
      })
      .from(problems)
      .where(eq(problems.id, problemId)),
  );
  if (problem == null) throw error(404);

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

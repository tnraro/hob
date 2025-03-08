import { db } from "$lib/server/db/index.js";
import { comments, explanations, problems, users } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single.js";
import { clamp } from "$lib/utils/number/clamp.js";
import { error } from "@sveltejs/kit";
import { count, desc, eq } from "drizzle-orm";
import { z } from "zod";

const paramSchema = z.string();

export async function load({ params, url }) {
  const userId = paramSchema.parse(params.userId);

  const problemPage = Number(url.searchParams.get("sp_page") ?? 1);

  const targetUser = single(
    await db
      .select({
        id: users.id,
        username: users.username,
        displayName: users.displayName,
      })
      .from(users)
      .where(eq(users.id, userId)),
  );

  if (targetUser == null) error(404);

  const myExplanationsQuery = db
    .$with("meq")
    .as(
      db
        .selectDistinct({ id: explanations.id, problemId: explanations.problemId })
        .from(explanations)
        .where(eq(explanations.authorId, targetUser.id)),
    );

  const pc = single(
    await db
      .with(myExplanationsQuery)
      .select({
        count: count(),
      })
      .from(myExplanationsQuery),
  );

  if (pc == null) error(500);

  const solvedProblemCount = pc.count;

  const solvedProblems = await db
    .with(myExplanationsQuery)
    .select({
      id: problems.id,
      title: problems.title,
      no: problems.no,
      difficulty: problems.difficulty,
    })
    .from(myExplanationsQuery)
    .innerJoin(problems, eq(problems.id, myExplanationsQuery.problemId))
    .orderBy(desc(myExplanationsQuery.id))
    .limit(10)
    .offset(clamp((problemPage - 1) * 10, 0, solvedProblemCount));

  const wroteComments = await db
    .select({
      id: comments.id,
      content: comments.content,
      explanationId: comments.explanationId,
    })
    .from(comments)
    .where(eq(comments.authorId, targetUser.id));

  return {
    targetUser,
    solvedProblems,
    solvedProblemCount,
    wroteComments,
  };
}

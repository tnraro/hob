import { db } from "$lib/server/db/index.js";
import { comments, explanations, problems, users } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single.js";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { z } from "zod";

const paramSchema = z.string();

export async function load({ params }) {
  const userId = paramSchema.parse(params.userId);

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
        .selectDistinct({ problemId: explanations.problemId })
        .from(explanations)
        .where(eq(explanations.authorId, targetUser.id)),
    );

  const solvedProblems = await db
    .with(myExplanationsQuery)
    .select({
      id: problems.id,
      title: problems.title,
    })
    .from(myExplanationsQuery)
    .innerJoin(problems, eq(problems.id, myExplanationsQuery.problemId));

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
    wroteComments,
  };
}

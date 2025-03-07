import { getUserOrRedirect } from "$lib/server/auth";
import { db } from "$lib/server/db/index.js";
import { comments, explanations, users } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { error } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";
import sanitize from "sanitize-html";
import { z } from "zod";

const paramSchema = z.coerce.number().min(0);

export async function load({ locals, params, parent }) {
  const explanationId = paramSchema.parse(params.explanationId);
  const user = getUserOrRedirect(locals);
  const { problem } = await parent();

  const hasExplanation =
    (await db
      .select({ id: explanations.id })
      .from(explanations)
      .where(and(eq(explanations.problemId, problem.id), eq(explanations.authorId, user.id)))
      .limit(1)) != null;
  if (!hasExplanation) {
    error(403);
  }

  const explanation = single(
    await db
      .select({
        id: explanations.id,
        authorId: explanations.authorId,
        username: users.username,
        displayName: users.displayName,
        content: explanations.content,
      })
      .from(explanations)
      .innerJoin(users, eq(explanations.authorId, users.id))
      .where(eq(explanations.id, explanationId)),
  );

  if (explanation == null) error(404);

  const allComments = await db
    .select({
      id: comments.id,
      authorId: comments.authorId,
      username: users.username,
      displayName: users.displayName,
      content: comments.content,
    })
    .from(comments)
    .innerJoin(users, eq(comments.authorId, users.id))
    .where(eq(comments.explanationId, explanationId));

  return {
    user,
    problem,
    hasExplanation,
    explanation,
    comments: allComments,
  };
}

const commentSchema = z.object({
  content: z.string().min(1),
});
const deleteCommentSchema = z.object({
  id: z.coerce.number(),
});

export const actions = {
  comment: async ({ request, params, locals }) => {
    const explanationId = paramSchema.parse(params.explanationId);
    const user = getUserOrRedirect(locals);
    const formData = await request.formData();
    const { content } = commentSchema.parse(Object.fromEntries(formData.entries()));

    await db.insert(comments).values({
      authorId: user.id,
      explanationId,
      content: sanitize(content),
    });

    return {};
  },
  "delete-comment": async ({ request, locals }) => {
    const user = getUserOrRedirect(locals);
    const formData = await request.formData();
    const { id } = deleteCommentSchema.parse(Object.fromEntries(formData.entries()));

    await db.delete(comments).where(and(eq(comments.id, id), eq(comments.authorId, user.id)));

    return {};
  },
};

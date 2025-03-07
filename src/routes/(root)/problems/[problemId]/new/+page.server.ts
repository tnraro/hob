import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { explanations, problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import sanitize from "sanitize-html";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { schema } from "./schema.js";

const paramSchema = z.coerce.number().min(0);

export async function load({ locals, params }) {
  const problemId = paramSchema.parse(params.problemId);
  getUserOrRedirect(locals);
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

  return {
    form: await superValidate(zod(schema)),
    problem,
  };
}

export const actions = {
  default: async ({ request, locals, params }) => {
    const problemId = paramSchema.parse(params.problemId);
    const user = getUserOrRedirect(locals);
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

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

    if (problem == null) throw new Error("no problem");
    await db.insert(explanations).values({
      problemId: problem.id,
      authorId: user.id,
      content: sanitize(form.data.content),
    });

    redirect(302, `/problems/${problem.id}`);
  },
};

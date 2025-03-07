import { parsePsUrl } from "$lib/features/ps/parse-ps-url.js";
import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { explanations, problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single.js";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import sanitize from "sanitize-html";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "./schema.js";

export async function load({ locals }) {
  getUserOrRedirect(locals);
  return {
    form: await superValidate(zod(schema)),
  };
}

export const actions = {
  default: async ({ request, locals }) => {
    const user = getUserOrRedirect(locals);
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const { url, title: titleSuggestion } = parsePsUrl(form.data.url);

    const data = {
      url,
      title: form.data.title ?? titleSuggestion,
      no: form.data.no,
      content: sanitize(form.data.content),
    };

    let problem = single(await db.select({ id: problems.id }).from(problems).where(eq(problems.url, data.url)));
    if (problem == null) {
      problem = single(
        await db
          .insert(problems)
          .values({
            url: data.url,
            title: data.title,
            no: data.no,
          })
          .returning({ id: problems.id }),
      );
    }
    if (problem == null) throw new Error("no problem");
    await db.insert(explanations).values({
      problemId: problem.id,
      authorId: user.id,
      content: data.content,
    });

    redirect(302, `/problems/${problem.id}`);
  },
};

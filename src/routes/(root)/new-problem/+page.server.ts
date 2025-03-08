import { crawlPs } from "$lib/features/ps/crawl-ps.server.js";
import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single.js";
import { fail, isRedirect, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
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
    const form = await superValidate(request, zod(schema));

    try {
      getUserOrRedirect(locals);

      if (!form.valid) {
        throw { status: 400 };
      }

      let problem = single(await db.select({ id: problems.id }).from(problems).where(eq(problems.url, form.data.url)));

      if (problem == null) {
        const data = await crawlPs(form.data.url);
        problem = single(
          await db
            .insert(problems)
            .values({
              site: data.site,
              title: data.title,
              no: data.no,
              category: data.category,
              difficulty: data.difficulty,
              topics: data.topics,
              content: data.content,
              url: form.data.url,
            })
            .returning({ id: problems.id }),
        );
      }
      if (problem == null) throw new Error("no problem");

      redirect(302, `/problems/${problem.id}/new`);
    } catch (error) {
      if (isRedirect(error)) {
        throw error;
      }
      if (typeof (error as { status: number }).status === "number") {
        return fail((error as { status: number }).status, { form });
      }
      return fail(500, { form });
    }
  },
};

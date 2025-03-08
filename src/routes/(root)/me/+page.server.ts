import { getUserOrRedirect } from "$lib/server/auth";
import { db } from "$lib/server/db/index.js";
import { users } from "$lib/server/db/schema.js";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { schema } from "./schema.js";

export async function load({ locals }) {
  const user = getUserOrRedirect(locals);

  return {
    user,
    form: await superValidate(zod(schema)),
  };
}

export const actions = {
  update: async ({ locals, request }) => {
    const user = getUserOrRedirect(locals);
    const form = await superValidate(request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    await db
      .update(users)
      .set({
        displayName: form.data.displayName ?? null,
        username: form.data.username,
      })
      .where(eq(users.id, user.id));

    return { form };
  },
};

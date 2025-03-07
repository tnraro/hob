import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { hash, verify } from "@node-rs/argon2";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { setError, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import { schema } from "./schema";

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    return redirect(302, "/");
  }
  return {
    form: await superValidate(zod(schema)),
  };
};

export const actions: Actions = {
  login: async (event) => {
    const form = await superValidate(event.request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const results = await db.select().from(table.users).where(eq(table.users.username, form.data.username));

    const existingUser = results.at(0);
    if (!existingUser) {
      return setError(form, "password", "유저명이나 비밀번호가 틀렸습니다");
    }

    const validPassword = await verify(existingUser.passwordHash, form.data.password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return setError(form, "password", "유저명이나 비밀번호가 틀렸습니다");
    }

    const sessionToken = auth.generateSessionToken();
    const session = await auth.createSession(sessionToken, existingUser.id);
    auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

    return redirect(302, "/");
  },
  register: async (event) => {
    const form = await superValidate(event.request, zod(schema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const userId = generateUserId();
    const passwordHash = await hash(form.data.password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    try {
      await db.insert(table.users).values({ id: userId, username: form.data.username, passwordHash });

      const sessionToken = auth.generateSessionToken();
      const session = await auth.createSession(sessionToken, userId);
      auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.error(e);
      return setError(form, "password", "일시적 오류");
    }
    return redirect(302, "/");
  },
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await auth.invalidateSession(event.locals.session.id);
    auth.deleteSessionTokenCookie(event);

    return redirect(302, "/auth");
  },
};

function generateUserId() {
  // ID with 120 bits of entropy, or about the same as UUID v4.
  const bytes = crypto.getRandomValues(new Uint8Array(15));
  const id = encodeBase32LowerCase(bytes);
  return id;
}

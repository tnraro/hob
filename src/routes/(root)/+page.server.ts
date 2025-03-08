import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { clamp } from "$lib/utils/number/clamp.js";
import { error } from "@sveltejs/kit";
import { count, desc } from "drizzle-orm";

export async function load({ locals, url }) {
  const user = getUserOrRedirect(locals);

  const page = Number(url.searchParams.get("page") ?? 1);

  const pc = single(await db.select({ count: count() }).from(problems));
  if (pc == null) error(500);

  const problemCount = pc.count;

  const ps = await db
    .select({
      id: problems.id,
      no: problems.no,
      title: problems.title,
      difficulty: problems.difficulty,
    })
    .from(problems)
    .orderBy(desc(problems.id))
    .limit(10)
    .offset(clamp((page - 1) * 10, 0, problemCount));

  return {
    user,
    problems: ps,
    problemCount,
  };
}

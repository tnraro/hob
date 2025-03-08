import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { problems } from "$lib/server/db/schema.js";
import { desc } from "drizzle-orm";

export async function load({ locals, url }) {
  const user = getUserOrRedirect(locals);

  const page = Number(url.searchParams.get("page") ?? 0);

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
    .offset(page);

  return {
    user,
    problems: ps,
  };
}

import { getUserOrRedirect } from "$lib/server/auth.js";
import { db } from "$lib/server/db/index.js";
import { explanations, problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { clamp } from "$lib/utils/number/clamp.js";
import { error } from "@sveltejs/kit";
import { count, desc, eq, sql } from "drizzle-orm";

export async function load({ locals, url }) {
  const user = getUserOrRedirect(locals);

  const page = Number(url.searchParams.get("page") ?? 1);

  const pc = single(await db.select({ count: count() }).from(problems));
  if (pc == null) error(500);

  const problemCount = pc.count;

  const sp = db.$with("sp").as(
    db
      .selectDistinct({
        id: explanations.id,
        problemId: explanations.problemId,
      })
      .from(explanations)
      .where(eq(explanations.authorId, user.id)),
  );

  const ps = await db
    .with(sp)
    .select({
      id: problems.id,
      no: problems.no,
      title: problems.title,
      difficulty: problems.difficulty,
      solved: sql<boolean>`${sp.id} is not null`,
    })
    .from(problems)
    .leftJoin(sp, eq(problems.id, sp.problemId))
    .orderBy(desc(problems.id))
    .limit(10)
    .offset(clamp((page - 1) * 10, 0, problemCount));

  return {
    user,
    problems: ps,
    problemCount,
  };
}

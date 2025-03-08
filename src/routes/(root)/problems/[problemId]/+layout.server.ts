import { db } from "$lib/server/db/index.js";
import { problems } from "$lib/server/db/schema.js";
import { single } from "$lib/utils/array/single";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { z } from "zod";

const paramSchema = z.coerce.number().min(0);

export async function load({ params }) {
  const problemId = paramSchema.parse(params.problemId);
  const problem = single(
    await db
      .select({
        id: problems.id,
        site: problems.site,
        title: problems.title,
        no: problems.no,
        category: problems.category,
        difficulty: problems.difficulty,
        topics: problems.topics,
        content: problems.content,
        url: problems.url,
      })
      .from(problems)
      .where(eq(problems.id, problemId)),
  );
  if (problem == null) throw error(404);

  return {
    problem,
  };
}

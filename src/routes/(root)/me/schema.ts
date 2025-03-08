import { z } from "zod";

export const schema = z.object({
  displayName: z.string().nullish(),
  username: z.string().optional(),
});

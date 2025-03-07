import { z } from "zod";

export const schema = z.object({
  url: z.string().url(),
  title: z.string().optional(),
  no: z.number().optional(),
  content: z.string(),
});

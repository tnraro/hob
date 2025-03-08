import { z } from "zod";

const patterns: { pattern: RegExp; transform: (options: { url: string; match: RegExpMatchArray }) => string }[] = [
  {
    pattern: /https:\/\/leetcode\.com\/problems\/(.+?)(?=\/|$)/,
    transform: ({ match }) => {
      return match[0];
    },
  },
];

export const schema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => patterns.some(({ pattern }) => pattern.test(url)), { message: "지원하지 않는 URL이에요." })
    .transform((url) =>
      patterns.reduce((url, { pattern, transform }) => {
        const match = url.match(pattern);
        if (match == null) return url;
        return transform({ url, match });
      }, url),
    ),
});

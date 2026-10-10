import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wiki = defineCollection({
  loader: glob({
    base: "./src/content/wiki",
    pattern: "**/*.md",
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      category: z.enum(["Teoría", "Argentina", "Estudios", "Recursos", "Otro"]),
      author: z.string().optional(),
      authors: z.array(z.string()).optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.author && (!data.authors || data.authors.length === 0)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Every wiki article needs `author` or `authors`.",
          path: ["authors"],
        });
      }
    }),
});

export const collections = { wiki };

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const wiki = defineCollection({
  loader: glob({
    base: "./src/content/wiki",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z
      .enum(["Teoría", "Argentina", "Estudios", "Recursos", "Otro"])
      .default("Otro"),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { wiki };

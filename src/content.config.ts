import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().default(""),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    meta: z.string().optional(),
    image: z.string().optional(),
    appStore: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .optional(),
  }),
});

export const collections = { posts, projects };

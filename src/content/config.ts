import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    pinned: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    emoji: z.string().optional().default("📝"),
  }),
});

export const collections = { blog };

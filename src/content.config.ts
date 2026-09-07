import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    // One-line outcome statement used on the homepage card and in navigation.
    outcome: z.string(),
    headline: z.string(),
    intro: z.string(),
    // Stub pages render intro plus a visible build notice until phase 3.
    stub: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    included: z.array(z.string()).default([]),
    process: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    needs: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    // reference() makes the build fail on a typo in a related slug.
    related: z.object({ slug: reference('services'), label: z.string() }).optional(),
    // Lowercase noun phrase for the closing CTA, for example "incorporation".
    ctaNoun: z.string().optional(),
  }),
});

export const collections = { services };

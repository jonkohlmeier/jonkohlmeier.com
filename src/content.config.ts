import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
			tags: z.array(z.string()).optional(),
			category: z.enum(['work-and-ideas', 'life-and-reflection', 'the-finer-things']),
			format: z.enum(['essay', 'note', 'roundup']).default('essay'),
			featured: z.boolean().optional(),
			draft: z.boolean().optional(),
			canonical: z.string().url().optional(),
		}),
});

const advisory = defineCollection({
	loader: glob({ base: './src/content/advisory', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		description: z.string(),
		who_it_is_for: z.string(),
		outcomes: z.array(z.string()).min(1),
		cta_label: z.string(),
		cta_link: z.string(),
		order: z.number().optional(),
	}),
});

export const collections = { blog, advisory };

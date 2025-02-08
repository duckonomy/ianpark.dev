import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const VALID_TAGS = ["software", "tools", "life"] as const;

const baseSchema = z.object({
	title: z.string().max(60),
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			language: z.enum(["en", "ko"]),
			tags: z.array(z.enum(VALID_TAGS)).max(3).optional().default([]), // Empty array by default if not specified
		}),
});

const note = defineCollection({
	// loader: glob({ base: "./src/content", pattern: "**/notes/**/*.{md,mdx}" }),
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
		publishDate: z
			.string()
			.datetime()
			.transform((val) => new Date(val)),
		language: z.enum(["en", "ko"]),
	}),
});

export const collections = { post, note };

export const tags = VALID_TAGS;

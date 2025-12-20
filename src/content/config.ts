import { defineCollection, z } from "astro:content";

// Define the "projects" collection schema
const projectsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()),
        imagePath: z.string(),
        tags: z.array(z.string()),

        publishedTime: z
            .string()
            .refine(
                (value) => !isNaN(Date.parse(value)),
                { message: "publishedTime must be a valid date string" }
            ),

        modifiedTime: z
            .string()
            .refine(
                (value) => !isNaN(Date.parse(value)),
                { message: "modifiedTime must be a valid date string" }
            )
            .optional(),
        githubURL: z.string().url(),
        projectURL: z.string().url().optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
};

import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .max(40, "Title cannot exceed 40 characters")
    .trim()
    .min(1, "You must enter a title"),
  description: z
    .string()
    .max(80, "Description cannot exceed 80 characters")
    .trim()
    .min(5, "Description must be at least 5 characters"),
});

export type BlogSchemaType = z.infer<typeof blogSchema>;

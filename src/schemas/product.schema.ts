import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),

  price: z
    .number()
    .min(1, "Price is required")
    .min(1, "Price must be greater than 0"),

  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  category: z.string().min(1, "Category is required"),

  image: z
    .string()
    .min(1, "Image URL is required")
    .url({ message: "Invalid image URL" }),
});

export type ProductFormValues = z.infer<typeof productSchema>;

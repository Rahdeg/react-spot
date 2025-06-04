import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  bio: z.string().max(200, "Bio must be less than 200 characters"),
  profileImage: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine(
      (value) =>
        typeof value === "string" || !value || value.size <= 1024 * 1024, // Only check size if it's a File
      {
        message: "Profile image must be less than 1 MB",
      }
    ),
});

export const postSchema = z.object({
  title: z.string().min(1, "title is required"),
  image: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .refine(
      (value) =>
        typeof value === "string" || !value || value.size <= 1024 * 1024, // Only check size if it's a File
      {
        message: " Image must be less than 1 MB",
      }
    ),
});

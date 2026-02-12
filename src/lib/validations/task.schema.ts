import { z } from "zod";

// Zod schemas used for client-side form validation before sending data to the API.
// Inferred types (CreateTaskFormData, UpdateTaskFormData) keep forms and schemas in sync.

export const taskStatusEnum = z.enum(["pending", "in_progress", "completed"]);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .default(""),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: taskStatusEnum.optional(),
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;

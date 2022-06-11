import { object, string } from "zod";

export const noteSchema = object({
  title: string()
    // .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: string()
    // .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
});

export const folderSchema = object({
  name: string()
    .min(1, 'Title is required')
    .max(120, 'Title must be less than 100 characters'),
});
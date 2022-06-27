import { object, string , z } from "zod";

export const noteSchema = object({
  title: string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: string()
    .min(1, 'Content is required')
    .max(1000, 'Content must be less than 1000 characters'),
});

export const folderSchema = object({
  name: string()
    .min(1, 'Title is required')
    .max(120, 'Title must be less than 100 characters'),
});

export const userSchema = object({
  email: string()
    .email({ message: 'Invalid email'})
    .max(130, 'Title must be less than 100 characters'),
  firstName: string({ required_error: "Fist name is required"})
    .min(1, 'Fist name is required')
    .max(120, 'Fist name must be less than 120 characters'),
  lastName: string()
    .max(120, 'Last name must be less than 120 characters')
    .optional(),
  password: string()
    .min(8, 'Password must be more than 8 characters')
    .max(50, 'Password must be less than 8 characters'),
})

export const loginSchema = userSchema.pick({ email: true , password: true });

export const signUpSchema = userSchema.extend({
  passwordConfirmation: string({
    required_error: 'Confirm password is required',
  }),
}).refine((value) => value.password === value.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
});
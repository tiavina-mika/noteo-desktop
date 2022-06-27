import { z } from "zod";

import { loginSchema, signUpSchema } from "../utils/validations";

export interface User {
  __typename: 'User',
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  updatedAt?: string;
  createdAt?: string;
}

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

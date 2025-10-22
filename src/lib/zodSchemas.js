import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email field is required") // required first
    .email("Invalid email"),             // then format check
  password: z
    .string()
    .nonempty("Password field is required") // required first
    .min(4, "Password must be at least 4 characters") // then min length
});

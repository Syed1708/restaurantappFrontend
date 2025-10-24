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


export const registerSchema = z.object({
  name: z.string().nonempty("Required").min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
  role: z.enum(["admin", "manager", "chef", "waiter"]),
  location: z.string().min(1, "Location is required"),
});

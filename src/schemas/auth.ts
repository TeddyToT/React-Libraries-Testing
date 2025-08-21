import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 6 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must be matched",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signupSchema>;

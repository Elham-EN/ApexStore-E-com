import { z } from "zod";

const passwordValidation = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$"
);

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

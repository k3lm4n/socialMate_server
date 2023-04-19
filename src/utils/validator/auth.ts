import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email must be valid" })
    .refine((value) => value.includes("@isptec.co.ao"), {
      message: "Email must be @isptec.co.ao",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Email must be valid" })
    .refine((value) => value.includes("@isptec.co.ao"), {
      message: "Email must be @isptec.co.ao",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  birthdate: z.date().optional(),
});

export const updateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .optional(),
  email: z.string().email({ message: "Email must be valid" }).optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .optional(),
  role: z
    .string()
    .min(3, { message: "Role must be at least 3 characters" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional(),
});

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

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z
    .string()
    .email({ message: "Email must be valid" })
    .refine((value) => value.includes("@isptec.co.ao"), {
      message: "Email must be @isptec.co.ao",
    }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  passwordConfirmation: z.string().min(6, {
    message: "Password must be same as above",
  }),
  birthdate: z.string().min(3, { message: "Required" }),
  degree: z
    .string()
    .min(1, { message: "Required" }).optional(),
  course: z
    .string()
    .min(1, { message: "Course must be at least 3 characters" }).optional(),
  phone: z
    .string()
    .min(9, { message: "Phone must be at least 9 characters" })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" })
    .optional(),
    interest: z.array(z.any()).optional(),
});

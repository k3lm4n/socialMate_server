import z from "zod";

export const groupSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    description: z.string().min(3, { message: "Description must be at least 3 characters" }),
    members: z.array(z.string()).min(1, { message: "Members must be at least 1" }),
    admins: z.array(z.string()).min(1, { message: "Admins must be at least 1" }),
});
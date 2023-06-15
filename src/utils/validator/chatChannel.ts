import z from "zod";

export const chatChannel = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .optional(),
  members: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Members must be at least 1" }),
        label: z.string().min(1, { message: "Members must be at least 1" }),
      })
    )
    .min(1, { message: "Members must be at least 1" }),
  category: z
    .string()
    .min(1, { message: "Category must be Selected one" })
    .optional(),
  subcategories: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Members must be at least 1" }),
        label: z.string().min(1, { message: "Members must be at least 1" }),
      })
    )
    .min(1, { message: "SubCategories must be Selected one" })
    .optional(),
  avatar: z.string().min(1, { message: "" }).optional(),
  private: z.boolean().optional(),
});

export type ChatChannelType = z.infer<typeof chatChannel>;

import z from "zod";

export const chatChannel = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" })
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

export const chatSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(20, {
      message: "O nome deve ter pelo menos 20 caracteres",
    })
    .optional(),
  description: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres" })
    .optional(),
  members: z
    .array(z.string())
    .min(1, { message: "Members must be at least 1" })
    .optional(),
  channel: z
    .string()
    .min(1, { message: "Channel must be Selected one" })
    .optional(),
  avatar: z.string().min(1, { message: "" }).optional(),
});

export const AddMembersSchema = z.object({
  members: z.array(
    z.object({
      value: z.string().min(1, { message: "Members must be at least 1" }),
      label: z.string().min(1, { message: "Members must be at least 1" }),
    })
  ),
  channel: z.string().min(1, { message: "Channel must be Selected one" }),
});

export type ChatType = z.infer<typeof chatSchema>;
export type ChatChannelType = z.infer<typeof chatChannel>;
export type AddMembersType = z.infer<typeof AddMembersSchema>;

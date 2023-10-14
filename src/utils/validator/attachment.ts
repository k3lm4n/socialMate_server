import z from "zod";

export const AttachmentSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Discription must be at least 3 characters" })
    .optional(),
  discriminator: z.enum(["TEST_FILE", "FILE", "BOOK"]).optional(),
  categoryId: z
    .object({
      value: z.string().min(1, { message: "Members must be at least 1" }),
      label: z.string().min(1, { message: "Members must be at least 1" }),
    })
    .optional(),
  attatchments: z
    .array(
      z.object({
        url: z.string(),
        originalName: z.string(),
        mimetype: z.string(),
      })
    )
    .optional(),
});

export const DiscriminatorSchema = z.object({
  discriminator: z.enum(["TEST_FILE", "FILE", "BOOK"]).optional(),
  category: z
    .object({
      value: z.string().min(1, { message: "Members must be at least 1" }),
      label: z.string().min(1, { message: "Members must be at least 1" }),
    })
    .optional(),
});

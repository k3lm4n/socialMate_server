import z from "zod";

export const AttachmentSchema = z.object({
  url: z.string().min(3, { message: "Url must be at least 3 characters" }),
  mimetype: z
    .string()
    .min(3, { message: "Mimetype must be at least 3 characters" }),
  originalName: z
    .string()
    .min(3, { message: "OriginalName must be at least 3 characters" }),
  discriminator: z
    .enum(["TEST_FILE", "FILE", "BOOK"]).optional(),
    categoryId: z.string().min(3, { message: "Category must be at least 3 characters" }).optional(),
});


export  const DiscriminatorSchema = z.object({
    discriminator: z
        .enum(["TEST_FILE", "FILE", "BOOK"]).optional(),
})
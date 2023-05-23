import z from "zod";

export const commentSchema = z.object({
  text: z.string().min(3, { message: "Content must be at least 3 characters" }),
  postId: z
    .string()
    .min(3, { message: "Post ID must be at least 3 characters" }),
});

export const updateCommentSchema = z.object({
  text: z
    .string()
    .min(3, { message: "Content must be at least 3 characters" })
    .optional(),
  postId: z
    .string()
    .min(3, { message: "Post ID must be at least 3 characters" })
    .optional(),
});

import z from "zod";

export const messageSchema = z.object({
    content: z.string().min(3, { message: "Content must be at least 3 characters" }),
    senderId: z.string().min(3, { message: "Sender ID must be at least 3 characters" }),
    receiverId: z.string().min(3, { message: "Receiver ID must be at least 3 characters" }).optional(),
    groupId: z.string().min(3, { message: "Group ID must be at least 3 characters" }).optional(),
});
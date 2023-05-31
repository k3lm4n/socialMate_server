import { PrismaClient } from "@prisma/client";
import { Message } from "../utils/types/@types";

const prisma = new PrismaClient();

class MessageModel {
  async messaging(message: Message) {
    try {
      const chatChannel = await prisma.message.create({
        data: {
          content: message.content,
          chat: {
            connect: {
              id: message.id,
            },
          },
          sender: {
            connect: {
              id: message.senderId,
            },
          },
          receiver: {
            connect: {
              id: message.receiverId,
            },
          },
          createdAt: message.createdAt,
        },
      });

      console.log("====================================");
      console.log(chatChannel);
      console.log("====================================");
      return chatChannel;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }
}

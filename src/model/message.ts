import { PrismaClient } from "@prisma/client";
import { Message } from "../utils/types/@types";

const prisma = new PrismaClient();

class MessageModel {
  async messaging(message: Message) {
    try {
      console.log("====================================");
      console.log("Mensagem:", message);
      console.log("====================================");
      const chatChannel = await prisma.message.create({
        data: {
          content: message.content,
          sender: {
            connect: {
              id: message.senderId,
            },
          },
          chat: {
            connect: {
              id: message.chatId,
            },
          },
        },
      });

      console.log("====================================");
      console.log("send Mensagem:",chatChannel);
      console.log("====================================");
      return chatChannel;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  async getAll(chatID: string) {
    try {
      const messages = await prisma.message.findMany({
        where: {
          chatId: {
            equals: chatID,
          },
        },
        select: {
          id: true,
          content: true,
          sender: {
            select: {
              name: true,
              lastname: true,
            },
          },
          chat: {
            select: {
              id: true,
            },
          },
        },
      });

      const mapMessages = messages.map((data) => {
        return {
          id: data.id,
          content: data.content,
          sender: data.sender.name + " " + data.sender.lastname,
          chatId: data.chat?.id,
        };
      });

      return mapMessages;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }
}

export default MessageModel;

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Message } from "../utils/types/@types";
import { ParserService } from "../utils/ParserService";
import { io } from "../server";

const prisma = new PrismaClient();

class MessageController {
  async messaging(req: Request, res: Response) {
    const message: Message = req.body;
    const user_id = ParserService(req.cookies.tokens).user_id;
    try {
      const chatChannel = await prisma.message.create({
        data: {
          content: message.content,
          sender: {
            connect: {
              id: user_id,
            },
          },
          chat: {
            connect: {
              id: message.chatId,
            },
          },
        },
        select: {
          id: true,
          content: true,
          sender: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
          chat: {
            select: {
              id: true,
            },
          },
          createdAt: true,
        },
      });

      const newMessage = {
        id: chatChannel.id,
        content: chatChannel.content,
        senderId: chatChannel.sender.id,
        sender: chatChannel.sender.name + " " + chatChannel.sender.lastname,
        chatId: chatChannel.chat?.id,
        createdAt: chatChannel.createdAt,
      };

      io.to(message.chatId).emit("newIncomingMessage", newMessage);
      return res.status(201).json(newMessage);
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { chatId } = req.params;
      const messages = await prisma.message.findMany({
        where: {
          chatId: {
            equals: chatId,
          },
        },
        select: {
          id: true,
          content: true,
          sender: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
          chat: {
            select: {
              id: true,
            },
          },
          createdAt: true,
        },
      });

      const mapMessages = messages.map((data) => {
        return {
          id: data.id,
          content: data.content,
          senderId: data.sender.id,
          sender: data.sender.name + " " + data.sender.lastname,
          chatId: data.chat?.id,
          createdAt: data.createdAt,
        };
      });

      return res.status(200).json(mapMessages);
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export default MessageController;

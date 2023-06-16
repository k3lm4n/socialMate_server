import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";
import { chatSchema } from "../utils/validator/chatChannel";

const prisma = new PrismaClient();

class ChatController {
  async createChat(req: Request, res: Response) {
    try {
      const { members, channel, name, description } = chatSchema.parse(
        req.body
      );
      if (members) {
        members.push(ParserService(req.cookies.tokens).user_id);

        const exist_chat = await prisma.chat.findMany({
          where: {
            AND: [
              {
                userIDs: {
                  hasEvery: members,
                },
              },
            ],
          },
        });
        if (exist_chat.length > 0) {
          return res.status(200).json({ message: "Chat já existe!" });
        }
      }

      const chat = await prisma.chat.create({
        data: {
          members: members
            ? {
                connect: members.map((id: string) => ({
                  id,
                })),
              }
            : undefined,
          name: !members ? name : "Private Chat",
          description,
          chatChannel: channel
            ? {
                connect: {
                  id: channel,
                },
              }
            : undefined,
        },
      });

      return res.status(201).json(chat);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async search(req: Request, res: Response) {
    const { name } = req.query || "";

    try {
      const chat = await prisma.chat.findMany({
        where: {
          name: {
            contains: String(name),
          },
        },
      });
      return res.json(chat).status(200);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAllByUser(req: Request, res: Response) {
    try {
      const { user_id } = ParserService(
        (req.headers.authorization as string) || req.cookies.tokens
      );
      const chat = await prisma.chat.findMany({
        where: {
          userIDs: {
            hasSome: user_id,
          },
        },
        select: {
          id: true,
          members: {
            select: {
              id: true,
              name: true,
              lastname: true,
              degree: true,
              course: {
                select: {
                  name: true,
                },
              },
              login: {
                select: {
                  username: true,
                },
              },
              interest: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const chatMapped = chat.map((chat) => {
        const members = chat.members.filter(
          (member) => member.id !== user_id
        )[0];
        return {
          id: chat.id,
          name: members.name + " " + members.lastname,
          username: members.login?.username,
          course: members.course?.name,
          degree: members.degree,
          interest: members.interest?.map((item) => item.name),
        };
      });

      return res.status(200).json(chatMapped);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const chat = await prisma.chat.findMany({});
      return res.status(200).json(chat);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error || "Erro" });
    }
  }

  async getAllOnChannel(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const chat = await prisma.chat.findMany({
        where: {
          chatChannelId: {
            equals: id,
          },
        },
      });
      return res.status(200).json(chat);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chat = await prisma.chat.delete({
        where: {
          id,
        },
      });
      res.status(204).json({ chat });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
    } catch (error) {}
  }
}

export default ChatController;

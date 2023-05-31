import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";

const prisma = new PrismaClient();

class ChatController {

  async createChat(req: Request, res: Response) {
    const {userIds} = req.body;
    const name = req.body.name;

    try {
      const chatChannel = await prisma.chat.create({
        data: {
          users: {
            connect: userIds.map((id: number) => ({
              id,
            })),
          },
          name: userIds.length > 2 ? name : null,
        },
      });

      res.status(201).json({ chatChannel });
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
    const { user_id } = ParserService(req.headers.authorization as string);

    try {
      const chat = await prisma.chat.findMany({
        where: {
          users: {
            some: {
              id: user_id,
            },
          },
        },
      });

      return res.json(chat).status(200);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const chat = await prisma.chat.findMany({});
      return res.json(chat).status(200);
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
      res.status(200).json({ chat });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}



export default ChatController
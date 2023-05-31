import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class MessageController {
  async getAll(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const chat = await prisma.message.findMany({
        where: {
          chatId: id,
        },
      });
      return res.json(chat).status(200);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async search(req: Request, res: Response) {
    const { query } = req.query || "";
    try {
      const messages = await prisma.message.findMany({
        where: {
          content: {
            contains: String(query),
          },
        },
      });

      console.log("====================================");
      console.log(messages);
      console.log("====================================");

      return res.json(messages).status(200);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const message = await prisma.message.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ message });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
  
}

export default MessageController;

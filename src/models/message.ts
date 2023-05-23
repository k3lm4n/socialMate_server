// import { Prisma, PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export interface MessageCreateInput extends Prisma.MessageCreateInput {}

//  {}

// export async function createMessage(data: MessageCreateInput): Promise<MessageCreateInput> {
//   const message = await prisma.message.create({
//     data,
//   });

//   return message;
// }

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ParserService } from "../utils/ParserService";
import { messageSchema } from "../utils/validator/message";
import { Message } from "../utils/types/@types";

const prisma = new PrismaClient();

class MessageModel {
  async create(
    { content, groupId, receiverId, createdAt, senderId, id }: Message,
    req: Request,
    res: Response
  ) {
    try {
      const { user_id } = ParserService(req.cookies);

      const message = await prisma.message.create({
        data: {
          content,
          senderId: user_id,
          groupId: groupId ? groupId : null,
          receiverId: receiverId ? receiverId : null,
        },
      });

      res.status(201).json({ message });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default MessageModel;

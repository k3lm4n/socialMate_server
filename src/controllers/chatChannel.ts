import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Message } from "../utils/types/@types";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

class GroupController {
  async create(req: Request, res: Response) {
    const { name, description, categories } = req.body;
    const chatChannel = await prisma.chatChannel.create({
      data: {
        name,
        description,
      },
    });

    res.status(200).json({ chatChannel });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, categories, userId } = req.body;
    const chatChannel = await prisma.chatChannel.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        categories,
      },
    });
    res.status(200).json({ chatChannel });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const chatChannel = await prisma.chatChannel.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ chatChannel });
  }

  async index(req: Request, res: Response) {
    const chatChannel = await prisma.chatChannel.findMany();
    console.log(chatChannel);
    res.status(200).json({ chatChannel });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const chatChannel = await prisma.chatChannel.findUnique({
      where: {
        id,
      },
    });
    console.log(chatChannel);
    res.status(200).json({ chatChannel });
  }

  async join(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;
    const chatChannel = await prisma.chatChannel.update({
      where: {
        id,
      },
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log(chatChannel);
    res.status(200).json({ chatChannel });
  }
}

export default GroupController;

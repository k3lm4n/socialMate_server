import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";
import { postSchema, updatePostSchema } from "../utils/validator/post";

const prisma = new PrismaClient();

class PostContrller {
  async create(req: Request, res: Response) {
    try {
      const { title, content, category, attatchments } = postSchema.parse(
        req.body
      );

      const { user_id } = ParserService(req.cookies);

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user_id,
          categories: {
            connect: {
              name: category,
            },
          },
        },
      });
      res.status(201).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, content, category } = updatePostSchema.parse(req.body);

      const { user_id } = ParserService(req.cookies);

      const post = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          authorId: user_id,
          categories: {
            connect: {
              name: category,
            },
          },
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          categories: true,
        },
      });
      res.status(200).json({ posts });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default new PostContrller();

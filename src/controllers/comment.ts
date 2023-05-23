import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ParserService } from "../utils/ParserService";
import { commentSchema, updateCommentSchema } from "../utils/validator/comment";

const prisma = new PrismaClient();

class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { text, postId } = commentSchema.parse(req.body);
      const { user_id: authorId } = ParserService(req.cookies);

      const comment = await prisma.comment.create({
        data: {
          text,
          authorId,
          postId,
        },
      });
      res.status(200).json({ comment });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { text } = updateCommentSchema.parse(req.body);
      const comment = await prisma.comment.update({
        where: {
          id,
        },
        data: {
          text,
        },
      });
      res.status(200).json({ comment });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comment = await prisma.comment.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ comment });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async index(req: Request, res: Response) {
    const comments = await prisma.comment.findMany();
    console.log(comments);
    res.status(200).json({ comments });
  }
}

export default CommentController;

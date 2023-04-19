import { Router } from "express";
("express");
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.route("/").get(async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.status(200).json({ comments });
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comments = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  res.status(200).json({ comments });
});

routes.post("/", async (req, res) => {
  const { text, user_id, post_id } = req.body;
  const comment = await prisma.comment.create({
    data: {
      text,
      authorId: user_id,
      postId: post_id,
    },
  });
  res.status(200).json({ comment });
});


export default routes;

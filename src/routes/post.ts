import { Router } from "express";
("express");
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { ParserService } from "../utils/ParserService";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.route("/").get(async (req, res) => {
  const posts = await prisma.post.findMany();
  res.status(200).json({ posts });
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
});

routes.post("/", async (req, res) => {
  const { title, content, user_id, category, attatchments } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user_id,
      attatchments,
      categories: {
        connect: {
          name: category,
        },
      },
    },
  });
  res.status(200).json({ post });
});

routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ post });
});

routes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = ParserService(req.cookies);
  const { title, content, category, attatchments } = req.body;
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
      attatchments,
    },
  });
  res.status(200).json({ post });
});

export default routes;

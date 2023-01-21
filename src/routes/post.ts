import { Router } from "express";
("express");
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.route("/").get(async (req, res) => {
  const posts = await prisma.post.findMany();
  console.log("estou");
  //   const users = await prisma.post.findMany();
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
  const { title, content, user_id, category_id, attatchments } = req.body;
  const post = await prisma.post.create({data:{
    title,
    content,
    authorId: user_id,
    categoryIDs: category_id,
    attatchments,
  }});
  res.status(200).json({ post });
});

export default routes;

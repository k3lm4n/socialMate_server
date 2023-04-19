import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.get("/", async (req: Request, res: Response) => {
  const groups = await prisma.group.findMany();
  console.log(groups);
  res.status(200).json({ groups });
});

routes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const groups = await prisma.group.findUnique({
    where: {
      id,
    },
  });
  console.log(groups);
  res.status(200).json({ groups });
});

routes.post("/", async (req: Request, res: Response) => {
  const { name, description, categories } = req.body;
  const group = await prisma.group.create({
    data: {
      name,
      description,
    },
  });

  res.status(200).json({ group });
});

routes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = await prisma.group.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ group });
});

routes.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, categories, userId } = req.body;
  const group = await prisma.group.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      categories,
      userId,
    },
  });
  res.status(200).json({ group });
});

export default routes;

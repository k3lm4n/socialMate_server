import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.status(200).json({ users });
});
routes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  console.log(users);
  res.status(200).json({ users });
});
routes.post("/", async (req: Request, res: Response) => {
  const { name, email, password, address,birthday } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
      address,
      birthday,
    },
  });

  res.status(201).json({ user });
});

routes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.status(200).json({ user });
});

routes.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address,role } = req.body;
  console.log(req.body);
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      address,
      role,
    },
  });
  res.status(200).json({ user });
});

routes.put("/password/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hash,
    },
  });
  res.status(200).json({ user });
});

routes.get



export default routes;

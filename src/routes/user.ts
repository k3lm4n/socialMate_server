import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userController from "../controllers/user";
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
routes.post("/", userController.register);

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

routes.get;

export default routes;

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerSchema } from "../utils/validator/user";
import { stringify } from "querystring";

const prisma = new PrismaClient();

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, birthdate, lastname, username } =
        registerSchema.parse(req.body);
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          lastname,
          birthdate,
          login:{
            create:{
              email,
              password:hash,
              username
            }
          }
        },
      });

      res.status(201).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { name, lastname, email, address, role } = req.body;
      console.log(req.body);
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          address,
          lastname,
          login: {
            update: {
              email,
            },
          },
        },
      });
      res.status(200).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });
      res.status(202).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ users });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async search(req: Request, res: Response) {
    const { name } = req.query;
    try {
      const users = await prisma.user.findMany({
        where: {
          name: {
            contains: String(name),
          },
        },
      });
      res.status(200).json({ users });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default new UserController();

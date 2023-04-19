import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerSchema } from "../utils/validator/user";

const prisma = new PrismaClient();

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, birthdate } = registerSchema.parse(
        req.body
      );
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          birthdate,
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
      const { name, email, address, role } = req.body;
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
      res.status(200).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {}

  async getById(req: Request, res: Response) {}

  async search(req: Request, res: Response) {}
}

export default new UserController();

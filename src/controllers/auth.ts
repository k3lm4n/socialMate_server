import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JWTServices } from "../utils/JWTServices";
import { loginSchema } from "../utils/validator/auth";
import { ParserService } from "../utils/ParserService";

const prisma = new PrismaClient();

class ControllerAuth {
  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          email: true,
          role: true,
          id: true,
          name: true,
          password: true,
        }
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Senha incorreta" });
      }
      const accessToken = JWTServices.sign({
        user_id: user.id,
        email: user.email,
        role: user.role,
      });
      if (accessToken === "JWT_SECRET_NOT_FOUND") {
        return res.status(500).json({ message: "Erro ao gerar token" });
      }

      res.cookie("tokens", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "none",
      });

      const userReponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }; 

      return res.status(200).json({ accessToken, userReponse });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("tokens", {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now()),
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout" });
  }

  async me (req: Request, res: Response) {
    
    const { user_id } = ParserService(req.cookies);
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
        select: {
          email: true,
          role: true,
          id: true,
          name: true,
        }
      });
      res.status(200).json({ user });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }



}

export default new ControllerAuth();

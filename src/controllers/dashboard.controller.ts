import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";

const prisma = new PrismaClient();

class Dashboard {
  async getUserByYear(req: Request, res: Response) {
    try {
      const users = await prisma.user.groupBy({
        by: ["degree"],
        _count: {
          degree: true,
        },
      });

      var mappedDegrees = [
        {
          degree: "1º Ano",
          count: 0,
        },
        {
          degree: "2º Ano",
          count: 0,
        },
        {
          degree: "3º Ano",
          count: 0,
        },
        {
          degree: "4º Ano",
          count: 0,
        },
        {
          degree: "5º Ano",
          count: 0,
        },
      ];

      var mappedUsers = users.map((user) => {
        return {
          degree: user.degree,
          count: user._count.degree,
        };
      });

      mappedDegrees.forEach((degree) => {
        mappedUsers.forEach((user) => {
          if (degree.degree === user.degree) {
            degree.count = user.count;
          }
        });

      });
      
      

      const total = mappedDegrees.reduce((acc, curr) => {
        return acc + curr.count;
      }, 0);

      mappedDegrees = mappedDegrees.map((user) => {
        return {
          degree: user.degree,
          count: user.count,
          percentage: (user.count / total) * 100,
        };
      });

      return res.status(200).json(mappedDegrees);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getContentCount(req: Request, res: Response) {
    try {
      const content = await prisma.content.count();
      return res.status(200).json({ content });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getPostCount(req: Request, res: Response) {
    try {
      const post = await prisma.post.count();
      return res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getCoursesCount(req: Request, res: Response) {
    try {
      const category = await prisma.category.count();
      return res.status(200).json({ category });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getSubCoursesCount(req: Request, res: Response) {
    try {
      const subCategory = await prisma.subCategory.count();
      return res.status(200).json({ subCategory });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default Dashboard;

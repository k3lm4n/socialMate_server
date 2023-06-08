import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class CategoryController {
  // async create(req: Request, res: Response) {
  //   try {
  //     const { name } = req.body;
  //     const category = await prisma.category.create({
  //       data: {
  //         name,
  //       },
  //     });
  //     res.status(200).json({ category });
  //   } catch (error: any) {
  //     console.log(error);
  //     return res.status(500).json({ message: error.message || "Erro" });
  //   }
  // }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      res.status(200).json({ category });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await prisma.category.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ category });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json({ categories });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { name } = req.query;
      const categories = await prisma.category.findMany({
        where: {
          name: {
            contains: String(name),
          },
        },
      });
      res.status(200).json({ categories });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}


export default CategoryController;
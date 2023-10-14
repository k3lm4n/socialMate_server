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
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          subCategories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      const mappedCategories = categories.map((category) => {
        return {
          value: category.id,
          label: category.name,
          options: category.subCategories.map((subCategory) => {
            return {
              value: subCategory.id,
              label: subCategory.name,
            };
          }),
        };
      });

      const courses = categories.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      });

      res.status(200).json({ mappedCategories, courses });
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

  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          sigle: true,
          _count: {
            select: {
              user: true,
            },
          },
        },
      });

      const mappedCourse = courses.map((course) => {
        return {
          id: course.id,
          name: course.name,
          sigle: course.sigle,
          users: course._count.user,
        };
      });

      return res.status(200).json(mappedCourse);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message || "Erro" });
    }
  }

  async geyCategoryCount(req: Request, res: Response) {
    try{
      const count = await prisma.category.findMany({
        
      })

    }catch(err:any){
      console.log(err)
      return res.status(500).json({ message: err.message || "Erro" });
    }
  }


  async getAllInterests(req: Request, res: Response) {
    try {
      const interests = await prisma.subCategory.findMany({
        select: {
          id: true,
          name: true,
          sigle: true,
          category: {
            select: {
              sigle: true,
            },
          },
          _count: {
            select: {
              user: true,
            },
          },
        },
      });

      const mappedInterests = interests.map((interest) => {
        return {
          id: interest.id,
          name: interest.name,
          sigle: interest.sigle,
          course: interest.category.sigle,
          users: interest._count.user,
        };
      });

      return res.status(200).json(mappedInterests);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message || "Erro" });
    }
  }
}

export default CategoryController;

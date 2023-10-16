import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";
import {
  AttachmentSchema,
  DiscriminatorSchema,
  GetContentSchema,
} from "../utils/validator/attachment";

const prisma = new PrismaClient();

class AttachmentController {
  async create(req: Request, res: Response) {
    const userId = ParserService(req.cookies.tokens).user_id;
    const { description, categoryId, discriminator, attatchments } =
      AttachmentSchema.parse(req.body);

    try {
      const attatchmentsMapped =
        attatchments?.map((item) => {
          return {
            url: item.url,
            mimetype: item.mimetype,
            originalName: item.originalName,
            userId: userId,
          };
        }) ?? undefined;

      const create = await prisma.content.create({
        data: {
          description,
          userId,
          discriminator,
          categoryId: categoryId?.value,
          attatchment: attatchmentsMapped
            ? {
                createMany: {
                  data: attatchmentsMapped,
                },
              }
            : undefined,
        },
      });

      return res.status(201).json(create);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await prisma.content.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(deleted);
  }

  async getAllCoursesDataCounted(req: Request, res: Response) {
    try {
      const { discriminator } = GetContentSchema.parse(req.params);

      const courses = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      var mappedCourses = courses.map((course) => {
        return {
          id: course.id,
          name: course.name,
          count: 0,
          contents: [] as any[],
        };
      });

      const content = await prisma.content.findMany({
        where: {
          discriminator: {
            equals: discriminator,
          },
        },
        include: {
          category: {
            include: {
              category: {
                select: {
                  id: true,
                },
              },
            },
          },
          _count: {
            select: {
              attatchment: true,
            },
          },
          attatchment: {
            select: {
              id: true,
              url: true,
              mimetype: true,
              originalName: true,
              User: {
                select: {
                  id: true,
                  name: true,
                  lastname: true,
                },
              },
            },
          },
          User: true,
        },
      });

      mappedCourses = mappedCourses.map((course) => {
        content.forEach((item) => {
          if (item.category?.category.id === course.id) {
            course.count += item._count.attatchment;
            course.contents.push({
              id: item.id,
              description: item.description,
              name: item.category?.name,
              user: {
                id: item.User?.id,
                name: item.User?.name,
                lastname: item.User?.lastname,
              },
              // attatchment: item.attatchment.map((item) => {
              //   return {
              //     id: item.id,
              //     url: item.url,
              //     mimetype: item.mimetype,
              //     originalName: item.originalName,
              //   };
              // }),
              createdAt: item.createdAt,
            });
          }
        });

        return course;
      });

      return res.status(200).json(mappedCourses);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getByDiscriminator(req: Request, res: Response) {
    try {
      const { discriminator, category } = GetContentSchema.parse(req.params);

      const content = await prisma.content.findMany({
        where: {
          discriminator,
          category: {
            category: {
              subCategories: {
                every: {
                  categoryIDs: {
                    equals: category,
                  },
                },
              },
            },
          },
        },
        include: {
          attatchment: true,
          User: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
        },
      });

      return res.status(200).json(content);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { contentId } = GetContentSchema.parse(req.params);
      const content = await prisma.content.findUnique({
        where: {
          id: contentId,
        },
        include: {
          attatchment: true,
          User: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      const contentTreated = {
        id: content!.id,
        name: content!.category!.name,
        description: content!.description,
        attatchments: content!.attatchment.map((item) => {
          return {
            id: item.id,
            url: item.url,
            mimetype: item.mimetype,
            originalName: item.originalName,
          };
        }),
        author: content!.User?.name + " " + content!.User?.lastname,
        createdAt: content!.createdAt,
        updatedAt: content!.updatedAt,
      };

      return res.status(200).json(contentTreated);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default AttachmentController;

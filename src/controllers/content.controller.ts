import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";
import {
  AttachmentSchema,
  DiscriminatorSchema,
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

  async getByDiscriminator(req: Request, res: Response) {
    const { discriminator, category } = DiscriminatorSchema.parse(req.params);

    const content = await prisma.content.findMany({
      where: {
        discriminator,
        categoryId: category?.value,
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
  }
}

export default AttachmentController;

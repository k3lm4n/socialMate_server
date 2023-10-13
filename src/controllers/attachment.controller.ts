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
    const { url, mimetype, originalName, categoryId, discriminator } =
      AttachmentSchema.parse(req.body);

    const create = await prisma.attatchment.create({
      data: {
        url,
        mimetype,
        originalName,
        userId,
        discriminator,
        categoryId,
      },
    });

    return res.status(201).json(create);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await prisma.attatchment.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(deleted);
  }

  async getByDiscriminator(req: Request, res: Response) {
    const { discriminator } = DiscriminatorSchema.parse(req.params);

    const attachments = await prisma.attatchment.findMany({
      where: {
        discriminator,
      },
    });

    return res.status(200).json(attachments);
  }



}

export default AttachmentController;

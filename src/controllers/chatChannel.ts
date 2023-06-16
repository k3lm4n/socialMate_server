import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { chatChannel } from "../utils/validator/chatChannel";
import { ParserService } from "../utils/ParserService";

const prisma = new PrismaClient();

dotenv.config();

class GroupController {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        description,
        subcategories,
        category,
        members,
        avatar,
        private: privacy,
      } = chatChannel.parse(req.body.data);
      const creatorId = ParserService(req.cookies.tokens).user_id;

      const userId =
        members?.map((item) => {
          return {
            id: item.value,
          };
        }) ?? undefined;

      const subcategoriesId =
        subcategories?.map((item) => {
          return {
            id: item.value,
          };
        }) ?? undefined;

      const Channel = await prisma.chatChannel.create({
        data: {
          name,
          description: description || "Principal",
          category: {
            connect: {
              id: category,
            },
          },
          subcategories: {
            connect: subcategoriesId,
          },
          members: {
            connect: userId,
          },
          avatar,
          private: privacy,
          chat: {
            create: {
              name: "Principal",
            },
          },
          creator: {
            connect: {
              id: creatorId,
            },
          },
        },
      });

      res.status(201).json({ message: "Grupo criado com sucesso", Channel });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getCreateOptions(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      const userOptions = users.map((user) => {
        return {
          value: user.id,
          label: user.name + " " + user.lastname,
        };
      });

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

      res.status(200).json({ users: userOptions, mappedCategories, courses });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getChannels(req: Request, res: Response) {
    try {
      const { user_id } = ParserService(req.cookies.tokens);

      const channels = await prisma.chatChannel.findMany({
        where: {
          members: {
            some: {
              id: user_id,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });

      res.status(200).json({ channels });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, subcategories, category, members, avatar } =
      req.body;
    const chatChannel = await prisma.chatChannel.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    res.status(200).json({ chatChannel });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const chatChannel = await prisma.chatChannel.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ chatChannel });
  }

  async index(req: Request, res: Response) {
    try {
      const chatChannel = await prisma.chatChannel.findMany({
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      });
      res.status(200).json({ chatChannel });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chatChannel = await prisma.chatChannel.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          avatar: true,

          members: {
            select: {
              id: true,
              name: true,
              lastname: true,
              avatar: true,
            },
          },
          creator: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
        },
      });
      res.status(200).json(chatChannel);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async join(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const chatChannel = await prisma.chatChannel.update({
        where: {
          id,
        },
        data: {
          members: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.status(200).json({ chatChannel });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default GroupController;

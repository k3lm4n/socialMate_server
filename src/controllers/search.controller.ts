import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class SearchController {
  async search(req: Request, res: Response) {
    try {
      const { query } = req.query || "";

      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: String(query),
                mode: "insensitive",
              },
            },
            {
              lastname: {
                contains: String(query),
                mode: "insensitive",
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          lastname: true,
          degree: true,
          course: {
            select: {
              sigle: true,
            },
          },
          login: {
            select: {
              username: true,
            },
          },
        },
      });

      const mappedUsers = users.map((user) => {
        return {
          id: user.id,
          name: user.name + " " + user.lastname,
          degree: user.degree,
          course: user.course?.sigle,
          username: user.login?.username,
        };
      });

      const channels = await prisma.chatChannel.findMany({
        where: {
          OR: [
            {
              name: {
                contains: String(query),
                mode: "insensitive",
              },
            },
            {
              subcategories: {
                some: {
                  name: {
                    contains: String(query),
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              category: {
                name: {
                  contains: String(query),
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      const mappedChannels = channels.map((channel) => {
        return {
          id: channel.id,
          name: channel.name,
          category: channel.category?.name,
        };
      });

      const response = [ ...mappedUsers, ...mappedChannels ];

      return res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }
}

export default new SearchController();

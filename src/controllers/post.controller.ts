import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ParserService } from "../utils/ParserService";
import { postSchema, updatePostSchema } from "../utils/validator/post";

const prisma = new PrismaClient();

class PostContrller {
  async create(req: Request, res: Response) {
    try {
      const { title, content, category, attatchments } = postSchema.parse(
        req.body
      );
      const user_id = ParserService(req.cookies.tokens).user_id;
      const categories =
        category?.map((item) => {
          return {
            id: item.value,
          };
        }) ?? undefined;

      const attatchmentsMapped =
        attatchments?.map((item) => {
          return {
            url: item.url,
            mimetype: item.mimetype,
            originalName: item.originalName,
            userId: user_id,
          };
        }) ?? undefined;

      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user_id,
          subCategory: {
            connect: categories,
          },
          attatchments: attatchmentsMapped
            ? {
                createMany: {
                  data: attatchmentsMapped,
                },
              }
            : undefined,
        },
      });
      res.status(201).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, content, category } = updatePostSchema.parse(req.body);

      const { user_id } = ParserService(req.cookies);

      const categories =
        category?.map((item) => {
          return {
            id: item.value,
          };
        }) ?? undefined;

      const post = await prisma.post.update({
        where: {
          id,
        },
        data: {
          title,
          content,
          authorId: user_id,
          subCategory: {
            connect: categories,
          },
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.delete({
        where: {
          id,
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json({ post });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({
        include: {
          categories: true,
        },
      });
      res.status(200).json({ posts });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ message: error.message || "Erro" });
    }
  }

  async getPostByinterests(req: Request, res: Response) {
    try {
      const id = ParserService(req.cookies.tokens).user_id;
      const getInterests = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          interest: {
            select: {
              postIDs: true,
            },
          },
          course: {
            select: {
              postIDs: true,
            },
          },
          posts: {
            select: {
              id: true,
            },
          },
        },
      });

      let posts: string[] = [];

      if (getInterests?.course && getInterests.interest) {
        const interests = getInterests.interest.map(({ postIDs }) =>
          postIDs.flat()
        );

        const posteds = getInterests.posts.map((item) => item.id);

        const courses = getInterests.course.postIDs.map((value) => value);

        posts.push(...interests.flat(), ...posteds.flat(), ...courses);
      }

      const postAttached = await prisma.post.findMany({
        where: {
          id: {
            in: posts,
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          published: true,
          private: true,
          attatchments: true,
          categories: {
            select: {
              id: true,
              name: true,
              sigle: true,
            },
          },
          subCategory: {
            select: {
              id: true,
              name: true,
              sigle: true,
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              lastname: true,
            },
          },
          _count: {
            select: {
              Comment: true,
              likes: true,
              shared: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      const postTreated = postAttached.map((item) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
          published: item.published,
          private: item.private,
          attatchments: item.attatchments.map((item) => {
            return {
              id: item.id,
              url: item.url,
              mimetype: item.mimetype,
              originalName: item.originalName,
            };
          }),
          categories: item.categories.map((item) => {
            return {
              id: item.id,
              name: item.name,
              sigle: item.sigle,
            };
          }),
          subCategory: item.subCategory.map((item) => {
            return {
              id: item.id,
              name: item.name,
              sigle: item.sigle,
            };
          }),
          likes: item._count.likes,
          comments: item._count.Comment,
          shared: item._count.shared,
          author: item.author?.name + " " + item.author?.lastname,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });

      return res.send(postTreated);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err.message || "Erro" });
    }
  }
}

export default new PostContrller();

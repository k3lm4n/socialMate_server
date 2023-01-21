import { Router } from "express";
("express");
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const routes = Router();
const prisma = new PrismaClient();

dotenv.config();

routes.route("/").get(async (req, res) => {
  const categories = await prisma.category.findMany();
  console.log("estou");
  //   const users = await prisma.category.findMany();
    res.status(200).json({categories});
});

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
});

export default routes;

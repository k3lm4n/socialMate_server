import { Router } from "express";
("express");
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import CategoryController from "../controllers/category";

const routes = Router();
const prisma = new PrismaClient();
const categoryController = new CategoryController();

dotenv.config();

routes.get("/", categoryController.index);

routes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });
});

export default routes;

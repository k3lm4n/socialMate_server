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

routes.get("/courses/", categoryController.getAllCourses);
routes.get("/interests", categoryController.getAllInterests);

export default routes;

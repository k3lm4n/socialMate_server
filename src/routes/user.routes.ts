import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userController from "../controllers/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const routes = Router();


dotenv.config();

routes.get("/", userController.getAll);

routes.post("/", userController.register);

routes.get("/:id", userController.getById);

routes.delete("/:id", userController.delete);

routes.put("/:id", userController.update);

routes.get("/search", userController.search);

export default routes;

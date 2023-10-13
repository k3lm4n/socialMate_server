import { Router } from "express";
import dotenv from "dotenv";
import CategoryController from "../controllers/category";

const routes = Router();
const categoryController = new CategoryController();

dotenv.config();

routes.get("/", categoryController.index);

routes.get("/courses/", categoryController.getAllCourses);
routes.get("/interests", categoryController.getAllInterests);

export default routes;

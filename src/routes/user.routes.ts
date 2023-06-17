import { Router, Request, Response } from "express";
import userController from "../controllers/user";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const routes = Router();



routes.get("/",ensureAuthenticated, userController.getAll);

routes.post("/", userController.register);

routes.get("/:id",ensureAuthenticated, userController.getById);

routes.delete("/:id",ensureAuthenticated, userController.delete);

routes.put("/:id",ensureAuthenticated, userController.update);

routes.get("/search",ensureAuthenticated, userController.search);

export default routes;

import { Router } from "express";
import postController from "../controllers/post.controller";
const routes = Router();

routes.post("/", postController.create);
routes.get("/", postController.getAll);
routes.get("/postByInterest/", postController.getPostByinterests);
routes.get("/:id", postController.get);

export default routes;

import { Router } from "express";
import postController from "../controllers/post.controller";
const routes = Router();

routes.post("/", postController.create);
routes.get("/", postController.getAll);
routes.get("/mines/", postController.getAllMy);
routes.get("/postByInterest/", postController.getPostByinterests);
routes.get("/:id", postController.get);
routes.delete("/:id", postController.delete);
routes.put("/:id", postController.update);

export default routes;

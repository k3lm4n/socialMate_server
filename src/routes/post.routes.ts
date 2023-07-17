import { Router } from "express";
import postController from "../controllers/post.controller";
const routes = Router();

routes.post("/", postController.create);
routes.get("/postByInterest/",postController.getPostByinterests)

export default routes;

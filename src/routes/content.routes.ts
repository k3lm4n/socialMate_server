import { Router } from "express";
import ContentController from "../controllers/content.controller";

const routes = Router();
const contentController = new ContentController();

routes.post("/", contentController.create);
routes.delete("/:id", contentController.delete);
routes.get("/:discriminator", contentController.getByDiscriminator);


export default routes;
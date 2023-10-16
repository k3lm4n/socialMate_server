import { Router } from "express";
import ContentController from "../controllers/content.controller";

const routes = Router();
const contentController = new ContentController();

routes.post("/", contentController.create);
routes.delete("/:id", contentController.delete);
routes.get("/unique/:contentId", contentController.getById);
routes.get("/:discriminator/:category", contentController.getByDiscriminator);
routes.get("/:discriminator", contentController.getAllCoursesDataCounted);

export default routes;

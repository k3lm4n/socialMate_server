import { Router } from "express";
import AttachmentController from "../controllers/attachment.controller";

const routes = Router();
const attachmentController = new AttachmentController();

routes.post("/", attachmentController.create);
routes.delete("/:id", attachmentController.delete);
routes.get("/:discriminator", attachmentController.getByDiscriminator);


export default routes;
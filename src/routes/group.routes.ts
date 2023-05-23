
import GroupController from '../controllers/group';
import { Router } from "express";


const routes = Router();
const groupController = new GroupController();


routes.get("/", groupController.index);

routes.get("/:id", groupController.show);

routes.post("/", groupController.create);

routes.put("/:id", groupController.update);

routes.delete("/:id", groupController.delete);

export default routes;


import { Router } from "express";
import ChatController from "../controllers/chat"


const routes = Router();
const chatController = new ChatController();


routes.get("/", chatController.getAll);

routes.get("/byUser/", chatController.getAllByUser);

routes.get("/chatsOnChannel/:id", chatController.getAllOnChannel);

routes.delete("/:id", chatController.delete);

routes.post("/", chatController.createChat);

routes.get("/search", chatController.search);


export default routes
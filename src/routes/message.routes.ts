import { Router } from "express";
import MessageController from "../controllers/message.controller";

const messageController = new MessageController();
const messageRoutes = Router();


messageRoutes.post("/", messageController.messaging);
messageRoutes.get("/:chatId", messageController.getAll);


export default messageRoutes;
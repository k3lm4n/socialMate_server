import ChannelController from "../controllers/chatChannel";
import { Router } from "express";

const routes = Router();
const channelController = new ChannelController();

routes.get("/", channelController.index);

routes.get("/options", channelController.getCreateOptions);

routes.get("/byUser/", channelController.getChannels);

routes.get("/:id", channelController.show);

routes.post("/", channelController.create);

routes.put("/:id", channelController.update);

routes.post("/join", channelController.join);

routes.delete("/:id", channelController.delete);

export default routes;

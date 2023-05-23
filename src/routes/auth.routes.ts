import { Router } from "express";
import AuthController from "../controllers/auth";
const routes = Router();

routes.post("/", AuthController.login);

routes.get("/logout", AuthController.logout);

routes.get("/me", AuthController.me);


export default routes;

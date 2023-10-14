import { Router } from "express";
import DashboardController from "../controllers/dashboard.controller";


const routes = Router();
const dashboardController = new DashboardController();


routes.get("/degrees", dashboardController.getUserByYear);
routes.get("/content", dashboardController.getContentCount);
routes.get("/post", dashboardController.getPostCount);
routes.get("/courses", dashboardController.getCoursesCount);
routes.get("/subcourses", dashboardController.getSubCoursesCount);



export default routes;
import { Router } from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import categoryRoutes from "./category";
import commentRoutes from "./comment";

const app = Router();


  app.use("/user", userRoutes);
  app.use("/post", postRoutes);
  app.use("/category", categoryRoutes);
  app.use("/comment", commentRoutes);



export default app;

import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import groupRoutes from "./group.routes";
import categoryRoutes from "./category.routes";
import commentRoutes from "./comment.routes";
import authRoutes from "./auth.routes";

const app = Router();


  app.use("/user", userRoutes);
  app.use("/group", groupRoutes);
  app.use("/post", postRoutes);
  app.use("/category", categoryRoutes);
  app.use("/comment", commentRoutes);
  app.use("/auth", authRoutes);



  // actulaizada

export default app;

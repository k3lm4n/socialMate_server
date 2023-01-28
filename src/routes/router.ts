import { Router } from "express";
import userRoutes from "./user";
import postRoutes from "./post";
import groupRoutes from "./group";
import categoryRoutes from "./category";
import commentRoutes from "./comment";
import authRoutes from "./auth";

const app = Router();


  app.use("/user", userRoutes);
  app.use("/group", groupRoutes);
  app.use("/post", postRoutes);
  app.use("/category", categoryRoutes);
  app.use("/comment", commentRoutes);
  app.use("/auth", authRoutes);



export default app;

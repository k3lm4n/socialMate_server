import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import chatChannel from "./chatChannel.routes";
import Chat from "./chat.routes";
import categoryRoutes from "./category.routes";
import commentRoutes from "./comment.routes";
import authRoutes from "./auth.routes";
import messageRoutes from "./message.routes";
import searchController from "../controllers/search.controller";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const app = Router();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use("/chatChannel", ensureAuthenticated, chatChannel);
app.use("/chat", ensureAuthenticated, Chat);
app.use("/message", ensureAuthenticated, messageRoutes);
app.use("/post", ensureAuthenticated, postRoutes);
app.use("/category", categoryRoutes);
app.use("/comment", ensureAuthenticated, commentRoutes);
app.get("/search", searchController.search);

// actulaizada

export default app;

import { Router } from "express";
import userRoutes from "./user.routes";
import postRoutes from "./post.routes";
import chatChannel from "./chatChannel.routes";
import Chat from "./chat.routes";
import categoryRoutes from "./category.routes";
import commentRoutes from "./comment.routes";
import authRoutes from "./auth.routes";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const app = Router();

app.use("/auth", authRoutes);
app.use("/user", ensureAuthenticated, userRoutes);

app.use("/chatChannel", ensureAuthenticated, chatChannel);
app.use("/chat", ensureAuthenticated, Chat);
app.use("/post", ensureAuthenticated, postRoutes);
app.use("/category", ensureAuthenticated, categoryRoutes);
app.use("/comment", ensureAuthenticated, commentRoutes);

// actulaizada

export default app;

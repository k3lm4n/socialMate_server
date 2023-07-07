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
import fileRoutes from "./files.routes";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.use("/chatChannel", ensureAuthenticated, chatChannel);
router.use("/file", fileRoutes);
router.use("/chat", ensureAuthenticated, Chat);
router.use("/message", ensureAuthenticated, messageRoutes);
router.use("/post", ensureAuthenticated, postRoutes);
router.use("/category", categoryRoutes);
router.use("/comment", ensureAuthenticated, commentRoutes);
router.get("/search", searchController.search);

// actulaizada

export default router;

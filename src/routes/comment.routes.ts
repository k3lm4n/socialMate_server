import { Router } from "express";
import CommentController from "../controllers/comment.controller";
const router = Router();


const commentController = new CommentController();

router.post("/", commentController.create);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.delete);
router.get("/:postId", commentController.getAllCommentsByPost);




export default router;

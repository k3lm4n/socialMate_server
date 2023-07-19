import Router from "express";
import upload from "../middleware/storage";
import FileController from "../controllers/files.controller";
import { ensureAuthenticated } from "../middleware/EnsureAuthenticated";

const router = Router();
const fileController = new FileController();

router.post("/", ensureAuthenticated, upload, fileController.upload);
router.get("/", fileController.getFile);

export default router;

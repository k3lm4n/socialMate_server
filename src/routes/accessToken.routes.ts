import { Router, Request, Response } from "express";
import { generateToken } from "../controllers/controller.accessToken";

const noCache = (req: Request, res: Response, next: any) => {
  res.set("Pragma", "no-cache");
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
  res.set("Expires", "-1");

  next();
};

const router = Router();

router.get("/:channelName/:uid/", noCache, generateToken);

export default router;



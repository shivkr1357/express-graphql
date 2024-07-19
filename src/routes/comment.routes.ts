import { Router } from "express";
import postController from "../controllers/comment/post.controller";

const router = Router();

router.post("/", postController.addComment);

export default router;

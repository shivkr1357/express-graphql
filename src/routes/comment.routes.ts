import { Router } from "express";
import postController from "../controllers/comment/post.controller";
import getController from "../controllers/comment/get.controller";

const router = Router();

router.post("/create", postController.addComment);
router.get("/getAllComments", getController.getAllComments);

export default router;

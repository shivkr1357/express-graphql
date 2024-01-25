import { Router } from "express";
import getController from "../controllers/post/get.controller";
import postController from "../controllers/post/post.controller";

const router = Router();

router.get("/", getController.getAllPosts);
router.get("/:id", getController.getPostById);
router.post("/create", postController.createPost);

export default router;

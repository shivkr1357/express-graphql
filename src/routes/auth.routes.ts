import { Router } from "express";
import postController from "../controllers/auth/post.controller";

const router = Router();

// API to signup using username , password , profile pic and etc
router.post("/", postController.SignUp);

export default router;

import { Router } from "express";
import postController from "../controllers/auth/post.controller";
import verifyRefreshToken from "../utils.js/verifyRefreshToken";

const router = Router();

// API to signup using username , password , profile pic and etc
router.post("/", postController.SignIn);
router.post("/signUp", postController.SignUp);
router.post("/verifyToken", verifyRefreshToken, postController.verifyToken);
router.delete("/logout", postController.logout);

export default router;

import { Router } from "express";
import postController from "../controllers/auth/post.controller";
import getController from "../controllers/auth/update.controller";
import verifyRefreshToken from "../utils.js/verifyRefreshToken";
import isAuthenticated from "../middlewares/authenticateUser";

const router = Router();

// API to signup using username , password , profile pic and etc
/**
 * @openapi
 * /auth/:
 *  get:
 *     tags:
 *     - SignIn Operation
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post("/", postController.SignIn);
/**
 * @openapi
 * /auth/signUp:
 *  post:
 *     tags:
 *     - SignUp Operation
 *     description: SignUp using the body of user
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post("/signUp", postController.SignUp);
router.post("/verifyToken", verifyRefreshToken, postController.verifyToken);
router.delete("/logout", isAuthenticated, postController.logout);
router.patch("/updateUser/:userId", getController.updateUser);

export default router;

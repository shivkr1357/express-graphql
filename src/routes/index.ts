import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import userRoutes from "./users.route";
import isAuthenticated from "../middlewares/authenticateUser";

const router = Router();

//All the auth Routes
router.use("/auth", authRoutes);

// All the Post routes
router.use("/posts", isAuthenticated, postRoutes);

//All the user routes
router.use("/users", isAuthenticated, userRoutes);

export default router;

import { Router } from "express";
import authRoutes from "./auth.routes";
import postRoutes from "./post.routes";
import userRoutes from "./users.route";
import commentRoutes from "./comment.routes";
import eventRoutes from "./event.routes";
import isAuthenticated from "../middlewares/authenticateUser";

const router = Router();

//All the auth Routes
router.use("/auth", authRoutes);

// All the Post routes
router.use("/posts", isAuthenticated, postRoutes);

// All the Post routes
router.use("/comments", isAuthenticated, commentRoutes);

//All the user routes
router.use("/users", isAuthenticated, userRoutes);

//All events routes
router.use("/events", isAuthenticated, eventRoutes);

export default router;

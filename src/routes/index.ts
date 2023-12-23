import { Router } from "express";

const router = Router();

import authRoutes from "./auth.routes";

// auth routers
router.use("/auth", authRoutes);

export default router;

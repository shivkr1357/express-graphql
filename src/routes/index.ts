import { Router } from "express";
import authRoutes from "./auth.routes";

const router = Router();

/**
 * @openapi
 * /auth/:
 *
 *     tags:
 *     - SignIn Operation
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */

router.use("/auth", authRoutes);

export default router;

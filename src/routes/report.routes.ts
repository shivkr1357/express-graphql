import { Router } from "express";
import postController from "../controllers/reports/post.controller";
import getController from "../controllers/reports/get.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API operations for Event actions
 */

router.post("/create", postController.createReport);
router.post("/update/:id", postController.updateReport);
router.get("/getAllReports", getController.getAllReports);
router.get("/getOneReport/:id", getController.getReport);
router.get("/delete/:id", postController.deleteReport);

export default router;

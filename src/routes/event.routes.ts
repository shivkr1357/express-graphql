import { Router } from "express";
import postController from "../controllers/events/post.controller";
import getController from "../controllers/events/get.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API operations for Event actions
 */

router.post("/create", postController.createEvent);
router.post("/update/:eventId", postController.createEvent);
router.get("/getAllEvent", getController.getAllEvents);
router.get("/getOneEvent/:id", getController.getOneEvent);
router.get("/delete/:id", postController.deleteEvent);

export default router;

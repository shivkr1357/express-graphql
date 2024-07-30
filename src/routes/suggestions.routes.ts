import { Router } from "express";
import getController from "../controllers/suggestions/get.controller";
import postController from "../controllers/suggestions/post.controller";

const router = Router();

router.get("/getAllSuggestions", getController.getAllSuggestions);
router.post("/create", postController.createSuggestion);
router.patch("/update/:id", postController.updateSuggestion);
router.delete("/delete/:id", postController.deleteSuggestion);
router.get("/getOneSuggestion/:id", getController.getOneSuggestion);

export default router;

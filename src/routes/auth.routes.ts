import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Working");
});

export default router;

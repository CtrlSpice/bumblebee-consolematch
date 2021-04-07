import { Router } from "express";
import { getLatestName } from "../services/nameGenerator.js"

const router = Router();

// Home page route
router.get("/", async (req, res) => {
  const name = await getLatestName();
  res.send(name);
});

export default router;

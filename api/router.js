import { Router } from "express";
import { getLatestName, generateName } from "../services/nameGenerator.js"

const router = Router();

// Home page route
router.get("/", async (req, res) => {
  //const name = await getLatestName();
  res.sendFile("index.html");
});

router.get("/nameOfTheDay", async (req, res) => {
  const name = await getLatestName();
  res.send(name);
});

router.get("/randomName", async (req, res) => {
  const name = await generateName(false);

  res.send(name);
});

export default router;

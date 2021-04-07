import { Router } from "express";
import { getLatestName } from "../services/nameGenerator.js"
//import { subscribe } from "../services/newsletter.js";

const router = Router();

// Home page route
router.get("/", async (req, res) => {
  const name = await getLatestName();
  res.send(name);
});

// router.get("/signup", function (req, res) {
//   res.sendFile("signup.html", { root: "./client"});
// });

// // Signup post route
// router.post("/signup", async (req, res) => {
//   // Grab form data
//   const userData = {
//     firstName: req.body.fname,
//     lastName: req.body.lname,
//     email: req.body.email
//   }

//   const response = await subscribe(userData);
//   console.log(response);
//   res.send(response);
// });

export default router;

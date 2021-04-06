import express from "express";
import config from "./config/config.js";
import router from "./api/router.js";
import jobs from "./jobs/jobs.js";
import name from "./services/nameGenerator.js"

async function startServer() {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(router);

  app
    .listen(config.port, () => {
      console.log(`
    Server is doing server's best on port ${config.port}.`);
    })
    .on("error", (error) => {
      console.error(error);
      process.exit(1);
    });
}

const runnable = process.argv[2] || "server";

switch (runnable) {
  case "tweet":
    await jobs.tweet();
    break;

  case "setupDb":
    //await jobs.setupDb();
    break;

  case "server":
    await name();
    startServer();
    break;

  default:
    console.log("Stop messing with it, Daria.");
    break;
}

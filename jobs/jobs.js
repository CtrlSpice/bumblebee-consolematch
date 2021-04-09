import tweet from "../services/twitter.js";
import { generateName, getLatestName } from "../services/nameGenerator.js";
import setupDb from "../db/setup.js";

export default {
  tweet: async () => {
    const nameData = await getLatestName();
    await tweet(nameData);
  },

  update: async () => {
    await generateName(true);
  },

  setupDb: async () => {
    await setupDb();
  },
};

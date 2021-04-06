import tweet from "../services/twitter.js";
import generateName from "../services/nameGenerator.js";
//import setupDb from "../db/setup.js"
export default {
  tweet: async () => {
    const nameData = await generateName();
    await tweet(nameData);
  },

  setupDb: async () => {
    //await setupDb();
  }
};

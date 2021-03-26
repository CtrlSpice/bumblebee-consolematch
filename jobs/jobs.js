import tweet from "../services/twitter.js";
import generateName from "../services/nameGenerator.js";

export default {
  tweet: async () => {
    const nameData = await generateName();
    await tweet(nameData);
  },
};

import dotenv from "dotenv";
const envFound = dotenv.config();

// If you can't find a .env file, (┛◉Д◉)┛彡┻━┻
if (envFound.error) {
  //(☞ﾟヮﾟ)☞ ┻━┻
  throw new Error(
    `Couldn't find .env file in ${process.env.PWD} and very upset about it.`
  );
}

export default {
  /** The port on which the server is trying its best */
  port: parseInt(process.env.PORT || 3000, 10),

  // Postgres database
  db: {
    connectionString: process.env.DATABASE_URL,
  },

  // Twitter config for the wee bot
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  },

  // WordsAPI config for generating new names
  wordsAPI: {
    headers: {
      "x-rapidapi-key": process.env.WORDS_API_KEY,
      "x-rapidapi-host": process.env.WORDS_API_HOST,
    },
    baseURL: "https://wordsapiv1.p.rapidapi.com/words/",
  }
};

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

  // Twitter config for the wee bot
  twitter: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  
  // WordsAPI config for generating new names
  words: {
    apiKey: process.env.WORDS_API_KEY,
    host: process.env.WORDS_API_HOST,
  },

  // Mailchimp config for making the developer cry
  mail: {
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
    appId: process.env.MAILCHIMP_APP_ID,
  },
};

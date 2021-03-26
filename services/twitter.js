import config from "../config/config.js";
import Twitter from "twitter-lite";
const twitter = new Twitter(config.twitter);
const maxTweetLength = 280;

export default async function tweetThread(nameData) {
  const thread = buildThread(nameData);
  let lastTweetID = "";
  for (const status of thread) {
    try {
      const tweet = await twitter.post("statuses/update", {
        status: status,
        in_reply_to_status_id: lastTweetID,
        auto_populate_reply_metadata: true,
      });
      console.log(`Good bot tweeted: "${tweet.text}"`);
      lastTweetID = tweet.id_str;
    } catch (error) {
      console.log(error);
    }
  }
}

//Build a twitter thread
function buildThread(nameData) {
  const thread = [];

  //Header tweet with the full name
  let fullName = toTitleCase(
    `${nameData[0].word} ${nameData[1].word}${nameData[2].word}`
  );
  thread.push(
    `Hello bees!
Today's esteemed English actor is ${fullName}!
This household name is brought to you by the following words:
- ${nameData[0].word}
- ${nameData[1].word}
- ${nameData[2].word}
Keep reading to learn more...`
  );

  //Definition tweets
  for (const name of nameData) {
    let status = formatDefinitionTweet(name);
    thread.push(status);
  }

  //Footer tweet. Placeholder for now, but will later give link to main site.
  thread.push(`That's all for now, folks! See you tomorrow 👋`);

  return thread;
}

function formatDefinitionTweet(name) {
  //Pick a random definition of the ones available, for variety
  let defIndex = Math.floor(Math.random() * name.definitions.length);
  let status = `${toTitleCase(name.word)}: (${
    name.definitions[defIndex].partOfSpeech
  }) ${name.definitions[defIndex].definition}`;

  if (status.length > maxTweetLength) {
    status = status.substring(0, maxTweetLength - 3) + "...";
  }
  return status;
}

function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

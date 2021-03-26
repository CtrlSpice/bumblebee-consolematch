import axios from "axios";
import constants from "../config/constants.js";
import config from "../config/config.js";

//Regex and number of syllables for individual sections of the name
function Rule(pattern, syllables) {
  this.pattern = pattern;
  this.syllables = syllables;
}

// Starts with B | 3 syllables (i.e. Bickering)
const benedictRule = new Rule("%5Eb%5Ba-z%5D*%24", "3");
// Starts with C or K | ends with ER | 2 syllables (i.e. Cloister)
const cumberRule = new Rule("%5E%5Bck%5D%5Cw%2Ber%24", "2");
// ends with CH | 1 syllable (i.e. Filch)
const batchRule = new Rule("%5E%5Cw*t%3Fch%24", "1"); //Filch

//Generate the 3-part name of illustrious English actor Bachelor Cypherloch
export default async function generateName() {
  try {
    // Request words from WordsAPI according to parameters established in paths
    const [benedict, cumber, batch] = await axios.all([
      axios.request(getWordAPIOptions(benedictRule)),
      axios.request(getWordAPIOptions(cumberRule)),
      axios.request(getWordAPIOptions(batchRule)),
    ]);

    //Build each section of the name with its definitions and add to nameData
    const nameData = [
      getNameSection(benedict.data.word, benedict.data.results),
      getNameSection(cumber.data.word, cumber.data.results),
      getNameSection(batch.data.word, batch.data.results),
    ];

    return nameData;
  } catch (error) {
    //TODO: Christopher Eccleston themed error message.
    console.error(error);
  }
}

//Builds request options with the correct path for a specific word
function getWordAPIOptions(rule) {
  var options = {
    method: "GET",
    url:
      "https://wordsapiv1.p.rapidapi.com/words/?random=true&hasDetails=typeOf&letterPattern=" +
      rule.pattern +
      "&syllables=" +
      rule.syllables,
    headers: {
      "x-rapidapi-key": config.words.apiKey,
      "x-rapidapi-host": config.words.host,
    },
  };
  return options;
}

//Builds a name section from a word, its definitions, and the parts of speech associated with each definition
function getNameSection(word, results) {
  const definitions = [];
  results.forEach((result) => {
    definitions.push({
      partOfSpeech: result.partOfSpeech || constants.defaultPartOfSpeech,
      definition: result.definition || constants.defaultDefinition,
    });
  });

  return { word: word, definitions: definitions };
}

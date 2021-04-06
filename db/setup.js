import axios from "axios";
import config from "../config/config.js";
import { addWord } from "./db.js";

// Populate the database with words and their respective definitions
export default async function populateDatabase() {
    console.log("populate database");
  // For each word section (benedict = 0, cumber = 1, batch = 2)
  for (let i = 0; i < 3; i++) {
    try {
      // Grab the list of words
      const wordList = await getWordList(i);
      //for (let j = 0; j < wordList.length; j++) {
      for (let j = 0; j < 1; j++) {
        // Grab the definitions of the word
        const definitionsList = await getDefinitions(wordList[j]);

        // Don't bother saving words that don't have a definition
        if (definitionsList.length > 0) {
          const wordObject = {
            word: wordList[j],
            section: i,
            definitions: definitionsList,
          };
          await addWord(wordObject);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Gets a list of words from WordAPI depending on their section index
async function getWordList(sectionIndex) {
  let wordList = [];

  //Parameters for WordApi search
  const wordParams = [
    { letterPattern: "^b[a-z]*$", syllables: "3", limit: "2550" },
    { letterPattern: "^[ck][a-z]*er$", syllables: "2", limit: "300" },
    { letterPattern: "^[a-z]*[c|s]h$", syllables: "1", limit: "300" },
  ];

  //Options for query
  var options = {
    method: "GET",
    url: config.wordsAPI.baseURL,
    params: wordParams[sectionIndex],
    headers: config.wordsAPI.headers,
  };

  try {
    const response = await axios.request(options);
    wordList = response.data.results.data;
  } catch (error) {
    console.error(error);
  }
  return wordList;
}

//Get the list of definitions for a given word
async function getDefinitions(word) {
  let definitions = [];

  var options = {
    method: "GET",
    url: `${config.wordsAPI.baseURL}${word}`,
    headers: config.wordsAPI.headers,
  };

  try {
    const response = await axios.request(options);
    const results = response.data.results;

    // If there are results for this word...
    if (results) {
      for (const result of results) {
        definitions.push({
          partOfSpeech: result.partOfSpeech || "unknown",
          definition: result.definition,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
  return definitions;
}

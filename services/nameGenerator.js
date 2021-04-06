import {getRandomWord} from '../db/db.js'

//Generate the 3-part name of illustrious English actor Bachelor Cypherloch
export default async function generateName() {
  try {
    const nameData = [];
    for (let i = 0; i < 3; i++) {
      let randomWord = await getRandomWord(i);
      nameData.push(randomWord);
    }
    return nameData;
  } catch (error) {
    console.error(error);
  }
}


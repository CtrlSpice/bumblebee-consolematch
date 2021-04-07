import pg from "pg";
const pool = new pg.Pool();

export async function addWord(wordObject) {
  const client = await pool.connect();
  try {
    // Check is the word is already in the db
    const res = await client.query("SELECT * FROM words WHERE word = $1", [
      wordObject.word,
    ]);
    if (res.rowCount === 0) {
      await client.query("BEGIN");
      // Add word to the database and return its id
      const text =
        "INSERT INTO words(word, section) VALUES($1, $2) RETURNING id";
      const values = [wordObject.word, wordObject.section];
      const result = await client.query(text, values);

      // Check that the word was added properly
      const wordId = result.rows[0].id;
      if (wordId === null) {
        throw new Error(
          `Something went wrong while trying to add ${word} to the database.`
        );
      }

      // Add all the definitions of this word
      for (const def of definitions) {
        await addDefinition(wordId, def, client);
      }
      await client.query("COMMIT");
    } else {
      console.log(`Skipped adding word ${word}: already in the database.`);
    }
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function addDefinition(wordId, def, client = pool) {
  const text =
    "INSERT INTO definitions(word_id, part_of_speech, definition) VALUES($1, $2, $3) RETURNING id";
  const values = [wordId, def.partOfSpeech, def.definition];
  try {
    const result = await client.query(text, values);
    console.log(`Added ${result.rows[0]} to definitions`);
  } catch (error) {
    console.log(error);
  }
}

export const addModeration = async () => {
  // TODO
};

// Add an entry every time we update the actor of the day
export async function addEntry(wordId) {
  try {
    const text = "INSERT INTO entries(word_id) VALUES($1) RETURNING *";
    const res = await pool.query(text, [wordId]);
    console.log(`Added ${res.rows[0].id} to ENTRIES table.`);
  } catch (error) {
    console.log(error);
  }
}

export async function getLatestEntries() {
  try {
    const entries = [];
    const text = `SELECT DISTINCT ON (words.section) words.*, entries.time_created
    FROM words
    INNER JOIN entries ON entries.word_id = words.id
    WHERE section BETWEEN 0 AND 2
    ORDER BY section, time_created DESC`;
    const res = await pool.query(text);

    for (const row of res.rows) {
      const definitions = await getDefinitions(row.id);
      const entry = { word: row.word, definitions: definitions };
      entries.push(entry);
    }
    return entries;
  } catch (error) {
    console.log(error);
  }
}

export async function getRandomWord(section) {
  try {
    // Get a random word
    const text = `SELECT * FROM words WHERE section = ${section} ORDER BY RANDOM() LIMIT 1;`;
    const res = await pool.query(text);

    // Get all the definitions for that word
    const definitions = await getDefinitions(res.rows[0].id);
    const randomWord = { word: res.rows[0].word, definitions: definitions };

    // Log the entry
    await addEntry(res.rows[0].id);

    return randomWord;
  } catch (error) {
    console.log(error);
  }
}

async function getDefinitions(wordId) {
  try {
    const definitions = [];
    const text = `SELECT * FROM definitions WHERE word_id = ${wordId};`;
    const res = await pool.query(text);
    for (let row of res.rows) {
      definitions.push({
        partOfSpeech: row.part_of_speech,
        definition: row.definition,
      });
    }
    return definitions;
  } catch (error) {
    console.log(error);
  }
}

export async function cleanUp() {
  try {
    await pool.end();
  } catch (error) {
    console.log(error);
  }
}

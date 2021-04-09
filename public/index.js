$(document).ready(async () => {
  try {
    // Set the name of the day
    const nameOfTheDay = await $.ajax({ url: "/nameOfTheDay" });
    displayNameData(nameOfTheDay);

    $("#new-name-btn").click(async () => {
      $("#greeting").html(
        "Well done, bees! You have summonned renowned English actor"
      );
      const randomName = await $.ajax({ url: "/randomName" });

      displayNameData(randomName);
    });
  } catch (error) {
    console.error(error);
  }
});

function displayNameData(nameData) {
  // Clear the three definitions lists
  $("ol").html("");

  // Set the actor's full name
  const fullName = toTitleCase(
    `${nameData[0].word} ${nameData[1].word}${nameData[2].word}`
  );
  $("#full-name").html(fullName);

  // Set the word and definitions for each section
  for (const section in nameData) {
    const word = toTitleCase(nameData[section].word);
    $(`#section-${section}`).html(word);

    const definitions = nameData[section].definitions;
    
    // Format and append all definitions to their section's list
    for (const def of definitions) {
      $(`#definitions-${section}`).append(
        `<li>(${def.partOfSpeech}) ${def.definition}</li>`
      );
    }
  }
}

function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

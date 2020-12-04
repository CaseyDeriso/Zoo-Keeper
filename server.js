const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require("./data/animals.json");

app.listen(PORT, () => {
  console.log(`API server is now on port 8080!`);
});

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  // set filtered results equal the whole data set
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    // save traits as an array
    // if trait exists as a string, place it into a new array
    if (typeof query.personalityTraits === "string") {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    // loop through each trait in the personalityTraits array
    personalityTraitsArray.forEach((trait) => {
      filteredResults = filteredResults.filter(
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  // override the whole data set for a filter parameter (3 categories)
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const results = animalsArray.filter((animal) => animal.id === id)[0];
  return results;
}

app.get("/api/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get("/api/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

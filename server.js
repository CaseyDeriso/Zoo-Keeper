const express = require("express");
const fs = require("fs");
const path = require("path");
const { animals } = require("./data/animals.json");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoing JSON data
app.use(express.json());
// link app to routes for apis
app.use("/api", apiRoutes);
// link app to routes for html
app.use("/", htmlRoutes);
// set up path to public directory
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`API server is now on port 3001!`);
});

const express = require("express");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// -------------------------------------------------------------------------------------------------------


const search = require("./search");
const details = require("./details");

app.use("/app/search", search);
app.use("/app/details", details);

// -------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(4000, () => {
  console.log(`Server is running on http://localhost:${4000}/app/`);
  (async () => {
  })();
});

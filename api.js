const express = require("express");
const mongoose = require("mongoose");
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


mongoose
  .connect("mongodb+srv://jobMacthr:eAZFlsUVS7YO4Ngc@jobmatchr.ht4xx.mongodb.net/?retryWrites=true&w=majority&appName=JobMatchrs", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));


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

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


const getbanks = require("./getbanks");
const getstate = require("./getstate");
const getcity = require("./getcity");
const getbranch = require("./getbranch");
const getbranchdetails = require("./getbranchdetails");
const details = require("./details");

app.use("/app/getbanks", getbanks);
app.use("/app/getstates", getstate);
app.use("/app/getcity", getcity);
app.use("/app/getbranch", getbranch);
app.use("/app/getbranchdetails", getbranchdetails);
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

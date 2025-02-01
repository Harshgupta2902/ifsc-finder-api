const mongoose = require("mongoose");
const fs = require("fs");


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://jobMacthr:eAZFlsUVS7YO4Ngc@jobmatchr.ht4xx.mongodb.net/?retryWrites=true&w=majority&appName=JobMatchrs", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database!");
  } catch (error) {
    console.error("Failed to connect to Database!", error.message);
    process.exit(1);
  }
};

// Define IFSC Schema
const ifscSchema = new mongoose.Schema({
  BANK: String,
  IFSC: String,
  BRANCH: String,
  CENTRE: String,
  DISTRICT: String,
  STATE: String,
  ADDRESS: String,
  CONTACT: String,
  IMPS: Boolean,
  CITY: String,
  UPI: Boolean,
  MICR: String,
  RTGS: Boolean,
  NEFT: Boolean,
  SWIFT: String,
  ISO3166: String,
});

const IFSC = mongoose.model("ifsc", ifscSchema);

// Function to Insert Data
// const insertData = async () => {
//   try {
//     const data = JSON.parse(fs.readFileSync("ifsc-code.json", "utf-8"));
//     await IFSC.insertMany(data);
//     console.log("Data Inserted Successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error inserting data:", error.message);
//     mongoose.connection.close();
//   }
// };

const insertData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync("ifsc-code.json", "utf-8"));

    for (const record of data) {
      console.log(`📌 Inserting: ${record.IFSC} - ${record.BRANCH} (${record.BANK})`);
      await IFSC.create(record);
    }

    console.log("✅ All data inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting data:", error.message);
    mongoose.connection.close();
  }
};

// Execute Connection and Insert Data
connectDB().then(insertData);

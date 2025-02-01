
const mongoose = require("mongoose");

const ifscSchema = new mongoose.Schema({
  BANK: String,
  IFSC: { type: String, unique: true, required: true },
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

module.exports = mongoose.model("IFSC", ifscSchema);

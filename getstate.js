const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

router.get("/", async (req, res) => {
  try {
    const { bank } = req.query; // Get bank name from query

    if (!bank) {
      return res.status(400).json({ error: "SEND BANK NAME" }); // If no bank is provided
    }

    // Fetch unique states where the BANK matches the query parameter
    const states = await IFSC.aggregate([
      { $match: { BANK: { $ne: null, $nin: ["", "null"] }, BANK: { $regex: bank, $options: "i" } } }, // Match by bank name
      { $group: { _id: "$STATE" } }, // Group by unique states
      { $sort: { _id: 1 } } // Sort alphabetically by state
    ]);

    if (!states || states.length === 0) {
      return res.status(404).json({ error: "No states found for the specified bank" });
    }

    res.json({ states: states.map((s) => s._id) }); // Return list of states
  } catch (error) {
    console.error("Error fetching bank names:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

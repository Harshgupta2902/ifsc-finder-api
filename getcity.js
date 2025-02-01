const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

router.get("/", async (req, res) => {
  try {
    const { bank, state } = req.query; // Get bank name and state from query

    if (!bank || !state) {
      return res.status(400).json({ error: "SEND BOTH BANK NAME AND STATE" }); // If bank or state is not provided
    }

    // Fetch unique districts where the BANK and STATE match the query parameters
    const districts = await IFSC.aggregate([
      { 
        $match: { 
          BANK: { $ne: null, $nin: ["", "null"] }, 
          STATE: { $ne: null, $nin: ["", "null"] },
          BANK: { $regex: bank, $options: "i" }, // Match by bank name (case insensitive)
          STATE: { $regex: state, $options: "i" } // Match by state name (case insensitive)
        }
      },
      { $group: { _id: "$DISTRICT" } }, // Group by unique districts
      { $sort: { _id: 1 } } // Sort alphabetically by district name
    ]);

    if (!districts || districts.length === 0) {
      return res.status(404).json({ error: "No districts found for the specified bank and state" });
    }

    res.json({ districts: districts.map((d) => d._id) }); // Return list of districts
  } catch (error) {
    console.error("Error fetching bank names:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

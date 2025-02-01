const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

router.get("/", async (req, res) => {
  try {
    const { bank, state, district } = req.query; // Get bank, state, and district from query

    if (!bank || !state || !district) {
      return res.status(400).json({ error: "SEND BANK, STATE, AND DISTRICT" }); // If any of the parameters are missing
    }

    // Fetch unique branch names where the BANK, STATE, and DISTRICT match the query parameters
    const branches = await IFSC.aggregate([
      { 
        $match: { 
          BANK: { $ne: null, $nin: ["", "null"] }, 
          STATE: { $ne: null, $nin: ["", "null"] },
          DISTRICT: { $ne: null, $nin: ["", "null"] },
          BANK: { $regex: bank, $options: "i" }, // Match by bank name (case insensitive)
          STATE: { $regex: state, $options: "i" }, // Match by state name (case insensitive)
          DISTRICT: { $regex: district, $options: "i" } // Match by district name (case insensitive)
        }
      },
      { $group: { _id: "$BRANCH" } }, // Group by unique branch names
      { $sort: { _id: 1 } } // Sort alphabetically by branch name
    ]);

    if (!branches || branches.length === 0) {
      return res.status(404).json({ error: "No branches found for the specified bank, state, and district" });
    }

    res.json({ branches: branches.map((b) => b._id) }); 
  } catch (error) {
    console.error("Error fetching bank names:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

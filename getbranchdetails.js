const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

// 📌 GET /app/details?ifsc=ABHY0065001
router.get("/", async (req, res) => {
  try {
    const { branch } = req.query; // Get branch name from query

    if (!branch) {
      return res.status(400).json({ error: "SEND BRANCH NAME" }); // If branch is not provided
    }

    // Fetch the details for the given branch name
    const branchDetails = await IFSC.find({
      BRANCH: { $regex: branch, $options: "i" }, // Match branch name case-insensitively
    });

    if (!branchDetails || branchDetails.length === 0) {
      return res
        .status(404)
        .json({ error: "No details found for the specified branch" });
    }

    res.json({ details: branchDetails });
  } catch (error) {
    console.error("Error fetching IFSC details:", error.message);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
});

module.exports = router;

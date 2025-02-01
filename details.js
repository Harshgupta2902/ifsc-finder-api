const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

// 📌 GET /app/details?ifsc=ABHY0065001
router.get("/", async (req, res) => {
  try {
    const { ifsc } = req.query;
    if (!ifsc) {
      return res.status(400).json({ error: "IFSC code is required" });
    }

    const bankDetails = await IFSC.findOne({ IFSC: ifsc.toUpperCase() });

    if (!bankDetails) {
      return res.status(404).json({ error: "IFSC code not found" });
    }

    res.json({ status: true, result: bankDetails });
  } catch (error) {
    console.error("Error fetching IFSC details:", error.message);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
});

module.exports = router;

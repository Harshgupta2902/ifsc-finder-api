const express = require("express");
const router = express.Router();
const IFSC = require("./ifsc_model");

// router.get("/", async (req, res) => {
//   try {
//     const { ifsc, state, bank } = req.query;

//     

//     let query = {};

//     if (ifsc) {
//       query.IFSC = { $regex: `^${ifsc}`, $options: "i" };  // Case-insensitive IFSC match
//     }
//     if (state) {
//       query.STATE = { $regex: `^${state}`, $options: "i" };  // Case-insensitive State match
//     }
//     if (bank) {
//       query.BANK = { $regex: `^${bank}`, $options: "i" };  // Case-insensitive Bank Name match
//     }

//     const results = await IFSC.find(query);

//     if (results.length === 0) {
//       return res.status(404).json({ error: "No matching records found" });
//     }

//     res.json({ status:true,results });
//   } catch (error) {
//     console.error("Error in IFSC search:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });



router.get("/", async (req, res) => {
  try {
    const bankNames = await IFSC.aggregate([
      { $match: { BANK: { $ne: null, $nin: ["", "null"] } } }, 
      { $group: { _id: "$BANK" } }, 
      { $sort: { _id: 1 } }          
    ]);

    if (!bankNames || bankNames.length === 0) {
      return res.status(404).json({ error: "No banks found" });
    }

    res.json({ banks: bankNames.map((b) => b._id) }); // Extract bank names
  } catch (error) {
    console.error("Error fetching bank names:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

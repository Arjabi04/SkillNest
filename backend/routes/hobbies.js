// routes/hobbies.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/hobbies
router.post("/", async (req, res) => {
  const { userId, interests } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.interests = interests; // update interests array
    await user.save();

    res.json({ msg: "Interests updated successfully", interests: user.interests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

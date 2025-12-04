const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");
const streamifier = require("streamifier"); // ✅ move this to top

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/profile/upload
router.post("/upload", upload.single("profileImage"), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ msg: "User ID missing" });
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Find user first
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Upload to Cloudinary using stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "skillnest_profiles" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ msg: "Cloudinary upload failed", error });
        }

        // Save the URL in the user document
        user.profileImage = result.secure_url;
        await user.save();

        return res.json({ msg: "Profile image uploaded", url: result.secure_url });
      }
    );

    // Pipe the file buffer to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;

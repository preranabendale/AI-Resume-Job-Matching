const express = require("express");

const router = express.Router();

const {
  uploadResume,
  getMyResume,
} = require("../controllers/resumeController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


// =====================================================
// UPLOAD RESUME
// =====================================================

router.post(
  "/upload",
  verifyToken,
  upload.single("resume"),
  uploadResume
);


// =====================================================
// GET LOGGED-IN USER'S LATEST RESUME
// =====================================================

router.get(
  "/latest",
  verifyToken,
  getMyResume
);


module.exports = router;
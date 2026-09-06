const express = require("express");
const router = express.Router();

const {
  applyForJob,
  getMyApplications,
  getJobApplications,
} = require("../controllers/applicationController");

const {
  verifyToken,
  isSeeker,
  isRecruiter,
} = require("../middleware/authMiddleware");

// ================= SEEKER =================

// Apply for a job
router.post("/apply", verifyToken, isSeeker, applyForJob);

// Get my applications
router.get("/my", verifyToken, isSeeker, getMyApplications);


// ================= RECRUITER =================

// Get applications for a particular job
router.get(
  "/job/:jobId",
  verifyToken,
  isRecruiter,
  getJobApplications
);

module.exports = router;
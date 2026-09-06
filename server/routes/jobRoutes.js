const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJobs,
  getSingleJob,
  myJobs,
} = require("../controllers/jobController");

const {
  verifyToken,
  isRecruiter,
} = require("../middleware/authMiddleware");

// Recruiter → Create Job
router.post("/create", verifyToken, isRecruiter, createJob);

// Public → Get All Jobs
router.get("/", getAllJobs);

// Recruiter → Get My Jobs
router.get("/my/jobs", verifyToken, isRecruiter, myJobs);

// Public → Get Single Job
router.get("/:id", getSingleJob);

module.exports = router;
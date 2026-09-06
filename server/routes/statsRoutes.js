const express = require("express");

const Job = require("../models/job");
const User = require("../models/User");
const Resume = require("../models/Resume");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();
    const resumes = await Resume.countDocuments();

    res.status(200).json({
      success: true,
      jobs,
      users,
      resumes,
      accuracy: 90,
    });
  } catch (error) {
    console.error("Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: error.message,
    });
  }
});

module.exports = router;
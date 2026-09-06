const Application = require("../models/Application");

// ================= APPLY FOR JOB =================
const applyForJob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;

    if (!jobId || !resumeId) {
      return res.status(400).json({
        success: false,
        message: "Job ID and Resume ID are required",
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      seeker: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      seeker: req.user.id,
      resume: resumeId,
    });

    res.status(201).json({
      success: true,
      message: "Job Applied Successfully",
      application,
    });
  } catch (error) {
    console.log("Apply Job Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET MY APPLICATIONS =================
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      seeker: req.user.id,
    })
      .populate("job")
      .populate("resume")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalApplications: applications.length,
      applications,
    });
  } catch (error) {
    console.log("My Applications Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET JOB APPLICATIONS FOR RECRUITER =================
const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({
      job: jobId,
    })
      .populate("seeker", "fullName email")
      .populate("resume")
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalApplications: applications.length,
      applications,
    });
  } catch (error) {
    console.log("Job Applications Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplications,
};
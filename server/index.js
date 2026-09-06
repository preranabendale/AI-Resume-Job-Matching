require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoute");
const statsRoutes = require("./routes/statsRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const {
  verifyToken,
  isRecruiter,
  isSeeker,
} = require("./middleware/authMiddleware");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Resume & Job Matching Backend is Running...",
  });
});

app.get("/api/profile", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

// Recruiter Dashboard
app.get(
  "/api/recruiter/dashboard",
  verifyToken,
  isRecruiter,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Recruiter",
      user: req.user,
    });
  }
);

// Seeker Dashboard
app.get(
  "/api/seeker/dashboard",
  verifyToken,
  isSeeker,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Job Seeker",
      user: req.user,
    });
  }
);

app.use("/api/resume", resumeRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/stats", statsRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
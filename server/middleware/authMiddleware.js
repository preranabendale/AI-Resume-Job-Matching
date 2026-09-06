const jwt = require("jsonwebtoken");

// Verify JWT Token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// Recruiter Only
const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Recruiter Access Only",
    });
  }

  next();
};

// Seeker Only
const isSeeker = (req, res, next) => {
  if (req.user.role !== "seeker") {
    return res.status(403).json({
      success: false,
      message: "Seeker Access Only",
    });
  }

  next();
};

module.exports = {
  verifyToken,
  isRecruiter,
  isSeeker,
};
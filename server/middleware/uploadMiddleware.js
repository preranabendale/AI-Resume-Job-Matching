const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory
const uploadDir = path.join(__dirname, "../uploads");

// Create uploads folder if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Only PDF files
const fileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    path.extname(file.originalname).toLowerCase() === ".pdf";

  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF resume files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

module.exports = upload;
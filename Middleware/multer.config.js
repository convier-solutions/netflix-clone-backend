const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const unlinkImage = (filename) => {
  const filepath = path.join(__dirname, "..", "uploads", filename);
  fs.unlink(filepath, (error) => {
    if (error && error.code !== "ENOENT") {
      console.error("Error deleting uploaded file", error);
    }
  });
};

module.exports = { upload, unlinkImage };

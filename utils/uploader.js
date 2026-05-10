const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const uploader = (folder) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", folder));
      },

      filename: (req, file, cb) => {
        const filename = crypto.randomBytes(16).toString("hex");

        const ext = path.extname(file.originalname);

        cb(null, filename + ext);
      },
    }),

    limits: {
      fileSize: 100000000,
    },
  });
};

module.exports = uploader;
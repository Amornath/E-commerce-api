const multer = require("multer");
const path = require("path");
const { BadRequestError, NotFoundError } = require("../errors");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: any, file: any, cb: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".PNG") {
      cb(
        new Error("File type is not supported"),

        false
      );
      return;
    }
    cb(null, true);
  },
});


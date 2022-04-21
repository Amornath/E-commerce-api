export {};
const path = require("path");
const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
  // destination: function (req: any, file: any, cb: any) {
  //   cb(null, "images/");
  // },

  // filename: (req: any, file: any, cb: any) => {
  //   const fileExt = file.originalname.split(".").pop();
  //   const filename = `${new Date().getTime()}.${fileExt}`;
  //   cb(null, filename);
  // },

  destination: function (req: any, file: any, cb: any) {
    cb(null, "images/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,

  // fileFilter: function (req: any, file: any, cb: any) {
  //   if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
  //     cb(null, true);
  //   } else {
  //     cb(
  //       {
  //         message: "Unsupported File Format",
  //       },
  //       false
  //     );
  //   }
  // },
});

module.exports = upload;

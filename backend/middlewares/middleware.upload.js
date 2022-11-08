const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    file.originalname = file.originalname.replace(/ /g,"_")
    cb(null, `${req.auth.username}_${file.originalname}`);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let middlewareUpload = util.promisify(uploadFile);
module.exports = middlewareUpload;

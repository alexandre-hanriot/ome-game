const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

var upload = multer({ storage: multerStorage }).single("file");

const uploadImages = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    next();
  });
};

const resizeImages = async (req, res, next) => {
  const filename = req.file.originalname;
  console.log(filename);

  await sharp(req.file.buffer)
    .resize(300, 300)
    // .toFormat("jpeg")
    // .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../../dist/images/users/${filename}`);

  req.body.images = filename;

  next();
};

const getResult = async (req, res) => {
  return res.status(200).send(req.body.images);
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult,
};

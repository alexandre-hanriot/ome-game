const express = require("express");
const router = express.Router();
var multer = require("multer");
const sharp = require("sharp");

//Upload images d'offres
router.post("/offers", (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../../dist/images/offers`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  var upload = multer({ storage: storage }).single("file");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

//Upload images de profils
router.post("/users", async (req, res) => {
  await sharp(req.file.buffer)
    .resize(300, 300)
    .tofile(`${__dirname}/../../dist/images/users/${req.file.originalname}`);

  res.status(200).send(req.file);
});

module.exports = router;

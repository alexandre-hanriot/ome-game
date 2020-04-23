const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");

router.use(fileUpload());

// Upload Endpoint
router.post("/", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    // Upload file in "/public/images/offers/"
    file.mv(`${}../public/images/offers/${file.name}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `../public/images/offers/${file.name}` });
    });
});

module.exports = router;

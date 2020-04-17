const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// Récupération de tous les favoris avec en option filtrage et tri
router.get("/", sessionController.findAll);

module.exports = router;

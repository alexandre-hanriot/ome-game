const express = require("express");
const router = express.Router();
const searchOffersController = require("../controllers/searchOffersController");
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("serveur connecté");
});

// Authentification lors du login utilisateur
router.post("/login", authController.login);

// Authentification lors du refresh du front
router.post("/authenticate", authController.authentication);

// Récupération de toutes les offres en fonction des paramètres de recherche complétés par l'utilisateur
router.get("/search", searchOffersController.findOffersResults);

module.exports = router;

const express = require("express");
const router = express.Router();
const searchOffersController = require("../controllers/searchOffersController");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("serveur connecté");
});

// Authentification lors du login utilisateur
router.post("/login", authController.login);

// Déconnexion de l'utilisateur
router.get("/logout", authController.logout);

// Authentification lors du refresh du front
router.get("/authenticate", authController.authenticate);

// Envoi d'un mail avec lien pour mettre à jour le password oublié
router.post("/forgotpassword", authController.forgotPassword);

// Reset du password oublié
router.post("/resetpassword", authController.resetPassword);

// Récupération de toutes les offres en fonction des paramètres de recherche complétés par l'utilisateur
router.get("/search", searchOffersController.findOffersResults);

// Message provenant d'un utilisateur connecté ou non
router.post("/contact", contactController.contactRequest);

module.exports = router;

const express = require("express");
const router = express.Router();
const searchOffersController = require("../controllers/searchOffersController");
const loginController = require("../controllers/loginController");
const sessionController = require("../controllers/sessionController");

/* GET home page. */
router.get(
    "/",
    function (req, res) {
        if (req.session.page_views) {
            req.session.page_views++;
            req.session.cookie.toto = "tata";
            res.send(req.session);
        } else {
            req.session.page_views = 1;
            res.send("Welcome to this page for the first time!");
        }
    }
    // ,
    // function (req, res, next) {
    //     res.send("serveur connecté");
    // }
);

// Authentification lors du login utilisateur
router.post("/login", loginController.login);

// Récupération de toutes les offres en fonction des paramètres de recherche complétés par l'utilisateur
router.get("/search", searchOffersController.findOffersResults);

router.post("/signin", sessionController.signin);

router.post("/signout", sessionController.signout);

module.exports = router;

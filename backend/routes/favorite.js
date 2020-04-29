const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const auth = require("../middleware/auth");

// Récupération de tous les favoris avec en option filtrage et tri
router.get("/", favoriteController.findAll);

// Récupération d'un favori en fonction de son id
router.post("/:id(\\d+)", favoriteController.findOne);

// Création d'un favori
router.post("/", favoriteController.create);

// Modification d'un favori
router.put("/:userId(\\d+)", auth.isAllowed, favoriteController.update);

// Suppression de plusieurs favoris en fonction de leur id
router.delete("/", favoriteController.deleteManyByID);

// Suppression d'un favori en fonction de son id
router.delete("/:id(\\d+)", favoriteController.deleteOne);

module.exports = router;

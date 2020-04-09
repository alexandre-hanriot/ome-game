const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", favoriteController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", favoriteController.findOne);

// Création d'un utilisateur
router.post("/", favoriteController.create);

// Modification d'un utilisateur
router.put("/:id", favoriteController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", favoriteController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", favoriteController.deleteOne);

module.exports = router;

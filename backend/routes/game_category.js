const express = require("express");
const router = express.Router();
const game_categoryController = require("../controllers/game_categoryController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", game_categoryController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", game_categoryController.findOne);

// Création d'un utilisateur
router.post("/", game_categoryController.create);

// Modification d'un utilisateur
router.put("/:id", game_categoryController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", game_categoryController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", game_categoryController.deleteOne);

module.exports = router;

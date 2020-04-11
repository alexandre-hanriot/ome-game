const express = require("express");
const router = express.Router();
const game_categoryController = require("../controllers/game_categoryController");

// Récupération de toutes les catégories de jeu avec en option filtrage et tri
router.get("/", game_categoryController.findAll);

// Récupération d'une catégorie de jeu en fonction de son id
router.get("/:id(\\d+)", game_categoryController.findOne);

// Création d'une catégorie de jeu
router.post("/", game_categoryController.create);

// Modification d'une catégorie de jeu
router.put("/:id(\\d+)", game_categoryController.update);

// Suppression de plusieurs catégories de jeu en fonction de leur id
router.delete("/", game_categoryController.deleteManyByID);

// Suppression d'une catégorie de jeu en fonction de son id
router.delete("/:id(\\d+)", game_categoryController.deleteOne);

module.exports = router;

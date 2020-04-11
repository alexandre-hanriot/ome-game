const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Récupération de tous les jeux avec en option filtrage et tri
router.get("/", gameController.findAll);

// Récupération d'un jeu en fonction de son id
router.get("/:id(\\d+)", gameController.findOne);

// Création d'un jeu
router.post("/", gameController.create);

// Modification d'un jeu
router.put("/:id(\\d+)", gameController.update);

// Suppression de plusieurs jeux en fonction de leur id
router.delete("/", gameController.deleteManyByID);

// Suppression d'un jeu en fonction de son id
router.delete("/:id(\\d+)", gameController.deleteOne);

module.exports = router;

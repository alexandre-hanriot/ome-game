const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", gameController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", gameController.findOne);

// Création d'un utilisateur
router.post("/", gameController.create);

// Modification d'un utilisateur
router.put("/:id", gameController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", gameController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", gameController.deleteOne);

module.exports = router;

const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", reservationController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", reservationController.findOne);

// Création d'un utilisateur
router.post("/", reservationController.create);

// Modification d'un utilisateur
router.put("/:id", reservationController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", reservationController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", reservationController.deleteOne);

module.exports = router;

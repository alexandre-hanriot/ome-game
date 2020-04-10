const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", userController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", userController.findOne);

// Création d'un utilisateur
router.post("/", userController.create);

// Modification d'un utilisateur
router.put("/:id", userController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", userController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", userController.deleteOne);

// Récupération des offres d'un utilisateur en fonction de son id
router.get("/:id/offers", userController.findAllOffers);

// Récupération des réservations d'un utilisateur en fonction de son id
router.get("/:id/reservations", userController.findAllReservations);

module.exports = router;

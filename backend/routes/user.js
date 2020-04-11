const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", userController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id(\\d+)", userController.findOne);

// Création d'un utilisateur
router.post("/", userController.create);

// Modification d'un utilisateur
router.put("/:id(\\d+)", userController.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", userController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id(\\d+)", userController.deleteOne);

// Récupération des offres d'un utilisateur en fonction de son id
router.get("/:id(\\d+)/offers", userController.findAllOffers);

// Récupération des réservations d'un utilisateur en fonction de son id
router.get("/:id(\\d+)/reservations", userController.findAllReservations);

// Récupération des favoris d'un utilisateur en fonction de son id
router.get("/:id(\\d+)/favorites", userController.findAllFavorites);

module.exports = router;

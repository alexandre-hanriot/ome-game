const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.post("/", userController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.post("/:userId(\\d+)", userController.findOne);

// Création d'un utilisateur
router.post("/", userController.create);

// Modification d'un utilisateur
router.put("/:userId(\\d+)", userController.update);

// Modification du mot de passe d'un utilisateur
router.put("/:userId(\\d+)/password", userController.updatePassword);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", userController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:userId(\\d+)", userController.deleteOne);

// Récupération des offres d'un utilisateur en fonction de son id
router.get("/:userId(\\d+)/offers", userController.findAllOffers);

// Récupération des réservations d'un utilisateur en fonction de son id
router.get("/:userId(\\d+)/reservations", userController.findAllReservations);

// Récupération d'une réservation spécifique d'un utilisateur en fonction de son id et l'id de la réservation
router.get("/:userId(\\d+)/reservations/:offerId(\\d+)", userController.findOneReservation);

// Récupération des favoris d'un utilisateur en fonction de son id
router.get("/:userId(\\d+)/favorites", userController.findAllFavorites);

// Récupération d'un favori en fonction de l'id user et l'id de l'offre
router.get("/:userId(\\d+)/favorites/:offerId(\\d+)", userController.findOneFavorite);

module.exports = router;

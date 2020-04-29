const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", userController.findAll);

// Récupération d'un utilisateur en fonction de son id
router.post("/:userId(\\d+)", userController.findOne);

// Création d'un utilisateur
router.post("/", userController.create);

// Modification d'un utilisateur
router.put("/:userId(\\d+)", auth.isAllowed, userController.update);

// Modification du mot de passe d'un utilisateur
router.put(
  "/:userId(\\d+)/password",
  auth.isAllowed,
  userController.updatePassword
);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", userController.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:userId(\\d+)", userController.deleteOne);

// Récupération des offres d'un utilisateur en fonction de son id
router.post(
  "/:userId(\\d+)/offers",
  auth.isAllowed,
  userController.findAllOffers
);

// Récupération des réservations d'un utilisateur en fonction de son id
router.post(
  "/:userId(\\d+)/reservations",
  auth.isAllowed,
  userController.findAllReservations
);

// Récupération du nombre de réservations d'un utilisateur en fonction de son id
router.post(
  "/:userId(\\d+)/reservations/amount",
  userController.findReservationsAmount
);

// Récupération d'une réservation spécifique d'un utilisateur en fonction de son id et l'id de la réservation
router.post(
  "/:userId(\\d+)/reservations/:offerId(\\d+)",
  auth.isAllowed,
  userController.findOneReservation
);

// Récupération des favoris d'un utilisateur en fonction de son id
router.post(
  "/:userId(\\d+)/favorites",
  auth.isAllowed,
  userController.findAllFavorites
);

// Récupération d'un favori en fonction de l'id user et l'id de l'offre
router.post(
  "/:userId(\\d+)/favorites/:offerId(\\d+)",
  userController.findOneFavorite
);

module.exports = router;

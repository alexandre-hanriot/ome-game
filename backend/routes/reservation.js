const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Récupération de toutes les réservations avec en option filtrage et tri
router.get("/", reservationController.findAll);

// Récupération d'une réservation en fonction de son id
router.post("/:id(\\d+)", reservationController.findOne);

// Création d'une réservation
router.post("/", reservationController.create);

// Modification d'une réservation
router.put("/:id(\\d+)", reservationController.update);

// Suppression de plusieurs réservations en fonction de leur id
router.delete("/", reservationController.deleteManyByID);

// Suppression d'une réservation en fonction de son id
router.delete("/:id(\\d+)", reservationController.deleteOne);

module.exports = router;

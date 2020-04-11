const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

// Récupération de toutes les offres avec en option filtrage et tri
router.get("/", offerController.findAll);

// Récupération d'une offre en fonction de son id
router.get("/:id(\\d+)", offerController.findOne);

// Création d'une offre
router.post("/", offerController.create);

// Modification d'une offre
router.put("/:id(\\d+)", offerController.update);

// Suppression de plusieurs offres en fonction de leur id
router.delete("/", offerController.deleteManyByID);

// Suppression d'une offre en fonction de son id
router.delete("/:id(\\d+)", offerController.deleteOne);

// Récupération de toutes les offres en fonction des paramètres de recherche complétés par l'utilisateur
router.get("/results", offerController.findOffersResults);

module.exports = router;

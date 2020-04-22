const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const auth = require("../middleware/auth");

// Récupération de toutes les offres avec en option filtrage et tri
router.get("/", offerController.findAll);

// Récupération d'une offre en fonction de son id
router.post("/:id(\\d+)", offerController.findOne);

// Création d'une offre
router.post("/", auth.isUser, offerController.create);

// Modification d'une offre
router.put("/:id(\\d+)", auth.isAllowed, offerController.update);

// Suppression de plusieurs offres en fonction de leur id
router.delete("/", offerController.deleteManyByID);

// Suppression d'une offre en fonction de son id
router.delete("/:id(\\d+)", auth.isAllowed, offerController.deleteOne);

module.exports = router;

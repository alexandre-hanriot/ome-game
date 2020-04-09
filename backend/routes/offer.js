const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

// // Récupération de tous les utilisateurs avec en option filtrage et tri
// router.get("/", offerController.findAll);

// // Récupération d'un utilisateur en fonction de son id
// router.get("/:id", offerController.findOne);

// // Création d'un utilisateur
// router.post("/", offerController.create);

// // Modification d'un utilisateur
// router.put("/:id", offerController.update);

// // Suppression de plusieurs utilisateurs en fonction de leur id
// router.delete("/", offerController.deleteManyByID);

// // Suppression d'un utilisateur en fonction de son id
// router.delete("/:id", offerController.deleteOne);

module.exports = router;

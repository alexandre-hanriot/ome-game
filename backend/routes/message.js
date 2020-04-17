const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Récupération de tous les messages avec en option filtrage et tri
router.get("/", messageController.findAll);

// Récupération d'un message en fonction de son id
router.post("/:id(\\d+)", messageController.findOne);

// Création d'un message
router.post("/", messageController.create);

// Modification d'un message
router.put("/:id(\\d+)", messageController.update);

// Suppression de plusieurs messages en fonction de leur id
router.delete("/", messageController.deleteManyByID);

// Suppression d'un message en fonction de son id
router.delete("/:id(\\d+)", messageController.deleteOne);

module.exports = router;

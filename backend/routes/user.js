const express = require("express");
const router = express.Router();
const users = require("../controllers/user");

// Récupération de tous les utilisateurs avec en option filtrage et tri
router.get("/", users.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", users.findOne);

// Création d'un utilisateur
router.post("/", users.create);

// Modification d'un utilisateur
router.put("/:id", users.update);

// Suppression de plusieurs utilisateurs en fonction de leur id
router.delete("/", users.deleteManyByID);

// Suppression d'un utilisateur en fonction de son id
router.delete("/:id", users.deleteOne);

module.exports = router;

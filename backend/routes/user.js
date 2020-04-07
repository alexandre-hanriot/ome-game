const express = require("express");
const router = express.Router();
const users = require("../controllers/user");

// Récupération de tous les utilisateurs
router.get("/", users.findAll);

// Récupération d'un utilisateur en fonction de son id
router.get("/:id", users.findOne);

// Création d'un utilisateur
router.post("/", users.create);

// Modification d'un utilisateur
router.put("/:id", users.update);

module.exports = router;

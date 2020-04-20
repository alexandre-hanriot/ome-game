const db = require("../models/index");
const Favorite = db.favorites;
const coreController = require("./coreController");

// Récupération de tous les favoris de jeux
exports.findAll = (req, res) => {
    const defaultOrderby = "id";
    coreController.findAll(Favorite, defaultOrderby, req, res);
};

// Récupération d'un favori en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Favorite, id, req, res);
};

// Création d'un favori
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const favorite = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Favorite, favorite, res);
};

// Modification d'un favori
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Favorite, id, req, res);
};

// Suppression de plusieurs favoris en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Favorite, ids, res);
};

// Suppression d'un favori en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Favorite, id, res);
};

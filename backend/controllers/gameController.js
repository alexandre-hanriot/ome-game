const db = require("../models/index");
const Game = db.games;
const coreController = require("./coreController");

// Récupération de tous les jeux
exports.findAll = (req, res) => {
    const defaultOrderby = "name";
    coreController.findAll(Game, defaultOrderby, req, res);
};

// Récupération d'un jeu en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Game, id, res);
};

// Création d'un jeu
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const game = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Game, game, res);
};

// Modification d'un jeu
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Game, id, req, res);
};

// Suppression de plusieurs jeux en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Game, ids, res);
};

// Suppression d'un jeu en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Game, id, res);
};

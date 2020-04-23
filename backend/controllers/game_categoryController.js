const db = require("../models/index");
const Game_category = db.game_categories;
const coreController = require("./coreController");

// Récupération de toutes les catégories de jeux
exports.findAll = (req, res) => {
    const defaultOrderby = "name";
    coreController.findAll(Game_category, defaultOrderby, req, res);
};

// Récupération d'une catégorie de jeu en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Game_category, id, req, res);
};

// Création d'une catégorie de jeu
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const game_category = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Game_category, game_category, res);
};

// Modification d'une catégorie de jeu
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Game_category, id, req, res);
};

// Suppression de plusieurs catgories de jeux en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Game_category, ids, res);
};

// Suppression d'une catégorie de jeu en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Game_category, id, res);
};

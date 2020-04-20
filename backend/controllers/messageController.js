const db = require("../models/index");
const Message = db.messages;
const coreController = require("./coreController");

// Récupération de tous les favoris de jeux
exports.findAll = (req, res) => {
    const defaultOrderby = "id";
    coreController.findAll(Message, defaultOrderby, req, res);
};

// Récupération d'un message en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Message, id, req, res);
};

// Création d'un message
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const message = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Message, message, res);
};

// Modification d'un message
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Message, id, req, res);
};

// Suppression de plusieurs messages en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Message, ids, res);
};

// Suppression d'un message en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Message, id, res);
};

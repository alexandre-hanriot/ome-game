const db = require("../models/index");
const Offer = db.offers;
const coreController = require("./coreController");

// Récupération de toutes les offres
exports.findAll = (req, res) => {
    const defaultOrderby = "status";
    coreController.findAll(Offer, defaultOrderby, req, res);
};

// Récupération d'une offre en fonction de sa clé primaire
exports.findOne = (req, res) => {
    coreController.findOne(Offer, req, res);
};

// Création d'une offre
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const offer = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Offer, offer, res);
};

// Modification d'une offre
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Offer, id, req, res);
};

// Suppression de plusieurs offres en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Offer, ids, res);
};

// Suppression d'une offre en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Offer, id, res);
};

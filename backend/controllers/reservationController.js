const db = require("../models/index");
const Reservation = db.reservations;
const coreController = require("./coreController");

// Récupération de toutes les réservations
exports.findAll = (req, res) => {
    const defaultOrderby = "status";
    coreController.findAll(Reservation, defaultOrderby, req, res);
};

// Récupération d'une réservation en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Reservation, id, res);
};

// Création d'une réservation
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    const reservation = { ...req.body };

    // Sauvegarde de l'instance dans la bdd
    coreController.create(Reservation, reservation, res);
};

// Modification d'une réservation
exports.update = (req, res) => {
    const id = req.params.id;

    coreController.update(Reservation, id, req, res);
};

// Suppression de plusieurs réservations en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(Reservation, ids, res);
};

// Suppression d'une réservation en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(Reservation, id, res);
};

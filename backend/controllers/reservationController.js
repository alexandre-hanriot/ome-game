const db = require("../models/index");
const Reservation = db.reservations;
const Offer = db.offers;
const coreController = require("./coreController");

// Récupération de toutes les réservations
exports.findAll = (req, res) => {
    const defaultOrderby = "status";

    // On vérifie si orderby et sortby (asc/desc) sont définis dans l'url
    // Sinon de base on tri par le paramètre defaultOrderby croissant
    const orderBy =
        typeof req.query.orderby === "undefined" || req.query.orderby === "" ? defaultOrderby : req.query.orderby;
    const sortBy = typeof req.query.sortby === "undefined" || req.query.sortby === "" ? "ASC" : req.query.sortby;

    const order = [orderBy, sortBy];

    // On récupère les conditions de filtrage en supprimant orderby et sortby des propriétés
    let conditions = {};
    if (typeof req.query.orderby !== "undefined" && typeof req.query.sortby !== "undefined") {
        const { orderby, sortby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else if (typeof req.query.orderby !== "undefined") {
        const { orderby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else if (typeof req.query.sortby !== "undefined") {
        const { sortby, ...filteredConditions } = req.query;
        conditions = { ...filteredConditions };
    } else conditions = { ...req.query };

    // On supprime les données limit et offset des conditions
    delete conditions.limit;
    delete conditions.resultPage;

    const { limit = null, resultPage = null } = req.query; // Pour afficher uniquement X résultats de la Nième page

    const offset = resultPage > 0 ? limit * (resultPage - 1) : 0;

    // On lance la recherche avec les paramètres conditions et order (orderby + sortby)
    Reservation.findAll({
        where: conditions,
        include: Offer,
        offset,
        limit,
        order: [[order]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des réservations : ${err}`,
            });
        });
};

// Récupération d'une réservation en fonction de sa clé primaire
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findOne(Reservation, id, req, res);
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

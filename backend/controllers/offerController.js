const { Op } = require("sequelize");
const db = require("../models/index");
const Offer = db.offers;
const Game = db.games;
const Game_category = db.game_categories;
const User = db.users;
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

// Récupération des offres en fonction d'une recherche de l'utilisateur
exports.findOffersResults = (req, res) => {
    const status = "0"; // on affiche que les offres actives
    const client_id = req.query.client_id; // on récupère l'id de l'utilisateur qui fait la requête

    const is_available = typeof req.query.is_available === "undefined" ? [true, false] : [req.query.is_available]; // par défaut on affiche tous les résultats
    const type = typeof req.query.type === "undefined" ? ["0", "1"] : [req.query.type]; // prêt/location, par défaut pas de filtre
    const game_name = typeof req.query.game_name === "undefined" ? "" : req.query.game_name; // par défaut on recherche tous les jeux
    const nb_players = typeof req.query.nb_players === "undefined" ? 0 : req.query.nb_players;
    const age_min = typeof req.query.age_min === "undefined" ? 0 : req.query.age_min;
    const game_category_name = typeof req.query.game_category_name === "undefined" ? "" : req.query.game_category_name;
    const postal_code = typeof req.query.postal_code === "undefined" ? "" : req.query.postal_code;

    Offer.findAll({
        where: {
            userId: {
                [Op.ne]: client_id, // On n'affiche pas les offres que gère l'utilisateur à l'origine de la requête
            },
            status,
            is_available: {
                [Op.or]: is_available,
            },
            type: {
                [Op.or]: type,
            },
        },
        include: [
            {
                model: Game,
                where: {
                    name: {
                        [Op.substring]: game_name,
                    },
                    nb_players_min: {
                        [Op.lte]: nb_players, // On renvoie les résultats dont nb_players_min <= nb_players
                    },
                    nb_players_max: {
                        [Op.gte]: nb_players, // On renvoie les résultats dont nb_players_max >= nb_players
                    },
                    age_min: {
                        [Op.lte]: age_min,
                    },
                },
                include: {
                    model: Game_category,
                    where: {
                        name: {
                            [Op.substring]: game_category_name,
                        },
                    },
                },
            },
            {
                model: User,
                where: {
                    postal_code: {
                        [Op.substring]: postal_code, // Si postal_code = "" on ne filtre pas
                    },
                },
                attributes: ["postal_code"],
            },
        ],
        order: [["id", "ASC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des offres correspondantes à la recherche : ${err}`,
            });
        });
};

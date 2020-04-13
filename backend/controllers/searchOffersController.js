const { Op } = require("sequelize");
const db = require("../models/index");
const Offer = db.offers;
const Game = db.games;
const Game_category = db.game_categories;
const User = db.users;

// Récupération des offres en fonction d'une recherche de l'utilisateur
exports.findOffersResults = (req, res) => {
    const status = "0"; // on affiche que les offres actives
    const client_id = req.query.client_id; // on récupère l'id de l'utilisateur qui fait la requête

    const is_available = typeof req.query.is_available === "undefined" ? [true, false] : [req.query.is_available]; // par défaut on affiche tous les résultats
    const type = typeof req.query.type === "undefined" ? ["0", "1"] : [req.query.type]; // prêt/location, par défaut pas de filtre
    const game_name = typeof req.query.game_name === "undefined" ? "" : req.query.game_name; // par défaut on recherche tous les jeux
    const age_min = typeof req.query.age_min === "undefined" ? 999 : req.query.age_min;
    const game_category_name = typeof req.query.game_category_name === "undefined" ? "" : req.query.game_category_name;
    const postal_code = typeof req.query.postal_code === "undefined" ? "" : req.query.postal_code;

    const nb_players = typeof req.query.nb_players === "undefined" ? "" : req.query.nb_players;
    const nb_players_min = nb_players === "" ? 999 : nb_players;
    const nb_players_max = nb_players === "" ? 0 : nb_players;

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
                        [Op.iLike]: `%${game_name}%`, // case insensitive
                    },
                    nb_players_min: {
                        [Op.lte]: nb_players_min, // On renvoie les résultats dont nb_players_min <= nb_players
                    },
                    nb_players_max: {
                        [Op.gte]: nb_players_max, // On renvoie les résultats dont nb_players_max >= nb_players
                    },
                    age_min: {
                        [Op.lte]: age_min,
                    },
                },
                include: {
                    model: Game_category,
                    where: {
                        name: {
                            [Op.iLike]: `%${game_category_name}%`, // case insensitive
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

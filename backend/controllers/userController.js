const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.users;
const Offer = db.offers;
const Favorite = db.favorites;
const Reservation = db.reservations;
const Game = db.games;
const Game_category = db.game_categories;
const coreController = require("./coreController");
const utils = require("../utils");

// Récupération de tous les utilisateurs
exports.findAll = (req, res) => {
    const defaultOrderby = "username";
    coreController.findAll(User, defaultOrderby, req, res);
};

// Récupération d'un utilisateur en fonction de sa clé primaire
exports.findOne = (req, res) => {
    coreController.findOne(User, req, res);
};

// Création d'un utilisateur
exports.create = (req, res) => {
    // Gestion des erreurs => A COMPLETER
    // if (!req.body.email) {
    //     res.status(400).send({
    //         message: "L'email doit être renseigné",
    //     });
    //     return;
    // }

    // On lance le hashage du mot de passe avant la création d'une instance User
    bcrypt.hash(req.body.password, bcrypt.genSaltSync(8)).then((hashedPassword) => {
        // Création d'une instance avec les données renseignées et le hash du mot de passe
        const user = { ...req.body, password: hashedPassword };

        // Sauvegarde de l'instance dans la bdd
        coreController.create(User, user, res);
    });
};

// Modification d'un utilisateur
exports.update = (req, res) => {
    const id = req.params.id;

    // si oldpassword ou newpassword n'est pas défini alors sa valeur est une chaine vide
    const oldPassword = typeof req.body.oldPassword === "undefined" ? "" : req.body.oldPassword;
    const newPassword = typeof req.body.newPassword === "undefined" ? "" : req.body.newPassword;

    // si on essaie de modifier directement le champ password
    if (req.body.password) {
        res.status(500).json({
            error: "Pour modifier le mdp veuillez renseigner oldPassword et newPassword",
        });
    }

    // si les données de changement de mot de passe ne sont pas renseignées on met à jour les autres données
    else if (oldPassword.length === 0 && newPassword.length === 0) {
        coreController.update(User, id, req, res);
    }

    // si une des données de changement de mot de passe est manquante
    else if (oldPassword.length === 0 || newPassword.length === 0) {
        res.status(500).json({ error: "L'ancien ou le nouveau mot de passe est manquant" });
    }

    // si les données de changement de mot de passe sont renseignées
    else if (oldPassword.length > 0 && newPassword.length > 0) {
        // On lance la fonction qui vérifie l'ancien mot de passe et renvoie le hash du nouveau mot de passe
        utils.changePassword(User, id, oldPassword, newPassword).then((newHashedPassword) => {
            if (!newHashedPassword) {
                res.status(500).json({
                    error: "Ancien mot de passe incorrect. Echec mise à jour mot de passe",
                });
            } else {
                // On récupère le contenu du body de la requête en modifiant le mot de passe
                req.body = { ...req.body, password: newHashedPassword };

                // On fait la mise à jour
                coreController.update(User, id, req, res);
            }
        });
    }

    // si la mise à jour a échoué
    else res.status(500).json({ error: "Une erreur est survenue dans la mise à jour de l'utilisateur" });
};

// Suppression de plusieurs utilisateurs en fonction de leur id
exports.deleteManyByID = (req, res) => {
    let ids = [];

    // Si les ids sont renseignés :
    if (typeof req.query.id !== "undefined") ids = [...req.query.id];

    coreController.deleteManyByID(User, ids, res);
};

// Suppression d'un utilisateur en fonction de sa clé primaire
exports.deleteOne = (req, res) => {
    const id = req.params.id;

    coreController.deleteOne(User, id, res);
};

// Récupération des offres d'un utilisateur et tri par date de création décroissante
exports.findAllOffers = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: { id },
        include: {
            model: Offer,
            include: {
                model: Game,
                include: Game_category,
            },
        },
        order: [[Offer, "createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des offres de l'utilisateur id=${id} : ${err}`,
            });
        });
};

// Récupération des réservations d'un utilisateur et tri par date de création décroissante
exports.findAllReservations = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: { id },
        include: {
            model: Reservation,
            include: {
                model: Offer,
                include: {
                    model: Game,
                    include: Game_category,
                },
            },
        },
        order: [[Reservation, "createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des réservations de l'utilisateur id=${id} : ${err}`,
            });
        });
};

// Récupération des favoris d'un utilisateur et tri par date de création décroissante
exports.findAllFavorites = (req, res) => {
    const id = req.params.id;

    User.findOne({
        where: { id },
        include: {
            model: Favorite,
            include: {
                model: Offer,
                include: {
                    model: Game,
                    include: Game_category,
                },
            },
        },
        order: [[Favorite, "createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des favoris de l'utilisateur id=${id} : ${err}`,
            });
        });
};

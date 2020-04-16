const db = require("../models/index");
const User = db.users;
const Offer = db.offers;
const Favorite = db.favorites;
const Reservation = db.reservations;
const Game = db.games;
const Game_category = db.game_categories;
const coreController = require("./coreController");
const utils = require("../utils");

// Récupération d'un User par son ID
exports.getUserById = async (id) => {
    user = await User.findOne({
        where: { id },
    });
    return user;
};

// Récupération d'un User par son email
exports.getUserByEmail = async (email) => {
    user = await User.findOne({
        where: { email },
    });
    return user;
};

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
exports.create = async (req, res) => {
    // Gestion des erreurs
    const { email = "", username = "", password = "" } = req.body;
    const is_email = utils.validateEmail(email);

    const email_is_already_used = await User.findOne({ where: { email } }).then((data) => {
        if (data === null) return false;
        else return true;
    });

    const username_is_already_used = await User.findOne({ where: { username } }).then((data) => {
        if (data === null) return false;
        else return true;
    });

    if (email === "") res.status(400).json({ error: "Email non renseigné" });
    else if (!is_email) res.status(400).json({ error: "Format de l'email incorrect" });
    else if (password === "") res.status(400).json({ error: "Mot de passe non renseigné" });
    else if (username === "") res.status(400).json({ error: "Pseudo non renseigné" });
    else if (email_is_already_used === true) res.status(409).json({ error: "Cet email est déjà utilisé" });
    else if (username_is_already_used === true) res.status(409).json({ error: "Ce pseudo est déjà utilisé" });
    // Si pas d'erreur
    else {
        const user = { ...req.body };

        // Sauvegarde de l'instance dans la bdd
        coreController.create(User, user, res);
    }
};

// Modification d'un utilisateur (hors mot de passe)
exports.update = async (req, res) => {
    const id = req.params.id;

    // Sécurité : on supprime la data password au cas où elle ait été saisie
    delete req.body.password;

    // Gestion des erreurs
    const { email = "", username = "" } = req.body;
    const is_email = utils.validateEmail(email);

    const email_is_already_used = await User.findOne({ where: { email } }).then((data) => {
        if (data === null) return false;
        else if (data.dataValues.id.toString() === id) return false;
        else return true;
    });

    const username_is_already_used = await User.findOne({ where: { username } }).then((data) => {
        if (data === null) return false;
        else if (data.dataValues.id.toString() === id) return false;
        else return true;
    });

    if (email === "") res.status(400).json({ error: "Email non renseigné" });
    else if (!is_email) res.status(400).json({ error: "Format de l'email incorrect" });
    else if (username === "") res.status(400).json({ error: "Pseudo non renseigné" });
    else if (email_is_already_used === true) res.status(409).json({ error: "Cet email est déjà utilisé" });
    else if (username_is_already_used === true) res.status(409).json({ error: "Ce pseudo est déjà utilisé" });
    // Si pas d'erreur
    else coreController.update(User, id, req, res);
};

// Mise à jour du mot de passe
exports.updatePassword = async (req, res) => {
    const id = req.params.id;

    // Sécurité : on supprime la data password au cas où elle ait été saisie
    delete req.body.password;

    // si oldpassword ou newpassword n'est pas défini alors sa valeur est une chaine vide
    const { oldPassword = "", newPassword = "" } = req.body;

    // si une des données de changement de mot de passe est manquante
    if (oldPassword.length === 0 || newPassword.length === 0) {
        res.status(400).json({ error: "L'ancien ou le nouveau mot de passe est manquant" });
    }

    // si les données de changement de mot de passe sont renseignées
    else if (oldPassword.length > 0 && newPassword.length > 0) {
        // On recherche l'utilisateur concerné
        const user = await User.findByPk(id);
        if (user === null) res.status(404).json({ error: "Utilisateur non trouvé" });
        else {
            // On lance la fonction qui vérifie l'ancien mot de passe et renvoie le hash du nouveau mot de passe
            user.comparePassword(oldPassword).then((check) => {
                if (!check) {
                    res.status(401).json({
                        error: "Ancien mot de passe incorrect. Echec mise à jour mot de passe",
                    });
                } else {
                    // On envoie le nouveau mot de passe
                    req.body = { password: newPassword };

                    // On fait la mise à jour
                    coreController.update(User, id, req, res);
                }
            });
        }
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
    const userId = req.params.id;
    const { limit = null, resultPage = null } = req.query; // Pour afficher uniquement X résultats de la Nième page

    const offset = resultPage > 0 ? limit * (resultPage - 1) : 0;

    Offer.findAll({
        where: { userId },
        include: {
            model: Reservation,
            attributes: ["id", "status"],
        },

        attributes: ["id", "status", "is_available", "title", "createdAt"],
        offset,
        limit,
        order: [["createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des offres de l'utilisateur id=${userId} : ${err}`,
            });
        });
};

// Récupération des réservations d'un utilisateur et tri par date de création décroissante
exports.findAllReservations = (req, res) => {
    const userId = req.params.id;
    const { limit = null, resultPage = null } = req.query; // Pour afficher uniquement X résultats de la Nième page

    const offset = resultPage > 0 ? limit * (resultPage - 1) : 0;

    Reservation.findAll({
        where: { userId },
        include: {
            model: Offer,
            include: {
                model: Game,
                include: Game_category,
            },
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des réservations de l'utilisateur id=${userId} : ${err}`,
            });
        });
};

// Récupération des favoris d'un utilisateur et tri par date de création décroissante
exports.findAllFavorites = (req, res) => {
    const userId = req.params.id;
    const { limit = null, resultPage = null } = req.query; // Pour afficher uniquement X résultats de la Nième page

    const offset = resultPage > 0 ? limit * (resultPage - 1) : 0;

    Favorite.findAll({
        where: { userId },
        include: {
            model: Offer,
            include: {
                model: Game,
                include: Game_category,
            },
        },
        offset,
        limit,
        order: [["createdAt", "DESC"]],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la récupération des favoris de l'utilisateur id=${userId} : ${err}`,
            });
        });
};

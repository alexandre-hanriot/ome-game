const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.users;
const coreController = require("./coreController");
const utils = require("../utils");

// Récupération de tous les utilisateurs
// En option on peut spécifier dans l'url un ou plusieurs paramètres de filtrage et tri/classement des résultats
exports.findAll = (req, res) => {
    // On vérifie si orderby et sortby (asc/desc) sont définis dans l'url
    // Sinon de base on tri par username croissant
    const orderBy =
        typeof req.query.orderby === "undefined" || req.query.orderby === null ? "username" : req.query.orderby;
    const sortBy = typeof req.query.sortby === "undefined" || req.query.sortby === null ? "ASC" : req.query.sortby;

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

    coreController.findAll(User, conditions, order, res);
};

// Récupération d'un utilisateur en fonction de sa clé primaire en utilisant le core controller
exports.findOne = (req, res) => {
    const id = req.params.id;

    coreController.findByPk(User, id, res);
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
        User.create(user)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).json({
                    error: `Une erreur est survenue pendant la création d'un utilisateur : ${err}`,
                });
            });
    });
};

// Modification d'un utilisateur
exports.update = (req, res) => {
    const id = req.params.id;

    // si oldpassword ou newpassword n'est pas défini alors sa valeur est une chaine vide
    const oldPassword =
        typeof req.body.oldPassword === "undefined" || req.body.oldPassword === null ? "" : req.body.oldPassword;
    const newPassword =
        typeof req.body.newPassword === "undefined" || req.body.newPassword === null ? "" : req.body.newPassword;

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
        // On lance la fonction qui vérifie le mot de passe et renvoie le hash du nouveau mot de passe
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

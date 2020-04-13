const db = require("../models/index");
const User = db.users;
const utils = require("../utils");
const bcrypt = require("bcrypt");

// Vérification du couple email + paswword ou username + password pour l'opération de login
exports.login = (req, res) => {
    let identifier = typeof req.body.identifier === "undefined" ? "" : req.body.identifier.trim(); // On supprime les espaces
    const password = typeof req.body.password === "undefined" ? "" : req.body.password;

    // On vérifie si l'identifier correspond à un email
    const is_email = utils.validateEmail(identifier);
    if (is_email) identifier = identifier.toLowerCase(); // Si l'utilisateur s'authentifie par son mail on passe tout en lowercase

    if (password === "")
        res.status(500).json({
            error: "Mot de passe non renseigné",
        });
    else if (identifier === "")
        res.status(500).json({
            error: "Merci de renseigner l'email ou le username",
        });
    // Si l'identifier est un email
    else if (is_email === true) {
        User.findOne({ where: { email: identifier } }).then((data) => {
            if (data === null)
                res.status(404).json({
                    error: `L'email ${identifier} n'existe pas`,
                });
            else {
                bcrypt.compare(password, data.password).then((passwordCheck) => {
                    if (passwordCheck) res.send(data);
                    else
                        res.status(401).json({
                            error: "Mot de passe incorrect",
                        });
                });
            }
        });
    }

    // Sinon c'est que l'identifier est un username
    else {
        User.findOne({ where: { username: identifier } }).then((data) => {
            if (data === null)
                res.status(404).json({
                    error: `L'utilisateur ${identifier} n'existe pas`,
                });
            else {
                bcrypt.compare(password, data.password).then((passwordCheck) => {
                    if (passwordCheck) res.send(data);
                    else
                        res.status(401).json({
                            error: "Mot de passe incorrect",
                        });
                });
            }
        });
    }
};

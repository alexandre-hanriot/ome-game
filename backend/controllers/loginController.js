const db = require("../models/index");
const User = db.users;
const utils = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hexoid = require("hexoid");

// Vérification du couple email + paswword ou username + password pour l'opération de login
exports.login = (req, res) => {
    let identifier = typeof req.body.identifier === "undefined" ? "" : req.body.identifier.trim(); // On supprime les espaces
    const password = typeof req.body.password === "undefined" ? "" : req.body.password;

    // On vérifie si l'identifier correspond à un email
    const is_email = utils.validateEmail(identifier);
    if (is_email) identifier = identifier.toLowerCase(); // Si l'utilisateur s'authentifie par son mail on passe tout en lowercase

    if (password === "")
        res.status(400).json({
            error: "Mot de passe non renseigné",
        });
    else if (identifier === "")
        res.status(400).json({
            error: "Merci de renseigner l'email ou le username",
        });
    // Si l'identifier est un email
    else if (is_email === true) {
        User.findOne({ where: { email: identifier } }).then((user) => {
            if (user === null)
                res.status(404).json({
                    error: `L'email ${identifier} n'existe pas`,
                });
            else {
                bcrypt.compare(password, user.password).then((passwordCheck) => {
                    if (!passwordCheck)
                        res.status(401).json({
                            error: "Mot de passe incorrect",
                        });

                    const xsrfToken = hexoid(25)(); // Utilisation d'hexoid pour générer un token un UUID aléatoire
                    const JWTtoken = jwt.sign({ userId: user.id, xsrfToken: xsrfToken }, "RANDOM_TOKEN_SECRET", {
                        expiresIn: "24h",
                    });

                    console.log(xsrfToken);

                    // On charge le JWT token dans un cookie http only
                    res.cookie("access_token", JWTtoken, {
                        httpOnly: true, // pour un cookie non accessible par du code client js
                        // secure: true // true pour forcer le https
                    });

                    // On envoie la réponse avec notamment le token xsrf. En front on pourra stocker ces données soit
                    // dans le session storage (expiration à fermeture du navigateur)
                    // ou dans le local storage (persistence à fermeture du navigateur)
                    res.send({
                        user, // A modifier pour n'envoyer que certaines données
                        xsrfToken,
                    });
                });
            }
        });
    }

    // Sinon c'est que l'identifier est un username
    else {
        User.findOne({ where: { username: identifier } }).then((user) => {
            if (user === null)
                res.status(404).json({
                    error: `L'utilisateur ${identifier} n'existe pas`,
                });
            else {
                bcrypt.compare(password, user.password).then((passwordCheck) => {
                    if (!passwordCheck)
                        res.status(401).json({
                            error: "Mot de passe incorrect",
                        });

                    const xsrfToken = hexoid(25)(); // Utilisation d'hexoid pour générer un token un UUID aléatoire
                    const JWTtoken = jwt.sign({ userId: user.id, xsrfToken }, "RANDOM_TOKEN_SECRET", {
                        expiresIn: "24h",
                    });

                    console.log(xsrfToken);

                    // On charge le JWT token dans un cookie http only
                    // res.cookie("access_token", JWTtoken, {
                    //     httpOnly: true, // pour un cookie non accessible par du code client js
                    //     // secure: true // true pour forcer le https
                    // });

                    // On envoie la réponse avec notamment le token xsrf. En front on pourra stocker ces données soit
                    // dans le session storage (expiration à fermeture du navigateur)
                    // ou dans le local storage (persistence à fermeture du navigateur)
                    res.status(200).send({
                        user, // A modifier pour n'envoyer que certaines données
                        xsrfToken,
                    });
                });
            }
        });
    }
};

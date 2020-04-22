const db = require("../models/index");
const User = db.users;
const Forgot_Password = db.forgot_passwords;
const utils = require("../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hexoid = require("hexoid");
const nodemailer = require("nodemailer");

// Vérification du couple email + paswword ou username + password pour l'opération de login
exports.login = (req, res) => {
    let identifier = typeof req.body.identifier === "undefined" ? "" : req.body.identifier.trim(); // On supprime les espaces
    const password = typeof req.body.password === "undefined" ? "" : req.body.password;
    const rememberMe = typeof req.body.rememberMe === "undefined" ? false : req.body.rememberMe;

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
                    const JWTtoken = jwt.sign(
                        { userId: user.id, role: user.role, xsrfToken: xsrfToken },
                        "RANDOM_TOKEN_SECRET",
                        {
                            expiresIn: "24h",
                        }
                    );

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
                        rememberMe,
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
                    const JWTtoken = jwt.sign(
                        { userId: user.id, role: user.role, xsrfToken: xsrfToken },
                        "RANDOM_TOKEN_SECRET",
                        {
                            expiresIn: "24h",
                        }
                    );

                    // On charge le JWT token dans un cookie http only
                    res.cookie("access_token", JWTtoken, {
                        httpOnly: true, // pour un cookie non accessible par du code client js
                        // secure: true // true pour forcer le https
                        // maxAge: 360000 // expiration au bout de 360000ms
                    });

                    // On envoie la réponse avec notamment le token xsrf. En front on pourra stocker ces données soit
                    // dans le session storage (expiration à fermeture du navigateur)
                    // ou dans le local storage (persistence à fermeture du navigateur)
                    res.send({
                        user, // A modifier pour n'envoyer que certaines données
                        xsrfToken,
                        rememberMe,
                    });
                });
            }
        });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("access_token");
    res.send("Utilisateur déconnecté. Cookie supprimé");
};

exports.authenticate = (req, res) => {
    // On récupère le token xsrf issue du header de la requête (qui était stocké dans le local storage)
    const xsrfToken = req.headers["x-xsrf-token"];
    if (typeof xsrfToken === "undefined")
        res.status(401).json({
            error: "Token XSRF manquant",
        });

    // On récupère le JWT token stocké dans le cookie access_token
    const token = req.cookies.access_token;
    if (typeof token === "undefined")
        res.status(401).json({
            error: "Token JWT manquant",
        });

    // On décode le JWT token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

    // On récupère le userId qui est stocké dans le JWT token
    const userId = decodedToken.userId;

    if (typeof userId === "undefined")
        res.status(401).json({
            error: "UserId manquant",
        });

    // On récupère le xsrf token qui est stocké dans le JWT token
    const decodedXsrfToken = decodedToken.xsrfToken;
    if (typeof decodedXsrfToken === "undefined")
        res.status(401).json({
            error: "Token XSRF manquant",
        });

    // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
    if (decodedXsrfToken != xsrfToken) {
        res.status(401).json({
            error: "Erreur attaque csrf",
        });
    }

    User.findByPk(userId).then((data) => {
        if (data === null)
            res.status(404).json({
                error: "Utilisateur non trouvé",
            });
        else res.send(data);
    });
};

// Envoie un mail à l'utilisateur avec le lien pour faire un reset password
exports.forgotPassword = async (req, res) => {
    // On stocke l'email de l'utilisateur
    email = req.body.email;

    // On recherche si le mail correspond à un compte existant
    const user = await User.findOne({ where: { email } }).then((user) => {
        if (user === null)
            return res.status(404).json({
                error: "Utilisateur non trouvé",
            });
        return user;
    });

    // Utilisation d'hexoid pour générer un token un UUID aléatoire
    const token = hexoid(25)();

    // On crée une instance de forgot password
    const forgotPassword = await Forgot_Password.create({
        userId: user.id,
        token,
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la création de l'instance de ${model.getTableName()} : ${err}`,
            });
        });

    // On paramètre le service d'envoi
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "omegameatlantis@gmail.com",
            pass: "oclockatlantis",
        },
    });

    // On paramètre le mail
    const mailOptions = {
        from: "omegameatlantis@gmail.com", // sender address
        to: "sanchez.ste@gmail.com", // list of receivers
        subject: "Coucou", // Subject line
        html: `<p>Token = ${forgotPassword.token}</p>`, // plain text body
    };

    // On envoie
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
};

// Met à jour le mot de passe utilisateur dans le cas d'un forget password
exports.resetPassword = async (req, res) => {
    token = req.body.token;
    password = req.body.password;

    const forgotPassword = await Forgot_Password.findOne({ where: { token } })
        .then((data) => {
            if (data === null) {
                return res.status(404).json({
                    error: `Instance de forgot password non trouvée : ${err}`,
                });
            }
            return data;
        })
        .catch((err) => {
            res.status(500).json({
                error: `Une erreur est survenue pendant la mise à jour du mot de passe : ${err}`,
            });
        });

    const userId = forgotPassword.userId;

    const user = await User.findByPk(userId);

    if (user === null) return res.status(404).json({ error: `Utilisateur non trouvé` });

    user.password = password;

    await user.save(); // On sauvegarde l'instance
    res.send(user); // On renvoie l'instance à jour en réponse
};

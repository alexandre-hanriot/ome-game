const db = require("../models/index");
const User = db.users;
const jwt = require("jsonwebtoken");

// Vérifie qu'un user a bien le doit d'appeler la route (en fonction du userId ou du role)
exports.isAllowed = async (req, res, next) => {
  console.log("On est dans le middleware isAllowed");
  // On récupère le token xsrf issue du header de la requête (qui était stocké dans le local storage)
  const xsrfToken = req.headers["x-xsrf-token"];

  if (typeof xsrfToken === "undefined")
    return res.status(401).json({
      error: "Token XSRF manquant dans le header",
    });

  // On récupère le JWT token stocké dans le cookie access_token
  const token = req.cookies.access_token;

  if (typeof token === "undefined")
    return res.status(401).json({
      error: "Token JWT manquant",
    });

  // On décode le JWT token
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

  // On récupère le xsrf token qui est stocké dans le JWT token
  const decodedXsrfToken = decodedToken.xsrfToken;

  if (typeof decodedXsrfToken === "undefined")
    return res.status(401).json({
      error: "Token XSRF manquant dans le JWT",
    });

  // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
  if (decodedXsrfToken != xsrfToken) {
    return res.status(401).json({
      error: "Erreur attaque csrf",
    });
  }

  // On récupère le userId qui est stocké dans le JWT token
  const userId = decodedToken.userId;

  if (typeof userId === "undefined")
    return res.status(401).json({
      error: "UserId manquant",
    });

  // On recherche l'utilisateur dans la bdd
  user = await User.findByPk(userId).then((user) => {
    return user;
  });

  if (user === null)
    return res.status(404).json({
      error: `L'utilisateur ${userId} n'existe pas`,
    });

  // On récupère le status qui est stocké dans le JWT token
  const role = decodedToken.role;

  if (role !== "0" && role !== "1" && role !== "2")
    return res.status(401).json({
      error: "Status invalide",
    });

  // Si l'utilisateur est admin ou superadmin alors c'est ok
  if (role === "1" || role === "2") next();
  // On vérifie que le userId envoyé dans la requête correspond bien au userId présent dan le token JWT
  // Un User n'a pas le droit d'accéder aux informations d'un autre User
  if (req.body.userId !== userId)
    return res.status(401).json({
      error:
        "Requêtes non autorisée. Utilisateur ne disposant pas des droits requis",
    });

  next();
};

// Vérifie que c'est un utilisateur enregistré qui appelle la route
exports.isUser = async (req, res, next) => {
  console.log("On est dans le middleware isUser");
  // On récupère le token xsrf issue du header de la requête (qui était stocké dans le local storage)
  const xsrfToken = req.headers["x-xsrf-token"];

  if (typeof xsrfToken === "undefined")
    return res.status(401).json({
      error: "Token XSRF manquant dans le header",
    });

  // On récupère le JWT token stocké dans le cookie access_token
  const token = req.cookies.access_token;

  if (typeof token === "undefined")
    return res.status(401).json({
      error: "Token JWT manquant",
    });

  // On décode le JWT token
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

  // On récupère le xsrf token qui est stocké dans le JWT token
  const decodedXsrfToken = decodedToken.xsrfToken;

  if (typeof decodedXsrfToken === "undefined")
    return res.status(401).json({
      error: "Token XSRF manquant dans le JWT",
    });

  // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
  if (decodedXsrfToken != xsrfToken) {
    return res.status(401).json({
      error: "Erreur attaque csrf",
    });
  }

  // On récupère le userId qui est stocké dans le JWT token
  const userId = decodedToken.userId;

  if (typeof userId === "undefined")
    return res.status(401).json({
      error: "UserId manquant",
    });

  // On recherche l'utilisateur dans la bdd
  user = await User.findByPk(userId).then((user) => {
    return user;
  });

  if (user === null)
    return res.status(404).json({
      error: `L'utilisateur ${userId} n'existe pas`,
    });

  next();
};

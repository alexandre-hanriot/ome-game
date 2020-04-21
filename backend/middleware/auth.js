const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("On est dans le middleware");
    // On récupère le token xsrf issue du header de la requête (qui était stocké dans le local storage)
    const xsrfToken = req.headers["x-xsrf-token"];

    // On récupère le JWT token stocké dans le cookie access_token
    const token = typeof req.cookies.access_token === "undefined" ? null : req.cookies.access_token;

    if (token === null)
        res.status(401).json({
            error: "Token JWT manquant",
        });
    else {
        // On décode le JWT token
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

        // On récupère le userId qui est stocké dans le JWT token
        const userId = decodedToken.userId;

        // On récupère le xsrf token qui est stocké dans le JWT token
        const decodedXsrfToken = decodedToken.xsrfToken;

        // On récupère le status qui est stocké dans le JWT token
        const role = decodedToken.role;

        if (typeof xsrfToken === "undefined")
            res.status(401).json({
                error: "Token XSRF manquant",
            });
        else if (typeof token === "undefined")
            res.status(401).json({
                error: "Token JWT manquant",
            });
        else if (typeof userId === "undefined")
            res.status(401).json({
                error: "UserId manquant",
            });
        else if (typeof decodedXsrfToken === "undefined")
            res.status(401).json({
                error: "Token XSRF manquant",
            });
        // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
        else if (decodedXsrfToken != xsrfToken) {
            res.status(401).json({
                error: "Erreur attaque csrf",
            });
        } else if (role !== "0" && role !== "1" && role !== "2") {
            res.status(401).json({
                error: "Status invalide",
            });
        }

        // Si l'utilisateur est admin ou superadmin alors c'est ok
        else if (role === "1" || role === "2") next();
        // On vérifie que le userId envoyé dans la requête correspond bien au userId présent dan le token JWT
        // Un User n'a pas le droit d'accéder aux informations d'un autre User
        else if (parseInt(req.params.userId) !== userId) {
            // Attention le userId est en format string dans la requête
            res.status(401).json({
                error: "Requêtes non autorisée. Utilisateur ne disposant pas des droits requis",
            });
        } else next();
    }
};

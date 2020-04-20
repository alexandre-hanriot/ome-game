const jwt = require("jsonwebtoken");

exports.authorization = (req, res, next) => {
    try {
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

        // On récupère le status qui est stocké dans le JWT token
        const status = decodedToken.status;
        if (status === "1" || status === "2") next(); // Si l'utilisateur est admin ou superadmin alors c'est ok

        // On vérifie que le userId envoyé dans la requête correspond bien au userId présent dan le token JWT
        // Un User n'a pas le droit d'accéder aux informations d'un autre User
        if (parseInt(req.params.userId) !== userId) {
            // Attention le userId est en format string dans la requête
            res.status(401).json({
                error: "Requêtes non autorisée. Utilisateur ne disposant pas des droits requis",
            });
        } else next();
    } catch {
        res.status(401).json({
            error: "Invalid request!",
        });
    }
};

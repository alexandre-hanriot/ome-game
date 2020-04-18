const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
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
                error: "UserId invalide",
            });

        // On récupère le xsrf token qui est stocké dans le JWT token
        const decodedXsrfToken = decodedToken.xsrfToken;
        if (typeof userId === "undefined")
            res.status(401).json({
                error: "Token XSRF manquant",
            });

        // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
        if (decodedXsrfToken != xsrfToken) {
            res.status(401).json({
                error: "Erreur attaque csrf",
            });
        }
        if (req.body.userId !== userId) {
            // res.status(401).json({
            //     error: "Invalid request!",
            // });
            throw "Erreur attaque csrf";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "Invalid request!",
        });
    }
};

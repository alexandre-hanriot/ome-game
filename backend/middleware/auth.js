const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // On récupère le token xsrf issue du header de la requête (qui était stocké dans le local storage)
        const xsrfToken = req.headers["x-xsrf-token"];
        // On récupère le JWT token stocké dans le cookie access_token
        const token = req.cookies.access_token;
        // On décode le JWT token
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // On récupère le userId qui est stocké dans le JWT token
        const userId = decodedToken.userId;
        // On récupère le xsrf token qui est stocké dans le JWT token
        const decodedXsrfToken = decodedToken.xsrfToken;

        // On vérifie que les token xsrf du local storage et du cookie soient bien les mêmes
        if (decodedXsrfToken != xsrfToken) {
            throw "erreur attaque csrf";
        }
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

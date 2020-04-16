const passport = require("passport");

// Authentification avec passport.
// Utilise la stratégie "local" definie dans passport.js
// Renvoie l'instance User si l'authentification est un succès, false si c'est un échec
const authenticate = async (req, res, next) => {
    user = await new Promise((resolve, reject) => {
        passport.authenticate("local", (err, user) => {
            console.log("user dans authenticate : " + user);
            if (err) {
                return reject(err);
            }

            return resolve(user);
        })(req, res, next);
    });
    return user;
};

// Login
const login = (req, user) => {
    new Promise((resolve, reject) => {
        req.login(user, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};

// Regénération d'une session
const regenerateSession = (req) => {
    new Promise((resolve, reject) => {
        req.session.regenerate((err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};

// Sauvegarde d'une session
const saveSession = (req) => {
    new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};

// Méthode complète pour le login
exports.signin = async (req, res, next) => {
    const user = await authenticate(req, res, next);
    console.log("User dans signin : " + user);

    if (!user) {
        return res.status(401).send("401 Invalid email or password");
    }

    await login(req, user);
    const temp = req.session.passport;
    console.log("temp : " + temp);

    await regenerateSession(req);
    req.session.passport = temp;

    await saveSession(req);

    return res.send();
};

// Méthdde pour le logout
exports.signout = (req, res) => {
    req.logout();

    res.send();
};

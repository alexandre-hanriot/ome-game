const LocalStrategy = require("passport-local").Strategy;

const userController = require("../controllers/userController");

module.exports = (passport) => {
    // serializeUser détermine quelle data de l'instance User doit être stockée dans la session pour retrouver plus tard l'instance avec deserializeUser
    // le résultat de serializeUser est attaché à la session avec req.session.passport.user = {}
    // dans cet exemple : req.session.passport.user = {id: 'xxx'}
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // le premier argument correspond à la clé de l'instance User qui a été donnée avec la fonction done plus haut
    // on retrouve l'instance grâce à cette clé
    passport.deserializeUser((id, done) =>
        Promise.resolve()
            .then(async () => {
                const user = await userController.getUserById(id);

                done(null, user);
            })
            .catch(done)
    );

    passport.use(
        "local",
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                console.log("passport.config");
                const user = await userController.getUserByEmail(email);
                console.log("user dans passport config : " + user);

                if (!user || !(await user.comparePassword(password))) {
                    return done(null, null);
                }

                return done(null, user);
            }
        )
    );
};

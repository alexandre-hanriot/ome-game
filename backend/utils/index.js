const bcrypt = require("bcrypt");

// Fonction qui génère un nouveau password hashé en cas de changement de mot de passe
// retourne false en cas d'échec
async function changePassword(User, id, oldPassword, newPassword) {
    // On attend que les données de l'utilisateur soient récupérées
    const data = await User.findByPk(id);

    // On vérifie que l'ancien mot de passe correspond bien
    const passwordCheck = await bcrypt.compare(oldPassword, data.password);

    // Si correspondance alors on retourne le hash du nouveau mot de passe
    if (passwordCheck) {
        // On attend que le hash soit généré
        const newHashedPassword = await bcrypt.hash(newPassword, bcrypt.genSaltSync(8));
        return newHashedPassword;
    }
    // Sinon on retourne false
    else return false;
}
module.exports.changePassword = changePassword;

// Fonction qui vérifie si une input est bien un email et renvoie true ou false
exports.validateEmail = (email) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};

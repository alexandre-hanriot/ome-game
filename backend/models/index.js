const dbConfig = require("../bin/dbconfig");

const Sequelize = require("sequelize");

// Etablissement de la connexion
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// Test de connexion
sequelize
    .authenticate()
    .then(() => {
        console.log("Connecté à la base de données");
    })
    .catch((err) => {
        console.error("Problème lors de la connexion à la base de données", err);
    });

// Affectation des modèles à la bdd
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Chargement des modèles
db.users = require("./user")(sequelize, Sequelize);
db.offers = require("./offer")(sequelize, Sequelize);
db.reservations = require("./reservation")(sequelize, Sequelize);
db.favorites = require("./favorite")(sequelize, Sequelize);
db.games = require("./game")(sequelize, Sequelize);
db.game_categories = require("./game_category")(sequelize, Sequelize);

// Chargement des relations
// Par défaut si on supprime un élément parent la foreign key de l'enfant passe à NULL
// Par défait si on update l'id d'un parent (mauvaise idée) les foreign key des enfants sont mises à jour en cascade
// ATTENTION à ne pas oublier de créer les index dans les modèles pour les foreign keys générées automatiquement
db.users.hasMany(db.offers);
db.offers.belongsTo(db.users);

db.users.hasMany(db.reservations);
db.reservations.belongsTo(db.users);

db.users.hasMany(db.favorites);
db.favorites.belongsTo(db.users);

db.offers.hasMany(db.reservations);
db.reservations.belongsTo(db.offers);

db.offers.hasMany(db.favorites);
db.favorites.belongsTo(db.offers);

db.games.hasMany(db.offers);
db.offers.belongsTo(db.games);

db.game_categories.hasMany(db.games);
db.games.belongsTo(db.game_categories);

module.exports = db;

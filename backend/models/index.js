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
        console.error(
            "Problème lors de la connexion à la base de données",
            err
        );
    });

// Affectation des modèles à la bdd
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user")(sequelize, Sequelize);

module.exports = db;

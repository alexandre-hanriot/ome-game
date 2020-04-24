module.exports = (sequelize, Sequelize) => {
    const Favorite = sequelize.define(
        "favorites",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            notify_when_available: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
                {
                    fields: ["notify_when_available"],
                },
                // On crée les index des foreign key automatiquement générées par les associations dans models/index.js
                {
                    fields: ["offerId"],
                },
                {
                    fields: ["userId"], // ID du client
                },
            ],
        }
    );

    // Ajout des Hooks
    Favorite.beforeCreate((favorite, options) => {
        if (typeof favorite.userId === "undefined")
            return Promise.reject("Un favori doit être associé à un ID d'utilisateur (client)");
        if (typeof favorite.offerId === "undefined")
            return Promise.reject("Un favori doit être associé à un ID d'offre");
    });

    return Favorite;
};

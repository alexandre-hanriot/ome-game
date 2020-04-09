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

    return Favorite;
};

module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define(
        "offers",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                // 0 : active, 1 : inactive, 2 : supprimée
                type: Sequelize.ENUM("0", "1", "2"),
                allowNull: false,
                defaultValue: "0",
            },
            type: {
                // 0 : prêt, 1 : location
                type: Sequelize.ENUM("0", "1"),
                allowNull: false,
                defaultValue: "0",
            },
            is_available: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.FLOAT,
                defaultValue: 0,
            },
            description: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            postal_code: {
                type: Sequelize.STRING(5),
                defaultValue: null,
            },
            city: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            latitude: {
                type: Sequelize.STRING(30),
                defaultValue: null,
            },
            longitude: {
                type: Sequelize.STRING(30),
                defaultValue: null,
            },
            image: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
                {
                    fields: ["status"],
                },
                {
                    fields: ["type"],
                },
                {
                    fields: ["is_available"],
                },
                {
                    fields: ["title"],
                },
                {
                    fields: ["price"],
                },
                {
                    fields: ["description"],
                },
                {
                    fields: ["postal_code"],
                },
                {
                    fields: ["city"],
                },
                {
                    fields: ["latitude"],
                },
                {
                    fields: ["longitude"],
                },
                {
                    fields: ["image"],
                },
                // On crée les index des foreign key automatiquement générées par les associations dans models/index.js
                {
                    fields: ["userId"],
                },
                {
                    fields: ["gameId"],
                },
            ],
        }
    );

    // Ajout des Hooks
    Offer.beforeCreate((offer, options) => {
        if (typeof offer.userId === "undefined")
            return Promise.reject("Une offre doit être associée à un ID d'utilisateur (propriétaire)");
        if (typeof offer.gameId === "undefined") return Promise.reject("Une offre doit être associée à un ID de jeu");
    });

    return Offer;
};

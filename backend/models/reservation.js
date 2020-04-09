module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define(
        "reservations",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                // 0 : en attente de validation, 1 : validée, 2 : en cours
                // 3 : terminée, 4 : refusée, 5 : annulée
                type: Sequelize.ENUM("0", "1", "2", "3", "4", "5"),
                allowNull: false,
                defaultValue: "0",
            },
            finished_at: {
                type: Sequelize.DATE,
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
                    fields: ["finished_at"],
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

    return Reservation;
};

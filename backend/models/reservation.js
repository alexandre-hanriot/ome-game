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
                // 0 : en attente de validation, 1 : validée, 2 : terminée
                // 3 : refusée, 4 : annulée
                type: Sequelize.ENUM("0", "1", "2", "3", "4"),
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

    // Ajout des Hooks
    Reservation.beforeCreate((reservation, options) => {
        if (typeof reservation.userId === "undefined")
            return Promise.reject("Une réservation doit être associée à un ID d'utilisateur (client)");
        if (typeof reservation.offerId === "undefined")
            return Promise.reject("Une réservation doit être associée à un ID d'offre");
    });

    return Reservation;
};

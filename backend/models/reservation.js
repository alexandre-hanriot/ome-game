const { Op } = require("sequelize");

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

    Reservation.beforeSave(async (reservation, options) => {
        // Si la réservation passe en status validé les autres doivent passer en status refusé
        if (
            reservation.dataValues.status === "1" &&
            reservation.dataValues.status !== reservation._previousDataValues.status
        ) {
            await Reservation.update(
                {
                    status: "3", // On passe en status refusée
                },
                {
                    where: {
                        offerId: reservation.offerId, // Pour les réservations concernant la même offre
                        status: "0", // qui sont en status en attente
                        id: {
                            [Op.ne]: reservation.id, // qui ne concernent pas l'utilisateur client actuel
                        },
                    },
                }
            );
        }
    });

    return Reservation;
};

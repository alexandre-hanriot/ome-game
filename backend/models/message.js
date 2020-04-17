module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define(
        "messages",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
                {
                    fields: ["content"],
                },
                // On crée les index des foreign key automatiquement générées par les associations dans models/index.js
                // Pour les foreign key de messages il faudrait créer les index dans la table UserMessages qui est crée automatiquement avec les belongsToMany
            ],
        }
    );

    return Message;
};

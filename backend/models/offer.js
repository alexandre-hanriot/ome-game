const User = db.users;

module.exports = (sequelize, Sequelize) => {
    const Offer = sequelize.define(
        "offer",
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
            owner_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: "id",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE, // vérifie les contraintes immédiatement
                },
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
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            game_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: Game,
                    key: "id",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE, // vérifie les contraintes immédiatement
                },
            },
            description: {
                type: Sequelize.TEXT,
                defaultValue: "",
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
                    fields: ["owner_id"],
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
                    fields: ["game_id"],
                },
                {
                    fields: ["description"],
                },
            ],
        }
    );

    return Offer;
};

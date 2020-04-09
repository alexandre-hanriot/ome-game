const Category = db.categories;

module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define(
        "game",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                // 0 : en attente de validation, 1 : validée, 2 : supprimée
                type: Sequelize.ENUM("0", "1", "2"),
                allowNull: false,
                defaultValue: "0",
            },
            name: {
                type: Sequelize.STRING(100),
                unique: true,
                allowNull: false,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: Category,
                    key: "id",
                    deferrable: Deferrable.INITIALLY_IMMEDIATE, // vérifie les contraintes immédiatement
                },
            },
            nb_players_min: {
                type: Sequelize.TINYINT.UNSIGNED,
                defaultValue: null,
            },
            nb_players_max: {
                type: Sequelize.TINYINT.UNSIGNED,
                defaultValue: null,
            },
            age_min: {
                type: Sequelize.TINYINT.UNSIGNED,
                defaultValue: null,
            },
            duration: {
                type: Sequelize.STRING(25),
                defaultValue: null,
            },
            description: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            year: {
                type: Sequelize.STRING(4),
                defaultValue: null,
                validate: {
                    isNumeric: true, // On accepte que les chiffres dans la chaine de caractères
                },
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
                    fields: ["name"],
                },
                {
                    fields: ["category_id"],
                },
                {
                    fields: ["nb_players_min"],
                },
                {
                    fields: ["nb_players_max"],
                },
                {
                    fields: ["age_min"],
                },
                {
                    fields: ["duration"],
                },
                {
                    fields: ["description"],
                },
                {
                    fields: ["year"],
                },
                {
                    fields: ["image"],
                },
            ],
        }
    );

    return Game;
};

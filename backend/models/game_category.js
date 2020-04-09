module.exports = (sequelize, Sequelize) => {
    const Game_category = sequelize.define(
        "game_categories",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING(100),
                unique: true,
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
                    unique: true,
                    fields: ["name"],
                },
            ],
        }
    );

    return Game_category;
};

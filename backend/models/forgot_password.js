module.exports = (sequelize, Sequelize) => {
    const Forgot_Password = sequelize.define(
        "forgot_passwords",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING(100),
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
                    fields: ["userId"],
                },
                {
                    fields: ["token"],
                },
            ],
        }
    );

    return Forgot_Password;
};

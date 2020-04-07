module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: Sequelize.ENUM("superadmin", "admin", "user"),
            allowNull: false,
            defaultValue: "user",
        },
        email: {
            type: Sequelize.STRING, // STRING = VARCHAR(255)
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING, // A PRECISER
        },
    });

    return User;
};

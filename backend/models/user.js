module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role: {
                // 0 : user, 1 : admin, 2 : superadmin
                type: Sequelize.ENUM("0", "1", "2"),
                allowNull: false,
                defaultValue: "0",
            },
            status: {
                // 0 : actif, 1 : inactif, 2 : supprimé
                type: Sequelize.ENUM("0", "1", "2"),
                allowNull: false,
                defaultValue: "0",
            },
            email: {
                type: Sequelize.STRING,
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
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            firstname: {
                type: Sequelize.STRING(50),
            },
            lastname: {
                type: Sequelize.STRING(50),
            },
            phone: {
                type: Sequelize.STRING(15),
            },
            address: {
                type: Sequelize.STRING,
            },
            postal_code: {
                type: Sequelize.STRING(5),
            },
            city: {
                type: Sequelize.STRING,
            },
            gdpr_accepted_at: {
                type: Sequelize.DATE,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["id"],
                },
                {
                    fields: ["role"],
                },
                {
                    fields: ["status"],
                },
                {
                    unique: true,
                    fields: ["email"],
                },
                {
                    fields: ["password"],
                },
                {
                    unique: true,
                    fields: ["username"],
                },
                {
                    fields: ["firstname"],
                },
                {
                    fields: ["lastname"],
                },
                {
                    fields: ["phone"],
                },
                {
                    fields: ["address"],
                },
                {
                    fields: ["postal_code"],
                },
                {
                    fields: ["city"],
                },
                {
                    fields: ["gdpr_accepted_at"],
                },
            ],
        }
    );

    return User;
};

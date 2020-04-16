const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "users",
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
                defaultValue: null,
            },
            lastname: {
                type: Sequelize.STRING(50),
                defaultValue: null,
            },
            phone: {
                type: Sequelize.STRING(15),
                defaultValue: null,
            },
            address: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            postal_code: {
                type: Sequelize.STRING(5),
                defaultValue: null,
            },
            city: {
                type: Sequelize.STRING,
                defaultValue: null,
            },
            gdpr_accepted_at: {
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

    // Ajout des méthode d'instance
    User.prototype.comparePassword = async function (oldPassword) {
        // On vérifie que l'ancien mot de passe correspond bien
        const passwordCheck = await bcrypt.compare(oldPassword, this.password);

        // Si correspondance alors on retourne true
        if (passwordCheck) {
            return true;
        }
        // Sinon on retourne false
        else return false;
    };

    // Ajout des Hooks
    User.beforeSave(async (user, options) => {
        user.email = user.email.toLowerCase();
        // Si on créée ou met à jour le password il faut le hasher
        if (user.dataValues.password !== user._previousDataValues.password) {
            const hash = await bcrypt.hash(user.password, bcrypt.genSaltSync(8));
            user.password = hash;
        }
    });

    return User;
};

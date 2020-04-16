module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define(
        "sessions",
        {
            sid: {
                type: Sequelize.STRING,
                primaryKey: true,
            },
            expires: {
                type: Sequelize.DATE,
            },
            data: {
                type: Sequelize.STRING(50000),
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["sid"],
                },
                {
                    fields: ["expires"],
                },
                {
                    fields: ["data"],
                },
            ],
        }
    );

    return Session;
};

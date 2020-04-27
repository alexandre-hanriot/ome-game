const nodemailer = require("nodemailer");

module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define(
    "offers",
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
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.TEXT,
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
      latitude: {
        type: Sequelize.STRING(30),
        defaultValue: null,
      },
      longitude: {
        type: Sequelize.STRING(30),
        defaultValue: null,
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
          fields: ["description"],
        },
        {
          fields: ["postal_code"],
        },
        {
          fields: ["city"],
        },
        {
          fields: ["latitude"],
        },
        {
          fields: ["longitude"],
        },
        {
          fields: ["image"],
        },
        // On crée les index des foreign key automatiquement générées par les associations dans models/index.js
        {
          fields: ["userId"],
        },
        {
          fields: ["gameId"],
        },
      ],
    }
  );

  // Ajout des Hooks
  Offer.beforeCreate((offer, options) => {
    if (typeof offer.userId === "undefined")
      return Promise.reject(
        "Une offre doit être associée à un ID d'utilisateur (propriétaire)"
      );
    if (typeof offer.gameId === "undefined")
      return Promise.reject("Une offre doit être associée à un ID de jeu");
  });

  Offer.beforeSave(async (offer, options) => {
    // Si une offre est annulée par son propriétaire les réservations associées passent en statut annulé
    if (
      offer.dataValues.status === "2" &&
      offer.dataValues.status !== offer._previousDataValues.status
    ) {
      await sequelize.models.reservations.update(
        { status: "4" },
        {
          where: { offerId: offer.id },
        }
      );
    }

    // Si une offre devient disponible on envoie un mail aux utilisateurs l'ayant dans la liste des favoris
    if (
      offer.dataValues.is_available === true &&
      offer._previousDataValues.is_available === false
    ) {
      console.log("on fait le test");
      const favorites = await sequelize.models.favorites.findAll({
        where: {
          offerId: offer.id,
          notify_when_available: true,
        },
        include: sequelize.models.users,
      });

      if (favorites.length > 0) {
        // On paramètre le service d'envoi
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "omegameatlantis@gmail.com",
            pass: "oclockatlantis",
          },
        });

        for (favorite of favorites) {
          console.log(favorite.user.email); // A remplacer par envoi de mail

          // On paramètre le mail
          const mailOptions = {
            from: "omegameatlantis@gmail.com", // sender address
            // to: favorite.user.email, // list of receivers
            to: "omegameatlantis@gmail.com", // list of receivers
            subject: "Une offre que vous suivez est maintenant disponible", // Subject line
            html: `L'offre est disponible. On peut ajouter ici les caractéristiques de l'offre et le lien vers la page de l'offre`, // plain text body
          };

          // On envoie
          transporter.sendMail(mailOptions, function (err, info) {
            if (err)
              return res.status(500).json({
                error: `Une erreur est survenue : ${err}`,
              });
            return res.status(200).json({
              message: `Email envoyé. Infos : ${info}`,
            });
          });
        }
      }
    }
  });

  return Offer;
};

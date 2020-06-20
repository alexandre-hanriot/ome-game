module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define(
    'games',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        // 0 : en attente de validation, 1 : validée, 2 : supprimée
        type: Sequelize.ENUM('0', '1', '2'),
        allowNull: false,
        defaultValue: '0',
      },
      name: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      nb_players_min: {
        type: Sequelize.SMALLINT,
        defaultValue: null,
        validate: {
          min: 0, // On accepte que les entiers positifs (unsigned non pris en compte par postgres avec SMALLINT)
        },
      },
      nb_players_max: {
        type: Sequelize.SMALLINT,
        defaultValue: null,
        validate: {
          min: 0, // On accepte que les entiers positifs (unsigned non pris en compte par postgres avec SMALLINT)
        },
      },
      age_min: {
        type: Sequelize.SMALLINT,
        defaultValue: null,
        validate: {
          min: 0, // On accepte que les entiers positifs (unsigned non pris en compte par postgres avec SMALLINT)
        },
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
          fields: ['id'],
        },
        {
          fields: ['status'],
        },
        {
          unique: true,
          fields: ['name'],
        },
        {
          fields: ['nb_players_min'],
        },
        {
          fields: ['nb_players_max'],
        },
        {
          fields: ['age_min'],
        },
        {
          fields: ['duration'],
        },
        {
          fields: ['description'],
        },
        {
          fields: ['year'],
        },
        {
          fields: ['image'],
        },
        // On crée les index des foreign key automatiquement générées par les associations dans models/index.js
        {
          fields: ['gameCategoryId'],
        },
      ],
    },
  );

  // Ajout des Hooks
  Game.beforeCreate((game, options) => {
    if (typeof game.gameCategoryId === 'undefined') return Promise.reject('Un jeu doit être associé à un ID de catégorie de jeu');
  });

  return Game;
};

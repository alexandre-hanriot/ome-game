const { Op } = require("sequelize");
const db = require("../models/index");
const Offer = db.offers;
const User = db.users;
const Game = db.games;
const Game_category = db.game_categories;
const User = db.users;

// Récupération des offres en fonction d'une recherche de l'utilisateur
exports.findOffersResults = async (req, res) => {
  const status = "1"; // on affiche que les offres actives

  const {
    client_id = null, // on récupère l'id de l'utilisateur qui fait la requête
    age_min = 999,
    postal_code = "",
    city = "",
    nb_players = "",
  } = req.query;

  const game_names =
    typeof req.query.game_names === "undefined"
      ? null
      : req.query.game_names.split(","); // on passe de "x, y, z" à ["x", "y", "z"]
  const game_category_ids =
    typeof req.query.game_category_ids === "undefined"
      ? null
      : req.query.game_category_ids.split(","); // idem

  const is_available =
    typeof req.query.is_available === "undefined"
      ? [true, false]
      : [req.query.is_available]; // par défaut on affiche tous les résultats
  const type =
    typeof req.query.type === "undefined" ? ["0", "1"] : [req.query.type]; // prêt/location, par défaut pas de filtre

  const nb_players_min = nb_players === "" ? 999 : nb_players;
  const nb_players_max = nb_players === "" ? 0 : nb_players;

  // Gestion du paramètre noms de jeux
  let game_names_conditions = [];
  // Par défaut aucun filtre sur le nom de jeu
  if (game_names === null)
    game_names_conditions.push({
      name: {
        [Op.iLike]: "%",
      },
    });
  // Si au moins un jeu est renseigné
  else {
    // On transforme les noms de jeu pour ajouter les % et $
    const mapped_game_names = game_names.map((name) => {
      return `%${name}%`;
    });

    // On push dans le trableau conditon les paramètres que Op.or devra prendre en compte
    for (name of mapped_game_names) {
      game_names_conditions.push({
        name: {
          [Op.iLike]: name, // Case insensitive
        },
      });
    }
  }

  // Gestion du paramètre noms de catégories
  let category_conditions = [];
  // Par défaut aucun filtre sur le nom de jeu
  if (game_category_ids === null)
    category_conditions.push({
      name: {
        [Op.iLike]: "%",
      },
    });
  // Si au moins un id de catégorie est renseigné
  else {
    let category_names = [];
    // Pour chaque id on recherche le nom de la catégorie correspondant
    for (id of game_category_ids) {
      let test = await Game_category.findByPk(id).then((data) => {
        if (data === null)
          res.status(404).json({
            error: `Catégorie id=${id} non trouvée`,
          });
        else {
          category_names.push(data.name);
          return true;
        }
      });
    }

    // On transforme les noms de catégories pour ajouter les % et $
    const mapped_categories = category_names.map((name) => {
      return `%${name}%`;
    });

    // On push dans le trableau conditon les paramètres que Op.or devra prendre en compte
    for (name of mapped_categories) {
      category_conditions.push({
        name: {
          [Op.iLike]: name, // Case insensitive
        },
      });
    }
  }

  Offer.findAll({
    where: {
      userId: {
        [Op.ne]: client_id, // On n'affiche pas les offres que gère l'utilisateur à l'origine de la requête
      },
      status,
      is_available: {
        [Op.or]: is_available,
      },
      type: {
        [Op.or]: type,
      },
      postal_code: {
        [Op.substring]: postal_code, // Si postal_code = "" on ne filtre pas
      },
      city: {
        [Op.iLike]: `%${city}%`, // case insensitive
      },
    },
    include: [
      {
        model: Game,
        where: {
          [Op.or]: game_names_conditions,
          nb_players_min: {
            [Op.lte]: nb_players_min, // On renvoie les résultats dont nb_players_min <= nb_players
          },
          nb_players_max: {
            [Op.gte]: nb_players_max, // On renvoie les résultats dont nb_players_max >= nb_players
          },
          age_min: {
            [Op.lte]: age_min,
          },
        },
        include: {
          model: Game_category,
          where: {
            [Op.or]: category_conditions,
          },
        },
      },
      {
        model: User,
      },
    ],

    order: [["id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        error: `Une erreur est survenue pendant la récupération des offres correspondantes à la recherche : ${err}`,
      });
    });
};

import axios from 'axios';
import {
  GET_GAME_CATEGORIES, saveGameCategories, GET_GAMES, saveGames,
  changeCategoriesIsLoad, changeGameIsLoad, ADD_GAME,
} from 'src/actions/game';

import { handleAddOffer, handleModifyOffer, handleFormInput } from 'src/actions/offers';

const gameMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_GAME_CATEGORIES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/game_categories')
        .then((response) => {
          store.dispatch(saveGameCategories(response.data));
          store.dispatch(changeCategoriesIsLoad());
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case GET_GAMES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games')
        .then((response) => {
          store.dispatch(saveGames(response.data));
          store.dispatch(changeGameIsLoad());
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    case ADD_GAME: {
      const { game } = store.getState().game;
      const { offer } = store.getState().offers;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games', {
        name: game.name,
        gameCategoryId: game.gameCategoryId,
        nb_players_min: game.nb_players_min,
        nb_players_max: game.nb_players_max,
        age_min: game.age_min,
        duration: game.duration,
      })
        .then((response) => {
          store.dispatch(handleFormInput('gameId', response.data.id));
          if (offer.id === 0) {
            store.dispatch(handleAddOffer());
          }
          else {
            store.dispatch(handleModifyOffer());
          }
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default gameMiddleware;

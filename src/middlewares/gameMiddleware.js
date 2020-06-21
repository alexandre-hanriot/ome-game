import axios from 'axios';
import {
  GET_GAME_CATEGORIES, saveGameCategories, GET_GAMES, saveGames,
  changeCategoriesIsLoad, changeGameIsLoad, ADD_GAME, UPDATE_STATUS_GAME,
} from 'src/actions/game';

import { handleAddOffer, handleModifyOffer, handleFormInput } from 'src/actions/offers';
import { setUpdate } from 'src/actions/global';

const gameMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;

  switch (action.type) {
    case GET_GAME_CATEGORIES: {
      axios
        .get('ec2-34-205-156-142.compute-1.amazonaws.com/game_categories')
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
      axios.get('ec2-34-205-156-142.compute-1.amazonaws.com/games', {
        params: {
          ...action.params,
        },
      })
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

      axios.post('ec2-34-205-156-142.compute-1.amazonaws.com/games', {
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

    case UPDATE_STATUS_GAME: {
      axios({
        method: 'put',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/games/${action.id}`,
        withCredentials: true,
        data: {
          status: action.status,
          userId: userData.user.id,
        },
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(setUpdate('games'));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default gameMiddleware;

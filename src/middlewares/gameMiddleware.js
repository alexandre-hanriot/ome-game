import axios from 'axios';
import {
  GET_GAME_CATEGORIES, saveGameCategories, GET_GAMES, saveGames,
  changeCategoriesIsLoad, changeGameIsLoad,
} from 'src/actions/game';

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
    default:
      next(action);
  }
};

export default gameMiddleware;

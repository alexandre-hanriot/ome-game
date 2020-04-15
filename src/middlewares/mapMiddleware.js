/* eslint-disable default-case */
import axios from 'axios';
import {
  FETCH_OFFERS,
  saveOffers,
  FETCH_GAMES,
  saveGames,
  FETCH_GAMES_CATEGORIES,
  saveGamesCategories,
  UPDATE_RESULTS,
} from 'src/actions/map';

const mapMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_OFFERS: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/search', {
          params: {
            client_id: 0,
          },
        })
        .then((response) => {
          const points = response.data.map((data) => ({
            type: 'Feature',
            properties: {
              cluster: false,
              ...data,
            },
            geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(data.longitude),
                parseFloat(data.latitude),
              ],
            },
          }));
          store.dispatch(saveOffers(points));
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }

    case UPDATE_RESULTS: {
      const { filters } = store.getState().map;

      let params = { client_id: 0 };
      if (filters.disponibility !== 'all') {
        params = {
          ...params,
          is_available: Boolean(Number(filters.disponibility)),
        };
      }

      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/search', {
          params,
        })
        .then((response) => {
          const points = response.data.map((data) => ({
            type: 'Feature',
            properties: {
              cluster: false,
              ...data,
            },
            geometry: {
              type: 'Point',
              coordinates: [
                parseFloat(data.longitude),
                parseFloat(data.latitude),
              ],
            },
          }));
          store.dispatch(saveOffers(points));
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }

    case FETCH_GAMES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games')
        .then((response) => {
          const games = response.data.map((game) => game.name);
          store.dispatch(saveGames(games));
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }

    case FETCH_GAMES_CATEGORIES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/game_categories')
        .then((response) => {
          store.dispatch(saveGamesCategories(response.data));
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
export default mapMiddleware;

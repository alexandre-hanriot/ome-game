/* eslint-disable default-case */
import axios from 'axios';
import {
  FETCH_OFFERS,
  saveOffers,
  FETCH_GAMES,
  saveGames,
  FETCH_GAMES_CATEGORIES,
  saveGamesCategories,
  requestLoad,
} from 'src/actions/map';

const mapMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // load all offers
    case FETCH_OFFERS: {
      const { filters } = store.getState().map;

      // filters
      let params = { client_id: 0 };
      if (filters.disponibility !== 'all') {
        params = {
          ...params,
          is_available: Boolean(Number(filters.disponibility)),
        };
      }

      if (filters.type !== 'all') {
        params = {
          ...params,
          type: filters.type,
        };
      }

      if (filters.players !== 0) {
        params = {
          ...params,
          nb_players: filters.players,
        };
      }

      // ajax request
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

    // load all games
    case FETCH_GAMES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games')
        .then((response) => {
          const games = response.data.map((game) => game.name);
          store.dispatch(saveGames(games));
          store.dispatch(requestLoad());
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }

    // load all games categories
    case FETCH_GAMES_CATEGORIES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/game_categories')
        .then((response) => {
          store.dispatch(saveGamesCategories(response.data));
          store.dispatch(requestLoad());
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

/* eslint-disable default-case */
import axios from 'axios';
import {
  MAP_FETCH_OFFERS,
  saveOffers,
  MAP_FETCH_GAMES,
  saveGames,
  MAP_FETCH_GAMES_CATEGORIES,
  saveGamesCategories,
  requestLoad,
} from 'src/actions/map';

const mapMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // load all offers
    case MAP_FETCH_OFFERS: {
      const { filters } = store.getState().map;

      // filters
      let params = {
        client_id: 0,
        status: '0',
      };
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

      if (filters.categories.length > 0) {
        const ids = filters.categories.map((category) => category.id);
        params = {
          ...params,
          game_category_ids: ids.join(','),
        };
      }

      if (filters.games.length > 0) {
        params = {
          ...params,
          game_names: filters.games.join(','),
        };
      }

      // ajax request
      axios
        .get('https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/search', {
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
    case MAP_FETCH_GAMES: {
      const params = {
        ...action.params,
      };

      axios.get('https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games', {
        params,
      })
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
    case MAP_FETCH_GAMES_CATEGORIES: {
      axios
        .get('https://ec2-54-167-103-17.compute-1.amazonaws.com:3000/game_categories')
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

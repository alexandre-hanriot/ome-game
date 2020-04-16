import axios from 'axios';

import { FETCH_FAVORITES, saveFavorites } from 'src/actions/favorites';

const favoritesMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  switch (action.type) {
    case FETCH_FAVORITES:

      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.id}/favorites`)
        .then((response) => {
          store.dispatch(saveFavorites(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    default:
      next(action);
  }
};

export default favoritesMiddleware;

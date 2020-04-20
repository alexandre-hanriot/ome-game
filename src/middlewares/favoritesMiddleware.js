import axios from 'axios';

import {
  FETCH_FAVORITES,
  UPDATE_NOTIFY_FAVORITE,
  DELETE_FAVORITE,
  ADD_FAVORITE,
  saveFavorites,
  updateNotifyFavorites,
  updateFavorites,
} from 'src/actions/favorites';

const favoritesMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { idFavorite } = store.getState().favorites;
  const { notifyfavorite } = store.getState().favorites;

  switch (action.type) {
    case FETCH_FAVORITES:

      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/favorites`)
        .then((response) => {
          store.dispatch(saveFavorites(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;


    case UPDATE_NOTIFY_FAVORITE:
      axios.put(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/favorites/${idFavorite}`, {
        notify_when_available: notifyfavorite,
      })
        .then((response) => {
          store.dispatch(updateNotifyFavorites(idFavorite, notifyfavorite));

    // Add offer in favorite
    case ADD_FAVORITE: {
      const { offer } = store.getState().offers;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/favorites', {
        userId: userData.id,
        offerId: offer.id,
      })
        .then((response) => {

        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;


    case DELETE_FAVORITE:
      axios.delete(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/favorites/${idFavorite}`)
        .then((response) => {
          console.log(response.data);
          store.dispatch(updateFavorites(idFavorite));
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

export default favoritesMiddleware;

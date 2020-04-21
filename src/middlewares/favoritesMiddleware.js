import axios from 'axios';

import {
  FETCH_FAVORITES,
  DELETE_FAVORITE,
  saveFavorites,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  CHECK_OFFER_IN_FAVORITE,
  saveCurrentFavorite,
  UPDATE_NOTIFY_FAVORITE,
  updateNotifyFavorites,
  updateFavorites,
} from 'src/actions/favorites';

import { setOfferInFavorite } from 'src/actions/offers';

const favoritesMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { idFavorite, notifyfavorite } = store.getState().favorites;

  switch (action.type) {
    case FETCH_FAVORITES:
      axios({
        method: 'get',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/favorites`,
        withCredentials: true,
        headers: {
          xsrfToken: localStorage.getItem('xsrfToken'),
        },
      })
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
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    // Add offer in favorite
    case ADD_FAVORITE: {
      const { offer } = store.getState().offers;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/favorites', {
        userId: userData.user.id,
        offerId: offer.id,
      })
        .then((response) => {
          store.dispatch(setOfferInFavorite(true));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    // Remove offer in favorite
    case REMOVE_FAVORITE: {
      const { currentFavorite } = store.getState().favorites;
      axios.delete(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/favorites/${currentFavorite}`)
        .then((response) => {
          store.dispatch(setOfferInFavorite(false));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    // check in user favorite
    case CHECK_OFFER_IN_FAVORITE: {
      const { offer } = store.getState().offers;
      if (offer.id !== 0) {
        axios
          .get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/favorites/${offer.id}`)
          .then((response) => {
            store.dispatch(setOfferInFavorite(true));
            store.dispatch(saveCurrentFavorite(response.data.id));
          })
          .catch((error) => {
            // console.warn(error);
          });
      }

      next(action);
      break;
    }

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

    default:
      next(action);
  }
};

export default favoritesMiddleware;

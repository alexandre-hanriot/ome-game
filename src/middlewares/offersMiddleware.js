import axios from 'axios';

import {
  FETCH_OFFERS, FETCH_PARAMS_OFFERS, GET_OFFER, saveOffers, saveOneOffer,
  changeOfferIsLoad, updateListOffers, HANDLE_ADD_OFFER, HANDLE_MODIFY_OFFER, DELETE_OFFER,
} from 'src/actions/offers';

import { showAlert, redirectTo } from 'src/actions/global';

const offersMiddleware = (store) => (next) => (action) => {
  const { userData, rememberMe } = store.getState().user;
  const { urlId, offer } = store.getState().offers;

  switch (action.type) {
    case FETCH_OFFERS: {
      // const { userData } = store.getState().user;
      axios({
        method: 'post',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/offers`,
        data: {
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveOffers(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case FETCH_PARAMS_OFFERS:
      axios({
        method: 'post',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/offers`,
        data: {
          userId: userData.user.id,
        },
        params: {
          limit: 4,
          resultPage: 1,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveOffers(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case GET_OFFER: {
      axios.post(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers/${urlId}`)
        .then((response) => {
          const { data } = response;
          const hasLocation = data.latitude !== null && data.longitude !== null;
          const currentZoom = hasLocation ? 12 : 5;
          const currentOffer = {
            ...data,
            zoom: currentZoom,
          };
          store.dispatch(saveOneOffer(currentOffer));
          store.dispatch(changeOfferIsLoad());
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case HANDLE_ADD_OFFER: {
      axios({
        method: 'post',
        url: 'http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers',
        data: {
          status: 0,
          userId: userData.user.id,
          type: offer.type,
          is_available: offer.is_available,
          title: offer.title,
          price: offer.price,
          gameId: offer.gameId,
          description: offer.description,
          city: offer.city,
          postal_code: offer.postal_code,
          latitude: offer.latitude,
          longitude: offer.longitude,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          store.dispatch(showAlert('Votre offre à été ajoutée avec succès et sera validée dans les plus brefs délais'));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case HANDLE_MODIFY_OFFER: {
      axios({
        method: 'put',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers/${offer.id}`,
        data: {
          status: 0,
          userId: userData.user.id,
          type: offer.type,
          is_available: offer.is_available,
          title: offer.title,
          price: offer.price,
          gameId: offer.gameId,
          description: offer.description,
          city: offer.city,
          postal_code: offer.postal_code,
          latitude: offer.latitude,
          longitude: offer.longitude,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          store.dispatch(showAlert('Votre offre à été modifiée avec succès et sera validée dans les plus brefs délais'));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case DELETE_OFFER: {
      axios({
        method: 'delete',
        url: `http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers/${urlId}`,
        withCredentials: true,
        data: {
          userId: userData.user.id,
        },
        headers: {
          'x-xsrf-token': rememberMe ? localStorage.getItem('xsrfToken') : sessionStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          console.log(response.data);
          store.dispatch(updateListOffers(urlId));
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

export default offersMiddleware;

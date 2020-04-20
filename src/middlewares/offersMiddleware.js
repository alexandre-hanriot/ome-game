import axios from 'axios';

import {
  FETCH_OFFERS, FETCH_PARAMS_OFFERS, GET_OFFER, saveOffers, saveOneOffer,
  changeOfferIsLoad, HANDLE_ADD_OFFER, HANDLE_MODIFY_OFFER,
} from 'src/actions/offers';

import { showAlert, redirectTo } from 'src/actions/global';

const offersMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { urlId, offer } = store.getState().offers;

  switch (action.type) {
    case FETCH_OFFERS: {
      axios.post(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.id}/offers`)
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
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.id}/offers`, {
        params: {
          limit: 4,
          resultPage: 1,
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
          const data = response.data;
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
      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers', {
        status: offer.status,
        userId: userData.id,
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
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          showAlert('Votre offre à été ajoutée avec succès et sera validée dans les plus brefs délais');
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case HANDLE_MODIFY_OFFER: {
      axios.put(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers/${offer.id}`, {
        status: offer.status,
        userId: offer.userId,
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
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          showAlert('Votre offre à été modifiée avec succès et sera validée dans les plus brefs délais');
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

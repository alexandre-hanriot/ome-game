
import api from '../utils/api';

import {
  FETCH_OFFERS,
  FETCH_PARAMS_OFFERS,
  GET_OFFER,
  saveOffers,
  saveOneOffer,
  updateListOffers,
  HANDLE_ADD_OFFER,
  HANDLE_MODIFY_OFFER,
  DELETE_OFFER,
  FETCH_ALL_OFFERS,
  OFFER_UPLOAD_IMAGE,
  setUploadData,
  UPDATE_STATUS_OFFER,
  fetchOffers,
  setOfferSend,
  UPDATE_STATUS_OFFER2,
  saveOffersAdmin,
} from 'src/actions/offers';

import { showAlert, redirectTo, setUpdate } from 'src/actions/global';

const offersMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { urlId, offer } = store.getState().offers;

  switch (action.type) {
    case FETCH_OFFERS: {
      api({
        method: 'post',
        url: `/users/${userData.user.id}/offers`,
        data: {
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
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
      api({
        method: 'post',
        url: `/users/${userData.user.id}/offers`,
        data: {
          userId: userData.user.id,
        },
        params: {
          limit: 4,
          resultPage: 1,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
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

    case FETCH_ALL_OFFERS: {
      api.get('/offers', {
        params: {
          ...action.params,
        },
      })
        .then((response) => {
          store.dispatch(saveOffersAdmin(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case GET_OFFER: {
      api({
        method: 'post',
        url: `/offers/${urlId}`,
        data: {
          status: '1',
        },
      })
        .then((response) => {
          const { data } = response;
          const hasLocation = data.latitude !== null && data.longitude !== null;
          const currentZoom = hasLocation ? 12 : 5;
          const currentOffer = {
            ...data,
            zoom: currentZoom,
          };
          store.dispatch(saveOneOffer(currentOffer));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case HANDLE_ADD_OFFER: {
      api({
        method: 'post',
        url: '/offers',
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
          image: offer.image,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          store.dispatch(showAlert('Votre offre à été ajoutée avec succès et sera validée dans les plus brefs délais'));
          store.dispatch(setOfferSend(false));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case HANDLE_MODIFY_OFFER: {
      api({
        method: 'put',
        url: `/offers/${offer.id}`,
        data: {
          status: 0,
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
          image: offer.image,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(redirectTo('/compte/offres'));
          store.dispatch(showAlert('Votre offre à été modifiée avec succès et sera validée dans les plus brefs délais'));
          store.dispatch(setOfferSend(false));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }
    case DELETE_OFFER: {
      api({
        method: 'delete',
        url: `/offers/${urlId}`,
        withCredentials: true,
        data: {
          userId: userData.user.id,
        },
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(updateListOffers(urlId));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case OFFER_UPLOAD_IMAGE: {
      const { upload } = store.getState().offers;
      if (upload.file !== '') {
        const data = new FormData();
        data.append('file', upload.file);

        api({
          method: 'post',
          url: '/upload/offers',
          withCredentials: true,
          data,
          headers: {
            'x-xsrf-token': localStorage.getItem('xsrfToken'),
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            store.dispatch(setUploadData('uploadPercentage', parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10)));
          },
        })
          .then((response) => {
            store.dispatch(setUploadData('status', 2));
            store.dispatch(setUploadData('uploadedFile', response.data));
          })
          .catch((error) => {
            store.dispatch(setUploadData('status', 3));
            console.warn(error);
          });
      }
      next(action);
      break;
    }

    case UPDATE_STATUS_OFFER: {
      api({
        method: 'put',
        url: `/offers/${urlId}`,
        withCredentials: true,
        data: {
          is_available: true,
        },
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          // store.dispatch(updateStatusStateOffer(urlId));
          store.dispatch(fetchOffers());
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case UPDATE_STATUS_OFFER2: {
      api({
        method: 'put',
        url: `/offers/${action.id}`,
        withCredentials: true,
        data: {
          status: action.status,
        },
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(setUpdate('offers'));
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

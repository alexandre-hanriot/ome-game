import axios from 'axios';

import {
  FETCH_RESERVATIONS,
  FETCH_PARAMS_RESERVATIONS,
  FETCH_ONE_RESERVATION,
  saveReservations,
  saveOneReservation,
  updateListReservations,
  saveListofferReservation,
  ADD_RESERVATION,
  DELETE_RESERVATION,
  CHECK_OFFER_IN_RESERVATION,
  UPDATE_STATUS_RESERVATION,
  FETCH_ALL_RESERVATIONS,
  UPDATE_VALIDATE_RESERVATION,
  UPDATE_STATUS_FINISHED_RESERVATION,
  saveReservationsAdmin,
} from 'src/actions/reservations';

import { setOfferInReservation, updateStateOffers } from 'src/actions/offers';

const reservationsMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { idReservation } = store.getState().reservations;

  switch (action.type) {
    case FETCH_RESERVATIONS:
      axios({
        method: 'post',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/users/${userData.user.id}/reservations`,
        data: {
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_PARAMS_RESERVATIONS: {
      axios({
        method: 'post',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/users/${userData.user.id}/reservations`,
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
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case FETCH_ONE_RESERVATION:
      axios({
        method: 'post',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/reservations/${idReservation}`,
        data: {
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveOneReservation(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_ALL_RESERVATIONS: {
      axios.get('ec2-34-205-156-142.compute-1.amazonaws.com/reservations', {
        params: {
          ...action.params,
        },
      })
        .then((response) => {
          store.dispatch(saveReservationsAdmin(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    // Add reservation for user and an offer
    case ADD_RESERVATION: {
      const { offer } = store.getState().offers;

      axios({
        method: 'post',
        url: 'ec2-34-205-156-142.compute-1.amazonaws.com/reservations',
        data: {
          userId: userData.user.id,
          offerId: offer.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(setOfferInReservation(true));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case DELETE_RESERVATION: {
      axios({
        method: 'delete',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/reservations/${idReservation}`,
        data: {
          userId: userData.user.id,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(updateListReservations(idReservation));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    // check in reservation
    case CHECK_OFFER_IN_RESERVATION: {
      const { offer } = store.getState().offers;
      if (offer.id !== 0) {
        axios({
          method: 'post',
          url: `ec2-34-205-156-142.compute-1.amazonaws.com/users/${userData.user.id}/reservations/${offer.id}`,
          data: {
            userId: userData.user.id,
          },
          withCredentials: true,
          headers: {
            'x-xsrf-token': localStorage.getItem('xsrfToken'),
          },
        })
          .then((response) => {
            store.dispatch(setOfferInReservation(response.data.result));
          })
          .catch((error) => {
            // console.warn(error);
          });
      }

      next(action);
      break;
    }

    case UPDATE_STATUS_RESERVATION: {
      axios({
        method: 'put',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/reservations/${idReservation}`,
        data: {
          status: 3,
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(saveListofferReservation(idReservation));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case UPDATE_VALIDATE_RESERVATION: {
      axios({
        method: 'put',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/reservations/${idReservation}`,
        data: {
          status: '1',
        },
        withCredentials: true,
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {
          store.dispatch(updateStateOffers(idReservation));
        })
        .catch((error) => {
          console.warn(error);
        });

      next(action);
      break;
    }

    case UPDATE_STATUS_FINISHED_RESERVATION: {
      axios({
        method: 'put',
        url: `ec2-34-205-156-142.compute-1.amazonaws.com/reservations/${idReservation}`,
        withCredentials: true,
        data: {
          status: '2',
        },
        headers: {
          'x-xsrf-token': localStorage.getItem('xsrfToken'),
        },
      })
        .then((response) => {

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

export default reservationsMiddleware;

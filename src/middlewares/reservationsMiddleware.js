import axios from 'axios';


import {
  FETCH_RESERVATIONS,
  FETCH_PARAMS_RESERVATIONS,
  FETCH_ONE_RESERVATION,
  saveReservations,
  saveOneReservation,
  ADD_RESERVATION,
} from 'src/actions/reservations';


const reservationsMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { idReservation } = store.getState().reservations;
  switch (action.type) {
    case FETCH_RESERVATIONS:

      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/reservations`)
        .then((response) => {
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_PARAMS_RESERVATIONS:
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/reservations`, {
        params: {
          limit: 4,
          resultPage: 1,
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


    case FETCH_ONE_RESERVATION:
      axios.post(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/reservations/${idReservation}`)
        .then((response) => {
          store.dispatch(saveOneReservation(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    // Add reservation for user and an offer
    case ADD_RESERVATION: {
      const { offer } = store.getState().offers;

      axios.post('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/reservations', {
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

    }

    default:
      next(action);
  }
};

export default reservationsMiddleware;
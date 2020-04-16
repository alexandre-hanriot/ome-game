import axios from 'axios';

import { FETCH_RESERVATIONS, FETCH_PARAMS_RESERVATIONS, saveReservations } from 'src/actions/reservations';

const reservationsMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  switch (action.type) {
    case FETCH_RESERVATIONS:

      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.id}/reservations`)
        .then((response) => {
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_PARAMS_RESERVATIONS:
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.id}/reservations`, {
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

    default:
      next(action);
  }
};

export default reservationsMiddleware;

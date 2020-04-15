import axios from 'axios';
import { FETCH_OFFERS, FETCH_PARAMS_OFFERS, saveOffers } from 'src/actions/offers';
import { FETCH_RESERVATIONS, FETCH_PARAMS_RESERVATIONS, saveReservations } from 'src/actions/reservations';

const listMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_OFFERS:
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/12/offers')
        .then((response) => {
          store.dispatch(saveOffers(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_PARAMS_OFFERS:
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/12/offers', {
        params: {
          limit: 4,
          resultPage: 1,
        },
      })
        .then((response) => {
          store.dispatch(saveOffers(response.data));
          console.log(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_RESERVATIONS:
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/10/reservations')
        .then((response) => {
          store.dispatch(saveReservations(response.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case FETCH_PARAMS_RESERVATIONS:
      axios.get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/27/reservations', {
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

export default listMiddleware;

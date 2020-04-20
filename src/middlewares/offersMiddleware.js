import axios from 'axios';
import {
  FETCH_OFFERS, FETCH_PARAMS_OFFERS, GET_OFFER, saveOffers, saveOneOffer,
} from 'src/actions/offers';


const offersMiddleware = (store) => (next) => (action) => {
  const { userData } = store.getState().user;
  const { urlId } = store.getState().offers;
  switch (action.type) {
    case FETCH_OFFERS: {
      // const { userData } = store.getState().user;
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/offers`)
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
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/users/${userData.user.id}/offers`, {
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
      // const { userData } = store.getState().user;
      axios.get(`http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/offers/${urlId}`)
        .then((response) => {
          store.dispatch(saveOneOffer(response.data));
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

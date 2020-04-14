/* eslint-disable default-case */
import axios from 'axios';
import { FETCH_OFFERS, saveOffers, FETCH_GAMES, saveGames } from 'src/actions/map';

const mapMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_OFFERS: {
      // const { email, password } = store.getState().map;

      // temp
      const demo = [
        {
          lat: '47.742939',
          lng: '7.399070',
        },
        {
          lat: '47.728760',
          lng: '7.416620',
        },
        {
          lat: '47.749460',
          lng: '7.339540',
        },
        {
          lat: '47.589670',
          lng: '7.560080',
        },
      ];

      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/search', {
          params: {
            client_id: 0,
          },
        })
        .then((response) => {
          const offers = response.data.map((offer) => ({
            ...offer,
            coordinates: demo[Math.floor(Math.random() * 4)],
          }));

          store.dispatch(saveOffers(offers));
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }
    case FETCH_GAMES: {
      axios
        .get('http://ec2-54-167-103-17.compute-1.amazonaws.com:3000/games')
        .then((response) => {
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.error(error);
        });

      next(action);
      break;
    }
    default:
      next(action);
  }
};
export default mapMiddleware;

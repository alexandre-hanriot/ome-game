import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import mapMiddleware from 'src/middlewares/mapMiddleware';
import userMiddleware from 'src/middlewares/userMiddleware';
import registrationMiddleware from 'src/middlewares/registrationMiddleware';
import offersMiddleware from 'src/middlewares/offersMiddleware';
import reservationsMiddleware from 'src/middlewares/reservationsMiddleware';
import favoritesMiddleware from 'src/middlewares/favoritesMiddleware';
import gameMiddleware from 'src/middlewares/gameMiddleware';
import contactMiddleware from 'src/middlewares/contactMiddleware';

// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
    userMiddleware,
    mapMiddleware,
    registrationMiddleware,
    offersMiddleware,
    reservationsMiddleware,
    favoritesMiddleware,
    gameMiddleware,
    contactMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;

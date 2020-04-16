import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import mapMiddleware from 'src/middlewares/mapMiddleware';
import authMiddleware from 'src/middlewares/authMiddleware';
import registrationMiddleware from 'src/middlewares/registrationMiddleware';
import offersMiddleware from 'src/middlewares/offersMiddleware';
import reservationsMiddleware from 'src/middlewares/reservationsMiddleware';
import favoritesMiddleware from 'src/middlewares/favoritesMiddleware';

// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
    mapMiddleware,
    authMiddleware,
    registrationMiddleware,
    offersMiddleware,
    reservationsMiddleware,
    favoritesMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;

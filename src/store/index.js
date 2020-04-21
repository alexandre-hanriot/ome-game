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

// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
    mapMiddleware,
    userMiddleware,
    registrationMiddleware,
    offersMiddleware,
    reservationsMiddleware,
    favoritesMiddleware,
    gameMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;

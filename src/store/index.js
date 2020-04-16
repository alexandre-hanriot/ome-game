import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import mapMiddleware from 'src/middlewares/mapMiddleware';
import authMiddleware from 'src/middlewares/authMiddleware';
import registrationMiddleware from 'src/middlewares/registrationMiddleware';
import listMiddleware from 'src/middlewares/listMiddleware';

// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
    mapMiddleware,
    authMiddleware,
    registrationMiddleware,
    listMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;

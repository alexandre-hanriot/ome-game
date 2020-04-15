import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';

import listMiddleware from '../middlewares/listMiddleware';

import authMiddleware from 'src/middlewares/authMiddleware';
import registrationMiddleware from 'src/middlewares/registrationMiddleware';


// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
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

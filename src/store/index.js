import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import authMiddleware from 'src/middlewares/authMiddleware';

// on combine plusieurs enhancers : devTools et chaque middleware
const enhancers = composeWithDevTools(
  applyMiddleware(
    authMiddleware,
    // middlewares
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;

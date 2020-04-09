import { combineReducers } from 'redux';

import reservationReducer from './reservations';
import headerReducer from './header';

const rootReducer = combineReducers({
  header: headerReducer,
  reservations: reservationReducer,
});

export default rootReducer;

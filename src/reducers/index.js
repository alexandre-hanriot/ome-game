import { combineReducers } from 'redux';
import reservationReducer from './reservations';

// import reducers

const rootReducer = combineReducers({
  reservations: reservationReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';

import globalReducer from './global';
import mapReducer from './map';

import userReducer from './user';
import registrationReducer from './registration';
import offersReducer from './offers';
import reservationsReducer from './reservations';
import favoritesReducer from './favorites';
import gameReducer from './game';
import contactReducer from './contact';

const rootReducer = combineReducers({
  global: globalReducer,
  map: mapReducer,
  user: userReducer,
  registration: registrationReducer,
  offers: offersReducer,
  reservations: reservationsReducer,
  favorites: favoritesReducer,
  game: gameReducer,
  contact: contactReducer,
});

export default rootReducer;

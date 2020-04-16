import { combineReducers } from 'redux';

import globalReducer from './global';
import mapReducer from './map';


import userReducer from './user';
import registrationReducer from './registration';
import listReducer from './list';

const rootReducer = combineReducers({
  global: globalReducer,
  map: mapReducer,
  user: userReducer,
  registration: registrationReducer,
  data: listReducer,
});

export default rootReducer;

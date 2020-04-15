import { combineReducers } from 'redux';

import globalReducer from './global';

import listReducer from './list';
import userReducer from './user';
import registrationReducer from './registration';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  registration: registrationReducer,
  data: listReducer,
});

export default rootReducer;
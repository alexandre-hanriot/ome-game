import { combineReducers } from 'redux';

import globalReducer from './global';
import userReducer from './user';
import registrationReducer from './registration';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  registration: registrationReducer,
});

export default rootReducer;

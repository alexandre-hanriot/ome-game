import { combineReducers } from 'redux';

import globalReducer from './global';
import userReducer from './user';
import RegistrationReducer from './registration';

const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  registration: RegistrationReducer,
});

export default rootReducer;

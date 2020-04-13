import { combineReducers } from 'redux';

import globalReducer from './global';
import AuthenticateReducer from './authenticate';
import RegistrationReducer from './Registration';

const rootReducer = combineReducers({
  global: globalReducer,
  authenticate: AuthenticateReducer,
  registration: RegistrationReducer,
});

export default rootReducer;

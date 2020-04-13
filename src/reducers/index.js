import { combineReducers } from 'redux';

import globalReducer from './global';
import AuthenticateReducer from './authenticate';

const rootReducer = combineReducers({
  global: globalReducer,
  authenticate: AuthenticateReducer,
});

export default rootReducer;

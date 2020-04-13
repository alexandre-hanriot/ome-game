import { combineReducers } from 'redux';

import globalReducer from './global';
import mapReducer from './map';

const rootReducer = combineReducers({
  global: globalReducer,
  map: mapReducer,
});

export default rootReducer;

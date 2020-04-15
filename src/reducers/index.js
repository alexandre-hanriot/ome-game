import { combineReducers } from 'redux';

import globalReducer from './global';
import listReducer from './list';

const rootReducer = combineReducers({
  global: globalReducer,
  data: listReducer,
});

export default rootReducer;
